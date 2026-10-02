# SROI for Northern Ireland children's services: method

Written 2026-10-02, before any ratio was calculated. It follows the Social Value
UK principles as far as a desk study can, and says plainly where it cannot.

## What this is, and is not

- **A desk-based, indicative SROI**: secondary data only, per programme, for 2024-25.
- **It is not an assured SROI.** The first principle, involving stakeholders, needs
  interviews with children, families and staff to establish what changed for them.
  A desk study cannot do that. It uses outcomes that published evaluations have
  already measured or reported.
- **One ratio per programme, never a sector-wide figure.** Programmes differ in what
  they change, so a single "£X per £1" for the sector would not mean anything.
- **Existing published SROIs are reported as they stand**, attributed to their
  authors, and never re-computed or merged with our own.

## The calculation, per programme

1. **Inputs (£).** The programme's 2024-25 cost, from the cost-share data: a payer's
   programme total or the deliverer's restricted fund. Include the value of
   volunteer time only as a separately shown variant.
2. **Outputs.** Children or families reached in the same year, from the activity
   data. The inputs and the outputs must have the same scope.
3. **Outcomes.** What changed, and for what share of those reached. Only from a
   published evaluation, outcome report card or official statistic, quoted with its
   source. An outcome nobody has measured is listed as "not valued", not estimated.
4. **Financial proxies.** One published unit cost or value per outcome:
   - NI first (DoH reference costs, DoJ, DE), then UK (PSSRU, the GMCA Unit Cost
     Database, HACT wellbeing values), with geography and price year stated;
   - a fiscal cost (public money avoided) is kept apart from a wellbeing value;
   - the ratio is reported both ways: fiscal only, and fiscal plus wellbeing.
5. **Adjustments**, each a stated parameter with low, central and high values:
   - **Deadweight:** what would have happened anyway. Taken from a comparison group in
     the evaluation where there is one; otherwise a stated assumption, with the
     range shown.
   - **Attribution:** the share of the change due to this programme rather than
     others.
   - **Displacement:** whether the outcome merely moved elsewhere. Usually low for
     children's outcomes; stated.
   - **Drop-off:** how fast the benefit fades in later years.
   - **Duration:** the years counted. Short by default: one year unless an
     evaluation shows persistence.
6. **Discounting:** HM Treasury Green Book rate, 3.5% a year, for any benefit beyond
   year one.
7. **Ratio** = present value of adjusted outcomes ÷ inputs, as low / central / high.
   The low case uses every adjustment's least favourable value at once, so it is a
   genuine floor for the stated outcomes.

## Rules

- Every number is either sourced (URL and page) or a named parameter in the
  sensitivity table. Nothing is hidden inside a calculation.
- If inputs and outputs do not share a scope (a whole organisation's spend against
  one service's reach), that programme is not computed.
- A prevention outcome (for example a child not entering care) is valued only where
  the evaluation measures the avoided event, or a comparison group gives its rate.
  It is never valued from what such programmes are generally thought to prevent.
- The page shows the full working for each programme. The ratio is the last line,
  never the headline on its own.

## Results (2026-10-02, `ni-sroi.json`, on the page)

1. **Existing studies.**
   - No published SROI of an NI children's or family service with a documented
     method was found.
   - NI has two economic studies: the EIF cost of late intervention (£536m a year,
     2018) and the Roots of Empathy cost-utility trial (£9,571 per QALY, gain not
     significant).
   - It has one SROI ratio in a press release only: YZone, £3.26 per £1.
   - Comparators from England and Ireland are listed as comparators.
2. **Break-even, from published figures only:**
   - **Sure Start:** £947 per registered child. It pays back its cost if it keeps
     about 95 children a year out of residential care, out of 35,571 registered.
   - **Family Support Hubs:** £373 per family referred, about 8.6 child-years of
     residential care.
   - **VOYPIC:** £1,555 per child, 3.4 child-years.
   - **The King's Trust NI:** £328 per young person, 12.3 child-years.
3. **One indicative ratio, VOYPIC:** £1 : £0.02 (low), £0.25 (central),
   £1.48 (high).
   - It rests on one self-reported wellbeing item and three assumed parameters
     (size of gain, deadweight, attribution).
   - It is a statement about how little of the outcome the published evidence
     captures, not about VOYPIC's value.
4. **Not computed:**
   - **Youth justice:** disposals cannot be compared.
   - **Sure Start ratio:** no comparison group and no unit value for a language gain.
   - **Hubs and Parentline:** no outcome measure.
   - **EISS:** its comparison-group evaluation found no robust effect.

**What would make a real SROI possible:** for one or two programmes, outcomes measured
with a comparison group. Children's care entry, school readiness and reoffending
already have NI unit costs, so measuring those outcomes would allow them to be valued.
