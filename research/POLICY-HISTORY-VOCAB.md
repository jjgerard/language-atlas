# Deriving a change-type vocabulary for `policyHistory`

Asked for on 2026-09-20: can each year and change be coded, and linked to
entries by what was changed. This file records what the 4,305 rows actually
say, which axes survive contact with them, and which do not.

Nothing is wired into `src/coding.js` yet. `SHAPES.history` is still
`["year", "description"]` and every one of the 4,305 rows carries exactly
those two keys and nothing else.

## Where the corpus stands

    dld         279 units,  1142 rows
    eal         215 units,   604 rows
    indigenous  263 units,  1029 rows
    fl          271 units,   785 rows
    he          231 units,   745 rows
    TOTAL                   4305 rows

The one thing already built is the DOCUMENT link: `makeHistoryMatcher` in
`src/history.js`, run from `derive.js:187`, ties a row to a docLink already on
the same entry by label. Live rate, measured today:

    dld        380/1142  33%       fl     273/785  35%
    eal        159/ 604  26%       he     487/745  65%
    indigenous 599/1029  58%       TOTAL 1898/4305 44%

So a row can already answer WHICH DOCUMENT, 44% of the time. It cannot answer
what kind of change, or which field changed. Those are what follow.

## How this was derived

Read first. 60 rows sampled evenly across every domain x region bucket, then
45 more drawn only from rows that matched no operation verb, then a
whole-corpus frequency profile of twelve candidate phrase families. The values
below are the groups that reading produced; every gloss names entries a reader
can go and check.

The regexes that produced the counts are MEASUREMENT INSTRUMENTS, not a coder,
and their precision is poor in ways worth naming: `/caps?/` matched "Education
Act (Cap 262)", and a bare `regulation|decree|act no` in the `instrument made`
probe swallowed "The 2026 regulation is framed around pupils with disability,
not disorder types", which describes a provision and records no operation at
all. Treat every percentage below as the shape of the corpus, not as a coding.

## Axis 1 — the operation. This one survives.

One question: what happened, in the year the row carries. Values are mutually
exclusive, so a coder takes the first that applies, and the order below is the
precedence (a row that repeals one act and makes another is a replacement).

    2052  48%  provision described
     612  14%  body or programme established
     593  14%  instrument made
     350   8%  instrument amended
     316   7%  plan or strategy issued
     134   3%  instrument replaced
     108   3%  body or programme changed
      61   1%  international instrument accepted
      59   1%  state of affairs recorded
      20   0%  funding decided

Per domain the top value runs 44%, 51%, 52%, 52%, 41% — so the shape is a
property of the corpus, not of one map.

- **`provision described`** — the row dates an instrument and states what it
  PROVIDES, recording no operation on it. Antigua and Barbuda: "Education Act
  2008 (No. 21 of 2008); s.83 makes 'communicative ... exceptionalities' the
  route to special education". Azerbaijan: "Law on Education Art. 7.1 makes
  Azerbaijani the official medium". Indonesia: "Law 20 of 2003 art. 33(2): a
  local language may be the medium in the early stage".
- **`body or programme established`** — an institution, unit, commission,
  course or department comes into being. Burundi: "Statutory Order 610/902
  creating an inclusive education unit inside the Ministry of Education".
  Estonia: "Voru Institute established as a state research and development
  institution". Palau: "Chinese introduced as an elective for grades 11 and 12".
- **`instrument made`** — a new instrument is enacted, adopted or comes into
  force. China: "Education Law of the PRC enacted, in force 1995-09-01".
  Belize: "Education Act 2008 published in the Official Gazette".
- **`instrument amended`** — an existing instrument is changed in place.
  Cyprus: "Amending Law 131(I)/2025 rewrites section 15(4) to let special
  education continue yearly up to age 22". Brazil: "Lei 14.191 adds LDB art
  60-A, deaf bilingual education in Libras as first language".
- **`plan or strategy issued`** — a non-binding plan, strategy or
  recommendation. The verbs that mark it are PROPOSES, AIMS, INTENDS, TARGETS.
  Nauru: "Education and training strategic plan 2008-13 proposes a Nauruan
  language policy". Germany: "KMK recommendation 'Interkulturelle Bildung und
  Erziehung in der Schule'".
- **`instrument replaced`** — one instrument supersedes or repeals another.
  Kept SEPARATE from `instrument amended` because the corpus keeps them
  separate and a reader needs to see a break rather than a revision. Benin:
  "Loi 2003-17 repeals the 1975 ordonnance d'orientation". American Samoa:
  "ESSA replaced 'limited English proficient' with 'English learner'
  throughout the ESEA". Brazil: "Lei 13.415 ... repeals Lei 11.161 outright".
- **`body or programme changed`** — renamed, merged, restructured or closed.
  Dominican Republic: "Resolution No. 05 of 2018 renames the National Council
  on Disability's Education Division". Nunavut: "Inuit Language Protection Act
  renamed the Inuktut Protection Act". Bahrain 2020, which appears on three
  maps at once: "Restructuring of the Ministry of Education".
- **`international instrument accepted`** — ratification, accession, or a
  Charter declaration. Fiji: "Ratified the Convention on the Rights of Persons
  with Disabilities". Switzerland: "European Charter enters into force for
  Switzerland on 1 April 1998; Italian and Romansh are covered by Part III".
- **`state of affairs recorded`** — a dated observation that nothing exists.
  Distinguished from `provision described` for the same reason the project
  distinguishes `none established` from `not stated`. Bahamas: "Constitution;
  does not enshrine the right to education and omits disability from its
  equality provision". Tasmania: "The 2017 national review found no specific
  policy for languages education in Tasmania".
- **`funding decided`** — 20 rows, and the count is the point. Canada: "Canada
  and Ontario signed a $126 million, eight-year funding agreement on 22
  January 2020". Kept because the shape is real and the scarcity is
  informative, on the same grounds `EXIT_MECHANISM` keeps `age ceiling`.

**The 48% is the finding.** The policy history was written as a timeline of
what instruments SAY, not of what CHANGED. Any column called "change type"
applied to this corpus comes out close to half "no change recorded" — which is
not a defect in the vocabulary, it is a fact about the field that a reader of
the timeline needs told.

## Axis 2 — direction of change. This one does NOT survive.

Whether a change widened or narrowed who is covered: the axis that would
actually answer "what was changed". Probed with widening and narrowing
language across all 4,305 rows:

    widening language     200   5%
    narrowing language     49   1%
    both                    1   0%
    neither              4055  94%

At 94% `not stated` this cannot be a column. `bilingual_handling` is silent on
93% and that silence IS a finding about policy; this silence is a finding
about how the rows were DRAFTED, which is a different thing and not worth a
schema change to say.

And the 6% that fires is noisy — "Education Act (Cap 262)" and "dated only to
the decade by the source" both landed in `narrowing`. The true count is lower
than 249 and is not knowable without hand-coding.

But the rows that genuinely state a direction are the most valuable rows in
the corpus for the outcomes work, because they are the only ones recording a
delta:

  - Queensland 2022: "EAP verification retained only for intellectual
    disability; Speech-Language Impairment ceases as a verified category"
  - Cyprus 2025: special education extended year by year to age 22
  - Denmark, Act 379/2012: folkeskole special education restricted to support
    of at least 9 lessons a week
  - Czechia 2021: the revision removing English as the preferred first
    foreign language

RECOMMENDATION: find these as a worklist, not as a column. A `direction` field
on a row that is 94% empty costs a schema change and buys a filter that could
be a grep.

## Axis 3 — which field changed. Weak, and weakest where it matters most.

Probed on dld's 1,142 rows against eight field-signalling term sets:

     132  12%  identificationCriteria        12   1%  serviceModel
     122  11%  legalEntitlement               9   1%  funding
      77   7%  workforce                      8   1%  assessments
       3   0%  dischargeCriteria              3   0%  multilingualProvision

    rows signalling NO field:       801  70%
    rows signalling exactly one:    316  28%
    rows signalling two:             25   2%

70% of rows do not say which field they touched, and `dischargeCriteria` — the
field this session spent its whole length filling — is signalled by THREE rows
out of 1,142. So the cross the original question wanted, "did discharge rules
change in the same years categorization did", cannot be asked of this corpus
at all. There is nothing to cross.

