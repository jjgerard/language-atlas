// Sample policyHistory rows evenly across every domain x region bucket.
//
//     node hist-sample.js [count] [seed]
//
// Alphabetical sampling of any of these maps returns small European and
// Caribbean states, and a vocabulary derived from those does not survive Asia.

const fs=require("fs");
const {pathFor}=require("./datafile.js");
const ids=["dld","eal","indigenous","fl","he"];
const rows=[];
for(const id of ids){
  for(const e of JSON.parse(fs.readFileSync(pathFor(id),"utf8")))
    for(const h of (e.policyHistory||[]))
      rows.push({id, reg:e.region||"?", cc:e.countryCode, unit:e.unitName, y:h.year, d:h.description});
}
// deterministic spread: bucket by domain+region, take every Nth
const want=Number(process.argv[2]||60), seed=Number(process.argv[3]||0);
const buckets={};
for(const r of rows) (buckets[r.id+"|"+r.reg]=buckets[r.id+"|"+r.reg]||[]).push(r);
const keys=Object.keys(buckets).sort();
const out=[];
let i=0;
while(out.length<want && i<400){
  for(const k of keys){ const b=buckets[k]; const n=b[(i*7+seed*3+k.length)%b.length]; if(n && !out.includes(n)) out.push(n); if(out.length>=want) break; }
  i++;
}
for(const r of out) console.log(`[${r.id}/${r.reg}] ${r.cc} ${r.unit} — ${r.y}: ${r.d}`);
