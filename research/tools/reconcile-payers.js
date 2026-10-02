// Phase 2 of COST-SHARE-PLAN.md: set each payer's own published total paid to the
// voluntary and community sector beside the sum the recipients' accounts show
// (ni-flows.json, 2024-25 income lines, each pound counted once).
//
// The comparison is a ratio, read with care:
//   - the payer's figure covers ALL voluntary recipients, adult as well as children's;
//     ours covers only the organisations on the children's list. A low ratio is
//     expected; how low says how much of that payer's VCSE money we can see.
//   - a ratio ABOVE 1 is a warning: the recipients report more than the payer says it
//     paid, which means a scope mismatch (a total that excludes contracts, a
//     different year) or a misread figure. It is listed, not smoothed.
//   - figures labelled "voluntary and private, not split" are compared, but flagged:
//     they overstate the voluntary side.
// Nothing here is summed across payers.
//
// Input: research/children-sector/ni-payer-totals.json (built from the phase 2
// research files) and ni-flows.json. Output: ni-reconciliation.json and a report.
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));

const payer = read('ni-payer-totals.json');
const flows = read('ni-flows.json').flows;
const ents = Object.fromEntries(read('ni-entities.json').entities.map(e => [e.id, e]));
const prof = Object.fromEntries(read('ni-vcs-profiles.json').profiles.map(p => [p.orgId, p]));
const focus = id => ((prof[id] || {}).focus || {}).value || 'unclear';

const toGbp = (v, unit) => {
  const s = String(v == null ? '' : v).replace(/[£,\s]/g, '');
  const m = s.match(/^\(?(-?\d+(?:\.\d+)?)\)?$/); if (!m) return null;
  let n = parseFloat(m[1]);
  if (/000/.test(unit || '')) n *= 1e3; else if (/£?\s*m(illion)?\b/i.test(unit || '')) n *= 1e6;
  return n;
};

// Where the payer's figure is one programme, compare it with the recipients' lines for
// that programme only; otherwise with everything from that payer, and say so.
const PROGRAMMES = [
  [/Youth Service grants/i, /youth/i], [/Pre-School|PEG/i, /pre-?school|PEG|nursery|pre school/i],
  [/Supporting People|81.18m/i, /supporting people|SP/i], [/Sure Start/i, /sure ?start/i], [/Pathway/i, /pathway/i],
  [/camps|T:BUC/i, /T:?BUC|camp/i], [/Core Funding/i, /core/i], [/Victims Support Programme/i, /./], [/Community Support Programme|grants allocation/i, /./],
];
const programmeOf = label => { for (const [a, b] of PROGRAMMES) if (a.test(label)) return b; return null; };
// Recipient side, 2024-25, counted once.
const seenFor = (payerId, re) => { const s = { all: 0, children: 0, orgs: new Set(), childOrgs: new Set() };
  for (const f of flows) {
    if (f.kind !== 'income line' || f.year !== '2024-25' || f.gbp == null || f.countOnce === false || f.payer !== payerId) continue;
    if (re && !re.test(f.label + ' ' + (f.via || ''))) continue;
    s.all += f.gbp; s.orgs.add(f.recipient);
    if (focus(f.recipient) === 'children-focused') { s.children += f.gbp; s.childOrgs.add(f.recipient); } }
  return s; };
const seen = {};
for (const f of flows) {
  if (f.kind !== 'income line' || f.year !== '2024-25' || f.gbp == null || f.countOnce === false) continue;
  const s = (seen[f.payer] ||= { all: 0, children: 0, orgs: new Set(), childOrgs: new Set() });
  s.all += f.gbp; s.orgs.add(f.recipient);
  if (focus(f.recipient) === 'children-focused') { s.children += f.gbp; s.childOrgs.add(f.recipient); }
}

const rows = [];
for (const fig of payer.figures) {
  const prog = programmeOf(fig.label || ''), gbp = toGbp(fig.value, fig.unit), whole = seen[fig.payer], lab = prog ? seenFor(fig.payer, prog) : null;
  // Most recipients' accounts name the payer, not the programme: labelled lines are a floor, all lines from the payer a ceiling.
  const s = lab || whole;
  rows.push({
    payer: fig.payer, payerName: (ents[fig.payer] || {}).name || fig.payer,
    label: fig.label, scope: fig.scope, year: fig.year, kind: fig.kind,
    payerSide: gbp, payerValue: fig.value, payerUnit: fig.unit, url: fig.url, page: fig.page ?? null, check: fig.check || null,
    recipientSideAll: s ? Math.round(s.all) : 0, recipientOrgs: s ? s.orgs.size : 0,
    recipientSideChildren: s ? Math.round(s.children) : 0, childrenOrgs: s ? s.childOrgs.size : 0,
    ratioAll: gbp && s ? Math.round(s.all / gbp * 1000) / 1000 : null,
    seenRange: lab ? [Math.round(lab.all), whole ? Math.round(whole.all) : Math.round(lab.all)] : null,
    ratioRange: lab && gbp ? [Math.round(lab.all / gbp * 1000) / 1000, Math.round((whole ? whole.all : lab.all) / gbp * 1000) / 1000] : null,
    match: prog ? 'programme lines only' : 'everything from this payer',
    flags: [
      !prog ? 'whole-payer comparison: payer figure and recipient lines may cover different things' : null,
      /private/i.test(fig.scope || '') ? 'includes private providers' : null,
      fig.year !== '2024-25' ? 'payer figure is ' + fig.year : null,
      fig.kind !== 'outturn' ? 'payer figure is a ' + fig.kind : null,
      gbp && s && s.all > gbp ? 'recipients report MORE than the payer total: scope or year mismatch' : null,
      fig.check ? 'payer figure check: ' + fig.check : null,
    ].filter(Boolean),
  });
}
fs.writeFileSync(path.join(R, 'ni-reconciliation.json'), JSON.stringify({
  built: new Date().toISOString().slice(0, 10),
  rule: 'payerSide is the body\'s own published figure for payments to the VCSE (scope as the source states it); recipientSideAll is what the 2024-25 accounts of organisations on the children\'s list show from that payer, each pound counted once; recipientSideChildren is the part received by organisations wholly about children. Not summed across payers.',
  rows, notPublished: payer.notPublished || [], recipientLists: payer.recipientLists || [],
}, null, 1));

const fmt = n => n == null ? '—' : '£' + Math.round(n).toLocaleString('en-GB');
for (const r of rows.slice().sort((a, b) => (b.payerSide || 0) - (a.payerSide || 0))) {
  const seenTxt = r.seenRange ? `${fmt(r.seenRange[0])}–${fmt(r.seenRange[1])}` : `${fmt(r.recipientSideAll).padStart(12)} (${r.recipientOrgs})`;
  const ratioTxt = r.ratioRange ? r.ratioRange.join('–') : (r.ratioAll ?? '—');
  console.log(`${r.payerName.slice(0, 30).padEnd(30)} ${String(r.label).slice(0, 38).padEnd(38)} payer ${fmt(r.payerSide).padStart(13)}  seen ${seenTxt}  ratio ${ratioTxt}  ${r.flags.join('; ')}`);
}
