// Check a re-slotting pass for smuggled claims.
//
//     node reslot-verify.js <domain> <specDir>
//
// Re-slotting rewrites a field so its bullets answer the fixed questions in
// src/domains.js, in order, omitting what cannot be answered. It reorders,
// merges and lightly rewords prose that is ALREADY on the entry. It must not
// add anything.
//
// WHY THIS IS NOT terr-verify. That gate re-fetches the url a bullet cites and
// looks for a verbatim quote. It cannot be used here, because these 285 entries
// carry no per-bullet evidence: the drafting passes that wrote them produced an
// `evidence` array and terr-apply discarded it, keeping only entry-level
// docLinks. So there is nothing stored to re-check a reworded bullet against.
// Persisting that map is the fix, and until it exists a re-slot cannot be
// source-verified. This gate is the strongest thing that IS possible, and it is
// aimed at the actual failure mode of the operation rather than at the one
// terr-verify is aimed at.
//
// WHAT IT CHECKS. A re-slot may lose a point, merge two, or change wording. It
// may not introduce a fact. So:
//
//   1. NO NEW CONTENT WORDS. Every word in the new text must appear in the old
//      text, or be a function word, or share a five-letter stem with an old
//      word so that lists/listed and cover/covers pass. Anything else is a word
//      that came from the drafter's head rather than from the entry.
//   2. NO NEW NUMBERS. Every digit run in the new text must appear in the old.
//      A year or a section number that was not there before is a new claim, and
//      it is the kind a reader will trust hardest.
//   3. NO NEW QUOTED PHRASES. A quoted term is the thing this map is about;
//      inventing one would be the worst available error.
//   4. HEDGES SURVIVE. If the old text says the figure came from a survey, or
//      that something is an estimate, or that a term is not statutory, the new
//      text must still say it. CLAUDE.md is explicit that these are never
//      dropped to tighten a sentence, and a re-slot is exactly where that would
//      happen by accident.
//   5. The ordinary bullet rules: 96 characters, at most five, no trailing
//      punctuation.
//
// It also stamps each surviving unit with `reslotOf`, the exact stored text the
// new bullets were derived from. reslot-apply refuses to overwrite anything
// whose stored text no longer matches that, so a pass cannot silently clobber
// work done while it was running.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const FILES = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };
const NL = String.fromCharCode(10);
const LIMIT = 96;

const domain = process.argv[2];
const specDir = process.argv[3];
if (!domain || !specDir || !FILES[domain]) {
  console.log("usage: node reslot-verify.js <domain> <specDir>");
  process.exit(1);
}

// Function words a reword may introduce without it being a new claim.
const FREE = new Set(("a an and or the of to in on at by for from with without as is are was were be been " +
  "it its this that these those there here where when while which who whom whose what how why " +
  "not no nor only also both either neither each every any some all other another same such " +
  "than then so if but yet still per via under over above below between within across through " +
  "into onto out up down off about after before during since until against among " +
  "may might can could must shall should will would has have had do does did " +
  "one two three four five six seven eight nine ten " +
  "they them their our your his her him she he we us i you my me " +
  // Structural verbs. A re-slot merges two points into one and needs a verb to
  // join them; "covers" for "lists" is a paraphrase, not a fact. The facts are
  // the nouns, the numbers and the quoted terms, and those stay strictly gated.
  "covers cover covering lists list listed listing names named naming includes include " +
  "included sets set setting gives give given runs run applies apply applied uses use used " +
  "exists exist appears appear defines define defined states state stated says said " +
  "requires require required allows allow allowed carries carry carried holds hold held " +
  "makes make made takes take taken puts put placing placed").split(" "));

// If the old text hedges, the new text must hedge. These are the words that
// carry a qualification a reader would act on differently without.
const HEDGE = ["established", "survey", "surveys", "practitioner", "practitioners", "estimate",
  "estimated", "estimates", "unofficial", "draft", "pilot", "choosing", "approximately",
  "roughly", "unclear", "proposed", "repealed", "archived", "translation", "reportedly",
  "self", "anecdotal", "provisional", "indicative", "untested", "unverified"];

