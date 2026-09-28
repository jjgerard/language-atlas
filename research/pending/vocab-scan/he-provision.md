# Vocabulary scan: `he.degreeSubjects` and `he.linguistics`

Step 1 of `derive-vocabulary` only. Nothing proposed here is wired in; no file in
`src/`, `data/` or `pages/` was touched.

## What was read

Both fields were read in full rather than sampled, because both are small enough
to hold at once. `degreeSubjects` is 803 lines of prose over 152 entries;
`linguistics` is 548 structured programme rows over 159 entries, which I read as
a flattened `subject | level | institution | note` listing.

    node research/tools/coding-dump.js he degreeSubjects     # 152 codable, national only
    node research/tools/coding-dump.js he linguistics        # 159 codable, national only

Region spread of what was read, from the `[Region]` tags: `degreeSubjects` runs
17 Eastern Africa, 16 Western Asia, 14 Western Africa, 10 South America, 9
South-Eastern Asia, 8 each Southern Asia / Northern Europe / Caribbean, 7 Middle
Africa, 6 each Northern Africa / Eastern Asia / Central America, 5 each Southern
Africa / Central Asia, 4 each Western Europe / Polynesia / Micronesia, 3 each
Southern Europe / Northern America / Melanesia / Central Europe, 2 Australia and
New Zealand, 1 Eastern Europe. `linguistics` is similar with one difference worth
noting — it has 7 Southeast Europe and 4 Eastern Europe against `degreeSubjects`'
3 Central Europe and 1 Eastern Europe, so the two fields are not filled on the
same units and any cross-tab of them will lose rows.

Counts of what is not codable, which matter for reading any share below:

| | codable | empty / never filled | `Not established` | `Not applicable` | `absences` flag |
|---|---|---|---|---|---|
| `degreeSubjects` | 152 | 57 | 1 | 0 | **0** |
| `linguistics` | 159 | 51 | 0 | 0 | **0** |

210 national units in `data/he.json`. **Neither field carries a single
`entry.absences` flag**, and that is not because nobody found an absence — see
axis F. Every prose absence on these two fields is currently invisible to
`coding-dump.js`, to `gaps.js` and to any count of coverage.

---

## 1. What VARIES

Read with no scheme in mind, this is what actually moves between systems. The
institution names and degree titles do not move in any countable way: 345
distinct `subject` strings over 548 `linguistics` rows, the commonest of which
(`Linguistics`, 83 rows) tells you nothing about a system. Naming is not an axis
here. What varies is:

1. **Whether the subject exists as an award at all**, versus existing only as a
   stream, an emphasis, a mención, an elective or a certificate. Both fields
   carry entries on both sides of this line, and several entries say so in the
   prose in so many words.
2. **At what level it stops.** This is the sharpest variation in the corpus.
   50 of 159 `linguistics` entries (31%) have no bachelor at all; 91 (57%) have
   no doctorate. Highest level present per entry: doctorate 68, master 57,
   bachelor 29, none of the three 5.
3. **Whether the subject has an institutional home of its own** — a Department
   or Institut of Linguistics — or sits inside philology, letters, English,
   education, cognitive science, mathematics or information science.
4. **What KIND of language is the degree subject** — the state language, an
   indigenous or minoritised language of the same state, a sign language, or a
   foreign/international language. This is the one that answers the map's own
   question and it is populated: 56 of 152 `degreeSubjects` entries name an
   indigenous or minoritised language, 6 name a sign language, 101 name an
   international one, and many name several kinds at once.
5. **What kind of thing the entry counted.** One prospectus, a national
   programme register, a third-party directory (WHED/IAU, 8 entries), or a
   sector-wide census. These are not interchangeable and the field hint does not
   currently ask which one was used.
6. **Whether the entry is describing provision or describing its absence.** At
   least 18 `linguistics` entries and 7 `degreeSubjects` entries are, in part or
   in whole, records of a documented absence.

What does NOT vary usefully: `orientation` on `he.linguistics` is blank on
**544 of 548 rows** (99.3%) — 2 `functional` (Otago) and 2 `generative` (Penn).
`year` is absent from every row on 147 of 159 entries (92%).

