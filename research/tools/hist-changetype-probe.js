// Measure the CHANGE-TYPE distribution over every policyHistory row.
//
//     node hist-changetype-probe.js
//
// This is a measurement instrument and NOT a coder. Its precision is poor and
// named in research/POLICY-HISTORY-VOCAB.md: a bare `regulation` swallows rows
// that describe a provision and record no operation. It exists to show the
// SHAPE of the corpus -- 48% of rows record no operation at all -- which is
// the argument for the vocabulary, not the vocabulary itself.

const fs=require("fs");
const {pathFor}=require("./datafile.js");
const ids=["dld","eal","indigenous","fl","he"];
const ORDER=[
 ["state of affairs recorded", /\b(has not|have not|does not|do not|did not|no (?:law|policy|provision|rule|mention|specific)|not yet|never|remains? (?:un|without)|is silent)\b/i],
 ["international instrument accepted", /\b(ratif|accede|acceded|accession|enters? into force for|Part I{1,3} (?:of the Charter|to)|signed the (?:Convention|Charter)|declaration under)/i],
 ["instrument replaced", /\b(replac\w*|supersed\w*|repeal\w*|abrogat\w*|rescind\w*|revok\w*)\b/i],
 ["instrument amended", /\b(amend\w*|revis\w*|rewrites?|rewrote|modif\w*|inserts?|inserted|adds? (?:art|section|§)|substitut\w*)\b/i],
 ["body or programme changed", /\b(renam\w*|restructur\w*|reorganis\w*|reorganiz\w*|merg\w*|clos\w*|became a|becomes a|upgrad\w*|abolish\w*)\b/i],
 ["body or programme established", /\b(establish\w*|creat\w*|set up|founded|inaugurat\w*|incorporat\w*|opens?|opened|launch\w*|introduc\w*|adds? (?:a|an|up to)? ?(?:track|minor|course|programme|program|elective)|starts?)\b/i],
 ["funding decided", /\b(\$|€|£|million|funding agreement|budget|grant of|allocat\w*|per-pupil|financ\w*|subsid\w*)/i],
 ["plan or strategy issued", /\b(strateg\w*|action plan|sector plan|roadmap|white paper|proposes?|proposed|aims? (?:at|to)|intends?|intended to|commits?|commitment|recommend\w*|guidelines?|circular|underlines?|targets?)\b/i],
 ["instrument made", /\b(enact\w*|adopt\w*|passed|promulgat\w*|comes? into force|came into force|enters? into force|takes? effect|approv\w*|issued|published in the|decree|order|regulation|act no|law no)\b/i],
];
const rows=[];
for(const id of ids) for(const e of JSON.parse(fs.readFileSync(pathFor(id),"utf8")))
  for(const h of (e.policyHistory||[])) rows.push({id,reg:e.region,d:String(h.description||"")});
const counts={}, ex={};
for(const [n] of ORDER){counts[n]=0;ex[n]=[];}
counts["provision described"]=0; ex["provision described"]=[];
const byDomain={};
for(const r of rows){
  let v="provision described";
  for(const [n,re] of ORDER) if(re.test(r.d)){v=n;break;}
  counts[v]++; if(ex[v].length<3) ex[v].push(r.id+" — "+r.d.slice(0,110));
  (byDomain[r.id]=byDomain[r.id]||{})[v]=((byDomain[r.id]||{})[v]||0)+1;
}
console.log("n = "+rows.length+"\n");
for(const [k,v] of Object.entries(counts).sort((a,b)=>b[1]-a[1])){
  console.log(String(v).padStart(5)+"  "+String(Math.round(100*v/rows.length)).padStart(3)+"%  "+k);
  ex[k].forEach(x=>console.log("           "+x));
}
console.log("\nper domain, share of the top value:");
for(const [d,c] of Object.entries(byDomain)){
  const top=Object.entries(c).sort((a,b)=>b[1]-a[1])[0];
  const n=Object.values(c).reduce((a,b)=>a+b,0);
  console.log("  "+d.padEnd(11)+top[0]+" "+Math.round(100*top[1]/n)+"% of "+n);
}
