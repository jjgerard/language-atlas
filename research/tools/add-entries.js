// Adds worked entries to dld-policy-tracker/data/seed.json, replacing the
// matching stubs. Every claim traces to a docLinks entry; where a field could
// not be established it says so explicitly rather than being guessed at.
const fs = require("node:fs");
const OUT = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json";
const seed = JSON.parse(fs.readFileSync(OUT, "utf8"));

const NOT_ESTABLISHED = (what) =>
  `Not established from the sources consulted for this entry — ${what} If you work in this system, this is exactly the field to fill in.`;

const base = {
  collaborators: [],
  policyHistory: [],
  terminology: "", identificationCriteria: "", assessments: "", multilingualProvision: "",
  referralPathway: "", serviceModel: "", legalEntitlement: "", funding: "", workforce: "",
  dischargeCriteria: "", resources: "", outcomesEvidence: "",
  identifiedPrevalence: [], docLinks: [], sourceLanguageNote: "", stubNote: "",
  by: "Seed entry (desk research)", inst: "", source: "seed", status: "partial",
};

const ENTRIES = [
  // ---------------- EUROPE ----------------
  {
    ...base,
    countryCode: "IE", unitName: "Ireland", isNational: true, region: "Europe", subregion: "Northern Europe",
    confidence: "official-document", lastVerified: "2026-08",
    policyHistory: [
      { year: "2004", description: "Education for Persons with Special Educational Needs (EPSEN) Act — only partly commenced." },
      { year: "2007", description: "DES Circular 0038/2007 sets the criteria and operating rules for special classes for pupils with Specific Speech and Language Disorder (SSLD): maximum seven pupils, placement normally time-limited." },
      { year: "2025", description: "Circular 0024/2025 replaces the SSLD criteria: the category is renamed Developmental Language Disorder / Speech Sound Disorder (DLD/SSD), and the IQ entry criterion is removed. Developed with the NCSE speech and language therapy service, IASLT and HSE speech and language therapists." },
    ],
    terminology:
      "'Developmental language disorder' is now the term in education policy: Circular 0024/2025 explicitly retires 'specific speech and language disorder' (SSLD) for special-class entry and replaces it with 'Developmental Language Disorder – Speech Sound Disorder (DLD/SSD)'. " +
      "This makes Ireland one of the clearer cases of CATALISE terminology reaching a statutory instrument rather than staying in clinical usage.",
    identificationCriteria:
      "Set for special-class entry by Circular 0024/2025, which revised the 2007 criteria. The most consequential change is the removal of IQ as an entry criterion — the earlier SSLD framework used cognitive referencing, and the current one does not. " +
      "The 2007 rules defined the target group narrowly, as severe impairment in understanding and expressing spoken language not attributable to co-morbid factors such as general learning disability, deafness or behavioural difficulty. " +
      "Identification involves both speech and language therapy and psychological assessment; the SLT nominates a child for a language-class place with parental consent.",
    referralPathway:
      "Speech and language therapy referral is to the HSE Primary Care children's service. Special-class placement is a separate route: an HSE or NCSE speech and language therapist puts a child forward as a candidate, and enrolment is decided by the school under the circular criteria.",
    serviceModel:
      "Split between health and education. The HSE provides speech and language therapy through Primary Care and Children's Disability Network Teams; the Department of Education funds special classes for DLD/SSD attached to mainstream primary schools, taught by a qualified teacher with speech and language therapy support. " +
      "Class size is capped at seven pupils (Circular 0038/2007). The NCSE also operates its own speech and language therapy service.",
    legalEntitlement:
      "Weak relative to the clarity of the criteria. The EPSEN Act 2004, which would have created individual enforceable entitlements to assessment and provision, has only been partly commenced. " +
      "A DLD/SSD diagnosis therefore does not by itself entitle a child to a special-class place: placement depends on availability, and continued enrolment for a second year 'can only be considered once all eligible children have been accommodated'.",
    dischargeCriteria:
      "Special-class placement is time-limited by design — under Circular 0038/2007 eligible pupils may spend up to two years in the class, with the second year contingent on capacity, after which the child returns to mainstream. " +
      "Discharge from HSE speech and language therapy is decided service by service and is not set nationally.",
    multilingualProvision: NOT_ESTABLISHED(
      "the special-class enrolment circulars reviewed here do not set out a protocol for assessing children who speak more than one language, and no national guidance on distinguishing DLD from second-language acquisition was found."
    ),
    resources:
      "Irish Association of Speech and Language Therapists (IASLT); NCSE speech and language therapy service; Department of Education Inspectorate review of educational provision for pupils with SSLD (2021); Citizens Information guidance for families.",
    docLinks: [
      { label: "Special classes for children with DLD or SSD (Department of Education)", url: "https://www.gov.ie/en/department-of-education/publications/special-classes-for-children-with-developmental-language-disorder-dld-or-speech-sound-disorder-ssd/" },
      { label: "Circular 0024/2025 (revised DLD/SSD enrolment criteria)", url: "https://www.into.ie/app/uploads/2025/03/0024_2025.pdf" },
      { label: "Inspectorate review of educational provision for pupils with SSLD (2021)", url: "https://assets.gov.ie/133317/15aec2bb-671e-4ffe-b3c5-2a9daed448d5.pdf" },
      { label: "HSE — language classes", url: "https://www.hse.ie/eng/services/list/1/lho/cavanmonaghan/therapy-services/speech-and-language-therapy/children/language-class.html" },
      { label: "Citizens Information — special needs education in primary schools", url: "https://www.citizensinformation.ie/en/education/special-education-needs/special-needs-education-primary-schools/" },
    ],
    sourceLanguageNote: "All primary sources in English.",
  },
  {
    ...base,
    countryCode: "NL", unitName: "Netherlands", isNational: true, region: "Europe", subregion: "Western Europe",
    confidence: "official-document", lastVerified: "2026-08",
    policyHistory: [
      { year: "2016", description: "Siméa publishes 'Handreiking meertaligheid en TOS' — national guidance on distinguishing TOS from second-language acquisition, with a diagnostic decision tree and a multilingual case-history form." },
      { year: "2017", description: "Siméa 'Richtlijn toelaatbaarheid' — shared national eligibility guideline used by all four cluster-2 institutions." },
      { year: "2024", description: "NVLF publishes the clinical guideline 'Richtlijn Logopedie bij taalontwikkelingsstoornissen'." },
    ],
    terminology:
      "TOS — taalontwikkelingsstoornis — is the standard term across health, education and advocacy, and has largely displaced the older ESM (ernstige spraak- en taalmoeilijkheden). " +
      "Unlike most systems in this catalog, the same term is used by clinicians, schools and parent organisations, which makes the Dutch literature unusually easy to compare across sectors.",
    identificationCriteria:
      "Diagnosis uses validated instruments to map communication and speech-language development, with multidisciplinary input to exclude other explanations such as hearing loss or intellectual disability. " +
      "Access to cluster-2 (specialist) education is governed by Siméa's shared 'Richtlijn toelaatbaarheid', applied identically by all four cluster-2 institutions (Auris, Kentalis, VierTaal, Vitus Zuid). " +
      "Notably, severity of the TOS is not sufficient on its own — the guideline makes eligibility turn on the pupil's education and support needs as well as the severity of the disorder. The specific score thresholds are set out in the guideline itself and are not reproduced here.",
    assessments:
      "Standardised, Dutch-normed instruments, applied under the NVLF clinical guideline for speech and language therapy in TOS. Audiological centres carry out the more complex diagnostic work.",
    multilingualProvision:
      "One of the most explicitly worked-out multilingual protocols of any system in this catalog. Siméa's 'Handreiking meertaligheid en TOS' (2016) is national guidance dedicated to exactly this problem. " +
      "It states that a language development disorder must be distinguished from a delay in second-language acquisition, requiring careful diagnosis and mapping of every factor affecting the child's speech and language development. " +
      "For multilingual pupils it requires examination and observation data in both languages — using an interpreter where necessary — so that the level of each language can be judged separately. " +
      "It supplies a diagnostic decision tree and a multilingual case-history (anamnese) form as practical instruments rather than leaving it to clinician judgement.",
    referralPathway:
      "Entry is usually through a first-line speech therapy practice (eerstelijns logopedie). Children whose persistent speech, language or communication difficulties have not responded sufficiently to ordinary speech therapy may be referred on for early treatment groups or specialist assessment at an audiological centre.",
    serviceModel:
      "Tiered. First-line speech therapy practices; audiological centres for diagnosis; third-line early-treatment and group treatment at Kentalis, Auris, Libra or Vitus Zuid for severe and persistent TOS; and cluster-2 special primary and secondary education for pupils who meet the Siméa criteria. " +
      "Kentalis and Auris run cluster-2 schools nationally alongside their clinical services.",
    legalEntitlement:
      "Runs through the passend-onderwijs framework: a pupil meeting the Siméa criteria receives either an onderwijsarrangement (support brought to the mainstream school) or a place in cluster-2 education. " +
      "Admission decisions can be disputed — the Geschillencommissie passend onderwijs issues advice on cluster-2 admission cases, so the entitlement is contestable rather than purely discretionary.",
    funding:
      "Mixed and routed by which system the child is in: speech therapy is covered under health insurance (Zorgverzekeringswet), day treatment and some support can run through long-term care or the municipality under the Jeugdwet, and cluster-2 education is funded through the education system.",
    resources:
      "Siméa (umbrella body for the four cluster-2 institutions) — Richtlijn toelaatbaarheid and the multilingualism guidance; NVLF (Dutch association of speech and language therapists) clinical guideline on TOS; Kentalis, Auris, VierTaal, Vitus Zuid and Libra as service providers; 'TOS in beeld' as a materials hub.",
    docLinks: [
      { label: "Siméa — Richtlijn toelaatbaarheid (cluster-2 eligibility)", url: "https://simea.nl/toelaatbaarheid" },
      { label: "Siméa — Handreiking meertaligheid en TOS (2016)", url: "https://simea.nl/media/richtlijnen/simea_handreiking_meertaligheid_tos.pdf" },
      { label: "NVLF — Richtlijn Logopedie bij taalontwikkelingsstoornissen", url: "https://nvlf.hellomembers.nl/app/uploads/2024/01/Richtlijn-TOS.pdf" },
      { label: "Kentalis — wat is TOS", url: "https://www.kentalis.nl/tos" },
      { label: "TOS in beeld — materials hub", url: "https://tosinbeeld.nl/materialen/simea-handreiking-tos-en-meertaligheid/" },
    ],
    sourceLanguageNote: "Primary sources in Dutch; summarised in English for this entry.",
  },
  {
    ...base,
    countryCode: "SE", unitName: "Sweden", isNational: true, region: "Europe", subregion: "Northern Europe",
    confidence: "secondary-source", lastVerified: "2026-08",
    terminology:
      "'Språkstörning' is the established Swedish term; 'DLD' and the hybrid 'utvecklingsrelaterad språkstörning (DLD)' are increasingly used alongside it in clinical and school contexts, so both appear in current Swedish sources.",
    identificationCriteria:
      "Assessment is carried out by a speech and language pathologist (logoped) and covers vocabulary, grammar, narrative, phonology and pronunciation as well as pragmatics, using standardised and normed tests alongside a detailed case history. " +
      "The rule that does most work is the multilingual one below: difficulties must be present across all of the child's languages.",
    assessments:
      "Standardised, Swedish-normed instruments administered by a logoped, combined with case history and functional observation. No single nationally mandated battery was identified in the sources consulted.",
    multilingualProvision:
      "Sweden states the criterion explicitly, which is unusual: for a difficulty to count as språkstörning/DLD, the child must show language difficulties in <em>all</em> of their languages. " +
      "Where a child is multilingual, the assessment maps every language the child uses regularly, and the logoped's job is specifically to determine whether the difficulties reflect a disorder or insufficient exposure to the language in question. " +
      "Multilingual pupils perceived to have language difficulties at school should be given access to a professional logoped assessment rather than having the difficulty attributed to bilingualism by default. " +
      "Swedish commentary nonetheless reports that schools' understanding of the interaction between multilingualism and språkstörning is a continuing weak point.",
    serviceModel:
      "Split. Assessment and therapy sit with logopedi services run by the regions (regioner), including habilitering services for children with more complex needs; educational adaptation sits with schools. " +
      "Language disorder is understood as affecting learning across every school subject rather than being a discrete speech problem, so the school-side response is curriculum-wide adaptation rather than only therapy.",
    legalEntitlement:
      "Educational entitlement runs through the Education Act (skollagen) right to särskilt stöd, which is triggered by assessed need rather than by a diagnosis — a child does not need a språkstörning diagnosis to receive support, and having one does not automatically produce it.",
    identifiedPrevalence: [
      { year: "2026", value: "7-8", note: "% of children, adolescents and adults estimated to have språkstörning/DLD — Swedish clinical and advocacy sources. Epidemiological estimate, not the proportion identified by services." },
    ],
    resources:
      "Afasiförbundet / Talknuten (parent and user organisation covering språkstörning); DLD-dagen awareness campaigning; Internetmedicin clinical overview for school health services; Processtöd and Legilexi as practitioner-facing knowledge bases.",
    docLinks: [
      { label: "Internetmedicin — utvecklingsrelaterad språkstörning (DLD), clinical overview", url: "https://www.internetmedicin.se/skolhalsovard/utvecklingsrelaterad-sprakstoerning-dld" },
      { label: "Afasiförbundet — språkstörning/DLD", url: "https://www.afasi.se/sprakstorning/" },
      { label: "Processtöd — språkstörning/DLD", url: "https://processtod.se/sprakstorning/sprakstorning-dld/" },
      { label: "Specialpedagogik — schools and the challenges of multilingualism", url: "https://www.vilarare.se/specialpedagogik/sarskilt-stod/skolan-maste-forsta-utmaningarna-med-flersprakighet/" },
    ],
    sourceLanguageNote: "Primary sources in Swedish; summarised in English for this entry. Not verified against skollagen text directly — confidence marked accordingly.",
  },

  // ---------------- AMERICAS ----------------
  {
    ...base,
    countryCode: "CA", unitName: "Ontario", isNational: false, region: "Americas", subregion: "Northern America",
    confidence: "secondary-source", lastVerified: "2026-08",
    policyHistory: [
      { year: "1998", description: "Ontario Regulation 181/98 requires every school board to establish an Identification, Placement and Review Committee (IPRC)." },
    ],
    terminology:
      "'Language Impairment' is the formal category — one of the exceptionalities in the Ministry of Education's Communication group, alongside Autism, Deaf and Hard of Hearing, and Learning Disability. " +
      "'DLD' has no standing in the provincial framework, so Ontario is a clear case of a system where clinical and administrative vocabularies have not converged.",
    identificationCriteria:
      "Identification is an administrative decision by an IPRC, not a clinical one: the committee is made up of at least three school board staff including the principal or superintendent, and speech-language pathologists on student services staff contribute a professional opinion rather than deciding. " +
      "The criteria that matter in practice are set locally — the definition of 'language impairment' used to qualify a pupil can differ between neighbouring school boards within the same province, which makes provincial-level comparison of identification rates unsafe.",
    referralPathway:
      "School-initiated or parent-requested referral to the board's IPRC process. Health-side and preschool speech and language services run separately from the school system; their referral routes were not established from the sources consulted.",
    serviceModel:
      "School-board employed speech-language pathologists working within student services. Placement options set by regulation range from a regular class with withdrawal support for under 50% of the day, through a special education class with integration for at least one instructional period daily, to a full-time special education class.",
    legalEntitlement:
      "An IPRC identification leads to an Individual Education Plan, and the decision is appealable — Ontario operates Special Education Tribunals for disputes that are not resolved at board level. " +
      "The entitlement therefore attaches to the IPRC identification rather than to a clinical diagnosis of language disorder.",
    multilingualProvision: NOT_ESTABLISHED(
      "the provincial exceptionality definitions and IPRC materials reviewed here do not set out a protocol for assessing pupils who speak more than one language, and no province-wide guidance was found. Given how board-dependent the criteria already are, board-level practice is likely to vary and is not documented here."
    ),
    resources:
      "Ontario Ministry of Education categories of exceptionality; Teach Special Education (Ontario teacher-facing guidance on the Language Impairment exceptionality); Justice for Children and Youth guidance on IPRC rights; College of Audiologists and Speech-Language Pathologists of Ontario (CASLPO) as the regulator.",
    docLinks: [
      { label: "Language Impairment exceptionality — Teach Special Education (Ontario)", url: "https://www.teachspeced.ca/language-impairment-exceptionality" },
      { label: "Categories and definitions of exceptionalities (YRDSB special education plan)", url: "https://www2.yrdsb.ca/student-support/special-education/special-education-plan/2-7-Categories-and-Definitions" },
      { label: "Justice for Children and Youth — IPRC rights", url: "https://jfcy.org/en/rights/special-education-iprc/" },
      { label: "Identification, Placement and Review Committees in Ontario's schools (research paper)", url: "https://files.eric.ed.gov/fulltext/EJ1277996.pdf" },
    ],
    sourceLanguageNote: "All primary sources in English. Not verified against O. Reg. 181/98 text directly — confidence marked accordingly.",
  },

  // ---------------- OCEANIA ----------------
  {
    ...base,
    countryCode: "AU", unitName: "Australia", isNational: true, region: "Oceania", subregion: "Australia and New Zealand",
    confidence: "secondary-source", lastVerified: "2026-08",
    terminology:
      "'Developmental language disorder' is used, and Australian advocacy has adopted it firmly — The DLD Project and Language Disorder Australia both campaign under the DLD label. It has no corresponding statutory category in either the disability or the education system.",
    identificationCriteria:
      "No national criteria. Diagnosis is made by speech pathologists on clinical grounds. The consequential thresholds are eligibility thresholds rather than diagnostic ones, and they sit in the funding systems described under entitlement below.",
    referralPathway:
      "Multiple parallel entry points — private speech pathology, NDIS early childhood approach for children under 7 (which can proceed without a formal diagnosis), state education department referral where that exists, and GP referral to a Medicare Chronic Disease Management plan.",
    serviceModel:
      "Fragmented across three systems that do not align: the federally funded NDIS, state and territory education departments, and private practice. " +
      "A survey of speech-language pathology service delivery in Australian schools found referral to a department-employed speech-language pathologist was possible in the ACT, Queensland, South Australia, Tasmania and Victoria, but that the services on offer varied substantially between them — so which state a child lives in materially changes what they get.",
    legalEntitlement:
      "The clearest example in this catalog of a diagnosis that confers no entitlement. DLD is not on the NDIS list of conditions accepted as likely to meet the disability requirements, so access requires demonstrating substantially reduced functional capacity case by case, and refusals are widely reported. " +
      "On the education side, pupils whose only disability is a speech, language or communication disorder are unlikely to qualify for individual targeted educational funding, despite documented effects on educational participation and achievement. " +
      "The fallback, a Medicare Chronic Disease Management plan, is capped at five subsidised sessions a year.",
    funding:
      "Mixed public and private, with the gaps carried by families. NDIS packages for those who get access; state education budgets where departmental speech pathologists exist; Medicare subsidy capped at five sessions annually; otherwise private fees.",
    workforce:
      "Speech pathology is self-regulating in Australia through Speech Pathology Australia rather than registered under AHPRA. " +
      "SPA's 2023 Workforce Analysis reported that speech pathologists are inequitably distributed across the country and that supply is not meeting estimated population need, alongside growth of 27% in graduates and 25% in first-year enrolments; 98% of SPA members are women.",
    identifiedPrevalence: [
      { year: "2026", value: "~7", note: "Commonly cited in Australian advocacy as '1 in 14' children — an epidemiological estimate carried over from international prevalence work, not an Australian identification rate." },
    ],
    resources:
      "The DLD Project (including its DLD-and-NDIS guidance for families) and The DLD Project Foundation; Language Disorder Australia; Speech Pathology Australia position statement on speech pathology in education and its 2023 workforce analysis; AHHA Deeble evidence brief on DLD and the NDIS; NSW Department of Education DLD professional learning.",
    outcomesEvidence: NOT_ESTABLISHED(
      "no national outcome reporting for DLD as a distinct category was identified; because DLD does not map to a funding category, it is largely invisible in administrative data."
    ),
    docLinks: [
      { label: "AHHA Deeble evidence brief no. 21 — DLD and the NDIS", url: "https://ahha.asn.au/resource/deeble-evidence-brief-no-21-developmental-language-disorder-and-the-ndis/" },
      { label: "The DLD Project — DLD and the NDIS: a practical guide for families", url: "https://thedldproject.com/dld-and-the-ndis-a-practical-guide-for-families/" },
      { label: "Speech Pathology Australia — Workforce Analysis (2023)", url: "https://www.speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/3c538667-094d-4674-8e7e-8c0edf784cae/Speech%20Pathology%20Workforce%20Analysis%20report%202023.pdf" },
      { label: "A survey of speech-language pathology service delivery in Australian schools (2024)", url: "https://www.tandfonline.com/doi/full/10.1080/17549507.2024.2404035" },
      { label: "Language Disorder Australia — DLD", url: "https://languagedisorder.org.au/what-is-language-disorder/dld/" },
    ],
    sourceLanguageNote: "All primary sources in English.",
    multilingualProvision: NOT_ESTABLISHED(
      "no national protocol for assessing multilingual children was identified in the sources consulted, and none of the three funding systems appears to specify one. This is a substantial gap for a country where a large minority of school pupils speak a language other than English at home, and for Aboriginal and Torres Strait Islander children speaking traditional languages or Aboriginal English."
    ),
  },
  {
    ...base,
    countryCode: "NZ", unitName: "New Zealand", isNational: true, region: "Oceania", subregion: "Australia and New Zealand",
    confidence: "official-document", lastVerified: "2026-08",
    identificationCriteria:
      "Access is defined by service thresholds rather than by a diagnostic definition. The Ongoing Resourcing Scheme (ORS) requires either ongoing extreme or severe difficulty in learning, hearing, vision, physical or communication ability, or moderate to high difficulty across several of those areas. " +
      "The Ministry of Education Communication Service uses a narrower age-banded threshold — high communication needs, for example language skills well below the level expected for age.",
    referralPathway:
      "Through the Ministry of Education's learning support pathway. ORS applications can be made at any time from age 4 years 8 months. The Communication Service covers children aged roughly five to eight.",
    serviceModel:
      "Education-led, which distinguishes New Zealand from most systems in this catalog: speech-language therapists are employed by the Ministry of Education rather than by health services, and work with pupils with severe communication needs across speech, fluency, voice, resonance and language. " +
      "ORS resourcing can be used to buy in specialist input including speech-language therapy, psychology, occupational therapy or physiotherapy.",
    legalEntitlement:
      "ORS is a resourcing scheme with eligibility criteria, not an individually enforceable right to a named quantum of therapy — it provides resources to the school for pupils with high and very high needs in learning, vision, hearing, mobility, language and social communication.",
    funding: "Publicly funded through the education system; ORS is the principal vehicle for pupils with the highest needs.",
    terminology: NOT_ESTABLISHED(
      "Ministry of Education material reviewed here uses functional descriptions ('high communication needs', 'significant language delay') rather than a diagnostic label, so whether 'DLD' is in official use could not be determined."
    ),
    multilingualProvision: NOT_ESTABLISHED(
      "no protocol for assessing children who speak more than one language was identified in the Ministry of Education material reviewed. How this interacts with te reo Māori, Māori-medium education and Pasifika languages is the obvious question for a contributor to answer."
    ),
    resources:
      "Ministry of Education learning support pages on speech, language and communication support; ORS guidance for schools and families; RTLB (Resource Teachers: Learning and Behaviour) service.",
    docLinks: [
      { label: "Ministry of Education — speech, language and communication support for children", url: "https://www.education.govt.nz/education-professionals/schools-year-0-13/learning-support/speech-language-and-communication-support-children" },
      { label: "Ministry of Education — overview of the Ongoing Resourcing Scheme", url: "https://www.education.govt.nz/education-professionals/schools-year-0-13/learning-support/overview-ongoing-resourcing-scheme" },
      { label: "Ministry of Education — apply for ORS for school students", url: "https://www.education.govt.nz/education-professionals/schools-year-0-13/learning-support/apply-ongoing-resourcing-scheme-school-students" },
    ],
    sourceLanguageNote: "All primary sources in English.",
  },

  // ---------------- AFRICA ----------------
  {
    ...base,
    countryCode: "ZA", unitName: "South Africa", isNational: true, region: "Africa", subregion: "Southern Africa",
    confidence: "secondary-source", lastVerified: "2026-08",
    terminology: NOT_ESTABLISHED(
      "the South African literature reviewed here works largely in terms of 'language impairment' and 'communication disorders'; how far the CATALISE 'DLD' terminology has been adopted in local clinical and education practice could not be determined."
    ),
    identificationCriteria: NOT_ESTABLISHED(
      "no national diagnostic or eligibility criteria were identified. The dominant constraint reported in the literature is not the criteria but the assessment tools available to apply them — see below."
    ),
    assessments:
      "The central documented problem. There is an overall shortage of valid assessment tools for multilingual populations, and particularly for several South African languages. " +
      "The tests actually in use are predominantly built on European and American linguistic, cultural and social contexts, with guidance that does not address the South African population. " +
      "Language sample analysis is used as a partial response to the absence of appropriate standardised norms.",
    multilingualProvision:
      "South Africa is the sharpest case in this catalog of multilingualism being the whole problem rather than a complicating factor: eleven official spoken languages (plus South African Sign Language) make multilingual assessment the normal case, not the exception. " +
      "The documented picture is a mismatch between requirement and capacity. The HPCSA requires cultural competence, but research reports that parts of the existing workforce in both public and private sectors do not meet it, and that there is a shortage of speech-language therapists fluent in and knowledgeable about African languages — with explicit implications for language rights and for language policy implementation. " +
      "Where tools and language-matched clinicians are unavailable, informal 'solutions' are used — ad hoc translation and untrained interpreters — and the literature treats these as a risk to validity rather than an adequate workaround. " +
      "Research also finds that less experienced therapists were significantly more likely than more experienced ones to be able to provide services and therapy materials in African languages, which points at the workforce pipeline rather than at individual practice as the lever.",
    serviceModel:
      "Delivered by speech-language therapists in public health facilities and private practice, with an ongoing professional debate — reflected in the South African Journal of Communication Disorders — about the roles and responsibilities of speech-language therapists working in schools.",
    workforce:
      "Registration and regulation by the Health Professions Council of South Africa (HPCSA). A shortage of therapists overall, and specifically of therapists who speak the African languages of the children they serve, is consistently reported.",
    resources:
      "South African Journal of Communication Disorders (SAJCD) as the main national evidence base; HPCSA professional standards; South African Speech-Language-Hearing Association.",
    docLinks: [
      { label: "Are South African SLTs adequately equipped to assess EAL speakers from indigenous linguistic backgrounds?", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5843087/" },
      { label: "Southwood — the challenge of linguistic and cultural diversity in managing children with language impairment", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5843084/" },
      { label: "Wium — revisiting the roles and responsibilities of SLTs in South African schools (SAJCD)", url: "https://sajcd.org.za/index.php/sajcd/article/view/8/14" },
      { label: "Winter et al. — how South African SLPs use language sample analysis for multilingual children (2026)", url: "https://onlinelibrary.wiley.com/doi/full/10.1111/1460-6984.70268" },
    ],
    sourceLanguageNote:
      "Sources in English (peer-reviewed South African literature). This entry is built from research literature rather than statute or official guidance, which is why confidence is 'secondary-source' — a contributor working in the system should correct and extend it.",
  },

  // ---------------- ASIA ----------------
  {
    ...base,
    countryCode: "IL", unitName: "Israel", isNational: true, region: "Asia", subregion: "Western Asia",
    confidence: "secondary-source", lastVerified: "2026-08",
    policyHistory: [
      { year: "1988", description: "Special Education Law establishes state responsibility for free special education for children with special needs, defining special education to include speech therapy alongside teaching." },
      { year: "2018", description: "Amendment to the Special Education Law changes how placement and parental choice operate." },
    ],
    terminology: NOT_ESTABLISHED(
      "the Hebrew-language clinical terminology and the extent of CATALISE 'DLD' adoption could not be determined from the English-language sources consulted."
    ),
    serviceModel:
      "Dual-system, with both routes live at once. Health maintenance organisations (kupot holim) deliver therapy under national health insurance, and the education system delivers additional therapeutic input either as an individualised basket of service hours for pupils in mainstream classes or through placement in a special education 'communication' class. " +
      "For children under two where diagnosis is still uncertain, speech and occupational therapy can be accessed through HMOs without a formal diagnosis, on referral from a Child Development Clinic — an unusually low barrier to early intervention.",
    legalEntitlement:
      "Statutory and comparatively strong. The Special Education Law defines 'special education' to include paramedical treatment — explicitly naming speech therapy — as part of the instruction and treatment the state must provide, free, for children with special needs aged three to twenty-one, and establishes a right to paramedical services, expressive therapies and assistive devices. " +
      "Placement and entitlement decisions are made by a statutory committee (va'ada), and the scope of the state's duty has been litigated up to the Supreme Court.",
    funding:
      "Public, via two channels: national health insurance through the HMOs, and the education budget for service hours and special-class placement. Supplemental HMO insurance gives partial reimbursement for some assessments, so families with supplemental cover face a different effective entitlement from those without.",
    identificationCriteria: NOT_ESTABLISHED(
      "the diagnostic criteria and any score thresholds applied by the statutory placement committees could not be determined from the English-language sources consulted."
    ),
    multilingualProvision: NOT_ESTABLISHED(
      "no protocol was identified in the sources consulted. Given Hebrew/Arabic bilingual education, large Russian- and Amharic-speaking populations and Arabic-medium schooling, this is a high-value field for a contributor who works in the system."
    ),
    docLinks: [
      { label: "UNESCO Education Profiles — Israel, inclusion", url: "https://education-profiles.org/northern-africa-and-western-asia/israel/~inclusion" },
      { label: "OECD — autism policies in Israel (describes the HMO/education dual therapy route)", url: "https://www.oecd.org/en/publications/policy-responses-to-rising-autism-diagnoses-in-childhood_08394255-en/full-report/autism-policies-in-israel_9f9b0d86.html" },
      { label: "Yated v. Ministry of Education (Israeli Supreme Court, special education entitlement)", url: "https://versa.cardozo.yu.edu/opinions/yated-v-ministry-education" },
    ],
    sourceLanguageNote:
      "Built from English-language secondary sources; the Special Education Law and Ministry of Education circulars are in Hebrew and were not read directly for this entry.",
  },
  {
    ...base,
    countryCode: "IN", unitName: "India", isNational: true, region: "Asia", subregion: "Southern Asia",
    confidence: "secondary-source", lastVerified: "2026-08",
    policyHistory: [
      { year: "1992", description: "Rehabilitation Council of India Act — creates the Central Rehabilitation Register; only registered professionals may practise as rehabilitation professionals." },
      { year: "2016", description: "Rights of Persons with Disabilities (RPwD) Act replaces the 1995 Act, listing 'speech and language disability' as a specified disability." },
    ],
    terminology:
      "The statutory category is 'speech and language disability' under the RPwD Act 2016. Critically for this catalog, the statutory definition turns on permanent, significant deviation in speech and/or language <em>due to organic or neurological causes</em> — a framing that does not straightforwardly accommodate DLD as CATALISE defines it, since DLD is precisely a language disorder without an identified organic or neurological cause. " +
      "How far that gap affects access in practice was not established here, but it is the single most important thing to check about this system.",
    identificationCriteria:
      "For statutory purposes, certification rather than diagnosis is what counts: a disability certificate stating a disability score, issued by a medical board that includes a medical superintendent, a neurologist and a certified speech-language pathologist. " +
      "Most entitlements under the Act attach to 'benchmark disability' — a certified disability of not less than 40%. A clinical opinion without a certificate carries no statutory weight.",
    legalEntitlement:
      "Runs through the RPwD Act 2016 and the National Trust Act 1999 rather than through education or health legislation specifically, and is gated by the certification process above rather than by clinical need.",
    workforce:
      "Regulated by the Rehabilitation Council of India: only professionals listed on the Central Rehabilitation Register may practise, and RCI approves the training programmes — over 900 approved institutions running more than 1,700 programmes as of 2022–23. " +
      "Workforce numbers relative to population need were not established from the sources consulted.",
    multilingualProvision: NOT_ESTABLISHED(
      "no national protocol was identified. With 22 scheduled languages and widespread everyday multilingualism, the availability of appropriately normed assessments across Indian languages is the obvious question, and this entry does not answer it."
    ),
    serviceModel: NOT_ESTABLISHED(
      "how services are actually organised between hospitals, private clinics, NGOs and schools, and how they differ between states, could not be established from the sources consulted."
    ),
    resources:
      "Department of Empowerment of Persons with Disabilities (DEPwD) for the Acts and Rules; Rehabilitation Council of India for professional registration and approved training; Indian Speech and Hearing Association.",
    docLinks: [
      { label: "DEPwD — Acts, Rules & Regulations (RPwD Act 2016, National Trust Act, RCI Act)", url: "https://depwd.gov.in/en/acts/" },
      { label: "'Rights of Persons with Disability' Act: a boon for persons with aphasia (analysis of the Act's speech/language provisions)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7731671/" },
    ],
    sourceLanguageNote:
      "Statutes consulted in English (the RPwD Act is published in English and Hindi). State-level implementation documents were not reviewed.",
  },
];

// Replace matching stubs; keep everything else untouched. Anything with no
// matching stub must be listed in NEW_ROWS — the EAL geography this was forked
// from has no national Australia row (EAL policy there is entirely state-set),
// but DLD has a genuinely federal layer in the NDIS, so one is added.
const NEW_ROWS = new Set(["AU|Australia"]);

const key = (e) => `${e.countryCode}|${e.unitName}`;
const incoming = new Map(ENTRIES.map((e) => [key(e), e]));
let replaced = 0;
const merged = seed.S.map((e) => {
  const hit = incoming.get(key(e));
  if (!hit) return e;
  incoming.delete(key(e));
  replaced++;
  return hit;
});
const unmatched = [...incoming.keys()];
const unexpected = unmatched.filter((k) => !NEW_ROWS.has(k));
if (unexpected.length) {
  console.error("No stub matched, and not declared as a new row:", unexpected.join(", "));
  process.exit(1);
}
unmatched.forEach((k) => merged.push(incoming.get(k)));
console.log(`Inserted ${unmatched.length} new row(s): ${unmatched.join(", ") || "none"}`);
merged.sort((a, b) => a.countryCode.localeCompare(b.countryCode) || a.unitName.localeCompare(b.unitName));
fs.writeFileSync(OUT, JSON.stringify({ S: merged }, null, 2) + "\n");

const worked = merged.filter((e) => e.status !== "stub");
console.log(`Replaced ${replaced} stubs. Now ${worked.length} worked entries of ${merged.length}.`);
const byRegion = {};
worked.forEach((e) => (byRegion[e.region] = (byRegion[e.region] || []).concat(e.unitName)));
Object.entries(byRegion).forEach(([r, names]) => console.log(`  ${r}: ${names.join(", ")}`));
