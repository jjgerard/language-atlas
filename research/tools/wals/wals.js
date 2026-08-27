// Resolve a language to its WALS record, deterministically.
//
//     node wals.js Inuktitut Welsh Guarani mri
//
// The point of this tool is that NO WALS URL IS EVER GUESSED. wals.info uses
// its own codes, which are not ISO 639-3 — Maori is `mao` in WALS and `mri` in
// ISO — so constructing a URL from an ISO code produces a plausible link to the
// wrong language, or to nothing. Every code here comes from WALS's own
// languages.csv, and a language that is not in it gets NO link rather than an
// invented one.
//
// Data: the WALS CLDF release, https://github.com/cldf-datasets/wals
// (Dryer & Haspelmath eds., WALS Online, Zenodo). Four files are used:
// languages.csv (identity and classification), parameters.csv (the features),
// codes.csv (what each feature value means) and values.csv (which value each
// language has).
const fs = require("fs");
const path = require("path");

const DIR = __dirname;

// The CLDF files are RFC4180 CSV: fields may be quoted and contain commas and
// escaped quotes. A split(",") here silently shifts every column after a
// language whose name contains a comma, which is exactly the class of bug that
// once turned Micronesia's 68 into 77 elsewhere in this project.
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const hdr = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(hdr.map((h, i) => [h, r[i] ?? ""])));
}

const load = f => parseCsv(fs.readFileSync(path.join(DIR, f), "utf8"));

const languages = load("languages.csv");
const parameters = load("parameters.csv");
const codes = load("codes.csv");

// The features worth showing a non-typologist. Chosen for legibility rather
// than coverage: basic word order, where the adjective sits, how much work the
// morphology does, and whether tone is contrastive.
const FEATURES = ["81A", "87A", "26A", "13A"];

const paramName = Object.fromEntries(parameters.map(p => [p.ID, p.Name]));
const codeName = Object.fromEntries(codes.map(c => [c.ID, c.Name]));

// values.csv is 4.6MB and most of it is features nobody here asked for, so it
// is filtered on the way in rather than held whole.
const wanted = new Set(FEATURES);
const valuesByLang = {};
for (const v of load("values.csv")) {
  if (!wanted.has(v.Parameter_ID)) continue;
  (valuesByLang[v.Language_ID] = valuesByLang[v.Language_ID] || {})[v.Parameter_ID] = v.Code_ID;
}

const norm = s => String(s || "").toLowerCase().replace(/[^a-z]/g, "");
const byIso = {}, byName = {}, byId = {};
for (const l of languages) {
  byId[l.ID] = l;
  if (l.ISO639P3code) (byIso[l.ISO639P3code] = byIso[l.ISO639P3code] || []).push(l);
  (byName[norm(l.Name)] = byName[norm(l.Name)] || []).push(l);
}

/** Look up by ISO 639-3, by WALS code, or by name. Returns every match.
 *
 * Three-letter queries are AMBIGUOUS BY CONSTRUCTION and this reports that
 * rather than choosing. WALS codes and ISO 639-3 codes share a namespace shape
 * and they collide: `mri` is Maori in ISO 639-3 and MORAORI, an unrelated
 * Papuan language, in WALS's own codes. Silently preferring one would link
 * Maori to Moraori and look entirely plausible doing it. */
