// An outcome measure from outside the atlas.
//
// Everything else the app computes comes from its own structure -- field
// states, coded columns, dated rows, source links. trends.js says why at
// length: the entry prose is deliberately hedged, and a layer that guesses at
// it turns uncertainty into confident-looking counts. This file is the first
// thing that brings in a number the atlas did not write, so it is worth being
// clear about what that costs.
//
// PISA 2022 reports, per country, the mean score of immigrant students against
// non-immigrant students, and -- within immigrant students -- those who speak
// the language of assessment at home against those who do not. The last of
// those is the one closest to what this atlas is about: it holds migration
// constant and asks about language.
//
// WHAT THIS NUMBER IS NOT. It is not an effect of policy. The gap is driven
// far more by who a country's immigrants are -- origin mix, socio-economic
// status, distance between the home language and the test language -- than by
// any rule about who enters or leaves a support category. The United Arab
// Emirates shows an immigrant ADVANTAGE of 90 score points in mathematics
// because an immigrant student there is often an expatriate professional's
// child; Germany shows a 59-point deficit. No classification rule explains
// that, and every cross run against these columns so far has either come out
// null or collapsed once a handful of Gulf states were set aside.
//
// So the guards in the consumer are not optional decoration. National units
// only, a floor on group size, and the regional split reported beside every
// result -- because a summary travels further than the entries it came from.
//
// The country join is resolved offline and written into the file. The app does
// not match on names at runtime: the alias table (Czech Republic to Czechia,
// Chinese Taipei to Taiwan) is a reading, and readings get written down.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'pisa-2022-outcomes.json');

let cache = null;
function load() {
  if (cache) return cache;
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    // A missing outcome file is not a broken atlas. Everything else on the
    // page derives from the entries and stands up without this.
    cache = { source: null, outcomes: {}, byCountry: {}, rows: [] };
    return cache;
  }
  const byCountry = {};
  for (const r of raw.rows || []) {
    if (!r.countryCode) continue;
    byCountry[r.countryCode] = {
      name: r.name,
      maths: r.maths && r.maths.diff,
      reading: r.reading && r.reading.diff,
      science: r.science && r.science.diff,
      homeLanguage: r.homeLanguage && r.homeLanguage.diff,
    };
  }
  cache = {
    source: raw.source,
    statLink: raw.statLink,
    retrieved: raw.retrieved,
    outcomes: raw.outcomes || {},
    caveats: raw.caveats || [],
    unjoined: (raw.rows || []).filter(r => !r.countryCode).map(r => ({ name: r.name, why: r.join })),
    byCountry,
  };
  return cache;
}

module.exports = { load };
