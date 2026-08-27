const { write, stats } = require("./gen");
const un = c => "https://www.unicef.org/esa/sites/unicef.org.esa/files/2018-09/UNICEF-" + c + ".pdf";
const UN = (c, y) => ({ label: "UNICEF ESARO, 'The impact of language policy and practice on children's learning: Evidence from Eastern and Southern Africa' - " + c + " country review (" + y + ")", url: un(y + "-Language-and-Learning-" + c), http: 200, tier: "secondary-source" });
const peer = (r, c) => "https://education-profiles.org/" + r + "/" + c + "/~inclusion";
const PEER = (r, c, name) => ({ label: "UNESCO Profiles Enhancing Education Reviews (PEER), " + name + " - Inclusion", url: peer(r, c), http: 200, tier: "secondary-source" });
const NA = "northern-africa-and-western-asia", SSA = "sub-saharan-africa";
const BERBER_GENUS = "The source says only 'Tamazight' or 'Amazigh', naming no variety, so the WALS genus row 'Berber' [genus-berber] is used. WALS carries eight named Berber varieties - Middle Atlas (which is Central Atlas Tamazight, ISO tzm), Rif, Ayt Seghrouchen, Chaouia, Figuig, Mzab, Wargla and Siwa - plus Kabyle, Tashlhiyt, Tamashek and three Tuareg lects.";

write({ unit: "DZ|Algeria", slug: "DZ", status: "documented",
  sources: [PEER(NA, "algeria", "Algeria"), { label: "Loi n. 08-04 du 23 janvier 2008 portant loi d'orientation sur l'education nationale, art. 34 (Journal officiel de la Republique algerienne)", url: "https://www.joradp.dz/FTP/jo-francais/2008/F2008004.pdf", http: 200, tier: "official-document" }],
  langs: ["Berber"],
  langNotes: [BERBER_GENUS],
  evidence: [
    { field: "localTerm", quote: "The Constitution respects the rights of linguistic minorities by teaching Tamazight as a national language.", source: peer(NA, "algeria") },
    { field: "localTerm", quote: "Tamazight est egalement langue nationale et officielle", source: "entry standing text, Constitution art. 4" },
    { field: "taughtAsSubject", quote: "pour repondre a la demande exprimee", source: "entry standing text, loi 08-04 art. 34" }
  ],
  bullets: {
    localTerm: ["Constitution art. 4: 'langue nationale et officielle' - national AND official", "PEER frames the same provision as a linguistic-minority right", "The two framings sit badly together and both are in the sources"],
    taughtAsSubject: ["Loi 08-04 art. 34 introduces it only to answer demand expressed", "An Academy is tasked with realising official status 'a terme'"]
  } });

write({ unit: "EG|Egypt", slug: "EG", status: "documented", sources: [PEER(NA, "egypt", "Egypt")],
  langs: ["Nobiin", "Berber (Siwa)"],
  langNotes: ["The profile says 'the Nubian language' without a variety. Nobiin [nob, iso fia] is the main Nile Nubian language of southern Egypt; WALS also carries Nubian (Dongolese), Nubian (Kunuz) and a Nubian genus row. The choice is editorial.", "'the Berber language, spoken mainly in the Siwa Oasis' is WALS 'Berber (Siwa)' [bsi, iso siz], an exact territorial match."],
  evidence: [
    { field: "languages", quote: "No mention is made of any of the country's indigenous languages, such as the Nubian language, spoken widely in the South of Egypt, or the Berber language, spoken mainly in the Siwa Oasis in Western Egypt.", source: peer(NA, "egypt") },
    { field: "taughtAsSubject", quote: "The Arabic language, religious education, and national history in all its stages are core subjects of pre-university public and private education.", source: peer(NA, "egypt") },
    { field: "mediumOfInstruction", quote: "In universities, the system is more flexible, although in principle classical Arabic remains the language of instruction.", source: peer(NA, "egypt") }
  ],
  bullets: {
    localTerm: ["'the country's indigenous languages' is the profile's only category for them", "Neither carries any status in the constitutional text PEER reviews"],
    mediumOfInstruction: ["Arabic is the medium; neither language has any role recorded"],
    taughtAsSubject: ["Neither is mentioned at all in the 2014 Constitution, per PEER", "Arabic is a core subject at every pre-university stage"]
  },
  note: "This is a documented absence with named languages, which is more useful than a documented absence without them: PEER states which two indigenous languages the constitutional text passes over." });

