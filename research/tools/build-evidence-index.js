// Recover the per-FIELD source attribution that the drafting files already hold.
//
// research/parts/*.md is what a fill wave produces, and every one of them carries
// an EVIDENCE block written by the reader who did the work:
//
//     - field: curriculumTime
//       quote: "The recommended time is 10% for schools that implement ..."
//       source: https://manuals.alberta.ca/... (footnote 3 to the time table)
//
// That is field -> sentence -> URL, recorded at the moment somebody read it. It
// was used to draft the bullets and then dropped: docLinks are per ENTRY, so the
// panel could only ever say "here are all fifteen sources on South Africa".
//
// This tool joins it back. It asserts nothing the parts files do not already
// say, and anything it cannot resolve is REPORTED rather than guessed -- an
// unresolved heading is a miss to look at, not a row to drop quietly.
//
// Output: data/field-sources.json
//     { "<domain>": { "<CC|Unit Name>": { "<field>": [ {url, quote, where} ] } } }
//
// Usage: node research/tools/build-evidence-index.js [--write] [--verbose]

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const PARTS = path.join(root, "research", "parts");
const OUT = path.join(root, "data", "field-sources.json");
const write = process.argv.includes("--write");
const verbose = process.argv.includes("--verbose");

const dm = require(path.join(root, "src", "domains.js"));
const DOMAINS = dm.DOMAINS || dm.domains || dm.LIVE;

// Which domains declare a given field name. Only three names are shared, and
// `policyHistory` is excluded outright below.
const OWNERS = {};
for (const d of DOMAINS) for (const [k] of d.fields) (OWNERS[k] = OWNERS[k] || []).push(d.id);

// policyHistory rows carry their own per-row links already (historyHTML renders
// them), so an entry-level index would duplicate a better attribution.
const SKIP_FIELDS = new Set(["policyHistory"]);

const fold = s => String(s == null ? "" : s)
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[‘’]/g, "'").toLowerCase()
  .replace(/\s+/g, " ").trim();

// ---- the atlas side: every unit that actually exists, per domain ------------
// LIVING holds the domains whose data is the approved snapshot rather than the
// curated bootstrap set; see seedIfEmpty() in src/store.js.
const ENTRIES = {}, LIVING = new Set();
for (const d of DOMAINS) {
  for (const f of [`${d.id}.json`, `${d.id}.seed.json`]) {
    try {
      ENTRIES[d.id] = JSON.parse(fs.readFileSync(path.join(root, "data", f), "utf8"));
      if (!f.includes(".seed.")) LIVING.add(d.id);
      break;
    } catch { /* try the next */ }
  }
}

function findEntry(domain, cc, name) {
  const rows = ENTRIES[domain]; if (!rows) return null;
  const n = fold(name);
  if (!n || n === "national") return rows.find(e => e.countryCode === cc && e.isNational) || null;
  return rows.find(e => e.countryCode === cc && fold(e.unitName) === n)
      || rows.find(e => e.countryCode === cc && e.isNational && fold(e.unitName) === n)
      || null;
}

const URL_RE = /https?:\/\/[^\s)<>"']+/;

// ---- parsing ---------------------------------------------------------------
// A heading is a unit only if it has the CC| or CC-XX| shape. The other 36 are
// section titles inside the file ("Sources that did NOT work").
const HEADING = /^([A-Z]{2})(?:-[A-Za-z0-9]+)?\|(.+)$/;
// Some headings name the map outright: "CU|Cuba -- map `eal` (Majority ...)".
const MAP_HINT = /[-–—]+\s*map\s*`([a-z]+)`/i;

/** The field token, ignoring whatever commentary follows it. */
function fieldToken(raw) {
  const m = String(raw).trim().match(/^([A-Za-z][A-Za-z0-9]*(?:\.[A-Za-z][A-Za-z0-9]*)?)/);
  return m ? m[1] : null;
}

/** Split an EVIDENCE block into its `- field:` rows. */
function evidenceRows(block) {
  const out = [];
  const lines = block.split(/\r?\n/);
  let cur = null;
  for (const line of lines) {
    const start = line.match(/^[ \t]*-[ \t]*field:[ \t]*(.*)$/);
    if (start) { if (cur) out.push(cur); cur = { field: start[1], lines: [] }; continue; }
    // A new top-level section ends the block.
    if (/^[A-Z][A-Z \t]{3,}:/.test(line)) { if (cur) out.push(cur); cur = null; continue; }
    if (cur) cur.lines.push(line);
  }
  if (cur) out.push(cur);
  return out;
}

const KEY = /^[ \t]*(quotes?|sources?|bullets|note|tier|url|label|where|status|prose|rows|series|description|caveat)[ \t]*:/i;

