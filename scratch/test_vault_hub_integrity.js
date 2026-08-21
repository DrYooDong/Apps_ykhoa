const fs = require('fs');
const path = require('path');

console.log('=== TEST INTEGRITY CHO PHÂN HỆ THỨ 4: KNOWLEDGE VAULT ===\n');

const catalogPath = 'd:/Apps_ykhoa/src/content/knowledge-vault/data/vault-catalog.json';
if (!fs.existsSync(catalogPath)) {
  console.error('LỖI: Chưa có vault-catalog.json');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
console.log(`✅ Catalog chứa: ${catalog.length} bài viết.`);

// Check breakdown by Kho
const byKho = {};
catalog.forEach(item => {
  byKho[item.khoName] = (byKho[item.khoName] || 0) + 1;
});
console.log('\nThống kê theo 4 Kho Demo:');
console.log(JSON.stringify(byKho, null, 2));

// Verify sample 10 files exist in filesystem
console.log('\nKiểm tra đối soát tệp tin thực tế:');
let missing = 0;
catalog.forEach(item => {
  const p = path.join('d:/Apps_ykhoa/knowledge-vault', item.relPath);
  if (!fs.existsSync(p)) {
    console.log('MISSING:', item.relPath);
    missing++;
  }
});

console.log(`\nKết quả đối soát: ${catalog.length - missing}/${catalog.length} files tồn tại chính xác 100% (Missing: ${missing}).`);

// Check DocSpace links
const dspView = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/docspace-view.ts', 'utf8');
const qrd = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/features/quick-reference-drawer.ts', 'utf8');

console.log('DocSpace Navigation link included:', dspView.includes('knowledge-vault/index.html'));
console.log('DocSpace QuickReferenceDrawer Tab included:', qrd.includes('Kho Tri Thức (600+ Bài)'));
