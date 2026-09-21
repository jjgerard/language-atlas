# Where more research would actually change an answer

Every cross this atlas has run against an outcome has come out null or collapsed
on a guard. One of them — `eal.triggers` against the change in the immigrant
science gap — got close enough that the right response is more countries rather
than more windows. This file says which countries, and why these and not others.

## The constraint is not PISA

PISA 2025 reports 87 countries. 81 of them join to a national unit on this atlas.
**46 carry all four cycles** (2015, 2018, 2022, 2025), and that is the ceiling on
any trend question — it cannot be raised by research, only by waiting for 2028.

So the binding constraint is the atlas side, and it is very unevenly spread:

```
  of those 46 four-cycle countries, missing:
    eal.removalCriteria.exit_mechanism    24
    dld.dischargeCriteria.discharge_basis 16
    eal.newcomerCriteria.triggers          5   (8 more carry a documented absence)
    dld.identificationCriteria.threshold   3
```

`exit_mechanism` is the one to work. It is missing on 24 of 46, and it is the
column that halves every eal cross: the entry side reaches 63 national systems
and the exit side reaches 36.

## The 24, split by what they need

**Two need a coding pass, not research.** Both already carry prose, and both are
cases `EXIT_MECHANISM` explicitly says to leave unset rather than code:

- **Italy** — "Left to school-level personalisation plans, not centrally
  codified"
- **United States** — "No federal exit test. ESSA requires a uniform statewide
  exit procedure…"

The `none established` gloss names the United States by name as NOT that value:
a system that sets no national rule and leaves it below is saying where the rule
is made, which `rule_locus` carries. Leave both unset and let the locus say it.
That is the right answer and it adds nothing to the cross, which is worth
knowing before anyone spends a day on them.

**Twenty-two have no `removalCriteria` prose at all.** These are the research:

```
  AU Australia        BR Brazil        CA Canada          CL Chile
  CO Colombia         HR Croatia       CY Cyprus          DO Dominican Republic
  GE Georgia          HU Hungary       IL Israel          JP Japan
  MT Malta            MX Mexico        MD Moldova         ME Montenegro
  PT Portugal         QA Qatar         SG Singapore       TH Thailand
  AE United Arab Em.  UY Uruguay
```

## How to prioritise inside that list

Three things make a target worth taking first, and they do not all point the same
way.

**Federal systems are the expensive ones.** Australia, Canada, Brazil and Mexico
set additional-language rules below the national level, so the honest answer is
likely `rule_locus` plus an unset `exit_mechanism` — the same non-result as Italy
and the United States, for several days of reading. Take them last, and expect
them to add nothing to the cross even when done.

**The Gulf entries will be excluded from every test anyway.** Qatar and the
United Arab Emirates are dropped by the Gulf guard in each cross, so coding them
improves the descriptive record and not the statistics. Worth doing, not worth
doing first.

**That leaves the tractable middle**, which is where to start: Croatia, Cyprus,
Georgia, Hungary, Malta, Moldova, Montenegro and Portugal all run national
systems with a single instrument to find, all eight already carry a
`newcomerCriteria` coding so the entry side is done, and all eight sit in the
four-cycle PISA set. Eight countries would take the exit cross from about 21 to
about 29 — roughly a 40% gain on the column that constrains everything else.

Israel, Japan, Singapore and Thailand are the second tier: national, tractable,
but each needs a source in a language that the existing entries for those places
show has been the slow part before.

## Worked, 2026-09-20: two landed and the other six are not what I said

The claim above that all eight tractable targets “already carry a
`newcomerCriteria` coding so the entry side is done” **was wrong for two of
them**, and three more turn out not to have an exit rule to find. Working the
list is what established that, which is the argument for working a list rather
than counting it.

**Portugal — done.** DGE PLNM FAQ, September 2025, Q9. Levels A1 to B2, exit to
the national curriculum at B2, movement on a pass in an intermediate test the
school writes itself. `proficiency judgement`.

