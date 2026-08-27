### CL|Chile - map eal (newcomerCriteria) and map fl (languagesOffered, upperSecondary)
STATUS: partial

SOURCES:
 - label: "Decreto 439 (2012), bases curriculares educacion basica (MINEDUC, Aprendo en Linea)"
   url: https://aprendoenlinea.mineduc.gob.cl/recursos/decreto-439-establece-bases-curriculares-educacion-basica-asignaturas-indica
   http: 200
   tier: official-document
 - label: "MINEDUC PEIB - Asignatura Lengua Indigena"
   url: https://peib.mineduc.cl/asignatura-lengua-indigena/
   http: 200
   tier: official-document
 - label: "OECD, PISA 2022 Results (Volume I) publication landing page - the URL these entries cite for 'Table I.B1.7.57'"
   url: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   http: 200
   tier: secondary-source

NOTE: Quotes have accents stripped for transport. Lengua Indigena is delivered by a PAIRED teacher model - classroom teacher plus 'educadora tradicional' - which is an unusual staffing arrangement worth recording.

EVIDENCE:
 - field: languagesOffered
   quote: "El Decreto, establece las bases curriculares para la educacion basica, para las asignaturas de Lenguaje y Comunicacion, Matematica, Historia y Geografia, Ciencias Naturales, e Idioma Extranjero Ingles, abarcando los cursos de 1o a 6o ano basico."
   source: https://aprendoenlinea.mineduc.gob.cl/recursos/decreto-439-establece-bases-curriculares-educacion-basica-asignaturas-indica
 - field: languagesOffered
   quote: "La asignatura de Lengua Indigena, con cuatro horas semanales asignadas, busca fortalecer los conocimientos culturales y linguisticos de cuatro pueblos originarios que aun mantienen vigente su lengua vernacula: aymara, mapuche, quechua y rapa nui."
   source: https://peib.mineduc.cl/asignatura-lengua-indigena/
 - field: languagesOffered
   quote: "se conforma una dupla pedagogica, compuesta por un/a docente de aula (que apoya en los aspectos pedagogicos) y un/a educadora tradicional, persona encargada de impartir los saberes tradicionales, especialmente la lengua indigena."
   source: https://peib.mineduc.cl/asignatura-lengua-indigena/

DRAFT BULLETS:
 - field: fl.languagesOffered
   bullets:
     - Decreto 439 names exactly one foreign language: Idioma Extranjero Ingles
     - Its curricular bases cover 1o to 6o ano basico, not the whole system
     - Alongside it, Asignatura Lengua Indigena carries four hours a week
     - Four languages are taught under it: aymara, mapuzugun, quechua and rapa nui
 - field: fl.upperSecondary
   bullets:
     - NOT covered by this entry's sources: Decreto 439 stops at 6o ano basico
     - Lengua Indigena reached octavo basico by 2018, short of upper secondary
     - No ensenanza media curricular instrument was retrievable from cited links
     - Record the gap as unfilled rather than infer from the basica decree
 - field: eal.newcomerCriteria
   bullets:
     - Neither cited Chilean source mentions migrant or foreign-born students
     - TERM COUNT: migrante 0 in PEIB; extranjer only in Idioma Extranjero Ingles
     - The indigenous-language subject is heritage provision, not newcomer designation
     - The OECD PISA link is a landing page and carries no country policy data

POLICY HISTORY:
 - {year: 2009, description: MINEDUC establishes Objetivos Fundamentales y Contenidos Minimos Obligatorios creating the Sector Lengua Indigena for ensenanza basica}
 - {year: 2010, description: Asignatura Lengua Indigena begins phased implementation from the first year of ensenanza basica}
 - {year: 2012, description: Decreto 439 sets curricular bases for basica including Idioma Extranjero Ingles, 1o to 6o}
 - {year: 2018, description: Phased implementation of Lengua Indigena reaches octavo basico}
