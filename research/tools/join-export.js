// One row per unit: every coded column beside that unit's policy history.
//
//     node research/tools/join-export.js <domain> [--all] [--out file.csv]
//     node research/tools/join-export.js dld --all --out dld-join.csv
//     node research/tools/join-export.js indigenous --fields standing,mediumOfInstruction
//
// The join this is for is "does a system that changed its rule in 2016 code
// differently from one that changed it in 1996", and every piece of it already
// existed -- the codings in entry.coding, the dated rows in entry.policyHistory,
// the operation on each of those rows, and the attributions in
// data/field-sources.json. What did not exist was a shape you can put in a
// spreadsheet without writing the join yourself each time.
//
// National units only unless --all, following coding-crosstab.js: a sub-national
// unit with nothing of its own inherits its country's record, and counting the
// inheritance as a second observation doubles a country's weight.
//
// ---------------------------------------------------------------------------
// FOUR THINGS IN HERE ARE CLAIMS, NOT READINGS, AND EACH IS REVERSIBLE
// ---------------------------------------------------------------------------
//
// 1. AN INSTRUMENT-GRAINED FIELD HAS TO BE REDUCED to say anything per system.
//    legalEntitlement holds one row per instrument and a country can name a
//    constitution and a statute with different answers in every column. So a
//    categorical column emits every distinct value joined by " | ", and an
//    ORDINAL one also emits _max and _min. `obliges_max` answers "what is the
//    strongest thing any instrument here promises"; `obliges_min` answers
//    "what does the weakest one promise", and they are different questions.
//    The column count says how many rows were reduced, so a reader can see
//    when a single value is a single instrument rather than agreement.
//
// 2. A STATE COLUMN SITS BESIDE EVERY FIELD, because the first cross I ran on
//    this data was misleading without one: 44 of the 48 dld units with NO
//    policy history sat at obliges 1 or 2, which looks like a finding about
//    weak entitlements and is a fact about attention -- a thin entry is thin on
//    both sides at once. Hold `_state` out, or filter on it, before reading
//    anything into a row that is mostly empty.
//
// 3. HISTORY YEARS ARE SPLIT BY FIELD where the coding says which question a
//    row changed. `<field>_hist_years` is the years of rows tied to THAT field;
//    `hist_years_system_wide` is the rows that changed everything at once, and
//    they are kept apart because adding them to every field would manufacture
//    the co-occurrence anyone doing this analysis is looking for. Coverage
//    varies by map and the export does not hide it: indigenous, fl and he tie
//    every row to a field, dld ties 17% and eal 34%, because on those two the
//    prose mostly does not say (see hist-field-probe.js).
//
// 4. A YEAR IS THE YEAR THE ROW CARRIES. Nothing here dates a coding: the
//    coding describes the entry's text as it stands today, and a 1996 row in
//    the same entry is not evidence about what the rule was in 1996. The
//    honest question this supports is "what does a system that has moved
//    recently look like now", not "what did it look like then".
const fs = require("fs");
const path = require("path");
const { pathFor, fileFor } = require("./datafile.js");
const { DOMAINS } = require("../../src/domains.js");
const { SCHEMES } = require("../../src/coding.js");

const NL = String.fromCharCode(10);
const root = path.join(__dirname, "..", "..");
const argv = process.argv.slice(2);
const arg = n => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : null; };
const domainId = argv.find(a => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--out"
  && argv[argv.indexOf(a) - 1] !== "--fields");
const ALL = argv.includes("--all");
const OUT = arg("--out");
const ONLY = (arg("--fields") || "").split(",").map(s => s.trim()).filter(Boolean);

const domain = DOMAINS.find(d => d.id === domainId);
if (!domain) {
  console.error("usage: join-export.js <domain> [--all] [--fields a,b] [--out file.csv]");
  console.error("domains: " + DOMAINS.filter(d => d.live && fileFor(d.id)).map(d => d.id).join(", "));
  process.exit(2);
}

const NOT_ESTABLISHED_RE = /^Not established from the sources consulted/i;
const NOT_APPLICABLE_RE = /^Not applicable\b/i;

let FIELD_SOURCES = {};
try { FIELD_SOURCES = require("../../data/field-sources.json")[domain.id] || {}; } catch { /* not built */ }

const rows = JSON.parse(fs.readFileSync(pathFor(domain.id), "utf8"))
  .filter(e => ALL || e.isNational);

// ---- what state a field is in, the same five the maps and /views use --------
function stateOf(e, key) {
  const v = e[key];
  if (Array.isArray(v)) return v.length ? "has" : (e.absences && e.absences[key] ? "absent" : "none");
  if (typeof v !== "string" || !v.trim()) return e.absences && e.absences[key] ? "absent" : "none";
  if (NOT_APPLICABLE_RE.test(v)) return "na";
  if (NOT_ESTABLISHED_RE.test(v)) return "looked";
  return e.absences && e.absences[key] ? "absent" : "has";
}

// ---- the coded columns of one field, reduced where the field is many-grained -
const fieldKeys = domain.fields.map(f => f[0]).filter(k => !ONLY.length || ONLY.includes(k));
const codedFields = fieldKeys.filter(k => SCHEMES[domain.id + "." + k] && k !== "policyHistory");

/** Every column a scheme declares, minus the ones that only identify a row. */
function columnsOf(key) {
  const s = SCHEMES[domain.id + "." + key] || {};
  const keyCols = new Set(s.keyColumns || []);
  return Object.keys(s.columns || {}).filter(c => !keyCols.has(c));
}
const isOrdinal = (key, col) => ((SCHEMES[domain.id + "." + key] || {}).ordinal || []).includes(col);
const isMany = key => !!(SCHEMES[domain.id + "." + key] || {}).many;

