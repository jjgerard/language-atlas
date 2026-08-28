# Registers that will not serve documents

`ALLOWLIST.md` tells a cloud session which hosts to allow. This is its
inverse: hosts that refuse every client available to this pipeline, hosts
that answer but return no text, and the substitute that worked instead.

It exists because the same hosts get re-probed by every drafting pass. Ten
agents covering Europe in August 2026 each independently discovered that
Légifrance is behind Cloudflare and that Austria's RIS answers with a Myra
challenge, and each spent real effort finding the same way around. That is
the cost this file is meant to remove.

**A blocked register is not a blocked place.** Every substitute below is a
document that answered a plain GET, and most of them are the state's own
publication reached by a different door. Where no substitute exists the unit
stays a stub and says so in its `stubNote` — see Gibraltar and the Isle of
Man, which are on the atlas as places whose *register* could not be read,
not as places nothing is known about.

Dates are when the behaviour was last observed. `[checked here]` marks a
host tested directly from this machine with curl on 28 August 2026; the rest
are as reported by drafting agents in the same run.

## 1. Refuses every client

No header or client available here gets a document out of these. Do not
spend a pass on them.

| Host | Failure | Use instead |
|---|---|---|
| `legifrance.gouv.fr` | Cloudflare challenge; 403 to curl `[checked here]` | `education.gouv.fr/bo` for the curriculum arrêtés |
| `ris.bka.gv.at`, `ogd.ris.bka.gv.at` | Myra "Security Check" 503 to curl `[checked here]` | `jusline.at` consolidated text; confirm Stammfassung dates against the OGD JSON API at `data.bka.gv.at`, which does answer |
| ~~`legislation.gov.im`~~ | **CORRECTED — it no longer 403s, it returns 200 with a 269-byte challenge stub.** See section 7 | still unusable by this pipeline, but a challenge rather than a refusal |
| ~~`gibraltarlaws.gov.gi`~~ | **WITHDRAWN — it was an outage, not a block.** See section 6 |  |
| `guernseylegalresources.gg` | Cloudflare `cf-mitigated: challenge`, 403 on every path including root | `gov.gg` serves States resolution PDFs, but the enacted Education (Guernsey) Law 1970 and the Prevention of Discrimination (Guernsey) Ordinance 2022 live only on the blocked host |
| `isap.sejm.gov.pl` | Imperva/Incapsula; `download.xsp` returns a self-referential 302 cookie challenge and never yields the file | `dziennikustaw.gov.pl`, pattern `D{YYYY}{poz}01.pdf` |
| `lex.bg` | 403 to every request | `dv.parliament.bg`, the official gazette, full act text in literal UTF-8 |
| `e-tar.lt` | 403 on plain GET | `e-seimas.lrs.lt/rs/legalact/TAD/{id}/` |
| `gallilex.cfwb.be` | WAF "Request Rejected" | `ejustice.just.fgov.be` `article_body.pl` |
| `legis.md` | Cloudflare "Just a moment", 403 on every path | ministry-published PDFs with real text layers |
| `mon.bg` | 403 | `nio.government.bg` |
| `svenskforfattningssamling.se/doc/` | 403 to plain GET | none; Sweden rests on the base Skollag and Skolförordning from `riksdagen.se`, so its amendment acts are not represented |
| `admin.ch/opc/...` | 403 on the legacy classified-compilation URLs | the Fedlex filestore, below |

## 2. Answers, but returns no text

These are alive. They render the act in JavaScript, so a plain GET gets a
shell. Several have a side door that serves the same document as data —
prefer the side door, because it is still the state's own publication.

