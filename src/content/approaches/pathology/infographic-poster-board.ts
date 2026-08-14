/**
 * CliniPortal — Clinical Pathology Infographic Poster Board (TypeScript Module)
 */

export interface PosterTimeline {
  phase: string;
  desc: string;
}

export interface PosterStep {
  title: string;
  type: string;
  desc: string;
}

export interface PosterDose {
  drug: string;
  baseDose: number;
  unit: string;
  calc: (w: number, egfr: number) => string;
}

export interface PosterData {
  title: string;
  redFlagTitle: string;
  redFlagItems: string[];
  timelines: PosterTimeline[];
  steps: PosterStep[];
  doses: PosterDose[];
  pearls: string;
}

export const POSTER_DATA: Record<string, PosterData> = {
  sepsis: {
    title: 'Phác Đồ Tiếp Cận Sốc Nhiễm Khuẩn (Sepsis-3 & Septic Shock Bundle)',
    redFlagTitle: '🚨 CẢNH BÁO ĐỎ — DẤU HIỆU SỐC NHIỄM KHUẨN NẶNG',
    redFlagItems: [
      'Huyết áp tâm thu < 90 mmHg hoặc MAP < 65 mmHg mặc dù đã hồi sức đủ dịch',
      'Lactate máu > 2.0 mmol/L (nguy cơ tử vong tăng cao nếu > 4.0 mmol/L)',
      'Thiếu niệu (< 0.5 ml/kg/giờ) kèm rối loạn tri giác (GCS giảm)'
    ],
    timelines: [
      { phase: 'Giờ 0 - 1 (Hour-1 Bundle)', desc: 'Đo Lactate máu, cấy máu trước khi dùng kháng sinh, dùng kháng sinh phổ rộng, truyền nhanh 30ml/kg Ringer Lactate nếu HA tụt/Lactate ≥ 4.' },
      { phase: 'Giờ 3 (Hồi sức tích cực)', desc: 'Bắt đầu truyền Noradrenaline nếu MAP < 65 mmHg sau bù dịch. Đo lại Lactate nếu Lactate ban đầu > 2 mmol/L.' },
      { phase: 'Giờ 6 (Tối ưu hóa)', desc: 'Đánh giá lại thể tích lòng mạch (Passive Leg Raise Test), theo dõi ScvO2, CVP, xem xét Vasopressin hoặc Dobutamine.' },
      { phase: 'Ngày 1 (Duy trì & Kiểm soát)', desc: 'Kiểm soát đường huyết (140-180 mg/dL), dự phòng loét dạ dày (PPI), dự phòng DVT (LMWH).' },
      { phase: 'Ngày 3-7 (Đánh giá lại)', desc: 'Xuống thang kháng sinh (De-escalation) theo kháng sinh đồ, rút các đường truyền trung tâm khi ổn định.' }
    ],
    steps: [
      { title: '1. Chẩn đoán Sepsis theo qSOFA & SOFA', type: 'Nhận diện', desc: 'Thở ≥ 22/p, Rối loạn ý thức (GCS < 15), HA tâm thu ≤ 100 mmHg.' },
      { title: '2. Hour-1 Resuscitation Bundle', type: 'Hồi sức khẩn', desc: 'Lấy máu cấy + Cho kháng sinh phổ rộng IV + Hồi sức dịch 30ml/kg Ringer Lactate.' },
      { title: '3. Khởi dùng Thuốc Vận Mạch', type: 'Vận mạch', desc: 'Noradrenaline là lựa chọn hàng đầu (First-line). Mục tiêu giữ MAP ≥ 65 mmHg.' },
      { title: '4. Kiểm soát Nguồn Nhiễm Khuẩn (Source Control)', type: 'Can thiệp', desc: 'Dẫn lưu ổ áp xe, tháo bỏ catheter nhiễm trùng trong vòng 6 - 12 giờ.' }
    ],
    doses: [
      { drug: 'Noradrenaline IV', baseDose: 0.05, unit: 'mcg/kg/phút', calc: (w, _egfr) => `${(w * 0.05).toFixed(2)} - ${(w * 0.5).toFixed(2)} mcg/phút` },
      { drug: 'Cefepime / Meropenem', baseDose: 1, unit: 'g IV', calc: (_w, egfr) => egfr < 30 ? '1g IV q24h (Giảm liều theo eGFR)' : '2g IV q8h' }
    ],
    pearls: 'Mỗi 1 giờ trì hoãn dùng kháng sinh phổ rộng trong Sốc nhiễm khuẩn làm tăng tỷ lệ tử vong 7.6%!'
  },
  asthma: {
    title: 'Phác Đồ Tiếp Cận Cơn Hen Phế Quản Cấp Nặng (Severe Acute Asthma)',
    redFlagTitle: '🚨 CẢNH BÁO ĐỎ — DẤU HIỆU DỌA NGỪNG THỞ TRONG HEN CẤP',
    redFlagItems: [
      'Lồng ngực im lặng (Silent chest), không nghe thấy rì rào phế nang',
      'Tím tái, vã mồ hôi, thở chậm ngáp cá, tri giác lơ mơ',
      'SpO2 < 90% mặc dù đã cho thở Oxy qua Mask'
    ],
    timelines: [
      { phase: '0 - 15 phút (Cấp cứu ban đầu)', desc: 'Phun mù Salbutamol + Ipratropium liên tục, cho thở Oxy giữ SpO2 93-95%, tiêm Solu-Medrol 40mg IV.' },
      { phase: '15 - 60 phút (Đánh giá đáp ứng)', desc: 'Nếu không đáp ứng: Truyền tĩnh mạch Magnesium Sulfate 2g trong 20 phút. Chuẩn bị máy thở không xâm lấn (BiPAP).' },
      { phase: 'Giờ 1 - 3 (Hồi sức)', desc: 'Đánh giá lại khí máu động mạch (ABG). Nếu PaCO2 tăng dần kèm toan hô hấp -> Đặt Nội khí quản khẩn.' },
      { phase: 'Ngày 1 (Duy trì)', desc: 'Chuyển sang corticosteroid uống/tiêm q12h, phun mù ngắt quãng mỗi 4 giờ khi lâm sàng cải thiện.' },
      { phase: 'Ngày 3-7 (Xuất viện)', desc: 'Chuyển sang ICS-Formoterol xịt hàng ngày, hướng dẫn dùng bình xịt định liều (MDI + Spacer).' }
    ],
    steps: [
      { title: '1. Phân loại Mức độ Cơn Hen Cấp', type: 'Đánh giá', desc: 'Nhẹ/Trung bình vs Nặng vs Dọa ngừng thở (Silent chest).' },
      { title: '2. Giãn phế quản Cấp bách', type: 'Điều trị', desc: 'Salbutamol 5mg + Ipratropium 0.5mg phun mù khí định lượng.' },
      { title: '3. Corticosteroid Toàn thân', type: 'Chống viêm', desc: 'Methylprednisolone 40-80mg IV giúp giảm viêm phế quản sau 4-6 giờ.' },
      { title: '4. Magnesium Sulfate 2g IV', type: 'Dự phòng', desc: 'Chỉ định khi cơn hen nặng không đáp ứng với Salbutamol ban đầu.' }
    ],
    doses: [
      { drug: 'Salbutamol Phun mù', baseDose: 5, unit: 'mg', calc: (_w, _egfr) => '5mg (khí dung mỗi 20 phút x 3 lần)' },
      { drug: 'Magnesium Sulfate 20%', baseDose: 2, unit: 'g IV', calc: (_w, _egfr) => '2g IV truyền trong 20 phút' }
    ],
    pearls: 'Tránh đặt Nội khí quản trong cơn hen cấp nếu không bắt buộc, vì nguy cơ bẫy khí (Air trapping) và khí phế thủng áp lực cao!'
  },
  stroke: {
    title: 'Phác Đồ Đột Quỵ Nhồi Máu Não Cấp (Acute Ischemic Stroke)',
    redFlagTitle: '🚨 CẢNH BÁO ĐỎ — CỬA SỔ VÀNG rTPA (DƯỚI 4.5 GIỜ)',
    redFlagItems: [
      'Khởi phát đột ngột: Méo miệng, Yếu nửa người, Nói ngọng (Dấu hiệu FAST)',
      'Huyết áp tâm thu > 185 mmHg hoặc Tâm trương > 110 mmHg (Cần hạ HA trước khi dùng rTPA)',
      'Loại trừ Xuất huyết não bằng Chụp CT Scanner sọ não không tiêm thuốc'
    ],
    timelines: [
      { phase: 'Giờ 0 (Door-to-CT < 20 phút)', desc: 'Chụp CT sọ non-contrast cấp cứu loại trừ xuất huyết. Thử đường huyết mao mạch khẩn.' },
      { phase: 'Giờ 0 - 4.5 (Cửa sổ rTPA)', desc: 'Nếu đủ điều kiện: Tiêm tĩnh mạch Alteplase (rTPA) liều 0.9 mg/kg (Tối đa 90mg).' },
      { phase: 'Giờ 0 - 6.0 (Cửa sổ Can thiệp mạch)', desc: 'Chụp CTA/DSA: Nếu tắc mạch lớn (LVO - ICA/MCA-M1) -> Can thiệp lấy huyết khối bằng dụng cụ cơ học.' },
      { phase: 'Ngày 1 (Đơn vị Đột quỵ)', desc: 'Theo dõi biến chứng chuyển dạng xuất huyết, kiểm soát huyết áp < 180/105 mmHg sau rTPA.' },
      { phase: 'Ngày 3-7 (Dự phòng thứ phát)', desc: 'Dùng Aspirin + Clopidogrel (DAPT), Statin liều cao (Atorvastatin 40mg), tầm soát Rung nhĩ.' }
    ],
    steps: [
      { title: '1. Nhận biết & Chụp CT Sọ Khẩn', type: 'Door-to-CT', desc: 'Chụp CT không tiêm thuốc để phân biệt Nhồi máu vs Xuất huyết não.' },
      { title: '2. Đánh giá Chỉ định rTPA', type: 'Thuốc tiêu sợi huyết', desc: 'Alteplase 0.9 mg/kg (10% bolus, 90% truyền trong 60 phút).' },
      { title: '3. Can Thiệp Mạch Cơ Học (EVT)', type: 'Lấy huyết khối', desc: 'Thực hiện tại trung tâm đột quỵ cho bệnh nhân tắc mạch não lớn.' },
      { title: '4. Kiểm soát Huyết áp Sau rTPA', type: 'Theo dõi', desc: 'Duy trì HA < 180/105 mmHg bằng Nicardipine / Labetalol.' }
    ],
    doses: [
      { drug: 'Alteplase (rTPA) 0.9mg/kg', baseDose: 0.9, unit: 'mg', calc: (w, _egfr) => `${Math.min(90, (w * 0.9)).toFixed(1)} mg (Bolus ${(Math.min(90, w * 0.9) * 0.1).toFixed(1)}mg, còn lại truyền 1 giờ)` },
      { drug: 'Aspirin 300mg', baseDose: 300, unit: 'mg', calc: (_w, _egfr) => '300mg uống (dùng sau rTPA 24 giờ)' }
    ],
    pearls: 'Thời gian là Não (Time is Brain) — Mỗi phút trôi qua trong đột quỵ nhồi máu não làm mất 1.9 triệu tế bào thần kinh!'
  }
};

