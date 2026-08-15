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

console.log('=== CHECKING SPECIFIC UNMATCHED FILES ===\n');

// 1. Check 2026-byt-viem-gan-b.html vs 2026-byt-tom-tat-viem-gan-b.html
console.log('--- Viêm gan B files ---');
console.log('2026-byt-viem-gan-b.html exists:', fs.existsSync(path.join(khoDir, '2026-byt-viem-gan-b.html')));
console.log('2026-byt-tom-tat-viem-gan-b.html exists:', fs.existsSync(path.join(khoDir, '2026-byt-tom-tat-viem-gan-b.html')));
const f1 = fs.readFileSync(path.join(khoDir, '2026-byt-viem-gan-b.html'), 'utf8');
const f2 = fs.readFileSync(path.join(khoDir, '2026-byt-tom-tat-viem-gan-b.html'), 'utf8');
console.log('2026-byt-viem-gan-b.html length:', f1.length);
console.log('2026-byt-tom-tat-viem-gan-b.html length:', f2.length);

// 2. Check 2024-byt-lao-p1.html vs 2024-byt-lao-p2.html
console.log('\n--- Lao 2024 files ---');
const laoRows = data.filter(d => d.title.toLowerCase().includes('lao') || d.id.includes('lao'));
laoRows.forEach(r => console.log(`Row ${r._rowNum} [${r.id}] title="${r.title}" file="${r.file}" parts="${r.parts}"`));

// 3. Check Sepsis files
console.log('\n--- Sepsis files ---');
const sepsisRows = data.filter(d => (d.title + d.id).toLowerCase().includes('sepsis') || (d.title + d.id).toLowerCase().includes('nhiem_khuan') || (d.title + d.id).toLowerCase().includes('nhiễm trùng'));
sepsisRows.forEach(r => console.log(`Row ${r._rowNum} [${r.id}] title="${r.title}" file="${r.file}"`));

// 4. Check CKM syndrome (2026-aha-acc-ckm-syndrome.html)
console.log('\n--- CKM Syndrome ---');
const ckmRows = data.filter(d => (d.title + d.id).toLowerCase().includes('ckm') || (d.title + d.id).toLowerCase().includes('tim-than') || (d.title + d.id).toLowerCase().includes('tim mạch - thận'));
ckmRows.forEach(r => console.log(`Row ${r._rowNum} [${r.id}] title="${r.title}" file="${r.file}"`));

// 5. Check Low carb vs low fat
console.log('\n--- Low carb vs low fat ---');
const lowCarbRows = data.filter(d => (d.title + d.id).toLowerCase().includes('carb') || (d.title + d.id).toLowerCase().includes('chawla'));
lowCarbRows.forEach(r => console.log(`Row ${r._rowNum} [${r.id}] title="${r.title}" file="${r.file}"`));

// 6. Check Chỉ định nhập viện cấp cứu
console.log('\n--- Chỉ định nhập viện cấp cứu ---');
const cdnvRows = data.filter(d => (d.title + d.id).toLowerCase().includes('nhap_vien') || (d.title + d.id).toLowerCase().includes('nhập viện'));
cdnvRows.forEach(r => console.log(`Row ${r._rowNum} [${r.id}] title="${r.title}" file="${r.file}"`));
