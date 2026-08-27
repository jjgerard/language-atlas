// Resolve the conflicts the PEER pass surfaced, in PEER's favour.
//
//     node peer-reconcile.js            # show the before/after
//     node peer-reconcile.js --write
//
// These edit fields that are already written, which apply.js refuses to do by
// design, so they are done here one at a time with the reason recorded.
//
// KENYA IS DELIBERATELY NOT HERE. PEER dates the Basic Education Act to 2012;
// the entry cites the Act itself on Kenya Law at akn/ke/act/2013/14, which is
// the instrument rather than an account of it. Preferring a secondary source
// over the primary one it describes would inverting the confidence tiers the
// entry carries, so that conflict stays open and visible instead.
const fs = require("fs");
const path = require("path");

const NL = String.fromCharCode(10);
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const FILE = path.join(ATLAS, "data", "dld.json");

const EDITS = [
  {
    key: "KP|North Korea",
    field: "terminology",
    why: "PEER names the 2003 Law on the Protection of Persons with Disabilities; the entry said 2013",
    from: "The term is known only from the state's own English rendering of its 2013 law",
    to: "The term is known only from the state's own English rendering of its 2003 law",
  },
  {
    key: "PS|Palestine",
    field: "serviceModel",
    why: "The line said no cited source describes a service or referral route; the PEER profile describes both",
    replace: [
      "Source describes special-needs provision generally, never language disorder",
      "Three resource centres across the West Bank and the Gaza Strip, with multidisciplinary teams",
      "27 inclusive education counsellors across the 16 education districts",
      "24 core special education trainers and 4 special education advisors",
      "Understaffing is common to all these sources of technical support",
    ],
  },
];

const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
const LIMIT = 96;
let ok = 0;
const problems = [];

for (const ed of EDITS) {
  const [cc, name] = ed.key.split("|");
  const e = rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) { problems.push(ed.key + ": no such entry"); continue; }
  const before = String(e[ed.field] || "");

  let after;
  if (ed.replace) {
    after = ed.replace.join(NL);
  } else {
    if (!before.includes(ed.from)) { problems.push(ed.key + "/" + ed.field + ": the line to change is not there"); continue; }
    after = before.split(NL).map(l => (l === ed.from ? ed.to : l)).join(NL);
  }

  for (const b of after.split(NL)) {
    if (b.length > LIMIT) problems.push(ed.key + "/" + ed.field + ": " + b.length + " chars - " + b.slice(0, 50));
    if (/[.;]$/.test(b)) problems.push(ed.key + "/" + ed.field + ": ends with punctuation - " + b.slice(0, 50));
  }
  if (after.split(NL).length > 5) problems.push(ed.key + "/" + ed.field + ": more than five lines");

  console.log("## " + ed.key + " / " + ed.field);
  console.log("   why: " + ed.why);
  console.log("   before:");
  before.split(NL).forEach(b => console.log("     - " + b));
  console.log("   after:");
  after.split(NL).forEach(b => console.log("     - " + b));
  console.log("");
  e[ed.field] = after;
  ok++;
}

if (problems.length) {
  console.log("PROBLEMS - nothing written:");
  problems.forEach(p => console.log("  " + p));
  process.exit(1);
}
console.log(ok + " fields reconciled");
if (process.argv.includes("--write")) {
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 1) + NL);
  console.log("  wrote dld.json");
} else {
  console.log("  (dry run - pass --write)");
}
