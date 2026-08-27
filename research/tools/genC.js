const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "reports", "parts");
const work = JSON.parse(fs.readFileSync(path.join(__dirname, "langwork.json"), "utf8"))
  .filter(x => x.region === "Americas");
const byUnit = Object.fromEntries(work.map(x => [x.unit, x]));
const files = {};
const SEAL = "https://sealofbiliteracy.org/doc/2024-National-Seal-of-Biliteracy-Report-Final.pdf";
const ECS = "https://reports.ecs.org/comparisons/high-school-graduation-requirements-2023";

const ABBR = {
  Alabama:"AL", Alaska:"AK", Arizona:"AZ", Arkansas:"AR", California:"CA", Colorado:"CO",
  Connecticut:"CT", Delaware:"DE", "District of Columbia":"DC", Florida:"FL", Georgia:"GA",
  Idaho:"ID", Illinois:"IL", Indiana:"IN", Iowa:"IA", Kansas:"KS", Kentucky:"KY",
  Louisiana:"LA", Maine:"ME", Maryland:"MD", Massachusetts:"MA", Michigan:"MI",
  Minnesota:"MN", Mississippi:"MS", Missouri:"MO", Montana:"MT", Nebraska:"NE",
  Nevada:"NV", "New Hampshire":"NH", "New Jersey":"NJ", "New Mexico":"NM", "New York":"NY",
  "North Carolina":"NC", "North Dakota":"ND", Ohio:"OH", Oklahoma:"OK", Oregon:"OR",
  Pennsylvania:"PA", "Rhode Island":"RI", "South Carolina":"SC", "South Dakota":"SD",
  Tennessee:"TN", Texas:"TX", Utah:"UT", Vermont:"VT", Virginia:"VA", Washington:"WA",
  "West Virginia":"WV", Wisconsin:"WI", Wyoming:"WY"
};

// ---------- units written by hand ----------

files["lang-US.md"] = `### US|United States
STATUS: documented
LANGUAGES:
[
 {
  "name": "Keresan",
  "wals": "genus-keresan",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Navajo",
  "wals": "nav",
  "iso": "nav",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": "Word order SOV; Noun-Adjective; Strong prefixing; Simple tone system"
 },
 {
  "name": "Hawaiian",
  "wals": "haw",
  "iso": "haw",
  "family": "Austronesian > Eastern Malayo-Polynesian",
  "genus": "Oceanic",
  "typology": "Word order VSO; Noun-Adjective; Little affixation; No tones"
 },
 {
  "name": "Samoan",
  "wals": "sam",
  "iso": "smo",
  "family": "Austronesian > Eastern Malayo-Polynesian",
  "genus": "Oceanic",
  "typology": "Word order No dominant order; Noun-Adjective; Little affixation"
 },
 {
  "name": "Tewa",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Tiwa",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Yakima",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Yup'ik (Central)",
  "wals": "ypk",
  "iso": "esu",
  "family": "Eskimo-Aleut",
  "genus": "Eskimo",
  "typology": "Word order No dominant order; No dominant order; Strongly suffixing"
 },
 {
  "name": "Yurok",
  "wals": "yur",
  "iso": "yur",
  "family": "Algic",
  "genus": "Yurok",
  "typology": "Word order No dominant order; Adjective-Noun; Weakly suffixing; No tones"
 },
 {
  "name": "Zuni",
  "wals": "zun",
  "iso": "zun",
  "family": "Zuni",
  "genus": "Zuni",
  "typology": "Word order SOV; Noun-Adjective; No tones"
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Named: Keres, Navajo, 'Olelo Hawai'i, Samoan, Tewa, Tiwa, Yakima"
   source: standing text on this entry
   note: Eleven names on the entry, ten rows. "Yugtun" and "Yup'ik" are the same language (Central Alaskan Yup'ik, iso esu) under two names, so they share ONE row. Keres is given with no variety and Keresan has a genus row, so the genus row is used. Tewa (three WALS varieties), Tiwa (two) and Yakima (no WALS record; WALS's Sahaptin rows are Klikitat and Umatilla, different varieties) are written unlinked rather than guessed. 'Olelo Hawai'i is WALS Hawaiian.
 - field: languages
   quote: "Also Yugtun, Yup'ik, Yurok and Zuni"
   source: standing text on this entry
 - field: localTerm
   quote: "Eleven Native American and Pacific Islander languages carried Seal awards in 2022-23"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Eleven Native American and Pacific Islander languages carried Seal awards in 2022-23"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Native American and Pacific Islander languages" is the Seal report's grouping
     - No federal statutory category attaches to them in general education
     - Federal role in schooling is limited, so the term comes from a survey
 - field: mediumOfInstruction
   bullets:
     - No federal medium-of-instruction provision for these languages was found
     - The Seal certifies proficiency, however acquired, not a language of instruction
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - Eleven such languages carried Seal awards in 2022-23, across seven states
     - Yugtun and Yup'ik appear separately in the list but are one language
`;

