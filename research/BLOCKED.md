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
| `gallilex.cfwb.be`, `enseignement.be` | **200 with a 244-byte BIG-IP "Request Rejected" page** for every path, root included — a silent failure, not a refusal, so nothing downstream logs it | `ejustice.just.fgov.be` `article_body.pl` still, but it **drops connections intermittently** (`ECONNRESET` to Node, curl error 56) and comes back — probed here twice, 200 and 12,695 bytes both times. On a reset, retry before substituting. `etaamb.openjustice.be` is a working consolidator if it stays down; label it as a consolidator in `sources` |
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
| `gazzettaufficiale.it` | page furniture only for `/eli/.../sg` and `caricaDettaglioAtto` | `normattiva.it` `uri-res/N2Ls` URNs — but **the bare URN is not enough**: without an `~artN` fragment it returns 36 KB of navigation and no act body. Use the article form, `...;66~art5`. Normattiva's own `esporta/attoCompleto` needs a session and errors out |
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
I reached for `legislation.gov.im` as the contrasting case here -- a server
deliberately refusing rather than one that is down -- and by the end of the
same day that was wrong too. It had stopped returning 403 and started
returning 200 with a 269-byte challenge stub. See section 7. The honest
version of the lesson is therefore stronger than the one I first wrote: a
host recorded here on a single day's evidence should be assumed stale, in
either direction, and the file should say what was seen rather than what a
server is like.

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

### Added by the identificationCriteria pass

- `education.gov.mt` and `sustainabledevelopment.gov.mt` — 403 to the gate's
  own client, an identical 4,541-byte block page from both. This is the only
  reason Malta's identification criteria rest on a comparative review rather
  than on Malta's own Policy on Inclusive Education.
- `desc.gov.im` — **200 with a 269-byte `text/plain` stub**, the same
  silent-success pattern as `legislation.gov.im`. `www.gov.im` serves fine,
  and it is what gave the Isle of Man an entry at all.
- `adilet.zan.kz` — Node rejects it with `unable to verify the first
  certificate`, an **incomplete chain**; curl gets 200. Not fingerprinting,
  but section 4's remedy applies, and it is why `terr-verify.js` now has the
  curl fallback that `hist-verify.js` had from the morning. Before that fix
  the prose gate could not read anything in section 4 at all, which cost the
  African batch four unicef.org PDFs.
- `unevoc.unesco.org` — serves the UNEVOC homepage at 200 in place of the
  requested PDF. Botswana's Inclusive Education Policy 2011 has no other
  located copy, so Botswana is empty for access, not for absence.
- `socialprotection-pfm.org` — the domain now serves an unrelated gambling
  site at 200. Its Senegal study is gone.
- `handicap.sn` — 200 with a zero-byte body. `vie-publique.sn` is a Nuxt SPA
  whose act PDFs sit behind a pdf.js worker with no plain-GET url.

- `orgm.meb.gov.tr` / `ookgm.meb.gov.tr` PDFs — serve 200 and extract, but the
  font encoding is a SHIFTED CIPHER: `OZEL EGITIM HIZMETLERI` comes out as
  `g=(/(oo7o0+o=0(7/(5o`. This is not a Latin-1 problem and `-enc UTF-8` does
  not help; it is the CID class in a new costume. Use `aile.tr`, the Ministry
  of Family republication, which serves clean UTF-8.
- `mevzuat.gov.tr` and `resmigazete.gov.tr` — connect timeout to BOTH Node and
  curl. Node reports it as `unable to verify the first certificate`, which
  reads like a TLS fault and is not one. Section 7 above recommends
  mevzuat.gov.tr over resmigazete for Turkish text; when neither answers,
  `aile.tr` does.

- `busquedas.elperuano.pe` serves a Peruvian resolution but NOT its anexo,
  which is where every criterion lives. The anexo is at
  `cdn.www.gob.pe/uploads/document/file/<id>/...` — 11 MB, clean text layer.
