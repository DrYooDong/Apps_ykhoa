/**
 * DocSpace — Case Logger View
 * Ghi chép ca lâm sàng cá nhân (ẩn danh hoá)
 */

import { getAllCases, saveCase, deleteCase } from '../storage';
import { CaseRecord, CaseContext } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { analyzeCase } from '../ai/llm-client';
import { searchContext } from '../ai/rag-engine';
import { IcdPicker } from './icd-picker';
import { ebmBridge } from './ebm-bridge-view';
import { drugPicker } from './drug-picker';
import { resourcePicker } from './resource-picker';
import { icdPicker } from './icd-picker';
import { calculatorPicker } from './calculator-picker';
import { abgPicker } from './abg-picker';
import { clinicalReasoningPanel } from './clinical-reasoning-panel';
import { drugIntelligencePanel } from './drug-intelligence-panel';

const CONTEXT_OPTIONS: { value: CaseContext; label: string; icon: string }[] = [
  { value: 'duty',    label: 'Ca trực',      icon: 'fa-solid fa-moon' },
  { value: 'opd',     label: 'Phòng khám',   icon: 'fa-solid fa-door-open' },
  { value: 'clinic',  label: 'Nội trú',      icon: 'fa-solid fa-hospital' },
  { value: 'consult', label: 'Hội chẩn',     icon: 'fa-solid fa-people-arrows' },
  { value: 'other',   label: 'Khác',         icon: 'fa-solid fa-ellipsis' },
];

