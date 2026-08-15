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
  const obj = { _lineIndex: idx + 2 };
  headers.forEach((h, hIdx) => {
    obj[h] = r[hIdx] || '';
  });
  return obj;
});

const khoPath = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const khoFiles = fs.readdirSync(khoPath).filter(f => f.endsWith('.html'));

console.log('=== LIST OF ALL 45 HTML FILES IN KHO-GUIDELINES ===');
khoFiles.forEach((f, i) => console.log(`${i+1}. ${f}`));

console.log('\n=== CHECKING UNREFERENCED KHO FILES VS CSV ITEMS ===');
const unreferenced = [
  '2020-nutrients-lowcarb-vs-lowfat.html',
  '2021-ssc-soc-nhiem-khuan-sepsis3.html',
  '2024-byt-lao-p2.html',
  '2026-aha-acc-ckm-syndrome.html',
  '2026-byt-chi-dinh-nhap-vien-cap-cuu.html',
  '2026-byt-viem-gan-b.html',
  'index.html'
];

unreferenced.forEach(uf => {
  console.log(`\nChecking unreferenced file: ${uf}`);
  // Search in CSV by keywords
  const keywords = uf.replace('.html', '').split('-').filter(k => k.length > 2 && !['2020','2021','2023','2024','2025','2026','byt','who','aha','acc'].includes(k));
  console.log(`Keywords: ${keywords.join(', ')}`);
  data.forEach(d => {
    const text = (d.id + ' ' + d.title + ' ' + d.file + ' ' + d.summary + ' ' + d.conditionKey).toLowerCase();
    const matchCount = keywords.filter(k => text.includes(k.toLowerCase())).length;
    if (matchCount >= Math.min(2, keywords.length)) {
      console.log(`  -> Potential match: Row ${d._lineIndex} [${d.id}] "${d.title}" | file="${d.file}"`);
    }
  });
});

console.log('\n=== CHECKING MISSING HTML FILES REFERENCED IN CSV ===');
const missing = [
  '2021-byt-huong-dan-chan-doan-va-dieu-tri-nhiem-nam-xam-lan.html',
  '2022-byt-huong-dan-chan-doan-dieu-tri-va-quan-ly-benh-vong-mac-dai-thao-duong.html',
  '2023-byt-huong-dan-dieu-tri-du-phong-thuyen-tac-huyet-khoi-tinh-mach.html',
  '2023-byt-huong-dan-chan-doan-va-dieu-tri-hoi-chung-dong-mach-vanh-man.html',
  '2024-byt-huong-dan-chan-doan-va-dieu-tri-dot-quy-nao.html',
  '9789240101876-eng.html',
  'the-role-of-the-mediterranean-diet-in-secondary-cardiovascular-disease-prevention.html'
];

missing.forEach(mf => {
  console.log(`\nChecking missing reference: ${mf}`);
  // Check if any kho file is similar
  const simpleMf = mf.replace(/\.html$/, '').toLowerCase();
  khoFiles.forEach(kf => {
    const simpleKf = kf.replace(/\.html$/, '').toLowerCase();
    if (simpleKf.includes(simpleMf.slice(0, 15)) || simpleMf.includes(simpleKf.slice(0, 15))) {
      console.log(`  -> Similar kho file: ${kf}`);
    }
  });
});

console.log('\n=== CHECKING DUPLICATE/SIMILAR GUIDELINES IN CSV ===');
// Group by keywords or similar topics in title
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i];
    const b = data[j];
    
    // Check if titles are very similar or topic matches
    const wordsA = new Set(a.title.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(w => w.length > 3));
    const wordsB = new Set(b.title.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(w => w.length > 3));
    
    let intersection = 0;
    wordsA.forEach(w => { if (wordsB.has(w)) intersection++; });
    const similarity = intersection / Math.min(wordsA.size, wordsB.size);
    
    if (similarity >= 0.7 && wordsA.size >= 3) {
      console.log(`[POTENTIAL DUPLICATE / OVERLAP]`);
      console.log(`  Row ${a._lineIndex} [${a.id}] (Year: ${a.year}, Org: ${a.organization}, File: ${a.file})`);
      console.log(`    Title: ${a.title}`);
      console.log(`  Row ${b._lineIndex} [${b.id}] (Year: ${b.year}, Org: ${b.organization}, File: ${b.file})`);
      console.log(`    Title: ${b.title}`);
      console.log(`    Similarity: ${(similarity*100).toFixed(1)}%`);
    }
  }
}
