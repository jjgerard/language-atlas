// Zip a hand attribution of policyHistory rows against the live entries and
// emit apply-coding input.
//
//     node hist-attr-build.js <domain> <attributions.js> <out.json>
//
// The attribution file exports { "CC|Unit": [ [field, ...], ... ] } — one list
// per history row, IN THE ENTRY'S OWN ROW ORDER. It carries no years and no
// keys: those are read off the live data here, so a drafter cannot mistype one
// and a row cannot be attributed to a year it does not have.
//
// It refuses the whole run rather than writing a partial one if any entry's
// list length differs from its row count, if any value is outside the
// vocabulary, or if an attribution names an entry outside the coded set. A
// length mismatch means the drafter read a different version of the entry, and
// applying the first N would silently shift every attribution after the
// inserted row onto the wrong one.
//
// THE KEY IS BUILT THE SAME WAY EVERYWHERE: year plus the first 60 normalised
// characters of the description, TRIMMED. The trim is not cosmetic --
// store.js trims every free-text column on the way in, so a key cut mid-word
// lost its trailing space in storage and not at render time, and 26 of the
// first 185 rows silently failed to join because of it.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const { pathFor } = require("./datafile.js");
const { SCHEMES } = require(path.join(ROOT, "src", "coding.js"));

const [domainId, attrFile, outFile] = process.argv.slice(2);
if (!domainId || !attrFile || !outFile) {
  console.log("usage: hist-attr-build.js <domain> <attributions.js> <out.json>");
  process.exit(2);
}

// Same pair as hist-attribute.js --coded-only. Kept in step by hand, which is
// two places; if a third appears it belongs in one module.
const CODED_PAIR = {
  dld: ["identificationCriteria", "dischargeCriteria"],
  eal: ["newcomerCriteria", "removalCriteria"],
};
// indigenous, fl and he have NO criteria codings at all -- policyHistory is
// their only scheme -- so there is no pair to select on and the whole history
// is in scope. That is not a looser standard, it is the absence of the filter
// that made dld and eal a subset: on those two the point of the subset was the
// rows that could enter a cross-tab, and here there is nothing to cross yet.
const PAIR = CODED_PAIR[domainId] || [];

const scheme = SCHEMES[domainId + ".policyHistory"];
if (!scheme) { console.error("no policyHistory scheme for " + domainId); process.exit(2); }
const vocab = scheme.columns.fields_touched;

const A = require(path.resolve(attrFile));
const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const out = {};
const bad = [];
let n = 0;

for (const e of rows) {
  const c = e.coding || {};
  if (!PAIR.every(f => c[f] && Object.keys(c[f]).length)) continue;
  const key = e.countryCode + "|" + e.unitName;
  const hist = e.policyHistory || [];
  if (!hist.length) continue;
  const a = A[key];
  if (!a) { bad.push(key + ": no attribution written (" + hist.length + " rows)"); continue; }
  if (a.length !== hist.length) {
    bad.push(key + ": " + a.length + " attributions for " + hist.length + " rows");
    continue;
  }
  const seenKey = new Map();
  out[key] = {
    policyHistory: hist.map((h, i) => {
      for (const v of a[i]) {
        if (!Object.prototype.hasOwnProperty.call(vocab, v)) {
          bad.push(key + " row " + (i + 1) + ": " + JSON.stringify(v) + " is not in the vocabulary");
        }
      }
      n++;
      const y = String(h.year).match(/\d{4}/);
      const yr = y ? Number(y[0]) : h.year;
      const mk = norm(h.description).slice(0, 60).trim();
      const kk = yr + "|" + mk;
      const occ = (seenKey.get(kk) || 0) + 1;
      seenKey.set(kk, occ);
      return { year: yr, matches: mk, occurrence: occ, fields_touched: a[i] };
    }),
  };
}

const extra = Object.keys(A).filter(k => !out[k]);
if (extra.length) bad.push("attributions for entries outside the coded set: " + extra.join(", "));

// A key must identify ONE row within its entry, or the join at render time
// picks an arbitrary one.
for (const [k, v] of Object.entries(out)) {
  const seen = new Set();
  for (const r of v.policyHistory) {
    const kk = r.year + "|" + r.matches + "|" + r.occurrence;
    if (seen.has(kk)) bad.push(k + ": two rows share the key " + kk);
    seen.add(kk);
  }
}

if (bad.length) {
  console.log("REFUSED, nothing written:");
  bad.forEach(b => console.log("  " + b));
  process.exit(1);
}

fs.writeFileSync(outFile, JSON.stringify(out, null, 1) + "\n");
console.log("built " + n + " coding rows across " + Object.keys(out).length + " entries -> " + outFile);

const d = {};
for (const v of Object.values(out)) {
  for (const r of v.policyHistory) for (const f of r.fields_touched) d[f] = (d[f] || 0) + 1;
}
console.log("");
console.log("fields_touched (a row may carry more than one):");
for (const [k, v] of Object.entries(d).sort((x, y) => y[1] - x[1])) {
  console.log("  " + String(v).padStart(4) + "  " + k);
}

let real = 0, sys = 0, und = 0;
for (const v of Object.values(out)) for (const r of v.policyHistory) {
  if (r.fields_touched.includes("not determined")) und++;
  else if (r.fields_touched.length === 1 && r.fields_touched[0] === "system-wide") sys++;
  else real++;
}
const pc = x => Math.round(100 * x / n);
console.log("");
console.log("tied to at least one real field: " + real + "  (" + pc(real) + "%)");
console.log("system-wide only:               " + sys + "  (" + pc(sys) + "%)");
console.log("left `not determined`:          " + und + "  (" + pc(und) + "%)");
