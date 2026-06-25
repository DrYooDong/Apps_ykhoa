function goBack() {
  window.history.back();
}

async function loadHeader() {
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
    initHeader();
  } catch (err) {
    console.error('[header.js]', err);
  }
}

function initHeader() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const sidebar        = document.getElementById('appSidebar');
  const overlay        = document.getElementById('sidebarOverlay');
  const arrowBtn       = document.getElementById('sidebar-toggle-arrow');
  const footer         = document.querySelector('.global-footer');

  // --- Theme toggle ---
      const html = document.documentElement;
      const themeBtn = document.getElementById('theme-toggle-btn');
      let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);

      themeBtn.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌓';
      });

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

  // ── Settings & Sync Modal ────────────────────────────────
  const syncSettingsBtn = document.getElementById('sync-settings-btn');
  if (syncSettingsBtn) {
    const holder = document.getElementById('header-placeholder');
    const headerPath = holder ? holder.dataset.headerPath : '';
    let basePath = '';
    if (headerPath) {
      const lastSlashIdx = headerPath.lastIndexOf('/');
      if (lastSlashIdx !== -1) {
        basePath = headerPath.substring(0, lastSlashIdx + 1);
      }
    }
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
              <p class="cp-section-desc">Tùy chỉnh ngôn ngữ hiển thị của hệ thống.</p>
              <div class="cp-form-row">
                <span class="cp-form-label">Ngôn ngữ chính</span>
                <select class="cp-select" id="cpLangSelect">
                  <option value="vi" selected>Tiếng Việt (Default)</option>
                  <option value="en">English</option>
                </select>
              </div>
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
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('cpSettingsModal');
    const closeBtn = document.getElementById('cpModalCloseBtn');
    const syncBtn = document.getElementById('cpSyncBtn');
    const syncBtnText = document.getElementById('cpSyncBtnText');
    const syncTime = document.getElementById('cpSyncTime');

    const openModal = () => modal.classList.add('show');
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