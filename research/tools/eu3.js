const { write, stats } = require("./gen");

const AD1 = "https://www.govern.ad/ca/tematiques/educacio-formacio-investigacio-i-divulgacio-del-coneixement/estudiar-a-andorra/sistemes-educatius-a-andorra/sistema-educatiu-andorra/primera-ensenyanca";
const AD2 = "https://portaljuridicandorra.ad/L2018017_1";
write({ unit: "AD|Andorra", slug: "AD", status: "documented",
  sources: [
    { label: "Govern d'Andorra, Sistema educatiu andorra - Primera ensenyanca", url: AD1, http: 200, tier: "official-document" },
    { label: "Llei 17/2018, del 26 de juliol, d'ordenament del sistema educatiu andorra (Portal Juridic del Principat d'Andorra)", url: AD2, http: 200, tier: "official-document" }
  ],
  langs: ["Catalan"],
  evidence: [
    { field: "localTerm", quote: "Assegurar l'us acurat de la llengua catalana, com a llengua propia del pais en els diversos ambits de comunicacio", source: AD2 },
    { field: "mediumOfInstruction", quote: "A la primera ensenyanca, les llengues vehiculars son el catala i el frances, i en totes les aules hi ha un mestre tutor de catala i un de frances.", source: AD1 },
    { field: "taughtAsSubject", quote: "La formacio andorrana comprèn l'estudi de la llengua catalana, del medi i les ciencies humanes i socials d'Andorra i de totes aquelles arees que es puguin determinar per conveni.", source: AD2 }
  ],
  bullets: {
    localTerm: ["'llengua propia del pais' - the country's own language, Llei 17/2018", "Catalan is Andorra's official language, not a minority one"],
    mediumOfInstruction: ["Catalan and French are both llengues vehiculars in primera ensenyanca", "Every classroom has a Catalan tutor teacher and a French one"],
    taughtAsSubject: ["Formacio andorrana covers the Catalan language plus Andorran society", "It is the route by which the French and Spanish systems teach Catalan"]
  } });

const BY = "https://pravo.by/document/?guid=3871&p0=hk1100243";
write({ unit: "BY|Belarus", slug: "BY", status: "partial",
  sources: [{ label: "Kodeks Respubliki Belarus ob obrazovanii (Education Code of the Republic of Belarus), art. 82 'Yazyk obucheniya i vospitaniya' and arts. 148, 157", url: BY, http: 200, tier: "official-document" }],
  langs: ["Belorussian"],
  langNotes: ["The Code names no minority language, so no row is written for any. Belorussian resolves in WALS as 'Belorussian' [blr, iso bel]. NOTE THE TRAP: WALS code 'bel' is Belhare, a Sino-Tibetan language of Nepal."],
  evidence: [
    { field: "localTerm", quote: "mogut sozdavat'sya gruppy v uchrezhdeniyakh doshkol'nogo i obshchego srednego obrazovaniya, v kotorykh vospitanniki izuchayut yazyk natsional'nogo men'shinstva", source: BY },
    { field: "taughtAsSubject", quote: "izuchenie belorusskogo yazyka obuchayushchimisya, krome otdel'nykh kategoriy lits s osobennostyami psikhofizicheskogo razvitiya, opredelyaemykh Ministerstvom obrazovaniya, yavlyaetsya obyazatel'nym", source: BY },
    { field: "mediumOfInstruction", quote: "V uchrezhdeniyakh obshchego srednego obrazovaniya mogut sozdavat'sya klassy, v kotorykh izuchayutsya yazyk natsional'nogo men'shinstva, literatura natsional'nogo men'shinstva", source: BY }
  ],
  bullets: {
    localTerm: ["'yazyk natsional'nogo men'shinstva' - language of a national minority", "The Code names no minority language at all, only the category"],
    mediumOfInstruction: ["Belarusian is a state language and one of the two media, with Russian", "Minority-language classes and preschool groups may be created"],
    taughtAsSubject: ["Study of Belarusian is compulsory for pupils, with narrow exemptions", "Minority language and literature classes rest on a local decision"]
  },
  note: "The Education Code names no minority language. Where the standing entry says minority-language classes need a local decision agreed with the ministry, the Code supports that but supplies no list of languages." });