- `ctes.education.pf` sub-pages return 200 but inject their content through an
  Advanced iFrame, so the extracted text is empty. The main `/ctes/` page serves.
- `cnb.mineduc.gob.gt` ECONNREFUSED on 443, `mineduc.gob.gt` and
  `cnbguatemala.org` 403. Guatemala’s own register is unreachable by every
  door tried, which is why Guatemala is omitted rather than documented.
- Bolivia: the entry’s own Ley 070 docLink now 404s while other paths on
  `minedu.gob.bo` serve, and its PEER profile url is dead. A reminder that a
  docLink recorded once is not a docLink that still works.

### figshare: the fallback is backwards for this host

This host produced two flatly contradictory reports in one afternoon, and the
resolution is more useful than either. A drafting agent probed it six times —
three with the gate's Node client, three with curl and the full browser UA —
and got **202 Accepted, Content-Length 0, `x-amzn-waf-action: challenge`**
every time. I probed it three times and got **200 and 24,976,303 bytes** every
time. Neither of us was careless.

Probed again with both clients in the same minute:

```
curl  -> 202, 0 bytes, x-amzn-waf-action: challenge   (twice)
node  -> 200, 24,976,303 bytes, %PDF-                 (three times)
```

**The AWS WAF challenges curl and lets Node through.** Not intermittency —
a client difference, reproducible on demand, and the reverse of the pattern
the rest of this file documents. Everywhere else Node is refused and curl
rescues it; here curl is refused and Node is the one that works. Windows curl
negotiates through schannel, Node through OpenSSL, and the WAF is evidently
reading the handshake.

**What this means in practice.** `terr-verify.js` and `hist-verify.js` try
Node first and only fall back to curl on a non-200, so **the gate reads this
host correctly** and anything resting on it can be verified. What cannot read
it is an agent reaching for curl or WebFetch — which is exactly what produced
the "blocked" report. It matters because that url carries the COST Action
IS1406 survey volume cited by **19 European DLD entries**, the most-used
source on this map.

So: **do not route around this host, and do not trust a curl probe of it.**
The 302 also goes to a signed S3 url carrying `X-Amz-Expires=10` — dead ten
seconds after issue — so follow the redirect in the same request chain and
never record the S3 address as the document's url.

`data.ncl.ac.uk/ndownloader/...` 403s, and that part stands.

**The general lesson.** A one-client probe is not a verdict. Two of the
withdrawals in this file came from probing a host directly; this one came from
probing it with *both* clients, and only the second kind of check would have
found it.

## 8. A link check over one whole region

Bolivia's own Ley 070 docLink 404s while its siblings on the same host serve,
and nothing in the app would ever notice: a docLink is rendered, never
fetched. So every docLink on the 54 Europe `dld` entries was fetched once —
**272 distinct urls**. The result is worth recording mostly for how few of the
failures were real. `linkcheck.js` in this directory runs it for any domain
and region.

**37 of the 50 suspects were DOIs, and all of them are fine.** `doi.org`
resolves them correctly (302 to the publisher); the publisher then refuses the
bot. A DOI that 403s at Taylor & Francis is a correct, permanent citation to a
paywalled chapter, which is exactly what this project's rule about never
inventing a DOI exists to protect. **Do not "fix" these.** A link checker
must resolve a DOI at `doi.org` and stop there, which `linkcheck.js` now does.

**Most of the rest were the checker's own fault.** Its curl fallback sent no
`User-Agent`, so it reported `education.gouv.fr`, Wiley, `cpbmd.info` and both
`slvesnik.com.mk` issues as dead. With the gate's real UA, curl gets 200 and
91,970 bytes, 77,600, 391,526, 5,252,946 and 1,247,755 from those five. Worth
stating plainly: **a link checker that does not use the gate's own client is
measuring the checker.**

