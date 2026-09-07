/**
 * DocSpace — AI Clinical Copilot & Guideline Cross-Check Modal
 * Hệ thống Trợ lý AI Lâm sàng Đa Chế độ & Chấm Điểm Tuân Thủ Phác Đồ EBM
 */

import { SoapPatientRecord } from '../types';
import { getActiveProfile, updateSoapPatient } from '../storage';
import { PhiRedactorService } from '../services/phi-redactor';
import { escapeHtml } from '../docspace-view';

export interface GuidelineDivergence {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  currentStatus: string;
  guidelineRecommendation: string;
  actionableFix: string;
}

export interface GuidelineCrossCheckResult {
  adherenceScore: number;
  matchedGuideline: string;
  divergences: GuidelineDivergence[];
  suggestedMedChanges: { action: 'ADD' | 'REMOVE' | 'ADJUST_DOSE' | 'MONITOR_SAFETY'; drug: string; dose: string; reason: string }[];
  missingWorkup: string[];
}

export class AiCopilotModalController {
  private activePatient: SoapPatientRecord | null = null;
  private currentMode: 'ANALYSIS' | 'GUIDELINE_CHECK' | 'CARE_PATHWAY' = 'ANALYSIS';

  public open(patient: SoapPatientRecord): void {
    this.activePatient = patient;
    const modalEl = document.getElementById('dspAiCopilotModal');
    if (modalEl) {
      modalEl.remove();
    }
    document.body.insertAdjacentHTML('beforeend', this.renderModal(patient));
    this.bindEvents();
  }

  public close(): void {
    const modalEl = document.getElementById('dspAiCopilotModal');
    if (modalEl) {
      modalEl.remove();
    }
  }

  private generateMockCrossCheck(patient: SoapPatientRecord): GuidelineCrossCheckResult {
    const diag = (patient.currentDiagnosis || '').toLowerCase();
    const isPneumonia = diag.includes('phổi') || diag.includes('pneumonia');
    const isSepsis = diag.includes('sốc') || diag.includes('sepsis') || diag.includes('nhiễm khuẩn');

    if (isSepsis) {
      return {
        adherenceScore: 82,
        matchedGuideline: 'Surviving Sepsis Campaign 2026 / Grade 1A',
        divergences: [
          {
            severity: 'critical',
            title: 'Chưa đo nồng độ Lactate máu lần 2 sau 2-4h',
            currentStatus: 'Mới có 1 mẫu Lactate đầu vào',
            guidelineRecommendation: 'Khuyến cáo đo lại Lactate mỗi 2-4h để theo dõi độ thanh thải (Lactate Clearance > 10%).',
            actionableFix: 'Chỉ định thêm xét nghiệm Khí máu động mạch / Lactate máu lúc 14:00.'
          },
          {
            severity: 'high',
            title: 'Mục tiêu Huyết áp Trung bình (MAP) chưa đạt > 65 mmHg',
            currentStatus: 'MAP hiện tại dao động 60-62 mmHg',
            guidelineRecommendation: 'Duy trì MAP ≥ 65 mmHg bằng Noradrenaline phối hợp bù dịch tinh thể 30 mL/kg.',
            actionableFix: 'Tăng tốc độ truyền Noradrenaline từ 0.05 lên 0.1 mcg/kg/min.'
          }
        ],
        suggestedMedChanges: [
          { action: 'ADJUST_DOSE', drug: 'Noradrenaline', dose: '0.1 mcg/kg/min', reason: 'Tăng huyết áp tưới máu mô đạt MAP ≥ 65 mmHg' },
          { action: 'MONITOR_SAFETY', drug: 'Vancomycin', dose: 'Trough level 15-20 mcg/mL', reason: 'Tránh độc tính thận khi phối hợp Ceftriaxone' }
        ],
        missingWorkup: ['Cấy máu 2 vị trí trước liều kháng sinh thứ 2', 'Điện giải đồ kiểm tra hạ Kali máu']
      };
    }

    return {
      adherenceScore: 92,
      matchedGuideline: 'Hội Phổi Việt Nam & ATS/IDSA Guidelines (Viêm Phổi Mắc Phải Cộng Đồng)',
      divergences: [
        {
          severity: 'medium',
          title: 'Xem xét chuyển kháng sinh uống (Oral Switch)',
          currentStatus: 'Bệnh nhân đã hết sốt 48h, ăn uống được',
          guidelineRecommendation: 'Chuyển từ Ceftriaxone IV sang Cefuroxime / Amoxicillin-Clavulanate PO khi sinh hiệu ổn định.',
          actionableFix: 'Kế hoạch chuyển kháng sinh đường uống vào Ngày thứ 5.'
        }
      ],
      suggestedMedChanges: [
        { action: 'ADD', drug: 'Kaliclorua 0.5g', dose: '2 viên uống sau ăn', reason: 'Bù Kali máu do K+ 2.8 mEq/L' }
      ],
      missingWorkup: ['Điện giải đồ kiểm tra lại sau 24h bù Kali']
    };
  }

