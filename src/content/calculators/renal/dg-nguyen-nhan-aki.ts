/**
 * CliniPortal — AKI Etiology & Differential Diagnosis Engine (TypeScript Module)
 * Pre-renal vs Intrinsic (ATN, AIN, Glomerulonephritis) vs Post-renal Obstructive
 * FENa, FEUrea, BUN/Cr ratio, Urine Sediment & Renal Ultrasound Evaluation
 */

export interface AKIIndices {
  fena: number | null;
  feurea: number | null;
  buncr: number | null;
}

export function calculateIndices(): AKIIndices {
  const sCr = parseFloat((document.getElementById('sCr') as HTMLInputElement | null)?.value || '0');
  const sNa = parseFloat((document.getElementById('sNa') as HTMLInputElement | null)?.value || '0');
  const sBun = parseFloat((document.getElementById('sBun') as HTMLInputElement | null)?.value || '0');
  const uCr = parseFloat((document.getElementById('uCr') as HTMLInputElement | null)?.value || '0');
  const uNa = parseFloat((document.getElementById('uNa') as HTMLInputElement | null)?.value || '0');
  const uUrea = parseFloat((document.getElementById('uUrea') as HTMLInputElement | null)?.value || '0');

  let fena: number | null = null;
  let feurea: number | null = null;
  let buncr: number | null = null;

  if (sCr > 0 && sNa > 0 && uCr > 0 && uNa > 0) {
    fena = ((uNa * sCr) / (sNa * uCr)) * 100;
  }
  if (sCr > 0 && sBun > 0 && uCr > 0 && uUrea > 0) {
    feurea = ((uUrea * sCr) / (sBun * uCr)) * 100;
  }
  if (sBun > 0 && sCr > 0) {
    buncr = sBun / sCr;
  }

  const valFena = document.getElementById('val_fena');
  const valFeurea = document.getElementById('val_feurea');
  const valBuncr = document.getElementById('val_buncr');

  if (valFena) valFena.innerText = fena !== null ? `${fena.toFixed(1)}%` : '—';
  if (valFeurea) valFeurea.innerText = feurea !== null ? `${feurea.toFixed(1)}%` : '—';
  if (valBuncr) valBuncr.innerText = buncr !== null ? buncr.toFixed(1) : '—';

  return { fena, feurea, buncr };
}

