// Prototype for the trends terminology column: pull the actual local term out
// of the entry prose, with its English gloss where the prose gives one.
const fs = require("fs");

const Q = "[\"'\u2018\u2019\u201c\u201d]";

// 1. The generated awareness sentence: was "TERM" (Language; roughly "GLOSS").
const AWARENESS_RE = new RegExp(
  "was\\s+" + Q + "([^\"'\u2018\u2019\u201c\u201d]{2,80})" + Q +
  "\\s*\\(([^;)]+);\\s*roughly\\s+" + Q + "([^\"'\u2018\u2019\u201c\u201d]{2,120})" + Q,
  "i"
);

// 2. The FIRST quoted run, plus a parenthetical if one immediately follows it.
// Anchoring to the first quote matters: Ireland's entry names the retired term
// 'specific speech and language disorder' (SSLD) later in the same sentence,
// and a search for "quote followed by parenthesis" finds that one instead of
// the term actually in use.
const QUOTED_RE = new RegExp(
  Q + "([^\"'\u2018\u2019\u201c\u201d]{2,80})" + Q + "(?:\\s*\\(([^)]{2,120})\\))?",
  ""
);

// 4. "TOS — taalontwikkelingsstoornis — is the standard term".
const DASH_RE = /^([A-Z]{2,6})\s+[—–]\s+([^—–]{3,60})\s+[—–]/;

const isAcronym = t => /^[A-Z0-9.\s]+$/.test(t.trim());

function extractTerm(text) {
  const t = String(text || "").trim();
  if (!t) return null;

  let m = t.match(AWARENESS_RE);
  if (m) {
    const term = m[1].trim(), lang = m[2].trim(), gloss = m[3].trim();
    // The English-language rows have no translation to give — Malta's "gloss"
    // is a note about the survey, not a rendering of the term.
    if (/^english$/i.test(lang)) return { term, gloss: null };
    return { term, gloss };
  }

  m = t.match(DASH_RE);
  if (m) return { term: m[1].trim(), gloss: m[2].trim() };

  m = t.match(QUOTED_RE);
  if (m) {
    const term = m[1].trim();
    if (!m[2]) return { term, gloss: null };
    // Take the gloss up to its first comma, and drop it when it is just an
    // acronym for the same term ("'Developmental language disorder' (DLD)").
    const gloss = m[2].split(",")[0].trim();
    const useful = !isAcronym(gloss) && gloss.split(/\s+/).length > 1;
    return { term, gloss: useful ? gloss : null };
  }

  return null;
}

const seed = JSON.parse(fs.readFileSync("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json", "utf8")).S;
const NOT = /^Not established from the sources consulted/i;
const has = v => { const t = (v || "").trim(); return !!t && !NOT.test(t); };

let ok = 0, miss = 0;
for (const e of seed.filter(x => has(x.terminology))) {
  const r = extractTerm(e.terminology);
  if (!r) { miss++; console.log("MISS ".padEnd(6) + e.unitName); continue; }
  ok++;
  console.log(e.unitName.padEnd(16) + "-> " + r.term + (r.gloss ? "  (" + r.gloss + ")" : ""));
}
console.log("\nextracted " + ok + ", missed " + miss);
