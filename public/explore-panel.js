// The cross-tabulation panel on /patterns.
//
//     import { mountExplore } from '/explore-panel.js';
//     await mountExplore();
//
// A module rather than another inline script, because /patterns already has one
// with its own `$` meaning querySelector and its own `table()`. Merging the two
// by hand would have produced exactly the kind of quiet collision that is hard
// to see and easy to ship.
//
// THE QUESTION BOX NEVER PRODUCES A FIGURE. That constraint is what the rest of
// this is arranged around, because a fabricated number on a site whose whole
// claim is that every figure traces to a source would be worse than no feature.
//
// With a key configured, a model does two jobs and neither is arithmetic. It
// reads the question against a list of VARIABLE NAMES — no entries, no counts —
// and returns a selection, which the server checks against the registry and
// rejects if invented. The browser then counts. Only the FINISHED TABLE goes
// back for a reading, so the prose describes figures that already existed and a
// reader can check each one against the table printed above it.
//
// With no key, parseQuery() runs instead, matching words against the same
// variables and moving the same dropdowns. The page works either way, on the
// same numbers, which is why the parser stays rather than being replaced.
//
// Everything here is schema-level, inheriting the rule the rest of this page
// works to: nothing is read out of entry prose. The wording is deliberately
// hedged and a classifier over it leaves the interesting cases unresolved, so
// the variables are what the store knows about itself — which fields are
// filled, an entry's status and confidence, how many dated rows and sources it
// carries, where it is.

const esc = s => String(s == null ? '' : s)
  .replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = id => document.getElementById(id);

let PAYLOAD = null, ROWS = [], LANGS = [], VARS = [], SCOPES = [], MODE = 'cross', MODEL = null, LEFT = null;

// Composite key for a crosstab cell. The separator has to be something no
// category value can contain: joining on a space would make the pair
// ("Not", "established") collide with ("Not established", "").
const SEP = String.fromCharCode(31);

/* ---- the flattened table -------------------------------------------- *
 * One row per (unit, domain). A country documented on three maps is three
 * rows, which is what makes "on the fl map but not the eal map" answerable
 * by a crosstab rather than by special-case code. */
function flatten(payload) {
  const rows = [], perUnit = new Map();
  for (const d of payload.domains) {
    if (!payload.units[d.id]) continue;
    for (const u of payload.units[d.id]) {
      const key = u.cc + '|' + u.name;
      const row = {
        key, cc: u.cc, name: u.name, domain: d.id, domainLabel: d.label,
        region: u.region || 'Unrecorded', subregion: u.subregion || 'Unrecorded',
        national: String(u.nat) === 'true',
        status: u.status || 'stub',
        confidence: u.confidence || '',
        coverage: u.coverage || 'none',
        fieldStates: u.fieldStates || '',
        history: (u.history || []).length,
        sources: ((u.docLinks || []).length) + ((u.supportLinks || []).length),
        // Substantive facts, read off the entry rather than off its metadata.
        named: (u.records && u.records.languages) ? u.records.languages.length : null,
        // How many languages the country has. This READ THE SENTENCE until
        // inventory was retyped from prose to a series: the string it matched,
        // "Glottolog counts 899 living languages", no longer exists, and the
        // word "living" was dropped as well because the count always included
        // extinct languages. Both changes were right and both broke this
        // silently -- 0 of 353 units matched, so `present` was null everywhere
        // and took presentCount and engagedShare down with it, showing an empty
        // variable rather than an error.
        // It reads the ROW now, which is what a typed field is for. The old
        // sentence is still tried afterwards, so an entry left in the prose
        // form is not dropped.
        present: (() => {
          const rows = (u.records && u.records.inventory) || [];
          for (const row of rows) {
            const n = Number(String(row && row.value).replace(/[^0-9.]/g, ''));
            if (Number.isFinite(n) && n > 0) return n;
          }
          const m = String((u.values && u.values.inventory) || '').match(/Glottolog counts (\d+) living language/);
          return m ? Number(m[1]) : null;
        })(),
        // The coded readings, which are the only structured account of what an
        // entry SAYS rather than of how complete it is.
        coding: u.coding || {},
        firstYear: (u.history || []).length ? Math.min(...u.history.map(h => h.year)) : null,
        lastYear: (u.history || []).length ? Math.max(...u.history.map(h => h.year)) : null,
      };
      rows.push(row);
      if (!perUnit.has(key)) perUnit.set(key, {});
      perUnit.get(key)[d.id] = row;
    }
  }
  for (const r of rows) r.siblings = perUnit.get(r.key);

  // How many languages a country has, and how many its school system names,
  // are facts about the PLACE — but they are only recorded on the indigenous
  // entry, because that is the map that asks. A pair of place-level variables
  // collapses to one row per place, and that row is often another map's, where
  // both were null: "share of its languages the system names" against region
  // counted 0 and dropped all 336. So they are copied across the siblings.
  for (const r of rows) {
    const ind = r.siblings && r.siblings.indigenous;
    if (ind && ind !== r) { r.named = ind.named; r.present = ind.present; }
  }
  return rows;
}

