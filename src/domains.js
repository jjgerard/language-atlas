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
// a conference poster rather than in sentences.
//
// EACH BULLET ANSWERS A FIXED QUESTION, IN A FIXED ORDER. The `hint` on every
// text field lists those questions. They are a drafting discipline, not labels:
// the bullet carries the content only, never the name of the slot.
//
// Two rules make this work. Order the questions so the first is the one almost
// every system answers and the last is the one few do -- then a thin entry
// carries the SAME first two points as every other thin entry, instead of two
// arbitrary ones. And OMIT a question you cannot answer: never pad, never write
// a placeholder. Four blank slots and four missing ones look identical to a
// reader, and only one of them is honest.
//
// This replaces choosing four points per entry ad hoc, which made entries
// unusable side by side: the first bullet of dld.terminology was answering four
// different questions across France, Kenya, India and Japan -- provenance, an
// absence, the term itself, and a comparison to the rest of the atlas.
//
// CITE INSIDE THE BULLET, in a terse parenthesis:
//   "trouble du langage (TL)" used throughout (COST IS1406 survey translation)
// The budget is unforgiving here -- writing that as "not a statutory label"
// costs 97 characters and is refused. Keep the parenthesis short.
//
// A qualifier that would mislead the reader if dropped belongs INSIDE the bullet
// it qualifies, as above. Only a qualifier that applies to the whole field and
// cannot attach to one point takes a fifth line, at the top, since a reader of a
// list may not reach the bottom of it.
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
      ['newcomerCriteria', 'Newcomer criteria', 'text', 'In this order, omitting any you cannot answer: who counts as a newcomer or second-language pupil · on what evidence · at what point it is decided · who decides.'],
      ['removalCriteria', 'Removal criteria', 'text', 'In this order, omitting any you cannot answer: what ends the designation · who decides · any time limit · whether a pupil can be designated again.'],
      ['newcomerProportion', 'Newcomer proportion', 'series', 'Share of pupils designated, by year, with the source of each figure.'],
      ['achievementGap', 'Education outcomes', 'text', 'In this order, omitting any you cannot answer: what is measured · what the gap is · who they are compared against · whether it is tracked over time.'],
      ['l2Support', 'L2 support', 'text', 'In this order, omitting any you cannot answer: who delivers it · where, in the ordinary class, by withdrawal, or in a separate setting · how much of it and for how long · what qualification the teacher needs.'],
      ['l1Support', 'L1 support', 'text', 'In this order, omitting any you cannot answer: whether the home language is taught at all · who provides it, the school, the state or the community · at which stages · whether it can be examined.'],
      ['l3Support', 'L3 support', 'text', 'In this order, omitting any you cannot answer: whether these pupils are also taught a further language · whether they may be exempted · who decides an exemption · what replaces the time.'],
      ['bilingualEducationNotes', 'Bilingual education', 'text', 'In this order, omitting any you cannot answer: whether content is taught through two languages · which languages · at which stages or in which schools · whether it is an entitlement or a pilot.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, circular or funding decision, one per row.'],
    ],
  },
  {
    id: 'dld',
    label: 'Language disorder support',
    blurb: 'Children with a lasting difficulty learning and using language: how it is identified, and what they are entitled to. Known in research as DLD.',
    live: true,
    fields: [
      ['terminology', 'Terminology', 'text', 'In this order, omitting any you cannot answer: the term itself in the local language · what the category covers · how it relates to DLD, whether wider, narrower or absent · where the term is fixed, in statute, in guidance, or in practice only.'],
      ['identificationCriteria', 'Identification criteria', 'text', 'In this order, omitting any you cannot answer: who decides · what evidence is required · the threshold, in words and never as scores from a commercial test · what rules a child out.'],
      ['assessments', 'Assessments', 'text', 'In this order, omitting any you cannot answer: what is in routine use, named and linked but never reproduced · which languages it exists in · whether the norms are local · whether its use is required or chosen.'],
      ['multilingualProvision', 'Multilingual provision', 'text', 'In this order, omitting any you cannot answer: whether a child can be assessed in a language they speak · who provides that · what the rule says about bilingual children · whether norms exist for them.'],
      ['referralPathway', 'Referral pathway', 'text', 'In this order, omitting any you cannot answer: who may refer · to whom · what triggers a referral · what gates it, such as a wait, a threshold or an age limit.'],
      ['serviceModel', 'Service model', 'text', 'In this order, omitting any you cannot answer: where therapy happens · who delivers it · how much of it, the intensity or dosage · whether provision is tiered or universal.'],
      ['legalEntitlement', 'Legal entitlement', 'text', 'In this order, omitting any you cannot answer: the instrument, named · what it obliges · who carries the duty · what redress or appeal exists.'],
      ['funding', 'Funding', 'text', 'In this order, omitting any you cannot answer: who pays · how the money reaches a child · any co-payment or cap · whether it is ring-fenced.'],
      ['workforce', 'Workforce', 'text', 'In this order, omitting any you cannot answer: how many there are and when they were counted · the ratio to population · the qualification route · where they are and are not.'],
      ['dischargeCriteria', 'Discharge criteria', 'text', 'In this order, omitting any you cannot answer: what ends support · who decides · whether a child can re-enter · any age ceiling.'],
      ['outcomesEvidence', 'Outcomes evidence', 'text', 'In this order, omitting any you cannot answer: what was measured · by whom and when · what it found · whether it is repeated.'],
      ['identifiedPrevalence', 'Identified prevalence', 'series', 'Rates identified by the system, by year, with the source of each figure.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, guidance or funding decision, one per row.'],
    ],
  },
  {
    id: 'fl',
    label: 'Foreign languages in school',
    blurb: 'Languages from outside the country, taught as school subjects: which ones, at what age, and whether required or chosen.',
    live: true,
    fields: [
      ['primaryRequirement', 'Primary school', 'text', 'Is a language other than the school language compulsory in primary school, from what age or year, and under what rule.'],
      ['secondaryRequirement', 'Lower secondary', 'text', 'Whether it is compulsory, for how many years, and how many languages.'],
      ['upperSecondary', 'Upper secondary', 'text', 'Whether it continues, becomes optional, or is required to leave school or enter university.'],
      ['languagesOffered', 'Languages offered', 'text', 'Which languages a pupil can actually take, and which are available in practice rather than only on paper.'],
      ['curriculumTime', 'Curriculum time', 'text', 'Hours or periods per week, and how that is set.'],
      ['assessment', 'Assessment', 'text', 'The qualifications or exams these courses lead to.'],
      ['teacherSupply', 'Teacher supply', 'text', 'Qualification routes, shortages, and which languages cannot be staffed.'],
      ['uptake', 'Uptake', 'series', 'Numbers or shares of pupils taking a language, by year, with the source of each figure.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, curriculum order or funding decision, one per row.'],
    ],
  },
  {
    id: 'he',
    label: 'Languages and linguistics in higher education',
    blurb: 'Where languages and linguistics can be studied as degree subjects, what school qualifications it takes to get in, and which language a degree is taught in.',
    // This map began as one field on `fl`, and splitting it out was not tidying.
    // Read side by side, the 28 entries written into fl.higherEducation were
    // answering six different questions -- Egypt and Morocco the language a
    // degree is TAUGHT IN, the United States how many institutions offer one,
    // Belarus whether every student must take one, Guyana who trains the school
    // system's teachers. A single field cannot hold those and stay comparable,
    // which is the same failure the slot convention exists to fix, one level up.
    //
    // Linguistics shares this map rather than having its own. A place that
    // drops languages at school and a place with no linguistics department are
    // the same story told twice, and separating them would have meant fetching
    // the same university prospectus into two domains.
    note: 'Languages and linguistics sit on one map because they are usually documented in one place — a university\'s own prospectus covers both — and because the interesting question links them: whether a system that stops teaching languages at school still trains people to study language itself.',
    live: true,
    fields: [
      ['degreeSubjects', 'Languages as a degree', 'text', 'In this order, omitting any you cannot answer: whether a language can be taken as a degree in its own right · which languages · at how many institutions, and when that was counted · whether single honours or only combined with something else.'],
      ['linguistics', 'Linguistics', 'text', 'In this order, omitting any you cannot answer: whether linguistics is a degree subject in its own right · at what level, bachelor, master or doctorate · where it sits, its own department or inside languages or education · whether it exists only as modules within another degree.'],
      ['offerings', 'What is offered where', 'offering', 'One row per language or subject: the level it reaches, how many institutions offer it, and the year counted. This is the field the trends page reads, so a row with no year is worth less than no row. Leave `institutions` blank rather than estimate it.'],
      ['mediumOfInstruction', 'Language of instruction', 'text', 'In this order, omitting any you cannot answer: which language degrees are taught in · whether another is permitted and on what condition · in which subjects or institutions · whether this is a rule or observed practice.'],
      ['requiredStudy', 'Compulsory language study', 'text', 'In this order, omitting any you cannot answer: whether every student must study a language whatever their degree · which language · how much of it · who may exempt a student.'],
      ['entryRequirements', 'Entry requirements', 'text', 'In this order, omitting any you cannot answer: whether a school language qualification is needed to enter · which, and at what level · whether a beginners route exists for those without it · who sets the requirement, the state or each institution.'],
      ['teacherPipeline', 'Teacher pipeline', 'text', 'In this order, omitting any you cannot answer: whether higher education trains the school system\'s language teachers · at which institutions · by what route, a degree, a postgraduate qualification or in service · whether places are capped, funded or bursaried.'],
      ['enrolment', 'Enrolment', 'series', 'Students, enrolments or degrees awarded, by year, with the source of each figure and what it counted. Say whether it counts students or course enrolments — they are not the same number.'],
      ['policyHistory', 'Policy history', 'history', 'Dated changes: the act, funding decision, or a department opening or closing, one per row.'],
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
      ['inventory', 'How many languages', 'text', 'How many languages the place has, and who counted them. This is the inventory; the field below is only what the school system names, teaches or recognises, and the gap between them is usually the point.'],
      ['languages', 'The languages', 'languages', 'The languages the SYSTEM engages with, which is nearly always far fewer than the place has. Name, family and typology come from WALS; leave the WALS code blank rather than guess one.'],
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
  // `ling` was a planned domain of its own until the higher-education map was
  // built; it is now the `linguistics` field on `he`, for the reason recorded
  // there. Removed rather than left as a stub, so the nav does not promise a
  // page that will never arrive.
];

for (const d of DOMAINS) {
  d.fields = (d.fields || []).map(([k, label, type, hint]) => [k, label, type || 'text', hint || '']);
}

const LIVE = DOMAINS.filter(d => d.live);
const byId = id => DOMAINS.find(d => d.id === id) || null;

module.exports = { DOMAINS, LIVE, byId };
