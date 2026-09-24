# dld.identifiedPrevalence fill wave

Filling the emptiest field on the `dld` map: 196 of 210 national units, and
310 of 396 units in all, carry no figure.

## What the field asks

`identifiedPrevalence` is a **series** field. It holds ROWS, never prose
bullets. Its declaration in `src/domains.js`:

> Rates identified by the system, by year, with the source of each figure.
> Give `unit` (count, percent, per 1,000) and `basis` (administrative count,
> survey, estimate) on every row, and `counted` in the words the source uses --
> a figure for all special educational needs is not a figure for language
> disorder, and only `counted` can say so.

### Two distinctions that must never be blurred

1. **An identification rate is not an epidemiological estimate.** The field
   asks what the SYSTEM identifies. A population study is recordable, but
   `basis` must say `estimate` and `counted` must say whose estimate it is.
   England's entry carries SCALES at 7.58% and says outright that it "is an
   epidemiological estimate, not the proportion actually identified by
   services". Australia's carries "1 in 14" flagged as "carried over from
   international prevalence work, not an Australian identification rate".
2. **A special-needs total is not a language figure.** An all-disabilities
   count does not answer this field. Angola's entry carries 28,467 SEN pupils
   and says in `counted` that "the published breakdown has no speech or
   language category". Either say that in `counted`, or do not write the row.

## Where the numbers live, in order of yield

1. National special-education / SEN administrative collections with a
   **language category in the breakdown** — Germany's Foerderschwerpunkt
   "Sprache", England's DfE primary-need "speech, language and communication
   needs", the US IDEA category "speech or language impairment".
2. The **US IDEA Part B child count**, published per state and per territory.
3. Speech and language therapy professional bodies (RCSLT, ASHA, SPA, IALP
   and national associations): caseload and workforce-activity figures.
4. Health service activity data where therapy sits in health, not education.

## An absence is a result

Where a source **positively establishes that no count exists** — not where you
merely failed to find one — that answers the field and is complete. Gabon's
last statistical collection was never published; Gambia's last disability
survey was 1988; Kiribati's census reported no incidence figures. Write it as
free prose under `notEstablished`, opening with the exact sentinel phrase
`Not established from the sources consulted.` The applier refuses anything
else. Do not use it to dispose of a unit you did not work.

## The content rules, which bind absolutely

- Never write content for a place from inference. No source, no row.
- Assessment instruments may be named and linked, never reproduced.
- A citation with no match stays plain text. Never invent a DOI.
- Keep the hedges exactly as the source states them.

## Spec format

One JSON file per batch in `specs/`, keyed `"CC|Unit Name"` exactly as the
atlas names the unit.

```json
{
  "DE|Bayern": {
    "series": {
      "identifiedPrevalence": [
        { "year": 2024, "value": "9123", "unit": "count",
          "basis": "administrative count",
          "counted": "pupils with the support focus Sprache",
          "note": "Full sentence naming the collection, the population, the year and any caveat." }
      ]
    },
    "evidence": [
      { "bullet": "2024 9123", "url": "https://...", "quote": "verbatim run of text from that page containing the figure" }
    ],
    "sources": [ { "label": "Publisher, title, table", "url": "https://..." } ]
  },
  "XX|Somewhere": {
    "notEstablished": { "identifiedPrevalence": "Not established from the sources consulted. ..." },
    "sources": [ { "label": "...", "url": "https://..." } ]
  }
}
```

- Evidence for a series row is keyed `"<year> <value>"` or by the bare value.
- `notEstablished` is passed through UNGATED, so it must be worked honestly.
- `value` is a string; `year` an integer.

## The gate

`node research/tools/terr-verify.js research/pending/dld-prevalence/specs`
fetches every evidence URL and looks for the quote. A row whose quote is not
on the page it cites is dropped. Then
`node research/tools/terr-apply.js dld research/pending/dld-prevalence/specs/verified.json --write`.

## Status

See README.md.
