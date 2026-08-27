// Creates or upgrades an entry for every jurisdiction with a LITMUS Sentence
// Repetition task listed at litmus-srep.info.
//
// These are deliberately NARROW entries. What is verifiable from that source is
// that a language-appropriate instrument exists and who built it — which goes in
// `assessments`. Whether any service actually uses it is a different question,
// and it goes in `multilingualProvision` as an explicit not-established note, so
// the coverage counts on /trends do not mistake "an instrument exists" for
// "this system has multilingual provision".
const fs = require("node:fs");
const OUT = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json";
const seed = JSON.parse(fs.readFileSync(OUT, "utf8"));

const SREP = "https://www.litmus-srep.info/";
const BISLI = "https://www.bi-sli.org/";

const LINKS = [
  { label: "LITMUS Sentence Repetition tasks — task list, developers and publications", url: SREP },
  { label: "COST Action IS0804 — Language Impairment in a Multilingual Society (LITMUS)", url: BISLI },
];

function assessmentsText(language, devs, extra) {
  return (
    `A LITMUS sentence repetition (SRep) task exists for ${language}, developed by ${devs}. ` +
    "Sentence repetition tasks are reported to be highly sensitive and specific in identifying language impairment, and the LITMUS family was designed specifically for assessing multilingual children, where monolingual norms do not apply. " +
    (extra ? extra + " " : "") +
    "This records that a language-appropriate instrument exists; it does not establish that any service here uses it."
  );
}

const notUsed =
  "Not established from the sources consulted — a language-appropriate LITMUS sentence repetition instrument exists for this system (see assessments above), but whether any service, clinical guideline or funder requires, supports or reimburses assessment in all of a child's languages was not determined. That gap between an available research instrument and routine clinical practice is the single most useful thing a contributor here could resolve.";

