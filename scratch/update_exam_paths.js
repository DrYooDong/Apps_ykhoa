const fs = require('fs');
const path = require('path');

const examFile = path.resolve(__dirname, '../src/content/pathophysiology/quiz/exam-bank-data.ts');
let content = fs.readFileSync(examFile, 'utf8');

const mapping = {
  'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/01-nuoc-ph-he-dem.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 1 - Đại phân tử sinh học/HS_Hóa học Nước, Điện giải & pH_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/03-hoa-hoc-lipid.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 1 - Đại phân tử sinh học/HS_Hóa học Lipid & Lipoprotein_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block1-biomolecules/05-hoa-hoc-hemoglobin.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 1 - Đại phân tử sinh học/HS_Hóa học Hemoglobin & Myoglobin_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block2-catalysis-signaling/07-vitamin-coenzym.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 2 - Xúc tác sinh học & Truyền tin/HS_vitamin coenzym_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block2-catalysis-signaling/08-enzym-dong-hoc.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 2 - Xúc tác sinh học & Truyền tin/HS_enzym dong hoc_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block3-bioenergetics/12-chu-trinh-krebs.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 3 - Chuyển hóa năng lượng & Oxy hóa tế bào/HS_12-chu-trinh-krebs_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block3-bioenergetics/13-chuoi-ho-hap-etc.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 3 - Chuyển hóa năng lượng & Oxy hóa tế bào/HS_13-chuoi-ho-hap-etc_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block4-intermediary-metabolism/18-chuyen-hoa-nucleotid-gout.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 4 - Chuyển hóa trung gian chất/HS_18-chuyen-hoa-nucleotid-gout_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block4-intermediary-metabolism/17-chuyen-hoa-hemoglobin-bilirubin.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 4 - Chuyển hóa trung gian chất/HS_17-chuyen-hoa-hemoglobin-bilirubin_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block5-molecular-genetics/19-tai-ban-sua-sai-dna.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 5 - Di truyền phân tử & Sinh học phân tử/HS_19-tai-ban-sua-sai-dna_P1.md',
  'knowledge-vault/0. Hóa sinh y học/block7-clinical-biochemistry/28-dau-an-tim-mach-troponin-bnp.md': 'knowledge-vault/1.2. Kho hóa sinh y học/Block 7 - Hóa sinh lâm sàng & Xét nghiệm/HS_28-dau-an-tim-mach-troponin-bnp_P1.md',

  'knowledge-vault/0. Giải phẫu & sinh lý/0.1. Đại cương & Tế bào/SL_Điện thế màng & Điện thế hoạt động.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/01. Tế bào & Đại cương/GPSL_Điện thế màng & Điện thế hoạt động_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.2. Cơ & Thần kinh/SL_Co xuong.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/02. Thần kinh & Cơ/GPSL_Cơ xương_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.2. Cơ & Thần kinh/SL_Thần kinh_Vỏ não & Chức năng thần kinh cao cấp.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/02. Thần kinh & Cơ/GPSL_Thần kinh Vỏ não & Chức năng thần kinh cao cấp_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.3. Huyết học/SL_Huyết học_Hồng cầu.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/03. Huyết học & Miễn dịch/GPSL_Huyết học Hồng cầu_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.3. Huyết học/SL_Huyết học_Tiểu cầu & Cầm máu.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/03. Huyết học & Miễn dịch/GPSL_Huyết học Tiểu cầu & Cầm máu_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.4. Tuần hoàn & Tim mạch/SL_Tim mạch_Cơ tim & Hoạt động điện.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/04. Tuần hoàn & Tim mạch/GPSL_Tim mạch Cơ tim & Hoạt động điện_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.4. Tuần hoàn & Tim mạch/SL_Tim mạch_Chu kỳ tim & Cung lượng tim.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/04. Tuần hoàn & Tim mạch/GPSL_Tim mạch Chu kỳ tim & Cung lượng tim_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.5. Hô hấp/SL_Hô hấp_Cơ học hô hấp & Thông khí phế nang.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/05. Hô hấp/GPSL_Hô hấp Cơ học hô hấp & Thông khí phế nang_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.6. Tiêu hóa/SL_Tiêu hóa_Dạ dày.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/06. Tiêu hóa/GPSL_Tiêu hóa Dạ dày_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.6. Tiêu hóa/SL_Tiêu hóa_Gan & Tụy ngoại tiết.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/06. Tiêu hóa/GPSL_Tiêu hóa Gan & Tụy ngoại tiết_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.7. Thận - Tiết niệu & Thăng bằng toan kiềm/SL_Thận_Tái hấp thu & Bài tiết ở ống thận.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/07. Thận - Tiết niệu & Toan kiềm/GPSL_Thận Tái hấp thu & Bài tiết ở ống thận_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.7. Thận - Tiết niệu & Thăng bằng toan kiềm/SL_Thận_Pha loãng & Cô đặc nước tiểu_Điều hòa dịch.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/07. Thận - Tiết niệu & Toan kiềm/GPSL_Thận Pha loãng & Cô đặc nước tiểu_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.8. Nội tiết & Sinh sản/SL_Nội tiết_Tuyến vỏ thượng thận.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/08. Nội tiết & Sinh sản/GPSL_Nội tiết Tuyến vỏ thượng thận_P1.md',
  'knowledge-vault/0. Giải phẫu & sinh lý/0.8. Nội tiết & Sinh sản/SL_Sinh sản.md': 'knowledge-vault/1.1. Kho giải phẫu & sinh lý/08. Nội tiết & Sinh sản/GPSL_Sinh sản_P1.md',
};

// Also fix comment on line 4
content = content.replace(
  'knowledge-vault/0. Hóa sinh y học & 0. Giải phẫu & sinh lý',
  'knowledge-vault/1.2. Kho hóa sinh y học & 1.1. Kho giải phẫu & sinh lý'
);

let count = 0;
for (const [oldP, newP] of Object.entries(mapping)) {
  if (content.includes(oldP)) {
    content = content.replaceAll(oldP, newP);
    count++;
    console.log(`Replaced: ${oldP} -> ${newP}`);
  }
}

fs.writeFileSync(examFile, content, 'utf8');
console.log(`Updated exam-bank-data.ts with ${count} path replacements.`);
