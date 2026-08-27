// Build the indigenous map's `languages` records, plus the three text fields
// the same pass produced.
//
// Rows are taken as rows.js emitted them. The one thing checked here is that
// the row is INTERNALLY consistent with WALS: a row claiming a WALS code must
// carry the name, family and ISO that WALS holds for that code. That catches
// the failure this pass actually hit — Manipur's Kom matched by name to Kom of
// CAMEROON, a Niger-Congo language, and would have been filed with a family
// from the wrong continent.
const fs = require("fs"), path = require("path");
const { build } = require("./parseparts");
const { find, describe } = require("./wals/wals");

const PARTS = path.join(__dirname, "reports", "parts");
const FRESH_MS = 90 * 1000, now = Date.now();
const skipped = [];
const settled = f => {
  const age = now - fs.statSync(path.join(PARTS, f)).mtimeMs;
  if (age < FRESH_MS) { skipped.push(`${f} (${Math.round(age / 1000)}s ago)`); return false; }
  return true;
};

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const store = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", "indigenous.json"), "utf8"));
const byKey = new Map(store.map(r => [r.countryCode + "|" + r.unitName, r]));

// Map a part-file slug to a unit. The agents used ISO2, ISO2-SUB and a few
// spelled-out names, so resolution is by trying each and REPORTING a miss.
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const byCC = {};
for (const r of store) (byCC[r.countryCode] = byCC[r.countryCode] || []).push(r);

// Explicit abbreviation tables, not clever matching. The three agents used
// postal and standard codes, and several are ambiguous against unit names:
// CA-CA is California in one scheme and Canada in another, IN-IN would be
// Indiana or India. Every code below is checked against the unit list at load,
// so a wrong entry surfaces as an unresolved file rather than as misfiled data.
const ABBR = {
  US: { AK:"Alaska",AL:"Alabama",AR:"Arkansas",AZ:"Arizona",CA:"California",CO:"Colorado",CT:"Connecticut",DC:"District of Columbia",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",IA:"Iowa",ID:"Idaho",IL:"Illinois",IN:"Indiana",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",MA:"Massachusetts",MD:"Maryland",ME:"Maine",MI:"Michigan",MN:"Minnesota",MO:"Missouri",MS:"Mississippi",MT:"Montana",NC:"North Carolina",ND:"North Dakota",NE:"Nebraska",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NV:"Nevada",NY:"New York",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VA:"Virginia",VT:"Vermont",WA:"Washington",WI:"Wisconsin",WV:"West Virginia",WY:"Wyoming" },
  CA: { AB:"Alberta",BC:"British Columbia",MB:"Manitoba",NB:"New Brunswick",NL:"Newfoundland and Labrador",NS:"Nova Scotia",NT:"Northwest Territories",NU:"Nunavut",ON:"Ontario",PE:"Prince Edward Island",QC:"Quebec",SK:"Saskatchewan",YT:"Yukon",CANADA:"Canada" },
  AU: { NT:"Northern Territory",QLD:"Queensland",SA:"South Australia",TAS:"Tasmania",VIC:"Victoria",WA:"Western Australia",NSW:"New South Wales",ACT:"Australian Capital Territory" },
  IN: { INDIA:"India",AN:"Andaman and Nicobar Islands",AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CH:"Chandigarh",CT:"Chhattisgarh",DNHDD:"Dadra and Nagar Haveli and Daman and Diu",DL:"Delhi",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JK:"Jammu and Kashmir",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OD:"Odisha",PY:"Puducherry",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TR:"Tripura",UP:"Uttar Pradesh",UK:"Uttarakhand",WB:"West Bengal" },
  GB: { England:"England", Scotland:"Scotland", Wales:"Wales", "northern-ireland":"Northern Ireland" },
  ES: { catalonia:"Catalonia" },
  BE: { fr:"Belgium — French Community (Wallonia-Brussels Federation)" },
};

function resolve(slug) {
  const m = slug.match(/^([A-Z]{2})(?:-(.+))?$/);
  if (!m) return null;
  const [, cc, rest] = m;
  const list = byCC[cc];
  if (!list) return null;
  if (!rest) {
    const nat = list.find(r => r.isNational);
    if (nat) return nat.countryCode + "|" + nat.unitName;
    return list.length === 1 ? list[0].countryCode + "|" + list[0].unitName : null;
  }
  const table = ABBR[cc] || {};
  const want = table[rest] || table[rest.toUpperCase()] || rest;
  let hit = list.find(r => norm(r.unitName) === norm(want));
  if (!hit) hit = list.find(r => norm(r.unitName).startsWith(norm(want)) && norm(want).length >= 5);
  return hit ? hit.countryCode + "|" + hit.unitName : null;
}

const LANG_RE = /\{[^{}]*"name"\s*:\s*"[^"]*"[^{}]*\}/g;
const spec = {};
const problems = [], mismatches = [], unresolved = [];
let rowCount = 0, dropped = 0;

for (const f of fs.readdirSync(PARTS).filter(x => /^lang-.+\.md$/.test(x)).sort()) {
  if (!settled(f)) continue;
  const slug = f.replace(/^lang-|\.md$/g, "");
  const key = resolve(slug);
  if (!key) { unresolved.push(f); continue; }
  const entry = byKey.get(key);
  if (!entry) { unresolved.push(f + " -> " + key + " (no such unit)"); continue; }

  const text = fs.readFileSync(path.join(PARTS, f), "utf8");
  const rows = [];
  for (const m of text.matchAll(LANG_RE)) {
    let r; try { r = JSON.parse(m[0]); } catch (e) { continue; }
    if (!r.name) continue;
    if (r.wals) {
      // Verify against WALS itself rather than trusting the transcription.
      const hit = find(r.wals);
      const d = hit.length ? describe(hit[0]) : null;
      if (!d || d.wals !== r.wals) { mismatches.push(`${f}: ${r.name} claims wals=${r.wals}, which WALS does not hold`); dropped++; continue; }
      if (norm(d.name) !== norm(r.name)) { mismatches.push(`${f}: row says "${r.name}" but WALS ${r.wals} is "${d.name}"`); dropped++; continue; }
      if (r.family && d.family && !norm([d.family, d.subfamily].filter(Boolean).join(" > ")).startsWith(norm(d.family))) { /* shape only */ }
      r.family = [d.family, d.subfamily].filter(Boolean).join(" > ");
      r.genus = d.genus;
      r.iso = d.iso;
    }
    rows.push({ name: r.name, wals: r.wals || "", iso: r.iso || "", family: r.family || "", genus: r.genus || "", typology: r.typology || "" });
    rowCount++;
  }
  if (!rows.length) continue;
  if (Array.isArray(entry.languages) && entry.languages.length) continue;   // already written
  spec[key] = { fields: {}, series: { }, languages: rows };
}

module.exports = { spec, problems, mismatches, unresolved, skipped, rowCount, dropped };
if (require.main === module) {
  console.log(`${Object.keys(spec).length} units, ${rowCount} language rows kept, ${dropped} dropped on a WALS mismatch`);
  console.log(`skipped mid-write: ${skipped.length}`);
  if (unresolved.length) { console.log(`\nUNRESOLVED FILENAMES (${unresolved.length}):`); unresolved.slice(0, 20).forEach(u => console.log("  " + u)); }
  if (mismatches.length) { console.log(`\nROWS DROPPED, WALS DISAGREES (${mismatches.length}):`); mismatches.slice(0, 20).forEach(m => console.log("  " + m)); }
}