/* ---- the second grain: one row per NAMED LANGUAGE ------------------- *
 *
 * The panel counted entries, so it could only ever describe entries — how
 * many were filled, how well sourced, how complete. Every one of those is a
 * fact about the catalogue rather than about language policy, and a page of
 * them tells a reader nothing they came for.
 *
 * The indigenous map carries 719 language records with family, genus and a
 * WALS typology, so counting THOSE asks a different kind of question: what
 * word order do the languages a school system names actually have, which
 * families appear, how many carry tone. Those are relations between the
 * entries rather than a report on them. */
function flattenLanguages(payload) {
  const out = [];
  for (const d of payload.domains) {
    for (const u of payload.units[d.id] || []) {
      const langs = (u.records && u.records.languages) || [];
      for (const l of langs) {
        // The typology is one string — "Word order SVO; Noun-Adjective; No
        // tones" — so it is split into the facts it actually states rather
        // than offered whole, which nothing could group by.
        const parts = String(l.typology || '').split(';').map(s => s.trim()).filter(Boolean);
        const find = re => parts.find(p => re.test(p)) || null;
        out.push({
          name: l.name || '(unnamed)',
          family: l.family || 'Not recorded',
          genus: l.genus || 'Not recorded',
          hasWals: l.wals ? 'Has a WALS record' : 'No WALS record',
          wordOrder: (find(/word order/i) || '').replace(/^Word order\s*/i, '') || 'Not recorded',
          adjective: find(/Adjective|Noun-Adj/i) || 'Not recorded',
          tone: find(/tone/i) || 'Not recorded',
          affix: find(/suffixing|prefixing|affixation/i) || 'Not recorded',
          unit: u.name, cc: u.cc,
          region: u.region || 'Unrecorded',
          subregion: u.subregion || 'Unrecorded',
          national: String(u.nat) === 'true',
        });
      }
    }
  }
  return out;
}

const COVER_LABEL = {
  has: 'Documented', some: 'Partly documented', looked: 'Looked, found nothing',
  none: 'Nothing recorded', inherit: 'Follows its country',
};
const band = (n, edges, names) => {
  for (let i = 0; i < edges.length; i++) if (n <= edges[i]) return names[i];
  return names[names.length - 1];
};

/* ---- the variable registry ------------------------------------------ *
 * Each is { id, label, group, of(row), unit }. `of` returning null drops
 * the row from that tabulation, used where the variable does not apply —
 * bucketing those as "no" would count an inapplicable row as a negative.
 * `unit: true` marks a variable describing the PLACE rather than one map
 * entry, which decides whether a pair is collapsed. */
/* The registry, ordered on purpose.
 *
 * What a system DOES comes first, then WHEN it changed, then where. The
 * variables describing how complete the record is come last and say plainly
 * that they are about the catalogue, because they are the least interesting
 * thing here and they were previously the only thing here.
 *
 * `grain` says which row set a variable reads: 'entries' (one row per unit per
 * map) or 'languages' (one row per named language). */
