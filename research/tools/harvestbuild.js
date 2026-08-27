// Harvest pass: fields taken from documents the entries ALREADY cite.
//
// Three agents are writing into reports/parts while this runs, so a file
// touched in the last 90 seconds is SKIPPED rather than read half-written. A
// truncated read would not fail loudly — it would write a half-sentence bullet
// that passes every length check. Skipped units are picked up by the next pass,
// which is safe because apply.js refuses to overwrite a field that has text.
const fs = require("fs");
const path = require("path");
const { build } = require("./parseparts");

const PARTS = path.join(__dirname, "reports", "parts");
const FRESH_MS = 90 * 1000;
const now = Date.now();

const skipped = [];
const settled = f => {
  const age = now - fs.statSync(path.join(PARTS, f)).mtimeMs;
  if (age < FRESH_MS) { skipped.push(f + " (written " + Math.round(age / 1000) + "s ago)"); return false; }
  return true;
};

// Which domain a field belongs to. The harvest files cover all three maps in
// one file per unit, so the spec has to be split by field rather than by file.
const DOMAIN_OF = {
  terminology: "dld", serviceModel: "dld",
  languagesOffered: "fl", primaryRequirement: "fl", regionalMinorityLanguages: "fl", upperSecondary: "fl",
  l1Support: "eal", newcomerCriteria: "eal", bilingualEducationNotes: "eal", l2Support: "eal",
};

// peerwork.json is a SNAPSHOT of the gaps as they were when the wave was
// planned. Earlier passes have since filled some of them, so it goes stale the
// moment anything is written. Checking the live store instead means a field
// already filled is dropped here rather than rejected by apply.js's overwrite
// guard, which lets a wave be applied repeatedly as agents finish.
const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const STORE = { fl: "fl.seed.json", dld: "dld.json", eal: "eal.json" };
const live = {};
for (const [d, f] of Object.entries(STORE)) {
  live[d] = new Map();
  for (const r of JSON.parse(fs.readFileSync(path.join(ATLAS, "data", f), "utf8"))) {
    live[d].set(r.countryCode + "|" + r.unitName, r);
  }
}
const alreadyFilled = (d, key, field) => {
  const r = live[d] && live[d].get(key);
  if (!r) return false;
  const v = r[field];
  if (Array.isArray(v)) return v.length > 0;
  return String(v || "").trim().length > 0;
};

const ISO = JSON.parse(fs.readFileSync(path.join(__dirname, "peerwork.json"), "utf8"));
const unitOfCode = {};
for (const w of ISO) unitOfCode[w.unit.split("|")[0]] = w;

const raw = build(/^harvest-[A-Z]{2}\.md$/, f => {
  if (!settled(f)) return null;
  const cc = f.replace(/^harvest-|\.md$/g, "");
  const w = unitOfCode[cc];
  if (!w) return null;
  return { domain: "MIXED", key: w.unit, confidence: "secondary-source" };
});
// Drop the "cannot map" problems caused by our own freshness skip.
raw.problems = raw.problems.filter(p => !skipped.some(s => p.startsWith(s.split(" ")[0])));

// Re-split the MIXED bucket into real domains, and drop any field the worklist
// did not ask for — an agent that answered an already-filled field would
// otherwise trip apply.js's overwrite guard for no reason.
const spec = { fl: {}, dld: {}, eal: {} };
let dropped = 0, already = 0;
for (const [key, entry] of Object.entries(raw.spec.MIXED || {})) {
  const cc = key.split("|")[0];
  const wanted = unitOfCode[cc] ? unitOfCode[cc].gaps : {};
  for (const [field, bullets] of Object.entries(entry.fields)) {
    const d = DOMAIN_OF[field];
    if (!d) { dropped++; continue; }
    if (!(wanted[d] || []).includes(field)) { dropped++; continue; }
    if (alreadyFilled(d, key, field)) { already++; continue; }
    spec[d][key] = spec[d][key] || { confidence: "secondary-source", fields: {}, addDocLinks: entry.addDocLinks };
    spec[d][key].fields[field] = bullets;
  }
  // policyHistory is collected but NOT written in this pass, on purpose.
  //
  // A PEER country profile mixes its dated instruments across every topic, so
  // one unit's rows include both language decrees and disability legislation.
  // Mauritius's list carries "Building Regulations require buildings to be
  // accessible for persons with disabilities"; Tunisia's carries circulars on
  // integrating children with disabilities. Neither unit is being touched on
  // the dld map here, so copying every row onto the domains that ARE touched
  // would put building-accessibility rules on a foreign-languages timeline.
  //
  // Routing each row to the right map needs a judgement this cannot make
  // safely, and policyHistory sits at 25-30% fill, which puts it late in the
  // agreed order anyway. The rows stay on disk in the evidence files and get a
  // dedicated pass. Nothing is lost by waiting; something is wrong by hurrying.
}
// One bullet at a time, agents occasionally run a few characters over the
// panel's 96. Rather than let apply.js reject a whole wave for it, or silently
// truncate mid-word, a named fix is recorded here so the change is visible and
// reviewable next to the reason for it. The quote inside stays verbatim.
const OVERLONG = {
  "ML|Mali": {
    l2Support: {
      // 98 chars. PEER's phrase is the quoted part and survives intact.
      from: 'French is the medium here, not a foreign language: PEER calls it "official language of expression"',
      to: "French is the medium, not a foreign language: PEER's \"official language of expression\"",
    },
  },
  "CD|DR Congo": {
    upperSecondary: {
      // 101 chars. "the secondary and higher levels" is the quoted clause and
      // is kept; the framing around it is what shortens.
      from: 'Only statement past primary is ELAN local languages "as a subject at the secondary and higher levels"',
      to: 'Only ELAN mention: local languages "as a subject at the secondary and higher levels"',
    },
  },
};
for (const [key, fields] of Object.entries(OVERLONG)) {
  for (const d of Object.keys(spec)) {
    const e = spec[d][key];
    if (!e) continue;
    for (const [field, fix] of Object.entries(fields)) {
      const arr = e.fields[field];
      if (!arr) continue;
      const i = arr.indexOf(fix.from);
      if (i >= 0) arr[i] = fix.to;
    }
  }
}

