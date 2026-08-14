/**
 * CliniPortal — Hepatocellular Carcinoma (HCC) Risk Stratification & Surveillance Studio (TypeScript Module)
 * Incorporates AGA 2026 Guidance: PAGE-B, REAL-B, AASL-HCC, aMAP Score & General Triage
 */

export interface TriageState {
  'cirr-ab': boolean;
  'cirr-c-wait': boolean;
  'cirr-c-no': boolean;
  'hbv-risk': boolean;
  'f3-lower': boolean;
}

export const triageState: TriageState = {
  'cirr-ab': false,
  'cirr-c-wait': false,
  'cirr-c-no': false,
  'hbv-risk': false,
  'f3-lower': false
};

let activeTabId: string = 'tab-triage';
let hbvGender: string = 'male';
let hbvDiabetes: string = 'no';
let hbvAlcohol: string = 'no';
let amapGender: string = 'male';

export function toggleTriageCard(id: keyof TriageState): void {
  const card = document.getElementById(`card-${id}`);
  const checkboxIcon = card?.querySelector('.triage-icon i');

  triageState[id] = !triageState[id];

  if (id === 'cirr-ab' && triageState['cirr-ab']) {
    resetSpecificTriage('cirr-c-wait');
    resetSpecificTriage('cirr-c-no');
    resetSpecificTriage('f3-lower');
  } else if (id === 'cirr-c-wait' && triageState['cirr-c-wait']) {
    resetSpecificTriage('cirr-ab');
    resetSpecificTriage('cirr-c-no');
    resetSpecificTriage('f3-lower');
  } else if (id === 'cirr-c-no' && triageState['cirr-c-no']) {
    resetSpecificTriage('cirr-ab');
    resetSpecificTriage('cirr-c-wait');
    resetSpecificTriage('f3-lower');
  } else if (id === 'f3-lower' && triageState['f3-lower']) {
    resetSpecificTriage('cirr-ab');
    resetSpecificTriage('cirr-c-wait');
    resetSpecificTriage('cirr-c-no');
  }

  if (card && checkboxIcon) {
    if (triageState[id]) {
      card.classList.add('selected');
      checkboxIcon.className = 'fa-solid fa-square-check';
    } else {
      card.classList.remove('selected');
      checkboxIcon.className = 'fa-regular fa-square-check';
    }
  }

  evaluateGeneralTriage();
}

export function resetSpecificTriage(id: keyof TriageState): void {
  triageState[id] = false;
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.classList.remove('selected');
    const icon = card.querySelector('.triage-icon i');
    if (icon) icon.className = 'fa-regular fa-square-check';
  }
}

export function resetTriage(): void {
  (Object.keys(triageState) as Array<keyof TriageState>).forEach(key => {
    resetSpecificTriage(key);
  });
  evaluateGeneralTriage();
}

