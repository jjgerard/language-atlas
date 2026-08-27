// Draft policyHistory rows from the EVIDENCE blocks in research/parts.
//
//     node hist-from-parts.js                        # dry run, with a sample
//     node hist-from-parts.js --domain dld
//     node hist-from-parts.js --sample 40
//     node hist-from-parts.js --out research/hist-specs   # write spec files
//
// histbuild.js has read these files for months and has never seen this. It
// starts at the DRAFT BULLETS heading, which is where a researcher wrote the
// text destined for a field; everything above it -- 5,039 EVIDENCE entries,
// 4,288 of them carrying a url -- it skips. That was the right economy when
// the job was filling fields, because a bullet is what a field wants.
//
// A timeline row wants something a bullet cannot give: the verbatim sentence
// from the source, and the url it was read from. That is exactly what an
// EVIDENCE entry is, and it is exactly what hist-verify.js asks for. So this
// mines the block histbuild passes over, and it emits SPEC FILES rather than
// writing to the store, because the whole point of the gate is that nothing
// reaches an entry on a drafter's word -- not even a drafter who wrote their
// quote down at the time they retrieved it.
//
// The output is therefore a PROPOSAL. It becomes data only after:
//
//     node hist-verify.js <specDir>          # fetch each url, find the quote
//     node hist-apply.js <specDir>/hist-verified.json --write
//
// Which means this tool can run with no network at all, and the gate can run
// later, on a machine that has one.
//
// The vocabulary that decides what qualifies, and the subject routing that
// decides which map a row lands on, are hist-guards.js -- the same rules
// hist-from-prose and histbuild apply, not a third copy of them.
const fs = require("fs");
const path = require("path");
const { sections } = require("./parseparts");
const { resolveHeader } = require("./unitkey");
const { subjectsOf, GENERAL_MAPS, declineReason, yearsIn, THIS_YEAR } = require("./hist-guards");

const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const PARTS = path.join(__dirname, "..", "parts");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const { LIVE } = require(path.join(ATLAS, "src", "domains.js"));
const { hasContent } = require(path.join(ATLAS, "src", "derive.js"));

const args = process.argv.slice(2);
const flag = (name, dflt) => (args.includes(name) ? args[args.indexOf(name) + 1] : dflt);
const onlyDomain = flag("--domain", null);
const sampleN = Number(flag("--sample", 25)) || 25;
const outDir = flag("--out", null);

// ---------------------------------------------------------------------------
// The store, and what counts as documented
// ---------------------------------------------------------------------------

// A unit gets a timeline on a map only where it has something to say on that
// map. An undocumented entry carrying dates is a map with a chronology and no
// answer, which reads as coverage and is not. Judged with the atlas's own
// hasContent, so "Not established from the sources consulted" counts as the
// looked-and-found-nothing that it is rather than as content.
const live = {};
for (const d of LIVE) {
  const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", STORE[d.id]), "utf8"));
  live[d.id] = { fields: d.fields, byKey: new Map(rows.map(r => [r.countryCode + "|" + r.unitName, r])) };
}
const documented = (d, key) => {
  const e = live[d].byKey.get(key);
  return !!e && live[d].fields.some(([k]) => hasContent(e[k]));
};

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
const existing = (d, key) => {
  const e = live[d].byKey.get(key);
  return new Set(((e && e.policyHistory) || []).map(h => h.year + "|" + norm(h.description)));
};

// ---------------------------------------------------------------------------
// Reading an EVIDENCE block
// ---------------------------------------------------------------------------

