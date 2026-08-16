/**
 * CliniPortal — Tiếp Cận Rối Loạn Tri Giác Trẻ Em & Pediatric GCS CDSS (TypeScript Module)
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

export function runGcsCdss(): void {
  const eyeEl = document.getElementById('gcsEye') as HTMLSelectElement | null;
  const verbalEl = document.getElementById('gcsVerbal') as HTMLSelectElement | null;
  const motorEl = document.getElementById('gcsMotor') as HTMLSelectElement | null;

  const e = eyeEl ? parseInt(eyeEl.value, 10) : 4;
  const v = verbalEl ? parseInt(verbalEl.value, 10) : 5;
  const m = motorEl ? parseInt(motorEl.value, 10) : 6;

  const totalGcs = e + v + m;
  const statusEl = document.getElementById('simGcsStatus');
  const detailsEl = document.getElementById('simGcsDetails');

  if (!statusEl || !detailsEl) return;

  if (totalGcs <= 8) {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = `🔴 GCS ${totalGcs} ĐIỂM - HÔN MÊ NẶNG (CHỈ ĐỊNH ĐẶT NKN)`;
    detailsEl.innerHTML = `
      • <strong>Thành phần:</strong> E${e} V${v} M${m}.<br>
      👉 <strong>HÀNH ĐỘNG CẤP CỨU NGAY:</strong><br>
      1. <strong>Chỉ định Đặt Nội Khí Quản (ETT)</strong> để bảo vệ đường thở, phòng ngừa hít sặc.<br>
      2. Thở máy hỗ trợ, duy trì SpO2 96-99% và PaCO2 30-40 mmHg.<br>
      3. Kiểm tra ngay <strong>Đường huyết mao mạch tại giường</strong>.<br>
      4. Chuẩn bị chụp CT-scan sọ não khẩn và liệu pháp chống phù não (NaCl 3% / Mannitol).
    `;
  } else if (totalGcs <= 12) {
    statusEl.className = 'sim-result-status yellow';
    statusEl.innerHTML = `🟡 GCS ${totalGcs} ĐIỂM - RỐI LOẠN TRI GIÁC TRUNG BÌNH`;
    detailsEl.innerHTML = `
      • <strong>Thành phần:</strong> E${e} V${v} M${m}.<br>
      👉 <strong>Xử trí:</strong> Cho thở Oxy qua mask, nằm đầu cao 30°, theo dõi sát GCS mỗi 15-30 phút. Kiểm tra đường huyết, điện giải và làm xét nghiệm tầm soát nguyên nhân.
    `;
  } else {
    statusEl.className = 'sim-result-status green';
    statusEl.innerHTML = `🟢 GCS ${totalGcs} ĐIỂM - RỐI LOẠN TRI GIÁC NHẸ / TỈNH TÁO`;
    detailsEl.innerHTML = `
      • <strong>Thành phần:</strong> E${e} V${v} M${m}.<br>
      👉 Trẻ còn tỉnh táo/rối loạn nhẹ. Tiếp tục theo dõi dấu hiệu sinh tồn và khám tìm nguyên nhân gốc (nhiễm trùng, sốt, ngộ độc).
    `;
  }
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSection = scrollToSection;
  (window as any).runGcsCdss = runGcsCdss;
}

export function initPediatricGCS(): void {
  const gcsInputs = ['gcsEye', 'gcsVerbal', 'gcsMotor'];
  gcsInputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', runGcsCdss);
  });
  runGcsCdss();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricGCS);
  } else {
    initPediatricGCS();
  }
}