export function evaluateGeneralTriage(): void {
  const panel = document.getElementById('hcc-display-panel');
  const badge = document.getElementById('result-badge-text');
  const text = document.getElementById('triage-result-text');
  const action = document.getElementById('triage-action-text');

  if (!panel || !badge || !text || !action) return;

  panel.className = 'hcc-result-panel panel-neutral';
  badge.textContent = 'Đang phân tích';

  const selectedKeys = (Object.keys(triageState) as Array<keyof TriageState>).filter(k => triageState[k]);

  if (selectedKeys.length === 0) {
    text.innerHTML = 'Vui lòng chọn thông tin của bệnh nhân ở cột bên trái để đánh giá chỉ định tầm soát HCC.';
    action.innerHTML = 'Hệ thống sẽ cập nhật khuyến nghị ngay khi bạn thay đổi các chỉ số.';
    return;
  }

  if (triageState['cirr-ab']) {
    panel.className = 'hcc-result-panel panel-high';
    badge.textContent = 'ĐỦ TIÊU CHUẨN';
    text.innerHTML = `<strong>KHUYẾN CÁO TẦM SOÁT THƯỜNG QUY</strong><br><br>Bệnh nhân xơ gan Child-Pugh lớp A hoặc B có nguy cơ mắc HCC hằng năm > 1.0%, do đó có lợi ích sống còn rõ rệt khi phát hiện sớm khối u.`;
    action.innerHTML = `<strong>Hành động đề xuất:</strong> Chỉ định siêu âm gan kết hợp định lượng nồng độ AFP huyết thanh mỗi 6 tháng thường quy.`;
  } else if (triageState['cirr-c-wait']) {
    panel.className = 'hcc-result-panel panel-high';
    badge.textContent = 'ĐỦ TIÊU CHUẨN';
    text.innerHTML = `<strong>KHUYẾN CÁO TẦM SOÁT THƯỜNG QUY (Chờ ghép gan)</strong><br><br>Bệnh nhân xơ gan Child-Pugh lớp C nằm trong danh sách chờ ghép gan cần được tầm soát tích cực để phát hiện sớm tổn thương u, tối ưu hóa điểm ưu tiên ghép gan (MELD exception) hoặc tránh nguy cơ vượt quá tiêu chuẩn ghép gan.`;
    action.innerHTML = `<strong>Hành động đề xuất:</strong> Thực hiện siêu âm + AFP mỗi 6 tháng hoặc chụp cắt lớp vi tính (CT)/cộng hưởng từ (MRI) nếu siêu âm gan không đủ độ tin cậy.`;
  } else if (triageState['cirr-c-no']) {
    panel.className = 'hcc-result-panel panel-low';
    badge.textContent = 'KHÔNG KHUYẾN CÁO';
    text.innerHTML = `<strong>KHÔNG KHUYẾN CÁO TẦM SOÁT THƯỜNG QUY</strong><br><br>Bệnh nhân xơ gan Child-Pugh lớp C không phải ứng viên ghép gan, hoặc người bệnh có kỳ vọng sống dưới 1-2 năm do bệnh đồng mắc nặng sẽ không cải thiện được thời gian sống còn khi phát hiện khối u gan.`;
    action.innerHTML = `<strong>Lưu ý lâm sàng:</strong> Không chỉ định tầm soát thường quy. Tập trung vào chăm sóc giảm nhẹ hoặc điều trị triệu chứng liên quan.`;
  } else if (triageState['hbv-risk']) {
    panel.className = 'hcc-result-panel panel-high';
    badge.textContent = 'ĐỦ TIÊU CHUẨN';
    text.innerHTML = `<strong>KHUYẾN CÁO TẦM SOÁT THƯỜNG QUY (Nhiễm HBV mạn)</strong><br><br>Bệnh nhân nhiễm HBV mạn tính chưa xơ gan có ít nhất một yếu tố nguy cơ trên có tỷ lệ mắc HCC hằng năm vượt quá ngưỡng 0.2%, do đó đủ điều kiện để tầm soát.`;
    action.innerHTML = `<strong>Hành động đề xuất:</strong> Chỉ định siêu âm gan + định lượng AFP mỗi 6 tháng.`;
  } else if (triageState['f3-lower']) {
    panel.className = 'hcc-result-panel panel-low';
    badge.textContent = 'KHÔNG KHUYẾN CÁO';
    text.innerHTML = `<strong>KHÔNG KHUYẾN CÁO TẦM SOÁT THƯỜNG QUY (F3 hoặc thấp hơn)</strong><br><br>Bệnh nhân có xơ hóa gan từ F3 trở xuống, bao gồm cả nhóm MASLD và HCV đã đạt SVR chưa xơ gan có nguy cơ hằng năm dưới 0.2%, việc tầm soát hàng loạt không mang lại hiệu quả chi phí và tăng nguy cơ dương tính giả.`;
    action.innerHTML = `<strong>Lưu ý lâm sàng:</strong> Tránh tầm soát thường quy. Tuy nhiên, nếu có yếu tố đi kèm (ví dụ: tiền sử gia đình mạnh) hãy thảo luận cá thể hóa với bệnh nhân.`;
  }
}

