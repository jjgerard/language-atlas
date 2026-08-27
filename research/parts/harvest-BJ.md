### BJ|Benin
STATUS: partial

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Benin — Inclusion (archived site; page states 'Last modified: Tue, 17/08/2021')"
   url: https://education-profiles.org/sub-saharan-africa/benin/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 The retrieved page carries the banner "This website has been archived and is no longer
 updated. Please visit the new PEER website at www.unesco.org/gem-report/en/peer".
 The Benin inclusion profile itself is stamped "Last modified: Tue, 17/08/2021 - 12:05".

ASSIGNED GAPS: eal.l1Support, eal.l2Support — BOTH ARE NEGATIVE ON THIS SOURCE.

EVIDENCE OF ABSENCE (eal.l1Support, eal.l2Support):
 The Benin inclusion profile's "Legislation, plans, policies and programmes" section is
 subdivided into exactly these groups, and no others:
   "Disability" / "Gender" / "Rural areas" / "Poverty" / "Albinism"
 There is NO "Ethnic and linguistic groups" subsection and no language-of-instruction
 subsection. The profile therefore says nothing about provision in a pupil's home
 language, and nothing about teaching of French as the language of schooling.

 Term counts on the retrieved profile body (harvest/BJ_body.txt, 24,086 chars):
   grep -oi "language"      -> 3     (all three are irrelevant: a teacher-training
                                      module list, and "speech and language therapists")
   grep -oi "ethnic"        -> 1     (inside the ESP definition of inclusive education)
   grep -oi "minorit"       -> 1     (same sentence)
   grep -oi "migrant"       -> 0
   grep -oi "mother tongue" -> 0
   grep -oi "bilingual"     -> 1     (deaf education, not additional-language provision)
   SANITY CHECK: grep -oi "school" -> 45, grep -oi "disabilit" -> 53
 So the zero is a real zero, not a failed extraction.

 The single "ethnic" mention is only a list inside a definition, not a provision:
 - field: eal.l1Support
   quote: "It addresses the individual educational and learning needs of all marginalized and vulnerable children and young people: street children; girls; children from ethnic minority groups; children from financially disadvantaged families; children from nomadic/refugee/displaced families; children living with HIV or AIDS; and children with disabilities."
   source: https://education-profiles.org/sub-saharan-africa/benin/~inclusion
   comment: names ethnic minority children as a target group; states no language provision.

BONUS EVIDENCE (field NOT in my gap list — dld.serviceModel; offered because it is
quotable and the entry may not hold it):
 - field: dld.serviceModel
   quote: "In special schools, teachers are supported by a multidisciplinary team (which may include a nurse, a social worker, a psychologist, a special education educator , special education teachers, guards, speech and language therapists and remedial teachers)."
   source: https://education-profiles.org/sub-saharan-africa/benin/~inclusion
 - field: dld.serviceModel
   quote: "The team may also include physiotherapists, educational psychologists, occupational therapists, neurologists and psychiatrists, etc., but this support has not yet been implemented in special schools in Benin."
   source: https://education-profiles.org/sub-saharan-africa/benin/~inclusion

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - UNESCO PEER inclusion profile last modified 2021, site archived and no longer updated
     - PEER profile groups are disability, gender, rural areas, poverty, albinism only
     - No ethnic or linguistic group section, so no home-language provision is recorded
     - Ethnic minority children named as a target group in the 2018-2030 sector plan only
 - field: eal.l2Support
   bullets:
     - UNESCO PEER inclusion profile last modified 2021, site archived and no longer updated
     - PEER profile records no newcomer or additional-language designation for Benin
     - No provision described for teaching French as the language of schooling
 - field: dld.serviceModel
   bullets:
     - PEER profile 2021, describes special schools rather than mainstream therapy
     - Special-school team may include speech and language therapists
     - PEER states this support "has not yet been implemented in special schools in Benin"

POLICY HISTORY ROWS (all dated instruments named in this profile):
 - year: 2003
   description: Act No. 2003-017 (education act) requires schools to safeguard equal opportunities for all
 - year: 2005
   description: Act No. 2005-33 with Act 2003-017 provides for gender equality in education
 - year: 2015
   description: Children's Code, Act No. 2015-08 of 23 January 2015, stresses integration of children with special needs
 - year: 2017
   description: Act No. 2017-06 on protection and promotion of the rights of persons with disabilities; PEER notes no implementing decrees exist
 - year: 2018
   description: Post-2015 Education Sector Plan 2018-2030 adopted, defining inclusive and special education
 - year: 2006
   description: Ten-Year Education Sector Development Plan 2006-2015 identified programmes for persons with disabilities
