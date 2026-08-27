### PW|Palau
STATUS: documented
NOTE: Palau is a sovereign state in free association with the United States. It appears in
US federal IDEA Part B data collections as a Compact grantee, not as a US state or territory.
Its own school-language question is Palauan against English; no US programme model is imported here.

SOURCES:
 - label: "Palau National Code Ann. tit. 22 ch. 4 (Handicapped Children Act), consolidated text, PacLII"
   url: https://www.paclii.org/pw/legis/consol_act/et22144.pdf
   http: 200
   tier: official-document
 - label: "US Department of Education, IDEA Section 618, State Part B child count and educational environments, 2024-25"
   url: https://data.ed.gov/dataset/71ca7d0c-a161-4abe-9e2b-4e68ffb1061a/resource/fdc6eb2c-4a4e-44ef-8b3d-01e68671e47c/download/bchildcountandedenvironment2024-25.csv
   http: 200
   tier: official-document
 - label: "US Department of Education, IDEA Section 618, State Part B personnel, 2023-24"
   url: https://data.ed.gov/dataset/fc85541b-d729-4722-8622-e814dae86b5b/resource/4f814d4e-a6b2-409c-ad14-a66f6718a669/download/bpersonnel2023-24.csv
   http: 200
   tier: official-document

EVIDENCE:
 - field: dld.serviceModel
   quote: "It is further recognized that such educational opportunities and related services shall be provided in regular classrooms and regular schools or other environments which provide education and interaction with nonhandicapped children"
   source: https://www.paclii.org/pw/legis/consol_act/et22144.pdf
   note: 22 PNCA s 402, statement of policy, Handicapped Children Act (source note: RPPL 3-9)
 - field: dld.serviceModel
   quote: "“Special education” means specially designed instruction provided at no cost to the parent to meet the unique needs of an eligible child, including, but not limited to, classroom instruction, speech pathological services, instruction in physical education, and vocational education."
   source: https://www.paclii.org/pw/legis/consol_act/et22144.pdf
   note: 22 PNCA s 403(s). Speech pathology sits INSIDE the definition of special education, not
   in the definition of "related services", which reads: "Related services means transportation and
   such developmental, corrective and other supportive services as are required to assist an
   eligible child to benefit from special education."
 - field: dld.serviceModel
   quote: "Speech-Language Pathologists" / "Fully Certified 0, Not Fully Certified 0, Total 0" (Republic of Palau row, 2023-2024)
   source: https://data.ed.gov/dataset/fc85541b-d729-4722-8622-e814dae86b5b/resource/4f814d4e-a6b2-409c-ad14-a66f6718a669/download/bpersonnel2023-24.csv
   note: Every related-services personnel type for Palau is reported as 0 (audiologists,
   OTs, PTs, psychologists, social workers, counselors, interpreters). Special education
   teachers are reported at 18.00 FTE, of which 0 fully certified. So the zero is a reported
   zero within a return that does carry non-zero rows, not an empty return.
 - field: dld.serviceModel
   quote: Republic of Palau, "Speech or language impairment", "Total, School Age" = 1; "Total, Early Childhood" = 0; against "All Disabilities" school age 88
   source: https://data.ed.gov/dataset/71ca7d0c-a161-4abe-9e2b-4e68ffb1061a/resource/fdc6eb2c-4a4e-44ef-8b3d-01e68671e47c/download/bchildcountandedenvironment2024-25.csv
   note: the single child is recorded in "Inside regular class 40% through 79% of the day".

ABSENCE PROVED:
 - Palau's Education title (22 PNCA, consolidated, 187k characters as extracted) contains the
   string "speech" only in the Handicapped Children Act passages quoted above; it contains
   no occurrence of "therap" at all (grep -oic "therap" = 0), while "related services" occurs
   throughout (sanity check: "education" occurs on every page). There is therefore no statutory
   rule on WHERE speech therapy is delivered beyond the general regular-classroom policy.

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Federal IDEA Part B return, a Compact grantee filing, not a national service audit
     - Statute puts services in regular classrooms and regular schools, 22 PNCA s 402
     - Speech pathological services sit inside the definition of special education, s 403(s)
     - Zero speech-language pathologists reported to IDEA Part B personnel, 2023-24
     - One school-age child in the speech or language impairment category, 2024-25

 - field: policyHistory
   rows:
     - {year: null, description: "Handicapped Children Act, RPPL 3-9, codified as 22 PNCA ch. 4 (year of RPPL 3-9 not stated in the consolidated text read; not asserted)"}
