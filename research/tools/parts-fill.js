// Write drafted field bullets that never reached the store.
//
//     node parts-fill.js                       # dry run, per domain
//     node parts-fill.js --domain indigenous
//     node parts-fill.js --show 30             # print the bullets to read
//     node parts-fill.js --write
//
// A part file's DRAFT BULLETS section is text a researcher wrote from sources
// they retrieved and quoted in the same file. Most of it was applied years of
// harvest waves ago. Some was not, and the largest block of it was not for a
// reason that had nothing to do with the drafting: parseparts.js stripped a
// leading `fl.`, `eal.` or `dld.` from a field name and did not strip
// `indigenous.`, so 119 part files' Indigenous drafts resolved to a field name
// no store has. They have been sitting in the repo, fully drafted, unread.
//
// This finds every drafted text field whose store field is BLANK and offers it,
// then writes through fl/apply.js so the bullet rules, the typed-field guards
// and the refusal to overwrite all apply exactly as they do everywhere else.
// Nothing here relaxes a guard; it only stops throwing drafts away.
//
// WHAT IT WILL NOT WRITE
//
// - A field already holding text. apply.js refuses, and so does this, earlier
//   and by unit, so a partial recovery is not reported as a wall of problems.
// - An absence note that is not the sentinel. "Not documented from an Ontario
//   government source this session" is a true and useful statement, and as
//   field text it would count as COVERAGE, because derive.js recognises only
//   "Not established from the sources consulted" as the looked-and-found-
//   nothing state. Writing these would inflate the coverage figure with the
//   opposite of coverage, so they are counted and left.
// - A field whose name exists on two maps and whose file does not say which.
//   `assessment` and `teacherSupply` are on both fl and indigenous. Ontario's
//   foreign-language harvest drafts a `teacherSupply`; filing it on the
//   Indigenous map would put French-teacher supply under Native languages. The
//   file's own domain-qualified fields decide, and where nothing decides, the
//   draft is left and counted as ambiguous.
const fs = require("fs");
const path = require("path");
const { parseText, sections } = require("./parseparts");
const { resolveHeader } = require("./unitkey");
const { apply } = require("./fl/apply");

const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const PARTS = path.join(__dirname, "..", "parts");
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const { LIVE } = require(path.join(ATLAS, "src", "domains.js"));
const { hasContent } = require(path.join(ATLAS, "src", "derive.js"));

const args = process.argv.slice(2);
const flag = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const onlyDomain = flag("--domain", null);
const showN = Number(flag("--show", 12)) || 12;
const write = args.includes("--write");

// The store, the field types, and which domains own each field name.
const live = {}, owners = {};
for (const d of LIVE) {
  const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", STORE[d.id]), "utf8"));
  live[d.id] = { fields: new Map(d.fields.map(f => [f[0], f])), byKey: new Map(rows.map(r => [r.countryCode + "|" + r.unitName, r])) };
  for (const [k] of d.fields) (owners[k] = owners[k] || []).push(d.id);
}

// parseText strips the domain prefix, which is what the store wants and what
// loses the attribution. Read the raw headings too, so a section can say which
// map it was harvested for.
const PREFIXED = /^\s*-\s*field:\s*(fl|eal|dld|indigenous)\./gm;
function declaredDomain(body) {
  const seen = {};
  for (const m of body.matchAll(PREFIXED)) seen[m[1]] = (seen[m[1]] || 0) + 1;
  const ranked = Object.entries(seen).sort((a, b) => b[1] - a[1]);
  return ranked.length ? ranked[0][0] : null;
}

// An absence note written as a bullet. The sentinel is the ONLY phrasing
// derive.js reads as the third state; everything else here would read as an
// answer. See the note at the top.
const ABSENCE = /^not (documented|established|found|retrieved|available|located|reported)\b/i;
const SENTINEL = /^Not established from the sources consulted/i;

// A bullet about what the RESEARCHER retrieved, rather than about the place.
// "No verified evidence found in the retrieved ESSA plan", "Retrieved source
// does not give the grade at which English starts", "Hedge: Oklahoma Title 70
// could not be retrieved".
//
// One of these among real bullets is a HEDGE and stays: the repo's rule is that
// a qualifier which would mislead the reader if dropped goes first and is never
// edited out to tighten a sentence. A field where EVERY bullet is one of these
// is different -- it says nobody established anything, and writing it would
// count as coverage. That is the gap-in-the-record-versus-gap-in-the-world
// distinction the whole map is built on, so it is drawn here rather than left
// to whoever reads the panel.
//
// Deliberately narrow. "CLM could not ascertain implementation of the
// safeguards for that year" is the Commissioner for Linguistic Minorities
// reporting a finding, not a researcher reporting a dead link, and it is
// content. Matching "could not" would have thrown away eight of those.
const RECORD_NOTE = /\b(retrieved (source|document|sources)|in the retrieved|from the retrieved|no verified|this session|could not be retrieved)\b/i;

const spec = {};                        // domain -> "cc|unit" -> {fields:{}}
const stats = { sections: 0, unresolved: 0, drafts: 0, alreadyFilled: 0, absence: 0, recordOnly: 0, ambiguous: 0, typed: 0, noEntry: 0, offered: 0 };
const ambiguousSamples = [], offeredSamples = [], recordSamples = [];

