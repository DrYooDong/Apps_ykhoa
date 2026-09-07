/**
 * Clinical Reaction Chain Drawer UI - DocSpace
 * Giao diện Ngăn kéo Trực quan Điều phối Chuỗi Phản ứng Lâm sàng 7 Bậc
 * Tích hợp:
 * 1. Triệu chứng & DDXD (Candidate Diagnoses + Red Flags)
 * 2. Tiêu chuẩn Chẩn đoán tương tác (Interactive Checklist + % Match bar)
 * 3. Phác đồ điều trị phân bậc
 * 4. Kê đơn thuốc 1-Click áp dụng vào SOAP
 * 5. Theo dõi Biến chứng & Đẩy vào OnCall Checklist
 * 6. Trợ lý AI Biện Luận (Hybrid Reasoning)
 * 7. Vault Reader Drawer nhúng sẵn trực tiếp trong DocSpace
 */

import { escapeHtml } from '../docspace-view';
import { SoapPatientRecord, SoapPrescriptionItem } from '../types';
import { 
  DIAGNOSTIC_CHAIN_DATABASE, 
  DiseaseReactionChainDefinition, 
  getAllReactionChains,
  DrugChainOption,
  DiseaseComplicationItem
} from '../data/diagnostic-criteria-database';
import { reactionChainEngine, ReactionChainState } from './reaction-chain-engine';
import { processMarkdownWithToc } from '../../knowledge-vault/vault-reader-pro';
import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import { VaultArticle } from '../../knowledge-vault/types';

export class ReactionChainDrawer {
  private drawerEl: HTMLElement;
  private vaultModalEl: HTMLElement;
  private unsubscribeEngine?: () => void;
  private onApplyPrescriptionCallback?: (items: SoapPrescriptionItem[]) => void;
  private onApplyDiagnosisCallback?: (icdCode: string, diseaseName: string) => void;

