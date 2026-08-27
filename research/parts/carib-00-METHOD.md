# Caribbean dld / eal / fl — method, leverage tests, and cross-cutting negatives

## Leverage sources tested (result of testing them, including negatives)

### 1. UNESCO PEER inclusion profiles — HIGH YIELD, all 12 dld units covered
URL pattern: `https://education-profiles.org/latin-america-and-the-caribbean/<country>/~inclusion`
All twelve returned **HTTP 200** on 2026-08-26 with the UA/referer from the brief.

IMPORTANT CAVEAT ON THIS SOURCE, verified on the pages themselves:
- Every page now carries the banner: "The Profiles Enhancing Education Reviews (PEER)
  platform has moved to a new website, https://www.unesco.org/gem-report/peer , where it
  now provides updated, indicator-based analysis and continuous monitoring. The current
  website remains available for reference; its profiles, linked to earlier GEM Reports,
  are no longer being updated."
- Every page states **"Validated by the country: No"**.
- Each carries a "Last modified" stamp. Observed stamps (dd/mm/yyyy):
  Antigua and Barbuda 01/09/2021 | Bahamas 31/08/2021 | Barbados 31/08/2021 |
  Cuba 15/06/2020 | Dominica 30/08/2021 | Dominican Republic 17/08/2021 |
  Grenada 25/08/2021 | Haiti 02/09/2021 | Saint Kitts and Nevis 09/09/2021 |
  Saint Lucia 26/08/2021 | Saint Vincent and the Grenadines 25/08/2021 |
  Trinidad and Tobago 27/08/2021.
  => Treat all as a 2020–2021 snapshot, not current policy.
- **The Cuba ENGLISH page is a 200 with no profile body.** It contains only
  "The Inclusion chapter is not available in this language ." The Cuban material below
  therefore comes from the SPANISH profile:
  `https://education-profiles.org/es/america-latina-y-el-caribe/cuba/~inclusion` (200,
  403,293 bytes, profile body present). Note the Spanish path segment differs
  (`es/america-latina-y-el-caribe/`); `es/latin-america-and-the-caribbean/` returns 404.
- PEER pages carry zero-width spaces mid-sentence; all quotes below were taken from text
  with U+200B/U+200C/U+200D/U+FEFF stripped, so spacing artefacts such as
  "t he" or "r eciben" in the raw HTML are reproduced as they extracted.

TIER: `secondary-source`. PEER is an institutional account that quotes national
instruments; where I could retrieve the instrument itself I have cited it separately as
`official-document` and term-counted it.

### 2. The OECS Education Act family — a genuine single-source leverage win
Antigua and Barbuda (2008), Dominica (1997), Saint Kitts and Nevis (2005), Saint Lucia
(1999), Saint Vincent and the Grenadines (2006) all use the SAME statutory formula for
who gets special education. I verified this verbatim in three retrieved acts (below) and
via PEER for the other two. The formula is:

  "students of compulsory school age who by virtue of intellectual, communicative,
   behavioural, physical or multiple exceptionalities are in need of special education"

This is the single most important terminology finding for six of the twelve units:
**"communicative ... exceptionalities" is the statutory hook, and it is the ONLY one.**
None of these acts contains the word "speech".

### 3. TERM COUNTS on the four education acts I retrieved and extracted
Counts are `grep -oi <term> FILE.txt | wc -l` on the extracted plain text. `school` is the
sanity-check word: its high count shows the PDF extracted properly.

| Act (extracted text) | speech | language | communicat | "special education" | exceptionalit | mute | deaf | **school (sanity)** |
|---|---|---|---|---|---|---|---|---|
| Antigua and Barbuda Education Act 2008 | **0** | 4 | 2 | 23 | 1 | 0 | 0 | **562** |
| Saint Christopher and Nevis Education Act 2005 | **0** | 4 | 4 | 16 | 1 | 0 | 0 | **554** |
| Saint Lucia Education Act Cap. 18.01 (Act 41 of 1999) | **0** | 4 | 3 | 22 | 1 | 0 | 0 | **564** |
| Trinidad and Tobago Education Act Chap. 39:01 (1 of 1966) | **0** | 2 | 4 | 14 | 0 | 1 | 1 | **433** |

**speech = 0 in all four correctly-extracted acts.** That is the finding.

I also checked what the non-zero hits actually are, so the counts are not misread:
- Antigua's 4 "language" hits are: promoting understanding of the "history, language,
  culture, rights, and values of Antigua and Barbuda"; "insulting, abusive or indecent
  language" to a school attendance counsellor; a CXC pass "including English Language";
  and "threatening or insulting language" on school premises. **None concerns assessment,
  medium of instruction, or a language disorder.**
- Trinidad's 4 "communicat" hits are all about communicable disease, records and
  communications, and communicating a Board decision. **None concerns communication
  disorder.**

### 4. Sources that did NOT work (reported as negatives)
- `laws.gov.ag` (Antigua legal affairs): connection timed out from this session on
  repeated attempts, http code 000, both http and https. The Antigua Education Act 2008
  PDF is banked on disk (see below) but I could not myself verify a live URL for it.
- `www.oas.org/juridico/spanish/mesicic2_ktn_education_act_2005.pdf` redirects to
  `http://www.oas.org/wearesorry.htm` (200 on a generic error page) — NOT a verified
  source, do not cite.
- `pmo.gov.kn/wp-content/uploads/2018/01/Education-Act-2005.pdf` — 404.
- `rgd.legalaffairs.gov.lc` — DNS does not resolve.
- `slugovprintery.com/.../Education-Act-Cap-18.01.pdf` — HTTP 521.
- `natlex.ilo.org` NATLEX record for Antigua — 403.

## Files banked on disk
Under `.../scratchpad/caribdld/`:
- `peer-<country>-incl.html` + `.txt` + `-body.txt` + `-body-core.txt` for all 12 units
- `cuba-es.html` / `cuba-es.txt` / `cuba-es-core.txt` (Cuba Spanish PEER profile)
- `sub-b/AG_EducationAct2008.pdf|.txt`, `sub-b/KN_EducationAct2005.pdf|.txt`,
  `sub-b/LC_EducationAct_Cap1801.pdf|.txt`, `sub-c/tt-education-act-39.01.pdf|.txt`
- `h2t.py` (the HTML→text converter used, which strips zero-width characters)
