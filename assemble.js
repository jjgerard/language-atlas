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
  'sources.html': 'sources.html',
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

// The favicon is injected here rather than pasted into six page heads, so
// there is one place to change it and no page can drift. It goes in after the
// stylesheet link, which every page has.
//
// Three declarations, because browsers disagree. The SVG is the real mark and
// is what modern browsers take; the 32px PNG covers the ones that still refuse
// SVG favicons; apple-touch-icon is what iOS uses when a page is saved to the
// home screen, and without it iOS screenshots the page instead.
const FAVICON = [
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
].join(String.fromCharCode(10));
const ANCHOR = '<link rel="stylesheet" href="/shared.css">';

fs.mkdirSync(OUT, { recursive: true });
for (const [from, to] of Object.entries(PAGES)) {
  const dest = path.join(OUT, to);
  let src = fs.readFileSync(path.join(SRC, from), 'utf8');
  if (!src.includes(ANCHOR)) throw new Error(`${from}: no stylesheet link to anchor the favicon to`);
  src = src.replace(ANCHOR, ANCHOR + String.fromCharCode(10) + FAVICON);
  fs.writeFileSync(dest, src.split('__GEOMETRY_HASH__').join(geometryHash));
  console.log('  public/' + to, (fs.statSync(dest).size / 1024).toFixed(0) + ' KB');
}
console.log('  geometry hash', geometryHash);
