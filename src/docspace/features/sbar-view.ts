/**
 * DocSpace — SBAR View
 * Soạn, xem và in báo cáo SBAR (Situation-Background-Assessment-Recommendation)
 */

import { getAllSBARs, saveSBAR, updateSBAR, deleteSBAR, getSBARById } from '../storage';
import { SBARRecord } from '../types';
import { renderSidebar, formatRelativeDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { generateSBAR } from '../ai/llm-client';

const SBAR_STEPS = [
  { key: 'situation',     label: 'S — Situation (Tình huống)',     color: 'var(--dsp-sbar-s)', icon: 'fa-solid fa-triangle-exclamation', placeholder: 'Bệnh nhân X, tuổi Y, giường Z. Lý do liên hệ: ...' },
  { key: 'background',    label: 'B — Background (Bối cảnh)',      color: 'var(--dsp-sbar-b)', icon: 'fa-solid fa-clock-rotate-left',   placeholder: 'Tiền sử, bệnh nền, thuốc đang dùng, lý do nhập viện ban đầu...' },
  { key: 'assessment',    label: 'A — Assessment (Đánh giá)',      color: 'var(--dsp-sbar-a)', icon: 'fa-solid fa-magnifying-glass-chart', placeholder: 'Dấu hiệu sinh tồn, đánh giá lâm sàng hiện tại, vấn đề chính...' },
  { key: 'recommendation',label: 'R — Recommendation (Đề xuất)', color: 'var(--dsp-sbar-r)', icon: 'fa-solid fa-check-circle',         placeholder: 'Đề xuất xử trí, cần hội chẩn, y lệnh bổ sung...' },
];

export async function renderSBARView(profileId: string, editId?: string): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  const sbars = await getAllSBARs(profileId);
  const editRecord = editId ? await getSBARById(profileId, editId) : null;

  const listHtml = sbars.length
    ? sbars.map(s => `
        <div class="dsp-list-item" data-sbar-id="${s.id}">
          <div class="dsp-list-item-body">
            <div class="dsp-list-item-title">
              ${escapeHtml(s.title) || '(Chưa đặt tên)'}
              ${s.isLocked ? '<i class="fa-solid fa-lock dsp-text-primary" title="Đã Khóa & Ký"></i>' : ''}
              ${s.isTampered ? '<i class="fa-solid fa-triangle-exclamation dsp-text-danger" title="Dữ liệu bị can thiệp!"></i>' : ''}
            </div>
            <div class="dsp-list-item-meta">
              ${s.isDraft ? '<span class="dsp-badge dsp-badge--draft">Nháp</span>' : ''}
              <span>${formatRelativeDate(s.updatedAt)}</span>
            </div>
            <div class="dsp-sbar-preview">
              <span class="dsp-sbar-chip dsp-sbar-s">S</span>
              <span class="dsp-sbar-preview-text">${truncate(s.situation, 60)}</span>
            </div>
          </div>
          <div class="dsp-list-item-actions">
            <button class="dsp-icon-btn" style="color:var(--color-primary)" data-action="sandbox-sbar" data-id="${s.id}" title="Đưa vào Sandbox (Mô phỏng)">
              <i class="fa-solid fa-flask"></i>
            </button>
            <button class="dsp-icon-btn" data-action="view-sbar" data-id="${s.id}" title="Xem & In">
              <i class="fa-solid fa-eye"></i>
            </button>
            ${!s.isLocked ? `
              <button class="dsp-icon-btn" data-action="edit-sbar" data-id="${s.id}" title="Chỉnh sửa">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-sbar" data-id="${s.id}" title="Xóa">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : `
              <button class="dsp-icon-btn" disabled title="Bản ghi đã khóa"><i class="fa-solid fa-lock"></i></button>
            `}
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-file-waveform"></i>
         <p>Chưa có SBAR nào. Tạo SBAR đầu tiên →</p>
       </div>`;

  const formTitle = editRecord ? `Chỉnh sửa: ${editRecord.title || 'SBAR'}` : 'Tạo SBAR mới';
  const isLocked = editRecord?.isLocked === true;
  
  const formHtml = `
    <form class="dsp-sbar-form" id="dspSBARForm" novalidate>
      <input type="hidden" id="dspSBAREditId" value="${editRecord?.id || ''}" />
      
      ${isLocked ? `
        <div class="dsp-alert dsp-alert-warning dsp-mb-4" style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px;">
          <i class="fa-solid fa-lock"></i> SBAR này đã được ký số và khóa. Bạn không thể chỉnh sửa.
        </div>
      ` : ''}

      <div class="dsp-form-group">
        <label class="dsp-label" for="dspSBARTitle">Tiêu đề (tùy chọn)</label>
        <input class="dsp-input" type="text" id="dspSBARTitle"
          placeholder="VD: BN suy hô hấp phòng 5 lúc 2h sáng"
          value="${escapeHtml(editRecord?.title || '')}" maxlength="100" ${isLocked ? 'disabled' : ''} />
      </div>

      <!-- AI Assistant -->
      <div class="dsp-card" style="background: var(--color-surface); margin-bottom: 1.5rem; border: 1px dashed #8b5cf6; padding: 1rem; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin-top:0; font-size: 1rem; color: #8b5cf6;"><i class="fa-solid fa-wand-magic-sparkles"></i> Trợ lý AI: Dịch sang SBAR</h3>
          ${editRecord && editRecord.versions && editRecord.versions.length > 0 ? `
            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline" id="btnViewSBARHistory" style="color: #8b5cf6; border-color: #8b5cf6;">
              <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử sinh AI (${editRecord.versions.length})
            </button>
          ` : ''}
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">Dán đoạn ghi chú lộn xộn hoặc ghi âm vào đây, AI sẽ tự động phân loại thành các trường S-B-A-R bên dưới.</p>
        <textarea class="dsp-textarea" id="dspSBAR_RawNotes" rows="3" placeholder="Ví dụ: Bn nam 65t, vô vì đau ngực. Tiền sử THA. Khám thấy tim đều, huyết áp 160/90. Cho làm ECG gấp..."></textarea>
        <div style="text-align: right; margin-top: 0.5rem;">
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnAIGenerateSBAR" style="background-color: #8b5cf6; border-color: #8b5cf6;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích
          </button>
        </div>
      </div>

      ${SBAR_STEPS.map(step => `
        <div class="dsp-sbar-step" style="--step-color: ${step.color}">
          <label class="dsp-sbar-step-label" for="dspSBAR_${step.key}">
            <i class="${step.icon}" style="color: ${step.color}"></i>
            ${step.label}
          </label>
          <textarea class="dsp-textarea" id="dspSBAR_${step.key}"
            placeholder="${step.placeholder}" rows="3" ${isLocked ? 'disabled' : ''}
            >${escapeHtml(editRecord ? (editRecord as any)[step.key] : '')}</textarea>
        </div>
      `).join('')}

      ${!isLocked ? `
      <div class="dsp-form-actions">
        <button type="button" class="dsp-btn dsp-btn-ghost" id="dspSBARSaveDraft">
          <i class="fa-regular fa-floppy-disk"></i> Lưu nháp
        </button>
        <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSBARSave">
          <i class="fa-solid fa-check"></i> Lưu SBAR
        </button>
        ${editRecord ? `
        <button type="button" class="dsp-btn dsp-btn-danger" id="dspSBARLock" style="background:#dc2626; color:#fff; border:none;" title="Ký số bằng Audit Trail và Khóa vĩnh viễn bản ghi này">
          <i class="fa-solid fa-lock"></i> Ký & Khóa
        </button>
        ` : ''}
      </div>
      ` : ''}
    </form>
  `;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'sbar')}
      <main class="dsp-main">
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-file-waveform"></i> SBAR — Trình bệnh nhanh</h1>
            <p class="dsp-page-subtitle">Soạn báo cáo SBAR chuẩn, lưu và in nhanh để bàn giao hoặc hội chẩn.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">${formTitle}</h2>
                  ${editRecord ? `<button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspSBARClearEdit"><i class="fa-solid fa-xmark"></i> Tạo mới</button>` : ''}
                </div>
                ${formHtml}
              </div>
            </div>

            <!-- Right: List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Đã lưu (${sbars.length})</h2>
                </div>
                <div class="dsp-list" id="dspSBARList">
                  ${listHtml}
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Modal -->
          <div class="dsp-modal" id="dspSBARPreviewModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" id="dspPreviewTitle">SBAR Preview</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspPrintBtn">
                    <i class="fa-solid fa-print"></i> In
                  </button>
                  <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspCopyBtn">
                    <i class="fa-regular fa-copy"></i> Sao chép
                  </button>
                  <button class="dsp-icon-btn" id="dspClosePreview"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspSBARPreviewContent"></div>
            </div>
          </div>

          <!-- History Modal -->
          <div class="dsp-modal" id="dspSBARHistoryModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspSBARHistoryModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử AI sinh SBAR</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-icon-btn" id="dspCloseHistory"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspSBARHistoryContent" style="max-height: 60vh; overflow-y: auto;">
                ${editRecord && editRecord.versions ? editRecord.versions.map((v, i) => `
                  <div class="dsp-card dsp-mb-4 dsp-p-4">
                    <div class="dsp-font-bold dsp-mb-2 dsp-text-primary">Bản sinh lúc: ${new Date(v.timestamp).toLocaleString('vi-VN')}</div>
                    <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.9rem; margin: 0; padding: 10px; background: var(--color-bg); border-radius: 4px;">${escapeHtml(v.content)}</pre>
                    <div class="dsp-mt-4 dsp-text-right">
                      <button class="dsp-btn dsp-btn-sm dsp-btn-outline dsp-restore-version-btn" data-content="${encodeURIComponent(v.content)}">Phục hồi bản này</button>
                    </div>
                  </div>
                `).join('') : '<div class="dsp-empty-state"><p>Chưa có lịch sử sinh AI nào.</p></div>'}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// ─── SBAR Preview HTML (for modal & print) ───────────────────────

