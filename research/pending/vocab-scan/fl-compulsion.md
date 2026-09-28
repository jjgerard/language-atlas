# fl compulsion — vocabulary scan (step 1 of derive-vocabulary; no scheme written)

Target: `fl.primaryRequirement` (194 codable national), `fl.secondaryRequirement`
(99), `fl.upperSecondary` (190). The brief's hypothesis was that these are one
question asked at three stages. **They are not**, and section 0 is that finding
rather than section 6, because it changes what the other axes can be.

Read via `research/tools/coding-dump.js`, region-stratified:

- `primaryRequirement` — 93 entries at `--from 0, 40, 80, 100, 120, 140, 160, 185`
- `secondaryRequirement` — 42 entries at `--from 0, 25, 50, 75`
- `upperSecondary` — 40 entries at `--from 0, 40, 85, 130, 165`

Every region tag the dump prints appears in the sample except Central Asia on
`secondaryRequirement` (that field has few entries anywhere outside Europe).

**All numbers marked *(indicative)* come from pattern-matching the prose and are
wrong in a known direction: the patterns fire on negations.** `\bleaving
(school|exam)\b` counts Senegal's "PEER names no language requirement for
leaving school" as a leaving-exam mention. Where a count carries weight below I
have also read the named entries; where I have not, I say so. Counts of exact
Eurydice boilerplate strings are not indicative — those are exact-substring
matches and are reliable.

Data read from `data/fl.seed.json` (there is no `data/fl.json`), national rows
only unless stated. Nothing was edited.

---

## 0. The three fields are not one question, and `secondaryRequirement` asks a different one

Three separate problems, in order of how much they cost:

### 0a. `secondaryRequirement`'s prose is largely about the SECOND foreign language

28 of its 99 codable entries contain nothing but a Eurydice line, and those lines
are not about whether a foreign language is compulsory. Exact counts:

| line | n | units |
|---|---|---|
| `Never compulsory for all students at any point in secondary` | 4 | AL DE ES SE |
| `Compulsory for all only at upper secondary, from age 14 or 15` | 7 | AT BG HU LI SI SK TR |
| `Two languages compulsory at some point` | 9 | CY FR IT LT MT NL PL PT RO |
| `Second foreign language compulsory from age …` | 3 | GR LU LV |
| `Compulsory for all in lower secondary only` | 1 | DK |
| whole entry is Eurydice boilerplate of some kind | **28** | AL AT BA BG CH CY DE DK EE ES FR GR HU IS IT LI LT LU LV MT NL PL PT RO SE SI SK TR |

`src/coding.js` already settles what those lines mean. `L3_SECOND`, on
`eal.l3Support`, glosses `'at upper secondary only'` as "(Austria, Bulgaria,
Liechtenstein, Norway, Slovenia, Slovakia, Turkiye)" and `'never compulsory'` as
"One is as far as it goes (Albania, Germany, Spain, Croatia, Sweden)". Those are
the same country sets. **The sentence is Eurydice's second-language indicator,
copied onto a field whose label reads "Lower secondary".**

Germany is the proof a reader can check in one screen:

- `primaryRequirement`: "Compulsory from age 6 in six Länder"
- `secondaryRequirement`: "Never compulsory for all students at any point in secondary"
- `upperSecondary`: "Continues to the last or penultimate year of upper secondary, as everywhere but Malta"

A column called "is a foreign language compulsory at this stage" would code the
middle row as *no* for Germany, Spain and Sweden, and the map would then say
those three systems drop foreign languages in secondary school and pick them up
again at 16. This is the `bilingual_handling` mistake again: a column measuring a
different field from the one it is attached to.

### 0b. `secondaryRequirement` is mostly empty, and empty in a patterned way

Of 210 national rows: 98 have prose on all three fields, **91 have prose on
primary and upper secondary and nothing at all on lower secondary**, 5 have
primary only. 110 rows are blank on `secondaryRequirement`. Subtract the 28
boilerplate-only entries and **71 of 210 national systems say anything of their
own about lower secondary.** Any shared column applied to this field will be
unset or `not stated` on two thirds of the corpus.

### 0c. `upperSecondary` has its own boilerplate, and it is the opposite shape

