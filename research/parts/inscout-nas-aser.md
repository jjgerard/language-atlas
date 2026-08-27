## SOURCE 6 - National Achievement Survey (NAS) state report cards - PARTIAL, and NOT what the brief hoped

`nas.gov.in` is **UNREACHABLE from this machine** (curl `000`, 21s connect
timeout). `nas.education.gov.in` **does not resolve** (curl exit 6). Everything
below is via the Internet Archive.

- Wayback CDX enumeration (observed 200s throughout):
  `http://web.archive.org/cdx/search/cdx?url=nas.gov.in/download-data-file*&filter=mimetype:application/pdf&collapse=urlkey&limit=300&fl=timestamp,original`
  - Saved: `...\scratchpad\inscout\nas\nas_cdx.txt` (98 rows)
- One card actually retrieved and read:
  `http://web.archive.org/web/20220712181625/https://nas.gov.in/download-data-file/10/nagaland.pdf`
  - observed: **HTTP 200**, `application/pdf`, 466,509 bytes
  - Saved: `...\scratchpad\inscout\nas\nas2021_nagaland.pdf` / `.txt` (586 lines)

### Verbatim proof of retrieval, and a correction to the brief's assumption

The archived card is NOT NAS 2021. Its own masthead reads:

> "NATIONAL ACHIEVEMENT SURVEY - CLASS X"
> "CYCLE 2 (2017-18)"
> "STATE REPORT CARD"
> "NAGALAND        387        11076        91%"
> "Participating School / Participating Students / School Response Rate"

(the `/10/` path segment is the CLASS, not the year). Subject scope, verbatim:

> "the NAS surveyed a representative sample of all school types in each state and measured students' performance in five subjects - Mathematics, Science, Social Science, English and Modern Indian Languages (MIL) -- Reading Comprehension."

Reported rows include, verbatim:

> "MODERN INDIAN  Modern Indian Language (MIL)  ... Reading comprehension"
> "ENGLISH        Language element"

### Answer to the brief's question: NO

`grep -i` for `medium`, `mother`, `medium of instruction` over the full extracted
card returns **nothing**. **The NAS state report card does NOT disaggregate
attainment by medium of instruction or by home language.** It gives a single
state-level average in "English" and in "Modern Indian Language", against the
national average, plus a distribution across four percent-correct bands.

### Coverage

Two archived directories of per-state PDFs:
- unnumbered directory: 34 files - covers **31 of the 33 units** (missing
  Arunachal Pradesh and Chhattisgarh; the extra files are Lakshadweep and
  Telangana, out of scope; DNH and DD are separate files).
- `/10/` directory (Class X): 30 files - missing Andaman and Nicobar, Arunachal
  Pradesh, Tamil Nadu, Uttar Pradesh, West Bengal.

Fields this can support: a weak `fl.uptake`-adjacent attainment figure (English
and MIL average percent correct, state vs national) and a very loose
`eal.achievementGap` proxy. It CANNOT support achievementGap properly, because
the gap the map wants is between language-background groups, and NAS does not
publish that cut.

### What it does NOT cover

No MoI or home-language cut. No `dld` content. Nothing on provision, only outcomes.

### Related NCERT document retrieved

`https://www.ncert.nic.in/pdf/NAS/nas_report_02_02_2024.pdf` - observed
**HTTP 200**, `application/pdf`, 5,565,959 bytes. Saved as
`...\scratchpad\inscout\nas_interpretation.pdf`. Title page verbatim:

> "Interpretation of National Achievement Survey (NAS) 2021 District and State Report Cards"
> "First Edition February 2024"
> "PARAKH (2023), Interpretation of National Achievement Survey (NAS) 2021 District and State Report Cards, NCERT, New Delhi, India https://ncert.nic.in/parakh.php."

WARNING: this PDF extracts to only 190 lines of text - the body is largely
images, so `pdftotext` gives you the front matter and little else. Do not rely
on grep over it; it must be read page-by-page as images if it is needed.

---

## SOURCE 7 - ASER Centre - WORKS, state-wise, but rural-only and not language-background disaggregated

- `https://www.asercentre.org/` - observed **HTTP 200**, `url_effective`
  `https://asercentre.org/` (drops the `www.`)
- `https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf`
  - observed: **HTTP 200**, `application/pdf`, 37,714 bytes
  - Saved: `...\scratchpad\inscout\aser2024_national.pdf` / `aser2024.txt`
- Also linked from the homepage and NOT yet retrieved (full report with the
  per-state pages): `https://asercentre.org/wp-content/uploads/2022/12/ASER_2024_Final-Report_13_2_24.pdf`

### Verbatim proof of retrieval

> "The Annual Status of Education Report (ASER) 2024 is a nationwide rural household survey that reached 649,491 children in 17,997 villages across 605 rural districts in India."

> "The ASER reading task assesses whether a child can read letters, words, a simple paragraph at Std I level of difficulty, or a 'story' at Std II level of difficulty."

> "The assessment method has remained the same since 2006, enabling comparisons over time."

> "The percentage of Std III children able to at least read Std II level text was 20.9% in 2018. This figure fell to 16.3% in 2022, and has increased to 23.4% in 2024."

The national-findings summary names individual states throughout, e.g. verbatim:

> "Gujarat, Maharashtra, Odisha, and Telangana have achieved near-universal enrollment for this age group. On the other hand, Meghalaya and Uttar Pradesh have the highest proportion of 3-year-olds not enrolled anywhere (over 50%)."

### Coverage

The full ASER report carries a page per state, so in principle **33 of 33** for a
reading-attainment time series. But note hard limits before using it:
- **RURAL households only** - not a school census, not urban.
- Reading is tested in the child's regional language; ASER does not publish a cut
  by home language or by medium of instruction, so it does not give
  `eal.achievementGap` either.
- It measures reading, not language-as-a-subject uptake, so it is a poor fit for
  `fl.uptake`.

Best honest use: `eal` background context and `fl.uptake` only if the map is
willing to accept a reading-fluency series as a proxy, clearly labelled.