| Host | Failure | Side door or substitute |
|---|---|---|
| `retsinformation.dk` | JS-only on normal document URLs | `retsinformation.dk/eli/.../xml` |
| `finlex.fi` | JS-only | `opendata.finlex.fi/.../akn/fi/act/statute/...` |
| `riigiteataja.ee/akt/{id}` | Angular shell | `riigiteataja.ee/public-api/api/v1/akt/{id}/blob-html` |
| `fedlex.admin.ch`, `fedlex.data.admin.ch` HTML | Angular SPA | the `filestore` HTML files, located via the Fedlex SPARQL endpoint |
| `slov-lex.sk`, `zakonypreludi.sk` | JS shell or Cloudflare challenge | `slov-lex.sk/static/pdf/...` |
| `pisrs.si` | JS shell | `uradni-list.si` |
| `njt.hu` | does not resolve | `net.jogtar.hu` (a consolidator — see the note at the end) |
| `gazzettaufficiale.it` | page furniture only for `/eli/.../sg` and `caricaDettaglioAtto` | `normattiva.it` `uri-res/N2Ls` URNs. Normattiva's own `esporta/attoCompleto` needs a session and errors out |
| `dre.pt`, `diariodarepublica.pt`, including their ELI URLs | OutSystems SPA, returns a 2 KB shell | `files.diariodarepublica.pt` issue PDFs |
| `legimonaco.mc` | JS-only SPA | `journaldemonaco.gouv.mc` |
| `bopa.ad`, and `portaljuridic.ad` which does not resolve | JS-only shell | `portaljuridicandorra.ad` |
| `pravno-informacioni-sistem.rs`; `sluzbeniglasnik.rs` does not resolve at all | SPA, no act text at `/eli/`, `/services/` or `/extref/` | `paragraf.rs` (a consolidator) |
| `portaljuridic.gencat.cat`, `dogc.gencat.cat` | act body rendered in JS | `portaldogc.gencat.cat` PDFs — but see section 4, that host needs curl |
| `edk.ch` | heavy JS | `edudoc.ch` (HarmoS) and the SODK file store |
| `sllist.ba` | would not serve the 2003 gazette PDFs at any path tried | `paragraf.ba`, `natlex.ilo.org` (consolidators) |
| `et.gr` | 301-redirects its FEK download API to a bare IP with an untrusted certificate | `minedu.gov.gr` FEK PDFs |
| `legislatie.just.ro` | drops the connection (curl error 56, socket hang up) | `edu.ro` PDFs |
| `edu.gov.ru`, `docs.edu.gov.ru` | no answer at all, TLS/connection failure | see section 3 |
| `stjornartidindi.is` | HTTP 500 | `althingi.is`, `island.is` |
| `gesetze.li` LR-number paths | "Wartungsarbeiten" maintenance page | `gesetze.li/konso/pdf/{lgblId}` |
| `legislation.mt/eli/.../pdf` | viewer shells, not the PDF | `legislation.mt/getpdf/{id}` |

## 3. Answers, but nothing is quotable

The document arrives and cannot be quoted, so `hist-verify` drops the row
whatever the drafter saw. This is not a network problem and no allowlist
fixes it.

- `publication.pravo.gov.ru` — scanned image PDFs, no text layer. This is
  why the three Russian FGOS rows are quoted from `fgos.ru`, a private
  aggregator, and why they are the weakest provenance on the European pass.
- `cylaw.org` KDP regulation PDFs — image-only, or a broken symbol font.
  This is why no Cyprus foreign-language instrument could be evidenced and
  `fl|CY` came back `insufficient`. CyLaw's consolidated HTML is
  windows-1253 and arrives as mojibake; use its `nomoi/arith/*.pdf` scans.
- Portugal's Lei 46/86, the Lei de Bases — the 1986 PDF is a scan with no
  text layer.
- ~~Guam Compiler of Laws — CID-encoded; extraction returns garbage.~~
  **WITHDRAWN 28 August 2026.** The `col.guamcourts.gov/sites/default/files/*.pdf`
  copies extract cleanly with plain `pdftotext`, and Guam was documented from
  them. Either the earlier attempt used a different host — `gcic.guam.gov` is
  now NXDOMAIN and `guamlegislature.gov.gu` likewise — or the CID problem was
  the pre-fix extractor rather than the file. Kept, struck through, because a
  wrong entry here sends a later pass to a worse source, and knowing an entry
  was withdrawn is worth more than deleting it.

## 4. Refuses Node and Python, but answers curl

