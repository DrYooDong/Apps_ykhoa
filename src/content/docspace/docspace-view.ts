/**
 * DocSpace — Dashboard View
 * Hub chính: Profile selector + Stats + Navigation
 */

import { getActiveProfile, getAllProfiles, createProfile, setActiveProfile, exportProfile, getStats } from './storage';
import { DoctorProfile, DocSpaceNavItem } from './types';

export const DSP_NAV_ITEMS: DocSpaceNavItem[] = [
  { id: 'dashboard',        label: 'Tổng quan',           href: '#/docspace',                  icon: 'fa-solid fa-house-medical',   phase: 1 },
  { id: 'patients',         label: 'Bệnh nhân',           href: '#/docspace/patients',          icon: 'fa-solid fa-users',           phase: 1 },
  { id: 'soap',             label: 'Sổ Tay SOAP',         href: '#/docspace/soap',              icon: 'fa-solid fa-notes-medical',  phase: 1 },
  { id: 'sbar',             label: 'SBAR',                href: '#/docspace/sbar',              icon: 'fa-solid fa-file-waveform',   phase: 1 },
  { id: 'oncall',           label: 'Checklist công việc', href: '#/docspace/oncall',            icon: 'fa-solid fa-list-check',     phase: 1 },
  { id: 'notes',            label: 'Ghi chú',             href: '#/docspace/notes',             icon: 'fa-solid fa-note-sticky',     phase: 1 },
  { id: 'protocol',         label: 'Phác đồ Riêng',       href: '#/docspace/protocol',          icon: 'fa-solid fa-clipboard-list',  phase: 1 },
  { id: 'insights',         label: 'AI Insights & Sức Khỏe', href: '#/docspace/insights',      icon: 'fa-solid fa-brain',           phase: 1 },
  { id: 'living-protocols', label: 'Phác đồ Động',        href: '#/docspace/living-protocols',  icon: 'fa-solid fa-network-wired',   phase: 3 },
  { id: 'sandbox',          label: 'Sandbox Mô phỏng',    href: '#/docspace/sandbox',           icon: 'fa-solid fa-flask',           phase: 3 },
  { id: 'links',            label: 'Liên kết nhanh',      href: '#/docspace/links',             icon: 'fa-solid fa-link',            phase: 1 },
  { id: 'sync-settings',    label: 'Đồng bộ Đa thiết bị', href: '#/docspace/sync-settings',     icon: 'fa-solid fa-cloud-arrow-up',  phase: 1 },
  { id: 'ai-settings',      label: 'Cấu hình AI',         href: '#/docspace/ai-settings',       icon: 'fa-solid fa-microchip',       phase: 1 },
  { id: 'dependency-map',   label: 'Bản đồ Phụ thuộc',    href: '#/docspace/dependency-map',    icon: 'fa-solid fa-diagram-project', phase: 1 },
];

// ─── Profile Selector Screen ─────────────────────────────────────

