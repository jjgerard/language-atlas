// Rasterise the favicon to PNG, with no image library.
//
// The SVG is the real mark; these are fallbacks for the places that still want
// a raster — an ICO-shaped link, an Apple touch icon, an OG image. Rather than
// shell out to a converter that is not installed, the same geometry is drawn by
// hand and encoded with zlib, which is the one dependency Node already has.
//
// Supersampled 4x and box-filtered down, because the whole design is curves:
// a circle rasterised at 32px with hard edges looks like a cog.
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

// Four bands, matching favicon.svg. Five turned to mud at 16px.
// Darkest at the top: the ramp runs deep to pale down the globe.
const BANDS = [            // y-extent in the 32-unit design space, and colour
  [0, 8, [0x1E, 0x3A, 0x6B]],
  [8, 16, [0x3F, 0x92, 0xAE]],
  [16, 24, [0x6F, 0xBC, 0xC0]],
  [24, 32, [0xC7, 0xE7, 0xDF]],
];
const INK = [0x0E, 0x1B, 0x2E];

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** Colour at a point in the 32x32 design space, or null outside the disc. */
function sample(x, y) {
  const dx = x - 16, dy = y - 16;
  const r = Math.hypot(dx, dy);
  if (r > 14) return null;                       // outside the globe
  let c = BANDS.find(([a, b]) => y >= a && y < b);
  c = c ? c[2] : BANDS[BANDS.length - 1][2];

  // No graticule: it reads as a globe at 64px and as dirt at 16px, which is
  // the size that matters. Rim drawn inside the edge, so the disc keeps its
  // full radius and the border does not blend with the tab strip behind it.
  if (r > 12.75) c = mix(c, INK, 0.75);
  return c;
}

function render(size) {
  const S = 4, N = size * S;
  const px = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          const dx = ((x * S + sx + 0.5) / N) * 32;
          const dy = ((y * S + sy + 0.5) / N) * 32;
          const c = sample(dx, dy);
          if (c) { r += c[0]; g += c[1]; b += c[2]; a += 255; }
        }
      }
      const n = S * S, i = (y * size + x) * 4;
      const hits = a / 255;
      px[i] = hits ? Math.round(r / hits) : 0;
      px[i + 1] = hits ? Math.round(g / hits) : 0;
      px[i + 2] = hits ? Math.round(b / hits) : 0;
      px[i + 3] = Math.round(a / n);
    }
  }
  return px;
}

function png(size, px) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;                 // filter: none
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

let TBL = null;
function crc32(buf) {
  if (!TBL) {
    TBL = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      TBL[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TBL[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return c ^ -1;
}

const OUT = path.join(__dirname, "..", "..", "public");
for (const [size, name] of [[32, "favicon-32.png"], [180, "apple-touch-icon.png"]]) {
  const buf = png(size, render(size));
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(`${name}  ${size}x${size}  ${(buf.length / 1024).toFixed(1)}KB`);
}
