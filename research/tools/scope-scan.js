// Surface policyHistory rows that may record a change of SCOPE -- who is
// covered, or whether a thing binds -- rather than an operation on a document.
//
//     node research/tools/scope-scan.js [--domain d] [--region r] [--count n] [--from n]
//     node research/tools/scope-scan.js --counts        (per domain x region)
//
// The markers below are deliberately WIDER than the shape recorded during the
// operation pass. That pass named the shape from thirteen eal rows; a scan built
// from exactly those thirteen would find thirteen more and prove nothing. These
// catch the near misses too, so the reading decides rather than the regex.
const fs = require("fs");
const { pathFor } = require("./datafile.js");

const MARKERS = [
  // who is covered
  /\bextend(?:ed|s|ing)?\b/i, /\bbroaden\w*\b/i, /\bnarrow\w*\b/i, /\brestrict\w*\b/i,
  /\beligib\w*\b/i, /\bentitle\w*\b/i, /\bcover(?:s|ed|age)\b/i, /\bapplies? to\b/i,
  // whether it binds
  /\bbecomes? (?:mandatory|compulsory|obligatory|optional|voluntary)\b/i,
  /\bmade (?:mandatory|compulsory|optional)\b/i, /\bno longer (?:mandatory|compulsory|required)\b/i,
  /\bmandator\w*\b/i, /\bcompulsor\w*\b/i, /\btakes? effect\b/i, /\bcomes? into effect\b/i,
  /\bformalis\w*\b|\bformaliz\w*\b/i,
  // a quantity moving
  /\b(?:raised|lowered|relaxed|tightened|reduced|increased|moved)\b/i,
  /\bfrom \d+ to \d+\b/i, /\bthreshold\b/i, /\bminimum\b/i, /\bcap\b/i,
  // reach
  /\brolled out\b/i, /\bphased in\b/i, /\bexpand\w*\b/i, /\bscaled? up\b/i,
];

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf("--" + n); return i < 0 ? d : args[i + 1]; };
const DOMAINS = opt("domain", null) ? [opt("domain", null)] : ["eal", "dld", "indigenous", "fl", "he"];
const region = opt("region", null), from = +opt("from", 0), count = +opt("count", 40);
const key60 = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 60).trim();

const hits = [];
for (const d of DOMAINS)
  for (const e of JSON.parse(fs.readFileSync(pathFor(d), "utf8"))) {
    if (region && e.region !== region) continue;
    const hist = Array.isArray(e.policyHistory) ? e.policyHistory : [];
    const coded = Array.isArray((e.coding || {}).policyHistory) ? e.coding.policyHistory : [];
    const seen = {};
    for (const h of hist) {
      const desc = String(h.description || "").replace(/\s+/g, " ").trim();
      const k = key60(desc), kk = String(h.year) + "|" + k;
      seen[kk] = (seen[kk] || 0) + 1;
      if (!MARKERS.some(re => re.test(desc))) continue;
      const c = coded.find(x => String(x.year) === String(h.year) && x.matches === k
        && Number(x.occurrence || 1) === seen[kk]);
      hits.push({ d, region: e.region, cc: e.countryCode, unit: e.unitName, year: h.year,
        op: (c && (c.operation || c.not_an_operation)) || "(unset)", desc });
    }
  }

if (args.includes("--counts")) {
  const t = {};
  for (const h of hits) t[h.d + " " + h.region] = (t[h.d + " " + h.region] || 0) + 1;
  for (const k of Object.keys(t).sort()) console.log("  " + k.padEnd(24) + String(t[k]).padStart(4));
  console.log("  " + "TOTAL".padEnd(24) + String(hits.length).padStart(4) + " candidate rows");
} else {
  // Interleave domains so a read is not forty rows of one map, which is how the
  // operation pass nearly derived a vocabulary out of Europe.
  hits.sort((a, b) => (a.year + a.cc).localeCompare(b.year + b.cc));
  for (const h of hits.slice(from, from + count))
    console.log("[" + h.d + "/" + h.region + "] " + h.cc + " " + h.unit + " " + h.year
      + "\n  NOW: " + h.op + "\n  " + h.desc + "\n");
  console.log("-- showing " + from + ".." + Math.min(from + count, hits.length) + " of " + hits.length);
}
