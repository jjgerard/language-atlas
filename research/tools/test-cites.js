// Runs catalog.html's own linkCitations() over the newly generated prose to
// confirm every citation we wrote actually resolves to a URL.
const fs = require("fs");
const vm = require("vm");

const html = fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/public/catalog.html", "utf8");
const start = html.indexOf("const REFERENCES = {");
const end = html.indexOf("function fieldRow(");
if (start < 0 || end < 0) throw new Error("could not locate citation block");

const ctx = { escAttr: s => String(s).replace(/"/g, "&quot;"), console };
vm.createContext(ctx);
vm.runInContext(html.slice(start, end), ctx);

const seed = JSON.parse(fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json", "utf8")).S;
const FIELDS = ["terminology", "identificationCriteria", "assessments", "referralPathway", "serviceModel", "legalEntitlement", "funding", "workforce", "dischargeCriteria", "multilingualProvision", "outcomesEvidence"];

let linked = 0;
const unresolved = new Map();
for (const e of seed) {
  for (const f of FIELDS) {
    const raw = e[f];
    if (!raw) continue;
    const esc = String(raw).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const out = ctx.linkCitations(esc, e);
    linked += (out.match(/class="cite"/g) || []).length;
    // Anything that looks like a citation but came through without an anchor.
    const stripped = out.replace(/<a class="cite"[^>]*>.*?<\/a>/g, "");
    for (const m of stripped.match(/\(?[A-ZÀ-Þ][\w'’À-ɏ-]+[^()]{0,40}?\b(?:19|20)\d{2}\)/g) || []) {
      unresolved.set(m.trim(), (unresolved.get(m.trim()) || 0) + 1);
    }
  }
}

console.log("citations linked:", linked);
console.log("\nunresolved citation-shaped strings (top 25):");
for (const [t, c] of [...unresolved.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
  console.log("  " + String(c).padStart(4), t);
}
