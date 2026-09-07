// Which institutions teach a given language, and at what level.
//
//     node where-taught.js              # every language, by how many places teach it
//     node where-taught.js Quechua      # where one language can be studied
//
// This is the query `he.offerings` exists to answer, and the reason that field
// is TYPED rather than prose. `degreeSubjects` says the same things in
// sentences -- "French and Spanish may be taken singly, jointly, or with
// Management Studies" -- which reads well and cannot be searched: there is no
// way to ask it for every institution teaching Quechua without reading all 153
// entries. A row carrying {language, level, institution, url} can be asked.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { pathFor } = require("./datafile");
const NL = String.fromCharCode(10);

const want = process.argv.slice(2).join(" ").trim().toLowerCase();
const rows = JSON.parse(fs.readFileSync(pathFor("he"), "utf8"));

const all = [];
for (const e of rows) {
  for (const r of (e.offerings || [])) {
    all.push({
      language: String(r.language || ""), level: String(r.level || ""),
      institution: String(r.institution || ""), url: String(r.url || ""),
      year: String(r.year || ""), cc: e.countryCode, unit: e.unitName,
      institutions: String(r.institutions || ""),
    });
  }
}

if (!want) {
  const by = {};
  for (const r of all) {
    const k = r.language || "(unnamed)";
    by[k] = by[k] || { places: new Set(), countries: new Set(), levels: new Set() };
    by[k].places.add(r.institution || ("count:" + r.cc));
    by[k].countries.add(r.cc);
    if (r.level) by[k].levels.add(r.level);
  }
  const list = Object.entries(by).sort((a, b) => b[1].countries.size - a[1].countries.size || b[1].places.size - a[1].places.size);
  console.log(all.length + " offering rows, " + list.length + " distinct languages" + NL);
  console.log("language".padEnd(28) + "countries  institutions  levels");
  for (const [lang, s] of list.slice(0, 30))
    console.log("  " + lang.padEnd(26) + String(s.countries.size).padStart(6)
      + String(s.places.size).padStart(13) + "   " + [...s.levels].sort().join(","));
  if (list.length > 30) console.log("  ... and " + (list.length - 30) + " more languages");
  console.log(NL + "  node where-taught.js <language>   for one language");
  process.exit(0);
}

const hits = all.filter(r => r.language.toLowerCase().includes(want));
if (!hits.length) { console.log("No offering row names a language matching \"" + want + "\"."); process.exit(0); }
const byCountry = {};
for (const r of hits) (byCountry[r.cc + " " + r.unit] = byCountry[r.cc + " " + r.unit] || []).push(r);
console.log(hits.length + " row(s) across " + Object.keys(byCountry).length + " countries" + NL);
for (const [c, list] of Object.entries(byCountry).sort()) {
  console.log(c);
  for (const r of list.sort((a, b) => a.level.localeCompare(b.level)))
    console.log("   " + (r.level || "?").padEnd(10) + (r.institution || (r.institutions + " institutions"))
      + (r.year ? "  (" + r.year + ")" : ""));
}
