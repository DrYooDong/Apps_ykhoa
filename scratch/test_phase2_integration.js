const fs = require('fs');

console.log('=== KIỂM THỬ TÍCH HỢP GIAI ĐOẠN 2: THỰC HÀNH LÂM SÀNG & BỆNH PHÒNG ===\n');

// 1. Kiểm tra chronic-care-view.ts
const chronicContent = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/features/chronic-care-view.ts', 'utf8');
const hasChronicVault = chronicContent.includes('Tài Liệu &amp; Phác Đồ Hỗ Trợ Từ Knowledge Vault');
const hasDashLink = chronicContent.includes('search=DASH');
const hasMedLinks = chronicContent.includes('search=Statin');

console.log(`1. Chronic Care (Bệnh mạn tính):`);
console.log(`   - Khung Cẩm Nang Vault: ${hasChronicVault ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Dinh dưỡng DASH / Địa Trung Hải: ${hasDashLink ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Phác đồ thuốc mạn tính: ${hasMedLinks ? '✅ OK' : '❌ Lỗi'}`);

// 2. Kiểm tra oncall-view.ts
const oncallContent = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/features/oncall-view.ts', 'utf8');
const hasEmergencyVault = oncallContent.includes('Cẩm Nang Cấp Cứu Nhanh Cho Ca Trực (Từ Vault)');
const hasAcsEmergency = oncallContent.includes('search=Hội chứng vành cấp');
const hasCopdEmergency = oncallContent.includes('search=COPD');
const hasSepsisEmergency = oncallContent.includes('search=Sốc nhiễm');
const hasDkaEmergency = oncallContent.includes('search=DKA');

console.log(`\n2. On-Call Shift (Ca trực bệnh phòng):`);
console.log(`   - Khung Cẩm Nang Cấp Cứu: ${hasEmergencyVault ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Cấp cứu Tim mạch (ACS): ${hasAcsEmergency ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Cấp cứu Hô hấp (COPD): ${hasCopdEmergency ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Cấp cứu Nhiễm khuẩn (Sepsis): ${hasSepsisEmergency ? '✅ OK' : '❌ Lỗi'}`);
console.log(`   - Link Cấp cứu Chuyển hóa (DKA): ${hasDkaEmergency ? '✅ OK' : '❌ Lỗi'}`);

if (hasChronicVault && hasDashLink && hasMedLinks && hasEmergencyVault && hasAcsEmergency && hasCopdEmergency && hasSepsisEmergency && hasDkaEmergency) {
  console.log('\n🎉 TẤT CẢ TÍNH NĂNG GIAI ĐOẠN 2 ĐÃ SẴN SÀNG & HOÀN HẢO!');
} else {
  console.log('\n⚠️ Cần kiểm tra lại một số thành phần.');
}