function buildVars(payload) {
  const v = [];
  const push = (id, label, group, of, opts = {}) =>
    v.push({ id, label, group, of, unit: !!opts.unit, grain: opts.grain || 'entries' });

  // ---- what the systems do, counted over languages ----
  const G = { grain: 'languages' };
  push('l_wordOrder', 'Word order', 'The languages themselves', r => r.wordOrder, G);
  push('l_adjective', 'Adjective and noun', 'The languages themselves', r => r.adjective, G);
  push('l_tone', 'Tone', 'The languages themselves', r => r.tone, G);
  push('l_affix', 'Affixation', 'The languages themselves', r => r.affix, G);
  push('l_family', 'Language family', 'The languages themselves', r => r.family, G);
  push('l_genus', 'Genus', 'The languages themselves', r => r.genus, G);
  push('l_wals', 'Described by WALS', 'The languages themselves', r => r.hasWals, G);
  push('l_region', 'Region it is named in', 'The languages themselves', r => r.region, G);
  push('l_subregion', 'Sub-region it is named in', 'The languages themselves', r => r.subregion, G);
  push('l_unit', 'Place that names it', 'The languages themselves', r => r.unit, G);

  // ---- what the systems do, counted over places ----
  push('namedCount', 'How many languages the system names', 'What the system engages with',
    r => r.named == null ? null : band(r.named, [0, 1, 3, 10], ['None', 'One', '2 to 3', '4 to 10', 'More than 10']), { unit: true });
  push('presentCount', 'How many languages the country has', 'What the system engages with',
    r => r.present == null ? null : band(r.present, [5, 20, 60, 150], ['Up to 5', '6 to 20', '21 to 60', '61 to 150', 'More than 150']), { unit: true });
  // The distance between those two is the point the atlas exists to show.
  push('engagedShare', 'Share of its languages the system names', 'What the system engages with', r => {
    if (r.present == null || r.named == null || !r.present) return null;
    const pctv = (r.named / r.present) * 100;
    return band(pctv, [1, 5, 20, 50], ['Under 1%', '1 to 5%', '5 to 20%', '20 to 50%', 'More than half']);
  }, { unit: true });

  // ---- when it changed ----
  push('firstChange', 'Earliest recorded change', 'When policy changed',
    r => r.firstYear ? (Math.floor(r.firstYear / 10) * 10) + 's' : null);
  push('lastChange', 'Most recent recorded change', 'When policy changed',
    r => r.lastYear ? (Math.floor(r.lastYear / 10) * 10) + 's' : null);
  push('changeSpan', 'Years between first and last change', 'When policy changed',
    r => (r.firstYear && r.lastYear) ? band(r.lastYear - r.firstYear, [0, 10, 30, 60], ['One year only', 'Up to 10 years', '11 to 30', '31 to 60', 'More than 60']) : null);

  /* ---- WHAT THE ENTRIES SAY ------------------------------------------
   * The coded columns, one variable each. This is the part the panel was
   * built for and could not have: its header says "nothing is read out of
   * entry prose", because a classifier over hedged wording leaves the
   * interesting cases unresolved. A coding is not a classifier over prose --
   * it is a reading somebody recorded against a fixed vocabulary, stored
   * beside the prose and never inside it, which is exactly the kind of
   * variable the rest of this registry holds.
   *
   * A coding belongs to one map, and a row here is one (unit, domain) pair,
   * so each variable answers only on its own map and is null elsewhere. That
   * is what makes "identification decider against referral route" a crosstab
   * rather than a join.
   *
   * A LIST COLUMN CANNOT SIT IN ONE CELL. `initiated_by` holds up to four
   * values and a crosstab row goes in one place, so a unit holding several
   * is counted as `more than one` rather than being silently reduced to its
   * first value. The label says so, and the distribution mode still shows
   * the values separately. */
  for (const d of payload.domains) {
    const sc = payload.schemes || {};
    for (const f of (d.fields || [])) {
      const scheme = sc[d.id + '.' + f.k];
      if (!scheme || scheme.many || (scheme.keyColumns || []).length) continue;
      for (const col of (scheme.valueColumns || [])) {
        const pretty = col.replace(/_/g, ' ');
        push('c_' + d.id + '_' + f.k + '_' + col,
          pretty + ' — ' + f.label,
          'What the entries say · ' + d.label,
          r => {
            if (r.domain !== d.id) return null;
            const v = (r.coding[f.k] || {})[col];
            if (v === undefined || v === null || !String(v).length) return null;
            if (Array.isArray(v)) return v.length === 1 ? String(v[0]) : 'more than one';
            return String(v);
          });
      }
    }
  }

  // ---- where ----
  push('region', 'Region', 'Where', r => r.region, { unit: true });
  push('subregion', 'Sub-region', 'Where', r => r.subregion, { unit: true });
  push('level', 'National or sub-national', 'Where', r => r.national ? 'A country' : 'Inside a country', { unit: true });
  push('domain', 'Which map', 'Where', r => r.domainLabel);

  // ---- how complete the record is ----
  // Last, and named for what they are. These describe the atlas, not the world:
  // a place counted as undocumented means nobody has written it up here.
  push('coverage', 'Coverage of this entry', 'How complete the record is', r => COVER_LABEL[r.coverage] || r.coverage);
  push('confidence', 'How the entry was sourced', 'How complete the record is',
    r => r.confidence ? r.confidence.replace(/-/g, ' ') : 'not recorded');
  push('filledcount', 'How many fields are filled', 'How complete the record is',
    r => band([...r.fieldStates].filter(c => c === 'h').length, [0, 2, 5, 9], ['None', '1 to 2', '3 to 5', '6 to 9', '10 or more']));
  push('sourcecount', 'How many sources are cited', 'How complete the record is',
    r => band(r.sources, [0, 1, 3, 6], ['None', 'One', '2 to 3', '4 to 6', 'More than 6']));
  push('nmaps', 'Recorded on how many maps', 'How complete the record is', r => {
    const n = Object.values(r.siblings).filter(s => s.coverage === 'has' || s.coverage === 'some').length;
    return n + (n === 1 ? ' map' : ' maps');
  }, { unit: true });
  for (const d of payload.domains) {
    (d.fields || []).forEach((f, i) => {
      push('f_' + d.id + '_' + f.k, d.label + ' — ' + f.label, 'Whether one field is filled', r => {
        if (r.domain !== d.id) return null;
        const c = r.fieldStates[i];
        if (c === 'h') return 'Filled';
        if (c === 'l') return 'Looked, found nothing';
        return 'Empty';
      });
    });
  }
  return v;
}

const varById = id => VARS.find(v => v.id === id) || null;

function buildScopes(payload) {
  const s = [{ id: 'all', label: 'Everything', keep: () => true }];
  for (const d of payload.domains) s.push({ id: 'd_' + d.id, label: 'Only the ' + d.label.toLowerCase() + ' map', keep: r => r.domain === d.id });
  for (const g of [...new Set(ROWS.map(r => r.region))].sort()) s.push({ id: 'r_' + g, label: 'Only ' + g, keep: r => r.region === g });
  s.push({ id: 'nat', label: 'Only whole countries', keep: r => r.national });
  s.push({ id: 'sub', label: 'Only units inside a country', keep: r => !r.national });
  return s;
}

/* ---- the fallback parser -------------------------------------------- *
 * Deliberately dumb and completely predictable. It never invents a
 * category and never produces a number; it only moves the dropdowns. */
const STOP = new Set('the a an of on in for and or is are do does show me see view about with across all as to entries entry unit units'.split(' '));

