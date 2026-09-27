// Document frequency of given words in one domain.field's texts, to see why a
// trigger word survived the screen's 12% corpus ceiling.
const fs = require('fs');
const { pathFor } = require('./datafile.js');
const [dom, field, ...ws] = process.argv.slice(2);
const units = JSON.parse(fs.readFileSync(pathFor(dom), 'utf8'));
let docs = 0; const df = {};
const words = s => String(s).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3);
for (const u of units) {
  const t = String(u[field] == null ? '' : u[field]);
  if (!t.trim()) continue;
  docs++;
  for (const w of new Set(words(t))) df[w] = (df[w] || 0) + 1;
}
console.log('docs with text: ' + docs + '   12% ceiling = ' + Math.max(3, Math.round(docs * 0.12)));
for (const w of ws) console.log('  ' + w.padEnd(22) + (df[w.toLowerCase()] || 0));
