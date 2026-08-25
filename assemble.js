// Copies each page source into public/. Page data is fetched at runtime, so
// this is close to a plain copy, kept as its own build step so `npm run build`
// stays one command.
//
// The one substitution is the geometry cache-buster. geometry.json is served
// with a 24-hour max-age because it is the big download and changes only when
// build-geometry.js runs — but it does change, and the first time it did (the
// jump from 21 sub-national units to 141) every returning visitor would have
// kept the old shapes for a day and seen a map missing every new state and
// province. Stamping the content hash into the URL keeps the long cache and
// makes it correct: a new file is a new URL.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = path.join(__dirname, 'pages');
const OUT = path.join(__dirname, 'public');
const PAGES = {
  'home.html': 'index.html',
  'map.html': 'map.html',
  'about.html': 'about.html',
  'patterns.html': 'patterns.html',
  'submit.html': 'submit.html',
  'admin.html': 'admin.html',
};

const GEOMETRY = path.join(OUT, 'geometry.json');
let geometryHash = 'dev';
if (fs.existsSync(GEOMETRY)) {
  geometryHash = crypto.createHash('sha1').update(fs.readFileSync(GEOMETRY)).digest('hex').slice(0, 10);
} else {
  console.warn('  geometry.json not built yet — cache-buster left as "dev"');
}

fs.mkdirSync(OUT, { recursive: true });
for (const [from, to] of Object.entries(PAGES)) {
  const dest = path.join(OUT, to);
  const src = fs.readFileSync(path.join(SRC, from), 'utf8');
  fs.writeFileSync(dest, src.split('__GEOMETRY_HASH__').join(geometryHash));
  console.log('  public/' + to, (fs.statSync(dest).size / 1024).toFixed(0) + ' KB');
}
console.log('  geometry hash', geometryHash);