export function updateGenderRadio(val: string): void {
  hbvGender = val;
  const lblM = document.getElementById('lbl-gender-m');
  const lblF = document.getElementById('lbl-gender-f');
  if (lblM) lblM.className = val === 'male' ? 'btn-radio checked' : 'btn-radio';
  if (lblF) lblF.className = val === 'female' ? 'btn-radio checked' : 'btn-radio';
  
  amapGender = val;
  const lblAmapM = document.getElementById('lbl-amap-gender-m');
  const lblAmapF = document.getElementById('lbl-amap-gender-f');
  if (lblAmapM) lblAmapM.className = val === 'male' ? 'btn-radio checked' : 'btn-radio';
  if (lblAmapF) lblAmapF.className = val === 'female' ? 'btn-radio checked' : 'btn-radio';
  
  const amapInput = document.querySelector(`input[name="amap-input-gender"][value="${val}"]`) as HTMLInputElement | null;
  if (amapInput) amapInput.checked = true;

  calculateHbvScores();
  calculateAmapScore();
}

export function updateDiabetesRadio(val: string): void {
  hbvDiabetes = val;
  const lblY = document.getElementById('lbl-diabetes-yes');
  const lblN = document.getElementById('lbl-diabetes-no');
  if (lblY) lblY.className = val === 'yes' ? 'btn-radio checked' : 'btn-radio';
  if (lblN) lblN.className = val === 'no' ? 'btn-radio checked' : 'btn-radio';
  calculateHbvScores();
}

export function updateAlcoholRadio(val: string): void {
  hbvAlcohol = val;
  const lblY = document.getElementById('lbl-alcohol-yes');
  const lblN = document.getElementById('lbl-alcohol-no');
  if (lblY) lblY.className = val === 'yes' ? 'btn-radio checked' : 'btn-radio';
  if (lblN) lblN.className = val === 'no' ? 'btn-radio checked' : 'btn-radio';
  calculateHbvScores();
}

export function updateAmapGenderRadio(val: string): void {
  amapGender = val;
  const lblAmapM = document.getElementById('lbl-amap-gender-m');
  const lblAmapF = document.getElementById('lbl-amap-gender-f');
  if (lblAmapM) lblAmapM.className = val === 'male' ? 'btn-radio checked' : 'btn-radio';
  if (lblAmapF) lblAmapF.className = val === 'female' ? 'btn-radio checked' : 'btn-radio';
  
  hbvGender = val;
  const lblM = document.getElementById('lbl-gender-m');
  const lblF = document.getElementById('lbl-gender-f');
  if (lblM) lblM.className = val === 'male' ? 'btn-radio checked' : 'btn-radio';
  if (lblF) lblF.className = val === 'female' ? 'btn-radio checked' : 'btn-radio';
  
  const hbvInput = document.querySelector(`input[name="hbv-input-gender"][value="${val}"]`) as HTMLInputElement | null;
  if (hbvInput) hbvInput.checked = true;

  calculateHbvScores();
  calculateAmapScore();
}

