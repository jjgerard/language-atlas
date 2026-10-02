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

## Decisions (agreed 2026-10-02: all four as recommended)

- **Baseline year 2024-25.** A charity's financial year is assigned to the government
  year (April–March) it overlaps most. Years ending 31 March 2025, 31 December 2024
  and 31 August 2025 all count as 2024-25.
- **Government** = NI departments, arm's-length bodies, councils, UK government.
  Reported separately:
  - lottery and dormant-accounts distributors (public, but not taxation)
  - Irish government
  - intergovernmental (PEACEPLUS, IFI)
- **Volunteer time** valued at replacement cost (applied at phase 6).
- **Non-statutory services** (youth work, play, good relations): VCSE spending there
  is cost carried, not a saving to government.

## Decisions as first proposed

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

## Phase 1 results (2026-10-02)

Built by `research/tools/build-flows.js`, into `ni-entities.json` and `ni-flows.json`.

**Funders.** The 237 funder strings resolve to 64 entities, with one left over.
Each entity has a kind:
- NI government
- council
- UK government
- other government
- Irish government
- intergovernmental
- North/South body
- lottery or dormant accounts
- multiple
- not named

**Ledger.** 977 income lines from VCSE accounts and 242 grant-list awards. Awards
are a separate kind and never summed with income. 880 income lines fall in
2024-25, and 20 of those have no usable amount, so they are kept but left out of
totals.

**Pass-through: 19 lines counted once, at the intermediary.** These are lines
received through another listed organisation: PEACEPLUS lead partners passing to
partners, and Early Years, which administers the whole Pathway Fund. Without this,
those pounds would sit in both organisations' income.

**Headline, government money only (NI departments, arm's-length bodies, councils,
UK government), 2024-25:**
- **£37.0m to the 81 organisations whose own documents say children are their
  whole purpose.** This counts as children's money as it stands.
  - Largest payers: DE £7.0m, EA £6.0m, DoH/SPPG £5.8m, NIHE £3.9m,
    Belfast Trust £2.8m.
- **£143.4m to 84 organisations that serve children among others.** This is
  dominated by adult services: Inspire, Praxis Care, the Simon Community. It is
  NOT children's money until phase 3 finds each organisation's children's share.

**Not yet usable:**
- £12.0m on lines whose funder the accounts do not name.
- £5.6m on lines that combine several funders.
- 94 lines from 2025-26 accounts. Each organisation's latest accounts were read,
  so for these organisations the 2024-25 year has not been read.

**Seen only from this side:** councils pay £3.0m across 90 organisations, although
no council publishes a children's line.

## Phase 2 results (2026-10-02)

**Method.** 55 payer-side figures were collected from public bodies' own 2024-25
documents (`ni-payer-totals.json`). Each was compared with the recipient side by
`research/tools/reconcile-payers.js`, into `ni-reconciliation.json`.
- A programme figure is compared only with the recipients' lines for that programme.
- Because most recipients' accounts name the payer but not the programme, the
  recipient side is a range: lines labelled with the programme (floor) up to
  everything from that payer (ceiling).
- 24 bodies publish no usable figure, recorded as such.

### 1. Health publishes nothing it can be checked against
- No health body states what it pays the voluntary sector.
- The five trusts give only "purchase of care from non-HSC bodies": about £1.3bn,
  voluntary and private together. South Eastern says its share is mainly private
  companies.
- Western's £1.3m "grants to voluntary organisations" is the only voluntary line.
- The PHA's section on its voluntary-sector contracts has no money in it.
- The DoH accounts have no voluntary line at all. Its £1.8m Core Grant is a press
  release figure.

So for health, the only measure is the recipients' own accounts (the trusts and PHA
seen paying £70m into listed organisations). That is a floor whose distance from the
truth cannot be known from published sources. Closing it needs an Assembly Question
or FOI asking each trust and the PHA for payments to voluntary organisations, split
by programme of care.

### 2. Where a payer does publish, the list sees between a third and a half of its money
| Payer figure, 2024-25 | Payer says | Our list sees |
|---|---|---|
| VSS Victims Support Programme grants (outturn) | £11.66m | £5.30m (45%) |
| CRC grants payable (outturn) | £2.03m | £0.60m (30%) |
| Belfast City Council Community Support Programme (award) | £3.28m | £1.86m (57%) |
| NIHE Supporting People paid to providers (outturn) | £81.18m | £22.7–28.6m (28–35%) |

NIHE says 68.6% of Supporting People goes to charity or voluntary providers, about
£55.7m. Against that share, our list sees 41–51% of the voluntary part. The rest is
expected: VSS, CRC and Supporting People fund adult services too.

### 3. Children-only programmes are better measured from the payer's side
- **Programmes:** EA Youth Service grants £15.7m (outturn), EA Pre-School Education
  Programme grants £18.8m (outturn), Sure Start £33.7m (DE chart value, flagged),
  Pathway Fund £4.4m (award), T:BUC camps about £1.5m (plan, ages 9–25).
