// Turn language NAMES into atlas `languages` rows, ready to paste.
//
//     node rows.js "Welsh" "Guaraní" "Inuktitut (Salluit)"
//
// Prints JSON in exactly the shape the indigenous map stores. Anything
// ambiguous is refused rather than guessed: a name WALS does not carry comes
// back with an empty `wals`, which the panel renders without a link, and a name
// matching several WALS records is listed so a human picks the right one.
const { find, describe } = require("./wals");

const SHORTEN = t => t
  .replace(/^Order of Subject, Object and Verb: /, "Word order ")
  .replace(/^Order of Adjective and Noun: /, "")
  .replace(/^Prefixing vs\. Suffixing in Inflectional Morphology: /, "")
  .replace(/^Tone: /, "");

const out = [], notes = [];
for (const q of process.argv.slice(2)) {
  const hits = find(q);
  if (!hits.length) {
    out.push({ name: q, wals: "", iso: "", family: "", genus: "", typology: "" });
    // A NAME MISS IS NOT AN ABSENCE. WALS names languages its own way, and this
    // tool was wrong about two well-known cases before anyone checked:
    // "Scottish Gaelic" is in WALS as "Gaelic (Scots)", and "Tamazight" is
    // there as "Berber (Middle Atlas)" carrying ISO tzm, which IS Central
    // Atlas Tamazight's code. Both were reported as having no record.
    // So: before accepting an empty row, look the language up by its ISO 639-3
    // code, which is stable where names are not.
    notes.push(`${q}: no match ON THAT NAME. WALS names things its own way, so this may still be in WALS.`);
    notes.push(`    Try its ISO 639-3 code: node rows.js <iso>. "Scottish Gaelic" is "Gaelic (Scots)"; "Tamazight" is "Berber (Middle Atlas)".`);
    notes.push(`    Only leave the row unlinked once the ISO lookup also fails.`);
    continue;
  }
  // _codePathOnly is excluded from "exact" on purpose: a three-letter query
  // that matched a WALS code while nothing in WALS carries it as an ISO code
  // may be an entirely different language. Tlicho (iso dgr) returned Dagur.
  const exact = hits.filter(h => !h._partial && !h._collision && !h._codePathOnly);
  if (exact.length === 1) {
    const d = describe(exact[0]);
    out.push({
      name: d.name, wals: d.wals, iso: d.iso,
      family: [d.family, d.subfamily].filter(Boolean).join(" > "),
      genus: d.genus,
      typology: d.typology.map(SHORTEN).join("; "),
    });
    if (!d.typology.length) notes.push(`${q}: in WALS but with none of the four features coded — row written with an empty typology, which is honest.`);
    continue;
  }
  if (hits.length === 1 && hits[0]._codePathOnly) {
    out.push({ name: q, wals: "", iso: "", family: "", genus: "", typology: "" });
    const d = describe(hits[0]);
    notes.push(`${q}: matched WALS CODE ${q}, which is "${d.name}" (${[d.family, d.genus].filter(Boolean).join(" > ")}).`);
    notes.push(`    Nothing in WALS carries ${q} as an ISO code, so this is probably NOT your language.`);
    notes.push(`    Row written UNLINKED. If "${d.name}" really is the language you meant, re-run with that name.`);
    continue;
  }
  notes.push(`${q}: ${hits.length} candidates, NOT written. Pick one and re-run with its exact WALS name:`);
  hits.slice(0, 8).forEach(h => {
    const d = describe(h);
    notes.push(`    ${d.name}  [wals ${d.wals}, iso ${d.iso || "-"}]  ${[d.family, d.genus].filter(Boolean).join(" > ")}${d.collision ? "  (" + d.collision + ")" : ""}`);
  });
}
console.log(JSON.stringify(out, null, 1));
if (notes.length) { console.log("\n// NOTES"); notes.forEach(n => console.log("// " + n)); }
