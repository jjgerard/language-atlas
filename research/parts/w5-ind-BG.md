### BG|Bulgaria
STATUS: documented

CHARTER STATUS (checked this session, do not imply otherwise):
Bulgaria has NEITHER SIGNED NOR RATIFIED the European Charter for Regional or
Minority Languages (ETS 148). The Council of Europe Treaty Office page
https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148
is a JavaScript app whose HTML body contains only "You need to enable JavaScript
to run this app." (verified, http 200). Its data endpoint, which the page's own
bundle names, was queried directly and returned for Bulgaria:
  {"CodePays":"BUL","LibPaysOrga":"Bulgaria","NumSTE":"148","DateSignature":null,
   "DateConsentement":null,"DateEntreeVigueur":null}
So: no signature, no consent to be bound, no entry into force. There is
therefore NO Committee of Experts / ECRML monitoring report on Bulgaria.

SOURCES:
 - label: "Council of Europe Treaty Office, chart of signatures and ratifications of ETS No. 148 (European Charter for Regional or Minority Languages), machine-readable data behind the Treaty Office page"
   url: https://conventions-ws.coe.int/WS_LFRConventions/api/signatures?numSTE=148&langue=ENG
   http: 200 (application/json; requires header `token: hfghhgp2q5vgwg1hbn532kw71zgtww7e`, the key published in the Treaty Office page source)
   tier: official-document
 - label: "Council of Europe Treaty Office, full list — signatures by treaty, treaty no. 148 (human-facing page; JavaScript app, no data in HTML)"
   url: https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148
   http: 200 (text/html, 87658 bytes)
   tier: official-document
 - label: "Advisory Committee on the Framework Convention for the Protection of National Minorities, Fifth Opinion on Bulgaria, ACFC/OP/V(2024)2, adopted 29 May 2024, published 10 October 2024"
   url: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
   http: 200 (application/pdf, 1141597 bytes)
   tier: official-document
 - label: "Закон за предучилищното и училищното образование (Preschool and School Education Act), обн. ДВ бр. 79 от 13 октомври 2015 г., consolidated text as last amended ДВ бр. 69 от 31 юли 2026 г."
   url: https://www.lex.bg/bg/laws/ldoc/2136641509
   http: 200 (text/html, charset windows-1251, 1861070 bytes)
   tier: official-document

