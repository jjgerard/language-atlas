// Fill a prose field that is currently EMPTY, from an explicit map.
//
// Sibling of mark-absence.js and written for the same reason: some prose landed
// before a convention did, and the fix is a reader's judgement applied to named
// entries rather than a detector run over the corpus.
//
// The guard is the point. It writes ONLY where the field is empty, and refuses
// the whole run if any named entry already holds text — because overwriting a
// sourced claim is the one thing none of these tools may do, and a silent skip
// would hide that it nearly happened.
//
// Usage: node research/tools/fill-blank-field.js <domain> <field> <map.json> [--write]
//   map.json: { "CC": "text", "CC|Unit Name": "text" }
//   CC        the country's NATIONAL entry
//   CC|Unit   one sub-national unit

const fs = require("fs");
const path = require("path");

const [, , domain, field, mapArg, ...rest] = process.argv;
const write = rest.includes("--write");
if (!domain || !field || !mapArg) {
  console.error("usage: fill-blank-field.js <domain> <field> <map.json> [--write]");
  process.exit(2);
}

const root = path.join(__dirname, "..", "..");
const file = path.join(root, "data", `${domain}.json`);
const entries = JSON.parse(fs.readFileSync(file, "utf8"));
const map = JSON.parse(fs.readFileSync(path.resolve(mapArg), "utf8"));

const fold = s => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const find = key => {
  const [cc, unit] = key.split("|");
  return entries.find(e => e.countryCode === cc && (unit ? fold(e.unitName) === fold(unit) : e.isNational));
};

const missing = [], occupied = [], hits = [];
for (const [key, text] of Object.entries(map)) {
  const e = find(key);
  if (!e) { missing.push(key); continue; }
  if (String(e[field] == null ? "" : e[field]).trim()) { occupied.push(key); continue; }
  hits.push([e, text]);
}

if (missing.length) console.log(`no entry for: ${missing.join(", ")}`);
if (occupied.length) {
  console.error(`REFUSED ${occupied.length} -- already holds text, and this tool only fills blanks:`);
  for (const k of occupied) console.error(`  ${k}`);
  process.exit(1);
}

for (const [e, text] of hits) if (write) e[field] = text;
console.log(`${domain}.${field}: ${hits.length} blank ${hits.length === 1 ? "field" : "fields"} filled`);

if (!write) { console.log("  (dry run - pass --write)"); process.exit(0); }
// Indent 1 and a trailing newline, matching mark-absence.js and apply-coding.js
// -- anything else rewrites all 396 entries as whitespace noise.
fs.writeFileSync(file, JSON.stringify(entries, null, 1) + String.fromCharCode(10));
console.log(`wrote data\\${domain}.json`);
