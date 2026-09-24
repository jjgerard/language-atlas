# indigenous.revitalisation fill wave — APPLIED, awaiting review

Run 2026-09-24 against the 112 blank NATIONAL units. `BRIEF.md` is the brief the
drafters worked to. `done-NN.json` is what each drafted; `verified-NN.json` is
what `terr-verify.js` let through. Everything here has already been written to
`data/indigenous.json` by `terr-apply.js`; nothing is pending.

**Delete this directory once the change is committed** — the record then lives
in the entries and in git. It is kept for now so the reviewer can read the
quote behind any bullet.

## Result

| | before | after |
|---|---|---|
| prose | 154 | 248 |
| third state (`Not established from the sources consulted`) | 0 | 14 |
| blank | 242 | 134 |
| **blank NATIONAL** | **112** | **4** |

108 units written — 94 prose, 14 third state, 1 documented absence (Tunisia) —
by region: Africa 40, Europe 23, Asia 15, Americas 15, Oceania 15.

**391 bullets offered, 1 dropped, 388 live** (390 applied, less the 2 reverted
with Maldives). A 99.7% pass rate says the gate is a floor and not a proof: most
drafters self-gated against `terr-verify.js` before submitting, so the losses had
already been taken.

`coding-verify.js indigenous revitalisation slots notEstablished absences`:
*no other key differs from HEAD, 396 entries checked.*

## The four national units still blank, and why

All four are in `research/SEARCHED-EMPTY.json` now, so the next worklist skips
them. None is a claim that nothing exists.

- **BS Bahamas** — PEER's profile has zero occurrences of "language", which is a
  real silence, but `laws.bahamas.gov.bs`, the government portal and a third
  host all serve an identical 75,193-byte 403 page. One source is not enough.
- **BN Brunei** — Dewan Bahasa dan Pustaka plainly does this work; `dbp.gov.bn`
  renders every substantive page as a JPEG (no body text on 30 of 35 pages via
  the WP REST API) and `pelitabrunei.gov.bn` will not connect and has no Wayback
  snapshot. The silence is the host's, not the state's.
- **KP North Korea** — `naenara.com.kp` http-only with no search, `kcna.kp` fails
  TLS, `korean-books.com.kp` times out.
- **MV Maldives** — drafted from the Government Gazette, but the bullet naming
  the Dhivehi Language Academy was the one quote the gate dropped, leaving two
  bullets referring to an "Academy" with no antecedent anywhere in the entry.
  **Applied, then reverted to blank** rather than published as a dangling
  reference. `dhivehiacademy.edu.mv` fails the TLS handshake to curl and Node.

## What this field turned out to be

The scheme's own note that **it is not only about indigenous languages** held
hard at national level: Malta's statutory activity is for Maltese, Vatican
City's for Latin, Equatorial Guinea's for Spanish, Georgia's, Uzbekistan's,
Qatar's, Syria's and Iran's for the state language. Each leads with a qualifier
bullet saying so, so the panel cannot be misread.

