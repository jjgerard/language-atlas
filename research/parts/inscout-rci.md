## SOURCE 3 - Rehabilitation Council of India (RCI), 37th Annual Report 2023-24 - NEGATIVE for state-level dld workforce

This was the decisive test for whether the `dld` map can be done at state level.
Answer: **no, not from RCI.**

- URL: `https://cdnbbsr.s3waas.gov.in/s34f4eeef3a8c90dfceaddd5c6d64e4ebb/uploads/2025/07/202507141090347321.pdf`
  - observed: **HTTP 200**, `application/pdf`, 2,867,291 bytes, `url_effective` identical (no redirect)
  - reached from `https://rehabcouncil.nic.in/` (observed **HTTP 200**), whose homepage links `https://rehabcouncil.nic.in/document/38th-annual-report-2024-25/` and `https://rehabcouncil.nic.in/document-category/annual-reports/`
- Saved: `...\scratchpad\inscout\rci_ar_2023_24.pdf` / `rci_ar_2023_24.txt` (12,842 lines)

### Verbatim proof of retrieval (Chapter 4, Central Rehabilitation Register)

> "The Section 19 of the RCI Act states that 'The Member-Secretary of the Council may, on receipt of an application made by any person in the prescribed manner enter his name in the Register provided that the Member-Secretary is satisfied that such person possesses the recognised rehabilitation qualification'."

> "According to the Rehabilitation Council of India Regulations 1997, R25 - Maintenance and Publication of Central Rehabilitation register,"

### What the CRR chapter actually publishes

A table headed verbatim:

> "Category wise registered professionals and personnel"

with columns "Sl. No. / Categories / Professionals / Personnel / Total". Row 1 reads:

> "1.    Audiologists and Speech Therapists                15305           6    15311"

and there is a separate row:

> "10.    Speech and Hearing Technician                      2752       4147       4706"

(NB the `pdftotext` column alignment in this table is unreliable - several rows
have their category label and figures on different lines. The 15,305 / 15,311
figure for Audiologists and Speech Therapists is on one clean line and is safe;
other rows are NOT safe to quote as numbers without re-reading the PDF page.)

**These are NATIONAL totals. There is no state-wise breakdown of registered
professionals anywhere in the report.** `grep -n "Andhra Pradesh"` over the whole
extracted text returns hits in only two tables plus the institution address
directory - never in a register-count table.

### The one state-wise table it does have

A table headed:

> "State wise Status of Institutions as on 31st March, 2023"

columns "Sl.No. / State / Number of Institutions / Number of Batches", ending

> "                                               900                1915"
> "                        Total"

It lists **32 rows**: Andhra Pradesh 19/32, Arunachal Pradesh 04/08, Assam
05/05, Bihar 12/24, Chandigarh 05/10, Chhattisgarh 12/24, Delhi 32/77, Goa
01/02, Gujarat 18/33, Haryana 58/183, Himachal Pradesh 05/09, Jammu & Kashmir
03/06, Jharkhand 12/17, Karnataka 36/67, Kerala 32/56, Ladakh 01/01, Madhya
Pradesh 38/79, Maharashtra 41/72, Mizoram 02/03, Manipur 03/08, Meghalaya 01/02,
Odisha 33/70, Puducherry 01/06, Punjab 15/23, Rajasthan 196/471, Sikkim 01/05,
Tamilnadu 36/76, Telangana 14/40, Tripura 02/06, Uttar Pradesh 229/440,
Uttarakhand 04/13, West Bengal 29/47.

CRITICAL LIMIT: this counts **RCI-approved training institutions across ALL
disability specialisations** (overwhelmingly special-education teacher training),
not speech-language pathology programmes and not practising clinicians. It is a
weak proxy at best and must never be presented as an SLP count.

### Coverage

- `dld.workforce` **state-wise: 0 of 33 units.**
- Institution counts (all specialisations, weak proxy only): **29 of the 33
  units** - missing Andaman and Nicobar Islands, Nagaland, Dadra and Nagar
  Haveli and Daman and Diu, and Lakshadweep (Lakshadweep is out of scope
  anyway). Ladakh appears as a row but is not one of the 33 units; Telangana
  likewise.
- `dld.legalEntitlement` / `dld.terminology`: national only, via the RCI Act and
  the Schedule of categories under s.19 (the report lists "i. Audiologists and
  Speech Therapists" and "viii. Speech Pathologists" among the categories).

### What it does NOT cover

No state-wise clinician counts, no service model, no caseload, no waiting times,
no identified prevalence, no discharge criteria, no per-state entitlement.
Nothing on `fl` or `eal`.

### Bottom line for the dld map

**RCI does not enable a state-level `dld` map.** Combined with the RPwD findings
below, the honest conclusion is that `dld` in India is a NATIONAL story that must
be written once and referenced, not 33 state stories.
