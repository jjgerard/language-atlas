// Pull every EVIDENCE quote out of the per-unit report files and pair it with
// the local copy of the source it cites, so chk.js can prove each one.
// The mapping is by URL shape: each retrieval family saved its files under a
// fixed prefix, so the last path segment is enough to find the text dump.
const fs = require("fs"), path = require("path");
const [PARTS, DIR, GLOB] = process.argv.slice(2);

function local(url) {
  let m;
  if ((m = url.match(/education-profiles\.org\/[^/]+\/([^/]+)\/~/))) return `peer_${m[1]}.txt`;
  if ((m = url.match(/pirls2021\.org\/.*\/([^/]+)\.pdf/i)))          return `p21_${m[1]}_pdf.txt`;
  if ((m = url.match(/timss2023\.org\/.*\/([^/]+)\.pdf/i)))          return `t23_${m[1]}_pdf.txt`;
  if ((m = url.match(/timss2019\/encyclopedia\/pdf\/([^/]+)\.pdf/i)))return `t19_${m[1]}_pdf.txt`;
  return null;
}

const checks = [], unmapped = new Set();
for (const f of fs.readdirSync(PARTS).filter(n => new RegExp(GLOB).test(n))) {
  const lines = fs.readFileSync(path.join(PARTS, f), "utf8").split(/\r?\n/);
  let inEvidence = false, pending = null;
  for (const line of lines) {
    if (/^EVIDENCE:/.test(line)) { inEvidence = true; continue; }
    if (/^(DRAFT BULLETS|NEGATIVE|SOURCES):/.test(line)) { inEvidence = false; continue; }
    if (!inEvidence) continue;
    let m;
    if ((m = line.match(/^\s*quote:\s*"(.+)"\s*$/))) pending = m[1];
    else if ((m = line.match(/^\s*source:\s*(\S+)/)) && pending) {
      const fn = local(m[1]);
      if (!fn) unmapped.add(m[1]);
      else checks.push([path.join(DIR, fn), `${f.replace(/\.md$/,"")}  ${pending.slice(0,48)}…`, pending]);
      pending = null;
    }
  }
}
fs.writeFileSync("checks.json", JSON.stringify(checks, null, 1));
console.log(`${checks.length} quotes to verify`);
if (unmapped.size) { console.log("UNMAPPED URLS:"); unmapped.forEach(u => console.log("  " + u)); }
