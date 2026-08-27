const { write, stats } = require("./gen");
const EU = { label: 'Eurydice, "Key data on teaching languages at school in Europe - 2023 edition" (EACEA), Figure A1, Figure B9 and Annex 2; the PDF carries doi:10.2797/529032, the DOI the entry cites', url: "https://publications.europa.eu/resource/cellar/e0f69418-d915-11ed-a05c-01aa75ed71a1.0001.01/DOC_1", http: 200, tier: "official-document" };
const E = "https://publications.europa.eu/resource/cellar/e0f69418-d915-11ed-a05c-01aa75ed71a1.0001.01/DOC_1";
const PROMOTE = "In some other countries, legal frameworks recognise only one official (state) language (see Figure A1) but steering documents issued by top-level education authorities promote the provision of regional or minority languages. This is the case in Bulgaria, Greece, France, Lithuania and Albania.";
const CONTRAST = "A contrasting group consists of countries that grant official status to regional or minority languages (see Figure A1) but do not make specific reference to these languages in steering documents issued by top-level education authorities. This applies to Czechia, Cyprus, Latvia, Portugal and Switzerland.";
const ALLOFF = "In some countries, all officially recognised regional or minority languages (see Figure A1), and only these regional or minority languages, are specifically mentioned in steering documents issued by top-level education authorities. This is the case in Italy, Hungary, the Netherlands, Poland, Slovenia, Finland, Sweden, Montenegro and Norway.";
const RANGE = "The number of languages covered ranges from one or two (Denmark, Greece, the Netherlands, Slovenia and Albania) to 10 or more (France, Croatia, Italy, Hungary, Poland, Romania and Serbia).";
const ROMANY_NOTE = "Eurydice names the language 'Romany' with ISO 639-3 rom. WALS has no macrolanguage or genus record for it, only nine named varieties, so the row is left unlinked. NOTE THE TRAP: WALS code 'rom' is Romanian, not Romany.";
const ARM_NOTE = "Eurydice names only 'Armenian' (ISO hye). WALS carries Armenian (Eastern) and Armenian (Iranian) but no undifferentiated record; Eastern is used here and the choice is editorial, not the source's.";
const PICKNOTE = "HUMAN PICK: WALS carries the name under a language record AND a genus row, so rows.js refuses to choose and its bare-code path is guarded. The language-level record printed by the tool was taken: ";
const SC_NOTE = "WALS has no separate record for Croatian or for Serbian: its one unit is the joint lect 'Serbian-Croatian' [wals scr, iso hbs]. Where this source names Croatian and/or Serbian, a single Serbian-Croatian row is written and this note records the source's own wording, rather than inventing two codes or dropping the language. 'Bosnian' does have its own WALS record [bos].";

