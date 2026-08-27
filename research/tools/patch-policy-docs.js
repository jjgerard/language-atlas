// Adds primary policy documents (and the content they unlock) to existing
// worked entries. Field edits and docLinks are applied together so no claim
// is added without the source that supports it.
const fs = require("node:fs");
const OUT = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker/data/seed.json";
const seed = JSON.parse(fs.readFileSync(OUT, "utf8"));

const PATCHES = {
  "ZA|South Africa": {
    // The statutory frame was missing entirely — the entry described the
    // research literature but not the policy the system actually runs on.
    confidence: "secondary-source",
    legalEntitlement:
      "Runs through inclusive-education policy rather than through a diagnosis. Education White Paper 6 (2001) set the national strategy for an inclusive education and training system, and the Screening, Identification, Assessment and Support (SIAS) policy (Department of Basic Education, 2014) operationalises it as a standardised process for identifying barriers to learning and allocating support. " +
      "Entitlement therefore attaches to assessed support need under SIAS, not to a language-disorder diagnosis.",
    referralPathway:
      "Under SIAS, screening and identification start at school level with the School-Based Support Team (SBST), which escalates to the District-Based Support Team (DBST) where the school cannot meet the need. " +
      "Support decided at district level may include strengthening the school's Individual Learner Support Plan (ILSP), classroom-level remedial support, educational-psychological assessment, assistive devices, speech and occupational therapy, or special-school placement — so speech and language therapy is named in policy as one option within a graduated response rather than as an entitlement in itself.",
    addDocLinks: [
      { label: "Education White Paper 6 — inclusive education (summary factsheet)", url: "http://www.included.org.za/R2ecwdsite/docs/Factsheet%203.pdf" },
      { label: "Report on the implementation of Education White Paper 6 (Parliamentary Monitoring Group)", url: "https://static.pmg.org.za/160308overview.pdf" },
      { label: "McKenzie et al. — universal design for learning in South African inclusive education policy (describes SIAS)", url: "https://ajod.org/index.php/ajod/article/view/776/1484" },
      { label: "Inclusive education in South Africa: path dependencies and emergences", url: "https://www.tandfonline.com/doi/full/10.1080/13603116.2022.2061608" },
    ],
    addPolicyHistory: [
      { year: "2001", description: "Education White Paper 6 sets the national strategy for an inclusive education and training system." },
      { year: "2014", description: "Screening, Identification, Assessment and Support (SIAS) policy operationalises White Paper 6 as a standardised graduated-response process, naming speech therapy among the support options at district level." },
    ],
  },

  "SE|Sweden": {
    serviceModel:
      "Split. Assessment and therapy sit with logopedi services run by the regions (regioner), including habilitering services for children with more complex needs; educational adaptation sits with schools. " +
      "Language disorder is understood as affecting learning across every school subject rather than being a discrete speech problem, so the school-side response is curriculum-wide adaptation rather than only therapy. " +
      "The National Agency for Special Needs Education and Schools (SPSM) sits alongside both: it provides advisory support and specialist educational assessment to municipalities and schools, funds accessible teaching materials and state grants, and runs ten state specialskolor, which include provision for pupils with severe language disorder (grav språkstörning).",
    resources:
      "SPSM's Studiepaket språkstörning — a six-module training package for staff working with pupils with språkstörning, covering language-developing teaching, accessible learning environments and assessment/grading questions, with a companion module aimed at mathematics teachers; " +
      "Afasiförbundet / Talknuten (parent and user organisation); DLD-dagen awareness campaigning; Internetmedicin clinical overview for school health services; Processtöd and Legilexi as practitioner-facing knowledge bases.",
    addDocLinks: [
      { label: "SPSM — språkstörning (national agency guidance)", url: "https://www.spsm.se/funktionsnedsattningar/sprakstorning/" },
      { label: "SPSM — Studiepaket språkstörning (staff training package)", url: "https://www.spsm.se/studiepaket-sprakstorning/" },
    ],
  },

  "CA|Ontario": {
    // Now cites the regulation and the ministry guide directly rather than
    // board-level and legal-aid summaries.
    confidence: "official-document",
    identificationCriteria:
      "Identification is an administrative decision by an IPRC, not a clinical one: the committee is made up of at least three school board staff including the principal or superintendent, and speech-language pathologists on student services staff contribute a professional opinion rather than deciding. " +
      "O. Reg. 181/98 builds in a least-restrictive-placement presumption — before considering a special education class the committee must first consider placement in a regular class with appropriate special education services, and must decide for the regular class where that would meet the pupil's needs and is consistent with parental preference. " +
      "The criteria that matter in practice are set locally: the definition of 'language impairment' used to qualify a pupil can differ between neighbouring school boards within the same province, which makes provincial-level comparison of identification rates unsafe.",
    addDocLinks: [
      { label: "O. Reg. 181/98 — Identification and Placement of Exceptional Pupils (CanLII)", url: "https://www.canlii.org/en/on/laws/regu/o-reg-181-98/latest/o-reg-181-98.html" },
      { label: "Special education in Ontario, K–12 — policy and resource guide: identification and placement", url: "https://www.ontario.ca/document/special-education-ontario-policy-and-resource-guide-kindergarten-grade-12/identification" },
      { label: "Special education in Ontario — requirements under O. Reg. 181/98 and PPM 140/156", url: "https://www.ontario.ca/document/special-education-ontario-policy-and-resource-guide-kindergarten-grade-12/requirements" },
    ],
    addPolicyHistory: [
      { year: "1998", description: "Ontario Regulation 181/98 requires every school board to establish an IPRC, and requires the committee to consider a regular-class placement before a special education class." },
    ],
  },

  "AU|Australia": {
    legalEntitlement:
      "The clearest example in this catalog of a diagnosis that confers no entitlement. DLD is not on the NDIS list of conditions accepted as likely to meet the disability requirements, so access requires demonstrating substantially reduced functional capacity case by case, and refusals are widely reported. " +
      "Speech Pathology Australia has taken this to the NDIA directly, reporting significant variation in access decisions for lifelong communication conditions such as DLD and particularly for applicants over the age of seven. " +
      "On the education side, pupils whose only disability is a speech, language or communication disorder are unlikely to qualify for individual targeted educational funding, despite documented effects on educational participation and achievement. " +
      "The fallback, a Medicare Chronic Disease Management plan, is capped at five subsidised sessions a year.",
    workforce:
      "Speech pathology is self-regulating in Australia through Speech Pathology Australia rather than registered under AHPRA. " +
      "The 2014 Senate Community Affairs References Committee inquiry into speech, language and communication disorders and speech pathology services found gaps in supply, lengthy public-system waiting lists, and particular shortfalls in rural and remote areas. " +
      "SPA's 2023 Workforce Analysis reported that speech pathologists remain inequitably distributed and that supply is not meeting estimated population need, alongside growth of 27% in graduates and 25% in first-year enrolments; 98% of SPA members are women.",
    addDocLinks: [
      { label: "Senate Community Affairs References Committee — prevalence of speech, language and communication disorders and speech pathology services in Australia (2014)", url: "https://www.aph.gov.au/-/media/Committees/Senate/committee/clac_ctte/speech_pathology/report/report.pdf" },
      { label: "Australian Government response to the Senate speech pathology inquiry", url: "https://www.health.gov.au/sites/default/files/response-speech-pathology-services-in-australia.pdf" },
      { label: "Speech Pathology Australia — submission to the NDIS Review (2022)", url: "https://www.speechpathologyaustralia.org.au/Common/Uploaded%20files/Smart%20Suite/Smart%20Library/5a86c970-7f79-477e-8796-5677095df3a3/SPA%20submission%20NDIS%20review%2020221231.pdf" },
    ],
    addPolicyHistory: [
      { year: "2014", description: "Senate Community Affairs References Committee reports on the prevalence of speech, language and communication disorders and the availability and adequacy of speech pathology services in Australia." },
    ],
  },

  "NL|Netherlands": {
    addDocLinks: [
      { label: "Siméa — Richtlijn toelaatbaarheid (full PDF)", url: "https://simea.nl/media/richtlijnen/simea-brochure-richtlijn-toelaatbaarheid-20170901.pdf" },
    ],
  },
};

