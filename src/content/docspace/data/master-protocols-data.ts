/**
 * DocSpace — Master Clinical Protocols Library Data
 * Kho Phác Đồ Mẫu Chuẩn Mực Thực Chiến (Bộ Y Tế / AHA / ESC / GINA / GOLD / ADA)
 */

import { PersonalProtocol } from '../types';

export interface ProtocolSpecialtyCategory {
  key: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
}

export const PROTOCOL_SPECIALTIES: ProtocolSpecialtyCategory[] = [
  { key: 'all',       name: 'Tất cả Phác đồ',  icon: 'fa-solid fa-layer-group',    color: 'var(--color-primary)', bg: 'rgba(2,132,199,0.1)' },
  { key: 'emergency', name: 'Cấp cứu & ICU',   icon: 'fa-solid fa-truck-medical',  color: '#ef4444',             bg: 'rgba(239,68,68,0.1)' },
  { key: 'cardio',    name: 'Tim mạch',        icon: 'fa-solid fa-heart-pulse',    color: '#dc2626',             bg: 'rgba(220,38,38,0.1)' },
  { key: 'pulmo',     name: 'Hô hấp',          icon: 'fa-solid fa-lungs',          color: '#2563eb',             bg: 'rgba(37,99,235,0.1)' },
  { key: 'gi',        name: 'Tiêu hóa',        icon: 'fa-solid fa-stethoscope',    color: '#ca8a04',             bg: 'rgba(202,138,4,0.1)' },
  { key: 'endo',      name: 'Nội tiết & Thận', icon: 'fa-solid fa-dna',            color: '#7c3aed',             bg: 'rgba(124,58,237,0.1)' },
  { key: 'neuro',     name: 'Thần kinh',       icon: 'fa-solid fa-brain',          color: '#c026d3',             bg: 'rgba(192,38,211,0.1)' },
  { key: 'infectious',name: 'Truyền nhiễm',    icon: 'fa-solid fa-virus',          color: '#0d9488',             bg: 'rgba(13,148,136,0.1)' },
];

