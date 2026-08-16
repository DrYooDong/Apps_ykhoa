/**
 * CliniPortal — Tiếp Cận Thiếu Máu Ở Trẻ Em & Pediatric Anemia CDSS (TypeScript Module)
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

export function runAnemiaCdss(): void {
  const ageGroupEl = document.getElementById('cdssAge') as HTMLSelectElement | null;
  const hb = parseFloat((document.getElementById('cdssHb') as HTMLInputElement)?.value) || 0;
  const mcv = parseFloat((document.getElementById('cdssMcv') as HTMLInputElement)?.value) || 0;
  const retic = parseFloat((document.getElementById('cdssRetic') as HTMLInputElement)?.value) || 0;
  const ferritin = parseFloat((document.getElementById('cdssFerritin') as HTMLInputElement)?.value) || 0;
  const cytopenia = (document.getElementById('chkCytopenia') as HTMLInputElement)?.checked || false;
  const jaundice = (document.getElementById('chkJaundice') as HTMLInputElement)?.checked || false;

  const statusEl = document.getElementById('simAnemiaStatus');
  const detailsEl = document.getElementById('simAnemiaDetails');

  if (!ageGroupEl || !statusEl || !detailsEl) return;

  const ageGroup = ageGroupEl.value;

  // Reference normal MCV & Hb for age
  let normalHb = 12.0;
  let mcvCutoff = 70;

  if (ageGroup === '6m_2y') { normalHb = 11.5; mcvCutoff = 70; }
  else if (ageGroup === '2y_4y') { normalHb = 12.0; mcvCutoff = 73; }
  else if (ageGroup === '5y_7y') { normalHb = 12.5; mcvCutoff = 75; }
  else if (ageGroup === '8y_11y') { normalHb = 13.0; mcvCutoff = 76; }
  else if (ageGroup === '12y_14y') { normalHb = 13.5; mcvCutoff = 77; }
  else if (ageGroup === '15y_17y') { normalHb = 14.0; mcvCutoff = 78; }

  // Calculate Corrected Retic %
  const reticCorrected = (retic * hb) / normalHb;

  // Classify MCV
  const isMicrocytic = mcv < mcvCutoff;
  const isMacrocytic = mcv > 95;

  const mcvType = isMicrocytic ? 'Hồng cầu Nhỏ' : (isMacrocytic ? 'Hồng cầu To' : 'Hồng cầu Đẳng sắc');

  // Diagnostic decision logic
  if (cytopenia) {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 NGUY CƠ SUY TỦY XƯƠNG / XÂM LẤN TỦY (GIẢM NHIỀU DÒNG)';
    detailsEl.innerHTML = `
      Ghi nhận giảm 2-3 dòng tế bào máu.<br>
      • <strong>HCL hiệu chỉnh:</strong> ${reticCorrected.toFixed(2)}% (Thường giảm &lt; 2%).<br>
      👉 <strong>Xử trí ngay:</strong> Cho nhập viện Chuyên khoa Huyết học. Chỉ định làm <strong>Phết máu ngoại biên &amp; Tủy đồ / Sinh thiết tủy</strong> để loại trừ Bạch cầu cấp (Leukemia) hoặc Suy tủy xương.
    `;
    return;
  }

  if (jaundice || reticCorrected > 2.0) {
    statusEl.className = 'sim-result-status red';
    statusEl.innerHTML = '🔴 THIẾU MÁU TÁN HUYẾT (HCL HIỆU CHỈNH TĂNG)';
    detailsEl.innerHTML = `
      • <strong>HCL hiệu chỉnh:</strong> ${reticCorrected.toFixed(2)}% (&gt; 2.0% - Tủy tăng sản phản ứng tốt).<br>
      • <strong>Loại hồng cầu:</strong> ${mcvType} (MCV = ${mcv} fL).<br>
      👉 <strong>Hướng chẩn đoán:</strong> Tán huyết tự miễn (Coombs test), Thalassemia thể nặng/trung bình, Thiếu G6PD, hoặc Bệnh màng hồng cầu. Chỉ định Coombs test, Điện di Hb &amp; Men G6PD.
    `;
    return;
  }

  if (isMicrocytic) {
    if (ferritin < 12) {
      statusEl.className = 'sim-result-status red';
      statusEl.innerHTML = '🔴 CHẨN ĐOÁN: THIẾU MÁU THIẾU SẮT (IDA)';
      detailsEl.innerHTML = `
        • <strong>Chỉ số MCV:</strong> ${mcv} fL (&lt; ngưỡng chuẩn ${mcvCutoff} fL) → Hồng cầu nhỏ.<br>
        • <strong>Ferritin:</strong> ${ferritin} ng/mL (&lt; 12 ng/mL) → Khẳng định thiếu sắt.<br>
        • <strong>HCL hiệu chỉnh:</strong> ${reticCorrected.toFixed(2)}%.<br>
        👉 <strong>Điều trị:</strong> Uống Sắt 3 mg/kg/ngày sắt nguyên tố x 2-3 tháng. Tư vấn chế độ ăn dặm giàu sắt.
      `;
    } else {
      statusEl.className = 'sim-result-status yellow';
      statusEl.innerHTML = '🟡 THIẾU MÁU HỒNG CẦU NHỎ - NGHI THALASSEMIA THỂ ẨN';
      detailsEl.innerHTML = `
        • <strong>Chỉ số MCV:</strong> ${mcv} fL (&lt; ngưỡng ${mcvCutoff} fL).<br>
        • <strong>Ferritin:</strong> ${ferritin} ng/mL (Bình thường / Tăng).<br>
        👉 <strong>Hướng xử trí:</strong> Làm <strong>Điện di Hemoglobin</strong> cho trẻ và bố mẹ để chẩn đoán thể ẩn Thalassemia (alpha hoặc beta-Thalassemia trait). KHÔNG tự ý bổ sung sắt.
      `;
    }
    return;
  }

  if (isMacrocytic) {
    statusEl.className = 'sim-result-status yellow';
    statusEl.innerHTML = '🟡 THIẾU MÁU HỒNG CẦU TO (MACROCYTIC ANEMIA)';
    detailsEl.innerHTML = `
      • <strong>Chỉ số MCV:</strong> ${mcv} fL (&gt; 95 fL).<br>
      👉 <strong>Hướng xử trí:</strong> Định lượng <strong>Vitamin B12</strong> &amp; <strong>Acid Folic</strong> máu, tầm soát hội chứng kém hấp thu hoặc suy giáp.
    `;
    return;
  }

  // Default Normocytic
  statusEl.className = 'sim-result-status green';
  statusEl.innerHTML = '🟢 THIẾU MÁU ĐẲNG SẮC HỒNG CẦU BÌNH THƯỜNG';
  detailsEl.innerHTML = `
    • <strong>Chỉ số MCV:</strong> ${mcv} fL (Bình thường theo tuổi).<br>
    • <strong>HCL hiệu chỉnh:</strong> ${reticCorrected.toFixed(2)}%.<br>
    👉 <strong>Hướng xử trí:</strong> Tầm soát bệnh lý mạn tính (viêm mạn, bệnh thận mạn, suy giáp) hoặc nhiễm siêu vi làm ức chế tủy tạm thời.
  `;
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSection = scrollToSection;
  (window as any).runAnemiaCdss = runAnemiaCdss;
}

export function initPediatricAnemia(): void {
  const anemiaInputs = ['cdssAge', 'cdssHb', 'cdssMcv', 'cdssRetic', 'cdssFerritin', 'chkCytopenia', 'chkJaundice'];
  anemiaInputs.forEach(id => {
    document.getElementById(id)?.addEventListener('input', runAnemiaCdss);
    document.getElementById(id)?.addEventListener('change', runAnemiaCdss);
  });
  runAnemiaCdss();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricAnemia);
  } else {
    initPediatricAnemia();
  }
}
