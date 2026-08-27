### US|Alabama - map dld, field serviceModel
STATUS: partial (eligibility rule read in full; it governs entitlement to service, not caseload or delivery mode)

SOURCES:
 - label: "Ala. Admin. Code r. 290-8-9-.03(11), Speech or Language Impairment (Alabama Legislature admin code API; served as PDF)"
   url: https://admincode.legislature.state.al.us/api/rule/290-8-9-.03
   http: 200
   tier: official-document

NOTE: The cited rule is an ELIGIBILITY rule. It does not describe caseloads, direct/indirect service or placement, so those remain unfilled for Alabama.

EVIDENCE:
 - field: serviceModel
   quote: "Children who exhibit a tongue thrust are not eligible for speech/language services unless they also exhibit an associated articulation disorder. Speech/language services are not a required service for children who exhibit tongue thrust only."
   source: https://admincode.legislature.state.al.us/api/rule/290-8-9-.03
 - field: serviceModel
   quote: "Speech or Language Impairment means a communication disorder in the area of articulation, voice, fluency, or language that adversely affects a child's educational performance."
   source: https://admincode.legislature.state.al.us/api/rule/290-8-9-.03
 - field: serviceModel
   quote: "A child does not meet the criteria for an articulation disorder as a result of dialectal patterns or second language acquisition patterns."
   source: https://admincode.legislature.state.al.us/api/rule/290-8-9-.03

DRAFT BULLETS:
 - field: dld.serviceModel
   bullets:
     - Service follows eligibility: rule 290-8-9-.03(11) is the gate to speech/language services
     - Rule names what is NOT a required service, e.g. tongue thrust with no articulation disorder
     - Dialect and second-language acquisition patterns are excluded from articulation eligibility
     - Rule sets criteria only; it fixes no caseload cap and no delivery model
