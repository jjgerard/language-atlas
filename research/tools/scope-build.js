// Fold research/scope-change.decisions.json into per-domain coding files.
//
//     node research/tools/scope-build.js --list            (print the candidates with their index)
//     node research/tools/scope-build.js --emit <outdir>   (write one coding json per domain)
//
// The decisions file is keyed by POSITION in the candidate list, which is only
// safe while the list is generated the same way every time -- so the enumeration
// lives here, once, and both modes call it. `--list` reprints exactly what was
// read when the decisions were made, which is the check that the keys still
// point at the rows they were written against.
//
// As everywhere on this scheme, apply-coding.js REPLACES a `many` array rather
// than merging it, so each entry is re-emitted whole: operation,
// not_an_operation and fields_touched are carried forward untouched and only
// scope_change is added.
const fs = require("fs");
const path = require("path");
const { pathFor } = require("./datafile.js");
const { SCOPE_CHANGE } = require(path.join(__dirname, "..", "..", "src", "coding.js"));

const DOMAINS = ["eal", "dld", "indigenous", "fl", "he"];
const key60 = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 60).trim();
const norm = s => String(s || "").replace(/\s+/g, " ").trim();

// Refined after reading 368 rows from a deliberately wider net. The grade-range
// marker was dropped because a grade range is a scope STATEMENT rather than a
// change, and it produced 67 misses out of 67.
const RE = [
  /\b(extend\w*|broaden\w*|narrow\w*|restrict\w*|widen\w*|expand\w*)\b/i,
  /\b(becomes?|became|made|rendered|now)\s+\w{0,8}\s?(mandatory|compulsory|obligatory|binding|optional|voluntary|elective)\b/i,
  /\b(no longer|ceases? to be|discontinu\w*|dropped|abolish\w*|repeal\w*)\b[^.;]{0,40}\b(mandatory|compulsory|required|requirement|medium|subject)\b/i,
  /\b(raised|lowered|relaxed|tightened|reduced|increased|moved|cut)\b[^.;]{0,60}\bfrom\b[^.;]{0,30}\bto\b/i,
  /\b(rolled out|phased in|scaled up|nationwide|island-wide|country-wide)\b/i,
  /\bopened? (?:up )?to\b/i, /\bapplies? (?:also )?to\b/i, /\bbrought (?:in|within) (?:the )?scope\b/i,
];

/** Every entry of every domain, with its history rows keyed as the coder keys them. */
function corpus() {
  const out = [];
  for (const d of DOMAINS)
    for (const e of JSON.parse(fs.readFileSync(pathFor(d), "utf8"))) {
      const hist = Array.isArray(e.policyHistory) ? e.policyHistory : [];
      if (!hist.length) continue;
      const coded = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
      const seen = {};
      const rows = hist.map(h => {
        const desc = norm(h.description), k = key60(desc), kk = norm(h.year) + "|" + k;
        seen[kk] = (seen[kk] || 0) + 1;
        const prior = coded.find(c => String(c.year) === String(h.year) && String(c.matches) === k
          && Number(c.occurrence || 1) === seen[kk]) || null;
        return { year: norm(h.year), matches: k, occurrence: seen[kk], desc, prior };
      });
      out.push({ d, region: e.region, cc: e.countryCode, unit: e.unitName, rows });
    }
  return out;
}

/** The candidate list, in the one order the decisions file is keyed against. */
function candidates(c) {
  const out = [];
  for (const e of c)
    for (const r of e.rows)
      if (RE.some(x => x.test(r.desc)))
        out.push(Object.assign({ d: e.d, region: e.region, cc: e.cc, unit: e.unit,
          id: [e.d, e.cc, e.unit, r.year, r.matches, r.occurrence].join("|") }, r));
  out.sort((a, b) => (a.d + a.cc + a.year).localeCompare(b.d + b.cc + b.year));
  return out;
}

const c = corpus(), cand = candidates(c);

if (process.argv.includes("--list")) {
  cand.forEach((o, i) => console.log(i + "  [" + o.d + "/" + o.region + "] " + o.cc + " " + o.unit
    + " " + o.year + " {" + ((o.prior && (o.prior.operation || o.prior.not_an_operation)) || "UNSET") + "}\n     "
    + o.desc.slice(0, 185)));
  console.log("\nTOTAL " + cand.length);
  process.exit(0);
}

const outDir = process.argv[process.argv.indexOf("--emit") + 1];
if (!outDir || outDir === "--emit") { console.error("usage: scope-build.js --emit <outdir>"); process.exit(2); }

const dec = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "scope-change.decisions.json"), "utf8"));
// A decision keyed past the end of the list means the list moved under it.
for (const k of Object.keys(dec)) {
  if (k.startsWith("_")) continue;
  if (!cand[+k]) { console.error("decision " + k + " has no candidate -- the list changed"); process.exit(1); }
  for (const v of dec[k]) if (!(v in SCOPE_CHANGE)) { console.error("not a SCOPE_CHANGE value: " + v); process.exit(1); }
}

// Keyed by the row's own key, NOT by object identity: candidates() copies each
// row, so a Map keyed on the object silently matches nothing and writes zero.
const chosen = new Map();
for (const [k, v] of Object.entries(dec)) if (!k.startsWith("_")) chosen.set(cand[+k].id, v);

const files = {}, tally = {};
let coded = 0;
for (const e of c) {
  const arr = [];
  let touched = false;
  for (const r of e.rows) {
    const row = Object.assign({}, r.prior, { year: r.year, matches: r.matches, occurrence: r.occurrence });
    const v = chosen.get([e.d, e.cc, e.unit, r.year, r.matches, r.occurrence].join("|"));
    if (v) { row.scope_change = v; coded++; touched = true; for (const x of v) tally[x] = (tally[x] || 0) + 1; }
    if (Object.keys(row).some(k => k !== "year" && k !== "matches" && k !== "occurrence")) arr.push(row);
  }
  if (touched && arr.length) {
    (files[e.d] = files[e.d] || {})[e.cc + "|" + e.unit] = { policyHistory: arr };
  }
}

for (const d of DOMAINS) {
  const f = path.join(outDir, "scope-" + d + ".json");
  if (!files[d]) { console.log(d + ": no rows"); continue; }
  fs.writeFileSync(f, JSON.stringify(files[d], null, 1) + "\n");
  console.log(d + ": " + Object.keys(files[d]).length + " entries -> " + path.relative(process.cwd(), f));
}
console.log("\n" + coded + " rows carry scope_change; " + cand.length + " candidates read, "
  + (cand.length - chosen.size) + " deliberately excluded");
for (const k of Object.keys(SCOPE_CHANGE)) console.log("  " + k.padEnd(20) + String(tally[k] || 0).padStart(4));
