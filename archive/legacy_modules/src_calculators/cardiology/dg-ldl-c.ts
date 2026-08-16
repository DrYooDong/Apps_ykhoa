/**
 * CliniPortal — LDL-C Target Assessment & SCORE2 / ESC Cardiovascular Risk Stratification Engine (TypeScript Module)
 * Incorporates ESC/EAS 2019/2024 & VNHA/VSH 2024 Guidelines: ASCVD, Diabetes, CKD, FH, SCORE2, SCORE2-OP, SCORE2-Diabetes
 */

export type LipidUnit = 'mmol' | 'mg';
export type RiskLevel = 'unknown' | 'low' | 'moderate' | 'high' | 'very-high' | 'extreme' | 'individual';

export interface LipidResult {
  riskLevel: RiskLevel;
  riskReason: string;
  ldlTargetAbsolute: number | null; // in mmol/L
  ldlTargetMg: number | null; // in mg/dL
  requireFiftyPercent: boolean;
}

let lipidUnit: LipidUnit = 'mmol';
let currentResult: LipidResult = {
  riskLevel: 'unknown',
  riskReason: '',
  ldlTargetAbsolute: null,
  ldlTargetMg: null,
  requireFiftyPercent: false
};

export function toggleAccordion(): void {
  const acc = document.getElementById('ref-accordion');
  if (acc) acc.classList.toggle('open');
}

export function toggleASCVDOptions(): void {
  const chk = document.getElementById('chk-ascvd') as HTMLInputElement | null;
  const sub = document.getElementById('ascvd-subform');
  const hasASCVD = chk?.checked || false;
  if (sub) sub.style.display = hasASCVD ? 'block' : 'none';
  if (!hasASCVD) {
    const rec = document.getElementById('chk-recurrent-ascvd') as HTMLInputElement | null;
    if (rec) rec.checked = false;
  }
}

export function toggleDiabetesOptions(): void {
  const chk = document.getElementById('chk-diabetes') as HTMLInputElement | null;
  const sub = document.getElementById('diabetes-subform');
  const hasDM = chk?.checked || false;
  if (sub) sub.style.display = hasDM ? 'block' : 'none';
  if (!hasDM) {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('#diabetes-subform input[type="checkbox"]');
    checkboxes.forEach(c => (c.checked = false));
    const dmAge = document.getElementById('num-dm-age') as HTMLInputElement | null;
    const hba1c = document.getElementById('num-hba1c') as HTMLInputElement | null;
    if (dmAge) dmAge.value = '';
    if (hba1c) hba1c.value = '';
  }
}

export function toggleFHOptions(): void {
  const chk = document.getElementById('chk-fh') as HTMLInputElement | null;
  const sub = document.getElementById('fh-subform');
  const hasFH = chk?.checked || false;
  if (sub) sub.style.display = hasFH ? 'block' : 'none';
  if (!hasFH) {
    const extra = document.getElementById('chk-fh-extra') as HTMLInputElement | null;
    if (extra) extra.checked = false;
  }
}

export function toggleLipidUnit(unit: LipidUnit): void {
  if (lipidUnit === unit) return;

  const tcInput = document.getElementById('num-tc') as HTMLInputElement | null;
  const hdlInput = document.getElementById('num-hdl') as HTMLInputElement | null;
  const currentLdlInput = document.getElementById('num-current-ldl') as HTMLInputElement | null;
  const baselineLdlInput = document.getElementById('num-baseline-ldl') as HTMLInputElement | null;

  const conversionFactor = 38.67;
  const inputs = [tcInput, hdlInput, currentLdlInput, baselineLdlInput];

  inputs.forEach(input => {
    if (!input) return;
    const val = parseFloat(input.value) || 0;
    if (val > 0) {
      if (unit === 'mg') {
        input.value = (val * conversionFactor).toFixed(0);
      } else {
        input.value = (val / conversionFactor).toFixed(2);
      }
    }
  });

  lipidUnit = unit;

  const unitLabels = document.querySelectorAll('.lbl-unit-text');
  unitLabels.forEach(lbl => {
    lbl.textContent = unit === 'mg' ? 'mg/dL' : 'mmol/L';
  });

  autoEvaluate();
}

