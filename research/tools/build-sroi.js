// The SROI analysis, per research/children-sector/SROI-METHOD.md.
// Writes research/children-sector/ni-sroi.json.
//
// Three parts, every number sourced or a named parameter:
//   1. existing published studies, reported as their authors give them;
//   2. break-even: for each programme, published cost ÷ published reach, set
//      against published NI unit costs: "it pays back its cost if it prevents N
//      of these". No outcome is assumed, so every figure is sourced;
//   3. an indicative SROI ratio, only where a measured outcome and a published
//      value exist for the same scope (VOYPIC), with low/central/high parameters.
//      The low case takes every parameter's least favourable value at once.
//
// Run: node research/tools/build-sroi.js
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));
const must = (x, what) => { if (!x) throw new Error('missing source for ' + what); return x; };
const n = v => parseFloat(String(v).replace(/[^0-9.]/g, ''));

const proxies = read('ni-sroi-proxies.json').proxies;
const act = read('ni-activity-statutory.json').figures;
const actV = read('ni-activity-vcse.json').orgs;
const payer = read('ni-payer-totals.json').figures;
const health = read('ni-health-published.json').figures;
const outcomes = read('ni-sroi-outcomes.json').programmes;
const uk = read('ni-uk-charities.json').charities;
const reg = read('ni-vcs-register.json').charities;
const existing = read('ni-sroi-existing.json');

// ---------- published NI unit costs, 2024-25 (DoH Community & PSS average unit costs) ----------
const px = (re, what) => { const p = must(proxies.find(x => re.test(x.label) && x.geography === 'NI' && /2024-25/.test(String(x.priceYear || x.year || ''))), what);
  return { label: p.label, value: +p.value, unit: p.unit, year: '2024-25', url: p.url, table: p.table || null }; };
const UNIT = {
  residentialYear: (p => ({ ...p, value: p.value * 52, unit: 'per child-year (52 × the published weekly cost)', weekly: p.value }))(px(/Residential Homes - Combined Residential Care - POC: Child/, 'residential care')),
  lacCase: px(/^Social Work - Looked After Children$/, 'LAC social work'),
  fosterCase: px(/^Social Work - Family Placements/, 'fostering'),
  familySupportCase: px(/^Social Work - Family Support & Intervention$/, 'family support'),
  camhsContact: px(/^CAMHS - CAMHS$/, 'CAMHS'),
};

