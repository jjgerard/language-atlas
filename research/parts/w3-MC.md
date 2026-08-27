### MC|Monaco
STATUS: not-found

SOURCES:
 - label: "Monaco, monservicepublic.gouv.mc, 'The primary and secondary education system in Monaco'"
   url: https://monservicepublic.gouv.mc/en/themes/education/education-and-teaching/primary-and-secondary-education/the-primary-and-secondary-education-system-in-monaco
   http: 403 text/html, 244-byte body; two attempts, the second with a monservicepublic.gouv.mc referer
   tier: official-document
 - label: "Monaco, 'L'Education en Principaute: livret d'accueil 2025'"
   url: https://monservicepublic.gouv.mc/content/download/28960/file/L'%C3%89ducation%20en%20Principaut%C3%A9_Livret%20d'accueil_2025.pdf
   http: 403 text/html, 245-byte body; one attempt with a same-site referer
   tier: official-document

NOT RETRIEVED:
 Monaco's entry cites exactly two links and both are on monservicepublic.gouv.mc, which returns http 403 to this network on every attempt with a 244-245 byte body. The three fields listed for Monaco cannot be filled from anything that was actually read this session, and they are left empty rather than filled from general knowledge of the French curriculum, which Monaco's schools follow but which is not what the cited sources were checked to say.

EVIDENCE:
 - field: eal.l1Support
   quotes:
     - "NOT RETRIEVED: both monservicepublic.gouv.mc URLs return http 403 with a 244-245 byte body to this network"  [https://monservicepublic.gouv.mc/en/themes/education/education-and-teaching/primary-and-secondary-education/the-primary-and-secondary-education-system-in-monaco]
   sources: https://monservicepublic.gouv.mc/en/themes/education/education-and-teaching/primary-and-secondary-education/the-primary-and-secondary-education-system-in-monaco

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Not retrieved, which is different from absent: nothing is claimed about Monaco here
     - Both cited monservicepublic.gouv.mc URLs return http 403 with a 244-byte body
     - Tried with a desktop user-agent, a Google referer and a same-site referer
     - eal.l1Support, fl.languagesOffered and fl.upperSecondary are all left empty