export function calculateSCORE2(age: number, sex: string, isSmoker: boolean, sbp: number, nonHdl: number): number {
  let baseLogHazard = age >= 70 ? 1.8 : 0.8;
  baseLogHazard += (age - 50) * 0.04;
  baseLogHazard += (sbp - 120) * 0.012;
  baseLogHazard += (nonHdl - 3.0) * 0.15;
  if (isSmoker) baseLogHazard += 0.55;
  if (sex === 'male') baseLogHazard += 0.25;
  return Math.min(Math.max((Math.exp(baseLogHazard) / (1 + Math.exp(baseLogHazard))) * 100, 1), 65);
}

export function calculateSCORE2Diabetes(
  age: number,
  sex: string,
  isSmoker: boolean,
  sbp: number,
  nonHdl: number,
  dmAge: string,
  hba1c: string
): number {
  const baseRisk = calculateSCORE2(age, sex, isSmoker, sbp, nonHdl);
  const dmAgeVal = parseInt(dmAge, 10) || age;
  const hba1cVal = parseFloat(hba1c) || 7.0;
  let dmMultiplier = 1.0;
  if (hba1cVal > 8.0) dmMultiplier += 0.35;
  if (age - dmAgeVal >= 10) dmMultiplier += 0.25;
  return Math.min(baseRisk * dmMultiplier, 75);
}

