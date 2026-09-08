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
- **`legislation.gov.im` has changed failure mode again** — now a third
  shape: `ECONNRESET` on `www.`, and **HTTP 202 with a 249-byte challenge
  stub** on the bare host. Still unusable, but **no longer load-bearing**:
  `desc.gov.im/corporate/corporate/legislation/` links a `media/<hash>/`
  store that serves the Education Act 2001 (867,605 b) and the Education
  (Special Needs) Regulations 2004 with clean text layers. `desc.gov.im`
  hands Node the 269-byte stub and curl the real PDF, so the gate reads it
  through the fallback. The Isle of Man now has a `legalEntitlement`.
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

## 13. Two doors that opened, and a slug that can misattribute a law

### The China Disabled Persons' Federation index

Section 10 records that `flk.npc.gov.cn` is a Vite shell and that half the
provincial government hosts refuse, leaving no general route to Chinese
provincial regulations. There is one:

```
cdpf.org.cn/ztzl/zxzt1/2024/cjrqybzflfggzxxgkxt/dfxfgjgz/
```

The CDPF's law-disclosure system carries a **per-province index of
provincial disability regulations**, serving full act text to a plain Node
GET at 200. It reached Inner Mongolia, Shaanxi, Xinjiang, Anhui, Guizhou,
Hainan, Jiangxi and Shanxi across two passes, including a Shaanxi
disability-education measure naming 语言残疾 outright.

### The slug trap, and why it is worse than a dead link

**`sxs1` is Shaanxi 陕西. `sxs2` is Shanxi 山西.** Two different provinces,
one character apart in the slug, and both serve a real regulation at 200.

A wrong slug here does not fail — it succeeds, and quietly attributes one
province's law to another. The quote verifies, because the quote really is on
the page that was fetched. **This gate cannot catch it**: it checks that a
quote is on the page cited, not that the page is the right province's.

Read the province slugs off the index. Never guess them, and never pattern
them from a neighbour.

**Slugs confirmed by reading them off the index**, across two passes:

```
Shaanxi 陕西 sxs1     Shanxi 山西  sxs2     Hunan  湖南 hns2
Henan   河南 hns3     Hainan 海南  hns4     Hebei  河北 hbs2
Hubei   湖北 hbs3     Fujian      fjs2     Qinghai     qhs1
Yunnan       yns3     Jiangxi     jxs2     Jilin       jls2
Liaoning     lns2     Heilongjiang hljs2   Sichuan     scs3
Chongqing    cqs3     Tibet       xczzq1   Guangxi     gxzzzzq2
Shanghai     shs2     Jiangsu     jss2
```

**Seven of these sit in three collision groups**: `sxs1`/`sxs2` are Shaanxi and
Shanxi, `hns2`/`hns3`/`hns4` are Hunan, Henan and Hainan, and `hbs2`/`hbs3`
are Hebei and Hubei. Every one serves a real regulation at 200.

**Read the index as UTF-8.** Its anchor text is UTF-8 served with no declared
charset, so a gb18030 decode of the index itself returns mojibake — the gate's
legacy-CJK decoding fires only on a *declared* charset, which is why it does
not misread this page, but a drafter decoding by hand can. Match province
names by position against the plain-text list rather than by guessing a slug.

### Scan-ness is per FILE, not per host

Indian state gazette PDFs are overwhelmingly image scans, and the numbers are
stark: Tripura's RPwD Rules 2018 is 5.5 MB yielding 79 bytes of text, Bihar's
2021 gazette 1.7 MB yielding zero, Jharkhand's RTE Rules 4.6 MB yielding zero,
Bihar's 2010 education rules 30 MB yielding zero.

But **the same host's Tripura RTE Rules 2011 has a clean text layer.** Do not
write a host off after one scan, and do not assume a host is good after one
success — probe each file. A 30 MB PDF returning zero characters is not a
blocked host; it is a photograph of a document.

### `cdnbbsr.s3waas.gov.in`, for Indian state gazettes

The NIC CDN behind Indian state department sites serves state gazette PDFs
with clean text layers at 200, where the parent site's own viewer pages
redirect to a homepage or refuse. It reached Haryana's 2019 rules and 2021
certification notification, and Maharashtra's 2024 gazette where
`divyangkalyan.maharashtra.gov.in` would not.

Caveat: Marathi extraction from it is mangled — doubled matras, stray
U+FFFD. Pull quotes programmatically out of the same `pdftext` union the
gate reads rather than retyping any of it.

### Delhi: a whole estate down, and the one door that is not

`delhi.gov.in`, `www.delhi.gov.in`, `discomm.delhi.gov.in`,
`dcpcr.delhi.gov.in`, `dsssb.delhi.gov.in` and
`socialwelfare.delhigovt.nic.in` all connect-timeout on 443 to a full browser
UA — the same whole-estate shape section 5 records for `nh.gov` and
`yukon.ca`.

**`edudel.nic.in` answers 200 on the same government**, and its
`/welcome_folder/inclusive_education/*.pdf` tree carries the Directorate's
orders, the Delhi RPwD Rules 2018 gazette and the hospital-panel circular as
plain-GET PDFs.

One document there is worth knowing about and not using: Delhi's "Checklist
for Screening and Identification of Children with Disabilities" is an **11 MB
image scan yielding 1,888 characters of noise**. It is the one document that
would answer Delhi's identification slots directly, and it is not quotable.

### Two Indian national paths that are simply gone

- **`education.gov.in/sites/upload_files/mhrd/files/upload_document/`** — the
  entire path returns 404 with a 3,042-byte body, including urls still being
  returned by search engines and still cited in published reports.
- **`mhrd.gov.in`** no longer resolves at all.

A url in a 2019 report is not evidence the document is still there.

### Two more whole-estate refusals, and one bad move

- **`gujarat.gov.in`** — the estate connect-times-out (`sje.`, `education.`,
  `egazette.`, `gujaratindia.`) or is NXDOMAIN (`dpal.`, `swd.`, `ssamis.`).
  **`ssagujarat.org` is not part of it and serves**, which is the working door.
- **`meghalaya.gov.in`** — `megscpwd.`, `megpolice.`, `megeducation.`,
  `ssa.megeducation.` all connect-timeout. Meghalaya's gazette rules came from
  a `web.archive.org` `id_` mirror, which extracts cleanly.
- **`dsel.education.gov.in` moved badly.** Every `/sites/default/files/...`
  path 301s to `www.dsel-education.gov.in` at the same path, which then 404s.
  The new host is a Next.js SPA whose `_next/data` endpoint returns the shell.
  A 301 into a 404 is worse than either alone: it looks like a live
  redirect chain.
- **`upload.indiacode.nic.in`** connect-times-out while `www.indiacode.nic.in`
  serves. `upload.` is the host holding the state-rule PDFs, so India Code is
  effectively closed for subordinate legislation.
- **`legitquest.com`** serves 200 with real text but **truncates statutes after
  rule 2** — usable for a definitions clause and nothing further. A silent
  partial, which is worse than a refusal.

### Also observed

- `commonlii.org` — served, 403'd, then served again within minutes.
  Intermittent; retry rather than substitute.
- `indiankanoon.org` — 403 to Node, curl and the bare UA alike, so all three
  fallbacks are exhausted.
- `indianemployees.com`, `divyangkalyan.maharashtra.gov.in` — TLS handshake
  failure to both clients.
## 14. UTF-16, the fourth encoding case

Older BOPA documents — the Andorran gazette — are served as **UTF-16LE**.
Neither UTF-8 nor latin-1 reads them: both turn the body into characters
separated by NUL bytes. Andorra's 2004 Conava reglament verified only through
`quoteOn`'s last-resort space-stripped comparison, which survived by luck
because the quote was long. **A short quote on such a page would have been
dropped as invented.**

Both gates now add a UTF-16 decoding to the union, detected by BOM or by NUL
density in the first kilobyte. A NUL byte does not occur in valid UTF-8 or
latin-1 HTML, so a body carrying them in quantity is UTF-16 and nothing else —
which is why this needs no "only when declared" restraint, unlike the
legacy-CJK decoding in section 10.

Verified on a BOM'd UTF-16LE body: UTF-8 and latin-1 both return the
NUL-separated mangling, `utf16le` returns the text, and the phrase is found in
the union.

**That is four encoding cases now** — latin-1 (Uruguay), the `fold()`
allow-list (Greece, North Macedonia, Taiwan), GB2312 (Jiangxi), and UTF-16
(Andorra). Every one had the same signature: a document fetched successfully,
unreadable, and a correct quote reported as invented. The remedy has been the
same every time, and it is worth stating as a rule rather than rediscovering:
**do not pick a decoding, search the union.**

The BOPA side door, found on the same pass: the JS-only gazette at `bopa.ad`
reads a static store at `documents.bopa.ad/bopa-documents/<issue>/html/<doc>.html`
which serves full act text to a plain GET.