files["lang-US-AK.md"] = `### US|Alaska
STATUS: documented
LANGUAGES:
[
 {
  "name": "Yup'ik (Central)",
  "wals": "ypk",
  "iso": "esu",
  "family": "Eskimo-Aleut",
  "genus": "Eskimo",
  "typology": "Word order No dominant order; No dominant order; Strongly suffixing"
 },
 {
  "name": "Tup'ik",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Seal of Biliteracy awarded in Yugtun and Tup'ik in 2022-23"
   source: standing text on this entry
   note: "Yugtun" is the endonym of Central Alaskan Yup'ik, WALS Yup'ik (Central), iso esu. "Tup'ik" is the report's spelling; it matches no WALS record by name and no ISO code could be established for it without guessing, so the row is written unlinked and the source's spelling is kept.
 - field: taughtAsSubject
   quote: "Seal of Biliteracy awarded in Yugtun and Tup'ik in 2022-23"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Alaska's own term is not in the sources cited; the Seal report says Native American
     - Both names on the list are endonyms, not English labels
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - One of only seven states awarding the Seal in an Indigenous US language
`;

files["lang-US-AZ.md"] = `### US|Arizona
STATUS: documented
LANGUAGES:
[
 {
  "name": "Navajo",
  "wals": "nav",
  "iso": "nav",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": "Word order SOV; Noun-Adjective; Strong prefixing; Simple tone system"
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Seal of Biliteracy awarded in Navajo in 2022-23"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Seal of Biliteracy awarded in Navajo in 2022-23"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Arizona's own term is not in the sources cited; the Seal report says Native American
     - Navajo is the only such language on Arizona's Seal list
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - One of only seven states awarding the Seal in an Indigenous US language
`;

files["lang-US-CA.md"] = `### US|California
STATUS: documented
LANGUAGES:
[
 {
  "name": "Yurok",
  "wals": "yur",
  "iso": "yur",
  "family": "Algic",
  "genus": "Yurok",
  "typology": "Word order No dominant order; Adjective-Noun; Weakly suffixing; No tones"
 },
 {
  "name": "Mixtec",
  "wals": "genus-mixtec",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Sipakapense",
  "wals": "qum",
  "iso": "qum",
  "family": "Mayan",
  "genus": "Mayan",
  "typology": "Word order VSO; Adjective-Noun; Strong prefixing"
 },
 {
  "name": "Samoan",
  "wals": "sam",
  "iso": "smo",
  "family": "Austronesian > Eastern Malayo-Polynesian",
  "genus": "Oceanic",
  "typology": "Word order No dominant order; Noun-Adjective; Little affixation"
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Seal awarded in Yurok, Mixteco, Sipakapense and Samoan in 2022-23"
   source: standing text on this entry
   note: Yurok is Indigenous to California. Mixteco and Sipakapense are Indigenous languages of Mexico and Guatemala carried into California by migration, and Samoan is a Pacific language of its communities; the report treats all four alike, so all four are recorded. "Mixteco" is given with no variety and WALS splits Mixtec into many, so the Mixtec GENUS row is used.
 - field: taughtAsSubject
   quote: "Seal awarded in Yurok, Mixteco, Sipakapense and Samoan in 2022-23"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - California's own term is not in the sources cited; the Seal report says Native American
     - Its list mixes a California language with Mesoamerican and Pacific ones
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - Sipakapense and Mixteco arrive with speakers, not through a state curriculum
     - Yurok is the one language of California itself on the list
`;

