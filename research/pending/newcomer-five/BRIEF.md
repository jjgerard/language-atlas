# eal.newcomerCriteria — the five units behind two gap rows

Opened 2026-09-27. These five came out of reading every unit behind the map
key's gap rows on `eal.newcomerCriteria`, not from a coverage scan. Fifteen
units sat in three rows; twelve of them turn out to need a DECISION or a
different state, and these five are the ones that need research.

The field's four questions, in order, are its slots:

    1 who counts as a newcomer or second-language pupil
    2 on what evidence
    3 at what point it is decided
    4 who decides

## Two different jobs

**Sentinel upgrades** — Brunei, Uzbekistan, Angola hold
`Not established from the sources consulted. ...` These are FILLS. If a
designation is found the sentinel is replaced outright.

**Depth passes** — Portugal, Romania hold real prose that never reaches the
question. Their bullets are ADDED and nothing existing is touched.

## Per unit, what is already known — do not redo it

- **BN Brunei** — the entry's ONLY source is the OECD PISA 2022 catalogue page,
  which carries no table and 0 hits for `immigrant`. So nobody has looked at a
  Brunei document yet. Start at the Ministry of Education (`moe.gov.bn`) and the
  Education Order; Brunei runs a bilingual (Dwibahasa) system, so the question
  is whether any pupil category exists for arrivals with neither Malay nor
  English, which is NOT the same as the bilingual policy itself.
- **UZ Uzbekistan** — PP-1875 searched, 0 hits for `newcomer` / `second
  language`. That resolution is about FOREIGN language learning, a different
  question. Look for the schooling regime for foreign citizens and for pupils
  entering Uzbek-medium schools from Russian-medium ones. `lex.uz` works.
- **AO Angola** — the strongest lead in the set and it is explicit: Lei 17/16
  leaves "the regime of access to and attendance at schools by foreign citizens
  to be defined in a separate instrument that the law does not name." FIND THAT
  INSTRUMENT. A decreto presidencial or decreto executivo, likely on
  `lex.ao` / Diário da República. The UNICEF 2016 study is already read in full.
- **PT Portugal** — the entry's own docLinks ALREADY hold the answer and nobody
  has mined them: `plnmdoc_orientador.pdf` (Português Língua Não Materna in the
  national curriculum) and `faq_plnm_set2025.pdf` Q9 on how a pupil moves
  between proficiency levels. PLNM IS the designation. Expect all four slots.
- **RO Romania** — OUG 194/2002 on the regime for foreigners is cited with only
  a portal URL; resolve it to the article on schooling. Meehan et al. §4.2/§5.2
  is already read and says targeted top-level measures do not occur, so do NOT
  spend fetches re-establishing that. If the only finding is that foreign
  pupils are placed by a school inspectorate commission, that is slot 3 and 4
  and is worth having.

## Rules

- **Never write a negative.** The typed absence sentinel is frozen. Where there
  is no designation, look for what stands in its place and write that as a
  positive; if nothing stands in its place, return the unit EMPTY and say so.
- Every bullet needs an `evidence` entry whose `quote` is verbatim on the page
  at `url`. The gate fetches and checks. A bullet without one is dropped.
- Bullets are under 96 characters and do NOT end in sentence punctuation.
- New sources go under **`sources`**, not `docLinks` — the gate drops anything
  else silently, and five sources vanished that way once already.
- PEER is at `www.unesco.org/gem-report/en/peer` and **needs curl, not
  WebFetch**. `ohchr.org` 403s. See `research/DISCHARGE-WAVE.md` for the table.

## Output

`done-<unit>.json`, keyed `CC|Unit Name`:

    { "PT|Portugal": {
        "fields": { "newcomerCriteria": ["bullet", "bullet"] },
        "slots":  { "newcomerCriteria": [1, 3] },
        "evidence": [{ "bullet": "...", "url": "...", "quote": "..." }],
        "sources": [{ "label": "...", "url": "..." }] } }

## State

- [ ] drafted
- [ ] gated: `node research/tools/terr-verify.js research/pending/newcomer-five`
- [ ] sentinel upgrades applied with `fl/apply.js`
- [ ] depth passes applied with `deepen-apply.js eal <verified> research/pending/newcomer-five --write`
- [ ] coded with `coding-pass`, and the key's counts re-read
