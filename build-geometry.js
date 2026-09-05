// Builds the map geometry. Coverage data is NOT built here — it is derived at
// request time from the trackers' live catalogs (see src/catalog.js), so this
// runs only when the shapes themselves change.
// Output: public/geometry.json { countries, subunits, territories, anchors }
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
  // Where a country's school system is run below the national level, the map
  // carves it up. This used to be a hand-written list of the five or six units
  // that happened to have entries, which quietly made the geometry the limit on
  // what could ever be documented: there was no way to add a US state without
  // editing this file. It now takes EVERY admin-1 unit of the listed countries,
  // so adding a country here is the whole job and the data files decide which
  // units actually have something to say.
  //
  // Natural Earth's names are not always current, and its India predates
  // several changes: Telangana (2014) and Ladakh (2019) have no polygon in this
  // source at all, so they cannot be units yet. RENAME fixes the ones that are
  // only out of date rather than missing.
  const subunits = {}; // "GB:Northern Ireland" -> {polys,bbox,area}

  const RENAME = {
    'Québec': 'Quebec',
    'Orissa': 'Odisha',                                  // renamed 2011
    'Uttaranchal': 'Uttarakhand',                        // renamed 2007
    'Andaman and Nicobar': 'Andaman and Nicobar Islands',
    'Inner Mongol': 'Inner Mongolia',
    'Xizang': 'Tibet',
  };
  // Not education systems in their own right: disputed islands with no
  // population to school, and Jervis Bay, which the ACT administers.
  const SKIP_UNITS = new Set(['Paracel Islands', 'Spratly Islands', 'Jervis Bay Territory']);
  // Merged in 2020. Natural Earth still has them apart, so they are unioned
  // back into the union territory that actually runs schools today.
  const MERGE = {
    IN: [{ into: 'Dadra and Nagar Haveli and Daman and Diu',
           from: ['Dadra and Nagar Haveli', 'Daman and Diu'] }],
  };

  function addSubunits(features, cc, dp, minArea) {
    let n = 0;
    for (const m of MERGE[cc] || []) {
      const parts = features
        .filter(f => m.from.includes(f.properties.name))
        .flatMap(f => geojsonPolys(f.geometry));
      if (!parts.length) { console.warn('  MERGE found nothing:', cc, m.into); continue; }
      const polys = simplify(dissolve(parts), dp, minArea);
      if (polys.length) { subunits[cc + ':' + m.into] = { polys, bbox: bboxOf(polys), area: totalArea(polys) }; n++; }
    }
    const merged = new Set((MERGE[cc] || []).flatMap(m => m.from));
    for (const f of features) {
      const raw = f.properties.name;
      if (!raw || SKIP_UNITS.has(raw) || merged.has(raw)) continue;
      const polys = simplify(geojsonPolys(f.geometry), dp, minArea);
      if (!polys.length) { console.warn('  EMPTY after simplify:', cc, raw); continue; }
      subunits[cc + ':' + (RENAME[raw] || raw)] = { polys, bbox: bboxOf(polys), area: totalArea(polys) };
      n++;
    }
    console.log('  ' + cc, n, 'units');
  }

  console.log('reading 50m admin-1 (AU/CA/US)...');
  const a50 = source('ne50admin1.json');
  // minArea is far below the 0.02 used for countries: a small state is still a
  // school system, and District of Columbia at ~0.02 square degrees was being
  // dropped silently by the country threshold.
  for (const cc of ['AU', 'CA', 'US']) {
    addSubunits(a50.features.filter(x => x.properties.iso_a2 === cc), cc, 2, 0.001);
  }

  console.log('reading 10m admin-1 (GB nations, Catalonia, IN, CN)... [large file]');
  const a10 = source('ne10admin1.json');

  // India and China are only in the 10m file, and only under `admin` — their
  // iso_a2 is unset there. Simplified harder than the 50m set: these are large
  // shapes read at continental zoom, and the detail is all cost and no signal.
  // dp=1 (about 11 km) rather than the 2 used elsewhere. The 10m source carries
  // far more vertices than any of these get drawn with — China alone came to
  // 667 KB at dp=2, more than four times the whole country layer — and at
  // continental zoom the extra precision is invisible.
  for (const [cc, admin] of [['IN', 'India'], ['CN', 'China']]) {
    addSubunits(a10.features.filter(x => x.properties.admin === admin), cc, 1, 0.001);
  }

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

  // ES: the seventeen autonomous communities, which run their own schools.
  //
  // This went through two wrong answers before the right one. Catalonia alone
  // said something untrue about Spain. Then the six communities with a
  // co-official language -- better, but it was answering the wrong question,
  // because it tested LANGUAGE regime when the atlas asks five questions and
  // only one of them is about which languages a place recognises.
  //
  // The test that matches what this map already does is whether the EDUCATION
  // SYSTEM is run below the national level, and in Spain it is: education is
  // fully devolved to all seventeen communities. Madrid and Murcia have no
  // co-official language and still set their own foreign-language sequence,
  // their own newcomer provision, and their own special-education criteria --
  // three of the five maps, before language status is reached at all. That is
  // the same reason the United States, Canada, Australia, India, China and the
  // United Kingdom are split, and none of those is about a minority language.
  //
  // Ceuta and Melilla are excluded, and their exclusion is the proof the rule
  // is doing work rather than being drawn around an answer: they are the only
  // two Spanish territories whose schools the Ministry still runs directly, so
  // they have no education system of their own to record.
  const ES_NAME = {
    'Andalucía': 'Andalusia', 'Aragón': 'Aragon', 'Canary Is.': 'Canary Islands',
    'Castilla y León': 'Castile and León', 'Castilla-La Mancha': 'Castile-La Mancha',
    'Cataluña': 'Catalonia', 'Foral de Navarra': 'Navarre',
    'Islas Baleares': 'Balearic Islands', 'País Vasco': 'Basque Country',
    'Valenciana': 'Valencian Community',
  };
  const ES_MINISTRY_RUN = new Set(['Ceuta', 'Melilla']);
  {
    const byRegion = {};
    for (const f of a10.features) {
      if (f.properties.iso_a2 !== 'ES') continue;
      const r = f.properties.region;
      if (!r || ES_MINISTRY_RUN.has(r)) continue;
      const name = ES_NAME[r] || r;
      (byRegion[name] = byRegion[name] || []).push(...geojsonPolys(f.geometry));
    }
    for (const [name, parts] of Object.entries(byRegion)) {
      const polys = simplify(dissolve(parts), 2, 0.004);
      if (!polys.length) { console.warn('  ES: nothing left after simplify:', name); continue; }
      subunits['ES:' + name] = { polys, bbox: bboxOf(polys), area: totalArea(polys) };
    }
    console.log('  ES', Object.keys(byRegion).length, 'autonomous communities');
  }

  // DE: the sixteen Länder, which hold education outright.
  //
  // The clearest case in Europe for the same rule. Schooling is a Land matter
  // in full -- which foreign language is taught first and from which year, what
  // a newly arrived child is entitled to, how special educational need is
  // assessed, what a Land's universities require -- and the Kultusminister-
  // konferenz exists precisely because there is no federal answer to
  // coordinate around.
  {
    const before = Object.keys(subunits).length;
    addSubunits(a10.features.filter(x => x.properties.iso_a2 === 'DE'), 'DE', 2, 0.002);
    console.log('  DE', Object.keys(subunits).length - before, 'Länder');
  }

  // ET: the regional states, which choose their own medium of instruction.
  // Eleven units, already coarse, and the variation is as radical as anywhere
  // in the atlas -- Oromiya schools in Afaan Oromo, Tigray in Tigrinya, the
  // Southern Nations region in dozens of languages.
  {
    const before = Object.keys(subunits).length;
    addSubunits(a10.features.filter(x => x.properties.iso_a2 === 'ET'), 'ET', 2, 0.004);
    console.log('  ET', Object.keys(subunits).length - before, 'regional states');
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


  // ---------- anchors for units too small (or absent) to click ----------
  // Which countries actually have entries is a runtime question now, so ship a
  // centroid for every code we can resolve and let the page decide what needs
  // a marker. `area` on each country tells it how small the shape is.
  const AREA_MIN = 3.0; // square degrees: below this, a shape needs a marker
  const anchors = {};
  for (const r of iso) {
    const cc = r['alpha-2'];
    const c = countries[cc];
    const pt = centroid[cc] || (c ? [(c.bbox[0] + c.bbox[2]) / 2, (c.bbox[1] + c.bbox[3]) / 2] : null);
    if (pt) anchors[cc] = [+pt[0].toFixed(3), +pt[1].toFixed(3)];
  }
  for (const cc of Object.keys(centroid)) {
    if (!anchors[cc]) anchors[cc] = [+centroid[cc][0].toFixed(3), +centroid[cc][1].toFixed(3)];
  }
  console.log('  anchors:', Object.keys(anchors).length,
              '| countries below the marker threshold:',
              Object.values(countries).filter(c => c.area < AREA_MIN).length);

  // ---------- decorative silhouette for the home page ----------
  // One path, no interactivity, simplified far harder than the map itself:
  // the home page should not pay 352 KB for a background.
  {
    // Equal Earth (Šavrič, Patterson & Jenny 2018), the same projection the
    // map itself uses. This silhouette had its OWN copy of Robinson, so the
    // home page and the maps behind it disagreed about the shape of the world
    // until this was changed too -- the hazard of a formula living in two
    // files. It is decoration, but it is decoration of the same thing.
    const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796;
    const M = Math.sqrt(3) / 2, K = 985;
    const project = (lon, lat) => {
      const phi = Math.max(-90, Math.min(90, lat)) * Math.PI / 180;
      const l = Math.asin(M * Math.sin(phi));
      const l2 = l * l, l6 = l2 * l2 * l2;
      const x = lon * Math.PI / 180 * Math.cos(l) /
                (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)));
      const y = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2));
      return [x * K, -y * K];
    };
    let d = '';
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    // Only landmasses big enough to read at background size, and every third
    // vertex of those: this is scenery, not data.
    const coarse = simplify(Object.values(countries).flatMap(c => c.polys), 1, 4);
    for (const poly of coarse) for (const ring of poly) {
      if (ring.length < 8) continue;
      for (let i = 0; i < ring.length; i += 3) {
        const [px, py] = project(ring[i][0], ring[i][1]);
        d += (i ? 'L' : 'M') + px.toFixed(0) + ' ' + py.toFixed(0);
        if (px < x0) x0 = px; if (px > x1) x1 = px;
        if (py < y0) y0 = py; if (py > y1) y1 = py;
      }
      d += 'Z';
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0.toFixed(0)} ${y0.toFixed(0)} ${(x1-x0).toFixed(0)} ${(y1-y0).toFixed(0)}" preserveAspectRatio="xMidYMid meet"><path fill="currentColor" d="${d}"/></svg>`;
    const sp = path.join(__dirname, 'public', 'world.svg');
    fs.writeFileSync(sp, svg);
    console.log('  public/world.svg', (fs.statSync(sp).size / 1024).toFixed(0), 'KB');
  }

  // ---------- country names, on their own, for pages that need only those ----
  // The submission form asks for a country by NAME and derives its code, so a
  // contributor never has to know that Sweden is SE. geometry.json carries the
  // names but is 909 KB, which is not a reasonable price for a form; and the
  // atlas API cannot supply them either, because it only knows places that are
  // ENTRIES. The United Kingdom is the case that proves it: it is on the map
  // as four nations and has no national entry, so a form built from entries
  // alone could not offer it at all.
  {
    const names = {};
    for (const [cc, c] of Object.entries(countries)) if (c.name) names[cc] = c.name;
    const cp = path.join(__dirname, 'public', 'countries.json');
    fs.writeFileSync(cp, JSON.stringify(names) + String.fromCharCode(10));
    console.log('  public/countries.json', Object.keys(names).length, 'names,',
                (fs.statSync(cp).size / 1024).toFixed(0), 'KB');
  }

  const geometry = { countries, subunits, territories, anchors, areaMin: AREA_MIN };
  const out = path.join(__dirname, 'public', 'geometry.json');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(geometry));
  console.log('  public/geometry.json', (fs.statSync(out).size / 1024).toFixed(0), 'KB');
}

ensureSources().then(main).catch(err => {
  console.error(err.message);
  process.exit(1);
});