---

## 2. Candidate axes

Each axis is a question one system could answer, with the entries that forced
each value. Quotes are verbatim from the prose I read.

### A. `standing` — Can a language be read as a degree in its own right here?

Applies to `degreeSubjects`.

- **own degree** — the entry names an award whose subject is a language.
  Afghanistan: *"Pashto is taken as a degree in its own right at Paktia
  University"*. Kuwait: *"A language can be taken as a BA in its own right at
  Kuwait University's Faculty of Arts"*. Maldives: *"Dhivehi is a degree in its
  own right: MNU's Bachelor of Arts in Dhivehi Language"*.
- **combined only** — a language is a degree subject but never alone. Nepal:
  *"No single honours: each BA student takes two majors and three compulsory
  subjects"*. Singapore: *"Not single honours: NIE calls these double majors, the
  discipline paired with Education"*. Qatar: *"The English major is not single
  honours: 24 credit hours are minor requirements and electives"*.
- **stream inside another degree** — the language is a mención, orientation or
  emphasis. Bolivia: *"Language is taken inside UMSA's Lingüística e Idiomas
  licenciatura, as a mención"*. Haiti: *"The UEH degree is in applied
  linguistics, not in a single named language"*.
- **sub-degree only** — certificates, diplomas or courses, no degree. Micronesia:
  *"The national college offered only a non-credit Pohnpeian course when this was
  written"*. Northern Mariana Islands: *"These are developmental language courses
  provided through the CDI"*. Palau: *"Palau Community College teaches
  Conversational Palauan as a basic course"*. Malta: *"The University of Malta's
  guidelines name a Diploma in Maltese Sign Language Interpreting"* — and nothing
  else, though Malta's own `linguistics` rows run BA to PhD.
- **not stated**.

**Discriminates?** Weakly. On my read of all 152, roughly four in five sit on
`own degree`. The tail is short enough to name exhaustively, which is the honest
way to report it: `sub-degree only` is AS, AT, FM, GI, MP, MT, PW; `combined
only` is IL, NP, QA, SG; `stream inside another degree` is BO, HT. Everything
else either asserts an award or says nothing. A ~79% column is thin, but the
14-entry tail is real and is currently unreadable without reading 152
paragraphs. **Description, not a score.**

### B. `level_reached` — What is the highest level at which this is a degree subject?

Values `bachelor` / `master` / `doctorate` / `sub-degree only` / `not stated`.

For `linguistics` this axis already exists as stored data, exactly, in the
`level` field of each programme row: highest level per entry is doctorate 68,
master 57, bachelor 29, none-of-the-three 5. **Do not code it.** A coding column
here would restate the field and then drift from it. What the map wants is a
derived aggregate over the existing rows, not a reading.

For `degreeSubjects` (prose, so no such field) the axis is codable but thin:
38 of 152 entries (25%) use no level word at all — AF AS AT AU BI BJ CA DJ EC FI
FM GA GI GQ GU GY IQ IR JM JP KM KP KR LC LS MP NC NE PE PW TJ TM TR TT UA US VU
YE — and 77 (51%) mention a bachelor and nothing above it. Counts indicative:
they come from pattern-matching level words across ten languages and will fire on
negations. Evidence for the ceiling values: Guinea-Bissau *"Advanced training in
Portuguese had until now stopped at the licenciatura"*; Oman *"The department
began with that bachelor's, then added a master's and a doctorate"*; Algeria
*"Tamazight is taught inside the LMD system, so licence, master and doctorate all
exist"*.

### C. `claim_basis` — What kind of source is the entry counting?

- **one institution's own listing** — the great majority of both fields.
- **national register or classifier** — Azerbaijan: *"Filologiya is a bachelor
  specialty in the national classifier, code 6002006"*. Vietnam: *"Counted off
  the ministry's discipline list issued 6 June 2022, not off institutions"*.
  Philippines: *"CHED sets national standards for a Bachelor of Arts in English
  Language Studies"*. On `linguistics`, Tanzania's nine rows are all *"TCU
  register of accredited programmes"* and Uganda's eight are the *"National
  Council for Higher Education's register of accredited academic programmes"*.
  Indicative count on `degreeSubjects`: 11 (AZ CO DJ EC ID PH SO TG TR UG VN).
