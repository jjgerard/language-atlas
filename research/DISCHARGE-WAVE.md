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

## A gazette with an llms.txt can be swept EXHAUSTIVELY, not sampled

`lex.ao` turned out to publish a machine-readable index, and finding it changed
an Angolan question from "we looked and did not find it" into "it does not
exist". Worth checking for on every legal host before starting a sample:

    lex.ao/robots.txt    ->  points at lex.ao/llms.txt
    lex.ao/llms.txt      ->  per-year indexes AND FULL TEXT for 2020-2026
    lex.ao/sitemap.xml   ->  2,002,190 bytes, 11,715 document URLs

That allowed 7,286 diplomas to be read: 4,835 as full text for 2020-2026 (nine
files, ~112 MB) and 2,451 pre-2020 pages fetched individually and parsed from
their `<article>`, with zero fetch errors. The result was a negative that can
be relied on -- exactly ONE instrument in eleven years cites art. 107(3) of
Angola's Lei 17/16, it wrote nothing on the subject, and it has been revoked.

`lex.ao` traps found on the way:
- `lex.ao/docs/presidente-da-republica/<year>/` is **404 with 0 bytes**. There
  is no year directory listing; the sitemap is the only enumeration.
- The `.md` route exists only from 2020. On a 2017 document it 404s with 0
  bytes AND `content-type: text/markdown`, which looks like a valid empty
  document rather than a miss.
- `sitemap_index.xml` and `wp-sitemap.xml` are both 404. Only `sitemap.xml`
  and `llms.txt` work.
- `lex.ao/?s=` is JS-driven: 200 with no links at all, so a document can look
  absent when it is there. Find it by search engine, then fetch `/docs/`.

## Three more 200s that are refusals, and one stale link on a live page

The pattern is now frequent enough to state as a rule: **a 200 means the server
answered, not that it answered your question.** Check the final URL and the
body, not the status.

- `med.gov.ao/ao/legislacao/` -- 200, 26,879 bytes, and it is a **redirect to
  `med.gov.ao/ops/404`**. (`www.mined.gov.ao` does not resolve at all, curl 6;
  the live name is `med.gov.ao`.)
- `lawsofmauritius.govmu.org/portal/regulations` -- 200, 63,259 bytes, but the
  listing is an AJAX table with no `<a href>` for any regulation, and
  `?keywords=Education&searchType=title` returns **byte-identical** 63,259
  bytes: a search that silently ignores the query. Its
  `/portal/viewlegislationdocument/...` returns 200 with a 14,901-byte
  "Invalid Request" page for anything but an exact stored title.
- `publicnotice.govmu.org/publicnotice/?p=<id>` serves a pdfjs viewer shell --
  200, ~81 KB, ~730 bytes of text. The document is at the page's
  `wp-content/uploads/<yyyy>/<mm>/` path.
- **A live Ministry page can link a dead file.** Mauritius's National
  Equivalence Committee page links its own admission form at
  `education.govmu.org/Documents/downloads/Documents/FORM - ADMISSION TO A
  SCHOOL IN MAURITIUS.pdf`, which is **404**. The live copy is under
  `Documents/2025/NEC/`. A drafter following the obvious link would conclude
  the form does not exist.

Mauritius law, for the next attempt: the **Education Act 1957** serves cleanly
from three hosts (`mauritiuslii.org/akn/mu/act/1957/39/eng@2017-06-30`,
`attorneygeneral.govmu.org` A-Z Acts, `education.govmu.org`). Its **subsidiary
legislation cannot be swept** -- the Attorney-General's subsidiary index is
gone (404 on every path tried) and the replacement portal is the broken AJAX
table above. `supremecourt.govmu.org` is curl 28. The consolidated Education
Regulations 1957 were never reached; regulation 10 had to be sourced from the
Ministry quoting it verbatim in a PQ compilation plus two amending instruments.

Minor: `education.govmu.org` emits some hrefs with **unencoded spaces** and
curl refuses them ("URL rejected: Malformed input to a URL function").
Percent-encode before fetching.