**Croatia — done.** Pravilnik NN 15/2013, arts. 5 and 8. Preparatory Croatian is
70 hours at one or two hours a day; at the end the school expert committee tests
in writing and orally, the county office issues a written certificate on those
results, and a pupil below the minimum conditions repeats the programme once.
`proficiency judgement`, decided by a `statutory body` — the testing committee
and the county office’s own committee — under a national rule applied locally.

**Malta — blocked, not missing.** `migrantlearnersunit.gov.mt` and
`meae.gov.mt` still do not resolve from this network (curl exit 6, retried
2026-09-20), which is exactly what its `l1Support` note already records. It
needs a different network or an archived copy, not more searching.

**Cyprus — probably nothing to find.** The Pedagogical Institute’s reception and
integration guide sets out proficiency indicators for A1, A2 and B1 and three
groupings by level, but it is a pedagogical guide rather than a regulation and
codifies no exit rule. That agrees with the entry’s own “no formal legal
definition, threshold or codified status was located”.

**Georgia — the category is a school type, not a pupil status.** Non-Georgian
language schools teach in the minority language with Georgian as a subject, so
there is no pupil designation for a pupil to leave. The open question is not
what the exit rule is but whether `removalCriteria` should read `Not
applicable`, which is a maintainer’s call and not a research gap.

**Hungary — the preparatory year is not a newcomer measure.** The language
preparatory year before year nine in Act CXC of 2011 is a general provision for
grammar and vocational secondary schools, open to any pupil. No newcomer exit
rule was located, which fits the entry’s own finding that no formal newcomer
definition exists.

**Moldova and Montenegro — never belonged on this list.** Neither carries a
`newcomerCriteria` coding, and both entries say outright that no newcomer
category exists. Their honest answer is a documented absence, and an absence
adds a system to the record without adding a data point to the cross, because
`none established` is for a system that HAS a designation and sets no exit rule.

So the tractable eight were really two. `exit_mechanism` now stands at 38
national systems, 24 of them in the four-cycle PISA set, up from 36 and 22. The
next tier — Israel, Japan, Singapore, Thailand — should be read before being
promised, on this evidence.

## The second tier, worked 2026-09-20: two of four

**Japan — done, and it was a stub.** MEXT CLARINET, Q8 to Q10 of the notice
issued with the amended School Education Act Enforcement Regulation. The entry
held nothing before this: its only source was a PISA catalogue link that does
not resolve to the table it names. Q8 defines the category — pupils needing
Japanese instruction, reached by circumstances such as returning from abroad,
foreign nationality or another language at home, on a criterion of ability:
not enough everyday Japanese, or everyday Japanese without the grade-level
academic language to take part in learning. Q9 puts the judgement under the
**principal’s responsibility**, referring to several staff weighing ability,
adaptation and attitude; MEXT offers DLA as one objective measure alongside
locally devised methods rather than as the instrument that decides. Q10 makes
the review periodic. So `proficiency judgement` on the gloss’s own test, and
`newcomerCriteria` filled at the same time from the same source.

**Israel — done, and it is a fixed period.** Knesset RIC, already cited on the entry.
Hebrew hours run for the first two school years mostly studied in Israel;
arriving before 1 January gives hours that year and the next, after it that year
and two; upper secondary then keeps one hour across the following four years;
Ethiopian and Bnei Menashe pupils get full hours three years longer and partial
hours after. `exit_period_months` is deliberately unset — several lengths are
given for different groups and picking one would misrepresent the rule.

Israel also shows the entry’s own warning working. Its `newcomerCriteria` says
different bodies define the population differently, and they do: matriculation
accommodations run **ten years from aliyah and twelve for Ethiopian immigrants**
on a Director-General circular, which is not the Hebrew-hours rule and not the
“ten years, fifteen if Ethiopian-born” the entry records from another source. The
removal bullets carry both and say they are separate.

**Singapore — nothing to exit.** Mother-tongue assignment is by ethnicity and is
a permanent allocation, not a support status with a threshold to cross.

**Thailand — no category at all.** The National Education Act creates no
newcomer or additional-language pupil category, so like Moldova and Montenegro
the honest answer is an absence and it adds nothing to the cross.

