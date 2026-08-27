// Verify quotes when the report did not say which retrieved file each came from.
//
// chk.js answers "is this quote in THIS file?". This answers the weaker but
// still decisive question "is this quote anywhere in the corpus the agent
// retrieved?" — which is what catches a fabricated or mis-transcribed passage.
// A quote found in no file at all is the failure we care about; a quote found
// in the wrong file is a citation error, and is reported separately so it can
// be chased rather than silently accepted.
//
// Usage: node findquote.js <corpusDir> <partsDir> <filenameRegex>
const fs = require("fs"), path = require("path");

const looksHtml = s => /<\/?(html|body|div|p|span|head|meta|table|a)\b/i.test(s.slice(0, 4000));

const norm = s => (looksHtml(s) ? s
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ") : s)
  .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&")
  .replace(/&quot;|&#34;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
  .replace(/&sect;/gi, "§")
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[‐-―−]/g, "-").replace(/ /g, " ")
  .replace(/[​‌‍﻿­]/g, "")
  .replace(/\s+/g, " ").toLowerCase();

const [, , corpusDir, partsDir, fileRe] = process.argv;

// Load the corpus once. Text-bearing files only: a .pdf is skipped because the
// agent's own .txt extraction of it is what the quote was taken from.
const corpus = {};
for (const f of fs.readdirSync(corpusDir)) {
  if (/\.(pdf|png|jpg|zip|xlsx|bin|json)$/i.test(f)) continue;
  const p = path.join(corpusDir, f);
  try {
    if (fs.statSync(p).size > 40e6) continue;
    corpus[f] = norm(fs.readFileSync(p, "utf8"));
  } catch (e) { /* unreadable: not a corpus member */ }
}

let total = 0, found = 0;
const missing = [];
for (const pf of fs.readdirSync(partsDir).filter(f => new RegExp(fileRe).test(f))) {
  const text = fs.readFileSync(path.join(partsDir, pf), "utf8");
  // Quotes are written as `quote: "..."`, sometimes spanning several lines
  // until the next key. Grab everything between the first quote mark and the
  // last one on that logical block.
  const blocks = text.split(/^\s*(?=quote:)/m).slice(1);
  for (const b of blocks) {
    const m = b.match(/quote:\s*"([\s\S]*?)"\s*(?:\n\s*(?:source|note|field|-)|\n\s*\n|$)/);
    if (!m) continue;
    const needle = norm(m[1]);
    if (needle.length < 12) continue;
    total++;
    const hit = Object.keys(corpus).find(k => corpus[k].includes(needle));
    if (hit) found++;
    else missing.push([pf, m[1].replace(/\s+/g, " ").slice(0, 100)]);
  }
}

console.log(`${found} of ${total} quotes located in ${Object.keys(corpus).length} retrieved files`);
if (missing.length) {
  console.log(`\n${missing.length} NOT FOUND ANYWHERE IN CORPUS:`);
  for (const [f, q] of missing) console.log(`  ${f}: "${q}"`);
}
