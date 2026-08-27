// node emit.js Telugu Urdu Hindi   -> the languages JSON array for those cache keys.
// Keys must already be in langcache.json, i.e. already resolved by rows.js.
// A key prefixed with "!" is a deliberate empty-wals row for a name WALS does
// not carry (checked by name AND by ISO before being written this way).
const fs = require("fs");
const path = require("path");
const cache = JSON.parse(fs.readFileSync(path.join(__dirname, "langcache.json"), "utf8"));
const out = process.argv.slice(2).map(k => {
  if (k[0] === "!") return { name: k.slice(1), wals: "", iso: "", family: "", genus: "", typology: "" };
  if (!cache[k]) { console.error("MISSING FROM CACHE: " + k); process.exit(1); }
  return cache[k];
});
console.log(JSON.stringify(out, null, 1));
