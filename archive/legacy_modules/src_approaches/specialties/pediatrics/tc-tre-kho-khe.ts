/**
 * CliniPortal — Tiếp Cận Khò Khè Trẻ Em & CDSS Pediatric Wheezing (TypeScript Module)
 */

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.quick-nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.quick-nav-btn')).find(b => (b as HTMLElement).getAttribute('onclick')?.includes(id) || (b as HTMLElement).dataset.section === id);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

export function runWheezingCdss(): void {
  const ageEl = document.getElementById('simAge') as HTMLSelectElement | null;
  const onsetEl = document.getElementById('simOnset') as HTMLSelectElement | null;
  const respDistress = (document.getElementById('chkRespDistress') as HTMLInputElement)?.checked || false;
  const apiPos = (document.getElementById('chkApiPositive') as HTMLInputElement)?.checked || false;
  const bronchoResp = (document.getElementById('chkBronchoResp') as HTMLInputElement)?.checked || false;
  const stridor = (document.getElementById('chkStridor') as HTMLInputElement)?.checked || false;

  const statusEl = document.getElementById('simWheezeStatus');
  const detailsEl = document.getElementById('simWheezeDetails');

  if (!ageEl || !onsetEl || !statusEl || !detailsEl) return;

  const age = ageEl.value;
  const onset = onsetEl.value;

  // Check Foreign Body Emergency
  if (onset === 'sudden_choke') {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 NGUY CƠ RẤT CAO - DỊ VẬT ĐƯỜNG THỞ (CẤP CỨU)';
    detailsEl.innerHTML = `
      Khởi phát đột ngột + Hội chứng sặc (+).<br>
      👉 <strong>Xử trí ngay:</strong> Cho nhập viện gấp, không thăm khám làm trẻ hoảng sợ. Hội chẩn Tai Mũi Họng / Hô hấp để <strong>Nội soi gắp dị vật khẩn cấp</strong>.
    `;
    return;
  }

  // Check Stridor / Upper Airway
  if (stridor) {
    statusEl.className = 'sim-result-status yellow';
    statusEl.innerHTML = '🟡 TẮC NGHẼN ĐƯỜNG THỞ TẦNG TRÊN (CROUP / VIÊM THANH KHÍ QUẢN)';
    detailsEl.innerHTML = `
      Ghi nhận tiếng Thở rít (Stridor) thì hít vào.<br>
      👉 Tắc nghẽn đường thở ngoài lồng ngực. Đánh giá độ nặng theo bảng điểm Westley. Phun Dexamethasone / Adrenaline khí dung khi có chỉ định.
    `;
    return;
  }

  // Check Under 3 Months
  if (age === 'under3m') {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 CẢNH BÁO TRẺ &lt; 3 THÁNG TUỔI KHÒ KHÈ - CHỈ ĐỊNH NHẬP VIỆN';
    detailsEl.innerHTML = `
      Trẻ dưới 3 tháng tuổi bị khò khè có nguy cơ diễn tiến suy hô hấp nhanh hoặc dị tật bẩm sinh (Mềm sụn khí quản, Vòng mạch).<br>
      👉 <strong>Xử trí:</strong> Cho trẻ nhập viện theo dõi sát và làm X-quang ngực / Siêu âm tầm soát.
    `;
    return;
  }

  // Check Asthma vs Bronchiolitis
  if (onset === 'recurrent' || apiPos || bronchoResp) {
    statusEl.className = 'sim-result-status green';
    statusEl.innerHTML = '🟢 HƯỚNG CHẨN ĐOÁN: HEN TRẺ EM (ASTHMA)';
    detailsEl.innerHTML = `
      Ghi nhận khò khè tái phát, API (+) hoặc đáp ứng tốt với Test Dãn Phế Quản Salbutamol.<br>
      👉 <strong>Xử trí:</strong> Đánh giá mức độ nặng cơn hen cấp. Điều trị Salbutamol phun khí dung + Corticoid đường toàn thân nếu cơn trung bình/nặng. Lập kế hoạch dự phòng Hen.
    `;
    return;
  }

  // Default Bronchiolitis / Bronchitis
  if (respDistress) {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 VIÊM TIỂU PHẾ QUẢN CẤP CÓ SUY HÔ HẤP - CHỈ ĐỊNH NHẬP VIỆN';
    detailsEl.innerHTML = `
      Ghi nhận thở nhanh / co kéo lồng ngực / SpO₂ &lt; 95%.<br>
      👉 <strong>Xử trí:</strong> Nhập viện ngay. Thở oxy qua cannula, hút đàm nhầy, hỗ trợ dinh dưỡng.
    `;
  } else {
    statusEl.className = 'sim-result-status green';
    statusEl.innerHTML = '🟢 VIÊM TIỂU PHẾ QUẢN CẤP / VIÊM PHẾ QUẢN CẤP (MỨC ĐỘ NHẸ)';
    detailsEl.innerHTML = `
      Trẻ khò khè cấp tính có sốt, không dấu suy hô hấp.<br>
      👉 <strong>Xử trí:</strong> Điều trị triệu chứng ngoại trú, vệ sinh mũi họng, tái khám sau 24-48h hoặc khi có dấu hiệu thở nhanh, bỏ bú.
    `;
  }
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSection = scrollToSection;
  (window as any).runWheezingCdss = runWheezingCdss;
}

export function initPediatricWheezing(): void {
  const inputs = ['simAge', 'simOnset', 'chkRespDistress', 'chkApiPositive', 'chkBronchoResp', 'chkStridor'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', runWheezingCdss);
  });
  runWheezingCdss();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricWheezing);
  } else {
    initPediatricWheezing();
  }
}