This class is NOT blocked, and was being lost as though it were. These hosts
fingerprint the TLS handshake rather than reading headers, so no
User-Agent, Accept, Accept-Encoding or Referer combination gets past them —
all four were tested against `rm.coe.int` and all were refused, on headers
byte-identical to a curl call that succeeds.

`hist-verify.js` therefore falls back to curl when its own client is
refused. That recovered 23 of 26 fetch failures on the pass over the
research record.

- `unicef.org` — 403 to Node, 200 to curl `[checked here]`
- `rm.coe.int` — 403 to Node, 200 to curl `[checked here]`
- `onlinelibrary.wiley.com` — same `[checked here]`
- `portaldogc.gencat.cat` — `SSLV3_ALERT_HANDSHAKE_FAILURE` to a standard
  Python client, 200 to curl `[checked here]`. A Catalan row was dropped for
  this before the fallback existed, and has since been restored.

If you meet a host that answers curl and refuses the tool, it belongs here,
not in section 1.

## 5. North America, from the US and Canada pass

Added 28 August 2026 while filling sub-national `dld` policy history for 44
US states and 10 Canadian provinces and territories. `[checked here]` again
marks a host retested directly from this machine.

### Refuses every client

| Host | Failure | Consequence |
|---|---|---|
| the whole `nh.gov` estate — `gencourt.state.nh.us`, `gc.nh.gov`, `education.nh.gov`, `nh.gov`, `sos.nh.gov`, `oplc.nh.gov`, `dhhs.nh.gov` | 403, or the connection closed abruptly, to curl with a full browser UA `[checked here]` | **New Hampshire is the only unit in the pass marked `insufficient` for access rather than for absence.** See the note below |
| `webserver.rilin.state.ri.us`, and its successor `webserver.rilegislature.gov` | connection refused on 443, then a connect timeout `[checked here]` | Rhode Island has Board of Education regulations but no statute row |
| `ncleg.gov`, `ncleg.net` | Cloudflare challenge, 403 to curl with a browser UA, HTML and PDF alike | North Carolina has one row; the statutory history of Art. 9 of Ch. 115C is unreachable |
| `nebraskalegislature.gov` | TCP connection refused | The Nebraska Special Education Act itself is unrecorded; the two Nebraska rows are Department of Education rules |
| `leg.state.nv.us` | Cloudflare interstitial, 403 | Nevada rests on Cornell LII; no NRS-level row |
| `law.justia.com`, `regulations.justia.com` | 403 to every agent that tried it, for four different states | — |
| `sos.nebraska.gov/rules-and-regs/`, `nebraska.gov/nesos/` | 403 on the rules paths while the site root returns 200 | — |
| `sos.mo.gov` | 403 | no Missouri administrative-code row |
| `apps.azsos.gov` | 403 for both .pdf and .htm forms | A.A.C. R7-2-401 could not be dated |
| `content.leg.colorado.gov`, `leg.colorado.gov` | 403 for the CRS PDF and bill PDFs | no Colorado statutory row; its rows are State Board rules |
| `apps.gadoe.org` | connection refused or timed out on 443 | — |
| `wvde.us` | 403 | WV Board Policy 2419 could not be dated |
| `laws.yukon.ca` | 403 to a full browser UA `[checked here]` | Yukon uses a web.archive.org mirror of the same PDF |
| `open.alberta.ca` | Cloudflare interstitial on the dataset download path | the 2004 Standards for Special Education came from `files.eric.ed.gov` |
| `casetext.com` | 410 on document paths. NOT retired site-wide — the root returns 200 `[checked here]` | — |

### Answers, but returns no text

| Host | Failure | Side door |
|---|---|---|
| `legis.ga.gov` | ~1.5 KB JavaScript shell | none found; Georgia Code sections unavailable officially |
| `rules.sos.ga.gov` INDIVIDUAL rule pages | JS shell, ~5.7 KB | the CHAPTER pages (`/gac/160-4-7`) serve full text server-side — but carry no Authority/History notes, so adoption dates are not obtainable there |
| `le.utah.gov` section pages | JavaScript shell | the dated version files, e.g. `C53E-7-S201_2022050420220504.html`, which carry the text AND the "Enacted by Chapter N, YEAR" line |
| `rules.mt.gov` | an 894-byte stub with no rule content | ARM 10.16 not obtainable |
| `rules.wyo.gov` | `DownloadFile.aspx` returns a 17-byte file | Wyoming Ch. 7 special-education rules not obtainable |
| `codes.findlaw.com` | serves text but STRIPS the session-law credit lines | usable for wording, useless for dating |
| `ksde.gov` PDF path | returns 245 bytes of HTML, not the PDF | — |

