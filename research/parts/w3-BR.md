### BR|Brazil - map eal (newcomerCriteria) and map dld (serviceModel)
STATUS: documented

SOURCES:
 - label: "Lei 9.394/1996, Lei de Diretrizes e Bases da Educacao Nacional, compiled text (Planalto)"
   url: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm
   http: 200
   tier: official-document
 - label: "Lei 13.146/2015, Lei Brasileira de Inclusao (Planalto), art. 3 as amended"
   url: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm
   http: 200
   tier: official-document
 - label: "OECD, PISA 2022 Results (Volume I) publication landing page - the URL these entries cite for 'Table I.B1.7.57'"
   url: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   http: 200
   tier: secondary-source

NOTE: Quotes have accents stripped for transport; the Planalto pages carry full accents (they are served in ISO-8859-1 and must be decoded as such, not as UTF-8). The 2025 amendment is the newest thing found on this unit and is worth a policyHistory row on its own.

EVIDENCE:
 - field: serviceModel
   quote: "XV - pessoa com necessidades complexas de comunicacao: aquela que, por qualquer motivo, tem dificuldades significativas para compreender ou expressar mensagens de forma oral, escrita, gestual ou por meio de outras formas convencionais de comunicacao, necessitando de recursos e estrategias alternativas ou aumentativas para viabilizar a interacao social, o acesso a informacao e a participacao em atividades da vida cotidiana."
   source: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm
 - field: serviceModel
   quote: "(Incluido pela Lei no 15.249, de 2025)"
   source: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm
 - field: newcomerCriteria
   quote: "Art. 78. O Sistema de Ensino da Uniao, com a colaboracao das agencias federais de fomento a cultura e de assistencia aos indios, desenvolvera programas integrados de ensino e pesquisa, para oferta de educacao escolar bilingue e intercultural aos povos indigenas"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm
 - field: newcomerCriteria
   quote: "comunidades indigenas a utilizacao de suas linguas maternas e processos proprios de"
   source: https://www.planalto.gov.br/ccivil_03/leis/l9394compilado.htm

DRAFT BULLETS:
 - field: eal.newcomerCriteria
   bullets:
     - No newcomer or additional-language designation exists in the LDB
     - TERM COUNT in Lei 9.394/1996: migrante 0, imigrante 0, refugiado 0; escola 125
     - The LDB's bilingual provision is art. 78, for indigenous peoples only
     - It guarantees indigenous communities the use of their own mother tongues
 - field: dld.serviceModel
   bullets:
     - New statutory category: pessoa com necessidades complexas de comunicacao
     - Inserted into the Lei Brasileira de Inclusao art. 3 by Lei no 15.249 de 2025
     - It covers difficulty understanding OR expressing oral, written or gestural messages
     - It entitles the person to alternative and augmentative resources and strategies

POLICY HISTORY:
 - {year: 1996, description: Lei 9.394/1996 (LDB) provides bilingual and intercultural school education for indigenous peoples, art. 78}
 - {year: 2017, description: Lei 13.415/2017 makes English the offered language in the ensino fundamental from the sixth year}
 - {year: 2024, description: Lei 14.945/2024 lets ensino medio curricula offer other foreign languages, preferably Spanish}
 - {year: 2025, description: Lei 15.249/2025 inserts 'pessoa com necessidades complexas de comunicacao' into the Lei Brasileira de Inclusao}