export const MASTER_CLINICAL_PROTOCOLS: PersonalProtocol[] = [
  // ─────────────────────────────────────────────
  // 0. TRUYỀN NHIỄM & CẤP CỨU DENGUE
  // ─────────────────────────────────────────────
  {
    id: 'master-dengue-byt',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Phác đồ Chẩn đoán & Hồi sức Sốt Xuất Huyết Dengue (QĐ 2760/QĐ-BYT 2023)',
    specialty: 'Truyền nhiễm & Hồi sức Cấp cứu',
    specialtyKey: 'infectious',
    summary: 'Phác đồ điều trị 3 cấp độ: SXHD thông thường, SXHD có DHCB và Hồi sức Sốc thoát huyết tương / Xuất huyết nặng theo Bộ Y Tế.',
    icdCodes: ['A91', 'A90'],
    steps: [
      {
        order: 1,
        title: 'Phân tầng Nguy cơ & Đánh giá Dấu hiệu Cảnh báo (DHCB)',
        timeframe: 'Phút 0 - 15 tiếp nhận',
        text: 'Khám tri giác, Mạch, HA, CRT, đo Hct tại giường và đếm tiểu cầu. Nhận diện DHCB: Đau bụng vùng gan, nôn ói ≥ 3 lần/h, xuất huyết niêm mạc, tiểu ít, Hct tăng nhanh.',
      },
      {
        order: 2,
        title: 'SXHD Ngoại trú vs Nhập viện Điều trị',
        timeframe: 'Sau phân loại',
        text: 'SXHD Độ 1 (không DHCB): Điều trị ngoại trú, bù Oresol đường uống, hạ sốt bằng Paracetamol đơn chất 10-15 mg/kg mỗi 4-6h. Tuyệt đối KHÔNG dùng Aspirin/Ibuprofen/NSAIDs. Nhập viện nếu có DHCB hoặc cơ địa béo phì, thai kỳ, Thalassemia.',
      },
      {
        order: 3,
        title: 'Bù dịch Tinh thể đẳng trương theo Động học',
        timeframe: 'Giờ 1 - 24',
        text: 'SXHD có DHCB: Truyền Ringer Lactate/NaCl 0.9% 6-7 ml/kg/h (1-3h đầu) -> giảm dần 5 ml/kg/h (2-4h) -> 3 ml/kg/h -> 1.5 ml/kg/h. Nếu có bệnh gan nặng/Thalassemia: Dùng Ringer Acetate hoặc NaCl 0.9%.',
        isAlert: false,
      },
      {
        order: 4,
        title: 'Hồi sức SỐC Thoát Huyết Tương & Sốc Nguy Kịch',
        timeframe: 'Cấp cứu tối khẩn',
        text: 'Nằm đầu thấp. Nếu M=0, HA=0: Bơm nhanh Tinh thể 15-20 ml/kg trong 15 phút. Nếu sốc thông thường: Truyền nhanh 15-20 ml/kg trong 1 giờ. Đo lại Hct ngay sau dịch.',
        isAlert: true,
      },
      {
        order: 5,
        title: 'Xử trí Sốc trơ (Cao phân tử) vs Xuất huyết nội ẩn',
        timeframe: 'Khi không đáp ứng sau 1 giờ',
        text: 'Nếu Hct còn cao: Đổi sang Dịch Cao Phân Tử (Dextran 40/HES 200) 10-20 ml/kg/h, đo CVP và huyết áp động mạch xâm lấn. Nếu Hct tụt > 20% kèm tụt HA: Truyền Hồng cầu lắng 5-10 ml/kg, đặt sonde dạ dày qua đường miệng.',
        isAlert: true,
      },
      {
        order: 6,
        title: 'Nhận biết Giai đoạn Hồi phục & Phòng Phù phổi cấp',
        timeframe: 'Ngày 6 - 7',
        text: 'Khi hết sốt, tiểu nhiều, mạch HA ổn định, Hct giảm sinh lý do tái hấp thu: Giảm liều nhanh và ngưng hẳn dịch truyền. TUYỆT ĐỐI KHÔNG truyền thêm dịch hoặc máu vì sẽ gây Quá tải tuần hoàn / Phù phổi cấp tử vong.',
        isAlert: true,
      }
    ],
    warnings: [
      'TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH Aspirin, Ibuprofen và các thuốc NSAIDs trong mọi giai đoạn của SXHD.',
      'KHÔNG truyền tiểu cầu dự phòng khi chưa có xuất huyết nặng (trừ khi tiểu cầu < 5.000/mm³ hoặc chuẩn bị phẫu thuật/sinh đẻ).',
      'TUYỆT ĐỐI KHÔNG đặt sonde dạ dày qua đường mũi vì nguy cơ chảy máu mũi nghiêm trọng không thể cầm.',
      'Ở phụ nữ có thai hoặc bệnh nhân béo phì, bắt buộc tính dịch truyền theo CÂN NẶNG HIỆU CHỈNH.',
    ],
    references: [
      'Quyết định số 2760/QĐ-BYT (2023) — Hướng dẫn chẩn đoán, điều trị Sốt xuất huyết Dengue — Bộ Y Tế Việt Nam',
      'WHO Dengue Guidelines for Diagnosis, Treatment, Prevention and Control (2009 / 2024)',
    ],
    createdAt: '2026-08-22T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z',
  },
  // ─────────────────────────────────────────────
  // 1. CẤP CỨU & HỒI SỨC ICU
  // ─────────────────────────────────────────────
  {
    id: 'master-sepsis-hour1',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xử trí Sốc Nhiễm Khuẩn (Hour-1 Bundle — Surviving Sepsis Campaign)',
    specialty: 'Cấp cứu & Hồi sức Tích cực (ICU)',
    specialtyKey: 'emergency',
    summary: 'Quy trình xử trí 5 can thiệp tối khẩn trong giờ đầu tiên khi phát hiện Nhiễm khuẩn huyết / Sốc nhiễm khuẩn.',
    icdCodes: ['R57.2', 'A41.9'],
    steps: [
      {
        order: 1,
        title: 'Đo nồng độ Lactate máu',
        timeframe: 'Phút 0 - 15',
        text: 'Lấy máu xét nghiệm Lactate ngay lập tức. Nếu Lactate ban đầu > 2 mmol/L, đo lại sau mỗi 2 - 4 giờ để hướng dẫn bù dịch và hồi sức vi tuần hoàn.',
      },
      {
        order: 2,
        title: 'Cấy máu trước khi dùng kháng sinh',
        timeframe: 'Phút 0 - 30',
        text: 'Cấy ít nhất 2 bộ máu (gồm 1 chai hiếu khí và 1 chai kỵ khí) từ 2 vị trí tĩnh mạch ngoại vi khác nhau. Tuyệt đối không trì hoãn kháng sinh quá 45 phút nếu việc cấy máu gặp khó khăn.',
      },
      {
        order: 3,
        title: 'Kháng sinh phổ rộng đường tĩnh mạch',
        timeframe: 'Trong 60 phút đầu',
        text: 'Dùng ngay kháng sinh phổ rộng liều tấn công tối đa (VD: Piperacillin/Tazobactam 4.5g IV hoặc Meropenem 1g IV + Vancomycin 25-30 mg/kg IV nếu nghi ngờ MRSA).',
        isAlert: true,
      },
      {
        order: 4,
        title: 'Bù dịch tinh thể tốc độ nhanh (30 mL/kg)',
        timeframe: 'Trong 1 - 3 giờ đầu',
        text: 'Truyền dịch tinh thể đẳng trương (ưu tiên Ringer Lactate / Acetate hơn NaCl 0.9%) với liều 30 mL/kg cân nặng thực tế khi có tụt huyết áp (MAP < 65 mmHg) hoặc Lactate máu ≥ 4 mmol/L.',
      },
      {
        order: 5,
        title: 'Khởi động Thuốc Vận Mạch Noradrenaline',
        timeframe: 'Ngay khi bù dịch chưa đạt MAP ≥ 65',
        text: 'Bắt đầu truyền Noradrenaline qua catheter tĩnh mạch trung tâm liều khởi đầu 0.05 - 0.1 mcg/kg/phút, chỉnh liều mỗi 5-10 phút để duy trì đích MAP ≥ 65 mmHg. Nếu liều Noradrenaline > 0.25 mcg/kg/phút, phối hợp thêm Vasopressin 0.03 đơn vị/phút hoặc Adrenaline.',
        isAlert: true,
      },
    ],
    warnings: [
      'Tránh truyền quá tải dịch ở bệnh nhân có tiền sử Suy tim hoặc Bệnh thận mạn giai đoạn cuối (đánh giá đáp ứng bù dịch động qua PLR hoặc siêu âm Vena Cava Inferior VCI).',
      'Nếu sau bù dịch và vận mạch liều cao vẫn chưa đạt huyết áp mục tiêu, cân nhắc Hydrocortisone 200 mg/ngày (chia 50mg mỗi 6h tiêm TM).',
    ],
    references: [
      'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock (2021)',
      'Hướng dẫn chẩn đoán và điều trị Sốc nhiễm khuẩn — Bộ Y Tế Việt Nam',
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-anaphylaxis-tt51',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xử trí Phản Vệ Cấp (Phác đồ Thông tư 51/2017/TT-BYT)',
    specialty: 'Cấp cứu & Hồi sức Tích cực (ICU)',
    specialtyKey: 'emergency',
    summary: 'Cấp cứu phản vệ từ độ II trở lên với Adrenaline là thuốc thiết yếu duy nhất cứu sống người bệnh.',
    icdCodes: ['T78.2', 'T78.0'],
    steps: [
      {
        order: 1,
        title: 'Ngừng ngay tiếp xúc với dị nguyên',
        timeframe: 'Ngay lập tức (Giây thứ 0)',
        text: 'Ngừng ngay đường truyền thuốc/dịch, thức ăn hoặc dị nguyên đang nghi ngờ. Đặt bệnh nhân nằm tại chỗ, đầu thấp, chân cao (nếu khó thở thì ngồi nửa nằm).',
      },
      {
        order: 2,
        title: 'Tiêm bắp Adrenaline 1mg/1ml ngay (Mặt trước ngoài đùi)',
        timeframe: 'Phút thứ 0 (Tối khẩn cấp)',
        text: '• Người lớn: Tiêm bắp 1/2 ống Adrenaline 1mg (tương đương 0.5 ml hoặc 0.5 mg).\n• Trẻ em > 30kg: 1/2 ống (0.5 mg).\n• Trẻ em 10 - 30kg: 1/3 ống (0.3 mg).\n• Trẻ em < 10kg: 1/4 - 1/5 ống (0.1 - 0.15 mg).\nTheo dõi huyết áp và mạch. Nếu chưa hồi phục, tiêm nhắc lại liều tương tự mỗi 3 - 5 phút.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Đảm bảo hô hấp & Thở Oxy lưu lượng cao',
        timeframe: 'Phút 1 - 5',
        text: 'Cho thở oxy qua mask túi 6 - 10 lít/phút. Nếu có phù nề thanh môn gây khó thở thanh quản, chuẩn bị đặt nội khí quản hoặc mở khí quản cấp cứu.',
      },
      {
        order: 4,
        title: 'Thiết lập đường truyền tĩnh mạch & Bù dịch nhanh',
        timeframe: 'Phút 3 - 10',
        text: 'Đặt 2 đường truyền tĩnh mạch lớn (kim 16G hoặc 18G). Truyền nhanh Natri Clorid 0.9% 1 - 2 lít ở người lớn (trẻ em 10 - 20 mL/kg trong 10 - 20 phút đầu).',
      },
      {
        order: 5,
        title: 'Thuốc phối hợp thứ hai (Sau khi tiêm Adrenaline)',
        timeframe: 'Sau khi kiểm soát huyết áp ban đầu',
        text: '• Methylprednisolone: 1 - 2 mg/kg tiêm TM (người lớn 40 - 80 mg).\n• Kháng Histamin H1: Diphenhydramine hoặc Dimedrol 10mg tiêm bắp/TM.\n• Kháng Histamin H2: Ranitidine 50mg hoặc Famotidine 20mg tiêm TM chậm.',
      },
    ],
    warnings: [
      'Tuyệt đối không dùng Corticoid hoặc Kháng Histamin thay thế cho Adrenaline.',
      'Cảnh báo sốc phản vệ pha 2 (Biphasic reaction): Tiếp tục theo dõi sát bệnh nhân tại phòng hồi sức ít nhất 24 - 48 giờ.',
    ],
    references: [
      'Thông tư 51/2017/TT-BYT Hướng dẫn phòng, chẩn đoán và xử trí phản vệ — Bộ Y tế',
      'WAO World Allergy Organization Anaphylaxis Guidelines',
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-cardiac-arrest-acls',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Hồi Sinh Tim Phổi Nâng Cao (ACLS Cardiac Arrest — AHA 2023)',
    specialty: 'Cấp cứu & Hồi sức Tích cực (ICU)',
    specialtyKey: 'emergency',
    summary: 'Thuật toán xử trí ngừng tuần hoàn người lớn phân theo nhịp có thể sốc điện (VF/pVT) và không sốc điện (Asystole/PEA).',
    icdCodes: ['I46.9'],
    steps: [
      {
        order: 1,
        title: 'Ép tim liên tục chất lượng cao & Gọi hỗ trợ (Code Blue)',
        timeframe: '0 - 2 phút đầu',
        text: 'Ép tim tần số 100 - 120 l/p, độ sâu 5 - 6 cm, để ngực nở hoàn toàn, giảm thiểu tối đa gián đoạn ép tim (< 10 giây). Thông khí bóp bóng tỷ lệ 30:2 hoặc 1 nhịp thở mỗi 6 giây nếu đã đặt nội khí quản.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Gắn Monitor / Máy Phá rung & Phân tích nhịp',
        timeframe: 'Cuối mỗi chu kỳ 2 phút',
        text: '• Nhịp SỐC ĐIỆN ĐƯỢC (Rung thất VF / Nhanh thất vô mạch pVT): Sốc điện khử rung 120 - 200J (Biphasic) ngay ➔ Ép tim lại ngay trong 2 phút không bắt mạch.\n• Nhịp KHÔNG SỐC ĐƯỢC (Vô tâm thu Asystole / Hoạt động điện vô mạch PEA): Ép tim tiếp tục ➔ Dùng Adrenaline ngay.',
      },
      {
        order: 3,
        title: 'Thuốc Vận Mạch & Chống Loạn Nhịp',
        timeframe: 'Trong chu kỳ ép tim',
        text: '• Adrenaline 1mg tiêm TM/IO mỗi 3 - 5 phút (cho sớm nhất trong Asystole/PEA; cho sau cú sốc điện thứ 2 trong VF/pVT).\n• Amiodarone: 300mg tiêm TM sau cú sốc điện thứ 3 trong VF/pVT dai dẳng, liều thứ hai 150mg sau 3 - 5 phút (hoặc Lidocaine 1 - 1.5 mg/kg).',
      },
      {
        order: 4,
        title: 'Tìm và Điều trị 5H & 5T',
        timeframe: 'Song song trong quá trình hồi sức',
        text: '• 5H: Hypovolemia (Giảm thể tích), Hypoxia (Thiếu oxy), Hydrogen ion (Toan máu), Hypo/Hyperkalemia (Hạ/Tăng kali), Hypothermia (Hạ thân nhiệt).\n• 5T: Tension pneumothorax (Tràn khí MP áp lực), Tamponade (Chèn ép tim cấp), Toxins (Ngộ độc), Thrombosis pulmonary (Thuyên tắc phổi), Thrombosis coronary (Hội chứng vành cấp).',
      },
    ],
    warnings: [
      'Đổi người ép tim mỗi 2 phút để tránh kiệt sức làm giảm chất lượng ép tim.',
      'Sử dụng theo dõi nồng độ $ETCO_2$: nếu $ETCO_2 < 10\text{ mmHg}$, cần cải thiện chất lượng ép tim; nếu $ETCO_2$ tăng vọt lên $> 35-40\text{ mmHg}$ là dấu hiệu phục hồi tuần hoàn tự nhiên (ROSC).',
    ],
    references: ['AHA Guidelines for CPR and ECC (2020 - 2023 Update)'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 2. TIM MẠCH (CARDIOVASCULAR)
  // ─────────────────────────────────────────────
  {
    id: 'master-stemi-esc',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI — ESC 2023)',
    specialty: 'Tim mạch',
    specialtyKey: 'cardio',
    summary: 'Chiến lược tái tưới máu khẩn cấp trong STEMI: Can thiệp mạch vành qua da thì đầu (Primary PCI) vs Tiêu sợi huyết.',
    icdCodes: ['I21.0', 'I21.1', 'I21.2', 'I21.3'],
    steps: [
      {
        order: 1,
        title: 'Đo ECG 12 chuyển đạo trong ≤ 10 phút đầu',
        timeframe: 'Phút 0 - 10',
        text: 'Phát hiện ST chênh lên tại điểm J ở ≥ 2 chuyển đạo liên tiếp (≥ 2.5mm ở nam < 40t, ≥ 2.0mm ở nam ≥ 40t, ≥ 1.5mm ở nữ tại V2-V3; ≥ 1.0mm ở các chuyển đạo khác). Nếu nhồi máu thành dưới, bắt buộc đo thêm V3R, V4R và V7-V9.',
      },
      {
        order: 2,
        title: 'Liều nạp Kháng kết tập tiểu cầu kép (DAPT Loading)',
        timeframe: 'Ngay khi chẩn đoán xác định',
        text: '• Aspirin: Uống nhai 150 - 300 mg (hoặc 250 - 500 mg tiêm TM).\n• Phối hợp thuốc ức chế P2Y12 mạnh:\n  - Ticagrelor: Liều nạp 180 mg (90mg x 2 viên) HOẶC\n  - Prasugrel: Liều nạp 60 mg HOẶC\n  - Clopidogrel: Liều nạp 600 mg (nếu không có Ticagrelor/Prasugrel).',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Thuốc chống đông toàn thân',
        timeframe: 'Trước khi chuyển phòng Catheter',
        text: '• Heparin không phân đoạn (UFH): Tiêm TM liều 70 - 100 UI/kg (hoặc 50 - 70 UI/kg nếu dùng kèm GP IIb/IIIa).\n• Hoặc Enoxaparin: Tiêm TM 30 mg, sau đó 15 phút tiêm dưới da 1 mg/kg mỗi 12h.',
      },
      {
        order: 4,
        title: 'Giảm đau & Kiểm soát huyết động',
        timeframe: 'Song song',
        text: '• Morphine: 2 - 4 mg tiêm TM chậm nếu đau ngực dữ dội không đáp ứng Nitroglycerin.\n• Nitroglycerin ngậm dưới lưỡi 0.4mg hoặc truyền TM 10-200 mcg/phút (CHỐNG CHỈ ĐỊNH nếu HA tâm thu < 90, Nhồi máu cơ tim thất phải, hoặc đã dùng thuốc PDE5i trong 24-48h).',
      },
      {
        order: 5,
        title: 'Kích hoạt chuyển phòng Can thiệp Mạch Vành (Cathlab)',
        timeframe: 'Thời gian Cửa - Bóng (Door-to-Balloon) < 60 - 90 phút',
        text: 'Chuyển khẩn cấp đến trung tâm can thiệp mạch vành thì đầu (PCI). Nếu thời gian từ lúc chẩn đoán đến khi nong bóng dự kiến > 120 phút, chỉ định dùng thuốc tiêu sợi huyết (Tenecteplase/Alteplase) trong vòng 10 phút nếu không có chống chỉ định.',
        isAlert: true,
      },
    ],
    warnings: [
      'Chống chỉ định Nitrat và Morphin khi có Nhồi máu thất phải (ST chênh lên ở V4R) hoặc nhịp tim chậm < 50 l/p.',
      'Khởi động Statin liều cao sớm: Atorvastatin 80mg hoặc Rosuvastatin 40mg.',
    ],
    references: ['2023 ESC Guidelines for the management of acute coronary syndromes'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-hypertensive-crisis',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Cơn Tăng Huyết Áp Cấp Cứu & Khẩn Cấp (Hypertensive Crisis — ESC/AHA)',
    specialty: 'Tim mạch',
    specialtyKey: 'cardio',
    summary: 'Phân định rõ Tăng huyết áp Cấp cứu (có tổn thương cơ quan đích cấp) vs Khẩn cấp (chưa có tổn thương cơ quan đích).',
    icdCodes: ['I10', 'I11.9', 'I15'],
    steps: [
      {
        order: 1,
        title: 'Phân tầng Nguy cơ: Khẩn cấp vs Cấp cứu',
        timeframe: 'Phút 0 - 15',
        text: 'HA ≥ 180/120 mmHg:\n• CÓ TỔN THƯƠNG CƠ QUAN ĐÍCH CẤP (Phù phổi cấp, Hội chứng vành cấp, Bóc tách ĐMC, Bệnh não THA, Đột quỵ, Tiền sản giật) ➔ TĂNG HUYẾT ÁP CẤP CỨU (Hypertensive Emergency).\n• KHÔNG CÓ TỔN THƯƠNG CƠ QUAN ĐÍCH CẤP ➔ TĂNG HUYẾT ÁP KHẨN CẤP (Hypertensive Urgency).',
      },
      {
        order: 2,
        title: 'Chiến lược Hạ áp trong THA Cấp cứu (Đường Tĩnh Mạch)',
        timeframe: 'Giờ thứ 1 - 2',
        text: 'Mục tiêu chung: Giảm HA tâm thu không quá 25% trong giờ đầu tiên, sau đó đạt 160/100-110 mmHg trong 2 - 6 giờ kế tiếp.\n• Nicardipine truyền TM: Khởi đầu 5 mg/h, tăng dần mỗi 5-15 phút (tối đa 15 mg/h).\n• Hoặc Labetalol TM: 20mg tiêm tĩnh mạch chậm trong 2 phút, nhắc lại 20-80mg mỗi 10 phút.\n• Hoặc Nitroglycerin TM (ưu tiên khi có Hội chứng vành cấp / Phù phổi cấp): 5 - 100 mcg/phút.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Ngoại lệ đặc biệt: Bóc tách Động Mạch Chủ Cấp',
        timeframe: 'Trong 20 phút đầu',
        text: 'Bắt buộc hạ HA tâm thu cấp tốc xuống < 120 mmHg và nhịp tim < 60 l/p trong vòng 20 phút bằng phối hợp Esmolol/Labetalol tĩnh mạch trước, sau đó mới dùng thuốc dãn mạch như Nicardipine/Nitroprusside.',
        isAlert: true,
      },
      {
        order: 4,
        title: 'Xử trí THA Khẩn cấp (Đường uống)',
        timeframe: 'Theo dõi 24 - 48 giờ',
        text: 'Không cần hạ áp cấp tốc qua đường tĩnh mạch. Cho uống thuốc hạ áp tác dụng chậm: Captopril 25mg uống, Amlodipine 5-10mg hoặc Labetalol 100-200mg uống. Hạ áp từ từ trong 24 - 48 giờ.',
      },
    ],
    warnings: [
      'TUYỆT ĐỐI KHÔNG DÙNG Nifedipine nhỏ dưới lưỡi vì gây hạ áp đột ngột dẫn đến nhồi máu não và thiếu máu cơ tim.',
      'Trong Đột quỵ thiếu máu não cấp: Chỉ hạ áp khi HA ≥ 220/120 mmHg (nếu không dùng rTPA) hoặc ≥ 185/110 mmHg (nếu chuẩn bị dùng rTPA).',
    ],
    references: ['2024 ESC Guidelines for the management of elevated blood pressure and hypertension'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-af-esc-2024',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Phác đồ Chẩn đoán & Điều trị Rung Nhĩ (ESC 2024 — Lộ trình AF-CARE)',
    specialty: 'Tim mạch & Cấp cứu',
    specialtyKey: 'cardio',
    summary: 'Chiến lược toàn diện AF-CARE: (C) Quản lý bệnh đồng mắc; (A) Kháng đông DOAC theo CHA2DS2-VA; (R) Kiểm soát tần số < 110 bpm hoặc Chuyển nhịp/Triệt đốt PVI; (E) Đánh giá định kỳ.',
    icdCodes: ['I48', 'I48.0', 'I48.1', 'I48.2', 'I48.9'],
    steps: [
      {
        order: 1,
        title: 'Tiếp nhận Khẩn & Sốc Điện Chuyển Nhịp Cấp Cứu',
        timeframe: 'Phút 0 - 15 tiếp nhận',
        text: 'Đo ECG 12 chuyển đạo xác định rung nhĩ. Nếu huyết động bất ổn (Sốc, Tụt HA, Đau ngực, Phù phổi cấp): Tiêm an thần ngắn hạn và SỐC ĐIỆN ĐỒNG BỘ 100 - 200J ngay + Dùng Heparin/DOAC sớm quanh thời điểm sốc.',
        isAlert: true,
      },
      {
        order: 2,
        title: '[A] Tránh Đột Quỵ Bằng Kháng Đông DOAC (CHA2DS2-VA)',
        timeframe: 'Khởi động ngay',
        text: 'Tính điểm CHA2DS2-VA. Chỉ định OAC khi ≥ 2 điểm (Class I) hoặc 1 điểm (Class IIa). Ưu tiên DOAC (Apixaban 5mg x 2, Rivaroxaban 20mg x 1, Dabigatran 150mg x 2, Edoxaban 60mg x 1) hơn Warfarin. Tránh tự ý giảm liều nếu không thỏa đủ tiêu chí.',
      },
      {
        order: 3,
        title: '[R] Kiểm Soát Tần Số Tim (Rate Control)',
        timeframe: 'Giờ 1 - 24',
        text: 'Đích tần số tim lúc nghỉ < 110 bpm. Nếu LVEF ≤ 40%: Dùng Chẹn Beta (Bisoprolol/Metoprolol) hoặc Digoxin. TUYỆT ĐỐI CẤM Verapamil/Diltiazem khi LVEF ≤ 40%. Nếu LVEF > 40%: Dùng Chẹn Beta, Diltiazem, Verapamil hoặc Digoxin.',
      },
      {
        order: 4,
        title: '[R] Kiểm Soát Nhịp & Triệt Đốt PVI',
        timeframe: 'Theo dõi & Kế hoạch',
        text: 'Triệt đốt qua ống thông (PVI) là lựa chọn hàng đầu cho Rung nhĩ kịch phát có triệu chứng (Class I, Level A) và BN suy tim HFrEF. Duy trì DOAC liên tục không ngắt quãng quanh thủ thuật và ít nhất 2 tháng sau triệt đốt.',
      },
    ],
    warnings: [
      'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI dùng Digoxin, Verapamil, Diltiazem hoặc Chẹn Beta đường tĩnh mạch ở bệnh nhân Rung nhĩ có hội chứng WPW (kích hoạt rung thất đột tử).',
      'Nếu rung nhĩ > 24 - 48h: Bắt buộc siêu âm tim qua thực quản (TEE) loại trừ huyết khối tiểu nhĩ trước khi chuyển nhịp hoặc dùng DOAC đủ 3 tuần.',
      'CẤM dùng thuốc Class IC (Flecainide, Propafenone) ở bệnh nhân có sẹo nhồi máu cơ tim cũ hoặc suy tim LVEF ≤ 40%.',
    ],
    references: ['2024 ESC Guidelines for the management of atrial fibrillation (AF-CARE)'],
    createdAt: '2026-08-22T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 3. HÔ HẤP (PULMONOLOGY)
  // ─────────────────────────────────────────────
  {
    id: 'master-asthma-attack',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xử trí Cơn Hen Phế Quản Cấp (GINA 2024)',
    specialty: 'Hô hấp',
    specialtyKey: 'pulmo',
    summary: 'Xử trí bậc thang cơn hen cấp mức độ nhẹ/trung bình đến nặng và đe dọa tính mạng.',
    icdCodes: ['J45.901', 'J46'],
    steps: [
      {
        order: 1,
        title: 'Đánh giá mức độ nặng & Thở Oxy',
        timeframe: 'Phút 0 - 5',
        text: 'Thở oxy duy trì $SpO_2$ mục tiêu 93 - 95% ở người lớn (94 - 98% ở trẻ em). Đánh giá dấu hiệu đe dọa tính mạng: lơ mơ, phổi câm, kiệt sức, nhịp tim chậm.',
      },
      {
        order: 2,
        title: 'Thuốc giãn phế quản tác dụng ngắn (SABA + SAMA)',
        timeframe: 'Phút 0 - 60 (Giờ đầu)',
        text: '• Salbutamol khí dung: 2.5 - 5 mg khí dung mỗi 20 phút trong 1 giờ đầu (hoặc MDI xịt qua buồng đệm 4 - 10 nhát mỗi 20 phút).\n• Phối hợp Ipratropium Bromide: 0.5 mg khí dung mỗi 20 phút trong giờ đầu ở cơn hen nặng/trung bình.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Corticoid toàn thân sớm',
        timeframe: 'Trong giờ đầu tiên',
        text: '• Prednisolone uống: 40 - 50 mg/ngày (hoặc Methylprednisolone 40 - 80 mg tiêm TM nếu không uống được).\n• Duy trì đợt Corticoid đường toàn thân trong 5 - 7 ngày.',
      },
      {
        order: 4,
        title: 'Magnesium Sulfate tĩnh mạch (Cơn hen nặng không đáp ứng)',
        timeframe: 'Sau giờ đầu nếu SpO2 < 92% hoặc PEF < 50%',
        text: 'Truyền tĩnh mạch Magnesium Sulfate $2\text{g}$ trong 20 phút.',
      },
    ],
    warnings: [
      'Không dùng thuốc an thần vì làm ức chế hô hấp dẫn đến ngừng thở.',
      'Khí dung quá liều Salbutamol có thể gây hạ Kali máu và nhịp tim nhanh.',
    ],
    references: ['Global Initiative for Asthma (GINA) 2024 Report'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-copd-exacerbation',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Đợt Cấp Bệnh Phổi Tắc Nghẽn Mạn Tính (AECOPD — GOLD 2024)',
    specialty: 'Hô hấp',
    specialtyKey: 'pulmo',
    summary: 'Xử trí đợt bùng phát khó thở, tăng thể tích đờm và đờm mủ theo tiêu chuẩn Anthonisen.',
    icdCodes: ['J44.1'],
    steps: [
      {
        order: 1,
        title: 'Liệu pháp Oxy có kiểm soát',
        timeframe: 'Ngay lập tức',
        text: 'Duy trì $SpO_2$ mục tiêu từ 88 - 92% (tránh thở oxy nồng độ cao làm tăng ứ trệ $CO_2$ và toan hô hấp nặng). Lấy khí máu động mạch sau 30-60 phút thở oxy.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Thuốc giãn phế quản tác dụng ngắn khí dung',
        timeframe: 'Mỗi 1 - 2 giờ',
        text: 'Khí dung phối hợp Salbutamol (2.5 - 5mg) + Ipratropium (0.5mg) mỗi 1 - 4 giờ tùy mức độ khó thở.',
      },
      {
        order: 3,
        title: 'Corticoid toàn thân ngắn ngày',
        timeframe: 'Ngày 1 - 5',
        text: 'Prednisone 40 mg uống mỗi ngày trong 5 ngày (tương đương Methylprednisolone 32 - 40 mg/ngày).',
      },
      {
        order: 4,
        title: 'Kháng sinh theo tiêu chuẩn Anthonisen',
        timeframe: 'Trong 5 - 7 ngày',
        text: 'Chỉ định kháng sinh khi có đủ 3 triệu chứng hoặc 2 triệu chứng trong đó có đờm mủ:\n• Amoxicillin/Clavulanate 1000/125mg x 2 lần/ngày HOẶC\n• Azithromycin 500mg ngày đầu, 250mg 4 ngày sau HOẶC\n• Cefuroxime 500mg x 2 lần/ngày (nếu nghi ngờ Pseudomonas thì dùng Levofloxacin 750mg hoặc Ciprofloxacin).',
      },
      {
        order: 5,
        title: 'Thông khí nhân tạo không xâm lấn (NIV / BiPAP)',
        timeframe: 'Khi có toan hô hấp pH < 7.35 và PaCO2 > 45 mmHg',
        text: 'Chỉ định BiPAP sớm giúp giảm tỷ lệ đặt nội khí quản và tử vong: Cài đặt IPAP 10-12 $cmH_2O$, EPAP 4-5 $cmH_2O$, điều chỉnh tăng dần IPAP.',
        isAlert: true,
      },
    ],
    warnings: [
      'Theo dõi sát nguy cơ tràn khí màng phổi tự phát ở bệnh nhân COPD có bóng khí phế thũng.',
    ],
    references: ['Global Strategy for Prevention, Diagnosis and Management of COPD (GOLD 2024)'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 4. TIÊU HÓA (GASTROENTEROLOGY)
  // ─────────────────────────────────────────────
  {
    id: 'master-upper-gi-bleeding',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xuất Huyết Tiêu Hóa Trên Do Loét Dạ Dày Tá Tràng',
    specialty: 'Tiêu hóa',
    specialtyKey: 'gi',
    summary: 'Hồi sức thể tích, ức chế tiết acid liều cao và nội soi can thiệp cầm máu trong 24 giờ đầu.',
    icdCodes: ['K25.0', 'K26.0', 'K92.2'],
    steps: [
      {
        order: 1,
        title: 'Đánh giá huyết động & Hồi sức dịch / Truyền máu',
        timeframe: 'Phút 0 - 30',
        text: 'Đặt 2 đường truyền lớn 16G-18G. Truyền Ringer Lactate hoặc NaCl 0.9%. Chỉ định truyền khối hồng cầu khi Hb < 7 g/dL (ngưỡng < 8 g/dL ở bệnh nhân có bệnh mạch vành/tim mạch cấp). Đích Hb duy trì: 7 - 9 g/dL.',
      },
      {
        order: 2,
        title: 'Thuốc Ức chế Bơm Proton (PPI) liều cao',
        timeframe: 'Ngay khi tiếp nhận',
        text: '• Esomeprazole hoặc Pantoprazole: Bolus TM 80 mg, sau đó truyền tĩnh mạch liên tục 8 mg/giờ trong 72 giờ (hoặc tiêm TM ngắt quãng 40mg mỗi 12 giờ).',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Nội soi thực quản - dạ dày - tá tràng (EGD)',
        timeframe: 'Trong vòng 24 giờ đầu sau khi ổn định huyết động',
        text: 'Phân loại Forrest để can thiệp cầm máu:\n• Forrest Ia (máu phun thành tia) & Ib (máu rỉ): Bắt buộc can thiệp phối hợp 2 phương pháp (Tiêm Adrenaline 1:10.000 + Kẹp Clip hoặc Đốt nhiệt/APC).\n• Forrest IIa (mạch máu lộ): Can thiệp cầm máu.\n• Forrest IIb (cục máu đông bám chắc) & IIc/III: Điều trị nội khoa PPI.',
      },
      {
        order: 4,
        title: 'Xét nghiệm và Tiệt trừ Helicobacter pylori',
        timeframe: 'Khi bệnh nhân ăn uống lại được',
        text: 'Làm Test Urease nhanh qua nội soi (CLO test) hoặc Test hơi thở $C^{13}/C^{14}$. Điều trị phác đồ 4 thuốc có Bismuth trong 14 ngày.',
      },
    ],
    warnings: [
      'Tránh truyền dịch và máu quá mức làm tăng áp lực tĩnh mạch cửa và tái xuất huyết.',
    ],
    references: ['ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding (2021)'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-variceal-bleeding',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xuất Huyết Tiêu Hóa Do Vỡ Giãn Tĩnh Mạch Thực Quản (Baveno VII)',
    specialty: 'Tiêu hóa',
    specialtyKey: 'gi',
    summary: 'Xử trí xuất huyết tiêu hóa do tăng áp lực tĩnh mạch cửa ở bệnh nhân Xơ gan.',
    icdCodes: ['I85.0', 'K74.6'],
    steps: [
      {
        order: 1,
        title: 'Thuốc làm giảm áp lực tĩnh mạch cửa (Dùng ngay trước khi nội soi)',
        timeframe: 'Ngay khi nghi ngờ vỡ giãn TMTQ',
        text: '• Terlipressin: 2mg tiêm TM mỗi 4 giờ trong 48h đầu, sau đó giảm 1mg mỗi 4h (DUY TRÌ 3-5 NGÀY) HOẶC\n• Octreotide: Bolus TM 50 mcg, sau đó truyền TM liên tục 50 mcg/giờ trong 3 - 5 ngày HOẶC\n• Somatostatin: Bolus TM 250 mcg, sau đó truyền 250 mcg/giờ.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Kháng sinh dự phòng nhiễm khuẩn (Bắt buộc ở bệnh nhân xơ gan)',
        timeframe: 'Ngay ngày đầu tiên',
        text: '• Ceftriaxone 1g tiêm tĩnh mạch mỗi 24 giờ trong 7 ngày (giúp giảm tỷ lệ tái xuất huyết và tử vong).',
      },
      {
        order: 3,
        title: 'Nội soi can thiệp Thắt vòng cao su (Endoscopic Variceal Ligation - EVL)',
        timeframe: 'Trong vòng 12 giờ đầu',
        text: 'Thắt búi giãn tĩnh mạch thực quản bằng vòng cao su (EVL). Nếu chảy máu ồ ạt không kiểm soát được, đặt ống Sonde Sengstaken-Blakemore chèn ép tạm thời hoặc chỉ định TIPS cứu vãn khẩn cấp.',
      },
      {
        order: 4,
        title: 'Dự phòng thứ phát sau khi cầm máu ổn định',
        timeframe: 'Sau ngày thứ 5-6',
        text: 'Phối hợp Thắt vòng cao su định kỳ mỗi 2 - 4 tuần cho đến khi hết búi giãn + Thuốc chẹn beta không chọn lọc (Carvedilol 6.25 - 12.5mg/ngày hoặc Propranolol) điều chỉnh theo nhịp tim đích 55 - 60 l/p.',
      },
    ],
    warnings: [
      'Chỉ truyền máu thận trọng với mục tiêu Hb 7 - 8 g/dL (truyền quá nhiều làm tăng vọt áp lực cửa gây bung nút thắt).',
    ],
    references: ['Baveno VII Consensus Workshop on Portal Hypertension (2022)'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 5. NỘI TIẾT & THẬN HỌC
  // ─────────────────────────────────────────────
  {
    id: 'master-dka-ada',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Toan Ceton Đái Tháo Đường (DKA Protocol — ADA 2024)',
    specialty: 'Nội tiết & Thận học',
    specialtyKey: 'endo',
    summary: 'Phác đồ 4 trụ cột: Bù dịch tinh thể, Bù Kali, Insulin truyền tĩnh mạch liên tục và Theo dõi Anion Gap.',
    icdCodes: ['E10.1', 'E11.1'],
    steps: [
      {
        order: 1,
        title: 'Bù dịch tinh thể NaCl 0.9%',
        timeframe: 'Giờ 1: 1000 - 1500 mL',
        text: '• Giờ đầu tiên: Truyền 1000 - 1500 mL NaCl 0.9%.\n• Các giờ tiếp theo: Đánh giá Natri hiệu chỉnh ($Na^+ + 1.6 \\times [Glucose - 5.6] / 5.6$):\n  - Nếu Natri hiệu chỉnh bình thường hoặc cao: Dùng NaCl 0.45% tốc độ 250 - 500 mL/h.\n  - Nếu Natri hiệu chỉnh thấp: Dùng NaCl 0.9% tốc độ 250 - 500 mL/h.\n• Khi Glucose máu giảm xuống < 11.1 - 13.9 mmol/L (200-250 mg/dL): Chuyển sang Glucose 5% + NaCl 0.45% để tránh hạ đường huyết và tiếp tục truyền Insulin.',
      },
      {
        order: 2,
        title: 'Kiểm tra và Bù Kali (BẮT BUỘC TRƯỚC KHI TRUYỀN INSULIN)',
        timeframe: 'Ngay khi có kết quả điện giải',
        text: '• Nếu $K^+ < 3.3\text{ mmol/L}$: HOÃN INSULIN. Bù Kali 20 - 30 mEq/h qua dịch truyền cho đến khi $K^+ > 3.3\text{ mmol/L}$.\n• Nếu $K^+ 3.3 - 5.2\text{ mmol/L}$: Pha 20 - 30 mEq Kali trong mỗi lít dịch truyền để duy trì $K^+$ từ 4.0 - 5.0 mmol/L.\n• Nếu $K^+ > 5.2\text{ mmol/L}$: Chưa bù Kali, kiểm tra lại mỗi 2 giờ.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Truyền Insulin Regular tĩnh mạch liên tục',
        timeframe: 'Sau khi đã bù dịch và K+ > 3.3',
        text: '• Liều truyền tĩnh mạch liên tục: 0.1 đơn vị/kg/giờ (không nhất thiết phải Bolus).\n• Đích giảm Glucose máu: Giảm 3 - 4 mmol/L/giờ (50 - 75 mg/dL/giờ).\n• Nếu sau 1 giờ Glucose không giảm đạt đích: Tăng liều Insulin gấp đôi.',
        isAlert: true,
      },
      {
        order: 4,
        title: 'Tiêu chuẩn khỏi DKA & Chuyển sang Insulin tiêm dưới da',
        timeframe: 'Khi hết toan máu',
        text: 'Tiêu chuẩn khỏi DKA: Glucose < 11.1 mmol/L VÀ có ít nhất 2 trong 3 tiêu chuẩn: $HCO_3^- \\ge 15\text{ mmol/L}$, $pH > 7.30$, Anion Gap bình thường ($\\le 12$).\nTiêm Insulin nền dưới da trước khi ngưng truyền Insulin TM 2 giờ.',
      },
    ],
    warnings: [
      'Không dùng Bicarbonate trừ khi $pH < 6.90$ (nếu dùng: 100 mmol $NaHCO_3$ pha trong 400ml nước cất + 20 mEq KCl truyền trong 2 giờ).',
    ],
    references: ['ADA Standards of Care in Diabetes (2024) — Hyperglycemic Crises'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-hyperkalemia',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Cấp Cứu Tăng Kali Máu Nặng (K+ ≥ 6.5 mmol/L hoặc có biến đổi ECG)',
    specialty: 'Nội tiết & Thận học',
    specialtyKey: 'endo',
    summary: 'Bảo vệ màng cơ tim tức thì, chuyển dịch Kali vào nội bào và thải trừ Kali ra khỏi cơ thể.',
    icdCodes: ['E87.5'],
    steps: [
      {
        order: 1,
        title: 'Ổn định màng tế bào cơ tim bằng Canxi tĩnh mạch',
        timeframe: 'Phút 0 - 3 (Ngay lập tức)',
        text: '• Calcium Gluconate 10%: Tiêm TM 10 mL (1 ống) trong 2 - 3 phút (hoặc Calcium Chloride 10% 10ml qua đường truyền trung tâm).\n• Tác dụng bảo vệ tim trong 1 - 3 phút, kéo dài 30 - 60 phút. Nếu sau 5 phút ECG chưa cải thiện, tiêm lặp lại liều thứ 2.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Chuyển Kali từ ngoại bào vào trong tế bào',
        timeframe: 'Phút 5 - 30',
        text: '• Insulin + Glucose: 10 đơn vị Insulin Regular pha trong 50 mL Glucose 20% (hoặc 25g Glucose 50%) tiêm/truyền TM trong 15 - 30 phút (hạ $K^+$ sau 15-30p, kéo dài 4-6h).\n• Khí dung Salbutamol: 10 - 20 mg khí dung trong 15 phút (gấp 4 lần liều hen).\n• Natri Bicarbonate 8.4%: 50 mL tiêm TM chậm (chỉ có hiệu quả khi bệnh nhân có toan chuyển hóa kèm theo).',
      },
      {
        order: 3,
        title: 'Đào thải Kali ra khỏi cơ thể',
        timeframe: 'Song song',
        text: '• Furosemide: 40 - 80 mg tiêm TM (nếu bệnh nhân còn chức năng thận và có thể tiểu được).\n• Nhựa trao đổi ion gắn Kali: Sodium Zirconium Cyclosilicate (Lokelma) 10g uống hoặc Patiromer 8.4g hoặc Kayexalate 15-30g uống.\n• LỌC MÁU CẤP CỨU (Chạy thận nhân tạo Hemodialysis): Phương pháp hiệu quả và triệt để nhất khi tăng Kali máu trơ, thiểu niệu/vô niệu hoặc suy thận nặng.',
        isAlert: true,
      },
    ],
    warnings: [
      'Canxi chỉ bảo vệ cơ tim, HOÀN TOÀN KHÔNG LÀM GIẢM NỒNG ĐỘ KALI MÁU, bắt buộc phải phối hợp các biện pháp hạ Kali.',
      'Thận trọng khi dùng Canxi ở bệnh nhân đang dùng Digoxin (truyền chậm trong 20-30 phút).',
    ],
    references: ['KDIGO Clinical Practice Guideline for Acute Kidney Injury & Electrolyte Disorders'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 6. THẦN KINH (NEUROLOGY)
  // ─────────────────────────────────────────────
  {
    id: 'master-acute-stroke',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Đột Quỵ Nhồi Máu Não Cấp (AHA/ASA Stroke Guidelines)',
    specialty: 'Thần kinh',
    specialtyKey: 'neuro',
    summary: 'Quy trình kích hoạt Code Stroke, tiêu sợi huyết đường tĩnh mạch trong cửa sổ 4.5 giờ và lấy huyết khối cơ học đến 24 giờ.',
    icdCodes: ['I63.9', 'I64'],
    steps: [
      {
        order: 1,
        title: 'Đánh giá thang điểm NIHSS & Chụp CT sọ não khẩn cấp',
        timeframe: 'Thời gian Cửa - CT (Door-to-CT) < 20 phút',
        text: 'Thực hiện ngay thang điểm NIHSS. Chụp CT sọ não không cản quang loại trừ xuất huyết não và đánh giá điểm ASPECTS. Kiểm tra đường huyết mao mạch ngay để loại trừ hạ đường huyết giả đột quỵ.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Thuốc tiêu sợi huyết tĩnh mạch (Alteplase / Tenecteplase)',
        timeframe: 'Cửa sổ < 4.5 giờ từ lúc khởi phát',
        text: 'Điều kiện: HA < 185/110 mmHg (dùng Nicardipine/Labetalol hạ áp nếu cao hơn) và không có chống chỉ định.\n• Alteplase (rtPA): Liều 0.9 mg/kg (tối đa 90 mg). Bolus tĩnh mạch 10% liều trong 1 phút, 90% còn lại truyền TM trong 60 phút.\n• Hoặc Tenecteplase: 0.25 mg/kg tiêm TM bolus 1 lần (tối đa 25 mg).',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Can thiệp lấy huyết khối cơ học bằng dụng cụ (EVT)',
        timeframe: 'Cửa sổ 6 - 24 giờ nếu tắc mạch lớn tuần hoàn trước',
        text: 'Chỉ định cho bệnh nhân tắc động mạch cảnh trong (ICA) hoặc đoạn M1 động mạch não giữa (MCA), điểm ASPECTS ≥ 6 (hoặc đánh giá vùng lõi/vùng tranh tối tranh sáng qua CT Perfusion / MRI Diffusion theo tiêu chuẩn DAWN/DEFUSE-3).',
      },
      {
        order: 4,
        title: 'Chăm sóc và Kiểm soát sau tiêu sợi huyết',
        timeframe: '24 giờ đầu',
        text: '• Duy trì HA < 180/105 mmHg trong 24h sau tiêu sợi huyết.\n• KHÔNG DÙNG thuốc chống đông hoặc chống kết tập tiểu cầu trong 24h đầu sau rtPA.\n• Chụp lại CT sọ não sau 24h trước khi bắt đầu dùng Aspirin 81-325 mg/ngày.',
      },
    ],
    warnings: [
      'Theo dõi sát tri giác và dấu hiệu thần kinh: Nếu bệnh nhân đau đầu dữ dội, nôn ói hoặc huyết áp tăng vọt, NGỪNG NGAY rtPA và chụp CT khẩn kiểm tra xuất huyết chuyển dạng.',
    ],
    references: ['2019 AHA/ASA Guidelines for the Early Management of Patients With Acute Ischemic Stroke'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },
  {
    id: 'master-status-epilepticus',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xử trí Trạng Thái Động Kinh (Status Epilepticus — AES Guidelines)',
    specialty: 'Thần kinh',
    specialtyKey: 'neuro',
    summary: 'Cắt cơn co giật liên tục kéo dài ≥ 5 phút theo 3 giai đoạn: Benzodiazepine ➔ Chống động kinh TM ➔ Gây mê hồi sức.',
    icdCodes: ['G41.9'],
    steps: [
      {
        order: 1,
        title: 'Giai đoạn 1: Benzodiazepine cắt cơn khẩn cấp',
        timeframe: 'Phút 0 - 5',
        text: 'Đảm bảo ABC, thở oxy. Chọn 1 trong các thuốc sau:\n• Diazepam: 10 mg tiêm TM chậm (trẻ em 0.2 - 0.3 mg/kg), có thể lặp lại liều thứ 2 sau 5 phút HOẶC\n• Midazolam: 10 mg tiêm bắp (cho người lớn > 40kg; 5mg cho 13-40kg) HOẶC\n• Lorazepam: 4 mg tiêm TM chậm trong 2 phút.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Giai đoạn 2: Thuốc chống động kinh truyền tĩnh mạch',
        timeframe: 'Phút 5 - 20 (Khi cơn giật kéo dài sau Benzodiazepine)',
        text: 'Chọn 1 trong các thuốc truyền tĩnh mạch:\n• Levetiracetam (Keppra): 60 mg/kg tiêm TM (tối đa 4500 mg) truyền trong 10 phút HOẶC\n• Sodium Valproate (Depakine): 40 mg/kg tiêm TM (tối đa 3000 mg) truyền trong 10 phút HOẶC\n• Phenytoin: 20 mg/kg truyền TM (tối đa 50 mg/phút, pha trong NaCl 0.9%).',
      },
      {
        order: 3,
        title: 'Giai đoạn 3: Trạng thái động kinh trơ (Gây mê hồi sức & Đặt nội khí quản)',
        timeframe: 'Phút 20 - 60',
        text: 'Nếu cơn co giật tiếp diễn sau bước 2: Đặt nội khí quản thở máy và gây mê bằng truyền liên tục:\n• Propofol: Bolus 1 - 2 mg/kg, sau đó truyền 2 - 10 mg/kg/h HOẶC\n• Midazolam: Bolus 0.2 mg/kg, sau đó truyền 0.05 - 2 mg/kg/h.\nTheo dõi điện não đồ liên tục (cEEG) hướng đến triệt tiêu sóng động kinh (Burst suppression).',
        isAlert: true,
      },
    ],
    warnings: [
      'Phenytoin tuyệt đối không pha trong dung dịch Glucose vì gây tủa; theo dõi sát tụt huyết áp và loạn nhịp tim khi truyền.',
      'Luôn kiểm tra và điều trị nguyên nhân: Hạ đường huyết (tiêm Glucose 30% + Thiamine 100mg), Viêm màng não, Xuất huyết não, Hạ Natri máu.',
    ],
    references: ['American Epilepsy Society (AES) Guideline for Status Epilepticus (2016 - 2023 Update)'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-16T00:00:00Z',
  },

  // ─────────────────────────────────────────────
  // 7. TIÊU HÓA - GAN MẬT (GASTROENTEROLOGY & HEPATOLOGY)
  // ─────────────────────────────────────────────
  {
    id: 'master-he-easl-2022',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Phác đồ Chẩn đoán & Xử trí Bệnh Não Gan (EASL 2022 / AASLD)',
    specialty: 'Tiêu hóa - Gan mật & Cấp cứu',
    specialtyKey: 'gi',
    summary: 'Quy trình toàn diện: Bảo vệ đường thở (GCS < 8), Xử trí 90% yếu tố thúc đẩy (SBP, XHTH, rối loạn điện giải, táo bón), Lactulose PO/PR duy trì 2-3 phân mềm/ngày, Phối hợp Rifaximin 550mg x 2 khi tái phát, LOLA truyền TM liều cao và Oral BCAA chống teo cơ.',
    icdCodes: ['K72.9', 'K72.7', 'K74'],
    steps: [
      {
        order: 1,
        title: 'Tiếp cận Khẩn cấp A-B-C & Bảo vệ Đường thở',
        timeframe: 'Phút 0 - 15 tiếp nhận',
        text: 'NẾU GCS < 8 hoặc West Haven Grade III-IV: Đặt nội khí quản cấp cứu bảo vệ đường thở tránh sặc phổi, đặt sonde dạ dày rửa máu nếu có XHTH, và thụt giữ trực tràng bằng Lactulose (300 mL Lactulose + 700 mL nước ấm).',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Xử trí Triệt để Yếu tố Thúc đẩy (90% Thành công)',
        timeframe: 'Giờ 1 - 6',
        text: '• Nhiễm trùng: Cấy máu/dịch báng + Ceftriaxone 1g/ngày.\n• TẠM NGỪNG NGAY LỢI TIỂU (Furosemide, Spironolactone), bù dịch NaCl 0.9% và chỉnh hạ Kali/Natri.\n• Ngừng ngay toàn bộ thuốc an thần, benzodiazepin.\n• Xuất huyết tiêu hóa: Dùng Terlipressin/Octreotide + EVL thắt búi giãn.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Liệu pháp Bậc 1: Disaccharide không hấp thu (Lactulose)',
        timeframe: 'Khởi động ngay',
        text: 'Lactulose uống 15 - 30 mL mỗi 1 - 2 giờ đến khi đi tiêu phân mềm; sau đó duy trì 15 - 30 mL x 2 - 3 lần/ngày để đạt mục tiêu 2 - 3 bãi phân mềm/ngày.',
      },
      {
        order: 4,
        title: 'Liệu pháp Bậc 2: Phối hợp Rifaximin & LOLA truyền TM',
        timeframe: 'Khi tái phát >= 1 lần trong 6 tháng hoặc kháng trị',
        text: '• Rifaximin 550 mg x 2 lần/ngày uống lâu dài cùng Lactulose (giảm 58% tái phát, giảm 40% tử vong).\n• Hôn mê sâu Grade III-IV: Phối hợp truyền TM L-Ornithine L-Aspartate (LOLA) 20 - 30 g/ngày pha 500 mL G5% truyền chậm trong 4 - 6 giờ (CHỐNG CHỈ ĐỊNH khi eGFR < 30 mL/phút).',
      },
      {
        order: 5,
        title: 'Dinh dưỡng Phục hồi Khối Cơ & Dự phòng sau TIPS',
        timeframe: 'Lâu dài',
        text: '• BẮT BUỘC duy trì lượng đạm 1.2 - 1.5 g/kg/ngày (CẤM kiêng đạm gây teo cơ sarcopenia).\n• Bổ sung Oral BCAA 0.2 - 0.25 g/kg/ngày kèm 1 bữa ăn phụ ban đêm (late-night snack).\n• Chuẩn bị đặt TIPS: Khởi trị Rifaximin dự phòng 14 ngày trước thủ thuật.',
      },
    ],
    warnings: [
      'CẤM TUYỆT ĐỐI kiêng đạm quá mức (< 0.8 g/kg/ngày) vì làm teo cơ vân - cơ quan duy nhất còn lại để thải amoniac ngoài gan, khiến HE kháng trị.',
      'KHÔNG ĐƯỢC ngừng Lactulose đột ngột khi thêm Rifaximin hoặc khi thấy bệnh nhân đã tỉnh táo.',
      'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI LOLA khi suy thận nặng (eGFR < 30 mL/phút hoặc Creatinine > 1.5 mg/dL).',
      'Tránh lạm dụng Lactulose gây tiêu chảy quá mức (> 4-5 lần/ngày) gây mất nước, hạ Kali và kiềm chuyển hóa thúc đẩy HE nặng thêm.',
    ],
    references: [
      'EASL Clinical Practice Guidelines on the management of hepatic encephalopathy (2022)',
      'AASLD Practice Guideline: Hepatic Encephalopathy in Chronic Liver Disease (2024 Update)',
    ],
    createdAt: '2026-08-22T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z',
  },
  {
    id: 'master-ugib-baveno-vii',
    doctorId: 'SYSTEM_MASTER',
    isSystemMaster: true,
    title: 'Xử trí Xuất Huyết Tiêu Hóa do Vỡ Giãn TMTQ (Baveno VII / QĐ 3010/BYT)',
    specialty: 'Tiêu hóa - Gan mật & Cấp cứu',
    specialtyKey: 'gi',
    summary: 'Bộ 4 can thiệp: Đích Hb 7-8 g/dL, Terlipressin 2mg q4h sớm, Ceftriaxone 1g/ngày x 7 ngày, Nội soi thắt vòng cao su EVL trong 12h.',
    icdCodes: ['I85.0', 'K92.2', 'K74'],
    steps: [
      {
        order: 1,
        title: 'Hồi sức Huyết động & Đích Hb 7 - 8 g/dL',
        timeframe: 'Phút 0 - 15',
        text: 'Nằm đầu thấp nghiêng một bên hoặc đặt NKQ bảo vệ đường thở nếu nôn máu ồ ạt/GCS < 8. Truyền hồng cầu lắng duy trì Hb 7 - 8 g/dL. TUYỆT ĐỐI TRÁNH truyền máu quá mức làm tăng áp lực tĩnh mạch cửa.',
        isAlert: true,
      },
      {
        order: 2,
        title: 'Thuốc Co mạch tạng & Kháng sinh dự phòng sớm',
        timeframe: 'Ngay khi tiếp nhận',
        text: '• Terlipressin 2mg tiêm TM mỗi 4h trong 48h đầu (sau đó giảm 1mg q4h duy trì 2-5 ngày) HOẶC Octreotide 50mcg bolus ➔ truyền 50mcg/h.\n• Ceftriaxone 1g IV mỗi 24h trong 7 ngày.',
        isAlert: true,
      },
      {
        order: 3,
        title: 'Nội soi Can thiệp Thắt vòng cao su (EVL)',
        timeframe: 'Trong vòng 12 giờ',
        text: 'Nội soi thực quản dạ dày thắt vòng cao su búi giãn (EVL). Nếu giãn phình vị dạ dày: Tiêm xơ mô sinh học Histoacryl.',
      },
      {
        order: 4,
        title: 'Dự phòng Tái phát Thứ phát',
        timeframe: 'Từ ngày thứ 5 trở đi',
        text: 'Phối hợp EVL định kỳ mỗi 2 - 4 tuần cho đến khi triệt tiêu búi giãn + Thuốc chẹn Beta không chọn lọc (Carvedilol 6.25 - 12.5 mg/ngày hoặc Propranolol).',
      },
    ],
    warnings: [
      'CẤM dùng Chẹn Beta liều cao trong đợt xuất huyết cấp tính hoặc khi có hạ HA/suy thận cấp.',
      'KHÔNG truyền huyết tương tươi đông lạnh (FFP) thường quy để chỉnh INR trong xơ gan.',
    ],
    references: ['Baveno VII Consensus (2022)', 'Quyết định 3010/QĐ-BYT Bộ Y Tế Việt Nam'],
    createdAt: '2026-08-22T00:00:00Z',
    updatedAt: '2026-08-22T00:00:00Z',
  },
];
