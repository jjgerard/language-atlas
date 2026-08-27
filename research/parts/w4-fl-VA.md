### VA|Vatican City
STATUS: not-found (field requested: upperSecondary)

SOURCES:
 - label: "Stato della Città del Vaticano — Governatorato, 'Popolazione' (Note Generali), page dated 3 July 2018, with the site's full navigation of the Governorate's Directions and other bodies"
   url: https://www.vaticanstate.va/it/stato-governo/note-generali/popolazione.html
   http: 200 (text/html, 56,978 bytes)
   tier: official-document
 - label: "Stato della Città del Vaticano — Governatorato, home page (full site navigation)"
   url: https://www.vaticanstate.va/it/
   http: 200 (text/html, 128,684 bytes)
   tier: official-document
 - label: "Holy See — Institutions connected with the Holy See (index)"
   url: https://www.vatican.va/roman_curia/institutions_connected/index.htm
   http: 200 (text/html, 16,006 bytes)
   tier: official-document

EVIDENCE:
 - field: upperSecondary — the population the question would apply to
   quote: "I cittadini dello Stato sono complessivamente 618, dei quali solo 246 (compresi i 104 sono componenti della Guardie Svizzere) abitano all'interno delle mura. Circa la metà dei cittadini quindi non risiede nello Stato, ma in altri Paesi, soprattutto per motivi di servizio (in particolare il personale diplomatico)."
   source: https://www.vaticanstate.va/it/stato-governo/note-generali/popolazione.html
 - field: upperSecondary — SOURCED NEGATIVE, the Governorate has no education body
   quote: "SERVIZI Direzioni — Organismi operativi del Governatorato — Direzione delle Infrastrutture e Servizi — Direzione delle Telecomunicazioni e dei Sistemi Informatici — Direzione dell'Economia — Direzione dei Servizi di Sicurezza e Protezione Civile — Direzione di Sanità e Igiene — Direzione dei Musei e dei Beni Culturali — Direzione delle Ville Pontificie"
   source: https://www.vaticanstate.va/it/stato-governo/note-generali/popolazione.html (site navigation, reproduced identically on the home page)
   [I term-counted the retrieved text of the Governorate's home page AND its Note Generali page. Counts:
   "scuol*" = 0, "istruzion*" = 0, on both. The Governorate lists seven Directions — infrastructure,
   telecoms, economy, security and civil protection, health and hygiene, museums, papal villas — and a set
   of "Altri organismi" (Vatican Museums, Vatican Observatory, Vatican Gardens, Castel Gandolfo, the
   Patrons of the Arts, the Monastero Immacolata Concezione, the Fondazione Fratello Sole). NONE of them
   is an education authority, and no school appears anywhere in the state's own description of itself.]

DRAFT BULLETS:
 - field: upperSecondary
   bullets:
     - Not established from the sources consulted: no Vatican school system was found to describe
     - The Governorate lists seven Directions, none of them for education or schools
     - Its own pages return no occurrence of "scuola" or "istruzione" at all
     - State has 618 citizens, only 246 living inside the walls, 104 of them Swiss Guards

WHAT I SEARCHED, IN FULL (so this negative can be checked):
 - vaticanstate.va home page and Note Generali / Popolazione page, both retrieved and read in full;
   term-counted for "scuol*" and "istruzion*" — zero hits on each page.
 - The Governorate's own list of Directions and auxiliary bodies, as published in that navigation:
   no education directorate, no school, no curriculum authority.
 - vatican.va's index of institutions connected with the Holy See (HTTP 200): this covers pontifical
   academies and Holy See institutions, not schools for resident children.
 - https://www.vaticanstate.va/it/servizi.html: HTTP 404, no such page.
 - web.archive.org was unreachable from this session throughout, so no archived pages could be checked.

WHAT THIS MEANS FOR THE MAP — and what it does NOT mean:
 The honest finding is that Vatican City State does not appear to operate an ordinary school system of its
 own, so there is no upper-secondary stage in which a foreign language could continue, become optional or
 be required. That is a real answer and it should be written as such. What must NOT be done:
 - Do NOT import Italy's rule. Children of Vatican employees are widely said to attend schools in Rome,
   but I found NO official source stating that, and Italy's curriculum is Italy's entry, not this one.
 - Do NOT treat the pontifical universities and athenaea as the Vatican's secondary schools; they are
   higher education institutions, most of them physically outside the walls.
 - Do NOT infer anything from the "100% literacy" figure that circulates in secondary write-ups; I did not
   verify it and it is an artefact of the citizen population being adult clergy and officials.

NOT ESTABLISHED — DO NOT PUBLISH:
 - Any Vatican primaryRequirement or languagesOffered value. The same negative applies to those fields,
   though this task asked only for upperSecondary.
 - Whether any Vatican legal instrument addresses schooling: I did not read the Legge fondamentale or the
   Governorate's "Normativa generale" collection, only the navigation that lists them.
