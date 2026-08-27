const { write, stats } = require("./gen");
const un = c => "https://www.unicef.org/esa/sites/unicef.org.esa/files/2018-09/UNICEF-" + c + ".pdf";
const UN = (c, y) => ({ label: "UNICEF ESARO, 'The impact of language policy and practice on children's learning: Evidence from Eastern and Southern Africa' - " + c + " country review (" + y + ")", url: un(y + "-Language-and-Learning-" + c), http: 200, tier: "secondary-source" });
const peer = (r, c) => "https://education-profiles.org/" + r + "/" + c + "/~inclusion";
const PEER = (r, c, name) => ({ label: "UNESCO Profiles Enhancing Education Reviews (PEER), " + name + " - Inclusion", url: peer(r, c), http: 200, tier: "secondary-source" });

// ---------------- Angola
write({ unit: "AO|Angola", slug: "AO", status: "documented", sources: [UN("Angola", 2016)],
  langs: ["Chokwe", "Kongo", "Kimbundu", "Ngangela", "Nyaneka", "Kwanyama", "UMbundu"],
  langNotes: ["Chokwe (ISO cjk), Kimbundu (kmb), Nyaneka (nyk) and Kwanyama (kua) have no WALS record on name or ISO code. The source's 'Olunyaneka' and 'Oshikwanyama' are given here without their noun-class prefixes.", "Kikongo resolves as WALS 'Kongo' [kon, iso kng]. NOTE THE TRAP: WALS code 'kng' is Kaingang, a Je language of Brazil."],
  evidence: [
    { field: "languages", quote: "the books are now being trialled in about 120 classrooms, and are expected to be rolled out to more than 1 million children beginning in 2009, in a program that embraces the indigenous languages of Cokwe, Kikongo, Kimbundu, Ngangela, Olunyaneka, Oshikwanyama and Umbundu.", source: un("2016-Language-and-Learning-Angola") },
    { field: "localTerm", quote: "the state shall value and promote the study, teaching and use of other Angolan languages", source: un("2016-Language-and-Learning-Angola") },
    { field: "taughtAsSubject", quote: "the primary curriculum subjects include Portuguese and a national language; the authors comment that 'which national language is included is determined by the region and the dominant language of that part of the country.'", source: un("2016-Language-and-Learning-Angola") }
  ],
  bullets: {
    localTerm: ["Two terms coexist: 'Angolan languages' and 'languages of African origin'", "The curriculum slot itself is called simply 'a national language'"],
    mediumOfInstruction: ["Law 13/01 admitted them as a medium; Portuguese remains it in practice", "Textbooks in seven Angolan languages were trialled from 2008"],
    taughtAsSubject: ["The primary curriculum carries Portuguese plus one national language", "Which one depends on the dominant language of that part of the country", "Reported as still at the experimental stage as of late 2014"]
  } });

// ---------------- Burkina Faso
const BF = "https://www.adeanet.org/sites/default/files/publications/PDF/experiencesafricaines_01_en.pdf";
write({ unit: "BF|Burkina Faso", slug: "BF", status: "documented",
  sources: [{ label: "ADEA, 'African Experiences - Country Case Studies' no. 1: bilingual education in Burkina Faso", url: BF, http: 200, tier: "secondary-source" }],
  langs: ["Mooré", "Dyula", "Fulfulde (Maasina)", "Lyele", "Gurma", "Dagaare", "Bisa", "Nuni (Northern)"],
  langNotes: [
    "The source's 'Dioula' is WALS 'Dyula' [dyu]; 'Gulmancema' is WALS 'Gurma' [grm, iso gux]; 'lyélé' is WALS 'Lyele' [lye, iso lee].",
    "'Fulfulde' is unqualified in the source. WALS splits it; Fulfulde (Maasina) [fum, iso ffm] is the West African variety used here and the choice is editorial.",
    "'Dagara' has no WALS record; the closely related 'Dagaare' [dga] is used and the substitution is flagged rather than hidden. NOTE THE TRAP: querying ISO dgi returns Dogri, an Indo-Aryan language of Jammu, which rows.js now writes unlinked.",
    "NOTE THE TRAP: WALS code 'mos' is Moseten of Bolivia; Mooré is WALS 'Mooré' [moo] and carries ISO mos."
  ],
  evidence: [
    { field: "languages", quote: "At present, eight national languages are used in bilingual education in conjunction with French: Moore, Dioula, Fulfulde, lyele, Gulmancema, Dagara, Bisa and Nuni.", source: BF },
    { field: "mediumOfInstruction", quote: "the teaching languages are French and national languages", source: BF },
    { field: "localTerm", quote: "national languages are promoted and valued", source: BF }
  ],
  bullets: {
    localTerm: ["'national languages', the standard francophone West African term", "French is the official language and the other half of every pairing"],
    mediumOfInstruction: ["Eight national languages are media in the bilingual stream, with French", "French's share rises through the cycle, reaching 90% in the fifth year", "Bilingual pupils sit the CEP exam on the same terms as monolingual ones"],
    taughtAsSubject: ["Not an add-on subject: the language carries the curriculum in these schools"]
  } });

