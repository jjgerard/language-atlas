// Apply the wave-4 part files.
//
//     node w4apply.js <prefix> [--write]
//     node w4apply.js w4-eal- --write
//
// Same pipeline as the earlier waves, with one addition: these agents were
// asked to use the atlas's third state where they looked and found nothing,
// and they recorded it as a `prose:` block rather than as bullets. parseFile
// only collects bullets, so North Korea — four fields, every one of them a
// documented negative — parsed as an empty file and would have been silently
// skipped. The prose blocks are pulled out here and passed to apply.js as
// `notEstablished`, which checks them for the sentinel opening and writes them
// as free text rather than as a list.
const fs = require("fs");
const path = require("path");
const { parseFile } = require("./parseparts");
const { run } = require("./fl/apply");

const PARTS = path.join(__dirname, "reports", "parts");
const prefix = process.argv[2];
if (!prefix) { console.log("usage: node w4apply.js <prefix> [--write]"); process.exit(1); }

/** The `prose:` blocks, which parseFile does not return. */
function proseFields(file) {
  const text = fs.readFileSync(path.join(PARTS, file), "utf8");
  const draft = text.slice(text.indexOf("DRAFT BULLETS"));
  const out = {};
  // `[ \t]{4,}`, NOT `\s{4,}`. \s matches a newline, so the continuation group
  // ran straight past the blank line and swallowed the next `- field:` block
  // with it — North Korea's four documented negatives came through as two, and
  // the two it ate would have been written as empty rather than as findings.
  // Three agents, three ways of labelling the same thing: `prose: |`,
  // `PROSE (the atlas's third state):` and `PROSE (not bullets — ...):`. All
  // three are accepted rather than one being declared correct after the fact,
  // because a negative that fails to parse is written as an empty field, and an
  // empty field is indistinguishable from nobody having looked.
  const re = /^[ \t]*-[ \t]*field:[ \t]*([A-Za-z0-9.]+)[ \t]*\n[ \t]*(?:prose:[ \t]*\||PROSE\b[^\n]*)[ \t]*\n((?:[ \t]{4,}.*\n?)+)/gm;
  let m;
  while ((m = re.exec(draft))) {
    const field = m[1].replace(/^[a-z]+\./, "");          // strip an eal./fl./dld. prefix
    out[field] = m[2].split("\n").map(l => l.trim()).filter(Boolean).join(" ");
  }
  return out;
}

/** Dated rows, written as `- year:` / `description:` pairs.
 *
 * The heading varies and matching one spelling of it loses the lot. This looked
 * for the literal "POLICY HISTORY ROWS" and so found NOTHING in a wave where 53
 * files wrote "POLICY HISTORY:" and 6 wrote it as a `- field: policyHistory`
 * block with the rows nested under `rows:`. All 58 files' timelines were
 * dropped in silence, and the apply reported "0 history rows" for every entry
 * without anything looking wrong.
 *
 * That is the third time in this project a dated row has gone missing between
 * an agent and the store, so the match is now deliberately loose about the
 * heading and strict about the row shape. */
