### CA-QC|Quebec
STATUS: documented

FRAMING — THE MIRROR IMAGE: Quebec's second language is ENGLISH — *anglais,
langue seconde* (ALS). In English-language schools the mirror runs the other way
and the second language is *français, langue seconde*. The Régime pédagogique
sets both in one two-column table. Separately, the Charter of the French Language
governs WHO MAY ATTEND English-language school — that is a school-language rule,
not a second-language-teaching rule, and the two must not be conflated. Quebec
also does not subscribe to the CMEC Protocol.

SOURCE VERIFICATION NOTE (important, read before citing):
legisquebec.gouv.qc.ca returned **HTTP 502** to every request from this session
(7 attempts across `/fr/document/rc/I-13.3, r. 8`, `/en/document/cr/...`,
`/fr/document/lc/C-11`, `/en/document/cs/c-11`). CanLII returned 403 to both curl
and WebFetch. The statutory text quoted below therefore comes from **Internet
Archive snapshots** captured into this working directory
(qc_regime_wb.txt from the 2026-03-09 snapshot; qc_charte.txt from the 2026-04-11
snapshot). Re-verification of the archive URLs during this session returned 429
(rate limit) and connection timeouts, so I am flagging them as archive-sourced
rather than claiming a clean 200. The PDF and quebec.ca sources below WERE
verified 200 directly this session.

SOURCES:
 - label: "Ministère de l'Éducation, du Loisir et du Sport, Programme de formation de l'école québécoise — Anglais, langue seconde, premier cycle du primaire (2006, ISBN 2-550-47377-9)"
   url: https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/primaire/programmes/PFEQ-anglais-langue-seconde-1er-cycle-primaire.pdf
   http: 200 (application/pdf, 1,502,436 bytes)
   tier: official-document
 - label: "Gouvernement du Québec, Elementary English as a Second Language Programs (Québec Education Program)"
   url: https://www.quebec.ca/en/education/preschool-elementary-and-secondary-schools/programs-training-evaluation/quebec-education-program/elementary/english-second-language
   http: 200
   tier: official-document
 - label: "Régime pédagogique de l'éducation préscolaire, de l'enseignement primaire et de l'enseignement secondaire, RLRQ c. I-13.3, r. 8, arts. 22 and 23"
   url: https://web.archive.org/web/20260309210503/https://www.legisquebec.gouv.qc.ca/fr/document/rc/I-13.3,%20r.%208
   http: archive snapshot (live host 502 to this session; archive re-check 429)
   tier: official-document
 - label: "Charte de la langue française, RLRQ c. C-11, chapitre VIII 'Langue de l'enseignement', arts. 72, 73, 88, 88.0.2, 97"
   url: https://web.archive.org/web/20260411172545/https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-11
   http: archive snapshot (live host 502 to this session)
   tier: official-document
 - label: "CMEC / Government of Canada, Protocol for Agreements for Minority-Language Education and Second-Language Instruction 2019–2023, footnote 1 and cl. 5.1.1"
   url: https://www.cmec.ca/Publications/Lists/Publications/Attachments/413/Protocol_2019-2023-EN.pdf
   http: 200
   tier: official-document

