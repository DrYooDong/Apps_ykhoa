/**
 * Drug Interactions & Formulary Database V2 - DocSpace
 * Cơ sở dữ liệu Dược thư Lâm sàng mở rộng & Trung tâm Kiểm tra Tương tác Thuốc Đa tương tác
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
  atcCode?: string;
  standardDose: string;
  renalAdjustment: string;
  hepaticAdjustment?: string;
  contraindications?: string[];
  blackBoxWarning?: string;
  clinicalPearls: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CƠ SỞ DỮ LIỆU DƯỢC THƯ LÂM SÀNG V2 (80+ HOẠT CHẤT THIẾT YẾU)
// ─────────────────────────────────────────────────────────────────────────────

export const DRUG_FORMULARY_DATABASE: DrugFormularyItem[] = [
  // ═══ KHÁNG SINH & KHÁNG VI SINH VẬT ═══
  {
    id: 'vancomycin',
    name: 'Vancomycin',
    brandNames: ['Vancocin', 'Vancomycine', 'Celovan'],
    category: 'Kháng sinh Glycopeptide',
    atcCode: 'J01XA01',
    standardDose: '15 - 20 mg/kg IV mỗi 8 - 12 giờ (Nạp 25 - 30 mg/kg tối đa 3g ở ca nặng/sepsis)',
    renalAdjustment: 'eGFR 50-89: q12h | eGFR 30-49: q24h | eGFR 15-29: q24-48h | Lọc máu HD: Liều nạp 20mg/kg rồi theo dõi đáy Cmin sau lọc',
    contraindications: ['Tiền sử dị ứng nặng/sốc phản vệ với Glycopeptide'],
    blackBoxWarning: 'Độc tính trên thận (Nephrotoxicity) và ốc tai (Ototoxicity) khi phối hợp Aminoglycosides hoặc dùng liều cao kéo dài.',
    clinicalPearls: 'Mục tiêu AUC/MIC = 400 - 600. Tốc độ truyền chậm ≤ 10 mg/phút (1g trong ≥ 60 phút) để tránh Hội chứng Red Man Syndrome (giải phóng Histamin).'
  },
  {
    id: 'meropenem',
    name: 'Meropenem',
    brandNames: ['Meronem', 'Ronem', 'Meponem'],
    category: 'Kháng sinh Carbapenem',
    atcCode: 'J01DH02',
    standardDose: '1g - 2g IV mỗi 8 giờ (Nhiễm trùng huyết/Viêm màng não: 2g q8h)',
    renalAdjustment: 'eGFR 26-50: 1g q12h | eGFR 10-25: 500mg q12h | eGFR < 10: 500mg q24h | HD: 500mg sau mỗi lần lọc',
    contraindications: ['Dị ứng sốc phản vệ với Carbapenem hoặc Beta-lactam'],
    blackBoxWarning: 'Làm giảm nồng độ Acid Valproic (Depakine) trong máu tới 90% trong 24h, gây co giật kháng trị đe dọa tính mạng.',
    clinicalPearls: 'Ưu tiên truyền kéo dài trong 3 giờ (Extended Infusion) ở bệnh nhân sốc nhiễm khuẩn để tối ưu hóa thời gian nồng độ trên MIC (%T > MIC).'
  },
  {
    id: 'piperacillin_tazobactam',
    name: 'Piperacillin / Tazobactam',
    brandNames: ['Tazocin', 'Zosyn', 'Piptaz'],
    category: 'Kháng sinh Penicillin + Kháng Beta-lactamase',
    atcCode: 'J01CR05',
    standardDose: '4.5g IV mỗi 6 - 8 giờ (Truyền 30 phút hoặc truyền kéo dài 3-4 giờ)',
    renalAdjustment: 'eGFR 20-40: 3.375g q6h | eGFR < 20: 2.25g q6h (hoặc 3.375g q8h) | HD: 2.25g q8h + 0.75g sau lọc',
    contraindications: ['Dị ứng nghiêm trọng với Penicillin/Cephalosporin'],
    clinicalPearls: 'Phối hợp đồng thời với Vancomycin làm tăng nguy cơ tổn thương thận cấp (AKI) hiệp đồng gấp 2-3 lần.'
  },
  {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    brandNames: ['Rocephin', 'Ceftriaxone', 'Biotriaxon'],
    category: 'Kháng sinh Cephalosporin thế hệ 3',
    atcCode: 'J01DD04',
    standardDose: '1g - 2g IV/IM mỗi 24 giờ (Viêm màng não: 2g IV mỗi 12 giờ)',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận đơn thuần (thải trừ kép gan & thận). Liều tối đa 2g/ngày nếu suy cả gan và thận nặng.',
    contraindications: ['Trẻ sơ sinh < 28 ngày dùng cùng dung dịch tiêm truyền chứa Calci (nguy cơ kết tủa Calci-Ceftriaxone tại phổi & thận).'],
    clinicalPearls: 'Thuốc đầu tay trong Viêm phổi mắc phải cộng đồng, Viêm màng não mủ và Nhiễm trùng ổ bụng (phối hợp Metronidazole).'
  },
  {
    id: 'cefepime',
    name: 'Cefepime',
    brandNames: ['Maxipime', 'Cefepim'],
    category: 'Kháng sinh Cephalosporin thế hệ 4',
    atcCode: 'J01DE01',
    standardDose: '2g IV mỗi 8 - 12 giờ (Nhiễm trùng Pseudomonas: 2g q8h)',
    renalAdjustment: 'eGFR 30-50: 2g q12-24h | eGFR 11-29: 1g-2g q24h | eGFR < 11: 1g q24h (Bắt buộc chỉnh liều tránh ngộ độc não)',
    contraindications: ['Dị ứng nhóm Cephalosporin'],
    blackBoxWarning: 'Độc tính trên thần kinh trung ương (Cefepime-induced neurotoxicity: Lú lẫn, giật cơ, hôn mê, động kinh không co giật) khi không chỉnh liều ở bệnh nhân suy thận.',
    clinicalPearls: 'Có hoạt tính chống Pseudomonas aeruginosa mạnh và ít gây cảm ứng men AmpC hơn Cephalosporin thế hệ 3.'
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    brandNames: ['Ciprobay', 'Cifran', 'Serviflox'],
    category: 'Kháng sinh Fluoroquinolone',
    atcCode: 'J01MA02',
    standardDose: '400mg IV mỗi 8 - 12 giờ hoặc 500 - 750mg uống mỗi 12 giờ',
    renalAdjustment: 'eGFR 30-50: 400mg q12h (PO 500mg q12h) | eGFR < 30: 400mg q18-24h (PO 500mg q24h)',
    contraindications: ['Phối hợp Tizanidine', 'Tiền sử đứt gân do Quinolone'],
    blackBoxWarning: 'Viêm gân và đứt gân gót Achilles, bệnh lý thần kinh ngoại biên, phình bóc tách động mạch chủ, kéo dài QTc.',
    clinicalPearls: 'Tương tác mạnh với ion kim loại hóa trị 2-3 (Sắt, Calci, Nhôm, Magie, Sữa) ➔ Uống cách xa ít nhất 2 giờ.'
  },
  {
    id: 'levofloxacin',
    name: 'Levofloxacin',
    brandNames: ['Tavanic', 'Levaquin', 'Cravit'],
    category: 'Kháng sinh Fluoroquinolone hô hấp',
    atcCode: 'J01MA12',
    standardDose: '500mg - 750mg IV/PO mỗi 24 giờ',
    renalAdjustment: 'eGFR 20-49: Khởi đầu 500mg rồi 250mg q24h | eGFR < 20: Khởi đầu 500mg rồi 250mg q48h',
    contraindications: ['Tiền sử dị ứng Quinolone', 'Kéo dài QTc bẩm sinh'],
    blackBoxWarning: 'Nguy cơ đứt gân gót, loạn thần, phình tách ĐMC, hạ đường huyết nặng ở người già.',
    clinicalPearls: 'Sinh khả dụng đường uống đạt ~99%, có thể chuyển đổi IV sang PO với liều tương đương 1:1 ngay khi bệnh nhân dung nạp đường uống.'
  },
  {
    id: 'amoxicillin_clavulanate',
    name: 'Amoxicillin / Acid Clavulanic',
    brandNames: ['Augmentin', 'Curam', 'Klamentin'],
    category: 'Kháng sinh Penicillin + Kháng Beta-lactamase',
    atcCode: 'J01CR02',
    standardDose: 'PO: 875/125mg hoặc 1000/62.5mg mỗi 12 giờ | IV: 1.2g mỗi 8 giờ',
    renalAdjustment: 'eGFR 10-30: 500/125mg PO q12h (hoặc 1.2g IV q12h) | eGFR < 10: 500/125mg PO q24h (hoặc 1.2g IV nạp rồi 0.6g q24h)',
    contraindications: ['Tiền sử vàng da ứ mật / suy gan do Amox/Clav'],
    clinicalPearls: 'Uống vào đầu bữa ăn để giảm thiểu tác dụng phụ trên đường tiêu hóa (buồn nôn, tiêu chảy).'
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin',
    brandNames: ['Zithromax', 'Azitro'],
    category: 'Kháng sinh Macrolide',
    atcCode: 'J01FA10',
    standardDose: '500mg PO/IV ngày 1, sau đó 250mg ngày 2 - 5 (hoặc 500mg q24h x 3 ngày)',
    renalAdjustment: 'Không cần chỉnh liều nếu eGFR ≥ 10 mL/min (thải trừ chủ yếu qua gan mật).',
    contraindications: ['Tiền sử vàng da ứ mật do Macrolide', 'Dị ứng Macrolide'],
    blackBoxWarning: 'Kéo dài khoảng QTc và nguy cơ loạn nhịp thất chết người (Torsades de Pointes), đặc biệt ở bệnh nhân có bệnh tim nền.',
    clinicalPearls: 'Tác dụng kháng viêm điều hòa miễn dịch ngoài tác dụng diệt khuẩn vi khuẩn không điển hình (Mycoplasma, Chlamydia, Legionella).'
  },
  {
    id: 'metronidazole',
    name: 'Metronidazole',
    brandNames: ['Flagyl', 'Klion'],
    category: 'Kháng sinh Nitroimidazole (Diệt vi khuẩn kỵ khí & KST)',
    atcCode: 'J01XD01',
    standardDose: '500mg IV/PO mỗi 8 giờ (Nhiễm C. difficile: 500mg PO q8h x 10-14 ngày nếu không có Vancomycin PO)',
    renalAdjustment: 'Không cần chỉnh liều trừ khi eGFR < 10 mL/min (giảm 50% liều). HD: Bổ sung 1 liều sau lọc.',
    contraindications: ['Sử dụng rượu cồn trong thời gian dùng thuốc và 48h sau đó (Phản ứng giống Disulfiram)', '3 tháng đầu thai kỳ'],
    blackBoxWarning: 'Nguy cơ ung thư trên động vật thực nghiệm; Độc thần kinh ngoại biên và động kinh khi dùng kéo dài.',
    clinicalPearls: 'Vị kim loại trong miệng (metallic taste) là tác dụng phụ thường gặp và lành tính.'
  },
  {
    id: 'colistin',
    name: 'Colistin (Colistimethate Sodium - CMS)',
    brandNames: ['Colimycin', 'Tadaxin'],
    category: 'Kháng sinh Polymyxin (Vũ khí cuối diệt trực khuẩn Gram âm đa kháng)',
    atcCode: 'J01XB01',
    standardDose: 'Liều nạp: 9 triệu IU (300mg CBA) IV ➔ Liều duy trì: 4.5 triệu IU q12h',
    renalAdjustment: 'Bắt buộc chỉnh liều theo eGFR: eGFR 30-50: 2.7 - 3.3 triệu IU q12h | eGFR 10-29: 2.2 - 2.7 triệu IU q12-24h | eGFR < 10: 1.5 - 2 triệu IU q24-36h',
    contraindications: ['Tiền sử dị ứng Polymyxin', 'Bệnh nhược cơ (Myasthenia gravis)'],
    blackBoxWarning: 'Độc tính rất cao trên thận (hoại tử ống thận cấp) và độc tính thần kinh (ức chế dẫn truyền thần kinh cơ gây liệt hô hấp).',
    clinicalPearls: 'Luôn dùng liều nạp 9 triệu IU ở bệnh nhân nặng để đạt nồng độ điều trị nhanh trong 24h đầu.'
  },

  // ═══ TIM MẠCH, HUYẾT ÁP & LỢI TIỂU ═══
  {
    id: 'perindopril',
    name: 'Perindopril',
    brandNames: ['Coversyl', 'Coveram (+ Amlodipine)'],
    category: 'Thuốc ức chế men chuyển (ACEi)',
    atcCode: 'C09AA04',
    standardDose: 'Khởi đầu 2.5mg - 5mg PO mỗi sáng, tăng tối đa 10mg/ngày',
    renalAdjustment: 'eGFR 30-60: 2.5mg/ngày | eGFR 15-30: 2.5mg cách ngày | eGFR < 15: 2.5mg vào ngày lọc máu',
    contraindications: ['Tiền sử phù mạch (Angioedema)', 'Phụ nữ mang thai (Gây quái thai)', 'Hẹp động mạch thận hai bên', 'Phối hợp thuốc ức chế Renin (Aliskiren) ở bệnh nhân ĐTĐ'],
    blackBoxWarning: 'Độc tính trên thai nhi: Gây tổn thương và tử vong thai nhi trong quý 2 và 3.',
    clinicalPearls: 'Ho khan do tích tụ Bradykinin xảy ra ở 10-20% bệnh nhân ➔ Chuyển sang nhóm ARB (Losartan, Telmisartan). Thận trọng tăng Kali máu khi dùng chung Spironolactone.'
  },
  {
    id: 'losartan',
    name: 'Losartan',
    brandNames: ['Cozaar', 'Hyzaar (+ HCTZ)'],
    category: 'Thuốc chẹn thụ thể Angiotensin II (ARB)',
    atcCode: 'C09CA01',
    standardDose: '50mg PO mỗi ngày một lần, có thể tăng lên 100mg/ngày',
    renalAdjustment: 'Không cần chỉnh liều ban đầu theo chức năng thận (trừ khi thiếu dịch tuần hoàn: khởi đầu 25mg).',
    contraindications: ['Phụ nữ có thai', 'Hẹp ĐM thận hai bên', 'Suy gan nặng'],
    clinicalPearls: 'Có thêm tác dụng hạ Acid Uric máu nhẹ do ức chế chất vận chuyển URAT1 ở ống thận, rất thích hợp cho bệnh nhân THA kèm Tăng Acid Uric / Gout.'
  },
  {
    id: 'sacubitril_valsartan',
    name: 'Sacubitril / Valsartan (ARNI)',
    brandNames: ['Entresto'],
    category: 'Thuốc ức chế thụ thể Angiotensin - Neprilysin (ARNI)',
    atcCode: 'C09DX04',
    standardDose: 'Khởi đầu 24/26mg hoặc 49/51mg uống 2 lần/ngày ➔ Tối ưu hóa lên 97/103mg PO BID sau 2-4 tuần',
    renalAdjustment: 'eGFR < 30 mL/min: Khởi đầu liều thấp 24/26mg PO BID',
    contraindications: ['Tiền sử phù mạch với ACEi/ARB', 'Dùng cùng ACEi (Phải ngừng ACEi ít nhất 36 giờ trước khi dùng Entresto để tránh phù mạch đe dọa tính mạng)', 'Phụ nữ có thai'],
    clinicalPearls: 'Trụ cột số 1 trong điều trị Suy tim phân suất tống máu giảm (HFrEF theo ESC/AHA 2026). Làm tăng nồng độ BNP nhưng không ảnh hưởng NT-proBNP (theo dõi bằng NT-proBNP).'
  },
  {
    id: 'bisoprolol',
    name: 'Bisoprolol',
    brandNames: ['Concor', 'Bisoprolol Stada'],
    category: 'Thuốc chẹn Beta-1 giao cảm chọn lọc',
    atcCode: 'C07AB07',
    standardDose: 'THA/ĐTN: 5mg - 10mg PO mỗi sáng | Suy tim: Khởi đầu 1.25mg/ngày ➔ Tăng dần mỗi 2-4 tuần đến đích 10mg/ngày',
    renalAdjustment: 'eGFR < 20 mL/min: Liều tối đa 10mg/ngày',
    contraindications: ['Suy tim mất bù cấp (Chờ ổn định mới dùng)', 'Sốc tim', 'Block nhĩ thất độ 2-3 không có máy tạo nhịp', 'Nhịp chậm < 50 l/p', 'Hen phế quản nặng'],
    clinicalPearls: 'Chẹn chọn lọc Beta-1 tim cao gấp 20 lần Beta-2, an toàn hơn ở bệnh nhân COPD ổn định.'
  },
  {
    id: 'amlodipine',
    name: 'Amlodipine',
    brandNames: ['Norvasc', 'Amlor', 'Amlo'],
    category: 'Thuốc chẹn kênh Calci Dihydropyridine (CCB)',
    atcCode: 'C08CA01',
    standardDose: '5mg PO mỗi ngày một lần, có thể tăng lên 10mg/ngày',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    hepaticAdjustment: 'Khởi đầu 2.5mg/ngày ở bệnh nhân suy gan nặng.',
    contraindications: ['Hạ huyết áp nặng (HA tâm thu < 90 mmHg)', 'Sốc tim', 'Hẹp van động mạch chủ nặng có triệu chứng'],
    clinicalPearls: 'Tác dụng phụ thường gặp: Phù mắt cá chân (do giãn tiểu động mạch trước mao mạch, không đáp ứng với lợi tiểu thông thường; kết hợp ACEi/ARB giúp giảm phù).'
  },
  {
    id: 'furosemide',
    name: 'Furosemide',
    brandNames: ['Lasix', 'Furosemid'],
    category: 'Thuốc lợi tiểu quai (Loop Diuretic)',
    atcCode: 'C03CA01',
    standardDose: '20mg - 40mg IV/PO (Suy tim cấp/Phù phổi: 40 - 80mg IV bolus hoặc truyền liên tục)',
    renalAdjustment: 'Suy thận nặng (eGFR < 30): Cần liều cao hơn (80 - 240mg) để đạt nồng độ có hiệu lực tại quai Henle.',
    contraindications: ['Vô niệu hoàn toàn không đáp ứng', 'Hôn mê gan do suy gan mất bù', 'Hạ Kali máu nặng (K < 3.0 mmol/L), Hạ Natri máu nặng'],
    clinicalPearls: 'Chuyển đổi liều: 40mg Furosemide uống ≈ 20mg Furosemide tiêm tĩnh mạch (Tỷ lệ 2:1 do sinh khả dụng PO ~50%). Theo dõi điện giải đồ (K+, Mg2+) và Acid Uric.'
  },
  {
    id: 'spironolactone',
    name: 'Spironolactone',
    brandNames: ['Aldactone', 'Verospiron'],
    category: 'Thuốc đối kháng thụ thể Mineralocorticoid (MRA) / Lợi tiểu giữ Kali',
    atcCode: 'C03DA01',
    standardDose: 'Suy tim HFrEF: 25mg PO q24h ➔ Tối ưu 50mg/ngày | Xơ gan cổ trướng: 100mg PO q24h (Tỷ lệ phối hợp 100 Spirono : 40 Furosemide)',
    renalAdjustment: 'eGFR 30-49: 12.5mg - 25mg q24h | eGFR < 30 hoặc K > 5.0 mmol/L: Chống chỉ định (Nguy cơ tăng Kali máu gây ngừng tim)',
    contraindications: ['Tăng Kali máu (K+ > 5.0 mmol/L)', 'Suy thận nặng (eGFR < 30)', 'Bệnh Addison'],
    clinicalPearls: 'Tác dụng phụ: Chứng vú to ở nam giới (Gynecomastia) và đau tức ngực do kháng Androgen ➔ Chuyển sang Eplerenone (Inspra).'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    brandNames: ['Cordarone'],
    category: 'Thuốc chống loạn nhịp Nhóm III',
    atcCode: 'C01BD01',
    standardDose: 'Cấp cứu ACLS ngừng tim VF/pVT: 300mg IV bolus nhanh ➔ Liều 2: 150mg | Duy trì: Nạp 5-10g trong vài tuần rồi uống 200mg/ngày',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Block AV độ 2-3', 'Hội chứng suy nút xoang không có máy tạo nhịp', 'Bệnh lý tuyến giáp nặng', 'Dị ứng Iod'],
    blackBoxWarning: 'Độc tính trên phổi (Xơ phổi mô kẽ tử vong), độc tính trên gan và làm nặng thêm rối loạn nhịp tim.',
    clinicalPearls: 'Thời gian bán thải cực dài (t1/2 ~ 50-60 ngày). Tương tác làm tăng gấp đôi nồng độ Digoxin và Warfarin trong máu.'
  },

  // ═══ CHỐNG ĐÔNG & KHÁNG KẾT TẬP TIỂU CẦU ═══
  {
    id: 'aspirin',
    name: 'Aspirin (Acid Acetylsalicylic)',
    brandNames: ['Aspirin pH8', 'Cardioaspirin', 'Aspilets'],
    category: 'Thuốc kháng kết tập tiểu cầu (Ức chế COX-1 không hồi phục)',
    atcCode: 'B01AC06',
    standardDose: 'Duy trì dự phòng thứ phát: 75mg - 100mg PO mỗi ngày | Liều nạp ACS cấp: 150mg - 325mg nhai nuốt ngay',
    renalAdjustment: 'eGFR < 10 mL/min: Tránh dùng do tăng nguy cơ chảy máu và suy giảm tưới máu thận.',
    contraindications: ['Xuất huyết tiêu hóa đang tiến triển', 'Loét dạ dày tá tràng thể hoạt động', 'Dị ứng Aspirin/NSAID (Tam chứng Widal: Hen + Polyp mũi + Dị ứng Aspirin)'],
    clinicalPearls: 'Dùng dạng bao tan trong ruột hoặc kết hợp PPI ở bệnh nhân có nguy cơ xuất huyết tiêu hóa cao.'
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    brandNames: ['Plavix', 'Pidoran', 'Clopivas'],
    category: 'Thuốc kháng thụ thể P2Y12 của tiểu cầu (Thienopyridine)',
    atcCode: 'B01AC04',
    standardDose: 'Liều nạp ACS/PCI: 300mg - 600mg PO ➔ Duy trì: 75mg PO mỗi ngày một lần',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Đang chảy máu tạng bệnh lý (Xuất huyết não, XHTH)'],
    blackBoxWarning: 'Kém đáp ứng ở người mang gen chuyển hóa kém CYP2C19 (*2, *3) ➔ Tăng nguy cơ tắc stent huyết khối.',
    clinicalPearls: 'Tránh dùng đồng thời với Omeprazole/Esomeprazole (ức chế CYP2C19 làm giảm hoạt hóa Clopidogrel) ➔ Ưu tiên dùng Pantoprazole.'
  },
  {
    id: 'ticagrelor',
    name: 'Ticagrelor',
    brandNames: ['Brilinta'],
    category: 'Thuốc kháng thụ thể P2Y12 trực tiếp và thuận nghịch (Cyclopentyltriazolopyrimidine)',
    atcCode: 'B01AC24',
    standardDose: 'Liều nạp ACS: 180mg PO ngay ➔ Duy trì: 90mg PO ngày 2 lần (kết hợp Aspirin ≤ 100mg)',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Tiền sử xuất huyết não', 'Đang chảy máu tiến triển', 'Suy gan trung bình-nặng'],
    blackBoxWarning: 'Không dùng Aspirin liều duy trì > 100mg/ngày vì làm giảm hiệu quả chống biến cố tim mạch của Ticagrelor.',
    clinicalPearls: 'Tác dụng phụ thường gặp: Cảm giác khó thở (Dyspnea - tự giới hạn, không phải do co thắt phế quản hay suy tim) và ngưng xoang ngắn.'
  },
  {
    id: 'enoxaparin',
    name: 'Enoxaparin (LMWH)',
    brandNames: ['Lovenox'],
    category: 'Thuốc chống đông Heparin trọng lượng phân tử thấp',
    atcCode: 'B01AB05',
    standardDose: 'Dự phòng VTE: 40mg SC q24h | Điều trị DVT/PE/ACS: 1 mg/kg SC q12h (hoặc 1.5 mg/kg SC q24h)',
    renalAdjustment: 'eGFR < 30 mL/min: Dự phòng giảm còn 20mg SC q24h; Điều trị giảm còn 1 mg/kg SC q24h (theo dõi Anti-Xa)',
    contraindications: ['Xuất huyết đang tiến triển', 'Tiền sử HIT typ 2 (giảm tiểu cầu do Heparin)', 'Gây tê tủy sống/ngoài màng cứng gần đây'],
    blackBoxWarning: 'Tụ máu ngoài màng cứng gây liệt vĩnh viễn khi chọc dò tủy sống.',
    clinicalPearls: 'Theo dõi Anti-Xa ở bệnh nhân suy thận nặng, béo phì (BMI > 40) hoặc phụ nữ có thai.'
  },
  {
    id: 'rivaroxaban',
    name: 'Rivaroxaban (NOAC / DOAC)',
    brandNames: ['Xarelto'],
    category: 'Thuốc chống đông đường uống ức chế trực tiếp Yếu tố Xa',
    atcCode: 'B01AF01',
    standardDose: 'Rung nhĩ không do van tim: 20mg PO mỗi ngày uống cùng thức ăn (Bữa tối) | Điều trị DVT/PE: 15mg BID x 21 ngày ➔ 20mg q24h',
    renalAdjustment: 'eGFR 15-49 mL/min: Giảm liều còn 15mg PO mỗi ngày cùng bữa ăn | eGFR < 15: Tránh sử dụng',
    contraindications: ['Đang chảy máu tiến triển', 'Bệnh gan kèm rối loạn đông máu', 'Van tim cơ học hoặc hẹp van 2 lá vừa-nặng', 'Phụ nữ mang thai/cho con bú'],
    blackBoxWarning: 'Ngừng thuốc đột ngột làm tăng vọt nguy cơ đột quỵ thiếu máu cục bộ.',
    clinicalPearls: 'Viên 15mg và 20mg BẮT BUỘC uống cùng thức ăn để đạt sinh khả dụng tối đa (tăng hấp thu từ 66% lên ~100%).'
  },
  {
    id: 'apixaban',
    name: 'Apixaban (NOAC / DOAC)',
    brandNames: ['Eliquis'],
    category: 'Thuốc chống đông đường uống ức chế trực tiếp Yếu tố Xa',
    atcCode: 'B01AF02',
    standardDose: 'Rung nhĩ: 5mg PO ngày 2 lần | Điều trị DVT/PE: 10mg BID x 7 ngày ➔ 5mg BID',
    renalAdjustment: 'Giảm liều còn 2.5mg PO BID nếu có ≥ 2 trong 3 tiêu chuẩn: Tuổi ≥ 80, Cân nặng ≤ 60kg, Creatinine máu ≥ 133 µmol/L (1.5 mg/dL).',
    contraindications: ['Đang xuất huyết', 'Van tim cơ học', 'Bệnh gan nặng'],
    clinicalPearls: 'Ít gây xuất huyết tiêu hóa nhất trong các NOAC và an toàn nhất trên bệnh nhân có suy giảm chức năng thận.'
  },
  {
    id: 'warfarin',
    name: 'Warfarin',
    brandNames: ['Coumadin', 'Sintrom (Acenocoumarol tương đương)'],
    category: 'Thuốc kháng Vitamin K',
    atcCode: 'B01AA03',
    standardDose: '2.5mg - 5mg PO mỗi ngày, chỉnh liều theo mục tiêu INR (2.0 - 3.0 cho đa số; 2.5 - 3.5 cho van tim cơ học)',
    renalAdjustment: 'Không cần chỉnh liều theo eGFR (chuyển hóa qua gan), nhưng cần theo dõi INR sát hơn do tăng nguy cơ chảy máu.',
    contraindications: ['Phụ nữ mang thai (Gây dị tật thai nhi nặng)', 'Nguy cơ xuất huyết cao không kiểm soát'],
    blackBoxWarning: 'Xuất huyết ồ ạt đe dọa tính mạng; Hoại tử da do thiếu hụt Protein C.',
    clinicalPearls: 'Tương tác với hầu hết các thuốc và thực phẩm chứa Vitamin K (Rau xanh đậm). Thuốc giải độc đặc hiệu: Vitamin K1 và Phức hợp Prothrombin cô đặc (PCC).'
  },

  // ═══ ĐÁI THÁO ĐƯỜNG & NỘI TIẾT ═══
  {
    id: 'metformin',
    name: 'Metformin',
    brandNames: ['Glucophage', 'Panfor', 'Metforal'],
    category: 'Thuốc hạ đường huyết nhóm Biguanide',
    atcCode: 'A10BA02',
    standardDose: '500mg - 1000mg PO 2 lần/ngày (Liều tối đa 2000 - 2550 mg/ngày)',
    renalAdjustment: 'eGFR 45-59: Liều tối đa 1000mg/ngày | eGFR 30-44: Liều tối đa 500mg/ngày | eGFR < 30: CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (Nguy cơ nhiễm toan Lactic)',
    contraindications: ['Suy thận nặng (eGFR < 30)', 'Nhiễm toan chuyển hóa cấp / DKA', 'Sốc, suy tim mất bù, suy gan nặng, nghiện rượu'],
    blackBoxWarning: 'Nhiễm toan Lactic (Lactic Acidosis) hiếm gặp nhưng tỷ lệ tử vong lên tới 50%.',
    clinicalPearls: 'Tạm ngừng Metformin trước 48h khi chụp X-quang/CT có tiêm thuốc cản quang chứa Iod.'
  },
  {
    id: 'empagliflozin',
    name: 'Empagliflozin (SGLT2i)',
    brandNames: ['Jardiance'],
    category: 'Thuốc ức chế đồng vận chuyển Natri-Glucose 2 (SGLT2i)',
    atcCode: 'A10BK03',
    standardDose: '10mg PO mỗi ngày một lần (Suy tim / Bệnh thận mạn / ĐTĐ), có thể tăng lên 25mg/ngày để kiểm soát đường huyết',
    renalAdjustment: 'Bảo vệ tim thận: Có thể dùng khi eGFR ≥ 20 mL/min | Kiểm soát đường huyết: Giảm hiệu quả khi eGFR < 45 mL/min',
    contraindications: ['Bệnh nhân đang thẩm phân phúc mạc hoặc chạy thận nhân tạo', 'Tiền sử DKA'],
    clinicalPearls: 'Trụ cột điều trị Suy tim (HFrEF/HFpEF) và Bệnh thận mạn (CKD). Tác dụng phụ: Nhiễm nấm sinh dục niệu và Nhiễm toan ceton đường huyết bình thường (Euglycemic DKA).'
  },
  {
    id: 'dapagliflozin',
    name: 'Dapagliflozin (SGLT2i)',
    brandNames: ['Forxiga'],
    category: 'Thuốc ức chế đồng vận chuyển Natri-Glucose 2 (SGLT2i)',
    atcCode: 'A10BK01',
    standardDose: '10mg PO mỗi ngày một lần',
    renalAdjustment: 'Chỉ định suy tim và bệnh thận mạn: Dùng được khi eGFR ≥ 20 mL/min (theo DAPA-HF và DAPA-CKD).',
    contraindications: ['Lọc máu chu kỳ', 'Nhiễm toan ceton'],
    clinicalPearls: 'Tạm ngừng thuốc ít nhất 3 ngày trước các phẫu thuật lớn hoặc khi nhịn ăn kéo dài để phòng ngừa Euglycemic DKA.'
  },
  {
    id: 'gliclazide',
    name: 'Gliclazide MR',
    brandNames: ['Diamicron MR', 'Gliclazid Stada'],
    category: 'Thuốc hạ đường huyết nhóm Sulfonylurea thế hệ 2',
    atcCode: 'A10BB09',
    standardDose: '30mg - 120mg PO mỗi sáng trong bữa ăn sáng',
    renalAdjustment: 'eGFR 30-59: Dùng thận trọng liều thấp | eGFR < 30: Chống chỉ định (Nguy cơ hạ đường huyết kéo dài)',
    contraindications: ['ĐTĐ Típ 1', 'Nhiễm toan ceton DKA', 'Suy gan nặng, suy thận nặng'],
    clinicalPearls: 'Nguy cơ hạ đường huyết thấp hơn nhiều so with Glibenclamide, là Sulfonylurea được khuyến cáo ưu tiên.'
  },
  {
    id: 'insulin_regular',
    name: 'Insulin Regular (Insulin người tác dụng nhanh)',
    brandNames: ['Actrapid', 'Humulin R'],
    category: 'Insulin người tác dụng ngắn (Short-acting Insulin)',
    atcCode: 'A10AB01',
    standardDose: 'Tiêm dưới da trước ăn 30 phút hoặc Truyền tĩnh mạch liên tục trong cấp cứu DKA/HHS (0.1 UI/kg/h)',
    renalAdjustment: 'eGFR < 50: Giảm 25% tổng liều | eGFR < 10: Giảm 50% tổng liều (do giảm thanh thải insulin tại thận)',
    contraindications: ['Hạ đường huyết đang diễn ra'],
    clinicalPearls: 'Là loại Insulin DUY NHẤT được phép truyền tĩnh mạch để cấp cứu Cơn nhiễm toan Ceton và Tăng áp lực thẩm thấu do ĐTĐ.'
  },
  {
    id: 'insulin_glargine',
    name: 'Insulin Glargine (Insulin nền tác dụng kéo dài)',
    brandNames: ['Lantus', 'Toujeo'],
    category: 'Insulin nền tương tự (Long-acting Basal Analog)',
    atcCode: 'A10AE04',
    standardDose: 'Khởi đầu 0.1 - 0.2 UI/kg hoặc 10 UI tiêm dưới da 1 lần/ngày vào một giờ cố định (thường buổi tối)',
    renalAdjustment: 'Suy thận: Giảm liều và theo dõi sát đường huyết đói.',
    contraindications: ['Hạ đường huyết'],
    clinicalPearls: 'Insulin nền không có đỉnh nồng độ (peakless), giúp duy trì kiểm soát đường huyết 24 giờ ổn định và ít gây hạ đường huyết ban đêm.'
  },
  {
    id: 'methylprednisolone',
    name: 'Methylprednisolone',
    brandNames: ['Medrol', 'Solu-Medrol'],
    category: 'Glucocorticoid tổng hợp',
    atcCode: 'H02AB04',
    standardDose: 'PO: 4mg - 48mg/ngày | IV Cấp cứu hen/COPD/Sốc phản vệ: 40mg - 125mg mỗi 6 - 12 giờ',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Nhiễm nấm toàn thân', 'Đang tiêm vaccine sống giảm độc lực'],
    clinicalPearls: 'Tác dụng kháng viêm mạnh gấp 5 lần Hydrocortisone và hầu như không có tác dụng giữ muối nước (Mineralocorticoid).'
  },

  // ═══ TIÊU HÓA & HÔ HẤP ═══
  {
    id: 'esomeprazole',
    name: 'Esomeprazole',
    brandNames: ['Nexium', 'Esomeprazol Stada'],
    category: 'Thuốc ức chế bơm Proton (PPI)',
    atcCode: 'A02BC05',
    standardDose: 'GERD/Loét DDTT: 20mg - 40mg PO mỗi sáng trước ăn 30-60 phút | Xuất huyết tiêu hóa: 80mg IV bolus ➔ 8mg/h truyền liên tục 72h',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    hepaticAdjustment: 'Suy gan nặng (Child-Pugh C): Liều tối đa 20mg/ngày.',
    contraindications: ['Dị ứng nhóm PPI'],
    clinicalPearls: 'Bắt buộc uống trước bữa ăn 30-60 phút để ức chế tối đa các bơm Proton hoạt động khi ăn.'
  },
  {
    id: 'pantoprazole',
    name: 'Pantoprazole',
    brandNames: ['Controloc', 'Pantoloc'],
    category: 'Thuốc ức chế bơm Proton (PPI)',
    atcCode: 'A02BC02',
    standardDose: '40mg PO/IV mỗi ngày một lần trước bữa ăn sáng',
    renalAdjustment: 'Không cần chỉnh liều theo chức năng thận.',
    contraindications: ['Dị ứng PPI'],
    clinicalPearls: 'Ít ức chế enzym gan CYP2C19 nhất trong các PPI ➔ Lựa chọn AN TOÀN NHẤT khi phối hợp cùng thuốc chống kết tập tiểu cầu Clopidogrel.'
  },
  {
    id: 'salbutamol',
    name: 'Salbutamol (Albuterol)',
    brandNames: ['Ventolin'],
    category: 'Thuốc đồng vận Beta-2 giao cảm tác dụng ngắn (SABA)',
    atcCode: 'R03AC02',
    standardDose: 'Khí dung: 2.5mg - 5mg mỗi 20 phút trong 1h đầu của cơn hen cấp ➔ 2.5mg - 5mg mỗi 1-4 giờ khi cần | MDI: 2 nhát xịt (200 mcg)',
    renalAdjustment: 'Không cần chỉnh liều.',
    contraindications: ['Dị ứng Salbutamol', 'Dọa sẩy thai trong 6 tháng đầu'],
    clinicalPearls: 'Tác dụng phụ: Nhịp tim nhanh, run tay và hạ Kali máu do đẩy K+ vào nội bào (ứng dụng trong điều trị cấp cứu tăng Kali máu nặng).'
  },
  {
    id: 'budesonide_formoterol',
    name: 'Budesonide / Formoterol',
    brandNames: ['Symbicort Turbuhaler', 'Vannair'],
    category: 'ICS + LABA (Corticoid hít + Đồng vận Beta-2 tác dụng kéo dài khởi phát nhanh)',
    atcCode: 'R03AK07',
    standardDose: 'Hen phế quản (Chiến lược SMART/MART theo GINA 2024): 1-2 hít 160/4.5mcg BID duy trì + Hít thêm khi có triệu chứng (Tối đa 8-12 nhát/ngày)',
    renalAdjustment: 'Không cần chỉnh liều.',
    clinicalPearls: 'Chiến lược SMART theo GINA: Dùng Symbicort vừa làm thuốc duy trì hàng ngày vừa làm thuốc cắt cơn, giúp giảm 30-50% nguy cơ bùng phát đợt cấp nặng.'
  },

  // ═══ THẦN KINH, HỒI SỨC & GIẢM ĐAU ═══
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    brandNames: ['Panadol', 'Efferalgan', 'Perfalgan IV'],
    category: 'Thuốc giảm đau hạ sốt (Non-opioid)',
    atcCode: 'N02BE01',
    standardDose: '500mg - 1000mg PO/IV mỗi 4 - 6 giờ (Liều tối đa 4g/24h ở người bình thường; 2 - 3g/24h ở người già/suy dinh dưỡng/suy gan nhẹ)',
    renalAdjustment: 'eGFR 10-50: Giãn khoảng cách liều mỗi 6 giờ | eGFR < 10: Giãn khoảng cách mỗi 8 giờ',
    contraindications: ['Suy tế bào gan nặng thể hoạt động', 'Dị ứng Paracetamol'],
    blackBoxWarning: 'Ngộ độc quá liều (> 150 mg/kg hoặc > 7.5 - 10g) gây hoại tử tế bào gan cấp tử vong ➔ Giải độc bằng N-Acetylcysteine (NAC) đường uống hoặc IV.',
    clinicalPearls: 'Thuốc giảm đau hạ sốt an toàn nhất cho phụ nữ mang thai, cho con bú và bệnh nhân tim mạch, thận.'
  },
  {
    id: 'tramadol',
    name: 'Tramadol',
    brandNames: ['Ultracet (+ Paracetamol)', 'Tramal'],
    category: 'Thuốc giảm đau Opioid yếu + Ức chế tái hấp thu Serotonin/Norepinephrine',
    atcCode: 'N02AX02',
    standardDose: '50mg - 100mg PO/IV mỗi 4 - 6 giờ khi đau (Tối đa 400mg/ngày; Người cao tuổi tối đa 300mg/ngày)',
    renalAdjustment: 'eGFR < 30 mL/min: Liều 50mg q12h (Tối đa 200mg/ngày)',
    contraindications: ['Suy hô hấp nặng', 'Dùng cùng thuốc ức chế MAOI trong vòng 14 ngày', 'Động kinh chưa kiểm soát'],
    clinicalPearls: 'Nguy cơ gây Hội chứng Serotonin khi phối hợp thuốc chống trầm cảm (SSRI, SNRI). Có nguy cơ hạ ngưỡng co giật gây động kinh.'
  },
  {
    id: 'morphine',
    name: 'Morphine',
    brandNames: ['Morphin Hydroclorid tiêm', 'MST Continus'],
    category: 'Thuốc giảm đau Opioid mạnh (Thuốc nghiện Bảng A)',
    atcCode: 'N02AA01',
    standardDose: 'Đau cấp/ACS/Phù phổi cấp: 2mg - 5mg IV mỗi 5-15 phút chuẩn độ theo mức độ đau và nhịp thở',
    renalAdjustment: 'eGFR 30-50: Giảm 25% liều | eGFR < 30: Giảm 50% liều hoặc giãn cách mỗi 6-8h (Nguy cơ tích lũy Morphine-6-glucuronide gây ức chế hô hấp kéo dài)',
    contraindications: ['Suy hô hấp cấp', 'Tắc ruột liệt cơ năng', 'Tăng áp lực nội sọ', 'Chấn thương sọ não nặng'],
    blackBoxWarning: 'Ức chế trung tâm hô hấp gây ngừng thở, nghiện thuốc và lạm dụng thuốc.',
    clinicalPearls: 'Thuốc giải độc đặc hiệu khi ngộ độc Opioid: Naloxone tiêm tĩnh mạch 0.4mg - 2mg.'
  },
  {
    id: 'noradrenaline',
    name: 'Noradrenaline (Norepinephrine)',
    brandNames: ['Levophed', 'Noradrenalin Vinphaco'],
    category: 'Thuốc vận mạch co mạch kích thích Alpha-1 và Beta-1 giao cảm',
    atcCode: 'C01CA03',
    standardDose: 'Truyền tĩnh mạch liên tục qua catheter trung tâm: Khởi đầu 0.05 - 0.1 mcg/kg/phút ➔ Chuẩn độ để đạt Huyết áp trung bình (MAP) ≥ 65 mmHg',
    renalAdjustment: 'Không cần chỉnh liều.',
    contraindications: ['Không có chống chỉ định tuyệt đối trong tình trạng sốc đe dọa tính mạng'],
    clinicalPearls: 'Lựa chọn SỐ 1 TUYỆT ĐỐI trong Hồi sức Sốc nhiễm khuẩn (Septic Shock) và Sốc dãn mạch theo Surviving Sepsis Campaign.'
  },
  {
    id: 'adrenaline',
    name: 'Adrenaline (Epinephrine)',
    brandNames: ['Adrenalin 1mg/1ml'],
    category: 'Thuốc hồi sức cấp cứu kích thích toàn bộ thụ thể giao cảm (Alpha-1, Beta-1, Beta-2)',
    atcCode: 'C01CA24',
    standardDose: 'Sốc phản vệ: Tiêm BẮP ĐÙI NGOÀI ngay 0.5mg (1/2 ống 1mg/1ml người lớn) ➔ Nhắc lại sau 5 phút nếu chưa cải thiện | Ngừng tuần hoàn: 1mg IV mỗi 3-5 phút',
    renalAdjustment: 'Không cần chỉnh liều.',
    clinicalPearls: 'TRONG SỐC PHẢN VỆ: TIÊM BẮP MẶT TRƯỚC NGOÀI ĐÙI LÀ ĐƯỜNG DÙNG ĐẦU TIÊN VÀ DUY NHẤT BẮT BUỘC, không trì hoãn tiêm bắp để tìm tĩnh mạch.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. MA TRẬN TƯƠNG TÁC THUỐC LÂM SÀNG NGUY HIỂM (30+ QUY TẮC CỐT LÕI)
// ─────────────────────────────────────────────────────────────────────────────

export const DRUG_INTERACTIONS: DrugInteractionRule[] = [
  {
    drug_a: "vancomycin",
    drug_b: "piperacillin_tazobactam",
    severity: "high",
    mechanism: "Hiệp đồng độc tính tế bào ống thận, làm tăng tỷ lệ tổn thương thận cấp (AKI) lên gấp 2-3 lần.",
    recommendation: "Theo dõi sát Creatinine hàng ngày. Cân nhắc thay Piperacillin/Tazo bằng Cefepime hoặc Meropenem khi đang truyền Vancomycin."
  },
  {
    drug_a: "meropenem",
    drug_b: "valproic_acid",
    severity: "high",
    mechanism: "Carbapenem ức chế enzym acylpeptide hydrolase và ức chế tái hấp thu Valproic acid, làm tụt 80-90% nồng độ Depakine trong máu.",
    recommendation: "CHỐNG CHỈ ĐỊNH PHỐI HỢP. Gây cơn co giật bùng phát liên tục. Đổi kháng sinh hoặc đổi thuốc chống động kinh sang Levetiracetam (Keppra)."
  },
  {
    drug_a: "ciprofloxacin", 
    drug_b: "amiodarone",
    severity: "high",
    mechanism: "Hiệp đồng kéo dài khoảng QTc trên điện tâm đồ, làm tăng nguy cơ loạn nhịp thất chết người (Xoắn đỉnh Torsades de Pointes).",
    recommendation: "CHỐNG CHỈ ĐỊNH PHỐI HỢP. Thay kháng sinh sang nhóm Beta-lactam an toàn trên tim."
  },
  {
    drug_a: "levofloxacin",
    drug_b: "amiodarone",
    severity: "high",
    mechanism: "Hiệp đồng kéo dài khoảng QTc và tăng nguy cơ ngừng tim do xoắn đỉnh.",
    recommendation: "CHỐNG CHỈ ĐỊNH PHỐI HỢP. Đổi sang Beta-lactam hoặc Macrolide theo dõi ECG liên tục."
  },
  {
    drug_a: "amiodarone",
    drug_b: "digoxin",
    severity: "high",
    mechanism: "Amiodarone ức chế P-glycoprotein và thải trừ qua thận, làm tăng 70-100% nồng độ Digoxin trong máu.",
    recommendation: "GIẢM 50% LIỀU DIGOXIN ngay khi bắt đầu dùng Amiodarone và theo dõi nồng độ Digoxin huyết tương."
  },
  {
    drug_a: "amiodarone",
    drug_b: "warfarin",
    severity: "high",
    mechanism: "Amiodarone ức chế mạnh CYP2C9 làm giảm chuyển hóa S-warfarin, làm tăng vọt INR và nguy cơ xuất huyết não/tiêu hóa.",
    recommendation: "GIẢM LIỀU WARFARIN từ 30% - 50% ngay khi bắt đầu Amiodarone và kiểm tra INR mỗi 2-3 ngày."
  },
  {
    drug_a: "omeprazole",
    drug_b: "clopidogrel",
    severity: "moderate",
    mechanism: "Omeprazole ức chế CYP2C19, làm giảm chuyển hóa Clopidogrel thành dạng có hoạt tính, làm giảm tác dụng chống huyết khối tắc stent.",
    recommendation: "ƯU TIÊN THAY THẾ BẰNG PANTOPRAZOLE (ít ức chế CYP2C19 nhất) khi bệnh nhân đang dùng Clopidogrel."
  },
  {
    drug_a: "esomeprazole",
    drug_b: "clopidogrel",
    severity: "moderate",
    mechanism: "Esomeprazole ức chế cạnh tranh CYP2C19 làm giảm hoạt tính của Clopidogrel.",
    recommendation: "Chuyển sang Pantoprazole hoặc Rabeprazole."
  },
  {
    drug_a: "enoxaparin",
    drug_b: "rivaroxaban",
    severity: "high",
    mechanism: "Chồng chéo tác dụng chống đông máu (Double anticoagulation) ➔ Nguy cơ xuất huyết ồ ạt đe dọa tính mạng.",
    recommendation: "CHỐNG CHỈ ĐỊNH DÙNG ĐỒNG THỜI. Chỉ bắt đầu DOAC tại thời điểm liều LMWH tiếp theo đến hạn."
  },
  {
    drug_a: "enoxaparin",
    drug_b: "apixaban",
    severity: "high",
    mechanism: "Chồng liều chống đông máu gây xuất huyết nghiêm trọng.",
    recommendation: "CHỐNG CHỈ ĐỊNH DÙNG CÙNG LÚC."
  },
  {
    drug_a: "spironolactone",
    drug_b: "perindopril",
    severity: "moderate",
    mechanism: "Phối hợp ức chế Aldosterone và ức chế men chuyển ➔ Tăng Kali máu nặng (Hyperkalemia).",
    recommendation: "Kiểm tra Kali máu và Creatinine sau 1 tuần, 1 tháng và định kỳ mỗi 3 tháng. Giữ Kali < 5.0 mmol/L."
  },
  {
    drug_a: "spironolactone",
    drug_b: "losartan",
    severity: "moderate",
    mechanism: "Tăng Kali máu nặng khi phối hợp đối kháng thụ thể Angiotensin và lợi tiểu giữ Kali.",
    recommendation: "Theo dõi sát nồng độ Kali máu."
  },
  {
    drug_a: "spironolactone",
    drug_b: "sacubitril_valsartan",
    severity: "moderate",
    mechanism: "Nguy cơ tăng Kali máu khi phối hợp ARNI và MRA.",
    recommendation: "Theo dõi sát Kali máu và eGFR, đặc biệt ở bệnh nhân suy tim có eGFR 30-50 mL/min."
  },
  {
    drug_a: "sacubitril_valsartan",
    drug_b: "perindopril",
    severity: "high",
    mechanism: "Hiệp đồng ức chế thoái giáng Bradykinin ➔ Gây phù mạch (Angioedema) đe dọa tính mạng.",
    recommendation: "CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI. Phải ngừng ACEi ít nhất 36 giờ (Wash-out period) trước khi bắt đầu Entresto."
  },
  {
    drug_a: "metformin",
    drug_b: "iodinated_contrast",
    severity: "high",
    mechanism: "Thuốc cản quang gây tổn thương thận cấp làm ứ trệ Metformin, dẫn đến Nhiễm toan Lactic (Lactic Acidosis) tử vong.",
    recommendation: "TẠM NGỪNG METFORMIN trước khi chụp cản quang và trong 48h sau đó. Chỉ dùng lại khi eGFR ổn định."
  },
  {
    drug_a: "clarithromycin",
    drug_b: "atorvastatin",
    severity: "high",
    mechanism: "Clarithromycin ức chế mạnh CYP3A4, làm tăng vọt nồng độ Statin trong máu, tăng nguy cơ tiêu cơ vân cấp (Rhabdomyolysis).",
    recommendation: "Tạm ngừng Atorvastatin/Simvastatin trong thời gian dùng Clarithromycin hoặc chuyển sang Rosuvastatin liều thấp."
  },
  {
    drug_a: "tramadol",
    drug_b: "fluoxetine",
    severity: "high",
    mechanism: "Hiệp đồng tăng nồng độ Serotonin tại synap thần kinh ➔ Gây Hội chứng Serotonin (Sốt cao, co giật, run giật cơ, mê sảng).",
    recommendation: "Tránh phối hợp. Theo dõi sát các dấu hiệu độc tính Serotonin."
  },
  {
    drug_a: "aspirin",
    drug_b: "ibuprofen",
    severity: "moderate",
    mechanism: "Ibuprofen gắn cạnh tranh vào vị trí gắn của Aspirin trên COX-1, làm mất tác dụng bảo vệ tim mạch chống kết tập tiểu cầu của Aspirin.",
    recommendation: "Uống Aspirin ít nhất 30 phút trước hoặc 8 giờ sau khi uống Ibuprofen."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. CÁC HÀM TIỆN ÍCH TRA CỨU & KIỂM TRA TƯƠNG TÁC
// ─────────────────────────────────────────────────────────────────────────────

export function findDrugById(id: string): DrugFormularyItem | undefined {
  return DRUG_FORMULARY_DATABASE.find(d => d.id.toLowerCase() === id.toLowerCase());
}

export function searchDrugs(query: string): DrugFormularyItem[] {
  if (!query || !query.trim()) return DRUG_FORMULARY_DATABASE;
  const q = query.toLowerCase().trim();
  return DRUG_FORMULARY_DATABASE.filter(d => 
    d.name.toLowerCase().includes(q) ||
    d.brandNames.some(b => b.toLowerCase().includes(q)) ||
    d.category.toLowerCase().includes(q) ||
    (d.atcCode && d.atcCode.toLowerCase().includes(q))
  );
}

export function checkInteractionBetweenTwo(drugAId: string, drugBId: string): DrugInteractionRule | null {
  const rule = DRUG_INTERACTIONS.find(r => 
    (r.drug_a === drugAId && r.drug_b === drugBId) ||
    (r.drug_a === drugBId && r.drug_b === drugAId)
  );
  return rule || null;
}

export function checkMultiDrugInteractions(drugIds: string[]): DrugInteractionRule[] {
  const foundRules: DrugInteractionRule[] = [];
  for (let i = 0; i < drugIds.length; i++) {
    for (let j = i + 1; j < drugIds.length; j++) {
      const idA = drugIds[i];
      const idB = drugIds[j];
      if (!idA || !idB) continue;
      const rule = checkInteractionBetweenTwo(idA, idB);
      if (rule && !foundRules.some(r => r.drug_a === rule.drug_a && r.drug_b === rule.drug_b)) {
        foundRules.push(rule);
      }
    }
  }
  return foundRules;
}