function historyRows(file) {
  const text = fs.readFileSync(path.join(PARTS, file), "utf8");
  const head = text.match(/^[ \t]*(?:-[ \t]*field:[ \t]*(?:[a-z]+\.)?policyHistory|#*[ \t]*POLICY HISTORY)/mi);
  if (!head) return [];
  const i = text.indexOf(head[0]);
  const after = text.slice(i);
  // Stop at the next top-level heading so a later section's stray "year:" is
  // not swept in.
  const end = after.slice(1).search(/\n[A-Z][A-Z \/]{3,}[:\n]/);
  const block = end > -1 ? after.slice(0, end + 1) : after;
  const rows = [];
  const re = /-\s*year:\s*(\d{4})\s*\n\s*description:\s*([\s\S]*?)(?=\n\s*(?:source:|-\s*year:|$))/g;
  let m;
  while ((m = re.exec(block))) {
    rows.push({ year: Number(m[1]), description: m[2].split("\n").map(s => s.trim()).filter(Boolean).join(" ").trim() });
  }
  return rows;
}

const DOMAIN = { "w4-eal-": "eal", "w4-fl-": "fl", "w4-dld-": "dld", "w5-ind-": "indigenous" };
const domain = DOMAIN[prefix] || (prefix === "w4-CN" ? null : null);

// Fields this run is allowed to REPLACE rather than only fill. Each is a case
// where the new text is strictly better evidence than what is there, and each
// is named here so the replacement is a decision on the record rather than a
// guard quietly switched off.
//
// DO/primaryRequirement holds "Not established ... MINERD host returned 522" —
// a note that the curriculum could not be fetched. It has now been fetched: a
// 428-page official Diseno Curricular showing seven areas in each of grades 1-3
// and no Lenguas Extranjeras among them. A sourced negative replaces a failed
// download.
// The dld three are the same case: each holds a not-established note from an
// earlier pass saying the answer could not be established, and each now has one.
// New Zealand is the clearest — "whether DLD is used could not be established"
// is replaced by the ORS Guidelines containing zero occurrences of the term and
// the Ministry's own working phrase, with its te reo rendering.
const REPLACE = new Set([
  "fl|DO|Dominican Republic|primaryRequirement",
  "dld|IN|India|serviceModel",
  "dld|NZ|New Zealand|terminology",
  "dld|ZA|South Africa|terminology",
]);

const spec = {};
const problems = [];
let files = 0, skippedFields = 0, skippedFiles = 0;

// The store as it stands, so an already-written field can be skipped rather
// than reported as a collision.
const STOREFILES = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const ATLAS_DIR = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const store = {};
if (domain && STOREFILES[domain]) store[domain] = JSON.parse(fs.readFileSync(path.join(ATLAS_DIR, "data", STOREFILES[domain]), "utf8"));

for (const f of fs.readdirSync(PARTS).filter(x => x.startsWith(prefix) && x.endsWith(".md")).sort()) {
  const text = fs.readFileSync(path.join(PARTS, f), "utf8");
  const hdr = text.match(/^###\s+([A-Z]{2}(?:-[A-Z0-9]{1,3})?)\|([^\n—]+?)\s*$/m);
  if (!hdr) { problems.push(f + ": no `### CC|Unit` header"); continue; }
  const key = hdr[1] + "|" + hdr[2].trim();
  files++;

  const { fields, sources } = parseFile(f);
  const prose = proseFields(f);   // mutable: the bullet-form fold below adds to it
  const hist = historyRows(f);

  const bullets = {}, typedHist = hist.length ? hist : null;
  for (const [k, v] of Object.entries(fields)) {
    if (k === "policyHistory") continue;                  // handled as history
    const field = k.replace(/^[a-z]+\./, "");
    // The two agents recorded the atlas's third state differently: one used a
    // `prose:` block, the other wrote bullets whose FIRST bullet opens with the
    // sentinel. Left as bullets these would be written as ordinary field text
    // and counted as DOCUMENTED — a looked-and-found-nothing field silently
    // becoming a filled one is exactly how a coverage figure stops meaning
    // anything. derive.js only recognises the third state in free text, so
    // they are folded into prose here.
    if (v.length && /^Not established from the sources consulted/i.test(v[0])) {
      prose[field] = v.map(b => b.trim().replace(/[.;]$/, "")).join(". ") + ".";
      continue;
    }
    bullets[field] = v;
  }
  // Drop fields already written. A wave lands in batches — agents die, get
  // re-run, and files accumulate — so the same part file is applied more than
  // once. apply.js treats an existing value as an error and refuses the WHOLE
  // run, which meant 51 finished entries blocked 61 new ones. Skipping here
  // keeps the guard armed for what it is for: an accidental overwrite of
  // research by a generator, not a re-run of the same wave.
  const already = store[domain] && store[domain].find(r =>
    r.countryCode === key.split("|")[0] && r.unitName === key.split("|").slice(1).join("|"));
  if (already) {
    for (const k of Object.keys(bullets)) if (String(already[k] || "").trim()) { delete bullets[k]; skippedFields++; }
    for (const k of Object.keys(prose)) if (String(already[k] || "").trim()) { delete prose[k]; skippedFields++; }
  }
  if (!Object.keys(bullets).length && !Object.keys(prose).length) {
    skippedFiles++;
    continue;
  }
  const d = domain;
  const bucket = (spec[d] = spec[d] || {});
  bucket[key] = {
    fields: bullets,
    notEstablished: prose,
    addDocLinks: sources,
    confidence: /official-document/.test(text) ? "official-document" : "secondary-source",
  };
  // MERGE, never replace. apply.js assigns `e.policyHistory = s.history`, which
  // is right for an entry gaining its first timeline and destructive here: 88
  // indigenous entries already carry rows from the policy-history routing pass,
  // and assigning would silently drop them. Deduped on year plus a normalised
  // description so a re-run adds nothing twice.
  if (typedHist) bucket[key].mergeHistory = typedHist;
}

console.log(`${files} files -> ${Object.keys(spec[domain] || {}).length} entries on ${domain}`);
for (const [key, s] of Object.entries(spec[domain] || {})) {
  const nb = Object.values(s.fields).reduce((a, b) => a + b.length, 0);
  console.log(`  ${key.padEnd(22)} ${Object.keys(s.fields).length} fields (${nb} bullets), ` +
    `${Object.keys(s.notEstablished).length} not-established, ${(s.history || []).length} history, ${s.addDocLinks.length} sources`);
}
if (problems.length) { console.log("\nPROBLEMS"); problems.forEach(p => console.log("  " + p)); }

// Clear exactly the fields named in REPLACE, so apply.js's overwrite guard —
// which exists to stop a generator flattening someone's research — passes for
// those and stays armed for everything else. Only on --write: a dry run must
// not touch the store.
if (process.argv.includes("--write") && REPLACE.size) {
  const FILES = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
  const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
  const file = path.join(ATLAS, "data", FILES[domain]);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  let cleared = 0;
  for (const spec_ of REPLACE) {
    const [d, cc, name, field] = spec_.split("|");
    if (d !== domain) continue;
    const e = rows.find(r => r.countryCode === cc && r.unitName === name);
    if (!e || !String(e[field] || "").trim()) continue;
    console.log(`\nREPLACING ${cc}|${name}/${field}, which held:\n  ${String(e[field]).slice(0, 150)}`);
    e[field] = "";
    cleared++;
  }
  if (cleared) fs.writeFileSync(file, JSON.stringify(rows, null, 1) + "\n");
}

run(spec);

// The timeline merge, after run() has written the fields.
if (process.argv.includes("--write")) {
  const FILES = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
  const ATLAS2 = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
  const file = path.join(ATLAS2, "data", FILES[domain]);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
  let added = 0, touched = 0, dupes = 0;
  for (const [key, s] of Object.entries(spec[domain] || {})) {
    if (!s.mergeHistory) continue;
    const [cc, name] = key.split("|");
    const e = rows.find(r => r.countryCode === cc && r.unitName === name);
    if (!e) continue;
    const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
    const fresh = s.mergeHistory.filter(h => {
      const sig = h.year + "|" + norm(h.description);
      if (have.has(sig)) { dupes++; return false; }
      have.add(sig);
      return true;
    });
    if (!fresh.length) continue;
    e.policyHistory = [...(e.policyHistory || []), ...fresh].sort((a, b) => a.year - b.year);
    added += fresh.length; touched++;
  }
  if (added) {
    fs.writeFileSync(file, JSON.stringify(rows, null, 1) + "\n");
    console.log(`  timeline: +${added} dated rows on ${touched} entries (${dupes} already present)`);
  }
}
