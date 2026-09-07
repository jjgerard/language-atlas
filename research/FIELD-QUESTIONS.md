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

## The deepest one: a field can presuppose the wrong THING, not just the wrong question

`eal.newcomerCriteria` asks who counts as a newcomer, on what evidence, when it
is decided, and by whom. All four presuppose that the designation OPENS
support.

Russia's does the opposite, and its own bullets say so twice: "A test to
exclude, not to support", and "The statute defines a gate into school, not an
exit from support". A child who fails it is not admitted. That is a designation
the four questions can be asked of and still completely misdescribe, because
they assume the answer to "what happens next" is help.

This is different from every other item in this file. The others are questions
that go unanswered, or content with nowhere to sit. This is a field whose
questions fit the prose and produce a wrong reading of it.

## eal has no funding field

Three of eleven units in one batch put funding facts into `l2Support` for want
of anywhere else: Poland's subvention weights P44 1.5 and P45 0.3, Slovakia's
adjustable per-pupil financing, and Sweden's "one of only three European
systems funding bilingual subject teaching, with Germany and Norway". `dld` has
a `funding` field and `eal` does not, though the question is equally live on
both.

## Oceania breaks the biggest pattern, and explains it

`bilingualEducationNotes`' disclaimer -- "is this provision aimed at these
pupils at all?" -- was on 18 of 23 European units and looked close to universal.
It is not. **Seven of fifteen Oceanian units are clean counter-examples**, where
the field's four questions apply exactly as written because the bilingual
programme IS this map's answer:

- Samoa, a Samoan/English bilingual system for the whole cohort, no disclaimer
- Kiribati, early-exit transitional, Te Kiribati to English at year 3
- Solomon Islands, Sa'a and Arosi alongside English in eight schools from 2014
- Papua New Guinea's vernacular pre-schools across 400+ languages
- Guam, the Northern Marianas and the Marshall Islands, statutory
  bilingual-bicultural provision in the vernacular

Only two carry the European-style disclaimer, and neither in the
migrant-versus-minority form.

**The reason is structural and it is a better diagnosis than "question 1 is
wrong".** In Europe the school language is the majority language and bilingual
education is for someone else, so the field's premise fails. In the Pacific the
school language is frequently NOT the child's language, and the bilingual
programme is the mechanism for exactly that gap, so the premise holds.

**The disclaimer marks systems where the medium of instruction is uncontested.**
Where it is contested, the field works as written. That is a fact about the
world the field is describing rather than a defect in the field, and it changes
what any fix should be: not a new question, but a way of recording which of the
two situations a system is in.

## Three more, from Oceania

**`newcomerCriteria` has no slot for the language a REGIONAL TEST is sat in --
9 of 15 units.** "X did not have PILNA translated, so its pupils were assessed
in English" is neither who counts, nor evidence, nor timing, nor decider. It is
a fact about what language a child meets a test in, which is squarely this
map's question and has no home anywhere on the map. Nine units is larger than
most patterns in this file.

**`l1Support` has no slot for whether the rule is REAL** -- four of fifteen end
the field with exactly that: "That policy sits outside the statute, which is
silent on language"; "No evidence was retrieved that it was adopted"; "The
wording is permissive, and creates no entitlement a pupil could claim";
"Sources point opposite ways, and no amending instrument reconciling the two
was found". It is the most useful sentence in each of those fields and it
answers none of taught/provider/stage/examinable.

**The eal funding gap, confirmed from a second region.** "Title III-A can be
folded into the Consolidated Grant for the Insular Areas" appears at the end of
`bilingualEducationNotes` on American Samoa, Guam and the Northern Marianas --
the same sentence, three units, tagged 4 by proximity on all three because
there is nowhere else. New Zealand's per-pupil figures and application rounds
sit in `l2Support` at slot 3, which is about time rather than money.

## The first `achievementGap` q3 answer in the atlas

Solomon Islands: "No comparison of results by home language is published for
Solomon Islands". It does not overturn the 0%-of-26 diagnosis -- q3 IS
redundant wherever a gap is actually measured, because q2's bullet has already
named the comparison group -- but it shows the question is reachable when the
answer is that no comparison group was used. Micronesia gives the same shape
from the other side: "The whole cohort is in the majority-language condition,
so no gap is measured".

## The source decides, not the country — now shown twice

