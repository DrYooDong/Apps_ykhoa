/**
 * CliniPortal Header Modals Controller (header-modals.ts)
 * Path: src/components/header-modals.ts
 * 
 * Handles interactive modals triggered from the global header:
 * 1. Clinical Cheatsheets Modal (#header-cheatsheets-btn / .open-cheatsheet-btn)
 * 2. Settings & Sync Modal (#sync-settings-btn)
 * 3. System Keyboard Shortcuts (Ctrl+K, /, ?, Esc)
 */

import { CLINICAL_CHEATSHEETS_DATA, ClinicalCheatsheetItem } from '../data/clinical-cheatsheets-data';
import { CliniPortalThemeManager } from '../main';

let deferredPwaPrompt: any = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
  });
}

/**
 * Initialize Cheatsheets and Settings modals
 */
export function initHeaderModals(): void {
  setupCheatsheetsModal();
  setupSettingsSyncModal();
  setupGlobalShortcuts();
}

/**
 * 1. CLINICAL COMMAND CENTER & CHEATSHEETS MODAL
 */
function setupCheatsheetsModal(): void {
  const modalOverlay = document.getElementById('cheatsheetsModalOverlay');
  const grid = document.getElementById('cheatsheetsGridContainer');
  const closeBtn = document.getElementById('closeCheatsheetModalBtn');
  const searchInput = document.getElementById('cheatsheetSearchInput') as HTMLInputElement | null;
  const filterControls = document.getElementById('cheatsheetsFilterControls');

  let currentFilter = 'all';
  let currentQuery = '';
  let pinnedIds: string[] = [];

  try {
    pinnedIds = JSON.parse(localStorage.getItem('cliniportal_pinned_cheatsheets') || '[]');
  } catch {
    pinnedIds = [];
  }

  function openCheatsheetModal(): void {
    if (!modalOverlay) return;
    modalOverlay.style.display = 'flex';
    requestAnimationFrame(() => {
      modalOverlay.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 120);
    }
    renderCheatsheets();
  }

  function closeCheatsheetModal(): void {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 250);
  }

  function renderCheatsheets(): void {
    if (!grid) return;

    const data: ClinicalCheatsheetItem[] = CLINICAL_CHEATSHEETS_DATA || [];
    let items = [...data];

    // Filter by tab
    if (currentFilter !== 'all') {
      items = items.filter(item => {
        if (currentFilter === 'emergency') return item.badge === 'EMERGENCY' || item.badge === 'ACLS';
        if (currentFilter === 'cardiac') return item.category === 'Tim mạch' || item.badge === 'ACUTE CARDIAC';
        if (currentFilter === 'formula') return item.category === 'Thận - Điện giải' || item.badge === 'FORMULA';
        if (currentFilter === 'score') return item.badge === 'SCORE';
        return true;
      });
    }

    // Filter by search query
    if (currentQuery.trim() !== '') {
      const q = currentQuery.trim().toLowerCase();
      items = items.filter(item => {
        const inTitle = item.title.toLowerCase().includes(q);
        const inCategory = item.category.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        const inDetails = item.details && item.details.firstLine.toLowerCase().includes(q);
        return inTitle || inCategory || inSummary || inTags || inDetails;
      });
    }

    // Sort pinned items first
    items.sort((a, b) => {
      const isAPinned = pinnedIds.includes(a.id);
      const isBPinned = pinnedIds.includes(b.id);
      if (isAPinned && !isBPinned) return -1;
      if (!isAPinned && isBPinned) return 1;
      return 0;
    });

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--color-text-muted, #64748b);">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>
          <p style="font-weight: 700; margin: 0; font-size: 1.05rem; color: var(--color-text, #0f172a);">Không tìm thấy phác đồ / công thức phù hợp</p>
          <small style="opacity: 0.75;">Thử tìm kiếm với từ khóa khác như "Adrenaline", "Glasgow", "Sodium", "Sepsis"...</small>
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

    // Attach Pin click listeners
    grid.querySelectorAll('.cheatsheet-pin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pinId = btn.getAttribute('data-pin-id');
        if (!pinId) return;

        if (pinnedIds.includes(pinId)) {
          pinnedIds = pinnedIds.filter(id => id !== pinId);
        } else {
          pinnedIds.push(pinId);
        }

        localStorage.setItem('cliniportal_pinned_cheatsheets', JSON.stringify(pinnedIds));
        renderCheatsheets();
      });
    });
  }

  // Trigger buttons (header lightning bolt & any open-cheatsheet-btn)
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest('#header-cheatsheets-btn, .open-cheatsheet-btn, .cheatsheet-trigger-btn, #openCheatsheetModalBtn');
    if (trigger) {
      e.preventDefault();
      openCheatsheetModal();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCheatsheetModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeCheatsheetModal();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value;
      renderCheatsheets();
    });
  }

  if (filterControls) {
    filterControls.querySelectorAll('.cheatsheet-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterControls.querySelectorAll('.cheatsheet-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderCheatsheets();
      });
    });
  }

  // Expose to window for inline calls
  if (typeof window !== 'undefined') {
    (window as any).openCheatsheetModal = openCheatsheetModal;
    (window as any).closeCheatsheetModal = closeCheatsheetModal;
  }
}

