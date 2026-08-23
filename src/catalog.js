// Where each live domain's entries come from.
//
// A native domain reads the atlas's own store. A proxied one is fetched from
// its tracker, server to server — the trackers send no CORS headers, so a
// browser on this origin cannot call them directly. Both arrive in the same
// entry shape, so everything downstream of this file is unaware of which is
// which; that is what let the two trackers be folded in without touching a
// single page.
//
// Every domain is native as of the import, so the fetch path below currently
// runs for nothing. It stays because `origin` is still a supported way to
// declare a domain, and because it is the road any future catalogue would come
// in by. If it is still unused when a fourth subject lands, delete it.

const fs = require('fs');
const path = require('path');
const { LIVE } = require('./domains');
const store = require('./store');
const { makeHistoryMatcher } = require('./history');
const { deriveUnits } = require('./derive');

const REFRESH_MS = Number(process.env.CATALOG_REFRESH_MS || 5 * 60 * 1000);
const FETCH_TIMEOUT_MS = Number(process.env.CATALOG_TIMEOUT_MS || 15000);
const SNAPSHOT = path.join(__dirname, '..', 'data', 'snapshot.json');

let state = { payload: null, fetchedAt: 0, sources: {} };

async function fetchCatalog(domain) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(domain.origin + '/api/catalog', {
      signal: ctrl.signal,
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    const entries = Array.isArray(body.entries) ? body.entries : [];
    if (!entries.length) throw new Error('empty catalog');
    return entries;
  } finally {
    clearTimeout(timer);
  }
}

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
    domains: require('./domains').DOMAINS.map(({ fields, origin, ...rest }) => ({
      ...rest,
      // Typed and hinted, because the submission form is generated from this.
      fields: (fields || []).map(([k, label, type, hint]) => ({ k, label, type, hint })),
    })),
  };
}

// A tracker being down must not take the atlas down with it: keep the last
// good catalog per domain, and fall back to the committed snapshot on a cold
// start. Anything served from a stale source says so in `sources`.
const lastGood = {};

async function refresh() {
  const catalogs = {}, sources = {};
  await Promise.all(LIVE.map(async d => {
    if (d.native) {
      const entries = store.approved(d.id);
      catalogs[d.id] = entries;
      sources[d.id] = { origin: 'atlas', state: 'local', entries: entries.length, at: new Date().toISOString() };
      return;
    }
    try {
      const entries = await fetchCatalog(d);
      lastGood[d.id] = entries;
      catalogs[d.id] = entries;
      sources[d.id] = { origin: d.origin, state: 'live', entries: entries.length, at: new Date().toISOString() };
    } catch (err) {
      const fallback = lastGood[d.id] || snapshotFor(d.id);
      catalogs[d.id] = fallback || [];
      sources[d.id] = {
        origin: d.origin,
        state: fallback ? (lastGood[d.id] ? 'stale' : 'snapshot') : 'unavailable',
        entries: (fallback || []).length,
        error: String(err.message || err),
      };
      console.warn(`[catalog] ${d.id}: ${err.message} — serving ${sources[d.id].state}`);
    }
  }));
  state = { payload: build(catalogs, sources), fetchedAt: Date.now(), sources };
  return state.payload;
}

let snapshotCache;
function snapshotFor(id) {
  if (snapshotCache === undefined) {
    try { snapshotCache = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8')); }
    catch { snapshotCache = null; }
  }
  return snapshotCache ? snapshotCache[id] : null;
}

// Approving an entry in a native domain has to show on the map now, not at the
// end of the refresh window it happened to land in — and not on the request
// after the next one either, which is what marking the payload stale would
// give: getPayload deliberately serves what it holds while a refresh runs.
// A native domain's entries are already here, so rebuild against them and
// whatever the proxied domains last gave us.
function invalidate() {
  if (!state.payload) return;
  const catalogs = {};
  const sources = { ...state.sources };
  for (const d of LIVE) {
    if (d.native) {
      catalogs[d.id] = store.approved(d.id);
      sources[d.id] = { origin: 'atlas', state: 'local', entries: catalogs[d.id].length, at: new Date().toISOString() };
    } else {
      catalogs[d.id] = lastGood[d.id] || snapshotFor(d.id) || [];
    }
  }
  state = { ...state, payload: build(catalogs, sources), sources };
}

let inflight = null;
async function getPayload() {
  const fresh = state.payload && Date.now() - state.fetchedAt < REFRESH_MS;
  if (fresh) return state.payload;
  if (!inflight) inflight = refresh().finally(() => { inflight = null; });
  // A refresh failure must not 500 the page when we already hold something.
  if (state.payload) { inflight.catch(() => {}); return state.payload; }
  return inflight;
}

// Write what the trackers currently serve, so a cold start has something to
// fall back on even if both are unreachable.
async function writeSnapshot() {
  if (LIVE.every(d => d.native)) {
    throw new Error('nothing to snapshot: every domain reads the store in this app. '
      + 'Approved entries are kept by src/gitStore.js instead.');
  }
  const catalogs = {};
  for (const d of LIVE) {
    if (d.native) continue; // already ours; nothing to fall back from
    catalogs[d.id] = await fetchCatalog(d);
  }
  fs.mkdirSync(path.dirname(SNAPSHOT), { recursive: true });
  fs.writeFileSync(SNAPSHOT, JSON.stringify(catalogs));
  snapshotCache = catalogs;
  return Object.fromEntries(Object.entries(catalogs).map(([k, v]) => [k, v.length]));
}

module.exports = { getPayload, refresh, invalidate, writeSnapshot, REFRESH_MS };
