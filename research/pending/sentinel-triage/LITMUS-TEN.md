# The LITMUS ten are not a template, and the sentinel is the right state

`RESULT.md` calls these "the worst of it" and makes rewriting them action #1:

> The LITMUS ten are the worst of it: 447 characters that describe the FIELD —
> "whether any service, clinical guideline or funder requires, supports or
> reimburses assessment in all of a child's languages was not determined" —
> rather than record a search. Ten units carry it. That is one act of research
> reported ten times, and it is most of why `dld.multilingualProvision` looked
> like the second-largest gap in the atlas.

Checked on 2026-09-28 by reading all ten entries and their siblings. **The
characterisation is wrong on the part that matters, and the recommended action
should not be taken.**

## The research is per-unit and it is real

The ten share a sentinel sentence on `multilingualProvision`. They do not share
the research. Each one's `assessments` field names a different instrument, a
different developer and a different language:

    Albania      SRep for Albanian    Enkeleida Kapia (Academy of Albanian Studies; LMU Munich)
    Catalonia    SRep for Catalan     Anna Gavarró (UAB), published Gavarró (2017) Frontiers 8:1865
    Iran         SRep for Farsi       Komeili, Tavakoli and Marinis (Reading) with Kazemi (Isfahan)
    Malta        SRep for Maltese     Helen Grech (University of Malta) — listed as created BEFORE LITMUS
    Malaysia     SRep for Malay       Razak (UKM), Abu Bakar (USM), Lim (UKM) — trilingual population
    Palestine    SRep for Palestinian Arabic   Armon-Lotem and Saiegh-Haddad (Bar-Ilan)
    Portugal     SRep for Portuguese  Maria Lobo (Nova de Lisboa) and Liliana Correia (Minho)
    Russia       SRep for Russian     Meir and Armon-Lotem (Bar-Ilan) — strongest accuracy evidence in the set
    Saudi Arabia SRep for Saudi Arabic Mada Al Hasan and Marinis (Reading and Konstanz)
    Syria        SRep for Syrian Arabic Paradis et al. (Alberta) with Al Janaideh (Toronto) — diaspora-facing

Nine of the ten already end with the line "Records that the instrument exists —
not that any service here uses it". The separation the sentinel describes is
therefore stated on each entry, individually, with its own attribution.

## And the sentinel cannot be replaced by a fill, because its finding is a negative nobody publishes

The sentence says an instrument exists for this language and that **whether any
service, clinical guideline or funder requires, supports or reimburses
assessment in all of a child's languages was not determined.** That is the
honest third state: somebody looked and could not establish it either way.

A fill would have to assert "no service requires it", and the gate requires a
verbatim quote at a fetchable url for every bullet. **No document says that.**
The absence of a requirement is not published by anyone, which is precisely why
these are sentinels and not findings. Rewriting them into bullets would produce
ten claims nothing could check — the one thing this pipeline exists to prevent.

## What IS wrong with them, and it is small

Two things, neither worth a wave:

- **The last sentence is editorial.** "That gap between an available research
  instrument and routine clinical practice is the single most useful thing a
  contributor here could resolve" describes the field's importance rather than
  recording a search. Six other `multilingualProvision` sentinels end with the
  same appeal in different words ("If you work in this system, this is exactly
  the field to fill in").
- **The middle says nothing system-specific.** Albania and Saudi Arabia get the
  same words about what was searched. A sentinel that named the guideline or
  funder actually checked in each system would be better, but nobody now knows
  which those were, and inventing them is worse than leaving it.

## The real finding underneath: a column that cannot say "exists but unused"

Ten systems have a named, published, language-appropriate instrument built for
multilingual children, and no evidence that any service uses it.
`ASSESSMENT_LANGUAGE` cannot record that.

- `protocol or adapted instrument` asserts uptake. Its gloss is the Netherlands,
  whose Siméa *Handreiking meertaligheid en TOS* REQUIRES examination data in
  both languages with a diagnostic decision tree — a clinical protocol in force.
  Coding Albania the same way would assert exactly what its own entry denies.
- `majority language only` is false: an instrument exists in the language.
- `not stated` is false: the entry reaches the question and answers half of it.
- `reported practice, no rule`, added 2026-09-28, is about a survey reporting a
  spread of practice. These entries report no practice at all.

So the missing value is something like **`instrument exists, no uptake found`** —
a research instrument is published for the language and nothing establishes that
any service, guideline or funder uses it. It would take the ten at once, and it
is the most interesting cell in the field: the distance between what research has
built and what services do.

**It is not added here.** The maintainer approved three values earlier today on
evidence, and a fourth was withdrawn when checking showed it restated a
neighbouring column. This one should get the same test before it goes in: it is
near-collinear with "this entry's `assessments` field names a LITMUS instrument",
and whether that makes it a different question or the same one re-categorised is
the maintainer's call.

## The other six are genuine, and four are well specified

Not part of the ten, and each names what it searched:

    Australia    "no national protocol ... and none of the three funding systems appears to specify one"
    Ontario      "the provincial exceptionality definitions and IPRC materials reviewed here"
    New Zealand  "the Ministry of Education material reviewed"
    India        "no national protocol was identified", against 22 scheduled languages
    Bahamas      "the PEER inclusion profile does not use the word language at all"   <- thin
    Grenada      "nothing located on Grenadian Creole English"                        <- thin

Australia, Ontario, New Zealand and India are the researchable targets in this
field. The Bahamas and Grenada are thin and say so.
