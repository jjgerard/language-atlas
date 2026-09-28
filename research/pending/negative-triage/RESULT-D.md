# Batch D — negative triage, 62 entry-fields

Graded against the rule set 2026-09-28: a negative is a coded value when a
source states or entails the absence, and `not stated` when all that can
honestly be said is that a search came up empty.

| field | n | A | B | C |
|---|---|---|---|---|
| `eal.bilingualEducationNotes` | 39 | 22 | 9 | 8 |
| `eal.newcomerCriteria` | 17 | 14 | 0 | 3 |
| `eal.removalCriteria` | 5 | 2 | 1 | 2 |
| `eal.achievementGap` | 1 | 1 | 0 | 0 |
| **total** | **62** | **39** | **10** | **13** |

**How term counts were graded.** A zero-hit count grades **B on its own**, and
does not grade at all where another bullet carries the value. The count
establishes that a WORD is absent, not that a thing is absent, and this batch
contains the proof: Libya's entry says "'bilingual' occurs 0 times in the body"
in the same breath as "Amazigh, Tebu and Tuareg teaching runs alongside" and
"Laws allow teaching in English and French". Where the same entry states
positively what the system does provide — Bhutan's "English is the sole medium
from the start of primary", Yemen's "Arabic is the only public-school language
of instruction" — the positive statement does the work and the count is
decoration, so those are A **on the positive bullet, not on the count**.

This unseats two glosses in `src/coding.js`, which is worth saying because the
glosses are precedent. `BILINGUAL_PROVISION['none established']` is glossed on
Sao Tome and Principe, "bilingual occurs 0 times in the retrieved body", and
Qatar, "0 hits in all three Qatari documents" — both of which are term counts
and would grade B under the rule applied here. The value needs new examples
drawn from the entries that state the medium positively.

---

## A — a source states the absence, or entails it (39)

### `eal.bilingualEducationNotes` (22)

