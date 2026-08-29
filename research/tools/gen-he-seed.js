// Builds data/he.seed.json, and migrates fl.higherEducation onto it.
//
//     node gen-he-seed.js            # report only
//     node gen-he-seed.js --write
//
// CLAUDE.md: a native domain needs a seed generated FROM THE UNIT LIST THE
// OTHER DOMAINS ALREADY USE, so that a country split for one question is split
// for all of them. The geography therefore comes from fl.seed.json verbatim --
// same 353 rows, same country codes, same subnational splits -- and only the
// field set changes.
//
// The migration is the interesting half. `fl.higherEducation` held 28 written
// entries, and read side by side they answer six different questions: Egypt and
// Morocco the language a degree is TAUGHT IN, the United States how many
// institutions offer one, Belarus and Cuba whether every student must take one
// whatever their degree, Guyana and Panama who trains the school system's
// teachers, Saskatchewan and Guatemala what it takes to get in. Dropping all 28
// into one `he` field would rebuild the problem the split exists to solve, so
// each is placed by hand, below, against the field it actually answers.
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..", "..");
const FL = path.join(ROOT, "data", "fl.seed.json");
const OUT = path.join(ROOT, "data", "he.seed.json");
const write = process.argv.includes("--write");

const { DOMAINS } = require(path.join(ROOT, "src", "domains"));
const he = DOMAINS.find(d => d.id === "he");
if (!he) throw new Error("he is not declared in src/domains.js");

// key -> the he field that entry's text actually answers.
// Two are marked REVIEW: they are about bursaries and scholarships for
// post-secondary language study, which none of the nine fields asks about. They
// are placed on degreeSubjects so nothing is lost, and flagged here rather than
// filed quietly under a heading they do not match.
const PLACE = {
  "AU|Australia": "degreeSubjects",
  "BY|Belarus": "requiredStudy",
  "CA|Canada": "degreeSubjects",                    // REVIEW: bursary programmes
  "CA|Northwest Territories": "degreeSubjects",     // REVIEW: scholarships
  "CA|Nunavut": "teacherPipeline",
  "CA|Quebec": "requiredStudy",
  "CA|Saskatchewan": "entryRequirements",
  "CR|Costa Rica": "teacherPipeline",
  "CU|Cuba": "requiredStudy",
  "EG|Egypt": "mediumOfInstruction",
  "FM|Micronesia": "degreeSubjects",
  "GL|Greenland": "entryRequirements",
  "GT|Guatemala": "entryRequirements",
  "GY|Guyana": "teacherPipeline",
  "MA|Morocco": "mediumOfInstruction",
  "MR|Mauritania": "mediumOfInstruction",
  "PA|Panama": "teacherPipeline",
  "SD|Sudan": "mediumOfInstruction",
  "TW|Taiwan": "mediumOfInstruction",
  "UA|Ukraine": "degreeSubjects",
  "US|United States": "degreeSubjects",
  "UZ|Uzbekistan": "mediumOfInstruction",
};
const REVIEW = new Set(["CA|Canada", "CA|Northwest Territories"]);

// An absence record was written about higher education as a whole, not about
// one of the new questions. It goes on degreeSubjects, the headline field, and
// stays a `Not established` record rather than becoming a blank.
const ABSENCE_FIELD = "degreeSubjects";

const fl = JSON.parse(fs.readFileSync(FL, "utf8"));
const NL = /\r\n/.test(fs.readFileSync(FL, "utf8")) ? "\r\n" : "\n";

const rows = [];
const moved = {}, unplaced = [];
let absences = 0;

for (const e of fl) {
  const key = e.countryCode + "|" + e.unitName;
  const row = {
    countryCode: e.countryCode,
    unitName: e.unitName,
    isNational: e.isNational,
    region: e.region,
    subregion: e.subregion,
    status: "stub",
    confidence: "",
    lastVerified: "",
    collaborators: [],
    docLinks: [],
    supportLinks: [],
    sourceLanguageNote: "",
    stubNote: "",
    by: "", inst: "", source: "",
  };
  for (const [k, , type] of he.fields) {
    row[k] = (type === "history" || type === "series" || type === "offering") ? [] : "";
  }

  const text = e.higherEducation;
  if (text) {
    const isAbsence = /^Not established/i.test(text);
    const field = isAbsence ? ABSENCE_FIELD : PLACE[key];
    if (!field) { unplaced.push(key); }
    else {
      row[field] = text;
      // The claim has to keep its source. fl's docLinks cover that whole entry,
      // not just this field, so some will be about school policy and irrelevant
      // here -- but carrying them is the only way the migrated text still
      // traces to a source on its own entry, which CLAUDE.md requires. A later
      // pass can prune the ones that turn out not to support anything.
      row.docLinks = (e.docLinks || []).map(l => ({ label: l.label, url: l.url }));
      row.status = isAbsence ? "stub" : "partial";
      row.confidence = e.confidence || "";
      row.lastVerified = e.lastVerified || "";
      if (isAbsence) absences++;
      else (moved[field] = moved[field] || []).push(key);
    }
  }
  rows.push(row);
}

console.log(rows.length + " units seeded, " + he.fields.length + " fields each");
console.log("\nmigrated from fl.higherEducation:");
for (const [f, keys] of Object.entries(moved))
  console.log("  " + String(keys.length).padStart(2) + "  " + f.padEnd(20) + keys.join(", "));
console.log("  " + String(absences).padStart(2) + "  " + ABSENCE_FIELD.padEnd(20) + "(absence records, kept as Not established)");
if (REVIEW.size) console.log("\nflagged for re-slot, placed but not a clean fit: " + [...REVIEW].join(", "));
if (unplaced.length) console.log("\nNOT PLACED (add to PLACE): " + unplaced.join(", "));

if (!write) { console.log("\n(dry run - pass --write)"); process.exit(0); }
if (unplaced.length) { console.log("\nrefusing to write with unplaced entries"); process.exit(1); }
fs.writeFileSync(OUT, JSON.stringify(rows, null, 1) + NL);
console.log("\nwrote data/he.seed.json");
