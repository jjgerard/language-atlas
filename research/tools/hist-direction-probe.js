// Does a policyHistory row say whether a change WIDENED or NARROWED coverage?
//
//     node hist-direction-probe.js
//
// Answer: 94% say neither, so direction cannot be a column. Kept because the
// rows that DO state a delta are the most valuable in the corpus for outcomes
// work, and this is how to find them. Precision is poor -- /caps?/ matches
// "Education Act (Cap 262)" -- so read the hits, do not count them.

const fs=require("fs");
const {pathFor}=require("./datafile.js");
const ids=["dld","eal","indigenous","fl","he"];
const WIDER=/\b(extend\w*|expand\w*|widen\w*|broaden\w*|adds? (?:a |an |the )?(?:right|entitlement|language|category|group)|now (?:covers|includes)|also (?:covers|includes)|raises? the (?:age|limit|ceiling)|up to age|increases?|guarantees?|entitles?|obliges?|makes? .* compulsory|for the first time|all (?:pupils|children|learners))\b/i;
const NARROW=/\b(ceases? (?:as|to be)|no longer|restricts?|restricted|narrow\w*|limits? (?:the|it|access)|removes? the (?:provision|right|requirement)|withdraw\w*|only (?:for|to|where)|retained only|excludes?|reduces?|caps?|abolish\w*|discontinu\w*)\b/i;
const rows=[];
for(const id of ids) for(const e of JSON.parse(fs.readFileSync(pathFor(id),"utf8")))
  for(const h of (e.policyHistory||[])) rows.push({id,d:String(h.description||"")});
let w=0,n=0,both=0,none=0; const exW=[],exN=[],exB=[];
for(const r of rows){
  const a=WIDER.test(r.d), b=NARROW.test(r.d);
  if(a&&b){both++; if(exB.length<4)exB.push(r.id+" — "+r.d.slice(0,150));}
  else if(a){w++; if(exW.length<5)exW.push(r.id+" — "+r.d.slice(0,150));}
  else if(b){n++; if(exN.length<7)exN.push(r.id+" — "+r.d.slice(0,150));}
  else none++;
}
const pc=x=>String(Math.round(100*x/rows.length)).padStart(3)+"%";
console.log("n = "+rows.length);
console.log("  widening language   "+String(w).padStart(5)+"  "+pc(w));
console.log("  narrowing language  "+String(n).padStart(5)+"  "+pc(n));
console.log("  both                "+String(both).padStart(5)+"  "+pc(both));
console.log("  neither             "+String(none).padStart(5)+"  "+pc(none));
console.log("\n-- widening --"); exW.forEach(x=>console.log("   "+x));
console.log("\n-- narrowing --"); exN.forEach(x=>console.log("   "+x));
console.log("\n-- both --"); exB.forEach(x=>console.log("   "+x));
