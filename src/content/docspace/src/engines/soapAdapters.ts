/**
 * DocSpace v2 — Pure Offline SOAP & Simulation Blueprint Adapters
 * Biến 41+ ca SOAP trong Knowledge Vault thành:
 *  1. Phiên làm việc Workbench mở dần (soapToWorkbenchSession)
 *  2. Bài luyện thi OSCE 4 trụ cột năng lực (soapToOsceScenario)
 *  3. Chuẩn hóa Parametric Blueprints (blueprintToOsceScenarios)
 */

import { extractFromText } from '../lib/clinicalEngine.ts';
import {
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  SoapClinicalExperience,
  VitalsState,
} from '../types.ts';
import { SimulationCaseBlueprint } from '../types/simulation.ts';
import {
  ClinicalCaseSession,
  getSoapEducationalLevel,
  OrderSandboxItem,
  UnifiedOsceQuestion,
  UnifiedOsceScenario,
} from '../schemas/docspaceV2.ts';

function extractNumberStr(raw?: string): string {
  if (!raw) return '';
  const m = String(raw).replace(',', '.').match(/\d+(\.\d+)?/);
  return m ? m[0] : '';
}

function parseBp(bp?: string): { sbp: string; dbp: string } {
  if (!bp) return { sbp: '', dbp: '' };
  const m = String(bp).match(/(\d{2,3})\s*\/\s*(\d{2,3})/);
  if (!m) return { sbp: '', dbp: '' };
  return { sbp: m[1], dbp: m[2] };
}

function extractLabFromMarkdown(text: string, regex: RegExp): string {
  const m = text.match(regex);
  return m && m[1] ? m[1].replace(',', '.') : '';
}

export function createBlankSession(title = 'Ca lâm sàng mới'): ClinicalCaseSession {
  const now = new Date().toISOString();
  return {
    id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title,
    createdAt: now,
    updatedAt: now,
    progressiveMode: false,
    revealStage: 4,
    form: {
      gioiTinh: 'nam',
      tuoi: '',
      ngheNghiep: '',
      lyDo: '',
      canNang: '',
      chieuCao: '',
      text: { cn: '', tt: '', tc: '', cls: '' },
    },
    vitals: { vNhiet: '', vMach: '', vHATT: '', vHATTr: '', vTho: '', vSpo2: '' },
    labs: { lBC: '', lTC: '', lHct: '', lGlu: '', lTrop: '' },
    epiContext: {
      contactHistory: '',
      travelHistory: '',
      endemicArea: '',
      seasonalContext: '',
      outbreakAlert: '',
      vectorExposure: '',
      occupationalRisk: '',
      waterFoodRisk: '',
    },
    selectedSymptoms: [],
    negatedSymptoms: [],
    userProblems: [],
    hasCheckedProblems: false,
    selectedDiseaseId: null,
    activeBranchId: null,
    debiasingCheckedIds: [],
    orderItems: [],
    learnerNotes: '',
  };
}

/**
 * Chuyển đổi 1 ca SOAP thực chiến thành Phiên Workbench (mặc định bật Progressive Mode để tự học/giảng dạy)
 */
