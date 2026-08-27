const { build } = require("./parseparts");
const slug = s => s.replace(/[^a-z]+/g, "");
const NAMES = ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Puducherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
const bySlug = {}; NAMES.forEach(n => bySlug[slug(n.toLowerCase())] = n);
const r = build(/^india-.*\.md$/, f => {
  const m = f.match(/^india-(.+)-(fl|eal)\.md$/); if (!m) return null;
  const name = bySlug[slug(m[1])]; if (!name) return null;
  return { domain: m[2], key: "IN|" + name, confidence: "official-document" };
});
module.exports = r;
if (require.main === module) {
  console.log("files parsed:", r.files);
  for (const d of Object.keys(r.spec)) {
    const units = Object.keys(r.spec[d]); let f=0,b=0,h=0;
    for (const k of units) { const e=r.spec[d][k]; f+=Object.keys(e.fields).length; for(const x of Object.values(e.fields)) b+=x.length; h+=(e.history||[]).length; }
    console.log(`  ${d}: ${units.length} units, ${f} fields, ${b} bullets, ${h} history rows`);
  }
  console.log("\nPROBLEMS (" + r.problems.length + "):"); r.problems.forEach(p => console.log("  " + p));
  console.log("\nSKIPPED SERIES (" + r.skipped.length + "):"); r.skipped.forEach(p => console.log("  " + p));
}
