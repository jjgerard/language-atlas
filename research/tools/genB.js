const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "..", "parts");
const files = {};

files["lang-CA.md"] = `### CA|Canada
STATUS: documented
LANGUAGES:
[
 {
  "name": "English",
  "wals": "eng",
  "iso": "eng",
  "family": "Indo-European",
  "genus": "Germanic",
  "typology": "Word order SVO; Adjective-Noun; Strongly suffixing; No tones"
 },
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
   quote: "Federal Protocol covers only official-language minorities, English and French"
   source: standing text on this entry
   note: English and French are on this map at the FEDERAL unit because the Protocol treats them as minority languages of the place, not as foreign languages. The finding is that the federal instrument names ONLY these two, and no Indigenous language.
 - field: localTerm
   quote: "Indigenous languages sit outside it, under separate instruments"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "official-language minority" is the federal category, English or French
     - Indigenous languages are not in it; they sit under separate instruments
     - So the federal term marks constitutional minority status, not indigeneity
 - field: mediumOfInstruction
   bullets:
     - Minority-language instruction is a provincial delivery duty, funded federally
     - No federal medium-of-instruction rule for Indigenous languages was found
 - field: taughtAsSubject
   bullets:
     - Federal Protocol funds second-language teaching of English and French
     - It carries no subject entitlement in any Indigenous language
`;

files["lang-CA-AB.md"] = `### CA|Alberta
STATUS: documented
LANGUAGES:
[
 {
  "name": "Blackfoot",
  "wals": "bla",
  "iso": "bla",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": "Word order No dominant order; Adjective-Noun; Weakly prefixing"
 },
 {
  "name": "Cree",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
SOURCES:
 - label: "Alberta Guide to Education, Language programs, course sequences and courses"
   url: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
   http: 200
   tier: official-document
 - label: "Education Act, SA 2012 c E-0.3, ss. 17 and 19"
   url: https://kings-printer.alberta.ca/documents/Acts/e00p3.pdf
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "Provincial programs for First Nations, Métis and Inuit languages and international languages available from Kindergarten to Grade 12 are outlined in the following chart"
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
   note: The chart's First Nations, Métis and Inuit column holds exactly two entries, Blackfoot and Cree. The source writes "Cree" with no variety and WALS splits Cree into Plains and Swampy with no Cree genus row, so that row is written with an empty wals field rather than guessing a variety.
 - field: localTerm
   quote: "First Nations, Métis and Inuit and international languages provincial programs available from Kindergarten to Grade 12"
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: localTerm
   quote: "Languages other than French or English"
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: mediumOfInstruction
   quote: "According to section 17 of the Education Act, a board may authorize the use of a language other than English or French as a language of instruction."
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: mediumOfInstruction
   quote: "A bilingual program (partial immersion) means a program in which a language other than French or English is used as a language of instruction, to a maximum of 50% of the instructional day."
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: mediumOfInstruction
   quote: "it is recommended that students in bilingual language programs have access to: 45 to 50% of the instructional time in the target language at the elementary school level"
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: taughtAsSubject
   quote: "Locally developed courses are available for additional international language and culture, international bilingual, and First Nations, Métis and Inuit language and culture programs."
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
 - field: taughtAsSubject
   quote: "Twelve-year Language and Culture ( 12Y ) program (Kindergarten to Grade 12)"
   source: https://manuals.alberta.ca/guide-to-education/program-planning-courses-and-programs/language-programs-course-sequences-courses/
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "First Nations, Métis and Inuit languages" is the province's category
     - Grouped in the Guide under "Languages other than French or English"
     - Only Blackfoot and Cree hold provincial programmes; the rest are local courses
 - field: mediumOfInstruction
   bullets:
     - Education Act s. 17: a board may authorise another language as a language of instruction
     - Bilingual (partial immersion) is capped at 50% of the instructional day
     - Guide recommends 45-50% of instructional time in the target language at elementary
     - S. 19 lets a board run an alternative programme where demand is sufficient
 - field: taughtAsSubject
   bullets:
     - Language and Culture sequences run 12Y, 9Y, 6Y and 3Y, K to Grade 12
     - Blackfoot and Cree have provincial programmes of study across that range
     - Other FNMI languages reach classrooms only as locally developed courses
`;

