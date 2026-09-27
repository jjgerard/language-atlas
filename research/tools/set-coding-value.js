// Set ONE coded column on named units, building the coding from the stored
// rows rather than from anybody's memory of them.
//
//     node set-coding-value.js <domain> <field> <column> <values.json> [out.json]
//     node set-coding-value.js dld legalEntitlement redress_type redress.json research/codings/redress-eu-02.json
//
// `values.json` is `{ "CC|Unit Name": "the value" }`, or, where the field is
// instrument-grained and the value belongs to one instrument rather than to the
// system, `{ "CC|Unit Name": { "row": 2, "value": "court" } }`. `row` is the
// index in the stored array; omit it and row 0 takes the value.
//
// WHY THIS EXISTS. apply-coding.js REPLACES a many-grained field's array rather
// than merging into it -- it has to, since there is no identity to merge on --
// so a coding file for such a field must restate every row of every unit it
// touches. Restating them by hand is a silent data loss waiting to happen, and
// it happened: a recode of six European entries, hand-written from the report
// rather than from the file, would have dropped Albania's duty_org, changed
// Austria's spelling of its duty holder, and moved four `obliges` levels from 3
// to 1 or 2 -- while reporting "6 units, 46 coded cells" and looking correct.
// It was caught by diffing the proposal against the stored rows before writing,
// which is the check this tool makes unnecessary by construction.
//
// It emits a coding file; it does not write to the data file. apply-coding.js
// still validates every value against the vocabulary and coding-verify.js still
// proves nothing else moved.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile");
const { SCHEMES } = require("../../src/coding.js");

const NL = String.fromCharCode(10);
const [, , domainId, field, column, valuesFile, outFile] = process.argv;
if (!domainId || !field || !column || !valuesFile) {
  console.log("usage: set-coding-value.js <domain> <field> <column> <values.json> [out.json]");
  process.exit(1);
}
const scheme = SCHEMES[domainId + "." + field];
if (!scheme) { console.error(`no scheme for ${domainId}.${field}`); process.exit(2); }
const def = (scheme.columns || {})[column];
if (!def) { console.error(`${domainId}.${field} has no column ${column}`); process.exit(2); }
const allowed = def && typeof def === "object" ? new Set(Object.keys(def)) : null;

const wanted = JSON.parse(fs.readFileSync(valuesFile, "utf8"));
const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
const byKey = new Map(rows.map(e => [e.countryCode + "|" + e.unitName, e]));

const out = {};
let set = 0, unchanged = 0;
const problems = [];

for (const [key, spec] of Object.entries(wanted)) {
  const e = byKey.get(key);
  if (!e) { problems.push(`${key}: no entry`); continue; }
  const stored = (e.coding || {})[field];
  if (!stored) { problems.push(`${key}: no coding on ${field} — code the field first`); continue; }
  const value = typeof spec === "object" && spec !== null ? spec.value : spec;
  const at = typeof spec === "object" && spec !== null && spec.row != null ? Number(spec.row) : 0;
  if (allowed && !allowed.has(value)) { problems.push(`${key}: "${value}" is not a ${column} value`); continue; }

  // A deep copy, so the file on disk is never the object being edited.
  const copy = JSON.parse(JSON.stringify(stored));
  if (Array.isArray(copy)) {
    if (!copy[at]) { problems.push(`${key}: no row ${at} (${copy.length} row(s))`); continue; }
    if (copy[at][column] === value) { unchanged++; continue; }
    copy[at][column] = value;
  } else {
    if (copy[column] === value) { unchanged++; continue; }
    copy[column] = value;
  }
  out[key] = { [field]: copy };
  set++;
  console.log(`  ${key}: ${column}${Array.isArray(copy) ? `[${at}]` : ""} = ${value}`);
}

for (const p of problems) console.log("REFUSED: " + p);
console.log(`${NL}${set} unit(s) to change, ${unchanged} already at that value, ${problems.length} refused`);
if (problems.length) { console.log("  nothing written: fix the refusals first"); process.exit(1); }
if (!set) process.exit(0);

const dest = outFile || path.join("research", "codings", `${field}-${column}.json`);
fs.writeFileSync(dest, JSON.stringify(out, null, 2) + NL);
console.log(`  wrote ${dest} — dry run it with apply-coding.js, then --write`);
