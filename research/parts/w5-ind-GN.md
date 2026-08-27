### GN|Guinea
STATUS: documented
SOURCES:
 - label: "République de Guinée, Secteur de l'Education et de la Formation, Programme Décennal de l'Education en Guinée, ProDEG 2020-2029 (Guinea's education sector plan, GPE library copy)"
   url: https://www.globalpartnership.org/node/document/download?file=document%2Ffile%2F2020-Guinea-ESP.pdf
   http: 200 (application/pdf, 2502954 bytes)
   tier: official-document
 - label: "UNESCO Global Education Monitoring Report, Profiles Enhancing Education Reviews (PEER), Guinea, Inclusion"
   url: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
   http: 200
   tier: secondary-source
 - label: "Jacques Leclerc, L'aménagement linguistique dans le monde, 'Guinée-Conakry française', sections on the 1968 reform and on education"
   url: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
   http: 200
   tier: secondary-source
NEGATIVE RESULTS ON SOURCING (tested this session):
 - https://cnt.gov.gn/orientation-linguistique/ — HTTP 403 to curl; fetched by a second route it returns only a site-maintenance placeholder, no content. Reports of a Conseil National de la Transition bill on the promotion of national languages could NOT be verified and are excluded.
 - https://mepua.gov.gn/file/2023/10/Document_ProDEG_Version-09_Octobre-2019-apres-le-CIP1C.pdf — HTTP 403. The same ProDEG was obtained from the GPE library instead.
 - The text of Loi n° L/97/022/AN du 19 juin 1997 portant orientation de l'éducation nationale and of décret n° 97/196/PRG/SGG du 21 août 1997 was NOT retrieved. Leclerc records the same failure — see the quote below — so no claim about the content of those instruments is made here.

EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "2.7.1 Pourcentage d'écoles primaires utilisant l'enseignement bilingue (français + langue nationale) ... 0,1% 1,0% 1,8% 2,6% 3,4% 4,3% 5,1% 5,9% ... 8,4% 9,2% 10%"
   source: https://www.globalpartnership.org/node/document/download?file=document%2Ffile%2F2020-Guinea-ESP.pdf
   note: indicator table of the ProDEG's Sous-programme 2.7 "Promotion des langues nationales", running from a baseline of 0.1% of primary schools to a 10% target
 - field: indigenous.mediumOfInstruction
   quote: "La promotion des langues nationales constitue un volet important non seulement du programme prioritaire sur la qualité mais aussi du ProDEG dans son ensemble. Il s'agit d'une réforme d'envergure dont l'objectif ultime est de s'appuyer sur les langues nationales afin de faciliter les apprentissages notamment au cycle d'enseignent primaire."
   source: https://www.globalpartnership.org/node/document/download?file=document%2Ffile%2F2020-Guinea-ESP.pdf
 - field: indigenous.mediumOfInstruction
   quote: "Pour atteindre cet objectif, il s'agira d'abord de mener à sa fin la phase pilote actuellement en cours afin de disposer d'une base de connaissances suffisamment solides des enjeux de cette réforme et des implications pour sa mise à l'échelle sur le territoire national. Mais le démarrage précipité de l'expérimentation avec le programme ELAN n'avait pas pris toute la mesure de l'enjeu."
   source: https://www.globalpartnership.org/node/document/download?file=document%2Ffile%2F2020-Guinea-ESP.pdf
 - field: indigenous.mediumOfInstruction
   quote: "Les langues nationales (peul, malinké, soussou, kissi, kpellé et toma), quand on les enseigne au primaire, constituent des matières d'enseignement, non pas des langues d'enseignement."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
 - field: indigenous.mediumOfInstruction
   quote: "L'enseignement préprimaire ou préscolaire se fait généralement dans la langue maternelle de l'enfant (peul, malinké, soussou, kissi, kpellé ou toma), mais peut aussi être offert en français. Cet enseignement, entièrement privé, est d'une durée de trois ans et n'existe que dans les milieux urbains."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
 - field: indigenous.mediumOfInstruction
   quote: "Ainsi, les langues nationales choisies devinrent des langues d'enseignement à la place du français, et ce, de la 1re à la 8e année, ainsi qu'une discipline de la 9e année à l'université."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
   note: describing the "révolution culturelle socialiste" phase after the 1968 reform
 - field: indigenous.mediumOfInstruction
   quote: "Quoi qu'il en soit, à la fin du régime d'Ahmed Sékou Touré, le français était redevenu l'unique langue d'enseignement dans les écoles. L'expérience des langues nationales tourna court en 1984, dès la mort de l'ancien président."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
 - field: indigenous.mediumOfInstruction
   quote: "Dans les premières années de la réforme (mais après 1967), les apprentissages de base tels la lecture, l'écriture et le calcul se faisaient dans l'une des langues nationales au cours de la première année, alors que le français n'était abordé qu'à l'oral. Puis, au cours des trois années suivantes, les élèves passaient progressivement du français comme matière enseignée au français en tant que langue d'enseignement. Les langues nationales suivaient le processus inverse: de langue d'enseignement, elles devenaient des matières d'enseignement."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
 - field: indigenous.mediumOfInstruction
   quote: "Ce sont la loi n° L/97/022/AN du 19 juin 1997 portant orientation de l'éducation nationale et le décret n° 97/196/PRG/SGG du 21 août 1997, qui définissent les caractéristiques fondamentales de l'éducation en Guinée-Conakry. Malheureusement, ces documents ne sont pas disponibles."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm
 - field: indigenous.taughtAsSubject
   quote: "Eight national languages are officially recognized and codified by the Institut national de recheche en linguistique appliquée [National Research Institute of Applied Linguistics – IRLA]: namely Soso, Maninkakan, Poular, Pkèlè, Lomagoe, Kissiei, Wamey and Onéan. French is the official language. Other languages such as Baga, Koniagui, Kuranko, Lélé, Bassari and Badiaranké are considered to be dialectal variants of the national languages. There are, however, few policies for the inclusion of vulnerable ethnic and linguistic groups. Literacy is taught in all national languages."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
 - field: indigenous.taughtAsSubject
   quote: "Sous-programme 2.7. Promotion des langues nationales"
   source: https://www.globalpartnership.org/node/document/download?file=document%2Ffile%2F2020-Guinea-ESP.pdf
 - field: indigenous.taughtAsSubject
   quote: "la commission choisit huit langues nationales (malinké, soussou, peul ou poular, kissi, basari, loma, koniagi et kpellé) sur une vingtaine et élabora des alphabets dans plusieurs autres langues nationales. Ces alphabets furent adoptés par le Conseil national de la révolution réuni à Nzérékoré en juin 1965. ... Ces mêmes langues étaient matières d'enseignement dans tout le cursus scolaire et universitaire, du secondaire au supérieur où les notes obtenues comptaient comme n'importe quelle autre matière aux compositions et examens de fin d'année."
   source: https://www.axl.cefan.ulaval.ca/afrique/guinee_franco.htm

DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - "National-language medium ran 1968 to 1984; French restored as sole medium on Toure's death"
     - "ProDEG 2020-29 target: bilingual primaries rise from 0.1% of schools to 10% by 2029"
     - "ProDEG calls the ELAN bilingual start precipitate and keeps the reform at pilot stage"
     - "Leclerc: national languages at primary are subjects, not languages of instruction"
     - "Pre-primary is usually in the child's mother tongue, but is private and urban only"
 - field: indigenous.taughtAsSubject
   bullets:
     - "UNESCO PEER: eight national languages recognised and codified by the IRLA"
     - "UNESCO PEER: literacy is taught in all national languages"
     - "ProDEG sub-programme 2.7 is Promotion des langues nationales, aimed at primary"
     - "UNESCO PEER: few policies for including vulnerable ethnic and linguistic groups"

NOT ESTABLISHED:
 - Not established from the sources consulted: whether any national language is a timetabled subject with a weekly period allocation in the current Guinean primary curriculum, and what the 1997 loi d'orientation says about languages. I read the ProDEG 2020-2029 in full-text search (its only language-of-instruction content is sub-programme 2.7 and the 0.1%-to-10% bilingual-school indicator), the UNESCO PEER Guinea inclusion profile, and Leclerc's Guinea page, which itself records that the 1997 law and its implementing decree are not available. The Conseil National de la Transition page on a national-languages bill returned 403 / a maintenance placeholder.

POLICY HISTORY CANDIDATES:
 - year: 1965
   description: "Alphabets for eight national languages — malinké, soussou, peul/poular, kissi, basari, loma, koniagi, kpellé — adopted by the Conseil national de la révolution meeting at Nzérékoré in June 1965; the same languages became taught subjects through school and university (Leclerc)"
 - year: 1968
   description: "Sékou Touré applies his africanisation language policy and reforms primary education; basic literacy and numeracy are taught in a national language in year 1, French only orally, with a staged handover to French as medium over the following three years (Leclerc)"
 - year: 1984
   description: "On Sékou Touré's death on 26 March 1984 the national-language experiment ends; French is once again the sole language of instruction in schools (Leclerc)"
 - year: 1997
   description: "Loi n° L/97/022/AN du 19 juin 1997 portant orientation de l'éducation nationale and décret n° 97/196/PRG/SGG du 21 août 1997 define the fundamental characteristics of education in Guinea. CAUTION: cited here only for existence and date, from Leclerc, who states the texts are unavailable; their language content was not read."
 - year: 2019
   description: "ProDEG 2020-2029 makes 'Promotion des langues nationales' sub-programme 2.7, setting a target for the share of primary schools using bilingual French-plus-national-language teaching to rise from a 0.1% baseline to 10%"
