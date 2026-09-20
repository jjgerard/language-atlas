// Is one region's policy more internally alike than chance?
//
//     node research/tools/ec-homogeneity.js [--drop "not stated,national statute"]
//
// WHY. Meehan et al. (2021), "Context rules!", read top-level policy for newly
// arrived migrant students in six European countries against the European
// Commission's four-dimensional framework and found a paradox: policy is shaped
// by national context AND converging at a European level. The convergence half
// is a claim about similarity, and similarity is measurable over a corpus this
// size in a way six countries cannot support. This tool measures it.
//
// THE MEASURE. For a pair of national systems, take the coded columns BOTH
// carry, and score the share of them on which the two share at least one value.
// List columns match on any overlap, because a system running several rules
// really does run several. Pairs sharing fewer than three columns are dropped:
// agreement on one or two columns is not similarity, it is a coincidence with a
// denominator.
//
// WHY ONLY THE ENTRY-SIDE COLUMNS. removalCriteria is coded on 63% of European
// systems and 0% of African ones, so a measure including it would compare
// European pairs on more columns than any other pair and read the difference in
// coverage as a difference in policy. newcomerCriteria's four columns are
// evenly covered, and comparing only columns both systems hold keeps the
// denominator honest inside that.
//
// WHAT --drop IS FOR. Two systems can match on a value that says nothing about
// policy. `not stated` is shared silence, and matching on it would make thin
// documentation look like convergence. Run the tool with and without it: if the
// result depends on shared silence it will weaken, and if it strengthens the
// silence was diluting a real signal. Dropping a modal value such as
// `national statute` also tests whether the result rests on one near-universal
// answer -- at the cost of pushing many systems below the three-column floor,
// so read the n before reading the p.
const fs = require("fs");
const { pathFor } = require("./datafile.js");

const di = process.argv.indexOf("--drop");
const DROP = di > -1 ? (process.argv[di + 1] || "").split(",").map(s => s.trim()).filter(Boolean) : [];
const MIN_SHARED = 3;
const TRIALS = 20000;

const COLS = [
  ["newcomerCriteria", "designation"],
  ["newcomerCriteria", "triggers"],
  ["newcomerCriteria", "decided_by"],
  ["newcomerCriteria", "rule_locus"],
];

const rows = JSON.parse(fs.readFileSync(pathFor("eal"), "utf8")).filter(r => r.isNational !== false);
const sys = [];
for (const e of rows) {
  const c = e.coding || {};
  const v = {};
  for (const [f, col] of COLS) {
    const x = (c[f] || {})[col];
    if (x == null) continue;
    const arr = (Array.isArray(x) ? x : [x]).filter(q => !DROP.includes(q));
    if (arr.length) v[f + "." + col] = new Set(arr);
  }
  if (Object.keys(v).length >= MIN_SHARED)
    sys.push({ cc: e.countryCode, name: e.unitName, region: e.region || "(none)", v });
}

const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const sim = (a, b) => {
  const k = Object.keys(a.v).filter(x => b.v[x]);
  if (k.length < MIN_SHARED) return null;
  let m = 0;
  for (const x of k) for (const q of a.v[x]) if (b.v[x].has(q)) { m++; break; }
  return m / k.length;
};
const withinMean = (labels, r) => {
  const g = sys.filter((s, i) => labels[i] === r);
  const out = [];
  for (let i = 0; i < g.length; i++)
    for (let j = i + 1; j < g.length; j++) {
      const s = sim(g[i], g[j]);
      if (s != null) out.push(s);
    }
  return { m: mean(out), pairs: out.length };
};

const labels = sys.map(s => s.region);
const regions = [...new Set(labels)].sort();
console.log("eal, national units, entry-side columns only"
  + (DROP.length ? "   dropping: " + DROP.join("; ") : ""));
console.log(sys.length + " systems with " + MIN_SHARED + " or more columns coded\n");
console.log("region".padEnd(12) + "  n  pairs   within   p(by chance)");

for (const r of regions) {
  const obs = withinMean(labels, r);
  if (!obs.pairs) { console.log(r.padEnd(12) + "  no comparable pair"); continue; }
  // The null holds the corpus fixed and shuffles which systems are called this
  // region, so it asks whether THESE systems are alike, not whether the region
  // has an unusual number of them.
  let ge = 0;
  for (let t = 0; t < TRIALS; t++) {
    const sh = labels.slice();
    for (let i = sh.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const q = sh[i]; sh[i] = sh[j]; sh[j] = q; }
    if (withinMean(sh, r).m >= obs.m) ge++;
  }
  console.log(r.padEnd(12) + String(labels.filter(x => x === r).length).padStart(3)
    + String(obs.pairs).padStart(6) + obs.m.toFixed(3).padStart(9) + (ge / TRIALS).toFixed(4).padStart(15));
}

const all = [];
for (let i = 0; i < sys.length; i++)
  for (let j = i + 1; j < sys.length; j++) {
    const s = sim(sys[i], sys[j]);
    if (s != null) all.push({ s, same: sys[i].region === sys[j].region });
  }
console.log("");
console.log("same-region pairs  " + String(all.filter(x => x.same).length).padStart(5)
  + "   mean " + mean(all.filter(x => x.same).map(x => x.s)).toFixed(3));
console.log("cross-region pairs " + String(all.filter(x => !x.same).length).padStart(5)
  + "   mean " + mean(all.filter(x => !x.same).map(x => x.s)).toFixed(3));
