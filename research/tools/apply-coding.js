// Write a coding pass onto entries.
//
//     node apply-coding.js <domain> <coding.json> [--write]
//
// A coding is what a reader made of the prose, as values from the fixed lists
// in src/coding.js. It is not a source and it does not touch one: this tool
// writes only the `coding` sidecar, never a field, so a coding can be revised
// or thrown away without any sourced claim moving.
//
// Input shape, keyed the way every other applier here is keyed:
//
//     {
//       "AT|Austria": {
//         "removalCriteria": { "exit_mechanism": "clock", "exit_period_months": 12 }
//       }
//     }
//
// EVERY VALUE IS CHECKED AGAINST THE VOCABULARY and a value that is not on the
// list is refused, loudly, with the field and the offending value named. It is
// not silently dropped and it does not stop the run. The reason is the whole
// design of this pass: a coder that cannot fit an entry is asked to report the
// misfit rather than pick the nearest value, so a pile of refusals here is
// information about the vocabulary and not merely an error log. If thirty
// entries will not fit, the list is wrong and should be argued with before
// anything is coded against it.
//
// Unit names are matched with accents folded, for the reason recorded in
// fl/apply.js: a run of forty-three verified units was once stopped by
// "Sao Tome and Principe" not matching "São Tomé and Príncipe".

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const write = args.includes("--write");
const [domainId, file] = args.filter(a => !a.startsWith("--"));
if (!domainId || !file) {
  console.log("usage: apply-coding.js <domain> <coding.json> [--write]");
  process.exit(2);
}

const root = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(root, "src", "domains.js"));
const { SCHEMES } = require(path.join(root, "src", "coding.js"));
const domain = (Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS)).find(d => d.id === domainId);
if (!domain) { console.error("no such domain: " + domainId); process.exit(2); }

let dataFile = path.join(root, "data", domainId + ".json");
if (!fs.existsSync(dataFile)) dataFile = path.join(root, "data", domainId + ".seed.json");
if (!fs.existsSync(dataFile)) { console.error("no data file for " + domainId); process.exit(2); }

const rows = JSON.parse(fs.readFileSync(dataFile, "utf8"));
const coding = JSON.parse(fs.readFileSync(file, "utf8"));

const unitKey = n => String(n).normalize("NFKD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function findEntry(cc, name) {
  const exact = rows.find(r => r.countryCode === cc && r.unitName === name);
  if (exact) return exact;
  const want = unitKey(name);
  const near = rows.filter(r => r.countryCode === cc && unitKey(r.unitName) === want);
  return near.length === 1 ? near[0] : null;
}

const content = v => {
  const t = String(v == null ? "" : v).trim();
  return t && !/^Not established/i.test(t) && !/^Not applicable/i.test(t);
};

let units = 0, cells = 0;
const refused = [], missing = [], empty = [];

for (const [key, byField] of Object.entries(coding)) {
  const [cc, name] = key.split("|");
  const e = findEntry(cc, name);
  if (!e) { missing.push(key); continue; }
  let touched = false;
  for (const [field, cols] of Object.entries(byField || {})) {
    const scheme = SCHEMES[domainId + "." + field];
    if (!scheme) { refused.push(key + "/" + field + ": no scheme for this field"); continue; }
    if (!content(e[field])) { empty.push(key + "/" + field); continue; }
    const row = {};
    for (const [col, value] of Object.entries(cols || {})) {
      const spec = scheme.columns[col];
      if (!spec) { refused.push(key + "/" + field + ": no column " + col); continue; }
      if (typeof spec === "string") { row[col] = value; continue; }
      const ok = x => Object.prototype.hasOwnProperty.call(spec, String(x));
      if (Array.isArray(value)) {
        const bad = value.filter(x => !ok(x));
        for (const b of bad) refused.push(key + "/" + field + "/" + col + ': "' + b + '" is not in the vocabulary');
        const kept = value.filter(ok);
        if (kept.length) row[col] = kept;
      } else if (ok(value)) row[col] = value;
      else refused.push(key + "/" + field + "/" + col + ': "' + value + '" is not in the vocabulary');
    }
    if (!Object.keys(row).length) continue;
    e.coding = e.coding || {};
    e.coding[field] = Object.assign({}, e.coding[field], row);
    cells += Object.keys(row).length;
    touched = true;
  }
  if (touched) units++;
}

if (missing.length) console.log("no entry for: " + missing.join(", "));
if (empty.length) console.log("field has no text to code, skipped: " + empty.join(", "));
if (refused.length) {
  console.log(String.fromCharCode(10) + "REFUSED " + refused.length + " value(s) not in the vocabulary:");
  for (const r of refused) console.log("  " + r);
  console.log("  A pile of these is information about the vocabulary, not only an error log.");
}
console.log(String.fromCharCode(10) + domainId + ": " + units + " units, " + cells + " coded cells");
if (write && units) {
  fs.writeFileSync(dataFile, JSON.stringify(rows, null, 2) + String.fromCharCode(10));
  console.log("wrote " + path.relative(root, dataFile));
} else if (units) {
  console.log("  (dry run - pass --write)");
}
