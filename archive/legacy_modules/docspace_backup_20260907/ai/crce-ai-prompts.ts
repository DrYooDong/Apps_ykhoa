/**
 * CRCE AI Prompts & System Instructions - DocSpace
 * Chứa cấu trúc Prompt chuẩn EBM và JSON Schema cho 5 Bước của Chuỗi Phản Ứng
 */

import { SoapPatientRecord } from '../types';
import { DiseaseReactionChainDefinition } from '../data/diagnostic-criteria-database';

export const CRCE_SYSTEM_INSTRUCTION = `Bạn là Trợ lý AI Cố vấn Lâm sàng Chuyên sâu (Senior Clinical Decision Support & EBM Expert) của hệ thống CliniPortal DocSpace.
Nhiệm vụ của bạn là hỗ trợ Bác sĩ đưa ra quyết định chuẩn xác, an toàn, dựa trên y học chứng cứ (Evidence-Based Medicine) và hướng dẫn điều trị của Bộ Y tế Việt Nam / Quốc tế (AHA/ACC, KDIGO, GINA, GOLD, EASL, Surviving Sepsis).
Các nguyên tắc bắt buộc:
1. Luôn bảo vệ an toàn bệnh nhân, cảnh báo ngay các dấu hiệu nguy kịch (Red Flags / Must-Not-Miss).
2. Khi trả về JSON, PHẢI tuân thủ 100% định dạng JSON hợp lệ, không bọc trong ký tự markdown khác.
3. Sử dụng thuật ngữ Y khoa chuẩn Tiếng Việt, súc tích, mạch lạc.`;

// ─── BƯỚC 1: Phân tích Triệu chứng & DDXD ──────────────────────────────────

