# dld.legalEntitlement — what redress exists, on 30 European nationals

Opened 2026-09-27, straight after the discharge wave closed Europe 18 of 18.
Read `research/DISCHARGE-WAVE.md` first: the host table and the two traps in
it were learned on these same countries a day ago.

## This is a DEPTH pass, not a fill

Every one of these 30 entries HAS `legalEntitlement` prose. What it does not
have is the field's fourth question — *what redress or appeal exists* —
answered. The column `redress_type` reads `not stated` on all 30, and that is
an honest coding: **not one of the 324 `not stated` rows across the whole map
mentions an appeal, a tribunal, a complaint or a court anywhere in its text.**
Nothing here is recoverable by re-reading what is already in the entry. It has
to come from the instrument.

That is why this wave adds bullets to a written field, which the fill pipeline
deliberately refuses to do. `research/tools/deepen-apply.js` is the writer:
existing bullets are never touched, a new one is added only if nothing
matching it is there already, and slots grow with the bullets. It refuses an
empty field and a third-state sentinel, both of which belong to
`terr-apply.js`.

## What to look for

The field's four questions, in order: the instrument, named · what it obliges
· who carries the duty · **what redress or appeal exists**. You are answering
the fourth, and only the fourth. Do not restate the first three — they are
already written, and the worklist hands you the existing text so you can see
what not to repeat.

`REDRESS_TYPES` in `src/coding.js` is the vocabulary the bullet will be coded
against, and it is worth reading first because it tells you what counts:
an appeal to a higher administrative authority · a standing body for disputes
of this kind · a written complaint to the body administering the scheme · the
ordinary courts, named as the route · a right to be HEARD before the decision,
which is not redress but is recorded because the corpus keeps producing it.

The discharge wave found the answer sitting a few articles further on in the
instrument the entry already cites, four times in five. Appeal clauses live in
the same statutes. Start there.

## Hosts

The table in `research/DISCHARGE-WAVE.md` was built on these countries and
still applies: `zakonyprolidi.cz`, `net.jogtar.hu`, `udir.no`,
`rijksoverheid.nl`, `gibraltarlaws.gov.gi`, `logir.fo`, `gesetze.li`,
`legimonaco.mc`, `pravo.by/upload/docs/op/*.pdf`, `mecc.gov.md`,
`data.legilux.public.lu` all work. `diariodarepublica.pt`, `normattiva.it`,
`belex.sites.be.ch` and `bl.clex.ch` serve JS shells with no text.
`documents.bopa.ad` is UTF-16LE. `legis.md` 403s; use the `cpbmd.info` mirror.

## Output

One `done-NN.json` per batch, the shape `terr-verify.js` reads:
`{ "CC|Unit": { fields: { legalEntitlement: [ONLY THE NEW BULLETS] },
slots: { legalEntitlement: [ints for those bullets] },
evidence: [{bullet, url, quote}], sources: [{label, url}] } }`

**`sources`, not `docLinks`** — the gate reads `sources` or `addDocLinks` and
drops anything else silently. That cost a re-run on the discharge wave.

`fields` carries ONLY the new bullets. deepen-apply.js appends them; handing
back the existing ones too would just be deduplicated, and handing back an
altered version of one would be silently ignored rather than applied.

## What batch 01 found, 2026-09-27

Six of six carried a route. 12 fetches for six countries. **Five of the six
answers were a few articles further on in an instrument the entry already
cited** -- the discharge method holding again.

Austria is the exception and it is the shape to expect elsewhere: the
Schulpflichtgesetz carries NO appeal clause for a special-needs Bescheid
(s.27's Widerspruch reaches only bodies other than the school authorities),
so the route came from the ministry's own page and the bullet cites that
rather than the statute. Andorra is the same one level down -- the appeal
runs against the CONAVA valuation that GATES the support, not against either
instrument already coded, so it took an instrument row of its own.

Albania is the one place with no appeal at all, and it is written as a
POSITIVE: Ligj 69/2012 gives the commission only a recommendation and the
parents the decision. That is `consultation right`, which is in the
vocabulary for exactly this. Do the same rather than writing a negative.

Hosts learned in batch 01, on top of the discharge table:
- `ris.bka.gv.at` returns **503 with a bot check**. Use
  `jusline.at/gesetz/<law>/gesamt`, which serves the whole consolidated law
  as clean HTML.
- `portaljuridicandorra.ad` is a **JS shell** -- 39 KB of chrome, no law text.
- `lex.bg` serves **windows-1251** and declares it; terr-verify's legacy
  path handles it, a naive UTF-8 read does not.
- `paragraf.ba`, `pravo.by/upload/docs/op/*.pdf` and `documents.bopa.ad`
  worked exactly as the discharge table says.

## State

- [x] batch 01 applied and recoded: Andorra, Albania, Austria, Bosnia,
      Bulgaria, Belarus. 10 bullets, 6 of 6 established.
- [ ] batches 02-05 drafted (6 units each)
- [ ] gated with `terr-verify.js research/pending/redress-eu`
- [ ] applied with `deepen-apply.js dld <verified> research/pending/redress-eu --write`
- [ ] `redress_type` recoded from the new prose, with `apply-coding.js`
