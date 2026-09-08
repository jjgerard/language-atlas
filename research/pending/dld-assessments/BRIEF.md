# dld.assessments — filling the field

You are filling ONE field on the Language Atlas `dld` map (language disorder
support): `assessments`. 131 countries are blank. Every claim must come from a
source you actually fetched.

## THE CONTENT RULE. Read this before anything else.

**Assessment instruments may be NAMED and LINKED, and never reproduced.**

That means: no test items, no example items, no norms, no normative tables, no
scoring rules, no cut-off values, no standard scores, no sensitivity or
specificity figures you have taken from a manual, no subtest score ranges.

You may record: what the instrument is called, who publishes it, what it is
for, which languages it exists in, whether norms for this population exist,
whether its use is required or chosen, and what a peer-reviewed paper concludes
about it in general terms.

This is a hard rule from the project's own `CLAUDE.md` and a batch that breaks
it will be discarded whole. If you are unsure whether something is a fact
*about* a test or a piece *of* it, leave it out and say so in your report.

## The four questions, in order

1. what is in routine use, named and linked but never reproduced
2. which languages it exists in
3. whether the norms are local
4. whether its use is required or chosen

Answer them in that order, omitting any you cannot answer.

## An absence is the answer

When the sources establish that no instrument is named or in routine use, that
is the finding. Write it, with the quote, and set the absence flag. Do not
leave the field blank.

The existing entries show the form:

- Antigua and Barbuda: "No instrument is named in the Act or in the 2013 SEN
  policy" / "Act refers only to 'psychological and other specialized tests',
  s.84(1)(c)"
- Ghana: "No standardised national assessment is documented" / "A
  Ghanaian-English speech and language assessment tool is under development"

That is different from "I could not find one", which is a blank. The test is
whether you can quote the silence: name the instrument you read — the education
act, the SEN policy, the ministry's assessment guidance — and say what it does
not contain.

## Two traps specific to this field

**1. An instrument existing is not an instrument being used.** Twenty-five of
the seventy filled entries are LITMUS sentence repetition tasks — a
cross-linguistic research set built for multilingual children, with versions for
many languages. A LITMUS task existing for your country's language is worth
recording and it is NOT evidence that any clinical service uses it. Every one of
those entries carries the line "Records that the instrument exists — not that
any service here uses it", and that hedge is load-bearing. Keep it, in those
words, whenever you are recording a research instrument rather than documented
practice.

**2. An imported test is a finding, not a gap.** Where a country uses batteries
built for another population, say so and say what the source says about the
consequence. Burkina Faso is the model: "Imported European batteries are used in
extracts: ELO, L2MA, NEEL, EVALO" / "Test pictures are not necessarily familiar
to Burkinabè children of the same age" / "The source states this biases results
and can miss the diagnosis". That is one of the most informative entries in the
field. Do not flatten it to "no local test exists".

Related: an exam **access arrangement** (extra time, a reader, modified papers)
is not a language assessment. If that is all a country has, say which it is —
Belize's entry does this correctly.

## The hard rules

1. **Never write from inference.** No source, no bullet. Omit the field.
2. **Every bullet needs verbatim evidence.** Record the URL you fetched and a
   QUOTE that appears character-for-character on that page. A gate re-fetches
   every URL and searches for the quote. Do not paraphrase inside the quote, do
   not stitch two sentences together, do not fix the source's typos. Quote
   length: 10–25 words for spaced scripts, 7–25 for Arabic/Hebrew, 16–200
   characters for CJK/Thai/Lao/Khmer/Burmese.
3. **Prefer the entry's own docLinks.** The worklist hands you what the entry
   already cites, plus everything else already written on that entry — read it,
   so you neither restate nor contradict it.
4. **Keep hedges.** "Reported", "in one region", "under development", "one
   child of their own choosing" — the qualifier stays. Never tighten it away.

## Bullet rules

- At most **5 bullets** per field, each at most **96 characters**
- No trailing `.` or `;` (a dotted abbreviation is fine)
- Never split one sentence across two bullets
- Each bullet is a complete claim on its own

## Slots — ONE INTEGER PER BULLET

One number per BULLET, not one per field. Three bullets need three numbers,
each 1–4, non-decreasing.

## Where to look

- The education act and the SEN or inclusive-education policy, for whether any
  instrument is named at all and whether its use is required
- The ministry's assessment or referral guidance
- The national speech and language therapy association
- Peer-reviewed papers on assessment in that language, for what exists and
  whether norms are local
- Research consortia that publish cross-linguistic tasks, for question 2 —
  recorded with the hedge above
- UNICEF, UNESCO and World Bank country reviews, which often state plainly that
  no standardised instrument exists

## Output format

Write ONE JSON file to the output path you were given:

```json
{
  "GH|Ghana": {
    "fields": {
      "assessments": [
        "No standardised national assessment is documented",
        "A Ghanaian-English speech and language assessment tool is under development"
      ]
    },
    "slots": { "assessments": [1, 1] },
    "absences": { "assessments": true },
    "evidence": [
      { "bullet": "No standardised national assessment is documented",
        "url": "https://...", "quote": "verbatim words from that page" }
    ],
    "addDocLinks": [
      { "label": "Name the actual document, with its number and year", "url": "https://..." }
    ]
  }
}
```

- `absences` only where the field asserts that no instrument is named or in
  use. Omit it otherwise.
- Include a key ONLY for units where you wrote something.

## Report at the end

Units filled, units you found nothing for, how many of your answers are
absences, how many name a locally built instrument versus an imported one, and
anything about the sources the next wave should know. Also flag anything you
left out because of the content rule.