EVIDENCE:
 - field: primaryRequirement
   quote: "Sa publication vient concrétiser l’engagement pris par le gouvernement du Québec de faire commencer l’apprentissage d’une langue seconde dès le premier cycle du primaire."
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/primaire/programmes/PFEQ-anglais-langue-seconde-1er-cycle-primaire.pdf (lettre du ministre, 8 juin 2006)
 - field: primaryRequirement
   quote: "Je vous invite à prendre connaissance de ce programme et à vous l’approprier dans la perspective de son application obligatoire dès septembre 2006."
   source: https://cdn-contenu.quebec.ca/cdn-contenu/education/pfeq/primaire/programmes/PFEQ-anglais-langue-seconde-1er-cycle-primaire.pdf
 - field: primaryRequirement
   quote: "22. À l’enseignement primaire, les matières obligatoires enseignées chaque année et le nombre d’heures par semaine, prévu à titre indicatif pour ces matières, sont les suivants: … 1er CYCLE … Langue seconde (français ou anglais) … 2e ET 3e CYCLES … Langue seconde (français ou anglais)"
   source: Régime pédagogique art. 22 (archive snapshot above)
 - field: curriculumTime
   quote: "ENSEIGNEMENT PRIMAIRE 1er CYCLE … Langue d’enseignement 9 h / Mathématique 7 h / Éducation physique et à la santé 2 h / Total du temps réparti 18 h … Temps non réparti 7 h / Total du temps 25 h"
   source: Régime pédagogique art. 22 (archive snapshot) — note the second language is listed as a compulsory subject but carries NO indicative weekly hours; it is funded out of the "temps non réparti"
 - field: curriculumTime
   quote: "ENSEIGNEMENT SECONDAIRE - 1ER CYCLE … Français, langue d’enseignement 400 heures - 16 unités / Anglais, langue d’enseignement 300 heures - 12 unités / ou Anglais, langue seconde 200 heures - 8 unités / Français, langue seconde 300 heures - 12 unités"
   source: Régime pédagogique art. 23 (archive snapshot) — two-column table: French-sector column vs English-sector column
 - field: secondaryRequirement
   quote: "23.1. Au second cycle de l’enseignement secondaire, l’élève choisit, chaque année, le parcours de formation générale ou le parcours de formation générale appliquée."
   source: Régime pédagogique art. 23.1 (archive snapshot)
 - field: primaryRequirement
   quote: "72. L’enseignement se donne en français dans les classes maternelles, dans les écoles primaires et secondaires sous réserve des exceptions prévues à la présente section. … Le présent article n’empêche pas l’enseignement en anglais afin d’en favoriser l’apprentissage, selon les modalités et aux conditions prescrites dans le Régime pédagogique établi par le gouvernement en vertu de l’article 447 de la Loi sur l’instruction publique (chapitre I-13.3)."
   source: Charte de la langue française art. 72 (archive snapshot) — the third paragraph is the statutory hook for teaching IN English to promote its learning, i.e. for intensive English
 - field: languagesOffered
   quote: "73. Peuvent recevoir l’enseignement en anglais, à la demande de l’un de leurs parents: 1° les enfants dont le père ou la mère est citoyen canadien et a reçu un enseignement primaire en anglais au Canada, pourvu que cet enseignement constitue la majeure partie de l’enseignement primaire reçu au Canada; 2° les enfants dont le père ou la mère est citoyen canadien et qui ont reçu ou reçoivent un enseignement primaire ou secondaire en anglais au Canada, de même que leurs frères et soeurs …"
   source: Charte de la langue française art. 73 (archive snapshot)
 - field: higherEducation
   quote: "L’établissement qui donne en anglais l’enseignement collégial doit néanmoins s’assurer que tout étudiant inscrit dans un programme d’études conduisant au diplôme d’études collégiales réussisse avant que ne lui soit délivré un tel diplôme, un minimum de trois cours donnés en français, à l’exclusion des cours de langue d’enseignement et de langue seconde de même que des cours d’éducation physique."
   source: Charte de la langue française art. 88.0.2, enacted by 2022, c. 14, a. 60 (Bill 96) (archive snapshot)
 - field: higherEducation
   quote: "88.0.1. Les établissements offrant l’enseignement collégial … ainsi que les établissements d’enseignement universitaire … appartiennent à une seule des catégories suivantes: francophone ou anglophone."
   source: Charte de la langue française art. 88.0.1 (2022, c. 14, a. 60) (archive snapshot)
 - field: regionalMinorityLanguages
   quote: "La commission scolaire Crie et la commission scolaire Kativik poursuivent comme objectif l’usage du français comme langue d’enseignement en vue de permettre aux diplômés de leurs écoles de poursuivre leurs études en français, s’ils le désirent, dans les écoles, collèges ou universités du Québec. Les commissaires fixent le rythme d’introduction du français et de l’anglais comme langues d’enseignement après consultation des comités d’école, dans le cas des Cris, et des comités de parents, dans le cas des Inuit. … Compte tenu des adaptations nécessaires, le présent article s’applique aux Naskapis de Schefferville."
   source: Charte de la langue française art. 88 (archive snapshot)
 - field: regionalMinorityLanguages
   quote: "97. Les réserves indiennes ne sont pas soumises à la présente loi."
   source: Charte de la langue française art. 97 (archive snapshot)
 - field: secondaryRequirement
   quote: "Intensive Instruction in English as a Second Language (IIESL)"
   source: https://www.quebec.ca/en/education/preschool-elementary-and-secondary-schools/programs-training-evaluation/quebec-education-program/elementary/english-second-language (the ministry hosts an Intensive ESL Teacher's Guide and IIESL organisational-model documents)
 - field: assessment
   quote: "Framework for the Evaluation of Learning"
   source: https://www.quebec.ca/en/education/preschool-elementary-and-secondary-schools/programs-training-evaluation/quebec-education-program/elementary/english-second-language
 - field: uptake
   quote: "Quebec2 46,525,473   18,406,662   64,932,135"
   source: https://www.cmec.ca/Publications/Lists/Publications/Attachments/413/Protocol_2019-2023-EN.pdf (cl. 5.1.1; second-language column $18,406,662/yr — but see footnote 1)
 - field: policyHistory
   quote: "the Government of Quebec does not subscribe to this Protocol and intends to fully exercise its exclusive responsibility in this area on its territory. The conclusion of a bilateral agreement between the Government of Canada and the Government of Quebec, that respects Quebec’s exclusive jurisdiction in education, will enable the Government of Quebec to obtain its share of federal funding."
   source: https://www.cmec.ca/Publications/Lists/Publications/Attachments/413/Protocol_2019-2023-EN.pdf (footnote 1)

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - The second language here is English, not French: "anglais, langue seconde"
     - Compulsory from Cycle 1 of primary (Grade 1) since September 2006
     - Régime pédagogique art 22 lists "Langue seconde (français ou anglais)" at every cycle
     - Cycle 1 programme sets no reading or writing expectations, only oral
 - field: secondaryRequirement
   bullets:
     - Secondary Cycle 1: anglais langue seconde 200 hours, 8 units, over the cycle
     - English-sector mirror: français langue seconde 300 hours, 12 units
     - Intensive ESL (IIESL) is a ministry-supported model, not a universal requirement
 - field: upperSecondary
   bullets:
     - Secondary Cycle 2 runs on parcours de formation générale or générale appliquée
     - Second language stays compulsory across secondary in both sectors
 - field: languagesOffered
   bullets:
     - The compulsory pairing is French and English; there is no "foreign language" category
     - Which language is second depends on the sector the student attends
     - Charter art 73 controls eligibility for English-language schooling
 - field: curriculumTime
   bullets:
     - Primary: second language is compulsory but carries no indicative weekly hours
     - Primary indicative time is 18h of 25h in Cycle 1, 14h of 25h in Cycles 2-3
     - Secondary Cycle 1: 200 hours anglais langue seconde in the French sector
     - Secondary Cycle 1: 300 hours français langue seconde in the English sector
 - field: assessment
   bullets:
     - Ministry publishes a Framework for the Evaluation of Learning for ESL
     - Report Card Weightings and Wording set the reporting rules
 - field: teacherSupply
   bullets:
     - Ministry publishes guidance on homeroom-teacher / ESL-teacher collaboration in intensive ESL
 - field: higherEducation
   bullets:
     - Bill 96 (2022 c.14): every college is classed francophone or anglophone
     - English-college DEC students must pass at least three courses given in French
     - Language-of-instruction, second-language and PE courses do not count toward those three
 - field: uptake
   bullets:
     - No Quebec ESL enrolment series retrieved from an official source this session
 - field: regionalMinorityLanguages
   bullets:
     - Charter art 97: Indian reserves are not subject to the Act
     - Cree and Kativik school boards set their own pace for introducing French and English
     - Same rule applies with adaptations to the Naskapi of Schefferville
     - This flows from the 1975 James Bay and Northern Quebec Agreement
 - field: policyHistory
   bullets:
     - 1977 Charter of the French Language makes French the language of instruction
     - 2006 ESL becomes compulsory from Cycle 1 of primary, from September
     - 2010 c.23 amends Charter art 73 eligibility and adds art 73.1
     - 2022 Bill 96 adds three French courses for English-college DEC students

