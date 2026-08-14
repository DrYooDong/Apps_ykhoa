/**
 * EBM Bookmark & Text Highlight Engine (ebm-bookmarks.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface EbmBookmarkItem {
  id: string;
  title: string;
  category: string;
  timestamp: number;
}

export function toggleEbmBookmark(id: string, title: string, category = 'guideline'): void {
  const bookmarks: EbmBookmarkItem[] = JSON.parse(localStorage.getItem('clini_ebm_bookmarks') || '[]');
  const idx = bookmarks.findIndex(b => b.id === id);

  if (idx >= 0) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push({ id, title, category, timestamp: Date.now() });
  }

  localStorage.setItem('clini_ebm_bookmarks', JSON.stringify(bookmarks));
  window.dispatchEvent(new CustomEvent('clini:bookmark-changed', { detail: { id, bookmarks } }));
}

export function initTextHighlighting(): void {
  document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';

    const existingPopup = document.getElementById('ebm-hl-popup');
    if (existingPopup) existingPopup.remove();

    if (text.length < 3 || !selection || selection.rangeCount === 0) return;

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
        const color = dot.getAttribute('data-color') || '#fef08a';
        applyHighlight(range, color);
        popup.remove();
      });
    });

    document.body.appendChild(popup);
  });
}

function applyHighlight(range: Range, color: string): void {
  const span = document.createElement('span');
  span.style.backgroundColor = color;
  span.style.borderRadius = '3px';
  span.style.padding = '0 2px';
  try {
    range.surroundContents(span);
  } catch (e) {
    console.warn('Cannot surround contents:', e);
  }
}

if (typeof window !== 'undefined') {
  (window as any).toggleEbmBookmark = toggleEbmBookmark;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTextHighlighting);
  } else {
    initTextHighlighting();
  }
}
