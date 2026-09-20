// Cross-tabulate the coded schemes against each other.
//
//     node coding-crosstab.js            every cross defined below
//     node coding-crosstab.js 3          just cross number 3
//
// One row per SYSTEM, national units only, joined on countryCode|unitName
// across dld and eal -- the two files carry the same 396 units, checked here
// rather than assumed.
//
// INSTRUMENT-GRAINED FIELDS HAVE TO BE REDUCED to say anything per system, and
// how they are reduced is a claim. `obliges` is taken at its MAXIMUM, which
// answers "what is the strongest thing any instrument here promises" and not
// "what does this system oblige on average" -- averaging an ordinal across
// instruments would invent a number the corpus does not contain. Anything
// else is taken as "does any row say this", which is the only honest reduction
// for a set of instruments that disagree.
//
// EVERY CROSS PRINTS ITS n, and a cross is reported as a finding only after
// the confound check at the bottom has been run against it. The habit exists
// because a threshold/newcomer cross in this corpus looked striking at 51% vs
// 23% and turned out to be documentation depth: 7.5 mean docLinks against 3.4,
// and it reversed inside Asia.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const { codingRows } = require(path.join(ROOT, "src", "coding"));
const { pathFor } = require("./datafile");

const load = id => JSON.parse(fs.readFileSync(pathFor(id), "utf8"))
  .filter(r => r.isNational !== false);
const dld = load("dld"), eal = load("eal");
const K = r => r.countryCode + "|" + r.unitName;
const E = new Map(eal.map(r => [K(r), r]));

const SYS = [];
for (const d of dld) {
  const e = E.get(K(d));
  if (!e) continue;
  const c = f => (d.coding || {})[f], ec = f => (e.coding || {})[f];
  const rowsOf = f => codingRows(c(f));
  const any = (f, col, v) => rowsOf(f).some(r => {
    const x = r[col];
    return Array.isArray(x) ? x.includes(v) : x === v;
  });
  SYS.push({
    key: K(d), unit: d.unitName, region: d.region,
    docs: (d.docLinks || []).length,
    conf: d.confidence,
    // system-grained, straight through
    threshold: (c("identificationCriteria") || {}).threshold_basis,
    decider: (c("identificationCriteria") || {}).decider,
    dldLocus: (c("identificationCriteria") || {}).rule_locus,
    discharge: (c("dischargeCriteria") || {}).discharge_basis,
    designation: (ec("newcomerCriteria") || {}).designation,
    triggers: (ec("newcomerCriteria") || {}).triggers,
    ealLocus: (ec("newcomerCriteria") || {}).rule_locus,
    exit: (ec("removalCriteria") || {}).exit_mechanism,
    exitMonths: (ec("removalCriteria") || {}).exit_period_months,
    noNewcomer: !!(e.absences && e.absences.newcomerCriteria),
    assessLang: (c("multilingualProvision") || {}).assessment_language,
    evidence: (c("multilingualProvision") || {}).evidence_type,
    bhIdent: (c("identificationCriteria") || {}).bilingual_handling,
    bhMulti: (c("multilingualProvision") || {}).bilingual_handling,
    // instrument-grained, reduced and labelled as such
    obligesMax: rowsOf("legalEntitlement").length
      ? Math.max(...rowsOf("legalEntitlement").map(r => (r.obliges == null ? -1 : r.obliges)))
      : undefined,
    instruments: rowsOf("legalEntitlement").length || undefined,
    hasRedress: rowsOf("legalEntitlement").length
      ? rowsOf("legalEntitlement").some(r => r.redress_type && r.redress_type !== "not stated")
      : undefined,
    newestLaw: (() => {
      const y = rowsOf("legalEntitlement").map(r => r.instrument_year).filter(Boolean);
      return y.length ? Math.max(...y) : undefined;
    })(),
    hasConstitution: rowsOf("legalEntitlement").length ? any("legalEntitlement", "instrument_type", "constitution") : undefined,
    multilingualTest: rowsOf("assessments").length
      ? (any("assessments", "bilingual_fit", "designed multilingual")
        || any("assessments", "bilingual_fit", "parallel versions"))
      : undefined,
    namesInstrument: rowsOf("assessments").length
      ? !any("assessments", "test_type", "none") : undefined,
  });
}

const val = v => Array.isArray(v) ? (v.length ? v.join("+") : undefined) : v;
function tab(title, rowKey, colKey, opts = {}) {
  const rows = SYS.filter(s => val(s[rowKey]) != null && val(s[colKey]) != null)
    .filter(opts.where || (() => true));
  if (!rows.length) { console.log("\n" + title + "  — no data"); return; }
  const R = [...new Set(rows.map(s => String(val(s[rowKey]))))].sort();
  const C = [...new Set(rows.map(s => String(val(s[colKey]))))].sort();
  const w = Math.max(...R.map(x => x.length), 8) + 1;
  console.log("\n" + title + "   n=" + rows.length);
  console.log(" ".repeat(w) + C.map(c => c.slice(0, 12).padStart(13)).join("") + "   total");
  for (const r of R) {
    const cells = C.map(c => rows.filter(s => String(val(s[rowKey])) === r && String(val(s[colKey])) === c).length);
    console.log(r.padEnd(w) + cells.map(n => String(n).padStart(13)).join("")
      + String(cells.reduce((a, b) => a + b, 0)).padStart(8));
  }
}

/** Is an apparent difference just documentation depth, or does it hold inside regions? */
function confound(title, splitKey, testFn) {
  const have = SYS.filter(s => val(s[splitKey]) != null);
  const groups = [...new Set(have.map(s => String(val(s[splitKey]))))];
  console.log("\nCONFOUND CHECK — " + title);
  for (const g of groups) {
    const set = have.filter(s => String(val(s[splitKey])) === g);
    const hit = set.filter(testFn).length;
    const md = (set.reduce((n, s) => n + s.docs, 0) / set.length).toFixed(1);
    console.log("  " + g.slice(0, 34).padEnd(36) + "n=" + String(set.length).padStart(3)
      + "  hit " + String(Math.round(100 * hit / set.length)).padStart(3) + "%  mean docLinks " + md);
  }
  console.log("  by region:");
  for (const reg of [...new Set(have.map(s => s.region))].sort()) {
    const line = groups.map(g => {
      const set = have.filter(s => s.region === reg && String(val(s[splitKey])) === g);
      return g.slice(0, 10) + " " + (set.length ? Math.round(100 * set.filter(testFn).length / set.length) + "%(" + set.length + ")" : "-");
    }).join("   ");
    console.log("    " + String(reg).padEnd(9) + line);
  }
}

module.exports = { SYS, tab, confound };
if (require.main === module) require("./coding-crosstab-runs.js");
