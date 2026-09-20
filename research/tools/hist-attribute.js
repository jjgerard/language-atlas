// Propose `fields_touched` for policyHistory rows, in tiers, and say which.
//
//     node hist-attribute.js <domain> [--coded-only] [--json <out>]
//
// Three signals tie a dated row to a field of the same entry, and they are NOT
// equally good. The tier is printed on every proposal because a reader has to
// know which ones to check:
//
//   1 sentence   the row's description still sits verbatim in that field's
//                prose. Near-certain, because hist-from-fields.js mined the
//                row OUT of that field -- Andorra's "It replaces the model in
//                force since 2008" is in the history AND in legalEntitlement.
//   2 token      the row and the field cite the same instrument identifier.
//                "Ontario Regulation 181/98 requires every school board to
//                establish an Identification, Placement..." -> identificationCriteria.
//   3 year       the row's year appears in that field's prose. ~75-85% on a
//                15-row hand check, so this tier is a WORKLIST, not an answer.
//
// TYPED FIELDS ARE EXCLUDED FROM TIER 3 and nothing else. A year inside a
// series row is a data point, not a policy event: Spain's Real Decreto
// 217/2022 matched a Eurostat count of English learners and would have been
// filed under `uptake`. Tiers 1 and 2 are safe there because a shared sentence
// or a shared instrument number is not a coincidence.
//
// NOTHING IS PROPOSED FOR A ROW WITH NO SIGNAL. Those print as `read me` and
// stay unset, because a guess here is exactly the inference CLAUDE.md forbids.
// `system-wide` is a real answer and `not determined` is a real answer, but
// both are a person's to give.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const { pathFor } = require("./datafile.js");
const { DOMAINS } = require(path.join(ROOT, "src", "domains.js"));
const { SHAPES } = require(path.join(ROOT, "src", "store.js"));

const args = process.argv.slice(2);
const domainId = args.find(a => !a.startsWith("--")) || "dld";
const codedOnly = args.includes("--coded-only");
const jsonAt = args.indexOf("--json") >= 0 ? args[args.indexOf("--json") + 1] : null;

const list = Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS);
const domain = list.find(d => d.id === domainId);
if (!domain) { console.error("no such domain: " + domainId); process.exit(2); }

const decl = (domain.fields || []).filter(f => (Array.isArray(f) ? f[0] : f.key) !== "policyHistory");
const fkeys = decl.map(f => (Array.isArray(f) ? f[0] : f.key));
const typed = new Set(decl
  .filter(f => SHAPES[(Array.isArray(f) ? f[2] : f.type)])
  .map(f => (Array.isArray(f) ? f[0] : f.key)));

const flat = v => v == null ? ""
  : typeof v === "string" ? v
  : Array.isArray(v) ? v.map(flat).join(" ")
  : typeof v === "object" ? Object.values(v).map(flat).join(" ")
  : String(v);
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const TOK = /\b(?:\d{1,4}\s?\([IVX]+\)\s?\/\s?\d{4}|\d{1,4}\/\d{2,4}|(?:No\.?|Nr\.?|nr)\s?\d{1,4})/g;
const squash = s => String(s).replace(/\s+/g, "").toLowerCase();

/** The key a coding row carries back to the history row it codes. */
const matchKey = desc => norm(desc).slice(0, 60).trim();

// --coded-only keeps the entries that carry BOTH of a map's entry/exit codings,
// because those are the only rows that can enter a cross-tab of the two. The
// pair differs per map and there is no way to infer it from the schemes: dld
// asks who is identified and who is discharged, eal asks who counts as a
// newcomer and what ends the designation.
const CODED_PAIR = {
  dld: ["identificationCriteria", "dischargeCriteria"],
  eal: ["newcomerCriteria", "removalCriteria"],
};
const PAIR = CODED_PAIR[domainId] || [];
if (codedOnly && !PAIR.length) {
  console.error("--coded-only has no criteria pair defined for " + domainId);
  process.exit(2);
}

const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
const out = {};
const tally = { sentence: 0, token: 0, year: 0, read: 0 };

for (const e of rows) {
  const hist = e.policyHistory || [];
  if (!hist.length) continue;
  if (codedOnly) {
    const c = e.coding || {};
    if (!PAIR.every(f => c[f] && Object.keys(c[f]).length)) continue;
  }
  const text = {}, ntext = {};
  for (const k of fkeys) {
    const s = flat(e[k]);
    if (s.trim()) { text[k] = s; ntext[k] = norm(s); }
  }
  const proposals = [];
  console.log("\n=== " + e.countryCode + " " + e.unitName + "  (" + hist.length + " rows)");
  for (const h of hist) {
    const desc = String(h.description || "");
    const nd = norm(desc);
    const year = (String(h.year || "").match(/\d{4}/) || [])[0];

    const sOwn = nd.length >= 45
      ? Object.keys(ntext).filter(k => ntext[k].includes(nd.slice(0, 45))) : [];
    const toks = [...new Set((desc.match(TOK) || []).map(squash))].filter(t => t.length > 3);
    const tOwn = toks.length
      ? Object.keys(text).filter(k => toks.some(t => squash(text[k]).includes(t))) : [];
    const yOwn = year
      ? Object.keys(text).filter(k => !typed.has(k) && text[k].includes(year)) : [];

    let tier = "read me", own = [];
    if (sOwn.length) { tier = "1 sentence"; own = sOwn; tally.sentence++; }
    else if (tOwn.length) { tier = "2 token"; own = tOwn; tally.token++; }
    else if (yOwn.length) { tier = "3 year"; own = yOwn; tally.year++; }
    else tally.read++;

    console.log("  [" + tier.padEnd(10) + "] " + String(h.year).padEnd(5)
      + (own.length ? own.join(" + ") : "-"));
    console.log("               " + desc.slice(0, 120));
    if (own.length) proposals.push({ year: Number(year) || h.year, matches: matchKey(desc), fields_touched: own, _tier: tier });
  }
  if (proposals.length) out[e.countryCode + "|" + e.unitName] = { policyHistory: proposals };
}

const n = tally.sentence + tally.token + tally.year + tally.read;
console.log("\n--- " + domainId + (codedOnly ? ", entries with both codings" : "") + " ---");
console.log("  rows                 " + n);
console.log("  1 sentence           " + tally.sentence);
console.log("  2 token              " + tally.token);
console.log("  3 year (worklist)    " + tally.year);
console.log("  read me (unset)      " + tally.read);

if (jsonAt) {
  fs.writeFileSync(jsonAt, JSON.stringify(out, null, 1) + "\n");
  console.log("\nproposals written to " + jsonAt + " — strip _tier and review tier 3 before applying");
}
