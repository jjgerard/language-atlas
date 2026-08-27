// Third pass. Two real documents defeated exact-substring matching:
//   * the NWT Education Act is a BILINGUAL TWO-COLUMN PDF, so pdftotext
//     interleaves the English text with its French translation and with the
//     marginal section notes. "The language of instruction of the education
//     program must be an Official Language." comes out with "70. (1) Le
//     programme d'enseignement est offert dans Langue" wedged inside it.
//   * several agents joined table rows or separate passages with " / ".
// Neither is a bad quote. So: shingle the needle into 5-word runs and require
// most of them to survive somewhere in one file. Interleaving breaks long
// spans but leaves short runs intact, while an invented sentence matches
// almost nothing.
const fs=require("fs"),path=require("path");
const looksHtml=s=>/<\/?(html|body|div|p|span|head|meta|table|a)\b/i.test(s.slice(0,4000));
const norm=s=>(looksHtml(s)?s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," "):s)
 .replace(/&nbsp;|&#160;/gi," ").replace(/&amp;/gi,"&").replace(/&quot;|&#34;/gi,'"').replace(/&#39;|&apos;/gi,"'")
 .replace(/&lt;/gi,"<").replace(/&gt;/gi,">")
 .replace(/[\u2018\u2019\u02bc]/g,"'").replace(/[\u201c\u201d]/g,'"')
 .replace(/[\u2010-\u2015\u2212]/g,"-").replace(/\u00a0/g," ")
 .replace(/[\u200b\u200c\u200d\ufeff\u00ad]/g,"")
 // Fold accents rather than delete them: stripping non-ASCII made a verbatim
 // Spanish quote unmatchable, because the source has "enseñanza" and the agent
 // transcribed "ensenanza". NFD then dropping combining marks lands both on
 // the same ASCII.
 .normalize("NFD").replace(/[0300-036f]/g,"")
 .replace(/[^a-z0-9'\-\s]/gi," ").replace(/\s+/g," ").toLowerCase();
const shingles=(t,n=5)=>{const w=t.split(" ").filter(Boolean);const out=[];for(let i=0;i+n<=w.length;i++)out.push(w.slice(i,i+n).join(" "));return out;};
const [,,corpusDir,partsDir,fileRe]=process.argv;
const corpus={};
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
for(const f of walk(corpusDir)){
  if(/\.(pdf|png|jpg|zip|xlsx|bin)$/i.test(f))continue;
  try{const p=f; if(fs.statSync(p).size>40e6)continue; corpus[f]=norm(fs.readFileSync(p,"utf8"));}catch(e){}
}
let total=0,strong=0,weak=0;const bad=[];
for(const pf of fs.readdirSync(partsDir).filter(f=>new RegExp(fileRe).test(f))){
  const text=fs.readFileSync(path.join(partsDir,pf),"utf8");
  for(const b of text.split(/^\s*(?=quote:)/m).slice(1)){
    const m=b.match(/quote:\s*"([\s\S]*?)"\s*(?:\n\s*(?:source|note|field|-)|\n\s*\n|$)/);
    if(!m)continue;
    const needle=norm(m[1]);
    const sh=shingles(needle);
    if(sh.length<2)continue;
    total++;
    let best=0;
    for(const k of Object.keys(corpus)){
      const c=corpus[k];let hit=0;
      for(const s of sh) if(c.includes(s)) hit++;
      if(hit>best)best=hit;
      if(best===sh.length)break;
    }
    const frac=best/sh.length;
    if(frac>=0.9)strong++; else if(frac>=0.5)weak++;
    else bad.push([pf,(frac*100).toFixed(0)+"%",m[1].replace(/\s+/g," ").slice(0,88)]);
  }
}
console.log(`${total} quotes checked: ${strong} matched >=90% of 5-word runs, ${weak} matched 50-89% (column-interleaved or joined passages), ${bad.length} below 50%`);
if(bad.length){console.log("\nBELOW 50% - inspect these by hand:");bad.forEach(([f,p,q])=>console.log(`  ${f} [${p}]: "${q}"`));}
