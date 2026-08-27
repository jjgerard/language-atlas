// "Is this quote anywhere in what the agents retrieved?"
//
// Read the failures carefully before believing them. Across a 1,117-quote run
// on wave 3, every single one that scored below 50% turned out to be benign,
// and the causes were three different things:
//
//   1. NOT A QUOTE. 9% of what this extracts under the `quote:` key is the
//      agent's own annotation — "TERM COUNTS: speech 0 ...", "Retrieved and
//      read in full ...". Those cannot match a corpus because they are not from
//      one. That is a reporting-format looseness, not a fabrication.
//   2. ACCENTS. An agent transcribing "enseñanza" as "ensenanza" once made a
//      verbatim Spanish quote unmatchable. Fixed below by folding rather than
//      stripping. The COMMITTED bullets keep their accents; this was only ever
//      a checker fault.
//   3. LOST BYTES. A source saved with the wrong encoding has already lost its
//      characters: Brazil's Lei Brasileira de Inclusão reads "comunica??o" on
//      disk. Folding cannot recover what is not there, so a quote from such a
//      file will always score low and has to be read by eye.
//
// fq3.js checks every quote against every file, which is O(quotes x files) and
// stopped finishing once the corpus passed a few hundred files. This flattens
// the corpus into one normalised blob and asks each quote once. It gives up
// knowing WHICH file a quote came from, which is a fair trade: the question
// that matters is whether a quote exists at all.
const fs = require("fs"), path = require("path");
const looksHtml = s => /<\/?(html|body|div|p|span|head|meta|table|a)\b/i.test(s.slice(0, 4000));
const norm = s => (looksHtml(s) ? s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ") : s)
  .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;|&#34;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
  .replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/[\u2010-\u2015\u2212]/g, "-").replace(/\u00a0/g, " ")
  .replace(/[\u200b\u200c\u200d\ufeff\u00ad]/g, "")
  // FOLD ACCENTS rather than delete them. Stripping non-ASCII turned
    // "ensenanza" (as an agent transcribed it) and "enseñanza" (as the source
    // reads) into "ensenanza" and "ense anza", so a verbatim Spanish quote
    // scored as missing. NFD splits a letter from its diacritic; dropping the
    // combining marks leaves the base letter, so both sides land on the same
    // ASCII. This is the same allowance chk.js already makes for Algeria's
    // mis-encoded Journal Officiel.
  .normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9'\-\s]/gi, " ").replace(/\s+/g, " ").toLowerCase();

const walk = d => fs.readdirSync(d, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

const [, , corpusDir, partsDir, fileRe] = process.argv;
let blob = [];
let files = 0;
for (const f of walk(corpusDir)) {
  if (/\.(pdf|png|jpg|jpeg|zip|xlsx|bin|docx|hwp)$/i.test(f)) continue;
  try { if (fs.statSync(f).size > 40e6) continue; blob.push(norm(fs.readFileSync(f, "utf8"))); files++; }
  catch (e) { /* unreadable */ }
}
const corpus = blob.join("\n");
blob = null;

const shingles = (t, n = 5) => { const w = t.split(" ").filter(Boolean); const o = []; for (let i = 0; i + n <= w.length; i++) o.push(w.slice(i, i + n).join(" ")); return o; };

let total = 0, strong = 0, weak = 0; const bad = [];
for (const pf of fs.readdirSync(partsDir).filter(f => new RegExp(fileRe).test(f))) {
  const text = fs.readFileSync(path.join(partsDir, pf), "utf8");
  for (const b of text.split(/^\s*(?=quote:)/m).slice(1)) {
    const m = b.match(/quote:\s*"([\s\S]*?)"\s*(?:\n\s*(?:source|note|field|-)|\n\s*\n|$)/);
    if (!m) continue;
    const sh = shingles(norm(m[1]));
    if (sh.length < 2) continue;
    total++;
    let hit = 0;
    for (const s of sh) if (corpus.includes(s)) hit++;
    const frac = hit / sh.length;
    if (frac >= 0.9) strong++; else if (frac >= 0.5) weak++;
    else bad.push([pf, (frac * 100).toFixed(0) + "%", m[1].replace(/\s+/g, " ").slice(0, 78)]);
  }
}
console.log(`${files} corpus files, ${(corpus.length / 1e6).toFixed(1)}MB normalised`);
console.log(`${total} quotes: ${strong} at >=90% of 5-word runs, ${weak} at 50-89%, ${bad.length} below 50%`);
if (bad.length) { console.log("\nBELOW 50% — inspect by hand:"); bad.slice(0, 25).forEach(([f, p, q]) => console.log(`  ${f} [${p}]: "${q}"`)); if (bad.length > 25) console.log(`  ...and ${bad.length - 25} more`); }
