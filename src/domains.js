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
// A domain gets its entries either from a tracker (`origin`) or from the
// atlas's own store (`native`). All three are now native: the two trackers'
// catalogues were imported by import-tracker.js and live in data/<id>.json.
// Nothing else in the app had to change for that, which was the point of
// keeping a stored row shaped like a tracker's catalog entry.
const DOMAINS = [
  {
    id: 'eal',
    label: 'Majority language acquisition',
    blurb: 'Support for children who arrive at school without the language it teaches in — known in schools as EAL.',
    live: true,
    native: true,
    fields: [
      ['newcomerCriteria', 'Newcomer criteria', 'text', 'Who counts as a newcomer or EAL pupil, and on what evidence.'],
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
    native: true,
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
    blurb: 'Which languages children are taught besides the language of the school, at what age, and whether it is a requirement or a choice.',
    live: true,
    native: true,
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
      ['regionalMinorityLanguages', 'Regional and minority languages', 'text', 'Provision for languages of the country itself, where it sits alongside foreign language teaching.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, curriculum order or funding decision, one per row.'],
    ],
  },
  { id: 'adult', label: 'Majority language for adults', blurb: 'Classes and entitlements for adults who move to a country, rather than children in its schools.', live: false, planned: true },
  { id: 'ling', label: 'Linguistics in higher education', blurb: 'Where linguistics can be studied as a subject in its own right.', live: false, planned: true },
];

for (const d of DOMAINS) {
  d.fields = (d.fields || []).map(([k, label, type, hint]) => [k, label, type || 'text', hint || '']);
}

const LIVE = DOMAINS.filter(d => d.live);
const NATIVE = DOMAINS.filter(d => d.native);
const byId = id => DOMAINS.find(d => d.id === id) || null;

module.exports = { DOMAINS, LIVE, NATIVE, byId };