EVIDENCE:
 - field: indigenous.mediumOfInstruction
   quote: "Чл. 13. (1) Официалният език в системата на предучилищното и училищното образование е българският. (2) Предучилищното и училищното образование се осъществяват на български език с изключение на случаите, предвидени в този закон."
   note: Bulgarian original, read in this session. ("The official language in the system of preschool and school education is Bulgarian. Preschool and school education are carried out in Bulgarian except in the cases provided for in this Act.")
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.mediumOfInstruction
   quote: "(3) В училищата, в които се изучава интензивно чужд език, учебни предмети може да се изучават на чужд език в съответствие с държавния образователен стандарт за учебния план. (4) В училищата, които обучават в съответствие както с държавните образователни стандарти, така и с изискванията на друга държава членка, учебните предмети може да се изучават на чужд език с изключение на учебния предмет Български език и литература."
   note: The only statutory exceptions to Bulgarian as medium are for a FOREIGN language (чужд език) — intensive foreign-language schools and schools also teaching to another EU member state's requirements. Minority languages are not among the exceptions; the Act's own term for them is "майчин език", a distinct category from "чужд език".
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.mediumOfInstruction
   quote: "There is no offer in teaching in minority languages and a very limited offer in teaching of minority languages."
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.mediumOfInstruction
   quote: "No preschool education in minority languages is available in Bulgaria."
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.taughtAsSubject
   quote: "Чл. 13. ... (6) Учениците, за които българският език не е майчин, имат право да изучават и майчиния си език при условията и по реда на този закон и под грижата и контрола на държавата."
   note: Bulgarian original. ("Pupils for whom Bulgarian is not the mother tongue have the right to study also their mother tongue under the conditions and by the procedure of this Act and under the care and control of the state.")
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.taughtAsSubject
   quote: "Чл. 76. (1) В процеса на училищното образование може да се изучава учебният предмет Майчин език."
   note: Bulgarian original. Permissive "може да се изучава" — "the subject Mother Tongue MAY be studied". Note the level: "в процеса на училищното образование" — in SCHOOL education; Art. 76 sits in the chapter on school (not preschool) preparation.
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.taughtAsSubject
   quote: "Чл. 87. ... (2) Структурата на учебния план обхваща три раздела: 1. раздел А - задължителни учебни часове; 2. раздел Б - избираеми учебни часове; 3. раздел В - факултативни учебни часове."
   note: Bulgarian original: the timetable has three sections — compulsory hours (A), elective hours (B), facultative hours (C). Mother Tongue is not in section A.
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.taughtAsSubject
   quote: "Чл. 89. ... (2) В избираемите учебни часове може да се изучават и учебните предмети по чл. 76, ал. 1, 2, 3, 4 и 5."
   note: Bulgarian original — the Art. 76(1) subjects, Mother Tongue among them, "may" be studied in the ELECTIVE hours (раздел Б). Art. 90: "Във факултативните учебни часове се осъществява обучение за придобиване на допълнителната подготовка" — facultative hours deliver "additional preparation".
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.taughtAsSubject
   quote: "15. ... \" Майчин език \" е езикът, на който говорят в семейството си: а) децата и учениците от етническите малцинствени групи, които традиционно или в значителна степен населяват територията на Република България; б) децата на гражданите на държави - членки на Европейския съюз, на Европейското икономическо пространство и на Конфедерация Швейцария, упражняващи трудова дейност на територията на Република България."
   note: Bulgarian original, §1 point 15 of the Supplementary Provisions (renumbered from point 14 by ДВ бр. 82/2020). This is the eligibility gate: the language must be that of an ethnic minority group traditionally or substantially settled in Bulgaria, or of a working EU/EEA/Swiss citizen's children.
   source: https://www.lex.bg/bg/laws/ldoc/2136641509
 - field: indigenous.taughtAsSubject
   quote: "At the primary level (grades 1-7), the state report indicates that Armenian, Hebrew, Romani and Turkish can be studied in the form of the subject \"mother tongue.\" Minority languages are not taught at secondary level (grades 8-12). The threshold for setting up classes in the subject \"mother tongue\" is 13 students and the curriculum specifies that the subject \"mother tongue\" is taught for two hours a week either as a \"facultative elective class\" or \"optional class\"."
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.taughtAsSubject
   quote: "Facultative elective classes are outside the general curriculum, but students are obliged to choose them. Optional classes may be chosen by students if they wish."
   note: footnote 112 of the Fifth Opinion, the Advisory Committee's own gloss on the two Bulgarian timetable categories.
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.taughtAsSubject
   quote: "This language is only taught as a \"facultative elective class\" in grades 1-4 and as an (optional) elective subject in grades 5-7."
   note: on Armenian at the Victoria and Krikor Totiungyan Primary School, Plovdiv — the only school in Bulgaria teaching it.
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.taughtAsSubject
   quote: "Finally, over the past few years no students have learned Romani as a \"mother tongue\" at school."
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747
 - field: indigenous.taughtAsSubject
   quote: "Article 75 of the Preschool and School Education Act lists groups of key competences that must be achieved through the general educational system. No provision is set out for the development of competences for learning \"mother tongue\"."
   note: DISCREPANCY, recorded not resolved. The Advisory Committee cites Article 75 for the key-competence list; in the consolidated text I read on lex.bg the key-competence list is at Чл. 77 ("Общообразователната подготовка обхваща следните групи ключови компетентности"), and Чл. 75 governs the types of preparation. Either the Opinion is imprecise or the article was renumbered. The substantive point — that mother tongue is not among the key competences — matches what I read: Чл. 77's list contains "компетентности в областта на българския език" and "умения за общуване на чужди езици", with no mother-tongue item.
   source: https://rm.coe.int/5th-op-bulgaria-en/1680b1c747

DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - "No teaching IN minority languages exists; Art 13(2) ZPUO makes Bulgarian the medium"
     - "Art 13(3)-(4) allow subjects in a FOREIGN language only, never a minority language"
     - "No preschool education in any minority language is available in Bulgaria"
     - "Advisory Committee 2024: no offer in teaching in minority languages"
 - field: indigenous.taughtAsSubject
   bullets:
     - "Only as the subject Mother Tongue, grades 1-7, and not at all in grades 8-12"
     - "Art 76(1) ZPUO: the subject may be studied — permissive, not an entitlement"
     - "Class opens only at 13 students; two hours a week, elective or facultative slot"
     - "Armenian, Hebrew, Romani, Turkish on offer; no pupil took Romani in recent years"

POLICY HISTORY CANDIDATES:
 - year: 2015
   description: "Закон за предучилищното и училищното образование (Preschool and School Education Act) promulgated in Държавен вестник no. 79 of 13 October 2015; Art. 13(1)-(2) make Bulgarian the official language and medium of preschool and school education, Art. 13(6) gives pupils whose mother tongue is not Bulgarian the right to study it, and Art. 76(1) creates the school subject Майчин език (Mother Tongue)"
 - year: 2020
   description: "Amendment published in Държавен вестник no. 82 of 18 September 2020 renumbers the Supplementary Provisions definition of 'майчин език' from point 14 to point 15, retaining the eligibility condition that the language be that of an ethnic minority group traditionally or substantially settled in Bulgaria"
 - year: 2024
   description: "Advisory Committee on the Framework Convention adopts its Fifth Opinion on Bulgaria on 29 May 2024 (published 10 October 2024), finding no teaching in minority languages, none at secondary level, a 13-pupil threshold for opening a Mother Tongue class, and no pupil at all learning Romani"

NOTES ON ABSENCE:
 - Preschool: the Act's mother-tongue subject (Чл. 76) sits in the school-education
   chapter, and the Fifth Opinion states flatly that no preschool education in
   minority languages is available. Verified in both sources.
 - Bulgarian law read here contains NO minimum-pupil figure; the 13-student
   threshold is attributed by the Advisory Committee to the curriculum/state
   educational standard, which I did not retrieve. Cite it to the Opinion, not to
   the Act.
