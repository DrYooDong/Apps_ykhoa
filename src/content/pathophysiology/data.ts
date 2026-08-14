/**
 * CliniPortal — Pathophysiology Module Data & Formulas (TypeScript Module)
 */
import { PhysioFlashcard, PhysioFormula, PathoCategoryMeta } from './types';

export const PATHO_CATEGORIES: PathoCategoryMeta[] = [
  { id: 'cardio', name: 'Tim Mạch & Huyết Động', icon: 'fa-heart-pulse' },
  { id: 'respiratory', name: 'Hô Hấp & Thăng Bằng Khí Máu', icon: 'fa-lungs' },
  { id: 'renal', name: 'Thận, Nước & Điện Giải', icon: 'fa-filter' },
  { id: 'endo', name: 'Nội Tiết & Chuyển Hóa Phân Tử', icon: 'fa-dna' },
  { id: 'neuro', name: 'Thần Kinh & Điện Sinh Lý Màng', icon: 'fa-brain' }
];

export const PHYSIO_FLASHCARDS_DATA: PhysioFlashcard[] = [
  {
    id: "pfc-1",
    category: "Tim Mạch",
    title: "Định luật Frank-Starling",
    question: "Mối liên hệ giữa thể tích cuối tâm trương (EDV) và thể tích nhát bóp (SV) theo định luật Frank-Starling?",
    answer: "Khi tiền tải (EDV) tăng lên trong giới hạn sinh lý, mức độ căng giãn của sợi cơ tim tăng → tăng lực co bóp tâm thu → tăng thể tích nhát bóp (SV).",
    explanation: "Cơ chế: Tối ưu hóa sự trượt lên nhau giữa các sợi actin và myosin cùng độ nhạy cảm của troponin C với canxi nội bào."
  },
  {
    id: "pfc-2",
    category: "Hô Hấp",
    title: "Hiệu ứng Bohr vs Hiệu ứng Haldane",
    question: "Phân biệt hiệu ứng Bohr và hiệu ứng Haldane trong sinh lý vận chuyển khí?",
    answer: "• Hiệu ứng Bohr: pH giảm, CO₂ tăng hoặc 2,3-DPG tăng làm đường cong phân ly HbO₂ lệch PHẢI (giảm ái lực, nhả O₂ cho mô).<br>• Hiệu ứng Haldane: Khử oxy Hb làm tăng khả năng gắn và vận chuyển CO₂ tại mô.",
    explanation: "Cả 2 hiệu ứng phối hợp giúp giải phóng O₂ và nhận CO₂ hiệu quả tại mô ngoại vi, ngược lại giải phóng CO₂ và nhận O₂ tại phế nang."
  },
  {
    id: "pfc-3",
    category: "Thận & Điện Giải",
    title: "Thế Cân Bằng Starling Vi Mạch Cầu Thận",
    question: "Các lực quyết định áp lực lọc cầu thận hữu hiệu (NFP)?",
    answer: "NFP = P_GC - (P_BS + π_GC)<br>Trong đó: P_GC (áp lực thủy tĩnh mao mạch ~55-60 mmHg), P_BS (áp lực thủy tĩnh khoang Bowman ~15 mmHg), π_GC (áp lực keo huyết tương ~30 mmHg). NFP bình thường ~10-15 mmHg.",
    explanation: "Hạ huyết áp nặng làm giảm P_GC khiến NFP tiến về 0 → thiểu niệu, vô niệu cấp trước thận."
  },
  {
    id: "pfc-4",
    category: "Nội Tiết",
    title: "Trục RAAS (Renin-Angiotensin-Aldosterone)",
    question: "Kích thích nào gây bài tiết Renin từ phức hợp cạnh cầu thận (JGA)?",
    answer: "1. Giảm áp lực tưới máu thận (tế bào cạnh cầu thận cảm nhận)<br>2. Giảm nồng độ Na+/Cl- qua vết đặc (Macula Densa)<br>3. Kích thích thần kinh giao cảm thận qua thụ thể β1.",
    explanation: "Renin biến đổi Angiotensinogen thành Angiotensin I, sau đó men ACE tại phổi chuyển thành Angiotensin II gây co mạch mạnh và kích thích vỏ thượng thận tiết Aldosterone."
  }
];

export const PHYSIO_FORMULAS_DATA: PhysioFormula[] = [
  {
    id: "anion-gap",
    name: "Khoảng Trống Anion Máu (Anion Gap - AG)",
    category: "Khí Máu & Toan Kiềm",
    formula: "AG = [Na+] - ([Cl-] + [HCO3-])",
    unit: "mEq/L (mmol/L)",
    variables: [
      { name: "na", label: "Natri huyết thanh (Na+)", unit: "mmol/L", defaultValue: 140 },
      { name: "cl", label: "Clo huyết thanh (Cl-)", unit: "mmol/L", defaultValue: 104 },
      { name: "hco3", label: "Bicarbonate (HCO3-)", unit: "mmol/L", defaultValue: 24 }
    ],
    calculate: (inputs) => (inputs['na'] ?? 140) - ((inputs['cl'] ?? 104) + (inputs['hco3'] ?? 24))
  },
  {
    id: "winters-formula",
    name: "Công Thức Winters (Bù Hô Hấp Trong Toan Chuyển Hóa)",
    category: "Khí Máu & Toan Kiềm",
    formula: "PaCO2 Dự Đoán = (1.5 × [HCO3-]) + 8 (± 2)",
    unit: "mmHg",
    variables: [
      { name: "hco3", label: "Bicarbonate đo được (HCO3-)", unit: "mmol/L", defaultValue: 15 }
    ],
    calculate: (inputs) => 1.5 * (inputs['hco3'] ?? 15) + 8
  },
  {
    id: "fena",
    name: "Phân Suất Thải Natri (FENa)",
    category: "Thận Học",
    formula: "FENa (%) = ([UNa] × [PCr] / [PNa] × [UCr]) × 100",
    unit: "%",
    variables: [
      { name: "una", label: "Natri Niệu (UNa)", unit: "mmol/L", defaultValue: 15 },
      { name: "pna", label: "Natri Máu (PNa)", unit: "mmol/L", defaultValue: 140 },
      { name: "ucr", label: "Creatinine Niệu (UCr)", unit: "μmol/L", defaultValue: 10000 },
      { name: "pcr", label: "Creatinine Máu (PCr)", unit: "μmol/L", defaultValue: 250 }
    ],
    calculate: (inputs) => {
      const una = inputs['una'] ?? 15;
      const pna = inputs['pna'] ?? 140;
      const ucr = inputs['ucr'] ?? 10000;
      const pcr = inputs['pcr'] ?? 250;
      if (pna * ucr === 0) return 0;
      return (una * pcr) / (pna * ucr) * 100;
    }
  }
];