files["lang-US-NM.md"] = `### US|New Mexico
STATUS: documented
LANGUAGES:
[
 {
  "name": "Keresan",
  "wals": "genus-keresan",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Navajo",
  "wals": "nav",
  "iso": "nav",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": "Word order SOV; Noun-Adjective; Strong prefixing; Simple tone system"
 },
 {
  "name": "Tewa",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Tiwa",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Zuni",
  "wals": "zun",
  "iso": "zun",
  "family": "Zuni",
  "genus": "Zuni",
  "typology": "Word order SOV; Noun-Adjective; No tones"
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Seal awarded in Keres, Navajo, Tewa, Tiwa and Zuni in 2022-23"
   source: standing text on this entry
   note: Keres is given with no variety and Keresan has a genus row, so the genus row is used. Tewa has three WALS varieties and Tiwa two, and Kiowa-Tanoan is too broad a genus to stand for either, so both are written unlinked rather than guessed. Navajo and Zuni resolve directly.
 - field: taughtAsSubject
   quote: "Five Pueblo and Navajo languages, more than any other state"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - New Mexico's own term is not in the sources cited; the Seal report says Native American
     - Four of the five are Pueblo languages, from three unrelated families
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - Widest Indigenous Seal list of any state, at five languages
`;

files["lang-US-WA.md"] = `### US|Washington
STATUS: partial
LANGUAGES:
[
 {
  "name": "Yakima",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Seal of Biliteracy awarded in Yakima in 2022-23"
   source: standing text on this entry
   note: WALS carries no row named Yakima. Its Sahaptian rows are "Klikitat" and "Sahaptin (Umatilla)", both different varieties, so linking either would name the wrong lect. The row is written unlinked. A missing link here means WALS has no record of this variety, not that the language is unimportant.
 - field: taughtAsSubject
   quote: "Seal of Biliteracy awarded in Yakima in 2022-23"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Washington's own term is not in the sources cited; the Seal report says Native American
     - Yakima is the only such language on Washington's Seal list
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Qualifier: a Seal award proves proficiency, not that a course exists
     - One of only seven states awarding the Seal in an Indigenous US language
`;

files["lang-US-LA.md"] = `### US|Louisiana
STATUS: documented
LANGUAGES:
[
 {
  "name": "French",
  "wals": "fre",
  "iso": "fra",
  "family": "Indo-European",
  "genus": "Romance",
  "typology": "Word order SVO; Noun-Adjective; Strongly suffixing; No tones"
 }
]
EVIDENCE:
 - field: languages
   quote: "French here is a language of Louisiana itself, not a foreign language"
   source: standing text on this entry
   note: French belongs on THIS map for Louisiana because the statute treats it as a language of the state, tied to its own culture and history. That is the category the source uses.
 - field: localTerm
   quote: "R.S. 17:272 requires French language, culture and history of French Louisiana"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "High schools must offer three years of French plus a French-culture course"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - The statute's frame is "French Louisiana", a place, not a foreign country
     - No Native American language carries any designation in the sources cited
 - field: mediumOfInstruction
   bullets:
     - No French medium-of-instruction requirement appears in R.S. 17:272
     - The duty falls on what schools must OFFER, not on what they teach in
 - field: taughtAsSubject
   bullets:
     - High schools must offer three years of French, plus a French-culture course
     - Language, culture and history are required together, not separately
     - Nothing equivalent exists for any Native American language of the state
`;

files["lang-US-SD.md"] = `### US|South Dakota
STATUS: documented
LANGUAGES:
[
 {
  "name": "Lakhota",
  "wals": "lkt",
  "iso": "lkt",
  "family": "Siouan",
  "genus": "Mississippi Valley Siouan",
  "typology": "Word order SOV; Noun-Adjective; Weakly prefixing; No tones"
 },
 {
  "name": "Dakota",
  "wals": "dak",
  "iso": "dak",
  "family": "Siouan",
  "genus": "Mississippi Valley Siouan",
  "typology": ""
 },
 {
  "name": "Nakota",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "SDCL 1-27-20 names the O'ceti Sakowin language the official indigenous language"
   source: standing text on this entry
   note: The statute names one language with three dialects. WALS carries Lakota as "Lakhota" (iso lkt) and Dakota directly. Nakota reaches no WALS record: its usual ISO code asb (Assiniboine) is absent from WALS, and WALS's "Stoney" (sto) is the Alberta Nakoda, a different community, so linking it would name the wrong group.
 - field: languages
   quote: "Three dialects named: Lakota, Dakota and Nakota, added by SL 2019 ch 6"
   source: standing text on this entry
 - field: localTerm
   quote: "SDCL 1-27-20 names the O'ceti Sakowin language the official indigenous language"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "the official indigenous language" of the state, SDCL 1-27-20
     - Named as one language, O'ceti Sakowin, with three dialects
     - It is a recognition statute, so the term confers status, not schooling
 - field: mediumOfInstruction
   bullets:
     - Recognition only: SDCL 1-27-20 creates no schooling entitlement at all
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - No subject entitlement follows from the recognition statute
     - Seal of Biliteracy adopted only on 30 January 2024, last state to do so
     - So no 2022-23 Seal language list exists for South Dakota to test against
 - field: policyHistory
   rows:
     - year: 2019
       description: SL 2019 ch 6 adds the three dialects Lakota, Dakota and Nakota to SDCL 1-27-20
     - year: 2024
       description: South Dakota adopts the Seal of Biliteracy on 30 January, the last state to do so
`;

