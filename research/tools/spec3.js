const { write, stats } = require("./gen");

const U = {
  af: "https://www.constituteproject.org/constitution/Afghanistan_2004",
  acara: "https://www.acara.edu.au/docs/default-source/curriculum/20170118-australian_curriculum_languages_info_sheet.pdf?sfvrsn=2",
  vic: "https://content.sdp.education.vic.gov.au/media/languages-provision-in-victorian-government-schools-2020-pdf-1966",
  wa: "https://k10outline.scsa.wa.edu.au/__data/assets/pdf_file/0004/321754/Pre-primary-to-Year-10-Teaching,-Assessing-and-Reporting-Policy-and-Policy-Standards.PDF",
  ntpol: "https://education.nt.gov.au/media/docs/policies/curriculum,-assessment,-reporting-and-certification/curriculum-assessment-reporting-and-certification-policy-early-childhood-to-year-12.pdf",
  az: "https://education-profiles.org/northern-africa-and-western-asia/azerbaijan/~inclusion",
  bh: "https://education-profiles.org/northern-africa-and-western-asia/bahrain/~inclusion",
  fj: "https://www.constituteproject.org/constitution/Fiji_2013",
  ge: "https://matsne.gov.ge/en/document/view/29248",
  id: "https://www.flevin.com/id/lgso/translations/Laws/Law%20No.%2020%20of%202003%20on%20the%20National%20Education%20System%20(BKPM).pdf",
  iq: "https://education-profiles.org/northern-africa-and-western-asia/iraq/~inclusion",
  kg: "https://edu.gov.kg/media/uploads/2026/07/27/969-1-09072026-12.pdf",
  ki: "https://pacificdata.org/data/dataset/50b0ab36-417f-4bb7-b1c4-66f3b3ee9db2/resource/d4f16cdd-db3b-499c-88e5-43758b9a1c0c/download/national-curriculum-and-assessment-framework.pdf",
  kw: "https://education-profiles.org/northern-africa-and-western-asia/kuwait/~inclusion",
  kz: "https://adilet.zan.kz/rus/docs/V1200008170",
  lk: "https://www.parliament.lk/files/pdf/constitution.pdf",
  mh: "https://pacificdata.org/data/dataset/730a29ad-4063-445b-85d7-7587c77bf2f9/resource/9ee47dbb-54ea-45ea-b844-e683b37a3576/download/language-education-policy-2015.pdf",
  np: "https://www.unicef.org/nepal/media/21421/file/20240416Understanding%20the%20Impact%20of%20Languages%20and%20Language%20Policies%20on%20Children's%20Learning%20Outcomes%20in%20Nepal%20English%20version%20Final_PDF%20Print.pdf.pdf",
  nr: "https://media.unesco.org/sites/default/files/webform/ed3002/Nauru_National_Statement_of_Commitment.pdf",
  om: "https://education-profiles.org/northern-africa-and-western-asia/oman/~inclusion",
  pgrise: "https://www.pngpie.org/wp-content/uploads/2024/08/RISE-Vernacular-Language-Mapping-Report-2018.pdf",
  ph: "https://lawphil.net/statutes/repacts/ra2024/ra_12027_2024.html",
  ps: "https://education-profiles.org/northern-africa-and-western-asia/state-of-palestine/~inclusion",
  pw: "https://www.constituteproject.org/constitution/Palau_1992",
  qa: "https://education-profiles.org/northern-africa-and-western-asia/qatar/~inclusion",
  sb: "https://mehrd.gov.sb/documents?view=download&format=raw&fileId=17",
  to: "https://pacificdata.org/data/dataset/bcb5ef56-cee5-4426-a74c-b367e64d34e4/resource/4f6f165d-b17f-4383-897a-c36af2396391/download/education-act-2013.pdf",
  tr: "https://doi.org/10.2797/529032",
  tv: "https://meys.gov.tv/images/curriculum/1._Revised_Tuvaulu_National_Curriculum_Policy_Framework_TNCPF.pdf",
  vu: "https://www.constituteproject.org/constitution/Vanuatu_2013",
  ye: "https://education-profiles.org/northern-africa-and-western-asia/yemen/~inclusion",
};

