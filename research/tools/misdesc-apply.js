// Apply the corrections recorded in MISDESCRIBED.json.
//
//     node misdesc-apply.js            # dry run, prints every before/after
//     node misdesc-apply.js --write
//
// This is the one script in the repo that DELIBERATELY overwrites written
// prose. Every other applier refuses to, and rightly: sourced text is not a
// blank to be filled. These rows are the exception because the text is wrong,
// so each edit is keyed to the exact string it replaces and aborts if that
// string is not found. Nothing is matched fuzzily and nothing is guessed at.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const write = process.argv.includes("--write");

const fixes = JSON.parse(fs.readFileSync(path.join(__dirname, "misdesc-fix.json"), "utf8"));
const cache = new Map();
const load = f => {
  if (!cache.has(f)) cache.set(f, JSON.parse(fs.readFileSync(ATLAS + "/data/" + f + ".json", "utf8")));
  return cache.get(f);
};

const log = [], fail = [];
let done = 0;

function findEntry(f, cc, unit) {
  const hits = load(f).filter(e => e.countryCode === cc && String(e.unitName || "").includes(unit));
  if (hits.length !== 1) { fail.push(f + " " + cc + "|" + unit + ": " + hits.length + " entries matched"); return null; }
  return hits[0];
}

for (const fx of fixes) {
  const e = findEntry(fx.f, fx.cc, fx.unit);
  if (!e) continue;
  const row = (e.policyHistory || [])[fx.i];
  if (!row) { fail.push(fx.f + " " + fx.cc + "|" + fx.unit + " [" + fx.i + "]: no such row"); continue; }
  const cur = String(row.description || "");
  const ok = fx.old ? cur === fx.old : cur.startsWith(fx.old_prefix);
  if (!ok) { fail.push(fx.f + " " + fx.cc + "|" + fx.unit + " [" + fx.i + "]: text moved" + NL + "      have: " + cur.slice(0, 90)); continue; }
  log.push([fx.f, e.countryCode + "|" + e.unitName, fx.i,
            (fx.year && fx.year !== row.year ? row.year + " -> " + fx.year : String(row.year)),
            cur, fx.new].join(" | "));
  if (write) {
    row.description = fx.new;
    if (fx.year) row.year = fx.year;
  }
  done++;
}

// The eight "1957" Seventh Amendment rows, in both domains that carry them.
// One fact, one wrong year, sixteen copies -- swept rather than listed, since
// listing sixteen identical strings would hide a seventeenth appearing later.
const SEVENTH_OLD = /^7th Constitutional \(Amendment\) Act inserts Articles? 350A/;
let seventh = 0;
for (const f of ["eal", "indigenous", "dld", "fl", "he"]) {
  let rows;
  try { rows = load(f); } catch { continue; }
  for (const e of rows) for (const row of (e.policyHistory || [])) {
    if (row.year !== 1957 && row.year !== "1957") continue;
    if (!SEVENTH_OLD.test(String(row.description || ""))) continue;
    const before = row.year + " | " + row.description;
    const next = String(row.description).replace("7th Constitutional (Amendment) Act",
                                                 "Constitution (Seventh Amendment) Act 1956");
    log.push([f, e.countryCode + "|" + e.unitName, "-", "1957 -> 1956", before, next].join(" | "));
    if (write) { row.year = 1956; row.description = next; }
    seventh++;
  }
}

console.log((write ? "WROTE " : "DRY RUN ") + done + " keyed correction(s) + " + seventh + " Seventh Amendment row(s)");
for (const l of log) console.log("  " + l);
if (fail.length) { console.log(NL + fail.length + " NOT APPLIED:"); fail.forEach(x => console.log("  " + x)); }

if (write && !fail.length) {
  for (const [f, rows] of cache) {
    fs.writeFileSync(ATLAS + "/data/" + f + ".json", JSON.stringify(rows, null, 1) + NL);
    console.log("wrote data/" + f + ".json");
  }
} else if (write) {
  console.log(NL + "REFUSED TO WRITE: " + fail.length + " correction(s) did not match. Fix the table first.");
  process.exit(1);
}
