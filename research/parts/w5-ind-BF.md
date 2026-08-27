### BF|Burkina Faso
STATUS: documented
SOURCES:
 - label: "Burkina Faso (Cabinet/Ministère de l'éducation nationale, de l'alphabétisation et de la promotion des langues nationales, MENAPLN), national report to UNESCO's Tenth Consultation of Member States on the implementation of the 1960 Convention and Recommendation against Discrimination in Education, reporting period 2017-2020"
   url: https://media.unesco.org/sites/default/files/webform/r2e002/burkina-faso_10th-consultation-guidelines.pdf
   http: 200 (application/pdf, 348049 bytes)
   tier: official-document
 - label: "Paul Taryam Ilboudo, L'éducation bilingue au Burkina Faso. Une formule alternative pour une éducation de base de qualité, ADEA, 2009 (ISBN-13 978-92-9178-098-3), Expériences africaines - études de cas nationales no. 11"
   url: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
   http: 200 (application/pdf, 1517156 bytes)
   tier: secondary-source
 - label: "UNESCO Global Education Monitoring Report, Profiles Enhancing Education Reviews (PEER), Burkina Faso, Inclusion"
   url: https://education-profiles.org/sub-saharan-africa/burkina-faso/~inclusion
   http: 200
   tier: secondary-source
 - label: "Jacques Leclerc, L'aménagement linguistique dans le monde, 'Burkina Faso: législation en matière d'éducation', reproducing Loi 013-2007-AN du 30 juillet 2007 portant loi d'orientation de l'éducation, art. 10 and 13"
   url: https://www.axl.cefan.ulaval.ca/afrique/burkina-lois_educ.htm
   http: 200
   tier: secondary-source
NEGATIVE RESULTS ON SOURCING (tested this session):
 - http://planipolis.iiep.unesco.org/upload/Burkina%20Faso/BurkinaFasoLoi_0132007.pdf returns HTTP 200 but content_type text/html and 3141 bytes — it is a Planipolis error/landing page, not the law.
 - https://planipolis.iiep.unesco.org/sites/default/files/ressources/burkina_faso_loi_013_2007.pdf — same, 200 text/html, 3143 bytes.
 - https://www.ilo.org/dyn/natlex/docs/ELECTRONIC/77498/82119/F1140268098/BFA-77498.pdf — 403, redirects to a NATLEX details stub.
 - https://faolex.fao.org/docs/pdf/bkf175247.pdf — 404.
 - https://www.education.gov.bf/fileadmin/user_upload/storage/Loi_013_2007.pdf — 404.
 - https://www.legiburkina.bf/ — connection timed out (curl 28), no response on port 443.
 - No official full text of Loi 013-2007/AN was retrieved. Art. 10 below is quoted from two independent secondary sources that agree on its wording (UNESCO PEER in English, axl.cefan.ulaval.ca in French).

EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "Article 10 — 1) Les langues d'enseignement utilisées au Burkina Faso sont le français et les langues nationales aussi bien dans la pratique pédagogique que dans les évaluations."
   source: https://www.axl.cefan.ulaval.ca/afrique/burkina-lois_educ.htm
 - field: indigenous.mediumOfInstruction
   quote: "Act No. 013-2007 affirms that \"the languages of instruction in Burkina Faso are French and the national languages, both in teaching practice and assessments\"."
   source: https://education-profiles.org/sub-saharan-africa/burkina-faso/~inclusion
 - field: indigenous.mediumOfInstruction
   quote: "Le curriculum de l'éducation bilingue a comme particularité de couvrir le contenu du programme des écoles classiques en cinq ans au lieu de six. Cela est rendu possible grâce à l'utilisation de la langue première de l'élève et l'introduction progressive du français. C'est ainsi qu'en première année la langue nationale, comme médium d'enseignement, occupe 90 % du programme et le français, comme matière 10 %. La part de la langue nationale comme médium devient 80 % en deuxième année, puis 50 % en troisième année, 20 % en quatrième année et enfin 10 % en cinquième année. Dès la 3ème année le français devient progressivement médium d'enseignement avec la langue nationale et atteint 90 % en 5ème année."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.mediumOfInstruction
   quote: "A ce jour huit langues nationales sont utilisées dans l'éducation bilingue en complémentarité avec le français: le mooré, le jula, le fulfulde, le lyélé, le gulmancema, le dagara, le bisa et le nuni."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.mediumOfInstruction
   quote: "A partir de la fin de la troisième année, les élèves sont censés avoir appris assez de français pour poursuivre leurs études dans cette langue et utiliser les mêmes livres que leurs pairs de même niveau (CM) à l'école primaire classique. Le français devient alors médium d'enseignement à ce niveau dans les écoles primaires bilingues."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.mediumOfInstruction
   quote: "En quatrième année, les élèves des écoles bilingues poursuivent quelques enseignements dans les langues nationales, mais la plus grande partie du programme de la quatrième année se fait en français qui devient le principal médium d'enseignement."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.mediumOfInstruction
   quote: "L'expérimentation de l'éducation bilingue a vu le jour au Burkina Faso en 1994 avec l'ouverture de deux écoles bilingues, l'une dans le village de Nomgana et l'autre dans le village de Goué ... et dans une seule langue nationale, le moore."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.mediumOfInstruction
   quote: "C'est à la fin de cette cinquième année que les élèves des EPB se présentent aux examens officiels du CEP entièrement en langue française pour le moment."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.taughtAsSubject
   quote: "L'enseignement des langues nationales se fait en fonction des besoins exprimés par les populations locales, la disponibilité des personnels compétents et des programmes pour la langue concernée. La description des langues est en cours."
   source: https://media.unesco.org/sites/default/files/webform/r2e002/burkina-faso_10th-consultation-guidelines.pdf
 - field: indigenous.taughtAsSubject
   quote: "o X Lois ou règlements garantissant le droit des minorités nationales à étudier dans leur langue — Adoption d'une politique de promotion des langues nationales."
   source: https://media.unesco.org/sites/default/files/webform/r2e002/burkina-faso_10th-consultation-guidelines.pdf
 - field: indigenous.taughtAsSubject
   quote: "Création du Secrétariat Permanent de la promotion des langues nationales et de l'éducation à la citoyenneté par le décret 2019-344/PRES/PM/MENAPLN du 24 avril 2019 portant organisation du ministère de l'Education nationale, de l'Alphabétisation et de la Promotion des Langues nationales."
   source: https://media.unesco.org/sites/default/files/webform/r2e002/burkina-faso_10th-consultation-guidelines.pdf
 - field: indigenous.taughtAsSubject
   quote: "Article 10 — 2) D'autres langues peuvent intervenir comme véhicules et disciplines d'enseignement dans les établissements d'enseignement conformément aux textes en vigueur."
   source: https://www.axl.cefan.ulaval.ca/afrique/burkina-lois_educ.htm
 - field: indigenous.taughtAsSubject
   quote: "b. L'enseignement du français — Seul le français oral est enseigné et occupe environ 10 % de l'emploi du temps."
   source: https://www.adeanet.org/clearinghouse/sites/default/files/docs/interieur_11_burkina_fre.pdf
 - field: indigenous.taughtAsSubject
   quote: "Furthermore, the PDSEB 2012–2021 aims to scientifically describe as many national languages as possible and ensure that appropriate teaching materials are available in these languages. Subprogramme 3 of the PDSEB focuses on promoting bilingualism and multilingualism in basic education. The drafting of a policy to promote national languages began in March 2019 under the leadership of MENAPLN, which established a permanent secretariat for its implementation."
   source: https://education-profiles.org/sub-saharan-africa/burkina-faso/~inclusion

DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - "Loi 013-2007 art 10: languages of instruction are French and the national languages"
     - "Ecole primaire bilingue: national language is 90% of year 1, then 80, 50, 20, 10 percent"
     - "French becomes a medium from year 3 and reaches 90% of the timetable by year 5"
     - "Bilingual primary runs five years against six in the ecole classique (ADEA 2009)"
     - "Eight languages in use: moore, jula, fulfulde, lyele, gulmancema, dagara, bisa, nuni"
 - field: indigenous.taughtAsSubject
   bullets:
     - "MENAPLN to UNESCO: national-language teaching follows local demand and staff supply"
     - "Loi 013-2007 art 10(2): other languages may serve as vehicles and as subjects"
     - "Year 1 of the bilingual school teaches oral French only, about 10% of the timetable"
     - "Decree 2019-344 of 24 April 2019 set up a Permanent Secretariat for national languages"

POLICY HISTORY CANDIDATES:
 - year: 1994
   description: "Bilingual education begins as an experiment with two schools, at Nomgana and Goué in the Loumbila department, teaching in a single national language, moore (ADEA 2009 case study)"
 - year: 2007
   description: "Loi 013-2007/AN du 30 juillet 2007 portant loi d'orientation de l'éducation, art. 10: 'Les langues d'enseignement utilisées au Burkina Faso sont le français et les langues nationales aussi bien dans la pratique pédagogique que dans les évaluations'; art. 10(2) allows other languages as vehicles and as subjects"
 - year: 2019
   description: "Décret 2019-344/PRES/PM/MENAPLN du 24 avril 2019 portant organisation du ministère creates the Secrétariat Permanent de la promotion des langues nationales et de l'éducation à la citoyenneté"

NOTE ON DATES:
 - The ADEA case study is dated by its own imprint: "© Association pour le développement de l'éducation en Afrique (ADEA) – 2009", ISBN-13 978-92-9178-098-3.
 - The Burkina Faso report to UNESCO states its reporting period on its face: "La durée de la période d'établissement des rapports au titre de la dixième consultation ... a été fixée à quatre ans (2017-2020)". No submission date is printed on the document and none is asserted here.
 - Burkina Faso's PDSEB 2012-2021, PSEF 2017-2030 and SSEZDS 2019-2024 are named in the MENAPLN report but were NOT retrieved in this session; no policyHistory row is proposed for them.
 - Widely reported news items about a December 2023 constitutional revision making the national languages official and French a working language were NOT verified against a primary text in this session and are therefore excluded.
