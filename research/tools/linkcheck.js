// Does every docLink on a domain's entries still serve its document?
//
//     node linkcheck.js <domain> [region] [out.json]
//
// A docLink is rendered, never fetched, so nothing in the app notices one
// going dead. Bolivia's own Ley 070 link 404s while its siblings on the same
// host serve fine, and it took a drafting agent tripping over it to find out.
//
// Two things this learned the hard way, both recorded in BLOCKED.md section 8:
//
//  1. USE THE GATE'S OWN CLIENT. The first version's curl fallback sent no
//     User-Agent and reported education.gouv.fr, Wiley and cpbmd.info as dead.
//     With the real UA all three serve. A checker that does not match the gate
//     measures the checker.
//
//  2. A DOI IS NOT A URL TO FETCH. 37 of the first run's 50 "failures" were
//     DOIs resolving correctly at doi.org and then being refused by the
//     publisher. That 403 means paywalled, not broken, and a DOI is exactly
//     the kind of citation this project's rules exist to keep honest. So a
//     doi.org link is checked for RESOLUTION only, and never followed.
const https = require("https");
const http = require("http");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const NL = String.fromCharCode(10);

const domain = process.argv[2];
const region = process.argv[3] && process.argv[3] !== "-" ? process.argv[3] : null;
const outFile = process.argv[4] || null;
if (!domain) { console.log("usage: node linkcheck.js <domain> [region] [out.json]"); process.exit(1); }

const data = require(path.join(__dirname, "..", "..", "data", domain + ".json"));

function req(url, opts, redirects, follow) {
  return new Promise(res => {
    let mod;
    try { mod = new URL(url).protocol === "http:" ? http : https; }
    catch { return res({ status: -1, err: "unparseable url" }); }
    const r = mod.get(url, { headers: { "user-agent": UA } }, resp => {
      const isRedirect = [301, 302, 303, 307, 308].includes(resp.statusCode) && resp.headers.location;
      if (isRedirect && !follow) { resp.resume(); return res({ status: resp.statusCode, to: resp.headers.location }); }
      if (isRedirect && redirects < 5) {
        resp.resume();
        try { return res(req(new URL(resp.headers.location, url).href, opts, redirects + 1, follow)); }
        catch { return res({ status: resp.statusCode, err: "unparseable redirect" }); }
      }
      const chunks = [];
      let n = 0;
      resp.on("data", d => { n += d.length; if (n < 400000) chunks.push(d); });
      resp.on("end", () => res({ status: resp.statusCode, n, head: Buffer.concat(chunks).slice(0, 512),
                                type: resp.headers["content-type"] || "" }));
    });
    r.on("error", e => res({ status: 0, err: e.code || e.message }));
    r.setTimeout(35000, () => { r.destroy(); res({ status: 0, err: "timeout" }); });
  });
}
const get = url => req(url, null, 0, true);
const head = url => req(url, null, 0, false);

// Same flags and same UA the gate's getViaCurl uses, so a "curl gets it" here
// means the gate would get it too.
function viaCurl(url) {
  try {
    const o = execFileSync("curl", ["-sSL", "-A", UA, "-o", "/dev/null",
      "-w", "%{http_code} %{size_download}", "--max-time", "45", url],
      { encoding: "utf8", timeout: 60000 });
    const [code, size] = o.trim().split(/\s+/);
    return { status: Number(code), n: Number(size) };
  } catch { return null; }
}

(async () => {
  const rows = data.filter(e => !region || e.region === region);
  const links = new Map();
  for (const e of rows)
    for (const l of (e.docLinks || []))
      if (l && l.url) {
        if (!links.has(l.url)) links.set(l.url, []);
        links.get(l.url).push(e.countryCode + "|" + e.unitName);
      }
  console.log(links.size + " distinct urls across " + rows.length + " " +
              (region || "all") + " " + domain + " entries" + NL);

  const bad = [];
  let i = 0;
  for (const [url, units] of links) {
    i++;
    let verdict = null;

    if (/^https?:\/\/(dx\.)?doi\.org\//i.test(url)) {
      // Resolution is the whole test. What the publisher does next is not this
      // project's business, and a paywall is not a broken citation.
      const h = await head(url);
      if (h.status === 404) verdict = "DOI does not resolve";
      else if (!h.to && h.status !== 200) verdict = "DOI returned " + (h.status || h.err);
    } else {
      const r = await get(url);
      if (r.status === 200) {
        const body = (r.head || Buffer.alloc(0)).toString("latin1");
        if (r.n < 1000) verdict = "200 but only " + r.n + " bytes";
        else if (/Request Rejected|Just a moment|Access Denied|captcha/i.test(body))
          verdict = "200 carrying a challenge or rejection page";
      } else {
        const c = viaCurl(url);
        if (!(c && c.status === 200 && c.n > 1000))
          verdict = (r.status ? "HTTP " + r.status : "conn " + r.err) +
                    (c ? ", curl " + c.status + "/" + c.n + "b" : ", curl also failed");
      }
    }

    if (verdict) bad.push({ url, units, verdict });
    process.stderr.write("\r" + i + "/" + links.size + "  " + bad.length + " suspect ");
  }
  process.stderr.write(NL + NL);

  bad.sort((a, b) => b.units.length - a.units.length);
  for (const b of bad) console.log(b.verdict + NL + "  " + b.url + NL + "  cited by: " + b.units.join(", ") + NL);
  console.log(bad.length + " of " + links.size + " urls need a look");
  if (outFile) fs.writeFileSync(outFile, JSON.stringify(bad, null, 1) + NL);
})();
