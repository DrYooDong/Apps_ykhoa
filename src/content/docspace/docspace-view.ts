/**
 * DocSpace — Dashboard View
 * Hub chính: Profile selector + Stats + Navigation
 */

import { getActiveProfile, getAllProfiles, createProfile, setActiveProfile, exportProfile, getStats } from './storage';
import { DoctorProfile, DocSpaceNavItem, DocSpaceNavSection } from './types';

export const DSP_NAV_SECTIONS: DocSpaceNavSection[] = [
  {
    id: 'clinical',
    title: 'Lâm sàng & Ca bệnh',
    icon: 'fa-solid fa-hospital-user',
    items: [
      { id: 'dashboard',    label: 'Tổng quan',           href: '#/docspace',              icon: 'fa-solid fa-house-medical',  phase: 1 },
      { id: 'chronic-care', label: 'Bệnh Mạn Tính',       href: '#/docspace/chronic-care', icon: 'fa-solid fa-heart-pulse',   phase: 1 },
      { id: 'soap',         label: 'Sổ Tay SOAP',         href: '#/docspace/soap',         icon: 'fa-solid fa-notes-medical',  phase: 1 },
      { id: 'sbar',         label: 'Bàn giao SBAR',       href: '#/docspace/sbar',         icon: 'fa-solid fa-file-waveform',  phase: 1 },
    ],
  },
  {
    id: 'knowledge',
    title: 'Tri thức & Phác đồ',
    icon: 'fa-solid fa-book-medical',
    items: [
      { id: 'vault',    label: 'Kho Tri Thức (Vault)', href: '#/vault', icon: 'fa-solid fa-graduation-cap', phase: 1, badgeText: '600+' },
      { id: 'studios',  label: 'Clinical Studios',     href: '#/docspace/studios',  icon: 'fa-solid fa-flask-vial',     phase: 1, badgeText: 'Pro' },
      { id: 'protocol', label: 'Kho Phác đồ Điều trị', href: '#/docspace/protocol', icon: 'fa-solid fa-book-medical',   phase: 1 },
      { id: 'notes',    label: 'Ghi chú Lâm sàng',     href: '#/docspace/notes',    icon: 'fa-solid fa-note-sticky',    phase: 1 },
    ],
  },
  {
    id: 'practice',
    title: 'Tua trực & Hiệu suất',
    icon: 'fa-solid fa-user-clock',
    items: [
      { id: 'oncall',   label: 'Checklist Tua trực',   href: '#/docspace/oncall',   icon: 'fa-solid fa-list-check',     phase: 1 },
      { id: 'insights', label: 'AI Insights & Sức khỏe', href: '#/docspace/insights', icon: 'fa-solid fa-brain',        phase: 1 },
      { id: 'sandbox',  label: 'Sandbox Mô phỏng',     href: '#/docspace/sandbox',  icon: 'fa-solid fa-flask',          phase: 3, badgeText: 'AI Lab' },
    ],
  },
];

// Mảng phẳng để tương thích ngược 100% với các hàm tra cứu cũ
export const DSP_NAV_ITEMS: DocSpaceNavItem[] = DSP_NAV_SECTIONS.flatMap(s => s.items);

// ─── Profile Selector Screen ─────────────────────────────────────

// ─── Profile Selector Screen (Medical OS Login & Onboarding) ──────

