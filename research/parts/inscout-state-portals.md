## SOURCE 8 - State education portals, spot-check of three contrasting states - MOSTLY NEGATIVE

Verdict: **per-state primary sourcing from state education portals is NOT
realistic at scale.** Of five state-level hosts probed, two were dead at the
network level and the three that answered did not surface any language-policy
document from their front page.

| Host probed | observed |
|---|---|
| `https://dge.tn.gov.in/` | **200**, 22,154 bytes, title `<title>Directorate of Government Examinations</title>` |
| `https://www.tnschools.gov.in/` | **200**, 8,513 bytes (JS shell, little content) |
| `https://education.nagaland.gov.in/` | **200**, 56,740 bytes, title `<title>Department of School Education</title>` |
| `https://scert.nagaland.gov.in/` | curl exit 35, "Recv failure: Connection was reset" |
| `https://gcert.gujarat.gov.in/` | curl exit 28, connection timed out after 35s |
| `https://schooleducation.gujarat.gov.in/` | curl exit 6, could not resolve host |
| `https://gujarat-education.gov.in/` | curl exit 6, could not resolve host |
| `https://scert.telangana.gov.in/` | **200**, 699,222 bytes (out of scope unit, probed as a control) |

The two that answered with real content link to administrative notices, not
policy. Nagaland's homepage links are e.g.
`https://education.nagaland.gov.in/notification-on-missing-not-uploaded-aadhaar-in-udise/`
and `.../nagaland-disaster-management-school-safety-policy/`. Tamil Nadu's DGE
links `rteact.html`, `rtiact.html`, `privacy_policy.html`. **Neither surfaced a
language-policy, medium-of-instruction or three-language-formula document.**

Saved: `...\scratchpad\inscout\states\tn_dge.html`, `nl_edu.html`,
`tg_scert.html`.

## SOURCE 9 - PRS Legislative Research state-acts archive - WORKS, and is the right route to state statute

The better route to state-level primary law is not the state portals but PRS.

- `https://prsindia.org/files/bills_acts/acts_states/tamil-nadu/2006/2006TN13.pdf`
  - observed: **HTTP 200**, `application/pdf`, 190,479 bytes, `url_effective` identical
  - Saved: `...\scratchpad\inscout\states\tn_act_prs.pdf` / `tn_act.txt`
- The India Code URL that a search returned for the same Act is **DEAD**:
  `https://www.indiacode.nic.in/bitstream/123456789/13337/1/tamil_nadu_tamil_learning_act_2006.pdf`
  → observed **404**, `text/html`, 686 bytes. Do not cite it.
  (India Code itself works - the RPwD Act 2016 came from it at 200 - but its
  state-act bitstream ids from search results are unreliable.)

### Verbatim proof, and a directly usable `fl` finding for Tamil Nadu

Cover page:

> "The Tamil Nadu Tamil Learning Act, 2006"
> "Act 13 of 2006"

Operative section 3(1), verbatim from the gazette text:

> "3. (1) Tamil shall be taught as a subject in standards I to X in all schools, in a phased manner, commencing from the academic year 2006-2007 for standard I, from the academil: year 2007-2008 for standards I and II and shall,be extended upto X standard in a like manner."

(`academil:` is an OCR artefact of the scan - flag it or use `[academic]` if quoting.)

The pattern of education prescribed under s.3(2), verbatim:

> "Part -I    Tamil (Compulsory)"
> "Part -11   English (Compulsory)"

and the definition of "school" in s.2(e) reaches, verbatim:

> "(ii) any Primary School, Middle School, High School or Higher Secondary School established and administered or maintained by any private educational agency including minority school established and administered under clause (1) of Article 30 of the Constitution, whether receiving aid out of the State fund or not"

That is Tamil Nadu's two-language policy in statute, and it corroborates the CLM
52nd Report's Tamil Nadu s.36.12 independently.

### Caveat on PRS

PRS's own disclaimer is printed on every file and must be respected:

> "The contents of this document have been obtained from sources PRS believes to be reliable. These contents have not been independently verified"

> "In some cases the Principal Act and/or Amendment Act may not be available. Principal Acts may or may not include subsequent amendments."

So PRS files are `official-document` in substance (they are gazette scans) but
carry no guarantee of currency. Treat as `official-document` with a date, and
never assume the amendment history is complete.

### Coverage

PRS hosts acts by state under `/files/bills_acts/acts_states/<state>/<year>/`.
This is a **viable per-state route** for the handful of states that have an
actual language STATUTE (Tamil Nadu, Maharashtra, Karnataka, Punjab, West
Bengal are the usual candidates). It is **not** a 33-unit leverage source,
because most states regulate language by government order and curriculum
framework, not by act. Scans are OCR-poor and must be read carefully.