files["lang-CA-BC.md"] = `### CA|British Columbia
STATUS: documented
LANGUAGES:
[
 {
  "name": "Comox",
  "wals": "cmx",
  "iso": "coo",
  "family": "Salishan",
  "genus": "Central Salish",
  "typology": ""
 },
 {
  "name": "Carrier",
  "wals": "crq",
  "iso": "crx",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": ""
 },
 {
  "name": "Gitksan",
  "wals": "git",
  "iso": "git",
  "family": "Tsimshianic",
  "genus": "Tsimshianic",
  "typology": "Word order No dominant order; Adjective-Noun"
 },
 {
  "name": "Halkomelem (Upriver)",
  "wals": "hlu",
  "iso": "hur",
  "family": "Salishan",
  "genus": "Central Salish",
  "typology": "Word order VSO; Adjective-Noun"
 },
 {
  "name": "Halkomelem (Island)",
  "wals": "hli",
  "iso": "hur",
  "family": "Salishan",
  "genus": "Central Salish",
  "typology": ""
 },
 {
  "name": "Heiltsuk",
  "wals": "hei",
  "iso": "hei",
  "family": "Wakashan",
  "genus": "Northern Wakashan",
  "typology": "Word order VSO; Adjective-Noun"
 },
 {
  "name": "Kwakw'ala",
  "wals": "kwk",
  "iso": "kwk",
  "family": "Wakashan",
  "genus": "Northern Wakashan",
  "typology": "Word order No dominant order; Adjective-Noun; No tones"
 },
 {
  "name": "Nedut'en",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Okanagan",
  "wals": "oka",
  "iso": "oka",
  "family": "Salishan",
  "genus": "Interior Salish",
  "typology": ""
 },
 {
  "name": "Thompson",
  "wals": "tho",
  "iso": "thp",
  "family": "Salishan",
  "genus": "Interior Salish",
  "typology": "Word order No dominant order; Adjective-Noun"
 },
 {
  "name": "Nuuchahnulth",
  "wals": "nuu",
  "iso": "nuk",
  "family": "Wakashan",
  "genus": "Southern Wakashan",
  "typology": "Word order No dominant order; No dominant order; No tones"
 },
 {
  "name": "Shuswap",
  "wals": "shu",
  "iso": "shs",
  "family": "Salishan",
  "genus": "Interior Salish",
  "typology": "Word order No dominant order; Equal prefixing and suffixing; No tones"
 },
 {
  "name": "Saanich",
  "wals": "sch",
  "iso": "str",
  "family": "Salishan",
  "genus": "Central Salish",
  "typology": ""
 },
 {
  "name": "Shashishalhem",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Nisgha",
  "wals": "nsg",
  "iso": "ncg",
  "family": "Tsimshianic",
  "genus": "Tsimshianic",
  "typology": "Word order VSO; Adjective-Noun; Little affixation"
 },
 {
  "name": "Tsimshian (Coast)",
  "wals": "tsi",
  "iso": "tsi",
  "family": "Tsimshianic",
  "genus": "Tsimshianic",
  "typology": "Word order VSO; Adjective-Noun; Weakly suffixing; No tones"
 },
 {
  "name": "Lillooet",
  "wals": "lil",
  "iso": "lil",
  "family": "Salishan",
  "genus": "Interior Salish",
  "typology": "Word order VSO; Adjective-Noun"
 },
 {
  "name": "Tsek'ene",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Haida",
  "wals": "hai",
  "iso": "hai",
  "family": "Haida",
  "genus": "Haida",
  "typology": "Word order SOV; Noun-Adjective; Strongly suffixing; No tones"
 }
]
SOURCES:
 - label: "Educational Program Guide Order, Ministerial Order 231/19 (served at the M333/99 URL, which it repeals), s. 4(1) Provincial Template Second Language IRPs"
   url: https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/e/m333_99.pdf
   http: 200
   tier: official-document
 - label: "BC Language Education Policy, revised 2004, current at 18 December 2025"
   url: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "The following Provincial Template Second Language Integrated Resource Packages are specified as educational program guides"
   source: https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/e/m333_99.pdf
   note: NAMES RESOLVED. The Order's s. 4(1) table lists, among four international languages, these Indigenous IRPs: ʔayʔaǰuθəm, Dakelh, Gitxsenimx ~ Gitxsanimax, Halq'eméylem, Heiltsuk, Hul'q'umi'num, Kwak'wala, Liqwala/Kwakwala, Nedut'en, nsíylxcən (Okanagan), Nte?kepmxcin, Nuučaan̓uɫ, Secwepemctsin (Shuswap), SENĆOŦEN, Shashishalhem (Sechelt), Sim'algaxhl Nisga'a, Sm'algyax (Algyagm Ts'msyeen), St̓át̓y̓emcets, Tsek'ene, Upper St'át'imcets, Xaayda Kil / Xaad Kil. Two further rows lost their titles across a PDF page break (dated 2024 and 1999) and are NOT represented.
 - field: languages
   quote: "Halq'eméylem 5 to 12 Integrated Resource Package"
   source: https://www2.gov.bc.ca/assets/gov/education/administration/legislation-policy/legislation/schoollaw/e/m333_99.pdf
   note: WALS-name mapping used, each confirmed by ISO code AND by family. ʔayʔaǰuθəm=Comox(coo); Dakelh=Carrier(crx); Gitxsanimax=Gitksan(git); Halq'eméylem=Halkomelem Upriver and Hul'q'umi'num=Halkomelem Island (both hur, kept apart because the Order lists them as two courses); Kwak'wala and Liqwala/Kwakwala both kwk, so ONE Kwakw'ala row; nsíylxcən=Okanagan(oka); Nte?kepmxcin=Thompson(thp); Nuučaan̓uɫ=Nuuchahnulth(nuk); Secwepemctsin=Shuswap(shs); SENĆOŦEN=Saanich(str); Nisga'a=Nisgha(ncg); Sm'algyax=Tsimshian Coast(tsi); St̓át̓y̓emcets and Upper St'át'imcets both Lillooet(lil), so ONE row; Xaayda Kil=Haida(hai). Nedut'en, Shashishalhem and Tsek'ene are in NO WALS record by name or ISO, so are unlinked.
 - field: localTerm
   quote: "All students, especially those of Indigenous ancestry, should have opportunities to learn an Indigenous language ."
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
 - field: mediumOfInstruction
   quote: "English and French will be taught as first languages, all other languages will be taught as second languages."
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
   note: DECISIVE. The policy classes every Indigenous language as a SECOND language by rule, so BC has no Indigenous medium-of-instruction route in the public system.
 - field: mediumOfInstruction
   quote: "Indigenous language courses (as with all second language courses) should be developed appropriate to second language learners."
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
 - field: taughtAsSubject
   quote: "Only Indigenous languages with provincial curriculum for Grades 5 to 8 will be eligible to meet the second language requirement (see below)."
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
 - field: taughtAsSubject
   quote: "All students must take a second language as part of the curriculum in Grades 5 to 8"
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
 - field: taughtAsSubject
   quote: "The board of education and the local Indigenous people should collaborate to develop Indigenous language curriculum and resources."
   source: https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/language-education-policy
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Indigenous language" is the policy's term, in a second-language frame
     - Courses are "Provincial Template Second Language" IRPs, alongside Arabic and Russian
     - English and French alone are "first languages" under the policy
 - field: mediumOfInstruction
   bullets:
     - Rule, not practice: "all other languages will be taught as second languages"
     - So no Indigenous language is a medium of instruction in the public system
     - Courses must be designed "appropriate to second language learners"
 - field: taughtAsSubject
   bullets:
     - Second language compulsory in Grades 5 to 8, and an Indigenous one may fill it
     - Only languages with a provincial Grades 5-8 curriculum are eligible for that
     - 21 Indigenous IRPs are listed as program guides, spanning Grades 5 to 12
     - Boards must build the curriculum with the local Indigenous people
 - field: policyHistory
   rows:
     - year: 2019
       description: Ministerial Order 231/19 replaces the Educational Program Guide Order M333/99, carrying the Indigenous language IRP list
     - year: 2023
       description: Dakelh 5 to 12 Integrated Resource Package added to the provincial program guides
     - year: 2022
       description: ʔayʔaǰuθəm 5 to 12 Integrated Resource Package added to the provincial program guides
     - year: 2020
       description: Sim'algaxhl Nisga'a 5 to 12 Integrated Resource Package added to the provincial program guides
`;