### Moved, not blocked

- `leg.mt.gov/bills/mca/...` → `archive.legmt.gov/...` → **`mca.legmt.gov/...`**. Only the
  last serves content, and its section pages carry the "History:" source notes
  that date every Montana row.
- `sos.state.co.us` 403s while **`coloradosos.gov`** serves the identical path.
  Use the latter.
- `ksrevisor.org` redirects to **`ksrevisor.gov`**.

### UA-sensitive, and therefore NOT blocked

This is section 4 in a different costume, and it cost real provenance before
it was understood. `hist-verify.js` sends the FULL browser User-Agent string
and falls back to curl. A host that refuses a bare request or the short
`Mozilla/5.0` may still serve the gate perfectly.

- `nunavutlegislation.ca` — no UA gives 200, a full browser UA gives 200, but
  the short `Mozilla/5.0` gives a 403 challenge. An agent assumed that short
  string was what the checker sends and moved all three Nunavut rows onto
  web.archive.org mirrors. The official Territorial Printer PDFs answer the
  real UA with 200 at byte-identical sizes `[checked here]`, and the rows
  were moved back.
- `flrules.org` — 403 to bare curl, serves fine with a browser UA.

**Test with the full string before writing a host off or reaching for an
archive mirror.**

### Second wave: the remaining US states and eastern Canada

