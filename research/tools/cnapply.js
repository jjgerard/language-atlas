// Apply China's entry to the eal and fl maps.
//
//     node cnapply.js [--write]
//
// One file, two maps: the agent prefixed every field `eal.` or `fl.`, so this
// splits on that rather than on the filename the way the other waves do.
//
// China matters out of proportion to being one unit. Its 31 provinces hold no
// entries of their own and inherit from the national record, so filling it
// fills 32 units on each of the two maps.
//
// The timeline is routed by subject with the same classifier the policy-history
// pass uses, because the rows genuinely split: the gaokao and curriculum-plan
// rows belong to the foreign-language timeline and the language-law, minority
// and Putonghua rows to the second-language one. A row about the school system
// in general goes to both.
const fs = require("fs");
const path = require("path");
const { parseFile } = require("./parseparts");
const { subjectsOf } = require("./histbuild");
const { run } = require("./fl/apply");

const FILE = "w4-CN.md";
const KEY = "CN|China";
const PARTS = path.join(__dirname, "..", "parts");
const text = fs.readFileSync(path.join(PARTS, FILE), "utf8");

// Only the final section counts: the agent appended drafts as it went and then
// wrote a block that says it supersedes them. Parsing the whole file would take
// the superseded ones too.
const finalAt = text.indexOf("FINAL DRAFT BULLETS");
if (finalAt < 0) { console.log("no FINAL DRAFT BULLETS section"); process.exit(1); }
const tail = text.slice(finalAt);

function bullets(block) {
  const out = {};
  // The `(?!field:)` is what stops a bullet list eating the next block: the
  // following " - field: eal.l2Support" line is itself shaped like a bullet, so
  // without it each list swallowed the next field and two of every four fields
  // vanished — with "field: eal.l2Support" written into the entry as a bullet.
  const re = /-\s*field:\s*([a-z]+)\.([A-Za-z0-9]+)\s*\n\s*bullets:\s*\n((?:[ \t]+-[ \t]+(?!field:).*\n?)+)/g;
  let m;
  while ((m = re.exec(block))) {
    const [, domain, field, body] = m;
    (out[domain] = out[domain] || {})[field] =
      body.split("\n").map(l => l.replace(/^[ \t]*-[ \t]*/, "").trim()).filter(Boolean);
  }
  return out;
}

function history(block) {
  const i = block.indexOf("POLICY HISTORY ROWS");
  if (i < 0) return [];
  const rows = [];
  const re = /-\s*year:\s*(\d{4})\s*\n\s*description:\s*(.+)/g;
  let m;
  while ((m = re.exec(block.slice(i)))) rows.push({ year: Number(m[1]), description: m[2].trim() });
  return rows;
}

function sources(block) {
  const out = [];
  const re = /-\s*label:\s*"?([^"\n]+)"?\s*\n\s*url:\s*(\S+)/g;
  let m;
  while ((m = re.exec(block))) {
    const url = m[2].replace(/[.,]$/, "");
    if (!out.some(l => l.url === url)) out.push({ label: m[1].trim().replace(/"$/, ""), url });
  }
  return out;
}

const byDomain = bullets(tail);
const hist = history(tail);
const docs = sources(text);          // sources are spread through the whole file

// Route each dated row to the map whose question it is about.
const histFor = {};
// Routed by hand, not by the classifier.
//
// The generic subject classifier is tuned for English policy prose and reads
// these badly: it sent 15 of 16 rows to both maps, putting a senior-secondary
// German/French/Spanish revision on the second-language timeline and a
// minority-textbook decision on the foreign-language one. Sixteen rows for one
// country is small enough to assign correctly by reading them, and pretending
// otherwise would leave two visibly wrong timelines on the busiest entry in the
// atlas.
//
// `both` is only for instruments that genuinely govern both questions: the
// enabling education statutes and the curriculum plan that sets the
// foreign-language rule and the medium rule in one document.
const ROUTE = [
  [1984, "Regional Ethnic Autonomy Law", ["eal"]],
  [1992, "implementing rules", ["eal"]],
  [1995, "Education Law of the PRC enacted", ["eal", "fl"]],
  [2000, "Law on the Standard Spoken", ["eal"]],
  [2001, "Regional Ethnic Autonomy Law amended", ["eal"]],
  [2006, "Compulsory Education Law revised", ["eal", "fl"]],
  [2014, "gaokao", ["fl"]],
  [2015, "bilingual education", ["eal"]],
  [2017, "unified three-subject textbooks", ["eal"]],
  [2020, "German, French and Spanish", ["fl"]],
  [2020, "begin the", ["eal"]],
  [2021, "Education Law third amendment", ["eal"]],
  [2021, "童语同音", ["eal"]],
  [2022, "curriculum plan and 16 standards", ["eal", "fl"]],
  [2025, "Language Law revised", ["eal"]],
  [2026, "enters int", ["eal"]],
];
const unrouted = [];
for (const row of hist) {
  const hit = ROUTE.find(([y, frag]) => y === row.year && row.description.includes(frag));
  if (!hit) { unrouted.push(row); continue; }
  for (const d of hit[2]) (histFor[d] = histFor[d] || []).push(row);
}
if (unrouted.length) {
  console.log(`\n${unrouted.length} rows matched no routing rule and are NOT written:`);
  unrouted.forEach(r => console.log("  " + r.year + "  " + r.description.slice(0, 76)));
}
for (const d of Object.keys(histFor)) histFor[d].sort((a, b) => a.year - b.year);

const spec = {};
for (const [domain, fields] of Object.entries(byDomain)) {
  spec[domain] = {
    [KEY]: {
      fields,
      addDocLinks: docs,
      confidence: "official-document",
      history: histFor[domain] || [],
    },
  };
}

for (const [d, s] of Object.entries(spec)) {
  const e = s[KEY];
  console.log(`${d}: ${Object.keys(e.fields).length} fields, ` +
    `${Object.values(e.fields).reduce((a, b) => a + b.length, 0)} bullets, ` +
    `${e.history.length} history rows, ${e.addDocLinks.length} sources`);
  for (const [k, v] of Object.entries(e.fields)) {
    console.log("  " + k);
    v.forEach(b => console.log("    " + String(b.length).padStart(3) + "  " + b));
  }
}
console.log(`\n${hist.length} timeline rows read; routed to ` +
  Object.entries(histFor).map(([d, r]) => `${d} ${r.length}`).join(", "));

run(spec);