## What to do, in order

1. **Wire Axis 1 only.** Nine values plus the residual, one column,
   `change_type`. It is the only axis the corpus supports.
2. **Do not wire Axis 2 or 3.** Build the direction worklist by grep and read
   it; leave the field link until rows exist that carry one.
3. **Remember it is a typed shape.** `SHAPES.history` is `["year",
   "description"]`, so a column means editing `src/store.js` and
   `pages/submit.html` and running `node assemble.js` — the same operation as
   the `series` retype earlier today, which silently served the old form until
   the build was run.
4. **Nothing needs recoding**, because nothing is coded. That is the one
   advantage of arriving at this field last.

---

# Costing the field link (asked 2026-09-20, after the above)

Axis 3 was reported as weak on a description-keyword probe: 30% of dld rows.
That was the WORST available route and the number was misleading. Three
better routes exist, and the cost depends entirely on which tier a row lands in.

## Design: no typed-shape change is needed

The `coding` sidecar already carries array-grained rows — `many: true`, built
this session for `dld.legalEntitlement` and `dld.assessments`. A
`<domain>.policyHistory` scheme rides it: one coding row per history row,
columns `year`, a `key` disambiguator, and `fields_touched` as a LIST.

`SHAPES.history` never changes. `apply-coding.js` validates it,
`store.js` `codingFor()` already branches on `many`, `/patterns` renders any
vocabulary column it finds and the `/views` CSV discovers columns from the
data. One edit to `src/coding.js`, five scheme entries (the field list differs
per domain), and nothing else has to move.

The `key` is required because **23% of rows sit on a repeated year** — 344 of
1,259 entries with history have at least one year twice, Armenia has 1999
twice and 2009 twice, Antigua has 2013 three times. Year alone cannot key a
coding row to a history row. Year plus a normalised 30-character prefix of the
description can, and survives `hist-apply.js` merging rows because that tool
adds rows rather than rewriting them.

## What can be attributed automatically, measured over all 4,305 rows

    tier                                    rows        single-field
    1  description sentence in a field       333   8%        330
    2  shared instrument identifier          167   4%        137
    3  shared year, PROSE fields only       1319  31%        926
       no signal                            2486  58%

- **Tier 1 is near-certain by construction.** `hist-from-fields.js` mined
  those rows OUT of that field's prose, so the sentence is still sitting
  there. Andorra's "It replaces the model in force since 2008" is in the
  history AND in `legalEntitlement`.
- **Tier 2 looks right on inspection.** "Ontario Regulation 181/98 requires
  every school board to establish an Identification, Placement..." →
  `identificationCriteria`. Cyprus 113(I)/1999 → `legalEntitlement`.
- **Tier 3 is ~75-85% precise on a 15-row hand check** — 11 clearly right, 2
  clearly wrong, 2 ambiguous. Both failures were coincidental years: Sierra
  Leone's 2021 inclusion policy matched a 2021 SLT volunteer post, and Spain's
  Real Decreto 217/2022 matched a Eurostat count in a typed series. Excluding
  typed fields (done above) removes the second class. This tier needs REVIEW,
  not acceptance.
- **58% get no signal.** Much of that is genuinely not field-specific —
  "Restructuring of the Ministry of Education", "Constitution; does not
  enshrine the right to education", "Education Law aims at universal, balanced
  and equitable education". `system-wide` must be a value, on the same logic
  that separates `none established` from `not stated`, or the coder will be
  pushed into guessing.

## The number that should decide the order of work

Only rows on systems that carry the codings can enter a cross-tab at all:

    dld entries with policyHistory:                279   1142 rows
      ... and a coded threshold_basis:             172    784 rows
      ... and BOTH threshold and discharge coded:   46    185 rows

**185 rows on 46 systems** is the slice that can answer "did discharge rules
change in the same years categorization did". And it is the slice automation
serves WORST:

    tier 1 sentence match      3   2%
    tier 2 token match        13   7%
    tier 3 year, prose        53  29%
    no signal                116  63%

The rows that attribute easily sit on entries with long prose. The rows that
are needed sit on entries whose history is short and instrument-level. 63% of
the useful slice needs a person to read it.

## Recommendation

Do the 185 first, not the 4,305. It is bounded, it is the only slice that can
produce a finding, and finishing it says whether attribution buys anything
before another 4,120 rows are touched.

State the limit honestly either way: 185 rows across 46 systems is thin for a
year x field x outcome analysis, and `dischargeCriteria` was signalled by
three rows out of 1,142 in the description probe. The history may simply not
record much about discharge, in which case the answer to the original question
is that the corpus cannot support it yet — and that is worth knowing for the
price of one pass rather than five.

---

# The eal pass, and the one thing the attribution has produced

Same method, same day: all 208 policyHistory rows on the 73 eal entries that
carry both a `newcomerCriteria` and a `removalCriteria` coding, read and
attributed by hand.

    l2Support 86   system-wide 46   newcomerCriteria 42   l1Support 20
    not determined 18   removalCriteria 13   bilingualEducationNotes 9
    newcomerProportion 4   l3Support 4   achievementGap 1

    tied to at least one real field  147  71%
    system-wide only                  43  21%
    left `not determined`             18   9%

A little more residue than dld's 80/15/5, and the reason is visible in the
rows: 20 of the 73 are sub-national United States entries whose history is a
line of "ECS reading of statute and regulation as at May 2020, not a state
publication" — a citation of a secondary survey, not a policy event, and
`not determined` is the only honest answer to it.

## The recurring judgement, written down so the next coder makes the same one

`l2Support` is teaching the language of instruction. `l1Support` is the
pupil's own language. `newcomerCriteria` is the CATEGORY or its boundary.

So "ESSA replaced 'limited English proficient' with 'English learner'
throughout the ESEA" — which appears on American Samoa, Guam, the Northern
Mariana Islands and Puerto Rico — is `newcomerCriteria` on all four: the
category was renamed, and nothing about support changed.

## What the cross now says, on both maps

    dld   34 years touch identificationCriteria
           9 years touch dischargeCriteria, on 8 systems
           3 co-occur on the same system in the same year

    eal   42 years touch newcomerCriteria
          13 years touch removalCriteria, on 12 systems
           6 co-occur on the same system in the same year

Nine and thirteen. The corpus still cannot answer whether exit rules move when
entry rules do, and that is the honest headline.

## But the eal co-occurrences are not random, and that IS worth recording

Five of the six are the United States:

  - United States 2015: "ESSA reauthorizes Title III, requires statewide
    uniform EL entrance/exit procedures"
  - Michigan 2023: "Revised Consolidated State Plan under ESSA restates
    entrance and exit rules"
  - New Jersey 2019 and 2020: entry-and-exit memo, then its replacement
  - Rhode Island 2026: "Identification and Reclassification guidance"

The sixth is Greenland's Order 21/1999, which "sets entry, review and exit"
in one instrument.

Check the obvious confound first. US entries are 32% of the attributed set and
19% of the attributed rows — but **77% of the rows that touch
removalCriteria**, four times their share. So this is not only
over-representation.

The mechanism is in the 2015 row: ESSA REQUIRES a state to publish uniform
entrance and exit procedures, so one document governs both, and a revision to
it necessarily changes both. Entry and exit co-occur in the United States
because the statute makes them one document.

That is a finding about how instruments are WRITTEN, not about policy
converging — the same distinction the change-type axis turned on, and the
second time this corpus has answered a question about policy with a fact about
drafting. Worth carrying into the outcomes work: a year in which a system's
entry and exit rules both changed may mean a reform, or it may mean the
country files them on one form.

---

# WITHDRAWN: the eal entry/exit co-occurrence

Recorded above, on the day the eal pass was applied:

> But the eal co-occurrences are not random, and that IS worth recording. Five
> of the six are the United States [...] The mechanism is in the 2015 row --
> ESSA REQUIRES a state to publish uniform entrance and exit procedures.

The co-occurrence part does not survive a null and is withdrawn.

