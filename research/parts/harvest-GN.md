### GN|Guinea
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER country profile, Guinea — Inclusion, section 'Ethnic and linguistic groups' (archived site; 'Last modified: Thu, 02/09/2021')"
   url: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
   http: 200
   tier: secondary-source

NOTE ON SOURCE STATUS:
 Retrieved page states the PEER platform "has moved to a new website,
 https://www.unesco.org/gem-report/peer" and that these profiles "are no longer being
 updated". Profile stamped "Last modified: Thu, 02/09/2021 - 15:18"; "Validated by the
 country: No".

ASSIGNED GAPS: eal.l1Support, eal.l2Support

EVIDENCE:
 - field: eal.l1Support (the eight codified national languages, named)
   quote: "Eight national languages are officially recognized and codified by the Institut national de recheche en linguistique appliquée [National Research Institute of Applied Linguistics – IRLA]: namely Soso, Maninkakan, Poular, Pkèlè, Lomagoe, Kissiei, Wamey and Onéan. French is the official language."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
   NOTE: the language names are reproduced exactly as PEER spells them, including forms an
   editor may want to check against IRLA's own orthography ("Pkèlè", "Lomagoe", "Kissiei",
   "Onéan"). Do not silently normalise them.
 - field: eal.l1Support (dialectal variants)
   quote: "Other languages such as Baga, Koniagui, Kuranko, Lélé, Bassari and Badiaranké are considered to be dialectal variants of the national languages."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
 - field: eal.l1Support — THE SOURCE'S OWN NEGATIVE VERDICT
   quote: "There are, however, few policies for the inclusion of vulnerable ethnic and linguistic groups."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
 - field: eal.l1Support (what provision does exist)
   quote: "Literacy is taught in all national languages. The promotion of endangered indigenous languages is one of the Government’s priorities."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
 - field: eal.l1Support (a plan, not a rule)
   quote: "The National Economic and Social Development Plan 2016–2020 maintains that \"the Government plans to use national languages in the process of improving students’ learning from the first years of schooling.\""
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion
   comment: framed as a plan ("plans to use"), not as an enacted medium-of-instruction rule.
 - field: eal.l1Support (constitutional backdrop)
   quote: "No one shall be privileged or disadvantaged by reason of birth, race, ethnicity, language, creed or political, philosophical or religious opinions."
   source: https://education-profiles.org/sub-saharan-africa/guinea/~inclusion

NEGATIVE / NOT ANSWERED BY THIS SOURCE:
 - field: eal.l2Support — NOT ANSWERED. French is identified as the official language, but
   the profile never states that it is the medium of instruction and describes no support
   for a pupil who arrives without it.
   Term counts on harvest/GN_body.txt (18,404 chars):
     grep -oi "language of instruction" -> 0
     grep -oi "instruction"             -> 0
     grep -oi "mother tongue"           -> 0
     grep -oi "bilingual"               -> 0
     grep -oi "newcomer"                -> 0
     grep -oi "second language"         -> 0
     SANITY CHECK: grep -oi "language" -> 9, grep -oi "ethnic" -> 5,
                   grep -oi "school" -> 46
   The word "instruction" not appearing once in a 18,000-character education profile is the
   clearest sign this source simply does not treat medium of instruction. Real zero.
 - Use "no newcomer or additional-language designation", not "no EAL designation": Guinea
   teaches through French, not English.

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - PEER itself notes "few policies for the inclusion of vulnerable ethnic and linguistic groups"
     - Eight national languages codified by IRLA, French is the official language
     - Literacy is taught in all national languages per the profile
     - PNDES 2016-2020 plans national languages from the first years of schooling
 - field: eal.l2Support
   bullets:
     - PEER profile 2021 names no newcomer or additional-language designation for Guinea
     - Profile never uses the word instruction and never names a medium of instruction
     - French recorded only as the official language, with no support route attached

POLICY HISTORY ROWS:
 - year: 2016
   description: National Economic and Social Development Plan 2016-2020 plans to use national languages from the first years of schooling
 - year: 2019
   description: Ten-Year Education Programme (ProDEG) 2019-2028 places children with disabilities in mainstream schools and classrooms and covers out-of-system learners
 - note: the profile quotes Article 1 of the Constitution on equality regardless of ethnicity
   and language but gives no year for the constitution; no policyHistory row is proposed for it.
