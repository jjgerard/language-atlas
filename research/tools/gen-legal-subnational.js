// Builds research/codings/legalentitlement-subnational.json from compact rows.
// A null means UNSET: the entry answers and no value on the list carries it.
// Columns: instrument, instrument_type, instrument_year, obliges, duty_org,
// duty_type, redress_type.
const fs = require('fs');

const R = [];
const row = (...a) => R.push(a);

/* ---------- United States: 50 states under IDEA -------------------------- */
// obliges 4 throughout, following the national row (IDEA, statute, 4): FAPE is
// the IEP-based entitlement, and all but two of these entries name the parent
// due-process right that marks it as individually enforceable.
const US = [
  ['Alabama', 'Ala. Admin. Code 290-8-9-.05, under Code of Ala. 1975 tit. 16 ch. 39', 'regulation', null, 4, 'each public agency', 'local authority', 'administrative appeal'],
  ['Alaska', '4 AAC 52.090 and 4 AAC 52.100', 'regulation', null, 4, 'each district', 'local authority', 'complaint to agency'],
  ['Arizona', 'A.R.S. 15-763 and 15-764', 'statute', null, 4, 'the governing board', 'local authority', 'administrative appeal'],
  ['Arkansas', 'Children With Disabilities Act of 1973, A.C.A. 6-41-201', 'statute', 1973, 4, 'school districts', 'local authority', 'administrative appeal'],
  ['California', 'Ed. Code 56000 and 56501', 'statute', null, 4, 'the local educational agency', 'local authority', 'administrative appeal'],
  ['Colorado', "Exceptional Children's Educational Act rules, 1 CCR 301-8", 'regulation', null, 4, 'the administrative unit', 'local authority', 'administrative appeal'],
  ['Connecticut', 'Conn. Gen. Stat. 10-76d and 10-76h', 'statute', null, 4, 'each local or regional board of education', 'local authority', 'administrative appeal'],
  ['Delaware', '14 DE Admin. Code 923 and 926', 'regulation', null, 4, 'each public agency receiving state funding', 'local authority', 'administrative appeal'],
  ['District of Columbia', 'D.C. Code 38-2561.02(b)', 'statute', null, 4, 'the LEA', 'local authority', 'not stated'],
  ['Florida', 'Fla. Stat. 1003.57', 'statute', null, 4, 'each district school board', 'local authority', 'administrative appeal'],
  ['Georgia', 'Rule 160-4-7-.02', 'regulation', null, 4, 'the LEA', 'local authority', 'complaint to agency'],
  ['Hawaii', 'FAPE for students with disabilities aged three to twenty; the department conducts the impartial hearing', null, null, 4, 'the department', 'ministry', 'administrative appeal'],
  ['Idaho', 'Idaho Special Education Manual, IDAPA 08.02.03.004', 'regulation', null, 4, 'the LEA', 'local authority', 'administrative appeal'],
  ['Illinois', '23 IAC 226.50 and 226.570', 'regulation', null, 4, 'districts', 'local authority', 'administrative appeal'],
  ['Indiana', '511 IAC 7-33-2 and 7-45-3', 'regulation', null, 4, 'public school corporations and charter schools', 'local authority', 'administrative appeal'],
  ['Iowa', 'Iowa Code 256B.2 and 256B.6', 'statute', null, 4, 'districts', 'local authority', 'administrative appeal'],
  ['Kansas', 'Special education for exceptional children act, K.S.A. 72-3403, 72-3410, 72-3415', 'statute', null, 4, 'each board of education', 'local authority', 'administrative appeal'],
  ['Kentucky', 'KRS 157.230, with 707 KAR 1:340', 'statute', null, 4, 'school boards', 'local authority', 'complaint to agency'],
  ['Louisiana', 'R.S. 17:1941, with Bulletin 1706', 'statute', null, 4, 'state and local educational agencies', 'local authority', 'administrative appeal'],
  ['Maine', "Maine's required adverse effect form; the entry names no entitlement instrument", null, null, null, null, 'not stated', 'not stated'],
  ['Maryland', 'COMAR 13A.05.01', 'regulation', null, 4, 'the 24 local school systems', 'local authority', 'complaint to agency'],
  ['Massachusetts', 'M.G.L. c.71B s.3', 'statute', null, 4, 'the school committee', 'local authority', 'specialist commission'],
  ['Michigan', 'R 340.1745(a)', 'regulation', null, 3, null, 'not stated', 'not stated'],
  ['Minnesota', 'Minn. Stat. 125A.03 and 125A.091', 'statute', null, 4, 'every district', 'local authority', 'administrative appeal'],
  ['Mississippi', 'Miss. Code Ann. 37-23-1, with State Board Policy Ch. 74 Rule 74.19', 'statute', null, 4, 'each public agency', 'local authority', 'administrative appeal'],
  ['Missouri', 'RSMo 162.700 and 162.961', 'statute', null, 4, 'each district board', 'local authority', 'administrative appeal'],
  ['Montana', 'MCA 20-7-411', 'statute', null, 4, 'the board of trustees of every school district', 'local authority', 'not stated'],
  ['Nebraska', 'Rule 51, under Neb. Rev. Stat. 79-1110 to 79-1184', 'regulation', null, 4, 'districts and cooperatives', 'local authority', 'administrative appeal'],
  ['Nevada', 'NAC 388.281, 388.306 and 388.307', 'regulation', null, 4, 'the agency', 'local authority', 'administrative appeal'],
  ['New Jersey', 'N.J.A.C. 6A:14', 'regulation', null, 4, 'each district board of education', 'local authority', 'administrative appeal'],
  ['New Mexico', '6.31.2 NMAC', 'regulation', null, 4, 'each public agency', 'local authority', 'administrative appeal'],
  ['New York', 'Educ. Law 4402(2)', 'statute', null, 4, 'each district board', 'local authority', 'administrative appeal'],
  ['North Carolina', 'NC 1501-1.1', 'regulation', null, 4, 'each LEA', 'local authority', 'administrative appeal'],
  ['North Dakota', 'NDCC 15.1-32-08', 'statute', null, 4, 'every school district', 'local authority', 'not stated'],
  ['Ohio', 'OAC 3301-51-02 and 3301-51-05, under ORC 3323.02', 'regulation', null, 4, 'each district', 'local authority', 'administrative appeal'],
  ['Oklahoma', 'Okla. Admin. Code 210:15-13-1 and 210:15-13-5, under 70 O.S. 13-101', 'regulation', null, 4, null, 'not stated', 'administrative appeal'],
  ['Oregon', 'ORS 343.221 and 343.175', 'statute', null, 4, 'the district school board', 'local authority', 'administrative appeal'],
  ['Pennsylvania', '22 Pa. Code 14.102, incorporating the Federal regulations by reference', 'regulation', null, 4, null, 'not stated', 'administrative appeal'],
  ['Rhode Island', '200-RICR-20-30-6', 'regulation', null, 4, 'an LEA', 'local authority', 'administrative appeal'],
  ['South Carolina', 'S.C. Code 59-33-30, 59-33-50 and 59-33-110', 'statute', null, 4, 'district trustees', 'local authority', null],
  ['South Dakota', 'SDCL 13-37-1', 'statute', null, 4, 'each school district', 'local authority', 'administrative appeal'],
  ['Tennessee', 'State Board rule 0520-01-09, adopting 34 CFR Part 300', 'regulation', null, 4, 'the LEA', 'local authority', 'administrative appeal'],
  ['Texas', '19 TAC ch. 89 subch. AA and 89.1151, with TEC 29.003 and 30.002', 'regulation', null, 4, null, 'not stated', 'administrative appeal'],
  ['Utah', 'Utah Code 53E-7-202 and 53E-7-204, with the USBE Special Education Rules', 'statute', null, 4, 'each LEA', 'local authority', 'administrative appeal'],
  ['Vermont', '16 V.S.A. 2942, 2957, 2959(b) and 2961', 'statute', null, 4, 'supervisory unions', 'local authority', 'administrative appeal'],
  ['Virginia', 'Code of Virginia 22.1-214, with 8VAC20-81-210', 'statute', null, 4, 'each school division', 'local authority', 'administrative appeal'],
  ['Washington', 'Chapter 28A.155 RCW, ss. 040 and 080', 'statute', null, 4, 'the board of directors of each school district', 'local authority', 'administrative appeal'],
  ['West Virginia', 'W. Va. Code 18-20-1 and 18-20-2, with WVBE Policy 2419', 'statute', null, 4, 'each county board', 'local authority', 'administrative appeal'],
  ['Wisconsin', 'Wis. Stat. 115.76(7), 115.782(1)(a) and 115.80', 'statute', null, 4, 'public agencies', 'local authority', 'administrative appeal'],
  ['Wyoming', 'WDE Chapter 7 rules, under W.S. 21-2-202(a)(xviii)', 'regulation', null, 4, 'each school district or public agency', 'local authority', 'administrative appeal'],
];
for (const [name, ...rest] of US) row('US|' + name, ...rest);

