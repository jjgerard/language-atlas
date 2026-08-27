### GY|Guyana — fl (Foreign languages in school)
STATUS: documented

HEADLINE: Guyana is the batch's mirror image. Everywhere else the foreign language is ENGLISH;
Guyana is the English-medium state, and its national foreign-language push is for SPANISH, made
compulsory across primary and secondary from the Christmas Term 2023 by a Chief Education Officer's
circular. The ministry's own stated reason is geographic: Guyana "stands to be the only
English-speaking country in a primarily Spanish-speaking continent".

RETRIEVAL FINDING WORTH REUSING: education.gov.gy 403s a request carrying a Chrome user-agent but
returns HTTP 200 to PLAIN `curl` with NO `-A` flag — the same behaviour the task brief documented
for Planipolis. `https://education.gov.gy/en/index.php/parents/resources/csec-syllabuses` gave 403
with a browser UA and 200 (48,512 bytes) plain. Its Joomla search endpoint
(`/en/index.php/component/search/?searchword=Spanish&searchphrase=all&Itemid=101`) also works plain
and is the practical way into the site.

SOURCES:
 - label: "Ministry of Education, Guyana — 'Teachers from Cuba & Mexico could help Guyana with new Spanish focus'"
   url: https://education.gov.gy/en/index.php/media2/external-news/5746-teachers-from-cuba-mexico-could-help-guyana-with-new-spanish-focus
   http: 200 (retrieved with plain curl, no user-agent)
   tier: official-document (ministry's own site; filed by the ministry under "external-news", so the prose is press-derived — treat as ministry-published reporting rather than a circular)
 - label: "INews Guyana, 'Education Ministry rolls out measures for Spanish to be taught in all schools', 14 September 2023 (reporting the Chief Education Officer's circular to stakeholders)"
   url: https://www.inewsguyana.com/education-ministry-rolls-out-measures-for-spanish-to-be-taught-in-all-schools/
   http: 200 (225,247 bytes; url_effective resolves to inewsguyana.com without www; embedded metadata gives "datePublished":"2023-09-14T11:34:51+00:00")
   tier: secondary-source (news outlet quoting the circular; the circular itself was NOT retrieved)
 - label: "Ministry of Education, Guyana — site search results for 'Spanish'"
   url: https://education.gov.gy/en/index.php/component/search/?searchword=Spanish&searchphrase=all&Itemid=101
   http: 200 (plain curl)
   tier: official-document
 - label: "UNESCO PEER, Guyana — Inclusion profile"
   url: https://education-profiles.org/latin-america-and-the-caribbean/guyana/~inclusion
   http: 200 (827,911 bytes; profile body present)
   tier: secondary-source

EVIDENCE:
 - field: primaryRequirement
   quote: "The Education Ministry is moving forward with plans to implement Spanish mandatorily within the primary and secondary school curricula in the Christmas Term 2023, following President Dr. Irfaan Ali's recent announcement of doing so."
   source: https://www.inewsguyana.com/education-ministry-rolls-out-measures-for-spanish-to-be-taught-in-all-schools/
 - field: primaryRequirement
   quote: "head teachers at the primary level are advised to confirm their schools, using the renewed curriculum, expose Grades One to Four students to Spanish during one or two of the Beyond Core periods every week."
   source: same
 - field: curriculumTime
   quote: "Grade Five students, who are using the Consolidated Curriculum, must do Spanish for at least one 30-minute period per week, while Grade Six students are expected to engage in studying the subject after they have written the National Grade Six Assessment (NGSA)."
   source: same
   note: THE PRIMARY ALLOCATION IS VERY SMALL AND UNEVEN, and the wording is graded: Grades 1-4 are
     "advised" to use one or two "Beyond Core" periods; Grade 5 has a hard floor of ONE 30-MINUTE
     PERIOD A WEEK; Grade 6 does Spanish only AFTER the national exam is out of the way. Report the
     30-minute figure with its grade attached — it is not a whole-primary allocation.
 - field: secondaryRequirement
   quote: "At the secondary school level, headteachers are to ensure all students of Grades Seven to Nine are learning Spanish as a foreign language, though if a student intends on pursuing French or Portuguese at Caribbean Secondary Education Certificate (CSEC) in Grade Ten, they may be exempted from doing Spanish in Grade Nine upon their request to the school."
   source: same
 - field: upperSecondary
   quote: "Spanish must be offered in each stream in Grade Ten, while headteachers are required to do staff rationalisations to identify teachers who can teach the subject within the school."
   source: same
   note: At Grade 10 the duty is on the SCHOOL TO OFFER, not on the pupil to take. Do not report
     Spanish as compulsory at CSEC level.
 - field: languagesOffered
   quote: (from the same circular text) "if a student intends on pursuing French or Portuguese at Caribbean Secondary Education Certificate (CSEC) in Grade Ten"
   source: same
   note: Three foreign languages are in play — Spanish, French and Portuguese — with Spanish the
     default and the other two available at CSEC. PORTUGUESE is a notable inclusion and reflects the
     Brazilian border, not a European curriculum tradition.
 - field: assessment
   quote: "An end of term grade must be provided on the report card of each student, with assessments to go beyond written tests and include performance aspects such as reciting a poem, performing a scene in Spanish, singing a Spanish song, responding to situations in Spanish, completing a portfolio or creating an art piece."
   source: same
   note: The circular mandates a TERMLY REPORT-CARD GRADE with an explicitly performance-based
     component. Certification at the end of secondary runs through CSEC (CXC), not a national exam.
 - field: teacherSupply
   quote: "The Spanish language will be a compulsory language in public schools from September and Education Minister Priya Manickchand said the government is in talks with Cuba, Mexico and other bilateral partners on the possible use of teachers from those countries."
   source: https://education.gov.gy/en/index.php/media2/external-news/5746-teachers-from-cuba-mexico-could-help-guyana-with-new-spanish-focus
 - field: teacherSupply
   quote: "the Education Ministry is exploring several options to train more teachers in Spanish. Those options include online courses or studies at the University of Guyana (UG) and the Cyril Potter College of Education (CPCE)."
   source: same
 - field: teacherSupply
   quote: "the National Centre of Educational Resources Development (NCERD) is overseeing the creation of Spanish material that could be used in schools, particularly where there are no trained Spanish teachers. That material would be written and audiovisual content... Tapping the services of retired teachers to help deliver Spanish classes is also an option, Manickchand noted."
   source: same
   note: THE CRITICAL QUALIFIER FOR THIS UNIT. Guyana made Spanish compulsory WITHOUT a trained
     Spanish teaching workforce, and the stated mitigations are foreign teachers, NCERD-produced
     self-delivery materials for untrained teachers, and retired teachers. The circular's own
     instruction is a staffing workaround too: "If possible, a school can use one or two teachers to
     teach Spanish throughout the school. These teachers should not be given a fixed class."
 - field: higherEducation
   quote: "Those options include online courses or studies at the University of Guyana (UG) and the Cyril Potter College of Education (CPCE)."
   source: same
   note: Also the Guyana Online Academy of Learning (GOAL) programme, per the INews report. No
     university language ENTRY requirement was found.
 - field: uptake
   quote: "for the very first time, 91 pupils wrote the exams in Spanish" (ministry site search result summarising "NGSA Day 1: 98% Attendance, Historic Spanish Participation")
   source: https://education.gov.gy/en/index.php/component/search/?searchword=Spanish&searchphrase=all&Itemid=101
   note: DO NOT MISREAD THIS AS FOREIGN-LANGUAGE UPTAKE. These 91 pupils sat the National Grade Six
     Assessment THROUGH Spanish, as Spanish-speaking migrants — it belongs to the eal story, not the
     fl story. A related ministry item reads: "for the first time, the assessment papers have been
     translated into Spanish to help Spanish-speaking pupils, many of whom are migrants, better
     understand the assessment." A further item announces a programme "titled 'Advancing in English'
     ... geared towards helping Spanish-speaking students in the education system." No year was
     captured for these items from the search-results page; treat them as undated leads, not as
     dated series rows.
 - field: regionalMinorityLanguages
   quote: "The plan recognized that there have been limited attempts to respond to the language issue, with the ministry supporting the use of the children's mother tongue, where possible, in the early years of school and giving support to projects such as the Macushi Language project."
   source: https://education-profiles.org/latin-america-and-the-caribbean/guyana/~inclusion
   note: CATEGORY POINT — Guyana's Amerindian languages (Macushi and others) are MOTHER TONGUES given
     discretionary early-years support, not offered as school languages. Guyanese Creole is not
     mentioned in any source retrieved.
 - field: uptake (proper)
   note: NOT FOUND. No enrolment or CSEC entry series for Spanish, French or Portuguese was retrieved.

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - Spanish became mandatory across primary and secondary from the Christmas Term 2023
     - Grades One to Four are advised to use one or two "Beyond Core" periods a week
     - Grade Six pupils take up Spanish only after sitting the national assessment
     - Rationale given is that Guyana is the only English-speaking country on the continent
 - field: secondaryRequirement
   bullets:
     - All pupils in Grades Seven to Nine must learn Spanish as a foreign language
     - Pupils heading for French or Portuguese at CSEC may be exempted in Grade Nine
     - Exemption must be requested by the pupil from the school
 - field: upperSecondary
   bullets:
     - At Grade Ten the duty is on schools to offer Spanish in every stream
     - There is no requirement that pupils take a foreign language at CSEC
     - Certification runs through CSEC rather than a national examination
 - field: curriculumTime
   bullets:
     - Grade Five has a floor of one 30-minute period per week
     - Grades One to Four get one or two "Beyond Core" periods weekly
     - No allocation is set for secondary grades in the circular as reported
 - field: languagesOffered
   bullets:
     - Spanish is the default foreign language nationally
     - French and Portuguese are available as CSEC alternatives
     - Portuguese reflects the Brazilian border rather than a European tradition
 - field: assessment
   bullets:
     - A termly grade must appear on every pupil's report card
     - Assessment must go beyond written tests to performance tasks and portfolios
 - field: teacherSupply
   bullets:
     - Spanish was made compulsory without a trained Spanish teaching workforce
     - Government sought teachers from Cuba, Mexico and other bilateral partners
     - NCERD produces materials so untrained teachers can deliver the subject
     - Schools are told to appoint one or two roving Spanish teachers without a fixed class
 - field: higherEducation
   bullets:
     - Teacher training routes are University of Guyana, CPCE and the GOAL online programme
     - No university language entry requirement was found
 - field: regionalMinorityLanguages
   bullets:
     - Amerindian languages are mother tongues, not languages offered as school subjects
     - Mother-tongue support is discretionary and confined to the early years
     - The Macushi Language project is the one named ministry-supported initiative
 - field: policyHistory
   rows:
     - {year: 2008, description: "2008-13 strategic plan records ministry support for mother-tongue use and the Macushi Language project"}
     - {year: 2023, description: "President announces Spanish will become a compulsory school subject"}
     - {year: 2023, description: "Chief Education Officer circular of 14 September sets Spanish requirements by grade from Christmas Term"}
     - {year: 2023, description: "Ministry opens talks with Cuba and Mexico over supplying Spanish teachers"}
