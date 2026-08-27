### EC|Ecuador
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
