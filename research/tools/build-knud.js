// Second expansion pass, worked outward from Knudsen et al. (2022) — the
// corrected allocation-and-funding paper — through its reference list, its
// citing works and PubMed's similar-article set.
//
// Every statement below was read from the source named on the same entry.
// Where only an abstract was readable the entry says so, because an abstract
// is a claim about a study rather than the study's data.
const fs = require("fs");
const path = require("path");

const REPO = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker";
const VERIFIED = "2026-08";

const SRC = {
  knudsen:  { label: "Allocation and funding of SLT across Europe (2022): Knudsen, Jalali-Moghadam, Nieva, Czaplewska, Laasonen, Gerrits, McKean & Law, Research in Developmental Disabilities — corrected republication", url: "https://doi.org/10.1016/j.ridd.2021.104139" },
  chile:    { label: "Support pathways for DLD in Santiago (2026): Muñoz-Lizana, Iturra-Osorio & Helo, Folia Phoniatrica et Logopaedica", url: "https://doi.org/10.1159/000553368" },
  croatia:  { label: "Croatian SLP telepractice survey (2020): Kuvač Kraljević, Matić & Pavičić Dokoza, International Journal of Telerehabilitation", url: "https://doi.org/10.5195/ijt.2020.6325" },
  lebanon:  { label: "Language support in Lebanese preschools (2020): Kouba Hreich, Messarra & Martinez-Perez, IJLCD", url: "https://doi.org/10.1111/1460-6984.12576" },
  slovenia: { label: "SLT cooperation with parents in Slovenia and North Macedonia (2023): Novšak Brce, Žolgar & Kogovšek, CEPS Journal", url: "https://doi.org/10.26529/cepsj.1535" },
  portugalPrag: { label: "Portuguese SLP practice with pragmatic impairment (2024): Pereira, Ramalho & Lousada, Journal of Child Language", url: "https://doi.org/10.1017/S0305000923000764" },
  portugalSyn:  { label: "Portuguese SLT practice with syntactic impairment (2025): Azevedo, Lousada & Martins, IJLCD", url: "https://doi.org/10.1111/1460-6984.70012" },
  norway:   { label: "Special educational assistance in Norwegian ECEC (2022): Joner, Reikerås & Alvestad, European Journal of Special Needs Education — document analysis", url: "https://doi.org/10.1080/08856257.2022.2148602" },
  malta:    { label: "Quality of the children's SLT service in Malta (2024): Sant & Black, IJLCD", url: "https://doi.org/10.1111/1460-6984.13093" },
  bremen:   { label: "SLT for multilingual children with migration background (2019): Scharff Rethfeldt, Folia Phoniatrica et Logopaedica — survey of 28 practices in Bremen", url: "https://doi.org/10.1159/000495565" },
};

