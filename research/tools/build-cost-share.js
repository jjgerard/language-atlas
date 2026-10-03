// Phase 4 of COST-SHARE-PLAN.md: the first "who pays" view for Northern Ireland's
// children's services, 2024-25. Writes research/children-sector/ni-cost-share.json.
//
// Every row is a published figure, a sum of published lines within one layer, or a
// range. Layers are never added to each other, because they overlap in ways the
// sources do not let us remove (a trust's children's directorate spend includes
// what it pays voluntary organisations; health does not say how much).
//
// Avoiding double counting inside layer B (government money through the VCSE):
//   B1 children-only programmes are taken from the PAYER'S total;
//   B2 recipient-side lines to children-focused organisations EXCLUDE the payers
//      and programmes already in B1 (EA; DE Sure Start and Pathway; TEO camps), so
//      the same pound is not counted in both;
//   B3 mixed organisations count only government money their accounts tie to a
//      children's activity (phase 3), as a floor.
//
// Run: node research/tools/build-cost-share.js
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));
const flows = read('ni-flows.json').flows;
const prof = Object.fromEntries(read('ni-vcs-profiles.json').profiles.map(p => [p.orgId, p]));
const orgs = Object.fromEntries(read('ni-vcs-orgs.json').orgs.filter(o => o.orgId).map(o => [o.orgId, o]));
const budgets = read('ni-budgets.json').figures;
const payer = read('ni-payer-totals.json').figures;
const share = read('ni-children-share.json').orgs;
const vol = read('ni-volunteer-params.json');
const GOV = new Set(['ni-gov', 'council', 'uk-gov']);
const OTHER_PUBLIC = new Set(['irish-gov', 'intergovernmental', 'north-south', 'lottery-dormant']);
const focus = id => ((prof[id] || {}).focus || {}).value;
const num = (v, unit) => { const s = String(v == null ? '' : v).replace(/[£,\s]/g, ''); const m = s.match(/^\(?(-?\d+(?:\.\d+)?)\)?$/); if (!m) return null;
  let n = parseFloat(m[1]); if (/000/.test(unit || '')) n *= 1e3; else if (/m(illion)?\b/i.test(unit || '')) n *= 1e6; return n; };
const src = (url, page, label) => ({ url, page: page ?? null, label: label || null });

// ---------------- A: government-delivered, published statutory children's lines ----------------
const A = [];
const pickBudget = (bodyId, re, why) => budgets.filter(f => f.bodyId === bodyId && f.year === '2024-25' && f.kind === 'outturn' && re.test(f.label) && f.check !== 'extraction')
  .slice(0, 1).forEach(f => A.push({ body: bodyId, label: f.label, gbp: num(f.value, f.unit), unit: f.unit, value: f.value, note: why || null, mixed: f.mixed || null, source: src(f.url, f.page, f.label) }));
for (const t of ['trust-belfast', 'trust-northern', 'trust-southeastern', 'trust-southern', 'trust-western'])
  pickBudget(t, /child|famil/i, 'directorate line; includes payments to voluntary providers that the trust does not publish separately');
pickBudget('yja', /net expenditure/i); pickBudget('ccga', /net expenditure/i); pickBudget('niccy', /net expenditure/i);

// ---------------- B1: children-only programmes, payer side ----------------
const B1 = [];
const pickPayer = (re, why) => { const f = payer.find(x => re.test(x.label || '')); if (f) B1.push({ payer: f.payer, label: f.label, gbp: num(f.value, f.unit), value: f.value, unit: f.unit, kind: f.kind, year: f.year, check: f.check || null, note: why, source: src(f.url, f.page, f.label) }); };
pickPayer(/^Youth Service grants/i, 'grants to voluntary youth organisations');
pickPayer(/Pre-School Education Programme/i, 'includes private providers; the split is not published');
pickPayer(/Sure Start/i, 'lead bodies include trusts as well as voluntary organisations; the split is not published');
pickPayer(/Pathway/i, 'an award, administered by Early Years');
pickPayer(/112 camps/i, 'a plan figure; camps are for ages 9-25');

