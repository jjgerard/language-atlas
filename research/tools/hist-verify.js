// Check drafted policyHistory rows against the sources they claim.
//
//     node hist-verify.js <specDir>
//
// terr-verify.js does this for bullets and passes `history` through untouched,
// because on that pass the history rode along with fields that had been checked.
// A history-ONLY pass has nothing riding along: terr-verify keeps a unit only
// when a bullet or a series row survives, so pointed at timeline work it would
// drop every unit and report it as a clean zero.
//
// So this is the same gate, keyed on rows. For every row: fetch the url it
// cites, extract the text, and look for the drafter's verbatim quote. A row
// whose quote is not on the page it cites is dropped. A row with no quote is
// dropped. Nothing is taken on the drafter's word.
//
// The matcher is copied from terr-verify deliberately, hard-won cases and all:
// PDFs are extracted rather than skipped (most instruments are PDFs), CJK is
// kept rather than folded away (folding it cost Taiwan 43 bullets), and the
// space-free comparison is there because two PDF extractors mangle the same
// page differently.
//
// SPEC KEYS ARE "domain|cc|unitName". terr-verify pooled specs across domains
// and returned Taiwan's fl work and the US eal work as one set; a key that
// carries its own domain cannot do that.
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const zlib = require("zlib");
const { pdfText, SEAM } = require("./pdftext");
const { execFileSync } = require("child_process");
const os = require("os");

const NL = String.fromCharCode(10);
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const specDir = process.argv[2];
if (!specDir) { console.log("usage: node hist-verify.js <specDir>"); process.exit(1); }

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

// Some registers sit behind a WAF that fingerprints the TLS handshake rather
// than reading the headers. rm.coe.int and unicef.org answer curl with a 200
// and Node with a 403 on byte-identical headers -- tested every combination of
// User-Agent, Accept, Accept-Encoding and Referer, and all of them are refused.
// There is no header that fixes it, because the header is not what is read.
//
// So when the built-in client is refused, the same url is fetched once more
// with curl. The gate is not weakened by this: same url, same verbatim quote,
// same extraction. Only the client changes. If curl is not on the machine the
// fallback returns null and the row drops exactly as it did before.
function getViaCurl(url) {
  const tmp = path.join(os.tmpdir(), "hist-verify-" + process.pid + ".bin");
  try {
    const out = execFileSync("curl",
      ["-sSL", "--max-time", "45", "-A", UA, "-o", tmp, "-w", "%{http_code}	%{content_type}", url],
      { encoding: "utf8", timeout: 60000 });
    const parts = String(out).trim().split(String.fromCharCode(9));
    const raw = fs.readFileSync(tmp);
    return { status: Number(parts[0]) || 0, body: raw.toString("utf8"), raw, type: parts[1] || "" };
  } catch {
    return null;
  } finally {
    try { fs.unlinkSync(tmp); } catch { /* nothing to remove */ }
  }
}

const NAMED = {
  amp: 38, lt: 60, gt: 62, quot: 34, apos: 39, nbsp: 32, shy: 45,
  aacute: 225, eacute: 233, iacute: 237, oacute: 243, uacute: 250,
  Aacute: 193, Eacute: 201, Iacute: 205, Oacute: 211, Uacute: 218,
  agrave: 224, egrave: 232, igrave: 236, ograve: 242, ugrave: 249,
  Agrave: 192, Egrave: 200, Igrave: 204, Ograve: 210, Ugrave: 217,
  acirc: 226, ecirc: 234, icirc: 238, ocirc: 244, ucirc: 251,
  Acirc: 194, Ecirc: 202, Icirc: 206, Ocirc: 212, Ucirc: 219,
  auml: 228, euml: 235, iuml: 239, ouml: 246, uuml: 252,
  Auml: 196, Euml: 203, Iuml: 207, Ouml: 214, Uuml: 220,
  atilde: 227, ntilde: 241, otilde: 245, Atilde: 195, Ntilde: 209, Otilde: 213,
  ccedil: 231, Ccedil: 199, aring: 229, Aring: 197, aelig: 230, AElig: 198,
  oslash: 248, Oslash: 216, szlig: 223, yacute: 253, yuml: 255,
  ordf: 170, ordm: 186, deg: 176, laquo: 171, raquo: 187, middot: 183,
  ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, ldquo: 8220, rdquo: 8221,
  hellip: 8230, euro: 8364, pound: 163, sect: 167, para: 182,
};
const unescapeEntities = s => String(s)
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+[0-9]*);/gi, (m, n) => (NAMED[n] !== undefined ? String.fromCodePoint(NAMED[n]) : " "));

