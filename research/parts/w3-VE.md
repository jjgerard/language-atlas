### VE|Venezuela - map fl, field upperSecondary
STATUS: documented

SOURCES:
 - label: "Ministerio del Poder Popular para la Educacion, Proceso de transformacion curricular para la educacion media general en la modalidad de jovenes y adultos (SITEAL/IIEP-UNESCO copy)"
   url: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/proceso_de_transformacion_curricular_para_la_educacion_media_general_en_la_modalidad_jovenes_y_adultos.pdf
   http: 200
   tier: official-document
 - label: "Lopez d'Amico, Gregson, Medina & Esteves, 'English Language Teaching within the State Education System in Venezuela', in British Council, English Public Policies in Latin America (2018) - Internet Archive copy; NOT retrievable in this session, see notes"
   url: https://web.archive.org/web/20220122033846id_/https://www.teachingenglish.org.uk/sites/teacheng/files/RPD_Publication.pdf
   http: 429 (Internet Archive rate-limited this network on four attempts)
   tier: secondary-source

NOTE: Quotes have accents stripped for transport. RETRIEVAL NOTE: the British Council chapter cited by this entry sits on web.archive.org, which rate-limited this network with HTTP 429 on four attempts spread over ninety minutes. This CONTRADICTS the project note that the Internet Archive is reachable again; on this network today it is not.

EVIDENCE:
 - field: upperSecondary
   quote: "7. LENGUA EXTRANJERA."
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/proceso_de_transformacion_curricular_para_la_educacion_media_general_en_la_modalidad_jovenes_y_adultos.pdf
 - field: upperSecondary
   quote: "Esta area del conocimiento tiene como proposito el estudio de uno o mas idiomas extranjeros como oportunidad de desarrollar habilidades cognoscitivas y comunicacionales que permitan la comprension de codigos linguisticos distintos a la lengua materna"
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/proceso_de_transformacion_curricular_para_la_educacion_media_general_en_la_modalidad_jovenes_y_adultos.pdf
 - field: upperSecondary
   quote: "impulsar la ensenanza y aprendizaje de la lengua materna, idiomas indigenas y las lenguas extranjeras como parte de la formacion integral de las y los estudiantes"
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/proceso_de_transformacion_curricular_para_la_educacion_media_general_en_la_modalidad_jovenes_y_adultos.pdf

DRAFT BULLETS:
 - field: fl.upperSecondary
   bullets:
     - Lengua Extranjera is area of formation 7 of 11 in educacion media general
     - The document read covers the jovenes y adultos MODALITY of media general
     - Stated purpose: study of ONE OR MORE foreign languages, none of them named
     - Mother tongue, indigenous languages and foreign languages form one aim

RETRIEVAL NOTE (Internet Archive):
 The Archive was intermittent during this session, so every archived URL cited above
 was fetched and its body extracted before anything was quoted from it; the http code
 recorded is the one observed on the successful fetch, with byte counts as follows.
 - CLM 52nd Report (minorityaffairs.gov.in via web.archive.org): 200, 2,717,577 bytes,
   9,893 lines of text extracted with pdftotext.
 - Jhingran 2019 (unicef.org/rosa/media/3036 via web.archive.org): 200, 17,662,647 bytes
   on the first attempt, 4,622 lines of text extracted; a later duplicate request to the
   same URL in a parallel batch returned 429 with a 117-byte body. The quoted content
   comes from the successful fetch, not from the 429.
 - UNICEF ROSA country profile (Maldives): first attempt timed out (curl code 000, zero
   bytes); the second attempt returned 200 with 1,313,903 bytes and is the copy read.
 - UNICEF ROSA country profiles (Afghanistan, Bhutan, Nepal, Pakistan, Sri Lanka):
   200 on the first attempt, 694,008 / 3,768,572 / 3,076,761 / 3,593,280 / 3,031,302 bytes.
 No field in this file rests on an unfetched archive URL; nothing here is written as an
 absence on the strength of a failed retrieval.
