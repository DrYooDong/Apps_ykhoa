/**
 * CliniPortal — Clinical Flowchart & Interactive Decision Tree Studio
 * Tuân thủ 100% flowchart-module skill:
 * - Pure SVG Responsive Viewport (960 x 620)
 * - Orthogonal Connectors (Góc vuông 90° bo cong Q)
 * - Label Masking Rect
 * - Dark Mode Tokens
 * - No HTML in SVG <text>
 */

import { ClinicalFlowchart, FlowchartNode, FlowchartEdge } from './types';

export const CLINICAL_FLOWCHARTS_REGISTRY: ClinicalFlowchart[] = [
  // ═══ 1. TIẾP CẬN ĐAU NGỰC CẤP & HỘI CHỨNG VÀNH CẤP ═══
  {
    id: 'flowchart_acs',
    title: 'Lưu đồ Tiếp cận Đau ngực Cấp & Phân tầng Hội chứng Vành cấp (ACS)',
    specialty: 'Tim mạch & Cấp cứu',
    conditionName: 'Đau ngực cấp / ACS',
    description: 'Thuật toán chẩn đoán và phân tầng can thiệp PCI theo ESC 2023 / AHA 2023',
    nodes: [
      {
        id: 'node_start',
        label: 'Tiếp nhận Đau ngực cấp',
        subLabel: 'Sinh hiệu, Đường truyền, Khí dung nếu SpO2 < 90%',
        type: 'start',
        x: 360, y: 30, width: 240, height: 60,
        details: 'Ghi nhận ECG 12 chuyển đạo trong vòng 10 phút đầu kể từ khi tiếp cận bệnh nhân.',
        recommendation: 'Đo ECG 12 chuyển đạo khẩn, lắp monitor theo dõi nhịp tim.'
      },
      {
        id: 'node_ecg_check',
        label: 'ECG có ST chênh lên?',
        subLabel: 'ST chênh ≥ 1mm ở 2 chuyển đạo liên tiếp (hoặc mới LBBB)',
        type: 'decision',
        x: 360, y: 130, width: 240, height: 60,
        details: 'Phân định rõ 2 nhánh: STEMI (cần tái tưới máu khẩn) và NSTE-ACS.',
        recommendation: 'Nếu có ST chênh lên: Kích hoạt ngay Quy trình Báo động Đỏ Can thiệp Mạch Vành.'
      },
      {
        id: 'node_stemi_pci',
        label: 'STEMI: Kích hoạt Can thiệp PCI',
        subLabel: 'Thời gian Cửa - Bóng (Door-to-Balloon) < 90-120 phút',
        type: 'alert',
        x: 80, y: 240, width: 250, height: 75,
        details: 'Kháng đông (Heparin/LMWH) + Kháng kết tập tiểu cầu kép DAPT (Aspirin 300mg + Ticagrelor 180mg / Clopidogrel 600mg).',
        recommendation: 'Chuyển phòng Cath-Lab khẩn cấp. Nạp DAPT + Heparin không phân đoạn 70-100 UI/kg.'
      },
      {
        id: 'node_troponin_check',
        label: 'Định lượng hs-cTn (0h / 1h)',
        subLabel: 'Thuật toán 0h/1h hoặc 0h/2h của Hội Tim Châu Âu (ESC)',
        type: 'decision',
        x: 600, y: 240, width: 260, height: 60,
        details: 'Xét nghiệm Troponin siêu nhạy tại thời điểm 0h và lặp lại lúc 1h để đánh giá động học delta.',
        recommendation: 'Lấy máu xét nghiệm hs-cTnI / hs-cTnT ngay và lặp lại chính xác sau 1 giờ.'
      },
      {
        id: 'node_nste_acs',
        label: 'NSTEMI / Đau thắt ngực không ổn định',
        subLabel: 'hs-cTn tăng cao hoặc Delta động học có ý nghĩa',
        type: 'action',
        x: 480, y: 370, width: 260, height: 70,
        details: 'Phân tầng nguy cơ theo thang điểm GRACE / TIMI để quyết định can thiệp mạch vành sớm (< 24h) hay trì hoãn.',
        recommendation: 'Kháng đông Enoxaparin 1mg/kg x 2 lần/ngày + DAPT + Statin cường độ cao.'
      },
      {
        id: 'node_rule_out',
        label: 'Loại trừ ACS (Rule-Out an toàn)',
        subLabel: 'hs-cTn rất thấp + Không đổi sau 1-2h + GRACE < 140',
        type: 'stable',
        x: 750, y: 370, width: 190, height: 70,
        details: 'Tìm các nguyên nhân đau ngực không do mạch vành (Viêm màng ngoài tim, Trào ngược GERD, Đau cơ thành ngực).',
        recommendation: 'Theo dõi ngoại trú, chụp CT mạch vành nếu có yếu tố nguy cơ trung bình.'
      }
    ],
    edges: [
      { from: 'node_start', to: 'node_ecg_check', label: '10 phút đầu' },
      { from: 'node_ecg_check', to: 'node_stemi_pci', label: 'CÓ (ST chênh)', isYes: true },
      { from: 'node_ecg_check', to: 'node_troponin_check', label: 'KHÔNG (Không ST chênh)', isYes: false },
      { from: 'node_troponin_check', to: 'node_nste_acs', label: 'Rule-In (hs-cTn (+))', isYes: true },
      { from: 'node_troponin_check', to: 'node_rule_out', label: 'Rule-Out (hs-cTn (-))', isYes: false }
    ]
  },

  // ═══ 2. TIẾP CẬN KHÓ THỞ CẤP ═══
  {
    id: 'flowchart_dyspnea',
    title: 'Lưu đồ Tiếp cận & Chẩn đoán Phân biệt Khó thở Cấp',
    specialty: 'Hô hấp & Hồi sức',
    conditionName: 'Khó thở cấp',
    description: 'Phân biệt nhanh Đợt cấp COPD, Hen phế quản, Phù phổi cấp do tim và Thuyên tắc phổi',
    nodes: [
      {
        id: 'node_start_dyspnea',
        label: 'Bệnh nhân Khó thở cấp',
        subLabel: 'SpO2, Nhịp thở, Co kéo cơ hô hấp phụ',
        type: 'start',
        x: 360, y: 30, width: 240, height: 60,
        details: 'Đánh giá ngay dấu hiệu suy hô hấp nguy kịch (Thở ngắt quãng, tím tái, tụt HA, kiệt sức).',
        recommendation: 'Thở oxy mục tiêu SpO2 94-98% (hoặc 88-92% nếu nghi ngờ ứ CO2 COPD).'
      },
      {
        id: 'node_lung_sounds',
        label: 'Thăm khám Phổi & Ran bệnh lý',
        subLabel: 'Nghe ran ngáy/rít hay ran ẩm/nổ 2 đáy phổi?',
        type: 'decision',
        x: 360, y: 130, width: 240, height: 60,
        details: 'Khám lâm sàng kết hợp X-quang ngực tại giường và siêu âm phổi POCUS (Blue Protocol).',
        recommendation: 'Nghe tim phổi toàn diện, chỉ định X-quang phổi và NT-proBNP khẩn.'
      },
      {
        id: 'node_copd_asthma',
        label: 'Ran rít / Ran ngáy: Co thắt phế quản',
        subLabel: 'Đợt cấp COPD / Cơn hen phế quản ác tính',
        type: 'action',
        x: 100, y: 250, width: 250, height: 75,
        details: 'Khí dung SABA + SAMA (Salbutamol + Ipratropium) mỗi 20 phút x 3 lần + Corticoid tĩnh mạch (Methylprednisolone 40mg).',
        recommendation: 'Khí dung dồn dập, thở máy không xâm lấn (NIV - BiPAP) nếu pH < 7.35 và PaCO2 > 45 mmHg.'
      },
      {
        id: 'node_pulmonary_edema',
        label: 'Ran ẩm 2 đáy + NT-proBNP tăng: Phù phổi cấp',
        subLabel: 'Suy tim cấp ứ huyết / Cơn tăng huyết áp cấp cứu',
        type: 'alert',
        x: 600, y: 250, width: 260, height: 75,
        details: 'Ngồi thõng 2 chân + Furosemide tĩnh mạch 40-80mg + Nitroglycerin truyền tĩnh mạch nếu HA tâm thu > 110 mmHg.',
        recommendation: 'Lợi tiểu quai tiêm mạch + Giãn mạch Nitrat + Thở CPAP/NIV áp lực dương.'
      },
      {
        id: 'node_d_dimer_pe',
        label: 'Phổi trong + Tụt oxy + Đau ngực: Nghi ngờ Thuyên tắc phổi',
        subLabel: 'Thang điểm Wells PE + D-dimer + CTPA',
        type: 'action',
        x: 350, y: 380, width: 270, height: 75,
        details: 'Nếu Wells PE nguy cơ cao: Chỉ định chụp CT mạch máu phổi có cản quang (CTPA) và khởi đầu Kháng đông.',
        recommendation: 'Chụp CTPA khẩn cấp. Khởi đầu Enoxaparin hoặc Heparin nếu nguy cơ cao.'
      }
    ],
    edges: [
      { from: 'node_start_dyspnea', to: 'node_lung_sounds', label: 'Khám ban đầu' },
      { from: 'node_lung_sounds', to: 'node_copd_asthma', label: 'Ran rít/ngáy', isYes: true },
      { from: 'node_lung_sounds', to: 'node_pulmonary_edema', label: 'Ran ẩm + Suy tim', isYes: false },
      { from: 'node_lung_sounds', to: 'node_d_dimer_pe', label: 'Phổi trong / SpO2 tụt' }
    ]
  },

  // ═══ 3. SỐC & SEPSIS 1-HOUR BUNDLE ═══
  {
    id: 'flowchart_sepsis',
    title: 'Lưu đồ Xử trí Sốc Nhiễm Khuẩn (Sepsis 1-Hour Bundle - SSC 2021)',
    specialty: 'Hồi sức - Cấp cứu',
    conditionName: 'Sốc nhiễm khuẩn / Sepsis',
    description: 'Phác đồ cứu sống giờ đầu tiên cho bệnh nhân sốc nhiễm khuẩn',
    nodes: [
      {
        id: 'node_sepsis_start',
        label: 'Nghi ngờ Nhiễm khuẩn + Tụt HA',
        subLabel: 'qSOFA ≥ 2 (HA tâm thu ≤ 100, Thở ≥ 22, Tri giác ↓)',
        type: 'start',
        x: 360, y: 30, width: 240, height: 60,
        details: 'Kích hoạt ngay Phác đồ Sepsis Giờ Đầu (Hour-1 Bundle).',
        recommendation: 'Đo Lactate máu, cấy máu trước khi dùng kháng sinh.'
      },
      {
        id: 'node_bundle_1',
        label: 'Gói Cấp Cứu Giờ Đầu (Hour-1 Bundle)',
        subLabel: '1. Đo Lactate | 2. Cấy máu | 3. Kháng sinh phổ rộng',
        type: 'action',
        x: 360, y: 130, width: 260, height: 70,
        details: 'Truyền kháng sinh phổ rộng (Meropenem / Piperacillin-Tazobactam + Vancomycin) trong vòng 60 phút đầu.',
        recommendation: 'Hoàn thành kháng sinh tĩnh mạch liều nạp trong 1 giờ.'
      },
      {
        id: 'node_fluid_resus',
        label: 'Bù dịch Tinh thể 30 mL/kg',
        subLabel: 'Dung dịch Ringer Lactate / NaCl 0.9% trong 3 giờ đầu',
        type: 'action',
        x: 360, y: 240, width: 260, height: 70,
        details: 'Bù dịch nhanh nếu HA trung bình MAP < 65 mmHg hoặc Lactate máu ≥ 4 mmol/L.',
        recommendation: 'Xả nhanh 30ml/kg dịch tinh thể ấm, đánh giá đáp ứng bù dịch (PLR test).'
      },
      {
        id: 'node_vasopressor',
        label: 'Vận mạch Noradrenaline duy trì MAP ≥ 65',
        subLabel: 'Nếu MAP vẫn < 65 mmHg sau khi đã bù dịch đủ',
        type: 'alert',
        x: 150, y: 360, width: 270, height: 75,
        details: 'Noradrenaline là thuốc vận mạch lựa chọn hàng đầu (Liều khởi đầu 0.05 - 0.1 mcg/kg/phút).',
        recommendation: 'Thiết lập catheter tĩnh mạch trung tâm, truyền Noradrenaline qua bơm tiêm điện.'
      },
      {
        id: 'node_sepsis_stable',
        label: 'Hồi sức Đạt Mục tiêu: MAP ≥ 65 & Lactate ↓',
        subLabel: 'Lactate đào thải > 20% mỗi 2 giờ + Nước tiểu > 0.5 mL/kg/h',
        type: 'stable',
        x: 540, y: 360, width: 270, height: 75,
        details: 'Chuyển khoa Hồi sức tích cực (ICU) để theo dõi huyết động nâng cao.',
        recommendation: 'Duy trì kháng sinh đủ liệu trình, giảm dần liều vận mạch khi huyết động ổn định.'
      }
    ],
    edges: [
      { from: 'node_sepsis_start', to: 'node_bundle_1', label: 'Bắt đầu' },
      { from: 'node_bundle_1', to: 'node_fluid_resus', label: 'Lactate ≥ 4 hoặc MAP < 65' },
      { from: 'node_fluid_resus', to: 'node_vasopressor', label: 'MAP vẫn < 65 sau bù dịch', isYes: true },
      { from: 'node_fluid_resus', to: 'node_sepsis_stable', label: 'MAP ≥ 65 ổn định', isYes: false }
    ]
  },

  // ═══ 4. PHÁC ĐỒ SỐT XUẤT HUYẾT DENGUE & SỐC THOÁT HUYẾT TƯƠNG (QĐ 2760/QĐ-BYT 2023) ═══
  {
    id: 'flowchart_dengue_shock',
    title: 'Lưu đồ Phân tầng & Hồi sức Sốt xuất huyết Dengue (Bộ Y Tế 2023)',
    specialty: 'Truyền nhiễm & Hồi sức Cấp cứu',
    conditionName: 'Sốt xuất huyết Dengue (SXHD)',
    description: 'Phác đồ bù dịch động học, xử trí Sốc thoát huyết tương, Xuất huyết nặng và Chống quá tải dịch theo QĐ 2760/QĐ-BYT',
    nodes: [
      {
        id: 'node_dengue_triage',
        label: 'Tiếp nhận Bệnh nhân Nghi SXHD',
        subLabel: 'Sốt ngày 3-7 + Đau mỏi + Chấm xuất huyết + Đo Hct tại giường',
        type: 'start',
        x: 360, y: 20, width: 260, height: 60,
        details: 'Đo sinh hiệu (Mạch, HA, CRT), làm xét nghiệm Hct tại giường và đếm số lượng tiểu cầu. Kiểm tra tiền sử thai kỳ, Thalassemia, bệnh gan thận.',
        recommendation: 'Thực hiện dấu dây thắt (Lacet), đo Hct ban đầu làm mốc đối chiếu động học.'
      },
      {
        id: 'node_dengue_warning_check',
        label: 'Đánh giá Phân tầng Lâm sàng',
        subLabel: 'Kiểm tra Dấu hiệu Cảnh báo (DHCB) & Dấu hiệu Sốc?',
        type: 'decision',
        x: 360, y: 115, width: 260, height: 60,
        details: 'DHCB: Vật vã/li bì, đau bụng vùng gan, nôn ói ≥ 3 lần/h, xuất huyết niêm mạc, tiểu ít, Hct tăng kèm tiểu cầu giảm nhanh.',
        recommendation: 'Phân loại chính xác 3 mức độ: SXHD thông thường, SXHD có DHCB, hoặc SXHD nặng/Sốc.'
      },
      {
        id: 'node_dengue_mild',
        label: 'SXHD Thông thường (Độ 1)',
        subLabel: 'Điều trị ngoại trú + Oresol uống + Paracetamol',
        type: 'stable',
        x: 700, y: 220, width: 240, height: 75,
        details: 'Bù dịch đường uống tích cực (Oresol, nước dừa, nước hoa quả). Hạ sốt bằng Paracetamol đơn chất 10-15mg/kg mỗi 4-6h. TUYỆT ĐỐI KHÔNG dùng Aspirin, Ibuprofen.',
        recommendation: 'Tái khám và đo Hct hàng ngày. Dặn dò tái khám cấp cứu ngay khi xuất hiện DHCB.'
      },
      {
        id: 'node_dengue_warning_fluid',
        label: 'SXHD Có Dấu hiệu Cảnh báo (Độ 2)',
        subLabel: 'Nhập viện bắt buộc + Tinh thể 6-7 mL/kg/h giảm dần',
        type: 'action',
        x: 360, y: 220, width: 260, height: 75,
        details: 'Truyền dịch tinh thể (Ringer Lactate / NaCl 0.9%) 6-7 mL/kg/h trong 1-3h đầu, giảm xuống 5 mL/kg/h (2-4h) rồi 3 mL/kg/h. Đo lại Hct mỗi 2-4h.',
        recommendation: 'Nếu có bệnh gan nặng hoặc Thalassemia: Thay Ringer Lactate bằng Ringer Acetate hoặc NaCl 0.9%.'
      },
      {
        id: 'node_dengue_shock',
        label: 'SỐC SXHD / SỐC NGUY KỊCH (Độ 3)',
        subLabel: 'Nằm đầu thấp + Bolus Tinh thể 15-20 mL/kg/15-60 phút',
        type: 'alert',
        x: 30, y: 220, width: 280, height: 75,
        details: 'Thở oxy gọng kính. Nếu M=0, HA=0: Bơm nhanh 20 mL/kg trong 15 phút (trẻ em) hoặc 15 mL/kg/15p (người lớn). Nếu sốc thông thường: 15-20 mL/kg/1h.',
        recommendation: 'Lập 2 đường truyền kim lớn. Đo Hct khẩn trước và ngay sau khi kết thúc dịch truyền.'
      },
      {
        id: 'node_dengue_hct_check',
        label: 'Đánh giá Động học Hct sau Giờ 1 Bù dịch',
        subLabel: 'Hct tăng hay tụt nhanh sau chống sốc?',
        type: 'decision',
        x: 30, y: 340, width: 280, height: 60,
        details: 'So sánh Hct sau truyền dịch với Hct ban đầu để quyết định chiến lược chuyển đổi dung dịch.',
        recommendation: 'Nếu Hct còn cao (> 40%): Thoát huyết tương nặng. Nếu Hct tụt > 20% kèm tụt HA: Nghi ngờ Xuất huyết nội.'
      },
      {
        id: 'node_dengue_colloid',
        label: 'Sốc trơ / Tái sốc: Dịch Cao Phân Tử',
        subLabel: 'Dextran 40 / HES 200 (10-20 mL/kg/h) + Đo CVP',
        type: 'alert',
        x: 30, y: 450, width: 280, height: 75,
        details: 'Truyền Cao phân tử 10-20 mL/kg/h x 1h, giảm liều theo bậc thang. Nếu CVP > 15 cmH2O hoặc suy tim: Ngưng dịch, dùng Dopamin/Noradrenaline. Albumin nếu CPT ≥ 60 mL/kg.',
        recommendation: 'Không dùng quá 60 mL/kg CPT nhân tạo để tránh suy thận và rối loạn đông máu.'
      },
      {
        id: 'node_dengue_bleeding',
        label: 'Xuất huyết Ẩn / Tụt Hct: Truyền Máu',
        subLabel: 'Hồng cầu lắng 5-10 mL/kg + Cầm máu',
        type: 'action',
        x: 360, y: 450, width: 260, height: 75,
        details: 'Nghi ngờ xuất huyết tiêu hóa/nội tạng khi Hct giảm nhanh nhưng HA vẫn kẹt/tụt. Truyền Hồng cầu lắng 5-10 mL/kg. Đặt sonde dạ dày qua ĐƯỜNG MIỆNG (Tránh đường mũi).',
        recommendation: 'Không truyền tiểu cầu dự phòng trừ khi tiểu cầu < 5.000 hoặc có xuất huyết nặng tiến triển.'
      },
      {
        id: 'node_dengue_recovery',
        label: 'Giai đoạn Hồi phục (Ngày 6-7)',
        subLabel: 'Hct giảm sinh lý + Tiểu nhiều: NGƯNG DỊCH',
        type: 'stable',
        x: 690, y: 450, width: 250, height: 75,
        details: 'Dịch tái hấp thu vào lòng mạch gây loãng máu sinh lý. Nếu bệnh nhân tỉnh, tiểu tốt, mạch HA ổn: Giảm nhanh và ngắt dịch. TUYỆT ĐỐI KHÔNG truyền dịch thêm vì gây Phù phổi cấp.',
        recommendation: 'Theo dõi nhịp thở và nghe đáy phổi. Xuất viện khi hết sốt 48h và tiểu cầu > 50.000/mm³.'
      }
    ],
    edges: [
      { from: 'node_dengue_triage', to: 'node_dengue_warning_check', label: 'Phân loại ban đầu' },
      { from: 'node_dengue_warning_check', to: 'node_dengue_mild', label: 'Không DHCB', isYes: false },
      { from: 'node_dengue_warning_check', to: 'node_dengue_warning_fluid', label: 'Có DHCB (Độ 2)' },
      { from: 'node_dengue_warning_check', to: 'node_dengue_shock', label: 'SỐC / Sốc nặng (Độ 3)', isYes: true },
      { from: 'node_dengue_shock', to: 'node_dengue_hct_check', label: 'Sau 1 giờ bù dịch' },
      { from: 'node_dengue_hct_check', to: 'node_dengue_colloid', label: 'Hct vẫn cao / Sốc trơ', isYes: true },
      { from: 'node_dengue_hct_check', to: 'node_dengue_bleeding', label: 'Hct tụt nhanh > 20%', isYes: false },
      { from: 'node_dengue_warning_fluid', to: 'node_dengue_recovery', label: 'Đáp ứng tốt (Ngày 6-7)', isYes: true },
      { from: 'node_dengue_colloid', to: 'node_dengue_recovery', label: 'Hồi phục sau 24-48h' }
    ]
  },

  // ═══ 5. PHÁC ĐỒ CHẨN ĐOÁN & XỬ TRÍ RUNG NHĨ (ESC 2024 AF-CARE) ═══
  {
    id: 'flowchart_atrial_fibrillation',
    title: 'Lưu đồ Tiếp cận & Điều trị Rung Nhĩ Toàn diện (ESC 2024 AF-CARE)',
    specialty: 'Tim mạch & Cấp cứu',
    conditionName: 'Rung nhĩ (Atrial Fibrillation)',
    description: 'Chiến lược phân tầng huyết động, chỉ định Sốc điện cấp cứu, dự phòng đột quỵ với DOAC theo CHA2DS2-VA và Kiểm soát nhịp/tần số',
    nodes: [
      {
        id: 'node_af_triage',
        label: 'Tiếp nhận Rung Nhĩ Lâm Sàng',
        subLabel: 'ECG 12 chuyển đạo: Mất sóng P, sóng f 300-500 ck/p, RR không đều',
        type: 'start',
        x: 360, y: 20, width: 260, height: 60,
        details: 'Ghi ECG xác định rung nhĩ. Đo sinh hiệu và đánh giá ngay các dấu hiệu huyết động bất ổn.',
        recommendation: 'Đo ECG 12 chuyển đạo ngay, mắc monitor nhịp tim và SpO2.'
      },
      {
        id: 'node_af_hemo_check',
        label: 'Đánh giá Tình trạng Huyết Động?',
        subLabel: 'Tụt HA (HA tâm thu < 90 mmHg), Sốc tim, Đau ngực cấp, Phù phổi cấp?',
        type: 'decision',
        x: 360, y: 115, width: 260, height: 60,
        details: 'Phân loại nhanh xem bệnh nhân có cần sốc điện chuyển nhịp cấp cứu hồi sức ngay hay không.',
        recommendation: 'Nếu có huyết động bất ổn: Chuyển ngay nhánh Sốc điện đồng bộ cấp cứu.'
      },
      {
        id: 'node_af_emergency_shock',
        label: 'SỐC ĐIỆN ĐỒNG BỘ CẤP CỨU',
        subLabel: '100 - 200J Biphasic + Tiêm an thần ngắn hạn + Kháng đông khẩn',
        type: 'alert',
        x: 40, y: 220, width: 270, height: 75,
        details: 'Tiêm Midazolam/Propofol an thần. Sốc điện chuyển nhịp đồng bộ (Synchronized) ngay. Khởi động Heparin/DOAC càng sớm càng tốt quanh thời điểm sốc.',
        recommendation: 'Khẩn cấp sốc điện cứu vãn. Bắt buộc đồng bộ sóng R để tránh kích hoạt Rung thất.'
      },
      {
        id: 'node_af_stable_care',
        label: 'Triển khai Lộ trình AF-CARE',
        subLabel: '[C] Quản lý Bệnh Đồng Mắc & Lối Sống',
        type: 'action',
        x: 650, y: 220, width: 270, height: 75,
        details: 'Hạ áp tối ưu 120-129/70-79 mmHg (ACEi/ARB); SGLT2i cho Suy tim & ĐTĐ; Giảm cân >= 10% nếu béo phì; Giảm rượu <= 3 đơn vị/tuần.',
        recommendation: 'Điều trị toàn diện các bệnh nền để ngăn ngừa tái cấu trúc và xơ hóa tâm nhĩ.'
      },
      {
        id: 'node_af_anticoag_cha2ds2',
        label: '[A] Kháng Đông DOAC (CHA2DS2-VA)',
        subLabel: 'CHA2DS2-VA ≥ 2 (Class I) hoặc = 1 (Class IIa)',
        type: 'action',
        x: 360, y: 220, width: 260, height: 75,
        details: 'Ưu tiên DOAC (Apixaban 5mg x 2, Dabigatran 150mg x 2, Rivaroxaban 20mg x 1, Edoxaban 60mg x 1). CẤM tự ý giảm liều nếu không thỏa đủ tiêu chí giảm liều.',
        recommendation: 'Khởi đầu DOAC sớm. Nếu van cơ học hoặc hẹp 2 lá vừa-nặng: Chỉ dùng Warfarin (INR 2.0-3.0).'
      },
      {
        id: 'node_af_rate_control',
        label: '[R] Kiểm Soát Tần Số Tim (< 110 bpm)',
        subLabel: 'LVEF ≤ 40%: Chẹn Beta / Digoxin | LVEF > 40%: CCB Non-DHP / Chẹn Beta',
        type: 'action',
        x: 200, y: 345, width: 260, height: 75,
        details: 'Mục tiêu nhịp tim lúc nghỉ < 110 bpm (Lenient). Nếu LVEF <= 40%: CẤM TUYỆT ĐỐI Verapamil/Diltiazem. Nếu có WPW: CẤM các thuốc ức chế nút AV.',
        recommendation: 'Dùng Bisoprolol/Metoprolol hoặc Digoxin. Theo dõi Holter điện tâm đồ nếu phối hợp thuốc.'
      },
      {
        id: 'node_af_rhythm_pvi',
        label: '[R & E] Triệt Đốt PVI & Kiểm Soát Nhịp',
        subLabel: 'Triệt đốt qua Catheter đầu tay cho Kịch phát & Suy tim HFrEF',
        type: 'stable',
        x: 520, y: 345, width: 270, height: 75,
        details: 'Triệt đốt cô lập tĩnh mạch phổi (PVI) là lựa chọn Class I, Level A cho Rung nhĩ kịch phát có triệu chứng. Dùng DOAC liên tục không ngắt quãng quanh thủ thuật và >= 2 tháng sau triệt đốt.',
        recommendation: 'Tái khám tim mạch mỗi 3 - 6 tháng, xét nghiệm chức năng thận (eGFR) và điện giải định kỳ.'
      }
    ],
    edges: [
      { from: 'node_af_triage', to: 'node_af_hemo_check', label: 'Đánh giá ban đầu' },
      { from: 'node_af_hemo_check', to: 'node_af_emergency_shock', label: 'Huyết động bất ổn (Sốc, Đau ngực)', isYes: true },
      { from: 'node_af_hemo_check', to: 'node_af_stable_care', label: 'Huyết động ổn định', isYes: false },
      { from: 'node_af_hemo_check', to: 'node_af_anticoag_cha2ds2', label: 'Đánh giá đột quỵ' },
      { from: 'node_af_anticoag_cha2ds2', to: 'node_af_rate_control', label: 'Kiểm soát triệu chứng' },
      { from: 'node_af_anticoag_cha2ds2', to: 'node_af_rhythm_pvi', label: 'Chỉ định chuyển nhịp/triệt đốt' },
      { from: 'node_af_emergency_shock', to: 'node_af_anticoag_cha2ds2', label: 'Sau hồi phục sốc' }
    ]
  },

  // ═══ 6. PHÁC ĐỒ CHẨN ĐOÁN & XỬ TRÍ BỆNH NÃO GAN (EASL 2022) ═══
  {
    id: 'flowchart_hepatic_encephalopathy',
    title: 'Lưu đồ Tiếp cận & Điều trị Bệnh Não Gan Toàn diện (EASL 2022 / AASLD)',
    specialty: 'Tiêu hóa - Gan mật & Cấp cứu',
    conditionName: 'Bệnh não gan (Hepatic Encephalopathy)',
    description: 'Phân tầng West Haven, Bảo vệ đường thở, Xử trí 90% yếu tố thúc đẩy, Phối hợp Lactulose + Rifaximin, LOLA và Dinh dưỡng BCAA chống teo cơ',
    nodes: [
      {
        id: 'node_he_triage',
        label: 'Tiếp nhận Nghi ngờ Bệnh Não Gan',
        subLabel: 'Xơ gan + Lơ mơ/Lú lẫn/Run vẩy Asterixis + Đo NH3 máu',
        type: 'start',
        x: 360, y: 20, width: 260, height: 60,
        details: 'Đo sinh hiệu A-B-C, test đường huyết mao mạch tại giường. Định lượng amoniac máu, Creatinine, Điện giải đồ, Bilirubin, PT/INR và Cấy dịch báng.',
        recommendation: 'Đo NH3 máu, đánh giá phân độ West Haven và Thang điểm Hôn mê Glasgow (GCS).'
      },
      {
        id: 'node_he_severity_check',
        label: 'Phân tầng Mức độ Nặng (West Haven & GCS)?',
        subLabel: 'Grade III-IV / GCS < 8 (Hôn mê, sững sờ) vs Grade I-II',
        type: 'decision',
        x: 360, y: 115, width: 260, height: 60,
        details: 'Grade III: Ngủ gà sâu, mất định hướng nặng. Grade IV: Hôn mê, không đáp ứng kích thích. GCS < 8 có nguy cơ mất phản xạ bảo vệ đường thở.',
        recommendation: 'Nếu GCS < 8 hoặc Grade III-IV: Kích hoạt ngay Quy trình Bảo vệ Đường thở Khẩn cấp.'
      },
      {
        id: 'node_he_icu_airway',
        label: 'ĐẶT NỘI KHÍ QUẢN & HỒI SỨC ICU',
        subLabel: 'Bảo vệ đường thở + Sonde dạ dày + Thụt trực tràng Lactulose',
        type: 'alert',
        x: 40, y: 220, width: 270, height: 75,
        details: 'Đặt NKQ khẩn cấp chống hít sặc. Sonde dạ dày hút sạch máu (nếu có XHTH). Thụt giữ trực tràng: 300 mL Lactulose + 700 mL nước ấm giữ 30-60p.',
        recommendation: 'Chuyển khoa Hồi sức tích cực (ICU) theo dõi sát monitor và tri giác liên tục.'
      },
      {
        id: 'node_he_precipitating_factors',
        label: 'Xử trí 90% Yếu Tố Thúc Đẩy',
        subLabel: 'Kháng sinh SBP + TẠM NGỪNG LỢI TIỂU + Chỉnh điện giải',
        type: 'action',
        x: 650, y: 220, width: 270, height: 75,
        details: 'Ceftriaxone 1g/ngày trị nhiễm trùng; Ngừng ngay Furosemide/Spironolactone; Bù dịch NaCl 0.9% và chỉnh bù Kali/Natri; Ngừng thuốc an thần.',
        recommendation: 'Điều trị triệt để yếu tố thúc đẩy là chìa khóa giải quyết 90% các đợt bùng phát bệnh não gan.'
      },
      {
        id: 'node_he_lactulose_firstline',
        label: 'Bậc 1: Lactulose Đường Uống',
        subLabel: 'Liều tấn công 15-30 mL q1-2h ➔ Duy trì 2-3 phân mềm/ngày',
        type: 'action',
        x: 360, y: 220, width: 260, height: 75,
        details: 'Lactulose PO 15-30 mL mỗi 1-2h đến khi đi tiêu phân mềm; sau đó duy trì 15-30 mL x 2-3 lần/ngày. CẢNH BÁO: Tránh tiêu chảy quá mức > 4-5 lần/ngày.',
        recommendation: 'Disaccharide không hấp thu là nền tảng điều trị Bậc 1 theo khuyến cáo EASL (LoE 1).'
      },
      {
        id: 'node_he_rifaximin_lola',
        label: 'Bậc 2: Phối Hợp Rifaximin + LOLA IV',
        subLabel: 'Rifaximin 550mg x 2 PO + LOLA 20-30g/ngày truyền TM',
        type: 'action',
        x: 200, y: 345, width: 260, height: 75,
        details: 'BẮT BUỘC phối hợp Rifaximin 550mg x 2 nếu tái phát >= 1 đợt trong 6 tháng (giảm 58% tái phát, giảm 40% tử vong). LOLA IV 20-30g/ngày pha 500mL G5% truyền chậm (CẤM khi eGFR < 30).',
        recommendation: 'Không được ngừng Lactulose khi thêm Rifaximin. Duy trì đồng trị liệu lâu dài.'
      },
      {
        id: 'node_he_sarcopenia_bcaa',
        label: 'Dinh Dưỡng BCAA & Chống Teo Cơ',
        subLabel: 'Đạm 1.2-1.5 g/kg/ngày + BCAA uống + Bữa ăn phụ ban đêm',
        type: 'stable',
        x: 520, y: 345, width: 270, height: 75,
        details: 'CẤM KIÊNG ĐẠM. Bổ sung Oral BCAA 0.2-0.25 g/kg/ngày kèm 1 bữa phụ trước khi đi ngủ (late-night snack) để chống dị hóa cơ vân. Đánh giá Ghép Gan nếu HE kháng trị.',
        recommendation: 'Tái khám định kỳ mỗi 1 - 3 tháng, sàng lọc Covert HE bằng Animal Naming Test và tư vấn nguy cơ lái xe.'
      }
    ],
    edges: [
      { from: 'node_he_triage', to: 'node_he_severity_check', label: 'Đánh giá ban đầu' },
      { from: 'node_he_severity_check', to: 'node_he_icu_airway', label: 'GCS < 8 hoặc Grade III-IV', isYes: true },
      { from: 'node_he_severity_check', to: 'node_he_precipitating_factors', label: 'Ổn định (Grade I-II)', isYes: false },
      { from: 'node_he_precipitating_factors', to: 'node_he_lactulose_firstline', label: 'Khởi động Disaccharide' },
      { from: 'node_he_lactulose_firstline', to: 'node_he_rifaximin_lola', label: 'Tái phát / Kháng trị' },
      { from: 'node_he_lactulose_firstline', to: 'node_he_sarcopenia_bcaa', label: 'Dự phòng lâu dài' },
      { from: 'node_he_icu_airway', to: 'node_he_precipitating_factors', label: 'Sau đặt NKQ ổn định' }
    ]
  }
];

