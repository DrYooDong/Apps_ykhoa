const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';
const targetKhos = [
  { matchName: 'Kho giải phẫu & sinh lý', code: 'GPSL', name: 'Giải phẫu & Sinh lý', icon: 'fa-heart-pulse' },
  { matchName: 'Kho hóa sinh y học', code: 'HS', name: 'Hóa sinh Y học', icon: 'fa-flask' },
  { matchName: 'Kho sinh lý bệnh', code: 'SLB', name: 'Sinh lý bệnh', icon: 'fa-bolt' },
  { matchName: 'Kho dịch tễ học', code: 'DTH', name: 'Dịch tễ & Vi sinh', icon: 'fa-virus' }
];

const vaultEntries = fs.readdirSync(vaultBase, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

let catalog = [];

targetKhos.forEach(kho => {
  const matchedDir = vaultEntries.find(d => d.toLowerCase().includes(kho.matchName.toLowerCase()));
  if (!matchedDir) {
    console.log(`Directory not found for: ${kho.matchName}`);
    return;
  }
  const khoPath = path.join(vaultBase, matchedDir);
  console.log(`Scanning: ${matchedDir}...`);

  const subDirs = fs.readdirSync(khoPath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  subDirs.forEach(sub => {
    const subPath = path.join(khoPath, sub);
    const files = fs.readdirSync(subPath, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name);

    files.forEach(f => {
      const fullPath = path.join(subPath, f);
      const fileNoExt = path.parse(f).name;
      
      const parts = fileNoExt.split('_');
      const prefix = parts[0] || kho.code;
      const part = parts.length > 2 ? parts[parts.length - 1] : 'P1';
      const title = parts.length > 2 ? parts.slice(1, -1).join('_') : (parts[1] || fileNoExt);

      let snippet = '';
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const cleanContent = content.replace(/^---[\s\S]*?---/, '').replace(/[#*`_\[\]]/g, ' ').trim();
        snippet = cleanContent.slice(0, 220).replace(/\s+/g, ' ');
      } catch (e) {}

      catalog.push({
        id: `${prefix}_${Math.random().toString(36).substr(2, 8)}`,
        title: title.trim(),
        fullFileName: f,
        khoCode: kho.code,
        khoName: kho.name,
        khoDir: matchedDir,
        khoIcon: kho.icon,
        specialty: sub,
        part: part,
        relPath: path.relative(vaultBase, fullPath).replace(/\\/g, '/'),
        snippet: snippet,
        readTime: '8-12 phút'
      });
    });
  });
});

console.log(`Đã tạo catalog với ${catalog.length} bài viết từ 4 kho.`);

const outDir = 'd:/Apps_ykhoa/src/content/knowledge-vault/data';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'vault-catalog.json');
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Đã lưu catalog tại: ${outPath}`);
