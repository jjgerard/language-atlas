# Wave: `dld.outcomesEvidence` across Europe

48 European national units hold nothing in this field. That zero is not an
accident of effort: the European half of the dld corpus was built from an
academic source family — COST Action LITMUS, bi-sli.org, DOI-linked papers —
plus national statute registers. Those sources discuss assessment and
diagnosis. They never discuss whether a country monitors how these children do.
Of 54 African national entries, 53 cite UNESCO GEM PEER profiles; of 48
European entries, ZERO do.

**So the answers are not in the sources already on the entries.** Do not go
back to bi-sli.org or to the statute register. Go to the source types the
European corpus lacks.

## What the field asks

`dld.outcomesEvidence`, from `src/domains.js`, in this order, omitting any you
cannot answer:

> what was measured · by whom and when · what it found · whether it is repeated

The coded scheme in `src/coding.js` (columns `evidence_found`, `reporting`,
`data_verdict`, `scope`) shows what the field is for. It is, in practice, a
question about ABSENCE: does any apparatus exist that could ever produce an
answer about this population, and is this population visible in it?

Across all 66 entries that currently hold this field, **not one calls its data
adequate**. If a European system does, that is a genuine first and worth saying
plainly. If the honest answer is that no regular reporting separates these
children, say that — a documented absence answers the field and is complete.

## The source recipe that works

Established by reconnaissance before this wave was dispatched.

**1. European Agency for Special Needs and Inclusive Education (EASIE).**
29 of the 48 have a country page. Two URLs each, both plain 200 HTML, both
gate cleanly:

- `https://www.european-agency.org/data/<slug>/background-info`
- `https://www.european-agency.org/data/<slug>/datatable-overview`

The background-info page carries, per country: the national definition of an
official SEN decision, the national CATEGORY list (Austria's names "Speech
impairment"; Malta's names "Speech pathologist"), who sits on the deciding
team, and — for AT, FR, DE, LT, PT, SK, ES, SE — a **Miscellaneous** section
where the country's own nominated data expert states what is wrong with the
statistics. Austria's, verbatim: "There are problems with the statistical
evaluation: by law, all learners' data must be anonymised." That is a
`data_verdict` in the country's own words and it is exactly what this field
wants.

The datatable-overview page carries the figures themselves and names the
national statistical source the return was drawn from.

Slugs: austria, bulgaria, croatia, cyprus, czech-republic, denmark, estonia,
finland, france, germany, greece, hungary, iceland, ireland, italy, latvia,
lithuania, luxembourg, malta, netherlands, norway, poland, portugal, serbia,
slovakia, slovenia, spain, sweden, switzerland.

NOT on EASIE (returns an empty shell): Albania, Andorra, Belarus, Bosnia and
Herzegovina, Faroe Islands, Gibraltar, Guernsey, Isle of Man, Jersey,
Liechtenstein, Monaco, Moldova, Montenegro, North Macedonia, Romania, Russia,
San Marino, Ukraine, Vatican City. These 19 need national sources or the third
state.

**2. National SEN or special-education statistics.** This is where a country
that DOES separate the population will show it. Germany's KMK publishes
"Sonderpädagogische Förderung in Schulen" yearly with a *Förderschwerpunkt
Sprache* count; Czechia and Slovakia publish school statistical yearbooks with
a speech-impairment category; the Netherlands has cluster-2 reporting. Look for
the ministry's or the statistics office's annual education statistics.

**3. National inspectorate and audit reports.** Inspectorate of Education
(NL), Skolinspektionen (SE), Utdanningsdirektoratet (NO), national audit
offices. These are where a verdict on the data's adequacy gets written down.

**4. Eurydice national descriptions**, for the structure of provision and for
what is monitored. Note the standing finding in `research/BLOCKED.md`: Eurydice
answers 200 throughout but bolds words mid-sentence, so pick a quote span that
is contiguous in the raw bytes — usually shorter than the sentence you want.

## The content rules, which are not negotiable

- **Never generate policy content for a place from inference.** A stub is more
  honest than a plausible guess. Every claim must trace to a source URL you
  retrieved in this session and quoted.
- **Assessment instruments may be named and linked, never reproduced.** No
  norms, items, scoring tables or cut-off values.
- **A citation with no match stays plain text.** Never invent a DOI.
- **Keep the hedges.** A qualifier that would mislead if dropped stays in the
  bullet it qualifies.
- **Looking and finding nothing is a finding**, written as the exact phrase
  `Not established from the sources consulted` — the applier refuses anything
  else.

One more, specific to this field: **do not let an EASIE frame become
boilerplate.** Four bullets that are word-for-word the same in 29 countries
measure this atlas's sourcing, not the school systems. Every unit must carry at
least one bullet that is about THAT country: its own category list, its own
named national data source, its own stated data problem, or its own national
report. If a unit has nothing country-specific, it is better as the third
state.

## Output shape

One JSON file per drafter, `done-NN.json`, in this directory. Keyed
`CC|UnitName` exactly as the worklist gives it.

```json
{
  "AT|Austria": {
    "fields": {
      "outcomesEvidence": [
        "bullet, 96 characters or fewer, no full stop or semicolon at the end",
        "second bullet"
      ]
    },
    "slots": { "outcomesEvidence": [1, 3] },
    "evidence": [
      { "bullet": "bullet, 96 characters ...", "url": "https://...",
        "quote": "verbatim contiguous run from that page" }
    ],
    "sources": [ { "label": "...", "url": "https://..." } ]
  }
}
```

For the third state, instead of `fields`:

```json
{
  "VA|Vatican City": {
    "notEstablished": {
      "outcomesEvidence": "Not established from the sources consulted for this entry — <what was searched and what was not there>. If you work in this system, this is exactly the field to fill in."
    },
    "sources": [ ... ]
  }
}
```

Rules the applier enforces and that will drop your work if broken:

- at most 5 bullets per field; each at most **96 characters**
- no trailing `.` or `;` (a dotted abbreviation like `B.Ed.` is allowed)
- one `slots` integer PER BULLET, in bullet order, non-decreasing, naming which
  of the four questions that bullet answers (1 what was measured, 2 by whom and
  when, 3 what it found, 4 whether it is repeated)
- every bullet needs an `evidence` entry whose `bullet` matches it EXACTLY
- the quote must be a verbatim run present on the page at `url`. The gate
  fetches the page and looks for it. Loose on whitespace, case, quotation marks
  and accents; strict on words. Pick a SHORT contiguous run — mid-sentence
  `<strong>` tags and PDF column wrapping are what breaks quotes here.
- the not-established prose must open with the sentinel phrase exactly.

## Gate and apply

```bash
node research/tools/terr-verify.js research/pending/dld-outcomes-europe
node research/tools/terr-apply.js dld research/pending/dld-outcomes-europe/verified.json research/pending/dld-outcomes-europe
node research/tools/terr-apply.js dld research/pending/dld-outcomes-europe/verified.json research/pending/dld-outcomes-europe --write
```

Delete this directory once the work is applied. It is a staging area, not an
archive.
