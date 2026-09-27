// Cross one coded column against another on the same field, to check whether a
// proposed change would sit with its siblings or against them.
// usage: node _tmp_cross.js <domain> <field> <colA> <colB> [--list valueOfA]
const fs = require('fs');
const { pathFor } = require('./datafile.js');
const [dom, field, a, b] = process.argv.slice(2);
const listFor = (() => { const i = process.argv.indexOf('--list'); return i > -1 ? process.argv[i + 1] : null; })();
const units = JSON.parse(fs.readFileSync(pathFor(dom), 'utf8'));
const tab = {};
for (const u of units) {
  const c = (u.coding || {})[field];
  if (!c) continue;
  for (const r of (Array.isArray(c) ? c : [c])) {
    const va = Array.isArray(r[a]) ? r[a].join('+') : r[a], vb = Array.isArray(r[b]) ? r[b].join('+') : r[b];
    const k = String(va) + '  ||  ' + String(vb);
    tab[k] = (tab[k] || 0) + 1;
    if (listFor && String(va) === listFor) console.log('   ' + (u.countryCode + '|' + u.unitName).padEnd(34) + String(vb));
  }
}
for (const [k, n] of Object.entries(tab).sort((x, y) => y[1] - x[1])) console.log(String(n).padStart(5) + '  ' + k);