`research/tools/hist-entry-exit-cross.js` runs the test. Eight systems carry
both an entry year and an exit year, which is the whole analysable set:

    Greenland      rows in 6 years, entry 2, exit 1, same-year 1
    Netherlands    rows in 5 years, entry 1, exit 1, same-year 0
    United States  rows in 3 years, entry 1, exit 1, same-year 1
    Michigan       rows in 3 years, entry 2, exit 1, same-year 1
    Minnesota      rows in 3 years, entry 2, exit 1, same-year 0
    New Jersey     rows in 2 years, entry 2, exit 2, same-year 2
    Rhode Island   rows in 2 years, entry 1, exit 1, same-year 1
    Texas          rows in 2 years, entry 1, exit 1, same-year 0

Six of nine exit years co-occur with an entry year. Reshuffling each system's
exit years among the years that system ACTUALLY HAS ROWS IN -- which is the
only place a coding can land -- gives six or more co-occurrences 40% of the
time. **p = 0.40.**

The reason is in the middle column. New Jersey has rows in two years and both
carry entry and exit, so its two co-occurrences are forced by arithmetic, not
observed. Rhode Island and Texas have two row-years each. Five of the eight
systems have three or fewer. With that little room, coincidence is the
expected result.

## What survives

Two things, and they are about documentation rather than about timing.

**Exit rules are written down in the United States and almost nowhere else.**
US entries are 23 of the 73 attributed eal entries and 19% of the attributed
rows, but carry 10 of the 13 rows that touch `removalCriteria` -- four times
their share. That is a real skew and it is not what the withdrawn claim was
about.

**The ESSA mechanism is in the row text, not in the statistics.** The 2015
United States row reads "requires statewide uniform EL entrance/exit
procedures", and Greenland's Order 21/1999 "sets entry, review and exit" in one
instrument. One document governing both is a documented fact about those two
instruments. It is not evidence that entry and exit MOVE together, and the
earlier note read as though it were.

## The rule this is the third instance of

Split by the thing under test, and check whether the result survives the
corpus's own shape. `CROSSTABS.md` records three of six candidate findings
failing a confound check; this is the same failure in a different form, where
the confound is not documentation depth but how few dated rows an entry has.

An entry with two history rows cannot produce evidence about timing. It can
only produce coincidence.

## Wired in, 2026-09-20

Axis 1 is now a column. `HISTORY_OPERATION` sits in `src/coding.js` with the ten
values and the glosses above, and `operation` joins `fields_touched` on every
domain’s policyHistory scheme. One file: `codingFor` picks up any field that
has a scheme, so storage, derive, the API, /patterns and the CSV all took it
without an edit.

**The precedence is stated explicitly, and it is not the frequency order this
file printed.** The derivation says a row that repeals one act and makes another
is a replacement, so `instrument replaced` has to beat `instrument made`, and
the same logic puts every change-to-an-existing-thing above the making of a new
one. The order in the constant IS the precedence.

### The proposer, and what it is worth

`research/tools/hist-operation.js` proposes an operation per row and ABSTAINS
rather than guessing. It never proposes `provision described`: that value is 48%
of the corpus and a tool defaulting to it would code half the rows by doing
nothing. Abstentions are where it lives, alongside whatever the patterns missed.

```
            proposes   abstains
  dld          437 38%   705 62%
  eal          186 31%   418 69%
```

Hand-checked on 22 dld rows spread across the corpus: **7 of 9 proposals right,
11 of 13 abstentions right.** The two failures were both the mode this file
warned about, and both are fixed:

- Andorra, “It replaces the model in force since 2008”, came out
  `instrument made`. The replacement pattern demanded an instrument noun within
  forty characters and “model” is not one, so the row fell through to “in
  force”. The noun requirement is gone; a replacement misread as a making is
  the error the precedence exists to prevent.
- District of Columbia, “takes effect”, was not recognised as coming into
  force. Added — and the precedence then had to be checked, because
  “amended effective 14 August 2022” now matches BOTH amendment and making.
  South Dakota still comes out `instrument amended`, which is the order doing
  its job.

### What is still to do

The join between a coding row and the history row it codes is by year, a
60-character normalised prefix, and occurrence. Matching on a whitespace-only
normalisation found **zero** of the 207 already-coded dld rows, because the
stored key reads “pre university education act” where the description reads
“Pre-University Education Act”. The tool now uses the same normaliser as
`hist-attr-build.js` and `views.html`, and finds 207 and 208 exactly.

1,331 rows still carry no coding at all — 935 on dld, 396 on eal. The 415 rows
already coded carry `fields_touched` and no `operation`, so they need a second
pass even though they are not part of that backlog.

## First hand-coded region: eal Europe, 124 rows

Batching is by region because a region is the unit a reader can actually check.
`eal` Europe is 38 entries and 124 policyHistory rows, every one of which needed
`operation`: 98 already carried `fields_touched` from the earlier pass and 26
carried no coding at all, so the batch size is set by the new column rather than
by what was missing before.

```
  provision described            61   50%
  plan or strategy issued        20   16%
  body or programme established  13   11%
  instrument amended             12   10%
  instrument made                 6    5%
  body or programme changed       6    5%
  funding decided                 3    2%
  state of affairs recorded       2    2%
  instrument replaced             0    0%
  (left unset)                    1
```

**The residual lands at 50%, against the 48% predicted from the whole corpus.**
That is the one number worth taking seriously here: the derivation profiled all
4,305 rows with regexes it called poor instruments, and a hand pass over 124 of
them put the residual within two points of the profile. The column measures what
the derivation said it would.

`instrument replaced` comes out **empty**, and the two rows that look like
replacements are why. France's "ELCO formally ended, replaced by EILE" and the
Netherlands' "OETC replaced by OALT" are both programmes being replaced, not
instruments, and `body or programme changed` already glosses closure. Whether
`instrument replaced` is rare in European eal or simply rare in 124 rows is not
answerable from one region.

### One row left unset

Sweden 2015 — "For primary school there is a slight increase, which may be due
to the amendment of the Education Act introduced…". The row's subject is a
statistic and its attribution is hedged to a maybe, so no operation happened in
2015 that this row asserts. It is also visibly truncated. `apply-coding.js` was
given no value for it, and the cell is absent rather than filled, per the
coding-pass rule that a forced value corrupts a distribution silently because
the result looks complete.

### The vocabulary gap this pass found

**A change of SCOPE with no instrument named has nowhere to go.** Four rows:
Czechia 2025 "eligibility for free language preparation extended to Czech
citizens with foreigner-equivalent needs"; Great Britain 2012 "first-language
reporting becomes mandatory in the Pupil Level Annual School Census"; the
Netherlands 2023 "2-year cap on newcomer provisions formalised"; Slovakia 2025
"compulsory schooling extended to Ukrainian refugee children". Each records a
real change — who is covered, or whether a thing binds — but names no instrument
to amend and no body to establish. All four took `provision described`, which is
true of the sentence and loses the change.

That is four rows in 124 and not yet worth a value. Noted here so the count can
be carried forward: if it runs at 3% across regions it is ~130 rows corpus-wide,
and at that size it is an axis.

