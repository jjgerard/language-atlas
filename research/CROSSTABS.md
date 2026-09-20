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

## The habit this file is really recording

Three of the six candidate findings here failed a confound check that took one
command to run. The check is `confound()` in `coding-crosstab.js`: split the
corpus by the column under test, report the hit rate, the mean docLinks, and
the same split inside every region. A finding that does not hold inside regions
is usually a finding about who writes things down.