| Host | Failure | Consequence or way round |
|---|---|---|
| `legislature.mi.gov` | Check Point "UserCheck" WAF, 403 on every path including root, identical 19,283-byte block page. Unchanged by full browser UA, by `Accept`/`Accept-Language`/`Sec-Fetch` headers, by HTTP/1.1, or by TLS 1.2 pinning | — |
| `legislature.michigan.gov` | the same WAF from the TLS side: a self-signed certificate, and with `-k` the server closes abruptly | **Michigan statutes (MCL) are unreachable.** Every consolidator tried is blocked, gone or JS-walled, so Michigan's 1976 row is sourced to the Revised School Code authority citation printed in the official rules document, and its 2024 dyslexia screening act (PA 146) could not be sourced at all |
| the whole `yukon.ca` estate — `laws.yukon.ca`, `legislation.yukon.ca`, `yukon.ca` | 403 to a full browser UA `[checked here]` | Second whole-estate refusal after `nh.gov`. Yukon's one row cites a web.archive.org mirror and is currently unproven, because archive.org is rate-limiting |
| the whole `gnb.ca` estate — `laws.gnb.ca`, `www1`, `www2`, `www.gnb.ca` | Cloudflare interstitial, 403 to a full browser header set | **`legnb.ca`, the Legislative Assembly, is NOT blocked** `[checked here]` and serves bill text as single-language English HTML at `/content/house_business/<leg>/<sess>/bills/Bill-NN-e.htm`. That also avoids the bilingual two-column extraction problem in the consolidated PDFs |
| `statutes.capitol.texas.gov` | the identical 250,874-byte JavaScript shell for every path, `/Docs/ED/htm/`, `/Docs/ED/pdf/` and `GetStatute.aspx` alike | `capitol.texas.gov` enrolled bill text, which serves real HTML |
| `texreg.sos.state.tx.us` | the Texas Administrative Code has moved to `texas-sos.appianportalsgov.com`, an Appian portal, JS-only | 19 TAC ch. 89 unreachable; no Texas admin-rule rows |
| `oregonlegislature.gov` | connection refused or timed out on 443, every retry and variant `[checked here]` | `oregon.public.law` (consolidator) — all five Oregon rows |
| `secure.sos.state.or.us` | BIG-IP/ASM JavaScript challenge | OAR 581-015 unreachable |
| `oscn.net` | connection failure on 80 and 443 `[checked here]` | Oklahoma statute text unreachable; only enrolled bills usable |
| `rules.ok.gov` | React SPA, empty shell | — |
| `akleg.gov/basis/statutes.asp`, `aac.asp` | always the same ~15 KB shell regardless of query; the Folio `folioproxy.asp` backend answers but IGNORES the `[JUMP:'14.30.180']` query and returns Title 01 every time | `akleg.gov/PDF/32/Bills/*.PDF` works |
| `alisondb.legislature.state.al.us` | DNS non-existent; the old ALISON host is retired | — |
| `alison.legislature.state.al.us` | JavaScript-only. Worse, `/api/code-of-alabama` **ignores** the `section` parameter and returns an unrelated ~700 KB bulk tree; `/section/`, `/search?q=` all 404 | **No plain-GET url exists for a Code of Alabama section or an enrolled act.** Alabama's rows come from the administrative code instead |
| `regulations.delaware.gov` | Angular shell, an identical 65,540-byte body for every path INCLUDING the `.pdf` ones | `archive.regulations.delaware.gov`, Delaware's own retired-but-live static site, serves both the Administrative Code and Register final orders |
| `palegis.us`, `legis.state.pa.us` statute viewer | 200 OK, but the body is injected by JS into an `about:blank` iframe; `txtType=PDF` returns HTML | session-law text at `palegis.us/WU01/LI/LI/US/HTM/<year>/0/<actnum>..HTM` |
| `mgaleg.maryland.gov/.../StatuteText` | JS-rendered, no statute text in the HTML | the same host's `Legislation/Details/` pages and `RS/Chapters_noln/CH_*.pdf` chapter PDFs do serve |
| `dsd.maryland.gov/regulations/Pages/<COMAR>.aspx` | 404, a 13-byte body, for every chapter tried | COMAR 13A.05.01 unobtainable, so Maryland has no regulation row. `dsd.maryland.gov/MDRIssues/<n>/Assembled.aspx` DOES serve full Register issues if a later pass wants to hunt an adoption notice by issue number |
| `regs.nysed.gov` | connection failure, no response | — |
| `dos.ny.gov` | 403 WAF | This is the official publisher of 8 NYCRR, so New York's two rows cite `nysed.gov` instead — whose own disclaimer calls its regulation text "unofficial". Category 2, and worth upgrading if a route to 8 NYCRR is found |
| `legisquebec.gouv.qc.ca` | **502 on every path including root** `[checked here]` | An OUTAGE, not a block — retry it. Quebec's rows came from the Éditeur officiel at `publicationsduquebec.gouv.qc.ca`, which is category 1 anyway |

### Silent failures: the dangerous class

These do not error. They return something that looks like a document and is not, so a drafter believes it has read the text and the gate then rejects every quote taken from it.

- **`ars.apps.lara.state.mi.us` with `&ReturnHTML=True`** — returns a 1.3 MB HTML rendering with per-glyph absolutely-positioned `<span>`s. The words are shredded and no tag-stripping extractor can find any phrase in it. **Dropping that one parameter returns the genuine 265 KB PDF**, which extracts cleanly. An earlier brief passed the `ReturnHTML=True` form on, and any pass reusing it verbatim fails the gate no matter how good its quotes are.
- **`arkleg.state.ar.us` act PDFs** — `/assembly/<yr>/<sess>/Acts/ActNNNN.pdf` and `/Home/FTPDocument?path=` both return a **zero-byte `image/gif`**. The working form is `/Acts/FTPDocument?path=%2FACTS%2F<sess>%2FPublic%2F&file=<n>.pdf&ddBienniumSession=<bien>%2F<sess>`.
- **`col.guamcourts.gov`** — served one request as HTTP **200** with
  `Content-Type: application/pdf` and an HTML "Page Not Found" body. Three
  immediate retries returned the genuine PDF, so it is intermittent rather than
  a block. Both gates now decide PDF-ness from the `%PDF-` magic bytes rather
  than the header, and log when a header claims pdf and the bytes disagree —
  before that fix an HTML error page went to the PDF extractor, returned
  nothing, and read downstream as every quote on the page being unverifiable.