export function renderProfileSelector(): string {
  const profiles = getAllProfiles();
  const hasProfiles = profiles.length > 0;

  const profileCardsHtml = hasProfiles
    ? profiles.map(p => `
        <div class="dsp-profile-card-wrapper" id="profile-card-wrap-${p.id}">
          <button type="button" class="dsp-profile-card" data-profile-id="${escapeHtml(p.id)}" id="select-profile-${escapeHtml(p.id)}">
            <div class="dsp-avatar dsp-avatar--profile">${getInitials(p.displayName)}</div>
            <div class="dsp-profile-info">
              <div class="dsp-profile-name">${escapeHtml(p.displayName)}</div>
              <div class="dsp-profile-meta">
                <span class="dsp-spec-badge"><i class="fa-solid fa-user-doctor"></i> ${escapeHtml(p.specialty || 'Bác sĩ Lâm sàng')}</span>
                <code class="dsp-id-tag"><i class="fa-solid fa-key"></i> ${escapeHtml(p.id)}</code>
              </div>
              <div class="dsp-profile-date">
                <i class="fa-solid fa-clock-rotate-left"></i> Hoạt động: ${formatRelativeDate(p.lastActiveAt)}
              </div>
            </div>
            <div class="dsp-profile-arrow-wrap">
              <i class="fa-solid fa-arrow-right-to-bracket dsp-profile-arrow" title="Truy cập Workspace"></i>
            </div>
          </button>
          <button type="button" class="dsp-profile-del-btn" data-delete-profile-id="${escapeHtml(p.id)}" data-profile-name="${escapeHtml(p.displayName)}" title="Xóa hồ sơ này khỏi trình duyệt">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('')
    : `
      <div class="dsp-empty-welcome-card">
        <div class="dsp-empty-welcome-icon">
          <i class="fa-solid fa-notes-medical"></i>
        </div>
        <h3 class="dsp-empty-welcome-title">Chào mừng Quý Bác sĩ!</h3>
        <p class="dsp-empty-welcome-desc">Chưa có hồ sơ nào trên trình duyệt này. Hãy khởi tạo hồ sơ cá nhân để mở toàn bộ tính năng của <strong>DocSpace Medical OS</strong>.</p>
        
        <div class="dsp-starter-presets-box">
          <div class="dsp-starter-presets-label"><i class="fa-solid fa-wand-magic-sparkles"></i> Hoặc chọn nhanh mẫu Bác sĩ:</div>
          <div class="dsp-starter-chips-grid">
            <button type="button" class="dsp-preset-chip" data-preset-id="BS_NoiKhoa_Demo" data-preset-name="BS. Nội Tổng Quát" data-preset-spec="Nội khoa Tổng quát">
              <i class="fa-solid fa-stethoscope"></i> BS. Nội khoa
            </button>
            <button type="button" class="dsp-preset-chip" data-preset-id="BS_CapCuuICU_Demo" data-preset-name="BS. Cấp Cứu - Hồi Sức" data-preset-spec="Cấp cứu &amp; Hồi sức tích cực (ICU)">
              <i class="fa-solid fa-truck-medical"></i> BS. Cấp cứu ICU
            </button>
            <button type="button" class="dsp-preset-chip" data-preset-id="BS_NhiKhoa_Demo" data-preset-name="BS. Nhi Khoa Lâm Sàng" data-preset-spec="Nhi khoa">
              <i class="fa-solid fa-baby"></i> BS. Nhi khoa
            </button>
            <button type="button" class="dsp-preset-chip" data-preset-id="BS_TimMach_Demo" data-preset-name="BS. Tim Mạch Lâm Sàng" data-preset-spec="Tim mạch Can thiệp">
              <i class="fa-solid fa-heart-pulse"></i> BS. Tim mạch
            </button>
          </div>
        </div>
      </div>
    `;

  return `
    <div class="dsp-profile-selector" id="dspProfileSelector">
      <!-- Background Ambient Blobs -->
      <div class="dsp-ambient-blob dsp-ambient-blob--1"></div>
      <div class="dsp-ambient-blob dsp-ambient-blob--2"></div>
      <div class="dsp-ambient-blob dsp-ambient-blob--3"></div>

      <div class="dsp-selector-container">
        
        <!-- LEFT SHOWCASE PANE (Medical OS Highlights) -->
        <div class="dsp-selector-brand-pane">
          <div class="dsp-brand-top">
            <div class="dsp-logo-mark-wrap">
              <div class="dsp-logo-mark">
                <i class="fa-solid fa-stethoscope"></i>
              </div>
              <span class="dsp-pulse-ring"></span>
            </div>
            <div class="dsp-brand-badges">
              <span class="dsp-badge-pill"><i class="fa-solid fa-shield-halved"></i> 100% Offline-First</span>
              <span class="dsp-badge-pill dsp-badge-pill--accent"><i class="fa-solid fa-laptop-medical"></i> Clinical OS v2.4</span>
            </div>
            <h1 class="dsp-brand-title">DocSpace Medical OS</h1>
            <p class="dsp-brand-tagline">Hệ điều hành Lâm sàng Toàn diện &amp; Trợ lý Ra Quyết định Y khoa (CDSS)</p>
          </div>

          <!-- Clinical Highlights Grid -->
          <div class="dsp-brand-features">
            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(14, 165, 233, 0.15); color: #0284c7;">
                <i class="fa-solid fa-notes-medical"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Bệnh án SOAP &amp; SBAR</strong>
                <p>Chuẩn hóa hồ sơ lâm sàng, ghi chú ca bệnh và bàn giao tua trực an toàn, khoa học.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>40+ Thang điểm &amp; Phác đồ EBM</strong>
                <p>Khí máu động mạch ABG Studio, eGFR, Thận học, Cấp cứu và Tương tác Thuốc tự động.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                <i class="fa-solid fa-lock"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Bảo mật Thiết bị Tuyệt đối</strong>
                <p>Dữ liệu lưu trữ độc lập trên máy cục bộ, không đẩy lên máy chủ đám mây, bảo mật PHI.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                <i class="fa-solid fa-file-medical"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Chuẩn Y tế HL7 FHIR R4</strong>
                <p>Dễ dàng sao lưu, nạp và trích xuất dữ liệu chuẩn hóa theo tiêu chuẩn quốc tế.</p>
              </div>
            </div>
          </div>

          <!-- Bottom Trust Indicator -->
          <div class="dsp-brand-footer">
            <div class="dsp-status-live">
              <span class="dsp-status-dot"></span>
              <span>Hệ thống sẵn sàng • Độc lập mạng Bệnh viện</span>
            </div>
          </div>
        </div>

        <!-- RIGHT ACTION PANE (Login / Profile Management Card) -->
        <div class="dsp-selector-action-card">
          
          <div class="dsp-action-card-header">
            <div class="dsp-card-title-group">
              <h2 class="dsp-card-title">Truy cập Không gian làm việc</h2>
              <p class="dsp-card-desc">Đăng nhập tài khoản Bác sĩ hoặc khởi tạo hồ sơ lưu trữ mới</p>
            </div>
          </div>

          ${hasProfiles ? `
            <!-- Tab Switcher when profiles exist -->
            <div class="dsp-auth-tabs">
              <button type="button" class="dsp-auth-tab active" data-tab-target="tab-profiles" id="btnTabProfiles">
                <i class="fa-solid fa-user-doctor"></i> Chọn Hồ sơ Bác sĩ <span class="dsp-tab-count">${profiles.length}</span>
              </button>
              <button type="button" class="dsp-auth-tab" data-tab-target="tab-create" id="btnTabCreate">
                <i class="fa-solid fa-user-plus"></i> Tạo Hồ sơ mới
              </button>
            </div>
          ` : ''}

          <!-- TAB 1: Existing Profiles -->
          <div class="dsp-tab-pane ${hasProfiles ? 'dsp-tab-pane--active' : ''}" id="paneProfiles" style="${hasProfiles ? '' : 'display:none;'}">
            <div class="dsp-profiles-list">
              <div class="dsp-list-toolbar">
                <div class="dsp-section-label"><i class="fa-solid fa-address-card"></i> Danh sách Hồ sơ hiện có (${profiles.length})</div>
              </div>
              <div class="dsp-profile-cards-grid">
                ${profileCardsHtml}
              </div>
              <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm dsp-btn-switch-to-create" id="btnSwitchToCreate">
                <i class="fa-solid fa-plus"></i> Thêm tài khoản Bác sĩ mới
              </button>
            </div>
          </div>

          <!-- TAB 2: Create Profile Form -->
          <div class="dsp-tab-pane ${!hasProfiles ? 'dsp-tab-pane--active' : ''}" id="paneCreateProfile" style="${!hasProfiles ? '' : 'display:none;'}">
            
            ${!hasProfiles ? profileCardsHtml : ''}

            <form class="dsp-create-form" id="dspCreateProfileForm" novalidate>
              <div class="dsp-form-header-badge">
                <div class="dsp-avatar dsp-avatar--preview" id="dspLiveAvatarPreview">BS</div>
                <div class="dsp-form-header-text">
                  <div class="dsp-form-header-title">Thiết lập Hồ sơ Bác sĩ</div>
                  <div class="dsp-form-header-sub">Hồ sơ sẽ phân vùng riêng biệt dữ liệu ca bệnh, sổ tay SOAP và checklist trực.</div>
                </div>
              </div>

              <!-- Form Inputs -->
              <div class="dsp-form-fields">
                
                <!-- Display Name -->
                <div class="dsp-form-group">
                  <label class="dsp-label" for="dspNewName">
                    <i class="fa-solid fa-user-doctor"></i> Họ và Tên Bác sĩ <span class="dsp-required">*</span>
                  </label>
                  <div class="dsp-input-wrap">
                    <input class="dsp-input dsp-input--with-icon" type="text" id="dspNewName"
                      placeholder="VD: BS. CK1. Nguyễn Văn A" maxlength="60" required autocomplete="off" />
                  </div>
                  <span class="dsp-hint">Tên sẽ hiển thị trên tiêu đề bệnh án và phiếu bàn giao SBAR.</span>
                </div>

                <!-- Profile ID -->
                <div class="dsp-form-group">
                  <div class="dsp-label-row">
                    <label class="dsp-label" for="dspNewId">
                      <i class="fa-solid fa-id-badge"></i> ID Hồ sơ Bác sĩ <span class="dsp-required">*</span>
                    </label>
                    <button type="button" class="dsp-btn-magic-id" id="dspBtnAutoId" title="Tự động sinh ID từ tên hiển thị">
                      <i class="fa-solid fa-wand-magic-sparkles"></i> Tạo ID tự động
                    </button>
                  </div>
                  <div class="dsp-input-wrap">
                    <input class="dsp-input dsp-input--with-icon" type="text" id="dspNewId"
                      placeholder="VD: BS_NguyenVanA_108"
                      pattern="[A-Za-z0-9_-]+" maxlength="40" required
                      title="Chỉ dùng chữ không dấu, số, _ hoặc -" autocomplete="off" />
                  </div>
                  <span class="dsp-hint">Khóa định danh phân vùng lưu trữ LocalStorage / IndexedDB.</span>
                </div>

                <!-- Specialty -->
                <div class="dsp-form-group">
                  <label class="dsp-label" for="dspNewSpecialty">
                    <i class="fa-solid fa-hospital-user"></i> Chuyên khoa / Khoa phòng
                  </label>
                  <div class="dsp-input-wrap">
                    <input class="dsp-input dsp-input--with-icon" type="text" id="dspNewSpecialty"
                      placeholder="VD: Nội tổng quát, Cấp cứu ICU, Tim mạch, Nhi..." maxlength="60" autocomplete="off" />
                  </div>
                  
                  <!-- Specialty Quick Chips -->
                  <div class="dsp-specialty-chips-wrap">
                    <span class="dsp-chips-caption">Gợi ý nhanh:</span>
                    <div class="dsp-specialty-chips">
                      <button type="button" class="dsp-spec-chip" data-spec-val="Nội Tổng Quát">Nội Tổng Quát</button>
                      <button type="button" class="dsp-spec-chip" data-spec-val="Cấp cứu &amp; Hồi sức ICU">Cấp cứu - ICU</button>
                      <button type="button" class="dsp-spec-chip" data-spec-val="Tim Mạch Can Thiệp">Tim Mạch</button>
                      <button type="button" class="dsp-spec-chip" data-spec-val="Nhi Khoa">Nhi Khoa</button>
                      <button type="button" class="dsp-spec-chip" data-spec-val="Ngoại Khoa">Ngoại Khoa</button>
                      <button type="button" class="dsp-spec-chip" data-spec-val="Hồi Sức Tích Cực">HSTC</button>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Submit Button -->
              <button class="dsp-btn dsp-btn-primary dsp-btn-submit" type="submit" id="dspCreateBtn">
                <i class="fa-solid fa-right-to-bracket"></i> Khởi tạo Hồ sơ &amp; Mở Workspace
              </button>
            </form>
          </div>

          <!-- Bottom Backup & Import Tools -->
          <div class="dsp-import-section">
            <div class="dsp-import-divider">
              <span>hoặc nạp dữ liệu có sẵn</span>
            </div>
            
            <div class="dsp-import-buttons">
              <label class="dsp-import-btn" id="dspImportLabel" for="dspImportFile">
                <i class="fa-solid fa-file-import"></i>
                <div class="dsp-import-btn-text">
                  <strong>Nạp File Backup .JSON</strong>
                  <small>Khôi phục từ bản xuất trước</small>
                </div>
              </label>
              <input type="file" id="dspImportFile" accept=".json" style="display:none" />
              
              <label class="dsp-import-btn" id="dspImportFhirLabel" for="dspImportFhirFile">
                <i class="fa-solid fa-file-medical"></i>
                <div class="dsp-import-btn-text">
                  <strong>Nạp Chuẩn HL7 FHIR R4</strong>
                  <small>Tương thích Bundle JSON</small>
                </div>
              </label>
              <input type="file" id="dspImportFhirFile" accept=".json" style="display:none" />
            </div>
          </div>

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
            <a href="#/docspace/chronic-care" class="dsp-stat-card dsp-stat-chronic" style="border-left: 3px solid #ef4444;">
              <div class="dsp-stat-icon" style="color:#ef4444;"><i class="fa-solid fa-heart-pulse"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.chronicCount || 0}</div>
                <div class="dsp-stat-label">Bệnh mạn tính</div>
              </div>
            </a>
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
              <div class="dsp-stat-icon"><i class="fa-solid fa-book-medical"></i></div>
              <div class="dsp-stat-body">
                <div class="dsp-stat-value">${stats.protocolCount}</div>
                <div class="dsp-stat-label">Kho Phác đồ</div>
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
        <button type="button" class="dsp-header-icon-btn dsp-header-desktop-only" id="dspHeaderReactionChainBtn" title="Chuỗi Phản Ứng Lâm Sàng (CRCE v2.0) — Triệu chứng ➔ Tiêu chuẩn CĐ ➔ Phác đồ ➔ Thuốc ➔ Biến chứng" style="color:#0284c7; background:rgba(2,132,199,0.1); border-radius:8px;">
          <i class="fa-solid fa-link"></i>
        </button>

        <button type="button" class="dsp-header-icon-btn dsp-header-desktop-only" id="dspHeaderQuickRefBtn" title="Tra cứu Siêu tốc: Công thức, ECG/ABG & ACLS" style="color:var(--color-primary, #0284c7);">
          <i class="fa-solid fa-bolt"></i>
        </button>

        <button type="button" class="dsp-header-icon-btn dsp-header-desktop-only" id="dspHeaderDrugIntelBtn" title="Drug Intelligence — Dược thư & Tương tác thuốc" style="color:#db2777;">
          <i class="fa-solid fa-pills"></i>
        </button>

        <button type="button" class="dsp-header-icon-btn dsp-header-desktop-only" id="dspHeaderToolsBtn" title="Kho Thang điểm & Công cụ Tính toán" style="color:#f59e0b;">
          <i class="fa-solid fa-calculator"></i>
        </button>

        <div class="dsp-header-profile-chip dsp-header-desktop-only" title="Hồ sơ bác sĩ: ${escapeHtml(profile.displayName)}">
          <div class="dsp-avatar dsp-avatar--xs">${getInitials(profile.displayName)}</div>
          <span class="dsp-header-profile-name">${escapeHtml(profile.displayName)}</span>
        </div>

        <button type="button" class="dsp-header-icon-btn" id="dspHeaderSettingsBtn" title="Cài đặt & Tiện ích DocSpace" style="color:var(--color-text);">
          <i class="fa-solid fa-gear"></i>
        </button>

        <a href="#/" class="dsp-header-btn-home" title="Trở về Trang chủ CliniPortal">
          <i class="fa-solid fa-house"></i> <span>Trang chủ</span>
        </a>
      </div>
    </header>
  `;
}

// ─── Sidebar ─────────────────────────────────────────────────────

export function renderSidebar(profile: DoctorProfile, activeId: string): string {
  const sectionsHtml = DSP_NAV_SECTIONS.map(section => {
    const itemsHtml = section.items.map(item => {
      const isActive = item.id === activeId;
      const isPhase2 = item.phase === 2;
      const isPhase3 = item.phase === 3;
      let badgeHtml = '';
      if (item.badgeText) {
        badgeHtml = `<span class="dsp-soon-badge" style="background:var(--dsp-violet, #8b5cf6);color:#fff;border:none;">${escapeHtml(item.badgeText)}</span>`;
      } else if (item.badge && item.badge > 0) {
        badgeHtml = `<span class="dsp-nav-counter">${item.badge}</span>`;
      } else if (isPhase2) {
        badgeHtml = `<span class="dsp-soon-badge">Soon</span>`;
      } else if (isPhase3) {
        badgeHtml = `<span class="dsp-soon-badge" style="background:var(--dsp-violet, #8b5cf6);color:#fff;border:none;">AI Lab</span>`;
      }
      
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
      <div class="dsp-nav-section" id="dspNavSection-${section.id}">
        <div class="dsp-nav-section-title">
          ${section.icon ? `<i class="${section.icon}"></i>` : ''}
          <span>${section.title}</span>
        </div>
        <div class="dsp-nav-section-items">
          ${itemsHtml}
        </div>
      </div>
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
        ${sectionsHtml}
      </nav>

      <div class="dsp-sidebar-footer">
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarSettingsBtn" style="font-weight:700; color:var(--color-primary); cursor:pointer;">
          <i class="fa-solid fa-gear" style="color:var(--color-primary);"></i>
          <span>Cài đặt &amp; Tiện ích</span>
        </button>
        <a href="#/" class="dsp-nav-item dsp-nav-item--footer" title="Trở về Trang chủ CliniPortal">
          <i class="fa-solid fa-house" style="color:var(--color-text-muted);"></i>
          <span>Về Trang chủ</span>
        </a>
      </div>
    </aside>
    <div class="dsp-sidebar-backdrop" id="dspSidebarBackdrop"></div>
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

