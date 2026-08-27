### IN-TN|Tamil Nadu (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 36, Tamil Nadu, pp. 132-143 (report text lines 6589-7242)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443 after 21272 ms`.
         The live Government of India host is unreachable from this machine.
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot dated 7 July 2025)
   tier: official-document — **read via the Internet Archive copy, which is what every citation
         below refers to.**
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`.** The original
         `-layout` extraction wraps table cells onto the wrong line and mis-rows every grid in
         this report. I re-extracted the same PDF with `pdftotext -table` (620,242 bytes) and
         with `pdftotext -lineprinter` (strict y-positions) as a second opinion, and every
         numeric table quoted below is taken from the `-table` output. Where `-layout` and
         `-table` disagreed I have corrected the file and flagged the correction inline.
         `-layout` is used only for continuous prose and for locating the chapter.
   NOTE ON DATES: every fact in this chapter is the position **as reported to the CLM for
         2014-15**, and every census figure in it is **Census-2001**, not 2011.
 - label: "The Tamil Nadu Tamil Learning Act, 2006 (Tamil Nadu Act 13 of 2006), assented 9 June 2006, published Tamil Nadu Government Gazette Extraordinary No. 1361, Part IV-Section 2, Chennai, Monday, 12 June 2006 — s.3"
   url: https://prsindia.org/files/bills_acts/acts_states/tamil-nadu/2006/2006TN13.pdf
   http: 200 (190,479 bytes; md5 29c0432c9762025de55fe1c83a4567e6, identical to the local copy
         at `inscout/states/tn_act_prs.pdf`). Verified live in this session with a browser
         user-agent and a Google referer; `url_effective` unchanged, no landing-page redirect.
   tier: official-document — this is a scan of the Gazette text, redistributed by PRS
         Legislative Research's state-acts archive. The scan is OCR'd and has visible OCR
         corruption ("3s an optional subject" for "as an optional subject"); quotes below are
         given as they extract, with corruption marked.
 - label: "NCERT, National Curriculum Framework for School Education 2023 (August 2023) — §2.2, Box 2.2i (R1/R2/R3) and §2.1 (Secondary Stage design)"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes; md5 dfbe8821b8881c39da72e96a12b01fda). First attempt returned
         `curl: (35) Recv failure: Connection was reset`; two subsequent attempts both 200.
         The `www.` is required — `https://ncert.nic.in/...` fails.
   tier: official-document
   NOTE: NCF 2023 is the **national** frame. Bullets drawn from it are marked NATIONAL.

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement — THE HEADLINE NEGATIVE
   quote: "36.12 Three Language Formula / a. It has been stated that Two Language formula is followed in the State. / The details are as follows: / 1. First Language:  Tamil / Mother tongue / 2. Second Language:  English / b. It has also been stated that those, who wish to study their own language, would have to study the Third Language as an additional language."
   source: CLM 52nd Report (archive copy), §36.12, p. 138
   [Verified by reading the chapter body, not the contents page. The section is headed "Three
   Language Formula" — the standard heading used in every state chapter — and its entire content
   is a statement that Tamil Nadu does **not** follow it. Tamil Nadu is the only one of my seven
   units that rejects the formula.]

 - field: fl.secondaryRequirement — THE CLM'S OWN GLOSS ON THE CONSEQUENCE
   quote: "Since the \"Two Language Formula\" is being followed in the State of Tamil Nadu, there has been problem in introduction of the State Official Language and the mother tongue of the linguistic minorities."
   source: CLM 52nd Report (archive copy), §36.24, p. 142

 - field: fl.primaryRequirement / policyHistory — THE STATUTE
   quote: "3. (1) Tamil shall be taught as a subject in standards I to X in all schools, in a phased manner, commencing from the academic year 2006-2007 for standard I, from the academil: year 2007-2008 for standards I and II and shall,be extended upto X standard in a like manner."
   source: Tamil Nadu Tamil Learning Act 2006, s.3(1) — PRS scan, p. 3 of the PDF.
   ["academil:" is OCR corruption of "academic". Otherwise the sentence extracts cleanly.]

 - field: fl.languagesOffered / fl.primaryRequirement — THE FOUR-PART PATTERN
   quote: "(2) For the purpose of sub-section (I), the pattern of education shall be as follows:-- / Part -I  Tamil (Compulsory) / Part -11  English (Compulsory) / Part -111  Other Subjects (Mathematics, Science, Social Science, etc.) / Part -IV  Students who do not have either Tamil or English as their mother tongue can study their mother tongue 3s an optional subject."
   source: Tamil Nadu Tamil Learning Act 2006, s.3(2)
   ["Part -11" / "Part -111" are OCR of "Part-II" / "Part-III"; "3s" is OCR of "as". This is the
   statutory basis for the CLM's "Two Language formula": Parts I and II are the two compulsory
   languages, and the mother tongue sits in Part IV as an **option**, not a requirement.]

 - field: fl.primaryRequirement — THE ACT BINDS MINORITY SCHOOLS TOO
   quote: "(ii) any Primary School, Middle School, High School or Higher Secondary School established and administered or maintained by any private educational agency including minority school established and administered under clause (1) of Article 30 of the Constitution, whether receiving aid out of the State fund or not"
   source: Tamil Nadu Tamil Learning Act 2006, s.2(e)(ii); s.2(e)(iii) repeats the same
   inclusion for "any Nursery and Primary School, Matriculation School, Anglo-Indian School or
   Oriental School including minority school established and administered under clause (1) of
   Article 30".

 - field: fl.secondaryRequirement / policyHistory — CONTESTED EXTENSION TO CBSE SCHOOLS
   quote: "36.23 Another adverse effect of the Act was the extension of the system to CBSE Schools, which have been hitherto following the \"Three Language Formula\". It has been stated by the Linguistic Minority Education Forum that GO Ms. No.145, dated 18-09-2014 would affect education of children of migrant parents"
   source: CLM 52nd Report (archive copy), §36.23, p. 142
   [ATTRIBUTION MATTERS: the CLM is reporting a representation made to it by the Linguistic
   Minority Education Forum, not a finding of its own about the G.O.'s content. I have NOT read
   G.O. Ms. No. 145 of 18-09-2014 itself. Any bullet must carry that attribution.]

 - field: fl.primaryRequirement — LITIGATION OVER THE ACT
   quote: "They also referred to the previous visit and the meetings held with the Government of Tamil Nadu with regard to the implementation of the Tamil Learning Act, 2006 and the relief given by the Hon'ble Madras High Court in the matter for 7,000 linguistic minorities' students from writing the Part-I Tamil during the current Academic Year."
   source: CLM 52nd Report (archive copy), §36.19, p. 141
   [The CLM does not name the case or give its date. I have not read the judgment. Reportable
   only as "the CLM records relief granted by the Madras High Court", never as a citation.]

 - field: fl.regionalMinorityLanguages — WHAT THE OPTION IS WORTH, PER THOSE USING IT
   quote: "36.20 The Members of the Linguistic Minorities Forum of Tamil Nadu brought to the notice of the CLM that under the Act no provision is given for learning the mother tongue in the syllabus but an option. Without teaching the mother tongue the subjects cannot be taught in the medium of mother tongue. The option of choosing the medium of instruction in mother tongue is only illusionary and nonexistent, if there is no qualifying examination and the optional subject not included in the Mark Sheet"
   source: CLM 52nd Report (archive copy), §36.20, p. 141

 - field: fl.languagesOffered / fl.regionalMinorityLanguages — WHICH LANGUAGES, PRIMARY STAGE
   quote: "36.8 Primary Stage (Class I to V) ... b. Details of the facility for learning minority language(s) as a subject at Primary stage are as under: / Language Schools Students Teachers / Urdu 170 18,388 418 / Telugu 276 7,861 421 / Kannada 15 533 29 / Malayalam 29 989 72 / Hindi 3 219 9"
   source: CLM 52nd Report (archive copy), §36.8(b), p. 137
   [These five rows extract with clean column alignment and I have checked each figure against
   the raw layout. Note Hindi appears here as a **minority language taught as a subject**, not as
   a third-language requirement.]

 - field: fl.languagesOffered — THE FULL SET NAMED ANYWHERE IN THE CHAPTER
   quote: "Language Schools / Urdu 276 / Telugu 458 / Malayalam 39 / Kannada 56 / Hindi 3 / Gujarathi 2 / Sourashtra 1" (recognised linguistic-minority primary schools, §36.6(d)); Arabic appears additionally at §36.10(a) and §36.11(a).
   source: CLM 52nd Report (archive copy), §36.6(d) p. 135 and §36.10-36.11 pp. 137-138
   [Eight languages in total across the chapter: Urdu, Telugu, Malayalam, Kannada, Hindi,
   Gujarati/Gujarathi, Sourashtra, Arabic. All except Arabic are Indian languages, so the
   "additional language" in Tamil Nadu is overwhelmingly another Indian language — the brief's
   framing point holds even though the state rejects the Three Language Formula.]

 - field: fl.uptake — SUBJECT-LEARNING COUNTS BY STAGE, 2014-15 (`-table` EXTRACTION)
   quote: Primary (I-V), minority language as a SUBJECT: "Language Schools Students Teachers / Urdu 170 18,388 418 / Telugu 276 7,861 421 / Kannada 15 533 29 / Malayalam 29 989 72 / Hindi 3 219 9" (§36.8b).
   quote: Higher Secondary (XI-XII), minority language as a SUBJECT: "Language Schools Students Teachers Student-Teacher Ratio / Gujarati 6 569 8 71.1 / Arabic 5 459 11 42.1 / Malayalam 2 368 6 61.1 / Hindi 7 603 9 67.1 / Telugu 5 514 8 64.1 / Urdu 3 148 3 50.1" (§36.11b).
   quote: Secondary (IX-X), minority language as a SUBJECT: "Urdu 2 82 2 41.1 / Telugu 5 192 5 38.1 / Malayalam 2 191 7 27.1 / Hindi 8 819 14 58.1 / Gujarati 7 819 15 55.1 / Arabic 5 796 18 44.1" (§36.10b).
   source: CLM 52nd Report (archive copy), §36.8(b), §36.10(b) and §36.11(b), `-table` extraction
   [**CORRECTED AFTER RE-EXTRACTION.** Under `-layout` the §36.11(b) teacher column had wrapped
   and read "Arabic 5 459 42.1", "Malayalam 2 368 11", "Urdu 3 148 8"; the true teacher counts
   are Arabic 11, Malayalam 6, Hindi 9, Telugu 8, Urdu 3. §36.10(b) was also mis-rowed under
   `-layout` (Telugu's student count appeared blank and a trailing column dangled); the true rows
   are as quoted. §36.8(b) was already correct. Two oddities survive in the `-table` output and
   are therefore in the SOURCE, not the extraction: §36.9(a) second table gives Hindi and Gujarati
   identical rows (10 / 1,685 / 24) and §36.10(b) gives Hindi and Gujarati the same student count
   (819). Every uptake row must carry the note "as reported to the CLM, 2014-15".]

 - field: fl.regionalMinorityLanguages — CENSUS PROFILE (`-table` EXTRACTION)
   quote: "36.1 The Census-2001 registered the population of Tamil Nadu as 6,24,05,679 persons and its broad linguistic profile is as follows: / Languages Speakers Percentage / Tamil 5,57,98,916 89.41 / Telugu 35,27,594 5.65 / Kannada 10,45,238 1.67 / Urdu 9,42,299 1.51 / Malayalam 5,57,705 0.89"
   source: CLM 52nd Report (archive copy), §36.1, p. 132, `-table` extraction
   [**The `-layout` extraction mis-rowed this table**, attaching 35,27,594 to Kannada and
   10,45,238 to Urdu. The `-table` reading above is the correct one and is internally consistent
   (35,27,594/6,24,05,679 = 5.65% ✓; 9,42,299/6,24,05,679 = 1.51% ✓). Census-2001, never present
   as current: Tamil 89.41 per cent, so roughly one Tamil Nadu resident in ten had another
   mother tongue at that count.]

 - field: fl.teacherSupply — SOURCED NEGATIVES
   quote: "b. It is stated that there is no arrangement for training of minority language teachers. / c. No collaboration is stated to be made with the neighbouring States for exchange of minority teachers."
   source: CLM 52nd Report (archive copy), §36.13(b)-(c), p. 139
 - field: fl.teacherSupply — THE CLM'S FINDING ON ADEQUACY
   quote: "b. Ensure adequate number of teachers for minority languages as the Student: Teacher ratio is very high in the case of minority language teachers."
   source: CLM 52nd Report (archive copy), §36.25(b), p. 142
 - field: fl.teacherSupply — SANCTIONED VERSUS FILLED, RECOVERED BY RE-EXTRACTION
   quote: "36.13 Teachers for Minority Languages / a. The details of the posts of teachers sanctioned and filled up to use/teach minority languages as a medium of instruction and as a subject are as follows: / Elementary School Education: / Language | Medium Sanctioned | Filled | Subject Sanctioned | Filled / Telugu 801 698 194 - / Malayalam 95 96 95 91 / Urdu 570 417 131 98 / Kannada 160 114 4 4 / Hindi 7 7 7 8 / Gujarati 2 2 2 2 / Arabic 0 0 27 23"
   source: CLM 52nd Report (archive copy), §36.13(a), p. 139, `-table` extraction
   quote: "Secondary School Education / Language | Medium Sanctioned | Filled | Subject Sanctioned | Filled / Telugu 394 332 26 24 / Malayalam 144 133 127 115 / Urdu 31 24 25 20 / Kannada 51 29 7 7 / Hindi 23 21 39 37 / Arabic 4 4 - -"
   source: same, `-table` extraction
   quote: "Higher Secondary Education / Language | Medium Sanctioned | Filled | Subject Sanctioned | Filled / Hindi 1 1 1 1 / Arabic 1 1 1 1"
   source: same, `-table` extraction
   [**THIS IS THE BIGGEST SINGLE CORRECTION IN MY SEVEN UNITS.** Under `-layout` this table was
   unreadable — labels detached from numbers, orphaned digits trailing below the last row — and I
   had reported no figures at all. The `-table` extraction resolves it completely and
   `-lineprinter` agrees. Two internal sanity checks pass: Telugu's 801 elementary medium posts
   sit sensibly against its 391 primary schools and 786 teachers in post at §36.8(a), and Telugu's
   394 secondary medium posts sit against the 395 teachers in post at §36.10(a). Three genuine
   oddities are in the SOURCE and I flag rather than smooth them: Malayalam shows 96 filled
   against 95 sanctioned at elementary, Hindi shows 8 filled against 7 sanctioned as a subject,
   and Arabic shows 0 sanctioned and 0 filled as a medium while showing 27 sanctioned and 23
   filled as a subject.]

 - field: policyHistory — DATED INSTRUMENTS NAMED IN THE CHAPTER
   quote: "36.18 a. It has been informed that Orders have been issued vide G.O. (Ms) No. 455 Public (Partition) Department dated 14.3.1961 to the effect that all important Government Notices, Rules, Electoral Rolls and Forms, etc. shall be published in the minority languages ... in the specified local areas where 20 per cent or more population of that area speak a language different from Tamil."
   source: CLM 52nd Report (archive copy), §36.18(a), p. 143
   quote: "a. It has been informed that according to Tamil Nadu Recognized Private Schools (Regulation) Act, 1973, Rules 1974 and Tamil Nadu Minorities School (Recognition and Payment of Grants) Rules 1977, the recognition is granted to linguistic minorities institutions."
   source: same, §36.6(a), p. 134
   quote: "b. It has also been informed that under the G.O. (Ms) No. 270 Higher Education (J1) Department dated 17-06-1998, the Government has issued Guidelines for conferring Linguistic Minority Status to the Educational Institutions."
   source: same, §36.6(b), p. 134
   quote: "a. It has been informed that according to the Tamil Nadu Recognized Private Schools (Regulation) Act, 1974 section 14A, after 01-06-1991, no aid is given to any new educational Institution."
   source: same, §36.7(a), p. 136
   quote: "Further, under the G.O. (Ms) No. 386, Higher Education (J1) Department dated 11.12.2006 and G.O. (Ms) No. 48 Higher Education (E1) Department dated 12-03-2007, the following conditions have also been laid down for conferment and extension of minority status"
   source: same, §36.6(c), p. 134
   quote: "The following Act of the Tamil Nadu Legislative Assembly received the assant of the Governor on the 9th June 2006"
   source: Tamil Nadu Tamil Learning Act 2006, Gazette preamble ("assant" is OCR of "assent")
   [The 1973/1974 dating is internally inconsistent in the source itself: §36.6(a) calls it the
   "Act, 1973, Rules 1974" and §36.7(a) calls the same statute the "Act, 1974". I record the
   inconsistency rather than picking one.]

 - field: fl (NATIONAL BACKDROP, not Tamil Nadu's own rule)
   quote: "R1: This is the language in which literacy is first acquired in school. ... R2: Any Language other than R1. / R3: Any Language other than R1 and R2. / Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India. The state or other relevant bodies would decide the choices of R1, R2, or R3 that would be given to students."
   source: NCF 2023, §2.2 and Box 2.2i, p. 219
   quote: "i. Study 3 Languages: R1, R2, R3, at least two of which are native to India."
   source: NCF 2023, §2.1, Grades 9 and 10
   quote: "1) 2 examinations in languages, at least one of which is native to India. These languages may or may not be continuations of R1, R2 or R3. For example, they may be a specialised literature class in R1, R2, R3 or a new Indian Language (such as Sanskrit or classical Tamil) and/or a foreign language."
   source: NCF 2023, Grades 11 and 12 board examination requirements
   [NCF 2023 postdates the CLM report by eight years. It states the national expectation of THREE
   languages; the CLM records Tamil Nadu as running TWO as at 2014-15. I have found no source in
   this session showing whether Tamil Nadu has adopted NCF 2023, and the bullets say so.]

 - field: fl.upperSecondary — SOURCED ABSENCE
   quote: §36.11 is headed "Higher Secondary Stage (XI to XII)" and contains only medium-of-
   instruction and subject tables for minority languages. §36.12 "Three Language Formula" states
   the two-language pattern without restricting it to any stage, and the Tamil Learning Act 2006
   s.3(1) binds only "standards I to X".
   source: CLM 52nd Report (archive copy), §36.11-36.12; Act 13 of 2006 s.3(1)
   [So: **neither source imposes a language requirement at XI-XII in Tamil Nadu.** That is a real,
   readable negative, not a gap in my searching. The statutory Tamil obligation stops at X.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - As reported to the Commissioner for Linguistic Minorities, 2014-15
     - Tamil Nadu runs a Two Language formula, rejecting the national Three Language Formula
     - First Language Tamil or mother tongue, Second Language English
     - Tamil Learning Act 2006 s.3(1): Tamil a compulsory subject in standards I to X
     - Act binds minority schools under Art. 30(1), aided or not, s.2(e)(ii)-(iii)

 - field: fl.secondaryRequirement
   bullets:
     - Two Language formula continues to standard X, no compulsory third language
     - Third language only for pupils choosing to study their own language additionally
     - Act 2006 Part-IV: mother tongue is an optional subject, not a syllabus requirement
     - Minority forum told CLM the option is "illusionary", no qualifying exam or mark sheet

 - field: fl.upperSecondary
   bullets:
     - Sourced absence, not a search gap: no XI-XII language rule in either source
     - Tamil Learning Act 2006 obligation stops at standard X
     - CLM chapter 36.11 gives XI-XII minority-language tables but sets no formula
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - Compulsory pair is Tamil and English, per Tamil Learning Act 2006 s.3(2)
     - Minority languages available: Urdu, Telugu, Malayalam, Kannada, Hindi, Gujarati
     - Sourashtra and Arabic also recognised, Arabic only from secondary stage upward
     - The additional language is almost always another Indian language, not a foreign one

 - field: fl.regionalMinorityLanguages
   bullets:
     - Position as reported to the CLM for 2014-15, on Census-2001 speaker shares
     - Urdu, Telugu, Malayalam and Kannada each 15 per cent plus in named taluks
     - Language Preference Registers kept in 470 primary and 63 upper primary schools
     - CLM: no state scheme to promote minority languages, Urdu Academy needs reviving

 - field: fl.teacherSupply
   bullets:
     - Posts as reported to the CLM, 2014-15; figures re-verified against pdftotext -table
     - Elementary medium posts: Telugu 801 sanctioned 698 filled, Urdu 570 and 417
     - Secondary medium posts: Telugu 394 sanctioned 332 filled, Malayalam 144 and 133
     - State told CLM there is no arrangement for training minority language teachers
     - CLM found the student-teacher ratio very high for minority language teachers

 - field: fl.uptake
   series (each row note: "as reported to the CLM, 2014-15; Census-2001 baseline"):
     - {year: 2015, value: 18388, note: "Urdu as a subject, primary I-V, 170 schools, CLM 36.8b"}
     - {year: 2015, value: 7861, note: "Telugu as a subject, primary I-V, 276 schools, CLM 36.8b"}
     - {year: 2015, value: 989, note: "Malayalam as a subject, primary I-V, 29 schools, CLM 36.8b"}
     - {year: 2015, value: 533, note: "Kannada as a subject, primary I-V, 15 schools, CLM 36.8b"}
   [Year 2015 because the reporting period closes 30 June 2015 and §36.6(d) is expressly "as on
   30 June 2015". Do not present these as current. All four values re-verified against
   `pdftotext -table`; §36.8(b) was one of the few tables `-layout` had already got right.]

 - field: policyHistory
   rows:
     - {year: 1961, description: "G.O. (Ms) No. 455 Public (Partition) Dept, 14.3.1961: notices and electoral rolls to be published in minority languages where 20 per cent or more speak them"}
     - {year: 1973, description: "Tamil Nadu Recognized Private Schools (Regulation) Act (Rules 1974), the route by which linguistic minority institutions are recognised"}
     - {year: 1977, description: "Tamil Nadu Minorities School (Recognition and Payment of Grants) Rules"}
     - {year: 1991, description: "From 1 June 1991 no grant-in-aid to any new educational institution, s.14A"}
     - {year: 1998, description: "G.O. (Ms) No. 270 Higher Education (J1), 17-06-1998: guidelines for conferring linguistic minority status, Government the competent authority"}
     - {year: 2006, description: "Tamil Nadu Tamil Learning Act 2006 (Act 13 of 2006), assented 9 June 2006: Tamil compulsory in standards I to X, phased from 2006-2007, mother tongue optional in Part-IV"}
     - {year: 2006, description: "G.O. (Ms) No. 386 Higher Education (J1), 11.12.2006: conditions for conferment and extension of minority status"}
     - {year: 2007, description: "G.O. (Ms) No. 48 Higher Education (E1), 12-03-2007: five-year minority status, annual inspection"}
     - {year: 2012, description: "State Minorities Commission reconstituted 28-12-2012; chairman and six members took charge 1-1-2013"}
     - {year: 2014, description: "Linguistic Minority Education Forum told the CLM that G.O. Ms. No. 145 of 18-09-2014 extended the two-language pattern to CBSE schools in the state"}
   [The 2014 row is a representation recorded by the CLM, not a CLM finding, and its wording keeps
   that attribution. I did not read G.O. Ms. No. 145 itself.]
