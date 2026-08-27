// Italy on the indigenous and regional languages map.
//
//     node italy-apply.js [--write]
//
// Italy is the case where the atlas's own reference sources contradict each
// other, and the contradiction IS the subject. Law 482/1999 art. 2 protects a
// closed list of twelve. Glottolog counts 56 languages for the country.
// WALS carries no Sicilian, Neapolitan, Venetian, Lombard or Piedmontese at
// all, filing that speech instead as Italian (Bologna), Italian (Genoa),
// Italian (Napolitanian), Italian (Turinese), Italian (Fiorentino).
//
// The atlas takes no position on whether these are languages or dialects. Every
// bullet below names the authority that uses a label and stops there. "Law 482
// does not list Sicilian" is a fact; "Sicilian is not a language" is not one,
// and does not appear.
//
// Two things are worth knowing about how the sources actually read.
//
// First, art. 2 does not word the twelve uniformly. Six are POPULATIONS
// ("le popolazioni albanesi, catalane, germaniche, greche, slovene e croate")
// and six are named by the speech itself ("e di quelle parlanti il francese, il
// franco-provenzale, il friulano, il ladino, l'occitano e il sardo"). Only the
// second six are called languages by the article.
//
// Second, "solo un dialetto" is quoted from the STATE'S PLEADING in Corte cost.
// 170/2010, not from the Court's holding — the judgment reports it in the
// conditional ("le disposizioni impugnate sarebbero ... illegittime sia perché
// avrebbero esteso al 'piemontese', «che è solo un dialetto»"). Attributed as
// such, because attributing it to the Court would be false.
//
// `standing` already held two bullets and they are REPLACED here, deliberately.
// They read "Steering documents name every officially recognised language, and
// only those" / "Ten or more are covered" — a generic Eurydice classification
// true of a dozen countries. What replaces them is Italy's own statute and its
// own Constitutional Court. Nothing else on the entry is overwritten.
const fs = require("fs");
const path = require("path");

const ATLAS = path.join("C:", "Users", "jgera", "Documents", "Claude code projects", "AI repository", "language-atlas");
const FILE = path.join(ATLAS, "data", "indigenous.json");
const LIMIT = 96;

const fields = {
  // The count depends on who is counting, so the field that asks "how many"
  // gives all three answers rather than picking one.
  inventory: [
    "Glottolog counts 56 living languages for this country",
    "Law 482/1999 protects twelve as historic linguistic minorities",
    "WALS files Bologna, Genoa, Naples and Turin speech as varieties of Italian",
  ],
  localTerm: [
    "Terms differ by authority; each label below is the source's own, not the atlas's",
    'Law 482/1999 term for the twelve it lists: "minoranze linguistiche storiche"',
    'Corte cost. 170/2010 calls the art. 2 list a "tassativo novero" of minority languages',
    'State counsel argued in that case that Piedmontese is "solo un dialetto"',
    'Veneto LR 8/2007 art. 2 names its own varieties "il veneto o lingua veneta"',
  ],
  standing: [
    "Law 482/1999 art. 2 protects twelve named populations and languages, a closed list",
    "Sicilian, Venetian and Piedmontese are absent from that art. 2 list",
    'Corte cost. 170/2010 struck "la lingua piemontese" from Piedmont LR 11/2009',
    "Veneto LR 8/2007 and Sicily LR 9/2011 legislate for varieties the state list omits",
  ],
  mediumOfInstruction: [
    "Applies only to the twelve listed languages, in municipalities delimited under art. 3",
    'Law 482 art. 4: minority language used as "strumento di insegnamento" in primary years',
    "Nursery schools use the minority language alongside Italian for educational activities",
    "Sardinia LR 22/2018 art. 17 adds curricular teaching in the language of all subjects",
    "Corte cost. 159/2009 struck FVG's guaranteed weekly hour as breaching school autonomy",
  ],
  taughtAsSubject: [
    "Opt-in: parents say at pre-enrolment whether they want minority-language teaching",
    "Schools set hours, methods and assessment themselves under Law 482 art. 4(2)",
    "Friulian chosen by over 78% of infant and primary families in 2025/26, per ARLeF",
    'Sicily LR 9/2011 gives "moduli didattici" in the regional quota, with no new money',
    "Veneto LR 8/2007 art. 8 funds optional school courses in Venetan history and language",
  ],
};

const history = [
  [1999, 'Law 482/1999 protects twelve "minoranze linguistiche storiche" in a closed list'],
  [2000, "Italy signs the European Charter for Regional or Minority Languages, 27 June"],
  [2001, "DPR 345/2001 implements Law 482; minister sets criteria before each school year"],
  [2007, 'Veneto LR 8/2007 declares "il veneto o lingua veneta" and funds optional courses'],
  [2007, "FVG LR 29/2007 puts Friulian in infant, primary and lower-secondary schooling"],
  [2009, 'Piedmont LR 11/2009 names "lingua piemontese" in its linguistic-heritage law'],
  [2009, "Corte cost. 159/2009 strikes FVG's minimum hour and its opt-out enrolment"],
  [2010, 'Corte cost. 170/2010 strikes "lingua piemontese" from the Piedmont law'],
  [2010, 'FVG LR 5/2010 supports "dialetti di origine veneta" spoken in the region'],
  [2011, 'Sicily LR 9/2011 puts "patrimonio linguistico siciliano" in school modules'],
  [2011, "Corte cost. 88/2011 upholds FVG's dialect law as cultural, not minority, policy"],
  [2016, "D.lgs. 16/2016 transfers minority-language functions to Sardinia"],
  [2018, "Sardinia LR 22/2018 sets three tiers and curricular teaching in the languages"],
  [2018, 'Corte cost. 81/2018 voids Veneto LR 28/2016 calling the "popolo veneto" a minority'],
  [2026, "Charter still signed but unratified by Italy, per CoE chart of 27 August 2026"],
].map(([year, description]) => ({ year, description }));

