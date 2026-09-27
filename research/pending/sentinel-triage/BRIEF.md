# Triaging 142 third-state sentinels

Opened 2026-09-27. `research/GAP-PLAN.md` calls this the highest-leverage
single action in the atlas, and it is **reading, not research**. Nobody is
asked to fetch a policy document here.

## Why

The map key's "Looked, not found yet" row holds 142 entries across 21 fields.
They are not one thing, and today proved it on three of them:

- **North Korea** listed PEER read in full, the 2016 Constitution, UIS and
  UNESDOC — and was still a gap, because nobody had read the education law.
  Both laws were then read and it is now a CLOSE.
- **Angola** named its own deferral, a *diploma próprio* the law does not name.
  A sweep of 7,286 gazette entries proved nothing fills it. Also a CLOSE.
- **Mauritius** named PEER and the Institute of Education. The Education Act
  was unread, and reading it FILLED the field.

**A sentinel that names every route it tried is a close. A sentinel that names
only comparative sources is a gap with an obvious target.** Telling those
apart costs one read per entry and decides whether the next twenty-five agent
runs are worth spending.

## What to do

For every sentinel you are given, read its text and put it in exactly one
bucket. **Judge only what the sentinel itself says.** Do not fetch anything,
do not look the country up, do not reason from what you happen to know about
the place.

    A  CLOSED        It names a PRIMARY national instrument (a statute,
                     decree, regulation, ministerial order, constitution) and
                     says that instrument was read and does not answer. Nothing
                     more to do. Quote the phrase that establishes it.
    B  TARGET        It names only comparative or secondary sources — UNESCO
                     PEER, Eurydice, OECD/PISA, a UNICEF or World Bank study, a
                     journal article, a ministry WEBSITE rather than an
                     instrument. The primary law is unread. **Name the specific
                     document that should be read next**, if the sentinel gives
                     you enough to name one.
    C  BLOCKED       It names a HOST FAILURE — a 403, a timeout, a dead link,
                     a PDF that would not extract. The source exists and could
                     not be reached. Say which host.
    D  THIN          It is too short or too vague to place. These are worth
                     knowing about separately: a sentinel that does not say
                     what it searched cannot be trusted either way.

## Output

`triage-<domain>.json`, one object keyed `domain.field` → `CC|Unit`:

    { "dld.identificationCriteria": {
        "AL|Albania": { "bucket": "B",
                        "why": "cites only the PEER profile and a Eurydice page",
                        "next": "Ligj 69/2012 chapter on special education" },
        "KP|North Korea": { "bucket": "A",
                        "why": "names the 1999 Education Law as read in full" } } }

`why` is one clause, quoting or closely paraphrasing the sentinel. `next` only
for bucket B, and only where the sentinel names enough to identify a document
— **leave it out rather than guessing a plausible-sounding law**.

## Rules

- **Do not fetch anything.** This is a read of text already in the repo.
- Do not write to `data/*.json`, do not run any applier, do not touch git.
- Report the bucket counts. The counts are the deliverable, not the prose.
