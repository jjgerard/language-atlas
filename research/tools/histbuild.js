// Route the collected policyHistory rows to the maps they belong on.
//
//     node histbuild.js            # dry run: distribution, samples, drops
//     node histbuild.js --write    # write via fl/apply.js
//
// 1,372 dated rows were sitting in the evidence files with 648 written. The gap
// existed because this was deferred three times: a country profile lists its
// dated instruments across every topic at once, so copying a unit's rows onto
// every map it was touched for would put building-accessibility regulations on
// a foreign-language timeline. That objection was right; deferring was not the
// answer to it.
//
// So route by SUBJECT, read off the row's own words:
//
//   disability, therapy, special education       -> dld
//   arrival, refugees, the language of schooling -> eal
//   foreign and second-language teaching         -> fl
//   minority, regional, national, indigenous     -> indigenous
//   the school system generally — an education act, a constitution, a ministry
//     reorganisation — goes to EVERY map that unit is documented on, because a
//     general education act genuinely is the enabling instrument for all four
//     questions. Counted separately as `viaGeneral` so the fanout is visible
//     rather than buried in a total.
//   anything matching nothing is DROPPED and counted, never guessed at
//
// A row matching more than one subject goes to each: a bilingual education act
// is honestly part of both the majority-language and the regional-language
// story.
//
// The unit comes from each file's own "### CC|Unit" header rather than from its
// filename, because ten naming schemes accumulated across the waves and the
// header is the one thing all of them share.
const fs = require("fs");
const path = require("path");
const { parseText, sections, toHistory } = require("./parseparts");
const { resolveHeader } = require("./unitkey");

const ATLAS = path.join(__dirname, "..", "..");
const STORE = { fl: "fl.seed.json", dld: "dld.json", eal: "eal.json", indigenous: "indigenous.json" };
const PARTS = path.join(__dirname, "..", "parts");

// The subject routing and the word-boundary cases behind it now live in
// hist-guards.js, shared with hist-from-prose.js and hist-from-parts.js.
const { subjectsOf, GENERAL_MAPS } = require("./hist-guards");

const load = d => JSON.parse(fs.readFileSync(path.join(ATLAS, "data", STORE[d]), "utf8"));
const live = Object.fromEntries(Object.keys(STORE).map(d => [d, new Map(load(d).map(r => [r.countryCode + "|" + r.unitName, r]))]));

const META = new Set(["countryCode", "unitName", "region", "subregion", "status", "confidence", "lastVerified", "by", "stubNote", "sourceLanguageNote", "docLinks", "supportLinks", "policyHistory"]);

/** Is this unit documented on this map? Only then does its history belong there.
 *  An undocumented entry carrying a timeline is a map with dates and no answer. */
function documented(d, key) {
  const r = live[d].get(key);
  if (!r) return false;
  return Object.keys(r).some(k => {
    if (META.has(k)) return false;
    const v = r[k];
    if (Array.isArray(v)) return v.length > 0;
    return typeof v === "string" && v.trim() && !/^Not established/i.test(v);
  });
}

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);

/** Rows already on the entry, so a re-run does not double them. */
function existing(d, key) {
  const r = live[d].get(key);
  return new Set(((r && r.policyHistory) || []).map(h => h.year + "|" + norm(h.description)));
}

function collect() {
  const out = {};                        // domain -> key -> rows
  const stats = { read: 0, placed: 0, dropped: 0, viaGeneral: 0, dupe: 0, undoc: 0, unresolved: 0 };
  const dropped = [], samples = [], seen = {}, unresolved = [];
  for (const f of fs.readdirSync(PARTS).filter(x => x.endsWith(".md")).sort()) {
    const text = fs.readFileSync(path.join(PARTS, f), "utf8");
    // Per SECTION, not per file. Several part files carry more than one unit,
    // and reading only the first header filed every row in that file under it.
    for (const sec of sections(text)) {
    const key = resolveHeader(sec.head);
    if (!key) { stats.unresolved++; unresolved.push(f + ": " + sec.head.slice(0, 70)); continue; }
    let fields;
    try { ({ fields } = parseText(sec.body)); } catch (e) { continue; }
    if (!(fields.policyHistory || []).length) continue;
    for (const row of toHistory(fields.policyHistory, [], f)) {
      stats.read++;
      const subs = subjectsOf(row.description);
      if (!subs.length) { stats.dropped++; dropped.push(row.year + " " + row.description.slice(0, 78)); continue; }
      const isGeneral = subs[0] === "*";
      const domains = (isGeneral ? GENERAL_MAPS : subs).filter(d => documented(d, key));
      if (!domains.length) { stats.undoc++; continue; }
      for (const d of domains) {
        const bucket = (out[d] = out[d] || {});
        const sk = d + "|" + key;
        const have = (seen[sk] = seen[sk] || existing(d, key));
        const sig = row.year + "|" + norm(row.description);
        if (have.has(sig)) { stats.dupe++; continue; }
        have.add(sig);
        (bucket[key] = bucket[key] || []).push(row);
        stats.placed++;
        if (isGeneral) stats.viaGeneral++;
        if (samples.length < 16 && row.description.length > 45) samples.push(`${d.padEnd(11)} ${key.padEnd(24)} ${row.year}  ${row.description.slice(0, 68)}`);
      }
    }
    }
  }
  // A timeline is read top to bottom; the store does not sort for us.
  for (const d of Object.keys(out)) for (const k of Object.keys(out[d])) out[d][k].sort((a, b) => a.year - b.year);
  return { out, stats, dropped, samples, unresolved };
}

