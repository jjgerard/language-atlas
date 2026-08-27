// Recover policyHistory rows from what entries already say.
//
//     node hist-from-prose.js            # dry run, with a sample to read
//     node hist-from-prose.js --sample 40
//     node hist-from-prose.js --write
//
// 761 entries name a year in their own prose that their timeline does not
// carry. Those dates cost nothing to recover: a human wrote them, in a field
// that already traces to that entry's own docLinks, and the Patterns timeline
// is the only thing on the site that reads them.
//
// THE DANGER IS OBVIOUS AND IS WHY THIS IS SELECTIVE. A year in a sentence is
// not automatically a policy event. "Reported as still at the experimental
// stage as of late 2014", "the 2012-13 collection", "8,806 in 2023" all carry
// years that belong to a figure or a caveat, not to an instrument. Writing
// those onto the timeline would fill it with noise that reads exactly like
// signal, and a timeline is the one thing here nobody can eyeball for
// plausibility.
//
// So a bullet qualifies only if it NAMES AN INSTRUMENT OR AN EVENT: an act, a
// law, a decree, an order, a circular, a plan, a policy, a ratification, a
// commencement. Everything else is left alone and counted, so the size of what
// is being declined stays visible.
const fs = require("fs");
const path = require("path");

const NL = String.fromCharCode(10);
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const { hasContent } = require(path.join(ATLAS, "src", "derive.js"));
const STORE = { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: "indigenous.json" };

// An instrument, or a dated act of state. Deliberately wide across languages,
// because the entries quote their sources' own words.
const INSTRUMENT = new RegExp([
  "\\bact\\b", "\\blaw\\b", "\\bdecree\\b", "\\border\\b", "\\bordinance\\b", "\\bcircular\\b",
  "\\bregulation", "\\bstatute", "\\bcode\\b", "\\bconstitution", "\\bamendment", "\\bamend",
  "\\bpolicy\\b", "\\bstrategy\\b", "\\bplan\\b", "\\bframework\\b", "\\bcurriculum\\b",
  "\\bratifi", "\\bin force\\b", "\\bcommenc", "\\benact", "\\badopted\\b", "\\bpassed\\b",
  "\\bintroduced\\b", "\\bestablish", "\\brepeal", "\\bsigned\\b", "\\bissued\\b",
  "\\bloi\\b", "\\bley\\b", "\\blov\\b", "\\bgesetz", "\\bbekendtg", "\\binatsisartut",
  "\\blandsverordening", "\\bdeliberation", "\\bd\u00e9lib\u00e9ration", "\\barr\u00eat\u00e9",
  "\\bs\\.\\s?\\d", "\\bart\\.?\\s?\\d", "\\bsection\\s\\d", "\\bchapter\\s\\d",
  "\\bpublic law\\b", "\\bp\\.?l\\.?\\s?\\d", "\\bno\\.\\s?\\d",
].join("|"), "i");


// Instrument nouns the list above lacks. Added after a sweep found real acts
// declined for want of vocabulary: Lei 14.945/2024 (Brazil), Decreto 280
// (Chile), the 1949 Resolution carried by eighteen Indian states.
const EXTRA = new RegExp([
  "\\blei\\b", "\\blegge\\b", "\\bwet\\b", "\\bdecreto\\b", "\\bdekret\\b", "\\bustawa\\b", "\\bzakon\\b", "\\bkanun\\b", "\\bqanun\\b", "\\bproclamation\\b",
  "\\bresolution\\b", "\\bbill\\b", "\\bcharter\\b", "\\bconvention\\b", "\\bprotocol\\b", "\\bdirective\\b", "\\breform\\b", "\\bnotification\\b", "\\bgazette\\b",
  "\\bdécret", "\\bcódigo", "\\bregulamento", "\\breglamento", "\\bverordnung"
].join("|"), "i");

// "programme" is far too common in survey prose to admit on its own -- most
// hits are a programme being DESCRIBED, or described as absent. It counts only
// when a verb of creation sits beside it.
const MADE = "(\\bcreated\\b|\\blaunched\\b|\\bestablished\\b|\\bintroduced\\b|\\badopted\\b|\\bbegan\\b|\\bran from\\b|\\bset up\\b)";
const PROG = "(\\bprogramme\\b|\\bprogram\\b)";
const PROGRAMME = new RegExp(PROG + ".{0,40}" + MADE + "|" + MADE + ".{0,40}" + PROG, "i");

// A line can name an instrument and still be a verdict on it rather than a
// record of it: "the Ministry took a lukewarm approach to its own 1996
// directive" dates nothing that happened in 1996.
const EVALUATIVE = new RegExp(["\\blukewarm\\b", "\\breluctant\\b", "\\bcriticis\\b", "\\bcriticiz\\b", "\\bpraised\\b", "\\bpatchy\\b", "\\buneven\\b", "\\bhalf-hearted\\b", "\\bweakly\\b", "\\bpoorly\\b", "\\bslow to\\b"].join("|"), "i");

// The vocabulary above is wider, so lines admitted BY IT ONLY face stricter
// rejection: a negative anywhere in the line rather than only at its start, and
// a longer list of measurement words. The original path is left exactly as it
// was, because its output has already been read and accepted.
const NEG_ANY = new RegExp(["\\bno\\b", "\\bnot\\b", "\\bnone\\b", "\\bnever\\b", "\\bneither\\b", "\\bnothing\\b", "\\bwithout\\b"].join("|"), "i");
const MEASURED = new RegExp(["\\bschools\\b", "\\bpupils\\b", "\\bstudents\\b", "\\bper cent\\b", "\\breached\\b", "\\bprofile\\b", "\\ballocat\\b"].join("|"), "i");