- **third-party directory** — 8 `degreeSubjects` entries are WHED/IAU field
  lists: BF BJ CM ER GA MR NA SN. Burkina Faso: *"Universite Joseph Ki-Zerbo's
  WHED record lists English Studies and Germanic Studies"*. These are lists of
  *fields of study*, not of awards, and coding them as `own degree` on axis A
  would be inventing a degree. Eritrea's `linguistics` note says the trap
  outright: *"the source is the Eritrean Ministry of Information and names
  undergraduate DEPARTMENTS, not degree titles, so no award name is recorded"*.
- **sector census or aggregate** — United States: *"A census of 2,455
  institutions and 258 languages, autumn 2021"*. Australia: *"That figure is a
  Group of Eight count reported in the 2018 NSW review"*.

**Discriminates?** Yes, and it is the axis I would build first, because it
changes how every other column should be read. Roughly 85% sit on "one
institution's own listing", so it is a ~85% column — but unlike axis A the 15%
tail is the part that is currently being silently mixed with the rest.

### D. `scope_of_claim` — Does the claim cover the system, or one institution?

Values `system-wide` / `single institution`. The corpus is unambiguous about the
answer and almost silent about admitting it. Exactly 4 entries say so: Bhutan
*"Sourced at one institution, Paro College of Education"*; Singapore *"Sourced at
one institution, NTU's National Institute of Education"*; Pakistan *"Sourced at
one campus list: the BS programmes of NUML's Main Campus"*; Sweden *"That is
Uppsala's Department of Modern Languages, not a count for Sweden as a whole"*.

On `linguistics` the same shape is measurable rather than confessed: **107 of 159
entries (67%) name exactly one institution**, and 52 (33%) name more than one, up
to 8 (Nigeria). All 159 name at least one; **not one entry uses the
`institutions`-count-with-blank-`institution` form** that the field hint provides
for a source that gives only a total.

A column coded from what entries *admit* would come out 97% on one value and
would measure the corpus's honesty, not the systems. A column coded from what the
prose *shows* is worth having, and for `linguistics` it needs no coding at all —
it is countable from the stored rows today.

### E. `disciplinary_home` — Where does the subject sit institutionally?

Applies to `linguistics`. **This one has a grain problem; see section 5.**

- **its own department or institute** — Germany: *"Universität Leipzig, Institut
  für Linguistik"*. Türkiye: *"Independent department at DTCF by decisions of
  December 1991; two anabilim dalları, Genel Dilbilim and Uygulamalı Dilbilim.
  From 1936 it was a compulsory course inside Türk Dili ve Edebiyatı"*.
  Bangladesh: *"linguistics sits in its own department, running since 1992"*.
- **inside philology or letters, with no unit of its own** — Armenia: *"general
  linguistics at YSU sits in the Chair of the Armenian Language History and
  General Linguistics, not in a linguistics department"*. Azerbaijan: *"trained
  by the Department of Azerbaijani Linguistics, Faculty of Philology; the same
  faculty lists a separate Department of General Linguistics"*. Kyrgyzstan: *"the
  same faculty's master's is in Philology, not Linguistics"*.
- **inside a non-language discipline** — UAE: *"housed in the Department of
  Cognitive Sciences, which is built around psychology, linguistics and
  philosophy"*. Ethiopia: *"Two-year MSc run by the School of Information
  Science, not the linguistics department"*. Bulgaria: Компютърна лингвистика at
  the Факултет по математика и информатика, *"entry from mathematics or
  informatics bachelor degrees"*. Sierra Leone: all three Njala rows *"Listed
  under the School of Education"*.
- **inside a language-and-literature degree only** — Guam: *"one of the three
  emphases of the BA in English; the university lists it as a named degree option
  and has no free-standing linguistics major"*. Taiwan: *"no linguistics degree
  here: syntax (句法學) and phonology (音韻學) exist only as electives inside the
  foreign languages bachelor"*.
