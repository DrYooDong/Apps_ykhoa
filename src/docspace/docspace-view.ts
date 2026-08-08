/**
 * DocSpace — Dashboard View
 * Hub chính: Profile selector + Stats + Navigation
 */

import { getActiveProfile, getAllProfiles, createProfile, setActiveProfile, exportProfile, getStats } from './storage';
import { DoctorProfile, DocSpaceNavItem } from './types';

export const DSP_NAV_ITEMS: DocSpaceNavItem[] = [
  { id: 'dashboard', label: 'Tổng quan',      href: '#/docspace',          icon: 'fa-solid fa-house-medical',    phase: 1 },
  { id: 'patients',  label: 'Bệnh nhân',      href: '#/docspace/patients', icon: 'fa-solid fa-users',            phase: 1 },
  { id: 'soap',      label: 'Sổ Tay SOAP',    href: '#/docspace/soap',     icon: 'fa-solid fa-notes-medical',   phase: 1 },
  { id: 'sbar',      label: 'SBAR',           href: '#/docspace/sbar',     icon: 'fa-solid fa-file-waveform',    phase: 1 },
  { id: 'oncall',    label: 'Checklist công việc', href: '#/docspace/oncall', icon: 'fa-solid fa-list-check',      phase: 1 },
  { id: 'cases',     label: 'Ca Bệnh',        href: '#/docspace/cases',    icon: 'fa-solid fa-stethoscope',      phase: 1 },
  { id: 'notes',     label: 'Ghi chú',        href: '#/docspace/notes',    icon: 'fa-solid fa-note-sticky',      phase: 1 },
  { id: 'drugs',     label: 'Nhật ký Thuốc',  href: '#/docspace/drugs',    icon: 'fa-solid fa-pills',            phase: 1 },
  { id: 'protocol',  label: 'Phác đồ Riêng',  href: '#/docspace/protocol', icon: 'fa-solid fa-clipboard-list',   phase: 1 },
  { id: 'dependency-map', label: 'Bản đồ Phụ thuộc (Core & Content)', href: '#/docspace/dependency-map', icon: 'fa-solid fa-diagram-project', phase: 1 },
  { id: 'living-protocols', label: 'Phác đồ Động', href: '#/docspace/living-protocols', icon: 'fa-solid fa-network-wired', phase: 3 },
  { id: 'sandbox',   label: 'Sandbox Mô phỏng', href: '#/docspace/sandbox', icon: 'fa-solid fa-flask',            phase: 3 },
  { id: 'links',     label: 'Liên kết nhanh', href: '#/docspace/links',    icon: 'fa-solid fa-link',             phase: 1 },
  { id: 'sync-settings', label: 'Đồng bộ Đa thiết bị', href: '#/docspace/sync-settings', icon: 'fa-solid fa-cloud-arrow-up', phase: 1 },
];

// ─── Profile Selector Screen ─────────────────────────────────────

