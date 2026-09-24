# dld-close — taking seven nearly-finished dld fields over the line

## What this wave was

Seven `dld` fields were each a handful of units short of complete. `gaps.js`
reported 79 missing cells across them; 24 of those already carried a documented
`Not established from the sources consulted` answer, which is an answer and not
a gap, so the real work was **55 blank cells over 43 national units**:

| field | gaps.js says missing | already a documented absence | genuinely blank |
|---|---|---|---|
| serviceModel | 2 | 0 | 2 |
| terminology | 4 | 1 (Laos) | 3 |
| workforce | 8 | 2 (Iraq, Vatican City) | 6 |
| policyHistory | 9 | 0 | 9 |
| funding | 14 | 4 (Bahamas, Cuba, St Lucia, St Vincent) | 10 |
| identificationCriteria | 17 | 14 | 3 |
| referralPathway | 25 | 3 (Curacao, St Lucia, Myanmar) | 22 |

That split matters for reading the coverage figures: `gaps.js` counts a
sentinel as MISSING, and `build-fill-wl.js` counts it as WRITTEN, so the two
tools disagree by exactly the number of documented absences in a field.

## Files

- `BRIEF.md` — the drafting brief the nine drafters worked from
- `wl/wl-A.json` … `wl/wl-I.json` — the worklists, one per drafter, unit-disjoint
- `specs/done-*.json` — drafted specs, the gate's input
- `specs/verified.json` — the gate's output, the applier's input

## How to resume

```bash
node research/tools/terr-verify.js research/pending/dld-close/specs
node research/tools/terr-apply.js dld research/pending/dld-close/specs/verified.json research/pending/dld-close/specs
node research/tools/terr-apply.js dld research/pending/dld-close/specs/verified.json research/pending/dld-close/specs --write
node research/tools/coding-verify.js dld serviceModel terminology workforce policyHistory funding identificationCriteria referralPathway
```

Delete this directory once the work is applied. It is a staging area, not an
archive — the record of what was done lives in the entries and in git.
