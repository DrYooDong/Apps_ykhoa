/**
 * CliniPortal — Cardiovascular Risk Stratification Engine (TypeScript Module)
 * Multi-model 10-Year ASCVD Risk: SCORE2, SCORE2-Diabetes, AHA PREVENT (2023), Clinical Triage & What-If Simulation
 */

let baselineCalculatedRisk = 0;
let currentUnit: 'mmol' | 'mg' = 'mmol';

export function calculateScore2Engine(
  age: number,
  sex: string,
  isSmoker: boolean,
  sbp: number,
  nonHdl: number
): number {
  let baseLogHazard = age >= 70 ? 1.8 : 0.8;
  baseLogHazard += (age - 50) * 0.04;
  baseLogHazard += (sbp - 120) * 0.012;
  baseLogHazard += (nonHdl - 3.0) * 0.15;
  if (isSmoker) baseLogHazard += 0.55;
  if (sex === 'male') baseLogHazard += 0.25;
  return Math.min(Math.max((Math.exp(baseLogHazard) / (1 + Math.exp(baseLogHazard))) * 100, 1), 65);
}

export function calculateScore2DiabetesEngine(
  age: number,
  sex: string,
  isSmoker: boolean,
  sbp: number,
  nonHdl: number,
  form: HTMLElement | Document
): number {
  const baseRisk = calculateScore2Engine(age, sex, isSmoker, sbp, nonHdl);
  const dmAgeInput = form.querySelector('#num_dm_age') as HTMLInputElement | null;
  const hba1cInput = form.querySelector('#num_hba1c') as HTMLInputElement | null;
  const dmAge = parseInt(dmAgeInput?.value || age.toString(), 10) || age;
  const hba1c = parseFloat(hba1cInput?.value || '7.0') || 7.0;

  let dmMultiplier = 1.0;
  if (hba1c > 8.0) dmMultiplier += 0.35;
  if (age - dmAge >= 10) dmMultiplier += 0.25;
  return Math.min(baseRisk * dmMultiplier, 75);
}

export function calculatePreventEngine(
  age: number,
  sex: string,
  isSmoker: boolean,
  sbp: number,
  nonHdl: number,
  egfr: number,
  _form: HTMLElement | Document
): number {
  let baseLogHazard = 0.5 + (age - 45) * 0.05;
  baseLogHazard += (sbp - 120) * 0.01;
  baseLogHazard += (nonHdl - 3.0) * 0.12;
  if (isSmoker) baseLogHazard += 0.45;
  if (sex === 'male') baseLogHazard += 0.15;
  if (egfr < 60) baseLogHazard += (60 - egfr) * 0.015;
  return Math.min(Math.max((Math.exp(baseLogHazard) / (1 + Math.exp(baseLogHazard))) * 100, 0.5), 60);
}

export function updateNonHdl(): void {
  const txtNonHdl = document.getElementById('val_non_hdl');
  const tcInput = document.getElementById('num_tc') as HTMLInputElement | null;
  const hdlInput = document.getElementById('num_hdl') as HTMLInputElement | null;
  const tc = parseFloat(tcInput?.value || '0') || 0;
  const hdl = parseFloat(hdlInput?.value || '0') || 0;

  if (txtNonHdl) {
    if (tc > 0 && hdl > 0) {
      const nonHdl = tc - hdl;
      txtNonHdl.textContent = nonHdl > 0 ? nonHdl.toFixed(2) : '0.00';
    } else {
      txtNonHdl.textContent = '--';
    }
  }
}

