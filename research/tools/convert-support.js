// Converts the free-text `resources` prose into `supportLinks`. Every URL here
// was checked to resolve. Anything already cited in that entry's docLinks is
// deliberately omitted — that is the whole point of the split.
const fs = require("node:fs");
const OUT = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json";
const seed = JSON.parse(fs.readFileSync(OUT, "utf8"));

const RADLD = { label: "RADLD — Raising Awareness of DLD", url: "https://radld.org/" };

const SUPPORT = {
  "GB|England": [
    { label: "Speech and Language UK (formerly I CAN)", url: "https://speechandlanguage.org.uk/" },
    RADLD,
    { label: "The Balanced System", url: "https://www.thebalancedsystem.org/" },
  ],
  "IE|Ireland": [
    { label: "IASLT — Irish Association of Speech and Language Therapists", url: "https://www.iaslt.ie/" },
    { label: "National Council for Special Education", url: "https://ncse.ie/" },
    RADLD,
  ],
  "NL|Netherlands": [
    { label: "Auris", url: "https://www.auris.nl/" },
    { label: "VierTaal", url: "https://www.viertaal.nl/" },
    { label: "Vitus Zuid", url: "https://www.vituszuid.nl/" },
  ],
  "SE|Sweden": [
    { label: "Legilexi", url: "https://legilexi.org/" },
    RADLD,
  ],
  "US|United States": [
    { label: "DLD and Me", url: "https://dldandme.org/" },
    RADLD,
  ],
  "CA|Ontario": [
    { label: "CASLPO — College of Audiologists and Speech-Language Pathologists of Ontario", url: "https://www.caslpo.com/" },
  ],
  "AU|Australia": [
    { label: "NSW Department of Education — DLD professional learning", url: "https://cer.schools.nsw.gov.au/professional-learning/developmental-language-disorder" },
    RADLD,
  ],
  "NZ|New Zealand": [
    { label: "RTLB — Resource Teachers: Learning and Behaviour", url: "https://rtlb.tki.org.nz/" },
  ],
  "ZA|South Africa": [
    { label: "SASLHA — South African Speech-Language-Hearing Association", url: "https://www.saslha.co.za/" },
  ],
  "IN|India": [
    { label: "Rehabilitation Council of India", url: "https://rehabcouncil.nic.in/" },
    { label: "ISHA — Indian Speech and Hearing Association", url: "https://www.ishaindia.org.in/" },
  ],
};

const key = (e) => `${e.countryCode}|${e.unitName}`;
let converted = 0, cleared = 0, collisions = [];

for (const e of seed.S) {
  const had = (e.resources || "").trim();
  delete e.resources;
  e.supportLinks = SUPPORT[key(e)] || [];
  if (e.supportLinks.length) converted++;
  else if (had) cleared++;

  // Enforce the rule: nothing may appear as both a support link and a source.
  const srcUrls = new Set((e.docLinks || []).map((d) => d.url));
  for (const s of e.supportLinks) {
    if (srcUrls.has(s.url)) collisions.push(`${e.unitName}: ${s.url}`);
  }
}

const unmatched = Object.keys(SUPPORT).filter((k) => !seed.S.some((e) => key(e) === k));
if (unmatched.length) { console.error("No entry for:", unmatched.join(", ")); process.exit(1); }
if (collisions.length) { console.error("Support link duplicates a source:\n  " + collisions.join("\n  ")); process.exit(1); }

const leftovers = seed.S.filter((e) => "resources" in e);
if (leftovers.length) { console.error("resources survived on", leftovers.length, "entries"); process.exit(1); }

fs.writeFileSync(OUT, JSON.stringify(seed, null, 2) + "\n");
const total = seed.S.reduce((n, e) => n + e.supportLinks.length, 0);
console.log(`Converted ${converted} entries to supportLinks (${total} links).`);
console.log(`Entries whose resources prose was entirely citations, now empty: ${cleared}.`);
console.log("No support link duplicates a source link.");