[
{
  slug: "AF", unit: "AF|Afghanistan", status: "documented",
  langs: ["Pashto","Dari","Uzbek","Turkmen","Baluchi","Pashai","Nuristani","Pamiri"],
  langNotes: [
    "The eight languages Constitution art. 16 names before 'and other current languages in the country'",
    "Constitution spells them Uzbeki, Turkmani, Pachaie; WALS carries Uzbek, Turkmen and no Pashai record",
    "Pashai has no WALS record; note that WALS code psh is PASHTO, so a code-built link would be wrong",
    "Nuristani exists in WALS only as a genus, not as a single language; Pamiri is a group, not a lect",
  ],
  evidence: [
    { field: "localTerm", quote: "From amongst Pashto, Dari, Uzbeki, Turkmani, Baluchi, Pachaie, Nuristani, Pamiri and other current languages in the country, Pashto and Dari shall be the official languages of the state.", source: U.af },
    { field: "mediumOfInstruction", quote: "prepare the ground for teaching mother tongues in areas where they are spoken", source: U.af },
    { field: "taughtAsSubject", quote: "In areas where the majority of the people speak in any one of Uzbeki, Turkmani, Pachaie, Nuristani, Baluchi or Pamiri languages, any of the aforementioned language, in addition to Pashto and Dari, shall be the third official language", source: U.af },
  ],
  bullets: {
    localTerm: [
      "Constitution's own phrase is 'current languages in the country', not minority",
      "Six of them can become a third official language where locally in the majority",
      "State is bound to 'foster and develop all languages of Afghanistan'",
    ],
    mediumOfInstruction: [
      "Art 43 duty is only to 'prepare the ground for' mother-tongue teaching",
      "It is bounded to the areas where those mother tongues are spoken",
      "No constitutional article makes any of them a medium of instruction",
    ],
    taughtAsSubject: [
      "Third-official-language status is an administrative status, not a syllabus",
      "Constitution names no subject entitlement for any of the eight languages",
    ],
  },
},
{
  slug: "AU", unit: "AU|Australia", status: "partial",
  langs: [],
  langNotes: [
    "The national framework names no individual language: it is a framework for a whole category",
    "Named languages sit in the state and territory units instead — Noongar in WA, nine in Victoria, Kriol in the NT",
    "Australia's atlas inventory is 401; the curriculum engages the category, not a list",
  ],
  evidence: [
    { field: "localTerm", quote: "Framework for Aboriginal and Torres Strait Islander Languages", source: U.acara },
  ],
  bullets: {
    localTerm: [
      "National term is 'Aboriginal and Torres Strait Islander languages'",
      "The framework names a category, never particular languages",
      "Three pathways: first language learner, second language learner, language revival",
    ],
  },
},
{
  slug: "AU-NT", unit: "AU|Northern Territory", status: "documented",
  langs: [],
  langNotes: [
    "Kriol is the only language the CARC policy names, inside its glossary definition of Australian Aboriginal language, and it has NO ROW here",
    "WALS carries two Kriol lects, Kriol (Fitzroy Crossing) and Kriol (Ngukurr), both ISO rop; the guideline names no variety, so the row is left unlinked rather than guessed",
    "Every other focus language is negotiated school by school and so appears in no document",
  ],
  evidence: [
    { field: "localTerm", quote: "Australian Aboriginal language - May include a traditional language, creoles or Kriol and related varieties, or Aboriginal English.", source: U.ntpol },
    { field: "mediumOfInstruction", quote: "Schools delivering bilingual education must refer to the program statement for bilingual education and the bilingual education guideline.", source: U.ntpol },
    { field: "taughtAsSubject", quote: "The NT Indigenous Languages and Cultures curriculum (ILC) must be used when teaching Aboriginal languages in schools.", source: U.ntpol },
  ],
  bullets: {
    localTerm: [
      "Territory's term is 'Australian Aboriginal language', defined in policy glossary",
      "That definition covers traditional languages, creoles or Kriol, Aboriginal English",
      "Kriol is the only language the policy names, and only inside that definition",
    ],
    mediumOfInstruction: [
      "First Language - Bilingual is one of the six selectable NT ILC pathways",
      "Schools delivering it must follow a separate bilingual education guideline",
      "The policy itself sets no stage or year range for bilingual delivery",
    ],
    taughtAsSubject: [
      "NT ILC curriculum must be used when teaching Aboriginal languages in schools",
      "Pathway is selected in consultation with communities or language partners",
      "Pathways run from First Language to Language and Cultural Awareness",
    ],
  },
},
{
  slug: "AU-VIC", unit: "AU|Victoria", status: "documented",
  langs: ["Paakantyi","Bpangerang","Dhudhuroa","Gunai/Kurnai","Gundjamara","Taungurung","Wadawurrung","Woiwurrung","Yorta Yorta"],
  langNotes: [
    "The nine languages actually taught in Victorian government schools in 2020, from the department's own count",
    "Barkindji resolves through ISO drl to the WALS record named 'Paakantyi'",
    "WALS carries no record for Bpangerang, Dhudhuroa, Gunai/Kurnai, Gundjamara, Taungurung or Wadawurrung",
    "Six of nine unlinked is a fact about WALS coverage of south-eastern Australia, not about the languages",
  ],
  evidence: [
    { field: "localTerm", quote: "Aboriginal Languages taught included Barkindji; Bpangerang; Dhudhuroa; Gunai/Kurnai; Gundjamara; Taungurung; Wadawurrung; Woiwurrung, and Yorta Yorta.", source: U.vic },
    { field: "taughtAsSubject", quote: "Teaching Aboriginal languages in Victoria is centred on language reclamation, revival, and cultural studies.", source: U.vic },
  ],
  bullets: {
    localTerm: [
      "Department's term is 'Aboriginal Languages', counted as one language offering",
      "Nine distinct languages were actually taught in 2020",
    ],
    taughtAsSubject: [
      "Taught in 18 primary schools and one secondary school in 2020",
      "2,791 students, tenth place among all languages by enrolment",
      "Thirteen teachers across 1.6 pct of primary and 0.2 pct of secondary schools",
      "Five students completed an Aboriginal language to Year 12 Unit 4 in 2020",
    ],
  },
},
{
  slug: "AU-WA", unit: "AU|Western Australia", status: "documented",
  langs: ["Nyungar"],
  langNotes: ["WA writes Noongar; WALS carries the language as 'Nyungar' (wals nju, iso nys)"],
  evidence: [
    { field: "localTerm", quote: "Noongar", source: "entry standing text; cited there to " + U.wa },
  ],
  bullets: {
    localTerm: [
      "WA names the language itself, Noongar, rather than a category label",
      "WALS spells the same language Nyungar, which is why the link reads differently",
    ],
    taughtAsSubject: [
      "Noongar counts towards the second-language requirement, unusually among states",
    ],
  },
},
{
  slug: "AZ", unit: "AZ|Azerbaijan", status: "documented",
  langs: ["Azerbaijani","Russian","Georgian","Armenian"],
  langNotes: [
    "Armenian resolves only to the WALS genus record; WALS holds Eastern, Western and Iranian Armenian separately and the source names no variety",
    "WALS's Azerbaijani record carries no ISO code",
  ],
  evidence: [
    { field: "localTerm", quote: "ethnic languages", source: "entry standing text; cited there to " + U.az },
    { field: "mediumOfInstruction", quote: "Secondary education is delivered in Azerbaijani, Russian, Georgian and Armenian", source: "entry standing text; cited there to " + U.az },
  ],
  bullets: {
    localTerm: [
      "Term in the profile is 'ethnic languages', not minority or regional",
      "Russian belongs on this map here: it is a medium, not a foreign language",
    ],
    mediumOfInstruction: [
      "Four media of secondary instruction: Azerbaijani, Russian, Georgian, Armenian",
      "1992 Decree sets the conditions under which the others may be used",
      "Non-Azerbaijani-medium schools must still teach Azerbaijani language and literature",
      "They must also teach Azerbaijani history and geography",
    ],
  },
},
{
  slug: "BH", unit: "BH|Bahrain", status: "not-found",
  langs: [],
  langNotes: ["No language other than Arabic and English is named in any retrieved source for Bahrain"],
  evidence: [
    { field: "localTerm", quote: "No minority or community language provision found in the retrieved sources", source: "entry standing text; cited there to " + U.bh },
  ],
  bullets: {
    localTerm: [
      "No community, minority or heritage language category appears in the sources",
      "Constitution Art 7 frames instruction around pride in Arabism instead",
    ],
    mediumOfInstruction: [
      "No language other than Arabic is recorded as a medium in the retrieved sources",
    ],
    taughtAsSubject: [
      "No minority or community language subject is named in the retrieved sources",
    ],
  },
},
{
  slug: "FJ", unit: "FJ|Fiji", status: "documented",
  langs: ["Fijian","Fiji Hindi","English"],
  langNotes: [
    "The constitution's own names are iTaukei and Fiji Hindi; WALS carries the first as 'Fijian' (wals fij, iso fij)",
    "Fiji Hindi (iso hif) has no WALS record; WALS carries Hindi and Fijian but nothing for the Fiji variety",
  ],
  evidence: [
    { field: "localTerm", quote: "conversational and contemporary iTaukei and Fiji Hindi", source: "entry standing text; cited there to " + U.fj },
  ],
  bullets: {
    localTerm: [
      "Constitution names the languages directly: iTaukei and Fiji Hindi",
      "Its wording is 'conversational and contemporary', a spoken-competence framing",
      "iTaukei is the state's own name for the language WALS calls Fijian",
    ],
    mediumOfInstruction: [
      "No national rule: school committees decide the medium in practice",
      "2007 framework urges vernacular use but sets no stage or entitlement",
      "A 2019 review found the ministry had still not developed a language policy",
    ],
    taughtAsSubject: [
      "The 2007 framework names no vernacular subject at all",
    ],
  },
},
{
  slug: "GE", unit: "GE|Georgia", status: "documented",
  langs: ["Abkhaz","Georgian"],
  langNotes: [
    "Abkhazian is the only non-Georgian language the General Education Law names",
    "The law also makes Georgian Sign Language a language of instruction; WALS carries no record for it",
    "Azerbaijani, Armenian and Russian medium schools exist in Georgia but are not named in the retrieved statute",
  ],
  evidence: [
    { field: "localTerm", quote: "The citizens of Georgia, whose native language is not Georgian, shall have the right to acquire a complete general education in their native language in accordance with the National Curriculum, as provided for by the legislation.", source: U.ge },
    { field: "mediumOfInstruction", quote: "The language of instruction in general education institutions shall be Georgian, while in the Autonomous Republic of Abkhazia - Georgian or Abkhazian.", source: U.ge },
  ],
  bullets: {
    localTerm: [
      "Statute's category is citizens 'whose native language is not Georgian'",
      "Abkhazian is the only such language the law names, and only for Abkhazia",
      "Law also makes Georgian Sign Language a language of instruction",
    ],
    mediumOfInstruction: [
      "Right to a complete general education in one's native language, art. 4(3)",
      "In the Autonomous Republic of Abkhazia the medium is Georgian or Abkhazian",
      "Teaching the official language is mandatory in every such school",
      "In Abkhazia both official languages must be taught",
    ],
    taughtAsSubject: [
      "Official language is a mandatory subject group in the National Curriculum",
      "Official-language and social-studies subjects must be taught in Georgian",
      "In Abkhazia those subjects may be taught in Georgian and/or Abkhazian",
    ],
  },
},
{
  slug: "ID", unit: "ID|Indonesia", status: "partial",
  langs: [],
  langNotes: [
    "Law 20 of 2003 names no individual local language; it legislates the category 'local language'",
    "Indonesia's atlas inventory is 756, against a statute that names none of them",
  ],
  evidence: [
    { field: "localTerm", quote: "local languages", source: "entry standing text; cited there to " + U.id },
  ],
  bullets: {
    localTerm: [
      "Statutory category is 'local language', with no language named in the Act",
      "Local content is one of the ten mandatory curriculum components",
    ],
    mediumOfInstruction: [
      "Local languages may be the medium in the first two grades of primary only",
      "Use must reflect how much the language is actually used in that region",
    ],
  },
},
{
  slug: "IQ", unit: "IQ|Iraq", status: "documented",
  langs: ["Neo-Aramaic (Assyrian)","Armenian","Turkmen"],
  langNotes: [
    "Constitution art. 4 names Turkmen, Assyrian (Syriac) and Armenian as mother tongues taught in public schools",
    "Assyrian resolves to the WALS record 'Neo-Aramaic (Assyrian)' (wals nsy, iso aii)",
    "CAUTION for the atlas: WALS 'Turkmen' (wals tkm, iso tuk) is the Turkmenistan language, whereas Iraqi Turkmen is a South Azerbaijani variety — treat this link as the source's word, not a lect identification",
  ],
  evidence: [
    { field: "localTerm", quote: "constitutional mother tongues, not foreign languages", source: "entry standing text; cited there to " + U.iq },
    { field: "taughtAsSubject", quote: "Turkmen, Assyrian and Armenian are expected to be taught in public schools", source: "entry standing text; cited there to " + U.iq },
  ],
  bullets: {
    localTerm: [
      "Category is 'mother tongue', set by Constitution Art 4, not minority language",
      "2011 Ministerial Decree No. 22 carries the right into schooling",
    ],
    taughtAsSubject: [
      "Turkmen, Assyrian and Armenian are expected to be taught in public schools",
      "The entitlement is a mother-tongue right, not an elective foreign language",
    ],
  },
},
{
  slug: "KG", unit: "KG|Kyrgyzstan", status: "documented",
  langs: ["Russian","Kirghiz"],
  langNotes: ["The curriculum plan names Russian as a school subject in its own right; no other minority language is named in the retrieved plan","WALS carries the state language as 'Kirghiz' (wals kgz, iso kir); the name Kyrgyz has no WALS record, and the code kir is Kirma, an unrelated Gur language of Burkina Faso"],
  evidence: [
    { field: "localTerm", quote: "Under the Constitution Russian is an official language of the republic", source: "entry standing text; cited there to " + U.kg },
  ],
  bullets: {
    localTerm: [
      "Russian's category here is official language, not foreign or minority",
      "It is timetabled separately from the foreign-language slot",
    ],
    taughtAsSubject: [
      "Russian language and reading runs at 3 hours a week from grade 1",
      "It is not counted against the foreign-language allocation",
    ],
  },
},
{
  slug: "KI", unit: "KI|Kiribati", status: "documented",
  langs: ["Kiribati","English"],
  langNotes: ["The framework's own name for the language is 'Te Kiribati'; WALS carries it as 'Kiribati' (wals krb, iso gil)"],
  evidence: [
    { field: "localTerm", quote: "The school curriculum will promote the use of Te Kiribati and English languages for", source: U.ki },
    { field: "mediumOfInstruction", quote: "Schools will use a bilingual education approach that", source: U.ki },
    { field: "taughtAsSubject", quote: "English is not widely used in Kiribati social and commercial domains. Therefore English is treated as a foreign language and is taught as such.", source: U.ki },
  ],
  bullets: {
    localTerm: [
      "The system calls the language Te Kiribati, using its own name for it",
      "It is the first language, and English is treated as the foreign one",
    ],
    mediumOfInstruction: [
      "Bilingual approach in Te Kiribati and English across the school curriculum",
      "Framework calls this a maintenance model, not a transition to English",
      "Aim is proficiency in both, not replacement of the first language",
    ],
    taughtAsSubject: [
      "Te Kiribati is a named learning area in the curriculum framework",
      "English is taught as a foreign language, the framework's own words",
    ],
  },
},
{
  slug: "KW", unit: "KW|Kuwait", status: "not-found",
  langs: [],
  langNotes: ["No indigenous or community language is named for Kuwait in any retrieved source"],
  evidence: [
    { field: "localTerm", quote: "Constitution Art 29 bars discrimination by language but confers no language right", source: "entry standing text; cited there to " + U.kw },
  ],
  bullets: {
    localTerm: [
      "No minority, community or heritage language category exists in the sources",
      "Art 29 bars discrimination by language without granting a language right",
    ],
    mediumOfInstruction: [
      "Arabic is the only language of instruction at every level",
    ],
    taughtAsSubject: [
      "English is the sole additional language, taught to all children",
      "Classical Arabic is itself counted a second language for every pupil",
    ],
  },
},
{
  slug: "KZ", unit: "KZ|Kazakhstan", status: "documented",
  langs: ["Kazakh","Russian","Uyghur","Uzbek","Tajik"],
  langNotes: ["WALS's Uzbek record carries no ISO code; a separate Uzbek (Northern) record exists and the model plans name no variety"],
  evidence: [
    { field: "localTerm", quote: "Separate model plans exist for Uighur, Uzbek and Tajik language classes", source: "entry standing text; cited there to " + U.kz },
    { field: "mediumOfInstruction", quote: "Russian-medium primary plans timetable Kazakh; Kazakh-medium plans timetable Russian", source: "entry standing text; cited there to " + U.kz },
  ],
  bullets: {
    localTerm: [
      "Russian's category here is second state language, not foreign language",
      "Uighur, Uzbek and Tajik classes each have their own model curriculum plan",
    ],
    mediumOfInstruction: [
      "Separate model plans exist for Uighur, Uzbek and Tajik language classes",
      "That makes those three media of instruction, not just subjects",
      "Kazakh-medium and Russian-medium plans each timetable the other language",
    ],
    taughtAsSubject: [
      "Second state language is timetabled separately from the foreign language",
    ],
  },
},
{
  slug: "LK", unit: "LK|Sri Lanka", status: "documented",
  langs: ["Sinhala","Tamil"],
  evidence: [
    { field: "localTerm", quote: "Both are national languages under Constitution art. 19, not foreign ones", source: "entry standing text; cited there to " + U.lk },
  ],
  bullets: {
    localTerm: [
      "Both are national languages under Constitution art. 19",
      "Neither is a minority or foreign language in the system's own terms",
      "The pairing is symmetrical: each is the other community's second language",
    ],
    taughtAsSubject: [
      "Second national language is introduced as a subject from Grade 3",
      "Tamil for Sinhala-medium pupils, Sinhala for Tamil-medium pupils",
      "Oral Sinhala or Tamil starts earlier, from Grade 1",
    ],
  },
},
{
  slug: "MH", unit: "MH|Marshall Islands", status: "documented",
  langs: ["Marshallese","English"],
  evidence: [
    { field: "localTerm", quote: "the constitution provides that in case of difference the Marshallese text prevails", source: "entry standing text; cited there to " + U.mh },
  ],
  bullets: {
    localTerm: [
      "System names the language directly, Marshallese, not a category",
      "Constitution gives the Marshallese text priority where the two differ",
    ],
    mediumOfInstruction: [
      "The 2015 policy replaced a transitional policy handing over to English at grade five",
    ],
  },
},
{
  slug: "NP", unit: "NP|Nepal", status: "documented",
  langs: ["Maithili","Limbu","Bhojpuri","Bajjika","Newari (Kathmandu)","Magar","Gurung","Tharu","Awadhi","Doteli","Nepali"],
  langNotes: [
    "The eleven languages the Language Commission recommended for provincial official use, alongside Nepali",
    "Bajjika (iso bjj), Tharu (iso thl) and Doteli (iso dty) have no WALS record",
    "Newar resolves to WALS 'Newari (Kathmandu)'; the source writes Newar (Nepal Bhasa)",
    "Awadhi is WALS awd; the code awa is Awa, an unrelated Papuan language, so a code-built link would be wrong",
    "Tamang is one of the eleven but has NO ROW: WALS carries only 'Tamang (Eastern)' (wals tam, iso taj) and the source names no variety",
    "Eleven named against 124 mother tongues recorded in the 2078 census",
  ],
  evidence: [
    { field: "localTerm", quote: "the Language Commission recently recommended 11 languages to be used for official purposes", source: U.np },
    { field: "taughtAsSubject", quote: "The list of languages recommended for province-level official use, alongside of Nepali", source: U.np },
  ],
  bullets: {
    localTerm: [
      "Constitution treats all mother tongues spoken in Nepal as languages of the nation",
      "A constitutionally recognised Language Commission decides official-use status",
      "Eleven languages recommended for province-level official use alongside Nepali",
    ],
    taughtAsSubject: [
      "The local-subject slot is the only route for teaching any mother tongue",
      "Most schools use those periods for extra English instead",
      "124 mother tongues recorded in the 2078 census; eleven have official status",
    ],
  },
},
{
  slug: "NR", unit: "NR|Nauru", status: "partial",
  langs: ["Nauruan"],
  langNotes: ["Nauruan is named only in a UN statement of commitment, never in the Education Act 2011"],
  evidence: [
    { field: "localTerm", quote: "A 2022 statement to the UN lists Nauruan studies among pedagogic priorities", source: "entry standing text; cited there to " + U.nr },
  ],
  bullets: {
    localTerm: [
      "Nauruan is named directly, in a UN commitment statement rather than in law",
      "The Education Act 2011 contains the word 'language' zero times",
    ],
    mediumOfInstruction: [
      "No retrieved document states the place of Nauruan as a medium",
      "Absence here is a finding: the statute has no medium-of-instruction provision",
    ],
    taughtAsSubject: [
      "Only 'Nauruan studies', listed among pedagogic priorities, is documented",
      "No retrieved document states Nauruan's place as a school subject",
    ],
  },
},
{
  slug: "OM", unit: "OM|Oman", status: "partial",
  langs: ["Swahili","Baluchi","Jibbali","Lawati"],
  langNotes: [
    "Named as spoken languages of Oman, not as school subjects",
    "The profile's Jabali is Jibbali/Shehri (wals jib, iso shv); Lawati (Luwati) has no WALS record",
  ],
  evidence: [
    { field: "localTerm", quote: "Other spoken languages in Oman include Swahili, Baluchi, Lawati and Jabali", source: "entry standing text; cited there to " + U.om },
  ],
  bullets: {
    localTerm: [
      "Profile's category is 'other spoken languages', never minority or heritage",
      "They are listed as facts about the population, not as school provision",
    ],
    mediumOfInstruction: [
      "No mother-tongue instruction provision found in the retrieved sources",
    ],
    taughtAsSubject: [
      "None of the four is named as a school subject in the retrieved sources",
    ],
  },
},
{
  slug: "PG", unit: "PG|Papua New Guinea", status: "documented",
  langs: ["Tok Pisin","Hiri Motu","English"],
  langNotes: [
    "PNG's three national languages, named as such in the RISE mapping report",
    "Hiri Motu (iso hmo) has no WALS record; WALS code hmo is Hmong Njua and WALS 'Motu' (mtu, iso meu) is the other language, so neither would be a correct link",
    "The vernaculars themselves are not named in policy: RISE counted 148 in three provinces alone, against a national inventory of 899",
  ],
  evidence: [
    { field: "localTerm", quote: "one of PNG's three national languages alongside English and Hiri Motu", source: U.pgrise },
    { field: "mediumOfInstruction", quote: "in their local language or community lingua franca (with English introduced orally towards the end of", source: U.pgrise },
  ],
  bullets: {
    localTerm: [
      "Policy category is 'vernacular', or 'tok ples' in the older Tok Ples Skuls",
      "Tok Pisin, Hiri Motu and English are the three national languages",
      "Individual vernaculars are named by communities, not by the ministry",
    ],
    mediumOfInstruction: [
      "1999 circular required teaching in the local language or community lingua franca",
      "English was introduced orally only towards the end of that stage",
      "The 2015 standards-based elementary curriculum ended that arrangement",
    ],
    taughtAsSubject: [
      "The 2015 curriculum kept a vernacular language syllabus alongside an English one",
    ],
  },
},
{
  slug: "PH", unit: "PH|Philippines", status: "documented",
  langs: ["Tagalog","Cebuano","Hiligaynon","Waray-Waray","Maranao","Ibanag","Ivatan","Aklanon","Yakan","Surigaonon"],
  langNotes: [
    "Ten of the nineteen mother tongues introduced as media; the entry's own text names these ten",
    "Waray resolves to WALS 'Waray-Waray' (wwy, iso war); WALS also holds 'Waray (in Australia)', an unrelated Gunwinyguan language",
    "The entry writes Ybanag; WALS carries it as 'Ibanag' (ibn, iso ibg)",
    "Surigaonon (iso sgd) has no WALS record",
  ],
  evidence: [
    { field: "localTerm", quote: "mother tongue", source: "entry standing text; cited there to " + U.ph },
    { field: "mediumOfInstruction", quote: "Nineteen mother tongues had been introduced as media of instruction", source: "entry standing text; cited there to " + U.ph },
  ],
  bullets: {
    localTerm: [
      "System's own term is 'mother tongue', as in mother tongue-based education",
      "Nineteen were introduced, twelve from 2012-13 and seven more from 2013-14",
    ],
    mediumOfInstruction: [
      "They were media of instruction, not merely subjects, from 2012-13",
      "RA 12027 leaves them available only as an option in monolingual classes",
      "That is a demotion from medium to optional aid, not an outright repeal",
    ],
  },
},
{
  slug: "PS", unit: "PS|Palestine", status: "documented",
  langs: ["Hebrew (Modern)"],
  langNotes: [
    "Hebrew is the only language besides Arabic named in the profile, and it is called a second language",
    "WALS holds Hebrew (Modern) and Hebrew (Modern Ashkenazic); the profile names no variety, so the standard modern record is used",
  ],
  evidence: [
    { field: "localTerm", quote: "Source calls Hebrew a second language, never a minority or regional language", source: "entry standing text; cited there to " + U.ps },
  ],
  bullets: {
    localTerm: [
      "Hebrew's category is second language, never minority or regional",
      "No language internal to Palestine is named in the profile at all",
    ],
    taughtAsSubject: [
      "Hebrew is learned as a second language from the third grade on",
      "Rationale given is social mobility, higher education and shared citizenship",
    ],
  },
},
{
  slug: "PW", unit: "PW|Palau", status: "documented",
  langs: ["Sonsorol-Tobi","English"],
  langNotes: [
    "Palauan has NO ROW: WALS holds a lect and a genus BOTH named Palauan, so the tool will not choose. Verified identifiers if a human wants to pick: lect wals pal / iso pau. Note WALS code pau is Paumari, an unrelated Arauan language of Brazil",
    "The bill's Sonsorolese and Hatohobeian are the two lects of the WALS record 'Sonsorol-Tobi' (son, iso sov)",
  ],
  evidence: [
    { field: "localTerm", quote: "The constitution makes the Palauan traditional languages the national languages", source: "entry standing text; cited there to " + U.pw },
  ],
  bullets: {
    localTerm: [
      "Constitution's phrase is 'Palauan traditional languages' as national languages",
      "Palauan and English are the official languages under the same article",
      "Southwest island languages are named separately, Sonsorolese and Hatohobeian",
    ],
    mediumOfInstruction: [
      "Not law: a bill making Palauan the K-3 medium passed the House in April 2026",
      "That bill would let southwest island schools use Sonsorolese or Hatohobeian",
    ],
  },
},
{
  slug: "QA", unit: "QA|Qatar", status: "not-found",
  langs: [],
  langNotes: ["No linguistic or ethnic minority, and so no language, is named for Qatar in the retrieved sources"],
  evidence: [
    { field: "localTerm", quote: "PEER records no explicit mention of any linguistic or ethnic minorities", source: "entry standing text; cited there to " + U.qa },
  ],
  bullets: {
    localTerm: [
      "No linguistic or ethnic minority is explicitly mentioned in the profile",
      "2017-22 strategy frames other cultures as respect, not language provision",
    ],
    mediumOfInstruction: [
      "No language other than Arabic is recorded as a medium in the sources",
    ],
  },
},
{
  slug: "SB", unit: "SB|Solomon Islands", status: "documented",
  langs: ["Pijin","English"],
  langNotes: [
    "Pijin (Solomon Islands Pijin, iso pis) has no WALS record; WALS code pis is Pisa, an unrelated Trans-New Guinea language of Papua",
    "The individual vernaculars are not named: the guidelines legislate the category",
  ],
  evidence: [
    { field: "localTerm", quote: "The curriculum counts Pijin among the vernacular languages of the country", source: "entry standing text; cited there to " + U.sb },
  ],
  bullets: {
    localTerm: [
      "Category is 'vernacular', and Pijin is counted as one of the vernaculars",
      "No individual vernacular language is named in the guidelines",
    ],
    mediumOfInstruction: [
      "Pilot guidelines only, not a national rollout, which qualifies all of this",
      "Vernacular is the language of instruction for the early childhood years",
      "Pijin may be chosen where a class has speakers of many languages",
    ],
  },
},
{
  slug: "TO", unit: "TO|Tonga", status: "partial",
  langs: ["Tongan","English"],
  langNotes: ["Tongan is not named in the retrieved Education Act; the Act requires enforcement of a national language policy that the 2023 framework still calls forthcoming"],
  evidence: [
    { field: "localTerm", quote: "The Education Act requires enforcing the national language policy", source: "entry standing text; cited there to " + U.to },
  ],
  bullets: {
    localTerm: [
      "No local term recorded: the Act refers to a language policy, not to a language",
      "The 2023 curriculum framework still calls that policy forthcoming",
    ],
    mediumOfInstruction: [
      "No medium-of-instruction rule found in the retrieved sources",
      "Absence here is the finding: the policy the Act points to does not yet exist",
    ],
  },
},
{
  slug: "TR", unit: "TR|Türkiye", status: "not-found",
  langs: [],
  langNotes: ["No indigenous or regional language of Turkiye is named in the retrieved steering documents"],
  evidence: [
    { field: "localTerm", quote: "Neither officially recognised nor named in steering documents", source: "entry standing text; cited there to " + U.tr },
  ],
  bullets: {
    localTerm: [
      "No category exists: such languages are neither recognised nor named",
      "Absence of a name in the steering documents is itself the finding",
    ],
  },
},
{
  slug: "TV", unit: "TV|Tuvalu", status: "documented",
  langs: ["Tuvaluan","English"],
  langNotes: ["The framework names Tuvaluan and English only; the languages and dialects of the other islands are referred to but not named"],
  evidence: [
    { field: "localTerm", quote: "The languages and dialects of the 6 islands of Tuvalu are paramount to the sustenance of the cultures of her people.", source: U.tv },
    { field: "taughtAsSubject", quote: "There are 2 main languages used in Tuvalu and will be offered in all schools. Tuvaluan language and English language will be taught from the early primary years up to form 7.", source: U.tv },
  ],
  bullets: {
    localTerm: [
      "Framework's phrase is 'the languages and dialects of the 6 islands'",
      "Only Tuvaluan is actually named; the island varieties are not",
      "Tuvaluan is called the first language of the people in most of the islands",
    ],
    taughtAsSubject: [
      "Tuvaluan Language is a learning area in Years 1-8 and Years 9-13",
      "It is offered in all schools alongside English, from early primary to form 7",
      "Language and culture is a cross-cutting theme from early childhood to TVET",
    ],
  },
},
{
  slug: "VU", unit: "VU|Vanuatu", status: "documented",
  langs: ["Bislama","English","French"],
  langNotes: [
    "The constitution names Bislama; the vernacular languages it protects are not individually named",
    "Vanuatu's own count of local languages is not given in the retrieved documents",
  ],
  evidence: [
    { field: "localTerm", quote: "The constitution makes Bislama the national language and protects local languages", source: "entry standing text; cited there to " + U.vu },
  ],
  bullets: {
    localTerm: [
      "Constitution's category is 'local languages', with Bislama the national one",
      "Bislama is named; the local languages are protected but never listed",
    ],
    mediumOfInstruction: [
      "Vernacular or Bislama is used from Year 1, transitioning by Year 3",
      "The 2020 policy states classroom teaching shall be in English and French",
      "The same policy lets the ministry allow vernacular languages to be taught",
    ],
  },
},
{
  slug: "YE", unit: "YE|Yemen", status: "partial",
  langs: ["Soqotri","Mehri","Arabic (San'ani)"],
  langNotes: [
    "Listed as spoken varieties, not as taught subjects",
    "The profile's Sanaani is the WALS record 'Arabic (San'ani)' (ars, iso ayn), one of 21 Arabic lects in WALS",
  ],
  evidence: [
    { field: "localTerm", quote: "Listed as spoken varieties, not as taught subjects", source: "entry standing text; cited there to " + U.ye },
  ],
  bullets: {
    localTerm: [
      "Profile's category is spoken varieties, with no school category attached",
      "Sokotri and Mehri are non-Arabic Semitic languages, each about 0.3 pct",
      "Most listed varieties are regional Arabics, led by Sanaani at 41.2 pct",
    ],
    mediumOfInstruction: [
      "No mother-tongue instruction provision found in the retrieved source",
    ],
    taughtAsSubject: [
      "Neither Sokotri nor Mehri is named as a school subject in the source",
    ],
  },
},
].forEach(write);
console.log(JSON.stringify(stats(), null, 1));
