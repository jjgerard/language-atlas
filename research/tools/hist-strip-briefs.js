// Cut researcher briefs out of policyHistory descriptions.
//
//     node hist-strip-briefs.js            # dry run, prints every change
//     node hist-strip-briefs.js --write
//
// Seventeen fl rows carry a legitimate dated clause with an entire drafting
// brief concatenated onto it: "Revised SPN21 framework published, setting core,
// general and optional subjects with their media of instruction NOT ESTABLISHED
// - DO NOT PUBLISH: - Teaching hours or timetable share..." followed by several
// hundred words of what the researcher could not retrieve, dead URLs included.
//
// Those notes are the researcher talking to the editor. They were never meant
// to reach a reader, they say so themselves, and they are on the live site.
//
// The fix is a cut, not a deletion: everything before the marker is a real
// dated event that traces to the entry's docLinks in the ordinary way, so the
// row stays and only the note goes. A trailing bracketed aside is cut too --
// "[CAUTION: the 2025 year comes from the PDF's embedded creation date...]" is
// the same kind of note wearing different punctuation. Whatever a cut leaves
// behind is printed in full, because a truncated sentence would be worse than
// the brief was.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const NL = String.fromCharCode(10);
const MARKERS = ["NOT ESTABLISHED", "WHAT I TRIED AND COULD NOT GET", "DO NOT PUBLISH", "NOTES ON WHAT"];

const write = process.argv.includes("--write");
let cut = 0;

for (const [domain, file] of Object.entries(STORE)) {
  const p = path.join(ATLAS, "data", file);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let touched = 0;

  for (const e of rows) {
    for (const h of e.policyHistory || []) {
      const d = String(h.description);
      let at = -1;
      for (const m of MARKERS) {
        const i = d.indexOf(m);
        if (i >= 0 && (at < 0 || i < at)) at = i;
      }
      if (at < 0) continue;

      let kept = d.slice(0, at).trim();

      // A trailing bracketed aside is the same kind of note.
      const ob = kept.lastIndexOf("[");
      if (ob >= 0 && kept.indexOf("]", ob) === kept.length - 1) kept = kept.slice(0, ob).trim();

      // Tidy a dangling separator left by the cut.
      while (kept.length && ",;:-".indexOf(kept[kept.length - 1]) >= 0) kept = kept.slice(0, -1).trim();

      console.log("  [" + domain + "] " + e.unitName + " " + h.year + "   " + d.length + " -> " + kept.length + " chars");
      console.log("      kept: " + kept);
      if (kept.length < 20) console.log("      ^^ SHORT - read this one before writing");
      h.description = kept;
      cut++; touched++;
    }
  }
  if (write && touched) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
}

console.log(NL + cut + " descriptions " + (write ? "cut" : "would be cut"));
if (!write) console.log("  (dry run - pass --write)");