// ---------- programmes: cost and reach, same year and scope ----------
const actRow = (re, area = 'NI') => must(act.find(f => re.test(f.measure) && f.area === area), String(re));
const P = [];
{ // Sure Start
  const c = must(payer.find(f => /Sure Start/i.test(f.label)), 'Sure Start cost'); const r = actRow(/^Registered Children 0-3/);
  P.push({ id: 'sure-start', name: 'Sure Start (38 projects)', cost: n(c.value) * 1e6, costLabel: c.label, costSource: { url: c.url, page: c.page ?? null },
    costNote: 'DE infographic value, flagged as read from a chart; the NIAO gives £34m', reach: +r.value, reachUnit: 'children 0-3 registered', reachSource: { url: r.url, table: r.table || null }, year: '2024-25' });
}
{ // Family Support Hubs: lead-body funding per hub, 2023/24, from one Assembly answer
  const rows = health.filter(f => /16883/.test(JSON.stringify(f)) && /2023\/24/.test(f.year || ''));
  const cost = rows.reduce((a, f) => a + n(f.value), 0); const r = actRow(/No\. of Families Referred/);
  P.push({ id: 'family-support-hubs', name: 'Family Support Hubs (29)', cost, costLabel: `hub funding to lead organisations, ${rows.length} rows of AQW 16883/22-27`, costSource: { url: must(rows[0], 'AQW 16883').url, page: null },
    costNote: 'funding is 2023/24; referrals are 2024/25, the nearest year published for each', reach: +r.value, reachUnit: 'families referred', reachSource: { url: r.url, table: r.table || null }, year: '2023/24 cost, 2024-25 reach' });
}
{ // VOYPIC: whole-organisation spend and whole-organisation reach
  const c = must(reg.find(x => /Voice of Young People in Care/i.test(x.name)), 'VOYPIC register'); const v = must(actV.find(o => /VOYPIC|Voice of Young/i.test(o.name)), 'VOYPIC activity');
  const r = must(v.figures.find(f => /^During the year we supported/.test(f.measure)), 'VOYPIC reach');
  P.push({ id: 'voypic', name: 'VOYPIC (advocacy and participation, children in care)', cost: +c.spending, costLabel: 'total spending, register return for the year ending ' + c.fyEnd,
    costSource: { url: `https://www.charitycommissionni.org.uk/charity-search/charity-details-page/?regId=${c.regNo}&subId=0`, page: null }, costNote: null,
    reach: n(r.value), reachUnit: 'children and young people supported', reachSource: { url: r.url, page: r.page ?? null }, year: '2024-25' });
}
{ // The King's Trust NI: its own NI table
  const k = must(uk.find(c => /King's Trust/i.test(c.name)), "King's Trust");
  const e = must(k.niTotals.find(t => t.kind === 'expenditure'), "King's Trust NI expenditure");
  const r = (k.niActivity || []).concat(k.niTotals).find(t => /young people/i.test(t.label || t.measure || '') && n(t.value) > 1000);
  if (r) P.push({ id: 'kings-trust-ni', name: "The King's Trust, Northern Ireland", cost: n(e.value) * (/000/.test(e.unit || '') ? 1e3 : 1), costLabel: e.label, costSource: { url: e.url, page: e.page ?? null },
    costNote: 'unaudited, from management accounts with allocated head-office costs; ages up to 30', reach: n(r.value), reachUnit: 'young people', reachSource: { url: r.url, page: r.page ?? null }, year: '2024-25' });
}
for (const p of P) {
  p.costPerUnit = Math.round(p.cost / p.reach);
  p.breakEven = Object.fromEntries(Object.entries(UNIT).map(([k, u]) => [k, Math.round(p.cost / u.value * 10) / 10]));
}

// ---------- indicative SROI: VOYPIC, wellbeing ----------
const vo = must(outcomes.find(o => /VOYPIC/i.test(o.programme)), 'VOYPIC outcomes');
const qol = must(vo.outcomes.find(o => /quality of life/i.test(o.measure)), 'VOYPIC quality of life');
const adv = must(must(actV.find(o => /VOYPIC|Voice of Young/i.test(o.name)), 'VOYPIC').figures.find(f => /independent advocacy service/i.test(f.measure)), 'VOYPIC advocacy reach');
const wellby = must(proxies.find(p => /WELLBY value of £13,000/i.test(p.label)), 'WELLBY');
const voy = P.find(p => p.id === 'voypic');
// The outcome is printed "79 (49%)": a count of respondents and its share.
const qolCount = +String(qol.value).match(/^\s*(\d+)/)[1];
const share = +String(qol.value).match(/\((\d+(?:\.\d+)?)%\)/)[1] / 100;
const PARAMS = {
  // who counts as improved: respondents only (low), applied to advocacy recipients (central), to everyone supported (high)
  improved: { low: qolCount, central: Math.round(n(adv.value) * share), high: Math.round(voy.reach * share),
    why: `${qol.value}% reported a better quality of life (n=${qol.n}, ${qol.year}); low counts only those respondents, central applies the share to the ${adv.value} advocacy recipients, high to all ${voy.reach} supported` },
  wellbyGain: { low: 0.1, central: 0.25, high: 0.5, why: 'life-satisfaction points per improved child for one year. ASSUMED: VOYPIC does not measure the size of the change' },
  deadweight: { low: 0.6, central: 0.4, high: 0.2, why: 'share who would have improved anyway. ASSUMED: no comparison group exists' },
  attribution: { low: 0.5, central: 0.7, high: 0.9, why: 'share of the change due to VOYPIC rather than carers, social workers or others. ASSUMED' },
  displacement: { low: 0, central: 0, high: 0, why: 'a child\'s wellbeing gain does not take one from another child' },
  years: { low: 1, central: 1, high: 1, why: 'no evidence that the gain persists, so one year only, and no discounting is needed' },
};
const value = c => PARAMS.improved[c] * PARAMS.wellbyGain[c] * +wellby.value * (1 - PARAMS.deadweight[c]) * PARAMS.attribution[c] * (1 - PARAMS.displacement[c]);
const sroi = { programme: voy.name, inputs: voy.cost, inputsSource: voy.costSource, outcome: { measure: qol.measure, value: qol.value, n: qol.n, year: qol.year, url: qol.url, page: qol.page ?? null, type: qol.measureType },
  proxy: { label: wellby.label, value: +wellby.value, unit: wellby.unit, year: wellby.priceYear, url: wellby.url }, params: PARAMS,
  cases: Object.fromEntries(['low', 'central', 'high'].map(c => [c, { value: Math.round(value(c)), ratio: Math.round(value(c) / voy.cost * 100) / 100 }])),
  notValued: vo.outcomes.filter(o => o !== qol).map(o => o.measure + ' ' + o.value + (o.unit === '%' ? '%' : '')),
  caveats: ['outcome is self-reported, from respondents only, a year earlier than the costs', 'wellbeing value, not public money: no fiscal saving is claimed', 'the WELLBY value is UK (HACT, 2025 prices)'] };

const why = {
  'youth-justice': 'proven reoffending exists by disposal, but DoJ warns that disposals cannot be compared, so there is no valid counterfactual',
  'sure-start-ratio': 'language progress is staff-assessed with no comparison group and no published unit value for a language gain; break-even is shown instead, and the IFS England study as a comparator',
  'family-support-hubs-ratio': 'the hubs publish referrals and linkage, no outcome measure',
  eiss: 'the only evaluation with a comparison group (QUB 2018) found no robust effect; a ratio would be near zero on that evidence',
  parentline: 'reach only (7,070 parents), no outcome measure',
};
const out = { built: new Date().toISOString().slice(0, 10), method: 'research/children-sector/SROI-METHOD.md',
  existing: existing.studies, unitCosts: UNIT, breakEven: P, sroi: [sroi], notComputed: why };
fs.writeFileSync(path.join(R, 'ni-sroi.json'), JSON.stringify(out, null, 1));

const f = v => '£' + Math.round(v).toLocaleString('en-GB');
console.log('unit costs:', Object.entries(UNIT).map(([k, u]) => `${k} ${f(u.value)}`).join('; '));
for (const p of P) console.log(`\n${p.name}: ${f(p.cost)} / ${p.reach.toLocaleString('en-GB')} ${p.reachUnit} = ${f(p.costPerUnit)} each\n  breaks even if it prevents: ${p.breakEven.residentialYear} child-years of residential care, or ${p.breakEven.lacCase} LAC cases, or ${p.breakEven.fosterCase} foster cases, or ${p.breakEven.familySupportCase} family support cases`);
console.log(`\nVOYPIC indicative SROI: inputs ${f(sroi.inputs)}; improved ${PARAMS.improved.low}/${PARAMS.improved.central}/${PARAMS.improved.high}`);
for (const [c, v] of Object.entries(sroi.cases)) console.log(`  ${c}: value ${f(v.value)}, ratio £1 : £${v.ratio}`);
