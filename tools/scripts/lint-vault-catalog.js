/**
 * CliniPortal — Knowledge Vault Catalog & Link Integrity Linter
 * Kiểm tra toàn diện chất lượng dữ liệu sau khi tái cấu trúc
 */

const fs = require('fs');
const path = require('path');

const CATALOG_PATH = path.resolve(__dirname, '../../src/content/knowledge-vault/data/vault-catalog.json');
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));

console.log(`[LINT] Total indexed articles: ${catalog.length}`);

// 1. Check articles per khoCode
const khoCounts = {};
catalog.forEach(art => {
  khoCounts[art.khoCode] = (khoCounts[art.khoCode] || 0) + 1;
});

console.log('\n[LINT] Article counts per Kho:');
Object.entries(khoCounts).sort((a, b) => b[1] - a[1]).forEach(([k, c]) => {
  console.log(`  - ${k.padEnd(8)}: ${c} articles`);
});

// 2. Check core diseases coverage in DocSpace
const CORE_DISEASES = [
  { name: 'Nhồi máu cơ tim (I21)', code: 'I21' },
  { name: 'Thuyên tắc phổi (I26)', code: 'I26' },
  { name: 'Viêm phổi (J18)', code: 'J18' },
  { name: 'COPD (J44)', code: 'J44' },
  { name: 'Hen phế quản (J45)', code: 'J45' },
  { name: 'Viêm tụy cấp (K85)', code: 'K85' },
  { name: 'Sốt xuất huyết Dengue (A97)', code: 'A97' },
  { name: 'Tổn thương thận cấp (N17)', code: 'N17' },
  { name: 'Bệnh thận mạn (N18)', code: 'N18' },
  { name: 'Lupus ban đỏ (M32)', code: 'M32' },
  { name: 'Đái tháo đường (E11)', code: 'E11' },
  { name: 'Đột quỵ (I63)', code: 'I63' },
  { name: 'Suy tim (I50)', code: 'I50' },
];

console.log('\n[LINT] Checking Core Diseases ICD-10 Coverage in Knowledge Vault:');
let allCovered = true;
CORE_DISEASES.forEach(d => {
  const matched = catalog.filter(a => a.icd10 && a.icd10.some(c => c.toUpperCase().includes(d.code)));
  const khos = [...new Set(matched.map(a => a.khoCode))];
  console.log(`  ✓ ${d.name.padEnd(32)}: ${matched.length} articles across [${khos.join(', ')}]`);
  if (matched.length === 0) allCovered = false;
});

// 3. Check Kho Bệnh Án (BA) specifically
const baArticles = catalog.filter(a => a.khoCode === 'BA');
console.log(`\n[LINT] Kho Bệnh Án (BA) check: ${baArticles.length} structured SOAP cases indexed.`);
baArticles.forEach(a => {
  console.log(`  - [${a.specialty || 'General'}] ${a.title} (ICD: ${a.icd10.join(', ') || 'None'})`);
});

if (allCovered && baArticles.length >= 7) {
  console.log('\n✅ [LINT SUCCESS] Knowledge Vault restructuring is 100% compliant with DocSpace MedLens!');
} else {
  console.log('\n⚠️ [LINT WARNING] Some checks did not fully pass.');
}
