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

console.log('=== CHECKING ALL POTENTIAL DUPLICATES IN CSV ===\n');

// Specific suspected duplicate pairs:
const duplicatePairs = [
  // Pair 1: Bệnh phổi mô kẽ BYT 2023
  [10, 67, 'Bệnh phổi mô kẽ BYT 2023'],
  // Pair 2: FOB in sputum negative TB
  [57, 75, 'Nội soi phế quản trong Lao AFB âm tính'],
  // Pair 3: AHA/ACC Hypertension
  [28, 60, 'AHA/ACC 2025 Tăng huyết áp'],
  // Pair 4: Sepsis guideline
  [2, 40, 'Sepsis guideline (Sepsis-3 JAMA 2016 vs SSC 2026)'],
  // Pair 5: Sốt xuất huyết Dengue BYT 2023
  [15, 102, 'Sốt xuất huyết (Marburg vs Dengue) - not duplicate but related'],
  // Pair 6: Đái tháo đường ADA vs BYT
  [85, 90, 'Đái tháo đường (ADA 2026 vs BYT 2020)'],
  // Pair 7: COPD (BYT 2026 vs JRS 2026)
  [50, 89, 'COPD (JRS 2026 vs BYT 2026)'],
  // Pair 8: U máu
  [92, 98, 'U máu (Hemangioma tongue vs Oral hemangiomas)'],
  [98, 99, 'U máu (Oral hemangiomas vs Propranolol in adult hemangioma)'],
  // Pair 9: IDSA AMR vs SAB
  [48, 51, 'IDSA guidelines (AMR Gram-âm vs SAB Tụ cầu vàng)']
];

duplicatePairs.forEach(([r1, r2, note]) => {
  const item1 = data.find(d => d._rowNum === r1);
  const item2 = data.find(d => d._rowNum === r2);
  if (item1 && item2) {
    console.log(`\n--- [${note}] ---`);
    console.log(`Item 1 (Row ${r1}) [${item1.id}]:`);
    console.log(`  Title: ${item1.title}`);
    console.log(`  Year: ${item1.year} | Org: ${item1.organization} | File: ${item1.file}`);
    console.log(`Item 2 (Row ${r2}) [${item2.id}]:`);
    console.log(`  Title: ${item2.title}`);
    console.log(`  Year: ${item2.year} | Org: ${item2.organization} | File: ${item2.file}`);
  }
});