const MC = "http://web.archive.org/web/20260314130127/https://monservicepublic.gouv.mc/en/themes/education/education-and-teaching/primary-and-secondary-education/the-primary-and-secondary-education-system-in-monaco";
write({ unit: "MC|Monaco", slug: "MC", status: "documented",
  sources: [{ label: "Gouvernement Princier de Monaco, 'The primary and secondary education system in Monaco' (monservicepublic.gouv.mc). The live URL 403s to a scripted request; this is the Internet Archive copy of 14 March 2026", url: MC, http: 200, tier: "official-document" }],
  langs: ["Monegasque"],
  langNotes: ["Monegasque has no WALS record on its name; it is a Ligurian variety and WALS carries no Ligurian record either. Row kept unlinked."],
  evidence: [
    { field: "taughtAsSubject", quote: "The Monegasque language is compulsory from CE2 (Year 4) to 3eme (Year 10) and optional from 2nde (Year 11) to Terminale (Year 13)", source: MC },
    { field: "mediumOfInstruction", quote: "Lessons are taught in French. Some schools have a French as a Foreign Language section, which can help non-French-speaking pupils to integrate.", source: MC },
    { field: "localTerm", quote: "Specific aspects of Monegasque education", source: MC }
  ],
  bullets: {
    localTerm: ["The source calls it simply 'the Monegasque language', with no status label", "It is filed under 'Specific aspects of Monegasque education'"],
    mediumOfInstruction: ["Lessons are taught in French - Monegasque is a subject, not a medium"],
    taughtAsSubject: ["Compulsory from CE2 (Year 4) through 3eme (Year 10)", "Optional from 2nde (Year 11) to Terminale (Year 13)"]
  } });

const MD1 = "https://mec.gov.md/sites/default/files/plan_cadru_26-27.pdf";
const MD2 = "https://cpbmd.info/wp-content/uploads/2026/01/codul-educatiei-RM.pdf";
write({ unit: "MD|Moldova", slug: "MD", status: "documented",
  sources: [
    { label: "Ministerul Educatiei si Cercetarii, Planul-cadru pentru invatamantul primar, gimnazial si liceal 2026-2027, plans 1.5-1.8 and 2.3-2.8", url: MD1, http: 200, tier: "official-document" },
    { label: "Codul educatiei al Republicii Moldova, art. 10 'Limba de predare'", url: MD2, http: 200, tier: "official-document" }
  ],
  langs: ["Ukrainian", "Gagauz", "Bulgarian", "Russian"],
  langNotes: ["The framework plans are titled for pupils 'de etnie ucraineana, gagauza, bulgara, roma', but no Romani-language subject appears anywhere in the plans: the subject line reads 'Limba si literatura ucraineana/gagauza/bulgara'. No Romani row is written."],
  evidence: [
    { field: "localTerm", quote: "In sistemul educational, procesul de invatamant se desfasoara in limba romana si, in limita posibilitatilor sistemului educational, in una din limbile de circulatie internationala sau, in conditiile alin. (2), in limbile minoritatilor nationale.", source: MD2 },
    { field: "localTerm", quote: "In ariile locuite traditional sau in numar substantial de persoane apartinand minoritatilor nationale, daca exista o cerere suficienta, statul asigura ... ca persoanele apartinand acestor minoritati sa beneficieze de conditii corespunzatoare de a invata limba lor minoritara ori de a primi o educatie in aceasta limba la nivelul invatamantului obligatoriu.", source: MD2 },
    { field: "mediumOfInstruction", quote: "1.8. Planul-cadru de invatamant pentru elevii de etnie ucraineana, gagauza, bulgara, roma din clasele I-IX (cu instruire in limba materna)", source: MD1 },
    { field: "taughtAsSubject", quote: "COMPONENTA INVARIABILA (discipline obligatorii) ... 2. Limba si literatura ucraineana/gagauza/bulgara", source: MD1 }
  ],
  bullets: {
    localTerm: ["'limbile minoritatilor nationale' - languages of the national minorities", "Rights attach to areas traditionally or substantially inhabited by a minority"],
    mediumOfInstruction: ["A framework plan runs grades I-IX with instruction in the mother tongue", "Parallel plans run the same grades with Russian or Romanian as the medium", "Romanian language and literature stays compulsory in every one of them"],
    taughtAsSubject: ["Ukrainian, Gagauz or Bulgarian sits in the compulsory invariable component", "3 hours a week in grades I-IX in the Russian-medium plan", "7 to 8 hours a week where it is also the medium"]
  },
  note: "Roma pupils are named in the titles of every minority framework plan but no Romani language subject exists in any of them. That gap is in the source, not in this reading of it." });