A second, smaller stretch: `state of affairs recorded` is glossed as a dated
observation **that nothing exists**, and San Marino's 2016 row observes a fact
rather than an absence ("the 2016 curriculum guidance notes many pupils have a
non-school language background"). It is coded there because the row records an
observation rather than an operation, and the gloss wants widening from *that
nothing exists* to *that records a state rather than a change*.

## What the hand pass did to the proposer

The hand coding is an answer key, so the proposer can be scored rather than
guessed at. It was **17 of 29 correct, 59%**, and the twelve errors were three
defects rather than twelve:

- **Eight of twelve** were `establish` firing on an abstract object. "Establishes
  the *außerordentlicher Schüler* category", "the individual educational needs
  principle", "the state's duty", "the right to preparatory education", "the
  inclusive-education principle", "entry-assessment procedures", "the ASL legal
  framework", "socio-economic index variables". Every one is the residual: a row
  that dates an instrument and says what it provides. The verb now requires a
  noun for something that can be walked into or enrolled on, and the abstract
  nouns veto it outright.
- **Two** were a programme replacement read as an instrument replacement (ELCO,
  OETC). The programme test now runs first.
- **Two** were `Strategy … adopted` taken as an instrument being made (Hungary
  2013, Slovenia 2007). That is how a strategy is issued.

Fixed, it scores **27 of 27**. That number is a fit and not a measurement: the
region it was tuned on cannot also test it, and the held-out test is whichever
region is coded next. Two things are worth reporting honestly about the fix:

- The first attempt at the `adopt` veto **did not work**, and scored 82% rather
  than 100% because a negative lookahead only looks forward while both failing
  rows put the word *Strategy* before *adopted*. It is anchored to the whole row
  now.
- Widening the plan pattern to `guidance|guidelines` **made things worse**,
  adding four false positives in one region: Irish application guidelines, two
  Italian *circolari* and a San Marino curriculum note all describe provision or
  record a fact. A document type is not an operation, and the words are gone
  again.

Abstention stayed high on purpose — 96 of 124 — and 64% of abstentions took the
residual. The proposer covers roughly a fifth of a batch and the reader does the
rest, which is the split the header argues for.

## Held-out region: eal Oceania, 47 rows

The point of coding Oceania next was that the proposer had never seen it, so the
score here is a measurement rather than the fit Europe produced.

**15 of 17 proposals correct, 88%**, on 19 entries and 47 rows. The two errors
were new defects rather than repeats:

- American Samoa 2007, "piloted LAS Links and the Stanford ELP but had ADOPTED
  NEITHER", took `instrument made` off the word *adopted*. It is a dated record
  that nothing was adopted, so it is coded `state of affairs recorded`. The
  negation veto is now anchored to the whole row, for the same reason the
  strategy veto had to be.
- Vanuatu 2001, "National Education Act TARGETS disadvantage by gender,
  ethnicity and status", took `plan or strategy issued`. It is an Act saying
  what it provides. `targets` was too loose a marker for a plan and is gone.

### The regression the held-out region caught

Three entries — American Samoa, Guam and the Northern Mariana Islands — carry
"ESSA replaced 'limited English proficient' with 'English learner' throughout
the ESEA". That row is the example `instrument replaced` uses **in its own
gloss**, and the instrument-noun requirement added for ELCO and OETC made the
proposer abstain on all three. An all-caps acronym is the instrument noun there.

Fixing it introduced a second, quieter fault worth recording: the acronym clause
needs case sensitivity and the rest of the rule needs `/i`, one regex cannot
carry both, and folding them into one literal dropped the flag. Nothing errored.
`dld`'s `instrument replaced` count fell from 26 to 8 and both eal regions still
scored 100%, because neither region's answer key had many replacements in it.
The count on a third domain is what showed it. It is two rules now, which costs
nothing since the first match wins either way.

With all three fixed, both regions score 27/27 and 18/18. Europe's remains a
fit; Oceania's is now a fit too, and the next held-out region is Asia.

### Two more shapes with nowhere to go

The scope-change gap from Europe gained two more rows here — Australia 2027
"EAL 2.0 full implementation mandated" and the same shape as GB 2012. Running
total **6 in 171**, 3.5%, holding at the rate that would make it an axis.

A separate small shape: **republication**. Australia 2025 "'Advice on using the
EAL/D Learning Progressions' reissued" and 2026 "guidelines both republished, in
January and March" record a document being reissued with no change stated —
neither amended nor made nor described. Two rows, coded `provision described`,
noted in case it recurs.

## Second held-out region: eal Asia, 190 rows

The largest eal region, 65 entries, and only 16 rows carried any prior coding.

```
  provision described            79   42%
  plan or strategy issued        28   15%
  instrument amended             22   12%
  body or programme established  22   12%
  instrument made                17    9%
  state of affairs recorded      14    7%
  body or programme changed       7    4%
  instrument replaced             1    1%
  funding decided                 0
```

**The residual drops to 42% here, against Europe's 50%,** and the value that
takes up the slack is `state of affairs recorded` at 7% against Europe's 2%.
That is India: the Commissioner for Linguistic Minorities' 52nd Report runs
through the states recording that a government did not reply, that no monitoring
machinery exists, that no Language Preference Registers are kept. Those rows are
dated observations that nothing exists, which is exactly what the value is for,
and they are concentrated in one country's sub-national entries.

The same entries are why `plan or strategy issued` holds at 15% on a region with
few national strategies — the CLM's reiterated recommendations to sixteen states
are recommendations, and they code as such.

**53 of 53 proposals correct after the fixes below, 48 of 51 (94%) before them.**
The three errors:

- China 2006, "Compulsory Education Law REVISED, in force 2006-09-01", took
  `instrument made` off *in force*. `revised` was not in the amendment pattern.
- Myanmar 2022, "military AMENDMENTS to the National Education Law", did the
  same, because `amend(s|ed|ing|ment)?` does not match the plural.
- Taiwan 2015, "Five-year PLAN ... ADOPTED", took `instrument made`. The adopt
  veto knew *strategy* and *action plan* but not a bare plan.

`revised` needed care rather than adding. China 2026 reads "REVISED Law on the
Standard Spoken and Written Chinese Language enters into force 1 January", which
dates a commencement, not a revision — the same word, and the operation is
`instrument made`. The order carries the difference, so the pattern requires
`revised` to FOLLOW the instrument noun rather than precede it.

Three abstentions were misses rather than residual, and all three were missing
vocabulary in the patterns rather than missing values in the scheme: India's
"Chhattisgarh State Urdu ACADEMY established" (no `academy` in the noun list),
Turkey's "establishes Temporary Education CENTERS" (`center` had no plural), and
Iran's "NULLIFIES the 2004 directive … and VOIDS tuition-fee articles", which is
a repeal in every sense but the word used for it.

All three regions score clean with the fixes in, and `dld` — still never tuned
on — moved the way it should: `instrument amended` 102 to 108, `body or
programme established` 22 to 26, nothing else disturbed.

### The scope-change gap, updated

Asia adds four: China 2017 and 2020, where five and then six provinces "begin
the unified three-subject textbooks"; India 2014, "minimum enrolment for a
mother-tongue class relaxed from 20 to 15"; India 2014 again, where a G.O.
"extended the pattern to CBSE schools". Running total **10 in 361, 2.8%.** Still
holding near 3%, still coded `provision described`, still not an axis until you
say so.

## Third held-out region: eal Americas, 143 rows

58 entries, 72 rows carrying prior `fields_touched`.

```
  provision described            58   43%
  instrument amended             23   17%
  state of affairs recorded      12    9%
  instrument made                12    9%
  plan or strategy issued        10    7%
  body or programme established   9    7%
  instrument replaced             8    6%
  body or programme changed       1    1%
  international instrument accepted 1  1%
  (left unset)                    9
```

`instrument amended` at 17% is the highest of any region, and `instrument
replaced` at 6% likewise. Both are the United States: a state's identification
rules live in a plan, a chart or a memo that gets revised, superseded and
reissued, so the corpus records operations ON instruments where other regions
record what an instrument says.

**The proposer scored 30 of 42, 71% — the worst of the three held-out regions,
and the most useful.** One shape accounted for four of the twelve errors and is
the largest single defect any region has exposed.

### A parenthetical amendment date is not an amendment

Four UNESCO PEER rows:

- Barbados 1966: "Constitution of Barbados, AMENDED 2007; does not enshrine the
  right to education"
- Dominica 1978: "Constitution …, LAST AMENDED 2014; does not enshrine the right
  to education"
- Guyana 1980: "Constitution Art. 27 (AS AMENDED 2001) gives a right to free
  education"
- Suriname 1987: "Constitution (AMENDED 1992) Art. 39 guarantees free compulsory
  primary education"

Every one is dated decades before the amendment it mentions, because the
amendment date is **dating the instrument the row describes**. Two of them are
`state of affairs recorded` — the row's point is that the constitution does not
enshrine the right — and two are the residual. Canada 2012 is the same shape
with a different word: "Education Act s 17 carries the language-of-instruction
power (IN FORCE 2019)".

The distinction the veto has to keep is that China's "Education Law of the PRC
enacted, in force 1995-09-01" is a real making and must survive. It does,
because it is unbracketed and carries `enacted`. Laos 2003's "amended IN 2003"
survives too: the word *in* marks a year that is the row's own.

**This convicted one of my own Asia codings.** Kuwait 1965, "Compulsory
Education Act, AMENDED 2014, sets special school placement", was coded
`instrument amended` off the proposal. It is the same shape, it is dated 1965,
and it is now `provision described`. The Asia batch was rebuilt and rewritten
with that correction.

### The row that forbids its own coding

Cuba 2023 reads: "A Ley de Educación was listed on the legislative timetable for
2023 per the 2020 UNESCO PEER profile; ENACTMENT NOT VERIFIED — do not state it
as enacted." The proposer matched `enact` and proposed `instrument made`, which
is precisely what the row instructs a reader not to record. It is
`state of affairs recorded`, and `not verified` is now a veto on that value.

### Nine rows left unset, and why

Nine United States rows are provenance notes rather than policy events: "ECS
reading of statute and regulation as at May 2020, not a state publication", and
eight more like it. They date a secondary source's reading, not an operation on
an instrument. `research/EAL-FRAMEWORK-DRAFT.md` argues that a property of the
EVIDENCE does not belong in a column about systems, and this is that case
exactly. They keep their `fields_touched` and carry no `operation`.

That is nine in one region against one in the previous three combined, and it is
worth saying what it is: a documentation pattern in the US sub-national entries,
not a gap in the vocabulary.

### What was fixed, and what was left

Nine defects fixed, taking the region from 71% to **41 of 43, 95%**, with the
other three regions unchanged at 100%. The proposer also gained a **veto slot**:
cramming these refusals into the patterns was tried and abandoned, because a
whole-row negative lookahead cannot say *unless this is the only thing that
matched*, and the nesting was unreadable. A veto sits beside its pattern and
says what it refuses.

Two errors are left standing deliberately, both judgement calls rather than
pattern faults:

- Arizona 2019, "adopts four Structured English Immersion MODELS", proposes
  `instrument made` and is coded `body or programme established`. Both readings
  are defensible and the word `adopts` genuinely is there.
- Washington 2019, "New teacher bilingual/ELL endorsement requirement TAKES
  EFFECT", proposes `instrument made` and is the scope-change shape below.

### The scope-change gap, updated

Three more: Quebec 2006 "ESL becomes compulsory from Cycle 1 of primary";
Washington 2019 above; Michigan 2018 "this threshold has moved". Running total
**13 in 494, 2.6%**, across four regions.

## eal, four regions of five

```
  provision described               217   44%
  instrument amended                 63   13%
  plan or strategy issued            63   13%
  body or programme established      46    9%
  instrument made                    38    8%
  state of affairs recorded          34    7%
  body or programme changed          15    3%
  instrument replaced                12    2%
  funding decided                     5    1%
  international instrument accepted   1    0%
                                    494
```

**The residual has sat between 42% and 50% in every region**, against the 48%
the whole-corpus profile predicted. Four independent hand passes, four different
documentation cultures, one number. That is the finding this column was wired in
to produce, and it is now as well evidenced as anything in this file.

### Held-out proposer scores, in order coded

```
  Europe     tuned on, not a measurement
  Oceania    15/17   88%
  Asia       48/51   94%
  Americas   30/42   71%
```

The scores do not improve monotonically, and Americas is the reason to keep
hand-coding. Each region has its own documentation habits — India's Commissioner
reports, the Caribbean's UNESCO PEER profiles, the US states' secondary-source
citations — and a proposer tuned on three of them met a fourth and lost twenty
points. **Do not let it write a region unread.**

## Last region: eal Africa, 100 rows

35 entries, and **not one row carried any prior coding** — the only region where
the `operation` pass was also the first pass.

```
  provision described            60   60%
  body or programme established   8    8%
  plan or strategy issued         8    8%
  state of affairs recorded       7    7%
  instrument made                 5    5%
  instrument amended              4    4%
  provision, other values         8    8%
```

**The residual reaches 60% here, the highest of any region**, and the abstention
residual is 76%. Africa's policy history is written almost entirely as *this
instrument says this*: "Law 13/01 art 9 makes Portuguese the language of
instruction", "2005 Constitution art. 5: Kirundi is the national language",
"Education Law art. 13 gives every Sudanese child a right to basic education".
The timeline records what the law provides far more often than it records
anything happening to the law.

**The proposer scored 19 of 26, 73%** — near the Americas' 71% and for the same
underlying reason, which is now fixed properly.

### The defect that took four regions to see correctly

Three regions produced the same error in three costumes:

```
  Barbados 1966    "Constitution of Barbados, AMENDED 2007; does not enshrine…"
  Kuwait 1965      "Compulsory Education Act, AMENDED 2014, sets placement"
  South Africa 1953 "Bantu Education Act …, REPEALED IN 1979"
  Canada 2012      "…carries the language-of-instruction power (IN FORCE 2019)"
```

Each row is dated years or decades before the operation it mentions, because the
date is **dating the instrument the row describes**. The Americas fix was a
regex for the punctuation these happen to use — a comma, a bracket, a semicolon
— and South Africa broke it immediately by writing "repealed in 1979" with no
punctuation cue at all.

The actual rule was never in the text. It is whether the year attached to the
operation is **the row's own year**, and the proposer has had the row in hand the
whole time. `datedElsewhere(d, h)` compares them, and it does in one function
what four increasingly baroque regexes were failing to approximate:

- Barbados, Kuwait, South Africa, Canada — vetoed, year differs
- Laos 2003 "amended IN 2003" — kept, year matches
- Mauritius 2016 "last amended, by Act 18 of 2016" — kept, year matches
- China 1995 "enacted, in force 1995-09-01" — kept, year matches

To carry it, a veto may now be a **function of (description, row)** as well as a
regex. That is the design change this region paid for, and it is the one worth
remembering: the fact that decides a coding is not always in the sentence.

### The other six

- Eritrea 1997, "Even if Eritrea has NOT RATIFIED the Convention Against
  Discrimination in Education", proposed `international instrument accepted`.
  Ratification denied is not ratification.
- Ethiopia 1991, "Instruction in different languages was allowed from 1991,
  BEFORE the policy was adopted", proposed `instrument made` off an adoption the
  row places in a different year on purpose.
- Liberia 2010, "sector plan established these PROGRAMMES", fell through to
  `plan or strategy issued` because `programme` has no plural in the noun list —
  the third time this exact class of miss has appeared, after `Centers` and
  `academy`. Plurals are in now, with `committee`, `office` and `initiative`.
- São Tomé 2011, "Basic universal education ACHIEVED, PER THE education sector
  plan", cites a plan as its source rather than issuing one.
- Zimbabwe 2016, "BEGINS AMENDING the Education Act", records a process started.
- Zimbabwe 1987, "Education Act s.62 AS ENACTED set Shona or Ndebele with
  English", is left standing as a judgement call: the enactment year is right,
  and the row still reads like the residual's own gloss example.

Africa went 73% to **23 of 24, 96%**.

## eal complete — 604 rows, five regions

```
  provision described               277   47%
  plan or strategy issued            72   12%
  instrument amended                 67   11%
  body or programme established      55    9%
  instrument made                    43    7%
  state of affairs recorded          42    7%
  body or programme changed          17    3%
  instrument replaced                13    2%
  funding decided                     5    1%
  international instrument accepted   3    1%
                                    594   (10 left unset)
```

**The residual is 47%. The whole-corpus profile predicted 48%.**

That is the result this column was wired in to test, and it is now settled on
`eal` by five independent hand passes rather than by the regexes the derivation
warned were poor instruments. The per-region spread is the more interesting
half:

```
  Africa      60%      the timeline is what the law says
  Europe      50%
  Americas    43%      US states revise, supersede and reissue
  Asia        42%      India's CLM reports record absences
  Oceania     38%
```

**Twenty-two points separate Africa from Oceania**, and every region's position
is explicable from how its entries were written rather than from what its
systems do. That is a finding about the corpus, and it is the honest caveat to
attach to any cross-region comparison of this column: `operation` measures the
documentation at least as much as the policy.

### Held-out proposer scores, in coding order

```
  Europe     tuned on, not a measurement
  Oceania    15/17   88%
  Asia       48/51   94%
  Americas   30/42   71%
  Africa     19/26   73%
```

Never monotonic, and that is the argument. Two of the four held-out regions cost
twenty points each, both times because a documentation habit the proposer had
never met — UNESCO PEER constitution profiles, then African statute-recital
timelines — produced a shape it read confidently and wrongly. After every fix
all five regions score 95% or better, which says nothing about the sixth.
**Do not let the proposer write a region unread.**

# dld

## First region of a new domain: dld Europe, 172 rows

52 entries, 93 rows carrying prior `fields_touched`, one left unset.

```
  provision described            101   59%
  instrument amended              25   15%
  instrument made                 18   11%
  instrument replaced             14    8%
  body or programme established    6    4%
  state of affairs recorded        4    2%
  plan or strategy issued          2    1%
  body or programme changed        1    1%
```

**The proposer scored 36 of 41, 88%, on a domain it had never seen.** That is
the transfer result and it is worth stating plainly: five hand passes on `eal`
produced a proposer that arrives at `dld` performing about as well as it did on
its second `eal` region. The vocabulary is not domain-specific and neither, it
turns out, are most of the patterns.

The residual at 59% is second only to Africa's 60%, and for the same reason:
dld Europe's timeline is a statute recital. "Education Act 561/2004 Sb. sets the
school system and duties towards pupils with special educational needs", "Ley
Organica 2/2006 (LOE) defines pupils with special educational needs", "Law
113(I)/1999 establishes special education as a right". Row after row dates an
instrument and says what it provides.

`plan or strategy issued` collapses to **1%** here against 12% across `eal`.
Special-needs policy in Europe is made by statute and amended by statute; there
is almost no soft-law layer in these timelines at all.

### The structural fault this region exposed

Three of the five errors came from one thing, and it was mine rather than the
corpus's. `body or programme changed` had been **hoisted to the top of RULES**
back in the Europe pass, so that France's ELCO and the Netherlands' OETC — two
programmes being replaced — would not read as instruments being replaced. That
hoist quietly overrode the precedence `HISTORY_OPERATION` itself declares, which
puts every change-to-an-instrument above every change-to-a-body.

dld Europe billed for it twice in one region:

- Gibraltar 2009, "LN 2009/062 RENAMED the Handicapped Children (Assessment
  Panel) REGULATIONS and INSERTED a special needs definition" — an amendment,
  caught by a rename rule sitting above the amendment rule.
