# RESULT-B — 96 negatives on `eal.l2Support` and `eal.l1Support`

Graded against the rule set 2026-09-28: a negative is worth keeping when a source
states or entails the absence; it moves to `not stated` when the subject of the
sentence is the checking rather than the system.

**Counts.** A 43, B 32, C 21.

| field | A | B | C | total |
|---|---|---|---|---|
| `eal.l2Support` (`models`) | 30 | 29 | 4 | 63 |
| `eal.l1Support` (`form`) | 13 | 3 | 17 | 33 |

## The test I applied, in two steps

Grading by the shape of the verb alone would have put Bahrain and Bosnia in the
same bucket, so the test runs in two steps and the first one is about the source,
not the sentence.

1. **Coverage.** Does a cited source actually run through provision of this kind?
   If it does, and the entry says that source names none — **A**.
2. If it does not, the sentence decides. Does the prose report a look that came
   up empty (including a record the entry itself calls unverified)? — **B**.
   Does the prose report neither, so the negative is an inference the prose never
   makes? — **C**.

**Term counts.** I treated a term count as evidence about a *named, retrieved
document*, not as a source statement, and let step 1 decide what it is worth. A
count over a document that covers the ground is the strongest kind of A, because
it is an exhaustive read of a bounded text rather than an eye passing over it:
Spain's "LOMLOE says 'lengua materna' 0 times in 392,506 chars of consolidated
text" is a better-evidenced absence than most prose assertions in this batch. A
count over a document that was never the right place is worth nothing and does
not lift a B: Saudi Arabia's "'second language' returns 0 hits on the OECD
catalogue page" counts words on a *catalogue page*. And a count can **defeat** an
A — São Tomé's "The word 'language' occurs 0 times in the whole retrieved profile
body" proves the profile does not reach the question, so its silence establishes
nothing. Applied that way throughout.

---

## A — the source states the absence, or entails it (43)

### `eal.l1Support` (13)

- **AD|Andorra** — A — "Neither source names any provision for a pupil's home language other than these four", with the four named.
- **AU|Western Australia** — A — "The EAL/D Progress Map covers overseas arrivals and Aboriginal students alike" and "'first language', 'home language' and 'mother tongue' each return 0 hits": a count over the two documents that would carry the provision.
- **BA|Bosnia and Herzegovina** — A — "Neither Eurypedia page describes any home-language provision at all", and the cited Eurydice migrant-integration report is a country-by-country inventory of exactly this.
- **BT|Bhutan** — A — "No other language is used in primary education", beside English medium from the start and Dzongkha as a subject.
- **BZ|Belize** — A — "Full-text search of all 40 pages: 'Kriol', 'Creole', 'mother tongue' and 'Garifuna' absent", over the National Curriculum Framework itself.
- **CU|Cuba** — A — "No home-language maintenance provision exists for any language"; the subject is the system, and the profile was read through far enough to find what *is* named (sign-language interpreters).
- **ES|Spain** — A — "Sourced absence: LOMLOE says 'lengua materna' 0 times in 392,506 chars of consolidated text".
- **HK|Hong Kong** — A — "EDB's public pages describe only Chinese acquisition and general integration support": the NCS-support pages are where such a programme would sit.
- **IN|Puducherry** — A — "Minority speakers in Puducherry and Karaikal had no mother-tongue provision", recorded at the Commissioner's own February 2016 visit. The questionnaire non-reply does not carry this; the visit does.
- **OM|Oman** — A — "Swahili, Baluchi, Lawati and Jabali are recorded as spoken, not taught". Thin, but the bullet asserts of the languages that they are not taught.
- **PR|Puerto Rico** — A — "No language other than Spanish reaches PRDE's 30% threshold for significant presence": the instrument's own trigger, never pulled.
- **US|Arizona** — A — "No subject matter may be taught in a language other than English", A.R.S. 15-756.05. (See the overclaims section: the waiver class may make `none established` the wrong *value*, but the absence is statutory, not searched-for.)
- **YE|Yemen** — A — "Arabic is the sole language of instruction from primary school to university", with the profile naming Soqotri, Mehri and Hobyot and no provision for them.

### `eal.l2Support` (30)

The PEER family — twelve entries whose bullet makes the profile the subject:

- **BJ|Benin** — A — "No newcomer or additional-language designation (PEER inclusion profile, archived)".
- **CF|Central African Republic** — A — "PEER profile 2021 names no newcomer or additional-language designation". (Named in the gloss as one of the three sound ones.)
- **CI|Ivory Coast** — A — "PEER profile 2021 names no newcomer or additional-language designation".
- **CM|Cameroon** — A — "PEER profile 2021 names no newcomer or additional-language designation for Cameroon".
- **CV|Cape Verde** — A — "PEER profile 2021 names no newcomer or additional-language designation".
- **DJ|Djibouti** — A — "Refugee education addressed by integration into sector plans, not by language support": the profile reaches arrivals and answers a different way.
- **DZ|Algeria** — A — "PEER profile 2021 names no newcomer or additional-language designation". (Gloss-named.)
- **GA|Gabon** — A — "Foreign residents aged 3 to 16 have a right of access, with no language support attached": the profile reaches the population.
- **GM|Gambia** — A — "English named as the formal language of instruction, with no support route described". The profile names the medium, so its silence is about provision and not about coverage.
- **GN|Guinea** — A — "PEER profile 2021 names no newcomer or additional-language designation for Guinea". (Gloss-named.)
- **GQ|Equatorial Guinea** — A — "PEER profile 2021 names no newcomer or additional-language designation".
- **GW|Guinea-Bissau** — A — "Most pupils arrive without Portuguese, yet no support category is described".

The India NCFSE six, where the framework prescribes an architecture that leaves no room for the thing:

- **IN|Andaman and Nicobar Islands** — A — "R1 must be the language most familiar to the pupil".
- **IN|Gujarat** — A — "R1 must be the language most familiar to the pupil".
- **IN|Karnataka** — A — "R1 must be the language most familiar to the pupil".
- **IN|Kerala** — A — "R1 must be the language most familiar to the pupil".
- **IN|Mizoram** — A — "R1 must be the language most familiar to the pupil".
- **IN|Tripura** — A — "R1 must be the language most familiar to the pupil".

  The bullet that does the work in all six is the positive one, not the count. "'second language' occurs 0 times in NCFSE 2023" is the weakest line on these entries, because the framework renames the thing R2 — it has a three-language formula and calls none of it a second language. Read the count and you would code these wrong; read the R1 rule and the value holds.

The rest:

- **BA|Bosnia and Herzegovina** — A — "Neither cited page names a language-support measure for new arrivals", with the Eurydice migrant report among the cited pages.
- **HN|Honduras** — A — "It is L1-medium; the school language is Spanish and PEER documents no Spanish-as-L2 route". The count that backs it ("castellanizacion 0") is the right word for the thing in Latin America, which is why it counts for something here and not in Saudi Arabia.
- **ME|Montenegro** — A — the bullet that does the work is "Immigrants are a named target group only in adult education", not "No dedicated language-support scheme ... identified", which on its own would be a B.
- **ML|Mali** — A — "French is the medium, not a foreign language: PEER's 'official language of expression'", and the profile reaches the bilingual programme too.
- **MU|Mauritius** — A — "Its stated remedy is teacher awareness of the role of language in learning": the ministry reaches the problem and answers it another way.
- **MZ|Mozambique** — A — "Lopes quoted: Portuguese is the exclusive medium from first grade and also a subject", from a study about language in education. (Value-fit flagged below.)
- **PH|Philippines** — A — "That transition design is what RA 12027 removes": the governing instrument was read and the named programme repealed. (Value-fit flagged below.)
- **PW|Palau** — A — "That work targets indigenous groups, not newly arrived pupils", against the profile and the Master Plan.
- **SL|Sierra Leone** — A — "Radical Inclusion (2021) lists disability, gender, pregnancy, location, income, not language": a named policy enumerating its own grounds.
- **SY|Syria** — A — "Admission of non-Syrian pupils turns on documents and enrolment conditions", and the Group B catch-up module "targets interrupted schooling, not language of instruction": the profile reaches arrivals twice and never reaches language.
- **SZ|Eswatini** — A — "The one second-language syllabus runs into siSwati, not into English", against the examinations council's own subject lists, which are an exhaustive enumeration.
- **VN|Vietnam** — A — "Ethnic minority people are encouraged, not entitled, to learn their own language", in a law that runs through official language, foreign-language media, minority languages and sign/Braille and names no route for a pupil lacking Vietnamese.

---

## B — a search came up empty; move to `not stated` (32)

