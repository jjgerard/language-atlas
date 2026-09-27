// Dump the full field text + current coding for every unit the screen flagged
// on one domain.field.column. Usage: node _tmp_dumpall.js dld.workforce.headcount [skipCsvOfUnits]
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { pathFor } = require('./datafile.js');
const target = process.argv[2];
const skip = new Set((process.argv[3] || '').split(';').filter(Boolean));
const out = execFileSync(process.execPath,
  [path.join(__dirname, 'negatives-screen.js'), '--show', target], { encoding: 'utf8' });
const [dom, field] = target.split('.');
const units = JSON.parse(fs.readFileSync(pathFor(dom), 'utf8'));
const names = [];
for (const line of out.split(/\r?\n/)) {
  const m = line.match(/^  ([A-Z]{2}(?:-[A-Z0-9]+)?\|.+)$/);
  if (m && !names.includes(m[1])) names.push(m[1]);
}
console.log('flagged units: ' + names.length);
for (const n of names) {
  if (skip.has(n)) continue;
  const u = units.find(x => (x.countryCode + '|' + x.unitName) === n);
  if (!u) { console.log('NOT FOUND: ' + n); continue; }
  console.log('===== ' + n + '  [' + JSON.stringify((u.coding || {})[field]) + ']');
  console.log(String(u[field] == null ? '(empty)' : u[field]));
}