function score(v, words) {
  const hay = (v.label + ' ' + v.group).toLowerCase();
  let s = 0;
  for (const w of words) {
    if (w.length < 3) continue;
    if (hay.includes(w)) s += w.length >= 6 ? 3 : 2;
    else if (w.length > 4 && hay.includes(w.slice(0, -1))) s += 1;
  }
  if (!s) return 0;
  // "by region" matched "Region it is named in" as readily as "Region", because
  // both contain the word and the first one in the registry won. Putting the
  // language variables first therefore silently changed what half the examples
  // resolved to, and crossing a language variable with an entry variable drops
  // every row. So a label the query nearly fills wins over one it barely
  // touches: exact match first, then how much of the label was actually
  // matched.
  const label = v.label.toLowerCase();
  const q = words.join(' ');
  if (label === q) return s + 100;
  const covered = words.filter(w => label.includes(w)).join(' ').length;
  return s + (covered / Math.max(label.length, 1)) * 10;
}

/* Scope is matched only on an explicit cue, never on a loose word. Matching
 * scope labels by keyword read "coverage by region" as "only the indigenous
 * and REGIONAL languages map", because that label contains the word — a filter
 * nobody asked for, silently changing every number on the page. */
function detectScope(raw) {
  for (const s of SCOPES) {
    if (!s.id.startsWith('r_')) continue;
    const name = s.id.slice(2).toLowerCase().replace(/[^a-z ]/g, '');
    if (new RegExp('\\b' + name + '\\b').test(raw)) return { scope: s, hit: true };
  }
  const m = raw.match(/\b(?:on|only|just|within|in)\s+the\s+([a-z\s-]+?)\s+map\b/);
  if (m) {
    const want = m[1].trim();
    for (const s of SCOPES) if (s.id.startsWith('d_') && s.label.toLowerCase().includes(want)) return { scope: s, hit: true };
  }
  if (/\bwhole countries\b|\bcountries\b|\bnational\b/.test(raw)) {
    const s = SCOPES.find(z => z.id === 'nat');
    if (s) return { scope: s, hit: true };
  }
  if (/\bsub-?national\b|\bstates\b|\bprovinces\b/.test(raw)) {
    const s = SCOPES.find(z => z.id === 'sub');
    if (s) return { scope: s, hit: true };
  }
  return { scope: SCOPES[0], hit: false };
}

function parseQuery(text) {
  const raw = String(text || '').toLowerCase().trim();
  if (!raw) return null;
  const clean = w => w.replace(/[^a-z0-9-]/g, '');
  const parts = raw.split(/\bby\b|\bvs\.?\b|\bversus\b|\bagainst\b/)
    .map(p => p.split(/\s+/).map(clean).filter(w => w && !STOP.has(w)));
  const allWords = parts.flat();
  const { scope, hit } = detectScope(raw);

  const pick2 = (words, grain) => {
    if (!words || !words.length) return null;
    let best = null, bestScore = 0;
    for (const v of VARS) {
      if (grain && v.grain !== grain) continue;
      const s = score(v, words);
      if (s > bestScore) { bestScore = s; best = v; }
    }
    return bestScore > 0 ? best : null;
  };
  const pick = words => pick2(words, null);

  let x = null, y = null;
  if (parts.length >= 2) { y = pick(parts[0]); x = pick(parts.slice(1).flat()); }
  if (!x && !y) x = pick(allWords);
  if (x && y && x.id === y.id) y = null;
  if (!x && y) { x = y; y = null; }

  // The two axes must count the same population: crossing a language variable
  // with an entry one yields an empty table, which reads as "no data" rather
  // than "those cannot be crossed".
  //
  // Which grain to keep is decided by SCORE, not by position. Forcing both onto
  // the first axis's grain read "word order by region" as Region against
  // "Language disorder support — Funding", because "disorder" contains "order"
  // and that was the best entry-grain match available. Both reconciliations are
  // tried and the better-fitting pair wins.
  if (x && y && x.grain !== y.grain) {
    const wordsY = parts[0], wordsX = parts.slice(1).flat();
    const fit = (a, b) => (a && b && a.id !== b.id) ? score(a, wordsX) + score(b, wordsY) : -1;
    const keepX = { x, y: pick2(wordsY, x.grain) };
    const keepY = { x: pick2(wordsX, y.grain), y };
    const best = fit(keepY.x, keepY.y) > fit(keepX.x, keepX.y) ? keepY : keepX;
    x = best.x || x;
    y = (best.y && best.y.id !== x.id) ? best.y : null;
  }
  return x ? { x, y, scope, matchedScope: hit } : null;
}

/* ---- counting -------------------------------------------------------- */
/** Which row set a pair of variables reads. A language variable and an entry
 *  variable cannot be crossed — they count different things — so the language
 *  grain wins and the other axis is dropped rather than silently mixing two
 *  populations into one table. */
function grainOf(xv, yv) {
  return (xv && xv.grain === 'languages') || (yv && yv.grain === 'languages') ? 'languages' : 'entries';
}

