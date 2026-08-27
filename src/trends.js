// Cross-cutting summaries over the whole atlas.
//
// The map answers "what does this place do". Nothing answered "what do these
// places have in common", which is the question a reader arrives with once
// there are a few hundred entries.
//
// WHY THIS DERIVES FROM STRUCTURE AND NEVER FROM THE PROSE.
// The obvious approach is to read the entry text and count what it says. It
// does not work, and it is worth recording how badly. Run the simplest possible
// binary over the foreign-languages map — is a language compulsory in primary —
// and 44 of 94 documented entries come back unclassifiable, with the failures
// landing exactly where the answer is interesting: "encouraged but not
// required", "no requirement in primary but 100 hours across Years 7-10".
//
// That is not a regex that needs more work. The entry style is deliberately
// hedged and clipped, and the qualifier that would mislead a reader if dropped
// is precisely what defeats a classifier. A trend layer built that way would
// turn 47% uncertainty into confident-looking counts, and a summary travels
// further than the entries it came from, so the error would outrun its own
// correction. Everything here therefore counts things the schema already knows
// — field states, dated history rows, source links — and nothing infers a
// claim from a sentence.
//
// Comparative facets (does this system say a second-language learner is not
// thereby disordered; is the profession in health or in education) are the
// obvious next layer, and they have to be WRITTEN alongside the prose from the
// same source reading, carrying the clause that justifies them. They are not
// here yet, and this file should not grow a way to guess them.
//
// HOW A FINDING WORKS.
// A finding is a sentence written by a person with a number computed from the
// data, plus a guard saying what has to be true for the sentence to be worth
// making. If the guard fails the finding is withdrawn rather than re-worded,
// because the failure mode of generated prose is a sentence that survives
// while the number underneath it changes — the atlas already had a generator
// call a reversal a persistent gap because the text and the threshold had
// drifted apart. A withdrawn finding is reported as withdrawn, not hidden.

const NOT_LEVERAGE = 5; // a source cited by more entries than this is doing comparative work

// A comparative instrument that publishes ONE PAGE PER JURISDICTION gives every
// entry a different address, so keyed on the raw url each page reads as a
// one-off and the instrument behind them disappears. That is not hypothetical:
// UNESCO's PEER profiles are cited 83 times across 59 urls and were scoring as
// 59 unrelated sources, which made regions built largely FROM that one
// instrument report as though they had been assembled country by country.
//
// Only genuine per-jurisdiction editions of a single publication belong here.
// The test is uses-vs-distinct measured over the real data: a host where the
// same url repeats (OECD's PISA volume 71 times, ECS across 2 pages, American
// Councils on 1) already aggregates and must NOT be folded, and a host that
// merely carries many separate works — doi.org, Cornell's LII, the Internet
// Archive — is a library, not an instrument, so its items stay separate.
const FAMILIES = [
  { key: 'unesco-peer', re: /^https?:\/\/(www\.)?education-profiles\.org\//i,
    label: 'UNESCO GEM Report — PEER country profiles',
    home: 'https://education-profiles.org/' },
  { key: 'eurydice', re: /^https?:\/\/eurydice\.eacea\.ec\.europa\.eu\//i,
    label: 'European Commission — Eurydice national education systems',
    home: 'https://eurydice.eacea.ec.europa.eu/national-education-systems' },
  { key: 'wida', re: /^https?:\/\/(www\.)?wida\.wisc\.edu\//i,
    label: 'WIDA — state identification and placement documents',
    home: 'https://wida.wisc.edu/memberships/consortium' },
];

// The grouping key for a link: its instrument where it belongs to one, else the
// url itself, which leaves every other source counted exactly as before.
function familyOf(url) {
  const f = FAMILIES.find(x => x.re.test(url));
  return f ? f.key : url;
}

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

// ---- the three structural surfaces --------------------------------------

// Every dated policy change in the atlas, in one list. policyHistory rows are
// {year, description}; the year is free text because real ones are ("2024-2025",
// "1997 (in force 1999)"), so the sortable number is extracted rather than
// assumed, and a row whose year holds no four-digit number keeps its label and
// sorts last instead of being dropped.
function timeline(payload) {
  const rows = [];
  for (const d of payload.domains.filter(x => x.live)) {
    for (const u of payload.units[d.id] || []) {
      for (const h of u.history || []) {
        const m = String(h.year || '').match(/\d{4}/);
        rows.push({
          domain: d.id,
          domainLabel: d.label,
          unit: u.name,
          region: u.region,
          year: String(h.year || ''),
          yearNum: m ? Number(m[0]) : null,
          description: String(h.description || ''),
        });
      }
    }
  }
  rows.sort((a, b) => (b.yearNum || -Infinity) - (a.yearNum || -Infinity) || a.unit.localeCompare(b.unit));

  const byDecade = {};
  const dated = rows.filter(r => r.yearNum);
  for (const r of dated) {
    const dec = Math.floor(r.yearNum / 10) * 10;
    byDecade[dec] = (byDecade[dec] || 0) + 1;
  }
  return {
    rows,
    byDecade,
    dated: dated.length,
    undated: rows.length - dated.length,
    span: dated.length ? [Math.min(...dated.map(r => r.yearNum)), Math.max(...dated.map(r => r.yearNum))] : null,
    units: new Set(rows.map(r => r.domain + '|' + r.unit)).size,
  };
}

