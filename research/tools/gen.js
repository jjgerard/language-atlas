// Generate reports/parts/lang-<SLUG>.md from a spec, resolving language rows
// through the WALS tool exactly as rows.js does (same module, same rules).
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const WALS = path.join(__dirname, "wals");

function rows(names) {
  if (!names.length) return { json: "[]", notes: [] };
  const out = execFileSync("node", [path.join(WALS, "rows.js"), ...names], { encoding: "utf8" });
  const i = out.indexOf("\n// NOTES");
  return { json: (i < 0 ? out : out.slice(0, i)).trim(), notes: i < 0 ? [] : out.slice(i).trim().split("\n") };
}


// Some WALS names are carried by BOTH a language record and a genus (or family)
// row -- "Basque", "Albanian", "Wolof", "Manjaku", "Balanta", "Kunama". rows.js
// rightly refuses those, and re-running "with its exact WALS name" cannot break
// the tie because the names are identical. Its bare-code path is guarded too,
// because a WALS code with no ISO backing is usually a different language.
// So the tie is broken HERE, by hand, against the WALS record the tool itself
// printed -- and every row produced this way carries a note saying so.
const wals = require(path.join(WALS, "wals.js"));
const SHORTEN = t => t
  .replace(/^Order of Subject, Object and Verb: /, "Word order ")
  .replace(/^Order of Adjective and Noun: /, "")
  .replace(/^Prefixing vs\. Suffixing in Inflectional Morphology: /, "")
  .replace(/^Tone: /, "");
function pick(walsId) {
  const l = wals.languages.find(x => x.ID === walsId);
  if (!l) throw new Error("no WALS record with ID " + walsId);
  const d = wals.describe(l);
  return { name: d.name, wals: d.wals, iso: d.iso,
    family: [d.family, d.subfamily].filter(Boolean).join(" > "),
    genus: d.genus, typology: d.typology.map(SHORTEN).join("; ") };
}

const OUT = path.join(__dirname, "reports", "parts");
let nRows = 0, nWals = 0, nNo = 0, files = [];

function write(spec) {
  const r = rows(spec.langs || []);
  const parsed = JSON.parse(r.json);
  for (const pk of spec.picks || []) parsed.splice(pk.at === undefined ? parsed.length : pk.at, 0, pick(pk.id));
  r.json = JSON.stringify(parsed, null, 1);
  parsed.forEach(x => { nRows++; x.wals ? nWals++ : nNo++; });
  if (r.notes.some(n => /NOT written/.test(n))) throw new Error(spec.unit + " AMBIGUOUS:\n" + r.notes.join("\n"));
  let s = `### ${spec.unit}\nSTATUS: ${spec.status}\n`;
  if (spec.sources) { s += "SOURCES:\n"; spec.sources.forEach(x => { s += ` - label: ${x.label}\n   url: ${x.url}\n   http: ${x.http}\n   tier: ${x.tier}\n`; }); }
  s += `LANGUAGES:\n${r.json}\n`;
  if (spec.langNotes) spec.langNotes.forEach(n => s += `LANGUAGE NOTE: ${n}\n`);
  r.notes.filter(n => /NO WALS RECORD|empty typology/.test(n)).forEach(n => s += `LANGUAGE NOTE: ${n.replace(/^\/\/\s*/, "")}\n`);
  s += "EVIDENCE:\n";
  (spec.evidence || []).forEach(e => { s += ` - field: ${e.field}\n   quote: "${e.quote.replace(/"/g, "'")}"\n   source: ${e.source}\n`; });
  s += "DRAFT BULLETS:\n";
  for (const f of ["localTerm", "mediumOfInstruction", "taughtAsSubject"]) {
    if (!spec.bullets || !spec.bullets[f] || !spec.bullets[f].length) continue;
    s += ` - field: ${f}\n   bullets:\n`;
    spec.bullets[f].forEach(b => {
      if (b.length > 96) throw new Error(`${spec.unit} ${f} bullet ${b.length} chars: ${b}`);
      if (/[.;]$/.test(b)) throw new Error(`${spec.unit} ${f} bullet ends in punctuation: ${b}`);
      s += `     - ${b}\n`;
    });
    if (spec.bullets[f].length > 5) throw new Error(spec.unit + " " + f + " too many bullets");
  }
  if (spec.note) s += `NOTE: ${spec.note}\n`;
  const file = path.join(OUT, `lang-${spec.slug}.md`);
  fs.writeFileSync(file, s);
  files.push(`lang-${spec.slug}.md`);
}
module.exports = { write, pick, stats: () => ({ nRows, nWals, nNo, files }) };
