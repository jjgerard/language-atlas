### UY|Uruguay - map eal (newcomerCriteria), map dld (serviceModel), map fl (upperSecondary)
STATUS: partial

SOURCES:
 - label: "Ley 18.437, Ley General de Educacion (IMPO)"
   url: https://www.impo.com.uy/bases/leyes/18437-2008
   http: 200
   tier: official-document
 - label: "Ley 18.651, proteccion integral de personas con discapacidad (IMPO)"
   url: https://www.impo.com.uy/bases/leyes/18651-2010
   http: 200
   tier: official-document
 - label: "OECD, PISA 2022 Results (Volume I) publication landing page - the URL these entries cite for 'Table I.B1.7.57'"
   url: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   http: 200
   tier: secondary-source

NOTE: Quotes have accents stripped for transport. TERM COUNT in Ley 18.651: 'fonoaudiologo' 0, 'lenguaje' occurs only in general communication contexts; 'rehabilitacion' dominates. Recording that the disability law is health-framed is itself the finding.

EVIDENCE:
 - field: newcomerCriteria
   quote: "la consideracion de las diferentes lenguas maternas existentes en el pais (espanol del Uruguay, portugues del Uruguay, lengua de senas uruguaya) y la formacion plurilingue a traves de la ensenanza de segundas lenguas y lenguas extranjeras."
   source: https://www.impo.com.uy/bases/leyes/18437-2008
 - field: upperSecondary
   quote: "La educacion media superior comprende los tres anos posteriores a la culminacion de la educacion media basica y constituye el ultimo tramo de la educacion obligatoria."
   source: https://www.impo.com.uy/bases/leyes/18437-2008
 - field: upperSecondary
   quote: "La educacion primaria brindara los conocimientos basicos e iniciara el proceso de incorporacion de las alfabetizaciones fundamentales, con particular enfasis en lengua materna, segunda lengua, matematicas"
   source: https://www.impo.com.uy/bases/leyes/18437-2008
 - field: serviceModel
   quote: "La proteccion de la persona con discapacidad, sin importar su edad, se garantizara mediante acciones y medidas orientadas a su salud, educacion, seguridad social y acceso al trabajo."
   source: https://www.impo.com.uy/bases/leyes/18651-2010

DRAFT BULLETS:
 - field: eal.newcomerCriteria
   bullets:
     - No newcomer designation: Uruguay names three MOTHER TONGUES in the country
     - They are espanol del Uruguay, portugues del Uruguay, lengua de senas uruguaya
     - Portuguese here is a border variety of Uruguay, not an immigrant language
     - TERM COUNT in Ley 18.437: migrante 0, inmigrante 0, against educacion 510
 - field: fl.upperSecondary
   bullets:
     - Educacion media superior is three years, the last compulsory stretch
     - The law makes segunda lengua an emphasis of PRIMARY, not of media superior
     - Plurilingual formation via second and foreign languages is a cross-cutting line
     - No named language subject is required at media superior in Ley 18.437
 - field: dld.serviceModel
   bullets:
     - Thin: Ley 18.651 is a disability law weighted to health and rehabilitation
     - It guarantees health, education, social security and work access, no service model
     - No speech-language service, caseload or provider rule appears in it
     - A Uruguayan education-sector instrument is needed to fill this properly

POLICY HISTORY:
 - {year: 2008, description: Ley 18.437 General de Educacion names espanol del Uruguay, portugues del Uruguay and lengua de senas uruguaya as the country's mother tongues}
 - {year: 2010, description: Ley 18.651 on integral protection of persons with disability}
