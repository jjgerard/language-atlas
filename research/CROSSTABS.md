# Cross-tabulating the seven coded schemes

Run with `node research/tools/coding-crosstab.js`, which prints every cross and
the confound checks. This file records what came out on 2026-09-20 and, more
importantly, which results did not survive checking.

210 national systems, joined across dld and eal on `countryCode|unitName`. The
two instrument-grained fields are reduced to say anything per system, and the
reduction is a claim: `obliges` is taken at its MAXIMUM — "the strongest thing
any instrument here promises" — because averaging an ordinal across instruments
would invent a number the corpus does not contain.

## Three that survive

**Systems federalise both categories together.** `rule_locus` on dld
identification against eal newcomer agrees on 50 of 62 systems — 81% observed
against 60% expected by chance, Cohen's κ = 0.52. The off-diagonal cases are
one step apart, not opposite. A state that decides "who is a language-disordered
child" nationally decides "who is a newcomer" nationally too. Federalism is not
applied selectively to one category.

**A constitution in the stack goes with a weaker entitlement, not a stronger
one.** Of 41 systems citing a constitution among their instruments, 2 reach
`obliges` 3 or 4. Of the 168 that do not, 73 do — 5% against 43%. It holds
inside regions, which is what the withdrawn finding below did not: Africa 0% of
22 against 16% of 32, Americas 0% of 5 against 46% of 35, Asia 8% of 12 against
39% of 36.

And **no European system cites a constitution at all** — 0 of 47. Constitutional
guarantees appear where specific entitlements do not, and substitute for them
rather than reinforcing them.

Caveat kept in view: mean docLinks is 2.9 for the constitution group against
5.1, so thin documentation and constitutional citation travel together. The
within-region consistency is why this is reported and the threshold one is not.

**The systems with a test built for bilingual children are the systems with no
rule about using it.** 25 systems hold an instrument coded `designed
multilingual` or `parallel versions`. Of those, **2 state any rule about the
language of assessment**, and 14 have a multilingualProvision entry that is the
COST practitioner survey rather than policy. The tool exists; whether anyone
must use it is unrecorded for 23 of the 25. That is the LITMUS hedge —
"records that the instrument exists, not that any service here uses it" —
turned into a count.

## One null result worth having

**Reform recency does not predict a stronger entitlement.** Banding each system
by its newest dated instrument, the share reaching `obliges` 3 or 4 is 31%
since 2015, 22% for 2000–2014, and 30% before 2000. No trend, n=135. A recent
law is not a stronger law, and the timeline on /patterns should not be read as
if it were.

## Three that do NOT survive, and why

**`obliges` against redress looks monotonic and is mostly Europe.** The global
picture is clean — 0% of level-0 systems name a redress route, 5% at levels 1
and 2, 16% at 3, 36% at 4. But mean docLinks climbs with it (3.5, 3.7, 6.1,
7.4) and the gradient exists in one region: Europe runs 22% at level 2 to 67%
at level 4, while Africa is 0% at every level, Oceania 0% at every level, and
the Americas 6%/0%/8%/0%. The relationship may well be real and only visible
where documentation is deep enough to show it, but it is not established here.

**dld threshold against whether a newcomer category exists** was withdrawn in
7c4b8bb and stays withdrawn. Mean docLinks 7.5 against 3.4, and the effect
reverses inside Asia.

**Naming an assessment instrument against having a stated threshold** — 62%
against 39% — is documentation depth almost exactly: mean docLinks 8.9 against
3.8, and every European system in the comparison is on one side of it.

## Two that are simply too small

`designation` against `exit_mechanism` (n=36) and the bilingual-test cross as a
cross rather than as a gap (n=35). Both need `dischargeCriteria` and
`removalCriteria` filled before they mean anything.

## One that fails on a different confound: sub-national double-counting

**Threshold basis against discharge mechanism.** This is the cross the whole
criteria-coding effort was aimed at, and it was blocked until now because
`coding-crosstab.js` joins dld to eal and keeps national units only. Both
columns here are dld, and after the sub-national identification pass all twelve
sub-national units carrying a discharge coding carry an identification coding
too. `coding-cross-dld.js` runs it without the join, on 58 systems.

