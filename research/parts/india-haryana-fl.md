### IN-HR|Haryana — map: fl
STATUS: partial (the state supplied no medium-of-instruction or student data at any stage)
SOURCES:
 - label: "52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, No. CLM REPORT/52/2016, dated 29.03.2016 — Chapter 4, HARYANA, paras 4.1-4.17 — INTERNET ARCHIVE COPY (live host minorityaffairs.gov.in is unreachable from this machine)"
   url: http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (retrieved 2026-08-26; 2,717,577 bytes; url_effective identical)
   tier: official-document
 - label: "NCERT, National Curriculum Framework for School Education 2023 — national R1/R2/R3 rule"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (retrieved 2026-08-26)
   tier: official-document

EXTRACTION NOTE: read with `pdftotext -table` and confirmed with `pdftotext -lineprinter`
(strict y-positions). The `-layout` extraction mis-rows the Three Language Formula table,
wrongly showing Second Language as English and Third Language as blank.

EVIDENCE:
 - field: languagesOffered
   quote: "4.9 Three Language Formula a. Languages taught in the State under the Three Language Formula: / First Language : Hindi / Second Language : Punjabi / Third language : English"
   source: http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
 - field: primaryRequirement
   quote: "Official Language of the State: Hindi is the Official Language of the State. b. Additional Official Language: English has been declared as the Additional Official Language of the State."
   source: (as above, para 4.2)
 - field: primaryRequirement
   quote: "4.8 Primary/Upper Primary/Secondary/Higher Secondary stages / The State Government has not furnished any information with regard to the educational facilities available to the students of minority languages at primary, upper primary, secondary and Higher secondary stages of education."
   source: (as above, para 4.8)
 - field: uptake
   quote: "b. No information has been furnished about the students covered under the Three Language Formula."
   source: (as above, para 4.9b)
 - field: teacherSupply
   quote: "4.10 Teachers for Minority Languages a. The following information has been furnished on posts of teachers for the teaching of minority languages: LANGUAGE Medium / Sanctioned Filled / Urdu 48 2 / Punjabi 1,182 849"
   source: (as above, para 4.10a)
 - field: teacherSupply
   quote: "It has been stated that there is no arrangement for training minority language teachers. It has also been informed that there is no collaboration/arrangement with neighbouring States for exchange of minority language teachers/opening of teachers' training institutes/centres."
   source: (as above, para 4.10b)
 - field: regionalMinorityLanguages
   quote: "The Census-2001 registered the population of Haryana as 2,11,44,564 persons and its broad linguistic profile is as follows: Hindi 1,84,60,843 87.31 / Punjabi 22,34,626 10.57 / Urdu 2,60,687 1.23 / Bengali 39,199 0.19 / Nepali 20,362 0.10"
   note: the -layout extract mis-pairs these; pairing confirmed arithmetically against the stated total of 2,11,44,564.
   source: (as above, para 4.1)
 - field: regionalMinorityLanguages
   quote: "there is no district, where a minority language is spoken by 60 per cent or more of its population. However, the following minority languages are spoken by 15 per cent or more of the districts population: Kurukshetra Punjabi 18.63 / Sirsa Punjabi 34.54 / Mewat Urdu 16.52"
   source: (as above, para 4.3)
 - field: regionalMinorityLanguages
   quote: "It has been stated that minority languages textbooks are not available to the students at the primary stage of education. However, textbooks in minority languages are said to be available at the secondary stage of education."
   source: (as above, para 4.11a)
 - field: regionalMinorityLanguages
   quote: "the textbooks in minority languages for classes VI to VIII are prepared by the Directorate of Secondary Education and textbooks in Punjabi language for Class IX and X are prepared and published by Haryana School Education Board"
   source: (as above, para 4.11b)
 - field: regionalMinorityLanguages
   quote: "It has been informed that there is no scheme in the State for the promotion and development of minority languages."
   source: (as above, para 4.13a)
 - field: regionalMinorityLanguages
   quote: "Language Name of the Academy Date of Establishment Budget for year 2014-15 / Urdu Haryana Urdu Academy 23.10.1986 1.50 Crore / Punjabi Haryana Punjabi Academy 23.10.1997 1.50 Crore"
   source: (as above, para 4.13b)
 - field: regionalMinorityLanguages
   quote: "It has been informed that 22 schools/institutions have been recognized as linguistic minority institutions as on 30 June 2015."
   source: (as above, para 4.6b)
 - field: regionalMinorityLanguages
   quote: "prior to the year 2008, grants-in-aid were given by the Department of Education of the State, but after the transfer of the case of grants-in-aid to the Department of Language after 2008, no grants-in-aid have been given since then."
   source: (as above, para 4.7)
 - field: policyHistory
   quote: "in accordance with the letter of Director, Primary Education, Haryana, dated 18-05-1997, all the Officers of Primary Education have been directed to get those students registered, who opt for Urdu or Punjabi as an additional language"
   source: (as above, para 4.12)
 - field: policyHistory
   quote: "the Three Language Formula evolved in 1961 in consultation with States/ UTs for adoption at the Secondary stage of education for teaching language subjects"
   source: (as above, Introduction para 1.4 — NATIONAL)
 - field: secondaryRequirement
   quote: "i. Study 3 Languages: R1, R2, R3, at least two of which are native to India."
   source: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf (NATIONAL rule)

