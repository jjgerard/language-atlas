# Corrections to already-published content

Every other applier in this repo refuses to overwrite written prose, and that
is the right default: sourced text is not a blank to be filled. This file is
the record of the times that default was set aside on purpose.

A correction lands here only when the published text is WRONG -- not merely
terse, or differently phrased. The replaced wording is kept verbatim so a
reader can see what the atlas used to say, which matters most in the cases
where the error was inherited from the source the entry cites.

## 2026-09-04 -- 78 policy-history rows

Found as a by-product of the history-linking pass: the matcher rejected rows
whose own entry already cited the document, and checking why turned up rows
that described the document incorrectly. Applied by
`research/tools/misdesc-apply.js` from the keyed table in
`research/tools/misdesc-fix.json`, each edit aborting unless the exact string
it replaces is still present.

Four classes:

* **Substantive** -- the row asserts something the instrument does not say.
  Brazil 2024 pointed at LDB art. 35-A, which art. 11 of Lei 14.945 REVOKES;
  Fiji 2013 credited the 2013 Constitution with three official languages, a
  provision of the 1997 Constitution it replaced; Palestine 2002 read a
  language-of-instruction rule into a Basic Law that designates none; Kerala
  2015 called an Act a Bill that was never assented to.
* **Wrong number or year** -- right instrument, wrong identifier. Fiji 1978 and
  New Mexico 1978 were both compilation years rather than enactment years.
* **Overstated** -- Angola and Djibouti, where the row was broader than art. 9
  and arts. 14/47 respectively support.
* **Systematic** -- one wrong fact in many copies. Sixteen rows dated Article
  350A to a 1957 amendment; it was inserted by the Constitution (Seventh
  Amendment) Act, 1956.

Two of these depart from a cited authority rather than correcting a slip made
here. Delhi's "Delhi Municipal Committee Act" and Uttar Pradesh's "Official
Languages of Uttar Pradesh Act" do not exist under those names, and both names
come from the Commissioner for Linguistic Minorities reports the entries cite.
Each row now gives the real statute AND records what the CLM called it, so the
entry still matches its source.

---

### eal - AO|Angola
- **was** 2001 | Law 13/01 of 2001 allowed indigenous languages into formal education as a medium
- **now** 2001 | Law 13/01 art 9 makes Portuguese the language of instruction and permits national languages, particularly in adult education

### eal - CA|Northwest Territories
- **was** 1984 | Eleven Official Languages, nine of them Indigenous, under the Official Languages Act
- **now** 1984 | Official Languages Act recognises the Aboriginal languages; the eleven Official Languages, nine of them Indigenous, date from 31 December 1990

### eal - DJ|Djibouti
- **was** 2012 | 2012 ministry act created an office for the development of Arabic and national languages
- **now** 2012 | Loi 164/AN/12/6ème L creates a service arabe for examinations, art 14, and a separate service des langues maternelles, art 47

### eal - DM|Dominica
- **was** 2002 | Education Act amended; s.137 as amended mandates a comprehensive national curriculum
- **now** 2002 | Education (Amendment) Act 2002; s.137 of the 1997 principal Act, unamended, mandates a comprehensive national curriculum

### eal - FJ|Fiji
- **was** 1978 | Education Act regulates provision so every school-aged child attends school
- **now** 1966 | Education Act (Cap 262), Ordinance 36 of 1966 amended to Act 30 of 1976, regulates provision so every school-aged child attends school

### eal - FM|Micronesia
- **was** 1975 | Constitution, revised 2005, bars discrimination on grounds of language, Art IV s4
- **now** 1979 | Constitution, effective 10 May 1979, bars discrimination on grounds of language, Art IV s4

### eal - IN|Arunachal Pradesh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### eal - IN|Chandigarh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Articles 350A and 350B (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Articles 350A and 350B (national)

### eal - IN|Chhattisgarh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### eal - IN|Delhi
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 2000 | Delhi Official Language Act provides for promotion of minority languages in the NCT
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 2003 | Delhi Official Languages Act, passed in 2000 and enacted as Delhi Act 8 of 2003, provides for promotion of minority languages in the NCT