export function renderProfileSelector(): string {
  const profiles = getAllProfiles();
  const profileCards = profiles.length
    ? profiles.map(p => `
        <button class="dsp-profile-card" data-profile-id="${p.id}" id="select-profile-${p.id}">
          <div class="dsp-avatar">${getInitials(p.displayName)}</div>
          <div class="dsp-profile-info">
            <div class="dsp-profile-name">${p.displayName}</div>
            <div class="dsp-profile-meta">${p.specialty || 'Bác sĩ'} · ${p.id}</div>
            <div class="dsp-profile-date">Hoạt động ${formatRelativeDate(p.lastActiveAt)}</div>
          </div>
          <i class="fa-solid fa-chevron-right dsp-profile-arrow"></i>
        </button>
      `).join('')
    : `<div class="dsp-empty-profiles">
         <i class="fa-regular fa-user-circle"></i>
         <p>Chưa có hồ sơ nào. Tạo hồ sơ mới để bắt đầu.</p>
       </div>`;

  return `
    <div class="dsp-profile-selector" id="dspProfileSelector">
      <div class="dsp-profile-selector-inner">
        <!-- Header -->
        <div class="dsp-selector-header">
          <div class="dsp-logo-mark">
            <i class="fa-solid fa-id-badge"></i>
          </div>
          <h1 class="dsp-selector-title">DocSpace</h1>
          <p class="dsp-selector-subtitle">Không gian riêng của bác sĩ — chọn hồ sơ để bắt đầu</p>
        </div>

        <!-- Existing profiles -->
        ${profiles.length > 0 ? `
          <div class="dsp-profiles-list">
            <div class="dsp-section-label">Hồ sơ của bạn</div>
            ${profileCards}
          </div>
        ` : profileCards}

        <!-- Create new -->
        <div class="dsp-create-profile-section">
          <div class="dsp-section-label">${profiles.length > 0 ? 'Hoặc tạo hồ sơ mới' : 'Tạo hồ sơ mới'}</div>
          <form class="dsp-create-form" id="dspCreateProfileForm" novalidate>
            <div class="dsp-form-row">
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewId">ID hồ sơ <span class="dsp-required">*</span></label>
                <input class="dsp-input" type="text" id="dspNewId" placeholder="VD: NguyenVanA_BV108"
                  pattern="[A-Za-z0-9_-]+" maxlength="40" required
                  title="Chỉ dùng chữ, số, _ hoặc -" />
                <span class="dsp-hint">Dùng để phân biệt dữ liệu — không thay đổi được sau khi tạo</span>
              </div>
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewName">Tên hiển thị <span class="dsp-required">*</span></label>
                <input class="dsp-input" type="text" id="dspNewName" placeholder="VD: BS. Nguyễn Văn A"
                  maxlength="60" required />
              </div>
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewSpecialty">Chuyên khoa</label>
                <input class="dsp-input" type="text" id="dspNewSpecialty" placeholder="VD: Nội tổng quát, ICU, Nhi..." maxlength="50" />
              </div>
            </div>
            <button class="dsp-btn dsp-btn-primary" type="submit" id="dspCreateBtn">
              <i class="fa-solid fa-plus"></i> Tạo Hồ sơ & Vào DocSpace
            </button>
          </form>
        </div>

        <!-- Import -->
        <div class="dsp-import-section">
          <label class="dsp-btn dsp-btn-ghost" id="dspImportLabel" for="dspImportFile">
            <i class="fa-solid fa-file-import"></i> Nhập hồ sơ từ file JSON
          </label>
          <input type="file" id="dspImportFile" accept=".json" style="display:none" />
          
          <label class="dsp-btn dsp-btn-ghost" id="dspImportFhirLabel" for="dspImportFhirFile">
            <i class="fa-solid fa-file-medical"></i> Nhập từ HL7 FHIR
          </label>
          <input type="file" id="dspImportFhirFile" accept=".json" style="display:none" />
        </div>
      </div>
    </div>
  `;
}

// ─── Dashboard (after profile selected) ──────────────────────────

