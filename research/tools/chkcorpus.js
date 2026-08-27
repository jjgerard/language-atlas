// Corpus verifier. Rather than mapping every citation to a file by URL shape --
// which breaks the moment a report writes "source: same" or names an act
// instead of a URL -- this searches every text file an agent banked and reports
// WHICH file each quoted passage lives in. A quote found nowhere in the corpus
// is the thing worth catching; a quote found in the wrong file still shows up,
// because the matching filename is printed.
const fs = require("fs"), path = require("path");
const [PARTS, GLOB, ...DIRS] = process.argv.slice(2);

const norm = s => s
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
  .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&")
  .replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/[\u2010-\u2015\u2212]/g, "-").replace(/\u00a0/g, " ")
  .replace(/[\u200b\u200c\u200d\ufeff\u00ad\f]/g, "")
  .replace(/\s+/g, " ").toLowerCase();
const ascii = s => s.replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim().toLowerCase();

// PDF text dumps break words across lines as "com- pulsory". Collapsing that
// hyphen-plus-space is the single largest source of false "missing quote"
// reports, and a false missing reads exactly like a fabricated quote.
// Reports legitimately elide with "..." and swap double quotes for single ones
// when nesting a quotation inside a quoted field. Neither changes whether the
// passage is real, so drop quote marks entirely and check each side of an
// elision separately. SPLIT ON ELISION
const unq = s => s.replace(/["']/g, "");
const frags = q => q.split(/\s*(?:\.\.\.|…)\s*/).map(x => x.trim()).filter(x => x.length > 20);
const dehy = s => s.replace(/(\w)-\s+(\w)/g, "$1$2");

const corpus = [];
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (/\.(txt|html|json)$/i.test(e.name)) corpus.push([p, norm(fs.readFileSync(p, "utf8"))]);
});
DIRS.forEach(walk);
console.log(`corpus: ${corpus.length} files\n`);

let bad = 0, weak = 0, n = 0;
for (const f of fs.readdirSync(PARTS).filter(x => new RegExp(GLOB).test(x))) {
  const lines = fs.readFileSync(path.join(PARTS, f), "utf8").split(/\r?\n/);
  let inEv = false, pending = null;
  for (const line of lines) {
    if (/^EVIDENCE:/.test(line)) { inEv = true; continue; }
    if (/^(DRAFT BULLETS|NEGATIVE|SOURCES)/.test(line)) { inEv = false; continue; }
    if (!inEv) continue;
    let m;
    if ((m = line.match(/^\s*quote:\s*"(.+)"\s*$/))) pending = m[1];
    else if (/^\s*source:/.test(line) && pending) {
      n++;
      const parts = frags(norm(pending));
      const probe = (fn, tag) => {
        const found = parts.map(fr => corpus.find(([, t]) => fn(t).includes(fn(fr))));
        return found.every(Boolean) ? [found[0], tag] : null;
      };
      let r = probe(t => t, "ok")
           || probe(t => unq(t), "ok-quotes")
           || probe(t => dehy(t), "ok-hyphen")
           || probe(t => ascii(unq(dehy(t))), "ok~");
      let hit = r && r[0], how = r ? r[1] : null;
      if (!hit) { bad++; console.log(`>>MISSING  ${f}  ${pending.slice(0, 60)}…`); }
      else if (how !== "ok") { weak++; console.log(`  ${how.padEnd(9)} ${f}  ${path.basename(hit[0])}`); }
      pending = null;
    }
  }
}
console.log(`\n${n} quotes, ${bad} NOT FOUND anywhere in the corpus, ${weak} matched only after dropping accents`);
