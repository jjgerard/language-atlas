# Plan: a fields view that shades the map by the coding

Drafted 2026-09-21, not built. The idea: click a field, the map switches from
shading by *how much is documented* to shading by *what the coding says* — click
`newcomerCriteria` and choose `categorization` to shade by how systems define a
newcomer, or `exit` to shade by how they stop.

## The good news: no server work

Everything the view needs is already on `/api/atlas`.

- `u.coding` is on every unit, keyed by field, exactly as stored.
- `p.schemes[domain.field]` carries `keyColumns` (which columns identify a row)
  and `valueColumns` (which are backed by a vocabulary). `src/catalog.js` derives
  the second from whether a column's definition is an object, so a column added
  to `src/coding.js` appears here with no other edit.
- `u.fieldStates`, `u.absences`, `u.na`, `u.filled`, `u.inh` already carry the
  states the map distinguishes today.

So this is `pages/map.html` plus a palette. `src/store.js`, `src/derive.js` and
`src/catalog.js` are untouched.

## What is actually shadeable, today

29 columns across six one-row fields. The count is how many of 396 units carry
a value, and it decides whether a map is worth drawing at all:

```
  dld.identificationCriteria.rule_locus        331   7 values
  dld.identificationCriteria.bilingual_handling 331   4
  dld.identificationCriteria.decider           330   9
  dld.identificationCriteria.exclusions        325   7   (a LIST)
  dld.identificationCriteria.threshold_basis   316   7
  indigenous.standing.status / source / force  203   8 / 8 / 7
  indigenous.mediumOfInstruction.role          196   7
  indigenous.taughtAsSubject.status            183   6
  eal.newcomerCriteria.rule_locus              167   6
  eal.newcomerCriteria.triggers                164   8   (a LIST)
  eal.removalCriteria.exit_mechanism           113   6   (a LIST)
  dld.multilingualProvision.assessment_language 88   5
  dld.dischargeCriteria.discharge_basis         61   7
```

Five columns would colour more than 300 units. `dischargeCriteria` at 61 would
draw a map that is 85% empty, and that is a reason to order the picker by
coverage rather than alphabetically — the reader should meet the full maps first.

## Five decisions, and they are the whole design

### 1. The coverage ramp cannot be reused

`public/shared.css` says why: the five `--cov-*` steps are **monotonic in
lightness**, about 14 L* apart, teal to blue, deliberately off the red-green
axis, so the ramp survives protanopia, deuteranopia, monochromacy and a
photocopy. That works because coverage is ORDINAL — more is more.

Coded values are not ordered. Painting `clock`, `test` and `proficiency
judgement` onto a lightness ramp would assert a ranking the vocabulary
explicitly refuses; `src/coding.js` says of `obliges` that turning an ordinal
into an averageable number is a separate decision, and this would be the same
mistake in colour.

**So a categorical palette is needed, held to the same measured standard the
ramp was.** The five region hues (`--r-africa` … `--r-oceania`) are the existing
categorical set and are a reasonable starting point, but there are five of them
and columns run to nine values.

**One exception worth keeping:** `obliges` IS ordinal and should use the ramp.
So should `exit_period_months`. The rule is a property of the column, and it
should be declared in `src/coding.js` rather than guessed by the renderer.

### 2. Nine values will not read as a choropleth

Six is about the limit for a categorical map anyone can read without counting
swatches. `decider` has nine, `standing.status` and `secured_by` eight.

**Recommendation: make value-highlight the default interaction, not the
fallback.** The reader picks one value and the map goes two-tone — "which
systems let the school decide" — with everything else in a single muted tone.
That reads at any number of values, answers the question a reader actually
arrives with, and degrades gracefully. Offer the full categorical fill only
where a column has five or fewer values.

### 3. Row-grained schemes must be excluded at first

`policyHistory`, `dld.legalEntitlement` and `dld.assessments` hold ARRAYS —
one unit, many rows, many values. Shading a country by them needs a reduction,
and `research/CROSSTABS.md` is explicit that **a reduction is a claim**: it takes
`obliges` at its maximum and says so in the file, because averaging an ordinal
across instruments would invent a number the corpus does not contain.

`/patterns` already refuses these (`if ((sch.keyColumns || []).length) continue;`)
and the map should refuse them the same way in phase 1. If they are wanted
later, the reduction must be a visible control — *any row* / *most common* /
*strongest* — never a silent default.

### 4. The map must not collapse the states it exists to keep

Today `fillFor()` knows four: `has`, `inherited`, `looked`, `none`. A coded view
needs **six**, and five of them are not "no data":

| state | means | must not be confused with |
|---|---|---|
| coded, value X | somebody read the prose and typed it | — |
| prose, not coded | text exists, nobody has coded it | not stated |
| `not stated` | the entry was read and does not answer | nobody looked |
| third state | *Not established from the sources consulted* | the absence below |
| documented absence | the sources say there is no such rule | not established |
| not applicable | the question cannot arise here | either of the above |

This is the distinction the whole atlas is built on, and a choropleth is exactly
the surface where it gets flattened into "grey". Hatching already carries
"looked, found nothing"; a second texture and a distinct muted tone are needed
before any of this is drawn.

