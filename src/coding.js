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
    row: 'one national or sub-national system',
    columns: {
      exit_mechanism: EXIT_MECHANISM,
      exit_period_months: 'integer, where a clock is set and a length is given',
      decided_by: DECIDED_BY,
      rule_locus: RULE_LOCUS,
    },
  },
  // The field that actually asks whether a bilingual child can be assessed
  // properly. `bilingual_handling` lived only on identificationCriteria, where
  // it came out `silent` on 187 of 193 -- a finding about where drafters put
  // the answer, not about what systems do. 104 of those 187 have prose here.
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
  codingRows,
  INSTRUMENT_TYPES, OBLIGES_LEVELS, DUTY_TYPES, REDRESS_TYPES,
  TEST_TYPES, BILINGUAL_FIT, MODALITY, LANGUAGE_DOMAINS,
  ASSESSMENT_LANGUAGE, LOCAL_NORMS, EVIDENCE_TYPE,
  DESIGNATION_FORMS, NEWCOMER_TRIGGERS, DECIDED_BY, RULE_LOCUS, EXIT_MECHANISM,
  THRESHOLD_BASIS, BILINGUAL_HANDLING, DECIDER_TYPES, EXCLUSIONS, DISCHARGE_BASIS,
  HISTORY_OPERATION,
  NOT_AN_OPERATION, SCOPE_CHANGE,
  SCHEMES,
  isHistoryOperation: v => has(HISTORY_OPERATION, v),
  isNotAnOperation: v => has(NOT_AN_OPERATION, v),
  isScopeChange: v => has(SCOPE_CHANGE, v),
  isThresholdBasis: v => has(THRESHOLD_BASIS, v),
  isBilingualHandling: v => has(BILINGUAL_HANDLING, v),
  isAssessmentLanguage: v => has(ASSESSMENT_LANGUAGE, v),
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
