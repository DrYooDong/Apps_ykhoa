/**
 * Global Type-Ahead Search & Command Palette (global-search.js)
 * Location: js/components/global-search.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  let searchIndex = [];
  let isLoaded = false;
  let backdrop = null;
  let modal = null;
  let input = null;
  let resultsContainer = null;
  let currentCategory = 'all';
  let selectedIndex = -1;
  let currentResults = [];

  function getProjectRoot() {
    if (typeof window.getPathDepthPrefix === 'function') {
      return window.getPathDepthPrefix();
    }
    return './';
  }

  function loadSearchData() {
    if (isLoaded) return Promise.resolve(searchIndex);

    if (window.CLINIPORTAL_SEARCH_INDEX && Array.isArray(window.CLINIPORTAL_SEARCH_INDEX)) {
      searchIndex = window.CLINIPORTAL_SEARCH_INDEX;
      isLoaded = true;
      return Promise.resolve(searchIndex);
    }

    const root = getProjectRoot();
    return fetch(root + 'data/quick-search-index.json')
      .then(res => res.json())
      .then(data => {
        searchIndex = data;
        isLoaded = true;
        return searchIndex;
      })
      .catch(() => {
        return [];
      });
  }

  function createUI() {
    if (document.documentElement.classList.contains('in-iframe')) return;
    if (document.getElementById('cliniportalSearchBackdrop')) return;

    backdrop = document.createElement('div');
    backdrop.id = 'cliniportalSearchBackdrop';
    backdrop.className = 'cp-search-backdrop';
    backdrop.innerHTML = `
      <div class="cp-search-modal" role="dialog" aria-modal="true" aria-label="Tìm kiếm toàn hệ thống">
        <div class="cp-search-header">
          <i class="fa-solid fa-magnifying-glass cp-search-icon"></i>
          <input type="text" class="cp-search-input" id="cpSearchInput" placeholder="Tìm bệnh lý, thuốc, kỹ năng, phác đồ... (Ctrl + K)" autocomplete="off" />
          <button class="cp-search-clear-btn" id="cpSearchClearBtn" style="display: none;" title="Xóa">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <span class="cp-search-kbd">ESC</span>
        </div>
        <div class="cp-search-categories">
          <button class="cp-search-cat-chip active" data-cat="all">Tất cả</button>
          <button class="cp-search-cat-chip" data-cat="Cơ sở">Cơ sở Y khoa</button>
          <button class="cp-search-cat-chip" data-cat="Dược lý">Dược lý</button>
          <button class="cp-search-cat-chip" data-cat="Kỹ năng">Kỹ năng</button>
          <button class="cp-search-cat-chip" data-cat="Tiếp cận">Tiếp cận</button>
          <button class="cp-search-cat-chip" data-cat="Chứng cứ">Chứng cứ</button>
          <button class="cp-search-cat-chip" data-cat="Công cụ">Công cụ</button>
        </div>
        <div class="cp-search-results" id="cpSearchResults"></div>
        <div class="cp-search-footer">
          <span id="cpSearchResultCount">Sẵn sàng tra cứu hơn 5,000+ tài liệu y khoa</span>
          <div class="cp-search-shortcuts">
            <span><strong class="cp-search-kbd">↑</strong> <strong class="cp-search-kbd">↓</strong> di chuyển</span>
            <span><strong class="cp-search-kbd">↵</strong> chọn</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    modal = backdrop.querySelector('.cp-search-modal');
    input = backdrop.querySelector('#cpSearchInput');
    resultsContainer = backdrop.querySelector('#cpSearchResults');
    const clearBtn = backdrop.querySelector('#cpSearchClearBtn');

    // Category click
    backdrop.querySelector('.cp-search-categories').addEventListener('click', (e) => {
      const chip = e.target.closest('.cp-search-cat-chip');
      if (!chip) return;
      backdrop.querySelectorAll('.cp-search-cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.cat;
      performSearch(input.value);
    });

    // Close when clicking backdrop
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSearch();
    });

    // Clear input
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      input.focus();
      performSearch('');
    });

    // Input listeners (Debounced - JS30 pattern)
    let debounceTimer;
    input.addEventListener('input', () => {
      clearBtn.style.display = input.value.trim() ? 'block' : 'none';
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch(input.value);
      }, 150);
    });

    // Keyboard navigation
    input.addEventListener('keydown', onKeyDown);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      closeSearch();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentResults.length === 0) return;
      selectedIndex = (selectedIndex + 1) % currentResults.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentResults.length === 0) return;
      selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
        openItem(currentResults[selectedIndex]);
      }
    }
  }

  function updateSelection() {
    const items = resultsContainer.querySelectorAll('.cp-search-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function openItem(item) {
    if (!item) return;
    const root = getProjectRoot();
    let targetUrl = item.file || '';
    if (!targetUrl.startsWith('http') && !targetUrl.startsWith('/')) {
      targetUrl = root + targetUrl;
    }
    window.location.href = targetUrl;
    closeSearch();
  }

  function highlightMatches(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="cp-search-highlight">$1</mark>');
  }

  function inferModule(item) {
    const file = item.file || '';
    if (file.includes('Sinh lý') || file.includes('pathophysiology')) return 'Cơ sở';
    if (file.includes('Dược lý') || file.includes('pharmacology')) return 'Dược lý';
    if (file.includes('Kỹ năng') || file.includes('skills')) return 'Kỹ năng';
    if (file.includes('Công cụ') || file.includes('calculators')) return 'Công cụ';
    if (file.includes('Tiếp cận') || file.includes('approaches')) return 'Tiếp cận';
    if (file.includes('Y học chứng cứ') || file.includes('ebm')) return 'Chứng cứ';
    if (file.includes('Y học cổ truyền') || file.includes('tcm')) return 'YHCT';
    return item.specialty || 'Chung';
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    const countEl = document.getElementById('cpSearchResultCount');

    if (!q) {
      currentResults = [];
      selectedIndex = -1;
      resultsContainer.innerHTML = `
        <div class="cp-search-empty">
          <i class="fa-solid fa-keyboard"></i>
          <p style="font-weight: 600; margin: 0 0 4px 0;">Nhập từ khóa để bắt đầu tra cứu</p>
          <small>Ví dụ: "Hạ Natri máu", "GCS", "Kháng sinh", "Hen phế quản", "Troponin"...</small>
        </div>
      `;
      if (countEl) countEl.innerText = `Sẵn sàng tra cứu ${searchIndex.length || 5800}+ tài liệu y khoa`;
      return;
    }

    let filtered = searchIndex.filter(item => {
      const mod = inferModule(item);
      if (currentCategory !== 'all' && mod !== currentCategory) return false;

      const title = (item.title || '').toLowerCase();
      const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : '';
      const summary = (item.summary || '').toLowerCase();

      return title.includes(q) || tags.includes(q) || summary.includes(q);
    });

    currentResults = filtered.slice(0, 40); // Limit to top 40 for optimal rendering
    selectedIndex = currentResults.length > 0 ? 0 : -1;

    if (countEl) {
      countEl.innerText = `Tìm thấy ${filtered.length} kết quả (hiển thị ${currentResults.length})`;
    }

    if (currentResults.length === 0) {
      resultsContainer.innerHTML = `
        <div class="cp-search-empty">
          <i class="fa-solid fa-circle-question"></i>
          <p style="font-weight: 600; margin: 0 0 4px 0;">Không tìm thấy tài liệu phù hợp</p>
          <small>Thử tìm với từ khóa ngắn hơn hoặc chuyển sang danh mục "Tất cả".</small>
        </div>
      `;
      return;
    }

    const root = getProjectRoot();
    resultsContainer.innerHTML = currentResults.map((item, idx) => {
      const mod = inferModule(item);
      let targetUrl = item.file || '';
      if (!targetUrl.startsWith('http') && !targetUrl.startsWith('/')) {
        targetUrl = root + targetUrl;
      }

      return `
        <a href="${targetUrl}" class="cp-search-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
          <div class="cp-search-item-content">
            <div class="cp-search-item-title">${highlightMatches(item.title, query)}</div>
            ${item.summary ? `<div class="cp-search-item-summary">${highlightMatches(item.summary, query)}</div>` : ''}
          </div>
          <span class="cp-search-item-badge">${mod}</span>
        </a>
      `;
    }).join('');

    resultsContainer.querySelectorAll('.cp-search-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        selectedIndex = parseInt(item.dataset.index, 10);
        updateSelection();
      });
    });
  }

  function openSearch() {
    createUI();
    loadSearchData();
    backdrop.classList.add('active');
    setTimeout(() => {
      input.focus();
      input.select();
      performSearch(input.value);
    }, 50);
  }

  function closeSearch() {
    if (!backdrop) return;
    backdrop.classList.remove('active');
  }

  // Global Key Shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop && backdrop.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearch();
    }
  });

  // Attach search trigger on global search inputs
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.search-container, .search-bar-container, [data-open-search]');
    if (trigger) {
      e.preventDefault();
      openSearch();
    }
  });

  window.CliniPortalSearch = {
    open: openSearch,
    close: closeSearch
  };
})();
