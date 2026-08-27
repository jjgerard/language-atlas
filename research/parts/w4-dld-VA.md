### VA|Vatican City
STATUS: documented
SOURCES:
 - label: "Direzione di Sanità e Igiene, Stato della Città del Vaticano — 'Poliambulatorio', list of services provided (Elenco delle prestazioni erogate)"
   url: https://dsi.va/assistenza/poliambulatorio
   http: 200
   tier: official-document
 - label: "Direzione di Sanità e Igiene — 'Fruitori' (who is entitled to assistance)"
   url: https://dsi.va/assistenza/fruitori
   http: 200
   tier: official-document
 - label: "Direzione di Sanità e Igiene — 'Funzioni e competenze'"
   url: https://dsi.va/direzione/funzioni-competenze
   http: 200
   tier: official-document
 - label: "Fondo Assistenza Sanitaria (F.A.S.), Stato Città del Vaticano — Carta Servizi, 'Assistenza diretta'"
   url: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-diretta.html
   http: 200
   tier: official-document
 - label: "Fondo Assistenza Sanitaria — Enti convenzionati: 'Logopedia' (list of contracted speech-therapy providers)"
   url: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/enti-convenzionati/logopedia.html
   http: 200
   tier: official-document
 - label: "Fondo Assistenza Sanitaria — Carta Servizi, 'Assistenza indiretta' (reimbursement route)"
   url: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-indiretta.html
   http: 200
   tier: official-document
EVIDENCE:
 - field: serviceModel
   quote: "Elenco delle prestazioni erogate  Angiologia Cardiologia Chirurgia Dermatologia Diabetologia Endocrinologia Gastroenterologia Geriatria Ginecologia Neurologia Oculistica Odontoiatria e igiene dentale Ortopedia Otorino e Audiologia Pediatria Pneumologia Psichiatria Reumatologia Urologia Fisiatria e Fisioterapia Laboratorio Analisi Diagnostica per immagini (ecografia e radiologia)"
   source: https://dsi.va/assistenza/poliambulatorio
   note: THIS IS THE KEY ABSENCE. The Vatican's own polyclinic publishes its full service list; it
     includes paediatrics, ENT/audiology, neurology, physiotherapy — and no logopedia, and no child
     neuropsychiatry. There is no speech-language therapy inside Vatican City State.
 - field: serviceModel
   quote: "Chi può usufruire dell'assistenza I Cardinali, i Patriarchi ed i Vescovi I cittadini vaticani e i residenti nella Città del Vaticano I dipendenti dello Stato e delle altre Amministrazioni della Santa Sede Gli iscritti al Fondo Assistenza Sanitaria (FAS)"
   source: https://dsi.va/assistenza/fruitori
 - field: serviceModel
   quote: "L'assistenza sanitaria in forma diretta viene erogata dalla Direzione di Sanità ed Igiene, secondo i parametri e le modalità stabilite in accordo con la Direzione del F.A.S.: dalla DSI per tutte le prestazioni effettuabili presso il proprio poliambulatorio; da medici, centri, cliniche e ospedali convenzionati con il F.A.S in tutti gli altri casi."
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-diretta.html
 - field: serviceModel
   quote: "Ogni prestazione deve essere preventivamente autorizzata presso l'ambulatorio di Medicina Interna, dai medici della Guardia medica della D.S.I o dai medici di medicina generale convenzionati con il Fondo."
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-diretta.html
 - field: serviceModel
   quote: "La logopedia (logos \"discorso\" e paideia \"educazione\") è una disciplina che studia le patologie e i disturbi cognitivi legati alla voce, il linguaggio, ecc."
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/enti-convenzionati/logopedia.html
 - field: serviceModel
   quote: "Logopedia  Centro Don Orione Via della Camilluccia, 112/120"
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/enti-convenzionati/logopedia.html
   note: the contracted-provider page names six logopedia providers (one institute, one centre and
     four individual practitioners). Every listed address is in Rome, outside Vatican territory.
     Practitioner names and phone numbers are not reproduced here.
 - field: serviceModel
   quote: "Neuropsicomotricità età evolutiva"
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-diretta.html
   note: a separate contracted-provider category for developmental neuropsychomotor therapy, sitting
     alongside Fisioterapia and Logopedia in the FAS Carta Servizi navigation
 - field: serviceModel
   quote: "L'assistenza sanitaria indiretta consente agli assistiti di rivolgersi a medici, centri, case di cura e ospedali non convenzionati con il F.A.S. dietro prescrizione di un medico convenzionato"
   source: https://www.fas.va/content/fas/it/servizi-procedure/carta-servizi/assistenza-indiretta.html
   note: the fallback route — the family pays and claims back within the Fund's tariff
DRAFT BULLETS:
 - field: serviceModel
   bullets:
     - Covers clergy, Vatican citizens and residents, and Holy See staff insured by the FAS fund
     - The DSI polyclinic's own service list has paediatrics and ENT but no logopedia
     - Therapy is bought in: FAS contracts named logopedia providers, all at Rome addresses
     - Each episode needs prior authorisation from a DSI or FAS-contracted doctor
     - FAS also contracts "neuropsicomotricita eta evolutiva" for developmental therapy