export function autoEvaluate(): void {
  const hasASCVD = (document.getElementById('chk-ascvd') as HTMLInputElement)?.checked || false;
  const isRecurrentASCVD = (document.getElementById('chk-recurrent-ascvd') as HTMLInputElement)?.checked || false;

  const hasDiabetes = (document.getElementById('chk-diabetes') as HTMLInputElement)?.checked || false;
  const dmSevere = (document.getElementById('chk-dm-severe') as HTMLInputElement)?.checked || false;
  const dmRisk3 = (document.getElementById('chk-dm-risk3') as HTMLInputElement)?.checked || false;
  const dmType1Long = (document.getElementById('chk-dm-type1-long') as HTMLInputElement)?.checked || false;
  const dmRisk1_2 = (document.getElementById('chk-dm-risk1-2') as HTMLInputElement)?.checked || false;
  const dmDuration10_20 = (document.getElementById('chk-dm-duration10-20') as HTMLInputElement)?.checked || false;
  const dmYoungShort = (document.getElementById('chk-dm-young-short') as HTMLInputElement)?.checked || false;
  const dmAge = (document.getElementById('num-dm-age') as HTMLInputElement)?.value || '';
  const hba1c = (document.getElementById('num-hba1c') as HTMLInputElement)?.value || '';

  const ckdStage = (document.getElementById('sel-ckd-stage') as HTMLSelectElement)?.value || 'none';

  const hasFH = (document.getElementById('chk-fh') as HTMLInputElement)?.checked || false;
  const fhExtra = (document.getElementById('chk-fh-extra') as HTMLInputElement)?.checked || false;

  const hasSingleHigh = (document.getElementById('chk-single-high') as HTMLInputElement)?.checked || false;

  const age = parseInt((document.getElementById('num-age') as HTMLInputElement)?.value, 10) || 0;
  const sex = (document.getElementById('sel-sex') as HTMLSelectElement)?.value || '';
  const isSmoker = (document.getElementById('sel-smoker') as HTMLSelectElement)?.value === 'yes';
  const sbp = parseInt((document.getElementById('num-sbp') as HTMLInputElement)?.value, 10) || 0;

  const rawTC = parseFloat((document.getElementById('num-tc') as HTMLInputElement)?.value) || 0;
  const rawHDL = parseFloat((document.getElementById('num-hdl') as HTMLInputElement)?.value) || 0;

  let nonHdlText = '--';
  if (rawTC > 0 && rawHDL > 0) {
    const nonHdlVal = rawTC - rawHDL;
    nonHdlText = nonHdlVal > 0 ? nonHdlVal.toFixed(2) : '0.00';
  }
  const nonHdlEl = document.getElementById('lbl-nonhdl');
  if (nonHdlEl) nonHdlEl.textContent = nonHdlText;

  const tcMmol = lipidUnit === 'mg' ? rawTC / 38.67 : rawTC;
  const hdlMmol = lipidUnit === 'mg' ? rawHDL / 38.67 : rawHDL;
  const nonHdlMmol = tcMmol - hdlMmol;

  let riskLevel: RiskLevel = 'unknown';
  let riskReason = '';
  let targetAbsolute: number | null = 3.0;
  let requireFiftyPercent = false;

  if (hasASCVD) {
    if (isRecurrentASCVD) {
      riskLevel = 'extreme';
      riskReason = 'ASCVD có biến cố mạch vành tái phát lần 2 trong 2 năm khi đang dùng Statin tối đa';
      targetAbsolute = 1.0;
      requireFiftyPercent = false;
    } else {
      riskLevel = 'very-high';
      riskReason = 'Đã xác định có Bệnh tim mạch do xơ vữa (ASCVD) trên lâm sàng/hình ảnh học';
      targetAbsolute = 1.4;
      requireFiftyPercent = true;
    }
  } else if (hasDiabetes) {
    if (dmSevere || dmRisk3 || dmType1Long) {
      riskLevel = 'very-high';
      riskReason = 'Đái tháo đường kèm tổn thương cơ quan đích nặng, &ge; 3 YTNC chính hoặc ĐTĐ tuýp 1 kéo dài &gt; 20 năm';
      targetAbsolute = 1.4;
      requireFiftyPercent = true;
    } else if (dmRisk1_2 || dmDuration10_20) {
      riskLevel = 'high';
      riskReason = 'Đái tháo đường đi kèm 1-2 YTNC chính hoặc có thời gian mắc bệnh kéo dài từ 10 - 20 năm';
      targetAbsolute = 1.8;
      requireFiftyPercent = true;
    } else if (dmYoungShort) {
      riskLevel = 'moderate';
      riskReason = 'Bệnh nhân ĐTĐ trẻ tuổi thời gian mắc bệnh ngắn (&lt; 10 năm), không kèm YTNC khác';
      targetAbsolute = 2.6;
      requireFiftyPercent = false;
    } else {
      if (age >= 40 && sex && sbp > 0 && rawTC > 0 && rawHDL > 0) {
        const dmRiskPct = calculateSCORE2Diabetes(age, sex, isSmoker, sbp, nonHdlMmol, dmAge, hba1c);
        let ageGroupLevel: RiskLevel = 'low';

        if (age < 50) {
          if (dmRiskPct >= 7.5) ageGroupLevel = 'very-high';
          else if (dmRiskPct >= 2.5) ageGroupLevel = 'high';
          else ageGroupLevel = 'low';
        } else {
          if (dmRiskPct >= 15.0) ageGroupLevel = 'very-high';
          else if (dmRiskPct >= 7.5) ageGroupLevel = 'high';
          else if (dmRiskPct >= 2.5) ageGroupLevel = 'moderate';
          else ageGroupLevel = 'low';
        }

        riskLevel = ageGroupLevel;
        riskReason = `Phân tầng ĐTĐ theo mô hình SCORE2-Diabetes tích hợp: Nguy cơ 10 năm là ${dmRiskPct.toFixed(1)}%`;

        if (riskLevel === 'very-high') {
          targetAbsolute = 1.4;
          requireFiftyPercent = true;
        } else if (riskLevel === 'high') {
          targetAbsolute = 1.8;
          requireFiftyPercent = true;
        } else if (riskLevel === 'moderate') {
          targetAbsolute = 2.6;
          requireFiftyPercent = false;
        } else {
          targetAbsolute = 3.0;
          requireFiftyPercent = false;
        }
      } else {
        riskLevel = 'unknown';
        riskReason = 'Đái tháo đường (Chưa đủ thông tin để chạy mô hình SCORE2-Diabetes)';
        targetAbsolute = null;
      }
    }
  } else if (ckdStage !== 'none') {
    if (ckdStage === 'severe') {
      riskLevel = 'very-high';
      riskReason = 'Bệnh thận mạn giai đoạn nặng hoặc cuối (eGFR &lt; 30 mL/phút/1.73m²)';
      targetAbsolute = 1.4;
      requireFiftyPercent = true;
    } else if (ckdStage === 'moderate') {
      riskLevel = 'high';
      riskReason = 'Bệnh thận mạn giai đoạn trung bình (eGFR 30 - 59 mL/phút/1.73m²)';
      targetAbsolute = 1.8;
      requireFiftyPercent = true;
    }
  } else if (hasFH) {
    if (fhExtra) {
      riskLevel = 'very-high';
      riskReason = 'Tăng Cholesterol máu gia đình (FH) kèm &ge; 1 YTNC chính hoặc tổn thương cơ quan đích';
      targetAbsolute = 1.4;
      requireFiftyPercent = true;
    } else {
      riskLevel = 'high';
      riskReason = 'Tăng Cholesterol máu gia đình (FH) đơn thuần không có yếu tố nguy cơ khác';
      targetAbsolute = 1.8;
      requireFiftyPercent = true;
    }
  } else if (hasSingleHigh) {
    if (age >= 40) {
      riskLevel = 'high';
      riskReason = 'Yếu tố nguy cơ riêng lẻ tăng cực kỳ cao ở bệnh nhân trên 40 tuổi';
      targetAbsolute = 1.8;
      requireFiftyPercent = true;
    } else if (age > 0 && age < 40) {
      riskLevel = 'individual';
      riskReason = 'Yếu tố nguy cơ riêng lẻ tăng cực kỳ cao ở bệnh nhân trẻ tuổi (&lt; 40)';
      targetAbsolute = 2.6;
      requireFiftyPercent = false;
    } else {
      riskLevel = 'unknown';
      riskReason = 'Yếu tố nguy cơ riêng lẻ tăng cực kỳ cao (Vui lòng nhập tuổi của bệnh nhân)';
      targetAbsolute = null;
    }
  } else {
    if (age > 0) {
      if (age < 40) {
        riskLevel = 'low';
        riskReason = 'Bệnh nhân trẻ tuổi (&lt; 40 tuổi) không bệnh nền. Đánh giá các yếu tố nguy cơ tăng cường.';
        targetAbsolute = 3.0;
        requireFiftyPercent = false;
      } else {
        if (sex && sbp > 0 && rawTC > 0 && rawHDL > 0) {
          const scoreRisk = calculateSCORE2(age, sex, isSmoker, sbp, nonHdlMmol);
          let scoreRiskLevel: RiskLevel = 'low';

          if (age < 50) {
            if (scoreRisk >= 7.5) scoreRiskLevel = 'very-high';
            else if (scoreRisk >= 2.5) scoreRiskLevel = 'high';
            else scoreRiskLevel = 'low';
          } else {
            if (scoreRisk >= 15.0) scoreRiskLevel = 'very-high';
            else if (scoreRisk >= 7.5) scoreRiskLevel = 'high';
            else if (scoreRisk >= 2.5) scoreRiskLevel = 'moderate';
            else scoreRiskLevel = 'low';
          }

          riskLevel = scoreRiskLevel;
          riskReason = `Tính toán nguy cơ 10 năm theo mô hình ${age >= 70 ? 'SCORE2-OP' : 'SCORE2'}: ${scoreRisk.toFixed(1)}%`;

          if (riskLevel === 'very-high') {
            targetAbsolute = 1.4;
            requireFiftyPercent = true;
          } else if (riskLevel === 'high') {
            targetAbsolute = 1.8;
            requireFiftyPercent = true;
          } else if (riskLevel === 'moderate') {
            targetAbsolute = 2.6;
            requireFiftyPercent = false;
          } else {
            targetAbsolute = 3.0;
            requireFiftyPercent = false;
          }
        } else {
          riskLevel = 'unknown';
          riskReason = 'Chưa đủ thông tin (Huyết áp, Cholesterol, HDL) để chạy mô hình SCORE2';
          targetAbsolute = null;
        }
      }
    } else {
      riskLevel = 'unknown';
      riskReason = 'Vui lòng hoàn tất nhập liệu hoặc chọn bệnh lý nền ở các Bước 1 - 5 để phân tầng.';
      targetAbsolute = null;
    }
  }

  currentResult.riskLevel = riskLevel;
  currentResult.riskReason = riskReason;
  currentResult.ldlTargetAbsolute = targetAbsolute;
  currentResult.requireFiftyPercent = requireFiftyPercent;

  renderRiskResults();
  evaluateTargetAchievement();
}

