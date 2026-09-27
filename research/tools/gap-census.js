// Count the four resolvable gap states across EVERY domain, field and coded
// column, so a plan to close them rests on numbers rather than on whichever
// map happened to be on screen.
//
//     node research/tools/gap-census.js            # every domain
//     node research/tools/gap-census.js eal        # one domain
//     node research/tools/gap-census.js --units eal.newcomerCriteria.designation
//
// THE FOUR STATES, and why they are not one problem. The map key draws them as
// four rows and a reader reasonably asks "can these be fixed"; the answer is
// different for each, and the difference is what this counts.
//
//   LOOKED      the field holds the third-state sentinel. Somebody researched
//               it and could not establish it either way. Fixed by A SOURCE,
//               and only sometimes -- a sentinel that names every route it
//               tried is a close, not a gap.
//   HAS         the field holds prose nobody has coded against this question.
//               Fixed by READING, but often turns out to be a fill instead,
//               because the prose never reaches the question.
//   UNSET       the entry was coded and no value in the column fitted. Fixed
//               by THE VOCABULARY, or by re-reading -- it is also where a
//               sourcing note and a documented absence end up when they have
//               nowhere else to go.
//   NOT STATED  the entry was read and does not answer. Fixed by A SOURCE.
//               Distinct from UNSET: one says the vocabulary failed, the other
//               says the text did.
//
// A column with no `not stated` value cannot report the fourth state at all,
// and its entries pile into UNSET instead. That is not a coding backlog and
// the report flags it, because reading it as one is how `designation` came to
// look like 14 units of unfinished work when it is one vocabulary decision.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));
const { SCHEMES } = require(path.join(ATLAS, "src", "coding"));
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const SENT = /^Not established from the sources consulted/i;
const NA = /^Not applicable/i;

const args = process.argv.slice(2);
const unitsFor = args.includes("--units") ? args[args.indexOf("--units") + 1] : null;
const only = args.filter(a => !a.startsWith("--") && a !== unitsFor);

// NOT EVERY UNSET CELL IS A GAP, and before this distinction existed the
// corpus-wide UNSET total read 3,608 when the answerable part of it is 226.
//
//   free    the column is declared as free text or an integer ("integer, where
//           the entry gives one"). An unset cell means the entry gives none.
//           `instrument_year`, `duty_org`, `exit_period_months`.
//   flag    the column is only ever set when the row IS the special case it
//           names. `not_an_operation` marks a history row that records a
//           SOURCE rather than an event; `scope_change` marks a change of
//           scope. Unset means "an ordinary row", which is the answer.
//   list    a list column left empty because the entry names nothing to list.
//   enum    a real choice the coder had to make. THIS is the only kind whose
//           unset count is a backlog.
const FLAG_COLS = new Set(["not_an_operation", "scope_change"]);
const LIST_COLS = new Set(["language_domains", "exclusions", "fields_touched"]);
const kindOf = (col, def) => {
  if (!def || typeof def !== "object") return "free";
  if (FLAG_COLS.has(col)) return "flag";
  if (LIST_COLS.has(col)) return "list";
  return "enum";
};

const rows = [];
const noNotStated = [];
const unitLists = {};

for (const d of DOMAINS) {
  if (only.length && !only.includes(d.id)) continue;
  let file;
  try { file = pathFor(d.id); } catch { continue; }
  if (!fs.existsSync(file)) continue;
  const entries = JSON.parse(fs.readFileSync(file, "utf8"));

  for (const [fk] of d.fields) {
    const scheme = SCHEMES[d.id + "." + fk];
    if (!scheme) continue;                       // unschemed: no columns to count
    const cols = Object.keys(scheme.columns || {});

    // Field-level states, counted once per field rather than once per column:
    // a sentinel or uncoded prose is a fact about the ENTRY, not the question.
    let looked = 0, has = 0, na = 0, absent = 0, coded = 0;
    const perCol = {};
    for (const c of cols) perCol[c] = { unset: 0, notStated: 0 };

    for (const e of entries) {
      const t = String(e[fk] == null ? "" : (Array.isArray(e[fk]) ? "" : e[fk])).trim();
      if (e.absences && e.absences[fk] === true) { absent++; continue; }
      if (!t && !(Array.isArray(e[fk]) && e[fk].length)) continue;   // blank: a fill, not a gap row
      if (SENT.test(t)) { looked++; note(unitLists, d.id + "." + fk + ".LOOKED", e); continue; }
      if (NA.test(t)) { na++; continue; }
      const c = (e.coding || {})[fk];
      if (!c || (!Array.isArray(c) && !Object.keys(c).length)) { has++; note(unitLists, d.id + "." + fk + ".HAS", e); continue; }
      coded++;
      const one = Array.isArray(c) ? c[0] : c;    // instrument-grained fields: row 0
      for (const col of cols) {
        const v = one ? one[col] : undefined;
        if (v === undefined) { perCol[col].unset++; note(unitLists, d.id + "." + fk + "." + col + ".UNSET", e); }
        else if (Array.isArray(v) ? v.includes("not stated") : v === "not stated") {
          perCol[col].notStated++; note(unitLists, d.id + "." + fk + "." + col + ".NOTSTATED", e);
        }
      }
    }

    for (const col of cols) {
      const def = scheme.columns[col];
      const vocab = def && typeof def === "object" ? Object.keys(def) : [];
      const hasNotStated = vocab.includes("not stated");
      const hasNoneEst = vocab.includes("none established");
      if (vocab.length && !hasNotStated) noNotStated.push({ key: d.id + "." + fk + "." + col, unset: perCol[col].unset, hasNoneEst });
      rows.push({
        domain: d.id, field: fk, col, coded, looked, has, na, absent, kind: kindOf(col, def),
        unset: perCol[col].unset, notStated: perCol[col].notStated, hasNotStated, hasNoneEst,
      });
    }
  }
}