- **`codes.findlaw.com`** — serves the text but strips the session-law credit lines. Usable for wording, useless for dating.
- **`ksde.gov`** PDF path — returns 245 bytes of HTML, not the PDF.
- **`rules.mt.gov`** — an 894-byte stub. **`rules.wyo.gov`** `DownloadFile.aspx` — a 17-byte file.

### Quote hazards in extracted text

Not host problems, but they cost rows the same way, and each one was found by a drafter losing rows to it:

- **Arkansas and Louisiana bill PDFs** interleave margin line numbers into the extracted text. A quote spanning a line wrap picks up a stray digit and fails. Keep each quote within one source line.
- **Montana** section cross-references are hyperlinked, so extracted text reads `20-7-420 ,` with a space before the comma. Avoid quoting across a section reference.
- **Michigan MARSE** prints each rule's `History:` line *before* the next rule's heading, so it is easy to attribute a date to the neighbouring rule. Read the block, not the adjacency.
- **Slovak PDFs** carry non-breaking spaces that `pdftotext` normalises and PyMuPDF preserves; **Croatian** gazette pages are hard-wrapped. Choose quotes that are NBSP-free and within a single source line so they are identical under either extractor.

### Intermittent, not blocked

Recording these as blocked would send a later pass to a worse source for nothing.

- `princeedwardisland.ca/en/` — a Radware bot check stopped one agent, and served me 200 with 125 KB on retest `[checked here]`. Its `/sites/default/files/` static path serves PDFs regardless, and is the reliable way in.
- `rules.sos.ga.gov` — served one agent, then 403'd me twice `[checked here]`. Georgia's 2007 row is unproven for this reason rather than disproven.
- `web.archive.org` — began returning **429 Too Many Requests** during the run and was still doing so an hour later `[checked here]`. Its CDX API kept working. This is a real operational constraint on any pass that leans on archive mirrors, and it is why Yukon's only row is currently unverified.

### A geography caveat worth keeping

An entire government estate refusing every request — HTML and PDF,
legislature and agencies alike, as `nh.gov` and `yukon.ca` both do — looks more like
geo-blocking of non-US traffic than like bot-blocking. That is a hypothesis,
not a finding: it has not been tested from a US address. It matters because
the two have opposite consequences. If it is bot-blocking, New Hampshire is a
permanent stub. If it is geo-blocking, New Hampshire is merely unreachable
FROM HERE, and a run from a US or Canadian host would fill it and Yukon with
it. Do not write either unit off until someone has tried from inside the
country.

## 6. Withdrawn: an outage is not a block

`gibraltarlaws.gov.gi` was recorded in section 1 as refusing every client,
on two direct tests from this machine that each accepted a connection and
then returned zero bytes before timing out. On the strength of that, four
user-facing `stubNote`s told readers Gibraltar's register could not be read,
and a drafting batch was told not to bother with it.

Later the same day it answered **200 in 0.46 seconds** on the root, and an
agent pulled seven verified policy-history rows out of it. It was down, and
it came back.

The document pattern is worth recording, because the landing page does not
serve the text: `/legislations/<slug>` carries an `iframe` whose `src` points
at `.../uploads/legislations/<topic>/<actno>/<file>.pdf`, and that `uploads/`
path serves the PDF to a plain GET.

**The lesson for this file.** Two failed probes an hour apart look exactly
like a permanent block and are not one. Anything recorded here on the
strength of connection timeouts alone should be re-probed before a unit is
written off, and a `stubNote` should not assert that a register cannot be
read unless the failure has been seen across days rather than minutes.
`legislation.gov.im` is the contrasting case and stays in section 1: it
returns a deliberate 403 challenge page, which is a server choosing to
refuse rather than a server that is down. Re-tested today, still 403.

## 7. The dld history sweep, and what encoding cost

Added 28 August 2026 on the pass that took `dld` policy history to 279 of the
289 units that can carry one. `[checked here]` marks a host retested directly
from this machine.

### Encoding: the class that cost the most

