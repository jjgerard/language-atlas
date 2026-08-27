// Validate and apply the drafted PEER specs.
//
//     node peer-merge.js <specDir>            # check only
//     node peer-merge.js <specDir> --write
//
// The drafts come from separate workers, so nothing here is taken on trust.
// apply.js already enforces the bullet rules and refuses to overwrite; this
// adds the checks apply.js cannot make, because only this script knows which
// source text each bullet was supposed to have come from:
//
//   - the unit exists and the field really is empty
//   - the hedge is the FIRST bullet. A claim drawn from an SEN-wide profile
//     that does not say so is the failure mode that matters on this pass, so a
//     first bullet that does not read like a hedge is REPORTED for a human
//     rather than dropped: drafters were told to write a specific hedge where
//     the profile genuinely names speech or language, and those fields are the
//     most valuable things on the pass.
//   - every policyHistory year actually appears in that unit's profile text. A
//     timeline is the one place a plausible invented number is
//     indistinguishable from a real one. This is necessary and not sufficient:
//     Togo's profile contains "Act No. 2004-2005", so a 2004 row passes on an
//     act NUMBER rather than a date. Years that only occur inside an act number
//     are listed separately for a human.
//   - every bullet shares distinctive vocabulary with the profile. This is the
//     invention check, coarse on purpose: it cannot prove a bullet faithful,
//     only catch one talking about something the source never mentions. In
//     practice it catches one specific over-claim -- a bullet asserting an
//     ABSENCE the profile never states, "no referral steps are described"
//     where the profile is simply silent about referral. Those are dropped one
//     bullet at a time, because they sit alongside faithful bullets far more
//     often than they replace them.
const fs = require("fs");
const path = require("path");
const { apply, ATLAS } = require("./fl/apply");

const NL = String.fromCharCode(10);
const PEER = path.join(ATLAS, "research", "peer");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const DLD = DOMAINS.find(d => d.id === "dld");
const FIELDS = new Set(DLD.fields.map(f => f[0]));
const TYPED = new Set(["identifiedPrevalence", "policyHistory"]);

const specDir = process.argv[2];
if (!specDir) { console.log("usage: node peer-merge.js <specDir> [--write]"); process.exit(1); }

const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", "dld.json"), "utf8"));
const byKey = new Map(rows.map(r => [r.countryCode + "|" + r.unitName, r]));
const filled = v => v == null ? false : Array.isArray(v) ? v.length > 0 : String(v).trim().length > 0;

const STOP = new Set(("the a an and or of to in for on with by is are was were be been that this those these it its as at from " +
  "not no all any each every their there which who whom what when where how than then also has have had do does did may " +
  "can could should would will shall must more most other some such only own same so too very one two three").split(" "));
const toks = s => new Set(String(s).toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/)
  .filter(w => w.length > 4 && !STOP.has(w)));

const HEDGE = new RegExp([
  "general", "never language disorder", "no longer updated", "profile is", "source describes",
  "named provision", "describes the system", "not language", "rather than language", "source names",
  "source lists", "profile describes", "not yet implemented", "team lists", "names only",
  "named training", "named assessment", "speaks of", "wording is", "services named", "profile names",
].join("|"), "i");

const problems = [], notes = [], review = [];
const spec = {}, history = {}, urls = {};
let unitsSeen = 0, fieldsKept = 0, bulletsKept = 0, histKept = 0, neKept = 0;