One thing that check did settle. `education.gouv.fr` returns 403 to Node with
the full Chrome UA and with a short one, and 200 to curl with either. The UA
is not what it objects to — section 4 is right that this is handshake
fingerprinting, and the curl fallback is the remedy.
### The three certificate failures, resolved without touching the gate

This subsection first said three hosts were unreadable and that reading them
meant relaxing certificate verification. Chasing each one down, none of them
needed it.

- **The Bercow report — replaced with the publisher's own copy.**
  `bercow10yearson.com` does have an expired certificate. But the RCSLT, one
  of the two bodies that published the review, serves the full PDF on a valid
  one: 2,689,447 bytes, magic bytes `%PDF-`, 360,363 characters out of all
  three extractors, and the extracted text opens with the report's own title
  page. England's docLink and `gen-dld-seed.js` both now point there. This is
  not a workaround — it is a better citation than the one it replaced.
- **`slvesnik.com.mk` was never blocked.** North Macedonia's official gazette
  presents an incomplete chain and Node refuses it, but **curl accepts it
  with no special flags**, and the gate falls back to curl on any non-200 —
  a TLS failure returns status 0, which qualifies. Both cited issues come
  down that path: 5,252,946 and 1,247,755 bytes. The earlier "curl also
  failed" was the checker sending no User-Agent, the same bug twice in one
  afternoon.
- **`docs.edu.gov.ru` is not load-bearing.** It uses a self-signed national
  CA and curl will not take it either. It is cited as the ministry's
  publication *record* for Распоряжение Р-75 — and Russia's entry already
  carries the full text of that same instrument twice, on `legalacts.ru` and
  `base.garant.ru`, both serving 200 (106,727 and 105,628 bytes), with
  `consultant.ru` serving art. 14 of 273-ФЗ besides. Nothing rests on the
  unreadable link alone.

**So the gate stays as it is**, and the general lesson is worth more than the
three fixes: a host that fails on its certificate is a prompt to look for the
publisher's own copy, the `www.` variant, or a second citation of the same
instrument — not a prompt to lower the bar. Two of these three were solved by
reading the entry's other docLinks.

### Genuinely unreachable

- **`hse.ie` — a real 404**, and the only true dead link found in 272. The
  Cavan/Monaghan language-class page Ireland's entry cites is gone; the host
  serves a 38 KB not-found page at 404. Needs a replacement or removal.
- **`eani.org.uk` — 403 to every client tried**, plain and with a browser UA.
  Northern Ireland's newcomer-support page is not readable by this pipeline.
- **`doi.org/10.1016/j.ridd.2021.104139`** (Knudsen et al., allocation and
  funding of SLT across Europe) resolves, then ScienceDirect serves a
  2,744-byte JavaScript "Redirecting" shell and never the article. Five
  entries cite it, and it is the obvious source for SLT-per-population ratios
  across Europe. Unusable by this pipeline — which is part of why so many
  `workforce` fields have a qualification route and no number.
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

## 9. The Europe referral/entitlement/workforce pass

### A gate bug this pass found, and the fix

**A refusal dressed as HTTP 200 never reached the curl fallback.** Both gates
fell back only on a non-200, so a host that answers 200 with a few hundred
bytes of rejection page sent that stub straight to the extractor — and every
quote on the url then read as invented. `desc.gov.im` is the clean example:

```
node  -> 200,     269 bytes, "<html><head><title>Request Rejected</title>"
curl  -> 200, 121,787 bytes, the real page
```

Both gates now also fall back when a 200 carries under 1,000 bytes, and take
the curl result only if it is more than twice the size. A/B tested on that
host: **with the fix, 121,784 bytes and the bullet verifies; without it, 269
bytes and the bullet is dropped.** `gallilex.cfwb.be` at 244 bytes and
`legislation.gov.im` at 269 are the same shape, so this class is now handled
rather than merely documented.

### Corrections to earlier entries

