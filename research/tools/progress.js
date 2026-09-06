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

// --- depth ------------------------------------------------------------------
// The first version of this measured how many filled fields TAGGED their
// bullets, and reported 85% for `he`. That number was answering the wrong
// question. Tagging says a field records WHICH of its four questions each
// bullet answers; it says nothing about how many it answers. Of the 126 `he`
// text fields carrying only one or two bullets -- the "BAs in Arabic and in
// English Literature at UAE University" kind, which names a language and stops
// -- 103 were TAGGED, and so sat inside that 85%.
//
// So depth is measured directly: how many bullets a filled field carries, and,
// where it is tagged, how many of the four questions it actually reaches. A
// field answering one of four is thin whether or not it says so.
console.log(NL + NL + "DEPTH — how much a filled field actually says" + NL);
for (const d of LIVE) {
  const rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")).filter(r => r.isNational !== false);
  const textFields = d.fields.filter(([, , t]) => !t || t === "text").map(([k]) => k);
  let filled = 0, thin = 0, tagged = 0, full = 0;
  for (const e of rows) for (const k of textFields) {
    if (!content(e[k])) continue;
    filled++;
    if (String(e[k]).split(NL).filter(Boolean).length <= 2) thin++;
    const sl = e.slots && e.slots[k];
    if (Array.isArray(sl) && sl.length) { tagged++; if (new Set(sl).size === 4) full++; }
  }
  if (!filled) continue;
  console.log("  " + d.id.padEnd(11)
    + String(Math.round(100 * thin / filled)).padStart(3) + "% thin (1-2 bullets)   "
    + String(Math.round(100 * tagged / filled)).padStart(3) + "% tagged   "
    + (tagged ? String(Math.round(100 * full / tagged)).padStart(3) + "% of tagged answer all four" : "")
    + "   (" + filled + " filled)");
}

// --- typed rows -------------------------------------------------------------
// A row field has its own thinness. `offerings` exists to answer WHICH
// institutions teach a language, and its own hint says a row with no year is
// worth less than no row -- so the share of rows carrying one is the measure
// that matters, not the row count.
console.log(NL + NL + "TYPED ROWS — what the rows carry" + NL);
for (const d of LIVE) {
  const rowFields = d.fields.filter(([, , t]) => t === "offering" || t === "programme").map(([k]) => k);
  if (!rowFields.length) continue;
  const rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")).filter(r => r.isNational !== false);
  for (const k of rowFields) {
    let tot = 0, y = 0, u = 0;
    for (const e of rows) for (const r of (e[k] || [])) { tot++; if (String(r.year || "").trim()) y++; if (String(r.url || "").trim()) u++; }
    if (!tot) continue;
    console.log("  " + (d.id + "." + k).padEnd(24) + String(tot).padStart(4) + " rows   "
      + String(Math.round(100 * y / tot)).padStart(3) + "% dated   "
      + String(Math.round(100 * u / tot)).padStart(3) + "% linked");
  }
}