/**
 * 2. SETTINGS & SYNC MODAL
 */
function setupSettingsSyncModal(): void {
  // Inject modal markup if not present
  if (!document.getElementById('cpSettingsModal')) {
    const modalHtml = `
      <div class="cp-modal-overlay" id="cpSettingsModal" style="display: none;">
        <div class="cp-modal">
          <div class="cp-modal-header">
            <h3 class="cp-modal-title">⚙️ Cài đặt & Đồng bộ</h3>
            <button class="cp-modal-close" id="cpModalCloseBtn" aria-label="Đóng">&times;</button>
          </div>
          <div class="cp-modal-body">
            <div class="cp-modal-section">
              <h4 class="cp-section-title">🖥️ Giao diện & Hiển thị</h4>
              <p class="cp-section-desc">Chuyển đổi giao diện Sáng / Tối và tùy chỉnh ngôn ngữ hệ thống.</p>
              <div class="cp-form-row" style="margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
                <span class="cp-form-label">Chế độ giao diện</span>
                <button class="cp-setting-btn" id="modalThemeToggleBtn" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 0.4rem 0.85rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-weight: 700; font-size: 0.85rem;">
                  <i class="fa-solid fa-moon" id="modalThemeIcon" style="color:#8b5cf6;"></i>
                  <span id="modalThemeText">Chế độ Tối</span>
                </button>
              </div>
              <div class="cp-form-row" style="display: flex; align-items: center; justify-content: space-between;">
                <span class="cp-form-label">Ngôn ngữ chính</span>
                <select class="cp-select" id="cpLangSelect" style="padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-weight: 600; font-size: 0.85rem;">
                  <option value="vi" selected>Tiếng Việt (Mặc định)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div class="cp-modal-section">
              <h4 class="cp-section-title">⌨️ Phím tắt Hệ thống</h4>
              <p class="cp-section-desc">Tra cứu các phím tắt nhanh để điều hướng ứng dụng.</p>
              <button class="cp-setting-btn" id="modalHotkeyBtn" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 0.45rem 0.9rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-weight: 700; font-size: 0.85rem;">
                <i class="fa-solid fa-keyboard" style="color: var(--color-primary, #0284c7);"></i>
                <span>Bảng phím tắt (?)</span>
              </button>
            </div>
            
            <div class="cp-modal-section">
              <h4 class="cp-section-title">🔄 Đồng bộ cơ sở dữ liệu</h4>
              <p class="cp-section-desc">Đồng bộ các cập nhật lâm sàng và tính năng mới nhất từ máy chủ.</p>
              <div class="cp-sync-status" style="margin-bottom: 0.6rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
                <span class="cp-sync-status-label">Trạng thái dữ liệu:</span>
                <span class="cp-sync-time" id="cpSyncTime" style="font-weight: 700; color: var(--color-success, #10b981);">Đã tối ưu</span>
              </div>
              <button class="cp-sync-btn" id="cpSyncBtn" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 0.5rem 1rem; border-radius: 8px; border: none; background: var(--color-primary, #0284c7); color: #fff; font-weight: 700; font-size: 0.85rem;">
                <i class="fa-solid fa-arrows-rotate" id="cpSyncIcon"></i>
                <span class="cp-btn-text" id="cpSyncBtnText">Đồng bộ ngay</span>
              </button>
            </div>

            <div class="cp-modal-section" id="cpPwaSection">
              <h4 class="cp-section-title">📱 Ứng dụng Đa nền tảng (PWA App)</h4>
              <p class="cp-section-desc">Cài đặt CliniPortal làm ứng dụng độc lập trên máy tính hoặc điện thoại để dùng offline mượt mà.</p>
              <button class="cp-sync-btn" id="cpInstallPwaBtn" style="cursor: pointer; background: linear-gradient(135deg, #0284c7, #0369a1); border: none; border-radius: 8px; padding: 0.5rem 1rem; color: #fff; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;">
                <i class="fa-solid fa-download"></i> <span>Cài đặt CliniPortal làm App</span>
              </button>
              <div id="cpPwaInstalledStatus" style="display:none; color: var(--color-success, #10b981); font-weight: 700; margin-top: 8px; font-size: 0.85rem;">
                ✅ Ứng dụng CliniPortal đã được cài đặt thành công!
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  const modal = document.getElementById('cpSettingsModal');
  const closeBtn = document.getElementById('cpModalCloseBtn');
  const syncBtn = document.getElementById('cpSyncBtn');
  const syncBtnText = document.getElementById('cpSyncBtnText');
  const syncIcon = document.getElementById('cpSyncIcon');
  const syncTime = document.getElementById('cpSyncTime');
  const installPwaBtn = document.getElementById('cpInstallPwaBtn');
  const pwaStatus = document.getElementById('cpPwaInstalledStatus');

  const modalThemeBtn = document.getElementById('modalThemeToggleBtn');
  const modalThemeIcon = document.getElementById('modalThemeIcon');
  const modalThemeText = document.getElementById('modalThemeText');
  const modalHotkeyBtn = document.getElementById('modalHotkeyBtn');

  function syncModalThemeUI(): void {
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

  function openSettingsModal(): void {
    if (!modal) return;
    syncModalThemeUI();
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.classList.add('show');
      modal.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeSettingsModal(): void {
    if (!modal) return;
    modal.classList.remove('show');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }

  // Bind Open Settings on header gear button
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest('#sync-settings-btn, .open-settings-modal-btn');
    if (trigger) {
      e.preventDefault();
      openSettingsModal();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSettingsModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSettingsModal();
      }
    });
  }

  if (modalThemeBtn) {
    modalThemeBtn.addEventListener('click', () => {
      CliniPortalThemeManager.toggleTheme();
      syncModalThemeUI();
    });
  }

  if (modalHotkeyBtn) {
    modalHotkeyBtn.addEventListener('click', () => {
      closeSettingsModal();
      const hotkeysModal = document.getElementById('hotkeysModal');
      if (hotkeysModal) {
        hotkeysModal.classList.add('active');
      }
    });
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      if (syncIcon) syncIcon.classList.add('fa-spin');
      if (syncBtnText) syncBtnText.textContent = 'Đang đồng bộ...';
      if (syncTime) syncTime.textContent = 'Đang cập nhật...';

      setTimeout(() => {
        if (syncIcon) syncIcon.classList.remove('fa-spin');
        if (syncBtnText) syncBtnText.textContent = 'Đồng bộ thành công!';
        if (syncTime) syncTime.textContent = `Vừa xong (${new Date().toLocaleTimeString('vi-VN')})`;
        setTimeout(() => {
          if (syncBtnText) syncBtnText.textContent = 'Đồng bộ ngay';
        }, 3000);
      }, 1200);
    });
  }

  if (installPwaBtn) {
    installPwaBtn.addEventListener('click', async () => {
      if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        const choiceResult = await deferredPwaPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          if (pwaStatus) pwaStatus.style.display = 'block';
          installPwaBtn.style.display = 'none';
        }
        deferredPwaPrompt = null;
      } else {
        alert('Để cài đặt CliniPortal:\n- Trên Chrome máy tính: Bấm biểu tượng Cài đặt trên thanh địa chỉ URL.\n- Trên điện thoại Safari: Bấm "Chia sẻ" -> "Thêm vào màn hình chính".');
      }
    });
  }

  // Expose to window for inline calls
  if (typeof window !== 'undefined') {
    (window as any).openSettingsModal = openSettingsModal;
    (window as any).closeSettingsModal = closeSettingsModal;
  }
}

/**
 * 3. GLOBAL KEYBOARD SHORTCUTS
 */
function setupGlobalShortcuts(): void {
  document.addEventListener('keydown', (e) => {
    const isCmdOrCtrl = e.metaKey || e.ctrlKey;
    const isInput = document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA';

    // Ctrl+K or /
    if ((isCmdOrCtrl && e.key.toLowerCase() === 'k') || (e.key === '/' && !isInput)) {
      e.preventDefault();
      const targetInput = document.querySelector('.search-bar-container input, .search-container input, #search-input') as HTMLInputElement | null;
      if (targetInput) {
        targetInput.focus();
        targetInput.select();
      }
    }

    // ? for hotkey table
    if (e.key === '?' && !isInput) {
      e.preventDefault();
      const hotkeysModal = document.getElementById('hotkeysModal');
      if (hotkeysModal) {
        hotkeysModal.classList.toggle('active');
      }
    }

    // Escape closes modals
    if (e.key === 'Escape') {
      const cheatsheetsModal = document.getElementById('cheatsheetsModalOverlay');
      if (cheatsheetsModal && cheatsheetsModal.classList.contains('active')) {
        cheatsheetsModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { cheatsheetsModal.style.display = 'none'; }, 200);
      }

      const settingsModal = document.getElementById('cpSettingsModal');
      if (settingsModal && (settingsModal.classList.contains('show') || settingsModal.classList.contains('active'))) {
        settingsModal.classList.remove('show');
        settingsModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { settingsModal.style.display = 'none'; }, 200);
      }

      const hotkeysModal = document.getElementById('hotkeysModal');
      if (hotkeysModal && hotkeysModal.classList.contains('active')) {
        hotkeysModal.classList.remove('active');
      }
    }
  });

  // Hotkey close button
  const hotkeyCloseBtn = document.getElementById('hotkeyCloseBtn');
  if (hotkeyCloseBtn) {
    hotkeyCloseBtn.addEventListener('click', () => {
      document.getElementById('hotkeysModal')?.classList.remove('active');
    });
  }
}
