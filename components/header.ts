/**
 * Header Dynamic Loader & Component (header.ts)
 * Location: components/header.ts
 * CliniPortal Framework — 100% Native TypeScript Component
 */

export function renderHeaderHtml(projectRoot = './'): string {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Mở menu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <a href="${root}#/" class="logo-brand">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#0284c7" />
            <path d="M14 6v16M8 11h12M8 17h8" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span class="logo-text">CliniPortal</span>
        </a>

        <button class="btn-back" type="button" onclick="goBack()" title="Quay lại trang trước">
          <svg class="btn-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Quay lại</span>
        </button>
      </div>

      <nav class="header-nav-modules" aria-label="Phân hệ y khoa">
        <a href="${root}#/skills" class="header-module-btn" data-route="#/skills" title="Kỹ năng Lâm sàng">
          <i class="fa-solid fa-stethoscope" style="color: var(--color-primary, #0284c7);"></i>
          <span>Kỹ năng</span>
        </a>
        <a href="${root}#/approaches" class="header-module-btn" data-route="#/approaches" title="Tiếp cận Lâm sàng">
          <i class="fa-solid fa-sitemap" style="color: #10b981;"></i>
          <span>Tiếp cận</span>
        </a>
        <a href="${root}#/calculators" class="header-module-btn" data-route="#/calculators" title="Công cụ Lâm sàng">
          <i class="fa-solid fa-calculator" style="color: #f59e0b;"></i>
          <span>Công cụ</span>
        </a>
        <a href="${root}#/pharmacology" class="header-module-btn" data-route="#/pharmacology" title="Dược lý Lâm sàng">
          <i class="fa-solid fa-pills" style="color: #ec4899;"></i>
          <span>Dược lý</span>
        </a>
        <div class="header-module-dropdown-wrapper">
          <button type="button" class="header-module-btn header-dropdown-trigger" title="Cơ sở Y khoa (Giải phẫu, Sinh lý & Sinh lý bệnh)">
            <i class="fa-solid fa-dna" style="color: #8b5cf6;"></i>
            <span>Cơ sở</span>
            <i class="fa-solid fa-chevron-down dropdown-arrow" style="font-size: 0.65rem; margin-left: 2px; opacity: 0.7;"></i>
          </button>
          <div class="header-dropdown-menu">
            <a href="${root}#/pathophysiology/giai-phau-sinh-ly" class="header-dropdown-item">
              <span class="dropdown-item-icon">🧬</span>
              <div class="dropdown-item-text">
                <strong>GP - SL</strong>
                <span>Giải phẫu & Sinh lý</span>
              </div>
            </a>
            <a href="${root}#/pathophysiology/co-che-benh-sinh" class="header-dropdown-item">
              <span class="dropdown-item-icon">🔬</span>
              <div class="dropdown-item-text">
                <strong>CCBS - SBL</strong>
                <span>Cơ chế bệnh sinh & Sinh lý bệnh</span>
              </div>
            </a>
            <a href="${root}#/pathophysiology/hoa-sinh" class="header-dropdown-item">
              <span class="dropdown-item-icon">🧪</span>
              <div class="dropdown-item-text">
                <strong>Hóa Sinh</strong>
                <span>Hóa sinh Y học & Chuyển hóa</span>
              </div>
            </a>
          </div>
        </div>
        <a href="${root}#/ebm" class="header-module-btn" data-route="#/ebm" title="Y học chứng cứ">
          <i class="fa-solid fa-flask" style="color: #06b6d4;"></i>
          <span>Chứng cứ</span>
        </a>
        <a href="${root}#/tcm" class="header-module-btn" data-route="#/tcm" title="Y học cổ truyền">
          <i class="fa-solid fa-yin-yang" style="color: #14b8a6;"></i>
          <span>Đông y</span>
        </a>
        <a href="${root}#/docspace" class="header-module-btn bento-badge-docspace" id="docspaceHeaderBtn" title="DocSpace — Không gian Riêng">
          <i class="fa-solid fa-id-badge" style="color: var(--color-primary, #0284c7);"></i>
          <span>DocSpace</span>
        </a>
      </nav>

      <div class="header-right">
        <div class="search-bar-container">
          <div class="search-container">
            <svg viewBox="0 0 24 24" class="search__icon" aria-hidden="true">
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365-7.5-7.5z" />
            </svg>
            <input class="input" type="search" placeholder="Tìm ứng dụng, phác đồ, công cụ..." aria-label="Tìm kiếm hệ sinh thái" />
            <kbd class="search-kbd-hint" title="Bấm phím Ctrl K hoặc / để tìm kiếm">Ctrl K</kbd>
          </div>
          <div class="search-results-dropdown" id="searchResultsDropdown"></div>
        </div>

        <div class="header-actions">
          <button id="sync-settings-btn" class="header-settings-btn" title="Cài đặt & Đồng bộ" aria-label="Cài đặt">
            <i class="fa-solid fa-gear"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

export function goBack(): void {
  if (window.history.length > 1 && document.referrer && !document.referrer.includes(window.location.pathname)) {
    window.history.back();
  } else {
    window.location.hash = '#/';
  }
}

export function getProjectRootPrefix(headerPath?: string): string {
  if (!headerPath) return './';
  const depth = (headerPath.match(/\.\.\//g) || []).length;
  return depth > 0 ? '../'.repeat(depth) : './';
}

export function loadHeader(): void {
  try {
    if (typeof window !== 'undefined' && (window.self !== window.top || window.location.search.includes('embedded=1'))) {
      document.documentElement.classList.add('in-iframe');
      document.documentElement.setAttribute('data-embedded', 'true');
      return;
    }
  } catch (e) {
    document.documentElement.classList.add('in-iframe');
    return;
  }

  const holder = document.getElementById('header-placeholder');
  if (!holder) return;

  const headerPath = holder.dataset.headerPath || '';
  const projectRoot = getProjectRootPrefix(headerPath);
  holder.innerHTML = renderHeaderHtml(projectRoot);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
}

if (typeof window !== 'undefined') {
  (window as any).goBack = goBack;
}
