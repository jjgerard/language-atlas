// The domains the atlas covers, and where each live one gets its data.
//
// `fields` is the ordered field list for that domain: it drives the map's
// coverage counts, the hover checklist, the entry panel and the submission
// form, so adding a field here is the only edit needed to surface it.
const DOMAINS = [
  {
    id: 'eal',
    label: 'Majority language acquisition',
    blurb: 'Support for children who arrive at school without the language it teaches in — known in schools as EAL.',
    live: true,
    origin: 'https://eal-policy-tracker.fly.dev',
    fields: [
      ['newcomerCriteria', 'Newcomer criteria'],
      ['removalCriteria', 'Removal criteria'],
      ['newcomerProportion', 'Newcomer proportion'],
      ['l2Support', 'L2 support'],
      ['l1Support', 'L1 support'],
      ['l3Support', 'L3 support'],
      ['bilingualEducationNotes', 'Bilingual education'],
      ['policyHistory', 'Policy history'],
    ],
  },
  {
    id: 'dld',
    label: 'Language disorder support',
    blurb: 'Children with a lasting difficulty learning and using language: how it is identified, and what they are entitled to. Known in research as DLD.',
    live: true,
    origin: 'https://dld-policy-tracker.fly.dev',
    fields: [
      ['terminology', 'Terminology'],
      ['identificationCriteria', 'Identification criteria'],
      ['assessments', 'Assessments'],
      ['multilingualProvision', 'Multilingual provision'],
      ['referralPathway', 'Referral pathway'],
      ['serviceModel', 'Service model'],
      ['legalEntitlement', 'Legal entitlement'],
      ['funding', 'Funding'],
      ['workforce', 'Workforce'],
      ['dischargeCriteria', 'Discharge criteria'],
      ['outcomesEvidence', 'Outcomes evidence'],
      ['identifiedPrevalence', 'Identified prevalence'],
      ['policyHistory', 'Policy history'],
    ],
  },
  { id: 'fl', label: 'Foreign languages in school', blurb: 'Compulsory or optional language learning by phase.', live: false, planned: true },
  { id: 'adult', label: 'Majority language for adults', blurb: 'Classes and entitlements for adults who move to a country, rather than children in its schools.', live: false, planned: true },
  { id: 'ling', label: 'Linguistics in higher education', blurb: 'Where linguistics can be studied as a subject in its own right.', live: false, planned: true },
];

const LIVE = DOMAINS.filter(d => d.live);
const byId = id => DOMAINS.find(d => d.id === id) || null;

module.exports = { DOMAINS, LIVE, byId };
