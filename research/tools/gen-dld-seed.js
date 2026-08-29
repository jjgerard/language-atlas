// Generates dld-policy-tracker/data/seed.json from the EAL tracker's geography
// (every UN member state + the subnational units that run their own systems),
// re-stubbed against the DLD schema.
const fs = require("node:fs");
const path = require("node:path");

const EAL = path.join("C:/Users/jgera/Documents/Claude code projects/AI repository/eal-policy-tracker/data/seed.json");
const OUT = path.join("C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json");

const eal = JSON.parse(fs.readFileSync(EAL, "utf8"));

// The 35 national vignettes in Law, McKean, Murphy & Thordardottir (2019),
// "Managing Children with Developmental Language Disorder", Part II — the
// only existing comparative baseline for this catalog, so these locations
// get a stub note pointing at their chapter rather than the generic one.
const VIGNETTES = {
  AT: "Austria", BA: "Bosnia and Herzegovina", BG: "Bulgaria", HR: "Croatia", CY: "Cyprus",
  DK: "Denmark", EE: "Estonia", FI: "Finland", FR: "France", DE: "Germany", HU: "Hungary",
  IS: "Iceland", IE: "Ireland", IL: "Israel", IT: "Italy", LV: "Latvia", LB: "Lebanon",
  LT: "Lithuania", MK: "Macedonia", MT: "Malta", NL: "The Netherlands", NO: "Norway",
  PL: "Poland", PT: "Portugal", RO: "Romania", RU: "The Russian Federation", RS: "Serbia",
  SK: "Slovakia", SI: "Slovenia", ZA: "South Africa", ES: "Spain", SE: "Sweden",
  CH: "Switzerland", TR: "Turkey", GB: "The United Kingdom",
};

const BOOK_CITE =
  'Law, McKean, Murphy & Thordardottir (2019), "Managing Children with Developmental Language Disorder: Theory and Practice Across Europe and Beyond" (Routledge)';

const GENERIC_STUB =
  "Not yet documented — no comparative source covers how DLD is identified, funded and supported here. " +
  "If you work in or study this system (speech and language therapy, education, or research), please contribute what you know.";

function vignetteStub(name) {
  return (
    `Not yet documented here. A ${name} national vignette exists in ${BOOK_CITE}, ` +
    "which is the best starting point — but it is a 2019 snapshot of practitioner-reported practice, " +
    "not the statutory position, and it predates most national DLD-terminology changes. Extraction and verification still needed."
  );
}

const EMPTY = {
  terminology: "",
  identificationCriteria: "",
  assessments: "",
  multilingualProvision: "",
  referralPathway: "",
  serviceModel: "",
  legalEntitlement: "",
  funding: "",
  workforce: "",
  dischargeCriteria: "",
  resources: "",
  outcomesEvidence: "",
};

const stubs = eal.S.map((e) => ({
  countryCode: e.countryCode,
  unitName: e.unitName,
  isNational: e.isNational !== false,
  region: e.region || "",
  subregion: e.subregion || "",
  status: "stub",
  confidence: "unverified-submission",
  lastVerified: "",
  collaborators: [],
  policyHistory: [],
  ...EMPTY,
  identifiedPrevalence: [],
  docLinks: [],
  sourceLanguageNote: "",
  stubNote: VIGNETTES[e.countryCode] ? vignetteStub(VIGNETTES[e.countryCode]) : GENERIC_STUB,
  by: "",
  inst: "",
  source: "seed",
}));

