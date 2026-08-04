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

      // --- Dynamic Dropdown for S.lý - S.lý bệnh ---
      // Hàm này được gọi ngay và cũng có thể được gọi lại từ header.js sau khi inject sidebar
      function initSinhLyDropdown() {
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
              <span>Giải phẫu & Sinh lý</span>
            </a>
            <a href="${pathoUrl}" class="nav-dropdown-item">
              <span class="dropdown-item-icon">🔬</span>
              <span>Cơ chế bệnh sinh - SLB</span>
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

      // Gọi ngay khi DOM đã sẵn sàng
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSinhLyDropdown);
      } else {
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
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('cpSettingsModal');
        const closeBtn = document.getElementById('cpModalCloseBtn');
        const syncBtn = document.getElementById('cpSyncBtn');
        const syncBtnText = document.getElementById('cpSyncBtnText');
        const syncTime = document.getElementById('cpSyncTime');
        const installPwaBtn = document.getElementById('cpInstallPwaBtn');
        const pwaStatus = document.getElementById('cpPwaInstalledStatus');

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




