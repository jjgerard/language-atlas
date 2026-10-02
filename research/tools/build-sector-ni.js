// Builds public/sector/ni-children.json, the one file the NI children's-sector
// page reads, from the research files in research/children-sector/.
//
// Nothing here creates a figure. It selects and reshapes: every number on the
// page is a row from ni-budgets.json or a field from the charity register, with
// its source URL carried through. Two things are deliberately left out:
//   - figures flagged check:"extraction" (column assignment uncertain), and
//   - figures a ruling excluded (FE colleges' main-statement line).
// Conflicts are kept; the page shows both values.
//
// Run: node research/tools/build-sector-ni.js
const fs = require('fs');
const path = require('path');

const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));

const bodies = read('ni-bodies.json');
const budgets = read('ni-budgets.json');
const orgs = read('ni-vcs-orgs.json');
const reg = read('ni-vcs-register.json');
const geo = read('ni-geo.json');
const pcs = read('ni-postcodes.json').postcodes;
const prof = read('ni-vcs-profiles.json');
const coding = read('ni-bodies-coding.json');
// Resolve a body's service code to its evidence: a function quote, or a budget line.
const evidence = (b, ev) => {
  if (ev.startsWith('f:')) { const f = b.functions[+ev.slice(2)]; return { quote: f.quote || f.what, url: f.url, kind: 'function' }; }
  const l = ev.slice(2), f = budgets.figures.find(x => x.bodyId === b.id && x.label === l);
  return { quote: 'spending line: ' + l, url: f.url, kind: 'budget line' };
};
const profById = Object.fromEntries(prof.profiles.map(p => [p.orgId, p]));

// Postcodes come from ni-register-addresses.json (regNo -> BT postcode, taken
// from the register's public address) and are placed via ni-postcodes.json.
// A postcode is the REGISTERED address, not where services are delivered.
const postcodeOf = addr => {
  const m = String(addr || '').toUpperCase().match(/\bBT\d{1,2}\s*\d[A-Z]{2}\b/);
  return m ? m[0].replace(/\s+/, ' ') : null;
};
const addrFile = path.join(R, 'ni-register-addresses.json');
const addresses = fs.existsSync(addrFile) ? JSON.parse(fs.readFileSync(addrFile, 'utf8')) : {};
const place = regNo => {
  const pc = postcodeOf(addresses[regNo]);
  const g = pc && pcs[pc];
  return g ? { postcode: pc, lat: g.lat, lon: g.lon, council: g.councilCode, trust: g.trust } : null;
};

const TIERS = ['children-only', 'children among others', 'playgroup/after schools only'];
const round = (n, d = 4) => Math.round(n * 10 ** d) / 10 ** d;

const out = {
  unit: 'Northern Ireland',
  sector: 'children',
  built: new Date().toISOString().slice(0, 10),
  retrieved: budgets.retrieved,
  geo: { councils: geo.councils, trusts: geo.trusts, source: geo.source },

  bodies: bodies.bodies.map(b => ({
    id: b.id, name: b.name, sponsor: b.sponsor, kind: b.kind, verdict: b.verdict,
    roles: b.roles, via: b.via || null, excluded: b.excluded || null,
    functions: (b.functions || []).map(f => ({ what: f.what, quote: f.quote, url: f.url })),
    accounts: b.accounts || null, statute: b.statute || null, notes: b.notes || null,
    services: (coding.codes[b.id] || []).map(([code, role, ev]) => ({ code, role, ...evidence(b, ev) })),
    codingNote: coding.notes[b.id] || null,
  })),

  budgets: budgets.figures
    .filter(f => f.check !== 'extraction' && !f.exclude)
    .map(f => ({
      bodyId: f.bodyId, scope: f.scope, label: f.label, year: f.year, value: f.value,
      unit: f.unit, kind: f.kind, url: f.url, page: f.page ?? null,
      check: f.check || null, note: f.note || null, mixed: f.mixed || null,
      mixedNote: f.mixedNote || null, group: f.group,
    })),
  budgetsLeftOut: {
    extraction: budgets.figures.filter(f => f.check === 'extraction').length,
    excludedByRuling: budgets.figures.filter(f => f.exclude).length,
  },

  serviceCodes: prof.codes,
  // Duplicates are dropped here; their bases were merged into the primary by
  // the list-building step or are restated by it.
  orgs: orgs.orgs.filter(o => !o.duplicateOf).map(o => { const p = profById[o.orgId]; return {
    orgId: o.orgId || null, name: o.name, regNo: o.regNo, gbCharityNo: o.gbCharityNo,
    basisTypes: o.basisTypes, onlyWeak: !!o.onlyWeak,
    basis: o.basis.map(b => ({
      type: b.type, detail: b.detail, amount: b.amount ?? null, year: b.year ?? null,
      relationship: b.relationship ?? null, url: b.url, weak: b.weak || b.dated || null,
    })),
    income: o.register ? o.register.income : null,
    fyEnd: o.register ? o.register.fyEnd : null,
    place: o.regNo ? place(o.regNo) : null,
    possiblyStatutory: o.possiblyStatutory || null, partOf: o.partOf || null, incomeIsParent: o.incomeIsParent || null,
    profile: p ? {
      status: p.status, paraphrased: !!p.quotesParaphrased,
      focus: p.focus ? { value: p.focus.value, quote: p.focus.quote, url: p.focus.url } : null,
      services: (p.services || []).map(x => ({ code: x.code, quote: x.quote, url: x.url,
        rel: x.relationship ? { type: x.relationship.type, body: x.relationship.body || null, url: x.relationship.url || null } : null })),
      funding: p.funding ? { year: p.funding.year, total: p.funding.totalIncome, unit: p.funding.unit, breakdown: !!p.funding.breakdown,
        government: (p.funding.government || []).map(g => ({ funder: g.funder, amount: g.amount, label: g.label })), url: p.funding.url, page: p.funding.page ?? null } : null,
      stepsIn: (p.stepsIn || []).map(x => ({ code: x.code, quote: x.quote, who: x.who, url: x.url })),
      annualReportUrl: p.annualReportUrl || null,
    } : null,
  }; }),

  // Every active register charity that self-declares a children's beneficiary,
  // as compact rows: [regNo, name, tier, income, lat, lon, council, trust].
  registerTiers: TIERS,
  register: reg.charities.map(c => {
    const p = place(c.regNo);
    return p ? [c.regNo, c.name, TIERS.indexOf(c.registerTier),
      +c.income || 0, round(p.lat), round(p.lon), p.council, p.trust] : null;
  }).filter(Boolean),
  registerRule: reg.rule,
  registerGap: reg.coverageGap,
};

const dest = path.join(__dirname, '..', '..', 'public', 'sector', 'ni-children.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out));
console.log('  public/sector/ni-children.json',
  (fs.statSync(dest).size / 1024).toFixed(0) + ' KB',
  `| ${out.bodies.length} bodies, ${out.budgets.length} figures (${out.budgetsLeftOut.extraction} extraction + ${out.budgetsLeftOut.excludedByRuling} ruled out),`,
  `${out.orgs.length} orgs (${out.orgs.filter(o => o.place).length} placed), ${out.register.length} register dots`);