export async function renderDashboard(profile: DoctorProfile): Promise<string> {
  const stats = await getStats(profile.id);
  const activeShiftInfo = ''; // Could show active shift if any

  let backupBanner = '';
  if (stats.lastBackupDays !== null && stats.lastBackupDays > 3) {
    backupBanner = `
      <div style="background: var(--color-warning); color: #000; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong><i class="fa-solid fa-triangle-exclamation"></i> Cảnh báo sao lưu:</strong> 
          Đã ${stats.lastBackupDays} ngày chưa sao lưu dữ liệu. Hãy xuất dữ liệu để đảm bảo an toàn.
        </div>
        <button class="dsp-btn dsp-btn-sm" onclick="document.getElementById('dspExportBtn').click()" style="background: #000; color: #fff;">
          Sao lưu ngay
        </button>
      </div>
    `;
  }

  return `
    <div class="dsp-layout" id="dspLayout">
      <!-- Sidebar -->
      ${renderSidebar(profile, 'dashboard')}

      <!-- Main Content -->
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'dashboard')}

        <div class="dsp-page-content">

          ${backupBanner}
          
          <!-- Hero Greeting Card -->
          <div class="dsp-greeting">
            <div class="dsp-greeting-left">
              <div class="dsp-avatar dsp-avatar--hero">${getInitials(profile.displayName)}</div>
              <div class="dsp-greeting-text">
                <h1 class="dsp-page-title">
                  Chào mừng, <span class="dsp-doctor-name">${profile.displayName}</span>
                </h1>
                <p class="dsp-page-subtitle">
                  <span class="dsp-spec-pill"><i class="fa-solid fa-user-doctor"></i> ${profile.specialty || 'Bác sĩ Lâm sàng'}</span>
                  <code class="dsp-id-badge"><i class="fa-solid fa-fingerprint"></i> ${profile.id}</code>
                </p>
              </div>
            </div>
            
            <div class="dsp-greeting-actions">
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspExportBtn" title="Xuất dữ liệu">
                <i class="fa-solid fa-file-export"></i> Xuất dữ liệu
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspExportFhirBtn" title="Xuất chuẩn HL7 FHIR">
                <i class="fa-solid fa-file-medical"></i> Xuất FHIR
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspSwitchProfileBtn">
                <i class="fa-solid fa-repeat"></i> Đổi hồ sơ
              </button>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="dsp-stats-grid">
            <a href="#/docspace/sbar" class="dsp-stat-card dsp-stat-sbar">
              <div class="dsp-stat-icon"><i class="fa-solid fa-file-waveform"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.sbarCount}</div>
                <div class="dsp-stat-label">SBAR đã tạo</div>
              </div>
            </a>
            <a href="#/docspace/oncall" class="dsp-stat-card dsp-stat-oncall">
              <div class="dsp-stat-icon"><i class="fa-solid fa-list-check"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.shiftCount}</div>
                <div class="dsp-stat-label">Checklist trực</div>
              </div>
            </a>
            <a href="#/docspace/cases" class="dsp-stat-card dsp-stat-case">
              <div class="dsp-stat-icon"><i class="fa-solid fa-stethoscope"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.caseCount}</div>
                <div class="dsp-stat-label">Ca bệnh đã log</div>
              </div>
            </a>
            <a href="#/docspace/notes" class="dsp-stat-card dsp-stat-notes">
              <div class="dsp-stat-icon"><i class="fa-solid fa-note-sticky"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.noteCount}</div>
                <div class="dsp-stat-label">Ghi chú cá nhân</div>
              </div>
            </a>
            <a href="#/docspace/drugs" class="dsp-stat-card dsp-stat-drugs">
              <div class="dsp-stat-icon"><i class="fa-solid fa-pills"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.drugCount}</div>
                <div class="dsp-stat-label">Nhật ký thuốc</div>
              </div>
            </a>
            <a href="#/docspace/protocol" class="dsp-stat-card dsp-stat-protocol">
              <div class="dsp-stat-icon"><i class="fa-solid fa-clipboard-list"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.protocolCount}</div>
                <div class="dsp-stat-label">Phác đồ cá nhân</div>
              </div>
            </a>
          </div>

          <!-- Main Dashboard Panel Layout -->
          <div class="dsp-dashboard-grid">
            
            <!-- Quick Actions Card -->
            <div class="dsp-section-card">
              <div class="dsp-section-header">
                <h2 class="dsp-section-title"><i class="fa-solid fa-bolt" style="color:var(--color-primary);"></i> Thao tác nhanh</h2>
                <span class="dsp-section-badge">Tạo mới &amp; Khởi chạy</span>
              </div>
              <div class="dsp-quick-actions">
                <a href="#/docspace/sbar" class="dsp-action-card" id="qa-new-sbar">
                  <div class="dsp-action-icon"><i class="fa-solid fa-file-waveform"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Tạo SBAR</span>
                    <span class="dsp-action-desc">Báo cáo ca bệnh</span>
                  </div>
                </a>
                <a href="#/docspace/oncall" class="dsp-action-card" id="qa-new-shift">
                  <div class="dsp-action-icon"><i class="fa-solid fa-list-check"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Checklist công việc</span>
                    <span class="dsp-action-desc">Ca trực &amp; Nhiệm vụ</span>
                  </div>
                </a>
                <a href="#/docspace/cases" class="dsp-action-card" id="qa-new-case">
                  <div class="dsp-action-icon"><i class="fa-solid fa-stethoscope"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Ghi Ca bệnh</span>
                    <span class="dsp-action-desc">Lưu thông tin lâm sàng</span>
                  </div>
                </a>
                <a href="#/docspace/notes" class="dsp-action-card" id="qa-new-note">
                  <div class="dsp-action-icon"><i class="fa-solid fa-note-sticky"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Tạo Ghi chú</span>
                    <span class="dsp-action-desc">Ghi chép nhanh</span>
                  </div>
                </a>
                <a href="#/docspace/drugs" class="dsp-action-card" id="qa-new-drug">
                  <div class="dsp-action-icon"><i class="fa-solid fa-pills"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Nhật ký Thuốc</span>
                    <span class="dsp-action-desc">Phác đồ điều trị</span>
                  </div>
                </a>
                <a href="#/docspace/protocol" class="dsp-action-card" id="qa-new-protocol">
                  <div class="dsp-action-icon"><i class="fa-solid fa-clipboard-list"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Soạn Phác đồ</span>
                    <span class="dsp-action-desc">Xây dựng quy trình</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Quick Links Card -->
            <div class="dsp-section-card">
              <div class="dsp-section-header">
                <h2 class="dsp-section-title"><i class="fa-solid fa-link" style="color:var(--color-primary);"></i> Liên kết nhanh</h2>
                <a href="#/docspace/links" class="dsp-section-link">Quản lý <i class="fa-solid fa-arrow-right"></i></a>
              </div>
              <div class="dsp-quick-links-grid">
                ${profile.quickLinks && profile.quickLinks.length > 0 
                  ? profile.quickLinks.filter(l => l.isPinned).slice(0, 8).map(link => `
                    <a href="${link.href}" class="dsp-quick-link-chip" id="ql-${link.id}">
                      <i class="${link.icon}"></i>
                      <span>${link.label}</span>
                    </a>
                  `).join('')
                  : `
                    <a href="#/calculators/abg" class="dsp-quick-link-chip"><i class="fa-solid fa-vial"></i><span>ABG Studio</span></a>
                    <a href="#/calculators/egfr" class="dsp-quick-link-chip"><i class="fa-solid fa-calculator"></i><span>eGFR Calculator</span></a>
                    <a href="#/calculators/sofa" class="dsp-quick-link-chip"><i class="fa-solid fa-heart-pulse"></i><span>Thang điểm SOFA</span></a>
                  `
                }
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  `;
}
// ─── Top Header Bar ──────────────────────────────────────────────

