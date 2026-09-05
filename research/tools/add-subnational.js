// Create stub entries for sub-national units that have geometry but no rows.
//
//     node add-subnational.js            # report
//     node add-subnational.js --write
//
// The geometry build decides which places the map CAN show; the data files
// decide which of them have anything to say. A unit that exists in one and not
// the other is the failure case: `resolve()` finds no entry, so the shape is
// painted as --nodata and reads on the map as "nobody has documented this",
// when in fact nobody has even created the row to document.
//
// A stub created here is not a claim. Every field is empty, so derive.js gives
// it `coverage: 'inherited'` wherever its country has an answer -- the map's
// "Follows its country" state -- which is the truthful reading for a region
// that has not been researched separately yet. Its status is 'stub' and its
// stubNote says so.
const fs = require("fs");
const path = require("path");
const NL = String.fromCharCode(10);
const ATLAS = path.join(__dirname, "..", "..");
const { LIVE } = require(path.join(ATLAS, "src", "domains"));
const { subregionFor, regionFor } = require(path.join(ATLAS, "src", "subregions"));
const { pathFor } = require("./datafile");

const write = process.argv.includes("--write");
const geometry = JSON.parse(fs.readFileSync(path.join(ATLAS, "public", "geometry.json"), "utf8"));

// Every sub-national shape the map can draw, as "CC:Name".
const shapes = Object.keys(geometry.subunits || {}).map(k => {
  const [cc, ...rest] = k.split(":");
  return { cc, name: rest.join(":") };
});

let created = 0;
const perDomain = {};
for (const d of LIVE) {
  const file = pathFor(d.id);
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  const have = new Set(rows.map(e => e.countryCode + ":" + e.unitName));
  const fresh = [];
  for (const s of shapes) {
    if (have.has(s.cc + ":" + s.name)) continue;
    const sub = subregionFor(s.cc) || "";
    const entry = {
      countryCode: s.cc,
      unitName: s.name,
      isNational: false,
      region: regionFor(sub) || "",
      subregion: sub,
      status: "stub",
      confidence: "unverified-submission",
      lastVerified: "",
      collaborators: [],
      docLinks: [],
      supportLinks: [],
      sourceLanguageNote: "",
      // Said plainly, because the map's other empty state means something else.
      stubNote: "No separate record yet; this unit shows its country's answers.",
      by: "",
    };
    // Every declared field, empty and in the right shape for its type.
    for (const [k, , type] of d.fields) entry[k] = (type === "text" || !type) ? "" : [];
    fresh.push(entry);
  }
  if (fresh.length) {
    rows.push(...fresh);
    // Keep the file readable: country, then national first, then by name.
    rows.sort((a, b) => a.countryCode.localeCompare(b.countryCode)
      || (b.isNational === false ? 0 : 1) - (a.isNational === false ? 0 : 1)
      || String(a.unitName).localeCompare(String(b.unitName)));
    if (write) fs.writeFileSync(file, JSON.stringify(rows, null, 1) + NL);
  }
  perDomain[d.id] = fresh.length;
  created += fresh.length;
  if (fresh.length && !perDomain._names) perDomain._names = fresh.map(e => e.countryCode + "|" + e.unitName);
}

console.log((write ? "WROTE " : "DRY RUN ") + created + " stub entr(ies) across " + LIVE.length + " domains");
for (const d of LIVE) console.log("  " + d.id.padEnd(12) + perDomain[d.id]);
if (perDomain._names) {
  console.log(NL + "units added:");
  for (const n of perDomain._names) console.log("  " + n);
}
if (!write) console.log(NL + "(dry run - pass --write)");
