### DZ|Algeria
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Algeria — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Mon, 16/08/2021')"
   url: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Mon, 16/08/2021 - 17:45". The Algerian Journal
 Officiel PDF used elsewhere in this project (broken font encoding, accented characters
 mis-mapped) was NOT relied on here — every quote below is from the PEER HTML page, where
 the encoding is clean and the match is exact.

ASSIGNED GAPS: eal.l1Support, eal.bilingualEducationNotes, eal.l2Support,
               fl.languagesOffered, fl.upperSecondary

EVIDENCE:
 - field: eal.l1Support
   quote: "The Constitution respects the rights of linguistic minorities by teaching Tamazight as a national language."
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
 - field: eal.l1Support / fl.languagesOffered
   quote: "It should be added that the Amazigh language is now included in the school curricula and textbooks ."
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
 - field: eal.l1Support (nomadic pupils — delivery, not language)
   quote: "Policies for nomadic pupils have been established: either these pupils are identified and placed in a boarding school by their families, or a nomadic teacher is made available to them, who follows them and teaches the children. There are also travelling classes that follow nomadic groups."
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
 - field: fl.languagesOffered (gifted pathways only)
   quote: "the Ministry of Education decided to introduce excellence pathways in three of the country’s colleges to accommodate gifted students, and to open six special colleges in each region. These students receive advanced teaching in foreign languages and information and communications technology."
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
   comment: the profile does NOT name which foreign languages, and the provision is
            restricted to identified gifted students, not the general cohort.
 - field: eal.l1Support (non-discrimination backdrop)
   quote: "every child shall enjoy, without discrimination on the basis of race, sex, language, opinion, disability or any other form of discrimination, all rights under the Convention on the Rights of the Child"
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: eal.bilingualEducationNotes — NOT ANSWERED. grep -oi "bilingual" -> 0.
   No programme teaching content through two languages is described.
 - field: eal.l2Support — NOT ANSWERED. grep -oi "instruction" -> 0;
   grep -oi "Arabic" -> 0 (the language of schooling is never named in this profile);
   grep -oi "mother tongue" -> 0. No newcomer or additional-language designation appears,
   and no support is described for a pupil arriving without Arabic.
 - field: fl.upperSecondary — NOT ANSWERED. grep -oi "secondary" -> 3; one is a
   related-resource title, one an interministerial-council sentence, one a CEDAW sentence.
   None states a language rule at upper secondary or for leaving school.
 - field: fl.languagesOffered — only PARTLY answered. Named languages in the whole profile:
   Tamazight (grep -oi "Tamazight" -> 1) and Amazigh (grep -oi "Amazigh" -> 2, one being
   the curricula sentence quoted above). grep -oi "foreign language" -> 1 (the gifted
   sentence). grep -oi "English" -> 1 and grep -oi "French" -> 2, and those occurrences are
   the site's own language selector, not Algerian school subjects.
   SANITY CHECK: grep -oi "language" -> 8, grep -oi "school" -> 53.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Constitution respects linguistic minorities by teaching Tamazight as a national language
     - PEER: Amazigh language now included in school curricula and textbooks
     - Nomadic pupils get boarding places, travelling teachers or travelling classes
 - field: fl.languagesOffered
   bullets:
     - PEER names only Tamazight and Amazigh, and names no foreign language at all
     - Amazigh is included in school curricula and textbooks
     - Gifted pupils in excellence pathways get "advanced teaching in foreign languages"
     - Arabic, the language of schooling, is never named in this profile
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
 - field: eal.bilingualEducationNotes
   bullets:
     - PEER profile 2021 describes no bilingual programme for Algeria
     - The word "bilingual" does not occur anywhere in the profile
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Profile never uses the phrase language of instruction and never names Arabic
     - No support described for a pupil arriving without the school language

BONUS EVIDENCE (dld.serviceModel — not in my gap list, offered because quotable):
 - field: dld.serviceModel
   quote: "Psychopedagogical care of children with disabilities is provided by a multidisciplinary team consisting mainly of specialized educators, specialized school teachers, social workers and psychologists (speech and language therapists, clinicians and teachers)."
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion
 - field: dld.serviceModel
   quote: "In 2020, 2,422 budget items were allocated to improving specialized education, of which 1,722 items were earmarked for special classes for children with disabilities in mainstream schools, 300 items for specialized institutions, and 400 items for specialized training"
   source: https://education-profiles.org/northern-africa-and-western-asia/algeria/~inclusion

POLICY HISTORY ROWS:
 - year: 1969
   description: Algeria accedes to the UNESCO Convention against Discrimination in Education but does not ratify it
 - year: 1996
   description: Algeria accedes to CEDAW but does not ratify the convention
 - year: 2002
   description: Act No. 02-09 of 8 May 2002 sets out rights of persons with disabilities and compulsory education and vocational training for them
 - year: 2002
   description: Curriculum reform incorporates human rights education and health education
 - year: 2008
   description: Act No. 08-04 of 23 January 2008 on national education; article 14 covers children with specific needs, education free at all levels
 - year: 2009
   description: Algeria ratifies the UN Convention on the Rights of Persons with Disabilities
 - year: 2015
   description: Act No. 15-12 of 15 July 2015 on child protection, article 3 bans discrimination on grounds including language
 - year: 2019
   description: Interministerial council of 14 July 2019 establishes a four-department commission; training plan on autism, mild learning disabilities, social support and sign language
 - year: 2020
   description: 2,422 budget items allocated to specialized education, most earmarked for special classes in mainstream schools
