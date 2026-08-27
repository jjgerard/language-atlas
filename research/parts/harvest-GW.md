### GW|Guinea-Bissau
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Guinea-Bissau — Inclusion, sections 'School Organization' and 'Linguistic and ethnic minorities' (archived site; 'Last modified: Fri, 10/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Fri, 10/09/2021 - 10:12".

ASSIGNED GAPS: eal.l1Support, eal.l2Support, dld.serviceModel,
               fl.languagesOffered, fl.upperSecondary

EVIDENCE:
 - field: eal.l1Support / fl.languagesOffered (the whole language section)
   quote: "According to the 2017–25 education sector plan 82% of the population of Guinea-Bissau belongs to 5 ethnic groups: Fula, Balanta, Mandinga, Manjaco and Papel. Portuguese is the official language of the country; however, it is only spoken by officials and a small segment of the population. Creole is the most widely used language in the country."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
 - field: eal.l1Support / fl.languagesOffered (the one policy commitment)
   quote: "The National Literacy and Non-Formal Education Policy, developed within the framework of the education sector programme, seeks to develop a language policy document and promote Portuguese, Creole and national languages as languages of education, learning and professional qualification."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
   comment: NOTE THE TENSE. The policy "seeks to develop a language policy document" — i.e.
            PEER records Guinea-Bissau as not yet having a language policy document. That is
            the single most useful fact in this section and should not be softened.
 - field: eal.l2Support (nearest thing to Portuguese-language support)
   quote: "About US$15 million will be invested between 2018 and 2023 in a project that seeks to improve the quality of learning and the capacity of teachers at the primary level and to promote community participation in the administration of schools. Likewise, it seeks to make modifications to the curriculum and improve the learning results of students in mathematics and Portuguese."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
   comment: a GPE / World Bank attainment project in Portuguese as a curriculum subject —
            NOT a designated additional-language support programme.
 - field: dld.serviceModel (statutory placement rule)
   quote: "According to the 2010 Basic Education Law of Guinea-Bissau , special education is intended for children and adolescents who are physically and/or mentally handicapped and for those who are gifted. Special education is to be carried out in regular education establishments as well as in specific establishments depending on the type and degree of disability and the student’s rhythm of learning."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
 - field: dld.serviceModel (what is provided alongside)
   quote: "Accompaniment and pedagogical complements are to be provided for students with special school needs."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
 - field: dld.serviceModel (who may deliver it)
   quote: "It is established that the qualification for teaching in special education belongs to early childhood educators and teachers who have satisfactorily completed the special courses, or the courses given in specialized training schools."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion
 - field: context (madrasa sector)
   quote: "Denominational schools such as madrasas are recognized by the state as special modalities of formal education."
   source: https://education-profiles.org/sub-saharan-africa/guinea-bissau/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 Term counts on harvest/GW_body.txt (15,502 chars):
   grep -oi "speech"          -> 0
   grep -oi "therap"          -> 0
   grep -oi "resource room"   -> 0
   grep -oi "itinerant"       -> 0
   grep -oi "bilingual"       -> 0
   grep -oi "mother tongue"   -> 0
   grep -oi "instruction"     -> 0
   grep -oi "second language" -> 0
   grep -oi "newcomer"        -> 0
   grep -oi "upper secondary" -> 0
   SANITY CHECK: grep -oi "language" -> 5, grep -oi "Portuguese" -> 3,
                 grep -oi "Creole" -> 2, grep -oi "school" -> 28
 - field: dld.serviceModel — the delivery route is stated (regular or specific
   establishments, teacher-delivered) but NO therapy profession of any kind appears.
 - field: eal.l2Support — the profile establishes that Portuguese is spoken by "officials
   and a small segment of the population", i.e. that most pupils arrive without the official
   language, and then describes NO support designation for them. No newcomer or
   additional-language category exists in the source.
 - field: fl.upperSecondary — NOT ANSWERED. grep -oi "secondary" -> 3, none of them a
   language rule. Nothing on whether language study continues, becomes optional, or is
   required to leave school.
 - field: fl.languagesOffered — only partly answered: the profile names Portuguese, Creole
   and "national languages" as intended languages OF education, and names five ethnic groups
   but not their languages. It names no language taught as a foreign-language subject.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Portuguese official but PEER: spoken only by officials and a small part of the population
     - Creole is the most widely used language in the country
     - Literacy policy seeks Portuguese, Creole and national languages as languages of education
 - field: fl.languagesOffered
   bullets:
     - PEER records Guinea-Bissau as still seeking to develop a language policy document
     - Portuguese, Creole and national languages named as intended languages of education
     - Five ethnic groups named, Fula, Balanta, Mandinga, Manjaco and Papel, languages not named
     - No foreign-language subject named anywhere in the profile
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Most pupils arrive without Portuguese, yet no support category is described
     - GPE and World Bank project 2018-2023 targets attainment in maths and Portuguese
 - field: dld.serviceModel
   bullets:
     - PEER profile 2021 describes no speech or language therapy service in the country
     - 2010 Basic Education Law: special education in regular or specific establishments
     - Placement depends on type and degree of disability and the pupil's rhythm of learning
     - Delivered by early childhood educators and teachers who completed special courses

POLICY HISTORY ROWS:
 - year: 2010
   description: Basic Education Law of Guinea-Bissau; special education in regular or specific establishments, and teacher qualification rules for special education
 - year: 2017
   description: Education sector plan 2017-25 records that 82 per cent of the population belongs to five ethnic groups
 - year: 2018
   description: GPE and World Bank project 2018-2023, about US$15 million, targeting primary teaching quality and attainment in mathematics and Portuguese
 - note: the National Literacy and Non-Formal Education Policy is named without a year in this
   profile, so no policyHistory row is proposed for it.