// language, developers (as listed on litmus-srep.info), optional publication note
const TASKS = {
  "AL|Albania":      ["Albanian", "Enkeleida Kapia (Academy of Albanian Studies, Albania; Ludwig Maximilian University, Germany)"],
  "LB|Lebanon":      ["Lebanese Arabic", "Laurie Tuller, Racha Zebib and Philippe Prévost (University of Tours, France) with Lina Choueiri (American University of Beirut)", "Documented in Saad, S. & Henry, G., 'L'épreuve Répétition de phrases: LITMUS-SR-Liban', in Zebib, Prévost, Tuller & Henry (eds), Plurilinguisme et Troubles Spécifiques du Langage au Liban (Presses universitaires de l'Université Saint-Joseph)."],
  "PS|Palestine":    ["Palestinian Arabic", "Sharon Armon-Lotem and Elinor Saiegh-Haddad (Bar-Ilan University), with Sahar Haj Yahye and Amna Halabi"],
  "SA|Saudi Arabia": ["Saudi Arabic", "Mada Al Hasan (University of Reading) and Theodoros Marinis (University of Konstanz and University of Reading)"],
  "SY|Syria":        ["Syrian Arabic", "Johanne Paradis (University of Alberta), Redab Al Janaideh (OISE, University of Toronto), Evangelia Daskalaki and Adriana Soto-Corominas (University of Alberta)", "Developed in Canada in the context of work with Syrian refugee children, so its provenance is diaspora-facing rather than domestic."],
  "ES|Catalonia":    ["Catalan", "Anna Gavarró (Universitat Autònoma de Barcelona)", "Published as Gavarró, A. (2017), 'A sentence repetition task for Catalan-speaking children and children with Specific Language Impairment', Frontiers in Psychology, 8:1865."],
  "HR|Croatia":      ["Croatian", "Gordana Hržica and Jelena Kuvač Kraljević (University of Zagreb, Department of Speech and Language Pathology) with Lana Kologranić (SUVAG Polyclinic)"],
  "IR|Iran":         ["Farsi", "Mariam Komeili, Parvaneh Tavakoli and Theodoros Marinis (University of Reading) with Yalda Kazemi (Isfahan University)"],
  "FR|France":       ["French", "Philippe Prévost, Laurie Tuller and Racha Zebib (University of Tours)", "One of the best-evidenced tasks in the set: see de Almeida et al. (2017), Linguistic Approaches to Bilingualism 7, 331–358; Fleckstein et al. (2018), Language Acquisition 25(1), 85–101; and Tuller et al. (2018), IJLCD 53(4), 888–904, which reports identification of language impairment in bilingual children in France and Germany together."],
  "GB|Scotland":     ["Scottish Gaelic", "Vicky Chondrogianni and Morna Butcher (University of Edinburgh) with Maria Garraffa (Heriot-Watt University)", "Notable as a minority/revitalised-language instrument rather than a migrant-language one."],
  "DE|Germany":      ["German", "Cornelia Hamann and Lina Abed Ibrahim (University of Oldenburg) with Solveig Chilla (University of Flensburg) and Esther Ruigendijk (University of Oldenburg)", "Extensively published, including Hamann & Abed Ibrahim (2017), 'Methods for identifying specific language impairment in bilingual populations in Germany', Frontiers in Communication 2:16, and work specifically on Arabic-German and Turkish-German bilinguals."],
  "CY|Cyprus":       ["Cypriot Greek", "Kleanthes K. Grohmann (University of Cyprus) and Maria Kambanaros (Cyprus University of Technology)", "Cyprus has tasks for both Cypriot Greek and Standard Greek, which matters in a bidialectal setting."],
  "GR|Greece":       ["Standard Greek", "Vicky Chondrogianni (University of Edinburgh), Ianthi Tsimpli (University of Cambridge) and Maria Andreou (University of Cologne)"],
  "IT|Italy":        ["Italian", "Chiara Levorato (University of Padua)"],
  "LT|Lithuania":    ["Lithuanian", "Eglė Krivickaitė-Leišienė and Ineta Dabašinskienė (Vytautas Magnus University)"],
  "MY|Malaysia":     ["Malay", "Rogayah Razak (Speech Science Programme, Universiti Kebangsaan Malaysia), Norsofiah Abu Bakar (Universiti Sains Malaysia) and Lim Hui Woan (UKM)", "Applied in postgraduate work on Malay-English bilingual children and on Mandarin-English-Malay trilingual children — one of the few tasks in the set built for a routinely trilingual population."],
  "MT|Malta":        ["Maltese", "Helen Grech (University of Malta, Department of Communication Therapy)", "Listed on the LITMUS site as having been created before LITMUS rather than within it."],
  "NO|Norway":       ["Norwegian", "Jan de Jong (University of Bergen)", "Developed and piloted in a University of Bergen master's thesis (Bome & Kongtorp Vargen, 2017), so its validation base is thinner than the French or German tasks."],
  "PL|Poland":       ["Polish", "Natalia Banasik-Jemielniak (Maria Grzegorzewska University), Ewa Haman (University of Warsaw) and Magdalena Smoczyńska", "Used in Antonijevic-Elliott et al. (2019), Clinical Linguistics & Phonetics, assessing monolingual and multilingual children with non-word and sentence repetition."],
  "PT|Portugal":     ["Portuguese", "Maria Lobo (Universidade Nova de Lisboa) and Liliana Correia (Universidade do Minho)"],
  "RU|Russia":       ["Russian", "Natalia Meir and Sharon Armon-Lotem (Bar-Ilan University)", "The Russian and Hebrew tasks share the strongest diagnostic-accuracy evidence in the set: Armon-Lotem & Meir (2016), IJLCD 51(6), 715–731."],
  "ES|Spain":        ["Spanish", "Silvina Montrul (University of Illinois at Urbana-Champaign) and Begoña Arechabaleta (University of Chicago)", "Developed in a US heritage-speaker research context; a separate Catalan task exists for Catalonia."],
  "TR|Türkiye":      ["Turkish", "Seyhun Topbaş (Istanbul Medipol University, School of Health Sciences)", "Applied in theses on Turkish-English sequential bilinguals in England and on Turkish-German bilinguals in Germany, so much of the evidence concerns the diaspora rather than domestic monolinguals."],
  "GB|Wales":        ["Welsh", "Vicky Chondrogianni (University of Edinburgh) with Peredur Davies and Enlli Thomas (Bangor University)", "See Chondrogianni & John (2018), IJLCD, on tense and plural formation in Welsh-English bilingual children with and without language impairment."],
};

// Entries that already have real content — append rather than overwrite.
const APPEND = {
  "NL|Netherlands":   ["Dutch", "Elma Blom (Utrecht University) and Jan de Jong (University of Bergen)"],
  "GB|England":       ["English", "Theodoros Marinis (University of Konstanz and University of Reading), Shula Chiat (City University London) and Sharon Armon-Lotem (Bar-Ilan University)"],
  "US|United States": ["English", "Theodoros Marinis, Shula Chiat and Sharon Armon-Lotem; a Spanish task was developed by Silvina Montrul (University of Illinois) and Begoña Arechabaleta (University of Chicago) in a US heritage-speaker context"],
  "IL|Israel":        ["Hebrew", "Sharon Armon-Lotem, Natalia Meir and Carmit Altman (Bar-Ilan University); Palestinian Arabic and Russian tasks were also developed at Bar-Ilan, covering the other two largest school languages"],
  "IE|Ireland":       ["Irish", "Stanislava Antonijevic (University of Galway) with Ruth Durham and Íde Ní Chonghaile (Health Service Executive)", "Unusually for this set, the Irish task was built with practising HSE clinicians, and an Irish-English task exists alongside it — see Antonijevic, Durham & Ní Chonghaile (2017), Linguistic Approaches to Bilingualism 7, 359–393."],
};

