### NR|Nauru
STATUS: partial
SOURCES:
 - label: Republic of Nauru Department of Education, Nauru Inclusive Education Policy and Guidelines 2017, categories of special education need and s. 8.1
   url: https://pacificdata.org/data/dataset/0208b22b-e019-4fc4-9e20-9251855ce9e1/resource/172a7c3c-5898-4287-8055-65a94a1bc412/download/nauru-inclusive-education-policy-and-guidelines.pdf
   http: 200
   tier: official-document
 - label: Education Act 2011, Republic of Nauru, s. 3 definitions and Part 11 (Pacific Data Hub copy)
   url: https://pacificdata.org/data/dataset/3a3dfcbc-4e57-4c25-8f6a-a291ef16ba9a/resource/6a95ff32-9ce4-4df0-9fbd-acec9107b52f/download/education-act-2011.pdf
   http: 200
   tier: official-document
 - label: National Statement of Commitment to Transform Education, Republic of Nauru (19 September 2022)
   url: https://media.unesco.org/sites/default/files/webform/ed3002/Nauru_National_Statement_of_Commitment.pdf
   http: 200
   tier: official-document
EVIDENCE:
 - field: dld.serviceModel
   quote: "specialists with other government ministries e.g. psychologists, occupational therapists, physiotherapists, dentists, audiologists, paediatricians, doctors and nurses etc."
   source: https://pacificdata.org/data/dataset/0208b22b-e019-4fc4-9e20-9251855ce9e1/resource/172a7c3c-5898-4287-8055-65a94a1bc412/download/nauru-inclusive-education-policy-and-guidelines.pdf
   note: s. 8.1.4; the list contains no speech and language therapist
 - field: dld.serviceModel
   quote: "This category can consist of other neurological impairments such as Attention Deficit, Hyperactivity Disorder (ADHD) and Dyslexia and other communication difficulties that are the result of neurological issues."
   source: https://pacificdata.org/data/dataset/0208b22b-e019-4fc4-9e20-9251855ce9e1/resource/172a7c3c-5898-4287-8055-65a94a1bc412/download/nauru-inclusive-education-policy-and-guidelines.pdf
   note: categories of special education need, under Intellectual
 - field: dld.serviceModel
   quote: "TERM COUNTS: "speech" 0 in the Nauru Inclusive Education Policy and Guidelines, 0 in the Education Act 2011, and 0 in the Nauru country profile of the Pacific Regional Inclusive Education Review; sanity checks: "disability"/"impairment" 3 each and "school" 44 in the policy, "school" 351 in the Act."
   source: https://pacificdata.org/data/dataset/0208b22b-e019-4fc4-9e20-9251855ce9e1/resource/172a7c3c-5898-4287-8055-65a94a1bc412/download/nauru-inclusive-education-policy-and-guidelines.pdf
   note: absence proof
 - field: fl.languagesOffered
   quote: "TERM COUNTS in the Education Act 2011 text: "language" 0 and "English" 0, against "school" 351 and "curriculum" 35. The Act creates a curriculum power but names no language of instruction and no language subject."
   source: https://pacificdata.org/data/dataset/3a3dfcbc-4e57-4c25-8f6a-a291ef16ba9a/resource/6a95ff32-9ce4-4df0-9fbd-acec9107b52f/download/education-act-2011.pdf
   note: absence proof, pdftotext -layout extraction of 1,877 non-blank lines
 - field: fl.upperSecondary
   quote: "'secondary education' means education for year levels 7 to 13"
   source: https://pacificdata.org/data/dataset/3a3dfcbc-4e57-4c25-8f6a-a291ef16ba9a/resource/6a95ff32-9ce4-4df0-9fbd-acec9107b52f/download/education-act-2011.pdf
   note: s. 3 definitions
 - field: fl.upperSecondary
   quote: "Pedagogic development in terms of: rich tasks; student centred learning; special education; Nauruan studies; and specific strategies to address low literacy and numeracy rates"
   source: https://media.unesco.org/sites/default/files/webform/ed3002/Nauru_National_Statement_of_Commitment.pdf
   note: commitments list
DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - No speech and language service is named in any cited Nauru source
     - 'speech' returns 0 hits in the Act, the inclusive education policy and the PDF review
     - Shared specialists listed are psychologists, OTs, physios, audiologists and doctors
     - Communication difficulties appear only as a sub-item under Intellectual needs
 - field: fl.languagesOffered
   bullets:
     - The Education Act 2011 names no language at all: 'language' returns 0 hits
     - 'English' also returns 0 hits, against 351 hits for 'school'
     - The Act confers a curriculum power without prescribing any language subject
     - The 2022 national statement names Nauruan studies as a pedagogic priority
 - field: fl.upperSecondary
   bullets:
     - No cited Nauru source states any language requirement at upper secondary
     - Secondary education is defined as year levels 7 to 13
     - The Act's silence on language extends across all year levels
     - Nauruan studies is named as a development area, not as an examined subject
 - field: policyHistory
   rows:
     - {year: 2011, description: Nauru Education Act 2011 enacted, defining secondary education as year levels 7 to 13}
     - {year: 2017, description: Nauru Inclusive Education Policy and Guidelines issued by the Department of Education}
     - {year: 2022, description: National Statement of Commitment to Transform Education presented, 19 September 2022}
