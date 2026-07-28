/**
 * DocSpace — Case Logger View
 * Ghi chép ca lâm sàng cá nhân (ẩn danh hoá)
 */

import { getAllCases, saveCase, deleteCase } from '../storage';
import { CaseRecord, CaseContext } from '../types';
import { renderSidebar, formatDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { analyzeCase } from '../ai/llm-client';
import { searchContext } from '../ai/rag-engine';

const CONTEXT_OPTIONS: { value: CaseContext; label: string; icon: string }[] = [
  { value: 'duty',    label: 'Ca trực',      icon: 'fa-solid fa-moon' },
  { value: 'opd',     label: 'Phòng khám',   icon: 'fa-solid fa-door-open' },
  { value: 'clinic',  label: 'Nội trú',      icon: 'fa-solid fa-hospital' },
  { value: 'consult', label: 'Hội chẩn',     icon: 'fa-solid fa-people-arrows' },
  { value: 'other',   label: 'Khác',         icon: 'fa-solid fa-ellipsis' },
];

export function renderCaseLoggerView(profileId: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const cases = getAllCases(profileId);

  const listHtml = cases.length
    ? cases.map(c => {
        const ctxCfg = CONTEXT_OPTIONS.find(o => o.value === c.context);
        return `
          <div class="dsp-list-item" data-case-id="${c.id}">
            <div class="dsp-list-item-body">
              <div class="dsp-case-meta-row">
                <span class="dsp-badge dsp-badge--context">
                  <i class="${ctxCfg?.icon || 'fa-solid fa-stethoscope'}"></i> ${ctxCfg?.label || c.context}
                </span>
                <span class="dsp-case-date">${formatDate(c.date)}</span>
              </div>
              <div class="dsp-list-item-title">${escapeHtml(c.chiefComplaint)}</div>
              ${c.icd10Code ? `<div class="dsp-case-icd"><code>${escapeHtml(c.icd10Code)}</code> ${escapeHtml(c.icd10Label || '')}</div>` : ''}
              ${c.lesson ? `<div class="dsp-case-lesson"><i class="fa-solid fa-lightbulb"></i> ${escapeHtml(truncate(c.lesson, 80))}</div>` : ''}
            </div>
            <div class="dsp-list-item-actions">
              <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-case" data-id="${c.id}" title="Xóa">
                <i class="fa-solid fa-trash"></i>
              </button>
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

                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspCaseICD10">Mã ICD-10</label>
                      <input class="dsp-input" type="text" id="dspCaseICD10"
                        placeholder="VD: J18.9" maxlength="10" />
                    </div>
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspCaseICD10Label">Chẩn đoán</label>
                      <input class="dsp-input" type="text" id="dspCaseICD10Label"
                        placeholder="VD: Viêm phổi không đặc hiệu" maxlength="120" />
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspCaseMgmt">Xử trí đã làm <span class="dsp-required">*</span></label>
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
                    <label class="dsp-label" for="dspCaseLink">Link tham khảo (tùy chọn)</label>
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

            <!-- Right: List -->
            <div class="dsp-col-side">
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
  document.getElementById('dspCaseForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = (document.getElementById('dspCaseDate') as HTMLInputElement).value;
    const context = (document.getElementById('dspCaseContext') as HTMLSelectElement).value as CaseContext;
    const chiefComplaint = (document.getElementById('dspCaseComplaint') as HTMLInputElement).value.trim();
    const icd10Code = (document.getElementById('dspCaseICD10') as HTMLInputElement).value.trim();
    const icd10Label = (document.getElementById('dspCaseICD10Label') as HTMLInputElement).value.trim();
    const management = (document.getElementById('dspCaseMgmt') as HTMLTextAreaElement).value.trim();
    const outcome = (document.getElementById('dspCaseOutcome') as HTMLInputElement).value.trim();
    const lesson = (document.getElementById('dspCaseLesson') as HTMLTextAreaElement).value.trim();
    const relatedUrl = (document.getElementById('dspCaseLink') as HTMLInputElement).value.trim();

    if (!chiefComplaint || !management) {
      alert('Vui lòng nhập Triệu chứng và Xử trí.');
      return;
    }

    saveCase(profileId, {
      date, context, chiefComplaint, icd10Code, icd10Label,
      management, outcome, lesson, relatedUrl,
    });

    // Reset form
    (document.getElementById('dspCaseForm') as HTMLFormElement).reset();
    (document.getElementById('dspCaseDate') as HTMLInputElement).value = new Date().toISOString().split('T')[0];

    // Refresh list
    window.location.hash = '#/docspace/cases';
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
    const caseData = \`Lý do/Triệu chứng: \${chiefComplaint}\nQuản lý/Xử trí: \${management}\`;

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
      const chunks = searchContext(chiefComplaint + " " + management, 3);
      
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

  // Delete case
  document.getElementById('dspCaseList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action="delete-case"]') as HTMLElement;
    if (!btn) return;
    if (confirm('Xóa ca bệnh này?')) {
      deleteCase(profileId, btn.getAttribute('data-id') || '');
      window.location.hash = '#/docspace/cases';
    }
  });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}