files["lang-CA-MB.md"] = `### CA|Manitoba
STATUS: documented
LANGUAGES:
[
 {
  "name": "Cree",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
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
  "name": "Dene",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Inuktitut",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Michif",
  "wals": "mcf",
  "iso": "crg",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 },
 {
  "name": "Ojibwe",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Ojibwa (Severn)",
  "wals": "ojs",
  "iso": "ojs",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 }
]
SOURCES:
 - label: "The Public Schools Act, C.C.S.M. c. P250, s. 79, consolidated to 24 August 2026"
   url: https://web2.gov.mb.ca/laws/statutes/ccsm/p250.php
   http: 200
   tier: official-document
   note: The HTML page is a navigation shell; the text was read from the consolidated PDF the site serves at https://web2.gov.mb.ca/laws/statutes/ccsm/_pdf.php?cap=p250 (200).
EVIDENCE:
 - field: languages
   quote: "Aboriginal Languages Recognition Act 2010 names Cree, Dakota, Dene, Inuktitut"
   source: standing text on this entry
   note: Seven languages, taken from the entry's own text. Four resolve with an empty wals because the statute's name is a COVER TERM that WALS splits: Cree (Plains and Swampy, no Cree genus row), Ojibwe (Eastern, Minnesota and Severn), Inuktitut (Aivilingmiutut, Salluit, Quebec-Labrador), Dene (an Athapaskan cover term). Ojibwe-Cree is Severn Ojibwa, iso ojs, and does resolve. Dakota and Michif resolve directly.
 - field: languages
   quote: "Also Michif, Ojibwe and Ojibwe-Cree as languages spoken and used in Manitoba"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "English and French as languages of instruction 79(1) Subject as otherwise provided in this section, English and French are the languages of instruction in public schools."
   source: https://web2.gov.mb.ca/laws/statutes/ccsm/p250.php
 - field: mediumOfInstruction
   quote: "(e) in compliance with the regulations, as a language of instruction for not more than 50% of the regular school hours as determined by the minister."
   source: https://web2.gov.mb.ca/laws/statutes/ccsm/p250.php
   note: NEW FINDING, the legal ceiling on the Cree and Ojibwe bilingual programmes the entry already mentions. s. 79(2) permits another language only when the school board authorises it.
 - field: mediumOfInstruction
   quote: "(d) in compliance with the regulations as a language of instruction, for transitional purposes;"
   source: https://web2.gov.mb.ca/laws/statutes/ccsm/p250.php
 - field: taughtAsSubject
   quote: "(b) during a period authorized by the minister for teaching the language;"
   source: https://web2.gov.mb.ca/laws/statutes/ccsm/p250.php
 - field: taughtAsSubject
   quote: "K-12 Aboriginal Languages and Cultures framework of outcomes underpins curricula"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Aboriginal languages" is the recognising statute's term, 2010 Act
     - Recognised as "languages spoken and used in Manitoba", not as school subjects
     - The Public Schools Act calls them simply "a language other than English or French"
 - field: mediumOfInstruction
   bullets:
     - Ceiling, not an entitlement: s. 79(1) makes English and French the languages of instruction
     - S. 79(2)(e): another language may be a medium for at most 50% of school hours
     - It may also be a medium "for transitional purposes", s. 79(2)(d)
     - Either route needs the school board's authorisation first
 - field: taughtAsSubject
   bullets:
     - S. 79(2)(b): another language may be used in a period the minister authorises for teaching it
     - K-12 Aboriginal Languages and Cultures framework supplies the outcomes
     - Cree and Ojibwe bilingual programmes run in Winnipeg and Seven Oaks divisions
 - field: policyHistory
   rows:
     - year: 2010
       description: Aboriginal Languages Recognition Act names seven languages as spoken and used in Manitoba
`;

