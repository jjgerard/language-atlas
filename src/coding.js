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
  'nobody, the period expires': 'No decision is taken about ending it: a fixed period runs out. All twelve fixed-period systems in the first coding pass had no value for this, and `automatic` is not it -- that means a decision made without an application, which is not the same as no decision',
  'not stated': 'The entry does not establish who decides',
};

// WHERE THE BINDING RULE LIVES. This is the axis that a six-country European
// study cannot see and a global one can, and it is the one that decides whether
// "no national rule" means "no rule".
const RULE_LOCUS = {
  'national statute': 'Binding rule set nationally (Austria SchUG s.4, Poland MEN regulation, Spain LOMLOE arts. 78-79)',
  'national framework, sub-national rules': 'A national frame that coordinates without binding, with the operative rules made below it (Germany: KMK framework, the 16 Laender set terminology, thresholds and duration; Switzerland: EDK/CDIP with 26 cantons; United States: federal identification duty, states set the instrument)',
  'national rule, local application': 'A binding national rule, carried out by a body below the national level. Distinct from the framework case above, where the national frame coordinates WITHOUT binding (Denmark, Greenland, Norway and Tuerkiye were all flattened into `national statute` before this value existed)',
  // The axis was never purely about LEVEL: `national statute` says "binding"
  // as well as "national", and eight entries fell through the gap that leaves.
  // Their only instrument is a donor-facing sector plan, and Mali says outright
  // what the others imply -- PRODEC 2 "treats screening as a technique still to
  // be developed, NOT A RULE IN FORCE". Coding those `national statute` would
  // have asserted a binding rule none of them has, and `not stated` would have
  // denied that the entry says where the rule lives, which it does. Both wrong
  // in opposite directions, so the first coding pass left the cell unset and
  // the count of unset cells is what argued this value into existence.
  //
  // This matters beyond tidiness: all eight are African or Pacific systems, and
  // flattening them into `national statute` would have inflated that value --
  // already 74% on dld.identificationCriteria -- with exactly the systems whose
  // rules bind least.
  'national, non-binding': 'A national instrument that states the rule without binding anyone — a sector plan, strategy or policy (Mali PRODEC 2, "a technique still to be developed, not a rule in force"; Burkina Faso PSEF 2017-2030; Djibouti Sector Plan 2010-2019; Gambia 2016-30 education sector policy; Madagascar 2018-2022; Benin, Togo, Papua New Guinea)',
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
// remaining German gaps". Systems choose a fixed period or a test, and say so.
// exit_mechanism IS A LIST. Eleven of the first 59 entries coded stated two or more
// simultaneously operative rules, and coding one value threw the others away:
// Chile runs an annual re-evaluation AND stops at 5;11, the United States a
// triennial cycle AND a team decision AND an age limit, Ireland a two-year
// school cap AND service-by-service discharge. Order them as the entry does.
const EXIT_MECHANISM = {
  // Called `clock` until 2026-09-21, and renamed because it was the only value
  // in the column naming a DEVICE where its neighbours name what the rule turns
  // on. 30 entries carried it and were migrated with the rename. A coding JSON
  // written before that date still says clock and will be refused.
  'fixed period': 'Expires whether or not the pupil is proficient (Austria 12 months extendable by 12, Czechia 24, Netherlands 2 years, Sweden 4, New Zealand 5 and 3, Greece ZEP II 2-3 years)',
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
// `culturally excluded` was one value doing two opposite jobs, and splitting it
// needed more than the five entries on identificationCriteria that carried it.
// Reading all 115 multilingualProvision entries supplied the rest, and the two
// halves are not degrees of one thing: one screens a bilingual child AWAY from
// services, the other exists to stop them being mislabelled as disordered. The
// word that separates them is SOLELY.
//
// `case by case` is the third shape and it belongs to neither: somebody decides,
// per child, whether another language explains the difficulty. That is not a
// rule about bilingualism, it is the absence of one, delegated.
//
// Shared by dld.identificationCriteria and dld.multilingualProvision, so the
// two can be read together -- which matters, because a system often states the
// exclusion in one and the assessment rule in the other.
const BILINGUAL_HANDLING = {
  'required across languages': 'The criterion demands difficulty in ALL of the child\'s languages, which is what distinguishes disorder from second-language learning (Sweden: "difficulties must show in all the child\'s languages", and the logoped decides disorder or insufficient exposure)',
  'excluded on language grounds': 'A child is ruled OUT where the difficulty can be attributed to linguistic or cultural background, so the bilingual child is screened away from services rather than assessed properly (United Arab Emirates: "not being a native Arabic speaker is an exclusion from the disability term"; Aruba: no cover for a taalontwikkelingsstoornis "tied to dialect or anderstaligheid"; Greece; Chile; Taiwan, whose learning-disability rules exclude difficulty caused by language or thin cultural input)',
  'not solely because of language': 'Language background alone may NOT be treated as the disorder, which protects the bilingual child instead of screening them out and leaves a genuine disorder assessable. The load-bearing word is "solely" (Jersey: "difficulties related solely to limitations in English as an additional language are not SEN", with a duty to establish which it is; Antigua and Barbuda; Gibraltar; the United States, where limited English "may not be the determinant")',
  'case by case': 'Somebody judges per child whether another language explains the difficulty, with no rule either way (Armenia: "the school itself judges if another language explains it", working from a methodological guide)',
  silent: 'The text says nothing about the child\'s other languages either way',
};

// Whether a child can be assessed in a language they actually speak -- the
// first of multilingualProvision\'s four questions, and the one this atlas
// exists around. Ordered by nothing: these are kinds, not degrees.
const ASSESSMENT_LANGUAGE = {
  'required': 'An instrument requires assessment in the child\'s own language (United States, IDEA: "evaluate in the child\'s native language" -- the entry calls it "the strongest statutory language in this catalog, and the widest gap to delivery"; Micronesia; Northern Mariana Islands "unless clearly not feasible"; Chile art. 16, where the diagnosing professional must communicate in the language of that community AND know its culture; Ukraine)',
  'protocol or adapted instrument': 'A worked protocol or an instrument built for the population exists (Netherlands: Siméa\'s "Handreiking meertaligheid en TOS", requiring examination data in both languages, an interpreter where needed, a diagnostic decision tree; Luxembourg, whose new batteries adapt their instruction language to each pupil\'s profile and separate language-profile difficulty from specific disorder; Egypt, testing in colloquial rather than Modern Standard Arabic; Taiwan, adjusting content or scoring where no tool fits)',
  'interpreter': 'Bridged by an interpreter or ad hoc translation rather than by a clinician who shares the language (Burkina Faso: "therapist and patient often share no language, so an interpreter is sought"; South Africa, where a shortage of therapists fluent in African languages leaves "ad hoc translation used as a stopgap")',
  'majority language only': 'Assessment runs in the school or official language and the entry establishes no alternative (Morocco: "no adapted standardized assessments exist in Moroccan Arabic or Amazigh"; Singapore, where practitioners "used standardised tests not designed for the population"; Suriname)',
  'not stated': 'The entry does not establish whether a child can be assessed in a language they speak',
};

// Whether normed tools exist for these children -- multilingualProvision\'s
// fourth question. `none` and `not stated` stay apart for the reason they do
// everywhere else here: Morocco and Singapore both went looking.
const LOCAL_NORMS = {
  'exist': 'Normed or purpose-built tools for this population are named as existing',
  'none': 'The entry establishes that no locally normed tool exists (Singapore: "no local norms exist and no data on local languages\' developmental trajectories", the authors urging alternative assessment over re-norming; Morocco; Benin, where "no locally normed tool is named" and African SLPs were adapting European tests)',
  'not stated': 'The entry does not reach the question',
};

// WHAT KIND OF EVIDENCE the entry rests on, and it is not optional here.
// Thirty of the 115 multilingualProvision entries are the COST IS1406
// practitioner survey, and every one of them opens with the same hedge --
// "Practitioner perceptions, not policy". Coding those beside a statute as
// though both described a rule is the single largest error this field offers,
// and the hedge exists because a drafter saw it coming.
const EVIDENCE_TYPE = {
  'policy': 'A statute, regulation, or official guidance',
  'practitioner survey': 'What practitioners report doing, not what any rule requires (the COST IS1406 2017 survey, carried on 30 entries with its own n each; Singapore\'s 2018 survey of 26 practitioners)',
  'study or project': 'A research paper, interview set or single project (Laos, where the evidence is "one cleft-palate project, not a national rule"; Morocco\'s twelve interviewees)',
  'not stated': 'The entry does not make clear what kind of source this is',
};

// ===========================================================================
// dld.serviceModel
// ===========================================================================
//
// Derived 2026-09-21 by reading 65 entries sampled across all five regions,
// not by proposing a shape and checking it fitted. What VARIES turned out to
// be four things, and only the first was expected.
//
// The field is a description of a service, so the temptation is to code what
// the service IS. That is not comparable -- "resource centres", "logopedic
// points", "Centros de Atencion Multiple" and "the Frank Hilton Organisation"
// are four names for four countries. What compares is who pays, who does the
// work, where the child is when it happens, and what kind of source says so.

// WHICH SECTOR CARRIES IT. The axis that separates systems most sharply, and
// the reason this field is worth coding: the same nominal entitlement lands
// completely differently depending on who employs the therapist.
//
// A LIST, because the corpus keeps naming more than one and coding a single
// "main" sector would throw away the interesting cases. Nepal is health AND
// private ("98% of the rehabilitation workforce is private"); Cambodia is
// "NGO- and private-led"; Australia is "fragmented across three systems that
// do not align". Sixteen of the 65 read named two or more.
const SERVICE_SECTOR = {
  'education service': 'The education system employs or sites the service (New Zealand: "Education-led: SLTs are employed by the Ministry of Education"; Kazakhstan\'s statutory logopedic points attached to schools; Romania, public education 81%)',
  'health service': 'The health system does (Brunei, whose Child Development Centre is the paediatric hub; India\'s District Early Intervention Centre at the district hospital; China, where "the profession sits in rehabilitation medicine, not in education"; Czechia, public health 77%)',
  'private practice': 'Paid-for private provision is what the entry describes (France, private practice 84%; Senegal, where "all orthophonistes work in the private sector, and all are based in Dakar"; Burkina Faso: "All work in private structures")',
  'ngo or charity': 'Non-state organisations carry it (Cambodia, "NGO- and private-led"; Madagascar, where "most specialised centres are run by NGOs or faith-based organisations"; Fiji\'s Frank Hilton Organisation; Vanuatu Society for People with Disability)',
  'none established': 'Checked, and no sector provides it (Cameroon: "No logopedie or orthophonie service exists in the public sector"; Eritrea: "No speech or language therapy of any kind"; Nauru, where "speech" returns 0 hits in the Act, the policy and the review)',
  'not stated': 'The entry describes provision without establishing who carries it',
};

// WHO ACTUALLY DOES THE WORK. Independent of the sector, and the corpus states
// it often enough to be worth its own column because the answer is frequently
// "not a clinician". Mozambique says it outright.
const SERVICE_PRACTITIONER = {
  'specialist clinician': 'A speech and language therapist, orthophoniste or logopedist is named as the person delivering it (Nepal, "delivered by speech and language therapists within a multi-disciplinary rehabilitation team"; Jordan, one speech therapist per school support unit)',
  'teacher or generalist': 'Teachers or special-education staff deliver it and no clinician is named (Mozambique: "Service is teacher-mediated, not clinician-mediated, in PEER\'s account"; Guinea-Bissau, "delivered by early childhood educators and teachers who completed special courses")',
  'clinician advises, teacher delivers': 'A consultative model: the specialist advises and the class teacher carries it out (Belize, where "the model is consultative teacher support rather than direct therapy" and "the officer advises the class teacher"; Liechtenstein, "specialists cooperating with in-school teachers"; Montenegro\'s resource centres, which do "advisory work, teacher training and materials")',
  'nobody named': 'The entry establishes that no practitioner exists to deliver it (Marshall Islands and Palau, each reporting "zero speech-language pathologists" to IDEA Part B; Tonga, where the Pacific review "lists speech pathologists as a needed specialist, not a present one")',
  'not stated': 'The entry does not establish who delivers it',
};

// WHERE THE CHILD IS. Kept separate from sector because they cross: a service
// can be education-run and still deliver in a segregated school.
//
// Comes out `not stated` on roughly two thirds, which is a fact about the
// corpus worth having rather than a fault in the column -- most entries name a
// provider without saying where the child sits while receiving it.
const SERVICE_PLACEMENT = {
  'mainstream first': 'The ordinary class is the default and a special setting needs justifying (Montenegro: "Mainstream inclusion is stated as the first option and an imperative"; Guam, "Special classes only where regular class with supplementary aids cannot work"; New Caledonia, "Ordinary class first"; Palau, whose statute "puts services in regular classrooms and regular schools")',
  'withdrawal from class': 'The child leaves the ordinary class for sessions (Marshall Islands: "part-time direct instruction in the regular class, or a pull-out programme"; Singapore\'s programme sending a professional into the preschool "for 2 to 4 hours weekly")',
  'both routes named': 'Mainstream and special settings are both named as available (Guyana: "Dual track: integration into regular schools plus state and private special schools"; Guinea-Bissau, "special education in regular or specific establishments"; Mexico, where the Centros de Atencion Multiple option does "not cancel" the mainstream one)',
  'special setting': 'A special school, centre or class is what the entry names (Eritrea\'s three special schools; Angola\'s "22 provincial special schools across 15 provinces"; the Dominican Republic\'s 36 special education centres; Suriname, where 18 of the special schools are in Paramaribo and five districts have none)',
  'not stated': 'The entry does not establish where the child is taught',
};

// ===========================================================================
// dld.funding
// ===========================================================================
//
// Derived 2026-09-21 from 40 entries sampled across all five regions. Three of
// the four columns ask the same question at different depths -- who pays, does
// the family pay, and is the source even talking about language -- and the
// third turned out to be the one worth having.

// WHO PAYS. A LIST, and it has to be: the COST IS1406 survey asks practitioners
// to name every funder for one case, and they routinely name three. France is
// state health 90%, private health insurance 20% AND family 8%; Norway names
// four. Coding a single "main" funder would throw away exactly the mixed
// arrangements that make one system different from another.
const FUNDERS = {
  'state education budget': 'The education budget carries it (Hungary, state education 90%; Norway 82%; the Philippines, where a Program Support Budget is a line item in the DepEd General Appropriations)',
  'state health or insurance': 'Health, or a statutory health insurer, carries it (France, state health 90%; Israel, where the HMOs deliver therapy under national health insurance; New Caledonia, where CAFAT reimburses orthophonie acts at 50%)',
  'state social services': 'A social-services budget rather than health or education (Denmark 21%, Norway 8%; Kuwait, where PADA social assistance is paid by salary transfer and set by degree of disability)',
  'the family': 'Households pay some or all of it (France 8%, Hungary 14%; Central African Republic, where PEER records that "all school expenses fall to parents")',
  'private insurance': 'A private or supplemental insurer (France, private health insurance 20%; Israel, where supplemental HMO cover reimburses some assessments and so creates a different effective entitlement)',
  'donor or ngo': 'External donors, international agencies or non-state organisations (Rwanda, where "inclusive education support is dominated by international agencies including UNICEF"; Central African Republic, whose few special schools "rely on financial support from donors")',
  'none established': 'Checked, and no funding route for this exists (Dominican Republic: "No dedicated funding line for language support was located")',
  'not stated': 'The entry describes provision without establishing who pays for it',
};

// WHAT IT COSTS THE FAMILY. Kept separate from the funder list because it is
// the question the atlas is actually about -- whether a poor child can get it --
// and because a system can be state-funded and still charge.
const FAMILY_PAYS = {
  'free at the point of use': 'Nothing is charged (United Arab Emirates, where the ministry "provides all supporting services free in government schools"; Nicaragua, whose Ley 582 art. 90 "bans fees, voluntary quotas or any other payment" in state primary and secondary; Liechtenstein, where special schooling "is free of charge, and so are the measures added to it")',
  'co-payment or reimbursement': 'The family pays a share, or pays first and is reimbursed (New Caledonia, reimbursed at 50% with the insured advancing the fees; French Polynesia at 70%; Antigua and Barbuda, where IEP costs are "apportioned between" the parent and the Ministry)',
  'means-tested': 'What the family pays turns on what it has (Singapore, "means-tested with income-banded subsidies and caps"; the United Arab Emirates, tuition assistance up to AED 50,000 a year for low-income parents; Paraguay, where admission to free institutions "must be eased for people of limited means")',
  'family bears the cost': 'The household carries it with no state share established (Central African Republic, which PEER links to significant non-enrolment)',
  'not stated': 'The entry does not establish what the family pays',
};

// IS THE SOURCE EVEN ABOUT LANGUAGE. Not a shape anyone set out to code, and
// the most useful column here.
//
// 45 of the 196 national funding entries -- 23% -- carry the same hedge in the
// same words: "Source describes special-needs provision generally, never
// language disorder". The writers put it there deliberately and CLAUDE.md says
// to keep hedges; coding it makes the hedge countable, so a reader can see how
// much of the funding picture is about disability in general and how much is
// about this.
//
// For scale, the same hedge appears on 1 of 208 serviceModel entries. It is a
// fact about the funding literature, not about the atlas.
const FUNDING_SCOPE = {
  'language specific': 'The source reaches speech or language provision (Mauritius, where the Grant-in-Aid to non-governmental SEN schools "covers speech therapists"; France and Hungary, where practitioners are reporting on a language case)',
  'disability generally': 'The source describes disability or special-needs funding and never reaches language disorder. The entry usually says so outright (Rwanda, Algeria, Gambia, Liberia, South Sudan, Central African Republic, Mongolia, Marshall Islands, Tonga)',
  'education generally': 'The rule is about school funding at large, with disability not the unit either (Nicaragua, whose article bans fees in all state schooling; Brazil, where LDB art. 69 binds the Union to 18% and states to 25% of tax revenue; Belarus, financing state institutions from republican and local budgets)',
  'not stated': 'The entry does not make the scope of its source clear',
};

// ===========================================================================
// eal.l1Support
// ===========================================================================
//
// Derived 2026-09-21 from 40 entries sampled across all five regions.
//
// The field asks what a newcomer gets in their OWN language. Reading it, the
// striking thing is how often the answer describes somebody else: the
// provision named is for a national or indigenous minority, or for the whole
// cohort, and several entries say so in terms. Greece: Thrace minority
// schooling is "treaty-based, for the recognised Muslim minority -- distinct
// from newcomer provision". Lebanon: "Mother tongue here means dialectal
// Arabic, not a migrant language". Palau: "the stated rationale is
// preservation of Palauan, not access to the curriculum". So `for_whom` is a
// column, and it is the one that makes the rest of the field readable.

// WHAT FORM IT TAKES. A timetabled subject, the medium of teaching, and a
// bridge to the school language are three different policies, and the corpus
// separates them cleanly.
const L1_FORM = {
  'taught as a subject': 'The language is on the timetable as a subject (Chile, Asignatura Lengua Indigena, four hours a week; Denmark, modersmalsundervisning under decree 689 of 2014; Israel, where mother tongue is one of eight core subjects in Arab primary education; Haiti, where Creole has seven weekly periods in AF1)',
  'medium of instruction': 'Teaching is carried in the language (Malaysia, whose national-type primary schools use Chinese or Tamil as the main medium; Kyrgyzstan, with Russian, Uzbek and Tajik medium schools; Mauritania, art. 65, each child learning primary science in their own mother tongue)',
  'transitional bridge': 'Used only until the school language is reached, and the entry says so (Norway: given "only if necessary to acquire the language of instruction" and read in practice "as a bridge to Norwegian"; Vanuatu, vernacular for the first two years with French or English from Year 3; American Samoa, Samoan "when necessary to facilitate teaching English")',
  'incidental use': 'The language appears in communication around school rather than in teaching (Guam, where schools "translated parent notices into Chuukese" and ran ESL family workshops)',
  'none established': 'Checked, and there is no provision in a home language (Bahrain: "No home-language provision is recorded in any cited source"; Italy: "No mandated mother-tongue instruction programme found"; New Zealand: "No unified national policy")',
  'not stated': 'The entry does not establish what form any provision takes',
};

// WHO IT IS FOR. The column this field needed, and the reason a distribution
// of `form` alone would mislead: a reader asking what a newly arrived child
// gets would be shown provision built for somebody else.
const L1_FOR_WHOM = {
  'newly arrived pupils': 'Arrivals are the named population (Denmark, "for children of EU/EEA nationals", extended to Iceland, Liechtenstein and Norway; Greenland, for "pupils with neither Greenlandic nor Danish"; Mexico, whose arts. 56-58 name MIGRANTS and agricultural day-labourers beside indigenous peoples)',
  'national or indigenous minority': 'A settled minority is, and the provision is not about arrival (Greece, Thrace, "treaty-based, for the recognised Muslim minority -- distinct from newcomer provision"; Lebanon, where "mother tongue here means dialectal Arabic, not a migrant language"; Brazil, where the guarantee runs to indigenous communities; Chile, Israel, Angola, Algeria)',
  'whole cohort': 'Every pupil gets it, so it is not support for anyone in particular (Marshall Islands, where Marshallese is compulsory at every level and "framed as culture and heritage, not as support for reaching the curriculum"; Palau, written Palauan a mandatory core subject grades 1 to 12; Tonga)',
  'not stated': 'The entry does not establish who the provision is for',
};

// WHAT SECURES IT. Same question MEDIUM_SECURED_BY asks of the indigenous map,
// asked here of a newcomer, and the answers differ: permission is much the
// commoner form.
const L1_SECURED_BY = {
  'entitlement': 'A pupil can call for it (Norway, "entitled to mother-tongue instruction and/or bilingual subject teaching", Education Act s 2-8; Denmark, where municipalities MUST offer it)',
  'compulsory': 'It is required, of the school or of the pupil (Marshall Islands, compulsory at every school level; Palau, binding on "every school chartered in the Republic or funded from public funds")',
  'on request or threshold': 'It turns on somebody asking, or on enough of them (Belarus, where minority-language groups "may be created on request" with a local executive decision; Chile, compulsory only "where indigenous enrolment exceeds 20%"; Puerto Rico, whose 30% threshold for significant presence nothing reaches)',
  'permission': 'May, not must, with nobody obliged to offer it (Greenland, where mother-tongue teaching MAY be arranged and must sit outside normal teaching time; Russia, where the right is "bounded by the possibilities the education system provides"; Vanuatu; American Samoa)',
  'not stated': 'The entry does not establish what secures the arrangement it describes',
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
  // The same repair DECIDED_BY's `regional government` records — "DUTY_TYPES
  // had this and this axis did not, which flattened every federal system".
  // Here it is a ministry: DECIDED_BY has `national authority` and this list
  // did not, so six systems where a named ministry does the identifying had no
  // value at all. `school or authority` is the education authority supervising
  // a school, which is not what a Ministry of Social Affairs issuing disability
  // cards is doing, and coding them there would have merged a health or welfare
  // ministry with a school inspectorate.
  //
  // Six, not seven. Senegal's "departmental technical commissions" are a
  // commission rather than a ministry and state no composition, which would
  // want a `statutory body` value — but that value would overlap
  // `medical commission`, `multidisciplinary team` and this one at once, and
  // one entry is not an argument for a value that ambiguous. Senegal stays
  // unset, and stays evidence.
  'national authority': 'A named ministry or national agency does the identifying (Cameroon: the Ministry of Social Affairs assesses via regional offices and issues the disability cards; Oman: assessment vested in the Ministry of Health, with functional assessment by Ministry of Social Development social workers; Iran\'s Welfare Department; Malawi\'s Directorate of Special Needs Education; Equatorial Guinea; Lebanon)',
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
// ===========================================================================
// <domain>.policyHistory
// ===========================================================================
//
// WHICH FIELD A DATED ROW CHANGED. Derived in research/POLICY-HISTORY-VOCAB.md
// by reading 105 rows sampled across every domain x region bucket and then
// profiling all 4,305, and the reading killed two other axes on the way:
//
//   `change_type` (enact / amend / repeal / ...) was derivable -- ten values,
//   top value 48% -- but that 48% is `provision described`: the row dates an
//   instrument and says what it PROVIDES, recording no operation at all.
//   "Law on Education Art. 7.1 makes Azerbaijani the official medium" is a
//   provision, not a change. A column that is half "no change recorded"
//   describes how the timeline was drafted, not what systems did.
//
//   `direction` (widened / narrowed) died outright: 94% of rows state neither.
//   Unlike bilingual_handling's 93% silence, which is a fact about policy,
//   this is a fact about drafting and not worth a column to say. The rows that
//   DO record a delta -- Queensland 2022, "Speech-Language Impairment ceases
//   as a verified category" -- are worth finding by hand, not by schema.
//
// So one column survives, and it is the one that was asked for: which of the
// entry's own fields the dated row touched.
//
// IT IS A LIST. A framework act routinely creates an entitlement AND names who
// identifies; coding one value would throw the other away, for the same reason
// `exclusions`, `triggers` and `exit_mechanism` are lists.
//
// THE VOCABULARY IS BUILT FROM src/domains.js, not written out here. A domain
// declares its fields and that list already drives the coverage count, the
// hover checklist, the entry panel, the submission form and the sanitiser;
// making it drive this too keeps the promise CLAUDE.md makes, that adding a
// domain is a domains.js edit and nothing else.
const { DOMAINS } = require("./domains.js");

// Two values that are not fields, and the distinction between them is the same
// one `none established` and `not stated` carry everywhere else in this file.
const HISTORY_NON_FIELD = {
  'system-wide': 'The row changed the system rather than any field of this entry: a constitution, a framework act, a ministry restructure. Checked, and no field is the right answer (Bahrain 2020, "Restructuring of the Ministry of Education", which sits on three maps at once; Bahamas, "Constitution; does not enshrine the right to education")',
  'not determined': 'Nobody has established which field this row touched. 58% of rows carry no signal that a matcher can read, and this value keeps that gap visible instead of letting it look like `system-wide`',
};

// WHAT HAPPENED in the year the row carries, as against WHICH FIELD it touched.
// Derived in research/POLICY-HISTORY-VOCAB.md by reading 105 rows and then
// profiling all 4,305; every gloss names entries a reader can go and check.
//
// THE 48% IS THE FINDING, and it is why this column sat unwired. Nearly half
// the corpus takes `provision described`, because the policy history was
// written as a timeline of what instruments SAY rather than of what CHANGED.
// That is a fact about the field, not a defect in the list, and a reader of the
// timeline needs telling it. Per domain the top value runs 41% to 52%, so the
// shape belongs to the corpus rather than to one map.
//
// MUTUALLY EXCLUSIVE, so a coder takes the first that applies. The order below
// IS the precedence, and it is NOT the frequency order the derivation printed:
// that file says a row which repeals one act and makes another is a
// replacement, so `instrument replaced` has to beat `instrument made`, and the
// same logic puts every change-to-an-existing-thing above the making of a new
// one.
const HISTORY_OPERATION = {
  'instrument replaced': 'One instrument supersedes or repeals another. Kept SEPARATE from amendment because the corpus keeps them separate and a reader needs to see a break rather than a revision (Benin: "Loi 2003-17 repeals the 1975 ordonnance d\'orientation"; American Samoa: "ESSA replaced \'limited English proficient\' with \'English learner\' throughout the ESEA"; Brazil: "Lei 13.415 ... repeals Lei 11.161 outright")',
  'instrument amended': 'An existing instrument is changed in place (Cyprus: "Amending Law 131(I)/2025 rewrites section 15(4) to let special education continue yearly up to age 22"; Brazil: "Lei 14.191 adds LDB art 60-A, deaf bilingual education in Libras as first language")',
  'international instrument accepted': 'Ratification, accession, or a Charter declaration (Fiji: "Ratified the Convention on the Rights of Persons with Disabilities"; Switzerland: "European Charter enters into force for Switzerland on 1 April 1998; Italian and Romansh are covered by Part III")',
  'instrument made': 'A new instrument is enacted, adopted or comes into force (China: "Education Law of the PRC enacted, in force 1995-09-01"; Belize: "Education Act 2008 published in the Official Gazette")',
  'body or programme changed': 'Renamed, merged, restructured or closed (Dominican Republic: "Resolution No. 05 of 2018 renames the National Council on Disability\'s Education Division"; Nunavut: "Inuit Language Protection Act renamed the Inuktut Protection Act"; Bahrain 2020: "Restructuring of the Ministry of Education")',
  'body or programme established': 'An institution, unit, commission, course or department comes into being (Burundi: "Statutory Order 610/902 creating an inclusive education unit inside the Ministry of Education"; Estonia: "Voru Institute established as a state research and development institution"; Palau: "Chinese introduced as an elective for grades 11 and 12")',
  'funding decided': 'A sum or a funding agreement is settled. Twenty rows in 4,305, and the count is the point (Canada: "Canada and Ontario signed a $126 million, eight-year funding agreement on 22 January 2020"). Kept because the shape is real and the scarcity is informative, on the same grounds EXIT_MECHANISM keeps age ceiling',
  'plan or strategy issued': 'A non-binding plan, strategy or recommendation. The verbs that mark it are PROPOSES, AIMS, INTENDS, TARGETS (Nauru: "Education and training strategic plan 2008-13 proposes a Nauruan language policy"; Germany: KMK recommendation "Interkulturelle Bildung und Erziehung in der Schule")',
  'state of affairs recorded': 'A dated observation that nothing exists. Distinguished from provision described for the same reason this project distinguishes none established from not stated (Bahamas: "Constitution; does not enshrine the right to education and omits disability from its equality provision"; Tasmania: "The 2017 national review found no specific policy for languages education in Tasmania")',
  'provision described': 'The row dates an instrument and states what it PROVIDES, recording no operation on it. The residual, and 48% of the corpus (Antigua and Barbuda: "Education Act 2008 (No. 21 of 2008); s.83 makes communicative exceptionalities the route to special education"; Azerbaijan: "Law on Education Art. 7.1 makes Azerbaijani the official medium")',
};

// ===========================================================================
// VALUES THAT CANNOT SHARE A CELL
// ===========================================================================
//
// A list column holds several values because a system really does run several
// rules at once. These seven are the ones that say there is NO rule -- either
// that the entry does not answer, or that somebody checked and the system has
// nothing -- and neither claim can be true alongside a value read from the same
// text. Coding both is not a system doing two things; it is two readings of one
// text, and it silently inflates the count of whichever absence is named.
//
// Derived from the corpus, not assumed: across every list column in every
// domain exactly ONE cell had done it -- Queensland's exit_mechanism as
// ["test", "not stated"] -- and reading the entry showed what the coder meant.
// Queensland publishes a Bandscale level for the international-student stream
// and "no published exit criterion for domestic EAL/D pupils". That is two
// POPULATIONS under different rules, which the row grain cannot hold: the row
// is one system. `not stated` was the nearest thing to hand and it is false,
// because the entry reaches the question and answers it.
//
// The test is the gloss, not the name. `not solely because of language` begins
// with "not" and is a substantive protection that can sit beside anything;
// `none` on secured_by reads "established that nothing secures it", which
// cannot.
const EXCLUSIVE_VALUES = new Set([
  'not stated',        // the entry does not reach the question
  'not determined',    // nobody has established which field a row touched
  'none established',  // checked, and no rule of any kind exists
  'none stated',       // the entry establishes the rule and names nothing here
  'none',              // established that nothing secures it
  'not taught',        // somebody checked and it is not taught
  'not a medium',      // somebody checked and it carries no teaching
]);

/** True where `value` asserts there is nothing on this axis, so it cannot
 *  share a list cell with any other value. */
const isExclusiveValue = v => EXCLUSIVE_VALUES.has(String(v));

/** The reason a list cell is incoherent, or null where it is fine. Takes the
 *  whole cell, because the fault is the COMBINATION rather than any one value. */
function mixedAbsence(values) {
  const arr = [].concat(values == null ? [] : values);
  if (arr.length < 2) return null;
  const neg = arr.filter(isExclusiveValue);
  if (!neg.length) return null;
  return '"' + neg[0] + '" says there is nothing on this axis, so it cannot '
    + 'sit beside ' + arr.filter(x => !isExclusiveValue(x)).map(x => '"' + x + '"').join(', ')
    + (neg.length > 1 ? ' or "' + neg[1] + '"' : '');
}

/** The fields a policyHistory row on this domain could have touched. */
const fieldsTouchedFor = id => {
  const list = Array.isArray(DOMAINS) ? DOMAINS : Object.values(DOMAINS);
  const d = list.find(x => x.id === id);
  const out = {};
  for (const f of ((d && d.fields) || [])) {
    const key = Array.isArray(f) ? f[0] : f.key;
    const label = Array.isArray(f) ? f[1] : f.label;
    if (key === 'policyHistory') continue;
    out[key] = label + ' on this entry';
  }
  return Object.assign(out, HISTORY_NON_FIELD);
};

// One scheme per domain, because the field list differs per domain -- which is
// the whole reason this could not be a single shared vocabulary.
// WHY A ROW CARRIES NO `operation`, which is not the same as nobody having
// coded it. Coding `operation` across all five domains left 78 rows of 4,305
// with no honest value, and reading them showed they are not one problem but
// three -- and that 74 of the three are the same thing.
//
// THIS IS THE `none` / `not stated` SEPARATION AGAIN, one level up. An empty
// `operation` cell currently cannot say whether the row has no operation to
// record or whether nobody has read it yet, and 74 rows is too many to leave
// indistinguishable from future work.
//
// IT IS A SEPARATE COLUMN ON PURPOSE. `operation` could have taken an
// eleventh value instead, and two of its ten (`provision described`, `state of
// affairs recorded`) already describe rows where nothing happened, so it would
// have fitted the column's real shape. It is kept out because `operation` gets
// compared across regions: putting 40 United States source notes into fl's
// Americas denominator would change what a share of that column MEANS. The
// reason lives beside the column rather than inside it.
const NOT_AN_OPERATION = {
  'source note': 'The row\'s SUBJECT is the evidence rather than anything that happened. 74 of the 78, and they cluster: 24 fl rows reading "Peer-reviewed 50-state statute inventory, policy as at December 2024", 20 indigenous rows reading "Evidence is the 2024 Seal of Biliteracy report and a 50-state statute inventory", 16 more reading "Inventory covers statute as at December 2024, not what districts actually offer", 9 eal rows reading "ECS reading of regulation as at May 2020, not a state publication". The singletons say the same thing in their own words (Connecticut: "What follows is 2008 state guidance, not binding regulation"; Mongolia: "The evidence here is a 2019 ministry project report, not standing policy"; Solomon Islands: "The Education Act 2023 sealed copy is an image-only scan with no text layer"; Australian Capital Territory: "The source is the 2009 curriculum requirements policy; no newer version was retrievable"; Afghanistan: "Both sources describe the pre-August 2021 framework; the position since was not established"). NOT a row that merely carries a caveat -- eight rows do that and are coded normally, because their subject is still an event (Cuba: "A Ley de Educación was listed on the legislative timetable for 2023 per the 2020 UNESCO PEER profile; enactment NOT verified"; Punjab: "Punjab Act 25 of 2008, exists; text not found"; Vanuatu: "…launched…; the policy text itself could not be retrieved"). The line is whether the evidence is the SUBJECT or an aside',
  'text incomplete': 'The sentence is truncated and what it was going to say cannot be recovered. Three rows, and they are one row copied onto three maps: Sweden 2015 appears in eal, indigenous and fl as "For primary school there is a slight increase, which may be due to the amendment of the Education Act introduced…", a statistic hedged to a maybe and cut off mid-clause',
  'subject is another row': 'The sentence\'s subject belongs to a different row of the same entry, so the year it sits on is not the year of what it describes. One row: Andorra 2008, "It replaces the model in force since 2008", where "It" is the 2026 regulation two rows down. Kept separate from `text incomplete` because the sentence is whole and the fault is in which row it was filed against',
};
// WHAT A ROW DID TO THE REACH OF A RULE, which is a different question from
// `operation` and NOT a missing value on it. The gap was recorded during the
// operation pass as "a change of SCOPE with no instrument named has nowhere to
// go", on thirteen eal rows that took `provision described`. Reading the whole
// corpus for it says the framing was wrong in two ways.
//
// FIRST, SCOPE CHANGE IS AN EFFECT, NOT AN OPERATION. Of the 107 candidates,
// most already carry a correct `operation` and a scope effect at the same time:
// Brazil 2021 is `instrument amended` AND extends the model to deaf pupils;
// Guam 1974 is `instrument amended` AND widens the Chamorro provision
// island-wide; Latvia 2018 is `instrument amended` AND reaches private
// institutions. An eleventh `operation` value would have captured only the rows
// that name no instrument and gone on losing the rest, which is the information
// loss the gap complained about, moved rather than fixed. Two things true of
// one row at once belong on two axes.
//
// SECOND, IT IS A FLAG AND NOT AN AXIS, and that is deliberate rather than a
// disappointment. 74 rows of 4,305 is 1.7%, and of the 2,349 rows that record a
// change at all it is 3%. A column asked of every row would be 98% empty, which
// fails this file's own "does it discriminate" test. It is kept on the same
// footing as NOT_AN_OPERATION (1.8%): a sparse mark on a real and countable
// phenomenon, never a column to take a distribution over. The rate was measured
// rather than assumed -- 26 rows sampled systematically across the corpus
// contained no scope change at all, so the markers are not what makes it small.
//
// A LIST, because Wales 2021 makes Welsh mandatory in EVERY school curriculum
// and so moves both at once. Most rows carry one value; coding one and dropping
// the other is what the list columns in this file all exist to prevent.
//
// WHERE THE EDGES ARE, since they took more reading than the values. A scope
// STATEMENT is not a scope change -- an instrument that says what it covers has
// not moved anything (Thailand 2012, "applies to all grades in schools
// generally"). A plan's PERIOD extended is not its coverage extended
// (Mozambique's 2012-16 plan "later extended to 2019"). Organisational growth is
// not a rule's reach over people (Ireland 2012, the primary B.Ed. "extended from
// three years to four"). An aspiration is not a change (Georgia 2017, "commits
// to expanding inclusive education"). Delhi 2016 records a narrowing ACROSS
// LEVELS in a single year, which is cross-sectional and not a change over time.
// And Namibia 2008 is the cleanest no of all: the attempt to extend to Grade 7
// FAILED, so nothing moved.
const SCOPE_CHANGE = {
  'coverage widened': 'More people, places, languages or levels fall inside the rule than did before. 53 rows, the bulk of the flag, and they widen along every one of those dimensions: PEOPLE (Slovakia 2025, "compulsory schooling extended to Ukrainian refugee children"; Brazil 2021, Art. 78-A "extends the same model to deaf and deafblind pupils"; Washington 2025, entitlement "to the end of the school year in which the student turns 22"), PLACES (Guam 1974, P.L. 12-132 "widened the Chamorro official-language provision island-wide"; Scotland 2010, duties extended "to Scotland as well as England and Wales"; Brunei 1992, "extended to private schools, international schools excepted"), LANGUAGES (Hungary 2008, "extends the protection of Part III of the Charter to Boyash and Romani"; Isle of Man 2020, Part III "extended to Manx Gaelic"; Cambodia 2019, "expanding from five to six languages by adding Charai") and LEVELS (Mozambique 2018, "extends compulsory education to grade 9"; Marshall Islands 2003, compulsory Marshallese "to tertiary institutions"; Sri Lanka 2003, "Second National Language extended to Grades 3, 4 and 5"). A THRESHOLD LOWERED belongs here too, because lowering it is HOW the widening was done: Finland 2010, "minimum number of pupils needed to organise Romani language education lowered from four to two"; Goa 2014, "minimum enrolment for a mother-tongue class relaxed from 20 to 15"',
  'coverage narrowed': 'Fewer fall inside the rule than did before. 10 rows, the mirror of the above rather than a separate shape: California 1998, "Proposition 227 restricted bilingual education, mandated English immersion"; the Philippines 2024, RA 12027 "discontinuing the mother tongue as medium of instruction... demoting the regional languages to auxiliary"; the Netherlands 1998, "OETC replaced by OALT (narrower scope)", where the entry says the narrowing outright; Uttar Pradesh 1952, a Notification that "restricts recognition to Hindi-medium institutions"; Argentina 1973, Ley 20.305, which "restricted sworn translation to university degree holders". A THRESHOLD RAISED is the same move from the other end: Denmark 2012, Act 379/2012 "restricts folkeskole special education to support of at least 9 lessons a week"',
  'obligation added': 'What was available becomes required. 10 rows, and the distinction from `coverage widened` is that nobody new is brought inside the rule -- the same people are now bound by it: Quebec 2006, "ESL becomes compulsory from Cycle 1 of primary"; Guyana 2023, "Spanish made compulsory from Christmas Term by chief education officer circular"; Jordan 2026, "English made a compulsory Tawjihi subject for all fields"; Czechia 2007, "the Framework Education Programme for Basic Education becomes binding"; Wales 2012, "first-language reporting becomes mandatory in the Pupil Level Annual School Census". Wales 2021 is the one row carrying two values, because making Welsh "a mandatory element of EVERY school curriculum in Wales" adds the obligation and widens the coverage in the same clause',
  'obligation removed': 'What was required becomes optional or advisory. Only 2 rows, kept apart from `coverage narrowed` for the same reason as above -- the rule still reaches the same people, it just stops binding them: Lithuania 2019, where the B1 "foreign language examination ceases to be a minimum admission requirement"; New Brunswick 2025, where "2025 policy moved the proficiency standard from Requirements to Guidelines". Two rows is thin, and the value is kept rather than folded into `coverage narrowed` because the corpus distinguishes them in its own words; if it is still two after the next pass that is worth saying, not worth merging',
};
// WHAT STANDING AN INDIGENOUS OR REGIONAL LANGUAGE HOLDS, and what that standing
// actually does. Derived by reading 100 of the 202 national entries across all
// five regions, and the field's own hint proposed four elements -- the standing
// given, the instrument, where it applies, what it obliges. Three of those
// survived the reading. The fourth did not, and one axis the hint never
// mentioned turned out to be what the entries keep coming back to.
//
// THE HINT'S "WHERE IT APPLIES" SPLIT IN TWO and only one half is this field's.
// `extent` below is territorial reach. Whether the standing reaches SCHOOL is a
// separate question, and it is NOT coded here even though the prose raises it
// constantly ("Constitutional, not curricular"; "administrative only, no school
// provision"; "Named as spoken languages, not as school subjects"). The
// indigenous map carries `mediumOfInstruction` and `taughtAsSubject` as fields
// of their own, and a column here would answer from their text rather than this
// one -- the one move the coding-pass rules forbid outright.
//
// EUROPE ANSWERS A DIFFERENT AND THINNER QUESTION, which any distribution over
// this field has to state rather than average away. Its 45 national entries run
// 142 characters against 218-238 everywhere else; 20% name an instrument against
// 40-64%; 31% mention school against 55-72%. 28 of them turn on the phrase
// "steering documents", which is a Eurydice-shaped record of whether a language
// is listed, not of what its status obliges. So `source`, `force` and `extent`
// read `not stated` across much of Europe. THE PASS HAS NOW MEASURED THIS, so
// the figures replace the prediction: `source` is named on 58% of Europe against
// 70-95% elsewhere, and `force` is stated on 64% against 85-96%. The prediction
// was wrong about `status`, which Europe answers BEST of the five regions -- 13%
// `not stated` against 36% in the Americas and 38% in Asia -- because the
// formula it was written to always answers exactly that question. Estonia's
// "Neither officially recognised nor named in steering documents" is a
// documented NONE rather than a silence, and 21 entries reach `none` that way.
//
// `extent` DOES NOT DISCRIMINATE AND IS KEPT AS A RECORD OF THAT. It came out
// 83% `not stated` -- 0% stated in Oceania, 13% in Europe, 23% at best in Asia
// -- so it is the column this file's own test warns about, describing the
// corpus's silence rather than the systems. It was the hint's "where it
// applies", and the answer is that the entries almost never say: reach is left
// to be inferred from the instrument's level, and inferring it is what the
// column exists NOT to do. Do not take a distribution over it, and do not read
// its 15% `named areas or communities` as a count of regional regimes -- it is a
// count of entries that happened to mention one.
//
// THE MULTI-LANGUAGE GRAIN IS THE KNOWN LIMIT. A row is one system, and a system
// may hold several languages at several standings -- Mauritania names Fula,
// Soninke and Wolof national while Arabic alone is official; Comoros is the
// mirror, with Shikomor official and French and Arabic national. `status` is
// coded for the INDIGENOUS OR REGIONAL languages the map is about, which is what
// makes those two code differently and correctly. Where an entry gives the
// status of the majority or colonial language only, and never says what the
// indigenous one holds, `status` is `not stated` -- Sint Maarten is the worked
// case, naming Dutch and English official and leaving Papiamento unsaid.
// WHAT THE FIRST PASS FOUND, AND IT IS NOT WHAT THE VALUES WERE BUILT TO SHOW.
// Coding all 202 national entries, `official` is NOT the strongest standing. It
// is the one most likely to do NOTHING: 19% of official languages take `none` or
// `declaratory only` on `force`, against 8% of `national, not official` and 8%
// of `recognised without official status`, while `national, not official` is
// MORE often enforceable (46% against 42%). Comoros, Haiti, Greenland, Guam and
// Guernsey are all official and all declaratory. The grandest status does the
// least work, which is worth knowing before anyone reads `official` as the top
// of a ladder. It is not a ladder, and nothing here is scored.
const STANDING_STATUS = {
  'official': 'Named an official language of the state or territory, on the same footing as any other (Comoros: "Shikomor is the official language under the 2001 Constitution"; Aruba: "Official language of Aruba alongside Dutch"; Northern Mariana Islands: "Official languages: Chamorro, Carolinian and English"; New Zealand, where te reo Maori and NZSL are "official languages by statute, not foreign languages"; Samoa, whose 2014 Act "declares Samoan an official language of Samoa")',
  'official in named areas only': 'Official where it is spoken and not beyond, so the status is real but bounded (Spain: "The other Spanish languages are ALSO OFFICIAL IN THEIR AUTONOMOUS COMMUNITIES", against Castilian as "the official Spanish language of the State"). Distinct from `official` because a speaker outside the named area holds nothing, and distinct from `extent` below, which records reach for a standing of any kind',
  'national, not official': 'Carries the label "national language" while another language is the official one -- the distinction the francophone and Maghreb constitutions draw, and it is a real demotion rather than a synonym (Mauritania: the Constitution "names Arabic, Fula, Soninke and Wolof as national languages... Arabic alone is the official language of the four"; Mozambique, whose Constitution "values national languages while keeping Portuguese official"; Burkina Faso and Guinea likewise). 38 entries use the phrase, 21 of them in Africa',
  'recognised without official status': 'Recognised, scheduled or listed in law, with no claim to official status (India: "22 scheduled languages sit in the Eighth Schedule of the Constitution"; Switzerland: "Officially recognised, but not named in top-level steering documents"; Panama, where "Ley 88 of 2010 recognises the languages and alphabets of the indigenous peoples"; Israel, where "Arabic has a special status"; French Polynesia, where the local languages are "the languages of the territory")',
  'protected as culture': 'What the instrument protects is the people, the culture or the heritage, with the language carried along inside it. Kept separate from recognition of the LANGUAGE because the duty it creates points elsewhere (Japan: "What is protected is Ainu culture: the state must foster those who will inherit it"; Guyana, whose art 149G right "runs with cultural heritage and way of life, in one article of the fundamental rights title"; American Samoa: "Policy to protect against destruction of the Samoan way of life and language")',
  'named in policy only': 'Appears in a policy, strategy or curriculum document and nowhere with legal force (Serbia: "Ten or more named in steering documents, including Bunjevac"; Micronesia, where "the FSM Language Policy is the instrument promoting local languages and cultures"; South Sudan, whose "General Education Strategy Paper 2012-2017 commits to mother-tongue medium"). The Europe entries reach this value most often, for the reason given above',
  'none': 'Somebody looked and there is no standing -- NOT the same as nobody having looked (Estonia and Bosnia and Herzegovina: "Neither officially recognised nor named in steering documents"; Egypt: "PEER records no constitutional mention of Nubian or of Berber at Siwa"; Kuwait, whose Constitution "bars discrimination by language but confers no language right")',
  'not stated': 'The entry does not say what standing the indigenous or regional languages hold, including where it gives the majority language\'s status and stops (Sint Maarten, naming Dutch and English official and leaving Papiamento unsaid; Brazil, which assures use of mother tongues in school under the LDB without ever saying what status they carry)',
};

// Reusing INSTRUMENT_TYPES verbatim and adding one value, rather than editing
// the shared constant: `none` there means the entry established that NO
// instrument creates an entitlement, which is a finding. Several entries here
// instead describe a standing and never name the instrument behind it, and
// coding those `none` would assert a finding nobody made. Adding `not stated` to
// INSTRUMENT_TYPES itself would have changed dld.legalEntitlement's vocabulary
// underneath 209 stored codings, which is a migration and not this pass's job.
const STANDING_SOURCE = Object.assign({}, INSTRUMENT_TYPES, {
  'not stated': 'A standing is described and no instrument is named for it (Benin: "National languages are used first as a subject, then as a vehicle of teaching. The State is bound to fund research and materials" -- a duty, with nothing cited that imposes it). Distinct from `none`, which is the finding that no instrument exists',
});

// A LIST, because a single instrument routinely does two of these at once and
// coding one throws the other away. Spain is the clearest: the Constitution both
// obliges -- "Education administrations MUST GUARANTEE the right to be taught in
// those languages" -- and confers, in the same breath, the right being
// guaranteed. Ecuador, Myanmar and Guyana carry the same pair.
//
// NON-BINDINGNESS IS NOT A VALUE HERE, deliberately. A policy that "commits to"
// something is doing the same verb as a statute that does; what differs is the
// instrument, and `source` already carries that. South Sudan's strategy paper
// takes `duty to promote` with `source: policy`, and the two columns read
// together say what one column with a `commitment only` value would have said
// less clearly.
const STANDING_FORCE = {
  'duty to provide': 'Somebody must actually do something -- teach it, fund it, supply it, or comply with a standard (Isle of Man: the "Education Act 2001 REQUIRES the curriculum to provide for the teaching of Manx Gaelic"; Poland: "Schools must provide one where enough students apply"; Myanmar, where "Law obliges state, self-administered division and regional governments to set up ethnic classes"; Nicaragua: "Art. 70 requires units on Caribbean Coast languages"; Curacao, where "official spelling rules bind all publicly funded education institutions")',
  'duty to promote': 'A duty to protect, promote or develop, with nothing named that anyone must deliver. The commonest force in the corpus and the weakest (Angola, whose Constitution "makes protecting languages of African origin a state task"; Dominica: "Education Act 1997 duty to promote the language and culture of Dominica"; Japan, where the "duty on government is to deepen public understanding of the Ainu through education"; Samoa, where the declaration "obliges promotion of its development and maintenance as a living language")',
  'right held by speakers': 'Framed as something the speakers hold rather than something the state owes (Tajikistan: "All nations and nationalities hold a constitutional right to use their native language"; Brazil: "Indigenous communities are ASSURED use of their mother tongues in school"; Guyana: "Constitution art 149G gives indigenous peoples a right to protect and preserve their languages"; Myanmar: "Every citizen has a constitutional right to develop their language, literature and culture")',
  'permission only': 'May, not must -- the language is allowed rather than owed (Mozambique, where the constitutional clause and the 1992 decree were "neither binding -- ENABLING rather than mandatory"; Indonesia: "Local languages may be the medium in the first two grades of primary"; Malaysia and Singapore: "No person may be prohibited from using, teaching or learning any other language"; Nepal, where "the local-subject slot is the route for teaching any of them")',
  'declaratory only': 'The standing is stated and no consequence is attached to it (India, where the Eighth Schedule lists 22 languages and the entry records that only six non-scheduled languages are actually used as media; Odisha: "Official-language statute is administrative only, no school provision"; Mauritania: "Constitutional, not curricular: PEER names no school programme in these languages"; Guam, where Chamorro is official yet "not required for official recording of public acts and transactions" and the English version binds "where it materially differs")',
  'none': 'The entry establishes that the standing obliges nobody to anything -- checked, and there is nothing (Kuwait: the Constitution "bars discrimination by language but confers no language right"; American Samoa: "A policy clause, NOT AN ENTITLEMENT"). Distinct from `declaratory only`, where a standing exists and simply does no work, and from `not stated`',
  'not stated': 'The entry does not say what the standing obliges. Expected to be the commonest value across Europe, whose entries record whether a language is listed and stop',
};

const STANDING_EXTENT = {
  'nationwide': 'The standing runs across the whole state or territory (Japan: "Policy runs nationwide, as the Ainu live not only in Hokkaido but throughout Japan" -- the entry says so outright, which is why it is the worked example rather than an inference from silence)',
  'named areas or communities': 'The standing runs in named regions, districts or communities and not elsewhere (Spain\'s Autonomous Communities; Nicaragua, whose art. 70 requirement attaches to "Caribbean Coast languages"; Albania, where the home language is studiable "in Macedonian and Greek minority areas"; South Australia, binding "all educators and staff in ten named Anangu schools" and "elsewhere only a guide")',
  'not stated': 'The entry does not say how far the standing reaches. The honest value wherever reach is left to be inferred from the instrument\'s own level, since a national constitution saying nothing about territory is not the same as one saying "nationwide"',
};

// HOW FAR AN INDIGENOUS OR REGIONAL LANGUAGE CARRIES TEACHING. Derived by
// reading 90 of the 195 national entries across the five regions, then tested
// blind on 25 more before anything was wired in.
//
// IT EXISTS TO CLOSE A LOOP LEFT OPEN ON `standing`. That pass refused to code
// whether a standing reaches SCHOOL, although the prose begs for it
// ("Constitutional, not curricular"; "administrative only, no school
// provision"), because answering there would have meant reading this field's
// text from that field's column. Coding it here instead puts the two on the same
// 396-unit key, so the question `standing` raised can actually be asked: is the
// 19% of official languages that oblige nobody also the 19% that never reach a
// classroom?
//
// THE FIELD'S HINT PROPOSED "a right, a permission or an observed practice" AND
// THAT TRICHOTOMY IS MISSING ITS COMMONEST CASE. Niger's LOSEN art. 19 says the
// mother tongue IS the language of instruction in cycle de base 1; Eritrea's
// sector plan, Seychelles, Tuvalu and Rwanda do the same. Nobody holds a right,
// nobody is permitted, nobody is observed doing it off their own bat -- the
// instrument simply sets the medium. `system rule` is that case, and it was the
// single gap the blind test found.
//
// `WHO DECIDES` WAS DROPPED AS A COLUMN AND FOLDED IN AS TWO VALUES. Measured
// across the corpus it appears in 10% of entries and 15 of those 20 are European
// -- Norway's ten pupils, Belarus's school founder, Austria's Anmeldeprinzip --
// which makes it a regional flag rather than an axis, the same shape as the
// provenance rows. `on request or threshold` and `left to the school` carry it
// inside a column that every entry can answer, and Curacao and Sint Maarten show
// it is not purely European.
//
// THE GRAIN LIMIT IS THE ONE `standing` HAS. A row is one system, and a system
// may run several languages at several roles: Montenegro has Albanian as a
// medium "in most schools with many Albanian speakers" while "Romani is still
// not taught at any level of public education". The coding follows the languages
// the map is about, and where an entry splits that far the dominant arrangement
// is coded and the rest is lost. Botswana is the same shape with Setswana.
const MEDIUM_ROLE = {
  'sole medium': 'The language carries the teaching, by itself, in the schools where it runs (Ireland, where Gaeltacht recognition "needs a school to run entirely through Irish, bar language subjects", with a "two-year total-immersion programme in the infant cycle, during which no English is taught"; Finland, whose "Sami schools at Utsjoki and Inari teach in Inari, North and Skolt Sami, ages 6 to 15"; Montenegro, where "Albanian is the medium in most schools with many Albanian speakers" and the Council of Europe "rejects the bilingual label: the two language streams never mix")',
  'shared medium': 'The language and another both carry subjects, in parallel or by division of the timetable (Andorra, where "Catalan and French are both llengues vehiculars in primera ensenyanca"; the Marshall Islands, where Marshallese is the medium "in grades K-6, bar English classes" and then takes "social studies, health, PE and art" while English takes "maths and science"; New Caledonia\'s "experimental bilingual schools teach half in a kanak language, half in French"; France, where the stated aim is "parite horaire, equal weekly time in both languages"). Includes a separate-schools split, where each stream is whole but the SYSTEM runs both: Israel, where "Arabic is the language of instruction in Arab sector schools" and "Hebrew... in Jewish sector schools"',
  'transitional, early exit': 'The language is the medium for the early years and then hands over, which the corpus names in its own words (Seychelles: "Seselwa Creole is the medium of instruction in Creche, P1 and P2. English is the language of instruction from P3 onwards: EARLY-EXIT TRANSITIONAL"; South Sudan, "early-exit transitional model, with English taking over as medium from P4"; Lesotho, "transitional in form, but the profile names no grade at which the switch falls"; Tuvalu, Class 1 to 3 then "bridging to English"; Burkina Faso, where the national language is "90% of year 1, then 80, 50, 20, 10 percent"; Cambodia, where the mother tongue "takes 60% of the grade 2 timetable and 30% of grade 3" and "grades 4 to 6 are Khmer only"). The handover is the point: a language that stops early because the SCHOOL stops early is not this',
  'support only': 'The language is used to help pupils through teaching conducted in another, and never carries the teaching itself. The distinction the corpus insists on, often in so many words (American Samoa: Samoan "usable ONLY TO FACILITATE teaching English"; Angola, whose Lei 17/16 art 16(3) "allows Angolan languages as a complement and learning instrument" while Portuguese "is the medium from the start"; the Central African Republic, where "primary teachers use sango to explain what pupils miss in French"; Suriname, where "home languages are used in class incidentally and not systematically"; the Philippines since RA 12027, where "regional languages become auxiliary media")',
  'permitted, not implemented': 'An instrument allows the language as a medium and nothing is recorded as running on it (Guam: "AUTHORISATION ONLY: DOE may develop a bilingual-bicultural Chamorro programme"; the Central African Republic\'s Ordonnance 84/031, whose provisions "stayed without effect and French remained the only language used"). Kept apart from `support only`, which describes something that happens, and from `not a medium`, which is a finding that it does not',
  'not a medium': 'Somebody checked and the language does not carry teaching at any stage -- a finding, not a silence (Egypt: "No indigenous language of Egypt is used as a medium at any stage"; Qatar: "No language other than Arabic is recorded as a medium in the sources"; Bulgaria: "No teaching IN minority languages exists; Art 13(2) ZPUO makes Bulgarian the medium"; Mauritania, whose profile "records no use of Fula, Soninke or Wolof as a medium at any stage")',
  'not stated': 'The entry does not establish what role the language plays, including where the search itself came up empty (Dominica and Grenada: "No medium-of-instruction provision was found in the sources cited"; Saint Lucia, whose Education Act "carries no medium-of-instruction provision at all"). Distinct from `not a medium`: Grenada found no rule, Egypt found a rule that excludes',
};

// 50% of entries answer this, which is thin but usable -- and deliberately
// checked before the column was kept, because `extent` on `standing` was built
// on the same hope and came out 83% `not stated`. Stage boundaries are the thing
// these entries are most specific about, so the risk ran the other way here.
const MEDIUM_REACH = {
  'preschool only': 'The language carries teaching before school proper and no further (Bangladesh, whose mother tongue-based multilingual education runs at the "pre-primary stage only"; Aruba, where "Papiamento is the language of instruction in kindergarten" and "Dutch is officially the language of instruction from grade 1"; Guinea, where "pre-primary is usually in the child\'s mother tongue, but is private and urban only")',
  'early primary': 'Through roughly the first three or four years, then no further (Seychelles Creche to P2; Tuvalu Class 1 to 3; Lebanon "to grade three"; Indonesia, "the first two grades of primary only"; Eswatini, "the first four school grades"; the Philippines before RA 12027, K to Grade 3)',
  'all primary': 'Through the whole primary phase (Eritrea: "mother tongue is the medium at primary, grades 1-5", with English "at middle level, grade 6"; Niger, the whole cycle de base 1; India, whose art 350A duty "runs at the primary stage only")',
  'into secondary': 'Beyond primary into secondary schooling (Finland\'s Sami schools, "ages 6 to 15"; Russia\'s right to "preschool, primary and basic general education in the rodnoy yazyk"; Nepal\'s constitutional "right to education in mother tongue up to secondary level"; the Marshall Islands, grades 7-12 by subject)',
  'all levels': 'Every stage the entry recognises, higher education included where it says so (Peru, whose art. 22 gives a right to intercultural bilingual education "at every level"; Ecuador, where the nationality\'s language is "the principal language of education" across the SEIB sub-system)',
  'not stated': 'The entry does not say how far up the language goes. Common where the entry is about status or attempts rather than about a stage, and the honest value wherever a boundary would have to be inferred',
};

// `system rule` is first because the blind test found it missing and it turned
// out to be the commonest answer -- the hint's "right, permission or observed
// practice" describes how a language is SECURED to somebody, and most systems do
// not secure it to anybody, they simply set it.
const MEDIUM_SECURED_BY = {
  'system rule': 'The instrument sets the medium. Nobody holds it, nobody elects it, nobody is observed choosing it (Niger: "LOSEN art. 19: mother tongue is the language of instruction in cycle de base 1"; Eritrea, where the 2018 sector plan is the instrument and states the grades; Seychelles; Tuvalu; Rwanda, whose Law 10 of 2021 art 20 "states flatly \'English is the medium of instruction\'"; Israel, where the sector split simply is the system)',
  'right': 'A pupil, parent or community holds it and can call for it (Peru: "pupils with an indigenous mother tongue have a RIGHT to EIB at every level"; Nepal\'s Constitution art 31; Sri Lanka, "entitled to be educated through either National Language"; Russia, a right "exercised by creating the necessary schools, classes and groups" though "bounded by the possibilities provided by the education system"; Belarus, where the "right to choose Belarusian-medium schooling is guaranteed to citizens by art 82.1")',
  'permission': 'May, not must, with nobody obliged to offer it (Malawi: the 2013 Act "PERMITS, BUT DOES NOT REQUIRE, Chichewa as medium for Standards 1 to 4"; Indonesia, "local languages MAY be the medium in the first two grades"; Eswatini, "siSwati MAY be the medium for the first four school grades, but is not required to be"; Tajikistan, where schools in areas of high ethnic concentration "may use those groups\' native languages"; Guam\'s authorisation)',
  'on request or threshold': 'Access turns on somebody asking, or on enough of them (Norway, where outside the revitalisation municipalities "it takes 10 pupils to request it, and survives while six remain"; New Caledonia, "only for children whose parents or legal representatives asked, and as resources allow"; Austria\'s Anmeldeprinzip of 1959, where "parents decide whether a child joins bilingual teaching")',
  'left to the school': 'The rule delegates the choice to the provider rather than granting or withholding it (Curacao: "school board picks the medium; only English, Dutch or Papiamentu are allowed", and changing it "needs 16 months notice"; Sint Maarten, the same arrangement; Fiji, "no national rule: school committees decide the medium in practice"; Belarus, where "the founder of the school fixes the language, \'if such a possibility exists\'")',
  'practice only': 'It happens, and no instrument accounts for it (Guyana, where UNESCO "records limited attempts, so this is practice rather than entitlement"; Belize, where lessons in Q\'eqchi\' are "a school-level attempt rather than an entitlement"; Suriname, reported from "a study of pupils\' and teachers\' practices and views"; Sri Lanka, where the medium is the mother tongue "in practice")',
  'none': 'Established that nothing secures it (Bulgaria, where art 13(3)-(4) "allow subjects in a FOREIGN language only, never a minority language"; Egypt; Qatar). Distinct from `not stated`, and it will usually accompany `not a medium`',
  'not stated': 'The entry does not say what secures the arrangement it describes',
};

// WHETHER THE LANGUAGE IS TAUGHT AS A SUBJECT, ON WHAT TERMS, AND WHETHER WHAT
// IS TAUGHT IS THE LANGUAGE AT ALL. The third of the indigenous trio, derived
// from 65 of the 182 national entries across the five regions and tested blind
// on 25 more.
//
// IT EXISTS BECAUSE `mediumOfInstruction` LEFT 33 SYSTEMS AT `not a medium` AND
// 29 OF THEM HAVE PROSE HERE. Knowing a language does not carry teaching says
// nothing about whether it is taught, and the corpus shows those are different
// worlds: Bulgaria offers it "only as the subject Mother Tongue... Armenian,
// Hebrew, Romani and Turkish on offer", while Congo's Lingala and Munukutuba
// were made subjects by a law that "is superseded". Both are `not a medium`.
//
// THE STATUS IS A LIST, because it changes with the stage and coding one value
// throws the other away. Kenya is the clearest: "Indigenous Language Activities
// is a listed lower primary subject, Grades 1 to 3... OPTIONAL at lower
// secondary". Niger and Samoa do the same, Samoa putting Samoan at the head of
// the compulsory list for Years 9 to 11 and then among the options at senior
// secondary. Three of the 25 blind-test entries carried two values, which is
// what made it a list rather than a judgement call. It is the subject-side
// mirror of `transitional, early exit` on the medium: support thins as pupils
// get older, whichever column you look down.
//
// EXEMPTION WAS NOT MADE A COLUMN. It appears in 4 entries, all European, and a
// 2% column concentrated in one region is a regional flag rather than an axis --
// the judgement already made about `who decides` on mediumOfInstruction. It is
// recorded in the gloss on `compulsory for all` instead, where the Netherlands
// case belongs, because a duty a school can be wholly released from is worth a
// reader knowing about without being worth its own denominator.
//
// `stages` DELIBERATELY REUSES THE VALUE NAMES OF MEDIUM_REACH so the two can be
// read against each other. That is the point of coding this field at all: Niger
// has the mother tongue as the MEDIUM in cycle de base 1 and as a SUBJECT from
// cycle de base 2, and the pair of columns says so where either alone would not.
const SUBJECT_STATUS = {
  'compulsory for all': 'Every pupil takes it (Ireland, where "Irish is a core subject in the curriculum the Minister determines for recognised schools"; the Maldives, where "Dhivehi shall be taught at every school, by statute... at preschool, primary, secondary and higher secondary alike"; Tonga, where "Tongan Language is one of four core subjects"; Moldova, where the minority language "sits in the compulsory invariable component"; Spain\'s Lengua Cooficial y Literatura "through the ESO years"). EXEMPTIONS do not move an entry off this value, and two systems are worth knowing about: Ireland allows one "only in the listed circumstances", decided by the principal and unavailable in Irish-medium schools, while the Netherlands makes teaching Frisian "a legal duty" and yet lets schools "claim full or partial exemption since 2014", a G-profile primary being "fully exempt"',
  'compulsory in some schools or areas': 'Compulsory where it runs, and it does not run everywhere (Jordan, where the language is taught at "the private Prince Hamza School" and "every pupil takes the language class"; Micronesia, where the "primary State language" is taught "where it is not the local one"; Honduras, where the indigenous languages "are handled as second languages" for one group of peoples and not the other). The distinction from `compulsory for all` is the denominator, not the force',
  'elective': 'Offered and chosen (Serbia: "Elective \'mother tongue with elements of national culture\', two hours a week in primary"; Bulgaria, where "the subject MAY be studied -- permissive, not an entitlement", the class "opens only at 13 students"; Israel, where Arabic is "elective in high school"; French Polynesia: "Not compulsory - Conseil constitutionnel reserve, neither for pupils nor teachers"; Pakistan, where "an additional native language may be offered as an optional subject")',
  'extracurricular only': 'Taught outside the timetable, so not a school subject at all (Guernsey: "EXTRACURRICULAR ONLY: existing primary-school teaching to be supported and improved", with Guernesiais "encouraged as an enrichment activity" at secondary; Latvia, where the replacement "is an interest-related programme, OUTSIDE THE TIMETABLE, not a school subject"; Hungary\'s supplementary form, which "runs outside regular school hours")',
  'not taught': 'Somebody checked and it is not taught -- a finding (Estonia: "No top-level steering document names Russian as a subject to be provided"; Fiji: "The 2007 framework names no vernacular subject at all"; Egypt, where "timetabled additional languages are English or French, not Nubian or Berber"; Sint Maarten, whose language education area "covers English, Dutch and Spanish only"; Guinea-Bissau, where "Creole use is BANNED inside the school precinct")',
  'not stated': 'The entry does not establish whether it is taught. Distinct from `not taught`: Nepal\'s "sources consulted do not show a nationally timetabled mother-tongue subject" while the Curriculum Development Centre "has produced primary textbooks in 22 mother tongues", which is a search that came up short rather than a finding that nothing exists',
};

// The hint's fourth element, and it earns a column: 30 of 182 entries, spread
// evenly across all five regions rather than concentrated in one, which is what
// separated it from `exemption`. A curriculum can honour a language by teaching
// pupils ABOUT the people who speak it, and counting that as language teaching
// would overstate provision in exactly the systems that provide least.
const SUBJECT_OBJECT = {
  'the language': 'Pupils learn to use the language (Ireland, the Maldives, Greenland, Guam\'s "Beginning Chamorro", Bulgaria\'s Mother Tongue subject)',
  'language and culture together': 'The subject carries both, and the entry names both (Serbia\'s "mother tongue with elements of national culture"; the Marshall Islands, where "instruction in Marshallese language, customs, culture and history is compulsory"; Hungary, "three lessons a week PLUS one of \'ethnology\' in the minority language"; Tonga, whose subject "also carries indigenous knowledge about climate change and adaptation"; Panama, where art 88 makes the languages "an object of special study" while art 108 frames programmes on "the groups\' own patrones culturales")',
  'the community, not the language': 'What is taught is the people, the culture or the history, and the language itself is not on the timetable. The value that keeps a cultural-studies strand from being counted as language provision (Nicaragua, where outside the autonomous regions "the duty is units ABOUT the languages, NOT TEACHING OF THEM"; Trinidad and Tobago, "taught about inside the National Primary English Language Arts curriculum", with contrastive analysis of Creole against Standard English; Costa Rica, whose strand "is about the community: its history, knowledge, techniques and value systems"; Switzerland, where "Francoprovencal counted as cultural heritage, NOT A LANGUAGE"; Thailand, where dialects "sit inside the Thai language subject" and later grades "analyse the influence of dialects")',
  'not stated': 'The entry does not say what the teaching is of. The usual value where the entry establishes that nothing is taught, since there is then no object',
};

// Same value names as MEDIUM_REACH, on purpose -- see the note above. Answered on
// about half the entries, the same rate as its counterpart, and kept on the same
// terms: it discriminates across five real values on the half that answers.
const SUBJECT_STAGES = {
  'preschool only': 'Before school proper and no further (Hungary\'s supplementary form, extended to kindergarten "since 2020")',
  'early primary': 'Roughly the first three or four years (Kenya: "Indigenous Language Activities is a listed lower primary subject, GRADES 1 TO 3", with the "upper primary subject list omitting it")',
  'all primary': 'The whole primary phase (Serbia, "two hours a week IN PRIMARY"; Bulgaria, "grades 1-7, and NOT AT ALL in grades 8-12")',
  'into secondary': 'Beyond primary (Moldova, "3 hours a week in grades I-IX"; Spain, through the ESO years and "among the common subjects of the bachillerato"; Israel, "studied in lower secondary as a third language"; Micronesia, where pupils "should be able to keep writing in local languages through the 12th grade")',
  'all levels': 'Every stage the entry recognises (the Maldives: "required at preschool, primary, secondary and higher secondary alike"; the Marshall Islands, "required at preschool, elementary and secondary level schools")',
  'not stated': 'The entry does not say which stages carry the subject',
};

const HISTORY_SCHEME = id => ({
  // MANY: one coding row per policyHistory row, not per entry.
  many: true,
  row: 'one dated row of this entry\'s policy history',
  // `year` and `matches` IDENTIFY a row; they are not findings about it.
  // /patterns tabulates every column it finds, which for a key means 185
  // values each seen once. Declared here so a renderer can skip them
  // without knowing their names.
  keyColumns: ['year', 'matches', 'occurrence'],
  columns: {
    year: 'integer — the year the history row carries',
    // 23% of rows sit on a year that repeats within the same entry (Armenia
    // has 1999 twice and 2009 twice, Antigua 2013 three times), so year alone
    // cannot tie a coding row back to the row it codes. This holds a
    // normalised prefix of that row's description and the pair is the key.
    //
    // SIXTY CHARACTERS, measured rather than guessed. At thirty the two
    // United States rows of 1975 collided -- both open "Education for All
    // Handicapped Children Act" and differ only at "(P.L. 94-142)
    // establishes" against "(Pub. L. 94-142) listed". Sixty leaves zero
    // collisions across dld's 1,142 rows and three across all 4,305. Those
    // three (Tamil Nadu 1973, Montenegro 2006, Sierra Leone 1991) still
    // collide at a hundred, so they are near-duplicate ROWS rather than a
    // key that is too short, and the fix for them is to deduplicate the
    // history rather than to lengthen this.
    matches: 'free text — the first 60 characters of the row description, normalised, which with `year` identifies the row this codes',
    // The last resort, and it is needed. Three entries carry DUPLICATE
    // history rows -- Sierra Leone repeats the same sentence about
    // Constitution s.9(3) twice, character for character -- so year and a
    // prefix cannot separate them at any length. This is the 1-based
    // position among rows sharing both, and it is 1 on 4,302 of 4,305 rows.
    // A duplicate row is a content problem worth fixing on its own; until
    // somebody does, this keeps the coding attached to the right one.
    occurrence: 'integer, the 1-based position among rows sharing a year and a matches prefix; 1 unless the entry has duplicate history rows',
    operation: HISTORY_OPERATION,
    // Only where `operation` is empty; see the comment on NOT_AN_OPERATION.
    not_an_operation: NOT_AN_OPERATION,
    // A LIST, and a sparse one -- see the comment on SCOPE_CHANGE. It sits
    // beside `operation` rather than inside it because a row can amend an
    // instrument AND widen its reach, and both readings are worth keeping.
    scope_change: SCOPE_CHANGE,
    fields_touched: fieldsTouchedFor(id),
  },
});
const SCHEMES = {
  'indigenous.taughtAsSubject': {
    // One system, the grain the other two indigenous schemes use.
    row: 'one national or sub-national system',
    columns: {
      // A LIST: compulsory early and optional later is common enough that coding
      // one value loses the shape. See the comment on SUBJECT_STATUS.
      status: SUBJECT_STATUS,
      object: SUBJECT_OBJECT,
      stages: SUBJECT_STAGES,
    },
  },
  'indigenous.mediumOfInstruction': {
    // One system. Where a system runs several languages at several roles the
    // dominant arrangement is coded; see the grain note on MEDIUM_ROLE.
    row: 'one national or sub-national system',
    columns: {
      role: MEDIUM_ROLE,
      reach: MEDIUM_REACH,
      secured_by: MEDIUM_SECURED_BY,
    },
  },
  'indigenous.standing': {
    // One system, so this fits what storage holds. A system may hold several
    // languages at several standings; see the grain note on STANDING_STATUS.
    row: 'one national or sub-national system',
    columns: {
      status: STANDING_STATUS,
      source: STANDING_SOURCE,
      // A LIST -- Spain obliges and confers in one clause. The rest take one.
      force: STANDING_FORCE,
      extent: STANDING_EXTENT,
    },
  },
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
    // ORDINAL columns, named rather than detected. A renderer that shades the
    // map by a coded value needs to know which columns carry a rank, because an
    // ordinal one should use the coverage ramp -- lightness climbing with the
    // value -- and an unordered one must not, or the fill asserts a ranking the
    // vocabulary refuses. Detection would get this wrong in both directions:
    // `obliges` has numeric keys and IS ordered, while `occurrence` has numeric
    // keys and is a row identifier. So it is declared.
    ordinal: ['review_interval_months'],

    row: 'one national or sub-national system',
    columns: {
      discharge_basis: DISCHARGE_BASIS,
      review_interval_months: 'integer, where a cycle is set and a length is given',
      decider: DECIDER_TYPES,
      rule_locus: RULE_LOCUS,
    },
  },
  'dld.legalEntitlement': {
    // See the note on dld.dischargeCriteria.
    ordinal: ['obliges', 'instrument_year'],

    // MANY: a coding for this field is an ARRAY of rows, one per
    // legal instrument. See the note on `many` below.
    many: true,
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
    // See the note on dld.dischargeCriteria.
    ordinal: ['exit_period_months'],

    row: 'one national or sub-national system',
    columns: {
      exit_mechanism: EXIT_MECHANISM,
      exit_period_months: 'integer, where a fixed period is set and a length is given',
      decided_by: DECIDED_BY,
      rule_locus: RULE_LOCUS,
    },
  },
  // The field that actually asks whether a bilingual child can be assessed
  // properly. `bilingual_handling` lived only on identificationCriteria, where
  // it came out `silent` on 187 of 193 -- a finding about where drafters put
  // the answer, not about what systems do. 104 of those 187 have prose here.
  'eal.l1Support': {
    row: 'one national or sub-national system',
    columns: {
      form: L1_FORM,
      for_whom: L1_FOR_WHOM,
      secured_by: L1_SECURED_BY,
      evidence_type: EVIDENCE_TYPE,
    },
  },
  'dld.funding': {
    row: 'one national or sub-national system',
    columns: {
      // `funders` is a LIST -- see the note on FUNDERS.
      funders: FUNDERS,
      family_pays: FAMILY_PAYS,
      scope: FUNDING_SCOPE,
      evidence_type: EVIDENCE_TYPE,
    },
  },
  'dld.serviceModel': {
    row: 'one national or sub-national system',
    columns: {
      // `sectors` is a LIST -- see the note on SERVICE_SECTOR.
      sectors: SERVICE_SECTOR,
      practitioner: SERVICE_PRACTITIONER,
      placement: SERVICE_PLACEMENT,
      evidence_type: EVIDENCE_TYPE,
    },
  },
  'dld.multilingualProvision': {
    row: 'one national or sub-national system',
    columns: {
      assessment_language: ASSESSMENT_LANGUAGE,
      bilingual_handling: BILINGUAL_HANDLING,
      local_norms: LOCAL_NORMS,
      evidence_type: EVIDENCE_TYPE,
    },
  },
  'dld.assessments': {
    // MANY: a coding for this field is an ARRAY of rows, one per
    // assessment instrument. See the note on `many` below.
    many: true,
    row: 'one assessment instrument named by the entry',
    columns: {
      instrument: 'free text — the test as the entry names it, never its contents',
      test_type: TEST_TYPES,
      bilingual_fit: BILINGUAL_FIT,
      modality: MODALITY,
      language_domains: LANGUAGE_DOMAINS,
    },
  },
  'dld.policyHistory': HISTORY_SCHEME('dld'),
  'eal.policyHistory': HISTORY_SCHEME('eal'),
  'indigenous.policyHistory': HISTORY_SCHEME('indigenous'),
  'fl.policyHistory': HISTORY_SCHEME('fl'),
  'he.policyHistory': HISTORY_SCHEME('he'),
};

// ONE ROW PER UNIT, OR MANY?
//
// Four of the seven schemes are system-grained: a system designates a pupil
// once however many documents say so, so one row per unit is the truth. Two are
// INSTRUMENT-grained and were unstorable because of it. Ghana cites a
// constitution and a Children's Act; Chile names TECAL, TEPROSIF and a
// screening test; the United Arab Emirates names Federal Law 29 of 2006, a 2020
// Ministerial Resolution and Law 14 of 2009 -- three instruments, three types,
// three decades. A stratified read of 30 national legalEntitlement entries
// found 14 naming two or more, and in nearly all of them instrument_type,
// instrument_year and obliges differ WITHIN the entry. One flat row forces a
// choice between them, which is the discarding these vocabularies were revised
// to stop.
//
// So a `many` scheme stores an array. Everything else stores an object, because
// wrapping a single true row in an array to look uniform would be noise.
// Readers should not branch on that themselves -- call codingRows(), which
// always hands back an array.
const codingRows = c => (c == null ? [] : Array.isArray(c) ? c : [c]);

const has = (o, v) => Object.prototype.hasOwnProperty.call(o, v);
const isObligesLevel = v => Number.isInteger(v) && v >= 0 && v <= 4;

module.exports = {
  EXCLUSIVE_VALUES, isExclusiveValue, mixedAbsence,
  codingRows,
  INSTRUMENT_TYPES, OBLIGES_LEVELS, DUTY_TYPES, REDRESS_TYPES,
  TEST_TYPES, BILINGUAL_FIT, MODALITY, LANGUAGE_DOMAINS,
  ASSESSMENT_LANGUAGE, LOCAL_NORMS, EVIDENCE_TYPE,
  SERVICE_SECTOR, SERVICE_PRACTITIONER, SERVICE_PLACEMENT,
  FUNDERS, FAMILY_PAYS, FUNDING_SCOPE,
  L1_FORM, L1_FOR_WHOM, L1_SECURED_BY,
  DESIGNATION_FORMS, NEWCOMER_TRIGGERS, DECIDED_BY, RULE_LOCUS, EXIT_MECHANISM,
  THRESHOLD_BASIS, BILINGUAL_HANDLING, DECIDER_TYPES, EXCLUSIONS, DISCHARGE_BASIS,
  HISTORY_OPERATION,
  NOT_AN_OPERATION, SCOPE_CHANGE,
  STANDING_STATUS, STANDING_SOURCE, STANDING_FORCE, STANDING_EXTENT,
  MEDIUM_ROLE, MEDIUM_REACH, MEDIUM_SECURED_BY,
  SUBJECT_STATUS, SUBJECT_OBJECT, SUBJECT_STAGES,
  SCHEMES,
  isHistoryOperation: v => has(HISTORY_OPERATION, v),
  isNotAnOperation: v => has(NOT_AN_OPERATION, v),
  isScopeChange: v => has(SCOPE_CHANGE, v),
  isStandingStatus: v => has(STANDING_STATUS, v),
  isStandingSource: v => has(STANDING_SOURCE, v),
  isStandingForce: v => has(STANDING_FORCE, v),
  isStandingExtent: v => has(STANDING_EXTENT, v),
  isMediumRole: v => has(MEDIUM_ROLE, v),
  isMediumReach: v => has(MEDIUM_REACH, v),
  isMediumSecuredBy: v => has(MEDIUM_SECURED_BY, v),
  isSubjectStatus: v => has(SUBJECT_STATUS, v),
  isSubjectObject: v => has(SUBJECT_OBJECT, v),
  isSubjectStages: v => has(SUBJECT_STAGES, v),
  isThresholdBasis: v => has(THRESHOLD_BASIS, v),
  isBilingualHandling: v => has(BILINGUAL_HANDLING, v),
  isAssessmentLanguage: v => has(ASSESSMENT_LANGUAGE, v),
  isL1Form: v => has(L1_FORM, v),
  isL1ForWhom: v => has(L1_FOR_WHOM, v),
  isL1SecuredBy: v => has(L1_SECURED_BY, v),
  isFunder: v => has(FUNDERS, v),
  isFamilyPays: v => has(FAMILY_PAYS, v),
  isFundingScope: v => has(FUNDING_SCOPE, v),
  isServiceSector: v => has(SERVICE_SECTOR, v),
  isServicePractitioner: v => has(SERVICE_PRACTITIONER, v),
  isServicePlacement: v => has(SERVICE_PLACEMENT, v),
  isLocalNorms: v => has(LOCAL_NORMS, v),
  isEvidenceType: v => has(EVIDENCE_TYPE, v),
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
  fieldsTouchedFor,
  isFieldTouched: (id, v) => has(fieldsTouchedFor(id), v),
};
