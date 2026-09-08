/**
 * Controlled vocabularies for coding a field's prose into columns.
 *
 * Everything here was derived by READING the corpus, not by proposing a scheme
 * and checking whether it fit. Each value carries the entries that forced it to
 * exist, so a later reader can check the vocabulary against the thing it
 * describes rather than against somebody's intuition — and so that adding a
 * value is an argument about evidence rather than about taste.
 *
 * Why this is a separate layer and not more fields on the entry: the prose is
 * the record, and a coding is a reading OF it. A coding can be revised, argued
 * with or thrown away without touching a single sourced claim, and two codings
 * of the same corpus can be compared. Fields hold what the source says; this
 * holds what we make of it.
 *
 * NOTHING here is scored. There is no weighting, no total and no index.
 * `obliges` is ordinal because the thing it measures is ordinal, but turning an
 * ordinal into a number that can be averaged across countries is a separate
 * decision and it is not made here.
 *
 * THE UNIT OF A ROW DIFFERS BY FIELD, and each scheme says which it is.
 *
 * For the two dld fields it is an INSTRUMENT, not a country: Ghana cites a
 * constitution and a Children's Act, Chile names TECAL, TEPROSIF and a
 * screening test, and squeezing either into one row loses the thing that makes
 * them comparable. For the two eal fields it is the SYSTEM, because a system
 * designates a pupil once however many documents say so — and because the
 * question there is what the system does, not what each instrument contains.
 */

// ===========================================================================
// dld.legalEntitlement
// ===========================================================================

// What KIND of thing creates the entitlement. Ordered roughly by how hard it is
// to change, which is an observation and not a score.
const INSTRUMENT_TYPES = {
  constitution: 'A constitutional provision (Ghana art. 25.1(a), Nepal art. 31, Cuba art. 37)',
  statute: 'An act of the legislature (Legge 104/1992, Education Act 1996 s.40, EPSEN Act 2004)',
  decree: 'A decree or decree-law made by the executive (Decreto-Lei 54/2018, D.Lgs 66/2017, decree-law 573)',
  regulation: 'Subordinate rules — regulations, circulars, ministerial orders (Circular 0052/2019, Order 0111/MENET/CAB)',
  policy: 'A policy, plan, framework or white paper with no binding force (Education White Paper 6, Zambia 2017-21 NDP)',
  scheme: 'A funding or resourcing programme rather than a right (New Zealand ORS, Australia NDIS, Chile subvención)',
  treaty: 'An international instrument named as the operative source, where nothing domestic is cited (Morocco, CRPD)',
  none: 'The entry establishes that no instrument creates an entitlement here',
};

// WHAT IT OBLIGES, as levels.
//
// The cut that matters most is between 2 and 3: below it the duty is owed to a
// population, above it to a child. A state that must "establish special schools"
// and a child who "has a right to the support they need" are not the same
// promise, and flattening them is how a survey of law stops describing anything.
//
// Deliberately NOT a quality scale. Level 4 with no redress may be worth less in
// practice than level 3 with a tribunal — which is exactly why enforceability is
// a separate axis rather than the top of this one.
const OBLIGES_LEVELS = {
  0: { label: 'nothing', gloss: 'No instrument creates an entitlement. Zambia: no inclusive-education policy is in place and the constitution does not enshrine a right to education.' },
  1: { label: 'non-discrimination or general access', gloss: 'A right not to be excluded, or a general right to education reaching disabled people without providing anything specific. Ghana, Indonesia, Bangladesh, Sri Lanka, Papua New Guinea.' },
  2: { label: 'duty to provide, owed to the population', gloss: 'The state, a ministry or an authority must provide or establish provision; no individual can claim it. Malaysia s.40 puts the duty on the Minister, Kenya s.44 on the Cabinet Secretary, Spain art. 71.2 on the authorities.' },
  3: { label: 'individual right, provision unspecified', gloss: 'A named child is entitled to support, with what support left to case-by-case determination. Uganda\'s reasonable accommodations, Costa Rica art. 18, Italy\'s right in ordinary classes, Argentina art. 44.' },
  4: { label: 'individual right, provision specified', gloss: 'The entitlement attaches to a written individual determination of what this child gets. France\'s PPS, Poland\'s IETP, Colombia\'s PIAR, Russia\'s PMPK conditions, the US IEP, Germany\'s Heilmittel claim.' },
};