// unit -> { field: text, ... } plus the sources to attach.
const EDITS = {
  Chile: {
    sources: [SRC.chile],
    status: "partial",
    confidence: "secondary-source",
    fields: {
      terminology: 'Diagnoses are registered in the Chilean system as "trastorno específico del lenguaje" (specific language impairment, SLI) rather than as DLD, an administrative label that Muñoz-Lizana et al. (2026) treat as aligned with DLD. The label matters beyond naming: caregivers described the diagnosis operating as a sociocultural and administrative credential, the thing that unlocks access to services rather than merely describing the child.',
      referralPathway: 'Caregivers in Santiago described a nonlinear route rather than a pathway. Muñoz-Lizana et al. (2026) identify three stages: initial suspicion and early help-seeking, marked by uncertainty, uneven professional guidance and trial-and-error navigation; diagnosis and entry into specialised services, in which the Escuelas de Lenguaje (Special Language Schools) act as the gateway to diagnostic confirmation and to sustained support; and primary education, where support shifts to the School Integration Programme (Programa de Integración Escolar, PIE). Based on narrative interviews with nine primary caregivers of children aged 6-9, so this is how families experienced the route, not a description of the regulations.',
      serviceModel: 'Education-led in practice. Muñoz-Lizana et al. (2026) report that support relies heavily on education-sector gateways — the Escuelas de Lenguaje, then the PIE in primary school — within a mixed and weakly articulated system. Caregivers described discontinuities in intensity, communication and coordination at the transition into primary education, weak intersectoral coordination between primary care and the education services, and socioeconomic barriers to the complementary private therapy that fills the gap. The authors characterise caregivers as ending up the informal coordinators of their own child\'s care.',
    },
  },

  Croatia: {
    sources: [SRC.croatia, SRC.knudsen],
    fields: {
      workforce: 'A national survey of 255 Croatian speech-language pathologists reports where the profession sits: 37.6% employed in health care, 35.3% in education, 18.8% in private practice or an NGO and 8.2% in the social-care system. The workforce is young — 69% under 41, and 49.8% with fewer than ten years\' experience — and 97.7% female. Preschool children aged 3-7 were the main caseload for 63.2% of respondents (Kuvač Kraljević et al., 2020).',
    },
  },

  Lebanon: {
    sources: [SRC.lebanon, SRC.knudsen],
    fields: {
      workforce: 'The professional association listed 240 registered speech and language therapists when Kouba Hreich et al. (2020) surveyed the profession; the authors reached 391 Lebanese SLTs holding an email address and obtained around 200 responses, 98% of them female, with a mean of 7 years of experience. Of the SLT respondents, 42 were school-based and 36 of those worked in preschools — but 27 of the 36 also ran a private clinical practice alongside it, so school-based work is largely something practitioners do in addition to private practice rather than instead of it.',
      serviceModel: 'Predominantly private and school-mediated. Kouba Hreich et al. (2020) report that 74.9% of Lebanese preschoolers attend private schools against 25.1% in public ones, with a further 2.2% of schools run by UNRWA for Palestinian refugees. Of 1,259 preschool teachers surveyed, 52.4% said their school employs a speech and language therapist and 56.8% said they collaborate with one inside or outside the school, while 38.7% said they do not. Both professions recognised a role in supporting language development, but the study found little acknowledgement of any SLT role in prevention for all children as opposed to treatment of identified need.',
      multilingualProvision: 'Multilingualism is the default condition rather than a special case. Kouba Hreich et al. (2020) describe every child in Lebanese schools, and every professional working with them, as at least bilingual: spoken Lebanese Arabic at home, Modern Standard Arabic as a formal classroom language used little in conversation, and at least one of English or French from the start of preschool, each language allocated roughly 6-7 hours a week. The school\'s chosen language of instruction is often favoured over Arabic. Every SLT respondent reported a bilingual practice. The practical consequence for identification is that no single language can be assumed to be the child\'s strongest.',
    },
  },

  Slovenia: {
    sources: [SRC.slovenia, SRC.knudsen],
    fields: {
      workforce: 'Speech and language therapists work across four settings — health care institutions, educational institutions, specialised hearing and speech rehabilitation centres, and private practice. Organised speech and language therapy services date from 1942, with university training programmes established from the mid-1980s. In a survey of 110 therapists across two countries, the 62 Slovenian respondents rated their attitudes towards involving parents in therapy significantly higher than their 48 North Macedonian counterparts, while differences in self-rated knowledge and skills for working with parents were not statistically significant (Novšak Brce et al., 2023).',
    },
  },

  "North Macedonia": {
    sources: [SRC.slovenia],
    fields: {
      serviceModel: 'Speech and language therapists work across health care institutions, educational institutions, specialised hearing and speech rehabilitation centres, and private practice — the same four-way split as neighbouring Slovenia, a shared inheritance the authors trace to a common institutional history (Novšak Brce et al., 2023). No source consulted here establishes how a child is referred between them or who funds the placement.',
      workforce: 'Organised speech and language therapy services date from 1950 and university training programmes from the mid-1980s, a few years later than in Slovenia; students from North Macedonia also train at the Slovenian university, and the two professions remain closely linked. Of 110 therapists surveyed across the two countries, 48 practised in North Macedonia, 95.8% of them female (Novšak Brce et al., 2023).',
    },
  },

  Portugal: {
    sources: [SRC.portugalPrag, SRC.portugalSyn, SRC.knudsen],
    fields: {
      referralPathway: 'Referral route differs by diagnosis. Among Portuguese speech-language pathologists surveyed by Pereira et al. (2024), children with DLD and pragmatic difficulties were most often referred by preschool teachers, and 90.3% of those DLD referrals came between the ages of three and six; children with autism were most often referred by paediatricians, and half of those referrals came between two and three. The authors link referral source to setting — clinic work arriving via paediatricians, preschool work via teachers.',
      workforce: 'Two large surveys give an unusually firm denominator: 351 respondents representing 10.5% of speech-language pathologists working in Portugal (Pereira et al., 2024) and 357 representing about 10% (Azevedo et al., 2025). Of the first group, 64.2% worked in clinics, over 60% held a master\'s degree, and 97.4% were female. Confidence is the recurring finding: 89-91% of respondents to the second survey had never used any specific programme, method or approach for syntactic intervention, over 40% did not feel confident assessing syntactic skills and 43% did not feel confident intervening, with 92-98% reporting a need for more academic knowledge and practical training.',
    },
  },

  Norway: {
    sources: [SRC.norway, SRC.knudsen],
    fields: {
      referralPathway: 'For children in ordinary early childhood education and care, provision runs through the Educational Psychological Service (pedagogisk-psykologisk tjeneste), which writes the expert assessment recommending special educational assistance; the setting then implements it through an individual development plan. Joner et al. (2022) analysed 71 such documents for four children with language disorders and found the objectives and language interventions recommended in the expert assessments to be general or missing, and seldom tailored to the specific language disorder — a weakness that then propagated into the individual development plans. They describe responsibilities as divided between institutions in a way that leaves provision fragmented, with variation in the quality of what is recommended.',
    },
  },

  Malta: {
    sources: [SRC.malta, SRC.knudsen],
    fields: {
      serviceModel: 'Demand outstrips supply. Sant and Black (2024) analysed Speech and Language Centre activity data alongside interviews with service managers, speech-language pathologists and parents in western Malta, and report that clients were not receiving the required number of therapy sessions. The study frames the shortfall in terms of human-resource development, human-resource management and environmental factors rather than eligibility rules. Read from the published abstract and results summary rather than the full text.',
    },
  },

  Germany: {
    sources: [SRC.bremen, SRC.knudsen],
    fields: {
      multilingualProvision: 'Access runs through a medical prescription: Scharff Rethfeldt (2019) surveyed 28 speech and language therapy practices across districts of Bremen about children referred with a suspected language disorder, and clustered the practices by the proportion of minor migrants and minor welfare recipients in each district — treating sociospatial polarisation as the relevant variable in who reaches a service. More than one in three children in Germany has a migrant background, and the proportion in Bremen is higher still. The study exists because comprehensive data on provision and uptake for multilingual children was, and largely remains, inadequate. Read from the published abstract rather than the full text.',
    },
  },
};