## 15. American legislature sites, from the dld entitlement pass

Sixty-odd US states, Canadian provinces and territories in one pass, so this
is a reasonable survey of how legislature sites fail.

### A side door worth copying

**`sdlegislature.gov/api/Statutes/Statute/<section>` returns clean JSON with
the full statute text**, where the HTML page is a JavaScript shell. South
Dakota's four bullets all verify through it.

That is the same shape as the BOPA store in section 14: a JS front end over a
plain-GET data endpoint. When a legislature site renders nothing, look for
the API the page itself is calling before writing the host off.

### JavaScript shells serving 200

- **`delcode.delaware.gov`** — 200 with a **794-character** shell reading
  "Delaware Code Online" and nothing else. Title 14 ch. 31 is unreachable;
  the archived Administrative Code site serves and is what Delaware rests on.
- **`codeofarrules.arkansas.gov`** — 200 with a 3.4 KB "enable JavaScript"
  shell.
- **`mgaleg.maryland.gov/.../StatuteText`** — JS-rendered, so Maryland's
  Education Article is unquotable and that entry rests on COMAR.

### Whole hosts and estates that would not connect

- **The whole `legis.wisconsin.gov` estate**, `docs.legis.wisconsin.gov`
  included — connect timeout on 443 to both clients, root and documents
  alike. **Wisconsin statute text is unreachable from here**, which is why
  that entry rests on DPI's own SEA Policies and Procedures.
- `ilga.gov` — connect failure on 443 to both clients. Illinois came from
  ISBE's own Part 226 PDF, which is a better source anyway.
- `codes.ohio.gov`, `txrules.elaws.us` — connection failure / timeout.
- `legisquebec.gouv.qc.ca` — **still 502 on the root.** Section 5 called this
  an outage; it has not come back, and Quebec's consolidated LIP remains
  unreachable.

### A url form that matters

`leginfo.legislature.ca.gov` — the `codes_displayText.xhtml?chapter=&article=`
form returns a 1,206-character empty shell where that article does not exist.
**`codes_displaySection.xhtml?sectionNum=` is the dependable door.**

### Two more big-404s

- `dpi.wi.gov/sped/laws-procedures-bulletins/procedural-safeguards` — **HTTP
  404 with a 133,861-byte body.**
- `web.archive.org` returned **HTTP 500** on a New Hampshire snapshot — a new
  failure mode for a host this file records as 429-ing. New Hampshire is now
  blocked at the register *and* at the archive, and is the pass's one
  access-blocked US state.

### OCR that is clean in only one extraction

Jamaica's Disabilities Act is an image scan on `laws.moj.gov.jm` (200, 2 MB,
no text layer). The Houses of Parliament printed copy does extract — but
**only one of the three extractions in the union is clean OCR**; the others
shred words into "edt rammg" and "nede s".

This is the multi-extractor union earning its keep in a way worth stating:
it is not only that one extractor may find a page another cannot, but that
two extractors of the SAME page can disagree about the words. Take the quote
from the clean one, and check which that is rather than assuming.
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

## 14. The Oceania pass, and a source that is only reachable second-hand

Two government hosts refuse this machine outright, and both have a working
Internet Archive substitute of the same file:

- `ministers.education.gov.au` — TCP timeout on every attempt, every client.
  The Australian Department of Education's 2022 *Teacher Workforce Shortages*
  issues paper is served from the archive copy instead: 200, 362 KB, extracts
  cleanly in all three pdftotext modes.
- `www.education.gov.fj` — connection refused on 443. Fiji's ministry pages
  come from the archive.

Neither is a block on the document, only on the door, so the rows stand and
the archive url is what is cited. Recorded here so a later pass can upgrade
the url rather than redo the research.

Also settled, in one call, and worth reusing rather than guessing filename
variants: the Wayback CDX API lists everything under a prefix.

    https://web.archive.org/cdx/search/cdx?url=ibe.unesco.org/fileadmin/user_upload/Publications/WDE/2010/pdf-versions/*&output=json&fl=original&collapse=urlkey

It settles the recurring "does an IBE profile exist for this country" question
outright. For Oceania the answer is that the *World Data on Education* 7th
edition covers only **Australia, Fiji, New Zealand, Cook Islands, Papua New
Guinea and Samoa**. There is no profile for American Samoa, Guam, Kiribati,
the Marshall Islands, the Northern Mariana Islands, New Caledonia or Nauru,
and no amount of name-variant hunting will produce one. The API 504s on an
unfiltered listing, so always pass a filter or a prefix.

One more archive quirk found here: the archived Fiji IBE PDF returns the
Wayback HTML wrapper rather than the file, under both the plain and the `if_`
snapshot forms. The document-url mismatch fallback in terr-verify.js handles
the ordinary case of this; this one is a genuinely missing file behind a
working page, which is different, and it yielded nothing.

## 15. PacLII, and the archive as the working door

**PacLII (paclii.org) is the single best source for Pacific legislation**, and
the live site cannot be used: its table-of-contents pages return 200, but every
DOCUMENT page is behind a Cloudflare JS challenge and returns 403 to curl, to
Node and to WebFetch alike. **Internet Archive copies of PacLII documents work
perfectly.** Every Pacific statute cited in this pass is an archive url for that
reason, and a future Pacific batch should go straight there rather than
rediscovering the block.

The same is true of **legifrance.gouv.fr**: Cloudflare on the live site,
archive copies fine.

**legislation.govt.nz** is a different block — an AWS WAF challenge that answers
HTTP 202 with an empty body, which reads as a success and yields nothing.
**NZLII works directly via curl, including its full-text search CGI**
(`sinosrch.cgi`), and is the better New Zealand tool for this reason.

Serving directly, no workaround needed: `cnmilaw.gov` and `col.guamcourts.gov`
both hand over section PDFs.

Also blocked in this pass: NESA's Subject Content Knowledge PDFs 302-redirect
to a generic nsw.gov.au landing page, including from the legacy
`educationstandards.nsw.edu.au` portal urls; `education.gov.au` times out
repeatedly, and the Commonwealth Teaching Scholarships figures were taken from
the NSW Department of Education mirror instead. `unigoroka.ac.pg` and `cmi.edu`
403 curl.

## 16. Four national law portals that are JavaScript to a script

Found in the Europe higher-education pass. All four defeat curl AND WebFetch,
and all four have a working way in:

- **Fedlex (Switzerland)** — use the archived pre-2021 host,
  `admin.ch/opc/de/classified-compilation/...`
- **RIS (Austria)** — JS, and it also 503s. Dated Wayback snapshots work.
- **Riigi Teataja (Estonia)** — JS. Dated Wayback snapshots work.
- **Retsinformation (Denmark)** — the `/api/document/...` path returns the SPA
  shell; `.../eli/lta/YYYY/NNNN/pdf` returns the actual PDF.

**Finlex (Finland)** is JS too but does not need a workaround: its Next.js RSC
payload carries the statute text verbatim and contiguous, so a quote taken from
it survives a refetch.

And the finding that matters more than any of these: **quote contiguity, not
url health, is the real gate risk on modern government sites.** Six first-choice
quotes in that pass were broken by `<strong>`, `<em>` or `&nbsp;` inside a
sentence, or by PDF column wrapping. The fix is to pick a run that is
contiguous in the raw bytes, which is usually a shorter span than the sentence
you want. Eurydice in particular bolds words mid-sentence.

## 17. Four more doors, from the European higher-education pass

- **Legilux (Luxembourg)** is an SPA, but has a plain-GET side door serving the
  full act text:
  `data.legilux.public.lu/file/eli-etat-leg-loi-YYYY-MM-DD-aNNN-jo-fr-html.html`
- **e-Seimas (Lithuania)**: `/portal/legalAct/.../asr` returns only a table of
  contents. The consolidated body is at `/rs/actualedition/{TAIS id}/{token}/`.
- **dziennikustaw.gov.pl (Poland)** needs the ZERO-PADDED filename:
  `D2018000221801.pdf`, not `D2018221801.pdf`. The unpadded form 404s.
- `vlkk.lt` 403s outright.


## 18. The European higher-education pass: doors, and one block withdrawn

**Withdrawn.** `mon.gov.mk` is recorded above as a 403. It answered **200 with
full article text** on this pass and supplied the North Macedonia matura
evidence. An outage is not a block, and neither is a bad afternoon.

**New blocks.**
- `uni.lu` answers **202 with zero bytes** to every path, and has no Wayback
  copies of its current admission pages. Luxembourg's entry rests on Eurydice
  alone for that reason.
- `legilux.public.lu` is an Angular SPA; `/fr/pdf`, `/fr/html` and the
  `data.legilux.public.lu/file/...` paths all return the shell or 404. (Note
  this CONTRADICTS the side door recorded in section 17, which worked for a
  different act — try it, but do not rely on it.)