// Agents sometimes repeat a field header within one evidence file, so the
// parser correctly concatenates two blocks and the result runs past the panel's
// five-bullet limit. The content is real and distinct, so it is curated by
// SELECTING existing bullets by index — never rewritten, because an edited
// bullet is no longer the one whose quote was verified. Index 0 first where
// that bullet is the hedge, since a reader of a list may not reach its bottom.
const TRIM = {
  // 8 bullets. Keeps the hedge, the characterisation that the service is
  // teacher- not clinician-mediated, and the concrete provision. Drops the
  // legal-category and prevalence bullets, which belong to other fields.
  "MZ|Mozambique": { serviceModel: [0, 4, 1, 2, 3] },
  // 8 bullets, one of them 97 chars. Keeps the hedge, the sector plan's own
  // silence, what PEER infers from it, the one named provision, and the
  // ministry's own verdict on its definition. Dropping the teacher-training
  // bullet resolves the over-length at the same time.
  "SO|Somalia": { serviceModel: [0, 1, 2, 3, 7] },
  // 8 bullets. Keeps the finding, the term counts that prove it and their
  // sanity check, and the two bullets showing the policy runs the other way —
  // towards mother tongues, not towards French for arrivals.
  "TG|Togo": { l2Support: [0, 4, 7, 2, 3] },
};
for (const [key, fields] of Object.entries(TRIM)) {
  for (const d of Object.keys(spec)) {
    const e = spec[d][key];
    if (!e) continue;
    for (const [field, keep] of Object.entries(fields)) {
      const all = e.fields[field];
      if (!all) continue;
      const picked = keep.map(i => all[i]);
      if (picked.some(b => b === undefined)) {
        console.log(`TRIM index out of range for ${key}/${field} (has ${all.length})`);
        process.exit(1);
      }
      e.fields[field] = picked;
    }
  }
}

// Anything still over the limit is reported rather than silently truncated, so
// the next wave's curation list writes itself.
const over = [];
for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d]))
  for (const [f, arr] of Object.entries(e.fields)) {
    if (arr.length > 5) over.push(`${k}/${f}: ${arr.length} bullets`);
    for (const b of arr) if (b.length > 96) over.push(`${k}/${f}: ${b.length} chars — "${b.slice(0, 60)}"`);
  }

// An entry left with no fields at all (everything already written) must not be
// handed to apply.js, or it would restamp metadata on a finished entry.
for (const d of Object.keys(spec)) {
  for (const [k, e] of Object.entries(spec[d])) {
    if (!Object.keys(e.fields).length) delete spec[d][k];
  }
}

module.exports = { spec, problems: raw.problems, skipped, dropped, already, files: raw.files, over };

if (require.main === module) {
  let f = 0, b = 0, h = 0, u = new Set();
  for (const d of Object.keys(spec)) for (const [k, e] of Object.entries(spec[d])) {
    u.add(k); f += Object.keys(e.fields).length;
    for (const x of Object.values(e.fields)) b += x.length;
    h += (e.history || []).length;
  }
  console.log(`${u.size} units, ${f} fields, ${b} bullets, ${h} history rows`);
  for (const d of Object.keys(spec)) console.log(`  ${d}: ${Object.keys(spec[d]).length} entries`);
  console.log(`\nskipped as still-being-written: ${skipped.length}`);
  skipped.forEach(s => console.log("  " + s));
  console.log(`fields dropped as not-requested-or-unknown: ${dropped}`);
  console.log(`fields already written by an earlier pass: ${already}`);
  console.log(`problems: ${raw.problems.length}`); raw.problems.forEach(p => console.log("  " + p));
}
