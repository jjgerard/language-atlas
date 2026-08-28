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
| `legislation.gov.im` | 403 challenge page `[checked here]` | none found; the Isle of Man stays a stub |
| `gibraltarlaws.gov.gi` | HTTPS connection accepted, then no bytes, then timeout `[checked here]` | none found; Gibraltar stays a stub. `gibraltar.gov.gi` itself answers 200 |
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
- Guam Compiler of Laws — CID-encoded; extraction returns garbage.

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

## A note on consolidators

Where the official register is in section 1 or 2 and has no side door, the
substitute is sometimes a commercial or third-party consolidator:
`paragraf.rs`, `paragraf.ba`, `net.jogtar.hu`, `jusline.at`, `cylaw.org`,
`natlex.ilo.org`, `fgos.ru`. Those rows are true — the quote is verbatim on
the page cited, and the gate confirms it — but they cite someone else's copy
of the state's text rather than the state's own publication.

They are kept, and they are recorded here, so that a later pass can upgrade
the url without redoing the research. The alternative was leaving Serbia,
Bosnia, Hungary and Austria blank.
