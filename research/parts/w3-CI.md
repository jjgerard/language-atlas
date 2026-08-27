### CI|Ivory Coast
STATUS: documented

SOURCES:
 - label: "Kumassi, A., 'INFAS : Le cycle de formation en orthophonie ouvert', Fraternite Matin, 10 June 2021, republished in APIDPM Sante tropicale's press review"
   url: https://www.santetropicale.com/actus.asp?action=lire&id=30098
   http: 200 text/html, 43,309 bytes (5,250 chars of page text after tag stripping)
   tier: secondary-source
   note: a newspaper report of a ministry-backed press conference, republished by a medical press-review site.
 - label: "Federation des Orthophonistes d'Afrique Francophone (FOAF), country page 'Cote d'ivoire', archived copy of 25 December 2019"
   url: http://web.archive.org/web/20191225151104id_/http://foafafrique.org/cote-divoire/
   http: 200 text/html, 65,462 bytes on the first attempt; a second attempt 30 seconds later failed with a 21-second connection timeout (curl exit 28). The Internet Archive is intermittent from this network, so the 200 is recorded with that caveat.
   tier: secondary-source
   note: a professional federation's own country page, captured in 2019; 61,307 chars of page text after tag stripping.

EVIDENCE:
 - field: dld.terminology
   quotes:
     - "l’orthophoniste est celui qui a la charge de prévenir, dépister, d’évaluer et de prendre en charge l’ensemble des troubles de la communication, du langage et de la déglutition"  [https://www.santetropicale.com/actus.asp?action=lire&id=30098]
     - "la réhabilitation de la voix d’un enseignant dysphonique et assurer le devenir professionnel d’un jeune adolescent dyslexique"  [https://www.santetropicale.com/actus.asp?action=lire&id=30098]
   sources: https://www.santetropicale.com/actus.asp?action=lire&id=30098
 - field: dld.serviceModel
   quotes:
     - "La Côte d’Ivoire ne compte que dix orthophonistes (huit étrangers et deux Ivoiriens) exerçant dans le privé. Les structures de santé publiques n’en disposent pas en leur sein."  [https://www.santetropicale.com/actus.asp?action=lire&id=30098]
     - "l’Infas qui est toujours en avant-garde dans la formation des ressources humaines paramédicales, a monté un projet pilote de formation des orthophonistes avec l’Université Alassane Ouattara"  [https://www.santetropicale.com/actus.asp?action=lire&id=30098]
     - "Ce nouveau cycle de formation de trois (3) ans sera ouvert aux titulaires du Baccalauréat de l’enseignement secondaire (C, D, E, F) et sera accompagné d’une Licence professionnelle en orthophonie."  [https://www.santetropicale.com/actus.asp?action=lire&id=30098]
     - "Association Pour l’Orthophonie en Côte d’Ivoire (APOCI) La première association d’orthophonistes en Côte d’Ivoire a vu le jour le 16 novembre 2015."  [http://web.archive.org/web/20191225151104id_/http://foafafrique.org/cote-divoire/]
     - "APOCI a pour objectifs de : Promouvoir la profession d’orthophonie : être le porte-parole officiel dans les domaines de la prise en charge et de la rééducation orthophonique sur le plan national et international"  [http://web.archive.org/web/20191225151104id_/http://foafafrique.org/cote-divoire/]
   sources: http://web.archive.org/web/20191225151104id_/http://foafafrique.org/cote-divoire/, https://www.santetropicale.com/actus.asp?action=lire&id=30098

DRAFT BULLETS:
 - field: dld.terminology
   bullets:
     - Terms are a newspaper's report of a ministry-backed launch, not a statute
     - The scope is 'les troubles de la communication, du langage et de la deglutition'
     - Named conditions include dysphonie and dyslexie, not a developmental language disorder label
     - The practitioner is an 'orthophoniste' and the field 'orthophonie'
 - field: dld.serviceModel
   bullets:
     - Figures are those given at a June 2021 press conference, not a register
     - Ten orthophonistes in the country, eight foreign and two Ivorian, all in private practice
     - Public health facilities were said to have none on their staff
     - APOCI, the first Ivorian orthophonistes' association, was founded on 16 November 2015
 - field: policyHistory
   rows:
     - {year: 2015, description: "Association Pour l'Orthophonie en Cote d'Ivoire (APOCI) founded on 16 November, the first such association in the country"}
     - {year: 2021, description: "INFAS opens a three-year orthophonie training course with Universite Alassane Ouattara, announced 8 June"}

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