## UNESCO PEER: the profiles did NOT move, and the new path 404s at 1.8 MB

Checked 2026-09-27, after two drafters in one session each spent fetches
finding this out separately.

**The per-country profiles are still at `education-profiles.org` and still
serve 200.** Verified the same day:

    education-profiles.org/northern-africa-and-western-asia/morocco/~inclusion   200   49,587b
    education-profiles.org/sub-saharan-africa/nigeria/~inclusion                 200   49,005b
    education-profiles.org/eastern-and-south-eastern-asia/                       200   45,000b approx
      democratic-peoples-republic-of-korea/~inclusion

What moved is the INDEX. `www.unesco.org/gem-report/en/peer` is 200 and is the
landing page. **There is no per-country profile under it**, and asking for one
is the byte-count trap at its worst:

    www.unesco.org/gem-report/en/peer/morocco    404   1,789,233b

A 404 serving 1.8 MB of HTML. `terr-verify.js` is safe because it tests the
status code first, and its `TINY = 1000` second-opinion rule is aimed at the
opposite failure -- a 200 carrying a few hundred bytes of refusal. But a
drafter using WebFetch sees a large body come back and can easily read it as a
page. **Check the status code. The size tells you nothing in either direction:
desc.gov.im rejects at 200 in 269 bytes, and this accepts nothing at 404 in
1.8 MB.**

Two further PEER facts that still hold:
- WebFetch's extractor returns "no content" on these pages. **Use curl and
  strip tags.**
- The Saint Vincent PEER URL resolves to **Colombia** boilerplate -- wrong
  rather than dead, which no status code will tell you. Suspect the other
  Caribbean profiles.

## gibraltarlaws.gov.gi serves a stale consolidation at 200, and it changes a duty

The guessable upload path fetches cleanly and is out of date:

    /uploads/legislations/education-and-training/1974-11/1974-11(29-11-12).pdf
      200, 325,035b, and the document stamps itself "This version is out of date"

On the Education and Training Act s. 53B that stale text reads "the Director
**shall** ... take measures", where the current consolidation reads "may use
his best endeavours", softened by Act 2023-19 in force 23.12.2024. Citing the
guessable path would have turned a discretion into a duty.

**Use the `/download` form instead**, which is current:

    /legislations/education-and-training-act-414/download     200, 432,000b approx

## desc.gov.im rejects the gate's own Node client

`desc.gov.im` hands Node **269 bytes of an F5 "Request Rejected" page at HTTP
200**, and hands WebFetch the same. Only `getViaCurl` with a full Chrome UA
gets the real page. This is already handled -- `terr-verify.js` sends any 200
under `TINY = 1000` bytes for a second opinion and names this host in the
comment -- so a bullet citing it does gate. Worth knowing when drafting, since
a drafter's own fetch will show the rejection.

`legislation.gov.im` is a different matter: **curl error 35, "Recv failure:
Connection was reset"**, TLS handshake completing and then reset, unchanged by
`--tlsv1.2` or a browser UA. The Isle of Man Education Act 2001 could not be
read.

## logir.fo returns the search form at 200 for a near-miss slug

A wrong slug gives an honest 404 (1,245 bytes). A **nearly** right one --
missing the tail of a long title -- returns **200 with 45 KB of the site
search form** and no law text. Byte count does not distinguish that from a
short regulation. The full-title slug returns 81 KB with the text.

## Dead or blocked, added 2026-09-27

- **`www.men.gov.ma`** -- Morocco's ministry has been rebuilt on Drupal and the
  2013 and 2018 circulars are **gone**: `/Ar/Documents/Note1391805102018.pdf`
  and siblings return **404 with a 74,689-byte HTML error page**. Its
  `/مذكرات` archive is 200 but carries only 2026 notes. Morocco's primary
  circulars are not retrievable from the ministry; secondary sources are the
  only route.
