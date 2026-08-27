### PY|Paraguay — dld (Language disorder support)
STATUS: documented (for terminology / legalEntitlement / identificationCriteria / multilingualProvision); partial overall

SOURCES:
 - label: "Paraguay, Ley N° 1264/1998 General de Educación, full text (Cap. IV, Arts. 80–84; Art. 31; Art. 75)"
   url: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
   http: 200 (119,196 bytes; retrieved file contains the Art. 80 text quoted below)
   tier: official-document (statute text reproduced on the Justia Paraguay repository)
 - label: "UNESCO PEER, Paraguay — Inclusion profile"
   url: https://education-profiles.org/latin-america-and-the-caribbean/paraguay/~inclusion
   http: 200 (826,533 bytes; profile body present)
   tier: secondary-source

RETRIEVAL NEGATIVE WORTH RECORDING:
 The Paraguayan official repository BACN (bacn.gov.py) uses a NUMERIC id in the path and IGNORES the
 human-readable slug. `https://www.bacn.gov.py/leyes-paraguayas/3831/ley-n-1264-general-de-educacion`
 and `.../3283/ley-n-5136-de-educacion-inclusiva` both return HTTP 200 but serve COMPLETELY DIFFERENT
 LAWS (Ley 4531 on a public holiday, and Ley 3236 on a municipal land transfer). The correct id for
 Ley 1264 is 3766 (`https://www.bacn.gov.py/leyes-paraguayas/3766/ley-n-1264-general-de-educacion`,
 HTTP 200, page titled "Descargar Archivo: Ley 1264"), but its PDF download endpoint
 `https://www.bacn.gov.py/descarga/3766/ley%201264%201998.pdf` returns HTML, not a PDF, so the text
 had to be taken from Justia. NEVER trust a bacn.gov.py URL by its slug.

EVIDENCE:
 - field: terminology
   quote: "Artículo 80.- El Gobierno Nacional por medio del sistema educativo nacional garantizará la formación básica de: a) personas con características educativas individuales significativamente diferentes de las de sus pares; y, b) personas con necesidades educativas especiales: superdotados, con dificultades de aprendizaje, con trastornos de conducta, con trastornos de lenguaje y otros."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
   note: THIS IS THE STRONGEST dld FINDING IN THE BATCH. Paraguay is the only one of the eight
     states whose education statute NAMES "trastornos de lenguaje" as a statutory SEN category.
     TERM COUNT on the retrieved statute: lenguaje = 1 (this clause), habla = 0, fonoaudiolog = 0.
     SANITY CHECK: "lengua" / "idioma" hits = 8, "educación" pervasive.
 - field: terminology
   quote: "The same act defines a student with specific educational support needs as one who, 'due to specific educational support needs arising from physical, intellectual, auditory, visual and psychosocial disabilities, specific learning disorders, high intellectual abilities, late incorporation into the education system, personal circumstances or school history, requires support and/or adaptations to achieve the maximum possible development of their personal abilities.'"
   source: https://education-profiles.org/latin-america-and-the-caribbean/paraguay/~inclusion
   note: CONTRADICTION WORTH FLAGGING. The LATER instrument, Ley 5136/2013 de Educación Inclusiva,
     re-labels the population "necesidades específicas de apoyo educativo" and its list does NOT
     name language disorder — the 1998 category survives only in the older Ley 1264.
 - field: legalEntitlement
   quote: "Artículo 81.- Esta modalidad educativa se orientará al desarrollo del individuo en base a su potencial... En la medida de lo posible se realizará en forma integrada dentro de las instituciones educativas comunes."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
 - field: identificationCriteria
   quote: "Dentro de la educación inicial, se implementará programas de prevención de dificultades del aprendizaje, así como sistemas de evaluación para la detección precoz de condiciones intelectuales superiores, inferiores y deficiencias sensoriales para tomar medidas oportunas y adecuadas a cada caso." (Art. 31)
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
   note: The early-detection duty covers intellectual level and SENSORY impairment. It does NOT
     name language, even though Art. 80 of the same statute does.
 - field: serviceModel
   quote: "Artículo 82.- El contenido especial de los programas de estos servicios, y su orientación técnico-pedagógica, así como el sistema de evaluación y promoción, serán aprobados por el Ministerio de Educación y Cultura."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
 - field: workforce
   quote: "Artículo 83.- El personal docente de esta modalidad educativa deberá contar con una formación especializada."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
   note: A specialist-TEACHER requirement, not a therapist requirement. No fonoaudiólogo, terapeuta
     del lenguaje or logopeda is named anywhere in the retrieved statute (count 0) or in PEER.
 - field: referralPathway
   quote: "Artículo 84.- El Gobierno Nacional establecerá la política para la prevención, el diagnóstico precoz y el tratamiento de las personas con necesidades especiales."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
 - field: multilingualProvision
   quote: "Artículo 31.- La enseñanza se realizará en la lengua oficial materna del educando desde los comienzos del proceso escolar o desde el primer grado. La otra lengua oficial se enseñará también desde el inicio de la educación escolar con el tratamiento didáctico propio de una segunda lengua."
   source: https://paraguay.justia.com/nacionales/leyes/ley-1264-may-26-1998/gdoc/
 - field: multilingualProvision
   quote: "the Action Plan highlights that students from disadvantaged socioeconomic backgrounds, rural areas or indigenous communities who attend official institutions and do not speak Spanish have low levels of performance in national and international tests like PISA"
   source: https://education-profiles.org/latin-america-and-the-caribbean/paraguay/~inclusion
 - field: serviceModel
   quote: "The Action Plan proposed the creation of inclusion support centres through the gradual renovation of special schools. In 2014, there were around 70 schools and education centres for people with disabilities in Paraguay. The eradication of special schools is one of the main goals of the Directorate of Inclusive Education."
   source: https://education-profiles.org/latin-america-and-the-caribbean/paraguay/~inclusion
 - field: identifiedPrevalence / assessments / dischargeCriteria / outcomesEvidence / funding
   note: NOT FOUND. No language-disaggregated count, no named instrument, no discharge rule and no
     dedicated funding stream was located in any source retrieved this session.

