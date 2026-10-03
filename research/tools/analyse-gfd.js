// The NICS Government Funding Database (govfundingpublic.nics.gov.uk): every
// department's awards to voluntary and community organisations. Reads
// ni-gfd.json (all departments but Health) and the Health rows in
// ni-health-published.json, and writes ni-gfd-analysis.json.
//
// What it answers, for 2024-25:
//   1. how much each department and branch AWARDED to the VCSE (awards, not
//      payments: the portal publishes letters of offer, not outturn);
//   2. how much of that went to organisations on our children's list, and to
//      the children-focused ones among them;
//   3. awards whose own titles name children, young people, families or early
//      years, and how many of those go to organisations NOT on the list.
//
// Revised offers: a grant can appear as an original and a revised letter of offer.
// Where organisation, funding title, grant title and year are the same, only the
// latest (revised) offer is counted. The all-rows total is reported beside it so
// the effect of that choice is visible.
//
// Run: node research/tools/analyse-gfd.js
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'children-sector');
const read = f => JSON.parse(fs.readFileSync(path.join(R, f), 'utf8'));

const gfd = read('ni-gfd.json').rows;
const healthRows = read('ni-health-published.json').figures.filter(f => f.source === 'Government Funding Database');
// Coverage is measured against the list as built from other evidence; organisations added from
// this register (g###) would otherwise make it look complete by construction.
const orgs = read('ni-vcs-orgs.json').orgs.filter(o => o.orgId && !o.duplicateOf && !/^g\d/.test(o.orgId));
const prof = Object.fromEntries(read('ni-vcs-profiles.json').profiles.map(p => [p.orgId, p]));

const money = v => { const s = String(v == null ? '' : v).replace(/[£,\s]/g, ''); const n = parseFloat(s); return isNaN(n) ? null : n; };
const year = y => { const m = String(y || '').match(/(20\d\d)\s*[\/-]\s*(?:20)?(\d\d)/); return m ? `${m[1]}-${m[2]}` : null; };

// Health rows came from an earlier pass in another shape; bring them to the portal's.
const H = healthRows.map(f => {
  const t = String(f.label || ''), fund = (t.match(/funding title:\s*([^;]+)/i) || [])[1], status = (t.match(/grant status:\s*(.+)$/i) || [])[1];
  return { organisation: f.provider, department: 'DOH', branch: String(f.payer || '').replace(/^DOH\s*\/\s*/, ''), fundingTitle: fund ? fund.trim() : '',
    grantTitle: f.service || '', finYear: f.year, grantStatus: status ? status.trim() : '', awarded: f.value, _source: 'health pass' };
});
const all = gfd.map(r => ({ ...r, _source: 'all-departments pass' })).concat(H).map(r => ({ ...r, yr: year(r.finYear), gbp: money(r.awarded) }));

// latest offer per grant
const key = r => [r.organisation, r.department, r.branch, r.fundingTitle, r.grantTitle, r.yr].map(s => String(s || '').toLowerCase().trim()).join('|');
const rank = s => /revised/i.test(s || '') ? 2 : 1;
const latest = new Map();
for (const r of all) { if (r.gbp == null) continue; const k = key(r), cur = latest.get(k); if (!cur || rank(r.grantStatus) > rank(cur.grantStatus)) latest.set(k, r); }
const rows = [...latest.values()];

// matching to the children's list
const norm = s => String(s || '').toLowerCase().replace(/&/g, 'and').replace(/\(.*?\)/g, ' ').replace(/\b(ltd|limited|the|clg|cic|ni|northern ireland|n\.i\.)\b/g, ' ').replace(/[^a-z0-9]/g, '');
const byName = new Map();
for (const o of orgs) for (const n of [o.name, ...(o.aliases || []), o.register && o.register.name].filter(Boolean)) { const k = norm(n); if (k.length >= 5 && !byName.has(k)) byName.set(k, o); }
// Exact match first; then a branch or project under a listed name ("Barnardos
// Bangor", "NSPCC Young Witness Service", "Family Fund Trust"): the award's name
// starts with a listed name of 5+ characters, or the two share a 14-character stem.
const listedKeys = [...byName.keys()].sort((a, b) => b.length - a.length);
const GENERIC = new Set(['youth', 'club', 'centre', 'center', 'community', 'group', 'association', 'project', 'and', 'the', 'of', 'for', 'ltd', 'limited', 'ni', 'northern', 'ireland', 'trust', 'services', 'service', 'children', 'family', 'families', 'young', 'people', 'partnership', 'development', 'company', 'charity', 'network', 'programme', 'belfast']);
const toks = s => new Set(String(s || '').toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !GENERIC.has(w)));
const wordIndex = orgs.flatMap(o => [o.name, ...(o.aliases || []), o.register && o.register.name].filter(Boolean).map(n => [toks(n), o]))
  .filter(([ws]) => ws.size >= 1).sort((a, b) => b[0].size - a[0].size);
const matchCache = new Map();
const findOrg = name => { const k = norm(name); if (matchCache.has(k)) return matchCache.get(k);
  let o = byName.get(k) || null;
  if (!o && k.length >= 5) { const hit = listedKeys.find(l => (l.length >= 5 && k.startsWith(l)) || (l.length >= 14 && k.length >= 14 && l.slice(0, 14) === k.slice(0, 14))); o = hit ? byName.get(hit) : null; }
  // Word order ("YMCA Lisburn" / "Lisburn YMCA"): every distinctive word of one name
  // is in the other, with at least two such words, so "Youth Club" alone never matches.
  if (!o) { const tw = toks(name); if (tw.size >= 2) o = (wordIndex.find(([ws]) => ws.size >= 2 && [...ws].every(w => tw.has(w))) || [])[1] || null; }
  matchCache.set(k, o); return o; };
