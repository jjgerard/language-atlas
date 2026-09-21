# indigenous.standing

Derived and coded 2026-09-21. 202 national entries, four columns, zero refusals.
The first vocabulary built for this map, and the first new `/patterns` columns in
a while — all four show up there as outcome splits, because unlike
`policyHistory` this scheme is one-row and the page does not skip it.

## What the field's own hint proposed, and what survived

The hint asked for four things: the standing given, the instrument that says so,
where it applies, and what the standing obliges. Three survived contact with the
prose. The fourth did not, and one axis the hint never mentioned turned out to be
what the entries keep circling.

**"Where it applies" split in two, and only half of it is this field's.**
`extent` below is territorial reach. Whether the standing reaches SCHOOL is the
question the prose actually worries at — "Constitutional, not curricular";
"administrative only, no school provision"; "Named as spoken languages, not as
school subjects" — and it is deliberately NOT coded here. The indigenous map
carries `mediumOfInstruction` and `taughtAsSubject` as fields of their own, and a
column here would be answering from their text, which is the one move the
coding-pass rules forbid outright.

## The columns

`status` (8 values), `source` (reusing INSTRUMENT_TYPES plus `not stated`),
`force` (7 values, a LIST), `extent` (3 values).

`source` reuses the shared constant rather than editing it. `INSTRUMENT_TYPES`
has `none`, meaning the entry established that NO instrument creates an
entitlement — a finding. Several entries here describe a standing and simply
never name the instrument behind it, and coding those `none` would assert a
finding nobody made. Adding `not stated` to `INSTRUMENT_TYPES` itself would have
changed `dld.legalEntitlement`'s vocabulary underneath 209 stored codings, so it
is spread into a new object instead.

`force` is a LIST because one instrument routinely does two of these at once.
Spain is the clearest: the Constitution obliges — "Education administrations must
guarantee the right to be taught in those languages" — and confers the right
being guaranteed, in one clause. 19 of 202 entries carry two values.

**Non-bindingness is not a value on `force`.** A policy that "commits to"
something is doing the same verb as a statute that does; what differs is the
instrument, and `source` already carries it. South Sudan's strategy paper takes
`duty to promote` with `source: policy`, and the two columns read together say
what a `commitment only` value would have said less clearly.

## The test before wiring

25 entries not yet read were coded blind against the draft. Five did not fit —
20%, above the "one in ten" threshold — but three were missing values rather than
a wrong axis:

- **`source` needed `not stated`** (Benin: a duty to fund, with nothing cited
  that imposes it).
- **`force` needed `none`.** Kuwait's constitution "bars discrimination by
  language but CONFERS NO LANGUAGE RIGHT" is a documented absence, not a silence
  — the project's recurring `none` / `not stated` separation.
- **Spain supplied `official in named areas only`**, which had been drafted
  without an example: "The other Spanish languages are also official in their
  Autonomous Communities."

With those the misfit rate is 2 in 25. The two that remain are recorded below.

## The finding, which is not what the values were built to show

**`official` is not the strongest standing. It is the one most likely to do
nothing.**

```
  status                              n   enforceable   does nothing
  official                           26       42%           19%
  national, not official             26       46%            8%
  recognised without official status 37       35%            8%
  named in policy only               24       33%            8%
  protected as culture               12       25%           25%
  none                               21        0%          100%
  official in named areas only        3      100%            0%
```

*enforceable* = `duty to provide` or `right held by speakers`; *does nothing* =
`none` or `declaratory only`.

19% of official languages carry no operative consequence at all, against 8% of
languages that are merely national or merely recognised — and `national, not
official` is more often enforceable than `official` is. Comoros, Haiti,
Greenland, Guam and Guernsey are all official and all declaratory. Guam says it
outright: Chamorro is official, "not required for official recording of public
acts and transactions", and the English version binds "where it materially
differs".

**So `status` is not a ladder and must not be read as one.** Nothing here is
scored, and this is the column where somebody would most be tempted to.

## Where the columns fail

**`extent` does not discriminate: 83% `not stated`** — 0% stated in Oceania, 13%
in Europe, 23% at best in Asia. It is exactly the column this project's own test
warns about, describing the corpus's silence rather than the systems. It is kept
as a record of that rather than deleted, but do not take a distribution over it,
and do not read its 15% `named areas or communities` as a count of regional
regimes — it is a count of entries that happened to mention one.

**`status` is `not stated` on 26%**, the largest single value, and the cause is
the grain. A row is one system, and a system may hold several languages at
several standings. Where an entry gives the majority or colonial language's
status and never says what the indigenous one holds, `status` is `not stated`:
Sint Maarten names Dutch and English official and leaves Papiamento unsaid; the
United Arab Emirates gives Arabic's status and stops. Those entries are usually
the ones describing provision instead, which is why `not stated` status has the
HIGHEST enforceable rate of any value at 62%.

Mauritania and Comoros show the grain working correctly rather than failing:
Mauritania names Fula, Soninke and Wolof national with Arabic alone official,
Comoros is the mirror with Shikomor official and French and Arabic national, and
they code differently because `status` is coded for the languages the map is
about.

## Europe answers a different and thinner question

Its 45 national entries run 142 characters against 218–238 elsewhere, and 28 of
them turn on the phrase "steering documents" — a Eurydice-shaped record of
whether a language is listed, not of what its status obliges. Four templates
cover 17 of the 45.

The prediction written into `coding.js` before coding was that `source`, `force`
and `extent` would read `not stated` across much of Europe while `status` stayed
answerable. Measured:

```
  region       n   status stated   source named   force stated   extent stated
  Africa      54        76%             70%           93%            17%
  Americas    36        64%             81%           86%            22%
  Asia        47        62%             79%           96%            23%
  Europe      45        87%             58%           64%            13%
  Oceania     20        85%             95%           85%             0%
```

Right about `source` and `force`. **Wrong about `status`, which Europe answers
BEST of the five regions** — because the formula it was written to answers
exactly that question and little else. And `extent` is worst in Oceania, not
Europe. The comment in `coding.js` now carries the measured figures rather than
the prediction.

## Still to do

**140 sub-national entries carry standing prose of their own** and are not coded.
That is the next pass, not a gap in the vocabulary: `--all` on the dump tool
reaches them, and the scheme's row already admits a sub-national system.

Two misfits stand, recorded rather than forced: the law-and-practice gap (Nepal's
"most schools use those periods for extra English instead"; Tonga's policy that
the curriculum framework "still calls forthcoming") has no column, and should not
get one here — it is an observation about practice, and this field codes
standing.