function tabulate(xv, yv, scope) {
  const grain = grainOf(xv, yv);
  // Scopes were written for entry rows. A language row has a region and a
  // country but no map, so a "only the foreign-languages map" scope would
  // filter every language away and show an empty table rather than saying why.
  // Region and country scopes carry over; map scopes are ignored at this grain.
  let rows;
  if (grain === 'languages') {
    rows = LANGS.filter(r => scope.id.startsWith('d_') ? true
      : scope.id.startsWith('r_') ? r.region === scope.id.slice(2)
      : scope.id === 'nat' ? r.national
      : scope.id === 'sub' ? !r.national
      : true);
  } else {
    rows = ROWS.filter(scope.keep);
  }
  // Both variables describe the place rather than one map entry, so each place
  // is counted once. Without this, "documented on the indigenous map against
  // documented on the disorder map" over 193 countries reported 772 — every
  // country counted once per map, reading as a sample four times the real one.
  const collapsed = grain === 'entries' && xv.unit && (!yv || yv.unit);
  if (collapsed) {
    const seen = new Set();
    rows = rows.filter(r => (seen.has(r.key) ? false : (seen.add(r.key), true)));
  }
  const cells = new Map(), xs = new Map(), ys = new Map();
  let counted = 0;
  for (const r of rows) {
    const xk = xv.of(r);
    if (xk == null) continue;
    if (yv) {
      const yk = yv.of(r);
      if (yk == null) continue;
      const k = xk + SEP + yk;
      cells.set(k, (cells.get(k) || 0) + 1);
      ys.set(yk, (ys.get(yk) || 0) + 1);
    }
    xs.set(xk, (xs.get(xk) || 0) + 1);
    counted++;
  }
  const order = m => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
  return { cells, xs: order(xs), ys: order(ys), counted, dropped: rows.length - counted, collapsed };
}

/* ---- rendering ------------------------------------------------------- */
function renderCross(xv, yv, t) {
  if (!yv) return renderBars(t);
  if (!t.xs.length) return '<p class="xempty">Nothing to count — those two do not apply to the same entries.</p>';
  const head = t.ys.map(([k, n]) => `<th class="n">${esc(k)}<br><span class="zero">${n}</span></th>`).join('');
  const body = t.xs.map(([xk, xn]) => {
    const cells = t.ys.map(([yk]) => {
      const n = t.cells.get(xk + SEP + yk) || 0;
      const share = xn ? n / xn : 0;
      return `<td class="n xcell" style="--a:${(share * 0.75).toFixed(3)}"><i></i><span class="${n ? '' : 'zero'}">${n || '·'}</span></td>`;
    }).join('');
    return `<tr><td class="rowhead">${esc(xk)}</td>${cells}<td class="n">${xn}</td></tr>`;
  }).join('');
  return `<table class="xtab"><thead><tr><th>${esc(xv.label)}</th>${head}<th class="n">All</th></tr></thead>
    <tbody>${body}</tbody>
    <tfoot><tr><td>All</td>${t.ys.map(([, n]) => `<td class="n">${n}</td>`).join('')}<td class="n">${t.counted}</td></tr></tfoot></table>`;
}

function renderBars(t) {
  if (!t.xs.length) return '<p class="xempty">Nothing to count for that variable.</p>';
  const max = t.xs[0][1];
  return '<div class="xbars">' + t.xs.map(([k, n]) => `
    <div class="xbar">
      <span class="lab">${esc(k)}</span>
      <span class="track"><span class="fill" style="width:${max ? (n / max * 100).toFixed(1) : 0}%"></span></span>
      <span class="val">${n} · ${t.counted ? Math.round(n / t.counted * 100) : 0}%</span>
    </div>`).join('') + '</div>';
}

function renderUnits(xv, yv, scope) {
  // Same grain as the table above it: listing places under a count of
  // languages, or the reverse, would be a different answer from the one on
  // screen.
  const grain = grainOf(xv, yv);
  const rows = grain === 'languages'
    ? LANGS.filter(r => scope.id.startsWith('r_') ? r.region === scope.id.slice(2)
        : scope.id === 'nat' ? r.national : scope.id === 'sub' ? !r.national : true)
    : ROWS.filter(scope.keep);
  // A Set, so a language named by four countries is listed once. That is the
  // right answer to "which languages have this word order" and the wrong one
  // to "how many", which is what the table above already says.
  const groups = new Map();
  for (const r of rows) {
    const xk = xv.of(r);
    if (xk == null) continue;
    const yk = yv ? yv.of(r) : null;
    if (yv && yk == null) continue;
    const k = yv ? xk + ' · ' + yk : xk;
    if (!groups.has(k)) groups.set(k, new Set());
    groups.get(k).add(r.name);
  }
  if (!groups.size) return '<p class="xempty">Nothing to list.</p>';
  return [...groups.entries()]
    .sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]))
    .slice(0, 40)
    .map(([k, set]) => {
      const names = [...set].sort();
      return `<h4 class="xgroup">${esc(k)} <span class="zero">${names.length}</span></h4>
        <div class="xunits">${names.map(n => `<div>${esc(n)}</div>`).join('')}</div>`;
    }).join('');
}

