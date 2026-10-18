import {
  RiskClassificationResult,
  SeverityAssessment,
  SpecificPathogenRisk,
  EmpiricRegimen,
  InfectionSite,
  Population,
  SepsisSource,
  ReassessmentEvaluation,
  ClinicalResponseStatus,
  CultureStatus,
  SusceptibilityStatus,
  IvToPoEvaluation,
  MdrPathogenCategory
} from './types';

import { GENERAL_MDR_RISK_FACTORS } from './data/riskFactors';
import { findEmpiricRegimens } from './data/empiricRegimens';
import { 
  EVIDENCE_BASED_DURATIONS, 
  STOP_ANTIBIOTIC_CHECKLIST, 
  IV_TO_PO_DRUG_PAIRS 
} from './data/stopAndSwitch';
import { MDR_PATHWAYS } from './data/mdrPathways';

/**
 * 1. CLINICAL RISK STRATIFICATION ALGORITHM
 * Source: BV Bệnh Nhiệt Đới - Lưu đồ phân nhóm nguy cơ nhiễm VKĐK (File 2, P.2)
 *
 * Rules:
 * - count = number of general MDR risk factors (out of 8)
 * - isHighSeverity: SOFA >= 2 (Adult) OR pSOFA >= 8 (Peds) OR CLIF-SOFA >= 12 (Cirrhosis)
 * - Group 1 (Low MDR Risk): count == 0 OR (count == 1 AND !isHighSeverity)
 * - Group 2 (High MDR Risk): count >= 2 OR (count == 1 AND isHighSeverity)
 */
export function classifyRisk(
  selectedGeneralRiskIds: string[],
  severity: SeverityAssessment,
  specificRisks: SpecificPathogenRisk[] = []
): RiskClassificationResult {
  const generalRiskCount = selectedGeneralRiskIds.length;
  const isHighSeverity = severity.isHighSeverity;

  let group: 'group_1' | 'group_2';
  const rationalesVi: string[] = [];
  const rationalesEn: string[] = [];

  if (generalRiskCount === 0) {
    group = 'group_1';
    rationalesVi.push('Bệnh nhân KHÔNG có yếu tố nguy cơ chung nhiễm vi khuẩn đa kháng (0/8 yếu tố).');
    rationalesEn.push('No general risk factors for multidrug-resistant pathogens (0/8 factors).');
  } else if (generalRiskCount === 1) {
    if (isHighSeverity) {
      group = 'group_2';
      rationalesVi.push(
        `Bệnh nhân có 1 yếu tố nguy cơ chung nhiễm VKĐK KÈM THEO mức độ bệnh nặng (${severity.scoreType.toUpperCase()} = ${severity.scoreValue} đạt ngưỡng nặng).`
      );
      rationalesEn.push(
        `Patient has 1 general MDR risk factor combined with high illness severity (${severity.scoreType.toUpperCase()} = ${severity.scoreValue}).`
      );
    } else {
      group = 'group_1';
      rationalesVi.push(
        `Bệnh nhân có 1 yếu tố nguy cơ chung nhưng mức độ bệnh nhẹ - trung bình (${severity.scoreType.toUpperCase()} = ${severity.scoreValue} dưới ngưỡng nặng).`
      );
      rationalesEn.push(
        `Patient has 1 general MDR risk factor but low-moderate severity (${severity.scoreType.toUpperCase()} = ${severity.scoreValue}).`
      );
    }
  } else {
    // generalRiskCount >= 2
    group = 'group_2';
    rationalesVi.push(
      `Bệnh nhân có từ 2 yếu tố nguy cơ chung nhiễm VKĐK trở lên (${generalRiskCount}/8 yếu tố) → Tự động xếp Nhóm 2.`
    );
    rationalesEn.push(
      `Patient has ≥ 2 general MDR risk factors (${generalRiskCount}/8) → Classified as Group 2.`
    );
  }

  // Active risk labels
  const activeGeneralFactors = GENERAL_MDR_RISK_FACTORS
    .filter(f => selectedGeneralRiskIds.includes(f.id))
    .map(f => f.labelVi);

  if (group === 'group_2') {
    rationalesVi.push('KHUYẾN CÁO: Bắt buộc sử dụng phác đồ kháng sinh phổ rộng bao phủ vi khuẩn đa kháng.');
    rationalesEn.push('RECOMMENDATION: Broad-spectrum empiric regimen targeting MDR pathogens is required.');

    if (specificRisks.length > 0) {
      const riskTags: string[] = [];
      if (specificRisks.includes('mrsa')) riskTags.push('Tụ cầu vàng kháng Methicillin (MRSA)');
      if (specificRisks.includes('esbl')) riskTags.push('Enterobacterales sinh ESBL');
      if (specificRisks.includes('pseudo_acineto')) riskTags.push('Pseudomonas / Acinetobacter đa kháng');
      if (specificRisks.includes('enterococcus')) riskTags.push('Enterococcus');
      rationalesVi.push(`Xác định nguy cơ riêng cho tác nhân: ${riskTags.join('; ')}.`);
    }
  } else {
    rationalesVi.push('KHUYẾN CÁO: Chỉ định kháng sinh theo phác đồ kinh nghiệm thông thường (Nhóm 1). Tránh lạm dụng Carbapenem/Vancomycin.');
    rationalesEn.push('RECOMMENDATION: Standard Group 1 empiric antibiotic regimen. Avoid unnecessary Carbapenem/Vancomycin.');
  }

  return {
    group,
    groupLabelVi: group === 'group_1' ? 'Nhóm 1: Ít nguy cơ vi khuẩn đa kháng' : 'Nhóm 2: Nguy cơ cao vi khuẩn đa kháng',
    groupLabelEn: group === 'group_1' ? 'Group 1: Low MDR Risk' : 'Group 2: High MDR Risk',
    generalRiskCount,
    isHighSeverity,
    severityScoreType: severity.scoreType,
    severityScoreValue: severity.scoreValue,
    activeGeneralFactors,
    activeSpecificRisks: specificRisks,
    rationalesVi,
    rationalesEn,
    source: { doc: 'BVBND_PhanNhom', page: 2 }
  };
}