- **Why the list cannot measure them:** recipients' accounts mostly say only
  "Education Authority", so the youth grants can only be bounded at £0.07–9.6m. And
  the hundreds of voluntary playgroups the Pre-School grants pay are mostly not on
  the list.
- **Consequence for phase 4:** these programmes' own totals are the government→VCSE
  measure, not the sum of recipients.
- **Two cautions:**
  - Sure Start lead bodies include trusts as well as voluntary organisations, and no
    document gives the split.
  - Part of the Pre-School Education Programme goes to private providers.

### 4. Recipients reporting MORE than the payer is a scope mismatch, not money
- Western's £1.3m grants line, against £10.0m seen: trust money reaches the voluntary
  sector mostly as purchase of care, not as grants.
- T:BUC: £0.49–4.8m seen against a £1.5m plan.
- These are kept and flagged, never netted off.

### 5. Most councils publish no grants total
- **Total in the accounts:** Causeway Coast and Glens, £1.6m to 219 groups.
- **Award list only:** Belfast's Community Support Programme, £3.3m to 135 named groups.
- **Narrative figure only:** Lisburn and Castlereagh.
- The rest report only grants to bodies where councillors or officers have an
  interest.

### What phase 4 takes from this
- **Children-only programmes:** use the payer's total.
- **Children-focused organisations:** use the recipient side (phase 1).
- **Mixed organisations:** wait for phase 3.
- **Health:** the recipient side as a stated floor, until the trusts and PHA are
  asked directly.
- **Never add a payer total to recipient lines it already contains.** The EA youth
  grants are inside both.

## Phases 3–6 results (2026-10-02)

### Phase 3: children's share of mixed organisations (`ni-children-share.json`)
- **Only 4 of 131 publish a children's split:** Ashton, Arc Healthy Living Centre,
  NIACRO and Springboard. 50 publish some children's lines; 77 publish none.
- **For the 121 with readable totals, children's spending ranges from £6.0m to
  £447m.** The floor is lines the accounts label as children's; the ceiling is the
  whole NI spend.
- **That range cannot be narrowed from published accounts.** Restricted funds are
  usually listed by funder, not project. The largest organisations split only by
  division (Inspire, Praxis, Cedar).
- **Totals from UK-wide or all-island bodies are not used as NI ceilings**
  (Mencap, Sense, Methodist Church in Ireland).

### Pre-school (`ni-preschool-sample.json`)
- **The register's "Playgroup/after schools" tick is unreliable.** In a seeded
  sample of 30 charities ticking it, 10 run one. None of those under £10k do; all
  of those in the £50–100k band do.
- **No accounts line names the Pre-School Education Programme.** The money appears
  as "Education Authority", or still "WELB", a board abolished in 2015.
- **So pre-school is measured from the payer's total.** The sample is not scaled up.

### Phase 4: who pays, 2024-25 (`ni-cost-share.json`, on the page)

Four layers, never added together. A includes payments to the voluntary sector that
health does not publish separately.

- **A. Government delivering services itself:**
  - trust children's directorates £96–132m each
  - YJA £15.7m
  - Children's Court Guardian Agency £5.2m
  - NICCY £1.9m
- **B. Government money through the voluntary sector.** Its three parts do not
  overlap:
  - **B1 children-only programmes, payer's own total:** EA youth grants £15.7m,
    pre-school £18.8m, Sure Start £33.7m, Pathway £4.4m, T:BUC £1.5m.
  - **B2 other government money to children-focused organisations:** £25.4m from
    payers other than those in B1.
  - **B3 government money that mixed organisations' accounts tie to children's
    work:** a £7.9m floor, of which £6.9m is youth programmes running past 18.
- **C. The VCSE's own money.** For 78 children-focused organisations with a funder
  breakdown, income is £54.2m:
  - government £25.5m
  - other public £3.1m
  - unattributed £5.5m
  - **not public £20.1m (37%)**
- **D. Volunteer time:** a modelled floor of £9.5m. This is 13,751 volunteers in 88
  children-focused organisations, at ≥3.79 hours per four weeks, at £13.99 an hour.

### Phase 5: activity (`ni-activity-statutory.json`, `ni-activity-vcse.json`)
- **Statutory side: 242 figures**, per trust where published.
- **VCSE side: only about 15 of the 44 largest children's organisations publish a
  single reach count.** Unit costs are possible only for those, plus the statutory
  services. Not yet computed.

### Phase 6: volunteer inputs (`ni-volunteer-params.json`)
- Hours are published only in bands, and only for all volunteers, formal and
  informal together. So the value is a floor, with no upper bound.

## Hard limits

- **UK-wide charities** (Barnardo's, NSPCC, Action for Children) publish no NI
  totals. Only their NI public funders are known. An NI figure would have to come
  from them directly.
- **59 clubs and companies with no public accounts.** Only their public grants are
  known (a floor).
- **Children's share for mixed organisations** without an activity split stays a
  range.
- **The counterfactual is never observed.** Every saving is a model.
