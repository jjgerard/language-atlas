### IN-MZ|Mizoram (India) — map `fl` (Foreign / additional languages in school)
STATUS: documented (thin — the state's reply to the CLM was incomplete on several heads and the
report says so repeatedly)

SOURCES:
 - label: "Commissioner for Linguistic Minorities, India — 52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, Government of India. Chapter 19, Mizoram, pp. 67-72 (report text lines 3489-3744)"
   url (LIVE ORIGIN, FAILING): https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: **000** — `curl: (28) Failed to connect to www.minorityaffairs.gov.in port 443`
   url (INTERNET ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (snapshot 7 July 2025)
   tier: official-document — **read via the Internet Archive copy.** All facts are as reported to
         the CLM for 2014-15; all census figures are Census-2001, not 2011.
   **EXTRACTION — ALL FIGURES IN THIS FILE RE-VERIFIED AGAINST `pdftotext -table`,** with
         `pdftotext -lineprinter` (strict y-positions) as a second opinion. The project's
         original `-layout` extraction wraps table cells onto the wrong line and mis-rows grids
         throughout this report. Every Mizoram stage table survived re-extraction unchanged; the
         teacher table did NOT and is corrected below.
 - label: "NCERT, National Curriculum Framework for School Education 2023 — §2.2, Box 2.2i"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (47,030,865 bytes, md5 dfbe8821b8881c39da72e96a12b01fda)
   tier: official-document — NATIONAL frame, not Mizoram's own rule

EVIDENCE:

 - field: fl.primaryRequirement / fl.secondaryRequirement / fl.languagesOffered
   quote: "19.13 Three Language Formula / The languages taught under the Three Language Formula are: / First Language:  Mizo / Second Language:  English / Third Language:  Hindi"
   source: CLM 52nd Report (archive copy), §19.13, p. 70
   [Located by the section NAME inside lines 3489-3744, not by assuming a number; in this chapter
   it is numbered 19.13.]

 - field: fl.languagesOffered — NONE OF THE THREE IS FOREIGN IN MIZORAM'S OWN TERMS
   quote: "19.2 Official Language: Mizo, English and Hindi are the Official Languages of the State."
   source: CLM 52nd Report (archive copy), §19.2, p. 67
   [This matters for the map's category rule: **all three languages of Mizoram's Three Language
   Formula are official languages of Mizoram.** The "third language" is Hindi, an Indian
   language and a state official language, and English is likewise official here. Neither should
   be recorded as a foreign language.]

 - field: fl.uptake — STUDENTS COVERED, WITH A CAUTION
   quote: "The number of students covered under three language formula in class VIII, class X and class XII is as under: / Language Class VIII Class X Class XII / Mizo 2,447 20,230 11,800 / English 2,447 20,230 11,800 / Hindi 2,447 20,230 11,800"
   source: CLM 52nd Report (archive copy), §19.13, p. 70
   [**RE-VERIFIED AGAINST `-table`: this table is genuine and the figures are exactly as above,
   including the class VIII column.** My earlier suspicion that 2,447 was an extraction artefact
   was wrong. Two observations still belong in the note. (1) The three rows are identical, which
   is consistent with the formula being universal — every student takes all three. (2) The class
   VIII figure, 2,447, is **exactly** the Bengali upper-primary medium-of-instruction figure at
   §19.10(a), and a class VIII cohort of 2,447 preceding a class X cohort of 20,230 is not
   credible. That inconsistency is now established to be **in the source's own return**, not in
   the extraction, so I report the class X and class XII figures and flag class VIII rather than
   suppressing it.]

 - field: fl.regionalMinorityLanguages — WHICH MINORITY LANGUAGES EXIST IN SCHOOLS
   quote: "b. It has been informed that 71 Bengali and 15 Nepali educational institutions have been recognized language-wise as on June 30, 2015."
   source: CLM 52nd Report (archive copy), §19.7(b), p. 68
   quote: "19.9 Primary Stage (Class I to V) / a. ... Language Schools Students Teachers Student-Teacher Ratio / Bengali 54 3,437 117 1.29 / Nepali 10 436 45 1.10"
   source: same, §19.9(a), p. 69
   quote: "19.10 Upper Primary Stage (VI to VIII) / a. ... Bengali 17 2,447 103 1.23 / Nepali 3 120 12 1.10"
   source: same, §19.10(a), p. 69
   [**Both tables re-verified against `-table`: Bengali 54 / 3,437 / 117 and Nepali 10 / 436 / 45
   at primary; Bengali 17 / 2,447 / 103 and Nepali 3 / 120 / 12 at upper primary.** Under
   `-layout` Nepali's 436 had wrapped to a line of its own; the re-extraction confirms it belongs
   to Nepali, as I had reasoned. The ratio column ("1.29", "1.10") is printed corrupt in the
   report itself and I do not report it. Only TWO minority languages
   appear anywhere in this chapter: Bengali and Nepali. Lakher, Pawi, Paite and Hmar all appear
   in the Census-2001 profile at §19.1 with more speakers than Nepali, and **none of them appears
   anywhere in the educational sections** — a sourced negative worth recording.]

 - field: fl.regionalMinorityLanguages — WHERE THE PROVISION STOPS
   quote: "19.11 Secondary Stage (IX to X) / a. ... Language Schools Students Teachers Student-Teacher Ratio / Bengali Nil - - - / Nepali 2 - - -"
   source: CLM 52nd Report (archive copy), §19.11(a), p. 70
   quote: "19.12 Higher Secondary Stage (XI to XII) / No information has been furnished regarding minority languages being taught as a subject and as the medium of instruction."
   source: same, §19.12, p. 70
   quote: "b. No information has been furnished on minority languages being taught as a subject at the Upper Primary stage."
   source: same, §19.10(b), p. 70
   quote: "19.9 b. ... Language Schools Students Teachers Student-Teacher Ratio / Nepali 2 - - -"
   source: same, §19.9(b), p. 69
   [So minority-language **subject** teaching in Mizoram amounts, in the state's own return, to
   two Nepali primary schools with no student, teacher or ratio figure supplied.]

 - field: fl.teacherSupply — THE SOURCED NEGATIVE IS THE USABLE PART
   quote: "b. There is said to be no arrangement for training of teachers for teaching of minority language as a medium of instruction and as a subject."
   source: CLM 52nd Report (archive copy), §19.14(b), p. 70
 - field: fl.teacherSupply — SANCTIONED VERSUS FILLED, RECOVERED BY RE-EXTRACTION
   quote: "19.14 ... a. The details of the posts of teachers sanctioned/filled up to teach minority language as a subject and as a medium of instruction are as follows: / Language | Medium Sanctioned | Filled | Subject Sanctioned | Filled / Nepali 50 50 Nepali Nepali / Bengali 10 10 Bengali Bengali"
   source: CLM 52nd Report (archive copy), §19.14(a), p. 70, `-table` extraction, confirmed
   independently by `-lineprinter`
   [**CORRECTED AFTER RE-EXTRACTION.** Under `-layout` this table was unreadable and I had
   reported no figures. Both strict extractors agree on the rows above: **Nepali 50 posts
   sanctioned and 50 filled; Bengali 10 sanctioned and 10 filled**, as a MEDIUM of instruction.
   The two "Subject" columns contain only the language names repeated, i.e. Mizoram supplied no
   subject-post figures at all.
   **AND I FLAG A REAL ODDITY IN THE SOURCE, WHICH IS NOT AN EXTRACTION ARTEFACT.** These
   numbers run opposite to every other figure in the chapter: Bengali has 54 primary and 17 upper
   primary schools with 117 and 103 teachers in post (§19.9a, §19.10a), while Nepali has 10 and 3
   schools with 45 and 12 teachers. Assigning 50 sanctioned posts to Nepali and 10 to Bengali
   contradicts that. My earlier guess had them the other way round, and the strict extraction
   says my guess was wrong — so I report what the source says and mark the inconsistency rather
   than "correcting" the state's return.]

 - field: fl.regionalMinorityLanguages — NO PROMOTION MACHINERY
   quote: "a. It has been informed that there are no schemes to promote minority languages in the State."
   source: CLM 52nd Report (archive copy), §19.17(a), p. 71
   quote: "It has been stated that Language Preference Registers are not maintained in schools. It has also been informed that the application form for admission to school at the Primary level in the state does not have the three necessary columns to elicit the preferability of the children with regard to linguistic minorities."
   source: same, §19.16, p. 71

 - field: fl (NATIONAL BACKDROP)
   quote: "Furthermore, at least two of these three languages, R1, R2, and R3, must be native to India. The state or other relevant bodies would decide the choices of R1, R2, or R3 that would be given to students."
   source: NCF 2023, §2.2, Box 2.2i, p. 219
   [Mizoram's Mizo-English-Hindi combination satisfies this: two of the three (Mizo and Hindi) are
   native to India. NCF 2023 postdates the CLM return by eight years and I have not established
   Mizoram's adoption of it.]

DRAFT BULLETS:

 - field: fl.primaryRequirement
   bullets:
     - As reported to the Commissioner for Linguistic Minorities, 2014-15
     - Three Language Formula applies: Mizo first, English second, Hindi third
     - All three are official languages of Mizoram, so none is framed as foreign
     - NATIONAL NCF 2023 requires two of a pupil's three languages to be native to India

 - field: fl.secondaryRequirement
   bullets:
     - Same three languages carry through to class X and class XII, per the state's return
     - 20,230 students covered at class X and 11,800 at class XII in Mizo, English and Hindi
     - No stage-specific variation of the formula is reported anywhere in the chapter

 - field: fl.upperSecondary
   bullets:
     - Class XII covered by the same Mizo, English and Hindi formula, 11,800 students
     - No minority-language medium or subject data furnished for XI-XII at all
     - NATIONAL NCF 2023: two language Board exams for Grade 12, one native to India

 - field: fl.languagesOffered
   bullets:
     - Mizo, English and Hindi for all students under the Three Language Formula
     - Bengali and Nepali available as media of instruction, mainly at primary stage
     - Only two Nepali primary schools teach a minority language as a subject
     - Lakher, Pawi, Paite and Hmar appear in the census but in no school provision

 - field: fl.regionalMinorityLanguages
   bullets:
     - Position as reported to the CLM for 2014-15, on Census-2001 speaker shares
     - 71 Bengali and 15 Nepali institutions recognised as at 30 June 2015
     - Bengali medium: 54 primary and 17 upper primary schools, nil at secondary
     - State reported no schemes at all to promote minority languages

 - field: fl.teacherSupply
   bullets:
     - Posts as returned to the CLM, 2014-15; the two languages look transposed in the source
     - Medium posts: Nepali 50 sanctioned and 50 filled, Bengali 10 and 10
     - Mizoram supplied no figures at all for minority languages taught as a subject
     - State told the CLM there is no arrangement for training minority language teachers
     - Bengali textbooks bought in from Assam, Nepali from Meghalaya and Sikkim boards

 - field: fl.uptake
   series (each row note: "students covered by the Three Language Formula, as reported to the
   CLM, 2014-15; identical for Mizo, English and Hindi"):
     - {year: 2015, value: 20230, note: "class X, all three formula languages, CLM 19.13"}
     - {year: 2015, value: 11800, note: "class XII, all three formula languages, CLM 19.13"}
   [I DELIBERATELY OMIT the class VIII figure of 2,447, which `-table` confirms is really printed
   in the report. It duplicates the Bengali upper-primary figure at §19.10(a) exactly and cannot
   be reconciled with 20,230 at class X, so the defect is the state's, not the extraction's.]

 - field: policyHistory
   rows:
     - {year: 2015, description: "Mizoram reported to the Commissioner for Linguistic Minorities that Mizo, English and Hindi were its three formula languages and that no scheme existed to promote minority languages"}
     - {year: 2023, description: "NATIONAL: NCERT's NCF 2023 required at least two of a student's three school languages to be native to India, with the state choosing which"}
   [SOURCED ABSENCE, and it is the honest finding: **Chapter 19 names no dated Mizoram
   instrument** — no act, no rule, no government order, no circular. Six separate heads record
   that no information was furnished (§19.3, §19.4, §19.5(a), §19.7(a), §19.8(a), §19.17(b),
   §19.18, §19.19(b)). There is nothing further to put in this timeline from this source.]
