# Two European waves on dld, and the hosts they cost to find

Stopped deliberately at 48 of 396 on 2026-09-20, with the cost measured rather
than estimated. This is the note the next attempt should read first, because
the obvious way in does not work and it takes a while to find that out.


## Europe is finished: 18 of 18, 2026-09-27

The note below was written after stopping at 48 of 396. A wave run properly
took every remaining blank European national unit -- eighteen of them -- and
established a rule on all eighteen. 70 bullets, every quote gated against the
live source with terr-verify.js, **none dropped**. The field stands at 74
filled of 210 national units.

**The 40% yield measured below was a fact about METHOD, not about the field.**
The difference: national primary sources first, starting from the entry's own
docLinks, and no fetch at all spent on Eurydice or the European Agency,
because this note had already established they are silent on ending. Roughly
two to three fetches per country rather than four to six, and five new
sources added across eighteen entries -- in most cases the instrument that
answers identification answered discharge a few paragraphs on.

**What sixteen of the eighteen say** is in research/FIELD-QUESTIONS.md, and
it is the finding of the wave: the field asks what ends support and gets back
when it is looked at again. Only Jersey and Malta name a criterion about the
child.

### Hosts, added to the table below

Work cleanly: `gibraltarlaws.gov.gi`, `logir.fo`, `gesetze.li` (konso/pdf),
`legimonaco.mc` (UTF-8 despite looking mangled in a Windows console),
`legislation.mt/getpdf`, `pravo.by/upload/docs/op/*.pdf`, `mecc.gov.md`,
`sonk.org.mk`, `portal.mdt.gov.mk`, `data.legilux.public.lu`,
`ch-sodk.s3.amazonaws.com`, `notes.zh.ch`, `desc.gov.im`, `jerseylaw.je`,
`ombudsman.co.me`, `natlex.ilo.org`, `paragraf.ba`, `fas.va`, `g-ba.de`,
`kmk.org`, `cpbmd.info`.

Do not:
- `documents.bopa.ad` serves **UTF-16LE**. Read as UTF-8 it is unsearchable
  garbage; terr-verify decodes it, a naive read does not.
- `belex.sites.be.ch` and `bl.clex.ch` run the **LexWork SPA** -- 200 with a
  2.3 KB JS shell and no law text. Same failure as diariodarepublica.pt.
- `zh.ch/.../zhlex-ls/erlass-*.html` is a metadata shell; the PDF link inside
  it is itself a JS redirect stub. Two hops, and the working URL carries a
  literal `$File` segment.
- `student-wellbeing-services.gov.mt` is behind Cloudflare and 403s a plain
  curl with only a UA. terr-verify's own fallback gets it.
- `consigliograndeegenerale.sm` serves a **PDF under a .html URL**, and for
  Legge 141/1990 serves only a four-page relazione, not the law.
- `legis.md` still 403s; the `cpbmd.info` mirror of the Codul educatiei works.

### A pipeline trap that cost a re-run

Drafters were told to return new sources under `docLinks`. terr-verify.js
reads `sources` or `addDocLinks` and **drops anything else without a word**:
five genuinely new sources passed the gate, reached the applier, and vanished
while the run reported success. Check the entry, not the log.


## The redress wave, 2026-09-27: 30 of 30

The second wave run on these countries, and the first DEPTH pass the project
has run: `legalEntitlement` was written on all thirty and answered three of
its four questions, leaving `redress_type` at `not stated`. That coding was
honest -- not one of the 324 such rows on this map mentions an appeal, a
tribunal, a complaint or a court anywhere in its text -- so nothing was
recoverable by re-reading and every answer had to come from an instrument.
56 bullets, gated, none dropped. The column went 30 rows of `not stated` to
five, and those five are instruments that genuinely carry no clause while a
sibling row on the same entry carries the route.

`research/tools/deepen-apply.js` is what writes a pass like this: fl/apply.js
refuses to write over real prose, rightly, and that guard also made it
impossible to ADD a sentence. It merges the way policyHistory does -- existing
bullets never touched, a new one added only if nothing matching it is there.

