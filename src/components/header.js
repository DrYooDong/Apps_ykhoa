/**
 * Header Dynamic Loader & Component (header.js)
 * Location: components/header.js
 * CliniPortal Framework — Vanilla JavaScript Fallback for Static HTML
 */

function renderHeaderHtml(projectRoot = './') {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <!-- TRÁI: Brand & Live Knowledge Stats -->
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

        <div class="live-knowledge-stats" title="Quy mô cơ sở dữ liệu y khoa trực tiếp">
          <span class="live-dot-pulse"></span>
          <span>Tri thức:</span>
          <b>14</b> bệnh · <b>92</b> từ vựng · <span class="stat-blue">2.400+</span> bài Vault · <span class="stat-rose">78</span> Guidelines
        </div>
      </div>

      <!-- GIỮA: 4 Nút Trợ Thủ Lâm Sàng + Luồng Thông Liên Phân Hệ -->
      <div class="header-center">
        <div class="clinical-shortcuts-strip" aria-label="Lối tắt lâm sàng">
          <a href="${root}index.html#/ebm/kho-guidelines" class="shortcut-chip chip-guidelines" title="Kho Guidelines EBM">
            <span>📚</span><span>Guidelines</span>
          </a>
          <a href="${root}index.html#/calculators" class="shortcut-chip chip-tools" title="Kho Công cụ & Thang điểm CDSS">
            <span>🧮</span><span>Công cụ</span>
          </a>
          <a href="${root}index.html#/docspace" class="shortcut-chip chip-icd" title="Kho ICD-10 & BHYT">
            <span>🏷️</span><span>ICD-10</span>
          </a>
          <a href="${root}index.html#/docspace" class="shortcut-chip chip-cdss" title="Kho CDSS Hỗ trợ quyết định lâm sàng">
            <span>⚡</span><span>CDSS</span>
          </a>
        </div>

        <div class="header-v-divider" aria-hidden="true"></div>

        <nav class="header-nav-bridges" aria-label="Phân hệ chính">
          <a href="${root}index.html#/vault" class="nav-bridge-btn bridge-vault" title="Kho Tri thức Y khoa Toàn diện Knowledge Vault">
            <i class="fa-solid fa-book-open"></i>
            <span>Kho tri thức</span>
          </a>
          <a href="${root}index.html#/docspace" class="nav-bridge-btn bridge-cases" title="DocSpace & Kho ca lâm sàng">
            <i class="fa-solid fa-notes-medical"></i>
            <span>Kho ca lâm sàng</span>
            <span class="bridge-pulse-dot" title="Đồng bộ thời gian thực"></span>
          </a>
          <div class="header-module-dropdown-wrapper">
            <button type="button" class="nav-bridge-btn bridge-basic header-dropdown-trigger" title="Cơ sở Y khoa (GP, Sinh lý, CCBS, Hóa sinh, Dịch tễ)">
              <i class="fa-solid fa-dna" style="color: #8b5cf6;"></i>
              <span>Cơ sở</span>
              <i class="fa-solid fa-chevron-down dropdown-arrow" style="font-size: 0.62rem; margin-left: 1px; opacity: 0.7;"></i>
            </button>
            <div class="header-dropdown-menu">
              <a href="${root}index.html#/basic-medical/giai-phau-sinh-ly" class="header-dropdown-item">
                <span class="dropdown-item-icon">🧬</span>
                <div class="dropdown-item-text">
                  <strong>GP - SL</strong>
                  <span>Giải phẫu & Sinh lý</span>
                </div>
              </a>
              <a href="${root}index.html#/basic-medical/co-che-benh-sinh" class="header-dropdown-item">
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

