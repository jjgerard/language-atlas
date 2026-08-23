// Copies the page source into public/. The data used to be inlined here; it is
// fetched at runtime now, so this is a straight copy kept as its own step so
// the build stays one command.
const fs = require('fs');
const path = require('path');

const out = process.argv[2] || path.join(__dirname, 'public', 'index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.copyFileSync(path.join(__dirname, 'template.html'), out);
console.log(out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
