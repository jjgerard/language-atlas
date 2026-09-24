// Builds research/codings/policyhistory-dld-last48.json.
// Decisions are keyed by unit and by POSITION in that entry's policyHistory, in
// the order the rows are stored; the year/matches/occurrence key is computed
// here with the same normalisation hist-operation.js uses, so it cannot drift.
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/dld.json', 'utf8'));

const OPS = {
  'AW|Aruba': [['instrument made', ['obligation added']]],
  'BT|Bhutan': [
    ['body or programme established'], ['body or programme established'],
    ['provision described'], ['plan or strategy issued'],
    ['instrument made'], ['provision described'],
  ],
  'IM|Isle of Man': [
    ['provision described'], ['provision described'],
    ['body or programme established'],
  ],
  'MV|Maldives': [
    ['international instrument accepted'], ['instrument made'],
    ['instrument made'], ['instrument made'],
    ['provision described'], ['instrument amended'], ['provision described'],
  ],
  'SA|Saudi Arabia': [
    ['body or programme established'], ['provision described'],
    ['body or programme established'], ['instrument made'],
    ['provision described'], ['instrument made'],
    ['instrument made'], ['body or programme established'],
  ],
  'SY|Syria': [
    ['body or programme established'], ['provision described'],
    ['provision described'], ['plan or strategy issued'],
    ['international instrument accepted'], ['provision described'],
    ['body or programme established'],
  ],
  'TH|Thailand': [
    ['body or programme established'], ['body or programme established'],
    ['body or programme established'], ['provision described'],
    ['provision described'], ['instrument replaced'],
    ['provision described'], ['provision described'],
    ['body or programme established'],
  ],
  'VA|Vatican City': [
    ['body or programme established'], ['provision described'],
    ['instrument made'], ['instrument made'], ['instrument amended'],
  ],
  'WF|Wallis and Futuna': [
    ['provision described'], ['body or programme established'],
  ],
};

const key60 = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 60).trim();
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();

const out = {};
for (const [key, decisions] of Object.entries(OPS)) {
  const [cc, name] = key.split('|');
  const e = d.find(x => x.countryCode === cc && x.unitName === name);
  if (!e) throw new Error('no entry ' + key);
  const hist = e.policyHistory || [];
  if (hist.length !== decisions.length) throw new Error(key + ': ' + hist.length + ' rows, ' + decisions.length + ' decisions');
  const seen = {};
  const rows = [];
  hist.forEach((h, i) => {
    const m = key60(norm(h.description));
    const k = norm(h.year) + '|' + m;
    seen[k] = (seen[k] || 0) + 1;
    const [operation, scope] = decisions[i];
    const r = { year: String(h.year), matches: m, occurrence: seen[k], operation };
    if (scope) r.scope_change = scope;
    rows.push(r);
  });
  out[key] = { policyHistory: rows };
}
fs.writeFileSync('research/codings/policyhistory-dld-last48.json', JSON.stringify(out, null, 2) + '\n');
console.log('units', Object.keys(out).length, 'rows', Object.values(out).reduce((n, v) => n + v.policyHistory.length, 0));
