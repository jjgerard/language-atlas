### IN-GJ|Gujarat (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented, with a severe provenance caveat — the formula and the tables are now fully
readable after re-extraction with `pdftotext -table`, but the CLM records that **Gujarat's
educational data in this report is recycled unchanged from two earlier reports**, so no figure
here is a 2014-15 observation

THE CAVEAT THAT GOVERNS THIS WHOLE ENTRY, in the CLM's own words:
   "It is highly deplorable that the data of schools/students/teachers regarding the educational
   facilities provided in the minority languages have been the same as provided for the 50th and
   51st Reports. The State Government is, therefore, urged to update the data regarding the
   educational facilities provided in the minority languages in the State."
   — CLM 52nd Report, Findings/Recommendations under §28.18, p. 97
Any figure from Chapter 28 is therefore **not** a 2014-15 observation; it is a figure carried
forward from the 50th and 51st Reports and re-submitted. This must lead any bullet using one.

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 28, Gujarat, pp. 93-98 (report text lines 4670-4962)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** Census figures Census-2001.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's
         original `-layout` extraction wraps table cells onto the wrong line and mis-rows grids
         throughout this report. Gujarat was badly affected and **this file has been substantially
         corrected**: the §28.13(a) teacher-post table, which `-layout` made unreadable, is fully
         recovered, and the §28.8 to §28.9 stage tables are now reported in full. Corrections are
         flagged inline. `-layout` is used only for prose and for locating the chapter.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not Gujarat's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement / fl.languagesOffered — THE FORMULA
   quote: "28.12 Three Language Formula / a. The languages taught under the Three Language Formula are as follows: / First Language:  Gujarati/Hindi/Marathi/English/Urdu / Second Language: Gujarati/English / Third Language: Hindi"
   source: CLM 52nd Report (archive copy), §28.12(a), p. 96
   [Located by section NAME within lines 4670-4962. Two things are unusual and both matter for
   the map's category rule. (1) **English appears in the First Language slot** — it is an option
   for the language of first literacy, not a foreign language. (2) The Second Language slot is
   Gujarati OR English, so a Gujarati-medium child takes English second and an English-medium
   child takes Gujarati second. The third language is fixed at Hindi for everyone.]

 - field: fl.languagesOffered — HINDI IS THE THIRD LANGUAGE AND ALSO A FIRST LANGUAGE
   quote: "First Language:  Gujarati/Hindi/Marathi/English/Urdu ... Third Language: Hindi"
   source: same
   [Consequence worth recording: a pupil whose First Language is Hindi has, on the face of the
   return, no distinct third language. The chapter does not say what such a pupil takes instead.]

 - field: fl.languagesOffered — THE OFFICIAL LANGUAGE
   quote: "28.2 Official Language of the State: The Official Language of the State is Gujarati."
   source: CLM 52nd Report (archive copy), §28.2, p. 93

 - field: fl.regionalMinorityLanguages — WHICH LANGUAGES HAVE INSTITUTIONS
   quote: "b. It has also been informed that from class XI to XII, 16 Urdu, 12 Marathi, 13 Sindhi, 02 Tamil and 71 Hindi linguistic minority educational institutions have been recognized as on 30 June 2015."
   source: CLM 52nd Report (archive copy), §28.6(b), p. 94
   [This sentence is prose, not a table, so it never suffered the extraction problem at all.
   Five minority languages: Urdu, Marathi, Sindhi, Tamil, Hindi.]

 - field: fl.upperSecondary — HIGHER SECONDARY MEDIUM OF INSTRUCTION
   quote: "28.11 Higher Secondary Stage (XI to XII) / a. ... Language Schools Students Teachers / Urdu 20 6,755 213 / Marathi 15 8,249 179 / Sindhi 8 2,109 72 / Tamil 2 855 9 / Hindi 75 41,565 1,005"
   source: CLM 52nd Report (archive copy), §28.11(a), p. 95, `-table` extraction
   [Re-verified against `-table` and unchanged. Still subject to the stale-data caveat above.]

 - field: fl.regionalMinorityLanguages — THE OTHER STAGE TABLES, RECOVERED BY RE-EXTRACTION
   quote: "28.8 Primary Stage (Class I to V) / a. ... Language Schools Students Teachers / Urdu 130 43,945 1,032 / Marathi 107 46,075 1,252 / Sindhi 01 44 2 / Hindi 504 1,72,7191 4,831 / English 2,476 8,24,595 34,432"
   source: same, §28.8(a), p. 94, `-table` extraction
   quote: "b. ... Hindi 375 1,35,501 3,251 / English 1,255 4,90,544 14,705"
   source: same, §28.8(b), p. 94, `-table` extraction
   quote: "28.9 Upper Primary Stage (Class VI to VIII) / a. ... Urdu 90 60,872 1,243 / Marathi 101 47,456 940 / Sindhi 2 5,100 27"
   source: same, §28.9(a), p. 95, `-table` extraction
   quote: "b. ... Hindi 27,850 32,01,695 38,750 / English 1,005 1,76,546 4,511"
   source: same, §28.9(b), p. 95, `-table` extraction
   [**CORRECTED AFTER RE-EXTRACTION.** Under `-layout` I could read only the Urdu, Marathi and
   Sindhi rows of §28.8(a), and I had suspected a row shift that turns out not to exist. Two
   defects remain and are therefore **in the source, not the extraction**: (1) Hindi's
   primary-stage student count prints as the malformed token "1,72,7191", which I do not report
   as a number; (2) §28.9(a) gives Sindhi 5,100 pupils in 2 schools, which is not credible.
   Note also that Gujarat's largest reported figures by far are Hindi and English taught as
   SUBJECTS at upper primary — 27,850 schools and 32,01,695 pupils for Hindi — i.e. the third
   language of the formula taught right across the state system, not a minority-language
   facility in any ordinary sense.]
   quote: "b. No information has been furnished about the minority languages being taught as a subject at the Higher Secondary Stage of education."
   source: same, §28.11(b), p. 95

 - field: fl.secondaryRequirement — SOURCED ABSENCE AT IX-X
   quote: "28.10 Secondary Stage (IX to X) / No information has been furnished about the minority languages being used as the mediums of instruction or taught as a subject at the Secondary stage of education."
   source: CLM 52nd Report (archive copy), §28.10, p. 95
   [A whole stage is blank in Gujarat's return. That is the state's non-answer, not my gap.]

 - field: fl.uptake — WHY I PROPOSE NO SERIES FOR GUJARAT
   quote: "b. The details of the students covered under the Three Language Formula in classes VIII, X and XII are as follows: / Language Class VIII Class X Class XII / Gujarati 180 62,456 30,135 / English 80 745 667 / Hindi 65 72,402 305 / Urdu 60 173 35 / Sindhi 0 4 4"
   source: CLM 52nd Report (archive copy), §28.12(b), p. 96
   [**RE-EXTRACTION WITH `-table` CONFIRMS THESE FIGURES ARE PRINTED EXACTLY AS ABOVE**, so the
   defects below are the state's own return and not extraction artefacts — but they are still
   defects and I still propose no uptake series. The Class VIII column reads 180, 80, 65, 60, 0
   against a Class X column of 62,456, 745, 72,402, 173, 4. A class VIII cohort of 180 preceding
   a class X cohort of 62,456 in the same language is impossible. Separately, Hindi (72,402)
   exceeding Gujarati (62,456) at class X in a state where Gujarati is 84.40 per cent of the
   population is not credible on its face. Combined with the CLM's finding that this data is
   recycled from the 50th and 51st Reports, none of it is safe. Reported as a quoted table only.]

 - field: fl.teacherSupply — THE PROSE IS THE EVIDENCE, THE TABLE IS NOT
   quote: "28.13 Teachers for Minority Languages / a. As regard the teachers for minority languages, the details of the sanctioned posts for using the minority languages as the mediums of instruction only have been given. No information as to the filled up and sanctioned posts for teaching minority languages as a subject has been given."
   source: CLM 52nd Report (archive copy), §28.13(a), p. 96
   quote: "b. The State Government has not provided any information with regard to the arrangement for training of teachers for using/teaching of minority language as a medium and as a subject."
   source: same, §28.13(b), p. 97
   quote: "g. The State Government needs to furnish detailed information about the posts of teachers and the arrangements for their training for teaching of minority languages in the State."
   source: same, Findings/Recommendations, p. 97
   quote: "As a Medium | As a Subject / Language | Posts Sanctioned | Posts filled-up | Posts Sanctioned | Posts filled-up / Gujarati 813 - - - / English 181 - - - / Hindi 21 - - - / Urdu 93 - - - / Sindhi 288 - - -"
   source: same, §28.13(a), p. 96, `-table` extraction, confirmed independently by `-lineprinter`
   [**CORRECTED AFTER RE-EXTRACTION.** Under `-layout` this table was unreadable — five language
   labels stacked in one column and five numbers in another — and I had reported no figures. Both
   strict extractors agree on the pairing above. The filled-up column is a dash for every
   language, which confirms the prose: **Gujarat supplied sanctioned medium-of-instruction posts
   only, with no filled figure for any language and no subject-post figure for any language.**
   One oddity is now established as the SOURCE's, not the extraction's: Sindhi shows 288
   sanctioned posts against a single Sindhi-medium primary school and two upper primary schools
   in the same chapter, while Urdu shows 93 against 130 primary and 90 upper primary schools.
   Gujarati and English appear here although Gujarati is the state official language, not a
   minority language of Gujarat.]

 - field: fl.regionalMinorityLanguages — TEXTBOOKS AND ACADEMIES
   quote: "b. It has also been informed that the Gujarat State Textbook Board, Gujarat State, Gandhinagar, is the Agency responsible for the preparation and publication of textbooks and other teaching materials in minority languages."
   source: CLM 52nd Report (archive copy), §28.14(b), p. 97
   quote: "c. It has been stated that minority language textbooks and other teaching materials are not available to the linguistic minority students at competitive/subsidized rates."
   source: same, §28.14(c), p. 97
   quote: "b. It has been informed that the Sindhi Academy and Urdu Academy have been set up for the promotion and development of these languages as follows: / Language Name of Academy When Established Budget for year 2014-15 (in lakhs) / Urdu Urdu Academy - / Sindhi Sindhi Academy 1993 - / 1993"
   source: same, §28.16(b), p. 97
   [The year 1993 appears twice, once per academy; `-table` confirms both academies carry 1993 and
   that the budget column is a dash for both. §28.16(a) records "No specific information ... with regard to the schemes for
   the promotion and development of minority languages", and the CLM's recommendation (h) asks
   the state "to inform the budgetary allocation for the academies" — so **both academies existed
   on paper with no reported budget for 2014-15.**]

 - field: fl.regionalMinorityLanguages — NO MONITORING MACHINERY AT ALL
   quote: "28.17 Machinery for the Implementation of Safeguards / It has been informed that there is no Machinery or Committee constituted to monitor and review the implementation of Safeguards for the linguistic minorities at the State/District level in the State."
   source: CLM 52nd Report (archive copy), §28.17, p. 97
   quote: "28.18 ... There is said to be no mechanism for the publicity of the Safeguards for the linguistic minorities in the State."
   source: same, §28.18, p. 97
   quote: "28.3 The State Government has not furnished any information on District/Tehsil/Taluka/Municipality where the linguistic minorities constitute 15 per cent or more of the local population."
   source: same, §28.3, p. 93

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India. The state or other relevant bodies would decide the choices of R1, R2, or R3 that would be given to students."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [NCF 2023 postdates the CLM return by eight years; I have not established Gujarat's adoption.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - CLM found this data recycled unchanged from its 50th and 51st Reports
     - Three Language Formula with a wide first-language choice, third language fixed
     - First Language: Gujarati, Hindi, Marathi, English or Urdu
     - English is a first-language option in Gujarat, not classed as a foreign language

 - field: fl.secondaryRequirement
   bullets:
     - Second Language is Gujarati or English, whichever the pupil did not take first
     - Third Language is Hindi for everyone, an Indian language not a foreign one
     - Chapter records no minority language provision at IX-X, no information furnished
     - A pupil whose first language is Hindi has no distinct third language named

 - field: fl.upperSecondary
   bullets:
     - Figures carried forward from earlier CLM reports, not observed in 2014-15
     - Minority-medium XI-XII schools: 75 Hindi, 20 Urdu, 15 Marathi, 8 Sindhi, 2 Tamil
     - No information furnished on minority languages as a subject at XI-XII
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - Gujarati is the sole official language of the state
     - Formula languages are Gujarati, Hindi, Marathi, English and Urdu
     - Recognised minority institutions cover Urdu, Marathi, Sindhi, Tamil and Hindi
     - Sindhi and Tamil appear in institutions but on no formula language list

 - field: fl.regionalMinorityLanguages
   bullets:
     - CLM called it highly deplorable that Gujarat re-sent unchanged data for a third time
     - Gujarat State Textbook Board prepares the minority-language textbooks
     - Textbooks are not supplied at competitive or subsidised rates, state's own answer
     - Sindhi and Urdu Academies exist, with no budget reported for 2014-15

 - field: fl.teacherSupply
   bullets:
     - Sanctioned medium posts only; Gujarat gave no filled figure for any language
     - Posts sanctioned: Gujarati 813, Sindhi 288, English 181, Urdu 93, Hindi 21
     - No figures at all for posts to teach a minority language as a subject
     - No information furnished on training minority-language teachers

 - field: fl.uptake
   [NO SERIES PROPOSED. The §28.12(b) table gives class VIII counts of 180, 80, 65, 60 and 0
   against class X counts of 62,456, 745, 72,402, 173 and 4 for the same languages, which cannot
   both be enrolments; and the CLM records the whole data set as recycled from earlier reports.
   Recording nothing is the correct result here.]

 - field: policyHistory
   rows:
     - {year: 1993, description: "Gujarat's Urdu Academy and Sindhi Academy established, per the year given in the state's return to the Commissioner for Linguistic Minorities"}
     - {year: 2015, description: "Commissioner for Linguistic Minorities found it highly deplorable that Gujarat's minority-language education data was identical to that supplied for the 50th and 51st Reports"}
     - {year: 2015, description: "Gujarat reported no machinery or committee at state or district level to monitor implementation of the safeguards for linguistic minorities"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state choosing which"}
   [The 1993 row is as good as the source allows: the table shows 1993 twice with the column
   shifted, once against each academy. Chapter 28 names no other dated instrument — no act, no
   rule, no government resolution.]
