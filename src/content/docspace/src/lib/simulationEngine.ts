import {
  OsceScoreResult,
  SimulationBranch,
  SimulationUserAnswers,
} from '../types/simulation.ts';
import { ClinicalFormState, LabsState, VitalsState } from '../types.ts';

/**
 * 🛡️ Clinical Sanity Constraint Gate
 * Kiểm định 5 quy tắc chặn sinh lý bệnh học chống tình huống phi lý y khoa
 */
export function validateClinicalSanity(branch: SimulationBranch): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // [BỘ CHẶN 1 - GIỚI TÍNH & THAI KỲ]
  if (branch.demographics.gender === 'nam') {
    const text = `${branch.comorbidity.label} ${branch.historyOfPresentIllness}`.toLowerCase();
    if (text.includes('có thai') || text.includes('tiền sản giật') || text.includes('thai ngoài tử cung')) {
      errors.push('Vi phạm Sanity Gate 1: Bệnh nhân nam không thể có thai kỳ hoặc bệnh lý phụ khoa.');
    }
  }

  // [BỘ CHẶN 2 - HUYẾT ĐỘNG SỐC]
  const hatt = parseFloat(branch.vitalsVariant.vitals.vHATT || '120');
  const hattr = parseFloat(branch.vitalsVariant.vHATTr || '80');
  if (branch.vitalsVariant.hemodynamicState === 'compensated_shock') {
    if (hatt > 0 && hattr > 0 && hatt - hattr > 20 && hatt > 90) {
      errors.push('Vi phạm Sanity Gate 2: Sốc còn bù bắt buộc hiệu áp HATT - HATTr <= 20 mmHg hoặc HATT <= 90 mmHg.');
    }
  }
  if (branch.vitalsVariant.hemodynamicState === 'decompensated_shock') {
    if (hatt > 90) {
      errors.push('Vi phạm Sanity Gate 2: Sốc mất bù bắt buộc HATT <= 90 mmHg hoặc không đo được.');
    }
  }

  // [BỘ CHẶN 3 - THỜI ĐIỂM & ĐỘNG HỌC XÉT NGHIỆM]
  if (branch.timelineDay <= 2) {
    const additional = JSON.stringify(branch.labVariant.additionalLabs || {}).toLowerCase();
    if (additional.includes('igm (+)') || additional.includes('kháng thể igm dương')) {
      errors.push('Vi phạm Sanity Gate 3: Kháng thể IgM không thể dương tính sớm ở ngày 1-2 của Dengue.');
    }
  }

  // [BỘ CHẶN 4 - NGHỊCH LÝ HEMATOCRIT XUẤT HUYẾT]
  const hct = parseFloat(branch.labVariant.labs.lHct || '40');
  if (branch.labVariant.bleedingFlag && hct > 45) {
    errors.push('Vi phạm Sanity Gate 4: Bệnh nhân sốc xuất huyết nội nặng không thể có Hct tăng cao cô đặc máu.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * 📊 Dynamic OSCE 100-Point Scoring Engine
 */
export function calculateOsceScore(
  branch: SimulationBranch,
  answers: SimulationUserAnswers
): OsceScoreResult {
  let totalScore = 0;
  const pillarScores: Record<string, { earned: number; max: number; passed: boolean }> = {
    history_exam: { earned: 0, max: 25, passed: false },
    labs_workup: { earned: 0, max: 25, passed: false },
    diagnosis_staging: { earned: 0, max: 25, passed: false },
    management_safety: { earned: 0, max: 25, passed: false },
  };

  const feedbackList: OsceScoreResult['feedbackList'] = [];

  branch.questions.forEach((q) => {
    const chosenOptionId = answers.selectedOptionIds[q.id];
    const chosenOption = q.options.find((opt) => opt.id === chosenOptionId);

    const earned = chosenOption ? chosenOption.score : 0;
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    totalScore += earned;

    if (pillarScores[q.pillar]) {
      pillarScores[q.pillar].earned += earned;
      if (pillarScores[q.pillar].earned >= 15) {
        pillarScores[q.pillar].passed = true;
      }
    }

    feedbackList.push({
      questionId: q.id,
      pillarTitle: q.pillarTitle,
      isCorrect,
      earnedScore: earned,
      userOptionText: chosenOption ? chosenOption.text : 'Chưa trả lời',
      rationale: chosenOption
        ? chosenOption.rationale
        : 'Người học bỏ qua câu hỏi này. Đáp án đúng: ' +
          (q.options.find((o) => o.isCorrect)?.text || ''),
    });
  });

  return {
    totalScore,
    passed: totalScore >= 70,
    pillarScores,
    feedbackList,
  };
}

/**
 * 📥 Chuyển đổi kịch bản giả lập sang dữ liệu nạp trực tiếp vào Chu Trình Lâm Sàng (Step 1)
 */
export function convertBranchToClinicalInputs(branch: SimulationBranch): {
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  selectedSymptoms: string[];
} {
  const form: ClinicalFormState = {
    gioiTinh: branch.demographics.gender,
    tuoi: String(branch.demographics.age),
    ngheNghiep: branch.demographics.occupation || '',
    lyDo: branch.chiefComplaint,
    text: {
      cn: branch.historyOfPresentIllness,
      tt: branch.physicalExamSummary,
      tc: `Bệnh nền: ${branch.comorbidity.label}. Mốc ngày: Ngày thứ ${branch.timelineDay}.`,
      cls: Object.entries(branch.labVariant.additionalLabs || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join('; '),
    },
  };

  const vitals: VitalsState = { ...branch.vitalsVariant.vitals };
  const labs: LabsState = { ...branch.labVariant.labs };

  // Mapping symptoms based on branch profile
  const selectedSymptoms: string[] = [
    'sot_cao_lien_tuc',
    'dau_dau_hoc_mat',
    'dau_co_khop',
    'met_la_li_bi',
    'tay_chan_lanh_am',
    'ha_kham_tiet_nieu',
  ];

  if (branch.vitalsVariant.hemodynamicState === 'compensated_shock' || branch.vitalsVariant.hemodynamicState === 'decompensated_shock') {
    selectedSymptoms.push('mach_nhanh_nho_kho_bat');
    selectedSymptoms.push('huyet_ap_kep');
  }

  if (branch.labVariant.bleedingFlag) {
    selectedSymptoms.push('xuat_huyet_tieu_hoa');
    selectedSymptoms.push('da_niem_nhot');
    selectedSymptoms.push('dau_bung_vung_gan');
  } else {
    selectedSymptoms.push('dau_bung_vung_gan');
    selectedSymptoms.push('gan_to_dau');
  }

  return {
    form,
    vitals,
    labs,
    selectedSymptoms,
  };
}
