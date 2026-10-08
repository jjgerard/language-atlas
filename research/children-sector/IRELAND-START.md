# Starting brief: Ireland children's sector (repeat of the NI build)

Paste or attach this at the start of the new chat. It tells the next session what
was built for Northern Ireland, the rules that held it together, the decisions
already made, and where Ireland differs. Written 2026-10-08 from the NI session.

---

## 1. What we are building

A **community-sector map** in the language-atlas app: units × fields, organised
**by sector**, filled **unit by unit**. Northern Ireland's children's sector is done
and live at https://language-atlas.fly.dev/sector/ni-children (not linked from the
site nav). Ireland (the Republic) is the next unit, same sector.

The end goal is the same as for NI, in this order:

1. **Government side**: every public body with a children's or family function,
   what services it provides, and its budget (current and previous years).
2. **Voluntary side**: every VCSE organisation in the children's sector, profiled,
   placed on a zoomable map with clickable registered charities.
3. **Cost share**: how much of the cost of children's services the VCSE carries
   compared with government. Accurate numbers everywhere.
4. **SROI**: social return on investment, only as far as published evidence allows.
5. **Publish** the page, with plain-language key takeaways that a reader can check.

## 2. Rules (from CLAUDE.md and the user's rulings; carry over unchanged)

- **No content from inference.** Every claim traces to a source on the same record.
  A stub beats a plausible guess.
- **A citation with no match stays plain text.** Never invent a link or a DOI.
- **Keep the hedges.** Never tighten a sentence by removing a qualifier.
- **NO FOI material at all.** No new FOI requests, and also no published FOI
  responses or disclosure logs. (User's ruling for NI. Assume it holds for Ireland
  unless the user says otherwise.)
- **Figures as printed.** Keep outturn, plan/estimate and award figures apart.
  Never sum figures from different layers.
- **Commits, pushes and deploys need no confirmation.** Pushing to `main` deploys to
  Fly. Flag destructive operations first.

## 3. Method decisions already agreed for NI (reuse)

- **Flows ledger: each pound recorded once, at its source.** Pass-through money
  (a funder → intermediary → small groups) is counted once, at the intermediary.
  Without this, grants double-count.
- **Payer kinds** used in NI: ni-gov, council, uk-gov, other-gov, irish-gov,
  intergovernmental, north-south, lottery-dormant, multiple, not-named. Ireland will
  need its own list (e.g. national department, State agency, local authority, EU,
  philanthropy/Dormant Accounts, north-south).
- **Cost share is reported in separate layers (A–D) and never added up.**
- **Mixed organisations** (children plus adults): the children's share is a
  floor-to-ceiling range, not a point figure. In NI it was unmeasurable from
  accounts (range £6.0m–£447m; only 4 of 131 split it). Never present mixed-org
  money as children's money.
- **Children-only programmes** measured from the payer side; never add them to
  recipient lines that already contain them.
- **SROI is desk-based and indicative** (Social Value UK principles). Break-even
  uses only published cost, reach and official unit costs. Deadweight, attribution
  and displacement are low/central/high parameters. WELLBY = £13,000 (HACT) in NI;
  Ireland will need a euro value with its own source. **No sector-wide multiplier.**
- **Key takeaways are generated from the data**, each with a "Check this" panel
  (figures, arithmetic, source links). The build asserts claims that must stay true
  (e.g. it throws if any programme gains a comparison-group evaluation).

## 4. What NI found (so Ireland can be compared like for like)

- 144 public bodies in the NIAO universe → 60 checked → 43 with children's
  functions, 97 service codes. About 1,325 budget figures.
- Health trusts don't publish Programme of Care spend, but **do** publish a
  children's directorate line. (I once wrongly said they publish nothing.)
- Health publishes **no total for VCSE funding**: trusts lump voluntary and private.
- £37.0m government money went to 81 children-focused organisations in 2024-25.
  £143.4m went to mixed organisations, mostly for adult services.
- The NICS Government Funding Database showed our list saw ~70% of
  children-labelled VCSE awards (~£26m of ~£36m). It added 528 missing recipients.
  The list reached 884 organisations, 521 of them profiled.
- "Steps in for missing statutory services" was **rare**: 16 of 307 profiles,
  mostly weak evidence. That is a finding, not a gap to fill.
- **SROI:** no published NI children's SROI with a documented method exists. No
  programme has a post-2019 comparison-group evaluation. So only break-even was
  computed: Sure Start pays back if it keeps ~95 children a year out of residential
  care. Plus one indicative VOYPIC ratio (£0.02–£1.48 per £1).
- The **Indecon Ireland youth work study (2.22:1)** was cited in NI only as a
  comparator not to transfer. In the Ireland build it is a home study: check its
  method properly.

## 5. Where Ireland differs (leads to verify, not facts)

