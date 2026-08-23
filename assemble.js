// Copies each page source into public/. Page data is fetched at runtime, so
// this is a plain copy, kept as its own build step so `npm run build` stays
// one command.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'pages');
const OUT = path.join(__dirname, 'public');
const PAGES = { 'home.html': 'index.html', 'map.html': 'map.html', 'about.html': 'about.html' };

fs.mkdirSync(OUT, { recursive: true });
for (const [from, to] of Object.entries(PAGES)) {
  const dest = path.join(OUT, to);
  fs.copyFileSync(path.join(SRC, from), dest);
  console.log('  public/' + to, (fs.statSync(dest).size / 1024).toFixed(0) + ' KB');
}
