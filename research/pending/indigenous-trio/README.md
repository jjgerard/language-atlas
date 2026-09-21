# indigenous trio fill wave — standing / mediumOfInstruction / taughtAsSubject

Started 2026-09-21, after the three fields were coded at national level. The
target was the 26 blank national cells across 16 units, so the trio would be
complete in coverage as well as in coding.

## Done and applied

`done-01.json` → gated by `terr-verify.js` (10 bullets offered, **0 dropped**,
all four sources returned 200) → applied by `terr-apply.js`, then coded.

| unit | field | outcome |
|---|---|---|
| GI Gibraltar | standing | 2 bullets, coded `protected as culture` / `policy` / `duty to promote` |
| JM Jamaica | taughtAsSubject | 2 bullets, coded `not taught` |
| AG Antigua and Barbuda | standing, mediumOfInstruction | third state, two sources each |

**4 of 26 cells.** The rate is low on purpose; see below.

## Why the rate is low, and what the next session must not skip

**A negative needs two sources.** `research/DISCHARGE-WAVE.md` records five
`Not established` sentinels written off Eurydice alone, three of which were then
checked against national primary legislation and **all three had the rule**. A
base rate of 3 in 3 is why Antigua waited for a second source and why the units
below are parked rather than asserted.

**Four docLink hosts could not be gated**, which is a finding about the
project's sources rather than about these units:

- `education-profiles.org` (UNESCO PEER) now serves an archive banner and points
  at `www.unesco.org/gem-report/en/peer`. **The pages still carry their content**
  and `terr-verify` fetched one at 200, so existing citations still gate — but
  the platform has moved and these URLs are on notice. A great many entries cite
  it.
- `education-profiles.org/.../saint-vincent-and-the-grenadines/~inclusion`
  resolves to **Colombia** boilerplate. That docLink is wrong, not merely dead.
- `ruraltransformation.gov.bz/docs/28/Cap_36.01_Education_and_Training_Act.pdf`
  (Belize Education and Training Act) → **404**.
- `ohchr.org` → **403** to any fetch, so the Mongolia CERD press release cannot
  be quote-checked even though it is the right source.

## Parked: one source checked, second source still needed

Each of these was read and does not answer the field. None may be written as a
third-state finding until a second, independent source confirms it.

| unit | field(s) | source read | what it showed |
|---|---|---|---|
| SA Saudi Arabia | standing | PEER inclusion | "Linguistic and ethnic groups" covers only Arabic and foreign nationals' schools |
| TJ Tajikistan | taughtAsSubject | PEER inclusion | the ethnic/linguistic section is about MEDIA of instruction, not subjects |
| KP North Korea | mediumOfInstruction, taughtAsSubject | Constitution (2016) | only arts. 54 and 165 touch language; neither reaches school |
| SV El Salvador | mediumOfInstruction | MINEDUCYT 2019 | 85 teachers trained to promote teaching OF Nahuat, nothing on teaching IN it |

## Not yet started

| unit | field(s) | note |
|---|---|---|
| BS Bahamas | all three | **no docLinks at all** — needs sources found from scratch |
| VA Vatican City | all three | **no docLinks**; check whether `Not applicable` is the honest answer before researching |
| BB Barbados | standing, mediumOfInstruction | has *Reimagining Education* PDF + PEER |
| CU Cuba | mediumOfInstruction, taughtAsSubject | has the 2019 Constitution (Gaceta Oficial PDF) |
| VC Saint Vincent | mediumOfInstruction, taughtAsSubject | Education Act 2006 PDF is good; the PEER link is wrong (above) |
| SM San Marino | standing, mediumOfInstruction | has the 2016 Linee guida |
| BZ Belize | taughtAsSubject | Act URL is 404; find a working copy |
| KR South Korea | mediumOfInstruction | has the Jeju ordinance PDF |
| MN Mongolia | taughtAsSubject | CERD release is right but OHCHR blocks fetching; find a mirror |

## How to resume

1. `node research/tools/build-fill-wl.js indigenous <outdir> <n> standing,mediumOfInstruction,taughtAsSubject --national`
   rebuilds worklists for whatever is still blank.
2. Draft into a `done-NN.json` beside this file, same shape as `done-01.json`:
   `fields` + `slots` + `evidence` for bullets, `notEstablished` for the third
   state (a STRING opening with the sentinel phrase, not a bullet — a sentinel
   written as a bullet is applied as ordinary prose and silently counted as
   coverage).
3. `node research/tools/terr-verify.js research/pending/indigenous-trio`
4. `node research/tools/terr-apply.js indigenous research/pending/indigenous-trio/verified.json research/pending/indigenous-trio --write`
   — **the spec dir is a positional 4th argument**; without it `slots` and
   `absences` are silently dropped and the run reports `0 slot-tagged`.
5. Code whatever was filled, then
   `node research/tools/coding-verify.js indigenous coding standing mediumOfInstruction taughtAsSubject slots notEstablished`.
   Naming only `coding` will report the fill as unexpected.

Delete this directory once the wave is applied; the record lives in the entries
and in git.
