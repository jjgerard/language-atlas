# Why dld.dischargeCriteria is still mostly empty

Stopped deliberately at 48 of 396 on 2026-09-20, with the cost measured rather
than estimated. This is the note the next attempt should read first, because
the obvious way in does not work and it takes a while to find that out.

## The comparative sources do not answer this field

Three source families were checked and all three describe how support STARTS
and say nothing about how it ends:

- **Eurydice**, "Special education needs provision within mainstream
  education" — exists for every European system, consulted for eight. Five had
  nothing on ending. Portugal sets out a three-level intervention model with
  nothing on discontinuing a measure; Slovenia records only that the programme
  is "monitored, evaluated and, where necessary, updated on an ongoing basis".
- **European Agency for Special Needs and Inclusive Education**, country pages
  — identification and provision, no review or cessation.
- **National ministry summary pages** — the same shape.

## Do not write a negative off one of them

Five `Not established` sentinels were written from Eurydice alone and three of
the five were then checked against national primary legislation. **All three
had the rule**:

- Czechia, vyhláška 27/2016 § 23(1) — re-evaluated within a year of placement,
  then at latest every two
- Hungary, 15/2013 EMMI rendelet § 22 — expert committee reviews every two
  years to age 10, every three to 16
- Italy, D.Lgs 66/2017 — the GLO runs an annual verification cycle

Those negatives were withdrawn in 7c4b8bb. A base rate of 3 in 3 is the reason
this field needs two sources before an absence is asserted, and the second one
has to be national primary legislation.

## What actually works, and what it costs

National legal portals, in the national language. Accessibility is uneven and
that is most of the cost:

| works, clean HTML | does not |
|---|---|
| `zakonyprolidi.cz` | `diariodarepublica.pt` (JS-rendered, serves empty) |
| `net.jogtar.hu` | `normattiva.it` (serves article 1 only at the resolving URL) |
| `udir.no`, `rijksoverheid.nl` | `legislation.mt` (ELI numbers must be searched, not guessed) |

Two PDFs were image-only and `pdftext.js` extracted zero characters from both,
so a PDF-only source is a dead end unless OCR is added.

Measured rate: **4–6 fetches per country, roughly 40% yield.** The 33 remaining
European national units are therefore ~150 calls for perhaps 13 entries.

## Run it as a proper wave, not a sweep

A serial sweep in one session is the wrong shape. Resolve each country's
national legal portal URL into the worklist FIRST, then one drafter per
country, then `terr-verify.js`. That is what `build-fill-wl.js` and the gate
exist for, and it is the part of the `fill-wave` skill this attempt skipped.

## What the field already says

Worth knowing before spending the money. Of the units coded so far, `age
ceiling` takes half the discharge_basis values, `decider` is `not stated` on
about two thirds, and three high-capacity systems — Denmark, Sweden, Finland —
run a review with no criterion behind it, Denmark saying so outright: "the
order sets that decision point but states no criterion for ceasing".

Where a discharge rule is recoverable at all it is usually **an age, not a
judgement about the child**. A wave should expect that rather than be
disappointed by it.
