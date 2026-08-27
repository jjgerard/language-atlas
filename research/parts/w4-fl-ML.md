### ML|Mali
STATUS: not-found (field requested: upperSecondary)

FRAMING, so the negative is understood correctly: French is Mali's language of schooling, not a foreign
language, and must not be recorded as one on this map. The question for Mali's upperSecondary field is
therefore what happens to ENGLISH, ARABIC or any other additional language in the three lycée years. I
could not answer it from any source I retrieved and read.

SOURCES ACTUALLY RETRIEVED AND READ:
 - label: "Ecoles au Mali, 'Enseignement secondaire' (private schools directory, page dated 11-15 October 2024)"
   url: https://ecoles-mali.com/systeme-educatif.php?id=3-enseignement-secondaire
   http: 200 (text/html, 33,273 bytes)
   tier: secondary-source (a commercial school directory, NOT a ministry publication)
 - label: "«PROGRAMMES DE L'ENSEIGNEMENT SECONDAIRE GENERAL TOUTES DISCIPLINES, SECOND CYCLE» — retrieved and read, and it is NOT a Malian document. See the warning below."
   url: https://ambniger-mali.org/images/NOUVEAUX_PROGRAMMES_DENSEIGNEMENT_SECOND_CYCLE.pdf
   http: 200 (application/pdf, 6,633,278 bytes, 421 pp.)
   tier: official-document — OF NIGER, NOT MALI

** A TRAP TO RECORD, BECAUSE IT WILL CATCH THE NEXT PERSON **
 Search engines return the PDF above for Mali queries, because it is hosted on ambniger-mali.org, and at
 least one search summary I was given asserted in terms that it is "an official PDF document from the Mali
 government" covering Malian lycée languages. It is not. I opened it and read its title page. It reads:
   "PROGRAMMES DE L'ENSEIGNEMENT SECONDAIRE GENERAL TOUTES DISCIPLINES SECOND CYCLE / REPUBLIQUE DU NIGER /
    Fraternité – Travail – Progrès / MINISTERE DES ENSEIGNEMENTS SECONDAIRES / SECRETARIAT GENERAL /
    DIRECTION GENERALE DES ENSEIGNEMENTS / DIRECTION DE L'ENSEIGNEMENT SECONDAIRE GENERAL"
 The host is the Niger embassy in Mali. Its contents (PROGRAMMES D'ANGLAIS, PROGRAMMES D'ARABE, PROGRAMMES
 DE FRANÇAIS, and so on; term counts across all 421 pages: anglais 12, arabe 2, allemand 0, espagnol 0)
 describe NIGER's second-cycle secondary programmes. DO NOT use this file for Mali under any circumstances.

WHAT I ACTUALLY ESTABLISHED ABOUT MALI, WHICH IS ONLY STRUCTURE:
 - field: upperSecondary — the shape of the stage, from a non-official source
   quote: "Le DEF ( Diplôme d'Etudes Fondamentales ) est le diplôme qui donne accès à l'enseignement secondaire. … Pour les enseignements secondaires général et technique , le parcours a une durée de 3 ans et est sanctionné par le diplôme du Baccalauréat qui ouvre l'accès à l'enseignement supérieur. L'enseignement professionnel quant à lui offre un cycle court de 2 ans sanctionné par le CAP ( Certificat d'Aptitude Professionnelle ) et un cycle long de 4 ans sanctionné par le diplôme du Brevet de Technicien ( BT )."
   source: https://ecoles-mali.com/systeme-educatif.php?id=3-enseignement-secondaire
   [This is a school directory, not a ministry. It establishes only that general and technical secondary
   lasts three years and ends in the Baccalauréat. It says NOTHING about languages — I read the page and
   no language subject is named anywhere on it.]

DRAFT BULLETS:
 - field: upperSecondary
   bullets:
     - Not established from the sources consulted: no Malian curriculum document could be retrieved
     - French is Mali's school language, so it should not be recorded as a foreign language here
     - General and technical secondary lasts three years and ends in the Baccalauréat
     - Beware: the widely-returned "Mali" secondary programmes PDF is in fact Niger's

WHAT I SEARCHED, IN FULL (so this negative can be checked and picked up by the next agent):
 - www.education.gouv.ml: would not connect at all (curl error 28, connection timeout after 21s).
 - www.men.gouv.ml: DNS failure, host does not resolve (curl error 6).
 - www.ifadem.org/fr/pays/mali/systeme-educatif: TLS failure, SEC_E_CERT_EXPIRED — the site's certificate
   has expired, so the OIF/AUF country page could not be read.
 - ambniger-mali.org PDF: retrieved, read, and identified as Niger's — see the warning above.
 - ecoles-mali.com: retrieved and read; structure only, no languages.
 - web.archive.org: unreachable from this session throughout (connection timeouts), so no archived copy of
   the Malian ministry site could be tried.
 A better-placed agent should try: the Centre National de l'Éducation (CNE) and the Direction Nationale
 de l'Enseignement Secondaire Général; the Malian arrêté fixing the horaires and coefficients for the
 Baccalauréat séries; and the Journal officiel de la République du Mali.

NOT ESTABLISHED — DO NOT PUBLISH:
 - Whether English is compulsory in Mali's lycée, in which séries, and with what coefficient.
 - Whether Arabic, German, Spanish or Russian appear as lycée options. Do NOT import Niger's list, and do
   NOT infer Mali's from Senegal's, Burkina Faso's or France's.
 - Any hours or coefficients.
 - The date of Mali's current secondary programmes.