export function renderProfileSelector(): string {
  const profiles = getAllProfiles();
  const profileCards = profiles.length
    ? profiles.map(p => `
        <button class="dsp-profile-card" data-profile-id="${p.id}" id="select-profile-${p.id}">
          <div class="dsp-avatar">${getInitials(p.displayName)}</div>
          <div class="dsp-profile-info">
            <div class="dsp-profile-name">${escapeHtml(p.displayName)}</div>
            <div class="dsp-profile-meta">${escapeHtml(p.specialty || 'Bác sĩ Lâm sàng')} · <code>${escapeHtml(p.id)}</code></div>
            <div class="dsp-profile-date"><i class="fa-solid fa-clock-rotate-left"></i> Hoạt động ${formatRelativeDate(p.lastActiveAt)}</div>
          </div>
          <i class="fa-solid fa-arrow-right-to-bracket dsp-profile-arrow"></i>
        </button>
      `).join('')
    : `<div class="dsp-empty-profiles">
         <i class="fa-solid fa-user-doctor"></i>
         <p>Chưa có hồ sơ bác sĩ nào. Tạo hồ sơ mới để mở Không gian làm việc DocSpace.</p>
       </div>`;

  return `
    <div class="dsp-profile-selector" id="dspProfileSelector">
      <div class="dsp-profile-selector-inner">
        <!-- Header -->
        <div class="dsp-selector-header">
          <div class="dsp-logo-mark">
            <i class="fa-solid fa-stethoscope"></i>
          </div>
          <h1 class="dsp-selector-title">DocSpace Medical OS</h1>
          <p class="dsp-selector-subtitle">Hệ sinh thái Bác sĩ Lâm sàng — Chọn hồ sơ để truy cập Workspace</p>
        </div>

        <!-- Existing profiles -->
        ${profiles.length > 0 ? `
          <div class="dsp-profiles-list">
            <div class="dsp-section-label"><i class="fa-solid fa-address-card"></i> Hồ sơ cá nhân của bạn</div>
            ${profileCards}
          </div>
        ` : profileCards}

        <!-- Create new -->
        <div class="dsp-create-profile-section">
          <div class="dsp-section-label"><i class="fa-solid fa-user-plus"></i> ${profiles.length > 0 ? 'Hoặc tạo hồ sơ mới' : 'Tạo hồ sơ mới'}</div>
          <form class="dsp-create-form" id="dspCreateProfileForm" novalidate>
            <div class="dsp-form-row">
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewId">ID Hồ sơ Bác sĩ <span class="dsp-required">*</span></label>
                <input class="dsp-input" type="text" id="dspNewId" placeholder="VD: BS_NguyenVanA_108"
                  pattern="[A-Za-z0-9_-]+" maxlength="40" required
                  title="Chỉ dùng chữ, số, _ hoặc -" />
                <span class="dsp-hint">Định danh duy nhất dùng lưu trữ LocalStorage / IndexedDB</span>
              </div>
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewName">Tên hiển thị <span class="dsp-required">*</span></label>
                <input class="dsp-input" type="text" id="dspNewName" placeholder="VD: BS. CK1. Nguyễn Văn A"
                  maxlength="60" required />
              </div>
              <div class="dsp-form-group">
                <label class="dsp-label" for="dspNewSpecialty">Chuyên khoa / Khoa phòng</label>
                <input class="dsp-input" type="text" id="dspNewSpecialty" placeholder="VD: Cấp cứu ICU, Tim mạch, Nhi khoa..." maxlength="50" />
              </div>
            </div>
            <button class="dsp-btn dsp-btn-primary" type="submit" id="dspCreateBtn" style="width:100%; justify-content:center; padding: 0.75rem 1rem; margin-top: 0.5rem; font-size: 0.9rem; font-weight:800;">
              <i class="fa-solid fa-right-to-bracket"></i> Khởi tạo Hồ sơ &amp; Vào Workspace
            </button>
          </form>
        </div>

        <!-- Import -->
        <div class="dsp-import-section">
          <label class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspImportLabel" for="dspImportFile" style="cursor:pointer;">
            <i class="fa-solid fa-file-import"></i> Nạp từ file Backup .JSON
          </label>
          <input type="file" id="dspImportFile" accept=".json" style="display:none" />
          
          <label class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspImportFhirLabel" for="dspImportFhirFile" style="cursor:pointer;">
            <i class="fa-solid fa-file-medical"></i> Nạp chuẩn HL7 FHIR R4
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

  let backupBanner = '';
  if (stats.lastBackupDays !== null && stats.lastBackupDays > 3) {
    backupBanner = `
      <div style="background: rgba(245, 158, 11, 0.15); color: var(--dsp-amber); border: 1px solid rgba(245, 158, 11, 0.3); padding: 12px 20px; border-radius: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(10px);">
        <div style="display:flex; align-items:center; gap: 10px;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.2rem;"></i>
          <span><strong>Cảnh báo an toàn dữ liệu:</strong> Đã ${stats.lastBackupDays} ngày bạn chưa sao lưu dữ liệu. Khuyên dùng Sao lưu định kỳ!</span>
        </div>
        <button class="dsp-btn dsp-btn-sm" onclick="document.getElementById('dspExportBtn').click()" style="background: var(--dsp-amber); color: #000; font-weight:800;">
          <i class="fa-solid fa-download"></i> Sao lưu ngay
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
            <!-- Decorative SVG EKG Pulse Background -->
            <svg style="position:absolute; right: -20px; bottom: -10px; width: 320px; height: 120px; opacity: 0.12; pointer-events: none;" viewBox="0 0 500 150">
              <path d="M0,75 L120,75 L140,25 L160,125 L185,50 L205,95 L220,75 L500,75" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>

            <div class="dsp-greeting-left">
              <div class="dsp-avatar dsp-avatar--hero">${getInitials(profile.displayName)}</div>
              <div class="dsp-greeting-text">
                <h1 class="dsp-page-title">
                  Chào bác sĩ, <span class="dsp-doctor-name">${escapeHtml(profile.displayName)}</span>
                </h1>
                <p class="dsp-page-subtitle">
                  <span class="dsp-spec-pill"><i class="fa-solid fa-user-md"></i> ${escapeHtml(profile.specialty || 'Nội khoa Lâm sàng')}</span>
                  <code class="dsp-id-badge"><i class="fa-solid fa-key"></i> ID: ${escapeHtml(profile.id)}</code>
                </p>
              </div>
            </div>
            
            <div class="dsp-greeting-actions">
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspExportBtn" title="Xuất toàn bộ dữ liệu ra file JSON">
                <i class="fa-solid fa-file-export"></i> Xuất JSON
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspExportFhirBtn" title="Xuất dữ liệu theo chuẩn y tế HL7 FHIR R4">
                <i class="fa-solid fa-file-medical"></i> Xuất FHIR
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspSwitchProfileBtn" title="Đổi sang hồ sơ bác sĩ khác">
                <i class="fa-solid fa-repeat"></i> Đổi Hồ sơ
              </button>
            </div>
          </div>

          <!-- Stats Bento Grid -->
          <div class="dsp-stats-grid">
            <a href="#/docspace/soap" class="dsp-stat-card dsp-stat-soap">
              <div class="dsp-stat-icon"><i class="fa-solid fa-notes-medical"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.soapCount}</div>
                <div class="dsp-stat-label">Bệnh án SOAP</div>
              </div>
            </a>
            <a href="#/docspace/sbar" class="dsp-stat-card dsp-stat-sbar">
              <div class="dsp-stat-icon"><i class="fa-solid fa-file-waveform"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.sbarCount}</div>
                <div class="dsp-stat-label">SBAR Báo cáo</div>
              </div>
            </a>
            <a href="#/docspace/oncall" class="dsp-stat-card dsp-stat-oncall">
              <div class="dsp-stat-icon"><i class="fa-solid fa-list-check"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.shiftCount}</div>
                <div class="dsp-stat-label">Checklist Trực</div>
              </div>
            </a>
            <a href="#/docspace/notes" class="dsp-stat-card dsp-stat-notes">
              <div class="dsp-stat-icon"><i class="fa-solid fa-note-sticky"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.noteCount}</div>
                <div class="dsp-stat-label">Ghi chú cá nhân</div>
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
            
            <!-- AI Insights & Practice Pulse Banner Widget -->
            <div class="dsp-section-card" style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(99, 102, 241, 0.08)); border: 1px solid rgba(56, 189, 248, 0.25);">
              <div class="dsp-section-header" style="border-bottom: 1px solid rgba(56, 189, 248, 0.15); padding-bottom: 0.75rem;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="width:28px; height:28px; border-radius:6px; background:linear-gradient(135deg, #0284c7, #6366f1); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.85rem;">
                    <i class="fa-solid fa-brain"></i>
                  </span>
                  <h2 class="dsp-section-title" style="margin:0; font-size:1.05rem;">AI Practice Insights &amp; Sức Khỏe Nghề Nghiệp</h2>
                </div>
                <a href="#/docspace/insights" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700; font-size:0.8rem;">
                  Mở Toàn Diện Insights <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
                <div style="background:var(--color-surface); padding:10px 14px; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:0.75rem; color:var(--color-text-muted);"><i class="fa-solid fa-chart-pie" style="color:var(--color-primary);"></i> Top Bệnh Lý</div>
                  <div style="font-size:1rem; font-weight:800; color:var(--color-text); margin-top:2px;">Top 10 Phân Tích</div>
                  <div style="font-size:0.7rem; color:var(--color-primary); margin-top:2px;">Biểu đồ SVG Donut</div>
                </div>
                <div style="background:var(--color-surface); padding:10px 14px; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:0.75rem; color:var(--color-text-muted);"><i class="fa-solid fa-heart-pulse" style="color:#10b981;"></i> Wellness Guardian</div>
                  <div style="font-size:1rem; font-weight:800; color:#10b981; margin-top:2px;">Đo tải trọng &amp; Kiệt sức</div>
                  <div style="font-size:0.7rem; color:var(--color-text-muted); margin-top:2px;">Burnout Signal Alert</div>
                </div>
                <div style="background:var(--color-surface); padding:10px 14px; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:0.75rem; color:var(--color-text-muted);"><i class="fa-solid fa-sparkles" style="color:#818cf8;"></i> Gemini Weekly Summary</div>
                  <div style="font-size:1rem; font-weight:800; color:var(--color-text); margin-top:2px;">Tóm tắt Tuần Lâm sàng</div>
                  <div style="font-size:0.7rem; color:#818cf8; margin-top:2px;">Gemini 1M Context AI</div>
                </div>
                <div style="background:var(--color-surface); padding:10px 14px; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:0.75rem; color:var(--color-text-muted);"><i class="fa-solid fa-book-medical" style="color:#f59e0b;"></i> EBM Bridge 2.0</div>
                  <div style="font-size:1rem; font-weight:800; color:var(--color-text); margin-top:2px;">Gợi ý chứng cứ 2 chiều</div>
                  <div style="font-size:0.7rem; color:#f59e0b; margin-top:2px;">Kho Guidelines CliniPortal</div>
                </div>
              </div>
            </div>
            
            <!-- Quick Actions Card -->
            <div class="dsp-section-card">
              <div class="dsp-section-header">
                <h2 class="dsp-section-title"><i class="fa-solid fa-bolt" style="color:var(--dsp-sky);"></i> Thao tác nhanh</h2>
                <span class="dsp-section-badge">Tạo mới &amp; Khởi chạy</span>
              </div>
              <div class="dsp-quick-actions">
                <a href="#/docspace/soap" class="dsp-action-card" id="qa-new-soap">
                  <div class="dsp-action-icon"><i class="fa-solid fa-notes-medical"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Soạn Bệnh án SOAP</span>
                    <span class="dsp-action-desc">Sổ tay lâm sàng số</span>
                  </div>
                </a>
                <a href="#/docspace/sbar" class="dsp-action-card" id="qa-new-sbar">
                  <div class="dsp-action-icon"><i class="fa-solid fa-file-waveform"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Tạo SBAR</span>
                    <span class="dsp-action-desc">Bàn giao &amp; Báo cáo</span>
                  </div>
                </a>
                <a href="#/docspace/oncall" class="dsp-action-card" id="qa-new-shift">
                  <div class="dsp-action-icon"><i class="fa-solid fa-list-check"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Checklist Trực</span>
                    <span class="dsp-action-desc">Ca trực &amp; Nhiệm vụ</span>
                  </div>
                </a>
                <a href="#/docspace/notes" class="dsp-action-card" id="qa-new-note">
                  <div class="dsp-action-icon"><i class="fa-solid fa-note-sticky"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Tạo Ghi chú</span>
                    <span class="dsp-action-desc">Ghi chép tự do</span>
                  </div>
                </a>
                <a href="#/docspace/protocol" class="dsp-action-card" id="qa-new-protocol">
                  <div class="dsp-action-icon"><i class="fa-solid fa-clipboard-list"></i></div>
                  <div class="dsp-action-info">
                    <span class="dsp-action-title">Soạn Phác đồ</span>
                    <span class="dsp-action-desc">Quy trình xử trí</span>
                  </div>
                </a>
              </div>
            </div>

            <!-- Quick Links Card -->
            <div class="dsp-section-card">
              <div class="dsp-section-header">
                <h2 class="dsp-section-title"><i class="fa-solid fa-link" style="color:var(--dsp-sky);"></i> Liên kết &amp; Công cụ nhanh</h2>
                <a href="#/docspace/links" class="dsp-section-link">Quản lý <i class="fa-solid fa-arrow-right"></i></a>
              </div>
              <div class="dsp-quick-links-grid">
                ${profile.quickLinks && profile.quickLinks.length > 0 
                  ? profile.quickLinks.filter(l => l.isPinned).slice(0, 8).map(link => `
                    <a href="${link.href}" class="dsp-quick-link-chip" id="ql-${link.id}">
                      <i class="${link.icon}"></i>
                      <span>${escapeHtml(link.label)}</span>
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
        <div class="dsp-header-search" id="dspHeaderSearchBox" style="cursor:pointer;" title="Mở Clinical Command Bar (Ctrl + K)">
          <i class="fa-solid fa-magnifying-glass dsp-search-icon"></i>
          <input type="text" id="dspHeaderSearchInput" class="dsp-header-search-input" placeholder="Tìm nhanh công cụ, thuốc, ca bệnh, tính điểm... (Ctrl + K)" readonly style="cursor:pointer;" />
          <kbd class="dsp-search-shortcut">Ctrl K</kbd>
        </div>
      </div>

      <div class="dsp-header-right">
        <button type="button" class="dsp-header-icon-btn" id="dspHeaderQuickRefBtn" title="Tra cứu Siêu tốc: Công thức, ECG/ABG & ACLS" style="color:var(--color-primary, #0284c7);">
          <i class="fa-solid fa-bolt"></i>
        </button>

        <button type="button" class="dsp-header-icon-btn" id="dspHeaderDrugIntelBtn" title="Drug Intelligence — Dược thư & Tương tác thuốc" style="color:#db2777;">
          <i class="fa-solid fa-pills"></i>
        </button>

        <button type="button" class="dsp-header-icon-btn" id="dspHeaderToolsBtn" title="Kho Thang điểm & Công cụ Tính toán" style="color:#f59e0b;">
          <i class="fa-solid fa-calculator"></i>
        </button>

        <div class="dsp-cloud-status" title="Dữ liệu lưu trữ nội bộ an toàn (Local First)">
          <span class="dsp-status-dot"></span>
          <span class="dsp-status-text">Client Sync</span>
        </div>

        <a href="#/docspace/ai-settings" class="dsp-header-icon-btn" title="Cấu hình AI Co-Pilot &amp; Local LLM">
          <i class="fa-solid fa-microchip"></i>
        </a>

        <div class="dsp-header-profile-chip" title="Hồ sơ bác sĩ: ${escapeHtml(profile.displayName)}">
          <div class="dsp-avatar dsp-avatar--xs">${getInitials(profile.displayName)}</div>
          <span class="dsp-header-profile-name">${escapeHtml(profile.displayName)}</span>
        </div>

        <a href="#/" class="dsp-header-btn-home" title="Trở về Trang chủ CliniPortal">
          <i class="fa-solid fa-house"></i> <span>Trang chủ</span>
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
    const badgeHtml = isPhase2 ? '<span class="dsp-soon-badge">Soon</span>' : isPhase3 ? '<span class="dsp-soon-badge" style="background:var(--dsp-violet);color:#fff;border:none;">AI Lab</span>' : '';
    
    return `
      <a href="${item.href}"
         class="dsp-nav-item${isActive ? ' dsp-nav-item--active' : ''}${(isPhase2 || isPhase3) ? ' dsp-nav-item--soon' : ''}"
         id="dspNav-${item.id}"
         ${(isPhase2 || isPhase3) ? 'title="Tính năng Nâng cao AI"' : ''}>
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
          <a href="#/" class="dsp-sidebar-back" title="Trở về Trang chủ CliniPortal">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <div class="dsp-sidebar-brand">
            <i class="fa-solid fa-user-doctor"></i>
            <span>DocSpace</span>
          </div>
        </div>
        <button class="dsp-sidebar-toggle" id="dspSidebarToggle" aria-label="Thu gọn danh mục sidebar">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>

      <div class="dsp-sidebar-profile">
        <div class="dsp-avatar dsp-avatar--sm">${getInitials(profile.displayName)}</div>
        <div class="dsp-sidebar-profile-info">
          <div class="dsp-sidebar-name">${escapeHtml(profile.displayName)}</div>
          <div class="dsp-sidebar-spec">${escapeHtml(profile.specialty || 'Bác sĩ Lâm sàng')}</div>
        </div>
      </div>

      <nav class="dsp-nav">
        ${navItems}
      </nav>

      <div class="dsp-sidebar-footer">
        <a href="#/docspace/ai-settings" class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarAI">
          <i class="fa-solid fa-microchip" style="color:var(--dsp-violet);"></i>
          <span>Cấu hình AI Co-Pilot</span>
        </a>
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarExport">
          <i class="fa-solid fa-file-export"></i>
          <span>Xuất dữ liệu JSON</span>
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
          <span>Đổi Hồ sơ Bác sĩ</span>
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
        <div style="text-align:center; padding: 45px 35px; background: rgba(15, 23, 42, 0.75); border: 1px solid var(--dsp-glass-border); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); max-width: 520px; backdrop-filter: blur(20px);">
          <div style="width: 70px; height: 70px; border-radius: 20px; background: rgba(245, 158, 11, 0.15); color: var(--dsp-amber); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem; border: 1px solid rgba(245, 158, 11, 0.3);">
            <i class="fa-solid fa-flask"></i>
          </div>
          <h2 style="margin: 0 0 12px 0; font-size: 1.5rem; font-weight: 900; color: var(--color-text);">${escapeHtml(title)}</h2>
          <p style="color: var(--color-text-muted); line-height: 1.6; font-size: 0.9rem;">
            ${type === 'lab' 
              ? 'Tính năng này nằm trong phân hệ thử nghiệm lâm sàng (AI Lab Mode). Vui lòng bật Lab Mode trong phần Cấu hình AI để mở khóa.' 
              : 'Tính năng này đang được phát triển nâng cấp và sẽ sẵn sàng trong bản cập nhật kế tiếp.'}
          </p>
          <a href="#/docspace" class="dsp-btn dsp-btn-primary" style="margin-top: 24px; display:inline-flex; align-items:center; gap: 8px; padding: 0.65rem 1.5rem; border-radius: 12px; font-weight: 800;">
            <i class="fa-solid fa-arrow-left"></i> Trở về Trang Tổng quan
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