- **`esla.eu` is not the European speech and language therapy association.**
  The domain now serves a Spanish ladder and scaffolding manufacturer —
  "ESLA - Ladders, work platforms and scaffolding", 200 and 173,596 bytes.
  This was in a drafting brief as a recommended source for workforce counts,
  which is where it came from and where it has been removed. **Never cite it.**
- **`portaldogc.gencat.cat` is no longer curl-only.** Section 4 lists it; it
  answered the gate's own Node client directly, 116,040 bytes of PDF. The
  requirement seems to have lapsed. Left in section 4 but flagged here.
- **`legislation.gov.im` has changed failure mode again**, from a 269-byte
  200 stub to `ECONNRESET` / curl error 35. Still unusable either way, which
  is why the Isle of Man has no `legalEntitlement`.
- **`www.gov.im` is intermittent, not blocked.** It dropped all three Isle of
  Man bullets on one gate run and served 22,977 bytes on the next, and to
  both clients on a later probe. Retry rather than write it off — the same
  lesson section 6 records for Gibraltar.

### Newly observed

- **`monservicepublic.gouv.mc` and `www.gouv.mc`** — 403 to every client
  including the root, 244–245 byte body. Both of Monaco's existing docLinks
  point there. **`journaldemonaco.gouv.mc` is the working door** to Monegasque
  law: 200 and 963 KB on the root.
- **`www.valstybeskontrole.lt`** `/LT/Product/Download/<id>` — 403 to the
  gate's client and to the curl fallback. Lithuania's audit of special-
  education support is unreachable.
- **`santesecu.public.lu`** serves a 404 page for the health-profession
  statistics, which is why Luxembourg has no orthophoniste headcount.
- **`island.is/heilbrigdisstarfsfolk-tolur`** answers 200 but publishes only
  `.xls`/`.xlsx`, which neither extractor reads. Not a block — simply not
  quotable, which is why Iceland's workforce rests on a parliamentary answer.
- **`www.jusline.at`** returned HTTP 500 once mid-run and 200 on three
  immediate re-probes. Intermittent; do not record it as blocked.

### Why so many `workforce` fields have no number

Worth stating once, because it will otherwise look like thin research. Of the
49 Europe units with a workforce field, most carry a qualification route and
no headcount, and in nearly every case that is what the sources contain.
Austria publishes a register count, Ireland a CORU count, France a DREES
figure, the Netherlands a Nivel study, Northern Ireland an HSC census — and
Estonia, Switzerland, Latvia, Italy, Catalonia, Hungary, Albania, Denmark and
Scotland publish nothing a bullet could rest on. Two structural reasons:
several systems place logopedists as education staff who appear on no health
register at all, and **the one comparative source that would answer it for
everyone — Knudsen et al. on allocation and funding of SLT across Europe —
resolves to a 2,744-byte ScienceDirect JavaScript shell** and cannot be read.
Five entries cite it.
## 10. The indigenous fill pass (Asia)

### Two gate bugs, both of the same family

Both are the family this file keeps meeting: **the gate could not read a
document it had successfully fetched, and the drafter's correct quote was
reported as not on the page.** Neither host was blocked. Both are fixed.

**A PDF whose header is not at byte 0.** The check was
`raw.slice(0,5).toString() === "%PDF-"`, so a UTF-8 BOM in front of the
signature — three bytes — sent a genuine PDF to the HTML extractor. Found on
`hrnk.org`'s copy of the DPRK constitution, which serves at 200 with
`Content-Type: application/pdf` and reads fine in pdftotext; it dropped all
four DPRK bullets. Reproduced by prefixing a BOM to a PDF the gate reads
happily: the check goes PASS to FAIL on those three bytes alone. Both gates
now locate `%PDF-` within the first kilobyte and extract from wherever it
starts, which also covers stray leading whitespace.

**Chinese pages served as GB2312.** The decode union was UTF-8 plus latin-1,
and neither reads GB2312/GBK — so a Chinese government page at HTTP 200
decoded to noise and every quote on it was dropped. Two agents hit this
independently: `jxrd.jxnews.com.cn` (Jiangxi's own minority-rights
regulation) lost five quotes to it, and `lawdb.cncourt.org` was abandoned
unread for the same reason.

