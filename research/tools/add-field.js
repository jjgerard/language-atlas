// Write one researched field onto one existing entry, through the app's own
// sanitiser.
//
//     node research/tools/add-field.js <spec.json> [--write]
//
// WHY THIS EXISTS. CLAUDE.md says data/<domain>.json is written by the running
// app and that editing it locally will be overwritten by the next approval. The
// entries already in there were written by one-off scripts -- add-entries.js
// still points at the retired tracker repo -- and there was no general way to
// land a researched field. With 22 named research targets in
// research/EAL-EXIT-TARGETS.md, twenty-two more one-off scripts is not the
// answer.
//
// The rule this keeps: every value goes through store.sanitize, the same
// function the submission form and the approval path use. A field that would be
// rejected from a submission is rejected here, so a scripted edit cannot put
// the file into a state the app would not have produced. The risk CLAUDE.md
// names is still real -- an approval in the running app rewrites the file from
// the database -- so commit promptly and do not leave an edit sitting.
//
// The spec is JSON so the prose is reviewable as a diff before it lands:
//
//   { "domain": "eal", "unit": "PT|Portugal",
//     "fields": { "removalCriteria": ["one bullet", "another"] },
//     "coding": { "removalCriteria": { "exit_mechanism": ["proficiency judgement"] } },
//     "docLinks": [{ "label": "...", "url": "https://..." }],
//     "lastVerified": "2026-09", "confidence": "official-document" }
//
// Nothing here invents content. It moves text a reader wrote into the field a
// reader named, and refuses if the entry, the field or the vocabulary does not
// exist.
const fs = require('fs');
const path = require('path');
const { pathFor } = require('./datafile.js');

const ROOT = path.join(__dirname, '..', '..');
const { DOMAINS } = require(path.join(ROOT, 'src', 'domains.js'));
const { sanitize } = require(path.join(ROOT, 'src', 'store.js'));
const { SCHEMES } = require(path.join(ROOT, 'src', 'coding.js'));

const [, , specPath, ...rest] = process.argv;
const write = rest.includes('--write');
if (!specPath) {
  console.error('usage: add-field.js <spec.json> [--write]');
  process.exit(2);
}
const specs = [].concat(JSON.parse(fs.readFileSync(specPath, 'utf8')));

const unitKey = n => String(n).normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

let touched = 0;
const byDomain = {};
for (const spec of specs) (byDomain[spec.domain] = byDomain[spec.domain] || []).push(spec);

