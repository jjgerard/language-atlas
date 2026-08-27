### CR|Costa Rica — dld (Language disorder support)
STATUS: documented (workforce / legalEntitlement / policyHistory); partial overall

LEVERAGE NEGATIVE FOR THIS UNIT: Costa Rica's UNESCO PEER inclusion profile returns HTTP 200 but is
EMPTY — 790,248 bytes of site chrome with no profile body and the string "This content is not yet
translated!" where the body should be. Every other Latin American state in this batch has a body.
Costa Rica therefore had to be sourced entirely separately. Also note MEP's own site 403s a browser
request: `https://www.mep.go.cr/educacion-especial` returned HTTP 403.

SOURCES:
 - label: "Colegio de Terapeutas de Costa Rica — 'Terapia de lenguaje' (professional profile page)"
   url: https://colegiodeterapeutas.cr/terapia-de-lenguaje/
   http: 200 (verified by me this session)
   tier: official-document (a statutory public non-state body created by Ley 8989)
 - label: "Colegio de Terapeutas de Costa Rica — 'Quiénes somos' (constitution and history)"
   url: https://colegiodeterapeutas.cr/quienes-somos/
   http: 200
   tier: official-document
 - label: "Colegio de Terapeutas de Costa Rica — 'Directorio de profesionales'"
   url: https://colegiodeterapeutas.cr/directorio-de-profesionales/
   http: 200
   tier: official-document
 - label: "Ley N° 7600 Igualdad de Oportunidades para las Personas con Discapacidad (La Gaceta N° 102, 29 May 1996), CENAREC re-edition compendium"
   url: https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2019/11/Costa-Rica_Act-7600-Equal-opportunities-for-people-with-disabilities.pdf
   http: 200 (1,507,383 bytes; PDF; first lines read "Ley 7600 / IGUALDAD DE OPORTUNIDADES PARA LAS PERSONAS CON DISCAPACIDAD / Publicado en el Diario Oficial La Gaceta Nº 102. del 29 de mayo de 1996 / Reeditado por Centro Nacional de Recursos para la Inclusión Educativa")
   tier: official-document (statute text; note this file is a CENAREC COMPENDIUM that also reprints
     other laws Ley 7600 amended, so term counts on it must be read with that in mind)

EVIDENCE:
 - field: workforce
   quote: "El Colegio de Terapeutas de Costa Rica es un ente público, no estatal, sin fines de lucro, fundamentado en la Ley 8989, que integra profesionales graduados de universidades acreditadas, en las áreas de: Audiología, Imagenología Diagnóstica y Terapeútica, Terapia Física, Terapia del Lenguaje, Terapia Ocupacional, Terapia Respiratoria."
   source: https://colegiodeterapeutas.cr/quienes-somos/
   note: Costa Rica is the ONLY state in this batch of eight with a statutory licensing body that
     names Terapia del Lenguaje as a regulated profession.
 - field: terminology
   quote: "El terapeuta del lenguaje se enfoca en la evaluación, diagnóstico y tratamiento de trastornos de la comunicación atendiendo a pacientes que presentan dificultades en el habla, el lenguaje, la voz, la fluidez y la deglución."
   source: https://colegiodeterapeutas.cr/terapia-de-lenguaje/
 - field: terminology
   quote: "Los profesionales en terapia del lenguaje pueden especializarse en áreas como: Deglución | Habla | Lenguaje | Motricidad orofacial | Resonancia | Voz"
   source: https://colegiodeterapeutas.cr/terapia-de-lenguaje/
 - field: workforce
   quote: "en junio de 1994, nace en la Universidad Autónoma de Centroamérica, el Colegio Santa Paula, el cual profesionaliza la Terapia Física, Terapia Ocupacional, Terapia del Lenguaje y Terapia Respiratoria y Audiología."
   source: https://colegiodeterapeutas.cr/quienes-somos/
 - field: workforce
   quote: "El 10 de octubre del año 2011, siete años después, se aprobó la Ley 8989 de Creación del Colegio de Terapeutas de Costa Rica, por parte de la Asamblea Legislativa."
   source: https://colegiodeterapeutas.cr/quienes-somos/
 - field: workforce
   quote: "Fue hasta el mes de febrero del 2013, que se reglamentó la Ley 8989 por medio del Decreto Ejecutivo número 37 517-S. En el mes de mayo de 2013 se inician los trámites de incorporación."
   source: https://colegiodeterapeutas.cr/quienes-somos/
 - field: workforce
   note: HEADCOUNT NOT PUBLISHED — negative, checked directly. The Colegio's public listing is an
     OPT-IN directory, not a register: "El Directorio es un servicio que dispone el colegio, en
     beneficio de los profesionales y la sociedad costarricense que busca especialistas que estén a
     derecho en el ejercicio de su profesión", reached via a page headed "Inscripción al Directorio
     profesional" and a per-area search box. No total count of colegiados in Terapia del Lenguaje
     is published on the pages retrieved.
   source: https://colegiodeterapeutas.cr/directorio-de-profesionales/
 - field: legalEntitlement
   quote: "ARTÍCULO 17.- Adaptaciones y servicios de apoyo Los centros educativos efectuarán las adaptaciones necesarias y proporcionarán los servicios de apoyo requeridos para que el derecho de las personas a la educación sea efectivo. Las adaptaciones y los servicios de apoyo incluyen los recursos humanos especializados, adecuaciones curriculares, evaluaciones, metodología, recursos didácticos y planta física."
   source: (Ley 7600 text) https://www.un.org/development/desa/disabilities/wp-content/uploads/sites/15/2019/11/Costa-Rica_Act-7600-Equal-opportunities-for-people-with-disabilities.pdf
 - field: legalEntitlement
   quote: "ARTÍCULO 18.- Formas de sistema educativo Las personas con necesidades educativas especiales podrán recibir su educación en el Sistema Educativo Regular, con los servicios de apoyo requeridos."
   source: same
 - field: identificationCriteria
   quote: "Estas previsiones serán definidas por el personal del centro educativo con asesoramiento técnico-especializado." (Art. 17)
   source: same
   note: The DECIDING BODY is the school's own staff, taking specialist technical advice — there is
     no statutory panel and no external gatekeeper.
 - field: referralPathway
   quote: "ARTÍCULO 20.- Derecho de los padres de familia A los padres de familia o encargados de estudiantes con discapacidad, se les garantiza el derecho de participar en la selección, ubicación, organización y evaluación de los servicios educativos."
   source: same
 - field: funding
   quote: "ARTÍCULO 22.- Obligaciones del Ministerio de Educación Pública Para cumplir con lo dispuesto en este capítulo, el Ministerio de Educación Pública suministrará el apoyo, el asesoramiento, los recursos y la capacitación que se requieran."
   source: same
 - field: terminology
   note: TERM-COUNT PROOF, run on the retrieved Ley 7600 / CENAREC compendium text.
     fonoaudiolog = 0, habla = 0, terapia = 0.
     lenguaje = 8, and NONE of the eight is a speech-and-language provision: they are notarial and
     commercial-code clauses about the language a document is drawn up in, plus "Lenguaje de Señas
     Costarricense" (Art. 177). "necesidades educativas especiales" = 16.
     SANITY CHECK on the same file: discapacidad = 299, "servicios de apoyo" = 55.
     CONCLUSION: Costa Rica's disability-education statute grants a GENERIC "servicios de apoyo"
     right that specialist language therapy can be delivered under, but the statute itself never
     names speech, language or the profession.
   source: same
 - field: identifiedPrevalence / assessments / dischargeCriteria / outcomesEvidence
   note: NOT FOUND this session. MEP's own education-especial pages 403 to a browser user-agent, and
     no MEP statistical yearbook with a language-disaggregated count was retrieved.