const REGION = {
  AL: ["Europe", "Southeast Europe"], LB: ["Asia", "Western Asia"], PS: ["Asia", "Western Asia"],
  SA: ["Asia", "Western Asia"], SY: ["Asia", "Western Asia"], HR: ["Europe", "Southeast Europe"],
  IR: ["Asia", "Southern Asia"], FR: ["Europe", "Western Europe"], DE: ["Europe", "Western Europe"],
  CY: ["Asia", "Western Asia"], GR: ["Europe", "Southern Europe"], IT: ["Europe", "Southern Europe"],
  LT: ["Europe", "Northern Europe"], MY: ["Asia", "South-Eastern Asia"], MT: ["Europe", "Southern Europe"],
  NO: ["Europe", "Northern Europe"], PL: ["Europe", "Central Europe"], PT: ["Europe", "Southern Europe"],
  RU: ["Europe", "Eastern Europe"], ES: ["Europe", "Southern Europe"], TR: ["Asia", "Western Asia"],
  GB: ["Europe", "Northern Europe"],
};

const NEW_ROWS = { "PS|Palestine": true, "ES|Catalonia": true };

const key = (e) => `${e.countryCode}|${e.unitName}`;
const index = new Map(seed.S.map((e) => [key(e), e]));
let upgraded = 0, created = 0, appended = 0;

function blankEntry(k) {
  const [code, name] = k.split("|");
  const [region, subregion] = REGION[code] || ["", ""];
  return {
    countryCode: code, unitName: name, isNational: !NEW_ROWS[k] || code === "PS",
    region, subregion, status: "stub", confidence: "unverified-submission", lastVerified: "",
    collaborators: [], policyHistory: [], terminology: "", identificationCriteria: "", assessments: "",
    multilingualProvision: "", referralPathway: "", serviceModel: "", legalEntitlement: "", funding: "",
    workforce: "", dischargeCriteria: "", resources: "", identifiedPrevalence: [], outcomesEvidence: "",
    docLinks: [], sourceLanguageNote: "", stubNote: "", by: "", inst: "", source: "seed",
  };
}

for (const [k, [language, devs, extra]] of Object.entries(TASKS)) {
  let e = index.get(k);
  if (!e) {
    if (!NEW_ROWS[k]) { console.error("No stub and not declared new:", k); process.exit(1); }
    e = blankEntry(k);
    if (k === "ES|Catalonia") { e.isNational = false; e.region = "Europe"; e.subregion = "Southern Europe"; }
    seed.S.push(e); index.set(k, e);
    created++;
  } else {
    upgraded++;
  }
  e.status = "partial";
  e.confidence = "secondary-source";
  e.lastVerified = "2026-08";
  e.stubNote = "";
  e.by = e.by || "Seed entry (desk research)";
  e.assessments = assessmentsText(language, devs, extra);
  if (!e.multilingualProvision) e.multilingualProvision = notUsed;
  if (!e.sourceLanguageNote) e.sourceLanguageNote = "Instrument metadata in English from litmus-srep.info; task materials themselves are in " + language + ".";
  const have = new Set(e.docLinks.map((d) => d.url));
  for (const d of LINKS) if (!have.has(d.url)) e.docLinks.push(d);
}

for (const [k, [language, devs, extra]] of Object.entries(APPEND)) {
  const e = index.get(k);
  if (!e) { console.error("Expected existing entry:", k); process.exit(1); }
  const add = " " + assessmentsText(language, devs, extra);
  if (!e.assessments.includes("LITMUS sentence repetition")) { e.assessments = (e.assessments || "").trim() + add; appended++; }
  const have = new Set(e.docLinks.map((d) => d.url));
  for (const d of LINKS) if (!have.has(d.url)) e.docLinks.push(d);
}

seed.S.sort((a, b) => a.countryCode.localeCompare(b.countryCode) || a.unitName.localeCompare(b.unitName));

// Invariants documented in the README.
const bad = [];
for (const e of seed.S) {
  if (/<\/?[a-z]/i.test(JSON.stringify(e))) bad.push(`${e.unitName}: HTML markup`);
  if (e.status !== "stub" && !e.docLinks.length) bad.push(`${e.unitName}: worked entry with no docLinks`);
  for (const d of e.docLinks) if (!/^https?:\/\//.test(d.url)) bad.push(`${e.unitName}: bad URL ${d.url}`);
}
const dupes = seed.S.map(key).filter((k, i, a) => a.indexOf(k) !== i);
if (dupes.length) bad.push("duplicate rows: " + dupes.join(", "));
if (bad.length) { console.error("Invariant failures:\n  " + bad.join("\n  ")); process.exit(1); }

fs.writeFileSync(OUT, JSON.stringify(seed, null, 2) + "\n");
const worked = seed.S.filter((e) => e.status !== "stub");
console.log(`Created ${created}, upgraded ${upgraded} stubs, appended to ${appended} existing entries.`);
console.log(`Worked entries now ${worked.length} of ${seed.S.length}.`);
const byRegion = {};
worked.forEach((e) => (byRegion[e.region] = (byRegion[e.region] || 0) + 1));
console.log("By region:", byRegion);
