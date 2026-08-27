# Language Atlas — `eal` (Majority language acquisition) — New Brunswick

FRAMING NOTE — THE SECTOR SPLIT IS THE WHOLE STORY. New Brunswick is Canada's only
officially bilingual province and runs two parallel, duality-protected school sectors with
a separate departmental division each. A newcomer's designation therefore depends on which
sector they enter:
 - **Anglophone sector**: the province's term is **English as an Additional Language
   (EAL)**, with a departmental EAL 110/120 curriculum built on CEFR-style A1-B1 levels.
 - **Francophone sector**: the newcomer route is **francisation**; separately, "anglais
   langue seconde / English as a Second Language (ESL)" is a graded CURRICULUM SUBJECT
   there (course codes 21111, 21211, 21311, 22111, 22211, 22311), NOT newcomer support.
Never collapse these into one "EAL" entry. The francophone sector's ESL courses teach
English to French-speaking pupils — the opposite direction from newcomer support.

### CA-NB|New Brunswick
STATUS: partial (duality and the francophone sector documented from a verified source; the
anglophone EAL curriculum and the francisation policy are BLOCKED, see below)

SOURCES:
 - label: "Council of Ministers of Education, Canada (CMEC), 'Secondary Education in the Provinces and Territories of Canada: A Student Transfer Guide 2023-24 — New Brunswick (francophone sector)', English-language version"
   url: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   http: 200 (application/pdf, 662,456 bytes)
   tier: official-document
 - label: "CMEC, same guide, French-language version — 'Nouveau-Brunswick (secteur francophone)'"
   url: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_FR.pdf
   http: 200 (application/pdf, 706,228 bytes); md5 identical to the copy banked earlier in the session
   tier: official-document