NEGATIVES:
 - Quebec does NOT subscribe to the CMEC Protocol. Its line in the funding table
   is real but is delivered through a separate bilateral agreement respecting
   Quebec's exclusive jurisdiction. Do not describe Quebec as a Protocol signatory.
 - "Anglais intensif" in Grade 6 was NOT verified as a mandate. The ministry hosts
   IIESL teaching guides and organisational-model documents, which shows the model
   is supported, but no retrieved source says it is compulsory. I did not find a
   retrievable source this session for the 2011 announcement to make Grade 6
   intensive English mandatory by 2015-16, nor for its abandonment. NOT ASSERTED.
 - "Espagnol, langue tierce" was NOT verified. The string "espagnol" occurs 0 times
   in the retrieved Régime pédagogique text. It is presumably an optional subject on
   the minister's list under art. 23.1 rather than in the regulation itself, but I
   could not retrieve that list. NOT ASSERTED.
 - No ministerial épreuve unique for anglais langue seconde was retrieved and named
   this session; `assessment` rests on the Framework for the Evaluation of Learning.
 - The two key statutes could only be read via Internet Archive snapshots this
   session (legisquebec 502 throughout). Flagged above; a re-verification pass on
   legisquebec is advisable before publication.

UPTAKE — PARTIALLY RESOLVED from Statistics Canada.
 - label: "Statistics Canada, The Daily, 'Elementary and secondary education: Rising student numbers drive record enrolment in Canadian schools, 2023/2024', released 2025-10-28"
   url: https://www150.statcan.gc.ca/n1/daily-quotidien/251028/dq251028d-eng.htm
   http: 200
   tier: official-document
 - label: "Statistics Canada, The Daily, 'Elementary-Secondary Education Survey ... 2017/2018', released 2019-10-24"
   url: https://www150.statcan.gc.ca/n1/daily-quotidien/191024/dq191024b-eng.htm
   http: 200
   tier: official-document

 - field: regionalMinorityLanguages
   quote: "In Quebec, the share of students in minority official language programs declined for the second consecutive year, falling from a peak of 11.1% in the early 2000s to 8.2% in 2023/2024, reaching an all-time low."
   source: https://www150.statcan.gc.ca/n1/daily-quotidien/251028/dq251028d-eng.htm
 - field: regionalMinorityLanguages
   quote: "In Quebec, where French is the language of the majority of the population, 6.9% of public school students were learning in English through education programs for official language minorities. According to the 2016 Census, 13.6% of the population aged 5 to 18 in Quebec had English as their first official language spoken."
   source: https://www150.statcan.gc.ca/n1/daily-quotidien/191024/dq191024b-eng.htm

