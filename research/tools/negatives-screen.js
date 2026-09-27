// Which `not stated` cells might be hiding an answer the entry already gives.
//
//     node research/tools/negatives-screen.js [--domain dld] [--field funding]
//     node research/tools/negatives-screen.js --show dld.funding.family_pays
//
// A negative coding makes one of two claims. `not stated` says the entry was
// READ and does not answer; `none established` and its kin say somebody looked
// and there is nothing there. The first is a fact about the record and the
// second about the system, and only the first can be wrong in the way this
// looks for: a cell coded `not stated` where the entry's own text, on that
// same field, does answer.
//
// It cannot decide that. What it can do is narrow 6,179 negative cells to the
// ones worth a person's attention, by asking whether the field's text contains
// the DISTINCTIVE words of any value the column offers.
//
// THREE THINGS KEEP THE SCREEN FROM CRYING WOLF.
//
// 1. A word is distinctive only if few values share it. `not stated` on
//    `decided_by` should not be flagged because the text says "school", when
//    half the values in that vocabulary mention a school.
//
// 2. Words the vocabulary shares with ordinary policy prose are dropped
//    outright. Every entry in this corpus says "education", "national" and
//    "provision"; matching on those flags everything and means nothing.
//
// 3. A flag is a QUESTION, not a finding. The output prints the line that
//    triggered it so a reader can see in one glance that "the Ministry of
//    Health opens four newborn clinics" is not a funding route. Expect most
//    flags to be wrong; the screen earns its place if the few that are right
//    would not otherwise have been found.
const fs = require("fs");
const path = require("path");
const { SCHEMES } = require("../../src/coding.js");
const { DOMAINS } = require("../../src/domains.js");
const { pathFor, fileFor } = require("./datafile.js");

const NL = String.fromCharCode(10);
const argv = process.argv.slice(2);
const arg = n => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : null; };
const ONLY_DOMAIN = arg("--domain");
const ONLY_FIELD = arg("--field");
const SHOW = arg("--show");            // one domain.field.column, printed in full

// A negative that says THE RECORD is silent. `none established`, `nobody
// named`, `none stated` and the rest say the opposite -- somebody looked --
// and are left alone, because re-checking them is a different job with a
// different burden of proof.
const SILENT = new Set(["not stated", "not available", "unknown", "not recorded",
  "not determined", "silent", "not adjusted", "not measured"]);

const STOP = new Set(("the a an and or of for in on at to by with from under where when this that " +
  "these those it its is are was were be been being has have had no not all any each one two " +
  "may must shall can will would should such other than then there their them they " +
  "education educational school schools pupil pupils child children learner learners student students " +
  "national state public provision provided service services support system systems policy " +
  "only own per rather set stated named names name level levels").split(" "));

const words = s => String(s).toLowerCase().split(/[^a-z0-9]+/)
  .filter(w => w.length > 3 && !STOP.has(w));

const rows = [];
for (const d of DOMAINS.filter(x => x.live)) {
  if (!fileFor(d.id) || (ONLY_DOMAIN && d.id !== ONLY_DOMAIN)) continue;
  const units = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8"));
  for (const [fk] of d.fields) {
    if (ONLY_FIELD && fk !== ONLY_FIELD) continue;
    const sch = SCHEMES[d.id + "." + fk];
    if (!sch || (sch.keyColumns || []).length) continue;   // row-grained: not this job
    for (const [col, def] of Object.entries(sch.columns || {})) {
      if (!def || typeof def !== "object") continue;
      const values = Object.keys(def).filter(v => !SILENT.has(v));
      // How many values carry each word, so a word carried by many is worth
      // nothing as evidence for any one of them.
      const spread = {};
      const byValue = {};
      for (const v of values) {
        const ws = new Set(words(v).concat(words(typeof def[v] === "string" ? "" : (def[v].label || ""))));
        byValue[v] = ws;
        for (const w of ws) spread[w] = (spread[w] || 0) + 1;
      }
      for (const v of values) byValue[v] = [...byValue[v]].filter(w => spread[w] === 1);

      // AND DISTINCTIVE IN THE CORPUS, not only in the vocabulary. The first
      // cut of this flagged 109 redress cells because `consultation right`
      // contributes the word "right", and a field about legal entitlement says
      // "right" on nearly every entry; it flagged funding cells on "means",
      // from `means-tested`, against "the funding MEANS of inclusive
      // education". A word carried by many of the field's own texts is not
      // evidence for the one value that happens to use it. This is the rule
      // attribute-sources.js already applies to source titles, applied here to
      // vocabularies: score on what discriminates.
      const df = {};
      let docs = 0;
      for (const u of units) {
        const t = String(u[fk] == null ? "" : u[fk]);
        if (!t.trim()) continue;
        docs++;
        for (const w of new Set(words(t))) df[w] = (df[w] || 0) + 1;
      }
      const CEILING = Math.max(3, Math.round(docs * 0.12));
      for (const v of values) byValue[v] = byValue[v].filter(w => (df[w] || 0) <= CEILING);

      for (const u of units) {
        const c0 = (u.coding || {})[fk];
        if (!c0) continue;
        const text = String(u[fk] == null ? "" : u[fk]);
        if (!text.trim()) continue;
        const lines = text.split(NL).map(l => l.trim()).filter(Boolean);
        for (const r of (Array.isArray(c0) ? c0 : [c0])) {
          const cur = r && r[col];
          if (cur == null || !SILENT.has(String(cur))) continue;
          for (const v of values) {
            const ws = byValue[v];
            if (!ws.length) continue;
            const line = lines.find(l => { const lw = words(l); return ws.some(w => lw.includes(w)); });
            if (!line) continue;
            rows.push({ id: d.id + "." + fk + "." + col, unit: u.countryCode + "|" + u.unitName,
              was: String(cur), could: v, line });
            break;
          }
        }
      }
    }
  }
}

if (SHOW) {
  const hits = rows.filter(r => r.id === SHOW);
  console.log(`${SHOW}: ${hits.length} cells worth a second look${NL}`);
  for (const h of hits) console.log(`  ${h.unit}${NL}    coded: ${h.was}   could be: ${h.could}${NL}    "${h.line}"`);
} else {
  const by = {};
  for (const r of rows) (by[r.id] = by[r.id] || []).push(r);
  const order = Object.entries(by).sort((a, b) => b[1].length - a[1].length);
  console.log(`${rows.length} silent cells where the field's own text carries a value's distinctive words.${NL}`);
  for (const [id, hits] of order) {
    console.log(`  ${id.padEnd(46)}${String(hits.length).padStart(5)}`);
  }
  console.log(`${NL}  --show <domain.field.column> prints the lines, which is the only way to judge them.`);
}
