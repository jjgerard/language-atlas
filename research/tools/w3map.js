// Map w3-*.md filenames to atlas units, and REFUSE to guess.
//
// Three agents named their files differently: "AG" for a country, "US-AK" and
// "AU-NT" by postal abbreviation, "IN-Tamil-Nadu" and "GB-wales" by name. A
// wrong mapping here files one jurisdiction's policy under another's, which is
// the worst failure available and is invisible afterwards — so every resolution
// is printed for review and anything ambiguous is reported, never assumed.
const fs = require("fs"), path = require("path");
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");

const units = new Map();  // "CC|Name" -> row
for (const f of ["eal.json", "dld.json", "fl.seed.json"]) {
  for (const r of JSON.parse(fs.readFileSync(path.join(ATLAS, "data", f), "utf8")))
    units.set(r.countryCode + "|" + r.unitName, r);
}
const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Index every unit by country code and by normalised name.
const byCC = {};
for (const key of units.keys()) {
  const [cc, name] = key.split("|");
  (byCC[cc] = byCC[cc] || []).push({ key, name, n: norm(name) });
}

// Postal/standard abbreviations, only for the three federations whose agents
// used them. Each is checked against the unit list below, so a wrong entry
// surfaces as an unresolved file rather than as misfiled data.
const ABBR = {
  US: { AK:"Alaska",AL:"Alabama",AR:"Arkansas",AZ:"Arizona",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",IA:"Iowa",ID:"Idaho",IL:"Illinois",IN:"Indiana",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",MA:"Massachusetts",MD:"Maryland",ME:"Maine",MI:"Michigan",MN:"Minnesota",MO:"Missouri",MS:"Mississippi",MT:"Montana",NC:"North Carolina",ND:"North Dakota",NE:"Nebraska",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NV:"Nevada",NY:"New York",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VA:"Virginia",VT:"Vermont",WA:"Washington",WI:"Wisconsin",WV:"West Virginia",WY:"Wyoming",DC:"District of Columbia" },
  AU: { NT:"Northern Territory",QLD:"Queensland",SA:"South Australia",TAS:"Tasmania",VIC:"Victoria",WA:"Western Australia",NSW:"New South Wales",ACT:"Australian Capital Territory" },
  CA: { AB:"Alberta",BC:"British Columbia",MB:"Manitoba",NB:"New Brunswick",NL:"Newfoundland and Labrador",NS:"Nova Scotia",NT:"Northwest Territories",NU:"Nunavut",ON:"Ontario",PE:"Prince Edward Island",QC:"Quebec",SK:"Saskatchewan",YT:"Yukon",CANADA:"Canada" },
};

function resolve(slug) {
  const m = slug.match(/^([A-Z]{2})(?:-(.+))?$/);
  if (!m) return { error: "filename does not start with a two-letter country code" };
  const cc = m[1], rest = m[2];
  const list = byCC[cc];
  if (!list) return { error: `no units for country ${cc}` };
  // Bare country code: the national unit, or a lone unit standing for it.
  if (!rest) {
    const nat = list.find(u => units.get(u.key).isNational);
    if (nat) return { key: nat.key, how: "national" };
    if (list.length === 1) return { key: list[0].key, how: "lone unit" };
    return { error: `${cc} has ${list.length} units and no national one` };
  }
  // An abbreviation the agents used.
  const ab = ABBR[cc] && ABBR[cc][rest.toUpperCase()];
  if (ab) {
    const hit = list.find(u => u.n === norm(ab));
    if (hit) return { key: hit.key, how: `abbr ${rest} -> ${ab}` };
    return { error: `abbr ${rest} maps to "${ab}" which is not a ${cc} unit` };
  }
  // Otherwise the rest of the filename IS the name.
  const hit = list.find(u => u.n === norm(rest));
  if (hit) return { key: hit.key, how: "name" };
  const near = list.filter(u => u.n.startsWith(norm(rest)) || norm(rest).startsWith(u.n));
  if (near.length === 1) return { key: near[0].key, how: `partial -> ${near[0].name}` };
  return { error: `"${rest}" matches ${near.length} ${cc} units` };
}

const PARTS = path.join(__dirname, "reports", "parts");
const files = fs.readdirSync(PARTS).filter(f => /^w3-.+\.md$/.test(f)).sort();
const map = {}, errors = [];
for (const f of files) {
  const slug = f.replace(/^w3-|\.md$/g, "");
  const r = resolve(slug);
  if (r.error) { errors.push(`${f}: ${r.error}`); continue; }
  map[f] = r;
}
module.exports = { map, errors, files };
if (require.main === module) {
  const how = {};
  for (const v of Object.values(map)) how[v.how.split(" ")[0]] = (how[v.how.split(" ")[0]] || 0) + 1;
  console.log(`${files.length} files, ${Object.keys(map).length} resolved, ${errors.length} unresolved`);
  console.log("by method: " + Object.entries(how).map(([k, v]) => k + " " + v).join(", "));
  if (errors.length) { console.log("\nUNRESOLVED (not guessed):"); errors.forEach(e => console.log("  " + e)); }
  const odd = Object.entries(map).filter(([, v]) => /partial|lone/.test(v.how));
  if (odd.length) { console.log("\nRESOLVED BY A LOOSER RULE — check these:"); odd.forEach(([f, v]) => console.log(`  ${f} -> ${v.key}  (${v.how})`)); }
}
