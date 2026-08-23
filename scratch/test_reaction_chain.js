/**
 * Automated Verification Script for Clinical Reaction Chain Engine (CRCE)
 */

const { DIAGNOSTIC_CHAIN_DATABASE, findReactionChainByIcd, getAllReactionChains } = require('../dist/assets/main-BAPTuqh9.js') || {};

console.log('=== TEST 1: Kiểm tra CSDL 10 Bệnh Trọng Tâm ===');
const allChains = Object.keys(DIAGNOSTIC_CHAIN_DATABASE || {});
console.log(`Số bệnh định nghĩa trong DIAGNOSTIC_CHAIN_DATABASE: ${allChains.length}`);

const expectedDiseases = [
  'viem_phoi',
  'thuyen_tac_phoi',
  'xo_gan',
  'suy_than',
  'viem_tuy_cap',
  'dai_thao_duong',
  'tang_huyet_ap',
  'suy_tim',
  'sot_xuat_huyet',
  'dot_quy_nao'
];

let passed = 0;
expectedDiseases.forEach(key => {
  const item = DIAGNOSTIC_CHAIN_DATABASE[key];
  if (item && item.criteria && item.criteria.length > 0 && item.protocol && item.protocol.firstLineDrugs.length > 0) {
    console.log(`✅ [${item.icdCode}] ${item.diseaseName} (${item.criteria.length} tiêu chuẩn, ${item.protocol.firstLineDrugs.length} thuốc bậc 1, ${item.complications.length} biến chứng)`);
    passed++;
  } else {
    console.error(`❌ Thiếu cấu hình cho bệnh: ${key}`);
  }
});

console.log(`\nKết quả: ${passed}/${expectedDiseases.length} bệnh đạt chuẩn 100%!`);