None of these look like failures. The document arrives, the extractor runs,
and the quote is simply not found — which reads exactly like a drafter having
made it up. Five separate cases turned up in one day, and each was silently
discarding correct work.

| What | Where it bit | Fix |
|---|---|---|
| **`pdftotext` defaults to Latin-1 on this machine**, not UTF-8 | Nearly cost Türkiye all three rows — every ğ and ş silently dropped, î a replacement char, which reads exactly like a broken font in the source | `-enc UTF-8`, which `pdftext.js` passes. Found independently by two agents |
| **A page served as ISO-8859-1 and read as UTF-8** | `impo.com.uy` — 3,675 replacement characters, both Uruguayan rows lost, quotes match perfectly under latin-1 `[checked here]` | Both gates now decode UTF-8 **and** latin-1 and search the union |
| **A page that entity-encodes accents** | `dof.gob.mx` serves `educaci&oacute;n especial`, never `educación` in any charset. `strip()` blanked entities to a space, giving `educaci n` | `strip()` now decodes entities instead of blanking them |
| **Header charset and meta charset disagree** | `funcionpublica.gov.co` sends `charset=UTF-8` while its meta says ISO-8859-1, and the bytes are UTF-8. A client trusting the meta tag mangles every accented Colombian quote | Trust the bytes; decode both ways |
| **windows-1254** | `resmigazete.gov.tr/eskiler/**.htm` — mojibake on every Turkish diacritic to a UTF-8 reader | Prefer `mevzuat.gov.tr/File/GeneratePdf?...` |

### Silent failures: more of the dangerous class

Each returns a success status and something that is not the document.

- **`legislation.gov.im` — the entry in section 1 is now WRONG and this is the
  correction.** It no longer returns a flat 403. It returns **HTTP 200 with a
  269-byte challenge stub** `[checked here]`, which is worse, because 200 reads
  as success. An agent reported getting the real 878 KB act through with a
  cookie jar and a Referer; I could not reproduce that, and the gate's own
  client got the stub, so the two Isle of Man rows drafted from it were
  correctly dropped as unverifiable. Treat as unusable by this pipeline, but
  note it is a challenge, not a refusal, so a browser-shaped client may get
  through where curl and Node do not.
- `legislation.nsw.gov.au/view/whole/html/asmade/...` — **200 with zero bytes**.
  `/view/pdf/asmade/act-YYYY-NNN` serves the real as-made PDF.
- `sso.agc.gov.sg` — **202 with a zero-byte body** when hit too fast; three
  requests in a row triggered it. Wait and retry; `?ViewType=Pdf` serves clean.
- `moeys.gov.kh` — the **same 3,426-byte shell for every path**, PDFs included.
- LeyChile's PDF export `/servicios/Consulta/Exportar?...` — **200, zero bytes**.

### Side doors found on this pass

Worth more than the blocks, because each one is a register that stays usable.

| Register | The door that works |
|---|---|
| `dof.gob.mx` (Mexico) | the edition PDF, `abrirPDF.php?archivo=DDMMYYYY-MAT.pdf&anio=YYYY&repo=repositorio/` — real text layer, no entities. `nota_to_doc.php` returns a binary OLE `.doc`, not text |
| `bcn.cl` (Chile) | `/leychile/Consulta/obtxml?opt=7&idNorma=<id>` returns the full act as XML. The `navegar` pages are now an Angular shell |
| `law.go.kr` (South Korea) | `/LSW/lsRvsRsnListP.do?lsId=<6-digit>` serves every version's 제정·개정이유 server-side. Repealed acts are not reachable by Korean-name URL |
| `laws.e-gov.go.jp` (Japan) | the `/api/1/lawdata/<num>` XML API |
| CVDR (Sint Maarten) | the **XML** at `repository.officiele-overheidspublicaties.nl/CVDR/CVDR<id>/2/xml/...` carries enactment dates in a `redactioneleToevoeging` note; the HTML pages omit them |
| `laws.moj.gov.jm` (Jamaica) | append `/download` to the record path |
| `legislation.wa.gov.au` | `RedirectURL?OpenAgent&query=mrdoc_NNNNN.pdf`, which 302s to a `filestore.nsf/FileURL/...?OpenElement` that serves the PDF |
| `legislation.act.gov.au` | `/a/<num>/current/pdf/<num>.pdf`. An **amending** act has no `current` PDF; date it from the principal Act's endnote |
| `gobierno.aw` (Aruba) | gazette PDFs on the CDN at `cuatro.sim-cdn.nl`; `azv.aw` 403s |
| `web.archive.org` | the **exact-timestamp** form works where `/web/2024/<url>` returns 429 |

