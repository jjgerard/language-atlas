# Who pays for children's services in Northern Ireland: plan

Aim: show how much of the cost of children's services is carried by the voluntary,
community and social enterprise sector (VCSE) compared with government, and in time
what that is worth to government (social return on investment). Written 2026-10-02.

## Two different questions, kept apart

1. **Cost share (accounting).** In a year, for a service area, how much was spent on
   delivering it, and who paid: government, or the VCSE's own resources
   (donations, trusts, lottery, trading, reserves)? This can be built from published
   accounts and can be accurate.
2. **Value to government (modelled).** What would government have had to spend
   without the VCSE, and what costs does VCSE work avoid later? This always rests on
   assumptions: a counterfactual, unit costs, deadweight, attribution. It can be
   sourced and shown as ranges, never as a single fact. It is a separate layer, built
   only on top of (1).

The page must never merge them. A cost-share figure is a measurement; a saving is an
estimate.

## The trap: counting the same pound twice

Government money flows into the VCSE. The Education Authority's youth budget
includes the grants it pays to voluntary youth organisations, and those same
pounds are income in the organisations' accounts. Add "government youth spend" to
"VCSE youth income" and the grants are counted twice. Every £ must be recorded
once, at its **source**, with a **flow** to whoever delivers.

So the unit is a ledger of flows, not two lists of budgets.

## Data model: three tables

**A. `ni-flows.json`: one row per movement of money**
- Fields: `year`, `payer`, `payerKind`, `recipient`, `recipientKind`, `amount`, `unit`,
  `kind` (outturn | award | plan), `mechanism` (grant | contract | core | unclear),
  `programme`, `services[]` (the 18 codes), `source {url, page, label}`, `check`.
- `payerKind` values:
  - NI department or arm's-length body
  - council
  - UK government
  - Irish government
  - intergovernmental (PEACEPLUS, IFI)
  - lottery distributor
  - charitable trust or foundation
  - public donations
  - trading or fees
  - VCSE reserves
  - not named
- Sources:
  - the 978 government lines already read from 197 VCSE accounts
  - the grant lists (EA youth grants, PHA contracts, DoH core grant, PEACEPLUS, T:BUC)
  - the grants-payable notes in public bodies' own accounts

**B. `ni-delivery.json`: one row per deliverer × service × year**
- Fields: what was spent delivering that service where it is published, and activity
  where it is published (children or families served, places, hours).
- Statutory side: trust service lines (Department of Health costing returns),
  Youth Justice Agency, Children's Court Guardian Agency, EA lines.
- VCSE side: the SORP "analysis of charitable activities" and restricted-fund
  notes, which many charity accounts carry project by project.

**C. `ni-entities.json`: one record per payer or deliverer**
- Body ids and org ids, plus every funder string normalised to one entity
  ("SPPG", "DHSS&PS Childcare Unit", "Department of Health (SPPG)" → `doh`).
  237 distinct strings today.

Derived, never stored:
- **Government-delivered spend** = a body's spend on a service − its flows out to
  VCSE for that service.
- **VCSE-carried spend** = VCSE delivery spend on a service − government flows into
  it for that service. This is the same as its non-government funding for that
  service, when the accounts break income down by project.

## What we have and what is missing

| Need | Have | Missing |
|---|---|---|
| Government spend by service | Trust directorate lines 2019-26; trust service lines 2022-25; YJA, NICCY, Children's Court Guardian Agency; EA youth and directorate lines | Service split for most other bodies; councils publish no children's line |
| Government → VCSE flows | 978 lines from VCSE accounts (2024-25 mostly); EA, PHA, DoH, PEACEPLUS grant lists | Funder normalisation; public bodies' own grants-payable totals to reconcile against |
| VCSE income by source | 190 accounts break income down by funder | 49 profiles with no funding block; 9 UK-wide charities with no NI figures; 59 with no public accounts |
| VCSE spend on children specifically | 151 organisations are children-focused (all their spend counts) | 133 "children among others" need their own activity split from SORP notes, or a 0–100% bound |
| Activity (children served) | Scattered in reports | Not collected anywhere yet: needed for unit costs |
| Volunteer time | Register gives volunteer counts | Hours and a valuation method (modelled layer) |
| Statutory unit costs | DoH costing returns (NI, 2022-25) | Services outside health; PSSRU Unit Costs (UK) as a fallback, labelled |

## Phases

1. **Funder registry and flows ledger for 2024-25.** Normalise the 237 funder
   strings. Turn the 978 lines and the grant lists into flows. Accurate, and doable
   now. First output: for each service area, government money flowing into the VCSE.
2. **Reconcile against the payers.** Take each public body's grants-to-VCSE total
   from its own accounts (EA "Youth Service grants", DoH core grant, PHA VCS
   contracts) and compare it with the sum seen from the recipients' side. A gap
   either way is a finding: money not traced, or recipients not on our list.
3. **Children's share for mixed organisations.** For the 133 "children among
   others", read the SORP activity analysis and restricted funds. Where nothing
   splits it out, carry the organisation as a range (0 to its whole spend), never a
   guess.
4. **First cost-share view.** For each service area: government-delivered,
   VCSE-delivered with government money, and VCSE-delivered with its own money.
   Ranges where phase 3 left ranges. This answers the first question.
5. **Activity and unit costs.** Children or families served, per service, both
   sides, from the same reports. Unit cost = spend ÷ activity, only where both are
   published for the same year and scope.
6. **Volunteer time (modelled).** Volunteers × hours (NICVA's workforce and volunteer
   survey for average hours) × a valuation (replacement cost at the NI median wage,
   from ASHE). Shown separately, never added into the cash cost share.
7. **Value to government (modelled).** Two distinct measures:
   - **Cost displaced**: VCSE-own money spent on services government has a statutory
     duty to provide (child protection, children in care, SEN, youth justice). The
     duty list per service area comes from the statutes already cited for the public
     bodies.
   - **Cost avoided**: prevention, such as early intervention reducing entry to care.
     Only from published evaluations with NI or UK unit costs, as ranges.
8. **SROI case studies, not a sector multiplier.** Pick 3–5 programmes with existing
   evaluations (candidates: Family Support Hubs, the Early Intervention Support
   Service, Sure Start, youth conferencing, Parentline). Follow the Social Value UK
   principles: stakeholders, outcomes, financial proxies, deadweight, attribution,
   displacement, drop-off. A sector-wide "£X saved for every £1" cannot be built
   accurately from this data and should not be published.

## Decisions needed before phase 1

1. **Baseline year: 2024-25.** Most accounts are for that year. Charities' year-ends
   vary: count a year ending 1 April to 31 March of the following year as 2024-25.
2. **What counts as government.**
   - Recommended: NI departments, arm's-length bodies, councils and UK government
     are government.
   - Report separately:
     - lottery distributors (public bodies, but not taxpayers' money)
     - Irish government
     - intergovernmental (PEACEPLUS, IFI)
3. **Volunteer valuation.** Replacement cost is the usual SROI method. Decide at
   phase 6, not now.
4. **"Saving" for non-statutory services.** Youth work and play are not statutory
   duties, so VCSE spend there does not displace a statutory cost. Count it as cost
   carried, not as a saving to government.

## Hard limits

- **UK-wide charities** (Barnardo's, NSPCC, Action for Children) publish no NI
  totals. Only their NI public funders are known. An NI figure would have to come
  from them directly.
- **59 clubs and companies with no public accounts.** Only their public grants are
  known (a floor).
- **Children's share for mixed organisations** without an activity split stays a
  range.
- **The counterfactual is never observed.** Every saving is a model.
