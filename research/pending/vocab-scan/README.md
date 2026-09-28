# Reading fl and he before coding them: four scans, and what they agree on

`fl` and `he` offer **no coded columns at all**. Every other map has a shade
picker; theirs are empty, because only `policyHistory` is schemed in either and
that field is row-keyed. Sixteen fields and roughly 3,100 filled entries of
prose sit there with no vocabulary to code against — which is the real body of
"text here, not yet coded", now that the map's own label is at zero everywhere.

Four scans ran step 1 of the `derive-vocabulary` skill — **read, group, report**
— over the eight largest of those fields. Nothing was wired in. The vocabulary
is the maintainer's call and these are the evidence for it.

    fl-compulsion.md    fl.primaryRequirement, secondaryRequirement, upperSecondary
    fl-languages.md     fl.languagesOffered, curriculumTime
    he-requirement.md   he.requiredStudy, mediumOfInstruction
    he-provision.md     he.degreeSubjects, linguistics

## Verified before relaying

Each scan's load-bearing claim was re-checked here against the data rather than
taken on trust. Where a count moved, the checked figure is the one below.

| claim | scan said | checked |
|---|---|---|
| `he.linguistics` entries holding >1 programme row | 128 of 159 (81%) | **128 of 159 (81%)** |
| …naming more than one institution | 52 (33%), max 8 | **52 (33%), max 8** |
| `absences` flags on `he.linguistics` / `degreeSubjects` | 0 / 0 | **0 / 0** |
| `absences` flags on `fl.languagesOffered` / `curriculumTime` | 0 / 0 | **0 / 0** |
| `fl.upperSecondary` carrying the "last or penultimate year" line | 34, alone on 22 | **34, alone on 22** |
| `fl.languagesOffered` entries that are nothing but CLIL rows | 24 | **17** (35 carry CLIL rows at all) |
| `fl.secondaryRequirement` entries that are nothing but boilerplate | 28 | **18** |
| `he.requiredStudy` negatives filed as prose, not as an absence | 18 named | **spot-checked 5 of 5** |

The two that moved moved because the scan and the check drew the boilerplate
line in different places, not because the finding changed. Both findings hold.

## What all four found independently

**1. No entry on any of these eight fields carries an `absences[field]` flag.**
Zero, on all eight. Yet every scan found entries whose prose is a positively
established zero: Lesotho's `languagesOffered` ("the complete published list,
not a sample: the API reports total 16"), Honduras's `curriculumTime` ("no hour
allocations at all, horas 0"), Belize's and Cuba's `linguistics` ("no separate
linguistics degree"), and at least eighteen `requiredStudy` entries. Every one
is invisible to `gaps.js` and to any coverage count, and each will force its
column to carry a "checked, there is none" value that the typed flag already
exists to hold. This is `uncoded-count-must-subtract-absences` live in the data,
and it is fixable before any vocabulary is written.

**2. A field is not one corpus.** Each scan hit the same shape: a European
indicator table pasted into a field alongside genuine national readings, so any
column codes the SOURCE as much as the system.

  - `fl.languagesOffered` — **35 entries carry Eurydice CLIL rows, 17 contain
    nothing else.** Cyprus's whole entry is `CLIL: Greek + English (ISCED 1)`.
  - `fl.secondaryRequirement` — **18 entries are one recurring Eurydice
    sentence**, and the sentence is about a SECOND foreign language.
  - `fl.upperSecondary` — **34 carry "Continues to the last or penultimate year
    … as everywhere but Malta", 22 have nothing else.**
  - `he.mediumOfInstruction` — **21 of 129 rest on Université Laval's AXL or on
    PEER and will all code `practice only` because of where they were sourced.**
  - `fl.upperSecondary` again — **9 documented absences are the identical
    sentence**, "PEER profile states no language rule at upper secondary or for
    leaving school" (CD CG CM DJ DZ GA GM GQ GW).

That last pair is the `provenance-not-an-operation` finding a third and fourth
time: a column measuring a sourcing decision and reading as a fact about a
region.

