// Which institutions teach a given language, and at what level.
//
//     node where-taught.js              # every language, by how many places teach it
//     node where-taught.js Quechua      # where one language can be studied
//     node where-taught.js Quechua --degree     # only rows that are a degree
//     node where-taught.js Quechua --level bachelor
//
// A LEVEL IS NOT ALWAYS A DEGREE, and the difference decides whether an answer
// is any use. 129 of the 1,071 rows carry a level that is not bachelor, master
// or doctorate: 48 say `module`, 47 `degree`, 16 `certificate`, 12 `diploma`
// and 6 `minor`. Every one of them is honest -- a language taught as a module
// inside somebody else's degree is a real thing a source stated, and `degree`
// is what you write when the source says a degree exists without naming the
// cycle -- but "where can I read for a degree in Quechua" and "where is Quechua
// taught at all" are different questions, and running them together answers
// neither. So the levels are grouped rather than cleaned: nothing is rewritten
// in the data, and the query says which it wants.
//
// This is the query `he.offerings` exists to answer, and the reason that field
// is TYPED rather than prose. `degreeSubjects` says the same things in
// sentences -- "French and Spanish may be taken singly, jointly, or with
// Management Studies" -- which reads well and cannot be searched: there is no
// way to ask it for every institution teaching Quechua without reading all 153
// entries. A row carrying {language, level, institution, url} can be asked.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { pathFor } = require("./datafile");
const NL = String.fromCharCode(10);

// Levels that name a degree cycle, and the ones that name something smaller.
// `degree` sits in the first group without naming a cycle, which is why the
// group exists at all rather than a simple three-way test.
const DEGREE_LEVELS = new Set(["bachelor", "master", "doctorate", "degree"]);
const SUB_DEGREE = new Set(["module", "certificate", "diploma", "minor"]);

const argv = process.argv.slice(2);
let onlyDegree = false, onlyLevel = "";
const words = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--degree") { onlyDegree = true; continue; }
  if (a === "--level") { onlyLevel = String(argv[++i] || "").toLowerCase(); continue; }
  words.push(a);
}
const want = words.join(" ").trim().toLowerCase();
const levelOk = r => {
  const l = String(r.level || "").toLowerCase();
  if (onlyLevel) return l === onlyLevel;
  if (onlyDegree) return DEGREE_LEVELS.has(l);
  return true;
};
const rows = JSON.parse(fs.readFileSync(pathFor("he"), "utf8"));

const all = [];
for (const e of rows) {
  for (const r of (e.offerings || [])) {
    all.push({
      language: String(r.language || ""), level: String(r.level || ""),
      institution: String(r.institution || ""), url: String(r.url || ""),
      year: String(r.year || ""), cc: e.countryCode, unit: e.unitName,
      institutions: String(r.institutions || ""),
    });
  }
}

const shown = all.filter(levelOk);
if (onlyLevel || onlyDegree) {
  console.log(shown.length + " of " + all.length + " rows match "
    + (onlyLevel ? "level " + onlyLevel : "a degree-level row") + NL);
}

if (!want) {
  const by = {};
  for (const r of shown) {
    const k = r.language || "(unnamed)";
    by[k] = by[k] || { places: new Set(), countries: new Set(), levels: new Set() };
    by[k].places.add(r.institution || ("count:" + r.cc));
    by[k].countries.add(r.cc);
    if (r.level) by[k].levels.add(r.level);
  }
  const list = Object.entries(by).sort((a, b) => b[1].countries.size - a[1].countries.size || b[1].places.size - a[1].places.size);
  console.log(shown.length + " offering rows, " + list.length + " distinct languages" + NL);
  console.log("language".padEnd(28) + "countries  institutions  degree levels / below");
  for (const [lang, st] of list.slice(0, 30)) {
    const lv = [...st.levels].sort();
    const deg = lv.filter(l => DEGREE_LEVELS.has(l));
    const sub = lv.filter(l => SUB_DEGREE.has(l));
    const other = lv.filter(l => !DEGREE_LEVELS.has(l) && !SUB_DEGREE.has(l));
    console.log("  " + lang.padEnd(26) + String(st.countries.size).padStart(6)
      + String(st.places.size).padStart(13) + "   " + (deg.join(",") || "-")
      + (sub.length ? "  / " + sub.join(",") : "")
      + (other.length ? "  / ? " + other.join(",") : ""));
  }
  if (list.length > 30) console.log("  ... and " + (list.length - 30) + " more languages");
  console.log(NL + "  node where-taught.js <language>   for one language");
  process.exit(0);
}

const hits = shown.filter(r => r.language.toLowerCase().includes(want));
if (!hits.length) {
  // Say WHICH of the two possible nothings this is. A language taught only as
  // a module reads as "not taught anywhere" under --degree, and that is a
  // different fact from no row naming it at all.
  const anyLevel = all.filter(r => r.language.toLowerCase().includes(want));
  if (anyLevel.length) {
    console.log("No " + (onlyLevel || "degree") + " row names a language matching \"" + want + "\", but "
      + anyLevel.length + " row(s) do at another level: "
      + [...new Set(anyLevel.map(r => r.level || "?"))].sort().join(", "));
  } else {
    console.log("No offering row names a language matching \"" + want + "\".");
  }
  process.exit(0);
}
const byCountry = {};
for (const r of hits) (byCountry[r.cc + " " + r.unit] = byCountry[r.cc + " " + r.unit] || []).push(r);
console.log(hits.length + " row(s) across " + Object.keys(byCountry).length + " countries" + NL);
for (const [c, list] of Object.entries(byCountry).sort()) {
  console.log(c);
  for (const r of list.sort((a, b) => a.level.localeCompare(b.level)))
    console.log("   " + (r.level || "?").padEnd(10) + (r.institution || (r.institutions + " institutions"))
      + (r.year ? "  (" + r.year + ")" : ""));
}
