/**
 * DocSpace — Drug Interaction Journal View
 * Ghi nhận phác đồ thuốc đã dùng hiệu quả / cần chú ý tương tác lâm sàng
 */

import { getAllDrugEntries, saveDrugEntry, updateDrugEntry, deleteDrugEntry, getDrugEntryById } from '../storage';
import { DrugJournalEntry } from '../types';
import { renderSidebar, formatDate } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { analyzeDrugRegimen } from '../ai/llm-client';
import { searchContext } from '../ai/rag-engine';

export function renderDrugJournalView(profileId: string, editId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const entries = getAllDrugEntries(profileId);
  const editEntry = editId ? getDrugEntryById(profileId, editId) : null;

  const listHtml = entries.length
    ? entries.map(e => `
        <div class="dsp-list-item dsp-drug-card" data-drug-id="${e.id}">
          <div class="dsp-list-item-body">
            <div class="dsp-drug-header-row">
              <div class="dsp-drug-title">
                <i class="fa-solid fa-capsules" style="color: var(--color-success)"></i>
                ${escapeHtml((e.drugs || []).join(' + ') || 'Phác đồ không tên')}
              </div>
              <div class="dsp-drug-rating">${renderStars(e.rating)}</div>
            </div>

            <div class="dsp-drug-indication">
              <strong>Chỉ định:</strong> ${escapeHtml(e.indication || '—')}
              ${e.dose ? ` &nbsp;·&nbsp; <strong>Liều:</strong> ${escapeHtml(e.dose)}` : ''}
              ${e.duration ? ` &nbsp;·&nbsp; <strong>Thời gian:</strong> ${escapeHtml(e.duration)}` : ''}
            </div>

            ${e.interactions ? `
              <div class="dsp-drug-alert">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span><strong>Tương tác / Lưu ý:</strong> ${escapeHtml(e.interactions)}</span>
              </div>
            ` : ''}

            ${e.clinicalNote ? `
              <div class="dsp-drug-note">
                <i class="fa-regular fa-comment-dots"></i> ${escapeHtml(e.clinicalNote)}
              </div>
            ` : ''}

            <div class="dsp-list-item-meta" style="margin-top: 0.4rem;">
              <span>Ghi nhận ngày ${formatDate(e.createdAt)}</span>
            </div>
          </div>

          <div class="dsp-list-item-actions">
            <button class="dsp-icon-btn dsp-text-primary" data-action="analyze-drug" data-id="${e.id}" title="Phân tích Phác đồ (AI)">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </button>
            <button class="dsp-icon-btn" data-action="edit-drug" data-id="${e.id}" title="Sửa">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-drug" data-id="${e.id}" title="Xóa">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-pills"></i>
         <p>Chưa có phác đồ thuốc nào. Tạo nhật ký phác đồ đầu tiên →</p>
       </div>`;

  const formTitle = editEntry ? `Chỉnh sửa phác đồ` : 'Ghi nhận phác đồ thuốc mới';

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'drugs')}
      <main class="dsp-main">
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-pills"></i> Nhật Ký Thuốc & Phác Đồ</h1>
            <p class="dsp-page-subtitle">Theo dõi hiệu quả phác đồ phối hợp thuốc, tương tác cần lưu ý và kinh nghiệm kê đơn.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">${formTitle}</h2>
                  ${editEntry ? `<button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspClearDrugEdit"><i class="fa-solid fa-xmark"></i> Hủy sửa</button>` : ''}
                </div>

                <form class="dsp-drug-form" id="dspDrugForm" novalidate style="padding: 1.25rem;">
                  <input type="hidden" id="dspDrugEditId" value="${editEntry?.id || ''}" />

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspDrugNames">Danh sách thuốc (phân cách bằng dấu cộng + hoặc phẩy) <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspDrugNames"
                      placeholder="VD: Ceftriaxone + Azithromycin"
                      value="${escapeHtml((editEntry?.drugs || []).join(' + '))}" maxlength="200" required />
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspDrugIndication">Chỉ định lâm sàng <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspDrugIndication"
                      placeholder="VD: Viêm phổi cộng đồng mức độ trung bình (CURB-65 = 2)"
                      value="${escapeHtml(editEntry?.indication || '')}" maxlength="150" required />
                  </div>

                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspDrugDose">Liều dùng</label>
                      <input class="dsp-input" type="text" id="dspDrugDose"
                        placeholder="VD: Ceftriaxone 2g/ngày + Azithromycin 500mg/ngày"
                        value="${escapeHtml(editEntry?.dose || '')}" maxlength="120" />
                    </div>
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspDrugDuration">Thời gian điều trị</label>
                      <input class="dsp-input" type="text" id="dspDrugDuration"
                        placeholder="VD: 7 - 10 ngày"
                        value="${escapeHtml(editEntry?.duration || '')}" maxlength="60" />
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspDrugInteractions">
                      <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-warning)"></i>
                      Tương tác / Lưu ý đặc biệt
                    </label>
                    <textarea class="dsp-textarea" id="dspDrugInteractions"
                      placeholder="VD: Tránh pha Ceftriaxone với dịch chứa Calci; Chú ý khoảng QT kéo dài..." rows="2">${escapeHtml(editEntry?.interactions || '')}</textarea>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label">Đánh giá hiệu quả lâm sàng</label>
                    <div class="dsp-star-rating-select" id="dspStarRatingSelect">
                      ${[1, 2, 3, 4, 5].map(star => `
                        <label class="dsp-star-label">
                          <input type="radio" name="dspDrugRating" value="${star}" ${(editEntry?.rating || 4) === star ? 'checked' : ''} />
                          <i class="fa-solid fa-star"></i> ${star} sao
                        </label>
                      `).join('')}
                    </div>
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspDrugNote">Ghi chú lâm sàng bổ sung</label>
                    <textarea class="dsp-textarea" id="dspDrugNote"
                      placeholder="Đáp ứng điều trị sau 48h, tác dụng phụ ghi nhận..." rows="3">${escapeHtml(editEntry?.clinicalNote || '')}</textarea>
                  </div>

                  <div class="dsp-form-actions">
                    <button type="reset" class="dsp-btn dsp-btn-ghost">
                      <i class="fa-solid fa-rotate-left"></i> Xóa trắng
                    </button>
                    <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSaveDrugBtn">
                      <i class="fa-solid fa-floppy-disk"></i> ${editEntry ? 'Cập nhật' : 'Lưu nhật ký'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right: List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Đã lưu (${entries.length})</h2>
                </div>

                ${entries.length > 0 ? `
                  <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border);">
                    <input class="dsp-input" type="search" id="dspDrugSearchInput" placeholder="🔍 Tìm phác đồ hay thuốc..." />
                  </div>
                ` : ''}

                <div class="dsp-list" id="dspDrugList">
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

export function mountDrugJournalController(profileId: string): void {
  const form = document.getElementById('dspDrugForm') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = (document.getElementById('dspDrugEditId') as HTMLInputElement).value;
    const rawDrugs = (document.getElementById('dspDrugNames') as HTMLInputElement).value;
    const indication = (document.getElementById('dspDrugIndication') as HTMLInputElement).value.trim();
    const dose = (document.getElementById('dspDrugDose') as HTMLInputElement).value.trim();
    const duration = (document.getElementById('dspDrugDuration') as HTMLInputElement).value.trim();
    const interactions = (document.getElementById('dspDrugInteractions') as HTMLTextAreaElement).value.trim();
    const ratingStr = (document.querySelector('input[name="dspDrugRating"]:checked') as HTMLInputElement)?.value || '4';
    const rating = (parseInt(ratingStr, 10) || 4) as 1 | 2 | 3 | 4 | 5;
    const clinicalNote = (document.getElementById('dspDrugNote') as HTMLTextAreaElement).value.trim();

    if (!rawDrugs.trim() || !indication) {
      alert('Vui lòng nhập Danh sách thuốc và Chỉ định.');
      return;
    }

    const drugs = rawDrugs.split(/[+,]/).map(d => d.trim()).filter(Boolean);

    if (editId) {
      updateDrugEntry(profileId, editId, {
        drugs, indication, dose: dose || undefined, duration: duration || undefined,
        interactions: interactions || undefined, rating, clinicalNote
      });
    } else {
      saveDrugEntry(profileId, {
        drugs, indication, dose: dose || undefined, duration: duration || undefined,
        interactions: interactions || undefined, rating, clinicalNote
      });
    }

    window.location.hash = '#/docspace/drugs';
  });

  // Clear edit
  document.getElementById('dspClearDrugEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/drugs';
  });

  // List actions
  document.getElementById('dspDrugList')?.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-drug') {
      if (confirm('Xóa nhật ký phác đồ này?')) {
        deleteDrugEntry(profileId, id);
        window.location.hash = '#/docspace/drugs';
      }
    } else if (action === 'edit-drug') {
      window.location.hash = `#/docspace/drugs?edit=${id}`;
    } else if (action === 'analyze-drug') {
      const entry = getDrugEntryById(profileId, id);
      const profile = getActiveProfile();
      if (!entry || !profile || !profile.aiSettings?.enabled) {
        alert("Tính năng yêu cầu cấu hình AI. Vui lòng bật AI trong Cài đặt.");
        return;
      }
      
      const analyzeBtn = btn as HTMLButtonElement;
      const originalHtml = analyzeBtn.innerHTML;
      analyzeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      analyzeBtn.disabled = true;

      try {
        const chunks = searchContext(entry.drugs.join(" ") + " " + (entry.indication || ""), [], 3);
        const analysis = await analyzeDrugRegimen(entry.drugs, entry.indication || "Không rõ", profile.aiSettings, chunks);
        
        let msg = "Phân tích AI:\n\n";
        msg += "⚠️ Tương tác:\n" + analysis.interactions.map(x => "- " + x).join("\n") + "\n\n";
        msg += "💡 Thay thế:\n" + analysis.alternatives.map(x => "- " + x).join("\n");
        alert(msg);
      } catch (err: any) {
        alert(err.message);
      } finally {
        analyzeBtn.innerHTML = originalHtml;
        analyzeBtn.disabled = false;
      }
    }
  });

  // Search filter
  const searchInput = document.getElementById('dspDrugSearchInput') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      const cards = document.querySelectorAll<HTMLElement>('.dsp-drug-card');
      cards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        card.style.display = !q || text.includes(q) ? 'flex' : 'none';
      });
    });
  }
}

function renderStars(rating: number): string {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<i class="fa-solid fa-star" style="color: var(--color-warning, #f59e0b);"></i>`;
    } else {
      html += `<i class="fa-regular fa-star" style="color: var(--color-border);"></i>`;
    }
  }
  return html;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