**3. The grain fails in the same place every time — one row cannot hold a
per-language or per-institution answer.** Each scan stopped short of proposing
a column rather than flattening one, and quantified the refusal:

  - per-language compulsion: Bahrain "English is a compulsory foreign language
    subject" beside "French is offered as an elective second foreign language";
    Armenia "No foreign language in grade 1; grade 2 teaches one, grades 3 to 12
    teach two". At least 1 entry in 6 on primary, nearer 1 in 4 on upper
    secondary.
  - a time figure: **97 of 127 `curriculumTime` entries carry more than one
    number and 34 carry four at once.** Every figure is number × unit × stage ×
    language rank × status.
  - `he.linguistics`: **52 of 159 name more than one institution**, so
    `disciplinary_home` and `orientation` cannot be unit-grained columns.
  - `he.mediumOfInstruction`: **35 of 129 name a specific institution.** Sri
    Lanka says so about itself — "Recorded faculty by faculty… not one rule".

## The one that would have published something false

`fl.secondaryRequirement`'s prose is largely Eurydice's **second**-foreign-
language indicator, not "is a foreign language compulsory at this stage".
Germany proves it on one screen:

    primaryRequirement   Compulsory from age 6 in six Länder
    secondaryRequirement Never compulsory for all students at any point in secondary
    upperSecondary       Continues to the last or penultimate year of upper secondary

Spain and Sweden carry the identical middle line. Read as compulsion, the field
says three of Europe's largest systems drop foreign languages for the whole of
lower secondary and resume at 16. `src/coding.js` already settles what those
sentences mean: `L3_SECOND` on `eal.l3Support` glosses `never compulsory` with
"(Albania, Germany, Spain, Croatia, Sweden)" — the same country set, the same
sentence, already coded correctly in another domain.

So the same indicator would have been published twice, under two names, in two
domains, and the `fl` copy would have been wrong about what it measured. This is
`bilingual_handling` again.

Related, and worth knowing before anyone plans a lower-secondary fill:
**96 of 210 national rows have prose on primary and upper secondary and nothing
on lower secondary.** Subtract the boilerplate and barely a third of systems say
anything of their own about the middle stage.

## Decisions these scans are waiting on

Grouped, because several are the same decision asked four times.

**On the absence flag — one decision, eight fields.** Do the established zeros
move onto `entry.absences` before anything is coded, so no column has to carry a
"checked, there is none" value and the coded denominator is the systems that
actually have a rule? On `he.requiredStudy` alone this moves the denominator
from 86 to roughly 60-68, and about 8 national negatives must NOT move because
they carry a narrower positive finding (Quebec, Switzerland's Latin, Brazil's
Libras, Denmark's thesis summary).

**On the grain — the blocker that has already parked two dld fields.** Hold the
line at one row per unit and lose the per-language, per-institution and
per-figure columns; or teach storage to hold rows, which is the same change
`dld.legalEntitlement` and `dld.assessments` have been waiting on. 33% of
`he.linguistics` naming more than one institution is the strongest evidence yet
offered for the second.

**On the imported indicators.** Are the CLIL-only rows, the boilerplate
upper-secondary line and the nine identical PEER sentences in scope for coding,
out of it, or due a re-fill from a national source? They are 12-17% of their
fields and they drag every column's coverage down before a single hard case.

**On `fl.secondaryRequirement` specifically.** Is it a compulsion field at all,
or is its real question "is a second foreign language required" — in which case
its vocabulary is `L3_SECOND` and the question becomes how not to publish the
same Eurydice indicator in two domains.

**On deliberately thin columns.** Three were proposed at 85-91% one value, each
on the `bilingual_handling` precedent that a silence can be the finding:
`availability_condition` (~85% empty), `exemption` on `requiredStudy` (~88%),
`in_force` on the fl trio (~91%). Each is only worth building as a deliberate
record of that silence, and an empty list must be glossed as *nothing stated*,
never as *unconditional*.

**On two fields that may be measuring something else.** `curriculumTime`'s
numbers may belong in a `series`-typed field, as `fl.uptake` already is — Canada's
entry is money, not time ("Federal transfer, not instructional time: base
$235,520,472 a year"), and five of ten percentage entries measure medium-of-
instruction time rather than subject time. And `he.linguistics` already answers
the level question exactly in its stored rows, so a level column would restate
the field and then drift from it.

## Two findings worth keeping whatever is decided

**Not one `fl.curriculumTime` entry of 127 reports time actually taught.** 44
say so explicitly, and Bangladesh and Burkina Faso say the prescription is not
met. Same shape as `outcomes-evidence-is-about-absence`.

**`he.linguistics` is answering two questions at once and marks neither.** 135
of 159 entries name linguistics in at least one row; 24 name none and are filled
with language-and-literature degrees instead. Nothing in the data separates "this
country's linguistics is done inside philology" from "nobody found a linguistics
degree".
