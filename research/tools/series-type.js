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
// THE HAND PASS (added after the first run). The rules below the marker were
// written by reading the 63 rows on `dld.identifiedPrevalence` and
// `indigenous.speakers` one at a time, because those two fields have no note
// families to match -- each row names a different national category. They are
// the rows most likely to be compared and most certain to mislead, which is why
// they were worth reading rather than leaving blank.
//
// A rule may now also carry `fixUnit`. `unit` is the ONE column this tool will
// overwrite, and only where the row's own note says in words that the figure is
// a percentage while `unit` reads `count` or is blank -- England's SCALES row
// holds 7.58 with a note opening "% of children at age 5-6 meeting DLD
// criteria" and a `unit` of `count`. That is a typing error in a column that
// was itself backfilled, not a sourced claim, and every instance is printed.
//
// WHAT IT DELIBERATELY WILL NOT DO. 110 fl.uptake rows are an AVERAGE NUMBER of
// languages per pupil and carry `unit: count`, which is wrong -- an average is
// not a count, and the declared units are count | percent | per 1,000 only.
// Fixing it needs a new `unit` value, which is the maintainer's call, so the
// tool reports those rows and leaves `unit` alone.
//
// `basis` HAS NO VALUE FOR A CENSUS, and the hand pass made that unavoidable.
// The declared three are administrative count | survey | estimate. A population
// census is none of them: it is a complete enumeration by a statistics office,
// not a by-product of administering a system and not a sample. The corpus draws
// the line itself, over and over -- "a SURVEY, not a census", "REGISTER count,
// not a survey or ability question", "ENADID 2023, a SURVEY, not the 2020
// census". Forcing those rows into `administrative count` would collapse the
// distinction the column exists to keep, so census rows get `counted` and
// `denominator` and their `basis` is left blank and counted below.
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
  // "learning >=2 foreign languages" and the terser "learning >=2; English 99.8%"
  // are the same Eurostat measure with a per-language breakdown appended; the
  // longer spelling alone left about thirty rows untyped.
  { field: "fl.uptake", re: /learning ≥\s?2(?: foreign languages|;)/i,
    set: { counted: "pupils learning at least two foreign languages" } },
  { field: "fl.uptake", re: /learning ≥\s?1;/i,
    set: { counted: "pupils learning at least one foreign language" } },

  // The American Councils survey distinguishes a returned figure from a
  // modelled one in its own words, so the two take different `basis` values.
  { field: "fl.uptake", re: /American Councils modelled this state's figure rather than receiving a return/i,
    set: { counted: "pupils enrolled in a foreign language", basis: "estimate" } },
  { field: "fl.uptake", re: /American Councils National K-12 Foreign Language Enrollment Survey/i,
    set: { counted: "pupils enrolled in a foreign language", basis: "survey" } },

  { field: "eal.newcomerProportion", re: /English learners, fall \d{4}, NCES Digest/i,
    set: { counted: "English learners", basis: "administrative count" } },

  // ---- the hand pass: dld.identifiedPrevalence ----
  { field: "dld.identifiedPrevalence", re: /Students reported with special education needs, under the Ministry of Education/i,
    set: { counted: "students reported with special education needs; the published breakdown has no speech or language category", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Children aged 6-21 with speech or language impairment.*OSEP child count/i,
    set: { counted: "children aged 6-21 with speech or language impairment", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Children aged 3-5 with speech or language impairment.*OSEP child count/i,
    set: { counted: "children aged 3-5 with speech or language impairment", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Speech or language impairment, of [\d,]+ with all disabilities/i,
    set: { counted: "pupils aged 6-21 with speech or language impairment", denominator: "pupils with all disabilities", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Commonly cited in Australian advocacy as '1 in 14'/i,
    set: { counted: "children with DLD, carried over from international prevalence work", basis: "estimate" }, fixUnit: "percent" },
  { field: "dld.identifiedPrevalence", re: /Severe language disorder with critical educational needs/i,
    set: { counted: "students with severe language disorder and critical educational needs", denominator: "PSD-funded students", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Foerderschwerpunkt\) 'Sprache'/i,
    set: { counted: "pupils with the special-educational support focus Sprache, special and mainstream schools", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /meeting DLD criteria — SCALES population study/i,
    set: { counted: "children aged 5-6 meeting DLD criteria", basis: "estimate" }, fixUnit: "percent" },
  { field: "dld.identifiedPrevalence", re: /PRIMARY type of need is recorded as 'speech, language and communications needs'/i,
    set: { counted: "pupils whose primary type of need is speech, language and communications needs", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /Recorded under 'Speech Impairment' of [\d,]+ students with disability/i,
    set: { counted: "students recorded under Speech Impairment", denominator: "students with disability and additional learning needs", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /estimated to have språkstörning\/DLD/i,
    set: { counted: "children, adolescents and adults estimated to have spraakstoerning or DLD", basis: "estimate" }, fixUnit: "percent" },
  { field: "dld.identifiedPrevalence", re: /category share row of the city roll/i,
    set: { counted: "pupils in disability special education recorded as language impairment, Tainan City only", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /all categories, not language-specific/i,
    set: { counted: "pupils with disabilities in special education, all categories, not language-specific", basis: "administrative count" } },
  { field: "dld.identifiedPrevalence", re: /identified and served under IDEA Part B in the disability category/i,
    set: { counted: "those identified and served under IDEA Part B as speech or language impairment",
           denominator: "estimated US resident population ages 5 through 21", basis: "administrative count" }, fixUnit: "percent" },
  { field: "dld.identifiedPrevalence", re: /whose disability category is 'speech or language impairment'/i,
    set: { counted: "students served under IDEA Part B whose category is speech or language impairment",
           denominator: "students ages 5 through 21 served under IDEA Part B", basis: "administrative count" }, fixUnit: "percent" },
  { field: "dld.identifiedPrevalence", re: /whose primary category is 'speech or language impairment'/i,
    set: { counted: "students served under IDEA Part B whose primary category is speech or language impairment; covers speech as well as language",
           denominator: "all students served under IDEA Part B", basis: "administrative count" }, fixUnit: "percent" },

  // ---- the hand pass: indigenous.speakers ----
  // `basis` is omitted on every census row; see the note above.
  { field: "indigenous.speakers", re: /Aggregate across 167 languages, not per language/i,
    set: { counted: "Aboriginal and Torres Strait Islander people of all ages reporting use of an Indigenous language, aggregate across 167 languages" }, census: true },
  { field: "indigenous.speakers", re: /per language: Yumplatok/i,
    set: { counted: "Aboriginal and Torres Strait Islander people of all ages using Yumplatok at home" }, census: true },
  { field: "indigenous.speakers", re: /four NEW CONTACT LANGUAGES/i,
    set: { counted: "speakers of the four new contact languages, a subtotal of the 76,978" }, census: true },
  { field: "indigenous.speakers", re: /aggregate across 70\+ languages, not per language/i,
    set: { counted: "Indigenous-identity people of all ages reporting an Indigenous language spoken at home" }, census: true },
  { field: "indigenous.speakers", re: /with an Indigenous MOTHER TONGUE/i,
    set: { counted: "Indigenous-identity people of all ages with an Indigenous mother tongue" }, census: true },
  { field: "indigenous.speakers", re: /per language: Inuktitut/i,
    set: { counted: "Inuit of all ages able to conduct a conversation in Inuktitut" }, census: true },
  { field: "indigenous.speakers", re: /per language: Michif/i,
    set: { counted: "Metis of all ages able to hold a conversation in Michif" }, census: true },
  { field: "indigenous.speakers", re: /Share of residents aged 16 and over who are euskald/i,
    set: { counted: "residents aged 16 and over who are euskaldun, self-assessed", denominator: "residents of the Basque Autonomous Community aged 16 and over", basis: "survey" }, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /Share of residents of NAVARRE aged 16 and over/i,
    set: { counted: "residents of Navarre aged 16 and over who are euskaldun, self-assessed", denominator: "residents of Navarre aged 16 and over", basis: "survey" }, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /persons with Sami as the native language recorded in the Population Information System|native language recorded in the Population Information/i,
    set: { counted: "persons with Sami as the native language recorded in the Population Information System", basis: "administrative count" } },
  { field: "indigenous.speakers", re: /AGGREGATE of all 22 Mayan languages/i,
    set: { counted: "people aged 4 and over whose first language was a Mayan language, aggregate of all 22" }, census: true },
  { field: "indigenous.speakers", re: /Share of the population aged 4 and over whose first language was a Mayan language/i,
    set: { counted: "people aged 4 and over whose first language was a Mayan language", denominator: "population aged 4 and over" }, census: true, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /per language: Xinka/i,
    set: { counted: "persons aged 4 and over with Xinka as first language" }, census: true },
  { field: "indigenous.speakers", re: /per language: Garifuna, as first language/i,
    set: { counted: "persons aged 4 and over with Garifuna as first language" }, census: true },
  { field: "indigenous.speakers", re: /Self-assessed ABILITY: persons aged three and over/i,
    set: { counted: "persons aged 3 and over who answered that they can speak Irish, self-assessed", denominator: "persons aged 3 and over who answered the question" }, census: true },
  { field: "indigenous.speakers", re: /USE, not ability: persons aged three and over/i,
    set: { counted: "persons aged 3 and over speaking Irish daily outside the education system" }, census: true },
  { field: "indigenous.speakers", re: /Daily Irish speakers aged three and over in the GAELTACHT/i,
    set: { counted: "daily Irish speakers aged 3 and over in the Gaeltacht areas only" }, census: true },
  { field: "indigenous.speakers", re: /ENADID 2023.*Aggregate across all indigenous languages/i,
    set: { counted: "persons aged 3 and over declaring they speak an indigenous language, aggregate", basis: "survey" } },
  { field: "indigenous.speakers", re: /per language: nahuatl, the largest, as a share OF THE INDIGENOUS-LANGUAGE-SPEAKING POPULATION/i,
    set: { counted: "nahuatl speakers aged 3 and over", denominator: "the indigenous-language-speaking population aged 3 and over, not the whole country", basis: "survey" }, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /able to speak te reo Maori AT LEAST FAIRLY WELL/i,
    set: { counted: "people aged 15 and over able to speak te reo Maori at least fairly well", denominator: "people aged 15 and over", basis: "survey" }, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /per language: te reo Maori, the second most widely spoken/i,
    set: { counted: "people of all ages who could have a conversation in te reo Maori" }, census: true },
  { field: "indigenous.speakers", re: /Share of the whole New Zealand population, all ages/i,
    set: { counted: "people of all ages who could have a conversation in te reo Maori", denominator: "the whole New Zealand population, all ages" }, census: true, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /per language: Quechua\. MOTHER TONGUE/i,
    set: { counted: "persons aged 5 and over with Quechua as mother tongue", denominator: "the 26,887,584 who answered" }, census: true },
  { field: "indigenous.speakers", re: /per language: Aimara\. Mother tongue/i,
    set: { counted: "persons aged 5 and over with Aimara as mother tongue", denominator: "the 26,887,584 who answered" }, census: true },
  { field: "indigenous.speakers", re: /"Otra lengua nativa" — an AGGREGATE/i,
    set: { counted: "persons aged 5 and over whose mother tongue is another native language, an aggregate", denominator: "the 26,887,584 who answered" }, census: true },
  { field: "indigenous.speakers", re: /Share of the 118,892 INDIGENOUS people aged 5 and over/i,
    set: { counted: "indigenous people aged 5 and over who communicate in Guarani", denominator: "the 118,892 indigenous people aged 5 and over, not the whole country" }, census: true, fixUnit: "percent" },
  { field: "indigenous.speakers", re: /who speak GUARANI in the home most of the time/i,
    set: { counted: "persons aged 5 and over speaking Guarani at home most of the time", basis: "survey" } },
  { field: "indigenous.speakers", re: /who speak BOTH Guarani and Spanish in the home/i,
    set: { counted: "persons aged 5 and over speaking both Guarani and Spanish at home most of the time", basis: "survey" } },
];

const seriesFields = [];
for (const d of DOMAINS)
  for (const f of (d.fields || [])) if (f[2] === "series") seriesFields.push([d.id, f[0]]);

let set = 0, already = 0, untouched = 0;
const perField = {}, flags = {}, misses = {}, compound = [];
let censusRows = 0;
const unitFixes = [];

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
      if (rule.census) censusRows++;
      // The one overwrite this tool performs; see the header.
      if (rule.fixUnit) {
        const cur = String(r.unit || "").trim();
        if (cur !== rule.fixUnit) {
          unitFixes.push(dom + "." + field + "  " + (cur || "(blank)") + " -> " + rule.fixUnit
            + "   value " + String(r.value).slice(0, 26));
          r.unit = rule.fixUnit; touched = true;
        }
      }
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

if (unitFixes.length) {
  console.log("\n" + unitFixes.length + " `unit` value(s) CORRECTED, each because the row's own note");
  console.log("says in words that the figure is a percentage:");
  for (const u of unitFixes) console.log("      " + u);
}

if (censusRows) {
  console.log("\n" + censusRows + " row(s) are a population CENSUS and their `basis` is left blank.");
  console.log("The declared three are administrative count | survey | estimate, and a census is");
  console.log("none of them. The corpus draws the line itself -- \"a SURVEY, not a census\",");
  console.log("\"REGISTER count, not a survey\" -- so a fourth value is the maintainer's call.");
}

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
