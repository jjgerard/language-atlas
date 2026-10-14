// Builds the researcher directory behind /collaborate/researchers.
//
//     node research/tools/build-researchers.js
//
// Reads https://nicdrn.com/network.php (the NI Child Development Research
// Network's member list) and writes research/collaborate/researchers.json,
// copied to public/collaborate/ because the page fetches it.
//
// Three rules, in order of how easily they are broken:
//
//  1. The link is the researcher's PURE profile, not the network page. Where
//     the network links somewhere else (one member is at St Mary's, which has
//     no PURE) the link is kept as given and marked profileKind "staff-page".
//
//  2. Topics are the network's own bullet points where it lists any. Only where
//     it lists none are they taken from the PURE profile — its "Fingerprint",
//     the topic terms Elsevier's engine derives from the person's outputs. The
//     source of every researcher's topics is recorded (topicsFrom), and the
//     fingerprint terms dropped as not-topics are kept in pureDropped, so the
//     filtering can be audited rather than trusted.
//
//  3. Nothing is written about a researcher that neither page says. A profile
//     with no fingerprint (topicsFrom "none") shows no topics; it is not
//     filled in from the person's publications or anyone's guess.
//
// A fingerprint is machine-derived and noisy: places ("UK"), methods ("Focus
// Group"), and PURE's own catch-all ("Economic and Social Development") appear
// as the top term for people they say nothing useful about. NOT_TOPICS removes
// those, mechanically and visibly. It is a stoplist, not a judgement about
// what a researcher "really" works on.

const fs = require('fs');
const path = require('path');

const NETWORK = 'https://nicdrn.com/network.php';
const UA = 'language-atlas build-researchers (contact: jgerard417@gmail.com)';
const OUT = path.join(__dirname, '..', 'collaborate', 'researchers.json');
const PUB = path.join(__dirname, '..', '..', 'public', 'collaborate', 'researchers.json');
const MAX_TOPICS = 5;

const NOT_TOPICS = new Set([
  // places
  'UK', 'Ireland', 'Republic of Ireland', 'Northern Ireland', 'Ghana', 'Belgium',
  'The Former Yugoslav Republic of Macedonia', 'Ulster', 'Bonn',
  // PURE's catch-all
  'Economic and Social Development',
  // methods and study types: how the work was done, not what it is about
  'Focus Group', 'Case Study', 'Systematic Review', 'Scoping Review', 'Meta-Analysis',
  'Thematic Analysis', 'Longitudinal Analysis', 'Analysis of Variance',
  'Multiple Regression Analysis', 'Factor Analysis', 'Regression Analysis',
  'Randomized Controlled Trial', 'Research Results', 'Research Collaboration',
  'Student Perception',
  // too generic to tell one researcher from another
  'English', 'Interactive', 'Online', 'Digital', 'Traits',
]);

const dec = s => String(s)
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&#8212;/g, '—').replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n));
const slug = s => dec(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA } });
      if (res.ok) return { html: await res.text(), url: res.url };
    } catch { /* retry */ }
    await sleep(1500);
  }
  throw new Error('could not fetch ' + url);
}

function parseNetwork(html) {
  const body = html.slice(html.indexOf('<h1>Our Researchers'));
  const re = /<h2>([^<]+)<\/h2>|<div class="col mb-2"><div class="card">(.*?)<\/ul><\/div><\/div>(?=<div class="col mb-2">|<\/div>)/gs;
  const out = [];
  let role = 'researcher', m;
  while ((m = re.exec(body))) {
    if (m[1]) { role = /lead/i.test(m[1]) ? 'lead' : 'researcher'; continue; }
    const c = m[2];
    const a = /<a class="stretched-link" href="([^"]+)">([^<]+)<\/a>/.exec(c);
    const inst = /card-text[^>]*>([^<]+)</.exec(c);
    if (!a || !inst) throw new Error('network page changed shape near: ' + c.slice(0, 120));
    const nested = [...c.matchAll(/<li class="list-group-item"><ul>(.*?)<\/ul><\/li>/gs)]
      .flatMap(x => [...x[1].matchAll(/<li>([^<]*)<\/li>/g)].map(y => dec(y[1]).trim()));
    // The flat list-group items are the research areas; the one that wraps a
    // nested <ul> is the bullet topics and is read separately above.
    const areas = [...c.matchAll(/<li class="list-group-item">([^<]*)<\/li>/g)].map(x => dec(x[1]).trim());
    const [university, dept] = dec(inst[1]).split(' — ');
    out.push({ name: dec(a[2]).trim(), role, url: a[1], university, dept: dept || null, areas, topics: nested });
  }
  return out;
}

