### SN|Senegal
STATUS: partial

SOURCES:
 - label: "Agence de Presse Senegalaise, 'Plaidoyer pour la creation d'une ecole de formation en orthophonie', 24 October 2021, republished in APIDPM Sante tropicale's Senegal press review"
   url: https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal
   http: 200 text/html, 39,445 bytes (3,494 chars of page text after tag stripping)
   tier: secondary-source
   note: a national news-agency report quoting one practitioner, republished by a press-review site.

WHAT THIS DOES NOT COVER:
 The two eal fields listed for Senegal, l2Support and newcomerCriteria, are not addressed by this source at all: it is a health-workforce story and says nothing about schooling. The earlier PEER pass already recorded that French is the medium of instruction in Senegal and that the profile names no newcomer or additional-language provision; nothing here disturbs that, and nothing here adds to it.

NOT RETRIEVED:
 Senegal's entry also cites an Internet Archive capture of the FOAF country page, http://web.archive.org/web/20200123224704id_/http://foafafrique.org/senegal/. It returned http 200 once but the body was not captured before two further attempts returned http 503 (11,832-byte Archive error page). Nothing is quoted from it and no absence is claimed for it: this is a retrieval failure, not a finding. The third cited link, the IERC Senegal language-of-instruction paper, was not needed for dld.terminology and was not fetched.

NOT ADDRESSED BY WHAT WAS RETRIEVED:
 eal.l2Support and eal.newcomerCriteria are left empty for Senegal on this pass.

EVIDENCE:
 - field: dld.terminology
   quotes:
     - "le pays ne compte qu'une dizaine d'orthophonistes, si on prend en compte les étrangers séjournant temporairement dans notre pays"  [https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal]
     - "Alioune Guèye qui travaille sur les troubles de la voix, de la parole et du langage"  [https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal]
     - "Le président de l’Association pour la prise en charge du bégaiement (APBS), Ibrahima Diarra, rappelle que cette structure créée en 2015"  [https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal]
     - "La création d’une école publique d’orthophonie constitue une urgence au Sénégal, qui ne compte que 10 spécialistes de ce trouble de la parole dont seuls cinq sont des Sénégalais"  [https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal]
   sources: https://www.santetropicale.com/sites_pays/actus.asp?id=30784&action=lire&rep=senegal

DRAFT BULLETS:
 - field: dld.terminology
   bullets:
     - Source is a 2021 news-agency report quoting one practitioner, not a ministry text
     - The professional term is 'orthophonie', the practitioner an 'orthophoniste'
     - The clinical scope is given as 'les troubles de la voix, de la parole et du langage'
     - A stammering association, APBS, has existed since 2015 and is named separately
 - field: policyHistory
   rows:
     - {year: 2015, description: "Association pour la prise en charge du begaiement (APBS) founded in Senegal"}
     - {year: 2021, description: "Public call on 24 October for a state orthophonie training school, the country having about ten practitioners"}

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
