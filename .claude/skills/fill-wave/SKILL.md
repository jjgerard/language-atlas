---
name: fill-wave
description: Run a research wave that fills blank fields on the language-atlas maps — choosing the gap with gaps.js, building a worklist, drafting bullets under the content rules, gating every quote against the live source with terr-verify.js, and applying what passes. Use this whenever the work involves filling in entries, researching countries or regions, adding content to a map, closing coverage gaps, running a fill or a harvest, drafting bullets for a field, or verifying drafted entries before they land — including phrasings like "complete the entries for Asia", "we need dischargeCriteria filled", "research these countries" or "what's still empty".
---

# Running a fill wave

A fill wave takes a field that is blank on many units and fills it from
documents somebody read. It is the slowest work in the project and the easiest
to do badly, because a plausible paragraph and a sourced one look identical
once they are in the entry.

The pipeline exists to make that difference recoverable. Everything below is
built around one idea: **a claim that cannot be traced to a URL retrieved in
session does not go in.**

## The content rules, which are not negotiable

From CLAUDE.md and `research/README.md`, and they bind drafters absolutely:

- **Never generate policy content for a place from inference.** A stub is more
  honest than a plausible guess. Every claim must trace to a `docLinks` entry on
  that same entry.
- **Assessment instruments may be named and linked, never reproduced.** No
  norms, items, scoring tables or cut-off values from commercial batteries. That
  an instrument *has* local norms is a fact about availability and is fine; what
  those norms *are* is not recordable, here or anywhere.
- **A citation with no match stays plain text.** Never invent a DOI to make a
  link resolve.
- **Keep the hedges.** Survey-derived prose saying respondents described *one
  child of their own choosing* keeps that qualifier. Tightening a sentence is
  not a reason to drop it.
- **Where a researcher looked and found nothing, that is a finding.** It is
  written as `Not established from the sources consulted.` — the exact phrase,
  because the applier refuses anything else — and it is the difference between a
  gap in the record and a gap in the world.

## 1. Choose the gap on evidence

```bash
node research/tools/gaps.js                      # every map, by region
node research/tools/gaps.js dld dischargeCriteria
node research/tools/progress.js                  # fill and depth, separately
```

`gaps.js` counts the not-established sentinel and the not-applicable marker as
filled, because both are deliberate answers and a fill wave should not be sent
to find them again. `progress.js` separates FILL from DEPTH, which move
independently — a map can be 70% filled with every entry answering a different
subset of its four questions.

Prefer a wave that is **one field across many units** over one that is many
fields on one unit. The same instrument usually answers the same question in
forty countries, and a reader comparing two entries needs the same question
answered in both.

## 2. Build the worklist

```bash
node research/tools/build-fill-wl.js <domain> <outdir> <batches> <field,...> [Region,...] [--national]
```

The worklist hands each drafter the blank field plus **the entry's existing
context and its docLinks**. That context is not decoration: every fill pass this
project has run went faster when the drafter started from the entry's own
sources, because the instrument answering one question usually answers the next
one a few paragraphs on. It also stops a drafter contradicting or restating what
the entry already says, which is the commonest way a fill makes an entry worse.

## 3. Draft to the field's four questions

Every text field declares four questions in `src/domains.js`, in the order they
must be answered, separated by `·` in the hint. They are a drafting discipline,
not labels — the bullet carries the content only, never the name of the slot.

Two rules make the convention work, and both matter more than they look:

- **Order the questions as declared**, so a thin entry carries the same first
  two points as every other thin entry instead of two arbitrary ones.
- **Omit a question you cannot answer.** Never pad, never write a placeholder.
  Four blank slots and four missing ones look identical to a reader, and only
  one of them is honest.

Cite inside the bullet, in a terse parenthesis. The budget is unforgiving — the
guard refuses a bullet over **96 characters** — so keep the parenthesis short:

```
"trouble du langage (TL)" used throughout (COST IS1406 survey translation)
```

A qualifier that would mislead if dropped belongs inside the bullet it
qualifies. Only a whole-field qualifier takes a fifth line, at the top, since a
reader of a list may not reach the bottom of it.

**Tag the slots while drafting.** `entry.slots` is one integer per bullet, in
bullet order, non-decreasing — `{ newcomerCriteria: [1, 3, 4] }`. It costs one
number from somebody who composed the bullet slot by slot anyway, and recovering
it later means re-reading the prose. Two maps are under 15% tagged precisely
because this was skipped.

Each drafted bullet needs an `evidence` entry: the URL, and the verbatim quote
from it that supports the bullet. The gate reads those and nothing else.

## 4. Park drafts before gating

Working files belong in the session scratchpad, but a wave of fifty verified
units is too much to leave on a temp directory that Windows may clean and that a
new session cannot find again. Park those in `research/pending/<wave-name>/`
with a README saying what the wave was, what is done, what remains, and how to
resume. Everything there is committed, so it survives the machine. It is a
staging area and not an archive — delete the subdirectory once the work is
applied, because the record of what was done lives in the entries and in git.

## 5. Gate every quote against the live source

```bash
node research/tools/terr-verify.js <specDir>
```

This fetches each evidence URL and looks for the quote on the page. **A bullet
whose quote is not on the page it cites is dropped, and so is a bullet with no
evidence entry at all.** Nothing is taken on the drafter's word.

The match is loose about whitespace, case, quotation marks and accents, because
extracted PDF and HTML text mangles all four, and strict about words. It can
still be fooled by a page that merely discusses the same subject, so treat it as
a floor and not a proof — a surviving bullet is one that could be checked, not
one that is certainly right.

Expect losses, and do not treat them as failure. A wave that gates at 100% is
more likely to have a lax spec than perfect drafters.

## 6. Apply what passed

```bash
node research/tools/w4apply.js <prefix>            # dry run
node research/tools/w4apply.js <prefix> --write
```

The writer refuses to overwrite a field that already has text. These runs add to
stubs, and silently replacing existing research is the accident that cost a day
when a generator flattened Ireland's upper-secondary entry. It also refuses the
whole run if any entry breaks a rule, rather than writing the good half.

Typed fields — `series`, `history`, `languages`, `offering`, `programme` — are
derived from the domain declarations, not from a hardcoded list, so a field that
becomes typed later is still caught. Bullets joined into a string and written
into a typed field is a real failure that has happened.

Then confirm the run did what it said:

```bash
node research/tools/coding-verify.js <domain> <field> [field ...]
```

Name the fields the wave was supposed to fill. Anything else it reports is
something the applier did that nobody asked for.

## 7. Report what was found AND what was not

The wave's output is not only the filled fields. Worth saying explicitly:

- how many units gated through, and how many bullets were dropped and why;
- which units were searched and came back empty, so the next wave is not sent
  to find the same nothing — `research/SEARCHED-EMPTY.json` holds these;
- any bullet that answered a question the field does not ask. That is evidence
  about the FIELD rather than about the entry, and it belongs in
  `research/FIELD-QUESTIONS.md`. Changing a field's questions changes the hover
  checklist, the entry panel, the submission form and the coverage count
  together, so it is the maintainer's call and not a drafter's.

A field nobody fills, whose content keeps turning up in its neighbours, is the
signature of a question asked in the wrong place — and noticing that is worth
more than the units the wave filled.