/* ---------- China: 31 provinces ----------------------------------------- */
// The shape repeats: an equal right to education, a duty on governments to fund
// and build, and a duty on ordinary schools to admit a child "able to adapt".
// That is level 2 almost everywhere -- a duty owed to the population, which no
// individual claims. Redress is UNSET where the only route the entry names is
// an official ORDER TO CORRECT against the school: enforcement against the
// provider, not a remedy the family asks for. See the commit message.
const CN = [
  ['Anhui', 'Anhui Disability Protection Regulation, arts. 15-16', 'statute', null, 2, 'ordinary primary and junior secondary schools', 'school', 'not stated'],
  ['Beijing', 'Beijing Measures for Rehabilitation Services for Disabled Children, in force 1 January 2020', 'regulation', 2020, 3, 'the district disabled persons federation of the hukou area', 'statutory body', 'not stated'],
  ['Chongqing', 'Chongqing Regulations on the Protection of Disabled Persons', 'statute', null, 2, 'city and district governments', 'local authority', 'complaint to agency'],
  ['Fujian', "Fujian's measures implementing the Law on the Protection of Disabled Persons", 'regulation', null, 2, 'county-level and higher governments', 'local authority', 'administrative appeal'],
  ['Gansu', 'Gansu Regulations on the Protection of Persons with Disabilities, revised June 2022', 'statute', 2022, 2, 'county-level and higher governments', 'local authority', 'complaint to agency'],
  ['Guangdong', 'The 2018 provincial measures', 'regulation', 2018, 2, 'ordinary schools', 'school', 'complaint to agency'],
  ['Guangxi', "Guangxi's measures implementing the national Disability Protection Law, in force January 2013", 'regulation', 2013, 2, 'ordinary primary and junior secondary schools', 'school', null],
  ['Guizhou', 'Guizhou Disability Protection Regulation, art. 18', 'statute', null, 2, 'compulsory-education schools', 'school', null],
  ['Hainan', 'Provincial Measures under the national Law on Protection of Persons with Disabilities', 'regulation', null, 2, 'municipal and county governments', 'local authority', 'not stated'],
  ['Hebei', 'Hebei 2011 disability measures', 'regulation', 2011, 2, 'municipal and county governments, and county-level education departments', 'local authority', null],
  ['Heilongjiang', 'Heilongjiang Regulations on the Protection of Disabled Persons (2011)', 'statute', 2011, 2, 'county-level governments', 'local authority', 'complaint to agency'],
  ['Henan', 'Provincial duty on ordinary and special institutions; the entry names no instrument', null, null, 2, 'county-level and higher governments', 'local authority', 'court'],
  ['Hubei', 'Provincial duty on ordinary primary and junior high schools; the entry names no instrument', null, null, 2, 'each district city and county above 300,000 people', 'local authority', null],
  ['Hunan', 'Hunan Measures implementing the national disability protection law, passed 2017', 'regulation', 2017, 2, 'ordinary compulsory schools', 'school', null],
  ['Inner Mongolia', "2026 revision of the region's disability measures, art. 21, from 1 September 2026", 'regulation', 2026, 2, 'the region and its governments', 'regional government', null],
  ['Jiangsu', 'Jiangsu Disability Protection Regulation, art. 23', 'statute', null, 2, 'ordinary schools', 'school', null],
  ['Jiangxi', 'Provincial Regulations under the national Law on Protection of Persons with Disabilities', 'statute', null, 2, 'ordinary compulsory schools and the education department', 'school', 'not stated'],
  ['Jilin', "Jilin's 2013 disabled persons regulation", 'statute', 2013, 2, 'ordinary preschools and schools', 'school', 'complaint to agency'],
  ['Liaoning', "Liaoning's own measures implementing the national Law on Protection of Disabled Persons", 'regulation', null, 2, 'provincial, city and county governments', 'local authority', 'not stated'],
  ['Ningxia', 'Regional duty on ordinary and special schools; the entry names no instrument', null, null, 2, 'the region', 'regional government', null],
  ['Qinghai', '2011 Qinghai Regulations on Protection of Disabled Persons', 'statute', 2011, 2, null, 'not stated', 'not stated'],
  ['Shaanxi', 'Provincial duty on primary and junior secondary schools; the entry names no instrument', null, null, 2, 'the provincial education department', 'ministry', 'complaint to agency'],
  ['Shandong', 'Shandong Special Education Regulations, passed 26 September 2025', 'statute', 2025, 2, 'schools', 'school', 'complaint to agency'],
  ['Shanghai', "Shanghai's measures implementing the national Disability Protection Law, in force April 2014", 'regulation', 2014, 2, 'compulsory-stage ordinary schools', 'school', 'not stated'],
  ['Shanxi', 'Provincial duty on kindergartens, primary and junior schools; the entry names no instrument', null, null, 2, 'ordinary kindergartens, primary and junior schools', 'school', null],
  ['Sichuan', "Sichuan's measures implementing the national disability law", 'regulation', null, 2, 'counties of more than 300,000 people', 'local authority', null],
  ['Tianjin', 'Municipal special school building and special education funds in the fiscal guarantee scope; the entry names no instrument', null, null, 2, 'departments', 'not stated', 'not stated'],
  ['Tibet', "Tibet's own measures implementing the national Law on Protection of Disabled Persons", 'regulation', null, 2, 'county governments', 'local authority', 'complaint to agency'],
  ['Xinjiang', 'Regional guarantee of equal education and compulsory schooling; the entry names no instrument', null, null, 2, 'governments', 'local authority', 'not stated'],
  ['Yunnan', '2012 Yunnan Regulations', 'statute', 2012, 2, 'county governments', 'local authority', 'complaint to agency'],
  ['Zhejiang', 'Zhejiang Regulations on the Protection of Persons with Disabilities, in force 2010', 'statute', 2010, 2, null, 'not stated', 'complaint to agency'],
];
for (const [name, ...rest] of CN) row('CN|' + name, ...rest);