let currentPosterKey = 'sepsis';

export function renderPoster(key: string): void {
  currentPosterKey = key;
  const data = POSTER_DATA[key];
  if (!data) return;

  // Red Flag Banner
  const flagEl = document.getElementById('urgentRedFlag');
  if (flagEl) {
    flagEl.innerHTML = `
      <h3><i class="fa-solid fa-triangle-exclamation"></i> ${data.redFlagTitle}</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.6;">
        ${data.redFlagItems.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
  }

  // Flowchart Nodes
  const nodesContainer = document.getElementById('flowchartNodesContainer');
  if (nodesContainer) {
    nodesContainer.innerHTML = data.steps.map((step, idx) => `
      <div class="flow-node-step ${idx === 0 ? 'highlighted' : ''}" id="nodeStep_${idx}">
        <div class="flow-node-title">
          <span>${step.title}</span>
          <span class="flow-node-badge">${step.type}</span>
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.875rem;">${step.desc}</div>
      </div>
    `).join('');
  }

  // Pearls
  const pearlsEl = document.getElementById('posterPearlsContent');
  if (pearlsEl) pearlsEl.innerHTML = data.pearls;

  // Update Timeline (reset to index 0)
  const slider = document.getElementById('posterTimelineSlider') as HTMLInputElement | null;
  if (slider) {
    slider.value = '0';
    onTimelineChange(0);
  }

  // Recalc Doses
  recalcDoses();
}

export function onTimelineChange(val: number | string): void {
  const idx = typeof val === 'string' ? parseInt(val, 10) : val;
  const data = POSTER_DATA[currentPosterKey];
  if (!data || !data.timelines[idx]) return;
  const phase = data.timelines[idx];

  const textEl = document.getElementById('timelineCurrentText');
  if (textEl) textEl.textContent = `Thời điểm: ${phase.phase}`;

  const cardEl = document.getElementById('timelinePhaseCard');
  if (cardEl) {
    cardEl.innerHTML = `
      <strong style="color: #38bdf8;">📌 Mục tiêu & Can thiệp cốt lõi:</strong><br/>
      ${phase.desc}
    `;
  }

  document.querySelectorAll('.flow-node-step').forEach((el, i) => {
    if (i === idx) el.classList.add('highlighted');
    else el.classList.remove('highlighted');
  });
}

export function recalcDoses(): void {
  const wInput = document.getElementById('posterPatientWeight') as HTMLInputElement | null;
  const egfrInput = document.getElementById('posterPatientEgfr') as HTMLInputElement | null;

  const w = wInput ? (parseFloat(wInput.value) || 60) : 60;
  const egfr = egfrInput ? (parseFloat(egfrInput.value) || 85) : 85;
  const data = POSTER_DATA[currentPosterKey];
  if (!data) return;

  const container = document.getElementById('dosePillsContainer');
  if (container) {
    container.innerHTML = data.doses.map(d => `
      <div class="dose-result-pill">
        <div><strong>💊 ${d.drug}</strong></div>
        <div style="margin-top: 4px;">Liều tính toán: <span style="color:#22c55e; font-weight:bold;">${d.calc(w, egfr)}</span></div>
      </div>
    `).join('');
  }
}

export function switchPoster(key: string, btnTarget?: HTMLElement): void {
  document.querySelectorAll('.path-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnTarget) {
    btnTarget.classList.add('active');
  } else {
    document.querySelector(`.path-tab-btn[data-poster="${key}"]`)?.classList.add('active');
  }
  renderPoster(key);
}

// Bind to window for HTML event compatibility
if (typeof window !== 'undefined') {
  (window as any).switchPoster = switchPoster;
  (window as any).onTimelineChange = onTimelineChange;
  (window as any).recalcDoses = recalcDoses;
}

export function initPosterBoard(): void {
  const slider = document.getElementById('posterTimelineSlider') as HTMLInputElement | null;
  if (slider) {
    slider.addEventListener('input', (e) => onTimelineChange((e.target as HTMLInputElement).value));
  }

  const wInput = document.getElementById('posterPatientWeight');
  const egfrInput = document.getElementById('posterPatientEgfr');
  if (wInput) wInput.addEventListener('input', recalcDoses);
  if (egfrInput) egfrInput.addEventListener('input', recalcDoses);

  document.querySelectorAll('.path-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = (btn as HTMLElement).dataset.poster || 'sepsis';
      switchPoster(key, e.currentTarget as HTMLElement);
    });
  });

  renderPoster('sepsis');
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPosterBoard);
  } else {
    initPosterBoard();
  }
}
