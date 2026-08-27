### US|Nevada - map dld, field serviceModel
STATUS: not-found (both the live host and the Internet Archive copy were unreachable in this session)

SOURCES:
 - label: "Internet Archive copy cited by this entry"
   url: https://web.archive.org/web/20250103084205/https://www.leg.state.nv.us/nac/nac-388.html
   http: 429 / connection timeout on five attempts spread over two hours
   tier: official-document
 - label: "Live host www.leg.state.nv.us - tested directly as a substitute"
   url: https://www.leg.state.nv.us/
   http: 403 (Georgia's rules.sos.ga.gov also 403; apps.gadoe.org does not accept connections)
   tier: official-document

NOTE: RETRIEVAL LOG: five attempts on the archive URL between 18:20 and 20:10, spaced by up to 15 minutes, returning either HTTP 429 (117-byte body) or a connection timeout after 21 seconds. Note that ONE archive URL (Montana, rules.mt.gov) DID succeed early in the session at 200, so the block is rate-limiting rather than a hard denial. Direct live hosts: apps.gadoe.org connection timeout, rules.sos.ga.gov 403, www.leg.state.nv.us 403, www.gencourt.state.nh.us 403.

EVIDENCE:
 - field: serviceModel
   quote: "(no quotation available - no retrieval succeeded in this session)"
   source: n/a

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Not filled: the Internet Archive rate-limited this network with HTTP 429
     - The live state host 403s a browser-identified request with a Google referer
     - This contradicts the project note that the Archive is reachable again
     - Retry from another network before calling this unit genuinely undocumented

RETRIEVAL NOTE (Internet Archive):
 The Archive was intermittent during this session, so every archived URL cited above
 was fetched and its body extracted before anything was quoted from it; the http code
 recorded is the one observed on the successful fetch, with byte counts as follows.
 - CLM 52nd Report (minorityaffairs.gov.in via web.archive.org): 200, 2,717,577 bytes,
   9,893 lines of text extracted with pdftotext.
 - Jhingran 2019 (unicef.org/rosa/media/3036 via web.archive.org): 200, 17,662,647 bytes
   on the first attempt, 4,622 lines of text extracted; a later duplicate request to the
   same URL in a parallel batch returned 429 with a 117-byte body. The quoted content
   comes from the successful fetch, not from the 429.
 - UNICEF ROSA country profile (Maldives): first attempt timed out (curl code 000, zero
   bytes); the second attempt returned 200 with 1,313,903 bytes and is the copy read.
 - UNICEF ROSA country profiles (Afghanistan, Bhutan, Nepal, Pakistan, Sri Lanka):
   200 on the first attempt, 694,008 / 3,768,572 / 3,076,761 / 3,593,280 / 3,031,302 bytes.
 No field in this file rests on an unfetched archive URL; nothing here is written as an
 absence on the strength of a failed retrieval.
