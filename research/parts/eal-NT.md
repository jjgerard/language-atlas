# Language Atlas — `eal` (Majority language acquisition) — Northwest Territories

FRAMING NOTE — READ FIRST. The NWT does NOT operate an EAL/ESL newcomer regime and has no
newcomer designation. The *Education Act* instead requires the language of instruction to
be **an Official Language**, and the NWT has **eleven Official Languages, nine of them
Indigenous**. Which language a school teaches in is decided locally by the District
Education Authority. The Act then imposes a RECIPROCAL rule (s.73): if the language of
instruction is an Official Language other than English, English must be taught as a
language; if English is the language of instruction, an Official Language other than
English must be taught. That reciprocal rule, not a newcomer designation, is the NWT's
answer to "a child who arrives without the school language". Do not call any of this EAL.

### CA-NT|Northwest Territories
STATUS: documented

SOURCES:
 - label: "Education Act, SNWT 1995, c.28 (consolidated, bilingual English/French text), ss. 70-74, 'Language of Instruction and Language Taught'"
   url: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   http: 200 (application/pdf, 1,043,696 bytes); md5 identical to the copy banked earlier in the session
   tier: official-document
 - label: "Official Languages Act, RSNWT 1988, c.O-1 (consolidated), s.4 Official Languages, s.5 equality of status"
   url: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   http: 200 (application/pdf, 439,875 bytes); md5 identical to the banked copy
   tier: official-document
 - label: "Northwest Territories Junior Kindergarten - Grade 12 Indigenous Languages and Education Policy, Department of Education, Culture and Employment, FINAL August 2018"
   url: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
   http: 200 (application/pdf); reached via https://www.ece.gov.nt.ca/en/content/northwest-territories-nwt-junior-kindergarten-grade-12-jk-12-indigenous-languages-and which redirects straight to the PDF
   tier: official-document
 - label: "ECE, 'Indigenous Languages Education' departmental page (describes the ILE Secretariat and the Our Languages curriculum)"
   url: https://www.ece.gov.nt.ca/en/indigenous-languages-education
   http: retrieved and parsed in session (banked as nt_ile_policy_page.html)
   tier: official-document

ABSENCE, PROVEN BY TERM COUNT:
 - Education Act consolidation, case-insensitive counts of the retrieved text:
     "English as a second language"      0
     "ESL"                               0
     "English as an additional language" 0
     "immigrant"                         0
     "newcomer"                          0
   Sanity-check terms present in the same file:
     "language of instruction"          18
     "Official Language"                 9
 - NWT JK-12 Indigenous Languages and Education Policy (2018), same counts:
     "English as a second language"      0
     "ESL"                               0
     "immigrant"                         0
     "newcomer"                          0
     "second language"                   0
   Sanity check: "Indigenous language" 26.
 - Note the Education Act also returns 0 for "Indigenous language" and 0 for "Aboriginal
   language" — the Act works entirely through the term "Official Language" and leaves the
   Indigenous-language naming to the Official Languages Act and to policy.
 - CONCLUSION: neither the Act nor the flagship language policy contains any newcomer,
   immigrant or additional-language designation.