const addDocLinks = [
  { label: 'Legge 15 dicembre 1999, n. 482, "Norme in materia di tutela delle minoranze linguistiche storiche" — artt. 2, 3 and 4', url: "https://www.parlamento.it/parlam/leggi/99482l.htm" },
  { label: "Corte costituzionale, sentenza n. 159 del 2009 (Friuli-Venezia Giulia LR 29/2007) — school timing and enrolment", url: "https://giurcost.org/decisioni/2009/0159s-09.html" },
  { label: 'Corte costituzionale, sentenza n. 170 del 2010 (Piedmont LR 11/2009) — the art. 2 list as a "tassativo novero"', url: "https://giurcost.org/decisioni/2010/0170s-10.html" },
  { label: "Corte costituzionale, sentenza n. 88 del 2011 (Friuli-Venezia Giulia LR 5/2010) — Law 482 does not exhaust the field", url: "https://giurcost.org/decisioni/2011/0088s-11.html" },
  { label: "Corte costituzionale, sentenza n. 81 del 2018 (Veneto LR 28/2016) — only the State may identify a minority", url: "https://giurcost.org/decisioni/2018/0081s-18.html" },
  { label: "Regione Veneto, legge regionale 13 aprile 2007, n. 8 — artt. 2, 4 and 8", url: "https://bur.regione.veneto.it/BurvServices/pubblica/DettaglioLegge.aspx?id=196722" },
  { label: "Regione Siciliana, linee guida for LR 9/2011 on the patrimonio linguistico siciliano", url: "https://www.csfls.it/res/wp-content/uploads/2022/05/Linee-guida-LR-9-2011.pdf" },
  { label: "Regione Autonoma della Sardegna, legge regionale 3 luglio 2018, n. 22 — artt. 2, 17 and 19", url: "https://www.edizionieuropee.it/LAW/HTML/211/sa3_04_059.html" },
  { label: "Council of Europe Treaty Office — European Charter for Regional or Minority Languages (ETS No. 148), signatures and ratifications", url: "https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148" },
  { label: "ARLeF — Friulian in schools, 2025/26 uptake", url: "https://arlef.it/it/progetti/friulano-a-scuola/" },
];

// `standing` is the one field replaced rather than filled; everything else must
// be empty, or this run is overwriting something it was not meant to touch.
const REPLACING = new Set(["standing", "inventory"]);

const rows = JSON.parse(fs.readFileSync(FILE, "utf8"));
const e = rows.find(r => r.countryCode === "IT" && r.unitName === "Italy");
const problems = [];
if (!e) problems.push("no IT|Italy entry");

for (const [f, set] of Object.entries(fields)) {
  if (!Object.prototype.hasOwnProperty.call(e, f)) problems.push(`no field ${f}`);
  if (String(e[f] || "").trim() && !REPLACING.has(f)) problems.push(`${f}: would overwrite`);
  if (set.length > 5) problems.push(`${f}: ${set.length} bullets`);
  set.forEach(b => {
    if (b.length > LIMIT) problems.push(`${f}: ${b.length} chars — "${b.slice(0, 50)}…"`);
    if (/[.;]$/.test(b)) problems.push(`${f}: ends with punctuation — "${b.slice(-40)}"`);
    if (/<[a-z]/i.test(b)) problems.push(`${f}: contains markup`);
  });
}
if ((e.policyHistory || []).length) problems.push("policyHistory: would overwrite");
history.forEach(h => {
  if (!Number.isInteger(h.year) || h.year < 1500 || h.year > 2030) problems.push(`history: bad year ${h.year}`);
  if (h.description.length > 96) problems.push(`history ${h.year}: ${h.description.length} chars`);
});
const sup = new Set((e.supportLinks || []).map(l => l.url));
addDocLinks.forEach(l => { if (sup.has(l.url)) problems.push(`${l.url} is a supportLink`); });

if (problems.length) {
  console.log(`${problems.length} PROBLEMS — nothing written`);
  problems.forEach(p => console.log("  " + p));
  process.exit(1);
}

console.log("REPLACING standing:");
String(e.standing).split("\n").forEach(l => console.log("   - " + l));
console.log("REPLACING inventory:");
String(e.inventory).split("\n").forEach(l => console.log("   - " + l));
console.log("");
for (const [f, set] of Object.entries(fields)) {
  console.log(f);
  set.forEach(b => console.log(`   ${String(b.length).padStart(2)}  ${b}`));
}
console.log(`\npolicyHistory: ${history.length} rows, ${history[0].year}-${history[history.length - 1].year}`);
console.log(`docLinks: ${(e.docLinks || []).length} existing + ${addDocLinks.length} added`);

if (process.argv.includes("--write")) {
  for (const [f, set] of Object.entries(fields)) e[f] = set.join("\n");
  e.policyHistory = history;
  e.docLinks = [...(e.docLinks || []), ...addDocLinks];
  e.confidence = "official-document";     // the statute and the judgments themselves
  e.lastVerified = "2026-08";
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 1) + "\n");
  console.log("\nwritten");
} else {
  console.log("\n(dry run — pass --write)");
}
