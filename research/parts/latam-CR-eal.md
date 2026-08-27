### CR|Costa Rica — eal (Majority language acquisition)
STATUS: partial

TERMINOLOGY NOTE: the school language is SPANISH, so this unit is about arriving at school without
Spanish. Do NOT write "EAL". Costa Rica's own frame is the *Subsistema de Educación Indígena* and
*enseñanza bilingüe*; the Constitution's phrase for the target language is "el español como idioma
oficial de la Nación".

RETRIEVAL NEGATIVE — IMPORTANT FOR ANY FUTURE COSTA RICA PASS:
 The whole mep.go.cr estate is behind a WAF that refuses curl outright. `https://www.mep.go.cr/educacion-especial`,
 `https://www.mep.go.cr/noticias/...`, `https://recursos.mep.go.cr/2023/poblacion_extranjera/` and
 `https://www.mep.go.cr/sites/default/files/media/lengua_boruca_1y2ciclos.pdf` ALL returned HTTP 403,
 with a browser user-agent AND with a plain no-UA request, and WebFetch on the same URL also
 returned 403. `https://presidencia.administracionsolisrivera.cr/...` likewise 403s.
 `https://unesdoc.unesco.org/ark:/48223/pf0000374676` returns a Cloudflare "Just a moment..."
 interstitial. THE WORKAROUND THAT DID WORK: SITEAL mirrors Costa Rican decrees in its own file
 store at `https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/<id>.pdf`, which
 serves normally. This is the practical payoff of the SITEAL leverage test for Costa Rica.

SOURCES:
 - label: "Costa Rica, Decreto Ejecutivo N° 37801-MEP, 'Reforma del Subsistema de Educación Indígena' (2013), full text"
   url: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/1113.pdf
   http: 200 (141,643 bytes; PDF; first line of extracted text reads "N° 37801-MEP")
   tier: official-document (decree text, mirrored by SITEAL/IIPE-UNESCO)

EVIDENCE:
 - field: bilingualEducationNotes
   quote: "Que el artículo 76 de la Constitución Política establece que 'El español es el idioma oficial de la Nación. No obstante, el Estado velará por el mantenimiento y cultivo de las lenguas indígenas nacionales'"
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/1113.pdf
 - field: l1Support
   quote: "Artículo 3º—Idiomas maternos vigentes. Se reconocen como idiomas maternos vigentes en los territorios indígenas reconocidos sin perjuicio de que otros puedan ser también incorporados en planes y programas del Ministerio de Educación Pública, el Cabécar, el Bribri, el Ngöbe, el Buglé y el Maleku. En proceso de revitalización el Teribe y el Boruca."
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/1113.pdf
   note: FIVE languages are "vigentes" and TWO ("Teribe", "Boruca") are classed as in revitalisation —
     a distinction the decree itself draws, and worth preserving rather than flattening to "seven".
 - field: l1Support / l2Support / bilingualEducationNotes
   quote: "Artículo 4º—Aprendizaje de la lectura y la escritura en el idioma materno y desarrollo progresivo de la enseñanza bilingüe. Donde sea posible, los niños y niñas de los territorios indígenas tienen derecho a aprender a leer y escribir en su idioma materno, a que se les garantice que lleguen a dominar el español como idioma oficial de la Nación y a que progresivamente se desarrollen programas educativos bilingües, pertinentes y contextualizados en todas las asignaturas, modalidades y niveles del sistema educativo."
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/1113.pdf
   note: THE CENTRAL CLAUSE, AND ITS QUALIFIERS MATTER. Mother-tongue literacy is a right only
     "donde sea posible" [where possible]; bilingual programmes are to develop "progresivamente"
     [progressively]; the ONLY unqualified guarantee in the sentence is that pupils reach mastery
     of SPANISH. The Spanish-acquisition duty is stronger than the mother-tongue-literacy duty.
     The right also attaches to residence in a recognised indigenous territory, not to the child.
 - field: l2Support
   quote: "En el nombramiento de los maestros de lengua se privilegiará la contratación de los docentes de lengua indígena que tengan mejores atestados académicos y que manejen el idioma español como segunda lengua."
   source: https://siteal.iiep.unesco.org/sites/default/files/sit_accion_files/1113.pdf
   note: Note the direction of travel — the decree envisages the LANGUAGE TEACHER as someone for whom
     SPANISH is the second language.
 - field: newcomerCriteria
   note: NOT FOUND, and the absence looks real rather than merely unretrieved. Term counts on the
     retrieved decree: "lengua materna" = 0 (the decree says "idioma materno"), "castellano" = 0,
     "segunda lengua" = 1 (the teacher-appointment clause above), "bilingüe" = 2, "español" = 4.
     There is NO arrival-based or newcomer designation in this instrument, which is territorial and
     indigenous in scope. Costa Rica's large foreign-origin school population (predominantly
     Nicaraguan, and therefore predominantly Spanish-speaking) is handled by a Departamento de
     Educación Intercultural whose materials sit on recursos.mep.go.cr — which 403s to every
     retrieval method tried. I could not verify anything about it and am reporting that plainly
     rather than describing it.
 - field: newcomerProportion / removalCriteria / achievementGap / l3Support
   note: NOT FOUND this session. No designated cohort exists in the retrieved instrument, so there is
     no proportion and no exit rule; no language-disaggregated attainment data was retrieved.

DRAFT BULLETS:
 - field: newcomerCriteria
   bullets:
     - No newcomer or Spanish-as-additional-language designation was found
     - The operative frame is territorial: rights attach to recognised indigenous territories
     - Migrant provision sits with MEP's Departamento de Educacion Intercultural, unverifiable here
 - field: l1Support
   bullets:
     - Right to learn to read and write in the mother tongue is qualified "donde sea posible"
     - Decreto 37801-MEP Art. 3 recognises Cabecar, Bribri, Ngobe, Bugle and Maleku as current
     - Teribe and Boruca are classed as in revitalisation, not current
     - Language teachers are appointed on indigenous-language credentials
 - field: l2Support
   bullets:
     - Spanish mastery is the one unqualified guarantee in Art. 4
     - The decree treats Spanish as the language teacher's second language
     - No separate Spanish-as-a-second-language programme is named
 - field: bilingualEducationNotes
   bullets:
     - Constitution Art. 76 makes Spanish official but obliges the state to maintain indigenous languages
     - Bilingual programmes are to be developed "progresivamente" across all subjects and levels
     - The 2013 decree replaced a 1993 subsystem judged to lack structure and participation
 - field: policyHistory
   rows:
     - {year: 1977, description: "Ley Indigena 6172 establishes the recognised indigenous territories"}
     - {year: 1992, description: "Ley 7316 ratifies ILO Convention 169 on Indigenous and Tribal Peoples"}
     - {year: 1993, description: "Decreto 22072-MEP creates the Subsistema de Educacion Indigena"}
     - {year: 1994, description: "Ley 7426 Dia de las Culturas obliges MEP to teach all cultural and ethnic components"}
     - {year: 2013, description: "Decreto 37801-MEP replaces the 1993 subsystem, sets mother-tongue literacy and bilingual duties"}
