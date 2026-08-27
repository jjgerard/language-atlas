// Write the dld fields drawn from the UNESCO PEER inclusion profiles.
//
//     node peer-apply.js            # validate, write nothing
//     node peer-apply.js --write
//
// Every bullet here traces to a passage in research/peer/<CC>.md, which is the
// extracted text of a profile retrieved in session with its HTTP status
// recorded. Nothing is drawn from the headings alone.
//
// THE HEDGE IS NOT OPTIONAL. PEER writes about disability and special
// educational needs as a whole and almost never says "speech" or "language
// disorder". Every field below therefore opens with a bullet saying so. Without
// it the entry claims a precision the source does not have, and a reader would
// take an SEN-wide identification route for a language-disorder one.
//
// A second hedge applies to some: PEER's own pages now carry a banner saying
// the platform has moved and these profiles are no longer updated. Where a
// profile plainly describes a system that has since changed, that is said.
//
// policyHistory is merged rather than assigned. apply.js sets
// `e.policyHistory = s.history`, which is right for an entry gaining its first
// timeline and would silently drop Gabon's two existing rows.
const fs = require("fs");
const path = require("path");
const { apply, ATLAS } = require("./fl/apply");

const PEER_URL = {
  KE: "https://education-profiles.org/sub-saharan-africa/kenya/~inclusion",
  NP: "https://education-profiles.org/central-and-southern-asia/nepal/~inclusion",
  AF: "https://education-profiles.org/central-and-southern-asia/afghanistan/~inclusion",
  GA: "https://education-profiles.org/sub-saharan-africa/gabon/~inclusion",
};
const link = cc => ({ label: "UNESCO GEM Report PEER, country profile: inclusion", url: PEER_URL[cc] });

const SEN = "Source describes special-needs provision generally, never language disorder";
const STALE = "PEER profile is no longer updated and describes the system before 2021";

