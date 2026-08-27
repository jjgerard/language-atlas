const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "..", "parts");
const files = {};

files["lang-EC.md"] = `### EC|Ecuador
STATUS: documented
LANGUAGES:
[
 {
  "name": "Quechuan",
  "wals": "genus-quechuan",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 },
 {
  "name": "Jivaro",
  "wals": "jiv",
  "iso": "jiv",
  "family": "Jivaroan",
  "genus": "Jivaroan",
  "typology": "Word order SOV; Adjective-Noun; Strongly suffixing"
 }
]
SOURCES:
 - label: "Constitución de la República del Ecuador 2008, arts. 2 and 347"
   url: https://www.oas.org/juridico/pdfs/mesicic4_ecu_const.pdf
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "El castellano es el idioma oficial del Ecuador; el castellano, el kichwa y el shuar son idiomas oficiales de relación intercultural."
   source: https://www.oas.org/juridico/pdfs/mesicic4_ecu_const.pdf
   note: The constitution's words are "kichwa" and "shuar". WALS carries no row named Kichwa and none under an Ecuadorian Kichwa ISO code that matches the generic name, so the Quechuan GENUS row is used per the resolver's rule. WALS carries Shuar under the older name "Jivaro", iso jiv.
 - field: localTerm
   quote: "Los demás idiomas ancestrales son de uso oficial para los pueblos indígenas en las zonas donde habitan y en los términos que fija la ley."
   source: https://www.oas.org/juridico/pdfs/mesicic4_ecu_const.pdf
 - field: mediumOfInstruction
   quote: "Garantizar el sistema de educación intercultural bilingüe, en el cual se utilizará como lengua principal de educación la de la nacionalidad respectiva y el castellano como idioma de relación intercultural"
   source: https://www.oas.org/juridico/pdfs/mesicic4_ecu_const.pdf
 - field: taughtAsSubject
   quote: "Asegurar que se incluya en los currículos de estudio, de manera progresiva, la enseñanza de al menos una lengua ancestral."
   source: https://www.oas.org/juridico/pdfs/mesicic4_ecu_const.pdf
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "idiomas oficiales de relación intercultural" for kichwa and shuar, Const. art. 2
     - All others are "idiomas ancestrales", official only where those peoples live
     - That status is territorial and set by ordinary law, not national
 - field: mediumOfInstruction
   bullets:
     - Art. 347(9): the nationality's own language is the "lengua principal de educación"
     - Castellano sits beside it as the "idioma de relación intercultural"
     - The rule binds the intercultural bilingual system, not schools generally
 - field: taughtAsSubject
   bullets:
     - Art. 347(10): curricula must progressively include at least one "lengua ancestral"
     - The duty reaches all curricula and names no particular language
 - field: policyHistory
   rows:
     - year: 2008
       description: Constitution makes kichwa and shuar official languages of intercultural relation and guarantees the intercultural bilingual system
`;

files["lang-LC.md"] = `### LC|Saint Lucia
STATUS: partial
LANGUAGES:
[
 {
  "name": "Lesser Antillean French Creole",
  "wals": "lcr",
  "iso": "",
  "family": "other",
  "genus": "Creoles and Pidgins",
  "typology": ""
 }
]
SOURCES:
 - label: "National Primary School Modern Languages Curriculum (2012), CAMDU"
   url: https://camdu.edu.lc/wp-content/uploads/2019/09/St-Lucia-National-Primary-School-Modern-Languages-Curriculum-Complete-Document.pdf
   tier: official-document
 - label: "Education Act Cap. 18.01"
   url: https://www.govt.lc/media.govt.lc/www/resources/legislation/EducationAct.pdf
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "The 2012 curriculum records an absence of a clear language policy on Kwéyòl"
   source: standing text on this entry
   note: RESOLVER CAVEAT. The source's word is "Kwéyòl". WALS carries no row for Saint Lucian Creole under that name, and its ISO code acf is not in WALS's ISO column. The row used is WALS "Lesser Antillean French Creole" [lcr], whose ISO_codes field reads "acf gcf" and therefore covers Saint Lucian Creole. The WALS record is broader than the island; recorded here so a reader is not misled.
 - field: localTerm
   quote: "Education Act Cap. 18.01 covers the language and culture of Saint Lucia"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "The Act carries no medium-of-instruction provision at all"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Kwéyòl" is the curriculum's own word for the island vernacular
     - The Act frames it only as "the language and culture of Saint Lucia"
     - No statutory category such as national or minority language attaches to it
 - field: mediumOfInstruction
   bullets:
     - Education Act Cap. 18.01 carries no medium-of-instruction provision at all
     - The 2012 primary curriculum records the absence of a clear Kwéyòl policy
 - field: taughtAsSubject
   bullets:
     - No Kwéyòl subject entitlement appears in the sources cited on this entry
     - Modern Languages at primary is the curriculum that mentions it, not a Kwéyòl course
`;

