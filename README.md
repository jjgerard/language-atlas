# Language Atlas

One world map over several domains of language policy, shaded by what is
documented. Hover a country for what its entry has and hasn't; click for the
whole entry.

Tabs are written for a reader with no linguistics background — "Majority
language acquisition" rather than EAL, "Language disorder support" rather than
DLD — with the technical term named once in the blurb so it stays findable.
The `id`s in the data remain `eal` and `dld`.

## It owns no data

The atlas is a reader of the two existing trackers, not a replacement store:

    eal-policy-tracker.fly.dev ─┐
                                ├─► /api/atlas ─► the map
    dld-policy-tracker.fly.dev ─┘
                                ◄─ /api/:domain/submissions
                                ◄─ /api/:domain/edit-requests

`src/catalog.js` fetches each tracker's `/api/catalog` **server-side**, every
five minutes, and derives the map from what comes back — so an entry approved
in a tracker's own admin dashboard appears here without a rebuild. Submissions
and edit requests are forwarded back to whichever tracker owns that domain.

Server-side is not an implementation detail: **neither tracker sends CORS
headers**, so a browser on this origin cannot call them directly. Doing the
fetch here is what lets the atlas read live data without changing either
tracker repo, and it keeps moderation where it already is.

Only `submissions` and `edit-requests` are forwardable. Nothing under
`/api/admin` is proxied, so this cannot be used to reach a moderation route.

If a tracker is unreachable the last good copy is served, and the page says so
rather than presenting stale policy data as current. `npm run snapshot` writes
a cold-start fallback to `data/snapshot.json` (gitignored — shipping a stale
copy risks serving it unnoticed).

## Running it

    npm install
    npm run build     # geometry + page into public/  (first run downloads ~65 MB of sources)
    npm start         # http://localhost:3200

`npm run build` is only needed when the **shapes** or the page source change.
`public/geometry.json` is committed, so a deploy never rebuilds geometry and
the Docker image does not need the Natural Earth downloads.

- `GET /api/atlas` — merged, derived units for every live domain
- `GET /api/health` — per-source state (`live` / `stale` / `snapshot`) and counts

## What is real

- **All 213 majority-language (EAL) units and 216 language-disorder (DLD)
  units**, read live from the two deployed trackers.
- **Coverage** is computed with the same rule the catalogues use — the
  `hasContent()` / `NOT_DOCUMENTED_RE` pair. A field beginning "Not established
  from the sources consulted…" counts as *looked, found nothing*, never as
  coverage.
- **Sub-national units** for the five countries that have them: England,
  Scotland, Wales and Northern Ireland; five Australian states; six Canadian
  provinces; five US states; Catalonia.

## Pages

    /         home     pick a subject, over a flat world silhouette
    /eal      map      majority language acquisition
    /dld      map      language disorder support
    /about    about    what this is and what it cannot do yet

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
    src/domains.js      the domain list; each live one names its tracker
    src/derive.js       catalog entries -> map units
    src/history.js      policy history -> the document it names
    src/catalog.js      fetch, cache, fallbacks
    src/server.js       routes

## Shading, hover, click

Shading answers one question: **is anything documented here?** Region hue when
yes, grey when no, hatched grey for "looked, found nothing". There is no field
selector — hue is the world region so neighbours stay apart, and it carries no
judgement about the policy.

**Hover** lists every field with a filled or hollow marker, so you can see what
the entry has and what it is missing without opening it. **Click** opens the
whole entry: every field in order, documented ones in full text, the rest said
plainly, plus the evidence links, the cross-domain strip and the other units in
that country.

## The three fills

| Fill | Meaning |
| --- | --- |
| Region hue, full saturation | Documented |
| Grey with diagonal hatching | Looked, found nothing |
| Flat grey | Nothing recorded |
| Country's hue, dashed border | Nothing of its own — follows its country |

Hue is the **world region**, not a score — it exists so neighbouring countries
stay distinguishable, and it carries no judgement about the policy. Saturation
is the only channel carrying information about coverage.

## Markers for small units

Any unit whose largest on-screen dimension falls under 13 px gets a 9 px dot at
its centre — Northern Ireland is 4 px wide at fit zoom, which no finger can
hit. The dots hold a constant screen size, so they retire as soon as zooming
makes the real shape big enough to aim at: 110 are showing at fit zoom, 58 after
two zoom steps. Units with no polygon at all in the geometry keep theirs at
every zoom.

## In-text citations

`linkCitations()` and the `REFERENCES` DOI registry are lifted **verbatim** from
`dld-policy-tracker/public/catalog.html`, so the two stay in step — a change to
the registry there needs copying here. A citation resolves first against the
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
either tracker, so England, Scotland, Wales and Northern Ireland tile the whole
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
  own units because both trackers already carry them.
- **No history.** `policyHistory` is in the data and rendered in full, but there
  is no dated-version model behind any other field yet.
- **No composite scores**, by design.
