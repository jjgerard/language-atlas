### GA|Gabon
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Gabon — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Fri, 03/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Fri, 03/09/2021 - 11:19".

ASSIGNED GAPS: eal.l1Support, eal.bilingualEducationNotes, eal.l2Support,
               fl.languagesOffered, fl.primaryRequirement, fl.upperSecondary

EVIDENCE:
 - field: eal.l1Support (constitutional rule)
   quote: "Article 2 of the Constitution states that the State shall adopt French as the official working language and shall promote the national languages in the education system."
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
 - field: eal.l1Support (statutory duty on curricula)
   quote: "article 5 of Act No. 21/2011 of 11 February 2012 on general guidelines for education, training and research stipulates that \"curricula, training provision, infrastructure, and teaching and training facilities must, to this end, allow the appropriation of knowledge and skills in [...] local languages at the various levels.\""
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
 - field: eal.l1Support (the language communities)
   quote: "The population is made up of Pygmy people and Bantu people – who are in the majority (p. 27). The latter include several ethnic groups including nine main ethnolinguistic groups: the Fangs, the Mpongwé, the Mbédé, the Punu, the Bandjabi, the Bakota, the Obamba and the Batéké."
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
   NOTE FOR THE EDITOR: the profile says "nine main ethnolinguistic groups" and then lists
   eight names. The discrepancy is in the source. Quote it, do not silently repair it.
 - field: fl.languagesOffered / fl.upperSecondary
   quote: "The 2010 National Forum recommended introducing a second foreign language in grade 6 (the first year of secondary school)."
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
   comment: a RECOMMENDATION of a forum, not an enacted rule, and it lands at the first
            year of SECONDARY, not in primary. It also implies a first foreign language
            already exists, but the profile never names either language.
 - field: eal.l1Support (Pygmy literacy programme)
   quote: "The State prioritizes the education of Pygmy people and has taken various steps to launch a tailored programme to teach this community to read and write. This initiative aimed to halve the illiteracy rate among Pygmy adults."
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
 - field: context (compulsory schooling, including non-nationals)
   quote: "Article 2 of this act reiterates that \"education and training in Gabon are compulsory\" and access to them is provided \"to all young people, whether Gabonese or foreigners residing in Gabon, aged between 3 and 16 years.\""
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
   comment: the nearest thing in the profile to a newcomer rule — it is an ACCESS rule for
            foreign residents, with no language support attached.

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: fl.primaryRequirement — NOT ANSWERED, and the one dated proposal points the other
   way: the only language-subject proposal in the profile starts at "grade 6 (the first year
   of secondary school)". grep -oi "grade" -> 1 (that sentence). No primary language subject
   requirement, no starting age, no rule.
 - field: fl.languagesOffered — only partly answered. NO LANGUAGE IS NAMED as a school
   subject anywhere. grep -oi "foreign language" -> 1 (the forum recommendation).
   French appears only as "the official working language" and, separately, as the site's
   own language selector.
 - field: fl.upperSecondary — NOT ANSWERED. grep -oi "upper secondary" -> 0;
   grep -oi "secondary" -> 6, of which the relevant one is the grade-6 recommendation and
   the rest are parity statistics, teacher-training colleges and a resource title. No rule
   on continuing, dropping or requiring language study to leave school.
 - field: eal.bilingualEducationNotes — NOT ANSWERED. grep -oi "bilingual" -> 0.
   No programme teaching content through two languages is described.
 - field: eal.l2Support — NOT ANSWERED. grep -oi "language of instruction" -> 0;
   grep -oi "mother tongue" -> 0; grep -oi "newcomer" -> 0; grep -oi "second language" -> 0.
   grep -oi "instruction" -> 1, and it is "the right to equal access to education,
   instruction, culture and training", not a medium-of-instruction clause.
   SANITY CHECK: grep -oi "language" -> 6, grep -oi "school" -> 22.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Constitution art 2: French is the official working language, national languages promoted
     - Act No. 21/2011 art 5: curricula must allow knowledge and skills in local languages
     - PEER names nine main ethnolinguistic groups among the Bantu majority
 - field: fl.languagesOffered
   bullets:
     - PEER names no language taught as a school subject in Gabon
     - 2010 National Forum recommended a second foreign language from grade 6
     - Act No. 21/2011 art 5 requires local languages at the various levels
 - field: fl.primaryRequirement
   bullets:
     - PEER records no compulsory language subject in Gabonese primary school
     - The only language proposal starts at grade 6, the first year of secondary
     - Schooling compulsory ages 3 to 16 for Gabonese and foreign residents alike
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
 - field: eal.bilingualEducationNotes
   bullets:
     - PEER profile 2021 describes no bilingual programme for Gabon
     - The word "bilingual" does not occur anywhere in the profile
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Profile never uses the phrase language of instruction for Gabon
     - Foreign residents aged 3 to 16 have a right of access, with no language support attached

BONUS EVIDENCE (dld.serviceModel — not in my gap list):
 - field: dld.serviceModel
   quote: "This school is responsible for educating children with hearing impairments and ensures their psychosocial development by offering specialized social services (psychologists, psychomotor specialists,"
   source: https://education-profiles.org/sub-saharan-africa/gabon/~inclusion
   comment: the sentence continues past the extract boundary; re-read the page before using.

POLICY HISTORY ROWS:
 - year: 1966
   description: Act No. 16/66 provides that education be given regardless of race, religion, ethnicity, sex or social background
 - year: 1982
   description: National School for the Hearing-Impaired founded by an American pastor with the Evangelical Church of Gabon
 - year: 1985
   description: Order 0012/MASSSBE/DGAS of 5 November 1985 places the school for deaf children under ministry supervision
 - year: 1989
   description: School becomes the National School for Hearing Impaired Children (ENEDA); ministries sign a memorandum of understanding
 - year: 1991
   description: Constitution adopted (revised 2011); guarantees equal access to education and training, not an express right to education
 - year: 1996
   description: Fondation Horizons Nouveaux inaugurated; recognized as of public benefit in 1998 with a state budget line
 - year: 2007
   description: Gabon ratifies the UN Convention on the Rights of Persons with Disabilities
 - year: 2010
   description: National Forum on Education recommends specialized establishments and a second foreign language from grade 6
 - year: 2010
   description: Decree on access to public buildings for persons with disabilities issued in January 2010
 - year: 2012
   description: Act No. 21/2011 on general guidelines for education adopted 14 February 2012; art 2 compulsory education ages 3-16, art 5 local languages in curricula
 - note: the profile states Gabon "has not ratified the Convention against Discrimination in Education".
 - CAUTION, INTERNAL CONTRADICTION IN THE SOURCE: the profile dates the same instrument
   twice and differently — "Act No. 21/2011 on general guidelines for education, training
   and research was adopted on 14 February 2012" in one paragraph, and "Act No. 21/2011 of
   11 February 2012" in the Ethnicity and languages paragraph. Use the year 2012 only; do
   not pick a day from this source.
