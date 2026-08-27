// Minimal PDF text extractor: inflate every FlateDecode stream, then pull the
// string operands out of the text-showing operators. Good enough for reading
// born-digital journal PDFs; it does not handle CID fonts with custom encodings.
const fs = require("fs"), zlib = require("zlib");

function streams(buf) {
  const out = [];
  let i = 0;
  for (;;) {
    const s = buf.indexOf("stream", i);
    if (s === -1) break;
    let p = s + 6;
    if (buf[p] === 0x0d) p++;
    if (buf[p] === 0x0a) p++;
    const e = buf.indexOf("endstream", p);
    if (e === -1) break;
    out.push(buf.slice(p, e));
    i = e + 9;
  }
  return out;
}

const ESCAPES = { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", "(": "(", ")": ")" };
ESCAPES["\\"] = "\\";

function unescapePdf(s) {
  return s.replace(new RegExp(String.raw`\\([nrtbf()\\]|[0-7]{1,3})`, "g"), (m, g) => {
    if (ESCAPES[g] !== undefined) return ESCAPES[g];
    return String.fromCharCode(parseInt(g, 8));
  });
}

// ---------- ToUnicode maps ----------
// A CID-keyed font emits hex strings of GLYPH CODES, not characters, so a
// reader that only decodes (literal) strings gets nothing usable from it --
// and that is most government legislation PDFs. Guam's statutes came out as
// 60,000 characters of control codes for exactly this reason, and Gibraltar's
// regulations the same way.
//
// The mapping lives in each font's /ToUnicode CMap: a stream of bfchar and
// bfrange entries. Every such stream in the file is merged into one map. That
// is approximate where two fonts give the same code different meanings, and it
// is the same trade the rest of this file makes -- good enough to read, not a
// rendering engine.
function hexToStr(h) {
  let out = "";
  for (let i = 0; i + 4 <= h.length; i += 4) out += String.fromCharCode(parseInt(h.slice(i, i + 4), 16));
  if (h.length % 4 === 2) out += String.fromCharCode(parseInt(h.slice(-2), 16));
  return out;
}

function parseCMap(text, map) {
  for (const block of text.match(/beginbfchar([\s\S]*?)endbfchar/g) || []) {
    for (const m of block.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      map.set(parseInt(m[1], 16), hexToStr(m[2]));
    }
  }
  for (const block of text.match(/beginbfrange([\s\S]*?)endbfrange/g) || []) {
    for (const m of block.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g)) {
      const lo = parseInt(m[1], 16), hi = parseInt(m[2], 16), base = parseInt(m[3], 16);
      if (hi < lo || hi - lo > 65535) continue;
      for (let c = lo; c <= hi; c++) map.set(c, String.fromCharCode(base + (c - lo)));
    }
    for (const m of block.matchAll(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*\[([\s\S]*?)\]/g)) {
      const lo = parseInt(m[1], 16);
      [...m[3].matchAll(/<([0-9A-Fa-f]+)>/g)].map(x => hexToStr(x[1])).forEach((v, k) => map.set(lo + k, v));
    }
  }
  return map;
}

// Walk a content stream tracking nesting so that ")" inside a literal string
// does not end it early.
function textFrom(content, cmap) {
  let out = "", i = 0;
  while (i < content.length) {
    const c = content[i];
    if (c === "(") {
      let depth = 1, j = i + 1, raw = "";
      while (j < content.length && depth > 0) {
        if (content[j] === "\\") { raw += content[j] + content[j + 1]; j += 2; continue; }
        if (content[j] === "(") depth++;
        else if (content[j] === ")") { depth--; if (!depth) break; }
        raw += content[j]; j++;
      }
      out += unescapePdf(raw);
      i = j + 1;
      continue;
    }
    // <hex> string: a CID font's glyph codes, readable only through the map.
    if (c === "<" && cmap && cmap.size && content[i + 1] !== "<") {
      const end = content.indexOf(">", i);
      if (end > i) {
        const hex = content.slice(i + 1, end).replace(/[^0-9A-Fa-f]/g, "");
        if (hex.length >= 4 && hex.length % 2 === 0) {
          for (let k = 0; k + 4 <= hex.length; k += 4) {
            const v = cmap.get(parseInt(hex.slice(k, k + 4), 16));
            if (v !== undefined) out += v;
          }
          i = end + 1;
          continue;
        }
      }
    }
    if (c === "T" && (content[i + 1] === "*" || content[i + 1] === "d" || content[i + 1] === "D")) { out += "\n"; i += 2; continue; }
    if (c === "'" || c === '"') { out += "\n"; i++; continue; }
    i++;
  }
  return out;
}

/** Pull what text there is out of a PDF buffer. Exported so a caller that
 *  already holds the bytes -- a verifier checking a quote against the file it
 *  came from -- does not have to shell out and write a temp file. */
function pdfText(buf) {
  // Two passes. The ToUnicode maps must exist before any content stream that
  // needs them is decoded, and nothing guarantees they come first in the file.
  const inflated = [];
  for (const s of streams(buf)) {
    let data;
    try { data = zlib.inflateSync(s); } catch { try { data = zlib.inflateRawSync(s); } catch { continue; } }
    inflated.push(data.toString("latin1"));
  }
  const cmap = new Map();
  for (const str of inflated) {
    if (str.includes("beginbfchar") || str.includes("beginbfrange")) parseCMap(str, cmap);
  }

  let all = "";
  for (const str of inflated) {
    if (!/(Tj|TJ|BT)/.test(str)) continue;
    all += textFrom(str, cmap) + String.fromCharCode(10);
  }
  const TAB = String.fromCharCode(9), LF = String.fromCharCode(10);
  return all
    .replace(new RegExp("[ " + TAB + "]+", "g"), " ")
    .replace(new RegExp(LF + "{3,}", "g"), LF + LF);
}

module.exports = { pdfText, streams, textFrom, parseCMap };

if (require.main === module) {
  process.stdout.write(pdfText(fs.readFileSync(process.argv[2])));
}
