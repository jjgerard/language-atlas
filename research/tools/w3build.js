// Wave 3 builder. Same discipline as waves 1 and 2:
//   * a file still being written by a running agent is skipped, not read half
//   * a field the worklist did not ask for is dropped
//   * a field an earlier pass already filled is dropped, checked against the
//     LIVE store rather than the planning snapshot
//   * policyHistory is collected but not written, pending its own pass
const fs = require("fs"), path = require("path");
const { build } = require("./parseparts");
const { map } = require("./w3map");

const PARTS = path.join(__dirname, "reports", "parts");
const FRESH_MS = 90 * 1000, now = Date.now();
const skipped = [];
const settled = f => {
  const age = now - fs.statSync(path.join(PARTS, f)).mtimeMs;
  if (age < FRESH_MS) { skipped.push(`${f} (${Math.round(age / 1000)}s ago)`); return false; }
  return true;
};

const DOMAIN_OF = {
  terminology: "dld", serviceModel: "dld",
  primaryRequirement: "fl", languagesOffered: "fl", upperSecondary: "fl",
  l1Support: "eal", l2Support: "eal", bilingualEducationNotes: "eal", newcomerCriteria: "eal",
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

const wanted = {};
for (const w of JSON.parse(fs.readFileSync(path.join(__dirname, "wave3.json"), "utf8"))) wanted[w.unit] = w.gaps;

const raw = build(/^w3-.+\.md$/, f => {
  if (!settled(f)) return null;
  const m = map[f];
  if (!m) return null;
  return { domain: "MIXED", key: m.key, confidence: "official-document" };
});
raw.problems = raw.problems.filter(p => !skipped.some(x => p.startsWith(x.split(" ")[0])));
const deferredHistory = raw.problems.filter(p => /policyHistory/.test(p));
raw.problems = raw.problems.filter(p => !/policyHistory/.test(p));

const spec = { fl: {}, dld: {}, eal: {} };
let dropped = 0, already = 0, notAsked = 0;
for (const [key, entry] of Object.entries(raw.spec.MIXED || {})) {
  const gaps = wanted[key] || {};
  for (const [field, bullets] of Object.entries(entry.fields)) {
    const d = DOMAIN_OF[field];
    if (!d) { dropped++; continue; }
    if (!(gaps[d] || []).includes(field)) { notAsked++; continue; }
    if (alreadyFilled(d, key, field)) { already++; continue; }
    spec[d][key] = spec[d][key] || { confidence: "official-document", fields: {}, addDocLinks: entry.addDocLinks };
    spec[d][key].fields[field] = bullets;
  }
}
for (const d of Object.keys(spec))
  for (const [k, e] of Object.entries(spec[d])) if (!Object.keys(e.fields).length) delete spec[d][k];

const over = [];
for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d]))
  for (const [f, arr] of Object.entries(e.fields)) {
    if (arr.length > 5) over.push(`${k}/${f}: ${arr.length} bullets`);
    for (const b of arr) if (b.length > 96) over.push(`${k}/${f}: ${b.length} chars — "${b.slice(0, 55)}"`);
  }

module.exports = { spec, problems: raw.problems, deferredHistory, skipped, dropped, already, notAsked, over };
if (require.main === module) {
  let f = 0, b = 0; const u = new Set();
  for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d])) {
    u.add(k); f += Object.keys(e.fields).length;
    for (const x of Object.values(e.fields)) b += x.length;
  }
  console.log(`${u.size} units, ${f} fields, ${b} bullets`);
  for (const d of Object.keys(spec)) console.log(`  ${d}: ${Object.keys(spec[d]).length} entries`);
  console.log(`skipped mid-write ${skipped.length} | unknown field ${dropped} | not asked ${notAsked} | already filled ${already}`);
  console.log(`problems ${raw.problems.length}`); raw.problems.slice(0, 10).forEach(p => console.log("  " + p));
  console.log(`over limit ${over.length}`); over.slice(0, 12).forEach(o => console.log("  " + o));
}
