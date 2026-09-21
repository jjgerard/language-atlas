# indigenous.taughtAsSubject

Derived and coded 2026-09-21. 182 national entries, three columns, zero
refusals. The third of the indigenous trio, and **171 units now carry all three
codings** — standing, medium, subject — on the same key.

## The finding: subject teaching does not fill the gap

The pass was built on one question. `mediumOfInstruction` left 33 systems at
`not a medium`; a language can still be taught without carrying teaching, so
does the subject slot compensate?

**It does not.** Of the 29 such units that also carry a subject coding:

```
   not taught                             10
   elective                                7
   compulsory for all                      5
   compulsory in some schools or areas     3
   not stated                              3
   extracurricular only                    2
```

Where a language is not a medium it is **more likely to be absent from the
timetable altogether (34%) than to be compulsory in any form (28%)**. Absence
compounds rather than compensates. That is worth having as a number, because the
intuitive expectation runs the other way: a system that will not teach *through*
a language might be assumed to at least teach it.

## The complement: early-exit systems hand the language to the subject slot

The same cross-tab, read down the other column:

```
  mediumOfInstruction.role      n   taught as subject   NOT taught
  transitional, early exit     27         89%               0%
  shared medium                56         61%              13%
  sole medium                  32         59%               9%
  not a medium                 29         28%              34%
  support only                 10         40%              30%
  permitted, not implemented    8         25%              38%
```

**`transitional, early exit` is the highest of any role at 89%, and the only one
with no `not taught` at all** — higher than `sole medium` and `shared medium`,
which are the more committed arrangements on their face. That is not circular.
The alternative hypothesis was that early-exit systems drop the language once
they hand over, and the data says the opposite: the handover is medium → subject,
not medium → nothing. Niger writes it into consecutive articles — LOSEN art. 19
makes the mother tongue the medium in cycle de base 1, art. 21 makes it a subject
from cycle de base 2.

A language that is the sole medium throughout has less need of a subject slot,
which is why it scores lower. The two columns only say this together.

## The columns

`status` (6 values, a LIST), `object` (4), `stages` (6). One row is one system.

**`status` is a list because it changes with the stage.** Kenya is the clearest:
"Indigenous Language Activities is a listed lower primary subject, Grades 1 to
3... OPTIONAL at lower secondary". Niger, Samoa, Monaco, Albania, Wallis and
Futuna and ten others do the same. **16 of 182 entries carry two values** — the
subject-side mirror of early exit: support thins as pupils get older, whichever
column you look down.

**`object` is the hint's fourth element and it earned a column.** 30 of 182
entries turn on it and they are spread evenly across all five regions, which is
what separated it from `exemption`. A curriculum can honour a language by
teaching pupils ABOUT the people who speak it, and **15 entries do exactly
that**: Argentina's art. 54 puts common content on "las culturas originarias" in
every school in the country and the entry adds that the duty "covers cultures,
not the teaching of a language"; New Caledonia makes "Kanak culture, not
language" the compulsory strand; Timor-Leste's national languages are "identity
content to know and appreciate, not a taught subject"; Japan's courses of study
"require Ainu culture and people covered" while "Ainu language work is funded as
culture". Counting those as language provision would overstate exactly the
systems that provide least.

**`exemption` was not made a column.** Four entries, all European — a 2% column
concentrated in one region is a regional flag, the judgement already made about
`who decides` on mediumOfInstruction. It sits in the gloss on `compulsory for
all`, where two cases deserve a reader's attention: Ireland allows an exemption
"only in the listed circumstances" and none at all in Irish-medium schools, while
the Netherlands makes teaching Frisian "a legal duty" and still lets a G-profile
primary be "fully exempt".

**`stages` reuses the value names of `MEDIUM_REACH` on purpose**, so the two can
be read against each other — which is what makes the Niger pattern visible.

## Distribution

```
  STATUS                                OBJECT                          STAGES
  compulsory for all           36%      the language            63%     not stated     49%
  elective                     24%      not stated              17%     into secondary 31%
  compulsory in some schools   19%      language and culture    12%     all primary    13%
  not taught                   16%      the community, not it    8%     all levels      6%
  not stated                    8%                                      early primary   2%
  extracurricular only          5%
```

`stages` is the weak column at 49% `not stated`, the same rate as its counterpart
on `mediumOfInstruction` and kept on the same terms. `early primary` at 2% is
strikingly low against 14% on the medium side, and that is the finding above seen
from another angle: subjects run late, media run early.

## Where it fails

**The grain is the trio's grain** — one row is one system, and a system may hold
several languages on different terms. Czechia is the sharp case: German "mostly
sits in the foreign-language slot", "Romani is not taught as a separate subject",
Slovak "is not taught as a subject in primary". One row, three answers, coded on
the dominant one.

**Two entries say nothing about the field.** Northern Mariana Islands records
only "Became law March 2026 over the Governor's veto - PL 24-29", and Namibia
only a September Readathon. Both take `not stated` across all three columns
rather than being read as findings.

**`not taught` against `not stated` took care.** Ethiopia is the cleanest `not
taught`: "policy frames the right as learning IN the language, not learning it as
a subject". Nepal is the cleanest `not stated`: "sources consulted do not show a
nationally timetabled mother-tongue subject" while the Curriculum Development
Centre "has produced primary textbooks in 22 mother tongues" — a search that came
up short, not a finding that nothing exists.

## Still to do

132 sub-national entries carry this prose and are uncoded, matching 132 on
`mediumOfInstruction` and 140 on `standing`. Three passes, no vocabulary work.
