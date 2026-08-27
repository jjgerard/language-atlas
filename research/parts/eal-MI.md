# Language Atlas — `eal` (Majority language acquisition) — Michigan

TERMINOLOGY NOTE: the United States term is **English learner (EL)**, not EAL. Michigan's
own documents say "English Learner", "Entrance and Exit Protocol (EEP)" and "Language
Instruction Educational Program (LIEP)". "EAL" is not used and must not be written here.

ASSESSMENT NOTE: WIDA Screener and ACCESS for ELLs are NAMED and LINKED only. Michigan's
entrance and exit rules turn on numeric composite/domain thresholds; per the brief those
numbers are NOT reproduced below. Quotes containing cut scores are elided as "[cut score]".

### US-MI|Michigan
STATUS: documented

SOURCES:
 - label: "Michigan's Consolidated State Plan Under the Every Student Succeeds Act (2023 revision), Section E, Title III Part A Subpart 1, 'Entrance and Exit Procedures (ESEA section 3113(b)(2))', pp. 86-88"
   url: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
   http: 200 (application/pdf, 2,084,782 bytes; url_effective identical)
   tier: official-document
 - label: "NCES Digest of Education Statistics 2023, Table 204.20, 'English learners (ELs) enrolled in public elementary and secondary schools, by state or jurisdiction: Fall 2011 through fall 2021'"
   url: https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
   http: 200
   tier: official-document
 - label: "NAEP Data Service (nationsreportcard.gov), 2024 assessment, variable LEP 'Status as English learner, 2 categories', jurisdiction MI, mean scale scores"
   url: https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=reading&grade=8&subscale=RRPCM&variable=LEP&jurisdiction=MI,MN,NJ&stattype=MN:MN&Year=2024
   http: 200 (application/json)
   tier: official-document
 - label: "WIDA Consortium, University of Wisconsin-Madison — ACCESS for ELLs / WIDA Screener (instrument named and linked only)"
   url: https://wida.wisc.edu/
   http: not independently re-verified this session — cited only as the instrument's home site, no claim rests on its content
   tier: official-document

NEGATIVE / NOT VERIFIED:
 - MCL 380.1153 (Revised School Code, bilingual instruction) could NOT be retrieved.
   legislature.mi.gov returned **403** to curl with browser UA + Google referer on all of
   /Laws/MCL?objectName=mcl-380-1153, /documents/mcl/pdf/mcl-380-1153.pdf and
   /documents/mcl/pdf/mcl-Act-451-of-1976.pdf, and **403** to WebFetch as well.
   law.justia.com mirrors also returned 403. NO claim about MCL 380.1153 is made below.
 - MDE's standalone "English Learner Program Entrance and Exit Protocol" PDF
   (michigan.gov/mde/.../EL_Entrance_and_Exit_Protocol.pdf) returned **403** to both curl
   and WebFetch. Its contents are therefore reported ONLY as quoted inside the ESSA plan,
   which reproduces the criteria directly.