export function calculateHbvScores(): void {
  const hbvAgeInput = document.getElementById('hbv-input-age') as HTMLInputElement | null;
  const hbvPltInput = document.getElementById('hbv-input-plt') as HTMLInputElement | null;
  const hbvAlbInput = document.getElementById('hbv-input-albumin') as HTMLInputElement | null;
  const afpInput = document.getElementById('hbv-input-afp') as HTMLInputElement | null;

  const age = parseInt(hbvAgeInput?.value || '0', 10) || 0;
  const platelets = parseInt(hbvPltInput?.value || '0', 10) || 0;
  const albumin = parseFloat(hbvAlbInput?.value || '0') || 0;
  const afp = parseFloat(afpInput?.value || '0') || 0;
  const isMale = hbvGender === 'male';
  const hasDiabetes = hbvDiabetes === 'yes';
  const hasAlcohol = hbvAlcohol === 'yes';

  if (!age || !platelets || !albumin) {
    updateHbvResultsNull();
    return;
  }

  // 1. PAGE-B CALCULATOR
  let pagebPoints = 0;
  if (age >= 16 && age <= 29) pagebPoints += 0;
  else if (age >= 30 && age <= 39) pagebPoints += 2;
  else if (age >= 40 && age <= 49) pagebPoints += 4;
  else if (age >= 50 && age <= 59) pagebPoints += 6;
  else if (age >= 60 && age <= 69) pagebPoints += 8;
  else if (age >= 70) pagebPoints += 10;

  if (isMale) pagebPoints += 6;

  if (platelets >= 200) pagebPoints += 0;
  else if (platelets >= 100 && platelets < 200) pagebPoints += 6;
  else if (platelets < 100) pagebPoints += 9;

  let pagebRisk = 'low';
  let pagebDesc = 'Nguy cơ thấp (Tỷ lệ mắc HCC 0% trong 5 năm)';
  if (pagebPoints >= 10 && pagebPoints <= 17) {
    pagebRisk = 'medium';
    pagebDesc = 'Nguy cơ trung bình (Cần giám sát siêu âm + AFP mỗi 6 tháng)';
  } else if (pagebPoints >= 18) {
    pagebRisk = 'high';
    pagebDesc = 'Nguy cơ cao (Bắt buộc giám sát chặt chẽ mỗi 6 tháng)';
  }

  // 2. REAL-B CALCULATOR
  let realbPoints = 0;
  if (isMale) realbPoints += 1;
  if (age >= 18 && age <= 29) realbPoints += 0;
  else if (age >= 30 && age <= 39) realbPoints += 1;
  else if (age >= 40 && age <= 49) realbPoints += 2;
  else if (age >= 50 && age <= 59) realbPoints += 3;
  else if (age >= 60 && age <= 69) realbPoints += 4;
  else if (age >= 70 && age <= 79) realbPoints += 5;
  else if (age >= 80) realbPoints += 6;

  if (hasAlcohol) realbPoints += 1;
  if (hasDiabetes) realbPoints += 1;
  if (platelets < 150) realbPoints += 1;
  if (afp >= 10) realbPoints += 1;

  let realbRisk = 'low';
  let realbDesc = 'Nguy cơ thấp (Tỷ lệ mắc HCC 3 năm < 1%)';
  if (realbPoints >= 4 && realbPoints <= 7) {
    realbRisk = 'medium';
    realbDesc = 'Nguy cơ trung bình (Tỷ lệ mắc HCC 3 năm 1 - 5%)';
  } else if (realbPoints >= 8) {
    realbRisk = 'high';
    realbDesc = 'Nguy cơ cao (Tỷ lệ mắc HCC 3 năm > 5%)';
  }

  // 3. AASL-HCC CALCULATOR
  let aaslPoints = 0;
  if (age < 30) aaslPoints += 0;
  else if (age >= 30 && age <= 39) aaslPoints += 2;
  else if (age >= 40 && age <= 49) aaslPoints += 4;
  else if (age >= 50 && age <= 59) aaslPoints += 6;
  else if (age >= 60 && age <= 69) aaslPoints += 8;
  else if (age >= 70) aaslPoints += 10;

  if (albumin >= 3.5) aaslPoints += 0;
  else if (albumin >= 2.8 && albumin < 3.5) aaslPoints += 3;
  else if (albumin < 2.8) aaslPoints += 5;

  if (isMale) aaslPoints += 3;

  let aaslRisk = 'low';
  let aaslDesc = 'Nguy cơ thấp (Tỷ lệ HCC 5 năm ~0%)';
  if (aaslPoints >= 6 && aaslPoints <= 19) {
    aaslRisk = 'medium';
    aaslDesc = 'Nguy cơ trung bình (Tỷ lệ HCC 5 năm ~4.2%)';
  } else if (aaslPoints >= 20) {
    aaslRisk = 'high';
    aaslDesc = 'Nguy cơ cao (Tỷ lệ HCC 5 năm ~17.6%)';
  }

  updateSubScoreCard('pageb', pagebPoints, pagebRisk, pagebDesc);
  updateSubScoreCard('realb', realbPoints, realbRisk, realbDesc);
  updateSubScoreCard('aasl', aaslPoints, aaslRisk, aaslDesc);

  const isHighOverall = pagebRisk === 'high' || realbRisk === 'high' || aaslRisk === 'high';
  const isMediumOverall = pagebRisk === 'medium' || realbRisk === 'medium' || aaslRisk === 'medium';
  const generalRec = document.getElementById('hbv-general-recommendation');
  const displayPanel = document.getElementById('hcc-display-panel');
  const badge = document.getElementById('result-badge-text');

  if (displayPanel && badge && generalRec) {
    if (isHighOverall) {
      displayPanel.className = 'hcc-result-panel panel-high';
      badge.textContent = 'NGUY CƠ CAO';
      generalRec.innerHTML = `<strong>Khuyến nghị lâm sàng:</strong> Bệnh nhân có ít nhất 1 mô hình đánh giá nguy cơ cao. <strong>Bắt buộc tầm soát định kỳ siêu âm + AFP mỗi 6 tháng.</strong> Thảo luận với bệnh nhân về việc tuân thủ điều trị thuốc kháng virus.`;
    } else if (isMediumOverall) {
      displayPanel.className = 'hcc-result-panel panel-medium';
      badge.textContent = 'NGUY CƠ TRUNG BÌNH';
      generalRec.innerHTML = `<strong>Khuyến nghị lâm sàng:</strong> Nguy cơ trung bình. <strong>Khuyến nghị tầm soát siêu âm + AFP mỗi 6 tháng</strong> theo hướng dẫn AGA 2026 do tỷ lệ biến cố tích lũy cao hơn bình thường.`;
    } else {
      displayPanel.className = 'hcc-result-panel panel-low';
      badge.textContent = 'NGUY CƠ THẤP';
      generalRec.innerHTML = `<strong>Khuyến nghị lâm sàng:</strong> Tất cả các thang điểm đều chỉ ra nguy cơ rất thấp. Tỷ lệ biến cố HCC thực tế sát mốc 0%. Xem xét không tầm soát thường quy nếu không có yếu tố nguy cơ đặc biệt nào khác đi kèm.`;
    }
  }
}

