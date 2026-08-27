### CD|DR Congo
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Democratic Republic of the Congo — Inclusion, section 'Ethnicity and languages' (archived site; 'Last modified: Thu, 09/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page carries "This website has been archived and is no longer updated. Please
 visit the new PEER website at www.unesco.org/gem-report/en/peer". Profile stamped
 "Last modified: Thu, 09/09/2021 - 10:44".

ASSIGNED GAPS: eal.l2Support; fl.languagesOffered, fl.primaryRequirement, fl.upperSecondary

EVIDENCE:
 - field: fl.primaryRequirement
   quote: "From first grade to fourth grade, one of the four designated national languages is both an independent subject and the language of instruction. French is also an independent subject."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support
   quote: "Third grade and fourth grade are considered transition years, where French will be used more as a language of oral instruction in the classroom."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support
   quote: "In fifth grade and sixth grade, French is both a subject and the principal language of instruction. However, national languages remain independent subjects."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: fl.upperSecondary
   quote: "The ELAN programme for the teaching of national languages allows national or local languages to be used as a language of teaching and learning at the elementary and junior primary levels and as a subject at the secondary and higher levels."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support
   quote: "The revision of curricula will focus on learning to read, mastery of the language of instruction (French), the use of national languages as a vehicle for teaching and learning, teacher training, basic education programmes and vocational training."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support
   quote: "It also oversees the drafting of curricula in national and local languages and intends to continue testing the approach of \"learning to read and write in a first African language and in French\"."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support
   quote: "Thus, validation workshops to endorse manuals and guides in the four local languages are planned."
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion
 - field: eal.l2Support (teacher supply side)
   quote: "it plans for the development of a teacher training curriculum that takes into account learning in national languages, and the revision of curricula and certification mechanisms taking into account the necessary mastery of a national language"
   source: https://education-profiles.org/sub-saharan-africa/democratic-republic-of-congo/~inclusion

PARTIAL / NEGATIVE:
 - field: fl.languagesOffered
   The profile repeatedly says "the four designated national languages" and "the four local
   languages" but NEVER NAMES THEM. Term counts on harvest/CD_body.txt (21,406 chars):
     grep -oi "kikongo|lingala|swahili|kiswahili|tshiluba|ciluba" -> 0
     grep -oi "English" -> 1 (a site navigation label, not a school subject)
     SANITY CHECK: grep -oi "language" -> 18, grep -oi "school" -> 50
   So the four are identified only by count, not by name, in this source. No European
   language other than French is mentioned anywhere as a school subject.
 - field: fl.upperSecondary
   The only statement reaching beyond primary is the ELAN sentence quoted above ("as a
   subject at the secondary and higher levels"), and it is about national/local languages,
   not about whether language study is compulsory to leave school. grep -oi "secondary"
   -> 6 in the body, of which 5 are ministry names or related-resource titles.

DRAFT BULLETS:
 - field: fl.primaryRequirement
   bullets:
     - Source is UNESCO PEER inclusion profile, last modified 2021, site now archived
     - Grades 1-4 taught in one of four designated national languages, not in French
     - French is an independent subject alongside it from first grade
     - National languages stay independent subjects in grades 5 and 6
 - field: fl.languagesOffered
   bullets:
     - PEER names four national languages by count only, never by name
     - French taught as an independent subject from grade one
     - No other European or foreign language named as a school subject in the profile
     - ELAN programme allows local languages as subjects at secondary and higher levels
 - field: fl.upperSecondary
   bullets:
     - PEER profile gives no rule on language study at upper secondary or for leaving school
     - Only statement past primary is ELAN local languages "as a subject at the secondary and higher levels"
 - field: eal.l2Support
   bullets:
     - French is the school language from grade 5, taught as a subject from grade 1
     - Grades 3 and 4 are transition years, French used more as oral classroom language
     - 2016-2025 sector strategy targets "mastery of the language of instruction (French)"
     - No separate newcomer or additional-language designation is described

POLICY HISTORY ROWS:
 - year: 2008
   description: National Education Development Report defines inclusive education for DR Congo
 - year: 2016
   description: Education and Training Sector Strategy 2016-2025 sets curricula in national and local languages and French literacy transition
 - year: 2018
   description: MASAHSN required to propose a sectoral plan for inclusive education, for implementation in 2021
