// Replace generic "Not yet documented" notes with what was actually found.
//
//     node stubnote-blocks.js            # dry run
//     node stubnote-blocks.js --write
//
// A stubNote is the third state: someone looked, found nothing, and said where
// they looked. Three sets of entries were carrying a note that did not do that.
//
// 1. Gibraltar and the Isle of Man were telling the reader their policy "sits
//    on the Indigenous and regional languages map" -- which is empty for them
//    too, so the note sent the reader to another blank. What is actually true
//    is narrower and more useful: the two LEGISLATION REGISTERS will not serve
//    documents, so no dated row can carry the verbatim quote hist-verify
//    demands. Both governments' own sites answer normally, so the prose fields
//    are not blocked at all -- only the timeline is.
//
//      legislation.gov.im       403 challenge page      (rechecked 2026-08-28)
//      gibraltarlaws.gov.gi     https accepted, then times out with no bytes
//      gov.im / gibraltar.gov.gi        200
//
// 2. India's 33 states and union territories on the `dld` map were saying "no
//    comparative source covers" them. The real finding is stronger and is
//    recorded in research/parts/inscout-bottomline.md: the question has no
//    state-level source in India and can only be documented nationally. That
//    finding had nowhere to live until stubNote existed.
//
// China's 31 provinces are left alone deliberately. No scouting pass has been
// run on them, so the generic note is the honest one; writing a specific
// reason we have not established would be inventing a finding.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const NL = String.fromCharCode(10);
const write = process.argv.includes("--write");

const IM_NOTE =
  "Not documented here, and the reason is worth stating plainly. The Island's legislation register at legislation.gov.im answers an ordinary request with a 403 challenge page rather than a document, so Manx Acts cannot be retrieved and quoted the way every dated row in this atlas has to be. Rechecked 28 August 2026. Nothing about provision on the Isle of Man has been ruled out here \u2014 it has not been readable. The Government's own site at gov.im does answer, so a contributor with access to the statutes, or to departmental guidance, can fill this in. If you teach, plan or research language provision on the Isle of Man, please add what you know.";

const GI_NOTE =
  "Not documented here, and the reason is worth stating plainly. The Laws of Gibraltar register at gibraltarlaws.gov.gi accepts a connection over HTTPS and then returns nothing at all before timing out, so Gibraltar's Acts cannot be retrieved and quoted the way every dated row in this atlas has to be. Rechecked 28 August 2026. Nothing about provision in Gibraltar has been ruled out here \u2014 the register has not been readable. gibraltar.gov.gi does answer, so a contributor with access to the statutes, or to departmental guidance, can fill this in. If you teach, plan or research language provision in Gibraltar, please add what you know.";

const IN_DLD_NOTE =
  "Not separately documented for this state or union territory \u2014 and on this question that is the finding rather than a gap in the searching. The Rights of Persons with Disabilities Act 2016 defines speech and language disability once, for the whole country. The Rehabilitation Council of India's annual report gives a single national count of audiologists and speech therapists with no breakdown by state. UDISE+ reports enrolment of children with special needs without a breakdown by type of disability, and the state education portals that answered carried no provision policy. What is documented sits on the India entry. If you work in speech and language services here, or study them, please add what you know: a state's own RPwD Rules and its health department pages are the routes that have not been tested.";

// [domain, match(entry) -> bool, note, label]
const PATCHES = [
  ["dld", e => e.countryCode === "IM", IM_NOTE, "Isle of Man"],
  ["eal", e => e.countryCode === "IM", IM_NOTE, "Isle of Man"],
  ["fl", e => e.countryCode === "IM", IM_NOTE, "Isle of Man"],
  ["indigenous", e => e.countryCode === "IM", IM_NOTE, "Isle of Man"],
  ["dld", e => e.countryCode === "GI", GI_NOTE, "Gibraltar"],
  ["eal", e => e.countryCode === "GI", GI_NOTE, "Gibraltar"],
  ["fl", e => e.countryCode === "GI", GI_NOTE, "Gibraltar"],
  ["indigenous", e => e.countryCode === "GI", GI_NOTE, "Gibraltar"],
  ["dld", e => e.countryCode === "IN" && !e.isNational, IN_DLD_NOTE, "India state/UT"],
];

const byDomain = {};
for (const [domain, match, note, label] of PATCHES) {
  (byDomain[domain] = byDomain[domain] || []).push({ match, note, label });
}

let total = 0;
for (const [domain, patches] of Object.entries(byDomain)) {
  const p = path.join(ATLAS, "data", STORE[domain]);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let touched = 0;
  for (const e of rows) {
    for (const { match, note, label } of patches) {
      if (!match(e)) continue;
      if (e.stubNote === note) continue;
      // Never overwrite an entry someone has actually written up.
      if (note === IN_DLD_NOTE && e.policyHistory && e.policyHistory.length) {
        console.log("  SKIP (has rows): " + domain + " " + e.countryCode + "|" + e.unitName);
        continue;
      }
      console.log("  " + domain + "  " + e.countryCode + "|" + e.unitName + "  <- " + label);
      e.stubNote = note;
      touched++;
    }
  }
  total += touched;
  console.log(domain + ": " + touched + " notes rewritten");
  if (write && touched) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
}
console.log((write ? "WROTE " : "DRY RUN ") + total + " stubNotes");
if (!write) console.log("re-run with --write to apply");
