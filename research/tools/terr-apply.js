// Write verified territory content onto entries that already exist.
//
//     node terr-apply.js <domain> <verified.json>            # validate
//     node terr-apply.js <domain> <verified.json> --write
//
// add-territories.js creates the units; this fills them. It goes through
// fl/apply.js, so the bullet rules, the refusal to overwrite a written field,
// and the typed-field guards all apply exactly as they do everywhere else.
//
// policyHistory is merged rather than assigned, because apply.js assigns and
// several of these entries already carry rows from the Indigenous pass.
const fs = require("fs");
const path = require("path");
const { apply, ATLAS } = require("./fl/apply");

const NL = String.fromCharCode(10);
const domain = process.argv[2];
const file = process.argv[3];
if (!domain || !file) { console.log("usage: node terr-apply.js <domain> <verified.json> [--write]"); process.exit(1); }

const verified = JSON.parse(fs.readFileSync(file, "utf8"));

// The gate keeps bullets, not slot numbers, so the numbers are read back from
// the drafters' output directory when one is given as a third argument.
const slotsBySpec = new Map();
const specDir = process.argv[4] && !process.argv[4].startsWith("--") ? process.argv[4] : null;
if (specDir && fs.existsSync(specDir)) {
  for (const f of fs.readdirSync(specDir).filter(x => /^out-\d+\.json$/.test(x))) {
    const batch = JSON.parse(fs.readFileSync(path.join(specDir, f), "utf8"));
    for (const [k, spec] of Object.entries(batch)) {
      for (const [fld, list] of Object.entries(spec.slots || {})) {
        const bullets = (spec.fields || {})[fld] || [];
        if (!Array.isArray(list) || list.length !== bullets.length) continue;
        const m = new Map();
        bullets.forEach((b, i) => m.set(b, Number(list[i])));
        slotsBySpec.set(k + "\u0000" + fld, m);
      }
    }
  }
}
const spec = {}, history = {};
for (const [key, v] of Object.entries(verified)) {
  const s = { confidence: "official-document" };
  if (v.fields && Object.keys(v.fields).length) s.fields = v.fields;
  if (v.series && Object.keys(v.series).length) s.series = v.series;
  // Two shapes, because the gate emits one and this file was written for the
  // other. `offerings` used to arrive as a bare ARRAY and be wrapped here; now
  // that the gate verifies it, it arrives keyed by field name like series,
  // languages and programme do. Reading only the array shape meant a freshly
  // verified batch reported "0 fields, 0 bullets" and wrote nothing at all --
  // 68 rows across thirteen countries, gated and passed, dropped in the last
  // step without a word. Accept both.
  if (Array.isArray(v.offerings) && v.offerings.length) s.offerings = { offerings: v.offerings };
  else if (v.offerings && !Array.isArray(v.offerings) && Object.keys(v.offerings).length) s.offerings = v.offerings;
  // The gate emits `languages` keyed by field, the way it emits series, so it
  // is passed straight to apply.js -- which already knows the shape and clears
  // any not-established flag the field carried.
  if (v.languages && Object.keys(v.languages).length) s.languages = v.languages;
  if (v.programme && Object.keys(v.programme).length) s.programme = v.programme;
  if (v.notEstablished && Object.keys(v.notEstablished).length) s.notEstablished = v.notEstablished;
  // Slot numbers describe PARTICULAR bullets, so they have to be re-aligned to
  // whatever survived the gate. A field drafted with slots [1,2,4] whose middle
  // bullet was dropped needs [1,4]: carrying the list over unchanged would
  // attach every number after the gap to the wrong sentence, which is worse
  // than having no numbers at all. `slotsBySpec` is keyed by bullet text for
  // exactly this reason.
  if (v.fields && slotsBySpec.size) {
    const out = {};
    for (const [f, kept] of Object.entries(v.fields)) {
      const map = slotsBySpec.get(key + "\u0000" + f);
      if (!map) continue;
      const list = kept.map(b => map.get(b)).filter(n => Number.isInteger(n));
      if (list.length === kept.length) out[f] = list;
    }
    if (Object.keys(out).length) s.slots = out;
  }
  // fl/apply.js validates the sentinel phrase and writes this. Without the line
  // below it never arrived, so an absence finding died between the gate and the
  // store with nothing logged either side.
  if (v.sources && v.sources.length) {
    s.addDocLinks = v.sources.map(x => ({ label: x.label, url: x.url }));
  }
  // A unit whose ONLY finding is policy history is a real unit. The test below
  // used to skip it before line 72 had recorded its rows, so the rows and the
  // sources backing them were both dropped, silently, and the run reported
  // "+0 rows" as though the drafter had found nothing. Thirteen units went
  // that way in one pass -- Singapore, Indonesia, five Chinese provinces --
  // each carrying verified rows for a field that stood at 0% across all 353.
  //
  // It stays in `spec` rather than being merged on its own, because that is
  // what carries `addDocLinks` and the stub promotion through apply(). The
  // ROWS are still merged below rather than assigned, since apply() assigns
  // and entries elsewhere already carry rows from the Indigenous pass.
  const hasHistory = !!(v.history && v.history.length);
  if (hasHistory) history[key] = v.history;
  // `addDocLinks` alone is a legitimate spec. A pass that recovers the sources
  // for rows already written adds nothing else, and this guard used to drop it
  // -- the same "nothing but X is nothing" mistake made for history and for
  // languages, three times in one file.
  if (!s.fields && !s.series && !s.notEstablished && !s.offerings && !s.languages && !s.programme && !s.addDocLinks && !hasHistory) continue;
  spec[key] = s;
}

const out = apply(domain, spec);
if (!out) process.exit(1);

const norm = x => String(x).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
let added = 0, dupes = 0;
for (const [key, rows] of Object.entries(history)) {
  const [cc, name] = key.split("|");
  const e = out.rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) { console.log("  no entry for " + key); continue; }
  const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
  const fresh = [];
  for (const r of rows) {
    if (!r || !Number.isInteger(r.year) || !String(r.description || "").trim()) continue;
    const sig = r.year + "|" + norm(r.description);
    if (have.has(sig)) { dupes++; continue; }
    have.add(sig); fresh.push(r);
  }
  e.policyHistory = [...(e.policyHistory || []), ...fresh].sort((a, b) => a.year - b.year);
  added += fresh.length;
}
console.log("  policyHistory merged: +" + added + " rows, " + dupes + " already present");

if (process.argv.includes("--write")) {
  fs.writeFileSync(out.FILE, JSON.stringify(out.rows, null, 1) + NL);
  console.log("  wrote " + path.basename(out.FILE));
} else {
  console.log("  (dry run - pass --write)");
}
