const { write, stats } = require("./gen");
const un = c => "https://www.unicef.org/esa/sites/unicef.org.esa/files/2018-09/UNICEF-" + c + ".pdf";
const UN = (c, y) => ({ label: "UNICEF ESARO, 'The impact of language policy and practice on children's learning: Evidence from Eastern and Southern Africa' - " + c + " country review (" + y + ")", url: un(y + "-Language-and-Learning-" + c), http: 200, tier: "secondary-source" });
const peer = (r, c) => "https://education-profiles.org/" + r + "/" + c + "/~inclusion";
const PEER = (r, c, name) => ({ label: "UNESCO Profiles Enhancing Education Reviews (PEER), " + name + " - Inclusion", url: peer(r, c), http: 200, tier: "secondary-source" });
const NA = "northern-africa-and-western-asia", SSA = "sub-saharan-africa";

write({ unit: "MG|Madagascar", slug: "MG", status: "documented", sources: [UN("Madagascar", 2017)], langs: ["Malagasy"],
  langNotes: ["Malagasy resolves as WALS 'Malagasy' [mal, iso plt] - Plateau Malagasy, the standard variety. NOTE THE TRAP: WALS code 'mlg' is Malgwa, a Chadic language of Nigeria."],
  evidence: [{ field: "localTerm", quote: "Malagasy is the national language, a variety spoken by 77% of citizens", source: "entry standing text, from " + un("2017-Language-and-Learning-Madagascar") }],
  bullets: {
    localTerm: ["'national language' - and it is the majority language, spoken by 77%", "This is the African usage of the term, not the European one"],
    mediumOfInstruction: ["The 2008 review was prompted by primary leavers unable to function in French"]
  } });

const ML = "https://www.gpekix.org/sites/default/files/Media%20Document/PRODEC-2-Mali2019-2028.pdf";
write({ unit: "ML|Mali", slug: "ML", status: "documented",
  sources: [{ label: "Republique du Mali, Programme decennal de developpement de l'education et de la formation professionnelle deuxieme generation (PRODEC 2) 2019-2028", url: ML, http: 200, tier: "official-document" }],
  langs: ["Bambara", "Fulfulde (Maasina)", "Koyra Chiini", "Tamashek"],
  langNotes: ["PRODEC 2 names language AREAS, not languages: 'les aires linguistiques bamanan, fulfulde, songhay et tamasheq'. Bamanan is WALS 'Bambara' [bam]; songhay is a cluster and WALS's Malian member 'Koyra Chiini' [kch, iso khq], the Timbuktu variety, is used, which narrows what the source says; tamasheq is WALS 'Tamashek' [tsk, iso taq]. WALS also carries a Songhay genus row and a Songhay family row."],
  evidence: [
    { field: "mediumOfInstruction", quote: "nationale /francais dans les ecoles fondamentales des aires linguistiques bamanan, fulfulde, songhay et tamasheq", source: ML },
    { field: "localTerm", quote: "la realisation d'etudes sociolinguistiques pour les aires linguistiques bamanan, fulfulde, songhay", source: ML }
  ],
  bullets: {
    localTerm: ["'aires linguistiques' - language areas, the unit PRODEC 2 plans by", "The languages themselves are 'langues nationales' paired with French"],
    mediumOfInstruction: ["A bilingual national-language and French curriculum in ecoles fondamentales", "Phase I targets the bamanan, fulfulde, songhay and tamasheq areas", "Rollout is gated on sociolinguistic studies and teacher numbers per language"]
  } });