files["lang-CA-NB.md"] = `### CA|New Brunswick
STATUS: documented
LANGUAGES:
[
 {
  "name": "Micmac",
  "wals": "mic",
  "iso": "mic",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 },
 {
  "name": "Passamaquoddy-Maliseet",
  "wals": "psm",
  "iso": "pqm",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": "Word order No dominant order; Simple tone system"
 }
]
EVIDENCE:
 - field: languages
   quote: "Education Act purpose recognises the cultures and languages of Mi'kmaq and Wolastoqey peoples"
   source: standing text on this entry
   note: WALS carries Mi'kmaq under the older spelling "Micmac" (iso mic) and Wolastoqey under "Passamaquoddy-Maliseet" (iso pqm). Both were reached by ISO lookup after the endonyms missed on name.
 - field: localTerm
   quote: "Section 7 programming for Mi'kmaq and Wolastoqey children depends on a First Nation agreement"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Kehkimin Wolastoqey immersion school opened in Fredericton in 2022, K to Grade 4"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Kehkimin is an independent school, not part of the New Brunswick public system"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - The Act names the peoples, "Mi'kmaq and Wolastoqey", and their languages
     - No generic category such as Indigenous or minority language is used
 - field: mediumOfInstruction
   bullets:
     - Qualifier: the one immersion school is independent, outside the public system
     - Kehkimin runs Wolastoqey immersion in Fredericton, K to Grade 4, since 2022
     - Public-system programming under s. 7 needs a First Nation agreement first
 - field: taughtAsSubject
   bullets:
     - No provincial Mi'kmaq or Wolastoqey language course was found in the cited sources
     - The Act's recognition is a statement of purpose, not a subject entitlement
 - field: policyHistory
   rows:
     - year: 2022
       description: Kehkimin Wolastoqey immersion school opens in Fredericton, K to Grade 4, as an independent school
`;