- **not stated**.

**Discriminates?** 101 of 159 entries (63%) say nothing I could read as a home,
so this would be a 63%-silent column. That is a defensible finding rather than an
error — the field hint never asks for the department — but it should be a
deliberate result. The 58 that do speak split roughly 25 own-unit / 33
hosted-elsewhere on an indicative pass.

### F. `absence_recorded` — Does the entry report a checked absence, and of what?

This is the column I would argue hardest for, because the information is in the
corpus, it is unit-grained, and today it is recorded nowhere countable — the
`absences` flag is 0 on all 159 and all 152.

- **no such degree at any level** — Belize: *"no linguistics degree: the Arts
  Department offers programs in English and History, and the Bachelor in English
  is where linguistic structures are studied"*. Cuba: *"No separate linguistics
  degree: the carrera de Letras integrates linguistic sciences,
  theoretical-literary studies and classical letters"*. Iraq: *"No linguistics
  degree found: academic study of Arabic divides into two main branches,
  literature and language-and-grammar, only at master and doctorate level"*.
  Greenland: *"Not a linguistics degree: one programme covering three fagområder
  — sprog, litteratur og medier"*. Djibouti: *"the arrete lists NO linguistics
  filiere"*.
- **absent at one level only** — Thailand: *"No undergraduate major in
  linguistics"*. Congo: *"one of three Sciences du langage master specialities;
  no licence in Sciences du langage listed"*. Mauritius: *"The faculty's
  postgraduate list carries no language or linguistics master's"*. Myanmar: *"the
  department has no degree of its own and otherwise teaches core linguistics
  inside language degrees"*. São Tomé and Príncipe: *"the whole university
  catalogue holds 20 courses and nothing above licenciatura level"*.
- **exists, but not as a degree** — Honduras: *"not a linguistics degree in its
  own right: Lingüística is an orientation within the Letras licenciatura,
  alongside one in Literatura"*. Brazil: *"Not a degree: since 2002 IEL supplies
  8 Linguística disciplines to the Fonoaudiologia curriculum run with FCM"*.
  Guatemala: *"Técnico, a sub-degree qualification of the same school, so it sits
  at no bachelor/master/doctorate level"*.
- **sole provider** (the mirror image, and a different claim) — Nepal: *"the only
  department in Nepal offering these courses"*. Philippines: *"Department says it
  is the only one in the country housing degree programs at BA, MA and PhD
  levels"*. Faroe Islands (`degreeSubjects`): *"The University of the Faroe
  Islands calls itself the only institution in the world doing this"*.
  Netherlands: *"It is the only university in the Netherlands where Frisian can
  be studied"*.
- **no absence reported**.

Hand-checked, 18 `linguistics` entries carry at least one explicit checked
absence: BR BZ CG CU DJ GL GT GU HN IQ MM MU SC SO SS SZ TH TW. An indicative
regex returned 20 by also catching SD and NP, whose notes are about sourcing and
sole provision — stated because it shows why the count must be hand-made. On
`degreeSubjects`, 7: BB BW ET FM JM LC MP TW, e.g. Botswana *"Kiswahili,
Ikalanga, Setswana, IsiZulu and Shekgalagari run as proficiency courses, not
degrees"*; Saint Lucia *"Kwéyòl and Mandarin appear there only as certificates,
not as degrees"*; Ethiopia *"Arabic appears there only as short-term training,
not as a degree"*.

`none` is not `not stated` here and the corpus keeps them apart already: Iraq's
*"No linguistics degree found"* is a finding; the 51 units with an empty
`linguistics` field are not.

### G. `language_kind` — What kind of language is the degree subject? (LIST)

Applies to `degreeSubjects`. This is the axis that survives the
"don't code the name" rule: code what kind of language it is, not which one.

- **state or official language of the system** — Denmark *"bachelor i dansk"*;
  Laos *"Bachelor of Letters in Lao language and culture"*; Somalia *"The
  Bachelor of Somali Language is a four-year programme in its own department"*.