Over all 58 it reaches Cramer's V = 0.343, p = 0.041 against a permutation null
that holds each system's NUMBER of mechanisms fixed and reshuffles which ones.
Over the 46 national units alone: V = 0.323, p = 0.165.

The effect size barely moves. What moves is n, and the added n is not
independent. Six of the seven `administrative certification` systems are Chinese
provinces applying one national certification rule, and five of them sit in the
single cell `administrative certification x age ceiling` — the cell that carries
the association. Twelve sub-national rows bought twelve degrees of freedom the
corpus does not actually have.

This is not an argument against the sub-national coding, which is correct and
is what `/patterns` should show. It is an argument that a significance test over
a corpus containing a country and its provinces is testing the wrong
population. `coding-cross-dld.js` therefore prints both runs by default rather
than taking a flag, because reading one without the other is how this goes
wrong.

What survives is descriptive and worth stating anyway: `re-evaluation cycle` is
the most common mechanism under every threshold basis that has more than two
systems, and no threshold basis avoids it. Systems differ in how they let a
child IN far more than in how they let one out.

## One that survives every check: how Asia and Europe ground identification

`node research/tools/coding-region.js dld identificationCriteria threshold_basis`

National only, `not stated` excluded because it is a statement about sources
rather than about systems (see below). n = 110.

**Asia grounds identification in clinical diagnosis, Europe in educational
need.** Stating this as "55% against 53%" undersells and misdescribes it — two
thin majorities pointing opposite ways is not the claim. The claim is the
contrast. Among the systems using one of these two grounds:

```
            clinical   educational need
  Asia          17            7
  Europe        12           21
```

Odds ratio 4.25, Fisher exact two-sided p = 0.0156. Across the full column, V =
0.311 and permutation p = 0.0025 holding each system's value count fixed.

**And `clinical diagnosis` means the same thing in both places**, which is the
check that matters before a proportion is worth anything. The two groups are
near-identical on every other column of the same field. Decider: Europe splits
4 multidisciplinary team and 4 clinician of 12, Asia 7 and 7 of 17. National
statute as the locus: 10 of 12 against 13 of 17. Silent on bilingual handling:
11 of 12 against 16 of 17. Exclusions `none stated`: 11 against 15. The value is
not hiding two different phenomena, so the regional difference is in how often
systems reach for it, not in what they mean by it.

It survives the two checks that have killed everything else here:

- **Sub-national inflation.** National units only, so no country is counted
  once per province.
- **Documentation depth.** This is the one that matters, because Europe carries
  8.8 mean docLinks against Asia's 4.0, and a plausible mechanism exists — thin
  sources might show only the medical route while deep ones also reveal the
  school-side rule. Tested within regions, it does not operate. Europe:
  clinical 9.6 docs, educational need 8.7. Asia: clinical 3.6, educational need
  4.4. Americas: 2.0 against 2.5. Depth does not predict the value inside any
  region, and the direction is not even consistent across them.

## Two that are a statement about sources, and should be quoted as one

**`not stated` on dld threshold tracks documentation almost exactly.** Africa
29 of 38, 76%, at 3.3 mean docLinks. Americas 43% at 2.6. Europe 13% at 8.6.
This is worth reporting — it is the clearest measure the atlas has of where the
record thins — but it is a finding about the corpus, not about the systems, and
the regional table should never be shown without it.

**The eal designation split is clean in Europe and is not in Asia.** Europe
names a category 23 times in 32 and uses a proxy once; Asia uses a proxy 10
times in 17. V = 0.477, p = 0.0004. But within Europe the depth is flat across
values — functional 4.3, named 4.4, proxy 4.0 — while within Asia proxy sits at
2.8 against named category at 6.8. Either Asian proxy systems are the
under-documented ones, or a citizenship rule is genuinely one line where a named
category with a definition and a test generates a literature. Nothing here
separates those.