export function classifyRiskGroup(
  selectedGeneralRiskIds: string[],
  severity: { scoreType: 'sofa' | 'psofa' | 'clif_sofa'; scoreValue: number },
  population: Population,
  specificRisks: SpecificPathogenRisk[] = []
): RiskClassificationResult {
  const isHighSeverity =
    severity.scoreType === 'psofa'
      ? severity.scoreValue >= 8
      : severity.scoreType === 'clif_sofa'
      ? severity.scoreValue >= 12
      : severity.scoreValue >= 2;

  return classifyRisk(
    selectedGeneralRiskIds,
    {
      scoreType: severity.scoreType,
      scoreValue: severity.scoreValue,
      isHighSeverity
    },
    specificRisks
  );
}

/**
 * 2. EMPIRIC REGIMEN SELECTION
 */
export function getEmpiricRegimens(
  site: InfectionSite,
  population: Population,
  riskGroup: 'group_1' | 'group_2',
  sepsisSource?: SepsisSource,
  specificRisks: SpecificPathogenRisk[] = []
): EmpiricRegimen[] {
  return findEmpiricRegimens(site, population, riskGroup, sepsisSource, specificRisks);
}

/**
 * 3. 48-72h REASSESSMENT DECISION ENGINE
 * Source: BV Bệnh Nhiệt Đới - Lưu đồ sử dụng kháng sinh (File 1, P.2)
 */
