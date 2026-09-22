// Turn indigenous.inventory from a sentence into a number.
//
//     node research/tools/retype-inventory.js [--write]
//
// The field held 194 national entries of "Glottolog counts N living languages
// for this country" and 143 sub-national ones saying the question does not
// apply. A number stored as a sentence cannot be sorted, shaded, or set against
// the count of languages the school system actually engages with -- which is
// the comparison the field exists for, and the one its own generator describes:
// "Nigeria has 589 languages and its education system names a handful."
//
// It becomes a `series` row rather than a bare integer, because this project
// has already paid for the difference. A number with no unit and no statement
// of what was counted is how Angola's 28467 came to look like a
// language-disorder prevalence. So the row carries what it counted and on what
// basis, in the words of the thing that counted it.
//
// `year` IS LEFT BLANK, and that is a finding rather than an omission. The
// generator records the release it counted (glottolog/glottolog-cldf,
// cldf/languages.csv, Level == "language") and NOT which version, so there is
// no date to write. Inventing one would make 194 rows comparable that are not
// known to be. research/tools/wals/inventory.js should capture the version on
// its next run.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const file = path.join(root, "data", "indigenous.json");
const write = process.argv.includes("--write");
const NL = String.fromCharCode(10);

const COUNTED = "living languages Glottolog records for this country";
const BASIS = "reference catalogue";

const rows = JSON.parse(fs.readFileSync(file, "utf8"));
let typed = 0, na = 0, already = 0, kept = [], skipped = [];

for (const e of rows) {
  const v = e.inventory;
  if (Array.isArray(v)) { already++; continue; }
  const t = String(v == null ? "" : v).trim();
  if (!t) continue;

  if (/^Not applicable/i.test(t)) {
    // The sentence moves to the flag the typed field reads, so the panel still
    // shows exactly these words and coverage still excludes the slot.
    e.notApplicable = e.notApplicable || {};
    e.notApplicable.inventory = t;
    e.inventory = [];
    na++;
    continue;
  }

  // Greenland is the one entry not counted from Glottolog, and it is a count
  // all the same: "One indigenous language, Greenlandic, of three main dialects
  // named in act 7/2010 s 3". It is typed by hand rather than parsed, because
  // its number, what it counted and where it comes from are all different from
  // every other row, and a rule loose enough to catch it would catch worse.
  if (/^One indigenous language, Greenlandic/i.test(t)) {
    e.inventory = [{
      year: "", value: "1", unit: "count", denominator: "",
      counted: "indigenous languages named in the act",
      basis: "statute",
      note: t,
    }];
    typed++;
    kept.push(`${e.countryCode}|${e.unitName}: hand-typed, counted from act 7/2010 s 3 rather than Glottolog`);
    continue;
  }

  const m = t.match(/Glottolog counts (\d+) living languages? for this country/i);
  if (!m) { skipped.push(`${e.countryCode}|${e.unitName}: ${t.slice(0, 70)}`); continue; }

  // Anything the entry says BESIDES the count is kept verbatim in `note`.
  // Greenland and one other carry a second clause, and dropping it to make the
  // migration tidy would lose sourced text.
  const rest = t.replace(m[0], "").replace(/^[\s.;,]+/, "").trim();
  e.inventory = [{
    year: "", value: m[1], unit: "count", denominator: "",
    counted: COUNTED, basis: BASIS, note: rest,
  }];
  if (rest) kept.push(`${e.countryCode}|${e.unitName}: ${rest.slice(0, 60)}`);
  typed++;
}

console.log(`${typed} counts typed as a series row`);
console.log(`${na} sub-national entries moved to notApplicable.inventory`);
if (already) console.log(`${already} already typed, left alone`);
if (kept.length) {
  console.log(`${NL}${kept.length} carried extra prose into note:`);
  for (const k of kept) console.log("  " + k);
}
if (skipped.length) {
  console.log(`${NL}NOT TYPED -- no Glottolog count to read (${skipped.length}):`);
  for (const k of skipped) console.log("  " + k);
}

if (!write) { console.log(`${NL}(dry run - pass --write)`); process.exit(0); }
fs.writeFileSync(file, JSON.stringify(rows, null, 1) + NL);
console.log(`${NL}wrote data\\indigenous.json`);
