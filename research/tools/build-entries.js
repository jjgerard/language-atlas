// Generates the prose and source links contributed by the Law et al. (2019)
// expansion, and merges them into seed.json / community.json.
//
// Everything written here traces to one of three sources that are added as
// docLinks on the same entry:
//   - the country's own chapter in Law et al. (2019)
//   - the COST Action IS1406 practitioner survey dataset (CC BY 4.0)
//   - Thordardottir & Topbas (2020) for terminology and public awareness
// Nothing is inferred beyond what those sources state. Response scales differ
// by question — see aggregate.js, where mixing them up inverts the meaning.
const fs = require("fs");
const path = require("path");
const agg = require("./cost/bycountry.json");
const { TERMS, BANDS, BAND_TEXT } = require("./awareness-data.js");
const chapters = require("./ch.json").message.items;

const REPO = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker";
const VERIFIED = "2026-08";
const SURVEY_DOI = "https://doi.org/10.25405/data.ncl.9802880.v4";
const AWARENESS_DOI = "https://doi.org/10.1016/j.jcomdis.2020.106057";
const MIN_N = 30;

const ALIAS = {
  "The Netherlands": ["Netherlands"],
  "The Russian Federation": ["Russia"],
  "Republic of Macedonia": ["North Macedonia"],
  Turkey: ["Türkiye"],
  "The United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
};
const THEMATIC = /Introduction|Service delivery|Theory and intervention|Evidence-based practice|social and cultural|practitioner survey/i;

const chapterFor = new Map();
for (const c of chapters) {
  const title = (c.title || [""])[0];
  if (THEMATIC.test(title)) continue;
  const authors = (c.author || []).map(a => a.family).join(", ").replace(/, ([^,]+)$/, " & $1");
  for (const unit of (ALIAS[title] || [title])) {
    chapterFor.set(unit, { doi: "https://doi.org/" + c.DOI, title, authors, page: c.page });
  }
}

// Survey country -> tracker unit(s), with the caveat each split needs.
const SPLIT = {
  "United Kingdom": {
    units: ["England", "Scotland", "Wales", "Northern Ireland"],
    note: " The survey did not separate the four UK nations, so this covers the UK as a whole.",
  },
  Belgium: {
    units: ["Belgium — French Community (Wallonia-Brussels Federation)"],
    note: " 286 of the 289 Belgian respondents answered in French, so this reflects French-speaking Belgium rather than the country as a whole.",
  },
};
const unitsFor = name => (SPLIT[name] ? SPLIT[name].units : [name]);
const noteFor = name => (SPLIT[name] ? SPLIT[name].note : "");

// ---- prose helpers ------------------------------------------------------
const NOT_DOC = /^\s*not established/i;
const isGap = v => !v || !String(v).trim() || NOT_DOC.test(String(v).trim());

function pcts(block, min, max) {
  return Object.entries(block)
    .filter(([, v]) => v && v.pct >= min)
    .sort((a, b) => b[1].pct - a[1].pct)
    .slice(0, max)
    .map(([label, v]) => `${label} ${v.pct}%`);
}

function joinList(items) {
  if (items.length <= 1) return items[0] || "";
  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}

const CITE = "(Law et al., 2020)";

function fundingText(name, a, note) {
  const items = pcts(a.funding, 8, 4);
  if (!items.length) return null;
  const cap = a.sessionCap["a maximum number of sessions"];
  let t = `Practitioner-reported funding for one child on the respondent's own caseload (COST Action IS1406 survey, 2017; n = ${a.n} from ${name}): ${joinList(items)}.`;
  if (cap && cap.n >= 20) t += ` ${cap.pct}% said a maximum number of sessions applied (n = ${cap.n}).`;
  t += ` Practitioners could name more than one funder, and these are reports about individual cases rather than an analysis of national budgets ${CITE}.${note}`;
  return t;
}

function serviceText(name, a, note) {
  const settings = pcts(a.setting, 15, 3);
  const sectors = pcts(a.sector, 15, 3);
  if (!settings.length && !sectors.length) return null;
  let t = `Practitioner-reported work settings (COST Action IS1406 survey, 2017; n = ${a.n} from ${name}): ${joinList(settings)}`;
  if (sectors.length) t += `, with respondents placing themselves in ${joinList(sectors)}`;
  t += ".";
  const f = a.frequency.ranked[0];
  if (f && a.frequency.total >= 20) t += ` Direct intervention for the reference child was most often ${f.label} (${f.pct}% of ${a.frequency.total}).`;
  const barriers = pcts(a.access, 25, 3);
  if (barriers.length) {
    const n = Object.values(a.access).find(v => v) || {};
    t += ` Asked which factors affect access to services in their country, respondents most often named ${joinList(barriers.map(s => s.replace(/ (\d+%)$/, " ($1 yes)")))} (n ≈ ${n.n}).`;
  }
  t += ` Multiple answers were allowed ${CITE}.${note}`;
  return t;
}

