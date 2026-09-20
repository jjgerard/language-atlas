// A coding column against the PISA 2022 immigrant attainment gap.
//
//     node pisa-cross.js <domain> <field> <column>
//
// The outcome is `diff` from research/pisa-2022-immigrant-maths.json: the mean
// mathematics score of immigrant students minus that of non-immigrant students,
// in score points, PISA 2022 Table I.B1.7.17.
//
// READ THE CONFOUND BEFORE THE RESULT. The immigrant-native gap is driven far
// more by who a country's immigrants are -- origin mix, socio-economic status,
// distance between the home language and the test language -- than by any
// classification or exit rule. Nothing here adjusts for that, and at n of about
// 20 per group nothing could. A difference between groups here is a place to
// look, not a finding, and the honest use of this tool is descriptive: policy
// and outcome side by side, with no causal claim attached.
//
// Two further limits, both structural rather than statistical:
//   - PISA excludes students with under a year of instruction in the test
//     language, which removes part of the population these rules act on.
//   - National grain only. Belgium, the United Kingdom and Hong Kong are in
//     PISA nationally and in this atlas only as sub-national units, so they are
//     dropped rather than joined across grains. Kosovo and Macao are not in the
//     atlas at all.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");

const [, , domainId, field, column] = process.argv;
if (!domainId || !field || !column) {
  console.error("usage: pisa-cross.js <domain> <field> <column>");
  process.exit(2);
}
const P = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "pisa-2022-immigrant-maths.json"), "utf8")).rows;
const E = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8")).filter(r => r.isNational !== false);

const norm = s => String(s).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/\(.*?\)/g, "").replace(/[^a-z]+/g, " ").trim();
// PISA's name against the atlas's, only where a NATIONAL entry exists to join to.
const ALIAS = {
  "czech republic": "CZ", "korea": "KR", "slovak republic": "SK",
  "brunei darussalam": "BN", "palestinian authority": "PS",
  "chinese taipei": "TW", "viet nam": "VN",
};
const byName = new Map(E.map(e => [norm(e.unitName), e]));
const byCC = new Map(E.map(e => [e.countryCode, e]));

const sys = [];
const nocode = [];
const nogap = [];
let unmatched = 0;
for (const p of P) {
  const e = byName.get(norm(p.name)) || byCC.get(ALIAS[norm(p.name)]);
  if (!e) { unmatched++; continue; }
  const c = (e.coding || {})[field];
  if (!c || c[column] == null) { nocode.push(p.name); continue; }
  // A country PISA could not compute a gap for is not a zero gap. Letting a
  // null through here coerces to 0 in the means and drags every group toward
  // no difference at all.
  if (p.diff == null) { nogap.push(p.name); continue; }
  const v = c[column];
  sys.push({ name: p.name, diff: p.diff, docs: (e.docLinks || []).length,
    v: Array.isArray(v) ? v : [v] });
}
console.log(domainId + "." + field + "." + column + "  against the PISA immigrant maths gap");
console.log(P.length + " PISA countries; " + unmatched + " with no national atlas entry; "
  + nocode.length + " joined but uncoded; " + nogap.length + " with no gap reported; n = "
  + sys.length + " analysed");
if (!sys.length) process.exit(0);

const C = [...new Set(sys.flatMap(s => s.v))].sort();
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const sd = a => a.length < 2 ? NaN : Math.sqrt(a.reduce((x, y) => x + (y - mean(a)) ** 2, 0) / (a.length - 1));
console.log("");
console.log("  " + "value".padEnd(24) + "   n   mean gap      sd   docLinks");
for (const c of C) {
  const g = sys.filter(s => s.v.includes(c));
  console.log("  " + c.padEnd(24) + String(g.length).padStart(4)
    + mean(g.map(s => s.diff)).toFixed(1).padStart(11)
    + (isNaN(sd(g.map(s => s.diff))) ? "     -" : sd(g.map(s => s.diff)).toFixed(1).padStart(8))
    + mean(g.map(s => s.docs)).toFixed(1).padStart(11));
}
console.log("  " + "ALL".padEnd(24) + String(sys.length).padStart(4)
  + mean(sys.map(s => s.diff)).toFixed(1).padStart(11)
  + sd(sys.map(s => s.diff)).toFixed(1).padStart(8)
  + mean(sys.map(s => s.docs)).toFixed(1).padStart(11));

// Permutation: shuffle the outcome across countries, keep the grouping. The
// statistic is the spread of group means, weighted by group size, which works
// for list columns where a country sits in more than one group.
const groups = C.map(c => sys.map((s, i) => s.v.includes(c) ? i : -1).filter(i => i >= 0));
const stat = vals => {
  const gm = groups.map(g => mean(g.map(i => vals[i])));
  const all = mean(vals);
  return groups.reduce((acc, g, k) => acc + g.length * (gm[k] - all) ** 2, 0);
};
const vals = sys.map(s => s.diff);
const obs = stat(vals);
let ge = 0;
const TRIALS = 20000;
for (let t = 0; t < TRIALS; t++) {
  const sh = vals.slice();
  for (let i = sh.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [sh[i], sh[j]] = [sh[j], sh[i]]; }
  if (stat(sh) >= obs) ge++;
}
console.log("");
console.log("permutation p = " + (ge / TRIALS).toFixed(4) + "  (" + TRIALS + " shuffles of the outcome)");
console.log("uncoded but joinable: " + (nocode.join(", ") || "none"));
console.log("coded but no PISA gap: " + (nogap.join(", ") || "none"));
