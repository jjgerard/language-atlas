// Build a name -> row cache by shelling rows.js one name at a time, so an
// ambiguous name is isolated and reported rather than silently dropped.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const WALS = path.join(__dirname, "wals");
const CACHE = path.join(__dirname, "langcache.json");

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};
const names = process.argv.slice(2);
const problems = [];

for (const n of names) {
  if (cache[n]) continue;
  const out = execFileSync("node", [path.join(WALS, "rows.js"), n], { cwd: WALS, encoding: "utf8" });
  const jsonEnd = out.indexOf("\n\n// NOTES");
  const json = JSON.parse(jsonEnd === -1 ? out : out.slice(0, jsonEnd));
  const notes = jsonEnd === -1 ? "" : out.slice(jsonEnd);
  if (json.length === 1) {
    cache[n] = json[0];
    if (/NO WALS RECORD/.test(notes)) problems.push(`NOLINK  ${n}`);
  } else {
    problems.push(`AMBIG   ${n}\n${notes}`);
  }
}
fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
console.log(`cache: ${Object.keys(cache).length} names`);
problems.forEach(p => console.log(p));
