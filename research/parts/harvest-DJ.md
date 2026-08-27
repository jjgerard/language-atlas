### DJ|Djibouti
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Djibouti — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Thu, 09/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Thu, 09/09/2021 - 11:00"; "Validated by the
 country: No".

ASSIGNED GAPS: eal.bilingualEducationNotes, eal.l2Support, fl.primaryRequirement,
               fl.upperSecondary

EVIDENCE:
 - field: fl.primaryRequirement / eal.bilingualEducationNotes (statutory rule)
   quote: "Article 5 of Act No. 96/AN/00/4e L of 10 July 2000 on the Djiboutian education system (2000) stipulates that \"education and training are provided in the official languages and in the national languages.\""
   source: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion
 - field: eal.bilingualEducationNotes (the four languages)
   quote: "In addition, a decree issued by the Council of Ministers sets out methods for teaching in French, Arabic, Afar and Somali."
   source: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion
 - field: eal.bilingualEducationNotes (repeated in the 2012 act)
   quote: "the Act on the organization of the Ministry of National Education and Higher Education (2012) also sets out methods for teaching in French, Arabic, Afar and Somali."
   source: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion
 - field: eal.bilingualEducationNotes (institutional machinery)
   quote: "Under this act, an office for the development of Arabic and national languages was established, which is responsible for implementing and monitoring the policy for increasing the status of the Arabic language, promoting the introduction of national languages into the education system and encouraging the use of Arabic by the ministry's administrative services."
   source: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion
 - field: eal (refugees, adjacent)
   quote: "The Djibouti Declaration on Refugee Education aims to integrate education for refugees and returnees into national education sector plans by 2020 and to exchange good practice and expertise regarding the integration of refugee and returnee teachers into national education systems."
   source: https://education-profiles.org/sub-saharan-africa/djibouti/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: fl.primaryRequirement (age/grade)
   The statutory rule is quoted above, but the profile gives NO starting age, NO grade and
   does NOT say which of the four languages a primary pupil must take.
   Term counts on harvest/DJ_body.txt (17,607 chars): grep -oi "grade" -> 0;
   grep -oi "primary" -> 4, of which 2 are related-resource titles and 2 are sector-plan
   prose about enrolment, none a language rule.
 - field: fl.upperSecondary
   Not answered. grep -oi "secondary" -> 2, and BOTH are related-resource titles
   ("Financing for equity in primary and secondary education"). No upper-secondary
   language rule exists in this profile.
 - field: eal.l2Support
   Not answered. grep -oi "instruction" -> 0; grep -oi "language of instruction" -> 0;
   grep -oi "mother tongue" -> 0. The profile names no newcomer or additional-language
   designation and describes no support for a pupil arriving without French or Arabic.
   SANITY CHECK: grep -oi "language" -> 6, grep -oi "school" -> 28, grep -oi "refugee" -> 8.
 - The single occurrence of "bilingual" (grep -oi "bilingual" -> 1) is NOT school bilingual
   education: "the training and social service centre of the Evangelical Protestant Church
   of Djibouti provides bilingual training for people with motor disabilities to become
   assistant managers of computer networks". Do not use it as a bilingual-education claim.

DRAFT BULLETS:
 - field: eal.bilingualEducationNotes
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Act No. 96/AN/00/4e L of 2000 art 5: teaching in the official and the national languages
     - Council of Ministers decree sets methods for teaching in French, Arabic, Afar and Somali
     - 2012 ministry act created an office for the development of Arabic and national languages
 - field: fl.primaryRequirement
   bullets:
     - PEER gives the statutory rule but no age, grade or compulsory subject for Djibouti
     - Act No. 96/AN/00/4e L of 10 July 2000 art 5 covers official and national languages
     - Four languages named in the implementing decree: French, Arabic, Afar and Somali
 - field: fl.upperSecondary
   bullets:
     - PEER profile states no language rule at upper secondary or for leaving school
     - Only two uses of "secondary" in the profile are resource titles
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation
     - Profile never uses the phrase language of instruction for Djibouti
     - Refugee education addressed by integration into sector plans, not by language support

POLICY HISTORY ROWS:
 - year: 2000
   description: Act No. 96/AN/00/4e L of 10 July 2000 on the Djiboutian education system; article 5 provides teaching in the official and national languages
 - year: 2010
   description: Education Sector Plan 2010-2019 adopted, with inclusion indicators and gender-disparity targets
 - year: 2011
   description: Ministry of Education and Vocational Training Action Plan 2011-2016 introduces the term inclusive education
 - year: 2012
   description: Act on the organization of the Ministry of National Education and Higher Education creates an office for the development of Arabic and national languages
 - year: 2018
   description: UNHCR assesses progress on refugee education under the Djibouti Declaration on Refugee Education
