/**
 * CliniPortal — Clinical Pharmacology Core Database (TypeScript Module)
 */
import { Drug, DrugInteraction, PKParameter, AntidoteProtocol } from './types';

export const DRUGS_DB_DATA: Drug[] = [
  {
    id: "amox_clav",
    name: "Amoxicillin / Clavulanate",
    brandNames: ["Augmentin", "Clavulin", "Amoksiklav"],
    drugClass: "Kháng sinh (Penicillin + β-lactamase inhibitor)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "B",
    mechanism: "Amoxicillin ức chế tổng hợp thành tế bào vi khuẩn; Acid Clavulanic ức chế không hồi phục enzym beta-lactamase.",
    blackBoxWarning: null,
    indications: [
      "Nhiễm khuẩn hô hấp trên/dưới (Viêm phổi mắc phải cộng đồng, viêm xoang cấp, viêm tai giữa)",
      "Nhiễm khuẩn da và mô mềm",
      "Nhiễm khuẩn đường tiết niệu không biến chứng",
      "Nhiễm khuẩn răng miệng"
    ],
    dosage: {
      standardAdult: "875/125 mg PO mỗi 12h, hoặc 500/125 mg PO mỗi 8h (IV: 1000/200 mg mỗi 8h)",
      maxAdultDaily: "2000 mg/ngày (tính theo Amoxicillin)",
      pediatric: "25–45 mg/kg/ngày chia 2 lần (theo Amoxicillin)",
      renalNote: "CrCl 10–30 mL/min: 500/125 mg mỗi 12h (không dùng viên 875 mg). CrCl < 10: 500/125 mg mỗi 24h."
    },
    renalAdjustment: {
      formula: "Cockcroft-Gault",
      brackets: [
        { crcl: ">50", recommendation: "Không cần chỉnh liều (875/125 mg q12h)" },
        { crcl: "10-30", recommendation: "500/125 mg PO mỗi 12 giờ. Không dùng viên 875mg" },
        { crcl: "<10", recommendation: "500/125 mg PO mỗi 24 giờ" },
        { dialysis: "HD", recommendation: "500/125 mg PO mỗi 24h + 1 liều bổ sung sau lọc máu" }
      ]
    },
    hepaticWarning: "Thận trọng: Nguy cơ viêm gan/ứ mật do Clavulanate (đặc biệt nam giới cao tuổi).",
    adverseEffects: [
      "Tiêu chảy (phổ biến do rối loạn vi khuẩn đường ruột)",
      "Buồn nôn, nôn, đầy bụng",
      "Phát ban dạng sởi, mày đay",
      "Tăng men gan ALT/AST thoáng qua",
      "Viêm đại tràng giả mạc (C. difficile)"
    ],
    contraindications: [
      "Tiền sử dị ứng nặng với Penicillin hoặc Cephalosporin (sốc phản vệ, hội chứng Stevens-Johnson)",
      "Tiền sử vàng da / suy gan liên quan Amoxicillin/Clavulanate"
    ],
    monitoring: ["Dấu hiệu tiêu chảy, chức năng gan nếu dùng kéo dài > 14 ngày"],
    counseling: ["Uống ngay trước hoặc đầu bữa ăn để giảm kích ứng dạ dày và tăng hấp thu."]
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    brandNames: ["Cipro", "Ciprobay", "Ciflox"],
    drugClass: "Kháng sinh Fluoroquinolone (Thế hệ 2)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    mechanism: "Ức chế DNA gyrase (topoisomerase II) và topoisomerase IV của vi khuẩn, ngăn cản sao chép DNA.",
    blackBoxWarning: "Nguy cơ viêm gân & đứt gân Achilles, bệnh thần kinh ngoại biên không hồi phục, làm nặng bệnh Nhược cơ (Myasthenia Gravis). Tránh dùng trừ khi không có lựa chọn thay thế.",
    indications: [
      "Nhiễm khuẩn tiết niệu phức tạp & Viêm thận bể thận cấp",
      "Viêm tuyến tiền liệt cấp/mạn tính",
      "Tiêu chảy nhiễm trùng do vi khuẩn xâm lấn (Salmonella, Shigella)",
      "Nhiễm khuẩn xương khớp, viêm xương tủy"
    ],
    dosage: {
      standardAdult: "PO: 500–750 mg mỗi 12h. IV: 400 mg mỗi 8–12h",
      maxAdultDaily: "1500 mg/ngày (PO)",
      pediatric: "Tránh dùng thường quy cho trẻ < 18 tuổi trừ bệnh than hoặc nhiễm trùng nặng.",
      renalNote: "CrCl 30–50: 250–500 mg mỗi 12h. CrCl < 30: 250–500 mg mỗi 18–24h."
    },
    renalAdjustment: {
      formula: "Cockcroft-Gault",
      brackets: [
        { crcl: ">50", recommendation: "Liều chuẩn: 500-750 mg mỗi 12h" },
        { crcl: "30-50", recommendation: "250-500 mg mỗi 12h" },
        { crcl: "<30", recommendation: "250-500 mg mỗi 18-24h" }
      ]
    },
    adverseEffects: [
      "Kéo dài khoảng QT trên ECG, nguy cơ xoắn đỉnh",
      "Đau khớp, viêm gân Achilles",
      "Chóng mặt, mất ngủ, ảo giác, co giật",
      "Nhạy cảm ánh sáng (photosensitivity)"
    ],
    contraindications: [
      "Dị ứng với Quinolone",
      "Đang dùng đồng thời Tizanidine",
      "Tiền sử bệnh lý gân do Quinolone"
    ]
  },
  {
    id: "metoprolol_succ",
    name: "Metoprolol Succinate ER",
    brandNames: ["Betaloc ZOK", "Toprol-XL"],
    drugClass: "Chẹn Beta-1 Giao Cảm Chọn Lọc (Beta-Blocker)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "C",
    mechanism: "Ức chế cạnh tranh chọn lọc thụ thể Beta-1 adrenergic ở cơ tim, giảm tần số tim, giảm co bóp và ức chế tiết renin.",
    blackBoxWarning: "Tránh ngừng thuốc đột ngột ở bệnh nhân mạch vành vì có thể gây đau thắt ngực dội ngược, nhồi máu cơ tim hoặc loạn nhịp tử vong.",
    indications: [
      "Tăng huyết áp nguyên phát",
      "Suy tim mạn tính phân suất tống máu giảm (HFrEF NYHA II-IV)",
      "Bệnh tim thiếu máu cục bộ, đau thắt ngực ổn định",
      "Kiểm soát tần số thất trong rung nhĩ"
    ],
    dosage: {
      standardAdult: "25–100 mg PO 1 lần/ngày vào buổi sáng (Suy tim khởi đầu 12.5–25 mg/ngày, chỉnh liều mỗi 2 tuần đến đích 200 mg/ngày)",
      maxAdultDaily: "200 mg/ngày",
      renalNote: "Không cần chỉnh liều theo chức năng thận (chuyển hóa qua gan CYP2D6)."
    },
    adverseEffects: [
      "Nhịp tim chậm, block nhĩ thất (AV Block)",
      "Hạ huyết áp tư thế, mệt mỏi chóng mặt",
      "Co thắt phế quản (ở liều cao làm mất tính chọn lọc beta-1)",
      "Rối loạn cương dương, che lấp triệu chứng hạ đường huyết (trừ vã mồ hôi)"
    ],
    contraindications: [
      "Nhịp tim chậm xoang < 45-50 l/p, Block AV độ II hoặc III (chưa đặt máy tạo nhịp)",
      "Sốc tim, suy tim mất bù cấp đang dùng inotrope",
      "Hen phế quản nặng hoặc co thắt phế quản đang hoạt động"
    ]
  },
  {
    id: "sacubitril_valsartan",
    name: "Sacubitril / Valsartan (ARNI)",
    brandNames: ["Entresto"],
    drugClass: "Ức Chế Thụ Thể Angiotensin & Neprilysin (ARNI)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "D",
    mechanism: "Sacubitril ức chế enzym Neprilysin (tăng nồng độ peptid lợi niệu BNP/ANP, giãn mạch, thải muối); Valsartan ức chế chọn lọc thụ thể AT1 của Angiotensin II.",
    blackBoxWarning: "Độc tính thai nhi: Gây tổn thương và tử vong thai nhi. Ngừng ngay khi phát hiện có thai.",
    indications: [
      "Suy tim phân suất tống máu giảm (HFrEF EF ≤ 40%)",
      "Suy tim phân suất tống máu giảm nhẹ (HFmrEF)"
    ],
    dosage: {
      standardAdult: "Khởi đầu 24/26 mg hoặc 49/51 mg PO b.i.d. Tăng liều mỗi 2-4 tuần đến liều đích 97/103 mg PO b.i.d",
      maxAdultDaily: "97/103 mg PO 2 lần/ngày (tổng 200 mg b.i.d)",
      renalNote: "eGFR < 30 mL/min: Khởi đầu 24/26 mg PO 2 lần/ngày."
    },
    adverseEffects: [
      "Hạ huyết áp triệu chứng (phổ biến hơn ACEi)",
      "Tăng Kali máu (Hyperkalemia)",
      "Tăng Creatinine huyết thanh thoáng qua",
      "Phù mạch (Angioedema)"
    ],
    contraindications: [
      "Dùng đồng thời với ACEi (Bắt buộc cách nhau tối thiểu 36 giờ washout)",
      "Tiền sử phù mạch liên quan ACEi/ARB",
      "Phụ nữ có thai hoặc đang cho con bú"
    ]
  },
  {
    id: "empagliflozin",
    name: "Empagliflozin",
    brandNames: ["Jardiance"],
    drugClass: "Ức Chế Đồng Vận Chuyển Natri-Glucose 2 (SGLT2i)",
    category: "Nội tiết & Tim Mạch",
    routes: ["PO"],
    pregnancyCategory: "C",
    mechanism: "Ức chế chọn lọc protein SGLT2 tại ống lượn gần thận, giảm tái hấp thu glucose và natri, tăng thải đường niệu và giảm áp lực cầu thận.",
    blackBoxWarning: null,
    indications: [
      "Đái tháo đường type 2 (kiểm soát đường huyết & bảo vệ tim mạch)",
      "Suy tim mạn tính (HFrEF và HFpEF không phân biệt EF)",
      "Bệnh thận mạn (CKD) có nguy cơ tiến triển"
    ],
    dosage: {
      standardAdult: "10 mg PO 1 lần/ngày vào buổi sáng (có thể tăng lên 25 mg/ngày trong ĐTĐ)",
      maxAdultDaily: "25 mg/ngày",
      renalNote: "eGFR 20–45: Dùng liều 10 mg/ngày (chỉ định suy tim/CKD). eGFR < 20: Không khuyến cáo khởi đầu nhưng có thể tiếp tục 10 mg/ngày cho đến khi lọc máu."
    },
    adverseEffects: [
      "Nhiễm nấm sinh dục (Candida), nhiễm khuẩn tiết niệu",
      "Nhiễm toan ceton ĐTĐ với đường huyết bình thường (Euglycemic DKA)",
      "Giảm thể tích tuần hoàn, tụt huyết áp tư thế",
      "Hoại tử Fournier (viêm cân hoại tử vùng đáy chậu - rất hiếm)"
    ],
    contraindications: [
      "Đái tháo đường type 1 (nguy cơ cao DKA)",
      "Bệnh nhân đang lọc máu (HD/PD)"
    ]
  },
  {
    id: "omeprazole",
    name: "Omeprazole",
    brandNames: ["Losec", "Prilosec", "Omez"],
    drugClass: "Ức Chế Bơm Proton (PPI)",
    category: "Tiêu hóa",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    mechanism: "Ức chế không thuận nghịch enzym H+/K+ ATPase tại tế bào viền dạ dày, ngăn chặn giai đoạn cuối của bài tiết acid hydrocloric.",
    blackBoxWarning: null,
    indications: [
      "Loét dạ dày - tá tràng",
      "Trào ngược dạ dày thực quản (GERD), viêm thực quản xói mòn",
      "Phối hợp diệt trừ Helicobacter pylori",
      "Dự phòng loét do stress / NSAIDs ở bệnh nhân nguy cơ cao"
    ],
    dosage: {
      standardAdult: "20–40 mg PO 1 lần/ngày vào buổi sáng trước ăn 30-60 phút (Xuất huyết tiêu hóa: Bolus IV 80 mg rồi truyền 8 mg/h)",
      maxAdultDaily: "80 mg/ngày (Hội chứng Zollinger-Ellison có thể lên tới 120 mg/ngày)"
    },
    adverseEffects: [
      "Nhức đầu, tiêu chảy, đau bụng",
      "Dùng kéo dài (>1 năm): Hạ Magie máu, giảm hấp thu Vitamin B12, loãng xương gãy xương",
      "Tăng nguy cơ nhiễm trùng Clostridioides difficile và viêm phổi mắc phải cộng đồng",
      "Tương tác CYP2C19: Giảm chuyển hóa Clopidogrel thành dạng có hoạt tính"
    ],
    contraindications: [
      "Quá mẫn với PPI",
      "Dùng đồng thời với Rilpivirine"
    ]
  },
  {
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    brandNames: ["Panadol", "Efferalgan", "Tylenol", "Perfalgan"],
    drugClass: "Giảm Đau - Hạ Sốt Không Opioid",
    category: "Giảm đau & Hạ sốt",
    routes: ["PO", "IV", "PR"],
    pregnancyCategory: "B",
    mechanism: "Ức chế tổng hợp prostaglandin chủ yếu tại hệ thần kinh trung ương (COX-3/COX-1b), ức chế trung tâm điều nhiệt ở vùng dưới đồi.",
    blackBoxWarning: "Nguy cơ ngộ độc gan cấp tính, suy gan tối cấp và tử vong khi dùng quá liều (> 4g/ngày hoặc kết hợp nhiều chế phẩm chứa paracetamol).",
    indications: [
      "Giảm đau nhẹ đến vừa (đau đầu, đau răng, đau cơ khớp, đau bụng kinh)",
      "Hạ sốt do mọi nguyên nhân"
    ],
    dosage: {
      standardAdult: "500–1000 mg PO/IV mỗi 4–6h khi cần",
      maxAdultDaily: "4000 mg/ngày (ở người nghiện rượu, suy gan, suy dinh dưỡng: tối đa 2000–3000 mg/ngày)",
      pediatric: "10–15 mg/kg PO mỗi 4–6h (tối đa 60 mg/kg/ngày)",
      renalNote: "CrCl < 10 mL/min: Kéo dài khoảng cách liều mỗi 8h."
    },
    adverseEffects: [
      "Độc tính gan khi quá liều (tích tụ chất chuyển hóa độc NAPQI)",
      "Phản ứng da nghiêm trọng (SJS, TEN, AGEP - hiếm gặp)"
    ],
    contraindications: [
      "Quá mẫn với paracetamol",
      "Suy tế bào gan nặng, bệnh gan tiến triển đang hoạt động"
    ]
  },
  {
    id: "adrenaline",
    name: "Adrenaline (Epinephrine)",
    brandNames: ["Adrenalin 1mg/1ml"],
    drugClass: "Chủ Vận Adrenergic Trực Tiếp Toàn Phần (α1, α2, β1, β2)",
    category: "Cấp cứu & Hồi sức",
    routes: ["IM", "IV", "SC", "Endotracheal", "Nebulization"],
    pregnancyCategory: "C",
    mechanism: "Kích thích α1 (co mạch ngoại vi, tăng HA), β1 (tăng nhịp tim và sức co bóp cơ tim), β2 (giãn cơ trơn phế quản, ức chế phóng thích hóa chất trung gian từ tế bào mast).",
    blackBoxWarning: null,
    indications: [
      "Phản vệ mức độ II trở lên (LỰA CHỌN ĐẦU TAY DUY NHẤT CỨU MẠNG)",
      "Ngừng tuần hoàn hô hấp (ACLS: Vô tâm thu, PEA, VF/pVT kháng khử rung)",
      "Sốc tim / Sốc nhiễm khuẩn kháng Norepinephrine",
      "Cơn hen phế quản ác tính đe dọa tính mạng",
      "Viêm thanh khí phế quản cấp (Croup) ở trẻ em (phun khí dung)"
    ],
    dosage: {
      standardAdult: "Phản vệ: 0.5 mg (1/2 ống 1mg/1ml) tiêm bắp sâu (IM) mặt trước ngoài đùi ngay lập tức; lặp lại mỗi 3-5 phút nếu chưa đáp ứng. Ngừng tim: 1 mg IV/IO mỗi 3-5 phút.",
      pediatric: "Phản vệ: 0.01 mg/kg IM (tối đa 0.3 mg ở trẻ em hoặc 0.5 mg ở thanh thiếu niên)."
    },
    adverseEffects: [
      "Nhịp tim nhanh, hồi hộp đánh trống ngực, vã mồ hôi, run tay",
      "Cơn tăng huyết áp kịch phát, xuất huyết não",
      "Loạn nhịp thất nguy hiểm, thiếu máu cục bộ cơ tim",
      "Hoại tử mô nếu tiêm tĩnh mạch ngoại biên bị thoát mạch"
    ],
    contraindications: [
      "KHÔNG CÓ CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI TRONG CẤP CỨU PHẢN VỆ HOẶC NGỪNG TIM."
    ]
  }
];

