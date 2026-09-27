# eal.newcomerCriteria — the fourteen nobody has ever looked at

Opened 2026-09-27. The map key's "Not looked up yet" row on this field reads
88, and that number is misleading: **74 of the 88 are the sub-national tier**
of countries already coded — 16 German Länder, 17 Spanish autonomous
communities, 31 Chinese provinces. Germany and Spain are both coded `national
framework, sub-national rules`, which says the operative rules are exactly
there, so filling them is a deliberate and much larger job than this one.

The genuine never-looked list is **fourteen whole jurisdictions**, and eleven
of them are not merely blank on this field: they are **empty rows**, 0 of 9
declared fields and 0 docLinks. Nothing has ever been written about them.

    AW Aruba            CW Curacao         SX Sint Maarten
    NC New Caledonia    PF French Polynesia   WF Wallis and Futuna
    FO Faroe Islands    GG Guernsey        GI Gibraltar
    IM Isle of Man      JE Jersey
    MA Morocco   NG Nigeria   SN Senegal      <- these three hold some prose

## Scope: ONE field

`newcomerCriteria` only. Its four questions, in order, are its slots:

    1 who counts as a newcomer or second-language pupil
    2 on what evidence
    3 at what point it is decided
    4 who decides

If a source you are already reading answers another eal field, say so in your
report — do not write it. A one-field wave that stays one field is verifiable.

## What "answered" means here, and what it does not

These are small jurisdictions with real education law, and the likeliest
finding is that the law says nothing about newcomers because the question has
never arisen at that scale. **That is a finding and it must be reported as a
number, not padded.** A batch that establishes two of five is a useful result.

**NEVER WRITE A NEGATIVE.** The typed absence sentinel is frozen by the
maintainer. Where a system has no newcomer designation:
  - look for what stands in its place and write THAT as a positive — an
    admission rule that turns on residence, an EAL support entitlement, a
    placement-by-age rule, a language-of-instruction obligation that applies to
    an arriving pupil;
  - if nothing stands in its place, return the unit with NOTHING and say so in
    your report. An empty unit is a correct result and is what the third state
    is for.

## Hosts already proven

`research/DISCHARGE-WAVE.md` carries the table from three waves. Relevant here,
all confirmed working: **`jerseylaw.je`, `desc.gov.im`, `gibraltarlaws.gov.gi`,
`logir.fo`**. UNESCO PEER has moved to `www.unesco.org/gem-report/en/peer` and
**needs curl, not WebFetch**. `ohchr.org` 403s. Check the STATUS CODE, not the
byte count — a 404 WordPress error page is 15 KB of nothing.

## Output

`done-<unit>.json`, keyed `CC|Unit Name` exactly as the data file spells it:

    { "JE|Jersey": {
        "fields": { "newcomerCriteria": ["bullet", "bullet"] },
        "slots":  { "newcomerCriteria": [1, 3] },
        "evidence": [{ "bullet": "...", "url": "...", "quote": "..." }],
        "sources": [{ "label": "...", "url": "..." }] } }

**`slots` is ONE TAG PER BULLET, parallel to the bullets array** — not the set
of questions the unit answers. Both drafters in the previous wave returned the
set, which would have mis-tagged every bullet past the fourth.

**`sources`, not `docLinks`** — the gate drops anything else silently, and
these entries have no docLinks at all, so every claim needs one.

Bullets under 96 characters, no sentence-ending punctuation, one `evidence`
entry per bullet whose `quote` is verbatim on the page at its `url`.
