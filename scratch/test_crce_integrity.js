const fs = require('fs');

const content = fs.readFileSync('src/content/docspace/data/diagnostic-criteria-database.ts', 'utf8');

const diseases = [
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

console.log('=== TEST KIỂM THỬ 10 BỆNH TRỌNG TÂM CRCE ===');
let passCount = 0;
diseases.forEach((d, idx) => {
  const hasKey = content.includes("'" + d + "':");
  console.log(`${idx + 1}. [${d}]: ${hasKey ? '✅ ĐẠT' : '❌ LỖI'}`);
  if (hasKey) passCount++;
});

const symptomContent = fs.readFileSync('src/content/docspace/data/symptom-icd-mapping.ts', 'utf8');
const symptoms = ['dau_nguc', 'kho_tho', 'sot_cap', 'dau_bung_thuong_vi', 'yeu_liet_than_kinh', 'phu_thieu_nieu', 'bang_bung_vang_da', 'roi_loan_duong_huyet'];
console.log('\n=== TEST KIỂM THỬ 8 HỘI CHỨNG TRIỆU CHỨNG LÂM SÀNG ===');
let symPass = 0;
symptoms.forEach((s, idx) => {
  const hasSym = symptomContent.includes("symptomKey: '" + s + "'");
  console.log(`${idx + 1}. [${s}]: ${hasSym ? '✅ ĐÃ ÁNH XẠ' : '❌ LỖI'}`);
  if (hasSym) symPass++;
});

console.log(`\nTổng kết: ${passCount}/10 bệnh & ${symPass}/8 hội chứng triệu chứng hoàn hảo!`);
