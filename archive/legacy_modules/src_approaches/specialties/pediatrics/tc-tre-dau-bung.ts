/**
 * CliniPortal — Tiếp Cận Đau Bụng Trẻ Em & CDSS Abdominal Pain (TypeScript Module)
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

export function runCdssEvaluation(): void {
  const ageEl = document.getElementById('simAgeGroup') as HTMLSelectElement | null;
  const durationEl = document.getElementById('simDuration') as HTMLSelectElement | null;
  const rebound = (document.getElementById('chkRebound') as HTMLInputElement)?.checked || false;
  const bilious = (document.getElementById('chkBiliousVomiting') as HTMLInputElement)?.checked || false;
  const melena = (document.getElementById('chkMelena') as HTMLInputElement)?.checked || false;
  const mass = (document.getElementById('chkMass') as HTMLInputElement)?.checked || false;
  const carnett = (document.getElementById('chkCarnettPos') as HTMLInputElement)?.checked || false;
  const nightPain = (document.getElementById('chkNightPain') as HTMLInputElement)?.checked || false;

  const resultStatus = document.getElementById('simResultStatus');
  const resultDetails = document.getElementById('simResultDetails');

  if (!ageEl || !durationEl || !resultStatus || !resultDetails) return;

  const age = ageEl.value;
  const duration = durationEl.value;

  // Check Red Flag Surgical Abdomen
  if (rebound || bilious || melena || mass) {
    resultStatus.className = 'sim-result-status red';
    resultStatus.innerHTML = '🔴 NGUY CƠ RẤT CAO - NGHĨ NHIỀU BỤNG CẤP NGOẠI KHOA!';
    
    const reasons: string[] = [];
    if (rebound) reasons.push('Cảm ứng phúc mạc / Đề kháng thành bụng');
    if (bilious) reasons.push('Nôn dịch mật/máu');
    if (melena) reasons.push('Tiêu phân máu/sô-cô-la');
    if (mass) reasons.push('Khối lồng/U bụng');

    resultDetails.innerHTML = `
      <strong>Phát hiện Cờ đỏ Bụng cấp:</strong> ${reasons.join(', ')}.<br>
      👉 <strong>Xử trí ngay:</strong>
      <ul style="margin: 6px 0 0 0; padding-left: 18px;">
        <li>Hội chẩn Ngoại khoa khẩn cấp!</li>
        <li>Cho trẻ nhịn ăn uống hoàn toàn (NPO).</li>
        <li>Lập đường truyền tĩnh mạch bù dịch.</li>
        <li>Chỉ định Siêu âm bụng / X-quang bụng không sửa soạn khẩn.</li>
      </ul>
    `;
    return;
  }

  // Check Carnett (+) Abdominal Wall pain
  if (carnett) {
    resultStatus.className = 'sim-result-status yellow';
    resultStatus.innerHTML = '🟡 CARNETT TEST (+) - ĐAU THÀNH BỤNG';
    resultDetails.innerHTML = `
      Đau tăng lên khi căng cơ bụng (Carnett test positive).<br>
      Gợi ý nguyên nhân đau xuất phát từ <strong>thành bụng</strong> (chấn thương cơ, nếp bụng, dây thần kinh thành bụng), thường không phải cấp cứu tạng nội tạng. Khám loại trừ khối thoát vị.
    `;
    return;
  }

  // Check Chronic / Red Flag Night Pain
  if (nightPain || duration === 'chronic') {
    resultStatus.className = 'sim-result-status yellow';
    resultStatus.innerHTML = '🟡 ĐAU BỤNG MẠN / CÓ DẤU HIỆU THỰC THỂ';
    resultDetails.innerHTML = `
      Đau bụng kéo dài hoặc có dấu hiệu gợi ý thực thể (thức giấc ban đêm, sốt, sụt cân).<br>
      👉 <strong>Xử trí:</strong> Chỉ định xét nghiệm tầm soát thực thể (Công thức máu, VS/CRP, Siêu âm, Máu ẩn trong phân). Nếu âm tính, đánh giá tiêu chuẩn Rome IV.
    `;
    return;
  }

  // Neonatal special alert
  if (age === 'neonatal') {
    resultStatus.className = 'sim-result-status yellow';
    resultStatus.innerHTML = '🟡 SƠ SINH ĐAU BỤNG / THỦNG / NEC';
    resultDetails.innerHTML = `
      Trẻ sơ sinh có biểu hiện đau bụng / chướng bụng cần được loại trừ Viêm ruột hoại tử (NEC) và Xoắn ruột xoay bất toàn. Theo dõi sát tại bệnh viện.
    `;
    return;
  }

  // Low Risk
  resultStatus.className = 'sim-result-status green';
  resultStatus.innerHTML = '🟢 NGUY CƠ THẤP - THEO DÕI NGUYÊN NHÂN NỘI KHOA';
  resultDetails.innerHTML = `
    Chưa thấy dấu hiệu bụng cấp ngoại khoa hay cờ đỏ nguy hiểm.<br>
    Theo dõi các nguyên nhân thường gặp: Viêm dạ dày ruột, Nhiễm trùng tiểu, Táo bón. Dặn dò gia đình tái khám ngay nếu xuất hiện nôn ói mật, tiêu máu hoặc đau bụng tăng dần.
  `;
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSection = scrollToSection;
  (window as any).runCdssEvaluation = runCdssEvaluation;
}

export function initPediatricAbdPain(): void {
  const inputs = ['simAgeGroup', 'simDuration', 'chkRebound', 'chkBiliousVomiting', 'chkMelena', 'chkMass', 'chkCarnettPos', 'chkNightPain'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', runCdssEvaluation);
  });
  runCdssEvaluation();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricAbdPain);
  } else {
    initPediatricAbdPain();
  }
}
