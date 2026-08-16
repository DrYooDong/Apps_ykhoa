/**
 * CliniPortal — Master Clinical Studio Registry (TypeScript Catalog & Metadata)
 * Path: src/content/calculators/studio-registry.ts
 */

import { ClinicalStudioManifest, SpecialtyCategory } from './studio-models';

export const CLINICAL_STUDIOS_REGISTRY: ClinicalStudioManifest[] = [
  // ==========================================
  // 1. CẤP CỨU & HỒI SỨC TÍCH CỰC (EMERGENCY & ICU)
  // ==========================================
  {
    id: 'ql-van-mach-studio',
    slug: 'van-mach-tro-tim',
    title: 'Hemodynamics & Vasoactive Pro Studio — Hồi Sức Vận Mạch & Động Học Huyết Động',
    shortTitle: 'Vận Mạch & VIS Studio',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '⚡',
    riskTier: 'critical',
    riskLabel: 'Hồi Sức Cực Nguy Kịch',
    description: 'Workstation quản lý 4 bơm tiêm điện song song (Norepinephrine, Vasopressin, Epinephrine, Dobutamine), tính tải VIS, Radar phân loại sốc & Protocol CVC/A-Line.',
    indications: ['Sốc nhiễm khuẩn (Septic Shock)', 'Sốc tim (Cardiogenic Shock)', 'Hạ huyết áp kháng trị', 'Đánh giá chỉ số VIS'],
    ebmGuidelines: ['Surviving Sepsis Campaign (SSC 2021/2026)', 'AHA/ACC Shock Consensus'],
    features: ['Multi-Pump Matrix', 'Vector Radar Shock Classification', 'VIS Score Calculation', '1-Click HIS Order'],
    route: '/calculators/van-mach-tro-tim',
    presets: [
      {
        id: 'septic-shock-std',
        name: 'Sốc Nhiễm Khuẩn Điển Hình',
        badge: 'SSC 2026',
        description: 'Bệnh nhân 65kg, MAP 52 mmHg sau bù đủ dịch 30ml/kg, cần phối hợp Noradrenaline + Vasopressin.',
        params: { weight: 65, map: 52, ne_dose: 0.25, vaso_dose: 0.03, dobuta_dose: 0, epi_dose: 0 }
      },
      {
        id: 'cardiogenic-shock',
        name: 'Sốc Tim & Giảm Co Bóp',
        badge: 'AHA Protocol',
        description: 'Bệnh nhân NMCT cấp biến chứng sốc tim, ScvO2 55%, MAP 58 mmHg, cần Noradrenaline + Dobutamine.',
        params: { weight: 70, map: 58, ne_dose: 0.15, vaso_dose: 0, dobuta_dose: 5.0, epi_dose: 0 }
      }
    ],
    protocols: [
      {
        id: 'cvc-aline',
        title: 'Quy Trình Đặt CVC & Huyết Áp Động Mạch Xâm Lấn (A-Line)',
        icon: 'fa-syringe',
        summary: 'Chỉ định đặt CVC sớm khi liều Noradrenaline > 0.25 mcg/kg/min hoặc duy trì vận mạch > 6 giờ.',
        steps: [
          'Kiểm tra vị trí tĩnh mạch dưới hướng dẫn siêu âm (US-guided internal jugular / femoral).',
          'Theo dõi áp lực động mạch liên tục qua catheter động mạch quay (Radial A-Line).',
          'Dự phòng thoát mạch: Tiêm Phentolamine 5-10mg tại chỗ nếu nghi ngờ thoát mạch ngoại biên.'
        ]
      }
    ]
  },
  {
    id: 'ql-bu-dich-studio',
    slug: 'bu-dich',
    title: 'Fluid Resuscitation Pro Studio — Quản Lý Động Học Bù Dịch & Đánh Giá Đáp Ứng',
    shortTitle: 'Bù Dịch & Dynamic Fluid',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '💧',
    riskTier: 'critical',
    riskLabel: 'Hồi Sức Cấp Cứu',
    description: 'Workstation bù dịch theo 7 bệnh cảnh lâm sàng cấp cứu (Sốc nhiễm khuẩn, Bỏng nặng Parkland, DKA, Viêm tụy cấp, Sốc mất máu, Tiêu chảy mất nước, Tăng áp lực thẩm thấu).',
    indications: ['Hồi sức sốc ban đầu', 'Đánh giá đáp ứng bù dịch (PLR, VTI, IVC)', 'Phòng ngừa quá tải dịch'],
    ebmGuidelines: ['SSC 2021 Guidelines', 'Parkland Formula', 'ADA DKA Protocol'],
    features: ['7 Clinical Scenarios', 'Dynamic Fluid Responsiveness', 'Overload Safety Guard', 'Electrolyte Osmolarity Calc'],
    route: '/calculators/bu-dich',
    presets: [
      {
        id: 'sepsis-30ml',
        name: 'Sốc Nhiễm Khuẩn (Bolus 30 mL/kg)',
        badge: 'SSC Guideline',
        description: 'Bolus tinh thể đẳng trương 30 mL/kg trong 3 giờ đầu, đánh giá tái tưới máu mao mạch CRT.',
        params: { weight: 60, scenario: 'sepsis', fluidType: 'balanced' }
      },
      {
        id: 'burn-parkland',
        name: 'Bỏng Nặng 35% TBSA (Parkland)',
        badge: 'Parkland 4mL',
        description: 'Tính tổng dịch Ringer Lactate 24h = 4mL x 60kg x 35% = 8400mL (50% trong 8h đầu).',
        params: { weight: 60, tbsa: 35, scenario: 'burn' }
      }
    ],
    protocols: [
      {
        id: 'plr-test',
        title: 'Nghiệm Pháp Nâng Chân Thụ Động (Passive Leg Raising - PLR)',
        icon: 'fa-person-booth',
        summary: 'Tự động tương đương bolus 300mL máu nội sinh, đánh giá tăng cung lượng tim CO > 10%.',
        steps: [
          'Đặt bệnh nhân tư thế nửa ngồi 45 độ, đo huyết áp và cung lượng tim nền (baseline).',
          'Hạ đầu phẳng và nâng hai chân lên 45 độ trong 60-90 giây.',
          'Đánh giá biến thiên thể tích nhát bóp (SV) hoặc lưu lượng Doppler động mạch chủ.'
        ]
      }
    ]
  },
  {
    id: 'ql-may-tho-studio',
    slug: 'quan-ly-may-tho',
    title: 'Ventilator & ARDS Pro Studio — Động Học Thông Khí Nhân Tạo & ARDSNet Workbench',
    shortTitle: 'Máy Thở & ARDS Studio',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '🫁',
    riskTier: 'critical',
    riskLabel: 'ICU Thông Khí Cơ Học',
    description: 'Bộ công cụ mô phỏng đường cong P-V loop, tính Driving Pressure (ΔP), Compliance động/tĩnh, bảng PEEP/FiO2 ARDSNet & Tiêu chuẩn cai máy thở RSBI.',
    indications: ['ARDS mức độ nhẹ - trung bình - nặng', 'Cài đặt máy thở bảo vệ phổi', 'Cai máy thở và rút nội khí quản'],
    ebmGuidelines: ['ARDSNet Protocol', 'Berlin ARDS Definition', 'ATS/ESICM Mechanical Ventilation'],
    features: ['IBW Lung-protective Vt (4-8 mL/kg)', 'Driving Pressure Monitoring (Target < 14 cmH2O)', 'PEEP-FiO2 Titration Matrix', 'RSBI Weaning Calculator'],
    route: '/calculators/quan-ly-may-tho',
    presets: [
      {
        id: 'severe-ards',
        name: 'ARDS Nặng (P/F = 85)',
        badge: 'High PEEP + Prone',
        description: 'Bệnh nhân Nam 170cm (IBW 66kg), Vt 396 mL (6mL/kg), PEEP 14 cmH2O, FiO2 80%.',
        params: { height: 170, gender: 'male', pplat: 28, peep: 14, fio2: 80, pao2: 68 }
      }
    ],
    protocols: [
      {
        id: 'prone-positioning',
        title: 'Chỉ Định & Quy Trình Thở Bụng Sấp (Prone Positioning)',
        icon: 'fa-bed',
        summary: 'Chỉ định khi P/F < 150 với PEEP ≥ 10 cmH2O, duy trì tối thiểu 16 giờ/ngày.',
        steps: [
          'Hút đờm sâu, cố định chắc ống nội khí quản và các đường truyền tĩnh mạch trung tâm.',
          'Ekip 4-5 người xoay bệnh nhân sang tư thế nằm sấp cẩn trọng.',
          'Theo dõi SpO2, huyết áp và kiểm tra giảm áp lực tì đè vùng mặt, ngực.'
        ]
      }
    ]
  },
  {
    id: 'acls-resus-studio',
    slug: 'acls-resus-studio',
    title: 'ACLS Resuscitation Pro Studio — Đồng Hồ Cấp Cứu Ngừng Tim & Phác Đồ 2 Phút',
    shortTitle: 'ACLS & CPR Studio',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '❤️‍🔥',
    riskTier: 'critical',
    riskLabel: 'Cấp Cứu Ngừng Tuần Hoàn',
    description: 'Studio thời gian thực đếm chu kỳ CPR 2 phút, nhắc nhịp dùng Adrenaline (mỗi 3-5 phút), Sốc điện (VF/pVT), Amiodarone, và checklist 5H & 5T.',
    indications: ['Ngừng tuần hoàn hô hấp (Cardiac Arrest)', 'VF / Vô mạch VT', 'Vô tâm thu (Asystole) / PEA'],
    ebmGuidelines: ['AHA ACLS 2025/2026 Guidelines', 'ERC Resuscitation Standards'],
    features: ['2-Min CPR Cycle Countdown', 'Shock / Rhythm Check Prompt', '5H & 5T Interactive Differential', 'ROSC Care Checklist'],
    route: '/calculators/acls-resus-studio',
    presets: [
      {
        id: 'shockable-vf',
        name: 'Rung Thất / Nhanh Thất Vô Mạch (Shockable)',
        badge: 'Defib 200J Biphasic',
        description: 'Sốc điện 200J ngay lập tức -> CPR 2 phút -> Đánh giá nhịp -> Adrenaline sau shock thứ 2.',
        params: { rhythm: 'VF', shocks: 1, cprRound: 1 }
      }
    ],
    protocols: [
      {
        id: '5h-5t',
        title: 'Rà Soát Toàn Diện 10 Nguyên Nhân Hồi Phục (5H & 5T)',
        icon: 'fa-list-check',
        summary: 'Kiểm tra lập tức trong lúc CPR: Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia; Tension Pneumothorax, Tamponade, Toxins, Thrombosis PE, Thrombosis Coronary.',
        steps: [
          'Thăm khám siêu âm tại giường eFAST tìm tràn dịch màng tim, tràn khí màng phổi.',
          'Xét nghiệm khí máu tại giường (VBG/ABG) đánh giá Kali và pH.',
          'Xác nhận vị trí ống nội khí quản và độ bão hòa oxy.'
        ]
      }
    ]
  },
  {
    id: 'toxicology-studio',
    slug: 'toxicology-studio',
    title: 'Toxicology & Antidote Pro Studio — Nhận Diện Hội Chứng Nhiễm Độc & Thuốc Giải Độc',
    shortTitle: 'Chống Độc & Antidote',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '🧪',
    riskTier: 'critical',
    riskLabel: 'Chống Độc Cấp',
    description: 'Workstation tra cứu hội chứng nhiễm độc (Toxidromes), tính liều Antidote đặc hiệu (Atropine, Pralidoxime, NAC Paracetamol, Naloxone, Lipid 20%), phân độ PSS (WHO/IPCS).',
    indications: ['Ngộ độc cấp', 'Quá liều Paracetamol, Opioid, Thuốc trừ sâu, Thuốc an thần, Thuốc chẹn Calci/Beta'],
    ebmGuidelines: ['WHO/IPCS Poisoning Severity Score', 'Rumack-Matthew Nomogram', 'Extrip Dialysis in Poisoning'],
    features: ['Toxidrome Vector Matcher', 'Rumack-Matthew Nomogram Calculator', 'Antidote Dosing Workstation', 'ILE Lipid Resuscitation'],
    route: '/calculators/toxicology-studio',
    presets: [
      {
        id: 'op-sludge',
        name: 'Ngộ Độc Thuốc Trừ Sâu Phospho Hữu Cơ',
        badge: 'SLUDGE Syndrome',
        description: 'Mạch chậm 42 l/p, co đồng tử 1.5mm, tăng tiết đờm dãi, co giật bó cơ -> Atropin hóa + Pralidoxime.',
        params: { toxidrome: 'cholinergic', atropineDose: '2-5mg IV q5min' }
      },
      {
        id: 'para-overdose',
        name: 'Quá Liều Paracetamol Giờ Thứ 6',
        badge: 'NAC 3-Bag / 2-Bag',
        description: 'Nồng độ Paracetamol 180 mcg/mL tại giờ thứ 6 -> Chỉ định truyền N-Acetylcysteine tĩnh mạch.',
        params: { drug: 'paracetamol', hours: 6, level: 180 }
      }
    ],
    protocols: [
      {
        id: 'ile-lipid',
        title: 'Liệu Pháp Nhũ Dịch Mỡ Intralipid 20% (ILE Protocol)',
        icon: 'fa-flask-vial',
        summary: 'Cấp cứu ngừng tim hoặc tụt huyết áp trơ do ngộ độc thuốc tê nhóm Amid (Bupivacaine, Lidocaine) hoặc thuốc tan trong mỡ.',
        steps: [
          'Bolus Intralipid 20% 1.5 mL/kg trong 1 phút.',
          'Tiếp tục truyền liên tục 0.25 mL/kg/min.',
          'Có thể lặp lại bolus 1-2 lần nếu huyết áp chưa phục hồi (tối đa 12 mL/kg/24h).'
        ]
      }
    ]
  },
  {
    id: 'polytrauma-mtp-studio',
    slug: 'polytrauma-mtp-studio',
    title: 'Polytrauma & MTP Pro Studio — Cấp Cứu Đa Chấn Thương & Kích Hoạt Truyền Máu Khối Lượng Lớn',
    shortTitle: 'Đa Chấn Thương & MTP',
    specialty: 'emergency',
    specialtyName: 'Cấp cứu & Hồi sức ICU',
    specialtyIcon: 'fa-truck-medical',
    icon: '🩸',
    riskTier: 'critical',
    riskLabel: 'Chấn Thương Cực Nặng',
    description: 'Đánh giá điểm số chấn thương ISS/RTS, kích hoạt phác đồ truyền máu khối lượng lớn (MTP ABC Score / TASH Score), cân bằng tỷ lệ 1:1:1 (Hồng cầu : Huyết tương : Tiểu cầu).',
    indications: ['Đa chấn thương nặng', 'Sốc mất máu chấn thương', 'Rối loạn đông máu do chấn thương (TIC)'],
    ebmGuidelines: ['ATLS 10th Edition', 'European Trauma Hemorrhage Guidelines 2023'],
    features: ['ABC Score Calculator', '1:1:1 Blood Component Manager', 'TXA Tranexamic Acid Timing Guard', 'Hypothermia / Acidosis / Coagulopathy Lethal Triad Shield'],
    route: '/calculators/polytrauma-mtp-studio',
    presets: [
      {
        id: 'abc-positive',
        name: 'Đa Chấn Thương Kích Hoạt MTP (ABC Score = 3)',
        badge: 'ABC Score ≥ 2',
        description: 'Chấn thương xuyên thấu, HA tâm thu 85 mmHg, Mạch 125 l/p, FAST (+) -> Kích hoạt MTP đợt 1.',
        params: { penetrating: true, sbp: 85, hr: 125, fast: true }
      }
    ],
    protocols: [
      {
        id: 'txa-protocol',
        title: 'Phác Đồ Sử Dụng Axit Tranexamic (TXA CRASH-2)',
        icon: 'fa-capsules',
        summary: 'Sử dụng càng sớm càng tốt trong vòng 3 giờ đầu sau chấn thương.',
        steps: [
          'Liều tải: 1g TXA pha trong 100mL NaCl 0.9% truyền tĩnh mạch trong 10 phút.',
          'Liều duy trì: 1g TXA truyền tĩnh mạch liên tục trong 8 giờ tiếp theo.',
          'Không dùng nếu chấn thương đã quá 3 giờ do nguy cơ tăng tử vong do huyết khối.'
        ]
      }
    ]
  },
  {
    id: 'stroke-pro-studio',
    slug: 'dg-dot-quy',
    title: 'Stroke Pro Studio — Cấp Cứu Đột Quỵ Não Cấp & Cửa Sổ Vàng Tái Thông',
    shortTitle: 'Đột Quỵ Não & NIHSS',
    specialty: 'neurology',
    specialtyName: 'Thần kinh & Đột quỵ',
    specialtyIcon: 'fa-brain',
    icon: '⏱️',
    riskTier: 'critical',
    riskLabel: 'Cửa Sổ Vàng Đột Quỵ',
    description: 'Đánh giá điểm số NIHSS 11 mục, xác định cửa sổ tiêu sợi huyết Alteplase (≤ 4.5h) và Lấy huyết khối cơ học EVT (≤ 24h), kiểm soát huyết áp Nicardipine.',
    indications: ['Nhồi máu não cấp', 'Tắc mạch máu lớn nội sọ (LVO)', 'Chỉ định rtPA & EVT'],
    ebmGuidelines: ['AHA/ASA Ischemic Stroke Guidelines 2026', 'ESO Guidelines'],
    features: ['11-Item NIHSS Interactive Calculator', 'rtPA Dose Calculator (0.9mg/kg)', 'BP Control Target Matrix', 'DAWN / DEFUSE-3 Criteria'],
    route: '/calculators/dg-dot-quy',
    presets: [
      {
        id: 'stroke-golden-hour',
        name: 'Đột Quỵ Giờ Thứ 2 (NIHSS = 14)',
        badge: 'rtPA Candidate',
        description: 'Bệnh nhân 60kg, khởi phát 2 giờ, NIHSS 14 điểm, CT sọ không xuất huyết -> Chỉ định rtPA 54mg.',
        params: { weight: 60, hours: 2, nihss: 14, sbp: 175, dbp: 95 }
      }
    ],
    protocols: [
      {
        id: 'rtpa-infusion',
        title: 'Phác Đồ Tiêu Sợi Huyết Alteplase (rtPA)',
        icon: 'fa-vial',
        summary: 'Tổng liều 0.9 mg/kg (tối đa 90 mg). 10% tiêm bolus trong 1 phút, 90% truyền tĩnh mạch liên tục trong 60 phút.',
        steps: [
          'Kiểm soát HA < 185/110 mmHg trước tiêm bằng Nicardipine IV.',
          'Theo dõi sinh hiệu và khám thần kinh mỗi 15 phút trong 2 giờ đầu.',
          'Chụp CT lại khẩn nếu đau đầu dữ dội, nôn ói hoặc tụt tri giác.'
        ]
      }
    ]
  },

  // ==========================================
  // 2. TIM MẠCH & ĐIỆN TÂM ĐỒ (CARDIOLOGY)
  // ==========================================
  {
    id: 'arrhythmia-studio',
    slug: 'phan-loai-roi-loan-nhip',
    title: 'Arrhythmia Pro Studio — Phân Loại Rối Loạn Nhịp Tim & Mô Phỏng ECG Trực Quan',
    shortTitle: 'Rối Loạn Nhịp & ECG',
    specialty: 'cardiology',
    specialtyName: 'Tim mạch',
    specialtyIcon: 'fa-heart-pulse',
    icon: '📈',
    riskTier: 'high',
    riskLabel: 'Nguy Cơ Nhịp Kịch Phát',
    description: 'Mô phỏng đồ thị ECG tương tác Canvas 2D/SVG, cây thuật toán chẩn đoán Rối loạn nhịp tim (Nhịp nhanh phức bộ hẹp/rộng, Rung nhĩ, Nhịp chậm, Block AV) & Phác đồ chuyển nhịp.',
    indications: ['Chẩn đoán nhịp nhanh / nhịp chậm', 'Chỉ định sốc điện chuyển nhịp', 'Phác đồ Adenosine / Amiodarone / Atropine'],
    ebmGuidelines: ['ESC Arrhythmia Guidelines', 'AHA/ACC Tachycardia / Bradycardia Algorithm'],
    features: ['Canvas 2D Waveform Engine', 'Narrow vs Wide QRS Decision Tree', 'Adenosine Bolus Guide', 'Cardioversion Energy Calculator'],
    route: '/calculators/phan-loai-roi-loan-nhip',
    presets: [
      {
        id: 'svt-stable',
        name: 'Nhịp Nhanh Kịch Phát Trên Thất (SVT - 180 l/p)',
        badge: 'Adenosine 6mg',
        description: 'Huyết động ổn định, QRS hẹp đều -> Nghiệm pháp Valsalva cải tiến -> Adenosine 6mg bolus nhanh.',
        params: { rate: 180, qrsWidth: 80, rhythm: 'SVT', stable: true }
      }
    ],
    protocols: [
      {
        id: 'valsalva-modified',
        title: 'Nghiệm Pháp Valsalva Cải Tiến (REVERT Trial)',
        icon: 'fa-lungs',
        summary: 'Tăng tỷ lệ cắt cơn SVT từ 17% lên 43% so với Valsalva tiêu chuẩn.',
        steps: [
          'Thổi vào ống tiêm 20mL đạt áp lực 40 mmHg trong 15 giây ở tư thế ngồi.',
          'Ngay lập tức hạ nằm phẳng và nâng hai chân lên 45 độ trong 15 giây.',
          'Đưa bệnh nhân trở lại tư thế nửa ngồi 45 độ trong 45 giây.'
        ]
      }
    ]
  },

  // ==========================================
  // 3. THẬN, ĐIỆN GIẢI & TOAN KIỀM (RENAL)
  // ==========================================
  {
    id: 'abg-pro-studio',
    slug: 'khi-mau-dong-mach',
    title: 'Arterial Blood Gas (ABG) & Acid-Base Kinetic Studio — Phân Tích Khí Máu Động Mạch Chuyên Sâu',
    shortTitle: 'Khí Máu ABG Studio',
    specialty: 'renal',
    specialtyName: 'Thận & Điện giải',
    specialtyIcon: 'fa-flask',
    icon: '🔥',
    riskTier: 'high',
    riskLabel: 'Toan Kiềm Động Học',
    description: 'Quy trình 6 bước phân tích toan kiềm Boston/Stewart: Anion Gap hiệu chỉnh Albumin, Delta Ratio (Δ/Δ), Công thức bù trừ Winter / Bicarbonate deficit.',
    indications: ['Nhiễm toan chuyển hóa', 'Nhiễm toan hô hấp', 'Rối loạn toan kiềm hỗn hợp 3 thành phần'],
    ebmGuidelines: ['Boston Acid-Base Approach', 'Stewart Physicochemical Approach'],
    features: ['Albumin-Corrected Anion Gap', 'Delta-Delta Mixed Disorder Matrix', 'Winter Formula PCO2 Target', 'Bicarbonate Deficit Calculator'],
    route: '/calculators/khi-mau-dong-mach',
    presets: [
      {
        id: 'dka-hagma',
        name: 'Toan Cetone Đái Tháo Đường (DKA High AG)',
        badge: 'HAGMA + Comp Resp',
        description: 'pH 7.15, PaCO2 22 mmHg, HCO3 8 mmol/L, Na 135, Cl 98, Albumin 40 g/L -> AG = 29 (HAGMA).',
        params: { ph: 7.15, paco2: 22, hco3: 8, na: 135, cl: 98, alb: 40 }
      }
    ],
    protocols: [
      {
        id: 'bicarb-protocol',
        title: 'Chỉ Định & Phác Đồ Bù Natri Bicarbonate 8.4%',
        icon: 'fa-vial',
        summary: 'Chỉ định khi pH < 7.10 kèm suy sụp huyết động hoặc toan chuyển hóa mất Bicarbonate nặng.',
        steps: [
          'Tính lượng thiếu hụt Bicarbonate Deficit = 0.5 x Cân nặng x (24 - HCO3 đo được).',
          'Truyền 50% lượng thiếu hụt trong 4-6 giờ đầu dưới dạng dung dịch Isotonic Bicarbonate 1.4%.',
          'Theo dõi khí máu và nồng độ Canxi ion hóa (nguy cơ hạ Canxi và hạ Kali máu).'
        ]
      }
    ]
  },
  {
    id: 'electrolyte-studio',
    slug: 'electrolyte-studio',
    title: 'Electrolyte & Osmolality Pro Studio — Động Học Bù Điện Giải & Thẩm Thấu Máu',
    shortTitle: 'Điện Giải & Thẩm Thấu',
    specialty: 'renal',
    specialtyName: 'Thận & Điện giải',
    specialtyIcon: 'fa-flask',
    icon: '🧪',
    riskTier: 'high',
    riskLabel: 'Điện Giải Cấp Cứu',
    description: 'Động học bù Natri hạ/tăng Natri máu (Công thức Adrogué-Madias, kiểm soát tốc độ tăng Na phòng hủy Myelin cầu não ODS), Xử trí tăng/hạ Kali, Canxi, Magie.',
    indications: ['Hạ Natri máu cấp có triệu chứng', 'Hội chứng SIADH', 'Tăng Kali máu nặng đe dọa tim', 'Hạ Canxi máu'],
    ebmGuidelines: ['European Hyponatremia Guidelines', 'KDIGO Electrolytes Consensus'],
    features: ['Adrogué-Madias Infusion Planner', 'NaCl 3% Hypertonic Rate Guard', 'Hyperkalemia Cardiac Membrane Stabilization', 'Osmolal Gap Calculator'],
    route: '/calculators/electrolyte-studio',
    presets: [
      {
        id: 'acute-hyponatremia-seizure',
        name: 'Hạ Natri Máu Cấp Gây Co Giật (Na = 112)',
        badge: 'NaCl 3% 100mL Bolus',
        description: 'Bệnh nhân 55kg, co giật, Na 112 mmol/L -> Bolus NaCl 3% 100mL trong 10 phút, mục tiêu nâng Na 4-6 mmol/L.',
        params: { weight: 55, na_curr: 112, na_target: 118, fluid_type: 'nacl3' }
      }
    ],
    protocols: [
      {
        id: 'hyperkalemia-protocol',
        title: 'Phác Đồ Cấp Cứu Tăng Kali Máu Nặng (K+ ≥ 6.5 mmol/L)',
        icon: 'fa-heart-circle-bolt',
        summary: 'Ổn định màng cơ tim -> Đưa Kali vào trong tế bào -> Thải Kali ra khỏi cơ thể.',
        steps: [
          'Ổn định màng tim: Tiêm TM chậm 10mL Canxi Gluconate 10% trong 2-3 phút.',
          'Chuyển dịch Kali: 10 UI Insulin nhanh (Actrapid) pha trong 50mL Glucose 50% truyền TM trong 20 phút.',
          'Thải Kali: Thuốc lợi tiểu quai Furosemide, Nhựa trao đổi ion (Lokelma/Patiromer) hoặc Chỉ định lọc máu cấp.'
        ]
      }
    ]
  },

  // ==========================================
  // 4. HÔ HẤP & X-QUANG PHỔI (RESPIRATORY)
  // ==========================================
  {
    id: 'pneumonia-studio',
    slug: 'pneumonia-studio',
    title: 'Pneumonia Pro Studio — Phân Tầng Viêm Phổi Mắc Phải Cộng Đồng & Thang Điểm CURB-65 / PSI',
    shortTitle: 'Viêm Phổi & CURB-65',
    specialty: 'respiratory',
    specialtyName: 'Hô hấp',
    specialtyIcon: 'fa-lungs',
    icon: '🫁',
    riskTier: 'mid',
    riskLabel: 'Phân Tầng Điều Trị',
    description: 'Workstation phân tầng CURB-65, Pneumonia Severity Index (PSI / PORT Score), ATS/IDSA Severe CAP Criteria, gợi ý nơi điều trị (Ngoại trú / Bệnh phòng / ICU) & Kháng sinh kinh nghiệm.',
    indications: ['Viêm phổi mắc phải cộng đồng (CAP)', 'Quyết định nhập viện / ICU', 'Lựa chọn phác đồ kháng sinh'],
    ebmGuidelines: ['ATS/IDSA CAP Guidelines', 'BTS Pneumonia Guidelines'],
    features: ['CURB-65 & PSI Multi-Score Engine', 'Site-of-Care Decision Support', 'Empiric Antibiotic Regimen Recommender', 'MRSA / P. aeruginosa Risk Matrix'],
    route: '/calculators/pneumonia-studio',
    presets: [
      {
        id: 'curb-high-risk',
        name: 'Viêm Phổi Nặng Nguy Cơ Cao (CURB-65 = 3)',
        badge: 'ICU / Inpatient Admission',
        description: 'Tuổi 68, Ure 8.5 mmol/L, Nhịp thở 32 l/p, HA 85/55 mmHg -> CURB-65 = 3 -> Chỉ định nhập viện/ICU.',
        params: { age: 68, confusion: false, bun: 8.5, rr: 32, sbp: 85, dbp: 55 }
      }
    ],
    protocols: [
      {
        id: 'cap-antibiotics',
        title: 'Phác Đồ Kháng Sinh Kinh Nghiệm Viêm Phổi Nặng (IDSA/ATS)',
        icon: 'fa-capsules',
        summary: 'Phối hợp Beta-lactam phổ rộng + Macrolide hoặc Quinolone hô hấp.',
        steps: [
          'Beta-lactam: Ceftriaxone 2g/ngày hoặc Ampicillin/Sulbactam 3g q6h.',
          'Phối hợp: Azithromycin 500mg/ngày IV hoặc Levofloxacin 750mg/ngày IV.',
          'Thêm Vancomycin nếu có yếu tố nguy cơ MRSA hoặc Piperacillin/Tazobactam nếu nghi ngờ Pseudomonas.'
        ]
      }
    ]
  },
  {
    id: 'cxr-pro-studio',
    slug: 'cxr-studio',
    title: 'CXR Pro Studio — Đánh Giá X-Quang Ngực Thẳng & Đo Chỉ Số Tim - Lồng Ngực (CTR)',
    shortTitle: 'X-Quang Ngực & CTR',
    specialty: 'respiratory',
    specialtyName: 'Hô hấp',
    specialtyIcon: 'fa-lungs',
    icon: '🩻',
    riskTier: 'low',
    riskLabel: 'Chẩn Đoán Hình Ảnh',
    description: 'Công cụ đo tỷ lệ tim/lồng ngực (Cardiothoracic Ratio - CTR) trực quan trên Canvas, checklist đọc phim X-quang ngực ABCDEF (Airway, Bones, Cardiac, Diaphragm, Effusion, Fields).',
    indications: ['Đánh giá bóng tim to (Cardiomegaly)', 'Tràn dịch màng phổi', 'Tràn khí màng phổi', 'Tổn thương đông đặc phế nang'],
    ebmGuidelines: ['Standardized Radiology Reporting Protocol', 'ACR Appropriateness Criteria'],
    features: ['Interactive Canvas CTR Caliper Tool', 'ABCDEF Systematic Reading Checklist', 'Pneumothorax Size Estimation', 'Quality Assessment (Inspiration/Rotation)'],
    route: '/calculators/cxr-studio',
    presets: [
      {
        id: 'ctr-cardiomegaly',
        name: 'Bóng Tim To Trên Phim PA (CTR = 0.58)',
        badge: 'CTR > 0.50',
        description: 'Đường kính ngang bóng tim 16.5cm, đường kính trong lồng ngực 28.5cm -> CTR = 58% (Tim to).',
        params: { cardiacDiameter: 16.5, thoracicDiameter: 28.5 }
      }
    ],
    protocols: [
      {
        id: 'cxr-checklist',
        title: 'Quy Trình 6 Bước Đọc X-Quang Ngực Chuẩn Hóa (ABCDEF)',
        icon: 'fa-list-check',
        summary: 'Hệ thống hóa tránh bỏ sót tổn thương góc sườn hoành và đỉnh phổi.',
        steps: [
          'A - Airway: Khí quản có lệch không? Carina góc bình thường?',
          'B - Bones & Soft tissue: Gãy xương sườn, đòn? Tràn khí dưới da?',
          'C - Cardiac & Mediastinum: Bờ tim, chỉ số CTR, trung thất có dãn rộng?',
          'D - Diaphragm: Vòm hoành P cao hơn T? Góc sườn hoành sắc nhọn?',
          'E - Effusion / Extras: Tràn dịch màng phổi? Dây dẫn CVC, ống ETT?',
          'F - Fields: Nhu mô phổi hai bên (Đông đặc, thâm nhiễm, hang, nốt).'
        ]
      }
    ]
  },

  // ==========================================
  // 5. TRUYỀN NHIỄM & VI SINH (INFECTIOUS)
  // ==========================================
  {
    id: 'sepsis-pro-studio',
    slug: 'sepsis-studio',
    title: 'Sepsis Pro Studio — Sàng Lọc & Phân Tầng Nhiễm Khuẩn Toàn Diện (Sepsis-3 Bundle)',
    shortTitle: 'Sepsis Pro Studio',
    specialty: 'infectious',
    specialtyName: 'Truyền nhiễm',
    specialtyIcon: 'fa-virus',
    icon: '🦠',
    riskTier: 'critical',
    riskLabel: 'Cấp Cứu Sepsis',
    description: 'Workstation tích hợp 6 thang điểm sàng lọc (qSOFA, SOFA, NEWS2, SIRS, MEDS, Shock Index), Đếm ngược gói 1 giờ (Sepsis-3 1-Hour Bundle) & Theo dõi Lactate động.',
    indications: ['Sàng lọc nhiễm khuẩn huyết tại phòng khám/cấp cứu', 'Đánh giá suy đa cơ quan (SOFA Score)', 'Theo dõi gói can thiệp 1 giờ'],
    ebmGuidelines: ['Surviving Sepsis Campaign (SSC 2021/2026)', 'Sepsis-3 Consensus Definitions'],
    features: ['6-in-1 Multi-Score Screening Engine', '1-Hour Bundle Countdown Timer', 'Dynamic Lactate Clearance Calculator', 'Organ Failure Alert'],
    route: '/calculators/sepsis-studio',
    presets: [
      {
        id: 'sepsis-sofa-high',
        name: 'Nhiễm Khuẩn Huyết Nặng (SOFA = 8, qSOFA = 2)',
        badge: 'Sepsis-3 Confirmed',
        description: 'Bệnh nhân lú lẫn, HA 88/50, Thở 26 l/p, Lactate 3.8 mmol/L, Bilirubin tăng, Tiểu cầu giảm -> Kích hoạt Sepsis Bundle.',
        params: { qsofa: 2, sofa: 8, lactate: 3.8, sbp: 88, rr: 26 }
      }
    ],
    protocols: [
      {
        id: 'sepsis-1h-bundle',
        title: 'Gói Can Thiệp Hồi Sức Nhiễm Khuẩn Huyết 1 Giờ (SSC 1-Hour Bundle)',
        icon: 'fa-stopwatch',
        summary: 'Bắt đầu ngay lập tức từ thời điểm nhận diện Sepsis.',
        steps: [
          '1. Định lượng Lactate máu. Lặp lại sau 2-4 giờ nếu Lactate ban đầu > 2.0 mmol/L.',
          '2. Cấy máu trước khi bắt đầu dùng kháng sinh (2 bộ cấy từ 2 vị trí khác nhau).',
          '3. Dùng kháng sinh phổ rộng đường tĩnh mạch trong vòng 1 giờ đầu.',
          '4. Bù dịch tinh thể 30 mL/kg nếu có tụt huyết áp (MAP < 65) hoặc Lactate ≥ 4.0 mmol/L.',
          '5. Bắt đầu vận mạch Noradrenaline nếu tụt huyết áp trơ sau bù dịch để duy trì MAP ≥ 65 mmHg.'
        ]
      }
    ]
  },
  {
    id: 'microbiology-studio',
    slug: 'microbiology-studio',
    title: 'Microbiology & Antibiogram Pro Studio — Vi Sinh Lâm Sàng & Kháng Sinh Đồ Tương Tác',
    shortTitle: 'Vi Sinh & Antibiogram',
    specialty: 'infectious',
    specialtyName: 'Truyền nhiễm',
    specialtyIcon: 'fa-virus',
    icon: '🔬',
    riskTier: 'high',
    riskLabel: 'Kháng Thuốc & Vi Sinh',
    description: 'Giả lập cây nhận diện vi khuẩn Gram (+)/(-), Đĩa kháng sinh đồ Kirby-Bauer ảo, Ma trận tính độ nhạy S/I/R, Nhận diện cơ chế kháng thuốc ESBL, CRE, MRSA, VRE.',
    indications: ['Phiên giải kết quả cấy vi sinh & kháng sinh đồ', 'Xuống thang hoặc tối ưu hóa kháng sinh', 'Phát hiện vi khuẩn đa kháng MDRO'],
    ebmGuidelines: ['CLSI M100 Performance Standards', 'EUCAST Clinical Breakpoints 2026'],
    features: ['Interactive Gram Stain Decision Tree', 'Antibiogram S/I/R Matrix', 'MDRO Mechanism Identification', 'De-escalation Recommender'],
    route: '/calculators/microbiology-studio',
    presets: [
      {
        id: 'gram-neg-esbl',
        name: 'E. coli Sinh ESBL Từ Nước Tiểu',
        badge: 'ESBL Confirmed',
        description: 'Kháng Ceftriaxone, Cefotaxime, Aztreonam; Nhạy Meropenem, Amikacin, Fosfomycin.',
        params: { organism: 'E. coli', esbl: true, carbapenemResistant: false }
      }
    ],
    protocols: [
      {
        id: 'mdro-isolation',
        title: 'Quy Trình Kiểm Soát Nhiễm Khuẩn & Cách Ly Vi Khuẩn Đa Kháng',
        icon: 'fa-shield-virus',
        summary: 'Áp dụng biện pháp phòng ngừa tiếp xúc (Contact Precautions).',
        steps: [
          'Xếp phòng cách ly riêng hoặc cùng phòng với bệnh nhân nhiễm cùng chủng vi khuẩn.',
          'Mang găng tay và áo choàng vô khuẩn khi tiếp xúc với bệnh nhân hoặc dịch cơ thể.',
          'Khử khuẩn bề mặt thiết bị y tế dùng chung bằng dung dịch sát khuẩn đạt chuẩn.'
        ]
      }
    ]
  },

  // ==========================================
  // 6. TIÊU HÓA, GAN MẬT & DINH DƯỠNG (GASTRO)
  // ==========================================
  {
    id: 'cirrhosis-meld-studio',
    slug: 'dg-xo-gan-studio',
    title: 'Cirrhosis & MELD Pro Studio — Đánh Giá Xơ Gan Toàn Diện (Child-Pugh & MELD-Na)',
    shortTitle: 'Xơ Gan & MELD-Na',
    specialty: 'gastroenterology',
    specialtyName: 'Tiêu hóa & Gan mật',
    specialtyIcon: 'fa-bowl-food',
    icon: '🩺',
    riskTier: 'high',
    riskLabel: 'Suy Gan Mạn & Ghép Gan',
    description: 'Workstation tích hợp Child-Turcotte-Pugh, MELD-Na 2016, MELD 3.0, Dự đoán tỷ lệ sống còn 3 tháng, Phân tầng chỉ định ghép gan & Phác đồ điều trị biến chứng xơ gan.',
    indications: ['Xơ gan mất bù', 'Đánh giá nguy cơ phẫu thuật ở bệnh nhân xơ gan', 'Chỉ định và ưu tiên ghép gan'],
    ebmGuidelines: ['AASLD Cirrhosis Guidelines 2026', 'EASL Clinical Practice Guidelines'],
    features: ['Child-Pugh Multi-Parameter Grade (A/B/C)', 'MELD-Na & MELD 3.0 Dynamic Engine', '3-Month Mortality Probability Curve', 'Complication Management Protocols'],
    route: '/calculators/dg-xo-gan-studio',
    presets: [
      {
        id: 'decompensated-cirrhosis',
        name: 'Xơ Gan Mất Bù Nguy Cơ Cao (Child C, MELD-Na = 26)',
        badge: 'Child-Pugh C (12đ)',
        description: 'Bilirubin 85 umol/L, Albumin 24 g/L, INR 2.1, Na 128 mmol/L, Creatinine 160 umol/L, Cổ trướng mức độ vừa -> Nguy cơ tử vong 3 tháng ~ 52%.',
        params: { bili: 85, inr: 2.1, creat: 160, na: 128, alb: 24, ascites: 'moderate', enceph: 'grade2' }
      }
    ],
    protocols: [
      {
        id: 'sbp-protocol',
        title: 'Phác Đồ Xử Trí Nhiễm Trùng Dịch Báng Tự Phát (SBP)',
        icon: 'fa-virus-slash',
        summary: 'Chẩn đoán khi Bạch cầu đa nhân trung tính dịch báng (PMN) ≥ 250 tế bào/mm3.',
        steps: [
          'Kháng sinh: Cefotaxime 2g q8h IV hoặc Ceftriaxone 2g/ngày IV trong 5-7 ngày.',
          'Bù Albumin phòng hội chứng gan thận (HRS): 1.5 g/kg trong 6 giờ đầu, tiếp theo 1.0 g/kg vào ngày 3.',
          'Dự phòng thứ phát sau hồi phục: Ciprofloxacin 500mg/ngày hoặc Bactrim dài hạn.'
        ]
      }
    ]
  },
  {
    id: 'ascites-saag-studio',
    slug: 'ascites-studio',
    title: 'Ascites & SAAG Pro Studio — Phân Tích Dịch Báng & Độ Chênh Albumin Huyết Thanh - Dịch Báng',
    shortTitle: 'Dịch Báng & SAAG',
    specialty: 'gastroenterology',
    specialtyName: 'Tiêu hóa & Gan mật',
    specialtyIcon: 'fa-bowl-food',
    icon: '🧪',
    riskTier: 'mid',
    riskLabel: 'Chẩn Đoán Dịch Màng Bụng',
    description: 'Tính độ chênh SAAG (Serum-Ascites Albumin Gradient), Phân biệt Tăng áp tĩnh mạch cửa (SAAG ≥ 1.1 g/dL) vs Không tăng áp cửa (SAAG < 1.1 g/dL), Tính liều Lợi tiểu Spironolactone + Furosemide tỷ lệ 100:40.',
    indications: ['Bệnh nhân cổ trướng mới xuất hiện', 'Chẩn đoán phân biệt nguyên nhân tràn dịch màng bụng', 'Chỉnh liều lợi tiểu'],
    ebmGuidelines: ['AASLD Ascites Guidance', 'EASL Ascites Consensus'],
    features: ['SAAG Gradient Calculator', 'Protein Dịch Báng Differential (Transudate vs Exudate)', 'Spironolactone : Furosemide (100mg : 40mg) Titration Engine', 'Large Volume Paracentesis (LVP) Albumin Guard'],
    route: '/calculators/ascites-studio',
    presets: [
      {
        id: 'portal-htn-ascites',
        name: 'Cổ Trướng Do Tăng Áp Lực Tĩnh Mạch Cửa (SAAG = 1.6 g/dL)',
        badge: 'SAAG ≥ 1.1',
        description: 'Albumin máu 3.2 g/dL, Albumin dịch báng 1.6 g/dL -> SAAG = 1.6 g/dL, Protein dịch báng 1.8 g/dL (Xơ gan điển hình).',
        params: { serumAlb: 3.2, ascitesAlb: 1.6, ascitesProtein: 1.8 }
      }
    ],
    protocols: [
      {
        id: 'lvp-albumin',
        title: 'Quy Trình Chọc Tháo Dịch Báng Lượng Lớn (LVP > 5 Lít)',
        icon: 'fa-droplet',
        summary: 'Bù Albumin phòng ngừa rối loạn tuần hoàn sau chọc tháo (PPCD).',
        steps: [
          'Chọc tháo tối đa 5-8 lít dưới kiểm soát vô khuẩn và theo dõi sinh hiệu.',
          'Bù Albumin 20%: 6 - 8g Albumin cho mỗi 1 Lít dịch báng được tháo ra (nếu tháo > 5 Lít).',
          'Ví dụ: Tháo 6 Lít dịch báng -> Bù 48g Albumin (tương đương ~ 240mL Albumin 20%).'
        ]
      }
    ]
  },

  // ==========================================
  // 7. NỘI TIẾT & ĐÁI THÁO ĐƯỜNG (ENDOCRINOLOGY)
  // ==========================================
  {
    id: 'insulin-pro-studio',
    slug: 'insulin-studio',
    title: 'Diabetes & Insulin Pro Studio — Quản Lý Đái Tháo Đường & Phác Đồ Insulin Nội Viện',
    shortTitle: 'Insulin & Diabetes Studio',
    specialty: 'endocrinology',
    specialtyName: 'Nội tiết & Đái tháo đường',
    specialtyIcon: 'fa-syringe',
    icon: '💉',
    riskTier: 'high',
    riskLabel: 'Kiểm Soát Đường Huyết',
    description: 'Workstation cá thể hóa điều trị ĐTĐ 3 bối cảnh: Ngoại trú (OADs & GLP-1 RA), Bệnh phòng Non-ICU (Basal-Bolus 50/50 tiêm dưới da) & Hồi sức ICU (Bơm tiêm điện Insulin tĩnh mạch liên tục CII).',
    indications: ['ĐTĐ Type 2 nhập viện', 'Chuyển đổi từ thuốc uống sang Insulin', 'Bơm tiêm điện Insulin kiểm soát đường huyết ICU'],
    ebmGuidelines: ['ADA Standards of Care in Hospital 2026', 'KDIGO Diabetes Management 2024'],
    features: ['Total Daily Dose (TDD) Auto-Splitter', 'Basal-Bolus 50/50 Ratio Manager', 'ICU Insulin Infusion Rate Dynamic Protocol', 'Hypoglycemia Alert & Rescue Protocol (Rule of 15)'],
    route: '/calculators/insulin-studio',
    presets: [
      {
        id: 'inpatient-non-icu',
        name: 'Bệnh Nhân Nội Viện Không Nặng (Basal-Bolus)',
        badge: 'ADA Inpatient Regimen',
        description: 'Bệnh nhân 60kg, ăn uống được, Đường huyết 14.5 mmol/L -> TDD = 30 UI (15 UI Glargine 21h + 5 UI Aspart x 3 bữa trước ăn).',
        params: { weight: 60, factor: 0.5, setting: 'non_icu', regimen: 'basal_bolus' }
      }
    ],
    protocols: [
      {
        id: 'hypo-rule-15',
        title: 'Phác Đồ Xử Trí Hạ Đường Huyết (Quy Tắc 15 - Rule of 15)',
        icon: 'fa-candy-cane',
        summary: 'Áp dụng ngay khi Đường huyết mao mạch < 3.9 mmol/L (70 mg/dL).',
        steps: [
          'Nếu tỉnh: Uống 15g Carbohydrate tác dụng nhanh (1/2 lon nước ngọt có đường, 3 viên kẹo, hoặc 3 gói đường pha nước).',
          'Nếu hôn mê / không nuốt được: Tiêm TM 50mL Glucose 20% hoặc 1 ống Glucagon 1mg tiêm bắp.',
          'Đo lại đường huyết sau 15 phút. Nếu vẫn < 3.9 mmol/L -> Lặp lại bước trên.'
        ]
      }
    ]
  },

  // ==========================================
  // 8. HUYẾT HỌC & XÉT NGHIỆM (HEMATOLOGY)
  // ==========================================
  {
    id: 'lab-pro-studio',
    slug: 'lab-pro-studio',
    title: 'Lab Pro Studio PACS — Phân Tích & Đối Soát Xét Nghiệm Huyết Học, Sinh Hóa Chuyên Sâu',
    shortTitle: 'Lab Pro & PACS Studio',
    specialty: 'hematology',
    specialtyName: 'Huyết học & Xét nghiệm',
    specialtyIcon: 'fa-vial-virus',
    icon: '🩸',
    riskTier: 'mid',
    riskLabel: 'Xét Nghiệm Đa Thông Số',
    description: 'Workstation tra cứu và phân tích 40+ chỉ số xét nghiệm huyết học, đông máu (PT/INR, aPTT, Fibrinogen), sinh hóa và điện giải kèm khoảng tham chiếu động.',
    indications: ['Đối soát kết quả cận lâm sàng', 'Phát hiện bất thường đa thông số', 'Chẩn đoán phân biệt hội chứng huyết học'],
    ebmGuidelines: ['CLSI Reference Intervals', 'ISTH Coagulation Standards'],
    features: ['Dynamic Laboratory Reference Values', 'Interactive Coagulation Pathway Visualizer', 'Delta Check Warning System', 'Hematology Index Auto-Calculator'],
    route: '/calculators/lab-pro-studio',
    presets: [
      {
        id: 'dic-profile',
        name: 'Hội Chứng Đông Máu Rải Rác Trong Lòng Mạch (DIC Profile)',
        badge: 'ISTH Score ≥ 5',
        description: 'Tiểu cầu 45 G/L, PT kéo dài INR 2.4, Fibrinogen 0.9 g/L, D-Dimer tăng rất cao -> Chỉ điểm DIC cấp.',
        params: { plt: 45, inr: 2.4, fib: 0.9, ddimer: 8.5 }
      }
    ],
    protocols: [
      {
        id: 'dic-management',
        title: 'Phác Đồ Hồi Sức Đông Máu Trong DIC (ISTH Protocol)',
        icon: 'fa-shield-heart',
        summary: 'Điều trị bệnh lý nền nguyên nhân phối hợp bù chế phẩm máu theo mục tiêu.',
        steps: [
          'Truyền Huyết tương tươi đông lạnh (FFP) 15-20 mL/kg nếu PT/aPTT kéo dài > 1.5 lần.',
          'Truyền Tủa lạnh (Cryoprecipitate) nếu Fibrinogen < 1.5 g/L (mục tiêu > 1.5 g/L).',
          'Truyền Khối tiểu cầu nếu Tiểu cầu < 50 G/L và đang có chảy máu hoạt tính.'
        ]
      }
    ]
  }
];

/**
 * Tra cứu Studio theo ID hoặc Slug
 */
export function getStudioById(idOrSlug: string): ClinicalStudioManifest | undefined {
  return CLINICAL_STUDIOS_REGISTRY.find(s => s.id === idOrSlug || s.slug === idOrSlug);
}

/**
 * Lọc danh sách Studio theo chuyên khoa, từ khóa tìm kiếm hoặc mức độ nguy cơ
 */
export function filterStudios(
  specialty: SpecialtyCategory | 'all' = 'all',
  searchQuery: string = '',
  riskTier: string = 'all'
): ClinicalStudioManifest[] {
  let list = [...CLINICAL_STUDIOS_REGISTRY];

  if (specialty !== 'all') {
    list = list.filter(s => s.specialty === specialty);
  }

  if (riskTier !== 'all') {
    list = list.filter(s => s.riskTier === riskTier);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.shortTitle.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.indications.some(ind => ind.toLowerCase().includes(q)) ||
      s.features.some(f => f.toLowerCase().includes(q))
    );
  }

  return list;
}
