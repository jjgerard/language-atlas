# Documented absences from the thin-fill worklist

These are units where a source establishes that the system has no such thing.
They are NOT in `done-thin.json`, because the absence flag is written by a
different tool. One entry here per unit-field.

The test applied was the narrow one: the absence is listed only where a source
says the thing the field asks about does not exist in that system at all. Where
a source establishes a determinate answer of "none" — San Marino's standing,
the Bahamas' standing — that went into `done-thin.json` as prose instead,
because `STANDING_STATUS` already carries a `none` value and the atlas's own
precedent (Estonia, Bosnia and Herzegovina) writes that as a bullet.

---

## VA|Vatican City — `indigenous.mediumOfInstruction`

**Absence:** Vatican City State runs no school system of its own, so there is
no stage at which any language could be the medium. Children resident or
citizen there are schooled under the legislation of other States.

**Source:** Holy See, second periodic report to the UN Committee on the Rights
of the Child, CRC/C/VAT/2 (22 October 2012), section IV on Vatican City State,
para. 114. This document is already in the `eal` entry's `docLinks` for this
unit, and it is what the `eal.newcomerCriteria` absence on the same entry rests
on.

url: https://documents.un.org/doc/undoc/gen/g12/468/09/pdf/g1246809.pdf
(HTTP 200, 745,741 bytes, application/pdf)

**Verbatim quote, para. 114:**

> Children attend legally recognized schools according to various State
> legislation, save those cases where parents and tutors are able to instruct
> children privately, to pay the expenses, and to access the necessary
> educational tools (cf. Law of 1 October 2008, N. LXXI, art. 11).

**A hedge that must survive into whatever is written.** The same paragraph adds
"There is one minor seminary and a child need not be a resident or a citizen of
VCS in order to attend it." So the claim is not that no school stands on the
territory; it is that the State operates no school system of its own in which a
medium of instruction could be set, and that ordinary schooling of its children
happens under other States' law. A second, independent sourced negative points
the same way and is already recorded in `research/parts/w4-fl-VA.md`: the
Governorate's own site lists seven Directions — infrastructure, telecoms,
economy, security and civil protection, health and hygiene, museums, papal
villas — and no education authority, with "scuol*" and "istruzion*" returning
zero on both its home page and its Note Generali page.

**Corroborating url (not the primary source for the flag):**
https://www.vaticanstate.va/it/stato-governo/note-generali/popolazione.html