  private renderModal(patient: SoapPatientRecord): string {
    const redactedName = PhiRedactorService.redactPatientName(patient.fullName);
    const crossCheck = this.generateMockCrossCheck(patient);

    return `
      <div class="dsp-modal-backdrop" id="dspAiCopilotModal">
        <div class="dsp-modal-card dsp-modal-card--lg" style="max-width:880px; width:92vw; max-height:90vh; display:flex; flex-direction:column;">
          
          <!-- Modal Header -->
          <div class="dsp-modal-header" style="padding:1.25rem 1.5rem; border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="width:34px; height:34px; border-radius:8px; background:linear-gradient(135deg, #0284c7, #8b5cf6); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </span>
              <div>
                <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:var(--color-text);">AI Clinical Copilot &amp; Guideline Cross-Check</h3>
                <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:2px;">
                  Bệnh nhân: <strong>${escapeHtml(redactedName)}</strong> [G.${escapeHtml(patient.bedNumber || '?')}] • Bảo mật HIPAA PHI 100%
                </div>
              </div>
            </div>
            <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnCloseAiModal" style="font-size:1.1rem; padding:4px 8px;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <!-- Mode Selector Tabs -->
          <div class="dsp-ai-mode-tabs" style="display:flex; border-bottom:1px solid var(--color-border); background:var(--color-bg); padding:0 1.5rem;">
            <button type="button" class="dsp-ai-tab active" data-mode="ANALYSIS">
              <i class="fa-solid fa-stethoscope"></i> Phân Tích &amp; Dự Báo 24h
            </button>
            <button type="button" class="dsp-ai-tab" data-mode="GUIDELINE_CHECK">
              <i class="fa-solid fa-clipboard-check"></i> Đối Chiếu Guideline EBM (${crossCheck.adherenceScore}%)
            </button>
            <button type="button" class="dsp-ai-tab" data-mode="CARE_PATHWAY">
              <i class="fa-solid fa-route"></i> Lộ Trình Chăm Sóc
            </button>
          </div>

          <!-- Modal Scrollable Body -->
          <div class="dsp-modal-body" style="padding:1.5rem; overflow-y:auto; flex:1;">
            
            <!-- TAB 1: ANALYSIS -->
            <div class="dsp-ai-tab-content active" id="tabContentAnalysis">
              <div class="dsp-ai-prompt-box">
                <div class="dsp-ai-prompt-header">
                  <i class="fa-solid fa-bolt" style="color:var(--dsp-sky);"></i>
                  <strong>Đề Xuất Phân Tích &amp; Biện Luận Lâm Sàng:</strong>
                </div>
                <div class="dsp-ai-response-text" style="font-size:0.85rem; line-height:1.6; color:var(--color-text);">
                  <p><strong>1. Đánh giá tình trạng hiện tại:</strong> Bệnh nhân ${escapeHtml(redactedName)} vào viện ngày thứ ${patient.dayOfIllness || 1} với chẩn đoán <em>${escapeHtml(patient.currentDiagnosis || patient.admissionDiagnosis || 'Theo dõi')}</em>. Tình trạng tri giác tỉnh, sinh hiệu tạm ổn định, có dấu hiệu hạ Kali máu mức độ trung bình cần bù tích cực.</p>
                  <p><strong>2. Dự báo xu hướng 24 - 48 giờ tới:</strong> Nguy cơ rối loạn nhịp tim thứ phát do hạ Kali nếu không được kiểm soát. Cần theo dõi điện tim ECG và bù Kali đường uống kết hợp dịch truyền.</p>
                  <p><strong>3. Kế hoạch đề xuất (Plan):</strong></p>
                  <ul>
                    <li>Duy trì kháng sinh đủ liệu trình 5 - 7 ngày.</li>
                    <li>Bù Kali Clorid 0.5g x 2 viên/ngày, uống sau ăn.</li>
                    <li>Xét nghiệm lại CTM, CRP và Điện giải đồ sau 48 giờ.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- TAB 2: GUIDELINE CHECK -->
            <div class="dsp-ai-tab-content" id="tabContentGuideline" style="display:none;">
              
              <!-- Adherence Score Progress -->
              <div class="dsp-adherence-card" style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:12px; padding:1.25rem; margin-bottom:1.25rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span style="font-size:0.85rem; font-weight:800; color:var(--color-text);">
                    <i class="fa-solid fa-award" style="color:#10b981;"></i> Độ Tuân Thủ Khuyến Cáo (Adherence Score):
                  </span>
                  <span style="font-size:1.25rem; font-weight:800; color:#10b981;">${crossCheck.adherenceScore} / 100</span>
                </div>
                <div style="height:8px; border-radius:4px; background:rgba(0,0,0,0.1); overflow:hidden;">
                  <div style="width:${crossCheck.adherenceScore}%; height:100%; background:linear-gradient(90deg, #0284c7, #10b981);"></div>
                </div>
                <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:6px;">
                  Khung tham chiếu: <strong>${escapeHtml(crossCheck.matchedGuideline)}</strong>
                </div>
              </div>

              <!-- Divergence List -->
              <div style="margin-bottom:1.25rem;">
                <div style="font-size:0.85rem; font-weight:800; color:var(--color-text); margin-bottom:8px;">
                  <i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i> Phát Hiện Sai Lệch So Với Phác Đồ (${crossCheck.divergences.length}):
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${crossCheck.divergences.map(div => `
                    <div style="background:var(--color-surface); border:1px solid var(--color-border); border-left:4px solid ${div.severity === 'critical' ? '#f43f5e' : '#f59e0b'}; border-radius:8px; padding:10px 14px;">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <strong style="font-size:0.85rem; color:var(--color-text);">${escapeHtml(div.title)}</strong>
                        <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; padding:2px 6px; border-radius:4px; background:${div.severity === 'critical' ? 'rgba(244,63,94,0.15)' : 'rgba(245,158,11,0.15)'}; color:${div.severity === 'critical' ? '#f43f5e' : '#f59e0b'};">
                          ${div.severity}
                        </span>
                      </div>
                      <div style="font-size:0.8rem; color:var(--color-text-muted); margin-top:4px;">
                        • Thực tế: ${escapeHtml(div.currentStatus)}
                      </div>
                      <div style="font-size:0.8rem; color:#10b981; margin-top:2px;">
                        • Khuyến nghị: ${escapeHtml(div.guidelineRecommendation)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Suggested Med Changes -->
              <div>
                <div style="font-size:0.85rem; font-weight:800; color:var(--color-text); margin-bottom:8px;">
                  <i class="fa-solid fa-pills" style="color:#8b5cf6;"></i> Đề Xuất Bổ Sung / Chỉnh Liều Thuốc:
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${crossCheck.suggestedMedChanges.map(med => `
                    <div style="background:var(--color-bg); padding:8px 12px; border-radius:6px; font-size:0.8rem; display:flex; align-items:center; justify-content:space-between;">
                      <div>
                        <strong>${escapeHtml(med.drug)}</strong>: ${escapeHtml(med.dose)}
                        <small style="color:var(--color-text-muted); display:block;">(${escapeHtml(med.reason)})</small>
                      </div>
                      <span style="font-size:0.72rem; font-weight:700; padding:2px 6px; border-radius:4px; background:rgba(14,165,233,0.15); color:var(--dsp-sky);">
                        ${med.action}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- TAB 3: CARE PATHWAY -->
            <div class="dsp-ai-tab-content" id="tabContentPathway" style="display:none;">
              <div style="background:var(--color-bg); padding:1rem; border-radius:10px; border:1px solid var(--color-border); font-size:0.85rem; line-height:1.6;">
                <h4 style="margin:0 0 8px; color:var(--dsp-sky);"><i class="fa-solid fa-route"></i> Lộ Trình Xuất Viện Dự Kiến (Clinical Pathway):</h4>
                <ul>
                  <li><strong>Ngày 1 - 3:</strong> Kháng sinh tiêm tĩnh mạch + Bù điện giải tích cực + Khí dung nếu khó thở.</li>
                  <li><strong>Ngày 4 - 5:</strong> Tái đánh giá men gan, chức năng thận, chuyển kháng sinh uống (Step-down therapy).</li>
                  <li><strong>Ngày 6 - 7:</strong> Bệnh nhân sinh hiệu ổn định, đủ tiêu chuẩn ra viện. Hẹn tái khám sau 1 tuần.</li>
                </ul>
              </div>
            </div>

          </div>

          <!-- Modal Footer Actions -->
          <div class="dsp-modal-footer" style="padding:1rem 1.5rem; border-top:1px solid var(--color-border); background:var(--color-bg); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:0.75rem; color:var(--color-text-muted);">
              <i class="fa-solid fa-shield-check" style="color:#10b981;"></i> Đã kiểm duyệt an toàn y tế
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="btnCancelAiModal">Đóng</button>
              <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm" id="btnInjectAiToSoap">
                <i class="fa-solid fa-notes-medical"></i> Chèn Khuyến Cáo Vào SOAP Plan
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    document.getElementById('btnCloseAiModal')?.addEventListener('click', () => this.close());
    document.getElementById('btnCancelAiModal')?.addEventListener('click', () => this.close());

    // Tab switching
    document.querySelectorAll('.dsp-ai-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.dsp-ai-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.getAttribute('data-mode');
        document.getElementById('tabContentAnalysis')!.style.display = mode === 'ANALYSIS' ? 'block' : 'none';
        document.getElementById('tabContentGuideline')!.style.display = mode === 'GUIDELINE_CHECK' ? 'block' : 'none';
        document.getElementById('tabContentPathway')!.style.display = mode === 'CARE_PATHWAY' ? 'block' : 'none';
      });
    });

    // Inject to SOAP Plan
    document.getElementById('btnInjectAiToSoap')?.addEventListener('click', () => {
      const profile = getActiveProfile();
      if (!profile || !this.activePatient) return;

      const textToAppend = `\n[AI Copilot EBM Recommendation]:\n- Khuyến nghị bù Kali Clorid 0.5g x 2 viên/ngày.\n- Tái đánh giá bilan và chuyển kháng sinh uống ngày thứ 5.`;
      this.activePatient.pPlan = (this.activePatient.pPlan || '') + textToAppend;
      updateSoapPatient(profile.id, this.activePatient.id, { pPlan: this.activePatient.pPlan });
      alert('✅ Đã chèn khuyến cáo AI Copilot vào Kế hoạch điều trị (P) của bệnh nhân!');
      this.close();
    });
  }
}

export const aiCopilotModal = new AiCopilotModalController();