### `eal.l1Support` (3)

- **IT|Italy** — B — "No mandated mother-tongue instruction programme found".
- **JO|Jordan** — B — "No first-language provision in any cited source ('first language' 0 hits in both chapters)". The cited sources are PISA and the TIMSS/PIRLS encyclopedias, which inventory assessment, not provision.
- **SD|Sudan** — B — "No first-language support programme is named (UNESCO PEER account; **no document retrieved**)". The entry says outright that the document was never obtained.

### `eal.l2Support` (29)

The India Commissioner template — seventeen entries whose first bullet concedes the point:

- **IN|Assam** — B — "State furnished no reply to the Commissioner for 2014-15, so **provision is unverified**".
- **IN|Bihar** — B — same bullet.
- **IN|Dadra and Nagar Haveli and Daman and Diu** — B — same bullet ("UT furnished no reply").
- **IN|Goa** — B — same bullet.
- **IN|Himachal Pradesh** — B — same bullet.
- **IN|Jammu and Kashmir** — B — same bullet.
- **IN|Jharkhand** — B — same bullet.
- **IN|Madhya Pradesh** — B — same bullet.
- **IN|Maharashtra** — B — same bullet.
- **IN|Meghalaya** — B — same bullet.
- **IN|Nagaland** — B — same bullet.
- **IN|Odisha** — B — same bullet.
- **IN|Punjab** — B — same bullet.
- **IN|Rajasthan** — B — same bullet.
- **IN|Sikkim** — B — same bullet.
- **IN|Uttarakhand** — B — same bullet.
- **IN|West Bengal** — B — same bullet.

  These are worse than a failed search, not better. The source is a national report whose method was to ask every state; seventeen states did not answer; the entry says so in its own first line and then codes a finding about the system anyway. The closing bullet, "No second-language pupil category: the safeguard secures mother-tongue medium instead", is about the all-India 1949 Resolution and would be true of every state including the six that did answer — it is not evidence about this state.

The rest:

- **AD|Andorra** — B — "No dedicated Catalan-as-an-additional-language programme is **documented**". The dual-tutor bullet describes the standing arrangement for everyone, not a newcomer route, so nothing else carries the negative.
- **BH|Bahrain** — B — "No Arabic-as-additional-language provision **documented** for arrivals". (Already named by the maintainer.)
- **BR|Brazil** — B — "No national provision **was found** for children arriving without Portuguese". (Already named.)
- **CU|Cuba** — B — "**Not found**: no Spanish-as-an-additional-language provision **located** in any instrument". The second bullet, that the Constitution makes no medium-of-instruction provision, is an A-shaped statement about a different question and a constitution's silence on medium settles nothing about support.
- **GY|Guyana** — B — "No structured English-as-an-additional-language programme **was found**".
- **JO|Jordan** — B — "No pupil-level Arabic support is described in any cited source", the sources again being PISA and TIMSS/PIRLS. Jordan runs double-shift schooling for a very large Syrian cohort; nothing cited here reaches it.
- **OM|Oman** — B — "No Arabic-as-additional-language support for arrivals is **documented**". The second bullet is a caution against misreading PEER, not evidence.
- **SA|Saudi Arabia** — B — "No cited source describes teaching Arabic to pupils who lack it", the count being over "the OECD catalogue page".
- **SR|Suriname** — B — "No designated Dutch-as-a-second-language school programme **was found**". The interior-plan bullets say what that one plan does, not that no school programme exists.
- **UY|Uruguay** — B — "No newcomer-specific provision **was found**".
- **UZ|Uzbekistan** — B — "Neither cited source describes teaching the school language to those who lack it", where the entry itself says one source's "whole subject is foreign-language, mainly English, teaching" and the other is a textbook-supply decree.
- **YE|Yemen** — B — "No Arabic-as-additional-language support **documented** for displaced children". Note the sibling: this country's `l1Support` negative is an A off the same profile, so a re-read of that profile could well promote this one.

### no `not stated` available

None. Both `L2_MODELS` and `L1_FORM` carry a `not stated` value, so every B in this batch has somewhere to go and `recode-B.json` holds all 32.

---

## C — the prose says neither; somebody has to go back (21)

### `eal.l1Support` (17)

The WIDA identification-guidance family — fourteen US states coded `form = none established` off a document about identification:

- **US|Alabama** — C — "The survey identifies the home language; it is not instruction or support in that language".
- **US|Alaska** — C — "The home language is identified and reported, not a medium in which support is given".
- **US|Delaware** — C — "The home language is surveyed for identification, not used as a medium of support".
- **US|Idaho** — C — "The survey identifies the dominant language; it is not support given in that language".
- **US|Indiana** — C — "The home language is recorded in the state portal, not used as a medium of support".
- **US|Maryland** — C — "Home language survey is used only to decide whether ELD services are needed".
- **US|Missouri** — C — "The home language is surveyed at enrolment, not used as a medium of support".
- **US|Montana** — C — "The home language is surveyed once at enrolment, not used as a medium of support".
- **US|New Hampshire** — C — "The home language is surveyed and followed up, not used as a medium of support".
- **US|North Carolina** — C — "The home language is surveyed and confirmed, not used as a medium of support".
- **US|Oklahoma** — C — "The home language is surveyed and recorded, not used as a medium of support".
- **US|South Dakota** — C — "The home language is surveyed once per pupil, not used as a medium of support".
- **US|Utah** — C — "The home language is surveyed and weighed, not used as a medium of support".
- **US|Virginia** — C — "The home language is surveyed, not used as a medium of support".

  **What a reader would have to check:** these fourteen are not searches and they are not absences. Every bullet is a true statement about the home language *survey*, and `none established` is an inference nobody wrote down — the WIDA ID/placement guidance is not a source that inventories programme models, so its silence about home-language instruction is the silence of the wrong document. The check is each state's own EL programme-models guidance or bilingual-education statute, not the identification guidance. Utah is the warning case: it runs a statewide Dual Language Immersion programme that the cited guidance would never mention. Arizona is the one state in this family that is an A, and for the right reason — there the statute itself forbids the thing.

Three more:

- **IN|Uttar Pradesh** — C — mixed, and neither half carries it. "CLM says that deprives non-Hindi-medium schools and breaches Arts. 29 and 30" is a source objecting to a recognition rule; "The state furnished NO medium-of-instruction data at any stage for 2014-15" says the record is empty. Neither establishes what UP provides. **Check:** whether UP recognises and runs Urdu-medium schools — Urdu is its second official language — and what the 1952 notification's recognition rule means for schools already operating.
- **ST|São Tomé and Príncipe** — C — "The word 'language' occurs 0 times in the whole retrieved profile body". The count defeats the first bullet: a profile that never says "language" cannot be the source that names no home-language provision. **Check:** the national education law and curriculum for any Forro or Angolar provision, and whether the profile body was fully retrieved.
- **VC|Saint Vincent and the Grenadines** — C — "The profile never uses the word 'language', and asserts no distinct ethnic minorities". Same defect. **Check:** the CAMDU Primary Language Arts curriculum that the entry already cites but never quotes on this point — whether it treats Vincentian Creole as a home variety.

### `eal.l2Support` (4)

- **KI|Kiribati** — C — "English proficiency becomes a teacher registration requirement, not a pupil service". True, and it is about teachers. No bullet says the profile or the Education Act names no pupil route. **Check:** the PEER Kiribati language section and the Education Act 2013's medium-of-instruction provisions, which set a Kiribati-to-English transition.
- **KM|Comoros** — C — "Term counts in the retrieved 2,589-char body: 'second language' 0, bilingual 0". 2,589 characters is a page, not a UNICEF review, so "Review describes no support for children entering school without French or Arabic" rests on a fragment. **Check:** re-fetch the UNICEF *Language and Learning Comoros* PDF in full and read its provision section.
- **NG|Nigeria** — C — "English-only from pre-primary upwards, as of the November 2025 reversal". A medium rule, not an absence of support, and the entry itself says it is "Reported through the GEM Report's blog, not a peer-reviewed source". **Check:** the National Policy on Education as amended, or the ministry's own circular, for any transitional English provision accompanying the reversal.
- **PK|Pakistan** — C — "Elite English-medium schools have policies forbidding pupils from speaking it". The entry is about stigma and says nothing either way about provision. **Check:** the UNICEF ROSA Pakistan country profile's language-of-instruction section, and provincial medium-of-instruction policy in Punjab and Sindh.

---

## What the batch shows

