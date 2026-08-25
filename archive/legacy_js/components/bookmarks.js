/**
 * Bookmarks & Study Tracker (bookmarks.js)
 * Location: js/components/bookmarks.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_bookmarks';
  const HISTORY_KEY = 'cliniportal_study_history';

  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveBookmarks(bookmarks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    updateUI();
    window.dispatchEvent(new CustomEvent('cliniportal-bookmarks-updated', { detail: { bookmarks } }));
  }

  function getCurrentPageInfo() {
    const titleEl = document.querySelector('h1') || document.querySelector('title');
    const title = titleEl ? titleEl.innerText.trim() : document.title;
    const url = window.location.href;
    const path = window.location.pathname;

    let module = 'Chung';
    if (path.includes('Sinh lý') || path.includes('pathophysiology')) module = 'Cơ sở Y khoa';
    else if (path.includes('Dược lý') || path.includes('pharmacology')) module = 'Dược lý';
    else if (path.includes('Kỹ năng') || path.includes('skills')) module = 'Kỹ năng';
    else if (path.includes('Công cụ') || path.includes('calculators')) module = 'Công cụ';
    else if (path.includes('Tiếp cận') || path.includes('approaches')) module = 'Tiếp cận';
    else if (path.includes('Y học chứng cứ') || path.includes('ebm')) module = 'Chứng cứ';
    else if (path.includes('Y học cổ truyền') || path.includes('tcm')) module = 'YHCT';

    return { id: path || url, title, url, module, timestamp: Date.now() };
  }

  function isCurrentPageBookmarked() {
    const current = getCurrentPageInfo();
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.id === current.id || b.url === current.url);
  }

  function toggleCurrentBookmark() {
    const current = getCurrentPageInfo();
    let bookmarks = getBookmarks();
    const index = bookmarks.findIndex(b => b.id === current.id || b.url === current.url);

    if (index >= 0) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.unshift(current);
    }

    saveBookmarks(bookmarks);
  }

  function removeBookmark(id) {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(b => b.id !== id && b.url !== id);
    saveBookmarks(bookmarks);
  }

  // --- UI Components ---
  let floatBtn = null;
  let drawer = null;
  let backdrop = null;
  let currentFilter = 'all';

  function createUI() {
    if (document.documentElement.classList.contains('in-iframe')) return;
    if (document.getElementById('cliniportalBookmarkDrawer')) return;

    // 1. Backdrop
    backdrop = document.createElement('div');
    backdrop.className = 'bookmark-drawer-backdrop';
    backdrop.addEventListener('click', closeDrawer);
    document.body.appendChild(backdrop);

    // 2. Drawer
    drawer = document.createElement('div');
    drawer.id = 'cliniportalBookmarkDrawer';
    drawer.className = 'bookmark-drawer';
    drawer.innerHTML = `
      <div class="bookmark-drawer-header">
        <h3 class="bookmark-drawer-title">
          <i class="fa-solid fa-bookmark" style="color: var(--color-primary, #0284c7);"></i>
          <span>Tủ bài viết đã lưu</span>
        </h3>
        <button class="bookmark-drawer-close" aria-label="Đóng" title="Đóng">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="bookmark-filter-bar">
        <button class="bookmark-filter-btn active" data-filter="all">Tất cả</button>
        <button class="bookmark-filter-btn" data-filter="Cơ sở Y khoa">Cơ sở</button>
        <button class="bookmark-filter-btn" data-filter="Dược lý">Dược lý</button>
        <button class="bookmark-filter-btn" data-filter="Kỹ năng">Kỹ năng</button>
        <button class="bookmark-filter-btn" data-filter="Tiếp cận">Tiếp cận</button>
        <button class="bookmark-filter-btn" data-filter="Chứng cứ">Chứng cứ</button>
        <button class="bookmark-filter-btn" data-filter="Công cụ">Công cụ</button>
      </div>
      <div class="bookmark-list" id="bookmarkListContainer"></div>
    `;

    drawer.querySelector('.bookmark-drawer-close').addEventListener('click', closeDrawer);

    // Filter bar event
    drawer.querySelector('.bookmark-filter-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('.bookmark-filter-btn');
      if (!btn) return;
      drawer.querySelectorAll('.bookmark-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderList();
    });

    document.body.appendChild(drawer);

    // 3. Floating Button
    floatBtn = document.createElement('button');
    floatBtn.id = 'cliniportalBookmarkFloatBtn';
    floatBtn.className = 'bookmark-float-btn';
    floatBtn.setAttribute('title', 'Lưu bài / Mở Tủ bài viết');
    floatBtn.setAttribute('aria-label', 'Lưu bài / Mở Tủ bài viết');

    floatBtn.addEventListener('click', (e) => {
      if (e.shiftKey || e.altKey) {
        toggleCurrentBookmark();
      } else {
        openDrawer();
      }
    });

    document.body.appendChild(floatBtn);
    updateUI();
  }

  function openDrawer() {
    if (!drawer || !backdrop) return;
    renderList();
    drawer.classList.add('active');
    backdrop.classList.add('active');
  }

  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }

  function renderList() {
    const listEl = document.getElementById('bookmarkListContainer');
    if (!listEl) return;

    let bookmarks = getBookmarks();
    if (currentFilter !== 'all') {
      bookmarks = bookmarks.filter(b => b.module === currentFilter);
    }

    if (bookmarks.length === 0) {
      listEl.innerHTML = `
        <div class="bookmark-empty-state">
          <i class="fa-regular fa-bookmark"></i>
          <p style="font-weight: 600; margin: 0 0 4px 0;">Chưa có bài viết nào được lưu</p>
          <small>Bấm vào biểu tượng bookmark trên các bài đọc để lưu lại tra cứu nhanh.</small>
        </div>
      `;
      return;
    }

    listEl.innerHTML = bookmarks.map(item => `
      <div class="bookmark-item">
        <h4 class="bookmark-item-title">
          <a href="${item.url}">${item.title || 'Bài viết không tên'}</a>
        </h4>
        <div class="bookmark-item-meta">
          <span class="badge" style="background: var(--color-surface-offset); padding: 2px 6px; border-radius: 4px;">${item.module}</span>
          <button class="bookmark-remove-btn" data-remove-id="${item.id}" title="Xóa khỏi danh sách">
            <i class="fa-solid fa-trash-can"></i> Xóa
          </button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.bookmark-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeBookmark(btn.dataset.removeId);
        renderList();
      });
    });
  }

  function updateUI() {
    if (!floatBtn) return;
    const isBookmarked = isCurrentPageBookmarked();
    const count = getBookmarks().length;

    floatBtn.innerHTML = `
      <i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
      ${count > 0 ? `<span class="bookmark-badge-count">${count}</span>` : ''}
    `;

    if (isBookmarked) {
      floatBtn.classList.add('is-bookmarked');
    } else {
      floatBtn.classList.remove('is-bookmarked');
    }
  }

  // --- Auto-record Study History ---
  function recordStudyHistory() {
    try {
      const current = getCurrentPageInfo();
      let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
      history = history.filter(h => h.id !== current.id);
      history.unshift(current);
      if (history.length > 50) history.pop();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createUI();
      recordStudyHistory();
    });
  } else {
    createUI();
    recordStudyHistory();
  }

  window.CliniPortalBookmarks = {
    toggle: toggleCurrentBookmark,
    open: openDrawer,
    close: closeDrawer,
    getAll: getBookmarks,
    remove: removeBookmark
  };
})();