DRAFT BULLETS:
 - field: languagesOffered
   bullets:
     - As reported by the state to the Commissioner for Linguistic Minorities, 2014-15
     - First Language: Hindi
     - Second Language: Punjabi
     - Third Language: English
     - Only these three named; no other language listed under the formula
 - field: primaryRequirement
   bullets:
     - Haryana furnished NO stage-by-stage data to the CLM for 2014-15
     - Hindi is the official language; English is the additional official language
     - Minority-language textbooks are not available at the primary stage
     - National rule, NCF 2023: R1 is the language most familiar to the student
 - field: secondaryRequirement
   bullets:
     - Haryana furnished NO stage-by-stage data to the CLM for 2014-15
     - Minority-language textbooks exist at secondary stage but not primary
     - Punjabi textbooks for IX-X made by the Haryana School Education Board
     - National rule, NCF 2023: three languages, at least two native to India
 - field: upperSecondary
   bullets:
     - Not found: Haryana furnished no higher secondary information to the CLM
     - National rule, NCF 2023: two languages at XI-XII, one native to India
 - field: regionalMinorityLanguages
   bullets:
     - Census-2001 shares; the report carries no later count
     - Hindi 87.31%, Punjabi 10.57%, Urdu 1.23%, Bengali 0.19%, Nepali 0.10%
     - Punjabi is 34.54% of Sirsa and 18.63% of Kurukshetra; Urdu 16.52% of Mewat
     - Haryana Urdu Academy and Haryana Punjabi Academy, 1.50 crore each in 2014-15
     - No grants-in-aid to minority institutions have been given since 2008
 - field: teacherSupply
   bullets:
     - Posts as medium of instruction only, as reported to the CLM, 2014-15
     - Urdu: 48 posts sanctioned, 2 filled
     - Punjabi: 1,182 posts sanctioned, 849 filled
     - No arrangement exists for training minority-language teachers
 - field: uptake
   bullets:
     - Not found: the state furnished no student numbers under the formula
 - field: policyHistory
   rows:
     - year: 1961
       description: "Three Language Formula evolved with States/UTs for the secondary stage (national)"
     - year: 1986
       description: "Haryana Urdu Academy established 23.10.1986"
     - year: 1997
       description: "Haryana Punjabi Academy established 23.10.1997"
     - year: 1997
       description: "Director of Primary Education letter of 18-05-1997 directs registration of pupils opting for Urdu or Punjabi as an additional language"
     - year: 2008
       description: "Grants-in-aid to linguistic minority institutions stop after transfer to the Department of Language"
     - year: 2014
       description: "CBSE letter of 29-09-2014 adds mother-tongue and language-preference columns to admission forms; CLM urges Haryana to copy it (national)"
