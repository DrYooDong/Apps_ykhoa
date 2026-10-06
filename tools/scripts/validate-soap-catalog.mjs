#!/usr/bin/env node

/**
 * CliniPortal DocSpace — SOAP Catalog & Data Validator
 * Kiểm tra tính toàn vẹn và đồng bộ giữa thư mục data/ba/*.md và các file catalog JSON.
 *
 * Cú pháp:
 *   node tools/scripts/validate-soap-catalog.mjs
 */

import fs from 'fs';
import path from 'path';

const ROOT = fs.existsSync(path.join(process.cwd(), 'src/content/docspace'))
  ? process.cwd()
  : (fs.existsSync('d:/Apps/Apps_ykhoa/src/content/docspace') ? 'd:/Apps/Apps_ykhoa' : process.cwd());

const DOCSPACE_BA_DIR = path.join(ROOT, 'src/content/docspace/data/ba');
const THUCHANH_CATALOG_PATH = path.join(ROOT, 'src/content/docspace/src/data/vault-catalog-thuc-hanh.json');
const MASTER_CATALOG_PATH = path.join(ROOT, 'src/content/docspace/src/data/vault-catalog.json');

console.log('===================================================================');
console.log('🩺 CLINIPORTAL DOCSPACE — SOAP CATALOG VALIDATOR');
console.log('===================================================================\n');

let hasErrors = false;
let warnings = [];
let errors = [];

// 1. Kiểm tra thư mục nguồn
if (!fs.existsSync(DOCSPACE_BA_DIR)) {
  console.error(`❌ Lỗi: Thư mục ${DOCSPACE_BA_DIR} không tồn tại!`);
  process.exit(1);
}

const mdFiles = fs.readdirSync(DOCSPACE_BA_DIR)
  .filter(f => f.endsWith('.md'))
  .sort();

console.log(`📁 Tìm thấy ${mdFiles.length} file .md trong thư mục data/ba/`);

// 2. Kiểm tra các file catalog
if (!fs.existsSync(THUCHANH_CATALOG_PATH)) {
  console.error(`❌ Lỗi: File catalog thực hành ${THUCHANH_CATALOG_PATH} không tồn tại!`);
  process.exit(1);
}

const thuchanhCatalog = JSON.parse(fs.readFileSync(THUCHANH_CATALOG_PATH, 'utf-8'));
const thuchanhBaEntries = thuchanhCatalog.filter(e => e.khoCode === 'BA');

console.log(`📋 Catalog Thực hành (vault-catalog-thuc-hanh.json): ${thuchanhBaEntries.length} ca bệnh (khoCode: BA)`);

let masterBaEntries = [];
if (fs.existsSync(MASTER_CATALOG_PATH)) {
  const masterCatalog = JSON.parse(fs.readFileSync(MASTER_CATALOG_PATH, 'utf-8'));
  masterBaEntries = masterCatalog.filter(e => e.khoCode === 'BA');
  console.log(`📋 Master Catalog (vault-catalog.json): ${masterBaEntries.length} ca bệnh (khoCode: BA)`);
}

// 3. Đối chiếu số lượng
console.log('\n🔍 BƯỚC 1: ĐỐI CHIẾU SỐ LƯỢNG CA BỆNH...');
if (mdFiles.length !== thuchanhBaEntries.length) {
  errors.push(`Số lượng file .md (${mdFiles.length}) KHÔNG KHỚP với catalog thực hành (${thuchanhBaEntries.length})!`);
  hasErrors = true;
} else {
  console.log('   ✅ Số lượng file .md khớp chính xác với vault-catalog-thuc-hanh.json');
}

// 4. Đối chiếu từng file với catalog
console.log('\n🔍 BƯỚC 2: KIỂM TRA TỪNG CA BỆNH...');
const thuchanhIdMap = new Map(thuchanhBaEntries.map(e => [e.id, e]));
const thuchanhFileMap = new Map(thuchanhBaEntries.map(e => [path.basename(e.relPath || e.fullFileName || ''), e]));

for (const file of mdFiles) {
  const filePath = path.join(DOCSPACE_BA_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Trích xuất frontmatter cơ bản
  const titleMatch = content.match(/^title:\s*["']?([^"'\n\r]+)["']?/m);
  const caseIdMatch = content.match(/^caseId:\s*["']?([^"'\n\r]+)["']?/m);
  const specialtyMatch = content.match(/^specialty:\s*["']?([^"'\n\r]+)["']?/m);

  const title = titleMatch ? titleMatch[1].trim() : '(Không có tiêu đề)';
  const frontmatterCaseId = caseIdMatch ? caseIdMatch[1].trim() : null;
  const expectedId = frontmatterCaseId || (file.startsWith('soap-') ? file.replace(/\.md$/, '') : `soap-${file.replace(/\.md$/, '')}`);

  // Tìm trong catalog
  const entry = thuchanhIdMap.get(expectedId) || thuchanhFileMap.get(file);

  if (!entry) {
    errors.push(`File ${file} chưa được nạp vào vault-catalog-thuc-hanh.json!`);
    hasErrors = true;
    continue;
  }

  // Kiểm tra tính nhất quán ID
  if (entry.id !== expectedId) {
    warnings.push(`File ${file}: ID trong catalog (${entry.id}) khác với ID dự kiến (${expectedId})`);
  }

  // Kiểm tra HTML entities còn sót lại
  if (/&(?:gt|lt|amp|quot|#39|nbsp);/.test(entry.title)) {
    warnings.push(`Ca "${entry.title}" (${entry.id}) còn chứa HTML entities thô trong trường title!`);
  }

  // Kiểm tra các trường lâm sàng thiết yếu
  if (!entry.specialty) {
    warnings.push(`Ca "${entry.id}" thiếu trường 'specialty'!`);
  }
}

// 5. Kiểm tra trường hợp catalog mồ côi (entry trong catalog nhưng không có file .md)
for (const entry of thuchanhBaEntries) {
  const expectedFileName = `${entry.id}.md`;
  const matchedFile = mdFiles.find(f => f === expectedFileName || f === path.basename(entry.relPath || ''));
  if (!matchedFile) {
    errors.push(`Entry "${entry.id}" tồn tại trong catalog nhưng KHÔNG TÌM THẤY file .md tương ứng!`);
    hasErrors = true;
  }
}

// 6. Tổng kết
console.log('\n===================================================================');
console.log('📊 KẾT QUẢ KIỂM ĐỊNH TỔNG THỂ');
console.log('===================================================================');

if (warnings.length > 0) {
  console.log(`\n⚠️  CẢNH BÁO (${warnings.length}):`);
  warnings.forEach(w => console.log(`   - ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ LỖI NGHIÊM TRỌNG (${errors.length}):`);
  errors.forEach(e => console.log(`   - ${e}`));
  console.log('\n👉 HƯỚNG XỬ LÝ:');
  console.log('   Hãy chạy lệnh sau để tự động đồng bộ lại toàn bộ danh mục:');
  console.log('   node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba\n');
  process.exit(1);
} else {
  console.log('\n🎉 HOÀN TẤT: Toàn bộ danh mục SOAP hoàn toàn đồng bộ, không có lỗi trôi dạt dữ liệu!');
  process.exit(0);
}
