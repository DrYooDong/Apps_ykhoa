const fs = require('fs');
const path = require('path');

const baseDir = 'd:/Apps_ykhoa/knowledge-vault/1.5. Kho yếu tố nguy cơ';
const subdirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

let totalFiles = 0;
let sections = '';

subdirs.forEach(s => {
  const subPath = path.join(baseDir, s);
  const files = fs.readdirSync(subPath).filter(f => f.endsWith('.md'));
  if (files.length === 0) return;
  totalFiles += files.length;
  sections += `## 🩺 ${s} (${files.length} bài)\n\n`;
  files.forEach(f => {
    const nameNoExt = f.replace(/\.md$/, '');
    sections += `- [[${f}|${nameNoExt}]]\n`;
  });
  sections += '\n';
});

const mocContent = `---
title: "MOC - Kho Yếu Tố Nguy Cơ"
type: moc
updated: "2026-08-22"
---

# MOC - Kho Yếu Tố Nguy Cơ (Clinical Risk Factors Vault)

> Cổng kết nối và tổng hợp toàn bộ tri thức phân tích chuyên sâu về **Yếu tố nguy cơ (Risk Factors)**, phân tầng nguy cơ lâm sàng, tỷ số Odds Ratio (OR), Relative Risk (RR), mô hình bệnh tật và các thang điểm dự báo sớm trong y khoa.

---

${sections}`;

fs.writeFileSync(path.join(baseDir, 'MOC - Kho Yếu Tố Nguy Cơ.md'), mocContent, 'utf8');
console.log(`Đã tạo MOC - Kho Yếu Tố Nguy Cơ.md thành công với ${totalFiles} bài viết.`);
