// Why did each newly-placed row land where it did?
//
// Routing is by subject regex, and a broad alternative can carry a row onto the
// wrong map with a straight face. "second language" is the one to watch: in
// Canada it almost always means French as a second language, which is a
// foreign-languages fact, not a newcomer-support one.
const hb = require("./histbuild");
const { out } = hb.collect();

const rows = [];
for (const [d, bucket] of Object.entries(out))
  for (const [key, rs] of Object.entries(bucket))
    for (const r of rs) rows.push({ d, key, ...r });

console.log(rows.length + " rows would be written\n");

const SUSPECT = /second[- ]language|langue seconde/i;
const OTHER_EAL = /refugee|asylum|migrant|immigrant|newcomer|newly arrived|displaced|\bEAL\b|\bESL\b|English learner|English as an additional|reception class|welcome class|accueil|francisation|castellaniz|host language|language support|integration of (pupils|students|children)|home language survey|Equal Educational Opportunities|language minority student|limited English/i;

const flagged = rows.filter(r => r.d === "eal" && SUSPECT.test(r.description) && !OTHER_EAL.test(r.description));
console.log("eal rows matched ONLY on \"second language\": " + flagged.length);
flagged.slice(0, 20).forEach(r => console.log("  " + r.key.padEnd(26) + r.year + "  " + r.description.slice(0, 76)));

console.log("\nby domain:");
for (const d of ["eal", "dld", "fl", "indigenous"]) console.log("  " + d.padEnd(11) + rows.filter(r => r.d === d).length);

const odd = rows.filter(r => /^(19|20)\d\d\b/.test(r.description));
console.log("\ndescriptions that themselves open with a year (" + odd.length + "):");
odd.slice(0, 10).forEach(r => console.log("  " + r.d.padEnd(11) + r.year + "  " + r.description.slice(0, 74)));
