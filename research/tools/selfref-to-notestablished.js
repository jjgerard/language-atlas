// Convert a field that only explains why it is empty into the third state.
//
//     node selfref-to-notestablished.js            # dry run, shows every change
//     node selfref-to-notestablished.js --write
//
// Some fields hold four bullets about the ENTRY rather than about the place:
//
//   The entry's only cited link cannot answer this and no bullet should be
//   drawn from it
//   It resolves to an OECD catalogue page, not to Table I.B1.7.57
//   'immigrant', 'bilingual' and 'newcomer' each return 0 hits on it
//   The entry needs a different source before this field can be filled
//
// The source is real and is on the entry's docLinks. What is wrong is that the
// field is being used to narrate why it cannot be filled, and hasContent()
// reads that as the field being FULL -- so Japan showed as documented on
// newcomerCriteria when nothing about Japan had been established.
//
// derive.js already has the right state for this. The sentinel in front, the
// source named, and the reason kept, kills the false coverage without losing
// anything a reader would want.
//
// WHAT IS KEPT AND WHAT IS DROPPED. Two kinds of line live in these fields. One
// says why the source cannot answer the question -- a reader wants that. The
// other is a note to whoever drafts this next: "no bullet should be drawn from
// it", "the entry needs a different source before this field can be filled".
// That belongs in nobody's entry. The first is kept, the second dropped, and
// the source is named from docLinks, which adds no claim about the place
// because it is already on the entry.
//
// ONLY fields where EVERY bullet is self-referential are touched. One real
// bullet and the field is left alone, because then the note is a hedge on real
// content rather than a substitute for it.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
// Adding `he` broke this: the map was hand-maintained, the new domain was not
// in it, and the tool died on path.join(undefined) partway through a run --
// after it had already reported on eal, so a --write would have converted one
// domain and then crashed. Derive the filename instead, the same way store.js
// resolves a domain's data: the living snapshot if there is one, else the seed.
function fileFor(id) {
  for (const name of [id + ".json", id + ".seed.json"])
    if (fs.existsSync(path.join(ATLAS, "data", name))) return name;
  return null;
}
const NL = String.fromCharCode(10);
const { hasContent } = require(path.join(ATLAS, "src", "derive"));
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));

const write = process.argv.includes("--write");
const SENTINEL = "Not established from the sources consulted.";

// A bullet is self-referential when it talks about the entry, the link or the
// search rather than about the place.
const SELF = new RegExp([
  "this entry", "the entry", "entry cites", "entry needs", "cited link",
  "cited source", "no cited", "the cited", "returns? 0 hits", "0 hits",
  "catalogue page", "landing page", "not retriev", "unfillable", "not filled",
  "this session", "this pass", "no bullet", "before this field",
  "should be written", "not the data annex", "does not resolve", "404",
].join("|"), "i");

// A note to the next drafter, rather than a reason a reader needs.
const TODO = new RegExp([
  "no bullet should", "should be drawn", "needs a different source",
  "needs a [a-z]+ source", "before this field can", "should be written into",
  "is needed before", "cannot answer this and",
].join("|"), "i");

// An absence or a process note, as opposed to a statement of fact.
const OPENS_NEGATIVE = new RegExp("^(no|not|none|neither|nothing|unfillable|unable)\\b", "i");

const TRAILING = new RegExp("[;,]\\s*$");
const ENDS_SENTENCE = new RegExp("[.!?]$");

let touched = 0;
for (const d of DOMAINS.filter(x => x.live)) {
  const name = fileFor(d.id);
  if (!name) { console.log("--- " + d.id + ": no data file, skipped"); continue; }
  const p = path.join(ATLAS, "data", name);
  const rows = JSON.parse(fs.readFileSync(p, "utf8"));
  let n = 0;
  for (const e of rows) {
    for (const [k, , t] of d.fields) {
      if (t !== "text" || !hasContent(e[k])) continue;
      const lines = String(e[k]).split(NL).map(x => x.trim()).filter(Boolean);
      if (!lines.length || !lines.every(l => SELF.test(l))) continue;

      // A one-line field is the dangerous case, because SELF matches on words
      // like "the entry" that a perfectly good fact can also contain. Nigeria's
      // localTerm reads "'indigenous languages' is the term the entry attributes
      // to the 2022 policy" -- that IS the answer to what the system calls these
      // languages, and converting it would have destroyed the field.
      //
      // So a single line converts only when it opens as an absence or a process
      // note. Multi-line fields are safe without this: nothing states a fact
      // four times over while every line talks about the entry.
      if (lines.length === 1 && !OPENS_NEGATIVE.test(lines[0])) {
        console.log("SKIP  " + d.id + "  " + e.countryCode + "|" + e.unitName + " / " + k +
          "  -- one line and it states something: " + lines[0].slice(0, 70));
        console.log();
        continue;
      }

      const reasons = lines.filter(l => !TODO.test(l))
        .map(l => l.replace(TRAILING, ""))
        .map(l => (ENDS_SENTENCE.test(l) ? l : l + "."));

      // Naming the source earns its place when there are one or two of them,
      // because then the reader learns which document failed to answer. Past
      // that it is a wall of titles the entry already shows under SOURCES --
      // Alberta has seven, three of them the same Guide to Education -- so the
      // reason stands on its own instead.
      const labels = [...new Set((e.docLinks || [])
        .map(l => String(l.label).split(":")[0].split(" - ")[0].split(" — ")[0].trim())
        .filter(Boolean))];
      const named = labels.length === 1
        ? "The only source on this entry is " + labels[0] + "."
        : labels.length === 2
          ? "The sources on this entry are " + labels.join(" and ") + "."
          : "";

      const next = [SENTINEL, named].concat(reasons).filter(Boolean).join(" ");

      console.log(d.id + "  " + e.countryCode + "|" + e.unitName + " / " + k +
        "   " + lines.length + " bullets, " + (e.docLinks || []).length + " docLinks kept");
      console.log("   => " + next);
      console.log();
      if (write) e[k] = next;
      n++; touched++;
    }
  }
  if (write && n) fs.writeFileSync(p, JSON.stringify(rows, null, 1) + NL);
  if (n) console.log("--- " + d.id + ": " + n + " field(s)" + NL);
}
console.log((write ? "WROTE " : "DRY RUN ") + touched + " field(s) converted to the not-established state");
if (!write) console.log("re-run with --write to apply");
