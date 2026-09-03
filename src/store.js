// The atlas's own entry store.
//
// Both trackers keep one table per project, with a column per field. That does
// not extend: a fourth domain would mean a fourth schema and a fourth copy of
// the same insert. Here the envelope every domain shares is columns, and the
// fields declared for that domain in domains.js live in one JSON blob. Adding
// a domain stays a domains.js edit.
//
// Rows come back out shaped exactly like the retired trackers' /api/catalog
// entries — the blob spread back to the top level. Keeping that shape is what
// made folding the trackers in a data move rather than a rewrite, and it is
// still the shape derive.js and every page below it expect.

const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');
const { byId, LIVE } = require('./domains');
const { subregionFor, regionFor } = require('./subregions');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'atlas.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL,
    country_code TEXT NOT NULL,
    unit_name TEXT NOT NULL,
    is_national INTEGER NOT NULL DEFAULT 1,
    region TEXT,
    subregion TEXT,
    content_status TEXT NOT NULL DEFAULT 'stub',
    confidence TEXT NOT NULL DEFAULT 'unverified-submission',
    last_verified TEXT,
    collaborators TEXT NOT NULL DEFAULT '[]',
    doc_links TEXT NOT NULL DEFAULT '[]',
    support_links TEXT NOT NULL DEFAULT '[]',
    source_language_note TEXT,
    stub_note TEXT,
    by_name TEXT,
    inst TEXT,
    fields TEXT NOT NULL DEFAULT '{}',
    moderation_status TEXT NOT NULL DEFAULT 'pending',
    source TEXT NOT NULL DEFAULT 'submission',
    submitted_at TEXT NOT NULL,
    reviewed_at TEXT
  );
  CREATE INDEX IF NOT EXISTS entries_domain_status ON entries (domain, moderation_status);

  CREATE TABLE IF NOT EXISTS edit_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL,
    entry_title TEXT,
    email TEXT NOT NULL,
    description TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'open',
    created_at TEXT NOT NULL,
    closed_at TEXT
  );
