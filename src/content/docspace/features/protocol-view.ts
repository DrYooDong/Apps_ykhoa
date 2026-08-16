/**
 * DocSpace — Master Clinical Protocols Vault & Studio
 * Kho Phác Đồ Điều Trị Toàn Năng & Trình Soạn Thảo Phác Đồ Cá Nhân Hóa
 */

import { 
  getAllProtocols, saveProtocol, updateProtocol, deleteProtocol, getProtocolById,
  getMasterProtocols, getMasterProtocolById, cloneMasterProtocol
} from '../storage';
import { PersonalProtocol, ProtocolStep } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { PROTOCOL_SPECIALTIES } from '../data/master-protocols-data';

export function renderProtocolView(profileId: string, editId?: string, activeTab: 'master' | 'personal' = 'master'): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const personalProtocols = getAllProtocols(profileId);
  const masterProtocols = getMasterProtocols();
  const editProtocol = editId ? getProtocolById(profileId, editId) : null;

  // Nếu đang có editId thì tự động chuyển sang tab personal
  const currentTab = editId ? 'personal' : activeTab;

  // Render Danh sách Phác đồ Mẫu (Master Library Grid)
  const masterListHtml = masterProtocols.map(p => {
    const specInfo = PROTOCOL_SPECIALTIES.find(s => s.key === p.specialtyKey) || PROTOCOL_SPECIALTIES[0]!;
    return `
      <div class="dsp-master-proto-card" data-specialty="${p.specialtyKey || 'other'}" data-proto-id="${p.id}">
        <div class="dsp-master-proto-head">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span class="dsp-badge" style="background:${specInfo.bg}; color:${specInfo.color}; font-weight:700; border:1px solid ${specInfo.color}33;">
              <i class="${specInfo.icon}"></i> ${escapeHtml(p.specialty || specInfo.name)}
            </span>
            ${p.icdCodes && p.icdCodes.length > 0 ? `
              <span class="dsp-badge" style="background:var(--color-bg); color:var(--color-text-muted); font-size:11px;">
                ICD: ${p.icdCodes.join(', ')}
              </span>
            ` : ''}
          </div>
          <span class="dsp-badge dsp-badge--info" style="font-size:10px; font-weight:700;">CHỨNG CỨ EBM</span>
        </div>

        <h3 class="dsp-master-proto-title">${escapeHtml(p.title)}</h3>
        <p class="dsp-master-proto-summary">${escapeHtml(p.summary || '')}</p>

        <div class="dsp-master-proto-meta">
          <span><i class="fa-solid fa-list-ol" style="color:var(--color-primary);"></i> ${p.steps.length} bước xử trí</span>
          ${p.warnings && p.warnings.length > 0 ? `
            <span style="color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> ${p.warnings.length} lưu ý</span>
          ` : ''}
        </div>

        <div class="dsp-master-proto-actions">
          <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm js-view-master-proto" data-id="${p.id}" style="flex:1;">
            <i class="fa-solid fa-eye"></i> Xem & Áp dụng
          </button>
          <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-clone-master-proto" data-id="${p.id}" title="Nhân bản phác đồ này về kho cá nhân để tùy biến">
            <i class="fa-solid fa-copy"></i> Nhân bản
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Render Danh sách Phác đồ Cá nhân (Personal List)
  const personalListHtml = personalProtocols.length
    ? personalProtocols.map(p => `
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
            <button class="dsp-icon-btn" data-action="view-personal-protocol" data-id="${p.id}" title="Xem & In">
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
         <p>Chưa có phác đồ cá nhân nào. Hãy nhân bản từ Kho Phác Đồ Mẫu hoặc tự soạn phác đồ mới →</p>
       </div>`;

  const formTitle = editProtocol ? `Chỉnh sửa phác đồ: ${editProtocol.title}` : 'Soạn phác đồ điều trị cá nhân mới';

  const defaultSteps: ProtocolStep[] = editProtocol?.steps?.length
    ? editProtocol.steps
    : [
        { order: 1, title: 'Bước 1: Đánh giá ban đầu', text: 'Đánh giá đường thở, hô hấp, tuần hoàn (ABC) & sinh hiệu' },
        { order: 2, title: 'Bước 2: Thiết lập xử trí', text: 'Thiết lập đường truyền tĩnh mạch & các chỉ định cận lâm sàng khẩn' },
      ];

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'protocol')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'protocol')}
        <div class="dsp-page-content">

          <!-- Header & Multi-Tab Selector -->
          <div class="dsp-page-header">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
              <div>
                <h1 class="dsp-page-title"><i class="fa-solid fa-book-medical" style="color:var(--color-primary);"></i> Kho Phác Đồ Điều Trị Lâm Sàng</h1>
                <p class="dsp-page-subtitle">Thư viện phác đồ thực chiến chuẩn Bộ Y tế & EBM quốc tế, kết hợp trình soạn thảo tùy biến cá nhân hóa.</p>
              </div>
              
              <!-- Tab Switcher -->
              <div class="dsp-proto-tab-switcher">
                <button type="button" class="dsp-proto-tab-btn ${currentTab === 'master' ? 'is-active' : ''}" id="btnTabMaster">
                  <i class="fa-solid fa-layer-group"></i> Kho Phác Đồ Mẫu (${masterProtocols.length})
                </button>
                <button type="button" class="dsp-proto-tab-btn ${currentTab === 'personal' ? 'is-active' : ''}" id="btnTabPersonal">
                  <i class="fa-solid fa-user-doctor"></i> Phác Đồ Của Tôi (${personalProtocols.length})
                </button>
                <a href="#/docspace/living-protocols" class="dsp-proto-tab-btn" style="text-decoration:none;">
                  <i class="fa-solid fa-network-wired" style="color:var(--dsp-violet, #8b5cf6);"></i> Phác Đồ Động (AI Lab)
                </a>
              </div>
            </div>
          </div>

          <!-- TAB 1: KHO PHÁC ĐỒ MẪU THỰC CHIẾN (MASTER VAULT) -->
          <div id="panelTabMaster" style="display: ${currentTab === 'master' ? 'block' : 'none'};">
            <!-- Filter Bar & Search -->
            <div class="dsp-master-filter-wrap">
              <div class="dsp-specialty-pills">
                ${PROTOCOL_SPECIALTIES.map(s => `
                  <button type="button" class="dsp-specialty-pill ${s.key === 'all' ? 'is-active' : ''}" data-specialty-filter="${s.key}">
                    <i class="${s.icon}" style="color:${s.color};"></i> ${s.name}
                  </button>
                `).join('')}
              </div>

              <div class="dsp-master-search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" id="inputMasterSearch" placeholder="Tìm kiếm nhanh phác đồ theo tên bệnh, thuốc, ICD-10 (VD: Sốc nhiễm khuẩn, STEMI, DKA, Hen...)" />
              </div>
            </div>

            <!-- Master Cards Grid -->
            <div class="dsp-master-grid" id="dspMasterGrid">
              ${masterListHtml}
            </div>
          </div>

          <!-- TAB 2: PHÁC ĐỒ CÁ NHÂN HÓA CỦA TÔI (MY PERSONAL PROTOCOLS) -->
          <div id="panelTabPersonal" style="display: ${currentTab === 'personal' ? 'block' : 'none'};">
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
                          placeholder="VD: Phác đồ Xử trí Sốc Nhiễm Khuẩn (Khoa ICU)"
                          value="${escapeHtml(editProtocol?.title || '')}" maxlength="150" required />
                      </div>
                      <div class="dsp-form-group">
                        <label class="dsp-label" for="dspProtocolSpecialty">Chuyên khoa</label>
                        <input class="dsp-input" type="text" id="dspProtocolSpecialty"
                          placeholder="VD: Cấp cứu / ICU / Tim mạch / Hô hấp"
                          value="${escapeHtml(editProtocol?.specialty || '')}" maxlength="60" />
                      </div>
                    </div>

                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspProtocolSummary">Tóm tắt chỉ định / Đối tượng áp dụng</label>
                      <input class="dsp-input" type="text" id="dspProtocolSummary"
                        placeholder="VD: Áp dụng cho bệnh nhân sốc nhiễm khuẩn có MAP < 65 mmHg sau bù dịch"
                        value="${escapeHtml(editProtocol?.summary || '')}" maxlength="250" />
                    </div>

                    <!-- Steps Builder Container -->
                    <div class="dsp-form-group">
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                        <label class="dsp-label" style="margin: 0;">Các bước xử trí & Liều thuốc <span class="dsp-required">*</span></label>
                        <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspAddStepBtn">
                          <i class="fa-solid fa-plus"></i> Thêm bước
                        </button>
                      </div>

                      <div class="dsp-protocol-steps-list" id="dspProtocolStepsList">
                        ${defaultSteps.map((step, idx) => renderStepInputRow(idx + 1, step.text, !!step.isAlert, step.title, step.timeframe)).join('')}
                      </div>
                    </div>

                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspProtocolWarnings">
                        <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-warning)"></i>
                        Cảnh báo / Chống chỉ định / Red Flags (mỗi dòng 1 lưu ý)
                      </label>
                      <textarea class="dsp-textarea" id="dspProtocolWarnings"
                        placeholder="VD: Không dùng Corticoid nếu chưa dùng kháng sinh&#10;Theo dõi sát huyết áp động mạch..." rows="3">${escapeHtml((editProtocol?.warnings || []).join('\n'))}</textarea>
                    </div>

                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspProtocolReferences">Nguồn tham khảo (Guidelines / EBM / Bộ Y Tế)</label>
                      <textarea class="dsp-textarea" id="dspProtocolReferences"
                        placeholder="VD: Surviving Sepsis Campaign 2021&#10;Quyết định 4800/QĐ-BYT" rows="2">${escapeHtml((editProtocol?.references || []).join('\n'))}</textarea>
                    </div>

                    <div class="dsp-form-actions">
                      <button type="reset" class="dsp-btn dsp-btn-ghost">
                        <i class="fa-solid fa-rotate-left"></i> Xóa trắng
                      </button>
                      <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSaveProtocolBtn">
                        <i class="fa-solid fa-floppy-disk"></i> ${editProtocol ? 'Cập nhật phác đồ' : 'Lưu vào phác đồ của tôi'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Right: Personal Protocol List -->
              <div class="dsp-col-side">
                <div class="dsp-card">
                  <div class="dsp-card-header">
                    <h2 class="dsp-card-title">Phác đồ cá nhân (${personalProtocols.length})</h2>
                  </div>

                  <div style="padding: 0.75rem 1rem 0;">
                    <input class="dsp-input dsp-input--sm" type="search" id="dspProtocolSearchInput"
                      placeholder="Tìm phác đồ cá nhân..." />
                  </div>

                  <div class="dsp-protocol-list" id="dspProtocolList" style="padding: 0.75rem 1rem 1rem;">
                    ${personalListHtml}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- MODAL XEM CHI TIẾT & IN PHÁC ĐỒ (PRINTABLE POCKET GUIDE) -->
    <div class="dsp-modal-backdrop" id="dspProtocolPreviewModal" style="display:none;">
      <div class="dsp-modal-box dsp-modal-box--lg" style="max-width:850px;">
        <div class="dsp-modal-header" style="border-bottom:1px solid var(--color-border); padding-bottom:1rem;">
          <h2 class="dsp-modal-title" id="dspProtocolModalTitle">
            <i class="fa-solid fa-book-medical" style="color:var(--color-primary);"></i> Chi tiết Phác Đồ
          </h2>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspApplyToSoapBtn" title="Áp dụng các bước điều trị này vào SOAP Plan">
              <i class="fa-solid fa-notes-medical"></i> Áp dụng vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspPrintProtocolBtn">
              <i class="fa-solid fa-print"></i> In thẻ bỏ túi
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspCopyProtocolBtn">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
            <button class="dsp-modal-close" id="dspCloseProtocolPreview">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div class="dsp-modal-body" id="dspProtocolPreviewContent" style="padding: 1.5rem 0; max-height:75vh; overflow-y:auto;">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>
  `;
}

function renderStepInputRow(order: number, text = '', isAlert = false, title = '', timeframe = ''): string {
  return `
    <div class="dsp-step-row" data-order="${order}">
      <div class="dsp-step-drag-handle" title="Kéo để đổi thứ tự">
        <i class="fa-solid fa-grip-vertical"></i>
      </div>
      <div class="dsp-step-order">${order}</div>
      <div style="flex:1; display:flex; flex-direction:column; gap:0.35rem;">
        <div style="display:flex; gap:0.5rem;">
          <input class="dsp-input dsp-input--sm dsp-step-title-input" type="text"
            placeholder="Tiêu đề bước (VD: Bước ${order}: Bù dịch)"
            value="${escapeHtml(title)}" style="font-weight:700; flex:2;" />
          <input class="dsp-input dsp-input--sm dsp-step-timeframe-input" type="text"
            placeholder="Thời gian (VD: Trong 15-30 phút)"
            value="${escapeHtml(timeframe)}" style="flex:1; font-size:11px;" />
        </div>
        <textarea class="dsp-textarea dsp-step-text-input" rows="2"
          placeholder="Nội dung thực hiện, chỉ định thuốc, liều lượng, đường dùng..."
          required style="font-size:12px;">${escapeHtml(text)}</textarea>
      </div>
      <div class="dsp-step-controls">
        <label class="dsp-step-alert-toggle" title="Đánh dấu bước khẩn cấp / quan trọng">
          <input type="checkbox" class="dsp-step-alert-checkbox" ${isAlert ? 'checked' : ''} />
          <i class="fa-solid fa-triangle-exclamation"></i>
        </label>
        <button type="button" class="dsp-icon-btn dsp-icon-btn--danger dsp-remove-step-btn" title="Xóa bước này">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  `;
}

export function renderProtocolPreviewHtml(p: PersonalProtocol): string {
  const steps = p.steps || [];
  const warnings = p.warnings || [];
  const references = p.references || [];

  return `
    <div class="dsp-protocol-preview-doc" style="color:var(--color-text); line-height:1.6;">
      <div style="border-bottom:2px solid var(--color-primary); padding-bottom:1rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem;">
          <div>
            <span class="dsp-badge dsp-badge--info" style="margin-bottom:0.5rem;">${escapeHtml(p.specialty || 'Lâm sàng')}</span>
            <h1 style="font-size:1.4rem; font-weight:800; margin:0.25rem 0 0.5rem; color:var(--color-text);">${escapeHtml(p.title)}</h1>
            ${p.summary ? `<p style="margin:0; font-size:0.9rem; color:var(--color-text-muted);">${escapeHtml(p.summary)}</p>` : ''}
          </div>
          ${p.icdCodes && p.icdCodes.length > 0 ? `
            <div style="text-align:right;">
              <span style="font-size:11px; font-weight:700; color:var(--color-text-muted);">MÃ ICD-10:</span>
              <div style="font-weight:700; color:var(--color-primary); font-size:13px;">${p.icdCodes.join(', ')}</div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Timeline Steps Flow -->
      <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
        <i class="fa-solid fa-list-check" style="color:var(--color-primary);"></i> CÁC BƯỚC XỬ TRÍ THỜI GIAN THỰC
      </h3>

      <div class="dsp-proto-timeline-wrap" style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
        ${steps.map((s, idx) => `
          <div style="display:flex; gap:1rem; align-items:flex-start; background:var(--color-surface); border:1px solid ${s.isAlert ? 'rgba(239,68,68,0.3)' : 'var(--color-border)'}; border-left:4px solid ${s.isAlert ? '#ef4444' : 'var(--color-primary)'}; border-radius:8px; padding:1rem;">
            <div style="width:28px; height:28px; border-radius:50%; background:${s.isAlert ? '#ef4444' : 'var(--color-primary)'}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; flex-shrink:0;">
              ${s.order || idx + 1}
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.5rem;">
                <h4 style="margin:0; font-size:0.95rem; font-weight:700; color:${s.isAlert ? '#ef4444' : 'var(--color-text)'};">
                  ${escapeHtml(s.title || `Bước ${s.order || idx + 1}`)}
                </h4>
                ${s.timeframe ? `
                  <span class="dsp-badge" style="background:rgba(2,132,199,0.1); color:var(--color-primary); font-size:11px; font-weight:700;">
                    <i class="fa-regular fa-clock"></i> ${escapeHtml(s.timeframe)}
                  </span>
                ` : ''}
              </div>
              <div style="font-size:0.9rem; white-space:pre-line; color:var(--color-text);">${escapeHtml(s.text)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Warnings & Red Flags -->
      ${warnings.length > 0 ? `
        <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:8px; padding:1rem; margin-bottom:1.5rem;">
          <h4 style="color:#ef4444; margin:0 0 0.5rem; font-size:0.95rem; display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO ĐỎ & CHỐNG CHỈ ĐỊNH (RED FLAGS)
          </h4>
          <ul style="margin:0; padding-left:1.25rem; font-size:0.88rem; color:var(--color-text);">
            ${warnings.map(w => `<li style="margin-bottom:0.25rem;">${escapeHtml(w)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- References -->
      ${references.length > 0 ? `
        <div style="font-size:0.8rem; color:var(--color-text-muted); border-top:1px dashed var(--color-border); padding-top:0.75rem;">
          <strong>Tài liệu tham khảo & Khuyến cáo:</strong>
          <ul style="margin:0.25rem 0 0; padding-left:1.25rem;">
            ${references.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

export function mountProtocolController(profileId: string): void {
  // 1. Chuyển Tab: Kho Phác Đồ Mẫu vs Phác Đồ Của Tôi
  const btnTabMaster = document.getElementById('btnTabMaster');
  const btnTabPersonal = document.getElementById('btnTabPersonal');
  const panelTabMaster = document.getElementById('panelTabMaster');
  const panelTabPersonal = document.getElementById('panelTabPersonal');

  btnTabMaster?.addEventListener('click', () => {
    btnTabMaster.classList.add('is-active');
    btnTabPersonal?.classList.remove('is-active');
    if (panelTabMaster) panelTabMaster.style.display = 'block';
    if (panelTabPersonal) panelTabPersonal.style.display = 'none';
  });

  btnTabPersonal?.addEventListener('click', () => {
    btnTabPersonal.classList.add('is-active');
    btnTabMaster?.classList.remove('is-active');
    if (panelTabPersonal) panelTabPersonal.style.display = 'block';
    if (panelTabMaster) panelTabMaster.style.display = 'none';
  });

  // 2. Bộ lọc chuyên khoa cho Kho Phác Đồ Mẫu
  document.querySelectorAll('.dsp-specialty-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.dsp-specialty-pill').forEach(p => p.classList.remove('is-active'));
      const targetPill = e.currentTarget as HTMLElement;
      targetPill.classList.add('is-active');
      const filterKey = targetPill.getAttribute('data-specialty-filter');

      const cards = document.querySelectorAll<HTMLElement>('.dsp-master-proto-card');
      cards.forEach(card => {
        const spec = card.getAttribute('data-specialty');
        if (filterKey === 'all' || spec === filterKey) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Ô tìm kiếm Kho Phác Đồ Mẫu
  const inputMasterSearch = document.getElementById('inputMasterSearch') as HTMLInputElement;
  inputMasterSearch?.addEventListener('input', () => {
    const q = inputMasterSearch.value.toLowerCase().trim();
    const cards = document.querySelectorAll<HTMLElement>('.dsp-master-proto-card');
    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      card.style.display = !q || text.includes(q) ? 'flex' : 'none';
    });
  });

  // 4. Xem chi tiết Phác đồ Mẫu (Modal Preview)
  let activePreviewProtocol: PersonalProtocol | null = null;

  document.querySelectorAll('.js-view-master-proto').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        const proto = getMasterProtocolById(id);
        if (proto) {
          activePreviewProtocol = proto;
          showProtocolPreviewModal(proto);
        }
      }
    });
  });

  // 5. Nhân bản Phác đồ Mẫu về Kho Cá nhân
  document.querySelectorAll('.js-clone-master-proto').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        const cloned = cloneMasterProtocol(profileId, id);
        if (cloned) {
          alert(`✅ Đã nhân bản thành công phác đồ "${cloned.title}" về Kho Phác Đồ Cá Nhân của bạn!`);
          window.location.hash = `#/docspace/protocol?edit=${cloned.id}`;
        }
      }
    });
  });

  // 6. Áp dụng vào SOAP (1-Click Apply to SOAP)
  document.getElementById('dspApplyToSoapBtn')?.addEventListener('click', () => {
    if (activePreviewProtocol) {
      const planText = `[Phác đồ điều trị: ${activePreviewProtocol.title}]\n` +
        activePreviewProtocol.steps.map(s => `• ${s.title || `Bước ${s.order}`}: ${s.text} ${s.timeframe ? `(${s.timeframe})` : ''}`).join('\n') +
        (activePreviewProtocol.warnings?.length ? `\n[Lưu ý Red Flags]:\n` + activePreviewProtocol.warnings.map(w => `⚠️ ${w}`).join('\n') : '');

      sessionStorage.setItem('dsp_pending_soap_plan', planText);
      alert('✅ Đã nạp phác đồ vào bộ nhớ đệm SOAP! Đang chuyển đến Sổ Tay Bệnh Án...');
      window.location.hash = '#/docspace/soap';
    }
  });

  // 7. Các chức năng Form Builder (Personal Protocol)
  const form = document.getElementById('dspProtocolForm') as HTMLFormElement;
  const stepsList = document.getElementById('dspProtocolStepsList') as HTMLElement;
  const addStepBtn = document.getElementById('dspAddStepBtn');

  if (addStepBtn && stepsList) {
    addStepBtn.addEventListener('click', () => {
      const currentCount = stepsList.querySelectorAll('.dsp-step-row').length;
      const newRowHtml = renderStepInputRow(currentCount + 1);
      stepsList.insertAdjacentHTML('beforeend', newRowHtml);
      attachStepRowEvents(stepsList.lastElementChild as HTMLElement);
    });
  }

  stepsList?.querySelectorAll<HTMLElement>('.dsp-step-row').forEach(row => {
    attachStepRowEvents(row);
  });

  function attachStepRowEvents(row: HTMLElement) {
    const removeBtn = row.querySelector('.dsp-remove-step-btn');
    removeBtn?.addEventListener('click', () => {
      const allRows = stepsList.querySelectorAll('.dsp-step-row');
      if (allRows.length <= 1) {
        alert('Phác đồ cần có ít nhất 1 bước.');
        return;
      }
      row.remove();
      reindexSteps();
    });
  }

  function reindexSteps() {
    if (!stepsList) return;
    const rows = stepsList.querySelectorAll<HTMLElement>('.dsp-step-row');
    rows.forEach((r, idx) => {
      const orderEl = r.querySelector('.dsp-step-order');
      if (orderEl) orderEl.textContent = String(idx + 1);
      r.setAttribute('data-order', String(idx + 1));
    });
  }

  // Form submit
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = (document.getElementById('dspProtocolEditId') as HTMLInputElement).value;
    const title = (document.getElementById('dspProtocolTitle') as HTMLInputElement).value.trim();
    const specialty = (document.getElementById('dspProtocolSpecialty') as HTMLInputElement).value.trim();
    const summary = (document.getElementById('dspProtocolSummary') as HTMLInputElement)?.value.trim() || '';
    const warningsText = (document.getElementById('dspProtocolWarnings') as HTMLTextAreaElement).value;
    const refsText = (document.getElementById('dspProtocolReferences') as HTMLTextAreaElement).value;

    if (!title) {
      alert('Vui lòng nhập Tên phác đồ.');
      return;
    }

    const stepRows = stepsList.querySelectorAll('.dsp-step-row');
    const steps: ProtocolStep[] = [];
    stepRows.forEach((row, i) => {
      const titleInput = row.querySelector('.dsp-step-title-input') as HTMLInputElement;
      const timeframeInput = row.querySelector('.dsp-step-timeframe-input') as HTMLInputElement;
      const textInput = row.querySelector('.dsp-step-text-input') as HTMLTextAreaElement;
      const alertCheck = row.querySelector('.dsp-step-alert-checkbox') as HTMLInputElement;
      const text = textInput?.value.trim() || '';
      if (text) {
        steps.push({
          order: i + 1,
          title: titleInput?.value.trim() || `Bước ${i + 1}`,
          timeframe: timeframeInput?.value.trim() || undefined,
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
      updateProtocol(profileId, editId, { title, specialty: specialty || undefined, summary, steps, warnings, references });
    } else {
      saveProtocol(profileId, { title, specialty: specialty || undefined, summary, steps, warnings, references });
    }

    window.location.hash = '#/docspace/protocol';
  });

  // Clear edit
  document.getElementById('dspClearProtocolEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/protocol';
  });

  // Personal List actions
  document.getElementById('dspProtocolList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-protocol') {
      if (confirm('Xóa phác đồ cá nhân này?')) {
        deleteProtocol(profileId, id);
        window.location.hash = '#/docspace/protocol';
      }
    } else if (action === 'edit-protocol') {
      window.location.hash = `#/docspace/protocol?edit=${id}`;
    } else if (action === 'view-personal-protocol') {
      const proto = getProtocolById(profileId, id);
      if (proto) {
        activePreviewProtocol = proto;
        showProtocolPreviewModal(proto);
      }
    }
  });

  // Modal events
  document.getElementById('dspProtocolModalBackdrop')?.addEventListener('click', closeProtocolPreviewModal);
  document.getElementById('dspCloseProtocolPreview')?.addEventListener('click', closeProtocolPreviewModal);
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

  // Personal search
  const personalSearch = document.getElementById('dspProtocolSearchInput') as HTMLInputElement;
  personalSearch?.addEventListener('input', () => {
    const q = personalSearch.value.toLowerCase().trim();
    const cards = document.querySelectorAll<HTMLElement>('.dsp-protocol-card');
    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      card.style.display = !q || text.includes(q) ? 'flex' : 'none';
    });
  });
}

function showProtocolPreviewModal(proto: PersonalProtocol): void {
  const modal = document.getElementById('dspProtocolPreviewModal');
  const content = document.getElementById('dspProtocolPreviewContent');
  const title = document.getElementById('dspProtocolModalTitle');
  if (modal && content && title) {
    title.innerHTML = `<i class="fa-solid fa-book-medical" style="color:var(--color-primary);"></i> ${escapeHtml(proto.title)}`;
    content.innerHTML = renderProtocolPreviewHtml(proto);
    modal.style.display = 'flex';
  }
}

function closeProtocolPreviewModal(): void {
  const modal = document.getElementById('dspProtocolPreviewModal');
  if (modal) modal.style.display = 'none';
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
