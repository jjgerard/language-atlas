// The map payload: built from the atlas's own store, and cached.
//
// Every domain the atlas shows is held here. It was not always so — the two
// trackers this atlas grew out of were proxied over the network for a while,
// and this file carried a fetch-and-fall-back path for them. They were retired
// in August 2026, and that path went with them; the entry shape the store
// returns is the shape the trackers' /api/catalog used, which is why nothing
// downstream of this file ever had to change.
//
// The cache exists because build() runs the policy-history matcher across every
// domain at once, which is the one part of assembling the payload worth not
// repeating per request. Approvals call invalidate() rather than waiting for
// the window to lapse.

const { LIVE, DOMAINS } = require('./domains');
const { SCHEMES, columnLabel } = require("./coding.js");
const { load: pisa } = require("./pisa.js");
const store = require('./store');
const { makeHistoryMatcher } = require('./history');
const { deriveUnits } = require('./derive');

const REFRESH_MS = Number(process.env.CATALOG_REFRESH_MS || 5 * 60 * 1000);

let state = { payload: null, builtAt: 0, sources: {} };

function build(catalogs, sources) {
  // Term rarity is judged across every domain at once — see deriveUnits.
  const all = Object.values(catalogs).flat();
  const shared = makeHistoryMatcher(all);
  const units = {}, stats = {};
  for (const d of LIVE) {
    const out = deriveUnits(d, catalogs[d.id] || [], shared);
    units[d.id] = out.units;
    stats[d.id] = out.stats;
  }
  return {
    units,
    stats,
    sources,
    // Which columns of a scheme identify a row rather than describe one.
    // /patterns renders every coding column it finds as a frequency table,
    // and it cannot know that policyHistory's `year` and `matches` are a
    // key without being told.
    // keyColumns identify a row rather than describe it. valueColumns are the
    // ones backed by a vocabulary: a scheme column whose definition is an
    // object lists its allowed values, and one whose definition is a string is
    // prose describing a number or a free-text field. A renderer that tabulates
    // the second kind gets a frequency table of instrument names, each seen
    // once, which is what the outcomes panel did before this was sent.
    schemes: Object.fromEntries(Object.entries(SCHEMES).map(([k, s]) => [k, {
      keyColumns: s.keyColumns,
      // Row-grained: the field holds an ARRAY of codings per unit. keyColumns
      // implies it but does not always accompany it -- dld.assessments is
      // instrument-grained with no key declared -- and a picker that offers
      // such a column would ask the map to reduce many rows to one colour.
      many: !!s.many,
      valueColumns: Object.entries(s.columns || {})
        .filter(([, def]) => def && typeof def === "object").map(([c]) => c),
      // Which of those carry a RANK. A map shading by an ordinal column should
      // use the coverage ramp, whose lightness climbs; one shading by an
      // unordered column must use the categorical set instead, or the fill
      // asserts an order the vocabulary refuses. Declared in coding.js rather
      // than detected here -- `obliges` and `occurrence` both have numeric keys
      // and only one of them is a rank.
      ordinalColumns: s.ordinal || [],
      // Every column except the key ones, in declared order. `valueColumns` is
      // the subset backed by a vocabulary; a panel showing the FULL coding also
      // needs the free and numeric ones -- `exit_period_months: 12` is exactly
      // what a reader wants and it has no gloss to carry it here.
      allColumns: Object.keys(s.columns || {}).filter(c => !(s.keyColumns || []).includes(c)),
      // WHAT TO CALL EACH ONE. Every page was printing the column KEY with its
      // underscores swapped for spaces and treating that as a label, so a reader
      // choosing a question met `obliges` and `rule_locus`. The labels live beside
      // the vocabularies in coding.js and are resolved here, once, so no page has
      // to carry a copy or invent its own wording.
      labels: Object.fromEntries(Object.keys(s.columns || {})
        .map(c => [c, columnLabel(k.split(".")[1], c)])),
      // The glosses themselves, so a reader who clicks a country can be told
      // what the coded value MEANS and which entries forced it, without a
      // second request and without the vocabulary being paraphrased in the
      // page. These are the evidenced definitions from src/coding.js verbatim:
      // 101 KB across 378 values, about 1% of a payload that is already 9.7 MB,
      // which is a cheap price for the panel not having to invent its own
      // wording for a value the corpus defines precisely.
      values: Object.fromEntries(Object.entries(s.columns || {})
        .filter(([, def]) => def && typeof def === "object")
        .map(([c, def]) => [c, def])),
    }])),
    // Rides along on the atlas payload rather than getting its own endpoint,
    // for the reason the patterns page already records: the page pulled 3MB
    // twice before these were merged, and this adds a few kilobytes.
    pisa: pisa(),
    domains: DOMAINS.map(({ fields, ...rest }) => ({
      ...rest,
      // Typed and hinted, because the submission form is generated from this.
      fields: (fields || []).map(([k, label, type, hint]) => ({ k, label, type, hint })),
    })),
  };
}

function read() {
  const catalogs = {}, sources = {};
  const at = new Date().toISOString();
  for (const d of LIVE) {
    const entries = store.approved(d.id);
    catalogs[d.id] = entries;
    // `sources` is kept in the payload even though there is only one source
    // now: /api/health and the admin dashboard report per-domain entry counts
    // from it, and a future proxied catalogue would slot in here.
    sources[d.id] = { origin: 'atlas', state: 'local', entries: entries.length, at };
  }
  return { catalogs, sources };
}

// Rebuild now, whatever the cache holds.
function refresh() {
  const { catalogs, sources } = read();
  state = { payload: build(catalogs, sources), builtAt: Date.now(), sources };
  return state.payload;
}

// Approving an entry has to show on the map now, not at the end of whichever
// refresh window it happened to land in.
const invalidate = () => { if (state.payload) refresh(); };

function getPayload() {
  if (state.payload && Date.now() - state.builtAt < REFRESH_MS) return state.payload;
  return refresh();
}

module.exports = { getPayload, refresh, invalidate, REFRESH_MS };