export function executeQuickClassifierOutput(
  isAscvd: boolean,
  isSevereCkd: boolean,
  isFh: boolean,
  isDmTargetDamage: boolean
): void {
  const dashboard = document.getElementById('riskResultDashboard');
  if (dashboard) dashboard.style.display = 'block';

  const badge = document.getElementById('txt_overall_risk_badge');
  const reason = document.getElementById('txt_overall_risk_reason');

  if (badge) {
    badge.className = 'risk-badge badge-very-high';
    badge.textContent = 'NGUY CƠ RẤT CAO';
  }

  const reasons: string[] = [];
  if (isAscvd) reasons.push('Đã xác định có bệnh tim mạch do xơ vữa (ASCVD) trên lâm sàng');
  if (isSevereCkd) reasons.push('Bệnh thận mạn giai đoạn nặng (eGFR < 30 mL/phút)');
  if (isFh) reasons.push('Tăng Cholesterol máu chuỗi gia đình (FH)');
  if (isDmTargetDamage) reasons.push('Đái tháo đường đi kèm tổn thương cơ quan đích mức độ nặng');

  if (reason) {
    reason.innerHTML = 'Bệnh nhân được phân tầng thẳng do: <br>• ' + reasons.join('<br>• ');
  }

  const valScore2 = document.getElementById('val_score2_pct');
  const valScore2Db = document.getElementById('val_score2_db_pct');
  const valPrevent = document.getElementById('val_prevent_pct');
  const targetLdlc = document.getElementById('target_ldlc');
  const targetBp = document.getElementById('target_bp');
  const targetAspirin = document.getElementById('target_aspirin');
  const simProjRisk = document.getElementById('val_sim_projected_risk');

  if (valScore2) valScore2.textContent = 'N/A';
  if (valScore2Db) valScore2Db.textContent = 'N/A';
  if (valPrevent) valPrevent.textContent = 'N/A';

  document.querySelectorAll('.score-output-card').forEach(card => card.classList.add('disabled-model'));

  if (targetLdlc) {
    targetLdlc.style.color = 'var(--color-rose)';
    targetLdlc.textContent = '< 1.4 mmol/L (55 mg/dL)';
  }
  if (targetBp) targetBp.textContent = '< 130 / 80 mmHg';
  if (targetAspirin) {
    targetAspirin.innerHTML = '<strong>Khuyến cáo dùng Statin + Aspirin liều thấp</strong> trong dự phòng thứ phát (nếu do biến cố ASCVD).';
  }
  if (simProjRisk) simProjRisk.textContent = 'N/A';
}

export function renderCalculatedDashboard(
  age: number,
  score2: number,
  score2Db: number | null,
  prevent: number,
  hasDiabetes: boolean
): void {
  const dashboard = document.getElementById('riskResultDashboard');
  if (dashboard) dashboard.style.display = 'block';

  document.querySelectorAll('.score-output-card').forEach(card => card.classList.remove('disabled-model'));

  const valScore2 = document.getElementById('val_score2_pct');
  if (valScore2) valScore2.textContent = score2.toFixed(1);

  const dbCard = document.getElementById('card_score2_diabetes');
  const valScore2Db = document.getElementById('val_score2_db_pct');
  if (hasDiabetes && score2Db) {
    if (dbCard) dbCard.classList.remove('disabled-model');
    if (valScore2Db) valScore2Db.textContent = score2Db.toFixed(1);
  } else {
    if (dbCard) dbCard.classList.add('disabled-model');
    if (valScore2Db) valScore2Db.textContent = '--';
  }

  const valPrevent = document.getElementById('val_prevent_pct');
  if (valPrevent) valPrevent.textContent = prevent.toFixed(1);

  const maxRisk = baselineCalculatedRisk;
  const badge = document.getElementById('txt_overall_risk_badge');
  const reason = document.getElementById('txt_overall_risk_reason');
  const targetLdlc = document.getElementById('target_ldlc');
  const targetBp = document.getElementById('target_bp');
  const targetAspirin = document.getElementById('target_aspirin');

  let currentRiskLevel = 'low';

  if (age < 50) {
    if (maxRisk >= 7.5) currentRiskLevel = 'very-high';
    else if (maxRisk >= 2.5) currentRiskLevel = 'high';
    else currentRiskLevel = 'low';
  } else {
    if (maxRisk >= 15.0) currentRiskLevel = 'very-high';
    else if (maxRisk >= 7.5) currentRiskLevel = 'high';
    else if (maxRisk >= 2.5) currentRiskLevel = 'moderate';
    else currentRiskLevel = 'low';
  }

  if (currentRiskLevel === 'very-high') {
    if (badge) {
      badge.className = 'risk-badge badge-very-high';
      badge.textContent = 'NGUY CƠ RẤT CAO';
    }
    if (reason) reason.textContent = `Ước tính điểm số biến cố tim mạch 10 năm vượt ngưỡng nghiêm trọng. Cần khởi trị điều trị nội khoa tối ưu ngay lập tức.`;
    if (targetLdlc) targetLdlc.textContent = '< 1.4 mmol/L (55 mg/dL)';
  } else if (currentRiskLevel === 'high') {
    if (badge) {
      badge.className = 'risk-badge badge-high';
      badge.textContent = 'NGUY CƠ CAO';
    }
    if (reason) reason.textContent = `Điểm số biến cố tim mạch 10 năm thuộc phân tầng cao. Cần điều trị thuốc kiểm soát huyết áp và Lipid máu tích cực.`;
    if (targetLdlc) targetLdlc.textContent = '< 1.8 mmol/L (70 mg/dL)';
  } else if (currentRiskLevel === 'moderate') {
    if (badge) {
      badge.className = 'risk-badge badge-moderate';
      badge.textContent = 'NGUY CƠ TRUNG BÌNH';
    }
    if (reason) reason.textContent = `Nguy cơ trung bình. Thay đổi lối sống toàn diện. Cân nhắc dùng thuốc nếu can thiệp lối sống thất bại sau 3 tháng.`;
    if (targetLdlc) targetLdlc.textContent = '< 2.6 mmol/L (100 mg/dL)';
  } else {
    if (badge) {
      badge.className = 'risk-badge badge-low';
      badge.textContent = 'NGUY CƠ THẤP';
    }
    if (reason) reason.textContent = `Nguy cơ thấp. Tiếp tục duy trì chế độ ăn lành mạnh và tập luyện thể thao định kỳ.`;
    if (targetLdlc) targetLdlc.textContent = '< 3.0 mmol/L (116 mg/dL)';
  }

  if (targetBp) targetBp.textContent = age >= 70 ? '< 140 / 80 mmHg' : '< 130 / 80 mmHg';
  if (targetAspirin) targetAspirin.textContent = 'Không khuyến cáo thường quy cho dự phòng tiên phát.';

  runWhatIfSimulation();
}