- **indigenous or minoritised language of the same system** — Chile *"Mapuche
  language and culture is a degree in its own right at UC Temuco... The language
  is mapunzugun, taught towards its revitalisation"*; Germany *"Sorbian studies
  is taken as a degree in its own right at the University of Leipzig"*;
  Netherlands *"Groningen runs a bachelor in Frisian language and culture"*;
  Poland *"Gdansk's etnofilologia kaszubska centres on fluent spoken and written
  Kashubian"*; New Caledonia *"The Kanak languages taught are Ajie and Paici,
  plus Drehu and Nengone in the Loyalties"*; Paraguay *"Guaraní can be taken as a
  licenciatura in its own right"*.
- **sign language of the system** — Brazil *"Libras is a full degree subject: a
  licenciatura plena in Letras: Libras"*; Lithuania *"Students there can branch
  into Lithuanian Sign Language and sign studies"*; Namibia (`linguistics`)
  *"Bachelor of Arts in Namibian Sign Language Honours... a national sign
  language as a degree subject"*.
- **foreign or international language** — the commonest, 101 of 152 entries name
  at least one.
- **classical or liturgical language** — Guinea *"Arabic language and
  civilisation is a licence under the LMD adopted in 2007"*; Slovenia
  (`linguistics`) *"historical-comparative Indo-European, ten old Indo-European
  languages"*.

**Discriminates?** Yes, and it is the only axis here that is genuinely
informative on the majority of entries. Indicative counts over prose: indigenous
or minoritised 56 (37%), sign language 6 (4%), international 101 (66%). These are
keyword counts over a list of language names and will both over- and under-fire;
they are a floor for "this value exists", not a distribution.

**Must be a list** — see section 4.

---

## 3. Discrimination and scoring, summarised

| axis | field | commonest value's share | verdict |
|---|---|---|---|
| A `standing` | degreeSubjects | ~79% `own degree` | thin; the 14-entry tail is the payload |
| B `level_reached` | degreeSubjects | 51% ceiling = bachelor, 25% `not stated` | usable |
| B `level_reached` | linguistics | — | **already stored; do not code** |
| C `claim_basis` | both | ~85% one institution's listing | build it anyway; it reframes all others |
| D `scope_of_claim` (as admitted) | both | 97% | **do not build**; it measures our honesty |
| D `scope_of_claim` (as shown) | linguistics | 67% single institution | countable from stored rows today |
| E `disciplinary_home` | linguistics | 63% `not stated` | grain problem, see §5 |
| F `absence_recorded` | both | ~88% `no absence reported` | build it; nothing else records this |
| G `language_kind` | degreeSubjects | no majority value | best axis in the set |

Nothing above is a score. No value carries a weight, no column sums, and axis B
is ordinal only because award levels are ordinal — turning "doctorate" into a 3
and averaging it across a region is a separate decision and not one this scan
makes.

---

## 4. Which columns must be LISTS

- **`language_kind` (G)** must be a list. Zimbabwe names Kiswahili (foreign),
  Ndebele, Shona and Tonga (indigenous) in one entry: *"The University of
  Zimbabwe offers language majors in Kiswahili, Ndebele, Shona and Tonga"*. South
  Africa names nine official languages plus Linguistics. Coding one value would
  throw the others away, which is exactly what `exclusions` and `triggers` were
  made lists to prevent.
- **`absence_recorded` (F)** must be a list. Eswatini's three rows between them
  say the live site *"names no language department"*, the graduate list *"carries
  no MA in English, African Languages or Linguistics"*, and the prospectus names
  *"no language major"* — that is an absence at bachelor and at master level, and
  two different kinds of absence claim.
- **`disciplinary_home` (E)**, if it is built at unit grain at all, must be a
  list. Ethiopia has one programme in the linguistics department and one in the
  School of Information Science. Taiwan has NTU's *"Graduate Institute of
  Linguistics"* and, at the same university, no degree at all in the foreign
  languages department.
