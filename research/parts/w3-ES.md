### ES|Spain
STATUS: partial

SOURCES:
 - label: "Ley Organica 3/2020, de 29 de diciembre (LOMLOE), consolidated text on BOE"
   url: https://www.boe.es/buscar/doc.php?id=BOE-A-2020-17264
   http: 200 text/html, 411,226 bytes (392,506 chars of page text after tag stripping)
   tier: official-document
 - label: "Comunidad de Madrid, 'Integracion tardia en el sistema educativo espanol', section 'Apoyo especifico en Aula de Enlace'"
   url: https://www.comunidad.madrid/servicios/educacion/integracion-tardia-sistema-educativo-espanol
   http: 200 text/html, 120,999 bytes (8,948 chars of page text after tag stripping)
   tier: official-document
 - label: "European Commission/EACEA/Eurydice, Key data on teaching languages at school in Europe - 2023 edition, chapter A, doi:10.2797/529032, CC BY 4.0"
   url: https://doi.org/10.2797/529032
   http: PDF held locally from an earlier pass in this project; 518,976 chars extracted with pdftotext -layout
   tier: official-document
   note: a report about schools; it carries no degree-level information.

WHAT THIS DOES AND DOES NOT SHOW:
 The count of 'lengua materna' is over the LOMLOE text as served by BOE's consolidated view; the cooficial languages are handled under other wording in that act, so the zero should be read as 'no home-language-of-migrant-pupils provision under that phrase', not as 'no language provision at all'. The third and fourth cited links, the Moncloa non-university statistics advance and the OECD PISA landing page, were not needed for this field.

EVIDENCE:
 - field: eal.l1Support
   quotes:
     - "El apoyo específico al proceso de enseñanza y aprendizaje de las áreas, materias o ámbitos en un aula determinada para el alumnado que se escolarice con desconocimiento de la lengua española en tercero de Educación Primaria o siguientes cursos de la enseñanza obligatoria, se denominará Aula de Enlace."  [https://www.comunidad.madrid/servicios/educacion/integracion-tardia-sistema-educativo-espanol]
     - "La atención educativa será, en todo caso, simultánea a su escolarización en el grupo ordinario, con el que compartirán el mayor tiempo posible del horario semanal."  [https://www.comunidad.madrid/servicios/educacion/integracion-tardia-sistema-educativo-espanol]
     - "Se proporcione la atención educativa específica adecuada con recursos especializados y una metodología específica, centrada en el desarrollo de la competencia lingüística, el aprendizaje del idioma español y un acercamiento a la cultura y costumbres de la Comunidad de Madrid"  [https://www.comunidad.madrid/servicios/educacion/integracion-tardia-sistema-educativo-espanol]
     - "Term count over the retrieved LOMLOE consolidated text: 'lengua materna' 0, 'lenguas maternas' 0, 'lengua de origen' 0 in 392,506 chars"  [https://www.boe.es/buscar/doc.php?id=BOE-A-2020-17264]
     - "the German-speaking Community of Belgium (24.1 %), Cyprus (22.3 %), Spain (20.6 %) and Austria (20.5 %)"  [https://doi.org/10.2797/529032]
   sources: https://doi.org/10.2797/529032, https://www.boe.es/buscar/doc.php?id=BOE-A-2020-17264, https://www.comunidad.madrid/servicios/educacion/integracion-tardia-sistema-educativo-espanol

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Sourced absence: LOMLOE says 'lengua materna' 0 times in 392,506 chars of consolidated text
     - Madrid's named measure, the Aula de Enlace, is Spanish acquisition, not home-language support
     - It runs alongside the ordinary class, which pupils share for as much of the week as possible
     - Spain is third in Europe on pupils speaking another language at home, at 20.6 per cent
 - field: policyHistory
   rows:
     - {year: 2020, description: "Ley Organica 3/2020 of 29 December (LOMLOE) enacted"}