// WHO CARRIES THE DUTY. Two columns, not one: the entry names a body ("the
// Cabinet Secretary", "the kurator oświaty", "sick funds") and the type is what
// makes those comparable across sixty legal systems. Keeping the name is what
// lets the typing be checked by somebody who disagrees with it.
const DUTY_TYPES = {
  ministry: 'A named minister or ministry (Malaysia\'s Minister, Egypt\'s education ministries, Samoa\'s chief executive)',
  'national government': 'The state as such, not a named department (Italy assigning support teachers, Greece binding itself, Peru)',
  'regional government': 'A state, province, region or Land (Russia\'s regions carry the expenditure obligation; Canada\'s provinces; Pakistan\'s provinces)',
  'local authority': 'A municipality or local government unit (Norway\'s municipality, Italy\'s local authorities, Albania\'s local self-government unit)',
  school: 'The school or institution itself (Poland\'s preschools and centres, Uganda\'s regular schools, Jamaica\'s institutions, Türkiye\'s state and private schools)',
  'statutory body': 'A commission, panel or agency created to assess or decide (France\'s CDAPH, Greece\'s KEDASY, Russia\'s PMPK, Jamaica\'s Council)',
  insurer: 'A health insurer or sickness fund (Germany\'s Krankenkassen under SGB V, bound by the G-BA directive)',
  'court or tribunal': 'A judicial or quasi-judicial body carrying a duty of its own',
  'not stated': 'The entry establishes the entitlement but does not say who must deliver it',
};

// REDRESS. Coded because the corpus answers it more often than the tagging
// suggested, and because the reason it looked unanswerable is a distinction this
// project already knows how to make: 71% of entries not answering is NOT 71% of
// systems having no appeal. `none` and `not stated` are different values and
// must stay different — it is the blank-versus-documented-absence problem one
// level up.
const REDRESS_TYPES = {
  'administrative appeal': 'An appeal to a higher administrative authority (Poland\'s kurator oświaty within 14 days, Norway\'s department, Türkiye within 30 working days)',
  'specialist commission': 'A standing body for disputes of this kind (the Netherlands\' Geschillencommissie passend onderwijs, Greece\'s EDEA)',
  'complaint to agency': 'A written complaint to the body administering the scheme (Jamaica: an aggrieved person or caregiver complains to the Council)',
  court: 'Recourse to the ordinary courts, named as the route',
  'consultation right': 'Not redress but a right to be heard before the decision (France: the family has 15 days on the draft PPS; Portugal: grounds annexed to the report)',
  none: 'The entry establishes that no appeal route exists',
  'not stated': 'The entry does not say, and nobody has established whether one exists',
};

// ===========================================================================
// dld.assessments
// ===========================================================================
//
// THE CONTENT RULE APPLIES HERE AND IS NOT NEGOTIABLE. CLAUDE.md: assessment
// instruments may be named and linked, NEVER reproduced — no norms, items,
// scoring tables or cut-off values. Everything below is metadata ABOUT a test:
// what it is for, what it covers, whether norms of a given kind exist. That an
// instrument HAS local norms is a fact about availability and is already one of
// this field's four questions. What those norms ARE is the thing that may not
// be recorded, here or anywhere.

// What the instrument is, as a thing.
const TEST_TYPES = {
  battery: 'A multi-subtest standardised battery covering several areas (Chile\'s mandated battery, imported ELO / L2MA / NEEL / EVALO)',
  'single task': 'One task assessing one construct (the LITMUS sentence repetition task, an articulation test)',
  screener: 'A short instrument for identifying who needs fuller assessment, not for diagnosis',
  'criterion checklist': 'A protocol or toolkit of observations rather than a normed test (Armenia\'s 2021 ICF-linked toolkit)',
  'access arrangement': 'Not a language measure at all — rules for accommodating a candidate in an exam (Belize\'s CXC arrangements)',
  none: 'The entry establishes that no instrument is named or in use',
};

