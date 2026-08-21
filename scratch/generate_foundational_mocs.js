const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const foundationalKhos = [
  { name: 'Kho giải phẫu & sinh lý', prefix: 'GPSL', title: 'MOC - Kho Giải Phẫu & Sinh Lý' },
  { name: 'Kho hóa sinh y học', prefix: 'HS', title: 'MOC - Kho Hóa Sinh Y Học' },
  { name: 'Kho kỹ năng lâm sàng', prefix: 'KN', title: 'MOC - Kho Kỹ Năng Lâm Sàng' },
  { name: 'Kho tiếp cận lâm sàng', prefix: 'TC', title: 'MOC - Kho Tiếp Cận Lâm Sàng' }
];

foundationalKhos.forEach(kho => {
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

> Cổng tra cứu và điều hướng tài liệu thuộc **${kho.name}** được tổ chức theo chuẩn phân nhóm chuyên nghiệp.

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
