// Put back the sources a drafter quoted and the pipeline never recorded.
//
//     node research/tools/restore-drafted-links.js [--write] [--gated gate.json]
//
// data/field-sources.json holds what each fill wave's EVIDENCE block recorded:
// field, verbatim quote, source. Most of those sources are already a docLink on
// their entry. Some are not -- read, quoted, and then dropped between the gate
// and the store, the same loss recover-doclinks.js was written for. CLAUDE.md's
// first rule is that every claim on an entry traces to a docLink ON THAT SAME
// ENTRY, so a quoted source missing from the entry is a defect, not a tidiness
// problem.
//
// Three rules govern what this will restore:
//
//  1. ONLY a source with the drafter's own label. The label is what a reader
//     sees; inventing one from a hostname would put this tool's words on the
//     entry beside the drafter's.
//  2. ONLY a url that passes the gate, reusing linkcheck.js's own checker so a
//     pass here means a pass there. A dead link is worse than a missing one.
//  3. ONLY docLinks. Nothing else on the entry is touched, and a url already
//     present is skipped, so re-running is safe.
//
// Domains whose data is still the seed are skipped outright: nothing in them
// has been approved, so a missing source is unapplied work rather than a loss.

const fs = require("fs");
const path = require("path");
const { checkUrl } = require("./linkcheck.js");

const root = path.join(__dirname, "..", "..");
const write = process.argv.includes("--write");
const gi = process.argv.indexOf("--gated");
const gatedFile = gi > -1 ? process.argv[gi + 1] : null;
const NL = String.fromCharCode(10);

const dm = require(path.join(root, "src", "domains.js"));
const DOMAINS = dm.DOMAINS || dm.domains || dm.LIVE;
const INDEX = require(path.join(root, "data", "field-sources.json"));

const fold = t => String(t == null ? "" : t).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const nurl = u => fold(u).trim().replace(/^https?:\/\//, "").replace(/^www\./, "").split("#")[0].replace(/\/+$/, "");
const nlab = t => fold(t).replace(/[^a-z0-9]+/g, " ").trim();
const DOI_RE = /10\.\d{4,9}\/[^\s"<>,;)]+/g;
const dois = t => (String(t || "").match(DOI_RE) || []).map(x => x.toLowerCase().replace(/[.)]+$/, ""));

// ---- what is missing -------------------------------------------------------
const files = {}, live = new Set();
for (const d of DOMAINS) {
  const f = path.join(root, "data", `${d.id}.json`);
  if (fs.existsSync(f)) { files[d.id] = f; live.add(d.id); }
}

const want = [];        // {domain, key, url, label, fields:[]}
let unlabelled = 0;
for (const domain of Object.keys(INDEX)) {
  if (!live.has(domain)) continue;
  const rows = JSON.parse(fs.readFileSync(files[domain], "utf8"));
  for (const key of Object.keys(INDEX[domain])) {
    const e = rows.find(x => `${x.countryCode}|${x.unitName}` === key);
    if (!e) continue;
    const links = e.docLinks || [];
    const urls = new Set(links.map(l => nurl(l.url)));
    const labels = links.map(l => nlab(l.label)).filter(Boolean);
    const entryDois = new Set(links.flatMap(l => dois(`${l.url} ${l.label || ""}`)));
    const seen = new Map();
    for (const field of Object.keys(INDEX[domain][key])) {
      for (const s of INDEX[domain][key][field]) {
        if (urls.has(nurl(s.url))) continue;
        if (dois(s.label).some(x => entryDois.has(x))) continue;
        const L = s.label ? nlab(s.label) : null;
        if (L && labels.some(x => x === L || x.includes(L) || L.includes(x)
          || (L.length > 30 && x.length > 30 && x.slice(0, 45) === L.slice(0, 45)))) continue;
        if (!s.label) { unlabelled++; continue; }
        const k = nurl(s.url);
        if (!seen.has(k)) { seen.set(k, { domain, key, url: s.url, label: s.label, fields: [] }); want.push(seen.get(k)); }
        if (!seen.get(k).fields.includes(field)) seen.get(k).fields.push(field);
      }
    }
  }
}

const distinct = [...new Set(want.map(w => w.url))];
console.log(`${want.length} link${want.length === 1 ? "" : "s"} to restore across ` +
  `${new Set(want.map(w => w.domain + " " + w.key)).size} entries, ${distinct.length} distinct urls`);
console.log(`${unlabelled} citation${unlabelled === 1 ? "" : "s"} skipped for having no drafter label${NL}`);

// ---- the gate --------------------------------------------------------------
(async () => {
  let verdicts = {};
  if (gatedFile && fs.existsSync(gatedFile)) {
    verdicts = JSON.parse(fs.readFileSync(gatedFile, "utf8"));
    console.log(`reusing ${Object.keys(verdicts).length} verdicts from ${path.basename(gatedFile)}${NL}`);
  } else {
    let i = 0;
    for (const url of distinct) {
      verdicts[url] = await checkUrl(url);
      process.stderr.write(`\r gating ${++i}/${distinct.length} `);
    }
    process.stderr.write(NL);
    if (gatedFile) fs.writeFileSync(gatedFile, JSON.stringify(verdicts, null, 1) + NL);
  }

  const dead = distinct.filter(u => verdicts[u]);
  const good = distinct.filter(u => !verdicts[u]);
  console.log(`gate: ${good.length} serve, ${dead.length} do not${NL}`);
  for (const u of dead) {
    const w = want.find(x => x.url === u);
    console.log(`  REFUSED ${verdicts[u]}${NL}    ${u}${NL}    would have gone on ${w.domain} ${w.key}`);
  }
  if (dead.length) console.log("");

  const keep = want.filter(w => !verdicts[w.url]);
  const byDomain = {};
  for (const w of keep) (byDomain[w.domain] = byDomain[w.domain] || []).push(w);

  for (const domain of Object.keys(byDomain)) {
    const rows = JSON.parse(fs.readFileSync(files[domain], "utf8"));
    let added = 0;
    for (const w of byDomain[domain]) {
      const e = rows.find(x => `${x.countryCode}|${x.unitName}` === w.key);
      if (!e) continue;
      e.docLinks = e.docLinks || [];
      if (e.docLinks.some(l => nurl(l.url) === nurl(w.url))) continue;
      e.docLinks.push({ label: w.label, url: w.url });
      added++;
      console.log(`  ${domain} ${w.key}  +${w.fields.join(", ")}${NL}    ${w.label.slice(0, 96)}`);
    }
    console.log(`${domain}: ${added} docLink${added === 1 ? "" : "s"} added`);
    if (write) {
      fs.writeFileSync(files[domain], JSON.stringify(rows, null, 1) + NL);
      console.log(`wrote data\\${domain}.json`);
    }
  }
  if (!write) console.log(`${NL}(dry run - pass --write)`);
})();