// The block runs from its own heading to DRAFT BULLETS, or to the end of the
// section when a researcher recorded evidence and drafted nothing from it --
// which is common, and is precisely where the unmined rows are.
// Sliced rather than matched with a lookahead: `$` under the `m` flag is the
// end of a LINE, so a lazy run stopped at the first newline and every block
// came back empty. Reported as 5,039 entries found and nought proposed, which
// looks like a seam that is mined out rather than a regex that never read it.
function evidenceOf(body) {
  const start = body.search(/^EVIDENCE:/m);
  if (start < 0) return [];
  let block = body.slice(start);
  const stop = block.search(/^(DRAFT BULLETS|LANGUAGES:)/m);
  if (stop > 0) block = block.slice(0, stop);
  const out = [];
  for (const e of block.matchAll(/^\s*-\s*field:\s*(\S+)\s*\r?\n\s*quote:\s*"([\s\S]*?)"\s*\r?\n\s*source:\s*(.+)$/gm)) {
    out.push({ field: e[1].replace(/[:,]$/, ""), quote: e[2].trim(), source: e[3].trim() });
  }
  return out;
}

// A source line is a url plus, often, the researcher's note about WHERE on the
// page the quote sits ("cl. 5.1.1", "footnote 3 to the time-allocation table").
// The note is worth keeping in the label and must not end up in the url.
function urlOf(source) {
  const m = String(source).match(/https?:\/\/\S+/);
  if (!m) return null;
  return m[0].replace(/[),.;]+$/, "");
}

// The sentence the year sits in, which is what the row will say. A quote is
// frequently several sentences; publishing all of them puts a paragraph on a
// timeline, and publishing the first puts a date next to the wrong clause.
function sentenceWithYear(quote, year) {
  const parts = String(quote).replace(/\s+/g, " ").split(/(?<=[.;])\s+/);
  const hit = parts.find(p => p.includes(String(year)));
  return (hit || String(quote).replace(/\s+/g, " ")).trim();
}

// ---------------------------------------------------------------------------
// The pass
// ---------------------------------------------------------------------------

const specs = {};                       // "domain|cc|unitName" -> {history, sources}
const stats = { files: 0, evidence: 0, noUrl: 0, noYear: 0, manyYears: 0, future: 0,
                declined: {}, unresolved: 0, noSubject: 0, undoc: 0, dupeStore: 0, dupeSpec: 0, kept: 0 };
const noSubjectSamples = [], samples = [];
const seenSpec = new Set();

