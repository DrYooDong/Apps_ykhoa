const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const remainingKhos = [
  { name: 'Kho nghiên cứu khoa học & EBM', prefix: 'EBM', title: 'MOC - Kho Nghiên Cứu Khoa Học & EBM' },
  { name: 'Kho thực thể hạt nhân', prefix: 'CORE', title: 'MOC - Kho Thực Thể Hạt Nhân' },
  { name: 'Kho dinh dưỡng lâm sàng', prefix: 'DD', title: 'MOC - Kho Dinh Dưỡng Lâm Sàng' }
];

remainingKhos.forEach(kho => {
  const khoDir = path.join(base, kho.name);
  if (!fs.existsSync(khoDir)) return;

  const subDirs = fs.readdirSync(khoDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();

  let mdContent = `---
title: "${kho.title}"
type: moc
updated: "${new Date().toISOString().split('T')[0]}"
---

# ${kho.title}

> Cổng tra cứu và điều hướng tài liệu thuộc **${kho.name}** được tổ chức chuẩn hóa.

---

`;

  let totalFiles = 0;

  subDirs.forEach(sub => {
    const subPath = path.join(khoDir, sub);
    const files = fs.readdirSync(subPath, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name)
      .sort();

    if (files.length > 0) {
      totalFiles += files.length;
      mdContent += `## 📚 ${sub} (${files.length} bài)\n\n`;
      files.forEach(f => {
        const fileNoExt = path.parse(f).name;
        mdContent += `- [[${f}|${fileNoExt}]]\n`;
      });
      mdContent += `\n`;
    }
  });

  mdContent += `\n---\n*Tổng số lượng bài viết: **${totalFiles}** bài*\n`;

  const mocPath = path.join(khoDir, `${kho.title}.md`);
  fs.writeFileSync(mocPath, mdContent, 'utf8');
  console.log(`Đã tạo MOC: ${mocPath} (${totalFiles} files indexed)`);
});
