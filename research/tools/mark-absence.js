// Mark fields that already hold a documented absence.
//
// The flag is written at drafting time from now on -- terr-apply.js carries an
// `absences` key out of a spec and fl/apply.js writes it. This tool exists for
// the prose that landed BEFORE the flag did: the two absence-first waves on
// he.requiredStudy and he.entryRequirements, which between them turned most of
// Africa into sourced negatives that the data records as ordinary description.
//
// It takes an explicit list of country codes and nothing else. There is no
// detector here on purpose. A negation matcher over the whole corpus recovers
// 2 of the 40 African he.requiredStudy absences -- "never uses the word langue",
// "sets no student language duty" and "none of them a language" share no
// pattern, and the ones it does catch it catches beside sentences like
// "Applicants with only a grade E in English may be considered", which is a
// requirement, not the lack of one. Whether a field asserts an absence is a
// reading, so it is done by a reader and the result is written down.
//
// Usage: node research/tools/mark-absence.js <domain> <field> <CC,CC,...> [--dry]

const fsx = require("fs");
const path = require("path");

const [, , domain, field, ccArg, ...rest] = process.argv;
const dry = rest.includes("--dry");
if (!domain || !field || !ccArg) {
  console.error("usage: mark-absence.js <domain> <field> <CC,CC,...> [--dry]");
  process.exit(2);
}

const root = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(root, "src", "domains.js"));
const dom = (Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS)).find(d => d.id === domain);
if (!dom) { console.error("no such domain: " + domain); process.exit(2); }
const decl = dom.fields.find(f => f[0] === field);
if (!decl) { console.error(domain + " has no field " + field); process.exit(2); }
// Prose only. A typed field carries "nobody found anything" in notEstablished
// and has no prose to assert anything with.
if (decl[2] !== "text") { console.error(field + " is " + decl[2] + ", not text"); process.exit(2); }

let file = path.join(root, "data", domain + ".json");
if (!fsx.existsSync(file)) file = path.join(root, "data", domain + ".seed.json");
if (!fsx.existsSync(file)) { console.error("no data file for " + domain); process.exit(2); }

const rows = JSON.parse(fsx.readFileSync(file, "utf8"));
const want = ccArg.split(",").map(s => s.trim().toUpperCase()).filter(Boolean);

let set = 0, already = 0;
const missing = [], empty = [];
for (const cc of want) {
  // National entries only: an absence established from a national instrument is
  // a claim about the national system, and copying it onto that country's
  // sub-national units would assert it of provinces nobody read.
  const e = rows.find(r => String(r.countryCode).toUpperCase() === cc && r.isNational);
  if (!e) { missing.push(cc); continue; }
  const t = String(e[field] || "").trim();
  if (!t || /^Not established/i.test(t) || /^Not applicable/i.test(t)) { empty.push(cc); continue; }
  if (e.absences && e.absences[field] === true) { already++; continue; }
  e.absences = e.absences || {};
  e.absences[field] = true;
  set++;
}

if (missing.length) console.log("no national entry: " + missing.join(", "));
if (empty.length) console.log("nothing to assert an absence with: " + empty.join(", "));
console.log(domain + "." + field + ": " + set + " marked" + (already ? ", " + already + " already were" : ""));
if (!dry && set) {
  fsx.writeFileSync(file, JSON.stringify(rows, null, 2) + String.fromCharCode(10));
  console.log("wrote " + path.relative(root, file));
}
