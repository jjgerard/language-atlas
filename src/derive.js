// Turning a tracker's catalog entries into the units the map draws.
//
// This runs against live data from the trackers rather than a build-time
// snapshot, so the rules here have to hold for entries that did not exist when
// the atlas was built — including community submissions once they are approved.

const { makeHistoryMatcher } = require('./history');

// A contributor who looked and found nothing writes that into the field. It is
// worth showing, and it must never count as coverage: three states, not two.
// Written form is "Not established from the sources consulted.", and fl/apply.js
// still REFUSES to write anything else -- new work must use the exact phrase.
// But three fields already say it differently: "from the sources cited on this
// entry", "in this pass", and a bare "Not established:". Keying on the long
// phrase let those count as documented coverage, which is the one thing this
// sentinel exists to prevent. Liberal in what is recognised, strict in what may
// be written.
const NOT_DOCUMENTED_RE = /^Not established\b/i;

// A FOURTH state, distinct from the other three and needed because some slots
// can never be filled by anyone. Glottolog counts languages per COUNTRY, so
// "How many languages" has no meaning on a state or a province — India has 518
// and Kerala does not have a number at all. Left blank, those 143 slots read as
// work nobody has got to, and they drag the coverage figure down as though
// somebody had been lazy.
//
// Blank means nobody has looked. "Not established" means somebody looked and
// found nothing. This means the question does not apply here, and it is
// excluded from the denominator rather than counted as a miss.
const NOT_APPLICABLE_RE = /^Not applicable/i;

// Some fields are arrays of dated records ({year, description} for
// policyHistory, {year, value, note} for the prevalence/proportion fields).
// An array counts as documented when it has entries; the sentinel phrase only
// ever appears in the free-text fields.
function asText(v) {
  if (Array.isArray(v)) {
    return v
      .map(r => {
        // A language row flattens to something a reader and a search box can
        // both use; the structured record is what the panel actually renders.
        if (r.name) return [r.name, [r.family, r.genus].filter(Boolean).join(' > '), r.typology].filter(Boolean).join(' — ');
        // An offering row has no `name`, and without its own branch it fell
        // through to the series one and flattened to "2021 — the note",
        // dropping the language and the level, which are the whole point of it.
        if (r.language) {
          // `institution` names one; `institutions` is a total the source
          // stated without naming them. Both can be present, and a row may
          // carry either alone.
          const count = r.institutions ? r.institutions + ' institutions' : '';
          return [r.language, r.level, r.institution, count, r.year, r.note]
            .filter(Boolean).join(' — ');
        }
        return [r.year, r.value, r.description || r.note].filter(Boolean).join(' — ');
      })
      .join('\n');
  }
  return typeof v === 'string' ? v : (v == null ? '' : String(v));
}

function hasContent(v) {
  if (Array.isArray(v)) return v.length > 0;
  const t = asText(v).trim();
  return !!t && !NOT_DOCUMENTED_RE.test(t) && !NOT_APPLICABLE_RE.test(t);
}

const isNotEstablished = v => !Array.isArray(v) && NOT_DOCUMENTED_RE.test(asText(v).trim());
const isNotApplicable = v => !Array.isArray(v) && NOT_APPLICABLE_RE.test(asText(v).trim());

// The third state for a TYPED field. A prose field records "looked, found
// nothing" by holding the sentinel phrase; an array field cannot hold a
// phrase, so until now it had two states only -- rows, or empty -- and empty
// read as nobody having looked. That threw away real findings: a drafter read
// NDCC 15.1-13-22, the ESPB licence page and North Dakota's own SB2304
// standards, found they name no language, and the only thing the store could
// keep was `languages: []`, indistinguishable from North Dakota never having
// been opened. The next pass would redo the reading, the coverage figure
// counted it as a gap, and the map could not say the one thing worth saying.
//
// So an entry may carry `notEstablished: { <typedField>: "Not established
// from the sources consulted. <why>" }`. Same sentinel, same regex, same
// reader-facing text as a prose field -- it is put into `values[k]` below so
// the panel renders it through the branch it already has for the prose case.
// Rows always win: the flag is only read when the array is empty, and the
// store drops it the moment rows arrive.
const typedNotEstablished = (e, k) => {
  const v = e && e.notEstablished && e.notEstablished[k];
  return typeof v === 'string' && NOT_DOCUMENTED_RE.test(v.trim()) ? v.trim() : '';
};

