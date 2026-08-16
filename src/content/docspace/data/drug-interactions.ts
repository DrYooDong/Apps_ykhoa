/**
 * Drug Interactions & Formulary Database - DocSpace
 * Cơ sở dữ liệu tương tác thuốc lâm sàng & Dược thư tóm tắt
 */

export interface DrugInteractionRule {
  drug_a: string;
  drug_b: string;
  severity: 'high' | 'moderate' | 'low';
  mechanism: string;
  recommendation: string;
}

export interface DrugFormularyItem {
  id: string;
  name: string;
  brandNames: string[];
  category: string;
  standardDose: string;
  renalAdjustment: string;
  hepaticAdjustment?: string;
  contraindications: string[];
  blackBoxWarning?: string;
  clinicalPearls: string;
}

export const DRUG_FORMULARY_DATABASE: DrugFormularyItem[] = [
  {
    id: 'vancomycin',
    name: 'Vancomycin',
    brandNames: ['Vancocin', 'Vancomycine'],
    category: 'Kháng sinh Glycopeptide',
    standardDose: '15 - 20 mg/kg IV mỗi 8 - 12 giờ (Nạp 25 - 30 mg/kg tối đa 3g ở ca nặng)',
    renalAdjustment: 'Clcr 50-89: q12h | Clcr 30-49: q24h | Clcr 15-29: q24-48h | Lọc máu: Nạp rồi theo dõi đáy Cmin',
    contraindications: ['Tiền sử dị ứng nặng với Glycopeptide'],
    blackBoxWarning: 'Độc tính trên thận và ốc tai khi phối hợp Aminoglycosides hoặc dùng liều cao kéo dài.',
    clinicalPearls: 'Mục tiêu AUC/MIC = 400 - 600. Truyền chậm ≤ 10 mg/phút (hoặc 1g trong ≥ 60 phút) để tránh Hội chứng Red Man Syndrome.'
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    brandNames: ['Meronem', 'Ronem'],
    category: 'Kháng sinh Carbapenem',
    standardDose: '1g - 2g IV mỗi 8 giờ (Nhiễm trùng huyết/Viêm màng não: 2g q8h)',
    renalAdjustment: 'Clcr 26-50: 1g q12h | Clcr 10-25: 500mg q12h | Clcr < 10: 500mg q24h | HD: 500mg sau lọc',
    contraindications: ['Dị ứng sốc phản vệ với Carbapenem/Beta-lactam'],
    blackBoxWarning: 'Làm giảm nồng độ Acid Valproic trong máu tới 90% trong 24h, gây co giật kháng trị.',
    clinicalPearls: 'Ưu tiên truyền kéo dài trong 3 giờ (Extended infusion) ở bệnh nhân sốc nhiễm khuẩn để tối ưu hóa %T > MIC.'
  },
  {
    id: 'piperacillin_tazobactam',
    name: 'Piperacillin / Tazobactam',
    brandNames: ['Tazocin', 'Zosyn'],
    category: 'Kháng sinh Penicillin + Kháng Beta-lactamase',
    standardDose: '4.5g IV mỗi 6 - 8 giờ (Truyền ngắt quãng 30 phút hoặc truyền kéo dài 3-4 giờ)',
    renalAdjustment: 'Clcr 20-40: 3.375g q6h | Clcr < 20: 2.25g q6h (hoặc 3.375g q8h) | HD: 2.25g q8h + 0.75g sau lọc',
    contraindications: ['Dị ứng nghiêm trọng với Penicillin/Cephalosporin'],
    clinicalPearls: 'Phối hợp với Vancomycin làm tăng nguy cơ tổn thương thận cấp (AKI) hiệp đồng.'
  },
  {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    brandNames: ['Rocephin'],
    category: 'Kháng sinh Cephalosporin thế hệ 3',
    standardDose: '1g - 2g IV/IM mỗi 24 giờ (Viêm màng não: 2g IV mỗi 12 giờ)',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận đơn thuần (thải trừ kép qua gan & thận). Liều tối đa 2g/ngày nếu suy cả gan và thận.',
    contraindications: ['Trẻ sơ sinh < 28 ngày dùng cùng dung dịch tiêm truyền chứa Calci (kết tủa Calci-Ceftriaxone ở phổi & thận).'],
    clinicalPearls: 'Thuốc đầu tay trong Viêm phổi mắc phải cộng đồng, Viêm màng não mủ và Nhiễm trùng ổ bụng (kết hợp Metronidazole).'
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    brandNames: ['Ciprobay', 'Cifran'],
    category: 'Kháng sinh Fluoroquinolone',
    standardDose: '400mg IV mỗi 8 - 12 giờ hoặc 500 - 750mg uống mỗi 12 giờ',
    renalAdjustment: 'Clcr 30-50: 400mg q12h (hoặc 500mg uống q12h) | Clcr < 30: 400mg q18-24h (hoặc 500mg uống q24h)',
    contraindications: ['Phối hợp Tizanidine', 'Tiền sử đứt gân do Quinolone'],
    blackBoxWarning: 'Viêm gân và đứt gân gót Achilles, bệnh lý thần kinh ngoại biên, phình bóc tách động mạch chủ, kéo dài QTc.',
    clinicalPearls: 'Tương tác mạnh với ion kim loại hóa trị 2-3 (Sắt, Calci, Nhôm, Magie, Sữa) ➔ uống cách xa ít nhất 2 giờ.'
  },
  {
    id: 'levofloxacin',
    name: 'Levofloxacin',
    brandNames: ['Tavanic', 'Levaquin'],
    category: 'Kháng sinh Fluoroquinolone hô hấp',
    standardDose: '500mg - 750mg IV/PO mỗi 24 giờ',
    renalAdjustment: 'Clcr 20-49: Khởi đầu 500mg rồi 250mg q24h | Clcr < 20: Khởi đầu 500mg rồi 250mg q48h',
    contraindications: ['Tiền sử dị ứng Quinolone', 'Kéo dài QTc bẩm sinh'],
    blackBoxWarning: 'Nguy cơ đứt gân gót, loạn thần, phình tách ĐMC.',
    clinicalPearls: 'Sinh khả dụng đường uống đạt ~99%, có thể chuyển đổi IV sang PO với liều tương đương 1:1.'
  },
  {
    id: 'enoxaparin',
    name: 'Enoxaparin (LMWH)',
    brandNames: ['Lovenox'],
    category: 'Thuốc chống đông Heparin trọng lượng phân tử thấp',
    standardDose: 'Dự phòng VTE: 40mg SC q24h | Điều trị DVT/PE/ACS: 1 mg/kg SC q12h (hoặc 1.5 mg/kg SC q24h)',
    renalAdjustment: 'Clcr < 30 mL/min: Dự phòng giảm còn 20-30mg SC q24h; Điều trị giảm còn 1 mg/kg SC q24h (theo dõi Anti-Xa)',
    contraindications: ['Xuất huyết đang tiến triển', 'Tiền sử HIT typ 2 (giảm tiểu cầu do Heparin)', 'Gây tê tủy sống/ngoài màng cứng gần đây'],
    blackBoxWarning: 'Tụ máu ngoài màng cứng gây liệt vĩnh viễn khi chọc dò tủy sống.',
    clinicalPearls: 'Chỉ định SC (tiêm dưới da thành bụng), không tiêm bắp IM. Đảo vị trí tiêm tránh tụ máu.'
  },
  {
    id: 'rivaroxaban',
    name: 'Rivaroxaban',
    brandNames: ['Xarelto'],
    category: 'Thuốc chống đông trực tiếp (DOAC - Ức chế Xa)',
    standardDose: 'Rung nhĩ: 20mg/ngày cùng thức ăn | Điều trị DVT/PE: 15mg x 2 lần/ngày trong 21 ngày, sau đó 20mg/ngày',
    renalAdjustment: 'Clcr 15-49 mL/min: Giảm liều Rung nhĩ còn 15mg/ngày | Clcr < 15 mL/min: Không khuyến cáo',
    contraindications: ['Xuất huyết thể tạng', 'Bệnh gan kèm bệnh đông máu', 'Van tim cơ học'],
    clinicalPearls: 'BẮT BUỘC uống cùng thức ăn đối với viên 15mg và 20mg để đạt hấp thu tối đa (tăng sinh khả dụng từ 66% lên gần 100%).'
  },
  {
    id: 'apixaban',
    name: 'Apixaban',
    brandNames: ['Eliquis'],
    category: 'Thuốc chống đông trực tiếp (DOAC - Ức chế Xa)',
    standardDose: 'Rung nhĩ: 5mg x 2 lần/ngày | Dự phòng VTE: 2.5mg x 2 lần/ngày',
    renalAdjustment: 'Rung nhĩ: Giảm xuống 2.5mg x 2 lần/ngày nếu có ít nhất 2 trong 3 tiêu chí ABC: Tuổi ≥ 80, Cân nặng ≤ 60kg, Scr ≥ 1.5 mg/dL (133 µmol/L)',
    contraindications: ['Xuất huyết tiến triển', 'Van tim cơ học'],
    clinicalPearls: 'Ít thải trừ qua thận nhất trong các DOAC (~27%), an toàn nhất trên bệnh nhân suy thận vừa-nặng.'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    brandNames: ['Cordarone'],
    category: 'Thuốc chống loạn nhịp Nhóm III',
    standardDose: 'Cấp cứu ngừng tim: 300mg IV Bolus, lặp lại 150mg | Nạp đường uống: 600-800mg/ngày x 1-2 tuần, duy trì 200mg/ngày',
    renalAdjustment: 'Không cần chỉnh liều thận.',
    contraindications: ['Block nhĩ thất độ II-III chưa đặt máy tạo nhịp', 'Rối loạn chức năng tuyến giáp nặng', 'QTc > 500ms'],
    blackBoxWarning: 'Độc tính trên phổi (Viêm phổi kẽ), độc gan gây tử vong, làm nặng thêm loạn nhịp.',
    clinicalPearls: 'Thời gian bán thải siêu dài (T1/2 = 40 - 60 ngày). Ức chế CYP3A4, CYP2C9 và P-gp ➔ TĂNG GẤP ĐÔI nồng độ Digoxin và Warfarin.'
  },
  {
    id: 'digoxin',
    name: 'Digoxin',
    brandNames: ['Lanoxin'],
    category: 'Glycoside tim (Tăng co bóp & Kiểm soát nhịp)',
    standardDose: '0.125mg - 0.25mg uống mỗi ngày (Mục tiêu nồng độ đáy: 0.5 - 0.9 ng/mL trong suy tim)',
    renalAdjustment: 'Clcr 30-50: 0.125mg/ngày hoặc cách ngày | Clcr < 30: 0.0625mg cách ngày | Theo dõi nồng độ thuốc máu định kỳ',
    contraindications: ['Rung thất', 'Bệnh cơ tim phì đại tắc nghẽn (HOCM)', 'Hội chứng WPW kèm rung nhĩ'],
    blackBoxWarning: 'Khoảng điều trị rất hẹp. Hạ Kali/Hạ Magie máu làm tăng độc tính Digoxin.',
    clinicalPearls: 'Dấu hiệu ngộ độc: Nhìn vàng (Xanthopsia), buồn nôn, loạn nhịp thất (ngoại tâm thu nhịp đôi), Block AV.'
  },
  {
    id: 'furosemide',
    name: 'Furosemide',
    brandNames: ['Lasix'],
    category: 'Thuốc lợi tiểu quai (Loop Diuretic)',
    standardDose: 'Phù phổi cấp / Suy tim: 40 - 80mg IV, có thể tăng liều gấp đôi nếu kháng lợi tiểu',
    renalAdjustment: 'Suy thận nặng có thể cần liều rất cao (160 - 250mg IV) do giảm bài tiết vào lòng ống thận.',
    contraindications: ['Vô niệu hoàn toàn', 'Hôn mê gan do hạ Kali', 'Dị ứng Sulfonamide nghiêm trọng'],
    clinicalPearls: 'Tỷ lệ tương đương: 40mg Furosemide uống = 20mg Furosemide IV = 1mg Bumetanide = 20mg Torsemide.'
  },
  {
    id: 'metformin',
    name: 'Metformin',
    brandNames: ['Glucophage', 'Glumetza'],
    category: 'Thuốc hạ đường huyết Biguanide',
    standardDose: '500mg - 1000mg x 2 lần/ngày (tối đa 2000 - 2550 mg/ngày cùng bữa ăn)',
    renalAdjustment: 'eGFR 45-59: Liều tối đa 1000mg/ngày | eGFR 30-44: Liều tối đa 500mg/ngày | eGFR < 30: CHỐNG CHỈ ĐỊNH',
    contraindications: ['eGFR < 30 mL/min/1.73m²', 'Nhiễm toan chuyển hóa cấp / Suy tim mất bù / Thiếu oxy mô'],
    blackBoxWarning: 'Nhiễm toan Lactic (Lactic Acidosis) hiếm gặp nhưng tử vong cao (đặc biệt khi suy thận cấp hoặc chụp CT cản quang).',
    clinicalPearls: 'Ngừng thuốc trước 48h khi chụp CT tiêm thuốc cản quang Iod tĩnh mạch ở bệnh nhân eGFR < 60.'
  },
  {
    id: 'empagliflozin',
    name: 'Empagliflozin',
    brandNames: ['Jardiance'],
    category: 'Thuốc ức chế SGLT2 (Bảo vệ tim mạch & thận)',
    standardDose: '10mg uống 1 lần/ngày vào buổi sáng (có thể tăng lên 25mg/ngày trong ĐTĐ typ 2)',
    renalAdjustment: 'Bắt đầu dùng đến khi eGFR ≥ 20 mL/min/1.73m². Tiếp tục dùng trong Suy tim/CKD cho đến khi lọc máu.',
    contraindications: ['Bệnh nhân đang chạy thận nhân tạo định kỳ', 'Tiền sử DKA thể đường huyết bình thường (Euglycemic DKA)'],
    clinicalPearls: 'Dặn bệnh nhân uống đủ nước, vệ sinh bộ phận sinh dục sạch sẽ để phòng nấm Candida sinh dục.'
  },
  {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'Thuốc hạ Lipid máu nhóm Statin cường độ cao',
    standardDose: 'Cường độ cao: 40 - 80mg/ngày | Trung bình: 10 - 20mg/ngày uống vào buổi tối',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Bệnh gan tiến triển / Men gan ALT/AST tăng > 3 lần giới hạn trên', 'Phụ nữ mang thai'],
    blackBoxWarning: 'Tiêu cơ vân (Rhabdomyolysis) khi dùng liều cao hoặc phối hợp Fibrate/Clarithromycin.',
    clinicalPearls: 'Uống bất kỳ thời điểm nào trong ngày do thời gian bán thải dài (14h), nhưng buổi tối tối ưu hóa tổng hợp Cholesterol.'
  }
];

