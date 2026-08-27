### CA|Quebec - map dld, field serviceModel
STATUS: documented

SOURCES:
 - label: "MELS (Quebec), L'organisation des services educatifs aux eleves a risque et aux eleves handicapes ou en difficulte d'adaptation ou d'apprentissage (2007), code de difficulte 34 - deficience langagiere"
   url: https://cdn-contenu.quebec.ca/cdn-contenu/education/soutien-eleves/Organisation-services-educatifs-eleves-hdaa.pdf
   http: 200
   tier: official-document

NOTE: Quotes are from the French original with accents stripped in this report for transport safety; the PDF text carries full accents. Note also that Quebec does not subscribe to the CMEC official-languages Protocol, per that Protocol's own footnote 2.

EVIDENCE:
 - field: serviceModel
   quote: "pour qui une evaluation a ete realisee par un orthophoniste faisant partie d'une equipe multidisciplinaire, a l'aide de techniques d'observations systematiques et de tests appropries"
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/soutien-eleves/Organisation-services-educatifs-eleves-hdaa.pdf
 - field: serviceModel
   quote: "un suivi orthophonique regulier d'une duree minimale de six mois ayant precede l'evaluation diagnostique"
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/soutien-eleves/Organisation-services-educatifs-eleves-hdaa.pdf
 - field: serviceModel
   quote: "la persistance des troubles severes au-dela de l'age de 5 ans"
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/soutien-eleves/Organisation-services-educatifs-eleves-hdaa.pdf
 - field: serviceModel
   quote: "Mesures d'appui : soutien regulier"
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/soutien-eleves/Organisation-services-educatifs-eleves-hdaa.pdf

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Quebec's funding code 34 is 'deficience langagiere', a handicap code, not a related service
     - Evaluation must be by an orthophoniste working within a multidisciplinary team
     - Six months of regular orthophonie follow-up must PRECEDE the diagnostic evaluation
     - Difficulties must persist beyond age 5; the support measure is 'soutien regulier'

POLICY HISTORY:
 - {year: 2007, description: MELS Quebec organisation of educational services for students with handicaps or difficulties, defining code 34 deficience langagiere}