export function renderDocSpaceHeader(profile: DoctorProfile, activeId: string): string {
  const currentNav = DSP_NAV_ITEMS.find(item => item.id === activeId) || { label: 'Tổng quan', icon: 'fa-solid fa-house-medical' };

  return `
    <header class="dsp-header-bar" id="dspHeaderBar">
      <div class="dsp-header-left">
        <button class="dsp-header-mobile-toggle" id="dspMobileSidebarBtn" title="Danh mục DocSpace">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="dsp-header-title-box">
          <i class="${currentNav.icon} dsp-header-page-icon"></i>
          <h1 class="dsp-header-page-title">${currentNav.label}</h1>
        </div>
      </div>

      <div class="dsp-header-center">
        <div class="dsp-header-search">
          <i class="fa-solid fa-magnifying-glass dsp-search-icon"></i>
          <input type="text" id="dspHeaderSearchInput" class="dsp-header-search-input" placeholder="Tìm nhanh bệnh nhân, ca bệnh, SBAR, ghi chú..." />
          <kbd class="dsp-search-shortcut">Ctrl K</kbd>
        </div>
      </div>

      <div class="dsp-header-right">
        <div class="dsp-cloud-status" title="Đã kết nối dữ liệu máy tính & Cloud">
          <span class="dsp-status-dot"></span>
          <span class="dsp-status-text">Cloud Sync</span>
        </div>

        <a href="#/docspace/ai-settings" class="dsp-header-icon-btn" title="Cấu hình AI Co-Pilot">
          <i class="fa-solid fa-microchip"></i>
        </a>

        <div class="dsp-header-profile-chip" title="Hồ sơ hiện tại: ${profile.displayName}">
          <div class="dsp-avatar dsp-avatar--xs">${getInitials(profile.displayName)}</div>
          <span class="dsp-header-profile-name">${profile.displayName}</span>
        </div>

        <a href="#/" class="dsp-header-btn-home" title="Trở về Trang chủ CliniPortal">
          <i class="fa-solid fa-house-user"></i> <span>Trang chủ Portal</span>
        </a>
      </div>
    </header>
  `;
}

// ─── Sidebar ─────────────────────────────────────────────────────