files["lang-DO.md"] = `### DO|Dominican Republic
STATUS: partial
LANGUAGES:
[
 {
  "name": "Haitian Creole",
  "wals": "hcr",
  "iso": "hat",
  "family": "other",
  "genus": "Creoles and Pidgins",
  "typology": ""
 }
]
SOURCES:
 - label: "UNESCO Profiles Enhancing Education Reviews, Dominican Republic, Inclusion"
   url: https://education-profiles.org/latin-america-and-the-caribbean/dominican-republic/~inclusion
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Haitian Creole is absent from the curriculum: criollo=1 hit, and it is a history term"
   source: standing text on this entry
   note: READ AS AN ABSENCE. Haitian Creole is the only language of the place this entry names, and it is named to record that provision does not exist. The row lets the map show WHICH language is missing; it must not be read as provision.
 - field: localTerm
   quote: ""Lengua materna" appears twice, both in generic graduate-profile wording"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "All seven Haitian references are history content, not language provision"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Read as an absence: no term for a minority or community language is in use
     - "Lengua materna" appears only in generic graduate-profile wording
     - Haitian Creole carries no curricular designation at all
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision for Haitian Creole was found
 - field: taughtAsSubject
   bullets:
     - Haitian Creole is not taught as a subject at any stage
     - The seven Haitian references teach ABOUT Haiti, as history content
     - French is a foreign language in its own right, not a bridge to Kreyòl
`;

files["lang-UY.md"] = `### UY|Uruguay
STATUS: documented
LANGUAGES:
[
 {
  "name": "Spanish",
  "wals": "spa",
  "iso": "spa",
  "family": "Indo-European",
  "genus": "Romance",
  "typology": "Word order SVO; Noun-Adjective; Strongly suffixing; No tones"
 },
 {
  "name": "Portuguese",
  "wals": "por",
  "iso": "por",
  "family": "Indo-European",
  "genus": "Romance",
  "typology": "Word order SVO; Noun-Adjective; Strongly suffixing"
 },
 {
  "name": "Uruguayan Sign Language",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
EVIDENCE:
 - field: languages
   quote: "Español del Uruguay, portugués del Uruguay, lengua de señas uruguaya"
   source: standing text on this entry
   note: All three are named by the law as mother tongues EXISTING IN THE COUNTRY, which is why Spanish and Portuguese belong on this map here and not on the foreign-language map. WALS carries no Uruguayan Sign Language row: its sign-language list holds Lengua de Señas Argentina and Língua de Sinais Brasileira but nothing for Uruguay, so that row is written unlinked.
 - field: localTerm
   quote: "Art. 40(5) recognises three mother tongues existing in the country"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Uruguayan Portuguese is a border variety, not a foreign language"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "lenguas maternas existentes en el país" is the law's category, art. 40(5)
     - The three named are Uruguayan Spanish, Uruguayan Portuguese and LSU
     - Portuguese here is a border variety of Uruguay, not a foreign language
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction rule for the three was found in the cited source
 - field: taughtAsSubject
   bullets:
     - The plurilingual aim starts from varieties already spoken in the country
     - No compulsory subject in Uruguayan Portuguese or LSU is recorded here
`;

