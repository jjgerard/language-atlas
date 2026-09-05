// Where the maps are still empty, by region and by field.
//
//     node gaps.js                 # every map, by region
//     node gaps.js fl              # one map, field by field
//     node gaps.js fl teacherSupply Africa,Asia 8    # a fill worklist
//
// This exists because the same question keeps being asked and kept being
// answered by a script written from scratch each time: "north america and
// europe are very well filled in but the rest of the world isn't -- what are
// the fields that the former has that the latter is missing". The per-region
// view answers it directly.
//
// A field counts as FILLED only if it holds content. The not-established
// sentinel and the not-applicable marker are both deliberate answers, and both
// are worth recording, but neither is something a fill wave should be sent to
// find again -- so they count as filled here for the purpose of "what is left
// to do", which is what this report is for. Sub-national units are excluded:
// they inherit their country, so counting them would report the same gap twice
// and would make a country with many regions look emptier than one without.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { LIVE } = require(path.join(ATLAS, "src", "domains"));
const { pathFor } = require("./datafile");
const { isNotEstablished, isNotApplicable } = require(path.join(ATLAS, "src", "derive"));

const answered = v => Array.isArray(v) ? v.length > 0 : !!String(v || "").trim();
// Content, as opposed to a recorded absence. A worklist wants this one.
const content = v => Array.isArray(v) ? v.length > 0
  : !!String(v || "").trim() && !isNotEstablished(v) && !isNotApplicable(v);

// Units a researcher has already worked and found nothing for. They still
// count as MISSING in the coverage figures, because they are -- but a worklist
// that keeps reoffering them spends an agent rediscovering that Botswana's
// only university has no linguistics degree. Six of the nine units on one
// freshly generated list had been searched and reported empty the same day.
const NL = String.fromCharCode(10);
let EMPTY = {};
try { EMPTY = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "SEARCHED-EMPTY.json"), "utf8")); }
catch { /* the ledger is optional */ }

const [domId, field, regionArg, sizeArg] = process.argv.slice(2);
const load = d => JSON.parse(fs.readFileSync(pathFor(d.id), "utf8"))
  .filter(r => r.isNational !== false);

// --- a worklist: one field, batched, for handing to researchers ---
if (domId && field) {
  const d = LIVE.find(x => x.id === domId);
  if (!d) { console.log("no such map: " + domId); process.exit(1); }
  if (!d.fields.some(([k]) => k === field)) {
    console.log(domId + " has no field " + field);
    console.log("  fields: " + d.fields.map(([k]) => k).join(", "));
    process.exit(1);
  }
  const regions = regionArg && regionArg !== "all" ? regionArg.split(",") : null;
  const size = Number(sizeArg || 8);
  const searched = EMPTY[domId + "." + field] || {};
  const all = load(d).filter(e => !content(e[field]) && (!regions || regions.includes(e.region)));
  const miss = all.filter(e => !searched[e.countryCode + "|" + e.unitName]);
  console.log(domId + "." + field + ": " + miss.length + " countries"
    + (regions ? " in " + regions.join(", ") : "") + ", in batches of " + size
    + (all.length > miss.length ? "  (" + (all.length - miss.length)
        + " skipped: already searched and empty)" : ""));
  for (let i = 0; i < miss.length; i += size)
    console.log("  " + String(i / size + 1).padStart(2, "0") + "  " +
      miss.slice(i, i + size).map(e => e.countryCode + "|" + e.unitName).join(", "));
  process.exit(0);
}

// --- one map, field by field, with where the holes are ---
if (domId) {
  const d = LIVE.find(x => x.id === domId);
  if (!d) { console.log("no such map: " + domId); process.exit(1); }
  const nat = load(d);
  console.log(d.id + " -- " + d.label + "  (" + nat.length + " countries)" + NL);
  for (const [k, label] of d.fields) {
    const miss = nat.filter(e => !content(e[k]));
    const byR = {};
    for (const e of miss) byR[e.region || "?"] = (byR[e.region || "?"] || 0) + 1;
    console.log("  " + k.padEnd(22) + String(nat.length - miss.length).padStart(3) + " filled  " +
      String(miss.length).padStart(3) + " missing   " +
      Object.entries(byR).sort((a, b) => b[1] - a[1]).map(([r, n]) => r + " " + n).join("  "));
  }
  process.exit(0);
}

// --- every map, by region, emptiest first ---
for (const d of LIVE) {
  const nat = load(d);
  const byR = {};
  for (const e of nat) {
    const r = e.region || "(none)";
    byR[r] = byR[r] || { n: 0, filled: 0, said: 0, cap: 0 };
    byR[r].n++;
    for (const [k] of d.fields) {
      byR[r].cap++;
      if (content(e[k])) byR[r].filled++;
      else if (answered(e[k])) byR[r].said++;   // looked, and recorded nothing
    }
  }
  console.log(NL + d.id.padEnd(11) + d.fields.length + " fields  " + nat.length + " countries");
  for (const [r, s] of Object.entries(byR).sort((a, b) => a[1].filled / a[1].cap - b[1].filled / b[1].cap))
    console.log("   " + r.padEnd(12) + String(s.n).padStart(3) + " countries   " +
      String(Math.round(100 * s.filled / s.cap)).padStart(3) + "% filled" +
      (s.said ? "   (" + s.said + " field(s) recorded as not established)" : ""));
}