export const DRUG_INTERACTIONS: DrugInteractionRule[] = [
  {
    drug_a: "vancomycin", 
    drug_b: "gentamicin",
    severity: "high",
    mechanism: "Tăng độc tính thận cộng hợp (Nephrotoxicity) và độc tính ốc tai.",
    recommendation: "Tránh phối hợp kéo dài. Nếu bắt buộc, theo dõi Creatinine mỗi 24h và nồng độ đáy của cả 2 thuốc."
  },
  {
    drug_a: "vancomycin",
    drug_b: "piperacillin_tazobactam",
    severity: "high",
    mechanism: "Hiệp đồng tăng độc tính trên tế bào ống thận, làm tăng nguy cơ tổn thương thận cấp (AKI) gấp 2-3 lần.",
    recommendation: "Cân nhắc thay thế Piperacillin/Tazobactam bằng Cefepime hoặc Meropenem khi đang điều trị Vancomycin."
  },
  {
    drug_a: "ciprofloxacin", 
    drug_b: "amiodarone",
    severity: "high",
    mechanism: "Kéo dài khoảng QTc cộng hợp, làm tăng nguy cơ loạn nhịp thất chết người (Xoắn đỉnh Torsades de Pointes).",
    recommendation: "Chống chỉ định phối hợp. Thay kháng sinh sang nhóm Beta-lactam an toàn trên tim."
  },
  {
    drug_a: "levofloxacin",
    drug_b: "amiodarone",
    severity: "high",
    mechanism: "Kéo dài khoảng QTc và loạn nhịp thất.",
    recommendation: "Chống chỉ định phối hợp. Đổi sang Beta-lactam hoặc Macrolide theo dõi ECG liên tục."
  },
  {
    drug_a: "amiodarone",
    drug_b: "digoxin",
    severity: "high",
    mechanism: "Amiodarone ức chế P-glycoprotein và thải trừ qua thận, làm tăng nồng độ Digoxin trong máu lên 70-100%.",
    recommendation: "GIẢM 50% LIỀU DIGOXIN ngay khi bắt đầu dùng Amiodarone và theo dõi nồng độ Digoxin huyết tương."
  },
  {
    drug_a: "amiodarone",
    drug_b: "warfarin",
    severity: "high",
    mechanism: "Amiodarone ức chế mạnh CYP2C9 làm giảm chuyển hóa S-warfarin, làm tăng vọt INR và nguy cơ xuất huyết não/tiêu hóa.",
    recommendation: "Giảm liều Warfarin từ 30% - 50% và kiểm tra INR mỗi 2-3 ngày."
  },
  {
    drug_a: "omeprazole",
    drug_b: "clopidogrel",
    severity: "moderate",
    mechanism: "Omeprazole ức chế CYP2C19, làm giảm chuyển hóa Clopidogrel thành dạng có hoạt tính, giảm hiệu quả chống huyết khối.",
    recommendation: "Ưu tiên thay thế bằng Pantoprazole hoặc Rabeprazole (ít ức chế CYP2C19 hơn)."
  },
  {
    drug_a: "azithromycin",
    drug_b: "colchicine",
    severity: "high",
    mechanism: "Azithromycin ức chế P-glycoprotein, làm tăng nồng độ Colchicine trong máu, có thể gây ngộ độc chết người.",
    recommendation: "Tránh phối hợp. Nếu bắt buộc, giảm liều Colchicine và theo dõi dấu hiệu ngộ độc (tiêu chảy, yếu cơ)."
  },
  {
    drug_a: "atorvastatin",
    drug_b: "clarithromycin",
    severity: "high",
    mechanism: "Clarithromycin ức chế mạnh CYP3A4, làm tăng nồng độ Atorvastatin trong máu gấp nhiều lần, tăng nguy cơ tiêu cơ vân.",
    recommendation: "Tạm ngừng Atorvastatin trong thời gian dùng Clarithromycin hoặc chuyển sang Rosuvastatin liều thấp."
  },
  {
    drug_a: "enoxaparin",
    drug_b: "rivaroxaban",
    severity: "high",
    mechanism: "Chồng chéo tác dụng chống đông máu (Double anticoagulation) ➔ Nguy cơ xuất huyết ồ ạt đe dọa tính mạng.",
    recommendation: "Chống chỉ định dùng đồng thời. Chỉ bắt đầu DOAC tại thời điểm liều LMWH tiếp theo đến hạn."
  },
  {
    drug_a: "spironolactone",
    drug_b: "enalapril",
    severity: "moderate",
    mechanism: "Phối hợp ức chế Aldosterone và ức chế men chuyển ➔ Tăng Kali máu nặng (Hyperkalemia).",
    recommendation: "Kiểm tra Kali máu và Creatinine sau 1 tuần, 1 tháng và định kỳ mỗi 3 tháng. Giữ Kali < 5.0 mmol/L."
  },
  {
    drug_a: "metformin",
    drug_b: "iodinated_contrast",
    severity: "high",
    mechanism: "Thuốc cản quang gây suy thận cấp làm ứ trệ Metformin, dẫn đến Nhiễm toan Lactic nặng.",
    recommendation: "Ngừng Metformin tại thời điểm tiêm cản quang và trong 48h sau đó. Chỉ dùng lại khi kiểm tra eGFR ổn định."
  }
];
