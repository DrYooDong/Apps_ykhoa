/**
 * CliniPortal — Renal Function & Clinical Nephrology Engine (TypeScript Module)
 * Cockcroft-Gault CrCl, CKD-EPI 2021 eGFR, Du Bois BSA, KDIGO Staging & AKI Diagnosis
 */

import { initAutoInputMasks } from '../../../../js/utils/input-mask.js';
import { FloatingWindow } from '../../../../js/components/floating-window.js';

export interface RenalPipelineInput {
  rawAge: string;
  gender: string;
  height: number;
  weight: number;
  rawScr: string;
  scrUnit: string;
  acr: string;
  rawAkiBaseline: string;
  akiBaselineUnit: string;
  isAki48h: boolean;
  isAkiRrt: boolean;
}

export async function calculateRenal(): Promise<void> {
  const inAge = document.getElementById('ren-age') as HTMLInputElement | null;
  const inGender = document.getElementById('ren-gender') as HTMLSelectElement | null;
  const inHeight = document.getElementById('ren-height') as HTMLInputElement | null;
  const inWeight = document.getElementById('ren-weight') as HTMLInputElement | null;
  const inCr = document.getElementById('ren-cr') as HTMLInputElement | null;
  const inCrUnit = document.getElementById('ren-cr-unit') as HTMLSelectElement | null;
  const inAcr = document.getElementById('ren-acr') as HTMLSelectElement | null;

  const outCgVal = document.getElementById('out-cg-val');
  const outWeightType = document.getElementById('out-weight-type');
  const outWeightVal = document.getElementById('out-weight-val');
  const outWeightReason = document.getElementById('out-weight-reason');

  const outEpiVal = document.getElementById('out-epi-val');
  const outEpiAbs = document.getElementById('out-epi-abs');
  const outBsa = document.getElementById('out-bsa');

  const boxKdigo = document.getElementById('out-kdigo-box');
  const boxMedAlerts = document.getElementById('med-alerts');
  const listMedAlerts = document.getElementById('med-alerts-list');

  const inAkiBaseline = document.getElementById('aki-baseline') as HTMLInputElement | null;
  const inAkiBaselineUnit = document.getElementById('aki-baseline-unit') as HTMLSelectElement | null;
  const inAki48h = document.getElementById('aki-48h') as HTMLInputElement | null;
  const inAkiRrt = document.getElementById('aki-rRT') as HTMLInputElement | null;

  const akiBox = document.getElementById('aki-result-box');
  const akiStage = document.getElementById('aki-stage');
  const akiCriteria = document.getElementById('aki-criteria');
  const akiRecommendation = document.getElementById('aki-recommendation');

  if (!inAge || !inHeight || !inWeight || !inCr || !inCrUnit || !inGender || !inAcr) return;

  const rawAge = inAge.value;
  const ageVal = parseInt(rawAge, 10) || 0;
  if (ageVal > 120 && ageVal < 1900) return;

  const gender = inGender.value;
  const height = parseFloat(inHeight.value) || 0;
  const weight = parseFloat(inWeight.value) || 0;
  const rawScr = inCr.value;
  const scrUnit = inCrUnit.value;
  const acr = inAcr.value;

  const rawAkiBaseline = inAkiBaseline?.value || '';
  const akiBaselineUnit = inAkiBaselineUnit?.value || 'mgdL';
  const isAki48h = inAki48h?.checked || false;
  const isAkiRrt = inAkiRrt?.checked || false;

  if (!rawAge || !height || !weight || !rawScr) return;

  const win = window as any;
  if (win.RenalEngine && win.RenalEngine.pipeline) {
    const context = await win.RenalEngine.pipeline.execute({
      rawAge,
      gender,
      height,
      weight,
      rawScr,
      scrUnit,
      acr,
      rawAkiBaseline,
      akiBaselineUnit,
      isAki48h,
      isAkiRrt
    });

    if (context.cgResult && outCgVal && outWeightType && outWeightVal && outWeightReason) {
      outCgVal.textContent = `${context.cgResult.value} mL/min`;
      outWeightType.textContent = context.weightType;
      outWeightVal.textContent = context.calcWeight;
      outWeightReason.textContent = context.weightReason;
    }

    if (context.epiResult && outEpiVal) {
      outEpiVal.textContent = context.epiResult.value;
    }

    if (context.bsaResult && outBsa && outEpiAbs) {
      outBsa.textContent = context.bsaResult.bsa;
      outEpiAbs.textContent = context.bsaResult.absoluteEgfr !== null ? context.bsaResult.absoluteEgfr : '-';
    }

    if (context.ckdStaging && boxKdigo) {
      boxKdigo.className = `kdigo-risk ${context.ckdStaging.riskClass}`;
      boxKdigo.innerHTML = `${context.ckdStaging.combinedText.replace('A', '-A')} <br> ${context.ckdStaging.riskText}`;
    }

    if (context.akiStaging && akiBox && akiStage && akiCriteria && akiRecommendation) {
      akiBox.style.display = 'block';
      akiBox.className = `aki-result ${context.akiStaging.stageClass}`;
      akiStage.textContent = context.akiStaging.stage;
      akiStage.className = context.akiStaging.stageClass;
      akiCriteria.textContent = context.akiStaging.criteria;
      akiRecommendation.innerHTML = context.akiStaging.recommendation;
    } else if (akiBox) {
      akiBox.style.display = 'none';
    }

    if (context.medicationAlerts && context.medicationAlerts.length > 0 && boxMedAlerts && listMedAlerts) {
      boxMedAlerts.style.display = 'block';
      listMedAlerts.innerHTML = context.medicationAlerts.map((a: string) => `<li>${a}</li>`).join('');
    } else if (boxMedAlerts) {
      boxMedAlerts.style.display = 'none';
    }

    if (win.ClinicalBridge && boxMedAlerts) {
      win.ClinicalBridge.renderActionChips(boxMedAlerts, [
        {
          label: 'Chỉnh liều Kháng sinh',
          icon: '💊',
          url: '../Truyền Nhiễm/Chinhlieu_khangsinh.html'
        },
        {
          label: 'Bơm tiêm điện Vancomycin',
          icon: '🧪',
          url: '../Truyền Nhiễm/QL_Vancomycin.html'
        },
        {
          label: 'Electrolyte Pro Studio',
          icon: '⚡',
          url: 'Electrolyte_Studio.html'
        }
      ]);
    }
  }
}