files["lang-US-OK.md"] = `### US|Oklahoma
STATUS: partial
LANGUAGES:
[
 {
  "name": "Cherokee",
  "wals": "che",
  "iso": "chr",
  "family": "Iroquoian",
  "genus": "Southern Iroquoian",
  "typology": "Word order No dominant order; Adjective-Noun; Weakly prefixing; Simple tone system"
 },
 {
  "name": "Choctaw",
  "wals": "cct",
  "iso": "cho",
  "family": "Muskogean",
  "genus": "Muskogean",
  "typology": "Word order SOV; Only internally-headed relative clauses; Equal prefixing and suffixing"
 },
 {
  "name": "Chickasaw",
  "wals": "cck",
  "iso": "cic",
  "family": "Muskogean",
  "genus": "Muskogean",
  "typology": "No tones"
 }
]
EVIDENCE:
 - field: languages
   quote: "No Cherokee, Choctaw or Chickasaw among them, though all are taught in the state"
   source: standing text on this entry
   note: NAMED AS AN ABSENCE. All three are named on this entry only to record that Oklahoma's Seal list omits them. The rows let the map show WHICH languages are missing from the credential; they must not be read as state provision.
 - field: localTerm
   quote: "Oklahoma Title 70 could not be retrieved; oscn.net refused the TLS handshake"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: Oklahoma Title 70 could not be retrieved, so state terminology is unread
     - No term for a language of the state appears in the sources that were read
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Named to record an absence: none of the three is on the Seal list
     - Fifteen Seal languages in 2022-23, none of them Native American
     - The entry reports all three are taught in the state, outside that credential
`;

files["lang-US-NC.md"] = `### US|North Carolina
STATUS: partial
LANGUAGES:
[
 {
  "name": "Cherokee",
  "wals": "che",
  "iso": "chr",
  "family": "Iroquoian",
  "genus": "Southern Iroquoian",
  "typology": "Word order No dominant order; Adjective-Noun; Weakly prefixing; Simple tone system"
 }
]
EVIDENCE:
 - field: languages
   quote: "No Cherokee among them, though the language is spoken in the state"
   source: standing text on this entry
   note: NAMED AS AN ABSENCE. Cherokee is named on this entry solely to record that it is missing from North Carolina's Seal list. The row shows WHICH language is absent; it is not evidence of provision.
 - field: localTerm
   quote: "North Carolina statute not itself examined; this rests on the Seal report and ECS"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: the state statute was not examined, so state terminology is unread
     - No term for a language of the state appears in the sources that were read
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Named to record an absence: Cherokee is not on the Seal list
     - Ten Seal languages in 2022-23, none of them Native American
`;

files["lang-US-VT.md"] = `### US|Vermont
STATUS: partial
LANGUAGES:
[
 {
  "name": "Abenaki (Western)",
  "wals": "abw",
  "iso": "abe",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "Abenaki does not appear among them"
   source: standing text on this entry
   note: NAMED AS AN ABSENCE. Abenaki is named on this entry only to record its absence from the Seal list. WALS carries a single Abenaki row, "Abenaki (Western)" (iso abe), which is the Abenaki of the Vermont side.
 - field: localTerm
   quote: "Vermont statute not itself examined; this rests on the Seal report and ECS"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: the state statute was not examined, so state terminology is unread
     - No term for a language of the state appears in the sources that were read
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Named to record an absence: Abenaki is not on the Seal list
     - Nine Seal languages in 2022-23, none of them Native American
`;