// Recipients that are public bodies, schools or housing associations are not missing VCSE organisations.
const STATUTORY = /education authority|\bcouncil\b(?! for)|\bschool\b|\bcollege\b|university|housing association|health and social care trust|\bhsc\b|\bPSNI\b/i;
const focus = o => ((prof[o.orgId] || {}).focus || {}).value;
const CHILD = /child|youth|young|famil|early years|sure ?start|play ?group|pre-?school|parent|baby|infant|teen|junior|nursery|toddler|school/i;

const y25 = rows.filter(r => r.yr === '2024-25');
const allRows25 = all.filter(r => r.yr === '2024-25' && r.gbp != null);
const byDept = {};
for (const r of y25) {
  const o = findOrg(r.organisation), d = (byDept[r.department] ||= { rows: 0, gbp: 0, allRowsGbp: 0, listed: 0, listedOrgs: new Set(), childFocused: 0, childLabelled: 0, childLabelledUnlisted: 0, unlistedChildOrgs: new Set(), branches: {} });
  d.rows++; d.gbp += r.gbp;
  (d.branches[r.branch] ||= { rows: 0, gbp: 0 }); d.branches[r.branch].rows++; d.branches[r.branch].gbp += r.gbp;
  if (o) { d.listed += r.gbp; d.listedOrgs.add(o.orgId); if (focus(o) === 'children-focused') d.childFocused += r.gbp; }
  if (CHILD.test([r.fundingTitle, r.grantTitle, r.branch].join(' '))) { d.childLabelled += r.gbp; if (!o && !STATUTORY.test(r.organisation)) { d.childLabelledUnlisted += r.gbp; d.unlistedChildOrgs.add(r.organisation); } }
}
for (const r of allRows25) if (byDept[r.department]) byDept[r.department].allRowsGbp += r.gbp;

const out = {
  built: new Date().toISOString().slice(0, 10), source: 'https://govfundingpublic.nics.gov.uk/GrantsAwarded.aspx',
  rule: 'Awards (letters of offer), not payments. 2024-25. Latest offer per grant; allRowsGbp counts original and revised offers both. "listed" = recipient matched by normalised name to the children\'s organisation list; "childLabelled" = the award\'s own funding title, grant title or branch names children, young people, families, early years or schools.',
  coverage: { departments: Object.keys(byDept), healthRowsFrom: 'earlier pass; Belfast Trust stops at 2023/24 and Northern at 2018/19, so Health 2024-25 is incomplete', council: 'the portal offers councils only for 2025/26' },
  byDept: Object.fromEntries(Object.entries(byDept).map(([k, d]) => [k, { rows: d.rows, gbp: Math.round(d.gbp), allRowsGbp: Math.round(d.allRowsGbp), listedGbp: Math.round(d.listed), listedOrgs: d.listedOrgs.size,
    childFocusedGbp: Math.round(d.childFocused), childLabelledGbp: Math.round(d.childLabelled), childLabelledUnlistedGbp: Math.round(d.childLabelledUnlisted), unlistedChildOrgs: d.unlistedChildOrgs.size,
    topBranches: Object.entries(d.branches).sort((a, b) => b[1].gbp - a[1].gbp).slice(0, 8).map(([b, v]) => ({ branch: b, rows: v.rows, gbp: Math.round(v.gbp) })) }])),
  unlistedChildrenCandidates: (() => { const m = {}; for (const r of y25) { if (findOrg(r.organisation) || STATUTORY.test(r.organisation) || !CHILD.test([r.fundingTitle, r.grantTitle, r.branch].join(' '))) continue;
      const e = (m[r.organisation] ||= { organisation: r.organisation, gbp: 0, awards: 0, departments: new Set(), titles: new Set() }); e.gbp += r.gbp; e.awards++; e.departments.add(r.department); e.titles.add(r.fundingTitle); }
    return Object.values(m).sort((a, b) => b.gbp - a.gbp).map(e => ({ ...e, gbp: Math.round(e.gbp), departments: [...e.departments], titles: [...e.titles].slice(0, 4) })); })(),
};
fs.writeFileSync(path.join(R, 'ni-gfd-analysis.json'), JSON.stringify(out, null, 1));

const f = v => '£' + (v / 1e6).toFixed(1) + 'm';
console.log(`rows ${all.length} (${gfd.length} all-departments + ${H.length} health); after latest-offer dedupe ${rows.length}; 2024-25: ${y25.length}`);
console.log('dept   awards(latest)  all-rows   on list (orgs)   child-focused   child-labelled  of which unlisted (orgs)');
for (const [k, d] of Object.entries(out.byDept).sort((a, b) => b[1].gbp - a[1].gbp))
  console.log(`${k.padEnd(7)}${f(d.gbp).padStart(9)} ${f(d.allRowsGbp).padStart(10)} ${f(d.listedGbp).padStart(10)} (${String(d.listedOrgs).padStart(3)}) ${f(d.childFocusedGbp).padStart(12)} ${f(d.childLabelledGbp).padStart(14)} ${f(d.childLabelledUnlistedGbp).padStart(12)} (${d.unlistedChildOrgs})`);
console.log(`\nchildren-labelled awards to organisations not on the list: ${out.unlistedChildrenCandidates.length} organisations; top 12:`);
out.unlistedChildrenCandidates.slice(0, 12).forEach(e => console.log(`  ${e.organisation.slice(0, 46).padEnd(46)} £${e.gbp.toLocaleString('en-GB').padStart(10)}  ${e.departments.join(',')}  ${e.titles[0].slice(0, 50)}`));