EVIDENCE:
 - field: newcomerCriteria
   quote: "The Michigan Department of Education (MDE) established a common and standardized Entrance and Exit Protocol (EEP) in 2011/12 in consultation and partnership with the EL/Title III Advisory Committee"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: newcomerCriteria
   quote: "In 1975, the Michigan Department of Education (MDE) created a sample Home Language survey (HLS) that was approved by the Board of Education and adheres to the three HLS questions that have been approved by the U.S. Department of Education Office for Civil Rights (OCR) and the U.S. Department of Justice (DOJ)"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: newcomerCriteria
   quote: "The WIDA Screener, a valid and reliable ELP assessment, is administered, within 30 days of student's enrollment, to those students that identify a language other than English in the HLS."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: newcomerCriteria
   quote: "MDE requires administering the WIDA Screener along with a state-approved literacy assessment to determine eligibility for entrance and exit from the EL program."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: newcomerCriteria
   quote: "Currently, and since WIDA Consortium does not have an appropriate Screener for four-year-olds, the HLS guides the decision making toward eligibility of preschoolers for English language assistance program"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: removalCriteria
   quote: "Criteria for Exit- Grades K-12: Students must receive a composite score of [cut score] or higher on the annual WIDA: ACCESS for ELLs, and minimum scores of [cut score] in all four domains and demonstrate grade level proficiency in literacy."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
   note: verbatim except the two numeric cut scores, elided per brief rule 5
 - field: removalCriteria
   quote: "Parents have an opportunity to opt out of the EL program or particular EL services in the program but students continue to take the annual ELP assessment until they demonstrate proficiency and meet the state exit criteria."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: removalCriteria
   quote: "Michigan will not include the results of former English learners with the results of current English learners in any indicator calculations for accountability"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: removalCriteria
   quote: "The current WIDA Alternate ACCESS assessment used in MI does not have the necessary accommodations that would enable students with severe cognitive, hearing or visual impairments to fully participate in the state ELP assessment"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: newcomerProportion
   quote: "Michigan | 76,953 | 80,958 | 88,359 | 84,331 | 89,376 | 94,648 | 97,560 | 96,455 | 93,889 | 90,374 | 91,932 | 4.9 | 5.2 | 5.7 | 5.5 | 5.8 | 6.2 | 6.4 | 6.4 | 6.3 | 6.3 | 6.4"
   source: https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
   note: row is fall 2011..fall 2021 counts then fall 2011..fall 2021 percent of total enrolment
 - field: newcomerProportion
   quote: "Michigan annually enrolls approximately 1000 recently arrived English learners."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: achievementGap
   quote: NAEP 2024, Michigan, variable LEP: Reading grade 8 ELL 227.2 vs Not ELL 257.4; Mathematics grade 8 ELL 237.5 vs Not ELL 272.8; Reading grade 4 ELL 191.9 vs Not ELL 210.5; Mathematics grade 4 ELL 220.8 vs Not ELL 236.3 (mean scale scores returned by the NAEP Data Service)
   source: https://www.nationsreportcard.gov/Dataservice/GetAdhocData.aspx?type=data&subject=reading&grade=8&subscale=RRPCM&variable=LEP&jurisdiction=MI,MN,NJ&stattype=MN:MN&Year=2024
 - field: l1Support
   quote: "Michigan provides state assessments for English learners in the languages present to a significant extent in the participating student population (Spanish and Arabic) with one exception. Michigan does not offer Arabic mathematics assessments as stakeholder feedback deemed it unnecessary."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: l1Support
   quote: "Michigan's definition for \"languages other than English that are present to a significant extent in the participating student population\" states that any language other than English that accounts for 10% or more of the English Learner student population is considered significant."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: l1Support
   quote: "The most populous language in Michigan is Spanish, accounting for 42% of the English learner population in the tested grades of 3-8 and 11. The second most populous language is Arabic, and accounts for 28% of the English learner population in the tested grades of 3-8 and 11."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: l2Support
   quote: "The EEP constitutes the official MDE standardized road map for identifying, placing and exiting English learners from the local Language Assistance program and Title III supplemental Language Instruction Educational Program (LIEP)."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: l2Support
   quote: "Support newly arrived adolescent ELs by providing flexible course scheduling, teachers skilled and regularly trained in: EL and immigrant-related supports, basic adolescent literacy interventions coupled with language and other interventions, content instruction designed to fill gaps in academic learning, extended learning opportunities and credit accrual/recovery options."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: l2Support
   quote: "Address the needs of long terms ELs by utilizing the seven basic principles and eight program components delineated by Laurie Olson"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: bilingualEducationNotes
   quote: "Implement evidence-based professional development plan focused on second language development and bilingual instruction to support classroom teachers, paraprofessionals, administrators and other personnel to build their capacity and skill set."
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: policyHistory
   quote: "In 1975, the Michigan Department of Education (MDE) created a sample Home Language survey (HLS) that was approved by the Board of Education"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: policyHistory
   quote: "the three HLS questions that have been approved by the U.S. Department of Education Office for Civil Rights (OCR) and the U.S. Department of Justice (DOJ) in their compliance work under Title VI of the 1964 Civil Rights Act and the Equal Educational Opportunities Act of 1974"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf
 - field: policyHistory
   quote: "established a common and standardized Entrance and Exit Protocol (EEP) in 2011/12"
   source: https://www.ed.gov/sites/ed/files/2023/12/mi-state-plan-2023.pdf

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - US term is English learner, not EAL: Michigan says EL throughout
     - Home Language Survey first, from an MDE sample survey created in 1975
     - WIDA Screener within 30 days of enrolment for any non-English HLS answer
     - K-2 also need a state-approved literacy assessment alongside the Screener
     - Preschool has no Screener: the HLS alone guides eligibility
 - field: removalCriteria
   bullets:
     - Exit needs a WIDA ACCESS for ELLs composite threshold plus all four domains
     - Cut scores set by MDE Entrance and Exit Protocol, not reproduced here
     - Grade-level literacy proficiency is also required to exit, K-12
     - Opt-out pupils still sit the annual ELP test until they meet exit criteria
 - field: newcomerProportion
   bullets:
     - NCES Digest 2023 tbl 204.20, fall 2011: 76,953 ELs, 4.9% of enrolment
     - Fall 2017 peak count 97,560 ELs, 6.4% of enrolment
     - Fall 2021: 91,932 ELs, 6.4% of enrolment
     - MDE reports roughly 1,000 recently arrived ELs enrol each year
 - field: achievementGap
   bullets:
     - NAEP 2024 mean scale scores, EL vs not-EL, Michigan public schools
     - Grade 8 reading: 227 EL against 257 not-EL, a 30-point gap
     - Grade 8 mathematics: 238 EL against 273 not-EL, a 35-point gap
     - Grade 4 reading gap is narrower at about 19 points
 - field: l2Support
   bullets:
     - Local Language Assistance programme plus Title III supplemental LIEP
     - MDE Entrance and Exit Protocol is the statewide placement road map
     - Newly arrived adolescents: flexible scheduling, credit recovery, literacy work
     - Long-term ELs addressed through the Olson principles and components
 - field: l1Support
   bullets:
     - A language counts as significant at 10% or more of the EL population
     - Spanish is 42% and Arabic 28% of ELs in tested grades 3-8 and 11
     - State assessments offered in Spanish and Arabic, but no Arabic mathematics
 - field: l3Support
   bullets:
     - No verified evidence found in the retrieved ESSA plan on third-language provision
 - field: bilingualEducationNotes
   bullets:
     - MCL 380.1153 not verified: legislature.mi.gov 403s to curl and WebFetch alike
     - ESSA plan commits MDE to professional development in bilingual instruction
     - Michigan runs no statewide mandated bilingual programme type in the retrieved plan
 - field: policyHistory
   bullets:
     - 1974 Equal Educational Opportunities Act cited as the compliance basis
     - 1975 MDE creates the sample Home Language Survey approved by the State Board
     - 2011/12 MDE establishes the standardized Entrance and Exit Protocol
     - 2023 revised Consolidated State Plan under ESSA restates entrance and exit rules
