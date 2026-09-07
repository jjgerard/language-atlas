# Shared brief — Language Atlas research agents

You are researching for the Language Atlas, a map of language-education and
language-disorder policy maintained by a linguistics lecturer. Your output is
RESEARCH EVIDENCE that another process turns into map entries. Accuracy matters
far more than coverage. An honest "not found" is a useful result; an invented or
unverified claim is a serious failure that will be caught and thrown away.

## Non-negotiable rules

1. EVERY claim must trace to a URL you actually retrieved and read in this
   session. Not a URL you believe exists. Not a search-result snippet. Not your
   own background knowledge. Retrieve it, read it, quote it.
2. VERIFY EVERY URL yourself before reporting it. Use Bash:
       curl -sSL -o /tmp/x -w "%{http_code} %{url_effective}\n" \
         -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
         -e "https://www.google.com/" "<URL>"
   Many government and NGO hosts 403 a bare request but return 200 with that
   user-agent and referer. A URL that redirects to a generic landing page is NOT
   verified — check `url_effective` and check the file actually contains the
   text you are citing (`grep`). For PDFs, extract text before quoting.
   If only the Internet Archive copy works, report the archive URL and say so.
3. QUOTE VERBATIM. For each claim give the exact sentence or clause from the
   source, in quotation marks. If you cannot quote it, you have not verified it.
4. NEVER GUESS a DOI, a section number, a date, or a document title.
5. Do not reproduce assessment items, norms, scoring tables or cut-off values.
   Assessment instruments may be NAMED and LINKED only.
6. Report absence explicitly and specifically. "Country X's education act
   contains no medium-of-instruction provision" (having read it) is valuable.
   "I could not find anything for country X" is also fine and expected — say it
   plainly rather than padding with plausible-sounding generalities.
7. Do not infer one jurisdiction's rule from a neighbour's, from a regional
   pattern, or from what is typical. Each unit stands on its own sources.

## What to send back

A markdown report, one section per unit, in this shape:

### <ISO2>|<Unit name>
STATUS: documented | not-found | partial
SOURCES:
 - label: <full citation-style label, e.g. "Ohio Admin. Code 3301-51-01, definitions">
   url: <verified URL>
   http: <status code you observed>
   tier: official-document | secondary-source
EVIDENCE:
 - field: <fieldName>
   quote: "<verbatim passage>"
   source: <url>
DRAFT BULLETS:
 - field: <fieldName>
   bullets:
     - <bullet 1>
     - <bullet 2>

`tier` is `official-document` when you read the statute, regulation or
government circular itself; `secondary-source` when you read a peer-reviewed or
institutional account of it. Both are acceptable evidence — the distinction is
recorded so a reader can tell which they are looking at. Never cite something
you have only seen summarised somewhere else.

## Bullet style (the map's panel is narrow and rendered as a list)

- ONE BULLET PER LINE, at most 4 content bullets per field, plus optionally one
  leading hedge/qualifier bullet (5 lines absolute maximum).
- MAXIMUM 96 CHARACTERS per bullet. Count them.
- No bullet may end in "." or ";".
- EVERY BULLET MUST STAND ALONE. Never split a sentence across two bullets. This
  is the most common mistake — check each bullet reads as a complete point on
  its own.
- Clipped register, like a conference poster, not prose sentences.
- A qualifier that would mislead the reader if dropped (that a figure is a
  practitioner survey; that a rule was repealed) goes FIRST, not last, because a
  reader of a list may not reach the bottom of it.
- Plain text only. No HTML, no markdown emphasis inside bullets.

Good:  "Statutory category: 'speech or language impairment', Ohio Admin. Code 3301-51-01"
Good:  "It must adversely affect the child's educational performance"
Bad:   "The state defines speech or language impairment as a communication" / "disorder that adversely affects performance"  <- split sentence

## Filling FIELDS on entries that already exist

Some tasks ask you to fill particular fields rather than document a whole unit.
Where that is the task:

- The entry may already have text in other fields. Do NOT rewrite or restate
  those. Report only the fields you were asked for, plus any field where you
  found something genuinely new and can quote it.
- If the existing entry contradicts what you find, say so explicitly and give
  both sources. Do not silently prefer yours.
