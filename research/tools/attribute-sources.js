// Which of an entry's sources does a FIELD's text actually come from -- decided
// by reading the sources, not by matching their titles.
//
//     node research/tools/attribute-sources.js [--domain dld] [--limit 40] [--write]
//
// data/field-sources.json already holds what each fill wave recorded against a
// field. It covers about a fifth of the coded corpus, because the parts format
// post-dates most of the drafting. The panel's other route is matching the
// field's own words against source TITLES, which only fires where the text
// names something -- and the fields that most need attribution are exactly the
// ones that paraphrase. Northern Ireland's identificationCriteria says
// "assessment must seek parental, educational, medical, psychological and
// social advice" and names nothing at all, so fourteen sources sit under it and
// the reader is told which question they do NOT answer.
//
// That sentence is reg. 6 of the Education (Special Educational Needs)
// Regulations (Northern Ireland) 2005, near enough verbatim. Nothing infers
// that; the document says so. So this fetches each of the entry's sources,
// extracts its text, and asks which one the field's words are actually in.
//
// TWO RULES KEEP IT HONEST.
//
// 1. IT CHOOSES BETWEEN THE ENTRY'S OWN SOURCES rather than scoring each on its
//    own. A long special-needs statute contains most of the vocabulary of any
//    special-needs sentence, so an absolute threshold would attribute every
//    line to the longest document on the entry. A source is attributed only
//    where it beats the entry's other sources on the field's OWN wording by a
//    clear margin.
//
// 2. IT SCORES ON WHAT DISCRIMINATES. A word carried by most of the entry's
//    sources says nothing about which one was read; the words that matter are
//    the ones only some of them have. So each bullet's words are weighted by
//    how few of that entry's sources contain them, which is the same idea as
//    the label matcher's refusal to match on a place name.
//
// Fetching reuses terr-verify.js's client and folding rather than a second copy
// -- the curl fallback, --compressed, NFKD and \p{L} in there each cost a
// country to find. Pages are cached on disk, so a re-run costs nothing.
//
// IT FOLLOWS A LANDING PAGE TO THE DOCUMENT. England's SEND Code of Practice
// came back as 14,000 characters -- the GOV.UK publication page, not the
// 292-page Code -- so the document carrying "the end of the academic year in
// which the young person turns 25" was never read, and the field it backs
// could not be attributed to it. That is not a matching problem and no
// threshold fixes it. A short HTML page that links documents is read for those
// links, the best two are fetched, and their text is added to the page's own.
// Which document a link IS gets decided by the source's own label, so a page
// offering a Code and its annexes picks the Code.
//
// IT FETCHES FIRST AND SCORES AFTERWARDS. Fetching each entry's sources as that
// entry came up read the same PEER profile and the same COST survey dozens of
// times in a row and ran at 20 seconds an entry -- eight hours for the corpus,
// nearly all of it waiting. The distinct urls are collected up front and
// fetched in parallel; the scoring pass then touches no network at all.

const fs = require("fs");
const path = require("path");
const { get, getViaCurl, strip, fold, words } = require("./terr-verify.js");
const { pdfText } = require("./pdftext.js");

const root = path.join(__dirname, "..", "..");
const NL = String.fromCharCode(10);
const arg = n => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : null; };
const write = process.argv.includes("--write");
const onlyDomain = arg("--domain");
const explain = process.argv.includes("--explain");
const onlyUnit = arg("--only");          // "CC|Unit Name", for checking one entry
const limit = Number(arg("--limit") || 0) || Infinity;
// v2 because v1 holds landing pages for every url that turned out to be one,
// and there is no way to tell them apart after the fact: only the stripped text
// was kept, never the HTML the links were in.
const CACHE = arg("--cache") || path.join(root, ".source-cache", "v2");
const PAR = Number(arg("--par") || 8);
fs.mkdirSync(CACHE, { recursive: true });

const INDEX_FILE = path.join(root, "data", "field-sources.json");
const INDEX = JSON.parse(fs.readFileSync(INDEX_FILE, "utf8"));

