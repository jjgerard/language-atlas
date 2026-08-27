### IN-KL|Kerala (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 33, Kerala, pp. 117-122"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** All facts as reported to the
         CLM for 2014-15; all census figures Census-2001, not 2011.
   **EXTRACTION — THIS UNIT WAS WRITTEN DIRECTLY FROM `pdftotext -table`,** never from the
         project's `-layout` text, which wraps table cells onto the wrong line and mis-rows grids
         throughout this report. `pdftotext -lineprinter` was used as a second opinion.
         Every figure below is from the `-table` output.
   CHAPTER-NUMBERING WARNING: **Kerala is chapter 33, not chapter 31** (chapter 31 is Andaman and
         Nicobar Islands). The report's contents page extracts with misaligned columns and gives
         the wrong mapping; an earlier pass on this project was misled by it. I worked from the
         chapter body. Kerala's Three Language Formula section is numbered **33.13**, not 33.12
         — §33.12 is the Higher Secondary Stage. Section numbering is not uniform across chapters.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not Kerala's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement — THE FORMULA
   quote: "33.13 Three Language Formula / a. The languages taught under the Three Language Formula in the State are as follows: / First language : Regional language (Malayalam) / Second language: English / Third language: Hindi"
   source: CLM 52nd Report (archive copy), §33.13(a), p. 120
   [Located by section NAME inside the chapter body. **Kerala's is the plainest formula of my
   seven units** — one language in each slot, no alternatives offered. Contrast Karnataka's six
   first-language options and Tripura's four.]

 - field: fl.primaryRequirement — AND THE CLM'S OBJECTION TO IT
   quote: "c. The status of minority languages being taught as the First Language under the Three Language Formula has not been mentioned. Hindi is mentioned as the Third Language under the Three Language Formula; however, the number of students studying Hindi has not been mentioned. It needs to be clarified. Also, the facilities for learning Konkani in the State is required to be furnished."
   source: CLM 52nd Report (archive copy), Findings/Recommendations under §33.22, p. 122
   [**This is the qualifier that must lead any bullet on the formula.** Kerala returned "Regional
   language (Malayalam)" as the First Language without saying whether a Tamil- or Kannada-speaking
   child may take their own language in that slot, and the CLM refused to accept the answer. It
   also returned Hindi as the third language with no uptake figure whatsoever.]

 - field: fl.languagesOffered — THE OFFICIAL LANGUAGE AND THE LINGUISTIC PROFILE
   quote: "33.2 Official Language of the State: Malayalam is the Official Language of the State."
   source: CLM 52nd Report (archive copy), §33.2, p. 117
   quote: "33.1 The Census-2001 registered the population of Kerala as 3,18,41,374 persons and its broad linguistic profile is as follows: / Languages Speakers Percentage / Malayalam 3,08,03,747 96.74 / Tamil 5,96,971 1.87 / Kannada 81,406 0.26 / Konkani 61,376 0.19"
   source: same, §33.1, p. 117, `-table` extraction
   [Clean under `-table`; four rows, four counts, four percentages, and 3,08,03,747/3,18,41,374 =
   96.74% ✓. **Kerala is the most linguistically homogeneous of my seven units by a wide margin**
   — 96.74 per cent Malayalam at Census-2001, against Karnataka's 65.92 and the Andamans' 25.71
   for their largest language. Never present as current. Note Tulu appears at §33.4 with 18.04
   per cent of Kasaragod Taluk but does not appear in this census list at all.]

 - field: fl.languagesOffered / fl.uptake — WHAT IS ACTUALLY TAUGHT, AND IT IS NOT THE FORMULA
   quote: "33.9 b. It has been informed that Sanskrit, Arabic and Urdu are taught as a subject at the Primary stage of education, as per the details given below: / Language Schools Students Teachers / Arabic 3,162 4,27,979 3,412 / Sanskrit 3 250 2 / Urdu 3 41 5"
   source: CLM 52nd Report (archive copy), §33.9(b), p. 119, `-table` extraction
   quote: "33.10 b. ... Arabic 1,619 2,36,051 1,527 / Sanskrit 1,743 1,50,848 1,169 / Urdu 1,089 66,533 1,042"
   source: same, §33.10(b), p. 119, `-table` extraction
   quote: "33.11 b. ... Arabic 1,143 2,33,959 1,404 / Sanskrit 1,161 71,535 1,128 / Urdu 447 35,808 423"
   source: same, §33.11(b), pp. 119-120, `-table` extraction
   [**THE MOST STRIKING FINDING IN THIS CHAPTER.** Kerala's declared third language is Hindi, for
   which it supplied no figure at all — while it reports **4,27,979 primary pupils learning Arabic
   as a subject in 3,162 schools**, plus 2,36,051 at upper primary and 2,33,959 at secondary.
   Sanskrit and Urdu are also substantial at upper primary (1,50,848 and 66,533). Arabic here is
   an additional language taught as a subject across a large part of the school system, and the
   source does not call it a foreign language; it lists it alongside Sanskrit and Urdu under a
   heading about minority-language provision. All three tables are clean under `-table`.]

 - field: fl.upperSecondary — ENGLISH IS THE MEDIUM AT XI-XII
   quote: "33.12 Higher Secondary Stage (XI to XII) / a. It has been stated that English is the medium of instruction in the Higher Secondary classes. Besides, the candidates have the option to write the examination in Malayalam and in the minority languages, viz. Tamil or Kannada."
   source: CLM 52nd Report (archive copy), §33.12(a), p. 120
   quote: "b. It has also been stated that the following minority languages are taught as a subject at the Higher Secondary stage of education: / Language Schools Students Teachers / Tamil 26 982 20 / Kannada 33 1,685 27"
   source: same, §33.12(b), p. 120, `-table` extraction
   [**A distinctive rule and one that no other of my seven units reports.** Kerala states English
   as *the* medium of instruction at XI-XII, with the minority-language accommodation shifted from
   the classroom to the examination script. This is a further reason not to file English in
   Kerala as a foreign language.]

 - field: fl.uptake — STUDENTS COVERED BY THE FORMULA
   quote: "b. The details of the students covered under the Three Language Formula are as under: / Language Class VIII Class X Class XII / Tamil 2,555 2,955 Nil / Kannada 3,338 3,441 Nil"
   source: CLM 52nd Report (archive copy), §33.13(b), p. 120, `-table` extraction
   [Clean under `-table`. Note what the table does NOT contain: **no row for Malayalam, English or
   Hindi**, i.e. the three languages the formula actually names. Kerala reported uptake only for
   the two minority languages, and returned Nil for both at class XII — consistent with §33.12(a),
   where the higher secondary medium is English.]

 - field: fl.teacherSupply — FULLY FILLED ON PAPER, CONTRADICTED IN THE SAME CHAPTER
   quote: "33.14 Teachers for Minority Languages / a. The details of the posts of teachers for using/teaching minority languages as a medium of instruction and as a subject are as follows: / Language | As a Medium Sanctioned | Filled | As a Subject Sanctioned | Filled / Tamil 137 137 80 80 / Kannada 93 93 - -"
   source: CLM 52nd Report (archive copy), §33.14(a), p. 120, `-table` extraction
   quote: "33.22 The CLM brought to the notice of the Additional Chief Secretary regarding the number of vacant posts Teachers in Kannada, Tamil and urged him to fill up on priority basis."
   source: same, §33.22, p. 122
   [**THESE TWO CANNOT BOTH BE RIGHT AND I REPORT BOTH.** The state's return shows every sanctioned
   post filled — 137 of 137 Tamil medium, 80 of 80 Tamil subject, 93 of 93 Kannada medium. Two
   pages later the Commissioner records raising vacant Kannada and Tamil teacher posts with the
   Additional Chief Secretary and urging that they be filled on priority. The table is the state's
   questionnaire answer; the vacancy statement is the CLM's own account of a meeting.]

 - field: fl.teacherSupply — TRAINING, FOR MEDIUM AS WELL AS SUBJECT
   quote: "b. The details of arrangements for training of teachers for teaching minority languages are as under: / Training Institute | Minority Language | As a medium | As a subject / District Institute of Educational Training (DIET) | Tamil Kannada | Tamil Kannada"
   source: CLM 52nd Report (archive copy), §33.14(b), p. 120, `-table` extraction
   quote: "c. The State Government has not provided any information about the collaboration/arrangement with neighbouring States for exchange of minority language teachers/opening of teachers training centres."
   source: same, §33.14(c), p. 120
   [DIETs train Tamil and Kannada teachers **both as a medium and as a subject**. Only Kerala and
   Karnataka among my seven units train for medium; Tripura trains for subject only.]

 - field: fl.regionalMinorityLanguages — THE PROVISION, AND WHERE IT IS CONCENTRATED
   quote: "33.4 The details of the District/Tehsil/Taluka/Municipality where minority languages are spoken by 15 per cent or more of its population are as follows: / Kasaragod Kasaragod Taluk Tulu 18.04 / Palakkad Chittur Taluk Tamil 20.03 / Palakkad Chittur-Thatmangalam Municipality Tamil 18.41 / Idukki - Tamil 19.64 / Idukki Devikulam Taluk Tamil 48.53 / Idukki Peerumedu Taluk Tamil 36.55"
   source: CLM 52nd Report (archive copy), §33.4, p. 117, `-table` extraction
   [Clean under `-table`: district, taluk, language and percentage all pair correctly. **Tamil
   reaches 48.53 per cent in Devikulam Taluk.** Tulu appears here and nowhere else in the chapter —
   there is no Tulu school provision, no Tulu teacher post and no Tulu textbook.]
   quote: "b. The details of the linguistic minorities educational Institutions that have been recognized language wise as on 30 June 2015 are as given below: / Level | Name of Minority Language | Number of Schools / Primary Tamil/Kannada 109/91 / Upper Primary/Middle Tamil/Kannada 34/45 / Secondary Tamil/Kannada 64/49 / Higher Secondary Nil Nil"
   source: same, §33.7(b), p. 118, `-table` extraction
   [The identical table is repeated at §33.8(b) for grants-in-aid, i.e. **every recognised
   linguistic minority institution in Kerala is aided.** Higher Secondary is Nil at both.]

 - field: fl.regionalMinorityLanguages — TEXTBOOKS AND REGISTERS
   quote: "b. It has been informed that the SCERT has been entrusted with the task of the preparation and publication of textbooks and other teaching materials in minority languages. / c. It has also been informed that minority language textbooks and other teaching materials are available to the students at subsidized rates."
   source: CLM 52nd Report (archive copy), §33.15(b)-(c), p. 120
   quote: "33.16 Maintenance of `Language Preference Registers' in Schools / ... L.P. Schools - 232 / U.P. Schools - 90 / High Schools - 109"
   source: same, §33.16, p. 120, `-table` extraction
   quote: "33.17 Promotion and Development of Minority Languages / There is said to be no scheme in the State for the promotion and development of minority languages."
   source: same, §33.17, p. 120

 - field: fl.regionalMinorityLanguages / policyHistory — THE 2015 ACT, AND THE CLM'S ALARM AT IT
   quote: "Meanwhile, it has been reported that the Malayalam Language (Dissemination and Enrichment) Act, 2015 has been enacted by the State Government, which will erode the rights of the Linguistic Minorities provided under the Official Languages, 1969. Therefore, the State Government is urged to ensure the rights of the linguistic minorities protected as envisaged under the Constitutional and the Consensual Safeguards for Linguistic Minorities in the State."
   source: CLM 52nd Report (archive copy), §33.22, p. 122
   [**A dated statute the CLM names, and the strongest policy signal in the chapter.** Two limits I
   state plainly. (1) **I have not read the Act.** I probed the PRS Legislative Research state-acts
   archive for it in this session — `https://prsindia.org/acts/state-acts?state=Kerala` returns
   404, and sixteen candidate act numbers at
   `https://prsindia.org/files/bills_acts/acts_states/kerala/2015/2015KL<nn>.pdf` all returned 404.
   I will not guess a URL or an act number. (2) The CLM's sentence names the earlier instrument
   only as "the Official Languages, 1969", which is incomplete on its face — evidently a Kerala
   official-languages instrument of 1969 that the CLM does not title in full. I reproduce the
   phrase verbatim rather than completing it. The prediction that the Act "will erode the rights of
   the Linguistic Minorities" is the Commissioner's assessment, not a finding of fact, and any
   bullet must say so.]

 - field: fl.regionalMinorityLanguages — KONKANI, AND THE MACHINERY THAT ACTUALLY EXISTS
   quote: "It was also informed that in principle it has been decided to accord Minority Status to the Institutions established and administered by the Konkani speakers in the State. The CLM also urged them to extend necessary facilities for the Konkani Academy."
   source: CLM 52nd Report (archive copy), §33.21, p. 122
   quote: "33.18 a. It has been stated that a State Level Committee to monitor and review the implementation of safeguards for linguistic minorities under the Chairmanship of the Chief Minister has been constituted. The Members of the Legislative Assembly and the Heads of Administrative Departments are its members. The last meeting of the Committee was held on 15.07.2015."
   source: same, §33.18(a), p. 121
   [**Kerala is the only one of my seven units with a functioning state-level safeguards
   committee**, chaired by the Chief Minister, with a dated meeting. Mizoram, Gujarat, Karnataka
   and the Andamans all reported none; Tamil Nadu has a Minorities Commission instead. §33.18(b)
   adds district-level committees under the District Collectors.]

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [Kerala's Malayalam-English-Hindi combination satisfies this. NCF 2023 postdates the CLM return
   by eight years and I have not established Kerala's adoption of it.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - CLM rejected the state's return as unclear on minority first languages
     - Three Language Formula with one language per slot, no alternatives offered
     - First Language given only as "Regional language (Malayalam)"
     - Second Language English, Third Language Hindi

 - field: fl.secondaryRequirement
   bullets:
     - Kerala gave the CLM no figure at all for students studying Hindi
     - Tamil and Kannada medium schooling continues through class X, 61 and 49 schools
     - Arabic, Sanskrit and Urdu taught as subjects at IX-X in over 1,100 schools each
     - Formula uptake reported only for Tamil and Kannada, 2,955 and 3,441 at class X

 - field: fl.upperSecondary
   bullets:
     - English is stated to be the medium of instruction in higher secondary classes
     - Candidates may write the examination in Malayalam, Tamil or Kannada instead
     - Tamil taught as a subject in 26 higher secondary schools, Kannada in 33
     - No linguistic minority institution is recognised at higher secondary level

 - field: fl.languagesOffered
   bullets:
     - Malayalam is the sole official language; the formula adds English and Hindi
     - Arabic, Sanskrit and Urdu offered as subjects, Arabic on a very large scale
     - Tamil and Kannada available as media of instruction from class I to X
     - Tulu passes 15 pct in Kasaragod Taluk but has no school provision at all

 - field: fl.regionalMinorityLanguages
   bullets:
     - Position as reported to the CLM for 2014-15, on Census-2001 speaker shares
     - Tamil is 48.53 pct of Devikulam Taluk and 36.55 pct of Peerumedu, both in Idukki
     - Every recognised linguistic minority institution in the state is grant-aided
     - State reported no scheme for the promotion and development of minority languages

 - field: fl.teacherSupply
   bullets:
     - State reported every post filled; the CLM separately raised vacancies with the state
     - Tamil medium posts 137 sanctioned and 137 filled, subject posts 80 and 80
     - Kannada medium posts 93 sanctioned and 93 filled, no subject posts reported
     - DIETs train Tamil and Kannada teachers as a medium and as a subject

 - field: fl.uptake
   series (each row note: "as reported to the CLM, 2014-15; Census-2001 baseline"):
     - {year: 2015, value: 427979, note: "Arabic as a subject, primary I-V, 3,162 schools, CLM 33.9(b)"}
     - {year: 2015, value: 236051, note: "Arabic as a subject, upper primary VI-VIII, 1,619 schools, CLM 33.10(b)"}
     - {year: 2015, value: 150848, note: "Sanskrit as a subject, upper primary VI-VIII, 1,743 schools, CLM 33.10(b)"}
     - {year: 2015, value: 66533, note: "Urdu as a subject, upper primary VI-VIII, 1,089 schools, CLM 33.10(b)"}
   [Three Language Formula uptake, if that field is preferred instead: Tamil 2,555 at class VIII
   and 2,955 at class X; Kannada 3,338 and 3,441; Nil at class XII for both. Kerala supplied NO
   uptake figure for Malayalam, English or Hindi, which the CLM expressly criticised.]

 - field: policyHistory
   rows:
     - {year: 1969, description: "The Commissioner refers to rights of linguistic minorities provided under what he calls the Official Languages, 1969, without titling the instrument in full"}
     - {year: 2002, description: "Kerala published a booklet, Safeguards for Linguistic Minorities in Kerala, for the benefit of linguistic minorities"}
     - {year: 2015, description: "Malayalam Language (Dissemination and Enrichment) Act 2015 enacted; the Commissioner for Linguistic Minorities assessed that it would erode minority rights under the 1969 official-languages instrument and urged the state to protect them"}
     - {year: 2015, description: "Kerala decided in principle to accord minority status to institutions established and administered by Konkani speakers, and the Commissioner urged support for the Konkani Academy"}
     - {year: 2015, description: "Kerala's state-level committee on linguistic minority safeguards, chaired by the Chief Minister, last met on 15 July 2015"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state choosing which"}
   [The 1969 row is deliberately worded to record the CLM's incomplete reference rather than to
   assert a statute title I have not verified. I did not read the 2015 Act; PRS returned 404 for
   the Kerala state-acts index and for sixteen probed 2015 act numbers in this session.]