write({ unit: "MR|Mauritania", slug: "MR", status: "documented", sources: [PEER(SSA, "mauritania", "Mauritania")],
  langs: ["Pulaar", "Soninke"],
  picks: [{ id: "wlf" }],
  langNotes: ["Wolof is written by an explicit human pick: the bare name matches both the WALS language record and the Wolof genus row, and the code path is guarded. The language-level record the tool printed was taken - Wolof [wals wlf, iso wol]. NOTE THE TRAP: WALS code 'wol' is Woleaian, a Micronesian language.", "Arabic is named as a national language by the same article but no row is written for it: it is also the sole official language and the medium of instruction, so it belongs on the other maps."],
  evidence: [
    { field: "localTerm", quote: "article 6 of the 1991 Constitution, which specifies that the 'national languages' are Arabic, Fula, Soninke and Wolof, and that Arabic is the official language", source: peer(SSA, "mauritania") },
    { field: "taughtAsSubject", quote: "while 'allowing, if needed, teaching in foreign languages, as well as the promotion of national languages (Fula, Soninke and Wolof).'", source: peer(SSA, "mauritania") },
    { field: "mediumOfInstruction", quote: "Arabic education is provided in Arabic or in the Hassaniya dialect, which places children from these communities at a disadvantage.", source: peer(SSA, "mauritania") }
  ],
  bullets: {
    localTerm: ["'national languages': Arabic, Fula, Soninke and Wolof, Constitution art. 6", "Arabic alone of the four is also the official language", "The label covers the majority language and three minority ones alike"],
    mediumOfInstruction: ["Constitutional, not curricular: PEER names no school programme in these", "Arabic education is given in Arabic or in the Hassaniya dialect"],
    taughtAsSubject: ["Higher education is to promote Fula, Soninke and Wolof", "The three are named for promotion, not for a school programme"]
  } });

write({ unit: "MU|Mauritius", slug: "MU", status: "documented",
  sources: [PEER(SSA, "mauritius", "Mauritius"), { label: "Mauritius Institute of Education, Curriculum departments (Asian Language & Kreol)", url: "https://web.mie.ac.mu/curriculum.html", http: 200, tier: "official-document" }],
  langs: ["Mauritian Creole", "Bhojpuri", "Kreol Rodrige"],
  langNotes: ["Kreol Morisien resolves as WALS 'Mauritian Creole' [mcr, iso mfe]. Kreol Rodrige, named by the Mauritius Institute of Education alongside it, has no WALS record.", "PEER spells the second language 'Bhojuri'; it is Bhojpuri, WALS [bho, iso bho]."],
  evidence: [
    { field: "taughtAsSubject", quote: "as an optional language for teaching and learning, alongside Arabic and other Asian languages. Bhojuri, an ancestral local language, was introduced in grade 1.", source: peer(SSA, "mauritius") },
    { field: "localTerm", quote: "Asian Language & Kreol", source: "https://web.mie.ac.mu/curriculum.html" }
  ],
  bullets: {
    localTerm: ["PEER calls Bhojpuri 'an ancestral local language'", "The MIE curriculum department is named 'Asian Language & Kreol'", "Kreol Rodrige is listed beside Kreol Morisien as a separate language"],
    taughtAsSubject: ["Kreol Morisien is an OPTIONAL language under the 2010-15 programme", "It sits alongside Arabic, Hindi, Marathi, Tamil and Urdu as a choice", "Bhojpuri was introduced in grade 1"]
  } });

write({ unit: "MW|Malawi", slug: "MW", status: "documented", sources: [UN("Malawi", 2016)],
  langs: ["Chichewa", "Yao (in Malawi)", "Citumbuka"],
  langNotes: ["Citumbuka has no WALS record on that name or on its ISO code tum. NOTE THE TRAP: WALS code 'tum' is Tumleo, an Austronesian language of Papua New Guinea.", "Ciyao resolves as WALS 'Yao (in Malawi)' [yao] - one of the rare cases where the WALS code and the ISO code agree. Chinyanja/Chichewa is WALS 'Chichewa' [cic, iso nya]; NOTE THE TRAP: WALS code 'nya' is Nyawaygi, an Australian language."],
  evidence: [
    { field: "languages", quote: "Three Malawian languages have since gained prominence: Chinyanja, Ciyao, and Citumbuka", source: un("2016-Language-and-Learning-Malawi") },
    { field: "localTerm", quote: "In 1968, the annual Convention of the ruling Malawi Congress Party recommended that Chinyanja be adopted as a national language, that its name be changed to Chichewa", source: un("2016-Language-and-Learning-Malawi") },
    { field: "mediumOfInstruction", quote: "The 1996 'three plus or minus' formula puts the mother tongue as medium", source: "entry standing text, from " + un("2016-Language-and-Learning-Malawi") }
  ],
  bullets: {
    localTerm: ["'national language' was conferred on Chinyanja in 1968, and it was renamed", "The review calls the three simply 'Malawian languages'"],
    mediumOfInstruction: ["Mother tongue as medium in Standards 1 to 4, in all schools", "The 1996 'three plus or minus' formula sets that boundary"]
  } });

