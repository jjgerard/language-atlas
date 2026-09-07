// Two more Eurostat language tables for `fl.uptake`: the AVERAGE number of
// foreign languages a pupil studies, and the SHARE studying two or more.
//
//     node eurostat-langcount.js <outdir>
//
// educ_uoe_lang01 answered "how many pupils take French" and is already in.
// These answer a different question the field also asks -- how many languages
// a pupil takes at all -- and they are the two figures a reader compares
// countries on. Both are per country per level, so they are small, and both
// come from the same UOE collection as lang01, which means the unit note has
// to say the same thing: these count ENROLMENTS in the study of a language,
// not pupils, so a pupil taking two languages is counted twice. lang03's
// average is derived from exactly that, and lang02's percentage is a share OF
// PUPILS, which is a different denominator again -- so each note says which.
const fs = require("fs");
const path = require("path");
const https = require("https");
const NL = String.fromCharCode(10);
const outDir = process.argv[2];
if (!outDir) { console.log("usage: node eurostat-langcount.js <outdir>"); process.exit(1); }

const YEARS = [2018, 2022];
const LEVELS = [["ED2", "lower secondary (ISCED 2)"], ["ED3", "upper secondary (ISCED 3)"]];
const ISO = { EL: "GR", UK: "GB" };
const BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/";
const FLAG = { d: "definition differs", e: "estimated", p: "provisional",
               b: "break in time series", u: "low reliability", c: "confidential", s: "Eurostat estimate" };

const get = u => new Promise(res => {
  https.get(u, { headers: { "User-Agent": "Mozilla/5.0" } }, r => {
    const c = []; r.on("data", d => c.push(d));
    r.on("end", () => { try { res(JSON.parse(Buffer.concat(c).toString("utf8"))); } catch { res(null); } });
  }).on("error", () => res(null));
});

// One value per request, so the quote cannot match the wrong row.
const avgUrl = (geo, lvl, y) => BASE + "educ_uoe_lang03?format=JSON&lang=EN&unit=NR&isced11=" + lvl + "&geo=" + geo + "&time=" + y;
const shareUrl = (geo, lvl, y) => BASE + "educ_uoe_lang02?format=JSON&lang=EN&unit=PC&n_lang=GE2&age=TOTAL&isced11=" + lvl + "&geo=" + geo + "&time=" + y;

(async () => {
  const atlas = path.join(__dirname, "..", "..");
  const rows = JSON.parse(fs.readFileSync(path.join(atlas, "data", "fl.seed.json"), "utf8"));
  const nameOf = cc => { const e = rows.find(r => r.countryCode === cc && r.isNational !== false); return e && e.unitName; };

  const all = await get(BASE + "educ_uoe_lang03?format=JSON&lang=EN&unit=NR&isced11=ED2&time=2022");
  const gi = all.dimension.geo.category.index, gl = all.dimension.geo.category.label;
  const geos = Object.keys(gi).filter(c => !/^EU|^EA/.test(c) && all.value[gi[c]] != null);
  console.log("querying " + geos.length + " countries");

  const spec = {};
  let n = 0;
  const add = (key, y, value, note, url, label) => {
    spec[key] = spec[key] || { series: { uptake: [] }, evidence: [], addDocLinks: [] };
    spec[key].series.uptake.push({ year: y, value: String(value), note });
    spec[key].evidence.push({ bullet: y + " " + value, url, quote: '"value":{"0":' + value + "}" });
    spec[key].addDocLinks.push({ label, url });
    n++;
  };

  for (const geo of geos) {
    const cc = ISO[geo] || geo;
    const name = nameOf(cc);
    if (!name) { console.log("  no atlas entry for " + geo + " - skipped"); continue; }
    const key = cc + "|" + name;
    const got = [];
    for (const [lvl, lvlName] of LEVELS) {
      for (const y of YEARS) {
        const a = await get(avgUrl(geo, lvl, y));
        const av = a && a.value && a.value["0"];
        if (av != null) {
          const st = a.status && a.status["0"];
          add(key, y, av,
            "Average number of foreign languages studied per pupil at " + lvlName
            + "; Eurostat educ_uoe_lang03. Derived from enrolments in the study of a language, so a pupil taking two is counted twice"
            + (st && FLAG[st] ? "; Eurostat flags this figure " + FLAG[st] + " (" + st + ")" : ""),
            avgUrl(geo, lvl, y),
            "Eurostat, Average number of foreign languages studied per pupil by education level (educ_uoe_lang03) — "
              + (gl[geo] || geo) + ", " + lvlName + ", " + y);
          got.push(lvlName.split(" ")[0] + " avg");
        }
        await new Promise(r => setTimeout(r, 110));
        const s = await get(shareUrl(geo, lvl, y));
        const sv = s && s.value && s.value["0"];
        if (sv != null) {
          const st = s.status && s.status["0"];
          add(key, y, sv + "%",
            "Share of pupils studying TWO OR MORE foreign languages at " + lvlName
            + "; Eurostat educ_uoe_lang02. A percentage of pupils, not of enrolments"
            + (st && FLAG[st] ? "; Eurostat flags this figure " + FLAG[st] + " (" + st + ")" : ""),
            shareUrl(geo, lvl, y),
            "Eurostat, Pupils by education level, age and number of modern foreign languages studied (educ_uoe_lang02) — "
              + (gl[geo] || geo) + ", two or more languages, " + lvlName + ", " + y);
          got.push(lvlName.split(" ")[0] + " 2+");
        }
        await new Promise(r => setTimeout(r, 110));
      }
    }
    console.log("  " + key.padEnd(30) + got.length + " figure(s)");
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "out-langcount.json"), JSON.stringify(spec, null, 1) + NL);
  console.log(NL + "wrote " + Object.keys(spec).length + " units, " + n + " figures");
})();
