/**
 * CliniPortal — Tiếp Cận Tím Tái Ở Trẻ Em & Cyanosis / Hyperoxia Test Simulator (TypeScript Module)
 */

export function scrollToSec(secId: string): void {
  const el = document.getElementById(secId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.quick-nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.quick-nav-btn')).find(b => (b as HTMLElement).getAttribute('onclick')?.includes(secId) || (b as HTMLElement).dataset.section === secId);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

export function updateHbSim(hbVal: number): void {
  const hbValDisp = document.getElementById('hbValDisp');
  const resElem = document.getElementById('saO2Result');
  const meterElem = document.getElementById('meterFill');
  const badgeElem = document.getElementById('cyanBadge');
  const explElem = document.getElementById('simExplanation');

  if (!hbValDisp || !resElem || !meterElem || !badgeElem || !explElem) return;

  hbValDisp.innerText = hbVal.toFixed(1) + ' g/dL';
  
  const saO2Lower = Math.max(20, Math.round((1 - 5 / hbVal) * 100));
  const saO2Upper = Math.max(30, Math.round((1 - 3.5 / hbVal) * 100));

  resElem.innerText = saO2Lower + '% - ' + saO2Upper + '%';
  meterElem.style.width = saO2Lower + '%';

  if (hbVal <= 10.5) {
    badgeElem.style.background = 'rgba(239, 68, 68, 0.15)';
    badgeElem.style.color = '#ef4444';
    badgeElem.innerText = 'Tím xuất hiện rất muộn (Thiếu máu nặng)';
    explElem.innerHTML = `Ở trẻ thiếu máu (Hb = ${hbVal} g/dL), nồng độ Hb khử chỉ đạt 5 g/dL khi độ bão hòa oxy SaO2 giảm rất sâu xuống <strong>${saO2Lower}%</strong>. Do đó trẻ có thể bị thiếu oxy mô nặng mà lâm sàng chưa thấy tím rõ!`;
  } else if (hbVal >= 18) {
    badgeElem.style.background = 'rgba(124, 58, 237, 0.15)';
    badgeElem.style.color = '#7c3aed';
    badgeElem.innerText = 'Tím xuất hiện rất sớm (Đa hồng cầu)';
    explElem.innerHTML = `Ở trẻ đa hồng cầu (Hb = ${hbVal} g/dL), nồng độ Hb khử đã đạt 5 g/dL ngay cả khi độ bão hòa oxy SaO2 còn cao ở mức <strong>${saO2Lower}%</strong>. Trẻ rất dễ có biểu hiện tím lâm sàng.`;
  } else {
    badgeElem.style.background = 'rgba(2, 132, 199, 0.15)';
    badgeElem.style.color = '#0284c7';
    badgeElem.innerText = 'Tím xuất hiện ở ngưỡng thông thường';
    explElem.innerHTML = `Ở trẻ có nồng độ Hb bình thường (Hb = ${hbVal} g/dL), triệu chứng tím bắt đầu được quan sát rõ trên da niêm khi SaO2 giảm xuống khoảng <strong>${saO2Lower}% - ${saO2Upper}%</strong>.`;
  }
}

export function setHbPreset(hbVal: number, btnElem?: HTMLElement): void {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');
  const slider = document.getElementById('hbSlider') as HTMLInputElement | null;
  if (slider) slider.value = hbVal.toString();
  updateHbSim(hbVal);
}

export function switchTab(tabId: string, btnElem: HTMLElement): void {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));
  
  btnElem.classList.add('active');
  const panel = document.getElementById(tabId);
  if (panel) panel.classList.add('active');
}

export function runHyperoxiaTest(): void {
  const select = document.getElementById('hyperoxiaSelect') as HTMLSelectElement | null;
  const resVal = document.getElementById('pao2ResultVal');
  const badge = document.getElementById('hyperoxiaStatusBadge');
  const text = document.getElementById('hyperoxiaAnalysisText');

  if (!select || !resVal || !badge || !text) return;
  const type = select.value;

  if (type === 'lung') {
    resVal.innerText = '> 200 - 300 mmHg (TĂNG MẠNH)';
    resVal.style.color = 'var(--cyan-success, #10b981)';
    badge.style.background = 'rgba(16, 185, 129, 0.15)';
    badge.style.color = 'var(--cyan-success, #10b981)';
    badge.innerText = 'NGUYÊN NHÂN DO BỆNH PHỔI';
    text.innerHTML = 'Ở bệnh nhân tổn thương nhu mô phổi, thở Oxy 100% giúp tăng đáng kể áp lực riêng phần Oxy trong các phế nang thông khí tốt, đưa PaO2 vọt lên trên 150 - 200 mmHg.';
  } else if (type === 'chd') {
    resVal.innerText = '< 100 - 150 mmHg (KHÔNG TĂNG)';
    resVal.style.color = 'var(--cyan-danger, #ef4444)';
    badge.style.background = 'rgba(239, 68, 68, 0.15)';
    badge.style.color = 'var(--cyan-danger, #ef4444)';
    badge.innerText = 'TIM BẨM SINH SHUNT PHẢI - TRÁI';
    text.innerHTML = 'Ở trẻ có tật tim bẩm sinh tím (Shunt Phải - Trái), máu tĩnh mạch trộn trực tiếp vào hệ tuần hoàn động mạch mà không qua phổi. Do đó cho dù thở Oxy 100% thì PaO2 động mạch vẫn không thể tăng lên cao (&lt; 100-150 mmHg). <strong>Chỉ định siêu âm tim khẩn cấp &amp; Prostaglandin E1!</strong>';
  } else if (type === 'methb') {
    resVal.innerText = 'PaO2 bình thường nhưng SpO2 thấp';
    resVal.style.color = 'var(--cyan-purple, #8b5cf6)';
    badge.style.background = 'rgba(124, 58, 237, 0.15)';
    badge.style.color = 'var(--cyan-purple, #8b5cf6)';
    badge.innerText = 'HỘI CHỨNG METHEMOGLOBIN';
    text.innerHTML = 'Khí máu hòa tan PaO2 có thể bình thường nhưng độ bão hòa SpO2 giảm và triệu chứng tím không cải thiện với 100% O2. Máu bệnh nhân có màu sô-cô-la đặc trưng. Điều trị bằng Methylene Blue.';
  }
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSec = scrollToSec;
  (window as any).updateHbSim = updateHbSim;
  (window as any).setHbPreset = setHbPreset;
  (window as any).switchTab = switchTab;
  (window as any).runHyperoxiaTest = runHyperoxiaTest;
}

export function initPediatricCyanosis(): void {
  const hbSlider = document.getElementById('hbSlider') as HTMLInputElement | null;
  if (hbSlider) {
    hbSlider.addEventListener('input', (e) => updateHbSim(parseFloat((e.target as HTMLInputElement).value)));
  }
  document.getElementById('hyperoxiaSelect')?.addEventListener('change', runHyperoxiaTest);

  updateHbSim(14);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricCyanosis);
  } else {
    initPediatricCyanosis();
  }
}
