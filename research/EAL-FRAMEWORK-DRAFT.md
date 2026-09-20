# A framework for eal provision, derived from the entries

A draft, for the maintainer to rule on. Nothing here is wired into
`src/coding.js`; the vocabulary is her call and this is the argument for one.

## Why not the imported frame

The European Commission's four-dimensional framework, and this atlas's own
`newcomerCriteria` vocabulary, both assume the learner is a newly arrived
migrant. The corpus does not.

```
  national eal entries                                          210
  with a DOCUMENTED ABSENCE of any newcomer category            117
    of those, still carrying l2Support content                  115
    of those, still carrying l1Support content                  117
  carrying a newcomer designation coding                         61
  carrying l2Support content                                    189
```

**For 115 systems the provision exists and the newcomer frame does not describe
it.** The absence is regionally lopsided — Africa 43, Americas 28, Asia 24,
Oceania 12, Europe 8 — so the imported frame works where it was written and
fails everywhere else. Two thirds of the corpus is currently legible only as
prose.

## What varies, read off 44 l2Support and 30 l1Support entries

Sampled eight or so per region, because the first forty entries of any map are
disproportionately European.

### Axis 1 — who the provision is for

The most repeated sentence in the corpus is some version of *this exists, but
not for newcomers*. It is stated outright, again and again, by entries that had
no scheme to say it in:

- **Croatia**: "Minority-language mother-tongue instruction exists, but is
  framed around national minorities"
- **Latvia**: "a minority reform, not newcomer policy"
- **Canada**: "covers English or French minorities, not immigrant or Indigenous
  home languages"
- **Georgia**: "Right runs to citizens whose native language is not Georgian,
  not to arrivals"
- **Brazil**, **Chile**, **Mexico**: an indigenous bilingual framework, and
  "neither is a newcomer or migrant route"
- **Romania**: "Not aimed at newly arrived pupils"
- **Ukraine**: "Ukrainian is the state language of the educational process, so
  this is not an EAL system"

