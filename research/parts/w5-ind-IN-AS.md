### IN|Assam
STATUS: documented
SOURCES:
 - label: "48th Report of the Commissioner for Linguistic Minorities in India (July 2010 to June 2011) — Chapter 16, Assam, paras 16.3, 16.4, 16.10-16.15, 16.18, 16.21"
   url: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
   http: 200 (74,759,980 bytes; md5 7298de13035bd16218de94b5afbbdcfa; downloaded and checksummed in this session; live host nclm.nic.in unreachable, Internet Archive copy used)
   tier: official-document
 - label: "50th Report of the Commissioner for Linguistic Minorities in India (July 2012 to June 2013), No. CLM REPORT/50/2014, dated 16.7.2014 — Chapter 16, Assam, paras 16.3-16.4 (state did not reply)"
   url: https://web.archive.org/web/20141226150914/http://nclm.nic.in/shared/linkimages/NCLM50thReport.pdf
   http: 200 (2,112,412 bytes; md5 ba1605b09e2328ae553ec5b60fcea3e5)
   tier: official-document
 - label: "52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015) — Chapter 16, Assam, para 16.3 (state did not reply)"
   url: https://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (2,717,577 bytes; md5 3c7043334160d5cc80ac9be41477ec52)
   tier: official-document
EXTRACTION METHOD: the 48th Report PDF carries diagonal watermark text that both extraction
modes interleave with the table cells, so every figure below was read in BOTH `pdftotext -table`
and `pdftotext -layout` and only rows identical in the two modes are quoted. The medium table at
16.10(a) matches in both; the subject table at 16.10(b) does NOT (`-layout` shifts the pupil
column), so only its language names and school counts, which do match, are used.
EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "Additional official language: Bengali in 3 district and Bodo in 4 district for medium of instruction."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "The minority languages are the medium of instruction, at the primary stage of education as follows: Language / School Provincialised Govt. Aided / Bengali 3,813 309 / Manipuri 185 4 / Garo 38 6 / Bodo 1,713 87 / Hmar 5 - / Nepali 5 - / Hindi 78 12 / Assamese + Bodo - 39"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "The minority languages are the medium of instruction at the upper primary stage of education as per following details: Bengali 994 70 / Manipuri 68 1 / Nepali 14 - / Hmar 6 5"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "It has been stated that minority languages are the medium of instruction upto class VIII."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
   note: para 16.13, Higher Secondary Stage — the ceiling on mother-tongue medium is Class VIII.
 - field: indigenous.mediumOfInstruction
   quote: "Though, Bengali and Bodo are the additional official languages in certain districts but their purpose is reported to be limited to medium of instruction."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "It is a matter of concern that the State Government has not replied to the Commissioner's communications, which were sent in pursuance of the Constitutional mandate embodied in Article 350 B (2) of the Constitution of India."
   source: https://web.archive.org/web/20141226150914/http://nclm.nic.in/shared/linkimages/NCLM50thReport.pdf
   note: Assam also made no return to the 51st or 52nd Reports, so the 48th Report is the most recent CLM data for the state.
 - field: indigenous.taughtAsSubject
   quote: "The following minority language(s) are being taught as a subject, at the primary stage of education: Language Schools / Tai 200 / Mising 230 / Rabha 70 / Karbi 25 / Nepali 100 / Bishnupriya manipuri 52"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The following minority language(s) are being taught as a subject: Language Schools Students Teachers / Hindi 6,730 3,95,564 7,330 / Arabic 1,818 95,610 1,818"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
   note: para 16.11(b), Upper Primary Stage (VI to VIII).
 - field: indigenous.taughtAsSubject
   quote: "The minority languages are being taught as a subject at secondary stage of education, as per following details: Language ... Bengali ... Bodo ... Hindi ... Manipuri"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "no information has been furnished on teaching of minority languages as a subject, at the higher secondary stage of education."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The languages taught under Three Language Formula are as under: First Language : Assamese  Second Language : English  Third language : Hindi"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "It has been stated that Bengali, Bodo, Manipuri, Garo, Hmar, Nepali, Tai, Mising, Rabha, Karbi and Bishnupriya-Manipuri are being taught, at the primary stage of education."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - Latest CLM data is 2010-11: Assam did not reply to the 50th, 51st or 52nd Report
     - Minority languages are the medium of instruction up to Class VIII
     - Primary media: Bengali, Manipuri, Garo, Bodo, Hmar, Nepali, Hindi, Assamese-plus-Bodo
     - Bengali is additional official language in 3 districts, Bodo in 4, for medium use
     - Bengali medium runs 3,813 provincialised and 309 government-aided primary schools
 - field: indigenous.taughtAsSubject
   bullets:
     - Primary-stage subjects: Tai, Mising, Rabha, Karbi, Nepali, Bishnupriya Manipuri
     - At upper primary the only subjects returned are Hindi and Arabic
     - Secondary stage returns Bengali, Bodo, Hindi and Manipuri as subjects
     - Three Language Formula is Assamese first, English second, Hindi third
POLICY HISTORY:
 - year: 2012
   description: 48th Report of the Commissioner for Linguistic Minorities records eight minority languages used as media of instruction in Assam up to Class VIII, with Bengali and Bodo additional official languages for medium purposes in seven districts
 - year: 2009
   description: Assam Linguistic Minorities Development Board constituted by Government Notification No. WMD.20/99/Pt/62 dated 14.10.2009 to monitor implementation of safeguards for linguistic minorities