const SPEC = {
  "KE|Kenya": {
    confidence: "secondary-source",
    addDocLinks: [link("KE")],
    fields: {
      identificationCriteria: [
        SEN,
        "Education Assessment Resource Centres identify and assess children with disabilities",
        "EARC teams are multiprofessional: teachers plus social and medical workers",
        "The 2018 Sector Policy was still developing assessment and identification procedures",
      ],
      referralPathway: [
        SEN,
        "One route covers early identification, assessment, intervention and placement",
        "EARCs also decide which education provision and services suit the child",
        "2018 Sector Policy adds EARCs at national, county and sub-county level",
      ],
      workforce: [
        SEN,
        "Teacher training on inclusion runs through in-service initiatives",
        "Named examples are Education for Marginalized Children and Child-Friendly Schools",
      ],
    },
    history: [
      { year: 2013, description: "Technical and Vocational Education and Training Act Art. 32 covers training for persons with special needs" },
      { year: 2018, description: "Sector Policy for Learners and Trainees with Disabilities sets out assessment and early-identification procedures" },
    ],
  },

  "NP|Nepal": {
    confidence: "secondary-source",
    addDocLinks: [link("NP")],
    fields: {
      legalEntitlement: [
        SEN,
        "2015 Constitution Art. 31 gives all citizens access to basic education",
        "Art. 18 bars discrimination on physical condition, health condition or language",
        "1971 Education Act, 7th Amendment 2001, funds community schooling for named groups",
      ],
      workforce: [
        SEN,
        "There is no mandatory teacher training policy on inclusive education",
        "The National Center for Educational Development trains school teachers",
        "The 2016-23 School Sector Development Plan aims at inclusive-education courses",
      ],
      funding: [
        SEN,
        "The Equity Index informs national and local planning and budget allocation",
        "It derives from household and school census data, disability among its inputs",
      ],
    },
    history: [
      { year: 1996, description: "Special Education Policy sets out special, integrated and resource-class provision" },
      { year: 2001, description: "Seventh Amendment to the 1971 Education Act makes community schooling free for named groups" },
      { year: 2014, description: "Consolidated Equity Strategy for the School Education Sector adopted" },
      { year: 2015, description: "Constitution Art. 31 lays down access to basic education for all citizens" },
      { year: 2017, description: "Equity Index launched to operationalize the Consolidated Equity Strategy" },
    ],
  },

  "AF|Afghanistan": {
    confidence: "secondary-source",
    addDocLinks: [link("AF")],
    fields: {
      legalEntitlement: [
        STALE,
        "Constitution Art. 43 makes education a right, free to bachelor level",
        "Basic education is compulsory to grade 9 under the same article",
        "The 2008 Education Law aims at universal, balanced and equitable education",
      ],
      workforce: [
        STALE,
        "Fundamentals of Inclusion and Special Needs Education was in development in 2019",
        "It was to become a compulsory credit course in the education plan",
        "UNESCO's Embracing Diversity toolkit was translated into Dari and Pashto",
      ],
      outcomesEvidence: [
        STALE,
        "No data existed on developmental impairment, autism, ADHD or multiple impairments",
        "No comprehensive figure for the prevalence or number of children with disabilities",
        "The 2018 Out-of-school Children report works from existing data only",
      ],
    },
    notEstablished: {
      identifiedPrevalence: "Not established from the sources consulted. The UNESCO PEER inclusion profile records that no comprehensive data exists on the prevalence or number of children with disabilities, and specifically none on developmental impairment. The profile describes the system before 2021 and is no longer updated.",
    },
    history: [
      { year: 2008, description: "Education Law aims at universal, balanced and equitable education" },
      { year: 2008, description: "Coordination Working Group on Inclusive Education established, co-chaired by UNESCO and the Ministry of Education" },
      { year: 2010, description: "Convention against Discrimination in Education ratified" },
      { year: 2013, description: "National Literacy Strategy targets people with disabilities among its groups" },
      { year: 2014, description: "Inclusive and Child-Friendly Education Policy signed in December, still not implemented in 2018" },
    ],
  },

  "GA|Gabon": {
    confidence: "secondary-source",
    addDocLinks: [link("GA")],
    fields: {
      legalEntitlement: [
        SEN,
        "The 1991 Constitution guarantees equal access to education, not a right to it",
        "Gabon has not ratified the Convention against Discrimination in Education",
        "It ratified the Convention on the Rights of Persons with Disabilities in 2007",
        "Act 21/2011 Art. 2 makes education compulsory for all aged 3 to 16",
      ],
      outcomesEvidence: [
        SEN,
        "Gabon has no education monitoring report and no sectoral plan",
        "The last statistical collection was 2012-13 and its results were never published",
        "A UN-backed programme signed in 2018 aims to produce the first yearbooks",
      ],
    },
    notEstablished: {
      identifiedPrevalence: "Not established from the sources consulted. The UNESCO PEER inclusion profile records that Gabon has no education monitoring report or sectoral plan, and that the last statistical collection, in 2012-13, was never published. No count of pupils with a language disorder exists to cite.",
    },
    history: [
      { year: 1985, description: "Order 0012/MASSSBE/DGAS of 5 November places the school for deaf children under ministry supervision" },
      { year: 1989, description: "The school becomes the National School for Hearing Impaired Children (ENEDA)" },
      { year: 2007, description: "Convention on the Rights of Persons with Disabilities ratified" },
      { year: 2012, description: "Act 21/2011 on general guidelines for education, training and research adopted on 14 February" },
    ],
  },
};

// ---- split history out; apply.js assigns it and would drop what is there ----
const history = {};
const spec = {};
for (const [key, s] of Object.entries(SPEC)) {
  const { history: h, ...rest } = s;
  if (h) history[key] = h;
  spec[key] = rest;
}

const out = apply("dld", spec);
if (!out) process.exit(1);

const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
let added = 0, dupes = 0;
for (const [key, rows] of Object.entries(history)) {
  const [cc, name] = key.split("|");
  const e = out.rows.find(r => r.countryCode === cc && r.unitName === name);
  if (!e) { console.log("  no entry for " + key); continue; }
  const have = new Set((e.policyHistory || []).map(h => h.year + "|" + norm(h.description)));
  const fresh = rows.filter(r => !have.has(r.year + "|" + norm(r.description)));
  dupes += rows.length - fresh.length;
  e.policyHistory = [...(e.policyHistory || []), ...fresh].sort((a, b) => a.year - b.year);
  added += fresh.length;
}
console.log("  policyHistory merged: +" + added + " rows, " + dupes + " already present");

if (process.argv.includes("--write")) {
  fs.writeFileSync(out.FILE, JSON.stringify(out.rows, null, 1) + "\n");
  console.log("  wrote " + path.basename(out.FILE));
} else {
  console.log("  (dry run — pass --write)");
}