EVIDENCE:
 - field: newcomerCriteria
   quote: "The language of instruction of the education program must be an Official Language."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.70(1). The school language is not fixed territorially — it is whichever Official Language the DEA chooses
 - field: newcomerCriteria
   quote: "There may be more than one language of instruction in an education district and more than one language of instruction in a school."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.70(2)
 - field: newcomerCriteria
   quote: "Chipewyan, Cree, English, French, Gwich'in, Inuinnaqtun, Inuktitut, Inuvialuktun, North Slavey, South Slavey and Tlicho are the Official Languages of the Northwest Territories."
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   note: s.4. Eleven languages; the diacritics in Tlicho are not reproducible from the extracted text
 - field: newcomerCriteria
   quote: NO DESIGNATION FOUND. There is no screening, assessment, home-language survey or entry criterion in the retrieved Act for a child who does not speak the school's language. Term counts above evidence this.
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
 - field: removalCriteria
   quote: NO PROVISION FOUND. The Act contains no exit, reclassification or monitoring rule, because it creates no language designation to exit from.
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
 - field: l2Support
   quote: "If an Official Language other than English is not the language of instruction, English must be taught as a language as part of the education program."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.73(2). THIS is the NWT's functional equivalent of majority-language support — English as a taught language, guaranteed by statute, not a remedial designation
 - field: l2Support
   quote: "A District Education Authority shall, in accordance with the requirements of this section and in accordance with the regulations, determine a language of instruction to be used in the education district."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.71(1)
 - field: l2Support
   quote: "A District Education Authority may choose a language as the language of instruction if (a) there is a significant demand for the language in the education district; (b) there are a sufficient number of teachers who are fluent in the language available to teach in the language in the education district; and (c) there are sufficient and suitable school program materials available in the language."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.71(4) — a three-part feasibility test: demand, teachers, materials
 - field: l2Support
   quote: "Before determining a language of instruction in an education district that is in an education division in which there is more than one education district, a District Education Authority shall request information from the Divisional Education Council relating to the development and use of school program materials and the supply of teachers who are fluent in a language and their availability to teach in that language."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.71(2)
 - field: l1Support
   quote: "If English is the language of instruction, an Official Language other than English must be taught as part of the education program."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.73(3) — the mirror duty; where English is the school language an Indigenous or French Official Language must still be taught
 - field: l1Support
   quote: "The NWT Official Languages Act gives legal recognition and protection to nine Indigenous languages: Chipewyan, Cree, Gwich'in, Inuinnaqtun, Inuktitut, Inuvialuktun, North Slavey, South Slavey and Tlicho."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: l1Support
   quote: "Schools that provide Indigenous language instruction must offer dedicated time for Indigenous language instruction within the regular education program and actively implement the Our Languages curriculum"
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: l1Support
   quote: "Allocating resources to support Indigenous language instruction through an immersion approach, where and when possible."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: l1Support
   quote: "Indigenizing education in the NWT should centre Indigenous knowledge, models, methods and content grounded in the Minister-approved foundational curricula of Dene Kede and/or Inuuqatigiit within the regular education system."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: l1Support
   quote: "Dene Kede: An NWT foundational curriculum that encompasses the Dene languages, cultures and worldviews of five Dene Nations: Gwich'in, Sahtu, Dehcho, Tlicho and Akaitcho." / "Inuuqatigiit: A NWT foundational curriculum that encompasses the worldviews of the Inuit grounded in the belief of the Elders that education must be community-based."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: l3Support
   quote: "Students whose parents have a right under section 23 of the Canadian Charter of Rights and Freedoms to have their children receive instruction in French are entitled to receive that instruction in accordance with the regulations wherever in the Territories that right applies."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.72
 - field: l3Support
   quote: "A parent of a student in a home schooling program may apply in writing to the Minister for an exemption from using or teaching the language determined by the District Education Authority as the language of instruction or the language to be taught as part of the education program."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.74(1) — the only opt-out route in the Act, and it is limited to home schooling
 - field: bilingualEducationNotes
   quote: "The Minister may give directions establishing standards and guidelines for the selection and use of a language of instruction to assure the maintenance of the highest possible standards of education."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: s.71(3)
 - field: bilingualEducationNotes
   quote: "To the extent and in the manner provided in this Act and any regulations under this Act, the Official Languages of the Territories have equality of status and equal rights and privileges as to their use in all government institutions."
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
 - field: bilingualEducationNotes
   quote: "This Policy applies to all education bodies, with regard to use of funding for JK-12 Indigenous language and education programming."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: bilingualEducationNotes
   quote: "Under section 128(1) of the Education Act the Minister may, by means of a contribution, provide funding required for the delivery of the education program."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: newcomerProportion
   quote: NOT FOUND. No NWT enrolment or language-share series was retrieved and verified in this session. NWT Bureau of Statistics and Census 2021 were not successfully retrieved. Report as not-found rather than estimated.
   source: n/a
 - field: achievementGap
   quote: NOT FOUND. No verified NWT outcome data disaggregated by language was retrieved. No gap claim is made.
   source: n/a
 - field: policyHistory
   quote: "EDUCATION ACT / SNWT 1995,c.28 / In force July 1, 1996; SI-003-96"
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
 - field: policyHistory
   quote: "LTNO 1996, ch. 10, art. 24."
   source: https://www.justice.gov.nt.ca/en/files/legislation/education/education.a.pdf
   note: the amendment note printed at the foot of s.71, i.e. the language-of-instruction choice test was amended by SNWT 1996, c.10, s.24
 - field: policyHistory
   quote: "RSNWT 1988,c.56 (Supp.),s.4; SNWT 2003,c.23,s.5."
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   note: the amendment chain for s.4, the list of Official Languages; SNWT 2003 c.23 is the modern amendment
 - field: policyHistory
   quote: "In 2004, the Department of ECE released the Aboriginal Language and Culture-Based Education (ALCBE) Departmental Directive (Directive). The Directive provided direction for the funding allocation for Kindergarten to grade 12 Indigenous language and cultural programming"
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: policyHistory
   quote: "Moving from a directive to a policy is a more effective and efficient way to support education bodies in providing Indigenous languages and education."
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
 - field: policyHistory
   quote: "FINAL August 2018  Department of Education, Culture and Employment"
   source: https://www.ece.gov.nt.ca/sites/ece/files/resources/nwt_indigenous_languages_and_education_ile_policy_-_final_august_2018.pdf
   note: the policy's own dateline, appearing on every page — the ILE Policy year is 2018, verified from the document
 - field: policyHistory
   quote: "The Indigenous Languages and Education Secretariat oversees the implementation of the ILE Policy."
   source: https://www.ece.gov.nt.ca/en/indigenous-languages-education

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - No newcomer or additional-language designation exists in NWT law or policy
     - Education Act s.70 requires the language of instruction to be an Official Language
     - Eleven Official Languages, nine of them Indigenous, under the Official Languages Act
     - A school may run more than one language of instruction at once
     - The District Education Authority, not the territory, picks the school language
 - field: removalCriteria
   bullets:
     - No exit or reclassification rule: no designation exists to be removed from
     - Term count of the Education Act: ESL 0, immigrant 0, newcomer 0
     - Sanity check on the same file: language of instruction 18, Official Language 9
     - Only opt-out in the Act is a Ministerial exemption for home-schooled pupils
 - field: newcomerProportion
   bullets:
     - Not found: no verified NWT enrolment or language-share series retrieved
 - field: achievementGap
   bullets:
     - Not found: no verified NWT outcome data disaggregated by language retrieved
 - field: l2Support
   bullets:
     - Where the school language is not English, English must be taught as a language
     - That statutory duty replaces any remedial newcomer designation
     - DEA may adopt a language only on a demand, teachers and materials test
     - It must first consult the Divisional Education Council on teachers and materials
 - field: l1Support
   bullets:
     - Mirror duty: where English is the school language, another Official Language is taught
     - ILE Policy 2018 requires dedicated Indigenous language time in the regular programme
     - Immersion approach to be resourced where and when possible
     - Dene Kede and Inuuqatigiit are the Minister-approved foundational curricula
 - field: l3Support
   bullets:
     - Section 23 Charter rights to French instruction apply wherever the right applies
     - Home-schooling parents may seek exemption from the language taught or used
 - field: bilingualEducationNotes
   bullets:
     - Official Languages Act gives the eleven languages equality of status
     - Minister may set standards and guidelines for choosing a language of instruction
     - ILE Policy governs use of funding for JK-12 Indigenous language programming
     - Funding flows under Education Act s.128(1) as a Ministerial contribution
 - field: policyHistory
   bullets:
     - 1995 Education Act SNWT c.28, in force 1 July 1996
     - 1996 SNWT c.10 s.24 amends the language-of-instruction choice test
     - 2003 SNWT c.23 s.5 amends the list of Official Languages
     - 2004 ECE Aboriginal Language and Culture-Based Education Directive on funding
     - 2018 JK-12 Indigenous Languages and Education Policy replaces that Directive
