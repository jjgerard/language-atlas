// Split the remaining PEER units into per-agent briefs.
//
//     node peer-briefs.js <outDir> [batchSize]
//
// A brief carries what a drafter has to know and nothing else: which fields on
// that entry are EMPTY, what the filled ones already say (so a new field does
// not restate or contradict them), and where the retrieved profile text is.
// The profile itself stays on disk — the agent reads it rather than receiving
// it, so the brief stays small and the text it quotes is the text on file.
const fs = require("fs"), path = require("path");
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const PEER = path.join(ATLAS, "research", "peer");
const { DOMAINS } = require(path.join(ATLAS, "src", "domains.js"));
const DLD = DOMAINS.find(d => d.id === "dld");
const FIELDS = DLD.fields.filter(f => f[0] !== "policyHistory");

const DONE = new Set(["KE", "NP", "AF", "GA"]);   // tranche 1, already written
const filled = v => v == null ? false : Array.isArray(v) ? v.length > 0 : String(v).trim().length > 0;
const rows = JSON.parse(fs.readFileSync(path.join(ATLAS, "data", "dld.json"), "utf8"));
const byCC = new Map(rows.filter(r => r.isNational).map(r => [r.countryCode, r]));

const outDir = process.argv[2];
const size = Number(process.argv[3] || 7);
if (!outDir) { console.log("usage: node peer-briefs.js <outDir> [batchSize]"); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const units = fs.readdirSync(PEER).filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""))
  .filter(cc => !DONE.has(cc) && byCC.has(cc)).sort();

const briefs = units.map(cc => {
  const e = byCC.get(cc);
  const text = fs.readFileSync(path.join(PEER, cc + ".md"), "utf8");
  const url = (text.match(/^URL: (\S+)/m) || [])[1] || "";
  const empty = FIELDS.filter(f => !filled(e[f[0]])).map(f => f[0]);
  const has = FIELDS.filter(f => filled(e[f[0]])).map(f =>
    "      " + f[0] + ": " + String(e[f[0]]).split("\n")[0].slice(0, 90));
  return [
    "### " + cc + "|" + e.unitName,
    "  profile text: research/peer/" + cc + ".md",
    "  url (cite this exact string): " + url,
    "  policyHistory rows already on the entry: " + (e.policyHistory || []).length,
    "  FIELDS YOU MAY FILL (all currently empty): " + empty.join(", "),
    "  fields already written, do not restate or contradict:",
    ...(has.length ? has : ["      (none)"]),
    "",
  ].join("\n");
});

let n = 0;
for (let i = 0; i < briefs.length; i += size) {
  n++;
  const slice = briefs.slice(i, i + size);
  fs.writeFileSync(path.join(outDir, "batch-" + n + ".md"),
    "# Batch " + n + " — " + slice.length + " units\n\n" + slice.join("\n"));
}
console.log(units.length + " units across " + n + " briefs in " + outDir);
console.log(units.join(" "));
