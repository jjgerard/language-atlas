### BR|Brazil
STATUS: documented

SOURCES:
 - label: "Constituição da República Federativa do Brasil de 1988, art. 210 §2 (Planalto official text)"
   url: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm
   http: 200
   tier: official-document
 - label: "Lei nº 9.394/1996 (Lei de Diretrizes e Bases da Educação Nacional), arts. 32 §3, 35-A §2 (added by Lei 14.945/2024), 60-A (added by Lei 14.191/2021), 78, 78-A, 79 — Planalto compiled text"
   url: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm
   http: 200
   tier: official-document

EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "§ 2º O ensino fundamental regular será ministrado em língua portuguesa, assegurada às comunidades indígenas também a utilização de suas línguas maternas e processos próprios de aprendizagem."
   source: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm (CF art. 210 §2)
   translation: "Regular fundamental education shall be delivered in the Portuguese language, indigenous communities being assured also the use of their mother tongues and their own learning processes."
 - field: indigenous.mediumOfInstruction
   quote: "§ 3º O ensino fundamental regular será ministrado em língua portuguesa, assegurada às comunidades indígenas a utilização de suas línguas maternas e processos próprios de aprendizagem."
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 32 §3)
   translation: "Regular fundamental education shall be delivered in the Portuguese language, indigenous communities being assured the use of their mother tongues and their own learning processes."
 - field: indigenous.mediumOfInstruction
   quote: "§ 2º O ensino médio será ministrado em língua portuguesa, assegurada às comunidades indígenas a utilização das línguas maternas."
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 35-A §2, "Incluído pela Lei nº 14.945, de 2024")
   translation: "Secondary education shall be delivered in the Portuguese language, indigenous communities being assured the use of the mother tongues."
 - field: indigenous.mediumOfInstruction
   quote: "O Sistema de Ensino da União, com a colaboração das agências federais de fomento à cultura e de assistência aos índios, desenvolverá programas integrados de ensino e pesquisa, para oferta de educação escolar bilingüe e intercultural aos povos indígenas"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 78)
   translation: "The Union's education system, with the collaboration of the federal agencies for cultural promotion and indigenous assistance, shall develop integrated teaching and research programmes for the provision of bilingual and intercultural school education to indigenous peoples."
 - field: indigenous.mediumOfInstruction
   quote: "Entende-se por educação bilíngue de surdos, para os efeitos desta Lei, a modalidade de educação escolar oferecida em Língua Brasileira de Sinais (Libras), como primeira língua, e em português escrito, como segunda língua, em escolas bilíngues de surdos, classes bilíngues de surdos, escolas comuns ou em polos de educação bilíngue de surdos"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 60-A, added by Lei 14.191/2021)
   translation: "Bilingual education of the deaf means, for the purposes of this Law, the modality of school education offered in Brazilian Sign Language (Libras) as first language and in written Portuguese as second language, in bilingual schools for the deaf, bilingual classes for the deaf, ordinary schools or bilingual deaf education hubs."
 - field: indigenous.taughtAsSubject
   quote: "proporcionar aos índios, suas comunidades e povos, a recuperação de suas memórias históricas; a reafirmação de suas identidades étnicas; a valorização de suas línguas e ciências"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 78.I)
   translation: "To provide indigenous people, their communities and peoples with the recovery of their historical memories, the reaffirmation of their ethnic identities and the valuing of their languages and sciences."
 - field: indigenous.taughtAsSubject
   quote: "fortalecer as práticas sócio-culturais e a língua materna de cada comunidade indígena"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 79 §2.I)
   translation: "To strengthen the socio-cultural practices and the mother tongue of each indigenous community."
 - field: indigenous.taughtAsSubject
   quote: "desenvolver currículos e programas específicos, neles incluindo os conteúdos culturais correspondentes às respectivas comunidades"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 79 §2.III)
   translation: "To develop specific curricula and programmes, including in them the cultural content corresponding to the respective communities."
 - field: indigenous.taughtAsSubject
   quote: "elaborar e publicar sistematicamente material didático específico e diferenciado"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 79 §2.IV)
   translation: "To prepare and systematically publish specific and differentiated teaching material."
 - field: indigenous.taughtAsSubject
   quote: "§ 1º Os programas serão planejados com audiência das comunidades indígenas."
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 79 §1)
   translation: "The programmes shall be planned with a hearing of the indigenous communities."
 - field: indigenous.taughtAsSubject
   quote: "§ 3º Os currículos do ensino médio poderão ofertar outras línguas estrangeiras, preferencialmente o espanhol, de acordo com a disponibilidade de oferta, locais e horários definidos pelos sistemas de ensino."
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm (LDB art. 35-A §3, added by Lei 14.945/2024 — cited to show that the "other languages" slot in the secondary curriculum is a FOREIGN-language slot, not an indigenous one)
   translation: "Secondary curricula may offer other foreign languages, preferably Spanish, according to availability of provision and the places and timetables defined by the education systems."

ABSENCE (read, and reported specifically): the LDB frames indigenous-language provision as a
guarantee attached to indigenous COMMUNITIES and their own schools (arts. 78-79), not as a
subject on the general national curriculum. The only curricular language slot named for all
secondary pupils, art. 35-A §3, is for foreign languages, preferably Spanish. No provision
was found making an indigenous language a timetabled subject for non-indigenous pupils.

DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - Constitution art 210 §2: Portuguese is the medium, indigenous communities assured their own too
     - The guarantee attaches to the community, not to an individual pupil anywhere
     - LDB art 32 §3 repeats it for ensino fundamental, art 35-A §2 extends it to ensino medio
     - Art 60-A: deaf bilingual education is in Libras as L1 with written Portuguese as L2
 - field: indigenous.taughtAsSubject
   bullets:
     - LDB art 78: the Union runs bilingual intercultural school education for indigenous peoples
     - Art 79 §2 objectives include strengthening each community's mother tongue
     - Specific curricula and differentiated teaching materials are to be developed and published
     - Programmes must be planned with a hearing of the indigenous communities, art 79 §1

POLICY HISTORY (proposed rows):
 - year: 1988
   description: Constitution art 210 §2 assures indigenous communities the use of their mother tongues and own learning processes
 - year: 1996
   description: LDB (Lei 9.394) arts 78-79 create bilingual intercultural school education for indigenous peoples
 - year: 2021
   description: Lei 14.191 adds LDB art 60-A, deaf bilingual education in Libras as first language
 - year: 2024
   description: Lei 14.945 adds LDB art 35-A §2, extending the indigenous mother-tongue guarantee to ensino medio
