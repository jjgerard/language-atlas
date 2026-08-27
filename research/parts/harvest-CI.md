### CI|Ivory Coast
STATUS: not-found (for the assigned fields)

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Côte d'Ivoire — Inclusion (archived site; 'Last modified: Thu, 09/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/cote-divoire/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Thu, 09/09/2021 - 10:31".

ASSIGNED GAPS: eal.l1Support, eal.l2Support — BOTH NEGATIVE ON THIS SOURCE.

EVIDENCE OF ABSENCE:
 Unlike most of its francophone neighbours' PEER profiles, the Côte d'Ivoire inclusion
 profile has NO "Ethnicity and languages" section. Its "Laws, plans, policies and
 programmes" section is subdivided only into:
   "Persons with disabilities" / "Gender" / "Rural areas"

 Term counts on the retrieved profile body (harvest/CI_body.txt, 15,473 chars):
   grep -oi "language"      -> 3, and ALL THREE are "sign language"
                                 (grep -oi "sign language" -> 3)
   grep -oi "mother tongue" -> 0
   grep -oi "bilingual"     -> 0
   grep -oi "instruction"   -> 0
   grep -oi "ethnic"        -> 1 (a non-discrimination clause, quoted below)
   grep -oi "French"        -> 3, of which 2 are ministry/policy prose containing the
                                 string and 1 is the site language selector; none is a
                                 statement about French as the school language
   SANITY CHECK: grep -oi "school" -> 37
 So the profile contains no statement about home-language provision, and no statement
 about teaching French as the language of schooling. This is a real zero.

 The only ethnicity-related provision is a non-discrimination clause:
 - field: eal.l1Support
   quote: "Article 5, paragraph 6, of order 0111/MENET/CAB of 24 December 2014 prohibits \"all forms of discrimination, notably those based on the ethnicity, religion, race, social situation, gender and disability of the student\""
   source: https://education-profiles.org/sub-saharan-africa/cote-divoire/~inclusion

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, site archived and no longer updated
     - PEER profile has no ethnicity or languages section for Cote d'Ivoire
     - No provision in a pupil's home language is recorded anywhere in the profile
     - Only ethnicity clause is the 2014 order banning discrimination by ethnicity
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Every use of the word "language" in the profile is "sign language"
     - No support described for pupils arriving without French

POLICY HISTORY ROWS:
 - year: 2014
   description: Order 0111/MENET/CAB of 24 December 2014, article 5, bans discrimination in school by ethnicity, religion, race, gender or disability
 - year: 2017
   description: Minister of Education calls for children with disabilities to be fully integrated into mainstream classes
 - year: 2017
   description: Inclusive Education project begins in Agneby-Tiassa, supporting pupils with hearing impairments through sign language teaching