files["lang-CA-NL.md"] = `### CA|Newfoundland and Labrador
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "Schools Act 1997 has no Indigenous-language instruction provision"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The entry names PEOPLES and SCHOOLS (Innu Nation at Sheshatshiu and Natuashish, Miawpukek Mi'kamawey Mawi'omi at Conne River) but no language. Writing Innu-aimun or Mi'kmaq rows here would be inference from the name of a nation, which the brief forbids, so none is written.
 - field: localTerm
   quote: "Section 2.1 gives the Labrador Inuit Land Claims Agreement Act precedence over the Act"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Innu Nation has run K-12 education in Sheshatshiu and Natuashish since 2009"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - The Schools Act uses no term for an Indigenous or regional language
     - Provision runs through land-claims instruments, not education categories
     - S. 2.1 subordinates the Act to the Labrador Inuit Land Claims Agreement Act
 - field: mediumOfInstruction
   bullets:
     - The Schools Act 1997 has no Indigenous-language instruction provision at all
     - Innu Nation has run its own K-12 schooling at Sheshatshiu and Natuashish since 2009
     - Miawpukek at Conne River has operated its own school since 1987
     - What those schools teach in is not stated in the sources cited here
 - field: taughtAsSubject
   bullets:
     - No provincial Indigenous language course appears in the cited curriculum pages
`;

files["lang-CA-NT.md"] = `### CA|Northwest Territories
STATUS: documented
LANGUAGES:
[
 {
  "name": "Chipewyan",
  "wals": "chp",
  "iso": "chp",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": "Word order SOV; Strong prefixing; Simple tone system"
 },
 {
  "name": "Cree",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "English",
  "wals": "eng",
  "iso": "eng",
  "family": "Indo-European",
  "genus": "Germanic",
  "typology": "Word order SVO; Adjective-Noun; Strongly suffixing; No tones"
 },
 {
  "name": "French",
  "wals": "fre",
  "iso": "fra",
  "family": "Indo-European",
  "genus": "Romance",
  "typology": "Word order SVO; Noun-Adjective; Strongly suffixing; No tones"
 },
 {
  "name": "Kutchin",
  "wals": "kth",
  "iso": "gwi",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": ""
 },
 {
  "name": "Inuinnaqtun",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Inuktitut",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Inuvialuktun",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "North Slavey",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Slavey",
  "wals": "slv",
  "iso": "xsl",
  "family": "Na-Dene",
  "genus": "Athapaskan",
  "typology": ""
 },
 {
  "name": "Tłı̨chǫ",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
SOURCES:
 - label: "Official Languages Act, RSNWT 1988 c.O-1, s. 4 (as am. SNWT 2003 c.23 s.5)"
   url: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "4. Chipewyan, Cree, English, French, Gwich'in, Inuinnaqtun, Inuktitut, Inuvialuktun, North Slavey, South Slavey and Tłı̨chǫ are the Official Languages of the Northwest Territories."
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   note: All eleven named, in the Act's own order. Gwich'in reaches WALS only by ISO: the WALS record is "Kutchin", iso gwi. South Slavey is WALS "Slavey", iso xsl. TRAP AVOIDED: Tłı̨chǫ's ISO code is dgr, but WALS code dgr is DAGUR, an Altaic language of China, so the Tłı̨chǫ row is left unlinked rather than pointing at the wrong language. North Slavey (scs) is in no WALS record; WALS "Slave" [sla] is the den macrolanguage, not North Slavey. Cree, Inuktitut, Inuinnaqtun and Inuvialuktun are cover terms WALS splits, so they too stay unlinked.
 - field: localTerm
   quote: "Official Languages of the Northwest Territories"
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
 - field: localTerm
   quote: "5. To the extent and in the manner provided in this Act and any regulations under this Act, the Official Languages of the Territories have equality of status and equal rights and privileges as to their use in all government institutions."
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
 - field: mediumOfInstruction
   quote: "Desiring to establish English and French as Official Languages of the Northwest Territories having equality of status and equal rights and privileges as Official Languages;"
   source: https://www.justice.gov.nt.ca/en/files/legislation/official-languages/official-languages.a.pdf
   note: The Official Languages Act governs government institutions and courts; it contains no medium-of-instruction clause. Schooling is dealt with under the Education Act and the 2018 Indigenous Languages and Education policy, both cited on this entry.
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Official Languages of the Northwest Territories", not a minority category
     - Eleven of them, nine Indigenous, listed together in s. 4 with English and French
     - S. 5: all eleven have equality of status in government institutions
 - field: mediumOfInstruction
   bullets:
     - The Official Languages Act itself carries no medium-of-instruction clause
     - Schooling runs under the Education Act and the 2018 ILE policy instead
     - French alone is the s. 23 Charter minority language, with its own commission scolaire
 - field: taughtAsSubject
   bullets:
     - Our Languages curriculum (2020) is the territorial programme for the nine
 - field: policyHistory
   rows:
     - year: 2003
       description: SNWT 2003 c.23 s.5 amends Official Languages Act s. 4, giving the current list of eleven official languages
     - year: 2018
       description: NWT Indigenous Languages and Education policy adopted, August
     - year: 2020
       description: Our Languages curriculum published for the territory's Indigenous languages
`;

