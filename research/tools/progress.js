// How close the atlas is to complete, and how uniform its entries are.
//
//     node progress.js
//
// Two different questions, answered separately because they move independently:
// a map can be 70% filled and still have every entry answering a different
// subset of its questions.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { LIVE } = require(path.join(ATLAS, "src", "domains"));
const { pathFor } = require("./datafile");
const { isNotEstablished, isNotApplicable } = require(path.join(ATLAS, "src", "derive"));
const NL = String.fromCharCode(10);
const content = v => Array.isArray(v) ? v.length > 0
  : !!String(v || "").trim() && !isNotEstablished(v) && !isNotApplicable(v);
const answered = v => Array.isArray(v) ? v.length > 0 : !!String(v || "").trim();

let gFill = 0, gCap = 0, gWhole = 0, gUnits = 0;
console.log("FILL — of the questions each map asks of each country" + NL);
for (const d of LIVE) {
  const rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")).filter(r => r.isNational !== false);
  let fill = 0, cap = 0, whole = 0, none = 0;
  for (const e of rows) {
    let n = 0;
    for (const [k] of d.fields) { cap++; if (content(e[k])) { fill++; n++; } }
    if (n === d.fields.length) whole++;
    if (n === 0) none++;
  }
  gFill += fill; gCap += cap; gWhole += whole; gUnits += rows.length;
  console.log("  " + d.id.padEnd(11) + String(Math.round(100 * fill / cap)).padStart(3) + "%   "
    + String(whole).padStart(3) + " countries complete, " + String(none).padStart(3) + " empty"
    + "   (" + fill + " of " + cap + " answers)");
}
console.log(NL + "  ALL        " + Math.round(100 * gFill / gCap) + "%   "
  + gWhole + " of " + gUnits + " country-entries complete on their map");

// --- uniformity -------------------------------------------------------------
// Every text field's hint lists exactly four questions, answered in order. A
// bullet records WHICH question it answers as a slot number. So uniformity is
// answerable precisely: of the entries that say something, how many say which
// question they are answering, and do they answer the same ones?
console.log(NL + NL + "UNIFORMITY — do filled fields answer the same questions, in order?" + NL);
for (const d of LIVE) {
  const rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")).filter(r => r.isNational !== false);
  const textFields = d.fields.filter(([, , t]) => !t || t === "text").map(([k]) => k);
  let filled = 0, tagged = 0;
  const slotHits = {};      // field -> {1..4: count}
  for (const e of rows) {
    for (const k of textFields) {
      if (!content(e[k])) continue;
      filled++;
      const list = e.slots && e.slots[k];
      if (!Array.isArray(list) || !list.length) continue;
      tagged++;
      slotHits[k] = slotHits[k] || { 1: 0, 2: 0, 3: 0, 4: 0 };
      for (const n of new Set(list)) if (slotHits[k][n] != null) slotHits[k][n]++;
    }
  }
  console.log("  " + d.id.padEnd(11) + String(Math.round(100 * tagged / (filled || 1))).padStart(3)
    + "% of filled text fields say which question each bullet answers  (" + tagged + "/" + filled + ")");
  // Which of the four questions actually get answered, where we can tell.
  for (const k of textFields) {
    const h = slotHits[k]; if (!h) continue;
    const base = Math.max(h[1], h[2], h[3], h[4]) || 1;
    const bar = [1, 2, 3, 4].map(n => String(Math.round(100 * h[n] / base)).padStart(3) + "%").join(" ");
    console.log("      " + k.padEnd(22) + bar + "   (q1 q2 q3 q4, share of the entries that tag this field)");
  }
}
