### GM|Gambia
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Gambia — Inclusion, section 'Ethnic and linguistic groups' (archived site; 'Last modified: Mon, 09/08/2021')"
   url: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Mon, 09/08/2021 - 15:21".

ASSIGNED GAPS: eal.bilingualEducationNotes, eal.l2Support,
               fl.languagesOffered, fl.primaryRequirement, fl.upperSecondary

EVIDENCE:
 - field: eal.bilingualEducationNotes / fl.primaryRequirement
   quote: "English is the formal language of instruction, although about 10 indigenous languages are used in informal contexts across the country. The 2004–15 education policy promoted the use of the local language during the first three years of basic education and as a school subject onwards."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
 - field: fl.languagesOffered
   quote: "The policy intended to introduce the teaching of the five most commonly used languages and to expand the current language pilot programme."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
   comment: "intended" — the profile does not say the five were introduced, and does not
            name them.
 - field: fl.languagesOffered (implementation reached)
   quote: "In compliance with the policy provisions , the Ministry of Basic and Secondary Education (MoBSE) has developed and validated training manuals on orthographies of the five languages and established a national technical advisory committee on national languages."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
 - field: eal.bilingualEducationNotes (Arabic-medium sector)
   quote: "Besides the public school system, education is provided in madrasas, Arabic schools with an emphasis on Islamic education. The 2016–30 education sector policy reaffirms the government’s intention to continue supporting these education institutions and to explore access opportunities for madrasa graduates in tertiary and higher education."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
 - field: context (non-discrimination on language)
   quote: "It also contains a non-discrimination provision, addressing discrimination on the grounds of ‘race, colour, gender, language, religion, political or other opinion, national or social origin, property, birth or other status’ (Section 33[4])."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: eal.l2Support — NOT ANSWERED. The Gambia IS an English-medium system, so "EAL"
   would be the right register here if the source used it — IT DOES NOT.
   Word-boundary counts on harvest/GM_body.txt (19,026 chars):
     grep -owi "EAL"                   -> 0
     grep -oi  "english as a"          -> 0
     grep -oi  "additional language"   -> 0
     grep -oi  "second language"       -> 0
     grep -oi  "ESL"                   -> 0
     grep -oi  "newcomer"              -> 0
     grep -oi  "mother tongue"         -> 0
     grep -oi  "bilingual"             -> 0
   CAUTION FOR ANYONE REPEATING THIS CHECK: a bare `grep -oi "EAL"` returns 7 on this file
   because it matches inside "health", "deal", "real" and similar. Use -w. The word-boundary
   count is the real one, and it is zero.
     SANITY CHECK: grep -oi "language" -> 8, grep -oi "school" -> 32.
   So the profile establishes English as the medium and describes NO support for a pupil
   who arrives without it.
 - field: fl.upperSecondary — NOT ANSWERED. grep -oi "upper secondary" -> 0;
   grep -oi "senior secondary" -> 0; grep -oi "secondary" -> 6, all being the ministry name,
   fee-free policy, a resource title or itinerant-teacher deployment. The local-language
   provision is described as running "as a school subject onwards" from year 4 of basic
   education, with no statement about whether it continues, becomes optional, or is required
   to leave school.
 - field: fl.languagesOffered — only partly answered: the number five is given, the names
   are not; the "about 10 indigenous languages" are described as used "in informal contexts",
   not as school subjects.

DRAFT BULLETS:
 - field: eal.bilingualEducationNotes
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Local language used for the first three years of basic education, then a subject
     - English is the formal language of instruction from year four onwards
     - Madrasas run as Arabic schools alongside the public system, state-supported
 - field: fl.primaryRequirement
   bullets:
     - Local language is the medium for the first three years of basic education
     - It becomes a school subject from year four under the 2004-15 education policy
     - PEER gives no starting age and does not say the subject is compulsory
 - field: fl.languagesOffered
   bullets:
     - PEER gives a count, not names: "the five most commonly used languages"
     - MoBSE validated training manuals on orthographies of the five languages
     - About 10 indigenous languages used informally, not as school subjects
     - Arabic taught in the madrasa sector, which the state continues to support
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 uses no EAL, ESL or additional-language term for the Gambia
     - English named as the formal language of instruction, with no support route described
     - National technical advisory committee on national languages established by MoBSE

BONUS EVIDENCE (dld.serviceModel — not in my gap list, but this is an unusually concrete
delivery model and worth banking):
 - field: dld.serviceModel
   quote: "The 2009–15 Special Needs Education and Inclusive Policy Framework reinforced the profile of itinerant teachers to support inclusive education of all children, as introduced in the 2004–15 education sector policy . The latter set among its priorities the integration of children with hearing impairments, visual impairments and mild intellectual and development disorders through an itinerant teaching programme and, with this purpose, 143 itinerant teachers have already been trained."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion
 - field: dld.serviceModel
   quote: "Itinerant teachers are now expected to be assigned to a group of children across mainstream pre-, basic and secondary schools to provide instructional support to all learners with special needs."
   source: https://education-profiles.org/sub-saharan-africa/gambia/~inclusion

POLICY HISTORY ROWS:
 - year: 1997
   description: Constitution of the Republic of the Gambia, amended 2000; section 30 free compulsory basic education, section 33(4) bans discrimination including on language
 - year: 2004
   description: Education sector policy 2004-15 promotes local-language medium for the first three years of basic education and as a subject thereafter, and introduces itinerant teachers
 - year: 2009
   description: Special Needs Education and Inclusive Policy Framework 2009-15 adopts the UNESCO definition of inclusive education and reinforces itinerant teaching
 - year: 2016
   description: Education sector policy 2016-30 reaffirms support for madrasas and access routes for madrasa graduates to tertiary education