## Exit criteria: the variation is real, the regional question is not

The first version of this section said the corpus could not be asked about exit
by region. That was too broad, and the column has more structure than n = 36
national rows suggests.

**Within Europe there is real variation.** n = 26: clock 14, proficiency
judgement 5, not stated 4, none established 3, test 1, assessed-no-criterion 1.

**Inside `clock` there is an ordinal spread**, and it is the most analysable
thing in the column. Serbia 2 months; Austria, Finland, Liechtenstein,
Luxembourg, Latvia, Poland, Slovakia 12; Czechia, Greece, Netherlands, Slovenia
24; Estonia 36; Sweden 48; New Zealand and Puerto Rico 60; Taiwan a clock with
no length given. Fourteen of the seventeen are European, so this is a question
about European practice with two long outliers, not a global one.

**Across all units the instruments are regionally specialised**, V = 0.404,
p = 0.0001, and unusually for this file the documentation spread is tight
(4.5 to 6.3), so depth is not the explanation:

```
            assessed  clock  none  not stated  judgement  test    n
  Americas         0      5     2       4          18      48     61
  Europe           1     17     4       4           5       3     31
  Oceania          0      5     0       3           2       6     12
```

The Americas run on named tests, Europe on clocks. But the Americas column is
61 US units under one federal framework — ESSA requires a uniform statewide exit
procedure, and the states adopted standardised proficiency assessments under it.
That is one decision counted fifty times, the Chinese-provinces problem again.
The contrast is a true description of instruments and a sample of about two
countries, so it belongs in prose and not in a test.

What remains genuinely open is the clock length: fourteen European systems, 2 to
48 months, against nothing yet that would explain the spread.

## Four PISA outcomes, and only two of them are different from each other

`research/pisa-2022-immigrant-outcomes.json` now holds four columns per country
from PISA 2022 Annex B1 chapter 7: the immigrant minus non-immigrant gap in
mathematics (I.B1.7.17), reading (I.B1.7.21) and science (I.B1.7.25), and the
gap WITHIN immigrant students between those who speak the language of assessment
at home and those who do not (I.B1.7.29).

**The three subjects are one variable measured three times.**

```
  maths x reading      r = 0.933  (n = 75)
  maths x science      r = 0.964
  reading x science    r = 0.950
  maths x homeLanguage r = -0.276  (n = 50)
```

Running a coding column against all three subjects is not three tests, and a
result that held in one and not the others would be noise rather than a subject
effect. Mathematics was the major domain in 2022; the other two are measured
less precisely.

**The language gap is the one that differs**, at r = -0.28 against the other
three, and it is the better dependent variable for this atlas. It holds
immigrant status constant — immigrants against immigrants — and it asks about
language, which is what an eal rule acts on, rather than about migration.

The two variables come apart exactly where composition does:

```
                         immigrant gap    language gap
  United Arab Emirates        +90              -8
  Qatar                       +71             -40
  Germany                     -59             +51
  Switzerland                 -53             +46
  Austria                     -58             +37
```

In the Gulf an immigrant student is often an expatriate professional's child, so
immigrants outperform and the ones NOT speaking Arabic at home outperform most.
In German-speaking Europe immigrants underperform and speaking the test language
at home is worth around 50 score points. The immigrant gap is mostly a fact
about who migrates. The language gap is closer to a fact about language.

## No eal rule corresponds to any of them

### The original maths run

The outcome is PISA 2022 Table I.B1.7.17 — immigrant minus non-immigrant mean
mathematics score, in score points. `research/pisa-2022-immigrant-maths.json`
holds 79 countries, taken from the StatLink workbook and not from the PDF,
which misaligns that table badly enough to pair countries with other countries'
numbers. `research/tools/pisa-cross.js` joins it to any coding column.

**Nothing corresponds.** Three columns, three nulls:

```
  column                             n   permutation p
  newcomerCriteria.designation      39   0.0138  -> 0.2887 -> 0.8488
  newcomerCriteria.triggers         40   0.5523
  removalCriteria.exit_mechanism    25   0.9034
```

