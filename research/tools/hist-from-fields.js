// Dated events sitting in an entry's PROSE that its policy history does not have.
//
//     node hist-from-fields.js <domain> [field,field,...]
//     node hist-from-fields.js <domain> --json <file>
//
// Same principle as lang-from-prose.js: this adds NO claim. Every candidate is
// a sentence already written, already sourced and already on the entry. What it
// does is notice that the sentence carries a DATE and that the entry's
// policyHistory does not record it.
//
// `revitalisation` is the richest seam by construction. Its third question is
// literally "since when", so a well-filled bullet carries a year:
//
//   "Academy of the Arabic Language, Knesset law March 2007, established
//    December 2007"
//   "Tamil Virtual Academy, est. 18 May 2000"
//   "Cherokee Nation's Durbin Feeling Language Preservation Act (2019)"
//
// Each of those is a dated change to language policy, which is what
// policyHistory is for -- and the restructure wants exactly this, because
// tagging a change to the variable it affects needs the change to be a ROW
// rather than a clause inside a paragraph.
//
// Nothing is written. A candidate needs a person to decide whether the
// sentence is a CHANGE or a description of a standing state, which is the one
// judgement the field turns on and the one no regex can make.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const { LIVE } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { pathFor } = require("./datafile");

const domain = process.argv[2];
if (!domain) { console.log("usage: node hist-from-fields.js <domain> [fields] [--json <file>]"); process.exit(1); }
const d = LIVE.find(x => x.id === domain);
if (!d) throw new Error("no live domain " + domain);

const argFields = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3].split(",") : null;
const TEXT = d.fields.filter(f => f[2] === "text").map(f => f[0]);
const LOOK = argFields || TEXT;

const YEAR = /\b(1[5-9]\d{2}|20[0-2]\d)\b/g;

// A sentence that merely CITES a document by its year is not a dated event:
// "under the 1991 Constitution" describes a standing state. A sentence with a
// verb of change is. This is a filter for the report's benefit, not a rule --
// borderline lines are still listed, marked.
const CHANGE = /\b(?:establish|found|creat|adopt|enact|pass|introduc|launch|open|clos|abolish|replac|amend|renam|merg|approv|ratif|sign|promulgat|begin|began|start|commenc|set up|took effect|came into force|entered into force|from|since|reform)/i;

const rows = JSON.parse(fs.readFileSync(pathFor(domain), "utf8"));

const out = {};
let units = 0, cands = 0, strong = 0;
for (const e of rows) {
  const known = new Set((e.policyHistory || []).map(h => String(h.year)));
  // Words already in this entry's history, so a candidate that merely restates
  // an existing row can be marked rather than offered as new.
  const histText = (e.policyHistory || []).map(h => String(h.description || "").toLowerCase()).join(" ");
  const hits = [];
  for (const k of LOOK) {
    const text = String(e[k] || "");
    if (!text.trim()) continue;
    // A sentinel field asserts nothing about the place.
    if (/^Not established|^Not applicable/i.test(text.trim())) continue;
    for (const line of text.split(NL)) {
      const t = line.trim();
      if (!t) continue;
      YEAR.lastIndex = 0;
      const years = [...new Set((t.match(YEAR) || []))];
      if (!years.length) continue;
      const fresh = years.filter(y => !known.has(y));
      if (!fresh.length) continue;
      // Does the entry's history already say roughly this? Rare shared words
      // are a cheap proxy and only used to LABEL, never to drop.
      const words = t.toLowerCase().match(/[a-zà-ÿ]{5,}/g) || [];
      const echo = words.filter(w => histText.includes(w)).length;
      hits.push({
        field: k,
        years: fresh,
        sentence: t,
        looksLikeChange: CHANGE.test(t),
        echoesHistory: echo >= 3,
      });
    }
  }
  if (!hits.length) continue;
  units++; cands += hits.length;
  strong += hits.filter(h => h.looksLikeChange && !h.echoesHistory).length;
  out[e.countryCode + "|" + e.unitName] = {
    cc: e.countryCode,
    unit: e.unitName,
    historyYears: [...known].sort(),
    candidates: hits,
    docLinks: (e.docLinks || []).map(l => ({ label: l.label, url: l.url })),
  };
}

const at = process.argv.indexOf("--json");
if (at >= 0 && process.argv[at + 1]) {
  fs.writeFileSync(process.argv[at + 1], JSON.stringify(out, null, 1) + NL);
  console.log("wrote " + process.argv[at + 1]);
}
console.log(cands + " dated sentence(s) on " + units + " units are not in that unit's policy history");
console.log("  " + strong + " read as a CHANGE and do not echo an existing row" + NL);
const byField = {};
for (const v of Object.values(out)) for (const c of v.candidates) byField[c.field] = (byField[c.field] || 0) + 1;
for (const [k, n] of Object.entries(byField).sort((a, b) => b[1] - a[1])) console.log("  " + k.padEnd(22) + n);
console.log();
for (const [key, v] of Object.entries(out).slice(0, 10)) {
  const best = v.candidates.filter(c => c.looksLikeChange && !c.echoesHistory).slice(0, 2);
  if (!best.length) continue;
  console.log(key);
  for (const c of best) console.log("   " + c.years.join(",") + "  [" + c.field + "]  " + c.sentence.slice(0, 78));
}