**Fifteen of thirty answers were a few articles on in an instrument the entry
already cited**, which is the same thing the discharge wave found and is now
the method: start from the entry's own docLinks before searching.

### Hosts, from both waves

Serve full consolidated text as clean HTML or extractable PDF:
`gibraltarlaws.gov.gi`, `logir.fo`, `gesetze.li/konso/pdf` (grep it, the
consolidation repeats), `legimonaco.mc` (UTF-8 despite looking mangled in a
Windows console), `legislation.mt/getpdf`, `pravo.by/upload/docs/op/*.pdf`,
`mecc.gov.md`, `sonk.org.mk`, `portal.mdt.gov.mk`, `data.legilux.public.lu`
(the `-n1-` ELI suffix resolves by guess; `n2`/`n3` 404),
`ch-sodk.s3.amazonaws.com`, `notes.zh.ch` (two hops, and a literal `$File`
segment), `desc.gov.im`, `jerseylaw.je`, `ombudsman.co.me`, `natlex.ilo.org`,
`paragraf.ba`, `paragraf.rs`, `fas.va` (`/norme-e-regolamenti/regolamento.html`,
inline article text; `statuto-e-regolamento.html` does not exist), `g-ba.de`,
`kmk.org`, `cpbmd.info`, `althingi.is/lagas`, `likumi.lv/ta/id`,
`riigiteataja.ee` blob-html, `boe.es/buscar/act.php`, `riksdagen.se` SFS (read
the `/Träder i kraft/` markers -- it serves provisions not yet in force),
`revisedacts.lawreform.ie` (better than irishstatutebook.ie for anything
amended), `gesetze-im-internet.de/<law>/__<n>.html` (one section per fetch),
`static.slov-lex.sk/static/SK/ZZ/<year>/<no>/<date>.html`,
`parlamento.it/parlam/leggi/<yy><nnn>l.htm` (the way into Italian statute
text; the `deleghe/` form 404s), `legalacts.ru`, `dspalba.ro`.

Do not:
- `documents.bopa.ad` is **UTF-16LE**; terr-verify decodes it, a naive read
  does not. `lex.bg` is **windows-1251** and declares it.
- JS shells, 200 with no law text: `diariodarepublica.pt`, `normattiva.it`,
  `gazzettaufficiale.it` (both the `/eli/` and `caricaDettaglioAtto` forms),
  `belex.sites.be.ch`, `bl.clex.ch`, `portaljuridicandorra.ad`,
  `cnpdc.gov.md/ro/print/*`, `zh.ch/.../zhlex-ls/erlass-*.html` (a metadata
  shell whose PDF link is itself a redirect stub).
- Blocked: `ris.bka.gv.at` 503s behind a bot check -- use
  `jusline.at/gesetz/<law>/gesamt`. `guernseylegalresources.gg` is
  Cloudflare-challenged; `gov.gg` article pages carry the route instead, and
  `gov.gg` has no `/search`. `legis.md` 403s. `ohchr.org` 403s.
  `student-wellbeing-services.gov.mt` 403s a plain curl but yields to
  terr-verify's own fallback.
- Dead or wrong: `edu.ro/.../Ordin_6552_2011.pdf` now 404s and is stale in the
  entries' docLinks; `mmuncii.ro` 503s for O1985/2016 while `dspalba.ro`,
  `cjraedolj.ro` and `edums.ro` all serve it; `consigliograndeegenerale.sm`
  serves a PDF under a .html URL and, for Legge 141/1990 only, a four-page
  relazione rather than the law.

### Two pipeline traps, both silent

1. A drafter's new sources must come back under `sources` or `addDocLinks`.
   terr-verify drops a `docLinks` key **without a word**, and five genuine
   sources passed the gate, reached the applier and vanished while the run
   reported success.
2. `apply-coding.js` REPLACES a many-grained field's array. A recode written
   by hand from a report rather than from the stored rows would have dropped
   a duty_org and moved four `obliges` levels while printing a clean success
   line. `research/tools/set-coding-value.js` exists so that cannot happen:
   it deep-copies the stored rows and changes one column on one row.

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