files["lang-US-WY.md"] = `### US|Wyoming
STATUS: partial
LANGUAGES:
[
 {
  "name": "Arapaho",
  "wals": "aho",
  "iso": "arp",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 },
 {
  "name": "Shoshone",
  "wals": "sho",
  "iso": "shh",
  "family": "Uto-Aztecan",
  "genus": "Northern Uto-Aztecan",
  "typology": "Word order SOV; Adjective-Noun; Strongly suffixing"
 }
]
EVIDENCE:
 - field: languages
   quote: "No Arapaho or Shoshone among them, though both are spoken at Wind River"
   source: standing text on this entry
   note: NAMED AS AN ABSENCE. Both are named on this entry only to record that Wyoming's Seal list omits them. The rows show WHICH languages are missing; they are not evidence of provision.
 - field: localTerm
   quote: "Wyoming statute not itself examined; this rests on the Seal report and ECS"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: the state statute was not examined, so state terminology is unread
     - No term for a language of the state appears in the sources that were read
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Named to record an absence: neither language is on the Seal list
     - Wyoming's four Seal languages are French, German, Japanese and Spanish
     - Both are spoken at Wind River, inside the state
`;

files["lang-US-MT.md"] = `### US|Montana
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "Defined to include the language of American Indians, MCA 20-1-502(1)"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The statute names the class, "the language of American Indians", and no individual language. Salish, Blackfeet, Crow and the rest are not named in the sources cited, so no row can be written.
 - field: localTerm
   quote: "MCA 20-1-503: trustees must require all students to receive American Indian studies"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Mandate is American Indian studies with language content, not a Native-language course"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "the language of American Indians" is the statutory phrase, MCA 20-1-502(1)
     - Singular and generic; no individual language is named
     - Constitutional footing in Mont. Const. Art. X sec. 1(2)
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - About the community, with language inside it: American Indian studies for ALL students
     - Language is one defined component of that studies mandate, not a course
     - Districts to use licensed Indian language and culture specialists to deliver it
`;

files["lang-US-OR.md"] = `### US|Oregon
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "ORS 342.144(2): teaching American Indian languages declared essential"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The statute legislates for "American Indian languages" as a class and leaves the naming to each tribe, which writes its own test. No individual language is named in the sources cited, so no row can be written.
 - field: localTerm
   quote: "ORS 342.144(2): teaching American Indian languages declared essential"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Statutory route is teacher licensing, not a curriculum entitlement for pupils"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "American Indian languages", a class the statute leaves to each tribe to fill
     - Each tribe writes and marks its own qualifying test, ORS 342.144(4)
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Supply side, not entitlement: the statute licenses teachers, not courses
     - Commission must establish an American Indian languages teaching licence
     - No degree or educator preparation programme may be required of an applicant
 - field: policyHistory
   rows:
     - year: 2001
       description: ORS 342.144 declares teaching of American Indian languages essential and creates a tribal-tested teaching licence
`;

files["lang-US-ND.md"] = `### US|North Dakota
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "ECS 2019 names Native American languages explicitly in the elective block"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The graduation policy names the class, "Native American languages", and no individual language. Dakota, Lakota, Michif, Arikara and the rest are not named in the sources cited.
 - field: localTerm
   quote: "ECS 2019 names Native American languages explicitly in the elective block"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "The 3 units may be foreign languages, Native American languages, fine arts or CTE"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Native American languages" is the graduation policy's category
     - Named as a class in the elective block, with no language itemised
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - Elective, not compulsory: three units may be filled several ways
     - Native American languages compete with fine arts and CTE for the same units
     - One of few states to name them at all in graduation policy
`;

files["lang-US-ME.md"] = `### US|Maine
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "20-A M.R.S. 4706 requires Maine Native American studies within Maine studies"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The statute names no language; the entry records that it lists cultural systems, territories and economic systems with no language clause. Passamaquoddy, Penobscot and Mi'kmaq are not named in the sources cited.
 - field: localTerm
   quote: "Maine law mandates Native American studies as history and culture, not language"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "It lists cultural systems, territories and economic systems - no language clause"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Maine Native American studies" names a subject, not a language category
     - No language of the state carries any statutory designation
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - About the community, not the language: the mandate is history and culture
     - The statute's list has no language clause in it at all
     - No Native American language was awarded in Maine's Seal of Biliteracy
`;

