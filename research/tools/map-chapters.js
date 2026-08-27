// Match each country chapter of Law et al. (2019) to an existing tracker entry.
const fs = require("fs");
const ch = require("./ch.json").message.items;
const seed = JSON.parse(fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json", "utf8")).S;

// Chapter title -> the unitName used in the tracker. The UK chapter covers
// three tracker units, so it maps to a list.
const ALIAS = {
  "The Netherlands": ["Netherlands"],
  "The Russian Federation": ["Russia"],
  "Republic of Macedonia": ["North Macedonia"],
  "Turkey": ["Türkiye"],
  "The United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
};

const THEMATIC = /Introduction|Service delivery|Theory and intervention|Evidence-based practice|social and cultural|practitioner survey/i;

const byName = new Map(seed.map(e => [e.unitName, e]));
const unmatched = [];
const rows = [];

for (const c of ch) {
  const title = (c.title || [""])[0];
  if (THEMATIC.test(title)) continue;
  const targets = ALIAS[title] || [title];
  for (const t of targets) {
    const e = byName.get(t);
    if (!e) { unmatched.push(title + " -> " + t); continue; }
    rows.push({ chapter: title, unit: t, code: e.countryCode, doi: c.DOI, page: c.page, status: e.status, docs: (e.docLinks || []).length });
  }
}

rows.sort((a, b) => a.unit.localeCompare(b.unit));
for (const r of rows) console.log(r.code.padEnd(4), r.unit.padEnd(24), ("st=" + r.status).padEnd(11), "docs=" + String(r.docs).padEnd(3), r.doi, " p" + r.page);
console.log("\nmatched:", rows.length);
console.log("UNMATCHED:", unmatched.length ? unmatched : "none");
console.log("\navailable unitNames sample:", seed.slice(0, 0));
