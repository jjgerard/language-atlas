// The atlas server.
//
// It owns no data. It reads both trackers' live catalogs and forwards
// contributions back to whichever tracker owns that domain, so moderation
// stays where it already is — each tracker's own admin dashboard — and
// neither tracker repo needs changing.

const path = require('path');
const express = require('express');
const { byId, LIVE } = require('./domains');
const { getPayload, refresh, REFRESH_MS } = require('./catalog');

const PORT = Number(process.env.PORT || 3200);
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'public'), {
  setHeaders(res, file) {
    // Geometry is regenerated only by a build, and it is the big download.
    if (file.endsWith('geometry.json')) res.setHeader('Cache-Control', 'public, max-age=86400');
  },
}));

// ---- public: the merged, derived atlas ----
app.get('/api/atlas', async (req, res) => {
  try {
    const payload = await getPayload();
    res.set('Cache-Control', 'public, max-age=60');
    res.json(payload);
  } catch (err) {
    console.error('[atlas]', err);
    res.status(503).json({ error: 'catalog_unavailable', detail: String(err.message || err) });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    const p = await getPayload();
    res.json({ ok: true, sources: p.sources, stats: p.stats, refreshMs: REFRESH_MS });
  } catch (err) {
    res.status(503).json({ ok: false, error: String(err.message || err) });
  }
});

// ---- contributions: forwarded to the tracker that owns the domain ----
// Only the two endpoints a contributor needs are proxied. Nothing under
// /api/admin is forwarded, so this cannot be used to reach a moderation route.
const FORWARDABLE = new Set(['submissions', 'edit-requests']);

function domainFor(req, res) {
  const d = byId(req.params.domain);
  if (!d || !d.live) {
    res.status(404).json({ error: 'unknown_domain' });
    return null;
  }
  return d;
}

async function forward(d, endpoint, body, res) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const upstream = await fetch(`${d.origin}/api/${endpoint}`, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.type(upstream.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    console.error(`[forward:${d.id}/${endpoint}]`, err.message);
    res.status(502).json({ error: 'upstream_unavailable', detail: String(err.message || err) });
  } finally {
    clearTimeout(timer);
  }
}

app.post('/api/:domain/:endpoint', async (req, res) => {
  if (!FORWARDABLE.has(req.params.endpoint)) return res.status(404).json({ error: 'unknown_endpoint' });
  const d = domainFor(req, res);
  if (!d) return;
  await forward(d, req.params.endpoint, req.body || {}, res);
});

// ---- pages ----
// One URL per map so it can be linked and bookmarked; the page reads the
// domain back off the path.
const page = name => (req, res) => res.sendFile(path.join(__dirname, '..', 'public', name));

app.get('/', page('index.html'));
app.get('/about', page('about.html'));
for (const d of LIVE) app.get('/' + d.id, page('map.html'));

// Anything else is a real 404, not a silent fallback to the map.
app.use((req, res) => {
  if (req.accepts('html')) return res.status(404).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  res.status(404).json({ error: 'not_found' });
});

const server = app.listen(PORT, () => {
  console.log(`language-atlas on :${PORT}`);
  console.log(`  domains: ${LIVE.map(d => `${d.id} -> ${d.origin}`).join(', ')}`);
  // Warm the cache so the first visitor does not wait on two upstream fetches.
  refresh()
    .then(p => {
      for (const [id, s] of Object.entries(p.sources)) {
        const st = p.stats[id];
        console.log(`  ${id}: ${s.state}, ${s.entries} entries, ${st.documented} documented, ` +
                    `policy history ${st.historyLinked}/${st.historyRows} linked`);
      }
    })
    .catch(err => console.warn('  initial catalog fetch failed:', err.message));
});

module.exports = { app, server };
