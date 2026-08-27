### ER|Eritrea
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Eritrea — Inclusion, sections 'School Organization' and 'Laws, Plans, Policies and Programmes' (archived site; 'Last modified: Mon, 09/02/2026')"
   url: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 The retrieved page carries the site-wide notice that the PEER platform "has moved to a new
 website, https://www.unesco.org/gem-report/peer" and that these profiles "are no longer
 being updated". BUT this particular profile is stamped "Last modified: Mon, 09/02/2026 -
 15:41" — by far the freshest in my batch of 17 (the other 16 are all 2021 or 2023). Do not
 describe the Eritrea profile as stale.

ASSIGNED GAP: dld.serviceModel (only field requested for this unit)

EVIDENCE:
 - field: dld.serviceModel (special school sector)
   quote: "Formal education services for children with disabilities started in Eritrea in the 1960s, mainly for deaf and blind children. In this regard, there are two schools for the deaf in the Maekel and Anseba regions run by religious organizations and one government school for the blind in Maekel. They are all in urban towns and all at elementary level and are of the boarding type. No additional special school has been opened in the last decade."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (self-contained special classes in mainstream schools)
   quote: "The Ministry of Education has made efforts in this sense to integrate children with intellectual disabilities into mainstream schools in a self-contained special classroom. In 2015/16, these classes enrolled more than 300 students in about 15 special classes within 15 schools in 2 zobas (regions)."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (direction of travel, and its contradiction)
   quote: "The Ministry of Education has committed to reaching a stage where segregated and special needs classes ‘would be phased out’ . In this respect, the ministry’s 2008 Policy and Strategy on Inclusive Education reaffirms that ‘“schools should accommodate all children”, including children with disabilities’ and the 2018–22 education sector plan aims to enhance education access for children with disabilities at all levels. Nevertheless, at the same time, it aims to consolidate the existing special classes."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (progression)
   quote: "Once they have completed their studies in specialized elementary schools, children with disabilities are generally integrated into general education institutions."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (resource rooms)
   quote: "under schemes of the education sector development plan, the ministry constructed 25 special resource rooms in 6 zobas and staged awareness raising among educators."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (resource rooms, donor route)
   quote: "the action programme developed in cooperation with Danida and the European Union allowed the construction of 25 resource rooms in various regions of the country"
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (workforce)
   quote: "The College of Education offers a psychology course in special needs and inclusive education only to the degree students of its Educational Psychology and Educational Administration programmes."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion
 - field: dld.serviceModel (gap acknowledged in source)
   quote: "An absence of recognized sign language training for education has also been noted."
   source: https://education-profiles.org/sub-saharan-africa/eritrea/~inclusion

EVIDENCE OF ABSENCE — NO SPEECH AND LANGUAGE PROFESSION IS DESCRIBED:
 Term counts on harvest/ER_body.txt (26,374 chars):
   grep -oi "speech"               -> 0
   grep -oi "therap"               -> 0   (no therapist of any kind appears)
   grep -oi "itinerant"            -> 0
   grep -oi "language disorder"    -> 0
   grep -oi "communication disorder" -> 0
   SANITY CHECK: grep -oi "school" -> 51, grep -oi "special class" -> 5,
                 grep -oi "resource room" -> 2
 So Eritrea's service model as recorded by PEER is entirely educational — special schools,
 self-contained special classes and resource rooms — with no clinical or therapy route at
 all. That zero is a real zero, not a failed extraction.

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - PEER profile (updated 2026) describes no speech or language therapy of any kind
     - Three special schools only: two for deaf pupils, one for blind, all elementary boarding
     - Self-contained special classes in mainstream schools, 15 classes in 2 zobas in 2015/16
     - 25 special resource rooms built across 6 zobas under the sector development plan

POLICY HISTORY ROWS:
 - year: 1997
   description: Constitution article 21 right of equal access to publicly funded services; article 14 bans discrimination including on language and disability
 - year: 2001
   description: Ministry of Education pilot programme Special Needs Education Within the Concept of Inclusive Education begins
 - year: 2003
   description: Ministry of Education, Danida and the EU initiate an action programme promoting inclusive education
 - year: 2008
   description: Policy and Strategy on Inclusive Education adopted, affirming that schools should accommodate all children
 - year: 2010
   description: National Education Policy aims at free basic education for all but contains no disability guidelines
 - year: 2012
   description: Inclusive education pilot runs 2012-2015 across nine primary, three special and one middle school
 - year: 2014
   description: Government reports drafting a national disability policy
 - year: 2018
   description: Education sector plan 2018-22 aims to widen access for children with disabilities while consolidating existing special classes
 - note: Eritrea "has not ratified the Convention Against Discrimination in Education and does not have an education act" (verbatim from the profile) — a dated-absence worth recording.
