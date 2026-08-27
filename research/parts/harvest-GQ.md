### GQ|Equatorial Guinea
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Equatorial Guinea — Inclusion, sections 'School Organization' and 'Ethnic and linguistic groups/indigenous population' (archived site; 'Last modified: Thu, 02/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Thu, 02/09/2021 - 18:57"; "Validated by the
 country: No".

ASSIGNED GAPS: eal.l1Support, eal.bilingualEducationNotes, eal.l2Support,
               dld.serviceModel, fl.primaryRequirement, fl.upperSecondary
 dld.serviceModel is well answered. The five language fields are thin to empty: the
 profile's ENTIRE "Ethnic and linguistic groups/indigenous population" section is TWO
 SENTENCES, both quoted in full below.

EVIDENCE (dld.serviceModel):
 - field: dld.serviceModel (statutory route)
   quote: "Section 8 of the 2007 General Education Law regulates special education in Equatorial Guinea. It states that the Ministry of Education, Science and Sports shall provide the necessary resources for students with temporary or permanent SEN to achieve the general goals set for all students in the education system. The needs of SEN students are assessed by teams of professionals with different specialties. These professionals should design study plans tailored to individual students’ needs."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
 - field: dld.serviceModel (placement rule)
   quote: "Students are only placed in special education units or centres when their needs cannot be met in a mainstream education centre. The law stipulates periodic reviews of students’ progress so that students can be integrated in mainstream schools where possible."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
 - field: dld.serviceModel (what actually exists — private, tiny, urban)
   quote: "there is a private educational institution providing special education to 17 students via a specialized classroom. There are two private sector institutions across the island and mainland regions (one in Malabo and one in Bata) that cater to deaf children. There are no teachers with training from the Ministry of Education in the interior of the country, so people with SEN are usually cared for at home in this region."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
 - field: dld.serviceModel (the three centres named)
   quote: "the Manos Felices Private Centre in the city of Bata which cares for deaf children, the Virgin Mary of Africa Private Centre in the city of Malabo which cares for 17 children with various SENs in a specialized classroom, and the Red Cross Private Centre in the city of Malabo which cares for deaf children and children who are hard of hearing."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
 - field: dld.serviceModel (workforce)
   quote: "The UNICEF Situation Analysis of Special Education in Equatorial Guinea states that the majority of teachers are not trained to work with SEN students, with only 2 per cent having completed such training."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion

EVIDENCE (language fields) — the section in full:
 - field: eal.l1Support / fl.primaryRequirement
   quote: "The Constitution lists the official languages of the Republic of Equatorial Guinea as Spanish, French and any others established by law. Indigenous languages are recognized as part of national culture."
   source: https://education-profiles.org/sub-saharan-africa/equatorial-guinea/~inclusion
   comment: that is the whole section. Indigenous languages are recognised as CULTURE, not
            as a medium or a subject. No school provision follows.

EVIDENCE OF ABSENCE:
 Term counts on harvest/GQ_body.txt (21,981 chars):
   grep -oi "language"        -> 2  (both in the two sentences quoted above)
   grep -oi "Spanish"         -> 2  (one is the site language selector)
   grep -oi "bilingual"       -> 0
   grep -oi "mother tongue"   -> 0
   grep -oi "instruction"     -> 0
   grep -oi "second language" -> 0
   grep -oi "newcomer"        -> 0
   grep -oi "upper secondary" -> 0
   grep -oi "speech"          -> 0
   grep -oi "therap"          -> 0
   grep -oi "resource room"   -> 0
   grep -oi "itinerant"       -> 0
   SANITY CHECK: grep -oi "school" -> 25, grep -oi "SEN" appears throughout Section 8 prose
 - field: eal.bilingualEducationNotes — NOT ANSWERED, zero occurrences of "bilingual".
 - field: eal.l2Support — NOT ANSWERED. No newcomer or additional-language designation; the
   profile never says which language schools teach in.
 - field: fl.upperSecondary — NOT ANSWERED. grep -oi "secondary" -> 5; the only structural
   statement is the 2007 law's "two-grade baccalaureate with various study options,
   including vocational training", which carries no language requirement.
 - field: fl.primaryRequirement — NOT ANSWERED beyond the constitutional list of official
   languages; no compulsory language subject, no age, no rule.
 - The dld.serviceModel evidence contains NO speech or language therapy at all: the model
   is a statutory assessment team plus three private centres, two of them deaf-specific.

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - PEER profile 2021 describes no speech or language therapy service in the country
     - 2007 General Education Law s8: needs assessed by teams of professionals, tailored plans
     - Special units used only where needs cannot be met in a mainstream centre
     - Provision in practice is three private centres in Malabo and Bata, two deaf-specific
 - field: eal.l1Support
   bullets:
     - PEER "Ethnic and linguistic groups" section for Equatorial Guinea is two sentences
     - Constitution lists Spanish, French and any others established by law as official
     - Indigenous languages recognised as part of national culture, not as school provision
 - field: eal.bilingualEducationNotes
   bullets:
     - PEER profile 2021 describes no bilingual programme for Equatorial Guinea
     - The word "bilingual" does not occur anywhere in the profile
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Profile never states which language Equatoguinean schools teach in
 - field: fl.primaryRequirement
   bullets:
     - PEER records no compulsory language subject in primary and gives no starting age
     - Primary education compulsory and free under Constitution article 24
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
     - 2007 law set a two-grade baccalaureate with study options, no language condition

POLICY HISTORY ROWS:
 - year: 1995
   description: General Education Law enacted
 - year: 2007
   description: General Education Law amended 30 October 2007; extends primary to six grades, creates four-year basic secondary and a two-grade baccalaureate; section 8 regulates special education
 - year: 2012
   description: Constitution enacted 16 February 2012; article 24 compulsory free primary education, article 15 bans tribal and ethnic discrimination
 - year: 2015
   description: UNICEF Situation Analysis of Special Education in Equatorial Guinea documents three private centres and 2 per cent of teachers trained for SEN