/* ---------- India: 25 states and union territories ---------------------- */
// Almost all of these are RPwD Rules made under s.101 of the 2016 Act, and what
// they carry is machinery: a nodal officer, recognition conditioned on s.16, a
// complaint to the State Commissioner. `obliges` is UNSET where the entry
// describes only machinery and no entitlement, and 0 where the entry says in
// terms that the state's education rule is permissive.
const IN = [
  ['Andhra Pradesh', 'Andhra Pradesh Rules 2023, under s.101 of the RPwD Act 2016', 'regulation', 2023, 1, 'every District Education Office', 'local authority', 'not stated'],
  ['Arunachal Pradesh', 'Arunachal Pradesh Rights of Persons with Disabilities Rules 2018, under s.101', 'regulation', 2018, 1, 'educational institutions and establishments', 'school', 'specialist commission'],
  ['Assam', 'The Rights of Persons with Disabilities (Assam) Rules, 2019', 'regulation', 2019, null, "the State Commissioner's office, under s.79", 'statutory body', 'specialist commission'],
  ['Bihar', 'State RTE Rules, as counted by Vidhi: disability transport and free special learning and support material', 'regulation', null, 2, null, 'not stated', 'not stated'],
  ['Chandigarh', 'Punjab Right to Service Act 2011, extended to UT Chandigarh in 2017', 'statute', 2011, null, 'the Co-ordinator of the Disability Cell', 'statutory body', 'administrative appeal'],
  ['Chhattisgarh', 'Chhattisgarh Rights of Persons with Disabilities Rules 2023', 'regulation', 2023, 1, 'the state government, and schools run by state departments', 'regional government', 'complaint to agency'],
  ['Dadra and Nagar Haveli and Daman and Diu', 'Dadra and Nagar Haveli and Daman and Diu RPwD Rules 2021', 'regulation', 2021, 1, 'every District Education Office', 'local authority', 'specialist commission'],
  ['Delhi', 'Directorate of Education orders: the free neighbourhood-school right, and the 2003 order relaxing age limits', 'regulation', null, 1, 'the Directorate of Education', 'ministry', 'not stated'],
  ['Goa', 'The Goa Rules 2018, under s.101 of the RPwD Act 2016', 'regulation', 2018, null, 'the State Commissioner for Persons with Disabilities, under s.79', 'statutory body', 'administrative appeal'],
  ['Haryana', 'Haryana Health Department notification of 5 August 2021', 'regulation', 2021, null, 'the certifying authorities', 'not stated', 'administrative appeal'],
  ['Jammu and Kashmir', 'J&K Rights of Persons with Disabilities Rules 2021', 'regulation', 2021, 1, 'a Nodal Officer in each Chief Education Office', 'local authority', 'specialist commission'],
  ['Jharkhand', 'State rules, as counted by Vidhi: free special learning and support material', null, null, 2, null, 'not stated', 'not stated'],
  ['Kerala', 'The Kerala Rules 2020, under s.101 of the RPwD Act 2016', 'regulation', 2020, null, 'non-government institutions serving disabled persons', 'school', 'not stated'],
  ['Madhya Pradesh', 'Madhya Pradesh RPwD Rules 2017, under s.101 of the RPwD Act 2016', 'regulation', 2017, 1, 'recognised educational institutions', 'school', 'not stated'],
  ['Maharashtra', 'Maharashtra State Rights of Persons with Disabilities Rules 2024', 'regulation', 2024, null, 'the Commissioner for Disability Welfare', 'statutory body', 'not stated'],
  ['Manipur', 'State disability rules under s.101, framed 20 June 2020, with free education under s.31', 'regulation', 2020, 2, 'four residential special schools', 'school', 'specialist commission'],
  ['Meghalaya', 'Meghalaya RPwD Rules 2017', 'regulation', 2017, 1, 'every district school education office', 'local authority', 'administrative appeal'],
  ['Puducherry', 'Puducherry RPwD Rules 2018, whose education chapter is a single permissive rule', 'regulation', 2018, 0, 'the Secretary to Government (Welfare), as ex officio Commissioner', 'statutory body', 'specialist commission'],
  ['Punjab', 'Punjab Rules 2019, under s.101 of the RPwD Act 2016', 'regulation', 2019, 1, 'every District Education Office', 'local authority', 'administrative appeal'],
  ['Rajasthan', 'State rules under the RPwD Act 2016', 'regulation', null, 1, null, 'not stated', 'specialist commission'],
  ['Tamil Nadu', 'Rules made by G.O. Ms. No. 28, Welfare of Differently Abled Persons, 27 July 2018', 'regulation', 2018, null, 'the State Commissioner', 'statutory body', 'specialist commission'],
  ['Tripura', 'RTE Rules (Tripura) 2011, under s.38 of the RTE Act', 'regulation', 2011, 1, null, 'not stated', 'not stated'],
  ['Uttar Pradesh', 'The 2017 state rules under s.101, whose education chapter is a single permissive rule', 'regulation', 2017, 0, 'registered institutions', 'school', 'not stated'],
  ['Uttarakhand', 'Uttarakhand Right to Service Act 2011', 'statute', 2011, null, 'the District Social Welfare Officer', 'local authority', 'administrative appeal'],
  ['West Bengal', 'Health Department order of 29 August 2018', 'regulation', 2018, null, 'the Superintendent of the institution in the applicant’s own area', 'statutory body', 'not stated'],
];
for (const [name, ...rest] of IN) row('IN|' + name, ...rest);

