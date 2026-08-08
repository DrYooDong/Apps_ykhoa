function goBack() {
  if (window.history.length > 1 && document.referrer && !document.referrer.includes(window.location.pathname)) {
    window.history.back();
  } else {
    const holder = document.getElementById('header-placeholder');
    const headerPath = holder ? holder.dataset.headerPath : '';
    if (headerPath) {
      const depth = (headerPath.match(/\.\.\//g) || []).length;
      window.location.href = '../'.repeat(depth) + 'index.html';
    } else {
      window.location.href = 'index.html';
    }
  }
}

function getProjectRootPrefix(headerPath) {
  if (!headerPath) return '';
  const idx = headerPath.lastIndexOf('components/');
  if (idx !== -1) {
    return headerPath.substring(0, idx);
  }
  const depth = (headerPath.match(/\.\.\//g) || []).length;
  return '../'.repeat(depth);
}

function fixHeaderLinks(holder, projectRoot) {
  if (!holder) return;
  const links = holder.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('javascript:')) return;

    if (href.startsWith('#')) {
      const root = projectRoot || './';
      link.setAttribute('href', root + 'index.html' + href);
    } else {
      const cleanHref = href.replace(/^(\.\.\/|\.\/|\/)+/, '');
      link.setAttribute('href', projectRoot + cleanHref);
    }
  });
}

async function loadHeader() {
  // Ngăn nạp header nếu đang được nhúng trong iframe của CliniPortal SPA (tránh Lồng giao diện / Duplicate App Shell)
  try {
    if (window.self !== window.top || window.location.search.includes('embedded=1')) {
      document.documentElement.classList.add('in-iframe');
      document.documentElement.setAttribute('data-embedded', 'true');
      return;
    }
  } catch (e) {
    document.documentElement.classList.add('in-iframe');
    document.documentElement.setAttribute('data-embedded', 'true');
    return;
  }

  const holder = document.getElementById('header-placeholder');
  if (!holder) return;

  const headerPath = holder.dataset.headerPath;
  if (!headerPath) {
    console.warn('[header.js] Thiếu data-header-path trên #header-placeholder');
    return;
  }

  try {
    const res = await fetch(headerPath);
    if (!res.ok) throw new Error(`Không tải được header: ${res.status}`);
    const html = await res.text();
    holder.innerHTML = html;
    const projectRoot = getProjectRootPrefix(headerPath);
    fixHeaderLinks(holder, projectRoot);

    // Tự động nạp bộ linh kiện Material UI (mui-port) cho toàn bộ hệ sinh thái CliniPortal
    if (!document.querySelector('link[href*="mui-port.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = projectRoot + 'css/components/mui-port.css';
      document.head.appendChild(cssLink);
    }
    if (!document.querySelector('script[src*="mui-port.js"]') && typeof window.cpToast === 'undefined') {
      const jsScript = document.createElement('script');
      jsScript.src = projectRoot + 'js/mui-port.js';
      jsScript.defer = true;
      document.head.appendChild(jsScript);
    }

    initHeader();
  } catch (err) {
    console.error('[header.js]', err);
  }
}

function initHeader() {
  if (typeof window.initCoSoDropdown === 'function') {
    window.initCoSoDropdown();
  }
  if (typeof window.initSinhLyDropdown === 'function') {
    window.initSinhLyDropdown();
  }
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const sidebar        = document.getElementById('appSidebar');
  const overlay        = document.getElementById('sidebarOverlay');
  const arrowBtn       = document.getElementById('sidebar-toggle-arrow');
  const footer         = document.querySelector('.global-footer');

  // --- Theme toggle ---
  if (!window.CliniPortalTheme) {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      let theme = localStorage.getItem('cliniportal_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      html.setAttribute('data-theme', theme);
      themeBtn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i> <span>Chế độ Sáng</span>'
        : '<i class="fa-solid fa-moon" style="color:#8b5cf6;"></i> <span>Chế độ Tối</span>';

      themeBtn.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        localStorage.setItem('cliniportal_theme', theme);
        themeBtn.innerHTML = theme === 'dark'
          ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i> <span>Chế độ Sáng</span>'
          : '<i class="fa-solid fa-moon" style="color:#8b5cf6;"></i> <span>Chế độ Tối</span>';
      });
    }
  }

  // ── Sidebar helpers ──────────────────────────────────────
  const isMobile = () => window.innerWidth < 768;

  function syncFooter() {
    if (!footer || isMobile()) return;
    footer.style.marginLeft = sidebar?.classList.contains('collapsed')
      ? 'var(--sidebar-col-w)'
      : 'var(--sidebar-w)';
  }

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ── Nút mũi tên thu gọn sidebar (desktop) ───────────────
  arrowBtn?.addEventListener('click', () => {
    if (!isMobile()) {
      sidebar?.classList.toggle('collapsed');
      syncFooter();
    }
  });

  // ── Mobile menu btn ──────────────────────────────────────
  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile()) {
      sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
    } else {
      sidebar?.classList.toggle('collapsed');
      syncFooter();
    }
  });

  overlay?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (!isMobile()) closeSidebar();
  });

  // ── Search shortcut (/ để focus, Esc để đóng) ───────────
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault();
      document.querySelector('.search-container .input')?.focus();
    }
    if (e.key === 'Escape') {
      document.querySelector('.search-container .input')?.blur();
      closeSidebar();
    }
  });

  // ── Active nav theo URL hiện tại ─────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^.*\//, ''))) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
    item.addEventListener('click', () => {
      if (isMobile()) closeSidebar();
    });
  });

  // ── Adjust relative paths for header logo & module buttons ─────────────
  const holder = document.getElementById('header-placeholder');
  const headerPath = holder ? holder.dataset.headerPath : '';
  const projectRoot = getProjectRootPrefix(headerPath);
  let basePath = projectRoot;

  window.getPathDepthPrefix = function() {
    return projectRoot || './';
  };

  // ── SMART MEDICAL SEARCH ENGINE INIT (Inspired by Upstash Context7) ────
  (function initSmartSearchModal() {
    // 1. Tự động nạp medical-search-engine.js nếu chưa có
    if (!window.medicalSearchEngine) {
      const script = document.createElement('script');
      script.src = basePath + 'js/core/medical-search-engine.js';
      script.onload = () => {
        if (window.medicalSearchEngine) {
          window.medicalSearchEngine.init(basePath);
        }
      };
      document.head.appendChild(script);
    } else {
      window.medicalSearchEngine.init(basePath);
    }

    // 2. Tạo HTML cho Smart Search Modal nếu chưa tồn tại
    if (!document.getElementById('smartSearchOverlay')) {
      const modalHtml = `
        <div class="smart-search-overlay" id="smartSearchOverlay">
          <div class="smart-search-modal">
            <div class="smart-search-header">
              <i class="fa-solid fa-magnifying-glass smart-search-icon"></i>
              <input type="search" class="smart-search-input" id="smartSearchInput" placeholder="Tìm phác đồ cấp cứu, thuốc, thang điểm, guideline..." autocomplete="off" />
              <button type="button" class="smart-search-close-kbd" id="smartSearchCloseBtn">ESC</button>
            </div>

            <div class="smart-search-tabs" id="smartSearchTabs">
              <button class="search-tab-btn active" data-category="all">
                <i class="fa-solid fa-layer-group"></i> Tất cả
              </button>
              <button class="search-tab-btn" data-category="approach">
                🩺 Phác đồ & Cấp cứu
              </button>
              <button class="search-tab-btn" data-category="pharma">
                💊 Dược lý
              </button>
              <button class="search-tab-btn" data-category="tools">
                🧮 Thang điểm & Công cụ
              </button>
              <button class="search-tab-btn" data-category="physio">
                🧬 Sinh lý
              </button>
              <button class="search-tab-btn" data-category="guidelines">
                📖 Guidelines
              </button>
            </div>

            <div class="smart-search-results" id="smartSearchResults">
              <div class="smart-search-empty">
                <div class="smart-search-empty-icon">🩺</div>
                <p>Nhập từ khóa y khoa (vd: <i>hen cấp, sốc phản vệ, sofa, ada 2024, noradrenaline</i>)...</p>
              </div>
            </div>

            <div class="smart-search-footer">
              <div class="smart-search-footer-hints">
                <span><kbd>↑</kbd> <kbd>↓</kbd> để di chuyển</span>
                <span><kbd>↵</kbd> để chọn</span>
                <span><kbd>ESC</kbd> để đóng</span>
              </div>
              <div class="smart-search-engine-tag">
                ⚡ Powered by CliniPortal Context Engine
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const overlay = document.getElementById('smartSearchOverlay');
    const searchInput = document.getElementById('smartSearchInput');
    const closeBtn = document.getElementById('smartSearchCloseBtn');
    const resultsContainer = document.getElementById('smartSearchResults');
    const tabsContainer = document.getElementById('smartSearchTabs');

    let activeCategory = 'all';

    const openSearchModal = () => {
      overlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput?.focus(), 50);
    };

    const closeSearchModal = () => {
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
    };

    // Mở modal khi bấm vào search bar ở Header
    const headerSearchInput = document.querySelector('.search-container .input');
    const headerSearchKbd = document.querySelector('.search-kbd-hint');
    const headerSearchBtn = document.querySelector('.search-container');

    headerSearchInput?.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchModal();
    });
    headerSearchBtn?.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        openSearchModal();
      }
    });

    closeBtn?.addEventListener('click', closeSearchModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearchModal();
    });

    // Lắng nghe phím tắt Ctrl + K hoặc / hoặc ESC
    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement.tagName;
      const isInputActive = tag === 'INPUT' || tag === 'TEXTAREA';

      // Ctrl + K hoặc Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        overlay?.classList.contains('open') ? closeSearchModal() : openSearchModal();
      }
      // Bấm phím '/' khi không gõ text
      else if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        openSearchModal();
      }
      // ESC đóng modal
      else if (e.key === 'Escape' && overlay?.classList.contains('open')) {
        closeSearchModal();
      }
    });

    // Xử lý chuyển Tab phân loại
    tabsContainer?.addEventListener('click', (e) => {
      const btn = e.target.closest('.search-tab-btn');
      if (!btn) return;
      tabsContainer.querySelectorAll('.search-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'all';
      renderSearchResults();
    });

    // Xử lý sự kiện gõ tìm kiếm
    searchInput?.addEventListener('input', () => {
      renderSearchResults();
    });

    function renderSearchResults() {
      const query = searchInput?.value.trim() || '';
      if (!query) {
        resultsContainer.innerHTML = `
          <div class="smart-search-empty">
            <div class="smart-search-empty-icon">🩺</div>
            <p>Nhập từ khóa y khoa (vd: <i>hen cấp, sốc phản vệ, sofa, ada 2024, noradrenaline</i>)...</p>
          </div>
        `;
        return;
      }

      if (!window.medicalSearchEngine) {
        resultsContainer.innerHTML = `<div class="smart-search-empty">Đang khởi tạo engine tra cứu...</div>`;
        return;
      }

      const results = window.medicalSearchEngine.search(query, activeCategory);

      if (results.length === 0) {
        resultsContainer.innerHTML = `
          <div class="smart-search-empty">
            <div class="smart-search-empty-icon">🔍</div>
            <p>Không tìm thấy kết quả phù hợp cho <b>"${query}"</b> trong tab này.</p>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = results.map(item => {
        // Chuẩn hóa đường dẫn tương đối
        let cleanUrl = item.url.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
        let finalUrl = basePath + cleanUrl;

        // Phân loại Icon
        let icon = '📄';
        if (item.category === 'approach') icon = '🩺';
        if (item.category === 'pharma') icon = '💊';
        if (item.category === 'tools') icon = '🧮';
        if (item.category === 'physio') icon = '🧬';
        if (item.category === 'guidelines') icon = '📖';

        // Red-Flag Emergency Pill
        const emergencyHtml = item.isEmergency
          ? `<span class="emergency-pill"><i class="fa-solid fa-triangle-exclamation"></i> Cấp cứu Đỏ</span>`
          : '';

        // Evidence / Guideline Version Badge
        const guidelineHtml = item.guidelineVersion
          ? `<span class="evidence-badge"><i class="fa-solid fa-certificate"></i> ${item.guidelineVersion}</span>`
          : '';

        // PubMed Link
        const pubmedHtml = item.pmid
          ? `<a href="https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/" target="_blank" class="pubmed-link-btn" onclick="event.stopPropagation();">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> PubMed
            </a>`
          : '';

        return `
          <a href="${finalUrl}" class="search-result-card ${item.isEmergency ? 'is-emergency' : ''}">
            <div class="search-card-header">
              <span class="search-card-title">
                <span>${icon}</span>
                <span>${item.title}</span>
              </span>
              ${emergencyHtml}
            </div>
            <div class="search-card-subtitle">${item.subtitle || ''}</div>
            <div class="search-card-meta">
              ${guidelineHtml}
              ${pubmedHtml}
            </div>
          </a>
        `;
      }).join('');
    }
  })();

  // ── Settings & Sync Modal ────────────────────────────────

  const syncSettingsBtn = document.getElementById('sync-settings-btn');
  if (syncSettingsBtn) {
    const assetsUrl = basePath + 'assets/demo-assets.html';

    const modalHtml = `
      <div class="cp-modal-overlay" id="cpSettingsModal">
        <div class="cp-modal">
          <div class="cp-modal-header">
            <h3 class="cp-modal-title">⚙️ Cài đặt & Đồng bộ</h3>
            <button class="cp-modal-close" id="cpModalCloseBtn" aria-label="Đóng">&times;</button>
          </div>
          <div class="cp-modal-body">
            <div class="cp-modal-section">
              <h4 class="cp-section-title">🖥️ Giao diện & Hiển thị</h4>
              <p class="cp-section-desc">Chuyển đổi giao diện Sáng / Tối và tùy chỉnh ngôn ngữ hệ thống.</p>
              <div class="cp-form-row" style="margin-bottom: 0.75rem;">
                <span class="cp-form-label">Chế độ giao diện</span>
                <button class="cp-setting-btn" id="modalThemeToggleBtn">
                  <i class="fa-solid fa-moon" id="modalThemeIcon" style="color:#8b5cf6;"></i>
                  <span id="modalThemeText">Chế độ Tối</span>
                </button>
              </div>
              <div class="cp-form-row">
                <span class="cp-form-label">Ngôn ngữ chính</span>
                <select class="cp-select" id="cpLangSelect">
                  <option value="vi" selected>Tiếng Việt (Mặc định)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div class="cp-modal-section">
              <h4 class="cp-section-title">⌨️ Phím tắt Hệ thống</h4>
              <p class="cp-section-desc">Tra cứu các phím tắt nhanh để điều hướng ứng dụng.</p>
              <button class="cp-setting-btn" id="modalHotkeyBtn">
                <i class="fa-solid fa-keyboard" style="color: var(--color-primary, #0284c7);"></i>
                <span>Bảng phím tắt (?)</span>
              </button>
            </div>
            
            <div class="cp-modal-section">
              <h4 class="cp-section-title">🔄 Đồng bộ cơ sở dữ liệu</h4>
              <p class="cp-section-desc">Đồng bộ các cập nhật lâm sàng và tính năng mới nhất từ máy chủ.</p>
              <div class="cp-sync-status">
                <span class="cp-sync-status-label">Trạng thái dữ liệu:</span>
                <span class="cp-sync-time" id="cpSyncTime">Đã tối ưu</span>
              </div>
              <button class="cp-sync-btn" id="cpSyncBtn">
                <span class="cp-spinner"></span>
                <span class="cp-btn-text" id="cpSyncBtnText">Đồng bộ ngay</span>
              </button>
            </div>

            <div class="cp-modal-section">
              <h4 class="cp-section-title">🎨 Thư viện Assets</h4>
              <p class="cp-section-desc">Cổng tài nguyên giao diện, icons, SVG và hiệu ứng dành riêng cho CliniPortal.</p>
              <a href="${assetsUrl}" class="cp-assets-btn" id="cpAssetsBtn">
                <span>🎨</span>
                <span>Truy cập Thư viện Assets</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    if (!document.getElementById('cpSettingsModal')) {
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('cpSettingsModal');
    const closeBtn = document.getElementById('cpModalCloseBtn');
    const syncBtn = document.getElementById('cpSyncBtn');
    const syncBtnText = document.getElementById('cpSyncBtnText');
    const syncTime = document.getElementById('cpSyncTime');

    const modalThemeBtn = document.getElementById('modalThemeToggleBtn');
    const modalThemeIcon = document.getElementById('modalThemeIcon');
    const modalThemeText = document.getElementById('modalThemeText');
    const modalHotkeyBtn = document.getElementById('modalHotkeyBtn');

    function syncModalThemeUI() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      if (modalThemeText && modalThemeIcon) {
        if (currentTheme === 'dark') {
          modalThemeText.textContent = 'Chế độ Sáng';
          modalThemeIcon.className = 'fa-solid fa-sun';
          modalThemeIcon.style.color = '#f59e0b';
        } else {
          modalThemeText.textContent = 'Chế độ Tối';
          modalThemeIcon.className = 'fa-solid fa-moon';
          modalThemeIcon.style.color = '#8b5cf6';
        }
      }
    }

    if (modalThemeBtn) {
      syncModalThemeUI();
      modalThemeBtn.addEventListener('click', () => {
        if (window.CliniPortalTheme && typeof window.CliniPortalTheme.toggleTheme === 'function') {
          window.CliniPortalTheme.toggleTheme();
        } else {
          let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('cliniportal_theme', theme);
        }
        syncModalThemeUI();
      });
    }

    if (modalHotkeyBtn) {
      modalHotkeyBtn.addEventListener('click', () => {
        closeModal();
        const hotkeyOverlay = document.getElementById('hotkeyModalOverlay');
        if (hotkeyOverlay) {
          hotkeyOverlay.classList.add('show');
        }
      });
    }

    const openModal = () => {
      syncModalThemeUI();
      modal.classList.add('show');
    };
    const closeModal = () => modal.classList.remove('show');

    syncSettingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Sync button action
    syncBtn.addEventListener('click', () => {
      syncBtn.classList.add('syncing');
      syncBtnText.textContent = 'Đang đồng bộ...';
      syncTime.textContent = 'Đang kiểm tra...';
      syncTime.style.color = 'var(--color-warning)';
      
      setTimeout(() => {
        syncBtn.classList.remove('syncing');
        syncBtn.classList.add('success');
        syncBtnText.textContent = 'Đồng bộ thành công';
        syncTime.textContent = 'Vừa xong';
        syncTime.style.color = 'var(--color-success)';

        setTimeout(() => {
          syncBtn.classList.remove('success');
          syncBtnText.textContent = 'Đồng bộ ngay';
        }, 2000);
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadHeader);