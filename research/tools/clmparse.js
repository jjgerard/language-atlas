// Pull the "as medium of instruction" / "as a subject" language tables out of
// each state chapter of the CLM 52nd Report.
const fs = require("fs");
const path = require("path");
const lines = fs.readFileSync(path.join(__dirname, "clm52.txt"), "utf8").split("\n");

const CH = [
 ["Chandigarh",361],["Delhi",620],["Haryana",1215],["Himachal Pradesh",1448],
 ["Jammu and Kashmir",1542],["Punjab",1637],["Rajasthan",1728],["Bihar",1843],
 ["Chhattisgarh",1951],["Jharkhand",2260],["Madhya Pradesh",2357],["Uttarakhand",2456],
 ["Uttar Pradesh",2548],["Arunachal Pradesh",2800],["Assam",3012],["Manipur",3102],
 ["Meghalaya",3398],["Mizoram",3489],["Nagaland",3745],["Odisha",3857],["Sikkim",3932],
 ["Tripura",4031],["West Bengal",4320],["Dadra and Nagar Haveli",4418],["Daman and Diu",4477],
 ["Goa",4543],["Gujarat",4670],["Karnataka",4963],["Maharashtra",5436],
 ["Andaman and Nicobar Islands",5501],["Andhra Pradesh & Telangana",5739],["Kerala",5839],
 ["Lakshadweep",6204],["Puducherry",6506],["Tamil Nadu",6589],["END",7243],
];

const want = process.argv[2];
for (let i = 0; i < CH.length - 1; i++) {
  const [name, start] = CH[i], end = CH[i + 1][1];
  if (want && !name.toLowerCase().includes(want.toLowerCase())) continue;
  const body = lines.slice(start - 1, end - 1);
  console.log("\n########## " + name + "  (lines " + start + "-" + (end - 1) + ")");
  let mode = null, stage = null;
  for (const l of body) {
    const st = l.match(/^\s*\d+\.\d+\s+(Primary Stage|Upper Primary Stage|Secondary Stage|Higher Secondary Stage|Senior Secondary)/i);
    if (st) stage = st[1];
    if (/as (a )?medium of instruction|as medium/i.test(l)) { mode = "MEDIUM"; console.log(`  [${stage||"?"}] ${mode}`); continue; }
    if (/as a subject/i.test(l)) { mode = "SUBJECT"; console.log(`  [${stage||"?"}] ${mode}`); continue; }
    // table rows: "Language   1,234   567   89"
    const m = l.match(/^\s*([A-Z][A-Za-z\/&'()’ .-]{2,40}?)\s{2,}([\d,]+|NIL|Nil|nil|-)\s/);
    if (m && mode && !/^(Language|Schools|Students|Teachers|Total|Sl|Name)/i.test(m[1].trim())) {
      console.log(`      ${mode} ${stage||"?"} :: ${m[1].trim()}  ${m[2]}`);
    }
  }
}
