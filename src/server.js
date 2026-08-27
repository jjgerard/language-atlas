// The atlas server.
//
// Every domain's entries live in the atlas's own store, with its submissions,
// edit requests and moderation here. Until August 2026 a domain could instead
// be proxied from its own tracker, with submissions forwarded upstream; the two
// trackers were retired and that path was removed. Everything a reader sees —
// the map, the panel, the forms — is generated from domains.js, which is why
// folding them in meant moving data rather than rewriting pages.

require('dotenv').config({ quiet: true });
const crypto = require('node:crypto');
const path = require('path');
const express = require('express');
const session = require('express-session');
const { byId, LIVE } = require('./domains');
const { getPayload, refresh, invalidate, REFRESH_MS } = require('./catalog');
const { computeTrends } = require('./trends');
const store = require('./store');
const { syncDomain, configured: gitConfigured } = require('./gitStore');
const mail = require('./mailer');
const ask = require('./ask');

const PORT = Number(process.env.PORT || 3200);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

// The trackers exit when these are missing. The atlas does not: a missing
// moderation secret should not take the public maps down with it. Admin routes
// refuse instead, and say why.
const adminEnabled = !!(ADMIN_PASSWORD && SESSION_SECRET);
if (!adminEnabled) {
  console.warn('[admin] disabled — set ADMIN_PASSWORD and SESSION_SECRET to enable the review dashboard.');
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
if (adminEnabled) {
  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 12 },
  }));
}
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

// The cross-cutting summaries. Same derived payload as /api/atlas, so an
// approved submission shows up in the trends without a rebuild — and served as
// its own endpoint because the researcher-facing use of this page is to take
// the numbers away, not to read them here.
app.get('/api/trends', async (req, res) => {
  try {
    const payload = await getPayload();
    res.set('Cache-Control', 'public, max-age=60');
    res.json(computeTrends(payload));
  } catch (err) {
    console.error('[trends]', err);
    res.status(503).json({ error: 'catalog_unavailable', detail: String(err.message || err) });
  }
});

// The question box on /explore. Two steps, deliberately separate — see ask.js.
//
// These are the only routes on the site that cost money per request and the
// only ones an unauthenticated visitor can use to reach a third party, so they
// are capped per address. The cap is small on purpose: the page works without
// them, falling back to its own parser, so a visitor who hits the limit loses a
// convenience rather than the feature.
const askHits = new Map();
const ASK_WINDOW_MS = 60 * 60 * 1000;
const ASK_MAX = Number(process.env.ASK_MAX_PER_HOUR || 40);

function askAllowed(req) {
  const ip = String(req.headers['fly-client-ip'] || req.ip || 'local');
  const now = Date.now();
  const hits = (askHits.get(ip) || []).filter(t => now - t < ASK_WINDOW_MS);
  if (hits.length >= ASK_MAX) { askHits.set(ip, hits); return false; }
  hits.push(now);
  askHits.set(ip, hits);
  if (askHits.size > 5000) for (const [k, v] of askHits) if (!v.some(t => now - t < ASK_WINDOW_MS)) askHits.delete(k);
  return true;
}

app.get('/api/ask', (req, res) => res.json({ available: ask.available(), model: ask.available() ? ask.MODEL : null }));

app.post('/api/ask/select', async (req, res) => {
  if (!ask.available()) return res.status(503).json({ error: 'no_model', detail: 'No ANTHROPIC_API_KEY is configured.' });
  if (!askAllowed(req)) return res.status(429).json({ error: 'rate_limited', detail: 'Too many questions from this address in the last hour.' });
  const { question, variables, scopes } = req.body || {};
  if (typeof question !== 'string' || !question.trim()) return res.status(400).json({ error: 'no_question' });
  if (!Array.isArray(variables) || !variables.length || !Array.isArray(scopes)) return res.status(400).json({ error: 'no_registry' });
  try {
    const out = await ask.choose(question.slice(0, 500), variables.slice(0, 400), scopes.slice(0, 100));
    // The model is not trusted to return a real id. An id it invented would
    // read as a working answer to a question the atlas cannot answer, which is
    // the exact failure this whole design exists to prevent.
    const ids = new Set(variables.map(v => v.id));
    const scopeIds = new Set(scopes.map(s => s.id));
    if (out.x != null && !ids.has(out.x)) return res.json({ x: null, y: null, scope: 'all', why: 'The model chose a variable this atlas does not have, so nothing was shown.', rejected: out.x });
    if (out.y != null && !ids.has(out.y)) out.y = null;
    if (!scopeIds.has(out.scope)) out.scope = 'all';
    res.json({ x: out.x ?? null, y: out.y ?? null, scope: out.scope, why: String(out.why || '').slice(0, 300) });
  } catch (err) {
    console.error('[ask/select]', err.message);
    res.status(502).json({ error: 'model_failed', detail: String(err.message).slice(0, 200) });
  }
});

