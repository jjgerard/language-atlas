// Resolving a policy-history row to the document it names.
//
// Runs against whatever catalog is loaded, so the document-frequency index is
// rebuilt per catalog rather than baked in at build time.
// ---------- policy history -> the document it refers to ----------
// A history row names a policy; the entry's docLinks often hold that policy.
// Matching is on distinctive shared words, never on the year alone: England's
// 2008 Bercow Review and the 2018 "Bercow: Ten Years On" report share a name
// and are different documents, so a label naming a different year is rejected
// outright. A row that matches nothing stays plain text.
const HIST_STOP = new Set(['the','and','for','with','from','that','this','into','under','over','their',
  'have','has','was','were','are','its','not','but','all','any','new','which','when','who','whose',
  'after','before','also','more','than','such','some','other','each','per','via','out','about',
  'between','during','through','across','among','within','without','upon','onto','shall','must',
  'will','would','should','been','being','they','them','there','then','these','those','only','both',
  'same','well','very','most','much','many','made','make','following','including','general']);

function histTokens(str) {
  const raw = String(str || '').toLowerCase().match(/[a-zÀ-ɏ0-9][a-zÀ-ɏ0-9'’\/-]*/g) || [];
  return raw
    .map(t => t.replace(/['’]/g, ''))
    .filter(t => !/^(?:19|20)\d{2}$/.test(t))          // years are judged separately
    .filter(t => /\d/.test(t) ? t.length >= 2 : (t.length >= 4 && !HIST_STOP.has(t)));
}
const yearsIn = str => String(str || '').match(/(?:19|20)\d{2}/g) || [];

// Shared words are weighted by how rare they are across every source label in
// the corpus. Counting raw overlap rates "language" and "impairment" as highly
// as "catalise", which is how England's 2017 CATALISE row first attached
// itself to an unrelated COST Action.


// Tokens written as a name or an acronym in the source text. "IDEA" and
// "CATALISE" are names; "therapy" happens to be rare in this corpus but is
// just a word. Capitalisation has to hold in BOTH texts to count, which is
// what stops a sentence-initial "Special" from passing as a name.
const nameLike = str => new Set(
  (String(str || '').match(/[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’\/-]*/g) || [])
    .filter(w => w.length >= 3 && /^[A-ZÀ-Þ]/.test(w))
    .map(w => w.toLowerCase().replace(/['’]/g, '')));

// Evidence is graded, and the weak grade is only ever a fallback:
//
//  * STRONG — two or more shared terms, or one shared term whose year also
//    agrees. England's 2017 CATALISE row matches on "catalise" alone and is
//    right, because the source is dated 2017 too.
//  * WEAK — a single shared term that is a name or acronym in both texts, with
//    nothing to corroborate it. The US 2004 row and "IDEA statute and
//    regulations" share only "IDEA", and that is the right document. Used only
//    when the row has no strong match, so a well-evidenced row is never padded
//    with single-word associations.
//
// Both grades require the rarest shared term to be genuinely rare. That is what
// keeps Israel's 1988 Special Education Law off an unrelated Supreme Court
// case, which shares only "special" and "education", and off an OECD autism
// report, which shares only the ordinary word "therapy".
//
// Rarity is measured as a SHARE of the corpus, and term weights are divided by
// log(N), so every threshold here means the same thing whatever size the
// catalog grows to. Raw idf rises with N, which would have quietly loosened
// the matcher as the trackers accumulate entries.
const PEAK_DF_SHARE = 0.01;   // rarest shared term: in at most 1% of labels
const HIST_MIN_SCORE = 0.83;  // normalised weight, summed over shared terms
const YEAR_BONUS = 0.25;

function matchHistoryDocs(row, docLinks, weight, dfShare) {
  const hTok = new Set(histTokens(row.description));
  const hNames = nameLike(row.description);
  const hYears = new Set([...yearsIn(row.year), ...yearsIn(row.description)]);
  const strong = [], weak = [];
  for (const d of docLinks || []) {
    if (!d || !d.url) continue;
    const lYears = yearsIn(d.label);
    // A label naming a different year is a different document.
    if (lYears.length && hYears.size && !lYears.some(y => hYears.has(y))) continue;
    const yearAgrees = !!(lYears.length && lYears.some(y => hYears.has(y)));
    const lNames = nameLike(d.label);
    let score = 0, shared = 0, rarest = 1, lone = '';
    for (const t of new Set(histTokens(d.label))) {
      if (!hTok.has(t)) continue;
      score += weight(t); shared++; lone = t;
      rarest = Math.min(rarest, dfShare(t));
    }
    if (!shared || rarest > PEAK_DF_SHARE) continue;
    if (shared >= 2 || yearAgrees) {
      if (yearAgrees) score += YEAR_BONUS;
      if (score >= HIST_MIN_SCORE) strong.push({ label: d.label, url: d.url, score });
    } else if (hNames.has(lone) && lNames.has(lone)) {
      weak.push({ label: d.label, url: d.url, score });
    }
  }
  const hits = strong.length ? strong : weak;
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, 2).map(({ label, url }) => ({ label, url }));
}

// Build a matcher bound to one catalog's source labels.
function makeHistoryMatcher(allEntries) {
  const DF = new Map();
  let N = 0;
  for (const e of allEntries) {
    for (const l of e.docLinks || []) {
      if (!l || !l.label) continue;
      N++;
      for (const t of new Set(histTokens(l.label))) DF.set(t, (DF.get(t) || 0) + 1);
    }
  }
  const logN = Math.log(Math.max(N, 2));
  const weight = t => Math.log(N / (1 + (DF.get(t) || 0))) / logN;
  const dfShare = t => (DF.get(t) || 0) / Math.max(N, 1);
  return {
    labelCount: N,
    match: (row, docLinks) => matchHistoryDocs(row, docLinks, weight, dfShare),
  };
}

module.exports = { makeHistoryMatcher, histTokens, yearsIn };
