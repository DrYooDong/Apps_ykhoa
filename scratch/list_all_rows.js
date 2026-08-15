const fs = require('fs');
const path = require('path');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal);
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    lines.push(row);
  }
  return lines;
}

const csvPath = path.resolve('knowledge-vault/_resources/data/clinical_guidelines_rows.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(raw);
const headers = rows[0];
const data = rows.slice(1).map((r, idx) => {
  const obj = { _rowNum: idx + 2 };
  headers.forEach((h, hIdx) => {
    obj[h] = r[hIdx] || '';
  });
  return obj;
});

const khoDir = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const htmlFiles = fs.readdirSync(khoDir).filter(f => f.endsWith('.html') && f !== 'index.html');

console.log(`CSV rows: ${data.length}, Kho HTML files: ${htmlFiles.length}`);

// Let's print each row of the CSV with its title, file, year, org, and check matching with Kho files
console.log('\n--- ALL CSV ROWS AND THEIR FILE COLUMN ---');
data.forEach(r => {
  console.log(`[Row ${r._rowNum.toString().padStart(3, ' ')}] ID: ${r.id.padEnd(45, ' ')} | File: ${(r.file || '(EMPTY)').padEnd(45, ' ')} | Title: ${r.title.slice(0, 60)}`);
});
