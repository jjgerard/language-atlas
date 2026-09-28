# "Coded, no value fits": 136 cells, and four of them are one thing each

Done 2026-09-28 by reading the entries, no fetching. The map's `Coded, no value
fits` row is the state where a coder read the entry, found it answers, and found
no value on the list that was true of it. The `coding-pass` skill calls a pile of
these "an argument about the vocabulary, and that is usually worth more than the
pass itself". This is that argument.

## What the number actually is

375 cells across 28 columns, minus the two the map already labels as answers
rather than gaps — `legalEntitlement.instrument_year` (151, *No year given*) and
`removalCriteria.exit_period_months` (88, *No fixed period set*). Both are
measurements a system can honestly lack.

**That leaves 136 real ones, and 53 of them are four missing values.** The other
83 are spread one to nine at a time across 22 columns and are genuinely
miscellaneous.

All four gaps have the same shape, which is worth naming once: **each column's
values enumerate the KINDS OF SOURCE the corpus held when the vocabulary was
derived, and each has since met a kind it did not have.**

## 1. `dld.multilingualProvision.assessment_language` — 27 cells, one survey

Every one of the 27 is the COST IS1406 practitioner survey (Law et al., 2020),
and all 27 carry `evidence_type: practitioner survey`. Checked: 27 of 27 on both
counts.

The survey does not report a rule. It reports a DISTRIBUTION:

    Austria    Assessment: mainstream only 77%, both 10%
    Estonia    Assessment: mainstream only 42%, mother tongue if different 33%, mother tongue only 24%

None of the five values can hold that. `required` is false everywhere.
`majority language only` glosses itself "the entry establishes no alternative",
which is false for Estonia, where 57% of respondents report assessing in the
mother tongue at least sometimes. `not stated` is false too: the entry answers,
in detail, just not as a category.

**The four entries that WERE coded are the mistake, not the 27 that were not.**
31 entries carry this survey; four have a value:

    Scotland, Wales, Northern Ireland   interpreter            (interpreters, assessment 97%)
    Belgium — French Community          majority language only (mainstream only 64%)

Their prose is the same shape as the other 27's, from the same survey, with no
extra national material — the three UK rows are the identical UK-wide n=72 block.
So the same evidence produced three different outcomes, and the cut is not
defensible: **Austria sits unset at 77% mainstream-only while Belgium is coded
`majority language only` at 64%, and Czechia sits unset at 69% interpreter-use
while Scotland is coded `interpreter` at 97%.**

Proposed: one new value meaning *reported practice, no rule* — the only evidence
is what practitioners say they do, they report a range, and no instrument
requires or forbids assessment in the child's language. It would take all 31 at
once, and the four current codings should be recoded onto it rather than left.

## 2. `dld.identificationCriteria.threshold_basis` — 10 or 11 of 15 cells

The ground is **membership of a statutory or policy list of impairment types**,
with no test, no instrument and no decision process named:

    Cape Verde   "The statutory trigger is physical or mental deficiency"
    Mauritius    "The ministry's eight-category classification has no speech or language entry"
    Seychelles   "Ten categories are set out in the Inclusive Education Policy"
    Egypt        "2018 Law Art. 12: education offered by nature and level of disability"
    Iraq         "Decree 22 of 2011 names only slow learners and visual or hearing weakness"
    Monaco       "rests on having one or more of the listed disorders"

Also Central African Republic, Dominican Republic, Morocco, Maldives, and
arguably Gabon (the UN CRPD definition).

`not stated` is wrong by its own gloss — "identification happens without
establishing on what basis" — because these entries DO establish the basis.
`administrative certification` is the near miss and is a different thing: it
requires a certificate issued outside education, which India and China have and
none of these name.

This is the misfit the `coding-pass` skill already describes in the abstract:
"a system whose ground is a listed impairment category with no decision process
is neither `clinical diagnosis` (which asserts a clinician nobody named) nor
`not stated` (which is false)". It has 10 or 11 instances.

The remaining four are separate and each wants its own look: **Sikkim** codes by
a sign count ("presence of any three listed signs indicates speech impairment"),
**Dominica** by a parent's belief ("is mentally or otherwise challenged"),
**Nepal** by functional limitation ("difficulty in daily activities and social
participation"), **Comoros** by marginalisation and vulnerability rather than
impairment type at all.

## 3. `dld.workforce.headcount` — 9 cells, and the column is about sourcing

`headcount` does not hold a number. Its values are `register or licence count` /
`survey estimate` / `none reported` / `not stated` — it records WHERE the count
came from. All nine unsets give a count from a third kind of place: **the
employing service's own staffing record.**

    Northern Ireland  "701 speech and language therapists in HSC posts at the 31 March 2025 census"
    Faroe Islands     "Eight staff carry the title taliráðgevi on Sernám's own staff list"
    Isle of Man       "The service page says it currently has 10 therapists and 1 assistant"
    Chandigarh        "Its clinic staff list names five speech therapists, page updated August 2026"
    New South Wales   "788 headcount in the NSW Health speech pathology workforce in 2021, public sector only"

Also Scotland, Gibraltar.

**Greece is its own case and should not be folded in.** Its entry says outright
that the number is "Establishment posts created by N. 4823/2021, not a count of
therapists in post" — 71 posts, not 71 people. A value for *posts established in
law* is a different claim from a value for *staff on an employer's list*, and
the entry has already done the work of distinguishing them.

## 4. `dld.referralPathway.trigger` — 4 of 11 cells

Four entries are triggered by a **scheduled population-wide screen**: nobody
raises a concern and no gap is shown; the child is caught by a screen that runs
on everybody.

    Karnataka  "Anganwadi children are screened twice a year, school and college children once"
    Manipur    "RBSK block teams screen preschool children at anganwadi centres twice a year"
    Shanghai   "Trigger is birth-defect monitoring and pre-marital and pre-pregnancy medical checks"
    Jiangxi    "An early reporting system for disabled children and antenatal checks are the trigger"

`reported concern` requires somebody to raise it; `performance gap` requires a
comparison; `difficulty persists after support` requires support to have been
tried. A universal screen is none of those, and it is how two of the world's
largest school systems find children.

The other seven are not one thing. **Newfoundland and Labrador** is the most
interesting: its trigger is the *type* of difficulty rather than any threshold —
"The RTL referral trigger is speech, stuttering and/or voice" and "Language is
NOT a trigger". **New South Wales** turns on a needs level ("moderate to high
needs"). **Tamil Nadu, Arkansas and Connecticut** describe who may refer, which
is `initiated_by`'s question, not this one.

## The tail, and what it looks like

83 cells over 22 columns, none more than nine. Two shapes recur and neither is a
missing value:

- **A column that should be a LIST and is not.** `bilingualEducationNotes.for_whom`
  has nine unsets; Sweden names Finnish (a settled minority language) and Arabic
  (a migrant one) in one entry, and Goa names five media at once. The column
  takes one value.
- **A column with no subject.** Scotland's `for_whom` is unset because its
  `provision` is `none established` — there is no population because there is no
  programme. That is an answer, and it is the `NOTHING-HERE-VALUES.md` problem
  reappearing on a column nobody had listed.

`indigenous.revitalisation.activity` (7) is a genuine list-of-activities gap:
Jharkhand, Sikkim and Vermont all run the language as a **university degree**,
which is neither `teaching in school` nor `teacher training`; Prince Edward
Island's is **place-name signage** ("Over 40 heritage road signs have been raised
to carry Mi'kmaw place names"); Indiana's is **community classes outside school**.

## What this says about the four gaps together

Each of the four columns was derived from a corpus that held policy documents and
clinical descriptions. Each has since met a source of a kind that was not in that
corpus — a practitioner survey, a statutory category list, an employer's staff
page, a universal screening programme — and had nowhere to put it.

That is not a coding backlog and it is not a failure of the vocabularies. It is
what the `derive-vocabulary` skill means by reading the corpus rather than
proposing a scheme: the corpus grew, and four columns are now one value short
each. Adding the four would close 53 of 136 cells and, in the
`assessment_language` case, correct four codings that are currently wrong.
