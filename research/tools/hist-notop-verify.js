// Prove that adding `not_an_operation` moved nothing else.
//
//     node research/tools/hist-notop-verify.js snapshot <file>
//     node research/tools/hist-notop-verify.js compare  <file>
//
// coding-verify.js proves no key OUTSIDE `coding` moved, which is the usual
// worry. This pass rewrites 772 policyHistory coding cells to add 78 values, so
// the worry here is the opposite one: a settled `operation` or `fields_touched`
// silently changing inside `coding`. That is what this compares.
const fs = require("fs");
const { pathFor } = require("./datafile.js");
const DOMAINS = ["eal", "dld", "indigenous", "fl", "he"];

const snap = () => {
  const out = {};
  for (const d of DOMAINS)
    for (const e of JSON.parse(fs.readFileSync(pathFor(d), "utf8"))) {
      const arr = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
      for (const r of arr) {
        const k = d + "|" + e.countryCode + "|" + e.unitName + "|" + r.year + "|" + r.matches + "|" + (r.occurrence || 1);
        out[k] = { operation: r.operation || "", fields_touched: JSON.stringify(r.fields_touched || null) };
      }
    }
  return out;
};

const [, , mode, file] = process.argv;
if (mode === "snapshot") {
  const s = snap();
  fs.writeFileSync(file, JSON.stringify(s));
  console.log("snapshot: " + Object.keys(s).length + " coded rows across " + DOMAINS.length + " domains");
} else {
  const before = JSON.parse(fs.readFileSync(file, "utf8")), after = snap();
  let moved = 0, gone = 0, added = 0;
  for (const k of Object.keys(before)) {
    if (!after[k]) { gone++; console.log("  GONE  " + k); continue; }
    for (const c of ["operation", "fields_touched"])
      if (before[k][c] !== after[k][c]) { moved++; console.log("  MOVED " + c + " " + k + "\n    " + before[k][c] + " -> " + after[k][c]); }
  }
  for (const k of Object.keys(after)) if (!before[k]) added++;
  console.log("before " + Object.keys(before).length + " rows, after " + Object.keys(after).length + " rows");
  console.log(moved + " moved, " + gone + " disappeared, " + added + " newly coded");
  process.exit(moved || gone ? 1 : 0);
}
