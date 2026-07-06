    (function () {
      // --- Theme toggle ---
      const html = document.documentElement;
      const themeBtn = document.getElementById('theme-toggle-btn');
      let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);

      themeBtn?.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌓';
      });

      // --- Sidebar: desktop collapse ---
      const sidebar   = document.getElementById('appSidebar');
      const arrowBtn  = document.getElementById('sidebar-toggle-arrow');
      const menuBtn   = document.getElementById('mobileMenuBtn');
      const overlay   = document.getElementById('sidebarOverlay');
      const footer    = document.querySelector('.global-footer');
      const isMobile  = () => window.innerWidth < 768;

      arrowBtn?.addEventListener('click', () => {
        if (!isMobile() && sidebar) {
          const collapsed = sidebar.classList.toggle('collapsed');
          if (footer) footer.style.marginLeft = collapsed ? 'var(--sidebar-col-w)' : 'var(--sidebar-w)';
        }
      });

      // --- Sidebar: mobile slide ---
      menuBtn?.addEventListener('click', () => {
        if (isMobile()) {
          const open = sidebar?.classList.toggle('open');
          overlay?.classList.toggle('show', open);
        } else if (sidebar) {
          const collapsed = sidebar.classList.toggle('collapsed');
          if (footer) footer.style.marginLeft = collapsed ? 'var(--sidebar-col-w)' : 'var(--sidebar-w)';
        }
      });

      overlay?.addEventListener('click', () => {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('show');
      });

      window.addEventListener('resize', () => {
        if (!isMobile()) {
          sidebar.classList.remove('open');
          overlay.classList.remove('show');
        }
      });

      // --- Active nav ---
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
          document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.remove('active');
            n.removeAttribute('aria-current');
          });
          this.classList.add('active');
          this.setAttribute('aria-current', 'page');
          if (isMobile()) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
          }
        });
      });

      // --- Search shortcut "/" ---
      document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          document.querySelector('.search-container .input')?.focus();
        }
        if (e.key === 'Escape') {
          document.querySelector('.search-container .input')?.blur();
        }
      });

      // --- Settings & Sync Modal ---
      const syncSettingsBtn = document.getElementById('sync-settings-btn');
      if (syncSettingsBtn) {
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
                  <a href="assets/demo-assets.html" class="cp-assets-btn" id="cpAssetsBtn">
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
    })();