Candidate values, as a LIST, because a system can serve several:
`newly arrived migrants` · `national or historic minorities` ·
`speakers of a local vernacular or creole` (Dominica, Trinidad and Tobago
"distinguish Creole and Standard English phonology and syntax", Jamaica, Haiti,
South Africa) · `indigenous-language speakers` (Venezuela, Cambodia's MLE where
"Khmer is explicitly the L2", Ecuador) · `most pupils, because the medium is
nobody's first language` (Maldives "English is the medium throughout primary and
secondary", Angola, Malawi "English is the medium from Standard 5", Seychelles).

This axis is absent from the EC framework entirely, and it is the dominant
variation outside Europe.

### Axis 2 — what carries the provision

- `dedicated service`: Denmark's *Dansk som andetsprog* under Folkeskole Act
  § 5(6); Greece's ZEP I and II; Israel's allocated Hebrew hours; the
  Netherlands' funded Dutch hours; Greenland's tailored Greenlandic
- `the medium-of-instruction rule itself`: **Timor-Leste** says it outright —
  "No separate second-language service; support is the medium-of-instruction
  rule itself" — and Seychelles, Fiji and the Marshall Islands are the same
  shape
- `general disadvantage provision, not language-specific`: Belgium's
  educational priority policy, which "does not target variables referring to
  nationality, language spoken at home or immigrant background"
- `emergency or project measure`: San Marino, whose one documented scheme is
  "a 2022 emergency plan, not a standing entitlement"
- `non-state`: Haiti, where support "comes from NGO literacy projects, not a
  state programme"
- `none found`

The third and fourth values matter because both currently read as provision
when counted, and neither is a standing language service.

### Axis 3 — how strongly it binds

An ordinal, and `dld.obliges` is the precedent for one — including its warning
that turning it into an averageable number is a separate decision made
elsewhere.

- `entitlement`: Norway, "entitled to mother-tongue instruction"; Taiwan, where
  whatever language a pupil picks "the school must open a class for it"
- `permission`: Portugal, where schools "may propose" home-language programmes;
  Saudi Arabia, where private schools "may use a language other than Arabic"
- `aspiration`: Czechia, "to support study of the mother tongue and culture *if
  possible*" — "limited and aspirational"; Vietnam, where minorities are
  "encouraged, not entitled"; Mauritania, subject "to local context and to
  preserving social cohesion"

### Axis 4 — whether an amount is fixed

Quantified in a minority and worth counting, because it separates a named
programme from a funded one: Israel "no fewer than six weekly hours per pupil,
scaled by age group and years since arrival"; the Netherlands "a minimum of 10
hours a week"; Denmark "15 or 30 h/week"; Greece's DYEP "Greek 6 h, English 4 h,
maths 3 h"; Lebanon "seven hours per week"; Cambodia "20 minutes of oral Khmer
every day". Most entries state no quantity at all.

## One thing I would not make an axis

Several entries record a gap between policy and practice — Nepal, "practice
diverges sharply from policy"; Malawi, a "lukewarm, back-seat approach" to its
own directive; Papua New Guinea, where the 1975 Constitution and the 2012
English-only announcement conflict; Haiti, a "contradiction on record". That is
a real recurring observation, but it is a property of the EVIDENCE rather than
of the provision, and coding it would put a judgement about sources in a column
about systems. It belongs as a flag beside the entry, if anywhere.

## What this would cost

Axes 1 and 2 are answerable from `l2Support` and `l1Support` as they stand, on
something near the 189 entries that carry content — roughly three times what the
newcomer vocabulary reaches. Axis 3 needs a careful read of modal verbs and will
produce `not stated` often. Axis 4 is nearly mechanical.

Before any of it is wired in, the grain question from the `coding-pass` skill
applies: one row here is one system, which storage can hold. And the existing 61
`newcomerCriteria` codings do not move — this frame sits beside that one rather
than replacing it, because "who is designated a newcomer" stays a real question
for the systems that designate one.

## How this compares with the coding already in the file

They answer different questions, and the difference is clean enough to state in
a line. **The existing schemes describe the CATEGORY; this draft describes the
PROVISION.** `newcomerCriteria` and `removalCriteria` ask who is designated, by
what test, who decides and how they leave. Axes 1, 2 and 4 here ask what exists,
for whom, carried by what, and how much of it.

### Reach

```
  eal.newcomerCriteria      coded on  66 national systems
  eal.removalCriteria       coded on  43
  dld.identificationCriteria coded on 193
  dld.dischargeCriteria     coded on  49
  this draft, axes 1, 2, 4   would reach ~189 (the l2Support/l1Support content)
```

### What each spends its capacity on

Across the four system-grained schemes, 632 of 1562 coded values — **40%** —
record that the entry does not answer:

```
  dld.identificationCriteria.bilingual_handling   193 values   97% silent
  dld.identificationCriteria.exclusions           200         90%
  eal.newcomerCriteria.decided_by                  64         55%
  dld.identificationCriteria.threshold_basis      179         39%
  dld.identificationCriteria.decider              192         38%
  eal.removalCriteria.decided_by                   43         37%
  eal.removalCriteria.exit_mechanism               43         23%
  eal.newcomerCriteria.designation                 61          0%
  eal.newcomerCriteria.triggers                   117          0%
```

That is not a failure — `not stated` is somebody having read the entry and found
no answer, which is the distinction this project keeps everywhere. But it does
locate the strain. The **who-decides** columns run 35 to 55% silent, because an
entry can describe a rule at length without naming who applies it.

And `designation` and `triggers` sit at **0%** for a reason worth seeing clearly:
a system with no category carries an absence flag instead of a coding, so those
columns never have to say `not stated`. The vocabulary is clean because it only
speaks where the frame fits. The 117 systems it does not reach are not silence
inside the column; they are outside it.

### The one place they collide, and it is already documented

`rule_locus` carries `national, non-binding` — a value about how hard a rule
BINDS, on an axis about WHERE it is made. `src/coding.js` says so about itself:
the axis “was never purely about LEVEL: `national statute` says ‘binding’ as
well as ‘national’, and eight entries fell through the gap that leaves.”

Axis 3 here is that separation done properly. It is not a new idea; it is the
fix for a tension the file records and worked around by adding a value to the
wrong axis. Three eal systems and eight dld ones currently sit on it.

### Where this draft is weaker

Axis 3 will be heavily `not stated`. Modal strength has to be read off verbs
that are often simply absent, and the existing who-decides columns already show
what that looks like at 35 to 55%. If it lands worse than those, the axis is
wrong rather than incomplete.

Axis 1 partly duplicates `triggers` for the 61 systems that carry both — a
system triggered by `immigration status` is serving newly arrived migrants, and
the new column would say so again. The duplication is the price of a column that
also speaks for the 115 systems `triggers` cannot reach, and it is worth naming
rather than discovering later.

Nothing here replaces anything. “Who counts as a newcomer” stays a real question
for the systems that designate one; this frame sits beside it and answers for
the ones that do not.
