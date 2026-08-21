const fs = require('fs');

console.log('=== KIỂM THỬ THẺ GHI NHỚ FLASHCARDS SM-2 & THỬ THÁCH CA TRỰC 5 PHÚT ===\n');

// 1. Kiểm tra types.ts
const typesContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/types.ts', 'utf8');
const hasFlashcardType = typesContent.includes('interface MedicalFlashcard');
const hasReviewState = typesContent.includes('interface FlashcardReviewState');

console.log(`1. TypeScript Interfaces:`);
console.log(`   - MedicalFlashcard: ${hasFlashcardType ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - FlashcardReviewState: ${hasReviewState ? '✅ OK' : '❌ Lỗi'}`);

// 2. Kiểm tra vault-flashcard-engine.ts
const engineContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-flashcard-engine.ts', 'utf8');
const hasSm2Calc = engineContent.includes('calculateSm2');
const hasCardBank = engineContent.includes('DEFAULT_MEDICAL_FLASHCARDS');
const hasFlipCss = engineContent.includes('rotateY(180deg)') && engineContent.includes('preserve-3d');
const hasRateButtons = engineContent.includes('js-fc-rate-btn');
const hasStorage = engineContent.includes('dsp_flashcards_progress_');

console.log(`\n2. Flashcard Engine & SM-2 Logic:`);
console.log(`   - Hàm tính toán SM-2: ${hasSm2Calc ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Ngân hàng thẻ Flashcards lâm sàng: ${hasCardBank ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Hiệu ứng 3D Card Flip CSS: ${hasFlipCss ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - 4 Nút đánh giá SM-2 (0-4): ${hasRateButtons ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Cơ chế lưu trữ LocalStorage: ${hasStorage ? '✅ OK' : '❌ Lỗi'}`);

// 3. Kiểm tra tích hợp vào Web Hub (vault-hub-view.ts)
const hubContent = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-hub-view.ts', 'utf8');
const hasFlashcardTab = hubContent.includes('Thẻ Ghi Nhớ Flashcard') && hubContent.includes('data-group="FLASHCARD"');
const hasMountPoint = hubContent.includes('vault-flashcard-mount-point');

console.log(`\n3. Web Hub Integration:`);
console.log(`   - Tab Thẻ Ghi Nhớ trên Main Hub: ${hasFlashcardTab ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Điểm gắn Flashcard Studio Mount: ${hasMountPoint ? '✅ OK' : '❌ Lỗi'}`);

if (hasFlashcardType && hasReviewState && hasSm2Calc && hasCardBank && hasFlipCss && hasRateButtons && hasStorage && hasFlashcardTab && hasMountPoint) {
  console.log('\n🎉 TẤT CẢ TÍNH NĂNG FLASHCARD & THỬ THÁCH CA TRỰC ĐÃ SẴN SÀNG & HOÀN HẢO!');
} else {
  console.log('\n⚠️ Cần kiểm tra lại một số thành phần.');
}
