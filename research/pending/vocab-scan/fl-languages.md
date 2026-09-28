# Vocabulary scan — `fl.languagesOffered` and `fl.curriculumTime`

Step 1 of `derive-vocabulary` only. Nothing proposed here is wired in; `src/coding.js`,
`data/` and the pages are untouched. The vocabulary is the maintainer's call.

**What was read.** All of it, not a sample. `fl` has 210 national units.
`languagesOffered` is codable on 193 (14 blank, 3 *Not established*, 0 absence flags);
`curriculumTime` on 127 (83 blank, 0 *Not established*, 0 absence flags). Both dumps
fit in one reading, so region spread stopped being a sampling question — every region
in the table is fully covered.

**Counting caveat, stated once.** Every share below prefixed *(indicative)* comes from
pattern-matching the prose, and the prose is full of negations — "not a foreign
language", "names no foreign language", "no per-subject hours". A matcher fires on
those. Where a count decides something I read the matched entries back; where it is
only scale-setting I have left it indicative and said so.

---

## 0. The thing to settle before any column exists

These two fields are not one corpus. Each is two corpora wearing the same field name,
and a vocabulary derived from either half alone will not code the other.

**`languagesOffered` is 31 Eurydice CLIL rows and 162 curriculum readings.**
31 entries carry a `CLIL:` block; **24 of them contain nothing else at all** — AL BG CY
CZ DK EE GR HR IS IT LI LT LV ME MK MT NO PL PT RO RS SE SK TR. Their entire prose is
provision of *bilingual* teaching, plus four canned comparative phrases ("Among the
widest ranges in Europe" — AT DK FR RO; "Steering documents name no compulsory or
optional languages — schools choose freely" — HU PL; "Steering documents also name" —
IT LT; "Four specific languages must be provided in lower and/or upper secondary" — NO
SE; "No CLIL programmes — one of only four European systems without them" — BA GR IS
TR). Cyprus's whole entry is `CLIL: Greek + English (ISCED 1)`. Malta's is
`CLIL: Maltese + English (ISCED 1–3)`.

None of those 24 answers the field's own hint — which languages are available, who
chooses, how many a pupil may take. They answer a different question that Eurydice
happened to publish in a table. **Any axis below leaves those 24 unset**, which is 12%
of the field on its own and above the skill's one-in-ten tolerance before a single hard
case is counted.

**`curriculumTime` is 34 Eurydice rows and 93 timetable readings.** 34 entries are the
identical four-line boilerplate ending `Minimum recommended hours, 2020/21 collection —
not hours actually taught`, normalised to "h per notional year". The other 93 report
whatever unit their own national grid uses — weekly periods, weekly clock hours, annual
periods, a percentage, credits, minutes a day. The two halves are not commensurable and
nothing in the corpus converts them.

So the first decision is not a value list. It is whether these fields hold one question
or two, and if two, whether the Eurydice rows should be coded at all or recorded as
out-of-scope for the coding while staying visible on the map.

---

## 1. What VARIES

### `languagesOffered`

Almost nothing varies in the direction the field's hint expects. The names vary, and
names are not a vocabulary — the `indigenous.localTerm` ruling applies directly here.
Underneath the names, six things genuinely vary:

1. **Whether the question arises at all.** A large group of entries spend their whole
   prose arguing that the languages present are *not* foreign languages. *(indicative
   27, and every one I read back is a real instance)*: Botswana "Neither is a foreign
   language here: English is official and Setswana the national language"; Rwanda
   "French is an official language taught as a subject through university, not a
   foreign one"; Azerbaijan "These are media of instruction, not foreign-language
   subjects; PEER names no foreign language"; Zimbabwe "None of the three is a foreign
   language: all are official languages of Zimbabwe"; Eswatini, Uganda, Malawi, Zambia,
   Namibia, South Africa, Senegal, Chad, Niger, Djibouti, Burundi, Eritrea, Madagascar,
   Iraq, Papua New Guinea, Paraguay, Ecuador, Venezuela, Dominica, Togo, South Sudan,
   Somalia, Burkina Faso, Canada. This is the single largest coherent group in the
   field and it is a **boundary** finding, not a gap.

