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

let PAYLOAD = null, ROWS = [], VARS = [], SCOPES = [], MODE = 'cross', MODEL = null, LEFT = null;

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
      };
      rows.push(row);
      if (!perUnit.has(key)) perUnit.set(key, {});
      perUnit.get(key)[d.id] = row;
    }
  }
  for (const r of rows) r.siblings = perUnit.get(r.key);
  return rows;
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
function buildVars(payload) {
  const v = [];
  const push = (id, label, group, of, unit) => v.push({ id, label, group, of, unit: !!unit });

  push('region', 'Region', 'Where', r => r.region, true);
  push('subregion', 'Sub-region', 'Where', r => r.subregion, true);
  push('level', 'National or sub-national', 'Where', r => r.national ? 'A country' : 'Inside a country', true);

  push('domain', 'Which map', 'The entry', r => r.domainLabel);
  push('coverage', 'Coverage', 'The entry', r => COVER_LABEL[r.coverage] || r.coverage);
  push('status', 'Status', 'The entry', r => r.status);
  push('confidence', 'Confidence', 'The entry', r => r.confidence ? r.confidence.replace(/-/g, ' ') : 'not recorded');
  push('filledcount', 'How many fields filled', 'The entry',
    r => band([...r.fieldStates].filter(c => c === 'h').length, [0, 2, 5, 9], ['None', '1 to 2', '3 to 5', '6 to 9', '10 or more']));
  push('hashistory', 'Has a policy timeline', 'The entry', r => r.history ? 'Yes' : 'No');
  push('historycount', 'How many dated rows', 'The entry',
    r => band(r.history, [0, 2, 5, 10], ['None', '1 to 2', '3 to 5', '6 to 10', 'More than 10']));
  push('sourcecount', 'How many sources cited', 'The entry',
    r => band(r.sources, [0, 1, 3, 6], ['None', 'One', '2 to 3', '4 to 6', 'More than 6']));

  push('nmaps', 'Documented on how many maps', 'Across the maps', r => {
    const n = Object.values(r.siblings).filter(s => s.coverage === 'has' || s.coverage === 'some').length;
    return n + (n === 1 ? ' map' : ' maps');
  }, true);
  for (const d of payload.domains) {
    push('on_' + d.id, 'Documented on: ' + d.label, 'Across the maps', r => {
      const s = r.siblings[d.id];
      if (!s) return null;
      return (s.coverage === 'has' || s.coverage === 'some') ? 'Yes' : 'No';
    }, true);
  }
  for (const d of payload.domains) {
    (d.fields || []).forEach((f, i) => {
      push('f_' + d.id + '_' + f.k, d.label + ' — ' + f.label, 'A single field', r => {
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
  return s;
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

  const pick = words => {
    if (!words.length) return null;
    let best = null, bestScore = 0;
    for (const v of VARS) {
      const s = score(v, words);
      if (s > bestScore) { bestScore = s; best = v; }
    }
    return bestScore > 0 ? best : null;
  };

  let x = null, y = null;
  if (parts.length >= 2) { y = pick(parts[0]); x = pick(parts.slice(1).flat()); }
  if (!x && !y) x = pick(allWords);
  if (x && y && x.id === y.id) y = null;
  if (!x && y) { x = y; y = null; }
  return x ? { x, y, scope, matchedScope: hit } : null;
}

/* ---- counting -------------------------------------------------------- */
function tabulate(xv, yv, keep) {
  let rows = ROWS.filter(keep);
  // Both variables describe the place rather than one map entry, so each place
  // is counted once. Without this, "documented on the indigenous map against
  // documented on the disorder map" over 193 countries reported 772 — every
  // country counted once per map, reading as a sample four times the real one.
  const collapsed = xv.unit && (!yv || yv.unit);
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

function renderUnits(xv, yv, keep) {
  const groups = new Map();
  for (const r of ROWS.filter(keep)) {
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
  const t = tabulate(xv, yv, scope.keep);
  const out = $('xout');
  if (MODE === 'units') out.innerHTML = renderUnits(xv, yv, scope.keep);
  else if (MODE === 'bars') out.innerHTML = renderBars(tabulate(xv, null, scope.keep));
  else out.innerHTML = renderCross(xv, yv, t);

  const bits = [`<b>${t.counted}</b> entries counted`];
  if (scope.id !== 'all') bits.push(`limited to ${esc(scope.label.toLowerCase())}`);
  if (t.dropped) bits.push(`<b>${t.dropped}</b> left out because the variable does not apply to them`);
  $('xsummary').innerHTML = bits.join(' · ') + '. ' + (t.collapsed
    ? 'Both of those describe the place rather than one map, so each place is counted once.'
    : 'An entry appears once per map it exists on, so a country documented on three maps is counted three times here.');
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
      body: JSON.stringify({ question, table: tableText(xv, yv, tabulate(xv, yv, scope.keep)) }),
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

const EXAMPLES_PARSER = [
  'coverage by region', 'documented on how many maps by region',
  'policy timeline by which map', 'confidence by coverage',
];
const EXAMPLES_MODEL = [
  'Which regions are best covered?',
  'Are the places with a disorder entry also the ones with an indigenous entry?',
  'Do entries with a policy timeline tend to be better documented?',
  'Where is the atlas thinnest?',
];

function setMode(m) {
  MODE = m;
  for (const id of ['cross', 'bars', 'units']) $('xm-' + id).setAttribute('aria-pressed', String(id === m));
  draw();
}

export async function mountExplore(payload) {
  PAYLOAD = payload || await fetch('/api/atlas').then(r => r.json());
  ROWS = flatten(PAYLOAD);
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

  try { MODEL = await fetch('/api/ask').then(r => r.json()); } catch { MODEL = { available: false }; }
  if (typeof MODEL.left === 'number') LEFT = MODEL.left;
  showLeft();
  if (MODEL.available) {
    $('xq').placeholder = 'Are the places that record a language disorder the same ones that record indigenous languages?';
    $('xasklabel').textContent = 'Ask a question about the maps';
    $('xasknote').innerHTML = 'A model reads your question and picks which of the ' + VARS.length +
      ' variables answer it, then writes a reading of the table. It never sees the entries and never counts: ' +
      'the browser does the counting and the model is handed the finished table, so every figure it mentions is above it.';
  } else {
    $('xasknote').innerHTML = 'This box matches your words against the ' + VARS.length +
      ' variables below and moves the dropdowns. It cannot produce a figure of its own — ' +
      'every number here is counted from the entries either way.';
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
