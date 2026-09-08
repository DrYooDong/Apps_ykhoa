export interface GlossaryTerm {
  id: string;
  term: string;
  symbol?: string;
  fullName: string;
  category: 'Chỉ số cơ bản' | 'Công thức & Tỷ số' | 'Sinh lý học' | 'Bảng mã lâm sàng' | 'Kỹ thuật xét nghiệm';
  normalRange?: string;
  unit?: string;
  definition: string;
  clinicalSignificance: string;
  pearlsAndWarnings?: string;
  tags: string[];
}

export const ABG_GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'ph',
    term: 'pH',
    fullName: 'Potential of Hydrogen - Thang đo độ toan kiềm máu động mạch',
    category: 'Chỉ số cơ bản',
    normalRange: '7.35 – 7.45 (Chuẩn sinh lý tối ưu: 7.40)',
    definition:
      'Logarit thập phân âm của nồng độ ion hydro tự do trong huyết tương: pH = -log[H⁺]. Phản ánh độ toan (acidaemia khi pH < 7.35) hoặc độ kiềm (alkalaemia khi pH > 7.45) của máu toàn phần.',
    clinicalSignificance:
      'pH quyết định cấu hình không gian bậc 3 của mọi enzym và protein trong cơ thể, ảnh hưởng trực tiếp đến khả năng co bóp cơ tim và tính thấm màng tế bào. pH < 7.20 hoặc > 7.60 là tình trạng đe dọa tính mạng cấp cứu.',
    pearlsAndWarnings:
      'pH bình thường (7.35 – 7.45) KHÔNG đồng nghĩa với việc không có bệnh lý toan kiềm! Bệnh nhân có thể có rối loạn toan kiềm đã được bù trừ hoàn toàn, hoặc rối loạn hỗn hợp đối kháng (ví dụ toan chuyển hóa nặng phối hợp kiềm hô hấp).',
    tags: ['pH', 'acidaemia', 'alkalaemia', 'H+']
  },
  {
    id: 'paco2',
    term: 'PaCO₂ (hoặc pCO₂)',
    fullName: 'Partial Pressure of Arterial Carbon Dioxide - Phân áp khí CO₂ trong máu động mạch',
    category: 'Chỉ số cơ bản',
    normalRange: '35 – 45 mmHg (hoặc 4.7 – 6.0 kPa)',
    definition:
      'Phân áp phần khí CO₂ hòa tan trong huyết tương động mạch. Phản ánh trực tiếp hiệu quả của thông khí phế nang (Alveolar ventilation). CO₂ là một acid bay hơi vì kết hợp với nước tạo H₂CO₃.',
    clinicalSignificance:
      'PaCO₂ > 45 mmHg biểu thị giảm thông khí phế nang (Alveolar Hypoventilation), dẫn đến toan hô hấp hoặc suy hô hấp Type 2. PaCO₂ < 35 mmHg biểu thị tăng thông khí phế nang (Hyperventilation), dẫn đến kiềm hô hấp.',
    pearlsAndWarnings:
      'Quy đổi nhanh giữa 2 hệ đơn vị: 1 kPa ≈ 7.5 mmHg (hoặc lấy giá trị kPa nhân 7.5). Ở bệnh nhân COPD mạn tính, tăng PaCO₂ từ từ được thận bù trừ bằng cách giữ lại HCO₃⁻.',
    tags: ['pCO2', 'PaCO2', 'acid bay hơi', 'suy hô hấp type 2']
  },
  {
    id: 'pao2',
    term: 'PaO₂ (hoặc pO₂)',
    fullName: 'Partial Pressure of Arterial Oxygen - Phân áp khí Oxy trong máu động mạch',
    category: 'Chỉ số cơ bản',
    normalRange: '80 – 100 mmHg (hoặc 11.0 – 14.0 kPa) khi thở khí trời ở người trẻ',
    definition:
      'Áp lực riêng phần của phân tử oxy hòa tan tự do trong huyết tương (chỉ chiếm ~1.5 - 2% tổng lượng O₂ trong máu, phần còn lại gắn với Hemoglobin). Phản ánh khả năng khuếch tán oxy qua màng phế nang - mao mạch.',
    clinicalSignificance:
      'PaO₂ < 60 mmHg (8 kPa) trên khí trời xác định tình trạng suy hô hấp cấp (Respiratory Failure) và bắt đầu rơi vào đoạn dốc đứng của đường cong phân ly Oxyhemoglobin. Cần can thiệp liệu pháp oxy khẩn cấp.',
    pearlsAndWarnings:
      'PaO₂ bình thường giảm dần theo tuổi: PaO₂ kỳ vọng (mmHg) ≈ 100 - (Tuổi / 3). Đánh giá PaO₂ luôn bắt buộc phải gắn liền với nồng độ oxy hít vào (FiO₂). Không bao giờ có giá trị PaO₂ bình thường đơn lẻ mà không biết FiO₂!',
    tags: ['pO2', 'PaO2', 'suy hô hấp type 1', 'oxy hóa máu']
  },
  {
    id: 'hco3',
    term: 'HCO₃⁻ (Bicarbonate)',
    fullName: 'Standard / Actual Bicarbonate - Nồng độ Ion Bicarbonate huyết tương',
    category: 'Chỉ số cơ bản',
    normalRange: '22 – 26 mmol/L (hoặc mEq/L)',
    definition:
      'Thành phần bazơ quan trọng nhất trong hệ đệm ngoại bào của cơ thể, chịu sự điều hòa chậm của thận (qua tái hấp thu ở ống lượn gần và bài tiết H⁺ ở ống lượn xa).',
    clinicalSignificance:
      'HCO₃⁻ < 22 mmol/L biểu thị toan chuyển hóa hoặc đáp ứng bù trừ của thận trong kiềm hô hấp mạn. HCO₃⁻ > 26 mmol/L biểu thị kiềm chuyển hóa hoặc đáp ứng bù trừ của thận trong toan hô hấp mạn.',
    pearlsAndWarnings:
      'Thận cần thời gian từ 24 đến 72 giờ để điều chỉnh nồng độ HCO₃⁻ trong máu. Do đó trong toan hô hấp cấp (mới xảy ra vài phút đến vài giờ), HCO₃⁻ gần như chưa kịp thay đổi!',
    tags: ['HCO3', 'Bicarbonate', 'đệm thận', 'toan chuyển hóa']
  },
  {
    id: 'be',
    term: 'BE (Base Excess / SBE)',
    fullName: 'Standard Base Excess - Kiềm dư chuẩn hóa',
    category: 'Chỉ số cơ bản',
    normalRange: '-2 đến +2 mmol/L (mở rộng -3 đến +3 mmol/L)',
    definition:
      'Lượng acid hoặc kiềm mạnh (tính bằng mmol/L) cần thêm vào để đưa 1 lít máu toàn phần về pH chuẩn 7.40 ở điều kiện PaCO₂ = 40 mmHg và nhiệt độ 37°C.',
    clinicalSignificance:
      'BE âm tính (< -2 đến -3 mmol/L, còn gọi là Base Deficit): Thâm hụt kiềm, biểu thị toan chuyển hóa. BE dương tính (> +2 đến +3 mmol/L): Thừa kiềm, biểu thị kiềm chuyển hóa.',
    pearlsAndWarnings:
      'Standard Base Excess (SBE) có ưu điểm vượt trội hơn HCO₃⁻ thực tế vì SBE đã được chuẩn hóa về PaCO₂ = 40 mmHg, loại trừ được hoàn toàn ảnh hưởng của thay đổi hô hấp cấp tính lên nồng độ kiềm.',
    tags: ['BE', 'Base Excess', 'Base Deficit', 'thâm hụt kiềm']
  },
  {
    id: 'sao2',
    term: 'SaO₂ (Arterial O₂ Saturation)',
    fullName: 'Arterial Oxygen Saturation - Độ bão hòa Oxy của Hemoglobin máu động mạch',
    category: 'Chỉ số cơ bản',
    normalRange: '95% – 98% (trên khí trời ở người khỏe mạnh)',
    definition:
      'Tỷ lệ phần trăm các vị trí gắn oxy trên phân tử Hemoglobin trong máu động mạch đang được gắn kết với oxy: SaO₂ = [HbO₂] / [Tổng Hb có khả năng gắn kết] × 100%.',
    clinicalSignificance:
      'Quyết định trực tiếp đến tổng dung tích mang oxy của máu (CaO₂). Khi SaO₂ tụt dưới 90%, tương ứng PaO₂ tụt dưới 60 mmHg, mô cơ thể rơi vào tình trạng thiếu oxy nghiêm trọng.',
    pearlsAndWarnings:
      'Khác biệt giữa SaO₂ (đo trực tiếp bằng máy phân tích khí máu qua co-oximetry) và SpO₂ (đo gián tiếp qua đầu dò kẹp mạch nảy quang học). Trong ngộ độc CO (Carbon Monoxide), máy đo SpO₂ thông thường bị đánh lừa và báo 99-100% giả tạo!',
    tags: ['SaO2', 'SpO2', 'bão hòa oxy', 'co-oximetry']
  },
  {
    id: 'fio2',
    term: 'FiO₂',
    fullName: 'Fraction of Inspired Oxygen - Phân suất Oxy trong khí hít vào',
    category: 'Chỉ số cơ bản',
    normalRange: '0.21 (21%) trong không khí phòng tự nhiên',
    definition:
      'Tỷ lệ phần trăm oxy trong hỗn hợp khí mà bệnh nhân hít vào phổi. Khi thở oxy liệu pháp, FiO₂ dao động từ 24% (gọng mũi 1 L/phút) đến 100% (mask không thở lại có bóng dự trữ hoặc máy thở).',
    clinicalSignificance:
      'Là biến số bắt buộc phải ghi nhận chính xác tại thời điểm chọc khí máu để tính toán P/F ratio, PaO₂ kỳ vọng và A-a gradient.',
    pearlsAndWarnings:
      'Quy tắc ước tính nhanh khi thở oxy gọng mũi (Nasal Cannula): FiO₂ ≈ 21% + (Lưu lượng lít/phút × 4). Ví dụ 2 L/phút ≈ 29%; 4 L/phút ≈ 37%. Với Mask túi có van một chiều (Non-rebreather mask 12-15 L/phút), FiO₂ đạt xấp xỉ 85-95%.',
    tags: ['FiO2', 'nồng độ oxy', 'gọng mũi', 'mask thở']
  },
  {
    id: 'anion-gap',
    term: 'Anion Gap (AG)',
    fullName: 'Serum Anion Gap - Khoảng trống Anion huyết tương',
    category: 'Công thức & Tỷ số',
    normalRange: '8 – 16 mEq/L (hoặc 12 ± 4 khi không tính K⁺)',
    definition:
      'Chênh lệch nồng độ giữa các cation đo lường được và anion đo lường được trong huyết tương: AG = Na⁺ - (Cl⁻ + HCO₃⁻), hoặc AG = (Na⁺ + K⁺) - (Cl⁻ + HCO₃⁻). Thể hiện nồng độ các anion không đo lường được (albumin, phosphate, sulfate, lactate, ketoacids).',
    clinicalSignificance:
      'Dùng để phân loại toan chuyển hóa: Toan tăng AG (> 16-18) do có thêm acid cố định bất thường (DKA, Lactic, suy thận, ngộ độc cồn độc) vs Toan AG bình thường do mất HCO₃⁻ bù bằng Cl⁻.',
    pearlsAndWarnings:
      'Albumin là nguồn anion không đo lường lớn nhất (~75% giá trị AG bình thường). Khi bệnh nhân nặng bị giảm Albumin máu, AG thực tế sẽ bị tụt xuống giả tạo! Phải hiệu chỉnh AG theo công thức Figge.',
    tags: ['Anion Gap', 'AG', 'toan chuyển hóa', 'GOLDMARK', 'HARDUPS']
  },
  {
    id: 'albumin-corrected-ag',
    term: 'Albumin-corrected AG',
    fullName: 'Hiệu chỉnh Anion Gap theo nồng độ Albumin huyết tương (Công thức Figge)',
    category: 'Công thức & Tỷ số',
    normalRange: 'Khoảng tham chiếu tương tự AG (8 – 16 mEq/L)',
    definition:
      'Công thức hiệu chỉnh: AG hiệu chỉnh = AG tính toán + 2.5 × [4.0 - Albumin (g/dL)] (hoặc + 0.25 × [40 - Albumin g/L]).',
    clinicalSignificance:
      'Ở bệnh nhân hồi sức ICU có tình trạng suy dinh dưỡng, bỏng, sốc nhiễm khuẩn gây giảm nặng Albumin (ví dụ Albumin = 2.0 g/dL), AG đo được có thể bình thường nhưng thực chất là Toan TĂNG Anion Gap nghiêm trọng bị che giấu!',
    pearlsAndWarnings:
      'Mỗi khi Albumin huyết thanh giảm 1.0 g/dL (10 g/L), giá trị Anion Gap tính toán sẽ giảm đi khoảng 2.5 mEq/L.',
    tags: ['Albumin', 'Figge', 'AG hiệu chỉnh', 'ICU']
  },
  {
    id: 'delta-gap',
    term: 'Delta Ratio (ΔAG / ΔHCO₃⁻)',
    fullName: 'Tỷ số Delta - So sánh biến thiên Anion Gap với biến thiên Bicarbonate',
    category: 'Công thức & Tỷ số',
    normalRange: '1.0 – 1.6 (trong toan tăng Anion Gap đơn thuần)',
    definition:
      'Tỷ số giữa mức tăng thêm của Anion Gap so với mức giảm đi của Bicarbonate: Delta Ratio = (AG đo được - 12) / (24 - HCO₃⁻ đo được).',
    clinicalSignificance:
      '• Delta Ratio < 0.4 - 0.8: Có TOAN CHUYỂN HÓA AG BÌNH THƯỜNG (tăng Cl⁻) đi kèm (mất thêm bicarb do tiêu chảy hoặc suy thận).\n• Delta Ratio 1.0 - 1.6: Toan tăng AG đơn thuần (ví dụ DKA hoặc toan Lactic).\n• Delta Ratio > 1.6 - 2.0: Có KIỀM CHUYỂN HÓA phối hợp ngấm ngầm (bicarbonate cao hơn dự kiến, ví dụ nôn ói kèm DKA).',
    pearlsAndWarnings:
      'Chỉ được tính Delta Ratio khi đã xác định bệnh nhân có TOAN CHUYỂN HÓA TĂNG ANION GAP!',
    tags: ['Delta Ratio', 'Delta Gap', 'rối loạn hỗn hợp', 'che giấu']
  },
  {
    id: 'winters-formula',
    term: "Winter's Formula",
    fullName: 'Công thức Winter - Dự đoán bù trừ PaCO₂ trong Toan Chuyển Hóa',
    category: 'Công thức & Tỷ số',
    normalRange: 'PaCO₂ kỳ vọng = 1.5 × [HCO₃⁻] + 8 ± 2 (mmHg)',
    definition:
      'Công thức chuẩn xác định mức độ tăng thông khí hô hấp thích hợp của cơ thể nhằm đáp ứng với tình trạng toan chuyển hóa: PaCO₂ mong đợi = 1.5 × [HCO₃⁻] + 8 ± 2.',
    clinicalSignificance:
      '• Nếu PaCO₂ thực tế = PaCO₂ kỳ vọng: Bù trừ hô hấp phù hợp hoàn toàn.\n• Nếu PaCO₂ thực tế < PaCO₂ kỳ vọng: Có KIỀM HÔ HẤP phối hợp (thông khí quá mức).\n• Nếu PaCO₂ thực tế > PaCO₂ kỳ vọng: Có TOAN HÔ HẤP phối hợp (suy kiệt cơ hô hấp nguy hiểm).',
    pearlsAndWarnings:
      'Mức bù trừ hô hấp tối đa của cơ thể người bình thường chỉ có thể hạ PaCO₂ xuống đến khoảng 10 - 12 mmHg. Không thể hạ thấp hơn được nữa vì công thở không chịu đựng nổi.',
    tags: ['Winter', 'bù trừ', 'toan chuyển hóa', 'PaCO2 kỳ vọng']
  },
  {
    id: 'pf-ratio',
    term: 'P/F Ratio (PaO₂/FiO₂)',
    fullName: 'Chỉ số Horovitz / P/F Ratio - Phân loại Hội chứng Suy Hô Hấp Cấp Tiến Triển (ARDS)',
    category: 'Công thức & Tỷ số',
    normalRange: '> 400 – 500 mmHg ở người bình thường',
    definition:
      'Tỷ số giữa phân áp oxy động mạch (PaO₂, tính bằng mmHg) chia cho phân suất oxy hít vào (FiO₂, biểu diễn dưới dạng số thập phân từ 0.21 đến 1.0).',
    clinicalSignificance:
      'Tiêu chuẩn Berlin chẩn đoán phân độ ARDS (ở mức PEEP ≥ 5 cmH₂O):\n• P/F 201 – 300: ARDS Nhẹ (Mild ARDS)\n• P/F 101 – 200: ARDS Trung bình (Moderate ARDS)\n• P/F ≤ 100: ARDS Nặng (Severe ARDS - Nguy cơ tử vong rất cao)',
    pearlsAndWarnings:
      'Lưu ý mẫu số: Nếu FiO₂ là 40%, phải chia cho 0.40 (không chia cho 40). Ví dụ: PaO₂ 80 mmHg khi thở FiO₂ 40% -> P/F = 80 / 0.40 = 200 (ARDS trung bình).',
    tags: ['P/F ratio', 'Horovitz', 'Berlin', 'ARDS']
  },
  {
    id: 'aa-gradient',
    term: 'A-a Gradient (P(A-a)O₂)',
    fullName: 'Alveolar-arterial Oxygen Gradient - Chênh lệch áp lực Oxy giữa Phế Nang và Động Mạch',
    category: 'Công thức & Tỷ số',
    normalRange: 'Bình thường: 5 – 15 mmHg ở người trẻ. Ước tính theo tuổi: (Tuổi / 4) + 4 mmHg',
    definition:
      'Hiệu số giữa phân áp oxy trong phế nang (P_A_O₂) và phân áp oxy đo được trong máu động mạch (PaO₂): P(A-a)O₂ = P_A_O₂ - PaO₂.',
    clinicalSignificance:
      'Giúp phân biệt nguyên nhân gây giảm oxy máu:\n• A-a gradient BÌNH THƯỜNG: Giảm oxy máu hoàn toàn do giảm thông khí phế nang (ngộ độc thuốc ngủ, nhược cơ) hoặc do độ cao (áp suất khí quyển giảm). Phổi hoàn toàn lành lặn!\n• A-a gradient TĂNG CAO: Có tổn thương màng phế nang - mao mạch hoặc bất tương xứng V/Q (Viêm phổi, ARDS, Phù phổi, Thuyên tắc phổi PE).',
    pearlsAndWarnings:
      'A-a gradient tăng vọt khi thở FiO₂ cao. Do đó giá trị chẩn đoán chính xác nhất là khi bệnh nhân thở khí phòng (FiO₂ = 21%).',
    tags: ['A-a gradient', 'phế nang mao mạch', 'thuyên tắc phổi', 'V/Q']
  },
  {
    id: 'alveolar-gas-equation',
    term: 'Phương Trình Khí Phế Nang (P_A_O₂)',
    fullName: 'Alveolar Gas Equation - Phương trình tính phân áp oxy trong phế nang',
    category: 'Công thức & Tỷ số',
    normalRange: '~100 mmHg khi thở khí trời ở mực nước biển',
    definition:
      'P_A_O₂ = (P_atm - P_H2O) × FiO₂ - (PaCO₂ / R). Với P_atm = 760 mmHg, P_H2O = 47 mmHg, R (thương số hô hấp) ≈ 0.8. Khi thở khí phòng: P_A_O₂ ≈ 150 - (PaCO₂ / 0.8).',
    clinicalSignificance:
      'Cho biết lượng oxy tối đa có thể sẵn sàng khuếch tán từ lòng phế nang vào mao mạch phổi. Là nền tảng bắt buộc để tính A-a gradient.',
    pearlsAndWarnings:
      'Khi PaCO₂ tăng cao (ứ trệ thông khí), theo phương trình phế nang, lượng CO₂ choán chỗ sẽ đẩy văng O₂ ra khỏi phế nang, làm P_A_O₂ tụt xuống và gây thiếu oxy máu thứ phát.',
    tags: ['P_A_O2', 'phế nang', 'khí trời', 'thương số hô hấp']
  },
  {
    id: 'hypoxic-drive',
    term: 'Hypoxic Drive (Kích thích hô hấp do thiếu oxy)',
    fullName: 'Cơ chế kích thích thụ thể ngoại vi do giảm PaO₂ ở bệnh nhân ứ CO₂ mạn tính',
    category: 'Sinh lý học',
    definition:
      'Ở người khỏe mạnh, động lực chính kích thích hô hấp là PaCO₂ tác động lên thụ cảm thể hóa học trung ương ở hành não. Ở bệnh nhân suy hô hấp mạn (như COPD), PaCO₂ tăng cao kéo dài làm thụ cảm thể trung ương bị trơ hóa; trung tâm hô hấp lúc này hoàn toàn phụ thuộc vào kích thích thiếu oxy máu (PaO₂ thấp) từ thụ cảm thể ngoại vi ở xoang cảnh và quai động mạch chủ.',
    clinicalSignificance:
      'Nếu cung cấp oxy liều quá cao không kiểm soát (FiO₂ 100% hoặc thở mask túi), nồng độ PaO₂ tăng vọt sẽ triệt tiêu xung động thần kinh "Hypoxic drive", khiến bệnh nhân ngừng thở, ứ CO₂ cấp tính và hôn mê do toan máu não.',
    pearlsAndWarnings:
      'Mục tiêu SpO₂ ở bệnh nhân COPD có nguy cơ suy hô hấp tăng CO₂ máu là 88 – 92% (dùng oxy liều chuẩn qua van Venturi 24% - 28%), tuyệt đối không cho thở oxy dòng cao không kiểm soát!',
    tags: ['Hypoxic drive', 'COPD', 'thụ thể hóa học', 'ức chế hô hấp']
  },
  {
    id: 'oxyhemoglobin-curve',
    term: 'Đường Cong Phân Ly Oxyhemoglobin',
    fullName: 'Oxyhemoglobin Dissociation Curve - Mối liên hệ S-dạng giữa PaO₂ và SaO₂',
    category: 'Sinh lý học',
    normalRange: 'P50 ≈ 26.6 mmHg (điểm SaO₂ = 50%)',
    definition:
      'Đồ thị hình chữ S phản ánh tính chất gắn nhả oxy có tính tương hỗ (cooperative binding) của 4 chuỗi heme trên phân tử Hemoglobin.',
    clinicalSignificance:
      '• Đoạn ngang (Plateau): PaO₂ từ 60 đến 100 mmHg, SaO₂ duy trì cao > 90%. Đây là vùng an toàn dự trữ oxy cho cơ thể.\n• Đoạn dốc đứng (Steep slope): PaO₂ < 60 mmHg, chỉ cần PaO₂ tụt nhẹ một chút là SaO₂ lao dốc thảm khốc, đưa bệnh nhân vào suy sụp thiếu oxy mô tối cấp!',
    pearlsAndWarnings:
      'Điểm mốc sinh tử cần ghi nhớ: PaO₂ = 60 mmHg tương ứng với SaO₂ = 90%. Nếu SpO₂ tụt dưới 90%, bệnh nhân đang ở mép vực thẳm của đoạn dốc đứng!',
    tags: ['Đường cong oxy', 'P50', 'SaO2', 'PaO2 60']
  },
  {
    id: 'bohr-effect',
    term: 'Hiệu Ứng Bohr (Lệch Đường Cong Oxy)',
    fullName: 'Bohr Effect - Sự dịch chuyển đường cong phân ly Oxyhemoglobin sang Phải / Trái',
    category: 'Sinh lý học',
    definition:
      'Sự thay đổi ái lực của Hemoglobin đối với Oxy dưới tác động của pH, PaCO₂, nhiệt độ và nồng độ 2,3-DPG trong hồng cầu.',
    clinicalSignificance:
      '• Lệch PHẢI (Cadet, face right!): Tăng CO₂, Giảm pH (Toan), Tăng 2,3-DPG, Tăng nhiệt độ (Sốt). Ái lực Hb với O₂ giảm -> Dễ dàng nhả O₂ vào mô đang đói oxy và hoạt động mạnh.\n• Lệch TRÁI: Giảm CO₂, Tăng pH (Kiềm), Giảm 2,3-DPG, Hạ thân nhiệt, Ngộ độc CO. Ái lực Hb với O₂ tăng -> Giữ chặt O₂, mô bị thiếu oxy dù máu đỏ au.',
    pearlsAndWarnings:
      'Mẹo ghi nhớ: Lệch PHẢI gặp khi mô vận động tối đa (nóng, toan, nhiều CO₂, sốt). Lệch TRÁI gặp khi cơ thể lạnh, kiềm, hạ thân nhiệt.',
    tags: ['Bohr', 'lệch phải', 'lệch trái', 'nhả oxy']
  },
  {
    id: 'goldmark',
    term: 'GOLDMARK',
    fullName: 'Bảng mã nguyên nhân gây Toan Chuyển Hóa TĂNG Anion Gap hiện đại',
    category: 'Bảng mã lâm sàng',
    definition:
      'Bảng mã hiện đại thay thế cho MUDPILES truyền thống để liệt kê các nguyên nhân gây toan chuyển hóa tăng Anion Gap (AG > 16-18):',
    clinicalSignificance:
      '• G - Glycols: Ethylene glycol (chất chống đông xe hơi), Propylene glycol\n• O - Oxoproline (5-oxoproline): Dùng Paracetamol liều cao kéo dài ở phụ nữ suy dinh dưỡng\n• L - L-Lactate: Thiếu oxy mô, sốc nhiễm khuẩn, co giật, sốc tim\n• D - D-Lactate: Hội chứng ruột ngắn, vi khuẩn lên men carbohydrate\n• M - Methanol: Cồn công nghiệp, chuyển hóa thành acid formic gây mù mắt\n• A - Aspirin: Ngộ độc Salicylate (toan CH + kiềm hô hấp hỗn hợp)\n• R - Renal failure: Suy thận cấp/mạn, tích tụ acid hữu cơ, phosphate, sulfate\n• K - Ketoacidosis: Toan ceton đái tháo đường (DKA), toan ceton do rượu, toan do nhịn đói lâu ngày',
    pearlsAndWarnings:
      'L-Lactate và DKA là 2 nguyên nhân phổ biến nhất chiếm hơn 80% các ca toan tăng AG trong thực hành cấp cứu và ICU.',
    tags: ['GOLDMARK', 'MUDPILES', 'toan chuyển hóa', 'tăng AG']
  },
  {
    id: 'hardups',
    term: 'HARDUPS',
    fullName: 'Bảng mã nguyên nhân gây Toan Chuyển Hóa Anion Gap BÌNH THƯỜNG (Tăng Clo máu)',
    category: 'Bảng mã lâm sàng',
    definition:
      'Liệt kê các nguyên nhân gây mất ion Bicarbonate qua đường tiêu hóa hoặc qua thận, dẫn đến việc thận giữ ion Clorid lại để trung hòa điện tích (Hyperchloraemic Metabolic Acidosis):',
    clinicalSignificance:
      '• H - Hyperalimentation: Nuôi dưỡng tĩnh mạch hoàn toàn (TPN)\n• A - Acetazolamide: Thuốc ức chế men carbonic anhydrase gây mất HCO₃⁻ qua nước tiểu\n• R - Renal Tubular Acidosis: Toan hóa ống thận Type 1 (xa), Type 2 (gần), Type 4\n• D - Diarrhoea: Tiêu chảy cấp mất dịch ruột giàu bicarbonate\n• U - Uretero-enterostomy: Phẫu thuật dẫn lưu niệu quản vào đại tràng sigma\n• P - Pancreatic / biliary fistula: Rò dịch tụy, dẫn lưu mật kéo dài\n• S - Saline (0.9% NaCl): Truyền lượng lớn dịch muối đẳng trương chứa nồng độ Cl⁻ cao (154 mmol/L so với 100 mmol/L trong máu)',
    pearlsAndWarnings:
      'Phổ biến nhất tại phòng cấp cứu là: Tiêu chảy mất bicarb và truyền quá nhiều dung dịch NaCl 0.9% trong hồi sức sốc!',
    tags: ['HARDUPS', 'toan tăng clo', 'AG bình thường', 'tiêu chảy']
  },
  {
    id: 'allens-test',
    term: "Modified Allen's Test",
    fullName: 'Nghiệm pháp Allen cải biên kiểm tra tuần hoàn bàng hệ động mạch trụ',
    category: 'Kỹ thuật xét nghiệm',
    normalRange: 'Màu hồng trở lại lòng bàn tay trong vòng < 5 đến 7 giây (Dương tính = An toàn)',
    definition:
      'Kỹ thuật lâm sàng bắt buộc thực hiện trước khi chọc kim lấy máu động mạch quay: Ép chặt đồng thời cả động mạch quay và động mạch trụ cho đến khi lòng bàn tay trắng bệch, sau đó buông tay đè động mạch trụ và quan sát thời gian tưới máu trở lại.',
    clinicalSignificance:
      'Đảm bảo động mạch trụ có cung lượng bàng hệ tốt qua cung gan tay nông và sâu, phòng ngừa biến chứng hoại tử ngón tay nếu chẳng may động mạch quay bị tắc huyết khối hoặc co thắt kéo dài sau chọc.',
    pearlsAndWarnings:
      'Nếu bàn tay vẫn nhợt nhạt trắng bệch sau 10 giây (nghiệm pháp âm tính): TUYỆT ĐỐI KHÔNG CHỌC ĐỘNG MẠCH QUAY Ở TAY ĐÓ! Chuyển sang tay đối diện hoặc chọc động mạch cánh tay/động mạch đùi.',
    tags: ['Allen', 'thủ thuật', 'động mạch quay', 'động mạch trụ']
  },
  {
    id: 'vbg-vs-abg',
    term: 'VBG vs ABG (Khí Máu Tĩnh Mạch vs Động Mạch)',
    fullName: 'So sánh khí máu tĩnh mạch (Venous Blood Gas) và khí máu động mạch (Arterial Blood Gas)',
    category: 'Kỹ thuật xét nghiệm',
    definition:
      'VBG là xét nghiệm lấy máu từ tĩnh mạch ngoại vi hoặc catheter tĩnh mạch trung tâm, ít đau và ít nguy cơ biến chứng hơn chọc động mạch.',
    clinicalSignificance:
      'Tương quan giữa VBG và ABG ở bệnh nhân huyết động ổn định:\n• pH tĩnh mạch thấp hơn động mạch khoảng 0.03 – 0.05 đơn vị\n• PvCO₂ cao hơn PaCO₂ khoảng 4 – 6 mmHg\n• HCO₃⁻ tĩnh mạch gần tương đương động mạch (chênh lệch 1 – 2 mmol/L)\n• Chỉ định hợp lý của VBG: Đánh giá theo dõi DKA (nhiễm toan ceton), loại trừ tăng CO₂ máu nếu PvCO₂ < 45 mmHg.',
    pearlsAndWarnings:
      'TUYỆT ĐỐI KHÔNG DÙNG VBG ĐỂ ĐÁNH GIÁ OXY HÓA MÁU! PvO₂ tĩnh mạch (~40 mmHg) không có mối tương quan đáng tin cậy nào với PaO₂ động mạch.',
    tags: ['VBG', 'ABG', 'khí máu tĩnh mạch', 'so sánh']
  },
  {
    id: 'lactate',
    term: 'Lactate Máu (Lactic Acid)',
    fullName: 'Nồng độ Acid Lactic huyết tương - Chỉ điểm chuyển hóa kỵ khí và tưới máu mô',
    category: 'Chỉ số cơ bản',
    normalRange: '0.5 – 2.0 mmol/L (Ngưỡng nguy cơ nhiễm toan: > 2.0 mmol/L; Toan Lactic nặng: > 4.0 mmol/L)',
    definition:
      'Sản phẩm phụ của quá trình đường phân kỵ khí khi mô tế bào bị thiếu oxy, pyruvate chuyển thành lactate dưới tác dụng của men LDH.',
    clinicalSignificance:
      'Là trụ cột chính trong phác đồ Cấp cứu Sốc nhiễm khuẩn (Surviving Sepsis Campaign 1-hour bundle). Lactate > 2.0 mmol/L là dấu hiệu suy giảm tưới máu vi tuần hoàn; Lactate > 4.0 mmol/L biểu thị nguy cơ tử vong rất cao.',
    pearlsAndWarnings:
      'Lactate tăng không chỉ do thiếu oxy mô (Type A: sốc, thiếu máu, co giật) mà còn do suy giảm đào thải ở gan hoặc thuốc (Type B: Metformin, suy gan, ngộ độc cồn, ung thư hạch).',
    tags: ['Lactate', 'sốc nhiễm khuẩn', 'toan lactic', 'thiếu oxy mô']
  },
  {
    id: 'osmolar-gap',
    term: 'Osmolar Gap (Khoảng Trống Thẩm Thấu)',
    fullName: 'Serum Osmolar Gap - Chênh lệch áp suất thẩm thấu đo được và tính toán',
    category: 'Công thức & Tỷ số',
    normalRange: '< 10 mOsm/kg H₂O',
    definition:
      'Hiệu số giữa Áp suất thẩm thấu đo bằng máy đo điểm đông và Áp suất thẩm thấu tính toán: Osmolar Gap = Osm đo được - [2 × Na⁺ + Glucose (mmol/L) + Ure (mmol/L)].',
    clinicalSignificance:
      'Osmolar Gap > 10 mOsm/kg ở bệnh nhân toan chuyển hóa tăng Anion Gap gợi ý ngộ độc các loại cồn độc ngoại sinh: Methanol, Ethylene glycol, Isopropanol.',
    pearlsAndWarnings:
      'Trong giai đoạn muộn của ngộ độc methanol hay ethylene glycol, khi toàn bộ cồn đã bị oxy hóa thành acid (formic acid hoặc oxalic acid), Osmolar gap có thể trở về bình thường trong khi Anion Gap tăng rất cao!',
    tags: ['Osmolar Gap', 'áp suất thẩm thấu', 'Methanol', 'Ethylene glycol']
  },
  {
    id: 'chloride-responsive',
    term: 'Kiềm Chuyển Hóa Nhạy Clorid vs Kháng Clorid',
    fullName: 'Chloride-Responsive vs Chloride-Resistant Metabolic Alkalosis',
    category: 'Bảng mã lâm sàng',
    definition:
      'Phân loại nguyên nhân kiềm chuyển hóa dựa vào nồng độ Clorid trong nước tiểu (Spot Urine Chloride):',
    clinicalSignificance:
      '• Nhạy cảm với Clorid (U_Cl < 15 – 20 mEq/L): Mất dịch dạ dày do nôn ói nhiều, hút sonde dạ dày, sử dụng thuốc lợi tiểu quai. Điều trị khỏi bằng bù dịch NaCl 0.9% và KCl.\n• Kháng Clorid (U_Cl > 25 mEq/L): Thể tích tuần hoàn thường tăng, tăng huyết áp do thừa mineralocorticoid (Hội chứng Conn, Cushing, hẹp động mạch thận, dùng cam thảo licorice). Không đáp ứng với truyền muối NaCl 0.9%.',
    pearlsAndWarnings:
      'Trong kiềm chuyển hóa do nôn ói, thận bị mất Kali nghiêm trọng vì cơ thể cố giữ Na⁺ bằng cách đào thải K⁺ và H⁺ ở ống lượn xa. Cần bù đồng thời cả Kali để đảo ngược tình trạng kiềm máu.',
    tags: ['kiềm chuyển hóa', 'nhạy clo', 'kháng clo', 'nôn ói']
  }
];

export const ABG_GLOSSARY = ABG_GLOSSARY_TERMS;