export function renderRiskResults(): void {
  const badge = document.getElementById('lbl-risk-badge');
  const reasonText = document.getElementById('lbl-risk-reason');
  const targetText = document.getElementById('lbl-ldlc-target');
  const subtargetText = document.getElementById('lbl-ldlc-subtarget');
  const recList = document.getElementById('lbl-rec-list');

  if (!badge || !reasonText || !targetText || !subtargetText || !recList) return;

  badge.className = 'risk-badge';
  let recHtml = '';

  switch (currentResult.riskLevel) {
    case 'extreme':
      badge.classList.add('risk-extreme');
      badge.textContent = 'NGUY CƠ CỰC KỲ CAO';
      targetText.textContent = lipidUnit === 'mg' ? '< 40 mg/dL' : '< 1.0 mmol/L';
      subtargetText.textContent = 'Đích điều trị tối đa (Secondary Prevention)';
      recHtml = `
        <li>Khởi trị ngay liệu pháp Statin cường độ cao phối hợp sớm với Ezetimibe.</li>
        <li>Cân nhắc bổ sung thuốc ức chế PCSK9 nếu LDL-C không đạt mục tiêu sau 4-6 tuần dù đã dùng phối hợp Statin tối đa + Ezetimibe.</li>
        <li>Dự phòng huyết khối bằng Aspirin liều thấp phối hợp.</li>
      `;
      break;
    case 'very-high':
      badge.classList.add('risk-very-high');
      badge.textContent = 'NGUY CƠ RẤT CAO';
      targetText.textContent = lipidUnit === 'mg' ? '< 55 mg/dL' : '< 1.4 mmol/L';
      subtargetText.textContent = 'VÀ giảm ≥ 50% so với trị số LDL-c nền';
      recHtml = `
        <li>Khởi trị liệu pháp Statin cường độ cao (Atorvastatin 40-80mg hoặc Rosuvastatin 20-40mg).</li>
        <li>Mục tiêu kép: Giảm &ge; 50% LDL-C nền VÀ đạt mức tuyệt đối đích.</li>
        <li>Đánh giá lại sau 4-12 tuần để cân nhắc phối hợp thêm Ezetimibe nếu chưa đạt đích.</li>
      `;
      break;
    case 'high':
      badge.classList.add('risk-high');
      badge.textContent = 'NGUY CƠ CAO';
      targetText.textContent = lipidUnit === 'mg' ? '< 70 mg/dL' : '< 1.8 mmol/L';
      subtargetText.textContent = 'VÀ giảm ≥ 50% so với trị số LDL-c nền';
      recHtml = `
        <li>Khởi trị Statin cường độ trung bình đến cao để đạt đích.</li>
        <li>Mục tiêu kép: Giảm &ge; 50% LDL-C nền VÀ đạt đích tuyệt đối.</li>
        <li>Tư vấn thay đổi lối sống toàn diện (ăn kiêng mỡ động vật, tập thể dục &ge; 150 phút/tuần).</li>
      `;
      break;
    case 'moderate':
      badge.classList.add('risk-moderate');
      badge.textContent = 'NGUY CƠ TRUNG BÌNH';
      targetText.textContent = lipidUnit === 'mg' ? '< 100 mg/dL' : '< 2.6 mmol/L';
      subtargetText.textContent = 'Mục tiêu tuyệt đối khuyến cáo';
      recHtml = `
        <li>Can thiệp thay đổi lối sống toàn diện trong 3 tháng.</li>
        <li>Xem xét khởi trị Statin cường độ trung bình nếu lối sống không giúp LDL-C đạt đích.</li>
      `;
      break;
    case 'low':
      badge.classList.add('risk-low');
      badge.textContent = 'NGUY CƠ THẤP';
      targetText.textContent = lipidUnit === 'mg' ? '< 3.0 mmol/L' : '< 3.0 mmol/L';
      subtargetText.textContent = 'Duy trì sức khỏe tim mạch';
      recHtml = `
        <li>Ưu tiên hàng đầu là tư vấn thay đổi lối sống lành mạnh.</li>
        <li>Chưa có chỉ định khởi trị bằng thuốc trừ trường hợp LDL-C rất cao &gt; 4.9 mmol/L.</li>
      `;
      break;
    case 'individual':
      badge.classList.add('risk-individual');
      badge.textContent = 'ĐÍCH CÁ THỂ HÓA';
      targetText.textContent = lipidUnit === 'mg' ? '100 - 116 mg/dL' : '2.6 - 3.0 mmol/L';
      subtargetText.textContent = 'Cân nhắc cá thể hóa ở người trẻ tuổi';
      recHtml = `
        <li>Bệnh nhân trẻ tuổi (&lt; 40) có yếu tố nguy cơ đơn lẻ tăng rất cao.</li>
        <li>Cá thể hóa mục tiêu điều trị rộng hơn (2.6 - 3.0 mmol/L).</li>
        <li>Tập trung kiểm soát các yếu tố nguy cơ khác (đặc biệt là HA tâm thu &lt; 140 mmHg).</li>
      `;
      break;
    default:
      badge.classList.add('risk-low');
      badge.style.backgroundColor = 'var(--color-border)';
      badge.textContent = 'CHƯA ĐỦ THÔNG TIN';
      targetText.textContent = '--';
      subtargetText.textContent = 'Vui lòng hoàn thành dữ liệu';
      recHtml = `<li>Điền đầy đủ các bước bên trái để nhận phân tầng nguy cơ và đích điều trị khuyến cáo.</li>`;
  }

  reasonText.innerHTML = currentResult.riskReason;
  recList.innerHTML = recHtml;
}

