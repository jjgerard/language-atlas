// Add bullets to a field that ALREADY HAS TEXT, without touching what is there.
//
//     node deepen-apply.js <domain> <verified.json> <specDir>
//     node deepen-apply.js dld research/pending/redress-eu/verified.json research/pending/redress-eu --write
//
// The fill pipeline answers "this field is empty, write it". This answers the
// other half of the same coverage problem: the field is written, and it does
// not answer one of the four questions it declares. progress.js has always
// reported those separately -- FILL and DEPTH move independently, dld being
// 74% filled and 19% thin -- and until now only one of them had a writer.
//
// fl/apply.js REFUSES to write over a field holding real prose, and it is
// right to: replacing sourced work needs a person, because it means somebody's
// research is wrong rather than merely missing. But that guard also made it
// impossible to ADD a sentence to a field, which is not the same act. So this
// merges the way policyHistory and the programme lists already merge in that
// same file: existing bullets are never touched, a new bullet is added only if
// nothing matching it is there already, and slots grow with the bullets.
//
// WHAT IT REFUSES, so that the guard it works around is not simply removed:
//   - an EMPTY field. That is terr-apply.js's job, and doing it here would
//     skip the slot and absence handling that belongs to a fill.
//   - a field holding a third-state sentinel. Upgrading `Not established from
//     the sources consulted` to documented content is a fill too, and
//     fl/apply.js has the logic for it.
//   - a bullet over the 96-character guard, or one ending in sentence
//     punctuation, since those are the house rules everywhere else.
// Nothing here can overwrite or delete an existing bullet. The only edit it
// can make to a field is to make it longer.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile");
const { DOMAINS } = require("../../src/domains");

const NL = String.fromCharCode(10);
const [, , domainId, file, specDir] = process.argv;
const WRITE = process.argv.includes("--write");
if (!domainId || !file) {
  console.log("usage: deepen-apply.js <domain> <verified.json> [specDir] [--write]");
  process.exit(1);
}
const domain = DOMAINS.find(d => d.id === domainId);
if (!domain) { console.error("no such domain: " + domainId); process.exit(2); }

const LIMIT = 96;
const NOT_DOCUMENTED_RE = /^(Not established from the sources consulted|Not applicable)/i;
// Two bullets are the same bullet when they say the same words. Punctuation and
// case drift between a drafter's copy and the stored line often enough that an
// exact compare would append a duplicate of a sentence already there.
const sig = b => String(b).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const verified = JSON.parse(fs.readFileSync(file, "utf8"));
// The gate keeps bullets, not slot numbers, so they are read back from the
// drafters' output when a spec directory is given -- the same fourth-argument
// convention terr-apply.js uses, and the same trap if it is left out.
const slots = {};
if (specDir) {
  for (const f of fs.readdirSync(specDir)) {
    if (!/^done-.*\.json$/.test(f)) continue;
    const spec = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8"));
    for (const [k, v] of Object.entries(spec)) if (v && v.slots) slots[k] = v.slots;
  }
}

const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
const byKey = new Map(rows.map(e => [e.countryCode + "|" + e.unitName, e]));

let added = 0, touched = 0, dupes = 0;
const problems = [], skipped = [];

for (const [key, v] of Object.entries(verified)) {
  const e = byKey.get(key);
  if (!e) { problems.push(`${key}: no entry`); continue; }
  for (const [f, set] of Object.entries((v && v.fields) || {})) {
    if (!domain.fields.some(x => x[0] === f)) { problems.push(`${key}/${f}: no such field`); continue; }
    const prior = String(e[f] || "").trim();
    if (!prior) { skipped.push(`${key}/${f}: empty, use terr-apply.js`); continue; }
    if (NOT_DOCUMENTED_RE.test(prior)) { skipped.push(`${key}/${f}: third state, use terr-apply.js`); continue; }

    const existing = prior.split(NL).map(x => x.trim()).filter(Boolean);
    const have = new Set(existing.map(sig));
    const fresh = [];
    for (const b of set) {
      const t = String(b).trim();
      if (t.length > LIMIT) { problems.push(`${key}/${f}: ${t.length} chars — "${t.slice(0, 50)}…"`); continue; }
      if (/[.!?]$/.test(t) && !/\b[A-Z][a-z]?\.$/.test(t)) { problems.push(`${key}/${f}: ends in a full stop — "${t.slice(0, 50)}…"`); continue; }
      if (have.has(sig(t))) { dupes++; continue; }
      have.add(sig(t)); fresh.push(t);
    }
    if (!fresh.length) continue;

    const merged = existing.concat(fresh);
    // Slots are one integer per bullet and non-decreasing. The new ones are
    // appended, so a redress bullet tagged 4 landing after a bullet tagged 2
    // keeps the sequence honest; a spec that hands back fewer numbers than
    // bullets loses its tags rather than mis-assigning them.
    const specSlots = (slots[key] || {})[f];
    let mergedSlots = null;
    if (Array.isArray(specSlots) && Array.isArray((e.slots || {})[f])) {
      const tail = specSlots.slice(-fresh.length);
      if (tail.length === fresh.length) mergedSlots = e.slots[f].concat(tail);
    }
    if (WRITE) {
      e[f] = merged.join(NL);
      if (mergedSlots) { e.slots = e.slots || {}; e.slots[f] = mergedSlots; }
    }
    added += fresh.length; touched++;
    console.log(`  ${key}/${f}: +${fresh.length} bullet(s)${mergedSlots ? "" : "  (slots not extended)"}`);
    for (const b of fresh) console.log(`      ${b}`);
  }
}

if (dupes) console.log(`${NL}${dupes} bullet(s) already present, left alone`);
for (const s of skipped) console.log("skip: " + s);
for (const p of problems) console.log("REFUSED: " + p);
console.log(`${NL}${domainId}: ${touched} field(s) deepened, ${added} bullet(s) added`);
if (!WRITE) { console.log("  (dry run - pass --write)"); process.exit(0); }
if (problems.length) { console.log("  nothing written: fix the refusals first"); process.exit(1); }
fs.writeFileSync(pathFor(domainId), JSON.stringify(rows, null, 2) + NL);
console.log(`  wrote ${path.basename(pathFor(domainId))}`);
