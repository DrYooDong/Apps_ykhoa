/**
 * DocSpace — Global Quick-Save Integration Hook
 * Nút/Modal lưu nhanh vào DocSpace từ bất kỳ bài viết hay công cụ nào trong CliniPortal
 */

import { getActiveProfile, saveNote, updateQuickLinks, getProfile } from '../storage';
import { QuickLink } from '../types';

export function initGlobalQuickSaveHook(): void {
  // Inject floating quick save trigger on non-DocSpace pages if active profile exists
  window.addEventListener('hashchange', checkAndRenderFloatingBtn);
  window.addEventListener('DOMContentLoaded', checkAndRenderFloatingBtn);
  checkAndRenderFloatingBtn();
}

function checkAndRenderFloatingBtn(): void {
  const hash = window.location.hash || '';
  const isDocSpaceRoute = hash.startsWith('#/docspace');
  const existingBtn = document.getElementById('dspQuickSaveFloatingBtn');

  // Don't show floating button inside DocSpace itself or home page
  if (isDocSpaceRoute || hash === '' || hash === '#/' || hash === '#') {
    if (existingBtn) existingBtn.style.display = 'none';
    return;
  }

  const profile = getActiveProfile();
  if (!profile) {
    if (existingBtn) existingBtn.style.display = 'none';
    return;
  }

  if (existingBtn) {
    existingBtn.style.display = 'flex';
    return;
  }

  // Create floating button
  const btn = document.createElement('button');
  btn.id = 'dspQuickSaveFloatingBtn';
  btn.className = 'dsp-quick-save-float';
  btn.title = 'Lưu vào DocSpace';
  btn.innerHTML = `<i class="fa-solid fa-bookmark"></i><span>DocSpace</span>`;
  btn.addEventListener('click', openQuickSaveModal);
  document.body.appendChild(btn);

  injectQuickSaveModalHtml();
}

function injectQuickSaveModalHtml(): void {
  if (document.getElementById('dspQuickSaveModal')) return;

  const modalDiv = document.createElement('div');
  modalDiv.id = 'dspQuickSaveModal';
  modalDiv.className = 'dsp-modal';
  modalDiv.style.display = 'none';
  modalDiv.innerHTML = `
    <div class="dsp-modal-backdrop" id="dspQuickSaveBackdrop"></div>
    <div class="dsp-modal-box">
      <div class="dsp-modal-header">
        <h2 class="dsp-modal-title"><i class="fa-solid fa-bookmark" style="color: var(--color-primary);"></i> Lưu vào DocSpace</h2>
        <button class="dsp-icon-btn" id="dspCloseQuickSave"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="dsp-modal-body">
        <div class="dsp-quick-save-options">
          <!-- Option 1: Quick Note -->
          <div class="dsp-card" style="margin-bottom: 1rem; padding: 1rem;">
            <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text);">
              <i class="fa-solid fa-note-sticky" style="color: var(--color-warning);"></i> Ghi chú cho trang này
            </h3>
            <input class="dsp-input" type="text" id="dspQSNoteTitle" placeholder="Tiêu đề ghi chú..." style="margin-bottom: 0.5rem;" />
            <textarea class="dsp-textarea" id="dspQSNoteContent" placeholder="Nội dung ghi chú..." rows="3" style="margin-bottom: 0.5rem;"></textarea>
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspQSSaveNoteBtn">
              <i class="fa-solid fa-check"></i> Lưu Ghi chú
            </button>
          </div>

          <!-- Option 2: Add to Quick Links -->
          <div class="dsp-card" style="padding: 1rem;">
            <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-text);">
              <i class="fa-solid fa-link" style="color: var(--color-primary);"></i> Ghim vào Liên kết Nhanh
            </h3>
            <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">
              Trang hiện tại: <code id="dspQSPagePath"></code>
            </p>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspQSPinLinkBtn">
              <i class="fa-solid fa-thumbtack"></i> Ghim trang này vào DocSpace
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalDiv);

  // Event listeners
  document.getElementById('dspQuickSaveBackdrop')?.addEventListener('click', closeQuickSaveModal);
  document.getElementById('dspCloseQuickSave')?.addEventListener('click', closeQuickSaveModal);

  document.getElementById('dspQSSaveNoteBtn')?.addEventListener('click', () => {
    const profile = getActiveProfile();
    if (!profile) return;

    const title = (document.getElementById('dspQSNoteTitle') as HTMLInputElement).value.trim();
    const content = (document.getElementById('dspQSNoteContent') as HTMLTextAreaElement).value.trim();
    const pageUrl = window.location.hash || window.location.pathname;
    const pageTitle = document.title.replace(' – CliniPortal', '').trim();

    if (!title || !content) {
      alert('Vui lòng nhập tiêu đề và nội dung ghi chú.');
      return;
    }

    saveNote(profile.id, {
      title,
      content,
      tags: ['quick-save'],
      sourceUrl: pageUrl,
      sourceTitle: pageTitle,
    });

    alert('✅ Đã lưu ghi chú vào DocSpace!');
    closeQuickSaveModal();
  });

  document.getElementById('dspQSPinLinkBtn')?.addEventListener('click', () => {
    const profile = getActiveProfile();
    if (!profile) return;

    const pageUrl = window.location.hash || window.location.pathname;
    const pageTitle = document.title.replace(' – CliniPortal', '').trim();

    const existingLinks = [...profile.quickLinks];
    const linkId = `qs_${Date.now()}`;

    if (!existingLinks.some(l => l.href === pageUrl)) {
      const newLink: QuickLink = {
        id: linkId,
        label: pageTitle,
        href: pageUrl,
        icon: 'fa-solid fa-bookmark',
        category: 'custom',
        isPinned: true,
      };
      existingLinks.push(newLink);
      updateQuickLinks(profile.id, existingLinks);
      alert('✅ Đã ghim trang vào Liên kết Nhanh trong DocSpace!');
    } else {
      alert('Trang này đã có trong danh sách Liên kết Nhanh.');
    }
    closeQuickSaveModal();
  });
}

function openQuickSaveModal(): void {
  const modal = document.getElementById('dspQuickSaveModal');
  const pathCode = document.getElementById('dspQSPagePath');
  const titleInput = document.getElementById('dspQSNoteTitle') as HTMLInputElement;

  if (pathCode) pathCode.textContent = window.location.hash || window.location.pathname;
  if (titleInput) titleInput.value = `Ghi chú: ${document.title.replace(' – CliniPortal', '').trim()}`;

  if (modal) modal.style.display = 'flex';
}

function closeQuickSaveModal(): void {
  const modal = document.getElementById('dspQuickSaveModal');
  if (modal) modal.style.display = 'none';
}