/* ---------- Canada, Australia, the UK and three singles ------------------ */
const REST = [
  ['CA|Alberta', 'Education Act s.11(4) and s.42', 'statute', null, 3, 'the school board', 'local authority', 'administrative appeal'],
  ['CA|British Columbia', 'M150/89, under School Act s.75', 'regulation', 1989, 3, 'the board', 'local authority', 'administrative appeal'],
  ['CA|British Columbia', 'M638/95, requiring an individual education plan', 'regulation', 1995, 4, 'the board', 'local authority', 'administrative appeal'],
  ['CA|Manitoba', 'Standards for Appropriate Educational Programming', 'policy', null, 2, 'school divisions', 'local authority', 'not stated'],
  ['CA|New Brunswick', 'Education Act s.12(1), as replaced in 2014', 'statute', 2014, 4, 'the superintendent', 'local authority', 'consultation right'],
  ['CA|Newfoundland and Labrador', 'Schools Act, 1997, ss. 51.3 and 22', 'statute', 1997, 2, 'the department and the conseil scolaire', 'local authority', 'administrative appeal'],
  ['CA|Northwest Territories', 'Education Act s.7', 'statute', null, 3, 'the education body', 'local authority', 'administrative appeal'],
  ['CA|Nova Scotia', 'Regulations on individual program planning in regional centres', 'regulation', null, 4, 'a regional centre', 'local authority', 'administrative appeal'],
  ['CA|Nunavut', 'Education Act ss.2 and 41', 'statute', null, 3, null, 'not stated', 'administrative appeal'],
  ['CA|Ontario', 'IPRC identification leading to an Individual Education Plan', 'regulation', null, 4, 'the IPRC', 'statutory body', 'specialist commission'],
  ['CA|Prince Edward Island', 'Education Act s.42', 'statute', null, 2, 'the Minister', 'ministry', 'administrative appeal'],
  ['CA|Quebec', 'Loi sur l’instruction publique, arts. 96.14, 234 and 235', 'statute', null, 4, 'the commission scolaire and the school principal', 'local authority', 'not stated'],
  ['CA|Saskatchewan', 'Education Act 1995, ss. 146, 178(8), 178(9) and 178.1', 'statute', 1995, 2, 'the board', 'local authority', 'administrative appeal'],
  ['CA|Yukon', 'Education Act s.15', 'statute', null, 4, 'school administration', 'school', 'specialist commission'],

  ['AU|Australian Capital Territory', 'Education Act 2004', 'statute', 2004, 1, 'the education provider', 'school', 'not stated'],
  ['AU|New South Wales', 'Support Class Early Intervention placement criteria', 'scheme', null, 0, null, 'not stated', 'not stated'],
  ['AU|Northern Territory', 'Education Act 2015', 'statute', 2015, 3, 'the CEO', 'ministry', 'specialist commission'],
  ['AU|Queensland', 'Education (General Provisions) Act 2006', 'statute', 2006, 1, 'the chief executive', 'ministry', 'administrative appeal'],
  ['AU|South Australia', 'Education and Children’s Services Act 2019', 'statute', 2019, 1, 'the school', 'school', 'not stated'],
  ['AU|Tasmania', 'Education Act 2016', 'statute', 2016, 1, 'administrators', 'school', 'not stated'],
  ['AU|Victoria', 'Equal Opportunity Act 2010, with the Education and Training Reform Act 2006', 'statute', 2010, 3, 'an educational authority', 'school', 'specialist commission'],
  ['AU|Western Australia', 'School Education Act 1999', 'statute', 1999, 1, 'the school principal', 'school', 'administrative appeal'],

  ['GB|England', 'Children and Families Act 2014', 'statute', 2014, 4, 'the local authority', 'local authority', 'not stated'],
  ['GB|Northern Ireland', 'Education (Northern Ireland) Order 1996, art. 16', 'statute', 1996, 4, 'the Authority', 'statutory body', 'specialist commission'],
  ['GB|Scotland', 'Education (Additional Support for Learning) (Scotland) Act 2004, s.4', 'statute', 2004, 2, 'every education authority', 'local authority', 'specialist commission'],
  ['GB|Wales', 'ALNET (Wales) Act 2018, s.12', 'statute', 2018, 4, 'a school', 'school', 'specialist commission'],

  ['BE|Belgium — French Community (Wallonia-Brussels Federation)', 'Décret of 7 December 2017', 'decree', 2017, 4, 'the school', 'school', null],
  ['ES|Catalonia', 'Llei 12/2009, art. 82', 'statute', 2009, 2, 'the education administration', 'regional government', 'not stated'],
  ['ES|Catalonia', 'Decret 150/2017', 'decree', 2017, 2, 'the education administration', 'regional government', 'not stated'],
  ['HK|Hong Kong', '2019 Education Bureau circular on the enhanced school-based speech therapy service', 'regulation', 2019, 2, 'schools', 'school', 'not stated'],
  ['HK|Hong Kong', 'Learning support grant, with which a school without the service buys it in', 'scheme', null, 2, 'schools', 'school', 'not stated'],
];
for (const r of REST) row(...r);

/* ---------- emit --------------------------------------------------------- */
const out = {};
for (const [key, instrument, type, year, obliges, org, duty, redress] of R) {
  const cell = { instrument };
  if (type != null) cell.instrument_type = type;
  if (year != null) cell.instrument_year = year;
  if (obliges != null) cell.obliges = obliges;
  if (org != null) cell.duty_org = org;
  if (duty != null) cell.duty_type = duty;
  if (redress != null) cell.redress_type = redress;
  (out[key] ||= { legalEntitlement: [] }).legalEntitlement.push(cell);
}
fs.writeFileSync('research/codings/legalentitlement-subnational.json', JSON.stringify(out, null, 2) + '\n');
console.log('units', Object.keys(out).length, 'rows', R.length);
