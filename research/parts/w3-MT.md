### MT|Malta
STATUS: not-found

SOURCES:
 - label: "Migrant Learners' Unit, Ministry for Education, 'Education system' page"
   url: https://migrantlearnersunit.gov.mt/en/Pages/Education%20System/Education-system.aspx
   http: DNS resolution failure (curl exit 6, 'Could not resolve host: migrantlearnersunit.gov.mt'), two attempts
   tier: official-document
 - label: "Ministry for Education and Employment, 'A National Curriculum Framework for All' / national policy document (English)"
   url: https://meae.gov.mt/en/Public_Consultations/MEDE/Documents/EN%20National%20Policy.pdf
   http: DNS resolution failure (curl exit 6, 'Could not resolve host: meae.gov.mt'), one attempt
   tier: official-document

NOT RETRIEVED:
 Malta's entry cites four links. The two that would answer eal.l1Support are both on Maltese government hosts that fail DNS resolution from this network, migrantlearnersunit.gov.mt and meae.gov.mt. Eurydice Key data does carry Malta figures on language-heterogeneous schools, but that is a demographic indicator and not a statement about first-language support, so it is not used to fill the field. The field is left empty and the failure recorded.

EVIDENCE:
 - field: eal.l1Support
   quotes:
     - "NOT RETRIEVED: both Maltese government hosts named on this entry fail DNS resolution from this network"  [https://migrantlearnersunit.gov.mt/en/Pages/Education%20System/Education-system.aspx]
   sources: https://migrantlearnersunit.gov.mt/en/Pages/Education%20System/Education-system.aspx

DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Not retrieved, which is different from absent: nothing is claimed about Malta here
     - migrantlearnersunit.gov.mt does not resolve from this network (curl exit 6, two attempts)
     - meae.gov.mt does not resolve either, so the national policy PDF could not be read
     - The remaining two links are Eurydice Key data and the OECD PISA landing page