export const DRUG_INTERACTIONS_DATA: DrugInteraction[] = [
  {
    id: "inter_bb_non_dhp_ccb",
    drug1: "metoprolol_succ",
    drug2: "verapamil",
    group1: "beta_blockers",
    group2: "non_dhp_ccb",
    severity: "contraindicated",
    severityLabel: "Chống chỉ định / Nguy hiểm cao",
    summary: "Tăng đáng kể nguy cơ chậm nhịp tim nặng, block AV độ III và suy tim cấp.",
    mechanism: "Cả hai thuốc đều ức chế nút xoang (inotropic âm) và nút nhĩ thất (dromotropic âm), gây cộng hưởng tác dụng ức chế dẫn truyền tim nặng nề.",
    clinicalManagement: "Tránh dùng phối hợp đường uống hoặc tiêm tĩnh mạch. Nếu cần phối hợp hạ áp/chống đau thắt ngực, hãy đổi sang Dihydropyridine CCB (như Amlodipine)."
  },
  {
    id: "inter_arni_acei",
    drug1: "sacubitril_valsartan",
    drug2: "enalapril",
    group1: "arni",
    group2: "acei",
    severity: "contraindicated",
    severityLabel: "Chống chỉ định Tuyệt đối",
    summary: "Nguy cơ phù mạch nghiêm trọng (Angioedema) đe dọa tính mạng.",
    mechanism: "Ức chế đồng thời Neprilysin và ACE enzyme làm tích lũy Bradykinin mức độ rất cao ở mô phế quản và niêm mạc.",
    clinicalManagement: "Bắt buộc có thời gian chờ (washout period) ít nhất 36 giờ sau liều ACEi cuối cùng trước khi khởi đầu ARNI."
  },
  {
    id: "inter_sglt2i_mra",
    drug1: "empagliflozin",
    drug2: "spironolactone",
    group1: "sglt2i",
    group2: "mra",
    severity: "synergistic",
    severityLabel: "Phối hợp Hiệp đồng Lợi ích (Bảo vệ Tim - Thận)",
    summary: "Phối hợp ưu tiên theo khuyến cáo KDIGO/ESC: SGLT2i giảm nguy cơ tăng Kali máu do MRA gây ra.",
    mechanism: "SGLT2i làm tăng dòng Natri và nước đến ống lượn xa, kích thích thải Kali, đối kháng nhẹ hiệu ứng giữ Kali của MRA.",
    clinicalManagement: "Khuyên dùng phối hợp ở bệnh nhân CKD và Suy tim phân suất tống máu giảm. Kiểm tra Kali máu sau 2-4 tuần khởi đầu."
  },
  {
    id: "inter_vanco_piptazo",
    drug1: "vancomycin",
    drug2: "amox_clav",
    group1: "glycopeptides",
    group2: "penicillins",
    severity: "major",
    severityLabel: "Tương tác Nặng / Nguy cơ Tổn thương Thận cấp (AKI)",
    summary: "Tăng tỷ lệ tổn thương thận cấp AKI gấp 2-3 lần so với phối hợp Vancomycin + Cephalosporin.",
    mechanism: "Độc tính hiệp đồng trên tế bào ống thận và gây viêm thận kẽ cấp.",
    clinicalManagement: "Theo dõi sát Creatinine máu và nước tiểu hằng ngày, duy trì bù đủ dịch và cân nhắc đổi kháng sinh Gram âm nếu CrCl giảm nhanh."
  }
];

