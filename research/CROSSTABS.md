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
need.** Asia 17 of 31, 55%. Europe 21 of 40, 53%, against 30% clinical. V =
0.311, permutation p = 0.0025 holding each system's value count fixed.

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

## Two the corpus cannot be asked about at all

**Exit criteria by region, in both domains.** eal `exit_mechanism` is n = 36
with 26 in Europe and nothing in Africa, p = 0.77. dld `discharge_basis` is n =
49 with 30 in Europe, p = 0.19. Whether systems exit on time, on a test or on a
judgement is a question about a European sample, and asking it regionally
invites an answer the data cannot give.

## The habit this file is really recording

Five of the nine candidate findings here failed a check that took one command
to run, and a fifth — the eal entry/exit timing cross, withdrawn in e6202f4 —
failed a permutation test at p = 0.40. The usual check is `confound()` in
`coding-crosstab.js`: split the corpus by the column under test, report the hit
rate, the mean docLinks, and the same split inside every region. A finding that
does not hold inside regions is usually a finding about who writes things down;
one that does not hold without sub-national units is usually a finding about one
country.
