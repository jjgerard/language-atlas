// Resolve a part file's "### CC|Unit" header to a store key.
//
// Ten naming schemes accumulated across the harvest waves, and the store's own
// key is the ONE shape none of them used: `countryCode` never carries a
// subdivision, so a header written `CA-NT|Northwest Territories` looks up a
// country code `CA-NT` that no row has, misses, and the rows behind it are
// silently discarded. That is not hypothetical — it cost 212 dated rows across
// 49 units, every one of which then showed on the map with no timeline at all.
//
// The abbreviation table is copied from langbuild.js rather than guessed at,
// and every code in it is checked against the live unit list on load, so a
// wrong entry surfaces here as a startup error instead of as misfiled data.
//
// All four stores hold the same 336 units, so one of them is enough to resolve
// against; `assertTable()` proves that assumption rather than trusting it.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join(__dirname, "..", "..");
const UNITS = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", "eal.json"), "utf8"));

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

const byCC = {};
for (const r of UNITS) (byCC[r.countryCode] = byCC[r.countryCode] || []).push(r);

// Postal and standard codes as the agents actually wrote them. Several are
// ambiguous against unit names — CA-CA is California in one scheme and Canada
// in another, IN-IN would be Indiana or India — so this is an explicit table,
// never a clever match.
const ABBR = {
  US: { AK:"Alaska",AL:"Alabama",AR:"Arkansas",AZ:"Arizona",CA:"California",CO:"Colorado",CT:"Connecticut",DC:"District of Columbia",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",IA:"Iowa",ID:"Idaho",IL:"Illinois",IN:"Indiana",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",MA:"Massachusetts",MD:"Maryland",ME:"Maine",MI:"Michigan",MN:"Minnesota",MO:"Missouri",MS:"Mississippi",MT:"Montana",NC:"North Carolina",ND:"North Dakota",NE:"Nebraska",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NV:"Nevada",NY:"New York",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VA:"Virginia",VT:"Vermont",WA:"Washington",WI:"Wisconsin",WV:"West Virginia",WY:"Wyoming" },
  CA: { AB:"Alberta",BC:"British Columbia",MB:"Manitoba",NB:"New Brunswick",NL:"Newfoundland and Labrador",NS:"Nova Scotia",NT:"Northwest Territories",NU:"Nunavut",ON:"Ontario",PE:"Prince Edward Island",QC:"Quebec",SK:"Saskatchewan",YT:"Yukon",CANADA:"Canada" },
  AU: { NT:"Northern Territory",QLD:"Queensland",SA:"South Australia",TAS:"Tasmania",VIC:"Victoria",WA:"Western Australia",NSW:"New South Wales",ACT:"Australian Capital Territory" },
  IN: { INDIA:"India",AN:"Andaman and Nicobar Islands",AP:"Andhra Pradesh",AR:"Arunachal Pradesh",AS:"Assam",BR:"Bihar",CH:"Chandigarh",CT:"Chhattisgarh",DNHDD:"Dadra and Nagar Haveli and Daman and Diu",DL:"Delhi",GA:"Goa",GJ:"Gujarat",HR:"Haryana",HP:"Himachal Pradesh",JK:"Jammu and Kashmir",JH:"Jharkhand",KA:"Karnataka",KL:"Kerala",MP:"Madhya Pradesh",MH:"Maharashtra",MN:"Manipur",ML:"Meghalaya",MZ:"Mizoram",NL:"Nagaland",OD:"Odisha",PY:"Puducherry",PB:"Punjab",RJ:"Rajasthan",SK:"Sikkim",TN:"Tamil Nadu",TR:"Tripura",UP:"Uttar Pradesh",UK:"Uttarakhand",WB:"West Bengal" },
  GB: { England:"England", Scotland:"Scotland", Wales:"Wales", "northern-ireland":"Northern Ireland", NI:"Northern Ireland" },
  ES: { catalonia:"Catalonia", CT:"Catalonia" },
  BE: { fr:"Belgium — French Community (Wallonia-Brussels Federation)" },
};

const keyOf = r => r.countryCode + "|" + r.unitName;

