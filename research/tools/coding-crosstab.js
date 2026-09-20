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
/**
 * A cross-tab nobody has to decode.
 *
 * The first version truncated column labels to twelve characters, so
 * `national rule, local application` and `national statute` both printed as
 * "national ..." and a reader could not tell which column they were in. It
 * also printed counts and nothing else, which made a grid of numbers with no
 * visible connection to the entries behind them.
 *
 * So: full labels down the left, a numbered legend for the columns, and the
 * units NAMED in every cell. The point of a cross-tab here is to send a reader
 * back to specific entries, and it cannot do that if it never names one.
 */
function tab(title, rowKey, colKey, opts = {}) {
  const rows = SYS.filter(s => val(s[rowKey]) != null && val(s[colKey]) != null)
    .filter(opts.where || (() => true));
  if (!rows.length) { console.log("\n" + title + "  -- no data"); return; }
  const R = [...new Set(rows.map(s => String(val(s[rowKey]))))].sort();
  const C = [...new Set(rows.map(s => String(val(s[colKey]))))].sort();
  const cell = (r, c) => rows.filter(s => String(val(s[rowKey])) === r && String(val(s[colKey])) === c);
  console.log("\n" + title + "   n=" + rows.length + " systems, each counted once");
  console.log("  rows = " + rowKey + "      columns = " + colKey);
  C.forEach((c, i) => console.log("    [" + (i + 1) + "] " + c));
  const w = Math.max(...R.map(x => x.length)) + 2;
  console.log("");
  console.log(" ".repeat(w) + C.map((_, i) => ("[" + (i + 1) + "]").padStart(6)).join("") + "     total");
  for (const r of R) {
    const cs = C.map(c => cell(r, c).length);
    console.log(r.padEnd(w) + cs.map(n => String(n).padStart(6)).join("")
      + String(cs.reduce((a, b) => a + b, 0)).padStart(10));
  }
  if (opts.names !== false) {
    console.log("  who is in each cell:");
    for (const r of R) for (let i = 0; i < C.length; i++) {
      const got = cell(r, C[i]);
      if (!got.length) continue;
      console.log("    " + r + "  ->  " + C[i] + "   (" + got.length + (r === C[i] ? ", same" : "") + ")");
      console.log("        " + got.slice(0, 8).map(s => s.unit).join(", ")
        + (got.length > 8 ? ", +" + (got.length - 8) + " more" : ""));
    }
  }
}

/**
 * The same cross, for a column that IS A LIST.
 *
 * `tab` above pastes a list into one label, so a system running a re-evaluation
 * cycle AND an age ceiling lands in a column of its own. On dld
 * dischargeCriteria that turned five mechanisms into FOURTEEN combination
 * columns, most of them holding one country, and the question the table exists
 * to answer -- do systems that identify on clinical diagnosis discharge
 * differently from systems that identify on educational need -- became
 * unreadable.
 *
 * So this one counts a system under EVERY value it holds. Row totals therefore
 * exceed the number of systems, and the header says so, because a reader who
 * adds a row up and gets more than n is entitled to know why before concluding
 * the table is broken. `systems` is the honest denominator and is printed
 * beside every row.
 */
function tabSet(title, rowKey, colKey, opts = {}) {
  const rows = SYS.filter(s => val(s[rowKey]) != null && s[colKey] != null)
    .filter(opts.where || (() => true));
  if (!rows.length) { console.log("\n" + title + "  -- no data"); return; }
  const listOf = s => Array.isArray(s[colKey]) ? s[colKey] : [s[colKey]];
  const R = [...new Set(rows.map(s => String(val(s[rowKey]))))].sort();
  const C = [...new Set(rows.flatMap(listOf).map(String))].sort();
  const cell = (r, c) => rows.filter(s =>
    String(val(s[rowKey])) === r && listOf(s).map(String).includes(c));
  console.log("\n" + title + "   n=" + rows.length
    + " systems; a system is counted under EVERY mechanism it runs,"
    + " so rows sum to more than n");
  console.log("  rows = " + rowKey + "      columns = " + colKey + " (list-valued)");
  C.forEach((c, i) => console.log("    [" + (i + 1) + "] " + c));
  const w = Math.max(...R.map(x => x.length)) + 2;
  console.log("");
  console.log(" ".repeat(w) + C.map((_, i) => ("[" + (i + 1) + "]").padStart(6)).join("")
    + "   systems");
  for (const r of R) {
    const n = rows.filter(s => String(val(s[rowKey])) === r).length;
    console.log(r.padEnd(w) + C.map(c => String(cell(r, c).length).padStart(6)).join("")
      + String(n).padStart(10));
  }
  if (opts.names !== false) {
    console.log("  who is in each cell:");
    for (const r of R) for (const c of C) {
      const got = cell(r, c);
      if (!got.length) continue;
      console.log("    " + r + "  ->  " + c + "   (" + got.length + ")");
      console.log("        " + got.slice(0, 10).map(s => s.unit).join(", ")
        + (got.length > 10 ? ", +" + (got.length - 10) + " more" : ""));
    }
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

module.exports = { SYS, tab, tabSet, confound };
if (require.main === module) require("./coding-crosstab-runs.js");
