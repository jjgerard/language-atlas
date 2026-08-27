// Scotland and Northern Ireland on the Indigenous and regional languages map.
//
//     node uk-indigenous.js            # validate
//     node uk-indigenous.js --write
//
// Both were complete stubs -- nothing in any field -- while Wales and Ireland
// were documented. Not a hard case: Gaelic, Scots, Irish and Ulster Scots all
// have their own statutes, and every bullet below comes from the instrument
// itself on legislation.gov.uk, retrieved and read in session.
//
// Two dates are doing real work and are kept rather than smoothed away. The
// Ulster Scots education duty was NOT in force when the 2022 Act received
// Royal Assent; it commenced on 26 February 2025. The same commencement order
// repealed the Administration of Justice (Language) Act (Ireland) 1737. An
// entry that said only "the Department must encourage Ulster Scots" would read
// as a duty that had been running since 2022.
const fs = require("fs");
const path = require("path");
const { apply, ATLAS } = require("./fl/apply");

const NL = String.fromCharCode(10);

const L = {
  ni1998: { label: "Education (Northern Ireland) Order 1998, art. 89 (Irish-medium education)", url: "https://www.legislation.gov.uk/nisi/1998/1759/article/89/made" },
  ni2022: { label: "Identity and Language (Northern Ireland) Act 2022, s. 5 (Ulster Scots in education)", url: "https://www.legislation.gov.uk/ukpga/2022/45/section/5" },
  ni2022c: { label: "Identity and Language (Northern Ireland) Act 2022, s. 3 (Commissioner for the Ulster Scots and the Ulster British tradition)", url: "https://www.legislation.gov.uk/ukpga/2022/45/section/3" },
  ni1737: { label: "Identity and Language (Northern Ireland) Act 2022, s. 4 (repeal of the Administration of Justice (Language) Act (Ireland) 1737)", url: "https://www.legislation.gov.uk/ukpga/2022/45/section/4" },
  sc2025status: { label: "Scottish Languages Act 2025, s. 1 (status of the Gaelic language)", url: "https://www.legislation.gov.uk/asp/2025/10/section/1" },
  sc2025scots: { label: "Scottish Languages Act 2025, s. 33 (status of the Scots language)", url: "https://www.legislation.gov.uk/asp/2025/10/section/33" },
  sc2025ed: { label: "Scottish Languages Act 2025, s. 40 (Scots language education in schools)", url: "https://www.legislation.gov.uk/asp/2025/10/section/40" },
  sc2016: { label: "Education (Scotland) Act 2016, s. 7 (assessment requests for Gaelic medium primary education)", url: "https://www.legislation.gov.uk/asp/2016/8/section/7" },
  sc2005: { label: "Gaelic Language (Scotland) Act 2005", url: "https://www.legislation.gov.uk/asp/2005/7/contents" },
};

