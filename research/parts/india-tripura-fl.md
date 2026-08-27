### IN-TR|Tripura (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 23, Tripura, pp. 79-84 (report text lines 4031-4319)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** All facts as reported to the
         CLM for 2014-15; all census figures Census-2001, not 2011.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's
         original `-layout` extraction wraps table cells onto the wrong line and mis-rows grids
         throughout this report. **Every Tripura figure used here survived re-extraction
         unchanged**, and the `-table` output independently confirms the census correction I had
         derived arithmetically: Tripuri/Kokborok 8,14,375 speakers, 25.46 per cent. The
         Three Language Formula slots, the §23.8(b) primary subject table, the §23.12(b) uptake
         row and the §23.13(a) teacher table all read identically under `-table`.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not Tripura's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement / fl.languagesOffered — THE FORMULA
   quote: "23.12 Three Language Formula / a. The languages taught under the Three Language Formula are as follows: / First Language:  Bengali/Kokborok/B. Manipuri/Chakma / Second Language:  English / Third Language:  Arabic/Hindi/Sanskrit"
   source: CLM 52nd Report (archive copy), §23.12(a), p. 81
   [Located by section NAME within lines 4031-4319. **This is the most open first-language slot
   of any of my seven units**: four languages are offered as First Language, including three
   minority/tribal languages. The third-language slot offers a choice of three: Arabic, Hindi or
   Sanskrit. Hindi and Sanskrit are Indian languages; Arabic is the only one that would sit in a
   "foreign language" category, and the source does not call it one.]

 - field: fl.languagesOffered — WHAT THE STATE'S OWN OFFICIAL LANGUAGES ARE
   quote: "23.2 Official Languages of the State: The Official Languages of the State are Bengali, English and Kokborok."
   source: CLM 52nd Report (archive copy), §23.2, p. 79
   [So English in Tripura is a state official language, not a foreign one, and Kokborok — a
   minority language by population share — is co-official.]

 - field: fl.uptake — AND THE CONTRADICTION INSIDE THE CHAPTER
   quote: "b. The details of students covered under the Three Language Formula in classes VIII, X and XII are as follows: / Language Class VIII Class X Class XII / Kokborok 2,832 Nil Nil"
   source: CLM 52nd Report (archive copy), §23.12(b), p. 82
   quote: "23.10 Secondary Stage (IX to X) / b. Details of the facility for learning minority language as a subject at the Secondary stage of education are as under: / Language Schools Students Teachers / Kokborok 46 8,240 80"
   source: same, §23.10(b), p. 81
   [**THESE TWO CANNOT BOTH BE RIGHT.** §23.12(b) says Nil students were covered in Kokborok at
   class X; §23.10(b) says 8,240 students were learning Kokborok as a subject at the secondary
   stage, which is classes IX to X. A further problem: §23.9(b) gives Kokborok at UPPER PRIMARY
   as "46 8,240 80" — the same three numbers, identical, which is the signature of a duplicated
   row. **RE-EXTRACTION WITH `-table` CONFIRMS BOTH ROWS ARE PRINTED THAT WAY IN THE REPORT**, so
   the duplication and the contradiction are the state's own, not extraction artefacts. I am
   reporting the contradiction rather than choosing a side, and I use only the class VIII figure
   of 2,832 in the uptake series.]

 - field: fl.languagesOffered / fl.regionalMinorityLanguages — MINORITY LANGUAGES AS SUBJECTS
   quote: "23.8 Primary Stage (Class I to V) / b. Details of the facility for learning minority languages as a subject at the Primary stage of education are as follows: / Language Schools Students Teachers / Bishnupriya Manipuri 36 4,451 72 / Chakma 58 5,472 29 / Halam 90 850 45 / Mog 37 445 37 / Manipuri 22 1,626 22 / Kuki-Mizo 17 250 17"
   source: CLM 52nd Report (archive copy), §23.8(b), p. 81
   [Re-verified against `-table`, identical. Note that **Kokborok is absent from this primary-stage
   table** despite being a state official language and the largest minority language — it first
   appears at upper primary (§23.9b). Six other languages are taught as subjects at primary.]

 - field: fl.teacherSupply — THE ONE FIGURE THE CHAPTER GIVES, AND THE CLM'S CAVEAT ON IT
   quote: "23.13 Teachers for Minority Languages / a. The details of teachers for teaching the minority languages are as follows: / Language Medium Subject / Kokborok / Sanctioned Filled Sanctioned Filled / - - 2,517 2,517"
   source: CLM 52nd Report (archive copy), §23.13(a), p. 82
   quote: "c. The information provided on the number of posts of teachers for minority languages is not clear as it only mentions Kokborok."
   source: same, Findings/Recommendations under §23.18, p. 83
   [The table reads cleanly enough — no medium-of-instruction posts at all, and 2,517 sanctioned
   posts for Kokborok as a subject, all 2,517 filled. But the CLM itself flags the return as
   unclear, so any bullet must carry that. **No sanctioned/filled figures exist for any language
   other than Kokborok.**]

 - field: fl.teacherSupply — TEACHER TRAINING, WHICH TRIPURA UNIQUELY HAS
   quote: "b. The teachers are said to be trained for teaching Kokborok as a subject as follows: / Training Institute  Minority Language / District Institute of Educational Training (DIET) at Agartala, Kamalpur, Kakraban, Kailashahar  As a Medium  As a Subject / -  Kokborok"
   source: CLM 52nd Report (archive copy), §23.13(b), p. 82
   quote: "Arrangements should also be made through DIET to train teachers for using/teaching the minority languages as mediums of instruction and as a subject, as is done in the case of Kokborok."
   source: same, Findings/Recommendations, p. 83
   quote: "c. As regards the collaboration/arrangement with neighbouring State for exchange of minority language teachers/opening of teachers training institutes/centres, it has been stated that no such arrangement has been made so for."
   source: same, §23.13(c), p. 82
   [Tripura is the only one of my seven units that reports an actual named training pathway for
   minority-language teachers — four DIETs, for Kokborok as a subject only, not as a medium.]

 - field: fl.regionalMinorityLanguages — TEXTBOOKS AND MACHINERY
   quote: "b. It has also been informed that the SCERT, Tripura, is the agency for the preparation and publication of textbooks and other teaching materials in minority languages. The textbooks are being provided to the students, free of cost upto class VIII."
   source: CLM 52nd Report (archive copy), §23.14(b), p. 82
   quote: "It has been informed that the State Minorities Commission has not been established in the State. However, it has been informed that the Directorate for Languages, i.e., the Directorate of Kokborok and other minority languages have been established. It has also been informed that every minority language has an Advisory Committee"
   source: same, §23.17(c), p. 83
   quote: "It has been added that the Directorate of Kokborok and other minority languages, Tripura also published a half yearly Magazine in different languages like Kokborok, Halam, Chakma, Mog, Kuki-mizo, Manipuri, B. Manipuri etc."
   source: same, §23.4(b), pp. 79-80
   [Tripura produces its own minority-language textbooks through SCERT, unlike Mizoram which buys
   them in. And it has a standing Directorate of Kokborok and other minority languages.]

 - field: fl.regionalMinorityLanguages — THE CENSUS PROFILE, WITH THE EXTRACT ERROR CORRECTED
   quote: "23.1 The Census-2001 registered the population of Tripura as 31,99,203 persons and its broad linguistic profile is as follows: / Bengali 21,47,994 67.14 / Tripuri/Kokborok 25.46 / Hindi 8,14,375 1.68 / Mogh 53,691 0.90 / Odiya 28,850 0.75 / Bishnupriya Manipuri 23,899 0.68 / Manipuri 21,716 0.65 / Halam 20,716 0.56 / Garo 17,990 0.35 / 11,312"
   source: CLM 52nd Report (archive copy), §23.1, p. 79
   [**The speakers column was shifted down one row by the original `-layout` extraction. I first
   proved the correction arithmetically against the stated total of 31,99,203, and `pdftotext
   -table` has since confirmed it directly — the `-table` output prints "Tripuri/Kokborok
   8,14,375 25.46" on one row. Working, kept because it is the check that caught it:** 21,47,994/31,99,203 = 67.14% ✓ (Bengali
   is correct). Then 8,14,375/31,99,203 = 25.46%, which is the Tripuri/Kokborok percentage, not
   Hindi's; 53,691/31,99,203 = 1.68%, which is Hindi's; 28,850 = 0.90% = Mogh; 23,899 = 0.75% =
   Odiya; 21,716 = 0.68% = B. Manipuri; 20,716 = 0.65% = Manipuri; 17,990 = 0.56% = Halam;
   11,312 = 0.35% = Garo. Every row checks out on the shift-by-one reading. Corrected:
   **Tripuri/Kokborok 8,14,375 speakers, 25.46 per cent.** Census-2001 — never present as current.]

 - field: fl.regionalMinorityLanguages — WHERE KOKBOROK IS CONCENTRATED
   quote: "However, Kokborok is spoken by 15 per cent or more of the District population, as given below: / West 40 / North 19 / South 35 / Dhalai 51 / Sepahijala 25 / Gomati 45 / Khowai 49 / Unakoti 18"
   source: CLM 52nd Report (archive copy), §23.3, p. 79
   [Kokborok is over 15 per cent in **all eight districts** and an outright majority in Dhalai
   (51 per cent). This percentage table is clean — the district names and figures align.]

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [Tripura's combination satisfies this on any of its offered choices. NCF 2023 postdates the
   CLM return by eight years and I have not established Tripura's adoption of it.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - As reported to the Commissioner for Linguistic Minorities, 2014-15
     - Three Language Formula with an unusually open first-language slot
     - First Language: Bengali, Kokborok, Bishnupriya Manipuri or Chakma
     - Second Language English, a state official language rather than a foreign one
     - Third Language chosen from Arabic, Hindi or Sanskrit

 - field: fl.secondaryRequirement
   bullets:
     - Chapter contradicts itself on Kokborok at class X, both readings recorded below
     - Formula table shows Nil students covered in Kokborok at class X and class XII
     - Stage table shows 8,240 learning Kokborok as a subject at secondary, 46 schools
     - Same three figures appear at upper primary too, so one row is likely duplicated

 - field: fl.upperSecondary
   bullets:
     - No minority language is a medium of instruction at XI-XII, state's own report
     - No information furnished on minority languages as a subject at XI-XII
     - Formula table records Nil students covered in Kokborok at class XII
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - Third-language options are Arabic, Hindi and Sanskrit, only Arabic non-Indian
     - Subjects at primary: Bishnupriya Manipuri, Chakma, Halam, Mog, Manipuri, Kuki-Mizo
     - Kokborok is absent from the primary subject table, appearing first at VI-VIII
     - Bengali, English and Kokborok are the state's three official languages

 - field: fl.regionalMinorityLanguages
   bullets:
     - Position as reported to the CLM for 2014-15, on Census-2001 speaker shares
     - Kokborok is 15 per cent plus in all eight districts and 51 per cent in Dhalai
     - SCERT Tripura writes and publishes the minority-language textbooks itself
     - Directorate of Kokborok and other minority languages runs advisory committees

 - field: fl.teacherSupply
   bullets:
     - CLM warned the teacher return is unclear because it covers only Kokborok
     - Kokborok as a subject: 2,517 posts sanctioned and 2,517 filled, no medium posts
     - Four DIETs at Agartala, Kamalpur, Kakraban and Kailashahar train Kokborok teachers
     - No arrangement with neighbouring states for exchange of minority language teachers

 - field: fl.uptake
   series (each row note: "students covered by the Three Language Formula, as reported to the
   CLM, 2014-15; the chapter's class X figure conflicts with its own stage table"):
     - {year: 2015, value: 2832, note: "Kokborok, class VIII, CLM 23.12(b)"}
     - {year: 2015, value: 4451, note: "Bishnupriya Manipuri as a subject, primary I-V, 36 schools, CLM 23.8(b)"}
     - {year: 2015, value: 5472, note: "Chakma as a subject, primary I-V, 58 schools, CLM 23.8(b)"}
     - {year: 2015, value: 1626, note: "Manipuri as a subject, primary I-V, 22 schools, CLM 23.8(b)"}

 - field: policyHistory
   rows:
     - {year: 2015, description: "Tripura reported to the Commissioner for Linguistic Minorities a Three Language Formula offering Bengali, Kokborok, Bishnupriya Manipuri or Chakma as first language and Arabic, Hindi or Sanskrit as third"}
     - {year: 2015, description: "Tripura reported a Directorate of Kokborok and other minority languages, with a language advisory committee for every minority language, in place of a State Minorities Commission"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state choosing which"}
   [SOURCED ABSENCE: Chapter 23 names **no dated Tripura act, rule, order or circular** — the
   Directorate and the Advisory Committees are described as existing, without a date of
   establishment. I have not invented one.]
