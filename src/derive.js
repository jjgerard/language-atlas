// Turning a tracker's catalog entries into the units the map draws.
//
// This runs against live data from the trackers rather than a build-time
// snapshot, so the rules here have to hold for entries that did not exist when
// the atlas was built — including community submissions once they are approved.

const { makeHistoryMatcher } = require('./history');

// A contributor who looked and found nothing writes that into the field. It is
// worth showing, and it must never count as coverage: three states, not two.
const NOT_DOCUMENTED_RE = /^Not established from the sources consulted/i;

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
      .map(r => (r.name
        // A language row flattens to something a reader and a search box can
        // both use; the structured record is what the panel actually renders.
        ? [r.name, [r.family, r.genus].filter(Boolean).join(' > '), r.typology].filter(Boolean).join(' — ')
        : [r.year, r.value, r.description || r.note].filter(Boolean).join(' — ')))
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
      if (type === 'languages' && Array.isArray(e[k])) records[k] = e[k];
      const t = asText(e[k]).trim();
      if (t) values[k] = t;
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
      filled,
      looked,
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

  return {
    units,
    stats: {
      entries: units.length,
      documented: units.filter(u => u.coverage === 'has').length,
      sourceLabels: matcher.labelCount,
      historyRows,
      historyLinked,
    },
  };
}

module.exports = { deriveUnits, hasContent, isNotEstablished, isNotApplicable, asText, NOT_DOCUMENTED_RE, NOT_APPLICABLE_RE };
