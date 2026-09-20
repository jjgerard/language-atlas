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
// THE BIGGEST RECURRING DEFECT, and it needed the row rather than the text.
// "Constitution of Barbados, amended 2007" on a 1966 row, "Compulsory Education
// Act, amended 2014" on a 1965 row, "Bantu Education Act ... repealed in 1979"
// on a 1953 row: in each the operation is dated somewhere other than here, and
// the row's own business is what the instrument says. The earlier fix was a
// regex for the punctuation these happen to use, which could not tell Laos
// 2003's "amended in 2003" or Mauritius 2016's "last amended, by Act 18 of
// 2016" from the rest. Comparing the year does, and it is the actual rule.
const datedElsewhere = (d, h) => {
  const year = String(h.year || "").match(/\d{4}/);
  const re = /\b(amended|revised|repealed|replaced|superseded|substituted|in force)[^.;]{0,30}?\b(\d{4})\b/gi;
  let m, found = false;
  while ((m = re.exec(d))) { if (!year || m[2] !== year[0]) found = true; }
  return found;
};

// A plan word marks `plan or strategy issued` only when the row records the
// document coming into being, or states its purpose in the verbs the gloss
// names -- PROPOSES, AIMS, INTENDS, TARGETS. When the verb is about CONTENT,
// the row is describing what the document says and belongs to the residual:
//
//   Jordan 2018   "SEN in the 2018-22 Education Strategic Plan MEANS visual,
//                  hearing or learning disabilities"
//   Laos 2011     "The 2011-15 National Strategy PROVIDES an operational
//                  DEFINITION of inclusive education"
//   Uzbekistan    "ACCORDING TO the 2019-23 education sector plan, THERE ARE
//    2019          188 special preschool institutions"
//
// And a plan VERB inside an instrument is not a plan either: Iran 1988's "Law
// on Goals and Duties of the Ministry of Education AIMS TO eliminate prejudice"
// is a law stating its own object. That one needs an AND-NOT -- an instrument
// subject and no plan noun anywhere -- which is why this is a function.
const describesAPlan = d =>
  /\b(means|refers to|defines|according to|there are|states that)\b|\bprovides an? [a-z]+ definition\b/i.test(d)
  || /^\s*\d{1,3}(?![\d-])/.test(d)
  || (/^[^.;]{0,60}\b(law|act|decree|ordinance|constitution)\b/i.test(d)
      && !/\b(plan|plans|strateg[a-z]*|policy|policies|framework|agenda|concept|recommendation[s]?|white paper)\b/i.test(d));

