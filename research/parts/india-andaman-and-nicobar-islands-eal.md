### IN-AN|Andaman and Nicobar Islands (India) — map `eal` (Majority language acquisition)
STATUS: documented — with the caveat that this is the one unit where the question "what happens to
a child who arrives without the school language?" has no straightforward answer, because there is
no majority language

TERMINOLOGY NOTE (per the brief): the UT's official languages are **Hindi and English**, and
neither is the mother tongue of the largest group (Bengali, 25.71 per cent at Census-2001). "EAL"
is not the term in play and is not used below. The UT names no newcomer, induction or
additional-language designation — indeed it told the CLM it recognises no minority languages at
all, while running minority-language-medium schools.

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 31, Andaman and Nicobar Islands, pp. 109-114"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — the live Government of India host is unreachable from this machine
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** Facts as at 2014-15; census
         figures Census-2001.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's original
         `-layout` extraction wraps table cells onto the wrong line and mis-rows grids throughout
         this report, so every figure here was re-checked. **The Andaman and Nicobar chapter came
         through unchanged**: the §31.1 census table, all four §31.8-§31.11 stage tables, the
         §31.12(a) formula slots and the §31.12(b) combined uptake row read identically under
         `-table`. This chapter's grids are the best-behaved in the report.
   CHAPTER-NUMBERING WARNING: **chapter 31 is Andaman and Nicobar Islands, not Kerala** (Kerala is
         chapter 33). The report's contents page extracts misaligned and gives the wrong mapping.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2 (R1 and medium of instruction)"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes)
   tier: official-document — NATIONAL, not the UT's own rule

