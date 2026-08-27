### US|Colorado
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
   note: Colorado is NOT among them.
 - field: fl.primaryRequirement
   quote: "Our results show that it is rare for states to have requirements at the elementary and middle school levels."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement
   quote: "The results presented here reflect policy findings as of December 2024 when data checking was complete."
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
 - field: fl.primaryRequirement (high-school contrast, from the cited ECS comparison)
   quote: "With the exception 0.5 unit U.S. and Colorado government, all graduation requirements set by local districts."
   source: https://reports.ecs.org/comparisons/high-school-graduation-requirements-01
   note: ECS 2019 "Foreign Lang." column for Colorado. This is a note ECS spans across the subject columns, not a language-specific entry.
 - field: fl.primaryRequirement
   quote: "No world language graduation requirement and courses are not required to be offered"
   source: https://onlinelibrary.wiley.com/doi/10.1111/flan.70020?af=R
   note: Foreign Language Annals Table 6 category for Colorado.
 - field: fl.primaryRequirement
   quote: "Core subjects of reading, writing, mathematics, science, history, and geography"
   source: https://ballotpedia.org/K-12_areas_of_instruction_required_by_statute_in_the_states
   note: Colorado Code 22-1-104, 22-1-109, 22-2-406 (2021), as listed by Ballotpedia. Reproduced by Ballotpedia from the statute; the list names no foreign or world language at elementary level unless quoted otherwise above.
 - field: fl.regionalMinorityLanguages
   quote: "Table 4 of the Seal of Biliteracy 2024 report lists every Native American and Pacific Islander language awarded and the states awarding it: Keres (New Mexico), Navajo (Arizona, New Mexico), 'olelo Hawai'i (Hawai'i), Samoan (California, Hawai'i, Oregon, Washington), Tewa (New Mexico), Tiwa (New Mexico), Yakima (Washington), Yugtun (Alaska), Yup'ik (Alaska), Yurok (California), Zuni (New Mexico)."
   source: https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf
   note: Colorado does not appear anywhere in Table 4.
 - field: fl.regionalMinorityLanguages
   quote: "the following six state agencies did not submit data for the 2023 SoBL report: Colorado, Mississippi, Nevada, Penssylvania, Texas, and Washington, D.C."
   source: https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf
   note: Colorado therefore has no list of awarded languages in this report - a data gap, not a demonstrated absence of Indigenous-language awards.
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
   Combined with Colorado's absence from Seal of Biliteracy Table 4, no provision for a language of the
   United States itself was found for this state in any source retrieved.
DRAFT BULLETS:
 - field: fl.primaryRequirement
   bullets:
     - Peer-reviewed 50-state statute inventory, policy as at December 2024
     - No state law requires world language instruction in elementary school
     - Statutory core subjects are reading, writing, maths, science, history, geography
     - No world language graduation requirement, and none required to be offered
 - field: fl.regionalMinorityLanguages
   bullets:
     - Evidence is the 2024 Seal of Biliteracy report and a 50-state statute inventory
     - No provision for an Indigenous or other language of the state was found
     - State filed no Seal language list for 2022-23, so that check is a data gap
     - Only AK, AZ, CA, HI, NM, OR, WA awarded Indigenous US languages
POLICY HISTORY (proposed rows):
 - {year: 2017, description: "Colorado adopts a State Seal of Biliteracy (3/30/2017); first awarded in school year 2017-2018"}
CONTEXT NOT REQUESTED (recorded because the document was open, do not overwrite existing fields):
 - American Councils 2017 Table 1, Colorado: 896,918 K-12 population; 110,995 enrolled in foreign language; 12.38%
