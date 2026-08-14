/**
 * Ngân hàng Tiêu chuẩn Chẩn đoán — Engine v3.0 (CliniPortal) [TypeScript Module]
 * Features: Type tabs, specialty pills, recently viewed, 14+ clinical logic sets
 */

export interface SpecialtyColor {
  color: string;
  bg: string;
}

export const SPEC_COLORS: Record<string, SpecialtyColor> = {
  'Tim mạch': { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nội khoa': { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  'Truyền nhiễm': { color: '#d97706', bg: 'rgba(217, 119, 6, 0.08)' },
  'Huyết học': { color: '#dc2626', bg: 'rgba(220, 38, 38, 0.08)' },
  'Thần kinh': { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)' },
  'Cơ xương khớp': { color: '#db2777', bg: 'rgba(219, 39, 119, 0.08)' },
  'Hô hấp': { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.08)' },
  'Cấp cứu': { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' },
  'Nhi khoa': { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)' },
  'Ngoại khoa': { color: '#16a34a', bg: 'rgba(22, 163, 74, 0.08)' },
  'Tiêu hóa': { color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
  'Nội tiết': { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.08)' }
};

export const DEFAULT_SPEC: SpecialtyColor = { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' };

export function getSpecColor(specialty: string): SpecialtyColor {
  return SPEC_COLORS[specialty] || DEFAULT_SPEC;
}

export const TYPE_CONFIG: Record<string, { label: string; icon: string; cssClass: string; desc: string }> = {
  all: { label: 'Tất cả', icon: 'fa-list', cssClass: 'type-all', desc: 'Tất cả tiêu chuẩn' },
  diagnosis: { label: 'Chẩn đoán', icon: 'fa-stethoscope', cssClass: 'type-diag', desc: 'Tiêu chuẩn chẩn đoán bệnh lý' },
  classification: { label: 'Phân loại', icon: 'fa-layer-group', cssClass: 'type-class', desc: 'Tiêu chuẩn phân loại hội chứng' },
  scoring: { label: 'Thang điểm', icon: 'fa-chart-simple', cssClass: 'type-score', desc: 'Thang điểm lâm sàng' }
};

const RECENT_KEY = 'dc_recently_viewed';
const RECENT_MAX = 5;

export function saveRecentlyViewed(id: string, name: string, specialty: string): void {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recent = recent.filter((r: any) => r.id !== id);
    recent.unshift({ id, name, specialty, ts: Date.now() });
    if (recent.length > RECENT_MAX) recent = recent.slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  } catch {}
}

export function getRecentlyViewed(): any[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

let criteriaDataCache: any = null;

export async function fetchCriteriaData(): Promise<any> {
  if (criteriaDataCache) return criteriaDataCache;
  const res = await fetch('./data/criteria-database.json');
  if (!res.ok) throw new Error('Không thể tải dữ liệu');
  criteriaDataCache = await res.json();
  return criteriaDataCache;
}

export function updateResultUI(type: 'success' | 'warning' | 'danger' | 'neutral', icon: string, title: string, desc: string): void {
  const resultBox = document.getElementById('dc-result-box');
  const resultIcon = document.getElementById('dc-result-icon');
  const resultTitle = document.getElementById('dc-result-title');
  const resultDesc = document.getElementById('dc-result-desc');

  if (resultBox) {
    resultBox.className = `dc-result-card ${type}`;
  }
  if (resultIcon) resultIcon.innerHTML = icon;
  if (resultTitle) resultTitle.textContent = title;
  if (resultDesc) resultDesc.textContent = desc;
}

export function evaluateCriteriaLogic(logicId: string): void {
  switch (logicId) {
    case 'duke':
      evaluateDukeLogic();
      break;
    case 'jones':
      evaluateJonesLogic();
      break;
    case 'rome4':
      evaluateRome4Logic();
      break;
    case 'ranson':
      evaluateRansonLogic();
      break;
    case 'child_pugh':
      evaluateChildPughLogic();
      break;
    case 'met_syn':
      evaluateMetSynLogic();
      break;
    case 'ards_berlin':
      evaluateARDSLogic();
      break;
    case 'curb65':
      evaluateCURB65Logic();
      break;
    default:
      evaluateDefaultLogic();
      break;
  }
}

function evaluateDukeLogic(): void {
  const maj = document.querySelectorAll('.major-input:checked').length;
  const min = document.querySelectorAll('.minor-input:checked').length;
  if (maj >= 2 || (maj === 1 && min >= 3) || min >= 5) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', 'XÁC ĐỊNH Viêm Nội Tâm Mạc Nhiễm Khuẩn (IE)', 'Thỏa mãn tiêu chuẩn Duke hiệu chỉnh. Khởi động kháng sinh đường tĩnh mạch khẩn.');
  } else if (maj === 1 && min >= 1 || min >= 3) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', 'NGHI NGỜ / CÓ THỂ Viêm Nội Tâm Mạc Nhiễm Khuẩn', 'Làm lại siêu âm tim qua thực quản (TEE) và cấy máu lặp lại.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-check"></i>', 'Ít nghĩ đến / Loại trừ IE', 'Chưa đủ tiêu chuẩn Duke.');
  }
}

function evaluateJonesLogic(): void {
  const maj = document.querySelectorAll('.major-input:checked').length;
  const min = document.querySelectorAll('.minor-input:checked').length;
  if (maj >= 2 || (maj === 1 && min >= 2)) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', 'Thỏa Tiêu Chuẩn Thấp Tim Cấp (Jones)', 'Khởi động phác đồ kháng sinh diệt liên cầu & kháng viêm.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-info"></i>', 'Chưa đủ tiêu chuẩn Thấp tim cấp', 'Cần bằng chứng nhiễm liên cầu trước đó.');
  }
}

function evaluateRome4Logic(): void {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  if (total >= 3) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>', 'Đủ tiêu chuẩn Hội chứng ruột kích thích (IBS)', 'Thỏa mãn tiêu chuẩn Rome IV.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-info"></i>', 'Chưa đủ tiêu chuẩn Rome IV', 'Cần ít nhất 2 trong 3 đặc điểm thay đổi đại tiện.');
  }
}