// ---- Two worked entries, so the catalog and the patterns page have real
// content to show the shape of. Both are desk-researched from public
// documents, marked as such, and deliberately conservative: where the
// literature does not give a clean answer (multilingual provision, discharge)
// the field says so rather than guessing.
const WORKED = [
  {
    countryCode: "GB",
    unitName: "England",
    isNational: false,
    region: "Europe",
    subregion: "Northern Europe",
    status: "partial",
    confidence: "official-document",
    lastVerified: "2026-08",
    collaborators: [],
    policyHistory: [
      { year: "2008", description: "Bercow Review of services for children and young people (0–19) with speech, language and communication needs (SLCN)." },
      { year: "2014-2015", description: "Children and Families Act 2014 and the SEND Code of Practice (0–25); Statements replaced by Education, Health and Care (EHC) plans." },
      { year: "2017", description: "CATALISE consensus published; 'developmental language disorder' begins to replace 'specific language impairment' in UK clinical usage." },
      { year: "2018", description: "Bercow: Ten Years On (I CAN / RCSLT) — review of SLCN provision a decade after the original Bercow Review." },
    ],
    terminology:
      "'Developmental language disorder' (DLD) is the term used clinically, following the CATALISE consensus (Bishop et al., 2016, 2017); it replaced 'specific language impairment' (SLI). " +
      "Education legislation does not use 'DLD' at all — the statutory category is the much broader 'speech, language and communication needs' (SLCN), one of four areas of need in the SEND Code of Practice. " +
      "The two vocabularies do not map onto each other cleanly, which is a recurring source of confusion between health and education services.",
    identificationCriteria:
      "No single statutory threshold. Clinically, identification follows CATALISE: language difficulties that create functional impairment, are unlikely to resolve by 5 years, and are not better accounted for by a differentiating biomedical condition (e.g. autism, sensorineural hearing loss, brain injury, genetic syndrome). " +
      "CATALISE explicitly abandoned the discrepancy/cognitive-referencing criterion, so a non-verbal IQ cut-off is no longer required. " +
      "Diagnosis is made by a speech and language therapist (SLT), usually with multidisciplinary input. Educational entitlement is decided separately, on the basis of SEND need rather than diagnosis.",
    assessments:
      "No mandated national battery — the choice of tool sits with the SLT service. Standardised assessments normed on UK English are in common use; practice guidance emphasises combining standardised scores with functional, curriculum-based and observational evidence rather than relying on a single cut-off. " +
      "Because eligibility is need-based rather than score-based, services differ in what they treat as the threshold for input, and this is one of the main sources of local variation.",
    multilingualProvision:
      "Weakly specified — this is a known gap rather than a settled policy. UK English norms do not apply to multilingual children, and RCSLT guidance requires assessment across all of a child's languages, with a trained interpreter or bilingual co-worker where the SLT does not share the language. " +
      "In practice, availability of bilingual assessment, interpreters and appropriately normed tools varies widely by service and by language. " +
      "The COST Action IS0804 LITMUS tools (sentence repetition, quasi-universal non-word repetition, MAIN narrative, PaBiQ parental questionnaire) exist for exactly this problem, but uptake in routine NHS practice is patchy. " +
      "The practical consequence — multilingual children being either over-referred (typical L2 acquisition read as disorder) or under-referred (genuine DLD dismissed as 'just EAL') — is well documented but not addressed by any statutory instrument.",
    referralPathway:
      "Open referral in most areas: parents, schools, health visitors and GPs can all refer directly to the NHS children's SLT service. There is no universal population screening for language. " +
      "Separately, a parent, school or young person can request an EHC needs assessment from the local authority.",
    serviceModel:
      "Split across two systems. Assessment and therapy sit with NHS speech and language therapy services, commissioned locally; educational provision sits with schools and local authorities under the SEND framework. " +
      "Delivery is typically a mix of direct therapy, indirect/consultative work delivered by school staff or parents, and training — with a strong policy push towards the indirect and universal/targeted end. " +
      "The SEND Code of Practice states that SLT provision should normally be treated as educational provision, which places ultimate responsibility for delivering it with the local authority when it is written into sections B and F of an EHC plan.",
    legalEntitlement:
      "A DLD diagnosis on its own confers no entitlement. Entitlement runs through the Children and Families Act 2014: 'SEN support' at school level, or a statutory EHC plan (0–25) where needs cannot be met from the school's own resources. " +
      "Where SLT is specified in sections B and F of an EHC plan, the local authority has an absolute duty to secure it — which is why the health/education classification of SLT provision is so heavily litigated.",
    funding:
      "Mixed and indirect. NHS SLT services are funded through local NHS commissioning; school-level SEN support is funded from the school's notional SEN budget (first ~£6,000 per pupil); provision above that is funded from the local authority's high-needs block. " +
      "There is no per-child DLD funding stream. Bercow: Ten Years On found provision to be inconsistent across the country and reported significant unmet need and waiting times, attributing much of it to commissioning and resourcing rather than to the evidence base.",
    workforce:
      "Speech and language therapists, regulated by the Health and Care Professions Council (HCPC), with the Royal College of Speech and Language Therapists (RCSLT) as the professional body. " +
      "Much intervention is delivered by SLT assistants, teaching assistants and teachers under SLT direction. Workforce capacity relative to caseload is a long-standing pressure point.",
    dischargeCriteria:
      "No national rule — set service by service, typically on episode-of-care models (a block of intervention, review, then discharge to school-delivered support with re-referral open). " +
      "This is a substantive difference from EAL status, which typically expires on a fixed timetable: DLD is understood as persistent, so 'discharge' means the end of a therapy episode, not the end of the condition or of educational need.",
    resources:
      "RCSLT clinical guidance on DLD; I CAN (children's communication charity) and the Bercow: Ten Years On evidence base; RADLD (Raising Awareness of Developmental Language Disorder) international campaign and DLD Awareness Day; " +
      "the SCALES study (Surrey Communication and Language in Education Study) as the UK population evidence base; Universally Speaking / Balanced System frameworks used by some commissioners.",
    identifiedPrevalence: [
      { year: "2016", value: "7.58", note: "% of children at age 5–6 meeting DLD criteria — SCALES population study (Norbury et al., 2016), ~2 children per Year 1 class. A further 2.34% had language disorder associated with a biomedical condition. This is an epidemiological estimate, not the proportion actually identified by services." },
    ],
    outcomesEvidence:
      "SCALES and related longitudinal work show language difficulties at school entry are highly stable, with limited catch-up during primary school, and are associated with poorer academic attainment and elevated social, emotional and behavioural difficulties. " +
      "Routine education data does not report attainment for DLD as a category (the SEND census records SLCN), so system-level outcome monitoring for DLD specifically is not available.",
    docLinks: [
      { label: "SEND Code of Practice: 0 to 25 years (2015)", url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25" },
      { label: "Children and Families Act 2014, Part 3", url: "https://www.legislation.gov.uk/ukpga/2014/6/part/3" },
      { label: "RCSLT clinical information on DLD", url: "https://www.rcslt.org/speech-and-language-therapy/clinical-information/developmental-language-disorder/" },
      { label: "Bercow: Ten Years On (2018), RCSLT copy", url: "https://www.rcslt.org/wp-content/uploads/media/Project/RCSLT/bercow-ten-years-on-report.pdf" },
      { label: "Norbury et al. (2016), SCALES prevalence study", url: "https://acamh.onlinelibrary.wiley.com/doi/10.1111/jcpp.12573" },
      { label: "Bishop et al. (2017), CATALISE Phase 2 — terminology", url: "https://acamh.onlinelibrary.wiley.com/doi/10.1111/jcpp.12721" },
    ],
    sourceLanguageNote: "All primary sources in English.",
    stubNote: "",
    by: "Seed entry (desk research)",
    inst: "",
    source: "seed",
  },
  {
    countryCode: "US",
    unitName: "United States",
    isNational: true,
    region: "Americas",
    subregion: "Northern America",
    status: "partial",
    confidence: "official-document",
    lastVerified: "2026-08",
    collaborators: [],
    policyHistory: [
      { year: "1975", description: "Education for All Handicapped Children Act (P.L. 94-142) establishes a federal right to special education, including for speech or language impairment." },
      { year: "2004", description: "IDEA reauthorisation (IDEIA); 'speech or language impairment' remains one of the 13 federal disability categories." },
      { year: "2017", description: "CATALISE consensus published; US uptake of the 'DLD' label is slower and more contested than in the UK, with 'language disorder' (DSM-5) and 'SLI' both still in use." },
    ],
    terminology:
      "Fragmented across three vocabularies. Federal education law uses 'speech or language impairment' (SLI) as an IDEA eligibility category — a broad administrative label covering speech sound, fluency, voice and language difficulties together. " +
      "Clinical/diagnostic practice uses DSM-5 'language disorder'. 'Developmental language disorder' (CATALISE) is used in research and by advocacy groups but has no standing in either the federal statute or DSM-5. " +
      "The result is that the same child can be described three different ways depending on who is writing.",
    identificationCriteria:
      "Federal law sets the frame; states set the numbers. Under IDEA a child is eligible if they have a qualifying impairment AND it 'adversely affects educational performance' AND they need specially designed instruction — a two-part test that a diagnosis alone does not satisfy. " +
      "States then add their own operational criteria on top (standard-deviation cut-offs, test-score requirements, severity rating scales), and these differ substantially state to state; states may add to the federal requirements but may not narrow them. " +
      "Cognitive referencing (requiring a language–non-verbal-IQ discrepancy) is still permitted in some state frameworks despite being explicitly rejected by CATALISE and discouraged by ASHA — one of the clearest examples of policy lagging the consensus.",
    assessments:
      "No national mandated battery. IDEA requires assessment to be non-discriminatory, in the child's native language or mode of communication, using technically sound instruments and more than a single measure. " +
      "In practice the field leans heavily on a small set of commercially published, English-normed omnibus batteries, supplemented by language sample analysis and dynamic assessment. State eligibility rules that specify a score cut-off effectively constrain which tools can be used.",
    multilingualProvision:
      "Formally the strongest statutory language of any field in this catalog, and in practice the widest gap between statute and delivery. " +
      "IDEA requires evaluation materials to be provided and administered in the child's native language unless clearly not feasible, and prohibits identifying a child as disabled where the determinant factor is limited English proficiency. " +
      "The recurring practical problem is distinguishing DLD from typical second-language acquisition: normative data for most languages other than English is thin or absent, bilingual SLPs are a small minority of the workforce, and interpreter-mediated assessment is not consistently available. " +
      "Recommended practice (ASHA) is assessment in both languages, dynamic assessment, language sample analysis and parent report rather than English standard scores — but this is guidance, not a requirement, and both under-identification (difficulty attributed to English learner status) and over-identification are documented.",
    referralPathway:
      "Two entry points by age. Birth to 3: IDEA Part C early intervention, via 'child find' obligations and referral by parents, physicians or childcare. Age 3–21: IDEA Part B, via school-based child find, parent request, or referral through a multi-tiered system of supports (MTSS/RTI). " +
      "Private clinical assessment via health insurance runs in parallel and is not equivalent to educational eligibility.",
    serviceModel:
      "School-based and education-funded for the eligible population: services are delivered by school speech-language pathologists (SLPs) under an Individualized Education Program (IEP), most often as pull-out or push-in sessions specified in minutes per week. " +
      "A parallel private/clinical route exists for families with insurance coverage, so the same child can have quite different provision depending on which route they enter.",
    legalEntitlement:
      "Strong and individually enforceable, once eligibility is established: a free appropriate public education (FAPE) in the least restrictive environment, with an IEP setting measurable goals and specifying service amount, and due-process rights for parents who disagree. " +
      "The entitlement attaches to IDEA eligibility, not to a clinical diagnosis — a child with diagnosed DLD who does not meet the state's 'adverse effect' test has no IDEA entitlement.",
    funding:
      "Publicly funded through the education system for IDEA-eligible children, with federal IDEA Part B grants supplementing state and local funds (federal contribution has historically fallen well short of the authorised share, leaving most cost with states and districts). " +
      "Clinical services outside school are funded by private insurance or Medicaid, with coverage limits and, in some states, exclusions for 'developmental' as opposed to 'acquired' conditions.",
    workforce:
      "Speech-language pathologists, requiring a master's degree, state licensure and typically ASHA's Certificate of Clinical Competence (CCC-SLP). Caseload sizes in schools are a persistent structural issue and are capped by state rule in some states and not others. " +
      "Bilingual SLPs are a small proportion of the workforce relative to the multilingual school population.",
    dischargeCriteria:
      "Determined at the individual IEP level, not by national rule. Re-evaluation is required at least every three years, and services end when the team determines the child no longer meets eligibility or no longer requires specially designed instruction. Entitlement ends at 21 (or on high-school graduation).",
    resources:
      "ASHA Practice Portal (Spoken Language Disorders) and ASHA's IDEA guidance; US Department of Education IDEA site and state education agency eligibility manuals; " +
      "DLD and Me / RADLD awareness campaigns; state-published eligibility guideline documents (e.g. Nebraska, Connecticut, Wisconsin) which are a useful window on how much criteria vary.",
    identifiedPrevalence: [
      { year: "2023", value: "~19", note: "% of all students served under IDEA Part B whose primary category is 'speech or language impairment' — the second-largest category after specific learning disability. Note this covers speech as well as language, so it is not a DLD prevalence figure." },
    ],
    outcomesEvidence:
      "Not systematically reported at national level for language disorder as distinct from the broader SLI category. Federal reporting covers IDEA categories in aggregate, so DLD-specific attainment, graduation and post-school outcome data is not routinely published.",
    docLinks: [
      { label: "IDEA statute and regulations (US Dept of Education)", url: "https://sites.ed.gov/idea/" },
      { label: "34 CFR §300.8(c)(11) — speech or language impairment definition", url: "https://sites.ed.gov/idea/regs/b/a/300.8/c/11" },
      { label: "ASHA Practice Portal — Spoken Language Disorders", url: "https://www.asha.org/practice-portal/clinical-topics/spoken-language-disorders/" },
      { label: "ASHA — IDEA Part B: IEPs and eligibility for services", url: "https://www.asha.org/advocacy/idea/idea-part-b-issue-brief-individualized-education-programs-and-eligibility-for-services/" },
      { label: "ASHA — Evaluation and eligibility for speech-language services in schools", url: "https://pubs.asha.org/doi/10.1044/persp1.SIG16.78" },
    ],
    sourceLanguageNote: "All primary sources in English.",
    stubNote: "",
    by: "Seed entry (desk research)",
    inst: "",
    source: "seed",
  },
];

const workedKeys = new Set(WORKED.map((w) => `${w.countryCode}|${w.unitName}`));
const merged = [
  ...WORKED,
  ...stubs.filter((s) => !workedKeys.has(`${s.countryCode}|${s.unitName}`)),
];

merged.sort((a, b) => a.countryCode.localeCompare(b.countryCode) || a.unitName.localeCompare(b.unitName));

fs.writeFileSync(OUT, JSON.stringify({ S: merged }, null, 2) + "\n");
console.log(`Wrote ${merged.length} entries (${WORKED.length} worked, ${merged.length - WORKED.length} stubs).`);
console.log(`Vignette-flagged: ${merged.filter((e) => VIGNETTES[e.countryCode]).length}`);