app.post('/api/ask/read', async (req, res) => {
  if (!ask.available()) return res.status(503).json({ error: 'no_model' });
  if (!askAllowed(req)) return res.status(429).json({ error: 'rate_limited' });
  const { question, table } = req.body || {};
  if (typeof table !== 'string' || !table.trim()) return res.status(400).json({ error: 'no_table' });
  try {
    // Only the finished table crosses this line — labels and integers the
    // browser already computed. No entry text ever reaches the model.
    res.json({ reading: await ask.read(String(question || '').slice(0, 500), table.slice(0, 12000)) });
  } catch (err) {
    console.error('[ask/read]', err.message);
    res.status(502).json({ error: 'model_failed', detail: String(err.message).slice(0, 200) });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    const p = await getPayload();
    res.json({
      ok: true,
      sources: p.sources,
      stats: p.stats,
      refreshMs: REFRESH_MS,
      admin: adminEnabled,
      git: gitConfigured,
      mail: mail.configured,
      accepting: durable(),
    });
  } catch (err) {
    res.status(503).json({ ok: false, error: String(err.message || err) });
  }
});

// ---- contributions ----

function domainFor(req, res) {
  const d = byId(req.params.domain);
  if (!d || !d.live) {
    res.status(404).json({ error: 'unknown_domain' });
    return null;
  }
  return d;
}

const adminUrlFor = req => `${req.protocol}://${req.get('host')}/admin`;

// Accepting a contribution into a store that will be wiped on the next deploy,
// with nothing sent anywhere, would lose someone's work quietly. Either route
// out is enough: git persistence keeps it, and the notification email carries
// the whole entry as a block the dashboard can publish from. With neither, say
// so instead of taking it. Outside production this is relaxed, or the form
// could never be exercised locally without real credentials.
const durable = () => gitConfigured || mail.configured || process.env.NODE_ENV !== 'production';

const REQUIRED = ['countryCode', 'unitName', 'by'];

app.post('/api/:domain/submissions', async (req, res) => {
  const d = domainFor(req, res);
  if (!d) return;
  const body = req.body || {};
  // The attestations are the whole basis for trusting an entry: that the
  // contributor knows the system first-hand and has given a source for it.
  if (!body.attest1 || !body.attest2) return res.status(400).json({ error: 'attestation_required' });
  const missing = REQUIRED.filter(f => !String(body[f] || '').trim());
  if (missing.length) return res.status(400).json({ error: 'missing_fields', missing });

  if (!durable()) return res.status(503).json({ error: 'not_accepting_yet' });

  const id = store.insert(d, body);
  res.status(201).json({ id });
  const entry = store.get(id);
  mail.notifyNewSubmission(d, entry, adminUrlFor(req));
  const email = String(body.email || '').trim();
  if (EMAIL_RE.test(email)) mail.sendSubmissionConfirmation(email, d, entry);
});

app.post('/api/:domain/edit-requests', async (req, res) => {
  const d = domainFor(req, res);
  if (!d) return;
  const body = req.body || {};
  const email = String(body.email || '').trim();
  const description = String(body.description || '').trim();
  const entryTitle = String(body.entryTitle || '').trim() || '(untitled entry)';
  if (!description) return res.status(400).json({ error: 'missing_description' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'invalid_email' });

  if (!durable()) return res.status(503).json({ error: 'not_accepting_yet' });

  const payload = { domain: d.id, entryTitle, email, description };
  store.addEditRequest(payload);
  res.status(201).json({ ok: true });
  mail.notifyEditRequest(payload, adminUrlFor(req));
  mail.sendEditRequestConfirmation(payload);
});

// ---- admin ----

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireAuth(req, res, next) {
  if (!adminEnabled) return res.status(503).json({ error: 'admin_disabled' });
  if (req.session && req.session.authed) return next();
  res.status(401).json({ error: 'not_authenticated' });
}

function liveDomain(req, res) {
  const d = byId(req.body && req.body.domain ? req.body.domain : req.params.domain);
  if (!d || !d.live) {
    res.status(404).json({ error: 'unknown_domain' });
    return null;
  }
  return d;
}

// Committing the approved set is what survives a machine rebuild, so it runs
// after every change that alters it — not on a timer.
function persist(domainId) {
  invalidate();
  syncDomain(domainId, () => store.exportDomain(domainId));
}

