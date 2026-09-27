# The 142 sentinels, triaged

Done 2026-09-28, by reading, with no fetches at all. Three agents, one per
domain, sorting every third-state sentinel into closed / target / blocked /
thin. `research/GAP-PLAN.md` called this the highest-leverage single action in
the atlas; this is what it found.

## Counts

                     A closed   B target   C blocked   D thin   total
    dld                     9         19           7       30      65
    eal                     4         17           1        1      23
    indigenous             18         33           1        2      54
    TOTAL                  31         69           9       33     142

**The row is not 142 investigations. It is 121.** `sentinel-dupes.js` finds 27
sentinels that are one of six repeated texts — the same sentence doing duty
for several units:

    10  dld.multilingualProvision   the LITMUS template (AL, ES-Catalonia, IR,
                                    MT, MY, PS, PT, RU, SA, SY)
     6  eal l1/l2/bilingual         the PISA-catalogue text (BN and JP x3)
     5  dld.dischargeCriteria       "no exit or discharge rule located" (BB,
                                    BS, GD, HT, TT)
     2  dld.assessments             (DM, HT)
     2  dld.serviceModel            the Internet Archive 429 (US-GA, US-NV)
     2  indigenous.taughtAsSubject  the Eurydice Figure B9 text (IS, LU)

The LITMUS ten are the worst of it: 447 characters that describe the FIELD —
"whether any service, clinical guideline or funder requires, supports or
reimburses assessment in all of a child's languages was not determined" —
rather than record a search. Ten units carry it. That is one act of research
reported ten times, and it is most of why `dld.multilingualProvision` looked
like the second-largest gap in the atlas.

## The split is by FIELD, not by country

In eal, the only two fields that closed anything are `newcomerCriteria` and
`removalCriteria` — fields where establishing that **no designation exists**
answers the question. The three service-description fields closed nothing:
17 of 17 are B or C.

That is a property of the question, not of the research. "Is there a category"
can be answered by an absence; "what support is given" cannot be, in the same
way. Worth knowing before anyone plans a wave against one.

Indigenous concentrates in `taughtAsSubject`: 18 of its 33 targets, and six of
those rest **entirely on one Eurydice Key Data 2023 Figure B9 cell** (BA,
Belgium-FR, IS, LI, LU, MT), four in near-identical wording. One comparative
indicator standing in for six national curricula.

## What has already been closed, at zero cost

Eight cells, by **cross-reference**: the statute had been read for a sibling
field and nobody carried it across.

- **North Korea, 3** — `newcomerCriteria` records both DPRK education laws
  read in full; 언어, 조선어, 소수, 외국인, 편입 and 전학 all zero. That
  answers `l2Support`, `l1Support` and `bilingualEducationNotes`.
- **Barbados, 3** — `revitalisation` reads Education Act Cap. 41 and states it
  "carries no language-of-education or language-promotion clause at all",
  which answers standing, medium and subject together.
- **Grenada 1, Saint Vincent 1.**

**The move is only valid when the sibling read is TERM-LEVEL.** Barbados's is
— three occurrences of "language", all accounted for. A sibling saying merely
"the Act was consulted" is not enough. Five more candidates are listed below.

## What to do next, in cost order

1. **Rewrite the LITMUS ten (and the four other templates).** No fetching.
   They should either say what was actually searched for each unit, or be
   collapsed into one honest statement. Until then the field's gap count is
   not a number anybody should plan against.
2. **Write the statute title into four A grades that name it only by role** —
   TT assessments, LC referralPathway, AG and KN dischargeCriteria all assert
   "the Act" was read without naming it, so the close cannot be checked.
3. **Settle Trinidad and Tobago's self-contradiction.** Its `assessments`
   sentinel says "no instrument named in the Act or in policy documents
   retrieved" (graded A); its `dischargeCriteria` says only "no exit or
   discharge rule located" (graded D). One read of that Act settles both.
4. **Unblock three US states as ONE networking fix, not three research
   tasks** — US-GA and US-NV share the Internet Archive 429 plus a state host
   that 403s a browser-identified request with a Google referer, and
   US-NH names its blocked document (N.H. Code Admin. R. Ed 1100).
5. **Then the named B targets**, of which the clearest are:
   - NG Nigeria `identificationCriteria` → 2015 National Policy on Special
     Needs Education. PEER quotes the policy's own words, so it is confirmed
     to exist, to be on subject, and to be unread. Best single target.
   - ER Eritrea `identificationCriteria` → 2010 National Education Policy and
     the 2008 Policy and Strategy on Inclusive Education.
   - MW Malawi `taughtAsSubject` → Education Act 2013, cited by PEER, unopened.
   - ZM Zambia `taughtAsSubject` → 2013 National Curriculum Framework.
   - MU Mauritius `mediumOfInstruction` → the Education Act, already read for
     `newcomerCriteria` on 2026-09-27; a cross-reference candidate first.

## Judgement calls worth revisiting

- **Constitution-only sentinels were graded B, not A** (Afghanistan, Cuba x2).
  North Korea is the precedent: its constitution WAS read and the education
  laws still had to be. A constitution is not where a timetable or a funded
  programme lives. Grading them A makes indigenous 21/30.
- **A relayed citation can look exactly like a read.** Mongolia's `l2Support`
  quotes the 2002 Law on Education "as amended in 2006" with article 30.1.12,
  which reads as primary — and the surrounding source list makes it near
  certain the text came through PEER. Worth correcting at source.
- **Vatican City `identificationCriteria` was graded A off a report to the CRC
  Committee**, not a statute, because it establishes there is no school system
  in the territory. The field is structurally unanswerable rather than
  unresearched, and grading it B would send an agent after a law that cannot
  exist.
- **GI Gibraltar `outcomesEvidence` is the one grade that changes the action.**
  It reads both ways: the Department pages "answer and publish no pupil
  statistics" (B) and "the Gibraltar register could not be read" (C). B means
  find another source; C means retry the fetch.
