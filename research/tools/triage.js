const j = require("./cited2.json");
const COUNTRIES = ["Austria","Bulgaria","Croatia","Cyprus","Denmark","Estonia","Finland","France","Germany","Hungary","Iceland","Ireland","Israel","Italy","Latvia","Lebanon","Lithuania","Malta","Macedonia","Netherlands","Norway","Poland","Portugal","Romania","Russia","Serbia","Slovakia","Slovenia","South Africa","Spain","Sweden","Switzerland","Turkey","Turkish","United Kingdom","England","Scotland","Wales","Australia","Greece","Belgium","Czech","Europe"];

function abstractOf(w) {
  const inv = w.abstract_inverted_index;
  if (!inv) return "";
  const arr = [];
  for (const k in inv) for (const p of inv[k]) arr[p] = k;
  return arr.join(" ");
}

for (const w of j.results) {
  const ab = abstractOf(w);
  const blob = (w.title || "") + " " + ab;
  const hits = COUNTRIES.filter(c => new RegExp("\\b" + c, "i").test(blob));
  if (!hits.length) continue;
  console.log("-----------------------------------------");
  console.log([w.open_access.is_oa ? "OA" : "--", w.publication_year, hits.join(","), w.doi].join(" | "));
  console.log(w.title);
  console.log(ab.slice(0, 800));
}
