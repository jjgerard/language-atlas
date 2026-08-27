### SL|Sierra Leone
STATUS: documented

SOURCES:
 - label: "UNESCO GEM Report PEER, Sierra Leone country profile, INCLUSION, section 'Ethnic and linguistic groups' (last modified Wed, 11/08/2021 - 15:00; 'Validated by the country: No')"
   url: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
   http: 200 (url_effective identical; body contains all seven named sections)
   tier: secondary-source
   note: site banner now reads "This website has been archived and is no longer updated. Please visit the new PEER website at www.unesco.org/gem-report/en/peer".

TERM COUNTS (retrieved profile body, 13,570 chars, zero-width spaces stripped):
 speech 0 | Krio 0 | Temne 0 | Mende 0 | "mother tongue" 0 | bilingual 0 | "national language" 0 |
 "upper secondary" 0 | "foreign language" 0 | newcomer 0
 present: inclusive 6 | language 4 | secondary 4 | primary 3 | English 1
 Extraction caveat worth naming: a naive count of "mende" returns 2, but both hits are inside the
 word "amended". No Sierra Leonean language is named anywhere in the profile — it says "indigenous
 languages", "local languages" and "minority language speakers" and never names one.

EVIDENCE:
 - field: eal.l1Support / eal.bilingualEducationNotes / fl.primaryRequirement (this is the whole "Ethnic and linguistic groups" section)
   quote: "Article 9.3 of the Constitution of Sierra Leone , amended in 2008, promotes the learning of indigenous languages. The 2004 Education Act reaffirms the support of local languages, introducing them as new subjects in the curriculum. The most recent education sector plan recognizes that about one-fifth of pupils can be categorized as minority language speakers, yet English is the only language promoted in the curriculum."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
 - field: eal.bilingualEducationNotes
   quote: "The 2004 Education Act provides for the establishment and maintenance of separate education systems for pupils of the two sexes or for religious or linguistic purposes."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
 - field: eal.l1Support (constitutional non-discrimination ground)
   quote: "The Constitution further prohibits discrimination ‘on the grounds of place of origin, circumstance of birth, sex, religion, status, ethnic or linguistic association or ties’ (Art. 6.2)."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
 - field: eal.newcomerCriteria (the profile's only formal gateway, and it is a disability one; not a listed gap)
   quote: "the act requires a medical board to issue a permanent disability certificate to make persons with disabilities eligible for the rights and services protected by the act, including education."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
 - field: policyHistory
   quote: "In early 2021, Sierra Leone approved its first-ever policy on inclusive education, the National Policy on Radical Inclusion in Schools ."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion
 - field: policyHistory
   quote: "The decision in 2020 to overturn the policy that previously banned pregnant girls from attending school led to a spike in female enrolment."
   source: https://education-profiles.org/sub-saharan-africa/sierra-leone/~inclusion

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - PEER: about one-fifth of pupils are categorized as minority language speakers
     - Against that, "English is the only language promoted in the curriculum"
     - Constitution art. 9.3, as amended 2008, promotes the learning of indigenous languages
     - No Sierra Leonean language is named anywhere in the profile
 - field: eal.bilingualEducationNotes
   bullets:
     - No bilingual programme is named: "bilingual" occurs 0 times in the retrieved body
     - 2004 Education Act allows separate education systems for religious or linguistic purposes
     - Local languages enter as new subjects, not as a medium alongside English
     - Sanity check on the same text: inclusive 6, language 4, English 1
 - field: eal.l2Support
   bullets:
     - No English-as-additional-language provision is named for the one-fifth minority speakers
     - Term counts in the retrieved body: newcomer 0, bilingual 0, "mother tongue" 0
     - The 2021 Radical Inclusion policy lists disability, gender, pregnancy, location, income
     - Language is not one of the grounds that policy names
 - field: fl.primaryRequirement
   bullets:
     - PEER gives no compulsory rule, age or hours, only that local languages became subjects
     - 2004 Education Act introduced local languages as new subjects in the curriculum
     - Constitution art. 9.3 promotes their learning without making any of them compulsory
     - Term count in the retrieved body: "foreign language" 0
 - field: fl.upperSecondary
   bullets:
     - Not addressed by the PEER inclusion profile: "upper secondary" 0 in the retrieved body
     - The 2021 policy covers pre-primary, primary and senior secondary but names no language rule
     - No exit or matriculation language requirement appears anywhere in the profile
 - field: policyHistory
   rows:
     - {year: 1991, description: "Constitution art. 9.1 obliges government to provide education at all levels; art. 6.2 bars linguistic discrimination"}
     - {year: 2004, description: "Education Act supports local languages as new curriculum subjects and allows separate systems for linguistic purposes"}
     - {year: 2004, description: "Local Government Act, with the Education Act, regulates decentralization of education management"}
     - {year: 2007, description: "Child Rights Act establishes village-level child welfare committees and a right to special care and education"}
     - {year: 2008, description: "Constitution amended; art. 9.3 promotes the learning of indigenous languages"}
     - {year: 2008, description: "Agenda for Change 2008-12 makes special-needs education an indicator of education quality"}
     - {year: 2009, description: "Code of conduct for teachers and education personnel developed, covering disability and gender"}
     - {year: 2011, description: "Persons with Disability Act creates a national commission and a permanent disability certificate gateway"}
     - {year: 2011, description: "Sierra Leone Teaching Service Commission established"}
     - {year: 2011, description: "Capacity Development Strategy 2011-16 aims to identify needs and support disabled pupils in mainstream schools"}
     - {year: 2012, description: "University of Makeni begins training teachers in special education"}
     - {year: 2013, description: "Experimental inclusive education teacher training introduced in Freetown"}
     - {year: 2013, description: "National Strategy for the Reduction of Teenage Pregnancy 2013-15 adopted"}
     - {year: 2018, description: "Education sector plan 2018-20 relies on a forthcoming inclusive education policy"}
     - {year: 2020, description: "Policy banning pregnant girls from school overturned"}
     - {year: 2021, description: "National Policy on Radical Inclusion in Schools approved, the country's first inclusive education policy"}