// Exact-name index, so a header that already matches a unit name resolves
// without going near the abbreviation table.
const byName = new Map();
for (const r of UNITS) {
  byName.set(norm(keyOf(r)), keyOf(r));
  byName.set(norm(r.unitName), keyOf(r));
}

/** Resolve a "CC" or "CC-SUB" code plus an optional written-out name. */
function fromCode(cc, rest, written) {
  const list = byCC[cc];
  if (!list) return null;
  if (!rest) {
    if (written) {
      const named = list.find(r => norm(r.unitName) === norm(written));
      if (named) return keyOf(named);
    }
    const nat = list.find(r => r.isNational);
    // Falling back to the national unit is right for a country written under an
    // alternative name ("SY|Syrian Arab Republic"), and wrong for a SPLIT
    // country whose header names a subdivision this table does not know: that
    // would file a state's rows on the whole country. So the fallback applies
    // only where there is nothing to confuse it with.
    if (written && list.length > 1) return null;
    if (nat) return keyOf(nat);
    return list.length === 1 ? keyOf(list[0]) : null;
  }
  const table = ABBR[cc] || {};
  const want = table[rest] || table[rest.toUpperCase()] || written || rest;
  let hit = list.find(r => norm(r.unitName) === norm(want));
  if (!hit && written) hit = list.find(r => norm(r.unitName) === norm(written));
  if (!hit && norm(want).length >= 5) hit = list.find(r => norm(r.unitName).startsWith(norm(want)));
  return hit ? keyOf(hit) : null;
}

// Trailing annotations the agents appended to headers, none of them part of
// the unit's name: "— map `dld`", "— map: eal (Majority language acquisition)".
const ANNOT = /\s*[—–-]\s*map:?\s*`?\w+`?.*$/i;

/**
 * Resolve a section header to a store key, or null.
 * Accepts "IE|Ireland", "CA-NT|Northwest Territories", "IN-TN|Tamil Nadu (India)",
 * a bare unit name, and any of those with a trailing map annotation.
 */
function resolveHeader(head) {
  const raw = String(head || "").trim();
  if (!raw) return null;
  const bare = raw.replace(ANNOT, "").trim();

  for (const cand of [raw, bare]) {
    if (byName.has(norm(cand))) return byName.get(norm(cand));

    const bar = cand.indexOf("|");
    if (bar < 0) continue;
    const code = cand.slice(0, bar).trim();
    let name = cand.slice(bar + 1).trim();

    if (byName.has(norm(code + "|" + name))) return byName.get(norm(code + "|" + name));
    if (byName.has(norm(name))) return byName.get(norm(name));

    // "Tamil Nadu (India)" — the parenthetical names the country, not the unit.
    const noParen = name.replace(/\s*\(.*\)\s*$/, "").trim();
    if (noParen !== name && byName.has(norm(noParen))) return byName.get(norm(noParen));

    const m = code.match(/^([A-Za-z]{2})(?:[-_](.+))?$/);
    if (!m) continue;
    const hit = fromCode(m[1].toUpperCase(), m[2] || null, noParen || name);
    if (hit) return hit;
  }
  return null;
}

/** Every abbreviation must name a unit that exists. Run at load, not on trust. */
function assertTable() {
  const bad = [];
  for (const [cc, table] of Object.entries(ABBR)) {
    for (const [code, name] of Object.entries(table)) {
      if (!(byCC[cc] || []).some(r => norm(r.unitName) === norm(name))) bad.push(cc + "-" + code + " -> " + name);
    }
  }
  if (bad.length) throw new Error("unitkey: abbreviations naming no unit: " + bad.join(", "));
}
assertTable();

module.exports = { resolveHeader, keyOf, UNITS, ABBR };

if (require.main === module) {
  const probes = ["IE|Ireland", "CA-NT|Northwest Territories", "IN-TN|Tamil Nadu (India)",
    "US-CA|California", "BE|Belgium — French Community (Wallonia-Brussels Federation)",
    "GB-northern-ireland|Northern Ireland", "AU-NSW|New South Wales", "SY|Syrian Arab Republic",
    "IN-AP|Andhra Pradesh — map: eal", "AG|Antigua and Barbuda — map `dld`"];
  for (const p of probes) console.log((resolveHeader(p) || "UNRESOLVED").padEnd(56) + "  <- " + p);
}