function updateSubScoreCard(model: string, points: number, risk: string, desc: string): void {
  const card = document.getElementById(`card-score-${model}`);
  const valSpan = document.getElementById(`val-score-${model}`);
  const lblSpan = document.getElementById(`lbl-score-${model}`);
  const descP = document.getElementById(`desc-score-${model}`);

  if (card) card.className = `sub-score-card ${risk}`;
  if (valSpan) valSpan.textContent = `${points} điểm`;
  if (lblSpan) lblSpan.textContent = risk === 'low' ? 'Thấp' : (risk === 'medium' ? 'Vừa' : 'Cao');
  if (descP) descP.textContent = desc;
}

function updateHbvResultsNull(): void {
  const generalRec = document.getElementById('hbv-general-recommendation');
  if (generalRec) generalRec.innerHTML = `<strong>Chưa đủ thông tin:</strong> Vui lòng nhập đầy đủ các thông số ở cột nhập liệu.`;
}

export function calculateAmapScore(): void {
  const amapAgeInput = document.getElementById('amap-input-age') as HTMLInputElement | null;
  const amapPltInput = document.getElementById('amap-input-plt') as HTMLInputElement | null;
  const amapAlbInput = document.getElementById('amap-input-albumin') as HTMLInputElement | null;
  const amapBiliInput = document.getElementById('amap-input-bilirubin') as HTMLInputElement | null;

  const age = parseInt(amapAgeInput?.value || '0', 10) || 0;
  const platelets = parseInt(amapPltInput?.value || '0', 10) || 0;
  const albumin = parseFloat(amapAlbInput?.value || '0') || 0;
  const bilirubin = parseFloat(amapBiliInput?.value || '0') || 0;
  const isMale = amapGender === 'male';
  const sexVal = isMale ? 1 : 0;

  const displayPanel = document.getElementById('hcc-display-panel');
  const scoreDisplay = document.getElementById('amap-score-val');
  const progressBar = document.getElementById('amap-progress');
  const resultDesc = document.getElementById('amap-result-desc');
  const resultAction = document.getElementById('amap-result-action');
  const badge = document.getElementById('result-badge-text');

  if (!age || !platelets || !albumin || !bilirubin) {
    if (scoreDisplay) scoreDisplay.textContent = '0.0 điểm';
    if (progressBar) progressBar.style.width = '0%';
    if (resultDesc) resultDesc.textContent = 'Vui lòng nhập đầy đủ các chỉ số của bệnh nhân để tính điểm số aMAP.';
    if (resultAction) resultAction.innerHTML = `<strong>Ý nghĩa lâm sàng:</strong> Thang điểm aMAP phân tầng cụ thể mức độ nguy cơ HCC ở bệnh nhân xơ gan để tối ưu hóa tần suất theo dõi.`;
    return;
  }

  const albi = (Math.log10(bilirubin) * 0.66) + (albumin * -0.085);
  const rawScore = 0.06 * age + 0.89 * sexVal + 0.48 * albi - 0.01 * platelets + 7.4;
  const amapScore = (rawScore / 14.77) * 100;
  const amapScoreRounded = Math.max(0, Math.min(100, parseFloat(amapScore.toFixed(1))));

  if (scoreDisplay) scoreDisplay.textContent = `${amapScoreRounded} điểm`;
  if (progressBar) progressBar.style.width = `${amapScoreRounded}%`;

  if (displayPanel && badge && resultDesc && resultAction) {
    if (amapScoreRounded < 50.0) {
      displayPanel.className = 'hcc-result-panel panel-low';
      badge.textContent = 'NGUY CƠ THẤP';
      resultDesc.innerHTML = `<strong>aMAP &lt; 50 (Nguy cơ thấp):</strong> Bệnh nhân xơ gan có tỷ lệ biến cố phát triển HCC hằng năm cực thấp (khoảng 0.98 ca trên 1000 người-năm).`;
      resultAction.innerHTML = `<strong>Hành động đề xuất:</strong> Tiếp tục thực hiện tầm soát siêu âm gan định kỳ kết hợp AFP mỗi 6 tháng. Đây là nhóm có dự hậu tốt nhất.`;
    } else if (amapScoreRounded >= 50.0 && amapScoreRounded < 60.0) {
      displayPanel.className = 'hcc-result-panel panel-medium';
      badge.textContent = 'NGUY CƠ VỪA';
      resultDesc.innerHTML = `<strong>aMAP 50 - 59.9 (Nguy cơ trung bình):</strong> Tỷ lệ biến cố HCC tăng đáng kể (khoảng 7.05 ca trên 1000 người-năm).`;
      resultAction.innerHTML = `<strong>Hành động đề xuất:</strong> Giám sát chặt chẽ siêu âm + AFP mỗi 6 tháng. Chú ý tối ưu hóa chất lượng hình ảnh siêu âm, nếu bị hạn chế do thể trạng béo phì hoặc gan xơ hóa thô, cân nhắc thảo luận chụp CT hoặc MRI.`;
    } else if (amapScoreRounded >= 60.0) {
      displayPanel.className = 'hcc-result-panel panel-high';
      badge.textContent = 'NGUY CƠ CAO';
      resultDesc.innerHTML = `<strong>aMAP &ge; 60 (Nguy cơ cao):</strong> Bệnh nhân xơ gan có nguy cơ cao vượt trội (khoảng 29.1 ca trên 1000 người-năm). Tỷ lệ u phát sinh tích lũy rất cao theo thời gian.`;
      resultAction.innerHTML = `<strong>Hành động đề xuất:</strong> Chỉ định siêu âm + AFP nghiêm ngặt mỗi 6 tháng. Cân nhắc lựa chọn chụp MRI hoặc CT bụng có cản từ định kỳ thay thế siêu âm nếu phát hiện gan xơ thô thắt nút lớn gây khó quan sát.`;
    }
  }
}

