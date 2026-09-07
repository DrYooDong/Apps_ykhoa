/**
 * DocSpace — AI SOAP Features & Protocol Bridge Module
 * 
 * Module độc lập quản lý:
 * 1. SOAP ↔ Protocol Bridge:
 *    - Chiều 1: Trích xuất Phác đồ Điều trị Cá nhân (Personal Protocol) từ ca bệnh SOAP bằng AI
 *    - Chiều 2: Tra cứu & Áp dụng nhanh Phác đồ Cá nhân (Quick Protocol Picker) vào ô Kế hoạch (Plan - P)
 * 2. Bảo mật HIPAA qua phi-redactor trước mọi luồng xử lý AI.
 */

import { getAllProtocols, saveProtocol, getActiveProfile, getSoapPatientById } from '../storage';
import { PersonalProtocol, ProtocolStep } from '../types';
import { extractProtocolFromSOAP, ExtractedProtocolData } from '../ai/llm-client';
import { escapeHtml } from '../docspace-view';

/**
 * Nút HTML áp dụng phác đồ cá nhân nhanh vào ô Plan (P)
 */
export function renderProtocolQuickApplyBtn(): string {
  return `
    <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-outline js-btn-open-protocol-picker" style="font-size:11px; padding:3px 8px; color:var(--color-primary); border-color:var(--color-primary);" title="Chọn phác đồ đã lưu trong kho để chèn nhanh vào Kế hoạch">
      <i class="fa-solid fa-clipboard-check"></i> Áp dụng Phác đồ của tôi
    </button>
  `;
}

/**
 * Nút HTML trích xuất phác đồ cá nhân từ ca SOAP hiện tại (Icon Button gọn đẹp)
 */
export function renderSoapToProtocolBtn(patientId?: string): string {
  return `
    <button type="button" class="dsp-icon-btn js-btn-soap-to-protocol" data-patient-id="${patientId || ''}" title="⚡ Trích xuất Phác đồ Cá nhân (AI)" style="color:#6366f1; background:rgba(99,102,241,0.08); border:1px solid rgba(99,102,241,0.25);">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
    </button>
  `;
}

/**
 * Modal Tra cứu & Áp dụng Phác đồ Cá nhân vào Kế hoạch (Plan)
 */