/* A part file's SOURCES block, as label -> url.
 *
 * Needed because 1,237 EVIDENCE rows cite their source by NAME rather than by
 * link -- "Education Act, S.A. 2012, c. E-0.3, s.17", "Regime pedagogique
 * art. 22 (archive snapshot above)". The drafter was pointing at an entry in
 * the SOURCES block a few lines up, and that entry carries the URL. Resolving
 * the pointer recovers the attribution; guessing a URL for a name that matches
 * nothing does not, so an unmatched name is dropped and counted.
 */
function sourceTable(chunk) {
  const out = [];
  const block = chunk.split(/^EVIDENCE:/m)[0];
  // The label runs to the end of the line and may contain quotes of its own --
  // `Eurydice, "Key data on teaching languages at school in Europe"` -- so it
  // is captured whole and unwrapped only when a quote pair encloses ALL of it.
  // Excluding quote characters from the capture silently emptied every label
  // written that way, which is most of the language wave.
  for (const m of block.matchAll(/^[ \t]*-[ \t]*label:[ \t]*([^\r\n]+?)[ \t]*$[\s\S]*?^[ \t]*url:[ \t]*([^\r\n]+)/gm)) {
    const url = (String(m[2]).match(URL_RE) || [])[0];
    const label = m[1].trim().replace(/^"([\s\S]*)"$/, "$1").trim();
    out.push({ label, f: fold(label), url: url || null });
  }
  return out;
}

/* The URL a by-name citation points at, or null.
 *
 * A citation names a document and then a place inside it -- "Education Act
 * 2008, s. 83(1) (banked PDF)", "Regime pedagogique art. 22 (archive
 * snapshot)". Substring matching fails on all of those, because the pinpoint
 * is not in the label. So the pinpoint is stripped and what remains is scored
 * on token overlap against each label AND its url.
 *
 * The bar is deliberately high: every significant token of the citation must
 * appear. A looser rule would attach "Education Act 2008" to any label with
 * the word Act in it, which is the failure this whole tool exists to avoid.
 */
const PINPOINT = /\b(?:s|ss|art|arts|cl|para|paras|ch|sec|secs|p|pp|§+)\.?\s*[\d][\w.()\u2013-]*/gi;
const NAME_STOP = new Set(["the", "a", "an", "and", "of", "for", "in", "on", "to", "de", "la",
  "le", "du", "des", "et", "banked", "pdf", "archive", "snapshot", "above", "extracted", "text",
  "official", "consolidation", "current", "as", "note", "version"]);

function resolveByName(name, table) {
  const cleaned = fold(name).replace(/\(.*?\)/g, " ").replace(PINPOINT, " ");
  const toks = cleaned.split(/[^a-z0-9]+/).filter(t => t && !NAME_STOP.has(t));
  if (toks.length < 2) return null;
  let best = null, bestScore = 0;
  for (const src of table) {
    const hay = src.f + " " + fold(src.url).replace(/[^a-z0-9]+/g, " ");
    const hit = toks.filter(t => hay.includes(t)).length;
    if (hit < toks.length) continue;              // every token must be there
    const score = toks.length * 1000 + src.f.length;
    if (score > bestScore) { bestScore = score; best = src; }
  }
  return best ? { url: best.url, label: best.label } : null;
}

function readRow(row) {
  let quote = null, source = null, bullets = false, key = null, buf = [];
  const flush = () => {
    if (!key) return;
    const v = buf.join(" ").trim();
    if (/^quotes?$/.test(key) && !quote) quote = v;
    if (/^(sources?|url)$/.test(key) && !source) source = v;
    if (key === "bullets") bullets = true;
    key = null; buf = [];
  };
  for (const line of row.lines) {
    const m = line.match(KEY);
    if (m) { flush(); key = m[1].toLowerCase(); buf = [line.slice(m[0].length).trim()]; continue; }
    // A blank line ends the value. Without this the parser reads straight on
    // into whatever follows the EVIDENCE block -- Antigua's `source:` note ran
    // into a NEGATIVES section and carried four sentences of term counts into
    // the panel with it.
    if (!line.trim()) { flush(); continue; }
    if (key) buf.push(line.trim());
  }
  flush();
  return { quote, source, bullets };
}

// ---- walk ------------------------------------------------------------------
const index = {};              // domain -> key -> field -> [{url, quote, where}]
const miss = { heading: [], unknownField: [], fieldEmpty: [], unitNotFound: [], ambiguous: [], unresolvedName: [], unlinkable: [], noSource: 0 };
let bulletRows = 0;
let rows = 0, kept = 0;