for (const f of fs.readdirSync(PARTS).filter(x => x.endsWith(".md")).sort()) {
  const text = fs.readFileSync(path.join(PARTS, f), "utf8");
  stats.files++;
  for (const sec of sections(text)) {
    const key = resolveHeader(sec.head);
    if (!key) { stats.unresolved++; continue; }

    const sourceLabels = new Map();
    for (const m of sec.body.matchAll(/^[ \t]*-[ \t]*label:[ \t]*"?(.+?)"?[ \t]*\r?\n[ \t]*url:[ \t]*(\S+)/gm)) {
      const u = m[2].replace(/[),.]+$/, "");
      if (/^https?:\/\//i.test(u) && !sourceLabels.has(u)) sourceLabels.set(u, m[1].trim());
    }

    for (const ev of evidenceOf(sec.body)) {
      stats.evidence++;
      const url = urlOf(ev.source);
      if (!url) { stats.noUrl++; continue; }

      const years = yearsIn(ev.quote);
      if (!years.length) { stats.noYear++; continue; }
      // A quote naming several years is a range or a chain of amendments, and
      // which one the row belongs to is a judgement rather than a match. Left,
      // as hist-from-prose leaves it, rather than guessed.
      if (years.length > 1) { stats.manyYears++; continue; }
      const year = years[0];
      if (year > THIS_YEAR) { stats.future++; continue; }

      const description = sentenceWithYear(ev.quote, year);
      const why = declineReason(description);
      if (why) { stats.declined[why] = (stats.declined[why] || 0) + 1; continue; }

      // The panel renders a row on one or two lines. hist-from-prose settled on
      // 118 characters for the same reason and the timeline should not have two
      // house styles.
      let desc = description;
      if (desc.length > 118) desc = desc.slice(0, 115).replace(/[\s,;:]+\S*$/, "") + "…";
      if (desc.length < 40) { stats.declined.tooShort = (stats.declined.tooShort || 0) + 1; continue; }

      const subs = subjectsOf(description);
      if (!subs.length) {
        stats.noSubject++;
        if (noSubjectSamples.length < 20) noSubjectSamples.push(year + " " + desc.slice(0, 76));
        continue;
      }
      const domains = (subs[0] === "*" ? GENERAL_MAPS : subs)
        .filter(d => (!onlyDomain || d === onlyDomain) && documented(d, key));
      if (!domains.length) { stats.undoc++; continue; }

      for (const d of domains) {
        const sig = year + "|" + norm(desc);
        if (existing(d, key).has(sig)) { stats.dupeStore++; continue; }
        const specKey = d + "|" + key;
        if (seenSpec.has(specKey + "|" + sig)) { stats.dupeSpec++; continue; }
        seenSpec.add(specKey + "|" + sig);

        const s = (specs[specKey] = specs[specKey] || { history: [], sources: [] });
        s.history.push({ year, description: desc, url, quote: ev.quote.replace(/\s+/g, " ") });
        if (!s.sources.some(x => x.url === url)) {
          s.sources.push({ label: sourceLabels.get(url) || ev.source.replace(/\s+/g, " ").slice(0, 160), url });
        }
        stats.kept++;
        if (samples.length < sampleN) samples.push(d.padEnd(11) + key.padEnd(26) + year + "  " + desc.slice(0, 74));
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

for (const k of Object.keys(specs)) specs[k].history.sort((a, b) => a.year - b.year);

const perDomain = {};
for (const [k, v] of Object.entries(specs)) {
  const d = k.split("|")[0];
  perDomain[d] = perDomain[d] || { units: 0, rows: 0 };
  perDomain[d].units++; perDomain[d].rows += v.history.length;
}

console.log(stats.files + " part files read" + (onlyDomain ? ", filtered to " + onlyDomain : ""));
console.log(stats.evidence + " EVIDENCE entries" + NL);
for (const d of Object.keys(STORE)) {
  const p = perDomain[d] || { units: 0, rows: 0 };
  console.log("  " + d.padEnd(11) + String(p.rows).padStart(4) + " rows proposed across " + String(p.units).padStart(3) + " entries");
}
console.log(NL + "  declined, no url on the source line: " + stats.noUrl);
console.log("  declined, no year in the quote:      " + stats.noYear);
console.log("  declined, several years in one quote:" + String(stats.manyYears).padStart(5));
for (const [k, v] of Object.entries(stats.declined)) console.log("  declined, " + (k + ":").padEnd(29) + String(v).padStart(5));
console.log("  declined, no subject matched:        " + stats.noSubject);
console.log("  declined, unit not documented there: " + stats.undoc);
console.log("  already on the timeline:             " + stats.dupeStore);
console.log("  duplicate within this run:           " + stats.dupeSpec);
console.log("  header did not resolve to a unit:    " + stats.unresolved);

console.log(NL + "SAMPLE - read these before running the gate:");
samples.forEach(s => console.log("  " + s));

if (noSubjectSamples.length) {
  console.log(NL + "DROPPED for no subject (a real row here means the routing needs a word):");
  noSubjectSamples.forEach(s => console.log("  " + s));
}

if (outDir) {
  const dir = path.isAbsolute(outDir) ? outDir : path.join(ATLAS, outDir);
  fs.mkdirSync(dir, { recursive: true });
  // One file per domain, so a pass can be run and reviewed a map at a time.
  // hist-verify reads every .json in the directory and merges them.
  for (const d of Object.keys(STORE)) {
    const subset = Object.fromEntries(Object.entries(specs).filter(([k]) => k.startsWith(d + "|")));
    if (!Object.keys(subset).length) continue;
    const p = path.join(dir, "parts-" + d + ".json");
    fs.writeFileSync(p, JSON.stringify(subset, null, 1) + NL);
    console.log(NL + "  wrote " + p);
  }
  console.log(NL + "  next: node hist-verify.js " + dir);
} else {
  console.log(NL + "  (dry run - pass --out <dir> to write spec files for hist-verify.js)");
}