### eal - IN|Haryana
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### eal - IN|Kerala
- **was** 2015 | Malayalam Language (Dissemination and Enrichment) Act 2015 enacted; the Commissioner for Linguistic Minorities assessed that it would erode minority rights under the 1969 official-languages instrument and urged the state to protect them
- **now** 2015 | Malayalam Language (Dissemination and Enrichment) Bill 2015 passed and reserved for the President, who withheld assent on 13 May 2025; the Commissioner for Linguistic Minorities assessed that it would erode minority rights under the 1969 official-languages instrument and urged the state to protect them

### eal - IN|Manipur
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### eal - IN|Uttar Pradesh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 1989 | Official Languages of Uttar Pradesh Act; CLM urges its implementation for Urdu
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1989 | U.P. Official Language (Amendment) Act 1989, Act 28 of 1989, inserting s.3 into the 1951 Act, called the Official Languages of Uttar Pradesh Act in the CLM report; CLM urges its implementation for Urdu

### eal - MH|Marshall Islands
- **was** 1979 | Constitution, amended 2005, bars discrimination on grounds of language, Art II s12
- **now** 1979 | Constitution, amended by the 1990 Constitutional Convention and certified 14 March 1991, bars discrimination on grounds of language, Art II s12

### eal - MU|Mauritius
- **was** 2014 | Education Act last amended
- **now** 2016 | Education Act last amended, by Act 18 of 2016 and Act 20 of 2016

### eal - QA|Qatar
- **was** 2001 | Emiri Resolution No. 25 established compulsory education
- **now** 2001 | Law No. 25 of 2001 established compulsory education

### eal - SC|Seychelles
- **was** 2011 | Constitution amended; Framework for Early Childhood Care and Education addresses vulnerable children
- **now** 2011 | Framework for Early Childhood Care and Education, October 2011, addresses vulnerable children

### eal - SL|Sierra Leone
- **was** 2008 | Constitution art. 9.3, as amended 2008, promotes the learning of indigenous languages
- **now** 1991 | Constitution s.9(3), original 1991 text, obliges the Government to promote the learning of indigenous languages

### eal - ST|São Tomé and Príncipe
- **was** 1975 | Constitution, art. 55, recognizes the right to education and compulsory free basic education
- **now** 2003 | Constitution art. 55, in the redaction of Lei n.º 1/2003, recognizes the right to education and compulsory free basic education

### eal - TV|Tuvalu
- **was** 2016 | Education Sector Plan III 2016-20 names four cross-cutting issues
- **now** 2016 | Education Sector Plan III 2016-20 names six cross-cutting issues

### eal - ZW|Zimbabwe
- **was** 1987 | Education Act sets Shona or Ndebele with English in all primary schools and English medium from Grade 4
- **now** 1987 | Education Act s.62 as enacted set Shona or Ndebele with English in primary schools and English medium from Grade 4; Act 2 of 2006 substituted it

### dld - DM|Dominica
- **was** 2002 | Education Act amended; s.137 as amended mandates a comprehensive national curriculum
- **now** 2002 | Education (Amendment) Act 2002; s.137 of the 1997 principal Act, unamended, mandates a comprehensive national curriculum

### dld - FJ|Fiji
- **was** 1978 | Education Act regulates provision so that every school-aged child attends school
- **now** 1966 | Education Act (Cap 262), Ordinance 36 of 1966 amended to Act 30 of 1976, regulates provision so that every school-aged child attends school

### dld - FM|Micronesia
- **was** 1975 | Constitution enshrines the right of the people to education (Art. XIII, Sec. 1)
- **now** 1979 | Constitution, effective 10 May 1979, enshrines the right of the people to education (Art. XIII, Sec. 1)

### dld - PW|Palau
- **was** 1992 | Constitution of Palau provides free compulsory public education and equal protection (Section 5)
- **now** 1981 | Constitution of Palau, effective 1 January 1981, provides free compulsory public education and equal protection (Section 5)

### indigenous - AL|Albania
- **was** 2020 | "Council of Ministers Decision no. 1155 of 24 December 2020 defines 'substantial numbers' and 'sufficient demand', imposing a 20% minority share of the administrative unit, proof of residency against the 2010 civil registry, a written parental request and a minimum of 15 pupils per class"
- **now** 2020 | Council of Ministers Decision no. 1155, dated 23 December 2020 in the register and 24 December in the printed heading, defines 'substantial numbers' and 'sufficient demand', imposing a 20% minority share of the administrative unit, proof of residency against the 2010 civil registry, a written parental request and a minimum of 15 pupils per class