// ---------------- Burundi
write({ unit: "BI|Burundi", slug: "BI", status: "documented", sources: [UN("Burundi", 2017)],
  langs: ["Rundi", "Swahili"],
  langNotes: ["Kirundi resolves as WALS 'Rundi' [rnd, iso run]. NOTE THE TRAP: WALS code 'run' is Runga, a Nilo-Saharan language of Chad."],
  evidence: [
    { field: "localTerm", quote: "Kirundi is the national language", source: un("2017-Language-and-Learning-Burundi") }
  ],
  bullets: {
    localTerm: ["'national language' under the 2005 Constitution, for the majority language", "The original version of every legislative text must be in Kirundi"]
  },
  note: "Kirundi is the language of almost the whole population, so the 'national language' label here marks a majority language, not a minority one - exactly the African usage the brief warns about." });

// ---------------- Benin
const BJ = "https://sgg.gouv.bj/doc/loi-2003-17/download";
write({ unit: "BJ|Benin", slug: "BJ", status: "partial",
  sources: [{ label: "Loi n. 2003-17 du 11 novembre 2003 portant orientation de l'Education Nationale en Republique du Benin, arts. 8 and 23 (Secretariat General du Gouvernement)", url: BJ, http: 200, tier: "official-document" }],
  langs: [],
  evidence: [
    { field: "localTerm", quote: "Article 8.- L'enseignement est dispense principalement en francais, en anglais et en langues nationales", source: BJ },
    { field: "taughtAsSubject", quote: "Les langues nationales sont utilisees d'abord comme matiere et ensuite comme vehicule d'enseignement dans le systeme educatif.", source: BJ },
    { field: "mediumOfInstruction", quote: "Il est dispense en francais, en anglais et en une langue nationale majoritaire dans la localite ou toute autre langue.", source: BJ }
  ],
  bullets: {
    localTerm: ["'langues nationales' - the statute's own category, art. 8", "Art. 8 makes English a statutory medium alongside French and these"],
    mediumOfInstruction: ["Teaching is given principally in French, English and national languages", "Pre-primary uses the national language of majority use in the locality", "Or any other language, in the statute's own wording"],
    taughtAsSubject: ["Used first as a subject and only then as a vehicle of teaching", "The State must fund research and materials from pre-primary upward"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Loi 2003-17 names no language other than French and English. It works entirely through the category 'langues nationales' and, for pre-primary, 'une langue nationale majoritaire dans la localite'." });

// ---------------- Botswana
write({ unit: "BW|Botswana", slug: "BW", status: "documented", sources: [UN("Botswana", 2017)],
  langs: ["Tswana"],
  langNotes: ["Setswana resolves as WALS 'Tswana' [tsw, iso tsn]. NOTE THE TRAP: WALS code 'tsn' is Tsonga, a different Bantu language - and WALS code 'tso' is Tsou, of Taiwan. The two Setswana/Xitsonga codes are crossed between the two schemes."],
  evidence: [
    { field: "languages", quote: "The policy recognises Setswana and English, and no other language", source: "entry standing text, from " + un("2017-Language-and-Learning-Botswana") }
  ],
  bullets: {
    localTerm: ["Setswana is a national and official language, not a minority one", "No other Botswana language carries any designation in the policy"]
  },
  note: "The country review records a policy that recognises exactly two languages while the country has considerably more. The gap between this one row and the country's inventory is the whole point of the entry." });

// ---------------- DR Congo
write({ unit: "CD|DR Congo", slug: "CD", status: "partial",
  sources: [PEER("sub-saharan-africa", "democratic-republic-of-congo", "Democratic Republic of the Congo")],
  langs: [],
  evidence: [
    { field: "mediumOfInstruction", quote: "From first grade to fourth grade, one of the four designated national languages is both an independent subject and the language of instruction. French is also an independent subject.", source: peer("sub-saharan-africa", "democratic-republic-of-congo") },
    { field: "taughtAsSubject", quote: "In fifth grade and sixth grade, French is both a subject and the principal language of instruction. However, national languages remain independent subjects.", source: peer("sub-saharan-africa", "democratic-republic-of-congo") },
    { field: "localTerm", quote: "The ELAN programme for the teaching of national languages allows national or local languages to be used as a language of teaching and learning at the elementary and junior primary levels and as a subject at the secondary and higher levels.", source: peer("sub-saharan-africa", "democratic-republic-of-congo") }
  ],
  bullets: {
    localTerm: ["'national languages', with 'local languages' used alongside it", "The profile says four are designated but never names one of them"],
    mediumOfInstruction: ["Grades 1-4: one of the four national languages is the language of instruction", "Grades 3-4 are transition years, French used more as an oral medium", "Grades 5-6: French becomes the principal language of instruction"],
    taughtAsSubject: ["The national language is an independent subject from grade 1 onward", "It stays an independent subject after French takes over as medium"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. The PEER profile refers to 'the four designated national languages' and to 'the four local languages' for which manuals are planned, but does not name any of them anywhere in the retrieved text." });

// ---------------- Congo
write({ unit: "CG|Congo", slug: "CG", status: "documented", sources: [PEER("sub-saharan-africa", "congo", "Congo")],
  langs: ["Lingala", "Kituba"],
  langNotes: ["'Munukutuba' is the Congolese name for Kituba; WALS carries it as 'Kituba' [ktb, iso ktu]. NOTE THE TRAP: WALS code 'ktu' is Katu, an Austroasiatic language of Vietnam."],
  evidence: [
    { field: "languages", quote: "Under article 4 of Act No. 20/80 of 11 September 1980 on the reorganization of the education system, the two national languages (Lingala and Munukutuba) are taught in school. In reality, these subjects are taught in only a certain number of schools.", source: peer("sub-saharan-africa", "congo") },
    { field: "mediumOfInstruction", quote: "Unlike in the formal system, these students learn using mother tongues and national languages and their teachers are from the indigenous community", source: peer("sub-saharan-africa", "congo") }
  ],
  bullets: {
    localTerm: ["'the two national languages', named in Act No. 20/80 art. 4", "About 60 ethnic groups are recorded, and two languages carry the label"],
    mediumOfInstruction: ["French has remained the only language of instruction in the formal system", "Mother tongues and national languages are used outside it, with community teachers"],
    taughtAsSubject: ["Both are taught in school under the 1980 Act", "In reality these subjects reach only a certain number of schools"]
  } });

// ---------------- Cameroon
write({ unit: "CM|Cameroon", slug: "CM", status: "partial",
  sources: [PEER("sub-saharan-africa", "cameroon", "Cameroon"), { label: "Loi n. 98/004 du 4 avril 1998 d'orientation de l'education au Cameroun, art. 5 (MINEDUB)", url: "https://www.minedub.cm/download/336/texts-legislatifs-fr/5614/loi-n98-004-du-4-avril-1998-orientation-de-leducation-au-cameroun.pdf", http: 200, tier: "official-document" }],
  langs: [],
  evidence: [
    { field: "taughtAsSubject", quote: "have increasingly been integrated into the official curricula. This framework act aims to facilitate learners' understanding of their own and other cultures. It aims to enable students to learn to read, write and speak various languages fluently.", source: peer("sub-saharan-africa", "cameroon") }
  ],
  bullets: {
    localTerm: ["'national languages', named among education's objectives in Loi 98/004 art. 5", "PEER also uses 'native languages' for the same set"],
    taughtAsSubject: ["Native languages have increasingly been integrated into official curricula", "Cameroon is one of twelve ELAN-Afrique partner countries"]
  },
  note: "NO LANGUAGE ROWS WRITTEN. Neither the PEER profile nor the standing entry names a single Cameroonian language. Cameroon has one of the largest language inventories in Africa and this entry engages with none of them by name." });

// ---------------- Cape Verde
const CV = "https://observalinguaportuguesa.org/governo-suspende-manual-escolar-de-lingua-cabo-verdiana-apos-polemica/";
write({ unit: "CV|Cape Verde", slug: "CV", status: "documented",
  sources: [{ label: "Observatorio da Lingua Portuguesa / Lusa, 'Governo suspende manual escolar de lingua cabo-verdiana apos polemica', 16 September 2025", url: CV, http: 200, tier: "secondary-source" }, PEER("sub-saharan-africa", "cabo-verde", "Cabo Verde")],
  langs: ["Cape Verdean Creole"],
  langNotes: ["Cape Verdean Creole has no WALS record on that name or on its ISO code kea. NOTE THE TRAP: WALS code 'kea' is Kanjobal (Eastern), a Mayan language of Guatemala."],
  evidence: [
    { field: "localTerm", quote: "o primeiro manual de Lingua e Cultura Cabo-verdiana do 10. ano de escolaridade", source: CV },
    { field: "taughtAsSubject", quote: "O ministerio recordou que a introducao da disciplina no curriculo do secundario visou criar condicoes para a oficializacao da lingua cabo-verdiana.", source: CV },
    { field: "taughtAsSubject", quote: "O manual foi lancado em fevereiro, em todas as 44 escolas secundarias do arquipelago e tambem esta disponivel em formato digital.", source: CV }
  ],
  bullets: {
    localTerm: ["'lingua cabo-verdiana' - the Cape Verdean language, in the ministry's own words", "The PEER profile uses only 'national languages' and names nothing"],
    taughtAsSubject: ["A secondary subject, Lingua e Cultura Cabo-verdiana, entered the curriculum", "Its stated purpose was to prepare the language's officialisation", "The Year 10 textbook reached all 44 secondary schools in February 2025", "Distribution was suspended in September 2025 after public controversy"]
  } });

// ---------------- Djibouti
write({ unit: "DJ|Djibouti", slug: "DJ", status: "documented", sources: [PEER("sub-saharan-africa", "djibouti", "Djibouti")],
  langs: ["Qafar", "Somali"],
  langNotes: ["Afar resolves as WALS 'Qafar' [qaf, iso aar]. NOTE THE TRAP: WALS code 'aar' is Aari, an Omotic language of Ethiopia."],
  evidence: [
    { field: "languages", quote: "a decree issued by the Council of Ministers sets out methods for teaching in French, Arabic, Afar and Somali", source: peer("sub-saharan-africa", "djibouti") },
    { field: "localTerm", quote: "education and training are provided in the official languages and in the national languages", source: peer("sub-saharan-africa", "djibouti") },
    { field: "mediumOfInstruction", quote: "an office for the development of Arabic and national languages was established, which is responsible for implementing and monitoring the policy for increasing the status of the Arabic language, promoting the introduction of national languages into the education system", source: peer("sub-saharan-africa", "djibouti") }
  ],
  bullets: {
    localTerm: ["'national languages', set against 'the official languages', French and Arabic", "Afar and Somali are the two the decree names"],
    mediumOfInstruction: ["A Council of Ministers decree sets out methods for teaching in Afar and Somali", "Alongside French and Arabic, the two official languages"],
    taughtAsSubject: ["A 2012 office promotes their introduction into the education system", "The same office works to raise the status of Arabic"]
  } });

console.log(JSON.stringify(stats(), null, 1));