export const PK_DATABASE: PKParameter[] = [
  {
    drugId: "amox_clav",
    name: "Amoxicillin",
    halfLifeHours: 1.3,
    volumeOfDistributionLkg: 0.3,
    proteinBindingPercent: 18,
    bioavailabilityPercent: 80,
    eliminationRoute: "Thận (60-80% dưới dạng không đổi qua nước tiểu)"
  },
  {
    drugId: "ciprofloxacin",
    name: "Ciprofloxacin",
    halfLifeHours: 4.0,
    volumeOfDistributionLkg: 2.5,
    proteinBindingPercent: 30,
    bioavailabilityPercent: 70,
    eliminationRoute: "Thận (40-50%) và Gan/Mật (20-35%)"
  },
  {
    drugId: "metoprolol_succ",
    name: "Metoprolol Succinate",
    halfLifeHours: 5.0,
    volumeOfDistributionLkg: 3.2,
    proteinBindingPercent: 12,
    bioavailabilityPercent: 50,
    eliminationRoute: "Gan (chuyển hóa qua CYP2D6 > 95%)"
  },
  {
    drugId: "paracetamol",
    name: "Paracetamol",
    halfLifeHours: 2.5,
    volumeOfDistributionLkg: 0.9,
    proteinBindingPercent: 20,
    bioavailabilityPercent: 88,
    eliminationRoute: "Gan (liên hợp glucuronide/sulfate > 90%, thải qua thận)"
  }
];

