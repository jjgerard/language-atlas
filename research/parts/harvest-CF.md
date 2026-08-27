### CF|Central African Republic
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Central African Republic — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Wed, 08/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/central-african-republic/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 The retrieved page states: "The Profiles Enhancing Education Reviews (PEER) platform has
 moved to a new website, https://www.unesco.org/gem-report/peer , where it now provides
 updated, indicator-based analysis and continuous monitoring. The current website remains
 available for reference; its profiles, linked to earlier GEM Reports, are no longer being
 updated." Profile stamped "Last modified: Wed, 08/09/2021 - 17:58". PEER also records
 "Validated by the country: No".

ASSIGNED GAPS: eal.l1Support, eal.bilingualEducationNotes, eal.l2Support
 — ALL THREE ARE NEGATIVE ON THIS SOURCE, but the negative is informative: the profile
 HAS an "Ethnicity and languages" section and that section is about access and fees,
 not about language at all.

EVIDENCE:
 - field: eal.l1Support
   quote: "The National Education Sector Strategy 2008–2020 aims to increase children’s access to and retention in primary education, particularly for undereducated ethnic minorities, including Fulani and Pygmy children. This will be achieved through awareness-raising actions and by abolishing fees and printing costs."
   source: https://education-profiles.org/sub-saharan-africa/central-african-republic/~inclusion
   comment: this is the ENTIRE content of the profile's "Ethnicity and languages" section.
            The named measures are fee abolition and awareness-raising; no language measure.
 - field: eal.l1Support (constitutional backdrop only)
   quote: "the State ensures greater protection of the rights of minorities, indigenous people and persons with disabilities."
   source: https://education-profiles.org/sub-saharan-africa/central-african-republic/~inclusion
 - field: eal.l1Support (framework act, non-discrimination only)
   quote: "access to education, culture and vocational training is ensured to children and adults, regardless of sex, social standing, ethnicity, religion or political affiliation."
   source: https://education-profiles.org/sub-saharan-africa/central-african-republic/~inclusion

EVIDENCE OF ABSENCE:
 Term counts on the retrieved profile body (harvest/CF_body.txt, 19,788 chars):
   grep -oi "language"       -> 1   (only the section heading "Ethnicity and languages")
   grep -oi "linguistic"     -> 1   (only "cultural, linguistic and ethnic diversity" in
                                     the 2018 PAPT's statement of values)
   grep -oi "mother tongue"  -> 0
   grep -oi "bilingual"      -> 0
   grep -oi "instruction"    -> 0
   grep -oi "sango"          -> 0   (the national language is not mentioned)
   SANITY CHECK: grep -oi "school" -> 37, grep -oi "ethnic" -> 5
 The zero on "instruction" is notable: the profile never states what language CAR schools
 teach in. No newcomer or additional-language designation appears; no bilingual programme
 is described.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived, not validated by the country
     - PEER "Ethnicity and languages" section covers fees and awareness only, not language
     - Named target groups are Fulani and Pygmy children under the 2008-2020 sector strategy
     - Profile records no provision in a pupil's home language
 - field: eal.bilingualEducationNotes
   bullets:
     - PEER profile 2021 describes no bilingual or two-language programme for CAR
     - Word "bilingual" does not occur anywhere in the profile
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Profile never states the language of instruction in Central African schools
     - No support described for pupils arriving without the school language

POLICY HISTORY ROWS:
 - year: 1997
   description: Framework Act No. 97/014 of 10 December 1997 on national education guarantees access regardless of ethnicity
 - year: 2008
   description: National Education Sector Strategy 2008-2020 targets access for ethnic minorities including Fulani and Pygmy children
 - year: 2016
   description: Constitution promulgated, article 9 right to education and article 6 protection of minorities and indigenous people
 - year: 2018
   description: Support Programme for the Central African Education System's Transition Plan (PAPT) commits to cultural, linguistic and ethnic diversity
