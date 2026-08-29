# Language Atlas

One world map over several domains of language policy, shaded by what is
documented. Hover a country for what its entry has and hasn't; click for the
whole entry.

Tabs are written for a reader with no linguistics background — "Majority
language acquisition" rather than EAL, "Language disorder support" rather than
DLD — with the technical term named once in the blurb so it stays findable.
The `id`s in the data remain `eal` and `dld`.

## Typography and contrast

One sans face (Archivo) throughout; hierarchy is weight, size and tracking
rather than a change of voice. Every text colour is checked against the surface
behind it at WCAG AA — the muted greys were originally as low as 2.5:1 on the
ground, which is what made a page of greys on greys hard to read. `--ink-faint`
and `--ink-soft` are the two tokens to re-check if the palette moves.

## Where the data lives

Every subject is held here, in `data/<id>.json` — the living snapshot the
running app commits back after an approval, and the file a rebuilt machine boots
from.

    src/store.js ─► /api/atlas ─► the map
                 ◄─ /api/:domain/submissions
                 ◄─ /api/:domain/edit-requests
                 ◄─ /api/admin/*   (moderation)

### The trackers this grew out of

Two of the three subjects began as separate apps — `dld-policy-tracker` and
`eal-policy-tracker`. They were folded in during August 2026 by reading their
live `/api/catalog` into `data/<id>.json`, and retired that same month: both
Fly apps now do nothing but 301 their old URLs here, and their repositories are
private archives.

Before the switch the two sides were compared field by field, not entry count by
entry count — an entry can be present in both and still have lost a field. No
unit and no field existed in either tracker that the atlas lacked.

For a while a domain could declare an `origin` instead of holding its own
entries, and `src/catalog.js` fetched that catalogue server-side every five
minutes while `/api/:domain/submissions` forwarded upstream. That path was
removed with the trackers. What made the migration a data move rather than a
rewrite still holds: a stored row is shaped exactly like a tracker's
`/api/catalog` entry, so `src/derive.js` and every page below it never knew the
difference. Re-introducing a proxied catalogue would mean restoring that path,
not reshaping anything downstream.

One thing the import surfaced is worth keeping in mind for any future one: it
refused to write when an entry carried a key the target domain's field list
would not store, naming the key and how many entries had content in it. A
migration that silently drops a column is the kind of thing nobody notices for a
year. `achievementGap` was caught that way; it is now `Education outcomes` on
the EAL list, which is why EAL entries count out of nine fields rather than
eight.

### One table, not one per subject

Each tracker kept a table per project with a column per field. That does not
extend — a fourth subject would have meant a fourth schema. Here the envelope every
subject shares is columns and its declared fields are one JSON blob, so adding
a subject stays a `src/domains.js` edit. Each field is `[key, label, type,
hint]`; `type` is `text`, `history` (`{year, description}`) or `series`
(`{year, value, note}`), and it drives the form widget, the sanitiser and the
coverage rule together.

### Two approved rows for one place is normal

A place starts as a seeded stub, and the whole invitation to contributors is
"add one field without documenting the rest". So `store.approved()` merges
rows for the same place into one record: a later row fills what it knows and
leaves an earlier row's fields standing, dated lists and document links pool,
and everyone who wrote part of it is credited on it. The dashboard still lists
each contribution separately, because that is what gets reviewed.

### Persistence

Fly gives this app no disk, so the SQLite file is gone when a machine is
rebuilt. `src/gitStore.js` commits each native subject's approved set to
`data/<domain>.json` after every change that alters it, and a fresh instance
boots from that file (falling back to `data/<domain>.seed.json`). Without
`GITHUB_TOKEN` and `GITHUB_REPO` set, **approvals do not survive a redeploy** —
the dashboard says so in its footer, and `/api/health` reports it.

| Variable | Without it |
| --- | --- |
| `ADMIN_PASSWORD`, `SESSION_SECRET` | No dashboard; submissions still stored |
| `GITHUB_TOKEN`, `GITHUB_REPO` | Approvals lost on redeploy |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFY_EMAIL` | No notification of a new submission |

With **neither** git nor mail configured, a native subject refuses
contributions in production rather than accepting them into a store that the
next deploy wipes — `not_accepting_yet`, reported as `accepting: false` on
`/api/health`, and said plainly on the form. Either one is enough: git keeps
the entry, and the notification email carries the whole thing as a block the
dashboard can publish from. Outside production the guard is relaxed, or the
form could never be exercised locally.

Missing admin credentials disable the dashboard rather than stopping the
server, as the trackers did: a missing moderation secret should not take the
public maps down with it.

## Running it

    npm install
    npm run build     # geometry + page into public/  (first run downloads ~65 MB of sources)
    npm start         # http://localhost:3200

`npm run build` is only needed when the **shapes** or the page source change.
`public/geometry.json` is committed, so a deploy never rebuilds geometry and
the Docker image does not need the Natural Earth downloads.

- `GET /api/atlas` — merged, derived units for every live domain
- `GET /api/health` — per-domain entry counts, and which of admin / git / mail
  are configured
- `POST /api/:domain/submissions`, `POST /api/:domain/edit-requests` — stored
  here, for every domain
- `/api/admin/*` — native domains only, session-authenticated

## What is real

**336 units on each of the four maps, so 1,344 slots in total.** A slot is one
unit on one map. 1,087 of them carry a record with at least one documented field.

| map | units | with a record | field-slots filled |
| --- | --- | --- | --- |
| Majority language acquisition (`eal`) | 336 | 294 | 1,301 / 3,024 (43%) |
| Language disorder support (`dld`) | 336 | 267 | 1,129 / 4,368 (26%) |
| Foreign languages in school (`fl`) | 336 | 288 | 1,282 / 3,360 (38%) |
| Indigenous and regional languages (`indigenous`) | 336 | 238 | 238 / 3,360 (7%) |

The two numbers measure different things and both matter. "With a record" says
somebody has written *something* about that unit; "field-slots filled" says how
much of the record exists. The second is the honest one, and at 28% overall it
is the number the project is actually working on. The map shades by it.

The `indigenous` map is new and its 7% is real: 238 units carry one filled field
each, because that is exactly what migrated into it. See below for why it exists
and why it is named as it is.

By region, every unit outside Asia has a record on the three older maps: Africa
54/54, the Americas 99/99, Europe 49/49, Oceania 22/22. Asia is 112 units, of
which China's 31 provinces are untouched by deliberate choice.

**Coverage** is computed with the `hasContent()` / `NOT_DOCUMENTED_RE` pair. A
field beginning "Not established from the sources consulted…" counts as *looked,
found nothing* — never as coverage, and never as an unanswered question.

**Sub-national units** exist where a country's answer differs internally: 51 US
states and DC, 33 Indian states and union territories, 31 Chinese provinces, 13
Canadian provinces and territories, 8 Australian states and territories, the
four UK nations, Catalonia, the Belgian French Community, and Hong Kong. A unit
exists because it differs from its country *in some subject*, so on a map where
it has nothing of its own it inherits and is marked as inheriting.

**2,074 source links and 648 dated policy-history rows** sit behind those
entries.

## Why this map is called what it is

The `indigenous` map exists because the other three had nowhere honest to put a
language that is *from* the place the school stands in. That content lived in a
field called "Regional and minority languages" on the FOREIGN LANGUAGES map —
whose own blurb says it covers languages taught "besides the language of the
school". In Nunavut, Inuktut IS the language of the school.

The entries had started arguing with their own label. Two of them, verbatim from
the data before the split:

> Inuktut is an official language, not minority provision - do not read this as a minority field

> Wrong frame: these are official languages of the territory, not a minority provision

52 bullets in that field described a medium of instruction or an official
status. When contributors have to write warnings about the heading above them,
the heading is wrong.

### The name is a compromise, and the evidence says it has to be

There is no globally common policy term for these languages. That is not an
opinion; it was counted across the sources this atlas has retrieved:

| corpus | "minority language" | "indigenous language" | "mother tongue" | "national language" |
| --- | --- | --- | --- | --- |
| India | **973** | 0 | 284 | 3 |
| Canada | 65 | **606** | 8 | 93 |
| Africa (UNESCO PEER) | 3 | 14 | 29 | **93** |
| Latin America | 0 | **18** | 6 | 0 |
| US states | 6 | 3 | **15** | 15 |
| West Asia | 0 | 0 | **7** | 3 |

"Minority language" has the highest raw total across the whole corpus (2,130),
but it leads only because India's Commissioner for Linguistic **Minorities**
supplies 973 of the hits. Strip that one institution and it is a European and
South Asian term, carried by the Council of Europe's *Charter for Regional or
Minority Languages*. Canada's sources say Indigenous; Africa's say national
languages — for the same kind of language, and in Africa's case usually for the
majority one.

"Mother tongue" is the only term spread evenly across every corpus, and it is
the wrong concept here: a mother tongue is a property of the CHILD, and this map
asks about the languages of the PLACE. A Bradford pupil's mother tongue is Urdu,
which the majority-language map already answers.

So every available term of art is a regional loan. "Indigenous and regional
languages" was chosen because it is the phrasing most legible to the field this
atlas serves, in full knowledge that it will read as natural in Ottawa and
foreign in Dakar, where the same languages are the national ones. The map
carries a note saying so, and every entry records the word its own sources use
in the **Local term** field. The atlas names the category; the sources keep
theirs.

### Naming the languages, and linking them to WALS

Each entry names the languages it is about in a `languages` field — a typed
record, not prose — carrying the name, family, genus, ISO 639-3 code, basic
typology and WALS code. Classification and typology are read from the WALS CLDF
release (`cldf-datasets/wals`, CC BY 4.0) by `scratchpad/wals/wals.js`, never
typed from memory.

That tool exists because **a WALS URL must never be constructed from an ISO
code**, and the traps are not hypothetical. Every one of these was hit while
building it:

- **WALS codes are not ISO codes and they COLLIDE.** Maori is `mao` in WALS and
  `mri` in ISO 639-3 — and `mri` in WALS is **Moraori**, an unrelated Papuan
  language. Building a link from the ISO code sends the reader to the wrong
  language, with a working page and a plausible family. The resolver reports the
  collision instead of choosing.
- **Prefix matching swallows longer names.** An early version matched
  "Tamazight" to **Tama**, an Eastern Sudanic language of Chad, complete with a
  family, a word order and a live link. Only a WALS name that *extends* the
  query is now allowed, with a four-character floor.
- **Genus records use a different URL and 404 on the usual one.** IDs beginning
  `genus-` live at `/languoid/genus/<name>`, not `/languoid/lect/wals_code_<id>`.
- **WALS is variety-level.** There is no single record for "Inuktitut" (three),
  "Quechua" (many) or "Berber" (eight plus a genus). An entry must pick the
  variety its source names, or the genus, or nothing.
- **A NAME MISS IS NOT AN ABSENCE, and this bit me.** I recorded Scottish Gaelic
  and Tamazight as having no WALS record. Both are there: Scottish Gaelic as
  **"Gaelic (Scots)"** and Tamazight as **"Berber (Middle Atlas)"**, the latter
  carrying ISO `tzm`, which is Central Atlas Tamazight's own code. WALS names
  languages its own way, so a failed name lookup must be retried by ISO 639-3
  before anything is called absent. The tool now says so when a name misses.
  Where a language genuinely has no record it is still named, with no link, and
  **a missing link means WALS has no record, not that the language does not
  matter.**

### Naming a handful is not an inventory

A four-language list reads as a complete picture unless the reader is told
otherwise, so the `inventory` field carries the real number, counted from the
Glottolog CLDF release (`glottolog/glottolog-cldf`, CC BY 4.0) restricted to
`Level == "language"`:

| | languages Glottolog counts |
| --- | --- |
| Papua New Guinea | 899 |
| Indonesia | 756 |
| Nigeria | 589 |
| India | 518 |
| Australia | 401 |
| Mexico | 339 |

The `languages` field is what the SYSTEM engages with — names, teaches, teaches
in, or recognises. The gap between those two numbers is the most interesting
thing on this map, and it only exists as a fact once both are on the page.

`inventory` is filled for NATIONAL UNITS ONLY. Glottolog counts by country, so
attributing India's 518 to Kerala would be plainly wrong; the 143 sub-national
units are left empty rather than given a figure that is not theirs.

### What the map records

The distinctions are structural and quotable, which is what keeps the map
descriptive rather than evaluative:

- **taught in** — Inuktut, the NWT's eleven official languages, Bolivia's EIB
- **taught as a subject** — Louisiana French, Kokborok in Tripura
- **recognised without an entitlement** — South Dakota's O'ceti Sakowin is
  official in Title 1, not Title 13
- **taught *about*, not taught** — Wisconsin's Act 31; Maine's Native American
  studies requirement, which enumerates cultural systems and territories and
  contains no language clause
- **absent** — Gujarat's Bhili, 2.4 million speakers, in no provision table at all

There are no composite scores here, as everywhere else in this atlas. "Montana
requires American Indian studies of all pupils but has no Native-language
qualification" is a sourced fact; a score out of ten would be an argument.

## Pages

    /         home     name, tagline and the subjects, over a flat world
                       silhouette. No nav bar: the page is the choice, and
                       About sits with the other destinations rather than in
                       a corner.
    /eal      map      majority language acquisition
    /dld      map      language disorder support
    /fl       map      foreign languages in school
    /about    about    what this is and what it cannot do yet
    /submit   form     generated from the subject's field list
    /admin    review   native subjects only; noindex

One URL per map, so it can be linked and bookmarked; the page reads the domain
back off the path. On desktop every destination sits in the bar, with About at
the top right. Below 820 px the pills move into a hamburger menu — five pills
wrap the header onto a second row otherwise, and on a phone the bar has to stay
out of the map's way. Search stays in the bar at every width: it is the fastest
route to a country and does not belong behind a menu.

`public/shared.css` holds the palette, base type and the nav; `public/nav.js`
builds the pills from `/api/atlas`, so adding a domain to `src/domains.js` is
still the only edit needed. The bar shows only domains you can open; the menu
lists the planned ones too.

## Layout

    pages/              page sources -> public/ by assemble.js
    build-geometry.js   shapes -> public/geometry.json + world.svg  (build time)
    assemble.js         pages/*.html -> public/
    src/domains.js      the domain list and each one's fields
    src/derive.js       catalog entries -> map units
    src/history.js      policy history -> the document it names
    src/catalog.js      fetch or read, cache, fallbacks
    src/store.js        the atlas's own entries, one table for every subject
    src/gitStore.js     approved entries -> data/<domain>.json on GitHub
    src/subregions.js   country code -> UN-geoscheme subregion
    src/mailer.js       submission and correction notifications
    src/server.js       routes
    data/fl.seed.json   the fl entries (336 units, 290 with a record)
    check-palette.js    colour-vision check on the coverage ramp

## Contributing from the map

The ask sits at the end of the entry you are already reading, phrased by what
is there: **I know this** on a place with nothing recorded, **add what I know**
where something is, and a correction dialog only where there is something to
correct. Each links to `/submit` with the place already filled in.

The form is generated from the subject's field list — every field, its label
and its hint come from `src/domains.js`, and the array fields get the same
repeatable-row widget whatever their shape. Nothing on the page is written per
subject, which is what makes a new subject a description rather than a build.

Two attestations are required and are the whole basis for trusting an entry:
that it is accurate to the contributor's knowledge, and that they understand it
is reviewed first. Region and subregion are derived server-side from the country
code — a contributor should not have to know UN-geoscheme labels.

Corrections are **stored as well as emailed**. The trackers only emailed them,
so one arriving while mail was misconfigured was simply gone.

## Shading, hover, click

Shading answers one question: **how much of this place's record is filled in?**
A five-step ramp when something is documented, grey when nothing is, hatched
grey for "looked, found nothing". There is no field selector.

It used to answer only *is anything here at all*, with hue standing for the
world region. That made a country with one sourced sentence and a country with
eleven look identical, so the map could not show its own biggest weakness.

**Hover** lists every field with a filled or hollow marker, so you can see what
the entry has and what it is missing without opening it. **Click** opens the
whole entry: every field in order, documented ones in full text, the rest said
plainly, plus the evidence links, the cross-domain strip and the other units in
that country.

## The three fills

| Fill | Meaning |
| --- | --- |
| Coverage ramp, five steps | Documented — the step is the share of fields filled |
| Grey with diagonal hatching | Looked, found nothing |
| Flat grey | Nothing recorded |
| Ramp colour, dashed border | Nothing of its own — follows its country |

The ramp measures **what we know**, not how good the policy is. A pale country
may have an excellent system that nobody has written down here yet.

The step is computed per unit against its own domain, because domains have
different field counts (fl 11, dld 13, eal 9). Step 1 starts above zero: a unit
with nothing documented is `--nodata`, never the palest step.

### Why this palette, and what not to break

Two properties make it safe for colour-vision deficiency, and both are
load-bearing:

- **Hue runs teal to blue and never touches the red-green axis**, so protanopes
  and deuteranopes see the same progression as everyone else.
- **Lightness is monotonic across the five steps** — about 12-16 L\* apart. That
  is what carries the ramp for anyone who cannot separate the hues at all,
  including in monochromacy and on a photocopy.

Simulating dichromacy (Viénot, Brettel & Mollon 1999), the closest adjacent pair
is 12.2 ΔE, and every pair clears 12 on all of normal, protan, deutan and tritan
vision.

`--nodata` is part of this and was moved for it. It used to sit at almost
exactly the lightness of `--cov-1` and differ only in chroma — which is the one
thing colour deficiency removes. Simulated deuteranopia put "nothing recorded"
and "barely documented" **3.7 ΔE** apart, and those two mean opposite things.
The separation now runs through lightness instead, at 12.8 ΔE or better.

If you change any of these values, re-run the check before committing:

```bash
node check-palette.js
```

It parses the values out of `public/shared.css` rather than keeping its own
copy, so it cannot drift into checking a palette the site no longer uses. It
exits non-zero on failure.

## Markers for small units

Any unit whose largest on-screen dimension falls under 13 px gets a 9 px dot at
its centre — Northern Ireland is 4 px wide at fit zoom, which no finger can
hit. The dots hold a constant screen size, so they retire as soon as zooming
makes the real shape big enough to aim at: 110 are showing at fit zoom, 58 after
two zoom steps. Units with no polygon at all in the geometry keep theirs at
every zoom.

## In-text citations

`linkCitations()` and the `REFERENCES` DOI registry were lifted **verbatim**
from `dld-policy-tracker/public/catalog.html`. That tracker is retired, so this
is now the only copy and there is nothing left to keep in step with; `String.raw`
in there is load-bearing. A citation resolves first against the
entry's own `docLinks` labels, then against the registry; anything that resolves
to neither stays plain text. 161 citations link across the two corpora, 9 of
them from the registry.

For an inherited field the text belongs to the parent, so resolution runs
against the **parent's** `docLinks`. No parent in the current data cites
anything, so that path is exercised only by construction, not by real content.

## Policy history → the policy document

Each dated row in `policyHistory` is matched against the entry's own `docLinks`
and linked where a document can be identified. 74 of the 179 rows link — 16 of
DLD's 22 and 58 of EAL's 157. The rest stay plain text, because a guess is worse
than nothing here.

Shared words are scored by **rarity** across all 420 source labels in the
corpus, never counted — raw overlap rates "language" and "impairment" as highly
as "catalise". Whatever the score, the rarest shared term must be genuinely
rare, present in at most four of the 420 labels. That alone keeps Israel's
*1988 Special Education Law* off an unrelated Supreme Court case, which shares
only "special" and "education".

Evidence is then graded, and the weak grade is only ever a fallback:

- **Strong** — two or more shared terms, or one shared term whose year also
  agrees. England's 2017 CATALISE row matches on "catalise" alone and is right,
  because the source is dated 2017 too.
- **Weak** — a single shared term that is written as a name or acronym in
  *both* texts, with nothing corroborating it. The US 2004 row and *IDEA statute
  and regulations* share only "IDEA", and that is the right document. Israel's
  1988 row shares only the ordinary word "therapy" with an OECD autism report,
  and stays unlinked. Capitalisation has to hold in both texts, so a
  sentence-initial "Special" never passes as a name.

Weak matches are used only when a row has no strong one, so a well-evidenced
row is never padded with single-word associations — which is what stopped
England's 2018 Bercow row from also linking to a general RCSLT page.

A label naming a different year is rejected outright, whatever it scores. That
is what keeps the 2008 Bercow Review off *Bercow: Ten Years On (2018)* — two
documents a decade apart that share a name. The 2008 row links to nothing,
which is the right answer.

Rarity is measured as a **share** of the corpus and term weights are divided by
`log(N)`, so every threshold means the same thing whatever size the catalogs
grow to. Raw idf rises with N, which would have quietly loosened the matcher as
entries accumulate — a real risk now the data is live rather than snapshotted.
Verified identical on the current corpus (74 of 179 rows) and stable across a
simulated 40× one.

Term rarity is judged across **every** live domain at once, which is how the
thresholds were calibrated; scoring each domain against only its own labels
makes rare terms look commoner and silently drops correct matches.

The thresholds are named constants at the top of `src/history.js`, and the
linked/unlinked counts are logged at startup and exposed on `/api/health`, so
drift is observable rather than silent.

## Territories

A polygon that belongs to a country's geometry but is not what people mean by
that country's name is split out and labelled. French Guiana is the only such
case in this geometry: it now says *French Guiana*, notes that it is an overseas
department, and opens France's entry — the same inheritance rule the
sub-national units follow. The table in `build-geometry.js` takes more if others turn up.

## Sub-national units and inheritance

The country polygon is the parent; sub-unit polygons draw on top of it. Where a
country has no sub-unit for a region — Tasmania, say — the national fill shows
through, which is inheritance rendered literally.

A sub-unit exists because it differs from its country **in some domain**, not in
every domain. The five US states are split out because their EAL policy differs;
their DLD entries are empty stubs. So a sub-unit with nothing of its own does
not become a grey hole in a documented country — it takes the country's fill,
keeps a dashed hairline border so you can see it is still its own clickable
unit, and says so on hover. Its panel shows the country's text for every field
it has nothing of its own for, each marked *inherited from …*.

Two shapes this covers:

- **An entry exists but is empty** (California under DLD): the panel is
  California's, with all 13 fields inherited from United States.
- **No entry exists at all** (Catalonia under EAL): the shape stands in for
  Spain, and clicking it opens Spain's entry with a note saying why.

The tally counts each unit's **own** record only. Inherited fills add colour to
the map without adding research, so counting them would overstate coverage.

The UK is the exception and the interesting case: there is no UK-level entry in
any domain, so England, Scotland, Wales and Northern Ireland tile the whole
country and inherit nothing from each other. The tooltip and the panel both say
so. Once a national entry exists, the panel's *Others in …* section is where
"inherited from United Kingdom" rows would be marked.

Splitting is demand-driven: a country stays a single unit until an entry
documents a difference, and sub-national geometry is only loaded for the five
countries that need it.

## Rebuilding the geometry

`build-geometry.js` downloads its five sources into `sources/` on first run
(gitignored, ~65 MB) and reuses them after that. The steps are:

1. decodes `world-atlas` countries-110m and maps ISO-numeric → alpha-2;
2. clips rings that cross the antimeridian (without this, Fiji and Russia smear
   across the whole map);
3. dissolves Natural Earth 10m admin-1 districts into the four UK nations by
   `geonunit`, and Catalonia from its four provinces;
4. takes AU/CA/US states from Natural Earth 50m admin-1;
5. reads both seeds and computes per-unit and per-field coverage;
6. splits detached territories off their parent country;
7. emits an anchor point for every ISO country, so the page can place a marker
   for any code that turns up in the live data.

Antarctica is dropped. Coverage, field text and source links are **not** built
here — they are derived per request in `src/derive.js`.

## Mobile

The page carries a viewport meta tag; without one a phone lays it out at 980 CSS
pixels and scales the result down, so the `max-width: 820px` rules never fire at
all and everything reads tiny.

Below 820 px the info panel leaves the map and sits beneath it in normal flow,
so nothing floats over the map, and its fill rows wrap into a strip. The panel
takes whatever height the map does not need: a world map is about 2.3x as wide
as it is tall, so on a portrait screen the drawn map's size is fixed by the
screen width and any extra height would only become empty ground. `sizeMap()`
caps the map near its own proportions and the panel absorbs the rest. The
detail panel becomes a bottom sheet.

Two things the bottom sheet gets wrong if you are not careful. Its `74dvh` is
measured against the **viewport** while it is positioned inside the stage, so on
a short screen its top — and the close button with it — is pushed up under the
header, where `overflow: hidden` on the stage clips it; `max-height: 100%` caps
it to its container. And the info panel needs `min-height: 0` to shrink below
its content: without it a legend that does not fit spills past the clipped
stage instead of scrolling, and its last row is simply cut off. Below 740 px of
height the region key is dropped rather than half-shown.

On a coarse pointer the markers grow from 9 px to 14 px, and the size below
which a shape gets one rises from 13 px to 20 px, so more small units become
tappable. `.stage` is clipped, because the off-screen panel's transform
otherwise counts toward the scrollable area and the whole page scrolls.

## No glyph-dependent icons

List markers and similar ornaments are **drawn in CSS**, never taken from a
font. Two failure modes make a character a bad choice for a UI mark: a text
face may simply not carry it, and a codepoint written as an escape can be
mangled on the way into the file. The source-link marker was hit by the second
— `97` for an arrow became a literal U+0011 control character, which
browsers render as a box with a cross.

If you add an ornament, draw it with borders or an inline SVG. Every non-ASCII
character the page renders (`—`, `·`, `×`, `−`, `…`, `’`) has been checked
against the font stack and resolves to a real glyph.

## Known gaps

- **Marker crowding.** 110 markers show at fit zoom, and in western Europe they
  sit close together. A tile-grid inset for the dense regions would beat dots
  if the map ever needs to be read at a glance rather than explored.
- **Belgium** has one entry, the French Community, flagged sub-national with no
  national sibling, so it currently fills the whole country.
- **Disputed borders.** The geometry is Natural Earth's, which takes positions
  on Western Sahara, Kosovo, Crimea and Taiwan. `HK` and `PS` appear as their
  own units because both trackers already carried them.
- **No history.** `policyHistory` is in the data and rendered in full, but there
  is no dated-version model behind any other field yet.
- **China's 31 provinces are untouched**, by choice rather than oversight. They
  are 93 of the remaining slots and would roughly double the sub-national unit
  count with entries likely thinner than the national ones. The decision to do
  them has not been taken.
- **India's disorder map is national, not per-state.** No state-level source
  exists: the RPwD Act 2016 defines "speech and language disability" once and
  narrowly, and the Rehabilitation Council of India publishes a single national
  count of registered therapists with no state breakdown. RCI does publish a
  32-row state table, but it counts approved TRAINING INSTITUTIONS across every
  disability specialism, so using it as a therapist count would have made
  Rajasthan's 196 institutions read as a workforce. The 33 state entries carry
  the two language maps only.
- **Some fields are thin because the thing rarely exists**, and some because
  nobody has looked, and the map cannot yet tell you which. `dischargeCriteria`
  and `identifiedPrevalence` sit near 3%; most systems genuinely have no such
  rule, but only 44 of 7,400 empty slots say so with the "Not established"
  sentinel. Closing that gap is real work, not tidying.
- **Higher education is its own map now, and it is nearly empty** (22 of 353).
  It began as one field on `fl`, and splitting it out was not tidying: read
  side by side, those 28 entries were answering six different questions —
  Egypt and Morocco the language a degree is *taught in*, the United States how
  many institutions offer one, Belarus whether every student must take one,
  Guyana who trains the school system's teachers. The comparative sources the
  school maps lean on are about schools and say almost nothing about
  degree-level provision, so this map has to be built from national and
  institutional sources rather than harvested from the existing ones.
- **Uptake and newcomer-proportion are Europe-and-Americas fields.**
  `fl.uptake` is 0 of 54 in Africa and 0 of 112 in Asia; `eal.newcomerProportion`
  is 0 of 54 and 3 of 112. That is not neglect — no comparative instrument
  publishes those figures for those regions, and inventing a denominator would
  be worse than leaving them empty.
- **Merged records are not editable as a whole.** The dashboard edits one
  contribution at a time; a place built from several is only assembled at read
  time. Editing the stub of a place a submission has since filled looks like it
  does nothing.
- **No composite scores**, by design.
