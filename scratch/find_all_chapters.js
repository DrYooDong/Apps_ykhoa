const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../knowledge-vault/HÓA SINH Y HỌC 2024.md');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const chapterLines = [];
lines.forEach((l, idx) => {
  const lineNum = idx + 1;
  const t = l.trim();
  if (/(?:^|\s)(?:Chương|CHƯƠNG)\s+([0-9IVXLCDM]+)/i.test(t)) {
    // Lấy thêm 2 dòng sau
    const nextLines = lines.slice(idx, idx + 4).map(x => x.trim()).join(' | ');
    chapterLines.push({ lineNum, line: t, context: nextLines });
  }
});

console.log('--- CÁC VỊ TRÍ XUẤT HIỆN CHƯƠNG ---');
chapterLines.forEach(c => {
  console.log(`[Dòng ${c.lineNum}] ${c.context}`);
});
