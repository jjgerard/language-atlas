# The 22 thin `not stated` cells, graded

Nine columns were down to fewer than five `not stated` cells. Each of the 22 is
graded **(a)** a mis-coding, **(b)** closable from a document, or **(c)**
genuinely not stated.

    (a) mis-coding          8
    (b) closable, drafted  10
    (c) genuinely open      4

**Columns this takes to zero: five.** `dld.serviceModel.evidence_type`,
`eal.newcomerCriteria.triggers`, `eal.removalCriteria.rule_locus`,
`indigenous.revitalisation.actor`, `dld.outcomesEvidence.scope`.

**Four columns do NOT go to zero**, because a cell on each is a real result that
stands: `dld.funding.funders` (Guernsey), `dld.dischargeCriteria.discharge_basis`
(Cuba), `eal.achievementGap.measure` (Nunavut), `indigenous.materials.charged_to`
(Tanzania).

Three of the eight (a)s are the defect `NOTHING-HERE-VALUES.md` already records
and cannot be written until the maintainer approves a value. **Two more are the
same shape on two columns that note does not list** — see "A fourth and fifth
column with the same gap" at the end.

---

## (a) MIS-CODINGS — the entry answers, `not stated` is false

### eal.removalCriteria.rule_locus — Hong Kong, Monaco, Yemen

All three are on the six named in `research/NOTHING-HERE-VALUES.md`. Confirmed
against the data: the entries coded `exit_mechanism: none established` **and**
`rule_locus: not stated` are exactly Bahrain, Hong Kong, Monaco, the Marshall
Islands, Vanuatu and Yemen — the same six, no more and no fewer. **Not
researched**, per the brief.

**Hong Kong** — the entry's own `removalCriteria` prose:

> No exit gate found
> Support continues through the curriculum modes as needed, rather than by pass or fail

**Monaco** — the whole field is one line:

> No exit criteria or maximum duration are documented

**Yemen**:

> Nothing found: no designation exists, so no exit criteria exist

Each says there is no rule, so there is nowhere for it to be made. `not stated`
means "the entry was read and does not answer"; these answer. The value that is
missing is the one `NOTHING-HERE-VALUES.md` describes, and until it exists these
three cannot be corrected.

Note that `none established` on the neighbouring `exit_mechanism` column is not
itself incompatible with a locus — Ireland carries `national statute` beside it
and Scotland `institutional`, because both entries say where the *decision*
sits even with no rule. Hong Kong, Monaco and Yemen say nothing of the kind.

### eal.newcomerCriteria.triggers — Wallis and Futuna

`designation` on this entry is **`none in use`** — "Checked, and the system
designates nobody: no term, and no rule that picks a pupil out for this question
either". The gloss on `triggers: not stated` is:

> A category exists and the entry does not establish what puts a pupil in it

**No category exists.** The value's own precondition is false, so `not stated`
is a false coding rather than a missing one. What the entry says instead:

> the graduated entry began as a 1998 experiment generalised in 2001 and 2003

`NOTHING-HERE-VALUES.md` reads the same entry the same way — Wallis and Futuna,
"whose graduated entry runs by YEAR GROUP so no individual child is picked out".
A rule that admits a whole *petite section* picks out no pupil, so there is no
trigger to name.

Worth knowing before this is recoded: of the 24 entries now carrying
`designation: none in use`, **23 carry a positive `triggers` value anyway**
(12 `home language`, 5 `demand threshold`, and so on). Wallis and Futuna is the
only one with `not stated`. Either those 23 are the residue of the sixteen
contradictions the note describes, or `none in use` and a trigger are compatible
after all — that is one decision, and it governs this cell.

### dld.serviceModel.evidence_type — Albania, Malaysia, Saudi Arabia

The `not stated` gloss is "The entry does not make clear what kind of source
this is". All three entries make it clear, in their own first or last line. The
corpus precedent for exactly this is `study or project`, used on 46 entries and
routinely carried by a bullet that names the source kind — Libya, "An absence
stated by the editorial, not a Libyan government statement"; Laos, "Evidence is
a 2020 cleft-palate study"; Mongolia, "The evidence here is a 2019 ministry
project report, not standing policy"; Gambia, "A single directory entry rather
than a survey".

