### IN-KA|Karnataka (India) — map `eal` (Majority language acquisition)
STATUS: documented — the strongest minority-language-medium provision of my seven units

TERMINOLOGY NOTE (per the brief): the school language in Karnataka is **Kannada**, with English
also offered as a first language and medium. "EAL" is not the term in play and is not used below.
Chapter 29 names no newcomer, induction or additional-language designation; what it has instead is
a large, stage-by-stage minority-language-medium school system.

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 29, Karnataka, pp. 99-107"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — the live Government of India host is unreachable from this machine
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** Facts as at 2014-15; census
         figures Census-2001.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's
         original `-layout` extraction wraps table cells onto the wrong line and mis-rows grids
         throughout this report. Karnataka was affected and **this file has been corrected**:
         every shift-by-one reconstruction I had reasoned out is confirmed exactly by `-table`,
         and the §29.13(a) teacher-post tables and §29.13(b) training-institute counts, which
         `-layout` had scrambled, are now fully recovered. Corrections flagged inline.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2 (R1 and medium of instruction)"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes)
   tier: official-document — NATIONAL, not Karnataka's own rule

EVIDENCE:

 - field: eal.l1Support — WHO ARRIVES WITHOUT KANNADA
   quote: "29.1 The Census-2001 registered the population of Karnataka as 5,28,50,562 persons and its broad linguistic profile is as follows: / Kannada 3,48,38,035 65.92 / Urdu 10.48 / Telugu 55,39,910 7.00 / Marathi 36,98,657 3.58 / Tamil 18,92,783 3.55 / 18,74,959"
   source: CLM 52nd Report (archive copy), §29.1, p. 99
   [**The speakers column was shifted down one row by the original `-layout` extraction. I caught
   it arithmetically and `pdftotext -table` has since confirmed the correction directly — the
   `-table` output prints "Urdu 55,39,910 10.48" on one row. The working, kept because it is the
   check that caught it:** 3,48,38,035/5,28,50,562 = 65.92% ✓ (Kannada correct). Then 55,39,910 =
   10.48% = Urdu; 36,98,657 = 7.00% = Telugu; 18,92,783 = 3.58% = Marathi; 18,74,959 = 3.55% =
   Tamil. Every row checks. **Corrected: Urdu 55,39,910 speakers, 10.48 per cent.** Census-2001,
   never present as current. About a third of the state did not have Kannada as mother tongue.]

 - field: eal.l1Support / eal.bilingualEducationNotes — THE PROVISION, STAGE BY STAGE
   quote: "29.10 Secondary Stage (Class IX to X) / a. Details of the facilities for using the minority languages as a medium of instruction at the Secondary stage of education are as follows: / Language Schools Students Teachers / Urdu 535 52,612 5,073 / Marathi 275 28,841 2,971 / Telugu 17 542 260 / Tamil 9 294 110"
   source: CLM 52nd Report (archive copy), §29.10(a), p. 103
   [**This table is fully clean** — four rows, four school counts, four student counts, four
   teacher counts, no orphans. It is the one I lead with.]
   quote: "29.8 Primary Stage (Class I to V) / a. ... Urdu 2,276 2,90,865 6,770 / Marathi 331 1,074 / Tamil 31 66,812 114 / Telugu 27 6,640 92 / 4,240"
   source: same, §29.8(a), p. 102
   [**CORRECTED AFTER RE-EXTRACTION, AND MY RECONSTRUCTION WAS RIGHT.** `-layout` ran the students
   column one row late from Marathi onward; I reasoned the shift out and `-table` confirms it
   exactly: **Urdu 2,276 / 2,90,865 / 6,770; Marathi 331 / 66,812 / 1,074; Tamil 31 / 6,640 / 114;
   Telugu 27 / 4,240 / 92.** All figures now reportable.]
   quote: "29.9 Upper Primary Stage (Class VI to VIII) / a. ... Urdu 2,425 1,35,689 16,759 / Marathi 696 5,515 / Tamil 105 44,323 750 / Telugu 59 2,844 606 / 1,514"
   source: same, §29.9(a), p. 102
   [Same shift pattern under `-layout`, and `-table` confirms the reconstruction exactly: **Urdu
   2,425 / 1,35,689 / 16,759; Marathi 696 / 44,323 / 5,515; Tamil 105 / 2,844 / 750; Telugu 59 /
   1,514 / 606.** All figures now reportable.]

 - field: eal.bilingualEducationNotes — THE SHAPE OF THE ATTRITION
   [Urdu-medium schools: **2,276 at I-V, 2,425 at VI-VIII, 535 at IX-X**, and no information at
   all for XI-XII (§29.11a). Marathi-medium: 331, 696, 275, none. So minority-language medium
   survives through class X in Karnataka, which is further than in Mizoram (ends at VIII) and
   further than in Tripura (never exists), but the drop from VI-VIII to IX-X is roughly fourfold
   for Urdu. This is a comparison across my own units, drawn from the same source, and is offered
   as context rather than as a claim from any one chapter.]

 - field: eal.l1Support — WHERE IT STOPS
   quote: "29.11 Higher Secondary Stage (Class XI to XII) / a. The State Government has not furnished any information about the minority language being used as a medium of instruction at the Higher Secondary stage of education."
   source: CLM 52nd Report (archive copy), §29.11(a), p. 103
   [A non-answer, not a stated absence. I do not read it as proof that no such schools exist.]

 - field: eal.l1Support — THE LANGUAGE AS A SUBJECT, ALONGSIDE THE MEDIUM
   quote: "29.9 b. ... Language Schools Students Teachers / Urdu 64 4,300 167 / Tamil 11 377 11 / Telugu 1 54 2"
   source: CLM 52nd Report (archive copy), §29.9(b), p. 103
   quote: "29.11 b. Details of the facilities for learning the minority languages as a subject at the Higher Secondary stage of education are as follows: / Urdu 91 5,965 208 / Telugu 1 54 2 / Tamil 11 377 11"
   source: same, §29.11(b), pp. 103-104
   [**Flagged duplication, and `-table` confirms it is in the SOURCE and not the extraction:** the
   Telugu row (1 / 54 / 2) and the Tamil row (11 / 377 / 11) are character-for-character identical
   between the upper primary table and the higher secondary table. One of the two is almost
   certainly a carried-over row. Only the Urdu figures differ between the two tables, so only Urdu
   is safe here.]

 - field: eal.l1Support — IDENTIFICATION: KARNATAKA IS THE ONLY ONE OF MY UNITS THAT DOES IT
   quote: "29.15 Maintenance of `Language Preference Registers' in Schools / It has been informed that most of the schools are maintaining the `Language Preference Registers' to record the language preferences of linguistic minority students."
   source: CLM 52nd Report (archive copy), §29.15, p. 105
   quote: "d. It is also suggested to introduce necessary columns in the Application Forms for admission in the schools to elicit information about the mother tongue; first language preferred; and the third language preferred by the parent at the time of admission"
   source: same, Findings/Recommendations under §29.18, p. 106
   [Registers are kept in "most" schools — the strongest answer of my seven units, against
   Mizoram's flat "not maintained", Gujarat's "no information provided" and Tripura's evasion. But
   the CLM still had to recommend adding a mother-tongue column to admission forms, so the
   identification happens after admission rather than at it.]

 - field: eal.bilingualEducationNotes — MATERIALS AND TEACHER TRAINING
   quote: "c. It has also been informed that free textbooks are given to Government/ Aided Primary and High School students and for other students, textbooks are available at subsidized rates."
   source: CLM 52nd Report (archive copy), §29.14(c), p. 105
   quote: "b. It has been informed that training is provided to teachers for using minority languages as a medium of instruction and as a subject"
   source: same, §29.13(b), p. 104
   [Karnataka is the only one of my seven units reporting teacher training for minority languages
   **as a medium of instruction**, which is what the medium-of-instruction provision actually
   needs. Tripura trains for subject only; Mizoram, Gujarat, Kerala and the Andamans report none
   or no information.]

 - field: eal.l1Support — WHAT THE STATE ITSELF DOES NOT DO
   quote: "a. It has been stated that there are no arrangements for translation and dissemination of important Government Rules, Orders, Notifications, etc., in minority languages."
   source: CLM 52nd Report (archive copy), §29.4(a), p. 101
   quote: "29.17 ... It has been informed that there is no Machinery/Committee at the State/District level for monitoring and reviewing the implementation of the Scheme of Safeguards for the linguistic minorities of the State."
   source: same, §29.17, p. 105
   quote: "b. It has been informed that no grants-in-aid have been sanctioned for the period under review."
   source: same, §29.7(b), p. 102

 - field: eal — NO NEWCOMER DESIGNATION, READ FOR
   [I read the whole of Chapter 29 (lines 4963-5435). It names **no** induction class, bridge
   course, transitional-bilingual programme, or designated category for a pupil arriving without
   Kannada. The nearest analogue in the chapter is for adults, not children: §29.5(a) gives
   recruits to the state services two years to acquire proficiency in the official language after
   recruitment.]

 - field: eal.l1Support (NATIONAL BACKDROP, not Karnataka's own rule)
   quote: "R1 should preferably be the Language most familiar to the students, which would be the mother tongue. If that is not possible because of practical considerations, then it should be the state Language, which would be the second most familiar Language. Also, since it is in R1 that literacy is first attained, it must be used as the medium of instruction (MoI) for other subjects, at least until literacy in another language is attained."
   source: NCF 2023, §2.2, p. 219
   quote: "An Indian language must be available for students as an option for the MoI through school education all the way up to Grade 12."
   source: NCF 2023, §2.2, p. 219
   [NATIONAL, and the second quote bears directly on Karnataka's §29.11(a) blank at XI-XII. NCF
   2023 postdates the CLM return by eight years; no adoption established.]

DRAFT BULLETS:

 - field: eal.l1Support
   bullets:
     - Position as reported to the Commissioner for Linguistic Minorities, 2014-15
     - No newcomer designation; provision is minority-language-medium schooling at scale
     - Urdu-medium schools: 2,276 at I-V, 2,425 at VI-VIII, 535 at IX-X
     - Marathi, Tamil and Telugu medium schools also run at all three of those stages
     - Most schools keep Language Preference Registers, the state told the CLM

 - field: eal.bilingualEducationNotes
   bullets:
     - Karnataka trains teachers for minority languages as a medium, not only as a subject
     - Urdu-medium provision drops roughly fourfold between VI-VIII and IX-X
     - No information furnished on minority-language medium at XI-XII at all
     - Free minority-language textbooks in aided schools, subsidised rates elsewhere

 - field: policyHistory
   rows:
     - {year: 1983, description: "Karnataka Education Act 1983, named by the state as the basis on which grants-in-aid to linguistic minority educational institutions are sanctioned"}
     - {year: 2014, description: "Government Order ED.27.Mahithi 2012 dated 18-06-2014 constituted Karnataka's committee for recognising linguistic minority educational institutions"}
     - {year: 2015, description: "Karnataka reported that most schools maintain Language Preference Registers, and that no machinery existed at state or district level to monitor the safeguards"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required an Indian language to be available as a medium of instruction all the way up to Grade 12"}
   [I have not read the Karnataka Education Act 1983 or G.O. ED.27.Mahithi 2012 themselves; both
   are named and dated by the CLM and the descriptions say only what the CLM says.]