// ---------------- B2: other government money to children-focused organisations ----------------
const inB1 = f => f.payer === 'ea' || (f.payer === 'de' && /sure ?start|pathway/i.test(f.label + ' ' + (f.via || ''))) || (f.payer === 'teo' && /T:?BUC|camp/i.test(f.label));
const y = flows.filter(f => f.kind === 'income line' && f.year === '2024-25' && f.gbp != null && f.countOnce !== false);
const cf = y.filter(f => focus(f.recipient) === 'children-focused' && GOV.has(f.payerKind));
const B2lines = cf.filter(f => !inB1(f));
const byPayer = {}; for (const f of B2lines) (byPayer[f.payer] ||= { gbp: 0, orgs: new Set() }), byPayer[f.payer].gbp += f.gbp, byPayer[f.payer].orgs.add(f.recipient);
const B2 = { gbp: Math.round(B2lines.reduce((a, f) => a + f.gbp, 0)), lines: B2lines.length, orgs: new Set(B2lines.map(f => f.recipient)).size,
  excludedAsB1: Math.round(cf.filter(inB1).reduce((a, f) => a + f.gbp, 0)),
  byPayer: Object.entries(byPayer).map(([k, v]) => ({ payer: k, gbp: Math.round(v.gbp), orgs: v.orgs.size })).sort((a, b) => b.gbp - a.gbp) };

// ---------------- B3: mixed organisations, government money tied to children's work ----------------
// Money from the B1 payers and programmes is already counted there, so it is left out here.
const inB1Text = t => /education authority|\bEA\b|\bSELB\b|\bWELB\b|sure ?start|pathway|T:?BUC|camp/i.test(t);
let b3 = 0, b3n = 0, b3Excluded = 0; const B3orgs = [];
for (const o of share) { let s = 0; for (const g of o.childrenGovMoney || []) { const v = num(g.value, g.unit || (o.total || {}).unit); if (v == null || g.check) continue;
    if (inB1Text((g.funder || '') + ' ' + (g.label || ''))) { b3Excluded += v; continue; } s += v; }
  if (s) { b3 += s; b3n++; B3orgs.push({ orgId: o.orgId, name: o.name, gbp: Math.round(s), youthPast18: o.youthPast18 || (prof[o.orgId] || {}).services && prof[o.orgId].services.some(x => x.code === 'training-employment') || null }); } }
const B3 = { gbp: Math.round(b3), orgs: b3n, excludedAsB1: Math.round(b3Excluded), list: B3orgs.sort((a, b) => b.gbp - a.gbp), note: 'a floor: only money the accounts tie to a children\'s activity' };

// ---------------- C: VCSE own money, children-focused organisations ----------------
// Total income (register, latest return) minus every public line in the same accounts.
// Only organisations whose accounts break income down by funder, and whose return
// falls in 2024-25 by the overlap rule, count.
const C = { orgs: 0, income: 0, government: 0, otherPublic: 0, unattributed: 0, nonPublic: 0, excluded: { noBreakdown: 0, otherYear: 0, noIncome: 0 } };
for (const [id, o] of Object.entries(orgs)) {
  if (o.duplicateOf || o.possiblyStatutory || o.privateProvider || o.outOfScope || o.onlyWeak || focus(id) !== 'children-focused') continue;
  const p = prof[id], inc = o.register ? +o.register.income : null;
  if (!inc) { C.excluded.noIncome++; continue; }
  if (!(p && p.funding && p.funding.breakdown)) { C.excluded.noBreakdown++; continue; }
  const lines = flows.filter(f => f.kind === 'income line' && f.recipient === id && f.gbp != null);
  if (lines.length && lines.some(f => f.year !== '2024-25')) { C.excluded.otherYear++; continue; }
  const g = lines.filter(f => GOV.has(f.payerKind)).reduce((a, f) => a + f.gbp, 0);
  const op = lines.filter(f => OTHER_PUBLIC.has(f.payerKind)).reduce((a, f) => a + f.gbp, 0);
  const un = lines.filter(f => f.payerKind === 'not-named' || f.payerKind === 'multiple').reduce((a, f) => a + f.gbp, 0);
  C.orgs++; C.income += inc; C.government += g; C.otherPublic += op; C.unattributed += un; C.nonPublic += Math.max(0, inc - g - op - un);
}
for (const k of ['income', 'government', 'otherPublic', 'unattributed', 'nonPublic']) C[k] = Math.round(C[k]);
C.note = 'nonPublic = total income minus every public or unattributed line in the same accounts: fees, donations, trusts and foundations, Children in Need, trading. Lottery distributors count as public here, per the agreed definition.';

