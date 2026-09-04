// Build worklists of policy-history rows that name a document nobody has cited.
//
//     node hist-unlinked-wl.js <domain> <outdir> <batches>
//
// The history matcher ties a row to a docLink on the same entry. Across the
// five maps 3,339 rows exist and 1,084 are tied; of the 2,255 that are not,
// exactly 21 are on an entry with no docLinks at all. So the matcher is not the
// bottleneck -- the document the row names is simply not cited. Angola's entry
// says "Law 13/01 of 2001 allowed indigenous languages into formal education"
// and carries a link to Lei 17/16, which is a different law.
//
// Find the instrument, add it to docLinks, and the row links itself. Nothing in
// history.js needs to change, and a row whose document cannot be identified
// stays plain text, which the matcher's own comments call the right answer.
//
// Rows are ranked by how identifiable they are, because a row naming a number
// is findable and a row saying "the position since is unclear" is not.
const fs = require("fs");
const path = require("path");
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { deriveUnits } = require(path.join(__dirname, "..", "..", "src", "derive"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const id = process.argv[2], outDir = process.argv[3], N = Number(process.argv[4] || 10);
if (!id || !outDir) { console.log("usage: node hist-unlinked-wl.js <domain> <outdir> <batches>"); process.exit(1); }

const domain = DOMAINS.find(d => d.id === id);
if (!domain) throw new Error("no domain " + id);
const rows = JSON.parse(fs.readFileSync(pathFor(id), "utf8"));
const units = deriveUnits(domain, rows).units;

// A number makes an instrument findable; a title makes it mostly findable.
const NUMBERED = /\b(?:law|lei|ley|loi|act|decree|decreto|décret|ligj|regulation|order|ordinance|circular|resolution|decision|directive|statute|no\.?|n[oº°]\.?|nr\.?)\s*[\w.\/-]*\d/i;
const TITLED = /\b(Act|Law|Ley|Lei|Loi|Constitution|Convention|Charter|Decree|Policy|Plan|Strategy|Code|Regulation|Statute|Ordinance|Bill|Amendment|Programme|Program)\b/;

const items = [];
for (let i = 0; i < units.length; i++) {
  const e = rows[i], u = units[i];
  const want = [];
  for (const h of (u.history || [])) {
    if (h.links && h.links.length) continue;
    const t = h.description || "";
    const rank = NUMBERED.test(t) ? "numbered" : TITLED.test(t) ? "titled" : "unnamed";
    if (rank === "unnamed") continue;          // no document to go and find
    want.push({ year: h.year, description: t, rank });
  }
  if (!want.length) continue;
  items.push({
    key: e.countryCode + "|" + e.unitName,
    cc: e.countryCode, unit: e.unitName, region: e.region || "",
    rows: want,
    // So an agent does not re-add something already cited, and can see what
    // kind of source this entry already leans on.
    docLinks: (e.docLinks || []).map(l => ({ label: l.label, url: l.url })),
  });
}

items.sort((a, b) => b.rows.filter(r => r.rank === "numbered").length - a.rows.filter(r => r.rank === "numbered").length);

fs.mkdirSync(outDir, { recursive: true });
const per = Math.ceil(items.length / N);
let tot = 0;
for (let i = 0, n = 0; i < items.length; i += per) {
  n++;
  const batch = items.slice(i, i + per);
  const c = batch.reduce((s, x) => s + x.rows.length, 0);
  tot += c;
  const name = "worklist-" + String(n).padStart(2, "0") + ".json";
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(batch, null, 1) + NL);
  console.log("  " + name + "  " + batch.length + " units, " + c + " rows");
}
console.log(id + ": " + items.length + " units, " + tot + " findable rows over " + Math.ceil(items.length / per) + " batches");