### indigenous - AO|Angola
- **was** 2001 | Law 13/01 allows indigenous languages into the formal education system as media of instruction
- **now** 2001 | Law 13/01 art 9 makes Portuguese the language of instruction and permits national languages, particularly in adult education

### indigenous - BR|Brazil
- **was** 2024 | Lei 14.945 adds LDB art 35-A §2, extending the indigenous mother-tongue guarantee to ensino medio
- **now** 2024 | Lei 14.945 art 11 revokes LDB art 35-A and carries the indigenous mother-tongue guarantee to ensino médio at the new art 35-D §2º

### indigenous - CA|Northwest Territories
- **was** 1984 | Official Languages Act adopted, making the Aboriginal languages official alongside English and French
- **now** 1984 | Official Languages Act adopted, recognising the Aboriginal languages; they become Official Languages under RSNWT 1988 c.56 (Supp.), in force 31 December 1990

### indigenous - CL|Chile
- **was** 2017 | Decreto 280 phase-in completes, eighth year of basic education
- **now** 2017 | Decreto 280 of 2009 phase-in completes, reaching the eighth year of basic education

### indigenous - CW|Curacao
- **was** 2009 | Landsbesluit fixes the official spelling of Papiamentu and Dutch, P.B. 2009 no. 4
- **now** 2008 | Landsbesluit of 8 December 2008 fixes the official spelling of Papiamentu and Dutch; sources differ on the P.B. number

### indigenous - CY|Cyprus
- **was** 2002 | "Cyprus ratifies the European Charter for Regional or Minority Languages on 26 August 2002; it enters into force on 1 December 2002, applying Part II only to Armenian and Cypriot Maronite Arabic"
- **now** 2002 | Cyprus ratifies the European Charter for Regional or Minority Languages on 26 August 2002; it enters into force on 1 December 2002, applying Part III paragraphs to Armenian alone

### indigenous - DJ|Djibouti
- **was** 2012 | Act on the ministry's organisation creates an office for Arabic and national languages
- **now** 2012 | Loi 164/AN/12/6ème L creates a service arabe for examinations, art 14, and a separate service des langues maternelles, art 47

### indigenous - DM|Dominica
- **was** 2002 | Education Act amended; s.137 as amended mandates a comprehensive national curriculum
- **now** 2002 | Education (Amendment) Act 2002; s.137 of the 1997 principal Act, unamended, mandates a comprehensive national curriculum

### indigenous - FJ|Fiji
- **was** 1978 | Education Act regulates provision so every school-aged child attends school
- **was** 2013 | Constitution sets three official languages, bars bias by primary language
- **now** 1966 | Education Act (Cap 262), Ordinance 36 of 1966 amended to Act 30 of 1976, regulates provision so every school-aged child attends school
- **now** 2013 | Constitution bars bias by primary language, s.26(3)(a); it is adopted in English with iTaukei and Hindi translations, s.3(3)

### indigenous - FM|Micronesia
- **was** 1975 | Constitution, revised 2005, bars discrimination on grounds of language, Art IV s4
- **now** 1979 | Constitution, effective 10 May 1979, bars discrimination on grounds of language, Art IV s4

### indigenous - IN|Arunachal Pradesh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### indigenous - IN|Assam
- **was** 2009 | Assam Linguistic Minorities Development Board constituted by Government Notification No. WMD.20/99/Pt/62 dated 14.10.2009 to monitor implementation of safeguards for linguistic minorities
- **now** 1996 | Assam Linguistic Minorities Development Board constituted by Notification PLB.177/95/Pt.-I/4 of 03.08.1996 to monitor implementation of safeguards for linguistic minorities

### indigenous - IN|Chandigarh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Articles 350A and 350B (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Articles 350A and 350B (national)

### indigenous - IN|Chhattisgarh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### indigenous - IN|Delhi
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 1957 | Delhi Municipal Committee Act, one of three statutes governing recognition of linguistic minority schools
- **was** 2000 | Delhi Official Language Act provides for promotion of minority languages in the NCT
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1957 | Delhi Municipal Corporation Act 1957, Act 66 of 1957, named the Delhi Municipal Committee Act in the CLM report, one of three statutes governing recognition of linguistic minority schools
- **now** 2003 | Delhi Official Languages Act, passed in 2000 and enacted as Delhi Act 8 of 2003, provides for promotion of minority languages in the NCT

