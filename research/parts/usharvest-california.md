### US|California
STATUS: documented
SOURCES:
 - label: "Montee, M., Pineault, C. & Yang, F., 'State policy requirements for K-12 world language education', Foreign Language Annals 58(4) (2025), DOI 10.1111/flan.70020"
   url: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   http: 200 (283567 bytes; url_effective unchanged, retrieved with a cookie jar - a bare curl redirects to /action/cookieAbsent)
   tier: secondary-source
 - label: "Education Commission of the States, 50-State Comparison: High School Graduation Requirements (February 2019)"
   url: https://reports.ecs.org/comparisons/high-school-graduation-requirements-01
   http: 200 (146565 bytes; url_effective unchanged)
   tier: secondary-source
 - label: "Education Commission of the States, High School Graduation Requirements 2023, All Data Points (May 2023)"
   url: https://reports.ecs.org/comparisons/high-school-graduation-requirements-2023
   http: 200 (330930 bytes; url_effective unchanged)
   tier: secondary-source
 - label: "Aguirre, A. & Chou, C., The Seal of Biliteracy 2024 National Report (school year 2022-2023), Tables 1, 2 and 4"
   url: https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf
   http: 200 (656363 bytes; url_effective unchanged)
   tier: secondary-source
 - label: "American Councils for International Education, The National K-12 Foreign Language Enrollment Survey Report (June 2017), Table 1"
   url: https://www.americancouncils.org/sites/default/files/FLE-report-June17.pdf
   http: 200 (2350533 bytes; url_effective unchanged)
   tier: secondary-source
 - label: "California Education Code 51210, Course of Study, Grades 1 to 6"
   url: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=51210
   http: 200 (168288 bytes; url_effective unchanged)
   tier: official-document
EVIDENCE:
 - field: fl.primaryRequirement
   quote: "We identified five states with legal requirements for public elementary schools to offer world language instruction: Louisiana, Maine, New Jersey, New Mexico, and Wyoming."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: California is NOT among them.
 - field: fl.primaryRequirement
   quote: "Our results show that it is rare for states to have requirements at the elementary and middle school levels."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement
   quote: "The results presented here reflect policy findings as of December 2024 when data checking was complete."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement
   quote: "We identified 14 states with policies requiring middle schools to offer world language instruction. These include: California, District of Columbia, Indiana, Louisiana, Maine, Maryland, New Jersey, New Mexico, New York, Pennsylvania, Rhode Island, South Carolina, Virginia, and West Virginia."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: California is among them - the requirement begins at middle school, not elementary.
 - field: fl.primaryRequirement (high-school contrast, from the cited ECS comparison)
   quote: "Multiple options: 1 visual or performing arts or foreign language"
   source: https://reports.ecs.org/comparisons/high-school-graduation-requirements-01
   note: ECS 2019 "Foreign Lang." column for California.
 - field: fl.primaryRequirement
   quote: "Standard diploma includes world language as an option to fulfill a credit requirement"
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Foreign Language Annals Table 6 category for California.
 - field: fl.primaryRequirement
   quote: "The adopted course of study for grades 1 to 6, inclusive, shall include instruction, beginning in grade 1 and continuing through grade 6, in the following areas of study: (1) English ... (2) Mathematics ... (3) Social sciences ... (4) Science ... (5) Visual and performing arts ... (6) Health ... (7) Physical education ... (8) Other studies that the governing board may prescribe."
   source: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=51210
   note: Cal. Educ. Code 51210, read in full. No world or foreign language appears among the eight areas.
 - field: fl.primaryRequirement
   quote: "(c) World language or languages, beginning not later than grade 7, designed to develop a facility for understanding, speaking, reading, and writing the particular language."
   source: https://ballotpedia.org/K-12_areas_of_instruction_required_by_statute_in_the_states
   note: California Education Code 51220 (course of study, grades 7 to 12), as reproduced by Ballotpedia. The statute fixes the start at grade 7 at the latest.
ABSENCE PROOF for the elementary question in the two cited ECS comparisons
(whole-word, case-insensitive counts on the extracted text of each retrieved page):
 - ECS 2019: "elementary" 0, "primary" 0, "kindergarten" 0 - sanity check "graduation" 65, "world language" 19
 - ECS 2023: "elementary" 0, "primary" 0, "kindergarten" 0 - sanity check "graduation" 112, "world language" 4
 - Both ECS comparisons are scoped to high school graduation requirements only and therefore
   cannot answer the elementary question either way. This is a limit of the cited source, not
   evidence that the state has no requirement; the Foreign Language Annals inventory supplies that.
DRAFT BULLETS:
 - field: fl.primaryRequirement
   bullets:
     - Peer-reviewed 50-state statute inventory, policy as at December 2024
     - No state law requires world language instruction in elementary school
     - Educ. Code 51210 course of study grades 1-6 lists no world language
     - Educ. Code 51220 puts world languages in the grades 7-12 course of study
POLICY HISTORY (proposed rows):
 - {year: 2011, description: "California adopts a State Seal of Biliteracy (10/8/2011); first awarded in school year 2012-2013"}
 - {year: 2024, description: "Cal. Educ. Code 51210 amended by Stats. 2024, Ch. 658, Sec. 1.5 (AB 1821), effective 1 January 2025; grades 1-6 course of study still names no world language"}
CONTEXT NOT REQUESTED (recorded because the document was open, do not overwrite existing fields):
 - American Councils 2017 Table 1, California: 6,806,050 K-12 population; 946,779 enrolled in foreign language; 13.91%
 - Samoan and Yurok were awarded in the California Seal of Biliteracy in 2022-23 (Seal Table 4) - relevant to regionalMinorityLanguages, which is not a gap field for California
 - The Foreign Language Annals article notes: "in California, Biliteracy Pathway Recognitions are available for elementary school and in some cases even preschool students who are enrolled in programs leading to bilingualism and biliteracy"
