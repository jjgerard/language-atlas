### IN-KA|Karnataka (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented — the fullest of my seven chapters, with real dated instruments

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 29, Karnataka, pp. 99-107 (report text lines 4963-5435)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** All facts as reported to the
         CLM for 2014-15; all census figures Census-2001, not 2011.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's
         original `-layout` extraction wraps table cells onto the wrong line and mis-rows grids
         throughout this report. Karnataka was affected and **this file has been corrected**:
         every shift-by-one reconstruction I had reasoned out is confirmed exactly by `-table`,
         and the §29.13(a) teacher-post tables and §29.13(b) training-institute counts, which
         `-layout` had scrambled, are now fully recovered. Corrections flagged inline.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not Karnataka's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement / fl.languagesOffered — THE FORMULA
   quote: "29.12 Three Language Formula / a. The languages taught under the Three Language Formula are as follows: / First Language: Kannada/Urdu/Marathi/Telugu/Tamil/English / Second Language: English/Kannada / Third Language: Hindi/English/Urdu"
   source: CLM 52nd Report (archive copy), §29.12(a), p. 103
   [Located by section NAME within lines 4963-5435. **Six first-language options, the widest of my
   seven units.** Note the structure of the second slot — English OR Kannada, i.e. whichever of
   the pair the pupil did not take first — and that the third slot offers Urdu, so a pupil can
   take a minority language as their third language rather than their first.]

 - field: fl.languagesOffered — ENGLISH IS NOT A FOREIGN LANGUAGE IN THIS SCHEME
   quote: "First Language: Kannada/Urdu/Marathi/Telugu/Tamil/English ... Second Language: English/Kannada ... Third Language: Hindi/English/Urdu"
   source: same
   [English appears in ALL THREE slots. It is offered as the language of first literacy, as the
   second language, and as the third. It should not be recorded as a foreign language in
   Karnataka. Hindi is the only language in the scheme that is not either the state official
   language, a state minority language, or English.]

 - field: fl.languagesOffered — THE OFFICIAL LANGUAGE
   quote: "29.2 Official Language of the State: Kannada is the Official Language of the State."
   source: CLM 52nd Report (archive copy), §29.2, p. 99

 - field: fl.uptake — A TABLE THAT IS ACTUALLY CLEAN
   quote: "b. The details of students in classes VIII, X and XII covered under the Three Language Formula are as under: / First Language Class VIII Class X Class XII / Urdu 38,878 26,112 - / Marathi 15,779 14,225 - / Telugu 193 149 - / Tamil 181 183 - "
   source: CLM 52nd Report (archive copy), §29.12(b), p. 103
   [**This is the only Three-Language-Formula uptake table among my seven units whose internal
   logic holds**: four rows, no orphaned numbers, class VIII counts exceeding class X counts by a
   plausible margin for every language, and an honest dash at class XII. It is usable. Note it
   counts students by FIRST language, and Kannada and English first-language pupils are not
   listed at all — only the four minority first languages are.]

 - field: fl.regionalMinorityLanguages — CONCENTRATIONS, INCLUDING SUPER-MAJORITY TALUKS
   quote: "29.3 a. The details of the districts where minority languages are said to be spoken by 60 per cent or more of the population are as under: / Kolar Gudibanda Telugu 67 / Bagepalli Telugu / Uttara Kannada SrinivasaPura Telugu 70.82 / Karkala Tulu 61.9 / 61.64"
   source: CLM 52nd Report (archive copy), §29.3(a), p. 99
   [The district/taluk pairing is defective even under `-table` (Karkala is in Udupi district, not
   Uttara Kannada, and a stray 61.64 trails the block), so this is a SOURCE defect and I report
   only the fact that **Telugu and Tulu each exceed 60 per cent in named taluks**, without pairing
   a taluk to a figure.]
   quote: "b. The details of the minority languages spoken by 15 per cent or more of the District/Tehsils/Talukas/Municipality population, as informed by the State are as follows: / Urdu speakers ... Bijapur 20.44 / Gulbarga 26.89 / Bidar 27.75 / Bhatkal 28.69 ..."
   source: same, §29.3(b), pp. 99-100
   [The Urdu and Marathi lists align cleanly; the Telugu, Tamil, Tulu, Konkani and Coorgi lists
   have their percentage columns detached from the taluk names and I do not pair them. What the
   section establishes without ambiguity is the SET: **seven minority languages cross the 15 per
   cent threshold somewhere in Karnataka — Urdu, Telugu, Marathi, Tamil, Tulu, Konkani and
   Coorgi** — and Urdu does so in twenty-four named taluks.]

 - field: fl.regionalMinorityLanguages / policyHistory — RECOGNITION, WITH A DATED ORDER
   quote: "a. With regard to the recognition of linguistic minority educational institution, it has been stated that the State Government has constituted a committee as per the Government Order ED.27.Mahithi, 2012 Bangalore dated 18-06-2014."
   source: CLM 52nd Report (archive copy), §29.6(a), pp. 101-102
   quote: "b. It has been stated that per G.O. ED27 Mahithi, 2012, Bangalore dated 18-06-2014, 5-Tulu, 2-Telugu, 2-Tamil and 2-Konkani institutions have been declared as linguistic minorities' institutions."
   source: same, §29.6(b), p. 102
   [I have NOT read G.O. ED.27.Mahithi 2012 itself; this is the CLM reporting its existence and
   date. The order number carries "2012" while the order is dated 18-06-2014 — that is how the
   source has it, in both §29.6(a) and §29.6(b), and I reproduce it rather than resolving it.]

 - field: fl.regionalMinorityLanguages — CONTESTED STATUS, IN COURT
   quote: "c. As regards receipt of any representation/complaint/petition from linguistic minorities, it has been stated that with regard to seeking linguistic minority status for Malayalam, Kodagu, Telugu and Tulu languages, cases are pending in the High Court of Karnataka vide W.P. No. 31831-34/2014, 8577/2015, 14145/2015, 4163/2015, respectively."
   source: CLM 52nd Report (archive copy), §29.6(c), p. 102
   [Reportable as "writ petitions pending as at 2014-15". I have not read the petitions or any
   judgment and do not know how they were decided.]

 - field: fl.regionalMinorityLanguages / policyHistory — THE STATUTE FOR GRANTS
   quote: "a. It has been informed that grants-in-aid are sanctioned as per the Karnataka Education Act, 1983 and the Director, Primary Education Department of Public Instructions, Bangalore and the Director, Secondary Education are the competent authorities"
   source: CLM 52nd Report (archive copy), §29.7(a), p. 102
   quote: "b. It has been informed that no grants-in-aid have been sanctioned for the period under review."
   source: same, §29.7(b), p. 102
   [I have not read the Karnataka Education Act 1983; the CLM names it and dates it. And the state
   sanctioned NO grants-in-aid to linguistic minority institutions in 2014-15.]

 - field: fl.teacherSupply — WHAT IS CROSS-CHECKABLE, AND WHAT IS NOT
   quote: "29.13 a. Details of the posts sanctioned for minority language teachers ... Secondary School (9 to 10) / Language Medium Subject / Sanctioned Filled Sanctioned Filled / Urdu 5,073 4,513 / Marathi 2,971 2,569 - - / Telugu 26 204 - - / Tamil 110 88 - -"
   source: CLM 52nd Report (archive copy), §29.13(a), p. 104
   quote: "Primary School (1 to 8) / Language | Medium Sanctioned | Filled | Subject Sanctioned | Filled / Urdu 23,529 20,359 / Marathi 6,589 5,602 General General / Telugu 698 568 / Tamil 684 593"
   source: same, §29.13(a), p. 104, `-table` extraction
   [**CORRECTED AFTER RE-EXTRACTION.** Under `-layout` the primary table was unreadable and I had
   reported no primary figures; `-table` and `-lineprinter` both resolve it and agree. A separate
   cross-check confirms the secondary rows: the sanctioned figures 5,073 (Urdu) and 2,971
   (Marathi) are exactly the teacher counts given independently at §29.10(a) on the previous page.
   Two things remain SOURCE defects rather than extraction ones, now that strict extraction has
   confirmed them: the Telugu secondary row shows filled (204) EXCEEDING sanctioned (26), which is
   impossible, and the Marathi primary row carries the word "General" in both Subject columns
   instead of a number. The whole "Subject" half of the secondary table is dashes: **Karnataka
   reported no posts at all for teaching a minority language as a subject at IX-X.**]

 - field: fl.teacherSupply — TRAINING EXISTS, AND FOR MEDIUM AS WELL AS SUBJECT
   quote: "b. It has been informed that training is provided to teachers for using minority languages as a medium of instruction and as a subject, as follows: / No. of Training Institutes Minority Language / 38 As a medium As a subject / 61 / 01 / 17 / Urdu Urdu / Marathi Marathi / Telugu Telugu / Tamil Tamil"
   source: CLM 52nd Report (archive copy), §29.13(b), p. 104
   quote: "c. It has been informed that there is no inter-state arrangement/ collaboration for training of minority language teachers/opening of teachers training institutes/centers."
   source: same, §29.13(c), p. 105
   [**CORRECTED AFTER RE-EXTRACTION.** `-table` pairs the institute counts to the languages
   unambiguously: **38 institutes for Urdu, 61 for Marathi, 1 for Telugu, 17 for Tamil**, each
   listed under both "As a medium" and "As a subject". Under `-layout` these had detached and I
   had declined to pair them. Karnataka and Tripura are the only two of my seven units with any
   minority-language teacher training, and Karnataka covers medium as well as subject.]

 - field: fl.regionalMinorityLanguages / policyHistory — FOUR LANGUAGE ACADEMIES WITH DATES
   quote: "b. The details of the Academies set up for the promotion and development of the minority languages as reported by the State Government are as follows: / Language Name of Academy When Established Budget for year 2014-15 / Urdu 55 Lakhs / Konkani 66 Lakhs / Karnataka Urdu Academy 1977 60 Lakhs / Tulu / Karnataka Konkani Sahithya Academy 1994 60 Lakhs / Beary / Karnataka Tulu Sahithya Academy 1994 / Karnataka Beary Sahithya Academy 2007"
   source: CLM 52nd Report (archive copy), §29.16(b), p. 105
   [**CORRECTED AFTER RE-EXTRACTION.** `-table` pairs the budgets too: Karnataka Urdu Academy 1977,
   55 lakhs; Karnataka Konkani Sahithya Academy 1994, 66 lakhs; Karnataka Tulu Sahithya Academy
   1994, 60 lakhs; Karnataka Beary Sahithya Academy 2007, 60 lakhs, all for the year 2014-15.
   The name-and-year pairs were already unambiguous under `-layout`: Karnataka Urdu Academy 1977,
   Karnataka Konkani Sahithya Academy 1994, Karnataka Tulu Sahithya Academy 1994, Karnataka Beary
   Sahithya Academy 2007. Four dated policyHistory rows. Note Beary and Tulu have academies but
   appear nowhere in the school tables.]

 - field: fl.regionalMinorityLanguages — TEXTBOOKS
   quote: "b. It has also been stated that the Karnataka Textbook Society (KTBS) under the Department of Public Instruction, Government of Karnataka is the agency for procuring textbooks and other teaching materials in minority languages"
   source: CLM 52nd Report (archive copy), §29.14(b), p. 105
   quote: "c. It has also been informed that free textbooks are given to Government/ Aided Primary and High School students and for other students, textbooks are available at subsidized rates."
   source: same, §29.14(c), p. 105
   [Karnataka is the only one of my seven units reporting **subsidised** minority-language
   textbooks for non-aided pupils. Mizoram and Gujarat both expressly said theirs are not.]

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India. The state or other relevant bodies would decide the choices of R1, R2, or R3 that would be given to students."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [NCF 2023 postdates the CLM return by eight years; I have not established Karnataka's adoption.
   Worth noting that a Karnataka pupil taking English first and English third would breach the
   NCF's two-Indian-languages rule, but that combination is not evidenced as actually offered.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - As reported to the Commissioner for Linguistic Minorities, 2014-15
     - Three Language Formula with six first-language options, the widest in the region
     - First Language: Kannada, Urdu, Marathi, Telugu, Tamil or English
     - Second Language is English or Kannada, whichever was not taken first

 - field: fl.secondaryRequirement
   bullets:
     - Third Language chosen from Hindi, English or Urdu
     - Urdu can be a pupil's third language, not only a first language
     - 26,112 Urdu and 14,225 Marathi first-language pupils covered at class X
     - Karnataka reported no posts at all for minority languages as a subject at IX-X

 - field: fl.upperSecondary
   bullets:
     - No information furnished on minority-language medium at XI-XII, state's own gap
     - Formula uptake table shows a dash for every language at class XII
     - Urdu taught as a subject in 91 higher secondary schools to 5,965 students
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - English appears in all three formula slots, so it is not framed as a foreign language
     - Kannada, Urdu, Marathi, Telugu, Tamil and English available as first language
     - Hindi is offered only in the third slot, alongside English and Urdu
     - Tulu, Konkani, Coorgi and Beary have academies but no place in the formula

 - field: fl.regionalMinorityLanguages
   bullets:
     - Position as reported to the CLM for 2014-15, on Census-2001 speaker shares
     - Seven languages pass 15 pct somewhere: Urdu, Telugu, Marathi, Tamil, Tulu, Konkani, Coorgi
     - Urdu passes 15 per cent in twenty-four named taluks; Telugu and Tulu top 60 pct
     - Minority status for Malayalam, Kodagu, Telugu and Tulu was in the High Court

 - field: fl.teacherSupply
   bullets:
     - Posts as returned to the CLM, 2014-15; re-verified against pdftotext -table
     - Primary medium posts: Urdu 23,529 sanctioned 20,359 filled, Marathi 6,589 and 5,602
     - Secondary medium posts: Urdu 5,073 sanctioned 4,513 filled, Marathi 2,971 and 2,569
     - Teacher training institutes: 61 for Marathi, 38 Urdu, 17 Tamil, 1 Telugu
     - No posts at all reported for minority languages as a subject at IX-X

 - field: fl.uptake
   series (each row note: "students covered by the Three Language Formula, counted by first
   language, as reported to the CLM, 2014-15"):
     - {year: 2015, value: 38878, note: "Urdu first language, class VIII, CLM 29.12(b)"}
     - {year: 2015, value: 26112, note: "Urdu first language, class X, CLM 29.12(b)"}
     - {year: 2015, value: 15779, note: "Marathi first language, class VIII, CLM 29.12(b)"}
     - {year: 2015, value: 14225, note: "Marathi first language, class X, CLM 29.12(b)"}
   [Telugu (193 / 149) and Tamil (181 / 183) are in the same clean table and can be added if the
   series has room. Class XII is a dash for all four languages.]

 - field: policyHistory
   rows:
     - {year: 1977, description: "Karnataka Urdu Academy established for the promotion and development of Urdu, per the state's return to the Commissioner for Linguistic Minorities"}
     - {year: 1983, description: "Karnataka Education Act 1983, named by the state as the basis on which grants-in-aid to linguistic minority educational institutions are sanctioned"}
     - {year: 1994, description: "Karnataka Konkani Sahithya Academy and Karnataka Tulu Sahithya Academy established"}
     - {year: 2007, description: "Karnataka Beary Sahithya Academy established"}
     - {year: 2014, description: "Government Order ED.27.Mahithi 2012 dated 18-06-2014 constituted the committee for recognising linguistic minority institutions; five Tulu, two Telugu, two Tamil and two Konkani institutions declared under it"}
     - {year: 2015, description: "Karnataka sanctioned no grants-in-aid to linguistic minority educational institutions during the reporting period, and writ petitions on minority status for Malayalam, Kodagu, Telugu and Tulu were pending in the High Court"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state choosing which"}
   [I have not read the Karnataka Education Act 1983 or G.O. ED.27.Mahithi 2012 themselves; both
   are dated and named by the CLM, and the descriptions say only what the CLM says.]
