// Turn gate-verified language NAMES into `languages` rows on the indigenous map.
//
//     node lang-from-verified.js <verified.json>            # dry run
//     node lang-from-verified.js <verified.json> --write
//
// The drafting agents are forbidden to write a WALS code, an ISO code, a
// family, a genus or a typology. They supply a NAME and a quote proving an
// instrument names it, terr-verify re-fetches the page and keeps only the
// names whose quote is really there, and this fills in the rest from WALS.
// That split exists because a hand-written code is the worst error this map
// can carry: Maori is `mao` in WALS and `mri` in ISO, and `mri` in WALS is
// Moraori, so a code copied from the wrong column silently files a language
// under another language's family.
//
// RESOLUTION follows rows.js exactly, because rows.js earned its rules:
//
//   one unambiguous hit  -> full row
//   no hit               -> row with the name only, no link. NOT an error:
//                           WALS names things its own way ("Scottish Gaelic"
//                           is "Gaelic (Scots)"), so the ISO code is tried
//                           before giving up, and an unlinked row is the
//                           honest outcome when even that fails.
//   several candidates   -> row with the name only, and a REPORT line. rows.js
//                           refuses to write these at all, which is right for
//                           a human at a prompt; here it would silently drop a
//                           language an instrument actually names. The claim
//                           "this system engages with X" is sourced and stands;
//                           only the classification is withheld.
//   WALS-code-only match -> row with the name only. Nothing in WALS carries it
//                           as an ISO code, so it is probably another language.
//
// A name is looked up whole, then without its parenthetical gloss, then by the
// gloss alone -- instruments write "Quechua (Runasimi)" and WALS does not.
const fs = require("fs");
const path = require("path");
const { find, describe } = require("./wals/wals");
const { pathFor } = require("./datafile");

const NL = String.fromCharCode(10);
const file = process.argv[2];
const write = process.argv.includes("--write");
if (!file) { console.log("usage: node lang-from-verified.js <verified.json> [--write]"); process.exit(1); }

const SHORTEN = t => t
  .replace(/^Order of Subject, Object and Verb: /, "Word order ")
  .replace(/^Order of Adjective and Noun: /, "")
  .replace(/^Prefixing vs\. Suffixing in Inflectional Morphology: /, "")
  .replace(/^Tone: /, "");

/** Every string worth trying for one instrument-written name, best first. */
function candidates(name) {
  const out = [name];
  const m = name.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
  if (m) { out.push(m[1].trim()); out.push(m[2].trim()); }
  return out.filter((s, i, a) => s && a.indexOf(s) === i);
}

function resolve(name) {
  for (const q of candidates(name)) {
    const hits = find(q);
    if (!hits.length) continue;
    const exact = hits.filter(h => !h._partial && !h._collision && !h._codePathOnly);
    if (exact.length === 1) {
      const d = describe(exact[0]);
      return { row: {
        name, wals: d.wals, iso: d.iso,
        family: [d.family, d.subfamily].filter(Boolean).join(" > "),
        genus: d.genus,
        typology: d.typology.map(SHORTEN).join("; "),
      }, note: null };
    }
    if (exact.length > 1) return { row: bare(name), note:
      name + ": " + exact.length + " WALS candidates, written unlinked. Pick one: " +
      exact.slice(0, 6).map(h => { const d = describe(h); return d.name + " [wals " + d.wals + ", iso " + (d.iso || "-") + "]"; }).join("; ") };
    if (hits.length === 1 && hits[0]._codePathOnly) {
      const d = describe(hits[0]);
      return { row: bare(name), note:
        name + ": matched the WALS CODE only, which is \"" + d.name + "\". Nothing in WALS carries it as an ISO code, so it is probably a different language. Written unlinked." };
    }
    return { row: bare(name), note:
      name + ": only partial or colliding matches (" + hits.slice(0, 4).map(h => describe(h).name).join(", ") + "). Written unlinked." };
  }
  return { row: bare(name), note: name + ": no WALS record on any spelling tried. Written unlinked, which is correct if WALS simply does not carry it." };
}

const bare = name => ({ name, wals: "", iso: "", family: "", genus: "", typology: "" });

const verified = JSON.parse(fs.readFileSync(file, "utf8"));
const dataPath = pathFor("indigenous");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const byKey = new Map(data.map(e => [e.countryCode + "|" + e.unitName, e]));

let units = 0, rows = 0, linked = 0, unlinked = 0, skipped = 0, addedLinks = 0;
const notes = [], refusals = [];

for (const [key, v] of Object.entries(verified)) {
  const names = v.fields && v.fields.languages;
  if (!names || !names.length) continue;
  const e = byKey.get(key);
  if (!e) { refusals.push(key + ": unit not in data/indigenous"); skipped++; continue; }
  // The same refusal every applier here makes: written content is never
  // overwritten by a pass the writer did not see.
  if (Array.isArray(e.languages) && e.languages.length) {
    refusals.push(key + ": already carries " + e.languages.length + " language row(s), left alone");
    skipped++; continue;
  }

  const out = [];
  for (const n of names) {
    const r = resolve(n);
    if (r.note) { notes.push("  " + key + " " + r.note); }
    if (r.row.wals) linked++; else unlinked++;
    out.push(r.row);
    rows++;
  }
  units++;
  if (write) {
    e.languages = out;
    const have = new Set((e.docLinks || []).map(l => l.url));
    e.docLinks = e.docLinks || [];
    for (const ev of (v.evidence || [])) {
      if (ev && ev.url && !have.has(ev.url)) {
        e.docLinks.push({ label: ev.label || ev.bullet || ev.url, url: ev.url });
        have.add(ev.url); addedLinks++;
      }
    }
  }
}

console.log((write ? "WROTE " : "DRY RUN ") + units + " units, " + rows + " rows: " +
  linked + " resolved against WALS, " + unlinked + " written unlinked");
if (addedLinks) console.log("  " + addedLinks + " docLinks added from evidence");
if (skipped) console.log("  " + skipped + " unit(s) skipped");
refusals.forEach(r => console.log("  " + r));
if (notes.length) {
  console.log(NL + "---- names WALS could not settle (" + notes.length + ") ----");
  notes.forEach(n => console.log(n));
}
if (write) { fs.writeFileSync(dataPath, JSON.stringify(data, null, 1) + NL); console.log(NL + "wrote " + path.basename(dataPath)); }
else console.log(NL + "(dry run - pass --write)");
