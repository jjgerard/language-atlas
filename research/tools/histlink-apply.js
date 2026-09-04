// Add the documents a policy-history row names to that entry's docLinks.
//
//     node histlink-apply.js <verified.json> <histlink-out-dir>        # dry run
//     node histlink-apply.js <verified.json> <histlink-out-dir> --write
//
// The history matcher ties a row to a docLink already on the entry. It was
// tying 40% of the indigenous map's rows, and almost every miss was an entry
// whose docLinks simply did not include the instrument the row named. So this
// does not touch history.js at all: it adds the document, and the row links
// itself on the next derive.
//
// Which means the LABEL is the whole mechanism. The matcher compares the row's
// distinctive words against the label, and rejects a label naming a different
// year outright. A link added with the label "Ministry page" changes nothing.
// The gate has already confirmed each url really serves the instrument; this
// checks the labels land, and reports the before/after link rate so a pass that
// added 78 documents and moved nothing would be visible rather than silent.
const fs = require("fs");
const path = require("path");
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { deriveUnits } = require(path.join(__dirname, "..", "..", "src", "derive"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const verifiedPath = process.argv[2], outDir = process.argv[3];
const write = process.argv.includes("--write");
if (!verifiedPath || !outDir) {
  console.log("usage: node histlink-apply.js <verified.json> <histlink-out-dir> [--write]");
  process.exit(1);
}

// The gate keeps labels; the drafter's files hold the url for each label.
const urlFor = new Map();
for (const f of fs.readdirSync(outDir).filter(x => /^out-\d+\.json$/.test(x)))
  for (const r of Object.values(JSON.parse(fs.readFileSync(path.join(outDir, f), "utf8"))))
    for (const l of (r.links || [])) if (l && l.label && l.url) urlFor.set(l.label, l.url);

const verified = JSON.parse(fs.readFileSync(verifiedPath, "utf8"));
const domain = DOMAINS.find(d => d.id === "indigenous");
const p = pathFor("indigenous");
const rows = JSON.parse(fs.readFileSync(p, "utf8"));
const byKey = new Map(rows.map(r => [r.countryCode + "|" + r.unitName, r]));

const before = deriveUnits(domain, rows).stats;

let added = 0, dupe = 0, noUrl = 0, missing = 0;
for (const [key, v] of Object.entries(verified)) {
  const labels = (v.fields && v.fields.histlink) || [];
  if (!labels.length) continue;
  const e = byKey.get(key);
  if (!e) { missing++; continue; }
  e.docLinks = e.docLinks || [];
  const have = new Set(e.docLinks.map(l => l && l.url));
  for (const label of labels) {
    const url = urlFor.get(label);
    if (!url) { noUrl++; continue; }
    if (have.has(url)) { dupe++; continue; }
    e.docLinks.push({ label, url });
    have.add(url); added++;
  }
}

const after = deriveUnits(domain, rows).stats;
const pct = (a, b) => b ? Math.round(a / b * 100) + "%" : "-";
console.log((write ? "WROTE " : "DRY RUN ") + added + " document(s) added to docLinks");
if (dupe) console.log("  " + dupe + " already cited");
if (noUrl) console.log("  " + noUrl + " verified label(s) had no url in the drafter files");
if (missing) console.log("  " + missing + " unit(s) not found");
console.log(NL + "policy-history rows linked:");
console.log("  before  " + before.historyLinked + " / " + before.historyRows + "  " + pct(before.historyLinked, before.historyRows));
console.log("  after   " + after.historyLinked + " / " + after.historyRows + "  " + pct(after.historyLinked, after.historyRows));
console.log("  gain    +" + (after.historyLinked - before.historyLinked) + " rows");

if (write) { fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL); console.log(NL + "wrote " + path.basename(p)); }
else console.log(NL + "(dry run - pass --write)");
