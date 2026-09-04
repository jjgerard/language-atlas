// Recover the docLinks a gate run dropped.
//
//     node recover-doclinks.js <domain> <specDir> [<specDir>...]
//     node recover-doclinks.js <domain> <specDir> --write
//
// terr-verify read the drafter's sources from `s.sources`, and every drafting
// brief this project has written asks for `addDocLinks`, because that is what
// apply.js calls the field. So the two never met, and every source a drafter
// cited was dropped between the gate and the store, silently, on every batch.
//
// That is not a cosmetic loss. The first rule in CLAUDE.md is that every claim
// on an entry traces to a docLink ON THAT SAME ENTRY, and rows were landing
// with the documents they trace to discarded in transit. It also broke the
// history matcher, which resolves a row to a document by looking only at its
// own entry's docLinks: 179 he history rows went in and 16 of 225 could be
// matched, because the documents naming them were never added.
//
// The gate is fixed. This recovers what the already-applied batches lost, from
// the drafters' own out-NN.json files, which still hold the links. It writes
// NOTHING but docLinks: apply.js dedupes them on url, so a source already
// present is skipped and re-running this is safe.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);

const domain = process.argv[2];
const write = process.argv.includes("--write");
const dirs = process.argv.slice(3).filter(a => !a.startsWith("--"));
if (!domain || !dirs.length) {
  console.log("usage: node recover-doclinks.js <domain> <specDir> [...] [--write]");
  process.exit(1);
}

const byKey = new Map();
let files = 0;
for (const dir of dirs) {
  if (!fs.existsSync(dir)) { console.log("  no such dir: " + dir); continue; }
  for (const f of fs.readdirSync(dir).filter(x => /^out-\d+\.json$/.test(x))) {
    files++;
    const batch = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const [key, spec] of Object.entries(batch)) {
      const links = spec.addDocLinks || spec.sources || [];
      if (!Array.isArray(links) || !links.length) continue;
      const have = byKey.get(key) || new Map();
      // Deduped on url here too, so two batches citing one document produce
      // one link rather than two identical ones.
      for (const l of links) if (l && l.url && l.label && !have.has(l.url)) have.set(l.url, l);
      byKey.set(key, have);
    }
  }
}

const spec = {};
let total = 0;
for (const [key, have] of byKey) {
  spec[key] = { addDocLinks: [...have.values()].map(l => ({ label: String(l.label), url: String(l.url) })) };
  total += spec[key].addDocLinks.length;
}

console.log(files + " spec file(s) read, " + byKey.size + " entries, " + total + " distinct source(s) to restore");
if (!write) {
  for (const [k, v] of Object.entries(spec).slice(0, 6))
    console.log("  " + k + ": " + v.addDocLinks.length + "  e.g. " + (v.addDocLinks[0] || {}).label);
  console.log(NL + "(dry run - pass --write)");
  process.exit(0);
}

const outFile = path.join(require("os").tmpdir(), "recover-doclinks-" + domain + ".json");
fs.writeFileSync(outFile, JSON.stringify(spec, null, 1) + NL);
console.log("spec written to " + outFile + " -- apply it with:");
console.log("  node research/tools/fl/apply.js  (via terr-apply)");