- **AT | Austria** — A — "Only the mother-tongue elective track, which runs alongside mainstream subject teaching"
- **AU | Tasmania** — A — "Interpreters are the only first-language provision the department names" (the entry leads on a 0-hit count; the service account is what carries it)
- **BA | Bosnia and Herzegovina** — A — "One of only four European systems without them, with Greece, Iceland and Türkiye" (a survey that runs through every system and names BiH among those without)
- **BB | Barbados** — A — "The native language is the starting point but is not a medium of instruction"
- **BG | Bulgaria** — A — "support is parallel, not dual-medium" (the bullet also says "found"; the clause after the dash characterises the arrangement and is what supports the value)
- **BH | Bahrain** — A — "Arabic is the language of instruction in all public schools"
- **BT | Bhutan** — A — "English is the sole medium from the start of primary"
- **CA | British Columbia** — A — "Support is integrated or pull-out ELL service within regular classrooms"
- **CA | Newfoundland and Labrador** — A — "LEARN is sheltered supplementary small-group work, not a first-language programme"
- **CH | Switzerland** — A — "HSK is a parallel heritage-language track, largely voluntary, not a bilingual-education model"
- **DK | Denmark** — A — "Parallel Danish as a second language, plus optional and limited mother-tongue tuition"
- **GB | England** — A — "England funds EAL but the formula describes no bilingual or home-language provision" (the instrument is the subject; it was read and makes no provision)
- **GB | Scotland** — A — "The 1+2 paper is explicit that schools do not currently teach community mother tongues formally"
- **IN | Manipur** — A — "No sanctioned posts exist for minority-language teachers anywhere in the state" (the state's own return to the CLM)
- **IN | Tripura** — A — "No minority language used as a medium of instruction at any of the four stages"
- **IR | Iran** — A — "Art 15 reserves textbooks and instruction to Persian"
- **IS | Iceland** — A — "The stated goal is functional bilingualism — Icelandic plus the home language" (and BiH's entry names Iceland among the four European systems without CLIL, off the same survey)
- **LC | Saint Lucia** — A — "Kwéyòl is not a medium of instruction and is not a timetabled subject"
- **MC | Monaco** — A — "All state and contracted private teaching is in French"
- **MU | Mauritius** — A — "Kreol Morisien is an optional subject, not a medium"
- **PK | Pakistan** — A — "Urdu is the medium in all government schools" (but see the contradictions section: bullet 2 says Sindhi has an official medium role in Sindh)
- **YE | Yemen** — A — "Arabic is the only public-school language of instruction"

### `eal.newcomerCriteria` (14)

- **IN | India** — A — "The category in play is 'linguistic minority group', not a newcomer designation"
- **IN | Andaman and Nicobar Islands** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Arunachal Pradesh** — A — "State has notified no language as a minority language" (with India's entry establishing that linguistic-minority status is the only candidate category, this entails it; its register sub-question is separately unanswered)
- **IN | Chandigarh** — A — "Language Preference Registers are not maintained in schools in the UT"
- **IN | Delhi** — A — "No newcomer or additional-language designation in either instrument" (but see contradictions: Delhi's registers ARE maintained)
- **IN | Gujarat** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Karnataka** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Kerala** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Mizoram** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Tripura** — A — "NCFSE 2023 sets no newcomer or additional-language pupil category"
- **IN | Uttar Pradesh** — A — "Sindhi, Punjabi and Urdu academies exist for language promotion, not pupil identification"
- **MY | Malaysia** — A — "No pupil-level category: the trigger is a parental request, not a child's language"
- **NP | Nepal** — A — "Any mother tongue taught is the one spoken by the majority of pupils in that school" (a school-level rule, so no pupil is designated; the entry's 0-hit count is not what carries it)
- **ZA | South Africa** — A — "Choice is confined to the 11 official languages, so it is not a newcomer provision" (the entry opens on "newcomer 0, refugee 0, immigrant 0" — exactly the term-count shape — and bullet 4 is what saves it)

### `eal.removalCriteria` (2)

- **MH | Marshall Islands** — A — "The nearest analogue runs the other way, gating the diploma on Marshallese"
- **VU | Vanuatu** — A — "No exit rule, because no designated cohort exists to exit"

### `eal.achievementGap` (1)

- **FM | Micronesia** — A — "The whole cohort is in the majority-language condition, so no gap is measured". `proxy: none` is not a checked-and-found-nothing value at all: `GAP_PROXY['none']` says no comparison group EXISTS to draw, which is a structural fact PEER states. This entry-field arguably did not belong in a negative-triage batch.

---

## B — a search came up empty; move to `not stated` (10)

### `eal.bilingualEducationNotes` (9)

- **AU | Queensland** — B — "No Queensland bilingual programme is named in any cited source". The subject is the sources. The remaining bullets are a term count ("'bilingual' occurs 10 times in the Bandscales guide, always describing learners or staff") and a statement about Māori-medium settings pupils arrive FROM, which says nothing about Queensland provision.
- **CF | Central African Republic** — B — "'bilingual' does not occur in the profile". Term count, one source, no positive statement of what is provided.
- **CI | Ivory Coast** — B — "No national bilingual programme was documented in the sources read"
- **DZ | Algeria** — B — "'bilingual' does not occur in the PEER profile"
- **GA | Gabon** — B — "'bilingual' does not occur in the PEER profile"
- **GN | Guinea** — B — "No national bilingual programme was documented in the sources read"
- **LY | Libya** — B — "PEER names no bilingual programme as such: 'bilingual' occurs 0 times in the body". The other three bullets describe teaching in English and French "in the disciplines that require it" and Amazigh, Tebu and Tuareg teaching running alongside in their own areas — so the count is not only doing the work, it is doing it against the entry's own evidence.
- **SA | Saudi Arabia** — B — "No bilingual programme is described in any cited source". Bullet 2 is a 0-hit count on an OECD catalogue page; bullet 3 is scoped to one ministry press release about English as a subject. No cited source runs through Saudi provision.
- **UZ | Uzbekistan** — B — "No bilingual programme is described in either cited source". Bullets 2 and 3 establish what PP-1875 does and that it is scoped to universities — they establish nothing about school medium, which is the coded question.

### `eal.removalCriteria` (1)

- **MC | Monaco** — B — "No exit criteria or maximum duration are documented". "are documented" is the searcher's report, and the two sources are a service-public page and a welcome booklet. Monaco is one of the two named examples in the `EXIT_MECHANISM['none established']` gloss.

### no `not stated` available

None. `BILINGUAL_PROVISION` and `EXIT_MECHANISM` both carry `not stated`, so
every B in this batch is recodable.

Latent gap, recorded because the next batch may hit it: on
`eal.achievementGap`, `GAP_DIRECTION` has `not measured` and
`GAP_AFTER_ADJUSTMENT` has `not adjusted`, and neither has a `not stated`. A B
on either of those columns would have nowhere to go.

---

## C — the prose says neither; go back to the source (13)

### `eal.bilingualEducationNotes` (8)

- **CA | Alberta** — C — "Benchmarks 2.0 is a proficiency scale, not a programme model, so it authorises no model". The entry concedes it read the wrong kind of instrument: a proficiency scale is not where a programme model would live. **Check** the Alberta K-12 programme listings and the funding framework for whether any bilingual programme stream is provincially authorised and funded.
- **CA | Manitoba** — C — "The LAL stream is integrated within regular EAL programming, not a separate bilingual school". That characterises one stream; it does not reach the province's programme offer. **Check** `edu.gov.mb.ca/k12/cur/languages/index.html`, which the entry cites and never reports on, for whether Manitoba lists bilingual or heritage-bilingual programme options.
- **CA | Ontario** — C — "No formal newcomer bilingual or reception-class model at provincial level" plus "Reception happens at board-level reception centres". That locates provision BELOW the province rather than establishing none, which is the exact error `EXIT_MECHANISM['none established']` warns against ("NOT for a system that sets no NATIONAL rule and leaves it below"). **Check** whether any Ontario board runs a bilingual or dual-language programme; if so the cell is a rule_locus answer, not an absence.
- **CY | Cyprus** — C — none of the three bullets mentions two-language content teaching at all; they describe intercultural materials and an eight-language induction guide. **Check** the CLIL survey already cited (doi 10.2797/529032) — the same document that lets BiH and Iceland name the four European systems without CLIL will say where Cyprus sits.
- **IN | Uttar Pradesh** — C — "Documented restriction rather than documented provision", and "No information supplied on minority-language textbook availability". The state answered on minority-language DECLARATION, not on medium. **Check** the CLM return's medium-of-instruction table for UP, the same table Tripura's entry reads off.
- **MV | Maldives** — C — "A de facto three-language exposure, not a designed bilingual programme", beside "Only Dhivehi, Quran and Islam are taught in the first language at Grades 1-7" and "English-medium instruction takes about 75% of primary school time". That is content taught through two languages as ordinary provision, which is `BILINGUAL_PROVISION['established']` verbatim. Nothing external to check: the cell needs re-deciding against the vocabulary, which asks whether content is taught through two languages and not whether anyone designed it that way.
- **NZ | New Zealand** — C — "No bilingual instructional programme: a diagnostic Bilingual Assessment Service". That settles what the service called "Bilingual" is; it does not run through New Zealand provision, and all four sources are ESOL pages. **Check** the Ministry's Māori-medium and Pacific bilingual unit pages, which would put this at `established` with `for_whom: national or indigenous languages`, as Samoa and the Marshall Islands are coded.
- **SG | Singapore** — C — the three bullets cover only the non-Tamil Indian languages that sit outside MOE provision. The cited page is MOE's own "Mother Tongue Languages: learning in school". **Check** whether Singapore's bilingual policy — English-medium plus a compulsory Mother Tongue Language — makes this `established`. Coding the system whose policy is called the Bilingual Policy as `none established` is the least defensible cell in the batch.

### `eal.newcomerCriteria` (3)

- **IN | Haryana** — C — "No newcomer or additional-language designation **beyond that opt-in register**". Read plainly, that bullet concedes a designation exists; the opt-in register (Urdu or Punjabi as an additional language) is a parental declaration, which `DESIGNATION_FORMS['functional']` names as a designation form. **Check** the Director of Primary Education's letter of 18 May 1997 for whether the register attaches an entitlement to the pupils on it.
- **IN | Tamil Nadu** — C — "The only category is pupils whose mother tongue is neither Tamil nor English". The state's own Act names a category; bullet 4 then reaches for NCFSE 2023 to say no category exists. **Check** Tamil Nadu Act 13 of 2006 for whether that category is defined with an attached entitlement, which would make this `functional` or `named category`.
- **KR | South Korea** — C — "No designation as such: groups named are returnees from overseas and multicultural backgrounds". The clause concedes two named groups in the national curriculum framework, listed alongside underachievers, gifted pupils and pupils with disabilities — i.e. a schedule of categories. This is the Yemen shape. **Check** the 2022 National Framework's own wording for 귀국학생 and 다문화 pupils: if either is defined with provision attached, the value is `named category`.

### `eal.removalCriteria` (2)

- **EC | Ecuador** — C — "No language-based exit exists, because entry is not language-based". The bullet denies a LANGUAGE-BASED exit; the coded value asserts the system "sets no exit rule of any kind, at any level". Ecuador's own `designation` is `proxy category`, so a category does exist and must end somehow. **Check** Acuerdo MINEDUC-MINEDUC-2020-00025 for how the proxy category ends.
- **IE | Ireland** — C — "Supports are temporary and re-applied for each year, under Criteria A and B". An annual re-application under stated criteria is an exit mechanism, not the absence of one; bullet 2 denies only "a single fixed statutory removal timeline", which rules out `fixed period` rather than everything. **Check** the gov.ie guidelines for applying for EAL supports under Criteria A for 2026-27 — whether the cycle is `assessed, no criterion` and whether Criteria A/B set a ceiling in years.

---

## What the batch shows

**The split falls on field, not on region or source family.** 39 A, 10 B, 13 C,
and every one of the ten Bs is on `bilingualEducationNotes` or
`removalCriteria` — the two fields in the batch that ask what a system
*provides*. Not one negative on `newcomerCriteria` graded B.

**The Bs cluster on one sourcing pattern.** Six of the nine
`bilingualEducationNotes` Bs are African or Central Asian entries whose only
substantive source is a UNESCO PEER country profile or a lex.uz decree list,
read for a keyword. All nine carry `purpose: not stated`, `for_whom: not
stated` — the whole row is one negative and two blanks, which is what an empty
search looks like when it is written down as a finding.

**The A cases share a sentence shape.** They name the medium: "Arabic is the
language of instruction in all public schools", "English is the sole medium
from the start of primary", "Urdu is the medium in all government schools",
"All state and contracted private teaching is in French". A drafter who
established what the language of instruction IS did not need to search for the
word "bilingual", and that is the difference the grading is picking up.

**The C cases are mostly a different fault from the one this pass was looking
for.** Eight of thirteen are not thin sourcing but a value asserted wider than
the prose: a provincial-level absence read as a system-level one (Ontario,
Alberta, Manitoba), an arrangement described and then denied on a criterion the
vocabulary does not use (Maldives), a category conceded and then refused
(Haryana, Tamil Nadu, South Korea). Those will not be fixed by fetching
anything; they need re-deciding against the vocabulary.

### Does absence close `newcomerCriteria`? Yes, and more strongly than expected.

14 A, 0 B, 3 C on 17 entries — 82% A against 56% on
`bilingualEducationNotes`. The triage finding holds and the mechanism is
visible in the bullets. "Is there a category" is answerable by reading one
instrument through, and the entries do exactly that: "NCFSE 2023 sets no
newcomer or additional-language pupil category", "Language Preference Registers
are not maintained in schools in the UT", "No pupil-level category: the trigger
is a parental request". The subject of every one of those sentences is an
instrument or a system, never a searcher.

`removalCriteria` behaves the same way when the entry has an instrument in
hand — Marshall Islands read MIPSSA 2013 and found the only language gate runs
the other way — and collapses when it does not: Monaco's two sources are a
welcome booklet and a government web page, and the sentence it produced is "No
exit criteria or maximum duration are documented".

Two caveats on the `newcomerCriteria` As. Six of the fourteen (Andaman and
Nicobar, Gujarat, Karnataka, Kerala, Mizoram, Tripura) are one boilerplate
block: four identical bullets, NCFSE 2023 as the sole source, no state
instrument read. The sentence is A-shaped and the document is the right kind of
document, but those six As rest on one reading of one national framework
applied six times, and no state-level instrument was checked for any of them.
And `DESIGNATION_FORMS` contradicts itself on this exact corpus: `functional`
is glossed with "a parental declaration (India)" while `none in use` is glossed
with India, "the category in play is linguistic minority group". The same
country glosses two mutually exclusive values in one column, and every Indian
state in this batch sits on that seam.

---

## Entries whose coding contradicts their own prose

1. **KR | South Korea**, `newcomerCriteria` — the clearest, and the same shape
   as the Yemen case fixed today. `designation: none in use` means "no term,
   and no rule that picks a pupil out for this question either", while the
   entry's own bullet names two groups the curriculum framework picks out:
   "returnees from overseas and multicultural backgrounds", listed with
   underachievers, gifted pupils and pupils with disabilities.

2. **IE | Ireland**, `removalCriteria` — contradicts itself inside the coded
   row, not only against its prose. `exit_mechanism: ["none established"]` says
   no exit rule exists at any level, while the same row carries `decided_by:
   school` and `rule_locus: national statute` — a named decider and a named
   statute for a rule said not to exist. Ireland is one of the two examples in
   the `none established` gloss.

3. **MC | Monaco**, `removalCriteria` — the other named example in that gloss,
   and a B. Both of the gloss's examples fail the rule set today; the value
   needs new ones, and the gloss already carries one correction of this kind
   (Lithuania).

4. **LY | Libya**, `bilingualEducationNotes` — `none established` resting on
   "'bilingual' occurs 0 times in the body" while the entry's other bullets
   describe teaching in English and French "in the disciplines that require it"
   and Amazigh, Tebu and Tuareg teaching running alongside in their own areas.

5. **MV | Maldives**, `bilingualEducationNotes` — `none established` on an
   entry that reports Dhivehi carrying three subjects and English carrying 75%
   of primary time. `BILINGUAL_PROVISION['established']` asks whether content is
   taught through two languages as ordinary provision; the entry answers yes and
   the cell says no, on the ground that it was not "designed".

6. **SG | Singapore**, `bilingualEducationNotes` — `none established` for the
   system whose policy is the bilingual policy, off a page titled "Mother Tongue
   Languages: learning in school", on bullets that cover only the non-Tamil
   Indian languages sitting outside MOE provision.

7. **CI | Ivory Coast** and **GN | Guinea**, `bilingualEducationNotes` — both
   open "ELAN-Afrique lists [the country] as a current partner country" and
   then code `none established` on "No national bilingual programme was
   documented in the sources read". The first bullet points at provision; the
   second reports a search.

8. **IN | Delhi** and **IN | Haryana**, `newcomerCriteria` — both carry
   `designation: none in use` on the strength of a register. Chandigarh's
   entry says the Language Preference Registers are **not** maintained; Delhi's
   says they **are**, maintained by the DoE, NDMC and all three municipal
   corporations; Haryana's says registration happens by opting for Urdu or
   Punjabi. Three units, opposite facts, one value. Delhi keeps its A because
   bullet 4 is an unqualified instrument-read absence; Haryana does not,
   because its bullet 4 excepts the register from the claim.

9. **PK | Pakistan**, `bilingualEducationNotes` — graded A on "Urdu is the
   medium in all government schools", but bullet 2 says "Sindhi alone has an
   official medium role, in primary schools in Sindh". Both cannot be true.

10. **VU | Vanuatu** and **EC | Ecuador**, `removalCriteria` — a shape question
    rather than a contradiction. Vanuatu's bullet is "no designated cohort
    exists to exit", and `src/coding.js` records that a system with no
    designation carries the absence flag with removalCriteria at Not
    applicable, so "it never reaches this coding". Vanuatu has been coded
    anyway. Ecuador is the inverse: it does have a designation
    (`proxy category`) and the cell asserts no exit rule of any kind.

## One storage note

`exit_mechanism` is a LIST, and this batch's five entries do not agree on the
shape. Ecuador, Ireland and Monaco store `["none established"]`; the Marshall
Islands and Vanuatu store the bare string `"none established"`. Any count over
that column will need to handle both, or the column should be normalised.
`recode-D.json` writes Monaco as an array, matching what that record already
holds.
