### LS|Lesotho
STATUS: partial — languagesOffered documented as a strong sourced negative; primaryRequirement and
upperSecondary NOT established

FRAMING FIRST: Lesotho's school languages are Sesotho and English. English is an official language and,
from Grade 4, the medium of instruction — it is not a foreign language in Lesotho and must not be
recorded as one on this map. The question this map asks — is a language other than the school language
compulsory — therefore turns on whether any THIRD language exists in the system. The evidence below says
that at the school-leaving examination, none does.

SOURCES:
 - label: "Examinations Council of Lesotho (ECoL), complete list of published LGCSE syllabuses, served by the Council's own content API behind examscouncil.org.ls/syllabus"
   url: https://web.examscouncil.org.ls/api/syllabi?pagination%5BpageSize%5D=200
   http: 200 (application/json, 3,506 bytes; meta.pagination.total = 16)
   tier: official-document
 - label: "Ministry of Education and Training (Lesotho), Education Sector Plan 2016-2026, 126 pp."
   url: https://www.education.gov.ls/static/media/education_sector_plan_2016-2026._lesotho.fb9f1fce5011a6ae52ca.pdf
   http: 200 (application/pdf, 3,391,336 bytes)
   tier: official-document
 - label: "Education Act 2010 (Lesotho), as published on the Ministry of Education and Training portal, 51 pp."
   url: https://www.education.gov.ls/static/media/education_act_2010.271d6a815454f460c07d.pdf
   http: 200 (application/pdf, 571,900 bytes)
   tier: official-document

EVIDENCE:
 - field: languagesOffered — SOURCED NEGATIVE, the full LGCSE subject list
   quote: "LGCSE | Accounting Syllabus / LGCSE | Biology Syllabus / LGCSE | Development Studies / LGCSE | Geography Syllabus / LGCSE | History Syllabus / LGCSE | Travel and Tourism / LGCSE | Agriculture Syllabus / LGCSE | Design & Tech Syllabus / LGCSE | English Language Syllabus / LGCSE | Fashion_fabrics_syllabus / LGCSE | Literature in English Syllabus / LGCSE | Mathematics Syllabus / LGCSE | Physical Science Syllabus / LGCSE | Religious Studies Syllabus / LGCSE | Sesotho Syllabus / LGCSE | Information and Communication Technology (ICT)"
   source: https://web.examscouncil.org.ls/api/syllabi?pagination%5BpageSize%5D=200
   [That is the WHOLE list — the API's own meta reports total 16, pageCount 1, so nothing is truncated.
   The only language syllabuses ECoL publishes are English Language, Literature in English and Sesotho.
   There is no French, no Afrikaans, no Portuguese, no isiZulu, no Chinese. At Lesotho's school-leaving
   examination there is no foreign language to take.]
 - field: upperSecondary — the sector plan's own account of what is being reformed
   quote: "A special focus has been set up on literacy, both in Sesotho and English, as well as on Mathematics, at the Lower Basic Education and Secondary levels."
   source: https://www.education.gov.ls/static/media/education_sector_plan_2016-2026._lesotho.fb9f1fce5011a6ae52ca.pdf
   [Two languages, both of them Lesotho's own. The sector plan's language priorities do not include any
   third or foreign language anywhere.]
 - field: primaryRequirement — the language policy did not yet exist in 2016
   quote: "Review the Curriculum and Assessment Policy aligning it to contemporary needs and trends. Develop and implement the Education Language policy."
   source: same (Chapter 3, main strategies for curriculum and assessment)
   [This is the most important line for the map: as of the 2016-2026 sector plan, developing an education
   language policy was a FUTURE action item. Lesotho did not have one when the plan was written.]
 - field: primaryRequirement / upperSecondary — SOURCED NEGATIVE on the statute
   quote: "[term counts on the full extracted text of the Education Act 2010, 51 pp., 69,807 characters: 'language' = 0, 'English' = 0, 'Sesotho' = 0, 'medium of instruction' = 0]"
   source: https://www.education.gov.ls/static/media/education_act_2010.271d6a815454f460c07d.pdf
   [The Education Act 2010 contains no language-of-instruction provision at all, and names no language.
   This is a real and reportable finding: Lesotho's principal education statute is silent on language.]
 - field: upperSecondary — the exam Lesotho is moving towards
   quote: "Localise secondary education curriculum towards A levels."
   source: https://www.education.gov.ls/static/media/education_sector_plan_2016-2026._lesotho.fb9f1fce5011a6ae52ca.pdf
 - field: primaryRequirement — what is actually assessed in primary
   quote: "Out of the 3,400 children tested in English, Sesotho, Mathematics, Sciences and Life Skills in grades 4 and 6"
   source: same (National assessment survey)

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - Not established from the sources consulted: no foreign-language requirement was found
     - English is Lesotho's own school language, not a foreign one, and should not count here
     - Education Act 2010 names no language at all and has no medium-of-instruction clause
     - Sector Plan 2016-2026 lists developing an Education Language policy as still to be done
 - field: upperSecondary
   bullets:
     - Not established from the sources consulted: nothing found on a foreign language continuing
     - No foreign language exists at LGCSE to continue into, so the question may not arise
     - Sector plan's language priorities are literacy in Sesotho and English only
     - Plan proposes localising the secondary curriculum towards A levels
 - field: languagesOffered
   bullets:
     - ECoL publishes 16 LGCSE syllabuses and not one of them is a foreign language
     - The only language syllabuses are English Language, Literature in English and Sesotho
     - No French, Afrikaans, Portuguese or regional African language appears on that list
     - Figure is the complete published list, not a sample: the API reports total 16

POLICY HISTORY ROWS:
 - year: 2010
   description: Education Act 2010 enacted, containing no language-of-instruction provision
 - year: 2016
   description: Education Sector Plan 2016-2026 sets developing an Education Language policy as an action still outstanding

WHAT I TRIED AND COULD NOT GET (so the negative can be checked):
 - The Curriculum and Assessment Policy 2009 itself: NOT retrieved. The ministry URL circulating for it,
   http://www.education.gov.ls/img/lesotho%20basic%20education%20curriculum%20policy.pdf, now returns the
   ministry's single-page-app shell (HTTP 200 but 1,260 bytes of HTML, not a PDF). I enumerated every PDF
   the ministry's own JavaScript bundle references (main.323422ab.js, 794,303 bytes) — the CAP 2009 is not
   among them. The documents that ARE there are the Education Act 2010, the Sector Plan 2016-2026, the ICT
   Policy 2024, a TVET policy, an inclusive-education paper, the 2025 LGCSE candidates' performance report
   and the 2025 JESR report.
 - www.ecol.org.ls: would not connect (curl error 28, timeout).
 - web.archive.org: unreachable from this session throughout.
 So the widely repeated statement that mother tongue is the medium to Grade 3 and English from Grade 4 is
 NOT verified here. Do not publish it from this report.

NOT ESTABLISHED — DO NOT PUBLISH:
 - The Grade 3/Grade 4 medium-of-instruction switch (see above) — unverified in this session.
 - Whether any Lesotho school teaches French: the LGCSE list shows none is examined, which is not the same
   as none being taught. Say "not examined at LGCSE", not "not taught".
 - Any hours, periods or timetable share for language subjects.
