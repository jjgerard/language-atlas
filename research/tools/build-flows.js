// Phase 1 of COST-SHARE-PLAN.md: the funder registry and the flows ledger.
//
// Reads the government income lines the profiling agents took from each VCSE's
// own accounts (ni-vcs-profiles.json) and the published grant lists carried as
// "gov funding" bases (ni-vcs-orgs.json), and writes:
//   ni-entities.json  one record per payer, with every name variant seen
//   ni-flows.json     one row per movement of money, recorded once at its source
//
// Rules that keep the ledger honest:
//   - A line naming an intermediary ("PEACEPLUS via Include Youth") is recorded
//     against the SOURCE, with the intermediary in `via`.
//   - Income lines (outturn, from accounts) and grant-list awards are different
//     kinds and are never summed together.
//   - An amount that will not parse cleanly is kept with `check`, and left out of
//     every total. A unit of £'000 is scaled to pounds; a euro amount is not
//     converted.
//   - A charity's year goes to the April–March government year it overlaps most.
//
// Run: node research/tools/build-flows.js
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));
const prof = read('ni-vcs-profiles.json').profiles;
const orgs = read('ni-vcs-orgs.json').orgs;
const orgById = new Map(orgs.filter(o => o.orgId).map(o => [o.orgId, o]));

// ---------------- entities ----------------
// kind: ni-gov | council | uk-gov | other-gov | irish-gov | intergovernmental |
//       north-south | lottery-dormant | multiple | not-named
const E = {};
const ent = (id, name, kind, extra = {}) => (E[id] = { id, name, kind, variants: [], ...extra });
[
  ['doh', 'Department of Health (incl. SPPG, formerly HSCB)', 'ni-gov'], ['de', 'Department of Education', 'ni-gov'],
  ['dfc', 'Department for Communities', 'ni-gov'], ['teo', 'The Executive Office', 'ni-gov'], ['doj', 'Department of Justice', 'ni-gov'],
  ['dfe', 'Department for the Economy', 'ni-gov'], ['daera', 'Department of Agriculture, Environment and Rural Affairs', 'ni-gov'],
  ['dfi', 'Department for Infrastructure', 'ni-gov'], ['ea', 'Education Authority', 'ni-gov'], ['pha', 'Public Health Agency', 'ni-gov'],
  ['trust-belfast', 'Belfast HSC Trust', 'ni-gov'], ['trust-northern', 'Northern HSC Trust', 'ni-gov'], ['trust-southeastern', 'South Eastern HSC Trust', 'ni-gov'],
  ['trust-southern', 'Southern HSC Trust', 'ni-gov'], ['trust-western', 'Western HSC Trust', 'ni-gov'],
  ['nihe', 'NI Housing Executive (incl. Supporting People)', 'ni-gov'], ['crc', 'Community Relations Council', 'ni-gov'],
  ['vss', 'Victims and Survivors Service', 'ni-gov'], ['yja', 'Youth Justice Agency', 'ni-gov'], ['pbni', 'Probation Board for NI', 'ni-gov'],
  ['nips', 'NI Prison Service', 'ni-gov'], ['nipb', 'NI Policing Board', 'ni-gov'], ['pcsp', 'Policing and Community Safety Partnerships', 'ni-gov'],
  ['sbni', 'Safeguarding Board for NI', 'ni-gov'], ['ccga', "Children's Court Guardian Agency", 'ni-gov'], ['bso', 'Business Services Organisation', 'ni-gov'],
  ['acni', 'Arts Council of Northern Ireland', 'ni-gov'], ['niscreen', 'Northern Ireland Screen', 'ni-gov'], ['citbni', 'Construction Industry Training Board NI', 'ni-gov'],
  ['fe-colleges', 'FE colleges', 'ni-gov'], ['translink', 'Translink (public corporation)', 'ni-gov'], ['housing-benefit', 'Housing Benefit', 'ni-gov'],
  ['victims-payment', "Victims' Payments Board", 'ni-gov'],
  ['sportni', 'Sport NI', 'ni-gov'], ['hsc-trust-unnamed', 'An HSC trust, not named', 'ni-gov'], ['hmrc', 'HM Revenue and Customs', 'uk-gov'],
  ['council-an', 'Antrim and Newtownabbey Borough Council', 'council'], ['council-and', 'Ards and North Down Borough Council', 'council'],
  ['council-abc', 'Armagh City, Banbridge and Craigavon Borough Council', 'council'], ['council-belfast', 'Belfast City Council', 'council'],
  ['council-ccg', 'Causeway Coast and Glens Borough Council', 'council'], ['council-dcs', 'Derry City and Strabane District Council', 'council'],
  ['council-fo', 'Fermanagh and Omagh District Council', 'council'], ['council-lc', 'Lisburn and Castlereagh City Council', 'council'],
  ['council-mea', 'Mid and East Antrim Borough Council', 'council'], ['council-mu', 'Mid Ulster District Council', 'council'],
  ['council-nmd', 'Newry, Mourne and Down District Council', 'council'],
  ['ukspf', 'UK Shared Prosperity Fund (UK Government)', 'uk-gov'], ['homeoffice', 'Home Office', 'uk-gov'], ['dhsc', 'Department of Health and Social Care (England)', 'uk-gov'],
  ['electoral', 'Electoral Commission', 'uk-gov'],
  ['english-las', 'English local authorities', 'other-gov'], ['iom', 'Isle of Man Government', 'other-gov'],
  ['ie-dfa', 'Department of Foreign Affairs (Ireland)', 'irish-gov'], ['ie-gov', 'Irish Government (other)', 'irish-gov'], ['ie-hse', 'Health Service Executive (Ireland)', 'irish-gov'],
  ['ie-tusla', 'Tusla (Ireland)', 'irish-gov'], ['ie-arts', 'Arts Council (Ireland)', 'irish-gov'], ['ie-tcagsm', 'Dept of Tourism, Culture, Arts, Gaeltacht, Sport and Media (Ireland)', 'irish-gov'],
  ['peaceplus', 'PEACEPLUS / SEUPB', 'intergovernmental'], ['ifi', 'International Fund for Ireland', 'intergovernmental'], ['eu', 'European Union (incl. ESF)', 'intergovernmental'],
  ['foras', 'Foras na Gaeilge', 'north-south'], ['safefood', 'Safefood', 'north-south'],
  ['dormant', 'Dormant Accounts Fund NI', 'lottery-dormant'],
  ['multiple', 'Several funders on one line', 'multiple'], ['not-named', 'Funder not named', 'not-named'],
].forEach(([id, n, k]) => ent(id, n, k));

