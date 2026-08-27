### CG|Congo
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Congo — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Fri, 10/02/2023')"
   url: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that the profiles here "are no longer being
 updated". Profile stamped "Last modified: Fri, 10/02/2023 - 10:46"; "Validated by the
 country: No".

ASSIGNED GAPS: eal.l2Support; fl.languagesOffered, fl.primaryRequirement, fl.upperSecondary

EVIDENCE:
 - field: fl.languagesOffered
   quote: "Under article 4 of Act No. 20/80 of 11 September 1980 on the reorganization of the education system, the two national languages (Lingala and Munukutuba) are taught in school."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
 - field: fl.languagesOffered
   quote: "In reality, these subjects are taught in only a certain number of schools."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
 - field: eal.l2Support
   quote: "French has remained the only language of instruction throughout the school and university curriculum."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
 - field: eal.l2Support / bridging model
   quote: "Observer, Réflechir, Agir [Observe, Reflect, Act – ORA] schools are an experiment in educating indigenous children in forest zones. Unlike the official system , they use mother tongues and national languages."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
 - field: eal.l2Support / bridging model
   quote: "Unlike in the formal system, these students learn using mother tongues and national languages and their teachers are from the indigenous community . These schools aim to integrate students into the mainstream system after two or three years of teaching."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion
 - field: context (population)
   quote: "The population of the Republic of the Congo is made up mainly of Bantu people and a minority of Pygmy people. There are about 60 ethnic groups."
   source: https://education-profiles.org/sub-saharan-africa/congo/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: fl.primaryRequirement
   The profile says the two national languages "are taught in school" but gives NO starting
   age, NO grade, and does NOT say the subject is compulsory. Term counts on
   harvest/CG_body.txt (22,192 chars): grep -oi "grade" -> 0; grep -oi "compulsory" -> 2,
   both about compulsory SCHOOLING ("schooling is compulsory until the age of 16", art. 29
   of the Constitution; Education Act No. 32/65 "democratic, compulsory and free school"),
   neither about a language subject. SANITY CHECK: grep -oi "school" -> 52.
 - field: fl.upperSecondary
   Not answered. grep -oi "secondary" -> 7 in the body, every one a ministry name, a
   teacher-training reference or a related-resource title; none states a language rule at
   upper secondary. The only cross-phase statement is that French is the medium
   "throughout the school and university curriculum".
 - No other language is named as a school subject: grep -oi "English" -> 1, and that
   occurrence is the site's language selector, not a Congolese school subject.

DRAFT BULLETS:
 - field: fl.languagesOffered
   bullets:
     - Source is UNESCO PEER inclusion profile, last modified 2023, site now archived
     - Two national languages, Lingala and Munukutuba, taught under Act No. 20/80 article 4
     - PEER notes these subjects reach "only a certain number of schools" in practice
     - No other language named as a school subject in the profile
 - field: fl.primaryRequirement
   bullets:
     - PEER gives no starting age or grade for national language teaching in Congo
     - Act No. 20/80 article 4 provides the two national languages are taught in school
     - Compulsory schooling runs to age 16 under Constitution article 29, no language rule
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for school leaving
     - French described as the only medium "throughout the school and university curriculum"
 - field: eal.l2Support
   bullets:
     - French is the sole language of instruction across school and university
     - No newcomer or additional-language designation described in the profile
     - ORA schools teach indigenous children in mother tongues and national languages
     - ORA aims to move pupils into the mainstream after two or three years

POLICY HISTORY ROWS:
 - year: 1965
   description: Education Act No. 32/65 of 12 August 1965 promises a democratic, compulsory and free school
 - year: 1980
   description: Act No. 20/80 of 11 September 1980 reorganizing education; article 4 provides for teaching Lingala and Munukutuba
 - year: 2015
   description: Education Sector Strategy 2015-2025 provides for development of ORA schools for indigenous children
 - year: 2016
   description: Strategy for the education of girls developed and submitted to the Minister of Primary and Secondary Education and Literacy
 - year: 2019
   description: NGO-run designated inclusive school opened at Kintele, enrolling sighted, blind and visually impaired students