for (const f of fs.readdirSync(specDir).filter(x => x.endsWith(".json")).sort()) {
  let batch;
  try { batch = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8")); }
  catch (e) { problems.push(f + ": not valid JSON - " + e.message); continue; }

  for (const [key, s] of Object.entries(batch)) {
    const e = byKey.get(key);
    if (!e) { problems.push(f + " " + key + ": no such dld entry"); continue; }
    const cc = key.split("|")[0];
    const srcFile = path.join(PEER, cc + ".md");
    if (!fs.existsSync(srcFile)) { problems.push(key + ": no profile text on disk"); continue; }
    const src = fs.readFileSync(srcFile, "utf8");
    const srcToks = toks(src);
    unitsSeen++;
    if (s.url) urls[key] = s.url;

    const keepFields = {};
    for (const [field, bullets] of Object.entries(s.fields || {})) {
      if (!FIELDS.has(field)) { problems.push(key + "/" + field + ": not a dld field"); continue; }
      if (TYPED.has(field)) { problems.push(key + "/" + field + ": typed field given bullets"); continue; }
      if (filled(e[field])) { notes.push(key + "/" + field + ": already written, dropped"); continue; }
      if (!Array.isArray(bullets) || !bullets.length) continue;

      if (!HEDGE.test(bullets[0])) {
        review.push(key + "/" + field + ": check the hedge - " + String(bullets[0]).slice(0, 74));
      }

      const kept = [], dropped = [];
      for (const b of bullets) {
        if (typeof b !== "string") { dropped.push("(non-string)"); continue; }
        const t = toks(b);
        const shared = [...t].filter(w => srcToks.has(w)).length;
        if (b !== bullets[0] && t.size >= 3 && shared < 2) { dropped.push(b); continue; }
        kept.push(b);
      }
      dropped.forEach(b => problems.push(
        key + "/" + field + ": asserts what the profile does not say, bullet dropped - " + String(b).slice(0, 66)));
      if (kept.length < 2) { problems.push(key + "/" + field + ": nothing left but the hedge, field dropped"); continue; }
      keepFields[field] = kept;
      fieldsKept++; bulletsKept += kept.length;
    }

    const keepNE = {};
    for (const [field, prose] of Object.entries(s.notEstablished || {})) {
      if (!FIELDS.has(field)) { problems.push(key + "/" + field + ": not a dld field"); continue; }
      if (filled(e[field])) { notes.push(key + "/" + field + ": already written, dropped"); continue; }
      if (!/^Not established from the sources consulted/i.test(String(prose))) {
        problems.push(key + "/" + field + ": not-established text lacks the sentinel phrase"); continue;
      }
      keepNE[field] = prose; neKept++;
    }

    const keepHist = [];
    for (const r of (s.history || [])) {
      if (!r || !Number.isInteger(r.year) || r.year < 1500 || r.year > 2030) {
        problems.push(key + ": bad history year " + JSON.stringify(r && r.year)); continue;
      }
      if (typeof r.description !== "string" || !r.description.trim()) {
        problems.push(key + ": history row with no description"); continue;
      }
      if (!src.includes(String(r.year))) {
        problems.push(key + ": year " + r.year + " does not appear in the profile text"); continue;
      }
      // Every occurrence of the year sits inside something like "No. 2004-2005"
      // or "012-2010/AN": the digits are there but they are an identifier, not
      // a date the profile states.
      const asNumber = new RegExp("(?:No\\.?\\s*|[0-9]-)" + r.year + "|" + r.year + "-[0-9]{2,4}\\b", "g");
      const bare = new RegExp("(?:^|[^0-9/-])" + r.year + "(?![0-9/-])", "m");
      if (!bare.test(src) && asNumber.test(src)) {
        review.push(key + ": year " + r.year + " appears only inside a document number, not as a date");
      }
      keepHist.push({ year: r.year, description: r.description.trim() });
    }

    if (Object.keys(keepFields).length || Object.keys(keepNE).length) {
      spec[key] = { confidence: "secondary-source" };
      if (Object.keys(keepFields).length) spec[key].fields = keepFields;
      if (Object.keys(keepNE).length) spec[key].notEstablished = keepNE;
      if (urls[key]) spec[key].addDocLinks = [{ label: "UNESCO GEM Report PEER, country profile: inclusion", url: urls[key] }];
    }
    if (keepHist.length) { history[key] = keepHist; histKept += keepHist.length; }
  }
}

console.log(unitsSeen + " units read from " + specDir);
console.log("  kept: " + fieldsKept + " fields, " + bulletsKept + " bullets, " + neKept + " not-established, " + histKept + " history rows");
if (notes.length) {
  console.log(NL + "  dropped as already written (" + notes.length + "):");
  notes.slice(0, 10).forEach(n => console.log("    " + n));
  if (notes.length > 10) console.log("    ... and " + (notes.length - 10) + " more");
}
if (problems.length) {
  console.log(NL + "DROPPED (" + problems.length + "):");
  problems.forEach(p => console.log("  " + p));
}
if (review.length) {
  console.log(NL + "FOR REVIEW - kept, but read these (" + review.length + "):");
  review.forEach(p => console.log("  " + p));
}
if (!Object.keys(spec).length) { console.log(NL + "nothing to apply"); process.exit(0); }

const out = apply("dld", spec);
if (!out) process.exit(1);

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
let added = 0, dupes = 0;
for (const [key, hrows] of Object.entries(history)) {
  const [cc, name] = key.split("|");
  const e = out.rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) continue;
  const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
  const fresh = [];
  for (const r of hrows) {
    const sig = r.year + "|" + norm(r.description);
    if (have.has(sig)) { dupes++; continue; }
    have.add(sig);
    fresh.push(r);
  }
  e.policyHistory = [...(e.policyHistory || []), ...fresh].sort((a, b) => a.year - b.year);
  added += fresh.length;
}
console.log("  policyHistory merged: +" + added + " rows, " + dupes + " already on the entry or repeated in the draft");

if (process.argv.includes("--write")) {
  fs.writeFileSync(out.FILE, JSON.stringify(out.rows, null, 1) + NL);
  console.log("  wrote " + path.basename(out.FILE));
} else {
  console.log("  (dry run - pass --write)");
}