**Malaysia** — the entry says it twice:

> No service model can be traced to the cited sources; only research use
> Its recorded uses are student projects on Malay-English bilingual children

and `data/field-sources.json` confirms the one source behind the field is the
LITMUS SRep task list, quoted as *"Masters Project - Sentence Repetition and
Non-Word Repetition among bilingual (Malay-English) Malay children"*.

**Saudi Arabia**:

> The network's stated aim is research on second language learners

The field's two attributed sources are the LITMUS network home page and the
SRep task list, and the attributed quote is the network's own aim: *"The LITMUS
network aims to expand the study of typical and atypical language development in
second language learners"*.

**Albania**:

> Delivered by various specialists, usually language specialists (Action wording, not Albanian)
> No Albanian institution, caseload or funding route is named in either cited source

The parenthesis is the whole finding: the words are the COST Action's, not
Albania's. `field-sources.json` attributes the field to one document, *COST
Action IS1406, Language Surveys and Definition Documents, Albanian version*.

One caution on Albania, because it is the only one of the three that is not
clean. `practitioner survey`'s gloss names *"the COST IS1406 2017 survey, carried
on 30 entries with its own n each"*. Albania's source is IS1406 — but the
**definition document**, not the practitioner survey: all 32 entries coded
`practitioner survey` open with the identical formula "Practitioner-reported,
COST IS1406 survey 2017, n = ...", and Albania has no n and does not. So it is
`study or project` on the shape of the source, not `practitioner survey` on the
name of the Action. That is a judgement to confirm, not a mechanical recode.

### indigenous.revitalisation.actor — Egypt

Egypt's `activity` is `none established` and its `status` is `none established`.
The entry's first line:

> PEER's ethnic and linguistic groups section describes no revitalisation programme at all

If there is no programme, there is nobody running it — the entry reaches the
question and answers it. `actor: not stated` says it did not reach the question.
`REVIT_ACTIVITY` and `REVIT_STATUS` both carry `none established`; **`REVIT_ACTOR`
and `REVIT_FUNDING` do not**, which is why the answer had nowhere to go.

This is not a one-off. Of the four entries whose revitalisation is coded
`none established` on activity or status, two carry a real `state body` (Bosnia
and Herzegovina, Belarus — a state body does something adjacent) and **two are
stranded on `not stated`: Egypt and Tunisia**. Tunisia is not on this worklist
but is the same cell.

---

## (b) CLOSABLE — drafted in `done-thin.json`

All ten passed `research/tools/terr-verify.js` run over this directory, except
Russia — see its note. Every bullet is an **ADDITION** to a field that already
holds text, so `fl/apply.js` will report *"would overwrite"* for each: that guard
is doing its job and needs the person it asks for. The merged field text is given
below each unit so it can be pasted rather than reconstructed.

### eal.newcomerCriteria.triggers — Pennsylvania

The cited Pennsylvania Code section answers the question the entry left open.
**22 Pa. Code § 4.26**:

> Every school district shall provide a program for each student whose dominant
> language is not English

Merged field (2 bullets):

    Identification within 30 calendar days of term start, 14 days mid-year
    Districts must serve each student whose dominant language is not English

The PDE page the entry also cites is about *reclassification and exit*, not
identification, so it adds nothing here.

### eal.newcomerCriteria.triggers — West Virginia

The entry says "English learner status is defined by the federal definition,
reproduced in rule" and stops. The rule reproduces it in full at
**W. Va. Code R. § 126-15-2.1**:

> who was not born in the United States or whose native language is a language other than English
> who is a Native American or Alaska Native, or a native resident of outlying areas
> whose difficulties speaking, reading, writing, or understanding the English language may be sufficient to deny the individual

Merged field (5 bullets, at the limit):

    English learner status is defined by the federal definition, reproduced in rule
    Parent notification within 30 days of term start or two weeks of placement
    Not born in the United States, or a native language other than English
    Or a Native American, Alaska Native or native resident of the outlying areas
    And difficulties in English that may deny the ability to meet state academic standards

