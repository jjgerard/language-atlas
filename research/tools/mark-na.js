// Mark fields where the question cannot arise.
//
//     node mark-na.js <domain> <field> <CC,CC,...> "<reason>" [--sub] [--dry]
//
// The fourth state, and the one that has been doing the least work. A blank
// means nobody has looked. "Not established" means somebody looked and found
// nothing. NOT APPLICABLE means the question does not arise here, and it is
// excluded from the coverage denominator rather than counted as a miss.
//
// Why this exists now: the two discharge fields in this atlas are the emptiest
// in it -- dld.dischargeCriteria 17 of 210, eal.removalCriteria 39 of 210 --
// and those numbers are unusable because they mix three different things. Some
// systems specify no discharge rule, which is a finding. Some cannot have one,
// because they do not designate anybody in the first place: 111 national
// entries assert that no newcomer designation exists, and a category nobody is
// put into is a category nobody can leave. And some are simply unresearched.
//
// Until those are separated, "almost no system in the world defines who leaves
// a category" cannot be said, because the number that would support it is
// partly an artefact of what nobody got to.
//
// Cuba already carried the right form before this tool existed:
//
//     Not applicable: no additional-language category exists to exit from
//
// The reason is not decoration. A bare "Not applicable" asks the reader to
// take it on trust; naming what is absent lets them check it against the
// neighbouring field, which is where the evidence for it lives.
//
// Blank fields ONLY. This never overwrites written prose, never overwrites the
// not-established sentinel, and never overwrites an existing Not applicable --
// each of those is somebody's finding and this tool has no standing to replace
// one.

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith("--")));
const [domain, field, ccArg, reason] = args.filter(a => !a.startsWith("--"));
const dry = flags.has("--dry");
const withSub = flags.has("--sub");

if (!domain || !field || !ccArg || !reason) {
  console.error('usage: mark-na.js <domain> <field> <CC,CC,...> "<reason>" [--sub] [--dry]');
  process.exit(2);
}

const root = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(root, "src", "domains.js"));
const dom = (Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS)).find(d => d.id === domain);
if (!dom) { console.error("no such domain: " + domain); process.exit(2); }
const decl = dom.fields.find(f => f[0] === field);
if (!decl) { console.error(domain + " has no field " + field); process.exit(2); }
// Prose only. A typed field's "does not arise" is its emptiness plus the
// notEstablished flag; there is no row that says "no rows could exist".
if (decl[2] !== "text") { console.error(field + " is " + decl[2] + ", not text"); process.exit(2); }

let file = path.join(root, "data", domain + ".json");
if (!fs.existsSync(file)) file = path.join(root, "data", domain + ".seed.json");
if (!fs.existsSync(file)) { console.error("no data file for " + domain); process.exit(2); }

const rows = JSON.parse(fs.readFileSync(file, "utf8"));
const want = ccArg.split(",").map(s => s.trim().toUpperCase()).filter(Boolean);
const text = "Not applicable: " + String(reason).trim().replace(/\.$/, "");

let set = 0;
const missing = [], occupied = [];
for (const cc of want) {
  // National only unless asked otherwise. A sub-national unit inherits its
  // country's answer, and writing this onto every province of a country that
  // has no designation would state the same thing forty times.
  const hits = rows.filter(r => String(r.countryCode).toUpperCase() === cc
    && (withSub || r.isNational));
  if (!hits.length) { missing.push(cc); continue; }
  for (const e of hits) {
    const cur = String(e[field] || "").trim();
    if (cur) { occupied.push(cc + (e.isNational ? "" : "/" + e.unitName)); continue; }
    e[field] = text;
    set++;
  }
}

if (missing.length) console.log("no entry: " + missing.join(", "));
if (occupied.length) console.log("already written, left alone: " + occupied.join(", "));
console.log(domain + "." + field + ": " + set + " marked not applicable");
console.log('  "' + text + '"');
if (!dry && set) {
  fs.writeFileSync(file, JSON.stringify(rows, null, 2) + String.fromCharCode(10));
  console.log("wrote " + path.relative(root, file));
} else if (set) {
  console.log("  (dry run - drop --dry to write)");
}
