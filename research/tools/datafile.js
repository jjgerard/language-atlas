// Where a domain's entries live on disk.
//
//     const { fileFor, pathFor } = require("./datafile");
//     const rows = JSON.parse(fs.readFileSync(pathFor("he"), "utf8"));
//
// This exists because the same bug happened three times in two days. Every
// tool in here carried its own copy of
//
//     { eal: "eal.json", dld: "dld.json", fl: "fl.seed.json", indigenous: … }
//
// and adding the `he` map broke each of them the moment it was reached —
// `path.join(undefined)` with a stack trace and no hint that a domain was
// missing from a lookup table. selfref-to-notestablished.js died halfway
// through a run, after reporting on one domain, which is the worst version:
// a --write there would have converted one map's fields and left the rest
// with nothing saying so.
//
// The rule is the one store.js already uses: prefer the living snapshot the
// running app commits back, fall back to the curated seed. Deriving it means
// the next map added to src/domains.js needs no edit here at all.
const fs = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "..", "..", "data");

/** The filename for a domain's entries, or null if it has no data file yet. */
function fileFor(id) {
  for (const name of [id + ".json", id + ".seed.json"])
    if (fs.existsSync(path.join(DATA, name))) return name;
  return null;
}

/** Absolute path to a domain's entries. Throws by name rather than by stack. */
function pathFor(id) {
  const name = fileFor(id);
  if (!name) throw new Error(
    "no data file for domain '" + id + "' — expected data/" + id + ".json or data/" + id + ".seed.json");
  return path.join(DATA, name);
}

module.exports = { DATA, fileFor, pathFor };
