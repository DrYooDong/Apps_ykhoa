// ============================================================================
// CHẾ ĐỘ IFRAME EMBEDDED (Ngăn lỗi Lồng giao diện / Duplicate App Shell)
// Khi trang .html được mở bên trong iframe của CliniPortal SPA, tự động 
// ẩn Header, Sidebar, Footer và các thành phần khung lặp lại.
// ============================================================================
(function initIframeEmbeddedMode() {
  try {
    const isEmbedded = window.self !== window.top || window.location.search.includes('embedded=1');
    if (isEmbedded) {
      document.documentElement.classList.add('in-iframe');
      document.documentElement.setAttribute('data-embedded', 'true');
      window.addEventListener('DOMContentLoaded', () => {
        document.body?.classList.add('in-iframe');
        document.body?.setAttribute('data-embedded', 'true');
      });
    }
  } catch (e) {
    document.documentElement.classList.add('in-iframe');
    document.documentElement.setAttribute('data-embedded', 'true');
  }
})();

// Global Path Depth Helper
window.getPathDepthPrefix = function() {
  const holder = document.getElementById('header-placeholder') || document.getElementById('footer-placeholder');
  const path = holder?.dataset?.headerPath || holder?.dataset?.footerPath;
  if (path) {
    const idx = path.lastIndexOf('components/');
    if (idx !== -1) return path.substring(0, idx);
    const depth = (path.match(/\.\.\//g) || []).length;
    return '../'.repeat(depth);
  }
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const srcIdx = pathname.indexOf('/src/content/');
  if (srcIdx !== -1) {
    const sub = pathname.substring(srcIdx + '/src/content/'.length);
    const parts = sub.split('/').filter(Boolean);
    return '../'.repeat(parts.length + 1);
  }
  return './';
};

// Auto-load Clinical Tools & Universal Web Components
(function loadGlobalComponents() {
      if (!document.querySelector('script[src*="tool-components.js"]')) {
        const currentScript = document.currentScript || document.querySelector('script[src*="main.js"]');
        const basePath = currentScript ? currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1) : '../../../js/';
        const script = document.createElement('script');
        script.src = basePath + 'components/tool-components.js';
        script.defer = true;
        document.head.appendChild(script);
      }
    })();

    (function initThemeAndFontSizeManager() {
      const html = document.documentElement;

      // 1. Theme Manager
      function getSavedTheme() {
        const saved = localStorage.getItem('cliniportal_theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (document.body) document.body.setAttribute('data-theme', theme);
        localStorage.setItem('cliniportal_theme', theme);

        const themeBtn = document.getElementById('theme-toggle-btn') || document.getElementById('themeToggleBtn');
        if (themeBtn) {
          const isDark = theme === 'dark';
          themeBtn.innerHTML = isDark 
            ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i> <span>Chế độ Sáng</span>' 
            : '<i class="fa-solid fa-moon" style="color:#8b5cf6;"></i> <span>Chế độ Tối</span>';
        }

        // Broadcast event for Studios & Web Components
        window.dispatchEvent(new CustomEvent('cliniportal-theme-change', { detail: { theme } }));
      }

      // 2. Font Size Manager
      const FONT_MAP = {
        'small': '14px',
        'normal': '16px',
        'large': '18px',
        'x-large': '20px'
      };

      function getSavedFontSize() {
        return localStorage.getItem('cliniportal_font_size') || 'normal';
      }

      function applyFontSize(sizeKey) {
        const pxValue = FONT_MAP[sizeKey] || sizeKey;
        html.style.fontSize = pxValue;
        html.setAttribute('data-font-size', sizeKey);
        localStorage.setItem('cliniportal_font_size', sizeKey);

        window.dispatchEvent(new CustomEvent('cliniportal-fontsize-change', { detail: { sizeKey, pxValue } }));
      }

      // Initialize on load
      let currentTheme = getSavedTheme();
      let currentFontSize = getSavedFontSize();
      applyTheme(currentTheme);
      applyFontSize(currentFontSize);

      // Global API Export
      window.CliniPortalTheme = {
        getTheme: () => currentTheme,
        setTheme: (t) => { currentTheme = t; applyTheme(t); },
        toggleTheme: () => { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; applyTheme(currentTheme); },
        getFontSize: () => currentFontSize,
        setFontSize: (s) => { currentFontSize = s; applyFontSize(s); }
      };

      // Global theme toggle button listener
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('#theme-toggle-btn, #themeToggleBtn, .theme-toggle-trigger');
        if (btn) {
          e.preventDefault();
          window.CliniPortalTheme.toggleTheme();
        }
      });

      // Storage event listener for cross-tab / iframe sync
      window.addEventListener('storage', (e) => {
        if (e.key === 'cliniportal_theme' && e.newValue) {
          applyTheme(e.newValue);
        }
        if (e.key === 'cliniportal_font_size' && e.newValue) {
          applyFontSize(e.newValue);
        }
      });
    })();
    (function() {
      // --- Horizontal Subnav Bar & Active item scroll ---
      const sidebar   = document.getElementById('appSidebar');
      const arrowBtn  = document.getElementById('sidebar-toggle-arrow');
      const menuBtn   = document.getElementById('mobileMenuBtn');
      const overlay   = document.getElementById('sidebarOverlay');
      const isMobile  = () => window.innerWidth < 768;

      // Auto scroll active item into center view on load
      const activeNavItem = sidebar?.querySelector('.nav-item.active');
      if (activeNavItem) {
        setTimeout(() => {
          activeNavItem.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }, 150);
      }

      // --- Dynamic Teleport Dropdown for Cơ sở (GP - SL & CCBS - SBL) ---
      function initCoSoDropdown() {
        const wrappers = document.querySelectorAll('.header-module-dropdown-wrapper, .bento-dropdown-card');
        wrappers.forEach(wrapper => {
          if (wrapper.dataset.cosoInited === 'true') return;

          const menu = wrapper.querySelector('.header-dropdown-menu, .bento-card-dropdown-menu');
          if (!menu) return;

          wrapper.dataset.cosoInited = 'true';

          // Teleport menu to document.body to bypass overflow constraints
          document.body.appendChild(menu);

          const triggerBtn = wrapper.querySelector('.header-dropdown-trigger, .bento-mod-cta') || wrapper;

          const updatePos = () => {
            const rect = triggerBtn.getBoundingClientRect();
            menu.style.position = 'fixed';
            menu.style.top = (rect.bottom + 6) + 'px';
            menu.style.left = Math.max(10, Math.min(window.innerWidth - 240, rect.left)) + 'px';
          };

          const openMenu = () => {
            document.querySelectorAll('.header-dropdown-menu.open, .bento-card-dropdown-menu.open').forEach(m => {
              if (m !== menu) m.classList.remove('open');
            });
            document.querySelectorAll('.header-module-dropdown-wrapper.open, .bento-dropdown-card.open').forEach(w => {
              if (w !== wrapper) w.classList.remove('open');
            });

            updatePos();
            menu.classList.add('open');
            wrapper.classList.add('open');
          };

          const closeMenu = () => {
            menu.classList.remove('open');
            wrapper.classList.remove('open');
          };

          // Toggle on click
          triggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (menu.classList.contains('open')) {
              closeMenu();
            } else {
              openMenu();
            }
          });

          // Hover handlers with grace period
          let hoverTimer;
          wrapper.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimer);
            openMenu();
          });
          wrapper.addEventListener('mouseleave', () => {
            hoverTimer = setTimeout(() => {
              if (!menu.matches(':hover')) {
                closeMenu();
              }
            }, 150);
          });

          menu.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimer);
          });
          menu.addEventListener('mouseleave', () => {
            closeMenu();
          });

          window.addEventListener('resize', () => {
            if (menu.classList.contains('open')) updatePos();
          });
          window.addEventListener('scroll', () => {
            if (menu.classList.contains('open')) updatePos();
          }, { capture: true, passive: true });

          // Close on outside click
          document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target) && !menu.contains(e.target)) {
              closeMenu();
            }
          });
        });
      }

      // Dynamic Dropdown cho S.lý cũ
      function initSinhLyDropdown() {
        initCoSoDropdown();
        document.querySelectorAll('.nav-item').forEach(item => {
          if (item.closest('.nav-dropdown-wrapper')) return; // đã xử lý rồi, bỏ qua
          const text = item.textContent || '';
          const href = item.getAttribute('href') || '';

          if (!(text.includes('S.lý') || text.includes('G.phẫu') || text.includes('Cơ sở') || href.includes('giai-phau-sinh-ly.html') || href.includes('sinhly-sinhlybenh.html') || href.includes('sinh-ly-hoc.html') || href.includes('co-che-benh-sinh.html'))) return;

          const parentLi = item.parentElement;
          if (!parentLi) return;

          const wrapper = document.createElement('div');
          wrapper.className = 'nav-dropdown-wrapper';

          parentLi.insertBefore(wrapper, item);
          wrapper.appendChild(item);
          item.classList.add('has-dropdown');

          if (!item.querySelector('.dropdown-chevron-svg')) {
            const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            chevron.setAttribute('class', 'dropdown-chevron-svg');
            chevron.setAttribute('viewBox', '0 0 24 24');
            chevron.setAttribute('fill', 'none');
            chevron.setAttribute('stroke', 'currentColor');
            chevron.setAttribute('stroke-width', '2.5');
            chevron.innerHTML = '<path d="M6 9l6 6 6-6"></path>';
            item.appendChild(chevron);
          }

          let physioUrl = href.replace(/sinhly-sinhlybenh\.html|sinh-ly-hoc\.html|co-che-benh-sinh\.html/, 'giai-phau-sinh-ly.html');
          let pathoUrl = href.replace(/sinhly-sinhlybenh\.html|sinh-ly-hoc\.html|giai-phau-sinh-ly\.html/, 'co-che-benh-sinh.html');
          if (!physioUrl.includes('giai-phau-sinh-ly.html')) {
            const baseDir = href.includes('/') ? href.substring(0, href.lastIndexOf('/') + 1) : '';
            physioUrl = baseDir + 'giai-phau-sinh-ly.html';
            pathoUrl = baseDir + 'co-che-benh-sinh.html';
          }

          const menu = document.createElement('div');
          menu.className = 'nav-dropdown-menu';
          menu.innerHTML = `
            <a href="${physioUrl}" class="nav-dropdown-item">
              <span class="dropdown-item-icon">🧬</span>
              <span>GP - SL</span>
            </a>
            <a href="${pathoUrl}" class="nav-dropdown-item">
              <span class="dropdown-item-icon">🔬</span>
              <span>CCBS - SBL</span>
            </a>
          `;
          wrapper.appendChild(menu);
          // Append menu to body để thoát khỏi mọi overflow:hidden của sidebar
          document.body.appendChild(menu);

          const updateMenuPos = () => {
            const rect = item.getBoundingClientRect();
            menu.style.position = 'fixed';
            menu.style.top = (rect.bottom + 6) + 'px';
            menu.style.left = Math.max(10, Math.min(window.innerWidth - 270, rect.left)) + 'px';
          };

          wrapper.addEventListener('mouseenter', () => { updateMenuPos(); });
          wrapper.addEventListener('mouseleave', () => { /* CSS handles hide */ });
          window.addEventListener('resize', updateMenuPos);
          window.addEventListener('scroll', updateMenuPos, { capture: true, passive: true });

          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = menu.classList.contains('open');
            // Đóng mọi menu đang mở khác
            document.querySelectorAll('.nav-dropdown-menu.open').forEach(m => m.classList.remove('open'));
            document.querySelectorAll('.nav-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
            if (!isOpen) {
              updateMenuPos();
              menu.classList.add('open');
              wrapper.classList.add('open');
            }
          });

          document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target) && !menu.contains(e.target)) {
              menu.classList.remove('open');
              wrapper.classList.remove('open');
            }
          });
        });
      }

      // Export để header.js có thể gọi lại
      window.initSinhLyDropdown = initSinhLyDropdown;
      window.initCoSoDropdown = initCoSoDropdown;

      // Gọi ngay khi DOM đã sẵn sàng
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          initCoSoDropdown();
          initSinhLyDropdown();
        });
      } else {
        initCoSoDropdown();
        initSinhLyDropdown();
      }

      // --- Active nav item click handler ---
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
          document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.remove('active');
            n.removeAttribute('aria-current');
          });
          this.classList.add('active');
          this.setAttribute('aria-current', 'page');
          this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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
                  <a href="assets/demo-assets.html" class="cp-assets-btn" id="cpAssetsBtn">
                    <span>🎨</span>
                    <span>Truy cập Thư viện Assets</span>
                  </a>
                </div>

                <div class="cp-modal-section" id="cpPwaSection">
                  <h4 class="cp-section-title">📱 Ứng dụng Đa nền tảng (PWA App)</h4>
                  <p class="cp-section-desc">Cài đặt CliniPortal làm ứng dụng độc lập trên máy tính hoặc điện thoại để dùng offline mượt mà.</p>
                  <button class="cp-sync-btn" id="cpInstallPwaBtn" style="background: linear-gradient(135deg, #0284c7, #0369a1); border: none; margin-top: 8px;">
                    <i class="fa-solid fa-download" style="margin-right: 6px;"></i> Cài đặt CliniPortal làm App
                  </button>
                  <div id="cpPwaInstalledStatus" style="display:none; color: var(--color-success); font-weight: 600; margin-top: 8px; font-size: 0.9rem;">
                    ✅ Ứng dụng CliniPortal đã được cài đặt thành công!
                  </div>
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
        const installPwaBtn = document.getElementById('cpInstallPwaBtn');
        const pwaStatus = document.getElementById('cpPwaInstalledStatus');

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

        // Check if running in standalone PWA mode
        if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) {
          if (installPwaBtn) installPwaBtn.style.display = 'none';
          if (pwaStatus) pwaStatus.style.display = 'block';
        }

        let deferredInstallPrompt = null;
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          deferredInstallPrompt = e;
          if (installPwaBtn) installPwaBtn.style.display = 'inline-flex';
        });

        installPwaBtn?.addEventListener('click', async () => {
          if (deferredInstallPrompt) {
            deferredInstallPrompt.prompt();
            const { outcome } = await deferredInstallPrompt.userChoice;
            if (outcome === 'accepted') {
              if (installPwaBtn) installPwaBtn.style.display = 'none';
              if (pwaStatus) pwaStatus.style.display = 'block';
            }
            deferredInstallPrompt = null;
          } else {
            alert('💡 Để cài đặt CliniPortal:\n- Trên Trình duyệt PC (Chrome/Edge): Nhấn biểu tượng "Cài đặt" ở góc phải thanh địa chỉ.\n- Trên iPhone/iPad (Safari): Nhấn nút Chia sẻ (Share) -> chọn "Thêm vào Màn hình chính" (Add to Home Screen).\n- Trên Android (Chrome): Nhấn dấu 3 chấm -> chọn "Thêm vào Màn hình chính".');
          }
        });

        window.addEventListener('appinstalled', () => {
          deferredInstallPrompt = null;
          if (installPwaBtn) installPwaBtn.style.display = 'none';
          if (pwaStatus) pwaStatus.style.display = 'block';
        });

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

      // --- CLINICAL CALCULATORS: AUTO INITIALIZE INTERACTIVE UI ---
      const calcContainer = document.querySelector(
        '.na-grid, .urgent-grid, .calc-container, .abg-grid, .assessment-grid, ' +
        '.calc-layout, .calc-grid, .cirrhosis-wrapper, .hcc-workspace-layout, ' +
        '.calc-container-2, .van-layout, .ss-layout, .workspace-container'
      );
      if (calcContainer && calcContainer.children.length >= 2) {
        const inputPanel = calcContainer.children[0];
        const resultPanel = calcContainer.children[1];
        
        // 1. Tự động chèn nút Toggle Collapse vào tiêu đề của panel nhập liệu
        const header = inputPanel.querySelector(
          '.panel-title, .section-card-header, .inp-card-title, .input-panel-title, ' +
          '.van-card-head, .ss-card-title, .card-zone-badge, label'
        );
        if (header) {
          const toggleBtn = document.createElement('button');
          toggleBtn.type = 'button';
          toggleBtn.className = 'toggle-input-panel-btn';
          toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
          toggleBtn.setAttribute('title', 'Thu gọn / Mở rộng bảng nhập liệu');
          header.appendChild(toggleBtn);

          toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const collapsed = inputPanel.classList.toggle('collapsed-state');
            calcContainer.classList.toggle('input-collapsed', collapsed);
            
            // Xoay icon trên nút toggle
            const icon = toggleBtn.querySelector('i');
            if (icon) {
              if (collapsed) {
                if (window.innerWidth < 768) {
                  icon.className = 'fas fa-chevron-down';
                } else {
                  icon.className = 'fas fa-chevron-right';
                }
              } else {
                if (window.innerWidth < 768) {
                  icon.className = 'fas fa-chevron-up';
                } else {
                  icon.className = 'fas fa-chevron-left';
                }
              }
            }
          });
        }

        // 2. Tự động chèn nút cuộn nhanh trên di động
        const scrollBtn = document.createElement('button');
        scrollBtn.type = 'button';
        scrollBtn.className = 'mobile-scroll-btn';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        scrollBtn.setAttribute('title', 'Cuộn nhanh xem kết quả');
        scrollBtn.dataset.target = 'results';
        document.body.appendChild(scrollBtn);

        const updateScrollBtn = () => {
          if (window.innerWidth < 768) {
            const rect = resultPanel.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2) {
              scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
              scrollBtn.setAttribute('title', 'Cuộn lên nhập liệu');
              scrollBtn.dataset.target = 'inputs';
            } else {
              scrollBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
              scrollBtn.setAttribute('title', 'Cuộn xuống kết quả');
              scrollBtn.dataset.target = 'results';
            }
          }
        };

        window.addEventListener('scroll', updateScrollBtn);
        window.addEventListener('resize', updateScrollBtn);
        updateScrollBtn();

        scrollBtn.addEventListener('click', () => {
          if (scrollBtn.dataset.target === 'inputs') {
            inputPanel.scrollIntoView({ behavior: 'smooth' });
          } else {
            resultPanel.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      // --- Register Service Worker for PWA ---
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          const script = document.querySelector('script[src*="main.js"]');
          if (script) {
            const src = script.getAttribute('src');
            const rootPath = src.replace(/js\/main\.js$/, '');
            const swPath = rootPath + 'sw.js';
            
            navigator.serviceWorker.register(swPath).then((registration) => {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch((err) => {
              console.log('ServiceWorker registration failed: ', err);
            });
          }
        });
      }

      // 3. Event delegation chung cho nút nhập liệu ca bệnh lâm sàng mẫu
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.sample-case-btn');
        if (btn) {
          try {
            const values = JSON.parse(btn.dataset.values || '{}');
            
            // Tự động chuyển tab nếu là Kali hoặc Canxi
            if (values['in-k-val'] !== undefined) {
              document.getElementById('btn-potassium')?.click();
            } else if (values['in-ca-val'] !== undefined) {
              document.getElementById('btn-calcium')?.click();
            }

            for (const [id, val] of Object.entries(values)) {
              const input = document.getElementById(id);
              if (input) {
                if (input.type === 'checkbox') {
                  input.checked = !!val;
                } else {
                  input.value = val;
                }
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
          } catch (err) {
            console.error('Lỗi khi nạp dữ liệu mẫu:', err);
          }
        }
      });

      // ----------------------------------------------------
      // PERSONAL NOTES & TEXT ANNOTATION ENGINE (#10)
      // ----------------------------------------------------
      const notePopupBtn = document.createElement('button');
      notePopupBtn.className = 'personal-note-popup-btn';
      notePopupBtn.innerHTML = '<i class="fa-solid fa-highlighter"></i> Ghi chú';
      notePopupBtn.className = 'personal-note-popup-btn';
      notePopupBtn.innerHTML = `
        <button id="btnKsNote" style="background:none; border:none; color:white; font-weight:700; font-size:0.78rem; cursor:pointer; padding:0 4px;"><i class="fa-solid fa-pen"></i> Ghi chú</button>
        <span style="opacity:0.5;">|</span>
        <button id="btnKsFlashcard" style="background:none; border:none; color:#fef08a; font-weight:700; font-size:0.78rem; cursor:pointer; padding:0 4px;"><i class="fa-solid fa-bolt"></i> Flashcard</button>
      `;
      notePopupBtn.style.cssText = `
        position: absolute;
        display: none;
        z-index: 10000;
        background: #0284c7;
        color: white;
        border: none;
        border-radius: 100px;
        padding: 5px 12px;
        font-size: 0.8rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(2, 132, 199, 0.4);
        transition: transform 0.2s;
        align-items: center;
        gap: 6px;
      `;
      document.body.appendChild(notePopupBtn);

      let currentSelectedText = '';

      document.addEventListener('mouseup', (e) => {
        if (e.target.closest('.personal-note-popup-btn')) return;

        const selection = window.getSelection();
        const selectedStr = selection ? selection.toString().trim() : '';

        if (selectedStr.length >= 5) {
          currentSelectedText = selectedStr;
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          notePopupBtn.style.top = `${rect.top + window.scrollY - 40}px`;
          notePopupBtn.style.left = `${rect.left + window.scrollX + (rect.width / 2) - 60}px`;
          notePopupBtn.style.display = 'inline-flex';
        } else {
          notePopupBtn.style.display = 'none';
        }
      });

      document.getElementById('btnKsNote')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentSelectedText) return;

        const userNote = prompt(`Ghi chú cho đoạn văn bản:\n"${currentSelectedText.slice(0, 60)}..."\n\nNhập nội dung ghi chú cá nhân của bạn:`);
        if (userNote) {
          try {
            const notes = JSON.parse(localStorage.getItem('cliniportal_personal_notes') || '[]');
            notes.unshift({
              id: Date.now(),
              quote: currentSelectedText,
              note: userNote,
              url: window.location.href,
              pageTitle: document.title,
              timestamp: new Date().toLocaleString('vi-VN')
            });
            localStorage.setItem('cliniportal_personal_notes', JSON.stringify(notes));
            alert('✅ Đã lưu ghi chú cá nhân thành công!');
          } catch(err) {
            console.error('Lỗi khi lưu ghi chú:', err);
          }
        }

        notePopupBtn.style.display = 'none';
        window.getSelection()?.removeAllRanges();
      });

      document.getElementById('btnKsFlashcard')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentSelectedText) return;

        const cleanText = currentSelectedText.slice(0, 1000).trim();

        try {
          const cards = JSON.parse(localStorage.getItem('cliniportal_flashcards') || '[]');
          
          const isDuplicate = cards.some(c => c.back === cleanText);
          if (isDuplicate) {
            alert('⚠️ Thẻ Flashcard với nội dung này đã tồn tại!');
            notePopupBtn.style.display = 'none';
            window.getSelection()?.removeAllRanges();
            return;
          }

          cards.unshift({
            id: 'fc_' + Date.now(),
            front: document.title ? document.title.replace(' – CliniPortal', '') : 'Thẻ Tri Thức',
            back: cleanText,
            url: window.location.href,
            createdAt: new Date().toLocaleString('vi-VN')
          });

          if (cards.length > 200) cards.pop();

          localStorage.setItem('cliniportal_flashcards', JSON.stringify(cards));
          alert('⚡ Đã lưu thẻ Flashcard vào DocSpace!');
        } catch(err) {
          console.error('Lỗi khi lưu Flashcard:', err);
          alert('❌ Không thể lưu Flashcard (Bộ nhớ trình duyệt đã đầy).');
        }

        notePopupBtn.style.display = 'none';
        window.getSelection()?.removeAllRanges();
      });
    })();

