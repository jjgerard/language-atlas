# dld close-out wave — seven nearly-finished fields

You are filling blank cells on the Language Atlas `dld` map (language disorder
support). This wave is a CLOSE-OUT: seven fields are each a handful of units
short of complete, and the job is to take them over the line **honestly**. The
number is not the point. A stub is a better outcome than a plausible paragraph.

Your worklist file names the units you own and, per unit, exactly which fields
are blank (`missing`). Fill only those. Everything else on the item —
`existing_*` and `docLinks` — is context: read it so you neither restate nor
contradict what the entry already says, and start from the entry's own sources,
because the instrument that answers one question usually answers the next one a
few paragraphs on.

## THE CONTENT RULES. Read these before anything else.

1. **Never write policy content for a place from inference.** No source, no
   bullet. If you cannot source a field, leave it out of your output entirely.
   A batch that breaks this is discarded whole.
2. **Assessment instruments may be NAMED and LINKED, never reproduced.** No
   items, no norms, no normative tables, no scoring rules, no cut-offs, no
   standard scores, no sensitivity/specificity figures from a manual. That an
   instrument *has* local norms is a fact about availability and is fine; what
   those norms *are* is not recordable. If you are unsure whether something is
   a fact *about* a test or a piece *of* it, leave it out and say so.
3. **A citation with no match stays plain text.** Never invent a DOI or a URL
   to make a link resolve.
4. **Keep the hedges.** "Reported", "in one region", "under development", "one
   child of their own choosing", "records that the instrument exists — not that
   any service here uses it". The qualifier stays. Never tighten it away to fit
   the character budget; drop a different clause instead.

## The seven fields and their four questions, in order

Answer the questions **in the order declared**, and **omit any you cannot
answer**. Never pad and never write a placeholder — four blank slots and four
missing ones look identical to a reader and only one of them is honest.

- **terminology** — the term itself in the local language · what the category
  covers · how it relates to DLD, whether wider, narrower or absent · where the
  term is fixed, in statute, in guidance, or in practice only
- **identificationCriteria** — who decides · what evidence is required · the
  threshold, in words and **never as scores from a commercial test** · what
  rules a child out
- **referralPathway** — who may refer · to whom · what triggers a referral ·
  what gates it, such as a wait, a threshold or an age limit
- **serviceModel** — where therapy happens · who delivers it · how much of it,
  the intensity or dosage · whether provision is tiered or universal
- **funding** — who pays · how the money reaches a child · any co-payment or
  cap · whether it is ring-fenced
- **workforce** — how many there are and when they were counted · the ratio to
  population · the qualification route · where they are and are not
- **policyHistory** — dated changes: the act, guidance or funding decision,
  one per row. **This one is different — see below.**

## policyHistory is a TYPED field, not prose

It holds ROWS, not bullets. Never write it under `fields`.

```json
"history": [
  { "year": 1996, "description": "Special Educational Needs Act creates a statutory duty to assess",
    "evidenceKey": "1996 SEN Act" }
]
```

- `year` is an integer; `description` is one dated change, in plain prose.
- Put the matching `evidence` entry under the key you give in `evidenceKey`.
- **Do NOT write a not-established note for policyHistory.** A typed field
  cannot hold the sentinel phrase, and the typed-absence flag is frozen
  pending a decision upstream. If you cannot source dated rows for a unit,
  simply omit the field. Saying nothing is correct here.

## An absence is a result — for the six PROSE fields only

Where your sources positively establish that a thing does not exist or is not
recorded, that is the finding, and it is worth more than a blank. Two ways to
write it:

**(a) Documented absence as bullets** — you can quote the silence: you read the
education act, the SEN policy, the ministry's guidance, and can name what it
does not contain. Write bullets and set `"absences": { "<field>": true }`.

**(b) The sentinel, as free prose** — you looked and the record is simply
silent. One string, under `notEstablished`, which MUST open with the exact
phrase:

```json
"notEstablished": {
  "funding": "Not established from the sources consulted. The 2019 Inclusive Education Policy names no funding source for speech and language provision."
}
```

The applier refuses anything that does not open with
`Not established from the sources consulted`. Use `notEstablished` only where
you genuinely searched; do not use it to dispose of a unit you did not work.
Never use it for `policyHistory`.

## A NEGATIVE NEEDS TWO SOURCES

This is the rule that cost the last wave most. `research/DISCHARGE-WAVE.md`
records five `Not established` sentinels written off ONE source; three were
then checked against national legislation and all three turned out to have the
rule. Three in three.

So: before you assert that a country has no referral pathway, no funding line,
no term, check a second independent document — the statute as well as the
policy, the ministry as well as UNESCO. If you have only one source saying
nothing, **park it**: leave the field out of your output and say so in your
report, so it goes into the searched-and-empty ledger rather than into the map
as a claim.

## Fetching — what works and what does not

- **UNESCO PEER has moved.** `education-profiles.org` now redirects to
  `www.unesco.org/gem-report/en/peer` behind an archive banner. The old pages
  still carry their content and still gate at 200, so citing them is fine —
  but **WebFetch's extractor returns "no content" on PEER pages.** Fetch them
  with `curl -sSL --compressed` through Bash and strip the tags yourself.