- `standing` (A), `level_reached` (B) and `claim_basis` (C) take one value each,
  provided B is read as "the highest level this entry reaches".

---

## 5. THE ROW GRAIN — and this is where the pair breaks

Storage holds **one coding object per unit per field**; `store.js` rejects an
array at the field level and `apply-coding.js` merges a single flat row. Two
schemes are already blocked on exactly this — `dld.legalEntitlement` (*one legal
instrument*) and `dld.assessments` (*one assessment instrument*). This pair is at
risk of becoming the third and fourth.

**`he.linguistics` is already a row-grained field.** It is typed `programme` in
`src/domains.js`, and its hint says *"One row per programme PER INSTITUTION where
the institution is known"*. So the grain question is not hypothetical: measured
over all 159 codable national entries,

| programme rows in the entry | entries |
|---|---|
| 1 | 31 (19%) |
| 2 | 33 |
| 3 | 35 |
| 4 | 28 |
| 5–8 | 24 |
| 9–17 | 8 |

**128 of 159 entries (81%) hold more than one programme row.** Largest: New
Zealand 17, Canada 13, Kenya 11, Nigeria 11, France 11.

**Distinct named institutions per entry:**

| institutions named | entries |
|---|---|
| 1 | 107 (67%) |
| 2 | 31 |
| 3 | 9 |
| 4 | 4 |
| 5 | 3 |
| 6 | 4 |
| 8 | 1 (Nigeria) |

**52 of 159 entries (33%) name more than one institution.** That is the number
the grain decision turns on.

Consequences, stated plainly:

- **Any column whose value is a property of a programme or of an institution
  cannot be coded on `he.linguistics` today.** That rules out `disciplinary_home`
  (E) as written, and it rules out `orientation` as a coding column — which the
  field already knows, since `orientation` lives on the row rather than on the
  entry, and Israel's note says why: *"Two tracks, functional linguistics and
  generative linguistics, so no single orientation"*. At unit grain Hebrew
  University has no orientation value; at row grain it has two.
- **I am not proposing `disciplinary_home` as a column.** On the 107
  single-institution entries it would code cleanly and mean one institution's
  arrangement; on the 52 multi-institution entries it would either flatten
  (Ethiopia's information-science MSc disappears behind its linguistics
  department) or need a list whose members no longer attach to anything. A list
  at unit grain is the least-bad version and it is still a downgrade from data
  the field already holds.
- **Axes A, C, F and G are unit-grained and fit.** "Does this system have a
  linguistics degree at all", "what kind of source says so", "what absence was
  checked", "what kind of language is the subject" are all properties of the
  system, answerable once per unit however many programmes the entry lists.
- **Axis B does not need coding on `linguistics` at all** — highest and lowest
  level present are already derivable from the stored `level` field, exactly
  rather than by reading. 50 entries with no bachelor and 91 with no doctorate
  are facts in `data/he.json` today.

