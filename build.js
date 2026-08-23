// Builds the inlined geometry + coverage bundle for the atlas prototype.
// Output: bundle.json  { countries, subunits, dots, domains, units }
const fs = require('fs');
const path = require('path');
const pc = require('polygon-clipping');

// ---------- source geometry ----------
// Downloaded on first build into sources/ (gitignored) and reused after that.
// Natural Earth is public domain; world-atlas is its TopoJSON packaging.
const SOURCES = {
  'world.json':      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
  'iso.json':        'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json',
  'centroids.json':  'https://raw.githubusercontent.com/gavinr/world-countries-centroids/master/dist/countries.geojson',
  'ne50admin1.json': 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/cultural/ne_50m_admin_1_states_provinces.json',
  'ne10admin1.json': 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/cultural/ne_10m_admin_1_states_provinces.json',
};
const SRC_DIR = path.join(__dirname, 'sources');

async function ensureSources() {
  fs.mkdirSync(SRC_DIR, { recursive: true });
  for (const [name, url] of Object.entries(SOURCES)) {
    const dest = path.join(SRC_DIR, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) continue;
    process.stdout.write(`  fetching ${name} ... `);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status} from ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`${(buf.length / 1024).toFixed(0)} KB`);
  }
}
const source = name => JSON.parse(fs.readFileSync(path.join(SRC_DIR, name), 'utf8'));

// The two trackers sit alongside this repo. Override with SEED_ROOT if they
// live somewhere else on your machine.
const REPO = process.env.SEED_ROOT || path.join(__dirname, '..');