DRAFT BULLETS:
 - field: terminology
   bullets:
     - Regulated profession is "terapia del lenguaje", licensed under Ley 8989
     - Colegio scope: trastornos de la comunicacion covering habla, lenguaje, voz, fluidez, deglucion
     - Ley 7600 itself never names speech or language, only generic "servicios de apoyo"
     - Term count on Ley 7600 text: fonoaudiolog 0, habla 0, terapia 0
 - field: legalEntitlement
   bullets:
     - Ley 7600 Art. 18: SEN pupils may be educated in the regular system with required support
     - Art. 17 obliges schools to make adaptations and provide support services
     - Support services expressly include "recursos humanos especializados"
     - Art. 14 guarantees access from early stimulation through to higher education
 - field: identificationCriteria
   bullets:
     - School staff define the provisions, taking specialist technical advice
     - No statutory panel or external gatekeeper is named in Ley 7600
 - field: referralPathway
   bullets:
     - Parents have a statutory right to take part in selection, placement and evaluation
     - No language-specific referral route is set out in the statute
 - field: workforce
   bullets:
     - Colegio de Terapeutas is a statutory public non-state body created by Ley 8989 of 2011
     - Terapia del Lenguaje is one of six regulated areas it licenses
     - Training route dates from June 1994 at Universidad Autonoma de Centroamerica
     - No headcount published: the public listing is an opt-in directory, not a register
 - field: funding
   bullets:
     - Ley 7600 Art. 22 places the funding duty on the Ministerio de Educacion Publica
 - field: policyHistory
   rows:
     - {year: 1994, description: "Terapia del Lenguaje degree established at Universidad Autonoma de Centroamerica in June"}
     - {year: 1996, description: "Ley 7600 Igualdad de Oportunidades creates the servicios de apoyo entitlement in education"}
     - {year: 2004, description: "Campaign begins for an autonomous Colegio de Terapeutas, bill filed as expediente 16775"}
     - {year: 2011, description: "Ley 8989 creates the Colegio de Terapeutas de Costa Rica, approved 10 October"}
     - {year: 2011, description: "First General Assembly on 9 November elects a board including a Terapeuta de Lenguaje"}
     - {year: 2013, description: "Decreto Ejecutivo 37517-S regulates Ley 8989; registration of members opens in May"}
