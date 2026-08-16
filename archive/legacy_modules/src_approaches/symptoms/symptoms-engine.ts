/**
 * CliniPortal — Clinical Symptom Differential & Red Flags Engine (TypeScript)
 * Path: src/content/approaches/symptoms/symptoms-engine.ts
 */

export interface SymptomApproachData {
  id: string;
  name: string;
  category: 'cardiorespiratory' | 'gastro' | 'systemic' | 'neuro';
  icon: string;
  redFlags: string[];
  immediateActions: string[];
  differentialCategories: {
    groupName: string;
    conditions: {
      name: string;
      hallmark: string;
      investigation: string;
    }[];
  }[];
  clinicalPearls: string[];
}

export const SYMPTOMS_APPROACH_DATA: Record<string, SymptomApproachData> = {
  'daunguc': {
    id: 'daunguc',
    name: 'Tiếp cận Đau Ngực Cấp (Acute Chest Pain)',
    category: 'cardiorespiratory',
    icon: '💔',
    redFlags: [
      'Đau ngực xé lan sau lưng (Nghi ngờ Bóc tách động mạch chủ)',
      'Đau ngực kèm tụt huyết áp, vã mồ hôi, khó thở nặng, ngất',
      'Đau ngực kiểu màng phổi khởi phát đột ngột kèm ho ra máu, SpO2 giảm (Thuyên tắc phổi)',
      'Mạch nghịch (Pulsus paradoxus) hoặc tĩnh mạch cổ nổi (Chèn ép tim cấp)'
    ],
    immediateActions: [
      'Mắc Monitor theo dõi sinh hiệu, đo ECG 12 chuyển đạo trong 10 phút đầu',
      'Lập 2 đường truyền tĩnh mạch lớn, thở Oxy nếu SpO2 < 90%',
      'Xét nghiệm khẩn cấp: Troponin siêu nhạy (hs-cTnI/T), D-Dimer, Khí máu động mạch',
      'Chụp X-quang ngực thẳng tại giường (CXR)'
    ],
    differentialCategories: [
      {
        groupName: '6 Nguyên Nhân Nguy Hiểm Đe Dọa Tính Mạng (Big 6 Killers)',
        conditions: [
          { name: 'Hội chứng mạch vành cấp (ACS)', hallmark: 'Đau bóp nghẹt sau xương ức > 20 phút, lan tay trái/hàm, vã mồ hôi', investigation: 'ECG 12 CĐ + hs-Troponin 0h/1h' },
          { name: 'Bóc tách ĐM chủ ngực (Aortic Dissection)', hallmark: 'Đau xé dữ dội đột ngột lan sau lưng, chênh lệch HA 2 tay > 20mmHg', investigation: 'CT-Angio toàn bộ ĐM chủ ngực-bụng' },
          { name: 'Thuyên tắc phổi cấp (Pulmonary Embolism)', hallmark: 'Khó thở đột ngột, đau ngực màng phổi, nhịp nhanh, tiền sử DVT', investigation: 'Điểm Wells + D-Dimer + CTPA' },
          { name: 'Tràn khí màng phổi áp lực (Tension Pneumothorax)', hallmark: 'Mất rì rào phế nang một bên, lồng ngực vồng, tụt HA, lệch khí quản', investigation: 'Chọc kim giải áp khoang LS 2 đường trung đòn' },
          { name: 'Chèn ép tim cấp (Cardiac Tamponade)', hallmark: 'Tam chứng Beck: HA tụt, Tĩnh mạch cổ nổi, Tiếng tim mờ xa xăm', investigation: 'Siêu âm tim POCUS tại giường' },
          { name: 'Vỡ thực quản (Boerhaave Syndrome)', hallmark: 'Đau sau nôn ói dữ dội, tràn khí dưới da vùng cổ, tràn dịch màng phổi', investigation: 'CT ngực có uống thuốc cản quang tan trong nước' }
        ]
      },
      {
        groupName: 'Các Nguyên Nhân Thường Gặp Khác',
        conditions: [
          { name: 'Viêm màng ngoài tim cấp', hallmark: 'Đau tăng khi hít sâu/nằm ngửa, giảm khi ngồi cúi ra trước, tiếng cọ màng tim', investigation: 'ECG ST chênh lên lan tỏa lõm + PR chênh xuống' },
          { name: 'Trào ngược dạ dày thực quản (GERD)', hallmark: 'Ợ nóng, đau sau xương ức liên quan bữa ăn hoặc nằm, giảm khi dùng Antacid', investigation: 'Nội soi dạ dày, Test PPI' },
          { name: 'Đau thành ngực / Viêm sụn sườn (Tietze)', hallmark: 'Đau nhói khu trú, ấn chói tại các khớp ức sườn', investigation: 'Khám thực thể thành ngực' }
        ]
      }
    ],
    clinicalPearls: [
      'Phụ nữ, người già và bệnh nhân đái tháo đường thường có biểu hiện ACS không điển hình (khó thở, mệt lả, tụt HA không đau ngực).',
      'Bình thường trên ECG không loại trừ được ACS! Luôn lặp lại ECG và hs-Troponin sau 1-3 giờ.'
    ]
  },
  'khotho': {
    id: 'khotho',
    name: 'Tiếp cận Khó Thở Cấp (Acute Dyspnea)',
    category: 'cardiorespiratory',
    icon: '🫁',
    redFlags: [
      'Thở rít thì hít vào (Stridor) - Dấu hiệu tắc nghẽn đường thở trên',
      'Co kéo cơ hô hấp phụ, thở ngực bụng nghịch thường',
      'Lú lẫn, ngủ gà, toát mồ hôi do tăng CO2 máu (CO2 narcosis)',
      'Huyết động không ổn định (Mạch > 130, HA < 90 hoặc > 200 mmHg)'
    ],
    immediateActions: [
      'Cung cấp oxy duy trì SpO2 92-96% (hoặc 88-92% ở bệnh nhân COPD có nguy cơ giữ CO2)',
      'Đánh giá nhanh bằng Siêu âm POCUS theo phác đồ BLUE Protocol',
      'Khí máu động mạch (ABG), NT-proBNP / BNP, ECG và X-quang phổi tại giường'
    ],
    differentialCategories: [
      {
        groupName: 'Tiếp Cận Theo Phác Đồ 4 Cơ Chế (The 4 Ps)',
        conditions: [
          { name: 'Phù phổi cấp huyết động (Pump failure / Cardiogenic Pulmonary Edema)', hallmark: 'Khó thở kịch phát về đêm, ran ẩm dâng như nước thủy triều, khạc bọt hồng', investigation: 'BNP/NT-proBNP, POCUS tìm B-lines dày đặc' },
          { name: 'Viêm phổi / ARDS (Parenchyma)', hallmark: 'Sốt, ho có đàm, ran nổ khu trú hoặc thâm nhiễm phổi 2 phế trường', investigation: 'CXR, Công thức máu, Procalcitonin' },
          { name: 'Tràn khí màng phổi / Đợt cấp Hen/COPD (Pneumothorax / Pipe)', hallmark: 'Rì rào phế nang giảm, ran rít ran ngáy lan tỏa hoặc lồng ngực căng phồng', investigation: 'BLUE protocol Lung Sliding, Khí dung Salbutamol' },
          { name: 'Thuyên tắc phổi (Pulmonary Embolism)', hallmark: 'Phổi nghe sạch nhưng giảm oxy máu kháng trị, nhịp tim nhanh', investigation: 'D-Dimer, Siêu âm Doppler tĩnh mạch chi dưới' }
        ]
      }
    ],
    clinicalPearls: [
      'BLUE Protocol trong POCUS phổi cho phép định hướng nguyên nhân khó thở cấp trong vòng dưới 3 phút với độ chính xác > 90%.'
    ]
  },
  'daubung': {
    id: 'daubung',
    name: 'Tiếp cận Đau Bụng Cấp (Acute Abdomen)',
    category: 'gastro',
    icon: '🤢',
    redFlags: [
      'Bụng cứng như gỗ, đề kháng thành bụng lan tỏa (Cảm ứng phúc mạc)',
      'Đau bụng kèm tụt huyết áp hoặc sốc (Vỡ tạng rỗng, Vỡ phình ĐM chủ bụng, Thai ngoài tử cung vỡ)',
      'Bí trung đại tiện kèm nôn mửa liên tục và bụng chướng (Tắc ruột)',
      'Đau bụng dữ dội không tương xứng với triệu chứng thực thể (Thiếu máu mạc treo)'
    ],
    immediateActions: [
      'Nhịn ăn uống hoàn toàn (NPO) để chuẩn bị phẫu thuật cấp cứu nếu cần',
      'Bù dịch đẳng trương NaCl 0.9% hoặc Ringer Lactate qua 2 đường truyền lớn',
      'Làm ngay Quick Test: Que thử thai (hCG) ở tất cả phụ nữ tuổi sinh đẻ',
      'Chụp X-quang bụng không sửa soạn / Siêu âm bụng / CT Scan bụng cản quang'
    ],
    differentialCategories: [
      {
        groupName: 'Theo Vị Trí Giải Phẫu Bụng',
        conditions: [
          { name: 'Hạ sườn phải (RUQ)', hallmark: 'Dấu hiệu Murphy (+), sốt, vàng da trong Viêm túi mật cấp / Viêm đường mật', investigation: 'Siêu âm gan mật' },
          { name: 'Hố chậu phải (RLQ)', hallmark: 'Điểm McBurney (+), dấu Rovsing, sốt nhẹ trong Viêm ruột thừa cấp', investigation: 'Siêu âm / CT bụng' },
          { name: 'Thượng vị (Epigastric)', hallmark: 'Đau lan sau lưng, buồn nôn trong Viêm tụy cấp / Thủng ổ loét DD-TT', investigation: 'Lipase máu tăng > 3 lần, X-quang tìm liềm hơi' },
          { name: 'Hố chậu trái (LLQ)', hallmark: 'Sốt, rối loạn phân trong Viêm túi thừa đại tràng Sigma', investigation: 'CT bụng có cản quang' }
        ]
      }
    ],
    clinicalPearls: [
      'Ở bệnh nhân cao tuổi có rung nhĩ hoặc xơ vữa mạch, đau bụng dữ dội liên tục nhưng bụng mềm là dấu hiệu kinh điển của Thiếu máu mạc treo cấp (Acute Mesenteric Ischemia).'
    ]
  },
  'sot': {
    id: 'sot',
    name: 'Tiếp cận Sốt Cấp & Sốt Kéo Dài (Fever & FUO)',
    category: 'systemic',
    icon: '🌡️',
    redFlags: [
      'Sốt kèm cứng cổ, dấu Kernig/Brudzinski (+), ban xuất huyết hoại tử hình sao (Viêm màng não mô cầu)',
      'Sốt kèm tụt huyết áp, thiểu niệu, thở nhanh > 22 l/p (Sốc nhiễm khuẩn / Sepsis)',
      'Sốt ở bệnh nhân suy giảm miễn dịch nặng (Bạch cầu hạt < 500/µL hoặc ghép tạng)',
      'Sốt kèm rối loạn tri giác, co giật hoặc dấu thần kinh định vị'
    ],
    immediateActions: [
      'Đánh giá tiêu chuẩn qSOFA / SOFA ngay tại giường',
      'Cấy máu 2 vị trí khác nhau trước khi dùng kháng sinh',
      'Hạ sốt Paracetamol 10-15 mg/kg kết hợp lau mát nước ấm',
      'Kháng sinh phổ rộng đường tĩnh mạch trong vòng 1 giờ đầu nếu nghi ngờ Sepsis'
    ],
    differentialCategories: [
      {
        groupName: 'Sốt Cấp Tính Theo Ổ Nhiễm Khuẩn (Fever with Localizing Signs)',
        conditions: [
          { name: 'Hô hấp (Viêm phổi, Áp xe phổi)', hallmark: 'Ho có đàm, đau ngực màng phổi, ran nổ', investigation: 'X-quang ngực, Công thức máu, Procalcitonin' },
          { name: 'Thần kinh trung ương (Viêm màng não / Não)', hallmark: 'Đau đầu dữ dội, nôn vọt, cổ gượng, lơ mơ', investigation: 'Chọc dò tủy sống (CSF) khẩn cấp' },
          { name: 'Tiết niệu (Viêm đài bể thận cấp)', hallmark: 'Sốt cao rét run, rung thận (+), tiểu buốt rắt', investigation: 'Tổng phân tích nước tiểu, Cấy nước tiểu, Siêu âm hệ niệu' },
          { name: 'Gan mật - Ổ bụng (Viêm đường mật, Áp xe gan)', hallmark: 'Tam chứng Charcot (Đau - Sốt - Vàng da), rung gan (+)', investigation: 'Siêu âm bụng, Men gan, Bilirubin' }
        ]
      },
      {
        groupName: 'Sốt Chưa Rõ Nguyên Nhân (FUO — Sốt > 3 tuần, > 38.3°C, vào viện 3 ngày chưa rõ)',
        conditions: [
          { name: 'Nhiễm trùng ẩn (Lao ngoài phổi, Viêm nội tâm mạc IE, Áp xe sâu)', hallmark: 'Tiếng thổi tim mới, sụt cân, sốt về chiều', investigation: 'Cấy máu 3 lần, Siêu âm tim qua thực quản TEE, PCR Lao (GeneXpert)' },
          { name: 'Bệnh lý ác tính (Lymphoma, Bạch cầu cấp, Ung thư biểu mô)', hallmark: 'Hạch to toàn thân, gan lách to, đổ mồ hôi đêm', investigation: 'Sinh thiết hạch, CT Scan ngực-bụng-chậu' },
          { name: 'Bệnh tự miễn (Lupus SLE, Viêm khớp dạng thấp, Still người lớn)', hallmark: 'Ban cánh bướm, đau nhiều khớp, ferritin tăng vọt', investigation: 'ANA, Anti-dsDNA, Ferritin' }
        ]
      }
    ],
    clinicalPearls: [
      'Ở bệnh nhân sốt cao rét run từng cơn, luôn làm lam máu tìm ký sinh trùng sốt rét (Plasmodium) nếu có tiền sử đi vào vùng dịch tễ.'
    ]
  },
  'ngat': {
    id: 'ngat',
    name: 'Tiếp cận Ngất (Syncope Assessment)',
    category: 'neuro',
    icon: '⚡',
    redFlags: [
      'Ngất khi đang gắng sức thể lực hoặc khi đang nằm ngửa',
      'Ngất kèm đau ngực, khó thở hoặc đánh trống ngực trước ngất',
      'Tiền sử gia đình có người đột tử ở tuổi trẻ (< 40 tuổi)',
      'Bất thường trên ECG: QT dài, Brugada, WPW, Block AV độ 2 Mobitz II hoặc độ 3'
    ],
    immediateActions: [
      'Đo ECG 12 chuyển đạo ngay lập tức tại phòng cấp cứu',
      'Đo Huyết áp tư thế (Nằm và Đứng sau 1 và 3 phút)',
      'Đánh giá thang điểm San Francisco Syncope Rule (CHESS Criteria)',
      'Xét nghiệm Troponin, Khí máu động mạch và Siêu âm tim tại giường nếu nghi ngờ ngất do tim'
    ],
    differentialCategories: [
      {
        groupName: '3 Nhóm Nguyên Nhân Ngất Chính',
        conditions: [
          { name: 'Ngất do Phản xạ Thần kinh (Vasovagal / Tình huống)', hallmark: 'Có tiền triệu (hoa mắt, vã mồ hôi, buồn nôn), sau đứng lâu, sợ hãi, ho, tiểu tiện', investigation: 'Lâm sàng điển hình, không cần CLS phức tạp' },
          { name: 'Ngất do Hạ huyết áp tư thế (Orthostatic Hypotension)', hallmark: 'Xuất hiện khi thay đổi từ nằm/ngồi sang đứng, HA tâm thu giảm ≥ 20 mmHg', investigation: 'Đo HA tư thế, đánh giá tình trạng thiếu dịch / Thuốc hạ áp' },
          { name: 'Ngất do Tim mạch (Cardiac Syncope - Nguy hiểm nhất!)', hallmark: 'Đột ngột không tiền triệu, ngất khi gắng sức, tiền sử bệnh tim thực thể', investigation: 'Holter ECG 24-48h, Siêu âm tim qua thành ngực, Chụp ĐMV' }
        ]
      }
    ],
    clinicalPearls: [
      'Ngất do tim có tỷ lệ tử vong trong 1 năm lên đến 20-30% nếu không được chẩn đoán và cấy máy tạo nhịp / ICD kịp thời.'
    ]
  },
  'phu': {
    id: 'phu',
    name: 'Tiếp cận Phù Toàn Thân & Khu Trú (Edema)',
    category: 'systemic',
    icon: '💧',
    redFlags: [
      'Phù một bên chân đột ngột kèm đau bắp chân (Nghi ngờ DVT)',
      'Phù toàn thân tiến triển nhanh kèm khó thở khi nằm, ran ẩm phổi (Suy tim ứ huyết)',
      'Phù mặt và thanh quản kèm khó thở, thở rít (Phù mạch dị ứng / Phản vệ)'
    ],
    immediateActions: [
      'Khám thực thể: Phù ấn lõm vs Phù không ấn lõm (Phù niêm suy giáp / Tắc bạch mạch)',
      'Xét nghiệm: Tổng phân tích nước tiểu (Protein niệu), Albumin/Protein máu, Creatinine, Men gan',
      'Siêu âm tim và Siêu âm Doppler mạch máu chi dưới'
    ],
    differentialCategories: [
      {
        groupName: '4 Cơ Chế Phù Toàn Thân Lớn',
        conditions: [
          { name: 'Tăng áp lực thủy tĩnh (Suy tim sung huyết)', hallmark: 'Tĩnh mạch cổ nổi, phản hồi gan TMC (+), phù 2 chân tăng về chiều', investigation: 'NT-proBNP, Siêu âm tim EF' },
          { name: 'Giảm áp lực keo (Hội chứng thận hư, Xơ gan, Suy dinh dưỡng)', hallmark: 'Phù toàn thân, phù mi mắt buổi sáng, tràn dịch đa màng, Albumin < 25 g/L', investigation: 'Định lượng Protein niệu 24h, Albumin máu' },
          { name: 'Tăng tính thấm thành mạch (Dị ứng, Viêm mô tế bào, Nhiễm trùng)', hallmark: 'Sưng nóng đỏ đau tại chỗ hoặc phù mạch dị ứng', investigation: 'IgE, Công thức máu' },
          { name: 'Tắc nghẽn bạch huyết / Phù niêm (Lymphedema / Myxedema)', hallmark: 'Phù cứng không ấn lõm, da sần vỏ cam (dấu Stemmer (+))', investigation: 'TSH, FT4, Siêu âm mạch bạch huyết' }
        ]
      }
    ],
    clinicalPearls: [
      'Phù mềm ấn lõm đối xứng 2 chân ở người trẻ tuổi có bọt trong nước tiểu gợi ý mạnh mẽ Hội chứng thận hư (Nephrotic Syndrome).'
    ]
  }
};