function draw() {
  const xv = varById($('x').value), yv = varById($('y').value);
  const scope = SCOPES.find(s => s.id === $('scope').value) || SCOPES[0];
  if (!xv) return;
  const t = tabulate(xv, yv, scope);
  const out = $('xout');
  if (MODE === 'units') out.innerHTML = renderUnits(xv, yv, scope);
  else if (MODE === 'bars') out.innerHTML = renderBars(tabulate(xv, null, scope));
  else out.innerHTML = renderCross(xv, yv, t);

  const grain = grainOf(xv, yv);
  const bits = [`<b>${t.counted}</b> ${grain === "languages" ? "named languages counted" : "entries counted"}`];
  // A map-scope does not apply to language rows, which have no map, so saying
  // "limited to the disorder map" over a table that ignored it would be a
  // caption describing a filter that never ran.
  const scopeApplies = scope.id !== 'all' && !(grain === 'languages' && scope.id.startsWith('d_'));
  if (scopeApplies) bits.push(`limited to ${esc(scope.label.toLowerCase())}`);
  else if (grain === 'languages' && scope.id.startsWith('d_')) bits.push('the map filter does not apply to languages, so it was ignored');
  if (t.dropped) bits.push(`<b>${t.dropped}</b> left out because the variable does not apply to them`);
  // What one row IS, which differs by grain and by whether the pair collapsed.
  // Getting this wrong is not cosmetic: a reader who thinks 719 is a count of
  // places rather than of language records reads the whole table wrong.
  // What one row is, in a clause rather than a paragraph. The long version
  // explained the counting rule twice over and nobody reads a caption that
  // size; the fact a reader needs is simply what got counted once.
  $('xsummary').innerHTML = bits.join(' · ') + '. ' + (
    grain === 'languages' ? 'Counted once per place that names it.'
      : t.collapsed ? 'Each place counted once.'
        : 'Each entry counted once per map.');
}

/* ---- WHICH PAIRS ARE WORTH LOOKING AT --------------------------------
 *
 * There are about ninety coded columns, so there are thousands of pairs, and
 * a reader given two dropdowns and no steer will mostly find nothing. This
 * ranks the pairs BEFORE anyone picks, so the panel opens on the handful that
 * actually move together.
 *
 * The measure is Cramer's V, which is the chi-squared statistic normalised by
 * the table's size so a 3x3 and a 9x6 can be put in the same list. It runs
 * 0 (the two columns tell you nothing about each other) to 1 (one determines
 * the other). It is symmetric and it says nothing whatever about cause: that
 * a standing's force predicts the classroom does not mean it produces it, and
 * the strongest pair in the atlas is usually two columns of one instrument
 * being read twice.
 *
 * ONLY WITHIN A MAP. A coding belongs to a domain, so a dld column and an
 * indigenous column are never both filled on the same row and their V is
 * undefined rather than zero.
 *
 * MIN_N exists because V is inflated by small tables -- two columns with four
 * values each over twenty units can hardly help looking associated. Forty is
 * where the rank order stops changing as the threshold moves.
 *
 * COCHRAN'S RULE DOES THE REAL WORK, though. Without it the whole ranking was
 * `evidence type` against `evidence type`: those columns run 76 to 96 per cent
 * `policy`, so nearly every cell is empty, the two or three entries that are
 * `study or project` on both fields land in one cell, and chi-squared treats a
 * cell holding 3 where it expected 0.1 as an enormous result. Three of the top
 * four pairs were that, and what they actually report is that one source backs
 * two fields -- a fact about sourcing, not about systems.
 * So a table is rejected when more than a fifth of its cells expect fewer than
 * five, which is the standard condition for chi-squared meaning anything. It
 * removes the lopsided columns from the RANKING only; they stay selectable by
 * hand, because a column that is 97 per cent silent can still be the point.
 */
const PAIR_MIN_N = 40;
const PAIR_MIN_VALUES = 2;

function cramersV(pairs) {
  const rowT = new Map(), colT = new Map(), cell = new Map();
  let n = 0;
  for (const [a, b] of pairs) {
    rowT.set(a, (rowT.get(a) || 0) + 1);
    colT.set(b, (colT.get(b) || 0) + 1);
    const k = a + SEP + b;
    cell.set(k, (cell.get(k) || 0) + 1);
    n++;
  }
  const r = rowT.size, c = colT.size;
  if (n < PAIR_MIN_N || r < PAIR_MIN_VALUES || c < PAIR_MIN_VALUES) return null;
  let chi2 = 0, thin = 0;
  for (const [a, ra] of rowT) for (const [b, cb] of colT) {
    const e = (ra * cb) / n;
    if (e < 5) thin++;
    const o = cell.get(a + SEP + b) || 0;
    chi2 += ((o - e) * (o - e)) / e;
  }
  if (thin / (r * c) > 0.2) return null;
  const v = Math.sqrt(chi2 / (n * Math.min(r - 1, c - 1)));
  return { v: Math.min(1, v), n, r, c };
}

