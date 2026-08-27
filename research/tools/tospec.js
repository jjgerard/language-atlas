// Turn an agent's DRAFT BULLETS blocks into the spec object apply.js consumes.
//
// Retyping two hundred bullets by hand is how transcription errors get in, and
// these bullets have already been checked against the sources by chkcorpus.js.
// After this point the only edits should be ones made deliberately, on a bullet
// this script has flagged.
const fs = require("fs"), path = require("path");
const [PARTS, GLOB, OUT] = process.argv.slice(2);
const SERIES = new Set(["uptake", "newcomerProportion", "identifiedPrevalence"]);

// Header shapes differ between agents: "AG|Antigua and Barbuda — map `dld`",
// "AE|United Arab Emirates — map: fl", or no map segment at all. Take the unit
// name up to the em dash and the map from whatever word follows it.
const DASH = "—";
const HEAD = new RegExp("^###\\s*([A-Z]{2})\\s*\\|\\s*([^" + DASH + "\\n]+?)\\s*(?:" + DASH + "\\s*map:?\\s*`?(\\w+)`?.*)?$", "m");

const out = {};
for (const f of fs.readdirSync(PARTS).filter(x => new RegExp(GLOB).test(x)).sort()) {
  const txt = fs.readFileSync(path.join(PARTS, f), "utf8");
  const head = txt.match(HEAD);
  if (!head) { console.error(`  (no header) ${f}`); continue; }
  const [, cc, name, map] = head;
  const key = `${cc}|${name.trim()}`;
  const i = txt.indexOf("DRAFT BULLETS");
  if (i < 0) { console.error(`  (no bullets) ${f}`); continue; }
  const body = txt.slice(i);

  const spec = { fields: {}, series: {}, history: [] };
  const re = /^\s*-\s*field:\s*(\w+)\s*$\n\s*(bullets|rows):\s*$\n((?:\s{4,}-\s.*\n?)+)/gm;
  let m;
  while ((m = re.exec(body))) {
    const [, field, kind, block] = m;
    const items = block.split("\n").map(l => l.replace(/^\s*-\s*/, "").trim()).filter(Boolean);
    if (field === "policyHistory" || kind === "rows") {
      for (const it of items) {
        const y = it.match(/year:\s*(\d{4})/), d = it.match(/description:\s*"([^"]*)"/);
        if (y && d) spec.history.push({ year: +y[1], description: d[1] });
        else console.error(`ROW?  ${key}: ${it.slice(0, 70)}`);
      }
    } else if (SERIES.has(field)) {
      spec.series[field] = items;          // needs hand conversion; flagged below
    } else {
      spec.fields[field] = items;
    }
  }
  const dom = map || "dld";
  out[dom] = out[dom] || {};
  out[dom][key] = spec;
}

// Flag everything that would trip apply.js's guards, so each is fixed once and
// deliberately rather than discovered one at a time.
let flags = 0;
for (const [map, spec] of Object.entries(out)) {
  for (const [key, s] of Object.entries(spec)) {
    for (const [fld, set] of Object.entries(s.fields)) {
      set.forEach(b => {
        if (b.length > 96) { flags++; console.error(`LONG   ${map} ${key}/${fld} (${b.length}): ${b}`); }
        if (/[.;]$/.test(b)) { flags++; console.error(`PUNCT  ${map} ${key}/${fld}: ${b}`); }
      });
      if (set.length > 5) { flags++; console.error(`COUNT  ${map} ${key}/${fld}: ${set.length} bullets`); }
    }
    for (const [fld, set] of Object.entries(s.series)) {
      flags++; console.error(`SERIES ${map} ${key}/${fld}: hand conversion needed -> ${JSON.stringify(set)}`);
    }
  }
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
const n = Object.values(out).reduce((a, s) => a + Object.keys(s).length, 0);
console.error(`\n${n} entries across ${Object.keys(out).length} maps -> ${OUT}   (${flags} to fix by hand)`);
