### CV|Cape Verde
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Cabo Verde — Inclusion (archived site; 'Last modified: Mon, 02/08/2021')"
   url: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Mon, 02/08/2021 - 22:17".

ASSIGNED GAPS: eal.l1Support, eal.l2Support, dld.serviceModel,
               fl.primaryRequirement, fl.regionalMinorityLanguages
 dld.serviceModel is well answered. The four language fields are essentially NEGATIVE.

EVIDENCE (dld.serviceModel):
 - field: dld.serviceModel
   quote: "The 2010 LBSE states that special education shall be taught preferably in regular education establishments. It promotes the integration in regular classes of children and young people with special education needs while taking into account their specific needs. Support is provided to teachers, parents and others involved in their education."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
 - field: dld.serviceModel
   quote: "Special education will be taught in specific institutions only when the degree of disability justifies it."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
 - field: dld.serviceModel
   quote: "government efforts to support inclusive education focus on the creation and maintenance of six multifunctional resource rooms located on the islands of Santiago (Praia and Santa Cruz), São Vicente, Santo Antão (Porto Novo), Fogo and Sal. The creation of three more rooms is planned in the Santiago Norte region, at Mosteiros on the island of Fogo and in Ribeira Grande of Santo Antão."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
 - field: dld.serviceModel (limits)
   quote: "the lack of consistent legislation on disability, the absence of a system for identifying and diagnosing students with special education needs and the lack of a national policy on inclusive education mean that children with special education needs do not always benefit from an education adapted to their needs."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
 - field: dld.serviceModel (workforce)
   quote: "a master’s course in special education began in March 2007 soon after the creation of the University of Cabo Verde in 2006. However, there is no policy or programme related to preparing teachers or school employees for inclusive education."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion

EVIDENCE (language fields) — one line only:
 - field: fl.regionalMinorityLanguages
   quote: "The plan seeks to enhance national languages, promote a culture of gender equality and nonviolence, promote research and innovation using ICT and promote the quality, transparency and efficiency of the education system."
   source: https://education-profiles.org/sub-saharan-africa/cabo-verde/~inclusion
   comment: "the plan" is the 2017-21 Strategic Education Plan of Cabo Verde. This is the
            ONLY occurrence of the word "language" in the whole profile. It names no
            language and specifies no school provision.

EVIDENCE OF ABSENCE (eal.l1Support, eal.l2Support, fl.primaryRequirement,
                     fl.regionalMinorityLanguages beyond the line above):
 The Cabo Verde profile has NO "Ethnicity and languages" section. Its "Laws, Plans,
 Policies and Programmes" section is subdivided into "Disability" and "Gender" only.
 Term counts on harvest/CV_body.txt (19,567 chars):
   grep -oi "language"       -> 1   (the sentence quoted above)
   grep -oi "creole"         -> 0   (Cabo Verdean Creole is never mentioned)
   grep -oi "Portuguese"     -> 0   (the language of schooling is never named)
   grep -oi "mother tongue"  -> 0
   grep -oi "bilingual"      -> 0
   grep -oi "instruction"    -> 0
   grep -oi "ethnic"         -> 0
   SANITY CHECK: grep -oi "school" -> 27, "education" appears throughout
 A "Portuguese" count of zero on a Portuguese-medium system is the clearest signal that
 this profile simply does not treat language.

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived; PEER names no speech service
     - 2010 LBSE: special education taught preferably in regular education establishments
     - Six multifunctional resource rooms across Santiago, Sao Vicente, Santo Antao, Fogo, Sal
     - PEER cites absence of a system for identifying and diagnosing special education needs
 - field: fl.regionalMinorityLanguages
   bullets:
     - PEER profile 2021 mentions language once and names no language
     - 2017-21 Strategic Education Plan "seeks to enhance national languages"
     - Cabo Verdean Creole is not mentioned anywhere in the profile
 - field: fl.primaryRequirement
   bullets:
     - PEER inclusion profile states no primary language requirement for Cabo Verde
     - Profile does not name Portuguese or any language as a school subject
 - field: eal.l1Support
   bullets:
     - PEER profile 2021 records no home-language provision for Cabo Verde
     - Profile has no ethnicity or languages section, only disability and gender
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Portuguese, the language of schooling, is not mentioned in the profile at all

POLICY HISTORY ROWS:
 - year: 1990
   description: 1990 LBSE determines that integration of children with disabilities be promoted where advantageous for their education
 - year: 2006
   description: University of Cabo Verde created
 - year: 2007
   description: Master's course in special education begins, March 2007
 - year: 2010
   description: 2010 LBSE provides that special education be taught preferably in regular education establishments
 - year: 2012
   description: Humanity & Inclusion report "Good Practices in Inclusive Education of Children with Disabilities in Cape Verde" documents four inclusive schools
 - year: 2017
   description: Strategic Education Plan 2017-21 adopted, seeking to enhance national languages and strengthen teacher training
