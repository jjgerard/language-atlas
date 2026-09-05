// Shared writer for new atlas entries across the three maps.
//
//     const { apply, run } = require("./apply");
//     run({ eal: {...}, dld: {...}, fl: {...} });
//
// Same guards as everywhere else in this conversion: every bullet inside the
// panel's character budget, at most four points plus a hedge, nothing ending in
// punctuation, and nothing written at all if any entry breaks a rule. It also
// refuses to overwrite a field that already has text — these runs add to stubs,
// and silently replacing existing research is exactly the accident that cost a
// day earlier when a generator flattened Ireland's upper-secondary entry.
const fs = require("fs"), path = require("path");
const { NOT_DOCUMENTED_RE } = require(path.join(__dirname, "..", "..", "..", "src", "derive"));

const ATLAS = path.join(__dirname, "..", "..", "..");
// Domain data files are resolved by research/tools/datafile.js, which
// prefers the living snapshot and falls back to the seed. It replaced a
// hand-maintained map here that did not know about the `he` map and threw
// path.join(undefined) the moment one was reached.
const { fileFor } = require("../datafile");
const FILES = new Proxy({}, { get: (_, id) => fileFor(String(id)) });
const LIMIT = 96;
// Fields that are NOT bullet text. `policyHistory` is a list of
// {year, description}; the rest are series, languages, offerings, programmes.
//
// This was a hardcoded list of four field names, and a hardcoded list cannot
// know about a field that becomes typed later. `he.linguistics` did exactly
// that, and six units had their bullets joined with newlines and written into
// it as a STRING before anything noticed -- the failure this guard exists to
// prevent, walking straight past the guard.
//
// So it is derived from the domain declarations instead: any field whose
// declared type has a SHAPE is typed, on every domain, forever. Adding a
// domain or retyping a field stays a domains.js edit, which is the rule this
// repo works to.
const { DOMAINS } = require(path.join(ATLAS, "src", "domains"));
const { SHAPES } = require(path.join(ATLAS, "src", "store"));
const norm = x => String(x == null ? "" : x).toLowerCase().normalize("NFD")
  .replace(/[^a-z0-9]/g, "");

// Two passes over the same country describe the same degree differently. The
// Complutense bachelor arrived once as "Universidad Complutense de Madrid" /
// "Linguistica y Lenguas Aplicadas" and again as "Universidad Complutense de
// Madrid, Area de Linguistica General" / "Grado en Linguistica y Lenguas
// Aplicadas" -- one programme, and a raw string comparison calls them two.
//
// So identity drops what varies between descriptions and keeps what does not:
// the institution up to its first comma, which is the university rather than
// the faculty or department inside it, and the subject with its leading award
// word removed, which is carried by `level` anyway.
const instKey = x => norm(String(x == null ? "" : x).split(/,| with | and /i)[0]);
const AWARD = /^(?:grado|licenciatura|master|maestria|magister|doctorado|diplom|bachelor|masters?|doctorate|phd|ba|bs|ma|msc|mphil)\s*(?:universitario|interuniversitario|of arts|of science|in|en|de|em|di|i)?\s+/i;
const subjKey = x => {
  let t = String(x == null ? "" : x).normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (let i = 0; i < 2 && AWARD.test(t); i++) t = t.replace(AWARD, "");
  return norm(t);
};

const TYPED = {};
for (const d of DOMAINS)
  for (const [k, , type] of d.fields)
    if (SHAPES[type]) TYPED[k] = type;

