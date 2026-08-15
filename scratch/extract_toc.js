const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../knowledge-vault/HÓA SINH Y HỌC 2024.md');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('--- DANH SÁCH CÁC CHƯƠNG & TIÊU ĐỀ LỚN TRONG SÁCH ---');

const chapters = [];
let currentChapter = null;

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const trimmed = line.trim();
  
  // Bắt các chương
  const chMatch = trimmed.match(/^(?:#+\s*)?(?:Chương\s+([IVXLCDM\d]+)[.:\s]*(.*))/i);
  if (chMatch) {
    const chNum = chMatch[1];
    const chTitle = chMatch[2].replace(/[._—\-\(\)\d]+$/g, '').trim();
    if (chTitle && !chapters.some(c => c.num === chNum && c.title === chTitle)) {
      chapters.push({ line: lineNum, num: chNum, title: chTitle, full: trimmed });
    }
  }
  
  // Bắt các mục lớn 1., 2., 3., 1.1, 1.2...
  if (/^#+\s*\d+\.\s+[A-ZÀ-Ỹ]/u.test(trimmed) || /^#+\s*\d+\.\d+\.?\s+[A-ZÀ-Ỹ]/u.test(trimmed)) {
    // console.log(`  [Dòng ${lineNum}] ${trimmed}`);
  }
});

chapters.forEach(c => {
  console.log(`- Chương ${c.num}: ${c.title} (Dòng ${c.line})`);
});
