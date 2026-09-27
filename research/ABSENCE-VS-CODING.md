# 23 entries are flagged as an absence and also carry a coding

Found 2026-09-27 while checking, on the maintainer's instruction, that the map
key's "No newcomer criteria here" row really does hold entries with no
criteria. It mostly does. But the row reads 114 where the data holds 130, and
the missing 16 are the start of this.

## Why a flagged absence can be invisible

`fillFor()` and `paintCatLegend()` in `pages/map.html` both test the coded
value FIRST:

    if (codedValues(u, CODED.key)) continue;      // legend
    const vals = codedValues(o, CODED.key);
    if (!vals) { if (isAbsent(...)) return 'url(#absent)'; ... }   // paint

So a unit that is flagged `absences[field] === true` AND carries a coded value
for the column on screen is drawn in that value's colour and counted in that
value's row. The absence never appears. Map and legend agree with each other —
this is not a rendering bug — but both are silent about the flag.

That is correct behaviour when the coding SAYS the absence, and wrong when it
contradicts it. Both happen.

## The split: 8 agree, 15 contradict

**Agreeing (8).** The coding restates the absence in the vocabulary, because
the vocabulary has a value for it.

    eal.removalCriteria   Bahrain, Marshall Islands, Vanuatu,
                          Northwest Territories, Nunavut, Yukon
                          -- all six `exit_mechanism: none established`
    indigenous.revitalisation  Tunisia
                          -- `activity` and `status` both `none established`
    eal.newcomerCriteria  Canada
                          -- `rule_locus: sub-national only`, which IS the
                             absence of a national rule, and whose own gloss
                             names Canada as the precedent

These are arguably the pattern to want: the flag records the finding and the
coding makes it countable. The only cost is that the absence row undercounts.

**Contradicting (15), all on `eal.newcomerCriteria`.** The prose says no
newcomer category exists; the coding asserts a positive value.

    Belarus        "Absence is the finding: the Education Code defines no
                   newcomer category" -> `proxy category`, `immigration
                   status`, `national statute`, coded from what the entry
                   itself calls the only newcomer-facing rule: an EXEMPTION
                   from Belarusian or Russian study
    India + 8 states  "NCFSE 2023 sets no newcomer or additional-language
                   pupil category", "'newcomer' returns 0 hits" -> `triggers:
                   home language`, `national framework, sub-national rules`,
                   coded from the mother-tongue MEDIUM rule, which is about
                   domestic linguistic minorities
    Nepal, Tajikistan  "No newcomer or second-language designation exists" ->
                   `triggers: demand threshold`, coded from a minimum-pupils
                   rule for medium of instruction. Tajikistan's own prose says
                   "Domestic minority-medium schooling, not migration, is the
                   question here"
    South Korea    "No designation as such" -> `proxy category`
    Turkmenistan, Tonga  same shape

Twelve of the fifteen are the `eal` fields measuring someone else again — the
finding already recorded for `l1Support`, `bilingualEducationNotes` and
`achievementGap`. A mother-tongue medium rule is a real rule and it is not a
newcomer criterion.

## The cause, and it is not carelessness

**`eal.newcomerCriteria` has no `none established` on any of its four
columns.** `designation` offers named category, functional and proxy category
and nothing else; `triggers`, `decided_by` and `rule_locus` each offer `not
stated`, which means the entry was read and does not answer — a different
claim from "there is no such thing here".

So a coder who has read an entry that says outright "no newcomer category
exists" has nowhere in the vocabulary to put that, and the nearest available
move is to code the adjacent rule the entry also describes. Every one of the
fifteen took it.

`eal.removalCriteria` has `exit_mechanism: none established`, and all six of
its flagged entries used it. That is the whole difference between the two
groups.

## What would fix it

A decision for the maintainer, not a change to make in passing. The options,
with what each costs:

1. **Add `none established` to `designation` and `triggers`.** Then the
   fifteen recode to the thing they actually found, and the absence row and
   the coded row stop disagreeing. Cost: a recode of fifteen entries, and a
   vocabulary change ripples through `apply-coding.js`, `store.js`,
   `/patterns` and the `/views` CSV.
2. **Withdraw the codings on the fifteen**, leaving the flag alone. Cost: the
   adjacent rules they record — India's mother-tongue medium provision,
   Nepal's School Management Committee — stop being countable anywhere.
3. **Leave it and make the map say so.** The absence row could carry both
   numbers, "114, 16 more drawn by their coded value". Cost: nothing is fixed,
   but nothing is hidden either.

Related: `DESIGNATION_FORMS` also has no `not stated`, which is why that one
column holds 11 of the 15 unset cells on this field. The two gaps are the same
gap seen from either side — the vocabulary has no way to say that a system
lacks the thing the column describes.