export function openProtocolQuickPickerModal(
  profileId: string,
  onApply: (formattedText: string, protocol: PersonalProtocol) => void
): void {
  const protocols = getAllProtocols(profileId);

  // Xóa modal cũ nếu có
  document.getElementById('dspProtocolPickerModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'dspProtocolPickerModal';
  modal.className = 'dsp-modal-overlay';
  modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.55); z-index:99999; display:flex; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(3px);';

  const renderList = (items: PersonalProtocol[]) => {
    if (!items || items.length === 0) {
      return `
        <div style="text-align:center; padding:2rem; color:var(--color-text-muted);">
          <i class="fa-solid fa-clipboard-list" style="font-size:2rem; margin-bottom:0.5rem; opacity:0.5;"></i>
          <p style="margin:0; font-size:13px;">Chưa có phác đồ cá nhân nào phù hợp.</p>
          <p style="margin:0.25rem 0 0 0; font-size:11px;">Bạn có thể tạo phác đồ mới trong mục <strong>Phác đồ Cá nhân</strong> hoặc dùng nút <strong>Trích xuất từ SOAP</strong>.</p>
        </div>
      `;
    }

    return items.map(p => `
      <div class="dsp-protocol-picker-item" data-id="${p.id}" style="padding:10px 12px; border-radius:8px; border:1px solid var(--color-border); background:var(--color-surface); margin-bottom:8px; cursor:pointer; transition:all 0.15s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:13px; color:var(--color-text);">${escapeHtml(p.title)}</strong>
          ${p.specialty ? `<span class="dsp-badge" style="font-size:10px; background:rgba(2,132,199,0.1); color:var(--color-primary);">${escapeHtml(p.specialty)}</span>` : ''}
        </div>
        <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">
          <span>${p.steps?.length || 0} bước xử trí</span>
          ${p.warnings?.length ? ` · <span style="color:var(--color-warning);"><i class="fa-solid fa-triangle-exclamation"></i> ${p.warnings.length} lưu ý</span>` : ''}
        </div>
        <!-- Preview snippet of steps -->
        <div style="margin-top:6px; font-size:11px; color:var(--color-text-muted); background:var(--color-bg); padding:6px 8px; border-radius:4px; max-height:60px; overflow:hidden; text-overflow:ellipsis;">
          ${(p.steps || []).slice(0, 2).map(s => `• ${escapeHtml(s.text)}`).join('<br>')}
          ${(p.steps || []).length > 2 ? '<br>• ...' : ''}
        </div>
        <div style="margin-top:8px; display:flex; justify-content:flex-end;">
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary js-apply-this-protocol" data-id="${p.id}" style="font-size:11px; padding:3px 8px;">
            <i class="fa-solid fa-check"></i> Chèn phác đồ này
          </button>
        </div>
      </div>
    `).join('');
  };

  modal.innerHTML = `
    <div class="dsp-card" style="width:100%; max-width:650px; max-height:85vh; display:flex; flex-direction:column; background:var(--color-surface); border-radius:12px; overflow:hidden; box-shadow:0 12px 30px rgba(0,0,0,0.25);">
      <div style="padding:1rem 1.25rem; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
        <h3 style="margin:0; font-size:15px; color:var(--color-primary); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-clipboard-check"></i> Chọn Phác Đồ Cá Nhân Để Áp Dụng
        </h3>
        <button type="button" class="dsp-icon-btn js-close-modal" style="cursor:pointer;">&times;</button>
      </div>

      <div style="padding:0.75rem 1.25rem; border-bottom:1px solid var(--color-border); background:var(--color-surface);">
        <div style="position:relative;">
          <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:12px;"></i>
          <input type="text" id="dspProtocolSearchInput" class="dsp-input" placeholder="Tìm theo tên phác đồ hoặc chuyên khoa (VD: Sốc, Hen, Viêm phổi)..." style="padding-left:30px; font-size:12px; width:100%;" />
        </div>
      </div>

      <div style="padding:1rem 1.25rem; overflow-y:auto; flex:1;" id="dspProtocolPickerList">
        ${renderList(protocols)}
      </div>

      <div style="padding:0.75rem 1.25rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg); font-size:11px; color:var(--color-text-muted);">
        <span>Tổng số: ${protocols.length} phác đồ trong kho của bạn</span>
        <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-close-modal">Đóng</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Xử lý tìm kiếm
  const searchInput = modal.querySelector('#dspProtocolSearchInput') as HTMLInputElement;
  const listContainer = modal.querySelector('#dspProtocolPickerList') as HTMLElement;
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = protocols.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.specialty && p.specialty.toLowerCase().includes(q)) ||
      (p.steps && p.steps.some(s => s.text.toLowerCase().includes(q)))
    );
    if (listContainer) listContainer.innerHTML = renderList(filtered);
    bindItemClicks();
  });

  const bindItemClicks = () => {
    modal.querySelectorAll('.js-apply-this-protocol').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = (btn as HTMLElement).getAttribute('data-id');
        const selected = protocols.find(p => p.id === id);
        if (!selected) return;

        // Định dạng text cho phần Plan (P)
        let formatted = `[ÁP DỤNG PHÁC ĐỒ: ${selected.title.toUpperCase()}]\n`;
        if (selected.steps && selected.steps.length > 0) {
          formatted += selected.steps.map((s, i) => `${i + 1}. ${s.text}`).join('\n');
        }
        if (selected.warnings && selected.warnings.length > 0) {
          formatted += `\n\n⚠️ Lưu ý & Chống chỉ định:\n` + selected.warnings.map(w => `- ${w}`).join('\n');
        }
        if (selected.references && selected.references.length > 0) {
          formatted += `\n\n📚 Nguồn cơ sở: ` + selected.references.join(', ');
        }

        onApply(formatted, selected);
        modal.remove();
      });
    });
  };

  bindItemClicks();

  // Đóng modal
  modal.querySelectorAll('.js-close-modal').forEach(btn => {
    btn.addEventListener('click', () => modal.remove());
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

/**
 * Modal Trích xuất Phác đồ Cá nhân từ ca SOAP bằng AI
 */
export async function openSoapToProtocolModal(
  profileId: string,
  soapData: {
    diagnosis: string;
    sNotes?: string;
    oNotes?: string;
    aAssessment?: string;
    pPlan?: string;
    prescriptions?: any[];
  }
): Promise<void> {
  const profile = getActiveProfile();
  if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
    alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước khi dùng tính năng này.');
    return;
  }

  // Xóa modal cũ nếu có
  document.getElementById('dspSoapToProtocolModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'dspSoapToProtocolModal';
  modal.className = 'dsp-modal-overlay';
  modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:99999; display:flex; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(3px);';

  modal.innerHTML = `
    <div class="dsp-card" style="width:100%; max-width:780px; max-height:90vh; display:flex; flex-direction:column; background:var(--color-surface); border-radius:12px; overflow:hidden; box-shadow:0 15px 35px rgba(0,0,0,0.3);">
      <div style="padding:1rem 1.5rem; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg, rgba(2,132,199,0.08), rgba(99,102,241,0.08));">
        <h3 style="margin:0; font-size:16px; color:var(--color-primary); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-wand-magic-sparkles" style="color:#6366f1;"></i> Trích Xuất Phác Đồ Cá Nhân từ Ca Bệnh (AI Protocol Bridge)
        </h3>
        <button type="button" class="dsp-icon-btn js-close-modal" style="cursor:pointer;">&times;</button>
      </div>

      <div style="padding:1.5rem; overflow-y:auto; flex:1;" id="dspSoapToProtocolBody">
        <div style="text-align:center; padding:3rem 1rem;" id="dspProtocolLoadingState">
          <i class="fa-solid fa-spinner fa-spin" style="font-size:2.5rem; color:var(--color-primary); margin-bottom:1rem;"></i>
          <h4 style="margin:0 0 0.5rem 0; font-size:15px; color:var(--color-text);">AI đang phân tích ca bệnh và chuẩn hóa phác đồ...</h4>
          <p style="margin:0; font-size:12px; color:var(--color-text-muted);">Dữ liệu được lọc PHI tự động để đảm bảo quyền riêng tư y tế.</p>
        </div>
      </div>

      <div style="padding:1rem 1.5rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
        <button type="button" class="dsp-btn dsp-btn-ghost js-close-modal">Hủy bỏ</button>
        <button type="button" class="dsp-btn dsp-btn-primary js-save-extracted-protocol" style="display:none;" id="btnSaveExtractedProtocol">
          <i class="fa-solid fa-floppy-disk"></i> Lưu vào Kho Phác đồ Cá nhân
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Đóng modal
  modal.querySelectorAll('.js-close-modal').forEach(btn => {
    btn.addEventListener('click', () => modal.remove());
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  try {
    const extracted = await extractProtocolFromSOAP(soapData, profile.aiSettings);

    const bodyEl = modal.querySelector('#dspSoapToProtocolBody');
    const saveBtn = modal.querySelector('#btnSaveExtractedProtocol') as HTMLButtonElement;
    if (!bodyEl) return;

    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="background:rgba(2,132,199,0.06); padding:10px 14px; border-radius:8px; border:1px solid rgba(2,132,199,0.15); font-size:12px; color:var(--color-text);">
          <i class="fa-solid fa-circle-info" style="color:var(--color-primary);"></i>
          Bản thảo phác đồ đã được AI đúc kết từ ca bệnh <strong>${escapeHtml(soapData.diagnosis || 'hiện tại')}</strong>. Bạn có thể tinh chỉnh các trường dưới đây trước khi lưu.
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:12px;">
          <div>
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Tên phác đồ <span style="color:red;">*</span></label>
            <input type="text" id="draftProtocolTitle" class="dsp-input" value="${escapeHtml(extracted.title)}" style="font-size:13px; font-weight:bold; width:100%;" />
          </div>
          <div>
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Chuyên khoa</label>
            <input type="text" id="draftProtocolSpecialty" class="dsp-input" value="${escapeHtml(extracted.specialty || 'Nội khoa')}" style="font-size:13px; width:100%;" />
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <label style="font-size:12px; font-weight:600;">Các bước thực hiện (Mỗi bước một dòng hoặc theo danh sách) <span style="color:red;">*</span></label>
            <span style="font-size:11px; color:var(--color-text-muted);">${extracted.steps.length} bước</span>
          </div>
          <div id="draftProtocolStepsList" style="display:flex; flex-direction:column; gap:6px;">
            ${extracted.steps.map((s, idx) => `
              <div class="draft-step-row" style="display:flex; gap:8px; align-items:center;">
                <span style="font-size:11px; font-weight:bold; width:24px; text-align:center; color:var(--color-primary);">${idx + 1}.</span>
                <input type="text" class="dsp-input js-draft-step-text" value="${escapeHtml(s.text)}" style="flex:1; font-size:12px;" />
                <label style="font-size:11px; display:flex; align-items:center; gap:4px; cursor:pointer; white-space:nowrap; color:var(--color-warning);">
                  <input type="checkbox" class="js-draft-step-alert" ${s.isAlert ? 'checked' : ''} /> Khẩn/Cảnh báo
                </label>
                <button type="button" class="dsp-icon-btn dsp-icon-btn--danger js-remove-draft-step" style="padding:2px 6px;">&times;</button>
              </div>
            `).join('')}
          </div>
          <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnAddDraftStep" style="margin-top:6px; font-size:11px;">
            <i class="fa-solid fa-plus"></i> Thêm bước
          </button>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <div>
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">
              <i class="fa-solid fa-triangle-exclamation" style="color:var(--color-warning);"></i> Lưu ý & Chống chỉ định (mỗi dòng 1 lưu ý)
            </label>
            <textarea id="draftProtocolWarnings" class="dsp-textarea" rows="3" style="font-size:12px; width:100%;">${escapeHtml((extracted.warnings || []).join('\n'))}</textarea>
          </div>
          <div>
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">
              <i class="fa-solid fa-book-medical" style="color:var(--color-info);"></i> Nguồn tham khảo & Guidelines (mỗi dòng 1 nguồn)
            </label>
            <textarea id="draftProtocolReferences" class="dsp-textarea" rows="3" style="font-size:12px; width:100%;">${escapeHtml((extracted.references || []).join('\n'))}</textarea>
          </div>
        </div>
      </div>
    `;

    if (saveBtn) {
      saveBtn.style.display = 'inline-flex';
      saveBtn.onclick = () => {
        const title = (modal.querySelector('#draftProtocolTitle') as HTMLInputElement)?.value.trim();
        const specialty = (modal.querySelector('#draftProtocolSpecialty') as HTMLInputElement)?.value.trim();
        if (!title) {
          alert('Vui lòng nhập tên phác đồ.');
          return;
        }

        const stepRows = modal.querySelectorAll('.draft-step-row');
        const steps: ProtocolStep[] = [];
        stepRows.forEach((row, idx) => {
          const text = (row.querySelector('.js-draft-step-text') as HTMLInputElement)?.value.trim();
          const isAlert = (row.querySelector('.js-draft-step-alert') as HTMLInputElement)?.checked || false;
          if (text) {
            steps.push({ order: idx + 1, text, isAlert });
          }
        });

        if (steps.length === 0) {
          alert('Vui lòng nhập ít nhất 1 bước xử trí.');
          return;
        }

        const warningsText = (modal.querySelector('#draftProtocolWarnings') as HTMLTextAreaElement)?.value || '';
        const referencesText = (modal.querySelector('#draftProtocolReferences') as HTMLTextAreaElement)?.value || '';

        const warnings = warningsText.split('\n').map(s => s.trim()).filter(Boolean);
        const references = referencesText.split('\n').map(s => s.trim()).filter(Boolean);

        // Lưu vào Storage
        const payload: any = {
          title,
          steps,
          warnings,
          references
        };
        if (specialty) payload.specialty = specialty;
        const saved = saveProtocol(profileId, payload);

        modal.remove();

        // Hiển thị toast chúc mừng
        alert(`✅ Đã lưu phác đồ "${saved.title}" vào Kho Phác đồ Cá nhân thành công!`);
      };
    }

    // Gắn event xóa/thêm bước
    const stepsListEl = modal.querySelector('#draftProtocolStepsList');
    modal.querySelector('#btnAddDraftStep')?.addEventListener('click', () => {
      if (!stepsListEl) return;
      const count = stepsListEl.querySelectorAll('.draft-step-row').length + 1;
      const row = document.createElement('div');
      row.className = 'draft-step-row';
      row.style.cssText = 'display:flex; gap:8px; align-items:center;';
      row.innerHTML = `
        <span style="font-size:11px; font-weight:bold; width:24px; text-align:center; color:var(--color-primary);">${count}.</span>
        <input type="text" class="dsp-input js-draft-step-text" placeholder="Nội dung bước xử trí tiếp theo..." style="flex:1; font-size:12px;" />
        <label style="font-size:11px; display:flex; align-items:center; gap:4px; cursor:pointer; white-space:nowrap; color:var(--color-warning);">
          <input type="checkbox" class="js-draft-step-alert" /> Khẩn/Cảnh báo
        </label>
        <button type="button" class="dsp-icon-btn dsp-icon-btn--danger js-remove-draft-step" style="padding:2px 6px;">&times;</button>
      `;
      stepsListEl.appendChild(row);
      row.querySelector('.js-remove-draft-step')?.addEventListener('click', () => row.remove());
    });

    modal.querySelectorAll('.js-remove-draft-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        (e.currentTarget as HTMLElement).closest('.draft-step-row')?.remove();
      });
    });

  } catch (err: any) {
    const bodyEl = modal.querySelector('#dspSoapToProtocolBody');
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--color-danger);">
          <i class="fa-solid fa-circle-exclamation" style="font-size:2.5rem; margin-bottom:1rem;"></i>
          <h4 style="margin:0 0 0.5rem 0;">Lỗi trích xuất phác đồ</h4>
          <p style="margin:0; font-size:13px;">${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }
}

/**
 * Gắn kết toàn bộ các sự kiện AI & Protocol Bridge cho trang SOAP
 */
export function initSoapAiBridgeEvents(profileId: string): void {
  // 1. Sự kiện mở Protocol Picker để chèn vào Plan
  document.querySelectorAll('.js-btn-open-protocol-picker').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProtocolQuickPickerModal(profileId, (formattedText) => {
        const planTextarea = document.getElementById('esPPlan') as HTMLTextAreaElement;
        if (planTextarea) {
          const currentVal = planTextarea.value.trim();
          planTextarea.value = currentVal ? `${currentVal}\n\n${formattedText}` : formattedText;
          planTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    });
  });

  // 2. Sự kiện trích xuất phác đồ từ SOAP
  document.querySelectorAll('.js-btn-soap-to-protocol').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const patientId = (e.currentTarget as HTMLElement).getAttribute('data-patient-id');
      
      let soapData: any;
      if (patientId) {
        const p = getSoapPatientById(profileId, patientId);
        if (p) {
          soapData = {
            diagnosis: p.currentDiagnosis || p.admissionDiagnosis,
            sNotes: p.sNotes,
            oNotes: p.oNotes,
            aAssessment: p.aAssessment,
            pPlan: p.pPlan,
            prescriptions: p.prescriptions
          };
        }
      }

      // Nếu không có patientId (đang ở form soạn thảo trực tiếp)
      if (!soapData) {
        const diagnosis = (document.getElementById('esCurrentDiag') as HTMLInputElement)?.value || 
                          (document.getElementById('esAdmissionDiag') as HTMLInputElement)?.value || 'Ca lâm sàng';
        const sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || '';
        const oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement)?.value || '';
        const aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value || '';
        const pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement)?.value || '';

        soapData = { diagnosis, sNotes, oNotes, aAssessment, pPlan };
      }

      if (!soapData.aAssessment && !soapData.pPlan && !soapData.sNotes) {
        alert('Ca bệnh chưa có đủ dữ liệu diễn tiến để trích xuất phác đồ.');
        return;
      }

      await openSoapToProtocolModal(profileId, soapData);
    });
  });
}
