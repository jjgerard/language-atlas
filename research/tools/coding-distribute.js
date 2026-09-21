// The distribution of a coding, on the terminal, the way /patterns renders it.
//
//     node coding-distribute.js <domain> [field] [--all]
//     node coding-distribute.js dld identificationCriteria
//
// The point of a coding pass is the distribution, and waiting for a deploy to
// see it is a slow way to find out that a column came out 97% one value. This
// reads the same payload shape the page does, so what it prints is what the
// page will print.
//
// Three reading rules, all of them the page's:
//
// A LIST COLUMN IS COUNTED ONCE PER VALUE. A system with a fixed period and an age
// ceiling is doing both, and picking one would be exactly the discarding the
// vocabularies were revised to stop -- so a column's total can exceed the
// number of systems, and the percentages are of systems stating that column,
// not of the corpus.
//
// NUMERIC AND FREE-TEXT COLUMNS ARE LEFT OUT. A period in months has no
// categories to distribute; it belongs in the /views CSV.
//
// `not stated` IS A VALUE, never a blank. It says somebody read the entry and
// the entry does not answer. An UNSET cell is a different thing again -- it
// says the vocabulary had no honest value for what the entry does say -- and
// the gap between "stated on N" and the corpus size is where those live. Watch
// that gap: it is the argument for revising the vocabulary.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ROOT, "src", "domains"));
const { SCHEMES, codingRows } = require(path.join(ROOT, "src", "coding"));
const { pathFor } = require("./datafile");

const args = process.argv.slice(2);
const all = args.includes("--all");
const [domainId, only] = args.filter(a => !a.startsWith("--"));
if (!domainId) { console.log("usage: coding-distribute.js <domain> [field] [--all]"); process.exit(2); }
const domain = DOMAINS.find(d => d.id === domainId);
if (!domain) { console.error("no such domain: " + domainId); process.exit(2); }

let rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
if (!all) rows = rows.filter(r => r.isNational !== false);

const fields = Object.keys(SCHEMES)
  .filter(k => k.startsWith(domainId + "."))
  .map(k => k.slice(domainId.length + 1))
  .filter(f => !only || f === only);
if (!fields.length) { console.error("no coding scheme for " + domainId + (only ? "." + only : "")); process.exit(2); }

const NL = String.fromCharCode(10);
let anything = false;
for (const field of fields) {
  const coded = rows.filter(r => r.coding && r.coding[field] && Object.keys(r.coding[field]).length);
  if (!coded.length) {
    console.log(NL + domainId + "." + field + " -- nothing coded yet");
    continue;
  }
  anything = true;
  const scheme = SCHEMES[domainId + "." + field];
  let rowTotal = 0;
  for (const r of coded) rowTotal += codingRows(r.coding[field]).length;
  console.log(NL + domainId + "." + field + " -- " + coded.length + " coded"
    + (rowTotal !== coded.length ? ", " + rowTotal + " rows" : "")
    + "   [one row = " + scheme.row + "]" + NL);
  for (const [col, spec] of Object.entries(scheme.columns)) {
    if (typeof spec === "string") continue;          // free text or numeric
    // An instrument-grained field stores an ARRAY of rows; codingRows() hands
    // back one either way, so the denominator below is ROWS, not units. That is
    // the right denominator for those fields and the heading says so.
    const counts = {};
    let n = 0, total = 0;
    for (const r of coded) for (const row of codingRows(r.coding[field])) {
      total++;
      const v = row[col];
      if (v == null || v === "") continue;
      n++;
      for (const x of (Array.isArray(v) ? v : [v])) counts[x] = (counts[x] || 0) + 1;
    }
    const unset = total - n;
    console.log("  " + col.replace(/_/g, " ").toUpperCase()
      + "   stated on " + n + " of " + total
      + (unset ? "   (" + unset + " UNSET -- no value fitted)" : ""));
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (!entries.length) { console.log("    (none)" + NL); continue; }
    const top = entries[0][1];
    for (const [v, k] of entries)
      console.log("    " + String(k).padStart(3) + "  "
        + (Math.round(100 * k / n) + "%").padStart(4) + "  "
        + "#".repeat(Math.max(1, Math.round(k / top * 30))).padEnd(31) + v);
    console.log("");
  }
}
if (!anything) console.log("The vocabularies are in src/coding.js; nothing has been coded against them.");
