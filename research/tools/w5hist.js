// Merge the wave-5 dated rows into the indigenous store.
//
//     node w5hist.js [--write]
//
// Separate from w4apply because the fields are already written: run() refuses
// an entry whose fields exist and exits before the merge, so the timeline could
// never land through that path.
//
// The rows were dropped once already. w4apply's historyRows matched the literal
// heading "POLICY HISTORY ROWS", and this wave's agents wrote "POLICY HISTORY:"
// (53 files) or a `- field: policyHistory` block with rows nested under `rows:`
// (6 files). Neither matched, all 58 files' timelines were discarded, and the
// apply printed "0 history rows" for every entry with nothing looking wrong.
// Match the heading loosely; match the row shape strictly.
const fs = require("fs");
const path = require("path");

const PARTS = path.join(__dirname, "..", "parts");
const FILE = path.join(__dirname, "..", "..", "data", "indigenous.json");

function rowsIn(file) {
  const text = fs.readFileSync(path.join(PARTS, file), "utf8");
  const head = text.match(/^[ \t]*(?:-[ \t]*field:[ \t]*(?:[a-z]+\.)?policyHistory|#*[ \t]*POLICY HISTORY)/mi);
  if (!head) return null;
  const after = text.slice(text.indexOf(head[0]));
  // Stop at the next all-caps section so a later block's stray "year:" is not
  // swept in.
  const end = after.slice(1).search(/\n[A-Z][A-Z \/]{3,}[:\n]/);
  const block = end > -1 ? after.slice(0, end + 1) : after;
  const out = [];
  const re = /-\s*year:\s*(\d{4})\s*\n\s*description:\s*([\s\S]*?)(?=\n\s*(?:source:|-\s*year:|$))/g;
  let m;
  while ((m = re.exec(block))) {
    out.push({ year: Number(m[1]), description: m[2].split("\n").map(s => s.trim()).filter(Boolean).join(" ").trim() });
  }
  return out;
}

const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);

let added = 0, touched = 0, dupes = 0, missing = [], badRows = 0;
const before = rows.reduce((a, e) => a + ((e.policyHistory || []).length), 0);

for (const f of fs.readdirSync(PARTS).filter(x => /^w5-ind-/.test(x)).sort()) {
  const text = fs.readFileSync(path.join(PARTS, f), "utf8");
  const hdr = text.match(/^###\s+([A-Z]{2}(?:-[A-Z0-9]{1,3})?)\|([^\n—]+?)\s*$/m);
  if (!hdr) continue;
  const fresh = rowsIn(f);
  if (!fresh || !fresh.length) continue;
  const e = rows.find(r => r.countryCode === hdr[1] && r.unitName === hdr[2].trim());
  if (!e) { missing.push(f + " -> " + hdr[1] + "|" + hdr[2].trim()); continue; }

  const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
  const keep = [];
  for (const h of fresh) {
    if (!Number.isInteger(h.year) || h.year < 1500 || h.year > 2030 || !h.description) { badRows++; continue; }
    const sig = h.year + "|" + norm(h.description);
    if (have.has(sig)) { dupes++; continue; }
    have.add(sig);
    keep.push(h);
  }
  if (!keep.length) continue;
  e.policyHistory = [...(e.policyHistory || []), ...keep].sort((a, b) => a.year - b.year);
  added += keep.length; touched++;
}

console.log(`${added} dated rows to add on ${touched} entries`);
console.log(`  ${dupes} already present, ${badRows} malformed and skipped`);
if (missing.length) { console.log("  no such entry:"); missing.forEach(m => console.log("    " + m)); }
console.log(`  store: ${before} rows -> ${before + added}`);

if (process.argv.includes("--write")) {
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 1) + "\n");
  console.log("written");
} else {
  console.log("(dry run — pass --write)");
}
