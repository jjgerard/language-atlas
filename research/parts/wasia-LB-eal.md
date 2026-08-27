### LB|Lebanon — map: eal
STATUS: documented
SOURCES:
 - label: "UNESCO PEER, Lebanon — Inclusion profile"
   url: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
   http: 200 (retrieved 2026-08-26)
   tier: secondary-source
   caveat: PEER banner states the platform has moved and profiles are no longer updated
 - label: "TIMSS 2019 Encyclopedia, Lebanon country chapter (CRDP / IEA)"
   url: https://timssandpirls.bc.edu/timss2019/encyclopedia/pdf/Lebanon.pdf
   http: 200 (retrieved 2026-08-26)
   tier: official-document

EVIDENCE:
 - field: l1Support
   quote: "Lebanese and non-Lebanese pupils who arrive at an education institution during their schooling benefit from an adaptation: They can receive instruction in their mother tongue - usually dialectal Arabic - up to the third grade."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: newcomerCriteria
   quote: "As no law determines the right to education of the Palestinian students in Lebanon, circulars issued each year by the minister of education and higher education set out conditions and order for enrolment in basic education."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: newcomerCriteria
   quote: "For example, circular 25/M/2014 mentioned 'Palestinian students who have been residing in Lebanon for over three years ... Old and new students to whom there isn't any available UNRWA school within their residency area'."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: newcomerProportion
   quote: "in 2018 the MEHE supported the enrolment of 213,358 refugee children and 209,409 vulnerable Lebanese children in public schools."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: newcomerProportion
   quote: "Over 470,000 refugees are registered with UNRWA in Lebanon. About 45% of them live in the country's 12 refugee camps."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: l2Support
   quote: "In all primary schools, the teaching of written (classical) Arabic remains compulsory, with an average time commitment of seven hours per week."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: l2Support
   quote: "In nursery schools, the teaching of Arabic or any other language is not compulsory."
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: bilingualEducationNotes
   quote: "The teaching of mathematics and science in public and private schools is conducted in one of three languages--Arabic, English, or French--throughout the first and second cycles of basic education. In the third and fourth cycles, teaching is conducted in a foreign language (French or English)."
   source: https://timssandpirls.bc.edu/timss2019/encyclopedia/pdf/Lebanon.pdf
 - field: policyHistory
   quote: "The MEHE carried out a three-year programme starting in 2014 entitled Reaching All Children with Education (RACE, or RACE I) whose main objective was to serve vulnerable school-aged children (ages 3-18) affected by the Syrian crisis"
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion
 - field: policyHistory
   quote: "A s part of the Reaching All Children with Education (RACE II) programme, every day at school, around 24,000 Lebanese and non-Lebanese children receive healthy snacks"
   source: https://education-profiles.org/northern-africa-and-western-asia/lebanon/~inclusion

NEGATIVE:
 - Term-count over retrieved PEER Lebanon profile text: "newcomer" = 0, "second language" = 0,
   "mother tongue" = 1. Sanity checks on the same file: "education" = 1110, "school" = 253.
   Extraction verified. Lebanon has no named additional-language designation; entitlements
   run through annual ministerial circulars and the RACE programme instead.
 - The retrieved PEER profile does not describe the second-shift ("double-shift") schools by
   that name. I did not retrieve a RACE II source document in this session, so the second-shift
   arrangement is NOT evidenced here and should not be asserted from this report.

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - Set by annual ministerial circular, not by statute
     - "no law determines the right to education of the Palestinian students in Lebanon"
     - Circular 25/M/2014 keys Palestinian enrolment to over three years residence
     - Also covers pupils with no UNRWA school available in their residency area
 - field: l1Support
   bullets:
     - "They can receive instruction in their mother tongue ... up to the third grade"
     - Applies to Lebanese and non-Lebanese pupils arriving mid-schooling
     - Mother tongue here means dialectal Arabic, not a migrant language
 - field: l2Support
   bullets:
     - Written classical Arabic compulsory in all primary schools
     - Average time commitment seven hours per week
     - Nursery schools have no compulsory language of teaching at all
 - field: l3Support
   bullets:
     - Maths and science switch to French or English in cycles 3 and 4
     - Cycles 1-2 may teach them in Arabic, English or French
     - Arrivals therefore face Standard Arabic and a European medium together
 - field: newcomerProportion
   bullets:
     - 2018: MEHE enrolled 213,358 refugee children in public schools
     - Alongside 209,409 vulnerable Lebanese children the same year
     - Over 470,000 refugees registered with UNRWA, 45% in the 12 camps
 - field: policyHistory
   bullets:
     - 2014 RACE I launched for children affected by the Syrian crisis
     - 2014 circular 25/M/2014 sets Palestinian enrolment conditions
     - RACE II continues it, with school feeding reaching 24,000 children
