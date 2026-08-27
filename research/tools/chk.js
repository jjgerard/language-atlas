// Verify that a quoted passage really occurs in a retrieved file.
// Whitespace in PDFs and HTML is unreliable, so both haystack and needle are
// collapsed to single spaces and lowercased before comparison. HTML is stripped
// of tags and entity-decoded first, so a quote broken across markup still
// matches -- PEER routinely puts an <a href> in the middle of a sentence.
const fs = require("fs");

// Tag-stripping must apply ONLY to real HTML. Run it over a PDF text dump and a
// stray "<" (from "p < .05", a math expression, a bullet glyph) matches through
// to the next ">", silently deleting everything between -- which shows up as a
// quote that "isn't there" when it is. Sniff the file first.
const looksHtml = s => /<\/?(html|body|div|p|span|head|meta|table|a)\b/i.test(s.slice(0, 4000));

// Every invisible character is written as an escape, never as the literal
// glyph. A zero-width space pasted into this source is unreviewable and one
// stray one inside a character class silently changes what gets deleted.
const norm = s => (looksHtml(s) ? s
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ") : s)
  .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&")
  .replace(/&quot;|&#34;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
  .replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"')
  .replace(/[‐-―−]/g, "-").replace(/ /g, " ")
  // UNESCO's PEER pages carry zero-width spaces mid-sentence. One sitting
  // inside a quoted span fails an otherwise exact match, which then reads as a
  // fabricated quote when it is nothing of the kind.
  .replace(/[​‌‍﻿­]/g, "")
  .replace(/\s+/g, " ").toLowerCase();

// Some official PDFs carry a broken font encoding. Algeria's Journal Officiel
// extracts as "dispensE / tous" where the page reads "dispense a tous" with
// accents: the letters are right and only the accented ones are mis-mapped. A
// match after dropping every non-ASCII character is therefore real evidence,
// but weaker than an exact one, so it is reported separately rather than
// counted as a clean pass. The length floor keeps it honest -- a short needle
// could survive accent-stripping by coincidence, a long one could not.
const ascii = s => s.replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

const checks = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const cache = {};
let bad = 0, weak = 0;
for (const [file, label, needle] of checks) {
  if (!(file in cache)) cache[file] = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  const raw = cache[file];
  let ok;
  if (raw === null) ok = "NO FILE";
  else if (norm(raw).includes(norm(needle))) ok = "ok";
  else if (ascii(norm(raw)).includes(ascii(needle)) && ascii(needle).length > 25) ok = "ascii";
  else ok = "MISSING";
  if (ok === "MISSING" || ok === "NO FILE") bad++;
  if (ok === "ascii") weak++;
  const tag = ok === "ok" ? "  ok  " : ok === "ascii" ? " ok~  " : ">>" + ok.padEnd(8, "<");
  console.log(`${tag} ${label}${ok === "ascii" ? "   (matched after dropping mis-encoded accents)" : ""}`);
}
const note = weak ? ` (${weak} via accent-stripping)` : "";
console.log(bad ? `\n${bad} of ${checks.length} NOT VERIFIED${note}` : `\nall ${checks.length} verified${note}`);
