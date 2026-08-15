/**
 * DocSpace — Personal Protocol Builder View
 * Tạo, quản lý và in phác đồ điều trị cá nhân hóa theo từng chuyên khoa
 */

import { getAllProtocols, saveProtocol, updateProtocol, deleteProtocol, getProtocolById } from '../storage';
import { PersonalProtocol, ProtocolStep } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatDate } from '../docspace-view';
import { getActiveProfile } from '../storage';

export function renderProtocolView(profileId: string, editId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const protocols = getAllProtocols(profileId);
  const editProtocol = editId ? getProtocolById(profileId, editId) : null;

  const listHtml = protocols.length
    ? protocols.map(p => `
        <div class="dsp-list-item dsp-protocol-card" data-protocol-id="${p.id}">
          <div class="dsp-list-item-body">
            <div class="dsp-protocol-header-row">
              <div class="dsp-list-item-title">
                <i class="fa-solid fa-clipboard-list" style="color: var(--color-primary)"></i>
                ${escapeHtml(p.title || 'Phác đồ không tên')}
              </div>
              ${p.specialty ? `<span class="dsp-badge dsp-badge--context">${escapeHtml(p.specialty)}</span>` : ''}
            </div>

            <div class="dsp-protocol-steps-count">
              <span>${p.steps ? p.steps.length : 0} bước điều trị</span>
              ${p.warnings && p.warnings.length > 0 ? ` &nbsp;·&nbsp; <span class="dsp-text-danger"><i class="fa-solid fa-triangle-exclamation"></i> ${p.warnings.length} lưu ý</span>` : ''}
            </div>

            <div class="dsp-list-item-meta" style="margin-top: 0.3rem;">
              <span>Cập nhật ${formatDate(p.updatedAt)}</span>
            </div>
          </div>

          <div class="dsp-list-item-actions">
            <button class="dsp-icon-btn" data-action="view-protocol" data-id="${p.id}" title="Xem & In">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="dsp-icon-btn" data-action="edit-protocol" data-id="${p.id}" title="Sửa">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-protocol" data-id="${p.id}" title="Xóa">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-clipboard-list"></i>
         <p>Chưa có phác đồ cá nhân nào. Soạn phác đồ đầu tiên →</p>
       </div>`;

  const formTitle = editProtocol ? `Chỉnh sửa phác đồ: ${editProtocol.title}` : 'Soạn phác đồ điều trị cá nhân mới';

  const defaultSteps: ProtocolStep[] = editProtocol?.steps?.length
    ? editProtocol.steps
    : [
        { order: 1, text: 'Đánh giá đường thở, hô hấp, tuần hoàn (ABC)' },
        { order: 2, text: 'Thiết lập đường truyền tĩnh mạch & xét nghiệm ban đầu' },
      ];

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'protocol')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'protocol')}
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-clipboard-list"></i> Phác Đồ Cá Nhân</h1>
            <p class="dsp-page-subtitle">Thiết lập và lưu trữ quy trình xử trí điều trị chuẩn hóa theo phong cách lâm sàng của bạn.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Builder Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">${formTitle}</h2>
                  ${editProtocol ? `<button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspClearProtocolEdit"><i class="fa-solid fa-xmark"></i> Hủy sửa</button>` : ''}
                </div>

                <form class="dsp-protocol-form" id="dspProtocolForm" novalidate style="padding: 1.25rem;">
                  <input type="hidden" id="dspProtocolEditId" value="${editProtocol?.id || ''}" />

                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspProtocolTitle">Tên phác đồ điều trị <span class="dsp-required">*</span></label>
                      <input class="dsp-input" type="text" id="dspProtocolTitle"
                        placeholder="VD: Phác đồ Xử trí Sốc Nhiễm Khuẩn (ICU 2026)"
                        value="${escapeHtml(editProtocol?.title || '')}" maxlength="150" required />
                    </div>
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspProtocolSpecialty">Chuyên khoa</label>
                      <input class="dsp-input" type="text" id="dspProtocolSpecialty"
                        placeholder="VD: Cấp cứu / ICU / Tim mạch"
                        value="${escapeHtml(editProtocol?.specialty || '')}" maxlength="60" />
                    </div>
                  </div>

                  <!-- Steps Builder Container -->
                  <div class="dsp-form-group">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                      <label class="dsp-label" style="margin: 0;">Các bước thực hiện <span class="dsp-required">*</span></label>
                      <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspAddStepBtn">
                        <i class="fa-solid fa-plus"></i> Thêm bước
                      </button>
                    </div>

                    <div class="dsp-protocol-steps-list" id="dspProtocolStepsList">
                      ${defaultSteps.map((step, idx) => renderStepInputRow(idx + 1, step.text, !!step.isAlert)).join('')}
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspProtocolWarnings">
                      <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-warning)"></i>
                      Cảnh báo / Chống chỉ định (mỗi dòng 1 lưu ý)
                    </label>
                    <textarea class="dsp-textarea" id="dspProtocolWarnings"
                      placeholder="VD: Không dùng Corticoid nếu chưa dùng kháng sinh&#10;Theo dõi sát huyết áp động mạch..." rows="3">${escapeHtml((editProtocol?.warnings || []).join('\n'))}</textarea>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspProtocolReferences">Nguồn tham khảo (Guidelines / EBM)</label>
                    <textarea class="dsp-textarea" id="dspProtocolReferences"
                      placeholder="VD: Surviving Sepsis Campaign 2021&#10;Khuyến cáo Hội Hồi sức Việt Nam" rows="2">${escapeHtml((editProtocol?.references || []).join('\n'))}</textarea>
                  </div>

                  <div class="dsp-form-actions">
                    <button type="reset" class="dsp-btn dsp-btn-ghost">
                      <i class="fa-solid fa-rotate-left"></i> Xóa trắng
                    </button>
                    <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSaveProtocolBtn">
                      <i class="fa-solid fa-floppy-disk"></i> ${editProtocol ? 'Cập nhật phác đồ' : 'Lưu phác đồ'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right: List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Phác đồ đã lưu (${protocols.length})</h2>
                </div>

                ${protocols.length > 0 ? `
                  <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border);">
                    <input class="dsp-input" type="search" id="dspProtocolSearchInput" placeholder="🔍 Tìm phác đồ..." />
                  </div>
                ` : ''}

                <div class="dsp-list" id="dspProtocolList">
                  ${listHtml}
                </div>
              </div>
            </div>
          </div>

          <!-- Preview & Print Modal -->
          <div class="dsp-modal" id="dspProtocolPreviewModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspProtocolModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" id="dspProtocolModalTitle">Preview Phác đồ</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspPrintProtocolBtn">
                    <i class="fa-solid fa-print"></i> In phác đồ
                  </button>
                  <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspCopyProtocolBtn">
                    <i class="fa-regular fa-copy"></i> Sao chép
                  </button>
                  <button class="dsp-icon-btn" id="dspCloseProtocolPreview"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspProtocolPreviewContent"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

function renderStepInputRow(order: number, text: string = '', isAlert: boolean = false): string {
  return `
    <div class="dsp-step-row" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
      <span class="dsp-step-number" style="font-weight: 700; width: 1.5rem; text-align: center; color: var(--color-primary); flex-shrink: 0;">${order}.</span>
      <input class="dsp-input dsp-step-text-input" type="text" placeholder="Nội dung bước ${order}..." value="${escapeHtml(text)}" style="flex: 1;" required />
      <label class="dsp-step-alert-toggle" style="display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; cursor: pointer; color: var(--color-warning); white-space: nowrap;">
        <input type="checkbox" class="dsp-step-alert-checkbox" ${isAlert ? 'checked' : ''} />
        <i class="fa-solid fa-bell"></i> Ưu tiên
      </label>
      <button type="button" class="dsp-icon-btn dsp-icon-btn--danger dsp-remove-step-btn" title="Xóa bước này">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
  `;
}

export function renderProtocolPreviewHtml(protocol: PersonalProtocol): string {
  return `
    <div class="dsp-protocol-preview-full" id="dspPrintTarget">
      <div class="dsp-sbar-print-header">
        <div class="dsp-sbar-print-logo"><i class="fa-solid fa-hospital"></i> CliniPortal · DocSpace</div>
        <div class="dsp-sbar-print-date">Cập nhật: ${formatDate(protocol.updatedAt)}</div>
      </div>

      <h2 class="dsp-sbar-print-title" style="margin-bottom: 0.25rem;">${escapeHtml(protocol.title)}</h2>
      ${protocol.specialty ? `<div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600; margin-bottom: 1.25rem;">Chuyên khoa: ${escapeHtml(protocol.specialty)}</div>` : ''}

      <div class="dsp-protocol-preview-steps" style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; border-bottom: 2px solid var(--color-primary); padding-bottom: 0.3rem; margin-bottom: 0.75rem;">Quy trình xử trí các bước:</h4>
        <ol class="dsp-protocol-ordered-list" style="padding-left: 1.25rem; margin: 0;">
          ${(protocol.steps || []).map(s => `
            <li style="margin-bottom: 0.6rem; font-size: 0.925rem; line-height: 1.5; ${s.isAlert ? 'color: var(--color-danger); font-weight: 700;' : ''}">
              ${s.isAlert ? '<i class="fa-solid fa-circle-exclamation" style="margin-right: 0.3rem;"></i>' : ''}
              ${escapeHtml(s.text)}
            </li>
          `).join('')}
        </ol>
      </div>

      ${protocol.warnings && protocol.warnings.length > 0 ? `
        <div class="dsp-alert dsp-alert--info" style="border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.08); margin-bottom: 1.25rem;">
          <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-danger);"></i>
          <div>
            <strong style="color: var(--color-danger);">Cảnh báo & Chống chỉ định:</strong>
            <ul style="margin: 0.3rem 0 0 1.2rem; padding: 0;">
              ${protocol.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      ${protocol.references && protocol.references.length > 0 ? `
        <div style="font-size: 0.8rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
          <strong>Tham khảo:</strong> ${protocol.references.map(r => escapeHtml(r)).join(' · ')}
        </div>
      ` : ''}
    </div>
  `;
}

// ─── Controller ───────────────────────────────────────────────────

export function mountProtocolController(profileId: string): void {
  const stepsList = document.getElementById('dspProtocolStepsList');
  const addStepBtn = document.getElementById('dspAddStepBtn');
  const form = document.getElementById('dspProtocolForm') as HTMLFormElement;

  if (!form || !stepsList) return;

  // Add step row
  addStepBtn?.addEventListener('click', () => {
    const currentCount = stepsList.querySelectorAll('.dsp-step-row').length;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderStepInputRow(currentCount + 1, '', false);
    if (tempDiv.firstElementChild) {
      stepsList.appendChild(tempDiv.firstElementChild);
    }
  });

  // Remove step row
  stepsList.addEventListener('click', (e) => {
    const removeBtn = (e.target as HTMLElement).closest('.dsp-remove-step-btn');
    if (!removeBtn) return;
    const rows = stepsList.querySelectorAll('.dsp-step-row');
    if (rows.length <= 1) {
      alert('Phác đồ cần ít nhất 1 bước.');
      return;
    }
    removeBtn.closest('.dsp-step-row')?.remove();
    // Re-index step numbers
    stepsList.querySelectorAll('.dsp-step-row').forEach((row, i) => {
      const numSpan = row.querySelector('.dsp-step-number');
      if (numSpan) numSpan.textContent = `${i + 1}.`;
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = (document.getElementById('dspProtocolEditId') as HTMLInputElement).value;
    const title = (document.getElementById('dspProtocolTitle') as HTMLInputElement).value.trim();
    const specialty = (document.getElementById('dspProtocolSpecialty') as HTMLInputElement).value.trim();
    const warningsText = (document.getElementById('dspProtocolWarnings') as HTMLTextAreaElement).value;
    const refsText = (document.getElementById('dspProtocolReferences') as HTMLTextAreaElement).value;

    if (!title) {
      alert('Vui lòng nhập Tên phác đồ.');
      return;
    }

    // Collect steps
    const stepRows = stepsList.querySelectorAll('.dsp-step-row');
    const steps: ProtocolStep[] = [];
    stepRows.forEach((row, i) => {
      const textInput = row.querySelector('.dsp-step-text-input') as HTMLInputElement;
      const alertCheck = row.querySelector('.dsp-step-alert-checkbox') as HTMLInputElement;
      const text = textInput?.value.trim() || '';
      if (text) {
        steps.push({
          order: i + 1,
          text,
          isAlert: !!alertCheck?.checked,
        });
      }
    });

    if (steps.length === 0) {
      alert('Vui lòng nhập ít nhất 1 bước cho phác đồ.');
      return;
    }

    const warnings = warningsText.split('\n').map(w => w.trim()).filter(Boolean);
    const references = refsText.split('\n').map(r => r.trim()).filter(Boolean);

    if (editId) {
      updateProtocol(profileId, editId, { title, specialty: specialty || undefined, steps, warnings, references });
    } else {
      saveProtocol(profileId, { title, specialty: specialty || undefined, steps, warnings, references });
    }

    window.location.hash = '#/docspace/protocol';
  });

  // Clear edit
  document.getElementById('dspClearProtocolEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/protocol';
  });

  // List actions
  document.getElementById('dspProtocolList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-protocol') {
      if (confirm('Xóa phác đồ này?')) {
        deleteProtocol(profileId, id);
        window.location.hash = '#/docspace/protocol';
      }
    } else if (action === 'edit-protocol') {
      window.location.hash = `#/docspace/protocol?edit=${id}`;
    } else if (action === 'view-protocol') {
      showProtocolPreview(profileId, id);
    }
  });

  // Modal events
  document.getElementById('dspProtocolModalBackdrop')?.addEventListener('click', closeProtocolPreview);
  document.getElementById('dspCloseProtocolPreview')?.addEventListener('click', closeProtocolPreview);

  document.getElementById('dspPrintProtocolBtn')?.addEventListener('click', () => window.print());
  document.getElementById('dspCopyProtocolBtn')?.addEventListener('click', () => {
    const content = document.getElementById('dspProtocolPreviewContent');
    if (content) {
      navigator.clipboard.writeText(content.innerText).then(() => {
        const btn = document.getElementById('dspCopyProtocolBtn');
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép';
          setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 2000);
        }
      });
    }
  });

  // Search filter
  const searchInput = document.getElementById('dspProtocolSearchInput') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll<HTMLElement>('.dsp-protocol-card');
      cards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        card.style.display = !q || text.includes(q) ? 'flex' : 'none';
      });
    });
  }
}

function showProtocolPreview(profileId: string, id: string): void {
  const protocol = getProtocolById(profileId, id);
  if (!protocol) return;
  const modal = document.getElementById('dspProtocolPreviewModal');
  const content = document.getElementById('dspProtocolPreviewContent');
  const title = document.getElementById('dspProtocolModalTitle');
  if (modal && content && title) {
    title.textContent = protocol.title || 'Phác đồ Preview';
    content.innerHTML = renderProtocolPreviewHtml(protocol);
    modal.style.display = 'flex';
  }
}

function closeProtocolPreview(): void {
  const modal = document.getElementById('dspProtocolPreviewModal');
  if (modal) modal.style.display = 'none';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