**Source substitution, deliberate.** The entry cites the Secretary of State's
copy at `apps.sos.wv.gov/.../readfile.aspx?DocId=55201&Format=WORD`. That url is
a **.docx** — the gate extracts PDF and HTML and has no zip reader, so every
quote on it would read as invented. `Format=PDF` on the same DocId answers 200
with 3.89 MB of genuine `%PDF` bytes and **extracts to zero characters**: it is
an image-only scan. Both of the register's own formats are unusable by this
pipeline, so the drafted evidence cites Cornell LII's republication of the same
section, which serves the rule text at 200. Worth a line in `BLOCKED.md`.

### eal.newcomerCriteria.triggers — Belgium — French Community

**This one supersedes existing prose rather than adding to it.** The entry says:

> The DASPA decree that defines the newcomer category could not be retrieved
> No criterion, threshold or duration is evidenced, so none is proposed

The decree has now been retrieved, so both of those lines are false and must go.
`gallilex.cfwb.be`, which the entry cites, is in `BLOCKED.md` — 200 with a
244-byte BIG-IP rejection for every path. The substitute is
`etaamb.openjustice.be`, the consolidator `BLOCKED.md` already names, carrying
the Moniteur text at numac 2019040713. Art. 2 defines three categories:

> être arrivé sur le territoire national depuis moins d'un an
> fréquenter un établissement scolaire organisé ou subventionné par la Communauté française depuis moins de 3 mois
> ne pas connaître suffisamment la langue de l'enseignement pour s'adapter avec succès aux activités de sa classe d'âge
> Le Gouvernement détermine les modalités permettant de vérifier la connaissance suffisante de la langue d'enseignement

Replacement field (5 bullets) — the two Eurydice lines are kept, the two
retrieval-failure lines are dropped:

    A primo-arrivant is a refugee claimant, a DAC-list national or a stateless child under 18
    The primo-arrivant must have arrived on national territory less than a year before
    An assimilated pupil has been in a Communauté française school under three months
    And does not know the teaching language well enough to follow their own age class
    The Government sets how sufficient knowledge of the teaching language is verified

That is over five bullets if the two surviving Eurydice lines are kept as well,
so this field needs the maintainer's choice about which to hold.

### eal.removalCriteria.rule_locus — Lithuania

**Lithuania is NOT one of the six in `NOTHING-HERE-VALUES.md`**, and reading it
found something that goes further than this cell.

The entry says:

> Exit criteria are not centrally specified
> No fixed national timeline found

**There is a fixed national timeline.** Annex 10 of the 2023-2024 and 2024-2025
general education plans — order V-586 as amended by V-1036 of 1 August 2023,
which is a binding ministerial order — says:

> ne ilgiau nei vienus metus išlyginamojoje klasėje

("no longer than one year in a levelling class"), and for a pupil in a
minority-language school:

> sudaromos sąlygos mokytis lietuvių kalbos individualiai arba laikinojoje grupėje vienus metus
> arba tol, kol mokinio lietuvių kalbos gebėjimai bus pakankami mokytis lietuvių kalbos ir literatūros dalyko bendros paskirties klasėje

So the rule is national, the mechanism is a one-year cap plus a proficiency
sufficiency test, and `rule_locus` is answerable. `e-tar.lt`, which the entry
cites, is in `BLOCKED.md` (403 on plain GET); `e-seimas.lrs.lt` serves it.

Merged field — **"No fixed national timeline found" must be dropped**, it is now
contradicted, leaving 5 bullets:

    Exit criteria are not centrally specified
    Lithuanian proficiency tracked against a CEFR A1–B2 framework in dedicated materials
    Support ends when the pupil's Lithuanian suffices to study the subject in a general class
    A levelling class lasts no longer than one year under the national general education plans
    In a minority-language school the individual or temporary-group route runs one year

The first line probably wants revisiting too, but it is defensible as written:
the *criteria* are less specified than the *duration* is.

**A vocabulary defect found on the way.** `EXIT_MECHANISM`'s `none established`
gloss reads *"Checked, and the system sets no exit rule of any kind, at any level
(Ireland, Lithuania, Monaco)"* — and Lithuania's own `exit_mechanism` is coded
`not stated`, not `none established`. The gloss names as an example an entry that
does not carry the value. On the evidence above the **gloss is the thing that is
wrong**: Lithuania does set an exit rule, nationally. The same gloss's refusal
clause ("NOT for a system that sets no NATIONAL rule and leaves it below") also
points away from Lithuania. One name to strike from one gloss.

