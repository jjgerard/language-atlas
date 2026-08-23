// Injects bundle.json into template.html and writes the standalone page.
const fs = require('fs');
const OUT = process.argv[2];
const tpl = fs.readFileSync('template.html', 'utf8');
// Escape "<" so no field text can close the <script type="application/json"> tag.
const json = fs.readFileSync('bundle.json', 'utf8').replace(/</g, '\u003c');
fs.writeFileSync(OUT, tpl.replace('__BUNDLE__', () => json));
console.log(OUT, (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB');
