// Fold a decisions file back into a full policyHistory coding array.
//
//     node research/tools/hist-op-build.js <domain> <batch.json> <decisions.json> <out.json>
//
// WHY THIS EXISTS. apply-coding.js REPLACES a `many` field's array rather than
// merging it, and says why: pairing row 2 of a new reading with row 2 of an old
// one would be a guess about which instrument each is. That is right, and it
// means a pass adding ONE column has to re-emit every row it is not changing,
// carrying the columns already there. Writing `operation` alone would have
// deleted 98 `fields_touched` codings in this batch without a single refusal.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");
const [, , domainId, batchFile, decFile, outFile] = process.argv;
if (!outFile) { console.error("usage: hist-op-build.js <domain> <batch.json> <decisions.json> <out.json>"); process.exit(2); }

const batch = JSON.parse(fs.readFileSync(batchFile, "utf8"));
const dec = JSON.parse(fs.readFileSync(decFile, "utf8"));
delete dec._note;
const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));

// Same key as the batch: cc + year + the 60-character normalised description.
const kk = r => r.cc + "|" + r.year + "|" + r.matches + "|" + (r.occurrence || 1);
const ops = {};
for (const [i, op] of Object.entries(dec)) {
  const r = batch[Number(i)];
  if (!r) { console.error("no batch row at index " + i); process.exit(1); }
  ops[kk(r)] = op;
}

const units = new Set(batch.map(r => r.cc + "|" + r.unit));
const out = {};
let written = 0, carried = 0, skipped = 0;
for (const e of rows) {
  const key = e.countryCode + "|" + e.unitName;
  if (!units.has(key)) continue;
  const existing = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
  const mine = batch.filter(r => r.cc + "|" + r.unit === key);
  const arr = [];
  for (const r of mine) {
    const prior = existing.find(c => String(c.year) === r.year
      && String(c.matches) === r.matches
      && Number(c.occurrence || 1) === Number(r.occurrence || 1)) || null;
    const row = Object.assign({}, prior, {
      year: r.year, matches: r.matches, occurrence: r.occurrence,
    });
    const op = ops[kk(r)];
    if (op) { row.operation = op; written++; }
    if (prior && prior.fields_touched) carried++;
    // A row with nothing but its own key is not a coding. Dropping it keeps the
    // UNSET decision visible as an absence rather than as an empty row.
    const cols = Object.keys(row).filter(c => c !== "year" && c !== "matches" && c !== "occurrence");
    if (!cols.length) { skipped++; continue; }
    arr.push(row);
  }
  if (arr.length) out[key] = { policyHistory: arr };
}

fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + "\n");
console.log(Object.keys(out).length + " units");
console.log("  operation values written:      " + written);
console.log("  prior fields_touched carried:  " + carried);
console.log("  key-only rows dropped (UNSET): " + skipped);
console.log("wrote " + path.relative(process.cwd(), outFile));
