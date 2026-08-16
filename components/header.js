/**
 * Header Dynamic Loader & Component (header.js)
 * Location: components/header.js
 * CliniPortal Framework — Vanilla JavaScript Fallback for Static HTML
 */

function renderHeaderHtml(projectRoot = './') {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Mở menu">
          <i class="fa-solid fa-bars"></i>
        </button>

        <a href="${root}index.html#/" class="logo-brand">
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
        <a href="${root}index.html#/skills" class="header-module-btn" data-route="#/skills" title="Kỹ năng Lâm sàng">
          <i class="fa-solid fa-stethoscope" style="color: var(--color-primary, #0284c7);"></i>
          <span>Kỹ năng</span>
        </a>
        <a href="${root}index.html#/approaches" class="header-module-btn" data-route="#/approaches" title="Tiếp cận Lâm sàng">
          <i class="fa-solid fa-sitemap" style="color: #10b981;"></i>
          <span>Tiếp cận</span>
        </a>
        <a href="${root}index.html#/calculators" class="header-module-btn" data-route="#/calculators" title="Công cụ Tính toán">
          <i class="fa-solid fa-calculator" style="color: #f59e0b;"></i>
          <span>Công cụ</span>
        </a>
        <a href="${root}index.html#/pharmacology" class="header-module-btn" data-route="#/pharmacology" title="Dược lý Lâm sàng">
          <i class="fa-solid fa-pills" style="color: #ef4444;"></i>
          <span>Dược lý</span>
        </a>
        <a href="${root}index.html#/pathophysiology" class="header-module-btn" data-route="#/pathophysiology" title="Sinh lý - Bệnh học">
          <i class="fa-solid fa-dna" style="color: #8b5cf6;"></i>
          <span>Sinh lý - SLB</span>
        </a>
        <a href="${root}index.html#/ebm" class="header-module-btn" data-route="#/ebm" title="Y học Chứng cứ & Guidelines">
          <i class="fa-solid fa-book-medical" style="color: #06b6d4;"></i>
          <span>Y học chứng cứ</span>
        </a>
        <a href="${root}index.html#/tcm" class="header-module-btn" data-route="#/tcm" title="Y học Cổ truyền">
          <i class="fa-solid fa-yin-yang" style="color: #ec4899;"></i>
          <span>YHCT</span>
        </a>
      </nav>

      <div class="header-right">
        <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Chuyển đổi giao diện Sáng/Tối" title="Chuyển giao diện Sáng/Tối">
          <i class="fa-solid fa-moon"></i>
        </button>
      </div>
    </header>
  `;
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.hash = '#/';
  }
}

function getProjectRootPrefix(headerPath) {
  if (!headerPath) return './';
  const depth = (headerPath.match(/\.\.\//g) || []).length;
  return depth > 0 ? '../'.repeat(depth) : './';
}

function loadHeader() {
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
  window.goBack = goBack;
}