### dld.serviceModel.evidence_type — Afghanistan

Unlike its three column-mates, Afghanistan's prose names no source kind — only
"(a pre-2021 picture)", which is about currency, not provenance. The cited
UNICEF profile says what it is on its own first page:

> This country profile on Afghanistan was developed as part of a regional
> mapping study on disability-inclusive education commissioned by the UNICEF
> Regional Office for South Asia

and it is the source of the entry's service claim, word for word: *"In schools
for children with visual, hearing and speech impairments"*.

Merged field (3 bullets):

    Segregated schools existed for visual, hearing and speech impairments (a pre-2021 picture)
    No speech-language therapy workforce or training programme was located
    The country profile is part of a UNICEF regional mapping study, not a government statement

### dld.funding.funders — Jharkhand

The entry carries one line off the Vidhi review and stops. The same review, two
sentences earlier, answers who pays:

> While 17 states have a provision for free special learning, support material,
> and equipment in their State RTE Rules

and its footnote 89 lists those 17, **Jharkhand among them**. The aid route is
costed in the same passage:

> ALIMCO is reimbursed 40% of the expenditure of the ADIP-SSA Programme by the
> State Government Authorities and 60% of the expenditure through grants under
> ADIP Scheme

Merged field (3 bullets):

    Standing Committee: no ADIP-SSA aids camp ran in Jharkhand from 2015-16 to 2017-18
    One of 17 states whose RTE Rules provide free special learning, support material and equipment
    ADIP-SSA aids are distributed at ALIMCO camps, 40% state-reimbursed and 60% ADIP-funded

The second added bullet describes the scheme, not delivery in Jharkhand — the
existing first bullet already says no camp ran there, and that hedge is the point
of keeping it first.

### dld.funding.funders — Marshall Islands

The PEER profile the entry already cites states the funding route outright:

> The Marshall Islands receive funds under the United States government's
> Individuals with Disabilities Education Act for services to special education
> students

Merged field (3 bullets):

    Source describes special-needs provision generally, never language disorder
    Disability Coordination Office helps the disabled persons organization access funding
    US IDEA funds are received for services to special education students

Note for whoever codes it: an external government's statute paying for another
state's provision is not obviously any single `FUNDERS` value. `donor or ngo` is
glossed "External donors, international agencies or non-state organisations",
which fits the *direction* but not the *kind* of body. That is a vocabulary
question, not a research one.

### dld.dischargeCriteria.discharge_basis — Russia

The entry records only who signs. The instrument it already cites — Р-75,
п. 2.6 — records what ends support:

> Отчисление обучающихся с логопедических занятий осуществляется по мере
> преодоления речевых нарушений, компенсации речевых особенностей конкретного
> ребенка

and п. 2.5 records the cycle that produces the decision:

> Логопедическая диагностика осуществляется не менее двух раз в год, включая
> входное и контрольное диагностические мероприятия

`discharge_basis` is a list, and both are operative here — a re-evaluation cycle
and a decision on continuing need — which is the eleven-of-fifty-nine case the
vocabulary's own note describes.

Merged field (4 bullets):

    Enrolment and discharge run by administrative act of the head of the organisation
    Pupils leave logopedic sessions as the speech difficulty is overcome or compensated
    Logopedic diagnosis runs at least twice a year, an entry and a control assessment
    Enrolment on logopedic sessions may be made throughout the school year

**RUSSIA IS THE ONE UNIT THE GATE COULD NOT CHECK, and it is a network fault,
not a bad quote.** `legalacts.ru` answered this session at **HTTP 200 with
102,132 bytes** and the full Положение; the three quotes were read off that body.
Roughly an hour later the local resolver (`ns1.ulster.ac.uk`) began timing out on
every `.ru` host — `legalacts.ru`, `base.garant.ru` and `docs.edu.gov.ru` all
returned `curl: (6) Could not resolve host`, including the two that had answered
earlier. The gate then logged `source returned 0` and dropped all three bullets.