**The activity is very often not in a school**, exactly as the corpus predicted:
a university research institute (Zimbabwe's ALRI), an activist association
(ZILPA), a unified orthography with a dictionary in preparation (São Tomé), a
handwriting competition and a register of poets (Maldives), Livonian summer
school and a Livonian keyboard (Latvia), adult Monegasque classes taught by
seconded teachers, place-name restoration (Ukraine, Tajikistan), Kasas FM in
Tamazight (Libya), a dialect dictionary handed out free at bank branches (San
Marino).

**Funding (question 4) is the least answerable**, confirming the corpus pattern.
It is reachable almost only where the instrument names its own budget clause —
which is why language-body statutes outperform everything else here.

## Source types, ranked by what they actually delivered

1. **A language body's own founding statute** — answers all four questions in
   one document. Samoa's Act, Palau's PNCA ch. 8, Iran's اساسنامه, Georgia's
   Organic Law, Morocco's IRCAM dahir, Haiti's Académie law, Nicaragua's Ley 162.
2. **Council of Europe monitoring reports** (ECRML Committee of Experts, FCNM
   Advisory Committee) — carried 13 of the 23 European units, and state the
   negative findings no ministry document would. `rm.coe.int` refuses Node and
   answers curl; the gate's fallback handles it.
3. **UNICEF/Trudell country reviews** — the section headed *Language education
   initiatives* is almost exactly this field, giving actor, start year and
   funder in one paragraph. Best single route in Eastern and Southern Africa.
   `pdftotext -layout` returns near-empty text on these; PyMuPDF returns it all.
4. **Leclerc / `axl.cefan.ulaval.ca`** — reproduces national language statutes in
   full. Carried Chad, Tunisia, Senegal, Niger, Mauritania. Serves windows-1252.
5. **National culture ministries, not education ministries**, in the Pacific;
   plus **FAOLEX** (`faolex.fao.org/docs/pdf/<iso3>NNNNN.pdf`) and the **SPC
   cultural-mapping series** (`hrsd.spc.int`), which between them covered four of
   seven units in one batch.
6. **Universities** — UG's Guyanese Languages Unit, UWI St Augustine's endangered
   languages project, UWI Mona's Jamaican Language Unit, the University of Latvia
   Livonian Institute. Where a ministry answered nothing, a university did.

**UNESCO PEER is now a poor positive source for this field** and a good negative
one. Its *Ethnic and linguistic groups* section is a medium-of-instruction
summary; it named a revitalisation body, date or funder almost nowhere. But
because that section is named and empty, its silence is quotable — which is what
carried the Kuwait, Bahrain, Oman, Antigua and Saint Kitts third-state findings.

## Hosts that failed repeatedly

- **An identical 75,193-byte "403 - Forbidden" page** from `education.gov.gy`,
  `laws.bahamas.gov.bs` and `thestudentshed.com` — one upstream filter, not
  three hosts.
- **JS-only pages returning HTTP 200 with no quotable body**: `legislation.mt`,
  `legilux.public.lu/eli/...` (the working path is
  `data.legilux.public.lu/filestore/eli/...`), `coe.int` declarations-by-treaty,
  Maldives gazette detail pages, `kremlin.ru/acts/bank`.
- **A 200 that is not the document**: `oas.org/juridico/pdfs/...` redirects to
  `wearesorry.htm`; `cambridge.org`'s aop content-view path redirects to the
  landing page; `spc.int/DigitalLibrary/Doc/...` serves a 2 KB stub.
- **`legislation.govt.nz` answers 202** (Incapsula challenge) — NZ statutes are
  unreachable by curl; `nzlii.org` search 403s. The commission's own site worked,
  at `en.tetaurawhiri.govt.nz/<path>` (the `www.` host 404s).
- **TLS failures**: `dhivehiacademy.edu.mv`, `kcna.kp`, `edu.gov.ru`,
  `www.znbc.co.zm` (drop the `www.`), `itaukeiaffairs.gov.fj`.
- `arts.gov.au` times out from this network — go straight to Wayback.
- `tandfonline.com`, `researchgate.net`, `brill.com`, `aiatsis.gov.au`,
  `seychellesnewsagency.com` all 403.

## Two things for the maintainer

**`gaps.js` re-offers the third state.** Its header comment says the
not-established sentinel and the not-applicable marker "count as filled here for
the purpose of what is left", but `content()` at line 29 is
`!!String(v).trim() && !isNotEstablished(v) && !isNotApplicable(v)` — so a
sentinel counts as MISSING and the next worklist sends a drafter back at it. All
14 of this wave's third-state findings are on the worklist `gaps.js` prints now.
The comment and the code disagree; which one is right is your call.

**Encoding cost one quote and nearly cost two more.** Hand-encoding Thaana as
`\u` escapes produced quotes that were not verbatim, and one of them *passed*
the gate's loose fallback because `fold()` NFKD-strips Thaana vowel marks and
leaves single-consonant tokens. Al-Muqtafi serves windows-1256 with no charset
declaration. Both are the same class of failure `terr-verify.js` already carries
scar tissue for.
