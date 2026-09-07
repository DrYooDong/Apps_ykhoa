/**
 * Clinical Reaction Chain Engine (CRCE) - DocSpace
 * Bộ Điều Phối & Tính Toán Phản Ứng Chuỗi Lâm Sàng 7 Bậc
 * Kết nối tương tác giữa Triệu chứng ➔ Tiêu chuẩn chẩn đoán ➔ Phác đồ ➔ Dược thư ➔ Biến chứng & 16 Kho Vault
 */

import { SoapPatientRecord } from '../types';
import { 
  DIAGNOSTIC_CHAIN_DATABASE, 
  DiseaseReactionChainDefinition, 
  findReactionChainByIcd, 
  getAllReactionChains,
  DrugChainOption,
  DiseaseComplicationItem
} from '../data/diagnostic-criteria-database';
import { detectCandidateDiagnosesFromText, SymptomMappingEntry } from '../data/symptom-icd-mapping';
import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import { VaultArticle } from '../../knowledge-vault/types';
import { 
  callGeminiJSON, 
  callGeminiStream, 
  clearCrceSessionCache 
} from '../ai/gemini-crce-client';
import {
  CRCE_SYSTEM_INSTRUCTION,
  AISymptomAnalysisResult,
  AIDiagnosticReasoningResult,
  AIProtocolAdviceResult,
  AIDrugSafetyResult,
  AIComplicationPredictionResult,
  buildStep1SymptomPrompt,
  buildStep2CriteriaPrompt,
  buildStep3ProtocolPrompt,
  buildStep4DrugSafetyPrompt,
  buildStep5ComplicationPrompt
} from '../ai/crce-ai-prompts';

export interface CriteriaEvaluationResult {
  diseaseKey: string;
  icdCode: string;
  diseaseName: string;
  totalCriteriaCount: number;
  checkedCriteriaCount: number;
  mandatorySatisfied: boolean;
  majorSatisfiedCount: number;
  matchPercentage: number;
  confidenceLevel: 'definite' | 'probable' | 'possible' | 'unlikely';
  missingMandatoryLabels: string[];
  missingMajorLabels: string[];
}

export interface ReactionChainState {
  patient: SoapPatientRecord | null;
  activeSymptoms: SymptomMappingEntry[];
  candidateDiagnoses: {
    diseaseKey: string;
    icdCode: string;
    diseaseName: string;
    score: number;
    probability: 'high' | 'moderate' | 'low';
    isMustNotMiss?: boolean;
    rationale: string;
  }[];
  redFlags: string[];
  selectedDiseaseKey: string | null;
  checkedCriteriaIds: Set<string>;
  evaluationResult: CriteriaEvaluationResult | null;
  activeStep: 1 | 2 | 3 | 4 | 5; // 1: Triệu chứng -> DDXD, 2: TCCĐ, 3: Phác đồ, 4: Dược & Đơn thuốc, 5: Biến chứng & OnCall
  aiExplanation: string | null;
  isAiLoading: boolean;

  // AI-Augmented Step Results
  aiSymptomAnalysis: AISymptomAnalysisResult | null;
  aiDiagnosticReasoning: AIDiagnosticReasoningResult | null;
  aiProtocolAdvice: AIProtocolAdviceResult | null;
  aiDrugSafetyCheck: AIDrugSafetyResult | null;
  aiComplicationPrediction: AIComplicationPredictionResult | null;
  isAiStepLoading: boolean;
  aiStepError: string | null;
}

export class ClinicalReactionChainEngine {
  private static instance: ClinicalReactionChainEngine;
  private state: ReactionChainState = {
    patient: null,
    activeSymptoms: [],
    candidateDiagnoses: [],
    redFlags: [],
    selectedDiseaseKey: null,
    checkedCriteriaIds: new Set<string>(),
    evaluationResult: null,
    activeStep: 1,
    aiExplanation: null,
    isAiLoading: false,

    aiSymptomAnalysis: null,
    aiDiagnosticReasoning: null,
    aiProtocolAdvice: null,
    aiDrugSafetyCheck: null,
    aiComplicationPrediction: null,
    isAiStepLoading: false,
    aiStepError: null
  };