// Words that are in every policy document ever written and discriminate nothing.
const STOP = new Set(("the a an and or of for in on at to by with from under where when this that " +
  "these those it its is are was were be been being has have had no not all any each one two " +
  "may must shall can will would should such other than then there their them they he she who " +
  "which what as if but so also more most only same both per etc via into out over after before " +
  "school schools education educational pupil pupils child children student students language " +
  "languages teaching taught teacher teachers provision support programme program national " +
  "state government ministry department policy act law order regulation regulations year years " +
  "grade grades primary secondary").split(" "));

const key = u => require("crypto").createHash("sha1").update(String(u)).digest("hex") + ".txt";

// What a cache file says when the url was fetched and yielded no text. A real
// NUL byte was used for this and made the whole tool grep as a binary file.
const UNREADABLE = "\u0000";

async function fetchOnce(url) {
  let res = await get(url, 0);
  if (!res || res.status !== 200 || !res.raw || !res.raw.length) res = getViaCurl(url) || res;
  if (!res || res.status !== 200 || !res.raw || !res.raw.length) return null;
  return res;
}

const isPdfRes = res => /pdf/i.test(res.type || "") || res.raw.slice(0, 5).toString("latin1") === "%PDF-";

function extractText(res) {
  try { return isPdfRes(res) ? pdfText(res.raw) : strip(res.body); } catch { return null; }
}