// ---------------- D: volunteer time (modelled, a floor) ----------------
// Hours per four weeks are published only as bands (DfC, Continuous Household Survey
// 2024/25, all volunteers, formal and informal). The floor takes each band's LOWER
// edge; "Less than 8" and "None" count as zero. The top band is open, so there is no
// honest upper bound.
const bands = vol.time.filter(t => /2024\/25|2024-25/.test(String(t.year)) && /hours/i.test(t.measure || '') && /%|per ?cent/i.test(String(t.unit || '')));
// The band is the text after the colon ("...last 4 weeks: 8 to 16 hours"); the "4" before it is not a band edge.
const lowerEdge = m => { const s = String(m).split(':').pop(); if (/none|less than/i.test(s)) return 0; const n = s.match(/(\d+)/); return n ? +n[1] : null; };
let perFour = 0, bandRows = 0; for (const b of bands) { const e = lowerEdge(b.measure), pct = parseFloat(b.value); if (e != null && !isNaN(pct)) { perFour += e * pct / 100; bandRows++; } }
const wage = vol.wage.find(w => /youth and community workers/i.test(w.measure || '') && /2024/.test(String(w.year)));
const regVol = Object.fromEntries(read('ni-vcs-register.json').charities.map(c => [c.regNo, +c.volunteers || 0]));
let volunteers = 0, volOrgs = 0;
for (const [id, o] of Object.entries(orgs)) { if (o.duplicateOf || o.possiblyStatutory || o.privateProvider || o.outOfScope || o.onlyWeak || focus(id) !== 'children-focused') continue;
  const n = o.regNo ? regVol[o.regNo] : 0; if (n) { volunteers += n; volOrgs++; } }
const hoursYear = perFour * 13;
const D = { model: true, volunteers, orgs: volOrgs, hoursPerFourWeeksFloor: Math.round(perFour * 100) / 100, bandsUsed: bandRows,
  wage: wage ? { value: wage.value, measure: wage.measure, year: wage.year, url: wage.url } : null,
  gbpFloor: wage ? Math.round(volunteers * hoursYear * parseFloat(wage.value)) : null,
  note: 'A modelled floor, not cash. Volunteer counts are each organisation\'s own register return; hours are the lower edges of DfC\'s published bands (all volunteers, formal and informal, 2024/25), times 13 four-week periods; valued at the NI median hourly pay of youth and community workers (ASHE, April 2024). The top band is open, so no upper bound is given.' };

const out = { built: new Date().toISOString().slice(0, 10), year: '2024-25', unit: 'Northern Ireland', sector: 'children',
  rule: 'Layers are never added together: A includes payments to the voluntary sector that health does not publish separately, so A + B would double count. Within B, B2 excludes the payers and programmes already counted in B1.',
  A, B1, B2, B3, C, D };
fs.writeFileSync(path.join(R, 'ni-cost-share.json'), JSON.stringify(out, null, 1));

const f = n => n == null ? '—' : '£' + Math.round(n).toLocaleString('en-GB');
console.log('A government-delivered lines:'); A.forEach(a => console.log(`  ${a.body.padEnd(18)} ${String(a.label).slice(0, 40).padEnd(40)} ${f(a.gbp)}`));
console.log('B1 children-only programmes (payer side):'); B1.forEach(b => console.log(`  ${String(b.label).slice(0, 50).padEnd(50)} ${f(b.gbp)} ${b.kind}${b.check ? ' check:' + b.check : ''}`));
console.log(`B2 other government money to children-focused orgs: ${f(B2.gbp)} (${B2.lines} lines, ${B2.orgs} orgs; ${f(B2.excludedAsB1)} left out as already in B1)`);
B2.byPayer.slice(0, 8).forEach(p => console.log(`    ${p.payer.padEnd(18)} ${f(p.gbp)} ${p.orgs} orgs`));
console.log(`B3 mixed orgs, children's government money (floor): ${f(B3.gbp)} in ${B3.orgs} orgs; ${f(B3.excludedAsB1)} left out as already in B1`);
B3.list.slice(0, 8).forEach(o => console.log(`    ${o.name.slice(0, 40).padEnd(40)} ${f(o.gbp)}`));
console.log(`C children-focused orgs with a funder breakdown (${C.orgs}): income ${f(C.income)} = government ${f(C.government)} + other public ${f(C.otherPublic)} + unattributed ${f(C.unattributed)} + non-public ${f(C.nonPublic)}; excluded`, C.excluded);
console.log(`D volunteers: ${volunteers} in ${volOrgs} orgs; ≥${D.hoursPerFourWeeksFloor} h per 4 weeks (${bandRows} bands); wage ${wage ? wage.value : '?'}; floor ${f(D.gbpFloor)}`);
