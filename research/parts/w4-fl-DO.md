### DO|Dominican Republic
STATUS: partial (field requested: primaryRequirement). First cycle of primary is DOCUMENTED as a sourced
negative; the second cycle of primary is NOT established.

RELATION TO THE EXISTING ENTRY: an earlier report for this unit (reports/parts/carib-DO-fl.md) documented
the Nivel Secundario, Modalidad Académica, Segundo Ciclo (2018) and explicitly listed primaryRequirement
as NOT established, because MINERD's host returned HTTP 522 for the primary curriculum. This report closes
half of that gap. It does not contradict anything in that report.

SOURCES:
 - label: "MINERD (Viceministerio de Servicios Técnicos y Pedagógicos, Proceso de Revisión y Actualización Curricular), Diseño Curricular Nivel Primario, Primer Ciclo (1ro., 2do. y 3ro.), Versión Preliminar, Santo Domingo D.N., 2013, 428 pp. Copy served by the Biblioteca of INTEC (Instituto Tecnológico de Santo Domingo) in its electronic-resources collection"
   url: https://opacbiblioteca.intec.edu.do/opac-tmpl/files/recursoselectronicos/MINERD-DisenoCurricularNivelPrimarioPrimerCiclo.pdf
   http: 200 (application/pdf, 2,710,197 bytes, 428 pp.)
   tier: official-document (MINERD authorship; served by a university library, since MINERD's own host is down)
   [MINERD's own host remained unusable in this session, exactly as the earlier report found:
   https://www.ministeriodeeducacion.gob.do/ returned 522, as did its /docs/direccion-general-de-curriculo/
   primary-curriculum PDFs; /transparencia returned 500. educando.edu.do failed TLS with SEC_E_WRONG_PRINCIPAL
   (wrong principal name on the certificate) and its bare host redirects to an empty page.
   web.archive.org was unreachable from this session throughout.]

EVIDENCE:
 - field: primaryRequirement — THE SOURCED NEGATIVE, from the table of contents of Part 2
   quote: "1. PRIMER GRADO............ 123 / Lengua Española.......... 125 / Matemática.......... 169 / Ciencias Sociales.......... 187 / Ciencias de la Naturaleza.......... 193 / Educación Artística.......... 199 / Educación Física.......... 205 / Formación Integral, Humana y Religiosa.......... 209 / 2. SEGUNDO GRADO.......... 217 / Lengua Española.......... 219 / Matemática.......... 261 / Ciencias Sociales.......... 283 / Ciencias de la Naturaleza.......... 289 / Educación Artística.......... 295 / Educación Física.......... 301 / Formación Integral, Humana y Religiosa.......... 305 / 3. TERCER GRADO.........."
   source: https://opacbiblioteca.intec.edu.do/opac-tmpl/files/recursoselectronicos/MINERD-DisenoCurricularNivelPrimarioPrimerCiclo.pdf
   [Each of the three grades carries the SAME SEVEN areas, and Lenguas Extranjeras is not one of them.
   Term counts over the whole 428-page document confirm it: "Lenguas Extranjeras" = 2, "Inglés" = 1,
   "Francés" = 0. I checked all three. Both "Lenguas Extranjeras" hits are in the credits pages — the area
   coordinator, Jeanne Bogaert, and her team, listed among the ministry's curricular-area staff. The single
   "Inglés" hit is in a Grade 3 Mathematics indicator about measurement: "Mide y estima longitudes
   utilizando unidades del sistema métrico decimal y del sistema inglés de medidas." No foreign language
   is taught in Grades 1, 2 or 3 under this design.]
 - field: primaryRequirement — the credits entry, so the negative is not mistaken for an oversight
   quote: "Área de Lenguas Extranjeras / Jeanne Bogaert, Coordinadora / Federica Castro, Consultora / María Cantisano, Consultora / Josiane Garelli, Asesora / Sabino Morla, Consultor / Claude Cazeaux, Consultor / Antonia Albert, Técnico Docente Nacional / Santa Yocasta Cabrera, Técnico Docente Nacional / Nathalie Da Fonseca, Técnico Docente Nacional / Rober Jander Matos, Técnico Docente Nacional"
   source: same
   [MINERD had a standing Foreign Languages area team, with French-speaking advisers, at the time this
   design was written. Its absence from the Primer Ciclo grade tables is therefore a decision about that
   cycle, not an editorial gap.]
 - field: primaryRequirement — how time is handled at this cycle, which matters for how any language would fit
   quote: "Distribución del tiempo / En consonancia con las estrategias de articulación antes descritas, la distribución del tiempo entre las distintas áreas de conocimiento debe ser flexible, dado que es necesario adaptarla a las necesidades de cada grado, nivel y centro educativo."
   source: same (section 6.4)
   [Unlike the secondary design, which sets a weekly hours table, the primary first cycle sets NO hours
   table at all. Do not publish primary hours for the Dominican Republic.]
 - field: primaryRequirement — the document's own status
   quote: "VICEMINISTERIO DE SERVICIOS TéCNICOS y PEDagógICOS / PROCESO DE REVISIóN y aCTUaLIZaCIóN CURRICULaR / Diseño Curricular Nivel Primario / Santo Domingo, D.N., 2013 / Primer Ciclo (1ro., 2do. y 3ro.) / Versión Preliminar"
   source: same (title page; the mixed capitals are an artefact of the PDF's embedded fonts)

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - Evidence covers the first cycle only, grades 1-3; the second cycle could not be retrieved
     - Diseño Curricular Nivel Primario, Primer Ciclo 2013 lists seven areas and no foreign language
     - Same seven areas in each of grades 1, 2 and 3, with Lenguas Extranjeras absent from all
     - MINERD had a standing Foreign Languages area team, so the absence is a choice, not an omission

POLICY HISTORY ROWS:
 - year: 2013
   description: MINERD issues the preliminary Diseño Curricular for the first cycle of primary, with no foreign-language area in grades 1-3

NOT ESTABLISHED — DO NOT PUBLISH:
 - The second cycle of primary, grades 4-6. This is where English is widely said to begin in the Dominican
   Republic, and I could NOT retrieve the document. What failed:
     · https://www.ministeriodeeducacion.gob.do/docs/direccion-general-de-curriculo/gZol-diseno-curricular-del-nivel-primario-segundo-ciclopdf.pdf
       and the RtcE-... variants: MINERD host returns 522 for everything.
     · https://opacbiblioteca.intec.edu.do/.../MINERD-DisenoCurricularNivelPrimarioSegundoCiclo.pdf: 404 —
       INTEC's library holds the first-cycle file but not the second.
     · educando.edu.do: TLS failure, SEC_E_WRONG_PRINCIPAL, on every path tried.
   Until that document is read, the atlas should say that grades 1-3 have no foreign language and that the
   start grade is not established — NOT that English begins in grade 4.
 - Whether a later "Adecuación Curricular" (there are references to 2023 and 2025 adecuaciones on
   educando.edu.do, none of which I could open) has changed the first cycle. The finding above is for the
   2013 preliminary design. Say so if it is published.
 - Any primary hours figure. The first-cycle design deliberately declines to set one.
