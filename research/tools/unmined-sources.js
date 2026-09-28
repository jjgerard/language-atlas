// Find entries whose answer is already on the entry, read once for the wrong field.
//
//     node research/tools/unmined-sources.js            # every domain
//     node research/tools/unmined-sources.js eal        # one domain
//     node research/tools/unmined-sources.js eal --cues # show the cue table and stop
//
// WHY THIS EXISTS. Three times in one day a field sat in a gap row while the
// document that answers it was already attached to the same entry, or already
// read and written up two fields away:
//
//   Montana        `newcomerCriteria` held one line about opting out of
//                  statewide assessment, while "Montana English Learner
//                  Identification and Placement Guidance" sat in its docLinks.
//                  That line came FROM that document -- one sentence lifted
//                  from a paragraph three below the identification sequence.
//   North Korea    `newcomerCriteria` recorded both DPRK education laws read
//                  in full with term counts, while `l1Support`, `l2Support`
//                  and `bilingualEducationNotes` still cited only PEER.
//   Barbados       `revitalisation` recorded the Education Act Cap. 41 read
//                  end to end -- "language" three times, all in an offence
//                  clause -- while `standing`, `mediumOfInstruction` and
//                  `taughtAsSubject` cited a conference paper.
//
// All three were caught by hand, by somebody happening to read two fields at
// once. That is not a method. This is.
//
// TWO CHECKS, because the three cases are two different shapes:
//
//   ATTACHED   a docLink on the entry whose TITLE is about a field that is
//              sitting in a gap row. The document is there; nobody opened it
//              for that question. (Montana.)
//   SIBLING    another field on the same entry says an instrument was READ --
//              "read in full", "read end to end", a term count, "0 hits" --
//              and the gap field never mentions that instrument. The reading
//              was done; nobody carried it across. (North Korea, Barbados.)
//
// KNOWN DEFECT, stated rather than hidden: five of the current leads are
// omnibus sources that OMNIBUS should have filtered and does not. The regex
// matches those exact labels when tested on its own, and the filter sits on
// the right line, so something between the two is wrong and is not yet found.
// Five false leads in twenty-two is a tool worth using and worth fixing; read
// past any lead whose document is a PEER profile or a Eurydice volume.
//
// It reports leads, not findings. A cue word in a title is a reason to open a
// document, and nothing more: the tool cannot tell whether the document
// actually answers the question, only that nobody has looked.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));
const { SCHEMES } = require(path.join(ATLAS, "src", "coding"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const SENT = /^Not established from the sources consulted/i;
const NA = /^Not applicable/i;

// WHAT A DOCUMENT TITLE LOOKS LIKE WHEN IT IS ABOUT A FIELD. Hand-built, and
// it has to be: a field's own label and hint are written for a reader of the
// atlas, not for the people who title government documents. Nothing in
// `newcomerCriteria`'s hint says "identification", which is the word Montana's
// document leads with.
const CUES = {
  newcomerCriteria: ["identification and placement", "id-placement", "home language survey", "screener", "intake process", "newly arrived", "newcomer", "entrance criteria", "eligibility criteria", "enrolment of foreign", "admission of pupils"],
  removalCriteria: ["reclassif", "exit criteria", "exit threshold", "discharge criteri", "removal criteri", "transition out"],
  l1Support: ["home language", "mother tongue", "first language", "heritage language", "native language", "interpretation and translation"],
  l2Support: ["as an additional language", "as a second language", "language support", "sheltered instruction", "language preparation"],
  l3Support: ["foreign language requirement", "language exemption"],
  bilingualEducationNotes: ["bilingual education", "dual language", "immersion programme", "immersion program", "intercultural bilingual", "educacion bilingue", "educacion intercultural"],
  achievementGap: ["attainment gap", "achievement gap", "learner outcomes"],
  identificationCriteria: ["identification criteri", "diagnostic criteri", "eligibility criteri", "referral criteri"],
  dischargeCriteria: ["discharge criteri", "exit criteri", "cessation of", "review of provision"],
  assessments: ["assessment battery", "test battery", "screening instrument", "diagnostic instrument"],
  referralPathway: ["referral pathway", "referral process", "waiting time", "waiting list"],
  serviceModel: ["service delivery", "caseload", "model of provision"],
  legalEntitlement: ["entitlement to", "right to education", "statutory duty"],
  funding: ["funding formula", "support grant", "grant guidelines", "budget allocation", "reimbursement"],
  workforce: ["workforce", "staffing", "scope of practice", "professional register", "teacher qualification"],
  terminology: ["terminology", "glossary", "definitions of"],
  outcomesEvidence: ["statistical report", "statistics on", "prevalence of", "national data collection"],
  localTerm: ["terminology", "nomenclature", "designation of languages"],
  standing: ["official language", "language status", "language charter", "recognition of languages"],
  mediumOfInstruction: ["medium of instruction", "language of instruction", "teaching language"],
  taughtAsSubject: ["curriculum framework", "syllabus", "programme of study", "subject curriculum"],
  materials: ["textbook", "orthograph", "teaching material"],
  revitalisation: ["revitalis", "revitaliz", "language promotion", "language plan", "language academy"],
};

// OMNIBUS SOURCES MATCH EVERYTHING AND MEAN NOTHING HERE. A PEER profile, a
// Eurydice volume or the PISA results sit on hundreds of entries and cover
// every field at once, so a cue word inside one of their titles is not
// evidence that a specific document went unread. Without this the check
// reported 222 leads, almost all of them "review" or "report" matching the
// same PEER profile on every entry in the corpus -- a tool that finds
// everything finds nothing.
const OMNIBUS = /(PEER|Profiles Enhancing Education Reviews|Eurydice|OECD|PISA|Key data on|World Bank|GEM Report|UNESCO Institute for Statistics|Constitute Project)/i;

// PHRASES THAT MEAN SOMEBODY OPENED THE DOCUMENT, rather than cited it. The
// distinction is the whole point: "the Education Act provides for X" is a
// citation, possibly relayed; "the Education Act was read end to end and uses
// the word language three times" is a read, and it answers more than one
// question at once.
const READ_MARKERS = [
  /read in full/i, /read end to end/i, /was read\b/i, /have since been read/i,
  /has also been read/i, /returns? (?:no|zero|\d+) occurrence/i, /\b0 hits\b/i,
  /term count/i, /appears? only/i, /returns? \d+\b/i, /searched:/i,
];

// An instrument as a document title usually appears: a capitalised run ending
// in a legal noun, or a short-form citation like "Lei 17/16" or "Cap. 41".
const INSTRUMENT = /\b((?:[A-ZÀ-Þ][\wÀ-ÿ'’.-]*\s+){0,6}(?:Act|Law|Code|Decree|Decreto|Ordinance|Regulations?|Order|Ley|Loi|Lei|Statute|Constitution|Kunngerð|Landsverordening)\b(?:[,\s]+(?:Cap\.|No\.|n\.º|nr\.|No)\s*[\w./-]+)?)/g;

const args = process.argv.slice(2);
if (args.includes("--cues")) {
  for (const [k, v] of Object.entries(CUES)) console.log("  " + k.padEnd(26) + v.join(", "));
  process.exit(0);
}
const only = args.filter(a => !a.startsWith("--"));

const norm = s => String(s || "").toLowerCase();
const gapStateOf = (e, fk) => {
  if (e.absences && e.absences[fk] === true) return null;            // an answer
  const raw = e[fk];
  const t = String(Array.isArray(raw) ? "" : (raw || "")).trim();
  if (Array.isArray(raw) && raw.length) return null;
  if (!t) return "blank";
  if (NA.test(t)) return null;
  if (SENT.test(t)) return "sentinel";
  const c = (e.coding || {})[fk];
  if (!c || (!Array.isArray(c) && !Object.keys(c).length)) return "uncoded";
  return null;                                                       // coded prose
};

const attached = [], sibling = [];

for (const d of DOMAINS) {
  if (only.length && !only.includes(d.id)) continue;
  let file;
  try { file = pathFor(d.id); } catch { continue; }
  if (!fs.existsSync(file)) continue;
  const entries = JSON.parse(fs.readFileSync(file, "utf8"));
  const textFields = d.fields.filter(f => f[2] === "text").map(f => f[0]);

  for (const e of entries) {
    const unit = e.countryCode + "|" + e.unitName;
    const gaps = textFields.filter(fk => gapStateOf(e, fk));
    if (!gaps.length) continue;

    // ---- ATTACHED: a docLink titled for a field that has a gap --------------
    for (const link of (e.docLinks || [])) {
      const label = norm(link.label);
      if (!label || OMNIBUS.test(link.label)) continue;
      for (const fk of gaps) {
        const cues = (CUES[fk] || []).filter(c => label.includes(c));
        if (!cues.length) continue;
        // A cue that also matches a field ALREADY written is weak evidence --
        // that is probably the field the document was fetched for.
        const claimedElsewhere = textFields.some(other =>
          other !== fk && !gapStateOf(e, other) &&
          (CUES[other] || []).some(c => label.includes(c)));
        attached.push({ domain: d.id, unit, field: fk, state: gapStateOf(e, fk), label: link.label, cues, weak: claimedElsewhere });
      }
    }

    // ---- SIBLING: another field records a READ the gap field never mentions -
    for (const src of textFields) {
      if (gapStateOf(e, src)) continue;                    // the source field must be written
      const txt = String(e[src] || "");
      if (!READ_MARKERS.some(p => p.test(txt))) continue;
      const named = [...new Set([...txt.matchAll(INSTRUMENT)].map(m => m[1].trim()))]
        .filter(x => x.length > 6 && x.length < 70);
      if (!named.length) continue;
      for (const fk of gaps) {
        const gapTxt = norm(e[fk]);
        const unseen = named.filter(n => !gapTxt.includes(norm(n).slice(0, 24)));
        if (!unseen.length) continue;
        sibling.push({ domain: d.id, unit, from: src, field: fk, state: gapStateOf(e, fk), instruments: unseen.slice(0, 2) });
      }
    }
  }
}

const strong = attached.filter(a => !a.weak);
console.log("ATTACHED -- a document on the entry is titled for a field that has a gap" + NL);
console.log("  " + strong.length + " strong, " + (attached.length - strong.length) +
  " weak (the title also matches a field already written, so it was probably fetched for that one)" + NL);
for (const a of strong.slice(0, 40)) {
  console.log("  " + (a.domain + " " + a.unit).padEnd(34) + a.field + "  [" + a.state + "]");
  console.log("      matched on " + a.cues.join(", ") + "  ->  " + a.label.slice(0, 96));
}

console.log(NL + NL + "SIBLING -- another field on the same entry records reading an instrument" + NL);
console.log("  " + sibling.length + " lead(s)" + NL);
for (const s of sibling.slice(0, 40)) {
  console.log("  " + (s.domain + " " + s.unit).padEnd(34) + s.field + "  [" + s.state + "]");
  console.log("      " + s.from + " read: " + s.instruments.join("; "));
}

console.log(NL + "  Leads, not findings. A cue word in a title is a reason to open a document.");
