// Build an `enrolment` spec for the `he` map from Eurostat's UOE tertiary
// enrolment table, at ISCED-F 023 "Languages".
//
//     node eurostat-enrolment.js <outdir>
//
// This field stood at 0 of 210 since the map launched, and the reason turned
// out to be that the obvious source is the wrong one: NOTHING in the UNESCO
// Institute for Statistics database is disaggregated by language studied --
// all 5,063 indicators were listed and field-of-study stops at "Arts and
// Humanities". Eurostat is a different classification. It uses ISCED-F 2013 in
// full, which HAS a code for Languages, so the figure exists for every
// reporting country and always did.
//
// One request per country rather than one for all of them, because the gate
// verifies a figure by refetching its url and finding the quote on it. A
// combined response indexes its values positionally -- `"6":180806` is Germany
// only until Eurostat reorders the array -- whereas a single-country response
// contains exactly one number, and the url itself says which country it is.
//
// The unit is the thing most worth getting right and is why the note is long:
// this counts STUDENTS enrolled, not course enrolments, which the field's own
// hint insists on distinguishing. Several national agencies publish a finer
// breakdown by individual language -- Switzerland names Romansh separately --
// but Austria's is programme enrolments rather than a headcount and Czechia's
// person-level dedup applies only to its totals, so the three are not
// comparable with each other. Eurostat's one definition across 36 countries is
// worth more here than a finer figure that means something different in each.
const fs = require("fs");
const path = require("path");
const https = require("https");
const NL = String.fromCharCode(10);
const outDir = process.argv[2];
if (!outDir) { console.log("usage: node eurostat-enrolment.js <outdir>"); process.exit(1); }

const DATASET = "educ_uoe_enrt03";
const YEARS = [2019, 2021, 2022, 2023];
const BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/" + DATASET;
const url = (geo, y) => BASE + "?format=JSON&lang=EN&iscedf13=F023&isced11=ED5-8&sex=T&unit=NR"
  + "&geo=" + geo + "&time=" + y;

// Eurostat geo codes are ISO 3166-1 alpha-2 except for these two.
const ISO = { EL: "GR", UK: "GB" };
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const get = u => new Promise(res => {
  https.get(u, { headers: { "User-Agent": UA } }, r => {
    const c = []; r.on("data", d => c.push(d));
    r.on("end", () => { try { res(JSON.parse(Buffer.concat(c).toString("utf8"))); } catch { res(null); } });
  }).on("error", () => res(null));
});

(async () => {
  const atlas = path.join(__dirname, "..", "..");
  const rows = JSON.parse(fs.readFileSync(path.join(atlas, "data", "he.seed.json"), "utf8"));
  const nameOf = cc => { const e = rows.find(r => r.countryCode === cc && r.isNational !== false); return e && e.unitName; };

  // The country list comes from a query with NO geo filter, because a filtered
  // response's geo dimension contains only the country asked for -- asking
  // EU27_2020 for the list returned exactly one code, and after dropping the
  // aggregate that left none.
  const all = await get(BASE + "?format=JSON&lang=EN&iscedf13=F023&isced11=ED5-8&sex=T&unit=NR&time=2022");
  const gi = all.dimension.geo.category.index;
  // The aggregate row is not a country and has no entry to sit on.
  const codes = Object.keys(gi).filter(c => !/^EU|^EA/.test(c) && all.value[gi[c]] != null);
  console.log("querying " + codes.length + " countries x " + YEARS.length + " years");

  const spec = {};
  for (const geo of codes) {
    const cc = ISO[geo] || geo;
    const name = nameOf(cc);
    if (!name) { console.log("  no atlas entry for " + geo + " (" + cc + ") - skipped"); continue; }
    const key = cc + "|" + name;
    for (const y of YEARS) {
      const j = await get(url(geo, y));
      const v = j && j.value && j.value["0"];
      if (v == null) continue;
      const u = url(geo, y);
      const label = (j.dimension.geo.category.label || {})[geo] || geo;
      spec[key] = spec[key] || { series: { enrolment: [] }, evidence: [], addDocLinks: [] };
      spec[key].series.enrolment.push({
        year: y, value: String(v),
        note: "Students enrolled in tertiary education, ISCED 5-8, in the field Languages (ISCED-F 023), both sexes; Eurostat " + DATASET + ". Counts students, not course enrolments",
      });
      // The whole response for one country and one year is a single number, so
      // this quote cannot match the wrong row.
      spec[key].evidence.push({ bullet: y + " " + v, url: u, quote: '"value":{"0":' + v + "}" });
      spec[key].addDocLinks.push({
        label: "Eurostat, Students enrolled in tertiary education by education level, programme orientation, sex and field of education (" + DATASET + ") — "
          + label + ", ISCED 5-8, field of education Languages (ISCED-F 023), both sexes, " + y,
        url: u,
      });
      await new Promise(r => setTimeout(r, 150));
    }
    const n = spec[key] ? spec[key].series.enrolment.length : 0;
    console.log("  " + key.padEnd(34) + n + " year(s)");
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "out-eurostat.json"), JSON.stringify(spec, null, 1) + NL);
  const units = Object.keys(spec).length;
  const figs = Object.values(spec).reduce((a, s) => a + s.series.enrolment.length, 0);
  console.log(NL + "wrote " + units + " units, " + figs + " figures");
})();