function parsePure(html) {
  const concepts = [...html.matchAll(/<span class="concept">([^<]+)<\/span>\s*<span class="thesauri">([^<]*)<\/span>\s*<span class="value sr-only">(\d+)%/g)]
    .map(m => ({ term: dec(m[1]).trim(), weight: Number(m[3]) }));
  const jobs = [...html.matchAll(/<span class="job-title">([^<]*)<\/span>,\s*<a rel="Organisation"[^>]*><span>([^<]*)<\/span>/g)]
    .map(m => dec(m[1]) + ', ' + dec(m[2]));
  const h1 = /<h1>([^<]+)<\/h1>/.exec(html);
  return { concepts, jobs, h1: h1 && dec(h1[1]).trim() };
}

(async () => {
  const net = await get(NETWORK);
  const people = parseNetwork(net.html);
  if (people.length < 20) throw new Error('only ' + people.length + ' researchers parsed — has the page changed?');

  // Areas arrive in mixed case ("Cognitive development" / "Cognitive Development").
  const areaLabel = new Map();
  for (const p of people) for (const a of p.areas) if (!areaLabel.has(slug(a))) areaLabel.set(slug(a), a);

  const researchers = [];
  for (const p of people) {
    const isPure = /\/\/pure\.(ulster|qub)\.ac\.uk\//.test(p.url);
    const r = {
      id: slug(p.name),
      name: p.name,
      role: p.role,
      university: p.university,
      dept: p.dept,
      profileUrl: p.url,
      profileKind: isPure ? 'pure' : 'staff-page',
      areas: p.areas.map(slug),
      topics: [],
      topicsFrom: 'none',
      topicsUrl: null,
    };
    if (p.topics.length) {
      r.topics = p.topics; r.topicsFrom = 'network'; r.topicsUrl = NETWORK;
    }
    if (isPure) {
      const pure = await get(p.url); await sleep(800);
      const { concepts, jobs, h1 } = parsePure(pure.html);
      // Guards the one way this can go quietly wrong: a "-2" slug that is a
      // different person with the same name.
      r.pureName = h1;
      r.pureRole = jobs[0] || null;
      if (!p.topics.length && concepts.length) {
        const kept = concepts.filter(c => !NOT_TOPICS.has(c.term));
        r.topics = kept.slice(0, MAX_TOPICS).map(c => c.term);
        r.pureDropped = concepts.filter(c => NOT_TOPICS.has(c.term)).map(c => c.term);
        if (r.topics.length) { r.topicsFrom = 'pure-fingerprint'; r.topicsUrl = pure.url; }
      }
    }
    researchers.push(r);
    console.log(r.id.padEnd(26), r.topicsFrom.padEnd(16), (r.pureRole || '').padEnd(48), r.topics.join('; '));
  }

  const doc = {
    retrieved: new Date().toISOString().slice(0, 10),
    source: { network: NETWORK },
    note: 'Researchers and research areas as listed by the NI Child Development Research Network. Topics are the network\'s own bullet points where it lists any; otherwise the top terms of the researcher\'s PURE fingerprint after dropping places, methods and generic terms (see pureDropped). A researcher with no fingerprint has no topics shown.',
    areas: [...areaLabel].map(([id, label]) => ({ id, label })),
    researchers,
  };
  for (const f of [OUT, PUB]) {
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, JSON.stringify(doc, null, 1) + '\n');
  }
  console.log(`\n${researchers.length} researchers → ${path.relative(process.cwd(), OUT)} (+ public copy)`);
})().catch(e => { console.error(e); process.exit(1); });
