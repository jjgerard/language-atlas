# Brief: checking Irish public bodies for a children's function

Part of the Republic-of-Ireland repeat of the NI children's-sector build. Universe:
`ie-bodies-universe.json` (CSO Register of Public Sector Bodies 2024). NI template for shape and
style: `ni-bodies.json` (look at 3-4 entries first).

## What you do, per body in your batch
Read the body's OWN documents (website remit/"about" page, annual report, the Act that set it up) and
decide a verdict. A sponsor department or C&AG/Oireachtas report may be used only if the body's own
documents cannot be reached, and the entry must say so in `notes`.

verdict:
- `core`  children/young people are the body's whole or primary remit
- `part`  one or more stated children's functions among others
- `none`  remit read, no child-specific function found (say in `notes` what you read)
- `unverified`  no source reached (say what you tried)

roles (any of): delivers, funds, commissions, coordinates, regulates, inspects, advises, advocates, pays.
`via: "schools"` if the body reaches children only through the school system.

## Rules (non-negotiable)
- **Nothing from memory or inference.** Every function you record needs a verbatim `quote`
  (max 25 words, copied exactly from the page, no ellipsis-joining of separate sentences) and the
  `url` you read it at. If you cannot quote it, you cannot record it. A stub beats a plausible guess.
- **No FOI material**: no FOI requests, no FOI responses, no disclosure logs, as a source.
- Use the live page URL you actually fetched. If a page only came through a search snippet and you
  did not open it, do not quote from it.
- If WebFetch summarises rather than returning text, set `"paraphrased": true` on that function and
  do not put the text in quote marks in `what`; still give the closest wording you saw.
- Amounts: only if the source states it, as printed, with year and url, in `money` (euro as printed;
  distinguish estimate / outturn / allocation in `what`). Do not search for budgets beyond what you
  meet; a later stage does that. Do not add or convert anything.
- Keep hedges: never drop a qualifier from a quoted sentence.
- Note any 2025 reorganisation that moved the body or function between departments, with the url.

## Output
Write ONE file per batch to disk as you finish bodies (so a usage limit does not lose work):
`research/children-sector/ie-bodies-batch-<X>.json` with
`{ "batch": "<X>", "checked": "2026-10-08", "bodies": [ ... ], "openQuestions": [ ... ] }`.
Each body:
```
{ "id": "kebab-case", "name": "...", "universeName": "exact name in the universe file or null",
  "sponsor": "department as in the universe", "currentSponsor": "if different after 2025 or null",
  "kind": "Department|ALB|Local authority|Hosted structure|Other",
  "verdict": "...", "roles": [], "via": null,
  "functions": [ { "what": "...", "quote": "...", "url": "..." } ],
  "statute": "Act name and year, only if a page you read names it", "accounts": "url of annual report/accounts page or null",
  "money": [ { "what": "", "value": "", "year": "", "url": "" } ],
  "notes": "what was read, what was unreachable, anything odd" }
```
Final reply to me: one line per body (id, verdict), plus openQuestions (decisions for the user, e.g.
a body whose children function is arguable). Do not paste the files back.