- Some **Caribbean PEER URLs resolve to the wrong country's boilerplate** (the
  Saint Vincent one serves Colombia). Check the page names the country you
  think it does before you quote it.
- **`ohchr.org` returns 403 to every fetch.** CERD and CRPD releases cannot be
  quote-checked there. Find a mirror (`docstore.ohchr.org` sometimes, or the
  treaty body's PDF on `tbinternet.ohchr.org`) or do not cite them.
- **WebFetch cannot read a PDF** — it saves the binary. Extract text with the
  project's own extractor, which is what the gate uses:
  `node -e "const{pdfText}=require('./research/tools/pdftext');..."` after
  downloading with curl, or just `curl ... | node`-pipe it. If you cannot get
  text out of it, the gate cannot either, so do not cite it.
- `gov.im` and some other registers hand Node a 269-byte "Request Rejected"
  page at HTTP 200 and hand curl the real thing. The gate already retries with
  curl, so do not avoid those hosts on that account.

## Bullet rules — these are enforced and a batch fails on them

- At most **5 bullets** per field; each at most **96 characters**
- No trailing `.` or `;` (a dotted abbreviation such as `B.Ed.` is fine)
- Never split one sentence across two bullets; each bullet is a complete claim
- Cite inside the bullet, in a terse parenthesis, e.g. `(Education Act 2004 s.9)`
- The bullet carries the content only, never the name of the slot
- A qualifier that would mislead if dropped belongs **inside** the bullet it
  qualifies. Only a whole-field qualifier takes a fifth line, at the top.

## Slots — ONE INTEGER PER BULLET

`"slots": { "funding": [1, 1, 3] }` — one number per BULLET, not one per field,
each 1–4, non-decreasing, matching which of the four questions that bullet
answers. Three bullets need three numbers. A wrong count is silently dropped.

## Evidence — how the gate works, and how to not lose good work

Every bullet and every history row needs an `evidence` entry: the URL you
fetched and a VERBATIM quote from it. A gate (`terr-verify.js`) re-fetches each
URL with Node and curl and searches for the quote. A bullet whose quote is not
on the page is dropped. A bullet with no evidence entry is dropped.

The gate is **not a browser**. It does not run JavaScript. So:

- **Prefer plain HTML pages and PDFs.** A quote that only exists after a JS
  render will fail the gate even though you saw it.
- **Quote what is in the document, not what a reader-mode summary showed you.**
  Do not paraphrase inside the quote, do not stitch two sentences together, do
  not fix the source's typos, do not normalise its punctuation.
- Quote length: **10–25 words** for spaced scripts; **7–25 words** for Arabic
  and Hebrew; **16–200 characters** for CJK/Thai/Lao/Khmer/Burmese.
- Avoid quoting across a table cell, a line break, a footnote marker or a
  page break — extraction mangles all of those.
- Google cache, Google Books, JSTOR landing pages, ResearchGate, Scribd and
  anything behind Cloudflare interstitials are bad bets. Prefer the ministry,
  the legislature's own register, UNESCO PEER, UNICEF, WHO, a journal's own
  HTML or PDF, a national association's site.
- The gate handles gzip, PDFs, latin-1, Cyrillic, Greek, Arabic and CJK. It
  cannot handle an image-only scan with no text layer — if the PDF is a scan,
  the quote is unverifiable, so do not use it.

## Output format

Write ONE JSON file to the output path you were given. Include a key ONLY for
units where you wrote something.

```json
{
  "IM|Isle of Man": {
    "fields": {
      "serviceModel": [
        "Therapy is delivered by Manx Care's SLT service in clinics and in schools",
        "Referrals are open to parents as well as to professionals"
      ]
    },
    "slots": { "serviceModel": [1, 2] },
    "absences": { "serviceModel": false },
    "notEstablished": {
      "funding": "Not established from the sources consulted. ..."
    },
    "history": [
      { "year": 2001, "description": "...", "evidenceKey": "2001 Education Act" }
    ],
    "evidence": [
      { "bullet": "Therapy is delivered by Manx Care's SLT service in clinics and in schools",
        "url": "https://...", "quote": "verbatim words from that page" },
      { "bullet": "2001 Education Act",
        "url": "https://...", "quote": "verbatim words from that page" }
    ],
    "sources": [
      { "label": "Name the actual document, with its number and year", "url": "https://..." }
    ]
  }
}
```

- `sources` become `docLinks` on the entry. Name the real document, not "gov
  website". Every claim must trace to a docLinks entry on that same entry, so
  every URL you cite in evidence should appear here too.
- Omit `absences` unless a field's bullets genuinely assert a documented
  absence. `false` entries are pointless — just leave the key out.

## Report back

In your final message, not in a file:

- which units and fields you filled, and which you could not, with the reason
- which units you searched and found genuinely nothing for — these go into
  `research/SEARCHED-EMPTY.json` so the next wave is not sent to find the same
  nothing, so be specific about *what you read* and what it did not contain
- any source host that failed repeatedly, moved, or is gated (worth more than
  the units it cost)
- anything you left out because of a content rule
- any bullet you wanted to write that answered a question the field does not
  ask — that is evidence about the FIELD, not the entry
