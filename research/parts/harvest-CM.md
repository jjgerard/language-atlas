### CM|Cameroon
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Cameroon — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Wed, 08/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Wed, 08/09/2021 - 12:43".

ASSIGNED GAPS: eal.l1Support, eal.l2Support, fl.upperSecondary

EVIDENCE:
 - field: eal.l1Support
   quote: "Minorities are integrated into the Anglophone or Francophone education system."
   source: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion
 - field: eal.l1Support
   quote: "Since the adoption of the Education Framework Act No. 98/004 of 14 April 1998, native languages have increasingly been integrated into the official curricula."
   source: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion
 - field: eal.l1Support
   quote: "This framework act aims to facilitate learners’ understanding of their own and other cultures. It aims to enable students to learn to read, write and speak various languages fluently."
   source: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion
 - field: eal.l1Support (constitutional/statutory backdrop)
   quote: "the State shall ensure that everyone has equal opportunities for access to education without discrimination on grounds of sex; political, philosophical and religious views; or social, cultural, linguistic or geographical origin."
   source: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion
 - field: eal.l1Support (indigenous populations)
   quote: "the Constitution ensures the \"protection of minorities\" and upholds the rights of indigenous populations in accordance with the law."
   source: https://education-profiles.org/sub-saharan-africa/cameroon/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: eal.l2Support
   The profile describes placement into one of two systems ("the Anglophone or Francophone
   education system") but describes NO support for a pupil who arrives without the language
   that system teaches in. Term counts on harvest/CM_body.txt (18,431 chars):
     grep -oi "instruction"   -> 0   (the profile never uses "language of instruction")
     grep -oi "mother tongue" -> 0
     grep -oi "bilingual"     -> 0
     grep -oi "language"      -> 5   (1 = "sign language", 1 = "native languages",
                                      1 = "various languages", plus the section heading)
     SANITY CHECK: grep -oi "school" -> 32, grep -oi "disabilit" (many, see profile)
   No newcomer or additional-language designation appears.
 - field: fl.upperSecondary
   Not answered. grep -oi "upper secondary" -> 0; grep -oi "secondary" -> 6, all of them
   the Ministry of Secondary Education, a teacher-training college, or a resource title.
   The profile states no language requirement at upper secondary and no leaving rule.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, site archived and no longer updated
     - PEER: minorities are integrated into the Anglophone or Francophone education system
     - Native languages increasingly in official curricula since Education Framework Act 98/004
     - Act aims to let pupils read, write and speak various languages fluently
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation for Cameroon
     - Profile never uses the phrase language of instruction
     - No support described for a pupil placed in a system whose language they lack
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
     - Every mention of secondary in the profile is a ministry or college name

POLICY HISTORY ROWS:
 - year: 1996
   description: Constitution recognizes the right to education and the protection of minorities and indigenous populations
 - year: 1998
   description: Education Framework Act No. 98/004 of 14 April 1998; native languages increasingly integrated into official curricula since its adoption
 - year: 2015
   description: National Plan of Action for the Promotion and Protection of Human Rights 2015-2019 recognizes free compulsory primary education regardless of disability
 - year: 2015
   description: Cameroon Inclusive Special Education Teacher Training and Empowerment Programme begins training professionals, including sign language and Braille transcribers
 - year: 2018
   description: Teacher training partnership agreement between the Ministry of Secondary Education and Sightsavers, May 2018, covering ethnic minority and displaced children