/** One coding cell as text: a list joins with ";", a scalar is itself. */
const cell = v => Array.isArray(v) ? v.join("; ") : (v == null ? "" : String(v));

// ---- history, summarised ----------------------------------------------------
const OPERATIONS = Object.keys(((SCHEMES[domain.id + ".policyHistory"] || {}).columns || {}).operation || {});
const opCol = v => "hist_op_" + v.replace(/[^a-z0-9]+/gi, "_");

function historyOf(e) {
  const hist = Array.isArray(e.policyHistory) ? e.policyHistory : [];
  const coded = Array.isArray(e.coding && e.coding.policyHistory) ? e.coding.policyHistory : [];
  const years = hist.map(h => Number(h.year)).filter(y => y && !isNaN(y)).sort((a, b) => a - b);
  const out = {
    hist_rows: hist.length,
    hist_coded: coded.filter(c => c && (c.operation || c.not_an_operation)).length,
    hist_first_year: years.length ? years[0] : "",
    hist_last_year: years.length ? years[years.length - 1] : "",
    hist_span: years.length ? years[years.length - 1] - years[0] : "",
    hist_years: [...new Set(years)].join(";"),
    hist_years_system_wide: "",
    hist_fields_touched: "",
    hist_scope_change: "",
  };
  for (const v of OPERATIONS) out[opCol(v)] = 0;
  for (const c of coded) if (c && c.operation && out[opCol(c.operation)] != null) out[opCol(c.operation)]++;

  // The years each FIELD was touched, from the coding row that carries both.
  // A coding row is tied to a history row by year, so the year is in hand
  // without re-matching the description.
  const byField = {}, sysYears = new Set(), touched = new Set(), scopes = new Set();
  for (const c of coded) {
    if (!c) continue;
    const y = Number(c.year);
    for (const s of [].concat(c.scope_change || [])) scopes.add(s);
    for (const f of [].concat(c.fields_touched || [])) {
      touched.add(f);
      if (f === "system-wide") { if (y) sysYears.add(y); continue; }
      if (f === "not determined") continue;
      (byField[f] = byField[f] || new Set()).add(y || "");
    }
  }
  out.hist_years_system_wide = [...sysYears].sort((a, b) => a - b).join(";");
  out.hist_fields_touched = [...touched].sort().join("; ");
  out.hist_scope_change = [...scopes].sort().join("; ");
  return { out, byField };
}

// ---- build ------------------------------------------------------------------
const records = [];
for (const e of rows) {
  const { out: hist, byField } = historyOf(e);
  const unitKey = `${e.countryCode}|${e.unitName}`;
  const tally = { has: 0, absent: 0, looked: 0, na: 0, none: 0 };
  const r = {
    code: e.countryCode, unit: e.unitName,
    level: e.isNational ? "national" : "sub-national",
    region: e.region || "", subregion: e.subregion || "",
    status: e.status || "", confidence: e.confidence || "", last_verified: e.lastVerified || "",
    docs: (e.docLinks || []).length,
  };

  for (const k of fieldKeys) {
    const st = stateOf(e, k);
    tally[st] = (tally[st] || 0) + 1;
    r[k + "_state"] = st;
    r[k + "_src"] = ((FIELD_SOURCES[unitKey] || {})[k] || []).length;
    r[k + "_hist_years"] = [...(byField[k] || [])].filter(Boolean).sort((a, b) => a - b).join(";");
  }

  for (const k of codedFields) {
    const c0 = (e.coding || {})[k];
    const many = isMany(k);
    const list = many ? (Array.isArray(c0) ? c0 : []) : (c0 ? [c0] : []);
    if (many) r[k + "__rows"] = list.length;
    for (const col of columnsOf(k)) {
      const vals = list.map(x => cell(x && x[col])).filter(v => v !== "");
      const distinct = [...new Set(vals)];
      r[k + "__" + col] = distinct.join(" | ");
      if (many && isOrdinal(k, col)) {
        const nums = vals.map(Number).filter(v => !isNaN(v));
        r[k + "__" + col + "_max"] = nums.length ? Math.max(...nums) : "";
        r[k + "__" + col + "_min"] = nums.length ? Math.min(...nums) : "";
      }
    }
  }

  Object.assign(r, {
    n_fields: fieldKeys.length,
    n_has: tally.has, n_absent: tally.absent, n_looked: tally.looked,
    n_na: tally.na, n_none: tally.none,
  }, hist);
  records.push(r);
}

// Header from the union, in first-seen order, so a column that only some units
// have does not silently drop the rest of the row out of alignment.
const header = [];
for (const r of records) for (const k of Object.keys(r)) if (!header.includes(k)) header.push(k);

const q = v => {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = [header.join(",")]
  .concat(records.map(r => header.map(k => q(r[k])).join(",")))
  .join(NL) + NL;

if (OUT) {
  fs.writeFileSync(path.isAbsolute(OUT) ? OUT : path.join(root, OUT), csv);
  console.log(`wrote ${OUT}: ${records.length} units, ${header.length} columns`);
} else {
  process.stdout.write(csv);
}

// A short account on stderr, so piping the CSV somewhere still tells you what
// the join can and cannot carry for this map.
const tied = records.reduce((n, r) => n + (r.hist_fields_touched ? 1 : 0), 0);
const withHist = records.filter(r => r.hist_rows > 0).length;
console.error(`${NL}${domain.id}: ${records.length} units${ALL ? "" : " (national only; --all for every unit)"}`);
console.error(`  with policy history:        ${withHist}`);
console.error(`  history tied to a field:    ${tied}`);
console.error(`  coded fields exported:      ${codedFields.length} of ${fieldKeys.length}`);