DRAFT BULLETS:
 - field: terminology
   bullets:
     - Ley 1264/1998 Art. 80 names "trastornos de lenguaje" as a statutory SEN category
     - It sits alongside superdotados, dificultades de aprendizaje and trastornos de conducta
     - Later Ley 5136/2013 drops the term for "necesidades especificas de apoyo educativo"
     - The 2013 list names specific learning disorders but not language disorder
 - field: legalEntitlement
   bullets:
     - Art. 80 obliges the state to guarantee "formacion basica" for the named groups
     - Art. 81 requires integrated placement in mainstream schools where possible
     - Ley 5136/2013 extends the duty to public, private and subsidised institutions
 - field: identificationCriteria
   bullets:
     - Art. 31 requires early-years prevention programmes and early-detection assessment
     - That duty names intellectual level and sensory impairment, not language
     - Art. 84 makes early diagnosis and treatment an explicit government policy duty
 - field: serviceModel
   bullets:
     - Special-education programme content and assessment approved by the MEC (Art. 82)
     - Inclusion support centres replace special schools under the 2018-2023 Action Plan
     - Around 70 special schools and centres existed in 2014
     - Eradicating special schools is a stated goal of the Directorate of Inclusive Education
 - field: workforce
   bullets:
     - Art. 83 requires specialised training for teachers in this modality
     - No fonoaudiologo or terapeuta del lenguaje is named in the statute (term count 0)
 - field: multilingualProvision
   bullets:
     - Art. 31: teaching is in the pupil's official mother tongue from first grade
     - The other official language is taught from the start as a second language
     - Guarani and Spanish are both official; the rule is symmetrical between them
     - PEER: pupils in official schools who do not speak Spanish score low on PISA
 - field: policyHistory
   rows:
     - {year: 1992, description: "Constitution Art. 77 requires initial teaching in the learner's official mother tongue"}
     - {year: 1998, description: "Ley 1264 General de Educacion Art. 80 names trastornos de lenguaje as an SEN category"}
     - {year: 2001, description: "Ley 1680 Codigo de la Ninez Art. 22 gives a right to early stimulation and specialised treatment"}
     - {year: 2007, description: "Ley 3231 creates the Directorate-General of Indigenous School Education"}
     - {year: 2012, description: "Ley 4720 creates SENADIS at ministerial level"}
     - {year: 2013, description: "Ley 5136 de Educacion Inclusiva redefines the population as necesidades especificas de apoyo educativo"}
     - {year: 2015, description: "Resolution 1 regulates infringements and penalties under the Inclusive Education Act"}