for (const [domainId, list] of Object.entries(byDomain)) {
  const domain = (Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS)).find(d => d.id === domainId);
  if (!domain) { console.error('no such domain: ' + domainId); process.exit(2); }
  const file = pathFor(domainId);
  const rows = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const spec of list) {
    const [cc, unit] = String(spec.unit).split('|');
    const i = rows.findIndex(r => r.countryCode === cc && unitKey(r.unitName) === unitKey(unit));
    if (i < 0) { console.error('no entry for ' + spec.unit + ' in ' + domainId); process.exit(2); }
    const row = rows[i];

    for (const [k, v] of Object.entries(spec.fields || {})) {
      if (!(domain.fields || []).some(f => f[0] === k)) {
        console.error(domainId + ' has no field ' + k); process.exit(2);
      }
      // Bullets are stored as one newline-joined string, the same shape the
      // submission textarea produces.
      row[k] = Array.isArray(v) ? v.join('\n') : String(v);
      const over = (Array.isArray(v) ? v : [v]).filter(b => String(b).length > 96);
      for (const b of over) console.warn('  ! over the 96-character budget (' + String(b).length + '): ' + b);
    }

    for (const [k, c] of Object.entries(spec.coding || {})) {
      const scheme = SCHEMES[domainId + '.' + k];
      if (!scheme) { console.error('no scheme for ' + domainId + '.' + k); process.exit(2); }
      for (const [col, val] of Object.entries(c)) {
        const def = (scheme.columns || {})[col];
        if (!def) { console.error(domainId + '.' + k + ' has no column ' + col); process.exit(2); }
        if (def && typeof def === 'object')
          for (const x of [].concat(val))
            if (!(x in def)) { console.error('not a value of ' + col + ': ' + x); process.exit(2); }
      }
      row.coding = row.coding || {};
      row.coding[k] = Object.assign({}, row.coding[k], c);
    }

    if (spec.docLinks) {
      const have = new Set((row.docLinks || []).map(d => String(d.url)));
      row.docLinks = (row.docLinks || []).concat(spec.docLinks.filter(d => !have.has(String(d.url))));
    }
    if (spec.lastVerified) row.lastVerified = spec.lastVerified;
    if (spec.confidence) row.confidence = spec.confidence;
    if (spec.status) row.status = spec.status;

    // The gate. Anything the submission path would refuse is refused here.
    //
    // sanitize returns the submission shape, with every declared field plus
    // coding, absences, slots and notEstablished nested under `fields`. The
    // data file is the EXPORT shape, which is flat -- exportDomain lifts them
    // to the top level. So the result is read from clean.fields and written
    // back flat, and a tool that merged `clean` straight in would quietly
    // restructure every row it touched.
    const clean = sanitize(domain, row);
    const got = clean.fields || {};
    for (const k of Object.keys(spec.fields || {})) {
      if (!String(got[k] == null ? '' : got[k]).trim()) {
        console.error('sanitize dropped ' + k + ' on ' + spec.unit + ' — it would be refused from a submission too');
        process.exit(2);
      }
    }
    for (const [k, c] of Object.entries(spec.coding || {})) {
      const kept = (got.coding || {})[k];
      for (const col of Object.keys(c))
        if (!kept || kept[col] == null) {
          console.error('sanitize dropped coding ' + k + '.' + col + ' on ' + spec.unit
            + ' — check the field has text; codingFor drops a coding on an empty field');
          process.exit(2);
        }
    }
    // Back to the export shape: metadata at the top, fields lifted out of the
    // nest, and nothing else from sanitize's submission envelope.
    //
    // ONLY the named fields are taken from the sanitised result. Running a
    // whole row through fieldsFor re-types every declared field, and on the
    // first entry this touched that silently added unit:"percent" to a
    // newcomerProportion row and turned policyHistory years from numbers into
    // strings. Both are shapes the app itself would write and neither moves a
    // sourced claim -- and both would still have been an unannounced change
    // riding along in a commit about something else, which is the thing
    // coding-verify.js exists to catch.
    const merged = Object.assign({}, row, {
      status: clean.status, confidence: clean.confidence, lastVerified: clean.lastVerified,
      docLinks: clean.docLinks, supportLinks: clean.supportLinks,
      collaborators: clean.collaborators,
      sourceLanguageNote: clean.sourceLanguageNote, stubNote: clean.stubNote,
    });
    for (const k of Object.keys(spec.fields || {})) merged[k] = got[k];
    for (const k of ['coding', 'absences', 'slots', 'notEstablished'])
      if (got[k] && Object.keys(got[k]).length) merged[k] = got[k];
    rows[i] = merged;
    touched++;
    console.log('  ' + spec.unit + ': ' + Object.keys(spec.fields || {}).join(', ')
      + (spec.coding ? '  + coding ' + Object.keys(spec.coding).join(', ') : '')
      + (spec.docLinks ? '  + ' + spec.docLinks.length + ' link(s)' : ''));
  }

  if (write) {
    fs.writeFileSync(file, JSON.stringify(rows, null, 1) + String.fromCharCode(10));
    console.log('wrote ' + path.relative(ROOT, file));
  }
}
console.log(touched + ' entr' + (touched === 1 ? 'y' : 'ies') + (write ? ' written' : ' (dry run - pass --write)'));
