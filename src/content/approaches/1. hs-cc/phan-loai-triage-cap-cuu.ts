/**
 * CliniPortal — Phân Loại Triage Cấp Cứu (ESI Level 1-5 Decision Tree) (TypeScript Module)
 */

export interface EsiLevelInfo {
  level: number;
  name: string;
  gradient: string;
  title: string;
  desc: string;
}

export const ESI_LEVELS: Record<number, EsiLevelInfo> = {
  1: {
    level: 1,
    name: 'TỐI KHẨN (ĐỎ)',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    title: 'BỆNH NHÂN ESI LEVEL 1 — TỐI KHẨN (ĐỎ)',
    desc: 'Xử trí hồi sức khẩn cấp NGAY LẬP TỨC! Đưa bệnh nhân vào phòng Cấp cứu đỏ, gọi bác sĩ hồi sức.'
  },
  2: {
    level: 2,
    name: 'KHẨN CẤP (CAM)',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    title: 'BỆNH NHÂN ESI LEVEL 2 — KHẨN CẤP (CAM)',
    desc: 'Ưu tiên khám ngay trong vòng 10 - 15 phút. Theo dõi liên tục sinh hiệu và SpO2.'
  },
  3: {
    level: 3,
    name: 'CẦN 2+ NGUỒN LỰC (VÀNG)',
    gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    title: 'BỆNH NHÂN ESI LEVEL 3 — CẦN 2+ NGUỒN LỰC (VÀNG)',
    desc: 'Bệnh nhân ổn định. Thời gian chờ tối đa 30 - 60 phút. Cho làm xét nghiệm/X-quang ban đầu.'
  },
  4: {
    level: 4,
    name: 'CẦN 1 NGUỒN LỰC (XANH LÁ)',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    title: 'BỆNH NHÂN ESI LEVEL 4 — CẦN 1 NGUỒN LỰC (XANH LÁ)',
    desc: 'Tình trạng nhẹ. Khám trong vòng 1 - 2 giờ. Chỉ định 1 nguồn lực cận lâm sàng/thủ thuật.'
  },
  5: {
    level: 5,
    name: 'NGOẠI TRÚ (XANH DƯƠNG)',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    title: 'BỆNH NHÂN ESI LEVEL 5 — NGOẠI TRÚ (XANH DƯƠNG)',
    desc: 'Không khẩn cấp. Khám theo thứ tự phòng khám ngoại trú thông thường.'
  }
};

export function nextDtStep(stepNum: number | string): void {
  document.querySelectorAll('.dt-step').forEach(el => el.classList.remove('active'));
  const step = document.getElementById('dtStep' + stepNum);
  if (step) step.classList.add('active');
}

export function setEsiLevel(level: number): void {
  document.querySelectorAll('.dt-step').forEach(el => el.classList.remove('active'));
  const resultStep = document.getElementById('dtResultStep');
  const box = document.getElementById('dtResultBox');
  const title = document.getElementById('dtResultTitle');
  const desc = document.getElementById('dtResultDesc');

  if (!resultStep || !box || !title || !desc) return;
  resultStep.classList.add('active');

  const info = ESI_LEVELS[level];
  if (info) {
    box.style.background = info.gradient;
    title.textContent = info.title;
    desc.textContent = info.desc;
  }
}

export function resetDt(): void {
  document.querySelectorAll('.dt-step').forEach(el => el.classList.remove('active'));
  const step1 = document.getElementById('dtStep1');
  if (step1) step1.classList.add('active');
}

// Bind to window for HTML compatibility
if (typeof window !== 'undefined') {
  (window as any).nextDtStep = nextDtStep;
  (window as any).setEsiLevel = setEsiLevel;
  (window as any).resetDt = resetDt;
}
