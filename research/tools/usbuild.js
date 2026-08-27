// Wave 2 builder: the US-state cluster, same harvest discipline as wave 1.
//
// Two agents write `usharvest-<slug>.md` (the fl pair) and one writes
// `usharvest2-<slug>.md` (the eal fields and dld.serviceModel), because both
// sets cover some of the same states and neither may overwrite the other.
const fs = require("fs");
const path = require("path");
const { build } = require("./parseparts");

const PARTS = path.join(__dirname, "..", "parts");
const FRESH_MS = 90 * 1000;
const now = Date.now();
const skipped = [];
const settled = f => {
  const age = now - fs.statSync(path.join(PARTS, f)).mtimeMs;
  if (age < FRESH_MS) { skipped.push(f + " (" + Math.round(age / 1000) + "s ago)"); return false; }
  return true;
};

const DOMAIN_OF = {
  terminology: "dld", serviceModel: "dld",
  languagesOffered: "fl", primaryRequirement: "fl", regionalMinorityLanguages: "fl", upperSecondary: "fl",
  l1Support: "eal", newcomerCriteria: "eal", bilingualEducationNotes: "eal", l2Support: "eal",
};

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const STORE = { fl: "fl.seed.json", dld: "dld.json", eal: "eal.json" };
const live = {};
for (const [d, f] of Object.entries(STORE)) {
  live[d] = new Map();
  for (const r of JSON.parse(fs.readFileSync(path.join(ATLAS, "data", f), "utf8")))
    live[d].set(r.countryCode + "|" + r.unitName, r);
}
const alreadyFilled = (d, key, field) => {
  const r = live[d] && live[d].get(key);
  if (!r) return false;
  const v = r[field];
  return Array.isArray(v) ? v.length > 0 : String(v || "").trim().length > 0;
};

const work = JSON.parse(fs.readFileSync(path.join(__dirname, "uswork.json"), "utf8"));
const slug = s => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const bySlug = {};
for (const w of work) bySlug[slug(w.unit.split("|")[1])] = w;

const raw = build(/^usharvest2?-[a-z-]+\.md$/, f => {
  if (!settled(f)) return null;
  const s = f.replace(/^usharvest2?-|\.md$/g, "");
  const w = bySlug[s];
  if (!w) return null;
  return { domain: "MIXED", key: w.unit, confidence: "official-document" };
});
raw.problems = raw.problems.filter(p => !skipped.some(x => p.startsWith(x.split(" ")[0])));
// policyHistory is not written in this pass, so its parse complaints must not
// block the fields that ARE being written. One of them is an agent doing the
// right thing: Palau's row carries `year: null` because the source names the
// Handicapped Children Act without a year, and the agent declined to invent
// one. That is the behaviour the brief asks for, not a defect.
const deferredHistory = raw.problems.filter(p => /policyHistory/.test(p));
raw.problems = raw.problems.filter(p => !/policyHistory/.test(p));

const spec = { fl: {}, dld: {}, eal: {} };
let dropped = 0, already = 0;
for (const [key, entry] of Object.entries(raw.spec.MIXED || {})) {
  const w = bySlug[slug(key.split("|")[1])];
  const wanted = w ? w.gaps : {};
  for (const [field, bullets] of Object.entries(entry.fields)) {
    const d = DOMAIN_OF[field];
    if (!d) { dropped++; continue; }
    if (!(wanted[d] || []).includes(field)) { dropped++; continue; }
    if (alreadyFilled(d, key, field)) { already++; continue; }
    spec[d][key] = spec[d][key] || { confidence: "official-document", fields: {}, addDocLinks: entry.addDocLinks };
    spec[d][key].fields[field] = bullets;
  }
  // policyHistory deferred for the same reason as wave 1: these evidence files
  // mix statutes across topics, and routing a row to the wrong map is worse
  // than a thin timeline. The rows stay on disk.
}
for (const d of Object.keys(spec))
  for (const [k, e] of Object.entries(spec[d])) if (!Object.keys(e.fields).length) delete spec[d][k];

const over = [];
for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d]))
  for (const [f, arr] of Object.entries(e.fields)) {
    if (arr.length > 5) over.push(`${k}/${f}: ${arr.length} bullets`);
    for (const b of arr) if (b.length > 96) over.push(`${k}/${f}: ${b.length} chars — "${b.slice(0, 55)}"`);
  }

module.exports = { spec, problems: raw.problems, deferredHistory, skipped, dropped, already, over, files: raw.files };

if (require.main === module) {
  let f = 0, b = 0; const u = new Set();
  for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d])) {
    u.add(k); f += Object.keys(e.fields).length;
    for (const x of Object.values(e.fields)) b += x.length;
  }
  console.log(`${u.size} units, ${f} fields, ${b} bullets`);
  for (const d of Object.keys(spec)) console.log(`  ${d}: ${Object.keys(spec[d]).length} entries`);
  console.log(`skipped mid-write: ${skipped.length}`); skipped.forEach(x => console.log("  " + x));
  console.log(`dropped not-requested: ${dropped} | already filled: ${already}`);
  console.log(`problems: ${raw.problems.length}`); raw.problems.forEach(p => console.log("  " + p));
  console.log(`deferred-history notes: ${deferredHistory.length}`); deferredHistory.forEach(p => console.log("  " + p));
  console.log(`over limit: ${over.length}`); over.forEach(o => console.log("  " + o));
}
