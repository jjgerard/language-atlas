### LR|Liberia
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Liberia — Inclusion, section 'Ethnic and linguistic groups' (archived site; 'Last modified: Mon, 09/08/2021')"
   url: https://education-profiles.org/sub-saharan-africa/liberia/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Mon, 09/08/2021 - 01:55".

ASSIGNED GAPS: eal.l2Support, fl.languagesOffered, fl.primaryRequirement, fl.upperSecondary
 The whole language section is two sentences, and they answer three of the four directly.

EVIDENCE:
 - field: fl.languagesOffered / fl.primaryRequirement / fl.upperSecondary
   quote: "According to the Education Reform Act , the primary language of instruction is English; one local language is recommended to be taught at the basic education level, while French is introduced in secondary schools."
   source: https://education-profiles.org/sub-saharan-africa/liberia/~inclusion
   comment: THREE separate facts in one sentence — English as medium; ONE local language
            RECOMMENDED (not required) at basic education; French entering at secondary.
            The profile elsewhere dates this instrument as the "2011 Education Reform Act"
            (grep -oi "Education Reform Act" -> 6 occurrences, four of them prefixed "2011").
 - field: eal.l2Support / eal.bilingualEducationNotes
   quote: "The 2010 education sector plan e stablished mother tongue-based bilingual education programmes in communities where children do not speak English in the home or community."
   source: https://education-profiles.org/sub-saharan-africa/liberia/~inclusion
   NOTE: the retrieved text really does read "e stablished" with a space — a stray break in
   the PEER page. Repair it silently when quoting for publication, or quote around it.
   This sentence is the closest thing in my whole batch to a newcomer criterion: the
   trigger is a COMMUNITY-level fact (children do not speak English at home or in the
   community), not an individual assessment.
 - field: context (non-discrimination)
   quote: "It further prohibits discrimination on grounds of ‘ethnic background, race, sex, creed, place of origin or political opinion’ (Art. 11[b])."
   source: https://education-profiles.org/sub-saharan-africa/liberia/~inclusion

NEGATIVE / PARTIAL:
 - field: fl.upperSecondary — only PARTLY answered. French is said to be "introduced in
   secondary schools", but the profile does NOT say whether it continues into upper
   secondary, becomes optional, or is required to leave school.
   Term counts on harvest/LR_body.txt (14,968 chars):
     grep -oi "upper secondary"  -> 0
     grep -oi "senior secondary" -> 0
     grep -oi "secondary"        -> 2 (the French sentence and a resource title)
 - field: fl.languagesOffered — the local language is referred to only as "one local
   language"; NO Liberian language is named anywhere in the profile.
 - field: eal.l2Support — the programme type is named but not its delivery: the profile does
   not say who teaches it, where, or for how long.
   Word-boundary counts: grep -owi "EAL" -> 0; grep -owi "ESL" -> 0;
   grep -oi "second language" -> 0; grep -oi "newcomer" -> 0.
   Liberia IS an English-medium system, so EAL would be defensible register here — but the
   source does not use it, and the phrase it does use is "mother tongue-based bilingual
   education". Prefer the source's phrase.
   SANITY CHECK: grep -oi "language" -> 3, grep -oi "school" -> 48.

DRAFT BULLETS:
 - field: fl.languagesOffered
   bullets:
     - Source is UNESCO PEER inclusion profile 2021, archived and no longer updated
     - Education Reform Act: one local language recommended at basic education level
     - No Liberian language is named in the profile, only "one local language"
     - French is introduced in secondary schools
 - field: fl.primaryRequirement
   bullets:
     - PEER: a local language is recommended, not required, at basic education level
     - English is the primary language of instruction under the Education Reform Act
     - No starting age or grade is given in the profile
 - field: fl.upperSecondary
   bullets:
     - French is introduced in secondary schools per the Education Reform Act
     - PEER gives no rule for upper secondary and no leaving-certificate language condition
 - field: eal.l2Support
   bullets:
     - PEER uses "mother tongue-based bilingual education", not an EAL or ESL label
     - 2010 sector plan established these programmes where children do not speak English at home
     - Trigger is a community-level fact, not an individual language assessment
     - Profile does not say who delivers the programmes, where, or for how long

POLICY HISTORY ROWS:
 - year: 1986
   description: Constitution of the Republic of Liberia; article 6 equal access to education, article 11(b) bans discrimination by ethnic background
 - year: 2006
   description: Policy on Girls' Education adopted, revised in 2013
 - year: 2010
   description: Education sector plan establishes mother tongue-based bilingual education programmes in non-English-speaking communities
 - year: 2011
   description: Education Reform Act; English as primary language of instruction, a local language recommended at basic level, French from secondary; restructures the Ministry and creates a county school system
 - year: 2013
   description: Policy on Girls' Education revised
 - year: 2017
   description: Education sector plan 2017-21 notes most children with disabilities do not attend school; no disability education policy adopted
 - year: 2018
   description: Five-year National Action Plan on Disabilities launched, calling for sign language teaching at all education levels