EVIDENCE:

 - field: eal.l1Support — THE STARTING POSITION: NO MAJORITY LANGUAGE
   quote: "31.1 The Census-2001 registered the population of as 3,56,152 persons and its broad linguistic profile is as follows: / Bengali 91,582 25.71 / Hindi 64,933 18.23 / Tamil 62,961 17.68 / Telugu 45,631 12.81 / Malayalam 28,869 8.11 / Nicobarese 28,651 8.05 / Kurukh/Oraon 13,759 3.86 / Munda 4,582 1.29 / Kharia 4,090 1.15"
   source: CLM 52nd Report (archive copy), §31.1, p. 109
   quote: "31.3 Official Language: The Official Languages of the UT are Hindi and English"
   source: same, §31.3, p. 109
   [Table extracts cleanly, is identical under `-table`, and I spot-checked the arithmetic.
   **No language reaches 26 per cent.**
   The UT is a settlement society: Bengali, Tamil, Telugu and Malayalam speakers together are 64
   per cent, and the indigenous Nicobarese are 8.05 per cent. Census-2001 — never present as
   current.]

 - field: eal.l1Support — THE FORMULA STARTS FROM THE CHILD, NOT THE STATE
   quote: "First Language:  Mother tongue / Second Language:  Hindi/English / Third language:  Sanskrit/Tamil/Telugu/Bengali"
   source: CLM 52nd Report (archive copy), §31.12(a), p. 112
   [**Unique among my seven units.** Where Tamil Nadu, Karnataka, Gujarat and Tripura name
   specific languages in the first slot, the Andamans write "Mother tongue". In a UT with no
   majority language that is the only formulation that works — but note it is a statement of
   principle in a questionnaire reply, and the actual provision reaches only three languages.]

 - field: eal.l1Support / eal.bilingualEducationNotes — WHAT IS ACTUALLY PROVIDED
   quote: "31.8 Primary Stage (Class I to V) / a. Details of the facility for learning the minority languages as a medium of instruction at the Primary stage of education are as follows: / Language Schools Students Teachers Student-Teacher Ratio / Bengali 75 4,458 376 12.1 / Tamil 11 346 125 3.1 / Telugu 8 506 80 6.1"
   source: CLM 52nd Report (archive copy), §31.8(a), p. 110
   quote: "31.9 Upper Primary Stage (VI to VIII) / a. ... Bengali 25 3,368 150 22.1 / Tamil 03 403 35 12.1 / Telugu 02 445 18 15.1"
   source: same, §31.9(a), p. 111
   quote: "31.10 Secondary Stage (IX to X) / a. ... Bengali 11 2,295 96 24.1 / Tamil 09 448 82 5.1 / Telugu 04 391 38 10.1"
   source: same, §31.10(a), p. 111
   quote: "31.11 Higher Secondary Stage (XI to XII) / a. ... Bengali 15 2,141 64 33.1 / Tamil 05 468 23 20.1 / Telugu 02 447 08 56.1"
   source: same, §31.11(a), p. 112
   [**All four tables extract with clean alignment and are identical under `pdftotext -table`** —
   three rows each, four numeric columns each, no orphans. This is the best-behaved stage data of
   my seven units. The ratio column is printed corrupt in the REPORT itself ("12.1" for 12:1 etc.),
   which re-extraction confirms, and I do not report it as a number. **The Andamans are the only one of
   my seven units where minority-language medium runs unbroken from class I to class XII.**]

 - field: eal.bilingualEducationNotes — MEDIUM AT EVERY STAGE, SUBJECT AT NONE
   quote: "b. Information has not been furnished about the facility for minority languages being taught as a subject at the Primary stage of education."
   source: CLM 52nd Report (archive copy), §31.8(b), p. 111
   quote: "b. No information has been furnished about the facility for teaching minority languages as a subject at the Upper Primary stage of education."
   source: same, §31.9(b), p. 111
   quote: "b. No information has been furnished on the minority languages being taught as a subject at the Secondary stage of education."
   source: same, §31.10(b), p. 111
   quote: "b. No information has been furnished on the facility for learning minority languages as a subject at the Higher Secondary stage of education."
   source: same, §31.11(b), p. 112
   [Four stages, four "no information" answers to the subject question, against four fully
   populated medium tables. Whether that means no subject teaching exists or simply was not
   reported cannot be told from this source, and I do not guess.]

 - field: eal.l1Support — THE DECLARATION THAT UNDERCUTS ALL OF IT
   quote: "It has been stated that no language is declared as a minority language in the UT."
   source: CLM 52nd Report (archive copy), §31.14(a), p. 112
   quote: "31.2 It has been stated that there is no district wherein the speakers of minority language constitute 15 per cent or more of its population."
   source: same, §31.2, p. 109
   [**Read together, and against §31.1, these are self-contradictory on their face**: Bengali is
   25.71 per cent of the entire UT. The only coherent reading is that the UT declines to designate
   any language as a minority language, which makes §31.2 true by definition and leaves the
   Bengali-, Tamil- and Telugu-medium schools operating without a formal minority-language
   designation behind them. I record the contradiction; I do not resolve it.]

 - field: eal.l1Support — THE INDIGENOUS LANGUAGES GET NOTHING
   [**Nicobarese (28,651 speakers, 8.05 per cent), Kurukh/Oraon (13,759), Munda (4,582) and Kharia
   (4,090) appear nowhere in Chapter 31 outside the census table**, and neither does Malayalam
   (28,869, 8.11 per cent — a larger share than Nicobarese). I read §31.6 to §31.16 to confirm.
   Provision exists in exactly three languages: Bengali, Tamil and Telugu. The CLM's own first
   recommendation targets this:]
   quote: "a. The UT Administration needs to appreciate the importance of minority and tribal languages spoken in the Islands. Therefore, the UT Administration is urged to initiate steps for the preservation and promotion of these languages."
   source: CLM 52nd Report (archive copy), Findings/Recommendations under §31.18, p. 113

 - field: eal.bilingualEducationNotes — AND THE PROVISION IS SHRINKING
   quote: "e. A significant reduction in the number of Schools and Teachers for teaching Bengali, Tamil and Telugu as compared to the data provided for the 50th Report of the CLM. The UT Administration is, therefore, urged to furnish detailed information on the educational facilities available at the Primary, Upper Primary, Secondary and Senior Secondary stages of education in the UT."
   source: CLM 52nd Report (archive copy), Findings/Recommendations, p. 113
   [The CLM's own comparison against its earlier report. Direction is reportable; magnitude is
   not, because the CLM does not restate the 50th Report's figures.]

 - field: eal.l1Support — NO IDENTIFICATION, NO MATERIALS, NO MACHINERY
   quote: "31.15 ... No information has been furnished about the maintenance of `Language Preference Registers' to record the preferences of the linguistic minority students in the Primary and Secondary schools."
   source: CLM 52nd Report (archive copy), §31.15, p. 112
   quote: "f. The UT Administration needs to ensure that `Language Preference Registers' to record the preferences of linguistic minority students are maintained in all the Primary schools in the UT to facilitate instruction in the mother tongue."
   source: same, Findings/Recommendations, p. 113
   quote: "b. No information has been provided as regards the agency responsible for the preparation, publication and procurement of textbooks in minority languages."
   source: same, §31.14(b), p. 112
   quote: "31.17 Machinery for the Implementation of Safeguards / No information has been provided with respect to the machinery for the implementation of safeguards."
   source: same, §31.17, p. 113

 - field: eal — NO NEWCOMER DESIGNATION, READ FOR
   [I read the whole of Chapter 31 (lines 5501-5738). It names **no** induction class, bridge
   course, transitional programme, language-support entitlement, or designated category for a
   pupil arriving without the school language, and **no dated instrument of the UT administration
   of any kind.** Twelve separate heads record that no information was furnished.]

 - field: eal.l1Support (NATIONAL BACKDROP, not the UT's own rule)
   quote: "R1 should preferably be the Language most familiar to the students, which would be the mother tongue. If that is not possible because of practical considerations, then it should be the state Language, which would be the second most familiar Language."
   source: NCF 2023, §2.2, p. 219
   quote: "An Indian language must be available for students as an option for the MoI through school education all the way up to Grade 12."
   source: NCF 2023, §2.2, p. 219
   [NATIONAL. The Andamans' Bengali/Tamil/Telugu medium provision, running class I to XII, is the
   only one of my seven units that already meets the second requirement. NCF 2023 postdates the
   CLM return by eight years and I have not established the UT's adoption of it.]

DRAFT BULLETS:

 - field: eal.l1Support
   bullets:
     - Position as reported to the CLM for 2014-15; no majority language exists here
     - Three Language Formula names the mother tongue itself as the First Language
     - Medium-of-instruction provision reaches only Bengali, Tamil and Telugu
     - Nicobarese and Malayalam, each about 8 pct of the UT, get no provision at all
     - UT told the CLM that no language is declared a minority language there

 - field: eal.bilingualEducationNotes
   bullets:
     - Minority-language medium runs unbroken from class I to class XII, unusual in India
     - Bengali medium: 75 schools at I-V, 25 at VI-VIII, 11 at IX-X, 15 at XI-XII
     - CLM found schools and teachers had fallen significantly since its 50th Report
     - No information furnished on Language Preference Registers or textbook agency

 - field: policyHistory
   rows:
     - {year: 2015, description: "Andaman and Nicobar Islands administration told the Commissioner for Linguistic Minorities that no language is declared as a minority language in the UT, while running Bengali, Tamil and Telugu medium schools from class I to class XII"}
     - {year: 2015, description: "Commissioner recorded a significant reduction in schools and teachers for Bengali, Tamil and Telugu compared with the data supplied for his 50th Report, and urged steps to preserve the islands' minority and tribal languages"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required an Indian language to be available as a medium of instruction all the way up to Grade 12"}
   [Chapter 31 names no dated UT instrument whatsoever. Nothing further to add from this source.]
