const { write, stats } = require("./gen");
const EU = { label: 'Eurydice, "Key data on teaching languages at school in Europe - 2023 edition" (EACEA), Figure A1, Figure B9 and Annex 2; the PDF carries doi:10.2797/529032, the DOI the entry cites', url: "https://publications.europa.eu/resource/cellar/e0f69418-d915-11ed-a05c-01aa75ed71a1.0001.01/DOC_1", http: 200, tier: "official-document" };
const E = "https://publications.europa.eu/resource/cellar/e0f69418-d915-11ed-a05c-01aa75ed71a1.0001.01/DOC_1";
const NOREF = "some countries neither officially recognise regional or minority languages (see Figure A1) nor refer to these languages in steering documents issued by top-level education authorities (Belgium, Estonia, Ireland, Luxembourg, Malta, Bosnia and Herzegovina, Iceland, Liechtenstein and Turkiye)";
const PROMOTE = "In some other countries, legal frameworks recognise only one official (state) language (see Figure A1) but steering documents issued by top-level education authorities promote the provision of regional or minority languages. This is the case in Bulgaria, Greece, France, Lithuania and Albania.";
const CONTRAST = "A contrasting group consists of countries that grant official status to regional or minority languages (see Figure A1) but do not make specific reference to these languages in steering documents issued by top-level education authorities. This applies to Czechia, Cyprus, Latvia, Portugal and Switzerland.";
const ALLOFF = "In some countries, all officially recognised regional or minority languages (see Figure A1), and only these regional or minority languages, are specifically mentioned in steering documents issued by top-level education authorities. This is the case in Italy, Hungary, the Netherlands, Poland, Slovenia, Finland, Sweden, Montenegro and Norway.";
const RANGE = "The number of languages covered ranges from one or two (Denmark, Greece, the Netherlands, Slovenia and Albania) to 10 or more (France, Croatia, Italy, Hungary, Poland, Romania and Serbia).";
const ROMANY_NOTE = "Eurydice names the language 'Romany' with ISO 639-3 rom. WALS has no macrolanguage or genus record for it, only nine named varieties (Ajia Varvara, Burgenland, Bugurdzi, Kalderash, Lovari, North Russian, Sepecides, Welsh), so the row is left unlinked. NOTE THE TRAP: WALS code 'rom' is Romanian, not Romany.";
const ARM_NOTE = "Eurydice names only 'Armenian' (ISO hye). WALS carries Armenian (Eastern) and Armenian (Iranian) but no undifferentiated record; Eastern is used here and the choice is editorial, not the source's.";
const SC_NOTE = "WALS has no separate record for Croatian or for Serbian: its unit is the joint lect 'Serbian-Croatian' [wals scr, iso hbs]. Rows are named as the source names them and left unlinked rather than relabelled. 'Bosnian' does have its own WALS record [bos].";

write({ unit: "AL|Albania", slug: "AL", status: "documented", sources: [EU], langs: ["Greek (Modern)", "Macedonian"],
  evidence: [
    { field: "languages", quote: "in the areas of Albania inhabited by Macedonian and Greek minorities primary and secondary education students should be able to study, alongside Albanian, their home language", source: E },
    { field: "localTerm", quote: PROMOTE, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 regional/minority language without official language status | Albanian + Greek/Macedonian", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages', the Council of Europe Charter term Eurydice uses", "Neither has official status in Albanian law - only Albanian does"],
    mediumOfInstruction: ["CLIL pairs Albanian with Greek or Macedonian, Eurydice Annex 2", "Recorded at ISCED 1 and 3, not at lower secondary"],
    taughtAsSubject: ["Studiable alongside Albanian in the Macedonian and Greek minority areas", "Covers primary and secondary students, per Eurydice"]
  } });

write({ unit: "BA|Bosnia and Herzegovina", slug: "BA", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "localTerm", quote: "BA Bosnian, Croatian, Serbian", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use", "Bosnian, Croatian and Serbian are all three state languages, Eurydice Fig. A1"],
    mediumOfInstruction: ["Annex 2 records no CLIL programme of any kind in Bosnia and Herzegovina"]
  },
  note: "Eurydice names no regional or minority language for Bosnia and Herzegovina. The three constituent languages are classed as state languages, so they fall outside this map's category." });

