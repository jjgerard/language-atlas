// Which third-state sentinels are the SAME SENTENCE on several units.
//
//     node research/tools/sentinel-dupes.js
//
// The map key counts one sentinel per entry and a reader counts them as one
// investigation each. They are not always. A drafting pass can emit the same
// sentence for every unit it could not settle, and the row then reports a
// template as though it were ten separate searches -- which inflates the only
// number anyone uses to decide whether a wave is worth running.
//
// Found while triaging 142 sentinels: ten dld.multilingualProvision entries
// are byte-identical apart from the unit name, and their shared sentence
// describes the FIELD ("whether any service, clinical guideline or funder
// requires ... was not determined") rather than recording a search.
//
// A repeated sentinel is not necessarily wrong -- ten systems can genuinely
// share a finding -- but it is one act of research, and it should be read and
// re-costed as one.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));
const { SCHEMES } = require(path.join(ATLAS, "src", "coding"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const SENT = /^Not established from the sources consulted/i;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const groups = {};
let total = 0;
for (const d of DOMAINS) {
  let file;
  try { file = pathFor(d.id); } catch { continue; }
  if (!fs.existsSync(file)) continue;
  const entries = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const [fk] of d.fields) {
    if (!SCHEMES[d.id + "." + fk]) continue;
    for (const e of entries) {
      if (e.absences && e.absences[fk] === true) continue;
      const t = String(Array.isArray(e[fk]) ? "" : (e[fk] || "")).trim();
      if (!SENT.test(t)) continue;
      total++;
      // Blank the unit's own name so "no rule was found for Malta" and the
      // same sentence about Portugal collapse together.
      const norm = t.replace(new RegExp(esc(e.unitName), "gi"), "<UNIT>")
        .replace(/\s+/g, " ").trim().toLowerCase();
      (groups[norm] = groups[norm] || []).push({
        field: d.id + "." + fk, unit: e.countryCode + "|" + e.unitName, len: t.length,
      });
    }
  }
}

const dup = Object.entries(groups).filter(([, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

console.log("SENTINELS THAT ARE THE SAME SENTENCE ON SEVERAL UNITS" + NL);
let counted = 0;
for (const [norm, v] of dup) {
  counted += v.length;
  const fields = [...new Set(v.map(x => x.field))];
  console.log("  " + String(v.length).padStart(2) + " units  " + fields.join(", ") + "  (" + v[0].len + " chars)");
  console.log("      " + v.map(x => x.unit).join(", "));
  console.log("      \"" + norm.slice(0, 200) + (norm.length > 200 ? "..." : "") + "\"" + NL);
}
console.log("  " + counted + " of " + total + " sentinels are one of " + dup.length + " repeated texts.");
console.log("  Distinct investigations: " + (total - counted + dup.length) + ", not " + total + ".");