function note(bag, key, e) {
  (bag[key] = bag[key] || []).push(e.countryCode + "|" + e.unitName);
}

if (unitsFor) {
  for (const state of ["LOOKED", "HAS", "UNSET", "NOTSTATED"]) {
    const list = unitLists[unitsFor + "." + state] || unitLists[unitsFor.split(".").slice(0, 2).join(".") + "." + state];
    if (list && list.length) console.log(NL + state + " (" + list.length + ")" + NL + "  " + list.join(NL + "  "));
  }
  process.exit(0);
}

// ---- field-level totals: LOOKED and HAS belong to the entry, not the column
const byField = new Map();
for (const r of rows) {
  const k = r.domain + "." + r.field;
  if (!byField.has(k)) byField.set(k, { ...r, cols: 0 });
  byField.get(k).cols++;
}
const fieldRows = [...byField.values()].sort((a, b) => (b.looked + b.has) - (a.looked + a.has));

console.log("FIELD-LEVEL: a sentinel or uncoded prose is one fact per ENTRY" + NL);
console.log("  " + "field".padEnd(34) + "coded".padStart(6) + "LOOKED".padStart(8) + "HAS".padStart(6));
let tl = 0, th = 0;
for (const r of fieldRows) {
  if (!r.looked && !r.has) continue;
  tl += r.looked; th += r.has;
  console.log("  " + (r.domain + "." + r.field).padEnd(34) + String(r.coded).padStart(6) + String(r.looked).padStart(8) + String(r.has).padStart(6));
}
console.log("  " + "TOTAL".padEnd(34) + "".padStart(6) + String(tl).padStart(8) + String(th).padStart(6));

console.log(NL + NL + "COLUMN-LEVEL: UNSET is the vocabulary failing, NOT STATED is the text failing" + NL);
console.log("  " + "column".padEnd(46) + "UNSET".padStart(7) + "NOTSTD".padStart(8) + "  vocab");
const colRows = rows.filter(r => (r.unset || r.notStated) && r.kind === "enum")
  .sort((a, b) => (b.unset + b.notStated) - (a.unset + a.notStated));
let tu = 0, tn = 0;
for (const r of colRows) {
  tu += r.unset; tn += r.notStated;
  const flag = r.hasNotStated ? "" : "  <- NO `not stated` VALUE";
  console.log("  " + (r.domain + "." + r.field + "." + r.col).padEnd(46) + String(r.unset).padStart(7) + String(r.notStated).padStart(8) + flag);
}
console.log("  " + "TOTAL (enum columns)".padEnd(46) + String(tu).padStart(7) + String(tn).padStart(8));

const other = {};
for (const r of rows) if (r.kind !== "enum" && r.unset) other[r.kind] = (other[r.kind] || 0) + r.unset;
console.log(NL + "  NOT counted above, because an unset cell there is an answer:");
for (const [k, v] of Object.entries(other).sort((a, b) => b[1] - a[1]))
  console.log("    " + String(v).padStart(5) + "  " + k + " columns" +
    (k === "flag" ? "  (an ordinary history row, not a source note or scope change)"
     : k === "free" ? "  (free text or an integer the entry does not give)"
     : "  (nothing to list)"));

console.log(NL + NL + "COLUMNS THAT CANNOT REPORT \"the entry does not answer\"" + NL);
for (const r of noNotStated.sort((a, b) => b.unset - a.unset)) {
  console.log("  " + r.key.padEnd(46) + String(r.unset).padStart(5) + " unset" + (r.hasNoneEst ? "   (has `none established`)" : ""));
}
console.log(NL + "  Their unset counts are a vocabulary decision, not a coding backlog.");