function multilingualText(name, a, note) {
  const m = a.multilingual;
  const base = m["assessment in the mainstream language only"];
  if (!base || base.n < 15) return null;

  const assess = pcts({
    "in the mainstream language only": m["assessment in the mainstream language only"],
    "in both languages": m["assessment in both languages"],
    "in the mother tongue where it differs from the mainstream language": m["assessment in the mother tongue where it differs from the mainstream language"],
    "in the mother tongue only": m["assessment in the mother tongue only"],
  }, 10, 3);
  const interv = pcts({
    "in the mainstream language only": m["intervention in the mainstream language only"],
    "targeting two or more languages": m["intervention targeting two or more languages"],
    "in the mother tongue": m["intervention in the mother tongue"],
  }, 10, 2);

  let t = `What bi- and multilingual children actually receive, as reported by the ${base.n} respondents from ${name} who answered Section 4 of the COST Action IS1406 survey (2017): assessment ${joinList(assess)}`;
  if (interv.length) t += `; intervention ${joinList(interv)}`;
  t += ` — percentages answering yes, with "somewhat" and "don't know" excluded.`;

  const ip = a.interpreters;
  const ipItems = Object.entries(ip).filter(([, v]) => v && v.n >= 15)
    .map(([label, v]) => `in ${label} ${v.pct}%`);
  if (ipItems.length) t += ` Interpreters are used at least sometimes ${joinList(ipItems)}.`;

  const tr = a.mlTraining;
  if (tr.total >= 15) {
    const g = l => (tr.ranked.find(x => x.label === l) || { pct: 0 }).pct;
    const parts = [];
    if (g("obligatory training courses") >= 5) parts.push(`obligatory ${g("obligatory training courses")}%`);
    parts.push(`optional ${g("optional training courses")}%`, `none ${g("no training courses")}%`, `unsure ${g("don't know")}%`);
    t += ` On whether the country offers training for practitioners working with bi/multilingual children (n = ${tr.total}): ${joinList(parts)}.`;
  }

  t += ` These are practitioner perceptions rather than a record of policy ${CITE}.${note}`;
  return t;
}

function terminologyText(name) {
  const term = TERMS[name];
  if (!term) return null;
  const [local, gloss, lang] = term;
  const band = Object.keys(BANDS).find(b => BANDS[b].includes(name));
  let t = `The label used with the public in the COST Action's 2017 European awareness survey was "${local}" (${lang}; roughly "${gloss}"), chosen as the term then most commonly used in the country for childhood language impairment.`;
  if (band) t += ` Public recognition of the concept put ${name} in ${BAND_TEXT[band]} of the 18 systems surveyed, where recognition ranged from 13% to over 90%. In almost every country far fewer people had heard of language impairment than of autism, dyslexia or ADHD — around 60% against over 90% for autism (Thordardottir and Topbaş, 2020).`;
  return t;
}

// ---- merge --------------------------------------------------------------
function appendField(entry, key, text) {
  if (!text) return false;
  const cur = entry[key];
  if (isGap(cur)) { entry[key] = text; return true; }
  if (String(cur).includes("COST Action IS1406")) return false;
  entry[key] = String(cur).trim() + " " + text;
  return true;
}

function addDoc(entry, label, url) {
  entry.docLinks = entry.docLinks || [];
  if (entry.docLinks.some(d => d.url === url)) return;
  if ((entry.supportLinks || []).some(s => s.url === url)) return;
  entry.docLinks.push({ label, url });
}

function run(file, key) {
  const raw = JSON.parse(fs.readFileSync(path.join(REPO, "data", file), "utf8"));
  const list = key ? raw[key] : raw;
  const byName = new Map(list.map(e => [e.unitName, e]));
  const touched = new Set();
  const report = [];

  for (const [unit, ch] of chapterFor) {
    const e = byName.get(unit);
    if (!e) { report.push("!! MISSING UNIT " + unit); continue; }
    const scope = ALIAS["The United Kingdom"].includes(unit) ? " (covers the UK as a whole)" : "";
    addDoc(e, `Managing Children with DLD (2019): ${ch.title} chapter, Law et al. eds., ${ch.authors}, pp. ${ch.page}${scope}`, ch.doi);
    touched.add(unit);
  }

  for (const [surveyName, a] of Object.entries(agg)) {
    if (a.n < MIN_N) continue;
    const note = noteFor(surveyName);
    for (const unit of unitsFor(surveyName)) {
      const e = byName.get(unit);
      if (!e) { report.push("!! MISSING SURVEY UNIT " + unit); continue; }
      const wrote = [];
      if (appendField(e, "funding", fundingText(surveyName, a, note))) wrote.push("funding");
      if (appendField(e, "serviceModel", serviceText(surveyName, a, note))) wrote.push("serviceModel");
      if (appendField(e, "multilingualProvision", multilingualText(surveyName, a, note))) wrote.push("multilingual");
      addDoc(e, "COST Action IS1406 practitioner survey (2020): full dataset and coding manual, Law et al., CC BY 4.0", SURVEY_DOI);
      touched.add(unit);
      report.push(`${unit.padEnd(24)} n=${String(a.n).padStart(3)} -> ${wrote.join(", ") || "(links only)"}`);
    }
  }

  for (const name of Object.keys(TERMS)) {
    const e = byName.get(name);
    if (!e) { report.push("!! MISSING TERM UNIT " + name); continue; }
    if (appendField(e, "terminology", terminologyText(name))) {
      addDoc(e, "Public awareness of DLD across 18 systems (2020): Thordardottir & Topbaş, Journal of Communication Disorders", AWARENESS_DOI);
      touched.add(name);
      report.push(`${name.padEnd(24)}       -> terminology + awareness`);
    }
  }

  for (const unit of touched) {
    const e = byName.get(unit);
    e.lastVerified = VERIFIED;
    if (e.status === "stub") e.status = "partial";
    if (!e.confidence || e.confidence === "unverified-submission") e.confidence = "secondary-source";
  }

  fs.writeFileSync(path.join(REPO, "data", file), JSON.stringify(raw, null, 2) + "\n");
  return { touched, report };
}

const a = run("seed.json", "S");
run("community.json", null);
console.log(a.report.sort().join("\n"));
console.log("\ntouched units:", a.touched.size);
