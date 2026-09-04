// Entries that TALK ABOUT languages without naming any.
//
//     node lang-unnamed.js               # report
//     node lang-unnamed.js --json <file> # write a research worklist
//
// The companion to lang-from-prose.js, and the harder half. That tool lifts a
// language name out of an entry's own prose, adding no claim, because the name
// was already asserted and already sourced. These are the entries where that
// finds nothing -- not because nobody looked, but because the prose refers to
// the set instead of listing it:
//
//   Niger        "Loi 2001-037 proclaims ten national languages by name"
//   New Caledonia "langues kanak - the term used by the Accord de Noumea"
//   Saint Kitts  "The Language Policy calls it the dialect"
//
// Every one of those sentences is correct, sourced and useless to a reader who
// wants to click a language. The names exist; they are in the instrument the
// entry already cites, one document away.
//
// This does NOT propose names. Writing out Niger's ten from general knowledge
// would put ten unsourced claims on the map, which is the one thing the repo
// forbids. It produces a worklist: the unit, the sentence that refers to the
// unnamed set, and the entry's own docLinks -- because the answer is usually
// in a document already listed there.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { pathFor } = require("./datafile");

// Phrases that refer to a SET of languages without naming its members. A
// count, a collective label, or a demonstrative standing in for a name.
const UNNAMED = new RegExp([
  "\\b(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|" +
    "fourteen|fifteen|sixteen|twenty|thirty|forty|fifty|\\d{1,3})\\s+" +
    "(?:\\w+\\s+){0,2}(?:languages|langues|lenguas|línguas|idiomas|dialects)",
  "\\b(?:the\\s+)?(?:national|indigenous|native|local|regional|minority|community|" +
    "vernacular|heritage|tribal|aboriginal|ancestral|mother)\\s+" +
    "(?:languages|tongues|langues|lenguas)",
  "\\blangues\\s+(?:kanak|vernaculaires|nationales|locales|maternelles)",
  "\\bthe\\s+(?:dialect|vernacular|creole|patois|local\\s+variety)\\b",
  "\\b(?:several|various|numerous|many)\\s+(?:varieties|languages|dialects)",
].join("|"), "i");

// Fields whose prose is about the languages themselves. A sentence in a
// funding field saying "support for national languages" is not a missed name.
//
// `inventory` is deliberately NOT here. It holds "Glottolog counts 43 living
// languages for this country", which matches the count pattern on every entry
// that has one and names nothing BY DESIGN -- it is a corpus total, not a
// policy set. Including it made 20 of the first 65 hits pure noise.
const LOOK_IN = ["localTerm", "standing", "mediumOfInstruction", "taughtAsSubject",
                 "revitalisation", "speakers"];

// A line that already contains a language name is not an unnamed set; it is a
// case for lang-from-prose.js, which proposes names an entry already asserts.
// Bosnia's "Bosnian, Croatian and Serbian are all three state languages"
// matched the collective pattern and names all three in the same breath.
function knownNames() {
  const names = new Set();
  const parse = (file, pick) => {
    let text;
    try { text = fs.readFileSync(path.join(__dirname, "wals", file), "utf8"); } catch { return; }
    for (const line of text.split(NL).slice(1)) {
      const n = pick(line);
      if (n && n.length >= 4) names.add(n.toLowerCase());
    }
  };
  // Only the Name column is needed, and it is quoted only when it holds a
  // comma, so a full CSV parse is more machinery than the test justifies.
  parse("glottolog.csv", l => (l.match(/^[^,]*,"?([^",]+)"?,/) || [])[1]);
  parse("languages.csv", l => (l.match(/^[^,]*,"?([^",]+)"?,/) || [])[1]);
  return names;
}
const NAMES = knownNames();
const namesOne = line => (line.match(/\b[A-Z][\p{L}'’-]{3,}/gu) || [])
  .some(w => NAMES.has(w.toLowerCase()));

const d = DOMAINS.find(x => x.id === "indigenous");
const TEXT = new Set(d.fields.filter(f => f[2] === "text").map(f => f[0]));
const rows = JSON.parse(fs.readFileSync(pathFor("indigenous"), "utf8"));

const out = {};
for (const e of rows) {
  if (Array.isArray(e.languages) && e.languages.length) continue;
  const hits = [];
  for (const k of LOOK_IN) {
    if (!TEXT.has(k)) continue;
    const text = String(e[k] || "");
    if (!text.trim()) continue;
    // A sentinel field asserts nothing about the place; the set it names is
    // the set that was looked for and not found.
    if (/^Not established|^Not applicable/i.test(text.trim())) continue;
    for (const line of text.split(NL)) {
      if (UNNAMED.test(line) && !namesOne(line)) hits.push({ field: k, sentence: line.trim() });
    }
  }
  if (!hits.length) continue;
  out[e.countryCode + "|" + e.unitName] = {
    cc: e.countryCode,
    unit: e.unitName,
    region: e.region || "",
    unnamed: hits.slice(0, 6),
    docLinks: (e.docLinks || []).map(l => ({ label: l.label, url: l.url })),
  };
}

const at = process.argv.indexOf("--json");
if (at >= 0 && process.argv[at + 1]) {
  fs.writeFileSync(process.argv[at + 1], JSON.stringify(out, null, 1) + NL);
  console.log("wrote " + process.argv[at + 1]);
}
const keys = Object.keys(out);
console.log(keys.length + " units refer to languages they do not name" + NL);
for (const k of keys.slice(0, 20))
  console.log(k.padEnd(34) + out[k].unnamed.length + "  " + out[k].unnamed[0].sentence.slice(0, 64));
