# eal.newcomerCriteria — the last two gap rows

Opened 2026-09-27. Eight units, the whole of the map key's remaining
"Text here, not yet coded" (5) and "Looked, not found yet" (3) rows on this
field. When these are resolved the field has no gap row left that research can
move.

The field's four questions, in order, are its slots:

    1 who counts as a newcomer or second-language pupil
    2 on what evidence
    3 at what point it is decided
    4 who decides

## Group A — five entries that are a RESEARCH REQUEST written as prose

Dominican Republic, Guatemala, Panama and El Salvador carry the identical
four lines, and Palestine a variant of them:

    Unfillable: the entry cites only the OECD PISA 2022 landing page
    It resolves 200 but is a publication description, not the data annex
    Table I.B1.7.57 is reading performance data, not a policy criterion
    A national law or ministry instrument is needed before this can be written

That is not policy prose and it is not a finding about the country. It is a
note saying nobody has looked, and the last line names exactly what would
close it.

**PRECEDENT, and it is strong.** Brunei and Uzbekistan sat in the same state
with the same single PISA catalogue page as their only source, and on
2026-09-27 **both answered on the first real national instrument** — Brunei's
Education (School Admission and School Register) Regulations Rg 9, and
Uzbekistan's Cabinet of Ministers Resolution 169/2008. Nobody had searched
either country; they had only been badly sourced. Assume the same here until a
search shows otherwise.

Each of these five has a real ministry and a real body of education law.
Look for: a rule on admitting foreign or migrant pupils, a reintegration or
re-entry rule for returning nationals' children, an equivalence-of-studies
rule that fixes the grade a newly arrived pupil enters, and any rule that
turns on the pupil's language. For the four Latin American states, returnee
and deportee children are a live policy area and a rule aimed at them is a
legitimate positive answer — write it with the population it names.

## Group B — three entries where somebody DID look

These already hold the third-state sentinel, written honestly. Do not repeat
what each one lists as searched. The question is whether one specific unread
document changes it.

- **AO Angola.** Lei 17/16 art. 107(3) defers the regime of access and
  attendance for foreign citizens to a *diploma próprio* the law does not
  name, and that deferral survives into the Lei 32/20 republication. Already
  ruled out: Decreto Presidencial 162/23 (whole enrolment chapter, arts 21–30),
  DP 163/25 (read in full on lex.ao — it is enabled by arts 112(2) and 113(3),
  not 107(3)), and the UNICEF 2016 language study. **The question is whether
  ANY instrument fills 107(3).** Sweep `lex.ao/docs/presidente-da-republica/`
  by year, 2016 to 2025, and the Ministry of Education. If nothing fills it,
  say so — that closes the question rather than leaving it open.
- **KP North Korea.** Searched already, and the sentinel lists it: the PEER
  inclusion profile read in full, the 2016 Socialist Constitution arts 54 and
  159, UIS, UNESDOC. **The gap is the education law itself**, which nobody has
  read — the 1999 Education Law and the 2011 law on universal 12-year
  compulsory education. Try `naenara.com.kp`, `kcna.kp`, the Korea Law
  Institute, and any published English or Korean text. Expect nothing; the
  point is to close the last unread instrument.
- **MU Mauritius.** Searched already: UNESCO PEER, the Mauritius Institute of
  Education's 2024 pre-primary framework, and the Ministry and MIE sites.
  **The gap is the Education Act and its Regulations**, which nobody has read.
  `mauritiuslii.org` and the Government Printer are the targets. Mauritius
  also runs Kreol Morisien as a subject and admits pupils from Rodrigues and
  Agalega — check whether any admission or placement rule turns on language.

## Rules, which override any instinct to produce a full-looking result

- Do NOT generate policy content from inference. A stub is more honest than a
  plausible guess. Every claim traces to a source you actually fetched and read.
- Never invent a DOI or URL to make a link resolve.
- **NEVER WRITE A NEGATIVE.** The absence sentinel is frozen by the maintainer.
  Where a system designates nobody, look for what stands in its place and write
  THAT as a positive — an admission rule turning on residence or documents, an
  equivalence rule fixing the entry grade, a reintegration rule for returnees.
  If nothing stands in its place, return the unit with NOTHING and say so.
  **An empty unit is a correct result and I want the honest count.**
- **Keep the hedges.** A pilot stays a pilot, a circular that invites rather
  than obliges stays that.
- **AT MOST FIVE BULLETS per unit** — four points plus a hedge. The applier
  refuses six, and five units in the last wave had to be cut by hand after
  gating. Choose for slot spread first.
- Bullets under 96 characters, no sentence-ending punctuation.
- One `evidence` entry per bullet, `quote` verbatim on the page at its `url`.
  Quote in Spanish, Arabic, Portuguese or Korean as the source has it; the gate
  folds accents and whitespace.
- **`slots` is ONE TAG PER BULLET**, parallel to the bullets array — not the
  set of questions the unit answers. Two drafters got this wrong already.
- New sources under **`sources`**, never `docLinks`.

## Hosts

`research/DISCHARGE-WAVE.md` carries the table, freshly updated. Read it.
Three that matter here:

- **UNESCO PEER did NOT move.** Per-country profiles still serve 200 at
  `education-profiles.org/<region>/<country>/~inclusion`. The new
  `www.unesco.org/gem-report/en/peer/<country>` returns **404 with 1.79 MB**
  of HTML. **Check the status code, never the byte count** — the mirror image
  is `desc.gov.im`, which REJECTS at HTTP 200 in 269 bytes.
- PEER pages need **curl, not WebFetch** (WebFetch's extractor returns "no
  content"). `legifrance` is the opposite: WebFetch-only, 403 to curl.
- `lex.ao` document pages serve full text on a plain curl, but `lex.ao/?s=` is
  JS-driven and returns 200 with no links — find documents by search engine,
  then fetch the `/docs/` path directly.
- Extract every PDF with `research/tools/pdftext.js`, not WebFetch.

## Output

`done-<cc>.json`, keyed `CC|Unit Name` exactly as data/eal.json spells it:

    { "PA|Panama": {
        "fields": { "newcomerCriteria": ["bullet", "bullet"] },
        "slots":  { "newcomerCriteria": [1, 3] },
        "evidence": [{ "bullet": "...", "url": "...", "quote": "..." }],
        "sources": [{ "label": "...", "url": "..." }] } }
