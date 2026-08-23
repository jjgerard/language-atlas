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
    const RX = [1,.9986,.9954,.99,.9822,.973,.96,.9427,.9216,.8962,.8679,.835,.7986,.7597,.7186,.6732,.6213,.5722,.5322];
    const RY = [0,.062,.124,.186,.248,.31,.372,.434,.4958,.5571,.6176,.6769,.7346,.7903,.8435,.8936,.9394,.9761,1];
    const project = (lon, lat) => {
      const a = Math.min(Math.abs(lat), 90);
      const i = Math.min(Math.floor(a / 5), 17), t = (a - i * 5) / 5;
      const x = RX[i] + (RX[i + 1] - RX[i]) * t, y = RY[i] + (RY[i + 1] - RY[i]) * t;
      return [0.8487 * x * lon * Math.PI / 180 * 1000, -1.3523 * y * (lat < 0 ? -1 : 1) * 1000];
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