### indigenous - IN|Haryana
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### indigenous - IN|Jharkhand
- **was** 2001 | Jharkhand State Minority Commission constituted, covering both religious and linguistic minorities, with eleven members under Notification No. 1/Commission-30-083/2011-39
- **now** 2011 | Jharkhand State Minorities Commission constituted with eleven members under Notification No. 1/Commission-30-083/2011-39, covering both religious and linguistic minorities

### indigenous - IN|Kerala
- **was** 2015 | Malayalam Language (Dissemination and Enrichment) Act 2015 enacted; the Commissioner for Linguistic Minorities assessed that it would erode minority rights under the 1969 official-languages instrument and urged the state to protect them
- **now** 2015 | Malayalam Language (Dissemination and Enrichment) Bill 2015 passed and reserved for the President, who withheld assent on 13 May 2025; the Commissioner for Linguistic Minorities assessed that it would erode minority rights under the 1969 official-languages instrument and urged the state to protect them

### indigenous - IN|Manipur
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)

### indigenous - IN|Punjab
- **was** 2008 | Punjab Learning of Punjabi and other Languages Act 2008 exists, text not found
- **now** 2008 | Punjab Learning of Punjabi and other Languages Act 2008, Punjab Act 25 of 2008, exists; text not found

### indigenous - IN|Tamil Nadu
- **was** 1973 | Tamil Nadu Recognized Private Schools (Regulation) Act 1973, with Rules 1974, and the Tamil Nadu Minorities School (Recognition and Payment of Grants) Rules 1977, govern recognition of linguistic minority institutions
- **was** 1973 | Tamil Nadu Recognized Private Schools (Regulation) Act (Rules 1974), the route by which linguistic minority institutions are recognised
- **now** 1973 | Tamil Nadu Recognized Private Schools (Regulation) Act 1973, enacted as Act 29 of 1974, with Rules 1974, and the Tamil Nadu Minorities School (Recognition and Payment of Grants) Rules 1977, govern recognition of linguistic minority institutions
- **now** 1973 | Tamil Nadu Recognized Private Schools (Regulation) Act 1973, enacted as Act 29 of 1974 with Rules 1974, the route by which linguistic minority institutions are recognised

### indigenous - IN|Uttar Pradesh
- **was** 1957 | 7th Constitutional (Amendment) Act inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **was** 1989 | Official Languages of Uttar Pradesh Act; CLM urges its implementation for Urdu
- **now** 1956 | Constitution (Seventh Amendment) Act 1956 inserts Article 350A, mother-tongue instruction at the primary stage (national)
- **now** 1989 | U.P. Official Language (Amendment) Act 1989, Act 28 of 1989, inserting s.3 into the 1951 Act, called the Official Languages of Uttar Pradesh Act in the CLM report; CLM urges its implementation for Urdu

### indigenous - KM|Comoros
- **was** 2014 | Education Framework Act formalizes the renovated Koranic school reform introducing Shikomori
- **now** 2011 | Renovated Koranic school reform introduces Shikomori by administrative action; the education framework law remains loi 94-035/AF, revised 2009

### indigenous - MG|Madagascar
- **was** 2010 | Draft Constitution art. 6 names Malagasy and French the official languages
- **now** 2010 | Constitution promulgated 11 December 2010, art. 4, names Malagasy and French the official languages; the text put to the 17 November referendum named Malagasy as national language only

### indigenous - MH|Marshall Islands
- **was** 1979 | Constitution, amended 2005, bars discrimination on grounds of language, Art II s12
- **now** 1979 | Constitution, amended by the 1990 Constitutional Convention and certified 14 March 1991, bars discrimination on grounds of language, Art II s12

### indigenous - ML|Mali
- **was** 1962 | "Loi N° 62-74/AN-RM du 17/08/1962 launches a reform intended 'à décoloniser les esprits, à lier l'école à la vie' and to use the national languages as early as possible in schooling (as reported and cited by the UNICEF/QUALE 2021 study)"
- **now** 1962 | The 1962 education reform, cited variously as Loi 62-72 and 62-74 and dated 17 August or 17 September, is intended 'à décoloniser les esprits, à lier l'école à la vie' and to use the national languages as early as possible in schooling (as reported and cited by the UNICEF/QUALE 2021 study)

