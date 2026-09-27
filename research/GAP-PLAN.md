# Closing the four gap rows, across every map

Written 2026-09-27 after closing both remaining gap rows on
`eal.newcomerCriteria`, and measured with `research/tools/gap-census.js`,
which is the thing to re-run rather than trusting the numbers below once they
age.

## The headline correction

The four rows are four different jobs with four different owners, and one of
the four numbers was wrong by a factor of seventeen.

    Text here, not yet coded          23   a reading pass
    Looked, not found yet            142   triage, then targeted waves
    Coded, no value fits             206   YOUR vocabulary decisions
    Not said in the entry          4,944   not one project

**"Coded, no value fits" reads 3,608 if you count every unset cell, and the
answerable part is 206.** The other 3,402 are columns where an unset cell IS
the answer:

    2,491  flag columns   `not_an_operation`, `scope_change` -- only ever set
                          when the row IS a source note or a scope change, so
                          unset means an ordinary history row
      470  free columns   free text or "integer, where the entry gives one" --
                          `instrument_year`, `duty_org`, `exit_period_months`
      441  list columns   nothing to list

`gap-census.js` now classifies these, because reading them as a backlog is how
`designation` came to look like unfinished work when it is one decision.

## What today measured, which is what the estimates rest on

Four waves, same day, on `eal.newcomerCriteria`:

- **14 jurisdictions nobody had ever looked at → 13 established.** Eleven were
  empty rows, 0 of 9 fields, no docLinks. French Polynesia came back empty
  after its Charte de l'éducation was read in full, which is a correct result.
- **5 entries whose prose said "unfillable" → 5 established.** They were a
  research request written as prose, not a finding. Brunei and Uzbekistan had
  already proved this shape answers on the first real instrument.
- **3 sentinels re-attacked → 1 filled, 2 closed.** Mauritius filled because
  nobody had read the Education Act. Angola and North Korea are now *closes*:
  7,286 Angolan diplomas swept, both DPRK education laws read in full.

Roughly **5–6 units per agent run**, and **80–100% yield where nobody had
actually looked**, far lower where a sentinel already names its sources.

## 1. Text here, not yet coded — 23 units. Do this first.

    dld.dischargeCriteria         18
    eal.bilingualEducationNotes    4
    eal.l1Support                  1

The smallest and cheapest row in the atlas. **One or two agents.** But expect
roughly half of it not to be a coding job: today, 7 of 7 "uncoded prose"
entries turned out either to be notes about sourcing or prose that never
reached the question. Budget for it becoming a small fill wave.

## 2. Looked, not found yet — 142 sentinels. Triage before you research.

    indigenous.taughtAsSubject     24      dld.outcomesEvidence      11
    dld.multilingualProvision      16      dld.dischargeCriteria      7
    dld.identificationCriteria     14      eal.l2Support              7
    indigenous.revitalisation      14      eal.l1Support              6
    indigenous.mediumOfInstruction 12      ...and 12 fields with 1-5

**The rule today's work produced: a sentinel that names every route it tried
is a CLOSE, not a gap.** North Korea's listed PEER, the Constitution, UIS and
UNESDOC and was still a gap only because nobody had read the education law.
Angola's named its deferral and was closed by sweeping the gazette. Mauritius's
named PEER and the MIE and was a gap because the Education Act was unread.

So the first job is **not research**: read all 142 sentinels and sort them into
(a) names a primary national instrument as read → likely a close, (b) names
only comparative sources (PEER, Eurydice, OECD) → a real gap with an obvious
target, (c) names a host failure → retry with today's host table.

**Cost: 1–2 agents to triage all 142, then ~1 agent per 5–6 units for group
(b).** The triage is what stops 25 agent-runs being spent on units that are
already answered.

## 3. Coded, no value fits — 206 cells. This is mostly YOUR decision, not research.

    dld.multilingualProvision.assessment_language   27
    dld.identificationCriteria.threshold_basis      15
    eal.newcomerCriteria.designation                14
    dld.legalEntitlement.redress_type               13
    dld.referralPathway.trigger                     11
    ...and a long tail of 1-9

**The cheapest row in the atlas per cell closed**, because a handful of
vocabulary decisions clear most of it and no fetching is involved. Three are
already documented and waiting:

- `designation` has no `none established` and no `not stated` (14 cells, and
  the count GROWS as coverage grows -- see `ABSENCE-VS-CODING.md`).
- `triggers` has no value for **displacement** -- an internally displaced child
  has crossed no border, so `immigration status` is false and so is everything
  else.
- `exit_mechanism` deliberately refuses Spain, Italy and the United States a
  value: its `none established` gloss names them as systems "saying where the
  rule is made" and offers no alternative.

All three are the same shape: **the column cannot say that the thing it
describes is decided somewhere else, or does not exist here.**

## 4. Not said in the entry — 4,944 cells. Do NOT attack this as one project.

At today's rates this is ~1,000 unit-reads and ~200 agent-runs, and much of it
would come back unchanged, because `not stated` often records something true
about the corpus rather than a gap in it.

**Five columns are ≥70% silence and hold 830 of the cells:**

    dld.multilingualProvision.local_norms          174 of 185   94%
    eal.l3Support.exemption                         47 of  50   94%
    dld.workforce.headcount                        263 of 319   82%
    dld.multilingualProvision.assessment_language  120 of 160   75%
    dld.referralPathway.trigger                    226 of 304   74%

A column at 94% one value does no discriminating work, and the
`derive-vocabulary` skill says so outright. **These are candidates for
retyping, not for filling** -- the same call as the one already recorded in
`fields-must-be-countable`. Filling `local_norms` would mean establishing, for
185 systems, something 174 of them have never written down.

At the other end, ten columns are at 0% and genuinely discriminate:
every `policyHistory.operation`, `newcomerCriteria.designation`,
`achievementGap.direction` and `after_adjustment`,
`bilingualEducationNotes.evidence_type`, `revitalisation.status`.

**The recommendation:** pick ONE column where a known source class would
answer -- `dld.workforce.headcount` against national workforce registers is
the obvious candidate at 263 cells -- and prove it on a batch of six before
committing anything larger. That is what the redress probe did, and the probe
is why the European wave was run and three regional ones were not.

## Order of work

1. **23 uncoded-prose entries.** One pass, this week.
2. **Triage the 142 sentinels.** One pass. This is the highest-leverage
   single action in the plan, because it tells you how big row 2 really is.
3. **Three vocabulary decisions.** Yours. Clears most of 206 and stops the
   count growing.
4. **One probe on one `not stated` column.** Six units. Decide from its yield.

Nothing here needs a sweep. Every wave today that produced a real finding was
aimed at named units with a named instrument to look for.