`dld.workforce` q2 asks for a ratio to POPULATION and had been answered twice in
six batches, by Italy and Sweden. Oceania adds THREE at once: French Polynesia
("18 practitioners per 100,000 inhabitants"), South Australia ("48-54 speech
pathologists per 100,000") and Tasmania ("the lowest ratio of speech
pathologists to population in Australia").

Two of the three come from the same kind of source — a professional
association's modelled national analysis — and that is the point. It is the
same lesson Luxembourg taught on `multilingualProvision`, where the only unit
answering q4 was the only one whose source was a test battery rather than a
survey or a statute.

**So for several of these near-never questions the defect is not in the
question. It is that the research has not routinely gone to the one source type
that can answer it.** A survey of practitioners answers who and how many; a
statute answers what is owed; only a professional association's workforce
analysis answers a ratio to population, and only a test battery answers whether
norms exist. The remedy is to brief for the source, and that is a cheaper fix
than changing a field.

## Oceania, dld: two more, and a field that is 0% twice over

**`assessments` q2 and q3 are 0% of 13 Oceanian units.** Not one says which
languages an instrument exists in, or whether its norms are local. q1 reads
100% but is largely filled with WHO assesses and WHERE rather than a named
instrument — and two units say why in their own words: New South Wales "names no
instrument, only a required property of the test", and the Northern Marianas
record that "No instrument is named in regulation". A field whose first question
is answered by describing something else is not really answered at all.

**`multilingualProvision` picks up two more kinds of content it does not ask
for.** American Samoa's only bullet is the procedural-safeguards notice
published in Samoan — parent-facing documentation, not assessment. Palau's and
Solomon Islands' fields are national language-and-medium-of-instruction law.
Neither is about a child being assessed, which is what the field asks.

**And the placement finding reaches a third field.** `identificationCriteria`
carries placement content on Papua New Guinea and Tonga, as it did on Belarus
and the Isle of Man — so placement now has no home in `referralPathway`,
`identificationCriteria` or `serviceModel`, while turning up in all three.

## Counter-examples worth as much as the patterns

`dld.referralPathway` q4 is answered by half the Oceanian units — the Northern
Marianas "within 60 days of receipt of parental consent", New Zealand "from age
4 years 8 months", Western Australia's annual closing dates. Well above the
near-never fields, and a reminder that this file's list is not uniform.

`legalEntitlement` q4, redress, gets a clean four: the Northern Territory's
tribunal review where the parent bears no costs, Queensland's information notice
and chief-executive review, Victoria's VCAT, Western Australia's written
application to the CEO.

And the Australian Capital Territory is only the SECOND unit anywhere with a
real `dischargeCriteria` — a mandatory two-yearly review for language disorder
specifically, plus a review on entry to high school. On a field filled for 2 of
28 units here and 17 of 210 overall.

## The counter-examples, and what they change

A question almost nobody answers might be a bad question, or it might be a good
question whose answer lives in a source type we rarely reach. The difference
matters, and three units have now settled it for two of the fields here.

**`dld.multilingualProvision` q4 is 0% across the atlas — and Luxembourg
answers it.** It answers all four, in fact: q3 explicitly ("They separate
difficulties tied to the pupil's language profile from specific disorders") and
q4 explicitly ("Before these, tests built for German-first children had to be
used" — that is, no norms existed for these children until the new batteries
were built).

And Luxembourg is the only unit whose source for that field is neither the COST
practitioner survey nor a bare statute. It is a TEST BATTERY. That confirms the
source-split finding and sharpens it: the field's four questions are answerable,
but each source type can answer only part. A survey reaches q1 and q2, a statute
reaches q3, and only a test-battery source reaches q4. Nobody answers all four
because almost nobody consults all three kinds of source.

**`dld.referralPathway` q4 is answered cleanly by Poland** ("A special-education
ruling is due within 30 days of the application") **and Malta** ("The Early
Intervention Service covers children from birth to five years"). Referral q4 is
answerable more often than the other near-never questions in this file.

**`dld.workforce` q2 is answered by Italy** ("France, same population, has three
times as many") **and by Sweden** ("20 logopeds per 100,000 inhabitants
nationally, November 2022", with a county range) — two units across six
batches, and Sweden's entry answers q1, q2 and q4 together.

**`eal.removalCriteria` q4 is answered by Slovakia** ("Adaptation classes capped
at one school year and cannot be repeated"), and **`eal.l2Support` q4 by
Serbia** ("'Serbian as a Foreign Language' standards were in development; 350+
staff trained in 2017").

**And the largest pattern in this file has clean counter-examples.** Sweden and
San Marino carry NO `bilingualEducationNotes` disclaimer: Sweden's
Swedish/Arabic and Swedish/Finnish programmes and San Marino's Italian-plus-
English vehicular arrangement are systems where the field's four questions
apply exactly as written. The disclaimer is not universal; it marks the
systems whose bilingual provision is for historic minorities rather than for
newcomers, which is most of Europe but not all of it.

So the file's list should not be read as "these questions are wrong". Some are
— `eal.achievementGap` q3 asks for what q2 has necessarily already said, and
that is a defect in the question. But others are questions whose answers exist
in sources the research has not routinely gone to, which is a research finding
rather than a design one, and the remedy is different: brief for the source
rather than change the field.

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

## Bullet count is not a proxy for questions answered, and it is not close

This was worth testing because if it held it would clear the whole re-slotting
backlog for free. The convention says bullets answer the questions in order,
omitting any that cannot be answered -- so a field with exactly four bullets
against four questions should, on that reading, be tagged [1,2,3,4] and could
be tagged mechanically without anyone reading it.

Across the five maps there are 606 tagged fields whose bullet count equals
their question count. **95 of them are [1,2,3,4]. That is 15.7%.**

    [1,2,3,4]   95   15.7%
    [1,2,2,4]   63   10.4%
    [1,2,2,3]   45    7.4%
    [1,1,2,2]   40    6.6%
    [1,2,2,2]   40    6.6%
    [1,1,1,1]   38    6.3%
    [1,1,2,3]   36    5.9%
    [1,2,3,3]   35    5.8%

33 distinct patterns in 606 fields. So the shortcut is dead, and the ~6,000
unslotted fields have to be read by someone. But the distribution says more
than that.

**The second most common shape doubles up on question 2 and skips question 3.**
[1,2,2,4] and [1,2,2,3] together are 18% -- more than [1,2,3,4] on its own.
Drafters given four bullets spend two of them on the second question rather
than reaching the third. That is the same finding as the q3 percentages in the
section above, seen from the other side: question 3 is not being skipped for
lack of room.

**[1,1,1,1] is 6.3%, 38 fields.** Four bullets, all answering the first
question. Some of those are the documented-absence collapse already recorded
above, where questions 2-4 presuppose a yes. The rest are fields where the
first question is the only one the available documents speak to, and a drafter
with more to say about it kept saying it.

## Related

`fields-must-be-countable` in the maintainer's notes: a field that can only
describe will be filled with description. The `workforce` and `terminology`
cases above are both instances.