// ---------- topojson decode (world-atlas countries-110m) ----------
function decodeTopo(topo, objName) {
  const { scale, translate } = topo.transform;
  const arcs = topo.arcs.map(arc => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
  const ring = idxs => {
    const out = [];
    for (const i of idxs) {
      const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
      out.push(...(out.length ? a.slice(1) : a));
    }
    return out;
  };
  return topo.objects[objName].geometries.map(g => {
    let polys;
    if (g.type === 'Polygon') polys = [g.arcs.map(ring)];
    else if (g.type === 'MultiPolygon') polys = g.arcs.map(p => p.map(ring));
    else polys = [];
    return { id: g.id, name: g.properties && g.properties.name, polys };
  });
}

// ---------- geometry helpers ----------
const ringArea = r => {
  let a = 0;
  for (let i = 0, n = r.length; i < n; i++) {
    const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % n];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
};

// Round to `dp` decimals and drop consecutive duplicates; discard rings that
// collapse below 4 distinct points or below a minimum area (in square degrees).
function simplify(polys, dp, minArea) {
  const f = Math.pow(10, dp);
  const out = [];
  for (const poly of polys) {
    const rings = [];
    for (const r of poly) {
      if (ringArea(r) < minArea) continue;
      const pts = [];
      let px = null, py = null;
      for (const [x, y] of r) {
        const rx = Math.round(x * f) / f, ry = Math.round(y * f) / f;
        if (rx === px && ry === py) continue;
        pts.push([rx, ry]); px = rx; py = ry;
      }
      if (pts.length >= 4) rings.push(pts);
    }
    if (rings.length) out.push(rings);
  }
  return out;
}

const bboxOf = polys => {
  let x0 = 180, y0 = 90, x1 = -180, y1 = -90;
  for (const p of polys) for (const r of p) for (const [x, y] of r) {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return [x0, y0, x1, y1];
};

const totalArea = polys =>
  polys.reduce((s, p) => s + (p.length ? ringArea(p[0]) : 0), 0);

// polygon-clipping wants [[ring, hole...], ...]; union dissolves shared edges.
function dissolve(featurePolys, dp = 3) {
  const f = Math.pow(10, dp);
  const snap = ([x, y]) => [Math.round(x * f) / f, Math.round(y * f) / f];
  const flat = featurePolys
    .filter(p => p.length)
    .map(p => p.map(r => {
      const out = [];
      let px = null, py = null;
      for (const c of r) {
        const [x, y] = snap(c);
        if (x === px && y === py) continue;
        out.push([x, y]); px = x; py = y;
      }
      // union() needs each ring closed and non-degenerate
      if (out.length >= 3) out.push(out[0].slice());
      return out;
    }).filter(r => r.length >= 4));
  if (!flat.length) return [];
  try {
    return pc.union(...flat.map(p => [p]));
  } catch (e) {
    // Union is only a cosmetic step (it removes internal district borders);
    // falling back to the un-dissolved parts still renders the right area.
    console.warn('  dissolve failed, keeping undissolved parts:', e.message);
    return flat;
  }
}

// Rings that cross the antimeridian arrive with longitudes on both sides of
// +/-180. Drawn on a flat projection they smear right across the map, so
// unwrap each ring into continuous longitude, then cut it back into 360-wide
// strips and slide each strip home.
function unwrapRing(ring) {
  const out = [ring[0].slice()];
  for (let i = 1; i < ring.length; i++) {
    let x = ring[i][0];
    const prev = out[i - 1][0];
    while (x - prev > 180) x -= 360;
    while (prev - x > 180) x += 360;
    out.push([x, ring[i][1]]);
  }
  return out;
}
function splitAntimeridian(polys) {
  const out = [];
  for (const poly of polys) {
    const rings = poly.map(unwrapRing);
    let mn = Infinity, mx = -Infinity;
    for (const r of rings) for (const [x] of r) { if (x < mn) mn = x; if (x > mx) mx = x; }
    if (mn >= -180.001 && mx <= 180.001) { out.push(poly); continue; }
    const k0 = Math.floor((mn + 180) / 360), k1 = Math.floor((mx + 180) / 360);
    for (let k = k0; k <= k1; k++) {
      const lo = -180 + 360 * k, hi = 180 + 360 * k;
      const box = [[[lo, -90], [hi, -90], [hi, 90], [lo, 90], [lo, -90]]];
      let clipped;
      try { clipped = pc.intersection(rings, box); } catch (e) { continue; }
      for (const cp of clipped) out.push(cp.map(r => r.map(([x, y]) => [x - 360 * k, y])));
    }
  }
  return out;
}

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
const DF = new Map();
let DF_N = 0;
function indexLabel(label) {
  DF_N++;
  for (const t of new Set(histTokens(label))) DF.set(t, (DF.get(t) || 0) + 1);
}
const idf = t => Math.log(DF_N / (1 + (DF.get(t) || 0)));

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
// Both grades require the rarest shared term to be genuinely rare — present in
// at most four of the corpus's source labels. That is what keeps Israel's 1988
// Special Education Law off an unrelated Supreme Court case, which shares only
// "special" and "education", and off an OECD autism report, which shares only
// the ordinary word "therapy".
const HIST_MIN_SCORE = 5.0;
const HIST_PEAK_MIN = 4.4;
const YEAR_BONUS = 1.5;

function matchHistoryDocs(row, docLinks) {
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
    let score = 0, shared = 0, peak = 0, lone = '';
    for (const t of new Set(histTokens(d.label))) {
      if (!hTok.has(t)) continue;
      const w = idf(t);
      score += w; shared++; lone = t;
      if (w > peak) peak = w;
    }
    if (!shared || peak < HIST_PEAK_MIN) continue;
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

function geojsonPolys(geom) {
  if (!geom) return [];
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

async function main() {
  // ---------- ISO numeric -> alpha-2 ----------
  const iso = source('iso.json');
  const numToA2 = {};
  for (const r of iso) numToA2[String(Number(r['country-code']))] = r['alpha-2'];

  // ---------- base countries ----------
  console.log('decoding world-110m...');
  const world = source('world.json');
  const raw = decodeTopo(world, 'countries');

  const SKIP = new Set(['AQ']); // Antarctica: no entries, visually dominant
  const countries = {};
  for (const g of raw) {
    const a2 = numToA2[String(Number(g.id))];
    if (!a2 || SKIP.has(a2)) continue;
    const polys = simplify(splitAntimeridian(g.polys), 2, 0.02);
    if (!polys.length) continue;
    countries[a2] = { name: g.name, polys, bbox: bboxOf(polys), area: totalArea(polys) };
  }
  console.log('  countries with geometry:', Object.keys(countries).length);

  // ---------- detached territories ----------
  // A polygon that belongs to a country's geometry but is not the place people
  // mean by that country's name. It carries its own label and inherits the
  // parent's entry, which is the same rule sub-national units follow.
  const TERRITORIES = [
    { cc: 'FR', name: 'French Guiana', within: [-56, 1, -50, 7],
      note: 'An overseas department of France, on the South American mainland. French national policy applies to it unless something separate is documented.' },
  ];
  const territories = [];
  for (const t of TERRITORIES) {
    const c = countries[t.cc];
    if (!c) { console.warn('  territory parent missing:', t.cc); continue; }
    const [wx0, wy0, wx1, wy1] = t.within;
    const mine = [], rest = [];
    for (const poly of c.polys) {
      const [x0, y0, x1, y1] = bboxOf([poly]);
      (x0 >= wx0 && x1 <= wx1 && y0 >= wy0 && y1 <= wy1 ? mine : rest).push(poly);
    }
    if (!mine.length) { console.warn('  no polygon matched territory', t.name); continue; }
    c.polys = rest;
    c.bbox = bboxOf(rest);
    c.area = totalArea(rest);
    territories.push({ cc: t.cc, name: t.name, note: t.note, polys: mine, bbox: bboxOf(mine) });
    console.log('  territory', t.name, 'split from', t.cc, '-', mine.length, 'polygon(s)');
  }

  // ---------- sub-national overlays ----------
  // Only for units that actually have their own entry — splitting is
  // demand-driven, so an unsplit region keeps showing the national fill.
  const subunits = {}; // "GB:Northern Ireland" -> {polys,bbox,area}

  console.log('reading 50m admin-1 (AU/CA/US)...');
  const a50 = source('ne50admin1.json');
  const WANT_50 = {
    AU: ['New South Wales', 'Queensland', 'South Australia', 'Victoria', 'Western Australia'],
    CA: ['Alberta', 'British Columbia', 'Manitoba', 'Nova Scotia', 'Ontario', 'Québec'],
    US: ['California', 'Illinois', 'New York', 'Texas', 'Washington'],
  };
  const RENAME = { 'Québec': 'Quebec' };
  for (const [cc, names] of Object.entries(WANT_50)) {
    for (const name of names) {
      const f = a50.features.find(x => x.properties.iso_a2 === cc && x.properties.name === name);
      if (!f) { console.warn('  MISSING 50m', cc, name); continue; }
      const polys = simplify(geojsonPolys(f.geometry), 2, 0.02);
      const key = cc + ':' + (RENAME[name] || name);
      subunits[key] = { polys, bbox: bboxOf(polys), area: totalArea(polys) };
    }
  }

  console.log('reading 10m admin-1 (GB nations, Catalonia)... [large file]');
  const a10 = source('ne10admin1.json');

  // GB: dissolve districts into the four nations via `geonunit`.
  for (const nation of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
    const parts = a10.features
      .filter(f => f.properties.iso_a2 === 'GB' && f.properties.geonunit === nation)
      .flatMap(f => geojsonPolys(f.geometry));
    console.log('  GB', nation, parts.length, 'parts');
    const merged = dissolve(parts);
    const polys = simplify(merged, 2, 0.004);
    subunits['GB:' + nation] = { polys, bbox: bboxOf(polys), area: totalArea(polys) };
  }

  // ES: Catalonia = union of its four provinces.
  {
    const parts = a10.features
      .filter(f => f.properties.iso_a2 === 'ES' && /catal/i.test(f.properties.region || ''))
      .flatMap(f => geojsonPolys(f.geometry));
    console.log('  ES Catalonia', parts.length, 'parts');
    const polys = simplify(dissolve(parts), 2, 0.004);
    subunits['ES:Catalonia'] = { polys, bbox: bboxOf(polys), area: totalArea(polys) };
  }

  // ---------- centroids (for dots on units with no usable polygon) ----------
  const cen = source('centroids.json');
  const centroid = {};
  for (const f of cen.features) centroid[f.properties.ISO] = f.geometry.coordinates;
  // A few the source names differently or omits.
  Object.assign(centroid, {
    HK: [114.15, 22.35], PS: [35.24, 31.93], VA: [12.45, 41.90],
    SG: [103.82, 1.35], MC: [7.42, 43.74], SM: [12.46, 43.94],
  });

  // ---------- coverage data from the two trackers ----------
  const NOT_DOCUMENTED_RE = /^Not established from the sources consulted/i;

  // Some fields are arrays of dated records ({year, description} for
  // policyHistory, {year, value, note} for the prevalence/proportion fields).
  // An array counts as documented when it has entries; the sentinel phrase
  // only ever appears in the free-text fields.
  const asText = v => {
    if (Array.isArray(v)) {
      return v.map(r => [r.year, r.value, r.description || r.note].filter(Boolean).join(' — ')).join('\n');
    }
    return typeof v === 'string' ? v : (v == null ? '' : String(v));
  };
  const hasContent = v => {
    if (Array.isArray(v)) return v.length > 0;
    const t = asText(v).trim();
    return !!t && !NOT_DOCUMENTED_RE.test(t);
  };
  const isNotEstablished = v => !Array.isArray(v) && NOT_DOCUMENTED_RE.test(asText(v).trim());

  const DOMAINS = [
    {
      id: 'eal',
      label: 'Majority language acquisition',
      blurb: 'Support for children who arrive at school without the language it teaches in — known in schools as EAL.',
      live: true,
      seed: 'eal-policy-tracker/data/seed.json',
      fields: [
        ['newcomerCriteria', 'Newcomer criteria'],
        ['removalCriteria', 'Removal criteria'],
        ['newcomerProportion', 'Newcomer proportion'],
        ['l2Support', 'L2 support'],
        ['l1Support', 'L1 support'],
        ['l3Support', 'L3 support'],
        ['bilingualEducationNotes', 'Bilingual education'],
        ['policyHistory', 'Policy history'],
      ],
    },
    {
      id: 'dld',
      label: 'Language disorder support',
      blurb: 'Children with a lasting difficulty learning and using language: how it is identified, and what they are entitled to. Known in research as DLD.',
      live: true,
      seed: 'dld-policy-tracker/data/seed.json',
      fields: [
        ['terminology', 'Terminology'],
        ['identificationCriteria', 'Identification criteria'],
        ['assessments', 'Assessments'],
        ['multilingualProvision', 'Multilingual provision'],
        ['referralPathway', 'Referral pathway'],
        ['serviceModel', 'Service model'],
        ['legalEntitlement', 'Legal entitlement'],
        ['funding', 'Funding'],
        ['workforce', 'Workforce'],
        ['dischargeCriteria', 'Discharge criteria'],
        ['outcomesEvidence', 'Outcomes evidence'],
        ['identifiedPrevalence', 'Identified prevalence'],
        ['policyHistory', 'Policy history'],
      ],
    },
    { id: 'fl', label: 'Foreign languages in school', blurb: 'Compulsory or optional language learning by phase.', live: false, planned: true },
    { id: 'adult', label: 'Majority language for adults', blurb: 'Classes and entitlements for adults who move to a country, rather than children in its schools.', live: false, planned: true },
    { id: 'ling', label: 'Studying language itself', blurb: 'Where linguistics can be studied, in secondary school and beyond.', live: false, planned: true },
  ];

  // Index every source label first — idf needs the whole corpus.
  for (const d of DOMAINS) {
    if (!d.live) continue;
    for (const e of JSON.parse(fs.readFileSync(path.join(REPO, d.seed), 'utf8')).S) {
      for (const l of e.docLinks || []) if (l && l.label) indexLabel(l.label);
    }
  }
  console.log('  source labels indexed:', DF_N, '| distinct terms:', DF.size);

  const units = {}; // domainId -> [unit]
  for (const d of DOMAINS) {
    if (!d.live) { units[d.id] = []; continue; }
    const rows = JSON.parse(fs.readFileSync(path.join(REPO, d.seed), 'utf8')).S;
    units[d.id] = rows.map(e => {
      const filled = [], looked = [], empty = [];
      for (const [k, label] of d.fields) {
        if (hasContent(e[k])) filled.push(label);
        else if (isNotEstablished(e[k])) looked.push(label);
        else empty.push(label);
      }
      const coverage = filled.length ? 'has' : (looked.length ? 'looked' : 'none');
      // One char per field, in `d.fields` order: h = documented, l = looked and
      // found nothing, n = nothing recorded. Lets the map colour by a single
      // indicator rather than only by "anything at all".
      const fieldStates = d.fields
        .map(([k]) => hasContent(e[k]) ? 'h' : (isNotEstablished(e[k]) ? 'l' : 'n'))
        .join('');
      // Every field's text travels with the unit: the panel shows the whole
      // entry, not a teaser.
      const values = {};
      for (const [k] of d.fields) {
        const t = asText(e[k]).trim();
        if (t) values[k] = t;
      }
      return {
        cc: e.countryCode,
        name: e.unitName,
        nat: !!e.isNational,
        region: e.region,
        subregion: e.subregion || '',
        status: e.status,
        confidence: e.confidence,
        lastVerified: e.lastVerified || '',
        coverage,
        fieldStates,
        filled, looked,
        nFields: d.fields.length,
        docs: (e.docLinks || []).length,
        supports: (e.supportLinks || []).length,
        values,
        history: (e.policyHistory || []).map(h => ({
          year: h.year, description: h.description,
          links: matchHistoryDocs(h, e.docLinks),
        })),
        docLinks: (e.docLinks || []).filter(l => l && l.url),
        supportLinks: (e.supportLinks || []).filter(l => l && l.url),
        collaborators: (e.collaborators || []).map(c => c.name).filter(Boolean),
      };
    });
  }

  // ---------- dots: units whose geometry is too small (or absent) to click ----------
  const AREA_MIN = 3.0; // square degrees
  const dots = {};
  const allCCs = new Set();
  for (const d of DOMAINS) for (const u of units[d.id] || []) allCCs.add(u.cc);
  for (const cc of allCCs) {
    const c = countries[cc];
    if (c && c.area >= AREA_MIN) continue;
    const pt = centroid[cc] || (c ? [(c.bbox[0] + c.bbox[2]) / 2, (c.bbox[1] + c.bbox[3]) / 2] : null);
    if (!pt) { console.warn('  no anchor for', cc); continue; }
    dots[cc] = pt;
  }
  console.log('  dot-rendered units:', Object.keys(dots).length);

  // Report so the matching can be checked rather than trusted.
  {
    let rows = 0, linked = 0;
    const unmatched = [];
    for (const d of DOMAINS.filter(x => x.live)) for (const u of units[d.id]) {
      for (const h of u.history) {
        rows++;
        if (h.links.length) linked++;
        else if (unmatched.length < 6) unmatched.push(`${d.id} ${u.cc}/${u.name} [${h.year}] ${String(h.description).slice(0, 60)}`);
      }
    }
    console.log(`  policy-history rows: ${rows}, linked to a document: ${linked}`);
    unmatched.forEach(x => console.log('    unlinked e.g.:', x));
  }

  const bundle = {
    countries, subunits, dots, units, territories,
    domains: DOMAINS.map(({ seed, fields, ...rest }) =>
      ({ ...rest, fields: (fields || []).map(([k, label]) => ({ k, label })) })),
  };
  fs.writeFileSync('bundle.json', JSON.stringify(bundle));
  console.log('bundle.json', (fs.statSync('bundle.json').size / 1024).toFixed(0), 'KB');

}

ensureSources().then(main).catch(err => {
  console.error(err.message);
  process.exit(1);
});