- Ireland 2025, "Circular 0024/2025 REPLACES the SSLD criteria: the category is
  RENAMED Developmental Language Disorder" — a replacement, caught the same way.

The fix is a split rather than a reordering. The hoisted rule keeps **only what
it was hoisted for** — a named programme, service or centre being replaced,
closed or discontinued — and renaming, restructuring and merging drop back to
their declared position below `instrument made`. Nunavut's "Inuit Language
Protection Act renamed the Inuktut Protection Act", which is the gloss's own
example for this value, still lands there, because nothing above it matches a
bare rename.

Greece 2018 is the row that proves the split is the right shape: "Law 4547/2018
replaces the KEDDY assessment CENTRES with … (KESY)" is two bodies being
swapped, and it needs the hoisted rule. It had been missing it because `centre`
had no plural — the **fourth** time that exact class of miss has appeared, after
`center`, `academy` and `programme`. Every noun list in the file now carries its
plurals.

### And two words appearing as content rather than as operations

- Estonia 2018: "Minister's Regulation 2 sets the PROCEDURE FOR external
  counselling team RECOMMENDATIONS on support services" — the recommendations
  are what the regulation regulates.
- Great Britain 2002: the "Education (Disability STRATEGIES and Pupils'
  Educational Records) (Scotland) Act 2002" — the strategy word is inside the
  Act's own title.

