/**
 * Header Dynamic Loader & Component (header.js)
 * Location: components/header.js
 * CliniPortal Framework — Vanilla JavaScript Fallback for Static HTML
 */

function renderHeaderHtml(projectRoot = './') {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <!-- TRÁI: Brand Logo & Mobile Toggle -->
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Mở menu điều hướng">
          <i class="fa-solid fa-bars"></i>
        </button>

        <a href="${root}index.html#/" class="logo-brand" title="Về Trang chủ CliniPortal">
          <div class="logo-icon-box">
            <i class="fa-solid fa-stethoscope"></i>
          </div>
          <div class="brand-text-group">
            <span class="logo-title">CliniPortal <span class="text-primary-accent">MedLens</span></span>
            <span class="brand-badge">CLINIPORTAL</span>
          </div>
        </a>
      </div>

      <!-- GIỮA: ZONE 2 — BỘ CHUYỂN ĐỔI 4 DỰ ÁN (PROJECT SWITCHER TABS) -->
      <div class="header-center">
        <nav class="header-project-switcher" id="headerProjectSwitcher" aria-label="Bộ chuyển đổi 4 dự án cốt lõi">
          <!-- 1. DocSpace Pro (Lâm sàng / Workstation) -->
          <a href="${root}index.html#/docspace" class="project-tab-btn tab-docspace" data-project="docspace" title="DocSpace Pro — Trực ca, Phân tầng Triage, SBAR & Ca lâm sàng">
            <span class="project-tab-icon"><i class="fa-solid fa-id-badge"></i></span>
            <span class="project-tab-name">DocSpace Pro</span>
            <span class="project-tab-pill">Workstation</span>
          </a>

          <!-- 2. Basic Sciences (Cơ sở Y khoa + Dropdown Menu) -->
          <div class="header-project-dropdown-wrapper">
            <a href="${root}index.html#/basic-medical" class="project-tab-btn tab-basic" data-project="basic" title="Cơ sở Y khoa — GP, Sinh lý, Bệnh sinh CCBS, Hóa sinh, Dịch tễ">
              <span class="project-tab-icon"><i class="fa-solid fa-dna"></i></span>
              <span class="project-tab-name">Basic Sciences</span>
              <i class="fa-solid fa-chevron-down project-dropdown-arrow" aria-hidden="true"></i>
            </a>
            <div class="project-dropdown-menu">
              <a href="${root}index.html#/basic-medical/giai-phau-sinh-ly" class="project-dropdown-item">
                <span class="pdrop-icon">🧬</span>
                <div class="pdrop-info">
                  <strong>GP - SL</strong>
                  <span>Giải phẫu & Sinh lý học</span>
                </div>
              </a>
              <a href="${root}index.html#/basic-medical/co-che-benh-sinh" class="project-dropdown-item">
                <span class="pdrop-icon">🔬</span>
                <div class="pdrop-info">
                  <strong>CCBS - SBL</strong>
                  <span>Cơ chế bệnh sinh & Sinh lý bệnh</span>
                </div>
              </a>
              <a href="${root}index.html#/basic-medical/hoa-sinh" class="project-dropdown-item">
                <span class="pdrop-icon">🧪</span>
                <div class="pdrop-info">
                  <strong>Hóa Sinh</strong>
                  <span>Hóa sinh Y học & Chuyển hóa</span>
                </div>
              </a>
              <a href="${root}index.html#/basic-medical/dich-te-hoc" class="project-dropdown-item">
                <span class="pdrop-icon">🦠</span>
                <div class="pdrop-info">
                  <strong>Dịch Tễ</strong>
                  <span>Dịch tễ học & Y tế công cộng</span>
                </div>
              </a>
            </div>
          </div>

          <!-- 3. Knowledge Vault (Kho Tri Thức 14 Chuyên Khoa) -->
          <a href="${root}index.html#/vault" class="project-tab-btn tab-vault" data-project="vault" title="Knowledge Vault — 14 Kho chuyên khoa, Chuỗi CRCF & Phác đồ">
            <span class="project-tab-icon"><i class="fa-solid fa-book-open"></i></span>
            <span class="project-tab-name">Knowledge Vault</span>
            <span class="project-tab-pill">2.4k+</span>
          </a>

          <!-- 4. EBM Suite (Y Học Chứng Cứ & Guidelines) -->
          <a href="${root}index.html#/ebm" class="project-tab-btn tab-ebm" data-project="ebm" title="Y Học Chứng Cứ — Tháp 6S Haynes, Phác đồ Bộ Y Tế & Radar Diff">
            <span class="project-tab-icon"><i class="fa-solid fa-scale-balanced"></i></span>
            <span class="project-tab-name">EBM Suite</span>
            <span class="project-tab-pill">Chứng Cứ</span>
          </a>
        </nav>
      </div>

      <!-- PHẢI: Search, Theme, Doctor Profile & Settings -->
      <div class="header-right">
        <button class="header-bookmark-btn" id="headerBookmarkBtn" onclick="window.CliniPortalBookmarks && window.CliniPortalBookmarks.open()" aria-label="Tủ bài viết đã lưu" title="Tủ bài viết đã lưu">
          <i class="fa-solid fa-bookmark"></i>
        </button>
        <button class="theme-toggle-btn" id="themeToggleBtn" aria-label="Chuyển đổi giao diện Sáng/Tối" title="Chuyển giao diện Sáng/Tối">
          <i class="fa-solid fa-moon"></i>
        </button>

        <!-- Doctor User Profile Chip (DocSpace Style) -->
        <a href="${root}index.html#/docspace" class="doctor-profile-badge" id="doctorProfileBadge" title="Thông tin Bác sĩ Lâm sàng & Phiên làm việc">
          <div class="doctor-avatar">Đ</div>
          <div class="doctor-meta">
            <span class="doctor-name">BS.CKII Nguyễn Văn ...</span>
            <span class="doctor-sub">Tim mạch & Cấp cứu</span>
          </div>
        </a>
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

  // Đồng bộ 4 tab dự án trên Header Desktop (Zone 2)
  document.querySelectorAll('.header-project-switcher .project-tab-btn').forEach(tab => {
    const project = tab.getAttribute('data-project');
    let isMatch = false;

    if (project === 'basic') {
      isMatch = currentPath.includes('sinh lý') || currentPath.includes('basic') || currentPath.includes('pathophysiology') || currentHash.includes('basic') || currentHash.includes('pathophysiology');
    } else if (project === 'ebm') {
      isMatch = currentPath.includes('ebm') || currentPath.includes('yhcc') || currentPath.includes('guidelines') || currentHash.includes('ebm') || currentHash.includes('guidelines');
    } else if (project === 'docspace') {
      isMatch = currentPath.includes('docspace') || currentHash.includes('docspace');
    } else if (project === 'vault') {
      isMatch = currentPath.includes('vault') || currentPath.includes('knowledge') || currentHash.includes('knowledge-vault') || currentHash.includes('vault');
    }

    if (isMatch) {
      tab.classList.add('active');
      tab.setAttribute('aria-current', 'page');
    } else {
      tab.classList.remove('active');
      tab.removeAttribute('aria-current');
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