write({ unit: "MZ|Mozambique", slug: "MZ", status: "partial", sources: [UN("Mozambique", 2017)], langs: [],
  evidence: [
    { field: "localTerm", quote: "Art. 5 of the 1990 Constitution values national languages while keeping Portuguese official", source: "entry standing text, from " + un("2017-Language-and-Learning-Mozambique") },
    { field: "mediumOfInstruction", quote: "Ethnologue lists 43 languages for Mozambique.", source: un("2017-Language-and-Learning-Mozambique") }
  ],
  bullets: {
    localTerm: ["'national languages', valued by Constitution art. 5 while Portuguese stays official", "The 1990 text was the first time the question reached the Constitution at all"],
    mediumOfInstruction: ["A 1992 education decree first raised using African languages in education", "Neither instrument was binding - 'enabling' rather than mandatory"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The country review names no Mozambican language as a school language. It records that Ethnologue lists 43 languages for the country and that only 7% of Mozambicans spoke Portuguese at independence." });

write({ unit: "NA|Namibia", slug: "NA", status: "partial", sources: [UN("Namibia", 2017)], langs: [],
  evidence: [
    { field: "mediumOfInstruction", quote: "mother tongues were designated as media of education and instruction at the lower primary level", source: un("2017-Language-and-Learning-Namibia") },
    { field: "mediumOfInstruction", quote: "The current language policy from 2003 closely follows the policy of 1992; mother tongue instruction is compulsory in primary grades up to Grade 3, after which English becomes the medium of instruction.", source: un("2017-Language-and-Learning-Namibia") }
  ],
  bullets: {
    localTerm: ["'mother tongues' and 'Namibian languages' - no named list in the review", "Afrikaans is treated as the colonial language English replaced"],
    mediumOfInstruction: ["Mother-tongue instruction is compulsory in primary up to Grade 3", "English becomes the medium after that", "Attempts to extend mother tongue to Grade 7 in 2008 drafting failed"],
    taughtAsSubject: ["A Readathon each September promotes reading in all Namibian languages"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The review names only Afrikaans, and only as the colonial language displaced by English. It records that Ethnologue lists 30 languages for Namibia and names none of them as a school language." });

const NG = "https://world-education-blog.org/2026/04/22/unlocking-potential-amid-nigerias-return-to-english-only-education/";
write({ unit: "NG|Nigeria", slug: "NG", status: "partial",
  sources: [{ label: "World Education Blog (GEM Report), 'Unlocking potential amid Nigeria's return to English-only education', 22 April 2026. NOT RETRIEVED: the live URL returns 403 to a scripted request with a browser user-agent and referer, and the Internet Archive copy returned 503 on two attempts", url: NG, http: 403, tier: "secondary-source" }],
  langs: [],
  evidence: [
    { field: "mediumOfInstruction", quote: "Over 500 languages, and no current medium-of-instruction role for any of them", source: "entry standing text (source itself not retrievable in this session)" }
  ],
  bullets: {
    localTerm: ["'indigenous languages' is the term the entry attributes to the 2022 policy"],
    mediumOfInstruction: ["No current medium-of-instruction role for any of the 500-plus languages", "The 2022 mother-tongue policy was reversed on examination results"]
  },
  note: "NO LANGUAGE ROWS WRITTEN, AND THE SOURCE WAS NOT READ. The cited blog post 403s live and its archive copy 503s; the bullets rest on the entry's own standing text, which names no language. Nigeria has the largest language inventory of any unit in this set and the entry engages with none by name - but that should be re-verified against a retrievable source." });

write({ unit: "RW|Rwanda", slug: "RW", status: "documented", sources: [UN("Rwanda", 2017)], langs: ["Kinyarwanda"],
  evidence: [{ field: "mediumOfInstruction", quote: "Kinyarwanda is the medium in P1, P2 and P3", source: "entry standing text, from " + un("2017-Language-and-Learning-Rwanda") }],
  bullets: {
    localTerm: ["Kinyarwanda is the national language and near-universally spoken", "No minority-language designation exists alongside it"],
    mediumOfInstruction: ["The medium of instruction in P1, P2 and P3"]
  } });

const SC = "https://belombrepri.edu.sc/wp-content/uploads/2024/02/Seychelles-National-Curriculum-Framework-SR.pdf";
write({ unit: "SC|Seychelles", slug: "SC", status: "documented",
  sources: [{ label: "Ministry of Education (Seychelles), Seychelles National Curriculum Framework", url: SC, http: 200, tier: "official-document" }, PEER(SSA, "seychelles", "Seychelles")],
  langs: ["Seychelles Creole"],
  langNotes: ["Kreol Seselwa resolves as WALS 'Seychelles Creole' [sey, iso crs]."],
  evidence: [
    { field: "mediumOfInstruction", quote: "the Ministry of Education's Language Policy(1998) which specifies that Kreol is the medium for teaching and learning in the early childhood years. From the beginning of Key Stage 2 (P3) English becomes the medium for certain subjects while all three languages are taught in the school curriculum", source: SC },
    { field: "mediumOfInstruction", quote: "Creole is the medium of instruction in Creche, P1 and P2; English is the language of instruction from P3 onwards.", source: peer(SSA, "seychelles") },
    { field: "localTerm", quote: "In spite of being a small society Seychelles has a rich diversity of languages. Kreol, English and French in our national curriculum.", source: SC }
  ],
  bullets: {
    localTerm: ["Kreol here is a national language and a medium, not a minority option", "The country's policy is described as tri-lingual: Kreol, English, French", "PEER files the medium-of-instruction rule under 'Ethnic and linguistic groups'"],
    mediumOfInstruction: ["Kreol is the medium in Creche, P1 and P2", "From Key Stage 2 (P3) English becomes the medium for certain subjects"],
    taughtAsSubject: ["All three languages are taught in the school curriculum as subjects"]
  } });

write({ unit: "SD|Sudan", slug: "SD", status: "partial", sources: [PEER(NA, "sudan", "Sudan")], langs: [],
  evidence: [
    { field: "localTerm", quote: "All indigenous languages of Sudan are national languages and shall be respected, developed and promoted. ... Arabic, as a major language at the national level and English shall be the ... languages of instruction for higher education.", source: peer(NA, "sudan") },
    { field: "taughtAsSubject", quote: "children belonging to ethnic, religious or linguistic minorities have the right to celebrate their culture, to publicly announce and practise their religion and to use their language", source: peer(NA, "sudan") },
    { field: "languages", quote: "describes 100 diverse dialects of Nilo-Hamitic, Sudanic languages, especially among the northern Nubians, and in Darfur, the Nuba Mountains, Blue Nile and the Eastern Sudan region.", source: peer(NA, "sudan") }
  ],
  bullets: {
    localTerm: ["'All indigenous languages of Sudan are national languages', 2005 Interim Const. art. 8", "The widest such clause in the African set - it names no language because it covers all"],
    mediumOfInstruction: ["Arabic and English are the languages of instruction for higher education", "The constitutional guarantee does not reach school-level medium of instruction"],
    taughtAsSubject: ["The 2010 Child Act art. 2(f) gives minority children the right to use their language"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The provision is category-wide by design: every indigenous language is a national language, so the source lists none. It refers to regions - northern Nubia, Darfur, the Nuba Mountains, Blue Nile, Eastern Sudan - not to languages. The entry also flags that this cites the 2005 Interim Constitution, whose current status is unverified." });

write({ unit: "SL|Sierra Leone", slug: "SL", status: "partial", sources: [PEER(SSA, "sierra-leone", "Sierra Leone")], langs: [],
  evidence: [
    { field: "localTerm", quote: "amended in 2008, promotes the learning of indigenous languages", source: peer(SSA, "sierra-leone") },
    { field: "taughtAsSubject", quote: "reaffirms the support of local languages, introducing them as new subjects in the curriculum", source: peer(SSA, "sierra-leone") },
    { field: "mediumOfInstruction", quote: "recognizes that about one-fifth of pupils can be categorized as minority language speakers, yet English is the only language promoted in the curriculum.", source: peer(SSA, "sierra-leone") }
  ],
  bullets: {
    localTerm: ["Three terms in one profile: 'indigenous', 'local' and 'minority' languages", "About a fifth of pupils are recorded as minority language speakers"],
    mediumOfInstruction: ["The sector plan concedes English is the only language promoted"],
    taughtAsSubject: ["The 2004 Education Act introduced local languages as curriculum subjects", "Constitution art. 9.3, as amended in 2008, promotes learning them"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The profile names no Sierra Leonean language anywhere - not Mende, Temne, Limba or Krio - despite three separate instruments promoting 'local languages'." });

write({ unit: "SO|Somalia", slug: "SO", status: "documented", sources: [UN("Somalia", 2016)], langs: ["Somali"],
  evidence: [
    { field: "mediumOfInstruction", quote: "The current language policies in Somaliland, Puntland and South Central Somalia differ, although all three aim at using Somali as the medium of instruction in primary grades.", source: un("2016-Language-and-Learning-Somalia") },
    { field: "localTerm", quote: "its official languages are Somali and Arabic", source: un("2016-Language-and-Learning-Somalia") }
  ],
  bullets: {
    localTerm: ["Somali is an official language, alongside Arabic - not a minority one", "Three zones with three policies and one shared aim"],
    mediumOfInstruction: ["All three zones aim at Somali as the medium in primary grades", "South Central cites fears the language could disappear as a medium"]
  } });

write({ unit: "SS|South Sudan", slug: "SS", status: "documented", sources: [UN("South-Sudan", 2016)], langs: ["Bari", "Dinka"],
  langNotes: ["Bari resolves as WALS 'Bari' [bar, iso bfa]. NOTE THE TRAP: 'bar' is also the ISO 639-1-style code commonly used for Bavarian; WALS's ID is what matters here and it carries ISO bfa."],
  evidence: [
    { field: "mediumOfInstruction", quote: "The General Education Strategy Paper 2012-2017 commits to mother-tongue medium", source: "entry standing text, from " + un("2016-Language-and-Learning-South-Sudan") },
    { field: "languages", quote: "The project combines mother tongue literacy materials, recorded lessons, digital audio players and teacher capacity building in Bari- and Dinka-speaking communities.", source: un("2016-Language-and-Learning-South-Sudan") }
  ],
  bullets: {
    localTerm: ["'mother tongue' is the strategy paper's term throughout"],
    mediumOfInstruction: ["Mother-tongue medium in primary Grades 1 to 3", "How the initiatives will be supported and coordinated is unclear"]
  },
  note: "Bari and Dinka are named only as the communities a donor-funded reading project worked in, not as languages the policy designates. That distinction is preserved here." });

write({ unit: "SZ|Eswatini", slug: "SZ", status: "documented", sources: [PEER(SSA, "eswatini", "Eswatini")], langs: ["Swati"],
  langNotes: ["siSwati resolves as WALS 'Swati' [swt, iso ssw]."],
  evidence: [
    { field: "mediumOfInstruction", quote: "recognizes both SiSwati and English as official languages. While this implies that either language may be used as language of instruction, SiSwati can be used as a medium of instruction for the first four school grades if learners have difficulty understanding English.", source: peer(SSA, "eswatini") }
  ],
  bullets: {
    localTerm: ["siSwati is an official language alongside English, not a minority one"],
    mediumOfInstruction: ["A medium for the first four grades where learners struggle with English", "Conditional permission, not a mandate: 'if learners have difficulty'"],
    taughtAsSubject: ["The 2011 sector policy expects all children to learn siSwati"]
  } });

write({ unit: "TD|Chad", slug: "TD", status: "not-found", sources: [PEER(SSA, "chad", "Chad")], langs: [],
  evidence: [{ field: "localTerm", quote: "Term counts in retrieved body: 'national language' 0, 'mother tongue' 0", source: "entry standing text, counted against " + peer(SSA, "chad") }],
  bullets: {
    localTerm: ["No term for Chad's other languages appears in the profile at all", "Only French and Arabic appear, and only as the two official languages"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Confirmed independently in this session: a regex over the retrieved Chad profile for Amazigh, Berber, Tamazight, 'national language', 'indigenous language' and 'mother tongue' returns nothing at all." });

const TG = "https://www.iosrjournals.org/iosr-jhss/papers/Vol.29-Issue12/Ser-4/E2912046470.pdf";
write({ unit: "TG|Togo", slug: "TG", status: "documented",
  sources: [{ label: "IOSR Journal of Humanities and Social Science 29(12) ser. 4, on Ewe and Kabiye in the Togolese education system", url: TG, http: 200, tier: "secondary-source" }],
  langs: ["kbp", "Ewe"],
  langNotes: ["Kabiye is queried as ISO kbp because WALS spells the name 'Kabiye' with an acute accent, which the tool's name normalisation does not bridge. It resolves to WALS 'Kabiye' [kby, iso kbp]."],
  evidence: [
    { field: "localTerm", quote: "de l'education de 1975, l'ewe et le kabiye ont ete choisis comme ''langues nationales'' pour etre enseignes dans", source: TG },
    { field: "mediumOfInstruction", quote: "kabiye et l'ewe dans son systeme educatif comme langues de transmission du savoir", source: TG }
  ],
  bullets: {
    localTerm: ["'langues nationales', chosen as such under the 1975 education reform", "Two of Togo's languages carry the label; the rest carry none"],
    mediumOfInstruction: ["Described as 'langues de transmission du savoir' in the source"],
    taughtAsSubject: ["Entered schooling in 1977 under the 1975 reform", "Between one and two hours a week, set school by school", "Not taught across all four lower-secondary years"]
  } });

write({ unit: "TN|Tunisia", slug: "TN", status: "not-found", sources: [PEER(NA, "tunisia", "Tunisia")], langs: [],
  evidence: [{ field: "localTerm", quote: "However, few programmes seem to directly address the educational inclusion of linguistic and ethnic minorities in the country.", source: peer(NA, "tunisia") }],
  bullets: {
    localTerm: ["'linguistic and ethnic minorities' is the only category the profile offers", "No Tunisian language is named under it"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Confirmed in this session: a regex over the retrieved Tunisia profile for Amazigh, Berber and Tamazight returns nothing. The profile carries two sentences on language where its regional peers carry paragraphs." });

write({ unit: "TZ|Tanzania", slug: "TZ", status: "documented", sources: [UN("Tanzania", 2017)], langs: ["Swahili"],
  evidence: [
    { field: "localTerm", quote: "Currently, English and kiSwahili are the official languages of the country. KiSwahili is used in government, and as the medium of instruction in primary school", source: un("2017-Language-and-Learning-Tanzania") },
    { field: "mediumOfInstruction", quote: "The February 2015 policy made Swahili the medium from primary to tertiary", source: "entry standing text, from " + un("2017-Language-and-Learning-Tanzania") }
  ],
  bullets: {
    localTerm: ["Kiswahili is an official language, not a minority or regional one", "Ethnologue lists 125 languages for Tanzania; the policy engages with one"],
    mediumOfInstruction: ["The February 2015 policy made Swahili the medium from primary to tertiary", "Extending basic education in Swahili to four years of secondary", "English had been retained as the main vehicle, though used by 5% of people"]
  } });

write({ unit: "UG|Uganda", slug: "UG", status: "documented", sources: [UN("Uganda", 2017)],
  langs: ["Luganda", "Acholi", "Lango", "Kumam"],
  langNotes: ["Luganda resolves as WALS 'Luganda' [lda, iso lug]. NOTE THE TRAP: WALS code 'lug' is Lugbara - another Ugandan language, so the wrong answer would have looked entirely plausible.", "Acholi resolves as WALS 'Acholi' [acl, iso ach]. NOTE THE TRAP: WALS code 'ach' is Ache, a Tupi-Guarani language of Paraguay.", "The source's 'Lang'o' is WALS 'Lango' [lan, iso laj]. Kumam (ISO kdi) has no WALS record.", "Lango and Kumam are named only as the communities two literacy projects worked in, not as designated school languages."],
  evidence: [
    { field: "mediumOfInstruction", quote: "The education system in Uganda is gradually undergoing implementation of the 2007 curriculum reform, mandating the use of local languages in Grades 1 to 3. English is the language of instruction from Grade 4 onwards", source: un("2017-Language-and-Learning-Uganda") },
    { field: "languages", quote: "Save the Children began a Literacy Boost programme in 2011, in two districts of northern Uganda, using the language of the area, Acholi.", source: un("2017-Language-and-Learning-Uganda") },
    { field: "taughtAsSubject", quote: "English was far more strongly supported as a second language than either Luganda (a mother tongue language) or kiSwahili", source: un("2017-Language-and-Learning-Uganda") }
  ],
  bullets: {
    localTerm: ["'local languages' in the reform, 'mother tongue language' for Luganda", "The 2007 reform names a category, not a list"],
    mediumOfInstruction: ["The 2007 reform mandates local languages in Grades 1 to 3", "English is the language of instruction from Grade 4 onwards", "Wolff: the rationale was pride in indigenous cultures and better literacy"]
  } });

write({ unit: "ZA|South Africa", slug: "ZA", status: "documented", sources: [UN("South-Africa", 2017)],
  langs: ["Sotho (Northern)", "Sesotho", "Tswana", "Swati", "Venda", "Tsonga", "Afrikaans", "isiNdebele", "Xhosa", "Zulu"],
  langNotes: [
    "Ten of the eleven official languages get a row. English is the eleventh and gets none: it is the language of schooling this map is about the alternatives to, and belongs on the other maps.",
    "isiNdebele (ISO nbl) has no WALS record on name or ISO code; WALS's 'Ndebele' [ndb] carries ISO nde, which is Zimbabwean Northern Ndebele, a different language, so it is NOT substituted here.",
    "SPECTACULAR TRAP: Setswana's ISO code is tsn and Xitsonga's is tso; in WALS's own codes tsn is TSONGA and tso is TSOU, of Taiwan. Both rows here were resolved by WALS name - 'Tswana' [tsw] and 'Tsonga' [tsn] - never by code.",
    "Sepedi resolves as WALS 'Sotho (Northern)' [stn, iso nso]; siSwati as 'Swati' [swt]; Tshivenda as 'Venda' [ven]; isiXhosa as 'Xhosa'; isiZulu as 'Zulu' [zul], WALS also carrying Zulu (Northern) and Zulu (Southern)."
  ],
  evidence: [
    { field: "localTerm", quote: "the new language policy spelled out in the 1996 Constitution, 'accords official status to 11 languages: Sepedi, Sesotho, Setswana, siSwati, Tshivenda, Xitsonga, Afrikaans, English, isiNdebele, isiXhosa and isiZulu.... All official languages must enjoy parity of esteem and be treated equitably'", source: un("2017-Language-and-Learning-South-Africa") },
    { field: "localTerm", quote: "Ethnologue lists 31 languages for South Africa.", source: un("2017-Language-and-Learning-South-Africa") }
  ],
  bullets: {
    localTerm: ["All eleven are OFFICIAL languages - none is a minority or regional one", "All must enjoy parity of esteem and be treated equitably, 1996 Constitution", "Described as one of the most inclusive language policies on the continent"]
  } });

write({ unit: "ZM|Zambia", slug: "ZM", status: "documented", sources: [UN("Zambia", 2017)],
  langs: ["Bemba", "Kaonde", "Lunda", "Luvale", "Lozi", "Chichewa", "Tonga (in Zambia)"],
  langNotes: [
    "Kaonde has no WALS record on that name or on its ISO code kqn.",
    "The source's 'Nyanja' is the same language as Malawi's Chichewa; WALS's record is 'Chichewa' [cic, iso nya]. NOTE THE TRAP: WALS code 'nya' is Nyawaygi, an Australian language.",
    "Tonga resolves as WALS 'Tonga (in Zambia)' [toz, iso toi] - WALS distinguishes it from Tongan of Polynesia, which the bare name would otherwise reach."
  ],
  evidence: [
    { field: "languages", quote: "in addition to the choice of English as the official language, the government also designated seven Zambian languages, namely Bemba, Kaonde, Lunda, Luvale, Lozi, Nyanja and Tonga as regional lingua francas to be used alongside English as school subjects, for functional literacy and public education", source: un("2017-Language-and-Learning-Zambia") },
    { field: "mediumOfInstruction", quote: "Familiar languages will be used for teaching initial literacy and content subjects in the early education (pre-school) and lower primary school (Grades 1 to 4). The new policy shall be implemented in January 2014, in all the primary schools, public and private", source: un("2017-Language-and-Learning-Zambia") }
  ],
  bullets: {
    localTerm: ["'regional lingua francas' for the seven, 'familiar language' for the classroom one", "The two categories are deliberately different and the distinction is the substance"],
    mediumOfInstruction: ["Zambian languages became the medium in Grades 1 to 4, from January 2014", "In all primary schools, public and private", "'Familiar language' means the local language of the community", "NOT necessarily one of the seven - that distinction is the policy's point"],
    taughtAsSubject: ["The seven are used alongside English as school subjects"]
  } });

write({ unit: "ZW|Zimbabwe", slug: "ZW", status: "documented", sources: [UN("Zimbabwe", 2017)],
  langs: ["Shona", "Ndebele"],
  langNotes: ["Shona resolves as WALS 'Shona' [shn, iso sna]. NOTE THE TRAP: WALS code 'sna' is Shina, an Indo-Aryan language of Gilgit."],
  evidence: [
    { field: "localTerm", quote: "Zimbabwe has three national languages, Shona, Ndebele and English but virtually all children are educated through the medium of English and are expected to study their mother tongue as a subject.", source: un("2017-Language-and-Learning-Zimbabwe") },
    { field: "taughtAsSubject", quote: "In areas where minority languages exist, the Minister may authorize the teaching of such languages in primary schools in addition to those specified in subsections (1), (2) and (3).", source: un("2017-Language-and-Learning-Zimbabwe") },
    { field: "localTerm", quote: "The National Constitution of 2013 confirms 16 officially recognized languages.", source: un("2017-Language-and-Learning-Zimbabwe") }
  ],
  bullets: {
    localTerm: ["'national languages' - Shona, Ndebele AND English, all three together", "The 2013 Constitution separately confirms 16 officially recognised languages", "About 75% speak Shona and another 17% Ndebele"],
    mediumOfInstruction: ["Virtually all children are educated through the medium of English", "Amendments of 1987, 1999 and 2006 on mother-tongue medium were never fully implemented"],
    taughtAsSubject: ["From Grade 4, Shona or Ndebele gets equal time allocation with English", "Where minority languages exist the Minister may authorise teaching them too", "Children are expected to study their mother tongue as a subject"]
  },
  note: "The three-language 'national' set includes English, and the 2013 Constitution's 16 officially recognised languages are a separate and much wider list the review does not enumerate." });

console.log(JSON.stringify(stats(), null, 1));