function find(q) {
  const s = String(q || "").trim();
  if (!s) return [];
  const asWals = byId[s] ? [byId[s]] : [];
  const asIso = byIso[s] || [];
  if (asWals.length && asIso.length && asWals[0].ID !== asIso[0].ID) {
    return [
      { ...asWals[0], _collision: `WALS code ${s}` },
      ...asIso.map(l => ({ ...l, _collision: `ISO 639-3 ${s}` })),
    ];
  }
  // A three-letter query that matches ONLY a WALS code is the most dangerous
  // case there is, and the earlier collision check did not catch it because it
  // needed BOTH sides to exist.
  //
  // Tlicho's ISO 639-3 code is `dgr`. WALS does not carry Tlicho at all. But
  // `dgr` IS WALS's own code for DAGUR, a Mongolic language of China — so
  // looking up the Dene language of the Northwest Territories by its correct
  // ISO code returned Dagur, with a family, a word order and a working link,
  // and nothing anywhere said it was the wrong language.
  //
  // So: if the query looks like a language code and nothing in WALS carries it
  // as an ISO code, say so. The record may still be what the caller wanted —
  // plenty of WALS codes are also that language's ISO code — but it must be
  // checked rather than assumed.
  if (asWals.length) {
    const looksLikeCode = /^[a-z]{3}$/.test(s);
    if (looksLikeCode && !asIso.length) {
      return [{ ...asWals[0], _codePathOnly: true }];
    }
    return asWals;
  }
  if (asIso.length) return asIso;
  const n = norm(s);
  if (byName[n]) return byName[n];
  // Last resort: a WALS name that EXTENDS the query, so "Inuktitut" finds
  // "Inuktitut (Eastern Canadian)". Reported as partial, never silently.
  //
  // The reverse direction is deliberately NOT allowed. Letting a shorter WALS
  // name swallow a longer query matched "Tamazight" to "Tama" — an Eastern
  // Sudanic language of Chad with no relation to Amazigh — and it looked
  // entirely convincing, with a family, a word order and a working link. The
  // four-character floor stops two- and three-letter names doing the same.
  if (n.length < 4) return [];
  const near = languages.filter(l => norm(l.Name).startsWith(n));
  return near.map(l => ({ ...l, _partial: true }));
}

function describe(l) {
  const feats = valuesByLang[l.ID] || {};
  const typology = FEATURES
    .filter(f => feats[f])
    .map(f => `${paramName[f]}: ${codeName[feats[f]]}`);
  return {
    name: l.Name,
    wals: l.ID,
    // WALS has TWO languoid URL shapes and the wrong one 404s. Individual
    // lects live at /languoid/lect/wals_code_<id>; the genus-level records,
    // whose IDs begin "genus-", live at /languoid/genus/<name> and return 404
    // on the lect path. Verified against wals.info: genus/berber is "WALS
    // Online - Genus Berber, Family: Afro-Asiatic".
    url: /^genus-/.test(l.ID)
      ? `https://wals.info/languoid/genus/${l.ID.replace(/^genus-/, "")}`
      : `https://wals.info/languoid/lect/wals_code_${l.ID}`,
    isGenus: /^genus-/.test(l.ID),
    iso: l.ISO639P3code || "",
    glottocode: l.Glottocode || "",
    family: l.Family || "",
    subfamily: l.Subfamily || "",
    genus: l.Genus || "",
    typology,
    partial: !!l._partial,
    collision: l._collision || "",
    codePathOnly: !!l._codePathOnly,
  };
}

module.exports = { find, describe, languages, FEATURES };

if (require.main === module) {
  const qs = process.argv.slice(2);
  if (!qs.length) {
    console.log(`${languages.length} WALS languages loaded; features: ${FEATURES.map(f => f + " " + paramName[f]).join(" | ")}`);
    process.exit(0);
  }
  for (const q of qs) {
    const hits = find(q);
    if (!hits.length) { console.log(`\n${q}: NO WALS RECORD — do not link it`); continue; }
    for (const h of hits.slice(0, 4)) {
      const d = describe(h);
      const flag = d.collision ? `  (AMBIGUOUS: this is the match for ${d.collision})`
        : d.codePathOnly ? `  (MATCHED ON WALS CODE "${q}", NOT ON ISO. Nothing in WALS carries that ISO code, so this may be a DIFFERENT language.)`
        : d.partial ? "  (PARTIAL NAME MATCH, check before use)" : "";
      console.log(`\n${q} -> ${d.name}${flag}`);
      console.log(`  wals ${d.wals}   iso ${d.iso || "-"}   glotto ${d.glottocode || "-"}`);
      console.log(`  ${[d.family, d.subfamily, d.genus].filter(Boolean).join(" > ")}`);
      d.typology.forEach(t => console.log(`  ${t}`));
      console.log(`  ${d.url}`);
    }
    if (hits.length > 4) console.log(`  ...and ${hits.length - 4} more matches`);
  }
}
