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
const { pdfText } = require("./pdftext");
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

const strip = s => s
  .replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/&[a-z]+;|&#\d+;/gi, " ");

const CJK = "㐀-䶿一-鿿豈-﫿぀-ヿ";
const FOLD_RE = new RegExp("[^a-z0-9" + CJK + "]+", "g");
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
    if (/pdf/i.test(r.type || "") || (r.raw && r.raw.slice(0, 5).toString() === "%PDF-")) {
      try { text = pdfText(r.raw); } catch { text = ""; }
    } else {
      text = strip(r.body);
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