export function runWhatIfSimulation(): void {
  if (baselineCalculatedRisk === 0) return;

  const sliderSbp = document.getElementById('slider_sbp_reduction') as HTMLInputElement | null;
  const sliderLdl = document.getElementById('slider_ldl_reduction') as HTMLInputElement | null;
  const sbpReduction = parseInt(sliderSbp?.value || '0', 10);
  const ldlReduction = parseFloat(sliderLdl?.value || '0');

  const valSimSbp = document.getElementById('val_sim_sbp');
  const valSimLdl = document.getElementById('val_sim_ldl');
  const valSimProj = document.getElementById('val_sim_projected_risk');
  const valSimRel = document.getElementById('val_sim_relative_reduction');

  if (valSimSbp) valSimSbp.textContent = sbpReduction.toString();
  if (valSimLdl) valSimLdl.textContent = ldlReduction.toFixed(1);

  const sbpFactor = Math.pow(0.80, sbpReduction / 10);
  const ldlFactor = Math.pow(0.78, ldlReduction / 1.0);

  let projectedRisk = baselineCalculatedRisk * sbpFactor * ldlFactor;
  projectedRisk = Math.max(projectedRisk, 0.5);

  const relativeReduction = ((baselineCalculatedRisk - projectedRisk) / baselineCalculatedRisk) * 100;

  if (valSimProj) valSimProj.textContent = projectedRisk.toFixed(1);
  if (valSimRel) valSimRel.textContent = relativeReduction.toFixed(0);
}

export function autoEvaluateRiskEngine(): void {
  const isAscvd = (document.getElementById('chk_ascvd') as HTMLInputElement | null)?.checked || false;
  const isSevereCkd = (document.getElementById('chk_severe_ckd') as HTMLInputElement | null)?.checked || false;
  const isFh = (document.getElementById('chk_fh') as HTMLInputElement | null)?.checked || false;
  const isDmTargetDamage = (document.getElementById('chk_dm_target_damage') as HTMLInputElement | null)?.checked || false;

  if (isAscvd || isSevereCkd || isFh || isDmTargetDamage) {
    executeQuickClassifierOutput(isAscvd, isSevereCkd, isFh, isDmTargetDamage);
    return;
  }

  const age = parseInt((document.getElementById('num_age') as HTMLInputElement | null)?.value || '0', 10);
  const sex = (document.getElementById('sel_sex') as HTMLSelectElement | null)?.value || 'male';
  const isSmoker = (document.getElementById('sel_smoker') as HTMLSelectElement | null)?.value === 'yes';
  const sbp = parseInt((document.getElementById('num_sbp') as HTMLInputElement | null)?.value || '0', 10);
  const tc = parseFloat((document.getElementById('num_tc') as HTMLInputElement | null)?.value || '0');
  const hdl = parseFloat((document.getElementById('num_hdl') as HTMLInputElement | null)?.value || '0');
  const egfr = parseInt((document.getElementById('num_egfr') as HTMLInputElement | null)?.value || '0', 10);
  const hasDiabetes = (document.getElementById('chk_has_diabetes') as HTMLInputElement | null)?.checked || false;

  const dashboard = document.getElementById('riskResultDashboard');
  const riskForm = document.getElementById('cardioRiskForm');

  if (!age || !sex || !sbp || !tc || !hdl || !egfr) {
    if (dashboard) dashboard.style.display = 'none';
    return;
  }

  const nonHdlMmol = currentUnit === 'mg' ? (tc - hdl) / 38.67 : (tc - hdl);

  const score2Result = calculateScore2Engine(age, sex, isSmoker, sbp, nonHdlMmol);
  const score2DiabetesResult = hasDiabetes ? calculateScore2DiabetesEngine(age, sex, isSmoker, sbp, nonHdlMmol, riskForm || document) : null;
  const preventResult = calculatePreventEngine(age, sex, isSmoker, sbp, nonHdlMmol, egfr, riskForm || document);

  baselineCalculatedRisk = Math.max(score2Result, score2DiabetesResult || 0, preventResult);

  renderCalculatedDashboard(age, score2Result, score2DiabetesResult, preventResult, hasDiabetes);
}

