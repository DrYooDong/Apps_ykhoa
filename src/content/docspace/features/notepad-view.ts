/**
 * DocSpace — Personal Notepad View
 * Quản lý ghi chú cá nhân, hỗ trợ rich text/markdown, gắn tag và liên kết nguồn
 */

import { getAllNotes, saveNote, updateNote, deleteNote, getNoteById, getActiveProfile } from '../storage';
import { PersonalNote } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatDate, formatRelativeDate } from '../docspace-view';
import { summarizeAndTagNoteWithAI } from '../ai/llm-client';
import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import type { VaultPersonalAnnotation } from '../../knowledge-vault/types';

export function renderNotepadView(profileId: string, editId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const notes = getAllNotes(profileId);
  const editNote = editId ? getNoteById(profileId, editId) : null;

  // Load Vault Annotations / Clinical Pearls
  let vaultPearls: VaultPersonalAnnotation[] = [];
  try {
    const rawPearls = localStorage.getItem(`dsp_vault_annotations_${profileId}`);
    if (rawPearls) vaultPearls = JSON.parse(rawPearls);
  } catch {}

  // Extract unique tags
  const allTags = Array.from(
    new Set(notes.flatMap(n => n.tags || []).map(t => t.trim().toLowerCase()))
  ).filter(Boolean);

  const listHtml = notes.length
    ? notes.map(n => `
        <div class="dsp-list-item dsp-note-card" data-note-id="${n.id}" data-tags="${(n.tags || []).join(',').toLowerCase()}">
          <div class="dsp-list-item-body">
            <div class="dsp-note-header-row">
              <div class="dsp-list-item-title">${escapeHtml(n.title || 'Ghi chú không tên')}</div>
              <span class="dsp-note-date">${formatRelativeDate(n.updatedAt)}</span>
            </div>
            ${n.sourceUrl ? `
              <div class="dsp-note-source">
                <i class="fa-solid fa-link"></i>
                <a href="${escapeHtml(n.sourceUrl)}">${escapeHtml(n.sourceTitle || n.sourceUrl)}</a>
              </div>
            ` : ''}
            <div class="dsp-note-snippet">${escapeHtml(truncate(n.content, 120))}</div>
            ${n.tags && n.tags.length > 0 ? `
              <div class="dsp-note-tags">
                ${n.tags.map(t => `<span class="dsp-tag">#${escapeHtml(t)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="dsp-list-item-actions">
            <button class="dsp-icon-btn" data-action="edit-note" data-id="${n.id}" title="Sửa">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-note" data-id="${n.id}" title="Xóa">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-note-sticky"></i>
         <p>Chưa có ghi chú nào. Tạo ghi chú đầu tiên →</p>
       </div>`;

  const formTitle = editNote ? `Chỉnh sửa ghi chú: ${editNote.title || 'Ghi chú'}` : 'Tạo ghi chú mới';

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'notes')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'notes')}
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-note-sticky"></i> Ghi Chú Cá Nhân</h1>
            <p class="dsp-page-subtitle">Lưu trữ kiến thức, kinh nghiệm, quy trình lâm sàng và liên kết với tri thức CliniPortal.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">${formTitle}</h2>
                  ${editNote ? `<button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspClearNoteEdit"><i class="fa-solid fa-xmark"></i> Hủy sửa</button>` : ''}
                </div>
                <form class="dsp-note-form" id="dspNoteForm" novalidate style="padding: 1.25rem;">
                  <input type="hidden" id="dspNoteEditId" value="${editNote?.id || ''}" />

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspNoteTitle">Tiêu đề ghi chú <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspNoteTitle"
                      placeholder="VD: Lưu ý liều Noradrenaline trong sốc nhiễm khuẩn"
                      value="${escapeHtml(editNote?.title || '')}" maxlength="150" required />
                  </div>

                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspNoteContent">Nội dung ghi chú <span class="dsp-required">*</span></label>
                    <textarea class="dsp-textarea" id="dspNoteContent"
                      placeholder="Nhập nội dung chi tiết, công thức, phác đồ, kinh nghiệm lâm sàng..." rows="8" required>${escapeHtml(editNote?.content || '')}</textarea>
                  </div>

                  <div class="dsp-form-row dsp-form-row--2">
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspNoteTags">Thẻ / Tags (phân cách bằng dấu phẩy)</label>
                      <input class="dsp-input" type="text" id="dspNoteTags"
                        placeholder="VD: icu, van-mach, cap-cuu"
                        value="${escapeHtml((editNote?.tags || []).join(', '))}" maxlength="100" />
                    </div>
                    <div class="dsp-form-group">
                      <label class="dsp-label" for="dspNoteSource">Trang liên kết (URL / Hash)</label>
                      <input class="dsp-input" type="text" id="dspNoteSource"
                        placeholder="VD: #/pharmacology/van-mach"
                        value="${escapeHtml(editNote?.sourceUrl || '')}" maxlength="300" />
                    </div>
                  </div>

                  <div class="dsp-form-actions">
                    <button type="button" class="dsp-btn dsp-btn-outline" id="btnAiSummarizeNote" style="color:var(--color-primary); border-color:var(--color-primary);">
                      <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Tóm tắt & Tag
                    </button>
                    <button type="reset" class="dsp-btn dsp-btn-ghost">
                      <i class="fa-solid fa-rotate-left"></i> Xóa trắng
                    </button>
                    <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSaveNoteBtn">
                      <i class="fa-solid fa-floppy-disk"></i> ${editNote ? 'Cập nhật' : 'Lưu ghi chú'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Right: Search & List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Đã lưu (${notes.length})</h2>
                </div>

                ${notes.length > 0 ? `
                  <div style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border);">
                    <input class="dsp-input" type="search" id="dspNoteSearchInput" placeholder="🔍 Tìm kiếm ghi chú..." />
                    ${allTags.length > 0 ? `
                      <div class="dsp-tag-filter-bar" id="dspTagFilterBar" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem;">
                        <button class="dsp-tag-btn dsp-tag-btn--active" data-tag="all">Tất cả</button>
                        ${allTags.map(t => `<button class="dsp-tag-btn" data-tag="${t}">#${t}</button>`).join('')}
                      </div>
                    ` : ''}
                  </div>
                ` : ''}

                <div class="dsp-list" id="dspNotesList">
                  ${listHtml}
                </div>

                ${vaultPearls.length > 0 ? `
                  <div style="border-top: 1px dashed var(--color-border); padding: 1rem;">
                    <div style="font-size: 13px; font-weight: 800; color: #b45309; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                      <span><i class="fa-solid fa-lightbulb" style="color:#f59e0b;"></i> Đúc Kết Vault (${vaultPearls.length})</span>
                      <a href="#/vault" style="font-size:11px; text-decoration:none; color:var(--color-primary); font-weight:700;">Mở Vault →</a>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                      ${vaultPearls.slice(0, 5).map(p => {
                        const art = VAULT_CATALOG.find(a => a.id === p.articleId);
                        const artTitle = art ? art.title : p.articleId;
                        return `
                          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-left:3px solid #f59e0b; border-radius:6px; padding:7px 9px; font-size:11.5px;">
                            <div style="font-weight:700; color:var(--color-primary); margin-bottom:2px;">
                              <a href="#/vault?search=${encodeURIComponent(artTitle)}" style="text-decoration:none; color:inherit;">${escapeHtml(artTitle)}</a>
                            </div>
                            <div style="color:var(--color-text); line-height:1.4;">${escapeHtml(p.noteText)}</div>
                            <div style="font-size:10px; color:var(--color-text-muted); margin-top:3px;">${formatRelativeDate(p.createdAt)}</div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// ─── Controller ───────────────────────────────────────────────────

export function mountNotepadController(profileId: string): void {
  const form = document.getElementById('dspNoteForm') as HTMLFormElement;
  if (!form) return;

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = (document.getElementById('dspNoteEditId') as HTMLInputElement).value;
    const title = (document.getElementById('dspNoteTitle') as HTMLInputElement).value.trim();
    const content = (document.getElementById('dspNoteContent') as HTMLTextAreaElement).value.trim();
    const rawTags = (document.getElementById('dspNoteTags') as HTMLInputElement).value;
    const sourceUrl = (document.getElementById('dspNoteSource') as HTMLInputElement).value.trim();

    if (!title || !content) {
      alert('Vui lòng nhập Tiêu đề và Nội dung ghi chú.');
      return;
    }

    const tags = rawTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);

    if (editId) {
      updateNote(profileId, editId, { title, content, tags, sourceUrl: sourceUrl || undefined });
    } else {
      saveNote(profileId, { title, content, tags, sourceUrl: sourceUrl || undefined });
    }

    window.location.hash = '#/docspace/notes';
  });

  // Clear edit
  document.getElementById('dspClearNoteEdit')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/notes';
  });

  // AI Summarize & Tag Handler
  document.getElementById('btnAiSummarizeNote')?.addEventListener('click', async () => {
    const title = (document.getElementById('dspNoteTitle') as HTMLInputElement)?.value.trim();
    const content = (document.getElementById('dspNoteContent') as HTMLTextAreaElement)?.value.trim();

    if (!title || !content) {
      alert('Vui lòng nhập cả Tiêu đề và Nội dung ghi chú trước khi gọi AI.');
      return;
    }

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const btn = document.getElementById('btnAiSummarizeNote') as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI đang phân tích...';
    }

    try {
      const res = await summarizeAndTagNoteWithAI(title, content, profile.aiSettings);
      const tagsInput = document.getElementById('dspNoteTags') as HTMLInputElement;
      if (tagsInput && res.tags && res.tags.length > 0) {
        const existing = tagsInput.value.trim();
        tagsInput.value = existing ? `${existing}, ${res.tags.join(', ')}` : res.tags.join(', ');
      }
      alert(`✅ AI Tóm tắt: "${res.summary}"\n🏷️ Đã tự động gắn ${res.tags.length} tags vào form!`);
    } catch (err: any) {
      alert('❌ Lỗi AI: ' + err.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Tóm tắt & Tag';
      }
    }
  });

  // Notes List Actions (edit / delete)
  document.getElementById('dspNotesList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';

    if (action === 'delete-note') {
      if (confirm('Xóa ghi chú này?')) {
        deleteNote(profileId, id);
        window.location.hash = '#/docspace/notes';
      }
    } else if (action === 'edit-note') {
      window.location.hash = `#/docspace/notes?edit=${id}`;
    }
  });

  // Search & Tag Filter
  const searchInput = document.getElementById('dspNoteSearchInput') as HTMLInputElement;
  const tagFilterBar = document.getElementById('dspTagFilterBar');

  let activeTag = 'all';

  function filterNotes(): void {
    const q = searchInput?.value.toLowerCase().trim() || '';
    const cards = document.querySelectorAll<HTMLElement>('.dsp-note-card');

    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const tagsStr = card.getAttribute('data-tags') || '';
      const matchQ = !q || text.includes(q);
      const matchTag = activeTag === 'all' || tagsStr.split(',').includes(activeTag);

      card.style.display = matchQ && matchTag ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterNotes);
  }

  if (tagFilterBar) {
    tagFilterBar.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-tag]') as HTMLElement;
      if (!btn) return;
      activeTag = btn.getAttribute('data-tag') || 'all';

      tagFilterBar.querySelectorAll('.dsp-tag-btn').forEach(b => b.classList.remove('dsp-tag-btn--active'));
      btn.classList.add('dsp-tag-btn--active');

      filterNotes();
    });
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}
