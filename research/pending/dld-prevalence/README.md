# dld.identifiedPrevalence — wave record

**Status: applied.** Everything in `specs/` and `specs4/` has been gated with
`terr-verify.js` and written with `terr-apply.js`. Nothing is committed; this
directory is the working record for review and can be deleted once the entries
have been read, because the record of what was done lives in the entries and in
git.

- `BRIEF.md` — what the field asks and the two distinctions the wave turned on.
- `wl/` — the worklists, by region and by sub-national country.
- `specs/` — the gated batches, with `verified.json` as the gate's output.
- `specs4/` — Spain, gated separately so the gate did not re-fetch 6MB of
  already-verified CSV and PDF.

## What moved

| | before | after |
|---|---|---|
| units with a figure or a documented absence | 35 of 396 | 113 of 396 |
| national units missing | 177 | 168 |
| sub-national units missing | 184 | 115 |

226 series rows across 77 units in the first apply, 2 more on Spain.

## What was filled, and from what

- **51 US states and DC** — IDEA Section 618 Part B child count, category
  "speech or language impairment", 2024-25 and 2014, ages 6-21 and 3-5. One
  published CSV per year answers every state at once.
- **16 German Länder** — KMK Dokumentation Nr. 249, tables B.1.1.2.3
  (Förderschulen) and B.2.1.1.3.3 (allgemeine Schulen), Förderschwerpunkt
  Sprache, 2015 and 2024. Kept as two rows per year rather than one summed
  row, because the sum is not printed in the source.
- **Ontario** — Special Education Enrolment by Exceptionality (OnSIS). The only
  collection found anywhere that separates **Language Impairment** (10,605) from
  **Speech Impairment** (395).
- **Wales** — schools' census, "Speech, language and communication difficulties",
  as a share of pupils with ALN or SEN.
- **Japan, South Korea, Netherlands, Slovenia, France, Spain** — each from its
  own ministry's SEN or special-education collection, each with a language
  category in the published breakdown.
- **Chile** — TEL as a share of Programa de Integración Escolar diagnoses, via a
  peer-reviewed study of the PIE data.
- **Oman** — 647 students in the Pronunciation and Speech Programme, from the
  UNESCO PEER inclusion profile.
- **New Zealand** — Growing Up in New Zealand cohort, `basis: survey`, because
  it measures service receipt after mother-reported concern and not what the
  system identified.

## What did not work, and is worth knowing next time

- **UNESCO PEER is exhausted for this field.** All 102 PEER inclusion profiles
  cited on still-blank dld entries were fetched and searched. Exactly one
  (Oman) carries a figure for speech or language, and none carries a new
  statement that no such count exists. The 14 documented absences already on
  the map were harvested from these same pages in an earlier pass; there is
  no second harvest to be had here. **This does NOT mean those 102 countries
  are unreachable** — it means PEER is not the place to look, so they are not
  recorded in `SEARCHED-EMPTY.json`.
- **Spreadsheets are the wall.** Scotland, Northern Ireland and Ontario all
  publish the figure; Ontario also publishes a pipe-delimited `.txt` and so
  could be gated, and the other two could not. Where a statistics office offers
  a plain-text or CSV mirror of a table, the gate can reach it; `.xlsx` and
  `.ods` cannot be quote-checked at all.
- **An all-disabilities total was refused four times** — Brazil (INEP Censo
  Escolar has no speech or language line), Australia's NCCD, Switzerland's BFS
  pupil tables, and Poland, whose SIO category is
  `niepełnosprawność ruchowa, w tym z afazją` — motor disability *including*
  aphasia. Poland is the sharpest case in the wave of why `counted` exists.

See `research/SEARCHED-EMPTY.json` under `dld.identifiedPrevalence` for the
units worked beyond PEER that came back empty.
