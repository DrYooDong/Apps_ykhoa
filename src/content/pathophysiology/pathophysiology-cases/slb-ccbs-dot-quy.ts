/**
 * Interactive Script for Stroke Pathophysiology Case (slb-ccbs-dot-quy.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 */

// Interactive Tabs Switcher
export function switchTab(event: Event, tabId: string): void {
  const tabs = document.querySelectorAll('.interactive-tabs .tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  const target = event.currentTarget as HTMLElement | null;
  target?.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
}

// PHASES Score Calculator
export function calculatePHASES(): void {
  const p = parseInt((document.getElementById('phases-p') as HTMLSelectElement)?.value || '0', 10);
  const h = parseInt((document.getElementById('phases-h') as HTMLSelectElement)?.value || '0', 10);
  const a = parseInt((document.getElementById('phases-a') as HTMLSelectElement)?.value || '0', 10);
  const s1 = parseInt((document.getElementById('phases-s1') as HTMLSelectElement)?.value || '0', 10);
  const e = parseInt((document.getElementById('phases-e') as HTMLSelectElement)?.value || '0', 10);
  const s2 = parseInt((document.getElementById('phases-s2') as HTMLSelectElement)?.value || '0', 10);

  const score = p + h + a + s1 + e + s2;
  const scoreDisp = document.getElementById('phases-score-display');
  if (scoreDisp) scoreDisp.innerText = score + ' Điểm';

  // Risk mapping
  let risk = '0.4%';
  let badgeText = 'Nguy cơ thấp';
  let badgeClass = 'low';

  if (score <= 2) { risk = '0.4%'; badgeText = 'Nguy cơ rất thấp'; badgeClass = 'low'; }
  else if (score <= 4) { risk = '0.7%'; badgeText = 'Nguy cơ thấp'; badgeClass = 'low'; }
  else if (score <= 5) { risk = '1.0%'; badgeText = 'Nguy cơ trung bình'; badgeClass = 'medium'; }
  else if (score <= 6) { risk = '1.4%'; badgeText = 'Nguy cơ trung bình'; badgeClass = 'medium'; }
  else if (score <= 7) { risk = '2.4%'; badgeText = 'Nguy cơ trung bình-cao'; badgeClass = 'medium'; }
  else if (score <= 8) { risk = '3.2%'; badgeText = 'Nguy cơ cao'; badgeClass = 'high'; }
  else if (score <= 9) { risk = '4.3%'; badgeText = 'Nguy cơ cao'; badgeClass = 'high'; }
  else if (score <= 11) { risk = '7.2%'; badgeText = 'Nguy cơ rất cao'; badgeClass = 'high'; }
  else { risk = '≥ 10.0%'; badgeText = 'Nguy cơ cực kỳ cao'; badgeClass = 'high'; }

  const riskDisp = document.getElementById('phases-risk-display');
  if (riskDisp) riskDisp.innerText = risk;

  const badgeEl = document.getElementById('phases-badge');
  if (badgeEl) {
    badgeEl.className = 'calc-risk-badge ' + badgeClass;
    badgeEl.innerText = badgeText;
  }
}

// Spetzler-Martin Grade Calculator
export function calculateSpetzlerMartin(): void {
  const size = parseInt((document.getElementById('sm-size') as HTMLSelectElement)?.value || '1', 10);
  const elo = parseInt((document.getElementById('sm-eloquence') as HTMLSelectElement)?.value || '0', 10);
  const drain = parseInt((document.getElementById('sm-drainage') as HTMLSelectElement)?.value || '0', 10);

  const gradeNum = size + elo + drain;
  const grades = ['Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V'];
  const gradeStr = grades[gradeNum - 1] || 'Grade V';

  const gradeDisp = document.getElementById('sm-grade-display');
  if (gradeDisp) gradeDisp.innerText = gradeStr;

  let desc = '';
  if (gradeNum === 1 || gradeNum === 2) {
    desc = 'Nguy cơ phẫu thuật thấp ( Grade ' + gradeNum + '). Ưu tiên phẫu thuật vi phẫu cắt bỏ thành công cao.';
  } else if (gradeNum === 3) {
    desc = 'Độ phức tạp trung bình (Grade III). Cần phối hợp nút mạch tiền phẫu, xạ phẫu (Gamma Knife) hoặc phẫu thuật kết hợp.';
  } else {
    desc = 'Nguy cơ phẫu thuật cực kỳ cao (Grade ' + gradeNum + '). Nguy cơ di chứng thần kinh nặng, thường bảo tồn hoặc xạ phẫu gia tăng.';
  }

  const descDisp = document.getElementById('sm-desc-display');
  if (descDisp) descDisp.innerText = desc;
}

if (typeof window !== 'undefined') {
  (window as any).switchTab = switchTab;
  (window as any).calculatePHASES = calculatePHASES;
  (window as any).calculateSpetzlerMartin = calculateSpetzlerMartin;

  document.addEventListener('DOMContentLoaded', () => {
    // Attach change handlers
    const phasesInputs = ['phases-p', 'phases-h', 'phases-a', 'phases-s1', 'phases-e', 'phases-s2'];
    phasesInputs.forEach(id => {
      document.getElementById(id)?.addEventListener('change', calculatePHASES);
    });

    const smInputs = ['sm-size', 'sm-eloquence', 'sm-drainage'];
    smInputs.forEach(id => {
      document.getElementById(id)?.addEventListener('change', calculateSpetzlerMartin);
    });

    calculatePHASES();
    calculateSpetzlerMartin();
  });
}