export const ANTIDOTE_PROTOCOLS: AntidoteProtocol[] = [
  {
    toxin: "Paracetamol (Acetaminophen)",
    antidote: "N-Acetylcystein (NAC)",
    mechanism: "Cung cấp nhóm sulfhydryl (-SH) để phục hồi dự trữ Glutathione ở gan và kết hợp trực tiếp trung hòa chất độc NAPQI.",
    dosing: "Phác đồ IV 21 giờ: 150 mg/kg trong 1h → 50 mg/kg trong 4h → 100 mg/kg trong 16h.",
    monitoring: "AST/ALT, INR, Khí máu động mạch, phản ứng giả phản vệ khi truyền nhanh."
  },
  {
    toxin: "Opioids (Morphine, Fentanyl, Heroin)",
    antidote: "Naloxone",
    mechanism: "Đối kháng cạnh tranh thuần túy tại các thụ thể opioid (μ, κ, δ) ở hệ thần kinh trung ương.",
    dosing: "0.04–0.4 mg IV/IM/IN, lặp lại mỗi 2–3 phút đến khi phục hồi nhịp thở tự nhiên (SpO₂ > 92%, nhịp thở > 12 l/p).",
    monitoring: "Nguy cơ tái suy hô hấp (do thời gian bán thải Naloxone ngắn ~30-60 phút hơn hầu hết opioid)."
  },
  {
    toxin: "Benzodiazepines (Diazepam, Midazolam)",
    antidote: "Flumazenil",
    mechanism: "Đối kháng cạnh tranh tại vị trí gắn benzodiazepine trên thụ thể GABA-A.",
    dosing: "0.2 mg IV trong 30 giây; nếu cần thêm 0.3 mg sau 1 phút; tối đa 1.0 mg.",
    monitoring: "Chống chỉ định ở bệnh nhân nghiện benzo mạn tính hoặc ngộ độc kèm thuốc chống trầm cảm 3 vòng (nguy cơ co giật khó cắt)."
  },
  {
    toxin: "Thuốc trừ sâu Phospho hữu cơ / Khí độc thần kinh",
    antidote: "Atropine + Pralidoxime (PAM)",
    mechanism: "Atropine đối kháng muscarinic giải quyết ứ đọng cholinergic; PAM tái hoạt hóa enzym acetylcholinesterase bị phosphoryl hóa.",
    dosing: "Atropine 2–5 mg IV mỗi 5–10 phút đến khi đạt tiêu chuẩn 'Atropin hóa' (phổi hết ran ẩm, đồng tử giãn, da khô, mạch > 80).",
    monitoring: "Ran ẩm tại phổi, SpO2, tần số tim, áp lực động mạch."
  }
];

// Backward compatibility sync for legacy scripts
if (typeof window !== 'undefined') {
  (window as any).DRUGS_DB = DRUGS_DB_DATA;
  (window as any).CLINICAL_DRUGS_DB = DRUGS_DB_DATA;
}