function apply(domain, spec) {
  const FILE = path.join(ATLAS, "data", FILES[domain]);
  const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
  const problems = [];
  let touched = 0, filled = 0, bullets = 0, hist = 0, rows_ = 0, notEst = 0, slotted = 0;
  const upgrades = [];

  for (const [key, s] of Object.entries(spec)) {
    const [cc, name] = key.split("|");
    const e = rows.find(r => r.countryCode === cc && r.unitName === name);
    if (!e) { problems.push(`${domain} ${key}: no such entry`); continue; }
    for (const [f, set] of Object.entries(s.fields || {})) {
      // A typed field written as bullets is silently destructive: `fields`
      // joins its array with a newline, so policyHistory becomes a STRING
      // where the renderer and every consumer expect an array of
      // {year, description}.
      // Suriname reached the committed data that way and read back as ~190
      // rows, one per character. Caught here rather than in a QA sweep.
      if (TYPED[f]) problems.push(`${domain} ${key}/${f}: is a ${TYPED[f]} field — pass it as \`${TYPED[f]}\`, not \`fields\``);
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      // A field holding the not-established sentinel is NOT written content in
      // the sense this guard protects. It is a record that someone looked and
      // found nothing, and the whole point of it is to be superseded when
      // evidence turns up. Treating it as untouchable made an absence finding
      // permanent: Timor-Leste's serviceModel was marked not established from
      // the 2008 Lei de Bases, and when Lei 4/2026 replaced that statute the
      // pipeline had no way to record the provision it creates.
      //
      // So a sentinel value may be UPGRADED to documented content. Real prose
      // still may not be overwritten -- that needs a person, because it means
      // someone's sourced work is wrong rather than merely missing.
      const prior = String(e[f] || "").trim();
      if (prior && !NOT_DOCUMENTED_RE.test(prior)) problems.push(`${domain} ${key}/${f}: would overwrite`);
      else if (prior) upgrades.push(`${domain} ${key}/${f}`);
      set.forEach(b => {
        if (b.length > LIMIT) problems.push(`${domain} ${key}/${f}: ${b.length} chars — "${b.slice(0, 55)}…"`);
        // A bullet must not end in sentence punctuation -- but an ABBREVIATION
        // that happens to fall last legitimately ends in a full stop, and the
        // flat test could not tell the two apart. "By 2030 the minimum degree
        // qualification for teaching will be a four-year integrated B.Ed." was
        // rejected for the period in B.Ed., and the only ways to satisfy the
        // rule were to misspell the qualification or to reword a sourced
        // bullet away from what its evidence says.
        //
        // So a trailing stop is allowed only where it closes a dotted
        // abbreviation -- B.Ed., Ph.D., M.A., B.A. -- and nothing else changes:
        // a sentence-final stop, and any trailing semicolon, still fail.
        const endsAbbrev = /\b[A-Za-z](?:\.[A-Za-z]{1,4})+\.$/.test(b);
        if (/;$/.test(b) || (/\.$/.test(b) && !endsAbbrev))
          problems.push(`${domain} ${key}/${f}: ends with punctuation`);
      });
      if (set.length > 5) problems.push(`${domain} ${key}/${f}: ${set.length} bullets`);
    }
    // A field where the researcher looked and found nothing is the map's third
    // state, not coverage: derive.js only recognises it by the exact opening
    // phrase "Not established from the sources consulted", and only in free
    // text. Written as bullets it would trip the length guard and, worse, would
    // count as documented -- which is how a coverage figure quietly stops
    // meaning anything. So these bypass the bullet rules and are checked for the
    // sentinel instead.
    for (const [f, prose] of Object.entries(s.notEstablished || {})) {
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      // A typed field cannot hold the phrase; its flag lives on the entry
      // instead (see derive.js typedNotEstablished). Rows are the thing that
      // must not be overwritten there.
      if (Array.isArray(e[f])) { if (e[f].length) problems.push(`${domain} ${key}/${f}: would overwrite ${e[f].length} row(s)`); }
      else if (String(e[f] || "").trim()) problems.push(`${domain} ${key}/${f}: would overwrite`);
      if (!/^Not established from the sources consulted/i.test(prose))
        problems.push(`${domain} ${key}/${f}: not-established text must open with the sentinel phrase`);
    }
    // Series fields ('uptake', 'newcomerProportion', 'identifiedPrevalence') are
    // arrays of {year, value, note}, not bullet text. Joining an array with "\n"
    // the way a text field is joined would silently write "[object Object]", so
    // they are validated and assigned separately rather than shoehorned in.
    for (const [f, arr] of Object.entries(s.series || {})) {
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      if (Array.isArray(e[f]) && e[f].length) problems.push(`${domain} ${key}/${f}: would overwrite`);
      if (!Array.isArray(arr)) { problems.push(`${domain} ${key}/${f}: series must be an array`); continue; }
      arr.forEach(r => {
        if (!r || !r.year || !r.value) problems.push(`${domain} ${key}/${f}: row needs year and value`);
        // A figure with no source is not a figure. Every row carries its note.
        if (r && !r.note) problems.push(`${domain} ${key}/${f}: row ${r.year} has no note`);
      });
    }
    // `languages` is a typed record like series and history, but its rows carry
    // identifiers rather than dates, and a row claiming a WALS code that WALS
    // does not hold would put a link to the wrong language on the map.
    for (const [f, arr] of Object.entries(s.languages || {})) {
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      if (Array.isArray(e[f]) && e[f].length) problems.push(`${domain} ${key}/${f}: would overwrite`);
      if (!Array.isArray(arr)) { problems.push(`${domain} ${key}/${f}: languages must be an array`); continue; }
      arr.forEach(r => {
        if (!r || !r.name) problems.push(`${domain} ${key}/${f}: a row has no name`);
        // An empty code is fine and means WALS has no record. A code that is
        // not three-to-twelve lowercase characters is not a WALS code at all.
        if (r && r.wals && !/^[a-z0-9-]{2,20}$/.test(r.wals)) problems.push(`${domain} ${key}/${f}: "${r.wals}" is not a WALS code`);
      });
    }
    // Offerings are the language-keyed rows: one per language, naming the
    // institution where that is known and linking the programme. `level` is
    // checked against a fixed vocabulary because the whole value of the field
    // is that a certificate is not a bachelor; a free-text level would make
    // 'is this a degree' unanswerable again.
    const LEVELS = new Set(['bachelor','master','doctorate','degree','diploma','certificate','minor','module']);
    for (const [f, arr] of Object.entries(s.offerings || {})) {
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      if (Array.isArray(e[f]) && e[f].length) problems.push(`${domain} ${key}/${f}: would overwrite`);
      if (!Array.isArray(arr)) { problems.push(`${domain} ${key}/${f}: offerings must be an array`); continue; }
      arr.forEach(r => {
        if (!r || !r.language) { problems.push(`${domain} ${key}/${f}: a row has no language`); return; }
        if (r.level && !LEVELS.has(String(r.level).toLowerCase()))
          problems.push(`${domain} ${key}/${f}: "${r.level}" is not a level`);
        if (r.institutions && !/^[0-9]+$/.test(String(r.institutions)))
          problems.push(`${domain} ${key}/${f}: institutions "${r.institutions}" is not a count`);
        if (r.url && !/^https?:[/][/]/i.test(r.url))
          problems.push(`${domain} ${key}/${f}: url is not http(s)`);
      });
    }

    // Programme rows: the same checks as offerings, keyed by subject rather
    // than language, plus the one field offerings has no analogue for.
    // `orientation` is a CLOSED vocabulary on purpose. It is the field most
    // open to being filled from impression -- a reader can always form a view
    // of which way a department leans -- and the whole value of it is that it
    // records the department's own words. Anything outside the vocabulary is
    // a judgement, and a judgement does not belong in a typed cell.
    const ORIENT = new Set(['generative', 'usage-based', 'usage based', 'functional', 'formal']);
    for (const [f, arr] of Object.entries(s.programme || {})) {
      if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`${domain} ${key}: no field ${f}`);
      if (!Array.isArray(arr)) { problems.push(`${domain} ${key}/${f}: programme must be an array`); continue; }
      arr.forEach(r => {
        if (!r || !r.subject) { problems.push(`${domain} ${key}/${f}: a row has no subject`); return; }
        if (r.level && !LEVELS.has(String(r.level).toLowerCase()))
          problems.push(`${domain} ${key}/${f}: "${r.level}" is not a level`);
        if (r.institutions && !/^[0-9]+$/.test(String(r.institutions)))
          problems.push(`${domain} ${key}/${f}: institutions "${r.institutions}" is not a count`);
        if (r.url && !/^https?:[/][/]/i.test(r.url))
          problems.push(`${domain} ${key}/${f}: url is not http(s)`);
        if (r.orientation && !ORIENT.has(String(r.orientation).toLowerCase()))
          problems.push(`${domain} ${key}/${f}: "${r.orientation}" is not an orientation`);
        // A row with neither an institution nor a count answers neither
        // "which institutions" nor "how many", which are the two questions
        // this field exists for.
        if (!r.institution && !r.institutions)
          problems.push(`${domain} ${key}/${f}: a row names neither an institution nor a count`);
      });
    }

    const sup = new Set((e.supportLinks || []).map(l => l.url));
    [...(s.docLinks || []), ...(s.addDocLinks || [])]
      .forEach(l => { if (sup.has(l.url)) problems.push(`${domain} ${key}: ${l.url} is a supportLink`); });
  }
  // An upgrade replaces a published statement that nothing was found. Say so.
  if (upgrades.length) {
    console.log(`${domain}: ${upgrades.length} field(s) UPGRADED from not-established to documented`);
    upgrades.forEach(u => console.log(`  ${u}`));
  }
  if (problems.length) {
    console.log(`${domain}: ${problems.length} PROBLEMS`);
    problems.forEach(p => console.log("  " + p));
    return null;
  }

  for (const [key, s] of Object.entries(spec)) {
    const [cc, name] = key.split("|");
    const e = rows.find(r => r.countryCode === cc && r.unitName === name);
    // Rows arriving on a typed field UPGRADE any not-established flag it
    // carried, the same way documented prose upgrades a prose sentinel.
    const unflag = f => { if (e.notEstablished && e.notEstablished[f]) delete e.notEstablished[f]; };
    for (const [f, set] of Object.entries(s.fields || {})) { e[f] = set.join("\n"); filled++; bullets += set.length; }
    // Slot numbers arrive alongside the bullets they describe, one per bullet.
    // Written only for a field this spec actually filled, so a stale list can
    // never number another field's text; store.js re-validates on the way in.
    for (const [f, list] of Object.entries(s.slots || {})) {
      if (!s.fields || !s.fields[f] || !Array.isArray(list)) continue;
      if (list.length !== s.fields[f].length) {
        console.log('  ' + domain + ' ' + key + '/' + f + ': ' + list.length +
          ' slot(s) for ' + s.fields[f].length + ' bullet(s), dropped');
        continue;
      }
      e.slots = e.slots || {};
      e.slots[f] = list.map(Number);
      slotted++;
    }
    for (const [f, arr] of Object.entries(s.series || {})) { e[f] = arr; unflag(f); filled++; rows_ += arr.length; }
    for (const [f, arr] of Object.entries(s.languages || {})) { e[f] = arr; unflag(f); filled++; rows_ += arr.length; }
    for (const [f, arr] of Object.entries(s.offerings || {})) { e[f] = arr; unflag(f); filled++; rows_ += arr.length; }
    // A programme list is a CATALOGUE, not a statement: it is never complete,
    // and the next pass over a country finds the degrees the last one missed.
    // Replacing it wholesale is how Spain's two Complutense rows would have
    // been thrown away to write four; refusing the write, which is what the
    // old guard did, is how the two new ones -- an interuniversity master's
    // and a Barcelona degree -- would have been thrown away to keep the two.
    //
    // So merge, exactly as policyHistory already merges: existing rows are
    // never touched, and a new row is added only if nothing with its identity
    // is there already. Identity is the institution, level and subject
    // together, because one institution can run a bachelor and a doctorate in
    // the same subject and two different master's in different ones.
    for (const [f, arr] of Object.entries(s.programme || {})) {
      const sig = r => [instKey(r.institution), norm(r.level), subjKey(r.subject)].join("|");
      const have = new Set((Array.isArray(e[f]) ? e[f] : []).map(sig));
      const fresh = arr.filter(r => { const k = sig(r); if (have.has(k)) return false; have.add(k); return true; });
      const dupes = arr.length - fresh.length;
      if (dupes) console.log(`  ${domain} ${key}/${f}: ${dupes} row(s) already present`);
      if (!fresh.length) continue;
      e[f] = [...(Array.isArray(e[f]) ? e[f] : []), ...fresh];
      unflag(f); filled++; rows_ += fresh.length;
    }
    for (const [f, prose] of Object.entries(s.notEstablished || {})) {
      if (Array.isArray(e[f])) { e.notEstablished = e.notEstablished || {}; e.notEstablished[f] = prose; }
      else e[f] = prose;
      notEst++;
    }
    if (s.history) { e.policyHistory = s.history; hist += s.history.length; }
    if (s.docLinks) e.docLinks = s.docLinks;
    // Deduped on the url. This was a plain concat, and terr-apply builds
    // addDocLinks out of the evidence of every bullet it writes -- so a
    // source backing four bullets arrived four times, and a source already
    // cited on the entry arrived again on every later pass. That put 357
    // repeated citations on 211 dld entries in one session. It also inflates
    // the Sources page, which counts entry-slots and exists to report exactly
    // that number.
    if (s.addDocLinks) {
      const have = new Set((e.docLinks || []).map(l => l && l.url));
      const add = [];
      for (const l of s.addDocLinks) {
        if (!l || !l.url || have.has(l.url)) continue;
        have.add(l.url); add.push(l);
      }
      if (add.length) e.docLinks = [...(e.docLinks || []), ...add];
    }
    // Metadata belongs to the entry as a whole, so a pass that ADDS one field to
    // an already-documented entry must not rewrite it. Stamping confidence here
    // would have quietly downgraded 76 established entries to the tier of the
    // single field being added, and overwritten who documented them.
    // Only a stub is a stub. Testing `!== "partial"` swept in the 35 entries
    // marked "complete" — the fullest ones on the map — and overwrote their
    // provenance, including Ireland's, which was seeded from Meehan et al.
    // A "complete" entry must also not be demoted to "partial" for gaining a field.
    const wasStub = e.status === "stub";
    if (wasStub) {
      e.status = "partial";
      // 'official-document' where the instrument itself was read;
      // 'secondary-source' where a peer-reviewed account of it was. Both are
      // evidence — the field exists so a reader can tell which they are looking
      // at, and 47 of the DLD map's documented entries were already the second.
      e.confidence = s.confidence || "official-document";
      e.lastVerified = "2026-08";
      e.stubNote = "";
      e.by = s.by || (s.confidence === "secondary-source"
        ? "Seeded via AI-assisted deep research (2026), peer-reviewed sources read"
        : "Seeded via AI-assisted deep research (2026), primary sources verified");
    }
    touched++;
  }
  console.log(`${domain}: ${touched} entries, ${filled} fields, ${bullets} bullets, ${rows_} series rows, ${hist} history rows, ${notEst} marked not established, ${slotted} slot-tagged`);
  return { FILE, rows };
}

function run(specs) {
  const staged = [];
  for (const [domain, spec] of Object.entries(specs)) {
    if (!spec || !Object.keys(spec).length) continue;
    const out = apply(domain, spec);
    if (!out) process.exit(1);
    staged.push(out);
  }
  if (process.argv.includes("--write")) {
    staged.forEach(({ FILE, rows }) => {
      fs.writeFileSync(FILE, JSON.stringify(rows, null, 1) + "\n");
      console.log("  wrote " + path.basename(FILE));
    });
  }
}

module.exports = { apply, run, ATLAS, LIMIT };
