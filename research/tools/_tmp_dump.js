const fs = require('fs');
const { pathFor } = require('./datafile.js');
const [dom, field, ...names] = process.argv.slice(2);
const units = JSON.parse(fs.readFileSync(pathFor(dom), 'utf8'));
for (const n of names) {
  const u = units.find(x => (x.countryCode + '|' + x.unitName) === n || x.unitName === n);
  if (!u) { console.log('NOT FOUND: ' + n); continue; }
  console.log('===== ' + u.countryCode + '|' + u.unitName + ' =====');
  console.log(String(u[field] == null ? '(empty)' : u[field]));
  console.log('--- coding: ' + JSON.stringify((u.coding || {})[field]));
}