write({ unit: "FR|France", slug: "FR", status: "documented", sources: [EU],
  langs: ["Breton", "Catalan", "Corsican", "Francoprovencal", "Occitan", "Picard", "Reunion Creole", "Tahitian", "Gallo", "Kibushi", "Comorian", "Wallisian", "Futuna (East)", "West Flemish", "Alsatian", "Moselle Franconian"],
  picks: [{ id: "bsq", at: 3 }],
  langNotes: [
    PICKNOTE + "Basque [wals bsq, iso eus]. The bare name matches the language, the family row and the genus row alike.",
    "Eurydice's 'Creole' for France carries ISO rcf, Reunion Creole; WALS has no record for it. 'Shimaore (Mayotte)' is WALS 'Comorian' [com, iso swb]. Eurydice's 'Polynesian languages (Wallisian and Futunian)' resolve to WALS 'Wallisian' [wll] and 'Futuna (East)' [fue, iso fud].",
    "Corsican has no WALS record on the name or on its ISO code cos. NOTE THE TRAP: WALS code 'cos' is Rumsien, a Costanoan language of California."
  ],
  evidence: [
    { field: "languages", quote: "France: 'Other' means Gallo, Kibushi, Shimaore (Mayotte), Melanesian languages, Polynesian languages (Wallisian and Futunian), West Flemish, and the regional languages of Alsace and Moselle (known as Alsatian and Moselle Franconian dialects).", source: E },
    { field: "localTerm", quote: PROMOTE, source: E },
    { field: "taughtAsSubject", quote: "In France, for instance, French is the only official language, but in the areas where regional or minority languages are spoken students should be able to study them at all levels of education, in particular as optional subjects in secondary education.", source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language without official language status | French + Alsatian/Basque/Breton/Catalan/Corsican/Creole/Gallo/Melanesian/Mosellan/Occitan/Polynesian languages | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; none holds official status in French law", "France is one of five systems that promote them without recognising them"],
    mediumOfInstruction: ["CLIL pairs French with ten or more regional languages, ISCED 1-3", "France and Hungary and Romania offer more than 10 such combinations"],
    taughtAsSubject: ["Studiable at all levels of education, in the areas where they are spoken", "In particular as optional subjects in secondary education"]
  },
  note: "Eurydice's 'Melanesian languages' (New Caledonia) is a group, not a language, and gets no row. Nine languages are ticked individually in Figure B9 and a further eight named in the country note." });

write({ unit: "GB|England", slug: "GB-England", status: "partial",
  sources: [{ label: "British Council / Queen's University Belfast, Language Trends England 2024", url: "https://pureadmin.qub.ac.uk/ws/portalfiles/portal/600857994/language_trend_england_2024.pdf", http: 200, tier: "secondary-source" }],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "Languages other than English used in daily life at home, in school and in local communities are sometimes known as home, heritage and community languages (HHCL).", source: "https://pureadmin.qub.ac.uk/ws/portalfiles/portal/600857994/language_trend_england_2024.pdf" },
    { field: "localTerm", quote: "a heritage language is a minority language that is often indigenous such as Irish, Gaelic or Scots, Welsh, or Cornish but can also refer to languages which have developed in local communities as a result of immigration over time", source: "https://pureadmin.qub.ac.uk/ws/portalfiles/portal/600857994/language_trend_england_2024.pdf" },
    { field: "taughtAsSubject", quote: "There are 19 language GCSEs available in England, not including ancient languages: Arabic, Bengali, Mandarin Chinese and Cantonese, French, German, Greek, Gujarati, Italian, Japanese, Modern Hebrew, Panjabi, Persian, Polish, Portuguese, Russian, Spanish, Turkish and Urdu.", source: "https://pureadmin.qub.ac.uk/ws/portalfiles/portal/600857994/language_trend_england_2024.pdf" }
  ],
  bullets: {
    localTerm: ["'home, heritage and community languages', abbreviated HHCL in the survey", "A home language is one learned in childhood in the home", "The report's heritage-language definition names Cornish, but only as a definition"],
    taughtAsSubject: ["19 language GCSEs, community languages among them, are available in England", "Arabic, Polish and Urdu appear at Key Stage 3 in a handful of schools each"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. This source names no indigenous or regional language of England as provided in school. Cornish appears once, inside the definition of 'heritage language', not as school provision. The languages the source does name - Arabic, Polish, Urdu and the other GCSE subjects - are migrant community languages and belong on a different map from this one. Flagged rather than filled." });

write({ unit: "HR|Croatia", slug: "HR", status: "documented", sources: [EU],
  langs: ["Bosnian", "Czech", "German", "Hebrew (Modern)", "Hungarian", "Italian", "Macedonian", "Polish", "Rusyn", "Russian", "Slovak", "Slovene", "Serbian-Croatian", "Ukrainian"],
  picks: [{ id: "alb", at: 12 }],
  langNotes: [SC_NOTE, PICKNOTE + "Albanian [wals alb, iso sqi].", "Rusyn has no WALS record on its name or on its ISO code rue.", "Eurydice's 'Slovenian' is WALS 'Slovene' [slo, iso slv]."],
  evidence: [
    { field: "languages", quote: "HR Croatian | Czech, Hungarian, Italian, Slovak, Serbian", source: E },
    { field: "languages", quote: RANGE, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Croatian + Hungarian/Serbian | 1-2 ... Croatian + Czech | 3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; five of the fifteen hold official status", "Croatia is in Eurydice's 'ten or more' band for steering coverage"],
    mediumOfInstruction: ["Croatian-Hungarian and Croatian-Serbian CLIL at ISCED 1-2", "Croatian-Czech CLIL at ISCED 3 only"],
    taughtAsSubject: ["Fifteen languages are named in top-level steering documents"]
  },
  note: "Figure A1 gives Croatia five officially recognised languages (Czech, Hungarian, Italian, Slovak, Serbian); Figure B9 names fifteen in steering documents, so ten are provided without official status." });

write({ unit: "HU|Hungary", slug: "HU", status: "documented", sources: [EU],
  langs: ["Bulgarian", "German", "Greek (Modern)", "Serbian-Croatian", "Armenian (Eastern)", "Polish", "Romany", "Romanian", "Rusyn", "Slovak", "Slovene", "Ukrainian", "Boyash"],
  langNotes: [ROMANY_NOTE, ARM_NOTE, SC_NOTE, "Rusyn and Boyash have no WALS record on name or ISO code. Eurydice's country note calls Boyash 'a dialect of Romany'."],
  evidence: [
    { field: "languages", quote: "HU Hungarian | Bulgarian, German, Greek, Croatian, Armenian, Polish, Romany, Romanian, Rusyn, Slovak, Slovenian, Serbian, Ukrainian", source: E },
    { field: "languages", quote: "Hungary: 'Other' means Boyash (a dialect of Romany).", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "taughtAsSubject", quote: "in Hungary students can take their final upper secondary school leaving examination (erettsegi) in any of the officially recognised regional or minority languages", source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Hungarian + Boyash/Bulgarian/Croatian/German/Greek/Polish/Romanian/Romany/Serbian/Slovak/Slovenian | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; all thirteen hold official status", "Hungary is one of five EU states with more than 10 such official languages"],
    mediumOfInstruction: ["CLIL pairs Hungarian with eleven of them across ISCED 1-3", "Hungary is one of three systems with more than 10 CLIL combinations", "Hungarian CLIL languages are unregulated - the data are actual 2021/22 provision"],
    taughtAsSubject: ["The erettsegi may be sat in any officially recognised minority language", "Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "IT|Italy", slug: "IT", status: "documented", sources: [EU],
  langs: ["Catalan", "German", "Greek (Modern)", "French", "Francoprovencal", "Friulian", "Serbian-Croatian", "Ladin", "Occitan", "Slovene", "Sardinian"],
  picks: [{ id: "alb", at: 10 }],
  langNotes: [SC_NOTE, PICKNOTE + "Albanian [wals alb, iso sqi].", "Friulian has no WALS record on its name or on its ISO code fur. NOTE THE TRAP: WALS code 'fur' is Fur, a Nilo-Saharan language of Darfur.", "Francoprovencal has no WALS record on name or on ISO frp."],
  evidence: [
    { field: "languages", quote: "IT Italian | Catalan, German, Greek, French, Francoprovencal, Friulian, Croatian, Ladin, Occitan, Slovenian, Albanian, Sardinian", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Italian + French/Friulian/German/Ladin/Slovenian | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; all twelve hold official status in Italian law", "Italy is one of five EU states with more than 10 such official languages"],
    mediumOfInstruction: ["CLIL pairs Italian with French, Friulian, German, Ladin or Slovenian", "Runs across ISCED 1-3, Eurydice Annex 2"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "LT|Lithuania", slug: "LT", status: "documented", sources: [EU],
  langs: ["Belorussian", "German", "Polish", "Russian"],
  langNotes: ["Eurydice's 'Belorussian' is WALS 'Belorussian' [blr, iso bel]. NOTE THE TRAP: WALS code 'bel' is Belhare, a Sino-Tibetan language of Nepal."],
  evidence: [
    { field: "languages", quote: "LT Lithuanian", source: E },
    { field: "localTerm", quote: PROMOTE, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language without official language status | Lithuanian + Belarusian/Polish/Russian | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; none holds official status in Lithuanian law", "Lithuania is one of five systems promoting them without recognising them"],
    mediumOfInstruction: ["Lithuanian-Belarusian, -Polish and -Russian CLIL across ISCED 1-3"],
    taughtAsSubject: ["Four languages are named in top-level steering documents"]
  } });

write({ unit: "LV|Latvia", slug: "LV", status: "documented", sources: [EU],
  langs: ["Liv", "Polish", "Russian", "Ukrainian", "Belorussian", "Lithuanian", "Estonian"],
  langNotes: ["Eurydice's 'Liv (Livonian)' misses on 'Livonian' but resolves on 'Liv' [WALS liv, iso liv]."],
  evidence: [
    { field: "languages", quote: "LV Latvian | Liv (Livonian)", source: E },
    { field: "localTerm", quote: CONTRAST, source: E },
    { field: "localTerm", quote: "Latvia, the Netherlands and Portugal each have only one official regional language.", source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language without official language status | Latvian + Polish/Russian/Ukrainian | 1-3 ... Latvian + Belarusian | 1-2 ... Latvian + Lithuanian | 2-3 ... Latvian + Estonian | 1", source: E }
  ],
  bullets: {
    localTerm: ["Liv is Latvia's only official regional language, Eurydice Fig. A1", "The six CLIL languages are 'without official language status' in Eurydice's phrase"],
    mediumOfInstruction: ["Latvian-Polish, -Russian and -Ukrainian CLIL across ISCED 1-3", "Latvian-Belarusian at ISCED 1-2, -Lithuanian at 2-3, -Estonian at ISCED 1"],
    taughtAsSubject: ["No top-level steering document names any regional or minority language"]
  },
  note: "Liv, the one officially recognised language, appears in no CLIL programme; the six languages that do appear have no official status. The two lists do not overlap at all." });

write({ unit: "NL|Netherlands", slug: "NL", status: "documented", sources: [EU], langs: ["Frisian"],
  langNotes: ["WALS 'Frisian' [fri, iso fry] carries Glottocode west2354, West Frisian, which is the language of the Frisian area."],
  evidence: [
    { field: "languages", quote: "NL Dutch | Frisian", source: E },
    { field: "localTerm", quote: "Latvia, the Netherlands and Portugal each have only one official regional language.", source: E },
    { field: "taughtAsSubject", quote: "In the Netherlands, where Frisian is an officially recognised minority language, all students in primary and lower secondary education in the Frisian area have to study this language (consequently, all schools in this area have to provide it).", source: E },
    { field: "mediumOfInstruction", quote: "NL 1 state language + 1 foreign language | Dutch + English | 1-3 ... Dutch + German | 2-3", source: E }
  ],
  bullets: {
    localTerm: ["Frisian is the Netherlands' only official regional language", "'officially recognised minority language' is Eurydice's own phrase for it"],
    mediumOfInstruction: ["Annex 2 records no Dutch-Frisian CLIL - only Dutch with English or German"],
    taughtAsSubject: ["Compulsory for all primary and lower secondary pupils in the Frisian area", "Every school in that area must therefore provide it"]
  } });

write({ unit: "NO|Norway", slug: "NO", status: "documented", sources: [EU], langs: ["Finnish", "Kven", "Saami"],
  langNotes: ["'Sami' misses in WALS; the genus row 'Saami' [genus-saami] is used because Eurydice names only 'Sami' and not a variety.", "Kven has no WALS record on its name or on its ISO code fkv."],
  evidence: [
    { field: "languages", quote: "NO Norwegian (two forms: Bokmal and Nynorsk) | Finnish, Kven, Sami", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "NO 1 state language + 1 foreign language | Norwegian + English ... Norwegian + French/German", source: E }
  ],
  bullets: {
    localTerm: ["All three hold official status as 'regional or minority languages', Fig. A1", "Norwegian itself exists in two written forms, Bokmal and Nynorsk"],
    mediumOfInstruction: ["Annex 2 records only foreign-language CLIL for Norway", "No Sami, Kven or Finnish CLIL pairing is listed"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "PL|Poland", slug: "PL", status: "documented", sources: [EU],
  langs: ["Belorussian", "Czech", "Kashubian", "German", "Hebrew (Modern)", "Armenian (Eastern)", "Karaim", "Lithuanian", "Romany", "Russian", "Slovak", "Tatar", "Ukrainian", "Yiddish", "Lemko"],
  langNotes: [ROMANY_NOTE, ARM_NOTE,
    "Eurydice names only 'Tatar' (ISO tat); WALS carries Tatar [tvo], Tatar (Mishar) and Tatar (Baraba). The undifferentiated record is used. NOTE THE TRAP: WALS code 'tat' is Tatana', an Austronesian language of Borneo.",
    "Yiddish resolves to WALS [ydd, iso ydd]. NOTE THE TRAP: WALS code 'yid' is Yidiny, a Pama-Nyungan language of Queensland.",
    "Lemko has no WALS record."],
  evidence: [
    { field: "languages", quote: "PL Polish | Belarusian, Czech, Kashubian, German, Hebrew, Armenian, Karaim, Romany, Russian, Slovak, Tatar, Ukrainian, Yiddish", source: E },
    { field: "languages", quote: "Poland: 'Other' means Lemko.", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "taughtAsSubject", quote: "In Poland, for instance, all officially recognised regional or minority languages have a core curriculum and schools are obliged to provide regional or minority language instruction if certain conditions are met (e.g. a minimum number of students apply to study the language).", source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Polish + Kashubian/German | 1-2 ... Polish + Ukrainian | 1-3 ... Polish + Russian | 2 ... Polish + Belarusian | 3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; all fourteen hold official status", "Poland is one of five EU states with more than 10 such official languages"],
    mediumOfInstruction: ["Polish-Kashubian and Polish-German CLIL at ISCED 1-2", "Polish-Ukrainian across ISCED 1-3, Polish-Russian at 2, Polish-Belarusian at 3", "Polish CLIL languages are unregulated - the data are actual 2021/22 provision"],
    taughtAsSubject: ["Every officially recognised language has a core curriculum", "Schools are obliged to provide it if enough students apply"]
  } });

write({ unit: "PT|Portugal", slug: "PT", status: "documented", sources: [EU], langs: ["Mirandese"],
  langNotes: ["Mirandese has no WALS record on its name or on its ISO code mwl. NOTE THE TRAP: WALS code 'mwl' is Miwok (Lake), a Californian language."],
  evidence: [
    { field: "languages", quote: "PT Portuguese | Mirandese", source: E },
    { field: "localTerm", quote: "Latvia, the Netherlands and Portugal each have only one official regional language.", source: E },
    { field: "localTerm", quote: CONTRAST, source: E },
    { field: "mediumOfInstruction", quote: "PT 1 state language + 1 foreign language | Portuguese + French | 2-3 ... Portuguese + English | 1-2", source: E }
  ],
  bullets: {
    localTerm: ["Mirandese is Portugal's only official regional language, Eurydice Fig. A1"],
    mediumOfInstruction: ["Annex 2 records only Portuguese with French or English, both foreign"],
    taughtAsSubject: ["Officially recognised but named in no top-level steering document"]
  } });

write({ unit: "RO|Romania", slug: "RO", status: "documented", sources: [EU],
  langs: ["Bulgarian", "Czech", "German", "Hebrew (Modern)", "Serbian-Croatian", "Hungarian", "Italian", "Romany", "Slovak", "Turkish", "Ukrainian"],
  langNotes: [ROMANY_NOTE, SC_NOTE],
  evidence: [
    { field: "languages", quote: "RO Romanian | Bulgarian, Czech, German, Greek, Croatian, Hungarian, Italian, Polish, Romany, Russian, Slovak, Serbian, Turkish, Ukrainian", source: E },
    { field: "languages", quote: RANGE, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Romanian + Bulgarian/Croatian/Czech/German/Greek/Hungarian/Italian/Polish/Romany/Russian/Serbian/Slovak/Turkish/Ukrainian | 2-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; Romania has more than 10 with official status", "Twelve are named in top-level steering documents, Figure B9"],
    mediumOfInstruction: ["CLIL pairs Romanian with fourteen minority languages at ISCED 2-3", "Romania is one of three systems with more than 10 CLIL combinations"],
    taughtAsSubject: ["Twelve languages are named in top-level steering documents"]
  },
  note: "Figure B9 ticks twelve for Romania; the Annex 2 CLIL list additionally carries Greek, Polish and Russian, which Figure A1 also gives official status. The three figures do not agree exactly and the difference is recorded rather than smoothed." });

write({ unit: "RS|Serbia", slug: "RS", status: "documented", sources: [EU],
  langs: ["Bosnian", "Bulgarian", "Czech", "Serbian-Croatian", "Hungarian", "Macedonian", "Romany", "Romanian", "Rusyn", "Aromanian", "Slovak", "Slovene", "Ukrainian", "Bunjevac"],
  picks: [{ id: "alb", at: 12 }],
  langNotes: [ROMANY_NOTE, SC_NOTE, PICKNOTE + "Albanian [wals alb, iso sqi].", "Rusyn, Aromanian (Vlach) and Bunjevac have no WALS record on name or ISO code."],
  evidence: [
    { field: "languages", quote: "RS Serbian | Bosnian, Bulgarian, Czech, Montenegrin, Croatian, Hungarian, Macedonian, Romany, Romanian, Rusyn, Slovak, Albanian", source: E },
    { field: "languages", quote: "Serbia: 'Other' means Bunjevac.", source: E },
    { field: "languages", quote: RANGE, source: E },
    { field: "mediumOfInstruction", quote: "RS 1 state language + 1 foreign language | Serbian + English/German/French/Italian/Russian/Spanish", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; Serbia has more than 10 with official status", "A minority language is official where the minority is at least 15% of a local unit"],
    mediumOfInstruction: ["Annex 2 records only Serbian with foreign languages, no minority CLIL"],
    taughtAsSubject: ["Fourteen languages plus Bunjevac are named in steering documents"]
  } });

write({ unit: "SE|Sweden", slug: "SE", status: "documented", sources: [EU],
  langs: ["Finnish", "Meankieli", "Romany", "Saami", "Yiddish"],
  langNotes: ["Meankieli has no WALS record on its name or on its ISO code fit.", ROMANY_NOTE, "'Sami' misses; the genus row 'Saami' [genus-saami] is used because Eurydice names only 'Sami'.", "Yiddish resolves to WALS [ydd]. NOTE THE TRAP: WALS code 'yid' is Yidiny, of Queensland."],
  evidence: [
    { field: "languages", quote: "SE Swedish | Finnish, Meankieli, Romany, Sami, Yiddish", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Swedish + Finnish ... 1 state language + 1 non-territorial language with official language status | Swedish + Sami", source: E }
  ],
  bullets: {
    localTerm: ["All five hold official status as 'regional or minority languages', Fig. A1", "Romany and Yiddish are 'non-territorial languages' after the Charter's term"],
    mediumOfInstruction: ["Swedish-Finnish and Swedish-Sami CLIL, Eurydice Annex 2", "CLIL regulation covers only primary and lower secondary in Sweden"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "SI|Slovenia", slug: "SI", status: "documented", sources: [EU], langs: ["Hungarian", "Italian"],
  evidence: [
    { field: "languages", quote: "SI Slovenian | Hungarian, Italian", source: E },
    { field: "languages", quote: RANGE, source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "SI 1 state language + 1 regional/minority language with official language status | Slovenian + Hungarian | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["Both hold official status as 'regional or minority languages', Eurydice Fig. A1", "Slovenia is in Eurydice's 'one or two languages' band"],
    mediumOfInstruction: ["Slovenian-Hungarian CLIL across ISCED 1-3, Slovenia's only pairing", "No Italian CLIL combination is listed"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "SK|Slovakia", slug: "SK", status: "documented", sources: [EU],
  langs: ["German", "Hungarian", "Romany", "Rusyn", "Russian", "Ukrainian", "Bulgarian", "Czech", "Serbian-Croatian", "Polish"],
  langNotes: [ROMANY_NOTE, SC_NOTE, "Rusyn has no WALS record on its name or on its ISO code rue."],
  evidence: [
    { field: "languages", quote: "SK Slovak | Bulgarian, Czech, German, Croatian, Hungarian, Polish, Romany, Rusyn, Ukrainian", source: E },
    { field: "languages", quote: "Slovakia: educational standards for four additional languages (Bulgarian, Czech, Croatian and Polish) were adopted in September 2022, that is, at the beginning of the 2022/2023 school year.", source: E },
    { field: "localTerm", quote: "in Slovakia and Serbia a minority language is officially recognised and can be used for legal and administrative purposes in any local administrative unit where the minority population accounts for at least 15 % of the total number of inhabitants", source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language with official language status | Slovak + German/Romany/Rusyn | 1-2 ... Slovak + Ukrainian | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages'; nine hold official status in Slovak law", "Official where the minority is at least 15% of a local administrative unit"],
    mediumOfInstruction: ["Slovak-German, -Romany and -Rusyn CLIL at ISCED 1-2", "Slovak-Ukrainian across ISCED 1-3", "CLIL language regulation covers only primary; higher levels are actual provision"],
    taughtAsSubject: ["Six named in 2021/22 steering documents, per Figure B9", "Standards for Bulgarian, Czech, Croatian and Polish added September 2022"]
  } });

write({ unit: "ME|Montenegro", slug: "ME", status: "documented", sources: [EU],
  langs: ["Bosnian", "Serbian-Croatian"],
  picks: [{ id: "alb" }],
  langNotes: [SC_NOTE, PICKNOTE + "Albanian [wals alb, iso sqi]."],
  evidence: [
    { field: "languages", quote: "ME Montenegrin | Bosnian, Croatian, Albanian, Serbian", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "some schools offer programmes delivering some subjects in a minority language (Russian in Estonia and Albanian in Montenegro) and others in a foreign language (English in both countries)", source: E },
    { field: "mediumOfInstruction", quote: "ME 1 regional/minority language with official language status + 1 foreign language | Albanian + English", source: E }
  ],
  bullets: {
    localTerm: ["All four hold official status as 'regional or minority languages', Fig. A1", "Montenegrin is the state language and stands outside that class"],
    mediumOfInstruction: ["Some schools teach subjects in Albanian and others in English", "Eurydice notes the Montenegro data refer to a pilot CLIL project"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

console.log(JSON.stringify(stats(), null, 1));