- An entry can be added to one field at a time. Two verified bullets on one
  field is a good result; it does not need the whole entry to be finished.

## Leverage first, always

Before working through a list country by country, spend your first effort on
whether ONE source covers many of them. A comparative document that covers
forty systems fills forty entries in a single pass; forty separate hunts fill
perhaps five. Report what you tested and what you found, including the
negatives — "this exists but 403s", "this covers only four of my units", "this
is a commercial index with no method published" are all useful results.

Where a task below already names a candidate leverage source, test that FIRST.

### Two that keep earning their keep

**The Japan Foundation's per-country reports.** One PDF per country, at
`https://www.jpf.go.jp/j/project/japanese/survey/area/country/2025/<name>_2.pdf`,
and they carry this atlas's questions in named sections: 資格要件 (the
qualification route), teacher counts with the month they were taken, why a
course lapsed, and a 外国語教育 section describing the whole system's
foreign-language provision rather than only Japanese. They exist for far more
countries than you would guess -- eight of nine Pacific states in one batch --
and they are often the ONLY published source for a small state.

They are in Japanese. Quote the Japanese verbatim; the bullet may be English.
And scope every bullet to what the source actually covers: a JF report speaks
for Japanese, so "no training programme" from one means no JAPANESE training
programme, and the bullet has to say so. Only the 外国語教育 section speaks for
foreign languages generally.

**UNESCO IESALC's Higher Education Policy Observatory**, for African and Latin
American higher-education statutes. It hosts each country's framework law as a
plain-GET PDF at a predictable path:

    https://hepo.iesalc.unesco.org/pc/static/countrydocs/cp/2025/<iso3>/<iso3>_HELawLi.pdf

**The iso3 must be LOWERCASE.** `.../2025/KEN/KEN_HELawLi.pdf` returns a
269-byte 404 for every country in the world, which reads exactly like the host
being dead; `.../2025/ken/ken_HELawLi.pdf` returns 306 KB. A pass that tries
the uppercase form once will conclude the whole source is gone and go and do
thirty-two country hunts by hand.

and the same pattern with `_HEEdLawLi` (the general education law), `_QALegLi`
(quality assurance), `_HEEdPlanLi` and `_RecAutoLi`. The country page at
`/pc/policy/countrygraph/cp/<ISO3>/` names which instruments it holds.

On one 26-country African pass, 25 countries had at least one document and 20
of those had a text layer. That is the best single route to these statutes
there is, now that `whed.net` and `droit-afrique.com` both 403.

Two cautions, both found the hard way. **Several of the PDFs are image scans**
yielding nothing extractable -- Angola, Burundi, CAR, Guinea, Lesotho and
Togo among them -- so test the text layer before planning around it. And
**check that the document is the instrument it is filed as**: Algeria's slot
holds a 2000-2022 index of ministry texts rather than a law, and the Comoros
slot holds a newspaper op-ed about the orientation law rather than the law.

**The Wayback CDX API**, for settling whether an archived document exists at
all instead of guessing filename variants one 404 at a time:

    https://web.archive.org/cdx/search/cdx?url=<host>/<path prefix>/*&output=json&fl=original&collapse=urlkey

It 504s on an unfiltered listing, so always pass a prefix or a filter.

## "EAL" is a word about English, so use it only where English is the school language

The map id is `eal`, but its label is **Majority language acquisition**, and the
question it asks is: *what happens to a child who arrives at school without the
language that school teaches in?* That language is Arabic in Sudan, French in
DR Congo, Spanish in Mexico, Portuguese in Guinea-Bissau.

So do NOT write "no EAL designation" about a system that does not teach in
English. Write **"no newcomer or additional-language designation"**, or name the
local term the system actually uses.

Use "EAL" only where it is genuinely the term in play: England, Scotland, Wales,
Ireland, Australia (where it is EAL/D), Canada (Alberta, Manitoba and
Saskatchewan all use it), and the Anglophone Caribbean. In the United States the
term is not EAL either — it is English learner, EL, or ELL. Where a system has
its own word — *castellanización*, *français langue de scolarisation*,
*Deutsch als Zweitsprache* — prefer that word and say whose it is.

