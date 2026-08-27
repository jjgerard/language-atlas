### IN|Andhra Pradesh
STATUS: documented
SOURCES:
 - label: "48th Report of the Commissioner for Linguistic Minorities in India (July 2010 to June 2011) — Chapter 32, Andhra Pradesh, paras 32.3, 32.9-32.14"
   url: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
   http: 200 (74,759,980 bytes; md5 7298de13035bd16218de94b5afbbdcfa; downloaded and checksummed in this session; live host nclm.nic.in unreachable, Internet Archive copy used)
   tier: official-document
 - label: "50th Report of the Commissioner for Linguistic Minorities in India (July 2012 to June 2013) — Chapter 32, Andhra Pradesh, paras 32.2-32.4 (state did not reply)"
   url: https://web.archive.org/web/20141226150914/http://nclm.nic.in/shared/linkimages/NCLM50thReport.pdf
   http: 200 (2,112,412 bytes; md5 ba1605b09e2328ae553ec5b60fcea3e5)
   tier: official-document
 - label: "52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015) — Chapter 32, Andhra Pradesh and Telangana, para 32.3 (neither state replied)"
   url: https://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (2,717,577 bytes; md5 3c7043334160d5cc80ac9be41477ec52)
   tier: official-document
CAVEAT ON SCOPE: the 48th Report covers UNDIVIDED Andhra Pradesh, before the 2014 formation of
Telangana. Its district tables include Hyderabad, Warangal, Nizamabad, Adilabad, Karimnagar,
Medak, Mahabubnagar and Nalgonda, all now in Telangana.
EXTRACTION METHOD: the 48th Report PDF carries diagonal watermark text that both modes
interleave with table cells. Every table was read in BOTH `pdftotext -table` and
`pdftotext -layout`. The secondary-stage tables at 32.11 agree in the two modes and are quoted
with figures; the primary and upper-primary tables at 32.9 and 32.10 do NOT agree on row
alignment, so only their language names, identical in both, are used.
EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "Additional Official Language(s): Urdu for publication of rules, regulations, notification etc. and for providing instruction in Primary and Secondary Schools in the State."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "Urdu has been declared as an additional Official Langauge for publication of rules, regulations, notification etc. and for providing instruction in Primary and Secondary Schools in the State."
   source: https://web.archive.org/web/20141226150914/http://nclm.nic.in/shared/linkimages/NCLM50thReport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "The following minority languages are the medium of instruction, at the primary stage of education: Language ... Urdu / Oriya / Tamil / Kannada / Hindi / Marathi"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "The following minority languages are the medium of instruction, at the secondary stage of education: Language Schools Students Teachers / Urdu 214 36,394 1,503 / Oriya 6 1,096 33 / Tamil 4 454 20 / Kannada 2 2936 6 / Hindi 23 3,888 144 / Marathi 2 238 10"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "'No' information has been furnished on teaching of minority languages as a medium and as a subject at the higher secondary stage of education."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "It is a matter of concern that the State Government has not replied to the Commissioner's communications, which were sent in pursuance of the Constitutional mandate embodied in Article 350 B (2) of the Constitution of India."
   source: https://web.archive.org/web/20141226150914/http://nclm.nic.in/shared/linkimages/NCLM50thReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The languages taught under the Three Language Formula in the State are as follows: Level | Telugu Medium Schools | English Medium Schools | Other Medium Schools — First Language: Telugu | Telugu/Urdu/Hindi | Medium of the Institution ; Second Language: Hindi | Hindi/Telugu | Telugu ; Third Language: English | English | English"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The following minority languages are taught as a subject, at the Secondary stage of education: Language Schools Students Teachers / Urdu 214 36,394 1,503 / Oriya 6 1,096 33 / Tamil 4 454 20 / Kannada 2 2936 6 / Hindi 23 3,888 144 / Marathi 2 238 10"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The numbers of schools, students and teachers are same as regards teaching of minority languages as a medium of instruction and as a subject, at the Secondary stage of education. It needs to be clarified."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Languages-wise break-up has not been furnished which should have been done."
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
 - field: indigenous.taughtAsSubject
   quote: "The details of the linguistic minority educational institutions recognised as on 30.06.2011: Urdu 2,799 / Oriya 100 / Tamil 72 / Kannada 61 / Hindi 58 / Marathi 31 / Bengali 1"
   source: https://web.archive.org/web/20121013090223/http://nclm.nic.in/shared/linkimages/nclm48threport.pdf
DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - 2010-11 data for UNDIVIDED Andhra Pradesh, and no state reply for 2012-15
     - Urdu is an additional official language expressly for school instruction
     - Media at every stage to Class X: Urdu, Oriya, Tamil, Kannada, Hindi, Marathi
     - Secondary media: Urdu 214 schools, Hindi 23, Oriya 6, Tamil 4, Kannada 2, Marathi 2
     - Nothing furnished on any medium at the higher secondary stage
 - field: indigenous.taughtAsSubject
   bullets:
     - Commissioner flags the medium and subject figures as identical, needing clarification
     - The same six languages are returned as subjects at every stage up to Class X
     - First language depends on school type: Telugu, Telugu/Urdu/Hindi, or the school's medium
     - In non-Telugu, non-English medium schools Telugu is the second language
POLICY HISTORY:
 - year: 2012
   description: 48th Report of the Commissioner for Linguistic Minorities records Urdu, Oriya, Tamil, Kannada, Hindi and Marathi as media of instruction in undivided Andhra Pradesh up to Class X, Urdu being an additional official language expressly for school instruction
 - year: 2004
   description: Andhra Pradesh Government Order Ms. No. 1 NW, (M & R) Department dated 16.01.2004 designates the authorities for recognising linguistic minority educational institutions
 - year: 1975
   description: Urdu Academy set up in Andhra Pradesh for the promotion and development of Urdu
