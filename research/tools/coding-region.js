// REGION x a coding column, for any domain/field/column.
//
//     node coding-region.js <domain> <field> <column> [--all]
//
// The question this answers is "do regions differ", and the reason it prints
// mean docLinks beside every row is that in this corpus region and
// documentation depth are collinear. Three findings in CROSSTABS.md died on
// exactly that: a pattern that looks regional is usually a pattern about who
// writes things down. A row with 2.8 mean docLinks and a row with 5.2 are not
// two samples of the same measurement.
//
// National units only by default. Sub-national units are a country counted
// many times -- the threshold x discharge cross reached p = 0.04 over all units
// and p = 0.17 over national ones, on five Chinese provinces in one cell.
const fs = require("fs");
const { pathFor } = require("./datafile.js");

const [, , domainId, field, column] = process.argv;
if (!domainId || !field || !column) {
  console.error("usage: coding-region.js <domain> <field> <column> [--all]");
  process.exit(2);
}
const all = process.argv.includes("--all");
const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"))
  .filter(r => all || r.isNational !== false);

const sys = [];
for (const e of rows) {
  const c = (e.coding || {})[field];
  if (!c || c[column] == null) continue;
  const v = c[column];
  sys.push({
    region: e.region || "(none)", cc: e.countryCode, unit: e.unitName,
    docs: (e.docLinks || []).length,
    v: Array.isArray(v) ? v : [v],
  });
}
if (!sys.length) { console.log("nothing coded on " + domainId + "." + field + "." + column); process.exit(0); }

const R = [...new Set(sys.map(s => s.region))].sort();
const C = [...new Set(sys.flatMap(s => s.v))].sort();
const isList = sys.some(s => s.v.length > 1);

console.log(domainId + "." + field + "." + column + "   n = " + sys.length
  + (all ? "  (ALL UNITS)" : "  (national only)"));
if (isList) console.log("list column: a system counts under every value it carries, so rows sum past n");
console.log("");
C.forEach((c, i) => console.log("  [" + (i + 1) + "] " + c));
console.log("");

const w = Math.max(...R.map(x => x.length)) + 2;
console.log(" ".repeat(w) + C.map((_, i) => ("[" + (i + 1) + "]").padStart(5)).join("")
  + "     n   docLinks");
for (const r of R) {
  const g = sys.filter(s => s.region === r);
  console.log(r.padEnd(w)
    + C.map(c => String(g.filter(s => s.v.includes(c)).length).padStart(5)).join("")
    + String(g.length).padStart(6)
    + (g.reduce((a, b) => a + b.docs, 0) / g.length).toFixed(1).padStart(11));
}
const tot = sys.length;
console.log("");
console.log("overall".padEnd(w) + C.map(c => String(sys.filter(s => s.v.includes(c)).length).padStart(5)).join("")
  + String(tot).padStart(6) + (sys.reduce((a, b) => a + b.docs, 0) / tot).toFixed(1).padStart(11));

// ---- does region explain anything? -----------------------------------------
// Null: each system keeps its region and its NUMBER of values, and redraws
// which values from the observed pool. That holds both margins roughly fixed
// and asks only whether the pairing beats chance.
const pool = sys.flatMap(s => s.v);
const stat = list => {
  const obs = {}, rN = {}, cN = {};
  let t = 0;
  for (const s of list) for (const c of s.v) {
    obs[s.region + "|" + c] = (obs[s.region + "|" + c] || 0) + 1;
    rN[s.region] = (rN[s.region] || 0) + 1;
    cN[c] = (cN[c] || 0) + 1;
    t++;
  }
  let chi = 0;
  for (const r of Object.keys(rN)) for (const c of Object.keys(cN)) {
    const e = rN[r] * cN[c] / t;
    chi += Math.pow((obs[r + "|" + c] || 0) - e, 2) / e;
  }
  return Math.sqrt(chi / (t * (Math.min(Object.keys(rN).length, Object.keys(cN).length) - 1)));
};
const draw = k => { const o = new Set(); while (o.size < k) o.add(pool[(Math.random() * pool.length) | 0]); return [...o]; };
const observed = stat(sys);
let ge = 0;
const TRIALS = 20000;
for (let i = 0; i < TRIALS; i++)
  if (stat(sys.map(s => ({ region: s.region, v: draw(s.v.length) }))) >= observed) ge++;
console.log("");
console.log("Cramer's V = " + observed.toFixed(3)
  + "    permutation p = " + (ge / TRIALS).toFixed(4) + "  (" + TRIALS + " draws)");
const d = R.map(r => { const g = sys.filter(s => s.region === r); return g.reduce((a, b) => a + b.docs, 0) / g.length; });
console.log("mean docLinks ranges " + Math.min(...d).toFixed(1) + " to " + Math.max(...d).toFixed(1)
  + " across regions -- read any result against that spread first");