export function runAnalysis(): void {
  const indices = calculateIndices();
  const fena = indices.fena;
  const feurea = indices.feurea;
  const buncr = indices.buncr;

  // Lâm sàng
  const pre_hypo = (document.getElementById('chk_hypovolemia') as HTMLInputElement | null)?.checked || false;
  const pre_co = (document.getElementById('chk_low_co') as HTMLInputElement | null)?.checked || false;
  const pre_vaso = (document.getElementById('chk_vasodilation') as HTMLInputElement | null)?.checked || false;

  const post_symp = (document.getElementById('chk_obstruction_symptoms') as HTMLInputElement | null)?.checked || false;
  const post_hist = (document.getElementById('chk_obstruction_history') as HTMLInputElement | null)?.checked || false;

  const in_toxin = (document.getElementById('chk_toxin') as HTMLInputElement | null)?.checked || false;
  const in_rhabdo = (document.getElementById('chk_rhabdo') as HTMLInputElement | null)?.checked || false;
  const in_ain = (document.getElementById('chk_ain_signs') as HTMLInputElement | null)?.checked || false;
  const in_gn = (document.getElementById('chk_gn_signs') as HTMLInputElement | null)?.checked || false;

  // Cận lâm sàng
  const sediment = (document.getElementById('urine_sediment') as HTMLSelectElement | null)?.value || 'unknown';
  const usg = (document.getElementById('ultrasound') as HTMLSelectElement | null)?.value || 'unknown';

  let score_pre = 0;
  let score_in = 0;
  let score_post = 0;

  const reasoning: string[] = [];
  let treatment: string[] = [];

  // Phân tích SAU THẬN (Post-renal)
  if (usg === 'hydronephrosis' || usg === 'bladder_distended') score_post += 10;
  if (post_symp) score_post += 3;
  if (post_hist) score_post += 1;

  // Phân tích TRƯỚC THẬN (Pre-renal)
  if (pre_hypo || pre_co || pre_vaso) score_pre += 3;
  if (fena !== null && fena < 1) {
    score_pre += 5;
    reasoning.push('FENa < 1% phản ánh ống thận còn chức năng, tăng tái hấp thu Na+ do giảm tưới máu.');
  }
  if (feurea !== null && feurea < 35) {
    score_pre += 4;
    reasoning.push('FEUrea < 35% ủng hộ nguyên nhân trước thận, đặc biệt hữu ích nếu bệnh nhân đang dùng lợi tiểu.');
  }
  if (buncr !== null && buncr > 20) {
    score_pre += 3;
    reasoning.push('Tỷ lệ BUN/Cr > 20 cho thấy tăng tái hấp thu Urea tại ống thận do lưu lượng dòng chảy chậm (giảm tưới máu).');
  }

  // Phân tích TẠI THẬN (Intrinsic)
  if (in_toxin || in_rhabdo || in_ain || in_gn) score_in += 3;
  if (fena !== null && fena > 2) {
    score_in += 5;
    reasoning.push('FENa > 2% phản ánh tổn thương tế bào ống thận, mất khả năng tái hấp thu Na+.');
  }
  if (feurea !== null && feurea > 50) {
    score_in += 4;
    reasoning.push('FEUrea > 50% gợi ý tổn thương thực thể tại thận.');
  }
  if (buncr !== null && buncr < 15) {
    score_in += 2;
    reasoning.push('Tỷ lệ BUN/Cr < 15 phù hợp với tổn thương tại thận (giảm chức năng tái hấp thu).');
  }
  if (sediment !== 'unknown') {
    score_in += 5;
    if (sediment === 'muddy_brown') reasoning.push('Cặn lắng có trụ hạt bùn nâu (muddy brown casts) là dấu hiệu kinh điển của Hoại tử ống thận cấp (ATN).');
    if (sediment === 'rbc_casts') reasoning.push('Trụ hồng cầu gợi ý viêm cầu thận cấp hoặc viêm mạch máu.');
    if (sediment === 'wbc_eosinophils') reasoning.push('Bạch cầu/Eosinophils niệu gợi ý Viêm mô kẽ thận (AIN).');
  }

  // Tổng hợp chẩn đoán
  let diagnosis = 'Chưa đủ dữ liệu';
  let badgeClass = 'score-badge badge-gray';
  let alertClass = '';

  const maxScore = Math.max(score_pre, score_in, score_post);

  if (maxScore === 0 && reasoning.length === 0) {
    reasoning.push('Vui lòng nhập thông số xét nghiệm hoặc chọn các dấu hiệu lâm sàng để công cụ tiến hành phân tích.');
  } else if (score_post >= 5 || (score_post === maxScore && score_post > 0)) {
    diagnosis = 'AKI SAU THẬN (Post-renal)';
    badgeClass = 'score-badge badge-severe';
    alertClass = 'alert-active';

    if (usg === 'hydronephrosis') reasoning.unshift('Siêu âm có thận ứ nước/giãn đài bể thận, bằng chứng rõ ràng của tắc nghẽn.');
    if (post_symp) reasoning.unshift('Lâm sàng có dấu hiệu tắc nghẽn đường tiểu cấp tính.');

    treatment = [
      'Giải quyết tắc nghẽn ngay lập tức (đặt sonde tiểu Foley nếu bí tiểu).',
      'Hội chẩn Ngoại niệu xem xét mở thông thận ra da hoặc đặt stent JJ nếu tắc nghẽn niệu quản.',
      'Theo dõi sát tình trạng đa niệu sau giải áp (post-obstructive diuresis).'
    ];
  } else if (score_in > score_pre && score_in > 0) {
    diagnosis = 'AKI TẠI THẬN (Intrinsic)';
    badgeClass = 'score-badge badge-mild';
    alertClass = 'alert-intrinsic';

    if (in_toxin || sediment === 'muddy_brown' || in_rhabdo) {
      diagnosis = 'TẠI THẬN - Hoại tử ống thận cấp (ATN)';
    } else if (in_gn || sediment === 'rbc_casts') {
      diagnosis = 'TẠI THẬN - Bệnh lý Cầu thận';
    } else if (in_ain || sediment === 'wbc_eosinophils') {
      diagnosis = 'TẠI THẬN - Viêm kẽ thận (AIN)';
    }

    treatment = [
      'Loại bỏ ngay các nguyên nhân gây độc thận (ngưng NSAIDs, Aminoglycoside...).',
      'Tối ưu hoá huyết động, duy trì MAP ≥ 65 mmHg.',
      'Theo dõi và điều chỉnh điện giải (đặc biệt Kali máu).',
      'Nếu có chỉ định (toan máu nặng, tăng K+, quá tải thể tích kháng trị), xem xét hội chẩn Lọc máu (RRT).'
    ];
  } else if (score_pre >= score_in && score_pre > 0) {
    diagnosis = 'AKI TRƯỚC THẬN (Pre-renal)';
    badgeClass = 'score-badge badge-info';
    alertClass = 'alert-prerenal';

    if (pre_hypo) reasoning.unshift('Lâm sàng có mất dịch / giảm thể tích nội mạch.');
    if (pre_co) reasoning.unshift('Tưới máu thận giảm do suy tim / cung lượng tim thấp.');
    if (pre_vaso) reasoning.unshift('Tưới máu thận giảm do giãn mạch hệ thống.');

    treatment = [
      'Đánh giá và bù dịch tinh thể (NaCl 0.9% hoặc Ringer Lactate) nếu có bằng chứng thiếu dịch.',
      'Thận trọng bù dịch ở bệnh nhân suy tim/sung huyết; có thể cần dùng vận mạch (Norepinephrine) để nâng huyết áp.',
      'Nếu đáp ứng bù dịch (nước tiểu tăng, Creatinine giảm), xác nhận chẩn đoán nguyên nhân trước thận.'
    ];
  } else {
    diagnosis = 'Chưa rõ ràng / Hỗn hợp';
    badgeClass = 'score-badge badge-gray';
    reasoning.push('Các thông số chưa đủ phân biệt rõ ràng hoặc có tình trạng chồng lấp (Ví dụ: AKI Trước thận diễn tiến thành ATN).');
    treatment = [
      'Làm Test truyền dịch (nếu không có chống chỉ định) để đánh giá đáp ứng.',
      'Chỉ định thêm cặn lắng nước tiểu, siêu âm thận, và theo dõi sinh hiệu sinh hóa sát sao.'
    ];
  }

  // Render Results
  const badge = document.getElementById('aki-type-badge');
  if (badge) {
    badge.innerText = diagnosis;
    badge.className = badgeClass;
  }

  const alertBox = document.getElementById('diag-alert');
  if (alertBox) {
    alertBox.className = 'diagnostic-box ' + alertClass;
  }

  const text = document.getElementById('diag-text');
  if (text) {
    text.innerHTML = reasoning.length > 0 ? '• ' + reasoning.join('<br>• ') : '';
  }

  const treatmentBox = document.getElementById('treatment-plan');
  const treatmentList = document.getElementById('treatment-list');

  if (treatmentBox && treatmentList) {
    if (treatment.length > 0) {
      treatmentBox.style.display = 'block';
      treatmentList.innerHTML = treatment.map(item => `<li>${item}</li>`).join('');
    } else {
      treatmentBox.style.display = 'none';
    }
  }
}

export function resetForm(): void {
  document.querySelectorAll('input[type="number"]').forEach(el => ((el as HTMLInputElement).value = ''));
  document.querySelectorAll('input[type="checkbox"]').forEach(el => ((el as HTMLInputElement).checked = false));
  document.querySelectorAll('select').forEach(el => ((el as HTMLSelectElement).value = 'unknown'));
  runAnalysis();
}

export function initAKIEtiology(): void {
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', runAnalysis);
    el.addEventListener('change', runAnalysis);
  });

  const resetBtn = document.querySelector('.reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }

  runAnalysis();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateIndices = calculateIndices;
  win.runAnalysis = runAnalysis;
  win.resetForm = resetForm;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAKIEtiology);
  } else {
    initAKIEtiology();
  }
}
