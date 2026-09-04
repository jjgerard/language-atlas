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

// A `url` on a typed row becomes a link in the panel, so it is held to the
// same standard as docLinks: http(s) or dropped. A row is never discarded for
// a bad url -- the offering is still true without a link to it.
const URL_OK = /^https?:\/\//i;

function records(value, maxItems, keys) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, maxItems)
    .map(item => {
      const out = {};
      for (const k of keys) if (item && item[k] != null) out[k] = str(item[k], 500);
      if (out.url && !URL_OK.test(out.url)) delete out.url;
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
  // What a system offers, in a shape that can be counted AND followed. Prose
  // could say "several universities teach Japanese" and the trends page could
  // do nothing with it. A count alone is barely better: knowing twelve
  // institutions teach Basque does not tell you which twelve, or let a reader
  // reach one. So a row names ONE institution where that is known, carries a
  // url to the programme itself, and keeps `institutions` for a total the
  // source states without enumerating.
  //
  // That makes the count derivable where institutions are named, and still
  // recordable where only a total is published -- a row with institution blank
  // and institutions set is a legitimate row, not a half-filled one. `year` is
  // what makes any of it comparable: an offering count with no date cannot be
  // set against a school-level one.
  offering: ['language', 'level', 'institution', 'url', 'institutions', 'year', 'note'],
  // A degree programme in a SUBJECT rather than a language, which is what
  // `he.linguistics` is a list of.
  //
  // It was prose, and prose could not answer the questions actually being
  // asked of it. "Which institutions teach linguistics, with links, and how
  // many offer it at undergraduate level" is a count and a set of links; a
  // text field can hold neither, and what it held instead was sentences like
  // "Linguistics at U of M is the study of how human language is structured,
  // acquired and used" -- a definition of the discipline, true of everywhere,
  // filed under one place.
  //
  // It is deliberately NOT the `offering` shape, though the two are near
  // twins. Offerings are keyed by `language`, and that key feeds the
  // language-centred index: click a language, see every institution teaching
  // it. Filing linguistics there would put "Linguistics" and "Applied
  // Linguistics" in that index as though they were languages.
  //
  // `orientation` is the one field here with no analogue in `offering`:
  // whether a programme leans generative or usage-based. It is often not
  // stated, and stays blank when it is not -- it is a fact about a
  // department's own account of itself, never an inference from a reading
  // list or a staff page.
  programme: ['subject', 'level', 'institution', 'url', 'institutions', 'orientation', 'year', 'note'],
};

const NOT_ESTABLISHED_RE = /^Not established from the sources consulted/i;
const { slotCount, validSlots } = require('./slots');

// Which question each bullet answers. A field's hint lists its four questions
// in the order they must be answered, and drafters compose bullet by bullet
// against that list -- but the convention omits any question that cannot be
// answered, so a bullet's POSITION does not identify its question. Only 38% of
// filled fields carry as many bullets as slots. Recording the mapping at
// drafting time costs one integer per bullet; recovering it later means
// re-reading the prose of every entry.
//
// Kept strict, because a wrong slot number is worse than none: it would file a
// sentence under a question it does not answer, and the whole point of the
// number is that slot one means the same thing on all 353 units.
function slotsFor(domain, body, fields) {
  const src = body && body.slots;
  const out = {};
  if (!src || typeof src !== 'object' || Array.isArray(src)) return out;
  for (const [k, , type] of domain.fields) {
    if (type !== 'text') continue;
    const text = String(fields[k] == null ? '' : fields[k]).trim();
    if (!text || NOT_ESTABLISHED_RE.test(text) || /^Not applicable/i.test(text)) continue;
    const bullets = text.split(String.fromCharCode(10)).filter(l => l.trim()).length;
    const list = Array.isArray(src[k]) ? src[k].map(Number) : null;
    if (!validSlots(list, bullets, slotCount(domain, k))) continue;
    out[k] = list;
  }
  return out;
}

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

// How many rows a typed field may hold. This was a flat 50 for every shape,
// and 50 is the wrong number for two of them by an order of magnitude.
//
// The cap exists to bound what the public submission form can post. It is not
// a claim about how much a place can legitimately have, and it was silently
// acting as one: seedIfEmpty() runs every row through sanitize() on boot, so
// the cap applied to the COMMITTED data too, on every deploy, with nothing
// logged. Mexico's entry held 68 languages in data/indigenous.json and the
// live map served 50 of them. Australia's 104 Aboriginal and Torres Strait
// Islander languages would have lost 54 the moment they were pushed.
//
// Two entry-fields, 72 rows. A first count put it at 5,167 rows across the
// repo, which was wrong and wrong in an instructive way: it measured `.length`
// on every typed field without checking the field was an ARRAY, and a field
// holding the prose sentinel "Not established from the sources consulted."
// answers 396 to that. Every one of the alarming dld.identifiedPrevalence
// numbers was a character count of that sentence.
//
// The numbers below are per shape, each set from what the data can legitimately
// need rather than from a round number:
//
//   languages  "which languages does this system engage with" has a real
//              answer in the hundreds for Australia, Mexico or Nigeria
//   series     one row per age band per year, long by nature
//   history    a policy history is a handful of dated changes; the longest
//              here is 21
//   offering   one row per language per level per institution
//
// Every cell is still capped at 500 characters by records(), so the worst
// case a submission can post stays bounded.
const MAX_ROWS = { series: 500, languages: 500, offering: 200, programme: 200, history: 100 };

/** Pull the domain's declared fields out of a submitted body, typed and capped. */
function fieldsFor(domain, body) {
  const out = {};
  for (const [k, , type] of domain.fields) {
    if (SHAPES[type]) out[k] = records(body[k], MAX_ROWS[type] || 50, SHAPES[type]);
    else out[k] = str(body[k], 4000);
  }
  const ne = notEstablishedFor(domain, body, out);
  if (Object.keys(ne).length) out.notEstablished = ne;
  const sl = slotsFor(domain, body, out);
  if (Object.keys(sl).length) out.slots = sl;
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
  // Re-validated on the way out as well as in, so a blob written by an older
  // build cannot carry a slot list that no longer fits its field's bullets.
  entry.slots = domain ? slotsFor(domain, blob, entry) : {};
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
  // A slot list belongs to a particular text, so it survives the merge only for
  // the contribution whose text won. Anything else would number the wrong
  // bullets.
  out.slots = {};
  for (const r of rows) for (const [k, v] of Object.entries(r.slots || {}))
    if (String(out[k] || '') === String(r[k] || '')) out.slots[k] = v;

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