files["lang-VE.md"] = `### VE|Venezuela
STATUS: partial
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "The constitution makes indigenous languages official for their peoples"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The constitutional provision is generic: it confers status on "los idiomas indígenas" as a class. Neither the entry's text nor its cited source names Wayuu, Warao, Pemón or any other individual language, so no row can be written.
 - field: localTerm
   quote: "The constitution makes indigenous languages official for their peoples"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Schools in that system must guarantee equal official use of both"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "It gives them a right to intercultural bilingual education"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "idiomas indígenas", official for their peoples, not nationally
     - The class is named; no individual language is
 - field: mediumOfInstruction
   bullets:
     - Régimen de educación intercultural bilingüe is the constitutional vehicle
     - Schools in that system must give both languages equal official use
 - field: taughtAsSubject
   bullets:
     - Right runs to the whole bilingual regime, not to a named language subject
`;

files["lang-CO.md"] = `### CO|Colombia
STATUS: partial
LANGUAGES:
[]
SOURCES:
 - label: "Ley 115 de 1994 (Ley General de Educación), arts. 55-59, Etnoeducación"
   url: https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=292
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "Art. 57: teaching of ethnic groups with their own linguistic tradition shall be bilingual"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. Ley 115 arts. 55-59 define etnoeducación by reference to "grupos étnicos" and "su lengua materna" as a class. No individual language is named, so no row can be written from this entry's own source.
 - field: localTerm
   quote: "Etnoeducación, Ley 115 arts. 55-59"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Founded on the group's mother tongue, in their own territories"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "Art. 59: MEN gives specialist help on curriculum, textbooks and ethnolinguistic research"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "Etnoeducación" is the statutory name of the whole provision, Ley 115 art. 55
     - Beneficiaries are "grupos étnicos con tradición lingüística propia"
     - No individual language is named anywhere in arts. 55-59
 - field: mediumOfInstruction
   bullets:
     - Art. 57: teaching of such groups shall be bilingual, on the mother tongue
     - The duty is territorial, running in the groups' own territories
 - field: taughtAsSubject
   bullets:
     - Art. 59: the ministry supplies curriculum, textbooks and ethnolinguistic research
     - Support is for building the provision, not a defined language subject
 - field: policyHistory
   rows:
     - year: 1994
       description: Ley 115 establishes etnoeducación and requires bilingual teaching for ethnic groups with their own linguistic tradition
`;

files["lang-PE.md"] = `### PE|Peru
STATUS: partial
LANGUAGES:
[]
SOURCES:
 - label: "Ley 29735, Ley que regula el uso, preservación, desarrollo, recuperación, fomento y difusión de las lenguas originarias del Perú, arts. 16 and 22"
   url: https://www.gob.pe/institucion/minedu/normas-legales/118448-29735
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "Ley 29735 art. 16: the state guarantees teaching of indigenous languages"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. Ley 29735 legislates for "lenguas originarias" as a class and defers the actual list to the Registro Nacional de Lenguas Originarias. Neither the entry's text nor the cited source names Quechua, Aymara, Ashaninka or any other language, so no row can honestly be written here.
 - field: localTerm
   quote: "Ley 29735 art. 16: the state guarantees teaching of indigenous languages"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Art. 22 gives indigenous-mother-tongue pupils a right to EIB at every level"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "COMPULSORY in the zones where those languages are predominant"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "lenguas originarias" is the statute's own category, Ley 29735
     - The Act legislates for the class and names no individual language
 - field: mediumOfInstruction
   bullets:
     - Art. 22: pupils with an indigenous mother tongue have a right to EIB at every level
     - The right attaches to the pupil's own language, whichever it is
 - field: taughtAsSubject
   bullets:
     - Art. 16: teaching guaranteed in primary, secondary and university education
     - Compulsory in zones where the language is predominant, elective elsewhere
 - field: policyHistory
   rows:
     - year: 2011
       description: Ley 29735 guarantees teaching of originary languages and makes it compulsory where they predominate
`;