The same care applies to the reverse direction. Do not call a language "foreign"
because it is foreign to you: French in Senegal is the medium of instruction,
Arabic in Chad is a medium, and Russian in Kazakhstan is a second state
language. Record the category the SOURCE puts it in.

## Some questions need a particular KIND of source, not more searching

A question that almost nobody answers is sometimes a bad question and sometimes
a good one asked of the wrong documents. Three cases are now settled and they
all point the same way:

- **A ratio to POPULATION** -- "18 speech pathologists per 100,000 inhabitants"
  -- is answered by a PROFESSIONAL ASSOCIATION'S workforce analysis, and almost
  never by a statute, a ministry page or a practitioner survey. Five units in
  the whole atlas answer it and two of those come from that one source type.
- **Whether norms exist for bilingual children** is answered by a TEST BATTERY'S
  own documentation. It is 0% across the atlas except Luxembourg, whose source
  for that field is a battery rather than a survey or a law.
- **Whether a rule is really in force** -- as against merely published -- comes
  from an evaluation or inspection report, not from the instrument itself.

So when a field's later questions come back empty, ask what KIND of document
would carry that answer before concluding the question is wrong. A survey tells
you who and how many; a statute tells you what is owed; an association's
analysis tells you how many there are per head; an inspectorate tells you
whether any of it happens.

## A documented absence is now the priority, not a consolation

Count the whole atlas and it is 10,291 cells with content, 9,626 blank, and
**135 that say somebody looked and found nothing**. That last number is 1.4% of
the empty space, and it is the single thing stopping this data being scored.

An indicator has to read a cell. If a blank and a real nil look the same, then
scoring a blank as zero measures which countries got attention, and refusing to
score it throws away every country nobody has reached. The atlas already has
the machinery to tell them apart -- the sentinel phrase "Not established from
the sources consulted" is a distinct state that the map paints differently and
the coverage counts exclude. It is barely used because drafters have treated a
negative as a failed search rather than as a finding.

So, as a standing instruction on every task from here:

**When you read an instrument and it does not contain the provision the field
asks about, that is the answer, and it goes in the field with the quote.** Not
a note in your report. Not a blank. The bullet says which document you read,
and what it does not say.

The Americas requiredStudy pass is the worked example: twelve countries, and
nine of them were absences. Argentina's Ley 24.521, Chile's Ley 21.091,
Colombia's Ley 30 and the Dominican Republic's Ley 139-01 were each read end to
end and the words *idioma* and *lengua* occur in none of them. Four blanks
became four findings, and the reason -- a constitutional university-autonomy
tradition that parks curriculum with the institution -- only became visible
because the absences were written down next to each other.

Two things this is NOT. It is not the sentinel, which says nobody has looked;
a read instrument's silence is a source and its silence is content. And it is
not a licence to write an absence you have not established: "I could not find
anything" is a blank, and "art. 7 of the framework law lists the compulsory
content and no language is among it" is a finding. The difference is whether
you can quote the silence.

## Read the act's SCOPE clause before quoting its language clause

Zambia is the clearest case in the atlas. The Education Act 2011 s.98(1) says
"the language of instruction at any level of the education system shall be
English" -- and s.3 says "This Act does not apply to- (a) a university
established or registered under the University Act, 1999". The Higher Education
Act 2013 is silent. A pass that quoted s.98 alone would have filed a national
rule about university teaching that does not exist, and it would have quoted
verbatim from the statute while doing it, so no gate could catch it.

It is not rare. Zimbabwe's Education Act s.62 names a medium only up to grade
four. South Sudan's applies to schools. Somalia's 2017 language article covers
grades 1-8 and secondary, and the higher-education part of the same law has
none. In every one of those the sentence you want to quote exists and says the
wrong thing about the level you are writing about.

So: find the article that says what the instrument applies to, and the article
that says which levels or bodies are excluded, and read them before the clause
you came for. This is the same rule as the French Pacific one below, arrived
at from a different continent.

## A `year` on a row means the programme STARTED, or the figure was COUNTED

Nothing else. Two consecutive batches offered 78 years between them and 60 had
to be cleared, because they were answering a different question:

- a CATALOGUE edition — "Undergraduate Catalogue 2023-24"
- a CURRICULUM revision — "the 2568 BE (2025) revision", "培养方案（2021年版）"
- a set of internal REGULATIONS — "internal regulations dated 9 September 2021"
- a programme-specification version — "programme start year 2026/2027", on a
  faculty founded generations earlier
- and, worst, the date of the INTERNET ARCHIVE CAPTURE the page was read from,
  which says nothing at all about the programme

Every one of those was honestly described in its note, which is the only reason
they were catchable. But a reader scans the year column before the note, and a
year there reads as "this began then" whatever the note says.

So: **put a year in the field only when the source says the programme began,
was first offered, was first approved, or was added — or, for a figure, when it
was counted. Make the note say which.** "Honours degrees in English offered
since 1976" earns its year. "Listed among the 16 majors of the 2018 curriculum"
does not, and the fact belongs in the note instead.

A missing year is a small loss. A wrong one is a claim, and it is the kind a
reader trusts without checking.

## Programme registers: prefer the one that answers a GET

`offerings` and `linguistics` are row fields, and the only economical way to
fill them is a register that lists programmes rather than a university site you
walk page by page. Two passes over 57 countries settled which kind works.

**What works is a register whose results are in the HTML of a GET url.** The
ones that earned their keep:

- **Tanzania, TCU.** Not the admission guidebook -- its programme titles wrap
  across four PDF lines and no quote survives extraction. The web register
  takes query parameters and returns the whole country in one fetch:
  `tcu.go.tz/services/accreditation/academic-programmes-offered-universities-tanzania?title=Linguistics&field_award_level_value=All&university_institution_id=All`
- **Uganda, NCHE.** `unche.or.ug/all-academic-programs/` is 1.3 MB carrying
  every accredited programme as inline JSON. It surfaced programmes at Kabale,
  Gulu and KIU that no institutional search found.
- **Portugal, DGES.** `guias/indcurso.asp?letra=X` then
  `guias/detcursopi.asp?codc=&code=` -- a real per-course-per-institution
  register carrying the cycle and the CNAEF area. It is windows-1252.
- **Czechia, Charles University.** `is.cuni.cz/studium/prijimacky/index.php?do=obory&zobraz=Zobrazit`
  returns ~1,700 programmes as one flat list. The `fakulta=` parameter is
  ignored -- every query returns the whole university.
- **Guinea-Bissau, QUANEF-GB.** A national qualifications register mapping
  course to institution to ISCED field to award.
- **INALCO's `licences-llcer` page** is the single most productive page in
  Europe for this field: 57 languages with a Licence, all enumerated.

Four more that earned their keep in the Americas:

- **Paraguay, CONES.** `cones.gov.py/<university-slug>/` is one server-rendered
  page per institution carrying every programme as a table row -- name, nivel,
  sede, the habilitation resolution number, and an INACTIVO flag. 712 KB, no
  pagination, no JavaScript, and there are around 132 university pages plus 40
  institute pages on the same pattern. It is the best register found anywhere
  so far, and it gave Paraguay a Lengua Guarani licenciatura with its
  resolution number.
- **Guyana, University of Guyana Registry.** `registry.uog.edu.gy/srms/departments`
  indexes departments and each `/srms/departments/<id>/programmes/` page lists
  the programmes server-side, annotated with when one was added. Note that
  `uog.edu.gy/srms/...` 404s -- only the `registry.` host serves.
- **Puerto Rico, `upr.edu/academico/`** puts all eleven campuses in one 479 KB
  table with a campus column and a level column: a whole system in one fetch.
- **Mexico, `oferta.unam.mx`** is an alphabetical index plus one static page
  per licenciatura carrying the award title and the faculties offering it.

Three more, from Europe, and one of them overturns the obvious candidate:

- **Poland: the university's own IRK, not POL-on.** `polon.nauka.gov.pl` 404s
  on the programme paths, `radon.nauka.gov.pl/dane/studia-i-studenci` is a
  1,152-byte SPA shell, and `studia.gov.pl` redirects into a JavaScript search
  app. What serves is the MUCI admissions register each university runs:
  `irk.uw.edu.pl/pl/offer/PELNE2026/` is an A-Z index of every programme and
  `/field/<CODE>/` gives each one with its mode and cycle;
  `irk.uj.edu.pl/pl/offer/<REG>/programme/<code>/` is a full detail page with
  the organisational unit, the kierunek, the level and the duration. Every
  Polish university runs one, which makes this a national register in practice.