- `unigib.edu.gi` 403s a full browser header set — UA, Accept, Accept-Language,
  every Sec-Fetch-* and Upgrade-Insecure-Requests — with a 75 KB block page on
  every path. Wayback has it, and the exact-timestamp form works.
- `smsm.lrv.lt` and `vlkk.lt` both 403.
- `una.mr` has an expired certificate and 404s behind it.
- `www.uiz.ac.ma` (Ibn Zohr, Morocco) presents a certificate this environment
  reports as **revoked**: curl refuses it, WebFetch retrieves it fine. Rows
  citing it are at risk from any strict-TLS client.

**Doors that work.**
- `gesetze.li/konso/pdf/<lgblId>` serves Liechtenstein law and takes
  `?version=N`. Adjacent ids return HTTP 500, so ids are not guessable by
  increment.
- `logir.fo` serves full Faroese act and regulation text server-side at
  `/Logtingslog/<n>-fra-<dd-mm-yyyy>-um-<slug>` and `/Kunngerd/...`; its
  `/Search?query=` 404s, so the slug has to come from elsewhere.
- `riigiteataja.ee/public-api/api/v1/akt/<id>/blob-html` serves consolidated
  Estonian text. Without `/blob-html` it returns JSON metadata; `/redaktsioonid`
  returns an empty list and is NOT a route to the current version.
- Confirmed working: `narodne-novine.nn.hr`, `likumi.lv` (including its
  `/ta/en/en/` English translations), `althingi.is`, `wetten.overheid.nl`,
  `normattiva.it` with the `~artN` fragment, `ance.gov.md`, `nui.ie`,
  `lamabpo.lt`.

**Two whitespace hazards that cost quotes rather than pages.**
`paragraf.ba` hard-wraps with DOUBLE SPACES inside sentences in the raw HTML,
on some pages and not others — the Bosnian framework-law page does not, the
Republika Srpska page does. `logir.fo` and Belarus's `pravo.by` carry
non-breaking spaces mid-sentence. Choose a quote span that avoids them.

## 19. Belarus's two law portals, and the Charter's real index

- **`world_of_law.pravo.by`** serves the Law on Languages over **HTTP only** —
  HTTPS resets the connection — and in **windows-1251**, so a Cyrillic quote
  taken from it needs the legacy-charset decode the gate already does. Reachable
  but awkward; the Education Code on the main `pravo.by` host is the easier door
  and carries the education provisions.
- **`etalonline.by`** returns a 528 KB shell with no act body at all.

**The Charter index, which is worth more than either.** Per-country pages under
`coe.int/en/web/european-charter-regional-or-minority-languages/<country>` all
404. The working index is

    coe.int/en/web/european-charter-regional-or-minority-languages/reports-and-recommendations

which returns 200 and carries **415 distinct rm.coe.int links** — every state
periodical report and every Committee of Experts evaluation, which is the
single best source for `indigenous.revitalisation` in Europe. Scrape that page
for the url rather than guessing it; the report urls are not patterned.

`rm.coe.int` itself answers curl with a browser UA and a Google referer exactly
as section 4 records, and refuses Node on identical headers.

## 20. A font that corrupts its own text, and a hazard in how a verifier caches

**`desc.gov.im`'s Manx Language Strategy PDF is a SILENT quote hazard.** It
fetches cleanly, 1.4 MB with a real text layer, and its font mangles every
`ti` and `tt` ligature into a semicolon: `organisations` extracts as
`organisa;ons`, `Education` as `Educa;on`, `communities` as `communi;es`. All
three pdftotext modes agree, so the union does not save it, and NFKD does not
either -- this is not a Unicode ligature but a broken font mapping, and no
normalisation reaches it.

The effect is the worst kind: a drafter quoting most sentences in that document
would have correct text rejected, and would look as though they invented it.
**The UK's Charter evaluation report is the usable route to Manx content** and
extracts cleanly.

**`coe.int`'s ratification tables are JavaScript.** Both
`full-list?module=signatures-by-treaty&treatynum=148` and the `cets-number`
variant return 200 with the table rendered client-side; `grep -c Greece` on
87 KB returns 0. Signature and ratification status cannot be verified from
there, and any existing row citing that url may not be reprovable.

**A hazard worth recording even though this gate does not have it.** A pass
built its own verifier with a cache keyed on `hex(url).slice(0, 60)` -- 30 bytes
-- and two press releases from the same register collided, so one page was
checked against the other's text and reported four false misses. Checked:
`terr-verify.js` keys its page cache on the FULL url and names temp files by
process id, so it is not exposed. But a 30-byte prefix collides for any two
documents from one register, which describes most sources in this pipeline, and
anything written against this data should key on the whole url or a real hash.

**Three African government hosts, indigenous.revitalisation pass.**
`mincultur.gov.ao` (Angola, Ministry of Culture) fails at TCP -- no connection,
not a 404. `angop.ao` (Angop, the state news agency) resets the connection
mid-response. `assemblee.bi` (Burundi, National Assembly) returns 404 for its
own 2014 language-law article, including from search-result urls that carry its
own article ids. None has a usable Wayback copy of the pages needed.

**`axl.cefan.ulaval.ca` serves windows-1252, not UTF-8**, and declares nothing.
Its French quotes survive the gate only because the fallback chain decodes
latin-1 when the UTF-8 decode produces replacement characters. Worth knowing
before anyone "simplifies" that decode: the Universite Laval mirror is the only
readable full text for several Francophone and Hispanophone language laws in
this data, Venezuela's Ley de Idiomas Indigenas among them.

**Two comparative sources that would answer language-of-instruction directly,
and both are closed.** `whed.net` (the IAU World Higher Education Database)
403s a full browser UA on every path, root and results alike; it carries a
"languages of instruction" field per institution and is the obvious source for
this question. `droit-afrique.com`, the standard route to Francophone African
statutes, 403s on root and country paths alike.

**Laws.Africa estate**: `lesotholii.org` and `zimlii.org` both 403 to curl with
a browser UA, for HTML and `source.pdf` alike.

**`www.elaws.gov.bw`** (Botswana) times out on connect at 443, so the Tertiary
Education Act has no located text copy. **`iset-oneworld.ac.mz`** 403s.

**`repositoriodigital.me.gov.st`** (Sao Tome and Principe, Ministry of
Education legislation repository) serves a SELF-SIGNED certificate, refused by
curl and Node alike. Not worked around, per the standing rule that the bar does
not get lowered for a certificate; no publisher's copy of the instrument was
found elsewhere.

**`joradp.dz`, the Algerian Journal officiel, serves 200 and real PDFs and is
still unusable for the instruments that matter here.** The 1991, 1996 and 1999
issues are image scans with no text layer -- 254 KB of PDF yielding five bytes
of text. Algeria's own register cannot be quoted for Law 91-05 or Ordonnance
96-30, which is why those rest on the Universite Laval transcriptions.

**hepo.iesalc.unesco.org is the best route to African higher-education statutes
and it has two traps.** Many of its PDFs are image scans yielding nothing:
Angola (both slots), Burundi (both), Botswana HE, CAR, Guinea, Guinea-Bissau
education law, Lesotho (both), Madagascar HE, Mozambique education law, Sierra
Leone HE, Togo. And two slots hold something other than what they are filed as
-- Algeria's `dza_HELawLi` is a 2000-2022 index of ministry texts whose Arabic
extraction is glyph-substituted nonsense, and Comoros' `com_HEEdLawLi` is a
newspaper op-ed about the loi d'orientation rather than the law. Liberia's
`lbr_HEEdLawLi` is a 29 MB OCR whose text is shredded ("Languageof Instruction",
"iustntction", "Englis]r") and is not quotable.

**Two silent-failure cases from the African linguistics pass, both worth
knowing because neither looks like a failure.** `flsh.univ-antananarivo.mg`,
Madagascar's faculty of letters, **has been defaced**: HTTP 200, 2,274 bytes,
and a title reading HACKED BY AndrielSec. And `www.unza.zm` returns big-404s of
155 KB on its department paths while `unza.zm/humanities/about` serves
normally, so a drafter reading for content sees a full page of navigation and
no error.

`www.univ-antananarivo.mg` is a React SPA with no text. `courses.mak.ac.ug`
redirects to `cgi-sys/suspendedpage.cgi` and `llc.mak.ac.ug` is NXDOMAIN --
use `chuss.mak.ac.ug`. `cohu.udsm.ac.tz`, `ulshb.edu.ml` and `univ-comores.km`
connect-timeout. `univ-bangui.org` fails TLS with SEC_E_WRONG_PRINCIPAL and
404s over http. `ungecampus.com` 403s its root, `utg.edu.gm` 403s every path
with a 75 KB block page, and `shabait.com` 403s live.