files["lang-MX.md"] = `### MX|Mexico
STATUS: partial
LANGUAGES:
[]
SOURCES:
 - label: "Ley General de Educación 2019, Cap. VI (De la educación indígena), arts. 56-58, DOF 30/09/2019"
   url: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019
   tier: official-document
   note: The DOF host failed a TLS check in this session (SEC_E_WRONG_PRINCIPAL); the URL was not re-verified here. Evidence below is quoted from the entry's own standing text.
EVIDENCE:
 - field: languages
   quote: "National indigenous languages serve as medium of teaching and object of study"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. "Lenguas indígenas nacionales" is a statutory class whose members are listed by INALI in the Catálogo, not in the education act. Neither the entry's text nor its cited source names Náhuatl, Maya or any other language, so no row can be written.
 - field: localTerm
   quote: "National indigenous languages serve as medium of teaching and object of study"
   source: standing text on this entry
 - field: mediumOfInstruction
   quote: "Chapter VI, arts. 56-58, covers indigenous education"
   source: standing text on this entry
 - field: taughtAsSubject
   quote: "The Secretaría coordinates with INPI and INALI on curricula and materials"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "lenguas indígenas nacionales" is the statutory class, LGE Cap. VI
     - Membership of the class is set by INALI's catalogue, not by the education act
     - The act therefore names no individual language
 - field: mediumOfInstruction
   bullets:
     - They serve BOTH as medium of teaching and as object of study
     - That dual role is the strongest formulation among the region's statutes
     - Communities must be consulted in good faith on how it is done, art. 57
 - field: taughtAsSubject
   bullets:
     - Object-of-study role makes the language itself a curricular subject
     - Curricula and materials are coordinated with INPI and INALI
 - field: policyHistory
   rows:
     - year: 2019
       description: Ley General de Educación Cap. VI makes national indigenous languages both medium of teaching and object of study
`;

files["lang-NI.md"] = `### NI|Nicaragua
STATUS: documented
LANGUAGES:
[
 {
  "name": "Nicaraguan Sign Language",
  "wals": "",
  "iso": "",
  "family": "",
  "genus": "",
  "typology": ""
 }
]
SOURCES:
 - label: "Ley General de Educación (Ley 582), arts. 3(j), 38-42, 70; and preamble"
   url: https://faolex.fao.org/docs/pdf/nic201095.pdf
   http: 200
   tier: official-document
EVIDENCE:
 - field: languages
   quote: "Las Escuelas de Formación de Docentes incorporarán en sus programas capacitación o estudio de lenguaje por señas nicaragüenses."
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
   note: NEW FINDING, not on the entry. Nicaraguan Sign Language is the ONLY language of the place the Act names. It is named twice: here for teacher training, and in the special-education provision. WALS carries no Nicaraguan Sign Language row (its sign list runs from Adamorobe to Vlaamse Gebarentaal with no Nicaragua entry), so the row is written unlinked. Everything else in the Act is a class term: "las lenguas nicaragüenses de la Costa del Caribe".
 - field: languages
   quote: "aplicando sistemas propios en los procesos de enseñanza - aprendizaje, que incluya las modalidades de aprendizaje aplicando métodos como el lenguaje por señas nicaragüenses"
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
 - field: localTerm
   quote: "las lenguas nicaragüenses de la Costa del Caribe"
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
 - field: localTerm
   quote: "responde a las realidades, necesidades, anhelo y prioridades educativas de su población multiétnica, multilingüe y pluricultural"
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
 - field: mediumOfInstruction
   quote: "Los pueblos indígenas y las comunidades étnicas de la Costa Atlántica tienen derecho en su región a la educación intercultural en su lengua materna y el estudio del español como idioma nacional."
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
   note: NEW FINDING. This is a mother-tongue medium right, not the subject-unit rule already on the entry.
 - field: mediumOfInstruction
   quote: "La Educación en las Regiones Autónomas a todos niveles y modalidades es intercultural-bilingüe."
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
 - field: mediumOfInstruction
   quote: "La Autonomía Educativa Regional comprende la Capacidad Jurídica de las Regiones Autónomas de dirigir, organizar y regular la educación en todos sus niveles en sus respectivos ámbitos territoriales, de conformidad a sus usos, tradiciones, sistemas de valores y culturas"
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
 - field: taughtAsSubject
   quote: "Se deberá incorporar en los programas de idioma nacional, tanto de primaria como secundaria, unidades referidas a las lenguas nicaragüenses de la Costa del Caribe."
   source: https://faolex.fao.org/docs/pdf/nic201095.pdf
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - "lenguas nicaragüenses de la Costa del Caribe" is the Act's own phrase, art. 70
     - Speakers are "pueblos indígenas afro-descendientes y comunidades étnicas"
     - "lenguaje por señas nicaragüenses" is named separately, arts. 26 and 15(b.6)
     - The regional population is described as "multiétnica, multilingüe y pluricultural"
 - field: mediumOfInstruction
   bullets:
     - Right to intercultural education "en su lengua materna" on the Atlantic Coast
     - Art. 3(j): education in the Autonomous Regions is intercultural-bilingual at all levels
     - SEAR is a whole subsystem, with legal power to regulate its own schooling
     - Spanish is studied alongside, as "idioma nacional"
 - field: taughtAsSubject
   bullets:
     - Art. 70 units on Caribbean Coast languages sit inside the national-language subject
     - So outside the coast the languages are content, not a course of their own
     - Teacher-training colleges must include Nicaraguan Sign Language, art. 26
 - field: policyHistory
   rows:
     - year: 2006
       description: Ley General de Educación 582 creates the Subsistema Educativo Autonómico Regional and makes Autonomous Region education intercultural-bilingual at all levels
`;