// Which sources carry the atlas. This is the surface that explains its own
// shape: a region with a comparative source covering forty systems fills in one
// pass, and a region without one has to be assembled a country at a time.
function provenance(payload) {
  const byKey = new Map();
  for (const d of payload.domains.filter(x => x.live)) {
    for (const u of payload.units[d.id] || []) {
      for (const l of u.docLinks || []) {
        if (!l || !l.url) continue;
        const key = familyOf(l.url);
        const fam = FAMILIES.find(x => x.key === key);
        let rec = byKey.get(key);
        if (!rec) byKey.set(key, (rec = {
          key,
          url: fam ? fam.home : l.url,
          label: fam ? fam.label : (l.label || l.url),
          // How many separate pages of the instrument are cited. 1 for an
          // ordinary source, so the sources table can say "59 pages" where that
          // is the honest description of what is being counted on one row.
          pages: new Set(),
          entries: 0, domains: new Set(), regions: new Set(), subregions: new Set(),
        }));
        rec.pages.add(l.url);
        rec.entries++;
        rec.domains.add(d.id);
        rec.regions.add(u.region);
        if (u.subregion) rec.subregions.add(u.subregion);
      }
    }
  }
  const sources = [...byKey.values()]
    .map(r => ({ ...r, pages: r.pages.size, domains: [...r.domains].sort(), regions: [...r.regions].sort(), subregions: [...r.subregions].sort() }))
    .sort((a, b) => b.entries - a.entries || a.label.localeCompare(b.label));

  const slots = sources.reduce((s, r) => s + r.entries, 0);
  const leverage = new Set(sources.filter(r => r.entries > NOT_LEVERAGE).map(r => r.key));

  // The asymmetry, measured rather than asserted: of the documented entries in
  // each region, how many lean on a source that also documents somewhere else.
  const byRegion = {};
  for (const d of payload.domains.filter(x => x.live)) {
    for (const u of payload.units[d.id] || []) {
      if (u.coverage !== 'has') continue;
      const r = (byRegion[u.region] = byRegion[u.region] || { documented: 0, onLeverage: 0 });
      r.documented++;
      if ((u.docLinks || []).some(l => l && leverage.has(familyOf(l.url)))) r.onLeverage++;
    }
  }
  for (const k of Object.keys(byRegion)) byRegion[k].share = pct(byRegion[k].onLeverage, byRegion[k].documented);

  return {
    sources,
    distinct: sources.length,
    slots,
    top12: sources.slice(0, 12).reduce((s, r) => s + r.entries, 0),
    leverageCount: leverage.size,
    byRegion,
  };
}

// Field-by-field coverage. The near-empty rows are the point: a field that
// almost nobody fills is a finding about what these systems do not publish,
// which is a different statement from the atlas not having got to it, and only
// worth making because 'looked, found nothing' is recorded separately.
function coverage(payload) {
  const byDomain = {};
  for (const d of payload.domains.filter(x => x.live)) {
    const units = payload.units[d.id] || [];
    const fields = d.fields.map((f, i) => {
      let has = 0, looked = 0, none = 0;
      for (const u of units) {
        const c = (u.fieldStates || '')[i];
        if (c === 'h') has++; else if (c === 'l') looked++; else none++;
      }
      return { k: f.k, label: f.label, type: f.type, has, looked, none, share: pct(has, units.length) };
    }).sort((a, b) => a.has - b.has);

    const regions = {};
    for (const u of units) {
      const r = (regions[u.region] = regions[u.region] || { total: 0, documented: 0 });
      r.total++;
      if (u.coverage === 'has') r.documented++;
    }
    for (const k of Object.keys(regions)) regions[k].share = pct(regions[k].documented, regions[k].total);

    byDomain[d.id] = { label: d.label, entries: units.length, fields, regions };
  }
  return byDomain;
}

// ---- findings -----------------------------------------------------------

