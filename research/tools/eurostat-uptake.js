// Build an `uptake` spec for the `fl` map from Eurostat's language-learning
// table, which counts pupils by the MODERN FOREIGN LANGUAGE they study.
//
//     node eurostat-uptake.js <outdir>
//
// This is the school-level sibling of the tertiary table used for he.enrolment,
// and it is a better fit for its field than that one was for its. `uptake` asks
// for "numbers or shares of pupils taking a language, by year", and
// educ_uoe_lang01 is exactly that: 31 NAMED languages -- English, German,
// French, Spanish, Russian, Arabic, Chinese, Japanese and the EU official
// languages -- crossed with ISCED 1, 2 and 3.
//
// Note the UNIT, which is why the note says what it says. Eurostat is explicit
// that this collection counts ENROLMENTS in the study of a language, not
// pupils: a pupil taking two languages is one pupil and two enrolments. The
// field's own hint insists that distinction be stated, and it is the opposite
// of the tertiary table's unit, so the two must not be read as one series.
//
// Only the top languages per country are written. The table has 31 language
// codes and most are near-zero outside their own country; a row for every one
// would bury the three that matter under twenty-eight that do not.
const fs = require("fs");
const path = require("path");
const https = require("https");
const NL = String.fromCharCode(10);
const outDir = process.argv[2];
if (!outDir) { console.log("usage: node eurostat-uptake.js <outdir>"); process.exit(1); }

const DATASET = "educ_uoe_lang01";
const BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/" + DATASET;
const YEARS = [2018, 2022];
const LEVEL = "ED2";          // lower secondary: where a foreign language is compulsory in most systems
const TOPN = 4;
const ISO = { EL: "GR", UK: "GB" };

const get = u => new Promise(res => {
  https.get(u, { headers: { "User-Agent": "Mozilla/5.0" } }, r => {
    const c = []; r.on("data", d => c.push(d));
    r.on("end", () => { try { res(JSON.parse(Buffer.concat(c).toString("utf8"))); } catch { res(null); } });
  }).on("error", () => res(null));
});
const url = (geo, lang, y) => BASE + "?format=JSON&lang=EN&unit=NR&isced11=" + LEVEL
  + "&language=" + lang + "&geo=" + geo + "&time=" + y;

(async () => {
  const atlas = path.join(__dirname, "..", "..");
  const rows = JSON.parse(fs.readFileSync(path.join(atlas, "data", "fl.seed.json"), "utf8"));
  const nameOf = cc => { const e = rows.find(r => r.countryCode === cc && r.isNational !== false); return e && e.unitName; };

  // One wide call per year to find, per country, which languages are actually taught.
  const wide = {};
  for (const y of YEARS) {
    wide[y] = await get(BASE + "?format=JSON&lang=EN&unit=NR&isced11=" + LEVEL + "&time=" + y);
  }
  const w = wide[YEARS[YEARS.length - 1]];
  const gi = w.dimension.geo.category.index, gl = w.dimension.geo.category.label;
  const li = w.dimension.language.category.index, ll = w.dimension.language.category.label;
  const geos = Object.keys(gi).filter(c => !/^EU|^EA/.test(c));
  const langs = Object.keys(li).filter(c => !["TOTAL", "OTH", "UNK"].includes(c));
  const nG = Object.keys(gi).length, nL = Object.keys(li).length;
  const at = (gc, lc) => w.value[li[lc] * nG + gi[gc]];   // language is the outer dimension

  const spec = {};
  let figures = 0;
  for (const geo of geos) {
    const cc = ISO[geo] || geo;
    const name = nameOf(cc);
    if (!name) { console.log("  no atlas entry for " + geo + " - skipped"); continue; }
    // The languages this country actually teaches, biggest first.
    const top = langs.map(lc => [lc, at(geo, lc)]).filter(([, v]) => v != null && v > 0)
      .sort((a, b) => b[1] - a[1]).slice(0, TOPN);
    if (!top.length) { console.log("  " + cc + " " + name + ": no language has a figure"); continue; }
    const key = cc + "|" + name;
    for (const [lc] of top) {
      for (const y of YEARS) {
        const j = await get(url(geo, lc, y));
        const v = j && j.value && j.value["0"];
        if (v == null) continue;
        const u = url(geo, lc, y);
        // Eurostat publishes a STATUS FLAG alongside many of these figures, and
        // it is the reason some of them are fractional: Germany's English count
        // is 4,438,657.7, flagged `d` for a differing definition. The figure is
        // reproduced exactly as published -- rounding a source's number is
        // altering it -- and the flag travels with it, because a qualifier on a
        // figure is precisely what this repo's rules say is never dropped.
        const FLAG = { d: "definition differs", e: "estimated", p: "provisional",
                       b: "break in time series", u: "low reliability", c: "confidential", s: "Eurostat estimate" };
        const st = j.status && j.status["0"];
        const flag = st && FLAG[st] ? "; Eurostat flags this figure " + FLAG[st] + " (" + st + ")" : "";
        spec[key] = spec[key] || { series: { uptake: [] }, evidence: [], addDocLinks: [] };
        spec[key].series.uptake.push({
          year: y, value: String(v),
          note: ll[lc] + " at lower secondary (ISCED 2); Eurostat " + DATASET
            + ". Counts ENROLMENTS in the study of a language, not pupils -- a pupil taking two languages is counted twice"
            + flag,
        });
        spec[key].evidence.push({ bullet: y + " " + v, url: u, quote: '"value":{"0":' + v + "}" });
        spec[key].addDocLinks.push({
          label: "Eurostat, Pupils by education level and modern foreign language studied (" + DATASET + ") — "
            + (gl[geo] || geo) + ", " + ll[lc] + ", lower secondary (ISCED 2), " + y,
          url: u,
        });
        figures++;
        await new Promise(r => setTimeout(r, 120));
      }
    }
    console.log("  " + key.padEnd(30) + top.map(([lc]) => ll[lc]).join(", "));
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "out-uptake.json"), JSON.stringify(spec, null, 1) + NL);
  console.log(NL + "wrote " + Object.keys(spec).length + " units, " + figures + " figures");
})();
