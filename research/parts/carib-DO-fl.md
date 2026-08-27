### DO|Dominican Republic — map `fl` (Foreign languages in school)
STATUS: documented for upper secondary (Modalidad Académica); partial overall

SOURCES:
 - label: "Ministerio de Educación de la República Dominicana (MINERD), Diseño Curricular, Nivel Secundario, Modalidad Académica, Segundo Ciclo 4to., 5to. y 6to., Versión Preliminar Para Revisión y Retroalimentación, Santo Domingo, D.N., 2018 (617 pp.) — includes the text of Ordenanza No. 22-2017, Artículo 9"
   url (LIVE ORIGIN, FAILING): https://www.ministeriodeeducacion.gob.do/docs/direccion-general-de-educacion-media/G9Ph-diseno-curricular-modalidad-academicapdf.pdf
   http: **522** (Cloudflare "connection timed out" from the origin) — the MINERD host would not
         serve this or any other /docs/ PDF during this session. Same failure on
         `ministeriodeeducacion.gob.do/docs/direccion-general-de-curriculo/RtcE-diseno-curricular-del-nivel-secundario-primer-ciclopdf.pdf` (522).
   url (ARCHIVE COPY ACTUALLY READ): http://web.archive.org/web/20220812220812if_/https://ministeriodeeducacion.gob.do/docs/direccion-general-de-educacion-media/G9Ph-diseno-curricular-modalidad-academicapdf.pdf
   http: 200 (6,006,924 bytes, valid %PDF-1.6, 617 pages, 1,344,795 chars extracted)
   tier: official-document (read via the Internet Archive, as the brief permits; the archive
         snapshot is dated 12 August 2022)
 - label: "UNESCO GEM Report PEER, Dominican Republic — INCLUSION profile"
   url: https://education-profiles.org/latin-america-and-the-caribbean/dominican-republic/~inclusion
   http: 200
   tier: secondary-source

