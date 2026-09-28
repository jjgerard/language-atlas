# Vocabulary scan: `he.requiredStudy` and `he.mediumOfInstruction`

Step 1 of `derive-vocabulary` only. This is a reading report. Nothing in
`src/coding.js`, `data/` or any page was touched, and no scheme is proposed as
final — the values below are candidates with the entries that forced them.

**What was read.** All 86 codable national entries of `he.requiredStudy`, all 112
documented absences on the same field, and all 129 codable national entries of
`he.mediumOfInstruction` — the full corpus rather than a sample, since at three
lines an entry the whole set fits in one reading. Region spread is therefore
complete by construction. Dumped with `research/tools/coding-dump.js`.

`he` currently has no scheme except `he.policyHistory`, so both fields are in the
skill's first situation: a field with no scheme that should become comparable.

---

## 0. The absence question, answered first

**The absences and the prose are saying the same thing, and the flag is applied
to only some of the entries that say it.** This is the headline and it changes
the denominator of every column below.

All 112 flagged entries carry the same finding in different words: somebody read
the higher-education statute and it puts no language duty on a student.

- Kenya: "Universities Act 2012 carries no language provision and no
  language-study duty"
- Japan: "Standards for Establishment of Universities never use the word for
  foreign language"
- New Zealand: "Education and Training Act 2020 Part 4 sets no language-study
  duty on any tertiary student"
- United States: "No federal requirement is possible: 20 USC 1232a bars federal
  control of curriculum"

But **at least 18 of the 86 "codable" entries are the identical finding**, filed
as prose rather than as an absence: Argentina, Austria, Bangladesh, Bulgaria,
Chile, Costa Rica, Croatia, Dominican Republic, Guatemala, Honduras, Iceland,
Ireland, Lithuania, Luxembourg, Malta, Netherlands, Norway, Tajikistan. Read
Norway beside flagged Mexico and there is nothing to tell them apart:

- Norway (codable): "UH-loven 2024 imposes no language every student must study,
  whatever the degree" / "Sec. 2-3 binds institutions, not students, to use and
  strengthen Norwegian"
- Mexico (flagged absence): "Ley General de Educacion Superior 2021 sets no
  language-study duty on any student" / "That is a duty on the institutions to
  promote, not a requirement on the student"

