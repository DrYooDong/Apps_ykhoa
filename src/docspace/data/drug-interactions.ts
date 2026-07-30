export interface DrugInteractionRule {
  drug_a: string;
  drug_b: string;
  severity: 'high' | 'moderate' | 'low';
  mechanism: string;
  recommendation: string;
}

export const DRUG_INTERACTIONS: DrugInteractionRule[] = [
  {
    drug_a: "vancomycin", 
    drug_b: "gentamicin",
    severity: "high",
    mechanism: "Tăng độc tính thận cộng hợp (Nephrotoxicity).",
    recommendation: "Tránh phối hợp. Nếu bắt buộc phải dùng chung, cần theo dõi chức năng thận (Creatinine) mỗi 24h và theo dõi nồng độ đáy của cả 2 thuốc."
  },
  {
    drug_a: "ciprofloxacin", 
    drug_b: "amiodarone",
    severity: "high",
    mechanism: "Kéo dài khoảng QTc cộng hợp, làm tăng nguy cơ loạn nhịp thất (Xoắn đỉnh).",
    recommendation: "Chống chỉ định phối hợp. Xem xét đổi sang nhóm kháng sinh khác an toàn trên tim (VD: beta-lactam)."
  },
  {
    drug_a: "omeprazole",
    drug_b: "clopidogrel",
    severity: "moderate",
    mechanism: "Omeprazole ức chế CYP2C19, làm giảm chuyển hóa clopidogrel thành dạng hoạt tính, giảm hiệu quả chống kết tập tiểu cầu.",
    recommendation: "Tránh dùng omeprazole. Cân nhắc dùng pantoprazole hoặc rabeprazole (ít ảnh hưởng CYP2C19 hơn)."
  },
  {
    drug_a: "azithromycin",
    drug_b: "colchicine",
    severity: "high",
    mechanism: "Azithromycin ức chế P-glycoprotein (P-gp), làm tăng nồng độ colchicine trong máu, có thể gây ngộ độc chết người.",
    recommendation: "Tuyệt đối tránh. Nếu bắt buộc dùng, phải giảm liều colchicine và theo dõi sát triệu chứng ngộ độc (tiêu chảy, yếu cơ)."
  }
];
