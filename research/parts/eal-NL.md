# Language Atlas — `eal` (Majority language acquisition) — Newfoundland and Labrador

TERMINOLOGY NOTE: **EAL is the province's own current word.** The Department of Education
and Early Childhood Development titles its curriculum-support page "EAL and LEARN" and its
framework glosses "EAL English as an Additional Language". The older term ESL survives in
the province's 2012 assessment guidelines and in quoted material. NL also runs a second,
distinct programme — **LEARN, Literacy Enrichment and Academic Readiness for Newcomers** —
which is its category for pupils with significant interrupted schooling, i.e. the NL
analogue of SLIFE. Both must be recorded; they are not the same designation.

### CA-NL|Newfoundland and Labrador
STATUS: partial (policy documented; no enrolment series, no gap data, no funding rule found)

SOURCES:
 - label: "Government of Newfoundland and Labrador, Department of Education and Early Childhood Development, 'EAL and LEARN - Curriculum Support' (Curriculum Support Documents index page)"
   url: https://www.gov.nl.ca/education/k12/curriculum/documents/learn/
   http: 200 (text/html, 200,365 bytes); page title retrieved reads "EAL and LEARN - Curriculum Support - Education and Early Childhood Development"
   tier: official-document
 - label: "'Dedicated to Diversity: A Framework for Multicultural Education in Newfoundland and Labrador', Department of Education and Early Childhood Development — Guiding Principle #1 Access to Curriculum (1.1-1.7), Guiding Principle #2 Identity and Belonging (2.1-2.2)"
   url: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   http: 200 (application/pdf, 5,104,045 bytes)
   tier: official-document

