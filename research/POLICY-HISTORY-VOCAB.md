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
