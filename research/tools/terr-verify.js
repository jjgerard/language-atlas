// Check drafted territory bullets against the sources they claim.
//
//     node terr-verify.js <specDir>
//
// The PEER pass could be checked against a corpus already on disk. This one
// cannot: the drafters went to the live web, so the only way to know a quote is
// real is to fetch the page and look for it. That is what this does.
//
// For every `evidence` entry: fetch its url once, extract text, and look for the
// quote. A bullet whose quote is not on the page it cites is dropped, and so is
// a bullet with no evidence entry at all. Nothing is taken on the drafter's word.
//
// The quote match is deliberately loose about whitespace, case, quotation marks
// and accents, because extracted PDF and HTML text mangles all four, and strict
// about words: a quote has to share a long run of its actual vocabulary with
// the page. It can still be fooled by a page that merely discusses the same
// subject, so it is a floor, not a proof.
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const zlib = require("zlib");
const { pdfText } = require("./pdftext");

const NL = String.fromCharCode(10);
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const specDir = process.argv[2];
if (!specDir) { console.log("usage: node terr-verify.js <specDir>"); process.exit(1); }

function get(url, redirects = 0) {
  return new Promise(resolve => {
    let mod;
    try { mod = new URL(url).protocol === "http:" ? http : https; } catch { return resolve({ status: 0, body: "" }); }
    const req = mod.get(url, { headers: { "User-Agent": UA, Referer: "https://www.google.com/", "Accept-Encoding": "gzip, deflate" } }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 5) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, redirects + 1));
      }
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        let buf = Buffer.concat(chunks);
        const enc = String(res.headers["content-encoding"] || "");
        try {
          if (enc.includes("gzip")) buf = zlib.gunzipSync(buf);
          else if (enc.includes("deflate")) buf = zlib.inflateSync(buf);
        } catch { /* keep what we have */ }
        resolve({ status: res.statusCode, body: buf.toString("utf8"), raw: buf, type: String(res.headers["content-type"] || "") });
      });
    });
    req.setTimeout(45000, () => { req.destroy(); resolve({ status: 0, body: "" }); });
    req.on("error", () => resolve({ status: 0, body: "" }));
  });
}

const strip = s => s
  .replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/&[a-z]+;|&#\d+;/gi, " ");

// Fold away everything extraction mangles: accents, curly quotes, case, runs of
// space. What is left is words, which is what a quote is really made of.
const fold = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const words = s => fold(s).split(" ").filter(Boolean);

/** Does `quote` appear in `page`, allowing for mangled extraction? */
function quoteOn(quote, page) {
  const q = words(quote), p = " " + fold(page) + " ";
  if (!q.length) return false;
  if (p.includes(" " + q.join(" ") + " ")) return true;
  // Fall back to the longest run of the quote that IS on the page. A quote
  // spanning a table cell or a line break loses a word or two in extraction.
  const RUN = Math.min(q.length, Math.max(6, Math.ceil(q.length * 0.6)));
  for (let i = 0; i + RUN <= q.length; i++) {
    if (p.includes(" " + q.slice(i, i + RUN).join(" ") + " ")) return true;
  }
  return false;
}

(async () => {
  const specs = {};
  // NOT verified.json. This script writes its output into the directory it
  // reads, so a second run loaded its own result as another spec -- and since
  // that file carries no `evidence`, it overwrote every good entry with an
  // evidence-less copy and the gate then rejected all of them for having no
  // evidence. The output is a result, never an input.
  const OUT = "verified.json";
  for (const f of fs.readdirSync(specDir).filter(x => x.endsWith(".json") && x !== OUT).sort()) {
    let batch;
    try { batch = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8")); }
    catch (e) { console.log(f + ": not valid JSON - " + e.message); continue; }
    Object.assign(specs, batch);
  }

  // one fetch per distinct url
  const urls = new Set();
  for (const s of Object.values(specs)) for (const e of (s.evidence || [])) if (e && e.url) urls.add(e.url);
  console.log(Object.keys(specs).length + " units, " + urls.size + " distinct source urls to check" + NL);

  const page = new Map();
  for (const u of urls) {
    const r = await get(u);
    // A PDF is not "binary, give up": most of the instruments these drafters
    // worked from are PDFs, and skipping them threw away correct work. The
    // repo already had an extractor for exactly this.
    let text;
    if (/pdf/i.test(r.type || "") || (r.raw && r.raw.slice(0, 5).toString() === "%PDF-")) {
      try { text = pdfText(r.raw); } catch { text = ""; }
    } else {
      text = strip(r.body);
    }
    page.set(u, { status: r.status, text, type: r.type, bytes: r.body.length });
    console.log("  " + String(r.status).padStart(3) + "  " + String(r.body.length).padStart(7) + "b  " + (/pdf/i.test(r.type||"")?"pdf ":"    ") + u.slice(0, 88));
    await new Promise(r2 => setTimeout(r2, 400));
  }

  console.log(NL + "---- per unit ----");
  const out = {};
  for (const [key, s] of Object.entries(specs)) {
    if (s.insufficient) { console.log(NL + key + ": drafter reported nothing verifiable"); continue; }
    const ev = new Map();
    for (const e of (s.evidence || [])) if (e && e.bullet) ev.set(e.bullet, e);

    const kept = {}, dropped = [];
    for (const [field, bullets] of Object.entries(s.fields || {})) {
      const good = [];
      for (const b of bullets) {
        const e = ev.get(b);
        if (!e) { dropped.push(field + ": no evidence entry - " + b.slice(0, 58)); continue; }
        const p = page.get(e.url);
        if (!p || p.status !== 200) { dropped.push(field + ": source returned " + (p ? p.status : "?") + " - " + b.slice(0, 48)); continue; }
        if (!p.text) { dropped.push(field + ": no text could be extracted from the source - " + b.slice(0, 44)); continue; }
        if (!quoteOn(e.quote, p.text)) { dropped.push(field + ": quote not found on the page - " + b.slice(0, 48)); continue; }
        good.push(b);
      }
      if (good.length) kept[field] = good;
    }
    const nb = Object.values(kept).reduce((a, b) => a + b.length, 0);
    console.log(NL + key + ": " + Object.keys(kept).length + " fields, " + nb + " bullets verified, " + dropped.length + " dropped");
    dropped.forEach(d => console.log("    - " + d));
    if (nb) out[key] = { fields: kept, history: s.history || [], sources: s.sources || [] };
  }

  fs.writeFileSync(path.join(specDir, OUT), JSON.stringify(out, null, 1) + NL);
  console.log(NL + Object.keys(out).length + " units survived, written to verified.json");
})();
