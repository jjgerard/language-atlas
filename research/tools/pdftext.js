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

// Walk a content stream tracking nesting so that ")" inside a literal string
// does not end it early.
function textFrom(content) {
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
    if (c === "T" && (content[i + 1] === "*" || content[i + 1] === "d" || content[i + 1] === "D")) { out += "\n"; i += 2; continue; }
    if (c === "'" || c === '"') { out += "\n"; i++; continue; }
    i++;
  }
  return out;
}

const buf = fs.readFileSync(process.argv[2]);
let all = "";
for (const s of streams(buf)) {
  let data;
  try { data = zlib.inflateSync(s); } catch { try { data = zlib.inflateRawSync(s); } catch { continue; } }
  const str = data.toString("latin1");
  if (!/(Tj|TJ|BT)/.test(str)) continue;
  all += textFrom(str) + "\n";
}
all = all.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
process.stdout.write(all);
