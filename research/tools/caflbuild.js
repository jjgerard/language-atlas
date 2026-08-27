const { build } = require("./parseparts");
const NAME = { CA: "Canada", AB: "Alberta", BC: "British Columbia", MB: "Manitoba",
  NB: "New Brunswick", NL: "Newfoundland and Labrador", NT: "Northwest Territories",
  NS: "Nova Scotia", NU: "Nunavut", ON: "Ontario", PE: "Prince Edward Island",
  QC: "Quebec", SK: "Saskatchewan", YT: "Yukon" };
const r = build(/^cafl-[A-Z]{2}\.md$/, f => {
  const m = f.match(/^cafl-([A-Z]{2})\.md$/); if (!m) return null;
  const name = NAME[m[1]]; if (!name) return null;
  return { domain: "fl", key: "CA|" + name, confidence: "official-document" };
});
module.exports = r;
if (require.main === module) {
  console.log("files parsed:", r.files);
  const units = Object.keys(r.spec.fl || {}); let fi=0,b=0,h=0,L=0;
  for (const k of units) { const e=r.spec.fl[k]; fi+=Object.keys(e.fields).length; for(const x of Object.values(e.fields)) b+=x.length; h+=(e.history||[]).length; L+=(e.addDocLinks||[]).length; }
  console.log(`  fl: ${units.length} units, ${fi} fields, ${b} bullets, ${h} history rows, ${L} docLinks`);
  console.log("  missing:", Object.values(NAME).filter(n => !units.includes("CA|" + n)).join(", ") || "none");
  console.log("\nPROBLEMS (" + r.problems.length + "):"); r.problems.forEach(p => console.log("  " + p));
  console.log("SKIPPED SERIES (" + r.skipped.length + "):"); r.skipped.forEach(p => console.log("  " + p));
}
