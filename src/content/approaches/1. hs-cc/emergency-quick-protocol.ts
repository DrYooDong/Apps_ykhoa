/**
 * CliniPortal — Cấp Cứu Hồi Sức Protocols & CPR 2-Minute Timer (TypeScript Module)
 */

export interface EmergencyStep {
  urgent?: boolean;
  action?: boolean;
  num: string;
  title: string;
  desc: string;
  drug?: string;
}

export interface EmergencyProtocol {
  title: string;
  icon: string;
  steps: EmergencyStep[];
}

export const EMERGENCY_PROTOCOLS: Record<string, EmergencyProtocol> = {
  cpr: {
    title: "Ngưng Tuần Hoàn (BLS / ACLS 2026 Protocol)",
    icon: "fa-heart-pulse",
    steps: [
      { urgent: true, num: "1", title: "Gọi hỗ trợ & Đưa máy AED/Monitor", desc: "Xác nhận không tỉnh táo, không thở/thở ngáp. Bắt mạch cảnh < 10 giây." },
      { urgent: true, num: "2", title: "Ép tim liên tục (100-120 lần/phút)", desc: "Độ sâu 5-6 cm, trả ngực hoàn toàn. Tỷ lệ 30 ép tim : 2 thông khí (nếu chưa có NKQ)." },
      { action: true, num: "3", title: "Gắn AED / Monitor & Đánh giá nhịp", desc: "Nhịp Rung thất (VF) / Nhanh thất vô mạch (pVT) ➔ ⚡ SHOCK ĐIỆN NGAY 200J." },
      { urgent: false, num: "4", title: "Thiết lập đường truyền IV/IO", desc: "Tiêm Adrenaline 1mg IV sau shock điện lần 2 (cứ 3-5 phút lặp lại). Tiêm Amiodarone 300mg sau shock lần 3.", drug: "Adrenaline 1mg IV | Amiodarone 300mg IV" }
    ]
  },
  anaphylaxis: {
    title: "Phản Vệ CấpTính (Cấp Cứu Độ 2-3-4)",
    icon: "fa-syringe",
    steps: [
      { urgent: true, num: "1", title: "Ngừng ngay tiếp xúc dị nguyên", desc: "Đặt bệnh nhân nằm đầu bằng, chân cao. Nghiêng đầu nếu nôn." },
      { urgent: true, num: "2", title: "ADRENALINE 1/1000 IM BẮP ĐÙI NGAY", desc: "Người lớn: 0.5mL (0.5mg) IM bắp đùi mặt ngoài. Trẻ em: 0.01mg/kg. Lặp lại mỗi 5 phút nếu chưa đáp ứng.", drug: "Adrenaline 0.5mg IM bắp đùi" },
      { action: true, num: "3", title: "Thở oxy Kính/Mask & Xử trí đường thở", desc: "Thở Oxy 6-10 L/p. Chuẩn bị đặt NKQ / Mở khí quản nếu có phù thanh quản (thở rít)." },
      { urgent: false, num: "4", title: "Lập đường truyền & Truyền dịch Nacl 0.9%", desc: "Xả dịch nhanh 1-2 Lít Nacl 0.9% nếu tụt huyết áp. Kháng Histamin H1 & Methylprednisolone 40mg IV.", drug: "Methylprednisolone 40mg IV" }
    ]
  },
  asthma: {
    title: "Cơn Hen Phế Quản Ác Tính",
    icon: "fa-wind",
    steps: [
      { urgent: true, num: "1", title: "Thở Oxy duy trì SpO2 93-95%", desc: "Oxy kính 2-4 L/p hoặc mask." },
      { urgent: true, num: "2", title: "Phun mù Khí dung liên tục", desc: "Salbutamol 5mg + Ipratropium 0.5mg khí dung x 3 lần liên tiếp cách nhau 20 phút.", drug: "Salbutamol 5mg + Ipratropium 0.5mg" },
      { action: true, num: "3", title: "Corticoid Toàn Thân Cấp", desc: "Methylprednisolone 40-80mg IV tiêm chậm.", drug: "Methylprednisolone 40mg IV" },
      { urgent: false, num: "4", title: "Magnesium Sulfate 2g IV", desc: "Pha Magnesii sulfat 2g trong 100mL Nacl 0.9% truyền IV trong 20 phút nếu không đáp ứng." }
    ]
  },
  ape: {
    title: "Phù Phổi Cấp Huyết Động",
    icon: "fa-droplet",
    steps: [
      { urgent: true, num: "1", title: "Tư thế ngồi thõng 2 chân", desc: "Cho bệnh nhân ngồi tựa lưng, thõng 2 chân xuống giường để giảm máu về tim." },
      { urgent: true, num: "2", title: "Thở Oxy túi hoặc BiPAP Cấp", desc: "Thở Oxy túi 10-15 L/p hoặc thở máy không xâm nhập CPAP/BiPAP PEEP 5-10 cmH2O." },
      { action: true, num: "3", title: "Lợi tiểu Furosemide IV & Nitroglycerin", desc: "Furosemide 40-80mg IV. Xịt Nitroglycerin dưới lưỡi nếu HA tâm thu > 110 mmHg.", drug: "Furosemide 40-80mg IV | Nitroglycerin xịt" },
      { urgent: false, num: "4", title: "Morphin Sulfate (nếu đau ngực/lo âu)", desc: "Morphin 2-4mg IV tiêm chậm." }
    ]
  },
  seizure: {
    title: "Co Giật / Trạng Thái Động Kinh",
    icon: "fa-brain",
    steps: [
      { urgent: true, num: "1", title: "Bảo vệ đường thở & Tư thế nghiêng", desc: "Nghiêng đầu bệnh nhân sang 1 bên. Nối Oxy kính/mask. KHÔNG ngáng răng cứng vào miệng." },
      { urgent: true, num: "2", title: "Cắt cơn giật Benzodiazepine (> 5 phút)", desc: "Diazepam 10mg bơm hậu môn hoặc Midazolam 5-10mg tiêm bắp / Diazepam 5mg IV chậm.", drug: "Diazepam 10mg / Midazolam 5mg" },
      { action: true, num: "3", title: "Kiểm tra Đường huyết mao mạch STAT", desc: "Nếu Đường huyết < 3.9 mmol/L ➔ Tiêm Glucose 30% 50mL IV." },
      { urgent: false, num: "4", title: "Chống động kinh thứ phát", desc: "Truyền Phenytoin 15-20mg/kg hoặc Levetiracetam 30mg/kg IV nếu cơn tái phát." }
    ]
  },
  septic: {
    title: "Sốc Nhiễm Khuẩn (Septic Shock)",
    icon: "fa-biohazard",
    steps: [
      { urgent: true, num: "1", title: "Đo Lactate máu & Cấy máu 2 vị trí", desc: "Lấy cấy máu trước khi cho kháng sinh." },
      { urgent: true, num: "2", title: "Kháng sinh phổ rộng STAT (Trong 1h đầu)", desc: "Tiêm tĩnh mạch kháng sinh phổ rộng liều cao ngay lập tức." },
      { action: true, num: "3", title: "Truyền dịch Nacl 0.9% 30mL/kg", desc: "Xả nhanh 30mL/kg dung dịch tinh thể trong 3 giờ đầu." },
      { urgent: false, num: "4", title: "Vận mạch Noradrenaline (Norepinephrine)", desc: "Dùng Noradrenaline duy trì MAP ≥ 65 mmHg nếu huyết áp không lên sau bù đủ dịch.", drug: "Noradrenaline 0.05-0.5 mcg/kg/min" }
    ]
  }
};

