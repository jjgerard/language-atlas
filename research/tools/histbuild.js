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

// Word boundaries here are load-bearing, not decoration. Without \b, "SEN"
// matches "present" and "sense", "cree" matches "decree", and "innu" matches
// "innumerable" — each of which would file a foreign-language row on the
// disorder map with a straight face. An earlier run of this script did exactly
// that, because a heredoc ate the backslashes on the way to disk.
// One alternative earned its own note. `second[- ]language` sat on the eal
// pattern and, in Canada, put six FSL funding and curriculum rows on the
// newcomer map: "second-language instruction" there means French, not support
// for a child who arrived without the school's language. It now needs a learner
// word to count as eal, and the instruction sense goes to fl.
const SUBJECT = {
  dld: /disabilit|disabled|special education|special needs|\bSEN\b|inclusive education|speech|therap|logoped|orthophon|fonoaudiolog|impairment|handicap|autis|dyslex|language disorder|rehabilitat|accessib|\bdeaf\b|\bblind\b|sign language|\bCRPD\b|persons with disabilit|Salamanca|resource room|remedial|learning difficult|psycholog|audiolog|inclusi[oó]n|inclusive school|mainstream|developmental disorder|diagnostic|early intervention|educaci[oó]n inclusiva|discapacidad|educaci[oó]n especial/i,
  eal: /refugee|asylum|migrant|immigrant|newcomer|newly arrived|displaced|\bEAL\b|\bESL\b|English learner|English as an additional|second[- ]language (learner|pupil|student|support)|langue seconde d.accueil|reception class|welcome class|accueil|francisation|castellaniz|host language|language support|integration of (pupils|students|children)|home language survey|Equal Educational Opportunities|language minority student|limited English/i,
  fl: /foreign[- ]language|langue étrang|lengua extranjera|world language|English as a foreign|\bCEFR\b|\bCLIL\b|\bDELF\b|Common European Framework|language teaching|teaching of English|English teaching|three[- .]language formula|two[- .]language formula|compulsory (English|French|Spanish|German)|modern language|immersion|core [Ff]rench|intensive [Ff]rench|extended [Ff]rench|language credit|conversational (Spanish|French|English)|(Spanish|French|German|Mandarin) programme|\bFSL\b|French as a second|second[- ]language (instruction|education|programme|program|mandate|credit|teaching)|Second-Language Instruction|langue seconde|French[- ]language (education|programme|program|school)|French first language|fransaskois|franco[- ]canadienne|Charter of the French Language|French Language Services|conseil scolaire/i,
  indigenous: /minorit|indigenous|ind[ií]gena|regional language|national language|mother[- ]tongue|lengua originaria|autochton|tribal|aborigin|first nation|\binuit\b|\binnu\b|m[ée]tis|\bmaori\b|\bsami\b|mi.kmaq|\bcree\b|intercultural|bilingual|charter for regional|vernacular|creole|patois|heritage language|medium of instruction|official medium|official language|eighth schedule|scheduled tribe|linguistic minorit|\bCLM\b|Commissioner for Linguistic|(Urdu|Punjabi|Sindhi|Maithili|Bhojpuri|Sanskrit|Telugu|Tamil|Bengali|Marathi|Gujarati)\s+Academy|language of instruction|inuktut|inuktitut|\bdene\b|treaty education|\bILPA\b|indigenous language|native language/i,
};
// A general instrument: dated, about schooling, but not about any one of the
// four questions in particular.
//
// These fan out to the three LANGUAGE maps only, never to dld. Three of the
// four maps ask a language question and a general education act plausibly bears
// on all three; the disorder map asks a clinical and provision question that a
// generic act rarely speaks to. When one does, SUBJECT.dld catches it directly.
// Without this split, Papua New Guinea's constitutional clause on literacy in
// tok ples was filed on the disorder map, and \bconstitution had matched the
// "Unconstitutional" in Madagascar's 2009 coup.
const GENERAL = /education act|education law|school act|schools act|\bconstitution|basic law|language policy|language.in.education|ley general de educaci|loi.*(éducation|enseignement)|education ordinance|education code|ministry of education|education strategic plan|sector plan|curriculum framework|compulsory education|national curriculum|education policy|education reform/i;

const GENERAL_MAPS = ["fl", "eal", "indigenous"];

function subjectsOf(desc) {
  const hits = Object.keys(SUBJECT).filter(k => SUBJECT[k].test(desc));
  if (hits.length) return hits;
  if (GENERAL.test(desc)) return ["*"];
  return [];
}

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
