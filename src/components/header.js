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
        <div class="header-module-dropdown-wrapper">
          <button type="button" class="header-module-btn header-dropdown-trigger" title="Cơ sở Y khoa (Giải phẫu, Sinh lý, Cơ chế bệnh sinh & Hóa sinh)">
            <i class="fa-solid fa-dna" style="color: #8b5cf6;"></i>
            <span>Cơ sở</span>
            <i class="fa-solid fa-chevron-down dropdown-arrow" style="font-size: 0.65rem; margin-left: 2px; opacity: 0.7;"></i>
          </button>
          <div class="header-dropdown-menu">
            <a href="${root}index.html#/pathophysiology/giai-phau-sinh-ly" class="header-dropdown-item">
              <span class="dropdown-item-icon">🧬</span>
              <div class="dropdown-item-text">
                <strong>GP - SL</strong>
                <span>Giải phẫu & Sinh lý</span>
              </div>
            </a>
            <a href="${root}index.html#/pathophysiology/co-che-benh-sinh" class="header-dropdown-item">
              <span class="dropdown-item-icon">🔬</span>
              <div class="dropdown-item-text">
                <strong>CCBS - SBL</strong>
                <span>Cơ chế bệnh sinh & Sinh lý bệnh</span>
              </div>
            </a>
            <a href="${root}index.html#/basic-medical/hoa-sinh" class="header-dropdown-item">
              <span class="dropdown-item-icon">🧪</span>
              <div class="dropdown-item-text">
                <strong>Hóa Sinh</strong>
                <span>Hóa sinh Y học & Chuyển hóa</span>
              </div>
            </a>
            <a href="${root}index.html#/basic-medical/dich-te-hoc" class="header-dropdown-item">
              <span class="dropdown-item-icon">🦠</span>
              <div class="dropdown-item-text">
                <strong>Dịch Tễ</strong>
                <span>Dịch tễ học & Y tế công cộng</span>
              </div>
            </a>
          </div>
        </div>

        <a href="${root}index.html#/ebm" class="header-module-btn" data-route="#/ebm" title="Y học chứng cứ & Kho Guidelines">
          <i class="fa-solid fa-flask" style="color: #06b6d4;"></i>
          <span>Chứng cứ</span>
        </a>

        <a href="${root}index.html#/docspace" class="header-module-btn bento-badge-docspace" id="docspaceHeaderBtn" title="DocSpace — Không gian Lâm sàng Tích hợp & Command Bar (Ctrl+K)">
          <i class="fa-solid fa-id-badge" style="color: var(--color-primary, #0284c7);"></i>
          <span>DocSpace Pro</span>
        </a>
      </nav>

      <div class="header-right">
        <button class="header-bookmark-btn" id="headerBookmarkBtn" onclick="window.CliniPortalBookmarks && window.CliniPortalBookmarks.open()" aria-label="Tủ bài viết đã lưu" title="Tủ bài viết đã lưu">
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Chuyển đổi giao diện Sáng/Tối" title="Chuyển giao diện Sáng/Tối">
          <i class="fa-solid fa-moon"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar (Phương án B: khớp 1:1 với src/content) -->
    <nav class="mobile-bottom-nav" id="mobileBottomNav" aria-label="Điều hướng chính trên di động">
      <a href="${root}index.html#/" class="bottom-nav-item" data-nav-route="home" aria-label="Trang chủ">
        <div class="bottom-nav-icon-wrapper">
          <i class="fa-solid fa-house"></i>
        </div>
        <span class="bottom-nav-label">Trang chủ</span>
      </a>
      <a href="${root}index.html#/basic-medical" class="bottom-nav-item" data-nav-route="basic" aria-label="Cơ sở Y khoa (GP, SL, Hóa sinh, Dịch tễ)">
        <div class="bottom-nav-icon-wrapper">
          <i class="fa-solid fa-dna"></i>
        </div>
        <span class="bottom-nav-label">Cơ sở</span>
      </a>
      <a href="${root}index.html#/ebm" class="bottom-nav-item" data-nav-route="ebm" aria-label="Y học Chứng cứ & Guidelines">
        <div class="bottom-nav-icon-wrapper">
          <i class="fa-solid fa-flask"></i>
        </div>
        <span class="bottom-nav-label">Chứng cứ</span>
      </a>
      <a href="${root}index.html#/docspace" class="bottom-nav-item" data-nav-route="docspace" aria-label="DocSpace Pro">
        <div class="bottom-nav-icon-wrapper">
          <i class="fa-solid fa-id-badge"></i>
        </div>
        <span class="bottom-nav-label">DocSpace</span>
      </a>
      <a href="${root}index.html#/knowledge-vault" class="bottom-nav-item" data-nav-route="vault" aria-label="Kho Tri thức Knowledge Vault">
        <div class="bottom-nav-icon-wrapper">
          <i class="fa-solid fa-book-bookmark"></i>
        </div>
        <span class="bottom-nav-label">Kho Vault</span>
      </a>
    </nav>
  `;
}

function syncHeaderBottomNavActive() {
  const currentPath = window.location.pathname.toLowerCase();
  const currentHash = (window.location.hash || '').toLowerCase();

  document.querySelectorAll('.mobile-bottom-nav .bottom-nav-item').forEach(item => {
    const route = item.getAttribute('data-nav-route');
    let isMatch = false;

    if (route === 'home') {
      isMatch = (currentHash === '' || currentHash === '#/' || currentHash === '#') && currentPath.endsWith('index.html');
    } else if (route === 'basic') {
      isMatch = currentPath.includes('sinh lý') || currentPath.includes('basic') || currentPath.includes('pathophysiology') || currentHash.includes('basic') || currentHash.includes('pathophysiology');
    } else if (route === 'ebm') {
      isMatch = currentPath.includes('ebm') || currentPath.includes('yhcc') || currentPath.includes('guidelines') || currentHash.includes('ebm') || currentHash.includes('guidelines');
    } else if (route === 'docspace') {
      isMatch = currentPath.includes('docspace') || currentHash.includes('docspace');
    } else if (route === 'vault') {
      isMatch = currentPath.includes('vault') || currentPath.includes('knowledge') || currentHash.includes('knowledge-vault') || currentHash.includes('vault');
    }

    if (isMatch) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    } else {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    }
  });
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

  // Sync active state
  syncHeaderBottomNavActive();
  window.addEventListener('hashchange', syncHeaderBottomNavActive);
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

