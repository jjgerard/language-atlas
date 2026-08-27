### KG|Kyrgyzstan
STATUS: not-found
SOURCES:
 - label: Order No. 969/1 of the Ministry of Education of the Kyrgyz Republic of 9 July 2026, base curricula for 2026-27, appendix 1 (Kyrgyz-medium schools) - RETRIEVED BUT NOT MACHINE-READABLE (Cyrillic text has no extractable encoding)
   url: https://edu.gov.kg/media/uploads/2026/07/27/969-1-09072026-12.pdf
   http: 200
   tier: official-document
EVIDENCE:
 - field: fl.languagesOffered
   quote: "RETRIEVAL RESULT: the PDF downloads at 558,414 bytes and HTTP 200, and its stamp line "969/1, 09.07.2026" is legible, confirming the right document. But pdftotext -layout, -raw and -table all drop every Cyrillic glyph: only digits, punctuation and the string "Powered by TCPDF (www.tcpdf.org)" survive. Sanity check: the dates 30.2024/654, 14.2025/131 and 25.2026 extract as digits; no Cyrillic word does. The appendix curriculum table cannot be read without OCR, so no subject or hour allocation can be quoted."
   source: https://edu.gov.kg/media/uploads/2026/07/27/969-1-09072026-12.pdf
   note: retrieval note and absence proof
 - field: fl.upperSecondary
   quote: "Same document, same result: the grade columns of the appendix cannot be read, so no statement about grades 10-12 can be traced to this entry's only cited link."
   source: https://edu.gov.kg/media/uploads/2026/07/27/969-1-09072026-12.pdf
   note: absence proof
DRAFT BULLETS:
 - field: fl.languagesOffered
   bullets:
     - The entry's only cited link downloads but its Cyrillic text does not extract
     - pdftotext -layout, -raw and -table all drop every Cyrillic glyph
     - The stamp '969/1, 09.07.2026' is legible, so it is the right document
     - No subject or hour allocation can be quoted without OCR
 - field: fl.upperSecondary
   bullets:
     - The same extraction failure blocks this field
     - The appendix's grade columns cannot be read as downloaded
     - Only digits and the TCPDF producer string survive extraction
     - No statement about grades 10-12 can be traced to this link
 - field: policyHistory
   rows:
     - {year: 2026, description: Order No. 969/1 of the Ministry of Education of the Kyrgyz Republic of 9 July 2026 issues base curricula for 2026-27 for classes moving to 12-year schooling}
NOTES:
The policyHistory row rests on the legible stamp line and the URL path, not on the body text.
