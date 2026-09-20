// Can a policyHistory row be tied to the FIELD it changed?
//
//     node hist-field-probe.js
//
// Answer, on dld: 70% of rows signal no field, and dischargeCriteria is
// signalled by three rows out of 1,142. The cross "did discharge rules change
// in the same years categorization did" has nothing to cross.

const fs=require("fs");
const {pathFor}=require("./datafile.js");
const F={
 identificationCriteria: /\b(identif\w*|diagnos\w*|assessment (?:for|of) eligib|criteri\w*|verifi\w*|eligib\w*|screen\w*|referral|definition of|defines?)\b/i,
 dischargeCriteria:      /\b(discharge|re-?assess\w*|re-?evaluat\w*|review of the (?:plan|placement)|exit|ceases? as|no longer (?:eligible|qualifies))\b/i,
 legalEntitlement:       /\b(right to|entitle\w*|guarantee\w*|oblig\w*|duty|compulsory|free (?:and compulsory|education)|shall provide)\b/i,
 assessments:            /\b(test|battery|instrument|norm\w*|standardis\w*|standardiz\w*|screening tool)\b/i,
 multilingualProvision:  /\b(bilingual|multilingual|mother.tongue|home language|language of assessment|EAL|second language)\b/i,
 serviceModel:           /\b(speech(?:-| )(?:and )?language (?:therap|patholog)|orthophon|logoped|resource (?:room|centre|center)|special (?:class|unit|school)|itinerant|caseload)\b/i,
 workforce:              /\b(train\w*|teacher (?:education|training)|qualification|degree|licens\w*|register(?:ed|ing)? (?:therapist|practitioner)|staffing)\b/i,
 funding:                /\b(\$|€|£|million|budget|grant|allocat\w*|financ\w*|subsid\w*|per-pupil)\b/i,
};
const rows=[];
for(const e of JSON.parse(fs.readFileSync(pathFor("dld"),"utf8")))
  for(const h of (e.policyHistory||[])) rows.push(String(h.description||""));
const counts={}; for(const k of Object.keys(F)) counts[k]=0;
let hitN={0:0,1:0,2:0,3:0,4:0,5:0};
for(const d of rows){
  const hit=Object.keys(F).filter(k=>F[k].test(d));
  for(const k of hit) counts[k]++;
  hitN[Math.min(hit.length,5)]=(hitN[Math.min(hit.length,5)]||0)+1;
}
console.log("dld history rows: "+rows.length+"\n");
for(const [k,v] of Object.entries(counts).sort((a,b)=>b[1]-a[1]))
  console.log(String(v).padStart(5)+"  "+String(Math.round(100*v/rows.length)).padStart(3)+"%  "+k);
console.log("\nfields signalled per row: "+JSON.stringify(hitN));
console.log("  rows signalling NO field: "+hitN[0]+" ("+Math.round(100*hitN[0]/rows.length)+"%)");
console.log("  rows signalling exactly one: "+hitN[1]+" ("+Math.round(100*hitN[1]/rows.length)+"%)");
