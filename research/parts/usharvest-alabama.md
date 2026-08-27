### US|Alabama
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
 - label: "Ballotpedia, 'K-12 areas of instruction required by statute in the states' (statutory text reproduced with citations)"
   url: https://ballotpedia.org/K-12_areas_of_instruction_required_by_statute_in_the_states
   http: 200 (625990 bytes; url_effective unchanged)
   tier: secondary-source
EVIDENCE:
 - field: fl.primaryRequirement
   quote: "We identified five states with legal requirements for public elementary schools to offer world language instruction: Louisiana, Maine, New Jersey, New Mexico, and Wyoming."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Alabama is NOT among them.
 - field: fl.primaryRequirement
   quote: "Our results show that it is rare for states to have requirements at the elementary and middle school levels."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement
   quote: "The results presented here reflect policy findings as of December 2024 when data checking was complete."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement
   quote: "we identified 10 states in which there is a legal requirement for world language to be offered K-12, but the grade level is not specified: Alabama, Hawaii, Florida, New York, North Carolina, Ohio, Oklahoma, Oregon, Vermont, and Wyoming."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Alabama is among them - the K-12 duty is unspecified as to grade, so it is not an elementary-specific rule.
 - field: fl.primaryRequirement (high-school contrast, from the cited ECS comparison)
   quote: "Multiple options: 3 units chosen from CTE, foreign language, arts ed."
   source: https://reports.ecs.org/comparisons/high-school-graduation-requirements-01
   note: ECS 2019 "Foreign Lang." column for Alabama.
 - field: fl.primaryRequirement
   quote: "Standard diploma includes world language as an option to fulfill a credit requirement"
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Foreign Language Annals Table 6 category for Alabama.
 - field: fl.primaryRequirement
   quote: "In every elementary school in the state there shall be taught reading, spelling and writing, arithmetic, oral and written English, geography, history of the United States and Alabama, elementary science, health education, physical education and such other studies as may be prescribed by the State Board of Education."
   source: https://ballotpedia.org/K-12_areas_of_instruction_required_by_statute_in_the_states
   note: Alabama Code 16-35-5 (2022), 'Studies required to be taught in elementary school'. Reproduced by Ballotpedia from the statute; the list names no foreign or world language at elementary level unless quoted otherwise above.
 - field: fl.primaryRequirement
   quote: "In three states, Alabama, New York, and Vermont, world languages are required as an elective offering in public schools, but the grade level is not specified."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Foreign Language Annals section 4.4. The Alabama duty is to offer an elective, at no stated grade.
 - field: fl.regionalMinorityLanguages
   quote: "Table 4 of the Seal of Biliteracy 2024 report lists every Native American and Pacific Islander language awarded and the states awarding it: Keres (New Mexico), Navajo (Arizona, New Mexico), 'olelo Hawai'i (Hawai'i), Samoan (California, Hawai'i, Oregon, Washington), Tewa (New Mexico), Tiwa (New Mexico), Yakima (Washington), Yugtun (Alaska), Yup'ik (Alaska), Yurok (California), Zuni (New Mexico)."
   source: https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf
   note: Alabama does not appear anywhere in Table 4.
 - field: fl.regionalMinorityLanguages
   quote: "American Sign Language (ASL), Arabic, Chinese (Mandarin), Czech, French, Fula/Fulani, German, Hindi, Italian, Japanese, Korean, Latin, Portuguese, Russian, Sou Sou (Susu), Spanish, Tegulu (Telegu), Turkic/Turkish/Uyghur, Urdu, Vietnamese"
   source: https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf
   note: Seal of Biliteracy Table 2, the complete list of 20 languages awarded in Alabama in SY2022-2023. No Native American or other Indigenous language of the United States appears in it.
ABSENCE PROOF for the elementary question in the two cited ECS comparisons
(whole-word, case-insensitive counts on the extracted text of each retrieved page):
 - ECS 2019: "elementary" 0, "primary" 0, "kindergarten" 0 - sanity check "graduation" 65, "world language" 19
 - ECS 2023: "elementary" 0, "primary" 0, "kindergarten" 0 - sanity check "graduation" 112, "world language" 4
 - Both ECS comparisons are scoped to high school graduation requirements only and therefore
   cannot answer the elementary question either way. This is a limit of the cited source, not
   evidence that the state has no requirement; the Foreign Language Annals inventory supplies that.
ABSENCE PROOF for an Indigenous-language provision
(whole-word, case-insensitive counts on the extracted full text of the Foreign Language Annals
50-state statute inventory, 68,034 chars):
 - "Indigenous" 0, "Native American" 0, "Hawaiian" 0, "American Sign Language" 0
 - sanity check on a term that IS present: "world language" 87, "elementary" 45
 - The article inventories world language requirements in the statutes of all 50 states and DC and
   records no requirement anywhere that is framed around an Indigenous language of the country.
   Combined with Alabama's absence from Seal of Biliteracy Table 4, no provision for a language of the
   United States itself was found for this state in any source retrieved.
DRAFT BULLETS:
 - field: fl.primaryRequirement
   bullets:
     - Peer-reviewed 50-state statute inventory, policy as at December 2024
     - No state law requires world language instruction in elementary school
     - Ala. Code 16-35-5 elementary studies list names no foreign or world language
     - Law requires world language only as an elective offering, no grade named
     - Cited ECS tables cover high school graduation only, so cannot answer this
 - field: fl.regionalMinorityLanguages
   bullets:
     - Evidence is the 2024 Seal of Biliteracy report and a 50-state statute inventory
     - No provision for an Indigenous or other language of the state was found
     - Seal awarded in 20 languages 2022-23, none Native American or Pacific
     - Only AK, AZ, CA, HI, NM, OR, WA awarded Indigenous US languages
POLICY HISTORY (proposed rows):
 - {year: 2022, description: "Alabama adopts a State Seal of Biliteracy (4/6/2022); first awarded in school year 2023-2024"}
CONTEXT NOT REQUESTED (recorded because the document was open, do not overwrite existing fields):
 - American Councils 2017 Table 1, Alabama: 821,691 K-12 population; 143,069 enrolled in foreign language; 17.41%
 - ASL: the Seal of Biliteracy was awarded in American Sign Language in Alabama in 2022-23 (languagesOffered, not regional/minority)
