/**
 * CliniPortal 2.0 — High-Yield Clinical Mechanism Cases & Flashcards
 * Path: src/content/pathophysiology/quiz/patho-quiz-data.ts
 */

export interface CaseChallenge {
  id: string;
  specialty: string;
  title: string;
  vignette: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  cascadeExplanation: string;
  clinicalPearls: string;
  relatedModule?: string;
}

export interface FlashcardItem {
  id: string;
  category: string;
  frontTitle: string;
  frontClue: string;
  backMechanism: string;
  clinicalPearl: string;
}

export const CLINICAL_CASES: CaseChallenge[] = [
  {
    id: 'case_1_hf_edema',
    specialty: 'Tim Mạch & Thận',
    title: 'Phù Chân & Khó Thở Khi Nằm ở Bệnh Nhân Suy Tim Tâm Thu',
    vignette: 'Bệnh nhân nam 68 tuổi có tiền căn nhồi máu cơ tim cũ, vào viện vì khó thở tăng dần khi nằm đầu bằng (orthopnea) và phù 2 chi dưới mức độ vừa. Khám: Tĩnh mạch cổ nổi ở 45 độ, ran ẩm 2 đáy phổi, T3 gallop, huyết áp 110/70 mmHg.',
    question: 'Chuỗi biến đổi cơ chế bệnh sinh nào sau đây giải thích chính xác nhất tình trạng ứ dịch và tái cấu trúc mô kẽ ở bệnh nhân này?',
    options: [
      {
        id: 'A',
        text: 'Giảm cung lượng tim ➔ Giảm tưới máu thận ➔ Hoạt hóa trục RAAS và hệ giao cảm ➔ Tăng tái hấp thu Na+ và nước tại ống thận ➔ Tăng áp suất thủy tĩnh mao mạch (Pc).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tăng áp lực keo huyết tương (πc) do gan tăng tổng hợp Albumin bù trừ ➔ Kéo nước vào mô kẽ.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Ức chế hoàn toàn peptid lợi niệu BNP do tâm thất bị căng giãn quá mức ➔ Giảm bài tiết muối qua nước tiểu.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Tổn thương màng đáy mao mạch ngoại vi làm giảm hệ số phản xạ protein (σ) xuống 0.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Suy giảm chức năng co bóp thất trái ($EF < 40\\%$) ➔ Giảm $CO$ ➔ Kích hoạt thụ thể áp lực xoang cảnh & cầu thận ➔ Tiết Renin & Noradrenaline ➔ Angiotensin II co tiểu động mạch đi và kích thích Vỏ thượng thận tiết Aldosterone ➔ Tăng giữ muối nước ➔ Tăng $EDV$ và tăng áp suất tĩnh mạch hệ thống/phổi ➔ $P_c$ vượt quá áp lực keo $\\pi_c$ ➔ Dịch thoát vào mô kẽ gây phù ngoại biên và phù phổi kẽ.',
    clinicalPearls: 'Dùng thuốc Ức chế men chuyển (ACEi/ARNI) và Kháng Aldosterone (MRA) đánh trực tiếp vào nút thắt cơ chế RAAS, giúp đảo ngược tái cấu trúc cơ tim và giảm tái nhập viện.',
    relatedModule: '#/pathophysiology/simulators'
  },
  {
    id: 'case_2_dka_acidosis',
    specialty: 'Nội Tiết & Chuyển Hóa',
    title: 'Thở Nhanh Sâu Kussmaul & Đau Bụng ở Bệnh Nhân ĐTĐ Type 1',
    vignette: 'Bệnh nhân nữ 20 tuổi ĐTĐ type 1 bỏ tiêm Insulin 2 ngày nay, nhập viện trong tình trạng lơ mơ, thở nhanh sâu (kiểu Kussmaul), hơi thở mùi trái cây chín, da niêm khô véo da (+). Khí máu ĐM: pH 7.15, pCO2 18 mmHg, HCO3- 6 mEq/L, Na+ 132 mEq/L, Cl- 96 mEq/L, Glucose máu 450 mg/dL.',
    question: 'Nguyên nhân chính gây ra kiểu thở Kussmaul và tình trạng toan máu ở bệnh nhân này là gì?',
    options: [
      {
        id: 'A',
        text: 'Thiếu Insulin kích hoạt men Hormone-Sensitive Lipase ➔ Tăng ly giải lipid thành acid béo tự do ➔ Gan chuyển hóa thành Acetoacetate và Beta-hydroxybutyrate gây toan chuyển hóa tăng Anion Gap.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Tích tụ Lactic acid do ức chế hoàn toàn phức hợp Pyruvate Dehydrogenase ở cơ vân.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Tăng thông khí do kích thích trực tiếp của nồng độ glucose máu cao lên trung tâm hô hấp tại hành não.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Mất chọn lọc HCO3- qua nước tiểu do hoại tử ống thận cấp.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Thiếu Insulin trầm trọng + Tăng các hormone đối kháng (Glucagon, Cortisol, Epinephrine) ➔ Kích hoạt Lipase nhạy hormone tại mô mỡ ➔ Tràn ngập Acid béo tự do vào gan ➔ CPT-I đưa vào ti thể $\\beta$-oxy hóa quá tải tạo lượng lớn thể ceton (Acetoacetic acid, $\\beta$-Hydroxybutyric acid) ➔ Phóng thích $H^+$ làm tiêu hao dự trữ đệm $[HCO_3^-]$ ➔ $pH < 7.20$ kích thích hóa thụ thể trung ương và ngoại vi gây phản xạ thở Kussmaul để đào thải $CO_2$ tối đa.',
    clinicalPearls: 'Anion Gap ở bệnh nhân này: $AG = 132 - (96 + 6) = 30$ mEq/L (rất cao). Công thức Winter dự đoán $pCO_2 = 1.5 \\times 6 + 8 = 17 \\pm 2$ mmHg (phù hợp với $pCO_2$ đo được 18 mmHg ➔ Bù trừ hô hấp tối ưu).',
    relatedModule: '#/pathophysiology/metabolic-map'
  },
  {
    id: 'case_3_g6pd_hemolysis',
    specialty: 'Huyết Học & Di Truyền',
    title: 'Tiểu Màu Xá Xị & Vàng Mắt Sau Khi Dùng Thuốc Trị Sốt Rét',
    vignette: 'Bệnh nhân nam 26 tuổi sau khi dùng thuốc sốt rét Primaquine 3 ngày thì xuất hiện mệt lả, vàng mắt, tiểu sẫm màu như nước ngọt xá xị. Xét nghiệm: Hb giảm từ 14 xuống 8.5 g/dL, Bilirubin toàn phần 4.2 mg/dL (Bilirubin gián tiếp 3.6 mg/dL), Haptoglobin huyết thanh không đo được, KST sốt rét (-). Phết máu ngoại biên thấy có hồng cầu hình vết cắn (Bite cells) và thể Heinz.',
    question: 'Cơ chế enzym phân tử nào bị suy giảm dẫn đến hiện tượng vỡ hồng cầu cấp tính ở bệnh nhân này?',
    options: [
      {
        id: 'A',
        text: 'Thiếu men G6PD ➔ Giảm sản sinh NADPH trong con đường HMP Shunt ➔ Glutathione dạng khử (GSH) không được tái sinh ➔ Hemoglobin bị oxy hóa biến tính tạo thể Heinz và vỡ màng hồng cầu.',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Thiếu men Pyruvate Kinase ➔ Giảm tổng hợp ATP ➔ Mất hoạt tính bơm Na+/K+ ATPase.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Đột biến chuỗi Beta-globin làm Hemoglobin kết tủa thành sợi hình liềm khi thiếu oxy.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Kháng thể tự miễn IgG gắn lên kháng nguyên Rh trên bề mặt hồng cầu ở nhiệt độ 37°C.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Hồng cầu không có nhân và ti thể, con đường HMP Shunt do G6PD xúc tác là nguồn duy nhất tạo NADPH trong hồng cầu. NADPH cần cho enzym Glutathione Reductase để khử GSSG thành GSH. Khi gặp chất oxy hóa mạnh như Primaquine, $H_2O_2$ tích tụ phá hủy cầu nối disulfide của Globin tạo thể Heinz. Đại thực bào lách cắt phần chứa thể Heinz tạo Bite cells và gây tán huyết nội & ngoại mạch.',
    clinicalPearls: 'Không nên định lượng men G6PD trong giai đoạn tán huyết cấp vì các hồng cầu già thiếu men nặng nhất đã vỡ hết, các hồng cầu non mới sinh có hoạt tính men cao sẽ cho kết quả âm tính giả.',
    relatedModule: '#/pathophysiology/metabolic-map'
  },
  {
    id: 'case_4_copd_hypoxia',
    specialty: 'Hô Hấp & Cấp Cứu',
    title: 'Thở Co Kéo & Toan Hô Hấp Mạn ở Bệnh Nhân Đợt Cấp COPD',
    vignette: 'Bệnh nhân nam 72 tuổi tiền căn COPD nhóm E (GOLD 4) hút thuốc lá 50 gói-năm, vào cấp cứu vì sốt, ho đờm mủ đục và khó thở dữ dội. Khí máu ĐM lúc nhập viện (thở khí phòng): pH 7.28, pCO2 68 mmHg, pO2 48 mmHg, HCO3- 32 mEq/L, SaO2 80%.',
    question: 'Phân tích khí máu động mạch này phản ánh tình trạng rối loạn thăng bằng toan kiềm nào?',
    options: [
      {
        id: 'A',
        text: 'Toan hô hấp mất bù cấp trên nền toan hô hấp mạn (có tăng HCO3- bù trừ từ trước qua thận).',
        isCorrect: true
      },
      {
        id: 'B',
        text: 'Toan chuyển hóa cấp có kiềm hô hấp phối hợp do thở nhanh co kéo.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Toan hô hấp cấp tính đơn thuần chưa có bất kỳ bù trừ chuyển hóa nào.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Kiềm chuyển hóa bù trừ quá mức gây ức chế hô hấp thứ phát.',
        isCorrect: false
      }
    ],
    cascadeExplanation: 'Bệnh nhân có $[HCO_3^-] = 32$ mEq/L (bình thường 24 mEq/L) chứng tỏ thận đã giữ bicabonate từ trước để bù đắp tình trạng tăng $pCO_2$ mạn tính. Tuy nhiên trong đợt cấp, tắc nghẽn đường thở tăng vọt khiến $pCO_2$ tăng vọt lên 68 mmHg ➔ Khả năng đệm của cơ thể quá tải làm $pH$ tụt xuống 7.28 (< 7.35) ➔ Toan hô hấp mất bù cấp trên nền mạn.',
    clinicalPearls: 'Mục tiêu oxy liệu pháp ở bệnh nhân COPD có nguy cơ ứ $CO_2$ là $SpO_2$ từ 88% - 92%, tránh thở oxy nồng độ quá cao làm mất phản xạ kích thích hô hấp do thiếu oxy (Hypoxic Drive) và làm nặng thêm hiệu ứng Haldane.',
    relatedModule: '#/pathophysiology/simulators'
  }
];

export const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: 'fc_1',
    category: 'Tim Mạch',
    frontTitle: 'Quy luật Frank-Starling',
    frontClue: 'Tại sao tăng thể tích cuối tâm trương (EDV) lại làm tăng thể tích nhát bóp (SV)?',
    backMechanism: 'Tăng lượng máu về thất làm kéo dài các sợi cơ tim (Sarcomere) về phía chiều dài tối ưu (~2.2 µm). Điều này làm tăng độ nhạy cảm của Troponin C với ion Ca2+ và tăng số lượng cầu nối Actin-Myosin được hình thành trong thì tâm thu.',
    clinicalPearl: 'Khi thất trái giãn quá mức (> 2.4 µm) trong suy tim giai đoạn cuối, các sợi sarcomere bị kéo tách rời ➔ Đường cong Starling đi ngang hoặc sụt giảm.'
  },
  {
    id: 'fc_2',
    category: 'Điện Sinh Lý',
    frontTitle: 'Tăng Kali Máu & Rối Loạn Nhịp',
    frontClue: 'Tại sao tăng Kali ngoại bào lại làm bất hoạt kênh Na+ và gây chậm dẫn truyền tim?',
    backMechanism: 'Theo phương trình Nernst, $[K^+]_o$ tăng làm điện thế nghỉ màng ($V_m$) bớt âm hơn (khử cực màng một phần từ -90mV lên -70mV). Trạng thái khử cực kéo dài này giữ cổng bất hoạt (h-gate) của kênh $Na_V1.5$ đóng lại, làm giảm vận tốc dẫn truyền điện thế pha 0 ($dV/dt$).',
    clinicalPearl: 'Canxi Clorid hoặc Canxi Gluconate tĩnh mạch giúp ổn định màng tế bào cơ tim ngay lập tức (nâng ngưỡng kích thích) mà không làm thay đổi nồng độ Kali máu.'
  },
  {
    id: 'fc_3',
    category: 'Thận - Nước Điện Giải',
    frontTitle: 'Lực Starling & Hội Chứng Thận Hư',
    frontClue: 'Cơ chế gây phù toàn thân trong Hội chứng thận hư là gì?',
    backMechanism: 'Tổn thương màng đáy cầu thận làm thất thoát lượng lớn Protein qua nước tiểu (> 3.5g/24h) ➔ Giảm Albumin máu nặng ➔ Giảm áp suất keo huyết tương ($\\pi_c$) ➔ Lực lọc ròng ($NFP$) tăng mạnh đẩy dịch từ lòng mạch vào mô kẽ (Underfill hypothesis) + Tăng tái hấp thu Na+ tiên phát tại ống lượn xa (Overfill hypothesis).',
    clinicalPearl: 'Áp suất keo bình thường $\\pi_c \\approx 25 - 28$ mmHg. Khi Albumin máu giảm dưới 20 g/L, $\\pi_c$ sụt giảm nghiêm trọng dẫn đến phù tràn dịch đa màng.'
  },
  {
    id: 'fc_4',
    category: 'Hóa Sinh - Dược Lý',
    frontTitle: 'Cơ Chế Tác Dụng của Thuốc Statin',
    frontClue: 'Tại sao ức chế HMG-CoA Reductase ở gan lại làm giảm mạnh nồng độ LDL-C trong máu?',
    backMechanism: 'Statin ức chế cạnh tranh men HMG-CoA Reductase ➔ Giảm tổng hợp Cholesterol nội bào tại gan ➔ Tế bào gan kích hoạt yếu tố phiên mã SREBP-2 ➔ Tăng sinh tổng hợp và bộc lộ các Thụ thể LDL (LDL Receptors) trên màng tế bào gan ➔ Tăng bắt giữ và thanh thải LDL-C từ máu vào gan.',
    clinicalPearl: 'Statin không chỉ giảm sản xuất mỡ mà chủ yếu hạ mỡ máu nhờ tăng cường dọn dẹp các hạt LDL lưu hành qua thụ thể gan.'
  },
  {
    id: 'fc_5',
    category: 'Hô Hấp',
    frontTitle: 'Bất Xứng Thông Khí / Tưới Máu (V/Q Mismatch)',
    frontClue: 'Phân biệt Shunt Sinh Lý ($V/Q = 0$) và Khoảng Chết Sinh Lý ($V/Q = \\infty$)?',
    backMechanism: '• Shunt ($V/Q = 0$): Có tưới máu nhưng không có thông khí (vd: Xẹp phổi, Đông đặc phổi, ARDS). Máu tĩnh mạch đi qua phế nang không được trao đổi oxy, KHÔNG đáp ứng hoàn toàn với thở oxy 100%.\n• Dead Space ($V/Q = \\infty$): Có thông khí nhưng không có tưới máu (vd: Thuyên tắc mạch phổi - PE). Khí hít vào không gặp mao mạch để trao đổi.',
    clinicalPearl: 'Shunt nội phổi là nguyên nhân chính gây thiếu oxy máu trơ (refractory hypoxemia) trong hội chứng suy hô hấp cấp tiến triển (ARDS).'
  }
];
