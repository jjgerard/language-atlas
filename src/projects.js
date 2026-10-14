// Project ideas posted by VCSE organisations, looking for a research partner.
//
// This is the collaboration side of the NI children's-sector deep dive
// (public/sector/ni-children.json): an organisation from that list — or one not
// on it yet — says what it wants to find out and what it can offer, and
// researchers from the NICDRN directory (public/collaborate/researchers.json)
// can see it and get in touch.
//
// It is deliberately NOT one of the atlas's domains. A domain is a place with a
// fixed list of policy fields, and its entries are held to the content rules:
// every claim traces to a docLink. A project idea is a proposal, not a finding —
// nothing here is evidence about a place, and nothing here feeds the maps.
//
// Three rules carried over from the rest of the site:
//
//  - The organisation link is looked up server-side from the deep dive. A
//    client can say "this is v001"; it cannot say what v001 is called.
//  - An organisation that is NOT in the deep dive is kept ON the project, as
//    what the poster said, flagged unverified. It is never added to
//    ni-children.json: that list is defined by a documented basis for each
//    entry (see its `rule`), and a form submission is not one.
//  - Private contact details never go into the git snapshot. Fly has no disk,
//    so data/projects.json is what survives a rebuild — and the repository may
//    be public. The email stays in SQLite and in the notification email, and is
//    published only if the poster ticks the box that says so.

const fs = require('fs');
const path = require('path');
const { db } = require('./store');

const ROOT = path.join(__dirname, '..');
const SECTOR_FILE = path.join(ROOT, 'public', 'sector', 'ni-children.json');
const RESEARCHERS_FILE = path.join(ROOT, 'public', 'collaborate', 'researchers.json');
const SNAPSHOT = path.join(ROOT, 'data', 'projects.json');

// ---- vocabularies ---------------------------------------------------------
// The themes are the deep dive's own service codes, so a project and an
// organisation's profile are described in the same words and can be set side by
// side. The labels are the ones pages/sector.html shows.
const THEMES = {
  'early-years': 'Early years', 'family-support': 'Family support', 'child-protection': 'Child protection',
  'looked-after': 'Children in care and care leavers', 'disability-sen': 'Disability and SEN',
  'mental-health': 'Mental health and wellbeing', 'youth-work': 'Youth work', 'youth-justice': 'Youth justice',
  'education-support': 'Education support', 'training-employment': 'Training and employment (16–24)',
  'housing-homelessness': 'Housing and homelessness (16–25)', 'health': 'Health',
  'play-recreation': 'Play, sport and arts', 'voice-rights': 'Voice, rights and support to others',
  'good-relations': 'Good relations', 'poverty-material': 'Poverty and material help',
  'trauma-victims': 'Trauma and victims', 'other': 'Other',
};
const AGE_BANDS = { '0-4': 'Under 5', '5-11': '5–11', '12-17': '12–17', '18-25': '18–25 (young adults)', 'families': 'Parents and carers' };
const KINDS = {
  'evaluation': 'Evaluating a service or programme',
  'needs': 'Understanding a need or gap',
  'co-design': 'Co-designing something new',
  'data-analysis': 'Analysing data we already hold',
  'review': 'Reviewing the existing evidence',
  'training': 'Training or capacity-building for staff',
  'other': 'Something else',
};
const OFFERS = {
  'access': 'Access to children, young people or families',
  'data': 'Data we hold (service records, surveys, feedback)',
  'staff': 'Staff time and practice expertise',
  'lived': 'Lived-experience advisers',
  'space': 'A venue or space',
  'dissemination': 'Routes to share findings (networks, funders, policy contacts)',
};
const STAGES = {
  'idea': 'An early idea',
  'scoping': 'Scoping — still deciding what to ask',
  'ready': 'Ready — looking for a partner to start',
  'underway': 'Underway — looking for added expertise',
};
const FUNDING = {
  'none': 'No funding yet',
  'seeking': 'Looking for funding together',
  'secured': 'Funding secured',
  'in-kind': 'In-kind only',
};

// The research areas are read from the researcher directory so the two lists
// cannot drift: a project can ask only for an area some researcher has.
function researcherDoc() {
  try { return JSON.parse(fs.readFileSync(RESEARCHERS_FILE, 'utf8')); }
  catch { return { areas: [], researchers: [] }; }
}
const researchAreas = () => Object.fromEntries(researcherDoc().areas.map(a => [a.id, a.label]));

