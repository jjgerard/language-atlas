// Write verified policyHistory rows onto entries that already exist.
//
//     node hist-apply.js <hist-verified.json>            # dry run
//     node hist-apply.js <hist-verified.json> --write
//
// hist-verify.js produces the input and nothing else should. Keys are
// "domain|cc|unitName", so a row can only ever land on the map it was drafted
// for -- the pooling bug that returned two domains' work as one set is not
// reachable from here.
//
// Rows are MERGED, never assigned: most of these entries already carry rows
// from earlier passes, and an assignment would silently drop them. A row whose
// year and first 60 normalised characters match one already present is counted
// as a duplicate and skipped, which is the same signature histbuild uses.
//
// docLinks are merged by url. A source already on the entry is left alone
// rather than added twice, and its existing label is kept, because the label on
// the entry was written by whoever first read the document.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const NL = String.fromCharCode(10);

const file = process.argv[2];
if (!file) { console.log("usage: node hist-apply.js <hist-verified.json> [--write]"); process.exit(1); }
const write = process.argv.includes("--write");
const verified = JSON.parse(fs.readFileSync(file, "utf8"));

const norm = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);

// Group by domain so each store is read and written once.
const byDomain = {};
for (const [key, v] of Object.entries(verified)) {
  const [domain, cc, ...rest] = key.split("|");
  const unitName = rest.join("|");
  if (!STORE[domain]) { console.log("  unknown domain in key: " + key); continue; }
  (byDomain[domain] = byDomain[domain] || []).push({ cc, unitName, ...v });
}

let addedAll = 0, dupeAll = 0, linkAll = 0;
for (const [domain, items] of Object.entries(byDomain)) {
  const p = path.join(ATLAS, "data", STORE[domain]);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let added = 0, dupes = 0, links = 0, missing = 0;

  for (const item of items) {
    const e = rows.find(r => r.countryCode === item.cc && r.unitName === item.unitName);
    if (!e) { console.log("  no " + domain + " entry for " + item.cc + "|" + item.unitName); missing++; continue; }

    const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
    const fresh = [];
    for (const r of item.history || []) {
      const sig = r.year + "|" + norm(r.description);
      if (have.has(sig)) { dupes++; continue; }
      have.add(sig); fresh.push({ year: r.year, description: r.description });
    }
    if (fresh.length) {
      e.policyHistory = [...(e.policyHistory || []), ...fresh].sort((a, b) => a.year - b.year);
      added += fresh.length;
    }

    const urls = new Set((e.docLinks || []).map(l => l.url));
    for (const s of item.sources || []) {
      if (!s || !s.url || urls.has(s.url)) continue;
      urls.add(s.url);
      e.docLinks = [...(e.docLinks || []), { label: s.label || s.url, url: s.url }];
      links++;
    }

    console.log("  " + domain.padEnd(11) + item.unitName.padEnd(26) + "+" + String(fresh.length).padStart(2) + " rows" +
      (fresh.length ? "  " + fresh.map(f => f.year).join(" ") : ""));
  }

  const total = rows.reduce((a, e) => a + ((e.policyHistory || []).length), 0);
  const withHist = rows.filter(e => (e.policyHistory || []).length).length;
  console.log("  -> " + STORE[domain] + ": +" + added + " rows, " + dupes + " already present, +" + links +
    " docLinks" + (missing ? ", " + missing + " entries not found" : "") +
    "  (store now " + total + " rows on " + withHist + " entries)" + NL);
  addedAll += added; dupeAll += dupes; linkAll += links;

  if (write) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
}

console.log(addedAll + " rows " + (write ? "written" : "would be written") + ", " + dupeAll + " duplicates skipped, " + linkAll + " docLinks added");
if (!write) console.log("  (dry run - pass --write)");