files["lang-CA-NS.md"] = `### CA|Nova Scotia
STATUS: partial
LANGUAGES:
[
 {
  "name": "Gaelic (Scots)",
  "wals": "gae",
  "iso": "gla",
  "family": "Indo-European",
  "genus": "Celtic",
  "typology": "Word order VSO; Noun-Adjective; Weakly suffixing"
 },
 {
  "name": "Micmac",
  "wals": "mic",
  "iso": "mic",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "Gaelic Studies 11 and Mi'kmaw Studies 11 both count for the Canadian history credit"
   source: standing text on this entry
   note: Both languages are named on the entry, but through STUDIES courses. WALS carries Scottish Gaelic as "Gaelic (Scots)" (iso gla) and Mi'kmaw as "Micmac" (iso mic); both were reached by ISO lookup after the usual English names missed.
 - field: taughtAsSubject
   quote: "Gaelic Studies 11 and Mi'kmaw Studies 11 both count for the Canadian history credit"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "CSAP is French first language, not a second-language programme"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - No single provincial category: Gaelic and Mi'kmaw are named individually
     - Both appear as "Studies" courses, not as language courses
     - French is treated separately, as a first language, through CSAP
 - field: mediumOfInstruction
   bullets:
     - Conseil scolaire acadien provincial is the only francophone board, French first language
     - No Gaelic or Mi'kmaw medium-of-instruction provision was found
 - field: taughtAsSubject
   bullets:
     - About the community, not the language: both are Studies 11 courses
     - Each counts for the Canadian history credit, not a language credit
     - So the graduation route recognises them as history, not as languages
`;

files["lang-CA-ON.md"] = `### CA|Ontario
STATUS: partial
LANGUAGES:
[]
SOURCES:
 - label: "Ontario Schools K-12: Diploma and Certificate Requirements and Related Procedures"
   url: https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/diploma-and-certificate-requirements-related-procedures
   http: 200
   tier: official-document
 - label: "O. Reg. 298, Operation of Schools - General"
   url: https://www.ontario.ca/laws/regulation/900298
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "students who have taken Native languages in place of French as a second language in elementary school may use a Level 1 or 2 Native languages course as the compulsory credit for French as a second language"
   source: https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/diploma-and-certificate-requirements-related-procedures
   note: ABSENCE IS THE RESULT for the languages field. Both cited instruments were searched in this session: "Native languages" occurs in the diploma document as a plural class term and NOT AT ALL in O. Reg. 298. Neither names Cree, Mohawk, Ojibwe or any other language, so no row can be written from this entry's own sources. The Native Languages curriculum document, which would name them, is not cited on this entry.
 - field: localTerm
   quote: "Native languages"
   source: https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/diploma-and-certificate-requirements-related-procedures
 - field: taughtAsSubject
   quote: "students who have taken Native languages in place of French as a second language in elementary school may use a Level 1 or 2 Native languages course as the compulsory credit for French as a second language"
   source: https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/diploma-and-certificate-requirements-related-procedures
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Native languages" is the province's term, used as a plural class
     - Neither the diploma document nor O. Reg. 298 names an individual language
 - field: mediumOfInstruction
   bullets:
     - No Native-language medium-of-instruction provision was found in either instrument
     - French-language schools are a separate system, not a second-language programme
 - field: taughtAsSubject
   bullets:
     - Separate Native Languages curriculum runs for Grades 1-8
     - A Level 1 or 2 Native languages course can substitute for the compulsory FSL credit
     - That substitution requires the pupil to have taken it instead of FSL at elementary
`;