const RU = "https://www.consultant.ru/document/cons_doc_LAW_140174/bf7fadb3532c712ccd28cc2599243fb8018ed869/";
write({ unit: "RU|Russia", slug: "RU", status: "partial",
  sources: [{ label: "Federal'nyy zakon N 273-FZ 'Ob obrazovanii v Rossiyskoy Federatsii', st. 14 'Yazyk obrazovaniya' (as amended by FZ N 317-FZ of 03.08.2018)", url: RU, http: 200, tier: "official-document" }],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "Grazhdane Rossiyskoy Federatsii imeyut pravo na poluchenie doshkol'nogo, nachal'nogo obshchego i osnovnogo obshchego obrazovaniya na rodnom yazyke iz chisla yazykov narodov Rossiyskoy Federatsii", source: RU },
    { field: "localTerm", quote: "V gosudarstvennykh i munitsipal'nykh obrazovatel'nykh organizatsiyakh, raspolozhennykh na territorii respubliki Rossiyskoy Federatsii, mozhet vvodit'sya prepodavanie i izuchenie gosudarstvennykh yazykov respublik Rossiyskoy Federatsii", source: RU },
    { field: "mediumOfInstruction", quote: "Realizatsiya ukazannykh prav obespechivaetsya sozdaniem neobkhodimogo chisla sootvetstvuyushchikh obrazovatel'nykh organizatsiy, klassov, grupp, a takzhe usloviy dlya ikh funktsionirovaniya.", source: RU },
    { field: "taughtAsSubject", quote: "Prepodavanie i izuchenie gosudarstvennykh yazykov respublik Rossiyskoy Federatsii ne dolzhny osushchestvlyat'sya v ushcherb prepodavaniyu i izucheniyu gosudarstvennogo yazyka Rossiyskoy Federatsii.", source: RU }
  ],
  bullets: {
    localTerm: ["Two categories: 'rodnoy yazyk' and 'gosudarstvennyy yazyk respubliki'", "A rodnoy yazyk must be one of the languages of the peoples of the Federation", "Russian itself may be chosen as a rodnoy yazyk under the 2018 amendment"],
    mediumOfInstruction: ["Right to preschool, primary and basic general education in the rodnoy yazyk", "Exercised by creating the necessary schools, classes and groups", "Bounded by 'the possibilities provided by the education system'"],
    taughtAsSubject: ["A republic may introduce teaching of its own state language", "Such teaching may not be to the detriment of teaching Russian"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Article 14 names no language at all beyond Russian: it works entirely through the categories rodnoy yazyk and republic state language, leaving the list to republic legislation this source does not reproduce." });

const UA = "https://zakon.rada.gov.ua/laws/show/2145-19/print";
write({ unit: "UA|Ukraine", slug: "UA", status: "partial",
  sources: [{ label: "Zakon Ukrainy 'Pro osvitu' N 2145-VIII, st. 7 'Mova osvity' (first paragraph as amended by Zakon N 3504-IX of 08.12.2023)", url: UA, http: 200, tier: "official-document" }],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "Osobam, yaki nalezhat' do korinnykh narodiv Ukrainy, harantuiet'sia pravo na navchannia v komunal'nykh zakladakh osvity dlia zdobuttia doshkil'noi i zahal'noi seredn'oi osvity, poriad iz derzhavnoiu movoiu, movoiu vidpovidnoho korinnoho narodu.", source: UA },
    { field: "localTerm", quote: "Osobam, yaki nalezhat' do natsional'nykh menshyn Ukrainy, harantuiet'sia pravo na navchannia v komunal'nykh zakladakh osvity dlia zdobuttia doshkil'noi ta pochatkovoi osvity, poriad iz derzhavnoiu movoiu, movoiu vidpovidnoi natsional'noi menshyny.", source: UA },
    { field: "mediumOfInstruction", quote: "Tse pravo realizuiet'sia shliakhom stvorennia vidpovidno do zakonodavstva okremykh klasiv (hrup) z navchanniam movoiu vidpovidnoi natsional'noi menshyny poriad iz derzhavnoiu movoiu i ne poshyriuiet'sia na klasy (hrupy) z navchanniam ukrains'koiu movoiu.", source: UA },
    { field: "taughtAsSubject", quote: "Osobam, yaki nalezhat' do korinnykh narodiv, natsional'nykh menshyn Ukrainy, harantuiet'sia pravo na vyvchennia movy vidpovidnykh korinnoho narodu chy natsional'noi menshyny v komunal'nykh zakladakh zahal'noi seredn'oi osvity abo cherez natsional'ni kul'turni tovarystva.", source: UA }
  ],
  bullets: {
    localTerm: ["Two distinct categories: 'mova korinnoho narodu' and 'mova natsional'noi menshyny'", "Indigenous-people status carries the wider right of the two", "The 2023 amendment narrowed the classroom right to EU official languages"],
    mediumOfInstruction: ["Indigenous-people languages reach preschool and all general secondary", "National-minority languages reach preschool and primary only", "Delivered through separate classes or groups, always alongside the state language", "The right does not extend into Ukrainian-medium classes"],
    taughtAsSubject: ["Right to study the language in municipal general secondary schools", "Or through national cultural societies, as an alternative route"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Article 7 names no specific language: it works entirely through the two categories. Ukraine's indigenous peoples are designated by a separate 2021 law which this entry does not cite and which was not read here." });

console.log(JSON.stringify(stats(), null, 1));