export function renderSBARPreviewHtml(record: SBARRecord): string {
  return `
    <div class="dsp-sbar-preview-full" id="dspPrintTarget">
      <div class="dsp-sbar-print-header">
        <div class="dsp-sbar-print-logo"><i class="fa-solid fa-hospital"></i> CliniPortal · DocSpace</div>
        <div class="dsp-sbar-print-date">${new Date(record.updatedAt).toLocaleString('vi-VN')}</div>
      </div>
      
      <!-- Trạng thái Legal Shield -->
      <div class="dsp-mb-4 dsp-p-2 dsp-rounded-md dsp-text-sm" style="background: ${record.isTampered ? '#fef2f2' : (record.isLocked ? '#f0fdf4' : '#f8fafc')}; border: 1px solid ${record.isTampered ? '#fca5a5' : (record.isLocked ? '#86efac' : '#e2e8f0')};">
        ${record.isTampered 
          ? '<i class="fa-solid fa-triangle-exclamation dsp-text-danger"></i> <span class="dsp-text-danger dsp-font-bold">CẢNH BÁO: Dữ liệu đã bị can thiệp. Mã băm không khớp.</span>'
          : record.isLocked 
            ? '<i class="fa-solid fa-shield-halved" style="color:#16a34a"></i> <span style="color:#16a34a" class="dsp-font-bold">Hồ sơ đã được Khóa & Ký số an toàn.</span>'
            : '<i class="fa-solid fa-circle-info" style="color:#64748b"></i> <span style="color:#64748b">Hồ sơ này chưa được khóa.</span>'
        }
      </div>

      <h2 class="dsp-sbar-print-title">${escapeHtml(record.title || 'Báo cáo SBAR')}</h2>
      ${SBAR_STEPS.map(step => `
        <div class="dsp-sbar-block" style="--step-color: ${step.color}">
          <div class="dsp-sbar-block-label">
            <i class="${step.icon}"></i> ${step.label}
          </div>
          <div class="dsp-sbar-block-content">${escapeHtml((record as any)[step.key] || '').replace(/\n/g, '<br>')}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Controller (event binding) ──────────────────────────────────

export function mountSBARController(profileId: string): void {
  const form = document.getElementById('dspSBARForm') as HTMLFormElement;
  if (!form) return;

  // AI SBAR Generation
  document.getElementById('btnAIGenerateSBAR')?.addEventListener('click', async () => {
    const rawNotes = (document.getElementById('dspSBAR_RawNotes') as HTMLTextAreaElement)?.value.trim();
    if (!rawNotes) return;
    
    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings) {
      alert('Vui lòng cấu hình và bật AI trong Cài đặt AI trước.');
      return;
    }

    const btn = document.getElementById('btnAIGenerateSBAR') as HTMLButtonElement;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...';
    btn.disabled = true;

    try {
      const result = await generateSBAR(rawNotes, profile.aiSettings);
      
      const situationStr = result.situation || '';
      const backgroundStr = result.background || '';
      const assessmentStr = result.assessment || '';
      const recommendationStr = result.recommendation || '';

      (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement).value = situationStr;
      (document.getElementById('dspSBAR_background') as HTMLTextAreaElement).value = backgroundStr;
      (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement).value = assessmentStr;
      (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement).value = recommendationStr;
      
      // Save version if editId exists
      const editId = (document.getElementById('dspSBAREditId') as HTMLInputElement)?.value;
      if (editId) {
        const record = await getSBARById(profileId, editId);
        if (record) {
          const versions = record.versions || [];
          const content = `S: ${situationStr}\nB: ${backgroundStr}\nA: ${assessmentStr}\nR: ${recommendationStr}`;
          versions.unshift({ timestamp: new Date().toISOString(), content });
          if (versions.length > 5) versions.pop();
          await updateSBAR(profileId, editId, { versions });
        }
      }
      
    } catch (err: any) {
      alert(err.message);
    } finally {
      btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích';
      btn.disabled = false;
    }
  });

  // View History
  document.getElementById('btnViewSBARHistory')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'flex';
  });

  document.getElementById('dspCloseHistory')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  document.getElementById('dspSBARHistoryModalBackdrop')?.addEventListener('click', () => {
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  // Restore version
  document.getElementById('dspSBARHistoryContent')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.dsp-restore-version-btn') as HTMLElement;
    if (!btn) return;
    const content = decodeURIComponent(btn.getAttribute('data-content') || '');
    if (!content) return;
    
    const lines = content.split('\n');
    let s = '', b = '', a = '', r = '';
    lines.forEach(line => {
      if (line.startsWith('S: ')) s = line.substring(3);
      else if (line.startsWith('B: ')) b = line.substring(3);
      else if (line.startsWith('A: ')) a = line.substring(3);
      else if (line.startsWith('R: ')) r = line.substring(3);
    });

    (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement).value = s;
    (document.getElementById('dspSBAR_background') as HTMLTextAreaElement).value = b;
    (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement).value = a;
    (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement).value = r;
    
    const modal = document.getElementById('dspSBARHistoryModal');
    if (modal) modal.style.display = 'none';
  });

  // Save SBAR
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitSBAR(profileId, false);
  });

  // Save Draft
  document.getElementById('dspSBARSaveDraft')?.addEventListener('click', async () => {
    await submitSBAR(profileId, true);
  });

  // Lock
  document.getElementById('dspSBARLock')?.addEventListener('click', async () => {
    if (confirm('Sau khi khóa, bạn sẽ không thể chỉnh sửa SBAR này nữa. Hệ thống sẽ sinh mã băm lưu vết. Tiếp tục?')) {
      await submitSBAR(profileId, false, true);
    }
  });

  // Delete
  document.getElementById('dspSBARList')?.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('[data-action]') as HTMLButtonElement;
    if (!btn) return;
    if (btn.disabled) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-sbar') {
      if (confirm('Xóa SBAR này?')) {
        deleteSBAR(profileId, id);
        window.location.hash = '#/docspace/sbar';
      }
    } else if (action === 'sandbox-sbar') {
      window.location.hash = `#/docspace/sandbox?source=sbar&id=${id}`;
    } else if (action === 'view-sbar') {
      await showSBARPreview(profileId, id);
    } else if (action === 'edit-sbar') {
      window.location.hash = `#/docspace/sbar?edit=${id}`;
    }
  });

  // Clear edit
  document.getElementById('dspSBARClearEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/sbar';
  });

  // Modal close
  document.getElementById('dspSBARModalBackdrop')?.addEventListener('click', closePreview);
  document.getElementById('dspClosePreview')?.addEventListener('click', closePreview);

  // Print
  document.getElementById('dspPrintBtn')?.addEventListener('click', () => {
    window.print();
  });

  // Copy
  document.getElementById('dspCopyBtn')?.addEventListener('click', () => {
    const content = document.getElementById('dspSBARPreviewContent');
    if (content) {
      navigator.clipboard.writeText(content.innerText).then(() => {
        const btn = document.getElementById('dspCopyBtn');
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép'; setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 2000); }
      });
    }
  });
}