export function updateResultPanelStyles(): void {
  if (activeTabId === 'tab-triage') {
    evaluateGeneralTriage();
  } else if (activeTabId === 'tab-hbv') {
    calculateHbvScores();
  } else if (activeTabId === 'tab-cirrhosis') {
    calculateAmapScore();
  } else if (activeTabId === 'tab-academic') {
    const displayPanel = document.getElementById('hcc-display-panel');
    const badge = document.getElementById('result-badge-text');
    if (displayPanel) displayPanel.className = 'hcc-result-panel panel-neutral';
    if (badge) badge.textContent = 'Khuyến cáo AGA 2026';
  }
}

export function toggleLibraryCard(id: string): void {
  const content = document.getElementById(`lib-content-${id}`);
  const arrow = document.getElementById(`lib-arrow-${id}`);
  if (!content || !arrow) return;
  const isCollapsed = content.style.display === 'none';

  if (isCollapsed) {
    content.style.display = 'block';
    arrow.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  } else {
    content.style.display = 'none';
    arrow.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
  }
}

export function filterLibrary(): void {
  const searchInput = document.getElementById('library-search-input') as HTMLInputElement | null;
  const query = (searchInput?.value || '').toLowerCase();
  const cards = document.querySelectorAll('.library-card');

  cards.forEach(card => {
    const text = card.textContent?.toLowerCase() || '';
    const matches = text.includes(query);
    (card as HTMLElement).style.display = matches ? 'block' : 'none';
    
    const content = card.querySelector('[id^="lib-content-"]') as HTMLElement | null;
    const arrow = card.querySelector('[id^="lib-arrow-"]');
    if (query.length > 2 && matches && content && arrow) {
      content.style.display = 'block';
      arrow.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    } else if (query.length === 0 && content && arrow) {
      content.style.display = 'none';
      arrow.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    }
  });
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.toggleTriageCard = toggleTriageCard;
  win.resetTriage = resetTriage;
  win.updateGenderRadio = updateGenderRadio;
  win.updateDiabetesRadio = updateDiabetesRadio;
  win.updateAlcoholRadio = updateAlcoholRadio;
  win.updateAmapGenderRadio = updateAmapGenderRadio;
  win.calculateHbvScores = calculateHbvScores;
  win.calculateAmapScore = calculateAmapScore;
  win.toggleLibraryCard = toggleLibraryCard;
  win.filterLibrary = filterLibrary;
}

