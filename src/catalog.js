// Live catalog data, fetched from the trackers rather than snapshotted.
//
// The trackers send no CORS headers, so the browser cannot call them directly.
// Fetching here — server to server — is what makes the atlas show live data,
// including community submissions once a tracker's moderator approves them,
// and it needs no change to either tracker repo.

const fs = require('fs');
const path = require('path');
const { LIVE } = require('./domains');
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
      fields: (fields || []).map(([k, label]) => ({ k, label })),
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
  const catalogs = {};
  for (const d of LIVE) catalogs[d.id] = await fetchCatalog(d);
  fs.mkdirSync(path.dirname(SNAPSHOT), { recursive: true });
  fs.writeFileSync(SNAPSHOT, JSON.stringify(catalogs));
  snapshotCache = catalogs;
  return Object.fromEntries(Object.entries(catalogs).map(([k, v]) => [k, v.length]));
}

module.exports = { getPayload, refresh, writeSnapshot, REFRESH_MS };
