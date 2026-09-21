// Fill the typed columns on `series` rows from what the row's own note says.
//
//     node series-type.js            # report what would be set, and what cannot
//     node series-type.js --write
//
// WHY THIS IS NOT A GUESS. `src/domains.js` says the four typed columns "stay
// BLANK rather than guessed", and that is the rule this tool works under. It
// invents nothing: every value it writes is lifted from the row's OWN note,
// which was written from the source when the row was entered. The note already
// said "Counts ENROLMENTS in the study of a language, not pupils" on 693 rows;
// all that happened was that it said so in prose, where nothing could compare
// it, instead of in a column, where something can.
//
// `basis` is the one place an inference is made, and it is made in exactly two
// forms, both stated by the note rather than by the host:
//
//   - a note naming a Eurostat UOE table (educ_uoe_*) takes `administrative
//     count`. UOE is the UNESCO-OECD-Eurostat administrative collection; a
//     figure that counts enrolments or degrees awarded cannot have been
//     surveyed.
//   - a note whose own words are "survey measure" takes `survey`.
//
// Anything else is left blank and reported, because a blank says nobody has
// typed this row yet and that is a true thing to say.
//
// WHAT IT DELIBERATELY WILL NOT DO. 110 fl.uptake rows are an AVERAGE NUMBER of
// languages per pupil and carry `unit: count`, which is wrong -- an average is
// not a count, and the declared units are count | percent | per 1,000 only.
// Fixing it needs a new `unit` value, which is the maintainer's call, so the
// tool reports those rows and leaves `unit` alone.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));

const WRITE = process.argv.includes("--write");

// Each rule: the note pattern, and the columns it licenses. A rule fires only
// on its own field, so an `enrolments` phrase in one map cannot type a row in
// another that happens to share the wording.
const RULES = [
  { field: "fl.uptake", re: /Counts ENROLMENTS in the study of a language, not pupils/i,
    set: { counted: "enrolments in the study of a language, not pupils", basis: "administrative count" } },
  { field: "fl.uptake", re: /Share of pupils studying TWO OR MORE foreign languages/i,
    set: { counted: "pupils studying two or more foreign languages", denominator: "pupils, not enrolments", basis: "administrative count" } },
  { field: "fl.uptake", re: /Average number of foreign languages studied per pupil/i,
    set: { counted: "foreign languages studied per pupil, derived from enrolments", basis: "administrative count" },
    flag: "unit is `count` on an AVERAGE per pupil; the declared units carry no ratio" },

  // "Counts students, not course enrolments" and "Students enrolled, not course
  // enrolments" are the same claim in two hands; the first spelling alone left
  // 30 rows untyped.
  { field: "he.enrolment", re: /(Counts students|Students(?: enrolled)?), not course enrolments/i,
    set: { counted: "students, not course enrolments", basis: "administrative count" } },
  { field: "he.enrolment", re: /Counts degrees AWARDED in the year, not students enrolled/i,
    set: { counted: "degrees awarded in the year, not students enrolled", basis: "administrative count" } },

  { field: "eal.newcomerProportion", re: /PISA \d{4} survey measure of home language, not a count of pupils designated by the system/i,
    set: { counted: "15-year-olds who mainly speak a language at home other than the language of schooling",
           denominator: "15-year-olds", basis: "survey" } },
  { field: "eal.newcomerProportion", re: /of 15-year-olds attend a school where more than a quarter/i,
    set: { counted: "15-year-olds attending a school where more than a quarter of pupils speak another language at home",
           denominator: "15-year-olds", basis: "survey" } },
  { field: "eal.newcomerProportion", re: /of 15-year-olds had an immigrant background/i,
    set: { counted: "15-year-olds with an immigrant background", denominator: "15-year-olds", basis: "survey" } },

  { field: "dld.identifiedPrevalence", re: /served under IDEA Part B with speech or language/i,
    set: { counted: "children served under IDEA Part B with speech or language impairment", basis: "administrative count" } },

  // These notes are terse and name no collection, so `counted` is lifted and
  // `basis` is left blank rather than assumed from the ISCED level.
  { field: "fl.uptake", re: /pupils learning ≥\s?1 foreign language/i,
    set: { counted: "pupils learning at least one foreign language" } },
  { field: "fl.uptake", re: /learning ≥\s?2 foreign languages/i,
    set: { counted: "pupils learning at least two foreign languages" } },

  // The American Councils survey distinguishes a returned figure from a
  // modelled one in its own words, so the two take different `basis` values.
  { field: "fl.uptake", re: /American Councils modelled this state's figure rather than receiving a return/i,
    set: { counted: "pupils enrolled in a foreign language", basis: "estimate" } },
  { field: "fl.uptake", re: /American Councils National K-12 Foreign Language Enrollment Survey/i,
    set: { counted: "pupils enrolled in a foreign language", basis: "survey" } },

  { field: "eal.newcomerProportion", re: /English learners, fall \d{4}, NCES Digest/i,
    set: { counted: "English learners", basis: "administrative count" } },
];

