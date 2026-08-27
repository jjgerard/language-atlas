### QA|Qatar — map: fl
STATUS: partial
SOURCES:
 - label: "PIRLS 2021 Encyclopedia, Qatar country chapter"
   url: https://pirls2021.org/wp-content/uploads/2022/10/Qatar.pdf
   http: 200 (retrieved 2026-08-26)
   tier: official-document (national centre authored chapter)
 - label: "UNESCO PEER, Qatar — Inclusion profile"
   url: https://education-profiles.org/northern-africa-and-western-asia/qatar/~inclusion
   http: 200 (retrieved 2026-08-26)
   tier: secondary-source

EVIDENCE:
 - field: languagesOffered
   quote: "Set curriculum standards for mathematics, science, English, Arabic, and Islamic studies for all public K-12 schools"
   source: https://pirls2021.org/wp-content/uploads/2022/10/Qatar.pdf
 - field: primaryRequirement
   quote: "students receive formal reading instruction as part of the Arabic language curriculum beginning at age 6 during the first grade of primary school and throughout compulsory schooling (through the preparatory stage)."
   source: https://pirls2021.org/wp-content/uploads/2022/10/Qatar.pdf
 - field: regionalMinorityLanguages
   quote: "While there is no explicit mention of any linguistic or ethnic minorities, the Ministry of Education and Higher Education's 2017-22 strategy sets out the importance of ensuring the protection of Qatari values while fostering a better understanding and respect for other cultures from preschool until the end of secondary education."
   source: https://education-profiles.org/northern-africa-and-western-asia/qatar/~inclusion

NEGATIVE — IMPORTANT, this contradicts the brief's working assumption:
 - The task brief suggested verifying from Qatar's Ministry of Education curriculum standards that
   "English is a core subject from Grade 1". I could NOT verify the Grade-1 start in any source I
   retrieved. What the PIRLS 2021 chapter establishes is only that English is one of the five
   subjects for which the MOEHE sets curriculum standards for all public K-12 schools. The
   sentence that names Grade 1 is about ARABIC reading instruction, not English.
 - The TIMSS 2023 Qatar chapter contains no language-of-instruction paragraph at all (grep for
   "language of instruction", "medium of instruction", "English is", "foreign language" returned
   no curriculum statement).
 - Do NOT code a Grade-1 English start for Qatar from this report. It needs the MOEHE English
   curriculum standards document itself, which I did not retrieve.

DRAFT BULLETS:
 - field: languagesOffered
   bullets:
     - English is one of five subjects with national curriculum standards
     - Standards set for mathematics, science, English, Arabic and Islamic studies
     - Applies to all public K-12 schools
 - field: primaryRequirement
   bullets:
     - Start grade for English NOT verified: sources give the Arabic rule, not the English one
     - Arabic reading instruction begins at age 6 in the first grade of primary
     - Arabic runs throughout compulsory schooling to the end of the preparatory stage
 - field: regionalMinorityLanguages
   bullets:
     - "there is no explicit mention of any linguistic or ethnic minorities" (UNESCO PEER)
     - MOEHE 2017-22 strategy frames other cultures as respect, not as language provision
 - field: policyHistory
   bullets:
     - 2001 Emiri Resolution No. 25 established compulsory education
     - 2016 Resolution No. 9 restructured the Ministry of Education and Higher Education
     - 2017-22 MOEHE strategy sets intercultural understanding aims
