/**
 * CliniPortal — Clinical Pathology & Diagnostic Criteria Engine (TypeScript Module)
 * Powers benh-ly.html, infographic-poster-board.html, and diagnostic-criteria/
 */

export interface DiagnosticCriteriaItem {
  id: string;
  name: string;
  specialty: string;
  sensitivity?: string;
  specificity?: string;
  criteriaList: string[];
}

export const DIAGNOSTIC_CRITERIA_DATA: DiagnosticCriteriaItem[] = [
  {
    id: "duke_ie",
    name: "Tiêu chuẩn Duke hiệu chỉnh (Viêm nội tâm mạc nhiễm khuẩn)",
    specialty: "Tim mạch & Nhiễm trùng",
    sensitivity: "80%",
    specificity: "99%",
    criteriaList: [
      "Tiêu chuẩn chính: Cấy máu (+) 2 mẫu riêng biệt với vi khuẩn điển hình, Siêu âm tim thấy sùi / hở van mới",
      "Tiêu chuẩn phụ: Yếu tố thuận lợi (bệnh van tim / tiêm chích), Sốt >= 38°C, Hiện tượng mạch máu (thuyên tắc, Janeway), Hiện tượng miễn dịch (Osler, Roth), Cấy máu (+) không điển hình"
    ]
  },
  {
    id: "rome_iv_ibs",
    name: "Tiêu chuẩn Rome IV (Hội chứng ruột kích thích - IBS)",
    specialty: "Tiêu hóa",
    sensitivity: "65%",
    specificity: "90%",
    criteriaList: [
      "Đau bụng tái phát ít nhất 1 ngày/tuần trong 3 tháng qua",
      "Kèm ít nhất 2 trong 3 yếu tố: Liên quan đến đại tiện, Thay đổi tần suất đi cầu, Thay đổi hình dạng phân"
    ]
  },
  {
    id: "kdigo_aki",
    name: "Tiêu chuẩn KDIGO (Tổn thương thận cấp - AKI)",
    specialty: "Thận học & Cấp cứu",
    criteriaList: [
      "Giai đoạn 1: Tăng Creatinine >= 0.3 mg/dL (26.5 umol/L) trong 48h hoặc tăng >= 1.5 lần mức nền; Nước tiểu < 0.5 mL/kg/h x 6-12h",
      "Giai đoạn 2: Tăng Creatinine 2.0 - 2.9 lần mức nền; Nước tiểu < 0.5 mL/kg/h x >= 12h",
      "Giai đoạn 3: Tăng Creatinine >= 3.0 lần mức nền hoặc Creatinine >= 4.0 mg/dL (353.6 umol/L) hoặc Bắt đầu RRT; Nước tiểu < 0.3 mL/kg/h x >= 24h hoặc vô niệu >= 12h"
    ]
  }
];

export function initPathologySearch(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
    document.querySelectorAll('.specialty-card, .topic-card, .criteria-card').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      if (text.includes(q)) {
        (card as HTMLElement).style.display = '';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  });
}

export function initPathologyEngine(): void {
  initPathologySearch();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPathologyEngine);
  } else {
    initPathologyEngine();
  }
}
