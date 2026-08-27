### IN-DL|Delhi (NCT) — map: fl
STATUS: documented
SOURCES:
 - label: "52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), Ministry of Minority Affairs, No. CLM REPORT/52/2016, dated 29.03.2016 — Chapter 3, DELHI, paras 3.1-3.19 — INTERNET ARCHIVE COPY (live host minorityaffairs.gov.in is unreachable from this machine)"
   url: http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (retrieved 2026-08-26; 2,717,577 bytes; url_effective identical)
   tier: official-document
 - label: "NCERT, National Curriculum Framework for School Education 2023 — national R1/R2/R3 rule"
   url: https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf
   http: 200 (retrieved 2026-08-26)
   tier: official-document

EXTRACTION NOTE: the Delhi tables wrap badly under `pdftotext -layout`, putting values on the
wrong language row. Every figure below was re-derived with `pdftotext -table` (and
cross-checked against raw column-order output) on the same PDF pages; the two agree. Figures
from para 3.7b (grants-in-aid) and 3.8b (language as a subject at Primary) are NOT reported
because neither method resolved them unambiguously.

EVIDENCE:
 - field: languagesOffered
   quote: "3.12 Three Language Formula a. The languages taught under the Three Language Formula in schools are as under: Directorate of Education, GNCTD / First Language : Hindi/Urdu/English / Second Language : English / Third language : Urdu/Punjabi/Bengali/Sindhi/Tamil/Telugu/Malayalam/Kannada/Gujarati/Marathi/Arabic/Persian"
   source: http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
 - field: languagesOffered
   quote: "NDMC / First Language : Hindi / Second Language : English / Third language : Urdu, Punjabi, Sanskrit"
   note: read with `pdftotext -table`; the `-layout` extraction wrongly shows this as First "Hindi English", Second "Urdu, Punjabi, Sanskrit", Third blank.
   source: (as above, para 3.12a)
 - field: languagesOffered
   quote: "It has also been observed in the representations received from the Urdu Linguistic Minority Association that many Schools do not provide Urdu as third Language to the students willing to study. Besides many schools reported to have provided Urdu upto Class 10 but not upto Class 11 and 12 despite having enough number of students there and willing to study Urdu."
   source: (as above, Findings/Recommendations e)
 - field: primaryRequirement
   quote: "Official Language of the NCT: Hindi and English are the Official Languages of the NCT of Delhi. b. Additional Official Language(s): It has been informed that Punjabi and Urdu have been declared as Second Official Languages in the NCT of Delhi."
   source: (as above, para 3.3)
 - field: primaryRequirement
   quote: "Details of the facility for learning minority languages as a medium of instruction at the Primary stage of education are as follows: Directorate of Education, GNCTD / Urdu 11 2,259 69 / Malayalam 02 1,119 11 / Tamil 03 808 15 / Telugu 01 200 07 / Punjabi 01 345 10"
   source: (as above, para 3.8a)
 - field: primaryRequirement
   quote: "South Delhi Municipal Corporation / Urdu 13 3,439 87 ... North Delhi Municipal Corporation / Urdu 37 4,277 109 ... East Delhi Municipal Corporation / Urdu 23 1,415 38 ... NDMC, Education Department / Urdu 13 662 43"
   source: (as above, para 3.8a)
 - field: secondaryRequirement
   quote: "3.10 Secondary Stage (IX to X) a. Details of the facility for learning minority languages as a medium of instruction at the Secondary stage of education are as follows: Directorate of Education, GNCTD / Urdu 31 4,178 76 / Punjabi 01 16 01 / Bengali 01 260 10"
   source: (as above, para 3.10a)
 - field: upperSecondary
   quote: "3.11 Higher Secondary Stage (XI to XII) a. Details of the facility for learning minority languages as a medium of instruction at the Higher Secondary stage of education are as follows: Directorate of Education, GNCTD / Urdu 20 3,623 64"
   note: Urdu is the ONLY language listed as a medium at XI-XII.
   source: (as above, para 3.11a)
 - field: uptake
   quote: "b. The details of students covered under the Three Language Formula are as under: Directorate of Education, GNCTD / Language ... Punjabi Sindhi Tamil Telugu Urdu Malayalam Gujarati / Class VIII 8,548 153 557 397 18,274 390 53 / Class X 5,131 115 199 280 8,785 162 29 / Class XII 137 0 89 121 1,948 0 0"
   note: `pdftotext -table`, PDF pages 23-24.
   source: (as above, para 3.12b)
 - field: uptake
   quote: "Language Class VIII Class X Class XII / Arabic 62 46 18 / Bengali 214 103 17 / Kannada 4 3 0 / Marathi 108 0 0 / Persian 42 24 2"
   note: `pdftotext -table`, PDF page 23; the `-layout` extract mis-rows these five.
   source: (as above, para 3.12b)
 - field: uptake
   quote: "NDMC / Language Urdu Punjabi / Class VIII 23 42 / Class X 11 07 / Class XII -"
   source: (as above, para 3.12b)
 - field: teacherSupply
   quote: "3.13 Teachers for Minority Languages a. ... Directorate of Education, GNCTD / Language Arabic Bengali Gujarati Kannada Malayalam Marathi Persian Punjabi Sindhi Tamil Telugu Urdu / Medium Sanctioned 3 18 1 0 28 0 1 0 0 21 9 148 / Filled 2 9 1 0 21 0 1 0 0 16 8 114 / Subject Sanctioned 6 2 1 1 22 1 1 257 0 19 13 303 / Filled 5 1 1 1 14 1 1 233 0 19 14 261"
   note: raw column-order extraction, PDF page 24; 12 values per column against 12 language rows.
   source: (as above, para 3.13a)
 - field: teacherSupply
   quote: "the total sanctioned posts for TGT Urdu were 263 however, only 90 posts have been filled up by Regular Teachers"
   note: from GNCTD letter No. DE.3(54)/E-III/DR/Misc/2014/87 dated 11-01-2016, quoted in the report.
   source: (as above, Findings/Recommendations d)
 - field: teacherSupply
   quote: "Training Institute Minority Language / SCERT / As Medium - As a Subject -"
   source: (as above, para 3.13b)
 - field: teacherSupply
   quote: "No information has been furnished by the Government on the facilities for training minority language teachers in the NCT of Delhi."
   source: (as above, Findings/Recommendations c)
 - field: regionalMinorityLanguages
   quote: "The Census-2001 registered the population of Delhi as 13,850,507 persons and its broad linguistic profile is as follows: Hindi 1,12,10,843 80.94 / Punjabi 9,88,980 7.14 / Urdu 8,74,333 6.31 / Bengali 2,08,414 1.50"
   note: the -layout extract mis-pairs these; the pairing above is confirmed arithmetically against the stated total of 13,850,507.
   source: (as above, para 3.1)
 - field: regionalMinorityLanguages
   quote: "The following minority languages are spoken by 15 per cent or more of District/Taluka/Municipality population: ... Central Daryaganj Urdu 52.65 ... West Rajouri Garden Punjabi 26.30"
   source: (as above, para 3.2)
 - field: regionalMinorityLanguages
   quote: "minority languages are promoted as per the provisions contained in the Delhi Official Language Act, 2000. Four Minority Language Academies, viz. Urdu, Punjabi, Sindhi and Maithili-Bhojpuri have been established."
   source: (as above, para 3.16a)
 - field: regionalMinorityLanguages
   quote: "Details of the schools sanctioned grants-in-aid for the year 2014-15 are as under: Language Primary Upper Primary Secondary Sr. Secondary / Bengali ... Gujarati ... Kannada ... Malayalam ... Marathi ... Punjabi ... Sindhi ... Tamil ... Telugu ... Urdu"
   note: ten languages are listed; the numeric cells wrap and are NOT reported here.
   source: (as above, para 3.7b)
 - field: regionalMinorityLanguages
   quote: "It has also been brought to the notice of the Commissioner that the Urdu Textbooks have not been supplied in time."
   source: (as above, Findings/Recommendations g)
 - field: policyHistory
   quote: "the recognition of linguistic minority educational institutions is granted as per the norms under the Delhi School Education Act & Rules, 1973; Right to Education Act, 2009; and the Delhi Municipal Committee Act, 1957"
   source: (as above, para 3.6a)
 - field: policyHistory
   quote: "Urdu Urdu Academy May, 1981 ... Maithili & Bhojpuri Academy 29.01.2008 ... Punjabi Academy 17.09.1981 ... Sindhi Academy 4 July 1994"
   source: (as above, para 3.16b)
 - field: policyHistory
   quote: "The Government of NCT of Delhi vide their letter No. DE.23(32)/Sch.Br./2015/1595 dated 07-10-2015 have assured to introduce necessary column to elicit the language preference of the parents for third language in the admission form from the next Academic Session i.e. 2016-2017."
   source: (as above, Findings/Recommendations f)
 - field: policyHistory
   quote: "the Three Language Formula evolved in 1961 in consultation with States/ UTs for adoption at the Secondary stage of education for teaching language subjects"
   source: (as above, Introduction para 1.4 — NATIONAL)

