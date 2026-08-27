// Populate the `languages` field for a handful of units, from WALS's own data.
// Every row's classification, typology and code comes from the CLDF release —
// nothing here is typed from memory, and a language WALS does not carry gets a
// row with no code and therefore no link.
const fs = require("fs"), path = require("path");
const { find, describe } = require("./wals");

const ATLAS = path.join(__dirname, "..", "..", "..");
const P = path.join(ATLAS, "data", "indigenous.json");

// Which languages each unit's own entry already names. Taken from the text
// already on that entry, not invented for this demo.
const UNITS = {
  "CA|Nunavut": ["Inuktitut (Quebec-Labrador)"],
  "GB|Wales": ["Welsh"],
  "PY|Paraguay": ["Guaraní"],
  "ES|Catalonia": ["Catalan"],
  "NZ|New Zealand": ["Maori"],
  "US|Hawaii": ["Hawaiian"],
  "BO|Bolivia": ["Aymara (Central)", "Quechua (Bolivian)"],
  "SN|Senegal": ["Wolof"],
};

const rows = JSON.parse(fs.readFileSync(P, "utf8"));
let touched = 0, langs = 0, unresolved = [];
for (const [key, names] of Object.entries(UNITS)) {
  const [cc, name] = key.split("|");
  const e = rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) { unresolved.push(key + ": no such unit"); continue; }
  if (Array.isArray(e.languages) && e.languages.length) { unresolved.push(key + ": already has languages"); continue; }
  const out = [];
  for (const n of names) {
    const hits = find(n);
    if (!hits.length) { out.push({ name: n, wals: "", iso: "", family: "", genus: "", typology: "" }); unresolved.push(key + ": " + n + " not in WALS, written without a link"); continue; }
    const d = describe(hits[0]);
    if (d.partial || d.collision) { unresolved.push(key + ": " + n + " matched " + d.name + " (" + (d.collision || "partial") + ") — SKIPPED"); continue; }
    out.push({
      name: d.name, wals: d.wals, iso: d.iso,
      family: [d.family, d.subfamily].filter(Boolean).join(" > "),
      genus: d.genus,
      typology: d.typology.map(t => t.replace(/^Order of Subject, Object and Verb: /, "Word order ")
        .replace(/^Order of Adjective and Noun: /, "")
        .replace(/^Prefixing vs\. Suffixing in Inflectional Morphology: /, "")
        .replace(/^Tone: /, "")).join("; "),
    });
    langs++;
  }
  if (!out.length) continue;
  e.languages = out;
  if (e.status === "stub") { e.status = "partial"; e.lastVerified = "2026-08"; }
  touched++;
}
if (process.argv.includes("--write")) {
  fs.writeFileSync(P, JSON.stringify(rows, null, 1) + "\n");
  console.log("wrote " + path.basename(P));
}
console.log(`${touched} units, ${langs} language rows`);
unresolved.forEach(u => console.log("  " + u));
