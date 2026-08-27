---

# BOTTOM LINE

## Source table

| Source | Works? | Units covered / 33 | Which map |
|---|---|---|---|
| CLM 52nd Report (2014-15), via Wayback | YES (archive only) | **33** | `fl` (whole map), `eal` L1/bilingual |
| NCERT NCF for School Education 2023 | YES (`www.` required) | **33, but one national rule** | `fl` curriculumTime/assessment/requirements, `eal` L1 |
| RPwD Act 2016, Schedule (India Code) | YES | **33, but one national rule** | `dld` terminology/legalEntitlement |
| RCI 37th Annual Report 2023-24 | YES | **0 state-wise**; 29 for a weak institution proxy | `dld` workforce - FAILS at state level |
| NAS state report cards, via Wayback | YES (archive only) | **31** (no Arunachal, no Chhattisgarh) | `fl`/`eal` attainment only, NO language-background cut |
| ASER Centre reports | YES | **33** (rural only) | `eal` context, weak `fl.uptake` proxy |
| UDISE+ national booklet 2023-24 | YES, but no language table | **0** | none |
| PRS state-acts archive | YES | a handful (states with a language statute) | `fl` primary law |
| State education portals (TN, NL, GJ) | 3 of 7 hosts answered; none had policy | **0** | none |
| `minorityaffairs.gov.in`, `nclm.nic.in`, `nas.gov.in`, `rciregistration.nic.in`, `gcert.gujarat.gov.in` | UNREACHABLE from this machine | - | - |

## The honest finding on `dld`

**The `dld` map has no state-level source in India and can only be documented
nationally.** This is a real finding, not a gap in searching:

- The RPwD Act 2016 Schedule defines "speech and language disability" once, for
  the whole country, and defines it narrowly (permanent, organic or
  neurological, laryngectomy/aphasia). Developmental Language Disorder in a
  child is not clearly inside it; the nearest fit is "specific learning
  disabilities", which the Act defines as "a deficit in processing language,
  spoken or written" and which sits under *intellectual disability*.
- The RCI Central Rehabilitation Register publishes only a NATIONAL count
  (15,305 Audiologists and Speech Therapists). No state breakdown exists in the
  annual report, and `rciregistration.nic.in` is unreachable from here.
- UDISE+ carries one CWSN enrolment table with no disability-type breakdown.

**Recommendation for `dld`: write ONE national India entry covering terminology,
legalEntitlement, identificationCriteria, workforce (national count, dated) and
policyHistory, and have the 33 state entries either inherit it or say plainly
that no state-level provision is separately documented.** Do not send 33 agents
to hunt for 33 non-existent state SLT services. If per-state `dld` is required,
the only untested route left is state RPwD Rules and state Health/Social Welfare
department pages, which I expect to yield certification machinery rather than
speech-and-language service policy - but that is an expectation, and I flag it
as untested rather than concluded.

## The `fl` and `eal` maps ARE doable at state level

Because the CLM 52nd Report is a single document with an identical numbered
section per unit. A worker does not need to search per state; they need to jump
to their state's chapter in one already-downloaded file.

Working file:
`...\scratchpad\inscout\clm_52nd_report.txt` (9,893 lines, `pdftotext -layout`)
Find your chapter with `grep -n "<STATE NAME>" clm_52nd_report.txt`. Sections are
`X.8` primary MoI, `X.9` upper primary, `X.10` secondary, `X.11` higher
secondary, `X.12` Three Language Formula, `X.13` teachers, `X.14` textbooks.

## Recommended split of the 33 units into work packages

Every package starts from the SAME two files, already on disk:
1. `clm_52nd_report.txt` - the unit's own chapter (per-state `fl` + `eal` L1)
2. `ncf2023.txt` - national R1/R2/R3 rules, curriculumTime, assessment
and every package must date the CLM figures "as reported to CLM, 2014-15" and
must NOT reuse its Census-2001 population figures as current.

**Package A - "Chapters run clean, high minority-language content" (9 units)**
Karnataka, Maharashtra, West Bengal, Assam, Bihar, Odisha, Andhra Pradesh,
Telangana-adjacent care for AP, Jharkhand.
Start: CLM chapters. AP IS THE WEAK ONE - see warning below.

**Package B - "Hindi-belt, three-language formula as designed" (7 units)**
Uttar Pradesh, Madhya Pradesh, Rajasthan, Haryana, Bihar (if not in A),
Chhattisgarh, Uttarakhand, Delhi.
Start: CLM chapters + NCF. These states are where "third language = a southern
language" is the nominal rule and non-implementation is the story.

**Package C - "The refusers and the statute states" (4 units)**
Tamil Nadu, Punjab, Maharashtra (if not in A), Karnataka (if not in A), Gujarat.
Start: CLM chapter + PRS state-acts archive
(`https://prsindia.org/files/bills_acts/acts_states/<state>/<year>/`). Tamil Nadu
is already half-done: CLM s.36.12 ("Two Language formula is followed in the
State") plus the Tamil Nadu Tamil Learning Act 2006 s.3(1), both retrieved and
saved. This package needs a worker who will read statute.

**Package D - "North-East" (8 units)**
Arunachal Pradesh, Assam (if not in A), Manipur, Meghalaya, Mizoram, Nagaland,
Sikkim, Tripura.
Start: CLM chapters ONLY. Expect thin state portals - `scert.nagaland.gov.in`
resets the connection, and Nagaland's live department site carries no language
policy. Do not expect to improve on CLM here. NAS cards exist for all of these
except Arunachal Pradesh.

**Package E - "Small UTs and the awkward ones" (6 units)**
Andaman and Nicobar Islands, Chandigarh, Puducherry, Goa,
Dadra and Nagar Haveli and Daman and Diu, Jammu and Kashmir.
Start: CLM chapters. Note the merged UT is TWO CLM chapters (25 Dadra and Nagar
Haveli, 26 Daman and Diu) that must be combined, and that the Andaman chapter
reports non-provision: "The UT Administration of Andaman and Nicobar Islands has
not provided". Jammu and Kashmir's CLM chapter predates the 2019
reorganisation - flag that explicitly, do not present it as current.

**Package F - "Remaining" (4 units)**
Himachal Pradesh, Kerala, Punjab (if not in C), Chhattisgarh (if not in B).
Start: CLM chapters.

**Package Z - NATIONAL, one worker, no state split**
The whole `dld` map, plus the national `fl` and `eal` baseline.
Start: RPwD Act 2016 Schedule (saved), RCI 37th Annual Report (saved), NCF 2023
(saved). Output one national entry per map that the 33 state entries reference.

### Two warnings that must travel with the packages

1. **Andhra Pradesh is the weakest unit in the whole set.** The CLM 52nd Report
   folds Andhra Pradesh and Telangana into a single chapter and records that the
   two governments did not answer the questionnaire, carrying forward the
   previous report's recommendations instead: "Andhra Pradesh and Telangana.
   Therefore, the recommendations of the 51st Report are". Andhra Pradesh needs
   its own hunt and should not be given to a worker who also has five other
   states.
2. **`minorityaffairs.gov.in` and `nclm.nic.in` are unreachable from this
   machine** (connect timeout and DNS failure respectively). A worker on a
   different network should retry the live host FIRST - there may be a newer CLM
   report than the 52nd - and fall back to the Wayback copy only if it also
   fails. Any citation to the archive copy must say so.
