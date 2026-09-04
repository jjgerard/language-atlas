// Propose `languages` rows from the prose ALREADY WRITTEN on the same entry.
//
//     node lang-from-prose.js               # report candidates
//     node lang-from-prose.js --json <file> # write them for review
//
// The Isle of Man names Manx fifteen times -- "Education Act 2001 requires the
// curriculum to provide for the teaching of Manx Gaelic", a Manx-medium school
// since 2001, a GCSE equivalent -- and its `languages` field is empty. That is
// not missing research. It is research that was done, sourced, gated and
// written into localTerm, standing, mediumOfInstruction and taughtAsSubject,
// and then never restructured into the typed field.
//
// So this adds NO claim. Every name it proposes is already asserted in that
// entry's own text, and therefore already traces to that entry's docLinks,
// which is the rule the repo works to. What it cannot do is judge whether the
// system ENGAGES with the language or merely mentions it, so it reports and
// does not write: the sentence each name came from is printed beside it, and a
// reader decides.
//
// Names come from Glottolog (Level=language) and WALS. Matching is on
// capitalised 1-3 word sequences, because lowercasing the haystack turns
// "the department" into a hunt for a language called The.
const fs = require("fs");
const path = require("path");
const { DOMAINS } = require(path.join(__dirname, "..", "..", "src", "domains"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const WALS_DIR = path.join(__dirname, "wals");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const hdr = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(hdr.map((h, i) => [h, r[i] ?? ""])));
}

// Words that are language names in Glottolog AND ordinary English, or that name
// a place far more often than a language in this corpus. Matching them turns a
// sentence about a ministry into a language row.
const STOP = new Set(["sign", "island", "school", "education", "language", "state", "national",
  "central", "north", "south", "east", "west", "new", "san", "santa", "san marino", "general",
  "standard", "modern", "classical", "common", "high", "low", "middle", "old", "young", "man",
  "isle of man", "georgia", "india", "china", "chad", "jordan", "guinea", "malta", "cuba",
  "mali", "niger", "togo", "peru", "cameroon", "gambia", "sierra leone", "washington", "victoria"]);

const norm = s => s.toLowerCase().replace(/[\u2019']/g, "'").replace(/\s+/g, " ").trim();

const names = new Map();          // normalised -> canonical display name
const add = (n) => {
  const t = String(n || "").trim();
  if (t.length < 4) return;
  const k = norm(t);
  if (STOP.has(k)) return;
  if (!names.has(k)) names.set(k, t);
};
for (const r of parseCsv(fs.readFileSync(path.join(WALS_DIR, "glottolog.csv"), "utf8")))
  if (r.Level === "language") add(r.Name);
for (const r of parseCsv(fs.readFileSync(path.join(WALS_DIR, "languages.csv"), "utf8")))
  add(String(r.Name || "").replace(/\s*\([^)]*\)\s*$/, ""));

const domain = DOMAINS.find(d => d.id === "indigenous");
const TEXT = domain.fields.filter(f => f[2] === "text").map(f => f[0]);
const rows = JSON.parse(fs.readFileSync(pathFor("indigenous"), "utf8"));

// A capitalised run of up to three words, which is the shape of every language
// name written in English prose.
const RUN = /\b([A-Z][\p{L}'\u2019-]+(?:\s+[A-Z][\p{L}'\u2019-]+){0,2})/gu;

const out = {};
let units = 0, total = 0;
for (const e of rows) {
  if (Array.isArray(e.languages) && e.languages.length) continue;
  const hits = new Map();       // canonical -> {count, where:Set, sentence}
  for (const k of TEXT) {
    const text = String(e[k] || "");
    if (!text.trim()) continue;
    // A field holding the sentinel asserts NOTHING about the place, so the
    // language names inside it are the names of what was looked for and not
    // found. Barbados proposed English and Spanish out of a field reading
    // "Not established from the sources consulted. The Ministry of Education
    // ...", which would have filed two languages on the strength of an
    // absence. Same for "Not applicable".
    if (/^Not established|^Not applicable/i.test(text.trim())) continue;
    for (const line of text.split(NL)) {
      let m;
      RUN.lastIndex = 0;
      while ((m = RUN.exec(line))) {
        // Trailing quotes ride along from the surrounding prose: Northern
        // Ireland's "Ulster Scots'" was captured with its closing quote.
        const phrase = m[1].replace(/^['‘’"]+|['‘’"]+$/g, "");
        const words = phrase.split(/\s+/);
        // Longest first -- "Manx Gaelic" before "Manx" -- but PREFIXES ONLY was
        // not enough, and Northern Ireland is the case that showed it. Its
        // statute says "Irish-medium education" and "Ulster Scots", and the
        // entry's languages field was empty while Scotland and Wales were
        // filled. Three things were wrong: the hyphenated compound hides the
        // language in FRONT of the hyphen, a qualified name hides it at the
        // END ("Ulster Scots" reduced to "Ulster" and never reached Scots),
        // and the closing quote was part of the string. Same shape as Swiss
        // German or Cypriot Maronite Arabic.
        const tries = [];
        for (let n = words.length; n >= 1; n--) tries.push(words.slice(0, n).join(" "));
        for (let i = 1; i < words.length; i++) tries.push(words.slice(i).join(" "));
        if (phrase.includes("-")) tries.push(phrase.split("-")[0]);
        for (const cand of tries) {
          const key = norm(cand);
          if (!names.has(key)) continue;
          const disp = names.get(key);
          if (!hits.has(disp)) hits.set(disp, { count: 0, where: new Set(), sentence: line.trim() });
          const h = hits.get(disp);
          h.count++; h.where.add(k);
          break;
        }
      }
    }
  }
  if (!hits.size) continue;
  units++;
  out[e.countryCode + "|" + e.unitName] = [...hits.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .map(([nm, h]) => { total++; return { name: nm, mentions: h.count, fields: [...h.where], sentence: h.sentence }; });
}

const jsonAt = process.argv.indexOf("--json");
if (jsonAt >= 0 && process.argv[jsonAt + 1]) {
  fs.writeFileSync(process.argv[jsonAt + 1], JSON.stringify(out, null, 1) + NL);
  console.log("wrote " + process.argv[jsonAt + 1]);
}
console.log(units + " units with a language named in their own prose, " + total + " candidate name(s)" + NL);
for (const [key, list] of Object.entries(out).slice(0, 12)) {
  console.log(key);
  for (const c of list) console.log("   " + String(c.mentions).padStart(2) + "x  " + c.name.padEnd(22) + "[" + c.fields.join(",") + "]  " + c.sentence.slice(0, 66));
}