The union now takes a third decoding when — and only when — the page
*declares* a legacy East Asian charset in its header or its own meta tag:
gb18030 (a strict superset covering gb2312 and gbk), Big5, Shift-JIS,
EUC-JP/KR. Guessing an encoding for every page would risk a quote matching
by accident, which is the one thing this gate must never do. Demonstrated on
a declared-gb2312 page: UTF-8 produced 16 replacement characters where
gb18030 recovered 少数民族语言文字.

This is the encoding class for the third time — after latin-1 cost Uruguay
and the `fold()` allow-list cost Greece, North Macedonia and Taiwan. The
pattern is always the same and so is the remedy: **do not pick a decoding,
search the union.**

### A correction

- **`mevzuat.gov.tr` is no longer a connect timeout.** Section 7 records it
  as one; it served real PDFs at 200 to both curl and the gate's own client
  on this pass. Türkiye's entry rests on it directly.

### A 404 large enough to look like a document

`education-profiles.org` country slugs are not guessable — Iran is
`/central-and-southern-asia/iran-islamic-republic-of/`, and `/iran/` returns
a **404 page of 24,707 bytes that extracts to 11,840 characters of real
text**. That is far above the under-1,000-byte tripwire added in section 9,
and prose enough that a careless quote could conceivably match it. Check the
status, not just the size.

### Newly observed

- **`planipolis.iiep.unesco.org`** now serves a 3,143-byte Anubis JavaScript
  bot challenge at HTTP 200 for PDF paths. It was a working source on
  earlier passes — silent-success class, newly arrived.
