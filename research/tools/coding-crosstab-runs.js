// The crosses worth running, and why each one is a question rather than a pair
// of columns that happened to be next to each other.
const { SYS, tab, confound } = require("./coding-crosstab.js");
const only = process.argv[2] ? Number(process.argv[2]) : null;
const run = (n, fn) => { if (!only || only === n) fn(); };

console.log("systems joined across dld and eal: " + SYS.length);

// 1. The vocabulary's own prediction, written before anything was coded: that a
// level-4 right and a route of appeal are separate axes, and that level 4 with
// no redress would turn out to exist.
run(1, () => tab("1. OBLIGES (strongest instrument) x whether ANY instrument names redress",
  "obligesMax", "hasRedress"));

// 2. Does where the rule is made predict what the threshold turns on?
run(2, () => tab("2. dld THRESHOLD BASIS x dld RULE LOCUS", "threshold", "dldLocus"));

// 3. The two categories, asked of the same system. Do they federalise together?
run(3, () => tab("3. RULE LOCUS — dld identification x eal newcomer", "dldLocus", "ealLocus"));

// 4. The atlas's own question: does a system holding a test that works with
// bilingual children also have a rule about assessing in the child's language?
run(4, () => tab("4. assessments BILINGUAL-CAPABLE TEST x multilingualProvision ASSESSMENT LANGUAGE",
  "multilingualTest", "assessLang"));

// 5. Entry and exit on the eal side, which EXIT_MECHANISM predicts are chosen
// against each other rather than together.
run(5, () => tab("5. eal DESIGNATION x eal EXIT MECHANISM", "designation", "exit"));

// 6. Rationing in both directions at once.
run(6, () => tab("6. dld THRESHOLD BASIS x whether the system has a newcomer category",
  "threshold", "noNewcomer"));

// 7. Does a constitution in the stack change what the strongest instrument obliges?
run(7, () => tab("7. Has a CONSTITUTION among its instruments x OBLIGES (strongest)",
  "hasConstitution", "obligesMax"));

// 8. The COST caveat made countable: does evidence type track what gets said
// about assessment language?
run(8, () => tab("8. multilingualProvision EVIDENCE TYPE x ASSESSMENT LANGUAGE",
  "evidence", "assessLang"));

// 9. Reform recency against the strength of the entitlement. This is the
// policy-years question the timeline could not answer on its own.
run(9, () => {
  const band = s => s.newestLaw == null ? null
    : s.newestLaw >= 2015 ? "since 2015" : s.newestLaw >= 2000 ? "2000-2014" : "before 2000";
  for (const s of SYS) s.lawBand = band(s);
  tab("9. NEWEST INSTRUMENT (band) x OBLIGES (strongest)", "lawBand", "obligesMax");
});

// 10. Whether naming an instrument at all travels with anything else.
run(10, () => tab("10. assessments NAMES AN INSTRUMENT x dld THRESHOLD BASIS",
  "namesInstrument", "threshold"));

// ---- confound checks on the two that look like findings -------------------
run(11, () => {
  confound("level-4 entitlements and redress — is redress just better documentation?",
    "obligesMax", s => s.hasRedress === true);
  confound("naming an assessment instrument — is it just documentation depth?",
    "namesInstrument", s => s.threshold && s.threshold !== "not stated");
});
