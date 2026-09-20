// An outcome measure from outside the atlas, across four PISA cycles.
//
// Everything else the app computes comes from its own structure -- field
// states, coded columns, dated rows, source links. trends.js says why at
// length: the entry prose is deliberately hedged, and a layer that guesses at
// it turns uncertainty into confident-looking counts. This file is the only
// thing that brings in a number the atlas did not write, so it is worth being
// clear about what that costs.
//
// WHAT THE NUMBER IS NOT. It is not an effect of policy. The immigrant
// attainment gap is driven far more by who a country's immigrants are -- origin
// mix, socio-economic status, distance between the home language and the test
// language -- than by any rule about who enters or leaves a support category.
// The United Arab Emirates shows an immigrant ADVANTAGE of 93 score points in
// science because an immigrant student there is often an expatriate
// professional's child; Germany shows a deficit. No classification rule
// explains that, and it replicates across cycles rather than being one year's
// accident. Every cross run against these columns has either come out null or
// collapsed once a handful of Gulf states were set aside.
//
// So the guards in the consumer are not optional decoration. National units
// only, a floor on group size, and the Gulf split reported beside every result
// -- because a summary travels further than the entries it came from.
//
// TWO BASES, AND THEY ARE NOT SPLICED. The science series is one trend table
// that recomputes every cycle on a comparable basis. The 2022 mathematics,
// reading and within-immigrant language figures come from that cycle's own
// tables. Checked against each other on 2022 science, 20 of 71 countries differ
// by more than a score point and the worst by 4.4. Small, real, and reason
// enough to keep the two apart and label which is which rather than to merge
// them into one tidier-looking series.
//
// The country join is resolved offline and written into the file. The app does
// not match on names at runtime: the alias table (Czech Republic to Czechia,
// Chinese Taipei to Taiwan) is a reading, and readings get written down.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'pisa-outcomes.json');

let cache = null;
function load() {
  if (cache) return cache;
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    // A missing outcome file is not a broken atlas. Everything else on the
    // page derives from the entries and stands up without this.
    cache = { sources: null, cycles: [], outcomes: {}, byCountry: {}, unjoined: [] };
    return cache;
  }
  const byCountry = {};
  for (const r of raw.rows || []) {
    if (!r.countryCode) continue;
    byCountry[r.countryCode] = { name: r.name, values: r.values || {} };
  }
  cache = {
    sources: raw.sources,
    retrieved: raw.retrieved,
    cycles: raw.cycles || [],
    outcomes: raw.outcomes || {},
    caveats: raw.caveats || [],
    unjoined: (raw.rows || []).filter(r => !r.countryCode).map(r => ({ name: r.name, why: r.join })),
    byCountry,
  };
  return cache;
}

module.exports = { load };
