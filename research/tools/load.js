// Loads the COST master dataset once and caches it as JSON, so the later
// aggregation passes don't re-parse a 10MB workbook each time.
const XLSX = require("xlsx");
const fs = require("fs");

if (!fs.existsSync("cost/all.json")) {
  const wb = XLSX.readFile("cost/master.xlsx");
  const rows = XLSX.utils.sheet_to_json(wb.Sheets.ALL, { header: 1, defval: "", raw: false });
  fs.writeFileSync("cost/all.json", JSON.stringify(rows));
  console.error("cached", rows.length, "rows");
}
const rows = JSON.parse(fs.readFileSync("cost/all.json", "utf8"));
module.exports = { rows, headers: rows[1], questions: rows[2], data: rows.slice(3) };
