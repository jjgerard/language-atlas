// Adds to the children's organisation list every recipient of a children's award
// in the Government Funding Database (2024-25) that the list does not already hold
// (ni-gfd-analysis.json, unlistedChildrenCandidates). Each gets orgId g###, a
// "gov funding" basis per award row (programme, amount, year, the portal URL), and,
// where its name matches the Charity Commission NI register, its register number
// and latest return. Idempotent: an organisation already added keeps its id.
//
// Register matching is deliberately strict (exact normalised name or "other name",
// else every distinctive word of the shorter name in the longer, two words or more).
// An unmatched organisation is left unmatched, never guessed.
//
// Run: node research/tools/add-gfd-orgs.js <ccni.json full register export>
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));
const CCNI = process.argv[2];
if (!CCNI) { console.error('usage: add-gfd-orgs.js <ccni.json>'); process.exit(1); }

const orgsFile = path.join(R, 'ni-vcs-orgs.json');
const list = read('ni-vcs-orgs.json');
const cand = read('ni-gfd-analysis.json').unlistedChildrenCandidates;
const gfdRows = read('ni-gfd.json').rows;
const healthRows = read('ni-health-published.json').figures.filter(f => f.source === 'Government Funding Database');
const full = JSON.parse(fs.readFileSync(CCNI, 'utf8')).filter(r => !/^Removed/.test(r.Status));
const PORTAL = 'https://govfundingpublic.nics.gov.uk/GrantsAwarded.aspx';

const norm = s => String(s || '').toLowerCase().replace(/&/g, 'and').replace(/\(.*?\)/g, ' ').replace(/\b(ltd|limited|the|clg|cic|ni|northern ireland)\b/g, ' ').replace(/[^a-z0-9]/g, '');
const GENERIC = new Set(['youth', 'club', 'centre', 'center', 'community', 'group', 'association', 'project', 'and', 'the', 'of', 'for', 'ltd', 'limited', 'ni', 'northern', 'ireland', 'trust', 'services', 'service', 'children', 'family', 'families', 'young', 'people', 'partnership', 'development', 'company', 'charity', 'network', 'programme', 'playgroup', 'pre', 'school', 'preschool']);
const toks = s => new Set(String(s || '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !GENERIC.has(w)));
const exact = new Map(); for (const r of full) for (const n of [r['Charity name'], r['Other name']].filter(Boolean)) { const k = norm(n); if (k.length >= 5) exact.set(k, exact.has(k) ? null : r); }
const words = full.map(r => [toks(r['Charity name']), r]).filter(([w]) => w.size >= 2);
const matchReg = name => { const e = exact.get(norm(name)); if (e) return { r: e, by: 'exact name' };
  if (e === null) return null; // ambiguous exact name
  const tw = toks(name); if (tw.size < 2) return null;
  const hits = words.filter(([w]) => [...w].every(x => tw.has(x)) || [...tw].every(x => w.has(x)));
  return hits.length === 1 ? { r: hits[0][1], by: 'distinctive words' } : null; };

const existing = new Map(list.orgs.filter(o => o.orgId && /^g\d+$/.test(o.orgId)).map(o => [o.name, o]));
let next = Math.max(0, ...[...existing.values()].map(o => +o.orgId.slice(1))) + 1;
const CHILD = /child|youth|young|famil|early years|sure ?start|play ?group|pre-?school|parent|baby|infant|teen|junior|nursery|toddler|school/i;
let added = 0, matched = 0;
for (const c of cand) {
  if (existing.has(c.organisation)) continue;
  const rowsFor = gfdRows.filter(r => r.organisation === c.organisation && /2024\/2025/.test(r.finYear) && CHILD.test([r.fundingTitle, r.grantTitle, r.branch].join(' ')))
    .concat(healthRows.filter(f => f.provider === c.organisation && /2024/.test(f.year || '') && CHILD.test([f.label, f.service, f.payer].join(' '))).map(f => ({ department: 'DOH', branch: String(f.payer || '').replace(/^DOH\s*\/\s*/, ''), fundingTitle: f.label, grantTitle: f.service, finYear: f.year, awarded: f.value })));
  const m = matchReg(c.organisation);
  const o = {
    orgId: 'g' + String(next++).padStart(3, '0'), name: c.organisation, aliases: [], regNo: m ? m.r['Reg charity number'] : null, regNoBy: m ? 'register ' + m.by + ' (add-gfd-orgs)' : null, gbCharityNo: null,
    basis: rowsFor.map(r => ({ type: 'gov funding', detail: `Government Funding Database: ${r.department} / ${r.branch} / ${r.fundingTitle}${r.grantTitle ? ' / ' + r.grantTitle : ''}`, amount: '£' + r.awarded, year: '2024-25', relationship: 'grant', url: PORTAL, source: 'gfd' })),
    gfdAward2425: c.gbp, gfdRank: cand.indexOf(c) + 1,
  };
  if (m) { const r = m.r; o.register = { name: r['Charity name'], status: r.Status, fyEnd: r['Date for financial year ending'], income: r['Total income'], spending: r['Total spending'], incomePrev: r['Total income. Previous financial period.'], staff: r['Employed staff'], who: (r['Who the charity helps'] || '').split(',').filter(Boolean) }; matched++; }
  o.basisTypes = ['gov funding'];
  list.orgs.push(o); added++;
}
fs.writeFileSync(orgsFile, JSON.stringify(list, null, 1));
const g = list.orgs.filter(o => /^g\d+$/.test(o.orgId || ''));
console.log(`added ${added}; GFD organisations now ${g.length}, ${g.filter(o => o.regNo).length} matched to the register (${matched} this run)`);
