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

function compareRows(r1, r2) {
  const a = data.find(d => d._rowNum === r1);
  const b = data.find(d => d._rowNum === r2);
  console.log(`\n========================================`);
  console.log(`COMPARING ROW ${r1} AND ROW ${r2}`);
  console.log(`========================================`);
  headers.forEach(h => {
    const valA = a[h];
    const valB = b[h];
    if (valA !== valB) {
      console.log(`[DIFF] ${h}:`);
      console.log(`   Row ${r1} [${a.id}]: "${valA}"`);
      console.log(`   Row ${r2} [${b.id}]: "${valB}"`);
    } else if (valA) {
      console.log(`[SAME] ${h}: "${valA.slice(0, 40)}${valA.length > 40 ? '...' : ''}"`);
    }
  });
}

// Compare 10 and 67 (Bệnh phổi mô kẽ)
compareRows(10, 67);

// Compare 57 and 75 (FOB TB)
compareRows(57, 75);

// Compare 28 and 60 (AHA/ACC Hypertension)
compareRows(28, 60);
