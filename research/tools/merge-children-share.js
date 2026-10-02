// Phase 3 of COST-SHARE-PLAN.md: the children's share of organisations that serve
// children among others. Merges the five research batches (scratchpad p3/out1..5)
// into research/children-sector/ni-children-share.json and reports.
//
// For each organisation the result is a RANGE of 2024-25 children's spending:
//   floor   = the sum of expenditure lines the accounts themselves label as children's
//             (or a restricted fund's expenditure, where the fund is described as
//             children's work), excluding any line flagged check:"extraction"
//   ceiling = the total expenditure those lines belong to, unless the verdict is
//             "split published", when the floor is the whole children's figure and
//             floor = ceiling.
// Nothing is apportioned. A "mixed" line (children with others) adds to neither
// bound's certainty: it is inside the ceiling and outside the floor.
// Lines on "young people" can run past 18 (bands to 24 or 30): they are kept and
// flagged, because the source labels them as youth work, not children's.
//
// Run: node research/tools/merge-children-share.js <p3 dir>
const fs = require('fs');
const path = require('path');
const DIR = process.argv[2];
if (!DIR) { console.error('usage: merge-children-share.js <p3 dir>'); process.exit(1); }
const R = path.join(__dirname, '..', 'children-sector');

const num = (v, unit) => {
  const s = String(v == null ? '' : v).replace(/[£€,\s]/g, '');
  const m = s.match(/^\(?(-?\d+(?:\.\d+)?)\)?$/); if (!m) return null;
  let n = parseFloat(m[1]); if (/000/.test(unit || '')) n *= 1e3;
  return /€/.test(String(v) + (unit || '')) ? null : n;
};
// Only lines that say they are expenditure; a bare "restricted fund" could be income.
const isSpend = l => /expend/i.test(l.kind || '');
// Ages past 18 in the line's own label or evidence, e.g. "16-30", "up to 25", "aged 11 to 25".
const PAST18 = /\b1\d\s*(?:-|–|to)\s*(?:19|2\d|30)\b|up to (?:19|2\d|30)\b|over 18|18\+/i;
const orgsFile = JSON.parse(fs.readFileSync(path.join(R, 'ni-vcs-orgs.json'), 'utf8')).orgs;
const dupes = new Set(orgsFile.filter(o => o.duplicateOf).map(o => o.orgId));
// A UK-wide or all-island total is not a Northern Ireland ceiling.
const notNI = new Set(orgsFile.filter(o => o.gbCharityNo).map(o => o.orgId));
for (const o of orgsFile) if (/Methodist Church in Ireland/i.test(o.name)) notNI.add(o.orgId);

const orgs = [];
for (let i = 1; i <= 5; i++) {
  const d = JSON.parse(fs.readFileSync(path.join(DIR, `out${i}.json`), 'utf8'));
  for (const o of d.orgs) {
    if (dupes.has(o.orgId)) continue;
    const total = o.total ? num(o.total.value, o.total.unit) : null;
    const spend = (o.childrenLines || []).filter(l => isSpend(l));
    const clean = spend.filter(l => !l.check);
    const floor = clean.reduce((a, l) => a + (num(l.value, l.unit) || 0), 0);
    const ageFlag = (o.childrenLines || []).some(l => PAST18.test(String(l.label || '') + ' ' + String((l.evidence || {}).quote || '')));
    orgs.push({
      ...o, batch: i,
      ceilingNote: notNI.has(o.orgId) ? 'total is UK-wide or all-island, so no NI ceiling' : null,
      range: total == null ? null : {
        floor: Math.round(floor), ceiling: notNI.has(o.orgId) ? null : Math.round(o.verdict === 'split published' ? floor : total), total: Math.round(total),
        floorLines: clean.length, uncheckedLines: spend.length - clean.length,
      },
      youthPast18: ageFlag || null,
    });
  }
}
fs.writeFileSync(path.join(R, 'ni-children-share.json'), JSON.stringify({
  built: new Date().toISOString().slice(0, 10),
  rule: 'Children\'s share of organisations serving children among others, from their own latest accounts (mostly the year ending in 2025). range.floor sums expenditure lines the accounts label as children\'s, excluding lines flagged for extraction; range.ceiling is the total expenditure, or equals the floor where the split is published. Nothing apportioned. youthPast18 marks organisations whose youth lines include ages beyond 18.',
  orgs,
}, null, 1));

const v = {}; orgs.forEach(o => v[o.verdict] = (v[o.verdict] || 0) + 1);
const withR = orgs.filter(o => o.range);
const sum = k => withR.reduce((a, o) => a + (o.range[k] || 0), 0);
console.log(`${orgs.length} organisations:`, v);
console.log(`with a readable total: ${withR.length}; floor £${Math.round(sum('floor')).toLocaleString('en-GB')}; ceiling £${Math.round(sum('ceiling')).toLocaleString('en-GB')} (whole spend of these £${Math.round(sum('total')).toLocaleString('en-GB')})`);
console.log('lines flagged for extraction, left out of floors:', withR.reduce((a, o) => a + o.range.uncheckedLines, 0));
console.log('organisations with youth lines past 18:', orgs.filter(o => o.youthPast18).length);
console.log('\nlargest floors:'); withR.sort((a, b) => b.range.floor - a.range.floor).slice(0, 12).forEach(o => console.log(`  ${o.name.slice(0, 40).padEnd(40)} floor £${o.range.floor.toLocaleString('en-GB').padStart(10)}  of £${o.range.total.toLocaleString('en-GB').padStart(11)}  ${o.verdict}`));
console.log('\nlargest ceilings with a zero floor:'); withR.filter(o => !o.range.floor).sort((a, b) => b.range.total - a.range.total).slice(0, 8).forEach(o => console.log(`  ${o.name.slice(0, 40).padEnd(40)} £${o.range.total.toLocaleString('en-GB')}`));