The quotes were re-checked **offline against the exact bytes the host served**,
using the repo's own `quoteOn()` and `strip()` from `terr-verify.js`: all three
match. **Re-run the gate for Russia alone when DNS is working**; do not read the
drop as an invented quote. This is the failure mode `terr-verify.js`'s own
comments warn about — "a failed fetch and an invented quote are different
findings and a reader of this log must be able to tell them apart" — and the
three mirrors already on the entry give three chances at it.

### indigenous.revitalisation.actor — Azerbaijan

The entry describes textbooks appearing and lessons being cut, and names nobody
doing it. The CoE Fifth Opinion it cites, para. 147:

> the authorities have engaged in a programme to create, update and renew a
> certain number of textbooks in all these languages, which is to be welcomed as
> it requires a substantial effort from the authorities

Para. 141 names the body for one language — Lezgin representatives had "recent
exchanges with the Ministry of Science and Education about obtaining new
textbooks" — and footnote 131 attributes the hour cut to an Order of the same
Ministry. So the actor is a state body and the source says so three ways.

**Bullet-budget collision: this field already holds five bullets**, so the added
one takes it to six and rule 2 forbids that. One must go. My recommendation is
to drop

    Lezgin also taught in Baku in the context of Sunday schools

because para. 147 assigns the Sunday schools to "national minority
organisations" rather than to the programme this field is recording, so it is the
one bullet describing a different actor than the rest of the field. That is a
recommendation, not a draft: `done-thin.json` carries only the new bullet.

### dld.outcomesEvidence.scope — Australian Capital Territory

`scope` asks what the source covers, and the ACT Auditor-General's report states
its own, at para. 1.70:

> The objective of the audit was to assess whether the Education Directorate is
> effective in providing supports for students with disability in ACT public
> schools

Merged field (3 bullets):

    The Auditor-General found the diagnosis requirement burdens families and schools
    Schools reported long waits and significant expense to reach specialists
    The audit's stated object was supports for students with disability in ACT public schools

One honest qualification, because the standard hedge does **not** hold here. 49
of 66 `outcomesEvidence` entries carry "never reaches language disorder" in those
exact words, and this audit does not qualify: it names "speech and language
pathologists" among the allied health staff schools receive, and runs a
professional-learning module on "speech, language and communication needs". The
audit's *object* is disability generally; it is not silent on language. The
bullet says only what the quote says, and the hedge has deliberately not been
written.

---

## (c) GENUINELY NOT STATED — a real result, and it stands

### dld.funding.funders — Guernsey

The entry answers `family_pays` and not `funders`, and that is the honest state.
Its whole funding field is:

> The team provides regular free drop-in assessment clinics