**A correction to the Mauritania entry above: `una.mr` is not simply dead.**
`flsh.una.mr` is alive on a valid certificate and is the working door to the
faculty of letters.

**`arts.ukzn.ac.za` is intermittent, not blocked** -- 200 with 84 KB once, then
connect timeouts on three retries. Rows citing it stand.

**From the European offerings pass.** `cien.gouv.mc` 403s with the same
245-byte BIG-IP "Request Rejected" page as the rest of the estate, so treat all
of `gouv.mc` except `journaldemonaco.gouv.mc` as refusing. `uni.lu` confirmed
returning 202 with zero bytes on `/fr/formations/`, which is why Luxembourg is
unfilled for access rather than absence. NXDOMAIN: `www.mathe.gov.gr`,
`www.study.gov.gr`, `philology.spbu.ru`, `www.thegi.education`,
`www.filoloskifakultet.ucg.ac.me`. `www.unistrasi.it` returns HTTP 500.
`highlands.ac.uk`'s course list (Jersey) is Craft/Vue -- its "all courses" page
is 541 KB of furniture with zero course entries.

**From the African entry-requirements pass.** `uneb.ac.ug` — the Uganda
National Examinations Board — **302-redirects to a spam domain**
(`goaltap.snaring.click`). That is a compromised or lapsed domain, not an
outage, and nothing served from it should be cited. `necta.go.tz` has an
expired TLS certificate. `dnea.gov.na` connect-times-out. `kuccps.ac.ke` is
NXDOMAIN; the live Kenyan hosts are `kuccps.net` and `students.kuccps.ac.ke`.

`unisey.ac.sc` (Seychelles) serves **HTTP 404 with 329-408 KB bodies** on
`/entry-requirements/`, `/courses/` and every course slug — another big-404 of
the kind that reads as a populated page. `usl.edu.sl/entry-requirements/` 404s
while `admissions.usl.edu.sl` serves the same text.

New NXDOMAINs: `ustp.st`, `mohere.gov.gm`, `unge.gq`, `quanef-gb.org`,
`mesrs.gouv.tg`, `mesrs-td.org`, `univ-ndjamena.td`, `eit.edu.er`, `enssup.ma`.
`enssup.gov.ma` connect-times-out. `admission.gov.sd` answers 200 with an 8.8 KB
stub carrying only a ministry title.

**More HEPO slots that are image scans**, to add to the list above:
`gab_HEEdLawLi` (8.6 MB yielding 17 bytes of text), `mdg_HELawLi`,
`sen_HELawLi`, `sle_HELawLi`, `gin_HELawLi`, `mwi_HEEdLawLi`, `tcd_RecAutoLi`,
`gmb_QALegLi`, `tgo_HELawLi`, `gnb_HEEdLawLi`. And the HEPO **country-graph page
500s** — rather than 404s — for ERI, GNQ, STP and SYC, which is how you can tell
those four have no HEPO entry at all rather than a missing document.

**From the Americas offerings pass.** `www.ueh.edu.ht` and `fla.ueh.edu.ht`
(Universite d'Etat d'Haiti) 403 with a 732-byte body; the working door is
**`anciensite.ueh.edu.ht`**, the university's own retired-but-live site, which
serves the full faculty pages. Beware that `anciensite.ueh.edu.ht/ecoles/`
returns **HTTP 200 with a body reading "404 Error - Page not Found"** -- the
inverse of a big-404 and just as silent.

`www.ucv.ve` and `ucv.ve` refuse the connection on 443; Venezuela rests on
`www.ula.ve`. `www.uprrp.edu` connect-times-out while `www.upr.edu` serves.
`www.fil.una.py` connect-times-out and `isl.una.py` is NXDOMAIN. Further
NXDOMAINs: `www.dsc.dm` (use `dsc.edu.dm`), `ipa.aw`, `sibe.sunedu.gob.pe`.

**`catalog.manoa.hawaii.edu` answers 202 with a zero-byte body** on every
`content.php` path -- the same AWS-WAF shape already recorded for
`sso.agc.gov.sg` and `uni.lu`.

**More big-404s**, and the largest yet: `unan.edu.ni/index.php/carreras`
returns 404 with **1,035,463 bytes**. Also `una.py/oferta-academica` (226 KB),
`mona.uwi.edu/dmll/` (30 KB), `sunedu.gob.pe` (131 KB), `urp.edu.pe` (354 KB)
and `nau.edu` (123 KB).

**`fachumanidades.up.ac.pa/licenciaturas` is mixed-encoding**: mostly UTF-8
with a stray 0xED byte at offset 3040. A strict UTF-8 decode raises, a latin-1
decode mojibakes the accents, and only a replace-errors decode or the gate's
union of both finds the quotes. The gate copes; a hand-rolled checker will not.

**The MLA Language Enrollment Database cannot be cited.** Its results CGI
(`apps.mla.org/cgi-shl/docstudio/docs.pl?flsurvey_results`) is POST-only and
the same parameters as a GET return a page with no rows. It also counts
enrolments rather than degree programmes, so it answers `he.enrolment` and not
`offerings`. No plain-GET IPEDS completions query was found either, which is
why the United States is filled by named institution rather than by total.

## 21. The African `he.requiredStudy` pass: HEPO's other slots, and Arabic presentation forms

Added 7 September 2026 filling `requiredStudy` for 50 African units. Every
observation here is from a direct probe on this machine.

### `_HEEdPlanLi` is the slot that opens the countries whose law slots are scans

Section 20 records that many HEPO law PDFs are image scans. It is worth adding
what to reach for when they are. Across the 50 units, `_HELawLi` plus
`_HEEdLawLi` gave a text layer for **34**; adding `_HEEdPlanLi` recovered
**12 more** -- Angola, Burkina Faso, Burundi, CAR, Congo-Brazzaville, Gambia,
Guinea, Guinea-Bissau, Lesotho, Malawi, Chad and Togo, each 150 KB-1.3 MB of
clean text.

**But it is a sector PLAN, not a statute**, so its silence is weak evidence
about a legal duty. Use it to find out what the law is called and what the
system does; do not file "the framework law contains no such provision" off it.

### The country-graph page lists more slots than the five that are documented

`/pc/policy/countrygraph/cp/<ISO3>/` returns ~1 MB and names every file it
holds. Beyond `HELawLi`, `HEEdLawLi`, `QALegLi`, `HEEdPlanLi` and `RecAutoLi`,
these exist: **`HEPlanLi`, `RecQualLi`, `RecPrivLi`, `RecAcFreeLi`,
`AccModNSTLi`, `AccQuoLi`, `ConLi`, `FinAgLegLi`**. Read the names off the page
rather than guessing -- and note that **several slots serve the same file**:
`ago_HELawLi`, `ago_RecAutoLi`, `ago_RecPrivLi` and `ago_RecAcFreeLi` are all
4,095,421 bytes, so a second slot is often not a second document. A file linked
from a country page can still 404: `mwi/che_act.pdf` does.

### More HEPO slots with no text layer, to add to section 20's list

Whole-country scans (every slot tried yields under 60 bytes): **Angola**
(HELawLi, HEEdLawLi, QALegLi, RecAutoLi, RecQualLi, RecPrivLi, RecAcFreeLi),
**Burundi** (HELawLi, RecAutoLi, RecQualLi, RecPrivLi, AccModNSTLi -- but
`bdi_QALegLi` DOES extract, 35 KB), **Guinea** (HELawLi, QALegLi, RecAutoLi,
RecPrivLi, RecAcFreeLi, AccQuoLi, AccModNSTLi).

Single slots: `civ_HELawLi`, `cmr_HELawLi` (57 MB yielding 843 bytes),
`caf_RecPrivLi`, `caf_AccModNSTLi`, `bfa_RecPrivLi`, `bfa_RecAcFreeLi`,
`gab_HEEdLawLi`, `gmb_QALegLi`, `gnb_HEEdLawLi`, `lso_RecPrivLi`,
`moz_HEEdLawLi`, `mwi_RecPrivLi`, `mwi_FinAgLegLi`, `nam_HEEdLawLi`,
`tcd_RecPrivLi`, `tcd_RecAcFreeLi`, `tgo_RecPrivLi`, `tgo_RecAcFreeLi`,
`tgo_FinAgLegLi`. `tgo_QALegLi` extracts (20 KB) where `tgo_HELawLi` does not.

Confirmed again: **ERI, GNQ, SYC and STP have no HEPO document at all** -- every
slot 404s and the country-graph page 500s.

### Arabic presentation forms: a silent quote failure with a known remedy

Four of the Arabic PDFs extract into the **Arabic Presentation Forms blocks
(U+FB50-U+FEFF)** rather than the standard Arabic block, and pdftotext also
interleaves U+202B/U+202C directional marks between runs:

```
egy_HELawLi   1,344 standard-block chars vs 74,629 presentation forms
sdn_HELawLi     225                          9,536
lby_HELawLi   1,160                          3,942
lby_HEEdLawLi   ---                          presentation forms throughout
```

A quote typed in ordinary Arabic -- `اللغة العربية` -- is **not a substring of
that text**, so a perfectly correct quote reads as invented. NFKC (or NFKD)
normalisation maps the presentation forms back and the quote is then found.
Two practical consequences: **search under NFKC, but quote the RAW extracted
substring**, because the raw form matches whether or not the reader normalises;
and **keep the quote inside one directional run**, since a span crossing a
U+202B boundary cannot be reproduced.

`dza_HELawLi` and `dza_HEEdLawLi` are the other Arabic failure mode: standard
block, but glyph-substituted -- ي extracted as ً, ق as ل, ، as `q`, and ي as `X`
mid-word, so `رقم` comes out `رلم`. Section 20 records this for `dza_HELawLi`;
it applies to the education-law slot too.

`mrt_HELawLi` and `egy_HEEdLawLi` are clean standard-block Arabic and quote
normally. And `mrt_HEEdLawLi` is **not Arabic at all** -- it is the French
Journal Officiel text of Mauritania's loi d'orientation 2022-023, which is the
easier door to that instrument.

### Algeria stays unreadable, and this narrows why

`joradp.dz` served the 1999 French Journal Officiel issue at **200 and
1,312,819 bytes with a 24-byte text layer** `[checked here]`, confirming
section 20's record that the 1990s issues are image scans. `www.mesrs.dz`
(200, 1.4 MB), `www.education.gov.dz` (200) and `www.univ-alger.dz` (200) all
serve but carry no statute text; `services.mesrs.dz` answers **200 with zero
bytes**. With `dza_HELawLi` holding an index rather than a law, Algeria has no
readable higher-education instrument by any door tried, and its `requiredStudy`
is `insufficient` for access rather than for absence.

### The door that worked for South Africa

`www.gov.za/sites/default/files/gcis_document/<YYYYMM>/<gazette><notice>.pdf`
serves South African Government Notices as real PDFs with clean text layers --
605,816 bytes and 34,497 characters for the 2020 Language Policy Framework for
Public Higher Education Institutions. This matters because the university hosts
do not: `ulwazi.ukzn.ac.za` is NXDOMAIN, `ukzn.ac.za` and `www.ukzn.ac.za`
return 404 with a 16-byte body on their language-policy paths, and
**`www.up.ac.za/language-policy` is another big-404 -- HTTP 404 with 54,515
bytes** of full site furniture. `dhet.gov.za` 404s the same document that
`gov.za` serves.

**A REVERSE user-agent case, which the fallback chain exists for.**
`nus.edu.ws`, the National University of Samoa, returns 403 with a 75,193-byte
block page to the full Chrome user-agent and **200 with 265,684 bytes to a bare
`Mozilla/5.0` or to no user-agent at all**. That is the same shape as
`education.gov.gy` above, and it is the reason the gate tries a short UA after
the Chrome one rather than treating a 403 as final. A drafter who only ever
sends the Chrome UA will record this host as blocked when it is not.

`palau.edu` fails with an untrusted root on 443 and times out on 80, so Palau
Community College is unreachable. `highlands.ac.je` (University College Jersey)
and `thegi.ac.gg` (The Guernsey Institute) do not connect on 443.
`admitere.usm.md` 503s on every path while the main `usm.md` host serves the
same lists.

**Two host corrections.** `filoloskifakultet.ucg.ac.me` is now NXDOMAIN on the
bare host as well as `www.`; the working door is `www.ucg.ac.me/fil`. And
`flf.ukim.edu.mk` is NXDOMAIN — the faculty has moved to **`flf.ukim.mk`**,
read off UKIM's own faculty index rather than guessed.

**More big-404s**: `uog.edu/...linguistics/index.php` (167 KB), `marianas.edu/programs/`
(57 KB), `usp.ac.fj/...linguistics/` (106 KB). `unc.nc/formations/` returns 500
and `upf.pf/fr/formations` 403s with 68 KB.

### The sixteen countries HEPO could not serve, and the doors that did

Same pass. These are the routes that answered where every HEPO slot was a
404 or a scan, and they are worth more than the blocks.

| Door | What it serves |
|---|---|
| `natlex.ilo.org/dyn/natlex2/natlex2/files/download/<isn>/<CODE-isn>.pdf` | **200 even though every NATLEX *detail* page 403s.** Gave Burkina Faso's 2008 higher-education decree and Chad's loi 06-016 with clean text layers |
| `commons.laws.africa/akn/<cc>/act/<year>/<n>/eng@<date>.pdf` | Laws.Africa consolidations; both Lesotho acts came from here |
| `media.malawilii.org/files/legislation/akn-mw-act-<year>-<n>-eng-<date>.pdf` | Malawi's statutes as real PDFs. **`lesotholii.org` and `malawilii.org` both answered 200** `[checked here]` -- section 20 records lesotholii as a 403, and that is now stale |
| `liziba.cg/wp-content/uploads/` | Congo-Brazzaville's own legal portal, serving the CEMAC LMD directive and the 2022 private-HEI decree |
| `boe.gob.gq/files/` | Equatorial Guinea's Boletín Oficial; the consolidated Ley General de Educación has a clean text layer |
| `gov.za/sites/default/files/gcis_document/<YYYYMM>/<gazette><notice>.pdf` | South African Government Notices |
| `media.unesco.org/sites/default/files/webform/r2e002/<hash>.pdf` | UNESCO's Right to Education document store; the only readable copy of São Tomé's Lei 2/2003 |

**Newly observed refusals and traps.**

- **`gazette.sc` (Seychelles) needs its own host as the Referer.** With
  `-e https://www.google.com/` it 403s; with `-e https://www.gazette.sc/` the
  same path returns 200. This is the inverse of the usual advice in section 4
  and it will look like a block to any client sending a search-engine referer.
- **`seylii.org` now redirects to a Decisia portal that serves no legislation**,
  and `gambialii.org` is **NXDOMAIN**. Neither is a route to those statutes.
- `naqaa.gm` serves at 200 but its copies of the **Tertiary and Higher
  Education Act 2016** (17.9 MB) and the NAQAA Act 2021 (6.6 MB) are image-only
  -- 51 and 38 bytes of text. Its **GNQF Policy Document extracts cleanly**, and
  is what The Gambia rests on. `moherst.gov.gm` serves a parked Virtualmin page.
- `repositoriodigital.me.gov.st` still presents a **self-signed certificate**
  `[checked here]`; only `curl -k` gets São Tomé's Lei 4/2018 out, so the 2018
  law is not citable by this pipeline and the entry rests on the 2003 law it
  replaced. Wayback has no copy and `planipolis.iiep.unesco.org` served the
  **3,143-byte Anubis challenge at 200** again, exactly as section 10 records.
- **Image-only statutes, the recurring blocker.** Burundi's loi 1/07 of 2020
  reorganising higher education (5.0 MB → 40 bytes, and the Assemblée nationale
  bulletin copy is the same scan), Congo's loi 25-95 (857,662 bytes → 6 bytes,
  byte-identical on `liziba.cg` and `unicongo.cg`), and the two Gambian acts
  above. This environment has `pdftotext` but no `pdftoppm`, `pdfimages` or
  `tesseract`, so a scan cannot be read here at all -- not merely not quoted.
  Installing poppler's rasteriser or an OCR tool would decide four of these
  units.
- CAR and Guinea have no retrievable framework act at all: `miniduc-rca.net` is
  NXDOMAIN, `univ-bangui.org` fails TLS on principal mismatch, `sgg.gov.gn` and
  `cnt.gov.gn` 403, and `mesrs.gov.gn` answers 200 with an empty `/lois/`.
  Université Laval says outright of Guinea that the 1997 orientation law and its
  decree "ne sont pas disponibles".
- Eritrea: the Library of Congress *Gazette of Eritrean Laws* collection 403s
  behind a bot interstitial, and Wayback CDX for `moe.gov.er`, `www.moe.gov.er`
  and `nbhe.gov.er` all return **empty sets**. There is no located Eritrean
  education act; UNESCO's PEER profile says the country has none.

**Arabic PDFs that extract into presentation forms, and why a correct quote
reads as invented.** Egypt's, Libya's and Sudan's higher-education instruments
extract into the Arabic Presentation Forms block (U+FB50-FEFF) rather than the
standard Arabic block. A quote typed in ordinary Arabic is therefore not a
substring of the extracted text, and a checker sees a correct quote as
fabricated. The way through is to search under NFKC but to QUOTE THE RAW
SUBSTRING, kept inside a single U+202B directional run, which is what the
surviving Egyptian, Libyan and Sudanese rows do.

