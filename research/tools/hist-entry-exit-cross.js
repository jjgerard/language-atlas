// Does a system revise its EXIT rule in the year it revises ENTRY?
//
//     node hist-entry-exit-cross.js
//
// Answer on eal as at 2026-09-20: 6 of 9 exit years co-occur, and p = 0.40.
// The co-occurrence is an artifact of how FEW years these entries carry rows
// in -- New Jersey has rows in two years and both carry entry and exit, so a
// co-occurrence there is forced, not observed.
//
//
// Observed co-occurrences are meaningless without a null, because history rows
// cluster: a system with twelve rows in three years will co-occur by accident.
// So the null holds each system's ROW YEARS fixed and reshuffles which of them
// carry removalCriteria, drawing the same number of removal years from the
// years that system actually has rows in. That controls for clustering and for
// how much history each system carries.
const fs = require("fs");
const R = "C:/Users/jgera/Documents/Claude code projects/AI repository/language-atlas";
const { pathFor } = require(R + "/research/tools/datafile.js");
const rows = JSON.parse(fs.readFileSync(pathFor("eal"), "utf8"));

const sys = [];
for (const e of rows) {
  const c = (e.coding || {}).policyHistory;
  if (!Array.isArray(c)) continue;
  const N = new Set(), Rm = new Set(), all = new Set();
  for (const r of c) {
    all.add(r.year);
    const f = r.fields_touched || [];
    if (f.includes("newcomerCriteria")) N.add(r.year);
    if (f.includes("removalCriteria")) Rm.add(r.year);
  }
  if (N.size && Rm.size) sys.push({ u: e.unitName, cc: e.countryCode, N, Rm, all: [...all] });
}

const observed = sys.reduce((n, s) => n + [...s.Rm].filter(y => s.N.has(y)).length, 0);
const totalRemoval = sys.reduce((n, s) => n + s.Rm.size, 0);

const pick = (arr, k) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, k);
};
let ge = 0;
const TRIALS = 20000;
for (let t = 0; t < TRIALS; t++) {
  let n = 0;
  for (const s of sys) for (const y of pick(s.all, s.Rm.size)) if (s.N.has(y)) n++;
  if (n >= observed) ge++;
}

console.log("systems with BOTH an entry year and an exit year: " + sys.length);
sys.forEach(s => console.log("  " + s.u.padEnd(18)
  + " rows in " + s.all.length + " years, entry " + s.N.size + ", exit " + s.Rm.size
  + ", same-year " + [...s.Rm].filter(y => s.N.has(y)).length));
console.log("");
console.log("observed same-year co-occurrences: " + observed + " of " + totalRemoval + " exit years on these systems");
console.log("permutation null (" + TRIALS + " draws, exit years reshuffled within each system's own row years)");
console.log("  p(as many or more by chance) = " + (ge / TRIALS).toFixed(4));
