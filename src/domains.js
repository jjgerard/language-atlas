// The domains the atlas covers, and where each live one gets its data.
//
// `fields` is the ordered field list for that domain: it drives the map's
// coverage counts, the hover checklist, the entry panel and the submission
// form, so adding a field here is the only edit needed to surface it.
//
// Each tuple is [key, label, type, hint]. `type` is one of:
//   'text'    free prose (the default when omitted)
//   'history' a dated list of [{year, description}]
//   'series'  a dated list of [{year, value, note}]
// `hint` is the guidance shown under that field on the submission form.
//
// A 'text' field is written as sub-bullets, one per line: at most four points,
// each short enough for two lines in the entry panel, in the clipped register of
// a conference poster rather than in sentences. A qualifier that would mislead
// the reader if dropped — that a figure is a practitioner survey, that a task
// exists without any service using it — may take a fifth line, and belongs at
// the top, since a reader of a list may not reach the bottom of it.
//
// Every domain's entries live in the atlas's own store, in data/<id>.json.
// Two of them began life in separate trackers and were proxied over the network
// for a while; those were retired in August 2026, and the `origin`/`native`
// distinction that supported them went with them. A stored row is still shaped
// exactly like the trackers' /api/catalog entries were, which is why folding
// them in was a data move rather than a rewrite.
const DOMAINS = [
  {
    id: 'eal',
    label: 'Majority language acquisition',
    blurb: 'Support for children who arrive at school without the language it teaches in — called EAL where that language is English.',
    live: true,
    fields: [
      ['newcomerCriteria', 'Newcomer criteria', 'text', 'Who counts as a newcomer or second-language pupil, and on what evidence.'],
      ['removalCriteria', 'Removal criteria', 'text', 'What ends the designation — a test, a time limit, a teacher judgement.'],
      ['newcomerProportion', 'Newcomer proportion', 'series', 'Share of pupils designated, by year, with the source of each figure.'],
      ['achievementGap', 'Education outcomes', 'text', 'How these pupils do relative to their peers, and how that is measured.'],
      ['l2Support', 'L2 support', 'text', 'Teaching of the school language itself: who delivers it, where, for how long.'],
      ['l1Support', 'L1 support', 'text', 'Any provision in the pupil\u2019s home language.'],
      ['l3Support', 'L3 support', 'text', 'Whether these pupils are also taught a further language, or exempted.'],
      ['bilingualEducationNotes', 'Bilingual education', 'text', 'Programmes teaching content through two languages, if any.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, circular or funding decision, one per row.'],
    ],
  },
  {
    id: 'dld',
    label: 'Language disorder support',
    blurb: 'Children with a lasting difficulty learning and using language: how it is identified, and what they are entitled to. Known in research as DLD.',
    live: true,
    fields: [
      ['terminology', 'Terminology', 'text', 'The term used locally, and whether it maps onto DLD.'],
      ['identificationCriteria', 'Identification criteria', 'text', 'What has to be true for a child to be identified.'],
      ['assessments', 'Assessments', 'text', 'Instruments in routine use \u2014 name and link them, never reproduce items or norms.'],
      ['multilingualProvision', 'Multilingual provision', 'text', 'How children assessed in a language other than their first are handled.'],
      ['referralPathway', 'Referral pathway', 'text', 'Who refers, to whom, and what happens next.'],
      ['serviceModel', 'Service model', 'text', 'Where therapy happens and in what form.'],
      ['legalEntitlement', 'Legal entitlement', 'text', 'What the law obliges the system to provide.'],
      ['funding', 'Funding', 'text', 'Who pays, and how the money reaches a child.'],
      ['workforce', 'Workforce', 'text', 'Numbers, training and distribution of therapists.'],
      ['dischargeCriteria', 'Discharge criteria', 'text', 'What ends a child\u2019s support.'],
      ['outcomesEvidence', 'Outcomes evidence', 'text', 'Published evidence on how the system performs.'],
      ['identifiedPrevalence', 'Identified prevalence', 'series', 'Rates identified by the system, by year, with the source of each figure.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, guidance or funding decision, one per row.'],
    ],
  },
  {
    id: 'fl',
    label: 'Foreign languages in school',
    blurb: 'Languages from outside the country, taught as school subjects: which ones, at what age, and whether required or chosen. Languages of the place have their own map.',
    live: true,
    fields: [
      ['primaryRequirement', 'Primary school', 'text', 'Is a language other than the school language compulsory in primary school, from what age or year, and under what rule.'],
      ['secondaryRequirement', 'Lower secondary', 'text', 'Whether it is compulsory, for how many years, and how many languages.'],
      ['upperSecondary', 'Upper secondary', 'text', 'Whether it continues, becomes optional, or is required to leave school or enter university.'],
      ['languagesOffered', 'Languages offered', 'text', 'Which languages a pupil can actually take, and which are available in practice rather than only on paper.'],
      ['curriculumTime', 'Curriculum time', 'text', 'Hours or periods per week, and how that is set.'],
      ['assessment', 'Assessment', 'text', 'The qualifications or exams these courses lead to.'],
      ['teacherSupply', 'Teacher supply', 'text', 'Qualification routes, shortages, and which languages cannot be staffed.'],
      ['higherEducation', 'Higher education', 'text', 'Whether languages can be studied at degree level, including departments opening or closing.'],
      ['uptake', 'Uptake', 'series', 'Numbers or shares of pupils taking a language, by year, with the source of each figure.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, curriculum order or funding decision, one per row.'],
    ],
  },
  {
    id: 'indigenous',
    label: 'Indigenous and regional languages',
    blurb: 'Languages already spoken where the school stands, and what school does with them: teaches in them, teaches them, recognises them, or not.',
    // Signposted on the map because the NAME of this map is a compromise, and a
    // reader is owed that. There is no globally common policy term: counted
    // across the sources this atlas has retrieved, "minority language" leads
    // only because India's Commissioner for Linguistic Minorities supplies 973
    // of its hits, while Canada's sources say Indigenous 606 times and Africa's
    // say national languages. Every available term of art is a regional loan.
    // See the README section "Why this map is called what it is".
    note: 'No single term for these languages is used worldwide: the same languages are "national languages" in Senegal, "linguistic minorities" in India and "Indigenous" in Canada. This map keeps one name for navigation, and every entry uses the word its own sources use — recorded in the Local term field.',
    live: true,
    fields: [
      ['localTerm', 'Local term', 'text', 'What the system itself calls these languages — national, minority, Indigenous, regional, or its own word.'],
      ['standing', 'Standing', 'text', 'The position the system gives them: official, co-official, recognised, or none, and the instrument that says so.'],
      ['mediumOfInstruction', 'Medium of instruction', 'text', 'Whether school is taught IN the language, at which stages and in which schools.'],
      ['taughtAsSubject', 'Taught as a subject', 'text', 'Whether it is taught, compulsory or optional, at which stages. Note where the curriculum teaches ABOUT the community rather than the language.'],
      ['teacherSupply', 'Teachers', 'text', 'Who may teach it, how they qualify, and whether fluent speakers can teach without a conventional licence.'],
      ['materials', 'Curriculum and materials', 'text', 'Whether a curriculum, textbooks or an agreed orthography exist.'],
      ['assessment', 'Assessment', 'text', 'Whether it can be examined or certificated, and in what.'],
      ['revitalisation', 'Revitalisation', 'text', 'Programmes aimed at reversing language shift, and who runs them.'],
      ['speakers', 'Speakers', 'series', 'Speaker numbers or shares, by year, with the source of each figure and who it counted.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, order or funding decision, one per row.'],
    ],
  },
  { id: 'adult', label: 'Majority language for adults', blurb: 'Classes and entitlements for adults who move to a country, rather than children in its schools.', live: false, planned: true },
  { id: 'ling', label: 'Linguistics in higher education', blurb: 'Where linguistics can be studied as a subject in its own right.', live: false, planned: true },
];

for (const d of DOMAINS) {
  d.fields = (d.fields || []).map(([k, label, type, hint]) => [k, label, type || 'text', hint || '']);
}

const LIVE = DOMAINS.filter(d => d.live);
const byId = id => DOMAINS.find(d => d.id === id) || null;

module.exports = { DOMAINS, LIVE, byId };