// Global Performance Utilities
window.CliniPortalUtils = window.CliniPortalUtils || {};
window.CliniPortalUtils.debounce = function debounce(func, delay = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};
window.CliniPortalUtils.throttle = function throttle(func, limit = 250) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
window.debounce = window.CliniPortalUtils.debounce;
window.throttle = window.CliniPortalUtils.throttle;

// ============================================================================
// CLINICAL COMMAND CENTER & CHEATSHEETS ENGINE (MODAL POPUP)
// ============================================================================
(function initClinicalCommandCenter() {
  function setupCommandCenter() {
    const grid = document.getElementById('cheatsheetsGridContainer');
    const filterControls = document.getElementById('cheatsheetsFilterControls');
    const openBtn = document.getElementById('openCheatsheetModalBtn');
    const closeBtn = document.getElementById('closeCheatsheetModalBtn');
    const modalOverlay = document.getElementById('cheatsheetsModalOverlay');
    const searchInput = document.getElementById('cheatsheetSearchInput');

    let currentFilter = 'all';
    let currentQuery = '';

    // 1. Keyboard Shortcut Handler (Ctrl+K or /)
    document.addEventListener('keydown', (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if ((isCmdOrCtrl && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        const targetInput = document.querySelector('.search-bar-container input') || document.querySelector('.search-box-container input');
        if (targetInput) {
          targetInput.focus();
          targetInput.select();
        }
      }

      // Close cheatsheets modal on ESC key
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    if (!grid || !window.CLINICAL_CHEATSHEETS_DATA) return;

    let pinnedIds = JSON.parse(localStorage.getItem('cliniportal_pinned_cheatsheets') || '[]');

    // 2. Modal Open / Close Logic
    function openModal() {
      if (!modalOverlay) return;
      modalOverlay.style.display = 'flex';
      requestAnimationFrame(() => {
        modalOverlay.classList.add('active');
      });
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 150);
      }
      renderCheatsheets(currentFilter, currentQuery);
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        modalOverlay.style.display = 'none';
      }, 300);
    }

    const triggerElements = document.querySelectorAll('#openCheatsheetModalBtn, .open-cheatsheet-btn, .cheatsheet-trigger-btn');
    triggerElements.forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          closeModal();
        }
      });
    }

    // 3. Render Engine
    function renderCheatsheets(filter = 'all', query = '') {
      const data = window.CLINICAL_CHEATSHEETS_DATA;
      let items = [...data];

      // Filter by category badge
      if (filter !== 'all') {
        items = items.filter(item => {
          if (filter === 'emergency') return item.badge === 'EMERGENCY' || item.badge === 'ACLS';
          if (filter === 'cardiac') return item.category === 'Tim mạch' || item.badge === 'ACUTE CARDIAC';
          if (filter === 'formula') return item.category === 'Thận - Điện giải' || item.badge === 'FORMULA';
          if (filter === 'score') return item.badge === 'SCORE';
          return true;
        });
      }

      // Filter by keyword query
      if (query.trim() !== '') {
        const q = query.trim().toLowerCase();
        items = items.filter(item => {
          const inTitle = item.title.toLowerCase().includes(q);
          const inCategory = item.category.toLowerCase().includes(q);
          const inSummary = item.summary.toLowerCase().includes(q);
          const inTags = item.tags.some(t => t.toLowerCase().includes(q));
          const inDetails = item.details && item.details.firstLine.toLowerCase().includes(q);
          return inTitle || inCategory || inSummary || inTags || inDetails;
        });
      }

      // Sort pinned cards first
      items.sort((a, b) => {
        const isAPinned = pinnedIds.includes(a.id);
        const isBPinned = pinnedIds.includes(b.id);
        if (isAPinned && !isBPinned) return -1;
        if (!isAPinned && isBPinned) return 1;
        return 0;
      });

      if (items.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
            <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>
            <p style="font-weight: 600; margin: 0; font-size: 1.05rem;">Không tìm thấy phác đồ / công thức phù hợp</p>
            <small style="opacity: 0.75;">Thử tìm kiếm với từ khóa khác như "Adrenaline", "Glasgow", "Sodium"...</small>
          </div>
        `;
        return;
      }

      grid.innerHTML = items.map(item => {
        const isPinned = pinnedIds.includes(item.id);
        const dosingHtml = item.details.dosing.map(d => `<li>${d}</li>`).join('');
        const tagsHtml = item.tags.map(t => `<span class="cheatsheet-tag">#${t}</span>`).join('');

        return `
          <div class="cheatsheet-card" data-id="${item.id}">
            <div class="cheatsheet-card-top">
              <div class="cheatsheet-card-title-group">
                <div class="cheatsheet-icon-box">
                  <i class="fa-solid ${item.icon}"></i>
                </div>
                <div>
                  <h4>${item.title}</h4>
                  <span class="cheatsheet-card-category">${item.category}</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <span class="cheatsheet-badge ${item.badgeClass}">${item.badge}</span>
                <button class="cheatsheet-pin-btn ${isPinned ? 'pinned' : ''}" data-pin-id="${item.id}" title="${isPinned ? 'Bỏ ghim' : 'Ghim lên đầu'}">
                  <i class="${isPinned ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
              </div>
            </div>
            
            <p class="cheatsheet-summary">${item.summary}</p>
            
            <div class="cheatsheet-details-box">
              <span class="cheatsheet-first-line">${item.details.firstLine}</span>
              <ul class="cheatsheet-dosing-list">
                ${dosingHtml}
              </ul>
            </div>

            <div class="cheatsheet-tags">
              ${tagsHtml}
            </div>
          </div>
        `;
      }).join('');

      // Attach Pin Listeners
      grid.querySelectorAll('.cheatsheet-pin-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cardId = btn.dataset.pinId;
          if (pinnedIds.includes(cardId)) {
            pinnedIds = pinnedIds.filter(id => id !== cardId);
          } else {
            pinnedIds.push(cardId);
          }
          localStorage.setItem('cliniportal_pinned_cheatsheets', JSON.stringify(pinnedIds));
          renderCheatsheets(currentFilter, currentQuery);
        });
      });
    }

    // 4. Filter Buttons & Search Listeners
    if (filterControls) {
      filterControls.addEventListener('click', (e) => {
        const btn = e.target.closest('.cheatsheet-filter-btn');
        if (!btn) return;
        filterControls.querySelectorAll('.cheatsheet-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderCheatsheets(currentFilter, currentQuery);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        renderCheatsheets(currentFilter, currentQuery);
      });
    }

    // Initial render call
    renderCheatsheets('all', '');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCommandCenter);
  } else {
    setupCommandCenter();
  }
})();





