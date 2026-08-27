### CG|Congo
STATUS: documented

SOURCES:
 - label: "Gascoin, A., Topouzkhanian, S. & Ate, K., 'L'orthophonie en Afrique francophone sub-saharienne: emergence, defis et enjeux', poster, European CPLOL Congress, Florence, 8-9 May 2015; Orthophonistes du Monde"
   url: https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf
   http: 200 application/pdf, 2,872,115 bytes
   tier: secondary-source
   note: a conference poster, bilingual French and English, 7,426 chars of extractable text. Its 'Effectifs et repartition des orthophonistes / Census of speech-language pathologists' panel is a map image, so no per-country headcount can be read out of it.

WHAT THIS SOURCE CANNOT SUPPORT:
 The poster gives no Congolese institution, no post count and no ministry decision. It supports only the existence of a national association and the training route through Togo.

NOT RETRIEVED:
 Congo's other cited link is an Internet Archive capture of the FOAF country page, http://web.archive.org/web/20191212223623id_/http://foafafrique.org/republique-democratique-du-congo/. The first attempt returned http 503 (an 11,832-byte Archive error page) and the second failed with a 21-second connection timeout (curl exit 28). Nothing is quoted from it and no absence is claimed for it: this is a retrieval failure, not a finding. Note also that the URL slug reads 'republique-democratique-du-congo', which is the DRC, while this unit is CG (Congo-Brazzaville); that discrepancy should be checked before the link is relied on.

SISTER-PAGE NOTE:
 The equivalent FOAF page for Cote d'Ivoire did return http 200 on one attempt this session, so the pages themselves exist in the Archive; the Congo capture simply did not serve.

EVIDENCE:
 - field: dld.serviceModel
   quotes:
     - "A ce jour, il existe 5 associations nationales de professionnels (Togo, Burkina-Faso, Bénin, Mali et Congo-Brazaville)"  [https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf]
     - "SLPs have been actively lobbying the ministries in order to create an official status for their profession and to allow the creation of jobs within public health institutions."  [https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf]
     - "Depuis 2006, 66 professionnels, issus de 9 pays d'Afrique de l'Ouest et du Centre ont été formés au Togo et exercent depuis dans différents pays de la sous-région"  [https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf]
     - "Speech-Language Pathology remains unknown for most of the African population."  [https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf]
   sources: https://orthophonistesdumonde.fr/IMG/pdf/poster_cplol_180415-2.pdf

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Source is a 2015 conference poster by an NGO; it describes a sub-region, not a Congolese service
     - Congo-Brazzaville is one of five countries with a national professional association
     - Its practitioners come from the ENAM Lome cohort, working across the sub-region
     - The poster's census panel is a map image, so no Congolese headcount can be read from it
 - field: policyHistory
   rows:
     - {year: 2006, description: "Congolese orthophonistes begin qualifying through the ENAM Lome programme in Togo"}

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
