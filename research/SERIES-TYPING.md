# Typing the series rows

2026-09-21. The `series` type gained `unit`, `denominator`, `counted` and
`basis` some time ago and `src/domains.js` documents them, but **only `unit` was
ever filled**. `counted`, `denominator` and `basis` were blank on all 1,719
rows, which is the half that matters: the problem was never what kind of number
a figure is, it is what the figure counted.

## What was done

`research/tools/series-type.js` promotes into the typed columns what each row's
OWN note already said. It invents nothing. 693 `fl.uptake` rows already carried
"Counts ENROLMENTS in the study of a language, not pupils" — in prose, where
nothing could compare it, instead of in a column, where something can.

```
  field                     rows   counted   basis   denominator
  he.enrolment               293      293      293        0
  fl.uptake                 1256     1060      970      115
  eal.newcomerProportion     103       39       39       31
  dld.identifiedPrevalence    38        4        4        0
  indigenous.speakers         29        0        0        0
```

**2,848 cells written across 1,396 rows; 323 rows matched no rule.** `year`,
`value` and `note` were snapshotted before the run and compared after: **0 of
1,719 changed**, and `coding-verify.js` reports no other key differing from HEAD
on any of the five maps.

### The one inference, made in two forms only

`basis` is the single column not lifted verbatim. It is set in two cases, both
licensed by the note rather than by the host:

- a note naming a **Eurostat UOE table** (`educ_uoe_*`) takes `administrative
  count` — UOE is the UNESCO–OECD–Eurostat administrative collection, and a
  figure counting enrolments or degrees awarded cannot have been surveyed;
- a note whose **own words** are "survey measure" takes `survey`, and the
  American Councils rows take `survey` or `estimate` according to whether that
  survey says it received a return or "modelled this state's figure".

Everything else is blank, because `src/domains.js` says these columns "stay
BLANK rather than guessed" and a blank truthfully says nobody has typed the row.

## The field that motivated all of this is the least improved

`dld.identifiedPrevalence` is where the Angola problem lives — 28467, a headcount
of all SEN students whose published breakdown has no speech or language category
at all, sitting in the same column as an IDEA child count, a PISA home-language
share and "1 in 14" from advocacy. **It came out 4 of 38 typed.**

That is not a failure of the tool; it is the shape of the field. Its 34
remaining notes are all bespoke — "Pupils whose PRIMARY type of need is recorded
as 'speech, language and communication needs'", "Pupils in Germany with the
special-educational support focus Sprache" — each naming a different national
category. There is no family to match, so **those 34 rows are a hand pass and
the highest-value one in the atlas**, because they are the rows most likely to
be compared and most certain to mislead. 29 `indigenous.speakers` rows are in
the same position.

## Two problems found, flagged, and deliberately not fixed

**1. `unit` has no value for a ratio.** 110 `fl.uptake` rows are an *average
number of foreign languages studied per pupil* — "1.1" — and carry `unit:
count`. An average is not a count, and the declared units are `count | percent |
per 1,000`. Fixing it needs a fourth value (`ratio`, or `per pupil`), which
changes the declared type and is the maintainer's call. The rows are typed on
`counted` and `basis` and their `unit` is left wrong rather than silently
altered.

**2. 63 rows hold more than one figure in `value`.** "143,069 of 821,691 pupils
(17.41%)" and "76,953 (4.9%)" pack a count, its denominator and a percentage
into one string. No `unit` describes that and nothing can compare it — it is the
same failure the typed columns were added to end, one level down. Splitting them
changes stored numbers, so they are reported and left. Most are
`eal.newcomerProportion`; the rest are the American Councils `fl.uptake` rows.

## What this does and does not unblock

`counted` now reaches **81% of series rows**, so a cross that needs to know what
a figure counted can run over most of the corpus and say honestly which rows it
excluded. That is the state the outcomes work needed.

It does **not** mean the outcome half is ready. Three things still stand between
here and it: the 323 untyped rows above, the missing ratio unit, and the 63
compound values. The first is research-free and could be done in an afternoon;
the other two are decisions.
