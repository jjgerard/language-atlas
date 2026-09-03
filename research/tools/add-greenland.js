// Greenland was not on any map. Not a stub -- no unit at all.
//
//     node add-greenland.js            # validate
//     node add-greenland.js --write
//
// The map has ALWAYS drawn Greenland: geometry.json carries a GL country shape,
// and it is a top-level country there rather than a territory of Denmark, so it
// was never wrongly inheriting Danish policy. It just had no entry behind it,
// which painted the largest island on the map as permanently blank and
// unclickable.
//
// A unit is added to all four stores at once, per the rule that a place split
// for one question is split for all of them. Three of the four are seeded as
// honest stubs.
//
// WHAT IS DOCUMENTED IS ONLY WHAT WAS VERIFIED. The Greenland Self-Government
// Act carries the language provision in Chapter 7:
//
//     § 20. Det grønlandske sprog er det officielle sprog i Grønland.
//
// read from the Act's own PDF on retsinformation.dk in session. That supports
// `standing` and one dated row, and nothing further.
//
// It does NOT support medium of instruction or the school subject, which is
// where a Greenland entry ought to be strongest. Those live in Inatsisartut's
// own legislation on nalunaarutit.gl, which serves a JavaScript application and
// returned no document text; retsinformation carries Danish law and rejected
// every Greenland ELI tried. So those fields stay empty and the stubNote says
// what was tried, rather than being filled from what the writer happens to
// believe about Greenlandic schooling.
const fs = require("fs");
const path = require("path");

const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const LIVE = DOMAINS.filter(d => d.live);
// Domain data files are resolved by research/tools/datafile.js, which
// prefers the living snapshot and falls back to the seed. It replaced a
// hand-maintained map here that did not know about the `he` map and threw
// path.join(undefined) the moment one was reached.
const { fileFor } = require("./datafile");
const STORE = new Proxy({}, { get: (_, id) => fileFor(String(id)) });

const CC = "GL", NAME = "Greenland";
const SELFGOV = {
  label: "Lov om Grønlands Selvstyre (Act on Greenland Self-Government), Act No. 473 of 12 June 2009, ch. 7 § 20",
  url: "https://www.retsinformation.dk/eli/lta/2009/473/pdf",
};

const TRIED = "Not yet documented. Greenland's own school legislation is held by Inatsisartut on nalunaarutit.gl, which serves a JavaScript application and returned no document text; retsinformation.dk carries Danish law and has no entry under a Greenland identifier. The Self-Government Act's language provision is recorded on the Indigenous and regional languages map. If you teach, plan or research language provision in Greenland, please add what you know.";

const DOCUMENTED = {
  indigenous: {
    status: "partial",
    confidence: "official-document",
    by: "Read from the Act's own text on retsinformation.dk (2026)",
    docLinks: [SELFGOV],
    stubNote: "",
    fields: {
      standing: [
        "Greenlandic is the official language of Greenland",
        "Self-Government Act 2009 ch. 7 § 20, one sentence and no qualification",
        "The Act names no other language and gives Danish no status of its own",
      ],
      localTerm: [
        "The Act's own words are 'det grønlandske sprog', the Greenlandic language",
        "It is the language of the majority here, not of a minority",
      ],
    },
    history: [
      { year: 2009, description: "Act on Greenland Self-Government, ch. 7 § 20: Greenlandic is the official language of Greenland" },
    ],
  },
};

const LIMIT = 96;
const problems = [];
const written = [];

for (const d of LIVE) {
  const file = path.join(ATLAS, "data", STORE[d.id]);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  if (rows.some(r => r.countryCode === CC)) { problems.push(d.id + ": " + CC + " already present"); continue; }

  const doc = DOCUMENTED[d.id];
  const row = {
    countryCode: CC,
    unitName: NAME,
    isNational: true,
    region: "Americas",
    subregion: "Northern America",
    status: doc ? doc.status : "stub",
    confidence: doc ? doc.confidence : "unverified-submission",
    lastVerified: doc ? "2026-08" : "",
    collaborators: [],
    docLinks: doc ? doc.docLinks : [],
    supportLinks: [],
    sourceLanguageNote: doc ? "The Act is cited in Danish, its language of enactment" : "",
    stubNote: doc ? doc.stubNote : TRIED,
    by: doc ? doc.by : "",
  };
  // Every field the domain declares, in its declared order, so the row has the
  // same shape as the 336 already there.
  for (const [k, , type] of d.fields) {
    if (type === "history" || type === "series" || type === "languages") row[k] = [];
    else row[k] = "";
  }
  if (doc) {
    for (const [k, bullets] of Object.entries(doc.fields || {})) {
      if (!Object.prototype.hasOwnProperty.call(row, k)) { problems.push(d.id + ": no field " + k); continue; }
      bullets.forEach(b => {
        if (b.length > LIMIT) problems.push(d.id + "/" + k + ": " + b.length + " chars - " + b.slice(0, 50));
        if (/[.;]$/.test(b)) problems.push(d.id + "/" + k + ": ends with punctuation");
      });
      if (bullets.length > 5) problems.push(d.id + "/" + k + ": " + bullets.length + " bullets");
      row[k] = bullets.join(NL);
    }
    if (doc.history) row.policyHistory = doc.history;
  }

  // Slot it where the file is already ordered, rather than at the end.
  const at = rows.findIndex(r => r.countryCode > CC);
  if (at < 0) rows.push(row); else rows.splice(at, 0, row);
  written.push({ file, rows, domain: d.id, filled: Object.keys(doc ? doc.fields || {} : {}).length });
}

if (problems.length) {
  console.log("PROBLEMS - nothing written:");
  problems.forEach(p => console.log("  " + p));
  process.exit(1);
}

for (const w of written) {
  console.log("  " + STORE[w.domain].padEnd(16) + "+1 unit (" + w.rows.length + " total), " + w.filled + " fields written");
}
if (process.argv.includes("--write")) {
  written.forEach(w => fs.writeFileSync(w.file, JSON.stringify(w.rows, null, 1) + NL));
  console.log("  written");
} else {
  console.log("  (dry run - pass --write)");
}
