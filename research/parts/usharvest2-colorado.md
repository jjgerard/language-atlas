### US|Colorado
STATUS: partial
TERMINOLOGY: Colorado's statute is the English Language Proficiency Act; the term is English
learner / English language learner, not "EAL".

SOURCES:
 - label: "Colorado English Learner Identification and Placement Guidance 2026-2027 (WIDA with the state education agency)"
   url: https://wida.wisc.edu/sites/default/files/id-placement/CO-ID-Placement-Guidance.pdf
   http: 200
   tier: official-document
 - label: "Education Commission of the States, 50-State Comparison: English Learner Policies, All Data Points, May 2020 - Colorado row"
   url: https://reports.ecs.org/comparisons/english-learner-policies
   http: 200
   tier: secondary-source
 
EVIDENCE:
 - field: eal.bilingualEducationNotes
   quote: "LEAs chose from: Bilingual, English as a Second Language, or any other methods that achieve the purposes of the English Language Proficiency Act" (ECS column "Which program approaches does state policy authorize?"), sourced by ECS to "Colo. Code Regs. s 301-10:2224-R-3.00" and "Colo. Rev. Stat. Ann. s 22-24-104(4)"
   source: https://reports.ecs.org/comparisons/english-learner-policies
 - field: eal.l1Support
   quote: "The Colorado department of education must also produce guidance documents and provide technical assistance to assist districts in identifying and assessing English language learners." (ECS identification column, sourced to Colo. Rev. Stat. Ann. s 22-24-105 and s 22-24-106)
   source: https://reports.ecs.org/comparisons/english-learner-policies
   note: this is about identification, not about provision in the home language.

ABSENCE PROVED / RETRIEVAL FAILURE - report this, it is the finding:
 - WIDA's Colorado Identification and Placement file is a stub. Retrieved in full, it is 396
   characters and its entire body reads: "For information regarding Identification and Placement
   Guidance for Colorado, please go to the Colorado Department of Education website page:
   Identification and Placement (http://www.cde.state.co.us/cde_english/identification-placement)".
   Occurrences in it: "bilingual" 0, "home language" 0, "English learner" 0. Unlike every other
   WIDA member file in this batch it carries NO state policy text at all.
 - The Colorado Department of Education page it points to would not load. Over http it returned
   curl exit 52 (empty reply from server); over https it returned curl exit 35 (TLS handshake
   failure), including with --tlsv1.2 and with certificate checking disabled. No content, no
   status code. It is not a redirect to a landing page - the connection itself fails.
 - Consequence: eal.l1Support and eal.l2Support CANNOT be filled from the sources cited on this
   entry. Filling them would need cde.state.co.us reached from another network, or the
   Colorado English Language Proficiency Act rules read directly.

DRAFT BULLETS:
 - field: eal.bilingualEducationNotes
   bullets:
     - ECS reading of statute and regulation as at May 2020, not a state publication
     - LEAs choose bilingual education, ESL, or any method meeting the ELP Act's purposes
     - Authority cited: Colo. Code Regs. 301-10:2224-R-3.00 and Colo. Rev. Stat. 22-24-104(4)
     - Bilingual education is permitted, not triggered by any headcount in the cited rules

 - field: eal.l1Support
   bullets: NONE PROPOSED - not established from the sources cited on this entry, see above
 - field: eal.l2Support
   bullets: NONE PROPOSED - not established from the sources cited on this entry, see above

 - field: policyHistory
   rows:
     - {year: null, description: "Colorado English Language Proficiency Act named in the ECS row; no enactment year given in the source read, so none asserted"}