Both were reading a vocabulary word out of ordinary prose, which is the failure
mode `research/POLICY-HISTORY-VOCAB.md` warned about in its first paragraph when
it said `/caps?/` had matched "Education Act (Cap 262)".

### Where the proposer now stands

```
  eal Europe      30/30   100%
  eal Oceania     23/23   100%
  eal Asia        54/54   100%
  eal Americas    41/43    95%
  eal Africa      23/24    96%
  dld Europe      39/39   100%
                 210/213    99%
```

The three standing errors are judgement calls, not pattern faults, and are named
in the sections above. **This table is not a licence.** Every one of these
regions was hand-coded first and the proposer fixed afterwards; the number says
what the patterns have learned from six regions, not what they will do on a
seventh.

## dld Oceania, 140 rows

27 entries, 16 rows carrying prior `fields_touched`, one left unset.

```
  provision described             53   38%
  plan or strategy issued         32   23%
  instrument amended              14   10%
  instrument made                 12    9%
  state of affairs recorded       12    9%
  body or programme established    6    4%
  international instrument accepted 6   4%
  body or programme changed        3    2%
  instrument replaced              1    1%
```

**`plan or strategy issued` at 23% is the highest anywhere**, against 1% in dld
Europe. Small Pacific states document special-needs policy through sector plans,
disability action plans and national strategies rather than through statute, and
the column reads it straight off the corpus. Tuvalu files four plans in 2016
alone. `international instrument accepted` at 4% is also the highest: CRC and
CRPD ratifications are a visible part of these timelines in a way they are not in
Europe's.

The proposer scored **49 of 54, 91%**.

### One row left unset, and it is the second of its kind

Solomon Islands 2023: "The Education Act 2023 sealed copy is an image-only scan
with no text layer." That is a note about the EVIDENCE, exactly like the nine US
ECS rows in eal Americas, and it gets the same treatment — `fields_touched`
kept, no `operation`.

### A correction that crossed domains

Fiji 1966 appears in both maps with the same sentence: "Education Act (Cap 262),
Ordinance 36 of 1966 AMENDED TO ACT 30 OF 1976, regulates provision so that every
school-aged child attends school." It was coded `instrument amended` in the eal
Oceania batch, before `datedElsewhere` existed. The row is dated 1966 and the
amendment is 1976, so it is the residual, and **the eal coding has been
corrected to match.**

`datedElsewhere` missed it because the year sat thirty characters from the verb
rather than against it — "amended TO ACT 30 OF 1976" — and New Zealand 1989's
"later REPEALED BY THE 2020 Education and Training Act" was the same. The window
is thirty characters now, stopping at a sentence break so it cannot reach into an
unrelated clause, and every row whose year is its own still survives it.

### The other four

- Northern Marianas 2013, "Chapter 60-50 regulations adopted, REPLACING THE
  FORMER CHAPTER entirely" — a replacement of an instrument that is not called an
  act, a law or a decree. `chapter`, `regulations` and `rules` are nouns now.
- Samoa 2009, "Education Act ESTABLISHES COMPULSORY EDUCATION for all
  SCHOOL-AGED children" — `school` matches inside `school-aged`, because a
  hyphen is a word boundary. `education` joins the abstract nouns that veto this
  rule, alongside the rights and principles already there.
- New South Wales 2014, "makes every public authority PREPARE a disability
  inclusion ACTION PLAN" — a plan that is the OBJECT of a statutory duty is not a
  plan being issued. Scotland 2002 and South Australia 2018 are the same
  sentence in different words; the first of them was hand-corrected in dld
  Europe and this is the general fix.

### Two regions of dld, and what cannot yet be said

```
                       eal    dld
  residual, Oceania    40%    38%
  residual, Europe     50%    59%

  plan share, Oceania  11%    23%
  plan share, Europe   16%     1%
```

Oceania's residual replicates across the two domains almost exactly. Europe's
does not, and the plan share moves in **opposite directions** between the two
regions. So the tempting story — that the residual measures a region's
documentation culture and is stable across domains — is supported by one region
and contradicted by the other. It needs the remaining three dld regions before
anything is claimed. Reported here so the claim is not quietly made on the
strength of the half that fits.

## Where the proposer stands, seven regions

```
  eal Europe      30/30   100%
  eal Oceania     21/21   100%
  eal Asia        53/53   100%
  eal Americas    40/42    95%
  eal Africa      22/23    96%
  dld Europe      36/36   100%
  dld Oceania     48/48   100%
                250/253    99%
```

Held-out at first sight: 88, 94, 71, 73, 88, 91. Abstention has risen with every
veto added — 91 of 139 in dld Oceania — and that is the intended direction. A
proposal that has to be checked costs a reader the same as an abstention when it
is wrong, and more when it is plausible.

## dld Asia, 143 rows

44 entries, 19 rows carrying prior `fields_touched`, one left unset.

```
  provision described             70   49%
  plan or strategy issued         19   13%
  instrument amended              18   13%
  body or programme established   15   11%
  instrument made                  6    4%
  international instrument accepted 5   4%
  state of affairs recorded        5    4%
  instrument replaced              3    2%
  body or programme changed        1    1%
```

The proposer scored **38 of 47, 81%** — the second-worst first sight, after the
Americas. Six of the nine errors were one thing.