NOT RETRIEVED / NEGATIVE:
 - "Supporting Students with Culturally and Linguistically Diverse Backgrounds" (linked from
   the department's own EAL and LEARN page at
   https://www.k12pl.nl.ca/assets/documents/official/Multicultural%20Education/Curriculum%20for%20Newcomer%20Programs/Supporting%20Students%20with%20CLD%20backgrounds%20FINAL.pdf)
   FAILED TO CONNECT — curl exit 28, connection timeout to www.k12pl.nl.ca after 21s. Not
   quoted, not relied on.
 - NO FUNDING FORMULA FOUND. The retrieved framework contains no teacher-allocation
   formula, no per-pupil EAL grant and no fixed number of funded years. Grep of the
   retrieved text for "allocat", "funding" and "formula" returns only incidental uses
   (inclusion in "programming, planning and allocation", and a citation to an Ontario
   funding URL). The removalCriteria hypothesis — that NL funds additional-language
   support for a fixed number of years — is NOT supported by anything retrieved. Do not
   assert it.
 - NO EXIT OR RECLASSIFICATION RULE FOUND. Grep of the framework for "exit", "no longer",
   "discontinu" and "transition out" returns no provision. The only eligibility language is
   about entry ("students eligible for EAL or LEARN instruction"), never about leaving.
 - NO PUBLICATION DATE is printed in the retrieved document. The URL filename encodes
   "Mar-24-23"; that is a filename, not a printed date, and is flagged rather than asserted.
   The latest source the framework itself cites is the Premier's Task Force of 2017.

ABSENCE / PRESENCE, BY TERM COUNT (Dedicated to Diversity, retrieved text, word-boundary,
case-insensitive) — this is a POSITIVE control showing the extraction worked:
     "EAL"                                35
     "LEARN" (as the programme acronym)   28
     "newcomer"                           75
     "English as an Additional Language"   4
     "ESL"                                 9
     "francisation"                        0
 Interpretation: EAL and newcomer are richly present, so a zero elsewhere in this file is a
 real zero. "francisation" is absent, as expected — NL's francophone sector is a single
 provincial district and the framework does not describe a French-side newcomer designation.

EVIDENCE:
 - field: newcomerCriteria
   quote: "EAL students must be identified as quickly as possible upon arrival or at the start of the school year. It is the responsibility of EDU and/or school district personnel, including school administrators and teachers, to identify EAL students in Newfoundland and Labrador schools and arrange timely EAL placement evaluations."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: newcomerCriteria
   quote: "The intake procedure at neighbourhood schools should include screening for potential EAL or LEARN eligibility."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: TWO parallel eligibilities are screened at intake — EAL and LEARN
 - field: newcomerCriteria
   quote: "Standard literacy assessments targeted to native speakers should not be used to evaluate newcomer students since they do not adequately capture the students' skills and abilities."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: newcomerCriteria
   quote: "The placement evaluation should be undertaken and results forwarded to schools within a reasonable time frame. Grade and course placements and recommended supports should adequately address any gaps and support the learning profile identified during placement evaluations."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: "a reasonable time frame" — NL sets no numeric deadline, unlike the US 30-day rule
 - field: newcomerCriteria
   quote: "Evaluators must also be aware that some observed behaviours associated with learning differences may have a root cause in additional language development. ... It is important that the process of additional language development not be misinterpreted as a learning difficulty."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: removalCriteria
   quote: NO PROVISION FOUND. See the term-count block above. The framework legislates entry and screening only. No exit rule, no reclassification test, no funded-years limit was found in any retrieved NL source.
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: removalCriteria
   quote: "As students transition into prescribed-curriculum classes, it is imperative that they continue to be supported."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: the nearest thing to an exit statement — and it is a duty to CONTINUE support, not a rule for ending it
 - field: l2Support
   quote: "Newcomer students in need of English support to access the prescribed curriculum require intensive EAL instruction delivered by qualified, specialized EAL teachers and supported by the whole school community. This must take place throughout the school system at all grade levels."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: l2Support
   quote: "The student-teacher ratio for EAL instruction should reflect the high and intensive need for EAL instruction"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: a ratio PRINCIPLE with no number attached anywhere in the retrieved document
 - field: l2Support
   quote: "The program models adopted for the delivery of EAL services must be selected based on sound educational principles and research."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: NL prescribes no single programme model
 - field: l2Support
   quote: "Classroom/subject teachers should provide support for ELLs using strategies, such as providing word banks, reading text aloud, providing an alternate setting and extra time for evaluations, clarifying and/or translating instructions, directions, questions, and providing access to scheduled support classes, electronic translators and differentiated instruction."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: l1Support
   quote: "Support the use of the first language as a tool for learning and engagement."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: Guiding Principle 2.1 — an explicit named principle, unusually strong for a Canadian province
 - field: l1Support
   quote: "Students who are learning English are more likely to be successful if the L1 is supported as a tool for learning, as well as for accessing prior knowledge. The development of the additional language is grounded in L1 competency."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: l1Support
   quote: "The L1 can be incorporated by permitting and encouraging students to translate into L1 as needed, research and draft assignments in L1 before presenting final work in the additional language, use L1 throughout the school and, where possible, work together in L1 groups in class and connect with L1 speakers in the community."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: l1Support
   quote: "Supporting L1 in the classroom boosts motivation, engagement and student learning because it gives the student a sense of value and permits processing at a higher level of learning and analysis than is possible in an emerging additional language."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: l3Support
   quote: "Diverse cultures and languages must not only be accepted but celebrated and encouraged in a way that makes all students with culturally and linguistically diverse backgrounds not only feel comfortable but empowered to express their identities"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: Guiding Principle 2.2. No third-language instruction entitlement was found in the retrieved documents
 - field: bilingualEducationNotes
   quote: "These skills are developed in the LEARN program, which provides sheltered, supplementary, small-group instruction in EAL, literacy, numeracy, and curriculum areas, such as science and social studies."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: LEARN is SHELTERED and SUPPLEMENTARY — it is not bilingual education; NL provides no first-language medium of instruction
 - field: bilingualEducationNotes
   quote: "Students with large gaps in education and little-to-no first language literacy require individualized instruction targeting their strengths and accelerating their development and should have access to such specialized programming."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: bilingualEducationNotes
   quote: "At all levels, students with interrupted formal education should participate in all content classes in which they are able to achieve success, while continuing to receive support."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
 - field: bilingualEducationNotes
   quote: "Extending specialized, quality programming, such as LEARN, for newcomer students with significant academic gaps to both primary and elementary levels will have positive effects on students' future academic success."
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: phrased as an aspiration to EXTEND LEARN downward, implying it did not yet reach primary and elementary at the time of writing
 - field: newcomerProportion
   quote: "Students for whom English is an additional language (EAL) are a growing segment of"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: the framework asserts growth but publishes NO counts or shares. No NL enrolment series was retrieved and verified. Report newcomerProportion as not-found rather than estimated
 - field: achievementGap
   quote: NOT FOUND. No NL outcome data disaggregated by EAL or LEARN status was retrieved and verified. No gap claim is made.
   source: n/a
 - field: policyHistory
   quote: "ESL Students and Students from Diverse Cultures: Guidelines for Comprehensive Assessment (2012)"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: a 2012 departmental instrument, cited by the framework as still governing comprehensive assessment of EAL pupils — and it uses the older term ESL
 - field: policyHistory
   quote: "Premier's Task Force: Now is the Time, (2017)"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: the framework quotes the 2017 Task Force criticising the ESL teacher-to-student ratio, which is the stated impetus for the framework
 - field: policyHistory
   quote: "DEDICATED to DIVERSITY / A Framework for Multicultural Education in Newfoundland and Labrador"
   source: https://www.gov.nl.ca/education/files/Dedicated-to-Diversity-Mar-24-23-2.pdf
   note: NO printed publication date; the URL filename encodes Mar-24-23. Flag as undated in the document itself

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - EAL is the province's current term; ESL survives in its 2012 assessment guidelines
     - School intake screens for two eligibilities at once, EAL and LEARN
     - EAL pupils to be identified on arrival or at the start of the school year
     - Placement evaluation follows, with no numeric deadline set by the framework
     - Native-speaker literacy tests are ruled out for evaluating newcomers
 - field: removalCriteria
   bullets:
     - No exit, reclassification or funded-years rule found in any retrieved NL source
     - Framework grep returns no provision for exit, discontinuation or transition out
     - Sanity check on the same file: EAL 35 hits, newcomer 75 hits
     - Its only transition language is a duty to keep supporting pupils after they move on
 - field: newcomerProportion
   bullets:
     - Not found: the framework asserts growth but publishes no counts or shares
     - No verified NL EAL enrolment series was retrieved
 - field: achievementGap
   bullets:
     - Not found: no NL outcome data split by EAL or LEARN status was retrieved
 - field: l2Support
   bullets:
     - Intensive EAL instruction by qualified specialist EAL teachers at all grade levels
     - Framework asserts a ratio principle but attaches no number to it
     - No single programme model is prescribed; districts choose on research grounds
     - Subject teachers expected to use word banks, translation and extra time
 - field: l1Support
   bullets:
     - Named guiding principle: use the first language as a tool for learning
     - Framework states additional-language development is grounded in L1 competency
     - Pupils may draft in L1, work in L1 groups and use L1 across the school
 - field: l3Support
   bullets:
     - No third-language instruction entitlement found in the retrieved documents
     - Framework requires diverse languages to be celebrated, not merely accepted
 - field: bilingualEducationNotes
   bullets:
     - No bilingual education: NL provides no first-language medium of instruction
     - LEARN is sheltered supplementary small-group work, not an L1 programme
     - LEARN targets newcomers with significant education gaps and low L1 literacy
     - Framework aspires to extend LEARN down into primary and elementary levels
 - field: policyHistory
   bullets:
     - 2012 ESL Students and Students from Diverse Cultures assessment guidelines
     - 2017 Premier's Task Force Now is the Time criticises the ESL teacher ratio
     - Dedicated to Diversity framework issued, carrying no printed date in the document