export function soapToWorkbenchSession(
  soap: SoapClinicalExperience,
  kb: KnowledgeBase,
  progressiveMode = true
): ClinicalCaseSession {
  const now = new Date().toISOString();
  const demo = soap.demographicContext || '';
  const isFemale = /\bnữ\b|\bnu\b|\bfemale\b/i.test(demo);
  const ageMatch = demo.match(/(\d{1,3})\s*(?:tuổi|tuoi|t\b)/i);
  const weightMatch = `${demo} ${soap.o.physicalExam}`.match(/(\d{2,3}(?:[.,]\d)?)\s*kg/i);
  const heightMatch = `${demo} ${soap.o.physicalExam}`.match(/(1\d{2})\s*cm/i);

  const bp = parseBp(soap.o.vitals?.bp);
  const vitals: VitalsState = {
    vNhiet: extractNumberStr(soap.o.vitals?.temp),
    vMach: extractNumberStr(soap.o.vitals?.pulse),
    vHATT: bp.sbp,
    vHATTr: bp.dbp,
    vTho: extractNumberStr(soap.o.vitals?.resp),
    vSpo2: extractNumberStr(soap.o.vitals?.spo2),
    vBMI: extractNumberStr(soap.o.vitals?.bmi),
  };

  const labBlob = `${soap.o.labsAndImaging || ''} ${soap.o.imagingFindings || ''}`;
  const labs: LabsState = {
    lBC: extractLabFromMarkdown(labBlob, /(?:WBC|Bạch cầu)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lTC: extractLabFromMarkdown(labBlob, /(?:PLT|Tiểu cầu)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lHct: extractLabFromMarkdown(labBlob, /(?:Hct|Hematocrit)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lGlu: extractLabFromMarkdown(labBlob, /(?:Glucose|Đường huyết)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lTrop: extractLabFromMarkdown(labBlob, /(?:Troponin)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lCre: extractLabFromMarkdown(labBlob, /(?:Creatinine|Cre)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lAST: extractLabFromMarkdown(labBlob, /(?:AST|SGOT)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lALT: extractLabFromMarkdown(labBlob, /(?:ALT|SGPT)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lCRP: extractLabFromMarkdown(labBlob, /(?:CRP)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lLactate: extractLabFromMarkdown(labBlob, /(?:Lactate)[^0-9]{0,12}(\d+(?:[.,]\d+)?)/i),
    lNa: extractLabFromMarkdown(labBlob, /(?:\bNa\+?|\bNatri)[^0-9]{0,10}(\d+(?:[.,]\d+)?)/i),
    lK: extractLabFromMarkdown(labBlob, /(?:\bK\+?|\bKali)[^0-9]{0,10}(\d+(?:[.,]\d+)?)/i),
  };

  const form: ClinicalFormState = {
    gioiTinh: isFemale ? 'nu' : 'nam',
    tuoi: ageMatch ? ageMatch[1] : '',
    ngheNghiep: '',
    lyDo: soap.s.chiefComplaint || soap.title,
    canNang: weightMatch ? weightMatch[1].replace(',', '.') : '',
    chieuCao: heightMatch ? heightMatch[1] : '',
    text: {
      cn: soap.s.historyOfPresentIllness || '',
      tt: soap.o.physicalExam || '',
      tc: soap.s.pastMedicalHistory || '',
      cls: soap.o.labsAndImaging || '',
    },
  };

  const epiContext: EpidemiologyContext = {
    contactHistory: soap.s.epidemiology || '',
    travelHistory: '',
    endemicArea: '',
    seasonalContext: '',
    outbreakAlert: '',
    vectorExposure: '',
    occupationalRisk: '',
    waterFoodRisk: '',
  };

  const fullClinicalText = [
    soap.s.chiefComplaint,
    soap.s.historyOfPresentIllness,
    soap.s.symptomsList?.join(', '),
    soap.o.physicalExam,
    soap.s.pastMedicalHistory,
    soap.s.epidemiology,
    soap.o.labsAndImaging,
  ]
    .filter(Boolean)
    .join('. ');

  const extracted = extractFromText(fullClinicalText, kb);

  // Nạp sẵn gợi ý khung y lệnh trống (khi mở stage 4 có thể so với soap.p.medications)
  const orderItems: OrderSandboxItem[] = [];

  return {
    id: `soap_session_${soap.id}_${Date.now()}`,
    title: soap.title,
    createdAt: now,
    updatedAt: now,
    sourceSoapId: soap.id,
    sourceSoapSpecialty: soap.specialty,
    progressiveMode,
    revealStage: progressiveMode ? 1 : 4,
    form,
    vitals,
    labs,
    epiContext,
    selectedSymptoms: extracted.pos,
    negatedSymptoms: extracted.neg,
    userProblems: [],
    hasCheckedProblems: false,
    selectedDiseaseId: null,
    activeBranchId: null,
    debiasingCheckedIds: [],
    orderItems,
    learnerNotes: '',
  };
}

function cleanSnippet(text: string | undefined, maxLen = 140): string {
  if (!text) return '';
  const cleaned = text.replace(/[#*`>_]/g, '').replace(/\s+/g, ' ').trim();
  return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen - 1)}…` : cleaned;
}

/**
 * Chuyển đổi TỰ ĐỘNG bất kỳ ca SOAP nào trong 41 ca thành bài thi OSCE 4 trụ cột (100% Offline)
 */
export function soapToOsceScenario(soap: SoapClinicalExperience): UnifiedOsceScenario {
  const v = soap.o.vitals || {};
  const vitalsSummary = [
    v.temp && `T°: ${v.temp}`,
    v.pulse && `M: ${v.pulse}`,
    v.bp && `HA: ${v.bp}`,
    v.resp && `NT: ${v.resp}`,
    v.spo2 && `SpO₂: ${v.spo2}`,
  ]
    .filter(Boolean)
    .join(' · ') || 'Chưa ghi nhận đầy đủ sinh hiệu';

  const primaryDiag = soap.a.primaryDiagnosis || soap.title;
  const diffs = (soap.a.differentials || []).filter(
    (d) => d && d.toLowerCase() !== primaryDiag.toLowerCase()
  );

  const primaryProblem =
    soap.a.problemList?.find((p) => p.priority === 'life-threatening') ||
    soap.a.problemList?.[0];

  const firstMed = soap.p.medications?.[0];
  const immediateText =
    cleanSnippet(soap.p.immediateActions, 130) ||
    (firstMed
      ? `Khởi trị ${firstMed.drug} (${firstMed.dose} - ${firstMed.route}) và theo dõi sát sinh hiệu`
      : 'Xử trí theo phác đồ chuẩn và theo dõi sát các dấu hiệu cảnh báo');

  const questions: UnifiedOsceQuestion[] = [
    // Trụ cột 1: Hỏi bệnh & Đặt vấn đề ưu tiên (25đ)
    {
      id: `${soap.id}_q1`,
      stage: 1,
      pillar: 'history_exam',
      pillarTitle: 'Trụ cột 1: Tiếp cận & Đặt vấn đề ưu tiên',
      prompt: 'Dựa trên bối cảnh ban đầu và sinh hiệu, vấn đề ưu tiên hàng đầu cần xác lập & hỏi/khám kỹ nhất là gì?',
      options: [
        {
          id: 'opt_1a',
          text: primaryProblem
            ? `${primaryProblem.problemName} — ${cleanSnippet(soap.s.historyPearls, 95) || 'Khai thác kỹ bệnh sử, dịch tễ & dấu hiệu cảnh báo'}`
            : `Tập trung khai thác dấu hiệu báo động và tiền căn trọng tâm: ${cleanSnippet(soap.s.historyPearls || soap.s.chiefComplaint, 110)}`,
          isCorrect: true,
          score: 25,
          rationale: `Chính xác. ${cleanSnippet(soap.s.historyPearls, 200) || 'Luôn ưu tiên phát hiện vấn đề đe dọa sinh mạng và khai thác câu hỏi vàng định hướng nguyên nhân.'}`,
        },
        {
          id: 'opt_1b',
          text: 'Cho thuốc điều trị triệu chứng ngay và hẹn tái khám ngoại trú sau 1 tuần không cần khai thác thêm tiền căn',
          isCorrect: false,
          score: 0,
          rationale: 'Sai nguyên tắc an toàn người bệnh: bỏ qua đánh giá mức độ nặng và yếu tố nền dễ dẫn đến biến chứng nặng.',
          penaltyNote: 'Bỏ sót đánh giá nguy cơ ban đầu',
        },
        {
          id: 'opt_1c',
          text: 'Chỉ định chụp CT toàn thân ngay lập tức trước khi hỏi bệnh sử và khám thực thể',
          isCorrect: false,
          score: 5,
          rationale: 'Lạm dụng cận lâm sàng tốn kém và làm chậm trễ đánh giá lâm sàng cốt lõi.',
        },
      ],
    },
    // Trụ cột 2: Cận lâm sàng mục tiêu (25đ)
    {
      id: `${soap.id}_q2`,
      stage: 2,
      pillar: 'labs_workup',
      pillarTitle: 'Trụ cột 2: Chỉ định & Diễn giải Cận lâm sàng',
      prompt: 'Cụm cận lâm sàng và điểm lưu ý quan trọng nhất cần đánh giá để xác định nguyên nhân & biến chứng ở ca này là gì?',
      options: [
        {
          id: 'opt_2a',
          text:
            cleanSnippet(primaryProblem?.diagnosticOrientation, 125) ||
            cleanSnippet(soap.o.labsAndImaging, 125) ||
            'Xét nghiệm định hướng căn nguyên, đánh giá chức năng tạng và bẫy cận lâm sàng',
          isCorrect: true,
          score: 25,
          rationale: `Đúng trọng tâm. Lưu ý bẫy CLS: ${cleanSnippet(soap.o.objectivePitfalls, 200) || 'Cần đối chiếu CLS với diễn tiến lâm sàng.'}`,
        },
        {
          id: 'opt_2b',
          text: 'Không cần làm thêm cận lâm sàng vì triệu chứng cơ năng đã đủ để kết luận chắc chắn',
          isCorrect: false,
          score: 0,
          rationale: 'Chẩn đoán dựa thuần vào cảm tính dễ bỏ sót tổn thương tạng ẩn và sai lệch phân tầng nguy cơ.',
        },
        {
          id: 'opt_2c',
          text: 'Chỉ cần làm công thức máu thường quy, bỏ qua đánh giá chức năng gan-thận và chẩn đoán hình ảnh',
          isCorrect: false,
          score: 10,
          rationale: 'Chưa đầy đủ để đánh giá mức độ nặng, bệnh đồng mắc và căn nguyên đặc hiệu.',
        },
      ],
    },
    // Trụ cột 3: Chẩn đoán xác định & Phân biệt (25đ)
    {
      id: `${soap.id}_q3`,
      stage: 3,
      pillar: 'diagnosis_staging',
      pillarTitle: 'Trụ cột 3: Biện luận Chẩn đoán & Phân tầng',
      prompt: 'Chẩn đoán phù hợp nhất (kèm phân tầng/tiêu chuẩn) sau khi tổng hợp S và O là gì?',
      options: [
        {
          id: 'opt_3a',
          text: `${primaryDiag}${soap.a.icd10 ? ` (${soap.a.icd10})` : ''}`,
          isCorrect: true,
          score: 25,
          rationale: `Chính xác! ${cleanSnippet(soap.a.clinicalReasoning || soap.a.diagnosticPearls, 220)}`,
        },
        {
          id: 'opt_3b',
          text: diffs[0] || 'Nhiễm siêu vi hô hấp trên thông thường tự giới hạn',
          isCorrect: false,
          score: 5,
          rationale: `Đây là chẩn đoán phân biệt cần loại trừ, chưa giải thích trọn vẹn bức tranh lâm sàng & CLS của ca bệnh (${primaryDiag}).`,
        },
        {
          id: 'opt_3c',
          text: diffs[1] || 'Rối loạn chức năng cơ năng không có tổn thương thực thể',
          isCorrect: false,
          score: 0,
          rationale: `Không phù hợp với dữ kiện thực thể/CLS; nguy cơ đóng chẩn đoán sớm (Premature Closure).`,
        },
      ],
    },
    // Trụ cột 4: Xử trí & An toàn điều trị (25đ)
    {
      id: `${soap.id}_q4`,
      stage: 3,
      pillar: 'management_safety',
      pillarTitle: 'Trụ cột 4: Xử trí ban đầu & An toàn Kê đơn',
      prompt: 'Hướng xử trí ban đầu và nguyên tắc theo dõi an toàn ưu tiên nhất cho bệnh nhân này là gì?',
      options: [
        {
          id: 'opt_4a',
          text: immediateText,
          isCorrect: true,
          score: 25,
          rationale: `Chính xác! ${cleanSnippet(soap.p.takeawayLessons || soap.p.monitoringAndTargets, 220)}`,
        },
        {
          id: 'opt_4b',
          text: 'Dùng ngay NSAID giảm đau hạ sốt liều cao kết hợp Corticoid tĩnh mạch thường quy cho mọi trường hợp',
          isCorrect: false,
          score: 0,
          rationale: 'Nguy hiểm! Lạm dụng NSAID/Corticoid khi chưa có chỉ định gây xuất huyết tiêu hóa, suy thận cấp hoặc làm nặng nhiễm trùng.',
          penaltyNote: 'Vi phạm an toàn kê đơn nghiêm trọng',
        },
        {
          id: 'opt_4c',
          text: 'Chỉ theo dõi sinh hiệu mỗi 24 giờ, không cần đặt mục tiêu điều trị hay tiêu chuẩn hội chẩn/chuyển tuyến',
          isCorrect: false,
          score: 5,
          rationale: 'Tần suất theo dõi quá thưa có thể bỏ lỡ giai đoạn chuyển nặng của bệnh.',
        },
      ],
    },
  ];

  // Xáo trộn thứ tự option có kiểm soát (deterministic theo độ dài ID để không luôn là A)
  const rotatedQuestions = questions.map((q, idx) => {
    const shift = (soap.id.length + idx) % q.options.length;
    const opts = [...q.options.slice(shift), ...q.options.slice(0, shift)];
    return { ...q, options: opts };
  });

  const pearls: Array<{ title: string; detail: string }> = [];
  if (soap.s.historyPearls) pearls.push({ title: 'Kinh nghiệm hỏi bệnh (S)', detail: soap.s.historyPearls });
  if (soap.a.diagnosticPearls) pearls.push({ title: 'Hạt ngọc chẩn đoán (A)', detail: soap.a.diagnosticPearls });
  if (soap.p.takeawayLessons) pearls.push({ title: 'Bài học điều trị cốt lõi (P)', detail: soap.p.takeawayLessons });

  const pitfalls: Array<{ biasName: string; warning: string; remedy: string }> = [];
  if (soap.o.objectivePitfalls) {
    pitfalls.push({
      biasName: 'Bẫy Lâm sàng & Cận lâm sàng',
      warning: soap.o.objectivePitfalls,
      remedy: 'Luôn kiểm tra chéo triệu chứng thực thể với động học xét nghiệm trước khi chốt chẩn đoán.',
    });
  }
  if (diffs.length > 0) {
    pitfalls.push({
      biasName: 'Thiên kiến Đóng chẩn đoán sớm (Premature Closure)',
      warning: `Dễ nhầm lẫn với: ${diffs.slice(0, 3).join(', ')}.`,
      remedy: 'Sử dụng bảng đối chiếu CĐSB/CĐPB và kiểm tra tiêu chuẩn loại trừ rõ ràng.',
    });
  }

  return {
    id: `osce_soap_${soap.id}`,
    sourceType: 'soap-adapted',
    sourceSoapId: soap.id,
    specialty: soap.specialty || 'Nội tổng quát',
    difficulty: getSoapEducationalLevel(soap),
    title: soap.title,
    subtitle: soap.demographicContext || 'Ca lâm sàng thực chiến từ Sổ tay SOAP',
    badgeText: `SOAP → OSCE · ${soap.specialty}`,
    icdCode: soap.a.icd10,
    demographicsText: soap.demographicContext || 'Chưa ghi nhận cơ địa',
    chiefComplaint: soap.s.chiefComplaint || soap.title,
    historyText: `${soap.s.historyOfPresentIllness || ''}${soap.s.pastMedicalHistory ? `\n\nTiền căn: ${soap.s.pastMedicalHistory}` : ''}${soap.s.epidemiology ? `\n\nDịch tễ: ${soap.s.epidemiology}` : ''}`,
    vitalsSummary,
    physicalExamText: soap.o.physicalExam || 'Chưa ghi nhận chi tiết khám thực thể',
    labsAndImagingText: `${soap.o.labsAndImaging || ''}${soap.o.imagingFindings ? `\n\nCĐHA: ${soap.o.imagingFindings}` : ''}`,
    questions: rotatedQuestions,
    primaryDiagnosisAnswer: `${primaryDiag}${soap.a.icd10 ? ` (${soap.a.icd10})` : ''}`,
    clinicalPearls: pearls,
    cognitivePitfalls: pitfalls,
    ebmReferences: soap.sourceReference ? [soap.sourceReference] : ['Sổ tay Kinh nghiệm Thực chiến CliniPortal DocSpace'],
  };
}

/**
 * Chuẩn hóa Parametric Blueprint (VD: Dengue đa biến thể) sang UnifiedOsceScenario
 */
export function blueprintToOsceScenarios(blueprint: SimulationCaseBlueprint): UnifiedOsceScenario[] {
  return blueprint.branches.map((branch) => {
    const v = branch.vitalsVariant.vitals;
    const vitalsSummary = [
      v.vNhiet && `T°: ${v.vNhiet}°C`,
      v.vMach && `M: ${v.vMach} l/p`,
      v.vHATT && v.vHATTr && `HA: ${v.vHATT}/${v.vHATTr} mmHg`,
      v.vTho && `NT: ${v.vTho} l/p`,
      v.vSpo2 && `SpO₂: ${v.vSpo2}%`,
    ]
      .filter(Boolean)
      .join(' · ');

    const labsEntries = Object.entries(branch.labVariant.additionalLabs || {})
      .map(([k, val]) => `• ${k}: ${val}`)
      .join('\n');

    const questions: UnifiedOsceQuestion[] = branch.questions.map((q) => ({
      id: q.id,
      stage:
        q.pillar === 'history_exam' ? 1 : q.pillar === 'labs_workup' ? 2 : 3,
      pillar: q.pillar,
      pillarTitle: q.pillarTitle,
      prompt: q.prompt,
      options: q.options.map((o) => ({
        id: o.id,
        text: o.text,
        isCorrect: o.isCorrect,
        score: o.score,
        rationale: o.rationale,
        penaltyNote: o.penaltyNote,
      })),
    }));

    return {
      id: `osce_bp_${branch.branchId}`,
      sourceType: 'parametric-blueprint',
      specialty: 'Truyền nhiễm',
      difficulty: branch.vitalsVariant.hemodynamicState === 'decompensated_shock' ? 'NoiTru' : 'Y6',
      title: `${blueprint.diseaseName} — ${branch.branchTitle}`,
      subtitle: branch.branchDescription,
      badgeText: `Parametric OSCE · ${branch.branchBadge}`,
      icdCode: blueprint.icdCode,
      demographicsText: `${branch.demographics.label} · Ngày bệnh ${branch.timelineDay} · Bệnh nền: ${branch.comorbidity.label}`,
      chiefComplaint: branch.chiefComplaint,
      historyText: branch.historyOfPresentIllness,
      vitalsSummary,
      physicalExamText: branch.physicalExamSummary,
      labsAndImagingText: `Hct: ${branch.labVariant.labs.lHct || '--'}% | Tiểu cầu: ${branch.labVariant.labs.lTC || '--'} G/L | Bạch cầu: ${branch.labVariant.labs.lBC || '--'} G/L\n${labsEntries}`,
      questions,
      primaryDiagnosisAnswer: `${blueprint.diseaseName} — ${branch.branchTitle} (${blueprint.icdCode})`,
      clinicalPearls: branch.clinicalPearls.map((p) => ({
        title: p.title,
        detail: `${p.action} — Cơ chế: ${p.mechanism}`,
      })),
      cognitivePitfalls: branch.cognitivePitfalls.map((c) => ({
        biasName: c.biasName,
        warning: c.warningText,
        remedy: c.remedyAction,
      })),
      ebmReferences: branch.ebmReferences,
    };
  });
}