- **Lithuania: `vu.lt/stojantiesiems/magistranturos`**, one 361 KB fetch
  listing every master's programme grouped by faculty. AIKOS serves 200 but
  its registry search is SharePoint plus JavaScript and says so in Lithuanian;
  `bakalauras.lamabpo.lt` fails TLS SNI.
- **Ukraine: KNU's Institute of Philology**, at
  `philology.knu.ua/osvitni-prohramy/...`, flat server-rendered lists of every
  educational programme with its official code.

**What does not work is a register that renders its results in JavaScript**, and
most of the famous ones do. Confirmed dead to a fetcher: Universitaly (Nuxt),
Spain's RUCT (AJAX), Ukraine's EDBO (Next.js), felvi.hu, Croatia's
postani-student.hr, Norway's Samordna opptak, South Africa's SAQA (POST-only,
no citable per-qualification GET). Italy's `offf.miur.it` is server-rendered but
groups by DEGREE CLASS, which by design never names a language.

Do not spend a pass fighting these. Note them and go to the faculty's own
programme list, which is usually server-rendered because it is old.

## `linguistics` means the science of language, not a language

The field is for a programme whose own title names the study of language as a
subject -- Lingvistika, Kalbotyra, Jezykoznawstwo, Obecna lingvistika,
Keeleteadus, Ciencias da Linguagem, Sciences du langage. It is NOT for a
degree in one language: "Crnogorski jezik i knjizevnost" is a philology
degree and belongs to `offerings`, which is exactly the field that asks which
languages an institution teaches.

This is what the 261 filled entries already do, and it is worth stating because
it is what turns three units into documented absences rather than long lists.
Montenegro's Filoloski fakultet offers programmes at all five levels and every
one is named for a single language. Andorra's only language item is a Batxelor
en Llengua catalana. The Faroes teach Foroyskt at bachelor and master under a
Foroyamalsdeildin. All three are full of language provision and none of them
has a linguistics programme, and a pass that blurred the two would have
reported the opposite.

## A meta-description is not a body quote

A pass drafted two UWI St Augustine rows off the text in
`<meta name="description">`. Both failed the gate, and correctly: it strips
tags, so it never sees attribute text, and neither does a reader. The quote has
to come from what is rendered on the page.

The same applies to a `<title>`, with a twist worth knowing. Quoting a title
straight out of raw HTML gives you the ENTITY form -- `Anglais &#8211; Flsh` --
and the gate compares against decoded text. It now decodes the quote too, so
this no longer costs you the row, but the readable body text is still the
better quote: a title tells you a page exists and not what it says.

## Check the status code, not the page size

Two hosts in one pass served **HTTP 404 with 38-110 KB of full site
navigation** -- `unistrapg.it` and `ff.unsa.ba`. A drafter reading for content
saw a populated page with a degree list on it and nearly quoted a degree
programme off a 404. The same shape is already recorded for
`repository.uneca.org` and IBE's World Data on Education, which serves a
1.79 MB 404.

So the size of the response tells you nothing. `curl -w "%{http_code}"` and
read it.

## A documented "there is no such rule" IS the answer, and it belongs in the field

Some fields ask about a rule that most systems simply do not have. `he`'s
`requiredStudy` asks whether every student must study a language whatever their
degree; roughly one system in six does. It sat at 1 filled out of 48 in Europe
for a long time, and a batch that finally worked it found the reason: every one
of twelve countries HAD an answer, and earlier drafters had found no rule and
written nothing rather than writing the absence.

So, plainly: if you read the framework act or the degree decree and it imposes
no such requirement, **write that, with the quote**. "Austria's UG 2002
mentions language only as an admission condition and as a permission for a
university's own statute" is a finding. "Germany's tertiary chapter says
foreign language training is optional" is a finding. Both are worth more than a
blank, and a field where only positives are ever written will read as a
backlog forever.

