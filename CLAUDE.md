# Working in this repo

## Content rules

These carry over from the two tracker repos and now apply here directly,
because this app holds entries of its own.

- **Do not generate policy content for a place from inference.** A stub is more
  honest than a plausible guess, and every claim in a worked entry must trace to
  a `docLinks` entry on that same entry. This is why the maps launch as stubs
  and fill in from sources, rather than from plausible-sounding paragraphs.
- **Assessment instruments may be named and linked, never reproduced.** No
  norms, items, scoring tables or cut-off values from commercial batteries.
- **A citation with no match stays plain text.** Never invent a DOI to make one
  link. Same for the policy-history matcher: an unlinked row is the right
  answer when the document cannot be identified.
- **Keep the hedges.** Survey-derived prose that says respondents described *one
  child of their own choosing* keeps that qualifier. Never edit it out to
  tighten a sentence.
- `linkCitations()` and the `REFERENCES` registry in `pages/map.html` came
  verbatim from `dld-policy-tracker/public/catalog.html`. That tracker is
  retired, so this is the only copy now — there is nothing to port changes to.
  `String.raw` in there is load-bearing; do not rewrite it.

## Adding a domain

`src/domains.js` is the only file that should need editing. A domain declares
its fields as `[key, label, type, hint]`, and that list drives the coverage
count, the hover checklist, the entry panel, the submission form and the
sanitiser together. A native domain needs a `data/<id>.seed.json` — generate it
from the unit list the other domains already use, so a country split for one
question is split for all of them.

`indigenous` was added this way and is the worked example: one entry in
`src/domains.js` plus a `data/indigenous.json` built from the same 336 units,
and the map, submission form, nav, coverage counts and hover checklist all
followed with no other edit. It also carries a `note`, rendered under the map's
blurb, for a domain whose own NAME needs explaining to a reader.

## Deploys

Pushing to `main` deploys to Fly via GitHub Actions. Commits, pushes and
deploys need no per-time confirmation. Destructive operations — force-push,
`git reset --hard`, deleting the Fly app or its machines, dropping data — get
flagged before acting.

`data/<domain>.json` is written by the running app, not by hand: it is the
committed snapshot of approved entries, and editing it locally will be
overwritten by the next approval.
