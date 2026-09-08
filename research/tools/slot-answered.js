// Which of a field's four questions ever actually get answered.
//
//     node slot-answered.js [domain]
//
// FIELD-QUESTIONS.md was built from what re-slotting agents noticed while
// working: prose that answered a question the field does not ask. This is the
// other half of the same enquiry, and it needs no agent -- a question that no
// entry anywhere answers is a question worth re-examining, and the slot lists
// now record enough to see it.
//
// Read it as a floor, not a verdict. A 0% here means nobody has answered that
// question ON A TAGGED ENTRY, which for `dld` and `eal` is still only the
// re-slotted subset. And two known distortions push in opposite directions: a
// whole-field hedge can only be tagged 1, inflating question 1; and a
// documented absence collapses to [1,1,1,1] because questions 2-4 presuppose
// the answer to 1 was yes, deflating everything after it. Both are recorded in
// FIELD-QUESTIONS.md.
const fs = require("fs");
const path = require("path");
const ATLAS = path.join(__dirname, "..", "..");
const { LIVE } = require(path.join(ATLAS, "src", "domains"));
const { slotsOf } = require(path.join(ATLAS, "src", "slots"));
const { pathFor } = require("./datafile");
const { isNotEstablished, isNotApplicable } = require(path.join(ATLAS, "src", "derive"));
const NL = String.fromCharCode(10);
const content = v => !!String(v || "").trim() && !isNotEstablished(v) && !isNotApplicable(v);

const only = process.argv[2];
const never = [];
for (const d of LIVE) {
  if (only && d.id !== only) continue;
  const rows = JSON.parse(fs.readFileSync(pathFor(d.id), "utf8")).filter(r => r.isNational !== false);
  const textFields = d.fields.filter(([, , t]) => !t || t === "text");
  let printed = false;
  for (const [k] of textFields) {
    let n = 0; const hit = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const e of rows) {
      const sl = e.slots && e.slots[k];
      if (!content(e[k]) || !Array.isArray(sl) || !sl.length) continue;
      // A documented absence is excluded from the denominator, not counted as
      // a miss on questions 2 to 4. Zambia's Higher Education Act carries no
      // language provision, so "which language" and "how much of it" do not go
      // unanswered there -- they cannot arise. Counting them as misses is what
      // made this report say the atlas neglects questions it has settled.
      if (e.absences && e.absences[k] === true) continue;
      n++;
      for (const s of new Set(sl)) if (hit[s] != null) hit[s]++;
    }
    if (n < 5) continue;   // too few tagged entries to say anything
    if (!printed) { console.log(NL + d.id + "  (of the entries whose bullets are tagged)"); printed = true; }
    const qs = slotsOf(d, k);
    const pct = x => Math.round(100 * hit[x] / n);
    console.log("  " + k.padEnd(24) + String(n).padStart(3) + " tagged   "
      + [1, 2, 3, 4].map(x => String(pct(x)).padStart(3) + "%").join(" "));
    for (const x of [1, 2, 3, 4]) {
      if (pct(x) <= 10 && qs[x - 1]) never.push({ d: d.id, k, x, pct: pct(x), n, q: qs[x - 1] });
    }
  }
}

if (never.length) {
  console.log(NL + NL + "QUESTIONS ALMOST NOBODY ANSWERS (10% or less of tagged entries)" + NL);
  never.sort((a, b) => a.pct - b.pct || b.n - a.n);
  for (const r of never)
    console.log("  " + String(r.pct).padStart(3) + "%  of " + String(r.n).padStart(3) + "   "
      + (r.d + "." + r.k).padEnd(30) + "q" + r.x + ": " + r.q);
}