**Two doors that turned out to be open.** NATLEX's file-download path serves
200 while its detail pages 403, so the instrument is reachable even when its
record is not. And `gazette.sc` (Seychelles) requires ITS OWN HOST as the
Referer -- the inverse of the usual google.com trick, and worth trying whenever
a government host refuses a request that looks otherwise correct.

**One record above is now stale**: `lesotholii.org`'s 403 no longer reproduces.

**`joradp.dz` again, with a number.** Algeria's 1999 gazette issue is a 1.3 MB
PDF with a 24-byte text layer. The register serves, and cannot be quoted.

**IESALC HEPO, third pass, and a variant BRIEF.md did not name.**
`_HELawLi` plus `_HEEdLawLi` gave extractable text for 34 of 50 African units,
matching the previous pass exactly. **`_HEEdPlanLi` opened twelve more** -- but
it is a sector PLAN, not an instrument, so it is orientation and must not carry
an absence claim about a law. The country-graph page lists eight further slot
names and several of them serve byte-identical files.

## 22. The Americas `he.requiredStudy` pass: two reverse-UA hosts and a register worth keeping

Added 8 September 2026 filling `requiredStudy` for 28 units in the Americas.
Every observation here is from a direct probe on this machine, with both a full
Chrome User-Agent and a bare `Mozilla/5.0`.

### The reverse User-Agent case, twice more, and it decided two units

Section 12 records `education.gov.gy` refusing the long UA and serving the short
one. Two more hosts in this pass behave the same way, and in both the long UA is
what a careful drafter sends:

```
laws.bahamas.gov.bs/            Chrome UA -> 403,  75,193 bytes (block page)
                                Mozilla/5.0 -> 200
barbadosparliament-laws.com/    Chrome UA -> curl error 47, 50 redirects
                                Mozilla/5.0 -> 200, 137,401 bytes
```

The 75,193-byte block page is the same body already recorded for `nus.edu.ws`
and `unigib.edu.gi`, so that number is now a reliable fingerprint for this WAF.

**And the same pass met the OPPOSITE case in the same hour.** `www.ua.aw`,
`www.ueh.edu.ht` and `anciensite.ueh.edu.ht` all return **HTTP 406** to a bare
`Mozilla/5.0` and 200 to the full Chrome string. There is no safe default: probe
both, which is what the gate's fallback chain does and what an agent must do by
hand.

### Two doors worth more than the blocks

- **`barbadosparliament-laws.com/uploads/Barbados-cs/<Title_With_Underscores>.pdf`**
  serves the consolidated statute as a real PDF with a clean text layer. The
  `/en/showdoc/cs/<n>` landing page is a dFlip JavaScript viewer that renders
  "Loading document..." and nothing else; the PDF path is in its inline script.
  `Education.pdf` is the Education Act Cap. 41 — 1.76 MB, 86,845 characters.
- **`mola.gov.gy/laws-of-guyana?page=N`** is the Laws of Guyana, and it works.
  52 pages, about nine chapters each, every row carrying a
  `mola.gov.gy/laws/Volume N Cap. X - Y.<digits>.pdf` link that serves a real
  PDF. Chapter 039:02, the University of Guyana Act, is on page 23. Note that
  the `search_text=` parameter is **ignored** — every query returns page 1 —
  so page through rather than searching, and that
  `mola.gov.gy/information/laws-of-guyana` is a **24,753-byte 404** while
  `mola.gov.gy/laws-of-guyana` serves. `parliament.gov.gy/documents/acts` 403s
  to both UAs while `parliament.gov.gy/` root serves.

### Silent failures, the dangerous class again