function rankPairs() {
  const coded = VARS.filter(x => x.id.startsWith('c_'));
  const byDomain = new Map();
  for (const x of coded) {
    const d = x.id.split('_')[1];
    if (!byDomain.has(d)) byDomain.set(d, []);
    byDomain.get(d).push(x);
  }
  const out = [];
  for (const [, list] of byDomain) {
    // Read each variable once per row rather than once per pair: ninety
    // columns over four hundred rows is nothing, ninety CHOOSE TWO of them is
    // not.
    const vals = list.map(x => ROWS.map(r => x.of(r)));
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        // Two columns of the SAME field are the same reading split in two, and
        // they crowd out everything else. They are still selectable by hand.
        if (list[i].id.split('_').slice(0, 3).join('_') === list[j].id.split('_').slice(0, 3).join('_')) continue;
        const pairs = [];
        for (let k = 0; k < ROWS.length; k++) {
          const a = vals[i][k], b = vals[j][k];
          if (a == null || b == null) continue;
          pairs.push([a, b]);
        }
        const m = cramersV(pairs);
        if (m) out.push({ x: list[i], y: list[j], ...m });
      }
    }
  }
  out.sort((a, b) => b.v - a.v);
  return out;
}

function renderPairs() {
  const host = $('xpairs');
  if (!host) return;
  const top = rankPairs().slice(0, 10);
  if (!top.length) {
    host.innerHTML = '<p class="xempty">No pair of coded questions has enough entries in common yet.</p>';
    return;
  }
  host.innerHTML = '<p class="xpairlead">Questions that move together, strongest first. '
    + 'This says they are related, not that one causes the other — often it is one instrument being read twice.</p>'
    + '<div class="xpairlist">' + top.map(p =>
      `<button class="xpair" data-x="${esc(p.x.id)}" data-y="${esc(p.y.id)}">
         <span class="xpn">${esc(p.x.label)}</span><span class="xpx">against</span><span class="xpn">${esc(p.y.label)}</span>
         <span class="xpv">V ${p.v.toFixed(2)} · ${p.n} entries</span>
       </button>`).join('') + '</div>';
  host.querySelectorAll('.xpair').forEach(b => b.addEventListener('click', () => {
    $('x').value = b.dataset.x;
    $('y').value = b.dataset.y;
    MODE = 'cross';
    draw();
    $('xout').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));
}

/* ---- asking ---------------------------------------------------------- */

/** The table as plain text. This is the ONLY thing sent for a reading. */
function tableText(xv, yv, t) {
  const lines = [`Rows: ${xv.label}`];
  if (yv) lines.push(`Columns: ${yv.label}`);
  lines.push(`Total entries counted: ${t.counted}`);
  lines.push(t.collapsed ? 'Each place is counted once.' : 'Each place is counted once per map it has an entry on.');
  lines.push('');
  if (!yv) {
    lines.push(`${xv.label}\tcount`);
    t.xs.forEach(([k, n]) => lines.push(`${k}\t${n}`));
  } else {
    lines.push(['', ...t.ys.map(([k]) => k), 'ALL'].join('\t'));
    t.xs.forEach(([xk, xn]) => lines.push([xk, ...t.ys.map(([yk]) => t.cells.get(xk + SEP + yk) || 0), xn].join('\t')));
    lines.push(['ALL', ...t.ys.map(([, n]) => n), t.counted].join('\t'));
  }
  return lines.join('\n');
}

/* How many questions are left, shown next to the box rather than sprung on
   someone at zero. Only below a handful: a full allowance is not news, and a
   counter ticking down from ten on arrival reads as a warning nobody needs. */
function showLeft() {
  const el = $('xleft');
  if (!el) return;
  if (LEFT == null || !MODEL || !MODEL.available) { el.textContent = ''; return; }
  el.textContent = LEFT === 0 ? 'No model questions left for now — the box falls back to word-matching, and the dropdowns are unaffected'
    : LEFT <= 3 ? LEFT + (LEFT === 1 ? ' model question left' : ' model questions left')
    : '';
}

function showReading(state, text, prov) {
  const box = $('xreading');
  box.classList.toggle('hidden', state === 'off');
  box.classList.toggle('thinking', state === 'thinking');
  $('xreadingtext').textContent = text || '';
  $('xreadingprov').textContent = prov || '';
}

async function runQuery() {
  const question = $('xq').value.trim();
  const said = $('xsaid');
  if (!question) return;

  if (MODEL && MODEL.available) {
    said.className = 'xsaid';
    said.textContent = 'Working out which variables answer that…';
    showReading('off');
    try {
      const res = await fetch('/api/ask/select', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question,
          variables: VARS.map(v => ({ id: v.id, label: v.label, group: v.group })),
          scopes: SCOPES.map(s => ({ id: s.id, label: s.label })),
        }),
      });
      const out = await res.json();
      if (typeof out.left === 'number') { LEFT = out.left; showLeft(); }
      if (!res.ok) throw new Error(out.detail || out.error || 'failed');
      if (!out.x) {
        said.className = 'xsaid miss';
        said.textContent = out.why || 'The atlas does not record anything that answers that.';
        return;
      }
      $('x').value = out.x;
      $('y').value = out.y || '';
      $('scope').value = SCOPES.some(s => s.id === out.scope) ? out.scope : 'all';
      const xv = varById(out.x), yv = varById(out.y);
      said.className = 'xsaid';
      said.innerHTML = esc(out.why || '') + ' <b>' + esc(xv.label) + '</b>' + (yv ? ' against <b>' + esc(yv.label) + '</b>' : '');
      draw();
      return readTable(question);
    } catch (err) {
      said.className = 'xsaid miss';
      said.textContent = 'The model could not be reached (' + err.message + '). Falling back to plain matching.';
    }
  }

  const parsed = parseQuery(question);
  showReading('off');
  if (!parsed) {
    said.className = 'xsaid miss';
    said.textContent = 'No variable matched that. Try the dropdowns — everything the atlas can count is in them.';
    return;
  }
  $('x').value = parsed.x.id;
  $('y').value = parsed.y ? parsed.y.id : '';
  $('scope').value = parsed.scope.id;
  said.className = 'xsaid';
  said.innerHTML = 'Showing <b>' + esc(parsed.x.label) + '</b>' +
    (parsed.y ? ' against <b>' + esc(parsed.y.label) + '</b>' : '') +
    (parsed.matchedScope ? ', ' + esc(parsed.scope.label.toLowerCase()) : '') + '.';
  draw();
}

