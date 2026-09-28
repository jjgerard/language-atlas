# Documented absences from the indigenous sentinel block

One section per unit-field. Each is a case where the source does not merely fail
to record a programme — it records that the thing the field asks about does not
exist in the territory. A different tool writes the flag.

Quotes below were checked with `terr-verify.js`'s own fetcher and PDF extractor,
not by eye: the url returns 200 and `quoteOn` finds the run.

---

## LI Liechtenstein — `revitalisation`

**Field question:** what is being done to reverse language shift · who runs it ·
since when · whether it is funded, and by whom.

**Why this is an absence and not a gap.** The state itself has declared, twice
and in treaty instruments, that the category the field asks about has no members
in its territory. That is not silence in a source; it is Liechtenstein answering
the question. German is the only state language, and no regional or minority
language holds official status (Eurydice Key Data 2023 Figure A1, already a
docLink on this entry). The existing sentinel is correct that the ACFC Opinion
"describes no language revitalisation or language-promotion measure" — the point
is that it also says why there is none to describe.

**Source:** Advisory Committee on the Framework Convention for the Protection of
National Minorities, *Fifth Opinion on Liechtenstein*, adopted 1 February 2021
(ACFC/OP/V(2021)001).

**URL:** https://rm.coe.int/5th-op-liechtenstein-en/1680a15dfc

**Quote (para. 13, Scope of application, Article 3):**

> Liechtenstein declared that no national minorities in the sense of the Framework Convention exist in its territory

**Second quote (footnote 6 to the same paragraph), which extends it from
minorities to languages:**

> Liechtenstein has made a similar declaration when ratifying the European Charter for Regional or Minority Languages

**A third, which is the hedge that must survive.** The Advisory Committee does
not endorse the declaration as a finding of fact; it records that nobody has
come forward. Keep this qualifier on any prose written from the flag — the
absence is *declared by the state and unchallenged*, not independently
established:

> While not being aware of any persons or groups who expressed interest in the protection of the Framework Convention

**Fetch note:** `rm.coe.int` returns **403** to a bare `curl`. It returns 200 to
a browser user-agent, which is what `terr-verify.js` sends, so the gate will
pass this url; a hand-check with plain `curl -L` will not.

---

## Nothing else in this block met the bar

Three candidates were considered and rejected, and the reasons are worth
recording so the next pass does not re-open them:

- **BB Barbados `revitalisation`, GD Grenada `revitalisation`.** Both sentinels
  record a *term-level* read of the Education Act with nothing found. That is a
  close, and the triage already used Barbados's as a cross-reference. But an
  absence established by reading a statute end to end and finding nothing has no
  verbatim quote to hang the flag on — there is no sentence saying the thing
  does not exist. Left as sentinels rather than invented a quote for.

- **BH Bahrain, KW Kuwait `revitalisation`.** The sources on these entries
  establish only that Arabic is the sole language of instruction. That is not
  the same claim as "the territory has no indigenous or regional language
  distinct from the official one", and I found no source making the stronger
  one. **Oman is a positive counter-example within the same group:** its own
  PIRLS 2021 chapter names Swahili, Baluchi, Lawati and Jabali as spoken in the
  country, so "the Gulf has no subject here" is false as a general move and
  should not be applied to Bahrain or Kuwait by analogy.

- **CU Cuba `mediumOfInstruction`.** Cuba plausibly has no surviving indigenous
  language, but nothing I fetched says so, and PEER publishes no Inclusion
  chapter for Cuba against which it could be checked. Asserting it would be
  exactly the inference the content rules forbid.
