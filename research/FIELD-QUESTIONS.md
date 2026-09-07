# Where the stored prose answers a question the field does not ask

Every text field declares four questions in `src/domains.js`, answered in
order. Re-slotting an entry means fitting its existing bullets to those
questions — and when a bullet fits none of them, that is evidence about the
FIELD rather than about the entry.

This file collects those, because changing a field's questions changes the
hover checklist, the entry panel, the submission form and the coverage count
together, and is the maintainer's call rather than a drafter's.

## dld

**`terminology` has no question about recognition.** Its four are: the term ·
what it covers · how it relates to DLD · where it is fixed. But Austria,
Bulgaria and Cyprus each carry two bullets of public-awareness figures — "65%
or more had heard of it", and the comparison against autism across 18 systems.
Those are currency in practice rather than in statute, and they were tagged 4
as the nearest fit, which the drafter flagged as the weakest tagging in its
batch. A fifth question, or a reworded fourth, would hold them properly.

**`referralPathway` has no question about who PLACES the child.** Albania's
field is entirely placement — the ministry and local self-government place the
child, specialised schools run to 19, schooling at home is provided — and
Austria's bullets 2 and 3 are placement duties. They were tagged 2 and 4 by
proximity. Placement is a real and separable thing from referral, and it is
currently homeless.

**`workforce` asks for a ratio to POPULATION.** Andorra and Belarus both give
staffing and group-size ratios per pupil instead, which is a different measure
and arguably the more useful one for a reader. Of the eight units in that
batch, Austria was the only one whose workforce answered questions 1 and 2 as
written.

**Discharge facts are settling into neighbouring fields.** Austria's
referralPathway carries "the finding is lifted once the child can follow the
general curriculum", which is discharge content. `dischargeCriteria` and
`outcomesEvidence` were empty on all eight units in that batch —
`dischargeCriteria` is 1 filled of 210 across the whole map. A field nobody
fills, whose content turns up in its neighbours, is the signature of a question
asked in the wrong place.

## The convention itself: a hedge has nowhere to go

Slots must be NON-DECREASING, and the brief asks for a qualifying hedge FIRST
where dropping it would mislead. Those two rules collide: a whole-field hedge
answers none of the four questions, but the only slot it can occupy is 1.

