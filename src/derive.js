// Turning a tracker's catalog entries into the units the map draws.
//
// This runs against live data from the trackers rather than a build-time
// snapshot, so the rules here have to hold for entries that did not exist when
// the atlas was built — including community submissions once they are approved.

const { makeHistoryMatcher } = require('./history');

// A contributor who looked and found nothing writes that into the field. It is
// worth showing, and it must never count as coverage: three states, not two.
const NOT_DOCUMENTED_RE = /^Not established from the sources consulted/i;

// Some fields are arrays of dated records ({year, description} for
// policyHistory, {year, value, note} for the prevalence/proportion fields).
// An array counts as documented when it has entries; the sentinel phrase only
// ever appears in the free-text fields.
function asText(v) {
  if (Array.isArray(v)) {
    return v
      .map(r => [r.year, r.value, r.description || r.note].filter(Boolean).join(' — '))
      .join('\n');
  }
  return typeof v === 'string' ? v : (v == null ? '' : String(v));
}

function hasContent(v) {
  if (Array.isArray(v)) return v.length > 0;
  const t = asText(v).trim();
  return !!t && !NOT_DOCUMENTED_RE.test(t);
}

const isNotEstablished = v => !Array.isArray(v) && NOT_DOCUMENTED_RE.test(asText(v).trim());

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
    const filled = [], looked = [];
    const fieldStates = domain.fields
      .map(([k, label]) => {
        if (hasContent(e[k])) { filled.push(label); return 'h'; }
        if (isNotEstablished(e[k])) { looked.push(label); return 'l'; }
        return 'n';
      })
      .join('');

    const values = {};
    for (const [k] of domain.fields) {
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
      confidence: e.confidence || 'unverified-submission',
      lastVerified: e.lastVerified || '',
      coverage: filled.length ? 'has' : (looked.length ? 'looked' : 'none'),
      fieldStates,
      filled,
      looked,
      nFields: domain.fields.length,
      docs: docLinks.length,
      supports: cleanLinks(e.supportLinks).length,
      values,
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

module.exports = { deriveUnits, hasContent, isNotEstablished, asText, NOT_DOCUMENTED_RE };