export function initRenalStudio(): void {
  const inAge = document.getElementById('ren-age') as HTMLInputElement | null;
  const inGender = document.getElementById('ren-gender') as HTMLSelectElement | null;
  const inHeight = document.getElementById('ren-height') as HTMLInputElement | null;
  const inWeight = document.getElementById('ren-weight') as HTMLInputElement | null;
  const inCr = document.getElementById('ren-cr') as HTMLInputElement | null;
  const inCrUnit = document.getElementById('ren-cr-unit') as HTMLSelectElement | null;
  const inAcr = document.getElementById('ren-acr') as HTMLSelectElement | null;
  const inAkiBaseline = document.getElementById('aki-baseline') as HTMLInputElement | null;
  const inAkiBaselineUnit = document.getElementById('aki-baseline-unit') as HTMLSelectElement | null;
  const inAki48h = document.getElementById('aki-48h') as HTMLInputElement | null;
  const inAkiRrt = document.getElementById('aki-rRT') as HTMLInputElement | null;

  if (inCrUnit && inCr) {
    inCrUnit.addEventListener('change', function () {
      const currentVal = parseFloat(inCr.value);
      if (isNaN(currentVal) || currentVal === 0) return;
      if (inCrUnit.value === 'umolL') {
        inCr.value = (currentVal * 88.4).toFixed(1);
        inCr.step = '0.1';
      } else {
        inCr.value = (currentVal / 88.4).toFixed(2);
        inCr.step = '0.01';
      }
      calculateRenal();
    });
  }

  if (inAkiBaselineUnit && inAkiBaseline) {
    inAkiBaselineUnit.addEventListener('change', function () {
      const currentVal = parseFloat(inAkiBaseline.value);
      if (isNaN(currentVal) || currentVal === 0) return;
      if (inAkiBaselineUnit.value === 'umolL') {
        inAkiBaseline.value = (currentVal * 88.4).toFixed(1);
      } else {
        inAkiBaseline.value = (currentVal / 88.4).toFixed(2);
      }
      calculateRenal();
    });
  }

  document.querySelectorAll('input, select').forEach(el => {
    if (el.id !== 'ren-cr-unit' && el.id !== 'aki-baseline-unit') {
      el.addEventListener('input', () => calculateRenal());
      el.addEventListener('change', () => calculateRenal());
    }
  });

  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (inAge) inAge.value = '65';
      if (inGender) inGender.selectedIndex = 0;
      if (inHeight) inHeight.value = '165';
      if (inWeight) inWeight.value = '70';
      if (inCr) inCr.value = '1.5';
      if (inCrUnit) inCrUnit.value = 'mgdL';
      if (inAcr) inAcr.selectedIndex = 0;
      if (inAkiBaseline) inAkiBaseline.value = '1.0';
      if (inAkiBaselineUnit) inAkiBaselineUnit.value = 'mgdL';
      if (inAki48h) inAki48h.checked = false;
      if (inAkiRrt) inAkiRrt.checked = false;
      calculateRenal();
    });
  }

  const win = window as any;
  if (win.ClinicalBridge) {
    const params = win.ClinicalBridge.getQueryParams();
    if (params.age && inAge) inAge.value = params.age;
    if (params.gender && inGender) inGender.value = params.gender;
    if (params.height && inHeight) inHeight.value = params.height;
    if (params.weight && inWeight) inWeight.value = params.weight;
    if (params.scr && inCr) inCr.value = params.scr;

    win.ClinicalBridge.renderAutoFillBanner((session: any) => {
      if (session.age && inAge) inAge.value = session.age;
      if (session.gender && inGender) inGender.value = session.gender;
      if (session.height && inHeight) inHeight.value = session.height;
      if (session.weight && inWeight) inWeight.value = session.weight;
      if (session.scrMgDl && inCr && inCrUnit) {
        inCr.value = session.scrMgDl;
        inCrUnit.value = 'mgdL';
      }
      calculateRenal();
    });
  }

  // Floating window demo button
  initAutoInputMasks();
  const heroIntro = document.querySelector('.hero-intro');
  if (heroIntro) {
    const floatBtn = document.createElement('button');
    floatBtn.className = 'calendar-btn';
    floatBtn.style.marginTop = '0.5rem';
    floatBtn.innerHTML = '<i class="fa-solid fa-window-restore"></i> Mở Cửa Sổ Nổi Tra Cứu';
    floatBtn.onclick = () => {
      new FloatingWindow({
        title: 'Hỗ Trợ Chỉnh Liều Thuốc Thận',
        content: `
          <div style="font-size: 0.85rem; line-height: 1.5;">
            <p><strong>Khuyến cáo KDIGO 2026:</strong></p>
            <ul>
              <li>eGFR < 30 mL/min: Giảm 50% liều Metformin.</li>
              <li>eGFR < 15 mL/min: Chống chỉ định hoàn toàn Metformin.</li>
            </ul>
          </div>
        `,
        width: 320,
        height: 220
      });
    };
    heroIntro.appendChild(floatBtn);
  }

  calculateRenal();
}

// Global binding
if (typeof window !== 'undefined') {
  (window as any).calculateRenal = calculateRenal;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRenalStudio);
  } else {
    initRenalStudio();
  }
}
