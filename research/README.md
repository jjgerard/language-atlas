# The research record

Every entry on the four maps was written from documents someone read. This is
that reading, kept so a claim can be traced back past the entry to the sentence
it came from.

It lived in a Windows temp directory for most of its life, which meant one
cleared folder would have taken the lot. It is here now because the provenance
of 5,000-odd field values should not be more fragile than the values.

## `parts/` — 939 evidence files, one per unit per harvest

Each is the working note behind an entry: the sources tried and their HTTP
status, verbatim quotes with the file they came from, and the draft bullets
that became the entry text. Roughly:

```
### FR|France
STATUS: documented
SOURCES:
 - label: ...
   url: ...
   http: 200
EVIDENCE:
 - field: mediumOfInstruction
   quote: "..."
   source: ...
DRAFT BULLETS:
 - field: indigenous.mediumOfInstruction
   bullets:
     - ...
```

The value is in the parts the entry does not carry. A bullet says what a
system does; the file behind it says which article of which law said so, what
else was searched, what returned 404, and what the researcher decided not to
claim. Several record traps worth remembering — a UNESCO profile citing a
repealed law as current, a PDF whose table mis-rows under one extraction mode
and not another, a search engine returning Niger's curriculum as Mali's.

Filename prefixes are the harvest wave, not a taxonomy: `harvest-`, `w3-`,
`w4-`, `w5-ind-`, plus regional ones (`carib-`, `latam-`, `india-`, `cafl-`).
The unit is in the `###` header line, never in the filename — ten naming
schemes accumulated and the header is the one thing all of them share.

## `tools/` — the pipeline

- `parseparts.js` — reads a part file into fields, sources and dated rows
- `w4apply.js`, `fl/apply.js` — validate and write into `data/*.json`
- `histbuild.js` — routes dated rows to the map whose question they concern
- `w5hist.js` — merges dated rows without replacing what is there
- `wals/` — the WALS resolver: no WALS URL is ever guessed, every code comes
  from WALS's own `languages.csv`
- `check-palette.js`, `mkicon.js` and the rest of the one-off scripts

The guards in these are the accumulated scar tissue and are worth reading
before writing anything new: bullets over 96 characters, a typed field written
as prose, a not-established note counted as documented, a heading spelled three
ways by three researchers, `\b` eaten by a heredoc so `SEN` matched "present".

## What is NOT here

The cached raw sources — several hundred megabytes of retrieved HTML and PDF
under `w5src/`, `cn/`, `italy/` and about seventy other directories. Most are
re-fetchable. A few are not: hosts that have since gone dark, and pages that
403 to everything now. If those matter, they were in the session scratchpad and
would need archiving separately.

## The rule these were written under

Every claim traces to a URL retrieved in session. No DOI is ever guessed. A
citation with no match stays plain text. Assessment instruments are named and
linked, never reproduced. The hedges stay. Where a researcher looked and found
nothing, that is recorded as a finding rather than left blank — it is the
difference between a gap in the record and a gap in the world.