// ---- the deep dive, as a lookup ------------------------------------------
let sector = null;
function sectorIndex() {
  if (sector) return sector;
  let d;
  try { d = JSON.parse(fs.readFileSync(SECTOR_FILE, 'utf8')); }
  catch { d = { orgs: [], register: [], geo: { councils: [] } }; }
  const councils = Object.fromEntries((d.geo.councils || []).map(c => [c.code, c.name]));
  const orgs = (d.orgs || []).map(o => ({
    id: o.orgId,
    name: o.name,
    regNo: o.regNo || null,
    council: o.place && councils[o.place.council] || null,
    codes: [...new Set(((o.profile && o.profile.services) || []).map(s => s.code))],
  }));
  // register rows: [regNo, name, tier, income, lat, lon, council, trust]
  const register = new Map((d.register || []).map(r => [String(r[0]), { name: r[1], council: councils[r[6]] || null }]));
  sector = {
    orgs,
    byId: new Map(orgs.map(o => [o.id, o])),
    byReg: new Map(orgs.filter(o => o.regNo).map(o => [String(o.regNo), o])),
    register,
  };
  return sector;
}

// ---- storage ---------------------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    moderation_status TEXT NOT NULL DEFAULT 'pending',
    data TEXT NOT NULL,
    private TEXT NOT NULL DEFAULT '{}',
    submitted_at TEXT NOT NULL,
    reviewed_at TEXT
  );
  CREATE INDEX IF NOT EXISTS projects_status ON projects (moderation_status);
