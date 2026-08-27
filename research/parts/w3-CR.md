### CR|Costa Rica - map dld, field serviceModel
STATUS: not-found (cited URL dead; three substitute hosts also tested and refused)

SOURCES:
 - label: "Ley 7600 de Igualdad de Oportunidades para las Personas con Discapacidad (1996), arts. 14-22 - the URL cited by this entry"
   url: https://www.oas.org/juridico/spanish/mesicic2_cri_ley_7600.pdf
   http: 200 but REDIRECTED to http://www.oas.org/wearesorry.htm - the PDF is gone
   tier: official-document
 - label: "SCIJ / Sinalevi (Procuraduria General de la Republica) record for the same law - substitute tested"
   url: https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?nValor1=1&nValor2=23261
   http: 200 but redirects to sinalevi.go.cr and serves a JavaScript shell with no statute text
   tier: official-document
 - label: "Ministerio de Educacion Publica copy - substitute tested"
   url: https://www.mep.go.cr/sites/default/files/page/adjuntos/ley-7600.pdf
   http: 403
   tier: official-document

NOTE: RETRIEVAL LOG for Costa Rica, all in this session: oas.org/juridico/... -> 200 at http://www.oas.org/wearesorry.htm (46,635 bytes of HTML, not a PDF); faolex.fao.org/docs/pdf/cos52034.pdf -> 404; www.mep.go.cr/.../ley-7600.pdf -> 403; cnree.go.cr -> DNS failure; www.cne.go.cr/rec_dis/Ley 7600.pdf -> 403. Reported as an honest not-found rather than padded.

EVIDENCE:
 - field: serviceModel
   quote: "(no quotation available - no retrieval of the statute text succeeded in this session)"
   source: n/a

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Not filled: the cited OAS PDF now redirects to an OAS error page
     - SCIJ, the official Costa Rican statute site, serves a JavaScript shell
     - The MEP mirror 403s and cnree.go.cr does not resolve at all
     - This entry needs a new source for Ley 7600 before serviceModel can be written