`Continues to the last or penultimate year of upper secondary, as everywhere but
Malta` — 34 of 190, and 22 entries are that line alone (AL AT BG CH CZ DK EE ES
FI HU IS IT LT LV MK NL NO PL SE SI SK TR). It answers "does it continue", not
"is it compulsory" and not "when does it start". Malta is named in the sentence
and its own entry carries the exception: "The only European system where the
requirement stops at the end of compulsory education", "No foreign language
compulsory in the last two years of upper secondary".

So: **the stage fields ask three different questions.** Primary asks *when does
it start*; lower secondary, as filled, asks *is there a second one*; upper
secondary asks *does it continue, and on what terms*.

---

## 1. What varies

Discarding the things that are present everywhere and therefore are not axes —
almost every worked entry names a language, a grade or age, and an instrument, so
"which language", "what grade" and "which law" are one axis each at most, not a
value list.

What actually varies:

1. **Whether the obligation exists at all** — and, separately, whether somebody
   checked. Thailand's compulsory learning area against Iran's "No foreign
   language is provided for in any Iranian primary grade" against Jordan's
   "Neither cited chapter states a rule".
2. **Whether the question arises at all** — 18 entries on primary spend their
   prose saying the languages in the building are official or national ones, so
   nothing here is foreign. Samoa: "No foreign language category: the system is
   Samoan-English additive bilingualism."
3. **Where in the stage it begins** — grade 1 (Norway) to age 3 (Luxembourg,
   Monaco) to not until lower secondary (Iran, Timor-Leste).
4. **Whether the start is a point, a window, or a sub-national spread** —
   Iceland "Schools choose within ages 6–9; most start at 9"; Australia
   "Compulsory start ranges from Foundation in Victoria to never in Tasmania".
5. **What the start marks** — Japan's 外国語活動 in grades 3-4 then 外国語 as a
   graded subject in 5-6; Sri Lanka oral from Grade 1, "A formal subject from
   Grade 3"; Austria "taught through other subjects in grades 1–2 … A subject in
   its own right from grade 3".
6. **Who fixes which language** — Thailand names English in the curriculum;
   Armenia gives a list; Austria "The curriculum names no particular language".
7. **Whether the rule is in force** — Benin "a later study calls it a dead
   letter from 2006"; El Salvador "Rollout is partial"; Antigua "Announced, not
   implemented".
8. **What the obligation attaches to at upper secondary** — every track, one
   track, an examinable elective, a leaving exam, university entry.
9. **How far the source reaches** — 23 of 190 `upperSecondary` entries are
   entirely about a source that stops short.

---

## 2. Candidate axes

Nothing below is a score. No weighting, no total, no index; the one axis with an
order to it (`start_point`) is ordinal because school years are ordinal, and it
still must not be stored as a number (see A2).

### A1 — `requirement_status`: is a language other than the one the school teaches in made compulsory at this stage?

| value | gloss and the entries that forced it |
|---|---|
| `compulsory for all` | Every pupil at this stage takes one. Thailand: "Foreign Languages is one of eight compulsory learning areas, running from Grade 1". Norway: "English compulsory from grade 1". Argentina: "At least one foreign language is compulsory in every primary school (art. 87)". |
| `compulsory, set below the national level` | The duty is real but a state, Land, canton or province fixes it, and the national row cannot say more. Germany: "Compulsory from age 6 in six Länder". Bosnia: "English compulsory in most cantons … Curriculum set by entity and canton". Australia: "A national curriculum exists, but mandating languages is a state decision". |
| `offered, not required` | The system makes it available and stops there. Bahrain: "French is offered as an elective second foreign language". Comoros: Shikomori "peut être enseigné" — "permitted, not required, and only by implementing decree". Liberia: "PEER: a local language is recommended, not required, at basic education level". |
| `announced, not in force` | A stated intention, a draft, a pilot or a rollout that has not landed. Antigua and Barbuda: "Stated aim is that Spanish becomes a core subject, not yet a published curriculum". Jamaica: "The draft policy proposes Spanish … Proposed rather than enacted". Venezuela: "Making English compulsory in primary was a stated goal, not an established rule". Dominica: "Kweyol in primary is a pilot, not a requirement: 19 schools from 2019". |
| `none` | Somebody read the instrument and there is no such rule. Ireland: "No foreign language is compulsory — the only system in Europe of which that is true". Nicaragua: "Ley 582 art. 74's minimum primary plan of study contains no foreign language". Iran: "No foreign language is provided for in any Iranian primary grade". Dominican Republic: "Diseño Curricular Nivel Primario, Primer Ciclo 2013 lists seven areas and no foreign language … MINERD had a standing Foreign Languages area team, so the absence is a choice, not an omission". |
| `no foreign-language category` | Not that the answer is no, but that the question does not arise: the languages in the school are the country's own. Samoa: "No foreign language category: the system is Samoan-English additive bilingualism". Kenya: "Neither is a foreign language in Kenya: English is official, Swahili national". Chad: "Both are official languages, not foreign". Palau: "English is a school language by statute, not a foreign language subject". |
| `not stated` | Nobody has established whether there is a rule. Jordan: "Neither cited chapter states a rule making a foreign language compulsory, or a grade or age". Qatar: "Start grade for English not verified: sources give the Arabic rule, not the English". Turkmenistan has the rule but not the grade: "Starting grade not established: the law leaves the grade to curriculum plans". |