`);

const str = (v, n) => String(v == null ? '' : v).replace(/\r\n/g, '\n').trim().slice(0, n);
const one = (v, n) => str(v, n).replace(/\s+/g, ' ');
const URL_OK = /^https?:\/\//i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const parse = (s, fallback) => { try { return JSON.parse(s); } catch { return fallback; } };

/** Keep only keys that are in `allowed`, in the order `allowed` lists them. */
const pick = (v, allowed, max) => {
  const have = new Set(Array.isArray(v) ? v : []);
  return Object.keys(allowed).filter(k => have.has(k)).slice(0, max);
};
const choose = (v, allowed) => (Object.prototype.hasOwnProperty.call(allowed, v) ? v : '');

/**
 * Resolve who the project belongs to. The poster says WHICH listed
 * organisation; the name and charity number come from the deep dive, never from
 * the request.
 *
 *   listed  - an organisation in ni-children.json
 *   new     - not there. Kept as the poster described it and marked unverified.
 *             If the charity number turns out to match a listed organisation
 *             the poster has simply not found it, so it becomes a link; if it
 *             matches the CCNI register, the register's name is stored beside
 *             what was typed, so a reviewer can see whether they agree.
 *   none    - not tied to an organisation yet
 */
function resolveOrg(input) {
  const idx = sectorIndex();
  const o = input && typeof input === 'object' ? input : {};
  if (o.kind === 'listed') {
    const hit = idx.byId.get(str(o.orgId, 20));
    if (hit) return { kind: 'listed', orgId: hit.id, name: hit.name, regNo: hit.regNo, council: hit.council };
    return { error: 'unknown_org' };
  }
  if (o.kind === 'new') {
    const name = one(o.name, 160);
    if (!name) return { error: 'org_name_required' };
    const regNo = one(o.regNo, 20).replace(/[^\w-]/g, '');
    if (regNo && idx.byReg.has(regNo)) {
      const hit = idx.byReg.get(regNo);
      return { kind: 'listed', orgId: hit.id, name: hit.name, regNo: hit.regNo, council: hit.council };
    }
    const site = one(o.website, 300);
    const out = {
      kind: 'new', name, regNo,
      website: URL_OK.test(site) ? site : '',
      town: one(o.town, 80),
      what: str(o.what, 500),
      verified: false,
    };
    const reg = regNo && idx.register.get(regNo);
    if (reg) { out.registerName = reg.name; if (reg.council) out.council = reg.council; }
    return out;
  }
  return { kind: 'none' };
}

/** Everything a visitor may see. Returns { error } for a missing required field. */
function sanitize(body) {
  const b = body && typeof body === 'object' ? body : {};
  const org = resolveOrg(b.org);
  if (org.error) return org;
  const title = one(b.title, 140);
  const summary = str(b.summary, 1500);
  const contactName = one(b.contactName, 100);
  const email = one(b.email, 200);
  if (!title) return { error: 'title_required' };
  if (!summary) return { error: 'summary_required' };
  if (!contactName) return { error: 'contact_required' };
  if (!EMAIL_RE.test(email)) return { error: 'invalid_email' };

  const areas = researchAreas();
  const links = (Array.isArray(b.links) ? b.links : []).slice(0, 5)
    .map(l => ({ label: one(l && l.label, 120), url: one(l && l.url, 400) }))
    .filter(l => URL_OK.test(l.url));

  const publishEmail = !!b.publishEmail;
  const data = {
    title,
    summary,
    question: str(b.question, 600),
    need: str(b.need, 1500),
    beneficiaries: str(b.beneficiaries, 500),
    ageBands: pick(b.ageBands, AGE_BANDS, 5),
    themes: pick(b.themes, THEMES, 6),
    areasWanted: pick(b.areasWanted, areas, 8),
    kinds: pick(b.kinds, KINDS, 7),
    offers: pick(b.offers, OFFERS, 6),
    offersNote: str(b.offersNote, 600),
    dataNote: str(b.dataNote, 600),
    geography: one(b.geography, 200),
    stage: choose(b.stage, STAGES),
    timing: one(b.timing, 200),
    funding: choose(b.funding, FUNDING),
    fundingNote: one(b.fundingNote, 300),
    links,
    org,
    contactName,
    contactRole: one(b.contactRole, 100),
    publicEmail: publishEmail ? email : '',
  };
  return { data, private: { email, publishEmail } };
}

function rowToProject(row, { includePrivate = false } = {}) {
  const p = { id: row.id, ...parse(row.data, {}), status: row.moderation_status, submittedAt: row.submitted_at, reviewedAt: row.reviewed_at };
  if (includePrivate) p.private = parse(row.private, {});
  return p;
}

function insert(body, { moderationStatus = 'pending', id = null } = {}) {
  const s = sanitize(body);
  if (s.error) return s;
  const now = new Date().toISOString();
  const reviewed = moderationStatus === 'approved' ? now : null;
  const r = id
    ? db.prepare('INSERT INTO projects (id, moderation_status, data, private, submitted_at, reviewed_at) VALUES (?,?,?,?,?,?)')
        .run(id, moderationStatus, JSON.stringify(s.data), JSON.stringify(s.private), str(body.submittedAt, 40) || now, reviewed)
    : db.prepare('INSERT INTO projects (moderation_status, data, private, submitted_at, reviewed_at) VALUES (?,?,?,?,?)')
        .run(moderationStatus, JSON.stringify(s.data), JSON.stringify(s.private), now, reviewed);
  return { id: Number(r.lastInsertRowid) };
}

const get = (id, opts) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
  return row ? rowToProject(row, opts) : null;
};
const approved = () => db.prepare("SELECT * FROM projects WHERE moderation_status = 'approved' ORDER BY reviewed_at DESC, id DESC").all().map(r => rowToProject(r));
const all = status => (status
  ? db.prepare('SELECT * FROM projects WHERE moderation_status = ? ORDER BY id DESC').all(status)
  : db.prepare('SELECT * FROM projects ORDER BY id DESC').all()).map(r => rowToProject(r, { includePrivate: true }));
const pendingCount = () => db.prepare("SELECT COUNT(*) AS n FROM projects WHERE moderation_status = 'pending'").get().n;

function setStatus(id, status) {
  const now = new Date().toISOString();
  const r = db.prepare('UPDATE projects SET moderation_status = ?, reviewed_at = ? WHERE id = ?').run(status, now, id);
  return r.changes ? get(id, { includePrivate: true }) : null;
}
function remove(id) {
  const p = get(id);
  if (!p) return null;
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return p;
}

/** The committed snapshot: approved projects, minus anything private. */
function exportApproved() {
  return approved().map(({ status, ...p }) => p);
}

function seedIfEmpty() {
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM projects').get();
  if (n > 0) return;
  let rows;
  try { rows = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8')); } catch { return; }
  if (!Array.isArray(rows) || !rows.length) return;
  let seeded = 0;
  for (const r of rows) {
    // The snapshot holds the public shape already; rebuild the request body
    // from it so every row goes back through sanitize() like a live one.
    const email = r.publicEmail || 'unpublished@invalid.example';
    const res = insert({ ...r, email, publishEmail: !!r.publicEmail, submittedAt: r.submittedAt },
      { moderationStatus: 'approved', id: r.id });
    if (res.error) console.warn(`[projects] snapshot row ${r.id} skipped: ${res.error}`);
    else seeded++;
  }
  console.log(`[projects] seeded ${seeded} approved project${seeded === 1 ? '' : 's'} from projects.json`);
}
seedIfEmpty();

module.exports = {
  THEMES, AGE_BANDS, KINDS, OFFERS, STAGES, FUNDING, researchAreas, researcherDoc,
  sectorIndex, sanitize, insert, get, approved, all, pendingCount, setStatus, remove, exportApproved,
};