export function evaluate48hReassessment(
  clinicalStatus: ClinicalResponseStatus,
  cultureStatus: CultureStatus,
  susceptibilityStatus: SusceptibilityStatus
): ReassessmentEvaluation {
  const recommendationsVi: string[] = [];
  const recommendationsEn: string[] = [];
  let actionType: 'continue' | 'de_escalate' | 'switch_by_ast' | 'consult';
  let actionTitleVi: string;
  let actionTitleEn: string;
  let stopChecklistEligible = false;
  let ivToPoEligible = false;

  if (clinicalStatus === 'improved') {
    if (cultureStatus === 'negative') {
      actionType = 'de_escalate';
      actionTitleVi = 'Lâm sàng cải thiện + Cấy vi sinh Âm tính';
      actionTitleEn = 'Clinical Improvement + Negative Culture';
      recommendationsVi.push('Đánh giá lại chỉ định kháng sinh ban đầu.');
      recommendationsVi.push('Xem xét điều kiện để: (1) Ngừng kháng sinh nếu đủ ngày tối thiểu, (2) Xuống thang kháng sinh phổ hẹp, (3) Chuyển từ IV sang PO.');
      recommendationsEn.push('Re-evaluate initial indication. Consider (1) Stopping if minimum duration met, (2) De-escalation, (3) IV-to-PO switch.');
      stopChecklistEligible = true;
      ivToPoEligible = true;
    } else if (cultureStatus === 'positive') {
      if (susceptibilityStatus === 'sensitive') {
        actionType = 'de_escalate';
        actionTitleVi = 'Lâm sàng cải thiện + Vi khuẩn Nhạy cảm với KS đang dùng';
        actionTitleEn = 'Clinical Improvement + Organism Sensitive';
        recommendationsVi.push('Tiếp tục hoặc xuống thang kháng sinh phổ hẹp nhất phù hợp với kết quả Kháng sinh đồ.');
        recommendationsVi.push('Xem xét điều kiện chuyển từ tiêm sang uống (IV to PO) và ngưng KS khi đủ ngày.');
        recommendationsEn.push('De-escalate to narrower-spectrum agent based on AST. Assess IV-to-PO switch.');
        stopChecklistEligible = true;
        ivToPoEligible = true;
      } else {
        // resistant
        actionType = 'consult';
        actionTitleVi = 'Lâm sàng cải thiện NHƯNG Vi khuẩn Kháng thuốc trên KSĐ';
        actionTitleEn = 'Clinical Improvement BUT Resistant Organism on AST';
        recommendationsVi.push('Hội chẩn Dược lâm sàng / Vi sinh lâm sàng.');
        recommendationsVi.push('Đánh giá xem vi khuẩn phân lập là tác nhân gây bệnh thực sự hay chỉ là vi khuẩn tạp nhiễm/định cư.');
        recommendationsVi.push('Nếu lâm sàng đáp ứng tốt và nguồn nhiễm đã giải quyết, có thể cân nhắc tiếp tục hoặc đổi KS phổ hẹp trúng đích.');
        recommendationsEn.push('Consult ID/Microbiology. Assess if isolate represents true pathogen vs colonizer.');
      }
    } else {
      // culture pending
      actionType = 'continue';
      actionTitleVi = 'Lâm sàng cải thiện + Đang chờ kết quả cấy vi sinh';
      actionTitleEn = 'Clinical Improvement + Culture Pending';
      recommendationsVi.push('Tiếp tục duy trì phác đồ hiện tại cho đến khi có kết quả định danh và kháng sinh đồ.');
      recommendationsVi.push('Theo dõi sát sinh hiệu và công thức máu/CRP.');
      recommendationsEn.push('Maintain current regimen until culture and AST results return.');
    }
  } else {
    // not_improved or worsened
    actionType = 'switch_by_ast';
    actionTitleVi = 'Lâm sàng KHÔNG cải thiện hoặc Diễn tiến xấu đi';
    actionTitleEn = 'Clinical Failure or Deterioration';
    recommendationsVi.push('BẮT BUỘC HỘI CHẨN CHUYÊN KHOA HỒI SỨC / TRUYỀN NHIỄM / DƯỢC LÂM SÀNG.');
    recommendationsVi.push('Tầm soát lại toàn diện ổ nhiễm trùng (chụp CT scan, siêu âm tìm ổ áp xe chưa dẫn lưu, rút bỏ catheter nghi ngờ).');

    if (cultureStatus === 'positive') {
      recommendationsVi.push('Thay đổi kháng sinh ngay lập tức theo kết quả Kháng sinh đồ (KSĐ).');
      recommendationsEn.push('Change antibiotics immediately guided by AST.');
    } else {
      recommendationsVi.push('Cấy lại máu và bệnh phẩm mới trước khi đổi kháng sinh.');
      recommendationsVi.push('Nâng bậc kháng sinh phổ rộng hơn, bao phủ vi khuẩn đa kháng (CRE, DTR-Pseudomonas, Acinetobacter) hoặc phối hợp thuốc chống nấm.');
      recommendationsEn.push('Re-culture and escalate to broader regimen targeting MDR or fungal pathogens.');
    }
  }

  return {
    actionType,
    actionTitleVi,
    actionTitleEn,
    recommendationsVi,
    recommendationsEn,
    stopChecklistEligible,
    ivToPoEligible,
    source: { doc: 'BVBND_LuuDo', page: 2 }
  };
}