A further **3 codable entries share the "duty on the provider, not the student"
shape** that several flagged entries use as their ground for the flag —
Montenegro ("The duty is on the institution to provide conditions, not on the
student to pass"), Bolivia ("Ley 269 art 13 obliges universities to run language
programmes, not students to take them"), Kyrgyzstan ("Duty is on the state, not
stated as a student obligation") — against flagged Madagascar ("That is a duty on
the establishment, not a subject an individual student must pass"), Tonga,
Vanuatu, Samoa, South Africa, Mexico. Same sentence, opposite filing.

And **up to 5 more are borderline**: Qatar ("Art 5's subject duty is not clearly
a degree duty"), Spain (none nationally, "Some universities do set a
foreign-language level"), Estonia (a study extension, not a duty), Paraguay,
New Caledonia (not the territory's competence at all — closer to Not applicable
than to either).

So the honest figure is not 112 of 198 but **130 to 138 of 198 — 66% to 70% — of
national systems establish no language-study duty on any student.** That is the
field's biggest finding and it is currently understated by about a fifth. The
residual corpus with an actual duty to describe is **60 to 68 systems, not 86**.

**Consequence for the vocabulary.** The brief is right that no proposed value
should be needed for the absence — the absence is carried on the entry and is
complete. But two things follow that the maintainer has to settle before any
column is coded:

1. Any distribution taken over the 86 will silently include 18 to 26 systems
   with nothing to describe, and they will land on whatever `not stated` value
   each column carries. That is the `uncoded-count-must-subtract-absences`
   mistake running in the other direction: not an invented backlog, but an
   invented population.
2. A handful of the national negatives are correctly codable because they carry
   a *narrower positive* finding, and these are the ones the flag should not
   move onto: Canada (no federal rule, Quebec's Charte art 88.0.2 requires three
   French courses of English-college DEC students), Germany ("Some HAW/FH degrees
   carry foreign language classes as a compulsory subject"), Switzerland ("Latin
   is required by most universities only for language, literature and history
   degrees"), Brazil ("Libras is a compulsory subject in teacher-training degrees
   and in Fonoaudiologia"), Czechia ("Eurydice reports that all study programmes
   include study of one or more foreign languages"), Denmark ("Every bachelor
   project, thesis and master project needs a summary in a foreign language"),
   Greece ("Sources conflict"), Togo.

The distinction that sorts them is not the word "no" but whether the entry ends
with a finding of *something*, at some scope. That is what the `scope` axis in
§2.E exists to hold, and it is why the pure negatives should move to the flag and
these should not.

---

## 1. Does `indigenous.mediumOfInstruction` transfer?

Read before proposing anything, as instructed. The existing scheme is three
columns: `role` (MEDIUM_ROLE), `reach` (MEDIUM_REACH), `secured_by`
(MEDIUM_SECURED_BY), row = one national or sub-national system.

**`secured_by` transfers, close to wholesale, and should be reused.** Every one
of its working values fires in the `he` corpus, and reusing it makes the two maps
answer one question in common — *who fixes the language teaching runs in* —
across school and university. Proposed adjustments:

| MEDIUM_SECURED_BY value | Transfers? | `he` evidence |
|---|---|---|
| `system rule` | Yes, the largest group | Ethiopia: "This is statute: article 19, Language of Instruction". Rwanda: "English, under art. 20 of Law 010/2021: 'English is the medium of instruction'". Also Latvia, Netherlands, Norway, Indonesia, Mongolia, Laos, Azerbaijan, Georgia, Qatar, Malaysia s 41, Timor-Leste, Turkmenistan, Angola, Niger, Andorra, Albania, Cyprus, Estonia, Ukraine, Paraguay, Philippines, China |
| `left to the school` | Yes, **rename to `left to the institution`** | Croatia: "The choice is the institution's, by rule: the act delegates it to the implementation plan". Belarus: "The founder of each institution determines the language of instruction". Bosnia: "an institution picks its official languages from the constituent peoples'". Also Djibouti art 43, Maldives, Estonia (private), Mozambique (per module) |
| `practice only` | Yes, large — see the source warning below | Benin: "AXL says the real policy is exclusive use of French… It frames this as observed policy". Egypt: "PEER records university practice as more flexible than that principle". Brunei: "UBD's own wording is main medium, so it is stated as practice not absolute rule". Also Mali, Senegal, Congo, Gabon, Kenya, Tanzania, Cameroon, Tunisia, Japan, Gibraltar, Malta, Namibia |
| `right` | Yes, but thins to ~6 entries | Hungary: "A nationality student may study in their mother tongue, in Hungarian, or in both". Azerbaijan: "Learners may choose their language of education". Kazakhstan: "The right to be educated in one's own mother tongue is provided where possible". Bosnia RS: students sit exams in an official language "as they choose" |
| `permission` | Yes, thin | Tajikistan: "Higher and postgraduate institutions may also operate in other languages". Mauritania: "Teaching in foreign languages is permitted 'if needed'" |
| `none` | Yes, large — but collides with `left to the institution`, see §4 | Sierra Leone: "Education Act 2004 sets no medium of instruction, at any level". Guinea-Bissau: "That law's 65 articles never mention a lingua de ensino, at any level". Also Cape Verde, Mauritius, Lesotho, Mozambique, Zimbabwe, Zambia, Somalia, South Sudan, Ghana, Madagascar |
| `on request or threshold` | **No `he` example found.** Keep with a gloss saying so, per the `EXIT_MECHANISM`/`age ceiling` precedent | — |
| `not stated` | Yes | — |

**`role` (MEDIUM_ROLE) does not transfer.** One sentence: it is defined relative
to a *focal language* whose role is being asked about — the indigenous one — and
`he.mediumOfInstruction` has no focal language, it asks which language teaching
runs in at all, so `not a medium`, `support only` and `permitted, not
implemented` have no subject to be predicated of. Its useful half survives
re-based on the system rather than on a language, as `plurality` in §3.B — and
two of its values do have near-matches worth recording there (Faroe Islands is a
textbook `permitted, not implemented`: "The same regulation provides for
programmes offered in English" / "At present the university offers no degree
programme with English as the language"; Timor-Leste is a textbook `support
only`: "Tetum is used as a support language alongside Portuguese").

**`reach` (MEDIUM_REACH) does not transfer.** Its values are school stages. The
`he` analogue is degree cycle, and it is answered by about 5 of 129 entries
(Estonia "first- and second-cycle curricula"; Sudan "especially at postgraduate
level"; Iran master's; Italy Bozen; Japan "No such English-only degree programmes
exist at colleges of technology"). Do not build it — it would come out worse than
the 83% `not stated` that `extent` is already kept as a record of.

---

## 2. `he.requiredStudy` — what varies, and candidate axes

What varies is **not which language**. It is: whether the duty lands on a student
or on a provider; whether it is a course, a credit quantum, a level or a
certificate; at what scope the rule was found; and who can let a student out.

### A. `obliged_party` — who is under the duty?

The axis that sorts a real requirement from the provider-duty shape currently
split across the absence flag.

| Value | Gloss | Entries |
|---|---|---|
| `the student` | The student must take, pass or demonstrate something | UAE: "Every undergraduate must take at least one Arabic language course". Armenia: "Armenian language teaching is compulsory in every higher education institution… closes with mandatory testing of knowledge, whatever the profession". Türkiye: "Turkish and a foreign language are compulsory courses in all higher education institutions" |
| `the institution, to provide` | The provider must make provision and no student must pass anything. **The value whose absence caused the filing inconsistency in §0** | Montenegro: "Art 80 obliges every institution to give students conditions to acquire a foreign language… The duty is on the institution to provide conditions, not on the student to pass". Bolivia: "Ley 269 art 13 obliges universities to run language programmes, not students to take them". Kyrgyzstan: "Duty is on the state, not stated as a student obligation, at all education levels" |
| `the programme curriculum, language unnamed` | The curriculum must carry a language; the instrument names none and sets no amount | Hungary: "Nftv 49/A: each programme's curriculum must deliver its specialist foreign language" / "Act names no language: the curriculum fixes which". DR Congo: "Amount is not in the law: use across levels and cycles is left to regulation". Rwanda: "How much is set by each cycle's curriculum, not by the law" |
| `not stated` | The entry establishes a duty exists without saying who holds it | Czechia: "Eurydice reports that all study programmes include study of one or more foreign languages" — a report of what happens, with no bearer named |

**Discriminates?** On the 60–68 entries that have a duty at all, `the student` is
roughly three quarters. Marginal — it is closer to a filter than an axis, and its
real value is that it makes the §0 mis-filing visible rather than that it spreads.
Description, not a score.

### B. `requirement_form` — what has to be done? **(the strongest axis here)**

| Value | Gloss | Entries |
|---|---|---|
| `a named course` | A specific course sits in the curriculum and is named | Nigeria: "GST 111 Communication in English runs 2 units, 15 lecture hours and 45 practical hours". Saudi Arabia: "Language Skills 101 is given across King Saud University colleges as a general requirement". Kiribati and Tuvalu: "every degree student must complete UU114 English Language Skills for Tertiary Studies". Also China, Indonesia, Cuba, Morocco, Marshall Islands |
| `a share of the credit load` | Expressed as credits, units, hours or a percentage rather than as a named course | Iran: "The General/Foreign Language course is worth 3 units… A ceiling of 22 general units is mandatory in the bachelor's across all disciplines". Kazakhstan: "51 academic credits of every programme go to mandatory component disciplines. That mandatory list names Kazakh or Russian language and a foreign language". Morocco: "Language and terminology sit in a complementary block worth 15% to 25% of course hours". Canada/Quebec: "Each such course counts a minimum of 45 hours of teaching, art 88.0.3" |
| `a proficiency level to reach` | A CEFR or national-framework band, whatever course delivers it | Ecuador: "Third-level grado requires at least level B1" / "Técnico requires at least A1 and tecnológico at least A2". Poland: "Level 6 outcome is CEFR B2; level 7 raises it to B2+ with specialist terminology". Vietnam: "Bachelor graduates must reach foreign language level 3 of 6 on the national framework". Montenegro: "The level named is a higher advanced level" |
| `a competence certified at graduation` | No course and no band — a thing the degree attests, with the institution left to decide how | Togo: "Loi 2017-005 art. 23: the licence fondamentale attests linguistic competence" / "It is a competence the degree certifies, not a named language or a set course". Italy: "DM 270/2004 art. 10(5)(c): every laurea must verify one foreign language besides Italian". France: "Master art. 16: degree awarded only after aptitude in one modern foreign language is validated". Bhutan: "Tertiary Education Policy 2010 sets a graduate language standard rather than a course… The institution determines and assesses the minimum standards" |
| `a condition of admission or progression` | The gate is before or inside the course, not at the end — so it is not a study requirement in the field's sense, and the value exists to keep it from being counted as one | Israel: "Second-year entry waits on completing a Hebrew exemption exam". Latvia: "Not universal: only international students… Trigger: studies in Latvia over six months or above 30 credit points". Cyprus: "Foreign students on a programme in another language must take at least one Greek course… before the programme is completed". Turkmenistan: "A one-year language preparation course may be run for entrants" |
| `not stated` | A duty is established and its form is not | Belarus: "Study of Belarusian is compulsory in vocational and higher education" — and nothing further |

**Discriminates?** Yes, best of any column here. On the duty-bearing corpus my
read puts `a named course` around a third, with the other four values each in the
10–20% band and `not stated` under a fifth. No value dominates. Description, not
a score — and deliberately not ordinal: a certified competence is not "more" or
"less" than three credits, it is a different instrument.

### C. `language_kind` — which language, by kind not by name. **MUST BE A LIST**

Coding the *name* of the language is not a vocabulary job; coding what kind of
word it is, is — per the `name-fields-are-codable` correction.

| Value | Gloss | Entries |
|---|---|---|
| `the state or official language` | The duty is to study the system's own language | Moldova: "Education Code art 10(3) makes study of Romanian compulsory at institutions of any level… The compulsory language is Romanian, the state language". Marshall Islands: "Instruction in Marshallese is compulsory at tertiary and college level institutions". North Macedonia: "Those students study Macedonian as a separate subject, under art 144 of the 2018 law" |
| `a foreign language, none named` | The instrument requires "a foreign language" and stops | Poland: "Descriptor names only 'jezyk obcy', a foreign language, and not a particular one". Montenegro: "At least one foreign language, and the act does not say which". Italy: "one foreign language besides Italian" |
| `a named foreign language` | A particular one, usually English | China: "The 2007 Course Requirements make College English a compulsory basic course for undergraduates". Ukraine: "Law 3760-IX art 8 has the State ensure compulsory English study in higher education". Algeria: "In the arabised streams a second modern foreign language is compulsory" / "That language is generally French" |
| `an indigenous or minority language, as an alternative` | An indigenous language may be offered *instead of* the required foreign one — the shape that distinguishes recognition from substitution | Peru: "The doctorate needs two foreign languages, one replaceable by a native one, art. 45.5" / "A foreign language, English preferred, or a native one, Quechua or Aymara preferred". Ecuador: "Ancestral languages and sign language may count as that second language". French Polynesia: "The assembly of French Polynesia may replace it with another Polynesian language" |
| `academic literacy in the medium of instruction` | The course is writing or communication *in the language teaching already runs in*. The value that stops an academic-writing requirement being counted as language study — the mirror of `the community, not the language` on `indigenous.taughtAsSubject` | Ghana: "The Language Centre teaches Academic Writing I in all programmes in Level 100". Pakistan: "Functional English is a general education course, covering grammar and vocabulary" / "Expository Writing is a further course aimed at improving student writing". Botswana: "Academic communication skills are offered to all first-year students". Also Nigeria, Lebanon, Kiribati, Tuvalu, Jordan |
| `a classical language` | Latin or equivalent, as a discipline prerequisite | Vatican City: "Veritatis Gaudium requires suitable knowledge of Latin in faculties of the sacred sciences" / "In the philosophy cycle, Latin must be verified within a student's first two years". Switzerland: "Latin is required by most universities only for language, literature and history degrees" |
| `not stated` | | |

**Why a list, and what coding one value would cost.** At least 9 of 86 name two
or more kinds at once and every one would lose half its answer: India ("the
student's chosen Modern Indian Language and the English language"), Jordan
("Compulsory ones include Arabic communication skills and English communication
skills"), Finland ("Finnish and Swedish… Plus one foreign language"), Kazakhstan
("Kazakh or Russian language and a foreign language"), Türkiye ("Turkish and a
foreign language"), Vatican (Latin plus "A modern language other than the mother
tongue"), Turkmenistan, Bhutan ("minimum standards in Dzongkha and English"),
UAE. That is ~10% of the field and ~15% of the duty-bearing corpus.

### D. `exemption` — who can release a student? **Candidate, and it fails the discrimination test**

Values the corpus forces: `prior qualification or certificate` (Malaysia: "Those
who passed Bahasa Kebangsaan A at pre-university, foundation or diploma level are
exempt"; Taiwan: "Exemption is by certification exam or by document review";
Hungary: "Institution may accept a state-recognised language exam as the evidence
of it"); `institution's discretion` (Finland: "University may exempt a student
partly or wholly from these skills for a special reason"; Cuba: "Rectors may
exceptionally exempt deaf students from the English discipline"); `disability`
(Hungary: "Nftv 49(8): a disabled student must where necessary be exempted from
that assessment"); `substitution for another course` (Jordan: "A faculty council
may substitute two courses for the English communication pair"; Malaysia: "An
exempt student must substitute another U2 module"; Canada: "A student eligible for
English instruction may substitute three French-language courses").

**Only 8 to 10 of 86 say anything** — about 88% would be `none stated`. It is the
column this file's own test warns about. Unlike `exemption` on
`indigenous.taughtAsSubject`, though, it is *not* regionally concentrated —
Finland, Hungary, Cuba, Jordan, Israel, Malaysia, Taiwan, Canada, Ecuador span
five regions — so it is a genuine axis with a thin corpus rather than a regional
flag, and the honest options are to build it as a deliberate record of silence
(the `extent` precedent) or to fold it into the `requirement_form` glosses. It
would have to be a list either way: Malaysia and Jordan each carry two routes.

### E. `scope` — what the rule binds. **Needed, or the map over-reports**

| Value | Gloss | Entries |
|---|---|---|
| `national rule, all students` | | UAE, Armenia, Türkiye, Indonesia, Moldova, France, Italy, Poland |
| `one institution's rule` | The duty found is a single university's own, reported against the country. Several entries say so in their first line | Kiribati: "Not a national rule: Kiribati has no higher education act, and the duty below is USP's own". Guam: "Not a territorial rule: this is the University of Guam's own general education requirement". Nepal: "No national rule: the compulsory English here is Tribhuvan University's own". Also Azerbaijan, Botswana, Ghana, Israel, Lebanon, Saudi Arabia, Taiwan, Tuvalu, Algeria |
| `sub-national rule only` | | Canada: "No federal rule: Constitution Act 1867 s 93 gives education exclusively to the provinces" / "Quebec alone legislates it, in the Charte de la langue francaise art 88.0.2 as amended 2022" |
| `one sector or provider type only` | | Germany: "at universities foreign language training is optional" / "Some HAW/FH degrees carry foreign language classes as a compulsory subject". Malaysia: "Act 555 requires every private higher education institution…". Qatar: "Art. 5 makes private educational institutions teach Arabic as an independent core subject" |
| `one group of students only` | | Latvia: "Not universal: only international students, Augstskolu likums 56(7)". North Macedonia: "Not universal: the duty falls on students taught in a community or a world language". Cyprus (foreign students on a foreign-language programme) |
| `one group of degrees only` | | Brazil: "Libras is a compulsory subject in teacher-training degrees and in Fonoaudiologia" / "In all other higher-education courses Libras is only an optional subject". Switzerland (Latin, for language, literature and history degrees). Togo: "Art. 22 on the licence professionnelle carries no equivalent clause" |

**Discriminates?** Yes, and it is the column that protects the field from its
worst misreading. **12 of 86 (14%) are one institution's own general-education
rule**, and without this column a distribution would report the University of
Guam's core curriculum as a territorial requirement. Kiribati and Tuvalu are the
*same* rule (USP's UU114) counted twice. Roughly 22 of 86 (26%) are not plain
national rules at all. Description, not a score.

---

## 3. `he.mediumOfInstruction` — what varies, and candidate axes

What varies is: what secures the medium (reuse `secured_by`, §1); how many
languages carry teaching; **what route lets another language in** — by far the
most repeated shape in the corpus; and what the rule binds.

### A. `secured_by` — reuse MEDIUM_SECURED_BY, with the rename in §1.

### B. `plurality` — how many languages carry teaching across the system?

MEDIUM_ROLE re-based on the system rather than on a focal language.

| Value | Gloss | Entries |
|---|---|---|
| `one language throughout` | | Ethiopia: "The medium of instruction in any institution shall be English". Congo: "AXL says all of Congo's higher education is given in French" / "French stayed the sole teaching language across school and university programmes". Equatorial Guinea: "Courses are given only in Spanish". Also Rwanda, Benin, Malawi, Tanzania, Netherlands, Armenia, Mongolia, Angola |
| `two or more in parallel streams` | Each stream is whole; the *system* runs several | Algeria: "Two streams side by side: some degrees are taught in Arabic, others in French" / "French carries biology, the medical sciences, veterinary and agri-food". Chad: "Law and political science give students the choice of doing the course in either". Switzerland: "In most cases students choose French or German as their sole language of study". Also Cyprus, Romania, Sri Lanka, Curaçao, Sudan, Seychelles, Namibia, Cameroon |
| `two or more inside one programme` | The languages divide a single programme's timetable | Morocco: "Foreign-language streams must include one module taught in Arabic". Turkmenistan: "Where a foreign language is the medium, national-component subjects use the state language". Malaysia: "Where English or Arabic is used the national language becomes a compulsory subject". Ukraine: "Subjects may be taught in two or more languages: state language, English, official EU languages" |
| `one language, another in support` | | Timor-Leste: "Portuguese is the main language of teaching… Tetum is used as a support language alongside Portuguese". DR Congo: "AXL says study begins in a national language and continues in French". Cameroon: "In practice students are taught in whichever language the lecturer commands best" |
| `permitted, not running` | An instrument provides for a second medium and nothing runs on it. Carried over from MEDIUM_ROLE, where it earns its keep here | Faroe Islands: "The same regulation provides for programmes offered in English" / "At present the university offers no degree programme with English as the language" |
| `not stated` | | |

### C. `exception_route` — what lets another language in? **MUST BE A LIST**

The most repeated structure in the corpus: a medium is fixed, and an exception is
named. Coding one route throws the others away in a quarter of the entries that
have any.

| Value | Gloss | Entries |
|---|---|---|
| `central or ministerial approval` | | Malaysia: "With the Minister's approval a course may instead be taught in English". Israel: "Converting a Hebrew programme to English needs Council for Higher Education approval". Qatar: "The university's board of trustees or the education ministry decides that exception". Also Belarus, Georgia, Azerbaijan, Mongolia, Vietnam, Armenia |
| `the institution's own decision` | | Estonia: "A foreign language is allowed on the institution's own decision, on two stated conditions". Norway: "Institutions may make an exception where there is an academic justification for it". Libya: "The university council may authorise other languages on the faculty council's recommendation". Seychelles: "Other languages may be used, in line with the institution's charter" |
| `the programme is about that language` | The automatic exception, and the commonest single route | Netherlands: "Another language may be used where the programme concerns that language". Latvia: "A whole programme may be foreign-language where it studies that language and its culture". Albania: "So are programmes whose object is the teaching of foreign languages". Ethiopia: "Language studies other than English are the one exception the proclamation allows". Also Indonesia, Saudi Arabia, Seychelles, Syria |
| `international or joint provision` | | Albania: "Joint programmes offered with foreign higher education institutions are exempt". Rwanda: "Institutions running the international curriculum in Rwanda may teach in another language". Laos: "International or Lao-foreign bilingual curricula are set by separate regulations". Also Azerbaijan, Timor-Leste, Turkmenistan, Tajikistan |
| `accessibility or sign language` | | Ethiopia: "Students with complete hearing impairment are taught in or through sign language". Serbia: "Studies, or parts of them, may be delivered in sign language for disabled students". Brazil: "Federal higher education institutions must provide Libras interpreters in the classroom" |
| `minority-language provision` | | Hungary: "A nationality student may study in their mother tongue, in Hungarian, or in both". Georgia: "In the Autonomous Republic of Abkhazia the language of instruction is Abkhazian as well". China: "Institutions in ethnic autonomous areas with mainly minority students teach bilingually". Serbia, Romania |
| `no exception stated` | The medium is fixed and nothing is provided for. A finding, distinct from `not stated` | Armenia, Netherlands (once the language-programme clause is coded), Uganda |
| `not stated` | | |

**Why a list, and what it costs.** Albania names three routes (EU language on
approval, joint programmes, language programmes), Ethiopia three (language
studies, short-term training, sign language), Azerbaijan three, Latvia two,
Seychelles two. Coding one value would throw the others away on at least a
quarter of the entries that have any exception at all.

### D. `rule_scope` — what the rule binds

`the whole sector` · `public institutions only` (Qatar: "State universities are
bound by law to teach in Arabic"; Cyprus, which splits public university, private
university and public non-university) · `private institutions only` (Malaysia's
s 41 of the Private Higher Educational Institutions Act 1996; Estonia: "A private
higher education institution's languages are set by the school's owner") · `named
institutions only` (Taiwan: "Targets apply to selected beacon institutions, not
to all universities"; Bolivia's UNIBOL) · `one institution, reported for the
system` (see §5) · `per programme, set case by case` (Croatia: "The language of
teaching is fixed in each programme's implementation plan, art 71"; Mozambique:
"Decree 32/2010 makes every module description state its own lingua de ensino";
Maldives: "MQA's 2022 guideline requires a programme's medium of instruction to be
relevant to its field").

### E. Degree cycle — **do not build it.** ~5 of 129 differentiate.

---

## 4. Columns that must be lists

- `he.requiredStudy.language_kind` — ≥9 of 86 name two or more kinds (§2.C).
- `he.requiredStudy.exemption`, if it is built at all — Malaysia and Jordan each
  carry two routes (§2.D).
- `he.mediumOfInstruction.exception_route` — five entries carry three routes each
  (§3.C). This is the clearest list in either field.

Everything else in §2 and §3 is mutually exclusive as drafted and can be a single
value.

One collision that is **not** a list and needs a ruling instead:
`secured_by` `none` versus `left to the institution`. Argentina reads "Ley de
Educacion Superior 24.521 fixes no language of instruction for degrees" *and*
"Art 29 leaves study plans to each university's own academic autonomy" — is a
statutory silence plus a general autonomy clause a documented `none`, or a
positive delegation? Croatia resolves its own case in its own words ("The choice
is the institution's, by rule: the act delegates it to the implementation plan")
and so is unambiguously `left to the institution`. Argentina, Chile, Colombia,
Dominican Republic, Costa Rica, Venezuela, Uruguay and Puerto Rico do not, and
they are the same shape as each other. About 8 entries turn on this.

---

## 5. THE ROW GRAIN — where I stop proposing

Storage holds one coding object per unit per field. Everything in §2 and §3 above
is a property of *the system's answer*, so all of it fits one row per system.
Three things do not, and I am not proposing them:

**(a) `he.mediumOfInstruction`: the language, per programme or per institution.**
This is the field's real grain problem. **35 of 129 entries (27%) name a specific
institution** rather than the system, and a further ~10 enumerate by programme or
faculty. Sri Lanka says so about itself: "Recorded faculty by faculty in the UGC's
handbook of courses of study, **not one rule**" — Peradeniya's B.Com "may be
followed in Sinhala, Tamil or English medium" while its Dental Surgery "is taught
in English medium". Romania counts "Of 248 bachelor programmes 158 are Romanian,
66 Hungarian, 8+1 German, 15 English, 1 French". Curaçao lists each bachelor with
its own language ("Bachelor of Laws… in Dutch"; "Engineering and Sustainable
Technology bachelor is listed as Dutch and English"; "A teacher-education
bachelor is listed as English, Dutch, Papiamentu"). Lebanon holds AUB in English
and USJ as francophone in one row. Brunei holds UBD in English and UNISSA's
Arabic faculty. Chad, Algeria, Morocco, Cyprus, Uzbekistan and Tunisia split by
discipline.

A `which_language` column would need one row per programme for all of these, and
every one of the 35 would be answering about an institution while the row claimed
to answer about a country. **So: no named-language column.** `plurality` and
`exception_route` capture what those entries actually establish about the system,
and `rule_scope` records that the answer came from one institution. Language
names stay in the prose, where they are.

**(b) `he.requiredStudy`: the amount or level, per degree cycle.** 10 of 86
(12%) give different answers for different cycles, and a `how_much` or `level`
column would need a row each: Peru (pregrado art 40, bachiller art 45.1,
doctorate two languages art 45.5), Ecuador ("Third-level grado requires at least
level B1" / "Técnico requires at least A1 and tecnológico at least A2"), Vietnam
("Bachelor graduates must reach… level 3 of 6. Master graduates must reach level
4 of 6"), UAE (bachelor 21 credit hours, diploma 15), Poland (PRK level 6 B2,
level 7 B2+), Togo (licence fondamentale yes, licence professionnelle no), Italy
(explicitly scoped: "Clause reads 'con riferimento alla laurea', scoping it to
the first-cycle degree"), France, Armenia, Bhutan. **So: no amount column and no
CEFR-value column.** `requirement_form` keeps the *kind* of measure (level,
credits, certified competence) at one row per system, which is the comparable
part; the numbers stay in the prose. If the maintainer wants the cycle split it
is a `domains.js` shape change, not a vocabulary one.

**(c) Anything per language on `requiredStudy`.** `language_kind` is a list of
*kinds*, which is row-safe. A column holding the level required *of each named
language* is not: Finland needs Finnish and Swedish at the bilingual-authority
standard and a foreign language at a different one, in one row.

---

## 6. Entries that would not fit

Named, with why.

**`he.requiredStudy`**

- **New Caledonia** — not a refusal of the vocabulary but of the field: "Higher
  education is not New Caledonia's: loi organique 99-209 art. 21 keeps it with
  the State". This is Not applicable, not an absence and not a coding.
- **Greece** — "Sources conflict: the bachelor chapter says programmes may include
  language courses / Support chapter names a compulsory foreign language required
  for being awarded a degree". `requirement_form` would have to hold two
  incompatible readings of one statute. No value should be invented for this; it
  wants a note, or resolving.
- **Denmark** — "Every bachelor project, thesis and master project needs a summary
  in a foreign language". A duty, on the student, with no course, no level and no
  certificate: it is a single output in a foreign language. It fits
  `requirement_form` only by stretching `a competence certified at graduation`
  past its gloss.
- **Estonia** — "A student weak in Estonian may extend studies by up to one
  academic year to learn it". A remedy, not a requirement. It is on the codable
  side of the flag and has nothing to take on §2.A or §2.B.
- **Qatar** — "Art. 5's subject duty is not clearly a degree duty, universities
  having their own article". The entry declines to decide; the coding should not
  decide for it.
- **Kiribati and Tuvalu** — code identically and correctly, and are the same USP
  rule counted twice. Not a refusal, a double count the reader has to be told
  about.
- **Paraguay** — "Art. 28 names no level itself: art. 10 and art. 29 are the
  clauses that reach superior". Whether a duty exists at all is the open question,
  so `obliged_party` cannot be answered.

**`he.mediumOfInstruction`**

- **Brazil** — the whole entry is Libras interpreter staffing: "Federal higher
  education institutions must provide Libras interpreters in the classroom". It is
  an access duty, not a medium. `exception_route` = `accessibility or sign
  language` is the only cell it fills, and `plurality` and `secured_by` would be
  describing a rule about interpretation, not about instruction.
- **Cambodia** — "When the Royal Khmer University opened in 1960 the language of
  instruction was French". Historical, and a coding carries no date. Nothing
  should be coded from it.
- **Czechia** — "A public university running a study programme in a foreign
  language may charge fees". A fee consequence, not a medium rule.
- **Sudan** — "Cites the 2005 Interim Constitution; its status after 2019 is
  unverified here". The entry flags its own instrument as possibly void; coding
  `system rule` from it would encode a superseded rule as current — the exact
  trap the skill records about Ireland's 2007 criteria.
- **Taiwan** — "By 2030 target: half of sophomores at beacon bilingual
  universities to reach CEFR B2". A target for a future date at named
  institutions. Not a medium, and `rule_scope` = `named institutions only` is all
  it supports.
- **Guatemala** — "Decreto 19-2003 binds the national education system, public and
  private, on language use… This is a statutory duty on the education system, not
  a university-specific rule". Whether it reaches universities is exactly what the
  entry declines to assert.
- **South Africa** — "Plans must name at least two official languages other than
  the medium of instruction". A duty to plan, about languages that are *not* the
  medium. It fits no `plurality` value honestly.
- **Egypt, Eritrea, Eswatini, Senegal, Gambia, Mali, Benin, Kenya, Tanzania,
  Gabon, Congo, Namibia, Cameroon, Nigeria, Malawi** — 21 of 129 entries (16%)
  rest on Université Laval's AXL or on PEER. Every one of them will code
  `practice only` **because of where it was sourced**, not because the system
  lacks a rule. That column will therefore measure a sourcing decision as much as
  a system — the same finding as the policy-history `not_an_operation` column,
  where 70 of 78 rows were one country. It should be said in the gloss before
  anyone takes a distribution over it.

---

## 7. Counting caveat

Every share in this report from a regex or keyword sweep is **indicative only**,
and is marked as such where it appears. The reason is the one the project has
already paid for: this corpus is written in negations. A pattern for "no language
requirement" matches Norway's "imposes no language every student must study" and
also Bolivia's "obliges universities to run language programmes, **not** students
to take them", which is a different finding; a pattern for "University" matches
both "the University of Guam's own requirement" (institution-scoped) and "binds
universities, not students" (a national negative). The counts that matter — 18
mis-filed pure negatives, 3 provider-duty entries, 12 institution-scoped
`requiredStudy` entries, 9 multi-language entries, 10 cycle-split entries, 21
AXL/PEER entries — were reached by reading all 86, all 112 and all 129 entries by
hand, and each is listed by name above so a later reader can disagree with the
typing rather than with the arithmetic.
