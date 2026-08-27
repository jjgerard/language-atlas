// Normalise policyHistory `year` to an integer.
//
//     node histfix.js            # report
//     node histfix.js --write
//
// 201 rows across the four stores carry `year` as a STRING — 190 as "1986" and
// 11 as a span like "2016-2017". They predate this pass; the router that just
// added 602 rows validated integers and contributed none of them.
//
// It matters because `sort((a, b) => a.year - b.year)` on a string year yields
// NaN, which leaves the comparator indecisive and the timeline in whatever
// order the rows happened to be written. Four entries on the foreign-language
// map are visibly out of order for exactly this reason. Anything that buckets
// or plots by year has the same problem, and trends across the maps are the
// reason these rows were harvested.
//
// A span becomes its START year, and the span itself is moved into the
// description where it is still visible to a reader — dropping "-2017" from
// "2016-2017" would quietly assert a precision the source did not give.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const FILES = ["fl.seed.json", "dld.json", "eal.json", "indigenous.json"];

let fixed = 0, spans = 0, unparsed = 0, resorted = 0;
const staged = [];

for (const name of FILES) {
  const file = path.join(ATLAS, "data", name);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const e of rows) {
    const h = e.policyHistory;
    if (!Array.isArray(h) || !h.length) continue;
    for (const r of h) {
      if (Number.isInteger(r.year)) continue;
      const s = String(r.year).trim();
      const span = s.match(/^(\d{4})\s*[–-]\s*(\d{2,4})$/);
      if (span) {
        r.year = Number(span[1]);
        // Keep the span visible. Only prepend when the description does not
        // already carry it, so a re-run is idempotent.
        if (!r.description.includes(s)) r.description = `${s}: ${r.description}`;
        spans++; fixed++;
        continue;
      }
      if (/^\d{4}$/.test(s)) { r.year = Number(s); fixed++; continue; }
      console.log(`  UNPARSED ${name} ${e.unitName}: year ${JSON.stringify(r.year)}`);
      unparsed++;
    }
    const before = h.map(x => x.year).join(",");
    h.sort((a, b) => a.year - b.year);
    if (h.map(x => x.year).join(",") !== before) resorted++;
  }
  staged.push([file, rows]);
}

console.log(`${fixed} year values converted to integers (${spans} were spans, moved into the description)`);
console.log(`${resorted} entries re-sorted into chronological order`);
if (unparsed) console.log(`${unparsed} left alone — not a year or a span`);

if (process.argv.includes("--write")) {
  staged.forEach(([file, rows]) => fs.writeFileSync(file, JSON.stringify(rows, null, 1) + "\n"));
  console.log("written");
} else {
  console.log("(dry run — pass --write)");
}