  constructor() {
    // 1. Tạo Drawer chính của Reaction Chain
    this.drawerEl = document.createElement('div');
    this.drawerEl.id = 'dspReactionChainDrawer';
    this.drawerEl.className = 'dsp-reaction-chain-drawer-backdrop';
    this.drawerEl.style.display = 'none';
    this.drawerEl.style.position = 'fixed';
    this.drawerEl.style.inset = '0';
    this.drawerEl.style.zIndex = '1065';
    this.drawerEl.style.background = 'rgba(15, 23, 42, 0.6)';
    this.drawerEl.style.backdropFilter = 'blur(4px)';
    this.drawerEl.style.justifyContent = 'flex-end';
    document.body.appendChild(this.drawerEl);

    // 2. Tạo Vault Article Reader Modal nhúng trong DocSpace
    this.vaultModalEl = document.createElement('div');
    this.vaultModalEl.id = 'dspEmbeddedVaultModal';
    this.vaultModalEl.className = 'dsp-embedded-vault-modal-backdrop';
    this.vaultModalEl.style.display = 'none';
    this.vaultModalEl.style.position = 'fixed';
    this.vaultModalEl.style.inset = '0';
    this.vaultModalEl.style.zIndex = '1080';
    this.vaultModalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.vaultModalEl.style.backdropFilter = 'blur(5px)';
    this.vaultModalEl.style.alignItems = 'center';
    this.vaultModalEl.style.justifyContent = 'center';
    this.vaultModalEl.style.padding = '16px';
    document.body.appendChild(this.vaultModalEl);

    // Đóng drawer khi click ra ngoài backdrop
    this.drawerEl.addEventListener('mousedown', (e) => {
      if (e.target === this.drawerEl) this.close();
    });

    this.vaultModalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.vaultModalEl) this.closeVaultModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.vaultModalEl.style.display === 'flex') {
          this.closeVaultModal();
        } else if (this.drawerEl.style.display === 'flex') {
          this.close();
        }
      }
    });

    // Lắng nghe cập nhật từ Engine
    this.unsubscribeEngine = reactionChainEngine.subscribe(() => {
      if (this.drawerEl.style.display === 'flex') {
        this.renderDrawerContent();
      }
    });
  }

  public open(
    patient: SoapPatientRecord, 
    initialDiseaseKey?: string,
    onApplyPrescription?: (items: SoapPrescriptionItem[]) => void,
    onApplyDiagnosis?: (icdCode: string, diseaseName: string) => void
  ) {
    this.onApplyPrescriptionCallback = onApplyPrescription;
    this.onApplyDiagnosisCallback = onApplyDiagnosis;

    // Phân tích bệnh nhân
    reactionChainEngine.analyzePatientSoap(patient);

    if (initialDiseaseKey) {
      reactionChainEngine.selectDisease(initialDiseaseKey);
    }

    this.drawerEl.style.display = 'flex';
    this.renderDrawerContent();
  }

  public close() {
    this.drawerEl.style.display = 'none';
  }

  private closeVaultModal() {
    this.vaultModalEl.style.display = 'none';
  }

  /**
   * Render toàn bộ giao diện Drawer
   */
  private renderDrawerContent() {
    const state = reactionChainEngine.getState();
    const patient = state.patient;
    const selectedKey = state.selectedDiseaseKey;
    const def = selectedKey ? DIAGNOSTIC_CHAIN_DATABASE[selectedKey] : null;
    const evalRes = state.evaluationResult;

    const patientTitle = patient 
      ? `${escapeHtml(patient.fullName)} (${patient.age || 'N/A'}t - ${patient.patientCode || 'N/A'})`
      : 'Hồ sơ chưa có tên';

    this.drawerEl.innerHTML = `
      <div class="crce-drawer-panel" style="background:var(--color-surface, #ffffff); width:100%; max-width:650px; height:100vh; display:flex; flex-direction:column; box-shadow:-10px 0 35px rgba(0,0,0,0.3); border-left:1px solid var(--color-border, #e2e8f0); animation: slideInRight 0.22s ease-out; font-family:inherit; overflow:hidden;">
        
        <!-- Header -->
        <div style="padding:14px 18px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #0284c7, #3b82f6); color:#fff; display:flex; align-items:center; justify-content:center; font-size:17px; box-shadow:0 4px 6px -1px rgba(2,132,199,0.3);">
              <i class="fa-solid fa-link"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <h3 style="margin:0; font-size:15.5px; font-weight:700; color:var(--color-text, #0f172a);">Reaction Chain Engine</h3>
                <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:10.5px; font-weight:700;">CRCE v2.0</span>
              </div>
              <p style="margin:2px 0 0; font-size:11.5px; color:var(--color-text-muted, #64748b);">
                <i class="fa-solid fa-user-injured"></i> ${patientTitle}
              </p>
            </div>
          </div>
          <button id="btnCloseReactionDrawer" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:22px; cursor:pointer; color:var(--color-text-muted, #64748b);" title="Đóng">&times;</button>
        </div>

        <!-- 5-Step Stepper Timeline Navigation Strip -->
        <div style="display:flex; padding:8px 12px; background:var(--color-surface-offset, #f1f5f9); border-bottom:1px solid var(--color-border, #e2e8f0); gap:4px; overflow-x:auto; scrollbar-width:thin; flex-shrink:0;">
          <button class="crce-step-tab-btn ${state.activeStep === 1 ? 'active' : ''}" data-step="1" style="background:${state.activeStep === 1 ? 'var(--color-surface, #fff)' : 'transparent'}; color:${state.activeStep === 1 ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:${state.activeStep === 1 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <span>1.</span> <i class="fa-solid fa-stethoscope"></i> Triệu Chứng (DDXD)
          </button>
          <button class="crce-step-tab-btn ${state.activeStep === 2 ? 'active' : ''}" data-step="2" style="background:${state.activeStep === 2 ? 'var(--color-surface, #fff)' : 'transparent'}; color:${state.activeStep === 2 ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:${state.activeStep === 2 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <span>2.</span> <i class="fa-solid fa-clipboard-check"></i> Tiêu Chuẩn CĐ ${evalRes ? `(${evalRes.matchPercentage}%)` : ''}
          </button>
          <button class="crce-step-tab-btn ${state.activeStep === 3 ? 'active' : ''}" data-step="3" style="background:${state.activeStep === 3 ? 'var(--color-surface, #fff)' : 'transparent'}; color:${state.activeStep === 3 ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:${state.activeStep === 3 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <span>3.</span> <i class="fa-solid fa-pills"></i> Phác Đồ
          </button>
          <button class="crce-step-tab-btn ${state.activeStep === 4 ? 'active' : ''}" data-step="4" style="background:${state.activeStep === 4 ? 'var(--color-surface, #fff)' : 'transparent'}; color:${state.activeStep === 4 ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:${state.activeStep === 4 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <span>4.</span> <i class="fa-solid fa-capsules"></i> Kê Đơn Thuốc
          </button>
          <button class="crce-step-tab-btn ${state.activeStep === 5 ? 'active' : ''}" data-step="5" style="background:${state.activeStep === 5 ? 'var(--color-surface, #fff)' : 'transparent'}; color:${state.activeStep === 5 ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 10px; border-radius:6px; font-size:11.5px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; box-shadow:${state.activeStep === 5 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <span>5.</span> <i class="fa-solid fa-triangle-exclamation"></i> Biến Chứng
          </button>
        </div>

        <!-- Disease Quick Selector Dropdown Ribbon -->
        <div style="padding:8px 16px; background:var(--color-bg, #f8fafc); border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; align-items:center; justify-content:space-between; gap:10px; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0;">
            <span style="font-size:11.5px; font-weight:700; color:var(--color-text-muted, #64748b); white-space:nowrap;">Bệnh lý:</span>
            <select id="selCrceDisease" class="dsp-select" style="font-size:12px; padding:4px 8px; font-weight:600; width:100%; max-width:320px; border-radius:6px; background:var(--color-surface, #fff);">
              <option value="">-- Chọn 1 trong 10 bệnh trọng tâm --</option>
              ${getAllReactionChains().map(d => {
                const isSel = d.icdPrefixes.some(p => def && (def.icdCode === d.icdCode || def.icdPrefixes.includes(p)));
                return `<option value="${d.icdPrefixes[0]}" ${isSel ? 'selected' : ''}>[${d.icdCode}] ${d.diseaseName}</option>`;
              }).join('')}
            </select>
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <button id="btnCrceAiExplain" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:4px 10px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" title="Nhờ AI Biện Luận Ca Bệnh">
              <i class="fa-solid fa-wand-magic-sparkles"></i> 🤖 AI Biện Luận
            </button>
          </div>
        </div>

        <!-- Body Content (Dynamic by Step) -->
        <div class="crce-drawer-body" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:16px;">
          ${this.renderStepContent(state, def, evalRes)}
        </div>

        <!-- Footer Action Bar -->
        <div style="padding:12px 18px; border-top:1px solid var(--color-border, #e2e8f0); background:var(--color-bg, #f8fafc); display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:8px;">
            ${def ? `
              <button id="btnApplyDiagnosisToSoap" class="dsp-btn dsp-btn--secondary dsp-btn--sm" style="font-size:11.5px; font-weight:700; padding:6px 12px; border-radius:6px; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-file-signature"></i> Đưa chẩn đoán vào SOAP
              </button>
            ` : ''}
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${state.activeStep > 1 ? `
              <button id="btnCrcePrevStep" class="dsp-btn dsp-btn--sm" style="font-size:12px; padding:6px 12px; border-radius:6px; cursor:pointer;">
                <i class="fa-solid fa-arrow-left"></i> Bước trước
              </button>
            ` : ''}
            ${state.activeStep < 5 ? `
              <button id="btnCrceNextStep" class="dsp-btn dsp-btn--primary dsp-btn--sm" style="font-size:12px; font-weight:700; padding:6px 14px; border-radius:6px; cursor:pointer;">
                Bước tiếp <i class="fa-solid fa-arrow-right"></i>
              </button>
            ` : `
              <button id="btnCrceFinish" class="dsp-btn dsp-btn--success dsp-btn--sm" style="font-size:12px; font-weight:700; padding:6px 14px; border-radius:6px; cursor:pointer; background:#10b981; color:#fff; border:none;">
                <i class="fa-solid fa-check-double"></i> Hoàn tất chuỗi
              </button>
            `}
          </div>
        </div>

      </div>
    `;

    this.bindDrawerEvents(state, def);
  }

  /**
   * Render nội dung chi tiết theo từng bước
   */
  private renderStepContent(state: ReactionChainState, def: DiseaseReactionChainDefinition | null, evalRes: any): string {
    switch (state.activeStep) {
      // ─────────────────────────────────────────────────────────────
      // BƯỚC 1: TRIỆU CHỨNG & CHẨN ĐOÁN PHÂN BIỆT
      // ─────────────────────────────────────────────────────────────
      case 1: {
        const symptoms = state.activeSymptoms;
        const candidates = state.candidateDiagnoses;
        const redFlags = state.redFlags;
        const aiSymptom = state.aiSymptomAnalysis;

        return `
          <!-- Thanh điều khiển AI Bước 1 -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.08), rgba(139,92,246,0.08)); border:1px solid #fbcfe8; border-radius:8px; padding:10px 14px;">
            <div>
              <span style="font-size:12px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-brain"></i> Gemini AI Symptom Analyzer
              </span>
              <span style="font-size:11px; color:var(--color-text-muted, #64748b);">Quét ngữ nghĩa S & O, mở rộng hội chứng & tầm soát Red Flags</span>
            </div>
            <button id="btnAiAnalyzeStep1" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:5px 12px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px; box-shadow:0 2px 4px rgba(236,72,153,0.25);" ${state.isAiStepLoading ? 'disabled' : ''}>
              ${state.isAiStepLoading 
                ? `<i class="fa-solid fa-spinner fa-spin"></i> Đang phân tích...` 
                : `<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Phân Tích S & O`}
            </button>
          </div>

          <!-- Red Flags Alert Banner nếu có (tổng hợp từ Rule + AI) -->
          ${(redFlags.length > 0 || (aiSymptom && aiSymptom.redFlags.length > 0)) ? `
            <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:8px; padding:12px 14px; border:1px solid #fecaca; border-left-width:4px;">
              <div style="display:flex; align-items:center; gap:8px; color:#b91c1c; font-weight:700; font-size:13px; margin-bottom:6px;">
                <i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO NGUY HIỂM (RED FLAGS PHÁT HIỆN):
              </div>
              <ul style="margin:0; padding-left:18px; font-size:12px; color:#991b1b; line-height:1.5;">
                ${Array.from(new Set([...redFlags, ...(aiSymptom?.redFlags || [])])).map(rf => `<li>${escapeHtml(rf)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- AI Symptom Extended Card nếu đã có kết quả -->
          ${aiSymptom ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-left:4px solid #ec4899; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(236,72,153,0.06);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h4 style="margin:0; font-size:13px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-sparkles"></i> 🤖 Kết Quả Phân Tích Ngữ Nghĩa Gemini AI
                </h4>
                <span class="dsp-badge" style="background:#fce7f3; color:#be185d; font-size:10px; font-weight:700;">AI ENRICHED</span>
              </div>

              <!-- Triệu chứng AI phát hiện -->
              <div style="margin-bottom:10px;">
                <div style="font-size:11.5px; font-weight:700; color:var(--color-text, #0f172a); margin-bottom:4px;">Triệu chứng & Mức độ phát hiện:</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                  ${aiSymptom.detectedSymptoms.map(s => `
                    <span class="dsp-badge" style="background:${s.severity === 'severe' ? '#fee2e2' : s.severity === 'moderate' ? '#fef3c7' : '#e0f2fe'}; color:${s.severity === 'severe' ? '#b91c1c' : s.severity === 'moderate' ? '#b45309' : '#0369a1'}; font-size:11px; padding:3px 8px; border:1px solid rgba(0,0,0,0.08);">
                      <strong>${escapeHtml(s.symptomName)}</strong> (${s.category})
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Clinical Pearl từ AI -->
              ${aiSymptom.clinicalPearl ? `
                <div style="background:rgba(236,72,153,0.05); border-radius:6px; padding:8px 10px; font-size:11.5px; color:#9d174d; line-height:1.4;">
                  💡 <strong>Clinical Pearl:</strong> ${escapeHtml(aiSymptom.clinicalPearl)}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Triệu chứng phát hiện từ SOAP (Rule-Engine) -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h4 style="margin:0; font-size:13.5px; font-weight:700; color:var(--color-text, #0f172a);">
                <i class="fa-solid fa-magnifying-glass" style="color:#0284c7;"></i> Triệu Chứng Nhận Diện Tự Động (Offline)
              </h4>
              <span class="dsp-badge" style="background:#f1f5f9; color:#475569; font-size:11px;">
                ${symptoms.length} hội chứng
              </span>
            </div>

            ${symptoms.length > 0 ? `
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                ${symptoms.map(s => `
                  <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:11.5px; padding:4px 8px;">
                    <i class="fa-solid fa-check"></i> ${escapeHtml(s.symptomName)}
                  </span>
                `).join('')}
              </div>
            ` : `
              <div style="font-size:12px; color:var(--color-text-muted, #64748b); font-style:italic;">
                Chưa phát hiện từ khóa triệu chứng rõ rệt trong S & O của SOAP. Hãy bấm nút "✨ AI Phân Tích S & O" ở trên hoặc chọn bệnh lý trực tiếp từ menu.
              </div>
            `}
          </div>

          <!-- Danh sách Chẩn đoán Phân biệt (Candidate Diagnoses) -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 10px 0; font-size:13.5px; font-weight:700; color:var(--color-text, #0f172a); display:flex; justify-content:space-between; align-items:center;">
              <span><i class="fa-solid fa-list-ol" style="color:#3b82f6;"></i> Ma Trận Chẩn Đoán Phân Biệt (DDXD)</span>
              <span style="font-size:11px; font-weight:normal; color:var(--color-text-muted, #64748b);">Click để chọn đối chiếu</span>
            </h4>

            ${candidates.length > 0 ? `
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${candidates.map(c => {
                  const isMustMiss = c.isMustNotMiss;
                  const probColor = c.probability === 'high' ? '#ef4444' : c.probability === 'moderate' ? '#f59e0b' : '#64748b';
                  const probBg = c.probability === 'high' ? '#fee2e2' : c.probability === 'moderate' ? '#fef3c7' : '#f1f5f9';
                  const isCurrent = state.selectedDiseaseKey === c.diseaseKey;

                  return `
                    <div class="crce-candidate-card js-select-candidate" data-key="${c.diseaseKey}" style="border:1px solid ${isCurrent ? '#0284c7' : 'var(--color-border, #e2e8f0)'}; background:${isCurrent ? 'rgba(2,132,199,0.05)' : 'var(--color-surface, #fff)'}; border-radius:8px; padding:10px 12px; cursor:pointer; transition:all 0.15s ease; box-shadow:${isCurrent ? '0 0 0 1.5px #0284c7' : 'none'};">
                      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                          <span style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">
                            [${c.icdCode}] ${escapeHtml(c.diseaseName)}
                          </span>
                          ${isMustMiss ? `<span class="dsp-badge" style="background:#fef2f2; color:#b91c1c; border:1px solid #fecaca; font-size:10px; font-weight:700;">MUST NOT MISS</span>` : ''}
                        </div>
                        <span class="dsp-badge" style="background:${probBg}; color:${probColor}; font-size:10.5px; font-weight:700; text-transform:uppercase;">
                          ${c.probability}
                        </span>
                      </div>
                      <p style="margin:4px 0 0; font-size:11.5px; color:var(--color-text-muted, #64748b); line-height:1.4;">
                        ${escapeHtml(c.rationale)}
                      </p>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div style="font-size:12px; color:var(--color-text-muted, #64748b); font-style:italic;">
                Hãy chọn bệnh lý ở trên hoặc dùng AI phân tích để kích hoạt chuỗi.
              </div>
            `}
          </div>

          <!-- AI Explanation Container nếu có -->
          ${this.renderAiExplanationBox(state)}
        `;
      }

      // ─────────────────────────────────────────────────────────────
      // BƯỚC 2: TIÊU CHUẨN CHẨN ĐOÁN
      // ─────────────────────────────────────────────────────────────
      case 2: {
        if (!def) {
          return `<div style="text-align:center; padding:30px 0; color:var(--color-text-muted, #64748b);">Hãy chọn 1 bệnh lý để xem bảng tiêu chuẩn chẩn đoán.</div>`;
        }

        const matchPct = evalRes?.matchPercentage || 0;
        const conf = evalRes?.confidenceLevel || 'unlikely';
        const confBadge = conf === 'definite' 
          ? `<span class="dsp-badge" style="background:#dcfce7; color:#15803d; border:1px solid #bbf7d0; font-size:11px; font-weight:700;"><i class="fa-solid fa-circle-check"></i> XÁC ĐỊNH (DEFINITE)</span>`
          : conf === 'probable'
          ? `<span class="dsp-badge" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-size:11px; font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> RẤT CÓ THỂ (PROBABLE)</span>`
          : `<span class="dsp-badge" style="background:#f1f5f9; color:#475569; font-size:11px;"><i class="fa-solid fa-circle-question"></i> CẦN THÊM XÉT NGHIỆM</span>`;

        const aiReasoning = state.aiDiagnosticReasoning;

        return `
          <!-- Thanh điều khiển AI Bước 2 -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.08), rgba(139,92,246,0.08)); border:1px solid #fbcfe8; border-radius:8px; padding:10px 14px;">
            <div>
              <span style="font-size:12px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-clipboard-check"></i> Gemini AI Diagnostic Reasoner
              </span>
              <span style="font-size:11px; color:var(--color-text-muted, #64748b);">Đọc kết quả CLS & S/O để tự động đối chiếu tiêu chuẩn chẩn đoán</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button id="btnAiAnalyzeStep2" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:5px 12px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" ${state.isAiStepLoading ? 'disabled' : ''}>
                ${state.isAiStepLoading 
                  ? `<i class="fa-solid fa-spinner fa-spin"></i> Đang đối chiếu...` 
                  : `<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Đối Chiếu Tự Động`}
              </button>
            </div>
          </div>

          <!-- AI Diagnostic Reasoning Card nếu đã có kết quả -->
          ${aiReasoning ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-left:4px solid #8b5cf6; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(139,92,246,0.06);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h4 style="margin:0; font-size:13px; font-weight:700; color:#7c3aed; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-robot"></i> Đánh Giá Chẩn Đoán Từ Gemini AI (${aiReasoning.confidenceScore}%)
                </h4>
                <button id="btnApplyAiCriteriaSuggestions" class="dsp-btn dsp-btn--sm" style="background:#10b981; color:#fff; border:none; padding:4px 10px; font-size:11px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:4px;">
                  <i class="fa-solid fa-check-double"></i> Tự Động Tick Theo AI
                </button>
              </div>

              <div style="font-size:12px; color:var(--color-text, #0f172a); margin-bottom:8px; line-height:1.4;">
                <strong>Kết luận AI:</strong> ${escapeHtml(aiReasoning.suggestedAction)}
              </div>

              <!-- Cận lâm sàng còn thiếu -->
              ${aiReasoning.missingWorkup && aiReasoning.missingWorkup.length > 0 ? `
                <div style="background:#fef2f2; border-radius:6px; padding:8px 10px; font-size:11.5px; color:#991b1b;">
                  <strong>🔬 Cận lâm sàng mấu chốt còn thiếu:</strong>
                  <ul style="margin:4px 0 0; padding-left:18px;">
                    ${aiReasoning.missingWorkup.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Thanh Tiến Độ Tự Tin Chẩn Đoán (% Match) -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--color-text, #0f172a);">
                Độ tự tin Chẩn đoán: <strong>${matchPct}%</strong>
              </span>
              ${confBadge}
            </div>
            
            <div style="width:100%; height:8px; background:var(--color-surface-offset, #e2e8f0); border-radius:99px; overflow:hidden;">
              <div style="width:${matchPct}%; height:100%; background:linear-gradient(90deg, #38bdf8, #0284c7); border-radius:99px; transition:width 0.3s ease;"></div>
            </div>

            <div style="margin-top:8px; font-size:11.5px; color:var(--color-text-muted, #64748b); line-height:1.4;">
              <strong>Quy tắc chẩn đoán:</strong> ${escapeHtml(def.criteriaRule.ruleDescription)}
            </div>
          </div>

          <!-- Tiêu chuẩn vàng -->
          <div style="background:rgba(2, 132, 199, 0.06); border-left:4px solid #0284c7; border-radius:6px; padding:10px 12px; font-size:12px; color:#0369a1; line-height:1.4;">
            <strong><i class="fa-solid fa-award"></i> Tiêu Chuẩn Vàng (Gold Standard):</strong> ${escapeHtml(def.goldStandard)}
          </div>

          <!-- Bảng Checklist Tiêu Chuẩn Tương Tác -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 12px 0; font-size:13.5px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-tasks" style="color:#10b981;"></i> Bảng Kiểm Tiêu Chuẩn (Checklist)
            </h4>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${def.criteria.map(crit => {
                const isChecked = state.checkedCriteriaIds.has(crit.id);
                const isMandatory = crit.type === 'mandatory';
                const aiEval = aiReasoning?.criteriaEvaluations.find(e => e.criterionId === crit.id);

                const typeLabel = isMandatory 
                  ? `<span class="dsp-badge" style="background:#fee2e2; color:#b91c1c; font-size:9.5px; font-weight:700;">BẮT BUỘC</span>`
                  : crit.type === 'major'
                  ? `<span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; font-size:9.5px;">CHÍNH</span>`
                  : crit.type === 'lab'
                  ? `<span class="dsp-badge" style="background:#f3e8ff; color:#7e22ce; font-size:9.5px;">CLS / LAB</span>`
                  : crit.type === 'imaging'
                  ? `<span class="dsp-badge" style="background:#ccfbf1; color:#0f766e; font-size:9.5px;">HÌNH ẢNH</span>`
                  : `<span class="dsp-badge" style="background:#f1f5f9; color:#64748b; font-size:9.5px;">PHỤ</span>`;

                const aiSuggestionBadge = aiEval 
                  ? (aiEval.isMet 
                      ? `<span class="dsp-badge" style="background:#dcfce7; color:#15803d; font-size:9.5px; font-weight:700;"><i class="fa-solid fa-robot"></i> AI: ĐẠT</span>`
                      : `<span class="dsp-badge" style="background:#f1f5f9; color:#64748b; font-size:9.5px;"><i class="fa-solid fa-robot"></i> AI: CHƯA RÕ</span>`)
                  : '';

                return `
                  <label class="crce-criterion-item" style="display:flex; align-items:flex-start; gap:10px; padding:8px 10px; border-radius:6px; border:1px solid ${isChecked ? '#bae6fd' : 'var(--color-border, #e2e8f0)'}; background:${isChecked ? '#f0f9ff' : 'transparent'}; cursor:pointer; transition:all 0.15s ease;">
                    <input type="checkbox" class="js-toggle-criterion" data-id="${crit.id}" ${isChecked ? 'checked' : ''} style="margin-top:3px; cursor:pointer;" />
                    <div style="flex:1;">
                      <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <span style="font-size:12.5px; font-weight:${isChecked ? '700' : '500'}; color:var(--color-text, #0f172a);">
                          ${escapeHtml(crit.label)}
                        </span>
                        ${typeLabel}
                        ${aiSuggestionBadge}
                      </div>
                      ${crit.description ? `<p style="margin:2px 0 0; font-size:11px; color:var(--color-text-muted, #64748b);">${escapeHtml(crit.description)}</p>` : ''}
                      ${crit.labThreshold ? `<span style="display:inline-block; margin-top:2px; font-size:10.5px; font-weight:700; color:#8b5cf6;"><i class="fa-solid fa-vial"></i> Ngưỡng: ${escapeHtml(crit.labThreshold)}</span>` : ''}
                      ${aiEval?.evidenceText && aiEval.evidenceText !== 'Chưa có thông tin' ? `
                        <div style="margin-top:4px; font-size:10.5px; color:#0369a1; background:#e0f2fe; padding:2px 6px; border-radius:4px; display:inline-block;">
                          🔍 Bằng chứng: "${escapeHtml(aiEval.evidenceText)}"
                        </div>
                      ` : ''}
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Các bài viết Vault liên quan đến Tiêu chuẩn Chẩn đoán & CLS -->
          ${this.renderVaultPathwaysSection(def)}

          <!-- AI Explanation Container nếu có -->
          ${this.renderAiExplanationBox(state)}
        `;
      }

      // ─────────────────────────────────────────────────────────────
      // BƯỚC 3: PHÁC ĐỒ ĐIỀU TRỊ
      // ─────────────────────────────────────────────────────────────
      case 3: {
        if (!def) {
          return `<div style="text-align:center; padding:30px 0; color:var(--color-text-muted, #64748b);">Hãy chọn 1 bệnh lý để xem phác đồ.</div>`;
        }

        const proto = def.protocol;
        const aiProto = state.aiProtocolAdvice;

        return `
          <!-- Thanh điều khiển AI Bước 3 -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.08), rgba(139,92,246,0.08)); border:1px solid #fbcfe8; border-radius:8px; padding:10px 14px;">
            <div>
              <span style="font-size:12px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-user-doctor"></i> Gemini AI Protocol Advisor
              </span>
              <span style="font-size:11px; color:var(--color-text-muted, #64748b);">Cá thể hóa phác đồ theo tuổi, eGFR, cân nặng & bệnh đồng mắc</span>
            </div>
            <button id="btnAiAnalyzeStep3" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:5px 12px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" ${state.isAiStepLoading ? 'disabled' : ''}>
              ${state.isAiStepLoading 
                ? `<i class="fa-solid fa-spinner fa-spin"></i> Đang cá thể hóa...` 
                : `<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Cá Thể Hóa`}
            </button>
          </div>

          <!-- AI Protocol Advice Card nếu đã có kết quả -->
          ${aiProto ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-left:4px solid #ec4899; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(236,72,153,0.06);">
              <h4 style="margin:0 0 8px 0; font-size:13px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-sliders"></i> Phác Đồ Cá Thể Hóa Theo Bệnh Nhân (Gemini AI)
              </h4>

              <!-- Điểm cá thể hóa đặc thù -->
              <div style="margin-bottom:10px;">
                <strong style="font-size:11.5px; color:#0f172a;">Lưu ý điều chỉnh theo profile bệnh nhân:</strong>
                <div style="display:flex; flex-direction:column; gap:6px; margin-top:4px;">
                  ${aiProto.individualizationHighlights.map(h => `
                    <div style="background:#fdf2f8; border-radius:6px; padding:6px 10px; font-size:11.5px; color:#831843;">
                      <strong>• ${escapeHtml(h.factor)}:</strong> ${escapeHtml(h.recommendation)}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Critical Pearls -->
              ${aiProto.criticalPearls ? `
                <div style="background:#f0fdf4; border-left:3px solid #10b981; border-radius:4px; padding:6px 10px; font-size:11.5px; color:#166534;">
                  💡 <strong>EBM Pearl:</strong> ${escapeHtml(aiProto.criticalPearls)}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Tựa đề phác đồ chuẩn (Offline CSDL) -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <div style="width:32px; height:32px; border-radius:8px; background:#eff6ff; color:#3b82f6; display:flex; align-items:center; justify-content:center; font-size:16px;">
                <i class="fa-solid fa-file-waveform"></i>
              </div>
              <div>
                <h4 style="margin:0; font-size:14px; font-weight:700; color:var(--color-text, #0f172a);">
                  ${escapeHtml(proto.title)}
                </h4>
                <p style="margin:2px 0 0; font-size:11px; color:var(--color-text-muted, #64748b);">
                  Khuyến cáo: <strong>${escapeHtml(proto.guideline)}</strong>
                </p>
              </div>
            </div>

            <!-- Mục tiêu điều trị -->
            <div style="margin-top:10px; background:var(--color-surface-offset, #f8fafc); border-radius:6px; padding:8px 12px;">
              <strong style="font-size:11.5px; color:#0369a1;"><i class="fa-solid fa-bullseye"></i> Mục Tiêu Điều Trị Chuẩn:</strong>
              <ul style="margin:4px 0 0; padding-left:18px; font-size:11.5px; color:var(--color-text, #0f172a); line-height:1.4;">
                ${proto.targetGoals.map(g => `<li>${escapeHtml(g)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Xử trí ban đầu -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 8px 0; font-size:13px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> Xử Trí Khẩn Cấp & Phân Tầng Ban Đầu
            </h4>
            <ul style="margin:0; padding-left:18px; font-size:12px; color:var(--color-text, #0f172a); line-height:1.5;">
              ${proto.initialManagement.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
            </ul>
          </div>

          <!-- Chăm sóc hỗ trợ & Dặn dò -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 8px 0; font-size:13px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-hand-holding-heart" style="color:#10b981;"></i> Chăm Sóc Hỗ Trợ & Dinh Dưỡng
            </h4>
            <ul style="margin:0; padding-left:18px; font-size:12px; color:var(--color-text, #0f172a); line-height:1.5;">
              ${proto.supportiveCare.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>
          </div>

          <!-- Bài viết Phác đồ trong Vault -->
          ${this.renderVaultPathwaysSection(def)}
        `;
      }

      // ─────────────────────────────────────────────────────────────
      // BƯỚC 4: DƯỢC THƯ & KÊ ĐƠN THUỐC
      // ─────────────────────────────────────────────────────────────
      case 4: {
        if (!def) {
          return `<div style="text-align:center; padding:30px 0; color:var(--color-text-muted, #64748b);">Hãy chọn 1 bệnh lý để xem danh mục thuốc.</div>`;
        }

        const firstLine = def.protocol.firstLineDrugs;
        const secondLine = def.protocol.secondLineDrugs;
        const aiSafety = state.aiDrugSafetyCheck;

        return `
          <!-- Thanh điều khiển AI Bước 4 -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.08), rgba(139,92,246,0.08)); border:1px solid #fbcfe8; border-radius:8px; padding:10px 14px;">
            <div>
              <span style="font-size:12px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-shield-halved"></i> Gemini AI Drug Safety & Interaction Checker
              </span>
              <span style="font-size:11px; color:var(--color-text-muted, #64748b);">Quét tương tác thuốc, cảnh báo chống chỉ định & chỉnh liều suy thận</span>
            </div>
            <button id="btnAiAnalyzeStep4" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:5px 12px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" ${state.isAiStepLoading ? 'disabled' : ''}>
              ${state.isAiStepLoading 
                ? `<i class="fa-solid fa-spinner fa-spin"></i> Đang quét tương tác...` 
                : `<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Quét An Toàn Thuốc`}
            </button>
          </div>

          <!-- AI Drug Safety Card nếu đã có kết quả -->
          ${aiSafety ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-left:4px solid ${aiSafety.safetyRating === 'critical' ? '#ef4444' : aiSafety.safetyRating === 'warning' ? '#f59e0b' : '#10b981'}; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(236,72,153,0.06);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h4 style="margin:0; font-size:13px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-triangle-exclamation"></i> Đánh Giá An Toàn Đơn Thuốc (Gemini AI)
                </h4>
                <span class="dsp-badge" style="background:${aiSafety.safetyRating === 'critical' ? '#fee2e2' : '#fef3c7'}; color:${aiSafety.safetyRating === 'critical' ? '#b91c1c' : '#b45309'}; font-weight:700; font-size:10.5px; text-transform:uppercase;">
                  ${aiSafety.safetyRating}
                </span>
              </div>

              <!-- Tương tác thuốc phát hiện -->
              ${aiSafety.interactions && aiSafety.interactions.length > 0 ? `
                <div style="margin-bottom:10px;">
                  <strong style="font-size:11.5px; color:#b91c1c;">Cặp tương tác thuốc phát hiện (${aiSafety.interactions.length}):</strong>
                  <div style="display:flex; flex-direction:column; gap:6px; margin-top:4px;">
                    ${aiSafety.interactions.map(it => `
                      <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:8px 10px; font-size:11.5px;">
                        <div style="display:flex; justify-content:space-between; font-weight:700; color:#9f1239;">
                          <span>${escapeHtml(it.drugPair)}</span>
                          <span>${escapeHtml(it.severity)}</span>
                        </div>
                        <div style="color:#881337; margin-top:2px;">${escapeHtml(it.mechanism)}</div>
                        <div style="color:#0369a1; font-weight:600; margin-top:2px;">👉 Xử trí: ${escapeHtml(it.clinicalAction)}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div style="font-size:12px; color:#15803d; margin-bottom:8px;">
                  ✅ Không phát hiện cặp tương tác thuốc nghiêm trọng nào trong danh mục đã chọn.
                </div>
              `}

              <!-- Chỉnh liều suy thận / gan -->
              ${aiSafety.renalDoseAdjustments && aiSafety.renalDoseAdjustments.length > 0 ? `
                <div style="background:#f0fdfa; border-radius:6px; padding:8px 10px; font-size:11.5px; color:#0f766e; margin-top:6px;">
                  <strong>💧 Lưu ý chỉnh liều chức năng thận/gan:</strong>
                  <ul style="margin:4px 0 0; padding-left:18px;">
                    ${aiSafety.renalDoseAdjustments.map(adj => `<li>${escapeHtml(adj)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="margin:0; font-size:14px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-prescription-bottle-medical" style="color:#0284c7;"></i> Lựa Chọn Đơn Thuốc Theo Phác Đồ
            </h4>
            <button id="btnApplyAllDrugsToSoap" class="dsp-btn dsp-btn--primary dsp-btn--sm" style="font-size:11.5px; font-weight:700; padding:5px 10px; border-radius:6px; display:flex; align-items:center; gap:5px;">
              <i class="fa-solid fa-plus"></i> Kê đơn thuốc vào SOAP
            </button>
          </div>

          <!-- Thuốc hàng đầu (First-line) -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
              <span class="dsp-badge" style="background:#dcfce7; color:#15803d; border:1px solid #bbf7d0; font-weight:700; font-size:11px;">
                <i class="fa-solid fa-star"></i> THUỐC LỰA CHỌN HÀNG ĐẦU (FIRST-LINE)
              </span>
            </div>

            <div style="display:flex; flex-direction:column; gap:10px;">
              ${firstLine.map((drug, idx) => this.renderDrugOptionCard(drug, idx, 'first')).join('')}
            </div>
          </div>

          <!-- Thuốc thay thế / Hàng 2 (Second-line) -->
          ${secondLine.length > 0 ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
                <span class="dsp-badge" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-weight:700; font-size:11px;">
                  <i class="fa-solid fa-arrow-right-arrow-left"></i> THUỐC THAY THẾ (SECOND-LINE / SPECIAL)
                </span>
              </div>

              <div style="display:flex; flex-direction:column; gap:10px;">
                ${secondLine.map((drug, idx) => this.renderDrugOptionCard(drug, idx, 'second')).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Bài viết Dược thư trong Vault -->
          ${this.renderVaultPathwaysSection(def)}
        `;
      }

      // ─────────────────────────────────────────────────────────────
      // BƯỚC 5: BIẾN CHỨNG & THEO DÕI ONCALL
      // ─────────────────────────────────────────────────────────────
      case 5: {
        if (!def) {
          return `<div style="text-align:center; padding:30px 0; color:var(--color-text-muted, #64748b);">Hãy chọn 1 bệnh lý để xem biến chứng.</div>`;
        }

        const complications = def.complications;
        const aiComp = state.aiComplicationPrediction;

        return `
          <!-- Thanh điều khiển AI Bước 5 -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(236,72,153,0.08), rgba(139,92,246,0.08)); border:1px solid #fbcfe8; border-radius:8px; padding:10px 14px;">
            <div>
              <span style="font-size:12px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-shield-virus"></i> Gemini AI Complication & OnCall Predictor
              </span>
              <span style="font-size:11px; color:var(--color-text-muted, #64748b);">Dự đoán biến chứng cá thể & thiết lập bảng kiểm trực đêm</span>
            </div>
            <button id="btnAiAnalyzeStep5" class="dsp-btn dsp-btn--sm" style="background:linear-gradient(135deg, #ec4899, #8b5cf6); color:#fff; border:none; padding:5px 12px; font-size:11.5px; font-weight:700; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" ${state.isAiStepLoading ? 'disabled' : ''}>
              ${state.isAiStepLoading 
                ? `<i class="fa-solid fa-spinner fa-spin"></i> Đang dự đoán...` 
                : `<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Dự Đoán Biến Chứng`}
            </button>
          </div>

          <!-- AI Complication Predictor Card nếu đã có kết quả -->
          ${aiComp ? `
            <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-left:4px solid #ef4444; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(236,72,153,0.06);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <h4 style="margin:0; font-size:13px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-chart-line"></i> Dự Đoán Biến Chứng Cá Thể Hóa (Gemini AI)
                </h4>
                <span class="dsp-badge" style="background:#fee2e2; color:#b91c1c; font-weight:700; font-size:10.5px;">
                  RỦI RO: ${aiComp.riskLevel}
                </span>
              </div>

              <!-- Danh sách biến chứng AI dự đoán -->
              <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:10px;">
                ${aiComp.predictedComplications.map(p => `
                  <div style="background:#fff7ed; border:1px solid #ffedd5; border-radius:6px; padding:8px 10px; font-size:11.5px;">
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:#c2410c;">
                      <span>⚠️ ${escapeHtml(p.name)} (${p.timeframe})</span>
                      <span class="dsp-badge" style="background:#ffedd5; color:#c2410c; font-size:10px;">Xác suất: ${escapeHtml(p.probabilityEstimate)}</span>
                    </div>
                    <div style="color:#7c2d12; margin-top:2px;"><strong>Báo động sớm:</strong> ${escapeHtml(p.earlyWarningSigns)}</div>
                    <div style="color:#0369a1; margin-top:2px;"><strong>Dự phòng:</strong> ${escapeHtml(p.preventionStrategy)}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Checklist trực đêm OnCall -->
              ${aiComp.onCallChecklist && aiComp.onCallChecklist.length > 0 ? `
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; font-size:11.5px;">
                  <strong style="color:#0f172a;">📋 Nhiệm vụ ca trực đề xuất:</strong>
                  <ul style="margin:4px 0 0; padding-left:18px; color:var(--color-text, #0f172a);">
                    ${aiComp.onCallChecklist.map(task => `<li>${escapeHtml(task)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="margin:0; font-size:14px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-shield-virus" style="color:#ef4444;"></i> Giám Sát Biến Chứng & Bảng Kiểm OnCall (CSDL Chuẩn)
            </h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${complications.map(comp => {
              const isAcute = comp.timeframe === 'acute_24h';
              const tfBadge = isAcute 
                ? `<span class="dsp-badge" style="background:#fee2e2; color:#b91c1c; border:1px solid #fecaca; font-size:10px; font-weight:700;">CẤP CỨU 24H</span>`
                : `<span class="dsp-badge" style="background:#fef3c7; color:#b45309; font-size:10px;">7 NGÀY ĐẦU</span>`;

              return `
                <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px; border-left:4px solid ${isAcute ? '#ef4444' : '#f59e0b'};">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">
                      ⚠️ ${escapeHtml(comp.name)}
                    </div>
                    ${tfBadge}
                  </div>
                  
                  <div style="font-size:11.5px; color:var(--color-text-muted, #64748b); margin-bottom:4px;">
                    <strong>Dấu hiệu báo động:</strong> ${escapeHtml(comp.warningSigns)}
                  </div>
                  
                  <div style="font-size:11.5px; color:#0369a1; margin-bottom:8px;">
                    <strong>Xử trí phòng ngừa:</strong> ${escapeHtml(comp.preventiveAction)}
                  </div>

                  <div style="display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-offset, #f8fafc); border-radius:6px; padding:6px 10px;">
                    <span style="font-size:11px; font-weight:600; color:var(--color-text, #0f172a);">
                      📌 Alert OnCall: "${escapeHtml(comp.onCallAlertText)}"
                    </span>
                    <button type="button" class="dsp-btn dsp-btn--sm js-btn-add-oncall" data-alert="${escapeHtml(comp.onCallAlertText)}" style="font-size:10.5px; padding:3px 8px; border-radius:4px;">
                      <i class="fa-solid fa-bell"></i> Thêm vào trực
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Xét nghiệm theo dõi định kỳ -->
          <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 8px 0; font-size:13px; font-weight:700; color:var(--color-text, #0f172a);">
              <i class="fa-solid fa-flask" style="color:#8b5cf6;"></i> Chỉ Số Cận Lâm Sàng Cần Theo Dõi (Monitoring Labs)
            </h4>
            <ul style="margin:0; padding-left:18px; font-size:12px; color:var(--color-text, #0f172a); line-height:1.5;">
              ${def.monitoringLabs.map(lab => `<li>${escapeHtml(lab)}</li>`).join('')}
            </ul>
          </div>

          <!-- Bài viết Biến chứng trong Vault -->
          ${this.renderVaultPathwaysSection(def)}
        `;
      }

      default:
        return '';
    }
  }

  /**
   * Render Card lựa chọn thuốc
   */
  private renderDrugOptionCard(drug: DrugChainOption, idx: number, prefix: string): string {
    return `
      <div class="crce-drug-card" style="border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; background:var(--color-surface-offset, #f8fafc);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <span style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">
              💊 ${escapeHtml(drug.drugName)}
            </span>
            <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; font-size:10px; margin-left:6px;">
              ${escapeHtml(drug.class)}
            </span>
          </div>
          <label style="font-size:11px; font-weight:600; color:#0284c7; cursor:pointer; display:flex; align-items:center; gap:4px;">
            <input type="checkbox" class="js-crce-rx-check" data-drug-json="${escapeHtml(JSON.stringify(drug))}" checked />
            Chọn kê
          </label>
        </div>

        <div style="margin-top:4px; font-size:11.5px; color:var(--color-text, #0f172a);">
          <strong>Liều dùng:</strong> ${escapeHtml(drug.dosage)} (${escapeHtml(drug.frequency)}) · <em>Đường: ${escapeHtml(drug.route)}</em>
        </div>

        <div style="margin-top:2px; font-size:11px; color:var(--color-text-muted, #64748b);">
          <strong>Lời dặn:</strong> ${escapeHtml(drug.instructions)}
        </div>
      </div>
    `;
  }

  /**
   * Render hộp AI Biện luận giải thích
   */
  private renderAiExplanationBox(state: ReactionChainState): string {
    if (state.isAiLoading) {
      return `
        <div class="dsp-card" style="background:rgba(236,72,153,0.05); border:1px solid #fbcfe8; border-radius:10px; padding:16px; text-align:center;">
          <i class="fa-solid fa-spinner fa-spin" style="font-size:22px; color:#ec4899; margin-bottom:8px;"></i>
          <div style="font-size:12.5px; font-weight:600; color:#be185d;">Trợ lý AI đang biện luận và phân tích chuỗi phản ứng lâm sàng...</div>
        </div>
      `;
    }

    if (!state.aiExplanation) return '';

    return `
      <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid #fbcfe8; border-radius:10px; padding:14px; box-shadow:0 4px 12px rgba(236,72,153,0.08);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h4 style="margin:0; font-size:13.5px; font-weight:700; color:#be185d; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> 🤖 Biện Luận Lâm Sàng Trợ Lý AI
          </h4>
          <button id="btnRefreshAiExplanation" style="background:none; border:none; color:#be185d; cursor:pointer; font-size:12px;" title="Làm mới">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
        <div style="font-size:12px; line-height:1.5; color:var(--color-text, #0f172a); white-space:pre-wrap;">
          ${escapeHtml(state.aiExplanation)}
        </div>
      </div>
    `;
  }

  /**
   * Render danh mục bài viết Vault liên quan
   */
  private renderVaultPathwaysSection(def: DiseaseReactionChainDefinition): string {
    const vaultLinks = def.vaultPathways;
    if (!vaultLinks || vaultLinks.length === 0) return '';

    return `
      <div class="dsp-card" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
        <h4 style="margin:0 0 10px 0; font-size:13px; font-weight:700; color:var(--color-text, #0f172a); display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-book-medical" style="color:#8b5cf6;"></i> Kho Tri Thức Y Khoa Liên Quan (16 Kho Vault)
        </h4>

        <div style="display:flex; flex-direction:column; gap:6px;">
          ${vaultLinks.map(link => {
            const khoCodeBg = link.khoCode === 'TC' ? '#e0f2fe' : link.khoCode === 'CD' ? '#fce7f3' : link.khoCode === 'PDDT' ? '#dbeafe' : link.khoCode === 'DUOC' ? '#cffafe' : '#fef2f2';
            const khoCodeColor = link.khoCode === 'TC' ? '#0369a1' : link.khoCode === 'CD' ? '#be185d' : link.khoCode === 'PDDT' ? '#1d4ed8' : link.khoCode === 'DUOC' ? '#0e7490' : '#b91c1c';

            return `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 10px; border-radius:6px; background:var(--color-surface-offset, #f8fafc); border:1px solid var(--color-border, #e2e8f0);">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="dsp-badge" style="background:${khoCodeBg}; color:${khoCodeColor}; font-weight:700; font-size:10px;">
                    ${link.khoCode}
                  </span>
                  <span style="font-size:12px; font-weight:600; color:var(--color-text, #0f172a);">
                    ${escapeHtml(link.articleTitle)}
                  </span>
                </div>
                <button type="button" class="dsp-btn dsp-btn--sm js-btn-open-vault-article" data-keyword="${escapeHtml(link.searchKeyword)}" style="font-size:11px; padding:3px 8px; border-radius:4px; display:flex; align-items:center; gap:4px;">
                  <i class="fa-solid fa-book-open"></i> Đọc bài
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Mở Vault Reader Modal nhúng ngay trong DocSpace
   */
  public async openEmbeddedVaultArticle(searchKeyword: string) {
    const matched = VAULT_CATALOG.find(a => 
      a.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (a.relPath && a.relPath.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(searchKeyword.toLowerCase())))
    ) || VAULT_CATALOG[0];

    if (!matched) return;

    this.vaultModalEl.style.display = 'flex';
    this.vaultModalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:850px; height:85vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border, #e2e8f0); animation: slideInRight 0.2s ease-out; font-family:inherit;">
        <!-- Modal Header -->
        <div style="padding:12px 18px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; font-weight:700; font-size:11px;">
              ${matched.khoCode}
            </span>
            <h3 style="margin:0; font-size:15px; font-weight:700; color:var(--color-text, #0f172a);">
              ${escapeHtml(matched.title)}
            </h3>
          </div>
          <button id="btnCloseEmbeddedVaultModal" style="background:none; border:none; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:20px; cursor:pointer; color:var(--color-text-muted, #64748b);">&times;</button>
        </div>

        <!-- Modal Body Content -->
        <div id="dspEmbeddedVaultContent" style="flex:1; overflow-y:auto; padding:20px; font-size:13.5px; line-height:1.6; color:var(--color-text, #0f172a);">
          <div style="text-align:center; padding:40px 0;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; color:#0284c7;"></i>
            <p style="margin-top:8px; font-size:12px; color:var(--color-text-muted, #64748b);">Đang tải nội dung bài viết từ Kho Tri Thức Vault...</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnCloseEmbeddedVaultModal')?.addEventListener('click', () => {
      this.closeVaultModal();
    });

    try {
      const response = await fetch(`./knowledge-vault/${encodeURI(matched.relPath || matched.fullFileName)}`);
      if (!response.ok) throw new Error('Không thể tải bài viết');
      const markdown = await response.text();
      const { htmlContent } = processMarkdownWithToc(markdown);

      const contentBox = document.getElementById('dspEmbeddedVaultContent');
      if (contentBox) {
        contentBox.innerHTML = htmlContent;
      }
    } catch (err: any) {
      const contentBox = document.getElementById('dspEmbeddedVaultContent');
      if (contentBox) {
        contentBox.innerHTML = `
          <div style="padding:20px; color:#b91c1c; background:#fee2e2; border-radius:8px;">
            <strong>Không thể nạp nội dung file markdown:</strong> ${escapeHtml(matched.relPath || matched.fullFileName)}<br>
            <em>(${err.message || err})</em>
          </div>
        `;
      }
    }
  }

  /**
   * Gắn sự kiện các nút tương tác trong Drawer
   */
  private bindDrawerEvents(state: ReactionChainState, def: DiseaseReactionChainDefinition | null) {
    // Đóng drawer
    document.getElementById('btnCloseReactionDrawer')?.addEventListener('click', () => this.close());

    // Chuyển bước tab
    this.drawerEl.querySelectorAll('.crce-step-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const step = parseInt((e.currentTarget as HTMLElement).getAttribute('data-step') || '1', 10) as 1 | 2 | 3 | 4 | 5;
        reactionChainEngine.setActiveStep(step);
      });
    });

    // Chọn dropdown bệnh lý
    document.getElementById('selCrceDisease')?.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (val) {
        const found = getAllReactionChains().find(d => d.icdPrefixes.includes(val));
        if (found) {
          const key = Object.keys(DIAGNOSTIC_CHAIN_DATABASE).find(k => DIAGNOSTIC_CHAIN_DATABASE[k]?.icdCode === found.icdCode);
          if (key) reactionChainEngine.selectDisease(key);
        }
      }
    });

    // Chọn candidate card ở Bước 1
    this.drawerEl.querySelectorAll('.js-select-candidate').forEach(el => {
      el.addEventListener('click', (e) => {
        const key = (e.currentTarget as HTMLElement).getAttribute('data-key');
        if (key) reactionChainEngine.selectDisease(key);
      });
    });

    // Toggle tick chọn tiêu chuẩn ở Bước 2
    this.drawerEl.querySelectorAll('.js-toggle-criterion').forEach(el => {
      el.addEventListener('change', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) reactionChainEngine.toggleCriterion(id);
      });
    });

    // Bước trước / Bước tiếp
    document.getElementById('btnCrcePrevStep')?.addEventListener('click', () => {
      if (state.activeStep > 1) reactionChainEngine.setActiveStep((state.activeStep - 1) as any);
    });

    document.getElementById('btnCrceNextStep')?.addEventListener('click', () => {
      if (state.activeStep < 5) reactionChainEngine.setActiveStep((state.activeStep + 1) as any);
    });

    document.getElementById('btnCrceFinish')?.addEventListener('click', () => {
      this.close();
    });

    // ─────────────────────────────────────────────────────────────
    // BINDING CÁC NÚT AI 5 BƯỚC (CRCE v3.0)
    // ─────────────────────────────────────────────────────────────

    // AI Bước 1: Phân tích triệu chứng
    document.getElementById('btnAiAnalyzeStep1')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.analyzeWithAI_Step1();
      } catch (err: any) {
        alert('Lỗi AI Bước 1: ' + (err.message || err));
      }
    });

    // AI Bước 2: Đối chiếu tiêu chuẩn
    document.getElementById('btnAiAnalyzeStep2')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.analyzeWithAI_Step2();
      } catch (err: any) {
        alert('Lỗi AI Bước 2: ' + (err.message || err));
      }
    });

    // AI Bước 2: Tự động tick theo đề xuất AI
    document.getElementById('btnApplyAiCriteriaSuggestions')?.addEventListener('click', () => {
      reactionChainEngine.applyAiCriteriaSuggestions();
      alert('✅ Đã tự động tick chọn các tiêu chuẩn chẩn đoán theo phân tích của AI!');
    });

    // AI Bước 3: Cá thể hóa phác đồ
    document.getElementById('btnAiAnalyzeStep3')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.analyzeWithAI_Step3();
      } catch (err: any) {
        alert('Lỗi AI Bước 3: ' + (err.message || err));
      }
    });

    // AI Bước 4: Kiểm tra an toàn thuốc
    document.getElementById('btnAiAnalyzeStep4')?.addEventListener('click', async () => {
      try {
        const checkedDrugs: string[] = [];
        this.drawerEl.querySelectorAll('.js-crce-rx-check:checked').forEach(el => {
          const json = (el as HTMLElement).getAttribute('data-drug-json');
          if (json) {
            try {
              const d = JSON.parse(json);
              checkedDrugs.push(`${d.drugName} (${d.dosage})`);
            } catch {}
          }
        });
        await reactionChainEngine.analyzeWithAI_Step4(checkedDrugs);
      } catch (err: any) {
        alert('Lỗi AI Bước 4: ' + (err.message || err));
      }
    });

    // AI Bước 5: Dự đoán biến chứng
    document.getElementById('btnAiAnalyzeStep5')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.analyzeWithAI_Step5();
      } catch (err: any) {
        alert('Lỗi AI Bước 5: ' + (err.message || err));
      }
    });

    // Nút AI Biện Luận Toàn Cục (Header)
    document.getElementById('btnCrceAiExplain')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.requestAiClinicalExplanation();
      } catch (err: any) {
        alert(err.message || 'Lỗi khi gọi AI');
      }
    });

    document.getElementById('btnRefreshAiExplanation')?.addEventListener('click', async () => {
      try {
        await reactionChainEngine.requestAiClinicalExplanation();
      } catch (err: any) {
        alert(err.message || 'Lỗi khi làm mới AI');
      }
    });

    // Nút Đưa chẩn đoán vào SOAP
    document.getElementById('btnApplyDiagnosisToSoap')?.addEventListener('click', () => {
      if (def && this.onApplyDiagnosisCallback) {
        this.onApplyDiagnosisCallback(def.icdCode, def.diseaseName);
        alert(`✅ Đã áp dụng chẩn đoán: [${def.icdCode}] ${def.diseaseName} vào SOAP Assessment!`);
      }
    });

    // Nút Kê đơn thuốc vào SOAP
    document.getElementById('btnApplyAllDrugsToSoap')?.addEventListener('click', () => {
      const selectedDrugs: DrugChainOption[] = [];
      this.drawerEl.querySelectorAll('.js-crce-rx-check:checked').forEach(el => {
        const json = (el as HTMLElement).getAttribute('data-drug-json');
        if (json) {
          try {
            selectedDrugs.push(JSON.parse(json));
          } catch {}
        }
      });

      if (selectedDrugs.length === 0) {
        alert('Chưa có thuốc nào được tick chọn.');
        return;
      }

      if (this.onApplyPrescriptionCallback) {
        const soapItems: SoapPrescriptionItem[] = selectedDrugs.map((d, i) => ({
          id: `rx_${Date.now()}_${i}`,
          name: d.drugName,
          dosage: d.dosage,
          route: d.route,
          frequency: d.frequency,
          quantity: '1 Hộp / Lọ',
          instructions: d.instructions
        }));

        this.onApplyPrescriptionCallback(soapItems);
        alert(`✅ Đã thêm ${soapItems.length} thuốc vào đơn thuốc SOAP Plan!`);
      }
    });

    // Nút Thêm vào OnCall
    this.drawerEl.querySelectorAll('.js-btn-add-oncall').forEach(el => {
      el.addEventListener('click', (e) => {
        const alertText = (e.currentTarget as HTMLElement).getAttribute('data-alert');
        alert(`📌 Đã gắn nhãn cảnh báo OnCall: "${alertText}"`);
      });
    });

    // Nút Đọc bài Vault
    this.drawerEl.querySelectorAll('.js-btn-open-vault-article').forEach(el => {
      el.addEventListener('click', (e) => {
        const keyword = (e.currentTarget as HTMLElement).getAttribute('data-keyword') || '';
        this.openEmbeddedVaultArticle(keyword);
      });
    });
  }
}

export const reactionChainDrawer = new ReactionChainDrawer();
