---
name: derive-vocabulary
description: Build or revise a controlled vocabulary in src/coding.js for a language-atlas field — deriving values by reading the corpus, evidencing each one with the entries that forced it, and wiring the scheme into SCHEMES. Use this whenever the work involves adding a coding column or scheme, splitting or merging a coded value, fixing a vocabulary that refused entries or left cells unset, making a prose field codable for the first time, or deciding what categories a field should have. It applies to QUESTIONS and judgement calls about a vocabulary as much as to instructions to change one — "why does DECIDER_TYPES have no value for a ministry", "8 entries got left with no rule_locus because their only instrument is a sector plan, thoughts?", "the values don't fit", "we need a category for X", "split culturally excluded" — since working out whether a value is missing is the first half of the job. Scope is the coded vocabularies in src/coding.js alone. Not the atlas's general conventions (what "Not established" versus "Not applicable" means), and not the field TYPES declared in src/domains.js (changing a series field's shape, adding a unit or denominator) — those are ordinary edits, not vocabulary work.
---

# Deriving a vocabulary

Everything in `src/coding.js` was derived by **reading the corpus, not by
proposing a scheme and checking whether it fit**. That is the rule the file
states about itself, and it is the difference between a vocabulary that
describes what systems do and one that describes what somebody expected them to
do. A scheme built the second way will code cleanly and mean nothing, because
every entry that did not fit got rounded to the nearest value on the way in.

So the order is fixed: read first, group second, name third, evidence fourth.

## When this is the right move

Three situations, and it helps to know which one you are in:

- **A field has no scheme** and should become comparable. The largest
  unschemed-but-well-filled fields are `dld.multilingualProvision`,
  `dld.serviceModel`, `dld.funding`, `eal.l2Support`, `eal.l1Support`,
  `indigenous.standing` and `indigenous.mediumOfInstruction`.
- **A pass produced refusals or unset cells.** Those are the evidence. A coding
  pass that left fourteen cells unset on one column has already done the reading
  for you and told you what the column is missing.
- **A value is doing two jobs.** The signal is a value whose gloss needs an
  "or" to cover its own examples.

## 1. Read before you name anything

Read about forty entries of the field's prose with no scheme in mind:

```bash
node research/tools/coding-dump.js <domain> <field> --from 0 --count 40
```

Sample across regions rather than alphabetically — the first forty entries of
any map are disproportionately small European and Caribbean states, and a
vocabulary derived from those will not survive Asia.

Write down what VARIES, not what is there. A field where every entry names a
body and forty name different bodies has one axis (who decides), not forty
values.

## 2. Group the variation into axes, one axis per column

An axis is a question every entry could in principle answer, whose answers are
mutually exclusive. If two candidate values can both be true of one system at
once, either they belong on different axes or the column is a list — and a list
is the right answer more often than it looks. The existing lists (`exclusions`,
`triggers`, `exit_mechanism`) all became lists because coding one value threw
the others away, and the file records how many entries that cost.

Two tests worth applying to a proposed axis:

**Does it discriminate?** A column that comes out 90% one value is describing
the corpus's silence, not the systems. Sometimes that IS the finding —
`bilingual_handling` is silent on 97% and that is the most important number the
atlas has produced — but it should be a deliberate result, not a surprise.

**Is it a description or a score?** Nothing here is scored: no weighting, no
total, no index. An ordinal column is fine where the thing it measures is
ordinal, and `obliges` is the model — its own comment says outright that turning
it into an averageable number is a separate decision made elsewhere.

## 3. Keep the distinctions the project already knows how to make

Three separations recur, and collapsing any of them is the same mistake at
different scales:

- **`none` is not `not stated`.** One says somebody checked and there is no such
  rule; the other says nobody has established whether there is. This is the
  documented-absence problem one level up, and `REDRESS_TYPES` carries a note
  about the 71% of entries that looked unanswerable and were not.
- **A framework is not a rule.** `RULE_LOCUS` needed `national rule, local
  application` as distinct from `national framework, sub-national rules`,
  because Denmark and Germany are not doing the same thing and four systems were
  flattened before the value existed.
- **A protective clause is not an exclusionary one**, even when both turn on the
  same fact. This is the live open question on `culturally excluded`.

## 4. Evidence every value with the entries that forced it

This is the part that makes the vocabulary arguable, and it is not optional
decoration. The house style is the value, a gloss, and named entries in
parentheses:

```js
const THRESHOLD_BASIS = {
  'service threshold': 'Access is set by how scarce the service is rather than by what the child has (New Zealand: "access is set by service thresholds, not by a diagnostic definition"; ORS extreme or severe difficulty)',
};
```

Quote the entry where the entry says it well. A named country a later reader can
go and check is worth more than a careful abstract definition, because it lets
them disagree with the typing rather than with your taste.

A value with no example in the corpus can still be right — `EXIT_MECHANISM`
keeps `age ceiling` on the grounds that the shape is real elsewhere — but say so
in the gloss, so nobody reads a zero count as a coding error.

## 5. Test the draft against the entries that broke the old one

Before wiring anything in, take the refusals and unset cells that prompted this
and check each one codes cleanly now. Then take twenty entries that coded fine
under the old vocabulary and check the change did not move them. A split that
silently re-codes settled entries is a migration, not a refinement, and needs
saying out loud.

If more than about one entry in ten still will not fit, the axis is wrong rather
than incomplete. Go back to step 2 rather than adding values.

## 6. Wire it in

In `src/coding.js`:

- Define the constant with its glosses, and a comment saying **why the axis
  exists** and what it was derived from. The file is readable because every
  block explains its own reasoning; a new one that does not will stand out.
- Add it to the field's entry in `SCHEMES`, and make sure that entry's `row`
  says what one row is. If the row is not *one system*, read the grain warning
  in the `coding-pass` skill first — storage cannot hold anything else yet.
- Export it, and export an `is<Name>` predicate alongside the others.
- Say in the comment which columns are lists and what it cost to find out.

A scheme change ripples: `apply-coding.js` validates against it, `store.js`
gates submissions with it, `/patterns` renders every vocabulary column it finds,
and the `/views` CSV discovers columns from the data. None of those need editing
for a new column — that is the point of the design — but all four change
behaviour, so mention it.

## 7. Recode, do not assume

A revised vocabulary does not retroactively fix stored codings. Entries coded
under the old list still hold old values, and a split leaves every entry on the
merged value pointing at a category that no longer means what it did. Say how
many entries need recoding and run `coding-pass` on them.

Related: a coding carries no date. Where a vocabulary change is prompted by a
rule that has since been revised — Ireland's 2007 criteria against Circular
0024/2025 — the fix is not a new value, and noting the limitation honestly is
better than encoding a superseded rule as though it were current.