**`none` / `no foreign-language category` / `not stated` are three different
things and the corpus keeps them apart already.** Nauru is the edge: "The
Education Act 2011 contains no provision on language at all; the word does not
occur once" — an absence established *in that Act*, which is `none` for the Act
and `not stated` for the system. Flagged in §6.

**Does it discriminate?** On `primaryRequirement`, indicative: `none` 30,
`not stated` 19, `announced not in force` 17, `no foreign-language category` 18
(exact-phrase; the real figure is higher — Malawi, Namibia, Zambia, Zimbabwe,
Burundi, Seychelles and Tuvalu describe two-official-language systems without
using the phrase), `compulsory set below the national level` 10, `offered not
required` ~15–21. That leaves roughly 80–90 on `compulsory for all` — about 45%
of the field, four other values above 8%. It discriminates.

On `upperSecondary` the commonest value is also under half: 34 on the Eurydice
continues-line, 31 documented `none`, 23 `not stated`, 22–27 elective or
track-dependent. On `secondaryRequirement` the column cannot be filled honestly
at all — see §0a.

**`none` is 20 of the 31 on `upperSecondary` because of one source shape.** Nine
of them are the identical sentence "PEER profile states no language rule at upper
secondary or for leaving school" (CD CG CM DJ DZ GA GM GQ GW). That is one
sourcing decision reproduced nine times, not nine systems independently
establishing an absence. It is the `not_an_operation` finding again — a column
measuring the sourcing, not the systems — and whether those nine are `none` or
`not stated` is a maintainer call, not a coder's.

**No entry on any of the three fields carries an `absences[field]` flag.** All
documented absences are in prose. Whichever way `none` goes, that is a separate
decision about the typed flag and it has not been taken here.

### A2 — `start_point`: where in the stage does the obligation begin? (`primaryRequirement` only)

| value | gloss and entries |
|---|---|
| `before primary` | Luxembourg: "Compulsory from age 3". Monaco: "English is taught from age three, earlier than the French national norm". Aruba: "Both are given attention as a school subject from the first kindergarten year". Paraguay: "A 2013 law puts English in the public curriculum from preschool". |
| `first year of primary` | Norway grade 1, Serbia "Compulsory from grade 1", Thailand Grade 1, Cambodia "a timetabled subject from Grade 1, 2 hours a week in every primary grade", Zimbabwe "from the first grade", Nepal "Nepali and English are both compulsory subjects from Grade 1". |
| `second or third year` | Armenia: "No foreign language in grade 1; grade 2 teaches one". Russia: "A foreign language starts in grade 2 under the federal working programme". Czechia: "Compulsory from year 3, about age 8". Kyrgyzstan: "The foreign language starts in grade 3 at 2 hours a week". Lithuania grade 2, Japan grades 3-4, Tajikistan grade 2. |
| `fourth year or later` | Afghanistan: "English is introduced as a subject in Grade 4". São Tomé: "French is compulsory from the 5th class". Syria: "Alberta's guide puts foreign language at Grade 5". Netherlands: "in practice ages 10–12". |
| `not until secondary` | Iran: National Curriculum, foreign language teaching "begins at the start of lower secondary". Timor-Leste: "Lei de Bases 14/2008 attaches the first foreign language to the THIRD cycle of basic education". Brazil: "No foreign language before the sixth year of ensino fundamental". |
| `a window, the school choosing` | Iceland: "Schools choose within ages 6–9; most start at 9". Estonia: "Starts within ages 7–9; most start at 9". Sweden: "Schools choose within ages 7–9; most start at 7". Netherlands: "earlier if a school chooses". |
| `varies by sub-national unit` | Australia: "Compulsory start ranges from Foundation in Victoria to never in Tasmania". Bosnia: "Federation of BiH and Brčko: some start at 6 or 7". Germany, "in six Länder". |
| `not stated` | Turkmenistan, Qatar, Mongolia "Starting grade not established: it is set below statute, in a curriculum concept", Morocco "required 'à un âge précoce'" and nothing sharper, Togo "no hours or grade range published". |

