// Move a tracker's catalog into this repo, so the atlas can hold that subject
// itself instead of reading it over the network.
//
//     node import-tracker.js eal dld
//
// Writes data/<id>.json — the same living-snapshot file the running app commits
// after every approval, so a fresh instance boots from it (see store.js
// seedIfEmpty). Nothing is written until every entry has been checked against
// the field list in domains.js, because a migration that silently drops a
// column is the kind of thing nobody notices for a year.
//
// The source is the tracker's live /api/catalog, which serves **approved
// entries only**. Anything still sitting unreviewed in a tracker's own queue
// does not come across — clear those queues first, or move them afterwards
// through the dashboard's paste box.
//
// Run this ONCE per tracker. Re-running overwrites data/<id>.json with the
// tracker's contents, which after the cutover means throwing away anything
// approved here since. To bring across a single late approval from a tracker,
// paste it into the dashboard's publish box instead.

const fs = require('fs');
const path = require('path');
const { byId } = require('./src/domains');
const { subregionFor, regionFor } = require('./src/subregions');

const ENVELOPE = [
  'countryCode', 'unitName', 'isNational', 'region', 'subregion', 'status',
  'confidence', 'lastVerified', 'collaborators', 'docLinks', 'supportLinks',
  'sourceLanguageNote', 'stubNote', 'by', 'inst', 'source',
];

// Present on a tracker row but meaningless once the entry lives here: the id
// is that tracker's, and moderation state is re-established by the import.
const DROPPABLE = new Set(['id', 'moderationStatus', 'submittedAt', 'reviewedAt']);

const has = v => Array.isArray(v) ? v.length > 0 : !!String(v == null ? '' : v).trim();

async function fetchCatalog(origin) {
  const res = await fetch(origin + '/api/catalog', { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${origin} -> HTTP ${res.status}`);
  const body = await res.json();
  const entries = Array.isArray(body.entries) ? body.entries : [];
  if (!entries.length) throw new Error(`${origin} returned an empty catalog`);
  return entries;
}

/** Every key any entry carries that this domain would not store. */
function unclaimedKeys(domain, entries) {
  const declared = new Set(domain.fields.map(([k]) => k));
  const keep = new Set([...ENVELOPE, ...declared]);
  const lost = new Map();
  for (const e of entries) {
    for (const [k, v] of Object.entries(e)) {
      if (keep.has(k) || DROPPABLE.has(k)) continue;
      if (!lost.has(k)) lost.set(k, 0);
      if (has(v)) lost.set(k, lost.get(k) + 1);
    }
  }
  return lost;
}

function toStoredRow(domain, e) {
  const cc = String(e.countryCode || '').toUpperCase();
  const row = {
    countryCode: cc,
    unitName: String(e.unitName || ''),
    isNational: e.isNational !== false,
    // Re-derived rather than carried: the trackers each filled these their own
    // way, and one table means one answer for a given country code.
    region: regionFor(cc) || String(e.region || ''),
    subregion: subregionFor(cc) || String(e.subregion || ''),
    status: e.status || 'stub',
    confidence: e.confidence || 'unverified-submission',
    lastVerified: e.lastVerified || '',
    collaborators: e.collaborators || [],
    docLinks: e.docLinks || [],
    supportLinks: e.supportLinks || [],
    sourceLanguageNote: e.sourceLanguageNote || '',
    stubNote: e.stubNote || '',
    by: e.by || '',
    inst: e.inst || '',
    // Where a row originally came from is worth keeping: it is the difference
    // between a curated entry and a community one, and the merge rule credits
    // contributors but not the seed.
    source: e.source || 'seed',
  };
  for (const [k, , type] of domain.fields) {
    row[k] = type === 'text' ? String(e[k] || '') : (Array.isArray(e[k]) ? e[k] : []);
  }
  return row;
}

async function importDomain(id) {
  const domain = byId(id);
  if (!domain) throw new Error(`unknown domain: ${id}`);
  const origin = domain.origin || `https://${id}-policy-tracker.fly.dev`;

  const entries = await fetchCatalog(origin);
  console.log(`\n${id}: ${entries.length} approved entries from ${origin}`);

  const lost = unclaimedKeys(domain, entries);
  const withContent = [...lost].filter(([, n]) => n > 0);
  for (const [k, n] of lost) {
    console.log(`  ${n > 0 ? 'LOSS' : 'ok  '}  ${k}: not in the field list, ${n} entries have content`);
  }
  if (withContent.length) {
    throw new Error(
      `${id}: would drop content in ${withContent.map(([k]) => k).join(', ')}. ` +
      `Add these to src/domains.js before importing.`
    );
  }

  const rows = entries
    .map(e => toStoredRow(domain, e))
    .sort((a, b) => a.countryCode.localeCompare(b.countryCode)
      || (a.isNational === b.isNational ? 0 : a.isNational ? -1 : 1)
      || a.unitName.localeCompare(b.unitName));

  // A place appearing twice would be merged on read, which is right for
  // contributions and wrong for an import — it would mean the tracker itself
  // held a duplicate, and that should be looked at rather than folded away.
  const seen = new Map();
  for (const r of rows) {
    const key = r.countryCode + '|' + r.unitName.toLowerCase();
    if (seen.has(key)) console.warn(`  duplicate place: ${r.unitName} (${r.countryCode})`);
    seen.set(key, true);
  }

  const documented = rows.filter(r => domain.fields.some(([k]) => has(r[k]))).length;
  const out = path.join(__dirname, 'data', `${id}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(rows, null, 1) + '\n');
  console.log(`  wrote data/${id}.json — ${rows.length} places, ${documented} documented, ${seen.size} distinct`);
  return { id, entries: rows.length, documented };
}

(async () => {
  const ids = process.argv.slice(2);
  if (!ids.length) {
    console.error('usage: node import-tracker.js <domain-id>...');
    process.exit(1);
  }
  const done = [];
  for (const id of ids) done.push(await importDomain(id));
  console.log('\nImported:', done.map(d => `${d.id} ${d.documented}/${d.entries}`).join(', '));
  console.log('Next: set native: true and remove origin for these in src/domains.js.');
})().catch(err => {
  console.error('\n' + err.message);
  process.exit(1);
});
