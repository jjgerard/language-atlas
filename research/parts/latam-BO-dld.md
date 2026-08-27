### BO|Bolivia — dld (Language disorder support)
STATUS: partial

SOURCES:
 - label: "Bolivia, Ley de la Educación 'Avelino Siñani – Elizardo Pérez' (Ley 070), 20 December 2010, full text"
   url: https://www.lexivox.org/norms/BO-L-N70.html
   http: 200 (url_effective unchanged; retrieved file contains "Avelino Siñani")
   tier: official-document (statute text reproduced on the LexiVox legal database, not a .gob.bo host — flagged)
 - label: "Bolivia, Ley General para Personas con Discapacidad (Ley 223), 2012, full text"
   url: https://www.lexivox.org/norms/BO-L-N223.html
   http: 200
   tier: official-document (via LexiVox, as above)
 - label: "UNESCO PEER, Bolivia (Plurinational State of) — Inclusion profile"
   url: https://education-profiles.org/latin-america-and-the-caribbean/bolivia/~inclusion
   http: 200 (833,787 bytes; profile body present, stamped "Last modified: Tue, 10/03/2026 - 14:31")
   tier: secondary-source

EVIDENCE:
 - field: terminology
   quote: "Artículo 26°.- (Estructura de la Educación Especial) Son áreas de la Educación Especial: Educación para Personas con Discapacidad. Educación para Personas con Dificultades en el Aprendizaje. Educación para Personas con Talento Extraordinario."
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: terminology
   note: TERM-COUNT PROOF OF ABSENCE, run on the retrieved text of Ley 070.
     lenguaje = 2, and BOTH occurrences are "lenguaje en señas" / "lenguaje de señas" (sign language).
     habla = 1, and it is the word "hablantes" (speakers) inside a language-revitalisation clause.
     fonoaudiolog = 0. logoped = 0.
     "dificultades en el aprendizaje" = 7.
     SANITY CHECK on the same file: educación = 324, discapacidad = 11, "Educación Especial" = 7.
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: terminology
   note: SAME TEST on Ley 223/2012. fonoaudiolog = 0, logoped = 0, habla = 0.
     lenguaje = 1, and it is "eliminando lenguaje discriminatorio" (Art. 39, on media language).
     SANITY CHECK: discapacidad = 212, comunicación = 11.
   source: https://www.lexivox.org/norms/BO-L-N223.html
 - field: legalEntitlement
   quote: "Artículo 25°.- (Educación Especial) Comprende las acciones destinadas a promover y consolidar la educación inclusiva para personas con discapacidad, personas con dificultades en el aprendizaje y personas con talento extraordinario en el Sistema Educativo Plurinacional."
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: serviceModel
   quote: "La atención a estudiantes con necesidades educativas específicas se realizará en centros integrales multisectoriales, a través de programas de valoración, detección, asesoramiento y atención directa, desde la atención temprana y a lo largo de toda su vida." (Art. 27)
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: serviceModel
   quote: "Modalidad directa, para las y los estudiantes con discapacidad que requieren servicios especializados e integrales. Modalidad indirecta, a través de la inclusión de las personas con discapacidad, personas con dificultades en el aprendizaje y personas con talento extraordinario en el Sistema Educativo Plurinacional" (Art. 27)
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: referralPathway
   quote: "Article 10 of the resolution establishes that once a student with a disability is enrolled in an inclusive education unit, in compliance with simultaneous enrolment they will also be enrolled in a special education centre where they will be assigned a technical/pedagogical support teacher."
   source: https://education-profiles.org/latin-america-and-the-caribbean/bolivia/~inclusion
 - field: serviceModel
   quote: "According to data published by the Director of Special Education in January 2020, there are 178 public and 35 private special education centres in the Plurinational State of Bolivia."
   source: https://education-profiles.org/latin-america-and-the-caribbean/bolivia/~inclusion
 - field: multilingualProvision
   quote: "Artículo 7°.- (Uso de Idiomas oficiales y lengua extranjera) La educación debe iniciarse en la lengua materna... En poblaciones o comunidades monolingües y de predominio de la lengua originaria, la lengua originaria como primera lengua y el castellano como segunda lengua."
   source: https://www.lexivox.org/norms/BO-L-N70.html
 - field: workforce
   quote: "Article 11 of the General Law for Persons with Disabilities establishes that the Ministry of Education will ensure that teachers are trained with a focus on inclusive education, giving priority to alternative language, Bolivian Sign Language, the Braille system and curricular adaptations"
   source: https://education-profiles.org/latin-america-and-the-caribbean/bolivia/~inclusion
 - field: identifiedPrevalence
   note: NOT FOUND. PEER states of Bolivia's education statistics system: "There are no indicators on inclusive education." No disaggregation by impairment type — and none by language or speech — was located in any retrieved source.
   source: https://education-profiles.org/latin-america-and-the-caribbean/bolivia/~inclusion
 - field: assessments / dischargeCriteria / outcomesEvidence / funding
   note: NOT FOUND in any source retrieved this session. Ley 070 and Ley 223 contain no named instrument, no discharge rule and no funding stream tied to language.

DRAFT BULLETS:
 - field: terminology
   bullets:
     - No speech, language or communication category exists in Bolivian education law
     - Ley 070/2010 uses "dificultades en el aprendizaje" as the nearest category
     - Term count in Ley 070: fonoaudiolog 0, logoped 0, lenguaje 2 (both sign language)
     - Same count in Ley 223/2012 on disability: fonoaudiolog 0, habla 0
 - field: legalEntitlement
   bullets:
     - Ley 070/2010 Art. 25 frames Educacion Especial as a subsystem, not an individual right
     - Art. 26 names exactly three areas: disability, learning difficulty, extraordinary talent
     - No entitlement attaches to a language disorder as such
 - field: serviceModel
   bullets:
     - Art. 27 places support in "centros integrales multisectoriales"
     - Programmes run valoracion, deteccion, asesoramiento and atencion directa from early years
     - Direct modality serves disabled pupils; indirect modality is mainstream inclusion
     - PEER cites 178 public and 35 private special education centres as at January 2020
 - field: referralPathway
   bullets:
     - No language-specific referral route found in Ley 070 or Ley 223
     - RM 001/2020 requires dual enrolment in a mainstream unit and a special education centre
     - A technical/pedagogical support teacher is assigned at the special education centre
 - field: multilingualProvision
   bullets:
     - Ley 070 Art. 7: schooling must begin in the mother tongue
     - In indigenous-majority communities the native language is L1 and Spanish is L2
     - In Spanish-majority communities Spanish is L1 and the native language is L2
     - Sign language teaching is a right and part of all teachers' plurilingual training
 - field: identifiedPrevalence
   bullets:
     - Not found: PEER records that Bolivia has no indicators on inclusive education
 - field: policyHistory
   rows:
     - {year: 2009, description: "Constitution makes education intracultural, intercultural and plurilingual throughout the system"}
     - {year: 2010, description: "Ley 070 Avelino Sinani-Elizardo Perez sets three areas of Educacion Especial, none of them language"}
     - {year: 2012, description: "Ley 223 General para Personas con Discapacidad; contains no speech or language provision"}
     - {year: 2012, description: "Supreme Decree 1893 regulates Ley 223 and creates comprehensive multisectoral centres"}
     - {year: 2013, description: "Ministerial Resolution 069 approves transformation of alternative and special education"}
     - {year: 2020, description: "Ministerial Resolution 001 standardises alternative and special education and requires dual enrolment"}