async function readTable(question) {
  const xv = varById($('x').value), yv = varById($('y').value);
  const scope = SCOPES.find(s => s.id === $('scope').value) || SCOPES[0];
  if (!xv) return;
  showReading('thinking', 'Reading the table…');
  try {
    const res = await fetch('/api/ask/read', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question, table: tableText(xv, yv, tabulate(xv, yv, scope)) }),
    });
    const out = await res.json();
    if (typeof out.left === 'number') { LEFT = out.left; showLeft(); }
    if (!res.ok) throw new Error(out.detail || out.error || 'failed');
    showReading('on', out.reading,
      'Written by ' + (MODEL.model || 'a language model') + ' from the table above, which it was given already counted. It has not seen the entries, and every figure it names is in that table.');
  } catch (err) {
    showReading('off');
  }
}

// Provision and policy, not typology. The language-shape variables are the
// showiest thing here and were over-represented in these prompts, which taught
// every first-time visitor that the page is about word order. It is about what
// school systems do.
const EXAMPLES_PARSER = [
  "share of its languages the system names by region",
  "how many languages the country has by share the system names",
  "most recent change by which map",
  "earliest recorded change by region",
];
const EXAMPLES_MODEL = [
  "How much of their own language stock do school systems actually engage with?",
  "Do countries with more languages engage with more of them, or fewer?",
  "When did policy last change, and on which of the four questions?",
  "Which regions have the oldest language-in-education policy on record?",
];

function setMode(m) {
  MODE = m;
  for (const id of ['cross', 'bars', 'units']) $('xm-' + id).setAttribute('aria-pressed', String(id === m));
  draw();
}

export async function mountExplore(payload) {
  PAYLOAD = payload || await fetch('/api/atlas').then(r => r.json());
  ROWS = flatten(PAYLOAD);
  LANGS = flattenLanguages(PAYLOAD);
  VARS = buildVars(PAYLOAD);
  SCOPES = buildScopes(PAYLOAD);

  const groups = [...new Set(VARS.map(v => v.group))];
  const opts = extra => extra + groups.map(g =>
    `<optgroup label="${esc(g)}">` +
    VARS.filter(v => v.group === g).map(v => `<option value="${esc(v.id)}">${esc(v.label)}</option>`).join('') +
    '</optgroup>').join('');
  $('x').innerHTML = opts('');
  $('y').innerHTML = opts('<option value="">— nothing, just count the rows —</option>');
  $('scope').innerHTML = SCOPES.map(s => `<option value="${esc(s.id)}">${esc(s.label)}</option>`).join('');
  $('x').value = 'region';
  $('y').value = 'coverage';
  // Ranking every pair is a one-off sweep over the flattened rows, so it runs
  // after the dropdowns exist and before the first draw. If #xpairs is not on
  // the page -- the archived copy has no such block -- it does nothing.
  renderPairs();

  try { MODEL = await fetch('/api/ask').then(r => r.json()); } catch { MODEL = { available: false }; }
  if (typeof MODEL.left === 'number') LEFT = MODEL.left;
  showLeft();
  if (MODEL.available) {
    $('xq').placeholder = 'How much of their own language stock do school systems actually engage with?';
    $('xasklabel').textContent = 'Ask a question about the maps';
    $('xasknote').innerHTML = 'A model picks which of the ' + VARS.length +
      ' variables answer your question, then reads the finished table. It never counts and never sees the entries, ' +
      'so every figure it names is in the table above it.';
  } else {
    $('xasknote').innerHTML = 'This box matches your words against the ' + VARS.length +
      ' variables below and moves the dropdowns. It cannot produce a figure of its own.';
  }
  const examples = MODEL.available ? EXAMPLES_MODEL : EXAMPLES_PARSER;
  $('xegs').innerHTML = 'Try: ' + examples.map(e => `<button class="xeg" type="button">${esc(e)}</button>`).join(' ');
  $('xegs').addEventListener('click', e => {
    const b = e.target.closest('.xeg');
    if (!b) return;
    $('xq').value = b.textContent;
    runQuery();
  });

  $('xgo').addEventListener('click', runQuery);
  $('xq').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runQuery(); } });
  for (const id of ['x', 'y', 'scope']) $(id).addEventListener('change', draw);
  for (const id of ['cross', 'bars', 'units']) $('xm-' + id).addEventListener('click', () => setMode(id));

  draw();
}
