// Boot the app the way a Fly machine boots it, and fail loudly if it cannot.
//
//     node boot-check.js
//
// There is no volume on Fly, so every machine starts with an EMPTY database and
// seeds it from data/*.json. That path is the only one production ever takes,
// and it is the one path local development never takes: seedIfEmpty() returns
// immediately once data/atlas.db has rows, which it has had since the day it was
// first run. So the whole seed — sanitize() over every entry of every domain —
// can be broken for days without a single local check noticing.
//
// It was. 66ac071 called NOT_APPLICABLE_RE inside store.js where the constant
// was only declared in derive.js. dld and eal seeded, the first indigenous
// entry carrying the flag threw ReferenceError, the machine died before its
// first health check, and the deploy spent five minutes waiting for one that
// could never arrive. Every local check that day passed, because every local
// check read rows that were already in SQLite.
//
// So: a throwaway database, a real boot, a real health check, and an assertion
// about what came out the other side.

const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const NL = String.fromCharCode(10);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-boot-"));
const DB = path.join(dir, "boot.db");
const PORT = process.env.BOOT_CHECK_PORT || 3987;
const DEADLINE_MS = 60000;

const fail = (msg, extra) => {
  console.error(`${NL}BOOT CHECK FAILED: ${msg}`);
  if (extra) console.error(String(extra).split(NL).slice(-40).join(NL));
  process.exit(1);
};

const { DOMAINS, domains, LIVE } = require("./src/domains.js");
const ALL = DOMAINS || domains || LIVE;
const live = ALL.filter(d => d.live !== false);

// ---- 1. the seed itself, in-process, so a throw is legible -----------------
try {
  process.env.DB_PATH = DB;
  const t = Date.now();
  require("./src/store.js");
  console.log(`seed ok in ${((Date.now() - t) / 1000).toFixed(1)}s`);
} catch (err) {
  fail("the seed threw — this is exactly what a Fly machine does on boot", err && err.stack);
}

// ---- 2. a real boot, and the health check Fly actually calls ----------------
const child = spawn(process.execPath, ["src/server.js"], {
  env: { ...process.env, DB_PATH: DB, PORT: String(PORT), NODE_ENV: "production" },
  stdio: ["ignore", "pipe", "pipe"],
});
let log = "";
child.stdout.on("data", d => { log += d; });
child.stderr.on("data", d => { log += d; });
child.on("exit", code => {
  if (!done) fail(`the server exited with code ${code} before answering`, log);
});
let done = false;

const get = url => fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)));

(async () => {
  const until = Date.now() + DEADLINE_MS;
  let health = null;
  while (Date.now() < until) {
    try { health = await get(`http://127.0.0.1:${PORT}/api/health`); break; }
    catch { await new Promise(r => setTimeout(r, 400)); }
  }
  if (!health) { done = true; child.kill(); fail(`/api/health did not answer within ${DEADLINE_MS / 1000}s`, log); }
  if (!health.ok) { done = true; child.kill(); fail("/api/health answered but ok was false", JSON.stringify(health)); }

  // ---- 3. what came out, not just that something did -----------------------
  // A seed that silently dropped a domain answers the health check perfectly
  // well, so the count is asserted rather than assumed.
  const bad = [];
  for (const d of live) {
    const n = ((health.sources || {})[d.id] || {}).entries || 0;
    if (n < 1) bad.push(`${d.id}: ${n} entries`);
  }
  if (bad.length) { done = true; child.kill(); fail("a live domain seeded nothing: " + bad.join(", "), JSON.stringify(health.sources)); }

  // And that the derived payload builds, which is where a bad typed field shows
  // up rather than in the seed.
  let atlas;
  try { atlas = await get(`http://127.0.0.1:${PORT}/api/atlas`); }
  catch (err) { done = true; child.kill(); fail("/api/atlas would not build", (err && err.message) + NL + log); }

  const empty = live.filter(d => !((atlas.units || {})[d.id] || []).length);
  if (empty.length) { done = true; child.kill(); fail("a live domain derived no units: " + empty.map(d => d.id).join(", ")); }

  done = true;
  child.kill();
  console.log(`boot ok — ${live.map(d => `${d.id} ${(atlas.units[d.id] || []).length}`).join(", ")}`);
  try { fs.rmSync(dir, { recursive: true, force: true }); } catch { /* a temp dir */ }
  process.exit(0);
})();
