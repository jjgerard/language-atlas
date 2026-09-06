// Write a verified re-slotting onto entries that already have text.
//
//     node reslot-apply.js <domain> <reslot-verified.json>            # dry run
//     node reslot-apply.js <domain> <reslot-verified.json> --write
//
// Every other apply in this repo REFUSES to overwrite a field that already has
// text, and that refusal has saved real work -- it is why Laos, Timor-Leste,
// Guam and three CNMI fields were not clobbered by a batch aimed at the wrong
// units. This is the one operation that must overwrite, so it is a separate
// tool rather than a flag on the others, and it buys the right with two
// conditions the ordinary applies do not have to meet.
//
// FIRST, reslot-verify must have passed the field: no word, number or quoted
// phrase that was not already in the stored text, and no hedge dropped.
//
// SECOND, and this is what makes it safe to run over hundreds of entries at
// once: the spec carries `reslotOf`, the exact stored text the new bullets were
// derived from, and a field is written ONLY if what is stored right now is
// still character-for-character that text. If anything changed while the pass
// was running -- an approval, another batch, a hand edit -- the field is
// skipped and reported. A re-slot can therefore never silently overwrite
// somebody's newer work, only the text it actually read.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const FILES = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const NL = String.fromCharCode(10);

const domain = process.argv[2];
const file = process.argv[3];
const write = process.argv.includes("--write");
if (!domain || !file || !FILES[domain]) {
  console.log("usage: node reslot-apply.js <domain> <reslot-verified.json> [--write]");
  process.exit(1);
}

const verified = JSON.parse(fs.readFileSync(file, "utf8"));
const p = path.join(ATLAS, "data", FILES[domain]);
const rows = JSON.parse(fs.readFileSync(p, "utf8"));
const store = new Map(rows.map(e => [e.countryCode + "|" + e.unitName, e]));

let changed = 0, skipped = 0, units = 0, before = 0, after = 0;
let slotted = 0;
for (const [key, s] of Object.entries(verified)) {
  const e = store.get(key);
  if (!e) { console.log("  not on the map: " + key); skipped++; continue; }
  let touched = 0;
  for (const [field, bullets] of Object.entries(s.fields || {})) {
    const expected = (s.reslotOf || {})[field];
    if (expected === undefined) { console.log("  " + key + "/" + field + ": no reslotOf, refusing"); skipped++; continue; }
    if (String(e[field] || "") !== expected) {
      console.log("  " + key + "/" + field + ": stored text has changed since it was read, skipping");
      skipped++;
      continue;
    }
    const nb = String(expected).split(NL).filter(Boolean).length;
    before += nb;
    after += bullets.length;
    if (write) {
      e[field] = bullets.join(NL);
      // Record WHICH question each bullet answers, alongside the reordering
      // itself. A re-slot that leaves no slot list has done the work and not
      // written it down -- the bullets come out in the right order and nothing
      // on the entry says so, which is why the first pass's 285 entries still
      // measure as untagged in progress.js.
      const sl = (s.slots || {})[field];
      if (Array.isArray(sl) && sl.length === bullets.length) {
        e.slots = e.slots || {};
        e.slots[field] = sl.map(Number);
        slotted++;
      }
    }
    changed++;
    touched++;
  }
  if (touched) units++;
}

if (write && changed) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
console.log(NL + (write ? "WROTE " : "DRY RUN ") + changed + " field(s) on " + units + " unit(s), " +
  skipped + " skipped");
console.log("bullets: " + before + " -> " + after + (before ? "  (" + (after - before) + ")" : ""));
console.log("slot lists written: " + slotted);
if (!write) console.log("re-run with --write to apply");