**Store the band, never a number.** Entries give grades (Afghanistan Grade 4),
ages (Luxembourg 3), cycles (São Tomé "5th class, the second cycle of basic
education"), key stages (Seychelles "Key Stage 2 (P3)") and named year-one labels
(Australia "Foundation"). Grade and age are not convertible across systems whose
school-entry ages differ, and 11 European entries give only a Eurydice *window*
("start moved to between 6 and 8": BG CY DK FR LI LV PL PT RO SI SK), which is
not a point at all. A numeric `start_grade` column would have to invent the
conversion, and that is the kind of number this repo does not make up.

**Does it discriminate?** Indicative binning of the 194: about half name a start
I can band (30 first year, 12 before primary, 9 second-or-third, 9 fourth-or-
later, 3 not until secondary, 3 school-chooses, plus 24 matching more than one
band), and about half name none I could catch, of which 11 are the Eurydice
window and 8 say outright it is not established. So the commonest value is
`not stated` at something near 40% — and on the field whose own hint asks "from
what age or year" first. That is worth having as a deliberate result. It is not a
90% column.

### A3 — `language_chosen_by`: who fixes which language is taught?

| value | gloss and entries |
|---|---|
| `the state names it` | Thailand: the prescribed language for the whole core curriculum "is English". Japan, Course of Study grades 5-6: "In principle, take English in foreign languages period". São Tomé: French. Russia: "English is the language the federal programme is written for". |
| `a closed list, school or pupil choosing` | Armenia: "Permitted languages are English, Russian, French, German or another approved one". Lithuania: "English, French or German; Spanish added from 2026/27". Serbia: "German, French or Russian as the school offers. Italian or Spanish where a school provides them". |
| `no language named` | The obligation exists and the instrument declines to name its object. Austria: "The curriculum names no particular language (Lehrplan der Volksschule)". Argentina: "The statute says 'al menos un idioma extranjero' and never names it". Timor-Leste: "The statute names no language at that point, leaving it to the curriculum plan". Vietnam: "Foreign languages in programmes must be those common in international communication" — a criterion, not a list. |
| `the school or community chooses freely` | Estonia: "Schools choose which language". Vanuatu: "The community chooses which, with ministry agreement". |
| `named in guidance but not mandated` | Czechia: "English recommended but not mandated since the 2021 revision". Serbia's "usually English" alongside a named list. |
| `not stated` | The entry does not reach the question. |

**Does it discriminate?** Indicative: 52 of 194 primary entries name no language
at all in their prose, 75 name exactly one, 67 name two or more. The
`no language named` / `state names it` / `closed list` split is real and roughly
balanced. This is the cleanest of the axes and the least entangled with anything
else in `src/coding.js`.

**One caution.** `named in guidance but not mandated` is close to A1's
`offered, not required` and could end up re-categorising it. Czechia is
*compulsory from year 3* with the *language* unmandated — those are different
facts on different axes, but a coder will conflate them unless the gloss says so.

### A4 — `attaches_to`: what does the upper-secondary obligation attach to? (`upperSecondary` only) — **a LIST**

| value | gloss and entries |
|---|---|
| `every track` | Cambodia: "Identical 6 hours on both the Science and the Social Science upper-secondary strands … Only compulsory subject whose weight does not shift between the two strands". Myanmar: "No option to drop it: English is core on both streams in every high-school grade". Bangladesh: "Compulsory in all three streams". |
| `some tracks only` | Togo: "German and Spanish are compulsory in the literary streams A4 and A5". Zambia: "Offered on the Social Sciences and Business Studies pathways, not on Natural Sciences". Dominican Republic: "Both English and French are compulsory in Modalidad Académica, 4to to 6to". Germany: "Classical Greek and Latin compulsory for the classics Gymnasium Abitur". |
| `an examinable elective` | Japan: "英語コミュニケーションⅠ is the only 必履修 language subject, 3 credits. Schools may cut it to 2 credits; the other five 外国語 subjects are elective". Ghana: "French is an elective subject in the WASSCE at Senior High School level". New Zealand: "Optional in years 11-13, taken for NCEA credits". Suriname: "Spanish is among the examination subjects but is never compulsory". |
| `required to leave school` | Suriname: "Dutch and English are compulsory examination subjects for HAVO and VWO". Ghana: "a credit in it is required to progress between levels". Ecuador: "Foreign language is required for the exit profile of both stages … at least CEFR level B1 by the end of the baccalaureate". |
| `required or rewarded for university entry` | Bahrain: the Grade 12 BQA exam "counts towards university entry". Australia: "Most jurisdictions offer university bonus points for a Year 12 language. The review found those schemes inconsistent in size and in how they apply". |
| `a regional exam offering only` | The documented route is a regional syllabus and the entry says outright it is not a national rule. Barbados, Grenada, Jamaica all carry: "Regional exam syllabus, NOT proof of a national requirement in one territory". Dominica: "CSEC Modern Languages offers exactly two languages: French and Spanish". Saint Kitts and Nevis: "A regional CAPE offering, not evidence of local uptake". |
| `none` / `not stated` | As A1. |

**Why a list.** Germany carries both the continues-line and a track-specific
Abitur compulsion. Australia carries an elective *and* a university reward *and*
"no requirement in any state or territory at senior secondary". Japan carries one
compulsory credit-bearing subject and five electives. Coding one value throws the
others away, which is the reason `exclusions`, `triggers` and `exit_mechanism`
became lists.

**Does it discriminate?** 27 of 190 differ by track (indicative, read), 13 name
university entry (read: 13, of which 4 are negations — Mongolia, Senegal and
Lanka's constitutional point do not belong here), 22 carry an elective word. The
`a regional exam offering only` value is a real cluster of at least 7 Caribbean
entries and exists because the prose refuses to be read as a national
requirement. No single value is near half.

### A5 — `in_force`: is the rule operating? — **thin, and the maintainer should decide whether to keep it**

Values would be `in force` / `in force, implementation partial` / `not in force`
/ `in force but reported not applied` / `not stated`.

- Benin: "A 2001 decree put English in primary; a later study calls it a dead letter from 2006 … Statute and practice diverge, so the legal text reads as aspiration"
- Kenya: "Most formal schools are reported to flout this and start with English as the medium"
- El Salvador: "Rollout is partial: first-cycle materials went to 1,143 pre-selected schools in 2023. The private-sector start date was left to be announced later"
- Paraguay: "Implementation is expressly gradual, and took effect three years after promulgation"
- Nigeria: "Reversed in November 2025: English is now the sole medium from pre-primary to tertiary"

**Does it discriminate? No — about 91% would sit on `in force`** (17 of 194
off it, indicative). By the skill's test that is a column describing the corpus's
silence. Two options, both defensible, neither mine to take:

1. Fold `not in force` into A1 as `announced, not in force` (as drafted above)
   and let the partial-implementation cases sit on `compulsory for all` with the
   prose carrying the caveat. Cost: Benin and Kenya code as compulsory, and the
   map will then assert something the entry itself calls a dead letter.
2. Keep A5 as a deliberately thin column, the way `L3_EXEMPTION` was kept at 3
   of 37 because the emptiness *was* the finding. The finding here would be
   different: it is that 91% of entries never ask whether the rule operates,
   which is a gap in the reading rather than in the systems.

### A6 — evidence reach

Do not invent this. `evidence_type` already exists on `eal.l2Support`,
`eal.l1Support`, `dld.funding`, `dld.outcomesEvidence`, `dld.referralPathway`,
`dld.workforce`, `dld.serviceModel` and `dld.multilingualProvision`. The
distinctions the `fl` prose needs are the ones those already draw:

- instrument read directly — Japan 別表第一, Nicaragua Ley 582 art. 74, Thailand's core curriculum, Timor-Leste Decreto-Lei 47/2011
- instrument named, secondary account — Egypt: "Per the PEER account, not the law itself"; Comoros: "Statute quoted from a secondary source; the law itself could not be retrieved"; Burkina Faso: "From an ADEA country case study, not from a ministry instrument"; Syria: "No Syrian ministry source was obtainable; figures are secondary and possibly dated"
- source does not reach this stage — Afghanistan: "'upper secondary', 'grade 11' and 'grade 9' each return 0 hits in Jhingran 2019. 'primary' returns 181 hits in the same text, so the zero is real"; Haiti: "both stop at 9ème A.F"
- source unreadable — Kyrgyzstan: "The appendix's grade columns cannot be read as downloaded. Only digits and the TCPDF producer string survive extraction"; Tajikistan: "No grade, stage or hour allocation survives extraction"

**It discriminates hardest on `upperSecondary`:** 23 of 190 are entirely about a
source stopping short, and another 9 are the same PEER sentence nine times.

### Axes I am NOT proposing

- **`what the start marks`** (integrated activity vs graded subject). Real —
  Japan, Austria, Sri Lanka, Burkina Faso, Andorra, Namibia — but about 6–10
  entries of 194, and a column that is `a timetabled subject` or `not stated` on
  95% does no work. This is the `what replaces the time` case from
  `eal.l3Support`: a fact to read in the prose, not a category. The one thing it
  should change is the A2 gloss: Japan's start is grade 3, not grade 5, and the
  gloss must say which of two starts A2 records.
- **`rule_locus`-style instrument typing.** `RULE_LOCUS` exists and A1's
  `compulsory, set below the national level` plus A3's `the school or community
  chooses freely` already carry the federal fact twice. Adding a third would be
  re-categorising one value of another column, and §5 below says the delegation
  fact probably belongs on exactly one of A1 or A3, not both.
- **`languages`** as a coded list. See §4.

---

## 3. Which columns must be lists

- **A4 `attaches_to` — yes, necessarily.** Germany, Australia and Japan each
  need two or three values at once.
- **A1 `requirement_status` — no, if the row grain in §4 is settled first.** It
  is mutually exclusive per language slot. It is *not* mutually exclusive per
  unit, which is a grain problem rather than a list problem: making it a list
  would record that Bahrain is both `compulsory for all` and `offered, not
  required` without recording which language is which, and that is worse than
  either.
- **A2 `start_point` — no, but it needs `varies by sub-national unit` and
  `a window, the school choosing` as values precisely so it does not have to be
  a list.** 24 of 194 entries (indicative) name more than one start point; most
  of those are the two-starts case in §2's excluded axis, and the rest are
  sub-national spread.
- **A3 `language_chosen_by` — no.**
- **A6 evidence reach — no** (it is not a list on the eight schemes that
  already have it).

---

## 4. THE ROW GRAIN — and the column I am not proposing because of it

Storage holds one coding object per unit per field. **A row here is not reliably
"one system".** Four ways it breaks, in descending order of how much of the
corpus they touch:

### 4a. Status varies by language slot — the blocker

16% of `primaryRequirement` entries, 29% of `secondaryRequirement` and 18% of
`upperSecondary` name a first/second/third language ordinal (indicative; read for
the named cases below). The clean examples:

- **Bahrain**: "English is a compulsory foreign language subject" *and* "French is offered as an elective second foreign language". One row cannot hold `compulsory for all` and `offered, not required`.
- **Armenia**: "No foreign language in grade 1; grade 2 teaches one, grades 3 to 12 teach two". Two slots with two different start points in one sentence.
- **Malaysia**: "English is a compulsory subject in national primary schools" *and* "Chinese or Tamil must be made available on the request of fifteen pupils' parents" — a conditional duty on a different language.
- **Comoros**: Arabic is the "première langue vivante obligatoire", art. 22 "names a langue vivante II as well as a langue vivante I", and Shikomori "peut être enseigné".
- **Egypt**: "That first language is English or French; a second is chosen in the second cycle".
- **Timor-Leste, upper secondary**: "Both foreign languages become compulsory: English and 'Língua Malaia' sit in Formação Geral".

**So: do not propose a `language` column with a per-language `status`.** That
needs one row per language slot and storage cannot hold it. What does fit one row
is the shape `eal.l3Support` already uses — a status for the first slot plus a
separate column for whether a second slot exists and on what terms — and if that
shape is adopted for `fl` it should be adopted *as* that shape, not
reinvented alongside it.

### 4b. Status varies by track or stream at upper secondary

27 of 190 (indicative, read). Togo A4/A5 literary streams, Zambia's Social
Sciences vs Natural Sciences pathways, Suriname's MULO-A ("the languages and
business track") vs MULO-B, Bahrain's academic vs vocational, Germany's classics
Gymnasium. A4 handles this as a list *at the cost of not saying which track* —
acceptable for `some tracks only`, not acceptable if anyone later wants to count
tracks.

### 4c. Status varies by school type or medium stream

- **Vanuatu**: "Two parallel media: each school is an English school or a French school. The other official language begins at Year 4 as a foreign or additional language."
- **Malaysia**: national vs national-type schools.
- **Burkina Faso**: "In the bilingual stream, French is a subject before it is a medium", 90/10 in year one rising year by year.
- **Andorra**: "The French and Spanish systems in Andorra differ" — three school systems in one unit.
- **Egypt**: "Private schools may add other languages alongside official Arabic."

This is not a list problem and not a per-language problem; it is one unit
containing two school systems. Andorra and Vanuatu will be wrong at any single
value.

### 4d. Sub-national variation — partly already solved, partly not

10 of 194 primary entries carry it (indicative, read): AO AR AU BA CA DE MX TM US VN.
The sub-national rows exist and **112 of 186 already carry their own
`primaryRequirement` prose** — but only for AU (8), BE (1), CA (13), ES (1),
GB (4), HK (1), IN (33), US (51). **Germany's 16 Länder rows, China's 31,
Ethiopia's 11 and 16 of Spain's 17 exist and are blank on these fields.** So
"Compulsory from age 6 in six Länder" has a grain to move to and has not moved.
That is a fill question, not a vocabulary question, but a `varies by sub-national
unit` value will mean two different things until it is answered: *the national
row is the wrong grain* (Germany) versus *the national row is a summary and the
detail is below it* (Australia, Canada, US, India).

**Quantified answer to the brief's question:** taking 4a–4c together and counting
only entries I read rather than pattern-matched, **at least 1 entry in 6 on
`primaryRequirement` and something closer to 1 in 4 on `upperSecondary` needs
more than one row** to be coded without rounding. That is above the skill's
one-in-ten threshold for "the axis is wrong rather than incomplete" — for the
per-language axis specifically. A1/A2/A3/A6 are fine at unit grain *provided*
they are explicitly defined as describing the first or most-required language
slot, and the gloss says so.

---

## 5. Does one shared vocabulary serve all three stages?

**Partly, and the honest answer is two shared columns and two stage-specific
ones.**

| axis | primary | lower secondary | upper secondary |
|---|---|---|---|
| A1 `requirement_status` | yes, discriminates | **no — the prose answers a different question (§0a)** | yes, discriminates |
| A2 `start_point` | yes | n/a (it asks when the *second* starts) | n/a — the question is whether it *continues* |
| A3 `language_chosen_by` | yes | thin (56 of 99 name no language) | yes |
| A4 `attaches_to` | no (4 of 194 mention a track) | no (6 of 99) | yes, and must be a list |
| A6 evidence reach | yes | no — 110 rows blank | yes, hardest-working column on the field |

So: A1 + A3 + A6 shared across primary and upper secondary; A2 primary-only;
A4 upper-secondary-only. `secondaryRequirement` should not be given the shared
vocabulary in its present state. Three ways out, all maintainer calls:

1. **Retarget the field.** `src/domains.js` hint for `secondaryRequirement`
   already asks four things, the fourth being "whether a second language is
   required, and when it starts" — which is what 28 of 99 entries answer and
   nothing else. Accept that the field's question *is* the second language, and
   its vocabulary is `L3_SECOND` plus a start band, not A1.
2. **Code only the 71 entries with prose of their own**, and leave the 28
   boilerplate entries unset with a comment saying why. That is 71 of 210
   national systems — about a third.
3. **Do not scheme it.** Code primary and upper secondary, and note in the
   comment that lower secondary is blank on 110 of 210 and boilerplate on 28
   more, so the field is a fill target before it is a coding target.

Either way: **whatever is done must not create a second copy of `L3_SECOND`.**
The same Eurydice indicator would then be coded twice, in two domains, with no
guarantee the two agree.

---

## 6. Entries that would not fit — the pile

Named, with the reason, because this is the part worth more than the proposal.

**Would not fit at any grain:**

- **Andorra** — "The French and Spanish systems in Andorra differ", plus an Andorran dual-medium system with four languages each on its own specialist. Three school systems, one row.
- **Vanuatu** — two parallel media, "each school is an English school or a French school", and the foreign language is the *other* official language, chosen by community.
- **Aruba** — "Four languages are implemented: Papiamento, Dutch, English and Spanish. Dutch is offered as a foreign language, not as a mother tongue as until recently." A2 has no value for "the former medium is now the foreign language".
- **Bahrain, Armenia, Malaysia, Comoros, Egypt, Timor-Leste** — §4a. Two slots, two statuses.
- **Burkina Faso** and **Kiribati** — a proportion, not a status: "Year one: 90% of the programme in the national language, 10% French"; "Year 1: 90 per cent Te Kiribati and 10 per cent English". A1 has no value for a language that is 10% of the timetable and rising.

**Would fit A1 but the value would mislead:**

- **Austria** — "Compulsory from grade 1, but taught through other subjects in grades 1–2 — 32 annual lessons. A subject in its own right from grade 3". `compulsory for all` + `first year of primary` is true and reads as a subject from age 6, which the entry denies.
- **Japan** — same shape; A2 must say which of grade 3 (活動) and grade 5 (graded subject) it records.
- **Benin, Kenya** — §A5. `compulsory for all` against "a dead letter" and "reported to flout this".
- **Nigeria** — "Reversed in November 2025". Coding carries no date, and this one is four months old at time of reading and sourced through "the GEM Report's blog, not a peer-reviewed source".
- **Nauru** — "The Education Act 2011 contains no provision on language at all; the word does not occur once." `none` for the Act, `not stated` for the system.
- **The nine PEER sentences** (CD CG CM DJ DZ GA GM GQ GW) — identical prose, nine units, one sourcing decision. Whatever value they take, the column will report it as nine independent findings.
- **Azerbaijan** — the requirement is on non-Azerbaijani-medium schools to teach Azerbaijani, and "The requirement is stated for all levels, not specifically for primary". Neither a foreign language nor a primary-specific rule.
- **South Africa** — "A policy amendment requires the learning and use of some African language in every classroom … English and Afrikaans are official languages, so neither counts as foreign." A required additional language that is explicitly not a foreign one. Same shape as `L3_REQUIREMENT`'s `a national or local language` value, which already exists in `src/coding.js` for exactly this.
- **Guam-shaped cases generally** — Palau ("Written Palauan is a mandatory part of the core curriculum for grades 1 to 12"), Tuvalu, Tonga, Marshall Islands, Greenland. `no foreign-language category` is honest but it puts a real, strong, countable language duty on the same value as a system that simply has nothing.

**Tail I did not sample.** `primaryRequirement --from 52 to 80` and
`--from 108 to 120` and `--from 148 to 160` were not read (roughly 50 entries,
disproportionately E-to-I and L-to-M and R-to-S). Anything above that is a
single-region gap is possible in there.

---

## 7. What step 1 did not do

No value was written, nothing in `src/coding.js` was touched, and no cell was
coded. If a scheme follows, §4a and §5 have to be settled before values are
named, because both change what the columns can be — not how they are worded.