`);

const CONFIDENCE = new Set(['official-document', 'researcher-verified', 'secondary-source', 'unverified-submission']);
const CONTENT_STATUS = new Set(['stub', 'partial', 'complete']);

const str = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
const parse = (s, fallback) => { try { return JSON.parse(s); } catch { return fallback; } };

function records(value, maxItems, keys) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, maxItems)
    .map(item => {
      const out = {};
      for (const k of keys) if (item && item[k] != null) out[k] = str(item[k], 500);
      return out;
    })
    // A row the contributor started and left blank is noise, not data.
    .filter(r => keys.some(k => r[k]));
}

const SHAPES = {
  history: ['year', 'description'],
  series: ['year', 'value', 'note'],
  // A named language, with the identifiers that make it checkable. `wals` is
  // WALS's OWN code and is not the ISO code: Maori is `mao` in WALS and `mri`
  // in ISO 639-3, and `mri` is Moraori in WALS. A row with no `wals` gets no
  // link rather than a plausible wrong one.
  languages: ['name', 'wals', 'iso', 'family', 'genus', 'typology'],
  // What a system offers, in a shape that can be counted. Prose could say
  // "several universities teach Japanese" and the trends page could do nothing
  // with it; this keeps the language, how far it goes, how many institutions
  // and WHEN that was true. `year` is what makes it comparable -- an offering
  // count with no date cannot be set against a school-level one.
  offering: ['language', 'level', 'institutions', 'year', 'note'],
};

const NOT_ESTABLISHED_RE = /^Not established from the sources consulted/i;

// "Looked and found nothing" for a TYPED field. A prose field carries that as
// the sentinel phrase in its own text; an array cannot, so it is carried here,
// keyed by field, and lives inside the `fields` blob so it needs no column and
// survives the seed path -- seedIfEmpty() runs every row through sanitize()
// on boot, so anything this function does not keep is gone by the next deploy.
//
// Strict in what it keeps, the way fl/apply.js is: only typed fields of THIS
// domain, only a value opening with the exact sentinel phrase derive.js
// recognises, and never for a field that has rows in the same body -- rows win.
function notEstablishedFor(domain, body, fields) {
  const src = body && body.notEstablished;
  const out = {};
  if (!src || typeof src !== 'object') return out;
  for (const [k, , type] of domain.fields) {
    if (!SHAPES[type]) continue;
    const v = Array.isArray(src) ? (src.includes(k) ? 'Not established from the sources consulted.' : '') : src[k];
    const t = str(v, 1000).trim();
    if (!t || !NOT_ESTABLISHED_RE.test(t)) continue;
    if (Array.isArray(fields[k]) && fields[k].length) continue;
    out[k] = t;
  }
  return out;
}

/** Pull the domain's declared fields out of a submitted body, typed and capped. */
function fieldsFor(domain, body) {
  const out = {};
  for (const [k, , type] of domain.fields) {
    if (SHAPES[type]) out[k] = records(body[k], 50, SHAPES[type]);
    else out[k] = str(body[k], 4000);
  }
  const ne = notEstablishedFor(domain, body, out);
  if (Object.keys(ne).length) out.notEstablished = ne;
  return out;
}

function rowToEntry(row) {
  const domain = byId(row.domain);
  const blob = parse(row.fields, {});
  const entry = {
    id: row.id,
    domain: row.domain,
    countryCode: row.country_code,
    unitName: row.unit_name,
    isNational: !!row.is_national,
    region: row.region || '',
    subregion: row.subregion || '',
    status: row.content_status,
    confidence: row.confidence,
    lastVerified: row.last_verified || '',
    collaborators: parse(row.collaborators, []),
    docLinks: parse(row.doc_links, []),
    supportLinks: parse(row.support_links, []),
    sourceLanguageNote: row.source_language_note || '',
    stubNote: row.stub_note || '',
    by: row.by_name || '',
    inst: row.inst || '',
    moderationStatus: row.moderation_status,
    source: row.source,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at,
  };
  // Every declared field is present even if the blob predates it, so a field
  // added to domains.js shows as undocumented rather than missing.
  for (const [k, , type] of (domain ? domain.fields : [])) {
    entry[k] = blob[k] != null ? blob[k] : (SHAPES[type] ? [] : '');
  }
  // Re-checked on the way out as well as on the way in, so a blob written by
  // an older build cannot flag a prose field or a field that has since gained rows.
  entry.notEstablished = domain ? notEstablishedFor(domain, blob, entry) : {};
  return entry;
}

/** Normalise anything inbound — a form post, a seed row, an admin edit. */
function sanitize(domain, body) {
  const countryCode = str(body.countryCode, 2).toUpperCase();
  return {
    domain: domain.id,
    countryCode,
    unitName: str(body.unitName, 200),
    isNational: !(body.isNational === false || body.isNational === 'false'),
    // Derived from the country code rather than trusted from the client: a
    // contributor should not have to know UN-geoscheme labels.
    region: regionFor(countryCode),
    subregion: subregionFor(countryCode),
    status: CONTENT_STATUS.has(body.status) ? body.status : 'partial',
    confidence: CONFIDENCE.has(body.confidence) ? body.confidence : 'unverified-submission',
    lastVerified: str(body.lastVerified, 20),
    collaborators: records(body.collaborators, 20, ['name', 'inst']),
    docLinks: records(body.docLinks, 50, ['label', 'url']).filter(l => /^https?:\/\//i.test(l.url || '')),
    supportLinks: records(body.supportLinks, 50, ['label', 'url']).filter(l => /^https?:\/\//i.test(l.url || '')),
    sourceLanguageNote: str(body.sourceLanguageNote, 1000),
    stubNote: str(body.stubNote, 1000),
    by: str(body.by, 200),
    inst: str(body.inst, 200),
    fields: fieldsFor(domain, body),
  };
}

const COLS = `domain, country_code, unit_name, is_national, region, subregion, content_status,
  confidence, last_verified, collaborators, doc_links, support_links, source_language_note,
  stub_note, by_name, inst, fields, moderation_status, source, submitted_at`;

const PLACEHOLDERS = COLS.split(',').map(() => '?').join(', ');

function values(e, moderationStatus, source, now) {
  return [
    e.domain, e.countryCode, e.unitName, e.isNational ? 1 : 0, e.region, e.subregion,
    e.status, e.confidence, e.lastVerified,
    JSON.stringify(e.collaborators), JSON.stringify(e.docLinks), JSON.stringify(e.supportLinks),
    e.sourceLanguageNote, e.stubNote, e.by, e.inst, JSON.stringify(e.fields),
    moderationStatus, source, now,
  ];
}

function insert(domain, body, { moderationStatus = 'pending', source = 'submission' } = {}) {
  const e = sanitize(domain, body);
  const stmt = db.prepare(`INSERT INTO entries (${COLS}) VALUES (${PLACEHOLDERS})`);
  const res = stmt.run(...values(e, moderationStatus, source, new Date().toISOString()));
  return Number(res.lastInsertRowid);
}

// Two approved rows for the same place are the normal case, not an error: the
// place starts as a seeded stub, and the whole invitation to contributors is
// "add one field without documenting the rest". So the map gets one record per
// place, built field by field — a later row fills what it knows and leaves the
// rest of an earlier row standing. Each contribution is still a separate row in
// the dashboard, which is what gets reviewed.
function mergeEntries(domain, rows) {
  const out = { ...rows[0] };
  const seen = new Set();
  const listOf = k => rows.flatMap(r => Array.isArray(r[k]) ? r[k] : []);
  const dedupe = list => list.filter(r => {
    const key = JSON.stringify(r);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  for (const r of rows.slice(1)) {
    for (const [k, , type] of domain.fields) {
      if (SHAPES[type]) continue;              // arrays are pooled below
      if (String(r[k] || '').trim()) out[k] = r[k];
    }
    for (const k of ['status', 'confidence', 'by', 'inst', 'sourceLanguageNote', 'region', 'subregion']) {
      if (String(r[k] || '').trim()) out[k] = r[k];
    }
    if (r.lastVerified > (out.lastVerified || '')) out.lastVerified = r.lastVerified;
    out.moderationStatus = r.moderationStatus;
    out.reviewedAt = r.reviewedAt || out.reviewedAt;
  }

  for (const [k, , type] of domain.fields) {
    if (SHAPES[type]) { seen.clear(); out[k] = dedupe(listOf(k)); }
  }
  for (const k of ['docLinks', 'supportLinks', 'collaborators']) { seen.clear(); out[k] = dedupe(listOf(k)); }
  // A not-established flag from any contribution stands, unless some
  // contribution supplied rows for that field -- pooled rows beat a flag.
  out.notEstablished = {};
  for (const r of rows) for (const [k, v] of Object.entries(r.notEstablished || {})) {
    if (!(Array.isArray(out[k]) && out[k].length)) out.notEstablished[k] = out.notEstablished[k] || v;
  }

  // Everyone who wrote part of this place is a contributor to it.
  const names = new Set(out.collaborators.map(c => c.name).filter(Boolean));
  for (const r of rows) {
    if (r.by && r.source !== 'seed' && !names.has(r.by)) {
      names.add(r.by);
      out.collaborators.push({ name: r.by, inst: r.inst || '' });
    }
  }
  return out;
}

function approved(domainId) {
  const domain = byId(domainId);
  const rows = db
    .prepare("SELECT * FROM entries WHERE domain = ? AND moderation_status = 'approved' ORDER BY country_code ASC, id ASC")
    .all(domainId)
    .map(rowToEntry);
  if (!domain) return rows;

  const byPlace = new Map();
  for (const r of rows) {
    const key = r.countryCode + '|' + r.unitName.toLowerCase();
    if (!byPlace.has(key)) byPlace.set(key, []);
    byPlace.get(key).push(r);
  }
  return [...byPlace.values()].map(list => list.length === 1 ? list[0] : mergeEntries(domain, list));
}

function all(domainId, moderationStatus) {
  const sql = 'SELECT * FROM entries WHERE domain = ?'
    + (moderationStatus ? ' AND moderation_status = ?' : '')
    + ' ORDER BY id DESC';
  const args = moderationStatus ? [domainId, moderationStatus] : [domainId];
  return db.prepare(sql).all(...args).map(rowToEntry);
}

function get(id) {
  const row = db.prepare('SELECT * FROM entries WHERE id = ?').get(id);
  return row ? rowToEntry(row) : null;
}

function pendingCounts() {
  const rows = db
    .prepare("SELECT domain, COUNT(*) AS n FROM entries WHERE moderation_status = 'pending' GROUP BY domain")
    .all();
  return Object.fromEntries(rows.map(r => [r.domain, r.n]));
}

function update(id, body) {
  const existing = get(id);
  if (!existing) return null;
  const domain = byId(existing.domain);
  if (!domain) return null;
  // Merge onto the stored entry so a partial edit cannot blank fields the
  // form did not send.
  const e = sanitize(domain, { ...existing, ...body });
  db.prepare(`
    UPDATE entries SET
      country_code=?, unit_name=?, is_national=?, region=?, subregion=?, content_status=?,
      confidence=?, last_verified=?, collaborators=?, doc_links=?, support_links=?,
      source_language_note=?, stub_note=?, by_name=?, inst=?, fields=?
    WHERE id=?
  `).run(
    e.countryCode, e.unitName, e.isNational ? 1 : 0, e.region, e.subregion, e.status,
    e.confidence, e.lastVerified,
    JSON.stringify(e.collaborators), JSON.stringify(e.docLinks), JSON.stringify(e.supportLinks),
    e.sourceLanguageNote, e.stubNote, e.by, e.inst, JSON.stringify(e.fields),
    id,
  );
  return get(id);
}

function setStatus(id, moderationStatus) {
  db.prepare('UPDATE entries SET moderation_status = ?, reviewed_at = ? WHERE id = ?')
    .run(moderationStatus, new Date().toISOString(), id);
  return get(id);
}

function remove(id) {
  const entry = get(id);
  db.prepare('DELETE FROM entries WHERE id = ?').run(id);
  return entry;
}

/** Plain-schema export of one domain's approved entries — what gets committed. */
function exportDomain(domainId) {
  const domain = byId(domainId);
  return db
    .prepare("SELECT * FROM entries WHERE domain = ? AND moderation_status = 'approved' ORDER BY id ASC")
    .all(domainId)
    .map(rowToEntry)
    .map(e => {
      const out = {
        countryCode: e.countryCode, unitName: e.unitName, isNational: e.isNational,
        region: e.region, subregion: e.subregion, status: e.status, confidence: e.confidence,
        lastVerified: e.lastVerified, collaborators: e.collaborators, docLinks: e.docLinks,
        supportLinks: e.supportLinks, sourceLanguageNote: e.sourceLanguageNote,
        stubNote: e.stubNote, by: e.by, inst: e.inst, source: e.source,
      };
      for (const [k] of (domain ? domain.fields : [])) out[k] = e[k];
      return out;
    });
}

// ---- edit requests ----
// The trackers only ever emailed these. Keeping them in the database as well
// means one that arrives while mail is misconfigured is still there to answer.

function addEditRequest({ domain, entryTitle, email, description }) {
  const res = db.prepare(
    'INSERT INTO edit_requests (domain, entry_title, email, description, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(domain, str(entryTitle, 300), str(email, 200), str(description, 4000), new Date().toISOString());
  return Number(res.lastInsertRowid);
}

function editRequests(state) {
  const rows = state
    ? db.prepare('SELECT * FROM edit_requests WHERE state = ? ORDER BY id DESC').all(state)
    : db.prepare('SELECT * FROM edit_requests ORDER BY id DESC').all();
  return rows.map(r => ({
    id: r.id, domain: r.domain, entryTitle: r.entry_title || '', email: r.email,
    description: r.description, state: r.state, createdAt: r.created_at, closedAt: r.closed_at,
  }));
}

function setEditRequestState(id, state) {
  db.prepare('UPDATE edit_requests SET state = ?, closed_at = ? WHERE id = ?')
    .run(state, state === 'open' ? null : new Date().toISOString(), id);
  return editRequests().find(r => r.id === Number(id)) || null;
}

function openEditRequestCount() {
  return db.prepare("SELECT COUNT(*) AS n FROM edit_requests WHERE state = 'open'").get().n;
}

// data/<domain>.seed.json is the curated bootstrap set. data/<domain>.json is
// the living snapshot committed back by gitStore, and takes over once anything
// has been approved or edited — same pattern as both trackers, and the reason
// approved entries survive a rebuild on a host with no persistent disk.
function loadJson(file) {
  try { return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8')); }
  catch { return null; }
}

function seedIfEmpty() {
  for (const domain of LIVE) {
    const { n } = db.prepare('SELECT COUNT(*) AS n FROM entries WHERE domain = ?').get(domain.id);
    if (n > 0) continue;
    const living = loadJson(`${domain.id}.json`);
    const useLiving = Array.isArray(living) && living.length > 0;
    const rows = useLiving ? living : (loadJson(`${domain.id}.seed.json`) || []);
    if (!rows.length) { console.warn(`[store] ${domain.id}: nothing to seed`); continue; }
    const stmt = db.prepare(`INSERT INTO entries (${COLS}) VALUES (${PLACEHOLDERS})`);
    const now = new Date().toISOString();
    db.exec('BEGIN');
    try {
      for (const r of rows) stmt.run(...values(sanitize(domain, r), 'approved', r.source || 'seed', now));
      db.exec('COMMIT');
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
    const from = useLiving ? `${domain.id}.json (living snapshot)` : `${domain.id}.seed.json`;
    console.log(`[store] seeded ${rows.length} ${domain.id} entries from ${from}`);
  }
}

seedIfEmpty();

module.exports = {
  approved, all, get, insert, update, setStatus, remove,
  exportDomain, pendingCounts, sanitize, SHAPES,
  addEditRequest, editRequests, setEditRequestState, openEditRequestCount,
};
