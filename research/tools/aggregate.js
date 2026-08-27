// Per-country aggregation of the COST Action IS1406 practitioner survey.
//
// The response scales are NOT uniform and getting this wrong inverts meaning.
// Per the published coding manual:
//   TICK   0 = no, 1 = yes                      (S1 Q12/Q13, S2 Q2)
//   YSND   1 Yes, 2 Somewhat, 3 No, 4 Don't know, 5 N/A   (S4 Q1, S4 Q6)
//   FREQ4  1 Never, 2 Sometimes, 3 Most of the time, 4 Always, 5 N/A  (S4 Q10)
// For YSND and FREQ4 the "don't know" and "N/A" codes are excluded from the
// denominator rather than counted as a negative answer.
const fs = require("fs");
const { data } = require("./load.js");

const COUNTRY = {
  1:"Albania",2:"Austria",3:"Belgium",4:"Bosnia and Herzegovina",5:"Bulgaria",6:"Croatia",7:"Cyprus",
  8:"Czechia",9:"Denmark",10:"Estonia",11:"Finland",12:"France",13:"Germany",14:"Greece",15:"Hungary",
  16:"Iceland",17:"Ireland",18:"Israel",19:"Italy",20:"Latvia",21:"Lebanon",22:"Lithuania",23:"Luxembourg",
  24:"North Macedonia",25:"Malta",26:"Netherlands",27:"Norway",28:"Poland",29:"Portugal",30:"Romania",
  31:"Serbia",32:"Slovakia",33:"Slovenia",34:"South Africa",35:"Spain",36:"Sweden",37:"Switzerland",
  38:"Türkiye",39:"United Kingdom",40:"Argentina",41:"Australia",44:"Chile",45:"Dubai",46:"Kenya",
  49:"Namibia",50:"Oman",52:"Senegal",53:"United Arab Emirates",54:"Uganda",55:"United States",
  56:"Zimbabwe",57:"Tanzania",59:"New Caledonia",60:"Moldova",61:"Belarus",62:"Russia",
};

const TICK = {
  fund: { "government health": 79, "government social services": 81, "government education": 83, charity: 85, family: 87, "state health insurance": 89, "private health insurance": 91, "pro bono": 93 },
  setting: { hospital: 37, "health clinic or centre": 39, "nursery or kindergarten": 41, "mainstream school": 43, "special school": 45, "private practice": 47, "private rehabilitation centre": 49 },
  sector: { "public education": 54, "public health": 56, charitable: 58, private: 60, "government-funded private": 62, NGO: 64 },
};

const YSND = {
  mling: { "more services than monolingual peers": 374, "assessment in the mother tongue where it differs from the mainstream language": 376, "assessment in the mainstream language only": 378, "assessment in the mother tongue only": 380, "assessment in both languages": 382, "assessment in more than two languages": 384, "intervention in the mother tongue": 386, "intervention in the mainstream language only": 388, "intervention in the mother tongue only": 390, "intervention targeting two or more languages": 392, "school remedial services tied to bi/multilingualism": 394 },
  access: { "urban or rural residence": 316, "social position": 318, "income level": 320, "cost to parents": 322, "linguistic or cultural community": 324, "parental education": 326, "regional variation": 328 },
};

const FREQ4 = { interpreters: { assessment: 423, intervention: 425, counselling: 427 } };

const FREQ = { 1:"less than monthly", 2:"monthly", 3:"fortnightly", 4:"weekly", 5:"twice weekly", 6:"three to five times a week" };
const DUR = { 1:"under 30 minutes", 2:"30-45 minutes", 3:"46-60 minutes", 4:"over 60 minutes" };
const CAPN = { 1:"fewer than 6", 2:"7-12", 3:"13-20", 4:"21-50", 5:"more than 50" };
const TRAIN = { 1:"optional training courses", 2:"obligatory training courses", 3:"no training courses", 4:"don't know", 5:"not applicable" };

const num = v => { const n = parseInt(String(v).trim(), 10); return Number.isFinite(n) ? n : null; };

// 0/1 checkbox: percentage who ticked.
function tickBlock(rows, block) {
  const out = {};
  for (const [label, col] of Object.entries(block)) {
    let yes = 0, seen = 0;
    for (const r of rows) {
      const v = num(r[col]);
      if (v === null || v === 999) continue;
      seen++;
      if (v === 1) yes++;
    }
    out[label] = seen ? { pct: Math.round((yes / seen) * 100), n: seen, yes } : null;
  }
  return out;
}

// Yes / Somewhat / No, with don't-know and N/A dropped from the denominator.
function ysndBlock(rows, block) {
  const out = {};
  for (const [label, col] of Object.entries(block)) {
    let yes = 0, somewhat = 0, seen = 0;
    for (const r of rows) {
      const v = num(r[col]);
      if (v === null || v > 3 || v < 1) continue;
      seen++;
      if (v === 1) yes++;
      else if (v === 2) somewhat++;
    }
    out[label] = seen ? { pct: Math.round((yes / seen) * 100), pctYesOrSome: Math.round(((yes + somewhat) / seen) * 100), n: seen, yes, somewhat } : null;
  }
  return out;
}

// Never / Sometimes / Most of the time / Always -> percentage who ever do it.
function freq4Block(rows, block) {
  const out = {};
  for (const [label, col] of Object.entries(block)) {
    let ever = 0, seen = 0;
    for (const r of rows) {
      const v = num(r[col]);
      if (v === null || v < 1 || v > 4) continue;
      seen++;
      if (v >= 2) ever++;
    }
    out[label] = seen ? { pct: Math.round((ever / seen) * 100), n: seen, ever } : null;
  }
  return out;
}

function dist(rows, col, map) {
  const counts = {}; let total = 0;
  for (const r of rows) {
    const v = num(r[col]);
    if (v === null || v === 999 || !map[v]) continue;
    counts[map[v]] = (counts[map[v]] || 0) + 1; total++;
  }
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
    .map(([k, c]) => ({ label: k, pct: Math.round((c / total) * 100), count: c }));
  return { total, ranked };
}

const byCountry = new Map();
for (const r of data) {
  const cc = num(r[3]);
  if (cc === null || !COUNTRY[cc]) continue;
  if (!byCountry.has(cc)) byCountry.set(cc, []);
  byCountry.get(cc).push(r);
}

const result = {};
for (const [cc, rows] of byCountry) {
  result[COUNTRY[cc]] = {
    countryCode: cc,
    n: rows.length,
    funding: tickBlock(rows, TICK.fund),
    setting: tickBlock(rows, TICK.setting),
    sector: tickBlock(rows, TICK.sector),
    multilingual: ysndBlock(rows, YSND.mling),
    access: ysndBlock(rows, YSND.access),
    interpreters: freq4Block(rows, FREQ4.interpreters),
    frequency: dist(rows, 125, FREQ),
    duration: dist(rows, 127, DUR),
    sessionCap: tickBlock(rows, { "a maximum number of sessions": 129 }),
    capSize: dist(rows, 131, CAPN),
    mlTraining: dist(rows, 415, TRAIN),
  };
}

fs.writeFileSync("cost/bycountry.json", JSON.stringify(result, null, 1));
const names = Object.entries(result).sort((a, b) => b[1].n - a[1].n);
console.log("countries:", names.length, "| n>=30:", names.filter(x => x[1].n >= 30).length);
