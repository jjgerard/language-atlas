// Turn agents' DRAFT BULLETS sections into an apply.js spec.
//
// Eighty part files is too much to retype by hand, and retyping is exactly
// where a digit gets dropped. The files share one strict shape:
//
//     - field: <fieldName>
//       bullets:
//         - <one bullet>
//
// so they are parsed rather than transcribed. Everything this produces still
// goes through apply.js, which enforces the bullet rules and refuses to
// overwrite an existing field, and the quotes behind these bullets were
// verified separately against the retrieved corpus.
//
// Series fields (uptake, newcomerProportion, identifiedPrevalence) need
// {year, value, note} and a bullet does not carry those three parts separably.
// They are SKIPPED and listed, so they can be written by hand from the evidence
// rather than invented from prose.
const fs = require("fs");
const path = require("path");

const PARTS = path.join(__dirname, "reports", "parts");
const SERIES = new Set(["uptake", "newcomerProportion", "identifiedPrevalence"]);

// The SOURCES block above DRAFT BULLETS pairs a citation label with the URL it
// was read from. Collecting it per unit matters: an entry that cites Maharashtra
// Act III of 2020 in its bullets and links only the generic report is asking the
// reader to take the statute on trust.
function parseSources(text) {
  const out = [];
  const head = text.split(/^\s*DRAFT BULLETS/m)[0];
  for (const m of head.matchAll(/^[ \t]*-[ \t]*label:[ \t]*"?(.+?)"?[ \t]*\r?\n[ \t]*url:[ \t]*(\S+)/gm)) {
    const url = m[2].replace(/[),.]+$/, "");
    if (!/^https?:\/\//i.test(url)) continue;
    if (!out.some(l => l.url === url)) out.push({ label: m[1].trim(), url });
  }
  return out;
}

function parseFile(file) {
  const text = fs.readFileSync(path.join(PARTS, file), "utf8");
  const sources = parseSources(text);
  const start = text.search(/^\s*DRAFT BULLETS/m);
  if (start < 0) return { fields: {}, sources, note: "no DRAFT BULLETS section" };
  const lines = text.slice(start).split(/\r?\n/).slice(1);

  const fields = {};
  let cur = null, inList = false;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const f = line.match(/^\s*-\s*field:\s*(\S+)/);
    // Some agents qualified the field with its domain ("fl.primaryRequirement");
    // the store's key is the bare field name.
    if (f) { cur = f[1].replace(/[:,]$/, "").replace(/^(fl|eal|dld)\./, ""); fields[cur] = fields[cur] || []; inList = false; continue; }
    if (/^\s*(bullets|rows)\s*:/.test(line)) { inList = true; continue; }
    // "year:" / "description:" continuation lines sit deeper than a bullet dash.
    const cont = line.match(/^\s{6,}(year|description)\s*:\s*(.*)$/);
    if (cont && cur && inList) { fields[cur].push(cont[1] + ": " + cont[2].trim()); continue; }
    // A new top-level heading ends the draft section.
    if (/^\S/.test(line) && !/^\s*-/.test(line)) { cur = null; inList = false; continue; }
    const b = line.match(/^\s{4,}-\s+(.*)$/);
    if (b && cur && inList) {
      let t = b[1].trim();
      // Agents sometimes wrapped a whole bullet in quotes; the panel renders
      // plain text, and a stray pair of quotes reads as a typo.
      if (/^"[^"]*"$/.test(t)) t = t.slice(1, -1);
      if (t) fields[cur].push(t);
    }
  }
  for (const k of Object.keys(fields)) if (!fields[k].length) delete fields[k];
  return { fields, sources };
}

// Agents wrote policyHistory three ways, all legible to a human and none the
// same as the next. All three are accepted; anything that is none of them is
// REPORTED rather than guessed at, because a fabricated year in a timeline is
// indistinguishable from a real one once it is on the map.
//
//   1. "2014 CLM visit finds mother-tongue medium"      leading year
//   2. {year: 2015, description: "..."}                 object literal
//   3. year: 1961 / description: "..."                  two lines
function toHistory(bullets, problems, where) {
  const rows = [];
  for (let i = 0; i < bullets.length; i++) {
    const b = bullets[i];

    const obj = b.match(/^\{\s*year:\s*(\d{4})\s*,\s*description:\s*"([\s\S]*)"\s*\}$/);
    if (obj) { rows.push({ year: Number(obj[1]), description: obj[2].trim() }); continue; }

    const pair = b.match(/^year:\s*(\d{4})\s*$/);
    if (pair) {
      const nxt = (bullets[i + 1] || "").match(/^description:\s*"?([\s\S]*?)"?$/);
      if (nxt && nxt[1].trim()) { rows.push({ year: Number(pair[1]), description: nxt[1].trim() }); i++; continue; }
      problems.push(where + ': policyHistory "year: ' + pair[1] + '" has no description after it');
      continue;
    }

    // "June 2008 Court of Queen's Bench quashed..." — a month can lead the year.
    // The month is kept in the description; only the year is structured, because
    // the timeline is keyed on years.
    const month = b.match(/^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?)\s+(1[6-9]\d{2}|20\d{2})\b[\s:,–-]*(.+)$/);
    if (month) {
      rows.push({ year: Number(month[2]), description: month[1] + " " + month[2] + ": " + month[3].trim() });
      continue;
    }

    const lead = b.match(/^(1[6-9]\d{2}|20\d{2})\b[\s:,–-]*(.+)$/);
    if (lead) {
      let d = lead[2].trim().replace(/^[–-]\s*/, "");
      d = d.charAt(0).toUpperCase() + d.slice(1);
      rows.push({ year: Number(lead[1]), description: d });
      continue;
    }

    if (/^description:/.test(b)) continue;   // consumed alongside its year
    problems.push(where + ': policyHistory row not recognised — "' + b.slice(0, 70) + '"');
  }
  return rows;
}

function build(filter, unitOf) {
  const spec = {}, problems = [], skipped = [];
  const files = fs.readdirSync(PARTS).filter(f => filter.test(f)).sort();
  for (const file of files) {
    const u = unitOf(file);
    if (!u) { problems.push(file + ": cannot map to a unit"); continue; }
    const { fields, sources, note } = parseFile(file);
    if (note) { problems.push(file + ": " + note); continue; }
    const bucket = (spec[u.domain] = spec[u.domain] || {});
    const entry = (bucket[u.key] = bucket[u.key] || { confidence: u.confidence, fields: {}, addDocLinks: [] });
    for (const l of sources) if (!entry.addDocLinks.some(x => x.url === l.url)) entry.addDocLinks.push(l);
    for (const [name, bullets] of Object.entries(fields)) {
      if (name === "policyHistory") {
        const rows = toHistory(bullets, problems, file);
        if (rows.length) entry.history = [...(entry.history || []), ...rows];
      } else if (SERIES.has(name)) {
        skipped.push(file + ": " + name + " (" + bullets.length + " bullets) — needs {year,value,note}, write by hand");
      } else {
        entry.fields[name] = bullets;
      }
    }
    if (!Object.keys(entry.fields).length && !entry.history) delete bucket[u.key];
    else if (!entry.addDocLinks.length) delete entry.addDocLinks;
  }
  return { spec, problems, skipped, files: files.length };
}

module.exports = { build, parseFile, toHistory };