RETRIEVAL FAILURES — CRITICAL, READ BEFORE TREATING ANY GAP HERE AS AN ABSENCE:
 Every New Brunswick government host refused every request in this session, under curl with
 a browser user-agent and Google referer AND under WebFetch:
   - laws.gnb.ca/en/ShowPdf/cs/E-1.12.pdf (Education Act, English)        → **403**
   - laws.gnb.ca/fr/ShowPdf/cs/E-1.12.pdf (Education Act, French)         → **403**
   - www2.gnb.ca/.../English-AdditionalLanguage-110and120.pdf (EAL 110/120 curriculum) → **403**
   - www.gnb.ca/en/news/n-b.2026.06.education-plan-for-anglophone-sector-released.html → **403**
   - canlii.org NB Education Act page                                     → **403**
   - web.archive.org fallback                                             → **429 / connection timeout**
 CONSEQUENCES, stated plainly:
  1. **Education Act s.5 was NOT read.** No claim is made about the admission/entitlement
     test that governs which sector a newcomer may enrol in. Do NOT record one.
  2. **NO TERM COUNT of the NB Education Act is offered.** The absence rule requires
     counting a RETRIEVED act; the act was never retrieved, so a count would be fabricated.
  3. The anglophone EAL curriculum and any provincial francisation policy are undocumented
     here. Their absence below is a retrieval failure, NOT evidence they do not exist.
 A secondary-source web search surfaced an anglophone-sector plan ("Strong Basics, Bright
 Futures") reporting newcomer English-language-learner counts rising from 1,453 in 2018-19
 to 3,236 in 2024-25 at A1-B1 levels. THAT SOURCE WAS NEVER RETRIEVED (403). Per brief
 rule 1 those figures are NOT reported as evidence. They are noted here only as a lead for
 a future pass with a working retrieval path.

EVIDENCE:
 - field: bilingualEducationNotes
   quote: "New Brunswick is a bilingual province, and its education system is structured and managed according to the principle of linguistic duality, which recognizes the existence of two distinct education sectors. Each sector is assigned a division of the Ministry of Education, which develops and oversees the implementation and evaluation of education programmes and services in its sector."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: THE STRUCTURAL FACT that makes this entry split in two
 - field: bilingualEducationNotes
   quote: "In addition, each sector includes, throughout the province, either French-language school districts or English-language school districts."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: the two sectors are province-wide and territorially co-extensive, not regional
 - field: bilingualEducationNotes
   quote: "Le Nouveau-Brunswick est une province bilingue et son système d'éducation est structuré et géré selon le principe de la dualité linguistique, qui reconnaît l'existence de deux secteurs d'éducation distincts."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_FR.pdf
 - field: newcomerCriteria
   quote: "When a student from another province, territory or country is enrolled at the school, the person responsible for his or her admission shall collect the relevant documents (report cards or transcripts, curricula, school documents, language certificates, etc.). The contact persons in each area analyse the possible equivalences and award the credits."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: FRANCOPHONE SECTOR. Note what is assessed — prior credentials, including "language certificates" — and what is NOT: there is no language proficiency screener described
 - field: newcomerCriteria
   quote: "Lorsqu'un élève en provenance d'une autre province, d'un autre territoire ou d'un autre pays est inscrit à l'école, la personne responsable de l'accueil à cette école recueille les documents pertinents"
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_FR.pdf
   note: the French text says "la personne responsable de l'accueil" — the person responsible for RECEPTION (accueil), where the English version renders it "admission". The accueil framing is the province's own
 - field: newcomerCriteria
   quote: "The CR score (credential recognition) will be added on the transcript." / "La note RA (pour reconnaissance des acquis) sera inscrite au relevé de notes."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
 - field: newcomerCriteria
   quote: "A PDF of the Credentials Recognition Guidelines is available but not online."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: the guide itself says the governing document is NOT published online — an explicit, sourced statement of unavailability, worth recording as such
 - field: l2Support
   quote: "With rare exceptions, all out-of-province students are placed in classrooms with their peers and will receive the necessary support to ensure their academic achievement and integration into the school community."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: FRANCOPHONE SECTOR — full age-peer placement with in-class support, no withdrawal stream described
 - field: l2Support
   quote: "Sauf pour de rares exceptions, tout élève provenant de l'extérieur de la province est placé dans des classes avec ses pairs et recevra le soutien nécessaire pour assurer la réussite de ses apprentissages et son intégration à la communauté scolaire."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_FR.pdf
 - field: l2Support
   quote: "the Education Act dictates that the school system in New Brunswick is an inclusive system where all students are enrolled in their neighbourhood school and in so-called \"regular\" classes."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: the statutory inclusion principle is the reason there is no separate newcomer class — reported as the CMEC guide characterises the Act, since the Act itself could not be retrieved
 - field: l3Support
   quote: "English as a Second Language (ESL) A programs focus on the acquisition and development of basic language skills in the second language."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: FRANCOPHONE SECTOR, course codes 21111 / 21211 / 21311 (Pathway A) and 22111 / 22211 / 22311 (Pathway B), grades 9-11. This is ENGLISH TAUGHT TO FRANCOPHONES as a school subject — the reverse of newcomer support, and a classic trap for this map
 - field: l3Support
   quote: "Les élèves qui suivent ce cours acquièrent principalement ces habiletés langagières en communication orale et écrite à l'école, car ils ont très peu de contact avec la langue anglaise à l'extérieur de l'école."
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_FR.pdf
   note: confirms the direction of travel — these pupils have little contact with English outside school, i.e. they are francophones, not anglophone newcomers
 - field: removalCriteria
   quote: NOT DOCUMENTED. No exit, reclassification or funded-years rule was retrieved for either sector. This is a RETRIEVAL FAILURE (all gnb.ca hosts 403), not a proven absence.
   source: n/a
 - field: newcomerProportion
   quote: NOT DOCUMENTED. No verified New Brunswick newcomer or EAL enrolment series was retrieved. A secondary search surfaced anglophone-sector figures for 2018-19 and 2024-25 but the underlying document returned 403 and is therefore not reportable.
   source: n/a
 - field: achievementGap
   quote: NOT DOCUMENTED. No New Brunswick outcome data disaggregated by newcomer, EAL or francisation status was retrieved.
   source: n/a
 - field: l1Support
   quote: NOT DOCUMENTED for either sector. No first-language provision statement was retrieved.
   source: n/a
 - field: policyHistory
   quote: "Secondary Education in the Provinces and Territories of Canada: A Student Transfer Guide 2023-24"
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: the only dated instrument successfully retrieved for New Brunswick in this session
 - field: policyHistory
   quote: "the Education Act dictates that the school system in New Brunswick is an inclusive system"
   source: https://www.cmec.ca/docs/transferguide/2024/New-Brunswick-2023_Student-Transfer-Guide_FRA_EN.pdf
   note: the Education Act is SNB 1997, c. E-1.12 by its own citation, but the statute was not retrieved this session, so no section or amendment year is asserted

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - Designation splits by sector: EAL on the anglophone side, francisation on the French side
     - Francophone sector: an accueil officer collects transcripts and language certificates
     - Credential recognition is graded RA on the transcript, reconnaissance des acquis
     - The governing Credentials Recognition Guidelines are not published online
     - Anglophone EAL entry rules not retrieved: every gnb.ca host returned 403
 - field: removalCriteria
   bullets:
     - Not documented: all New Brunswick government hosts returned 403 this session
     - No term count is offered because the Education Act was never retrieved
 - field: newcomerProportion
   bullets:
     - Not documented: no verified New Brunswick newcomer enrolment series retrieved
 - field: achievementGap
   bullets:
     - Not documented: no NB outcome data by newcomer or EAL status retrieved
 - field: l2Support
   bullets:
     - Francophone sector places out-of-province pupils with age peers, rare exceptions aside
     - Support is given inside the regular class, no withdrawal stream described
     - Education Act is described as mandating neighbourhood schools and regular classes
     - Anglophone EAL 110 and 120 curriculum exists but could not be retrieved
 - field: l1Support
   bullets:
     - Not documented for either sector in the sources retrieved
 - field: l3Support
   bullets:
     - Caution: francophone-sector ESL is a graded subject, not newcomer support
     - Courses 21111 to 22311 teach English to francophone pupils in grades 9 to 11
     - Guide notes those pupils have little contact with English outside school
 - field: bilingualEducationNotes
   bullets:
     - Linguistic duality gives two distinct sectors, each with its own ministry division
     - French-language and English-language districts both span the whole province
     - A newcomer's designation depends entirely on which sector admits them
 - field: policyHistory
   bullets:
     - Education Act SNB 1997 c. E-1.12 governs, but was not retrievable this session
     - 2023-24 CMEC Student Transfer Guide documents the francophone sector's intake
