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
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const { hasContent } = require(path.join(ATLAS, "src", "derive.js"));
// Domain data files are resolved by research/tools/datafile.js, which
// prefers the living snapshot and falls back to the seed. It replaced a
// hand-maintained map here that did not know about the `he` map and threw
// path.join(undefined) the moment one was reached.
const { fileFor } = require("./datafile");
const STORE = new Proxy({}, { get: (_, id) => fileFor(String(id)) });

// The instrument vocabulary and the decline rules now live in
// hist-guards.js, so hist-from-parts.js reads the same list rather than a
// third copy of it. Nothing about them changed in the move.
const {
  INSTRUMENT, EXTRA, PROGRAMME, EVALUATIVE, NEG_ANY, MEASURED,
  FIGURE, NEGATIVE, STATE_NOT_EVENT, NOT_POLICY, THIS_YEAR,
} = require("./hist-guards");

const { YEAR } = require("./hist-guards");
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
