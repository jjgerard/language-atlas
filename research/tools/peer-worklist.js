// What is still empty on each of the 57 dld entries, and which PEER section
// could answer it. Printed as a worklist so drafting is aimed rather than
// read-everything-and-hope.
const fs = require("fs"), path = require("path");
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const PEER = path.join(ATLAS, "research", "peer");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const DLD = DOMAINS.find(d => d.id === "dld");
const CONTENT = DLD.fields.map(f => f[0]).filter(f => f !== "policyHistory");
const filled = v => v == null ? false : Array.isArray(v) ? v.length > 0 : String(v).trim().length > 0;
const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", "dld.json"), "utf8"));
const byCC = new Map(rows.filter(r => r.isNational).map(r => [r.countryCode, r]));

// Which PEER heading bears on which dld question. Nothing is inferred from a
// heading alone — this only says where to look.
const MAP = {
  identificationCriteria: /early identification|identification|screening/i,
  referralPathway: /early identification|screening|learners|support/i,
  legalEntitlement: /laws|constitution|policies|definitions/i,
  funding: /financ|governance/i,
  workforce: /teachers|support personnel/i,
  outcomesEvidence: /monitoring|reporting|data/i,
  dischargeCriteria: /learning environment|support/i,
  multilingualProvision: /curricul|learning environment|language/i,
  assessments: /screening|assessment/i,
};

const out = [];
for (const f of fs.readdirSync(PEER).filter(x => x.endsWith(".md"))) {
  const cc = f.replace(/\.md$/, "");
  const e = byCC.get(cc);
  if (!e) { console.log("  no national dld entry for " + cc); continue; }
  const text = fs.readFileSync(path.join(PEER, f), "utf8");
  const heads = [...text.matchAll(/^## (.+)$/gm)].map(m => m[1].trim());
  const empty = CONTENT.filter(k => !filled(e[k]));
  const reachable = empty.filter(k => MAP[k] && heads.some(h => MAP[k].test(h)));
  out.push({ cc, unit: e.unitName, have: CONTENT.length - empty.length, empty, reachable,
             hist: (e.policyHistory || []).length, heads: heads.length, bytes: text.length });
}
out.sort((a, b) => b.reachable.length - a.reachable.length);

const tally = {};
for (const o of out) for (const k of o.reachable) tally[k] = (tally[k] || 0) + 1;
console.log(out.length + " units. Empty dld fields a PEER section could bear on:\n");
Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => {
  const now = rows.filter(r => filled(r[k])).length;
  console.log("   " + String(n).padStart(2) + " units   " + k.padEnd(23) + now + "/336 now -> up to " + (now + n));
});
console.log("\n   total reachable field-values: " + Object.values(tally).reduce((a, b) => a + b, 0));
console.log("   units with no policyHistory yet: " + out.filter(o => !o.hist).length);
console.log("\nper unit:");
out.forEach(o => console.log("  " + o.cc + " " + o.unit.padEnd(20) + o.have + "/12  reachable: " + o.reachable.join(", ")));