async function submitSBAR(profileId: string, isDraft: boolean, isLockAction = false): Promise<void> {
  const editId = (document.getElementById('dspSBAREditId') as HTMLInputElement)?.value;
  const title = (document.getElementById('dspSBARTitle') as HTMLInputElement)?.value || '';
  const situation = (document.getElementById('dspSBAR_situation') as HTMLTextAreaElement)?.value || '';
  const background = (document.getElementById('dspSBAR_background') as HTMLTextAreaElement)?.value || '';
  const assessment = (document.getElementById('dspSBAR_assessment') as HTMLTextAreaElement)?.value || '';
  const recommendation = (document.getElementById('dspSBAR_recommendation') as HTMLTextAreaElement)?.value || '';

  if (!situation.trim() && !isDraft) {
    alert('Vui lòng nhập ít nhất phần Situation (S).');
    return;
  }

  if (editId) {
    await updateSBAR(profileId, editId, { title, situation, background, assessment, recommendation, isDraft, isLocked: isLockAction }, isLockAction);
  } else {
    await saveSBAR(profileId, { title, situation, background, assessment, recommendation, isDraft });
  }

  window.location.hash = '#/docspace/sbar';
}

async function showSBARPreview(profileId: string, id: string): Promise<void> {
  const record = await getSBARById(profileId, id);
  if (!record) return;
  const modal = document.getElementById('dspSBARPreviewModal');
  const content = document.getElementById('dspSBARPreviewContent');
  const title = document.getElementById('dspPreviewTitle');
  if (modal && content && title) {
    title.textContent = record.title || 'SBAR Preview';
    content.innerHTML = renderSBARPreviewHtml(record);
    modal.style.display = 'flex';
  }
}

function closePreview(): void {
  const modal = document.getElementById('dspSBARPreviewModal');
  if (modal) modal.style.display = 'none';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}
