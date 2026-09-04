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
const { pdfText, SEAM } = require("./pdftext");
const { execFileSync } = require("child_process");
const os = require("os");

const NL = String.fromCharCode(10);
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const specDir = process.argv[2];
if (!specDir) { console.log("usage: node terr-verify.js <specDir>"); process.exit(1); }

function get(url, redirects = 0, ua = UA) {
  return new Promise(resolve => {
    let mod;
    try { mod = new URL(url).protocol === "http:" ? http : https; } catch { return resolve({ status: 0, body: "" }); }
    const req = mod.get(url, { headers: { "User-Agent": ua, Referer: "https://www.google.com/", "Accept-Encoding": "gzip, deflate" } }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 5) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, redirects + 1, ua));
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

// Fold away everything extraction mangles: accents, curly quotes, case, runs of
// space. What is left is words, which is what a quote is really made of.
// CJK is kept, not folded away. Stripping every non-Latin character reduced a
// Chinese quote to a handful of stray letters and then failed to find it --
// which is how Taiwan lost 43 bullets drawn from its own statutes.
const CJK = "㐀-䶿一-鿿豈-﫿぀-ヿ";
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
  // Last resort: compare with the spaces taken out entirely. Two different PDF
  // extractors mangle the same page differently -- Guam's own text layer reads
  // "middl e schools" and "pr ogram" -- so a drafter quoting one extraction and
  // a checker reading another disagree on where the spaces are while agreeing
  // on every letter. Requiring a long run keeps this from matching on noise.
  const qs = q.join(""), ps = p.replace(/ /g, "");
  // A run of CJK carries far more meaning per character than Latin text, so it
  // needs a shorter threshold to be a safe match -- and it has no spaces to
  // align on in the first place, which is why the word-run test above misses it.
  const MIN = hasCJK(quote) ? 12 : 40;
  if (qs.length >= MIN && ps.includes(qs)) return true;
  const RUNC = Math.max(MIN, Math.ceil(qs.length * 0.6));
  for (let i = 0; i + RUNC <= qs.length; i += 8) {
    if (ps.includes(qs.slice(i, i + RUNC))) return true;
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
    let r = await get(u);
    // A refusal dressed as success never reached the fallback. desc.gov.im
    // hands Node 269 bytes of "Request Rejected" at HTTP 200 and hands curl
    // 121,787 bytes of the real page; gallilex.cfwb.be does the same at 244
    // bytes. Because the status is 200 the old test passed and the stub went
    // straight to the extractor, so every quote on that url read as invented.
    // No real document is a few hundred bytes, so a tiny 200 is worth a second
    // opinion -- and the result is only taken if it is substantially bigger.
    const TINY = 1000;
    if (r.status !== 200 || (r.raw && r.raw.length < TINY)) {
      const c = getViaCurl(u);
      if (c && c.status === 200 && (r.status !== 200 || c.raw.length > (r.raw ? r.raw.length : 0) * 2)) r = c;
      // Some hosts refuse the browser string and serve a bare one. Same url,
      // same second: education.gov.gy gives the full Chrome UA a 403 and a
      // 75,193-byte block page, and "Mozilla/5.0" a 200 with 99,392 bytes.
      if (r.status !== 200 || (r.raw && r.raw.length < TINY)) {
        const short = await get(u, 0, "Mozilla/5.0");
        if (short.status === 200 && short.raw && short.raw.length > TINY) {
          console.log("       (refused the browser UA, served a short one)");
          r = short;
        }
        // And some refuse ANYTHING that opens with "Mozilla". Every fallback
        // above sends one -- the full Chrome string, then curl carrying the
        // same string, then a bare "Mozilla/5.0" -- so a host filtering on
        // that prefix defeated all three and the url was written off as a 403.
        // monservicepublic.gouv.mc hands every Mozilla string a 245-byte block
        // page and hands curl's own UA the real 1.8 MB PDF. A non-browser
        // agent is the one thing left to try.
        if (r.status !== 200 || (r.raw && r.raw.length < TINY)) {
          const plain = await get(u, 0, "curl/8.5.0");
          if (plain.status === 200 && plain.raw && plain.raw.length > TINY) {
            console.log("       (refused every browser string, served a non-browser one)");
            r = plain;
          }
        }
      }
    }
    // A PDF is not "binary, give up": most of the instruments these drafters
    // worked from are PDFs, and skipping them threw away correct work. The
    // repo already had an extractor for exactly this.
    let text;
    // The magic bytes are the fact; Content-Type is only a claim about it. A
    // host serving an HTML error page as application/pdf sent that page to the
    // PDF extractor, which returned nothing, which read downstream as every
    // quote on it being unverifiable. col.guamcourts.gov was caught doing
    // exactly that, intermittently, with HTTP 200. Trust the bytes.
    // Not `slice(0,5)`: the signature is not always at byte 0. A UTF-8 BOM in
    // front of it -- three bytes -- sent a genuine PDF to the HTML extractor
    // and made every quote on it read as invented. Scan the first kilobyte and
    // extract from wherever the header actually begins.
    const at = r.raw ? r.raw.indexOf("%PDF-", 0, "latin1") : -1;
    const magic = at >= 0 && at < 1024;
    if (/pdf/i.test(r.type || "") && !magic && r.raw && r.raw.length > 5) {
      console.log("       content-type says pdf but the bytes do not: reading as html");
    }
    if (magic) {
      if (at > 0) console.log("       (pdf header at byte " + at + ", not 0 - extracting from there)");
      try { text = pdfText(at ? r.raw.subarray(at) : r.raw); } catch { text = ""; }
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
      const parts = [utf8];
      try {
        if (r.raw && Buffer.isBuffer(r.raw)) {
          const latin = strip(r.raw.toString("latin1"));
          if (latin && latin !== utf8) parts.push(latin);

          // UTF-16, detected by BOM or by NUL density. A NUL byte does not
          // occur in valid UTF-8 or latin-1 HTML, so a body carrying them in
          // quantity is UTF-16 and the decoding is unambiguous.
          const b0 = r.raw[0], b1 = r.raw[1];
          const bom16 = (b0 === 0xFF && b1 === 0xFE) ? "utf16le"
                      : (b0 === 0xFE && b1 === 0xFF) ? "utf-16be" : null;
          const head = r.raw.subarray(0, 1024);
          let nuls = 0;
          for (const byte of head) if (byte === 0) nuls++;
          const label16 = bom16 || (nuls > head.length / 4 ? "utf16le" : null);
          if (label16) {
            try {
              const body16 = bom16 ? r.raw.subarray(2) : r.raw;
              const u16 = strip(label16 === "utf16le"
                ? body16.toString("utf16le")
                : new TextDecoder("utf-16be", { fatal: false }).decode(body16));
              if (u16 && !parts.includes(u16)) {
                parts.push(u16);
                console.log("       (decoded also as " + label16 + ")");
              }
            } catch { /* the other decodings stand */ }
          }

          // A third decoding, for the legacy East Asian ones Buffer cannot do.
          // jxrd.jxnews.com.cn serves Jiangxi's own minority-rights regulation
          // as GB2312 at HTTP 200; utf8 and latin-1 both turn it to noise, so
          // all five Chinese quotes on it were dropped as "not on the page".
          // That is the encoding class this gate has been bitten by twice --
          // once for latin-1, once for the fold() allow-list -- and the same
          // remedy applies: do not pick a decoding, search the union.
          //
          // Only decode what the page declares, from the header or its own
          // meta tag. Guessing an encoding for every page would add noise that
          // could match a quote by accident, which is the one thing this gate
          // must never do.
          const declared = (String(r.type || "").match(/charset=\s*\"?([\w-]+)/i) || [])[1]
            || (utf8.slice(0, 4096).match(/charset=\s*\"?([\w-]+)/i) || [])[1]
            || (r.raw.subarray(0, 2048).toString("latin1").match(/charset=\s*\"?([\w-]+)/i) || [])[1];
          const legacy = /^(gb ?2312|gbk|gb18030|big ?5|shift[-_]?jis|sjis|euc[-_]?(jp|kr)|ks_c_5601[-\w]*)$/i;
          if (declared && legacy.test(declared.trim())) {
            // gb18030 is a strict superset of gb2312 and gbk, so it decodes
            // all three and never fails on the narrower ones.
            const label = /^(gb ?2312|gbk|gb18030)$/i.test(declared.trim()) ? "gb18030" : declared.trim();
            try {
              const cjk = strip(new TextDecoder(label, { fatal: false }).decode(r.raw));
              if (cjk && !parts.includes(cjk)) {
                parts.push(cjk);
                console.log("       (decoded also as " + label + ", declared by the page)");
              }
            } catch { /* unknown label: the other two decodings stand */ }
          }
        }
      } catch { /* utf8 alone */ }
      // Joined by the seam sentinel, which survives fold(), so no quote can
      // match across the join between two decodings.
      text = parts.join(SEAM);
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
    // Series rows go through the same gate. A figure is the thing most worth
    // checking and least self-evidently wrong: "8,208" looks equally plausible
    // whatever the truth is, so it is matched against the evidence quote -- for
    // these, the raw line of the published data file it was read from.
    const keptSeries = {};
    for (const [field, rows2] of Object.entries(s.series || {})) {
      const good = [];
      for (const r of (rows2 || [])) {
        if (!r || !r.year || !r.value || !r.note) { dropped.push(field + ": row missing year, value or note"); continue; }
        const e = ev.get(String(r.value));
        if (!e) { dropped.push(field + ": no evidence for the figure " + r.value); continue; }
        const p = page.get(e.url);
        if (!p || p.status !== 200) { dropped.push(field + ": source returned " + (p ? p.status : "?") + " for " + r.value); continue; }
        if (!p.text) { dropped.push(field + ": no text extracted from the source of " + r.value); continue; }
        if (!quoteOn(e.quote, p.text)) { dropped.push(field + ": quote not found for the figure " + r.value); continue; }
        good.push({ year: r.year, value: String(r.value), note: String(r.note) });
      }
      if (good.length) keptSeries[field] = good;
    }

    // `notEstablished` is the THIRD state -- a source positively saying that a
    // thing is not recorded -- and derive.js is explicit that it must never
    // count as coverage: three states, not two. It was not handled here at all.
    // A unit whose only finding was an absence had that finding dropped and,
    // having no surviving bullets, vanished from the output entirely.
    //
    // Laos was about to be lost exactly that way: two peer-reviewed sources
    // state there is no speech and language therapy service to be had, which is
    // precisely the kind of finding this atlas exists to record.
    //
    // It is passed through rather than quote-checked. A claim of absence is not
    // the same shape of claim as a quoted provision, and the sentinel phrase is
    // validated downstream by fl/apply.js. That it is NOT gated here is printed
    // out loud below, so it can never be mistaken for a verified bullet.
    const notEst = s.notEstablished || {};
    const nn = Object.keys(notEst).length;

    // History rows go through the gate too, and did not used to. They were
    // passed straight out as `s.history` on the drafter's word, and a spec
    // whose ONLY content was history rows failed the `nb || ns || nn` test
    // below and vanished with them.
    //
    // Both halves of that were wrong, and the session that found it had just
    // finished correcting 78 published history rows that described their own
    // document incorrectly -- a repealed article cited as the operative one, a
    // constitution credited with a provision belonging to the one it replaced,
    // an Act that was only ever a Bill. Every one of those would have been
    // caught here by the rule this file already applies to bullets: fetch the
    // page, look for the quote.
    //
    // Evidence is keyed by the row's `description`, which is what the drafting
    // brief asks for. A row with no evidence entry is dropped like a bullet
    // with none: the year is the part most worth checking and the part that
    // looks equally plausible whatever the truth is.
    const keptHist = [];
    for (const r of (s.history || [])) {
      const label = "policyHistory " + (r && r.year);
      if (!r || !r.description) { dropped.push(label + ": row missing a description"); continue; }
      if (!Number.isInteger(Number(r.year))) { dropped.push(label + ": year is not a number"); continue; }
      const e = ev.get(r.description);
      if (!e) { dropped.push(label + ": no evidence entry - " + String(r.description).slice(0, 48)); continue; }
      const p = page.get(e.url);
      if (!p || p.status !== 200) { dropped.push(label + ": source returned " + (p ? p.status : "?")); continue; }
      if (!p.text) { dropped.push(label + ": no text could be extracted from the source"); continue; }
      if (!quoteOn(e.quote, p.text)) { dropped.push(label + ": quote not found on the page - " + String(r.description).slice(0, 40)); continue; }
      keptHist.push({ year: Number(r.year), description: String(r.description) });
    }
    keptHist.sort((a, b) => a.year - b.year);

    const ns = Object.values(keptSeries).reduce((a, b) => a + b.length, 0);
    const nb = Object.values(kept).reduce((a, b) => a + b.length, 0);
    const nh = keptHist.length;
    console.log(NL + key + ": " + Object.keys(kept).length + " fields, " + nb + " bullets, " + ns + " series rows, " + nh + " history rows verified, " + dropped.length + " dropped");
    if (nn) console.log("    " + nn + " notEstablished finding" + (nn === 1 ? "" : "s") + " passed through UNGATED (a claim of absence is not quote-checked)");
    dropped.forEach(d => console.log("    - " + d));
    if (nb || ns || nn || nh) out[key] = { fields: kept, series: keptSeries, notEstablished: notEst, history: keptHist, sources: s.sources || [] };
  }

  fs.writeFileSync(path.join(specDir, OUT), JSON.stringify(out, null, 1) + NL);
  console.log(NL + Object.keys(out).length + " units survived, written to verified.json");
})();
