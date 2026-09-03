// Add the territories as units, and write their verified Indigenous content.
//
//     node add-territories.js <verified.json>            # validate
//     node add-territories.js <verified.json> --write
//
// These places were absent from the atlas entirely: no unit on any map, though
// the map could already draw every one of them - as a polygon for Puerto Rico,
// New Caledonia and Taiwan, and as an anchor dot for the rest, which is the
// same mechanism that draws Malta and Singapore.
//
// A unit is added to all four stores at once, per the rule that a place split
// for one question is split for all of them. Only the Indigenous map gets
// content here; the other three are honest stubs, because that is the map these
// places were researched for.
//
// Content comes from verified.json, which is what survived terr-verify.js -
// every bullet in it has a verbatim quote that was found on the page it cites
// when this script's sibling fetched that page itself.
const fs = require("fs");
const path = require("path");

const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const LIVE = DOMAINS.filter(d => d.live);
// Domain data files are resolved by research/tools/datafile.js, which
// prefers the living snapshot and falls back to the seed. It replaced a
// hand-maintained map here that did not know about the `he` map and threw
// path.join(undefined) the moment one was reached.
const { fileFor } = require("./datafile");
const STORE = new Proxy({}, { get: (_, id) => fileFor(String(id)) });
const LIMIT = 96;

// region and subregion per unit. src/subregions.js already maps the ISO code to
// a subregion; the region is the broader UN grouping the atlas uses.
const PLACE = {
  "FO|Faroe Islands":            { region: "Europe",   subregion: "Northern Europe" },
  "IM|Isle of Man":              { region: "Europe",   subregion: "Northern Europe" },
  "JE|Jersey":                   { region: "Europe",   subregion: "Northern Europe" },
  "GG|Guernsey":                 { region: "Europe",   subregion: "Northern Europe" },
  "GI|Gibraltar":                { region: "Europe",   subregion: "Southern Europe" },
  "PR|Puerto Rico":              { region: "Americas", subregion: "Caribbean" },
  "AW|Aruba":                    { region: "Americas", subregion: "Caribbean" },
  "CW|Curacao":                  { region: "Americas", subregion: "Caribbean" },
  "SX|Sint Maarten":             { region: "Americas", subregion: "Caribbean" },
  "GU|Guam":                     { region: "Oceania",  subregion: "Micronesia" },
  "MP|Northern Mariana Islands": { region: "Oceania",  subregion: "Micronesia" },
  "AS|American Samoa":           { region: "Oceania",  subregion: "Polynesia" },
  "NC|New Caledonia":            { region: "Oceania",  subregion: "Melanesia" },
  "PF|French Polynesia":         { region: "Oceania",  subregion: "Polynesia" },
  "WF|Wallis and Futuna":        { region: "Oceania",  subregion: "Polynesia" },
  "TW|Taiwan":                   { region: "Asia",     subregion: "Eastern Asia" },
};

const STUB = "Not yet documented for this question. This place was added to the atlas from research on the Indigenous and regional languages map, which is where its distinctive language policy sits. If you teach, plan or research language provision here, please add what you know.";

const verifiedPath = process.argv[2];
if (!verifiedPath) { console.log("usage: node add-territories.js <verified.json> [--write]"); process.exit(1); }
const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));

const problems = [], staged = [];
for (const d of LIVE) {
  const file = path.join(ATLAS, "data", STORE[d.id]);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  let added = 0, documented = 0;

  for (const [key, place] of Object.entries(PLACE)) {
    const [cc, name] = key.split("|");
    if (rows.some(r => r.countryCode === cc)) { problems.push(d.id + ": " + cc + " already present"); continue; }
    const v = d.id === "indigenous" ? verified[key] : null;

    const row = {
      countryCode: cc, unitName: name, isNational: true,
      region: place.region, subregion: place.subregion,
      status: v ? "partial" : "stub",
      confidence: v ? "official-document" : "unverified-submission",
      lastVerified: v ? "2026-08" : "",
      collaborators: [],
      docLinks: v ? (v.sources || []).map(s => ({ label: s.label, url: s.url })) : [],
      supportLinks: [],
      sourceLanguageNote: "",
      stubNote: v ? "" : STUB,
      by: v ? "Seeded via AI-assisted deep research (2026), every bullet re-checked against the source it cites" : "",
    };
    for (const [k, , type] of d.fields) {
      row[k] = (type === "history" || type === "series" || type === "languages") ? [] : "";
    }

    if (v) {
      for (const [k, bullets] of Object.entries(v.fields || {})) {
        if (!Object.prototype.hasOwnProperty.call(row, k)) { problems.push(key + ": no field " + k); continue; }
        bullets.forEach(b => {
          if (b.length > LIMIT) problems.push(key + "/" + k + ": " + b.length + " chars - " + b.slice(0, 46));
          if (/[.;]$/.test(b)) problems.push(key + "/" + k + ": ends with punctuation - " + b.slice(0, 46));
        });
        if (bullets.length > 5) problems.push(key + "/" + k + ": " + bullets.length + " bullets");
        row[k] = bullets.join(NL);
      }
      const hist = (v.history || []).filter(h => h && Number.isInteger(h.year) && String(h.description || "").trim());
      row.policyHistory = hist.sort((a, b) => a.year - b.year);
      documented++;
    }

    const at = rows.findIndex(r => r.countryCode > cc);
    if (at < 0) rows.push(row); else rows.splice(at, 0, row);
    added++;
  }
  staged.push({ file, rows, domain: d.id, added, documented });
}

if (problems.length) {
  console.log("PROBLEMS - nothing written:");
  problems.forEach(p => console.log("  " + p));
  process.exit(1);
}
for (const s of staged) {
  console.log("  " + STORE[s.domain].padEnd(16) + "+" + s.added + " units (" + s.rows.length + " total), " + s.documented + " documented");
}
if (process.argv.includes("--write")) {
  staged.forEach(s => fs.writeFileSync(s.file, JSON.stringify(s.rows, null, 1) + NL));
  console.log("  written");
} else {
  console.log("  (dry run - pass --write)");
}
