// Resolve a date for an instrument an entry already names, using a sibling map.
//
//     node hist-cross-domain.js            # dry run, prints every proposal
//     node hist-cross-domain.js --write
//
// A country's framework education act governs more than one of these maps. It
// is routinely dated in the map whose researcher happened to read it and absent
// from its siblings: Liberia's Education Reform Act is dated 2011 in dld and
// named without a year in four fl fields; the Northwest Territories' Official
// Languages Act is dated 1984 in fl and named without a year in eal.
//
// WHAT THIS DOES NOT DO. It never asserts that an act governs a domain. That
// judgement is the entry writer's and it has already been made -- the rule only
// fires when the TARGET entry's own prose names the instrument, in its own
// words, in a field a human wrote. All that crosses the boundary is the year.
//
// The row published is the target entry's own sentence, not the sibling's, so
// the claim on the timeline is the claim that entry already makes and traces to
// that entry's docLinks in the ordinary way. Only the date is borrowed, and the
// sibling it came from is printed for every proposal so it can be checked.
//
// Precision matters more than yield here, so the instrument test is strict: a
// capitalised multi-word title CONTAINING an instrument noun. A ministry is not
// an instrument, and neither is a pair of language names -- an earlier draft of
// this matched "Greenlandic and Danish" and "Tamil and Telugu" and would have
// dated a language list to whatever year sat beside it in another map.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const { hasContent } = require(path.join(ATLAS, "src", "derive.js"));
// Domain data files are resolved by research/tools/datafile.js, which
// prefers the living snapshot and falls back to the seed. It replaced a
// hand-maintained map here that did not know about the `he` map and threw
// path.join(undefined) the moment one was reached.
const { fileFor } = require("./datafile");
const STORE = new Proxy({}, { get: (_, id) => fileFor(String(id)) });
const NL = String.fromCharCode(10);
const D = ["eal", "dld", "fl", "indigenous"];

// An instrument noun. Wide across languages, because entries quote their sources.
const INSTR = new RegExp([
  "\\bact\\b", "\\blaw\\b", "\\blei\\b", "\\bley\\b", "\\bloi\\b", "\\blov\\b", "\\blegge\\b",
  "\\bdecree\\b", "\\bdecreto\\b", "\\bordinance\\b", "\\border\\b", "\\bcircular\\b",
  "\\bregulation", "\\bstatute", "\\bconstitution", "\\bcharter\\b", "\\bconvention\\b",
  "\\bcode\\b", "\\bresolution\\b", "\\bbill\\b", "\\bstrategy\\b", "\\bframework\\b",
  "\\bprotocol\\b", "\\bproclamation\\b", "\\bgesetz", "\\bustawa\\b", "\\bzakon\\b",
].join("|"), "i");

// A body is not an instrument.
const BODY = new RegExp([
  "\\bministry\\b", "\\bminist", "\\bdepartment\\b", "\\bcouncil\\b", "\\bcommittee\\b",
  "\\bcommission\\b", "\\bagency\\b", "\\bboard\\b", "\\binstitute\\b", "\\boffice\\b",
  "\\buniversity\\b", "\\bcentre\\b", "\\bcenter\\b",
].join("|"), "i");

const YEAR = /\b(1[6-9]\d{2}|20[0-4]\d)\b/;
const norm = s => String(s).toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ").trim();

// Capitalised runs of two or more words that name an instrument.
function instruments(text) {
  const out = new Set();
  const re = /\b([A-ZÀ-ÖØ-Þ][\p{L}''\-]+(?:\s+(?:of|for|on|the|de|del|du|des|la|le|di|na|za|and|[A-ZÀ-ÖØ-Þ0-9][\p{L}\p{N}''\-.\/]*)){1,9})/gu;
  for (const m of String(text).matchAll(re)) {
    const p = m[1].trim().replace(/\s+(and|the|of|for|on)$/i, "");
    if (p.split(/\s+/).length < 2 || p.length < 12) continue;
    if (!INSTR.test(p) || BODY.test(p)) continue;
    out.add(p);
  }
  return out;
}

const write = process.argv.includes("--write");
const entries = {};
for (const d of D) {
  for (const e of JSON.parse(fs.readFileSync(path.join(ATLAS, "data", STORE[d]), "utf8"))) {
    const k = e.countryCode + "|" + e.unitName;
    entries[k] = entries[k] || { name: e.unitName, d: {} };
    entries[k].d[d] = e;
  }
}

const proposals = [];
for (const [, v] of Object.entries(entries)) {
  for (const d of D) {
    const e = v.d[d];
    if (!e) continue;
    const have = new Set((e.policyHistory || []).map(h => Number(h.year)));

    // Instruments dated in this unit's OTHER maps.
    const dated = [];
    for (const o of D) {
      if (o === d || !v.d[o]) continue;
      for (const h of v.d[o].policyHistory || []) {
        for (const p of instruments(h.description)) dated.push({ year: Number(h.year), key: norm(p), label: p, from: o });
      }
    }
    if (!dated.length) continue;

    const fields = DOMAINS.find(x => x.id === d).fields.filter(f => (f[2] || "text") === "text").map(f => f[0]);
    for (const f of fields) {
      if (!hasContent(e[f])) continue;
      for (const line of String(e[f]).split(NL)) {
        if (YEAR.test(line)) continue;          // already dated; the prose pass owns it
        const nl = norm(line);
        for (const s of dated) {
          if (s.key.split(" ").length < 3) continue;   // too short to be a title
          if (!nl.includes(s.key) || have.has(s.year)) continue;
          let desc = line.trim().replace(/\s+/g, " ");
          if (desc.length > 118) desc = desc.slice(0, 115).replace(/[\s,;:]+\S*$/, "") + "…";
          proposals.push({ domain: d, unit: v.name, field: f, year: s.year, description: desc, instrument: s.label, from: s.from });
          have.add(s.year);
          break;
        }
      }
    }
  }
}

// One row per entry-year: several fields of one entry often name the same act.
const seen = new Set();
const rows = proposals.filter(p => {
  const k = p.domain + "|" + p.unit + "|" + p.year;
  if (seen.has(k)) return false;
  seen.add(k); return true;
});

console.log(proposals.length + " line matches -> " + rows.length + " rows" + NL);
for (const r of rows) {
  console.log("  [" + r.domain + "] " + r.unit + "  " + r.year + "   (date from " + r.from + ", instrument: " + r.instrument + ")");
  console.log("      " + r.description);
}

if (write) {
  for (const d of D) {
    const mine = rows.filter(r => r.domain === d);
    if (!mine.length) continue;
    const p = path.join(ATLAS, "data", STORE[d]);
    const store = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const r of mine) {
      const e = store.find(x => x.unitName === r.unit);
      if (!e) { console.log("  no entry for " + r.unit); continue; }
      e.policyHistory = [...(e.policyHistory || []), { year: r.year, description: r.description }]
        .sort((a, b) => a.year - b.year);
    }
    fs.writeFileSync(p, JSON.stringify(store, null, 1) + NL);
  }
  console.log(NL + "  written");
} else {
  console.log(NL + "  (dry run - pass --write)");
}
