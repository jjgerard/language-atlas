const { write, stats } = require("./gen");
const CLM = "http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf";
const COI = "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf";
const DEFN = "linguistic minorities at the State level mean any group or groups of people whose mother tongues are different from the principal language of the State";
const localTermBullets = [
  "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
  "Defined by mother tongue differing from the principal language of the State",
  "At district and taluka level, from the principal language of that unit",
  "The language need not be one of the 22 in the Eighth Schedule",
];
const t = (q, s) => ({ field: "localTerm", quote: q || DEFN, source: s || CLM });
const m = (q) => ({ field: "mediumOfInstruction", quote: q, source: CLM });
const s = (q) => ({ field: "taughtAsSubject", quote: q, source: CLM });

[
{
  slug: "IN-INDIA", unit: "IN|India", status: "documented",
  langs: ["Assamese","Bengali","Bodo","Dogri","Gujarati","Hindi","Kannada","Kashmiri","Konkani","Maithili","Malayalam","Meithei","Marathi","Nepali","Oriya","Panjabi","Sanskrit","Santali","Sindhi","Tamil","Telugu","Urdu"],
  langNotes: [
    "The 22 Eighth Schedule languages, read off the Legislative Department's own text of the Constitution as on 1 May 2024",
    "Constitution spells them Manipuri, Odia, Punjabi, Santhali; WALS carries Meithei, Oriya, Panjabi, Santali",
    "Sanskrit has no WALS record — by name and by ISO san — so its row carries no link",
    "This is not an inventory of India's languages: the atlas inventory field gives 518",
  ],
  evidence: [
    t(),
    { field: "localTerm", quote: "EIGHTH SCHEDULE [Articles 344(1) and 351] Languages", source: COI },
    m("every State and every local authority within the State should provide adequate facilities for instruction in the mother tongue at the primary stage of education to children belonging to linguistic minority groups"),
    s("several States have introduced the regional languages as compulsory subject in the curriculum at the Primary stage itself"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Art 350A: states to provide facilities for instruction in the mother tongue",
      "That duty runs at the primary stage only, and to linguistic minority groups",
      "CLM 2016: 'significant decline' in mother-tongue teaching at primary stage",
      "CBSE admission forms must record mother tongue and first-language preference",
    ],
    taughtAsSubject: [
      "Three Language Formula of 1961 governs language subjects at secondary stage",
      "Slot a: regional language, or mother tongue where it differs from that",
      "Slot b: Hindi, or in Hindi-speaking areas another Indian language",
      "CLM notes several states made the regional language compulsory from primary",
    ],
  },
},
{
  slug: "IN-CH", unit: "IN|Chandigarh", status: "documented",
  langs: ["Hindi","Panjabi","Urdu","Tamil"],
  langNotes: ["Punjabi is the only one with any reported provision; Urdu and Tamil have none in the UT"],
  evidence: [
    t(),
    m("Details of the facility for learning the minority language as medium of instruction at the Primary stage of education are as follows: Punjabi 99"),
    s("Details of the facility for learning the minority language as a subject at the Primary stage of education are as follows: Punjabi 108"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Punjabi is the only medium reported, and only for a few hundred children",
      "99 primary, 47 upper primary and 39 secondary schools use Punjabi as medium",
      "Primary Punjabi-medium enrolment reported as 192 pupils across 99 schools",
    ],
    taughtAsSubject: [
      "Punjabi as a subject reaches far more children than Punjabi as a medium",
      "108 primary schools, 98,234 pupils; 100 upper primary schools, 64,534 pupils",
      "87 secondary schools, 38,546 pupils taking Punjabi as a subject",
      "No teaching facility reported for Urdu or Tamil at any stage",
    ],
  },
},
{
  slug: "IN-DL", unit: "IN|Delhi", status: "documented",
  langs: ["Hindi","Panjabi","Urdu","Bengali","Sindhi","Maithili","Bhojpuri","Malayalam","Tamil","Telugu","Gujarati","Kannada","Marathi","Arabic (Modern Standard)","Persian"],
  langNotes: [
    "Arabic and Persian appear in Delhi's own minority-language subject tables; the row records the category the source uses",
    "WALS carries 21 Arabic lects; 'Arabic (Modern Standard)' (wals ams, iso arb) is the school variety",
  ],
  evidence: [
    t(),
    m("Details of the facility for learning the minority language as medium of instruction at the Primary stage"),
    s("Details of the facility for learning the minority language as a subject at the Primary stage"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Urdu is the main minority medium, from primary through higher secondary",
      "Malayalam, Tamil, Telugu and Punjabi media reported at the primary stage",
      "Bengali and Punjabi media appear at upper primary and secondary only",
      "Urdu-medium schools number 37 at primary and 20 at higher secondary",
    ],
    taughtAsSubject: [
      "Twelve languages appear in Delhi's minority-language subject tables",
      "Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, Sindhi as subjects",
      "Tamil, Telugu and Urdu as subjects at all four stages",
      "Arabic and Persian are counted among the minority-language subjects here",
    ],
  },
},
{
  slug: "IN-HR", unit: "IN|Haryana", status: "partial",
  langs: ["Hindi","Panjabi","Urdu","Bengali","Nepali"],
  evidence: [
    t(),
    m("The State Government has not furnished any information with regard to the educational facilities available to the students of minority languages at primary, upper primary, secondary and Higher secondary stages of education."),
    s("The State Government has not furnished any information with regard to the educational facilities available to the students of minority languages"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Haryana replied to the CLM but furnished no educational-facility information",
      "No minority-language medium is recorded at any stage for 2014-15",
      "Punjabi and Urdu academies are funded; that is not a medium provision",
    ],
    taughtAsSubject: [
      "Haryana replied to the CLM but furnished no educational-facility information",
      "No minority-language subject table appears for any stage in 2014-15",
    ],
  },
},
{
  slug: "IN-CT", unit: "IN|Chhattisgarh", status: "documented",
  langs: ["Hindi","Gondi","Oriya","Halbi","Kurukh","Bengali","Urdu","Panjabi"],
  langNotes: ["CLM writes Odiya and Halabi; WALS carries them as Oriya and Halbi"],
  evidence: [
    t(),
    m("Details of the facility for using the minority languages as a medium of instruction"),
    s("Details of the facility for learning the minority languages as a subject at the"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Urdu is the only minority medium reported, and only at the primary stage",
      "No minority-language medium reported at upper primary or senior secondary",
      "Gondi, Halbi and Kurukh appear in the census table but in no provision table",
    ],
    taughtAsSubject: [
      "Only Urdu and Punjabi are taught as minority-language subjects",
      "Urdu 2 schools and Punjabi 2 schools at the primary stage",
      "Urdu 2 and Punjabi 1 school at the secondary stage",
      "Nothing reported for Gondi, Halbi or Kurukh at any stage",
    ],
  },
},
{
  slug: "IN-UP", unit: "IN|Uttar Pradesh", status: "partial",
  langs: ["Hindi","Urdu","Panjabi","Nepali","Bengali","Sindhi","Sanskrit"],
  evidence: [
    t(),
    m("No information has been furnished in respect of educational facilities available to the linguistic minority students at the Primary/Upper Primary/Secondary/Higher Secondary stages of education in the State."),
    s("The languages taught under the Three Languages Formula are as follows: First Language: Hindi Second Language: English Third Language: Urdu/Sanskrit"),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "State told the CLM no language is declared a minority language in UP",
      "Defined by mother tongue differing from the principal language of the State",
    ],
    mediumOfInstruction: [
      "State furnished no educational-facility information for any stage in 2014-15",
      "No minority-language medium is recorded for Uttar Pradesh",
    ],
    taughtAsSubject: [
      "Only route recorded is the third-language slot of the Three Language Formula",
      "That slot is Urdu or Sanskrit, on top of Hindi first and English second",
      "No school counts, enrolment or teacher numbers were furnished",
    ],
  },
},
{
  slug: "IN-AR", unit: "IN|Arunachal Pradesh", status: "partial",
  langs: ["Nyishi","Adi","Bengali","Bhoti","Sanskrit","English","Hindi"],
  langNotes: [
    "CLM writes Nissi/Dafla; WALS carries the language as 'Nyishi' (wals nis, iso njz)",
    "Adi (iso adi) has no WALS record; WALS code adi is Adioukrou, an unrelated Kwa language of Cote d'Ivoire",
    "Bhoti: WALS carries five Tibetan lects and the source names no variety, so the row is left unlinked rather than guessed",
    "Pali is named in the standing text; it has no WALS record by name or by ISO pli",
  ],
  evidence: [
    t(),
    m("The State Government has not furnished any information with regard to the educational facilities available to the linguistic minority students at Primary, Upper Primary, Secondary, Higher Secondary stages of education in the State."),
    s("The languages taught under the Three Language Formula are: First Language : English Hindi Second Language : Sanskrit/local dialects (Tribal)"),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "State has notified no language at all as a minority language",
      "CLM calls the tribal varieties 'local dialects (Tribal)' in the formula table",
    ],
    mediumOfInstruction: [
      "State furnished no educational-facility information for any stage in 2014-15",
      "Official language of the state is English, itself no one's mother tongue here",
    ],
    taughtAsSubject: [
      "Tribal languages sit in the third-language slot, sharing it with Sanskrit",
      "First language is English, second Hindi, in the state's own formula table",
      "No student numbers for classes VIII, X or XII were furnished",
    ],
  },
},
{
  slug: "IN-MN", unit: "IN|Manipur", status: "documented",
  langs: ["Meithei","Thadou","Naga (Tangkhul)","Kabui","English","Naga (Mao)","Mizo","Paite","Hmar","Poumai","Liangmei","Gangte","Vaiphei","Zou","Bengali","Nepali","Panjabi","Hindi"],
  langNotes: [
    "Thirteen recognised Tribal languages, listed in the state's own class-range table",
    "WALS carries none of Poumai, Liangmei, Gangte, Kom (iso kmm), Vaiphei or Zou",
    "Kom has NO ROW: querying the name Kom returns WALS's Kom of CAMEROON (wals kou, iso bkm, Niger-Congo Grassfields), a different language. Manipur's Kom is iso kmm and WALS carries no record for it",
    "CLM writes Manipuri, Rongmei, Hamar, Thadou-Kuki; WALS carries Meithei, Kabui, Hmar, Thadou",
  ],
  evidence: [
    t(),
    m("as far as the medium of education in the State (instruction and examination) is concerned, English and Manipuri are used from Class I to X; and English is continued as the medium beyond Class X"),
    s("It has also been informed that the following recognized Tribal languages are being taught as a subject at schools"),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "State's own category for the tribal languages is 'recognized Tribal languages'",
      "Thirteen of them are recognised for school teaching",
    ],
    mediumOfInstruction: [
      "No tribal language is a medium: only English and Manipuri, Class I to X",
      "Beyond Class X English alone continues as the medium",
      "Recognition for teaching does not extend to medium status here",
    ],
    taughtAsSubject: [
      "Thirteen recognised Tribal languages are taught as subjects from Class I",
      "Poumai, Liangmei and Gangte run to Class VIII; Mao and Rongmei to Class X",
      "Kom, Vaiphei, Mizo, Zou, Tangkhul, Hmar, Thadou-Kuki, Paite run to Class XII",
      "No sanctioned posts exist: any teacher whose mother tongue it is teaches it",
    ],
  },
},
{
  slug: "IN-MZ", unit: "IN|Mizoram", status: "documented",
  langs: ["Mizo","Bengali","Nepali","Chin (Mara)","Lai","Kokborok","Paite","Hmar","Hindi","English"],
  langNotes: [
    "Census names Lakher and Pawi; ISO mrh (Mara Chin, also called Lakher) is WALS 'Chin (Mara)' and ISO cnh is WALS 'Lai'",
    "Census names Tripuri, which is Kokborok (wals kok, iso trp)",
    "Mizo itself is the majority language here, not a minority one — it is the Three Language Formula first language",
  ],
  evidence: [
    t(),
    m("Details of the facility for learning minority language as a medium of instruction at"),
    s("Details of the facility for learning minority languages as a subject at the Primary"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Bengali and Nepali are the two minority media, at primary and upper primary",
      "Bengali medium: 54 primary and 17 upper primary schools",
      "Nepali medium: 10 primary and 3 upper primary schools",
      "Nothing at secondary: the state reports no minority medium beyond Class VIII",
    ],
    taughtAsSubject: [
      "Only Nepali is reported as a minority-language subject, in 2 primary schools",
      "Three Language Formula runs Mizo, English and Hindi in classes VIII, X, XII",
      "Language Preference Registers are not maintained in schools",
    ],
  },
},
{
  slug: "IN-TR", unit: "IN|Tripura", status: "documented",
  langs: ["Kokborok","Bengali","Hindi","Mog","Oriya","Bishnupriya Manipuri","Meithei","Halam","Garo","Chakma","Kuki-Mizo","Sanskrit","Arabic (Modern Standard)","English"],
  langNotes: [
    "Census writes Tripuri/Kokborok; WALS carries Kokborok (wals kok, iso trp)",
    "Mog: WALS has no record under that name; ISO rmz is 'Arakanese (Marma)', a different naming the source does not use, so the row is left unlinked",
    "Bishnupriya Manipuri (iso bpy), Halam and Chakma (iso ccp) have no WALS record; WALS code ccp is Cocopa, an unrelated Yuman language",
    "Kuki-Mizo is a group label in the state's own table, not a single language",
  ],
  evidence: [
    t(),
    m("It has been reported that no minority language is used as a medium of instruction at the Primary stage of education in the State."),
    s("Details of the facility for learning minority languages as a subject at the Primary stage of education are as follows"),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "State's own body is the Directorate of Kokborok and other minority languages",
      "Kokborok is an official language of the state alongside Bengali and English",
    ],
    mediumOfInstruction: [
      "No minority language is a medium at any stage, the state's own answer",
      "That holds even though Kokborok is 51 per cent of Dhalai district",
      "Teacher table records nil sanctioned and nil filled medium posts for Kokborok",
    ],
    taughtAsSubject: [
      "Primary subjects: Bishnupriya Manipuri, Chakma, Halam, Mog, Manipuri, Kuki-Mizo",
      "Kokborok appears as a subject only from upper primary, in 46 schools",
      "2,517 Kokborok subject-teacher posts sanctioned and all 2,517 filled",
      "Kokborok covered 2,832 pupils in Class VIII and nil in Classes X and XII",
    ],
  },
},
{
  slug: "IN-GJ", unit: "IN|Gujarat", status: "documented",
  langs: ["Gujarati","Hindi","Urdu","Marathi","Sindhi","Tamil","English"],
  evidence: [
    t(),
    m("Language Schools Students Teachers Urdu 20 6,755 213 Marathi 15 8,249 179 Sindhi 8 2,109 72 Tamil 2 855 9"),
    s("No information has been furnished about the minority languages being taught as a subject at the Higher Secondary Stage of education."),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Urdu, Marathi, Sindhi and Tamil are the reported minority media",
      "At higher secondary: Urdu 20 schools, Marathi 15, Sindhi 8, Tamil 2",
      "Textbooks for these media come from the Gujarat State Textbook Board",
    ],
    taughtAsSubject: [
      "Three Language Formula first language: Gujarati, Hindi, Marathi, English or Urdu",
      "Second language Gujarati or English; third language Hindi",
      "Class X coverage: Gujarati 62,456, Hindi 72,402, Urdu 173, Sindhi 4 pupils",
      "No subject information furnished at all for the higher secondary stage",
    ],
  },
},
{
  slug: "IN-KA", unit: "IN|Karnataka", status: "documented",
  langs: ["Kannada","Urdu","Telugu","Marathi","Tamil","Tulu","Konkani","Kodava","Malayalam","Beary"],
  langNotes: [
    "CLM writes Coorgi; WALS carries the language as 'Kodava' (wals kod, iso kfa)",
    "Beary has no WALS record, though the state funds a Karnataka Beary Sahithya Academy",
  ],
  evidence: [
    t(),
    m("Details of the facilities for using the minority languages as a medium of instruction at the Primary stage of education are as follows: Urdu 2,276"),
    s("Details of the facilities for learning the minority languages as a subject at the Primary stage of education are as follows: Urdu 27"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Four minority media: Urdu, Marathi, Tamil and Telugu",
      "Urdu is much the largest: 2,276 primary and 2,425 upper primary schools",
      "Marathi 331 primary schools, Tamil 31, Telugu 27",
      "No medium information furnished for the higher secondary stage",
    ],
    taughtAsSubject: [
      "As a subject the provision is far thinner than as a medium",
      "Urdu 27 primary schools; Urdu, Tamil and Telugu at upper primary",
      "Secondary stage: Urdu 166 schools and Tamil 5",
      "Academies exist for Urdu, Tulu and Beary among others",
    ],
  },
},
{
  slug: "IN-AN", unit: "IN|Andaman and Nicobar Islands", status: "documented",
  langs: ["Bengali","Hindi","Tamil","Telugu","Malayalam","Munda","Kharia"],
  langNotes: [
    "Nicobarese has NO ROW: WALS holds a lect and a genus both named Nicobarese, plus Nicobarese (Car) and Nancowry, and the census names no variety. Verified identifiers if a human wants to pick: lect wals nic / iso ncb; Nancowry wals nnc also carries iso ncb",
    "Munda resolves to WALS's Munda GENUS record, not to a single language, which is what the census name is too",
  ],
  evidence: [
    t(),
    m("Details of the facility for learning the minority languages as a medium of instruction at the Primary stage of education are as follows: Bengali 75 Tamil 11 Telugu 8"),
    s("Information has not been furnished about the facility for minority languages being taught as a subject at the Primary stage of education."),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "UT told the CLM that no language is declared a minority language there",
      "Provision nonetheless exists, which is the contradiction on this entry",
    ],
    mediumOfInstruction: [
      "Bengali, Tamil and Telugu are media at all four stages",
      "Primary: Bengali 75 schools, Tamil 11, Telugu 8",
      "Secondary: Bengali 11 schools, Tamil 9, Telugu 4",
      "Nothing reported for Nicobarese, Munda or Kharia at any stage",
    ],
    taughtAsSubject: [
      "No subject information was furnished at any of the four stages",
      "UT does not maintain Language Preference Registers in its schools",
    ],
  },
},
{
  slug: "IN-KL", unit: "IN|Kerala", status: "documented",
  langs: ["Malayalam","Tamil","Kannada","Urdu","Arabic (Modern Standard)","Sanskrit"],
  langNotes: ["Arabic and Sanskrit appear in Kerala's own minority-language subject tables; the row records the category the source uses"],
  evidence: [
    t(),
    m("Details of the facilities for using the minority languages as a medium of instruction at the Primary stage of education are as follows: Tamil 109 Kannada 91"),
    s("It has been informed that Sanskrit, Arabic and Urdu are taught as a subject at the Primary stage of education"),
  ],
  bullets: {
    localTerm: localTermBullets,
    mediumOfInstruction: [
      "Tamil and Kannada are the two minority media, and only those two",
      "Primary: Tamil 109 schools with 7,163 pupils, Kannada 91 with 10,721",
      "Upper primary: Tamil 34 schools, Kannada 45; nil at higher secondary",
      "Every one of those schools is also a grant-aided institution",
    ],
    taughtAsSubject: [
      "The subject languages are a different set: Sanskrit, Arabic and Urdu",
      "Arabic is by far the largest, 3,162 primary schools and 427,979 pupils",
      "Upper primary Arabic 1,619 schools, Sanskrit 1,743, Urdu 1,089",
      "Tamil and Kannada are media rather than subjects here",
    ],
  },
},
{
  slug: "IN-TN", unit: "IN|Tamil Nadu", status: "documented",
  langs: ["Tamil","Urdu","Telugu","Malayalam","Kannada","Hindi","Gujarati","Saurashtra","Rajasthani","Arabic (Modern Standard)"],
  langNotes: [
    "Saurashtra (iso saz) and Rajasthani (iso raj) appear in the state's minority-institution tables and have no WALS record",
  ],
  evidence: [
    t(),
    m("The details of the facility for using minority languages as a medium of instruction at Upper Primary stage of education"),
    s("Details of the facility for learning minority language(s) as a subject at Primary stage are as under: Urdu 170 Telugu 276 Kannada 15 Malayalam 29 Hindi 3"),
  ],
  bullets: {
    localTerm: [
      "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
      "Defined by mother tongue differing from the principal language of the State",
      "Tamil Nadu Learning Act 2006 made Tamil compulsory, which the CLM criticises",
    ],
    mediumOfInstruction: [
      "Six minority media: Urdu, Telugu, Malayalam, Kannada, Hindi and Gujarati",
      "Upper primary Urdu 46 schools, Telugu 67, Malayalam 10, Kannada 9",
      "Secondary and higher secondary schools add Hindi and Gujarati media",
      "Saurashtra and Rajasthani appear only in higher-education institution counts",
    ],
    taughtAsSubject: [
      "Primary subjects: Urdu 170 schools, Telugu 276, Kannada 15, Malayalam 29",
      "Language Preference Registers kept in 470 primary and 63 upper primary schools",
      "Arabic appears as a subject in secondary and higher secondary schools",
      "CLM found no state scheme to promote the minority languages",
    ],
  },
},
].forEach(write);
console.log(JSON.stringify(stats(), null, 1));