### indigenous - MU|Mauritius
- **was** 2014 | Education Act last amended
- **now** 2016 | Education Act last amended, by Act 18 of 2016 and Act 20 of 2016

### indigenous - NI|Nicaragua
- **was** 2007 | Constitution Art 121 guarantees Atlantic Coast intercultural education
- **now** 1987 | Constitution art 121, in the 1987 text as later reformed, guarantees Atlantic Coast intercultural education

### indigenous - PL|Poland
- **was** 2009 | "Poland's instrument of ratification of the European Charter (deposited 12 February 2009) accepts Article 8.1 a(i), b(i), c(i), d(iii), e(ii), g, h and i for fifteen minority languages and for Kashubian as a regional language"
- **now** 2009 | Poland's instrument of ratification of the European Charter (deposited 12 February 2009) accepts Article 8.1 a(i), b(i), c(i), d(iii), e(ii), g, h and i for fourteen minority languages and for Kashubian as the regional language, fifteen in all

### indigenous - PS|Palestine
- **was** 2002 | Basic Law makes Arabic the official language and language of instruction
- **was** 2002 | The Basic Law , established in 2002, states that Arabic is the official language of Palestine and therefore the…
- **now** 2002 | Basic Law art. 4(3) makes Arabic the official language; it designates no language of instruction
- **now** 2002 | The Basic Law, established in 2002, states that Arabic is the official language of Palestine

### indigenous - PW|Palau
- **was** 1992 | Constitution names the national and official languages, Art 13 s1
- **now** 1981 | Constitution, effective 1 January 1981, names the national and official languages, Art XIII s1

### indigenous - QA|Qatar
- **was** 2001 | Emiri Resolution No. 25 established compulsory education
- **now** 2001 | Law No. 25 of 2001 established compulsory education

### indigenous - SC|Seychelles
- **was** 2011 | Constitution amended; Framework for Early Childhood Care and Education addresses vulnerable children
- **now** 2011 | Framework for Early Childhood Care and Education, October 2011, addresses vulnerable children

### indigenous - SD|Sudan
- **was** 2010 | Child Act art. 2(f) gives minority children the right to use their language
- **now** 2010 | Child Act s.5(2)(f) gives minority children the right to use their language

### indigenous - SI|Slovenia
- **was** 2000 | "Slovenia notifies its Charter declaration by Note verbale of 19 September 2000, later replaced, accepting Article 8.1 a(i)-d(i) for Italian and a(ii)-d(ii) for Hungarian"
- **now** 2000 | Slovenia notifies its Charter declaration by Note verbale of 19 September 2000, later replaced, applying Article 8.1 a(i,ii,iii), c(i,ii,iii) and d(i,ii,iii) to Italian and Hungarian alike

### indigenous - SL|Sierra Leone
- **was** 2008 | Constitution amended; art. 9.3 promotes the learning of indigenous languages
- **was** 2008 | amended in 2008, promotes the learning of indigenous languages
- **now** 1991 | Constitution s.9(3), original 1991 text, obliges the Government to promote the learning of indigenous languages
- **now** 1991 | Constitution s.9(3), original 1991 text, obliges the Government to promote the learning of indigenous languages

### indigenous - ST|São Tomé and Príncipe
- **was** 1975 | Constitution, art. 55, recognizes the right to education and compulsory free basic education
- **now** 2003 | Constitution art. 55, in the redaction of Lei n.º 1/2003, recognizes the right to education and compulsory free basic education

### indigenous - TV|Tuvalu
- **was** 2016 | Education Sector Plan III 2016-20 names four cross-cutting issues
- **now** 2016 | Education Sector Plan III 2016-20 names six cross-cutting issues

### indigenous - US|New Mexico
- **was** 1978 | evidence of prior tribal consultation in program planning in accordance with the Indian Education Act, Sections…
- **now** 2003 | Indian Education Act, Laws 2003 ch. 151, requires evidence of prior tribal consultation in program planning

### indigenous - ZW|Zimbabwe
- **was** 1987 | Education Act sets Shona or Ndebele with English in all primary schools and English medium from Grade 4
- **now** 1987 | Education Act s.62 as enacted set Shona or Ndebele with English in primary schools and English medium from Grade 4; Act 2 of 2006 substituted it

