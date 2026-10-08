// Merges research/children-sector/ie-bodies-batch-*.json into ie-bodies.json
// (the Irish counterpart of ni-bodies.json). Run: node research/tools/merge-ie-bodies.js
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const nb = JSON.parse(fs.readFileSync(path.join(R, 'ni-bodies.json'), 'utf8'));
const uni = JSON.parse(fs.readFileSync(path.join(R, 'ie-bodies-universe.json'), 'utf8'));
const files = fs.readdirSync(R).filter(f => /^ie-bodies-batch-[A-Z]\.json$/.test(f)).sort();
const bodies = [], questions = [], ids = new Set(), problems = [];
for (const f of files) {
  const b = JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));
  for (const x of b.bodies) {
    if (ids.has(x.id)) problems.push('duplicate id ' + x.id);
    ids.add(x.id);
    for (const fn of x.functions || []) {
      if (!fn.url || !fn.quote) problems.push(`${x.id}: function without quote/url`);
      else if (fn.quote.split(/\s+/).length > 25) problems.push(`${x.id}: quote over 25 words`);
    }
    if (x.universeName && !uni.bodies.some(u => u.name === x.universeName) && !uni.localAuthorities.some(u => u.name === x.universeName))
      problems.push(`${x.id}: universeName not in universe: ${x.universeName}`);
    if (!nb.vocab.verdict[x.verdict]) problems.push(`${x.id}: bad verdict ${x.verdict}`);
    bodies.push({ ...x, batch: b.batch });
  }
  for (const q of b.openQuestions || []) questions.push({ batch: b.batch, q });
}
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
const out = {
  unit: 'Republic of Ireland', sector: 'children', checked: '2026-10-08',
  method: 'Universe = ie-bodies-universe.json (CSO Register of Public Sector Bodies 2024, central-government Tables 3.1-3.19 and local authorities Table 4.1). Candidates were chosen by name and remit, then each checked against its own documents (website remit page, annual report, the Act); a sponsor department page was used only where the body\'s own was unreachable, and the entry says so. Several gov.ie, ncca.ie and examinations.ie pages refuse automated access, so some remits are read from Internet Archive copies of the body\'s own pages (the urls are those copies). Quotes are verbatim, at most 25 words. No FOI material. Bodies in the universe NOT listed here were screened out by name and remit WITHOUT reading their documents: see screenedOut.',
  vocab: nb.vocab, bodies,
  screenedOut: 'Every other body in ie-bodies-universe.json (e.g. the commercial corporations, the Department of Environment, Finance and Transport groups, the universities and technological universities, the 2 Extra-Budgetary funds not named here, the Table 4.2 local-authority companies) was screened out by name and remit WITHOUT reading its documents. Not a "none" verdict.',
  openQuestions: questions,
};
fs.writeFileSync(path.join(R, 'ie-bodies.json'), JSON.stringify(out, null, 1));
const c = {}; bodies.forEach(b => c[b.verdict] = (c[b.verdict] || 0) + 1);
console.log(bodies.length, 'bodies', JSON.stringify(c), questions.length, 'open questions,', bodies.reduce((n, b) => n + (b.functions || []).length, 0), 'function quotes');
