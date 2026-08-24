// The map payload: built from the atlas's own store, and cached.
//
// Every domain the atlas shows is held here. It was not always so — the two
// trackers this atlas grew out of were proxied over the network for a while,
// and this file carried a fetch-and-fall-back path for them. They were retired
// in August 2026, and that path went with them; the entry shape the store
// returns is the shape the trackers' /api/catalog used, which is why nothing
// downstream of this file ever had to change.
//
// The cache exists because build() runs the policy-history matcher across every
// domain at once, which is the one part of assembling the payload worth not
// repeating per request. Approvals call invalidate() rather than waiting for
// the window to lapse.

const { LIVE, DOMAINS } = require('./domains');
const store = require('./store');
const { makeHistoryMatcher } = require('./history');
const { deriveUnits } = require('./derive');

const REFRESH_MS = Number(process.env.CATALOG_REFRESH_MS || 5 * 60 * 1000);

let state = { payload: null, builtAt: 0, sources: {} };

function build(catalogs, sources) {
  // Term rarity is judged across every domain at once — see deriveUnits.
  const all = Object.values(catalogs).flat();
  const shared = makeHistoryMatcher(all);
  const units = {}, stats = {};
  for (const d of LIVE) {
    const out = deriveUnits(d, catalogs[d.id] || [], shared);
    units[d.id] = out.units;
    stats[d.id] = out.stats;
  }
  return {
    units,
    stats,
    sources,
    domains: DOMAINS.map(({ fields, ...rest }) => ({
      ...rest,
      // Typed and hinted, because the submission form is generated from this.
      fields: (fields || []).map(([k, label, type, hint]) => ({ k, label, type, hint })),
    })),
  };
}

function read() {
  const catalogs = {}, sources = {};
  const at = new Date().toISOString();
  for (const d of LIVE) {
    const entries = store.approved(d.id);
    catalogs[d.id] = entries;
    // `sources` is kept in the payload even though there is only one source
    // now: /api/health and the admin dashboard report per-domain entry counts
    // from it, and a future proxied catalogue would slot in here.
    sources[d.id] = { origin: 'atlas', state: 'local', entries: entries.length, at };
  }
  return { catalogs, sources };
}

// Rebuild now, whatever the cache holds.
function refresh() {
  const { catalogs, sources } = read();
  state = { payload: build(catalogs, sources), builtAt: Date.now(), sources };
  return state.payload;
}

// Approving an entry has to show on the map now, not at the end of whichever
// refresh window it happened to land in.
const invalidate = () => { if (state.payload) refresh(); };

function getPayload() {
  if (state.payload && Date.now() - state.builtAt < REFRESH_MS) return state.payload;
  return refresh();
}

module.exports = { getPayload, refresh, invalidate, REFRESH_MS };