export interface AISymptomAnalysisResult {
  detectedSymptoms: {
    symptomName: string;
    sourceText: string;
    category: string;
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  redFlags: string[];
  candidateDiagnoses: {
    diseaseName: string;
    icdCode: string;
    probability: 'high' | 'moderate' | 'low';
    isMustNotMiss: boolean;
    rationale: string;
    keyNextStep: string;
  }[];
  clinicalPearl: string;
}

export function buildStep1SymptomPrompt(patient: SoapPatientRecord): string {
  return `Phân tích ngữ nghĩa lâm sàng chuyên sâu từ hồ sơ bệnh nhân sau:

[THÔNG TIN BỆNH NHÂN]:
- Tuổi: ${patient.age || 'Chưa rõ'}, Giới tính: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- Triệu chứng cơ năng (S): ${patient.sNotes || 'Chưa ghi'}
- Khám thực thể & CLS (O): ${patient.oNotes || 'Chưa ghi'}
- Đánh giá hiện tại (A): ${patient.aAssessment || 'Chưa ghi'}

YÊU CẦU:
Trả về duy nhất 1 JSON object theo cấu trúc:
{
  "detectedSymptoms": [
    { "symptomName": "Tên hội chứng/triệu chứng chuẩn", "sourceText": "Đoạn text trích từ S/O", "category": "Tim mạch/Hô hấp/...", "severity": "mild/moderate/severe" }
  ],
  "redFlags": [
    "Dấu hiệu cảnh báo nguy kịch cần xử trí khẩn cấp (nếu có)"
  ],
  "candidateDiagnoses": [
    {
      "diseaseName": "Tên bệnh lý chẩn đoán phân biệt",
      "icdCode": "Mã ICD-10 ước tính (VD: I20, J18.9, K85)",
      "probability": "high/moderate/low",
      "isMustNotMiss": true/false,
      "rationale": "Lý do ngắn gọn vì sao nghĩ đến bệnh này",
      "keyNextStep": "Xét nghiệm hoặc thăm dò quyết định cần làm ngay"
    }
  ],
  "clinicalPearl": "1 câu lưu ý lâm sàng đắt giá cho ca này"
}`;
}

// ─── BƯỚC 2: Đối chiếu Tiêu chuẩn Chẩn đoán & Auto-tick ───────────────────

export interface AIDiagnosticReasoningResult {
  overallConfidence: 'definite' | 'probable' | 'possible' | 'unlikely';
  confidenceScore: number; // 0 - 100
  criteriaEvaluations: {
    criterionId: string;
    label: string;
    isMet: boolean;
    evidenceText: string;
    explanation: string;
  }[];
  suggestedAction: string;
  missingWorkup: string[];
}

export function buildStep2CriteriaPrompt(
  patient: SoapPatientRecord, 
  def: DiseaseReactionChainDefinition
): string {
  const criteriaList = def.criteria.map(c => `- ID: "${c.id}" | Loại: ${c.type} | Nội dung: "${c.label}"`).join('\n');

  return `Đối chiếu hồ sơ bệnh nhân với Bảng Tiêu chuẩn Chẩn đoán của bệnh: "${def.diseaseName}" (${def.icdCode}).
Tiêu chuẩn vàng tham chiếu: ${def.goldStandard}

[HỒ SƠ BỆNH NHÂN]:
- Tuổi: ${patient.age || 'N/A'}, Giới: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- S: ${patient.sNotes || '—'}
- O & Cận lâm sàng: ${patient.oNotes || '—'}
- A: ${patient.aAssessment || '—'}

[DANH SÁCH TIÊU CHUẨN CẦN ĐỐI CHIẾU]:
${criteriaList}

YÊU CẦU:
Trả về duy nhất 1 JSON object:
{
  "overallConfidence": "definite/probable/possible/unlikely",
  "confidenceScore": 85, // ước tính độ tin cậy từ 0-100%
  "criteriaEvaluations": [
    {
      "criterionId": "id_tương_ứng_trong_danh_sách",
      "label": "Tên tiêu chuẩn",
      "isMet": true/false, // Thỏa mãn hay chưa dựa trên S/O/CLS
      "evidenceText": "Bằng chứng trích từ S/O hoặc 'Chưa có thông tin'",
      "explanation": "Giải thích ngắn gọn lý do thỏa hoặc chưa"
    }
  ],
  "suggestedAction": "Kết luận chẩn đoán xác định hay cần làm thêm gì",
  "missingWorkup": [
    "Xét nghiệm hoặc chẩn đoán hình ảnh còn thiếu để chốt 100%"
  ]
}`;
}

// ─── BƯỚC 3: Cá Thể Hóa Phác Đồ Điều Trị ──────────────────────────────────

export interface AIProtocolAdviceResult {
  customizedGoals: string[];
  initialManagementSteps: string[];
  supportiveCareNotes: string[];
  individualizationHighlights: {
    factor: string; // VD: "Bệnh nhân cao tuổi (75t)", "eGFR giảm", "Có tiền sử THA"
    recommendation: string; // Khuyến cáo điều chỉnh cụ thể
  }[];
  criticalPearls: string;
}

export function buildStep3ProtocolPrompt(
  patient: SoapPatientRecord, 
  def: DiseaseReactionChainDefinition
): string {
  return `Cá thể hóa phác đồ điều trị bệnh "${def.diseaseName}" (${def.icdCode}) cho bệnh nhân cụ thể:

[THÔNG TIN BỆNH NHÂN]:
- Tuổi: ${patient.age || 'N/A'}, Giới: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- Diễn biến (S): ${patient.sNotes || '—'}
- Khám & CLS (O): ${patient.oNotes || '—'}
- Đánh giá (A): ${patient.aAssessment || '—'}

[PHÁC ĐỒ CHUẨN THAM CHIẾU]:
- Mục tiêu: ${def.protocol.targetGoals.join('; ')}
- Xử trí ban đầu: ${def.protocol.initialManagement.join('; ')}

YÊU CẦU:
Trả về duy nhất 1 JSON object:
{
  "customizedGoals": [
    "Mục tiêu điều trị cá thể hóa"
  ],
  "initialManagementSteps": [
    "Bước 1: ...",
    "Bước 2: ..."
  ],
  "supportiveCareNotes": [
    "Chế độ dinh dưỡng, bù dịch, thở oxy, theo dõi sinh hiệu..."
  ],
  "individualizationHighlights": [
    { "factor": "Yếu tố cá thể (Tuổi/Thận/Bệnh kèm)", "recommendation": "Khuyến cáo cụ thể" }
  ],
  "criticalPearls": "Lưu ý quan trọng nhất khi áp dụng phác đồ này"
}`;
}

// ─── BƯỚC 4: Kiểm Tra An Toàn Thuốc & Tương Tác ───────────────────────────

export interface AIDrugSafetyResult {
  safetyRating: 'safe' | 'caution' | 'warning' | 'critical';
  interactions: {
    drugPair: string;
    severity: '🔴 Major' | '🟡 Moderate' | '🟢 Minor';
    mechanism: string;
    clinicalAction: string;
  }[];
  contraindications: string[];
  renalDoseAdjustments: string[];
  monitoringAdvice: string[];
}

export function buildStep4DrugSafetyPrompt(
  patient: SoapPatientRecord,
  selectedDrugs: string[],
  def: DiseaseReactionChainDefinition
): string {
  return `Kiểm tra an toàn dược lâm sàng, tương tác thuốc và chỉnh liều cho bệnh nhân "${def.diseaseName}":

[THÔNG TIN BỆNH NHÂN]:
- Tuổi: ${patient.age || 'N/A'}, Giới: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- Khám & CLS: ${patient.oNotes || '—'}
- Chẩn đoán: ${patient.aAssessment || def.diseaseName}

[DANH MỤC THUỐC DỰ KIẾN SỬ DỤNG]:
${selectedDrugs.map((d, i) => `${i + 1}. ${d}`).join('\n')}

YÊU CẦU:
Trả về duy nhất 1 JSON object:
{
  "safetyRating": "safe/caution/warning/critical",
  "interactions": [
    {
      "drugPair": "Thuốc A + Thuốc B",
      "severity": "🔴 Major/🟡 Moderate/🟢 Minor",
      "mechanism": "Cơ chế tương tác",
      "clinicalAction": "Hướng xử trí lâm sàng / giãn cách liều / đổi thuốc"
    }
  ],
  "contraindications": [
    "Cảnh báo chống chỉ định nếu phát hiện bất thường"
  ],
  "renalDoseAdjustments": [
    "Lưu ý chỉnh liều theo chức năng thận/gan nếu có"
  ],
  "monitoringAdvice": [
    "Chỉ số cần theo dõi (VD: Ion đồ, ECG QTc, Creatinine, AST/ALT...)"
  ]
}`;
}

// ─── BƯỚC 5: Dự Đoán Biến Chứng & Kế Hoạch OnCall ─────────────────────────

export interface AIComplicationPredictionResult {
  riskLevel: 'Cao' | 'Trung bình' | 'Thấp';
  predictedComplications: {
    name: string;
    timeframe: '24h đầu' | 'Trong tuần đầu' | 'Dài hạn';
    probabilityEstimate: string; // VD: "30-40%"
    earlyWarningSigns: string;
    preventionStrategy: string;
  }[];
  onCallChecklist: string[];
  dischargeReadinessNote: string;
}

export function buildStep5ComplicationPrompt(
  patient: SoapPatientRecord,
  def: DiseaseReactionChainDefinition
): string {
  return `Dự đoán biến chứng cá thể hóa và thiết lập kế hoạch trực (OnCall Surveillance) cho bệnh nhân "${def.diseaseName}" (${def.icdCode}):

[THÔNG TIN BỆNH NHÂN]:
- Tuổi: ${patient.age || 'N/A'}, Giới: ${patient.gender === 'nam' ? 'Nam' : 'Nữ'}
- Bệnh cảnh (S & O): ${patient.sNotes || ''} ${patient.oNotes || ''}
- Đánh giá (A): ${patient.aAssessment || def.diseaseName}

YÊU CẦU:
Trả về duy nhất 1 JSON object:
{
  "riskLevel": "Cao/Trung bình/Thấp",
  "predictedComplications": [
    {
      "name": "Tên biến chứng nguy hiểm",
      "timeframe": "24h đầu/Trong tuần đầu/Dài hạn",
      "probabilityEstimate": "Ước tính tỷ lệ % rủi ro",
      "earlyWarningSigns": "Dấu hiệu cảnh báo sớm điều dưỡng/bác sĩ cần phát hiện",
      "preventionStrategy": "Biện pháp dự phòng tích cực"
    }
  ],
  "onCallChecklist": [
    "Việc cần làm cụ thể trong tua trực đêm (VD: Đo SpO2 mỗi 2h, kiểm tra đường huyết lúc 22h...)"
  ],
  "dischargeReadinessNote": "Tiêu chuẩn lâm sàng để xem xét cho ra viện an toàn"
}`;
}