const key = (e) => `${e.countryCode}|${e.unitName}`;
const seen = new Set();
let linkCount = 0;

for (const e of seed.S) {
  const patch = PATCHES[key(e)];
  if (!patch) continue;
  seen.add(key(e));
  const { addDocLinks = [], addPolicyHistory = [], ...fields } = patch;
  Object.assign(e, fields);

  // De-duplicate by URL so re-running is safe.
  const have = new Set(e.docLinks.map((d) => d.url));
  for (const d of addDocLinks) {
    if (!have.has(d.url)) { e.docLinks.push(d); have.add(d.url); linkCount++; }
  }
  const haveYears = new Set(e.policyHistory.map((h) => h.year + "|" + h.description));
  for (const h of addPolicyHistory) {
    if (!haveYears.has(h.year + "|" + h.description)) e.policyHistory.push(h);
  }
  e.policyHistory.sort((a, b) => String(a.year).localeCompare(String(b.year)));
  e.lastVerified = "2026-08";
}

const missed = Object.keys(PATCHES).filter((k) => !seen.has(k));
if (missed.length) { console.error("No entry matched:", missed.join(", ")); process.exit(1); }

// Guard the invariants the README documents.
const bad = [];
for (const e of seed.S) {
  if (/<\/?[a-z]/i.test(JSON.stringify(e))) bad.push(`${e.unitName}: HTML markup in text`);
  if (e.status !== "stub" && !e.docLinks.length) bad.push(`${e.unitName}: worked entry with no docLinks`);
  for (const d of e.docLinks) if (!/^https?:\/\//.test(d.url)) bad.push(`${e.unitName}: bad URL ${d.url}`);
}
if (bad.length) { console.error("Invariant failures:\n  " + bad.join("\n  ")); process.exit(1); }

fs.writeFileSync(OUT, JSON.stringify(seed, null, 2) + "\n");
console.log(`Patched ${seen.size} entries, added ${linkCount} new document links.`);
const worked = seed.S.filter((e) => e.status !== "stub");
console.log(`Worked entries: ${worked.length}. Total document links: ${worked.reduce((n, e) => n + e.docLinks.length, 0)}`);
worked.forEach((e) => console.log(`  ${e.unitName.padEnd(16)} ${e.docLinks.length} links, ${e.policyHistory.length} history items`));