- **`gacetaoficial.gob.pa`** (Panama's Gaceta Oficial) returns **HTTP 200 with a
  212-byte Incapsula `_Incapsula_Resource` stub** for every `pdfTemp/...` path,
  to both UAs. Panama's entry cites this host for Ley 18 de 2017 and it does not
  serve. `docs.panama.justia.com/federales/leyes/<n>-de-<yyyy>-<mon>-<d>-<yyyy>.pdf`
  serves the LEGISPAN text at 200 with a clean text layer, while
  `panama.justia.com` HTML 403s — the PDF host is open and the HTML host is not.
- **`bacn.gov.py/descarga/<id>/<file>.pdf`** (Paraguay's Biblioteca y Archivo
  Central del Congreso) returns the site's **own HTML at 200** in place of the
  PDF, which `pdftotext` then reports as a damaged file. The law pages
  themselves — `bacn.gov.py/leyes-paraguayas/<id>/<slug>` — carry the full act
  text server-side and are the door to use.
- **`ub.edu.bs/wp-content/uploads/UniversityofTheBahamasAct2016_1.pdf`** is a
  **3.8 MB image scan yielding 274 characters**. The same site's
  `about-ub/ub-act-charter-statutes/` page carries the Act with its Statutes and
  Bye-Laws as 52 KB of server-rendered HTML and is what the Bahamas rests on.
  Same shape at `senado.uprrp.edu`: its `Ley-UPR-Comp-2013.pdf` is 1.4 MB
  yielding 315 characters, while **`docs.upra.edu`'s copy of the same 1966 UPR
  act extracts cleanly** (55,934 characters).

### A mixed-encoding page, the fifth encoding case

`bacn.gov.py`'s law pages are **UTF-8 with a stray 0xe9 byte** — at offset
89,292 in the Ley de Lenguas page. A strict UTF-8 decode raises; a latin-1
decode mojibakes every accent; only a replace-errors decode or the gate's union
finds the quotes. This is byte-for-byte the shape already recorded for
`fachumanidades.up.ac.pa/licenciaturas`, so it is a class rather than a
one-off: **a Latin American government page can be UTF-8 everywhere except one
byte, and a hand-rolled checker will call every quote on it invented.**

### IESALC HEPO in the Americas

Tried `_HELawLi` and `_HEEdLawLi` for 22 Latin American and Caribbean iso3
codes. **Eleven had at least one document**: per, mex, jam, tto, pan, pry, slv,
ury, ven, nic, grd. The Anglophone Caribbean is largely absent — atg, bhs, blz,
brb, dma, guy, kna, lca, sur, vct all 404 on both slots — so those units need
their own ministry or attorney-general hosts, which mostly serve.

Three of the eleven are not usable as filed:

```
jam_HELawLi     172,522 bytes ->      4 chars   (scan)
pry_HEEdLawLi 1,960,765 bytes ->     28 chars   (scan)
pan_HEEdLawLi 6,192,334 bytes ->  1,520 chars   (LEGISPAN cover sheet only)
```

And `pry_HELawLi` extracts (65,629 characters) but the **OCR is degraded** —
"sistema educarivo nacional", "los Institulos", "EICentenario" — so a
zero-occurrence absence claim off it is not safe on its own. `jam_HEEdLawLi` is
byte-identical to `laws.moj.gov.jm/library/statute/the-education-act/download`,
so HEPO's Jamaica slot is just the Ministry of Justice PDF; cite the ministry.

### Newly observed, briefly

- `uscode.house.gov` — connect timeout on 443. **`govinfo.gov/content/pkg/USCODE-<year>-title<NN>/html/USCODE-<year>-title<NN>-chap...-sec<N>.htm`
  serves clean section text** and is the door to the US Code. Its section symbol
  and en-dashes arrive as replacement characters, so keep a quote clear of them.
- `www.attorneygeneral.gov.kn` — NXDOMAIN. `education.gov.kn` serves the
  Education Act 2005.
- `www.gov.vc` root serves, but `/index.php/documents-publications` is a
  **45,561-byte 404**. `education.gov.vc/education/images/PDF/education_act_2006.pdf`
  serves the Education Act Cap. 202.
- `commonlii.org` — 403 with an identical 5,425-byte body on every path tried,
  to both UAs. Section 13 records it as intermittent; it refused throughout this
  pass.
- `planipolis.iiep.unesco.org` — the **3,143-byte Anubis challenge at HTTP 200**
  again, confirming section 10. It is the top search hit for several Caribbean
  education acts and serves none of them.
- `www.uprrp.edu` **and** `www.upr.edu` both connect-time out now. Section 20
  records only `www.uprrp.edu`; `www.upr.edu` was serving then and is not now.
- `bvirtual.ogp.pr.gov` — 404 on every Puerto Rico statute path tried.
- `www.cones.gov.py` and `www.mec.gov.py` — **connect timeout on 443.** This
  matters: `BRIEF.md` calls CONES "the best register found anywhere so far" for
  programme listings. It is currently down, and a pass planning around it should
  probe before planning.
- `www.lexjuris.com/LEXMATE/educacion/lex66001.htm` serves Puerto Rico's UPR act
  in **latin-1 with no declared charset**, the same shape as
  `axl.cefan.ulaval.ca`.

## 23. The European `he.requiredStudy` pass: doors to twenty-three statutes

Added 8 September 2026 filling `requiredStudy` for 24 European units. Every
observation is from a direct curl probe on this machine with the full browser
UA and a google.com referer.

### Doors that worked, and are worth reusing

| Register | The door |
|---|---|
| **Portugal** | `files.diariodarepublica.pt/1s/<yyyy>/<mm>/<issue>/<startpage><endpage>.pdf` serves the whole gazette issue as a clean-text PDF. Lei 62/2007 (RJIES) is `.../1s/2007/09/17400/0635806389.pdf`; DL 74/2006 is `.../1s/2006/03/060a00/22422257.pdf` — note the 2006 Série I-A issue token is `060a00`. Pages are ZERO-PADDED to five digits each. This is the working route now that `dre.pt` is an OutSystems shell |
| **Slovakia** | `slov-lex.sk/static/SK/ZZ/<year>/<num>/<YYYYMMDD>.html` returns the full consolidated act as server-rendered HTML — 1.7 MB for act 131/2002. It 302s to `static.slov-lex.sk`; both work. Better than the `static/pdf/` path already recorded |
| **Slovenia** | `uradni-list.si/glasilo-uradni-list-rs/vsebina/2012-01-1406?sop=2012-01-1406` carries the whole consolidated ZViS-UPB7 (194 KB of text). The `urlurid=` form also serves; a wrong `vsebina/<id>` returns a real page for a DIFFERENT instrument, so check the title before quoting |
| **North Macedonia** | `slvesnik.com.mk/Issues/<32-hex>.pdf` serves the gazette issue with a clean text layer — the 2018 Law on Higher Education is issue 82 at `e70eb6afb4a04960b76db298d126db17.pdf`. The hash is not derivable; take it off a search result |
| **Isle of Man** | **`desc.gov.im` (no `www.`)** serves 200, and `desc.gov.im/corporate/corporate/legislation/` links a `/media/<hash>/` store: `educationact2001_9.pdf` is 907 KB with a clean text layer. `www.desc.gov.im` is **NXDOMAIN** — section 9's records are for the `www.` host and the bare host is the one that works |
| **San Marino** | `unirsm.sm/ateneo/leggequadro-statuto/` links the 2023 framework law (`17139243L069-2023.pdf`), the Decreto Delegato 169/2023 and the Statuto as plain-GET PDFs. This matters because the Consiglio Grande e Generale's own law archive is a POST-only search form with no citable GET |
| **Faroe Islands** | `logir.fo/Kunngerd/<n>-fra-<dd-mm-yyyy>-um-<slug>` serves regulations server-side exactly as `/Logtingslog/` does. `logir.fo/Logtingslog` (the bare index) 404s, so the slug still has to come from elsewhere |
| **Russia** | `fgosvo.ru/uploadfiles/FGOS%20VO%203++/Bak/<code>_B_3_<ddmmyyyy>.pdf` serves the FGOS orders as clean PDFs. The portal's own `/fgosvo/index/24` listing is JavaScript, and the date suffix is per-standard and not guessable — a wrong filename 404s with a 179-byte body |
| **Moldova** | `cpbmd.info/wp-content/uploads/2026/01/codul-educatiei-RM.pdf` was the ONLY readable copy of the Education Code found. `usmf.md` is NXDOMAIN, `social.utm.md` 403s, `legis.md` still Cloudflare-403s, and `mecc.gov.md`, `mec.gov.md`, `ance.gov.md` and `anacec.md` 404 every guessed path. cpbmd.info is already in section 8 as a host the gate's UA reads |
| **Monaco** | `journaldemonaco.gouv.mc/Journaux/<year>/Journal-<n>/<slug>` serves full act text server-side; loi 1.334 of 2007 is Journal 7817. Confirms section 9 — this is the working door while the rest of `gouv.mc` refuses |
| **Jersey** | `jerseylaw.je/laws/current/l_<num>_<year>` serves the consolidated law. **The number is not the one search results suggest**: the Education (Jersey) Law 1999 is `l_27_1999`, and `l_14_1999` is the Law Reform (Disclosure and Conduct before Action) Law — a wrong id returns a real, populated page for a different statute |

### Newly observed refusals

- **`arhiva.mon.gov.mk` and `www.pravdiko.mk` both present EXPIRED TLS
  certificates** (`SEC_E_CERT_EXPIRED` to curl). `mon.gov.mk` itself serves but
  `mon.gov.mk/stored/document/*.pdf` 404s on every filename tried.
- **`sonk.org.mk/wp-content/uploads/...` returns 404 with a 23 KB body** while
  `www.sonk.org.mk/documents/...` serves the real PDF. Same host, two paths.
- **`www.gov.gg` returns 404 with a 21 KB body**, and its `article/<id>` ids are
  not topic-stable — `article/152122`, returned by search as "Higher Education",
  is a page about importing poultry. Both halves of that are traps.
- `natlex.ilo.org/dyn/natlex2/r/natlex/fe/details?p3_isn=` 403s, confirming
  section 21: the detail pages refuse and only the file-download path serves.
- `usmf.md` NXDOMAIN. `social.utm.md` 403 with the 3,360-byte body that
  `guernseylegalresources.gg` also returns.

### Guernsey is unreadable, and this narrows why

`guernseylegalresources.gg` still 403s every path with a 3,360-byte Cloudflare
body. Its Wayback copies do not rescue it: the archived landing page for the
Education (Guernsey) Law 1970 consolidated text (200, 5,430 bytes, snapshot
20250822123348) carries **no document link at all** — the text is behind a
"view printable version" JavaScript action, and the 2015 `article/94439`
snapshot has only a `pdf_icon.gif`. The CDX listing confirms the law exists on
the host under both the old `article/<id>` and the new
`/laws/guernsey-bailiwick/e/education/` schemes; neither snapshot holds the
body. **Guernsey is empty for access, not for absence**, and it is the only one
of the 24 units in this pass that is.

### riksdagen.se double-spaces, like paragraf.ba

Section 18 records `paragraf.ba` hard-wrapping with DOUBLE SPACES inside
sentences. `riksdagen.se`'s SFS pages do exactly the same: the
Högskoleförordning's 7 kap. 5 a § reads `har lägst  betyget E i ämnena svenska`
in the raw HTML, with the doubled space at each line wrap roughly every 50
characters. The longest single-spaced run near a language clause there is 12
words, which is under the 10-word floor only by luck. A normalised quote
survives on the space-stripped comparison; a drafter checking by raw substring
will think its own correct quote is wrong.

### Two consolidators used, and flagged as such

- **Romania**: `aracis.ro/wp-content/uploads/2024/10/legea-invatamantului-superior-nr-199-2023.pdf`
  is a **Lege5/Indaco print** ("Document Lege5 - Copyright © 2024 Indaco
  Systems", "Tipărit de Cristian Eni la 02.10.2024") hosted by ARACIS, the
  national quality agency. Clean text, 553 KB, and the only readable copy found
  while `legislatie.just.ro` still drops connections.
- **Montenegro**: `paragraf.me` carries the consolidated Zakon o visokom
  obrazovanju and **announces on the page that the site will no longer be
  updated** — "sajt nadalje neće biti ažuriran usljed odluke kompanije Paragraf
  Lex da se privremeno povuče sa tržišta Crne Gore". The text is stamped current
  to 31 March 2021. Treat it as a frozen consolidator and expect it to go.

## 21. The Asia `he.requiredStudy` pass

Thirty-one Asian units on one field. The headline is a door, not a block.

### IESALC HEPO covers Asia, not only Africa and Latin America

`BRIEF.md` recommends HEPO "for African and Latin American higher-education
statutes". It is much wider than that. On this pass the lowercase-iso3 path

    hepo.iesalc.unesco.org/pc/static/countrydocs/cp/2025/<iso3>/<iso3>_HELawLi.pdf

returned the national higher-education law with a clean text layer for
**geo, kor, mng, lka, tjk, yem, btn, syr, phl, tha, bhr, irq, kwt, pse**, and
`_HEEdLawLi` added **brn, khm, sgp, npl, jpn**. That is 19 of 31 units from one
predictable url pattern, including the Brunei Education Order 2003 that section
10 records as unreachable because `agc.gov.bn`'s certificate has expired, and
the Syrian and Palestinian higher-education laws.

404s (269 bytes) for afg, irn, mdv, mmr, prk, tkm, tls, uzb, lao (`lao` has a
`_HEEdLawLi` but it is an image scan, 34 bytes of text). `qat_HEEdLawLi` is the
2001 **compulsory-schooling** law, not a higher-education instrument — HEPO's
slot labels are a guide, not a guarantee, exactly as the Algeria and Comoros
cases in `BRIEF.md` say.

### Two quote hazards in HEPO's Arabic PDFs, both silent

Seven of the Arabic laws are **print-to-PDF captures of a web page**, and the
extracted text carries **U+202A / U+202B / U+202C bidi controls between every
run**. A quote that spans two runs can never match under any extractor. Choose
a span that lies wholly inside one control-free run; the runs are usually a
clause long, which is enough.

Worse, **Syria's copy writes ی (U+06CC, Farsi yeh) and ھ (U+06BE, heh
doachashmee) where the Arabic block has ي and ه**. `اللغة العربية` is simply
not in that file; `اللغة العربیة` is. An NFKC fold does not touch this, so a
folded search for correct Arabic returns zero occurrences and reads as the law
having no language provision at all. It has one — art. 20. Kuwait's 1966 law
and Syria's are additionally in **Arabic Presentation Forms**, so the raw
extracted substring is the only safe quote.

### `bdlaws.minlaw.gov.bd` is UTF-16BE — the fifth encoding case

Section 14 records UTF-16**LE** on Andorra's BOPA. Bangladesh's official law
site serves **UTF-16 big-endian with a BOM** on every page. Both gates detect
UTF-16 by BOM or NUL density, so this is handled; a drafter decoding by hand
gets a page of replacement characters and concludes the Bengali is corrupt.

Also: `act-<id>.html` is only a table of contents. The section text lives at
`/act-<id>/section-<n>.html`, and the section numbers are not derivable from
the section number in the act — read them off the contents page.

### Two live docLinks on this map that no longer serve

- **`lawskw.com`** — **HTTP 404 with a 103,232-byte body**, the big-404 class
  again. It is the Kuwait `he` entry's docLink for Law 76/2019. Kuwait
  University's own copy serves the full act at 501 KB with a clean text layer:
  `ku.edu.kw/sites/default/files/2025-10/<arabic-filename>.pdf`.
- **`bulatlat.com`** — 200 with a **1,196-byte obfuscated-JavaScript cookie
  challenge** (`/aes.js`, `TZTC=` cookie). It is the Philippines `he` entry's
  docLink for CMO 57. `legacy.ched.gov.ph/2017-ched-memorandum-orders/` serves
  the CMO index with the full order titles in body text and is the better
  citation.

### `asianlii.org` — the reverse User-Agent case again

Section 12 records `education.gov.gy` refusing the full Chrome UA and serving a
short one. AsianLII does the opposite, and the PDF is what matters:

```
full Chrome UA   -> 200, 157,014 bytes, %PDF-   (with or without a Referer)
"Mozilla/5.0"    -> 403,   5,493 bytes
```

The gate tries the full UA first, so Myanmar's National Education Law verifies.
`burmalibrary.org` 403s every client tried, and is not needed.

### Newly observed refusals and stubs

- **`qanoon.om`** — HTTP **525** (TLS handshake failed at origin), 16-byte
  body, on the root and on document paths. **`oaaa.gov.om` is NXDOMAIN.** Oman
  has no reachable higher-education instrument by any door tried, which is why
  it is empty for access rather than for absence. HEPO's Oman slot holds Royal
  Decree 67/2000, which is about fees.
- **`minjust.gov.tm`** — 404 with a 57 KB body on `/ru/mejlis/law`.
  **`bilim.gov.tm/media/legal_documents/document_5.pdf` is the working door**
  to the Law of Turkmenistan on Education, 597 KB with a clean text layer, and
  its art. 5 answers the compulsory-study question outright.
- **`laoofficialgazette.gov.la`** — `index.php?r=site/displaylegal` resets the
  connection, but the static `kcfinder/upload/files/` path serves. Note that
  the English Education Law there is now the **2024 amended text (No. 69/NA,
  11 December 2024)**, not the 2015 revision the atlas's Laos entries cite.
- **`lex.uz`** — the leading-hyphen form `/ru/docs/-5013009` 404s; the same id
  without the hyphen serves 738 KB. Both forms appear in existing docLinks.
- **`ched.gov.ph`** 403s while `legacy.ched.gov.ph` serves — but the 2017 CMO
  PDFs there are **image scans**: CMO 57 is 421,878 bytes yielding 2 bytes of
  text. Quote the index page, not the order.
- **`ffll.ut.ac.ir`** — 200 with a ~6 KB JavaScript "Transferring to the
  website" stub on `asset_publisher` document paths.
- **`cis-legislation.com`** — 200 with a 190-byte body.
- **`lawcommission.gov.np/en/?cat=`** — 404 with a 23 KB body.
- **`mohe.gov.mm`** does not resolve. **`moj.gov.af`** serves its root but its
  official-gazette path 404s with 33 KB.
- **`mqa.gov.mv`** serves the Maldives higher-education regulations fine, but
  they are Thaana and section 8's finding stands: no span survives two
  extractors, so nothing there is quotable.

### An entity hazard mid-sentence

`samt.ac.ir` (the Iranian ministry's university-textbook organisation) writes
`&zwnj;`, `&laquo;` and `&raquo;` **inside** its body sentences, so a Persian
quote spanning a compound word or a quoted course title needs the gate's
entity decoding to match. Pick a span between the entities where you can.

### The Dutch Caribbean and Suriname, from the same pass

Four units that no comparative source covers, and the doors are worth keeping
because each was found the hard way.

| Territory | Instrument | The door that serves |
|---|---|---|
| Aruba | Landsverordening Universiteit van Aruba, AB 1988 no. 100 | **`cuatro.sim-cdn.nl/arubaoverheid2858bd/uploads/1304ab88.100.pdf`** — 200, 88 KB, clean text layer (29,647 chars), to BOTH user-agents. The index that carries the link is `gobierno.aw/1304-hoger-onderwijs`. This is the CDN door section 7 already records for Aruban gazettes, and it also serves the Centraal Wettenregister's consolidated chapters |
| Curacao | Landsverordening Universiteit Nederlandse Antillen, P.B. 1979 no. 27 / 1985 no. 43 | **`repository.officiele-overheidspublicaties.nl/CVDR/143808/1/html/143808_1.html`** — 200, 86 KB, clean server-rendered HTML. Note the shape: `/CVDR/<id>/1/html/<id>_1.html`, **not** the `/CVDR/CVDR<id>/2/xml/...` form section 7 records for Sint Maarten. Version 2 404s for this record. `lokaleregelgeving.overheid.nl/CVDR<id>` serves the same text and is the fallback |
| Sint Maarten | Landsverordening regelende het voortgezet onderwijs, CVDR142635 | **`lokaleregelgeving.overheid.nl/CVDR142635`** — 200, 249 KB. Here the repository form is what fails: `/CVDR/142635/1/html/...`, `/CVDR/CVDR142635/1/html/...` and the xml variant all **404**. So neither CVDR url shape works for both territories — try both |
| Suriname | Universiteitswet, G.B. 1966 no. 78 | **`sris.sr/wp-content/uploads/2025/08/Universiteitswet-G.B.-1966-no.-78.pdf`** — 200, 527 KB, and an **image scan yielding 10 characters**. Same for `dna.sr/media/aoydme2y/sb-1993-no-36.pdf` (the 1993 titulatuur law), 210 KB yielding 4 |

**Suriname is unquotable, not unknown.** The Universiteitswet was located, fetched
and read page by page as images; it contains no language provision anywhere and
delegates the whole curriculum to landsbesluiten by art. 6. None of that can be
quoted, because this environment has `pdftotext` but no rasteriser and no OCR —
the constraint section 21 records for Burundi, Congo and The Gambia. So Suriname
is left blank rather than filled, and it would be decided by installing an OCR
tool rather than by more searching. `dna.sr`'s consolidated-texts index carries
only the Wet Lager Onderwijs and the Wet betreffende Universitaire Titulatuur
under education; the Universiteitswet is not in it. `sris.sr/?s=` returns **406**
to a bare `Mozilla/5.0`.

**Two structural cautions for anyone working these four again.**

- **CVDR is frozen at 10 October 2010** for Curacao and Sint Maarten — the
  dissolution of the Netherlands Antilles. Country legislation enacted since is
  simply not in it, so a CVDR sweep proving something does not exist proves only
  that it did not exist in 2010.
- **Sint Maarten appears to have no enacted higher-education ordinance at all.**
  A CVDR SRU sweep (`zoekservice.overheid.nl/sru/Search?x-connection=cvdr`,
  200) over all 1,552 Sint Maarten records returns zero with "universiteit" in
  the title and, for "hoger", only a tax-appeals landsbesluit. That is a real
  finding about the place and not about the network — but see the freeze above,
  and note that `sxmparliament.org/national-ordinances/` returns 200 with its
  ordinance table injected by JavaScript, so enactment status cannot be
  confirmed there. `sintmaartengov.org/Documents/Forms/AllItems.aspx` returns
  **401**.
