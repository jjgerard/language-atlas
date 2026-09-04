// Lift an institution name out of an offering row's `note` into `institution`.
//
//     node offering-promote-institution.js <domain>            # dry run
//     node offering-promote-institution.js <domain> --write
//
// The offering shape gained `institution` and `url` partway through the first
// pass, so the batches drafted before that put the institution in the note:
//
//     { language: "Kalanga", level: "bachelor", institutions: "",
//       note: "University of Botswana, Department of African Languages ..." }
//
// The name is right there and consistently placed -- first clause, ending at a
// comma or semicolon -- so it can be promoted without re-researching anything.
// What it cannot be is guessed at, because "which institutions teach language
// X" is the question the field exists to answer and a wrong name answers it
// wrongly.
//
// So the rule is a POSITIVE test, not a split-and-hope: the candidate has to
// look like an institution, by carrying a word from the list below in one of
// the languages these notes are actually written in. A note that opens with
// anything else is left alone and reported, rather than promoted on the
// assumption that the first clause is always a name.
//
// The note is never edited. It keeps the faculty, the campus, the local course
// title and the scope caveat, all of which the institution field does not hold.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const domain = process.argv[2];
const write = process.argv.includes("--write");
if (!domain) { console.log("usage: node offering-promote-institution.js <domain> [--write]"); process.exit(1); }

// Words that make a phrase an institution, across the languages these notes use.
const INSTITUTION = new RegExp([
  "universit",            // University, Universität, Università, Universiteit, Universitat, Université
  "universidad", "universidade",
  "college", "colegio", "colégio",
  "institut",             // Institute, Institut, Instituto, Istituto
  "academy", "academia", "akadem",
  "polytechnic", "politec",
  "escuela", "escola", "école", "hochschule", "sabhal", "coláiste", "ollscoil",
  "school of", "faculty of", "centre", "center",
].join("|"), "i");

const rows = JSON.parse(fs.readFileSync(pathFor(domain), "utf8"));

let promoted = 0, already = 0, noNote = 0;
const skipped = [], took = [];

for (const e of rows) {
  for (const r of (e.offerings || [])) {
    if (r.institution) { already++; continue; }
    const note = String(r.note || "").trim();
    if (!note) { noNote++; continue; }
    // First clause only. A name does not run past its own punctuation.
    const first = note.split(/[;,]/)[0].trim();
    if (!first || first.length < 4 || first.length > 90 || !INSTITUTION.test(first)) {
      skipped.push(e.countryCode + "|" + e.unitName + " " + r.language + ": " + note.slice(0, 62));
      continue;
    }
    if (write) r.institution = first;
    promoted++;
    if (took.length < 10) took.push(e.countryCode + "|" + e.unitName + "  " + r.language + "  ->  " + first);
  }
}

console.log((write ? "WROTE " : "DRY RUN ") + promoted + " institution name(s) promoted from note");
console.log("  " + already + " row(s) already named one, " + noNote + " with no note");
took.forEach(t => console.log("  " + t));
if (skipped.length) {
  console.log(NL + skipped.length + " note(s) whose first clause does not look like an institution, left alone:");
  skipped.slice(0, 12).forEach(s => console.log("  " + s));
}
if (write) { fs.writeFileSync(pathFor(domain), JSON.stringify(rows, null, 1) + NL); console.log(NL + "wrote " + path.basename(pathFor(domain))); }
else console.log(NL + "(dry run - pass --write)");