const cleanLinks = links =>
  (Array.isArray(links) ? links : [])
    .filter(l => l && typeof l.url === 'string' && /^https?:\/\//i.test(l.url))
    .map(l => ({ label: String(l.label || l.url), url: l.url }));

/**
 * @param {{id:string, fields:Array<[string,string]>}} domain
 * @param {Array<object>} entries  as served by a tracker's /api/catalog
 * @param {object} [sharedMatcher] a matcher built over EVERY live domain's
 *   entries. Term rarity is judged across the whole corpus, which is how the
 *   thresholds in history.js were calibrated; scoring each domain against only
 *   its own labels makes rare terms look commoner and silently drops matches.
 */
function deriveUnits(domain, entries, sharedMatcher) {
  const rows = Array.isArray(entries) ? entries : [];
  const matcher = sharedMatcher || makeHistoryMatcher(rows);
  let historyRows = 0, historyLinked = 0;

  const units = rows.map(e => {
    const filled = [], looked = [], na = [];
    const fieldStates = domain.fields
      .map(([k, label]) => {
        if (hasContent(e[k])) { filled.push(label); return 'h'; }
        if (isNotEstablished(e[k])) { looked.push(label); return 'l'; }
        if (Array.isArray(e[k]) && typedNotEstablished(e, k)) { looked.push(label); return 'l'; }
        if (isNotApplicable(e[k])) { na.push(label); return 'x'; }
        return 'n';
      })
      .join('');

    const values = {};
    // Typed record fields keep their structure alongside the flattened text.
    // `values` is what search and the bullet renderer use; `records` is what a
    // renderer needs when the field is a list of things rather than prose —
    // a language row has to keep its WALS code to be linkable at all.
    const records = {};
    for (const [k, , type] of domain.fields) {
      if ((type === 'languages' || type === 'offering') && Array.isArray(e[k])) records[k] = e[k];
      const t = asText(e[k]).trim();
      if (t) values[k] = t;
      // An empty typed field flagged not-established shows its sentinel text
      // exactly where a prose field would, so the panel needs no new branch.
      else if (Array.isArray(e[k])) { const ne = typedNotEstablished(e, k); if (ne) values[k] = ne; }
    }

    // Which question each bullet answers, passed through so a field view or a
    // coding pass can use it without re-reading the prose. Only for fields this
    // unit actually has text in.
    const slots = {};
    for (const [k] of domain.fields) {
      const list = e.slots && e.slots[k];
      if (Array.isArray(list) && list.length && values[k]) slots[k] = list;
    }

    const docLinks = cleanLinks(e.docLinks);
    const history = (Array.isArray(e.policyHistory) ? e.policyHistory : []).map(h => {
      historyRows++;
      const links = matcher.match(h, docLinks);
      if (links.length) historyLinked++;
      return { year: String(h.year || ''), description: String(h.description || ''), links };
    });

    return {
      cc: String(e.countryCode || '').toUpperCase(),
      name: String(e.unitName || ''),
      nat: !!e.isNational,
      region: e.region || '',
      subregion: e.subregion || '',
      status: e.status || 'stub',
      // Why an entry is thin, in the words of whoever established it. Written
      // on 190 entries and, until now, never sent to the client: the reader saw
      // a blank record and no account of what had been looked for. The
      // distinction it carries is the one the whole map is built on — a gap in
      // the record is not a gap in the world.
      stubNote: String(e.stubNote || ''),
      confidence: e.confidence || 'unverified-submission',
      lastVerified: e.lastVerified || '',
      coverage: filled.length ? 'has' : (looked.length ? 'looked' : 'none'),
      fieldStates,
      slots,
      filled,
      looked,
      // Labels of fields this unit has nothing of its own for that ARE answered
      // by its country. Filled in below, once every unit is derived.
      inh: [],
      // The denominator for the coverage ramp: fields that COULD be filled
      // here. Counting the inapplicable ones would cap a sub-national unit
      // below 100% however complete it is.
      nFields: domain.fields.length - na.length,
      na,
      docs: docLinks.length,
      supports: cleanLinks(e.supportLinks).length,
      values,
      records,
      history,
      docLinks,
      supportLinks: cleanLinks(e.supportLinks),
      collaborators: (Array.isArray(e.collaborators) ? e.collaborators : [])
        .map(c => (c && c.name ? String(c.name) : '')).filter(Boolean),
    };
  });

  // A sub-national unit with NOTHING of its own is covered by its country, not
  // a gap. The national record is what applies there until someone documents
  // the unit itself, and painting it grey says the opposite.
  //
  // Worth knowing why this is safe to do by default. It can only ever fire
  // where a sub-unit is completely blank, and across the whole atlas that is
  // two countries: China on all four maps, and India on the disorder map.
  // Every other split country -- the 51 US states, 13 Canadian provinces, 8
  // Australian states, the 4 UK nations -- has its own record on every map, so
  // no federal rule is being spread over units known to differ from it.
  //
  // India is more than an assumption: a scouting pass established that the
  // RPwD Act Schedule defines speech and language disability once for the
  // whole country, that the Rehabilitation Council publishes a national
  // therapist count with no state breakdown, and that state portals, the PRS
  // state-acts archive, UDISE+ and the NAS report cards carry no state-level
  // provision. research/parts/inscout-bottomline.md.
  //
  // `distinctSubunits` is the escape hatch for a domain that learns its
  // sub-units really do differ. It is empty, and a country belongs in it the
  // day one of its units is documented differently from the national record.
  //
  // A unit marked `looked` keeps that state: someone searched THERE and found
  // nothing, which is its own finding and not the country's answer.
  const national = new Map();
  for (const u of units) if (u.nat) national.set(u.cc, u);
  const differs = new Set(domain.distinctSubunits || []);
  for (const u of units) {
    if (u.nat || differs.has(u.cc)) continue;
    const nat = national.get(u.cc);
    if (!nat) continue;

    // Fields with nothing of their own here that DO have an answer at national
    // level. This is the same inheritance the entry panel already showed field
    // by field; it just never reached the colour. Every US state reads 4 of 13
    // on the disorder map, because the other nine questions -- the IDEA
    // entitlement, the referral route, the funding, when services end -- are
    // answered once federally and have no state-level answer to record. Paint
    // that as a pale state and the map reports a gap in the research where
    // there is only an absence of state-level divergence.
    u.inh = domain.fields
      .filter((f, i) => u.fieldStates[i] === 'n' && nat.fieldStates[i] === 'h')
      .map(f => f[1]);

    if (u.coverage === 'none' && nat.coverage === 'has') u.coverage = 'inherited';
  }

  return {
    units,
    stats: {
      entries: units.length,
      documented: units.filter(u => u.coverage === 'has').length,
      inherited: units.filter(u => u.coverage === 'inherited').length,
      sourceLabels: matcher.labelCount,
      historyRows,
      historyLinked,
    },
  };
}

module.exports = { deriveUnits, hasContent, isNotEstablished, isNotApplicable, typedNotEstablished, asText, NOT_DOCUMENTED_RE, NOT_APPLICABLE_RE };