const strip = s => unescapeEntities(String(s)
  .replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " "));

const CJK = "㐀-䶿一-鿿豈-﫿぀-ヿ";
// Keep every LETTER and NUMBER in any script, and strip only punctuation,
// whitespace and symbols. The old form was "[^a-z0-9" + CJK + "]+", an
// allow-list of two scripts, and it silently deleted every other non-Latin
// one: a Greek or Cyrillic quote folded to the empty string, so words() came
// back empty and quoteOn returned false before it ever looked at the page.
// Pure-Greek and pure-Cyrillic quotes were unverifiable BY CONSTRUCTION --
// which zeroed Greece and North Macedonia on the European pass, and would
// have done the same to Bulgaria, Serbia, Russia, Ukraine and Belarus.
//
// CJK was added to that allow-list when folding it cost Taiwan 43 bullets.
// That was the same bug found once and patched for one script. p{L} and
// p{N} fix the general case, so the next script does not have to be found
// by losing a country first.
const FOLD_RE = /[^\p{L}\p{N}]+/gu;   // a regex LITERAL: inside new RegExp("...") the backslash-p collapses to p
const fold = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
  .toLowerCase().replace(FOLD_RE, " ").trim();
const hasCJK = s => new RegExp("[" + CJK + "]").test(String(s));
const words = s => fold(s).split(" ").filter(Boolean);

function quoteOn(quote, page) {
  const q = words(quote), p = " " + fold(page) + " ";
  if (!q.length) return false;
  if (p.includes(" " + q.join(" ") + " ")) return true;
  const RUN = Math.min(q.length, Math.max(6, Math.ceil(q.length * 0.6)));
  for (let i = 0; i + RUN <= q.length; i++) {
    if (p.includes(" " + q.slice(i, i + RUN).join(" ") + " ")) return true;
  }
  const qs = q.join(""), ps = p.replace(/ /g, "");
  const MIN = hasCJK(quote) ? 12 : 40;
  if (qs.length >= MIN && ps.includes(qs)) return true;
  const RUNC = Math.max(MIN, Math.ceil(qs.length * 0.6));
  for (let i = 0; i + RUNC <= qs.length; i += 8) {
    if (ps.includes(qs.slice(i, i + RUNC))) return true;
  }
  return false;
}

const THIS_YEAR = 2026;