// Whether it can be used with a bilingual or multilingual child, which is the
// question this whole map exists around and the one most catalogues cannot
// answer. Four values because the corpus shows four situations, and the last two
// are not the same: a test with no bilingual provision is a limitation, while a
// test imported wholesale into a population it was not built for is a documented
// source of error.
const BILINGUAL_FIT = {
  'designed multilingual': 'Built to be used with multilingual children and to separate disorder from L2 exposure (the LITMUS family, by design)',
  'parallel versions': 'Exists in more than one language of the same setting, so a child can be assessed in either (Cyprus: Cypriot Greek and Standard Greek; Ireland: Irish and Irish-English; Israel: Hebrew, Palestinian Arabic and Russian)',
  monolingual: 'Built and normed for one language, with no bilingual provision stated',
  'imported unadapted': 'A test from another population used without adaptation, where the source itself records the resulting bias (Burkina Faso: ELO, L2MA, NEEL and EVALO used in extracts, pictures unfamiliar to Burkinabè children, "biases results and can miss the diagnosis")',
  'not stated': 'The entry names the instrument but says nothing about its use with bilingual children',
};

// Comprehension or production. Sentence repetition is coded `production`: the
// child produces the sentence, and although comprehension is implicated, what is
// scored is the output. Coding it "both" would make the column mean nothing.
const MODALITY = {
  comprehension: 'Scores what the child understands (Chile: TECAL, and the comprehensive subtest of the Screening Test of Spanish Grammar)',
  production: 'Scores what the child produces (Chile: TEPROSIF and the expressive subtest; the LITMUS sentence repetition task)',
  both: 'The instrument has separate comprehension and production components, both scored',
  'not stated': 'The entry does not say which',
};

// Which level(s) of language. A list, not a single value: a battery covers
// several and saying so is the point of the column. `general` is for an omnibus
// instrument whose subtests the entry does not break down — it is an honest
// "the entry does not resolve this", not a claim of coverage.
const LANGUAGE_DOMAINS = {
  phonology: 'Speech sounds and phonological processing (Mansoura University\'s Arabic articulation and phonology tests)',
  'lexicon and semantics': 'Vocabulary and meaning (the Arabic Semantic Test published in 2023)',
  morphosyntax: 'Grammar — inflection and sentence structure (the Screening Test of Spanish Grammar; sentence repetition targets this)',
  'narrative and discourse': 'Connected language beyond the sentence',
  pragmatics: 'Language use in context',
  general: 'An omnibus measure whose components the entry does not break down',
};

// ===========================================================================
// eal.newcomerCriteria and eal.removalCriteria
// ===========================================================================
//
// The pair that says who enters a category and who leaves it. Coded together
// because they are one question asked twice, and because the corpus turns out
// to answer the first almost everywhere (190 of 210) and the second almost
// nowhere (42 of 210, once the 65 systems with no designation are set aside).

// Whether a designation exists, and in what form. The absence case is NOT a
// value here: a system with no category carries the absence flag on the field
// and its removalCriteria is Not applicable, so it never reaches this coding.
const DESIGNATION_FORMS = {
  'named category': 'A term of art in law or regulation, with a definition attached (France EANA, Austria ausserordentlicher Schueler, Poland uczen przybywajacy z zagranicy, Denmark tosprogede boern, Spain alumnado de incorporacion tardia)',
  functional: 'No formal label, but a stated test that decides who gets support (Estonia, Finland, Germany, Iceland: "no fixed statutory newcomer label", then a criterion)',
  'proxy category': 'Pupils are grouped by something that is not their language or arrival, and support follows that grouping (Singapore assigns by ethnicity; Italy by non-Italian citizenship)',
};

// WHAT PUTS A PUPIL IN. A list, not one value: Czechia takes foreigner status
// AND insufficient Czech; New Zealand takes arrival date, refugee documentation
// and home language together. Coding a single "main" trigger would throw away
// the combinations, which are the interesting part.
const NEWCOMER_TRIGGERS = {
  'arrival recency': 'How recently the child arrived, or how long they have been resident (New Zealand proof of entry date, Estonia under 3 years, Finland about 4, Israel date of aliyah relative to 1 January, France not schooled in France the previous year)',
  'tested proficiency': 'A language assessment decides (Austria standardised testing, Denmark "a linguistic and functional test, not an arrival date or age cutoff", Czechia three levels, Spain initial assessment)',
  'home language': 'The language spoken at home, or a mother tongue other than the language of instruction (Iceland, Switzerland fremdsprachige Kinder, Denmark, New Zealand)',
  'immigration status': 'Citizenship, residence permit or migration status (Italy cittadinanza non italiana, Tuerkiye residence permit under Law 6458, Poland non-Polish citizens plus Poles schooled abroad, Czechia foreigner status)',
  ethnicity: 'Assignment by ethnic or racial classification (Singapore, where mother-tongue assignment is by race and not by any language test)',
  'demand threshold': 'A number of parents or pupils must ask before provision exists at all (Malaysia: fifteen parents; South Africa: 40 learners in Grades 1-6). Not a pupil-level designation, and the entries say so',
  'prior schooling': 'Schooling history rather than language or arrival (Netherlands "never previously in a Dutch school", Estonia under 6 academic years of Estonian-medium schooling, Spain enrolling after the year normally starts)',
  'not stated': 'A category exists and the entry does not establish what puts a pupil in it',
};