export function renderProtocol(key: string): void {
  const data = EMERGENCY_PROTOCOLS[key];
  const card = document.getElementById('protocolContentCard');
  if (!data || !card) return;

  const html = `
    <div class="protocol-title">
      <i class="fa-solid ${data.icon}"></i> ${data.title}
    </div>
    <div class="emergency-timeline">
      ${data.steps.map(s => `
        <div class="timeline-step ${s.urgent ? 'urgent' : (s.action ? 'action' : '')}">
          <div class="step-number">${s.num}</div>
          <div class="step-body">
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
            ${s.drug ? `<span class="drug-badge"><i class="fa-solid fa-capsules"></i> ${s.drug}</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  card.innerHTML = html;
}

export function initCPRTimer(): void {
  const timerDisplay = document.getElementById('cprTimerDisplay');
  const startBtn = document.getElementById('cprStartBtn');
  if (!timerDisplay || !startBtn) return;

  let timerInterval: any = null;
  let secondsLeft = 120;
  let isRunning = false;

  function updateTimerDisplay() {
    const mins = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
    const secs = (secondsLeft % 60).toString().padStart(2, '0');
    timerDisplay!.innerText = `${mins}:${secs}`;
  }

  startBtn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Tiếp tục';
    } else {
      isRunning = true;
      startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
      timerInterval = setInterval(() => {
        if (secondsLeft > 0) {
          secondsLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isRunning = false;
          alert('🚨 HẾT 2 PHÚT CPR: ĐÁNH GIÁ NHỊP TIM & ĐỔI NGƯỜI ÉP TIM NGAY!');
          secondsLeft = 120;
          updateTimerDisplay();
          startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu lại';
        }
      }, 1000);
    }
  });
}

export function initEmergencyProtocols(): void {
  const tabs = document.querySelectorAll('.protocol-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target') || 'cpr';
      renderProtocol(target);
    });
  });

  renderProtocol('cpr');
  initCPRTimer();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmergencyProtocols);
  } else {
    initEmergencyProtocols();
  }
}