for (const file of fs.readdirSync(PARTS).filter(f => f.endsWith(".md")).sort()) {
  const text = fs.readFileSync(path.join(PARTS, file), "utf8");
  for (const chunk of text.split(/^###[ \t]+/m).slice(1)) {
    const head = chunk.split(/\r?\n/)[0].trim();
    const hm = head.match(HEADING);
    if (!hm) { miss.heading.push(`${file}: ${head.slice(0, 60)}`); continue; }
    const cc = hm[1];
    const hint = (head.match(MAP_HINT) || [])[1] || null;
    // Strip the trailing "-- map `x` (...)" and any "(national)" marker.
    const name = hm[2].replace(MAP_HINT, "").replace(/\((?:national)\)/i, "")
      .replace(/\s*[(–—-].*$/, "").trim() || hm[2].trim();

    const ev = chunk.split(/^EVIDENCE:/m)[1];
    if (!ev) continue;
    const table = sourceTable(chunk);
    // "source: same" is a back-reference to the row above -- several waves
    // wrote a run of quotes from one document that way, sometimes with a note
    // in brackets after it. It is resolved by carrying the last URL forward
    // WITHIN THIS UNIT BLOCK only, never across units.
    let lastUrl = null;

    for (const row of evidenceRows(ev)) {
      rows++;
      const tok = fieldToken(row.field);
      if (!tok) { miss.unknownField.push(`${file}: ${String(row.field).slice(0, 50)}`); continue; }

      let domain = null, field = tok;
      if (tok.includes(".")) { [domain, field] = tok.split("."); }
      if (SKIP_FIELDS.has(field)) continue;

      let candidates = domain ? [domain] : (hint ? [hint] : (OWNERS[field] || []));
      if (!candidates.length) { miss.unknownField.push(`${file}: ${tok} (no domain declares it)`); continue; }
      // Keep only domains that declare the field AND hold this unit with text.
      let fits = candidates.filter(d =>
        (OWNERS[field] || []).includes(d) && (() => {
          const e = findEntry(d, cc, name);
          return e && String(e[field] == null ? "" : e[field]).trim();
        })());
      // A domain whose only data file is the seed has had nothing approved, so
      // attributing drafted evidence to it is a guess. Where a live domain and
      // a seed-only one both declare the field, the live one wins: this is the
      // whole of the mediumOfInstruction (indigenous vs he) ambiguity.
      if (fits.length > 1) {
        const live = fits.filter(d => LIVING.has(d));
        if (live.length === 1) fits = live;
      }
      if (fits.length !== 1) {
        const known = candidates.some(d => findEntry(d, cc, name));
        (fits.length ? miss.ambiguous : known ? miss.fieldEmpty : miss.unitNotFound)
          .push(`${file}: ${cc}|${name} ${tok}`);
        continue;
      }
      domain = fits[0];

      const { quote, source, bullets } = readRow(row);
      // A `bullets:` row is the DRAFTED PROSE, not evidence for it. It carries
      // no source by design, so it is not a miss.
      if (bullets && !source) { bulletRows++; continue; }
      let url = (String(source || "").match(URL_RE) || [])[0];
      if (!url && /^same\b/i.test(String(source || "").trim())) url = lastUrl;
      if (!url && source) {
        const hit = resolveByName(source, table);
        if (!hit) { miss.unresolvedName.push(`${file}: ${String(source).slice(0, 70)}`); continue; }
        if (!hit.url) { miss.unlinkable.push(`${file}: ${hit.label.slice(0, 70)}`); continue; }
        url = hit.url;
      }
      if (!url) { miss.noSource++; continue; }
      // "same" is the pointer, not a note about the source. What follows it
      // often IS a note -- "same -- note this is a MEDICAL examination" -- so
      // the pointer is stripped and the remark kept.
      const where = String(source || "")
        .replace(URL_RE, "")
        .replace(/^\s*same(\s+as\s+above)?\s*[—–,;:-]*\s*/i, "")
        .replace(/^[\s(]+|[\s)]+$/g, "") || null;

      const e = findEntry(domain, cc, name);
      const key = `${e.countryCode}|${e.unitName}`;
      const slot = (((index[domain] = index[domain] || {})[key] = index[domain][key] || {})[field] =
        index[domain][key][field] || []);
      const clean = url.replace(/[).,;]+$/, "");
      lastUrl = clean;
      // The SOURCES label for this URL, carried through because a URL is not a
      // document. 80 citations point at the Cellar copy of "Key data on
      // teaching languages at school in Europe" while the entries record its
      // DOI; only the label shows those are the same publication.
      const named = table.find(t => t.url === clean) || table.find(t => t.url && clean.startsWith(t.url));
      if (!slot.some(s => s.url === clean)) {
        slot.push({ url: clean, label: named ? named.label : null, quote: quote || null, where });
        kept++;
      }
    }
  }
}

/* ---- report ----------------------------------------------------------------
 *
 * Is this citation already on its entry? A URL is not a document, so comparing
 * URL strings answers a narrower question than the one worth asking. The first
 * run of this tool reported 317 citations "not a docLink on the entry"; 122 of
 * them were the entry's own source under another identifier, and the biggest
 * group was one publication -- 80 citations of the Cellar PDF of Eurydice's Key
 * Data on Teaching Languages at School in Europe 2023, against the DOI the
 * entries cite. The drafter had even written the equivalence into the label.
 *
 * So three tests, in order of how much they prove, and a citation counts as
 * absent only when all three fail.
 */
const nurl = u => String(u).trim().toLowerCase()
  .replace(/^https?:\/\//, "").replace(/^www\./, "").split("#")[0].replace(/\/+$/, "");
const nlab = t => fold(t).replace(/[^a-z0-9]+/g, " ").trim();
const DOI_RE = /10\.\d{4,9}\/[^\s"<>,;)]+/g;
const dois = t => (String(t || "").match(DOI_RE) || []).map(x => x.toLowerCase().replace(/[.)]+$/, ""));

let pairs = 0, units = 0, byUrl = 0, byDoi = 0, byLabel = 0;
const strays = [];
for (const d of Object.keys(index)) {
  for (const key of Object.keys(index[d])) {
    units++;
    const e = (ENTRIES[d] || []).find(x => `${x.countryCode}|${x.unitName}` === key);
    const links = (e && e.docLinks) || [];
    const urls = new Set(links.map(l => nurl(l.url)));
    const labels = links.map(l => nlab(l.label)).filter(Boolean);
    const entryDois = new Set(links.flatMap(l => dois(`${l.url} ${l.label || ""}`)));
    for (const f of Object.keys(index[d][key])) {
      pairs++;
      for (const s of index[d][key][f]) {
        if (urls.has(nurl(s.url))) { byUrl++; continue; }
        if (dois(s.label).some(x => entryDois.has(x))) { byDoi++; continue; }
        const L = s.label ? nlab(s.label) : null;
        if (L && labels.some(x => x === L || x.includes(L) || L.includes(x)
          || (L.length > 30 && x.length > 30 && x.slice(0, 45) === L.slice(0, 45)))) { byLabel++; continue; }
        strays.push(`${d} ${key} ${f}  ${s.url}`);
      }
    }
  }
}
const onEntry = byUrl + byDoi + byLabel;
const offEntry = strays.length;

console.log(`EVIDENCE rows read: ${rows}`);
console.log(`  kept:       ${kept} source citations`);
console.log(`  units:      ${units}   unit-field pairs: ${pairs}`);
console.log(`  already a source on that entry: ${onEntry}  (${byUrl} same url, ${byDoi} same doi, ${byLabel} same title)`);
console.log(`  NOT on the entry:               ${offEntry}  -- read while drafting, never recorded`);
console.log(`drafted-prose rows skipped (bullets, no evidence attached): ${bulletRows}`);
console.log("unresolved --");
console.log(`  section heading, not a unit        ${miss.heading.length}`);
console.log(`  field the atlas does not have      ${miss.unknownField.length}`);
console.log(`  field empty on that entry          ${miss.fieldEmpty.length}`);
console.log(`  unit not found                     ${miss.unitNotFound.length}`);
console.log(`  ambiguous domain                   ${miss.ambiguous.length}`);
console.log(`  source named but matched nothing   ${miss.unresolvedName.length}`);
console.log(`  source has no link (banked file)   ${miss.unlinkable.length}`);
console.log(`  no source at all                   ${miss.noSource}`);
if (verbose) {
  for (const [k, list] of Object.entries(miss)) {
    if (!Array.isArray(list) || !list.length) continue;
    console.log(`\n-- ${k} (${list.length})`);
    for (const l of list.slice(0, 40)) console.log("   " + l);
    if (list.length > 40) console.log(`   ... ${list.length - 40} more`);
  }
  if (strays.length) {
    console.log(`\n-- cited in drafting but NOT a docLink on the entry (${strays.length})`);
    for (const l of strays.slice(0, 40)) console.log("   " + l);
  }
}

if (!write) { console.log("\n(dry run - pass --write)"); process.exit(0); }
fs.writeFileSync(OUT, JSON.stringify(index, null, 1) + String.fromCharCode(10));
console.log(`\nwrote data\\field-sources.json`);