export function evaluateTargetAchievement(): void {
  const banner = document.getElementById('lbl-achievement-banner');
  const text = document.getElementById('lbl-achievement-text');
  const barWrapper = document.getElementById('lbl-reduction-bar-wrapper');
  const barFill = document.getElementById('lbl-reduction-bar-fill');

  const rawCurrent = parseFloat((document.getElementById('num-current-ldl') as HTMLInputElement)?.value) || 0;
  const rawBaseline = parseFloat((document.getElementById('num-baseline-ldl') as HTMLInputElement)?.value) || 0;

  if (!banner || !text || !barWrapper || !barFill) return;

  if (!currentResult.ldlTargetAbsolute || rawCurrent <= 0) {
    banner.className = 'achievement-status-banner status-info';
    text.textContent = 'Chưa đủ dữ liệu LDL-c hiện tại';
    barWrapper.style.display = 'none';
    return;
  }

  const currentLdlMmol = lipidUnit === 'mg' ? rawCurrent / 38.67 : rawCurrent;
  const baselineLdlMmol = lipidUnit === 'mg' ? rawBaseline / 38.67 : rawBaseline;
  const targetLdlMmol = currentResult.ldlTargetAbsolute;

  const absoluteAchieved = currentLdlMmol < targetLdlMmol;
  let relativeAchieved = true;
  let percentReduction = 0;

  if (currentResult.requireFiftyPercent && baselineLdlMmol > 0) {
    percentReduction = ((baselineLdlMmol - currentLdlMmol) / baselineLdlMmol) * 100;
    relativeAchieved = percentReduction >= 50;
  }

  const isSuccess = absoluteAchieved && relativeAchieved;

  if (isSuccess) {
    banner.className = 'achievement-status-banner status-success';
    let successMsg = '🎉 ĐẠT MỤC TIÊU ĐIỀU TRỊ!';
    if (currentResult.requireFiftyPercent && baselineLdlMmol > 0) {
      successMsg += `<br><small>Đã giảm ${percentReduction.toFixed(0)}% so với nền (Đạt yêu cầu &ge; 50%)</small>`;
    }
    text.innerHTML = successMsg;
  } else {
    banner.className = 'achievement-status-banner status-failed';
    const delta = currentLdlMmol - targetLdlMmol;
    const deltaText = lipidUnit === 'mg' ? `${(delta * 38.67).toFixed(0)} mg/dL` : `${delta.toFixed(2)} mmol/L`;
    let failMsg = `⚠️ CHƯA ĐẠT ĐÍCH!<br><small>Cần giảm thêm ít nhất <strong>${deltaText}</strong></small>`;

    if (currentResult.requireFiftyPercent && baselineLdlMmol > 0 && !relativeAchieved) {
      failMsg += `<br><small>Mới giảm ${percentReduction.toFixed(0)}% so với nền (Cần giảm &ge; 50% nền)</small>`;
    }
    text.innerHTML = failMsg;
  }

  if (baselineLdlMmol > 0) {
    barWrapper.style.display = 'block';
    percentReduction = Math.max(0, Math.min(100, percentReduction));
    barFill.style.width = `${percentReduction}%`;
    barFill.style.backgroundColor = relativeAchieved ? 'var(--color-success)' : 'var(--color-warning)';
  } else {
    barWrapper.style.display = 'none';
  }
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.toggleAccordion = toggleAccordion;
  win.toggleASCVDOptions = toggleASCVDOptions;
  win.toggleDiabetesOptions = toggleDiabetesOptions;
  win.toggleFHOptions = toggleFHOptions;
  win.toggleLipidUnit = toggleLipidUnit;
  win.autoEvaluate = autoEvaluate;
}

export function initLdlCalculator(): void {
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', autoEvaluate);
    input.addEventListener('change', autoEvaluate);
  });
  autoEvaluate();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLdlCalculator);
  } else {
    initLdlCalculator();
  }
}