/**
 * Render Pure SVG Responsive Orthogonal Flowchart
 */
export function renderFlowchartSvg(chart: ClinicalFlowchart, activeNodeId?: string): string {
  const nodeMap = new Map<string, FlowchartNode>();
  chart.nodes.forEach(n => nodeMap.set(n.id, n));

  // 1. Render Edges (Strict Orthogonal Routes)
  const edgesSvg = chart.edges.map(e => {
    const from = nodeMap.get(e.from);
    const to = nodeMap.get(e.to);
    if (!from || !to) return '';

    const fx = from.x + (from.width || 240) / 2;
    const fy = from.y + (from.height || 60);
    const tx = to.x + (to.width || 240) / 2;
    const ty = to.y;

    // Direct vertical connection
    let pathD = '';
    let labelX = (fx + tx) / 2;
    let labelY = (fy + ty) / 2;

    if (Math.abs(fx - tx) < 10) {
      // Straight line
      pathD = `M ${fx} ${fy} L ${tx} ${ty}`;
    } else {
      // Orthogonal elbow with rounded corner (Rule 3)
      const midY = fy + (ty - fy) / 2;
      pathD = `M ${fx} ${fy} L ${fx} ${midY - 6} Q ${fx} ${midY} ${fx + (tx > fx ? 6 : -6)} ${midY} L ${tx + (tx > fx ? -6 : 6)} ${midY} Q ${tx} ${midY} ${tx} ${midY + 6} L ${tx} ${ty}`;
      labelX = (fx + tx) / 2;
      labelY = midY;
    }

    const isConnectedToActive = activeNodeId && (e.from === activeNodeId || e.to === activeNodeId);
    const strokeColor = isConnectedToActive ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #cbd5e1)';
    const strokeWidth = isConnectedToActive ? '2.5' : '1.5';

    let labelSvg = '';
    if (e.label) {
      const rectW = Math.max(e.label.length * 6.5 + 16, 40);
      labelSvg = `
        <g>
          <rect x="${labelX - rectW / 2}" y="${labelY - 10}" width="${rectW}" height="20" rx="4" fill="var(--color-surface, #ffffff)" stroke="${strokeColor}" stroke-width="0.75" />
          <text x="${labelX}" y="${labelY + 4}" font-size="10.5" font-weight="700" fill="${e.isYes ? '#10b981' : (e.isYes === false ? '#ef4444' : 'var(--color-text, #0f172a)')}" text-anchor="middle">
            ${escapeSvg(e.label)}
          </text>
        </g>
      `;
    }

    return `
      <g class="flowchart-edge">
        <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" marker-end="url(#arrowhead)" />
        ${labelSvg}
      </g>
    `;
  }).join('');

  // 2. Render Nodes
  const nodesSvg = chart.nodes.map(n => {
    const w = n.width || 240;
    const h = n.height || 60;
    const isActive = activeNodeId === n.id;

    let strokeColor = 'var(--color-border, #e2e8f0)';
    let strokeWidth = '1.5';
    let fillColor = 'var(--color-surface, #ffffff)';
    let titleColor = 'var(--color-text, #0f172a)';

    if (n.type === 'start') {
      strokeColor = 'var(--color-primary, #0284c7)';
      titleColor = 'var(--color-primary, #0284c7)';
    } else if (n.type === 'decision') {
      strokeColor = '#f59e0b';
      titleColor = '#b45309';
    } else if (n.type === 'alert') {
      strokeColor = '#ef4444';
      strokeWidth = '2';
      fillColor = 'rgba(239, 68, 68, 0.03)';
      titleColor = '#ef4444';
    } else if (n.type === 'action') {
      strokeColor = '#0d9488';
      titleColor = '#0d9488';
    } else if (n.type === 'stable') {
      strokeColor = '#10b981';
      titleColor = '#059669';
    }

    if (isActive) {
      strokeWidth = '3';
      strokeColor = '#0284c7';
    }

    return `
      <g class="flowchart-node-group" data-node-id="${n.id}" style="cursor:pointer;">
        <rect x="${n.x}" y="${n.y}" width="${w}" height="${h}" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
        <text x="${n.x + 12}" y="${n.y + 24}" font-size="13" font-weight="700" fill="${titleColor}">
          ${escapeSvg(n.label)}
        </text>
        ${n.subLabel ? `
          <text x="${n.x + 12}" y="${n.y + 44}" font-size="11" fill="var(--color-text-muted, #64748b)">
            ${escapeSvg(n.subLabel.slice(0, 38))}${n.subLabel.length > 38 ? '...' : ''}
          </text>
        ` : ''}
      </g>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 960 480" width="100%" height="100%" style="background:var(--color-bg, #f8fafc); border-radius:12px; border:1px solid var(--color-border, #e2e8f0); display:block; user-select:none;">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--color-border, #cbd5e1)" />
        </marker>
      </defs>
      ${edgesSvg}
      ${nodesSvg}
    </svg>
  `;
}

/**
 * Render Interactive Flowchart Studio Panel
 */
export function renderFlowchartStudioHtml(chartId: string = 'flowchart_acs'): string {
  const chart = CLINICAL_FLOWCHARTS_REGISTRY.find(c => c.id === chartId) || CLINICAL_FLOWCHARTS_REGISTRY[0];
  const firstNode = chart.nodes[0];

  return `
    <div class="flowchart-studio-container" style="background:var(--color-surface, #ffffff); border-radius:12px; padding:20px; border:1px solid var(--color-border, #e2e8f0);">
      
      <!-- Flowchart Selector Strip -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="margin:0 0 4px; font-size:18px; color:var(--color-primary, #0284c7); display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-diagram-project"></i> ${escapeSvg(chart.title)}
          </h2>
          <p style="margin:0; font-size:12.5px; color:var(--color-text-muted, #64748b);">${escapeSvg(chart.description)}</p>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <select id="flowchart-selector" class="dsp-input" style="padding:6px 12px; font-size:12.5px; border-radius:6px; border:1px solid var(--color-border); background:var(--color-surface);">
            ${CLINICAL_FLOWCHARTS_REGISTRY.map(c => `
              <option value="${c.id}" ${c.id === chart.id ? 'selected' : ''}>${c.conditionName}</option>
            `).join('')}
          </select>
          <button type="button" id="btn-insert-flowchart-to-soap" class="dsp-btn dsp-btn-primary" style="font-size:12px; padding:6px 12px;">
            <i class="fa-solid fa-bolt"></i> Chèn lộ trình vào SOAP
          </button>
        </div>
      </div>

      <!-- SVG Canvas Viewport -->
      <div id="flowchart-svg-viewport" style="width:100%; height:420px; margin-bottom:16px;">
        ${renderFlowchartSvg(chart, firstNode.id)}
      </div>

      <!-- Interactive Decision & Clinical Guidance Card -->
      <div id="flowchart-guidance-card" style="background:var(--color-bg, #f8fafc); border-radius:8px; padding:16px; border:1px solid var(--color-border, #e2e8f0);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <div>
            <span id="guide-node-tag" style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--color-primary); background:rgba(2,132,199,0.1); padding:2px 8px; border-radius:4px;">
              BƯỚC KHỞI ĐẦU
            </span>
            <h4 id="guide-node-title" style="margin:6px 0 0; font-size:15px; color:var(--color-text, #0f172a);">
              ${escapeSvg(firstNode.label)}
            </h4>
          </div>
          <span style="font-size:11.5px; color:var(--color-text-muted);"><i class="fa-solid fa-hand-pointer"></i> Bấm vào từng node trên sơ đồ để xem khuyến cáo</span>
        </div>

        <p id="guide-node-details" style="font-size:13px; line-height:1.5; color:var(--color-text); margin:8px 0;">
          ${escapeSvg(firstNode.details || '')}
        </p>

        <div style="background:var(--color-surface); padding:10px 12px; border-radius:6px; border-left:4px solid var(--color-primary); font-size:12.5px; color:var(--color-text);">
          <strong><i class="fa-solid fa-stethoscope" style="color:var(--color-primary);"></i> Y Lệnh Khuyến Cáo:</strong>
          <span id="guide-node-recom">${escapeSvg(firstNode.recommendation || '')}</span>
        </div>
      </div>

    </div>
  `;
}

/**
 * Attach Interactive Events to Flowchart Studio
 */
export function attachFlowchartEvents(container: HTMLElement, onSelectFlowchart?: (chartId: string) => void): void {
  const selector = container.querySelector('#flowchart-selector') as HTMLSelectElement | null;
  const viewport = container.querySelector('#flowchart-svg-viewport');
  const guideTag = container.querySelector('#guide-node-tag');
  const guideTitle = container.querySelector('#guide-node-title');
  const guideDetails = container.querySelector('#guide-node-details');
  const guideRecom = container.querySelector('#guide-node-recom');
  const insertBtn = container.querySelector('#btn-insert-flowchart-to-soap');

  let currentChartId = selector?.value || 'flowchart_acs';
  let activeNodeId = '';

  const bindNodeClicks = (chart: ClinicalFlowchart) => {
    container.querySelectorAll('.flowchart-node-group').forEach(group => {
      group.addEventListener('click', () => {
        const nodeId = group.getAttribute('data-node-id');
        if (!nodeId) return;

        const node = chart.nodes.find(n => n.id === nodeId);
        if (!node) return;

        activeNodeId = node.id;
        
        // Update SVG Active highlight
        if (viewport) {
          viewport.innerHTML = renderFlowchartSvg(chart, activeNodeId);
          bindNodeClicks(chart);
        }

        // Update Guidance card
        if (guideTag) guideTag.textContent = node.type.toUpperCase();
        if (guideTitle) guideTitle.textContent = node.label;
        if (guideDetails) guideDetails.textContent = node.details || '';
        if (guideRecom) guideRecom.textContent = node.recommendation || '';
      });
    });
  };

  const chart = CLINICAL_FLOWCHARTS_REGISTRY.find(c => c.id === currentChartId) || CLINICAL_FLOWCHARTS_REGISTRY[0];
  bindNodeClicks(chart);

  // Switch Flowchart Dropdown
  selector?.addEventListener('change', () => {
    currentChartId = selector.value;
    if (onSelectFlowchart) {
      onSelectFlowchart(currentChartId);
    } else {
      container.innerHTML = renderFlowchartStudioHtml(currentChartId);
      attachFlowchartEvents(container, onSelectFlowchart);
    }
  });

  // Insert Path into SOAP Plan
  insertBtn?.addEventListener('click', () => {
    const currentChart = CLINICAL_FLOWCHARTS_REGISTRY.find(c => c.id === currentChartId);
    if (!currentChart) return;

    const currentNode = currentChart.nodes.find(n => n.id === activeNodeId) || currentChart.nodes[0];
    const pathText = `[Phác đồ ${currentChart.conditionName}]: ${currentNode.label} ➔ ${currentNode.recommendation || currentNode.details}`;

    // Copy to clipboard
    navigator.clipboard.writeText(pathText).then(() => {
      insertBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã chép lộ trình';
      setTimeout(() => {
        insertBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Chèn lộ trình vào SOAP';
      }, 2000);
    });
  });
}

function escapeSvg(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
