/**
 * CliniPortal — Tiếp Cận Tim Bẩm Sinh & AAP SpO2 Screening (TypeScript Module)
 */

export function switchCardioTab(tabId: string): void {
  document.querySelectorAll('.cardio-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-content-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activeBtn = Array.from(document.querySelectorAll('.cardio-tab-btn')).find(b => (b as HTMLElement).getAttribute('onclick')?.includes(tabId) || (b as HTMLElement).dataset.tab === tabId);
  if (activeBtn) activeBtn.classList.add('active');

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) targetPanel.classList.add('active');
}

export function select5TStep(stepNum: number | string): void {
  document.querySelectorAll('.step-5t-btn-card').forEach(card => {
    card.classList.remove('active');
  });
  document.querySelectorAll('[id^="detail-step-"]').forEach(detailBox => {
    (detailBox as HTMLElement).style.display = 'none';
  });

  const activeCard = document.getElementById(`btn-step-${stepNum}`);
  if (activeCard) activeCard.classList.add('active');

  const activeDetail = document.getElementById(`detail-step-${stepNum}`);
  if (activeDetail) (activeDetail as HTMLElement).style.display = 'block';
}

export function calculateSpO2AAP(): void {
  const handInput = document.getElementById('spo2Hand') as HTMLInputElement | null;
  const footInput = document.getElementById('spo2Foot') as HTMLInputElement | null;
  const badge = document.getElementById('spo2Badge');
  const advice = document.getElementById('spo2Advice');

  if (!handInput || !footInput || !badge || !advice) return;

  const hand = parseFloat(handInput.value);
  const foot = parseFloat(footInput.value);

  if (isNaN(hand) || isNaN(foot)) {
    badge.className = "result-badge repeat";
    badge.innerText = "CHỜ NHẬP SỐ";
    advice.innerText = "Vui lòng nhập giá trị SpO2 của cả Tay Phải và Bàn Chân.";
    return;
  }

  const diff = Math.abs(hand - foot);

  if (hand <= 89 || foot <= 89) {
    badge.className = "result-badge fail";
    badge.innerText = "KHÔNG ĐẠT (FAIL)";
    advice.innerHTML = "<strong style='color:#dc2626;'>SpO2 &le; 89%:</strong> CẦN ĐÁNH GIÁ LÂM SÀNG KHẨN VÀ SIÊU ÂM TIM NGAY! Không lặp lại tầm soát.";
  } else if ((hand >= 90 && hand <= 94) || (foot >= 90 && foot <= 94) || diff >= 4) {
    badge.className = "result-badge repeat";
    badge.innerText = "ĐO LẠI (REPEAT)";
    advice.innerHTML = "SpO2 từ 90 - 94% HOẶC chênh lệch &ge; 4%. <strong>Đo lại sau 1 giờ</strong> (Tối đa 3 lần). Nếu sau 3 lần vẫn nằm trong khoảng này &rarr; FAIL (Khám ngay).";
  } else if (hand >= 95 && foot >= 95 && diff <= 3) {
    badge.className = "result-badge pass";
    badge.innerText = "ĐẠT (PASS)";
    advice.innerHTML = "SpO2 &ge; 95% ở cả 2 vị trí và chênh lệch &le; 3%. <strong>Đạt yêu cầu sàng lọc</strong>, chuyển chăm sóc sơ sinh bình thường.";
  } else {
    badge.className = "result-badge repeat";
    badge.innerText = "ĐO LẠI (REPEAT)";
    advice.innerText = "Vui lòng kiểm tra lại vị trí dán đầu dò và đo lại.";
  }
}

if (typeof window !== 'undefined') {
  (window as any).switchCardioTab = switchCardioTab;
  (window as any).select5TStep = select5TStep;
  (window as any).calculateSpO2AAP = calculateSpO2AAP;
}

export function initPediatricCardio(): void {
  document.getElementById('spo2Hand')?.addEventListener('input', calculateSpO2AAP);
  document.getElementById('spo2Foot')?.addEventListener('input', calculateSpO2AAP);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricCardio);
  } else {
    initPediatricCardio();
  }
}
