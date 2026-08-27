### IL|Israel
STATUS: not-found
SOURCES:
 - label: Knesset Research and Information Centre, policy on organising teaching hours in the education system, Asaf Weininger, 18 September 2022 - RETRIEVED BUT NOT MACHINE-READABLE (Hebrew text has no extractable encoding)
   url: https://fs.knesset.gov.il/globaldocs/MMM/68b696f9-9dfb-ec11-814e-005056aa4246/2_68b696f9-9dfb-ec11-814e-005056aa4246_11_19623.pdf
   http: 200
   tier: official-document
 - label: OECD, PISA 2022 Results (Volume I) - publication landing page (the cited Table I.B1.7.57 is NOT on this page)
   url: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   http: 200
   tier: secondary-source
EVIDENCE:
 - field: eal.l1Support
   quote: "RETRIEVAL RESULT: the Knesset PDF downloads at 379,040 bytes and HTTP 200, but pdftotext -layout returns 12,701 bytes in which every Hebrew glyph is dropped - only digits, Latin fragments such as "www.knesset.gov.il/mmm" and punctuation survive. The document has no usable ToUnicode mapping for its Hebrew font and cannot be term-searched or quoted without OCR. Sanity check: the year "2022" and the section numbers 1.1 to 2.4 are legible; no Hebrew word is."
   source: https://fs.knesset.gov.il/globaldocs/MMM/68b696f9-9dfb-ec11-814e-005056aa4246/2_68b696f9-9dfb-ec11-814e-005056aa4246_11_19623.pdf
   note: retrieval note
 - field: eal.bilingualEducationNotes
   quote: "Retrieved and read in full: an OECD catalogue page of 2,155 non-blank lines. TERM COUNTS on it: "B1.7.57" 0, "immigrant" 0, "language spoken at home" 0, "bilingual" 0, "newcomer" 0; sanity check "PISA" 23. It carries no country table."
   source: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   note: the second cited link cannot answer any field
 - field: eal.l2Support
   quote: "Same OECD page: "Hebrew" 0, "Arabic" 0, "second language" 0."
   source: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   note: absence proof
 - field: eal.newcomerCriteria
   quote: "Same OECD page: "newcomer" 0, "immigrant" 0, "olim" 0."
   source: https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html
   note: absence proof
 - field: fl.languagesOffered
   quote: "Neither cited source yields any language list: the Knesset PDF is unreadable and the OECD page is a catalogue record."
   source: https://fs.knesset.gov.il/globaldocs/MMM/68b696f9-9dfb-ec11-814e-005056aa4246/2_68b696f9-9dfb-ec11-814e-005056aa4246_11_19623.pdf
   note: absence proof
 - field: fl.upperSecondary
   quote: "Neither cited source yields any upper-secondary rule."
   source: https://fs.knesset.gov.il/globaldocs/MMM/68b696f9-9dfb-ec11-814e-005056aa4246/2_68b696f9-9dfb-ec11-814e-005056aa4246_11_19623.pdf
   note: absence proof
DRAFT BULLETS:
 - field: eal.l1Support
   bullets:
     - Neither cited link could be read for content
     - The Knesset PDF returns 200 but its Hebrew glyphs do not extract at all
     - The OECD link is a catalogue page with 0 hits for 'immigrant'
     - The entry needs a readable Israeli source before any field can be filled
 - field: eal.bilingualEducationNotes
   bullets:
     - Neither cited link could be read for content
     - 'bilingual' returns 0 hits on the OECD catalogue page
     - The Knesset PDF needs OCR before it can be term-searched
     - The entry needs a readable Israeli source before this field can be filled
 - field: eal.l2Support
   bullets:
     - Neither cited link could be read for content
     - 'Hebrew', 'Arabic' and 'second language' each return 0 hits on the OECD page
     - The Knesset PDF's Hebrew font has no usable ToUnicode mapping
     - The entry needs a readable Israeli source before this field can be filled
 - field: eal.newcomerCriteria
   bullets:
     - Neither cited link could be read for content
     - 'newcomer' and 'immigrant' both return 0 hits on the OECD page
     - The Knesset PDF cannot be term-searched without OCR
     - The entry needs a readable Israeli source before this field can be filled
 - field: fl.languagesOffered
   bullets:
     - Neither cited link yields any language list
     - The Knesset PDF is a teaching-hours paper whose text does not extract
     - The OECD link is a publication catalogue record
     - The entry needs a readable Israeli source before this field can be filled
 - field: fl.upperSecondary
   bullets:
     - Neither cited link yields any upper-secondary rule
     - The Knesset PDF's Hebrew content is unreadable as downloaded
     - The OECD link carries no country-level curriculum data
     - The entry needs a readable Israeli source before this field can be filled
NOTES:
Both cited links resolve with HTTP 200 but neither is usable: the Knesset PDF's Hebrew text layer does not extract, and the OECD link is a catalogue page rather than the table its label names.
