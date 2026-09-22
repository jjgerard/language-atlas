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

// WHAT THE COUNT IS OF. The rule is Level == "language" and nothing else, and
// that includes languages Glottolog records as gone: Basay was last documented
// in 1915 and Kulon in 1945, and both are counted. So these rows never held
// LIVING languages, whatever the first 207 of them said, and a reader comparing
// Taiwan's Formosan languages against a "living" label would be reading a claim
// the source does not make. Extinct languages are counted for every country
// alike, so the figures stay comparable; only the sentence was wrong.
const COUNTED = "languages Glottolog records for this country, extinct ones included";
const OLD_COUNTED = "living languages Glottolog records for this country";

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

// A UNIT THE COUNTRIES COLUMN GETS WRONG, WHERE THE SOURCE STILL HAS THE ANSWER.
//
// Glottolog files Taiwan's languages under CN. Not all of them -- it lists 16
// under TW -- but it leaves out Atayal, Amis, Bunun, Rukai, Paiwan and Sakizaya,
// the languages the Indigenous Languages Development Act is about, and it files
// TAIWAN SIGN LANGUAGE under CN as well. Taiwan's entry named 17 languages
// against a count of 16, which is how this was found: a count cannot be smaller
// than the list it is supposed to contain.
//
// This is not the Guernsey case above. There the catalogue genuinely cannot
// answer, because it does not carry Guernesiais at any level. Here it carries
// every one of these languages, at Level == "language", with coordinates in
// Taiwan -- only the country index is wrong. So the answer is recoverable from
// the same source by a mechanical rule, and the rule is Glottolog's own
// coordinates: a language it PLACES on the island counts for the island.
//
// The box is the main island, Penghu, Orchid and Green Islands. It deliberately
// excludes Kinmen and Matsu, which Taiwan administers but which sit on the
// Fujian coast, where a box would start collecting Min Chinese varieties that
// belong to the mainland figure.
//
// Checked rather than trusted: the 12 languages this adds are 11 Austronesian
// (Formosan) plus Taiwan Sign Language, and not one of them is a mainland
// language that strayed into the box. Five are extinct -- Basay, Ketangalan,
// Kulon, Papora-Hoanya, Babuza -- which is consistent with every other country's
// figure, since the count has always included extinct languages.
//
// The count is DERIVED here, not written down, so the next Glottolog release
// recomputes it instead of preserving a number from this one.
const COORD_CORRECTED = {
  TW: {
    box: { latMin: 21.5, latMax: 25.4, lonMin: 119.3, lonMax: 122.1 },
    note: "Glottolog's Countries column gives Taiwan 16, filing Atayal, Amis, Bunun, Rukai, Paiwan, Sakizaya and Taiwan Sign Language under CN instead. This figure counts the languages Glottolog's own coordinates place in Taiwan as well, which adds back the 12 it leaves off.",
  },
};

function correctedCount(cc) {
  const c = COORD_CORRECTED[cc];
  if (!c) return null;
  const b = c.box;
  const extra = glot.filter(r => {
    const la = parseFloat(r.Latitude), lo = parseFloat(r.Longitude);
    if (!Number.isFinite(la) || !Number.isFinite(lo)) return false;
    if (la < b.latMin || la > b.latMax || lo < b.lonMin || lo > b.lonMax) return false;
    return !String(r.Countries || "").split(";").map(x => x.trim()).includes(cc);
  });
  return { n: (byCountry[cc] || 0) + extra.length, added: extra.length, note: c.note };
}

// A row this script wrote, and therefore a row it may rewrite. Anything else --
// Greenland's hand-typed statute row -- is left alone.
const isGenerated = inv => Array.isArray(inv) && inv.length === 1 &&
  inv[0].basis === "reference catalogue" && inv[0].unit === "count";

const P = path.join(ATLAS, "data", "indigenous.json");
const rows = JSON.parse(fs.readFileSync(P, "utf8"));
let filled = 0, skippedSub = 0, dialectFiled = 0, relabelled = 0, recounted = [], noCount = [];
// `inventory` is a SERIES field now, not prose. An entry already holding a row
// is left alone, exactly as a filled string was before.
for (const e of rows) {
  // Relabelling has to happen BEFORE the skip below, because every row this
  // script has already written is a row the skip protects.
  for (const r of (Array.isArray(e.inventory) ? e.inventory : []))
    if (r.counted === OLD_COUNTED) { r.counted = COUNTED; relabelled++; }

  if (e.isNational && COORD_CORRECTED[e.countryCode] && isGenerated(e.inventory)) {
    const c = correctedCount(e.countryCode);
    if (c && (String(c.n) !== e.inventory[0].value || c.note !== e.inventory[0].note)) {
      if (String(c.n) !== e.inventory[0].value)
        recounted.push(`${e.countryCode} ${e.inventory[0].value} -> ${c.n} (+${c.added} placed there but filed elsewhere)`);
      e.inventory[0].value = String(c.n);
      e.inventory[0].note = c.note;
    }
  }

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
  const corrected = correctedCount(e.countryCode);
  const n = corrected ? corrected.n : byCountry[e.countryCode];
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
    counted: COUNTED,
    basis: "reference catalogue", note: corrected ? corrected.note : "",
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
if (relabelled) console.log(relabelled + " rows relabelled: the count was never of LIVING languages");
if (recounted.length) console.log("recounted from coordinates: " + recounted.join("; "));
if (noCount.length) console.log(`no Glottolog count for ${noCount.length}: ${noCount.slice(0, 12).join(", ")}`);