  private listeners: ((state: ReactionChainState) => void)[] = [];

  private constructor() {}

  public static getInstance(): ClinicalReactionChainEngine {
    if (!ClinicalReactionChainEngine.instance) {
      ClinicalReactionChainEngine.instance = new ClinicalReactionChainEngine();
    }
    return ClinicalReactionChainEngine.instance;
  }

  public getState(): ReactionChainState {
    return { ...this.state };
  }

  public subscribe(fn: (state: ReactionChainState) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.getState()));
  }

  /**
   * Kích hoạt chuỗi phản ứng từ Hồ sơ SOAP (S & O text)
   */
  /**
   * Kích hoạt chuỗi phản ứng từ Hồ sơ SOAP (S & O text)
   */
  public analyzePatientSoap(patient: SoapPatientRecord) {
    this.state.patient = patient;
    const combinedText = `${patient.sNotes || ''} ${patient.oNotes || ''} ${patient.aAssessment || ''} ${patient.admissionDiagnosis || ''} ${patient.currentDiagnosis || ''}`;
    
    const analysis = detectCandidateDiagnosesFromText(combinedText);
    this.state.activeSymptoms = analysis.matchedSymptoms;
    this.state.candidateDiagnoses = analysis.candidateDiseases;
    this.state.redFlags = analysis.aggregatedRedFlags;

    // Nếu bệnh nhân đã có chẩn đoán trong Assessment hoặc mã ICD, tự động chọn
    let defaultKey: string | null = null;
    const diag = patient.aAssessment || patient.currentDiagnosis || patient.admissionDiagnosis || '';
    if (diag) {
      const matchByIcd = findReactionChainByIcd(diag);
      if (matchByIcd) {
        defaultKey = this.findKeyByDefinition(matchByIcd);
      }
    }

    if (!defaultKey && analysis.candidateDiseases.length > 0) {
      defaultKey = analysis.candidateDiseases[0]?.diseaseKey || null;
    }

    if (defaultKey) {
      this.selectDisease(defaultKey);
    } else {
      this.state.selectedDiseaseKey = null;
      this.state.checkedCriteriaIds.clear();
      this.state.evaluationResult = null;
      this.notify();
    }
  }

  /**
   * Chọn bệnh lý cụ thể để tiến hành đối chiếu Tiêu chuẩn Chẩn đoán & Phác đồ
   */
  public selectDisease(diseaseKey: string) {
    this.state.selectedDiseaseKey = diseaseKey;
    this.state.checkedCriteriaIds.clear();
    
    // Auto check một số tiêu chuẩn nếu phát hiện từ khóa trong SOAP
    const disease = DIAGNOSTIC_CHAIN_DATABASE[diseaseKey];
    if (disease && this.state.patient) {
      const text = `${this.state.patient.sNotes || ''} ${this.state.patient.oNotes || ''}`.toLowerCase();
      disease.criteria.forEach(crit => {
        const words = crit.label.toLowerCase().split(' ');
        if (words.some(w => w.length > 3 && text.includes(w))) {
          this.state.checkedCriteriaIds.add(crit.id);
        }
      });
    }

    this.recalculateEvaluation();
    this.state.activeStep = 2; // Chuyển sang bước Tiêu chuẩn Chẩn đoán
    this.notify();
  }

  /**
   * Toggle tick chọn một tiêu chuẩn chẩn đoán
   */
  public toggleCriterion(criterionId: string) {
    if (this.state.checkedCriteriaIds.has(criterionId)) {
      this.state.checkedCriteriaIds.delete(criterionId);
    } else {
      this.state.checkedCriteriaIds.add(criterionId);
    }
    this.recalculateEvaluation();
    this.notify();
  }

  /**
   * Chuyển tab bước trong chuỗi
   */
  public setActiveStep(step: 1 | 2 | 3 | 4 | 5) {
    this.state.activeStep = step;
    this.notify();
  }

  /**
   * Đánh giá lại độ tin cậy chẩn đoán dựa trên các tiêu chuẩn đã tick
   */
  private recalculateEvaluation() {
    if (!this.state.selectedDiseaseKey) {
      this.state.evaluationResult = null;
      return;
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) {
      this.state.evaluationResult = null;
      return;
    }

    const totalCount = def.criteria.length;
    const checkedCount = this.state.checkedCriteriaIds.size;
    const mandatoryIds = def.criteriaRule.mandatoryIds || [];
    
    let mandatorySatisfied = true;
    const missingMandatoryLabels: string[] = [];

    mandatoryIds.forEach(id => {
      if (!this.state.checkedCriteriaIds.has(id)) {
        mandatorySatisfied = false;
        const item = def.criteria.find(c => c.id === id);
        if (item) missingMandatoryLabels.push(item.label);
      }
    });

    const majorCriteria = def.criteria.filter(c => c.type === 'major');
    let majorCount = 0;
    const missingMajorLabels: string[] = [];

    majorCriteria.forEach(c => {
      if (this.state.checkedCriteriaIds.has(c.id)) {
        majorCount++;
      } else {
        missingMajorLabels.push(c.label);
      }
    });

    const minMajor = def.criteriaRule.minMajorRequired || 1;
    const rawPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

    let confidence: 'definite' | 'probable' | 'possible' | 'unlikely' = 'unlikely';
    if (mandatorySatisfied && majorCount >= minMajor) {
      confidence = 'definite';
    } else if (mandatorySatisfied || majorCount >= minMajor || rawPercent >= 60) {
      confidence = 'probable';
    } else if (checkedCount > 0 || rawPercent >= 30) {
      confidence = 'possible';
    }

    this.state.evaluationResult = {
      diseaseKey: this.state.selectedDiseaseKey,
      icdCode: def.icdCode,
      diseaseName: def.diseaseName,
      totalCriteriaCount: totalCount,
      checkedCriteriaCount: checkedCount,
      mandatorySatisfied,
      majorSatisfiedCount: majorCount,
      matchPercentage: rawPercent,
      confidenceLevel: confidence,
      missingMandatoryLabels,
      missingMajorLabels
    };
  }

  /**
   * Lấy danh sách thuốc của phác đồ hiện tại
   */
  public getCurrentProtocolDrugs(): { firstLine: DrugChainOption[]; secondLine: DrugChainOption[] } {
    if (!this.state.selectedDiseaseKey) return { firstLine: [], secondLine: [] };
    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) return { firstLine: [], secondLine: [] };
    return {
      firstLine: def.protocol.firstLineDrugs,
      secondLine: def.protocol.secondLineDrugs
    };
  }

  /**
   * Lấy danh sách biến chứng cần theo dõi
   */
  public getCurrentComplications(): DiseaseComplicationItem[] {
    if (!this.state.selectedDiseaseKey) return [];
    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    return def?.complications || [];
  }

  /**
   * Tìm kiếm các bài viết liên quan trong 16 Kho Vault
   */
  public getVaultArticlesForDisease(diseaseKey: string): VaultArticle[] {
    const def = DIAGNOSTIC_CHAIN_DATABASE[diseaseKey];
    if (!def) return [];

    const searchTerms = [def.diseaseName.toLowerCase(), def.icdCode.toLowerCase(), ...def.icdPrefixes.map(p => p.toLowerCase())];
    
    return VAULT_CATALOG.filter(art => {
      const fullText = (art.title + ' ' + (art.snippet || '') + ' ' + (art.tags ? art.tags.join(' ') : '')).toLowerCase();
      return searchTerms.some(term => fullText.includes(term));
    }).slice(0, 10);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5 BƯỚC AI AUGMENTED METHODS (GEMINI REST & STRUCTURED OUTPUT)
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * BƯỚC 1: AI Phân tích Ngữ nghĩa Triệu chứng & Gợi ý DDXD
   */
  public async analyzeWithAI_Step1(): Promise<AISymptomAnalysisResult> {
    if (!this.state.patient) {
      throw new Error('Chưa có dữ liệu bệnh nhân để phân tích.');
    }

    this.state.isAiStepLoading = true;
    this.state.aiStepError = null;
    this.notify();

    try {
      const prompt = buildStep1SymptomPrompt(this.state.patient);
      const cacheKey = `step1_${this.state.patient.id || 'curr'}_${this.state.patient.sNotes?.substring(0, 30)}`;
      
      const result = await callGeminiJSON<AISymptomAnalysisResult>(
        prompt, 
        CRCE_SYSTEM_INSTRUCTION, 
        cacheKey
      );

      this.state.aiSymptomAnalysis = result;
      this.state.isAiStepLoading = false;
      this.notify();
      return result;
    } catch (err: any) {
      this.state.isAiStepLoading = false;
      this.state.aiStepError = err.message || 'Lỗi phân tích triệu chứng bằng AI';
      this.notify();
      throw err;
    }
  }

  /**
   * BƯỚC 2: AI Đối chiếu Tiêu chuẩn Chẩn đoán & Gợi ý Auto-tick
   */
  public async analyzeWithAI_Step2(): Promise<AIDiagnosticReasoningResult> {
    if (!this.state.patient || !this.state.selectedDiseaseKey) {
      throw new Error('Chưa chọn bệnh lý để đối chiếu tiêu chuẩn.');
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) throw new Error('Không tìm thấy định nghĩa bệnh lý.');

    this.state.isAiStepLoading = true;
    this.state.aiStepError = null;
    this.notify();

    try {
      const prompt = buildStep2CriteriaPrompt(this.state.patient, def);
      const cacheKey = `step2_${this.state.selectedDiseaseKey}_${this.state.patient.id || 'curr'}`;

      const result = await callGeminiJSON<AIDiagnosticReasoningResult>(
        prompt, 
        CRCE_SYSTEM_INSTRUCTION, 
        cacheKey
      );

      this.state.aiDiagnosticReasoning = result;
      this.state.isAiStepLoading = false;
      this.notify();
      return result;
    } catch (err: any) {
      this.state.isAiStepLoading = false;
      this.state.aiStepError = err.message || 'Lỗi đối chiếu tiêu chuẩn bằng AI';
      this.notify();
      throw err;
    }
  }

  /**
   * Tự động tick các tiêu chuẩn mà AI đánh giá là thỏa mãn (isMet = true)
   */
  public applyAiCriteriaSuggestions() {
    if (!this.state.aiDiagnosticReasoning) return;
    
    this.state.aiDiagnosticReasoning.criteriaEvaluations.forEach(ev => {
      if (ev.isMet) {
        this.state.checkedCriteriaIds.add(ev.criterionId);
      }
    });

    this.recalculateEvaluation();
    this.notify();
  }

  /**
   * BƯỚC 3: AI Cá Thể Hóa Phác Đồ Điều Trị
   */
  public async analyzeWithAI_Step3(): Promise<AIProtocolAdviceResult> {
    if (!this.state.patient || !this.state.selectedDiseaseKey) {
      throw new Error('Chưa chọn bệnh lý để cá thể hóa phác đồ.');
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) throw new Error('Không tìm thấy định nghĩa bệnh lý.');

    this.state.isAiStepLoading = true;
    this.state.aiStepError = null;
    this.notify();

    try {
      const prompt = buildStep3ProtocolPrompt(this.state.patient, def);
      const cacheKey = `step3_${this.state.selectedDiseaseKey}_${this.state.patient.id || 'curr'}`;

      const result = await callGeminiJSON<AIProtocolAdviceResult>(
        prompt, 
        CRCE_SYSTEM_INSTRUCTION, 
        cacheKey
      );

      this.state.aiProtocolAdvice = result;
      this.state.isAiStepLoading = false;
      this.notify();
      return result;
    } catch (err: any) {
      this.state.isAiStepLoading = false;
      this.state.aiStepError = err.message || 'Lỗi cá thể hóa phác đồ bằng AI';
      this.notify();
      throw err;
    }
  }

  /**
   * BƯỚC 4: AI Kiểm Tra An Toàn Thuốc & Tương Tác
   */
  public async analyzeWithAI_Step4(selectedDrugs?: string[]): Promise<AIDrugSafetyResult> {
    if (!this.state.patient || !this.state.selectedDiseaseKey) {
      throw new Error('Chưa chọn bệnh lý để kiểm tra thuốc.');
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) throw new Error('Không tìm thấy định nghĩa bệnh lý.');

    const drugsToCheck = (selectedDrugs && selectedDrugs.length > 0)
      ? selectedDrugs
      : def.protocol.firstLineDrugs.map(d => `${d.drugName} (${d.dosage})`);

    this.state.isAiStepLoading = true;
    this.state.aiStepError = null;
    this.notify();

    try {
      const prompt = buildStep4DrugSafetyPrompt(this.state.patient, drugsToCheck, def);
      const cacheKey = `step4_${this.state.selectedDiseaseKey}_${drugsToCheck.join('_').substring(0, 30)}`;

      const result = await callGeminiJSON<AIDrugSafetyResult>(
        prompt, 
        CRCE_SYSTEM_INSTRUCTION, 
        cacheKey
      );

      this.state.aiDrugSafetyCheck = result;
      this.state.isAiStepLoading = false;
      this.notify();
      return result;
    } catch (err: any) {
      this.state.isAiStepLoading = false;
      this.state.aiStepError = err.message || 'Lỗi kiểm tra an toàn thuốc bằng AI';
      this.notify();
      throw err;
    }
  }

  /**
   * BƯỚC 5: AI Dự Đoán Biến Chứng & Kế Hoạch OnCall
   */
  public async analyzeWithAI_Step5(): Promise<AIComplicationPredictionResult> {
    if (!this.state.patient || !this.state.selectedDiseaseKey) {
      throw new Error('Chưa chọn bệnh lý để dự đoán biến chứng.');
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) throw new Error('Không tìm thấy định nghĩa bệnh lý.');

    this.state.isAiStepLoading = true;
    this.state.aiStepError = null;
    this.notify();

    try {
      const prompt = buildStep5ComplicationPrompt(this.state.patient, def);
      const cacheKey = `step5_${this.state.selectedDiseaseKey}_${this.state.patient.id || 'curr'}`;

      const result = await callGeminiJSON<AIComplicationPredictionResult>(
        prompt, 
        CRCE_SYSTEM_INSTRUCTION, 
        cacheKey
      );

      this.state.aiComplicationPrediction = result;
      this.state.isAiStepLoading = false;
      this.notify();
      return result;
    } catch (err: any) {
      this.state.isAiStepLoading = false;
      this.state.aiStepError = err.message || 'Lỗi dự đoán biến chứng bằng AI';
      this.notify();
      throw err;
    }
  }

  /**
   * Xóa toàn bộ kết quả AI khi chuyển bệnh nhân hoặc reset
   */
  public resetAiState() {
    this.state.aiSymptomAnalysis = null;
    this.state.aiDiagnosticReasoning = null;
    this.state.aiProtocolAdvice = null;
    this.state.aiDrugSafetyCheck = null;
    this.state.aiComplicationPrediction = null;
    this.state.isAiStepLoading = false;
    this.state.aiStepError = null;
    clearCrceSessionCache();
  }

  /**
   * Gọi AI LLM để giải thích ca bệnh & biện luận lâm sàng chuyên sâu (Hybrid Mode)
   */
  public async requestAiClinicalExplanation(): Promise<string> {
    if (!this.state.selectedDiseaseKey) {
      throw new Error('Chưa chọn bệnh lý để phân tích.');
    }

    const def = DIAGNOSTIC_CHAIN_DATABASE[this.state.selectedDiseaseKey];
    if (!def) throw new Error('Không tìm thấy thông tin bệnh lý.');

    this.state.isAiLoading = true;
    this.notify();

    try {
      const checkedItems = def.criteria
        .filter(c => this.state.checkedCriteriaIds.has(c.id))
        .map(c => `- [x] ${c.label} (${c.type})`)
        .join('\n');

      const missingItems = def.criteria
        .filter(c => !this.state.checkedCriteriaIds.has(c.id))
        .map(c => `- [ ] ${c.label} (${c.type})`)
        .join('\n');

      const prompt = `Bạn là Trợ lý AI Cố vấn Lâm sàng Chuyên sâu của hệ thống DocSpace (CliniPortal).
Hãy phân tích và biện luận ca bệnh sau:

BỆNH CẢNH:
- Bệnh nhân: ${this.state.patient?.fullName || 'N/A'} (${this.state.patient?.age || 'N/A'} tuổi, ${this.state.patient?.gender || 'N/A'})
- Bệnh sử & Triệu chứng (S): ${this.state.patient?.sNotes || 'Chưa ghi'}
- Khám & Cận lâm sàng (O): ${this.state.patient?.oNotes || 'Chưa ghi'}
- Chẩn đoán xem xét: ${def.diseaseName} (Mã ICD-10: ${def.icdCode})

TIÊU CHUẨN ĐÃ THỎA MÃN:
${checkedItems || 'Chưa tick tiêu chuẩn nào'}

TIÊU CHUẨN CÒN THIẾU CẦN KIỂM CHỨNG:
${missingItems || 'Đã thỏa tất cả'}

YÊU CẦU TRẢ LỜI:
1. Đánh giá khả năng chẩn đoán xác định dựa trên tiêu chuẩn vàng (${def.goldStandard}).
2. Gợi ý 2-3 xét nghiệm cận lâm sàng mấu chốt cần bổ sung ngay để chốt chẩn đoán.
3. Đề xuất phác đồ điều trị ưu tiên và lưu ý cá thể hóa dùng thuốc.
4. Cảnh báo 1-2 biến chứng nguy kịch cần theo dõi sát trong 24 giờ đầu.

Hãy trả lời súc tích, chuẩn y khoa, gạch đầu dòng rõ ràng, định dạng Markdown chuyên nghiệp.`;

      // Ưu tiên gọi Gemini Stream
      let accumulatedText = '';
      const streamResult = await callGeminiStream(prompt, CRCE_SYSTEM_INSTRUCTION, (chunk) => {
        accumulatedText += chunk;
        this.state.aiExplanation = accumulatedText;
        this.notify();
      }).catch(() => null);

      if (streamResult) {
        this.state.aiExplanation = streamResult;
        this.state.isAiLoading = false;
        this.notify();
        return streamResult;
      }

      // Fallback Smart Offline Reasoning Engine
      const offlineReasoning = `### 🧠 Biện Luận Lâm Sàng & Phân Tích Chuỗi Phản Ứng (Offline Mode)
**Chẩn đoán trọng tâm**: **${def.diseaseName}** (${def.icdCode})
**Mức độ tin cậy**: **${this.state.evaluationResult?.confidenceLevel.toUpperCase()}** (${this.state.evaluationResult?.matchPercentage}% tiêu chuẩn đạt)

#### 1. Đánh Giá Tiêu Chuẩn Vàng
- **Tiêu chuẩn vàng**: ${def.goldStandard}.
- ${this.state.evaluationResult?.mandatorySatisfied ? '✅ Đã thỏa mãn tiêu chuẩn bắt buộc.' : '⚠️ **Chưa thỏa tiêu chuẩn bắt buộc**: ' + this.state.evaluationResult?.missingMandatoryLabels.join(', ')}

#### 2. Cận Lâm Sàng Đề Xuất Ưu Tiên
${def.monitoringLabs.map(lab => `- 🔬 ${lab}`).join('\n')}

#### 3. Phác Đồ Điều Trị Đích & Thuốc Khởi Đầu
- **Mục tiêu**: ${def.protocol.targetGoals.join('; ')}
- **Thuốc hàng đầu**: ${def.protocol.firstLineDrugs.map(d => `**${d.drugName}** (${d.dosage})`).join(' + ')}

#### 4. Cảnh Báo Biến Chứng Nguy Hiểm Cần Theo Dõi (OnCall)
${def.complications.map(c => `- ⚠️ **${c.name}** (${c.timeframe === 'acute_24h' ? '24h đầu' : 'Tuần đầu'}): ${c.warningSigns}`).join('\n')}
`;

      this.state.aiExplanation = offlineReasoning;
      this.state.isAiLoading = false;
      this.notify();
      return offlineReasoning;
    } catch (err: any) {
      this.state.isAiLoading = false;
      this.state.aiExplanation = `Lỗi khi kết nối Trợ lý AI: ${err.message || err}`;
      this.notify();
      throw err;
    }
  }

  private findKeyByDefinition(def: DiseaseReactionChainDefinition): string | null {
    for (const [key, value] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (value.icdCode === def.icdCode) return key;
    }
    return null;
  }
}

export const reactionChainEngine = ClinicalReactionChainEngine.getInstance();