These are starting points from general knowledge. Each needs checking against its
own source before anything is written.

- **Department:** the children's department was renamed in 2025. Confirm the
  current name and remit, and which functions moved to other departments.
- **Main State bodies:**
  - **Tusla**, the Child and Family Agency. Section 56 funding to community and
    voluntary organisations is the likely main flow; check whether the annual
    report or financial statements list recipients.
  - **HSE.** Section 38 and Section 39 funded agencies. Check for published lists.
  - **Pobal**, which administers early learning and childcare schemes and
    community programmes for government.
  - **Oberstown** (youth detention), the Ombudsman for Children, the Adoption
    Authority, and others to find from a full list of State bodies.
- **Budgets:** the Revised Estimates Volume and the Appropriation Accounts. These
  are estimate versus outturn, so keep them apart. The **C&AG** is the audit
  equivalent of the NIAO.
- **Local layer:** 31 local authorities across 26 counties. Children and Young
  People's Services Committees (CYPSCs) are the county-level planning structure.
  For the map, decide whether the unit is county, local authority or Tusla area.
- **Voluntary register:** the Charities Regulator's public register (check whether
  it is downloadable). Benefacts closed in 2022, so there is no ready-made
  financial dataset. Also check CRO for companies.
- **Grants transparency:** NI's Government Funding Database has no known Irish
  equivalent. Search for published grant recipient lists per scheme (youth funding
  schemes, Tusla, Pobal, Dormant Accounts) before concluding.
- **Cross-border:** north-south bodies and PEACEPLUS already appear in the NI
  ledger. Don't count the same money twice across the two units.
- **Currency:** euro. Never mix £ and € in one figure. Convert only for comparison,
  and name the rate and its source.
- **Unit costs** for break-even need an Irish source (e.g. residential care cost
  per child from Tusla or C&AG), not the DoH NI figures.

## 6. Repo and tooling (where things live)

Repo: `language-atlas`. Express app; `pages/*.html` are built into `public/` by
`node assemble.js`. Sector page: `pages/sector.html`; route in `src/server.js`
(~line 423) serves `/sector/<id>` from `public/sector/<id>.json`.

NI research files are in `research/children-sector/`. Use them as templates,
renamed to `ie-*`:

| Stage | NI files |
|---|---|
| Bodies | ni-bodies-universe.json, ni-bodies.json, ni-bodies-coding.json |
| Budgets | ni-budgets.json |
| VCSE list and profiles | ni-vcs-orgs.json, ni-vcs-profiles.json, ni-vcs-parents.json, ni-uk-charities.json, ni-vcs-register.json |
| Geography | ni-geo.json, ni-postcodes.json, ni-register-addresses.json |
| Money | ni-entities.json, ni-flows.json, ni-payer-totals.json, ni-reconciliation.json, ni-cost-share.json, ni-children-share.json |
| Payer register | ni-gfd.json, ni-gfd-analysis.json |
| SROI | ni-sroi-existing.json, ni-sroi-outcomes.json, ni-sroi-proxies.json, ni-volunteer-params.json, ni-sroi.json |
| Plans | COST-SHARE-PLAN.md, SROI-METHOD.md |

Build tools in `research/tools/`, in run order:
`merge-vcs-profiles.js` (3 args) → `build-flows.js` → `build-cost-share.js` →
`analyse-gfd.js` → `build-sroi.js` → `build-sector-ni.js` → `node assemble.js`.
These are NI-specific (`ni-` filenames, payer kinds, GFD). For Ireland, either
generalise them to take a unit id or copy to `*-ie.js`. Generalising is better if
Scotland and Wales follow.

## 7. Traps that cost time in NI

- **Shell heredocs and `node -e` strip regex backslashes.** Edit regex-bearing
  code with the Edit tool only.
- **Duplicate organisations** under different names (Barnardo's, NSPCC, Action
  for Children and more). Dedupe early; match by evidence signature, never by
  name or registration number alone, or IDs collide.
- **Pass-through false matches** ("via Clear" matched a nursery chain). Keys must
  be at least 6 characters, and private or out-of-scope organisations are excluded
  as targets.
- **Name matching** needs prefix and word-set rules for branches and word order
  ("YMCA Lisburn" / "Lisburn YMCA").
- **Coverage measured against a list built from the same register** looks complete
  by construction. Measure against the list as it stood before.
- **Private providers and out-of-scope organisations** need explicit flags
  (privateProvider / outOfScope), not deletion.
- **Usage limits** interrupt long profiling agents. Write results to disk per batch
  so they can resume.
- **Screenshots time out** when the app window is behind another. Fall back to page
  text and computed styles.

## 8. Suggested first message for the new chat

> Read research/children-sector/IRELAND-START.md. Repeat the NI children's-sector
> build for Ireland, starting with the list of public bodies, as we did for NI.
> Same rules, no FOIs.
