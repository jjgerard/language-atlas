// Runs trends.html's own classifiers over the data before and after the
// expansion, so the effect on each chart is measured rather than assumed.
const fs = require("fs");
const vm = require("vm");

const html = fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/public/trends.html", "utf8");
const start = html.indexOf("const NOT_DOCUMENTED_RE");
const end = html.indexOf("// Multi-hit features");
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(html.slice(start, end), ctx);

const load = f => JSON.parse(fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/" + f, "utf8")).S;
const before = load("seed.json.bak");
const after = load("seed.json");

const CHARTS = [
  ["Sector (serviceModel)", "serviceModel", "classifySector"],
  ["Funding", "funding", "classifyFunding"],
  ["Terminology", "terminology", "classifyTerminology"],
];

function tally(list, field, fn) {
  const c = {};
  for (const e of list) {
    const k = ctx[fn](e[field] || "");
    c[k] = (c[k] || 0) + 1;
  }
  return c;
}

for (const [name, field, fn] of CHARTS) {
  const b = tally(before, field, fn), a = tally(after, field, fn);
  console.log("\n===== " + name + " =====");
  const keys = [...new Set([...Object.keys(b), ...Object.keys(a)])].sort();
  for (const k of keys) {
    const bv = b[k] || 0, av = a[k] || 0;
    if (bv === av) continue;
    console.log(`  ${k.padEnd(42)} ${String(bv).padStart(4)} -> ${String(av).padStart(4)}  (${av - bv >= 0 ? "+" : ""}${av - bv})`);
  }
}
