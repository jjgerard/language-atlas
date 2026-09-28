# The "nothing here" values: decided in principle, parked for now

Maintainer's decision, 2026-09-28: **each of three columns should get a value
meaning "there is nothing of this kind in this system"** — and not yet. This
note is the thing to read when it is picked up, so the decision does not have
to be rediscovered.

## The problem, in one sentence

An entry is read, the honest answer is *there is nothing of this kind here*,
the vocabulary has no value for that, so the cell stays empty — and an empty
cell is drawn in a gap row, as though research were owed.

## The three columns, with current counts

    eal.newcomerCriteria.designation       2 unset + 16 contradictions
    eal.removalCriteria.exit_mechanism     1 unset
    eal.removalCriteria.rule_locus         6 miscoded as `not stated`

**`designation` — cannot say a system names nobody.**
Only 2 cells are genuinely unset now (Australia, whose entry is a note saying
nothing should be written into the national row; Wallis and Futuna, whose
graduated entry runs by YEAR GROUP so no individual child is picked out). The
real cost is elsewhere: **16 entries are flagged as a documented absence AND
carry a coding that contradicts it**, because a coder who read "the Education
Code defines no newcomer category" had nowhere to put that and coded the
nearest adjacent rule instead. Belarus was coded `proxy category` off an
exemption from Russian study; India and eight states off the mother-tongue
medium rule. See `ABSENCE-VS-CODING.md`.

**`exit_mechanism` — cannot say the rule is set below this level.**
One cell, Italy, and it is the honest residue: DPR 394/1999 leaves it to the
*collegio dei docenti*, the 2014 *linee guida* are guidance, and the rule sits
at school level, below any row the atlas holds. Note that the value
`none established` **explicitly refuses** this case in its own gloss — "NOT
for a system that sets no NATIONAL rule and leaves it below" — naming France,
the United States and Spain. So the gap is deliberate, not an oversight; what
is missing is the value the gloss implies should exist.

**`rule_locus` — cannot say there is no rule to locate.**
Six entries — Bahrain, Hong Kong, Monaco, the Marshall Islands, Vanuatu,
Yemen — are coded `not stated` while their own prose says no exit rule exists
at all. `not stated` means "the entry was read and does not answer". These
entries DO answer: there is no rule, so there is nowhere for it to be made.
That is a false coding today, not merely a missing one.

## The precedent already in the atlas

`indigenous.localTerm.family` has **`none in use`** — "Checked, and the system
has no term AND no phrase either" — on **51 entries**, its single largest
value. It works, it has been used at scale, and it did not need a new column.

That column carries two more things worth copying at the same time:

- **`fixed_in`** — in statute 143, in guidance or curriculum 54, in practice
  only 8. It answers a drift `designation` currently hides, where Austria's
  statutory *außerordentlicher Schüler*, Guernsey's EAL off a service page and
  Victoria's LBOTE census category all sit in one `named category`.
- **it is a LIST.** Systems use several kinds of word at once — "minority
  language, mother tongue or first language" is its second-commonest
  combination — and `designation` forces one.

A caution it also carries: 47 of `none in use`'s 51 entries are United States
states, so a high count on a "nothing here" value is a coverage fact before it
is a finding.

## What it would cost

Three vocabulary additions, a recode of roughly 25 entries, and a ripple
through the four consumers a scheme change always touches — `apply-coding.js`
validates against it, `store.js` gates submissions with it, `/patterns`
renders every vocabulary column it finds, and the `/views` CSV discovers
columns from the data. None of those need editing; all four change behaviour.

The `derive-vocabulary` skill's rule applies: recode rather than assume.
Entries coded under the old list keep their old values, and the 16
contradictions in particular have to be revisited one at a time, because each
is a judgement about whether the adjacent rule it was coded from belongs to
this field at all.

## The alternative that was considered and not taken

Leaving the cells empty and splitting the map's gap row instead, so "somebody
read this and nothing fitted" shows separately from "nobody has looked". No
data changes, reversible — but the distributions still could not count these
systems, which is the point of coding them.

## If only one goes first

`designation`, copying `none in use` from `localTerm` where it already works.
Smallest change, and it stops a count that GROWS with coverage: Aruba, Wallis
and Futuna, Senegal and Romania each arrived in that state as their entries
were filled this month.
