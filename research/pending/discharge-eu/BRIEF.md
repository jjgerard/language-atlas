# dld.dischargeCriteria — the 18 blank European nationals

Opened 2026-09-27. Read `research/DISCHARGE-WAVE.md` first; it is the record of
the attempt that stopped at 48 of 396 and it says why the obvious way in does
not work.

## What this wave is

`dischargeCriteria` is blank on 154 of 210 national units, the largest gap on
dld, and it is half of the in-against-out pair the /patterns suggestions are
pinned to — its partner, `identificationCriteria`, is blank on 3. Europe first
because that is where the legal portals are reachable; the other 136 wait on
what this one costs.

The field's four questions, in order: **what ends support · who decides ·
whether a child can re-enter · any age ceiling.** Omit what you cannot answer.

## The three rules that are specific to this field

1. **A negative needs two sources, and the second must be national primary
   legislation.** Five `Not established` sentinels were once written off
   Eurydice alone; three were then checked against national law and all three
   had the rule. 3 in 3. See DISCHARGE-WAVE.md.
2. **This wave writes no negatives at all.** The typed `notEstablished` flag is
   frozen pending a decision the maintainer has not made. A country you cannot
   establish is left blank and reported, not written.
3. **Expect an age, not a judgement.** Where a discharge rule is recoverable it
   is usually an age ceiling or a review interval. That is the finding, not a
   disappointment.

## Where the sources are

Works, clean HTML: `zakonyprolidi.cz`, `net.jogtar.hu`, `udir.no`,
`rijksoverheid.nl`. Does not: `diariodarepublica.pt` (JS-rendered, empty),
`normattiva.it` (serves article 1 only), `legislation.mt` (ELI numbers must be
searched, not guessed). UNESCO PEER has moved to
`www.unesco.org/gem-report/en/peer`; **use curl, not WebFetch** — WebFetch's
extractor returns "no content" on those pages. `ohchr.org` 403s to any fetch.
Image-only PDFs extract zero characters and are a dead end.

Comparative sources — Eurydice, the European Agency country pages, ministry
summary pages — describe how support STARTS and are silent on how it ends.
They are worth one look per country and no more.

## Batches

`worklist-01.json` … `worklist-04.json`, five countries each, built with
`build-fill-wl.js`. Each carries the unit's existing docLinks, which is the
best starting point: the instrument that answers identification usually
answers discharge a few paragraphs on.

Nine of the eighteen are microstates — Andorra, Gibraltar, the Isle of Man,
Jersey, Liechtenstein, Monaco, San Marino, Vatican City, the Faroe Islands —
where the honest answer may be that no national rule exists. That is still
not a negative anyone may write in this wave.

## Output

One `done-NN.json` per batch, in the shape `terr-verify.js` reads:
`{ "CC|Unit": { fields: { dischargeCriteria: [bullets] }, slots: {...},
evidence: [{bullet, url, quote}] } }`. A bullet with no evidence entry is
dropped by the gate; so is one whose quote is not on the page it cites.

New sources may be added to an entry's `docLinks` — the maintainer approved
that for this wave — but only a source actually read, and a bullet still has
to quote it.

## State

- [ ] batches 1-4 drafted
- [ ] gated with `terr-verify.js research/pending/discharge-eu`
- [ ] applied with `terr-apply.js dld <verified> research/pending/discharge-eu --write`
      (the spec dir is a positional 4th argument; without it slots and
      absences are silently dropped)
