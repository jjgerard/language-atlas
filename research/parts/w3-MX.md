### MX|Mexico - map eal (newcomerCriteria) and map fl (languagesOffered, upperSecondary)
STATUS: documented

SOURCES:
 - label: "Ley General de Educacion, published in the Diario Oficial de la Federacion 30 September 2019"
   url: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019
   http: 200 (note: the www.dof.gob.mx certificate fails validation; the request succeeded against dof.gob.mx)
   tier: official-document
 - label: "OECD, PISA 2022 Results (Volume I) publication landing page - the URL these entries cite for 'Table I.B1.7.57'"
   url: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   http: 200
   tier: secondary-source

NOTE: Quotes have accents stripped for transport. RETRIEVAL NOTE: a plain request to https://www.dof.gob.mx fails with SEC_E_WRONG_PRINCIPAL (certificate name mismatch); the page is retrievable at the apex host dof.gob.mx, which is where the request landed.

EVIDENCE:
 - field: newcomerCriteria
   quote: "Articulo 56. El Estado garantizara el ejercicio de los derechos educativos, culturales y linguisticos a todas las personas, pueblos y comunidades indigenas o afromexicanas, migrantes y jornaleros agricolas."
   source: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019
 - field: newcomerCriteria
   quote: "La educacion indigena debe atender las necesidades educativas de las personas, pueblos y comunidades indigenas con pertinencia cultural y linguistica"
   source: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019
 - field: languagesOffered
   quote: "VI. El aprendizaje de las lenguas extranjeras;"
   source: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019
 - field: languagesOffered
   quote: "Crear mecanismos y estrategias para incentivar el acceso, permanencia, transito, formacion y desarrollo de los educandos con un enfoque intercultural y plurilingue"
   source: https://www.dof.gob.mx/nota_detalle.php?codigo=5573858&fecha=30/09/2019

DRAFT BULLETS:
 - field: eal.newcomerCriteria
   bullets:
     - No newcomer or additional-language designation in the Ley General de Educacion
     - Its one use of migrantes is art. 56, beside jornaleros agricolas: internal migration
     - The linguistic provision it triggers is educacion indigena, not a newcomer route
     - TERM COUNT: migrante 1, inmigrante 0, refugiado 0, against educacion 376
 - field: fl.languagesOffered
   bullets:
     - The law names NO specific foreign language: ingles appears zero times
     - Curriculum content lists only el aprendizaje de las lenguas extranjeras
     - TERM COUNT: lengua extranjera singular 0, ingles 0, against indigena 33
     - Concrete language obligations in Mexico sit below the law, not in it
 - field: fl.upperSecondary
   bullets:
     - The law treats foreign-language learning as general content, not by level
     - It sets no upper-secondary foreign-language requirement of its own
     - It commits to an intercultural and plurilingual approach across the system
     - Level-specific rules need the SEP planes de estudio, not cited by this entry

POLICY HISTORY:
 - {year: 2019, description: Ley General de Educacion published in the Diario Oficial de la Federacion on 30 September 2019}
