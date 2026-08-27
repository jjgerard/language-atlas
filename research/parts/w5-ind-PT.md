### PT|Portugal
STATUS: documented
SOURCES:
 - label: "Lei n.º 7/99, de 29 de Janeiro — Reconhecimento oficial de direitos linguísticos da comunidade mirandesa, Diário da República I Série-A n.º 24, 29/01/1999, p. 574"
   url: https://files.diariodarepublica.pt/1s/1999/01/024a00/05740574.pdf
   http: 200 (application/pdf, 74430 bytes; text extracted with pdftotext -layout -enc UTF-8)
   tier: official-document
 - label: "Same law, landing page on Diário da República (ELI resolves here)"
   url: https://data.dre.pt/eli/lei/7/1999/01/29/p/dre/pt/html
   http: 200, url_effective https://diariodarepublica.pt/dr/detalhe/lei/7-1999-182838 (JS shell, no text served to curl — text taken from the PDF above)
   tier: official-document
 - label: "Advisory Committee on the Framework Convention for the Protection of National Minorities, Fifth Opinion on Portugal, ACFC/OP/V(2025)1, adopted 15 October 2025, published 26 February 2026"
   url: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   http: 200 (application/pdf, 1443930 bytes, text extracted with pdftotext -layout)
   tier: official-document
 - label: "Council of Europe Treaty Office, Chart of signatures and ratifications of Treaty 148 (European Charter for Regional or Minority Languages), status as of 27/08/2026"
   url: https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148
   http: 200 (React app; table read by rendering the page in a browser — curl returns the JS shell only)
   tier: official-document
 - label: "Council of Europe Treaty Office, Chart of signatures and ratifications of Treaty 157 (Framework Convention for the Protection of National Minorities), status as of 27/08/2026"
   url: https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=157
   http: 200 (rendered in browser)
   tier: official-document

TREATY STATUS ACTUALLY OBSERVED (correction to the task brief):
 - ECRML (ETS 148): the Portugal row shows Signature 07/09/2021 and NO ratification date. Portugal HAS signed the Charter — it has not ratified it. The brief's statement that Portugal "never signed" is wrong. There is therefore no Committee of Experts evaluation report for Portugal.
 - FCNM (ETS 157): Portugal row — Signature 01/02/1995, Ratification 07/05/2002, Entry into force 01/09/2002. Portugal is a party, and the Advisory Committee's Fifth Opinion (2025) exists and covers Mirandese education.

EVIDENCE:
 - field: indigenous.taughtAsSubject
   quote: "É reconhecido o direito da criança à aprendizagem do mirandês, nos termos a regulamentar."
   source: https://files.diariodarepublica.pt/1s/1999/01/024a00/05740574.pdf
   note: Lei n.º 7/99, Artigo 3.º — a right of the CHILD to the LEARNING of Mirandese, "under terms to be regulated". The law contains no provision on the language of instruction.
 - field: indigenous.taughtAsSubject
   quote: "O Estado Português reconhece o direito a cultivar e promover a língua mirandesa, enquanto património cultural, instrumento de comunicação e de reforço de identidade da terra de Miranda."
   source: https://files.diariodarepublica.pt/1s/1999/01/024a00/05740574.pdf
   note: Artigo 2.º
 - field: indigenous.taughtAsSubject
   quote: "É reconhecido o direito a apoio científico e educativo, tendo em vista a formação de professores de língua e cultura mirandesas, nos termos a regulamentar."
   source: https://files.diariodarepublica.pt/1s/1999/01/024a00/05740574.pdf
   note: Artigo 5.º — teacher training, again "nos termos a regulamentar"
 - field: indigenous.taughtAsSubject
   quote: "Mirandese is taught from pre-school to secondary school but still only as an optional, extra-curricular course, which could explain why, in secondary schools, so few students are enrolled in the course. It is only taught for one hour a week, and, in general, there is a lack of suitable materials, as well as a lack of support for teacher training."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 164, reporting what representatives of the Mirandese community told the Advisory Committee
 - field: indigenous.taughtAsSubject
   quote: "At the University of Coimbra, two courses (50 hours each) prepare students to work with Mirandese. Three teachers taught Mirandese in the district of Miranda do Douro in the school year 2024-2025."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 164
 - field: indigenous.taughtAsSubject
   quote: "The Advisory Committee strongly encourages the authorities to ensure systematic training for teachers of Mirandese language and culture, include information about Mirandese in educational materials to be used across Portugal, and introduce Mirandese as a curricular subject at the Miranda do Douro school."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 168 — the recommendation to "introduce Mirandese as a curricular subject" is direct evidence that as of 2025 it is NOT a curricular subject
 - field: indigenous.mediumOfInstruction
   quote: "Representatives of the Mirandese community informed the Advisory Committee that there is no official curriculum for the education of teachers of Mirandese."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
 - field: indigenous.mediumOfInstruction
   quote: "The language rights of persons speaking Mirandese are protected by Law no. 7/99 on Official Recognition of Linguistic Rights of the Mirandese Community."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 35
 - field: indigenous.mediumOfInstruction
   quote: "Despite the official recognition of language rights for the Mirandese community in 1999, the Mirandese language continues to be critically endangered."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, Summary of the findings, para. 1
 - field: indigenous.mediumOfInstruction
   quote: "Furthermore, the ratification process of the Language Charter, which Portugal signed in 2021 (see Article 3), is yet to be completed. According to the authorities, at least 23 out of 35 provisions of Part III of the Language Charter had been ensured, and the government is pursuing efforts to finalise the ratification process."
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 87
 - field: indigenous.mediumOfInstruction
   quote: "the Council of Ministers Resolution 66/2025 of 18 March 2025 established the Mission Structure for the Promotion of the Mirandese Language (Estrutura de Missão para a Promoção da Língua Mirandesa), tasked with promoting, co-ordinating and implementing policies for the preservation, teaching, dissemination and enhancement of the Mirandese language"
   source: https://rm.coe.int/5th-acfc-opinion-on-portugal-en/48802abfd7
   note: Fifth Opinion, para. 86

