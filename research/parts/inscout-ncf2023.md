## SOURCE 5 - NCERT, National Curriculum Framework for School Education 2023 - NATIONAL, fills the fields CLM cannot

- URL that WORKS: `https://www.ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf`
  - observed: **HTTP 200**, `application/pdf`, 47,030,865 bytes, `url_effective` identical
- URL that FAILS: `https://ncert.nic.in/pdf/NCFSE-2023-August_2023.pdf` (no `www.`)
  - observed: curl exit 35, "Recv failure: Connection was reset". **The `www.` prefix is required on ncert.nic.in.**
- Saved: `...\scratchpad\inscout\ncf2023b.pdf` / `ncf2023.txt` (30,186 lines)

This is the source for `fl.curriculumTime` and `fl.assessment`, which the CLM
report does not touch at all. It is NATIONAL guidance, so it is the same fact 33
times over - but it is the rule states are implementing, and states diverge from
it in ways the CLM report documents.

### `fl.primaryRequirement` / `fl.secondaryRequirement` / `fl.upperSecondary` (verbatim)

> "b. At least one language native to India will be offered as an option for the medium of instruction to all students up to Grade 12."

> "c. The language in which literacy is first learnt in school (R1) should be a language that is most familiar to the student. Usually, this is the mother tongue of the student or the language that is prevalently used in the neighbourhood."

> "d. Since it is in R1 that literacy is first attained, it must be used as the Medium of Instruction (MoI) for other subjects, at least until literacy in another language is attained."

> "use in three languages by age 15 (Grade 10). At least two out of these three languages should be languages native to India. At least one language native to India will be studied at the 'literature level.'"

> "e. In Grades 11 and 12, at least two languages will be studied, at least one of which is a language native to India."

Secondary Stage, verbatim:

> "i. Study 3 Languages: R1, R2, R3, at least two of which are native to India."

> "iv. All Secondary Schools will need to offer 3 Languages as well as all the 7 subjects, so that all students are able to complete Grade 10."

> "h. All three Languages (R1, R2 and R3) will continue in this stage. By the end of Grade 10, schools will ensure the development of the capacity for basic communication for social purposes in R1, R2 and R3, and linguistic proficiency for academic use in the classrooms in R1 and R2, and to the extent possible, in R3."

NOTE the NCF's terminology: it does NOT say "first/second/third language" or
"three-language formula" in its operative clauses - it says **R1, R2, R3**. Use
the NCF's own labels when citing it, and the CLM's "First/Second/Third Language"
when citing the CLM.

### `fl.curriculumTime` (verbatim)

Ages 6-8:

> "R1 would need 90 minutes every day and R2 would need 60 minutes. Mathematics and numeracy would require 60 minutes a day."

Preparatory Stage, Table 4.2i, "Annual Hours / Annual Periods":

> "R1+Library                                   180           270"
> "R2                                           190           285"

Secondary Stage, Table 4.2v is an illustrative timetable with R1, R2 and R3
appearing as named slots across the week; class time is stated verbatim as:

> "b. Class time for all subjects is 50 minutes."

and the overall load as:

> "weeks of around 29 hours of instruction hours every week."

### `fl.assessment` (verbatim)

> "1) The Languages Curricular Area would have 3 examinations for R1, R2 and R3."

> "iii. Boards must offer these examinations multiple times (each being a cycle) in the same academic year and students' final certification must be on the basis of their best performance across these cycles"

Grades 11-12:

> "1) 2 examinations in languages, at least one of which is native to India. These languages may or may not be continuations of R1, R2 or R3. For example, they may be a specialised literature class in R1, R2, R3 or a new Indian Language (such as Sanskrit or classical Tamil) and/or a foreign language."

That last clause is where "foreign language" in the strict sense enters Indian
school policy at all - and only as one option at Grades 11-12.

### Coverage

- `fl.curriculumTime`, `fl.assessment`, `fl.primaryRequirement`,
  `fl.secondaryRequirement`, `fl.upperSecondary`: **33 of 33 units, as a single
  national framework.** It is guidance, not a state statute - state boards may
  and do differ, and Tamil Nadu's two-language position (see CLM SOURCE 1) is
  the clearest divergence.
- `eal.l1Support` / `eal.bilingualEducationNotes`: the R1 clauses above are
  national mother-tongue-medium policy - **33 of 33.**

### What it does NOT cover

Nothing state-specific. Nothing on `dld`. No uptake series. No teacher supply
figures. No newcomer or arrival provision.