files["lang-CA-PE.md"] = `### CA|Prince Edward Island
STATUS: partial
LANGUAGES:
[
 {
  "name": "Micmac",
  "wals": "mic",
  "iso": "mic",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "Mi'kmaw Studies MKS801A is a senior high social studies course, pilot schools only"
   source: standing text on this entry
   note: Mi'kmaw is the one language of the place this entry names, and it is named only through a STUDIES course. WALS carries it as "Micmac", iso mic. The row is written so the map can show which language the province is engaging with; the bullets record that the engagement is not linguistic.
 - field: taughtAsSubject
   quote: "No PEI Mi'kmaw LANGUAGE course found in any Program of Studies"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Grade 11 Mi'kmaw Studies curriculum was under development in 2024-2025"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - No provincial category yet: an Indigenous Education framework was still being written
     - The one course names the people, "Mi'kmaw", not a language
 - field: mediumOfInstruction
   bullets:
     - No Mi'kmaw medium-of-instruction provision appears in any cited instrument
 - field: taughtAsSubject
   bullets:
     - About the community, not the language: MKS801A is a social studies course
     - No Mi'kmaw LANGUAGE course appears in any Program of Studies
     - MKS801A runs in pilot schools only, at senior high
     - Grade 11 Mi'kmaw Studies was still under development in 2024-25
`;

files["lang-CA-QC.md"] = `### CA|Quebec
STATUS: documented
LANGUAGES:
[
 {
  "name": "Cree",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Inuktitut",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Naskapi",
  "wals": "nsk",
  "iso": "nsk",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 },
 {
  "name": "French",
  "wals": "fre",
  "iso": "fra",
  "family": "Indo-European",
  "genus": "Romance",
  "typology": "Word order SVO; Noun-Adjective; Strongly suffixing; No tones"
 },
 {
  "name": "English",
  "wals": "eng",
  "iso": "eng",
  "family": "Indo-European",
  "genus": "Germanic",
  "typology": "Word order SVO; Adjective-Noun; Strongly suffixing; No tones"
 }
]
EVIDENCE:
 - field: languages
   quote: "Cree and Kativik school boards set their own pace for introducing French and English"
   source: standing text on this entry
   note: Cree and Inuktitut are the languages of the Cree and Kativik boards; both are cover terms WALS splits (Cree into Plains and Swampy, Inuktitut into three varieties) with no genus row, so both are written unlinked. Naskapi resolves directly. French and English are included because on this entry they are the languages the exemption is FROM, and Quebec French is a language of the place, not a foreign language.
 - field: localTerm
   quote: "Charter art 97: Indian reserves are not subject to the Act"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Same rule applies with adaptations to the Naskapi of Schefferville"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Territorial, not linguistic: art. 97 exempts "Indian reserves" from the Charter
     - The named parties are the Cree, the Kativik board and the Naskapi
     - No category such as Indigenous or minority language is used
 - field: mediumOfInstruction
   bullets:
     - Cree and Kativik boards set their own pace for introducing French and English
     - That leaves the Indigenous language as the early medium by default, not by rule
     - The same rule applies with adaptations to the Naskapi of Schefferville
     - It flows from the 1975 James Bay and Northern Quebec Agreement
 - field: taughtAsSubject
   bullets:
     - No provincial Indigenous language subject appears in the cited instruments
 - field: policyHistory
   rows:
     - year: 1975
       description: James Bay and Northern Quebec Agreement founds the Cree and Kativik school boards' control of language introduction
`;

