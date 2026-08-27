### IN-AN|Andaman and Nicobar Islands (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented — and the most unusual of my seven units, because the UT has **no majority
language at all** and its formula begins from the mother tongue

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 31, Andaman and Nicobar Islands, pp. 109-114 (report text lines 5501-5738)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** Facts as at 2014-15; census
         figures Census-2001, not 2011.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's original
         `-layout` extraction wraps table cells onto the wrong line and mis-rows grids throughout
         this report, so every figure here was re-checked. **The Andaman and Nicobar chapter came
         through unchanged**: the §31.1 census table, all four §31.8-§31.11 stage tables, the
         §31.12(a) formula slots and the §31.12(b) combined uptake row read identically under
         `-table`. This chapter's grids are the best-behaved in the report.
   CHAPTER-NUMBERING WARNING, WHICH BIT THIS PROJECT ONCE ALREADY: **chapter 31 is Andaman and
         Nicobar Islands, not Kerala.** Kerala is chapter 33. The report's contents page extracts
         with misaligned columns and gives the wrong mapping; I worked from the chapter body.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not the UT's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement / fl.languagesOffered — THE FORMULA
   quote: "31.12 Three Language Formula / a. It has been informed that the following languages are taught under the Three Language Formula: / First Language:  Mother tongue / Second Language:  Hindi/English / Third language:  Sanskrit/Tamil/Telugu/Bengali"
   source: CLM 52nd Report (archive copy), §31.12(a), p. 112
   [Located by section NAME within lines 5501-5738. **Unique among my seven units: the First
   Language slot is not a list of languages but the words "Mother tongue".** The second slot is
   the UT's two official languages, and the third offers Sanskrit or one of three Indian regional
   languages. No language in this scheme is foreign.]

 - field: fl.languagesOffered — THE OFFICIAL LANGUAGES ARE BOTH "IMPORTED"
   quote: "31.3 Official Language: The Official Languages of the UT are Hindi and English"
   source: CLM 52nd Report (archive copy), §31.3, p. 109
   [Hindi is the mother tongue of 18.23 per cent of the population and English of a negligible
   share; **neither is the language of the largest group.** This is why the second-language slot
   is Hindi/English while the first is left open.]

 - field: fl.primaryRequirement — THERE IS NO MAJORITY LANGUAGE TO ARRIVE WITHOUT
   quote: "31.1 The Census-2001 registered the population of as 3,56,152 persons and its broad linguistic profile is as follows: / Bengali 91,582 25.71 / Hindi 64,933 18.23 / Tamil 62,961 17.68 / Telugu 45,631 12.81 / Malayalam 28,869 8.11 / Nicobarese 28,651 8.05 / Kurukh/Oraon 13,759 3.86 / Munda 4,582 1.29 / Kharia 4,090 1.15"
   source: CLM 52nd Report (archive copy), §31.1, p. 109
   [**This table extracts cleanly and is identical under `-table`** — nine rows, nine speaker
   counts, nine percentages, and I spot-checked the arithmetic (91,582/3,56,152 = 25.71% ✓; 28,651/3,56,152 = 8.04% ✓). The
   largest single language is Bengali at 25.71 per cent. Census-2001; never present as current.
   The sentence has a typo in the source itself — "the population of as 3,56,152" — which I
   reproduce rather than silently repair.]

 - field: fl.regionalMinorityLanguages — THE SENTENCE THAT DEFINES THE WHOLE CHAPTER
   quote: "It has been stated that no language is declared as a minority language in the UT."
   source: CLM 52nd Report (archive copy), §31.14(a), p. 112
   quote: "31.2 It has been stated that there is no district wherein the speakers of minority language constitute 15 per cent or more of its population."
   source: same, §31.2, p. 109
   [**These two together are the key finding.** §31.2 is arithmetically impossible on the face of
   §31.1 — Bengali alone is 25.71 per cent of the whole UT — unless you read it as the UT saying
   it recognises no minority languages at all, which is exactly what §31.14(a) says. So the
   Andamans run minority-language-medium schools in Bengali, Tamil and Telugu while formally
   declaring that it has no minority languages. That contradiction is the honest thing to record.]

 - field: fl.uptake — ALL SIX LANGUAGES COUNTED TOGETHER
   quote: "b. The details of the students covered under the Three Language Formula in classes VIII, X and XII as reported by the UT Administration are as follows: / Language class VIII class X class XII / English, Hindi, Tamil, Telugu, Bengali and Sanskrit  6,458  5,903  5,259"
   source: CLM 52nd Report (archive copy), §31.12(b), p. 112
   [The UT returned a **single combined row for all six languages**, not a per-language breakdown.
   The three numbers are unambiguous. Note this also tells us which six languages are actually in
   play: English, Hindi, Tamil, Telugu, Bengali and Sanskrit. Malayalam, Nicobarese, Kurukh,
   Munda and Kharia are not among them.]

 - field: fl.regionalMinorityLanguages — THE LANGUAGES THAT GET NOTHING
   [**Nicobarese, with 28,651 speakers and 8.05 per cent of the UT at Census-2001, appears nowhere
   in Chapter 31 outside the census table.** Nor do Kurukh/Oraon (13,759), Munda (4,582), Kharia
   (4,090) or Malayalam (28,869, 8.11 per cent — a larger share than Nicobarese). I read every one
   of §31.6 to §31.16 to confirm this. The only languages with any school provision are Bengali,
   Tamil and Telugu. The CLM's own first recommendation is directed at exactly this gap:]
   quote: "a. The UT Administration needs to appreciate the importance of minority and tribal languages spoken in the Islands. Therefore, the UT Administration is urged to initiate steps for the preservation and promotion of these languages."
   source: CLM 52nd Report (archive copy), Findings/Recommendations under §31.18, p. 113

 - field: fl.upperSecondary — MEDIUM YES, SUBJECT NO
   quote: "31.11 Higher Secondary Stage (XI to XII) / a. ... Language Schools Students Teachers Student-Teacher Ratio / Bengali 15 2,141 64 33.1 / Tamil 05 468 23 20.1 / Telugu 02 447 08 56.1"
   source: CLM 52nd Report (archive copy), §31.11(a), p. 112
   quote: "b. No information has been furnished on the facility for learning minority languages as a subject at the Higher Secondary stage of education."
   source: same, §31.11(b), p. 112
   [Alignment verified under `-table` and unchanged. The ratio column is printed corrupt in the
   REPORT itself ("33.1", "20.1", "56.1" for what are evidently 33:1, 20:1, 56:1), which
   re-extraction confirms, and I do not report it as a number. The same "no information ... as
   a subject" answer is given at §31.8(b), §31.9(b) and §31.10(b) — **the UT reported minority
   languages as a MEDIUM at every stage and as a SUBJECT at none.**]

 - field: fl.teacherSupply — NOTHING WAS SUPPLIED
   quote: "31.13 Teachers for Minority Languages / a. No information has been provided about the sanctioned filled up strength of the teachers for the minority languages. / b. No information has been provided about the arrangement regarding the training facility for minority language teachers in the UT."
   source: CLM 52nd Report (archive copy), §31.13, p. 112
   [A flat double negative. Teacher COUNTS do appear in the stage tables (§31.8a to §31.11a) —
   376, 125, 80 at primary and so on — but those are staff in post by medium, not sanctioned or
   filled posts, and the chapter gives no sanctioned figure anywhere.]

 - field: fl.teacherSupply / fl.uptake — THE TREND THE CLM ITSELF DREW
   quote: "e. A significant reduction in the number of Schools and Teachers for teaching Bengali, Tamil and Telugu as compared to the data provided for the 50th Report of the CLM."
   source: CLM 52nd Report (archive copy), Findings/Recommendations under §31.18, p. 113
   [**A directional finding straight from the CLM**, and the only one of its kind in my seven
   chapters. The Andamans' minority-language school and teacher numbers FELL between the 50th
   Report and this one. The CLM does not give the earlier figures, so the direction is reportable
   and the magnitude is not.]

 - field: fl.regionalMinorityLanguages — NO MACHINERY OF ANY KIND
   quote: "31.16 Promotion and Development of Minority Languages / No information has been furnished about the scheme for the promotion and development of minority languages in the UT. Moreover, no academy has been established for the promotion and no information on the development of the languages has been furnished."
   source: CLM 52nd Report (archive copy), §31.16, p. 113
   quote: "31.15 ... No information has been furnished about the maintenance of `Language Preference Registers' to record the preferences of the linguistic minority students in the Primary and Secondary schools."
   source: same, §31.15, p. 112
   quote: "31.17 Machinery for the Implementation of Safeguards / No information has been provided with respect to the machinery for the implementation of safeguards."
   source: same, §31.17, p. 113

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [NCF 2023 postdates the CLM return by eight years; I have not established the UT's adoption.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - As reported to the Commissioner for Linguistic Minorities, 2014-15
     - No majority language exists: largest is Bengali at 25.71 pct, Census-2001
     - Three Language Formula names the mother tongue itself as the First Language
     - Second Language is Hindi or English, the UT's two official languages

 - field: fl.secondaryRequirement
   bullets:
     - Third Language chosen from Sanskrit, Tamil, Telugu or Bengali, all Indian
     - No language in the UT's scheme is presented as a foreign language
     - 5,903 students covered by the formula at class X, all six languages combined
     - No information furnished on minority languages taught as a subject at IX-X

 - field: fl.upperSecondary
   bullets:
     - Bengali, Tamil and Telugu medium schools continue to XI-XII, 22 schools in all
     - 5,259 students covered by the formula at class XII, all six languages combined
     - No information furnished on minority languages as a subject at XI-XII
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - Six languages in play: English, Hindi, Tamil, Telugu, Bengali and Sanskrit
     - Hindi and English are the UT's official languages, neither the largest mother tongue
     - Nicobarese, at 8.05 pct of the population, appears in no school provision at all
     - Malayalam, Kurukh, Munda and Kharia likewise have no provision of any kind

 - field: fl.regionalMinorityLanguages
   bullets:
     - The UT told the CLM that no language is declared a minority language there
     - It also reported no district with 15 pct minority speakers, though Bengali is 25.71 pct
     - Provision exists in Bengali, Tamil and Telugu medium despite that declaration
     - No academy, no promotion scheme and no monitoring machinery reported

 - field: fl.teacherSupply
   bullets:
     - CLM found schools and teachers for Bengali, Tamil and Telugu had fallen since its 50th Report
     - No information provided on sanctioned or filled minority-language teacher posts
     - No information provided on any training facility for minority language teachers
     - Teachers in post by medium at primary: 376 Bengali, 125 Tamil, 80 Telugu

 - field: fl.uptake
   series (each row note: "students covered by the Three Language Formula, all six languages
   combined as the UT returned them, as reported to the CLM, 2014-15"):
     - {year: 2015, value: 6458, note: "class VIII, English, Hindi, Tamil, Telugu, Bengali and Sanskrit together, CLM 31.12(b)"}
     - {year: 2015, value: 5903, note: "class X, same six languages together, CLM 31.12(b)"}
     - {year: 2015, value: 5259, note: "class XII, same six languages together, CLM 31.12(b)"}
   [The UT gave no per-language breakdown. Do not split these.]

 - field: policyHistory
   rows:
     - {year: 2015, description: "Andaman and Nicobar Islands administration told the Commissioner for Linguistic Minorities that no language is declared as a minority language in the UT"}
     - {year: 2015, description: "Commissioner recorded a significant reduction in schools and teachers for Bengali, Tamil and Telugu compared with the data supplied for his 50th Report"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state or UT choosing which"}
   [SOURCED ABSENCE: Chapter 31 names **no dated instrument of the UT administration whatsoever**
   — no regulation, no order, no circular. Nine separate heads record that no information was
   furnished (§31.4a, §31.4b, §31.5a, §31.5b, §31.5c, §31.6, §31.7, §31.13, §31.15, §31.16,
   §31.17, §31.18). There is nothing further to put in this timeline.]