/** Merge the routed rows into the stores.
 *
 * NOT via fl/apply.js: that writer ASSIGNS `e.policyHistory = s.history`, which
 * is right for an entry gaining its first timeline and wrong here, where 648
 * rows already exist and would be replaced rather than joined. collect() has
 * already deduped against what is on each entry, so this concatenates and
 * sorts. Metadata is left alone — an entry does not become better sourced for
 * gaining a date, and rewriting `by` and `confidence` here would overwrite the
 * provenance of entries seeded from named sources. */
function write(out) {
  const problems = [];
  for (const [d, bucket] of Object.entries(out)) {
    for (const [key, rows] of Object.entries(bucket)) {
      for (const r of rows) {
        if (!Number.isInteger(r.year) || r.year < 1500 || r.year > 2030) problems.push(`${d} ${key}: bad year ${r.year}`);
        if (typeof r.description !== "string" || !r.description.trim()) problems.push(`${d} ${key}: empty description`);
      }
    }
  }
  if (problems.length) { problems.slice(0, 20).forEach(p => console.log("  " + p)); return console.log(`${problems.length} PROBLEMS — nothing written`); }

  for (const [d, bucket] of Object.entries(out)) {
    const file = path.join(ATLAS, "data", STORE[d]);
    const rows = JSON.parse(fs.readFileSync(file, "utf8"));
    let touched = 0, added = 0;
    for (const [key, add] of Object.entries(bucket)) {
      const [cc, name] = key.split("|");
      const e = rows.find(r => r.countryCode === cc && r.unitName === name);
      if (!e) { console.log(`  ${d} ${key}: no such entry`); continue; }
      e.policyHistory = [...(e.policyHistory || []), ...add].sort((a, b) => a.year - b.year);
      touched++; added += add.length;
    }
    fs.writeFileSync(file, JSON.stringify(rows, null, 1) + "\n");
    const total = rows.reduce((a, e) => a + ((e.policyHistory || []).length), 0);
    console.log(`  ${STORE[d].padEnd(14)} +${String(added).padStart(4)} rows on ${String(touched).padStart(3)} entries -> ${total} rows total`);
  }
}

module.exports = { collect, subjectsOf, live, documented };

if (require.main === module) {
  const { out, stats, dropped, samples, unresolved } = collect();
  console.log(`READ ${stats.read} rows -> PLACED ${stats.placed}`);
  console.log(`  dropped, no subject matched   ${stats.dropped}`);
  console.log(`  already on the entry          ${stats.dupe}`);
  console.log(`  unit not documented on any matching map  ${stats.undoc}`);
  console.log(`  section header not resolvable to a unit  ${stats.unresolved}`);
  console.log(`  of the placed, ${stats.viaGeneral} are a general education instrument fanned to the three language maps`);
  console.log("");
  for (const d of Object.keys(STORE)) {
    const b = out[d] || {};
    const rows = Object.values(b).reduce((a, r) => a + r.length, 0);
    console.log(`  ${d.padEnd(11)} +${String(rows).padStart(4)} rows across ${String(Object.keys(b).length).padStart(3)} entries`);
  }
  console.log("\nSAMPLE OF WHAT WOULD BE WRITTEN");
  samples.forEach(s => console.log("  " + s));
  console.log(`\nSTILL DROPPED (${dropped.length}); showing 30`);
  dropped.slice(0, 30).forEach(s => console.log("  " + s));
  if (process.argv.includes("--write")) { console.log(""); write(out); }
}
