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

console.log('=== DETAILED INVESTIGATION ===\n');

// 1. Check Row 10 vs Row 67 (Bệnh phổi mô kẽ)
console.log('1. BỆNH PHỔI MÔ KẼ:');
console.log('Row 10:', data.find(d => d._rowNum === 10));
console.log('Row 67:', data.find(d => d._rowNum === 67));

// 2. Check Sốt xuất huyết Dengue (Row 102 vs Row 15 or others)
console.log('\n2. SỐT XUẤT HUYẾT DENGUE:');
data.filter(d => (d.title + d.id).toLowerCase().includes('dengue') || (d.title + d.id).toLowerCase().includes('sốt xuất huyết')).forEach(r => {
  console.log(`Row ${r._rowNum} [${r.id}]: "${r.title}" | file="${r.file}" | org="${r.organization}" | year="${r.year}"`);
});

// 3. Check Viêm gan B (2026-byt-viem-gan-b.html vs 2026-byt-tom-tat-viem-gan-b.html)
console.log('\n3. VIÊM GAN B:');
data.filter(d => (d.title + d.id).toLowerCase().includes('viem_gan_b') || (d.title + d.id).toLowerCase().includes('viêm gan') || (d.title + d.id).toLowerCase().includes('hbv')).forEach(r => {
  console.log(`Row ${r._rowNum} [${r.id}]: "${r.title}" | file="${r.file}" | org="${r.organization}" | year="${r.year}"`);
});

// 4. Check Lao 2024
console.log('\n4. LAO 2024 (Lao p1 vs Lao p2):');
data.filter(d => (d.title + d.id).toLowerCase().includes('lao') || (d.title + d.id).toLowerCase().includes('tb')).forEach(r => {
  console.log(`Row ${r._rowNum} [${r.id}]: "${r.title}" | file="${r.file}" | parts="${r.parts}"`);
});

// 5. Check AHA/ACC High Blood Pressure
console.log('\n5. AHA/ACC HYPERTENSION:');
data.filter(d => (d.title + d.id).toLowerCase().includes('hypertension') || (d.title + d.id).toLowerCase().includes('huyết áp')).forEach(r => {
  console.log(`Row ${r._rowNum} [${r.id}]: "${r.title}" | file="${r.file}" | org="${r.organization}" | year="${r.year}"`);
});

// 6. Check FOB in Sputum Negative TB
console.log('\n6. FOB SPUTUM NEGATIVE TB:');
data.filter(d => (d.title + d.id).toLowerCase().includes('fob') || (d.title + d.id).toLowerCase().includes('sputum')).forEach(r => {
  console.log(`Row ${r._rowNum} [${r.id}]: "${r.title}" | file="${r.file}"`);
});

// 7. Check 2021 SSC Sepsis 3 (2021-ssc-soc-nhiem-khuan-sepsis3.html)
console.log('\n7. SEPSIS FILES IN KHO:');
console.log('2021-ssc-soc-nhiem-khuan-sepsis3.html title/summary:');
const ssc2021 = fs.readFileSync(path.join(khoDir, '2021-ssc-soc-nhiem-khuan-sepsis3.html'), 'utf8');
const tMatch = ssc2021.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', tMatch ? tMatch[1] : 'none');

// 8. Check 2026-aha-acc-ckm-syndrome.html
console.log('\n8. CKM SYNDROME FILE IN KHO:');
const ckm = fs.readFileSync(path.join(khoDir, '2026-aha-acc-ckm-syndrome.html'), 'utf8');
const ckmTitle = ckm.match(/<title>([^<]+)<\/title>/i);
console.log('Title:', ckmTitle ? ckmTitle[1] : 'none');
