### IN-TN|Tamil Nadu (India) — map `eal` (Majority language acquisition)
STATUS: documented

TERMINOLOGY NOTE (per the brief): the school language in Tamil Nadu is **Tamil**, and English is
India's associate official language and a widespread medium of instruction, not a foreign
language. "EAL" is not the term in play and is not used below. Neither source names any
newcomer, induction or additional-language designation for a child who arrives without Tamil.
What Tamil Nadu has instead is (a) minority-language-medium schooling, and (b) a statutory
obligation to learn Tamil as a subject regardless of medium.

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 36, Tamil Nadu, pp. 132-143"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — connection to the live Government of India host timed out from this machine.
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** All facts are the position
         as reported to the CLM for 2014-15; all census figures are Census-2001.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` as a second opinion. The project's original `-layout`
         extraction wraps table cells onto the wrong line and mis-rows every grid in this report.
         Corrections made on re-extraction are flagged inline.
 - label: "The Tamil Nadu Tamil Learning Act, 2006 (Tamil Nadu Act 13 of 2006) — s.2(e), s.3, s.5"
   url: https://prsindia.org/files/bills_acts/acts_states/tamil-nadu/2006/2006TN13.pdf
   http: 200 (190,479 bytes, md5 29c0432c9762025de55fe1c83a4567e6)
   tier: official-document (OCR'd Gazette scan redistributed by PRS Legislative Research)
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2 (R1 and medium of instruction)"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes)
   tier: official-document — NATIONAL, not Tamil Nadu's own rule

EVIDENCE:

 - field: eal.l1Support / eal.bilingualEducationNotes — MEDIUM OF INSTRUCTION IS THE PROVISION
   quote: "36.8 Primary Stage (Class I to V) / a. Details of the facility for using minority languages as a medium of instruction at the Primary stage of education are as under: / Language Schools Students Teachers / Urdu 230 22,670 604 / Telugu 391 12,048 786 / Malayalam 29 962 70 / Kannada 47 2,403 91 / Hindi 3 599 9 / Gujarati 2 76 2"
   source: CLM 52nd Report (archive copy), §36.8(a), p. 136
   [Column alignment verified row by row against the raw layout. This is the concrete answer to
   "what happens to a child who arrives without Tamil" at primary stage: in six languages, there
   are schools that teach *in* the child's language.]

 - field: eal.l1Support — IT CONTINUES THROUGH SECONDARY AND HIGHER SECONDARY
   quote: "36.10 Secondary Stage (IX to X) / a. ... Language Schools Students Teachers Student-Teacher Ratio / Urdu 26 5,364 101 53:1 / Telugu 60 5,432 395 14:1 / Malayalam 58 1,297 97 14:1 / Kannada 7 1,004 36 28:1 / Hindi 7 1,007 16 63:1 / Gujarati 2 272 6 45:1 / Arabic 3 714 16 45:1"
   source: CLM 52nd Report (archive copy), §36.10(a), p. 137
   quote: "36.11 Higher Secondary Stage (XI to XII) / a. ... Urdu 18 3,252 46 70.1 / Telugu 12 4,617 62 74.1 / Malayalam 19 1,751 25 70.1 / Kannada 3 766 12 63.1 / Arabic 2 311 8 39.1"
   source: same, §36.11(a), p. 138
   [Both tables re-verified against `pdftotext -table` and unchanged from what I first read —
   §36.10(a) and §36.11(a) are among the minority of grids in this report that `-layout` handled
   correctly. The ratio column in §36.11(a) is printed in the corrupted "70.1" form for what is
   evidently 70:1 and I do not present it as a number. **Note the shape of the provision:
   minority-language medium narrows sharply with stage** — 230 Urdu-medium primary schools become
   26 at IX-X and 18 at XI-XII; Gujarati and Hindi medium disappear entirely after X.]

 - field: eal.l1Support — THE STATUTORY OBLIGATION THAT SITS ON TOP OF IT
   quote: "3. (1) Tamil shall be taught as a subject in standards I to X in all schools, in a phased manner, commencing from the academic year 2006-2007 for standard I"
   source: Tamil Nadu Tamil Learning Act 2006, s.3(1)
   [So a Telugu- or Urdu-medium pupil still takes Tamil as a Part-I compulsory subject. The Act
   does not create any graduated, beginner or second-language Tamil syllabus for such pupils, and
   I searched the Act for one: its only relief mechanism is the blanket exemption power at s.5.]

 - field: eal.l1Support — THE ONLY RELIEF MECHANISM IN THE ACT
   quote: "5. The Government may, subject to such conditions as they deem fit, by general or special order, exempt any class or category of student or students from all or any of the provisions of this Act either in part or in whole."
   source: Tamil Nadu Tamil Learning Act 2006, s.5
   [This is a discretionary executive exemption, not an entitlement, and the Act attaches no
   criteria to it. It is the nearest thing in Tamil Nadu law to a newcomer provision.]

 - field: eal.l1Support — HOW THAT PLAYS OUT FOR ARRIVING PUPILS
   quote: "They also referred to the previous visit and the meetings held with the Government of Tamil Nadu with regard to the implementation of the Tamil Learning Act, 2006 and the relief given by the Hon'ble Madras High Court in the matter for 7,000 linguistic minorities' students from writing the Part-I Tamil during the current Academic Year."
   source: CLM 52nd Report (archive copy), §36.19, p. 141
   quote: "It has also been stated that the children of migrant parents could not learn Tamil in the middle of their academic stream unless otherwise they have already studied it previously and it may not be required once they move out of Tamil Nadu."
   source: same, §36.23, p. 142
   [The second quote is a representation by the Linguistic Minority Education Forum recorded by
   the CLM, not the CLM's own finding, and any bullet keeps that attribution. I have not read the
   Madras High Court order and the CLM does not name it.]

 - field: eal.bilingualEducationNotes — HOW A CHILD'S LANGUAGE IS IDENTIFIED
   quote: "36.15 Maintenance of `Language Preference Registers' in Schools / It has been stated that the `Language Preference Registers' are being maintained in 470 Primary Schools, 63 Upper Primary Schools, 163 Secondary, 54 Higher Secondary Schools."
   source: CLM 52nd Report (archive copy), §36.15, p. 139
   quote: "a. To introduce necessary columns in the Application Forms for admission in the schools to elicit the mother tongue; first language preferred; and the third language preferred by the parent at the time of admission so as to ensure that the children belonging to the linguistic minority groups are provided adequate facilities to learn their respective mother tongues."
   source: same, §36.25(a), p. 142
   [The second is a CLM RECOMMENDATION, i.e. the CLM asking Tamil Nadu to start collecting mother
   tongue at admission — evidence that as at 2014-15 it was **not** being collected on admission
   forms. That is a meaningful negative for this field.]

 - field: eal.bilingualEducationNotes — TEXTBOOKS AND MATERIALS
   quote: "a. It has been stated that the textbooks in minority language and other teaching materials are available to linguistic minority students at the beginning of the academic session. Tamil Nadu Textbook Corporation, Educational Services Corporation printed and supplied minority language textbooks"
   source: CLM 52nd Report (archive copy), §36.14(a), p. 139
   quote: "b. It has been informed that minority language books are supplied to the Government and Government aided schools free of cost. Sale copies are supplied to the students of private schools at affordable rates."
   source: same, §36.14(b), p. 139

 - field: eal.l1Support — THE CONSTITUTIONAL HOOK THE CLM INVOKES
   quote: "urged to ensure that the primary education be provided in the mother tongue of the children belonging to the minority language groups in the State. Further, attention of the Government of Tamil Nadu is invited to the deliberations and the Resolution adopted in the Chief Ministers' Conference, 1961 that the right of linguistic minorities to have instruction in their mother tongue at the Primary stage of education was reaffirmed. This had indeed received constitutional recognition from Article 350A"
   source: CLM 52nd Report (archive copy), §36.22, pp. 141-142

 - field: eal.l1Support (NATIONAL BACKDROP, not Tamil Nadu's own rule)
   quote: "R1 should preferably be the Language most familiar to the students, which would be the mother tongue. If that is not possible because of practical considerations, then it should be the state Language, which would be the second most familiar Language. Also, since it is in R1 that literacy is first attained, it must be used as the medium of instruction (MoI) for other subjects, at least until literacy in another language is attained."
   source: NCF 2023, §2.2, p. 219
   quote: "if (because of practical considerations) the mother tongue cannot be R1, then the most familiar local language may be used as R1."
   source: NCF 2023, §2.2 bullet, p. 219
   [NATIONAL. Postdates the CLM report by eight years. I found no source in this session showing
   Tamil Nadu's adoption of NCF 2023, and say so rather than implying it.]

 - field: eal — SOURCED ABSENCE
   [I read the whole of Chapter 36 (lines 6589-7242) and the whole Act. **Neither names any
   induction class, bridge course, sheltered instruction, language-support entitlement, or
   any designated category for a pupil who arrives without Tamil.** The provision is structural
   (minority-medium schools) and statutory-obligation-shaped (Tamil compulsory I-X), with a bare
   discretionary exemption power. This is a negative I have read for, not one I inferred.]

DRAFT BULLETS:

 - field: eal.l1Support
   bullets:
     - Position as reported to the Commissioner for Linguistic Minorities, 2014-15
     - No newcomer or additional-language designation exists, provision is medium-of-instruction
     - Minority-language-medium primary schools: 391 Telugu, 230 Urdu, 47 Kannada, 29 Malayalam
     - Tamil stays compulsory as a subject for these pupils, Tamil Learning Act 2006 s.3(1)
     - Only relief is a discretionary government exemption under s.5, no criteria attached

 - field: eal.bilingualEducationNotes
   bullets:
     - Minority-medium provision narrows by stage: 230 Urdu-medium schools at I-V, 18 at XI-XII
     - Gujarati and Hindi medium schools appear up to standard X only, none at XI-XII
     - Language Preference Registers kept in 470 primary and 163 secondary schools
     - CLM asked the state to add mother tongue to admission forms, so it was not collected

 - field: policyHistory
   rows:
     - {year: 1961, description: "Chief Ministers' Conference reaffirmed the right of linguistic minorities to instruction in the mother tongue at the primary stage, recognised in Article 350A, as recounted by the CLM"}
     - {year: 2006, description: "Tamil Nadu Tamil Learning Act 2006 made Tamil a compulsory subject in standards I to X in all schools including minority schools under Article 30(1), with the mother tongue only an optional Part-IV subject"}
     - {year: 2014, description: "Linguistic Minority Education Forum told the CLM that G.O. Ms. No. 145 of 18-09-2014 extended the pattern to CBSE schools, affecting children of migrant parents"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 set R1, the language of first literacy, as preferably the mother tongue and required it to be the medium of instruction until literacy in another language is attained"}
