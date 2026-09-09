/**
 * Header Dynamic Loader & Component (header.ts)
 * Location: components/header.ts
 * CliniPortal Framework — 100% Native TypeScript Component
 */

export function renderHeaderHtml(projectRoot = './'): string {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';

  return `
    <header class="global-header" id="siteHeader">
      <!-- TRÁI: Brand & Live Knowledge Stats -->
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

        <div class="live-knowledge-stats" title="Quy mô cơ sở dữ liệu y khoa trực tiếp">
          <span class="live-dot-pulse"></span>
          <span>Tri thức:</span>
          <b>14</b> bệnh · <b>92</b> từ vựng · <span class="stat-blue">2.400+</span> bài Vault · <span class="stat-rose">78</span> Guidelines
        </div>
      </div>

      <!-- GIỮA: 4 Nút Trợ Thủ Lâm Sàng + Luồng Thông Liên Phân Hệ -->
      <div class="header-center">
        <div class="clinical-shortcuts-strip" aria-label="Lối tắt lâm sàng">
          <a href="${root}#/ebm/kho-guidelines" class="shortcut-chip chip-guidelines" title="Kho Guidelines EBM">
            <span>📚</span><span>Guidelines</span>
          </a>
          <a href="${root}#/calculators" class="shortcut-chip chip-tools" title="Kho Công cụ & Thang điểm CDSS">
            <span>🧮</span><span>Công cụ</span>
          </a>
          <a href="${root}#/docspace" class="shortcut-chip chip-icd" title="Kho ICD-10 & BHYT">
            <span>🏷️</span><span>ICD-10</span>
          </a>
          <a href="${root}#/docspace" class="shortcut-chip chip-cdss" title="Kho CDSS Hỗ trợ quyết định lâm sàng">
            <span>⚡</span><span>CDSS</span>
          </a>
        </div>

        <div class="header-v-divider" aria-hidden="true"></div>

        <nav class="header-nav-bridges" aria-label="Phân hệ chính">
          <a href="${root}#/vault" class="nav-bridge-btn bridge-vault" title="Kho Tri thức Y khoa Toàn diện Knowledge Vault">
            <i class="fa-solid fa-book-open"></i>
            <span>Kho tri thức</span>
          </a>
          <a href="${root}#/docspace" class="nav-bridge-btn bridge-cases" title="DocSpace & Kho ca lâm sàng">
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
              <a href="${root}#/basic-medical/giai-phau-sinh-ly" class="header-dropdown-item">
                <span class="dropdown-item-icon">🧬</span>
                <div class="dropdown-item-text">
                  <strong>GP - SL</strong>
                  <span>Giải phẫu & Sinh lý</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/co-che-benh-sinh" class="header-dropdown-item">
                <span class="dropdown-item-icon">🔬</span>
                <div class="dropdown-item-text">
                  <strong>CCBS - SBL</strong>
                  <span>Cơ chế bệnh sinh & Sinh lý bệnh</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/hoa-sinh" class="header-dropdown-item">
                <span class="dropdown-item-icon">🧪</span>
                <div class="dropdown-item-text">
                  <strong>Hóa Sinh</strong>
                  <span>Hóa sinh Y học & Chuyển hóa</span>
                </div>
              </a>
              <a href="${root}#/basic-medical/dich-te-hoc" class="header-dropdown-item">
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