write({ unit: "ER|Eritrea", slug: "ER", status: "documented", sources: [UN("Eritrea", 2017)],
  langs: ["Tigré", "Qafar", "bej", "Bilin", "Saho", "Nara (in Ethiopia)", "Tigrinya"],
  langNotes: [
    "The source's 'Nera' is Nara; WALS names it 'Nara (in Ethiopia)' [nar, iso nrb] although it is spoken in Eritrea. The name is WALS's, not the source's.",
    "SPECTACULAR TRAP, worth recording: WALS code 'tig' is TIGRINYA while ISO 639-3 tig is TIGRE, and WALS code 'tir' is Tiriyo of Amazonia while ISO tir is Tigrinya. The two languages' codes are crossed between the two schemes. Both rows here were resolved by name against WALS, not by code.",
    "Kunama is named by the source but NO ROW IS WRITTEN: 'Kunama' matches a WALS language record, a family row and a genus row alike, and its WALS code knm collides with ISO knm, which is Canamari of Brazil. The tool refuses on both paths and the refusal is reported rather than overridden.",
    "Afar resolves as WALS 'Qafar' [qaf]. Beja is queried as ISO bej because the bare name matches both the language and the genus row."
  ],
  evidence: [
    { field: "mediumOfInstruction", quote: "The policy mandates that all nine indigenous languages, with a total of three scripts, are to be used as languages of instruction in the first five years of primary school.", source: un("2017-Language-and-Learning-Eritrea") },
    { field: "languages", quote: "As of 2008, seven languages have been introduced in the primary school curriculum: Tigre, Afar, Beja, Bilin, Saho, Kunama and Nera", source: un("2017-Language-and-Learning-Eritrea") },
    { field: "mediumOfInstruction", quote: "The Eritrean language used in a given school is based on the dominant language of the area.", source: un("2017-Language-and-Learning-Eritrea") },
    { field: "taughtAsSubject", quote: "English is the medium of instruction in post-primary education, and Arabic is taught as a subject at both primary and secondary levels.", source: un("2017-Language-and-Learning-Eritrea") }
  ],
  bullets: {
    localTerm: ["'indigenous languages' and 'Eritrean language' are the review's terms", "The national policy names all nine, written in three scripts"],
    mediumOfInstruction: ["Media of instruction for the first five years of primary school", "Which one a school uses follows the dominant language of its area", "Seven of the nine had reached the curriculum as of 2008", "English takes over as the medium in post-primary education"],
    taughtAsSubject: ["Arabic is taught as a subject at primary and secondary alike"]
  },
  note: "Seven of the nine are named by the source. Tigrinya is added here because the review treats it as one of the nine; Kunama is named by the source but cannot be resolved by the WALS tool without overriding two separate refusals." });

write({ unit: "ET|Ethiopia", slug: "ET", status: "partial", sources: [UN("Ethiopia", 2016)],
  langs: ["Amharic"],
  evidence: [
    { field: "localTerm", quote: "all Ethiopian languages shall enjoy equal state recognition, and that each member state of the Federation shall determine its own respective official language or languages", source: un("2016-Language-and-Learning-Ethiopia") },
    { field: "mediumOfInstruction", quote: "Ethiopia's 1994 Education and Training Policy further states that primary education is to be given in nationality languages", source: un("2016-Language-and-Learning-Ethiopia") },
    { field: "mediumOfInstruction", quote: "the underlying assumption of the policy is that the nationality language is the mother tongue of all children who live in the area where that language is spoken", source: un("2016-Language-and-Learning-Ethiopia") }
  ],
  bullets: {
    localTerm: ["'nationality languages' - the term the 1994 policy uses", "All Ethiopian languages enjoy equal state recognition under the Constitution", "Each member state of the Federation sets its own official language"],
    mediumOfInstruction: ["Primary education is to be given in nationality languages", "The policy assumes the nationality language is the local mother tongue", "Instruction in different languages preceded the 1994 policy that allowed it"]
  },
  note: "The country review names only Amharic. Because the question is devolved to each member state, the source has no list to give; the languages are set regionally and this document does not enumerate them." });

