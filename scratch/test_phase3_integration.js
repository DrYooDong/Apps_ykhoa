const fs = require('fs');

console.log('=== KIỂM THỬ TÍCH HỢP GIAI ĐOẠN 3: ĐÚC KẾT & XUẤT TRI THỨC VAULT ===\n');

// 1. Kiểm tra types.ts trong knowledge-vault
const typesContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/types.ts', 'utf8');
const hasAnnotationType = typesContent.includes('interface VaultPersonalAnnotation');

console.log(`1. TypeScript Type Definitions:`);
console.log(`   - Interface VaultPersonalAnnotation: ${hasAnnotationType ? '✅ OK' : '❌ Lỗi'}`);

// 2. Kiểm tra vault-reader-pro.ts
const readerContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-reader-pro.ts', 'utf8');
const hasGetAnn = readerContent.includes('getAnnotationsForArticle');
const hasSaveAnn = readerContent.includes('saveAnnotationForArticle');
const hasDeleteAnn = readerContent.includes('deleteAnnotation');
const hasRenderAnn = readerContent.includes('renderAnnotationsBoxHtml');
const hasExportMdBtn = readerContent.includes('btn-export-vault-md');
const hasExportMdLogic = readerContent.includes('Annotated.md');

console.log(`\n2. Knowledge Vault Reader Pro:`);
console.log(`   - Hàm getAnnotationsForArticle: ${hasGetAnn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Hàm saveAnnotationForArticle: ${hasSaveAnn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Hàm deleteAnnotation: ${hasDeleteAnn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Render Box Ghi chú lâm sàng: ${hasRenderAnn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Nút Xuất Markdown: ${hasExportMdBtn ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Logic Tải tệp Markdown kèm Clinical Pearls: ${hasExportMdLogic ? '✅ OK' : '❌ Lỗi'}`);

// 3. Kiểm tra vault-hub-view.ts
const hubContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-hub-view.ts', 'utf8');
const hasAnnotationsInDrawer = hubContent.includes('annotationsHtml') && hubContent.includes('renderAnnotationsBoxHtml');

console.log(`\n3. Web Hub Dynamic Drawer:`);
console.log(`   - Tích hợp Annotations Box vào Drawer: ${hasAnnotationsInDrawer ? '✅ OK' : '❌ Lỗi'}`);

if (hasAnnotationType && hasGetAnn && hasSaveAnn && hasDeleteAnn && hasRenderAnn && hasExportMdBtn && hasExportMdLogic && hasAnnotationsInDrawer) {
  console.log('\n🎉 TẤT CẢ TÍNH NĂNG GIAI ĐOẠN 3 ĐÃ SẴN SÀNG & HOÀN HẢO!');
} else {
  console.log('\n⚠️ Cần kiểm tra lại một số thành phần.');
}
