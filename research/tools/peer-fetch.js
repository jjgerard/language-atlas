// Retrieve the UNESCO PEER "inclusion" profile for every unit whose profile is
// already cited somewhere on the atlas but never mined for the dld map.
//
//     node peer-fetch.js            # list the targets, fetch nothing
//     node peer-fetch.js --run      # fetch, extract, write research/peer/<cc>.md
//
// PEER is the widest-coverage source the atlas uses and the most cited, but it
// is prose: one page per country, nothing tabulated. Its inclusion profile does
// carry the material the dld map asks for — how a child is identified, who
// refers, what the law obliges — and the Caribbean wave already used it that
// way, which is why those twelve entries have prevalence rows at all.
//
// ONE CAVEAT TRAVELS WITH EVERYTHING THIS PRODUCES. PEER writes about
// disability and special educational needs in general. It very rarely says
// "speech" or "language disorder". A bullet drawn from it must say that it is
// an SEN-wide rule, or it claims a precision the source does not have.
const fs = require("fs");
const path = require("path");
const https = require("https");

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const OUT = path.join(ATLAS, "research", "peer");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const DLD = DOMAINS.find(d => d.id === "dld");
const CONTENT = DLD.fields.map(f => f[0]).filter(f => f !== "policyHistory");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const filled = v => v == null ? false : Array.isArray(v) ? v.length > 0 : String(v).trim().length > 0;
const load = f => JSON.parse(fs.readFileSync(path.join(ATLAS, "data", f), "utf8"));
const keyOf = r => r.countryCode + "|" + r.unitName;

const PEER = /education-profiles\.org/i;
const dld = load("dld.json");
const dldBy = new Map(dld.map(r => [keyOf(r), r]));

// A profile url already retrieved for this unit on some other map. Reusing it
// matters: it was verified when it was written, and guessing a slug from a
// country name is how Niger's curriculum came back as Mali's.
const urlFor = new Map();
for (const f of ["eal.json", "fl.seed.json", "indigenous.json"]) {
  for (const r of load(f)) {
    const hit = [...(r.docLinks || []), ...(r.supportLinks || [])].find(l => l && PEER.test(l.url || ""));
    if (hit && !urlFor.has(keyOf(r))) urlFor.set(keyOf(r), hit.url);
  }
}
const already = new Set(dld.filter(r => (r.docLinks || []).some(l => l && PEER.test(l.url || ""))).map(keyOf));

const targets = [...urlFor.entries()]
  .filter(([k]) => !already.has(k) && dldBy.has(k))
  .map(([k, url]) => {
    const e = dldBy.get(k);
    return { key: k, url, fields: CONTENT.filter(f => filled(e[f])).length, region: e.region };
  })
  .sort((a, b) => a.fields - b.fields || a.key.localeCompare(b.key));

// ---------- extraction ----------
// PEER pages are one long document with named sections. These are the headings
// whose content bears on the dld map's questions; everything else on the page
// is about school buildings, gender parity and finance, and is dropped rather
// than skimmed for anything that looks relevant.
const WANTED = [
  "Definitions", "Constitution", "Education law", "Laws, plans, policies and programmes",
  "Early identification", "screening and assessment", "Identification",
  "Learning environments", "Support for learners", "Teachers and support personnel",
  "Teachers", "Governance", "Financing", "Curricula", "Monitoring and reporting",
  "School organization", "Learners", "Data",
];

function textOf(html) {
  let t = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  // Keep block boundaries as newlines so headings do not fuse with their prose.
  t = t.replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n");
  t = t.replace(/<(h[1-6])[^>]*>/gi, "\n## ");
  t = t.replace(/<br\s*\/?>/gi, "\n");
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'")
       .replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&mdash;|&ndash;/g, "-").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  return t.split("\n").map(x => x.replace(/[ \t]+/g, " ").trim()).filter(Boolean).join("\n");
}

/** Pull only the sections a dld question could be answered from. */
function sectionsOf(text) {
  const lines = text.split("\n");
  const out = [];
  let cur = null;
  for (const line of lines) {
    const isHead = /^## /.test(line) || (line.length < 70 && /^[A-Z][^.]*$/.test(line) && line.split(" ").length <= 8);
    if (isHead) {
      const name = line.replace(/^## /, "").trim();
      const want = WANTED.some(w => name.toLowerCase().includes(w.toLowerCase()));
      cur = want ? { name, body: [] } : null;
      if (cur) out.push(cur);
      continue;
    }
    if (cur && line.length > 40) cur.body.push(line);
  }
  // Long boilerplate repeats on every profile; a section that is identical
  // across countries is navigation, not content.
  return out.filter(s => s.body.length).map(s => ({ name: s.name, body: s.body.slice(0, 12) }));
}

function get(url, redirects = 0) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": UA, "Referer": "https://www.google.com/", "Accept": "text/html" } }, res => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects < 4) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).href, redirects + 1));
      }
      let body = "";
      res.setEncoding("utf8");
      res.on("data", c => body += c);
      res.on("end", () => resolve({ status: res.statusCode, body, url }));
    });
    req.setTimeout(45000, () => { req.destroy(); resolve({ status: 0, body: "", url }); });
    req.on("error", () => resolve({ status: 0, body: "", url }));
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log(targets.length + " units with a PEER profile cited elsewhere but not on dld");
  console.log("  " + targets.filter(t => t.fields <= 4).length + " of them carry 4 or fewer dld fields\n");
  if (!process.argv.includes("--run")) {
    targets.forEach(t => console.log("  " + String(t.fields).padStart(2) + "/12  " + t.key.padEnd(28) + t.url.slice(0, 78)));
    console.log("\nnothing fetched — pass --run");
    return;
  }
  fs.mkdirSync(OUT, { recursive: true });
  let ok = 0, fail = 0, empty = 0;
  for (const t of targets) {
    const cc = t.key.split("|")[0];
    const file = path.join(OUT, cc + ".md");
    if (fs.existsSync(file)) { ok++; continue; }
    const r = await get(t.url);
    if (r.status !== 200 || !r.body) { fail++; console.log("  FAIL " + r.status + "  " + t.key); await sleep(700); continue; }
    const secs = sectionsOf(textOf(r.body));
    if (!secs.length) { empty++; console.log("  EMPTY " + t.key + " (200, no wanted section)"); await sleep(700); continue; }
    const md = ["### " + t.key, "URL: " + t.url, "HTTP: " + r.status + "  bytes: " + r.body.length,
                "dld fields now: " + t.fields + "/12", ""]
      .concat(secs.flatMap(s => ["## " + s.name, ...s.body.map(b => "  " + b), ""]));
    fs.writeFileSync(file, md.join("\n"));
    ok++;
    console.log("  ok  " + t.key.padEnd(28) + secs.length + " sections, " + secs.reduce((a, s) => a + s.body.length, 0) + " passages");
    await sleep(700);
  }
  console.log("\n" + ok + " retrieved, " + fail + " failed, " + empty + " returned nothing usable");
})();