// A page that is mostly navigation around a download link. Above this much
// text the page IS the document and following its links would add noise.
const LANDING_MAX = 40000;
// England's SEND Code extracts to 8.5 MB, which is a 292-page document read by
// three extractors and is fine. Ten times that is not a document.
const TEXT_MAX = 12 * 1024 * 1024;
const DOCEXT = /\.(pdf|docx?|odt|rtf)(\?|#|$)/i;

/** Document links on a page, best first, judged against the source's own label. */
function documentLinks(html, base, label) {
  const want = new Set(fold(label || "").split(" ").filter(w => w.length > 3));
  const out = new Map();
  for (const m of String(html).matchAll(/<a\b[^>]*?href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    let href = m[1];
    if (/^(mailto:|javascript:|#)/i.test(href)) continue;
    try { href = new URL(href, base).href; } catch { continue; }
    const anchor = fold(strip(m[2]));
    // The href must BE a document. Trusting anchor text instead pulled a
    // 327 MB data export off the DfE's Explore Education Statistics page,
    // because the link said "Download" and meant a zip of csv.
    if (!DOCEXT.test(href)) continue;
    const hay = fold(href) + " " + anchor;
    let score = 3;
    for (const w of want) if (hay.includes(w)) score += 2;
    // GOV.UK and friends put the real file on an assets host.
    if (/assets\.|\/uploads\/|\/media\/|\/files?\//i.test(href)) score += 1;
    if (!out.has(href) || out.get(href) < score) out.set(href, score);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]).map(x => x[0]);
}

/** The source's text, from cache where possible. `null` where it cannot be read. */
async function textOf(url, label) {
  const file = path.join(CACHE, key(url));
  if (fs.existsSync(file)) {
    const t = fs.readFileSync(file, "utf8");
    return t === UNREADABLE ? null : t;
  }
  const res = await fetchOnce(url);
  let text = res ? extractText(res) : null;

  if (res && !isPdfRes(res) && (!text || text.length < LANDING_MAX)) {
    const cands = documentLinks(res.body, url, label).slice(0, 2);
    for (const c of cands) {
      const r2 = await fetchOnce(c);
      if (!r2) continue;
      const t2 = extractText(r2);
      // Only worth keeping if it is substantial: a 404 page reached through a
      // stale download link extracts to a few hundred characters and would sit
      // in the cache looking like the document.
      if (t2 && t2.length > 2000) text = (text || "") + " " + t2;
    }
  }

  if (text && text.length > TEXT_MAX) text = text.slice(0, TEXT_MAX);
  fs.writeFileSync(file, text && text.trim() ? text : UNREADABLE);
  return text && text.trim() ? text : null;
}

// ---- the entries that need attributing ------------------------------------
//
// EVERY LIVE MAP, AND EVERY FIELD WITH PROSE IN IT. Both of those used to be
// narrower, and both narrowings were accidents of the order the maps were
// built in rather than decisions:
//
// - The domain list was written out as ["dld", "eal", "indigenous"], so fl and
//   he could not be attributed however the flag was set -- `--domain he`
//   answered "0 entries need attribution", which reads like a finished job.
//   It is derived from src/domains.js now, so the next map added needs no edit
//   here. The file is resolved through datafile.js, which prefers the living
//   snapshot and falls back to the curated seed, because fl and he have no
//   snapshot yet and reading data/<id>.json directly is what hid them.
//
// - The field list was `Object.keys(e.coding)`, which attributes a field only
//   where somebody had already CODED it. Those are two unrelated questions: a
//   coding is a reading of the prose, and this asks which document the prose
//   came from. It also made attribution a downstream effect of coding
//   progress, which is how dld's newly coded fields became attributable only
//   today. fl and he have no coding schemes at all, so under that gate they
//   could never have been attributed even with the domain list fixed.
//
// What replaces it is the condition the question actually needs: the field
// holds prose. A third-state sentence is excluded explicitly -- "Not
// established from the sources consulted" and "Not applicable" are somebody's
// deliberate answer rather than text any document contains, and the old gate
// happened to exclude them only because nobody codes them.
const NOT_ESTABLISHED_RE = /^Not established from the sources consulted/i;
const NOT_APPLICABLE_RE = /^Not applicable\b/i;
const { pathFor, fileFor } = require("./datafile");
const { DOMAINS: ALL_DOMAINS } = require(path.join(root, "src", "domains.js"));
const DOMAINS = ALL_DOMAINS
  .filter(d => d.live && fileFor(d.id))
  .map(d => d.id)
  .filter(d => !onlyDomain || d === onlyDomain);
const FIELDS_OF = Object.fromEntries(ALL_DOMAINS.map(d => [d.id, d.fields.map(f => f[0])]));
const jobs = [];
for (const domain of DOMAINS) {
  const rows = JSON.parse(fs.readFileSync(pathFor(domain), "utf8"));
  for (const e of rows) {
    const links = (e.docLinks || []).filter(l => l && l.url && !/doi\.org/i.test(l.url));
    if (links.length < 1) continue;
    const k = `${e.countryCode}|${e.unitName}`;
    const fields = (FIELDS_OF[domain] || []).filter(f => {
      const t = e[f];
      if (typeof t !== "string" || !t.trim()) return false;
      if (NOT_ESTABLISHED_RE.test(t) || NOT_APPLICABLE_RE.test(t)) return false;
      return !(((INDEX[domain] || {})[k] || {})[f]);     // already recorded in drafting
    });
    if (onlyUnit && k !== onlyUnit) continue;
    if (fields.length) jobs.push({ domain, k, e, links, fields });
  }
}
jobs.sort((a, b) => b.fields.length - a.fields.length);
const slice = jobs.slice(0, limit);
console.log(`${jobs.length} entries need attribution; working ${slice.length}` +
  `  (${new Set(slice.flatMap(j => j.links.map(l => l.url))).size} urls)${NL}`);

/** Fetch every distinct url once, `PAR` at a time, before any scoring. */
async function prefetch(urls) {
  const todo = urls.filter(u => !fs.existsSync(path.join(CACHE, key(u.url))));
  if (!todo.length) { console.log(`all ${urls.length} urls already cached${NL}`); return; }
  console.log(`fetching ${todo.length} of ${urls.length} urls (${urls.length - todo.length} cached)`);
  let i = 0, done = 0;
  const worker = async () => {
    while (i < todo.length) {
      const u = todo[i++];
      try { await textOf(u.url, u.label); } catch { /* cached as unreadable */ }
      if (++done % 10 === 0 || done === todo.length)
        process.stderr.write(`\r fetched ${done}/${todo.length} `);
    }
  };
  await Promise.all(Array.from({ length: PAR }, worker));
  process.stderr.write(NL + NL);
}

(async () => {
  {
    const seen = new Map();
    for (const j of slice) for (const l of j.links) if (!seen.has(l.url)) seen.set(l.url, l);
    await prefetch([...seen.values()]);
  }

  let attributed = 0, fieldsDone = 0, unreadable = 0;
  const added = {};
  let n = 0;
  for (const job of slice) {
    process.stderr.write(`\r ${++n}/${slice.length}  ${job.k.slice(0, 28).padEnd(28)} `);
    // Read every source on the entry once.
    const docs = [];
    for (const l of job.links) {
      const t = await textOf(l.url, l.label);
      if (t) { const arr = words(t); docs.push({ link: l, w: new Set(arr), arr }); } else unreadable++;
    }
    if (docs.length < 1) continue;

    for (const field of job.fields) {
      fieldsDone++;
      // Score each source on the field's own wording, weighting a word by how
      // FEW of this entry's sources carry it.
      const ws = [...new Set(words(job.e[field]))].filter(w => w.length > 3 && !STOP.has(w));
      if (ws.length < 4) continue;
      const df = new Map();
      for (const w of ws) df.set(w, docs.filter(d => d.w.has(w)).length);
      // Four is the floor, not three. Chile came out 3 of 3 on Decreto 170 --
      // which is the right document, and three words is not enough evidence to
      // know that rather than guess it.
      const discriminating = ws.filter(w => df.get(w) > 0 && df.get(w) < docs.length);
      if (explain) console.log(`  ${field}: ${ws.length} content words, ${discriminating.length} discriminating`);

      /* AN ENTRY WITH ONE SOURCE HAS NOTHING TO DISCRIMINATE BETWEEN, and the
       * test above silently refuses every one of them: a word cannot be in
       * FEWER than all of one document, so `discriminating` is always empty and
       * the field is skipped. That was 305 of 1,255 unattributed fields in a
       * sample of 360 entries -- a quarter of the backlog, failing on a rule
       * written for a choice that does not arise.
       *
       * Choosing is not the only claim worth making. Where an entry cites one
       * document and the field's wording is in it, "this text is in that
       * document" is true, checkable, and exactly what the panel's heading
       * says. So the same evidentiary standard applies, measured on PRESENCE
       * instead: at least half the field's content words, never fewer than
       * four, inside one window. A field whose words are not there still gets
       * nothing, which is the case that matters -- roughly a quarter of these
       * entries paraphrase a source in another language and must keep saying
       * so rather than being handed the only url on the entry. */
      const sole = docs.length === 1 && ws.length >= 4;
      if (!sole && discriminating.length < 4) continue;   // nothing tells the sources apart
      const probe = sole ? ws : discriminating;

      // THE WORDS HAVE TO OCCUR TOGETHER, and this is the rule that matters.
      //
      // Scoring on whether a document CONTAINS the field's words hands every
      // field to the longest document on the entry: England attributed
      // identification, multilingual provision, service model and funding all
      // to Bercow: Ten Years On, a 2018 review that mentions everything once,
      // over the statute each line was actually drawn from. Length was winning,
      // not relevance, and weighting by rarity did not fix it because a long
      // report contains the rare words too.
      //
      // A source is the source of a sentence when its words sit TOGETHER in it.
      // So the score is the most discriminating words found in any WINDOW of
      // the document, which a passing mention across four chapters cannot
      // reach and a paragraph of the actual rule reaches easily.
      const WINDOW = 400;
      const scored = docs.map(d => {
        const want = new Set(probe);
        const hits = [];                       // positions carrying a wanted word
        for (let i = 0; i < d.arr.length; i++) if (want.has(d.arr[i])) hits.push(i);
        let best = 0, bestAt = 0;
        for (let a = 0; a < hits.length; a++) {
          const seen = new Set();
          for (let b = a; b < hits.length && hits[b] - hits[a] <= WINDOW; b++) seen.add(d.arr[hits[b]]);
          if (seen.size > best) { best = seen.size; bestAt = hits[a]; }
        }
        let weight = 0;
        for (const w of probe) if (d.w.has(w)) weight += 1 / df.get(w);
        return { d, s: best, weight, at: bestAt };
      }).sort((a, b) => (b.s - a.s) || (b.weight - a.weight));

      if (explain) for (const r of scored.slice(0, 3))
        console.log(`      ${String(r.s).padStart(3)}/${probe.length} in one window  ${String(r.d.link.label).slice(0, 58)}`);

      /* SEVERAL SOURCES CAN CARRY THE SAME RULE, and demanding a single winner
       * loses that. England's discharge criteria put the SEND Code of Practice
       * at 11 of 19 words in one window and the Children and Families Act at
       * 10 -- because the Code restates the Act, and a reader drafting that
       * field had both open. A rule requiring the best to beat the runner-up
       * by half again reported NEITHER, which is the wrong answer twice.
       *
       * So the bar is absolute: at least half the field's distinctive words,
       * and never fewer than four, inside one window. Everything clearing it
       * is named, up to three.
       *
       * The guard against a bar that is simply too low is that it must still
       * DISCRIMINATE: if more than half the entry's readable sources clear it,
       * the words are not telling the sources apart and nothing is claimed.
       */
      const bar = Math.max(4, Math.ceil(probe.length / 2));
      const passed = scored.filter(r => r.s >= bar);
      if (!passed.length) continue;
      // The discrimination guard: if more than half the entry's sources clear
      // the bar, the words are not telling them apart. It cannot apply to a
      // lone source, where clearing the bar is the whole claim.
      if (!sole && passed.length > Math.max(1, Math.floor(docs.length / 2))) continue;
      const winners = passed.slice(0, 3);
      const covered = winners[0].s;

      const slot = (((added[job.domain] = added[job.domain] || {})[job.k] = added[job.domain][job.k] || {})[field] =
        added[job.domain][job.k][field] || []);
      for (const w of winners) slot.push({
        url: w.d.link.url,
        label: w.d.link.label || null,
        found: w.s,
        of: probe.length,
      });
      attributed += winners.length;
    }
  }
  process.stderr.write(NL);

  console.log(`fields examined: ${fieldsDone}`);
  console.log(`  attributed to one of the entry's own sources: ${attributed}`);
  console.log(`  sources that could not be read at all:        ${unreadable}`);

  if (!write) {
    const sample = [];
    for (const d of Object.keys(added)) for (const k of Object.keys(added[d]))
      for (const f of Object.keys(added[d][k])) sample.push(`  ${d} ${k} [${f}]  ${added[d][k][f][0].found}/${added[d][k][f][0].of} words${NL}    ${String(added[d][k][f][0].label).slice(0, 78)}`);
    console.log(NL + sample.slice(0, 25).join(NL));
    console.log(NL + "(dry run - pass --write)");
    return;
  }

  // Merge into the index, marked as FOUND rather than recorded: a different
  // kind of claim, and the panel says which it is.
  for (const d of Object.keys(added)) {
    INDEX[d] = INDEX[d] || {};
    for (const k of Object.keys(added[d])) {
      INDEX[d][k] = INDEX[d][k] || {};
      for (const f of Object.keys(added[d][k])) {
        const have = new Set((INDEX[d][k][f] || []).map(x => x.url));
        INDEX[d][k][f] = (INDEX[d][k][f] || []).concat(
          added[d][k][f].filter(x => !have.has(x.url)).map(x => ({ url: x.url, label: x.label, found: true })));
      }
    }
  }
  fs.writeFileSync(INDEX_FILE, JSON.stringify(INDEX, null, 1) + NL);
  console.log(`${NL}wrote data\\field-sources.json`);
})();
