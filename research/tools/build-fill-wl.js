// Build FILL worklists: research a named set of blank fields on a domain.
//
//     node build-fill-wl.js <domain> <outdir> <batches> <field,...> [Region,...] [--national]
//
// Different from the re-slot builder in one way that matters: a re-slot hands
// the agent the stored text and forbids adding to it, so its worklist carries
// `reslot`. A fill hands the agent an EMPTY field and the entry's existing
// context, so its worklist carries `missing` plus whatever is already written.
//
// The context is not decoration. Every fill pass this project has run went
// faster when the agent started from the entry's own docLinks: the instrument
// that answers one question usually answers the next one a few paragraphs on.
// It also stops an agent contradicting or restating what the entry already
// says, which is the most common way a fill makes an entry worse.
//
// TYPED FIELDS. This used to accept only `text` fields and threw on anything
// else, which meant the two fields most worth filling -- indigenous.languages
// and fl.languagesOffered -- had no builder at all. Two things differ for a
// typed field and both are quiet bugs if missed:
//
//   1. Emptiness. `!e[f]` is FALSE for `[]`, so a unit carrying an empty array
//      counted as filled and was dropped from every worklist silently.
//   2. Echoing. A typed field's existing value is rows, not a string, so it is
//      echoed as JSON. Handing an agent "[object Object]" is worse than
//      handing it nothing.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..") + "/";
const { DOMAINS } = require(ROOT + "src/domains");

const id = process.argv[2];
const outDir = process.argv[3];
const N = Number(process.argv[4] || 12);
const WANT = (process.argv[5] || "").split(",").filter(Boolean);
// Region filter. A wave is usually aimed at one source landscape at a time,
// and without this the caller has to hand-build the list -- which is how a
// wave gets pointed at units that are already answered.
const ONLY = (process.argv[6] || "").split(",").map(x => x.trim()).filter(Boolean)
  .filter(x => !x.startsWith("--"));
// National units only, the same convention gaps.js counts by: a sub-national
// unit inherits its country unless somebody establishes otherwise, so a wave
// aimed at 110 blank countries was being handed 189 items. Off by default,
// because a field like indigenous.mediumOfInstruction is genuinely a
// sub-national question and its worklist should carry them.
const NAT_ONLY = process.argv.slice(2).includes("--national");
if (!id || !outDir || !WANT.length) {
  console.log("usage: node build-fill-wl.js <domain> <outdir> <batches> <field,...>");
  process.exit(1);
}

const d = DOMAINS.find(x => x.id === id);
if (!d) throw new Error("no domain " + id);

const TYPE = Object.fromEntries(d.fields.map(f => [f[0], f[2]]));
const ALL = d.fields.map(f => f[0]);
for (const w of WANT) if (!TYPE[w]) throw new Error("not a field on " + id + ": " + w);

// A field is blank when a text field has no non-space characters, or a typed
// field has no rows. Anything else counts as written and is left alone --
// and "anything else" has to include prose that merely STARTS like a
// sentinel. Czechia's requiredStudy opens "Not statutory: the accreditation
// standards name foreign language only as a medium of study" and Latvia's
// opens "Not universal: only international students". Both are answers. A
// worklist built with a /^Not /i test would have sent an agent to research
// them again.
const blank = (e, f) => TYPE[f] === "text" || !Array.isArray(e[f])
  ? !String(e[f] == null ? "" : e[f]).trim()
  : e[f].length === 0;

let data = null;
for (const p of [ROOT + "data/" + id + ".json", ROOT + "data/" + id + ".seed.json"])
  if (fs.existsSync(p)) { data = JSON.parse(fs.readFileSync(p, "utf8")); break; }
if (!data) throw new Error("no data for " + id);

const items = [];
for (const e of data) {
  if (NAT_ONLY && e.isNational === false) continue;
  if (ONLY.length && !ONLY.includes(e.region)) continue;
  const missing = WANT.filter(f => blank(e, f));
  if (!missing.length) continue;
  const o = {
    key: e.countryCode + "|" + e.unitName,
    cc: e.countryCode, unit: e.unitName,
    region: e.region || "", subregion: e.subregion || "", national: !!e.isNational,
    missing,
    docLinks: (e.docLinks || []).map(l => ({ label: l.label, url: l.url })),
  };
  // Everything already written on the entry, so the agent does not restate it
  // or contradict it. A field in `missing` is never echoed here.
  // Text fields are echoed whole. Typed fields are NOT: a policyHistory can
  // run to dozens of rows, and pasting all of it into every item spends the
  // agent's context on something it was not asked to touch.
  for (const f of ALL) {
    if (missing.includes(f) || blank(e, f) || TYPE[f] !== "text") continue;
    o["existing_" + f] = e[f];
  }
  // The language inventory is context an indigenous drafter needs: how many
  // languages the place has bounds what any claim about provision can mean.
  // Names only, and only when `languages` is not itself what we are asking for.
  if (!missing.includes("languages") && Array.isArray(e.languages) && e.languages.length)
    o.languages = e.languages.map(l => l.name).filter(Boolean).slice(0, 40);
  items.push(o);
}

// Group by region so an agent learns one source landscape rather than five,
// then round-robin within the region so no batch is all thin entries.
const byRegion = {};
for (const it of items) (byRegion[it.region] = byRegion[it.region] || []).push(it);
for (const r of Object.values(byRegion)) r.sort((a, b) => b.docLinks.length - a.docLinks.length);

// Give each region batches in proportion to its share of the blanks.
const total = items.reduce((s, x) => s + x.missing.length, 0);
const regions = Object.entries(byRegion).sort((a, b) =>
  b[1].reduce((s, x) => s + x.missing.length, 0) - a[1].reduce((s, x) => s + x.missing.length, 0));

const batches = [];
for (const [region, list] of regions) {
  const fields = list.reduce((s, x) => s + x.missing.length, 0);
  const want = Math.max(1, Math.round(N * fields / total));
  const sub = Array.from({ length: want }, () => []);
  list.forEach((it, i) => sub[i % want].push(it));
  sub.forEach(b => { if (b.length) batches.push({ region, items: b }); });
}

fs.mkdirSync(outDir, { recursive: true });
let tot = 0;
batches.forEach((b, i) => {
  const n = b.items.reduce((s, x) => s + x.missing.length, 0);
  tot += n;
  const name = "worklist-" + String(i + 1).padStart(2, "0") + ".json";
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(b.items, null, 1) + "\n");
  console.log("  " + name + "  " + b.region.padEnd(10) + b.items.length + " units, " + n + " fields");
});
console.log(id + ": " + items.length + " units, " + tot + " fields over " + batches.length + " batches");
