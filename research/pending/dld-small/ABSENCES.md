# Documented absences from the dld small-jurisdiction cluster

Two unit-fields out of the 26 in this block. They are NOT in `done-small.json`,
because the absence flag is written by a different tool. One section per
unit-field, with the source url, its status code and the verbatim quote.

The test applied was the narrow one: a source says the thing the field asks
about does not exist in that system. Where a source instead established a
determinate positive answer — Saint Lucia's referral clause, Curacao's
placement commission, Gibraltar's prevalence review — that went into
`done-small.json` as prose.

Three near-misses are recorded at the bottom, because each one is a judgement I
made against flagging and somebody may want to overturn it.

---

## VA|Vatican City — `dld.outcomesEvidence`

**Absence:** Vatican City State runs no school system of its own, so there is no
school population about which any outcome could be measured or reported.
Children resident or citizen there attend legally recognised schools under the
legislation of other States.

**Source:** Holy See, second periodic report to the UN Committee on the Rights of
the Child, CRC/C/VAT/2 (22 October 2012), section IV on Vatican City State,
para. 114. This is already in this entry's `docLinks`, and it is the same
paragraph that the `eal.newcomerCriteria` and `indigenous.mediumOfInstruction`
absences on this unit rest on. The atlas's `dld.identificationCriteria` sentinel
for Vatican City was graded A on exactly this ground: the field is structurally
unanswerable rather than unresearched.

url: https://documents.un.org/doc/undoc/gen/g12/468/09/pdf/g1246809.pdf
(HTTP 200, 745,741 bytes, application/pdf)

**Verbatim quote, para. 114:**

> Children attend legally recognized schools according to various State
> legislation, save those cases where parents and tutors are able to instruct
> children privately, to pay the expenses, and to access the necessary
> educational tools (cf. Law of 1 October 2008, N. LXXI, art. 11).

**The hedge that must survive into whatever is written.** The same paragraph
continues: "There is one minor seminary and a child need not be a resident or a
citizen of VCS in order to attend it. The educational expenses are paid by the
parents." So the claim is not that no school stands on the territory. It is that
there is no State school system, and therefore no pupil cohort of which VCS
could report outcomes. The existing sentinel already says the right thing about
its own sources — that they "report on the Holy See's international position
rather than on any school population" — and that wording should not be lost.

---

## MM|Myanmar — `dld.referralPathway`

**Absence:** The referral systems the field asks about are recorded as not in
place. This is not "no source was found"; it is a source saying the thing does
not exist.

**Source:** UNESCO GEM Report PEER country profile, Myanmar — Inclusion, section
6, Teachers and support personnel. Already in this entry's `docLinks`. The page
states 'Validated by the country: No'; last modified Wed, 28/07/2021.

url: https://education-profiles.org/eastern-and-south-eastern-asia/myanmar/~inclusion
(HTTP 200, 832,501 bytes, text/html)

**Verbatim quote:**

> Limited knowledge on needs assessment has been reported for teachers in
> regular schools and other personnel. Individual education plans and referral
> systems based on learning assessment are not in place.

**Two hedges that must survive.** First, the passage is about disability and
inclusive education generally and never reaches language or communication
support — the scope hedge `disability generally` in `src/coding.js` is exactly
this case. Second, it is a 2021 profile the country has not validated, and it
predates the 2021 coup; it is a statement about the position as PEER recorded
it, not about the position now.

**What the existing sentinel gets right and should not lose.** It names both
routes tried — the PEER profile and the Parami General Hospital speech and
language therapy department page — and records that the hospital page "sets out
no route by which a child reaches it and no gate on who may come". That is a
second, independent negative about the only named service, and it belongs
alongside the absence rather than being replaced by it.

---

## Three I decided NOT to flag

**BB Barbados, BS Bahamas, GD Grenada, AG Antigua `dischargeCriteria`.** Each
Act was read for the terms, and in all four "discharge" occurs only at a section
about an officer discharging the duties of office — the same shape Trinidad and
Tobago turned out to have. That is a real finding, but it is a negative about
the *text of a statute*, and there is no sentence anywhere that can be quoted to
carry it. An absence flag needs a source saying the thing does not exist;
"the word is not in the Act" is not such a sentence. So what went into
`done-small.json` instead is what each Act positively does say about the bound
on the entitlement — the age ceiling, and who decides — and the fact that no
exit rule was found belongs in the sentinel or a note, not in the absence flag.

**HT Haiti `dischargeCriteria` and `assessments`.** The PEER profile says "By
2027, special education will have an appropriate legal and regulatory framework
and a system of accreditation, supervision and monitoring will be in place",
immediately followed by "It is difficult, however, to identify the measures that
have been implemented to date." Read one way that establishes there is no
framework now, which would make both fields documented absences. Read the other
way it is a plan's own statement of intent, and the profile is explicitly
uncertain about what exists. I did not flag it: turning a target date into a
present-tense absence is the kind of inference the content rules forbid. If
somebody wants it flagged, the quote and the url are
https://education-profiles.org/latin-america-and-the-caribbean/haiti/~inclusion
(HTTP 200, 814,782 bytes) and the reasoning is above.

**CU Cuba, DM Dominica, HT Haiti `assessments`.** "No instrument named in any
retrieved source" is true of all three and is already the `none` value in
`TEST_TYPES`. It is an absence in the entry's sources, not an absence in the
system, and flagging it would say the system has no assessment when what was
established is that no source names one.