2. **Whether the set is NAMED in the instrument, or left open.** *(indicative 21 name
   none)*: Mexico "The law names NO specific foreign language: ingles appears zero
   times"; Russia "Federal law fixes no list of teachable foreign languages";
   Turkmenistan "Statute names no language; it points only to 'the official working
   languages of the UN'"; Vietnam "Foreign languages in the curriculum are 'those used
   commonly in international communication'"; Argentina "No language is named in the
   statute"; Colombia "The law says 'una lengua extranjera' and does not name it";
   Nicaragua, Uruguay, Georgia, Indonesia, Honduras, Hungary, Poland, Belarus.
   Separately, *(indicative 11)* name a closed set **plus an open residual**: Brunei
   "'Other languages' is an open row in the table with no language named"; Mongolia
   "'Other foreign languages' survive as a preserved right, with no list and no
   entitlement"; Kiribati "Other foreign languages are listed only at senior secondary,
   and are unnamed"; Tanzania, Micronesia, Malaysia, Thailand, Japan, Egypt, Greenland.

3. **Where the set is fixed — the locus.** National statute (most), sub-national
   *(indicative 11: Switzerland "order set by canton", Germany's Länder, Bosnia
   "Collected from cantonal regulations", Myanmar "devolved to State and Region
   governments under s.44", Argentina's federal council, Australia, Philippines,
   Mauritania), the school itself (Belarus "Which foreign language is compulsory is
   decided by the school's founder"; Thailand "left 'to the discretion of educational
   institutions'"; Brazil "Availability, place and timetable are left to each teaching
   system"), or **the examination board, with no national list behind it** *(indicative
   10)*: Saint Kitts and Nevis "Regional exam offer, not a national list: CSEC gives
   French and Spanish"; Saint Vincent "No national list was retrievable; the documented
   offer is the CSEC pair"; Lesotho "ECoL publishes 16 LGCSE syllabuses and not one of
   them is a foreign language"; Grenada, Sierra Leone (WASSCE), Guyana, Singapore,
   Brunei (IGCSE), New Zealand (NCEA), China (gaokao).

4. **What KIND of language is in the set** — the codable version of the names. Global
   lingua franca (near-universal); a state's own official or ex-metropolitan language
   taught as a subject; a **neighbour or regional-bloc** language chosen explicitly for
   geography *(indicative 8)*: Antigua "Reasons given include ties with the Dominican
   Republic and regional integration"; Jamaica "On the ground of the country's
   geographic location"; Guyana "Portuguese reflects the Brazilian border rather than a
   European tradition"; Burundi "on East African Community grounds"; Paraguay "favours
   languages official in Paraguay's supranational bodies"; Thailand "languages of
   neighbouring countries"; heritage/ancestral *(indicative 7: Mauritius "Bhojpuri was
   introduced as an ancestral language in grade 1"; Dominica, Aruba, Greenland, Monaco,
   Cape Verde, Seychelles)*; indigenous strands held deliberately *outside* the foreign
   menu *(indicative 13: Costa Rica "Indigenous languages sit in the separate
   indigenous subsystem, not this menu")*; classical or liturgical *(4: Australia "Plus
   a Framework for Classical Languages"; Korea "Classical Chinese is a separate elective
   alongside them"; NZ Latin; Thailand Pali)*; sign language *(5: US "American Sign
   Language counts as a language in 621 high school programmes"; Australia's Auslan,
   NZSL, Slovenian sign language, PNG)*.

5. **What the availability is conditional on.** *(indicative 5 explicit, plus 10 that
   split public/private)*: Timor-Leste "That swap is conditional on the school having
   the money, the staff and one class of pupils"; Moldova "Availability depends on
   qualified teachers, textbooks and approved curriculum"; Malaysia "where reasonable
   and practicable" and "on the fifteen-parent request"; Vanuatu "where syllabuses
   exist" and "Offered only to students with demonstrated ability in languages"; Congo
   "PEER notes these subjects reach 'only a certain number of schools' in practice";
   Comoros "English, Spanish and Italian appear only in 'certains lycées et collèges
   privés'"; Egypt "Private schools may teach other languages in addition to official
   Arabic".