const SPEC = {
  "GB|Scotland": {
    confidence: "official-document",
    by: "Read from the Acts on legislation.gov.uk (2026)",
    docLinks: [L.sc2005, L.sc2016, L.sc2025status, L.sc2025scots, L.sc2025ed],
    fields: {
      localTerm: [
        "Statute names them directly: 'the Gaelic language' and 'the Scots language'",
        "Gaelic carried its own Act from 2005; Scots is named in statute from 2025",
      ],
      standing: [
        "Gaelic has official status within Scotland, as s. A1 of the 2005 Act",
        "Scots has official status within Scotland, Scottish Languages Act 2025 s. 33",
        "Each status takes legal effect only through the duties those Acts create",
        "Neither affects another enactment, rule of law, or another language's status",
      ],
      mediumOfInstruction: [
        "A parent may ask the authority to assess the need for Gaelic medium primary education",
        "Education (Scotland) Act 2016 s. 7, for a child under school age not yet in primary",
        "The request must set out evidence of demand from parents of other children",
        "The 2025 Act adds a Ministers' duty to promote Gaelic education, 2016 Act s. 6A",
      ],
      taughtAsSubject: [
        "Ministers must promote, facilitate and support Scots language education in schools",
        "Education authorities carry the same duty for the schools under their management",
        "Scottish Languages Act 2025 s. 40, in Part 2 Chapter 2",
      ],
      materials: [
        "Ministers must support provision of adequate Scots-language education resources",
        "For use in school education by teachers and pupils, 2025 Act s. 40(2)",
        "The 2016 Act carries a parallel section on producing school resources in Gaelic",
      ],
    },
    history: [
      { year: 2005, description: "Gaelic Language (Scotland) Act establishes Bord na Gaidhlig and Gaelic language plans" },
      { year: 2016, description: "Education (Scotland) Act s. 7 lets a parent request an assessment of the need for Gaelic medium primary education" },
      { year: 2025, description: "Scottish Languages Act gives Gaelic and Scots official status within Scotland and adds duties on Scots education in schools" },
    ],
  },

  "GB|Northern Ireland": {
    confidence: "official-document",
    by: "Read from the legislation on legislation.gov.uk (2026)",
    docLinks: [L.ni1998, L.ni2022, L.ni2022c, L.ni1737],
    fields: {
      localTerm: [
        "Statute says 'Irish-medium education', and separately 'Ulster Scots'",
        "The 2022 Act pairs Ulster Scots with 'the Ulster British tradition'",
      ],
      standing: [
        "A Commissioner for the Ulster Scots and the Ulster British tradition is appointed",
        "Jointly by the First Minister and deputy First Minister, 2022 Act s. 3",
        "The same Act repealed the Administration of Justice (Language) Act (Ireland) 1737",
        "That repeal took effect on 26 February 2025, not at Royal Assent",
      ],
      mediumOfInstruction: [
        "The Department must encourage and facilitate the development of Irish-medium education",
        "Education (Northern Ireland) Order 1998 art. 89(1)",
        "It may pay grants to bodies whose object is promoting Irish-medium education",
        "New Irish-speaking voluntary schools may be approved on terms it sets, art. 89(3)",
      ],
      taughtAsSubject: [
        "Duty is to encourage and facilitate use and understanding of Ulster Scots",
        "In the education system, art. 89A of the 1998 Order",
        "Inserted by the Identity and Language (Northern Ireland) Act 2022 s. 5",
        "Not in force at Royal Assent; in force 26 February 2025 by S.I. 2025/214",
      ],
    },
    history: [
      { year: 1998, description: "Education (NI) Order art. 89 puts the Department under a duty to encourage and facilitate the development of Irish-medium education" },
      { year: 2022, description: "Identity and Language (NI) Act creates the Irish Language Commissioner and a Commissioner for the Ulster Scots and the Ulster British tradition" },
      { year: 2025, description: "On 26 February the Ulster Scots education duty commences and the Administration of Justice (Language) Act (Ireland) 1737 is repealed" },
    ],
  },
};

const history = {}, spec = {};
for (const [key, s] of Object.entries(SPEC)) {
  const { history: h, ...rest } = s;
  if (h) history[key] = h;
  spec[key] = rest;
}

const out = apply("indigenous", spec);
if (!out) process.exit(1);

for (const [key, rows] of Object.entries(history)) {
  const [cc, name] = key.split("|");
  const e = out.rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) { console.log("  no entry for " + key); continue; }
  e.policyHistory = [...(e.policyHistory || []), ...rows].sort((a, b) => a.year - b.year);
  console.log("  " + key + ": " + e.policyHistory.length + " history rows");
}

if (process.argv.includes("--write")) {
  fs.writeFileSync(out.FILE, JSON.stringify(out.rows, null, 1) + NL);
  console.log("  wrote " + path.basename(out.FILE));
} else {
  console.log("  (dry run - pass --write)");
}
