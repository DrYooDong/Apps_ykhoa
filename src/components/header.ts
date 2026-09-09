/**
 * Header Dynamic Loader & Component (header.ts)
 * Location: components/header.ts
 * CliniPortal Framework — 100% Native TypeScript Component
 */

export function renderHeaderHtml(projectRoot = './'): string {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <!-- TRÁI: Brand Logo & Mobile Toggle -->
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Mở menu điều hướng">
          <i class="fa-solid fa-bars"></i>
        </button>

        <a href="${root}#/" class="logo-brand" title="Về Trang chủ CliniPortal">
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
          <a href="${root}#/docspace" class="project-tab-btn tab-docspace" data-project="docspace" title="DocSpace Pro — Trực ca, Phân tầng Triage, SBAR & Ca lâm sàng">
            <span class="project-tab-icon"><i class="fa-solid fa-id-badge"></i></span>
            <span class="project-tab-name">DocSpace Pro</span>
            <span class="project-tab-pill">Workstation</span>
          </a>

          <!-- 2. Basic Sciences (Cơ sở Y khoa + Dropdown Menu) -->
          <div class="header-project-dropdown-wrapper">
            <a href="${root}#/basic-medical" class="project-tab-btn tab-basic" data-project="basic" title="Cơ sở Y khoa — GP, Sinh lý, Bệnh sinh CCBS, Hóa sinh, Dịch tễ">
              <span class="project-tab-icon"><i class="fa-solid fa-dna"></i></span>
              <span class="project-tab-name">Basic Sciences</span>
              <i class="fa-solid fa-chevron-down project-dropdown-arrow" aria-hidden="true"></i>
            </a>
            <div class="project-dropdown-menu">
              <a href="${root}#/basic-medical/giai-phau-sinh-ly" class="project-dropdown-item">
                <span class="pdrop-icon">🧬</span>
                <div class="pdrop-info">
                  <strong>GP - SL</strong>
                  <span>Giải phẫu & Sinh lý học</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/co-che-benh-sinh" class="project-dropdown-item">
                <span class="pdrop-icon">🔬</span>
                <div class="pdrop-info">
                  <strong>CCBS - SBL</strong>
                  <span>Cơ chế bệnh sinh & Sinh lý bệnh</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/hoa-sinh" class="project-dropdown-item">
                <span class="pdrop-icon">🧪</span>
                <div class="pdrop-info">
                  <strong>Hóa Sinh</strong>
                  <span>Hóa sinh Y học & Chuyển hóa</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/dich-te-hoc" class="project-dropdown-item">
                <span class="pdrop-icon">🦠</span>
                <div class="pdrop-info">
                  <strong>Dịch Tễ</strong>
                  <span>Dịch tễ học & Y tế công cộng</span>
                </div>
              </a>
            </div>
          </div>

          <!-- 3. Knowledge Vault (Kho Tri Thức 14 Chuyên Khoa) -->
          <a href="${root}#/vault" class="project-tab-btn tab-vault" data-project="vault" title="Knowledge Vault — 14 Kho chuyên khoa, Chuỗi CRCF & Phác đồ">
            <span class="project-tab-icon"><i class="fa-solid fa-book-open"></i></span>
            <span class="project-tab-name">Knowledge Vault</span>
            <span class="project-tab-pill">2.4k+</span>
          </a>

          <!-- 4. EBM Suite (Y Học Chứng Cứ & Guidelines) -->
          <a href="${root}#/ebm" class="project-tab-btn tab-ebm" data-project="ebm" title="Y Học Chứng Cứ — Tháp 6S Haynes, Phác đồ Bộ Y Tế & Radar Diff">
            <span class="project-tab-icon"><i class="fa-solid fa-scale-balanced"></i></span>
            <span class="project-tab-name">EBM Suite</span>
            <span class="project-tab-pill">Chứng Cứ</span>
          </a>
        </nav>
      </div>

      <!-- PHẢI: Search, Theme, Doctor Profile & Settings -->
      <div class="header-right">
        <div class="search-bar-container">
          <div class="search-container">
            <svg viewBox="0 0 24 24" class="search__icon" aria-hidden="true">
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365-7.5-7.5-7.5-7.5 3.365-7.5 7.5z" />
            </svg>
            <input class="input" type="search" placeholder="Tìm kiếm hệ sinh thái..." aria-label="Tìm kiếm hệ sinh thái" />
            <kbd class="search-kbd-hint" title="Bấm phím Ctrl K hoặc / để tìm kiếm">Ctrl K</kbd>
          </div>
          <div class="search-results-dropdown" id="searchResultsDropdown"></div>
        </div>

        <div class="header-actions">
          <button id="themeToggleBtn" class="header-settings-btn theme-toggle-btn theme-toggle-trigger" title="Chuyển đổi Chế độ Sáng / Tối" aria-label="Chuyển đổi giao diện Sáng / Tối">
            <i class="fa-solid fa-moon"></i>
          </button>

          <!-- Doctor User Profile Chip (DocSpace Style) -->
          <a href="${root}#/docspace" class="doctor-profile-badge" id="doctorProfileBadge" title="Thông tin Bác sĩ Lâm sàng & Phiên làm việc">
            <div class="doctor-avatar">Đ</div>
            <div class="doctor-meta">
              <span class="doctor-name">BS.CKII Nguyễn Văn ...</span>
              <span class="doctor-sub">Tim mạch & Cấp cứu</span>
            </div>
          </a>

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
