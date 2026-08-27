### MH|Marshall Islands
STATUS: documented
NOTE: The Republic of the Marshall Islands is a sovereign state in free association with the
United States and appears in US federal IDEA Part B collections as a Compact grantee, not as a
US state. Its school-language question is Marshallese against English; no US programme model
is imported here.

SOURCES:
 - label: "Marshall Islands Public School System Act 2013 [14 MIRC Ch.3], consolidated text, PacLII"
   url: https://www.paclii.org/mh/legis/consol_act_2024/mipssa2013386.pdf
   http: 200
   tier: official-document
 - label: "RMI Public School System, Special Education Procedures Manual (Ministry of Education standards; distributed from the PSS special-education documents page)"
   url: https://pss.edu.mh/documents/special-education-documents/
   http: 200
   tier: official-document
   provenance-caveat: the landing page was retrieved and returns 200, but it links its documents
   through Google Drive folders rather than direct file URLs; the manual text quoted below was
   read from a copy already held on this project's disk (cofa/rmi_sped_procedures), not
   downloaded afresh from a stable file URL in this session. Treat the two Option quotes as
   needing a file-level URL before publication.
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
   quote: "Option 3. The regular classroom with additional instruction by a special education teacher or speech and language therapist in the regular classroom. The teacher or therapist works with the regular teacher and provides direct instruction in the regular class to an eligible child whose identified needs can be met with part-time support."
   source: https://pss.edu.mh/documents/special-education-documents/ (Special Education Procedures Manual, placement options)
 - field: dld.serviceModel
   quote: "Option 4. The regular educational environment with special education resource support. ... Additional educational experiences are provided by a special education resource teacher or speech and language therapist in a pull-out program designed to meet identified needs."
   source: https://pss.edu.mh/documents/special-education-documents/ (Special Education Procedures Manual, placement options)
 - field: dld.serviceModel
   quote: "\"Related services\" means transportation and such developmental, corrective, and other supportive services as may be required to assist a child with a disability to benefit from special education. These related services may include: (a) transportation, (b) speech therapy, (c) counseling, (d) school health services ... Medical services for diagnosis and evaluation and audiology services are provided through arrangements with the Ministry of Health (MOH)."
   source: https://pss.edu.mh/documents/special-education-documents/ (Special Education Procedures Manual, definitions)
 - field: dld.serviceModel
   quote: "Speech-Language Pathologists" / "Fully Certified 0, Not Fully Certified 0, Total 0" (Republic of the Marshall Islands row, 2023-2024)
   source: https://data.ed.gov/dataset/fc85541b-d729-4722-8622-e814dae86b5b/resource/4f814d4e-a6b2-409c-ad14-a66f6718a669/download/bpersonnel2023-24.csv
   note: every related-services personnel type for RMI is 0; special education teachers are
   reported at 125 (74 fully certified, 51 not). So the SLP zero sits in a return with
   non-zero rows elsewhere.
 - field: dld.serviceModel
   quote: Republic of the Marshall Islands, "Speech or language impairment": "Inside regular class 80% or more of the day" = 25; "Inside regular class less than 40% of the day" = 1; "Parentally Placed in Private Schools" = 6; "Total, School Age" = 32; "Total, Early Childhood" = 0
   source: https://data.ed.gov/dataset/71ca7d0c-a161-4abe-9e2b-4e68ffb1061a/resource/fdc6eb2c-4a4e-44ef-8b3d-01e68671e47c/download/bchildcountandedenvironment2024-25.csv

ABSENCE PROVED:
 - The Public School System Act 2013 (49k characters as extracted) contains no occurrence of
   "speech" (grep -oic = 0) and none of "therap" (0), while "special education" (2 lines) and
   "related services" (2 lines) are present. The Act therefore defines special education but
   says nothing about where or by whom speech and language therapy is delivered; that sits in
   the Ministry's procedures manual, not the statute.

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Delivery format is set by the PSS procedures manual, not by the 2013 Act
     - Manual option: therapist gives direct instruction inside the regular class, part-time
     - Manual option: resource support pull-out programme by a speech and language therapist
     - Speech therapy listed as a related service; audiology arranged through the Health Ministry
     - Zero speech-language pathologists reported to IDEA Part B personnel, 2023-24

 - field: policyHistory
   rows:
     - {year: 2013, description: "Marshall Islands Public School System Act 2013 (14 MIRC Ch.3) defines special education and related services for children with disabilities"}