// WHO DECIDES. Kept separate from the trigger because the same test can be
// applied by a teacher, a municipality or a national body, and that is the
// difference between a rule and a discretion.
const DECIDED_BY = {
  school: 'The school, its leader or its teachers (Denmark: the school leader sets the support level; Iceland: hours allocated at individual-school level)',
  'statutory body': 'A commission or panel constituted to decide (France CDAPH via the PPS, Greece KEDASY, Tuerkiye Provincial Placement/Transfer Commissions)',
  municipality: 'Local government (Norway, where the Education Act lets municipalities choose the model)',
  'national authority': 'A ministry or national agency (Israel: the Ministry of Education allocates by a key in the Director-General circular)',
  automatic: 'No decision is taken about the individual: the designation follows from records already held (Israel: set from the school reported pupil roll, with no application by the school)',
  'regional government': 'A state, province, canton or Land (Switzerland\'s cantons, Germany\'s Laender, United States states, Spain\'s regional decrees). DUTY_TYPES had this and this axis did not, which flattened every federal system',
  'nobody, the period expires': 'No decision is taken about ending it: a clock runs out. All twelve clock systems in the first coding pass had no value for this, and `automatic` is not it -- that means a decision made without an application, which is not the same as no decision',
  'not stated': 'The entry does not establish who decides',
};

// WHERE THE BINDING RULE LIVES. This is the axis that a six-country European
// study cannot see and a global one can, and it is the one that decides whether
// "no national rule" means "no rule".
const RULE_LOCUS = {
  'national statute': 'Binding rule set nationally (Austria SchUG s.4, Poland MEN regulation, Spain LOMLOE arts. 78-79)',
  'national framework, sub-national rules': 'A national frame that coordinates without binding, with the operative rules made below it (Germany: KMK framework, the 16 Laender set terminology, thresholds and duration; Switzerland: EDK/CDIP with 26 cantons; United States: federal identification duty, states set the instrument)',
  'national rule, local application': 'A binding national rule, carried out by a body below the national level. Distinct from the framework case above, where the national frame coordinates WITHOUT binding (Denmark, Greenland, Norway and Tuerkiye were all flattened into `national statute` before this value existed)',
  'sub-national only': 'No national instrument at all; the rule exists only below the national level (Canada, where education is provincial under the Constitution Act 1867)',
  'institutional': 'Left to individual schools or providers',
  'not stated': 'The entry does not establish where the rule is made',
};