for (const f of fs.readdirSync(PARTS).filter(x => x.endsWith(".md")).sort()) {
  const text = fs.readFileSync(path.join(PARTS, f), "utf8");
  for (const sec of sections(text)) {
    stats.sections++;
    const key = resolveHeader(sec.head);
    if (!key) { stats.unresolved++; continue; }
    const declared = declaredDomain(sec.body);

    let fields;
    try { ({ fields } = parseText(sec.body)); } catch { continue; }

    // A section with no domain-qualified field can still say which map it is,
    // through the fields that belong to only one. Every `cafl-` file is like
    // this: nothing is written `fl.upperSecondary`, but `primaryRequirement`,
    // `curriculumTime` and `higherEducation` are fl's alone, so the two
    // ambiguous names in the same section -- `assessment` and `teacherSupply`
    // -- are fl's too. Inferred from the file's own content rather than from
    // its name, because the prefixes are harvest waves and not a taxonomy.
    // Unanimity is required: a section drawing on two maps decides nothing.
    let inferred = null;
    if (!declared) {
      const votes = new Set();
      for (const n of Object.keys(fields)) {
        if (n === "policyHistory") continue;
        const o = owners[n] || [];
        if (o.length === 1) votes.add(o[0]);
      }
      if (votes.size === 1) inferred = [...votes][0];
    }
    const sectionDomain = declared || inferred;

    for (const [name, bullets] of Object.entries(fields)) {
      if (!bullets || !bullets.length || name === "policyHistory") continue;
      stats.drafts++;

      const owns = owners[name] || [];
      let domain = null;
      if (owns.length === 1) domain = owns[0];
      else if (owns.length > 1 && sectionDomain && owns.includes(sectionDomain)) domain = sectionDomain;
      if (!domain) {
        if (owns.length > 1) { stats.ambiguous++; if (ambiguousSamples.length < 10) ambiguousSamples.push(f + "  " + key + " / " + name); }
        continue;
      }
      if (onlyDomain && domain !== onlyDomain) continue;

      const meta = live[domain].fields.get(name);
      if (!meta) continue;
      // Series, history and languages rows are not bullets. parseparts already
      // declines to guess their structure and so does this.
      if (meta[2] !== "text") { stats.typed++; continue; }

      const e = live[domain].byKey.get(key);
      if (!e) { stats.noEntry++; continue; }
      if (hasContent(e[name])) { stats.alreadyFilled++; continue; }
      // A field already carrying the sentinel is a recorded finding, not a
      // blank. hasContent says false for it; overwriting it would erase the
      // fact that somebody looked.
      if (String(e[name] || "").trim()) { stats.alreadyFilled++; continue; }

      const clean = bullets.map(b => String(b).trim()).filter(Boolean);
      if (!clean.length) continue;
      if (clean.some(b => ABSENCE.test(b)) && !clean.some(b => SENTINEL.test(b))) { stats.absence++; continue; }
      if (clean.every(b => RECORD_NOTE.test(b))) {
        stats.recordOnly++;
        if (recordSamples.length < 12) recordSamples.push(domain + " " + key + " / " + name + ": " + clean[0].slice(0, 72));
        continue;
      }

      const bucket = (spec[domain] = spec[domain] || {});
      const unit = (bucket[key] = bucket[key] || { fields: {} });
      // The same unit is drafted by more than one harvest wave. First draft
      // wins, deterministically, because the file list is sorted.
      if (unit.fields[name]) continue;
      unit.fields[name] = clean;
      stats.offered++;
      if (offeredSamples.length < showN) offeredSamples.push({ domain, key, name, clean });
    }
  }
}

console.log(stats.sections + " sections read, " + stats.unresolved + " headers unresolved");
console.log(stats.drafts + " drafted fields" + (onlyDomain ? ", filtered to " + onlyDomain : "") + NL);
console.log("  already filled in the store:     " + stats.alreadyFilled);
console.log("  absence note, not the sentinel:  " + stats.absence);
console.log("  every bullet a note on the record:" + String(stats.recordOnly).padStart(4));
console.log("  field name on two maps, unsaid:  " + stats.ambiguous);
console.log("  typed field, not bullets:        " + stats.typed);
console.log("  no such entry:                   " + stats.noEntry);
console.log(NL + "  OFFERED: " + stats.offered + " fields");
for (const d of Object.keys(STORE)) {
  const b = spec[d] || {};
  const n = Object.values(b).reduce((a, u) => a + Object.keys(u.fields).length, 0);
  console.log("    " + d.padEnd(11) + String(n).padStart(4) + " fields across " + String(Object.keys(b).length).padStart(3) + " entries");
}

if (ambiguousSamples.length) {
  console.log(NL + "AMBIGUOUS (file does not say which map):");
  ambiguousSamples.forEach(s => console.log("  " + s));
}

if (recordSamples.length) {
  console.log(NL + "LEFT, the record rather than the place:");
  recordSamples.forEach(x => console.log("  " + x));
}

console.log(NL + "SAMPLE - read these before writing:");
for (const s of offeredSamples) {
  console.log("  " + s.domain + " " + s.key + " / " + s.name);
  s.clean.forEach(b => console.log("      - " + b));
}

// Everything goes through apply.js, which validates the whole spec and writes
// nothing at all if any entry breaks a rule.
let wrote = 0;
console.log(NL + "---- through fl/apply.js ----");
for (const [domain, bucket] of Object.entries(spec)) {
  const out = apply(domain, bucket);
  if (!out) { console.log("  " + domain + ": REFUSED, nothing written for this map"); continue; }
  // apply() computed the path it validated against; write back to that one
  // rather than recomputing it here and risking two ideas of where a store is.
  if (write) { fs.writeFileSync(out.FILE, JSON.stringify(out.rows, null, 1) + NL); wrote++; }
}
console.log(NL + (write ? "  written to " + wrote + " store(s)" : "  (dry run - pass --write)"));