const RULES = [
  // A PROGRAMME replaced is not an INSTRUMENT replaced. France's "ELCO formally
  // ended, replaced by EILE" and the Netherlands' "OETC replaced by OALT" both
  // matched `instrument replaced` and were both hand-corrected to `body or
  // programme changed`, whose gloss already covers closure. So the programme
  // test runs first, and the instrument pattern now wants an instrument noun --
  // the requirement Andorra's "It replaces the model in force since 2008" broke
  // by falling through to `instrument made`, so the noun list is wide and the
  // lookaround runs in both directions rather than forward only.
  ["body or programme changed", /\b(replac|supersed|abolish|discontinu)\w*\b[\s\S]{0,40}\b(programmes?|programs?|schemes?|classes|grants?|units?|centres?|centers?|services?)\b|\b(programmes?|programs?|schemes?|classes|grants?|OETC|OALT|ELCO|MEAG|Tanoda)\b[\s\S]{0,60}\b(replaced|abolished|discontinued|ended|folded|integrated into)\b/i,
   // Only what the hoist was for. Everything else this value covers sits at its
   // declared precedence further down, so an amendment beats a rename.
   /\bconsolidat\w*|\bmerg\w*[\s\S]{0,40}\bamendments?\b/i],
  ["instrument replaced", /(\brepeal\w*|\bsupersed\w*|\breplac\w*|\brevok\w*|\bnullif\w*|\bvoid\w*|\bannul\w*)[\s\S]{0,60}\b(act|law|loi|lei|ley|decree|decreto|ordinance|ordonnance|order|code|regulation|statute|circular|chapters?|subchapters?|sections?|subsections?|regulations?|rules?|model)\b|\b(act|law|loi|lei|ley|decree|decreto|ordinance|ordonnance|order|code|regulation|statute|circular|sections?|subsections?)\b[\s\S]{0,60}(\brepeal\w*|\bsupersed\w*|\breplac\w*|\brevok\w*)/i,
   // South Africa 1953: "Bantu Education Act reinforces apartheid through
   // segregated schooling, REPEALED IN 1979". The repeal is real and is not this
   // row's business; the row says what the Act did.
   (d, h) => datedElsewhere(d, h) || /\bamend\w*\b[\s\S]{0,60}\b(replac|repeal)/i.test(d)],
  // A SEPARATE rule because the clause above needs /i for its noun list and this
  // one must not have it: an all-caps acronym is the instrument, and ESSA is the
  // row `instrument replaced` uses as its own gloss example. Two rules carrying
  // one value cost nothing -- first match wins either way -- and the alternative
  // was a single literal that quietly lost the flag.
  ["instrument replaced", /\b[A-Z]{3,6}\b\s+(repeal|supersed|replac|revok)\w*/],
  ["instrument amended", /\bamend\w*\b|\brewrit\w*\b|\b(act|law|constitution|code|ordinances?|regulations?|guidelines|guidance|policy|policies|rules|manual|chart|document|edition|plan)\b[\s\S]{0,20}\brevis(ed|ion|ions)\b|\binsert\w*|\badds?\b.{0,30}\bart(icle)?\b|\bmodif(y|ies|ied|ication)\b/i,
   // A parenthetical or appositive amendment DATE is not an amendment: it dates
   // the instrument the row describes. Four UNESCO PEER rows read "Constitution
   // of Barbados, AMENDED 2007; does not enshrine the right to education" or
   // "Constitution Art. 27 (AS AMENDED 2001) gives a right", and are dated
   // decades before the amendment. Kuwait 1965 in the Asia batch is the same
   // shape and its coding is corrected alongside this. Laos 2003's "amended IN
   // 2003" is untouched: the word `in` marks a year that is the row's own.
   (d, h) => datedElsewhere(d, h) || /\bbeg(an|in|ins|un)\s+amend|\bamended since\b/i.test(d)],
  ["international instrument accepted", /\bratif(y|ies|ied|ication)\b|\baccede(d|s)?\b|\baccession\b|\benters? into force for\b|\bdeclaration under\b/i,
   // Ratification DENIED is not ratification. Eritrea 1997 reads "Even if Eritrea
   // has NOT RATIFIED the Convention Against Discrimination in Education", which
   // is a dated record that nothing was accepted.
   /\b(not|never|yet to|failed to)\s+(been\s+)?(ratif|accede|sign)|\bahead of\b[\s\S]{0,25}\b(accession|ratification)\b/i],
  // "Strategy ... adopted" is how a strategy is ISSUED, not how an instrument is
  // made. Hungary 2013 and Slovenia 2007 both matched `adopt` here and were
  // hand-corrected to `plan or strategy issued`, so `adopt` now stands down when
  // the row's own subject is a plan, a strategy or a recommendation.
  ["instrument made", /\benact(s|ed|ment)?\b|\bpromulgat(e|ed|es)\b|\bcomes? into force\b|\bin force\b|\b(takes?|took) effect\b|\beffective\b|\bpublished in the .{0,20}gazette\b|\bpass(es|ed)\b.{0,20}\b(act|law)\b|\b(act|law)s?\b.{0,30}\bpass(es|ed)\b|^(?![\s\S]*\b(strateg|recommendation|neither|never adopt|not adopt)\w*|[\s\S]*plan\w*)[\s\S]*\badopt(s|ed)\b/i,
   // Two refusals. A PARENTHESISED "(in force 2019)" dates the instrument the
   // row describes -- Canada's "Education Act s 17 carries the
   // language-of-instruction power (in force 2019)" -- while China's unbracketed
   // "enacted, in force 1995-09-01" is a real making and must survive. And a row
   // that says outright the enactment is NOT VERIFIED is the one row in the
   // corpus that forbids this value in its own text.
   (d, h) => datedElsewhere(d, h) || /\bnot verified\b|\bbefore the\b[\s\S]{0,40}\badopt|\bunder which\b|\bamended since\b/i.test(d)],
  // Renaming, restructuring, merging and closing, at the precedence
  // HISTORY_OPERATION declares for them: below every operation on an instrument.
  // Nunavut's "Inuit Language Protection Act RENAMED the Inuktut Protection Act"
  // is the gloss's own example and still lands here, because nothing above it
  // matches a bare rename.
  ["body or programme changed", /\brenam(e|es|ed|ing)\b|\brestructur(e|es|ed|ing)\b|\bmerg(e|es|ed|ing)\b|\babolish(es|ed)?\b|\bclos(e|es|ed|ing)\b[\s\S]{0,30}\b(units?|centres?|centers?|programmes?|programs?|schools?)\b/i,
   // Nunavut's "Inuit Language Protection ACT renamed the Inuktut Protection Act"
   // is this value's own gloss example, so a bare rename stays here. A renamed
   // DOCUMENT does not: Oklahoma's "HB 2768 adds dysgraphia to the required
   // dyslexia awareness training and RENAMES THE STATE DYSLEXIA HANDBOOK" is an
   // amendment, and nothing above this rule caught it.
   /\brenam\w*[\s\S]{0,40}\b(handbooks?|manuals?|guides?|toolkits?|regulations?|codes?|charts?|documents?|categor(y|ies)|classification)\b/i],
  // EIGHT of the twelve overrides in the first hand-coded region were the old
  // `establish` pattern firing on an abstract object: "establishes the
  // ausserordentlicher Schueler CATEGORY", "the individual educational needs
  // PRINCIPLE", "the state's DUTY", "the RIGHT to preparatory education", "the
  // inclusive-education PRINCIPLE", "entry-assessment PROCEDURES", "the ASL
  // legal FRAMEWORK", "socio-economic index VARIABLES". Every one of them is the
  // residual -- a row that dates an instrument and says what it provides. A
  // thing established has to be a thing that can be walked into or enrolled on,
  // so the verb now needs a body-or-programme noun and the abstractions veto it.
  ["body or programme established", /(\bestablish\w*|\bcreat\w*|\bfound(ed|ing)\b|\bset up\b|\bintroduc\w*|\blaunch\w*)(?![\s\S]{0,40}\b(category|principle|duty|rights?|framework|procedures?|basis|obligation|variables|concept|test|education|schooling)\b)[\s\S]{0,60}\b(institut\w*|unit|centres?|centers?|academy|academies|commission|council|programmes?|programs?|scheme|class|classes|committee|office|initiative|course|courses|school|schools|department|service|network|subjects?|elective|pathway|kindergarten|facilit\w*|advisor|training|groups?|task forces?|index|indexes|indices)\b/i,
   /\b(requires?|requiring|makes?|obliges?|obliging|directs?|shall|must|will ensure|ensures?|ensuring)\b[\s\S]{0,60}\b(establishw*|maintain|creatw*|set up|provide|provision of)/i],
  ["funding decided", /\bfunding agreement\b|\$[\d,.]+\s*(million|billion)?\b|€[\d,.]+|£[\d,.]+|\bfunding formula\b|\ballocat(e|es|ed)\b.{0,30}\b(million|billion|budget)\b/i],
  ["plan or strategy issued", /\b(strategic|sector|master|implementation) plan\b|\bstrateg(y|ies)\b|\baction plan\b|\bproposes?\b|\baims? to\b|\bintends? to\b|\bpledges?\b|\brecommendations?\b|\bwhite paper\b|\bframework document\b/i,
   // Beginning to develop a plan is not issuing one. Dominica 2020, "Ministry of
   // Education BEGAN DEVELOPING a new education sector plan", started matching
   // only once `sector plan` was added to the pattern above.
   // Estonia 2018 "sets the PROCEDURE FOR external counselling team
   // RECOMMENDATIONS on support services" and Great Britain 2002, the
   // "Education (Disability STRATEGIES and Pupils' Educational Records)
   // (Scotland) Act 2002", both carry a plan word as ordinary content: one
   // inside the thing a regulation regulates, one inside an Act's own title.
   d => /\bbeg(an|in|ins|un)\s+develop|\bper the\b[\s\S]{0,30}\bplan\b|\b(procedure|rules|process) for\b[\s\S]{0,40}\brecommendations?\b|\([^)]*[Ss]trateg|\b(prepare|prepares|preparing|require|requires|requiring)\b[\s\S]{0,40}\bplans?\b/i.test(d) || describesAPlan(d) || /\b(include|includes|including|use|uses|using)\b[\s\S]{0,30}\bstrategies\b/i.test(d)],
  ["state of affairs recorded", /\bdoes not\b|\bno specific\b|\bomits\b|\bfound no\b|\bnever uses\b|\bis silent\b|\bno such\b|\bnothing\b|\bnames only\b|\bbut not\b|\bneither\b/i],
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
    for (const [value, re, veto] of RULES)
      if (re.test(d) && !(veto && (typeof veto === "function"
        ? veto(d, h) : veto.test(d)))) { op = value; break; }
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