// A year that belongs to a measurement rather than to an instrument.
const FIGURE = /\b(census|survey|cohort|enrolment|enrollment|reported|counted|figures?|data|statistics|as of|by the|intake|cohort)\b/i;

// A bullet that OPENS on a negative is a finding about what does NOT exist.
// "No newcomer designation exists in Ley 115 de 1994" names a real act, but as
// a timeline row it reads as an event that happened, which is the opposite of
// what the entry says. That absence belongs in the field, not the chronology.
const NEGATIVE = /^(no|not|neither|nothing|none|never|without)\b/i;

// "by 2008" and "as of 2014" describe a state reached, not a dated act, and
// "Vision 2030" names a target. Both would put a year on the timeline that
// nothing actually happened on.
const STATE_NOT_EVENT = /\b(by|as of|until|before|towards?|toward)\s+(1[6-9]\d{2}|20[0-4]\d)\b/i;
const THIS_YEAR = 2026;

// A few bullets name a year while saying outright that they are NOT describing
// policy: a practitioner survey, an auditor reading a delisted document. Those
// are evidence about the record, not events in it.
const NOT_POLICY = new RegExp(["perceptions?", "not policy", "never mentions", "delisted", "term count"].join("|"), "i");

const YEAR = /\b(1[6-9]\d{2}|20[0-4]\d)\b/g;
const args = process.argv.slice(2);
const sampleN = args.includes("--sample") ? Number(args[args.indexOf("--sample") + 1]) || 25 : 25;

let added = 0, skippedNoInstrument = 0, skippedFigure = 0, skippedHave = 0, touched = 0;
let skippedNegative = 0, skippedState = 0;
const samples = [];
const staged = [];

for (const d of DOMAINS.filter(x => x.live)) {
  const file = path.join(ATLAS, "data", STORE[d.id]);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  const textFields = d.fields.filter(f => (f[2] || "text") === "text").map(f => f[0]);
  let dAdded = 0;

  for (const e of rows) {
    const hist = e.policyHistory || [];
    const have = new Set(hist.map(h => Number(h.year)));
    const fresh = [];

    for (const k of textFields) {
      if (!hasContent(e[k])) continue;
      for (const line of String(e[k]).split(NL)) {
        const years = [...new Set([...line.matchAll(YEAR)].map(m => Number(m[1])))];
        if (!years.length) continue;
        const viaExtra = !INSTRUMENT.test(line);
        if (viaExtra && !(EXTRA.test(line) || PROGRAMME.test(line))) { skippedNoInstrument += years.length; continue; }
        if (viaExtra && (NEG_ANY.test(line) || MEASURED.test(line) || EVALUATIVE.test(line))) { skippedFigure += years.length; continue; }
        if (FIGURE.test(line)) { skippedFigure += years.length; continue; }
        if (NEGATIVE.test(line.trim())) { skippedNegative += years.length; continue; }
        if (STATE_NOT_EVENT.test(line)) { skippedState += years.length; continue; }
        if (NOT_POLICY.test(line)) { skippedNegative += years.length; continue; }
        // A line naming several years is usually a range or a chain of
        // amendments; which one the row belongs to is a judgement, so it is
        // left rather than guessed.
        if (years.length > 1) { skippedNoInstrument += years.length; continue; }
        const y = years[0];
        if (y > THIS_YEAR) { skippedState++; continue; }
        if (have.has(y)) { skippedHave++; continue; }
        if (fresh.some(r => r.year === y)) continue;

        let desc = line.trim().replace(/\s+/g, " ");
        if (desc.length > 118) desc = desc.slice(0, 115).replace(/[\s,;:]+\S*$/, "") + "…";
        fresh.push({ year: y, description: desc, from: d.id + " " + e.countryCode + "|" + e.unitName + " / " + k });
        have.add(y);
      }
    }

    if (fresh.length) {
      touched++;
      dAdded += fresh.length;
      if (samples.length < sampleN) for (const r of fresh.slice(0, 2)) samples.push(r);
      e.policyHistory = [...hist, ...fresh.map(({ year, description }) => ({ year, description }))]
        .sort((a, b) => a.year - b.year);
    }
  }
  added += dAdded;
  staged.push({ file, rows, domain: d.id, dAdded });
}

for (const s of staged) console.log("  " + STORE[s.domain].padEnd(16) + "+" + s.dAdded + " rows");
console.log(NL + added + " rows on " + touched + " entries");
console.log("  declined, no instrument named:  " + skippedNoInstrument);
console.log("  declined, year belongs to a figure: " + skippedFigure);
console.log("  declined, opens on a negative:   " + skippedNegative);
console.log("  declined, a state or target not an event: " + skippedState);
console.log("  already on the timeline:        " + skippedHave);
console.log(NL + "SAMPLE - read these before writing:");
samples.forEach(r => console.log("  " + r.year + "  " + r.description.slice(0, 96) + NL + "        <- " + r.from));

if (args.includes("--write")) {
  staged.forEach(s => fs.writeFileSync(s.file, JSON.stringify(s.rows, null, 1) + NL));
  console.log(NL + "  written");
} else {
  console.log(NL + "  (dry run - pass --write)");
}