// HOW THE DESIGNATION ENDS. The typology the corpus volunteers, and the
// striking thing about it is that the first two are mutually exclusive by
// design rather than by accident. New Zealand: "No proficiency-based exit test
// -- capped by duration instead". Taiwan: "No attainment exit test; the
// entitlement is capped in periods". Czechia: "Capped by prior time in Czech
// education, not by proficiency". Austria runs its 12 months out "regardless of
// remaining German gaps". Systems choose a clock or a test, and say so.
// exit_mechanism IS A LIST. Eleven of the first 59 entries coded stated two or more
// simultaneously operative rules, and coding one value threw the others away:
// Chile runs an annual re-evaluation AND stops at 5;11, the United States a
// triennial cycle AND a team decision AND an age limit, Ireland a two-year
// school cap AND service-by-service discharge. Order them as the entry does.
const EXIT_MECHANISM = {
  clock: 'A fixed period, expiring whether or not the pupil is proficient (Austria 12 months extendable by 12, Czechia 24, Netherlands 2 years, Sweden 4, New Zealand 5 and 3, Greece ZEP II 2-3 years)',
  test: 'A NAMED instrument decides, with a stated level (Northern Mariana Islands WIDA ACCESS, Puerto Rico LAS Links level 4 or 5, Iceland competence level three)',
  'proficiency judgement': 'Proficiency decides, but no instrument is named -- an assessment made by a school, service or clinician (France assessed at school or CASNAV level, Norway "sufficiently proficient", Germany an assessment of German sometimes referencing DSD I). Liechtenstein states the distinction outright: exit is "proficiency-based rather than a fixed test"',
  'assessed, no criterion': 'A review point is fixed and no standard for ceasing is set — the decision exists, the criterion does not (Denmark: "the order sets that decision point but states no criterion for ceasing"; Sweden and Finland the same in their school acts)',
  'age ceiling': 'Entitlement ends at an age, with no judgement about the pupil. Unused across 42 eal entries in the first coding pass -- kept because the shape is real elsewhere, but it has no eal example yet, and the Israel and Micronesia cases that once glossed it are dld entries and belong to DISCHARGE_BASIS',
  'none established': 'Checked, and the system sets no exit rule of any kind, at any level (Ireland, Lithuania, Monaco). NOT for a system that sets no NATIONAL rule and leaves it below -- France "not time-boxed nationally", the United States "no federal exit test" and Spain "as soon as possible" are all saying where the rule is made, which rule_locus carries. Leave exit_mechanism unset for those and let the locus say it',
  'not stated': 'The entry does not reach the question',
};

// ===========================================================================
// dld.identificationCriteria and dld.dischargeCriteria
// ===========================================================================
//
// The same pair as the eal one -- who enters the category, who leaves it --
// asked of a category that is clinical rather than administrative. That
// difference matters and is the reason these need their own vocabularies: a
// newcomer designation exists only if a state creates one, but a child with a
// language disorder is identified by somebody whether or not any statute says
// how. There is no "no category exists" case here.

// WHAT THE THRESHOLD TURNS ON. The axis this map exists to measure, because it
// decides whether a child gets anything.
const THRESHOLD_BASIS = {
  'clinical diagnosis': 'A clinician judges the disorder present, and that is the criterion (Australia: "diagnosis made by speech pathologists on clinical grounds"; France: speech therapy after a bilan confirms a specific oral language disorder; Sweden: assessed by a logoped)',
  'educational need': 'The test is whether the child can benefit from ordinary teaching, with no diagnosis required (Norway: "threshold is need, not diagnosis: satisfactory benefit from the teaching"; Finland\'s pedagogical statement; Denmark: development requiring special consideration; Japan: needing instruction matched to the disability)',
  'diagnosis plus impact': 'Both: a qualifying impairment AND a demonstrated effect on schooling (United States IDEA -- "a qualifying impairment, an adverse effect on schooling, and a need for SDI")',
  'service threshold': 'Access is set by how scarce the service is rather than by what the child has (New Zealand: "access is set by service thresholds, not by a diagnostic definition"; ORS extreme or severe difficulty)',
  'administrative certification': 'A certificate or registered status, issued outside education, is what confers entitlement (India: "certification, not diagnosis" -- a disability certificate scoring not less than 40%; China: certification confers administrative disability status, not school eligibility)',
  'cognitive referencing': 'Language ability is compared against measured cognitive ability, so a child whose difficulties match their IQ is excluded. Named separately because it is contested rather than merely different: CATALISE rejects it, Ireland removed IQ as an entry criterion in revising its 2007 framework, and the United States records it as "still permitted in some states, though CATALISE rejects it". South Korea\'s schedule requires language "markedly below cognitive ability"',
  'not stated': 'The entry establishes that identification happens without establishing on what basis',
};

// HOW BILINGUALISM ENTERS THE CRITERION. Derived from the corpus and kept
// separate from the exclusions list, because these three are not degrees of one
// thing -- they are opposite policies, and this is the population the atlas is
// about.
const BILINGUAL_HANDLING = {
  'required across languages': 'The criterion demands difficulty in ALL of the child\'s languages, which is what distinguishes disorder from second-language learning (Sweden: "the rule that does most work: difficulties in all of the child\'s languages")',
  'culturally excluded': 'A child is ruled OUT where the difficulty can be attributed to linguistic or cultural background -- so the bilingual child is screened away from services rather than assessed properly (Greece: "ruled out where low attainment traces to outside linguistic or cultural factors"; Chile: excluded for "socio-affective deprivation, and features of a social or ethnic setting")',
  silent: 'The criterion says nothing about the child\'s other languages either way',
};

