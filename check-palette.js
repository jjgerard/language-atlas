// Verify the map's coverage ramp is still readable with colour-vision deficiency.
//
//     node check-palette.js
//
// Run this after touching any --cov-* or --nodata value in public/shared.css.
// The values are PARSED FROM THAT FILE rather than duplicated here, so this
// cannot drift into checking a palette the site no longer uses.
//
// What it enforces, and why each one matters:
//
//   1. Lightness is monotonic across the five steps. This is what carries the
//      ramp for a reader who cannot separate the hues at all — full
//      monochromacy, a greyscale print, a projector with the colour dying.
//      Hue is a bonus; lightness is the actual signal.
//
//   2. Adjacent steps stay apart under simulated protanopia, deuteranopia and
//      tritanopia. A ramp can be perfectly monotonic and still collapse in the
//      middle for one deficiency.
//
//   3. --cov-1 stays apart from --nodata. This is the check that caught a real
//      defect: --nodata used to sit at almost exactly --cov-1's lightness and
//      differ only in chroma, which is the one thing colour deficiency takes
//      away. Simulated deuteranopia put them 3.7 dE apart, so "nothing is
//      recorded here" and "a little is recorded here" — opposite claims — were
//      the same colour for a large group of readers.
//
// Dichromacy simulation follows Viénot, Brettel & Mollon (1999): convert to
// LMS, collapse the missing cone's axis, convert back. It is an approximation
// of an average dichromat, not a diagnosis of any individual's vision; it is
// used here only to catch pairs that are obviously too close.
const fs = require('fs');
const path = require('path');

const MIN_DE = 10;          // adjacent steps, and cov-1 against nodata
const CSS = path.join(__dirname, 'public', 'shared.css');

/* ---------- colour maths ---------- */
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const gam = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
const clamp = c => Math.max(0, Math.min(1, c));

function rgb2lab([r, g, b]) {
  const R = lin(r), G = lin(g), B = lin(b);
  let X = R * 0.4124 + G * 0.3576 + B * 0.1805;
  let Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  let Z = R * 0.0193 + G * 0.1192 + B * 0.9505;
  X /= 0.95047; Z /= 1.08883;
  const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}

// Hunt-Pointer-Estevez, normalised to D65.
const TO_LMS = [[0.31399, 0.63951, 0.04649], [0.15537, 0.75789, 0.08670], [0.01771, 0.10944, 0.87247]];
const FROM_LMS = [[5.47221, -4.6419, 0.16963], [-1.1252, 2.29317, -0.1678], [0.02980, -0.19318, 1.16364]];
const mul = (m, v) => m.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);

function simulate(hexColour, kind) {
  if (kind === 'normal') return hex(hexColour);
  const [L, M, S] = mul(TO_LMS, hex(hexColour).map(lin));
  const out = kind === 'protan' ? [1.05118294 * M - 0.05116099 * S, M, S]
    : kind === 'deutan' ? [L, 0.9513092 * L + 0.04866992 * S, S]
      : [L, M, -0.86744736 * L + 1.86727089 * M];
  return mul(FROM_LMS, out).map(c => gam(clamp(c)));
}

const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const distance = (h1, h2, kind) =>
  dE(rgb2lab(simulate(h1, kind)), rgb2lab(simulate(h2, kind)));

const KINDS = ['normal', 'protan', 'deutan', 'tritan'];

/* ---------- pull the live values out of shared.css ---------- */
// Three blocks define the palette: bare :root (light), the prefers-color-scheme
// query, and the [data-theme="dark"] stamp. The last two are the same values,
// so checking the first dark block found is enough — but they are compared to
// each other so a half-finished edit does not slip through.
const css = fs.readFileSync(CSS, 'utf8');
const blocks = [];
for (const m of css.matchAll(/(:root(?:[^{]*))\{([^}]*)\}/g)) {
  const body = m[2];
  const vars = {};
  for (const v of body.matchAll(/(--[\w-]+)\s*:\s*(#[0-9A-Fa-f]{6})/g)) vars[v[1]] = v[2].toUpperCase();
  if (vars['--cov-1']) blocks.push({ selector: m[1].trim(), vars });
}
if (blocks.length < 2) {
  console.error(`Expected a light and a dark palette in ${CSS}, found ${blocks.length}.`);
  process.exit(1);
}
const light = blocks[0];
const darks = blocks.slice(1);
for (const d of darks) {
  for (const k of ['--cov-1', '--cov-2', '--cov-3', '--cov-4', '--cov-5', '--nodata']) {
    if (d.vars[k] !== darks[0].vars[k]) {
      console.error(`Dark palettes disagree on ${k}: ${darks[0].vars[k]} vs ${d.vars[k]} (${d.selector}).`);
      console.error('The media query and the [data-theme] stamp must define the same values.');
      process.exit(1);
    }
  }
}

/* ---------- the checks ---------- */
let failed = 0;
const fail = msg => { failed++; console.log('  FAIL  ' + msg); };

for (const { selector, vars } of [light, darks[0]]) {
  const ramp = [1, 2, 3, 4, 5].map(i => vars[`--cov-${i}`]);
  const nodata = vars['--nodata'];
  console.log(`\n${selector}`);
  console.log('  ramp   ' + ramp.join(' ') + '   nodata ' + nodata);

  const Ls = ramp.map(h => rgb2lab(hex(h))[0]);
  console.log('  L*     ' + Ls.map(l => l.toFixed(1).padStart(6)).join(' '));

  const rising = Ls.every((l, i) => i === 0 || l > Ls[i - 1]);
  const falling = Ls.every((l, i) => i === 0 || l < Ls[i - 1]);
  if (!rising && !falling) fail('lightness is not monotonic across the five steps');
  else console.log(`  lightness monotonic (${rising ? 'rising' : 'falling'})`);

  for (const kind of KINDS) {
    const adj = ramp.slice(1).map((h, i) => distance(ramp[i], h, kind));
    const min = Math.min(...adj);
    const line = `  ${kind.padEnd(7)} adjacent dE ` + adj.map(d => d.toFixed(1).padStart(5)).join(' ');
    if (min < MIN_DE) fail(`${line}   min ${min.toFixed(1)} < ${MIN_DE}`);
    else console.log(`${line}   min ${min.toFixed(1)}`);
  }

  for (const kind of KINDS) {
    const d = distance(ramp[0], nodata, kind);
    if (d < MIN_DE) {
      fail(`--cov-1 vs --nodata under ${kind}: ${d.toFixed(1)} < ${MIN_DE} ` +
        '— "a little documented" and "nothing recorded" would look the same');
    }
  }
  console.log('  cov-1 vs nodata: ' +
    KINDS.map(k => `${k} ${distance(ramp[0], nodata, k).toFixed(1)}`).join(', '));
}

console.log(failed ? `\n${failed} check(s) failed` : '\nall palette checks passed');
process.exit(failed ? 1 : 0);