### Refuses every client, newly observed

`ratchakitcha.soc.go.th` (Cloudflare, all gazette paths) · the whole
`boe.gov.sa` estate plus `ncd.gov.sa` and `mhrsd.gov.sa` (connect timeout, so
the Saudi Bureau of Experts register is unreachable) · much of the Thai
`.go.th` estate including `krisdika.go.th` and `moe.go.th` · `namiblii.org`
(403; `lac.org.na` and `npc.gov.na` serve the same texts) · `lexpol.pf` and
`lexpol.cloud.pf` (connection failure, and every DGEE "textes officiels" link
points there) · **`diputados.gob.mx`** (no connection on 443 or 80, which is
why the DOF edition PDFs are the only route to Mexican statute text) ·
`majlis.gov.mv` · `senado.gob.mx` · `canlii.org` on Yukon pages.

### Nothing quotable, which is not the same as blocked

- **Thai official PDFs have no usable Unicode.** Krisdika's consolidation
  corrupts every สระ อา into สระ อำ, so the extracted string is not the Thai on
  the page; the Senate's copy is a scan with a 75-byte text layer; and current
  gazette PDFs put tone marks in the Private Use Area (U+F70A/B/E). Thailand is
  `insufficient` for this reason and not for want of a statute.
- **Maldives gazette PDFs extract differently under different extractors** —
  `pdftotext` and PyMuPDF produce completely different Thaana from the same
  file, with characters migrating across line breaks. No span survives both.
  The gazette's own server-side search at
  `gazette.gov.mv/gazette?type=gaanoonu&q=<Thaana>` is genuinely good and does
  find the instruments; they simply cannot be quoted reproducibly.
- Nigeria's **Disability Act 2018** — every copy located is an image scan:
  `placng.org` 647 KB yielding 40 bytes of text, the UN DESA copy 5.4 MB
  yielding 27. PLAC's factsheet has clean text but is a summary, not the Act.
- `ctes.education.pf` arrêté PDFs — 1.2 MB and 511 KB, text layer of 3 bytes.
- Aruba's gazettes — one special-education instrument exists in the whole run
  1986–2025, *Regeling schoolreglement openbaar basis- en speciaal onderwijs*
  (AB 1992 no. 75), and its OCR is corrupt ("speeiaal onderwijs", "sehool",
  "beiast"). The parent Landsverordening is an image scan yielding 240 bytes.

### One that is simply absence

**Bhutan.** The Attorney General's own complete list of Acts at
`oag.gov.bt/language/en/resources/acts-2/` contains no education act, no
disability act and no special education act. Nothing is blocked and nothing is
unreadable. There is no instrument to find, and that is a fact about Bhutan
rather than about the network — the only one of this pass's ten remaining gaps
that is.

## A note on consolidators

Where the official register is in section 1 or 2 and has no side door, the
substitute is sometimes a commercial or third-party consolidator:
`paragraf.rs`, `paragraf.ba`, `net.jogtar.hu`, `jusline.at`, `cylaw.org`,
`natlex.ilo.org`, `fgos.ru`, and from the North America pass
`law.cornell.edu` (Nevada, Georgia, Alaska), `oregon.public.law` (all five
Oregon rows) and `files.eric.ed.gov` (Alberta).
Those rows are true — the quote is verbatim on
the page cited, and the gate confirms it — but they cite someone else's copy
of the state's text rather than the state's own publication.

They are kept, and they are recorded here, so that a later pass can upgrade
the url without redoing the research. The alternative was leaving Serbia,
Bosnia, Hungary and Austria blank.
