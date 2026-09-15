---
name: coding-pass
description: Turn a language-atlas field's prose into the controlled-vocabulary columns defined in src/coding.js, then write them with research/tools/apply-coding.js and report the distribution. Use this for ANY part of that work, not only a full pass — dumping a field's prose to read, checking whether a scheme's row grain fits what storage can hold, coding or re-coding a subset of countries, running apply-coding.js, verifying a write moved no sourced claim, or reading how a coded column came out. It applies just as much when the request is a QUESTION about the process as an instruction to run it ("row is one instrument per the scheme, is that going to be a problem?"), and when a field is named with no mention of coding at all ("let's do newcomerCriteria next", "the dld map is all paragraphs, I need something I can count", "/patterns still says nothing is coded yet", "redo rule_locus for the EU countries").
---

# Running a coding pass

A coding is what a reader made of a field's prose, recorded as values from a
fixed list. It lives in `entry.coding[field]`, beside the prose and never inside
it, so it can be revised, argued with or thrown away without a single sourced
claim moving. The prose is the record; this is a reading of it.

That separation is the whole design, and it sets the standard for the work:
**a coding pass must leave every field exactly as it found it.** Step 6 proves
that rather than assuming it.

## 1. Check the row grain before reading a single entry

Open `src/coding.js` and find the scheme. Every one declares what a row IS:

```js
'dld.legalEntitlement': { row: 'one legal instrument named by the entry', ... }
```

Storage holds **one coding object per unit per field**. `store.js` rejects an
array at the field level outright, and `apply-coding.js` merges a single flat
row. So a scheme whose row is *one system* fits; a scheme whose row is *one
instrument* or *one test* does not, because a country naming a constitution and
a Children's Act has two rows and nowhere to put the second.

If the grain does not fit, stop and say so. Do not code the "main" instrument
and drop the rest — discarding is precisely what the vocabularies were revised
to prevent, and a distribution built that way is worse than none. Quantify it
instead: read a stratified sample and report what share of entries name more
than one, so the grain question gets decided on evidence.

Fields safe to code today are the four whose row is one system:
`dld.identificationCriteria`, `dld.dischargeCriteria`, `eal.newcomerCriteria`,
`eal.removalCriteria`. `dld.legalEntitlement` and `dld.assessments` are the two
instrument-grained ones, and they are blocked until storage can hold rows.

## 2. Read the vocabulary, including the glosses

Each value carries the entries that forced it to exist. Those glosses are
**precedent, not decoration**: when `BILINGUAL_HANDLING` glosses `required
across languages` with Sweden, Sweden is coded that way, and a later coder
disagreeing is disagreeing with the corpus rather than making a fresh call.
Following the glosses is what makes two passes comparable.

Note which columns are lists. The comments say so and say why — `exclusions`,
`triggers`, `language_domains`, `exit_mechanism` and `discharge_basis` all hold
several values because systems really do run several rules at once. The rest
take one value.

Nothing here is scored. `obliges` is ordinal because the thing it measures is
ordinal; turning that into a number to average across countries is a separate
decision, and this pass does not make it.

## 3. Dump the prose and read it in batches

```bash
node research/tools/coding-dump.js <domain> <field> --from 0 --count 32
```

National only by default; `--all` where sub-national rows carry prose of their
own. Entries holding `Not established` or `Not applicable` are skipped — both
are somebody's deliberate answer, and neither is a text a coding can describe.

Thirty or so at a time is about what can be held in mind at once. Going faster
produces codings that drift toward whatever the last twenty entries looked like.

## 4. Code, and leave a cell unset when nothing fits

Build a JSON file keyed `CC|Unit Name`, one object per field:

```json
{
  "SE|Sweden": {
    "identificationCriteria": {
      "threshold_basis": "clinical diagnosis",
      "bilingual_handling": "required across languages",
      "decider": "clinician",
      "exclusions": ["none stated"],
      "rule_locus": "national statute"
    }
  }
}
```

Three rules do most of the work:

**Code from this field's text alone.** A coding describes a particular text. If
`identificationCriteria` does not name a decider, `decider` is `not stated` even
when `legalEntitlement` two fields over names a commission. Reaching across
fields makes the column mean something different on every entry.

**`not stated` and UNSET are different findings, and both differ from a forced
value.** `not stated` says the entry was read and does not answer. Leaving the
cell out says the entry *does* answer and the vocabulary has no honest value for
the answer — a system whose ground is a listed impairment category with no
decision process is neither `clinical diagnosis` (which asserts a clinician
nobody named) nor `not stated` (which is false). Reaching for the nearest value
to avoid an empty cell is the one move that corrupts a distribution silently,
because the result looks complete.

**Collect the misfits as you go.** A pile of them is an argument about the
vocabulary, and that is usually worth more than the pass itself. Note the field,
the entry, and what the entry actually says that no value carries.

## 5. Dry run, and read the refusals

```bash
node research/tools/apply-coding.js <domain> <coding.json>
```

Every value is checked against the vocabulary, and anything off the list is
refused loudly, named, without stopping the run. **Zero refusals is the target,
and a pile of them is information rather than an error log.** If thirty entries
will not fit, the list is wrong and should be argued with — see the
`derive-vocabulary` skill — before anything more is coded against it.

Read the two quieter reports too: `no entry for:` means a unit key did not match
(accents are folded, so a real mismatch is a real error), and `field has no text
to code` means a coding was written for an entry with nothing in it.

## 6. Write, then prove you touched nothing else

```bash
node research/tools/apply-coding.js <domain> <coding.json> --write
node research/tools/coding-verify.js <domain> coding
```

The applier rewrites the whole file, so its git diff cannot tell you whether a
sourced claim moved. `coding-verify.js` parses both sides and compares entry by
entry against HEAD, reporting any key you did not name as intended. If it
reports anything beyond `coding`, the move is `git checkout` on the data file
and finding out why — not reading the diff.

## 7. Report the distribution

```bash
node research/tools/coding-distribute.js <domain> <field>
```

This prints what `/patterns` will print, with the same reading rules: a list
column counted once per value, numeric and free-text columns left out, and the
UNSET count shown per column so the vocabulary gaps sit next to the result.

Then write up, in this order, because the second half is usually worth more than
the first:

- **What the distribution says.** Lead with the column that surprised you. A
  column sitting at 95% one value is either a finding about the corpus or a
  signal that the column does no discriminating work, and which one it is
  matters.
- **Where the vocabulary failed.** Each gap: how many entries, which ones, and
  what they say that no value carries. Name the fix you would make without
  making it — the vocabulary is the maintainer's call.
- **What it changes about what to do next.** A coded field usually reshuffles
  the research priorities that produced it.

Commit the data file and the coding JSON together. CLAUDE.md asks for no
per-time confirmation on commits, but say plainly what was written and what was
left unset, since an unset cell is a decision a later reader has to be able to
find.
