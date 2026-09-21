// Check a categorical palette the way shared.css checks the coverage ramp.
//
//     node palette-check.js "#E69F00,#56B4E9,..." [groundHex]
//     node palette-check.js --live          # read the tokens out of shared.css
//
// The coverage ramp is safe because LIGHTNESS is monotonic: anyone who cannot
// separate the hues still reads the order. A categorical palette needs the
// OPPOSITE property and the same rigour. Two things are checked:
//
//   1. L* SPREAD STAYS UNDER ONE COVERAGE-RAMP STEP. If lightness varied across
//      a categorical set the set would imply a ranking, which is the whole
//      reason the coverage ramp cannot be reused for unordered values. The bar
//      is 14 rather than zero because the two goals pull against each other:
//      perfectly flat lightness costs dichromats their remaining axis, and a
//      six-hue set levelled to one L* was measured here at 9.9 dE under
//      protanopia, well under the bar. 14 is the ramp's own step, so a
//      categorical set inside it cannot be read as a ranking by anyone who can
//      read the ramp as one.
//   2. EVERY PAIR STAYS APART UNDER PROTANOPIA AND DEUTERANOPIA. shared.css
//      states its own bar: --nodata sits "14 dE from --cov-1 under simulated
//      protanopia and deuteranopia, where the old #C4CDD5 was 3.7 and read as
//      documented". 14 is therefore the number to beat, and the minimum PAIR is
//      what matters, not the average.
//
// Dichromat simulation is Viénot, Brettel and Mollon (1999): project onto the
// LMS plane the missing cone cannot distinguish. CIE76 dE is used rather than
// dE2000 because that is what the figure in shared.css is quoted in.
const fs = require("fs");
const path = require("path");

const hex2rgb = h => {
  const s = h.replace("#", "").trim();
  return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16) / 255);
};
const lin = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const delin = c => {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(1, v));
};

function rgb2xyz([r, g, b]) {
  const R = lin(r), G = lin(g), B = lin(b);
  return [
    R * 0.4124564 + G * 0.3575761 + B * 0.1804375,
    R * 0.2126729 + G * 0.7151522 + B * 0.0721750,
    R * 0.0193339 + G * 0.1191920 + B * 0.9503041,
  ];
}
const WP = [0.95047, 1.0, 1.08883];
function xyz2lab([x, y, z]) {
  const f = t => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const fx = f(x / WP[0]), fy = f(y / WP[1]), fz = f(z / WP[2]);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
const lab = h => xyz2lab(rgb2xyz(hex2rgb(h)));
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// Viénot-Brettel-Mollon: linear RGB -> LMS, collapse the missing cone, back.
const RGB2LMS = [[17.8824, 43.5161, 4.11935], [3.45565, 27.1554, 3.86714], [0.0299566, 0.184309, 1.46709]];
const LMS2RGB = [[0.0809444479, -0.130504409, 0.116721066], [-0.0102485335, 0.0540193266, -0.113614708], [-0.000365296938, -0.00412161469, 0.693511405]];
const mul = (m, v) => m.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
function simulate(hex, kind) {
  const [r, g, b] = hex2rgb(hex).map(lin);
  const lms = mul(RGB2LMS, [r, g, b]);
  let out;
  if (kind === "protan") out = [2.02344 * lms[1] - 2.52581 * lms[2], lms[1], lms[2]];
  else out = [lms[0], 0.494207 * lms[0] + 1.24827 * lms[2], lms[2]];
  const back = mul(LMS2RGB, out).map(delin);
  return "#" + back.map(c => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
}

function tokensFromCss(file, block) {
  const css = fs.readFileSync(file, "utf8");
  const out = {};
  const re = /--(cat-[a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{6})/g;
  let m;
  const scope = block === "dark"
    ? css.slice(css.indexOf(':root[data-theme="dark"]'))
    : css.slice(0, css.indexOf("@media (prefers-color-scheme: dark)"));
  while ((m = re.exec(scope))) out[m[1]] = m[2];
  return out;
}

const args = process.argv.slice(2);
let sets;
if (args[0] === "--live") {
  const f = path.join(__dirname, "..", "..", "public", "shared.css");
  sets = [["light", tokensFromCss(f, "light"), "#E4EAF0"], ["dark", tokensFromCss(f, "dark"), "#0D1319"]];
} else {
  const names = {};
  args[0].split(",").forEach((h, i) => (names["cat-" + (i + 1)] = h.trim()));
  sets = [["given", names, args[1] || "#E4EAF0"]];
}

let bad = 0;
for (const [label, map, ground] of sets) {
  // --cat-other is not a category. It is the tone every unhighlighted value
  // shares, so it is held to a different bar: far from the ground and far from
  // --nodata, but under no obligation to sit in the categorical lightness band.
  const other = map["cat-other"];
  const keys = Object.keys(map).filter(k => /^cat-\d+$/.test(k));
  if (!keys.length) { console.log(label + ": no --cat-N tokens found"); continue; }
  console.log("\n=== " + label + "  (" + keys.length + " swatches, ground " + ground + ")");
  const Ls = keys.map(k => lab(map[k])[0]);
  const spread = Math.max(...Ls) - Math.min(...Ls);
  console.log("  L* range " + Math.min(...Ls).toFixed(1) + " to " + Math.max(...Ls).toFixed(1)
    + "  SPREAD " + spread.toFixed(1) + (spread <= 14 ? "  (under one ramp step: no order implied)" : "  <-- TOO WIDE, implies a ranking"));
  if (spread > 14) bad++;

  for (const kind of ["normal", "protan", "deutan"]) {
    let worst = Infinity, pair = "";
    for (let i = 0; i < keys.length; i++)
      for (let j = i + 1; j < keys.length; j++) {
        const a = kind === "normal" ? map[keys[i]] : simulate(map[keys[i]], kind);
        const b = kind === "normal" ? map[keys[j]] : simulate(map[keys[j]], kind);
        const d = dE(lab(a), lab(b));
        if (d < worst) { worst = d; pair = keys[i] + "/" + keys[j]; }
      }
    const ok = worst >= 14;
    console.log("  min pair dE " + kind.padEnd(7) + worst.toFixed(1).padStart(6) + "   " + pair
      + (ok ? "   ok" : "   <-- UNDER 14"));
    if (!ok) bad++;
  }
  // Every swatch must also part company with the ground it is painted on.
  let gw = Infinity, gk = "";
  for (const k of keys) { const d = dE(lab(map[k]), lab(ground)); if (d < gw) { gw = d; gk = k; } }
  console.log("  closest to ground " + gw.toFixed(1) + "   " + gk + (gw >= 20 ? "   ok" : "   <-- too close to the ground"));
  if (gw < 20) bad++;
  if (other) {
    const nodata = label === "dark" ? "#282D30" : "#A1A6AB";
    const dg = dE(lab(other), lab(ground)), dn = dE(lab(other), lab(nodata));
    let dc = Infinity;
    for (const k of keys) { const d = dE(lab(other), lab(map[k])); if (d < dc) dc = d; }
    const ok = dg >= 20 && dn >= 14 && dc >= 14;
    console.log("  --cat-other: ground " + dg.toFixed(1) + ", --nodata " + dn.toFixed(1)
      + ", nearest category " + dc.toFixed(1) + (ok ? "   ok" : "   <-- too close to one of them"));
    if (!ok) bad++;
  }
}
console.log(bad ? "\n" + bad + " check(s) failed" : "\nall checks pass");
process.exit(bad ? 1 : 0);
