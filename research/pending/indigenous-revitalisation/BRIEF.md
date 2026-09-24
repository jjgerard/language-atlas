# Fill wave — `indigenous.revitalisation`, national units

Started 2026-09-24. 154 of 396 units filled, 242 blank; 112 of those blanks are
NATIONAL units, which is what this wave targets. Worklists (entry context and
docLinks per unit) are in `wl/worklist-NN.json`.

## The question the prose must answer

`src/domains.js` declares the field's four questions, in this order:

> what is being done to reverse language shift · who runs it · since when ·
> whether it is funded, and by whom

`src/coding.js` codes the same field as `actor`, `activity`, `status`,
`funding`. Draft to the four questions. Omit any you cannot answer — never pad.

**Two things the corpus already learned:**

1. **The field is not only about indigenous languages.** Andorra's entry
   promotes Catalan, the UAE's an Arabic centre, Maharashtra's a Hindi academy.
   If a state's revitalisation activity is aimed at its own majority or official
   language, record that, rather than forcing it into an indigenous frame.
2. **The activity is often not in a school.** Existing entries cover
   universities, youth camps, Elder clubs, adult immersion, master–apprentice
   pairs, broadcasting, dictionaries, orthography standardisation, place-name
   signage, national inventories and language-planning statutes.

## Content rules — these bind absolutely

- Every claim traces to a URL **retrieved and read in this session**. Not a
  search snippet, not background knowledge.
- Quote verbatim. If you cannot quote it, you have not verified it.
- Never guess a DOI, a date, an article number or a document title.
- Keep the hedges. A source's own qualifier stays in the bullet.
- Do not infer one country's activity from a neighbour's or from a region.
- A unit you cannot source is **left out**, not filled to improve the count.
- **An absence needs two independent sources**, and "no revitalisation activity
  found" is NOT "there is none" and NOT "this country has no indigenous
  languages". Only assert what a document's silence actually establishes, and
  quote the silence.

## Bullet style

- ≤ 96 characters per bullet, counted. 4 content bullets max, plus at most one
  leading hedge bullet.
- One complete point per bullet; never split a sentence across two.
- Clipped register. No trailing `.` or `;`. Plain text only.

## Output shape

One `done-NN.json` in this directory, keyed `"CC|Unit name"` exactly as the
worklist gives it:

```json
"GA|Gabon": {
  "fields":   { "revitalisation": ["bullet one", "bullet two"] },
  "slots":    { "revitalisation": [1, 2] },
  "evidence": [
    { "bullet": "bullet one", "url": "https://…", "quote": "verbatim passage" }
  ]
}
```

- `slots` is one integer PER BULLET, in bullet order, non-decreasing: which of
  the four declared questions that bullet answers (1 what, 2 who, 3 since when,
  4 funding).
- The third state is a `notEstablished` **string**, never a bullet:
  `"notEstablished": { "revitalisation": "Not established from the sources consulted. …" }`
  — it must open with that exact sentinel phrase, and needs two sources.
- `"absences": { "revitalisation": true }` only where a read instrument's
  silence is itself the finding and every bullet asserts it.

## Gating and applying

```
node research/tools/terr-verify.js <dirWithOnlyTheNewDoneFile>
node research/tools/terr-apply.js indigenous <thatDir>/verified.json <thatDir> --write
```

The spec dir is a positional 4th argument; without it `slots` and `absences`
are silently dropped. `terr-apply` refuses the WHOLE run if any field it carries
is already written, so gate and apply batch by batch.

## Host notes carried forward (`research/BLOCKED.md`, `fill-wave-source-hosts`)

- UNESCO PEER has moved to `www.unesco.org/gem-report/en/peer`; the old
  `education-profiles.org` pages still carry content and still gate. Use curl,
  not WebFetch, on them.
- `ohchr.org` 403s any fetch — CERD releases cannot be quote-checked.
- Some hosts 403 a bare request and return 200 with a browser UA and a Google
  referer. Always probe with the brief's recipe before writing a host off.