write({ unit: "GA|Gabon", slug: "GA", status: "partial", sources: [PEER(SSA, "gabon", "Gabon")],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "states that the State shall adopt French as the official working language and shall promote the national languages in the education system", source: peer(SSA, "gabon") },
    { field: "taughtAsSubject", quote: "curricula, training provision, infrastructure, and teaching and training facilities must, to this end, allow the appropriation of knowledge and skills in [...] local languages at the various levels.", source: peer(SSA, "gabon") },
    { field: "languages", quote: "nine main ethnolinguistic groups: the Fangs, the Mpongwe, the Mbede, the Punu, the Bandjabi, the Bakota, the Obamba and the Bateke", source: peer(SSA, "gabon") }
  ],
  bullets: {
    localTerm: ["'national languages' in the Constitution, 'local languages' in the 2011 Act", "The profile names ethnolinguistic groups, never a language as such"],
    taughtAsSubject: ["Curricula must allow the appropriation of skills in local languages", "Act No. 21/2011 art. 5 covers this at the various levels"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The profile names nine main ethnolinguistic GROUPS - the Fangs, the Mpongwe and so on - but never names a language as a school language. Group names are not language names and are not converted into rows here." });

write({ unit: "GH|Ghana", slug: "GH", status: "documented",
  sources: [{ label: "Language Policy in Africa (LPiA) 1(2), 2025, article 3", url: "https://doi.org/10.36950/lpia-01-02-2025-3", http: 200, tier: "secondary-source" }],
  langs: ["Akan", "Dagbani", "Dagaare", "Dangme", "Ewe", "ga", "Gonja", "Kasem", "Nzema"],
  langNotes: [
    "Akan is entered once, not three times: the source's Asante-Twi, Akuapem-Twi and Fante are its varieties, and WALS carries none of the three by name or ISO code (twi, fat both miss). WALS's unit is 'Akan' [akn, iso aka].",
    "Ga is queried as its WALS code 'ga' - the bare name is two letters, below the tool's four-character floor for partial matching, and WALS spells the name 'Ga' with a tilde.",
    "Dangme (ISO ada), Gonja (gjn) and Nzema (nzi) have no WALS record on name or ISO code. NOTE THE TRAP: WALS code 'ada' is Adamorobe Sign Language - a Ghanaian language, but not this one."
  ],
  evidence: [
    { field: "localTerm", quote: "Nine indigenous languages are 'government-sponsored' - developed for basic education", source: "entry standing text, from https://doi.org/10.36950/lpia-01-02-2025-3" }
  ],
  bullets: {
    localTerm: ["'government-sponsored languages' is the term of art, for nine of them", "Developed specifically for use in basic education"],
    mediumOfInstruction: ["Which one a school uses depends on the region it is in"]
  } });

write({ unit: "GM|Gambia", slug: "GM", status: "partial", sources: [PEER(SSA, "gambia", "Gambia")],
  langs: [],
  evidence: [
    { field: "mediumOfInstruction", quote: "English is the formal language of instruction, although about 10 indigenous languages are used in informal contexts across the country.", source: peer(SSA, "gambia") },
    { field: "taughtAsSubject", quote: "promoted the use of the local language during the first three years of basic education and as a school subject onwards. The policy intended to introduce the teaching of the five most commonly used languages", source: peer(SSA, "gambia") },
    { field: "localTerm", quote: "the Ministry of Basic and Secondary Education (MoBSE) has developed and validated training manuals on orthographies of the five languages and established a national technical advisory committee on national languages.", source: peer(SSA, "gambia") }
  ],
  bullets: {
    localTerm: ["Three terms in one profile: 'indigenous', 'local' and 'national languages'", "A national technical advisory committee on national languages exists"],
    mediumOfInstruction: ["English is the formal language of instruction", "Local language use was promoted for the first three years of basic education", "About 10 indigenous languages are used in informal contexts"],
    taughtAsSubject: ["The local language becomes a school subject after the first three years", "The policy targeted the five most commonly used languages"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The profile refers four separate times to 'the five most commonly used languages' and to 'the five languages' whose orthography manuals were validated, and never names one of the five." });

write({ unit: "GN|Guinea", slug: "GN", status: "documented",
  sources: [{ label: "UNESCO IBE, 'Cadre d'orientation curriculaire - Republique de Guinee', 28 September 2023", url: "https://www.ibe.unesco.org/sites/default/files/medias/fichiers/2023/10/COC%20R%C3%A9publique%20de%20Guin%C3%A9e%20Version%2028%2009%2023%20V3_0.pdf", http: 200, tier: "official-document" }],
  langs: ["Maninka", "Fula (Guinean)", "Susu"],
  langNotes: ["The source's 'Pular' is WALS 'Fula (Guinean)' [fgu, iso fuf); its 'Sosso' is WALS 'Susu' [sus]. Both names are WALS's, not the source's."],
  evidence: [
    { field: "languages", quote: "langues nationales Maninka, Pular et Sosso", source: "https://www.ibe.unesco.org/sites/default/files/medias/fichiers/2023/10/COC%20R%C3%A9publique%20de%20Guin%C3%A9e%20Version%2028%2009%2023%20V3_0.pdf" },
    { field: "localTerm", quote: "rehabiliter les langues nationales en les introduisant dans le systeme educatif", source: "https://www.ibe.unesco.org/sites/default/files/medias/fichiers/2023/10/COC%20R%C3%A9publique%20de%20Guin%C3%A9e%20Version%2028%2009%2023%20V3_0.pdf" },
    { field: "mediumOfInstruction", quote: "les pratiques de la lecture-ecriture et calcul (30 mn) dans les langues nationales codifiees, les systemes d'ecritures locales (N'ko, Adjami) ou en francais", source: "https://www.ibe.unesco.org/sites/default/files/medias/fichiers/2023/10/COC%20R%C3%A9publique%20de%20Guin%C3%A9e%20Version%2028%2009%2023%20V3_0.pdf" }
  ],
  bullets: {
    localTerm: ["'langues nationales' - and only Maninka, Pular and Sosso are named", "Only the codified ones can carry literacy work, per the framework"],
    mediumOfInstruction: ["Preschool uses national languages as the medium of communication", "Literacy and numeracy work uses codified national languages", "Written in the local N'ko and Adjami scripts, or else in French"],
    taughtAsSubject: ["National languages sit inside the primary languages curriculum domain"]
  } });

write({ unit: "GQ|Equatorial Guinea", slug: "GQ", status: "not-found", sources: [PEER(SSA, "equatorial-guinea", "Equatorial Guinea")],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "lists the official languages of the Republic of Equatorial Guinea as Spanish, French and any others established by law. Indigenous languages are recognized as part of national culture.", source: peer(SSA, "equatorial-guinea") }
  ],
  bullets: {
    localTerm: ["'indigenous languages', recognised as part of national culture", "Recognition is cultural, with no curriculum consequence stated"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The whole of the profile's treatment of language is the single sentence quoted above. Fang, Bubi and Annobonese are not named anywhere in it." });

write({ unit: "GW|Guinea-Bissau", slug: "GW", status: "documented", sources: [PEER(SSA, "guinea-bissau", "Guinea-Bissau")],
  langs: ["Fula (Guinean)", "Mandinka", "Guinea Bissau Crioulo"],
  langNotes: [
    "Balanta and Papel are named by the source but NO ROW IS WRITTEN for either. 'Balanta' matches both a WALS language record and a genus row, and its WALS code blz collides with ISO blz, which is Balantak of Sulawesi - the tool refuses on both paths. Papel (ISO pbo) has no WALS record at all.",
    "Manjaku is written by an explicit human pick: the bare name matches the language record and the genus row alike, and its code mjk collides with ISO mjk, Matukar of Papua New Guinea. The language-level record the tool printed was taken.",
    "The source lists ETHNIC GROUPS, not languages. Fula, Mandinga and Manjaco are mapped to the languages of those groups; Creole is named separately as a language."
  ],
  picks: [{ id: "mjk", at: 2 }],
  evidence: [
    { field: "languages", quote: "82% of the population of Guinea-Bissau belongs to 5 ethnic groups: Fula, Balanta, Mandinga, Manjaco and Papel.", source: peer(SSA, "guinea-bissau") },
    { field: "localTerm", quote: "Creole is the most widely used language in the country.", source: peer(SSA, "guinea-bissau") },
    { field: "mediumOfInstruction", quote: "The National Literacy and Non-Formal Education Policy ... seeks to develop a language policy document and promote Portuguese, Creole and national languages as languages of education, learning and professional qualification.", source: peer(SSA, "guinea-bissau") }
  ],
  bullets: {
    localTerm: ["'national languages', set apart from Portuguese and Creole in the policy", "Portuguese is official but spoken by officials and a small segment only"],
    mediumOfInstruction: ["Creole is the most widely used language in the country", "The literacy policy seeks to promote it and national languages as languages of education", "A language policy document is still to be developed"]
  } });

write({ unit: "KE|Kenya", slug: "KE", status: "partial", sources: [UN("Kenya", 2016)],
  langs: ["Swahili"],
  langNotes: ["Swahili resolves as WALS 'Swahili' [swa, iso swh]. NOTE THE TRAP: 'swa' is BOTH the WALS code for Swahili and, in ISO 639-3, the macrolanguage code - here the two happen to agree, which they usually do not."],
  evidence: [
    { field: "mediumOfInstruction", quote: "Policy names the language of the catchment area as the medium in Grades 1 to 3", source: "entry standing text, from " + un("2016-Language-and-Learning-Kenya") },
    { field: "taughtAsSubject", quote: "English and Swahili are to be taught as subjects alongside it", source: "entry standing text, from " + un("2016-Language-and-Learning-Kenya") }
  ],
  bullets: {
    localTerm: ["'the language of the catchment area' - a territorial rule, not a named list", "Swahili is a national and official language, not a minority one"],
    mediumOfInstruction: ["The catchment-area language is the medium in Grades 1 to 3", "In practice English is used as the medium even in Grade 1"],
    taughtAsSubject: ["English and Swahili are both taught as subjects alongside it"]
  },
  note: "The policy is deliberately open-ended: it names no language, only the rule that the school uses the language of its catchment area. Only Swahili is named, and as a subject." });

write({ unit: "KM|Comoros", slug: "KM", status: "documented", sources: [UN("Comoros", 2017)],
  langs: ["Comorian"],
  langNotes: ["Shikomor resolves as WALS 'Comorian' [com, iso swb]. The same WALS record serves for Shimaore in Mayotte, which Eurydice names in the France entry."],
  evidence: [
    { field: "localTerm", quote: "Shikomor is the official language under the 2001 Constitution", source: "entry standing text, from " + un("2017-Language-and-Learning-Comoros") },
    { field: "mediumOfInstruction", quote: "Shikomor's use remains primarily oral, for want of a stable written form", source: "entry standing text, from " + un("2017-Language-and-Learning-Comoros") }
  ],
  bullets: {
    localTerm: ["Shikomor is the official language; French and Arabic are the national ones", "The usual African ordering is inverted here, and deliberately so"],
    mediumOfInstruction: ["Use remains primarily oral, for want of a stable written form"]
  },
  note: "Comoros reverses the usual African pattern: the indigenous language is OFFICIAL and the two colonial and liturgical languages are the NATIONAL ones. Record the source's category, not the expected one." });

write({ unit: "LR|Liberia", slug: "LR", status: "partial", sources: [PEER(SSA, "liberia", "Liberia")],
  langs: [],
  evidence: [
    { field: "taughtAsSubject", quote: "the primary language of instruction is English; one local language is recommended to be taught at the basic education level, while French is introduced in secondary schools.", source: peer(SSA, "liberia") },
    { field: "mediumOfInstruction", quote: "established mother tongue-based bilingual education programmes in communities where children do not speak English in the home or community.", source: peer(SSA, "liberia") }
  ],
  bullets: {
    localTerm: ["'local language' in the curriculum rule, 'mother tongue' in the programmes", "Neither term is attached to a named language in the profile"],
    mediumOfInstruction: ["English is the primary language of instruction", "Mother tongue-based bilingual programmes exist where children lack English"],
    taughtAsSubject: ["One local language is RECOMMENDED at basic education level", "A recommendation rather than a requirement, in the wording read"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The profile says 'one local language' without saying which, and without saying who chooses it." });

write({ unit: "LS|Lesotho", slug: "LS", status: "documented", sources: [UN("Lesotho", 2016)],
  langs: ["Sesotho"],
  evidence: [
    { field: "localTerm", quote: "English and Sesotho are both official under the Constitution, Chapter 1, Section 3", source: "entry standing text, from " + un("2016-Language-and-Learning-Lesotho") }
  ],
  bullets: {
    localTerm: ["Sesotho is an official language, not a minority or regional one", "The country is essentially monolingual in Sesotho"],
    mediumOfInstruction: ["Both official languages are used in schools", "The constraint is parental demand for English, not linguistic diversity"]
  } });

write({ unit: "LY|Libya", slug: "LY", status: "documented", sources: [PEER(NA, "libya", "Libya")],
  langs: ["Berber", "Tubu", "Tuareg (Ghat)"],
  langNotes: [
    BERBER_GENUS,
    "'Tebu' resolves as WALS 'Tubu' [tbu], which carries NO ISO code in WALS. NOTE THE TRAP: Teda's ISO code tuq and Daza's dzg both miss entirely.",
    "'Tuareg' is unqualified in the source. WALS carries Tuareg (Ghat), Tuareg (Ahaggar) and Tuareg (Air); Ghat is the Libyan lect and is used here, which is an editorial narrowing of what the source says."
  ],
  evidence: [
    { field: "languages", quote: "It recognizes the rights of cultural and linguistic groups in Libya, such as the Amazigh, Tebu and Tuareg, to teach and learn their languages", source: peer(NA, "libya") },
    { field: "taughtAsSubject", quote: "Amazigh is approved for teaching 'in the areas where it is spoken'", source: "entry standing text, Ministry Decree No. 18 of 2013 as reported by PEER" }
  ],
  bullets: {
    localTerm: ["'cultural and linguistic groups' - the framing is group rights, not language status", "Amazigh, Tebu and Tuareg are the three the decree names"],
    taughtAsSubject: ["Amazigh approved for teaching in the areas where it is spoken", "The three groups may teach their languages 'by choice'", "Territorial and optional, not the official-language framing Morocco uses"]
  },
  note: "Ministry Decree No. 18 of 2013 was not read directly; PEER's report of it is the source." });

write({ unit: "MA|Morocco", slug: "MA", status: "documented",
  sources: [PEER(NA, "morocco", "Morocco"), { label: "Loi-cadre n. 51-17 relative au systeme d'education, de formation et de recherche scientifique, arts. 31-32 (Bulletin officiel 6944)", url: "https://www.sgg.gov.ma/Portals/0/BO/2020/BO_6944_Fr.pdf?ver=2020-12-24-133647-943", http: 200, tier: "official-document" }],
  langs: ["Berber"],
  langNotes: [BERBER_GENUS],
  evidence: [
    { field: "localTerm", quote: "Arabic and Amazigh (Berber) are the two official languages of Morocco, but French is widely used in professional life.", source: peer(NA, "morocco") },
    { field: "mediumOfInstruction", quote: "Article 31 stipulates that the Arabic language is adopted 'as the foundational language of instruction' and that the Amazigh language will be increasingly used in schools within a 'clear national framework and in harmony with the provisions of the Constitution, since it is an official language of the State, and is a shared asset for all Moroccans without exception.'", source: peer(NA, "morocco") },
    { field: "taughtAsSubject", quote: "Art. 31 requires foreign schools in Morocco to teach Arabic and Amazigh", source: "entry standing text, loi-cadre 51-17" }
  ],
  bullets: {
    localTerm: ["Amazigh is an OFFICIAL language of the State, not a minority one", "'a shared asset for all Moroccans without exception', loi-cadre art. 31"],
    mediumOfInstruction: ["Arabic is the foundational language of instruction", "Amazigh is to be increasingly used within a clear national framework", "Art. 32 promises only 'generalisation progressive'"],
    taughtAsSubject: ["Foreign schools in Morocco must teach Arabic and Amazigh", "That duty covers all Moroccan children studying in them"]
  },
  note: "Morocco is the strongest official-status framing in the African set, and Libya the weakest, for what is the same language family. The contrast is the point." });

console.log(JSON.stringify(stats(), null, 1));