const fold = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const words = s => fold(s).replace(/[^a-z0-9À-ɏ]+/g, " ").split(" ").filter(Boolean);
const stems = set => new Set([...set].map(w => w.slice(0, 5)));
const numbers = s => (String(s).match(/\d+/g) || []);
const quoted = s => (String(s).match(/[“"']([^”"']{2,60})[”"']/g) || [])
  .map(x => fold(x).replace(/[^a-z0-9 ]+/g, "").trim()).filter(Boolean);

const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", FILES[domain]), "utf8"));
const store = new Map(rows.map(e => [e.countryCode + "|" + e.unitName, e]));

const specs = {};
for (const f of fs.readdirSync(specDir).filter(x => x.endsWith(".json") && x !== "reslot-verified.json").sort()) {
  let batch;
  try { batch = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8")); }
  catch (e) { console.log(f + ": not valid JSON - " + e.message); continue; }
  Object.assign(specs, batch);
}

const out = {};
let keptU = 0, dropU = 0, keptF = 0, dropF = 0;
for (const [key, s] of Object.entries(specs)) {
  const e = store.get(key);
  if (!e) { console.log(NL + key + ": not a unit on the " + domain + " map"); dropU++; continue; }

  const keptFields = {}, reslotOf = {}, problems = [];
  for (const [field, bullets] of Object.entries(s.fields || {})) {
    const old = String(e[field] || "");
    const p = [];

    if (!old.trim()) p.push("nothing stored to re-slot");
    if (!Array.isArray(bullets) || !bullets.length) p.push("no bullets offered");
    if (bullets && bullets.length > 5) p.push(bullets.length + " bullets");
    for (const b of (bullets || [])) {
      if (typeof b !== "string") { p.push("a bullet is not a string"); continue; }
      if (b.length > LIMIT) p.push(b.length + " chars - " + b.slice(0, 46));
      if (/[.;]$/.test(b)) p.push("ends with punctuation - " + b.slice(0, 46));
    }

    if (!p.length) {
      // A citation inside a bullet is the point of the new convention, and its
      // words come from a docLink label rather than from the prose. Allow those
      // -- but ONLY those, so a citation must name a source the entry already
      // carries. Japan's parenthesis naming MEXT is legitimate because the entry
      // cites a MEXT page; a ministry the entry never cited is still refused.
      const linkWords = []
        .concat(e.docLinks || [], e.supportLinks || [])
        .flatMap(l => words((l && l.label) || ""));
      const oldW = new Set([...words(old), ...linkWords]);
      const oldStems = stems(oldW);
      const newText = bullets.join(" ");

      for (const w of new Set(words(newText))) {
        if (oldW.has(w) || FREE.has(w)) continue;
        if (oldStems.has(w.slice(0, 5))) continue;
        p.push("new word not in the stored text: " + w);
      }
      const oldN = new Set(numbers(old));
      for (const n of numbers(newText)) if (!oldN.has(n)) p.push("new number: " + n);

      const oldQ = quoted(old).join(" | ");
      for (const q of quoted(newText)) {
        if (!oldQ.includes(q)) p.push("new quoted phrase: " + q.slice(0, 40));
      }
      // The hedge test reads the stored PROSE only, never the docLink labels.
      // A source titled "practitioner survey" does not oblige a bullet to say
      // practitioner -- that would make every citation create a phantom hedge.
      const oldProse = new Set(words(old));
      for (const h of HEDGE) {
        if (oldProse.has(h) && !words(newText).includes(h)) p.push("hedge lost: " + h);
      }
    }

    if (p.length) { problems.push(field + ": " + p.slice(0, 4).join("; ")); dropF++; }
    else { keptFields[field] = bullets; reslotOf[field] = old; keptF++; }
  }

  console.log(NL + key + ": " + Object.keys(keptFields).length + " field(s) kept, " + problems.length + " dropped");
  problems.forEach(x => console.log("    - " + x));
  if (Object.keys(keptFields).length) { out[key] = { fields: keptFields, reslotOf }; keptU++; }
  else dropU++;
}

fs.writeFileSync(path.join(specDir, "reslot-verified.json"), JSON.stringify(out, null, 1) + NL);
console.log(NL + keptU + " units with " + keptF + " field(s) survived (" + dropF +
  " field(s) dropped, " + dropU + " units left with nothing), written to reslot-verified.json");