**`he.degreeSubjects` is prose and is unit-grained**, so it is the safer of the
two. But it is under the same pressure from the other side: an indicative count
finds only 18 of 152 entries (12%) naming two or more institutions, and that
regex undercounts badly because it misses acronyms and bare names (UWI Cave Hill,
Makerere, Inalco, Chulalongkorn, NUML, Te Wānanga o Raukawa all slip through).
Hand-checked multi-institution entries include Guinea (*"shared by the
universities of Sonfonia, Kankan and Labé"*), Taiwan (*"Foreign-language
departments also at NCKU, NKNU and NTPU"*), Algeria (*"Four departments of langue
et culture amazighes run; Tizi-Ouzou has about 2,700 students"*), New Zealand
(Waikato, Te Wānanga o Raukawa, Auckland), Bahrain, Iran, Kyrgyzstan, Lebanon,
Mozambique, Saudi Arabia, Singapore. Treat 12% as a floor. Even so, on axes A, C,
F and G the unit is the right row for `degreeSubjects` and I do not think the
grain blocks it.

---

## 6. Entries that would NOT fit, named

**Not about degree provision at all** (axis A has no value for these and inventing
one would be a guess):

- **CA Canada** — the whole `degreeSubjects` entry is about bursary and exchange
  programmes: *"CCMEC administers the Explore, Destination Clic and Odyssey
  bursary and monitor programs"*. Nothing about degrees. This reads like content
  filed against the wrong field.
- **UA Ukraine** — *"Institutions must enable study of a minority language as a
  subject on request"*. An obligation on institutions, which belongs to
  `requiredStudy`, not to whether a language is a degree.
- **FI Finland** — the entire entry is *"It can also be taken there as a free
  minor subject"*. A dangling sentence with no antecedent: no language named, no
  institution named, no degree named. Uncodable as it stands, and a candidate for
  repair rather than for a `not stated` cell.
- **GI Gibraltar** — *"The University of Gibraltar Language Centre designs
  English and Spanish courses... from level A2 to C2"*. CEFR courses, not degrees,
  and the entry does not say whether degrees exist.
- **AU Australia** and **US United States** — both are aggregates about the
  *direction* of provision (*"Languages offered by Australian universities fell
  from 66 to 29"*; *"Enrolments fell 16.6 per cent between autumn 2016 and autumn
  2021"*). Axis A has no answer; axis C's `sector census` value exists for
  precisely these two, and a coding that gives them `own degree` would be false.
- **SE Sweden** — self-disqualifying: *"That is Uppsala's Department of Modern
  Languages, not a count for Sweden as a whole"*.
- **AT Austria** — the `degreeSubjects` entry is entirely about Austrian Sign
  Language certificate courses at Klagenfurt. Austria's `linguistics` rows run
  Vienna, Innsbruck and Salzburg at BA and MA, so `sub-degree only` would be
  wrong about Austria while being right about the entry. **This is the clearest
  case of an entry-level value that must not be read as a system-level one.**

**`linguistics` rows that are not programmes**, so any programme-derived column
has nothing to read (10 entries): **BI CD CF DJ EG ER LR MG MR SO**. These carry
department names in the `subject` slot. DR Congo is the plainest: *"the page names
departments only and states no award, so no level is recorded"*; Mauritania's
*"Langues nationales et linguistiques"* row notes *"The department page is an
empty page stub"*. 9 entries have at least one row with a blank `level` (BR BZ CD
CF GT IQ MG MR TW).

**`linguistics` entries whose only rows are below degree level** (2): **BS**
Bahamas (`minor` only) and **MM** Myanmar (`diploma` only, with *"the department
has no degree of its own"*).

**One further sourcing caveat worth carrying into any pass**: 16 of 159
`linguistics` entries have at least one row read from an Internet Archive capture
or a host that refuses requests (403, 503, TLS failure, bot challenge). Those
notes describe the *source*, not the system, and any regex that counts absences
will fire on them — Sudan and Nepal did in my own indicative pass. Any count of
absences on this pair has to be made by hand.

---

## Two things this scan did not settle

- Whether the 24 `linguistics` entries with no linguistics-named subject (AO AZ
  BI BW BZ CD CF CU DJ ER GL GM GQ GW IQ KM LR MG MU SC SO SS ST SZ) are
  answering a different question from the other 135 — filled with
  language-and-literature degrees because there is no linguistics degree — or
  whether they are the same question answered honestly. That is the "is it taught
  here" versus "what is taught under that name here" split, and the answer is
  **both, unmarked**: 135 of 159 (85%) name linguistics as a subject somewhere,
  24 (15%) do not, and nothing in the data distinguishes "this country's
  linguistics is done inside philology" from "nobody found a linguistics degree".
  The 85/15 figure comes from matching linguistics spellings across 22 languages
  and I had to widen the pattern twice before Arabic, Cyrillic and Mongolian forms
  matched — treat it as indicative.
- Whether `he.degreeSubjects` and `he.linguistics` should share a vocabulary at
  all. Axes A, C, F and G apply to both in the same words, which argues for one
  scheme used twice. But they are not filled on the same units, and `linguistics`
  already holds structurally what `degreeSubjects` states in prose, so a shared
  scheme would be read off different evidence in each field.