export function renderSidebar(profile: DoctorProfile, activeId: string): string {
  const navItems = DSP_NAV_ITEMS.map(item => {
    const isActive = item.id === activeId;
    const isPhase2 = item.phase === 2;
    const isPhase3 = item.phase === 3;
    const badgeHtml = isPhase2 ? '<span class="dsp-soon-badge">Soon</span>' : isPhase3 ? '<span class="dsp-soon-badge dsp-bg-primary dsp-text-white" style="background:var(--color-primary);color:#fff;">Ph3</span>' : '';
    
    return `
      <a href="${item.href}"
         class="dsp-nav-item${isActive ? ' dsp-nav-item--active' : ''}${(isPhase2 || isPhase3) ? ' dsp-nav-item--soon' : ''}"
         id="dspNav-${item.id}"
         ${(isPhase2 || isPhase3) ? 'title="Tính năng nâng cao"' : ''}>
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
        ${badgeHtml}
      </a>
    `;
  }).join('');

  return `
    <aside class="dsp-sidebar" id="dspSidebar">
      <div class="dsp-sidebar-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <a href="#/" class="dsp-sidebar-back" title="Về trang chủ CliniPortal">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <div class="dsp-sidebar-brand">
            <i class="fa-solid fa-id-badge"></i>
            <span>DocSpace</span>
          </div>
        </div>
        <button class="dsp-sidebar-toggle" id="dspSidebarToggle" aria-label="Thu gọn sidebar">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

      <div class="dsp-sidebar-profile">
        <div class="dsp-avatar dsp-avatar--sm">${getInitials(profile.displayName)}</div>
        <div class="dsp-sidebar-profile-info">
          <div class="dsp-sidebar-name">${profile.displayName}</div>
          <div class="dsp-sidebar-spec">${profile.specialty || 'Bác sĩ'}</div>
        </div>
      </div>

      <nav class="dsp-nav">
        ${navItems}
      </nav>

      <div class="dsp-sidebar-footer">
        <a href="#/docspace/ai-settings" class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarAI">
          <i class="fa-solid fa-microchip"></i>
          <span>Cấu hình AI</span>
        </a>
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarExport">
          <i class="fa-solid fa-file-export"></i>
          <span>Xuất dữ liệu</span>
        </button>
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarExportFhir">
          <i class="fa-solid fa-file-medical"></i>
          <span>Xuất chuẩn FHIR</span>
        </button>
        <a href="#/docspace/sync-settings" class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarSync">
          <i class="fa-solid fa-rotate"></i>
          <span>Cấu hình Đồng bộ</span>
        </a>
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarSwitch">
          <i class="fa-solid fa-repeat"></i>
          <span>Đổi hồ sơ</span>
        </button>
      </div>
    </aside>
  `;
}

// ─── Utilities ───────────────────────────────────────────────────

export function getInitials(name: string): string {
  const parts = name.replace(/^(BS\.|TS\.|GS\.|PGS\.|ThS\.)\s*/i, '').trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

export function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return 'vừa xong';
  if (mins < 60) return `${mins} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  if (days === 1) return 'hôm qua';
  return `${days} ngày trước`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function renderFeatureUnavailable(title: string, type: 'lab' | 'wip'): string {
  return `
    <div class="dsp-layout" id="dspLayout">
      <main class="dsp-main" style="margin-left:0; display:flex; align-items:center; justify-content:center; min-height: 100vh;">
        <div style="text-align:center; padding: 40px; background: var(--color-surface); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 500px;">
          <i class="fa-solid fa-flask" style="font-size: 48px; color: var(--color-warning); margin-bottom: 20px;"></i>
          <h2 style="margin: 0 0 10px 0; font-size: 24px;">${title}</h2>
          <p style="color: var(--color-text-muted); line-height: 1.5;">
            ${type === 'lab' 
              ? 'Tính năng này đang trong giai đoạn thử nghiệm (Lab Mode). Vui lòng bật Lab Mode trong phần cấu hình AI để sử dụng.' 
              : 'Tính năng này đang được phát triển và chưa sẵn sàng.'}
          </p>
          <a href="#/docspace" class="dsp-btn dsp-btn-primary" style="margin-top: 24px; display:inline-flex; align-items:center; gap: 8px;">
            <i class="fa-solid fa-arrow-left"></i> Về tổng quan
          </a>
        </div>
      </main>
    </div>
  `;
}

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/[&<>"']/g, match => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[match] || match;
  });
}

