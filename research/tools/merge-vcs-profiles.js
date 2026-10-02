// Merges the eight profile batches (scratchpad prof/out1..8.json) into
// research/children-sector/ni-vcs-profiles.json, and applies to ni-vcs-orgs.json
// the corrections the profiling agents reported in prose: register numbers they
// matched, duplicates, and entries that look like statutory EA youth centres.
//
// Every correction below is from an agent report of 2026-10-01 and is checked
// here against the full register export before it is applied: a number that
// is not on the register, or whose name shares no word with the organisation,
// is refused and listed, not written.
//
// Run: node research/tools/merge-vcs-profiles.js <prof dir> <ccni.json>
const fs = require('fs');
const path = require('path');

const [PROF, CCNI] = process.argv.slice(2);
if (!PROF || !CCNI) { console.error('usage: merge-vcs-profiles.js <prof dir> <ccni.json>'); process.exit(1); }
const R = path.join(__dirname, '..', 'children-sector');
const full = JSON.parse(fs.readFileSync(CCNI, 'utf8'));
const byNo = new Map(full.map(r => [r['Reg charity number'], r]));

let profiles = [];
for (let i = 1; i <= 8; i++) profiles.push(...JSON.parse(fs.readFileSync(path.join(PROF, `out${i}.json`), 'utf8')).profiles.map(p => ({ ...p, batch: i })));

const orgsFile = path.join(R, 'ni-vcs-orgs.json');
const orgs = JSON.parse(fs.readFileSync(orgsFile, 'utf8'));
const byId = new Map(orgs.orgs.filter(o => o.orgId).map(o => [o.orgId, o]));
const findByName = re => orgs.orgs.filter(o => o.orgId && re.test(o.name));

// [name pattern, register number, how the agent established it]
const REG = [
  [/^St Mary'?s Y(outh )?C/i, '104795', 'batch 1'], [/^FAIR\b/i, '107185', 'batch 1'],
  [/Dromore Scouts/i, '106003', 'batch 1: the Newry group, not 103922 (Dromore, Co Down)'],
  [/Marrowbone/i, '107181', 'batch 1: Marrowbone Community Association runs the hub'],
  [/^INSPIRE\b/i, '103470', 'batch 1: Inspire Wellbeing, via its Peace of Mind page'],
  [/^ASCERT/i, '101239', 'batch 3'], [/^HAPANI/i, '101637', 'batch 3'], [/^TIDES/i, '103375', 'batch 3'],
  [/^Windsor Women/i, '103100', 'batch 3'], [/Gl[oó]r na M[oó]na/i, '104565', 'batch 4'],
  [/^Whiterock/i, '105179', 'batch 4: Whiterock Children\'s Centre'], [/^Scouts? (NI|Northern Ireland)/i, '103542', 'batch 5'],
  [/^Lisburn YMCA/i, '103817', 'batch 5'], [/^S[oó]l[aá]s/i, '100114', 'batch 5'], [/^Long ?Tower Youth/i, '109540', 'batch 5'],
  [/^FUEL\b/i, '100216', 'batch 6'], [/Dromore YFC|^The Base\b/i, '101685', 'batch 6'], [/^Glen Community Parent/i, '102053', 'batch 6'],
  [/^LLTCA|Laurencetown/i, '100896', 'batch 6'], [/Gl[oó]r Uachtar T[ií]re/i, '102681', 'batch 6'],
  [/^Resurgam Youth/i, '101054', 'batch 6: a project of Resurgam Community Development Trust'],
  [/^SPACE\b|Bolster/i, '107382', 'batch 8: SPACE NI renamed Bolster Community; 105005 removed 2021'],
  [/Scout Foundation/i, '101206', 'batch 8'], [/Verbal Arts/i, '101482', 'batch 2'],
];
const words = s => new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !['northern', 'ireland', 'limited', 'centre', 'group', 'community', 'youth', 'club'].includes(w)));
const applied = [], refused = [];
for (const [re, no, how] of REG) {
  const hits = findByName(re), r = byNo.get(no);
  if (hits.length !== 1) { refused.push(`${re} -> ${no}: ${hits.length} orgs match the name`); continue; }
  const o = hits[0];
  if (!r) { refused.push(`${o.name} -> ${no}: not on the register`); continue; }
  const overlap = [...words(o.name)].some(w => words(r['Charity name']).has(w)) || /renamed|runs|project of|via/.test(how);
  if (!overlap) { refused.push(`${o.name} -> ${no} (${r['Charity name']}): no shared name word`); continue; }
  if (o.regNo === no) continue;
  o.regNoPrevious = o.regNo || null; o.regNo = no; o.regNoBy = `profiling agent, ${how}`;
  o.register = { name: r['Charity name'], status: r.Status, fyEnd: r['Date for financial year ending'], income: r['Total income'], spending: r['Total spending'], incomePrev: r['Total income. Previous financial period.'], staff: r['Employed staff'], who: (r['Who the charity helps'] || '').split(',').filter(Boolean) };
  applied.push(`${o.orgId} ${o.name} -> ${no} (${r['Charity name']})`);
}

