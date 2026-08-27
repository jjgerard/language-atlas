### FM|Micronesia
STATUS: documented
NOTE: The Federated States of Micronesia is a sovereign state in free association with the
United States and appears in US federal IDEA Part B collections as a Compact grantee, not as
a US state. Schooling runs across the state languages (Chuukese, Pohnpeian, Kosraean, Yapese
and others) against English; no US programme model is imported here.

SOURCES:
 - label: "FSM Code tit. 40 ch. 2 subch. III (Federated States of Micronesia Special Education Act of 1993), s 231-232, consolidated text, PacLII"
   url: https://www.paclii.org/fm/legis/consol_act/e83.pdf
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
   quote: "This subchapter shall be known and may be cited as the \"Federated States of Micronesia Special Education Act of 1993.\""
   source: https://www.paclii.org/fm/legis/consol_act/e83.pdf
   note: FSM Code tit. 40 s 231
 - field: dld.serviceModel
   quote: "eligible children with disabilities shall primarily receive special education and related services, insofar as appropriate, in regular classrooms and regular schools or other natural environments, which provide education and interaction with non-disabled children, that are offered by the Federated States of Micronesia through each State Department of Education and other public agencies"
   source: https://www.paclii.org/fm/legis/consol_act/e83.pdf
   note: FSM Code tit. 40 s 232(1), Statement of Policy. Delivery is devolved to each STATE
   department of education, not run nationally.
 - field: dld.serviceModel
   quote: "Speech-Language Pathologists" / "Fully Certified 0, Not Fully Certified 0, Total 0" (Federated States of Micronesia row, 2023-2024)
   source: https://data.ed.gov/dataset/fc85541b-d729-4722-8622-e814dae86b5b/resource/4f814d4e-a6b2-409c-ad14-a66f6718a669/download/bpersonnel2023-24.csv
   note: sanity check that the return is not empty - the same FSM block reports 2 counselors
   and 1 physical therapist, 159 special education teachers (52 fully certified, 107 not) and
   21 paraprofessionals. So the SLP zero is a reported zero.
 - field: dld.serviceModel
   quote: Federated States of Micronesia, "Speech or language impairment": "Inside regular class 80% or more of the day" = 67; "Inside regular class 40% through 79% of the day" = 3; "Separate School, School Age" = 1; "Total, School Age" = 77
   source: https://data.ed.gov/dataset/71ca7d0c-a161-4abe-9e2b-4e68ffb1061a/resource/fdc6eb2c-4a4e-44ef-8b3d-01e68671e47c/download/bchildcountandedenvironment2024-25.csv
   note: early childhood, all 8 such children are in "Services in Regular Early Childhood
   Program (attend at least 10 hours)". Against 1,378 school-age children in all disabilities.

ABSENCE PROVED:
 - The consolidated FSM Education title (137k characters as extracted) contains no occurrence
   of the string "therap" (grep -oic = 0) while "related services" occurs repeatedly and
   "special education" appears in the chapter headings. The statute therefore names no
   therapy profession and sets no delivery format; the only statutory locus is the
   regular-classroom default at s 232(1).

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Federal IDEA Part B return, a Compact grantee filing, not a national service audit
     - Statute: services primarily in regular classrooms and regular schools, FSM Code 40 s 232
     - Delivery devolved to each state department of education, not run nationally
     - Zero speech-language pathologists reported to IDEA Part B personnel, 2023-24
     - 67 of 77 school-age speech or language impairment pupils in regular class 80%+ of day

 - field: policyHistory
   rows:
     - {year: 1993, description: "Federated States of Micronesia Special Education Act of 1993, FSM Code tit. 40 subch. III, puts services primarily in regular classrooms"}