function evaluateRansonLogic(): void {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const score = m + n;
  if (score >= 7) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', `Ranson ${score}/11 — Tử vong rất cao (>99%)`, 'Viêm tụy cấp cực nặng. Cần ICU, hồi sức tích cực.');
  } else if (score >= 5) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', `Ranson ${score}/11 — Nặng (tử vong ~40%)`, 'Nhập ICU, theo dõi biến chứng.');
  } else if (score >= 3) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', `Ranson ${score}/11 — Trung bình (tử vong ~15%)`, 'Nhập viện nội khoa, truyền dịch, CT bụng.');
  } else {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>', `Ranson ${score}/11 — Nhẹ (tử vong <1%)`, 'Viêm tụy cấp nhẹ. Hồi sức dịch, giảm đau.');
  }
}

function evaluateChildPughLogic(): void {
  const m = document.querySelectorAll('.major-input:checked').length;
  const n = document.querySelectorAll('.minor-input:checked').length;
  const score = m + n;
  if (score >= 10) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', `Child-Pugh C (${score} điểm) — Suy gan mất bù nặng`, 'Tử vong 1 năm ~85%. Đánh giá ghép gan.');
  } else if (score >= 7) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', `Child-Pugh B (${score} điểm) — Suy gan trung bình`, 'Tử vong 1 năm ~57%. Điều trị biến chứng.');
  } else if (score >= 5) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>', `Child-Pugh A (${score} điểm) — Xơ gan bù tốt`, 'Tử vong 1 năm ~0%. Theo dõi định kỳ.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>', 'Chưa đủ thông số đánh giá', 'Chọn các thông số xét nghiệm.');
  }
}

function evaluateMetSynLogic(): void {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  if (total >= 3) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>', `Chẩn đoán Hội chứng Chuyển hóa (${total}/5 tiêu chuẩn)`, 'Đạt ≥ 3/5 tiêu chuẩn. Thay đổi lối sống.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-info"></i>', `Chưa đủ HC chuyển hóa (${total}/5 tiêu chuẩn)`, 'Cần ≥ 3/5 tiêu chuẩn.');
  }
}

function evaluateARDSLogic(): void {
  const m = document.querySelectorAll('.major-input:checked').length;
  const sel = Array.from(document.querySelectorAll('.minor-input:checked')).map(cb => (cb as HTMLInputElement).value);
  if (m >= 3) {
    if (sel.includes('ards_n3')) {
      updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', 'ARDS NẶNG — P/F ≤ 100 mmHg', 'Thở máy bảo vệ phổi (Vt 6 mL/kg), PEEP cao, tư thế nằm sấp.');
    } else if (sel.includes('ards_n2')) {
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', 'ARDS TRUNG BÌNH — P/F 101-200 mmHg', 'Thở máy bảo vệ phổi, PEEP tối ưu hóa.');
    } else {
      updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', 'ARDS NHẸ — P/F 201-300 mmHg', 'Theo dõi sát, điều trị nguyên nhân.');
    }
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>', 'Chưa đủ 3 tiêu chuẩn ARDS', 'Cần đủ: Khởi phát, X-quang/CT và Nguyên nhân.');
  }
}

function evaluateCURB65Logic(): void {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  if (total >= 4) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', `CURB-65 = ${total}/5 — Nặng`, 'Tử vong cao (>14%). Cân nhắc ICU.');
  } else if (total === 3) {
    updateResultUI('danger', '<i class="fa-solid fa-triangle-exclamation"></i>', `CURB-65 = ${total}/5 — Nặng vừa`, 'Nhập viện, kháng sinh IV.');
  } else if (total === 2) {
    updateResultUI('warning', '<i class="fa-solid fa-circle-exclamation"></i>', `CURB-65 = ${total}/5 — Trung bình`, 'Xem xét nhập viện.');
  } else if (total === 1) {
    updateResultUI('success', '<i class="fa-solid fa-circle-check"></i>', `CURB-65 = ${total}/5 — Nhẹ`, 'Cân nhắc ngoại trú.');
  } else {
    updateResultUI('neutral', '<i class="fa-solid fa-circle-question"></i>', 'CURB-65 = 0/5', 'Điều trị ngoại trú an toàn.');
  }
}

function evaluateDefaultLogic(): void {
  const total = document.querySelectorAll('.dc-checkbox-input:checked').length;
  updateResultUI('neutral', '<i class="fa-solid fa-calculator"></i>', `Đã chọn: ${total} tiêu chuẩn`, 'Đang đánh giá theo tiêu chuẩn lâm sàng.');
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.evaluateCriteriaLogic = evaluateCriteriaLogic;
  win.saveRecentlyViewed = saveRecentlyViewed;
  win.getRecentlyViewed = getRecentlyViewed;
  win.fetchCriteriaData = fetchCriteriaData;
  win.getSpecColor = getSpecColor;
}
