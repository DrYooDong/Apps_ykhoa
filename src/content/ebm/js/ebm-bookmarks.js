/**
 * ebm-bookmarks.js
 * Gói 7: Bookmark & Text Highlight Engine
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTextHighlighting();
  });

  // Toggle Bookmark for any item
  window.toggleEbmBookmark = function(id, title, category = 'guideline') {
    let bookmarks = JSON.parse(localStorage.getItem('clini_ebm_bookmarks') || '[]');
    const idx = bookmarks.findIndex(b => b.id === id);

    if (idx >= 0) {
      bookmarks.splice(idx, 1);
      if (typeof showEbmToast === 'function') showEbmToast('Đã bỏ lưu', `Đã xóa "${title}" khỏi Bookmark`, 'info');
    } else {
      bookmarks.push({ id, title, category, timestamp: Date.now() });
      if (typeof showEbmToast === 'function') showEbmToast('Đã lưu thành công', `Đã thêm "${title}" vào Bookmark`, 'success');
    }

    localStorage.setItem('clini_ebm_bookmarks', JSON.stringify(bookmarks));
    window.dispatchEvent(new CustomEvent('clini:bookmark-changed', { detail: { id, bookmarks } }));
  };

  // Text Selection Highlight Popup
  function initTextHighlighting() {
    document.addEventListener('mouseup', function(e) {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      const existingPopup = document.getElementById('ebm-hl-popup');
      if (existingPopup) existingPopup.remove();

      if (text.length < 3) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const popup = document.createElement('div');
      popup.id = 'ebm-hl-popup';
      popup.className = 'ebm-highlight-popup';
      popup.style.top = `${window.scrollY + rect.top - 40}px`;
      popup.style.left = `${window.scrollX + rect.left + (rect.width / 2) - 60}px`;

      popup.innerHTML = `
        <div class="ebm-highlight-color-dot ebm-highlight-yellow" data-color="#fef08a" title="Highlight Vàng"></div>
        <div class="ebm-highlight-color-dot ebm-highlight-green" data-color="#bbf7d0" title="Highlight Xanh Lá"></div>
        <div class="ebm-highlight-color-dot ebm-highlight-blue" data-color="#bae6fd" title="Highlight Xanh Dương"></div>
        <div class="ebm-highlight-color-dot ebm-highlight-pink" data-color="#fbcfe8" title="Highlight Hồng"></div>
      `;

      popup.querySelectorAll('.ebm-highlight-color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const color = dot.getAttribute('data-color');
          applyHighlight(range, color);
          popup.remove();
        });
      });

      document.body.appendChild(popup);
    });
  }

  function applyHighlight(range, color) {
    const span = document.createElement('span');
    span.style.backgroundColor = color;
    span.style.borderRadius = '3px';
    span.style.padding = '0 2px';
    range.surroundContents(span);
    if (typeof showEbmToast === 'function') showEbmToast('Đã Highlight', 'Đã lưu ghi chú màu cho đoạn văn bản', 'success');
  }

})();