// WHO DECIDES. Same purpose as the eal axis -- the same test applied by a
// clinician, a commission or a school is three different systems.
const DECIDER_TYPES = {
  clinician: 'A speech and language therapist or logoped, alone or nominating (Sweden, Australia, Ireland where "the SLT nominates, with parental consent")',
  'medical commission': 'A statutory medical panel (Italy: a forensic doctor as chair plus two doctors, one a paediatrician; India: a board with a medical superintendent, a neurologist and a certified SLP)',
  'multidisciplinary team': 'A mixed professional team without medical primacy (Brazil\'s multiprofessional and interdisciplinary team, Kenya\'s EARC teams, Poland\'s adjudicating team, Tuerkiye\'s RAM kurul)',
  'educational psychology service': 'A school counselling or psychopedagogical body (Czechia\'s school counselling facility, Spain\'s guidance teams, Denmark\'s educational-psychological advice)',
  'school or authority': 'The school, or the authority that supervises it (Germany: school and school supervisory authority decide; Finland: the education provider makes a written decision)',
  municipality: 'Local government (Norway: the municipality decides, having first obtained the expert assessment)',
  'regional government': 'A state, province, canton or Land, where the criterion is set or applied there',
  'not stated': 'The entry does not establish who decides',
};

// WHAT RULES A CHILD OUT. A list: most systems name several.
const EXCLUSIONS = {
  'sensory impairment': 'Hearing or vision loss (Netherlands, Chile, Ireland\'s 2007 criteria)',
  'intellectual disability': 'A general cognitive impairment (Netherlands, Chile, Ireland 2007)',
  'motor or neurological': 'Motor deficit or brain lesion (Chile: expressly excluded)',
  'socio-cultural factors': 'Deprivation, or the child\'s social, ethnic or linguistic background (Chile, Greece). See BILINGUAL_HANDLING -- this is the same exclusion seen from the other side',
  'speech-only difficulty': 'Articulation or phonological difficulty alone is not the category (Chile: "dislalia and phonological disorder are expressly not indicators of TEL")',
  'existing placement': 'Already receiving another form of provision (Japan: pupils in a special support class are excluded from the programme)',
  'none stated': 'The entry establishes the threshold and names nothing that rules a child out',
};

// HOW THE DESIGNATION ENDS, for a clinical category. Different values from the
// eal pair: nothing here is a proficiency test, and the dominant mode is a
// scheduled re-assessment of continuing need.
// discharge_basis IS A LIST. Eleven of the first 59 entries coded stated two or more
// simultaneously operative rules, and coding one value threw the others away:
// Chile runs an annual re-evaluation AND stops at 5;11, the United States a
// triennial cycle AND a team decision AND an age limit, Ireland a two-year
// school cap AND service-by-service discharge. Order them as the entry does.
const DISCHARGE_BASIS = {
  're-evaluation cycle': 'Reassessment on a fixed schedule decides continuation (Chile annually under art. 11, United States at least every three years, Taiwan across education stages, Georgia, Dominican Republic)',
  'decision on continuing need': 'A team decides the child no longer needs the provision (United States: services end when the team finds no eligibility or no need for specially designed instruction; Taiwan: cases not meeting the criteria return to the regular class)',
  'fixed time limit': 'A period set in advance (Ireland: special-class placement "time-limited by design", up to two years under Circular 0038/2007)',
  'review without criterion': 'A review point is fixed and no standard governs the decision. Denmark states it outright -- "the order sets that decision point but states no criterion for ceasing" -- and Sweden and Finland say the same of their school acts. Three high-capacity systems independently built a decision with nothing behind it, which is why it is not folded into the none-established value',
  'age ceiling': 'Entitlement ends at an age, with no judgement about the child (Israel three to twenty-one, Micronesia to twenty-one, Zimbabwe\'s Secretary\'s Circular P36 of 1990)',
  'none established': 'Checked, and no discharge rule of any kind exists (Dominica, Saint Lucia and Saint Vincent, each having only an attendance exemption for a child "incapable of education by ordinary methods of instruction")',
  'not stated': 'The entry does not reach the question',
};