// Ordered: the first matching rule wins. A line that names several funders is
// checked first, so it is never credited to whichever one appears first.
const MULTI = /;|Belfast City Council & Antrim|Department for Communities and Belfast|SELB\/DSD|Northern, Western & Southern|Health (&|and) Social Care Trusts|governments and other|Education Authority and/i;
const RULES = [
  // Round-2 profiles (2026-10-03): shortened council names, programme-only labels, and two
  // bodies new to the list. A programme maps to the department that funds it.
  [/^Mid Ulster \(council/i, 'council-mu'], [/^Newry Mourne/i, 'council-nmd'], [/^Ards, North/i, 'council-and'], [/^Derry (&|and) Strabane/i, 'council-dcs'],
  [/^Causeway \(council/i, 'council-ccg'], [/^Fermanagh \(council/i, 'council-fo'], [/Cork County Council/i, 'ie-gov'], [/Erasmus/i, 'eu'],
  [/NI Childcare Subsidy Scheme|Extended Schools/i, 'de'], [/^Pre-School Education Programme/i, 'ea'], [/Bright Start|Childcare Partnership|^DHSSPS$/i, 'doh'],
  [/Regional Fertility Centre/i, 'trust-belfast'], [/^Health and Social Care (Trust|\(trust not named\))$|^HSC Trust$|Children's Services Planning \(HSC\)/i, 'hsc-trust-unnamed'],
  [/^Sport Northern Ireland$/i, 'sportni'], [/HM Revenue/i, 'hmrc'], [/Environment Agency/i, 'daera'],
  [/sure ?start/i, 'de'], [/pathways? fund/i, 'de'], [/^Early Years \(likely DE/i, 'de'],
  [/PEACE|SEUPB/i, 'peaceplus'], [/UKSPF|Shared Prosperity|DLUHC/i, 'ukspf'], [/International Fund for Ireland/i, 'ifi'],
  [/European Social Fund|^EU$/i, 'eu'], [/Dormant/i, 'dormant'],
  [/Foreign Affairs|Irish Government DFA/i, 'ie-dfa'], [/Irish Government/i, 'ie-gov'], [/Health Service Executive|^HSE/i, 'ie-hse'],
  [/tusla/i, 'ie-tusla'], [/Arts Council Ireland/i, 'ie-arts'], [/Tourism, Culture, Arts, Gaeltacht/i, 'ie-tcagsm'],
  [/Department of Health and Social Care/i, 'dhsc'], [/Home Office/i, 'homeoffice'], [/Electoral Commission/i, 'electoral'],
  [/English local authorities|Sunderland Council/i, 'english-las'], [/Isle of Man/i, 'iom'],
  [/Foras/i, 'foras'], [/Safefood/i, 'safefood'],
  [/Victims (&|and) Survivors|^VSS/i, 'vss'], [/Victims' Payment|Troubles Permanent Disablement/i, 'victims-payment'],
  [/Community Relations Council/i, 'crc'], [/Urban Villages|Executive Office|^TEO$|T:BUC/i, 'teo'],
  [/Policing (&|and) Community Safety|PCSP/i, 'pcsp'], [/Policing Board/i, 'nipb'], [/Probation Board/i, 'pbni'], [/Prison Service/i, 'nips'],
  [/Youth Justice/i, 'yja'], [/Department of Justice|NIACRO \(Community Foundation NI and Dept of Justice\)/i, 'doj'], [/Drugs Court/i, 'doj'],
  [/Safeguarding Board/i, 'sbni'], [/Children's Court Guardian/i, 'ccga'], [/Business Services Organisation|HSS \(milk/i, 'bso'],
  [/Belfast (HSC|Health)/i, 'trust-belfast'], [/Northern (HSC|Health)/i, 'trust-northern'], [/South Eastern (HSC|Health)/i, 'trust-southeastern'],
  [/Southern (HSC|Health)/i, 'trust-southern'], [/Western (HSC|Health)/i, 'trust-western'],
  [/Public Health Agency|EISS via NIACRO/i, 'pha'],
  [/SPPG|Strategic Planning and Performance|HSCB|Health (&|and) Social Care Board|Department of Health|unclear \(DoH/i, 'doh'],
  [/Department of Education|DENI/i, 'de'], [/Education Authority|SELB/i, 'ea'],
  [/Supporting People|NIHE|Housing Executive|Floating Support/i, 'nihe'], [/Housing Benefit/i, 'housing-benefit'],
  [/Department for Communities|Advice NI \/ Department|Belfast Regeneration Directorate|DfC/i, 'dfc'],
  [/Department for (the )?Economy|Employment and Learning/i, 'dfe'], [/DAERA|Agriculture, Environment/i, 'daera'], [/Department for Infrastructure/i, 'dfi'],
  [/^Arts Council( of Northern Ireland)?$/i, 'acni'], [/Northern Ireland Screen/i, 'niscreen'], [/Construction Industry Training/i, 'citbni'],
  [/Metropolitan College|Regional College|South West College/i, 'fe-colleges'], [/Translink/i, 'translink'],
  [/Antrim (&|and) Newtownabbey/i, 'council-an'], [/Ards (&|and) North Down/i, 'council-and'], [/Armagh/i, 'council-abc'], [/Belfast City Council/i, 'council-belfast'],
  [/Causeway Coast/i, 'council-ccg'], [/Derry City/i, 'council-dcs'], [/Fermanagh (&|and) Omagh/i, 'council-fo'], [/Lisburn (&|and) Castlereagh/i, 'council-lc'],
  [/Mid (&|and) East Antrim/i, 'council-mea'], [/Mid Ulster District/i, 'council-mu'], [/Newry, Mourne/i, 'council-nmd'],
];
const viaOf = s => { const m = String(s).match(/\b(?:via|through|administered by|EA administers|on behalf of)\s+([^)]+)/i); return m ? m[1].trim() : null; };
function resolve(funder) {
  const s = String(funder || '').trim();
  if (!s || /\((funder|payer) not named\)|^not named \(strategy|^Regional Fair Play/i.test(s)) return { id: 'not-named', via: null };
  if (/^(not named|unnamed|unclear)\b|^not named|body not named\)?$|^Mental Health Support Fund|^GSP|^Regional Childcare|^Eastern Childcare|^councils \(not named\)|^Councils \(Labour/i.test(s)
      && !/sure ?start|pathway|PEACE|DoH/i.test(s)) return { id: 'not-named', via: null };
  if (MULTI.test(s)) return { id: 'multiple', via: null };
  for (const [re, id] of RULES) if (re.test(s)) return { id, via: viaOf(s) };
  return { id: null, via: null };
}

// ---------------- amounts and years ----------------
function parseAmount(raw, unit) {
  const s = String(raw == null ? '' : raw).trim();
  if (!s) return { gbp: null, check: 'no amount' };
  if (/€/.test(s) || /€|eur/i.test(unit || '')) return { gbp: null, check: 'euro, not converted' };
  if (/as printed|\?|approx|c\.|~/.test(s)) return { gbp: null, check: 'as printed / uncertain' };
  const m = s.replace(/[£,\s]/g, '').match(/^\(?(-?\d+(?:\.\d+)?)(k|m|million)?\)?$/i);
  if (!m) return { gbp: null, check: 'unparsed: ' + s.slice(0, 30) };
  let v = parseFloat(m[1]);
  if (m[2]) v *= /k/i.test(m[2]) ? 1e3 : 1e6;
  else if (/000/.test(unit || '')) v *= 1e3;
  if (/^\(.*\)$/.test(s)) v = -v;
  return { gbp: Math.round(v * 100) / 100, check: null };
}
const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
// The end date of the accounting period, from the profile's year string, else the register.
function periodEnd(yearStr, registerFyEnd) {
  const s = String(yearStr || '');
  let m = s.match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  if (m && MONTHS[m[2].toLowerCase()] != null) return new Date(Date.UTC(+m[3], MONTHS[m[2].toLowerCase()], +m[1]));
  m = s.match(/([A-Za-z]{3})[a-z]*\s+(\d{4})\s*\)?\s*$/);
  if (m && MONTHS[m[1].toLowerCase()] != null) return new Date(Date.UTC(+m[2], MONTHS[m[1].toLowerCase()] + 1, 0));
  m = s.match(/^(\d{4})-(\d{2})\b/); if (m) return new Date(Date.UTC(2000 + +m[2], 2, 31));
  m = s.match(/^(\d{4})\s*\((?:calendar|year)/i); if (m) return new Date(Date.UTC(+m[1], 11, 31));
  if (registerFyEnd) return periodEnd(registerFyEnd, null);
  return null;
}
// Twelve months ending `end`, assigned to the April–March year it overlaps most.
function govYear(end) {
  if (!end) return null;
  const start = new Date(end); start.setUTCFullYear(start.getUTCFullYear() - 1); start.setUTCDate(start.getUTCDate() + 1);
  let best = null, bestDays = -1;
  for (let y = start.getUTCFullYear() - 1; y <= end.getUTCFullYear(); y++) {
    const a = new Date(Date.UTC(y, 3, 1)), b = new Date(Date.UTC(y + 1, 2, 31));
    const days = (Math.min(b, end) - Math.max(a, start)) / 864e5;
    if (days > bestDays) { bestDays = days; best = `${y}-${String((y + 1) % 100).padStart(2, '0')}`; }
  }
  return best;
}

// ---------------- flows ----------------
const flows = [], unresolved = {};
const note = (e, variant) => { if (E[e] && !E[e].variants.includes(variant)) E[e].variants.push(variant); };
for (const p of prof) {
  const o = orgById.get(p.orgId); if (!o || o.duplicateOf || o.possiblyStatutory || o.privateProvider || o.outOfScope) continue;
  const f = p.funding; if (!f || !(f.government || []).length) continue;
  const end = periodEnd(f.year, o.register && o.register.fyEnd);
  for (const g of f.government) {
    const { id, via } = resolve(g.funder);
    if (!id) { unresolved[g.funder] = (unresolved[g.funder] || 0) + 1; continue; }
    note(id, g.funder);
    // services this funder pays for, where the profile ties a service to a body of the same entity
    const services = [...new Set((p.services || []).filter(s => s.relationship && s.relationship.body && resolve(s.relationship.body).id === id).map(s => s.code))];
    const a = parseAmount(g.amount, f.unit);
    flows.push({
      kind: 'income line', year: govYear(end), periodEnd: end ? end.toISOString().slice(0, 10) : null,
      payer: id, payerKind: E[id].kind, via, recipient: o.orgId, recipientName: o.name,
      gbp: a.gbp, value: g.amount, unit: f.unit || '£', check: a.check,
      label: g.label || g.funder, services, incomeIsParent: o.incomeIsParent || null,
      source: { url: f.url || null, page: f.page ?? null },
    });
  }
}
// Pass-through: a line received "via" another organisation on our list is the same
// money as part of that organisation's own income line. It stays in the ledger,
// linked to the intermediary, but `countOnce: false` keeps it out of every total,
// so each pound is counted once, at the intermediary. (Phase 4 can re-attribute
// it to the final deliverer once the intermediary's onward payments are known.)
const normName = s => String(s || '').toLowerCase().replace(/\(.*$/, '').replace(/\b(ltd|limited|the|ni|northern ireland|consortium|led|royal)\b/g, '').replace(/[^a-z0-9]/g, '');
// Six characters at least, and never a private or out-of-scope organisation: "via Clear"
// (a PHA small-grants project) once matched "Clear Day Nurseries", a private company.
const listed = orgs.filter(o => o.orgId && !o.duplicateOf && !o.privateProvider && !o.outOfScope).map(o => ({ id: o.orgId, keys: [o.name, ...(o.aliases || [])].map(normName).filter(k => k.length >= 6) }));
for (const f of flows) {
  if (!f.via) continue;
  const v = normName(f.via);
  const hit = v.length >= 6 && listed.find(o => o.id !== f.recipient && o.keys.some(k => k === v || k.startsWith(v) || v.startsWith(k)));
  if (hit) { f.passThroughVia = hit.id; f.countOnce = false; }
}
// The Pathway Fund is administered in full by Early Years ("under contract", per DE;
// the vcs-fundedA basis for Early Years cites it), so a Pathway line in any other
// organisation's accounts is money already inside Early Years' own Pathway line,
// whether or not that line says "via".
const earlyYears = orgs.find(o => /^Early Years - the organisation/i.test(o.name));
if (earlyYears) for (const f of flows)
  if (f.kind === 'income line' && /pathways? fund/i.test(f.label + ' ' + f.via) && f.recipient !== earlyYears.orgId && !f.passThroughVia) {
    f.passThroughVia = earlyYears.orgId; f.countOnce = false; f.passThroughRule = 'Pathway Fund administered by Early Years';
  }

// Grant-list awards: a separate kind, never summed with income lines.
for (const o of orgs) {
  if (o.duplicateOf || o.possiblyStatutory || o.privateProvider || o.outOfScope || !o.orgId) continue;
  for (const b of o.basis) {
    if (b.type !== 'gov funding' || !b.amount) continue;
    const { id, via } = resolve(b.detail || '');
    const a = parseAmount(String(b.amount).split(/[;(]/)[0], '£');
    flows.push({
      kind: 'award', year: b.year || null, periodEnd: null, payer: id || 'not-named', payerKind: (E[id] || E['not-named']).kind, via,
      recipient: o.orgId, recipientName: o.name, gbp: a.gbp, value: b.amount, unit: '£', check: a.check,
      label: b.detail, services: [], source: { url: b.url, page: null },
    });
  }
}

fs.writeFileSync(path.join(R, 'ni-entities.json'), JSON.stringify({
  built: new Date().toISOString().slice(0, 10),
  kinds: { 'ni-gov': 'NI department or arm\'s-length body', council: 'NI council', 'uk-gov': 'UK government', 'other-gov': 'other government (GB local authorities, Isle of Man)',
    'irish-gov': 'Irish government', intergovernmental: 'PEACEPLUS, IFI, EU', 'north-south': 'North/South body', 'lottery-dormant': 'lottery or dormant-accounts distributor',
    multiple: 'several funders on one line, not split', 'not-named': 'funder not named in the accounts' },
  governmentKinds: ['ni-gov', 'council', 'uk-gov'],
  entities: Object.values(E),
}, null, 1));
fs.writeFileSync(path.join(R, 'ni-flows.json'), JSON.stringify({
  built: new Date().toISOString().slice(0, 10),
  rule: 'One row per movement of money, recorded at its source (via names any intermediary). kind "income line" is outturn from the recipient\'s accounts; kind "award" is from a published grant list and is never summed with income lines. gbp is null, with check set, where the amount did not parse cleanly or is in euro. year is the April–March government year the accounting period overlaps most.',
  flows, unresolved,
}, null, 1));

// ---------------- report ----------------
const inc = flows.filter(f => f.kind === 'income line');
console.log('pass-through lines kept out of totals:', flows.filter(f => f.countOnce === false).map(f => f.recipientName + ' via ' + (orgById.get(f.passThroughVia) || {}).name).join('; ') || 'none');
const y = inc.filter(f => f.year === '2024-25');
console.log(`flows: ${flows.length} (${inc.length} income lines, ${flows.length - inc.length} awards); unresolved funder strings: ${Object.keys(unresolved).length}`);
console.log('income lines by year:', Object.entries(inc.reduce((m, f) => (m[f.year] = (m[f.year] || 0) + 1, m), {})).map(e => e.join(' ')).join(', '));
console.log(`2024-25: ${y.length} lines, ${y.filter(f => f.gbp == null).length} without a usable amount (${[...new Set(y.filter(f => f.gbp == null).map(f => f.check.split(':')[0]))].join('; ')})`);
const byKind = {}; for (const f of y) if (f.gbp != null && f.countOnce !== false) { const k = f.payerKind; byKind[k] = byKind[k] || { gbp: 0, lines: 0, recipients: new Set() }; byKind[k].gbp += f.gbp; byKind[k].lines++; byKind[k].recipients.add(f.recipient); }
console.log('\n2024-25 income lines by payer kind:');
for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1].gbp - a[1].gbp)) console.log(`  ${k.padEnd(18)} £${Math.round(v.gbp).toLocaleString('en-GB').padStart(12)}  ${String(v.lines).padStart(4)} lines  ${v.recipients.size} orgs`);
const byEnt = {}; for (const f of y) if (f.gbp != null && f.countOnce !== false) { byEnt[f.payer] = byEnt[f.payer] || { gbp: 0, r: new Set() }; byEnt[f.payer].gbp += f.gbp; byEnt[f.payer].r.add(f.recipient); }
console.log('\n2024-25 top payers:');
for (const [k, v] of Object.entries(byEnt).sort((a, b) => b[1].gbp - a[1].gbp).slice(0, 20)) console.log(`  ${E[k].name.slice(0, 48).padEnd(48)} £${Math.round(v.gbp).toLocaleString('en-GB').padStart(11)}  ${v.r.size} orgs`);
if (Object.keys(unresolved).length) console.log('\nunresolved:', unresolved);