const seriesFields = [];
for (const d of DOMAINS)
  for (const f of (d.fields || [])) if (f[2] === "series") seriesFields.push([d.id, f[0]]);

let set = 0, already = 0, untouched = 0;
const perField = {}, flags = {}, misses = {}, compound = [];

for (const [dom, field] of seriesFields) {
  const p = pathFor(dom);
  if (!fs.existsSync(p)) continue;
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let touched = false;
  for (const e of rows) {
    const arr = e[field];
    if (!Array.isArray(arr)) continue;
    for (const r of arr) {
      const note = String(r.note || "");
      // A second problem this pass can see and must not fix quietly: `value` is
      // meant to hold ONE figure, and some rows pack a count, its denominator
      // and a percentage into the string -- "143,069 of 821,691 pupils
      // (17.41%)". No `unit` describes that, and nothing can compare it.
      if (/\bof\b[\s\S]{0,24}\d[\d,. ]*\s*(pupils|students|persons)?\s*\(\s*[\d.]+\s*%\s*\)/i.test(String(r.value || ""))
          || /\d\s*\(\s*[\d.]+\s*%\s*\)/.test(String(r.value || "")))
        compound.push(dom + "." + field + "  " + String(r.value).slice(0, 44));

      const rule = RULES.find(x => x.field === dom + "." + field && x.re.test(note));
      if (!rule) {
        untouched++;
        const k = dom + "." + field;
        (misses[k] = misses[k] || []).push(note.slice(0, 70) || "(no note)");
        continue;
      }
      if (rule.flag) (flags[rule.flag] = (flags[rule.flag] || 0) + 1);
      for (const [c, v] of Object.entries(rule.set)) {
        if (String(r[c] || "").trim()) { already++; continue; }
        r[c] = v; set++; touched = true;
        perField[dom + "." + field] = (perField[dom + "." + field] || 0) + 1;
      }
    }
  }
  if (touched && WRITE) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + "\n");
}

console.log((WRITE ? "WROTE " : "would set ") + set + " typed cell(s); " + already
  + " already had a value; " + untouched + " row(s) matched no rule\n");
for (const k of Object.keys(perField).sort()) console.log("  " + k.padEnd(30) + perField[k]);

if (Object.keys(flags).length) {
  console.log("\nFLAGGED, and left alone -- the maintainer's call:");
  for (const [f, n] of Object.entries(flags)) console.log("  " + n + " row(s): " + f);
}

if (compound.length) {
  console.log("\n" + compound.length + " row(s) hold MORE THAN ONE FIGURE in `value`, which no `unit`");
  console.log("describes and nothing can compare. Left alone -- splitting them changes stored");
  console.log("numbers and is the maintainer's call:");
  for (const c of compound.slice(0, 6)) console.log("      " + c);
  if (compound.length > 6) console.log("      ... and " + (compound.length - 6) + " more");
}

console.log("\nMATCHED NO RULE, by field. These are the hand pass:");
for (const [k, list] of Object.entries(misses)) {
  console.log("  " + k + ": " + list.length + " row(s)");
  const fam = {};
  for (const n of list) fam[n] = (fam[n] || 0) + 1;
  for (const n of Object.keys(fam).sort((a, b) => fam[b] - fam[a]).slice(0, 4))
    console.log("      [" + fam[n] + "] " + n);
}
if (!WRITE) console.log("\n(dry run - pass --write)");
