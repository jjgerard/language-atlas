// Classify every policyHistory row that carries no `operation`, and re-emit the
// entry's full coding array so apply-coding.js can write it.
//
//     node research/tools/hist-notop-build.js <domain> <out.json>
//
// WHY A SEPARATE BUILDER. hist-op-build.js works from an emitted batch and a
// decisions file keyed by index, which is right when a reader is going row by
// row. This column has three values and a rule that can be applied by reading
// the sentence, so the classification lives here and is auditable as code: the
// alternative was a 78-line index file that nobody could check against the
// corpus.
//
// The `many` grain still applies -- apply-coding.js REPLACES the array rather
// than merging it -- so every row is re-emitted with the columns it already has.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");
const { NOT_AN_OPERATION } = require(path.join(__dirname, "..", "..", "src", "coding.js"));

const [, , domainId, outFile] = process.argv;
if (!outFile) { console.error("usage: hist-notop-build.js <domain> <out.json>"); process.exit(2); }

const key60 = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 60).trim();
const norm = s => String(s || "").replace(/\s+/g, " ").trim();

// THE LINE, and it is the one the hand pass used without naming it: is the
// evidence the sentence's SUBJECT, or an aside inside a sentence about an event?
// Eight rows across the corpus carry a provenance caveat and still describe an
// operation -- "Punjab Act 25 of 2008, exists; text not found" is about the Act
// -- and they are left alone. These patterns match only rows that OPEN with the
// evidence or consist of nothing else.
const SOURCE_NOTE = [
  /^(the )?(source|evidence)\b/i,                       // "The source is…", "Evidence is…"
  /^(peer-reviewed|ecs reading|inventory covers)\b/i,    // the three big United States families
  /^what follows is\b/i,                                // Connecticut
  /^both sources\b/i,                                   // Afghanistan
  /\bsealed copy is an image-only scan\b/i,              // Solomon Islands
];
const TEXT_INCOMPLETE = /(^|\s)For primary school there is a slight increase/i;
const ANOTHER_ROW = /^It replaces the model in force since\b/i;

const classify = d => {
  if (TEXT_INCOMPLETE.test(d)) return "text incomplete";
  if (ANOTHER_ROW.test(d)) return "subject is another row";
  if (SOURCE_NOTE.some(re => re.test(d))) return "source note";
  return null;
};

const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
const out = {};
let classified = 0, unclassified = 0, untouched = 0;
const tally = {}, misses = [];

for (const e of rows) {
  const hist = Array.isArray(e.policyHistory) ? e.policyHistory : [];
  if (!hist.length) continue;
  const already = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
  const seen = {};
  const arr = [];
  let touched = false;
  for (const h of hist) {
    const d = norm(h.description);
    const k = key60(d);
    const kk = norm(h.year) + "|" + k;
    seen[kk] = (seen[kk] || 0) + 1;
    const prior = already.find(c => String(c.year) === String(h.year)
      && String(c.matches) === k
      && Number(c.occurrence || 1) === seen[kk]) || null;
    const row = Object.assign({}, prior, { year: norm(h.year), matches: k, occurrence: seen[kk] });
    if (prior && prior.operation) { untouched++; }
    else {
      const v = classify(d);
      if (v) { row.not_an_operation = v; tally[v] = (tally[v] || 0) + 1; classified++; touched = true; }
      else { unclassified++; misses.push(e.countryCode + " " + e.unitName + " [" + h.year + "] " + d.slice(0, 90)); }
    }
    const cols = Object.keys(row).filter(c => c !== "year" && c !== "matches" && c !== "occurrence");
    if (cols.length) arr.push(row);
  }
  if (touched && arr.length) out[e.countryCode + "|" + e.unitName] = { policyHistory: arr };
}

fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + "\n");
console.log(domainId + ": " + classified + " rows classified, " + unclassified
  + " left unclassified, " + untouched + " already carry an operation");
for (const v of Object.keys(NOT_AN_OPERATION)) if (tally[v]) console.log("  " + v.padEnd(24) + String(tally[v]).padStart(4));
if (misses.length) {
  console.log("\n  UNCLASSIFIED -- these carry no operation and no reason, which is the one");
  console.log("  state this column exists to remove. Read them before adding a pattern:");
  for (const m of misses) console.log("    " + m);
}
console.log("wrote " + path.relative(process.cwd(), outFile));