The exit result is the flattest thing in this file. Clock -35.1, proficiency
judgement -35.0, test -37.0. Three different ways of deciding when support ends
and the same gap under all of them, to within two score points.

### The designation result, and why it has three numbers

It reaches p = 0.0138 on all 39, because `proxy category` sits at +25 against
`named category` at -31. Named:

> **proxy category**: Qatar +71, Singapore +30, Saudi Arabia +29, Italy -30

Three of the four are Gulf or Singapore, where an immigrant student is often
the child of an expatriate professional in a private international school. The
largest positive anywhere in the table is the United Arab Emirates at +90, under
`functional`. Italy — the one non-Gulf proxy system — sits at -30, which is the
European mean.

Drop the three Gulf states and it goes: `functional` -19.0 to -31.1,
`proxy category` +25.0 to -0.0, `named category` unchanged at -31.1, p = 0.2887.
Europe alone: -26.0, -29.9, -33.1, p = 0.8488. Three forms of designation, one
number.

This is the composition confound the tool header warns about, arriving exactly
where it was expected. The gap measures who a country's immigrants are before it
measures anything a ministry wrote down, and at n of about 20 per group nothing
separates the two. The honest use of the join is descriptive — policy and
outcome side by side, with no causal claim attached.

### And the language gap, which is the fairer test, says the same

```
  column            all           no Gulf        Europe
  designation       p = 0.0084    p = 0.1986     p = 0.3841
  triggers          p = 0.5967    p = 0.8009     p = 0.7725
  exit_mechanism    p = 0.1152    p = 0.1168     p = 0.1949
```

`designation` reaches p = 0.0084 and collapses on the same three Gulf states, in
the same way, on the outcome that was supposed to be less exposed to them. Its
non-Gulf means — functional 8, named category 20, proxy 11 — lean the way you
might expect if naming and defining a category did something, and p = 0.20 at
n = 30 is not evidence of it. Six of twelve candidates in this file have died at
this exact step.

One tool bug worth recording, because it points the wrong way. Countries where
PISA reports no gap came through as `null` and coerced to 0 in the group means,
dragging every group toward no difference. Only Cambodia was affected here. A
null outcome is not a zero outcome and the join now drops it.

## The outcome moved, and no coded column moved with it

PISA 2025 landed on 8 September 2026 and Table I.B1.2d.10 carries the science
gap for 2015, 2018, 2022 and 2025 on one comparable basis, each at three
adjustment levels. `data/pisa-outcomes.json` holds all four.

**On the same 71 countries the immigrant science gap widened by 6.5 points
between 2022 and 2025** — from -22.9 to -29.4. It still widened by 4.4 points
after accounting for socio-economic status AND language spoken at home, so this
is not the composition story that has eaten every other result here. Latvia
widened by 69 points, North Macedonia by 54; the United States narrowed by 30
and Poland by 26.

None of it tracks anything the atlas codes. Threshold basis against the change
from 2022 to 2025: p = 0.94 raw, p = 0.53 adjusted, and the Gulf split moves
neither. A real movement in the outcome, over three years, and the
classification columns are silent about it in exactly the way they are silent
about the level.

Latvia is worth a second look for its own sake rather than as a data point. It
was the one European system with an immigrant ADVANTAGE in 2022 — +8.2 in
maths, +4.3 in reading — and it is now the single largest widening in the
table. Something changed there that this atlas records as policy history and
does not yet connect to anything.

## The habit this file is really recording

Seven of the fourteen candidate findings here failed a check that took one command
to run, and a fifth — the eal entry/exit timing cross, withdrawn in e6202f4 —
failed a permutation test at p = 0.40. The usual check is `confound()` in
`coding-crosstab.js`: split the corpus by the column under test, report the hit
rate, the mean docLinks, and the same split inside every region. A finding that
does not hold inside regions is usually a finding about who writes things down;
one that does not hold without sub-national units is usually a finding about one
country.