// Each entry: a sentence with a hole for the number, the number, and the
// condition under which the sentence is worth making at all.
const FINDINGS = [
  {
    id: 'discharge',
    scope: 'dld',
    compute: c => { const f = c.coverage.dld && c.coverage.dld.fields.find(x => x.k === 'dischargeCriteria'); return f && { n: f.has, of: f.has + f.looked + f.none }; },
    holds: v => v.n / v.of < 0.05,
    text: v => `Almost no system publishes what ends a child's support: discharge criteria are recorded for ${v.n} of ${v.of} entries.`,
    note: 'A gap that has been looked for. Where somebody searched and found nothing, that is recorded separately rather than left blank.',
  },
  {
    id: 'outcomes',
    scope: 'dld',
    compute: c => { const f = c.coverage.dld && c.coverage.dld.fields.find(x => x.k === 'outcomesEvidence'); return f && { n: f.has, of: f.has + f.looked + f.none }; },
    holds: v => v.n / v.of < 0.05,
    text: v => `Systems describe what they provide, not how it works: published outcome evidence appears in ${v.n} of ${v.of} entries.`,
    note: 'Legislation, guidance and service specifications say what a system offers. Almost none of them report what happened to the children.',
  },
  {
    id: 'highered',
    scope: 'fl',
    compute: c => { const f = c.coverage.fl && c.coverage.fl.fields.find(x => x.k === 'higherEducation'); return f && { n: f.has, of: f.has + f.looked + f.none }; },
    holds: v => v.n / v.of < 0.05,
    text: v => `School language policy is written down and university provision is not: degree-level study is recorded for ${v.n} of ${v.of} entries.`,
    note: 'Departments open and close without a comparative record. Where an entry does carry this, it is usually a news report of a closure.',
  },
  {
    id: 'concentration',
    scope: 'all',
    compute: c => ({ n: c.provenance.top12, of: c.provenance.slots, distinct: c.provenance.distinct }),
    holds: v => v.n / v.of > 0.25,
    text: v => `The atlas rests on a few documents: ${v.distinct} distinct sources fill ${v.of} entry-slots, and the twelve largest carry ${pct(v.n, v.of)}% of them.`,
    note: 'A comparative source covering forty systems fills forty entries in one pass. Everything else is assembled a country at a time.',
  },
  {
    id: 'leverage-gap',
    scope: 'all',
    compute: c => {
      const rs = Object.entries(c.provenance.byRegion).filter(([, v]) => v.documented >= 20);
      if (rs.length < 2) return null;
      rs.sort((a, b) => b[1].share - a[1].share);
      return { top: rs[0], bottom: rs[rs.length - 1], all: rs };
    },
    holds: v => v.top[1].share - v.bottom[1].share >= 20,
    text: v => `There are two ways to fill a map, and this one was filled both ways: ${v.top[1].share}% of documented ${v.top[0]} entries rest on a source that also documents elsewhere, against ${v.bottom[1].share}% in ${v.bottom[0]} — where ${v.bottom[1].documented} entries were assembled one at a time instead.`,
    note: 'A comparative source is the cheap route and it decides which regions look full early. It is not the only route: where none exists, the same coverage can be reached country by country, at perhaps twenty times the work per entry. Reading a thin region as a thin subject is the mistake this number exists to prevent.',
  },
  {
    id: 'recency',
    scope: 'all',
    compute: c => {
      const t = c.timeline;
      if (!t.span) return null;
      const cutoff = t.span[1] - 15;
      return { n: t.rows.filter(r => r.yearNum && r.yearNum >= cutoff).length, of: t.dated, cutoff, span: t.span };
    },
    holds: v => v.n / v.of > 0.5,
    text: v => `This is a live area of policy: ${pct(v.n, v.of)}% of the ${v.of} dated changes on record fall in or after ${v.cutoff}.`,
    note: 'The earliest change recorded here is from the 1960s. The concentration is recent because the policies are, not only because recent ones are easier to find.',
  },
  {
    id: 'looked',
    scope: 'all',
    compute: c => {
      let looked = 0, cells = 0;
      for (const d of Object.values(c.coverage)) for (const f of d.fields) { looked += f.looked; cells += f.has + f.looked + f.none; }
      return { n: looked, of: cells };
    },
    holds: v => v.n > 0,
    text: v => `${v.n} fields record that somebody looked and found nothing.`,
    note: 'Blank means nobody has checked. This is the other thing, and keeping them apart is the difference between a gap in the record and a gap in the world.',
  },
];

function findings(ctx) {
  const held = [], withdrawn = [];
  for (const f of FINDINGS) {
    let v = null;
    try { v = f.compute(ctx); } catch { v = null; }
    if (!v) { withdrawn.push({ id: f.id, scope: f.scope, reason: 'not computable from the current data' }); continue; }
    if (!f.holds(v)) { withdrawn.push({ id: f.id, scope: f.scope, reason: 'the data no longer supports the claim' }); continue; }
    held.push({ id: f.id, scope: f.scope, text: f.text(v), note: f.note, value: v });
  }
  return { held, withdrawn };
}

function computeTrends(payload) {
  const ctx = {
    timeline: timeline(payload),
    provenance: provenance(payload),
    coverage: coverage(payload),
  };
  return { ...ctx, findings: findings(ctx), generated: new Date().toISOString().slice(0, 10) };
}

module.exports = { computeTrends, NOT_LEVERAGE };
