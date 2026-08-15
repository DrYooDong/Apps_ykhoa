const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology/biochemistry');
const vaultDir = path.join(__dirname, '../knowledge-vault/0. Hóa sinh y học');

const blockFolders = {
  'block-1': 'block1-biomolecules',
  'block-2': 'block2-catalysis-signaling',
  'block-3': 'block3-bioenergetics',
  'block-4': 'block4-intermediary-metabolism',
  'block-5': 'block5-molecular-genetics',
  'block-6': 'block6-organ-metabolism',
  'block-7': 'block7-clinical-biochemistry'
};

const dataFile = path.join(__dirname, '../src/content/pathophysiology/data/biochemistry-data.ts');
let tsContent = fs.readFileSync(dataFile, 'utf8');

// Bỏ import statement ở đầu
tsContent = tsContent.replace(/import\s+[^;]+;/, '');
// Bỏ type annotation ': BiochemistryDataStore'
tsContent = tsContent.replace(/:\s*BiochemistryDataStore\s*=/, '=');
// Chuyển export const BIOCHEMISTRY_DATA thành var BIOCHEMISTRY_DATA
tsContent = tsContent.replace(/export\s+const\s+BIOCHEMISTRY_DATA/, 'var BIOCHEMISTRY_DATA');

// Chạy mã để lấy object
const sandbox = {};
const fn = new Function('sandbox', `${tsContent}; return BIOCHEMISTRY_DATA;`);
const data = fn(sandbox);

console.log(`Loaded ${data.topics.length} topics and ${data.blocks.length} blocks!`);

data.topics.forEach(t => {
  const order = String(t.order).padStart(2, '0');
  const folderName = blockFolders[t.blockId] || 'general';
  const fileName = `${order}-${t.slug}.md`;

  const mdTemplate = `# ${t.code}: ${t.title}

> **Phân loại**: ${t.badge} | **Khối**: ${t.blockId.toUpperCase()}  
> **Tags**: ${t.tags.map(tag => `#${tag.replace(/\s+/g, '_')}`).join(' ')}

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan
${t.overview}

---

## 🔬 Phản Ứng & Cơ Chế Chìa Khóa
${t.keyReactions.map(r => `- \`${r}\``).join('\n')}

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)
${t.clinicalPearls.map(p => `> [!IMPORTANT]\n> ${p}`).join('\n\n')}

---

## 🧪 Chỉ Số Xét Nghiệm & Thăm Dò Liên Quan
| STT | Xét nghiệm / Chỉ số | Ý nghĩa & Bệnh lý liên quan |
| :--- | :--- | :--- |
${t.relatedLabTests.map((test, idx) => `| ${idx + 1} | **${test}** | Đánh giá chẩn đoán và theo dõi điều trị |`).join('\n')}

---
*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, Clinical Biochemistry 7th, Essential Biochemistry (Pratt).*
`;

  // Lưu vào Web repo
  const webDir = path.join(baseDir, folderName);
  fs.mkdirSync(webDir, { recursive: true });
  fs.writeFileSync(path.join(webDir, fileName), mdTemplate, 'utf8');

  // Lưu vào Obsidian Vault
  const vDir = path.join(vaultDir, folderName);
  fs.mkdirSync(vDir, { recursive: true });
  fs.writeFileSync(path.join(vDir, fileName), mdTemplate, 'utf8');
});

console.log(`Successfully generated all ${data.topics.length} markdown articles in Web repository and Obsidian Vault.`);
