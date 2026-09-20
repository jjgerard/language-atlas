// Propose an `operation` for each policyHistory row, and abstain when unsure.
//
//     node research/tools/hist-operation.js <domain> [--sample 40] [--emit out.json]
//
// NOT A CODER. research/POLICY-HISTORY-VOCAB.md derived this vocabulary by
// reading, and says outright that the regexes which produced its counts are
// measurement instruments with poor precision: /caps?/ matched "Education Act
// (Cap 262)", and a bare instrument-word probe swallowed a row that describes a
// provision and records no operation at all. So this proposes, prints what it
// proposed, and abstains wherever the row gives it nothing to go on. A proposal
// is a starting point for a reader, never a coding.
//
// PRECEDENCE, not frequency. HISTORY_OPERATION is ordered so the first match
// wins, and the order is deliberate: a row that repeals one act and makes
// another is a REPLACEMENT, so replacement is tested before making, and every
// change-to-an-existing-thing is tested above the creation of a new one.
//
// THE RESIDUAL IS NOT A PROPOSAL. `provision described` takes 48% of the corpus
// and is what a row means when it dates an instrument and says what it
// provides. A proposer that defaulted to it would "code" half the corpus by
// doing nothing, so this tool never proposes it: rows that match no operation
// are returned as abstentions, and a reader decides between `provision
// described` and something the patterns missed.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");
const { HISTORY_OPERATION } = require(path.join(__dirname, "..", "..", "src", "coding.js"));

const [, , domainId, ...rest] = process.argv;
if (!domainId) { console.error("usage: hist-operation.js <domain> [--sample N] [--emit out.json]"); process.exit(2); }
const si = rest.indexOf("--sample");
const SAMPLE = si > -1 ? Number(rest[si + 1]) || 40 : 0;
const ei = rest.indexOf("--emit");
const EMIT = ei > -1 ? rest[ei + 1] : null;

// Ordered to match HISTORY_OPERATION's precedence. Each entry is deliberately
// narrower than the value it proposes, because a miss costs a reader one row
// and a false positive costs the column its meaning.
const RULES = [
  // `replac...` carries no noun requirement. It had one -- act, law, decree and
  // so on within forty characters -- and Andorra's "It replaces the model in
  // force since 2008" fell through it, then matched `instrument made` on the
  // words "in force". A replacement misread as a making is the one error this
  // precedence exists to prevent, so the broad pattern sits first and a false
  // positive here costs less than that miss did.
  ["instrument replaced", /\brepeal(s|ed|ing)?\b|\bsupersed(e|es|ed|ing)\b|\breplac(e|es|ed|ing|ement)\b|\brevok(e|es|ed|ing)\b/i],
  ["instrument amended", /\bamend(s|ed|ing|ment)?\b|\brewrit(e|es|ing)\b|\binserts?\b|\badds?\b.{0,30}\bart(icle)?\b|\bmodif(y|ies|ied|ication)\b/i],
  ["international instrument accepted", /\bratif(y|ies|ied|ication)\b|\baccede(d|s)?\b|\baccession\b|\benters? into force for\b|\bdeclaration under\b/i],
  ["instrument made", /\benact(s|ed|ment)?\b|\bpromulgat(e|ed|es)\b|\badopt(s|ed)\b|\bcomes? into force\b|\bin force\b|\btakes? effect\b|\beffective\b|\bpublished in the .{0,20}gazette\b|\bpass(es|ed)\b.{0,20}\b(act|law)\b/i],
  ["body or programme changed", /\brenam(e|es|ed|ing)\b|\brestructur(e|es|ed|ing)\b|\bmerg(e|es|ed|ing)\b|\bclos(e|es|ed|ing)\b.{0,30}\b(unit|centre|center|programme|program|school)\b|\babolish(es|ed)?\b/i],
  ["body or programme established", /\bestablish(es|ed|ing|ment)?\b|\bcreat(e|es|ed|ing)\b|\bfound(ed|ing)\b|\bset up\b|\bintroduc(e|es|ed)\b.{0,40}\b(elective|subject|course|programme|program)\b|\blaunch(es|ed)\b/i],
  ["funding decided", /\bfunding agreement\b|\$[\d,.]+\s*(million|billion)?\b|€[\d,.]+|\ballocat(e|es|ed)\b.{0,30}\b(million|billion|budget)\b/i],
  ["plan or strategy issued", /\bstrategic plan\b|\bstrategy\b|\baction plan\b|\bproposes?\b|\baims? to\b|\bintends? to\b|\btargets?\b|\brecommendation\b|\bwhite paper\b|\bframework document\b/i],
  ["state of affairs recorded", /\bdoes not\b|\bno specific\b|\bomits\b|\bfound no\b|\bnever uses\b|\bis silent\b|\bno such\b|\bnothing\b/i],
];

const rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
// The SAME normalisation the key was built with -- lowercase, everything that
// is not a letter or digit collapsed to a space -- taken from hist-attr-build.js
// and views.html rather than reinvented. Matching on a whitespace-only
// normalisation found ZERO of the 207 already-coded dld rows, because the stored
// key reads "pre university education act" where the description reads
// "Pre-University Education Act".
const key60 = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 60).trim();
const norm = s => String(s || "").replace(/\s+/g, " ").trim();

const out = [];
let total = 0;
for (const e of rows) {
  const f = e.fields || e;
  const hist = Array.isArray(f.policyHistory) ? f.policyHistory : [];
  const already = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
  const seen = {};
  for (const h of hist) {
    total++;
    const d = norm(h.description);
    const key = norm(h.year) + "|" + key60(d);
    seen[key] = (seen[key] || 0) + 1;
    const coded = already.find(c => String(c.year) === String(h.year)
      && String(c.matches) === key60(d)
      && Number(c.occurrence || 1) === seen[key]);
    let op = null;
    for (const [value, re] of RULES) if (re.test(d)) { op = value; break; }
    out.push({
      cc: e.countryCode, unit: e.unitName, year: String(h.year || ""),
      matches: key60(d), occurrence: seen[key],
      description: d, proposal: op,
      hasOperation: !!(coded && coded.operation),
      hasFields: !!(coded && coded.fields_touched),
    });
  }
}

const tally = {};
for (const r of out) tally[r.proposal || "(abstained)"] = (tally[r.proposal || "(abstained)"] || 0) + 1;
console.log(domainId + ": " + total + " policyHistory rows");
console.log("  already carrying an operation coding: " + out.filter(r => r.hasOperation).length);
console.log("  already carrying fields_touched:      " + out.filter(r => r.hasFields).length);
console.log("");
for (const v of Object.keys(HISTORY_OPERATION)) {
  const n = tally[v] || 0;
  if (n) console.log("  " + v.padEnd(34) + String(n).padStart(5) + ("  " + Math.round(100 * n / total) + "%").padStart(7));
}
const ab = tally["(abstained)"] || 0;
console.log("  " + "(abstained)".padEnd(34) + String(ab).padStart(5) + ("  " + Math.round(100 * ab / total) + "%").padStart(7));
console.log("\n  `provision described` is never proposed — see the header. The abstentions");
console.log("  are where it lives, alongside whatever the patterns missed.");

if (SAMPLE) {
  console.log("\n--- " + SAMPLE + " rows for hand-checking, spread across the corpus ---");
  const step = Math.max(1, Math.floor(out.length / SAMPLE));
  for (let i = 0; i < out.length && i / step < SAMPLE; i += step) {
    const r = out[i];
    console.log("\n  " + (r.proposal || "(abstained)").toUpperCase());
    console.log("    " + r.cc + " " + r.unit + " " + r.year);
    console.log("    " + r.description.slice(0, 150));
  }
}

if (EMIT) {
  fs.writeFileSync(EMIT, JSON.stringify(out, null, 1) + "\n");
  console.log("\nwrote " + out.length + " rows to " + EMIT);
}