- **`agc.gov.bn`** (Brunei Attorney General's Chambers) — TLS certificate
  **expired**, to Node and curl alike, on both the Constitution and the
  Education Order 2003. Brunei's own statutes are unreadable here, which is
  why that entry rests on UNESCO PEER.
- **`rc.majlis.ir`** — 200 with a 203-byte JavaScript redirect stub, so the
  Persian original of Iran's Constitution art. 15 is not in the entry.
- **`flk.npc.gov.cn`** (国家法律法规数据库) — a Vite SPA shell of ~455 bytes on
  every path including `/api/`. This is the obvious route to Chinese
  provincial regulations and it is closed to plain GET; provincial
  government hosts and municipal republications are the working doors.
- **`xxgk.jl.gov.cn`** — 200 with a WZWS obfuscated-JavaScript challenge.
- **`npc.gov.cn/englishnpc/constitution2019/`** — 200 with 89 KB of site
  furniture and no constitution text. `english.www.gov.cn` serves it.
- **`nlb.gov.sg`** article paths — 202 with a zero-byte body, the shape
  already recorded for `sso.agc.gov.sg`.
- **`jyt.henan.gov.cn`**, **`jyt.gansu.gov.cn`** (412 WAF),
  **`www.hebei.gov.cn`**, **`www.shaanxi.gov.cn`**, **`www.qhrd.gov.cn`**,
  **`mzzj.yn.gov.cn`**, **`www.hainan.gov.cn`** — 403, timeout or NXDOMAIN.
  `www.gov.cn`, `moe.gov.cn`, `npc.gov.cn` and `neac.gov.cn` all serve, so
  this is host-specific rather than a China-wide block.
- **`npc.gov.cn` is UA/client-sensitive in the figshare direction**: curl
  fails it with a schannel TLS alert while Node gets 200. The gate reads it
  correctly because it tries Node first.
## 11. PEER has moved, and 386 docLinks point at the old site

**This is the largest single source dependency in the atlas.** UNESCO's
Profiles Enhancing Education Reviews is cited by **386 docLinks across all
five live maps** — 150 on `dld`, 102 on `indigenous`, 77 on `eal`, 51 on
`fl`, 6 on `he`. For many units outside Europe it is the only comparative
source that exists.

`education-profiles.org` now serves every page with a banner reading
**"This website has been archived and is no longer updated"**, pointing at
a new home on `unesco.org/gem-report/en/peer`.

### Do not migrate those links yet

Three reasons, and the third is the one that would cost work:

1. **The old site still serves.** Probed here: HTTP 200, 851,511 bytes of
   full profile text. Nothing is broken today.
2. **The quotes on 386 docLinks were verified against the old site's
   rendering.** Repointing them at a differently-rendered page invites the
   gate to drop bullets that are perfectly correct.
3. **The new site's paths are not the old ones.** The obvious
   `/gem-report/en/peer/<country>/inclusion` form 404s — tested on two
   different countries, both 404 — so a mechanical rewrite would break every
   link it touched. The index at `/gem-report/en/peer` serves at 200 and is
   the place to work out the real scheme.

### The new site's 404 is the worst big-404 yet

**`unesco.org/gem-report/en/peer/<anything-wrong>` returns HTTP 404 with a
1,789,233-byte body.** That is 1.79 MB — far past the under-1,000-byte
tripwire from section 9, and vastly bigger than the 24,707-byte
`education-profiles.org` 404 recorded in section 10.

A body that size, full of real UNESCO prose, is prose enough that a loosely
chosen quote could plausibly match it. **Check the status code.** Size is
not a proxy for success and this is the clearest demonstration of it in this
file.

### An empty chapter is not a degraded page

An agent reported the archived site serving country pages as "pure site
navigation", on the strength of North Macedonia's inclusion page containing
zero occurrences of the word *language*. Checked across three countries, that
is not what is happening:

```
North Macedonia   200   790 KB html   110,459 chars of text   "language" x0
UAE               200   851 KB html   139,663 chars           "language" x4
Kenya             200   836 KB html   133,417 chars           "language" x7
```

The pages carry full profile prose. North Macedonia's *inclusion* chapter
simply does not discuss language, which is a fact about that chapter and not
about the host. Costa Rica's page says so outright — 790 KB whose body reads
"The Inclusion chapter is not available in this language."

**The distinction matters because believing the host is degrading would
trigger the migration this section says not to do.** A country page with no
hits for your term is a coverage gap; check a second and third country before
concluding anything about the site.

### What to do when someone does migrate

Work out the new path scheme from the `/gem-report/en/peer` index, migrate a
handful of links, and **re-run the gate over those units before touching the
rest** — the whole point is that a link is only as good as the quote that
still verifies against it. `linkcheck.js` will tell you which of the 386 are
still serving; it will not tell you whether the quotes still match, and that
is the question that matters.
## 12. The reverse User-Agent case, and a third fallback

Nearly every host in this file refuses a bare client and wants a browser
string. A few do the exact opposite, and the gate was sending the string they
refuse.

**`education.gov.gy`**, same url, same second:

```
full Chrome UA (what the gate sent)  ->  403,  75,193 bytes (block page)
"Mozilla/5.0"                        ->  200,  99,392 bytes (the real page)
no User-Agent at all                 ->  200,  99,392 bytes
```

The only difference is the length of the header. This cost Guyana its bullet
on the Wapichan bilingual programme, on the Ministry's own page.

Both gates now try a short `Mozilla/5.0` as a **third** fallback, after the
built-in client and after curl, and only when neither produced a usable body.
A/B tested on that host: with it, 200 and 99,389 bytes and the bullet
verifies; without it, 403 and the bullet is dropped.

The fallback chain is now, in order: **Node with a browser UA -> curl with a
browser UA -> Node with a bare UA.** Each covers a different refusal — TLS
handshake fingerprinting, a client the WAF dislikes, and a header the WAF
dislikes. Nothing is weakened by any of them: same url, same verbatim quote,
same extraction, and a failure still drops the row exactly as before.

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
