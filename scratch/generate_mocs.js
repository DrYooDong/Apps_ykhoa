const fs = require('fs');
const path = require('path');

const base = 'd:/Apps_ykhoa/knowledge-vault';
const khoList = [
  { name: 'Kho dịch tễ học', prefix: 'DTH', title: 'MOC - Kho Dịch Tễ Học' },
  { name: 'Kho sinh lý bệnh', prefix: 'SLB', title: 'MOC - Kho Sinh Lý Bệnh' },
  { name: 'Kho chẩn đoán', prefix: 'CD', title: 'MOC - Kho Chẩn Đoán' },
  { name: 'Kho phác đồ điều trị', prefix: 'PDDT', title: 'MOC - Kho Phác Đồ Điều Trị' },
  { name: 'Kho biến chứng', prefix: 'BC', title: 'MOC - Kho Biến Chứng' },
  { name: 'Kho cập nhật', prefix: 'CN', title: 'MOC - Kho Cập Nhật' },
  { name: 'Kho chưa lọc', prefix: 'RAW', title: 'MOC - Kho Chưa Lọc' }
];

khoList.forEach(kho => {
  const khoDir = path.join(base, kho.name);
  if (!fs.existsSync(khoDir)) return;

  const specialties = fs.readdirSync(khoDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();

  let mdContent = `---
title: "${kho.title}"
type: moc
updated: "${new Date().toISOString().split('T')[0]}"
---

# ${kho.title}

> Tổng hợp toàn bộ tài liệu y khoa thuộc **${kho.name}** được phân loại trực quan theo từng chuyên khoa.

---

`;

  let totalFilesInKho = 0;

  specialties.forEach(spec => {
    const specDir = path.join(khoDir, spec);
    const files = fs.readdirSync(specDir, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name)
      .sort();

    if (files.length > 0) {
      totalFilesInKho += files.length;
      mdContent += `## 🩺 ${spec} (${files.length} bài)\n\n`;
      files.forEach(f => {
        const fileNoExt = path.parse(f).name;
        mdContent += `- [[${f}|${fileNoExt}]]\n`;
      });
      mdContent += `\n`;
    }
  });

  mdContent += `\n---\n*Tổng số lượng bài viết: **${totalFilesInKho}** bài*\n`;

  const mocPath = path.join(khoDir, `${kho.title}.md`);
  fs.writeFileSync(mocPath, mdContent, 'utf8');
  console.log(`Đã tạo: ${mocPath} (${totalFilesInKho} files indexed)`);
});