write({ unit: "BE|Belgium — French Community (Wallonia-Brussels Federation)", slug: "BE-fr", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "BE fr 1 state language + 1 other state language | French + Dutch/German | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use in the French Community", "German, French and Dutch are all three state languages, Eurydice Fig. A1"],
    mediumOfInstruction: ["CLIL pairs French with Dutch or German, both state languages, ISCED 1-3", "That is state-language immersion, not regional-language provision"]
  },
  note: "Walloon and Picard are not recorded by Eurydice as officially recognised in Belgium or as named in steering documents." });

write({ unit: "BG|Bulgaria", slug: "BG", status: "documented", sources: [EU], langs: ["Hebrew (Modern)", "Armenian (Eastern)", "Romany", "Turkish"],
  langNotes: [ROMANY_NOTE, ARM_NOTE],
  evidence: [
    { field: "languages", quote: "In Bulgaria, in 2017, top-level education authorities approved curricula for the study of Hebrew, Armenian, Romany and Turkish, which, if students wish to, they can study for 2 hours a week for 7 years.", source: E },
    { field: "localTerm", quote: PROMOTE, source: E },
    { field: "mediumOfInstruction", quote: "BG 1 state language + 1 foreign language | Bulgarian + English/French/German/Italian/Russian/Spanish | 3", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority languages', the Council of Europe Charter term Eurydice uses", "None of the four holds official status in Bulgarian law, Eurydice Fig. A1"],
    mediumOfInstruction: ["Annex 2 records no CLIL in any of the four", "Bulgarian pairs only with foreign languages, at ISCED 3"]
  , taughtAsSubject: ["Optional: studied if students wish to", "2 hours a week over 7 years, under 2017 top-level curricula"]
  } });

write({ unit: "CH|Switzerland", slug: "CH", status: "documented", sources: [EU], langs: ["Romansch", "Francoprovencal", "Yenish"],
  langNotes: ["'Romansh' misses on that spelling; WALS names it 'Romansch' [rmc, iso roh]. Francoprovencal (ISO frp) and Yenish have no WALS record on either name or ISO code."],
  evidence: [
    { field: "languages", quote: "CH German, French, Italian, Romansh | Francoprovencal, Yenish", source: E },
    { field: "localTerm", quote: CONTRAST, source: E },
    { field: "mediumOfInstruction", quote: "CH 1 state language + 1 other state language | Romansh + German ... German + Romansh", source: E }
  ],
  bullets: {
    localTerm: ["Francoprovencal and Yenish hold official status as regional or minority languages", "Romansh is not in that class - it is one of four state languages, Fig. A1", "Most cantons are monolingual; German alone is official in 17 of them"],
    mediumOfInstruction: ["Romansh-German CLIL runs in both directions, Eurydice Annex 2", "Filed as state-language CLIL, since Romansh is a state language"],
    taughtAsSubject: ["Eurydice records no top-level steering reference to Francoprovencal or Yenish"]
  } });

write({ unit: "CY|Cyprus", slug: "CY", status: "documented", sources: [EU], langs: ["Arabic (Kormakiti)", "Armenian (Eastern)"],
  langNotes: ["Eurydice names 'Cypriot Arabic'. That name misses in WALS; by its ISO 639-3 code acy it is WALS 'Arabic (Kormakiti)' [ako] - the Maronite Arabic of Kormakitis.", ARM_NOTE],
  evidence: [
    { field: "languages", quote: "CY Greek, Turkish | Cypriot Arabic, Armenian", source: E },
    { field: "localTerm", quote: CONTRAST, source: E }
  ],
  bullets: {
    localTerm: ["Both hold official status as 'regional or minority languages', Eurydice Fig. A1", "Greek and Turkish are the two state languages, so outside that class"],
    mediumOfInstruction: ["CLIL is Greek plus English at ISCED 1 only - neither language appears"],
    taughtAsSubject: ["Officially recognised but absent from top-level steering documents"]
  } });

write({ unit: "CZ|Czechia", slug: "CZ", status: "documented", sources: [EU], langs: ["German", "Polish", "Romany", "Slovak"],
  langNotes: [ROMANY_NOTE],
  evidence: [
    { field: "languages", quote: "CZ Czech | German, Polish, Romany, Slovak", source: E },
    { field: "localTerm", quote: CONTRAST, source: E },
    { field: "localTerm", quote: "Romany is a typical example of a non-territorial language. It is an officially recognised language in 11 European countries, namely Czechia, Germany, Hungary, Austria, Poland, Romania, Slovakia, Finland, Sweden, North Macedonia and Serbia.", source: E },
    { field: "mediumOfInstruction", quote: "They can choose from between one language option (e.g. state language and Polish in Czechia) and more than 10 options (in France, Hungary and Romania).", source: E }
  ],
  bullets: {
    localTerm: ["All four hold official status as 'regional or minority languages', Eurydice Fig. A1", "Romany is filed as a 'non-territorial language' after the Charter's term"],
    mediumOfInstruction: ["Czech-Polish CLIL across ISCED 1-3, the country's only such pairing"],
    taughtAsSubject: ["No top-level steering document names any of the four", "The broader right to be educated in one's own minority language still exists"]
  } });

write({ unit: "DK|Denmark", slug: "DK", status: "documented", sources: [EU], langs: ["Faroese", "Greenlandic (West)", "German"],
  langNotes: ["Eurydice names 'Greenlandic' (ISO kal); WALS splits it into West, East and South Greenlandic. West Greenlandic is the standard variety and is used here - an editorial choice, not the source's."],
  evidence: [
    { field: "languages", quote: "DK Danish | German, Faroese, Greenlandic", source: E },
    { field: "languages", quote: RANGE, source: E },
    { field: "mediumOfInstruction", quote: "DK 1 state language + 1 foreign language | Danish + English | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["All three hold official status as 'regional or minority languages', Eurydice Fig. A1", "Only Faroese and Greenlandic reach steering documents; German does not"],
    mediumOfInstruction: ["Annex 2 records only Danish-English CLIL, no minority-language pairing"],
    taughtAsSubject: ["Denmark is in Eurydice's 'one or two languages' band for steering coverage"]
  } });

write({ unit: "EE|Estonia", slug: "EE", status: "partial", sources: [EU], langs: ["Russian"],
  evidence: [
    { field: "languages", quote: "1 state language + 1 regional/minority language without official language status | Estonian + Russian | 1-3", source: E },
    { field: "localTerm", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "some schools offer programmes delivering some subjects in a minority language (Russian in Estonia and Albanian in Montenegro) and others in a foreign language (English in both countries)", source: E }
  ],
  bullets: {
    localTerm: ["Eurydice files Russian as a 'regional or minority language without official status'", "Estonia recognises no regional or minority language in law, Fig. A1"],
    mediumOfInstruction: ["Estonian-Russian CLIL runs across ISCED 1-3, Eurydice Annex 2", "A Russian-plus-English programme without Estonian runs at ISCED 1"],
    taughtAsSubject: ["No top-level steering document names Russian as a subject to be provided"]
  },
  note: "Russian in Estonia is a Soviet-era community language rather than an indigenous one; it is recorded because Eurydice itself files it as a regional or minority language." });

write({ unit: "FI|Finland", slug: "FI", status: "documented", sources: [EU], langs: ["Romany", "Saami"],
  langNotes: ["'Sami' misses in WALS; the genus row 'Saami' [genus-saami] is used because Eurydice names only 'Sami' and not a variety. WALS also carries Saami (Northern) [sno, iso sme] and Saami (Central-South) [scs, iso sma].", ROMANY_NOTE],
  evidence: [
    { field: "languages", quote: "FI Finnish, Swedish | Romany, Sami", source: E },
    { field: "localTerm", quote: ALLOFF, source: E },
    { field: "mediumOfInstruction", quote: "1 state language + 1 non-territorial language with official language status | Finnish + Sami | 1-2", source: E }
  ],
  bullets: {
    localTerm: ["Both hold official status; Eurydice's heading is 'regional or minority language'", "Romany is filed as a 'non-territorial language' after the Charter's term", "Annex 2 files Sami as non-territorial too, though Figure A1 does not"],
    mediumOfInstruction: ["Finnish-Sami CLIL at ISCED 1-2, Eurydice Annex 2", "No CLIL pairing is recorded for Romany"],
    taughtAsSubject: ["Every officially recognised language, and only those, reaches steering documents"]
  } });

write({ unit: "GR|Greece", slug: "GR", status: "documented", sources: [EU], langs: ["Turkish"],
  evidence: [
    { field: "languages", quote: "In Greece, steering documents cover the teaching of Turkish, which takes place in some minority schools.", source: E },
    { field: "localTerm", quote: PROMOTE, source: E },
    { field: "mediumOfInstruction", quote: "Only Greece, Bosnia and Herzegovina, Iceland and Turkiye do not provide CLIL programmes.", source: E }
  ],
  bullets: {
    localTerm: ["'regional or minority language' is Eurydice's term; Greek law recognises none", "Greek is the sole official language, Eurydice Fig. A1"],
    mediumOfInstruction: ["Teaching takes place in some minority schools, not across the system", "Greece is one of four systems Eurydice records as running no CLIL at all"],
    taughtAsSubject: ["Turkish is the one language top-level steering documents cover"]
  } });

write({ unit: "IE|Ireland", slug: "IE", status: "documented",
  sources: [EU, { label: "Department of Education (Ireland), Circular 0052/2019, 'Exemptions from the study of Irish', revising Circular 12/96", url: "https://assets.gov.ie/27471/6add2a93f75e40c19233c552f226bcac.pdf", http: 200, tier: "official-document" }],
  langs: ["Irish"],
  langNotes: ["WALS carries 'Irish' [iri] plus Irish (Donegal) and Irish (Munster); the undifferentiated record is used."],
  evidence: [
    { field: "localTerm", quote: "IE English, Irish", source: E },
    { field: "localTerm", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "Exemption from the study of Irish will not apply in Primary Schools where Irish is the medium of instruction.", source: "https://assets.gov.ie/27471/6add2a93f75e40c19233c552f226bcac.pdf" },
    { field: "mediumOfInstruction", quote: "IE 1 state language + 1 other state language | English + Irish | 1-3", source: E },
    { field: "taughtAsSubject", quote: "The Language component of the Primary Curriculum is for all pupils and comprises both Irish and English. In exceptional circumstances, some pupils may be granted an exemption from the study of Irish.", source: "https://assets.gov.ie/27471/6add2a93f75e40c19233c552f226bcac.pdf" }
  ],
  bullets: {
    localTerm: ["Irish is a state language, not a regional or minority one, Eurydice Fig. A1", "Ireland recognises no regional or minority language in the Charter sense"],
    mediumOfInstruction: ["Irish-medium primary schools exist; the exemption rules do not reach them", "Circular 0052/2019 applies to English-medium primary schools only", "Eurydice files English-plus-Irish CLIL as two state languages, ISCED 1-3"],
    taughtAsSubject: ["Compulsory: the primary language curriculum is for all pupils, Irish and English", "Exemption possible in exceptional circumstances, Circular 0052/2019", "Exemptions granted under the old Circular 12/96 run to end of post-primary"]
  } });

write({ unit: "IS|Iceland", slug: "IS", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "Only Greece, Bosnia and Herzegovina, Iceland and Turkiye do not provide CLIL programmes.", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use", "Icelandic is the sole state language, Eurydice Fig. A1"],
    mediumOfInstruction: ["Iceland is one of four systems Eurydice records as running no CLIL at all"]
  } });

write({ unit: "LI|Liechtenstein", slug: "LI", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "LI 1 state language + 1 foreign language | German + English", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use", "German is the sole state language, Eurydice Fig. A1"],
    mediumOfInstruction: ["The only CLIL recorded is German with English, a foreign language"]
  } });

write({ unit: "LU|Luxembourg", slug: "LU", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "Luxembourg: all instruction is provided in a language other than Luxembourgish, mostly in French or German.", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use", "Luxembourgish is a state language alongside German and French, Fig. A1"],
    mediumOfInstruction: ["All instruction is in a language other than Luxembourgish", "Mostly French or German, Eurydice Annex 2 country note"]
  },
  note: "Luxembourgish is the indigenous language of the place but is classed as a state language, so it carries no regional or minority designation." });

write({ unit: "MT|Malta", slug: "MT", status: "not-found", sources: [EU], langs: [],
  evidence: [
    { field: "languages", quote: NOREF, source: E },
    { field: "mediumOfInstruction", quote: "MT 1 state language + 1 other state language | Maltese + English | 1-3", source: E }
  ],
  bullets: {
    localTerm: ["No regional or minority language category is in use", "Maltese and English are both state languages, Eurydice Fig. A1"],
    mediumOfInstruction: ["Maltese-English CLIL across ISCED 1-3, filed as two state languages"]
  } });

console.log(JSON.stringify(stats(), null, 1));
