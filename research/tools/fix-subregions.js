// The catalog groups by subregion, and the Americas carried two names for the
// same thing: 12 entries said "North America" while Ontario and the United
// States said "Northern America", so the two documented North American entries
// sat in a group of their own. The rest of the taxonomy is UN M49, so M49 wins:
// "Northern America", with Mexico moved to "Central America" where M49 puts it.
const fs = require("fs");
const path = require("path");
const REPO = "C:/Users/jgera/Documents/Claude code projects/AI repository/dld-policy-tracker";

function run(file, key) {
  const p = path.join(REPO, "data", file);
  const raw = JSON.parse(fs.readFileSync(p, "utf8"));
  const list = key ? raw[key] : raw;
  let moved = 0, mexico = 0;
  for (const e of list) {
    if (e.subregion !== "North America") continue;
    if (e.countryCode === "MX") { e.subregion = "Central America"; mexico++; }
    else { e.subregion = "Northern America"; moved++; }
  }
  fs.writeFileSync(p, JSON.stringify(raw, null, 2) + "\n");
  return { file, moved, mexico, remaining: list.filter(e => e.subregion === "North America").length };
}

console.log(run("seed.json", "S"));
console.log(run("community.json", null));