export async function renderCaseLoggerView(profileId: string): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  const cases = await getAllCases(profileId);

  const listHtml = cases.length
    ? cases.map(c => {
        const ctxCfg = CONTEXT_OPTIONS.find(o => o.value === c.context);
        return `
        <div class="dsp-list-item dsp-case-card" data-case-id="${c.id}" style="align-items: flex-start;">
          <div class="dsp-list-item-icon" style="background: var(--color-bg); color: var(--color-primary); margin-top: 4px;">
            <i class="${ctxCfg?.icon || 'fa-solid fa-file-medical'}"></i>
          </div>
          <div class="dsp-list-item-body">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.5rem;">
              <div>
                <span class="dsp-badge" style="background: var(--color-bg); color: var(--color-text-muted); margin-right: 0.5rem;">${c.date}</span>
                <span class="dsp-badge dsp-badge--primary">${ctxCfg?.label || c.context}</span>
              </div>
              <button type="button" class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-case" data-id="${c.id}" title="Xóa ca này">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            
            <div class="dsp-list-item-title" style="margin-bottom: 0.5rem; font-size: 1.05rem;">${escapeHtml(c.chiefComplaint)}</div>
            
            ${c.objective ? `
              <div class="dsp-text-sm dsp-text-muted" style="margin-bottom: 0.5rem; background: var(--color-bg); padding: 0.5rem 0.75rem; border-radius: 6px;">
                <i class="fa-solid fa-notes-medical" style="color:var(--color-primary); margin-right:4px;"></i> <strong>Khám & CLS:</strong> ${escapeHtml(c.objective)}
              </div>
            ` : ''}
            
            ${(c.diagnosisText || c.icd10Label) ? `
              <div style="margin-bottom: 0.5rem; background: var(--color-surface-offset); padding: 0.65rem 0.85rem; border-left: 3px solid var(--color-primary); border-radius: 6px; font-size: 0.9rem;">
                <div style="font-weight: 700; color: var(--color-primary); margin-bottom: 2px;">Chẩn đoán xác định:</div>
                <div style="color: var(--color-text);">${escapeHtml(c.diagnosisText || (c.icd10Label + (c.icd10Code ? ` (${c.icd10Code})` : '')))}</div>
              </div>
            ` : ''}

            <div class="dsp-text-sm" style="margin-bottom: 0.25rem;">
              <strong>Xử trí:</strong> ${escapeHtml(c.management)}
            </div>
          </div>
        </div>
        `;
      }).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-stethoscope"></i>
         <p>Chưa có ca bệnh nào. Ghi chú ca lâm sàng đầu tiên →</p>
       </div>`;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'cases')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'cases')}
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-stethoscope"></i> Ca Bệnh</h1>
            <p class="dsp-page-subtitle">Ghi chép ca lâm sàng cá nhân — ẩn danh hoá, chỉ lưu cục bộ.</p>
          </div>

          <!-- Privacy notice -->
          <div class="dsp-alert dsp-alert--info">
            <i class="fa-solid fa-shield-halved"></i>
            <span><strong>Lưu ý bảo mật:</strong> Không nhập họ tên đầy đủ, số CCCD, hoặc mã bệnh nhân thật. Chỉ ghi thông tin lâm sàng cần thiết cho mục đích học tập cá nhân.</span>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Ghi ca mới</h2>
                </div>
                <form class="dsp-case-form" id="dspCaseForm" novalidate>

                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspCaseDate">Ngày <span class="dsp-required">*</span></label>
                      <input class="dsp-input" type="date" id="dspCaseDate"
                        value="${new Date().toISOString().split('T')[0]}" required />
                    </div>
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspCaseContext">Bối cảnh <span class="dsp-required">*</span></label>
                      <select class="dsp-input" id="dspCaseContext" required>
                        ${CONTEXT_OPTIONS.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspCaseComplaint">Triệu chứng / Lý do nhập viện <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspCaseComplaint"
                      placeholder="VD: Ho khạc đờm 5 ngày, sốt, khó thở tăng dần" maxlength="200" required />
                  </div>

                  <div class="dsp-form-group">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                      <label class="dsp-label" for="dspCaseObjective" style="margin:0;">Khám lâm sàng & Cận lâm sàng (Objective)</label>
                      <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnCalculateVitals" style="color:var(--color-primary); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;" title="Tự động trích xuất HA, Mạch, Nhịp thở, Creatinine để tính chỉ số">
                          <i class="fa-solid fa-heart-pulse"></i> Tính từ Sinh hiệu
                        </button>
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnAbgCase" style="color:var(--color-danger); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;" title="Mở Side-Panel phân tích Khí máu động mạch">
                          <i class="fa-solid fa-lungs"></i> Phân tích Khí máu (ABG)
                        </button>
                      </div>
                    </div>
                    <textarea class="dsp-textarea" id="dspCaseObjective"
                      placeholder="Ghi nhận sinh hiệu (HA: 120/80, Mạch: 90, SpO2: 98%), kết quả xét nghiệm (Creatinine: 1.2, pH: 7.25, pCO2: 30, HCO3: 14)..." rows="3"></textarea>
                  </div>

                  <div class="dsp-form-group">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                      <label class="dsp-label" for="dspCaseDiagnosis" style="margin:0;">Chẩn đoán xác định & Tiếp cận</label>
                      <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnClinicalReasoningCoach" style="color:var(--color-success, #10b981); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px; border:1px solid rgba(16,185,129,0.3);" title="Mở Ma trận Chẩn đoán phân biệt & Sơ đồ Tiếp cận">
                          <i class="fa-solid fa-sitemap"></i> Tư Duy Chẩn Đoán (Coach)
                        </button>
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnIcdCase" style="color:var(--color-primary); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;">
                          <i class="fa-solid fa-list-ul"></i> + ICD-10
                        </button>
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnScoreCase" style="color:var(--color-primary); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;">
                          <i class="fa-solid fa-calculator"></i> + Thang điểm
                        </button>
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnSearchEBMCase" style="padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;">
                          <i class="fa-solid fa-book-medical"></i> Tra cứu EBM
                        </button>
                      </div>
                    </div>
                    <textarea class="dsp-textarea" id="dspCaseDiagnosis"
                      placeholder="Ghi nhận đánh giá lâm sàng hoặc chẩn đoán (Ví dụ: Suy tim (I50.0), Đái tháo đường (E11.9))..." rows="3"></textarea>
                  </div>

                  <div class="dsp-form-group">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                      <label class="dsp-label" for="dspCaseMgmt" style="margin:0;">Xử trí đã làm & Kê đơn <span class="dsp-required">*</span></label>
                      <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnDrugIntelligenceCase" style="color:#db2777; padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px; border:1px solid rgba(219,39,119,0.3);" title="Tra cứu dược thư & Kiểm tra tương tác thuốc">
                          <i class="fa-solid fa-pills"></i> Drug Intelligence
                        </button>
                        <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnPrescribeCase" style="color:var(--color-primary); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;">
                          <i class="fa-solid fa-capsules"></i> + Kê đơn
                        </button>
                      </div>
                    </div>
                    <textarea class="dsp-textarea" id="dspCaseMgmt"
                      placeholder="Kháng sinh, hồi sức, thủ thuật, y lệnh..." rows="3" required></textarea>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspCaseOutcome">Kết quả / Outcome</label>
                    <input class="dsp-input" type="text" id="dspCaseOutcome"
                      placeholder="VD: Cải thiện sau 48h, chuyển viện, xuất viện ổn định..." maxlength="200" />
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspCaseLesson">
                      <i class="fa-solid fa-lightbulb" style="color: var(--color-warning)"></i>
                      Bài học rút ra
                    </label>
                    <textarea class="dsp-textarea" id="dspCaseLesson"
                      placeholder="Điều gì học được từ ca này? Sẽ làm gì khác lần sau?..." rows="2"></textarea>
                  </div>

                  <div class="dsp-form-group">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                      <label class="dsp-label" for="dspCaseLink" style="margin:0;">Link tham khảo (tùy chọn)</label>
                      <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnLinkApproachCase" style="color:var(--color-primary); padding:0.4rem 0.85rem; font-size:0.85rem; min-height:38px;">
                        <i class="fa-solid fa-diagram-project"></i> + Gắn Lưu đồ
                      </button>
                    </div>
                    <input class="dsp-input" type="text" id="dspCaseLink"
                      placeholder="VD: #/ebm/guidelines/cap hoặc URL bên ngoài" maxlength="300" />
                  </div>

                  <!-- AI Analysis Output -->
                  <div id="dspCaseAIOutput" style="display: none; padding: 1rem; border: 1px solid #8b5cf6; border-radius: 8px; background: rgba(139, 92, 246, 0.05); margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(139, 92, 246, 0.2); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                      <h4 style="margin:0; color: #8b5cf6;"><i class="fa-solid fa-brain"></i> Phân tích từ AI (RAG)</h4>
                      <button type="button" class="dsp-icon-btn" id="btnHideAIOutput"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div id="dspCaseAIContent" style="font-size: 0.95rem; white-space: pre-wrap; line-height: 1.6;"></div>
                  </div>

                  <div class="dsp-form-actions">
                    <button type="button" class="dsp-btn dsp-btn-outline" id="btnAIAnalyzeCase" style="color: #8b5cf6; border-color: #8b5cf6;">
                      <i class="fa-solid fa-brain"></i> Phân tích AI
                    </button>
                    <div style="flex-grow: 1;"></div>
                    <button type="reset" class="dsp-btn dsp-btn-ghost">
                      <i class="fa-solid fa-rotate-left"></i> Xóa trắng
                    </button>
                    <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSaveCaseBtn">
                      <i class="fa-solid fa-check"></i> Lưu ca bệnh
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right: EBM Panel & List -->
            <div class="dsp-col-side">
              
              <!-- EBM Panel -->
              <div class="dsp-card dsp-mb-6" id="dspEbmPanel" style="display: none;">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title"><i class="fa-solid fa-book-medical dsp-text-primary"></i> Bằng chứng liên quan</h2>
                </div>
                <div class="dsp-card-body dsp-p-4" id="dspEbmContent">
                  <div class="dsp-text-center dsp-text-muted dsp-text-sm dsp-py-4">Đang tra cứu...</div>
                </div>
              </div>

              <!-- Case List -->
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Đã ghi (${cases.length})</h2>
                </div>
                <div class="dsp-list" id="dspCaseList">
                  ${listHtml}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// ─── Controller ───────────────────────────────────────────────────

export function mountCaseLoggerController(profileId: string): void {
  document.getElementById('dspCaseForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = (document.getElementById('dspCaseDate') as HTMLInputElement).value;
    const context = (document.getElementById('dspCaseContext') as HTMLSelectElement).value as CaseContext;
    const chiefComplaint = (document.getElementById('dspCaseComplaint') as HTMLInputElement).value.trim();
    const objective = (document.getElementById('dspCaseObjective') as HTMLTextAreaElement)?.value.trim() || '';
    const diagnosisText = (document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement).value.trim();
    const management = (document.getElementById('dspCaseMgmt') as HTMLTextAreaElement).value.trim();
    const outcome = (document.getElementById('dspCaseOutcome') as HTMLInputElement).value.trim();
    const lesson = (document.getElementById('dspCaseLesson') as HTMLTextAreaElement).value.trim();
    const relatedUrl = (document.getElementById('dspCaseLink') as HTMLInputElement).value.trim();

    if (!chiefComplaint || !management) {
      alert('Vui lòng nhập Triệu chứng và Xử trí.');
      return;
    }

    await saveCase(profileId, {
      date, context, chiefComplaint, objective, diagnosisText,
      management, outcome, lesson, relatedUrl,
    });

    // Reset form
    (document.getElementById('dspCaseForm') as HTMLFormElement).reset();
    (document.getElementById('dspCaseDate') as HTMLInputElement).value = new Date().toISOString().split('T')[0];

    // Refresh list
    window.location.hash = '#/docspace/cases';
  });

  // Picker Tools
  document.getElementById('btnClinicalReasoningCoach')?.addEventListener('click', () => {
    const complaint = (document.getElementById('dspCaseComplaint') as HTMLInputElement)?.value.toLowerCase() || '';
    let defaultKey = 'dau_nguc';
    if (complaint.includes('thở') || complaint.includes('phổi') || complaint.includes('ho')) defaultKey = 'kho_tho';
    else if (complaint.includes('sốt') || complaint.includes('nhiễm')) defaultKey = 'sot_chua_ro_nguyen_nhan';
    clinicalReasoningPanel.open('dspCaseDiagnosis', null, defaultKey);
  });

  document.getElementById('btnIcdCase')?.addEventListener('click', () => {
    icdPicker.open('dspCaseDiagnosis');
  });

  document.getElementById('btnScoreCase')?.addEventListener('click', () => {
    calculatorPicker.open('dspCaseDiagnosis');
  });

  // Kê đơn & Dược lý thông minh
  document.getElementById('btnDrugIntelligenceCase')?.addEventListener('click', () => {
    drugIntelligencePanel.open('dspCaseMgmt');
  });

  document.getElementById('btnPrescribeCase')?.addEventListener('click', () => {
    drugPicker.open('dspCaseMgmt');
  });

  // Gắn Lưu đồ
  document.getElementById('btnLinkApproachCase')?.addEventListener('click', () => {
    resourcePicker.open({
      title: 'Kho Lưu đồ Tiếp cận',
      icon: 'fa-solid fa-diagram-project',
      jsonUrl: 'content/approaches/index.json',
      mode: 'setValue',
      targetInputId: 'dspCaseLink'
    });
  });

  // Hide AI output
  document.getElementById('btnHideAIOutput')?.addEventListener('click', () => {
    const el = document.getElementById('dspCaseAIOutput');
    if (el) el.style.display = 'none';
  });

  // Analyze with AI
  document.getElementById('btnAIAnalyzeCase')?.addEventListener('click', async () => {
    const chiefComplaint = (document.getElementById('dspCaseComplaint') as HTMLInputElement).value.trim();
    const management = (document.getElementById('dspCaseMgmt') as HTMLTextAreaElement).value.trim();
    const caseData = `Lý do/Triệu chứng: ${chiefComplaint}\nQuản lý/Xử trí: ${management}`;

    if (!chiefComplaint && !management) {
      alert('Vui lòng nhập ít nhất Triệu chứng hoặc Xử trí để AI có dữ liệu phân tích.');
      return;
    }

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings) {
      alert('Vui lòng bật AI trong phần Cấu hình AI trước.');
      return;
    }

    const btn = document.getElementById('btnAIAnalyzeCase') as HTMLButtonElement;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tìm kiếm & phân tích...';
    btn.disabled = true;

    try {
      // 1. Tìm kiếm trong RAG Index (chọn top 3 chunks)
      const diagnosisText = (document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement).value.trim();
      const chunks = searchContext(chiefComplaint + " " + management, [diagnosisText], 3);
      
      // 2. Gửi request cho LLM
      const result = await analyzeCase(caseData, profile.aiSettings, chunks);
      
      // 3. Hiển thị
      const outputBox = document.getElementById('dspCaseAIOutput');
      const contentBox = document.getElementById('dspCaseAIContent');
      if (outputBox && contentBox) {
        outputBox.style.display = 'block';
        contentBox.innerHTML = result.replace(/\\n/g, '<br/>').replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      btn.innerHTML = '<i class="fa-solid fa-brain"></i> Phân tích AI';
      btn.disabled = false;
    }
  });

  // AI EBM Auto-search (Debounce 500ms)
  let ebmTimeout: any = null;
  const triggerEbmSearch = () => {
    const complaint = (document.getElementById('dspCaseComplaint') as HTMLInputElement).value.trim().toLowerCase();
    const diagnosis = (document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement).value.trim().toLowerCase();
    
    const combinedText = complaint + ' ' + diagnosis;
    if (combinedText.length < 3) return;

    if (ebmTimeout) clearTimeout(ebmTimeout);
    ebmTimeout = setTimeout(() => {
      const ebmPanel = document.getElementById('dspEbmPanel');
      const ebmContent = document.getElementById('dspEbmContent');
      if (!ebmPanel || !ebmContent) return;

      if (!combinedText.trim()) {
        ebmPanel.style.display = 'none';
        return;
      }

      ebmPanel.style.display = 'block';
      ebmContent.innerHTML = '<div class="dsp-text-center dsp-text-muted dsp-text-sm dsp-py-4"><i class="fa-solid fa-spinner fa-spin"></i> Đang tra cứu EBM...</div>';

      // Tra cứu với Boost từ ICD-10
      // Auto search context (cũ)
      const results = searchContext(combinedText, [], 3);
      
      if (results.length === 0) {
        ebmContent.innerHTML = '<div class="dsp-text-center dsp-text-muted dsp-text-sm dsp-py-4">Không tìm thấy tài liệu phù hợp.</div>';
        return;
      }

      ebmContent.innerHTML = results.map(r => `
        <a href="#/content/${r.file}" target="_blank" class="dsp-list-item dsp-list-item--btn" style="text-decoration: none; padding: 0.75rem; border-radius: 6px; margin-bottom: 0.5rem; background: var(--color-bg);">
          <div class="dsp-list-item-body">
            <div class="dsp-list-item-title" style="font-size: 0.9rem;">${r.title}</div>
            <div class="dsp-text-xs dsp-text-muted dsp-mt-1">${r.heading}</div>
          </div>
        </a>
      `).join('');
    }, 500);
  };

  document.getElementById('dspCaseComplaint')?.addEventListener('input', triggerEbmSearch);
  document.getElementById('dspCaseDiagnosis')?.addEventListener('input', triggerEbmSearch);


  // Nút Tra cứu EBM
  document.getElementById('btnSearchEBMCase')?.addEventListener('click', () => {
    const text = (document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert('Vui lòng nhập chẩn đoán trước khi tra cứu.');
      return;
    }
    ebmBridge.openSearch(text);
  });

  // Delete case
  document.getElementById('dspCaseList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action="delete-case"]') as HTMLElement;
    if (!btn) return;
    if (confirm('Xóa ca bệnh này?')) {
      deleteCase(profileId, btn.getAttribute('data-id') || '');
      window.location.hash = '#/docspace/cases';
    }
  });

  // Tính từ Sinh Hiệu (Auto-Sync Vitals -> Calculators)
  document.getElementById('btnCalculateVitals')?.addEventListener('click', () => {
    const objText = (document.getElementById('dspCaseObjective') as HTMLTextAreaElement)?.value || '';
    if (!objText.trim()) {
      alert('Vui lòng nhập thông tin sinh hiệu hoặc xét nghiệm vào ô Khám lâm sàng & Cận lâm sàng trước.');
      return;
    }

    const calculatedResults = parseVitalsAndCalculate(objText);
    if (calculatedResults.length === 0) {
      alert('Không tìm thấy chỉ số sinh hiệu phù hợp. Định dạng hỗ trợ ví dụ: "HA: 120/80", "Mạch: 90", "Creatinine: 1.2", "Thở: 24"');
      return;
    }

    const diagTextarea = document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement;
    if (diagTextarea) {
      const textToAppend = `\n[Tự động tính toán từ Sinh hiệu]:\n- ${calculatedResults.join('\n- ')}\n`;
      const startPos = diagTextarea.selectionStart;
      const endPos = diagTextarea.selectionEnd;

      diagTextarea.value = diagTextarea.value.substring(0, startPos)
        + textToAppend
        + diagTextarea.value.substring(endPos);

      diagTextarea.focus();
    }
  });

  // Phân tích Khí Máu (ABG Studio Side-Panel)
  document.getElementById('btnAbgCase')?.addEventListener('click', () => {
    const objText = (document.getElementById('dspCaseObjective') as HTMLTextAreaElement)?.value || '';
    abgPicker.open('dspCaseDiagnosis', objText);
  });
}

function parseVitalsAndCalculate(text: string): string[] {
  const results: string[] = [];

  // 1. Huyết áp trung bình (MAP)
  const bpMatch = text.match(/(?:BP|HA|Huyết áp)\s*[:=]?\s*(\d{2,3})\s*[\/\\]\s*(\d{2,3})/i);
  if (bpMatch) {
    const sbp = parseFloat(bpMatch[1]);
    const dbp = parseFloat(bpMatch[2]);
    const map = dbp + (sbp - dbp) / 3;
    results.push(`MAP (Huyết áp trung bình): ${map.toFixed(1)} mmHg (từ HA ${sbp}/${dbp})`);
  }

  // 2. qSOFA
  const rrMatch = text.match(/(?:RR|Nhịp thở|Thở)\s*[:=]?\s*(\d{1,2})/i);
  let qsofaScore = 0;
  const qsofaDetails: string[] = [];
  if (bpMatch && parseFloat(bpMatch[1]) <= 100) {
    qsofaScore++;
    qsofaDetails.push('HA tâm thu ≤ 100 mmHg');
  }
  if (rrMatch && parseFloat(rrMatch[1]) >= 22) {
    qsofaScore++;
    qsofaDetails.push('Nhịp thở ≥ 22 lần/phút');
  }
  if (/tri giác|gcs\s*<\s*15|lơ mơ|mê|lú lẫn/i.test(text)) {
    qsofaScore++;
    qsofaDetails.push('Thay đổi tri giác');
  }
  if (qsofaDetails.length > 0) {
    results.push(`qSOFA: ${qsofaScore}/3 điểm (${qsofaDetails.join(', ')}) → ${qsofaScore >= 2 ? '⚠️ NGUY CƠ SEPSIS CAO' : 'Nguy cơ Sepsis thấp'}`);
  }

  // 3. Creatinine & Gợi ý eGFR
  const crMatch = text.match(/(?:Creatinine|Cr)\s*[:=]?\s*(\d+[\.,]?\d*)/i);
  if (crMatch) {
    const cr = parseFloat(crMatch[1].replace(',', '.'));
    results.push(`Creatinine máu: ${cr} mg/dL (Cần thêm thông số tuổi/cân nặng để tính eGFR chính xác)`);
  }

  return results;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}