DRAFT BULLETS:
 - field: languagesOffered
   bullets:
     - Directorate of Education schools, as reported to the CLM, 2014-15
     - First Language: Hindi, Urdu or English; Second Language: English
     - Third Language: twelve options, Urdu and Punjabi through to Arabic and Persian
     - NDMC schools: Hindi first, English second, Urdu/Punjabi/Sanskrit third
     - CLM: many schools do not offer Urdu as third language, or stop it at Class 10
 - field: primaryRequirement
   bullets:
     - As reported to the CLM, 2014-15
     - Hindi and English are official; Punjabi and Urdu are second official languages
     - Urdu medium I-V, Directorate: 11 schools, 2,259 students, 69 teachers
     - Malayalam, Tamil, Telugu and Punjabi also run as media in Directorate schools
     - Municipal Urdu-medium primary: SDMC 13, North DMC 37, East DMC 23 schools
 - field: secondaryRequirement
   bullets:
     - Directorate of Education figures, as reported to the CLM, 2014-15
     - Urdu medium IX-X: 31 schools, 4,178 students, 76 teachers
     - Punjabi medium IX-X: 1 school, 16 students; Bengali: 1 school, 260 students
     - Third-language uptake at Class X: Urdu 8,785, Punjabi 5,131, Telugu 280
 - field: upperSecondary
   bullets:
     - As reported to the CLM, 2014-15
     - Urdu is the only minority medium at XI-XII: 20 schools, 3,623 students
     - Class XII uptake: Urdu 1,948, Punjabi 137, Telugu 121, Tamil 89
     - National rule, NCF 2023: two languages at XI-XII, one native to India
 - field: regionalMinorityLanguages
   bullets:
     - Census-2001 shares; the report carries no later count
     - Hindi 80.94%, Punjabi 7.14%, Urdu 6.31%, Bengali 1.50% of speakers
     - Urdu is 52.65% of Daryaganj and above 15% in seven other tehsils
     - Four academies: Urdu, Punjabi, Sindhi and Maithili-Bhojpuri
     - Grants-in-aid schools listed in ten minority languages for 2014-15
 - field: teacherSupply
   bullets:
     - Directorate of Education posts, as reported to the CLM, 2014-15
     - Urdu as medium: 148 sanctioned, 114 filled
     - Urdu as subject: 303 sanctioned, 261 filled; Punjabi 257 sanctioned, 233 filled
     - TGT Urdu separately: 263 posts sanctioned, only 90 filled by regular teachers
     - SCERT returned a dash for minority-language teacher training
 - field: uptake
   series:
     - year: 2014
       value: 18274
       note: "Class VIII students covered by the Three Language Formula in Urdu, Directorate of Education, as reported to the CLM, 2014-15"
     - year: 2014
       value: 8785
       note: "Class X students, Urdu, Directorate of Education, as reported to the CLM, 2014-15"
     - year: 2014
       value: 1948
       note: "Class XII students, Urdu, Directorate of Education, as reported to the CLM, 2014-15"
     - year: 2014
       value: 8548
       note: "Class VIII students, Punjabi, Directorate of Education, as reported to the CLM, 2014-15"
     - year: 2014
       value: 5131
       note: "Class X students, Punjabi, Directorate of Education, as reported to the CLM, 2014-15"
     - year: 2014
       value: 137
       note: "Class XII students, Punjabi, Directorate of Education, as reported to the CLM, 2014-15"
 - field: policyHistory
   rows:
     - year: 1957
       description: "Delhi Municipal Committee Act, one of three statutes governing recognition of linguistic minority schools"
     - year: 1961
       description: "Three Language Formula evolved with States/UTs for the secondary stage (national)"
     - year: 1973
       description: "Delhi School Education Act and Rules govern recognition and grants-in-aid to linguistic minority schools"
     - year: 1981
       description: "Urdu Academy established May 1981; Punjabi Academy 17.09.1981"
     - year: 1994
       description: "Sindhi Academy established 4 July 1994"
     - year: 2000
       description: "Delhi Official Language Act provides for promotion of minority languages"
     - year: 2008
       description: "Maithili and Bhojpuri Academy established 29.01.2008"
     - year: 2009
       description: "Right to Education Act applied to recognition of linguistic minority institutions in Delhi"
     - year: 2015
       description: "GNCTD letter of 07-10-2015 promises a third-language preference column in admission forms from 2016-17"
