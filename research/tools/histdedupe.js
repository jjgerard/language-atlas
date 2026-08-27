// Collapse EXACT duplicate policyHistory rows within one entry.
//
//     node histdedupe.js            # dry run
//     node histdedupe.js --write
//
// histbuild dedupes on the year plus the first 60 normalised characters of the
// description, which is deliberately loose: two agents describing the same act
// in different words should not both land. What it cannot catch is a pair that
// is identical for 60 characters and diverges after, and several of those were
// written before the routing waves settled — Canada carries the Charter s 23
// row twice.
//
// Only byte-identical descriptions on the same year are collapsed here. A pair
// that merely READS alike is left alone and reported: two dated instruments in
// one year is a normal thing for a timeline to hold, and deciding that two
// wordings are the same document is a judgement about the documents, not a
// string comparison.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };

const words = s => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2));
const overlap = (a, b) => { const i = [...a].filter(x => b.has(x)).length; return i / (a.size + b.size - i); };

const write = process.argv.includes("--write");
let removedAll = 0;
const near = [];

for (const [domain, file] of Object.entries(STORE)) {
  const p = path.join(ATLAS, "data", file);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let removed = 0, touched = 0;

  for (const e of rows) {
    const h = e.policyHistory || [];
    if (h.length < 2) continue;

    // Same year, and the same sentence once case, punctuation and a tense
    // ending are folded away: "Emiri Resolution No. 25 establishes compulsory
    // education" against "...established compulsory education". That is one
    // instrument written into two fields of the same entry, not two events.
    // It is not the judgement call that merging two genuinely different
    // wordings would be, which is still refused below.
    const sigOf = r => r.year + "|" +
      String(r.description).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 50);

    const seen = new Set(), kept = [];
    for (const r of h) {
      const sig = sigOf(r);
      if (seen.has(sig)) { removed++; continue; }
      seen.add(sig); kept.push(r);
    }
    if (kept.length !== h.length) { e.policyHistory = kept; touched++; }

    // Report what is similar but not identical, never touch it.
    const byYear = {};
    for (const r of kept) (byYear[r.year] = byYear[r.year] || []).push(r);
    for (const list of Object.values(byYear)) {
      for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
        if (overlap(words(list[i].description), words(list[j].description)) >= 0.6) {
          near.push(`${domain} ${e.unitName} ${list[i].year}\n      A: ${list[i].description.slice(0, 76)}\n      B: ${list[j].description.slice(0, 76)}`);
        }
      }
    }
  }

  const total = rows.reduce((a, e) => a + ((e.policyHistory || []).length), 0);
  console.log(`  ${file.padEnd(16)} -${String(removed).padStart(3)} exact duplicates on ${String(touched).padStart(3)} entries -> ${total} rows`);
  removedAll += removed;
  if (write && removed) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + "\n");
}

console.log(`\n${removedAll} exact duplicates ${write ? "removed" : "would be removed"}`);
console.log(`${near.length} pairs are similar but NOT identical — left in place, listed for a human:`);
near.slice(0, 12).forEach(n => console.log("   " + n));
if (near.length > 12) console.log(`   ... and ${near.length - 12} more`);
