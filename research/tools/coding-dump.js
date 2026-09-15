// Print a field's codable prose, one entry per block, ready to read and code.
//
//     node coding-dump.js <domain> <field> [--all] [--from N] [--count N]
//     node coding-dump.js dld identificationCriteria --from 32 --count 32
//
// A coding pass is a reading job, and the reading has to happen in batches
// small enough to hold in mind at once -- about thirty entries. This exists so
// the batching is a flag rather than a bespoke script written from scratch at
// the start of every pass, which is what happened the first three times.
//
// CODABLE means prose is present and is not one of the two sentinels. An entry
// saying "Not established from the sources consulted" has been read by somebody
// who found nothing, and "Not applicable" is a question that cannot arise here;
// neither is a text a coding could describe, and apply-coding.js skips both
// anyway. Printing them would put them in front of a coder as though they were
// work.
//
// National only by default, for the reason progress.js gives: a sub-national
// unit usually inherits its country, so coding both counts one system twice and
// makes a federal country dominate a distribution. `--all` when the sub-national
// rows carry prose of their own, which on some maps they do.
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const { DOMAINS } = require(path.join(ROOT, "src", "domains"));
const { pathFor } = require("./datafile");

const args = process.argv.slice(2);
const flag = n => args.includes(n);
const val = (n, d) => { const i = args.indexOf(n); return i >= 0 ? Number(args[i + 1]) : d; };
const [domainId, field] = args.filter(a => !a.startsWith("--") && isNaN(Number(a)));

if (!domainId || !field) {
  console.log("usage: coding-dump.js <domain> <field> [--all] [--from N] [--count N]");
  process.exit(2);
}
const domain = DOMAINS.find(d => d.id === domainId);
if (!domain) { console.error("no such domain: " + domainId); process.exit(2); }
if (!domain.fields.some(f => f[0] === field)) {
  console.error("no field " + field + " on " + domainId + ". Fields: "
    + domain.fields.map(f => f[0]).join(", "));
  process.exit(2);
}

const codable = v => {
  const t = String(v == null ? "" : v).trim();
  return t && !/^Not established/i.test(t) && !/^Not applicable/i.test(t);
};

let rows = JSON.parse(fs.readFileSync(pathFor(domainId), "utf8"));
if (!flag("--all")) rows = rows.filter(r => r.isNational !== false);
const hits = rows.filter(r => codable(r[field]));

const from = val("--from", 0);
const count = val("--count", hits.length);
const slice = hits.slice(from, from + count);

console.log("# " + domainId + "." + field
  + "  --  " + hits.length + " codable, showing " + from + " to "
  + Math.min(from + count, hits.length)
  + (flag("--all") ? "  (all units)" : "  (national only)"));
for (const e of slice) {
  console.log("\n### " + e.countryCode + "|" + e.unitName + "   [" + (e.subregion || "?") + "]");
  console.log(e[field]);
}
if (from + count < hits.length)
  console.log("\n# " + (hits.length - from - count) + " left: --from " + (from + count));