### 5. Does a sub-national unit inherit its country's coding?

`covRatio()` counts inherited fields today, deliberately — a US state answering
four state-level questions and inheriting nine federal ones should not read as
half-researched. **Coding is different.** A state with its own `exit_mechanism`
must show its own; a state with none may or may not be covered by the federal
coding, and `EXIT_MECHANISM` says outright that the United States is NOT
`none established` because the rule is made below.

**Recommendation: no inheritance of codings in phase 1.** Show the unit's own
value or nothing. Inheriting a national coding onto sub-national units would
manufacture agreement that the corpus does not assert.

## One thing I want to check with you

Your example — click `newcomer criteria`, then choose `exit criteria` or
`categorization criteria` — reads two ways and they build differently.

**Reading A (what I think you mean):** the options are the coded COLUMNS
available, which may live on the clicked field or on a neighbouring one.
"Categorization" is `newcomerCriteria.designation` / `.triggers`; "exit" is
`removalCriteria.exit_mechanism`. The unit of the view is a *question*, not a
field, and the picker is grouped by question.

That reading has a nice property: `decided_by` and `rule_locus` exist on BOTH
`newcomerCriteria` and `removalCriteria`, so the reader can hold "who decides"
fixed and switch which decision they mean.

**Reading B:** the options are strictly the columns of the field clicked, and
"exit criteria" is a separate field you click separately.

A is the better view and only slightly more work, because the picker is built
from `p.schemes` either way. Say which you meant before phase 2.

## Phasing

**Phase 0 — the palette. DONE 2026-09-21.** `--cat-1` … `--cat-6` and
`--cat-other` in all three theme blocks, verified by
`research/tools/palette-check.js --live`. Two things came out of building it:

- **Six is the ceiling, and it is measured.** The bar is `shared.css`'s own — 14
  dE under simulated protanopia and deuteranopia — and the checker reproduces
  the two figures that file already quotes (`--nodata` at 14.3 from `--cov-1`,
  the rejected `#C4CDD5` at 4.3). The set holds every pair at **20.6 dE or
  better under both**.
- **Perfectly flat lightness is the wrong target.** Levelling all six to one L*
  reads as "no order" but takes a dichromat's second axis away: the same hues at
  one lightness measured **9.9 dE under protanopia**, well under the bar. The
  set keeps a 12 L* spread instead, which is inside ONE step of the coverage
  ramp — so it cannot be read as a ranking by anyone who can read the ramp as
  one. That is the rule the checker now enforces.

**There is no second grey**, and that is also measured. "Prose exists, nobody
coded it" wanted a tone of its own, but three greys — that, `--nodata` and
`--cat-other` — plus the ground cannot all stay 14 dE apart on one narrow
lightness band; the best candidate still left two pairs at 9.4 and 12.1. That
state belongs to a TEXTURE over the ground, the way "looked, found nothing"
already belongs to `#hatch`.

**Ordinal columns are now declared, not detected.** `src/coding.js` carries
`ordinal: [...]` on the three schemes that have ranked columns, and
`src/catalog.js` ships it as `ordinalColumns`. Detection would get this wrong
both ways: `obliges` has numeric keys and IS ordered, `occurrence` has numeric
keys and is a row identifier.

**The click-to-read panel — DONE 2026-09-21, ahead of the map fill.** Clicking a
country now opens its full coding under each field's prose, headed "Coded — a
reading of the text above, not part of it" so the separation `entry.coding`
keeps in the data stays on screen. Every vocabulary-backed value is a disclosure
carrying its definition from `src/coding.js` VERBATIM, including the entries
that forced it — Spain's `official in named areas only` opens onto its own
Constitution quote. Numeric and free columns render too, so `exit_period_months
= 12` is visible, and an ordinal column is marked with a leading bar rather than
a colour, so it survives monochrome and borrows no categorical hue. Row-grained
schemes are summarised by row count and left to the timeline rather than
flattened. `src/catalog.js` ships the glosses (101 KB, about 1% of the payload)
so nothing is paraphrased in the page.

**Phase 1 — one column, value-highlight only.**
`dld.identificationCriteria.rule_locus`: 331 units, 7 values, a full map. Add a
`mode` to the map page, keep `fillFor()` as the single place fill is decided,
and keep every fill a `var()` reference — `map.html` warns that a resolved hex
silently keeps the old theme's colour when the reader switches, which showed up
once as a legend contradicting its own map.

**Phase 2 — the picker**, grouped by question per reading A, ordered by how many
units each column colours, with the count shown next to each option so a reader
knows before clicking that `dischargeCriteria` will be mostly empty.

**Phase 3 — full categorical fill** for columns with ≤5 values, and the legend
that goes with it.

**Phase 4 — row-grained schemes**, only if wanted, and only with the reduction
as a visible control.

## What this changes about what to code next

The view makes coding coverage visible in a way the current map does not: a
column coded on 61 units draws an empty map, and no amount of prose fixes that.
If this gets built, the argument for finishing `eal.removalCriteria` (113) and
`dld.dischargeCriteria` (61) stops being about crosses and starts being about
whether their maps are worth drawing — which is a better argument, and a
different one from the one in `research/EAL-EXIT-TARGETS.md`.
