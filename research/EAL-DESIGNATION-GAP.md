# 28 eal systems carry triggers with no designation

`newcomerCriteria` holds two coded columns that have to agree. `designation`
says what form the category takes; `triggers` says what puts a pupil in it. A
system with triggers and no designation is asserting a way into a category it
does not record having.

There are 28. None carry an absence flag. They are not one problem, and the
first reading of them — that they are all availability rules filed under
classification — is wrong. They split three ways, and only the third group is
what that description fits.

## Group A: 'linguistic minority', and the question this document exists for

Nineteen Indian states carry the identical four bullets:

> Category is 'linguistic minority': mother tongue differs from the State's
> principal language
> Mother tongue is the language declared by the parent or guardian
> Threshold: 40 pupils of that tongue in a school, or 10 in a class, gets one
> teacher
> At secondary, one-third of a school's pupils may request mother-tongue
> instruction

Andhra Pradesh, Assam, Bihar, Dadra and Nagar Haveli and Daman and Diu, Goa,
Himachal Pradesh, Jammu and Kashmir, Jharkhand, Madhya Pradesh, Maharashtra,
Meghalaya, Nagaland, Odisha, Puducherry, Punjab, Rajasthan, Sikkim,
Uttarakhand, West Bengal.

A pupil-level category plainly exists here, it is named, and it has a
definition attached. On the face of it `designation` should read
`named category` and the gap is a missing value.

**But 'linguistic minority' is a domestic-minority category, not a newcomer
one.** It catches a child whose mother tongue differs from the state language
whether that child arrived last year or has never left the district.
`DESIGNATION_FORMS` glosses its values with newcomer labels throughout — France
EANA, Austria ausserordentlicher Schueler, Denmark tosprogede boern. A coder
who left `designation` unset may have been doing exactly what the coding-pass
skill asks: leaving a cell out because the entry answers and no value on the
list is honest about the answer.

Which reading is right decides two different things:

- **If 'linguistic minority' counts for this field**, `designation` becomes
  `named category` on all nineteen, `home language` stays as a trigger, and
  only `demand threshold` comes off — see Group C.
- **If it does not count**, these entries are describing a category the field
  does not ask about. `triggers` should come off too, and the field takes an
  absence flag: no newcomer designation exists.

This is not a question the corpus can settle, because the entries are accurate
either way. It is a scope decision about what `eal` means where the additional
language is a domestic one rather than a migrant one, and it reaches well past
these nineteen.

### What the sources say, which settles more of this than the prose does

Three checks, all against the corpus rather than against background knowledge:

**All 34 Indian eal units share docLinks with their own indigenous entry** —
34 of 34, in most cases every link. The recurring source is the Commissioner
for Linguistic Minorities reports. The two domains are reading the same
documents.

**The indigenous India entry already carries the instrument.** Its
`mediumOfInstruction` reads: "Art 350A: states to provide facilities for
instruction in the mother tongue / That duty runs at the primary stage only,
and to linguistic minority groups."

**There is almost no immigrant content.** Across all 34 Indian eal units, one
substantive mention of migration: a CBSE circular of 18-09-2014 affecting
children of migrant parents, and those are internal migrants. A grep that
appears to find more is matching `stubNote` boilerplate.

So `linguistic minority` is not the eal category recorded elsewhere on this
map, and it is not simply an indigenous category either — it covers internal
migrants and tribal groups alike, and excludes foreign arrivals. Moving it
wholesale to `indigenous` would be wrong for the same reason it sits awkwardly
here: it is broader than either domain.

This supports the second reading above. The coder did not miss a `designation`
value; they found no newcomer category because these documents are not about
newcomers. The nineteen entries are a re-reading of the indigenous sources into
a field that asks a different question. The minimal fix is to the coding rather
than to the prose, which is honest about what exists.

## Group B: no pupil-level category, said outright

Five entries state that no designation exists, in their own words.

- **Chhattisgarh** — "Linguistic-minority status attaches to institutions, not
  to individual pupils"
- **Chandigarh** — "No newcomer or additional-language designation in either
  instrument"
- **Delhi** — same, alongside Language Preference Registers kept by DoE, NDMC
  and the three municipal corporations
- **Haryana** — "No newcomer or additional-language designation beyond that
  opt-in register", the register being an opt-in for Urdu or Punjabi as an
  additional language
- **Manipur** — Language Preference Registers "yet to be successfully
  maintained" statewide

Chhattisgarh, Chandigarh and Delhi are absences: checked, and there is no
category. Haryana is arguably `functional` — opting into the register IS the
criterion — and Manipur is a gap in implementation rather than a statement of
policy, which points at `not stated` rather than at an absence.

## Group C: availability rules, filed under classification

Three national systems carry `demand threshold` and nothing else, and all three
say the quiet part in the entry:

- **Malaysia** — "No pupil-level category: the trigger is a parental request,
  not a child's language". Chinese or Tamil must be taught if the parents of
  fifteen pupils request it.
- **Namibia** — "No newcomer or additional-language designation appears:
  newcomer 0, refugee 0, immigrant 0". The 2003 policy sets a threshold
  instead: 20 or more learners from different language groups.
- **South Africa** — "No newcomer designation appears... Choice is confined to
  the 11 official languages, so it is not a newcomer provision". 40 learners in
  Grades 1-6 or 35 in Grades 7-12.

These are rules about whether provision exists at all, not about which child is
in a category. `NEWCOMER_TRIGGERS` already concedes it — the `demand threshold`
gloss ends "Not a pupil-level designation, and the entries say so."

The same value sits on twenty-one of the Group A states, where it carries the
40-pupils staffing threshold. There it is doing the same job: describing when a
teacher is provided, not when a child is designated.

**Tonga** is a fourth national case and does not belong here. Its 2012 policy
"excepts children whose mother tongue is not Tongan" — a category exists — but
"PEER gives no criteria, instrument or entitlement attached to that exception".
`home language` is a fair trigger; the missing `designation` is the real gap,
probably `functional`.

## What each resolution costs

Nothing below has been written. `data/eal.json` is unchanged.

1. **`demand threshold` off `triggers`, onto an availability axis.** Touches 25
   systems. The values for that axis have to be read off the corpus rather than
   proposed — see the derive-vocabulary skill — and the reading has not been
   done.
2. **Absence flags** on Malaysia, Namibia, South Africa, Chhattisgarh,
   Chandigarh, Delhi. Six systems where the entry says no category exists. This
   follows the 2026-09-08 ruling that an absence answers the field and is
   complete, with one wrinkle: these answer *with a rule attached*, which is
   why the coder reached for a trigger, and a bare absence flag drops it. That
   is the argument for doing 1 before 2.
3. **The Group A scope decision**, which is the large one and is prior to both.

## What it does to the distribution

Small, and in the direction that strengthens the result rather than softening
it. Dropping the three national systems with no pupil category takes the
national trigger denominator from 64 to 61:

```
                       before        after
immigration status     32  50%      32  52%
tested proficiency     26  41%      26  43%
home language          20  31%      20  33%
arrival recency        18  28%      18  30%
prior schooling        12  19%      12  20%
ethnicity               5   8%       5   8%
demand threshold        3   5%       0   -
```

Immigration status stays the commonest way into an eal category, ahead of any
language test. The all-units figures are the contaminated ones: 164 systems
falls to about 160, and `demand threshold` goes from 25 to nil.
