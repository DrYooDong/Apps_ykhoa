#!/usr/bin/env node

/**
 * 🎨 CliniPortal QA Agent Squad — Guidelines Phase 3 Upgrade
 * Script: tools/qa/upgrade-guidelines-phase3.mjs
 * 
 * Mục tiêu:
 *  1. Differentiate Section Icons (Đa dạng hóa icon cho 38 tệp đơn điệu fa-book-medical)
 *  2. Replace Boilerplate KeyRecommendations (14 tệp còn lại trong Nhóm B)
 *  3. Ensure 100% Unix LF Line Endings
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const GUIDELINES_DIR = path.join(ROOT_DIR, 'src/content/ebm/guidelines/kho-guidelines');
const AUDIT_REPORT = path.join(__dirname, 'reports/guidelines-audit-report.json');

// 1. CSDL KeyRecommendations chất lượng cao cho 14 tệp
const BOILERPLATE_FIXES = {
  '2016-jama-sepsis-3-consensus.mdx': [
    'Định nghĩa Sepsis mới: Rối loạn chức năng cơ quan đe dọa tính mạng do đáp ứng mất điều hòa của cơ thể với nhiễm trùng.',
    'Thay thế tiêu chuẩn SIRS bằng thang điểm SOFA tăng ≥ 2 điểm để xác định tổn thương đa cơ quan.',
    'Sàng lọc nhanh tại giường (Bedside) ngoài ICU bằng qSOFA (Nhịp thở ≥ 22, GCS < 15, HATT ≤ 100 mmHg).',
    'Định nghĩa Sốc nhiễm khuẩn: Nhiễm khuẩn huyết kèm tụt huyết áp cần thuốc vận mạch để duy trì MAP ≥ 65 mmHg và Lactate máu > 2 mmol/L dù đã hồi sức dịch đủ.'
  ],
  '2018-tg18-viem-duong-mat.mdx': [
    'Chẩn đoán Viêm đường mật cấp theo Tokyo Guidelines 2018 dựa trên: Viêm hệ thống (sốt, bạch cầu), Ứ mật (vàng da, men gan) và Hình ảnh giãn đường mật/nguyên nhân.',
    'Phân độ mức độ nặng: Độ I (Nhẹ), Độ II (Trung bình: BC > 12.000 hoặc < 4.000, sốt cao ≥ 39°C, tuổi ≥ 75, Bilirubin ≥ 5 mg/dL), Độ III (Nặng: Rối loạn chức năng tạng).',
    'Kháng sinh phổ rộng đường tĩnh mạch và hồi sức tích cực ngay khi có chẩn đoán nghi ngờ.',
    'Chỉ định dẫn lưu đường mật cấp cứu: Bắt buộc dẫn lưu sớm hoặc khẩn cấp qua nội soi mật tụy ngược dòng (ERCP) cho Độ II và Độ III.'
  ],
  '2018-tg18-viem-tui-mat.mdx': [
    'Chẩn đoán Viêm túi mật cấp theo TG18: Dấu hiệu Murphy (+), đau/khối hạ sườn phải kèm dấu hiệu viêm toàn thân và bằng chứng hình ảnh học (siêu âm/CT).',
    'Phân tầng 3 mức độ: Độ I (Viêm túi mật nhẹ), Độ II (Viêm túi mật trung bình: BC > 18.000, khối hạ sườn phải, viêm > 72h), Độ III (Rối loạn chức năng tim mạch, thần kinh, hô hấp, thận, gan, đông máu).',
    'Chỉ định phẫu thuật nội soi cắt túi mật sớm (Laparoscopic Cholecystectomy) trong vòng 72 giờ đầu kể từ khi khởi phát triệu chứng cho Độ I và Độ II.',
    'Dẫn lưu túi mật qua da dưới hướng dẫn siêu âm (PTGBD) cho bệnh nhân Độ III hoặc có chống chỉ định phẫu thuật nặng nề.'
  ],
  '2020-nutrients-lowcarb-vs-lowfat.mdx': [
    'Chế độ ăn Low-Carb (LCD) giúp giảm HbA1c và đường huyết lúc đói vượt trội trong 6 tháng đầu so với Low-Fat.',
    'Cải thiện mạnh mẽ bilan lipid: Giảm Triglycerides và tăng HDL-Cholesterol đáng kể ở nhóm ăn giảm Carbonhydrate.',
    'Tối ưu hóa nguồn đạm và chất béo: Ưu tiên chất béo không bão hòa đơn/đa từ thực vật và cá (Địa Trung Hải) thay vì chất béo bão hòa từ động vật.',
    'Hiệu quả giảm cân dài hạn (> 12 tháng) tương đương giữa Low-Carb và Low-Fat; tính kiên định và tuân thủ là yếu tố quyết định thành công.'
  ],
  '2021-aag-nafld.mdx': [
    'Tầm soát bệnh gan nhiễm mỡ không do rượu (NAFLD/NASH) ở tất cả bệnh nhân đái tháo đường típ 2, béo phì và hội chứng chuyển hóa.',
    'Đánh giá không xâm lấn xơ hóa gan tiến triển bằng thang điểm FIB-4; ngưỡng cắt FIB-4 < 1.30 loại trừ xơ hóa nguy cơ cao.',
    'Can thiệp lối sống là nền tảng: Mục tiêu giảm ≥ 7-10% trọng lượng cơ thể để cải thiện tình trạng viêm hoại tử và thoái lui xơ hóa gan.',
    'Phối hợp đa chuyên khoa Tim mạch - Gan mật - Chuyển hóa kiểm soát toàn diện nguy cơ tử vong tim mạch (nguyên nhân tử vong hàng đầu ở NAFLD).'
  ],
  '2022-acg-gerd.mdx': [
    'Thử nghiệm điều trị bằng thuốc ức chế bơm Proton (PPI test) 8 tuần một lần mỗi ngày trước bữa ăn cho triệu chứng trào ngược điển hình (ợ nóng, ợ chua).',
    'Chỉ định nội soi thực quản - dạ dày (EGD) khi có dấu hiệu báo động (nuốt khó, sụt cân, nôn máu) hoặc không đáp ứng với điều trị PPI chuẩn.',
    'Đo pH-trở kháng thực quản 24 giờ (pH-impedance monitoring) khi ngưng thuốc để khẳng định hoặc loại trừ trào ngược trước khi can thiệp ngoại khoa.',
    'Theo dõi và giám sát định kỳ nội soi cho bệnh nhân có chuyển sản Barrett thực quản để phát hiện sớm loạn sản và ung thư biểu mô tuyến.'
  ],
  '2022-easl-baveno-vii-portal-hypertension-consensus.mdx': [
    'Quy tắc 5-20-25 đo độ cứng gan (LSM) bằng FibroScan: < 5 kPa (Bình thường), < 20 kPa và TC > 150.000 (Tránh nội soi sàng lọc), ≥ 25 kPa (Xác chẩn Tăng áp lực tĩnh mạch cửa có ý nghĩa lâm sàng CSPH).',
    'Thuốc chẹn beta không chọn lọc (NSBB: Carvedilol khởi đầu 6.25-12.5 mg/ngày) là lựa chọn đầu tay dự phòng tiên phát và thứ phát xuất huyết do vỡ giãn tĩnh mạch.',
    'Phối hợp thắt búi tĩnh mạch thực quản qua nội soi (EVL) + NSBB cho dự phòng thứ phát sau xuất huyết cấp.',
    'Chỉ định TIPS sớm (Pre-emptive TIPS trong 72 giờ) cho bệnh nhân xuất huyết tiêu hóa do vỡ giãn có nguy cơ thất bại cao (Child-Pugh C < 14 điểm hoặc Child-Pugh B có chảy máu hoạt động).'
  ],
  '2024-byt-aspergillus-cpa.mdx': [
    'Chẩn đoán Bệnh nấm Aspergillus phổi mạn tính (CPA) dựa trên: Bằng chứng hình ảnh học (hang nấm, dày màng phổi) tồn tại ≥ 3 tháng kèm xét nghiệm Kháng thể Aspergillus IgG huyết thanh (+).',
    'Phân biệt 5 thể CPA: U nấm đơn độc (Aspergilloma), CPA dạng nốt, CPA mạn tính tạo hang (CCPA), CPA xơ hóa mạn tính (CFPA) và Aspergillus xâm lấn bán cấp (SAIA).',
    'Thuốc kháng nấm đầu tay: Voriconazole (uống 200 mg x 2 lần/ngày) hoặc Itraconazole đường uống kéo dài tối thiểu 6 tháng.',
    'Theo dõi định kỳ nồng độ thuốc trong máu (TDM), độc tính gan thận, kéo dài khoảng QTc và xét chỉ định phẫu thuật cắt hang nấm đơn độc.'
  ],
  '2024-esc-atrial-fibrillation.mdx': [
    'Áp dụng toàn diện chiến lược AF-CARE 2024: Quản lý biến chứng (Comorbidities), Dự phòng đột quỵ (Anticoagulation), Kiểm soát triệu chứng (Rate/Rhythm) và Tái đánh giá định kỳ (Evaluation).',
    'Thang điểm CHA2DS2-VA mới (bỏ giới tính nữ): Khuyến cáo kháng đông cho điểm ≥ 2 ở nam hoặc nữ; ưu tiên tuyệt đối thuốc chống đông đường uống thế hệ mới (NOACs/DOACs) hơn VKA.',
    'Kiểm soát nhịp sớm bằng thuốc chống loạn nhịp hoặc Triệt đốt rung nhĩ qua ống thông (Catheter Ablation) cho rung nhĩ kịch phát có triệu chứng.',
    'Kiểm soát triệt để các yếu tố nguy cơ tim mạch kèm theo: Tăng huyết áp, suy tim, đái tháo đường, ngưng thở khi ngủ và béo phì.'
  ],
  '2025-bsg-ibd.mdx': [
    'Đánh giá hoạt tính viêm và theo dõi đáp ứng điều trị bệnh viêm ruột (IBD) bằng xét nghiệm Calprotectin trong phân kết hợp nội soi đại tràng.',
    'Chiến lược điều trị nhắm trúng đích (Treat-to-Target): Mục tiêu đạt liền niêm mạc nội soi và mô học chứ không chỉ đơn thuần cải thiện triệu chứng lâm sàng.',
    'Khởi trị thuốc sinh học sớm (Anti-TNF, Anti-Integrin Vedolizumab, Anti-IL-12/23 Ustekinumab/Risankizumab) hoặc thuốc phân tử nhỏ (JAK inhibitors) cho IBD mức độ trung bình - nặng.',
    'Giám sát nội soi định kỳ phát hiện sớm ung thư biểu mô đại trực tràng từ 8 năm sau khi khởi phát bệnh viêm loét đại tràng toàn bộ hoặc viêm đại tràng Crohn.'
  ],
  '2025-iap-acute-pancreatitis.mdx': [
    'Chẩn đoán Viêm tụy cấp khi có ít nhất 2 trong 3 tiêu chuẩn: Đau bụng cấp kiểu tụy, Amylase hoặc Lipase máu tăng ≥ 3 lần giới hạn trên bình thường, và hình ảnh học đặc trưng (siêu âm/CT).',
    'Hồi sức dịch mục tiêu: Ưu tiên dung dịch Ringer Lactate (200-250 mL/giờ) trong 24 giờ đầu, theo dõi Hct, BUN, mạch, huyết áp và lượng nước tiểu để tránh quá tải dịch.',
    'Dinh dưỡng đường ruột sớm qua đường miệng (Oral refeeding) ngay khi hết nôn và giảm đau bụng; không cần nhịn ăn kéo dài.',
    'Tiếp cận bậc thang (Step-up approach) cho hoại tử tụy nhiễm trùng: Kháng sinh theo kinh nghiệm → Dẫn lưu qua da/nội soi qua dạ dày → Phẫu thuật cắt lọc hoại tử xâm lấn tối thiểu (VARD/Endoscopic necrosectomy).'
  ],
  '2026-dash-diet-hypertension.mdx': [
    'Chế độ ăn DASH (Dietary Approaches to Stop Hypertension) chứng minh hiệu quả giảm 8 - 14 mmHg huyết áp tâm thu ở người tăng huyết áp.',
    'Cắt giảm lượng muối Natri ăn vào: Ngưỡng tối ưu < 1.500 mg/ngày (tương đương ~2/3 thìa cà phê muối ăn) giúp khuếch đại tác dụng hạ áp.',
    'Tăng cường thực phẩm giàu Kali (4.700 mg/ngày), Magie và Canxi thông qua rau củ tươi, trái cây, các loại hạt đậu và ngũ cốc nguyên hạt.',
    'Hạn chế tối đa chất béo bão hòa, thịt đỏ nhiều mỡ, đồ uống có đường và kết hợp kiểm soát cân nặng thể lực thường xuyên.'
  ],
  '2026-eta-diet-and-thyroid.mdx': [
    'Duy trì bổ sung đủ I-ốt (150 mcg/ngày ở người lớn, 250 mcg/ngày ở thai phụ) qua muối i-ốt và hải sản; tránh lạm dụng quá mức thực phẩm chức năng chứa tảo biển.',
    'Bổ sung Selenium hợp lý hỗ trợ enzym chuyển đổi hormone giáp deiodinase và giảm nồng độ kháng thể TPOAb trong viêm tuyến giáp Hashimoto.',
    'Nguyên tắc vàng dùng Levothyroxine: Uống thuốc lúc đói với nước lọc, cách ly ít nhất 2–3 giờ so với các sản phẩm từ đậu nành, viên sắt, canxi và cà phê.',
    'Tuân thủ chế độ ăn Địa Trung Hải giàu chất chống oxy hóa, kiểm tra nồng độ Ferritin và Vitamin D định kỳ để tối ưu hóa chức năng tuyến giáp.'
  ],
  '2026-nature-reviews-mrsa.mdx': [
    'Cơ chế đề kháng Methicillin của S. aureus (MRSA) do gen mecA/mecC mã hóa protein gắn penicillin PBP2a có ái lực cực thấp với hầu hết kháng sinh nhóm beta-lactam.',
    'Vancomycin: Tối ưu hóa liều dựa trên hướng dẫn AUC24/MIC đạt 400 - 600 mg·h/L; theo dõi TDM bằng mô hình Bayes để tối ưu hiệu quả và giảm độc thận.',
    'Kháng sinh thay thế cho nhiễm trùng MRSA nặng: Daptomycin liều cao (8-10 mg/kg/ngày) cho vãng khuẩn huyết/viêm nội tâm mạc, Ceftaroline (hoạt tính trên PBP2a), và Linezolid cho viêm phổi MRSA.',
    'Kiểm soát ổ nhiễm khuẩn triệt để (Source control): Rút bỏ ngay catheter tĩnh mạch nhiễm trùng, dẫn lưu mủ áp xe và phẫu thuật cắt lọc mô hoại tử.'
  ]
};

// 2. Hàm ánh xạ icon chuyên khoa theo tiêu đề
function chooseIcon(title, index, total) {
  const t = title.toLowerCase();

  if (t.includes('tham khảo') || t.includes('tài liệu') || t.includes('ama') || t.includes('ebm') || index === total) {
    return 'fa-solid fa-book-bookmark';
  }
  if (t.includes('dịch tễ') || t.includes('căn nguyên') || t.includes('tổng quan') || t.includes('gánh nặng') || t.includes('vi sinh') || t.includes('etiotype')) {
    return 'fa-solid fa-globe';
  }
  if (t.includes('lâm sàng') || t.includes('triệu chứng') || t.includes('chẩn đoán') || t.includes('thăm khám') || t.includes('nhận diện') || t.includes('phân loại') || t.includes('phân độ') || t.includes('giai đoạn')) {
    return 'fa-solid fa-stethoscope';
  }
  if (t.includes('cận lâm sàng') || t.includes('xét nghiệm') || t.includes('biomarker') || t.includes('huyết thanh') || t.includes('lactate')) {
    return 'fa-solid fa-vials';
  }
  if (t.includes('hình ảnh') || t.includes('x-quang') || t.includes('ct') || t.includes('mri') || t.includes('siêu âm') || t.includes('nội soi')) {
    return 'fa-solid fa-camera-retro';
  }
  if (t.includes('lưu đồ') || t.includes('thuật toán') || t.includes('sơ đồ') || t.includes('quy trình') || t.includes('ma trận')) {
    return 'fa-solid fa-diagram-project';
  }
  if (t.includes('hồi sức') || t.includes('cấp cứu') || t.includes('sốc') || t.includes('thở máy') || t.includes('tuần hoàn') || t.includes('ards') || t.includes('mục tiêu')) {
    return 'fa-solid fa-heart-pulse';
  }
  if (t.includes('phẫu thuật') || t.includes('thủ thuật') || t.includes('can thiệp') || t.includes('nút mạch') || t.includes('triệt đốt') || t.includes('hifu') || t.includes('vận mạch')) {
    return 'fa-solid fa-syringe';
  }
  if (t.includes('thuốc') || t.includes('dược') || t.includes('kháng sinh') || t.includes('phác đồ') || t.includes('điều trị') || t.includes('khởi trị') || t.includes('liều') || t.includes('daa') || t.includes('nas')) {
    return 'fa-solid fa-pills';
  }
  if (t.includes('đặc biệt') || t.includes('thai kỳ') || t.includes('trẻ em') || t.includes('phụ nữ') || t.includes('cao tuổi') || t.includes('suy thận') || t.includes('mtct')) {
    return 'fa-solid fa-person-pregnant';
  }
  if (t.includes('dự phòng') || t.includes('an toàn') || t.includes('cảnh báo') || t.includes('biến chứng') || t.includes('lối sống') || t.includes('dinh dưỡng') || t.includes('phòng ngừa')) {
    return 'fa-solid fa-shield-virus';
  }

  const defaults = [
    'fa-solid fa-notes-medical',
    'fa-solid fa-stethoscope',
    'fa-solid fa-vials',
    'fa-solid fa-pills',
    'fa-solid fa-heart-pulse',
    'fa-solid fa-triangle-exclamation',
    'fa-solid fa-book-bookmark'
  ];
  return defaults[index % defaults.length];
}

function processFile(fileName) {
  const filePath = path.join(GUIDELINES_DIR, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Normalize CRLF -> LF
  content = content.replace(/\r\n/g, '\n');

  let modified = false;

  // 1. Áp dụng KeyRecommendations nếu có trong từ điển
  if (BOILERPLATE_FIXES[fileName]) {
    const recs = BOILERPLATE_FIXES[fileName];
    const recsYaml = recs.map(r => `  - "${r.replace(/"/g, "'").replace(/\n/g, ' ')}"`).join('\n');
    const keyRecsRegex = /keyRecommendations:\s*(?:\n\s*-\s*[^\n]+)+/i;
    if (keyRecsRegex.test(content)) {
      content = content.replace(keyRecsRegex, `keyRecommendations:\n${recsYaml}`);
      modified = true;
    }
  }

  // 2. Differentiate Icons trong frontmatter
  const sectionsMatch = content.match(/sections:\s*([\s\S]*?)(?=\n---)/);
  if (sectionsMatch) {
    const sectionsBlock = sectionsMatch[1];
    const secRegex = /(-\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?icon:\s*["'])([^"']+)(["'])/gi;
    
    // Đếm tổng số sections
    const totalSecs = [...sectionsBlock.matchAll(/title:\s*["']([^"']+)["']/gi)].length;
    let secIdx = 1;

    const newSectionsBlock = sectionsBlock.replace(secRegex, (match, prefix, id, title, oldIcon, suffix) => {
      const newIcon = chooseIcon(title, secIdx, totalSecs);
      secIdx++;
      return `${prefix}${newIcon}${suffix}`;
    });

    if (newSectionsBlock !== sectionsBlock) {
      content = content.replace(sectionsBlock, newSectionsBlock);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Đã nâng cấp Giai đoạn 3: ${fileName}`);
    return true;
  }
  return false;
}

async function main() {
  console.log('\n======================================================================');
  console.log('🎨 CLINI_PORTAL — GIAI ĐOẠN 3: CHUẨN HÓA ICONS & KEY RECOMMENDATIONS');
  console.log('======================================================================\n');

  const report = JSON.parse(fs.readFileSync(AUDIT_REPORT, 'utf8'));

  // Danh sách tệp cần xử lý icons hoặc boilerplate
  const targetFiles = new Set([
    ...report.details.filter(f => f.checks.icons.isMonotonous).map(f => f.file),
    ...Object.keys(BOILERPLATE_FIXES)
  ]);

  console.log(`🎯 Số tệp cần nâng cấp: ${targetFiles.size} tệp\n`);

  let count = 0;
  for (const file of targetFiles) {
    if (processFile(file)) count++;
  }

  console.log(`\n🎉 Đã hoàn tất nâng cấp ${count}/${targetFiles.size} tệp!\n`);
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