6. **Why there is nothing** — three different kinds of nothing, and the corpus keeps
   them apart better than any scheme would. See §2 axis A.

### `curriculumTime`

1. **Whether a per-subject language figure is published at all.** *(indicative 20
   say outright it is not)*: Switzerland "No national curriculum and no national
   instruction time; both are set by the 26 cantons"; Honduras "Not found: the 2003
   curriculum contains no hour allocations at all, horas 0"; Oman "No per-subject hours
   published"; Kuwait "No per-subject language hours are published in the retrieved
   sources"; New Zealand "The curriculum sets no hours for learning languages";
   Guatemala, Fiji, Kenya "French, German and Arabic are secondary cultural subjects,
   not separately timed"; Brunei "not per language subject"; Burundi "Source gives
   lesson length only, not per-subject totals"; Greenland "The act sets a yearly hours
   norm for the pupil, not hours per subject"; CAR "No annual hour figure for English is
   published anywhere in the plan"; French Polynesia "the 1996 timetable arrete was
   repealed in 2024"; San Marino, Mauritania, Equatorial Guinea, Colombia, and the
   Netherlands / Poland / Portugal "schools decide the split".

2. **The UNIT.** Weekly periods *(25)*, weekly clock hours *(24)*, annual hours *(10)*,
   Eurydice "h per notional year" *(34)*, a share of a larger block *(10)*, credits
   *(6)*, minutes a day *(3)*. 20 entries state period length separately because the
   period is not a fixed quantity: "Each teaching period lasts 45 minutes" (AE, AM, AZ,
   EG, GE, KZ, PS, YE), "A period is 40 minutes in elementary school, 45 in junior high,
   50 at senior high" (Taiwan), "One period is 25 or 30 minutes, subject to the
   particular condition of each school" (Brunei).