### A plan word is not a plan: the row's grammar decides

```
  Jordan 2018   "SEN in the 2018-22 Education Strategic Plan MEANS visual,
                 hearing or learning disabilities"
  Jordan 2018   "The Plan REFERS TO learners with special education needs TO
                 INDICATE children and …"
  Laos 2011     "The 2011-15 National Strategy PROVIDES an operational
                 DEFINITION of inclusive education"
  Uzbekistan    "ACCORDING TO the 2019-23 education sector plan, THERE ARE 188
   2019          special preschool institutions and 85 boarding schools"
```

Every one names a plan and none of them issues one. The rule the hand pass
settled on is about the verb: **a plan word marks this value when the row records
the document coming into being — adopted, issued, launched, published, approved —
or states its purpose in the verbs the gloss itself names, PROPOSES, AIMS,
INTENDS, TARGETS. When the verb is about CONTENT — means, refers to, defines,
provides a definition, according to — the row is describing what the document
says, which is the residual.**

Iran 1988 is the mirror image: "Law on Goals and Duties of the Ministry of
Education AIMS TO eliminate prejudice in education" is a law stating its own
object, and the plan verb is there without a plan. Catching that needs an
AND-NOT — an instrument subject and no plan noun anywhere in the row — which a
regex cannot express, so `describesAPlan()` is the second function veto in the
file after `datedElsewhere()`.

Uzbekistan's other 2019 row needed one more clause. "188 special preschool
institutions and 85 boarding schools, 2019-23 sector plan" cites a plan as its
source with no content verb at all; a row opening with a small bare number is
reporting a figure. The bound keeps year ranges out — "2016-19 Education Sector
Strategic Plan makes…" is four digits and "10-Year Strategy" is followed by a
hyphen, so both stay plans.

### Three more, and a third provenance row

- Taiwan files "Act REWRITTEN in full" three times, and `rewrit(e|es|ing)`
  matches none of them. The 2023 one was caught by `instrument made` on
  "effective on promulgation" instead. Three rows for one missing `\w*`.
- Brunei 2017's "the Act TOOK EFFECT on 1 July 2017" — the past tense of a
  pattern that only knew `takes effect`.
- Afghanistan's "Coordination WORKING GROUP … established" and Nepal's "Equity
  INDEX launched" — two more nouns.

Mongolia 2019, "the evidence here is a 2019 ministry project report, not standing
policy", is left unset. That is the **third** row of its kind, after the nine US
ECS rows and Solomon Islands' image-only scan, and at thirteen rows across five
hundred it is now a recognisable shape rather than three oddities: a policy
history that records what the SOURCE is, not what happened.

Asia went 81% to **42 of 44, 95%**, with two judgement calls standing.

### Three regions of dld: what the cross-domain table now says

```
region      residual        plan issued
            eal    dld      eal    dld
  Europe    50%    59%      16%     1%
  Asia      42%    49%      15%    13%
  Oceania   40%    38%      11%    23%
```

**The residual's regional ORDER replicates.** Europe above Asia above Oceania,
in both domains, independently hand-coded. The levels shift — dld runs six to
nine points higher in Europe and Asia — but the ranking survives, which is more
than could be said after two regions.

**The plan share does not replicate at all.** Europe collapses from 16% to 1%;
Oceania doubles from 11% to 23%. That is not documentation culture, it is what
each domain's policy is made of: European special-needs provision is statutory
and European EAL provision is not, while Pacific states run both through sector
plans.

So the careful version, with three of five regions in: the residual looks like a
property of how a REGION documents, and the plan share like a property of how a
DOMAIN is governed. Africa and the Americas will settle it or break it.

## Where the proposer stands, eight regions

```
  eal Europe      30/30   100%        dld Europe     36/36   100%
  eal Oceania     21/21   100%        dld Oceania    48/48   100%
  eal Asia        53/53   100%        dld Asia       42/44    95%
  eal Americas    40/42    95%
  eal Africa      22/23    96%                     292/297    98%
```

Held-out at first sight, in coding order: **88, 94, 71, 73, 88, 91, 81**.

## dld Americas, 391 rows

The largest batch in the project. 102 entries, 75 rows carrying prior
`fields_touched`, one left unset.

```
  provision described            152   39%
  instrument amended              81   21%
  instrument made                 57   15%
  body or programme established   26    7%
  plan or strategy issued         23    6%
  state of affairs recorded       17    4%
  international instrument accepted 14  4%
  instrument replaced             13    3%
  body or programme changed        5    1%
  funding decided                  2    1%
```

**Operations ON instruments take 39% here — amended plus made plus replaced —
the highest anywhere, and the residual is the lowest at 39%.** That is the
United States: 176 of these rows are state legislatures and boards, and their
policy history is written as a sequence of enactments and amendments rather than
as a description of what the law says. "Act 1268 of 2015 rewrites the Arkansas
dyslexia statute." "2023 c.290 enacts ORS 343.324." "L. 1999, ch. 116 amends the
act's section on school boards' duty."

That grammar is regular enough to code by the verb, and this pass did:
**enacts, promulgates, takes effect, adopts, filed → `instrument made`; adds,
amends, rewrites, recasts, creates a code section → `instrument amended`;
repeals, replaces in full → `instrument replaced`; anything that only says what
the instrument REQUIRES, SETS or DEFINES → the residual.**

The proposer scored **134 of 144, 93%** at first sight.

### A duty to establish is not an establishment

Two rows, and it is the same mistake the plan rule made in Oceania with "makes
every public authority PREPARE a disability inclusion action plan":

- Ontario 1998: "Regulation 181/98 REQUIRES every school board to ESTABLISH an
  Identification, Placement and Review Committee"
- Kentucky 1948: "KRS 157.230 MAKES school boards MAINTAIN special education
  programs"

Both state a standing duty, not a thing coming into being, and both are the
residual. `require|make|oblige|direct|shall|must` followed by
`establish|maintain|create|set up|provide` now vetoes the rule.

### The fifth plural

`regulation` does not match "regulations", so Nebraska's "special education
REGULATIONS, REVISED effective 17 May 2022" missed the amendment rule and took
`instrument made` off the word "effective". That is the fifth time a missing
plural has cost a row, after `center`, `academy`, `programme` and `centre`. The
rule from here is flat: every noun in every list in this file carries its plural,
first time.

### Three words doing ordinary work, and one veto on the wrong rule

- Iowa 2014: "requires reading assistance to INCLUDE STRATEGIES that formally
  address dyslexia" — not a strategy issued.
- Suriname 2005: "2005-10 Policy for People with Disability executed AHEAD OF
  CRPD ACCESSION" — names an accession as something still to come.
- Michigan 1976: "the Michigan statute UNDER WHICH the state's special education
  rules are PROMULGATED" — not a promulgation.
- Alaska 1983: "effective 1983 and AMENDED SINCE" — an amendment with no date of
  its own. The veto for it was written onto `instrument made` when the proposal
  came from `instrument amended`; both carry it now.

### Two that needed the precedence read carefully

Canada 2014's "Education Act AMENDMENT replaces s. 12 with personalized learning
plans" and New Mexico 2023's "6.31.2 NMAC AMENDED, renaming the part and
REPEALING its gifted education section" are both revisions that use the word
`replace` or `repeal` about a part of themselves. An amend word anywhere in the
row now vetoes `instrument replaced` — and rows that are genuinely replacements
never carry one: Korea "repeals the Special Education Promotion Act", Illinois
"repealed and readopted Part 226", Utah "repealed and re-enacted".

Adding `chapters?` to the replacement nouns to catch Wisconsin's "SUBSECTION (5)
was REPEALED AND RECREATED" **broke dld Europe**, where Finland's "New CHAPTER 4a
on learning support REPLACES the tiered support decisions" is a chapter inserted
into an act and therefore an amendment. Only `section` and `subsection` carry the
replacement reading in that position. Caught by re-scoring every region, which is
the third time that has paid for itself.

Americas went 93% to **137 of 137, 100%**.

### Four regions of dld: the claim gets weaker, not stronger

```
region      residual        plan issued
            eal    dld      eal    dld
  Europe    50%    59%      16%     1%
  Americas  43%    39%       7%     6%
  Asia      42%    49%      15%    13%
  Oceania   40%    38%      11%    23%
```

