# Three named leads on eal.newcomerCriteria

Opened 2026-09-27. Not a wave — three units, each with a specific document to
find, picked out by reading every unit behind the map key's gap rows rather
than by a coverage scan.

The field's four questions, in order, are its slots:

    1 who counts as a newcomer or second-language pupil
    2 on what evidence
    3 at what point it is decided
    4 who decides

## BI Burundi and YE Yemen — DEPTH: the entry describes machinery and names no instrument

Both are coded `rule_locus: not stated`, and in both cases that is honest: the
prose describes something concrete happening and never says what authorises
it. `rule_locus` asks where the rule is MADE, and its values are national
statute · national framework, sub-national rules · national rule, local
application · national, non-binding · sub-national only · institutional.

- **Burundi** — "Repatriated children in the communes with the highest
  returnee rates are the target group" and "Schools set the French and Kirundi
  activities in partnership with the communes". Something authorises a
  commune-school partnership aimed at repatriated children. Find it. The
  existing sources are on the entry; read them first, then Burundi's education
  law and any ministerial ordonnance on returnee schooling.
- **Yemen** — "In Sana'a the Ministry of Education's Control Office issues the
  admission acceptance form" and enrolment "needs valid refugee or asylum
  certificates". The existing source is UNHCR. Find what the Ministry issues
  that form under, or a UNHCR/UNICEF document that names the instrument.

These are DEPTH passes: the field already holds prose, your bullets are ADDED,
and nothing existing may be restated or contradicted.

## AO Angola — one named document, and the fill is otherwise HELD

Angola holds the third-state sentinel and it stays there unless this document
turns up. A previous pass established, and you should not redo:
  - Lei 17/16 art. 107(3) defers the regime of access to and attendance at
    schools by foreign citizens to a separate instrument the law does not name,
    and that deferral is carried unchanged into the Lei 32/20 republication;
  - Decreto Presidencial 162/23's entire enrolment chapter, arts 21 to 30,
    carries no foreign-citizen and no language provision;
  - the UNICEF 2016 language study records no such designation.

**THE LEAD: Decreto Presidencial n.º 163/25, Regulamento sobre Homologação,
Reconhecimento e Concessão de Equivalência de Estudos**, covering pre-school
through secondary. The only copy found so far is on `angolex.com`, which 403s
behind a JS interstitial ("Checking your browser", 2,482 bytes). It is not on
`lex.ao` under a guessable path. Try: the Diário da República directly, the
Imprensa Nacional, `minedu.gov.ao`, a search engine cache, and `lex.ao`'s
`/docs/presidente-da-republica/2025/` listing.

**Only write Angola bullets if that instrument, or another that actually fills
art. 107(3)'s deferral, is found and read.** Recognition-of-foreign-study
machinery on its own was already judged NOT to be a newcomer designation and
was held back once; do not re-submit it. If you cannot reach the document, say
so and return nothing for Angola — that is the expected outcome and it is
useful, because it closes a named lead.

## Rules

- Do NOT generate policy content from inference. Every claim traces to a source
  you actually fetched and read.
- **Never write a negative.** The absence sentinel is frozen.
- Bullets under 96 characters, no sentence-ending punctuation.
- One `evidence` entry per bullet, `quote` verbatim on the page at its `url`.
- **`slots` is ONE TAG PER BULLET**, parallel to the bullets array — not the
  set of questions the unit answers.
- New sources under **`sources`**, never `docLinks`.

## Output

`done-bi.json`, `done-ye.json`, `done-ao.json`, keyed `CC|Unit Name`:

    { "BI|Burundi": {
        "fields": { "newcomerCriteria": ["bullet"] },
        "slots":  { "newcomerCriteria": [4] },
        "evidence": [{ "bullet": "...", "url": "...", "quote": "..." }],
        "sources": [{ "label": "...", "url": "..." }] } }
