const fs=require("fs"),path=require("path");
const looksHtml=s=>/<\/?(html|body|div|p|span|head|meta|table|a)\b/i.test(s.slice(0,4000));
const norm=s=>(looksHtml(s)?s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," "):s)
 .replace(/&nbsp;|&#160;/gi," ").replace(/&amp;/gi,"&").replace(/&quot;|&#34;/gi,'"').replace(/&#39;|&apos;/gi,"'")
 .replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&sect;/gi,"\u00a7")
 .replace(/[\u2018\u2019\u02bc]/g,"'").replace(/[\u201c\u201d]/g,'"')
 .replace(/[\u2010-\u2015\u2212]/g,"-").replace(/\u00a0/g," ")
 .replace(/[\u200b\u200c\u200d\ufeff\u00ad]/g,"").replace(/\s+/g," ").toLowerCase();
const [,,corpusDir,partsDir,fileRe]=process.argv;
const corpus={};
for(const f of fs.readdirSync(corpusDir)){
  if(/\.(pdf|png|jpg|zip|xlsx|bin)$/i.test(f))continue;
  const p=path.join(corpusDir,f);
  try{ if(fs.statSync(p).size>40e6)continue; corpus[f]=norm(fs.readFileSync(p,"utf8")); }catch(e){}
}
let total=0,found=0; const missing=[];
for(const pf of fs.readdirSync(partsDir).filter(f=>new RegExp(fileRe).test(f))){
  const text=fs.readFileSync(path.join(partsDir,pf),"utf8");
  for(const b of text.split(/^\s*(?=quote:)/m).slice(1)){
    const m=b.match(/quote:\s*"([\s\S]*?)"\s*(?:\n\s*(?:source|note|field|-)|\n\s*\n|$)/);
    if(!m)continue;
    // The agent joins separate passages with " / " or "..." and escapes inner
    // quotes. Those joins are its formatting, not the source's text, so verify
    // the LONGEST contiguous fragment rather than the whole assembled string.
    const frags=m[1].split(/\s*\/\s*|\.\.\.|\u2026|\\"/).map(s=>norm(s.replace(/^["\s]+|["\s]+$/g,""))).filter(s=>s.length>=30);
    if(!frags.length)continue;
    frags.sort((a,b)=>b.length-a.length);
    total++;
    const hit=Object.keys(corpus).find(k=>frags.some(fr=>corpus[k].includes(fr)));
    if(hit)found++; else missing.push([pf,m[1].replace(/\s+/g," ").slice(0,95)]);
  }
}
console.log(`${found} of ${total} quotes located across ${Object.keys(corpus).length} retrieved files`);
if(missing.length){console.log(`\n${missing.length} still unlocated:`);missing.forEach(([f,q])=>console.log(`  ${f}: "${q}"`));}