files["lang-CA-SK.md"] = `### CA|Saskatchewan
STATUS: documented
LANGUAGES:
[
 {
  "name": "Cree (Plains)",
  "wals": "cre",
  "iso": "crk",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": "Word order No dominant order; Equal prefixing and suffixing; No tones"
 },
 {
  "name": "Nakawe",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Nakoda",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Dene",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
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
  "name": "Michif",
  "wals": "mcf",
  "iso": "crg",
  "family": "Algic",
  "genus": "Algonquian",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "Secondary curricula for nehiyawewin, Nakawe, Nakoda, Dene, Dakota and Michif"
   source: standing text on this entry
   note: Six named. "nehiyawewin" is specifically Plains Cree, so it resolves to WALS Cree (Plains), iso crk - the one place in this region where the source is precise enough to pick a Cree variety. Nakawe (Saulteaux, ojw), Nakoda (Assiniboine, asb) and Dene are in no WALS record by name or ISO, so are unlinked. Dakota and Michif resolve directly.
 - field: taughtAsSubject
   quote: "Michif French 10, 20, 30 released as a 2026 preliminary curriculum"
   source: standing text on this entry
   note: Michif French is a distinct variety from Michif; WALS carries only Michif, so it is not given a separate row.
 - field: taughtAsSubject
   quote: "Aboriginal Languages K-12 (1994) is the umbrella framework document"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Aboriginal Languages" in the 1994 framework; "First Nations and Metis" in the 2026 one
     - Curricula use the endonyms: nehiyawewin, Nakawe, Nakoda, Michif
     - Michif is named as a Metis language, alongside the First Nations ones
 - field: mediumOfInstruction
   bullets:
     - No Indigenous medium-of-instruction provision was found in the cited sources
 - field: taughtAsSubject
   bullets:
     - Secondary curricula exist for six languages, not merely a framework
     - Michif French 10, 20, 30 released as a 2026 preliminary curriculum
     - First Nations and Metis Language Framework 1-9 is a 2026 preliminary template
     - Aboriginal Languages K-12 (1994) remains the umbrella document
 - field: policyHistory
   rows:
     - year: 1994
       description: Aboriginal Languages K-12 framework published as Saskatchewan's umbrella language document
     - year: 2026
       description: Michif French 10, 20, 30 and the First Nations and Metis Language Framework 1-9 released as preliminary curricula
`;

files["lang-CA-YT.md"] = `### CA|Yukon
STATUS: partial
LANGUAGES:
[]
SOURCES:
 - label: "First Nation School Board, Land and Language"
   url: https://www.fnsb.ca/land-and-language
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "Land and Language programming is unique to each school and reflects the language, culture, history, and traditions of the Yukon First Nation on whose territory FNSB schools are located."
   source: https://www.fnsb.ca/land-and-language
   note: ABSENCE IS THE RESULT. The FNSB page was read in full in this session. It speaks throughout of "Yukon First Nation languages" in the plural and names no individual language, precisely because provision is school-by-school. No row can be written.
 - field: localTerm
   quote: "Yukon First Nations' languages"
   source: https://www.fnsb.ca/land-and-language
 - field: mediumOfInstruction
   quote: "Revitalizing Yukon First Nations' languages through classroom instruction, language resources, and community-based learning opportunities."
   source: https://www.fnsb.ca/land-and-language
 - field: taughtAsSubject
   quote: "The Language Coach provides leadership, mentorship, and support for Yukon First Nation language programming across First Nation School Board schools."
   source: https://www.fnsb.ca/land-and-language
 - field: taughtAsSubject
   quote: "Land and Language Connectors support FNSB schools by integrating Yukon First Nation language and culture, and ways of knowing into Learners' educational experiences."
   source: https://www.fnsb.ca/land-and-language
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Yukon First Nation languages", always plural and never itemised
     - The board's own stream is called Land and Language, joining the two
     - Which language is which school's is set by whose territory it stands on
 - field: mediumOfInstruction
   bullets:
     - Revitalization runs "through classroom instruction" and on the land
     - No provision makes a First Nation language the medium for other subjects
 - field: taughtAsSubject
   bullets:
     - A Language Coach supports language programming across all FNSB schools
     - Land and Language Connectors carry language into daily classroom work
     - Programming is specific to the First Nation on whose territory each school sits
 - field: policyHistory
   rows:
     - year: 2021
       description: Framework agreement between ten Yukon First Nations and the Government of Yukon creates the First Nation School Board
`;

let n = 0;
for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), body, "utf8");
  console.log("wrote " + name);
  n++;
}
console.log(n + " files");