export function initHccStudio(): void {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target') || 'tab-triage';
      activeTabId = targetId;

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');

      const setDisplay = (id: string, isShown: boolean) => {
        const el = document.getElementById(id);
        if (el) el.style.display = isShown ? 'block' : 'none';
      };

      setDisplay('result-content-triage', targetId === 'tab-triage');
      setDisplay('result-content-hbv', targetId === 'tab-hbv');
      setDisplay('result-content-cirrhosis', targetId === 'tab-cirrhosis');
      setDisplay('result-content-academic', targetId === 'tab-academic');

      updateResultPanelStyles();
    });
  });

  const hbvAgeInput = document.getElementById('hbv-input-age') as HTMLInputElement | null;
  const amapAgeInput = document.getElementById('amap-input-age') as HTMLInputElement | null;
  const hbvPltInput = document.getElementById('hbv-input-plt') as HTMLInputElement | null;
  const amapPltInput = document.getElementById('amap-input-plt') as HTMLInputElement | null;
  const hbvAlbInput = document.getElementById('hbv-input-albumin') as HTMLInputElement | null;
  const amapAlbInput = document.getElementById('amap-input-albumin') as HTMLInputElement | null;

  if (hbvAgeInput && amapAgeInput) {
    hbvAgeInput.addEventListener('input', () => {
      amapAgeInput.value = hbvAgeInput.value;
      calculateAmapScore();
    });
    amapAgeInput.addEventListener('input', () => {
      hbvAgeInput.value = amapAgeInput.value;
      calculateHbvScores();
    });
  }

  if (hbvPltInput && amapPltInput) {
    hbvPltInput.addEventListener('input', () => {
      amapPltInput.value = hbvPltInput.value;
      calculateAmapScore();
    });
    amapPltInput.addEventListener('input', () => {
      hbvPltInput.value = amapPltInput.value;
      calculateHbvScores();
    });
  }

  if (hbvAlbInput && amapAlbInput) {
    hbvAlbInput.addEventListener('input', () => {
      const valGdl = parseFloat(hbvAlbInput.value) || 0;
      amapAlbInput.value = valGdl ? Math.round(valGdl * 10).toString() : '';
      calculateAmapScore();
    });
    amapAlbInput.addEventListener('input', () => {
      const valGl = parseFloat(amapAlbInput.value) || 0;
      hbvAlbInput.value = valGl ? (valGl / 10).toFixed(1) : '';
      calculateHbvScores();
    });
  }

  const afpInput = document.getElementById('hbv-input-afp');
  if (afpInput) afpInput.addEventListener('input', calculateHbvScores);

  const biliInput = document.getElementById('amap-input-bilirubin');
  if (biliInput) biliInput.addEventListener('input', calculateAmapScore);

  const libSearch = document.getElementById('library-search-input');
  if (libSearch) libSearch.addEventListener('input', filterLibrary);

  calculateHbvScores();
  calculateAmapScore();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHccStudio);
  } else {
    initHccStudio();
  }
}