files["lang-DM.md"] = `### DM|Dominica
STATUS: not-found
LANGUAGES:
[]
EVIDENCE:
 - field: languages
   quote: "Education Act 1997 duty to promote the language and culture of Dominica"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. The formula is "the language and culture of Dominica" in the singular abstract. Neither the entry's text nor its cited sources name Kwéyòl, Kalinago or any other language of the island. Writing a Kwéyòl row here would be inference from a neighbour, which the brief forbids.
 - field: localTerm
   quote: "Reported by UNESCO PEER; the Act itself was not retrievable in this session"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: reported by UNESCO PEER, not read in the Act itself
     - The Act's phrase is "the language and culture of Dominica", naming no language
     - No category such as creole, vernacular or national language appears
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - No Kwéyòl or Kalinago subject appears in the sources cited on this entry
`;

files["lang-GD.md"] = `### GD|Grenada
STATUS: not-found
LANGUAGES:
[]
SOURCES:
 - label: "SUMMA, Country review: Grenada"
   url: https://summaedu.org/wp-content/uploads/2025/05/Country_review-Grenada_OK.pdf
   tier: secondary-source
EVIDENCE:
 - field: languages
   quote: "Education Act goal (g) covers the language, culture, rights and values of Grenadians"
   source: standing text on this entry
   note: ABSENCE IS THE RESULT. "the language ... of Grenadians" is a class formula naming nothing. No language of the island is named in the entry or in the sources it cites.
 - field: localTerm
   quote: "Quoted from a SUMMA country review, not from the Act as retrieved"
   source: standing text on this entry
DRAFT BULLETS:
 - field: localTerm
   bullets:
     - Hedge: quoted from a SUMMA country review, not from the Act as retrieved
     - The Act's goal (g) speaks of "the language ... of Grenadians", naming none
 - field: mediumOfInstruction
   bullets:
     - No medium-of-instruction provision was found in the sources cited
 - field: taughtAsSubject
   bullets:
     - No vernacular language subject appears in the sources cited on this entry
`;

let n = 0;
for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), body, "utf8");
  console.log("wrote " + name);
  n++;
}
console.log(n + " files");
