### IN-GJ|Gujarat (India) — map `eal` (Majority language acquisition)
STATUS: partial — the structure of the provision is documented, but the CLM records Gujarat's
figures as recycled unchanged from two earlier reports, so I report very few numbers

TERMINOLOGY NOTE (per the brief): the school language in Gujarat is **Gujarati**, and English is
one of the media of instruction the state itself lists. "EAL" is not the term in play and is not
used below. Chapter 28 names no newcomer, induction or additional-language designation.

THE CAVEAT THAT GOVERNS THIS ENTRY:
   "It is highly deplorable that the data of schools/students/teachers regarding the educational
   facilities provided in the minority languages have been the same as provided for the 50th and
   51st Reports."
   — CLM 52nd Report, Findings/Recommendations under §28.18, p. 97

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 28, Gujarat, pp. 93-98"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — the live Government of India host is unreachable from this machine
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** Census figures Census-2001.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` as a second opinion. The project's original `-layout`
         extraction wraps table cells onto the wrong line and mis-rows grids throughout this
         report. Gujarat was badly affected and **this file has been corrected**: the §28.8(a)
         and §28.9(a) medium-of-instruction tables are now reported in full, and the census
         correction I had derived arithmetically is confirmed directly. Corrections flagged inline.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2 (R1 and medium of instruction)"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes)
   tier: official-document — NATIONAL, not Gujarat's own rule

EVIDENCE:

 - field: eal.l1Support — WHO ARRIVES WITHOUT GUJARATI
   quote: "28.1 The Census-2001 registered the population of Gujarat as 5,06,71,017 persons and its broad linguistic profile is as follows: / Gujarati 4,27,68,386 84.40 / Bhili/Bhilodi 4.75 / Hindi 24,05,663 4.71 / Sindhi 23,88,814 1.89 / Marathi 1.51 / Urdu 9,58,787 1.09 / 7,64,002 / 5,50,630"
   source: CLM 52nd Report (archive copy), §28.1, p. 93
   [**The speakers column was shifted by the original `-layout` extraction. I first caught it
   arithmetically against the stated total of 5,06,71,017, and `pdftotext -table` has since
   confirmed the correction directly — the `-table` output prints "Bhili/Bhilodi 24,05,663 4.75"
   on one row. The working, kept because it is the check that caught it:** 4,27,68,386/5,06,71,017 = 84.40% ✓ (Gujarati correct). Then
   24,05,663 = 4.75% = Bhili/Bhilodi; 23,88,814 = 4.71% = Hindi; 9,58,787 = 1.89% = Sindhi;
   7,64,002 = 1.51% = Marathi; 5,50,630 = 1.09% = Urdu. Every row checks on a shift-by-one
   reading. Corrected: **Bhili/Bhilodi 24,05,663 speakers, 4.75 per cent — the largest minority
   language in Gujarat at Census-2001.** Never present as current.]

 - field: eal.l1Support — THE FINDING THAT MATTERS MOST HERE
   [**Bhili/Bhilodi, the largest minority language in the state at 4.75 per cent and roughly 2.4
   million speakers, appears NOWHERE in Chapter 28 outside the census table.** I read every one of
   §28.6 to §28.16. It is absent from the recognised-institution list (§28.6b: Urdu, Marathi,
   Sindhi, Tamil, Hindi), from every medium-of-instruction table (§28.8a, §28.9a, §28.11a), from
   every subject table, from the Three Language Formula (§28.12a: Gujarati/Hindi/Marathi/English/
   Urdu), from the teacher-post table, from the textbook agency's remit and from the two
   academies. A Bhili-speaking child has, on this record, no provision of any kind.]

 - field: eal.l1Support / eal.bilingualEducationNotes — WHAT THE PROVISION IS
   quote: "28.8 Primary Stage (Class I to V) / a. Details of the facility for using the minority languages as a medium of instruction at the Primary stage of education are as follows: / Language Schools Students Teachers / Urdu 130 43,945 1,032 / Marathi 107 46,075 1,252 / Sindhi 01 44 2 / Hindi 504 4,831 / English 1,72,7191 / 2,476 8,24,595 34,432"
   source: CLM 52nd Report (archive copy), §28.8(a), p. 94
   [**CORRECTED AFTER RE-EXTRACTION.** `-table` resolves this table completely: Urdu 130 / 43,945 /
   1,032; Marathi 107 / 46,075 / 1,252; Sindhi 01 / 44 / 2; Hindi 504 schools / 4,831 teachers;
   English 2,476 / 8,24,595 / 34,432. One defect survives and is therefore the SOURCE's, not the
   extraction's: Hindi's student count prints as the malformed token "1,72,7191", which I do not
   report as a number. The shape is now unambiguous: Gujarat offers minority-language-medium
   primary schooling in Urdu, Marathi and Sindhi, and treats Hindi- and English-medium schools as
   minority-language provision too — English-medium being by far the largest at 2,476 schools.]
   quote: "28.9 Upper Primary Stage (Class VI to VIII) / a. ... Urdu 90 60,872 1,243 / Marathi 47,456 940 / Sindhi 101 5,100 27 / 2"
   source: same, §28.9(a), p. 95
   [**CORRECTED AFTER RE-EXTRACTION.** `-table` gives Urdu 90 / 60,872 / 1,243; Marathi 101 /
   47,456 / 940; Sindhi 2 / 5,100 / 27. The implausible row — 5,100 Sindhi pupils in 2 schools —
   is confirmed to be printed that way in the report, so it is the state's defect, not the
   extraction's, and I flag it rather than reporting it as fact.]

 - field: eal.bilingualEducationNotes — HINDI AND ENGLISH ARE COUNTED AS MINORITY-LANGUAGE MEDIA
   quote: "b. Details of the facility for learning the minority languages as a subject at the Primary stage of education are as follows: / Language Schools Students Teachers / Hindi 375 1,35,501 3,251 / English 1,255 4,90,544 14,705"
   source: CLM 52nd Report (archive copy), §28.8(b), p. 94
   [Alignment here is a wrap, not a shift: Hindi 375/1,35,501/3,251 reads directly, and English's
   three numbers wrap across two lines. Still under the stale-data caveat. The structural point
   stands: **Gujarat classifies English as a minority language for these returns**, which is why
   English also appears in the First Language slot of its Three Language Formula. English in
   Gujarat is a medium of instruction, not a foreign language.]

 - field: eal.l1Support — WHERE THE PROVISION STOPS
   quote: "28.10 Secondary Stage (IX to X) / No information has been furnished about the minority languages being used as the mediums of instruction or taught as a subject at the Secondary stage of education."
   source: CLM 52nd Report (archive copy), §28.10, p. 95
   quote: "28.11 b. No information has been furnished about the minority languages being taught as a subject at the Higher Secondary Stage of education."
   source: same, §28.11(b), p. 95
   [Minority-medium XI-XII schools DO exist per §28.11(a) — 75 Hindi, 20 Urdu, 15 Marathi, 8
   Sindhi, 2 Tamil — so the IX-X blank is a reporting failure rather than proof of absence. I
   say that rather than over-reading it.]

 - field: eal.l1Support — NO IDENTIFICATION MECHANISM
   quote: "28.15 Maintenance of Language Preference Registers in Schools / No information has been provided with regard to the maintenance of Language Preference Registers in schools in Gujarat."
   source: CLM 52nd Report (archive copy), §28.15, p. 97
   quote: "c. The State Government needs to ensure that Language Preference Registers to record the language preferences of linguistic minority students be maintained in all the schools to facilitate inter-school adjustments so as to provide instruction in mother tongues/languages in the State."
   source: same, Findings/Recommendations, p. 97
   quote: "d. It is also suggested to introduce necessary columns in the Application Forms for admission in the schools to elicit information about the mother tongue; first language preferred; and the third language preferred by the parent at the time of admission"
   source: same, Findings/Recommendations, p. 97

 - field: eal — NO NEWCOMER DESIGNATION, READ FOR
   [I read the whole of Chapter 28 (lines 4670-4962). It names **no** induction class, bridge
   course, transitional programme, language-support entitlement, or designated category for a
   pupil arriving without Gujarati, and **no dated Gujarat act, rule, resolution or circular** —
   the only year in the chapter is 1993 for the two language academies. §28.17 records that no
   machinery or committee exists at state or district level to monitor the safeguards at all.]

 - field: eal.l1Support (NATIONAL BACKDROP, not Gujarat's own rule)
   quote: "R1 should preferably be the Language most familiar to the students, which would be the mother tongue. If that is not possible because of practical considerations, then it should be the state Language, which would be the second most familiar Language."
   source: NCF 2023, §2.2, p. 219
   quote: "`Practical considerations,' referred to earlier could be of various kinds, including the diversity of mother tongues in a class/school/community/region, and dearth of written resources in the language despite rich oral traditions."
   source: NCF 2023, §2.2 bullet, p. 219
   [NATIONAL, and the second quote is the exact carve-out that a language like Bhili falls
   through. NCF 2023 postdates the CLM return by eight years; no adoption established.]