3. **The STATUS of the figure.** Statutory floor (Panama "Statutory floor: English takes
   at least a third of weekly lesson time"), prescribed grid, recommended/suggested
   (Ghana "Both figures are headed SUGGESTED TIME ALLOCATION"), illustrative (India "NCF
   2023 calls its time allocations illustrative; schools set the actual allocation";
   Australia "ACARA states these are not designed to establish time allocations in
   schools"), a **ceiling** (South Korea "High school caps the combined credits for
   Korean, maths and English at 81 … An explicit ceiling on how much of the timetable
   language and maths may take" — the only floor-inverted entry besides Azerbaijan's
   "Totals are given as a maximum"), a graduation credit requirement (Guam, N. Mariana,
   Palau), or a funding envelope (Canada — see §6).

4. **Nobody reports time actually taught.** Not one entry of 127 gives observed hours.
   44 say so explicitly, and two say the prescription is not met: Bangladesh "Prescribed
   hours; actual contact hours are far less, per the same profile"; Burkina Faso
   "Official hours; the basic-education volume is not always respected". This is the
   `outcomes-evidence-is-about-absence` shape again: the field's most reliable finding is
   about the evidence, not the systems.

5. **Whether the figure is current.** *(indicative 9 flag it themselves)*: Algeria
   "Ministry hours readjusted from the 2006-07 school year, so the 2004 grid is
   superseded"; Morocco "Figures predate the curriculum overhaul: 'Avant la refonte des
   curricula'"; Laos "given as being under the previous system"; Kenya "Dated: the table
   is the 2002 curriculum revision, in the IBE profile of 2006/07"; Sri Lanka "the
   timetables in force before the introduction of the curriculum reform"; plus Egypt
   2001, Azerbaijan 2002, Maldives "retrieved July 2011", Iraq 2010.

6. **Whether a share is subject time or immersion time.** Costa Rica "25 to 60 per cent
   of lessons in the foreign language (public bilingual liceos only) … The total is
   reached by teaching maths or science through the foreign language"; Vanuatu "Year 4:
   30 per cent of language time to the non-medium language"; Samoa "Year 1 units are 90
   per cent Samoan and 10 per cent English"; Mali "français (50 % du temps horaire)' as a
   medium beside the mother tongue"; Panama "English is designed as instrumental for
   learning other subject areas". Five of the ten percentage entries are measuring
   medium of instruction, not a language subject. A `share` unit would silently merge
   the two.

---

## 2. Candidate axes

### A. `offer_boundary` — does this system have a language taught as a foreign subject, and if not, what kind of not?

*One row per system. Answerable by every entry in principle. The most important column here.*

| value | gloss |
|---|---|
| `named foreign subject` | At least one language is taught as a subject and the entry treats it as foreign to the system (Saudi Arabia: "English only: no other language is named in any cited source"; Togo: "It calls these secondary foreign languages alongside French") |
| `official languages only` | Additional languages are taught, but all are official or national, so the foreign category does not arise — an answer, not a gap (Botswana: "Neither is a foreign language here: English is official and Setswana the national language"; Zimbabwe: "None of the three is a foreign language: all are official languages of Zimbabwe"; Rwanda: "French is an official language taught as a subject through university, not a foreign one") |
| `media not subjects` | The additional languages named are media of instruction, and no language is taught as a foreign subject (Azerbaijan: "These are media of instruction, not foreign-language subjects; PEER names no foreign language"; Chad: "Arabic is categorised as a language of instruction, not as a foreign language"; Niger: "Arabic here is a medium in one stream, not a foreign-language subject") |
| `checked, none found` | Somebody searched the governing document and recorded the zero (Mali: "A finding rather than a gap: the national sector plan has no foreign-language policy … PRODEC 2 for 2019-2028 was term-counted and never uses the word 'anglais'"; Solomon Islands: "No foreign language appears in the national curriculum statement"; Lesotho: "Figure is the complete published list, not a sample: the API reports total 16"; Suriname: "Term count on that plan: Engels 0, Spaans 0, vreemde taal 0, against onderwijs 451") |
| `not established` | Nobody has established whether there is one; the entry says which source is missing (Israel: "The entry needs a readable Israeli source before this field can be filled"; Equatorial Guinea: "What is actually taught in schools was not established"; Cameroon: "No document was found timetabling English for francophone pupils, or the reverse"; Niger: "Nothing at all was retrieved on English in Niger") |
| *(unset)* | The prose is about something else entirely — the 24 CLIL-only rows |

**Discriminates?** Commonest value ~70% *(indicative: ~140 of 193 on `named foreign
subject`)*. That is on the acceptable side, and the value of the column is not the
common value but that it splits the four kinds of nothing the project already knows how
to distinguish — `none` vs `not stated`, applied twice over. Note the fifth kind is
*none* on the existing typed flags: `absences` is set on **zero** entries of this field,
yet at least the 13–18 `checked, none found` cases are documented absences. That is the
`uncoded-count-must-subtract-absences` trap sitting in the data right now.

**Description, not score.** No ordering; `officials only` is not less than `named`.

### B. `set_locus` — where is the set of available languages fixed?

*One row per system.*

| value | gloss |
|---|---|
| `one language, set nationally` | The instrument names exactly one and the pupil has no choice (Taiwan: "English is the only foreign language schools must teach; it is set, not chosen"; Brazil: "English is the only language named as compulsory"; Panama: "Ley 18 de 2017 names only English; no other foreign language appears in it"; Thailand: "English is the only language the national core curriculum prescribes") |
| `closed national list` | Two or more named nationally, the chooser picks within them (Iran: "Curriculum names three: English, French and German … A pupil takes ONE of them, not a combination"; Cambodia: "Only two languages exist in the framework: English and French, with no third permitted … Framework gives no leave for a school to substitute another language"; Korea: "A second foreign language is elective at middle school, from a named list") |
| `closed list plus open residual` | A named list with an explicit unnamed remainder (Brunei: "'Other languages' is an open row in the table with no language named"; Mongolia: "'Other foreign languages' survive as a preserved right, with no list and no entitlement"; Malaysia: "Arabic, Japanese, German or French 'or any other foreign language' may be made available") |
| `no national list` | The instrument requires a foreign language and names none (Russia: "Federal law fixes no list of teachable foreign languages"; Mexico: "The law names NO specific foreign language: ingles appears zero times"; Turkmenistan: "Statute names no language; it points only to 'the official working languages of the UN'") |
| `sub-national` | Fixed below the national level (Switzerland: "Two compulsory, drawn from the four state languages and English; order set by canton"; Myanmar: "Ethnic languages are devolved to State and Region governments under s.44"; Bosnia: "Collected from cantonal regulations; English compulsory in most cantons") |
| `school` | Fixed by the school or its founder (Belarus: "Which foreign language is compulsory is decided by the school's founder"; Hungary: "Steering documents name no compulsory or optional languages — schools choose freely"; Brazil: "Availability, place and timetable are left to each teaching system") |
| `examination board only` | The only documented offer is an exam syllabus list; no national curriculum list exists or was found (Saint Kitts: "Regional exam offer, not a national list: CSEC gives French and Spanish"; Saint Vincent: "No national list was retrievable; the documented offer is the CSEC pair"; Lesotho: "ECoL publishes 16 LGCSE syllabuses and not one of them is a foreign language") |

**Discriminates?** Best of the candidates — commonest value ~25% *(indicative)*. But
`no national list` and `school` overlap in the prose for Hungary, Poland and Thailand,
where the statute's silence *is* the delegation; the two values would need the gloss to
say which fact decides it (what the instrument says, not what follows from it).
**Leaves unset:** the 24 CLIL-only rows plus the `not established` group, ≈17%.

### C. `offer_composition` — what kinds of language are in the offer? **LIST**

| value | gloss |
|---|---|
| `global lingua franca` | English, or an entry's own equivalent framing (Palestine: "English framed as a global language and a window on the wider world") |
| `state official as subject` | A language that is official or national in this system, taught as a subject rather than only used as a medium (Zambia: "Seven Zambian languages sit alongside English as school subjects") |
| `neighbour or bloc` | Chosen on stated geographic or regional-bloc grounds (Guyana: "Portuguese reflects the Brazilian border rather than a European tradition"; Antigua: "Reasons given include ties with the Dominican Republic and regional integration"; Burundi: "on East African Community grounds") |
| `heritage or ancestral` | Offered to maintain a community's own language (Mauritius: "Bhojpuri was introduced as an ancestral language in grade 1"; Dominica: "Kweyol is framed as heritage and identity, not as a foreign language") |
| `indigenous, separate strand` | Indigenous languages taught but deliberately held outside the foreign-language menu (Costa Rica: "Indigenous languages sit in the separate indigenous subsystem, not this menu"; Chile: "Alongside it, Asignatura Lengua Indigena carries four hours a week") |
| `classical or liturgical` | (Australia: "Plus a Framework for Classical Languages"; Korea: "Classical Chinese is a separate elective alongside them") |
| `sign language` | (United States: "American Sign Language counts as a language in 621 high school programmes") |
| `unnamed residual` | An explicit open category with no language in it (Kiribati: "Other foreign languages are listed only at senior secondary, and are unnamed") |

**Must be a list** — Australia carries four of these at once, New Zealand five. Coding
one throws the rest away, which is the cost `exclusions` and `triggers` already paid.
**Discriminates?** `global lingua franca` fires on roughly 85–90% *(indicative)*, so as
a single-value column it would be silence. As a list, the other seven values carry the
information: `sign language` 5, `classical` 4, `heritage` 7, `neighbour or bloc` 8,
`indigenous separate strand` 13. Say in the gloss that the lingua-franca value is
near-universal by design, so nobody reads its share as a coding failure.

### D. `availability_condition` — what is a non-first language's availability conditional on? **LIST**

| value | gloss |
|---|---|
| `staffing or materials` | (Moldova: "Availability depends on qualified teachers, textbooks and approved curriculum"; Vanuatu: "where syllabuses exist") |
| `school resources` | (Timor-Leste: "That swap is conditional on the school having the money, the staff and one class of pupils") |
| `pupil numbers or parental request` | (Malaysia: "on the fifteen-parent request"; Timor-Leste's "one class of pupils") |
| `pupil attainment` | (Vanuatu: "Offered only to students with demonstrated ability in languages"; Singapore: "Only after a long period overseas, with formal learning in that language") |
| `private sector only` | (Comoros: "English, Spanish and Italian appear only in 'certains lycées et collèges privés'"; Egypt: "Private schools may teach other languages in addition to official Arabic") |
| `stream or track` | (Kuwait: "Public and Arabic private schools run English throughout, French in the arts stream"; Congo: "Living foreign languages by stream and school") |
| `practicability clause` | An open feasibility escape in the instrument itself (Malaysia: "At national secondary schools, where reasonable and practicable") |

**Discriminates?** No — around 85% would be empty *(indicative: ~25 of 193 say
anything)*. That is the finding, exactly as `bilingual_handling`'s silence was, but it
must be a deliberate result. Keep it only if the emptiness is the point; an empty list
must then mean *nothing stated*, never *unconditional*.

### E. `time_evidence` — what kind of time figure does this system publish? (`curriculumTime`)

| value | gloss |
|---|---|
| `per-subject figure` | A number attaching to a language subject (Belize: "Spanish is 2 hours a week at every level from Infant I to Form IV") |
| `share of a block` | Only a proportion, of the timetable or of language time (Gambia: "French sits in the core block given 75% of teaching periods"; China: "Foreign language is 6-8% of total class hours") |
| `whole-timetable only` | Total load or period length published, nothing per subject (Oman: "Total instruction 1,600 minutes a week at every level, whole-timetable not language-specific"; Burundi: "Source gives lesson length only, not per-subject totals") |
| `graduation credits` | Time expressed only as a credit requirement (N. Mariana: "One credit in a language other than English required, within 28 credits to graduate") |
| `delegated, no figure` | The instrument declines to set one (Netherlands: "Primary: schools decide the split from a combined subject-group total"; Switzerland: "No national curriculum and no national instruction time; both are set by the 26 cantons") |
| `checked, no figure published` | Somebody looked and recorded the zero (Honduras: "Not found: the 2003 curriculum contains no hour allocations at all, horas 0"; CAR: "No annual hour figure for English is published anywhere in the plan … The sector plan gives annual hours for French and mathematics only") |
| `no subject to time` | There is no foreign language, so no time (Ireland: "No instruction time allocated — no foreign language is compulsory"; Tuvalu: "No foreign language offered"; Solomon Islands: "none a foreign language"; Palau: "No foreign language among the academic courses the school lists") |

**Discriminates?** `per-subject figure` ~63% *(indicative 80 of 127)*. Acceptable, and
the lower half is where the column earns its place — it separates delegation from
absence from non-applicability, which the field currently runs together.

### F. `time_status` — what does the published figure claim to be? (`curriculumTime`)

`statutory floor` (Panama) · `prescribed grid` (UAE: "Given as a prescribed weekly
lesson timetable, not hours observed") · `minimum recommended` (the 34 Eurydice rows) ·
`suggested` (Ghana: "Both figures are headed SUGGESTED TIME ALLOCATION") ·
`illustrative` (India: "NCF 2023 calls its time allocations illustrative"; Australia:
"ACARA states these are not designed to establish time allocations in schools") ·
`ceiling` (Korea: "An explicit ceiling on how much of the timetable language and maths
may take"; Azerbaijan: "Totals are given as a maximum") · `graduation requirement` ·
`target only` (Taiwan: "Target only: Bilingual 2030 does not adjust the guidelines or
curriculum resources") · `observed` — **zero entries, keep the value anyway and say so
in the gloss**, because its zero is the field's headline.

**Discriminates?** Commonest ~27% (the Eurydice `minimum recommended` block). Good — but
note it discriminates by *source*, not by system: the 34-entry mode exists because one
collection normalised 34 countries the same way.

### Axes deliberately NOT proposed

- **`decider` (who picks: pupil, school, ministry)** — the field's own hint asks for it,
  and the prose almost never says. Explicit evidence: school 8, pupil or parent 4
  (Bahrain, Korea, Moldova "Parents apply in writing in May of class IV, choosing from
  at least two", Singapore), sub-national 11. A column 60–70% *not stated* describes the
  corpus, not the systems. Fold what exists into `set_locus` (B).
- **`time_setter`** — only 26 of 127 carry a "Set by …" line, all of them IBE-derived.
  ~80% unset.
- **`language_count`** — see §5.
- **`compulsory vs optional`** — see §5.

---

## 3. Lists

`offer_composition` (C) and `availability_condition` (D) must be lists; coding one value
discards the rest, and Australia, New Zealand, France, Mauritius and Malaysia each carry
three or more composition kinds. `time_status` (F) is arguably a list too — the Eurydice
rows are simultaneously `minimum` and `recommended` *(47 entries match a minimum marker,
43 a recommendation marker, and 34 are the same entries matching both)*, which is
precisely the "gloss needs an 'or'" signal from the skill. Either make it a list or
split the Eurydice compound into its own value and say what it is.

`offer_boundary` (A), `set_locus` (B) and `time_evidence` (E) are genuinely exclusive,
one value each.

---

## 4. THE ROW GRAIN — two columns must not be proposed

Storage holds one coding object per unit per field. Two otherwise obvious columns break
that, and I am stopping rather than proposing them.

**(i) Compulsory versus optional is per LANGUAGE, not per system. Do not propose it.**
*(indicative 19 of 193, every one read back and real)*: Bahrain "Compulsory English,
elective French"; Aruba "English recurs in every listed cycle … French appears only as a
keuzevak"; Tonga "Tongan and English for all, with optional French, Japanese and
Mandarin"; Nigeria "Arabic is optional from Primary 1; French is optional only from
Primary 4 … Both stay '(Optional)' at every level"; Armenia "A third foreign language
may be added from the school's own component"; Maldives "Grades 1 to 8 offer one optional
language only: Arabic"; plus BA BN BR BZ HU JO KR MR MU PL RW SG ZA. A further 21
entries name a first/second/third-language **rank**, which is the same per-language grain
(Lebanon "Either English or French can be the first foreign language, the other the
second"; Cambodia "whichever is not taken first becomes Living Language 2"; Luxembourg
"French from 3, German from 6, English third"). At minimum 19 of 193 (10%) need one row
per language, and the rank question is in any case already `secondaryRequirement`'s job —
its hint asks "how many languages · whether a second language is required, and when it
starts".

**(ii) A time figure cannot be one number per system. Do not propose a numeric column.**
*(indicative 97 of 127, 76%)* carry more than one figure, and **34 carry four at once** —
primary total, compulsory-secondary total, first foreign language, second foreign
language. Bhutan gives three grade bands in two different units in one entry ("Grades 7
and 8: Dzongkha and English each get 7 weekly periods / Grades 9-10 are given in hours").
Every figure in the corpus is a tuple of (number, unit, stage, language rank, status),
and the atlas already has the right shape for that: `fl.uptake` is a `series` field with
`unit`, `basis` and `counted` per row. **`curriculumTime`'s numbers belong in a typed
series, not in a coding vocabulary.** What a coding *can* hold for this field is the
metadata — axes E and F, and only those. Answering the brief's question directly: it is a
measured column, but not a measurable *cell*, so on this field a categorical scheme about
the measurement is the only thing that fits one row per unit.

**(iii) A borderline third: the offer grows with stage.** *(indicative 12)*: Bahamas "The
junior high arts and sciences list carries Spanish only, with no French / Senior high adds
French alongside Spanish"; Maldives grades 1–8 one, 9–10 three; Kiribati; Brunei; Laos;
Congo "Public primary teaches no foreign language; some private schools add English there
/ English is taught in the lycée". At 6% this is under the one-in-ten line, so a
whole-system axis survives it — but `set_locus` and `offer_boundary` must both be glossed
as *the widest stage at which the system offers anything*, or twelve entries get coded
from whichever line the coder read first.

---

## 5. The count that cannot be computed

"How many languages are on offer" looks like the field's easiest column and it is not
codable at all, because the number depends on the §2-A boundary decision being made
first. An indicative tally of distinct named languages per entry — any role, media and
official languages included — gives 27 entries naming none, 46 one, 48 two, 48 three or
four, 24 five or more. Those buckets are worthless as an offer size: Zimbabwe's three are
all official, Azerbaijan's four are all media, Andorra names none but says "Four languages
inside the Andorran system", and India's "At least 42 languages taught as language
subjects" is a national statistic rather than any pupil's menu. Japan's "Only 603
upper-secondary schools offer any non-English language, over 16 languages" is a count of
schools, not of an entitlement — the entry says so itself: "Figures are a MEXT survey of
upper secondary in 2023-24, not a curriculum entitlement".

If a size column is wanted, it must be *the number of languages this system's instrument
names as available foreign-language subjects*, banded (`one` / `two` / `three or four` /
`five or more` / `open, unbounded` / `none named`), and it can only be coded after A.

---

## 6. Entries that would not fit — the named pile

**`curriculumTime`**

- **Canada.** "Federal transfer, not instructional time: base $235,520,472 a year,
  2024-28 Protocol". The entry is money. It fits no value of E or F and should not be
  rounded into one; it belongs in a funding field.
- **Monaco.** "Timetable volumes and programmes conform to French ministry definitions
  for accredited schools" — the figure exists, in another country's instrument. There is
  no value for *incorporated by reference*.
- **Tajikistan.** "The programme states 27 hours a week for Russian and 24 for English
  across grades II to XI … Hours cannot be a single grade's weekly load, and are quoted
  as printed." The entry itself disbelieves its own number.
- **Wallis and Futuna.** "The regional option means those 54 h may go to Wallisian or
  Futunian, not a foreign one" — one allocation, two mutually exclusive subjects.
- **Costa Rica, Vanuatu, Samoa, Mali, Panama.** Percentages of *medium* time, not of
  subject time. Five of the ten `share` entries; coding them `share of a block` merges
  immersion with foreign-language teaching.
- **Mauritius.** "The institute publishes framework volumes for grades 1-9 and 10-13" —
  a bibliography with no time claim of any kind.
- **Bahrain.** "A 30-minute daily reading period … split three times a week for Arabic
  reading and twice for English" — a shared slot, not an allocation.
- **Guyana.** "Grades One to Four get one or two Beyond Core periods weekly / No
  allocation is set for secondary grades" — half figure, half absence.

**`languagesOffered`**

- **The 24 CLIL-only rows** (AL BG CY CZ DK EE GR HR IS IT LI LT LV ME MK MT NO PL PT RO
  RS SE SK TR) plus the 7 whose only non-CLIL line is a canned comparative. They fit no
  axis proposed here. Cyprus and Malta have one line each.
- **The four "No CLIL programmes" rows** (BA GR IS TR). This is an absence of *bilingual
  provision*, recorded in a field about the language menu. Türkiye's entire entry is that
  one line, which would code Türkiye's foreign-language offer as unset while the country
  runs one of the largest English programmes in the region.
- **Vatican City.** "The only school named in the whole report is one minor seminary /
  Italian law enters the Vatican legal order only as supplementary law."
- **Antigua and Barbuda.** "Cabinet approved Spanish as the country's official second
  language, 13 May 2026 … A Spanish Desk was established in the Office of the Prime
  Minister." A cabinet decision and an office, with no curriculum consequence recorded.
  Jamaica is its mirror: "A draft that never completed formal adoption".
- **Cape Verde.** "Volatile: the ministry suspended the Kabuverdianu textbook in September
  2025 … The decree-law creating the subject was not retrieved." A coding carries no date,
  and this one is mid-change.
- **Japan and the United States.** Both report school counts from surveys, not
  entitlements. Any `set_locus` value would misrepresent them.
- **Israel, Jordan, Peru, Grenada, Saint Vincent, Equatorial Guinea, Cameroon.** Entries
  whose prose names the missing source. They are `not established` in substance while
  sitting in the codable pile, because the sentinel test only catches prose that *starts*
  "Not established".
- **Lesotho and Suriname.** Positively established zeros whose evidence is a complete
  published list and a term count. If A has no `checked, none found` value these become
  indistinguishable from the seven above, which is the `none`/`not stated` collapse.

That pile is 40-odd entries on `languagesOffered` and a dozen on `curriculumTime`, and
most of it is one problem: the field was filled from whatever the best source for each
country published, and the sources answer different questions. Any vocabulary will code
the source as much as the system until that is decided.
