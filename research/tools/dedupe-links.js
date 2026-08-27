// Collapse repeated citations within a single entry.
//
//     node dedupe-links.js            # dry run
//     node dedupe-links.js --write
//
// The same url landing twice on one entry is not just untidy. The Sources page
// counts ENTRY-SLOTS -- a source cited by forty entries counts forty -- so a
// duplicate inflates the very number that page exists to report, and with it
// the "how much of this region leans on a shared source" figure.
//
// Only exact url matches within one entry's own list are collapsed, keeping the
// first occurrence and its label. Nothing is compared across entries: a source
// genuinely cited by many entries is the finding, not a fault.
const fs = require("fs");
const path = require("path");

const NL = String.fromCharCode(10);
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const write = process.argv.includes("--write");

let grandLinks = 0, grandEntries = 0;
for (const [domain, file] of Object.entries(STORE)) {
  const p = path.join(ATLAS, "data", file);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let removed = 0, touched = 0;

  for (const e of rows) {
    let hit = false;
    for (const key of ["docLinks", "supportLinks"]) {
      const list = e[key];
      if (!Array.isArray(list) || list.length < 2) continue;
      const seen = new Set(), kept = [];
      for (const l of list) {
        const url = l && l.url ? String(l.url).trim() : "";
        if (!url) { kept.push(l); continue; }
        if (seen.has(url)) { removed++; hit = true; continue; }
        seen.add(url); kept.push(l);
      }
      if (kept.length !== list.length) e[key] = kept;
    }
    if (hit) touched++;
  }

  const total = rows.reduce((a, e) => a + (e.docLinks || []).length + (e.supportLinks || []).length, 0);
  console.log("  " + file.padEnd(16) + "-" + String(removed).padStart(4) + " repeated citations on " +
    String(touched).padStart(3) + " entries -> " + total + " links");
  grandLinks += removed; grandEntries += touched;
  if (write && removed) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
}
console.log(NL + grandLinks + " repeated citations " + (write ? "removed" : "would be removed") +
  " across " + grandEntries + " entries");
