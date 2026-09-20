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

## What it will not fix

More countries will not repair a fragile finding, and this document should not
be read as a plan to rescue one. `immigration status` is negative in all twelve
windows tested, which is a reason to look again with more data, and the
pre-registered form of the question has to be fixed BEFORE the new entries land:
the measure, the window, and the adjustment level, written down, so the test is
one test rather than another twelve.