ABSENCE FOUND AND STATED:
 - Lei n.º 7/99 has seven articles in total (read in full from the PDF). Not one of them makes Mirandese a language of instruction, sets a school year range, or names a school. Article 3 grants a right to LEARN it and Article 5 a right to teacher-training support, both expressly "nos termos a regulamentar" — the substance is deferred to regulation.
 - I could not retrieve the implementing Despacho Normativo. diariodarepublica.pt serves a JavaScript shell to curl and its search page returned no rendered results in the browser; dre.tretas.org returned 403. The implementing instrument is therefore NOT cited here.

DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - "No Charter ratification, so no Committee of Experts report — evidence is FCNM 2025"
     - "Lei 7/99 grants a right to learn Mirandese, never a right to be taught in it"
     - "Its seven articles contain no medium-of-instruction clause at all"
     - "FCNM 2025 finds Mirandese only an extra-curricular option, not a teaching medium"
 - field: indigenous.taughtAsSubject
   bullets:
     - "Lei 7/99 art 3: right of the child to learn Mirandese, 'nos termos a regulamentar'"
     - "Offered pre-school to secondary but optional and extra-curricular, one hour a week"
     - "Three teachers taught it in Miranda do Douro district in the 2024-25 school year"
     - "FCNM 2025 asks Portugal to make it a curricular subject at the Miranda do Douro school"

POLICY HISTORY CANDIDATES:
 - year: 1999
   description: "Lei n.º 7/99 de 29 de Janeiro, 'Reconhecimento oficial de direitos linguísticos da comunidade mirandesa', recognises the right of the child to learn Mirandese (art. 3) and a right to scientific and educational support for training teachers of Mirandese language and culture (art. 5), both 'nos termos a regulamentar'; approved by the Assembleia da República on 19 November 1998"
 - year: 2002
   description: "The Framework Convention for the Protection of National Minorities enters into force for Portugal on 1 September 2002 (ratified 7 May 2002)"
 - year: 2021
   description: "Portugal signs the European Charter for Regional or Minority Languages on 7 September 2021; as of 27 August 2026 the Treaty Office chart shows no ratification, and the Advisory Committee records that ratification 'is yet to be completed'"
 - year: 2025
   description: "Council of Ministers Resolution 66/2025 of 18 March 2025 establishes the Estrutura de Missão para a Promoção da Língua Mirandesa, tasked with the preservation, teaching and dissemination of Mirandese (as reported in the Fifth FCNM Opinion on Portugal, para. 86)"
 - year: 2025
   description: "Advisory Committee's Fifth Opinion on Portugal, adopted 15 October 2025, records that Mirandese is taught only as an optional extra-curricular course, one hour a week, and recommends introducing it as a curricular subject at the Miranda do Douro school"