files["lang-US-WI.md"] = `### US|Wisconsin
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "Duty is to teach about the tribes in social studies, not to teach their languages"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The statute names the tribes as a class and no language. Ojibwe, Menominee, Ho-Chunk and the rest are not named in the sources cited.
 - field: localTerm
   quote: "Since 1 Sept 1991 instruction in tribal history, culture and sovereignty required"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Twice in the elementary grades and once in high school, Wis. Stat. 121.02(1)(L)4"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - No language category exists; the statute speaks of tribes, not languages
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - About the community, not the language: history, culture and sovereignty
     - Required twice in elementary grades and once in high school
     - None of Wisconsin's 18 Seal languages in 2022-23 was Native American
 - field: policyHistory
   rows:
     - year: 1991
       description: Wis. Stat. 121.02(1)(L)4 requires instruction in tribal history, culture and sovereignty from 1 September
`;

files["lang-US-TX.md"] = `### US|Texas
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "Provision is for pupils' own home languages, not for languages Indigenous to Texas"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. Texas's bilingual education duty attaches to whatever language a group of emergent bilinguals shares; the statute names none. No language Indigenous to Texas is named anywhere in the sources cited.
 - field: localTerm
   quote: "Bilingual education mandated where 20 or more emergent bilinguals share a grade"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Bilingual education, not ESL alone, required in kindergarten and elementary grades"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "emergent bilingual" is the pupil category; no language category exists
     - The trigger is a shared home language, whichever it happens to be
 - field: mediumOfInstruction
   bullets:
     - Home-language, not Indigenous: bilingual education required in K and elementary
     - Triggered where 20 or more emergent bilinguals share a grade level
     - ESL alone is permitted only from grade 9, Tex. Educ. Code 29.053(d)(3)
 - field: taughtAsSubject
   bullets:
     - No language Indigenous to Texas is named in any source cited
     - Texas did not report to the 2024 Seal survey, so its language list is unknown
`;

// ---------- formulaic no-language states ----------

const handled = new Set(["US|United States","US|Alaska","US|Arizona","US|California",
  "US|Louisiana","US|Maine","US|Montana","US|New Mexico","US|North Carolina",
  "US|North Dakota","US|Oklahoma","US|Oregon","US|South Dakota","US|Texas",
  "US|Vermont","US|Washington","US|Wisconsin","US|Wyoming"]);

for (const u of work) {
  if (!u.unit.startsWith("US|") || handled.has(u.unit)) continue;
  const state = u.unit.split("|")[1];
  const ab = ABBR[state];
  if (!ab) { console.log("!! no abbr for " + state); continue; }
  const lines = (u.standing || "").split("\n").filter(Boolean);
  const sealLine = lines.find(l => /Seal/.test(l)) || lines[0];
  const hedge = lines.find(l => /not.*examined|Evidence is|did not report/.test(l)) || lines[0];
  const noList = /no Seal language list|no language list|did not report/.test(u.standing || "");
  const evid = lines.map(l => `   quote: "${l.replace(/"/g, "'")}"\n   source: standing text on this entry`).join("\n - field: languages\n");
  files[`lang-US-${ab}.md`] = `### ${u.unit}
STATUS: not-found
LANGUAGES:
[]
SOURCES:
 - label: "2024 National Seal of Biliteracy Report"
   url: ${SEAL}
   tier: secondary-source
 - label: "ECS, High school graduation requirements, 50-state comparison"
   url: ${ECS}
   tier: secondary-source
EVIDENCE:
 - field: languages
${evid}
   note: ABSENCE IS THE RESULT, and it is a real one. Neither the entry's text nor either cited source names a single Indigenous or regional language of ${state}. No row can be written without inventing one, so none is.
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: rests on a Seal survey and a 50-state inventory, not on state statute
     - No state term for an Indigenous or regional language was found
     - ${noList ? "No Seal language list was filed, so even that inventory is missing" : "The Seal language list is the only inventory found, and it names none"}
 - field: mediumOfInstruction
   bullets:
     - No Indigenous or regional medium-of-instruction provision was found
 - field: taughtAsSubject
   bullets:
     - No Indigenous or regional language subject was found in the sources cited
     - Only AK, AZ, CA, HI, NM, OR and WA awarded the Seal in an Indigenous US language
`;
}

let n = 0;
for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), body, "utf8");
  n++;
}
console.log(n + " files written");
console.log(Object.keys(files).join(" "));
