// Fill `inventory` for every NATIONAL unit, from Glottolog's own count.
//
// The point of this field is scale. An entry that names four languages reads as
// an inventory unless the reader is told how many the place actually has, and
// the gap between the two is the most interesting thing on this map: Nigeria
// has 589 languages and its education system names a handful.
//
// Counted from the Glottolog CLDF release (glottolog/glottolog-cldf,
// cldf/languages.csv), restricted to Level == "language" — Glottolog also
// carries 13,706 dialects and 4,853 families, and counting those would inflate
// every figure. 8,618 languages in total, of which 8,3xx carry a country.
//
// ONLY NATIONAL UNITS ARE FILLED. Glottolog's Countries column is country-level,
// so attributing a national count to a state or province would be simply wrong:
// India's 518 is not Kerala's number. Sub-national units are left empty rather
// than given a figure that does not belong to them.
const fs = require("fs"), path = require("path");
const ATLAS = path.join(__dirname, "..", "..", "..");

function parseCsv(t) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
    else if (c !== "\r") f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const h = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(h.map((x, i) => [x, r[i] ?? ""])));
}

const glot = parseCsv(fs.readFileSync(path.join(__dirname, "glottolog.csv"), "utf8"))
  .filter(r => r.Level === "language");
const byCountry = {};
for (const r of glot)
  for (const c of String(r.Countries || "").split(";").map(s => s.trim()).filter(Boolean))
    byCountry[c] = (byCountry[c] || 0) + 1;

// TWO UNITS WHOSE COUNT WOULD BE WORSE THAN NOTHING.
//
// Glottolog files Jerriais as a DIALECT of Normand (Countries=GB;JE) and does
// not carry Guernesiais at all. This script counts Level == "language", so the
// figure it would give Jersey is 1 and the figure for Guernsey is 1 -- and in
// both cases that 1 is ENGLISH. Guernsey's own entry names Guernesiais as its
// indigenous language and Jersey's localTerm calls Jerriais "the Island's
// indigenous language", so the number would contradict the atlas beside it, and
// trends.js would read "one language present, one named" for two different
// languages.
//
// They get the third state instead: somebody looked, and this source cannot
// answer. A count from another catalogue would be a different `basis` and is a
// separate job.
const DIALECT_FILED = {
  GG: "Not established from the sources consulted. Glottolog does not carry Guernesiais, filing Norman varieties under Normand as dialects, so its count of languages for Guernsey is 1 and that 1 is English.",
  JE: "Not established from the sources consulted. Glottolog files Jerriais as a dialect of Normand rather than as a language, so its count of languages for Jersey is 1 and that 1 is English.",
};

const P = path.join(ATLAS, "data", "indigenous.json");
const rows = JSON.parse(fs.readFileSync(P, "utf8"));
let filled = 0, skippedSub = 0, dialectFiled = 0, noCount = [];
// `inventory` is a SERIES field now, not prose. An entry already holding a row
// is left alone, exactly as a filled string was before.
for (const e of rows) {
  if (Array.isArray(e.inventory) ? e.inventory.length : String(e.inventory || "").trim()) continue;
  if (!e.isNational) { skippedSub++; continue; }
  const filed = DIALECT_FILED[e.countryCode];
  if (filed) {
    e.notEstablished = e.notEstablished || {};
    e.notEstablished.inventory = filed;
    e.inventory = [];
    dialectFiled++;
    continue;
  }
  const n = byCountry[e.countryCode];
  if (!n) { noCount.push(e.countryCode + " " + e.unitName); continue; }
  // ONE row. `counted` and `basis` carry what the sentence used to say, which
  // is where they belong: a number whose unit and population are left to prose
  // is how Angola's 28467 came to read as a language-disorder prevalence.
  //
  // `year` IS DELIBERATELY BLANK. This script records WHICH release it counted
  // -- glottolog/glottolog-cldf, cldf/languages.csv, Level == "language" -- and
  // not which version, so there is no date to write and inventing one would
  // make 194 rows look comparable when that is not established. Capture the
  // version here on the next run and this stops being blank.
  e.inventory = [{
    year: "", value: String(n), unit: "count", denominator: "",
    counted: "living languages Glottolog records for this country",
    basis: "reference catalogue", note: "",
  }];
  if (e.status === "stub") { e.status = "partial"; e.lastVerified = "2026-08"; }
  filled++;
}
if (process.argv.includes("--write")) {
  fs.writeFileSync(P, JSON.stringify(rows, null, 1) + "\n");
  console.log("wrote indigenous.json");
}
console.log(`${filled} national units given a count; ${skippedSub} sub-national units left empty on purpose`);
console.log(dialectFiled + " units left not-established: their language is a Glottolog DIALECT");
if (noCount.length) console.log(`no Glottolog count for ${noCount.length}: ${noCount.slice(0, 12).join(", ")}`);