- **`education.gouv.sn`** -- DNS does not resolve, curl 6, with and without
  `www`. The name is dead.
- **`www.jo.gouv.sn`** -- TCP connect fails after 21 s, curl 28. Senegal's
  official gazette is unreachable.
- **`refworld.org`** -- 403, 5,662-byte challenge page. Put it beside
  `ohchr.org`.
- **`legislatie.just.ro`** -- **curl 56, "schannel: server closed abruptly
  (missing close_notify)"**, five document ids tried, unchanged by
  `--tlsv1.2`. A TLS-layer failure, so the curl fallback cannot rescue it
  either. `dreptonline.ro` carries republished texts as clean HTML and is what
  Romania's Art. 132 citation rests on, labelled as a mirror.
- **`angolex.com`** -- 403 behind a JS interstitial, 2,482 bytes. It was
  believed to be the only host carrying Angola's Decreto Presidencial 163/25
  and it is NOT: `lex.ao/docs/presidente-da-republica/2025/decreto-presidencial
  -n-o-163-25-de-15-de-agosto/` serves the whole diploma plus its annexed
  Regulamento at 200 / 182,478 bytes on a plain curl. The wrong belief came
  from `lex.ao/?s=` being JS-driven and returning 200 with no links, so the
  document looked absent. **Find lex.ao documents by search engine, then fetch
  the /docs/ path directly.**
- **`tdh.tierradehombres.org`** -- 403, 5,686 bytes.

## Two wrong documents behind right-looking links

Neither of these is a status-code problem and no fetch check catches them.

- `data.unhcr.org/en/documents/download/123045` serves 200,
  `application/pdf`, 981,712 bytes -- and it is the **Ethiopia** education
  factsheet, with zero occurrences of "Yemen", behind a Yemen-looking search
  title.
- A **FAOLEX** id taken from a search snippet is not a guarantee of the
  document you wanted: `ang205985.pdf` serves 200 and 12.8 MB and turns out to
  be Diario da Republica I Serie N.o 184 of 29 September 2021, on child labour
  and a visa protocol.

Same family as the Saint Vincent PEER URL resolving to Colombia. **Open the
document and check it is the one you asked for.**

## Extractor quirks that break a quote

- The **NATLEX** Burundi PDF's text layer inserts a space after some capital C
  -- "C onstitution", "C HAPITRE". A quote containing such a word survives only
  on terr-verify's spaces-removed fallback, so avoid those words when choosing
  a span.
- WebFetch reported both `data.unhcr.org` PDFs as "encoded image data / Adobe
  Illustrator metadata" and read nothing, while `research/tools/pdftext.js`
  extracted 33 KB and 617 KB of text from the same bytes. **Always extract PDFs
  with the project's own tool.**

Worth adding to the works-cleanly list: **`agc.gov.bn`** (Brunei), but only on
its new WordPress route -- `/services_brulaw-2/?agc_letter=E` to
`/documents/education-act/` to `/wp-content/uploads/2026/07/<ACT>.pdf`. The old
`AGC%20Images/LAWS/ACT_PDF/cap210.pdf` path is **404 with a 15,795-byte
WordPress error page** while search engines still index and quote it. The
listing page emits hrefs with a doubled slash; normalise before citing. Also
clean: `lex.uz`, `lex.ao` (document pages -- but `lex.ao/?s=` search is
JS-driven and returns 200 with no links), `dge.mec.pt`, `cnred.edu.ro`,
`www.edu.ro`, `jerseylaw.je`, `gov.je`, `gov.gg`, `undirvising.fo`,
`unicef.org/<country>/media/*.pdf`, `help.unhcr.org`, `faolex.fao.org`,
`yemen-nic.info` (`/ministations/detail.php?ID=` and `/db/laws_ye/detail.php?
ID=`, http and https both 200, UTF-8, full law text), `agoyemen.net`,
`natlex.ilo.org/dyn/natlex2/.../files/download/`, `yaga-burundi.com`,
`sosmediasburundi.org`.

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
