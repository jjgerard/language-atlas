// Does each coded NEGATIVE say what the negative IS?
//
//     node negative-audit.js                      # the counts
//     node negative-audit.js --list B             # which entry-fields are in a bucket
//     node negative-audit.js --dump eal.l2Support # the prose, ready to read
//     node negative-audit.js --dump eal.l2Support,eal.l1Support > batch.txt
//
// THE RULE THIS ENFORCES, set by the maintainer on 2026-09-28: "we checked and
// there's nothing there" is not a coded value. A negative is worth recording
// when it says what the negative IS -- the legislation makes no provision, the
// profile runs through provision and names none. Where all that can honestly be
// said is that a search came up empty, the value belongs at `not stated`, or
// uncoded, rather than dressed as a finding about the system. A label whose
// subject is the CHECKING reads as though nobody looked hard enough.
//
// The three gradings a reader gives, and they are a READER'S job:
//
//   A  a source states the absence. The instrument was read, or a profile
//      covers the ground, and it records that there is none. Keep the value.
//   B  a search failed. The subject of the sentence is the search -- "no X was
//      found", "none could be located", "not retrieved". Recode to `not stated`
//      and say so, because the system may well provide the thing.
//   C  the prose says neither, and somebody has to go back to the source.
//
// WHY THE BUCKETS BELOW ARE NOT THOSE GRADINGS. This file sorts by WORDING, and
// wording is exactly what this repo has been fooled by: a matcher over prose
// fired on negations and swung a count 5x, and a keyword split of "provision
// for another population" was off by the same order. So the buckets are a place
// to start reading, in reading order, and the file says so in its own output.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));
const { fileFor } = require("./datafile");

// Every value across the vocabularies that asserts an absence.
const NEG = /^(none established|none in use|not taught|none|none reported|none located|none named|no programme found|no body named|not a medium)$/i;
// The subject of the sentence is the SEARCH.
const SEARCHY = /\b(no\w* (?:was |were )?(?:found|located|identified|retrieved|traced|reached)|not (?:found|located|identified|retrieved|established|reached)|could not be|nothing (?:found|located)|does not seem|no evidence|no source|not appear)\b/i;
// An instrument is named in the same field. Necessary for A, nowhere near sufficient.
const NAMED = /\b(Act|Law|Ley|Loi|Lei|Decree|Decreto|Décret|Constitution|Code|Regulation|Statute|Ordinance|Policy|Framework|Curriculum|Circular|Order|Charter|Convention|Article|art\.|s\.\d|section)\b/i;

const txt = v => Array.isArray(v)
  ? v.map(x => typeof x === "string" ? x : (x && x.text) || "").join(NL)
  : String(v || "");

function negValues(cd) {
  const out = [];
  for (const r of (Array.isArray(cd) ? cd : [cd])) {
    for (const [col, v] of Object.entries(r || {}))
      for (const x of [].concat(v))
        if (typeof x === "string" && NEG.test(x)) out.push(col + " = " + x);
  }
  return out;
}

const rows = [];
for (const d of DOMAINS) {
  const f = fileFor(d.id);
  if (!f) continue;
  const p = path.join(ATLAS, "data", f);
  if (!fs.existsSync(p)) continue;
  for (const e of JSON.parse(fs.readFileSync(p, "utf8"))) {
    for (const [fk, cd] of Object.entries(e.coding || {})) {
      const neg = negValues(cd);
      if (!neg.length) continue;
      const prose = txt(e[fk]);
      const searchy = SEARCHY.test(prose), named = NAMED.test(prose);
      rows.push({
        field: d.id + "." + fk,
        key: e.countryCode + "|" + e.unitName,
        national: !!e.isNational,
        neg: neg,
        prose: prose.split(NL).filter(l => l.trim()),
        links: (e.docLinks || []).map(l => l.url),
        bucket: !prose.trim() ? "C" : (named && !searchy) ? "A" : (searchy && !named) ? "B" : "?",
      });
    }
  }
}

const args = process.argv.slice(2);
const dump = (args.find(a => a.indexOf("--dump") === 0) || "").split("=")[1]
  || (args[args.indexOf("--dump") + 1] && args.indexOf("--dump") >= 0 ? args[args.indexOf("--dump") + 1] : null);
const list = args.indexOf("--list") >= 0 ? args[args.indexOf("--list") + 1] : null;

if (dump) {
  const want = new Set(dump.split(","));
  const mine = rows.filter(r => want.has(r.field) && r.bucket === "?");
  console.log("# " + mine.length + " entry-fields to grade, over " + want.size + " field(s)");
  console.log("# Grade each A (a source states the absence), B (a search came up empty)");
  console.log("# or C (the prose says neither and the source must be re-read)." + NL);
  for (const r of mine) {
    console.log("=== " + r.key + "   " + r.field + (r.national ? "" : "   (sub-national)"));
    console.log("    coded: " + r.neg.join("; "));
    r.prose.forEach(l => console.log("    | " + l));
    r.links.slice(0, 4).forEach(u => console.log("    src " + u));
    console.log();
  }
} else if (list) {
  rows.filter(r => r.bucket === list).forEach(r => console.log("  " + r.field.padEnd(34) + r.key));
} else {
  const by = { A: 0, B: 0, "?": 0, C: 0 };
  for (const r of rows) by[r.bucket]++;
  console.log("ENTRY-FIELDS CARRYING A NEGATIVE CODED VALUE: " + rows.length + NL);
  console.log("  A  names an instrument, no search-failure wording   " + String(by.A).padStart(4));
  console.log("  B  search-failure wording, NO instrument named      " + String(by.B).padStart(4));
  console.log("  ?  both, so it needs a reader                       " + String(by["?"]).padStart(4));
  console.log("  C  no prose at all                                  " + String(by.C).padStart(4));
  console.log(NL + "  SORTED BY WORDING, which is what this repo has been fooled by before.");
  console.log("  A place to start reading, not a result." + NL);
  const perField = {};
  for (const r of rows) if (r.bucket === "?") perField[r.field] = (perField[r.field] || 0) + 1;
  console.log("  the ? pile, by field:");
  Object.entries(perField).sort((a, b) => b[1] - a[1])
    .forEach(([k, n]) => console.log("    " + k.padEnd(34) + String(n).padStart(4)));
}
