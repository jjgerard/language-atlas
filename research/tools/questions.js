const XLSX = require("xlsx");
const wb = XLSX.readFile("cost/master.xlsx", { sheetRows: 3 });
const rows = XLSX.utils.sheet_to_json(wb.Sheets.ALL, { header: 1, defval: "" });
const [sections, headers, questions] = rows;

let section = "";
for (let i = 0; i < headers.length; i++) {
  if (sections[i]) section = sections[i];
  const q = String(questions[i] || "").trim();
  const h = String(headers[i] || "").trim();
  if (q) console.log(`[${section}] col ${i} | ${h} | ${q.slice(0, 150)}`);
}
