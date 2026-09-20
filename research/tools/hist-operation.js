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
// Batching is by region because that is the unit a reader can check. A domain is
// 600 to 1,100 rows and nobody verifies that in one sitting; a region is 25 to
// 300, and the entries inside one share enough context that a coder stays
// calibrated across them.
const ri = rest.indexOf("--region");
const REGION = ri > -1 ? rest[ri + 1] : null;
const TODO = rest.includes("--todo");

// Ordered to match HISTORY_OPERATION's precedence. Each entry is deliberately
// narrower than the value it proposes, because a miss costs a reader one row
// and a false positive costs the column its meaning.
const RULES = [
  // A PROGRAMME replaced is not an INSTRUMENT replaced. France's "ELCO formally
  // ended, replaced by EILE" and the Netherlands' "OETC replaced by OALT" both
  // matched `instrument replaced` and were both hand-corrected to `body or
  // programme changed`, whose gloss already covers closure. So the programme
  // test runs first, and the instrument pattern now wants an instrument noun --
  // the requirement Andorra's "It replaces the model in force since 2008" broke
  // by falling through to `instrument made`, so the noun list is wide and the
  // lookaround runs in both directions rather than forward only.
  ["body or programme changed", /\b(replac|supersed|abolish|discontinu)\w*\b[\s\S]{0,40}\b(programme|program|scheme|classes|grant|unit|centre|center)\b|\b(programme|program|scheme|classes|grant|OETC|OALT|ELCO|MEAG|Tanoda)\b[\s\S]{0,60}\b(replaced|abolished|discontinued|ended|folded|integrated into)\b|\brenam(e|es|ed|ing)\b|\brestructur(e|es|ed|ing)\b|\bmerg(e|es|ed|ing)\b/i],
  ["instrument replaced", /(\brepeal\w*|\bsupersed\w*|\breplac\w*|\brevok\w*|\bnullif\w*|\bvoid\w*|\bannul\w*)[\s\S]{0,60}\b(act|law|loi|lei|ley|decree|decreto|ordinance|ordonnance|order|code|regulation|statute|circular|model)\b|\b(act|law|loi|lei|ley|decree|decreto|ordinance|ordonnance|order|code|regulation|statute|circular)\b[\s\S]{0,60}(\brepeal\w*|\bsupersed\w*|\breplac\w*|\brevok\w*)/i],
  // A SEPARATE rule because the clause above needs /i for its noun list and this
  // one must not have it: an all-caps acronym is the instrument, and ESSA is the
  // row `instrument replaced` uses as its own gloss example. Two rules carrying
  // one value cost nothing -- first match wins either way -- and the alternative
  // was a single literal that quietly lost the flag.
  ["instrument replaced", /\b[A-Z]{3,6}\b\s+(repeal|supersed|replac|revok)\w*/],
  ["instrument amended", /\bamend\w*\b|\brewrit(e|es|ing)\b|\b(act|law|constitution|code|ordinance|regulation)\b[\s\S]{0,20}\brevis(ed|ion|ions)\b|\binserts?\b|\badds?\b.{0,30}\bart(icle)?\b|\bmodif(y|ies|ied|ication)\b/i],
  ["international instrument accepted", /\bratif(y|ies|ied|ication)\b|\baccede(d|s)?\b|\baccession\b|\benters? into force for\b|\bdeclaration under\b/i],
  // "Strategy ... adopted" is how a strategy is ISSUED, not how an instrument is
  // made. Hungary 2013 and Slovenia 2007 both matched `adopt` here and were
  // hand-corrected to `plan or strategy issued`, so `adopt` now stands down when
  // the row's own subject is a plan, a strategy or a recommendation.
  ["instrument made", /\benact(s|ed|ment)?\b|\bpromulgat(e|ed|es)\b|\bcomes? into force\b|\bin force\b|\btakes? effect\b|\beffective\b|\bpublished in the .{0,20}gazette\b|\bpass(es|ed)\b.{0,20}\b(act|law)\b|^(?![\s\S]*\b(strateg|action plan|plan for|five-year plan|recommendation|neither|never adopt|not adopt)\w*)[\s\S]*\badopt(s|ed)\b/i],
  // EIGHT of the twelve overrides in the first hand-coded region were the old
  // `establish` pattern firing on an abstract object: "establishes the
  // ausserordentlicher Schueler CATEGORY", "the individual educational needs
  // PRINCIPLE", "the state's DUTY", "the RIGHT to preparatory education", "the
  // inclusive-education PRINCIPLE", "entry-assessment PROCEDURES", "the ASL
  // legal FRAMEWORK", "socio-economic index VARIABLES". Every one of them is the
  // residual -- a row that dates an instrument and says what it provides. A
  // thing established has to be a thing that can be walked into or enrolled on,
  // so the verb now needs a body-or-programme noun and the abstractions veto it.
  ["body or programme established", /(\bestablish\w*|\bcreat\w*|\bfound(ed|ing)\b|\bset up\b|\bintroduc\w*|\blaunch\w*)(?![\s\S]{0,40}\b(category|principle|duty|rights?|framework|procedures?|basis|obligation|variables|concept)\b)[\s\S]{0,60}\b(institut\w*|unit|centres?|centers?|academy|academies|commission|council|programme|program|scheme|class|classes|course|courses|school|schools|department|service|network|subjects?|elective|pathway|kindergarten|facilit\w*|advisor|training)\b/i],
  ["funding decided", /\bfunding agreement\b|\$[\d,.]+\s*(million|billion)?\b|€[\d,.]+|£[\d,.]+|\bfunding formula\b|\ballocat(e|es|ed)\b.{0,30}\b(million|billion|budget)\b/i],
  ["plan or strategy issued", /\bstrategic plan\b|\bstrateg(y|ies)\b|\baction plan\b|\bproposes?\b|\baims? to\b|\bintends? to\b|\bpledges?\b|\brecommendations?\b|\bwhite paper\b|\bframework document\b/i],
  ["state of affairs recorded", /\bdoes not\b|\bno specific\b|\bomits\b|\bfound no\b|\bnever uses\b|\bis silent\b|\bno such\b|\bnothing\b|\bnames only\b/i],
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
  if (REGION && (e.region || "") !== REGION) continue;
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

// Every uncoded row in the batch, in full, for a reader to work down. The
// description is NOT truncated here: a proposal is made off the whole sentence
// and has to be checkable against the whole sentence.
if (TODO) {
  const todo = out.filter(r => !r.hasOperation);
  console.log("\n--- " + todo.length + " rows to code"
    + (REGION ? " in " + REGION : "") + " ---");
  let unit = "";
  for (const r of todo) {
    if (r.cc + r.unit !== unit) { unit = r.cc + r.unit; console.log("\n" + r.cc + " " + r.unit); }
    console.log("  [" + r.year + "] " + (r.proposal || "?") + (r.occurrence > 1 ? "  (occ " + r.occurrence + ")" : ""));
    console.log("      " + r.description);
  }
}

if (EMIT) {
  fs.writeFileSync(EMIT, JSON.stringify(out, null, 1) + "\n");
  console.log("\nwrote " + out.length + " rows to " + EMIT);
}
