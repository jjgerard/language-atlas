### SY|Syria
STATUS: partial — no Syrian ministry document was obtainable; what follows rests on two institutional
secondary sources and must be labelled as such

WHY NO MINISTRY SOURCE: the Ministry of Education portal at moed.gov.sy returned HTTP 200 (186,522 bytes)
but serves only a JavaScript loader — the retrieved HTML contains the single visible string
"بوابة الخدمات الحكومية جاري تحميل البيانات الرجاء الانتظار لحظات", and term counts on it for
إنجليزي, انكليزي, فرنسي, منهاج, مناهج and خطة are all ZERO. curriculum.gov.sy and
www.syrianeducation.org.sy did not resolve at all (curl error 6, DNS). UNESCO's PEER profile for the
Syrian Arab Republic was retrieved in full (https://education-profiles.org/northern-africa-and-western-asia/syrian-arab-republic/~inclusion,
HTTP 200, 829,806 bytes) and contains NOTHING on foreign languages — the only language material in it
concerns sign language and Braille for teachers of children with disabilities. web.archive.org was
unreachable from this session throughout.

SOURCES:
 - label: "Government of Alberta, International Qualifications Assessment Service (IQAS), International Education Guide – Syria"
   url: https://www.alberta.ca/iqas-education-guide-syria
   http: 200 (text/html, 63,335 bytes)
   tier: secondary-source (a credential-evaluation guide published by a provincial government)
 - label: "UNICEF Middle East and North Africa Regional Office, Information Package: Education and Learning Opportunities for Syrian Returning Children and Adolescents, 2025, 27 pp."
   url: https://www.unicef.org/mena/media/27876/file/InfoPack%20EN%20v1.pdf.pdf
   http: 200 (application/pdf, 4,945,279 bytes)
   tier: secondary-source
 - label: "UNESCO GEM Report PEER, Syrian Arab Republic — INCLUSION profile (retrieved and read; contains no foreign-language material — recorded here as a checked negative)"
   url: https://education-profiles.org/northern-africa-and-western-asia/syrian-arab-republic/~inclusion
   http: 200 (text/html, 829,806 bytes)
   tier: secondary-source

EVIDENCE:
 - field: primaryRequirement — the school language, which settles the frame
   quote: "Arabic is language of instruction at all levels of education in Syria."
   source: https://www.alberta.ca/iqas-education-guide-syria
 - field: primaryRequirement — the start grade, as Alberta describes the 2001 curriculum
   quote: "The 2001 primary education curriculum included the following subjects: religious education, Arabic language, foreign language [introduced in Grade 5], mathematics, social studies, science and health education, physical education, music and art education."
   source: same
   [Two cautions. First, the bracketed "[introduced in Grade 5]" is Alberta's editorial insertion, not a
   quotation from a Syrian document. Second, the guide is explicitly describing the 2001 curriculum. Syria
   is widely said to have moved English earlier in the primary years since; I could NOT verify that and
   found no ministry source. Publish the Grade 5 figure only with both qualifications attached.]
 - field: primaryRequirement — the statutory framework for compulsory schooling
   quote: "The Law on Education #32 of April 7, 2002 implemented free and compulsory basic education that includes the primary (6-year program) and preparatory (3-year program) levels."
   source: same
 - field: upperSecondary — that a foreign language survives into every secondary stream
   quote: "Secondary education curricula vary according to the stream. Common subjects are only Arabic and a foreign language."
   source: same
   [This is the strongest single statement for the upperSecondary field: whatever else changes between the
   literary, scientific and vocational streams, the two constants are Arabic and one foreign language.]
 - field: upperSecondary — the preparatory stage in between
   quote: "Preparatory education is free and has been compulsory since 2002. It lasts 3 years, representing Grades 7 to 9. … Students take religious education, Arabic language (including handwriting), foreign language, mathematics, social studies (history, geography and national socialist education), science, drawing, music, vocational subject, military training, and agriculture for boys and home economics for girls."
   source: same
 - field: upperSecondary — a dated curriculum change, though not a language one
   quote: "The Ministry of Education introduced a new curriculum in 2008."
   source: same
 - field: languagesOffered — which languages, in the most recent source retrieved
   quote: "The programme offers active and interactive academic content fully aligned with the Syrian national curriculum. It covers core subjects such as Arabic, English, French, Math and General Science (Natural Sciences, Physics, and Chemistry)."
   source: https://www.unicef.org/mena/media/27876/file/InfoPack%20EN%20v1.pdf.pdf (2025)
 - field: languagesOffered — the same pair again, in a different programme
   quote: "The remedial and accelerated learning courses align with the national curriculum. These courses are focused on essential subjects such as languages (Arabic, English and French), math, science, physics, chemistry and the core subjects of secondary education (literary track)."
   source: same
   [Both passages describe non-formal catch-up programmes designed to align with the Syrian national
   curriculum. They therefore evidence that English AND French are both in that curriculum as of 2025 —
   but they describe the alignment, not the curriculum document itself.]
 - field: languagesOffered — higher education, for contrast
   quote: "The medium of instruction at all public higher education institutions is Arabic. Some private universities offer programs in English. Private universities require an English proficiency result (e.g., TOEFL, IELTS, or Oxford Placement Test) for admission."
   source: https://www.alberta.ca/iqas-education-guide-syria

DRAFT BULLETS:
 - field: primaryRequirement
   bullets:
     - No Syrian ministry source was obtainable; both figures below are secondary and possibly dated
     - Arabic is the language of instruction at every level, so the foreign language is a subject
     - Alberta's guide puts foreign language at Grade 5 of the 2001 primary curriculum
     - Whether it has since moved earlier could not be verified from any source
 - field: upperSecondary
   bullets:
     - Secondary curricula vary by stream, but "common subjects are only Arabic and a foreign language"
     - A foreign language is also on the Grades 7-9 preparatory timetable
     - Basic education, Grades 1-9, is compulsory under Law on Education No. 32 of 7 April 2002
     - No leaving or university-entrance language rule was found in any retrieved source
 - field: languagesOffered
   bullets:
     - UNICEF 2025: national-curriculum core subjects include both English and French
     - Same pair named again for remedial and accelerated courses aligned to the curriculum
     - No third foreign language appears in any source retrieved for this entry
     - Public higher education is in Arabic; private universities may require TOEFL or IELTS

POLICY HISTORY ROWS:
 - year: 2002
   description: Law on Education No. 32 of 7 April 2002 makes basic education, Grades 1-9, free and compulsory
 - year: 2008
   description: Ministry of Education introduces a new secondary curriculum and revised examination marking
 [Both rows come from the Alberta guide, a secondary source. Flag them if published.]

NOT ESTABLISHED — DO NOT PUBLISH:
 - The current grade at which a foreign language begins. The Grade 5 figure describes the 2001 curriculum
   as summarised by a foreign credential-evaluation body. Do NOT publish it as the present rule.
 - The frequently repeated claim that Syrian pupils choose between French and Russian at Grade 7: I saw
   this only in search-engine summary text and could NOT verify it in any document I retrieved. Do not
   publish it. Russian does not appear in either source read here (term count "Russian" = 0 in the
   Alberta guide's text).
 - Hours per week for any language, at any level.
 - The status of the curriculum after the 2024 change of government: nothing retrieved addresses it, and
   the 2025 UNICEF package describes non-formal programmes rather than the curriculum itself.
 - Kurdish, Armenian, Syriac or any other community language: not addressed by anything retrieved. Their
   absence from these sources is NOT evidence about their status.
