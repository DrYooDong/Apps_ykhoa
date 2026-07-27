/**
 * DocSpace — SBAR View
 * Soạn, xem và in báo cáo SBAR (Situation-Background-Assessment-Recommendation)
 */

import { getAllSBARs, saveSBAR, updateSBAR, deleteSBAR, getSBARById } from '../storage';
import { SBARRecord } from '../types';
import { renderSidebar, formatRelativeDate } from '../docspace-view';
import { getActiveProfile } from '../storage';

const SBAR_STEPS = [
  { key: 'situation',     label: 'S — Situation (Tình huống)',     color: 'var(--dsp-sbar-s)', icon: 'fa-solid fa-triangle-exclamation', placeholder: 'Bệnh nhân X, tuổi Y, giường Z. Lý do liên hệ: ...' },
  { key: 'background',    label: 'B — Background (Bối cảnh)',      color: 'var(--dsp-sbar-b)', icon: 'fa-solid fa-clock-rotate-left',   placeholder: 'Tiền sử, bệnh nền, thuốc đang dùng, lý do nhập viện ban đầu...' },
  { key: 'assessment',    label: 'A — Assessment (Đánh giá)',      color: 'var(--dsp-sbar-a)', icon: 'fa-solid fa-magnifying-glass-chart', placeholder: 'Dấu hiệu sinh tồn, đánh giá lâm sàng hiện tại, vấn đề chính...' },
  { key: 'recommendation',label: 'R — Recommendation (Đề xuất)', color: 'var(--dsp-sbar-r)', icon: 'fa-solid fa-check-circle',         placeholder: 'Đề xuất xử trí, cần hội chẩn, y lệnh bổ sung...' },
];

export function renderSBARView(profileId: string, editId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const sbars = getAllSBARs(profileId);
  const editRecord = editId ? getSBARById(profileId, editId) : null;

  const listHtml = sbars.length
    ? sbars.map(s => `
        <div class="dsp-list-item" data-sbar-id="${s.id}">
          <div class="dsp-list-item-body">
            <div class="dsp-list-item-title">${escapeHtml(s.title) || '(Chưa đặt tên)'}</div>
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
            <button class="dsp-icon-btn" data-action="view-sbar" data-id="${s.id}" title="Xem & In">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="dsp-icon-btn" data-action="edit-sbar" data-id="${s.id}" title="Chỉnh sửa">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-sbar" data-id="${s.id}" title="Xóa">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-file-waveform"></i>
         <p>Chưa có SBAR nào. Tạo SBAR đầu tiên →</p>
       </div>`;

  const formTitle = editRecord ? `Chỉnh sửa: ${editRecord.title || 'SBAR'}` : 'Tạo SBAR mới';

  const formHtml = `
    <form class="dsp-sbar-form" id="dspSBARForm" novalidate>
      <input type="hidden" id="dspSBAREditId" value="${editRecord?.id || ''}" />

      <div class="dsp-form-group">
        <label class="dsp-label" for="dspSBARTitle">Tiêu đề (tùy chọn)</label>
        <input class="dsp-input" type="text" id="dspSBARTitle"
          placeholder="VD: BN suy hô hấp phòng 5 lúc 2h sáng"
          value="${escapeHtml(editRecord?.title || '')}" maxlength="100" />
      </div>

      ${SBAR_STEPS.map(step => `
        <div class="dsp-sbar-step" style="--step-color: ${step.color}">
          <label class="dsp-sbar-step-label" for="dspSBAR_${step.key}">
            <i class="${step.icon}" style="color: ${step.color}"></i>
            ${step.label}
          </label>
          <textarea class="dsp-textarea" id="dspSBAR_${step.key}"
            placeholder="${step.placeholder}" rows="3"
            >${escapeHtml(editRecord ? (editRecord as any)[step.key] : '')}</textarea>
        </div>
      `).join('')}

      <div class="dsp-form-actions">
        <button type="button" class="dsp-btn dsp-btn-ghost" id="dspSBARSaveDraft">
          <i class="fa-regular fa-floppy-disk"></i> Lưu nháp
        </button>
        <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSBARSave">
          <i class="fa-solid fa-check"></i> Lưu SBAR
        </button>
      </div>
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

  // Save SBAR
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitSBAR(profileId, false);
  });

  // Save Draft
  document.getElementById('dspSBARSaveDraft')?.addEventListener('click', () => {
    submitSBAR(profileId, true);
  });

  // Delete
  document.getElementById('dspSBARList')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-sbar') {
      if (confirm('Xóa SBAR này?')) {
        deleteSBAR(profileId, id);
        window.location.hash = '#/docspace/sbar';
      }
    } else if (action === 'view-sbar') {
      showSBARPreview(profileId, id);
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

function submitSBAR(profileId: string, isDraft: boolean): void {
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
    updateSBAR(profileId, editId, { title, situation, background, assessment, recommendation, isDraft });
  } else {
    saveSBAR(profileId, { title, situation, background, assessment, recommendation, isDraft });
  }

  window.location.hash = '#/docspace/sbar';
}

function showSBARPreview(profileId: string, id: string): void {
  const record = getSBARById(profileId, id);
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
