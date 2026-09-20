# Context rules!, replicated and tested against this atlas

Meehan, de Almeida, Bäckström, Borg-Axisa, Friant, Johannessen and Roman (2021),
*Context rules! Top-level education policies for newly arrived migrant students
across six European countries*, International Journal of Educational Research
Open 2, 100046. Belgium (French Community), Ireland, Malta, Norway, Portugal and
Romania, read against the European Commission's 2013 four-dimensional framework.

Two questions here. Can the atlas populate the framework? And does the paper's
central finding survive being asked of more than six countries?

## 1. The framework, against the fields

The framework has four thematic areas with two sample indicators each. Mapping
them onto `eal` is a reading, not a measurement, and is set out so it can be
argued with:

| EC indicator | Atlas field | Verdict |
|---|---|---|
| Teaching the language of instruction, integrated and separate models | `l2Support` | **covered** — the field's own hint asks where support happens, in the ordinary class, by withdrawal or separately |
| Training teachers to teach the host language as L2 | `l2Support`, slot 4 | **partly** — the fourth declared question is the teacher's qualification, which is adjacent but not the same as training provision |
| Induction programmes | `l2Support` | **partly** — recorded where it exists, with no field that would make its absence visible |
| Targeted support: quotas, scholarships, grants | — | **not covered** |
| Publications on the school system in immigrants' mother tongue | — | **not covered** |
| Information through various communication channels | — | **not covered** |
| Teacher training for diversity | — | **not covered** |
| Integrating cultural diversity in the curriculum | — | **not covered** |

**The atlas answers one and a half of eight indicators.** Dimension 1 is well
covered, dimension 2 partly, and dimensions 3 and 4 — parental involvement and
intercultural education — have no field at all. That is the first result of
testing the framework here, and it is about the atlas rather than about the
framework: these maps were built around what a system requires and who it
applies to, and the two dimensions they miss are both about what a system offers
families rather than what it obliges schools.

Field coverage is otherwise even enough to compare across regions, which matters
for what follows:

```
region        n   l2Support   l1Support   bilingualEd   newcomerCrit   removalCrit
Africa       54    51 (94%)   54 (100%)     52 (96%)      49 (91%)        0 (0%)
Americas     40    37 (93%)    37 (93%)     37 (93%)      37 (93%)       4 (10%)
Asia         48    42 (88%)    43 (90%)     43 (90%)      45 (94%)       6 (13%)
Europe       48    42 (88%)    42 (88%)     42 (88%)      43 (90%)      30 (63%)
Oceania      20    17 (85%)    16 (80%)     17 (85%)      17 (85%)       6 (30%)
```

`removalCriteria` is the exception and the reason the test below uses entry-side
columns only.

## 2. Homogenisation, replicated on 64 systems

The paper's finding is a paradox: policy is shaped by national context AND
converging at a European level. The convergence half is a claim about
similarity, and similarity is measurable here in a way six countries cannot
support.

`research/tools/ec-homogeneity.js` scores each pair of national systems on the
share of shared coded columns where they share at least one value, over the four
`newcomerCriteria` columns, requiring three shared columns per pair. The null
shuffles which systems carry a region label, so it asks whether THESE systems
are alike rather than whether the region has an unusual number of them.

```
region        n  pairs   within   p(by chance)
Africa        5    10    0.292         0.949
Americas      4     6    0.250         0.964
Asia         19   171    0.437         0.772
Europe       32   496    0.567         0.0015
Oceania       4     6    0.833         0.012
```

**Europe is more internally alike than chance, and no other large region is.**
Asia, at 19 systems, sits at p = 0.77. The paper's claim survives being asked of
32 European systems instead of six, on a measure it did not use.

### The check that mattered

`decided_by` reads `not stated` on 56% of European systems, so the obvious
objection is that European systems match on shared silence and thin
documentation is being read as convergence. Dropping `not stated` as a matching
value makes the result **stronger**, not weaker: within-Europe similarity goes
0.567 to 0.668 and p goes 0.0015 to 0.0010. The silence was diluting the signal,
not producing it.

Dropping the modal `rule_locus` value as well takes p to 0.088 — but it also
takes the corpus from 64 systems to 31, because removing a near-universal value
pushes most systems under the three-column floor. That is a loss of power more
than a loss of signal, and it is reported here rather than quoted as a refutation.

### What this does not establish

**Oceania scores higher than Europe** — 0.833, and 1.000 once silence is dropped
— on four systems and six pairs. It is not a finding; it is what four systems
look like. The same goes for Africa at five and the Americas at four. Only Europe
and Asia carry enough systems to distinguish similarity from small numbers, and
of those two only Europe is unusual.

**The vocabulary was derived from a European-leaning corpus.** `src/coding.js`
records this about its own early passes. If the values were built to describe
European systems, European systems may fit them more neatly, and nothing
measurable from inside the atlas separates that from real convergence. It is the
one confound here that cannot be tested away, and it should be stated whenever
this result is.

**Similarity is not the paper's mechanism.** The paper attributes convergence to
EC recommendation and shared European policy coordination. This measures that
the similarity exists, not that those produced it.