which is the gov.gg SLT page verbatim ("The Speech and Language team provide
regular free drop-in assessment clinics"). **Four documents were read and none
says who carries the cost**: the gov.gg SLT page, the 3 Tier Model of Provision
(2021) — whose only "fund"/"commission" hits are RCSLT bibliography entries — the
States resolution of 19 December 2017 on Billet d'État No II, which is about
secondary and post-16 structure and does not contain the word "speech", and the
Children & Family Community Services index.

What the index *does* show is that "Children and Young People's Speech and
Language Therapy" is listed under Health, Social Care & Wellbeing → Children &
Family Community Services. **That is a navigation breadcrumb, not a funding
statement**, and coding the health budget off it would be exactly the inference
CLAUDE.md forbids. The lead for whoever picks this up is the Committee for Health
& Social Care; `guernseylegalresources.gg`, which would hold the enacted
instruments, is in `BLOCKED.md` as a Cloudflare 403 on every path including root.

### dld.dischargeCriteria.discharge_basis — Cuba

The cited PEER profile names the instrument and not the basis:

> la Resolución 141 de 2001 que establece la preparación de los alumnos con NEE
> con carácter transitorio para la continuidad de estudios a partir del momento
> en que son escolarizados en centros de enseñanza general y en centros de
> educación especial

That is a duty to *prepare* children for continuity of studies. It fixes no
criterion, no decider, no cycle and no age. The entry's own third line already
says so with the right hedge — "Only unit of the twelve with anything
**resembling** a return-to-mainstream principle" — and that hedge is the finding.
Closing this needs the text of Resolución 141 de 2001 itself, which is not on the
profile and was not located.

### eal.achievementGap.measure — Nunavut

> No verified gap figures retrieved for Nunavut
> Inuktut Protection Act s.8 obliges government to measure Inuktut attainment

There is a statutory duty to measure and no published measurement. Note that
`not stated` and `no measured gap` are **not** interchangeable here:
`no measured gap` is glossed "The entry **establishes** that no comparison by
language exists", as Guyana and Suriname do in terms. Nunavut's line says figures
were not retrieved, which is a fact about the search and not about the territory.
Nothing reachable closes the difference — Nunavut is outside Canada's PISA
sample, its published graduation rate (38.4% in 2025) is not disaggregated by
language, and no territorial assessment result by home language was located.

So the cell stands as `not stated`. Promoting it to `no measured gap` would need
a source that says no such comparison is published, and that source is what is
missing.

### indigenous.materials.charged_to — Tanzania

The entry answers question 1 of the field's four and no more. Its three bullets
all sit in slot 1 (`slots: [1,1,1]`), and `materials`, `orthography` and
`charged_to` are all `not stated` together — which is coherent, not a backlog.

> Read 2014 policy, 2023 edition: the teaching languages are Kiswahili and English only

It is tempting to read that as "nobody is charged, because there is nothing to
produce", and on the `curriculum` column the entry does say `none established`.
But `materials` is `not stated`, not `none established`, so the entry has not
established that no materials exist — only that no community language is taught.
Inferring the rest is the move CLAUDE.md forbids.

The Trudell UNICEF review the field is attributed to was read for this: it has
**no** occurrence of "mother tongue", "ethnic community", "textbook" or
"curriculum", and its five "materials" hits are all about English-language book
donations by CODE International and READ International. It does not answer the
question.

If the maintainer would rather record this positively, the route is the
documented-absence flag over the whole field, not a coding value — and it would
want `materials` settled first.

---

## A fourth and fifth column with the same gap

`NOTHING-HERE-VALUES.md` lists three columns that cannot say "there is nothing of
this kind here", plus `dld.legalEntitlement.obliges` found the same day. This
worklist turned up two more, and both are small enough to fix cheaply:

**`indigenous.revitalisation.actor`** — Egypt and Tunisia, 2 cells. `activity`
and `status` both have `none established`; `actor` and `funding` do not, so an
entry that says there is no programme has nowhere to put "nobody runs it".
`REVIT_FUNDING` has the identical gap and Egypt is stranded on it too
(`funding: not stated`), so a single addition to each closes both columns.

**`eal.newcomerCriteria.triggers`** — Wallis and Futuna, 1 cell, and it is the
knock-on from the `designation` fix made on 2026-09-28. Adding `none in use` to
`designation` gave that column a way to say a system picks nobody out; `triggers`
still has none, and its `not stated` gloss actively asserts the opposite ("A
category exists"). The 23 other `none in use` entries that carry a positive
trigger need the same decision at the same time — see the Wallis and Futuna
entry above.

Both are the shape the note already argues for, and both are one value.

---

## How this was checked

- Corpus precedent read from `data/*.json`, never from `data/atlas.db` — the
  store warns on every run that the db is behind the files.
- Per-field attribution read from `data/field-sources.json`, which is what
  settled Albania, Malaysia and Saudi Arabia: it names the one document behind
  each `serviceModel` field and quotes the line taken from it.
- Every url status-checked with
  `curl -sS -o /dev/null -w '%{http_code} %{size_download} %{content_type}' -L`,
  never by byte count. Two of the repo's recorded traps fired again: the WV
  register's PDF is a 3.89 MB 200 that extracts to **zero characters**, and
  `gallilex.cfwb.be` timed out rather than serving its 244-byte rejection.
- `research/tools/terr-verify.js` run over this directory: 10 units, 10 urls,
  **9 verified with 0 dropped**, Russia dropped on DNS failure and re-checked
  offline against the served bytes with the gate's own `quoteOn()`.
- `verified.json` was removed after the run so this directory holds only the two
  deliverables; re-running the gate regenerates it.