// Matches the name check above cannot confirm (acronyms, two clubs of one name),
// applied by orgId because the agent named the orgId and the register number
// together. Each number must still exist on the register.
const REG_BY_ID = {
  v289: ['104795', 'batch 1: St Mary\'s Youth Centre (Portadown), Obins Street'],
  v290: ['109557', 'batch 2: Fanad Drive, Creggan; 103880 is the removed older registration'],
  v300: ['103542', 'batch 5'], v310: ['100216', 'batch 6: FUEL'], v303: ['101482', 'batch 2: Verbal Arts Centre'],
  v235: ['102681', 'batch 6: Glór Uachtar Tíre'], v254: ['101637', 'batch 3: Horn of Africa People\'s Aid NI'],
  v284: ['100114', 'batch 5: Sólás'], v262: ['100896', 'batch 6: Laurencetown, Lenaderg & Tullylish CA'],
  // Matched in the profile notes and profiled from that charity's own accounts.
  v231: ['103356', 'profile: Belfast Interface Project'], v239: ['106988', 'profile: Creating Help In Local Districts'],
  v255: ['102107', 'profile: Harpurs Hill Children and Family Centre, Sure Start lead body'],
  v263: ['104799', 'profile: Lower Ormeau Residents Action Group'], v274: ['109719', 'profile: Ogras Youth Group'],
  v314: ['105780', 'profile: Derry Healthy Cities now operates as Developing Healthy Communities; 101856 removed'],
  v316: ['103106', 'profile: Creggan Healthy Living Centre is run by The Old Library Trust'],
  // Confirmed from the parent's own accounts: ni-vcs-parents.json (2026-10-02).
  v259: ['104502', 'parent check: KPC Youth lines in Knock Presbyterian\'s accounts'],
  v264: ['103422', 'parent check: Loughgiel Community Association trustees\' report names the club'],
  v269: ['105461', 'parent check: same body; accounts headed Newry & District Gateway Club Community Centre'],
  v237: ['106888', 'parent check: same company NI030137, renamed 2013 and merged 2020 into Causeway and Mid Ulster Women\'s Aid'],
};
for (const [id, [no, how]] of Object.entries(REG_BY_ID)) {
  const o = byId.get(id), r = byNo.get(no);
  if (!o || !r) { refused.push(`${id} -> ${no}: ${!o ? 'no such org' : 'not on the register'}`); continue; }
  if (o.regNo === no) continue;
  o.regNoPrevious = o.regNo || null; o.regNo = no; o.regNoBy = `profiling agent, ${how}`;
  o.register = { name: r['Charity name'], status: r.Status, fyEnd: r['Date for financial year ending'], income: r['Total income'], spending: r['Total spending'], incomePrev: r['Total income. Previous financial period.'], staff: r['Employed staff'], who: (r['Who the charity helps'] || '').split(',').filter(Boolean) };
  applied.push(`${id} ${o.name} -> ${no} (${r['Charity name']})`);
}