(async () => {
  const specs = {};
  const OUT = "hist-verified.json";   // a result, never an input
  for (const f of fs.readdirSync(specDir).filter(x => x.endsWith(".json") && x !== OUT).sort()) {
    let batch;
    try { batch = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8")); }
    catch (e) { console.log(f + ": not valid JSON - " + e.message); continue; }
    Object.assign(specs, batch);
  }

  const urls = new Set();
  for (const s of Object.values(specs)) for (const r of (s.history || [])) if (r && r.url) urls.add(r.url);
  console.log(Object.keys(specs).length + " unit-domains, " + urls.size + " distinct source urls to check" + NL);

  async function fetchInto(u, pause) {
    let r = await get(u);
    let via = "    ";
    if (r.status !== 200) {
      const c = getViaCurl(u);
      if (c && c.status === 200) { r = c; via = "curl"; }
    }
    let text;
    // The magic bytes are the fact; Content-Type is only a claim about it. A
    // host serving an HTML error page as application/pdf sent that page to the
    // PDF extractor, which returned nothing, which read downstream as every
    // quote on it being unverifiable. col.guamcourts.gov was caught doing
    // exactly that, intermittently, with HTTP 200. Trust the bytes.
    const magic = r.raw && r.raw.slice(0, 5).toString() === "%PDF-";
    if (/pdf/i.test(r.type || "") && !magic && r.raw && r.raw.length > 5) {
      console.log("       content-type says pdf but the bytes do not: reading as html");
    }
    if (magic) {
      try { text = pdfText(r.raw); } catch { text = ""; }
    } else {
      // Content-Type is a claim, and pages lie or omit it. Decode as UTF-8 and
      // again as latin-1, and search both: impo.com.uy serves ISO-8859-1, and a
      // UTF-8 decode of it produced 3,675 replacement characters and lost both
      // Uruguayan rows whose quotes match perfectly under latin-1. That would
      // cost rows silently on any latin-1 register -- Spanish, French,
      // Portuguese, German.
      //
      // Same remedy as the PDF extractors: do not pick, search the union. The
      // two decodings are joined by the seam sentinel, which survives fold(),
      // so nothing can match across the join.
      const utf8 = strip(r.body);
      let latin = "";
      try {
        if (r.raw && Buffer.isBuffer(r.raw)) latin = strip(r.raw.toString("latin1"));
      } catch { /* utf8 alone */ }
      text = (latin && latin !== utf8) ? utf8 + SEAM + latin : utf8;
    }
    page.set(u, { status: r.status, text, bytes: (r.body || "").length });
    console.log("  " + String(r.status).padStart(3) + "  " + String((r.body || "").length).padStart(7) + "b  " +
      (/pdf/i.test(r.type || "") ? "pdf " : "    ") + " " + via + "  " + String(u).slice(0, 88));
    await new Promise(r2 => setTimeout(r2, pause));
  }

  const page = new Map();
  for (const u of urls) await fetchInto(u, 400);

  // A source that did not come back is not the same failure as a quote that is
  // not on the page. The first is the host's afternoon; the second is the claim
  // being wrong, and only the second should cost a row. So every url that
  // failed to yield text gets ONE more attempt, after a longer wait -- a flaky
  // host, a rate limit, a connection reset. A url that fails twice is reported
  // as a fetch failure and its rows are dropped exactly as before.
  //
  // Once, and only once. A retry loop against a host that is genuinely down
  // turns a verification pass into a slow one that ends the same way.
  const failed = [...urls].filter(u => { const p = page.get(u); return !p || p.status !== 200 || !p.text; });
  if (failed.length) {
    console.log(NL + "  " + failed.length + " source" + (failed.length === 1 ? "" : "s") + " did not yield text; one retry each");
    for (const u of failed) await fetchInto(u, 1500);
    const still = failed.filter(u => { const p = page.get(u); return !p || p.status !== 200 || !p.text; });
    console.log("  retry recovered " + (failed.length - still.length) + " of " + failed.length);
  }

  console.log(NL + "---- per unit-domain ----");
  const out = {};
  let keptAll = 0, dropAll = 0;
  for (const [key, s] of Object.entries(specs)) {
    if (s.insufficient) { console.log(NL + key + ": drafter reported nothing verifiable"); continue; }
    const kept = [], dropped = [];
    for (const r of (s.history || [])) {
      const label = (r && r.year) + " " + String((r && r.description) || "").slice(0, 56);
      if (!r || !Number.isInteger(r.year)) { dropped.push("year is not a whole number - " + label); continue; }
      if (r.year > THIS_YEAR) { dropped.push("year is in the future - " + label); continue; }
      if (!String(r.description || "").trim()) { dropped.push("no description - " + label); continue; }
      if (!r.url || !r.quote) { dropped.push("no url or quote - " + label); continue; }
      const pg = page.get(r.url);
      if (!pg || pg.status !== 200 || !pg.text) { dropped.push("source did not fetch - " + label); continue; }
      if (!quoteOn(r.quote, pg.text)) { dropped.push("quote not on the page it cites - " + label); continue; }
      kept.push({ year: r.year, description: String(r.description).trim().replace(/\s+/g, " ") });
    }
    console.log(NL + key + ": " + kept.length + " rows verified, " + dropped.length + " dropped");
    dropped.forEach(d => console.log("    dropped: " + d));
    keptAll += kept.length; dropAll += dropped.length;
    if (kept.length) out[key] = { history: kept, sources: s.sources || [] };
  }

  fs.writeFileSync(path.join(specDir, OUT), JSON.stringify(out, null, 1) + NL);
  console.log(NL + Object.keys(out).length + " unit-domains survived with " + keptAll + " rows (" + dropAll + " dropped), written to " + OUT);
})();
