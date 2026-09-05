// NOTE (August 2026): the reader below is dependency-free and fine for
// born-digital journal PDFs, but as its own note says it does NOT handle CID
// fonts with custom encodings -- and national law gazettes are full of them.
// Left alone it read Slovakia's ZZ_2008_322 as "UTzbc/bcsUPyovsCJ8", Greece's
// FEK as 391,000 control characters, and a 2.2 MB Portuguese Diario da
// Republica as the empty string. Every quote drafted off those documents
// failed the verification gate as though the drafter had invented it.
//
// So the exported pdfText (see the bottom of this file) now asks every
// extractor on the machine -- pdftotext, PyMuPDF, then this reader -- and
// returns them joined. A quote is verified if it appears in ANY faithful
// extraction of the cited document, which is the standard a careful drafter
// already applies by hand when checking a quote survives both extractors.
//
// Asking more than one is not belt-and-braces. On the Greek FEK pdftotext
// finds the quote and PyMuPDF does not; elsewhere it goes the other way.
// Neither is a superset of the other, and picking one silently loses rows.

// Minimal PDF text extractor: inflate every FlateDecode stream, then pull the
// string operands out of the text-showing operators. Good enough for reading
// born-digital journal PDFs; it does not handle CID fonts with custom encodings.
const fs = require("fs"), zlib = require("zlib");
const { execFileSync } = require("child_process");
const os = require("os");
const path = require("path");

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

// A sentinel that survives the matchers' fold(), which strips everything that is
// not alphanumeric -- so a quote can never be matched across the seam between
// two extractions of the same file.
const SEAM = String.fromCharCode(10) + "XSEAMX" + String.fromCharCode(10);
const RUN = { encoding: "utf8", maxBuffer: 256 * 1024 * 1024, timeout: 120000, stdio: ["ignore", "pipe", "ignore"] };

// pdftotext has three layout modes and they disagree about TABLES, which is
// where most of the numbers in this atlas live. Default reflows, `-layout`
// preserves the columns, `-raw` emits content-stream order. A table row that
// reads "Japanese 16,936" under one mode can come out with the cells in a
// different order under another, so a drafter quoting a figure from a
// statistical yearbook could have a real, correctly transcribed quote that
// this gate could not find.
//
// It cost real data. A drafter working the Japan Foundation's 2024 survey
// extracted the learner table for 47 countries and filed only the ones whose
// number also appeared in a PROSE sentence, because the table rows did not
// survive all three modes -- leaving roughly fifteen units of already-located
// data unwritten.
//
// So all three are run and the union is searched, which is this file's
// existing principle: do not pick an extraction, search every one. It cannot
// admit a fabricated quote, because every mode is a rendering of the same
// bytes of the same file.
const PDFTOTEXT_MODES = [[], ["-layout"], ["-raw"]];
function viaPdftotext(file) {
  const out = [];
  for (const mode of PDFTOTEXT_MODES) {
    try {
      const t = execFileSync("pdftotext", ["-enc", "UTF-8", ...mode, file, "-"], RUN);
      if (t && t.trim().length > 40 && !out.includes(t)) out.push(t);
    } catch { /* this mode is unavailable or failed; the others stand */ }
  }
  return out.join(SEAM);
}

function viaPyMuPDF(file) {
  const code = "import sys,fitz" + String.fromCharCode(10) +
    "d=fitz.open(sys.argv[1])" + String.fromCharCode(10) +
    "sys.stdout.reconfigure(encoding=" + JSON.stringify("utf-8") + ", errors=" + JSON.stringify("replace") + ")" + String.fromCharCode(10) +
    "print(chr(10).join(p.get_text() for p in d))";
  for (const py of ["python", "python3"]) {
    try { return execFileSync(py, ["-c", code, file], RUN); }
    catch { /* try the next interpreter */ }
  }
  return "";
}

// The built-in reader, kept under its own name so the exported function can
// call it as one candidate among several rather than as the only one.
const builtinPdfText = pdfText;

function pdfTextAll(buf) {
  const parts = [];
  let file = null;
  try {
    pdfTextAll.n = (pdfTextAll.n || 0) + 1;
    file = path.join(os.tmpdir(), "pdftext-" + process.pid + "-" + pdfTextAll.n + ".pdf");
    fs.writeFileSync(file, buf);
    for (const fn of [viaPdftotext, viaPyMuPDF]) {
      const t = fn(file);
      if (t && t.trim().length > 40) parts.push(t);
    }
  } catch { /* fall through to the built-in reader */ }
  finally { if (file) { try { fs.unlinkSync(file); } catch { /* already gone */ } } }
  try {
    const t = builtinPdfText(buf);
    if (t && t.trim()) parts.push(t);
  } catch { /* the built-in reader is a last resort, not a requirement */ }
  return parts.join(SEAM);
}

module.exports = { pdfText: pdfTextAll, builtinPdfText, streams, textFrom, parseCMap, SEAM };

if (require.main === module) {
  process.stdout.write(pdfTextAll(fs.readFileSync(process.argv[2])));
}