After three regions this file said the residual's regional ORDER replicates
across domains. With the Americas in, **it partly does not**: Europe stays top
and Oceania stays bottom in both, but the Americas and Asia swap places. The
honest reading is that the two middle regions sit one point apart in `eal`, so
their order was never a real ordering, and what actually replicates is the
extremes.

The plan share is the reverse of what it looked like too. Americas and Asia are
nearly identical across domains (7/6 and 15/13); the divergence is entirely
Europe and Oceania, the two regions whose governance of the two domains differs
most. So the earlier sentence — "the plan share is a property of how a DOMAIN is
governed" — is right for two regions and does nothing in the other two.

One region of `dld` remains, and Africa's `eal` residual was 60%, the highest
recorded. If dld Africa lands near it, the residual's regional character holds at
the extremes; if it lands mid-table, it does not.

## Where the proposer stands, nine regions

```
  eal Europe      30/30   100%        dld Europe      36/36   100%
  eal Oceania     21/21   100%        dld Oceania     48/48   100%
  eal Asia        53/53   100%        dld Asia        42/44    95%
  eal Americas    40/42    95%        dld Americas   137/137  100%
  eal Africa      22/23    96%
                                                    429/434    99%
```

Held-out at first sight, in coding order: **88, 94, 71, 73, 88, 91, 81, 93**.
Abstention now runs 253 of 390 in the largest region — the vetoes have made it
much more reluctant, which is the intended direction.

## dld Africa, 296 rows — the last batch

54 entries, and only **four** rows carried any prior coding.

```
  provision described            133   45%
  plan or strategy issued         75   25%
  body or programme established   31   10%
  international instrument accepted 20  7%
  state of affairs recorded       14    5%
  instrument made                 13    4%
  instrument amended               6    2%
  body or programme changed        4    1%
  instrument replaced              0
```

**`plan or strategy issued` at 25% is the highest figure any value reaches in any
region**, and `instrument amended` collapses to 2% against 21% in the Americas.
African special-needs policy history is written as a sequence of education sector
plans and national strategies — Burkina Faso's PDSEB, Ethiopia's Inclusive
Education Master Plan, Malawi's five separate strategies — with very little
amendment of statute recorded at all. `instrument replaced` is empty.

The proposer scored **84 of 85, 99%**, the best first sight of the ten. Its one
error was the duty shape a third time: Libya 1970, "states that the Ministry of
Education and National Guidance WILL ENSURE THE ESTABLISHMENT of classes", in a
tense and a noun form the veto did not know. Africa finished at **84/84**.

# The column, finished

```
eal + dld, 1,746 rows, ten regions, all hand-coded

  provision described               787   45%
  plan or strategy issued           223   13%
  instrument amended                210   12%
  instrument made                   149    9%
  body or programme established     139    8%
  state of affairs recorded          94    5%
  international instrument accepted  48    3%
  instrument replaced                44    3%
  body or programme changed          31    2%
  funding decided                     7    0%
                                   1732   (14 left unset)
```

**The residual is 45%. The whole-corpus profile predicted 48%.**

That is the result the column was wired in to test, and it is now settled by ten
independent hand passes rather than by the regexes the derivation itself called
poor instruments. Nearly half this corpus's policy history is a timeline of what
instruments SAY rather than of what CHANGED, and that is a fact about the field
rather than a defect in the vocabulary.

## The regional hypothesis failed

This file said, after three regions of `dld`, that the residual looked like a
property of how a REGION documents. `dld` Africa was the test: `eal` Africa sat
at 60%, the highest figure recorded anywhere, and if the regional reading were
right Africa should have come in near it.

**It came in at 45%.**

```
region        residual          plan issued
              eal   dld  diff    eal   dld  diff
  Africa      60%   45%   -15     9%   25%   +16
  Europe      50%   59%    +9    16%    1%   -15
  Asia        42%   49%    +7    15%   13%    -2
  Americas    43%   39%    -4     7%    6%    -1
  Oceania     40%   38%    -2    11%   23%   +12
```

Africa moves from first to third and swings fifteen points, the largest
divergence in the table. Across the five regions the two rank orders correlate at
about 0.5 — which on five points is nothing. Only Oceania holds still.

So the honest conclusion, after the whole column: **`operation` measures the
region-and-domain cell, and neither the region nor the domain alone predicts it.**
Africa documents `eal` as statute recital and `dld` as sector plans; Europe does
the reverse. That is the caveat to attach whenever this column is compared across
regions, and it is a stronger caveat than the one this file was carrying two
sections ago.

### One pattern worth recording, and not worth believing yet

The residual and the plan share move against each other within every region.
Adding them — the share of rows that DESCRIBE a document rather than record an
operation on one — is more stable across domains than either alone:

```
region        eal   dld   diff
  Africa      69%   70%    +1
  Europe      66%   60%    -6
  Asia        57%   63%    +6
  Americas    51%   45%    -6
  Oceania     51%   61%   +10

  mean absolute difference   5.8 points
  residual alone             7.4
  plan alone                 9.2
```

Africa lands within a point across the two domains. But this is a pattern found
AFTER the fact in ten cells, the improvement is 5.8 against 7.4, and Oceania is
ten points out. It is written down so a later reader can test it on `indigenous`,
`fl` or `he`, and it should not be quoted as a finding before they do.

## The proposer, finished

```
  eal Europe      30/30   100%        dld Europe      36/36   100%
  eal Oceania     21/21   100%        dld Oceania     48/48   100%
  eal Asia        53/53   100%        dld Asia        42/44    95%
  eal Americas    40/42    95%        dld Americas   137/137  100%
  eal Africa      22/23    96%        dld Africa      84/84   100%
                                                    513/518    99%
```

**Held-out at first sight, in coding order: 88, 94, 71, 73, 88, 91, 81, 93, 99.**

It ends well, and the shape of the series is the point. It never improved
monotonically: the Americas cost twenty points after Asia, Africa cost seven
after that, and Asia in `dld` cost twelve after two clean regions. Every one of
those drops was a documentation habit the proposer had not met — UNESCO PEER
constitution profiles, African statute recitals, Jordanian plans quoted for their
definitions — and every one produced a shape it read confidently and wrongly.

It now abstains on 1,214 rows of 1,746, seventy per cent, and that is the right
place for it to have ended up. The five errors still standing are judgement calls
named in the sections above, not pattern faults.

**The rule that earned itself five times over: every noun in every list carries
its plural, first time.** `center`, `academy`, `programme`, `centre`,
`regulation` — five rows lost to five missing plurals across ten regions, each
found only by hand.

## Rows left unset, and what they turned out to be

Fourteen rows across 1,746 — ten in `eal`, four in `dld` — and most are one shape:

- **Provenance rows** — nine US ECS readings, Solomon Islands' image-only scan,
  Mongolia's ministry project report, Delaware's "2008 state guidance, not
  binding regulation". A policy history that records what the SOURCE is rather
  than what happened.
- **Sweden 2015**, whose subject is a statistic hedged to "may be due to" and
  whose text is truncated.
- **Andorra 2008**, whose sentence's subject is the 2026 regulation.

If `entry.absences` ever grows a sibling for *this row is about the evidence*,
these are the rows that would populate it. Until then an absent cell is the
honest answer, and the count is small enough to say so.

## The vocabulary gaps this pass found and did not fill

- **A change of SCOPE with no instrument named.** "Eligibility extended to Czech
  citizens", "reporting becomes mandatory", "compulsory schooling extended to
  Ukrainian refugee children", "the minimum enrolment relaxed from 20 to 15". It
  ran at 2.6% through `eal` and the same shape recurs in `dld`. Real, countable,
  and no value carries it.
- **Signature without ratification.** The Bahamas 2013, Saint Vincent 2010, Libya
  2008, Seychelles 2009 and Somalia 1994 all SIGNED an instrument they had not
  ratified. They are coded `international instrument accepted` because nothing
  else is closer, and the gloss should say so or the value should split.
- **`state of affairs recorded` is glossed as an observation THAT NOTHING EXISTS**
  and has been used throughout for dated observations generally — reviews,
  reports, baselines, counts. The gloss wants widening to match the use.
- **Republication**, where a document is reissued with no change stated. Small,
  and noted in case it recurs.

All four are the maintainer's call. None was acted on.