This is NOT the same as the not-established sentinel, which says nobody has
looked. A read instrument that is silent is a source, and its silence is
content.

Where two sources disagree, write the disagreement rather than choosing. One
batch found Eurydice's Greek chapters contradicting each other about a
compulsory degree language, read the whole of framework law 4957/2022, found it
silent, and recorded the conflict. That is the right answer, and picking a side
would have been worse.

## The French Pacific territories do not share one legal status

This is written down because a brief of mine got it wrong and three agents were
sent out with it. I told them "New Caledonia has held education competence
since the Noumea Accord". That is too broad, and an agent checked it rather
than taking it:

- **Article 21 II 7 of loi organique 99-209 lists "Enseignement superieur et
  recherche" among the competences the STATE exercises in New Caledonia.**
  Article 27 only allows the congress to resolve that it be transferred later.
  What New Caledonia holds is primary education; higher education is not its.
- **French Polynesia's statute changed in 2004 and the change is exactly the
  kind this atlas records.** The 1996 statute reached only *ecoles maternelles
  et primaires* and *etablissements du second degre*; the 2004 statute added
  *et dans les etablissements d'enseignement superieur*. A row written off the
  1996 text as though it covered universities would have been wrong.
- **Wallis and Futuna has no higher-education institution of its own,** and its
  primary teachers train at the IFM in New Caledonia for a University of New
  Caledonia diploma, with New Caledonia funding the training.

So: read the SCOPE article of any French instrument before using it, for the
level you are writing about, and do not carry a finding from one territory to
another. The same applies to metropolitan France: its *horaires* and its
Education Code do not reach these territories unmodified, and whether they
reach a given one at a given level is a question with a published answer.

## Depth rule: every dated instrument is also a policyHistory row

`policyHistory` is a list of `{year, description}` and it is the sole input to
the atlas's Patterns timeline, which currently holds 228 rows spread across 711
entries — thin enough that the timeline says more about which entries got
attention than about how policy moved.

You will already be citing dated things: an act, an amendment, a curriculum
order, a circular, a ratified convention, a funding decision. Whenever you do,
propose a `policyHistory` row for it as well. This costs almost nothing, because
you have already read the document; the year and a one-clause description are
sitting in the citation you just wrote.

The same rules apply as to any other field: the year must come from the source,
never from inference, and a description you cannot quote support for does not go
in.

**A history row needs its own `evidence` entry, exactly as a bullet does.** This
is the single most common way good rows are lost: two waves of drafters proposed
history rows off documents they had already read and quoted, gave no evidence
entry for the rows themselves, and the gate dropped every one of them. Key the
entry by the row's description, or by the year and description together —
`"2006 Primary curriculum reform introduces English in years 1 and 2"` — and
either form is accepted.

And the quote has to support the CHANGE, not merely the figure. A row saying
"the 2010 study plans set foreign language at 3 periods" whose only support is a
table's source line reading *National study plans 2010-2011* is not a dated
change; it is the field's own content with the document's date attached, and it
was dropped for that. What belongs here is what the source says HAPPENED: a
decree bringing English forward to grade 1, a curriculum issued, a department
closed. If the document states a figure but never says anything changed, the
honest answer is no history row.

## `slots` is one integer PER BULLET, not one per field

A field's hint lists four questions. The bullets answer them in order, omitting
any that cannot be answered, and `slots` records which question each bullet
answers — so a four-bullet field needs four numbers, and a three-bullet field
that answers questions 1, 3 and 4 gets `[1, 3, 4]`.

`"requiredStudy": [1]` against three bullets is the mistake, and a whole batch
of twelve made it. It cannot be repaired afterwards: which bullet answers which
question is not recoverable from one number, and guessing would file a sentence
under a question it does not answer. The applier now says so per field rather
than dropping them silently, but the numbers still have to be right when they
arrive.

The list must not go backwards for its own sake, but you no longer have to
reorder your bullets to make it non-decreasing — if you write bullets answering
questions 1, 3 and 2 in that order, tag them `[1, 3, 2]` honestly and the store
puts them in order, moving the prose with the numbers so the two never
disagree. It only refuses when a bullet leans on the one before it ("it", "such
a rule", "and also"), which cannot be moved without breaking the sense.