app.post('/api/admin/login', (req, res) => {
  if (!adminEnabled) return res.status(503).json({ error: 'admin_disabled' });
  const { password } = req.body || {};
  if (!password || !timingSafeEqual(password, ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'invalid_password' });
  }
  req.session.authed = true;
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  if (!req.session) return res.json({ ok: true });
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/admin/me', (req, res) => {
  res.json({
    authed: !!(adminEnabled && req.session && req.session.authed),
    enabled: adminEnabled,
    domains: LIVE.map(d => ({ id: d.id, label: d.label })),
  });
});

app.get('/api/admin/queue', requireAuth, (req, res) => {
  const counts = store.pendingCounts();
  res.json({
    domains: LIVE.map(d => ({ id: d.id, label: d.label, pending: counts[d.id] || 0 })),
    editRequests: store.editRequests(),
    git: gitConfigured,
  });
});

app.get('/api/admin/:domain/entries', requireAuth, (req, res) => {
  const d = liveDomain(req, res);
  if (!d) return;
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  res.json({ entries: store.all(d.id, status), fields: d.fields.map(([k, label, type, hint]) => ({ k, label, type, hint })) });
});

app.put('/api/admin/entries/:id', requireAuth, (req, res) => {
  const updated = store.update(Number(req.params.id), req.body || {});
  if (!updated) return res.status(404).json({ error: 'not_found' });
  res.json({ entry: updated });
  if (updated.moderationStatus === 'approved') persist(updated.domain);
});

app.post('/api/admin/entries/:id/:action', requireAuth, (req, res) => {
  const action = req.params.action;
  const STATUS = { approve: 'approved', reject: 'rejected', unpublish: 'pending' };
  if (!STATUS[action]) return res.status(404).json({ error: 'unknown_action' });
  const entry = store.setStatus(Number(req.params.id), STATUS[action]);
  if (!entry) return res.status(404).json({ error: 'not_found' });
  res.json({ entry });
  persist(entry.domain);
});

app.delete('/api/admin/entries/:id', requireAuth, (req, res) => {
  const entry = store.remove(Number(req.params.id));
  if (!entry) return res.status(404).json({ error: 'not_found' });
  res.json({ ok: true });
  persist(entry.domain);
});

// Publish straight from a pasted JSON block — the one in the notification
// email. Works even if the queued row never survived to be reviewed.
app.post('/api/admin/publish', requireAuth, (req, res) => {
  const d = liveDomain(req, res);
  if (!d) return;
  const body = req.body || {};
  const missing = REQUIRED.filter(f => !String(body[f] || '').trim());
  if (missing.length) return res.status(400).json({ error: 'missing_fields', missing });
  const id = store.insert(d, body, { moderationStatus: 'approved', source: body.source || 'submission' });
  res.status(201).json({ entry: store.get(id) });
  persist(d.id);
});

app.post('/api/admin/edit-requests/:id/:action', requireAuth, (req, res) => {
  const state = { close: 'done', reopen: 'open' }[req.params.action];
  if (!state) return res.status(404).json({ error: 'unknown_action' });
  const updated = store.setEditRequestState(Number(req.params.id), state);
  if (!updated) return res.status(404).json({ error: 'not_found' });
  res.json({ request: updated });
});

// ---- pages ----
// One URL per map so it can be linked and bookmarked; the page reads the
// domain back off the path.
const page = name => (req, res) => res.sendFile(path.join(__dirname, '..', 'public', name));

app.get('/', page('index.html'));
app.get('/about', page('about.html'));
app.get('/patterns', page('patterns.html'));
app.get('/explore', page('explore.html'));
app.get('/submit', page('submit.html'));
app.get('/admin', page('admin.html'));
for (const d of LIVE) app.get('/' + d.id, page('map.html'));

// Anything else is a real 404, not a silent fallback to the map.
app.use((req, res) => {
  if (req.accepts('html')) return res.status(404).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  res.status(404).json({ error: 'not_found' });
});

const server = app.listen(PORT, () => {
  console.log(`language-atlas on :${PORT}`);
  console.log(`  domains: ${LIVE.map(d => d.id).join(', ')}`);
  // Warm the cache so the first visitor does not wait on the history matcher.
  try {
    const p = refresh();
    for (const [id, s] of Object.entries(p.sources)) {
      const st = p.stats[id];
      console.log(`  ${id}: ${s.entries} entries, ${st.documented} documented, ` +
                  `policy history ${st.historyLinked}/${st.historyRows} linked`);
    }
  } catch (err) {
    console.warn('  initial payload build failed:', err.message);
  }
});

module.exports = { app, server };