**The problem is bigger than the three the gloss names, and it is not evenly spread.**
Of 63 `l2Support` negatives, 29 do not survive, and 17 of those are one template.
Of 33 `l1Support` negatives, only 13 survive, and the largest single group — 14 US
states — is neither a stated absence nor a failed search but an inference off a
document about identification. Two thirds of the `form = none established` cells
in this batch should not be read as findings about those systems.

**Three shapes account for almost everything that fails.**

1. *The wrong document, read thoroughly.* Jordan, Saudi Arabia, Uzbekistan and
   the fourteen US states all cite something real and read it carefully; none of
   the somethings is an inventory of provision. Thoroughness in the wrong file
   reads exactly like a finding.
2. *A template propagated across units.* The India Commissioner block put the
   same five bullets on seventeen states, the first of which says provision is
   unverified. One drafting decision became seventeen findings. The WIDA block
   did the same thing fourteen times. Both are worth fixing as blocks.
3. *The passive with no agent.* "is documented", "is recorded", "was found",
   "identified", "located" — Bahrain, Brazil, Andorra, Oman, Cuba, Guyana,
   Suriname, Uruguay, Italy, Yemen. This is the shape the maintainer caught, and
   it is 10 of the 32 Bs.

**The counter-finding is worth saying too.** The 43 As are not thin. Eswatini's
subject lists, Sierra Leone's Radical Inclusion grounds, Puerto Rico's untripped
30% threshold, Vietnam's article that runs through four language regimes, Spain's
392,506 characters — these are better-evidenced absences than most positive
codings in this corpus. The problem is not that `none established` is unusable on
these two fields; it is that it has been used for two different things.

**The triage warning held, but only on one side.** "`eal`'s service-description
fields close nothing by absence" is right about *how* support is delivered and
wrong about *whether a category exists*. Every surviving A here answers the
second question — is there a designated route, a named population, a syllabus, a
threshold — and none of them claims to know what a lesson looks like. If the two
fields are to keep a negative at all, that is the line it sits on.

## Glosses that now overclaim against the entries carrying them

**`L1_FORM.none established` — "Checked, and there is no provision in a home
language".** Two of its three worked examples are searches, and one of the two is
in this batch.

- *Italy*: `'No mandated mother-tongue instruction programme found'` — graded B
  above. The gloss quotes the search verbatim and offers it as the pattern.
- *Bahrain*: `'No home-language provision is recorded in any cited source'` —
  "is recorded" is the record, not the system; and Bahrain's `l2Support` sibling
  is the entry the maintainer has already pulled.
- Only *New Zealand*, "No unified national policy", asserts something about the
  system.

  Suggested wording, on the same model as the corrected `L2_MODELS` gloss: a
  source that covers home-language provision names none — Bhutan, where "No other
  language is used in primary education"; Yemen, where Arabic is the sole medium
  "from primary school to university" in a profile that lists the non-Arabic
  languages; Puerto Rico, whose own 30% threshold nothing reaches. NOT for a
  search: Italy and Bahrain are carried here and should not be.

**`L2_MODELS.none established` — the corrected gloss is right and still too
narrow.** It names three sound cases; there are thirty. More usefully, the three
it names are the weakest of the twelve PEER-profile As, because their own entries
record that the profile never reaches the language of instruction: Central African
Republic, "Profile never states the language of instruction in Central African
schools"; Guinea, "Profile never uses the word instruction and never names a
medium of instruction"; Algeria, "never uses the phrase language of instruction
and never names Arabic". Gambia and Guinea-Bissau, which the gloss does not name,
are stronger — their profiles *do* name the medium and still describe no route.
I have kept all twelve at A on the maintainer's adjudication of the three, but if
the coverage worry is to be tightened, it is a decision about roughly ten units
and it points the opposite way from the current exemplars.

**Two value-fit problems that are not grading problems**, noted because they
surfaced while reading and all three entries are graded A:

- *MZ|Mozambique* — "Portuguese is the exclusive medium from first grade **and
  also a subject**". A school language taught to the whole cohort as a subject is
  `taught to all as a subject`, which is what that value exists for; `none
  established` reads as though nothing happens.
- *PH|Philippines* — after RA 12027 the media are Filipino and English and both
  are timetabled; same misfit.
- *US|Arizona* — "Where 20 pupils in a grade hold waivers the school must offer
  the class" is a threshold entitlement to bilingual technique. The absence is
  statutory and the A stands, but `form = none established` sits oddly beside a
  route the statute itself provides; `on request or threshold` on `secured_by`
  may be the missing half.