One dld batch of nine countries put **25 bullets** in slot 1 that way -- the
COST IS1406 survey line ("Practitioner perceptions, not policy"), the funding
equivalent, and the LITMUS line ("Records that the instrument exists — not that
any service here uses it"). Every one is doing exactly what the brief asks and
none of them answers question 1.

This matters beyond tidiness, because it is the reason `progress.js` reports
that question 1 is answered nearly always. Some unknown share of slot 1 is
hedges. A regex over the whole atlas finds only 16 of them, which says the
pattern is undetectable programmatically rather than rare -- the hedges take
too many forms to match. So the depth figures should be read as an upper bound
on question 1, and the honest fix is a slot 0 for "this qualifies the whole
field", which the non-decreasing rule would then place first automatically.

## The convention again: a documented ABSENCE collapses to slot 1

Questions 2, 3 and 4 of most fields presuppose that the answer to question 1 is
yes. `requiredStudy` asks: is there a rule · which language · how much · who may
exempt. Where a researcher reads the act and finds NO rule, there is no
language, no amount and no exempting authority to report -- so every bullet,
however substantial, answers question 1.

Norway and Luxembourg both came back `[1,1,1,1]` on four bullets each, and both
are thorough: Norway's name UH-loven 2024 imposing no such duty, section 2-3
binding institutions rather than students, the teaching-language clause
identified as medium of instruction, and section 11-5 as a student RIGHT to
bokmal or nynorsk papers rather than a duty. That is four instruments read and
four distinctions drawn. It is not a thin entry.

But `progress.js` counts it as answering one question of four, identically to a
field with a single vague sentence in it. So the depth measure understates every
documented absence, exactly as the hedge problem overstates question 1 -- the
two distortions run in opposite directions and neither is visible in the
aggregate.

There is no clean fix inside the current convention. Recording it because the
depth numbers should not be read as a quality score until it is settled: a map
whose researchers correctly find and document many absences will score WORSE
than one whose researchers left those fields blank.

## eal

**`bilingualEducationNotes` has no question for "is this aimed at these pupils
at all?" — and this is the largest of the findings here.** Seven of eleven
European units END the field with exactly that disclaimer: Denmark "No
dual-medium programme for migrants", Spain "A separate framework, not aimed at
migrant pupils", Greece "Not migrant-specific", Croatia "Minority- rather than
migrant-oriented", and a shared line on Finland, France, Ireland and Italy
separating it from mother-tongue teaching for pupils not yet fluent.

The field's four questions all assume the bilingual programme IS the answer to
this map's question. In most European systems it is CLIL or minority-language
schooling and is not. Everywhere it appears the disclaimer gets tagged 4 for
want of anywhere better, and 4 is "entitlement or pilot", which it plainly is
not. This wants a fifth question or a reworded first, and it touches more
entries than anything else in this file.

**`l1Support` has no slot for eligibility, uptake or a base rate.** Denmark's
field is EU/EEA-only eligibility extended to Iceland, Liechtenstein and Norway;
Finland's carries 42,636 pupils across 57 languages in 2020; Estonia's a
ten-pupil request threshold; Spain's "third in Europe on pupils speaking
another language at home, at 20.6 per cent". Four different countries, four
facts, no question that asks for any of them.

**`newcomerCriteria` and `l2Support` have no slot for the naming instrument,**
though many entries carry one under the cite-inside-the-bullet convention —
LOMLOE arts. 78-79 and Madrid's Decreto 23/2023 on Spain, decrees or acts
opening or closing `l2Support` on Denmark, Spain, Finland and Croatia. `dld`'s
`terminology` HAS a "where it is fixed" question; these do not, so the citation
is tagged 1 or 4 by proximity.

**`l2Support` has no slot for how progress is assessed or what good practice
looks like,** and the same content then appears twice on one entry: Ireland's
2024 inspectorate findings on CEFR-aligned assessment and whole-school
target-setting sit in BOTH `l2Support` and `removalCriteria`, because neither
field has a home for them. A fact appearing twice on one entry is the signature
this file exists to catch.

**Confirmed from the dld findings, now on a second map:** `removalCriteria`
slot 4 is answered by 2 of 9 units (Greece and Ireland, both squarely), and
`l2Support` slot 4 -- what qualification the teacher needs -- by 1 of 11. Two
fields with a question that is nearly never answerable is a pattern, not an
accident.

`l3Support` collapses to two bullets both at slot 1 on nine of eleven units,
usually a compulsory-language fact carried over from the `fl` map's territory
rather than anything about newcomers. Ireland is the only unit whose
`l3Support` answers questions 1, 2 and 3 together.

## dld, second batch

**`multilingualProvision` has no question about the language of INTERVENTION,
and this is the most systematic mismatch found so far -- 9 of 9 units.**
Question 1 asks only whether a child can be ASSESSED in a language they speak,
yet every unit carries a paired "Intervention: mainstream only X%" bullet.
Tagged 1 on all nine for want of anywhere else. Question 4, about norms for
bilingual children, is unanswered everywhere.

**`serviceModel` question 4 asks "tiered or universal" and gets inequality of
ACCESS instead** -- 7 units carry "Access shaped by: cost to parents 82%,
income level 64%, urban/rural 62%", which is about who gets served rather than
how provision is structured.

**`workforce` has no question about composition or caseload.** Spain's
"logopedas were the most female of the health professions, at 93.0%", Croatia's
"97.7% female" and "Preschool children aged 3-7 the main caseload for 63.2%" are
none of them a headcount, a ratio, a route or a location.

**`assessments` question 1 asks for ROUTINE USE and the LITMUS entries cannot
answer it.** All five carry "Records that the instrument exists — not that any
service here uses it". Question 3, whether the norms are local, is answered only
by Spain; the others offer sensitivity and specificity, which is a different
property of an instrument.

And all four patterns from the first dld batch recurred exactly: `terminology`
recognition figures on three more units, `referralPathway` placement content on
two more, `workforce` giving a within-service staffing ratio rather than a ratio
to population, and `dischargeCriteria` and `outcomesEvidence` empty on all nine.
Four patterns found on eight countries and confirmed on nine more is no longer a
sample.

## Related

`fields-must-be-countable` in the maintainer's notes: a field that can only
describe will be filled with description. The `workforce` and `terminology`
cases above are both instances.