EVIDENCE:
 - field: upperSecondary / curriculumTime — EXTENDED SCHOOL DAY
   quote: "DISTRIBUCIÓN DEL TIEMPO PARA EL NIVEL SECUNDARIO / JORNADA ESCOLAR EXTENDIDA / ÁREAS/GRADOS / SEGUNDO CICLO / 4TO. / 5TO. / 6TO. / Lengua Española 6 6 6 / Lenguas Extranjeras / Inglés 4 4 4 / Francés 2 2 2 / Matemática 7 7 7 / ... / Total de horas/semanas 40 40 40"
   source: Diseño Curricular Nivel Secundario, Modalidad Académica, Segundo Ciclo (2018), p. 98 region
 - field: upperSecondary / curriculumTime — REGULAR SCHOOL DAY
   quote: "DISTRIBUCIÓN DEL TIEMPO PARA EL SEGUNDO CICLO DEL NIVEL SECUNDARIO / JORNADA ESCOLAR REGULAR (MATUTINA, VESPERTINA Y NOCTURNA) / ÁREAS/GRADOS / Segundo Ciclo / 4to. / 5to. / 6to. / Lengua Española 5 5 5 / Lenguas Extranjeras / Inglés 3 3 3 / Francés 1 1 1 / ... / Total de horas/semanas 30 30 30"
   source: same, p. 99 region
 - field: curriculumTime — WHAT AN "HOUR" MEANS
   quote: "Párrafo II: En el cuadro siguiente se sintetiza la distribución del tiempo, expresado en horas de docencia (de 45 minutos cada una) en las diferentes asignaturas de la Modalidad Académica del Nivel Secundario, en los centros públicos y privados para la Jornada Regular (matutina, vespertina y nocturna)."
   source: same, quoting Ordenanza No. 22-2017, Artículo 9, Párrafo II
 - field: upperSecondary — THE LEGAL INSTRUMENT
   quote: "Ordenanza No. 22-2017 Modalidad Académica / Artículo 9. Se establece la carga horaria para el desarrollo curricular y el uso efectivo del tiempo en los centros públicos y privados en el marco de la Política Nacional de Jornada Escolar Extendida y la Jornada Regular (matutina, vespertina y nocturna) en centros del Nivel Secundario"
   source: same
 - field: curriculumTime
   quote: "El presente diseño del Nivel Secundario, resultante del Proceso de Revisión y Actualización Curricular, ha sido elaborado para desarrollarse en las escuelas de Jornada Extendida, cuya carga horaria es de 40 horas semanales."
   source: same
 - field: languagesOffered
   quote: "Lenguas Extranjeras (Inglés)........................................................................................................... 391 / Lenguas Extranjeras (Francés)........................................................................................................ 421"
   source: same, table of contents — the area contains exactly two languages, English and French,
   each with its own curriculum from 4to to 6to
 - field: assessment
   quote: "Nota: El currículo de Lenguas Extranjeras está alineado con el Marco Común Europeo de Referencia para las Lenguas1. Los niveles de dominio que se indican en las competencias específicas e indicadores de logro relativos a la producción y comprensión oral y escrita se establecieron a partir de los descriptores de dicho marco de referencia."
   source: same, repeated at the head of each grade's English and French curriculum
 - field: assessment
   quote: "1Consejo de Europa. (2002). Marco Común Europeo de Referencia para las Lenguas: aprendizaje, enseñanza, evaluación."
   source: same (the footnote MINERD gives for its CEFR reference)
   [CEFR band labels A1, A2, B1 and B2 all occur in the document (counts A1=9, A2=9, B1=3, B2=3).
   I have deliberately NOT reproduced which band is attached to which grade, since that is close
   to a cut-off table; the map should record only that the curriculum is CEFR-aligned.]
 - field: teacherSupply
   quote: "Jeanne Bogaert, Coordinadora Área Lenguas Extranjeras"
   source: same, credits page — evidences a standing Foreign Languages area coordination at MINERD
 - field: regionalMinorityLanguages — SOURCED NEGATIVE
   quote: "TERM COUNTS on the 617-page curriculum: criollo=1, créole=0, kreyol=0, haitian=5, haitiano=2, bilingü=1, 'lengua materna'=2, Inglés=18, Francés=18, 'Lenguas Extranjeras'=28, sanity word escuela=93."
   source: same
   [I checked every hit. The single "criollo" is a Social Studies vocabulary list ("colonialismo,
   sociedad, encomienda, esclavitud, etnias, mestizaje, pueblo, criollo, legado..."). All the
   "haitian/haitiano" hits are HISTORY CONTENT — "Ocupación haitiana de 1822", "inmigración de
   braceros haitianos", "la Revolución Haitiana", "antihaitianismo". The single "bilingü" is the
   stakeholder list entry "Asociaciones de Colegios Bilingües". **Haitian Creole is not offered,
   taught, or supported anywhere in this curriculum**, and French is present as a foreign language
   in its own right, not as a bridge to Haiti.]
 - field: regionalMinorityLanguages
   quote: "Comunica sus ideas y sentimientos de manera eficaz en su lengua materna, en otros idiomas y códigos diversos, con sentido incluyente y en distintos escenarios de intervención"
   source: same — the only "lengua materna" appearance is in a generic graduate-profile competence
   and carries no entitlement or provision

NOT ESTABLISHED — DO NOT PUBLISH THESE FIELDS FROM THIS REPORT:
 - primaryRequirement: I did NOT retrieve the Nivel Primario curriculum. The MINERD host returned
   522 for it. Do not infer a primary English requirement from the secondary document.
 - secondaryRequirement (Primer Ciclo, 1ro–3ro): not retrieved; the 522 blocked it. The document I
   read covers ONLY Segundo Ciclo (4to–6to), Modalidad Académica.
 - Técnico-Profesional and Artes modalities: different hours tables, not retrieved.
 - higherEducation: no MESCyT source retrieved. The "Inglés por Inmersión para la Competitividad"
   programme was NOT verified in this session — do not assert it.
 - uptake: no MINERD statistical bulletin retrieved; no enrolment split between English and French.
 - Ley General de Educación 66-97: not retrieved, not term-counted.

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - Not established here: the primary curriculum could not be retrieved, MINERD host returned 522
 - field: secondaryRequirement
   bullets:
     - Not established here: only Segundo Ciclo 4to-6to was retrieved, not Primer Ciclo
 - field: upperSecondary
   bullets:
     - Both English and French are compulsory in Modalidad Académica, 4to to 6to
     - Hours set by Ordenanza No. 22-2017, Artículo 9
     - Foreign Languages is a single curriculum area holding two named languages
 - field: languagesOffered
   bullets:
     - Exactly two: Inglés and Francés, each with its own curriculum per grade
     - No third foreign language appears in the 617-page design
     - Haitian Creole is not offered anywhere in the curriculum
 - field: curriculumTime
   bullets:
     - A teaching hour is defined as 45 minutes, Ordenanza 22-2017 Art. 9 Párrafo II
     - Jornada Extendida, 40h week: English 4h and French 2h in each of 4to, 5to, 6to
     - Jornada Regular, 30h week: English 3h and French 1h in each of 4to, 5to, 6to
     - By comparison Lengua Española gets 6h extended and 5h regular
 - field: assessment
   bullets:
     - Curriculum is aligned to the Common European Framework of Reference
     - MINERD cites the Council of Europe 2002 Spanish edition as its reference
     - Proficiency levels set from CEFR descriptors for oral and written production
 - field: teacherSupply
   bullets:
     - Not established: no teacher-supply or vacancy data retrieved
     - MINERD maintains a Coordinadora del Área de Lenguas Extranjeras
 - field: higherEducation
   bullets:
     - Not established: no MESCyT source was retrieved in this session
 - field: uptake
   bullets:
     - Not established: no enrolment split between English and French retrieved
     - Note both are compulsory in this modality, so uptake is not a choice variable here
 - field: regionalMinorityLanguages
   bullets:
     - Haitian Creole is absent from the curriculum: criollo=1 hit, and it is a history term
     - All seven Haitian references are history content, not language provision
     - French is a foreign language in its own right, not a bridge to Haiti
     - "Lengua materna" appears twice, both in generic graduate-profile wording
 - field: policyHistory
   rows:
     - {year: 1997, description: "General Education Act 66-97 regulates the Dominican education system (per UNESCO PEER; the Act itself was not retrieved)"}
     - {year: 2002, description: "Council of Europe Common European Framework of Reference, Spanish edition, adopted by MINERD as the reference for the Foreign Languages curriculum"}
     - {year: 2017, description: "Ordenanza No. 22-2017 sets the Modalidad Académica timetable, defining a teaching hour as 45 minutes and fixing English and French hours for Segundo Ciclo"}
     - {year: 2018, description: "Diseño Curricular, Nivel Secundario, Modalidad Académica, Segundo Ciclo published (preliminary version for review and feedback)"}
