### IN|Puducherry
STATUS: documented
SOURCES:
 - label: "51st Report of the Commissioner for Linguistic Minorities in India (July 2013 to June 2014), No. CLM REPORT/51/2015, dated 15-07-2015 — Chapter 35, Puducherry, paras 35.8-35.12"
   url: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
   http: 200 (3,392,669 bytes; md5 a687f08d8b984f67e59a660a7973f955; downloaded and checksummed in this session; live host nclm.nic.in unreachable, Internet Archive copy used)
   tier: official-document
 - label: "52nd Report of the Commissioner for Linguistic Minorities in India (July 2014 to June 2015), No. CLM REPORT/52/2016 — Chapter 35, Puducherry, para 35.3 (UT Administration did not reply)"
   url: https://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf
   http: 200 (2,717,577 bytes; md5 3c7043334160d5cc80ac9be41477ec52)
   tier: official-document
EXTRACTION METHOD: tables at 35.8-35.11 read in BOTH `pdftotext -table` and `pdftotext -layout`
and identical cell for cell. The region-by-region formula text at 35.12 was read in both modes;
`-layout` interleaves the "Second Language" and "Third Language" labels with the wrong lines,
so the `-table` reading, which keeps each label with its own entry, is the one quoted.
EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "Details of the facility for using the minority languages as the medium of instruction at the Primary stage of education are as follows: Language Schools Students Teachers / French 4 111 36"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "Details of the facility for using the minority languages as the medium of instruction at the Upper Primary stage of education are as follows: Language Schools Students Teachers / French 4 123 36"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "Details of the facility for using the minority languages as the medium of instruction at the Secondary stage of education are as follows: Language Schools Students Teachers / French 4 113 36"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.mediumOfInstruction
   quote: "No information has been furnished with regard to the minority language being used as the medium of instruction in the Higher Secondary Stage of Education."
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Two Language Formula is being followed in the Puducherry and Karaikal regions of the Union Territory. However, in the Yanam and Mahe regions of the UT, the Three Language Formula has been adopted"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Puducherry Region First Language : Tamil: Class I to XII standard  Hindi/French/Sanskrit: Class XI to XII only (in some schools introduced from Class VI)  Second Language : English Class I to XII  Third Language : No Third Language in Puducherry region."
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Mahe Region First Language : Malayalam Class I to XII standard  Hindi/Arabic Class I to XII only  Second Language : English Class I to XII standard  Third Language : Hindi"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Yanam Region First Language : Telugu Class I to XII standard  Hindi/Sanskrit Class VI to XII only  Second Language : English Class I to XII standard"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Details of the facility for learning the minority languages as a subject at the Primary stage of education are as follows: Language Schools Students Teachers / Hindi 10 298 6 / Arabic 3 33 4 / Sanskrit 2 21 2"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
 - field: indigenous.taughtAsSubject
   quote: "Details of the facility for learning the minority languages as a subject at the Higher Secondary stage of education are as follows: Hindi 8 421 10 / French 9 634 8 / Arabic 4 207 1"
   source: https://web.archive.org/web/20180216025959/http://nclm.nic.in/shared/linkimages/NCLM51stReport.pdf
DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - 51st Report data: the UT made no return at all to the 52nd Report
     - French is the only minority-language medium: 4 schools at each of three stages
     - French medium runs primary, upper primary and secondary, 36 teachers each
     - Nothing furnished on any medium at the higher secondary stage
     - No Indian minority language of the UT is returned as a medium anywhere
 - field: indigenous.taughtAsSubject
   bullets:
     - Formula differs by region: two languages in Puducherry and Karaikal
     - Mahe and Yanam follow the Three Language Formula instead
     - First language is Tamil in Puducherry and Karaikal, Malayalam in Mahe, Telugu in Yanam
     - Subjects returned are Hindi, Arabic, Sanskrit and, at Class XI-XII, French
POLICY HISTORY:
 - year: 2015
   description: 51st Report of the Commissioner for Linguistic Minorities records Puducherry and Karaikal following a Two Language Formula while Mahe and Yanam follow the Three Language Formula, with French the only minority-language medium of instruction