export function initCardioRiskStudio(): void {
  const riskForm = document.getElementById('cardioRiskForm');
  const lblLipidUnits = document.querySelectorAll('.lbl-lipid-unit');

  const tcInput = document.getElementById('num_tc');
  const hdlInput = document.getElementById('num_hdl');
  if (tcInput) tcInput.addEventListener('input', updateNonHdl);
  if (hdlInput) hdlInput.addEventListener('input', updateNonHdl);

  const unitRadios = document.querySelectorAll('input[name="lipid_unit"]');
  unitRadios.forEach(radio => {
    radio.addEventListener('change', (e: Event) => {
      const nextUnit = (e.target as HTMLInputElement).value as 'mmol' | 'mg';
      if (nextUnit === currentUnit) return;

      const tcInp = document.getElementById('num_tc') as HTMLInputElement | null;
      const hdlInp = document.getElementById('num_hdl') as HTMLInputElement | null;
      const tcVal = parseFloat(tcInp?.value || '0') || 0;
      const hdlVal = parseFloat(hdlInp?.value || '0') || 0;

      if (nextUnit === 'mg') {
        if (tcInp && tcVal > 0) tcInp.value = (tcVal * 38.67).toFixed(0);
        if (hdlInp && hdlVal > 0) hdlInp.value = (hdlVal * 38.67).toFixed(0);
        lblLipidUnits.forEach(span => (span.textContent = 'mg/dL'));
      } else {
        if (tcInp && tcVal > 0) tcInp.value = (tcVal / 38.67).toFixed(2);
        if (hdlInp && hdlVal > 0) hdlInp.value = (hdlVal / 38.67).toFixed(2);
        lblLipidUnits.forEach(span => (span.textContent = 'mmol/L'));
      }
      currentUnit = nextUnit;
      updateNonHdl();
      autoEvaluateRiskEngine();
    });
  });

  if (riskForm) {
    riskForm.addEventListener('input', autoEvaluateRiskEngine);
    riskForm.addEventListener('change', autoEvaluateRiskEngine);
  }

  const sliderSbp = document.getElementById('slider_sbp_reduction');
  const sliderLdl = document.getElementById('slider_ldl_reduction');
  if (sliderSbp) sliderSbp.addEventListener('input', runWhatIfSimulation);
  if (sliderLdl) sliderLdl.addEventListener('input', runWhatIfSimulation);

  const btnReset = document.getElementById('btnResetForm');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const dashboard = document.getElementById('riskResultDashboard');
      const dmSubform = document.getElementById('diabetes_subform');
      const txtNonHdl = document.getElementById('val_non_hdl');
      if (dashboard) dashboard.style.display = 'none';
      if (dmSubform) dmSubform.style.display = 'none';
      if (txtNonHdl) txtNonHdl.textContent = '--';
      baselineCalculatedRisk = 0;
    });
  }

  const chkDiabetes = document.getElementById('chk_has_diabetes') as HTMLInputElement | null;
  if (chkDiabetes) {
    chkDiabetes.addEventListener('change', () => {
      const dmSubform = document.getElementById('diabetes_subform');
      if (dmSubform) {
        dmSubform.style.display = chkDiabetes.checked ? 'block' : 'none';
      }
    });
  }
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.autoEvaluateCardioRiskEngine = autoEvaluateRiskEngine;
  win.runWhatIfCardioSimulation = runWhatIfSimulation;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardioRiskStudio);
  } else {
    initCardioRiskStudio();
  }
}
