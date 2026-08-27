### US|Texas - map eal (bilingualEducationNotes) and map dld (serviceModel)
STATUS: documented

SOURCES:
 - label: "Education Commission of the States, 50-State Comparison: English Learner Policies, All Data Points (May 2020), column 'Which program approaches does state policy authorize?' - Texas row, citing Tex. Educ. Code Ann. section 29.053"
   url: https://reports.ecs.org/comparisons/english-learner-policies
   http: 200
   tier: secondary-source
 - label: "TEA, Bilingual Education: Bilingual and English as a Second Language Education Programs"
   url: https://tea.texas.gov/academics/special-student-populations/english-learner-support/bilingual-and-english-as-a-second-language-education-programs
   http: 200 (redirects to tea.texas.gov/special-populations-and-support/english-learner-support/...)
   tier: official-document
 - label: "19 Tex. Admin. Code section 89.1040, Eligibility Criteria (Cornell LII reproduction; txrules.elaws.us timed out and the Texas SOS TAC site now serves a JavaScript application)"
   url: https://www.law.cornell.edu/regulations/texas/19-Tex-Admin-Code-SS-89-1040
   http: 200
   tier: secondary-source

EVIDENCE:
 - field: bilingualEducationNotes
   quote: "Bilingual education, instruction in English as a Second Language (ESL), or other transitional language instruction approved by the state department of education in post-elementary grades through grade 8.  Instruction in ESL in grades 9 through 12."
   source: https://reports.ecs.org/comparisons/english-learner-policies
 - field: bilingualEducationNotes
   quote: "The Emergent Bilingual Support provides direction and leadership for the implementation of Bilingual and English as a Second Language (ESL) Programs for emergent bilingual (EB) students."
   source: https://tea.texas.gov/academics/special-student-populations/english-learner-support/bilingual-and-english-as-a-second-language-education-programs
 - field: serviceModel
   quote: "The multidisciplinary team that collects or reviews evaluation data in connection with the determination of a student's eligibility based on a speech impairment must include a certified speech and hearing therapist, a certified speech and language therapist, or a licensed speech/language pathologist."
   source: https://www.law.cornell.edu/regulations/texas/19-Tex-Admin-Code-SS-89-1040
 - field: serviceModel
   quote: "A student with a speech impairment is one who has been determined to meet the criteria for speech or language impairment as stated in 34 CFR, section 300.8(c)(11)."
   source: https://www.law.cornell.edu/regulations/texas/19-Tex-Admin-Code-SS-89-1040

DRAFT BULLETS:
 - field: eal.bilingualEducationNotes
   bullets:
     - Bilingual education is state-authorised only through grade 8, per Tex. Educ. Code 29.053
     - In grades 9 to 12 the authorised model is ESL instruction
     - Texas calls the students emergent bilingual (EB), not English learner, in current TEA usage
     - Other transitional language instruction may be approved by the state department of education
 - field: dld.serviceModel
   bullets:
     - Texas defers to the federal 34 CFR 300.8(c)(11) definition rather than writing its own
     - Evaluation team must include a certified speech and hearing or speech and language therapist
     - A licensed speech/language pathologist may fill that role instead
     - Read on Cornell LII: the official Texas TAC site now serves a JavaScript app