/**
 * 4. EVALUATE ANTIBIOTIC STOP CRITERIA
 * Source: BV Bệnh Nhiệt Đới (File 1, P.3)
 */
export function evaluateStopCriteria(
  checkedClinicalIds: string[],
  checkedLabIds: string[],
  currentDaysOnAbx: number,
  site: InfectionSite
) {
  const benchmark = EVIDENCE_BASED_DURATIONS.find(b => {
    if (site === 'respiratory') return b.conditionVi.includes('Viêm phổi');
    if (site === 'peritoneal') return b.conditionVi.includes('ổ bụng');
    if (site === 'urinary') return b.conditionVi.includes('tiết niệu');
    if (site === 'sepsis') return b.conditionVi.includes('huyết');
    return false;
  }) || EVIDENCE_BASED_DURATIONS[0];

  const minDurationMet = currentDaysOnAbx >= benchmark.minDays;
  const clinicalCriteriaMet = checkedClinicalIds.length === STOP_ANTIBIOTIC_CHECKLIST.clinicalCriteria.length; // 5/5
  const labCriteriaMet = checkedLabIds.length >= 1; // at least 1/3

  const canStop = minDurationMet && clinicalCriteriaMet && labCriteriaMet;

  return {
    canStop,
    minDurationMet,
    clinicalCriteriaMet,
    clinicalCriteriaCount: checkedClinicalIds.length,
    labCriteriaMet,
    labCriteriaCount: checkedLabIds.length,
    minDays: benchmark.minDays,
    benchmarkNoteVi: benchmark.noteVi,
    trialName: benchmark.trialName,
    source: { doc: 'BVBND_LuuDo', page: 3 }
  };
}

/**
 * 5. EVALUATE IV-TO-PO SWITCH ELIGIBILITY
 * Source: Quyết định 5631/QĐ-BYT (Phụ lục 5 & 6)
 */
export function evaluateIvToPo(
  isAfebrile24h: boolean,
  isHemodynamicStable: boolean,
  isGutFunctioning: boolean,
  hasContraindication: boolean,
  currentDrugName: string
): IvToPoEvaluation {
  const blockingReasonsVi: string[] = [];

  if (!isAfebrile24h) {
    blockingReasonsVi.push('Chưa hết sốt đủ 24 giờ (thân nhiệt chưa đạt < 38.3°C trong ít nhất 24 giờ không dùng thuốc hạ sốt).');
  }
  if (!isHemodynamicStable) {
    blockingReasonsVi.push('Huyết động chưa ổn định hoặc còn dùng thuốc vận mạch.');
  }
  if (!isGutFunctioning) {
    blockingReasonsVi.push('Đường tiêu hóa không đảm bảo hấp thu (nôn ói, tiêu chảy nặng, tắc ruột, dẫn lưu dạ dày lưu lượng lớn).');
  }
  if (hasContraindication) {
    blockingReasonsVi.push('Bệnh nhân thuộc nhóm nhiễm khuẩn sâu chống chỉ định chuyển sớm (Viêm nội tâm mạc, viêm màng não, viêm xương tủy, áp xe chưa dẫn lưu...).');
  }

  const isEligible = blockingReasonsVi.length === 0;

  // Find matching PO drug pairs
  const matchingPairs = IV_TO_PO_DRUG_PAIRS.filter(pair => 
    pair.ivName.toLowerCase().includes(currentDrugName.toLowerCase()) ||
    currentDrugName.toLowerCase().includes(pair.ivName.split(' ')[0].toLowerCase())
  );

  return {
    isEligible,
    blockingReasonsVi,
    suggestedPoDrugs: (matchingPairs.length > 0 ? matchingPairs : IV_TO_PO_DRUG_PAIRS.slice(0, 3)).map(p => ({
      ivName: p.ivName,
      poName: p.poName,
      poDoseVi: p.poDoseVi,
      groupIndex: p.group,
      bioavailabilityVi: p.bioavailabilityVi
    }))
  };
}

export function getMdrPathway(category: MdrPathogenCategory) {
  return MDR_PATHWAYS[category];
}

export { getAntibiogramForSite, BVBND_ANTIBIOGRAMS } from './data/antibiogram';
export { MDR_PATHWAYS };