// ===========================================================================

/**
 * Which vocabularies apply to which field, and at what grain.
 *
 * `row` names what one CSV row IS for that field, because it is not the country
 * in either case and a reader of the export needs to be told so.
 */
const SCHEMES = {
  'dld.identificationCriteria': {
    row: 'one national or sub-national system',
    columns: {
      threshold_basis: THRESHOLD_BASIS,
      bilingual_handling: BILINGUAL_HANDLING,
      decider: DECIDER_TYPES,
      exclusions: EXCLUSIONS,
      rule_locus: RULE_LOCUS,
    },
  },
  'dld.dischargeCriteria': {
    row: 'one national or sub-national system',
    columns: {
      discharge_basis: DISCHARGE_BASIS,
      review_interval_months: 'integer, where a cycle is set and a length is given',
      decider: DECIDER_TYPES,
      rule_locus: RULE_LOCUS,
    },
  },
  'dld.legalEntitlement': {
    row: 'one legal instrument named by the entry',
    columns: {
      instrument: 'free text — the instrument as the entry names it',
      instrument_type: INSTRUMENT_TYPES,
      instrument_year: 'integer, where the entry gives one',
      obliges: OBLIGES_LEVELS,
      duty_org: 'free text — the body as the entry names it',
      duty_type: DUTY_TYPES,
      redress_type: REDRESS_TYPES,
    },
  },
  'eal.newcomerCriteria': {
    row: 'one national or sub-national system',
    columns: {
      designation: DESIGNATION_FORMS,
      triggers: NEWCOMER_TRIGGERS,
      decided_by: DECIDED_BY,
      rule_locus: RULE_LOCUS,
    },
  },
  'eal.removalCriteria': {
    row: 'one national or sub-national system',
    columns: {
      exit_mechanism: EXIT_MECHANISM,
      exit_period_months: 'integer, where a clock is set and a length is given',
      decided_by: DECIDED_BY,
      rule_locus: RULE_LOCUS,
    },
  },
  'dld.assessments': {
    row: 'one assessment instrument named by the entry',
    columns: {
      instrument: 'free text — the test as the entry names it, never its contents',
      test_type: TEST_TYPES,
      bilingual_fit: BILINGUAL_FIT,
      modality: MODALITY,
      language_domains: LANGUAGE_DOMAINS,
    },
  },
};

const has = (o, v) => Object.prototype.hasOwnProperty.call(o, v);
const isObligesLevel = v => Number.isInteger(v) && v >= 0 && v <= 4;

module.exports = {
  INSTRUMENT_TYPES, OBLIGES_LEVELS, DUTY_TYPES, REDRESS_TYPES,
  TEST_TYPES, BILINGUAL_FIT, MODALITY, LANGUAGE_DOMAINS,
  DESIGNATION_FORMS, NEWCOMER_TRIGGERS, DECIDED_BY, RULE_LOCUS, EXIT_MECHANISM,
  THRESHOLD_BASIS, BILINGUAL_HANDLING, DECIDER_TYPES, EXCLUSIONS, DISCHARGE_BASIS,
  SCHEMES,
  isThresholdBasis: v => has(THRESHOLD_BASIS, v),
  isBilingualHandling: v => has(BILINGUAL_HANDLING, v),
  isDecider: v => has(DECIDER_TYPES, v),
  isExclusion: v => has(EXCLUSIONS, v),
  isDischargeBasis: v => has(DISCHARGE_BASIS, v),
  isDesignationForm: v => has(DESIGNATION_FORMS, v),
  isNewcomerTrigger: v => has(NEWCOMER_TRIGGERS, v),
  isDecidedBy: v => has(DECIDED_BY, v),
  isRuleLocus: v => has(RULE_LOCUS, v),
  isExitMechanism: v => has(EXIT_MECHANISM, v),
  isInstrumentType: v => has(INSTRUMENT_TYPES, v),
  isDutyType: v => has(DUTY_TYPES, v),
  isRedressType: v => has(REDRESS_TYPES, v),
  isTestType: v => has(TEST_TYPES, v),
  isBilingualFit: v => has(BILINGUAL_FIT, v),
  isModality: v => has(MODALITY, v),
  isLanguageDomain: v => has(LANGUAGE_DOMAINS, v),
  isObligesLevel,
};
