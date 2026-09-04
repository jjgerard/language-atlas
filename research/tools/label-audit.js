// Find docLinks whose label does not NAME the document.
//
//     node label-audit.js              # report
//     node label-audit.js --json <f>   # write the list for a relabelling pass
//
// A label is the only handle a reader -- and the policy-history matcher -- has
// on a source. "Ministry of Education" tells you who published something and
// nothing about what it is; two such labels on one entry are indistinguishable.
// The matcher fails on them for the same reason: it ties a history row to a
// document by rare shared words, and an organisation name shares none with
// "Decreto 280 phase-in completes".
//
// The first version of this test asked whether the label named a KIND of
// instrument -- act, decree, policy, plan -- and flagged 893 labels, which is
// not a finding, it is a broken test. "New Arrivals Program" and "EAL/D
// Progress Map" carry no instrument word and are the documents' actual names.
// Most sources on this map are not statutes and were never going to be.
//
// So the test asks the question that actually matters to a reader: CAN I TELL
// THESE TWO SOURCES APART? Two failures do real damage:
//
//   * PUBLISHER-ONLY -- the label names who published it and stops. "Ministry
//     of Education" is not a document; an entry citing three of them cites
//     three indistinguishable things.
//   * COLLIDING -- two links on one entry carry the same label. Whatever the
//     label says, it cannot be the handle for both.
//
// Everything else is left alone, because a false accusation here costs a human
// read of a good label.
//
// Nothing is rewritten. The right label is often visible in the URL slug or
// the citing history row, but "often" is not "always", and inventing a
// document name is the same error as inventing a DOI.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { pathFor } = require("./datafile");

// An organisation, in the languages these labels are written in. Used only to
// recognise a label that is NOTHING BUT one of these.
const PUBLISHER = new RegExp("^(?:the\\s+)?(?:[\\w'’.&-]+\\s+){0,4}(?:" + [
  "ministry", "ministère", "ministerio", "ministério", "ministerie", "ministerium",
  "department", "département", "departamento", "dept\\.?",
  "government", "gouvernement", "gobierno", "governo", "govern",
  "agency", "authority", "commission", "council", "board", "bureau", "office",
  "institute", "institut", "instituto", "university", "universit[éàa]",
  "unesco", "unicef", "oecd", "ocde", "world bank", "european commission",
  "eurydice", "eurypedia", "council of europe",
].join("|") + ")(?:\\s+[\\w'’.&-]+){0,6}$", "i");

// A label that is a placeholder rather than a name.
const PLACEHOLDER = /^(?:pdf|doc|docx|link|url|source|website|web ?site|home ?page|official (?:site|page|website)|report|document|profile|overview|page|site|n\/a|untitled)\.?$/i;

// Words that name a kind of document rather than a publisher. Kept for the
// publisher test only: a label carrying one of these is a title, however it
// begins, so "Ministry of Education Language Policy 2019" is not publisher-only.
const NAMES_A_DOC = new RegExp([
  // English
  "\\bact\\b", "\\blaw\\b", "\\bbill\\b", "constitution", "decree", "ordinance",
  "regulation", "statute", "\\bcode\\b", "\\border\\b", "notification", "circular",
  "policy", "\\bplan\\b", "framework", "strategy", "curriculum", "syllabus",
  "report", "review", "guidelines?", "standards?", "charter", "convention",
  "resolution", "directive", "white paper", "green paper", "memorandum",
  "agreement", "treaty", "amendment", "schedule", "\\bs\\.\\s?\\d", "article",
  "chapter", "section", "handbook", "prospectus", "calendar", "gazette",
  // Romance
  "\\bley\\b", "\\bloi\\b", "\\blei\\b", "\\blegge\\b", "decreto", "décret",
  "arrêté", "ordonnance", "constituci", "constitui", "costituzione", "règlement",
  "reglamento", "circulaire", "programme", "plano", "\\bplan de\\b",
  // Germanic / Dutch / Nordic
  "gesetz", "verordnung", "erlass", "\\bwet\\b", "besluit", "landsverordening",
  "landsbesluit", "\\blov\\b", "\\blag\\b", "forskrift", "föreskrift",
  // other
  "\\bzakon\\b", "ustawa", "rozporz", "törvény", "\\bnr\\.?\\s?\\d", "no\\.?\\s?\\d",
  "\\bcap\\b", "\\bvkm\\b", "\\bp\\.b\\.", "\\brsnwt\\b", "\\bs\\.n\\.w\\.t\\b",
].join("|"), "i");

const YEAR = /(?:1[6-9]|20)\d{2}/;

const out = {};
let links = 0, weak = 0;
const tally = { "publisher-only": 0, colliding: 0, placeholder: 0 };
for (const d of DOMAINS) {
  let rows;
  try { rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")); } catch { continue; }
  for (const e of rows) {
    // Collisions are judged within one entry, because that is the only place a
    // label has to be unique: two entries may both cite "Education Act 1998".
    const seen = new Map();
    for (const l of e.docLinks || []) {
      if (!l || !l.label) continue;
      const k = String(l.label).trim().toLowerCase();
      seen.set(k, (seen.get(k) || 0) + 1);
    }
    for (const l of e.docLinks || []) {
      if (!l || !l.label || !l.url) continue;
      links++;
      const label = String(l.label);
      const why = PLACEHOLDER.test(label.trim()) ? "placeholder"
        : (!YEAR.test(label) && !NAMES_A_DOC.test(label) && PUBLISHER.test(label.trim())) ? "publisher-only"
        : seen.get(label.trim().toLowerCase()) > 1 ? "colliding"
        : null;
      if (!why) continue;
      weak++; tally[why]++;
      const key = d.id + " " + e.countryCode + "|" + e.unitName;
      (out[key] = out[key] || []).push({
        why,
        label,
        url: l.url,
        // The two places the real name is most often already written down.
        slug: decodeURIComponent(String(l.url).split("?")[0].split("/").filter(Boolean).pop() || ""),
        citedBy: (e.policyHistory || [])
          .filter(r => r && r.description)
          .map(r => r.year + ": " + r.description)
          .slice(0, 4),
      });
    }
  }
}

const at = process.argv.indexOf("--json");
if (at >= 0 && process.argv[at + 1]) {
  fs.writeFileSync(process.argv[at + 1], JSON.stringify(out, null, 1) + NL);
  console.log("wrote " + process.argv[at + 1]);
}
console.log(weak + " of " + links + " labels cannot serve as a handle, on " +
            Object.keys(out).length + " entries");
console.log("  " + Object.entries(tally).map(([k, v]) => v + " " + k).join(", ") + NL);
for (const [k, list] of Object.entries(out).slice(0, 24)) {
  console.log(k);
  for (const c of list)
    console.log("   [" + c.why.padEnd(14) + "] " + c.label.slice(0, 52).padEnd(52) + "  slug: " + c.slug.slice(0, 44));
}
