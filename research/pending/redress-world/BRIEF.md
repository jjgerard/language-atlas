# dld.legalEntitlement — what redress exists, outside Europe

Opened 2026-09-27, after the European wave closed 30 of 30. This is a DEPTH
pass, not a fill: every unit here HAS `legalEntitlement` prose and does not
answer the field's fourth question. `redress_type` reads `not stated` on
**255 instrument rows across 160 national units**, and that coding is honest
— not one of those rows mentions an appeal, a tribunal, a complaint or a
court anywhere in its text.

    Africa     54 units, 101 rows
    Asia       45 units,  78 rows
    Americas   37 units,  50 rows
    Oceania    20 units,  26 rows

## This is a PROBE, not a sweep

Four batches of six, one per region, before anything larger is committed.
Europe's yield was 30 of 30 at 12–16 fetches a batch, but Europe has national
legal portals and these regions mostly do not: the corpus here leans on
UNESCO PEER profiles and ministry pages, and `research/DISCHARGE-WAVE.md`
already established that PEER describes how support STARTS and is silent on
how it ends. Whether it carries appeals is exactly what this measures.

**A batch that establishes two of six is a useful result and must be reported
as such.** The point of a probe is the number, not the bullets.

## Method, proven three waves running

Start from the entry's own docLinks and the instruments named in its coding.
Fifteen of thirty European answers were a few articles further on in an
instrument the entry already cited. Where a statute carries no clause, a
ministry page may, and the bullet cites what was actually read. Where the
appeal runs against the instrument that GATES the support — a commission's
conclusion, an orientation certificate, a fund's decision — name that
instrument in the bullet.

Where there is NO appeal, look for what stands in its place and write that as
a positive. Albania's law gives the commission only a recommendation and the
parents the decision; Moldova's requires written parental consent before the
evaluation. Both are `consultation right`, which is in the vocabulary for
exactly this. **Never write a negative** — the absence sentinel is frozen.

## Hosts

`research/DISCHARGE-WAVE.md` carries the full table from two European waves.
It is mostly European, so add what you find. UNESCO PEER has moved to
`www.unesco.org/gem-report/en/peer` and **needs curl, not WebFetch** —
WebFetch's extractor returns "no content" on those pages. `ohchr.org` 403s.

## Output

`probe-<region>.json` is the worklist. Write `done-<region>.json`:
`{ "CC|Unit": { fields: { legalEntitlement: [ONLY NEW BULLETS] },
slots: { legalEntitlement: [4] }, evidence: [{bullet, url, quote}],
sources: [{label, url}] } }`

**`sources`, not `docLinks`** — the gate drops anything else silently.

## State

- [ ] four probe batches drafted
- [ ] gated with `terr-verify.js research/pending/redress-world`
- [ ] applied with `deepen-apply.js dld <verified> research/pending/redress-world --write`
- [ ] `redress_type` recoded with `set-coding-value.js`, which builds from the
      stored rows — never hand-write a many-grained recode
- [ ] yields compared, and the rest of each region run or abandoned on that
