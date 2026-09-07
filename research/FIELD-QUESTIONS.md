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
at all?" — and this is the largest of the findings here.** Now **18 of 23**
European units carry that disclaimer, after a second batch found it on 11 of
its 12 and 10 of those ended the field with it. Montenegro carries two.
Slot 4 absorbs it everywhere, and slot 4 is "entitlement or pilot".
Originally: seven of eleven
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

## dld, third batch: five new patterns, and one honest counter-example

**`terminology` is being filled with the name of the PROFESSION or the SERVICE,
not of the disorder.** The Faroes give two of three bullets to what the
clinician is called — audiologopedur, logopedur, taliradgevi, talupedagogur;
Jersey's third bullet is the health service branding itself SALT; Guernsey's
first is the service's own name. In a small jurisdiction with no statutory
category, the only FIXED term is the job title — and `workforce` q3 asks for
the qualification route rather than the title, so it has nowhere else to go.

**`funding` has no question for "is it free".** Free at the point of use is the
commonest single funding fact on this map, and it is not q1 (who pays), q2 (how
the money reaches a child), q3 (co-payment) or q4 (ring-fenced) — only a
negative answer to q3. Three of the seven filled `funding` fields in one batch
OPEN with it. Guernsey's entire field is "The team provides regular free
drop-in assessment clinics".

**`identificationCriteria` has no slot for what the finding LEADS TO** — the
placement finding appearing one field to the left of `referralPathway`.

**Where `serviceModel` is empty, its content migrates into `referralPathway`.**
The Isle of Man's referral field says where the team is based; Liechtenstein's
is entirely provision tiers with no referrer and no recipient. Both have an
empty `serviceModel`, and both are among the smallest units in the batch.

**`multilingualProvision` splits into two disjoint kinds of entry that never
overlap.** The COST-survey units answer q1 and q2 and never q3 or q4; the
law-derived units answer q3 only and never q1 or q2. No unit answers both
halves. The field is effectively two different questions depending on whether
its source is a practitioner survey or a statute — which is a stronger
statement of the problem than "q3 and q4 go unanswered".

**A counter-example, recorded because it is one.** `workforce` q2 asks for a
ratio to population and almost never gets one — but Italy answers it exactly:
"France, same population, has three times as many". One unit in eleven, and the
only one across four batches. The question is answerable; it is just very
rarely answered.

**A divergence between drafters worth noting.** The LITMUS hedge — "Records
that the instrument exists, not that any service here uses it" — was tagged 1
by one batch and 4 by another, the second arguing it is specifically about
whether the instrument is USED, which is q4's territory, and that 4 also leaves
it last where the stored text puts it. Both readings are defensible, which is
itself evidence the field's questions do not partition its content cleanly.

## Measured, not noticed: which questions nobody answers

Everything above came from a drafter noticing something while working. This is
the same enquiry run over the data, by `research/tools/slot-answered.js`, now
that enough entries carry slot lists to count. A question no entry anywhere
answers is a question worth re-examining.

    0%  of  26   eal.achievementGap         q3: who they are compared against
    0%  of  26   eal.achievementGap         q4: whether it is tracked over time
    0%  of  13   dld.multilingualProvision  q4: whether norms exist for them
    5%  of  21   eal.l3Support              q4: what replaces the time
    8%  of  13   dld.multilingualProvision  q3: what the rule says about bilingual children
    9%  of  22   eal.removalCriteria        q4: whether a pupil can be designated again
   10%  of  31   eal.l1Support              q4: whether it can be examined
   10%  of  21   eal.l3Support              q2: whether they may be exempted
   10%  of  21   eal.l3Support              q3: who decides an exemption

**`eal.achievementGap` is the clearest case in the atlas.** Questions 3 and 4
have never been answered once, across 26 tagged entries, and the reason is
visible in the prose: the comparison group is already inside question 2's
bullet — "X points below their non-immigrant peers" — so question 3 asks for
something question 2 has necessarily already said. Every one of those 26 comes
out `[1,2,2,2,2]`. Two questions, one of them structurally redundant and the
other never available, on a field that is otherwise well filled.

**`eal.l3Support` collapses to question 1**, at 95% / 10% / 10% / 5%. On five of
six filled fields in one batch it was `[1,1]`, carrying a compulsory-language
fact borrowed from the `fl` map rather than anything about newcomers.

**`dld.multilingualProvision` fails at both ends.** Questions 3 and 4 are 8% and
0%, while 9 of 9 units in one batch carried an intervention-language bullet the
field has no question for at all. It asks two things nobody can answer and does
not ask the one thing everybody records.

Read the percentages as a floor. `dld` and `eal` counts cover only the
re-slotted subset, and two known distortions push opposite ways: a whole-field
hedge can only be tagged 1, and a documented absence collapses to `[1,1,1,1]`
because questions 2-4 presuppose the answer to 1 was yes.

## Related

`fields-must-be-countable` in the maintainer's notes: a field that can only
describe will be filled with description. The `workforce` and `terminology`
cases above are both instances.