const NOT_DOC = /^\s*not established/i;
const isGap = v => !v || !String(v).trim() || NOT_DOC.test(String(v).trim());

function addDoc(entry, src) {
  entry.docLinks = entry.docLinks || [];
  if (entry.docLinks.some(d => d.url === src.url)) return;
  if ((entry.supportLinks || []).some(s => s.url === src.url)) return;
  entry.docLinks.push({ label: src.label, url: src.url });
}

function run(file, key) {
  const raw = JSON.parse(fs.readFileSync(path.join(REPO, "data", file), "utf8"));
  const list = key ? raw[key] : raw;
  const byName = new Map(list.map(e => [e.unitName, e]));
  const report = [];

  for (const [unit, spec] of Object.entries(EDITS)) {
    const e = byName.get(unit);
    if (!e) { report.push("!! MISSING " + unit); continue; }
    const wrote = [];
    for (const [field, text] of Object.entries(spec.fields)) {
      if (isGap(e[field])) { e[field] = text; wrote.push(field); }
      else if (!String(e[field]).includes(text.slice(0, 60))) { e[field] = String(e[field]).trim() + " " + text; wrote.push(field + "+"); }
    }
    for (const s of spec.sources) addDoc(e, s);
    e.lastVerified = VERIFIED;
    if (spec.status) e.status = spec.status;
    if (spec.confidence) e.confidence = spec.confidence;
    if (e.status === "stub") e.status = "partial";
    report.push(`${unit.padEnd(18)} -> ${wrote.join(", ")}  (+${spec.sources.length} sources)`);
  }

  // The corrected Knudsen paper is the peer-reviewed analysis of the very
  // survey the funding paragraphs are computed from, so it belongs as
  // provenance on every entry carrying one.
  let backfilled = 0;
  for (const e of list) {
    if (typeof e.funding === "string" && e.funding.includes("COST Action IS1406 survey")) {
      const before = (e.docLinks || []).length;
      addDoc(e, SRC.knudsen);
      if ((e.docLinks || []).length > before) backfilled++;
    }
  }
  report.push(`\nKnudsen et al. (2022) attached to ${backfilled} further survey-derived entries`);

  fs.writeFileSync(path.join(REPO, "data", file), JSON.stringify(raw, null, 2) + "\n");
  return report;
}

const r = run("seed.json", "S");
run("community.json", null);
console.log(r.join("\n"));