// Flags, from the same reports.
const flag = (id, k, v) => { const o = byId.get(id); if (o) o[k] = v; };
flag('v312', 'duplicateOf', 'v216'); flag('v230', 'duplicateOf', 'v214');
// The list-building merge split these on GB charity numbers written two ways ("1097940" vs "1097940 / SC038092").
flag('v225', 'duplicateOf', 'v216'); flag('v311', 'duplicateOf', 'v214');
// Found in phase 3: same register number (LORAG), and the same GB charity under two names (Mencap).
flag('v263', 'duplicateOf', 'v059'); flag('v279', 'duplicateOf', 'v219');
// Same organisation listed twice by the list-building merge, under name variants.
flag('v320', 'duplicateOf', 'v142');   // Marrowbone Community Hub is the Association's registered office
flag('v222', 'duplicateOf', 'v024');   // ASCERT
flag('v253', 'duplicateOf', 'v083');   // Glór na Móna
flag('v313', 'duplicateOf', 'v055');   // SPACE NI renamed Bolster Community
flag('v309', 'duplicateOf', 'v081');   // both profiled under NIC109540 Long Tower Youth Club Ltd
for (const id of ['v226', 'v232', 'v233', 'v252', 'v282']) flag(id, 'possiblyStatutory', 'listed as an Education Authority youth centre (EA page or ETI report); unconfirmed, keep off counts until checked');
for (const o of findByName(/^Limavady Youth Resource/i)) o.possiblyStatutory = 'listed on EA youth-centre pages (403, unconfirmed)';
// The register income for these is the parent body's, not the project's.
flag('v316', 'incomeIsParent', 'The Old Library Trust');
flag('v259', 'incomeIsParent', 'Knock Presbyterian Church'); flag('v264', 'incomeIsParent', 'Loughgiel Community Association');
// The parent check's verdicts, with any project lines the parent's accounts break out for the club.
const parents = JSON.parse(fs.readFileSync(path.join(R, 'ni-vcs-parents.json'), 'utf8')).clubs;
for (const c of parents) { const o = byId.get(c.orgId); if (!o) continue;
  o.parentCheck = { verdict: c.verdict, parentRegNo: c.parentRegNo || null, parentName: c.parentName || null, evidence: c.evidence || null };
  if (c.verdict === 'confirmed' && (c.clubFigures || []).length) o.projectFigures = c.clubFigures; } flag('v278', 'incomeIsParent', 'The Resurgam Community Development Trust');
flag('v319', 'partOf', 'Barnardo\'s NI (PosAbility is a Barnardo\'s service)');

// Profiles: mark those whose notes say a quote came through a summariser, not page text.
for (const p of profiles) {
  if (/summari[sz]|WebFetch|paraphras|not verbatim|web-fetch/i.test(p.notes || '')) p.quotesParaphrased = true;
  const o = byId.get(p.orgId); if (o) o.profileStatus = p.status;
}
fs.writeFileSync(path.join(R, 'ni-vcs-profiles.json'), JSON.stringify({
  retrieved: '2026-10-01',
  codes: ['early-years', 'family-support', 'child-protection', 'looked-after', 'disability-sen', 'mental-health', 'youth-work', 'youth-justice', 'education-support', 'training-employment', 'housing-homelessness', 'health', 'play-recreation', 'voice-rights', 'good-relations', 'poverty-material', 'trauma-victims', 'other'],
  rule: 'One profile per organisation with a strong basis. Services are coded only from the organisation\'s own documents, each with a quote and URL. stepsIn holds only statements that a service exists because statutory provision is absent, insufficient or slow; most organisations have none, and that is the finding. quotesParaphrased marks profiles where some quotes came via a summarising fetch and must not be shown as verbatim.',
  profiles,
}, null, 1));
fs.writeFileSync(orgsFile, JSON.stringify(orgs, null, 1));
console.log(`${profiles.length} profiles; ${applied.length} register numbers applied, ${refused.length} refused`);
applied.forEach(a => console.log('  +', a)); refused.forEach(r => console.log('  x', r));
console.log('paraphrased:', profiles.filter(p => p.quotesParaphrased).length);
