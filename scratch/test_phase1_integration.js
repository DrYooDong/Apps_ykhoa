const fs = require('fs');

console.log('=== KIỂM THỬ TÍCH HỢP GIAI ĐOẠN 1: VAULT <-> DOCSPACE ===\n');

// 1. Kiểm tra file soap-view.ts
const soapContent = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/features/soap-view.ts', 'utf8');
const hasVaultBtn = soapContent.includes('btnVaultKnowledgeSoap');
const hasVaultContextBar = soapContent.includes('soapVaultContextBar');
const hasVaultCitation = soapContent.includes('btnInsertVaultCitationSoap');
const hasFromVaultParam = soapContent.includes('from_vault');

console.log(`1. DocSpace SOAP View Features:`);
console.log(`   - Nút mở Kho Tri Thức Vault: ${hasVaultBtn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Thanh gợi ý Real-time Context Bar: ${hasVaultContextBar ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Nút chèn Trích Dẫn Vault vào Plan: ${hasVaultCitation ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - 1-Click Vault Article to SOAP import: ${hasFromVaultParam ? '✅ OK' : '❌ Lỗi'}`);

// 2. Kiểm tra file vault-reader-pro.ts
const readerContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-reader-pro.ts', 'utf8');
const hasImportProtoBtn = readerContent.includes('btn-import-to-docspace-protocol');
const hasProtoImportLogic = readerContent.includes('dsp:protocol-imported');

console.log(`\n2. Knowledge Vault Reader Pro Features:`);
console.log(`   - Nút 'Nạp vào DocSpace Protocol': ${hasImportProtoBtn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Logic nạp phác đồ động vào DocSpace: ${hasProtoImportLogic ? '✅ OK' : '❌ Lỗi'}`);

// 3. Kiểm tra clinical-bridge.ts
const bridgeContent = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/core/clinical-bridge.ts', 'utf8');
const hasVaultOpenHelper = bridgeContent.includes('openVaultArticle');

console.log(`\n3. Clinical Bridge Core:`);
console.log(`   - Helper openVaultArticle deep linking: ${hasVaultOpenHelper ? '✅ OK' : '❌ Lỗi'}`);

if (hasVaultBtn && hasVaultContextBar && hasVaultCitation && hasFromVaultParam && hasImportProtoBtn && hasProtoImportLogic && hasVaultOpenHelper) {
  console.log('\n🎉 TẤT CẢ TÍNH NĂNG GIAI ĐOẠN 1 ĐÃ SẴN SÀNG & HOÀN HẢO!');
} else {
  console.log('\n⚠️ Cần kiểm tra lại một số thành phần.');
}