`exit_mechanism` now stands at 40 national systems, 26 in the four-cycle PISA
set. `fixed period` 18 against `proficiency judgement` 11, where before this work began
it was 17 against 5 — the two routes are close enough to compare for the first
time.

## What it will not fix

More countries will not repair a fragile finding, and this document should not
be read as a plan to rescue one. `immigration status` is negative in all twelve
windows tested, which is a reason to look again with more data, and the
pre-registered form of the question has to be fixed BEFORE the new entries land:
the measure, the window, and the adjustment level, written down, so the test is
one test rather than another twelve.

---

# Worked 2026-09-21: the list was stale, and four of the eight hit a wall

## The baseline in this file is out of date

It was written when the exit cross reached about 21 systems. **It is now 40**,
and `exit_mechanism` is coded on 41. Other work moved it in between, so the "21
to 29" arithmetic above should not be quoted.

## Three of the eight tractable countries were already resolved

Checked before researching anything:

- **Croatia** — `removalCriteria` prose present, coded `proficiency judgement`.
- **Portugal** — prose present, coded `proficiency judgement`.
- **Montenegro** — carries the **not-applicable** marker: "no newcomer definition
  exists; newly arrived pupils go straight into mainstream classes". That is a
  deliberate answer, not a gap, and it is the right one.

So the eight were really five.

## Malta is done, and only the Internet Archive could prove it

Coded `fixed period` + `assessed, no criterion`, 12 months, decided by the school,
`rule_locus: national, non-binding`. The Migrant Learners' Unit ran a **one-year
induction programme** and "Learners are assessed regularly throughout the year
and at the end of the induction period, a decision will be taken by educational
staff concerning the transition of the learner into mainstream education" — a
fixed period with a review at the end and **no stated standard for ceasing**,
which is exactly what `assessed, no criterion` is for.

**Both Malta docLinks are NXDOMAIN.** `migrantlearnersunit.gov.mt` and
`meae.gov.mt` no longer resolve, from two different clients, although search
engines still index them. The rule survives only in a 2022 Internet Archive
snapshot, which `BRIEF.md` expressly permits and which the entry's first bullet
says out loud. Eurydice's Malta page and AIDA both describe the programme and
neither states the period or the exit decision.

## The remaining four hit the wall DISCHARGE-WAVE.md already mapped

Cyprus, Georgia, Hungary and Moldova are **not tractable in the way this file
assumed**, and the reason is structural rather than per-country:

> the comparative sources describe how support STARTS and say nothing about how
> it ends

That sentence was written about `dld.dischargeCriteria`. It is equally true
here. Eurydice's "support measures for learners" pages for Cyprus and Hungary
carry reception and integration material and nothing on ceasing. This is very
likely *why* `exit_mechanism` is missing on 24 of 46 in the first place — the
gap is in the source family, not in the research effort.

**Georgia is further along than the others and points somewhere specific.** The
Law of Georgia on General Education, art. 4, gives citizens whose native
language is not Georgian "the right to acquire a complete general education in
their native language" — a **school-type right, not a time-limited support**, so
there is nothing to exit. A full-text search of the Law found no cessation rule
of any kind for language support: `cease` 0 hits, `exit` 0, and every "no
longer" and "proficiency" hit is about board members, referral centres or
foreign-language exam certificates. That points at the **not-applicable marker**,
as Montenegro uses, rather than a coded `exit_mechanism` — **but it is one
source, and the two-source rule applies.** Do not write it off the Law alone.

## What the next session should do differently

Take the second tier (Israel, Japan, Singapore, Thailand) or the federal four
only if the *national instrument* is in hand. For these four, going back to
Eurydice will produce the same nothing. The instruments to find are:

| unit | what to look for |
|---|---|
| GE Georgia | a second source on whether any time-limited support exists at all |
| CY Cyprus | the Ministry circular behind the bilingual-children provision |
| HU Hungary | the ministerial decree behind the start-of-schooling diagnostic test |
| MD Moldova | whether any newcomer support exists to exit from; the plan-cadru is a timetable |
