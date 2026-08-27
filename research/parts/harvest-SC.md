### SC|Seychelles
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER, Seychelles country profile, INCLUSION, sections 'Ethnic and linguistic groups', 'School Organization' and 'Teachers and Support Personnel' (last modified Fri, 03/06/2022 - 12:19; 'Validated by the country: No')"
   url: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
   http: 200 (url_effective identical; body contains all seven named sections)
   tier: secondary-source
   note: site banner now reads "This website has been archived and is no longer updated. Please visit the new PEER website at www.unesco.org/gem-report/en/peer".

CONFIRMS THE FACTS ALREADY RECORDED, DOES NOT CONTRADICT THEM:
 The entry already records that Seychelles is the one African system of eighteen whose PEER profile
 mentions speech at all, and that its speech-pathologist register was hand-counted at 3. This
 retrieval confirms the first half directly: "speech" occurs 2 times in the retrieved body, once as
 the SEN category "Speech and language difficulties" and once in the list of external resource
 personnel. Nothing here bears on the register count of 3.
 An internal tension inside the profile is worth flagging: it lists educational psychologists among
 the external support personnel who "should be provided", and elsewhere states flatly "that there
 are no educational psychologists to support schools".

TERM COUNTS (retrieved profile body, 14,541 chars, zero-width spaces stripped):
 French 0 | "mother tongue" 0 | bilingual 0 | "upper secondary" 0 | "foreign language" 0 |
 newcomer 0
 present: inclusive 25 | language 3 | speech 2 | secondary 2 | Creole 1 | English 1 |
 "post-secondary" 1
 Note the French zero: PEER never names French, one of the three national languages of Seychelles.

EVIDENCE:
 - field: eal.bilingualEducationNotes / fl.regionalMinorityLanguages
   quote: "Creole is the medium of instruction in Crèche, P1 and P2; English is the language of instruction from P3 onwards."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
   note: this single sentence is the whole of PEER's account of language of instruction; it sits in
   the "Ethnic and linguistic groups" section, so PEER treats Creole as a language of the country,
   not as a foreign or minority option.
 - field: fl.regionalMinorityLanguages (surrounding context in the same section)
   quote: "The 2013–17 education strategic plan highlights the importance of increasing cultural diversity in promoting identity."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
 - field: dld.terminology (confirms the recorded speech finding; not a listed gap)
   quote: "Speech and language difficulties who have ‘[d]ifficulty or [are] not able to articulate’"
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
 - field: dld.serviceModel (confirms the recorded speech finding; not a listed gap)
   quote: "In addition, external support should be provided by resource personnel (advisory teachers, educational psychologists, speech and occupational therapists) for teachers in inclusive classrooms."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
 - field: dld.serviceModel (the counter-statement in the same profile)
   quote: "Finally, it mentions that that there are no educational psychologists to support schools and that special education needs coordinators are insufficiently trained to cater for the diverse needs of pupils."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
 - field: policyHistory
   quote: "Article 15 of the 2004 Education Act stipulates that ‘the Minister [of Education] shall provide special education programs for learners of compulsory school age, who, by reason of intellectual, communicative, behavioral and physical or multiple exceptionalities, are in need of special education’."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion
 - field: policyHistory
   quote: "Seychelles signed the Convention Against Discrimination in Education (2010) , the UN Convention on the Right of the Child (1990) and the UN Convention on the Right of Persons with Disabilities (2009)."
   source: https://education-profiles.org/sub-saharan-africa/seychelles/~inclusion

DRAFT BULLETS:
 - field: eal.bilingualEducationNotes
   bullets:
     - Sequential, not parallel: the two languages divide the grades between them
     - Creole is the medium of instruction in Creche, P1 and P2
     - English is the language of instruction from P3 onwards
     - PEER never uses the word "bilingual" and never names French, the third national language
 - field: fl.regionalMinorityLanguages
   bullets:
     - Creole here is a national language and a medium, not a minority option
     - PEER files the medium-of-instruction rule under "Ethnic and linguistic groups"
     - 2013-17 strategic plan seeks increased cultural diversity in promoting identity
     - No other language of Seychelles is named: French 0 in the retrieved body
 - field: fl.upperSecondary
   bullets:
     - Not addressed by the PEER inclusion profile
     - Term count in the retrieved body: "upper secondary" 0, "foreign language" 0
     - PEER's only language grade boundary is P3, where English takes over
     - Constitution requires education "shall not be less than ten years", with no language rule
 - field: policyHistory
   rows:
     - {year: 1990, description: "Seychelles signs the UN Convention on the Rights of the Child"}
     - {year: 1993, description: "Constitution art. 27 guarantees equal protection without discrimination; art. 36 recognizes disability rights"}
     - {year: 2002, description: "Plan of Action for Gender Equality in Education 2002-15 targets gender-responsive content, medium and context"}
     - {year: 2004, description: "Education Act art. 15 requires special education programmes in the least restrictive environment"}
     - {year: 2008, description: "National School Nutrition Policy developed with the Ministry of Health"}
     - {year: 2009, description: "Seychelles signs the UN Convention on the Rights of Persons with Disabilities"}
     - {year: 2010, description: "Seychelles signs the Convention Against Discrimination in Education"}
     - {year: 2011, description: "Constitution amended; Framework for Early Childhood Care and Education addresses vulnerable children"}
     - {year: 2013, description: "National Curriculum Framework and National Assessment Framework adopted"}
     - {year: 2013, description: "Ministry of Education establishes a Special Needs Unit"}
     - {year: 2013, description: "Education Sector Medium-Term Strategic Plan 2013-17 targets a 10 per cent cut in gender gaps by 2017"}
     - {year: 2014, description: "ICT in Education and Training Policy 2014-19 prioritizes specialized technologies for SEN learners"}
     - {year: 2015, description: "National Policy for Open and Distance Learning defines inclusive education"}
