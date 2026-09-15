// Prove an applier touched only what it claimed to.
//
//     node coding-verify.js <domain> [key ...]
//     node coding-verify.js dld coding
//
// Every applier in here writes the whole data file back, so its git diff is the
// wrong instrument: it shows thousands of moved lines and cannot tell you
// whether a sourced claim moved with them. This parses both sides and compares
// entry by entry, key by key.
//
// The rule it enforces is the one that makes the coding layer safe to revise at
// all: a coding is a reading OF the prose, so a coding pass must leave every
// field exactly as it found it. If this reports anything outside the keys you
// named, the run did something you did not ask for and the right move is
// `git checkout` on the data file, not investigation of the diff.
//
// Name the keys you INTENDED to change. Everything else is reported as a
// finding. With no keys named, every difference is reported, which is the
// honest default for a tool you are pointing at a file you did not expect to
// change at all.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..", "..");
const { fileFor, pathFor } = require("./datafile");

const args = process.argv.slice(2);
const domainId = args[0];
const allowed = new Set(args.slice(1));
if (!domainId) { console.log("usage: coding-verify.js <domain> [key ...]"); process.exit(2); }

const file = fileFor(domainId);
if (!file) { console.error("no data file for " + domainId); process.exit(2); }

const head = JSON.parse(execFileSync("git", ["show", "HEAD:data/" + file],
  { cwd: ROOT, maxBuffer: 1 << 30 }).toString());
const now = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));

if (head.length !== now.length) {
  console.log("ENTRY COUNT CHANGED: " + head.length + " -> " + now.length);
  process.exit(1);
}

const intended = {}, unexpected = {}, examples = [];
for (let i = 0; i < head.length; i++) {
  const a = head[i], b = now[i];
  if (a.countryCode !== b.countryCode || a.unitName !== b.unitName) {
    console.log("ROW ORDER CHANGED at index " + i);
    process.exit(1);
  }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (JSON.stringify(a[k]) === JSON.stringify(b[k])) continue;
    if (allowed.has(k)) { intended[k] = (intended[k] || 0) + 1; continue; }
    unexpected[k] = (unexpected[k] || 0) + 1;
    if (examples.length < 5) examples.push(b.countryCode + "|" + b.unitName + " ." + k);
  }
}

const NL = String.fromCharCode(10);
console.log("intended changes: " + (Object.keys(intended).length
  ? Object.entries(intended).map(([k, n]) => k + " on " + n + " entries").join(", ")
  : "none"));
if (Object.keys(unexpected).length) {
  console.log(NL + "UNEXPECTED changes to " + Object.keys(unexpected).length + " key(s):");
  for (const [k, n] of Object.entries(unexpected)) console.log("  " + k + ": " + n + " entries");
  console.log("  e.g. " + examples.join(", "));
  console.log(NL + "  A coding pass must move no sourced claim. Consider"
    + " `git checkout data/" + file + "` and finding out why.");
  process.exit(1);
}
console.log("no other key differs from HEAD. " + head.length + " entries checked.");