CAUTION: these are QUEBEC'S ENGLISH-LANGUAGE SCHOOL SYSTEM figures (the
minority-language school system, governed by Charter of the French Language
art. 73 eligibility) — they are NOT the uptake of anglais langue seconde, which
is compulsory for essentially every student in the French sector. Put them under
regionalMinorityLanguages, not uptake. Note also that the two figures use
different denominators/vintages (6.9% in 2017/2018 vs 8.2% in 2023/2024 against a
peak of 11.1% in the early 2000s) and StatCan warns "All numbers, including the
totals, have been randomly rounded".

REVISED uptake BULLETS:
 - field: uptake
   bullets:
     - No enrolment figure for anglais langue seconde retrieved this session
     - Quebec does not report French immersion to Statistics Canada
 - field: regionalMinorityLanguages (ADD)
   bullets:
     - English-school-system share fell to 8.2% of Quebec students in 2023/24, an all-time low
     - That is down from a peak of 11.1% in the early 2000s
     - This measures the minority school system, not second-language teaching

teacherSupply — SHARED PAN-CANADIAN SOURCE (added after this unit was first written):
 - label: "Office of the Commissioner of Official Languages of Canada, Accessing opportunity: A study on challenges in French-as-a-second-language education teacher supply and demand in Canada, published 13 February 2019"
   url: https://www.clo-ocol.gc.ca/en/publications/studies-other-reports/2019/accessing-opportunity-study-challenges-french-second-language-education-teacher-supply-demand-canada
   http: 200
   tier: official-document
   caveat: the Commissioner CONTRACTED the study to Canadian Parents for French, and many figures inside it are CPF's rather than a government count. Say so when citing a number from it.
 - field: teacherSupply
   quote: "The review found a broad consensus that there is an overall increase in demand from parents for elective FSL programs (especially French Immersion), a need to revitalize support for Core French programs, and a general and persistent shortage of qualified FSL teachers in Canada"
   source: https://www.clo-ocol.gc.ca/en/publications/studies-other-reports/2019/accessing-opportunity-study-challenges-french-second-language-education-teacher-supply-demand-canada
 - field: teacherSupply
   quote: "The literature also identifies challenges in filling spaces in teacher education programs in some provinces (e.g., Nova Scotia, Prince Edward Island, Ontario and Manitoba), problems with teacher mobility to more rural and isolated areas (e.g., in Manitoba, Nova Scotia, Nunavut, Northwest Territories, Yukon and Prince Edward Island), systemic challenges in retention of FSL teachers owing to a perceived lack of status of the FSL profession in schools"
   source: https://www.clo-ocol.gc.ca/en/publications/studies-other-reports/2019/accessing-opportunity-study-challenges-french-second-language-education-teacher-supply-demand-canada
 - field: teacherSupply
   bullets:
     - Commissioner of Official Languages 2019: persistent national shortage of qualified FSL teachers
     - Study was contracted to Canadian Parents for French, so its figures are CPF's
     - Named problems: unfilled teacher-education places and poor mobility to rural areas

 - field: uptake
   quote: "As the study of French is a required curricular discipline, enrolment in FSL programs in Quebec’s English schools is the highest in the country (100%), as is enrolment in French Immersion (32%). However, Quebec is the only province that witnessed an overall decline in the French Immersion enrolment rate during the period from 2011 to 2016 (dropping from 36.2% to 32%) (Canadian Parents for French 2017)."
   source: https://www.clo-ocol.gc.ca/en/publications/studies-other-reports/2019/accessing-opportunity-study-challenges-french-second-language-education-teacher-supply-demand-canada
   NOTE: this is CPF data reported inside an OCOL study; it describes FRENCH as a second language in Quebec's ENGLISH-language schools, the mirror of anglais langue seconde. Label it as such and as a secondary figure.
 - field: teacherSupply
   quote: "FSL teachers remain in high demand in both the English and French school boards which at times compete for the same pool of teachers."
   source: https://www.clo-ocol.gc.ca/en/publications/studies-other-reports/2019/accessing-opportunity-study-challenges-french-second-language-education-teacher-supply-demand-canada