DRAFT BULLETS:

 - field: eal.l1Support
   bullets:
     - CLM found Gujarat's figures recycled unchanged from its 50th and 51st Reports
     - No newcomer designation; provision is minority-language-medium schooling
     - Urdu-medium primary schools 130, Marathi 107, Sindhi 1, plus 2,476 English-medium
     - Bhili, the largest minority language at 4.75 per cent, gets no provision at all
     - No information furnished on whether Language Preference Registers are kept

 - field: eal.bilingualEducationNotes
   bullets:
     - Figures re-verified against pdftotext -table but recycled from earlier CLM reports
     - Gujarat counts Hindi and English as minority languages in its own school returns
     - English is a medium of instruction and a first-language option, not a foreign language
     - Minority-medium schooling reappears at XI-XII but IX-X was left blank in the return

 - field: policyHistory
   rows:
     - {year: 1993, description: "Gujarat's Urdu Academy and Sindhi Academy established, per the year given in the state's return to the Commissioner for Linguistic Minorities"}
     - {year: 2015, description: "Gujarat reported no machinery or committee at state or district level to monitor implementation of the safeguards for linguistic minorities, and no information on Language Preference Registers"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 set R1, the language of first literacy, as preferably the mother tongue, allowing the state language where practical considerations prevent it"}
   [Chapter 28 names no other dated Gujarat instrument.]
