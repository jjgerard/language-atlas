### EG|Egypt
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Egypt — Inclusion, section 'Ethnic and linguistic groups' (archived site; 'Last modified: Mon, 02/08/2021')"
   url: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Mon, 02/08/2021 - 11:30".

ASSIGNED GAPS: eal.l1Support, eal.bilingualEducationNotes, eal.l2Support,
               fl.languagesOffered, fl.upperSecondary
 This is the richest language section in my batch: four of the five are answered directly.

EVIDENCE:
 - field: fl.languagesOffered / fl.upperSecondary
   quote: "At the secondary level, pupils must learn a foreign language, either English or French, from the first cycle. In the second cycle, they must choose a second foreign language."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: fl.languagesOffered (primary rule, for contrast)
   quote: "Egyptian school law obliges public primary schools to teach only standard Arabic but allows private schools to teach other languages in addition to official Arabic ."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.l2Support / eal.bilingualEducationNotes (medium of instruction)
   quote: "In fact, instruction is generally delivered in Arabic at all education levels. Some public school curricula and subjects are taught in English."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.bilingualEducationNotes
   quote: "According to the country's new education plan , which is part of Egypt’s Vision 2030 sustainable development strategy , students in all public schools will be taught science, math, geography and history in the Arabic language from kindergarten until the sixth grade ."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.bilingualEducationNotes (higher education)
   quote: "In universities, the system is more flexible, although in principle classical Arabic remains the language of instruction."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.l1Support — THE SOURCE ITSELF STATES THE ABSENCE
   quote: "No mention is made of any of the country’s indigenous languages, such as the Nubian language, spoken widely in the South of Egypt, or the Berber language, spoken mainly in the Siwa Oasis in Western Egypt."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.l1Support (constitutional rule that displaces it)
   quote: "Article 24 states: ‘The Arabic language, religious education, and national history in all its stages are core subjects of pre-university public and private education.’"
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion
 - field: eal.l1Support (international instrument)
   quote: "Egypt adopted the UN Declaration on the Rights of Indigenous Peoples ."
   source: https://education-profiles.org/northern-africa-and-western-asia/egypt/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: eal.l2Support — the medium of instruction is established (Arabic at all levels),
   but NO support mechanism for a pupil who arrives without Arabic is described.
   Term counts on harvest/EG_body.txt (19,223 chars):
     grep -oi "newcomer"        -> 0
     grep -oi "second language"  -> 0
     grep -oi "refugee"          -> 0
     grep -oi "migrant"          -> 0
     grep -oi "mother tongue"    -> 0
     grep -oi "bilingual"        -> 0
     SANITY CHECK: grep -oi "Arabic" -> 7, grep -oi "language" -> 12,
                   grep -oi "school" -> 40
   A "refugee" count of zero in a country hosting large refugee populations is a gap in
   this source, not evidence that no such pupils exist.

DRAFT BULLETS:
 - field: fl.languagesOffered
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Public primary schools obliged by school law to teach only standard Arabic
     - Private schools may teach other languages in addition to official Arabic
     - Secondary pupils take English or French from the first cycle
 - field: fl.upperSecondary
   bullets:
     - Second cycle of secondary requires pupils to choose a second foreign language
     - First foreign language, English or French, starts in the first secondary cycle
     - PEER gives no exemption or opt-out and no leaving-certificate language rule
 - field: eal.bilingualEducationNotes
   bullets:
     - Instruction generally delivered in Arabic at all education levels
     - PEER: "Some public school curricula and subjects are taught in English"
     - Vision 2030 plan: science, maths, geography, history in Arabic from KG to grade 6
     - Universities more flexible, but classical Arabic in principle remains the medium
 - field: eal.l1Support
   bullets:
     - PEER states no indigenous language of Egypt is mentioned in the constitution
     - Nubian and Berber named by PEER as spoken but absent from education provision
     - Constitution art 24 makes Arabic a core subject of all pre-university education
     - Egypt adopted the UN Declaration on the Rights of Indigenous Peoples
 - field: eal.l2Support
   bullets:
     - PEER profile names no newcomer or additional-language designation for Egypt
     - Arabic is the medium at all levels, taught as a core subject, not as a second language
     - No refugee or migrant language provision appears anywhere in the profile

POLICY HISTORY ROWS:
 - year: 1962
   description: Egypt ratifies the UNESCO Convention against Discrimination in Education
 - year: 1981
   description: Law No. 139 of 1981 (Education Law), article 9, allows creation of schools for gifted and for special education
 - year: 2014
   description: 2014 Constitution; article 19 right to education, article 24 makes Arabic, religious education and national history core subjects
 - year: 2014
   description: Ministry of Education education strategic plan 2014-30 defines special education needs and targets out-of-school children
 - year: 2018
   description: Law on the Rights of Persons with Disabilities; article 13 equality rule, article 16 Braille and sign language measures
NOT PROPOSED AS A POLICY HISTORY ROW: Egypt's Vision 2030 strategy (which sets
Arabic-medium teaching of science, maths, geography and history from kindergarten to
grade six). "2030" is its target horizon, not an adoption year, and the profile gives no
adoption date — so no year can be taken from the source without guessing.
