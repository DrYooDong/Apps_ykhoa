/**
 * DocSpace — Dashboard View
 * Hub chính: Profile selector + Stats + Navigation
 */

import { getActiveProfile, getAllProfiles, createProfile, setActiveProfile, exportProfile, getStats, getAllSoapPatients } from './storage';
import { DoctorProfile, DocSpaceNavItem, DocSpaceNavSection, SoapPatientRecord } from './types';

export const DSP_NAV_SECTIONS: DocSpaceNavSection[] = [
  {
    id: 'clinical',
    title: 'Hồ sơ & Ca bệnh',
    icon: 'fa-solid fa-notes-medical',
    items: [
      { id: 'dashboard',    label: 'Tổng quan Bento',     href: '#/docspace',              icon: 'fa-solid fa-house-medical',  phase: 1 },
      { id: 'soap',         label: 'Sổ Tay SOAP',         href: '#/docspace/soap',         icon: 'fa-solid fa-notes-medical',  phase: 1 },
      { id: 'chronic-care', label: 'Bệnh Mạn Tính',       href: '#/docspace/chronic-care', icon: 'fa-solid fa-heart-pulse',   phase: 1 },
      { id: 'notes',        label: 'Ghi chú Lâm sàng',    href: '#/docspace/notes',        icon: 'fa-solid fa-note-sticky',    phase: 1 },
    ],
  },
  {
    id: 'shift',
    title: 'Tua trực & Giao ban',
    icon: 'fa-solid fa-user-clock',
    items: [
      { id: 'oncall',       label: 'Checklist Tua trực',  href: '#/docspace/oncall',       icon: 'fa-solid fa-list-check',     phase: 1 },
      { id: 'sbar',         label: 'Bàn giao SBAR',       href: '#/docspace/sbar',         icon: 'fa-solid fa-file-waveform',  phase: 1 },
    ],
  },
  {
    id: 'decision-support',
    title: 'Công cụ & Ra quyết định',
    icon: 'fa-solid fa-wand-magic-sparkles',
    items: [
      { id: 'flowcharts',   label: 'Lưu Đồ Thuật Toán',   href: '#/docspace/flowcharts',   icon: 'fa-solid fa-sitemap',        phase: 1, badgeText: 'EBM' },
      { id: 'telemetry',    label: 'Telemetry 24h & NEWS2', href: '#/docspace/telemetry',  icon: 'fa-solid fa-tower-broadcast', phase: 1, badgeText: 'AI Live' },
      { id: 'devices',      label: 'Thiết Bị Buồng Bệnh', href: '#/docspace/devices',     icon: 'fa-solid fa-satellite-dish', phase: 1, badgeText: 'HL7' },
      { id: 'studios',      label: 'Clinical Studios',    href: '#/docspace/studios',      icon: 'fa-solid fa-calculator',     phase: 1, badgeText: 'Pro' },
      { id: 'protocol',     label: 'Phác đồ Xử trí',      href: '#/docspace/protocol',     icon: 'fa-solid fa-book-medical',   phase: 1 },
      { id: 'insights',     label: 'AI Insights & Tải trực', href: '#/docspace/insights',  icon: 'fa-solid fa-brain',          phase: 1 },
      { id: 'sandbox',      label: 'Sandbox Mô phỏng',    href: '#/docspace/sandbox',      icon: 'fa-solid fa-flask',          phase: 3, badgeText: 'AI Lab' },
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
          <button type="button" class="dsp-profile-card dsp-holo-card" data-profile-id="${escapeHtml(p.id)}" id="select-profile-${escapeHtml(p.id)}">
            <div class="dsp-profile-card-glow"></div>
            <div class="dsp-avatar dsp-avatar--profile dsp-avatar--glowing">${getInitials(p.displayName)}</div>
            <div class="dsp-profile-info">
              <div class="dsp-profile-name-row">
                <div class="dsp-profile-name">${escapeHtml(p.displayName)}</div>
                <span class="dsp-chip-emr-active"><i class="fa-solid fa-microchip"></i> EMR ID</span>
              </div>
              <div class="dsp-profile-meta">
                <span class="dsp-spec-badge"><i class="fa-solid fa-user-doctor"></i> ${escapeHtml(p.specialty || 'Bác sĩ Lâm sàng')}</span>
                <code class="dsp-id-tag"><i class="fa-solid fa-fingerprint"></i> ${escapeHtml(p.id)}</code>
              </div>
              <div class="dsp-profile-date">
                <i class="fa-solid fa-clock-rotate-left"></i> Hoạt động gần nhất: <strong>${formatRelativeDate(p.lastActiveAt)}</strong>
              </div>
            </div>
            <div class="dsp-profile-arrow-wrap">
              <span class="dsp-profile-action-text">Vào Trực</span>
              <i class="fa-solid fa-arrow-right-to-bracket dsp-profile-arrow" title="Truy cập Workspace"></i>
            </div>
          </button>
          <button type="button" class="dsp-profile-del-btn" data-delete-profile-id="${escapeHtml(p.id)}" data-profile-name="${escapeHtml(p.displayName)}" title="Xóa hồ sơ này khỏi trình duyệt">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('')
    : `
      <div class="dsp-empty-welcome-card dsp-holo-welcome">
        <div class="dsp-empty-welcome-icon">
          <i class="fa-solid fa-stethoscope"></i>
          <span class="dsp-icon-radar-ping"></span>
        </div>
        <h3 class="dsp-empty-welcome-title">Chào mừng Quý Bác sĩ tới DocSpace OS</h3>
        <p class="dsp-empty-welcome-desc">Khởi tạo hồ sơ lâm sàng cá nhân để kích hoạt toàn bộ trạm điều khiển bệnh án SOAP, bảng bàn giao SBAR, Telemetry 24h và hệ thống ra quyết định CRCE.</p>
        
        <div class="dsp-starter-presets-box">
          <div class="dsp-starter-presets-label"><i class="fa-solid fa-wand-magic-sparkles"></i> Khởi động nhanh với mẫu Bác sĩ chuyên khoa:</div>
          <div class="dsp-starter-chips-grid">
            <button type="button" class="dsp-preset-chip dsp-preset-chip--internal" data-preset-id="BS_NoiKhoa_Demo" data-preset-name="BS. Nội Tổng Quát" data-preset-spec="Nội khoa Tổng quát">
              <i class="fa-solid fa-stethoscope"></i> <span>BS. Nội khoa</span>
            </button>
            <button type="button" class="dsp-preset-chip dsp-preset-chip--icu" data-preset-id="BS_CapCuuICU_Demo" data-preset-name="BS. Cấp Cứu - Hồi Sức" data-preset-spec="Cấp cứu &amp; Hồi sức tích cực (ICU)">
              <i class="fa-solid fa-truck-medical"></i> <span>BS. Cấp cứu ICU</span>
            </button>
            <button type="button" class="dsp-preset-chip dsp-preset-chip--pediatric" data-preset-id="BS_NhiKhoa_Demo" data-preset-name="BS. Nhi Khoa Lâm Sàng" data-preset-spec="Nhi khoa">
              <i class="fa-solid fa-baby"></i> <span>BS. Nhi khoa</span>
            </button>
            <button type="button" class="dsp-preset-chip dsp-preset-chip--cardio" data-preset-id="BS_TimMach_Demo" data-preset-name="BS. Tim Mạch Lâm Sàng" data-preset-spec="Tim mạch Can thiệp">
              <i class="fa-solid fa-heart-pulse"></i> <span>BS. Tim mạch</span>
            </button>
          </div>
        </div>
      </div>
    `;

  return `
    <div class="dsp-profile-selector" id="dspProfileSelector">
      <!-- Background Ambient Aurora Blobs -->
      <div class="dsp-ambient-blob dsp-ambient-blob--1"></div>
      <div class="dsp-ambient-blob dsp-ambient-blob--2"></div>
      <div class="dsp-ambient-blob dsp-ambient-blob--3"></div>
      <div class="dsp-ambient-mesh"></div>

      <div class="dsp-selector-container">
        
        <!-- LEFT SHOWCASE PANE (Medical OS Highlights) -->
        <div class="dsp-selector-brand-pane">
          <div class="dsp-brand-top">
            <div class="dsp-logo-mark-wrap">
              <div class="dsp-logo-mark">
                <i class="fa-solid fa-heart-pulse"></i>
              </div>
              <span class="dsp-pulse-ring"></span>
            </div>
            <div class="dsp-brand-badges">
              <span class="dsp-badge-pill"><i class="fa-solid fa-shield-halved"></i> HIPAA PHI Safe</span>
              <span class="dsp-badge-pill dsp-badge-pill--accent"><i class="fa-solid fa-bolt"></i> Medical OS v4.0 Pro</span>
            </div>
            <h1 class="dsp-brand-title">DocSpace <span class="dsp-gradient-text">Pro Workstation</span></h1>
            <p class="dsp-brand-tagline">Hệ điều hành Lâm sàng Toàn diện, Bệnh án Điện tử Thông minh &amp; Động cơ Quyết định Y khoa (CRCE 5 Bước)</p>
          </div>

          <!-- Clinical Highlights Grid -->
          <div class="dsp-brand-features">
            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(14, 165, 233, 0.15); color: #0284c7;">
                <i class="fa-solid fa-notes-medical"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Bệnh án SOAP &amp; SBAR Handoff</strong>
                <p>Chuẩn hóa ghi chú ca bệnh, cảnh báo diễn tiến bất thường và bàn giao ca trực an toàn.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(139, 92, 246, 0.15); color: #8b5cf6;">
                <i class="fa-solid fa-brain"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Động cơ CRCE &amp; AI Copilot</strong>
                <p>Khí máu ABG Studio, Chỉnh liều kháng sinh PK/PD, Tra cứu tương tác và phác đồ EBM.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
                <i class="fa-solid fa-tower-broadcast"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Telemetry 24h &amp; Thiết Bị IoT</strong>
                <p>Giám sát quỹ đạo sinh hiệu, dự báo điểm suy tạng NEWS2 và đồng bộ máy theo dõi buồng bệnh.</p>
              </div>
            </div>

            <div class="dsp-brand-feat-card">
              <div class="dsp-feat-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                <i class="fa-solid fa-file-medical"></i>
              </div>
              <div class="dsp-feat-content">
                <strong>Chuẩn Y tế HL7 FHIR R4</strong>
                <p>Bảo mật dữ liệu trên máy tính cá nhân, độc lập mạng bệnh viện, sao lưu JSON 1-click.</p>
              </div>
            </div>
          </div>

          <!-- Bottom Trust Indicator -->
          <div class="dsp-brand-footer">
            <div class="dsp-status-live">
              <span class="dsp-status-dot"></span>
              <span>Trạm làm việc sẵn sàng • Sức mạnh Offline 100%</span>
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
  const patients = getAllSoapPatients(profile.id);

  // Phân loại Triage lâm sàng
  const criticalPatients = patients.filter(p => {
    const diag = (p.currentDiagnosis || p.admissionDiagnosis || '').toLowerCase();
    const assess = (p.aAssessment || '').toLowerCase();
    return diag.includes('sốc') || diag.includes('nguy kịch') || diag.includes('cấp cứu') || assess.includes('sốc') || assess.includes('nguy kịch');
  });

  const severePatients = patients.filter(p => {
    if (criticalPatients.some(cp => cp.id === p.id)) return false;
    const diag = (p.currentDiagnosis || p.admissionDiagnosis || '').toLowerCase();
    const assess = (p.aAssessment || '').toLowerCase();
    return diag.includes('nặng') || diag.includes('theo dõi') || diag.includes('suy') || diag.includes('tụt') || assess.includes('tụt') || assess.includes('nặng');
  });

  const stablePatients = patients.filter(p => {
    return !criticalPatients.some(cp => cp.id === p.id) && !severePatients.some(sp => sp.id === p.id);
  });

  // Checklist nhiệm vụ trực tồn đọng
  const pendingTasksList: { id: string; title: string; category: string; priority: 'danger' | 'warning' | 'info'; link: string }[] = [];
  patients.forEach(p => {
    if (!p.isEmrEntered) {
      pendingTasksList.push({
        id: `emr-${p.id}`,
        title: `Nhập EMR bệnh án [G.${p.bedNumber || '?'}] ${p.fullName}`,
        category: 'Hồ sơ EMR',
        priority: 'danger',
        link: '#/docspace/soap'
      });
    }
    if (p.soapStatus === 'chua_lam') {
      pendingTasksList.push({
        id: `soap-${p.id}`,
        title: `Khám & Soạn SOAP [G.${p.bedNumber || '?'}] ${p.fullName}`,
        category: 'Sổ tay SOAP',
        priority: 'warning',
        link: '#/docspace/soap'
      });
    }
    (p.clsOrders || []).forEach(o => {
      if (!o.isDone) {
        pendingTasksList.push({
          id: `cls-${p.id}-${o.id}`,
          title: `Chờ KQ ${o.name} [G.${p.bedNumber || '?'}] ${p.fullName}`,
          category: 'Cận lâm sàng',
          priority: 'info',
          link: '#/docspace/soap'
        });
      }
    });
  });

  const activePat: SoapPatientRecord | null = patients[0] || null;

  let backupBanner = '';
  if (stats.lastBackupDays !== null && stats.lastBackupDays > 3) {
    backupBanner = `
      <div class="dsp-alert-banner dsp-alert-banner--warning">
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
          
          <!-- Bento Hero Shift Banner (Aurora Medical OS Pro) -->
          <div class="dsp-bento-hero dsp-holo-hero">
            <div class="dsp-bento-hero-glow"></div>
            <div class="dsp-bento-hero-left">
              <div class="dsp-hero-shift-badge">
                <span class="dsp-live-pulse-dot"></span>
                <span class="dsp-shift-live-text"><i class="fa-solid fa-hospital-user"></i> CA TRỰC ĐANG HOẠT ĐỘNG • KHOA ${escapeHtml((profile.specialty || 'Hồi Sức / Nội Tổng Quát').toUpperCase())}</span>
              </div>
              <h1 class="dsp-bento-hero-title">
                Bác sĩ <span class="dsp-hero-dr-name dsp-gradient-text">${escapeHtml(profile.displayName)}</span>
              </h1>
              <p class="dsp-bento-hero-sub">
                Hệ điều hành lâm sàng đồng bộ thời gian thực: Giám sát <strong>${patients.length} bệnh nhân nội trú</strong>, tích hợp Động cơ CRCE 5 bước và bảo mật HL7 FHIR Safe Harbor.
              </p>
              
              <!-- Quick Stats Ticker -->
              <div class="dsp-hero-quick-vitals">
                <div class="dsp-hero-mini-stat">
                  <i class="fa-solid fa-bed" style="color:var(--dsp-sky);"></i>
                  <span><strong>${patients.length}</strong> Bệnh nhân</span>
                </div>
                <div class="dsp-hero-mini-stat">
                  <i class="fa-solid fa-triangle-exclamation" style="color:var(--dsp-rose);"></i>
                  <span><strong>${criticalPatients.length}</strong> Cần chú ý</span>
                </div>
                <div class="dsp-hero-mini-stat">
                  <i class="fa-solid fa-list-check" style="color:var(--dsp-amber);"></i>
                  <span><strong>${pendingTasksList.length}</strong> Việc trực</span>
                </div>
              </div>
            </div>

            <div class="dsp-bento-hero-actions">
              <a href="#/docspace/soap" class="dsp-hero-btn dsp-hero-btn--primary">
                <i class="fa-solid fa-notes-medical"></i>
                <span>Thăm Khám SOAP</span>
              </a>
              <button type="button" class="dsp-hero-btn dsp-hero-btn--emerald" id="btnHeroTriggerCRCE">
                <i class="fa-solid fa-bolt"></i>
                <span>Kích Hoạt CRCE</span>
              </button>
              <button type="button" class="dsp-hero-btn dsp-hero-btn--ghost" id="dspExportBtn" title="Sao lưu toàn bộ hồ sơ (JSON Backup)">
                <i class="fa-solid fa-file-export"></i>
              </button>
              <button type="button" class="dsp-hero-btn dsp-hero-btn--ghost" id="dspSwitchProfileBtn" title="Chuyển đổi hồ sơ Bác sĩ">
                <i class="fa-solid fa-user-doctor"></i>
              </button>
            </div>
          </div>

          <!-- 4 Bento Triage Metric Counters (Glassmorphism Elevation) -->
          <div class="dsp-triage-grid">
            
            <!-- 1. Critical / Emergency -->
            <a href="#/docspace/soap" class="dsp-triage-card dsp-triage-card--critical">
              <div class="dsp-triage-card-shine"></div>
              <div class="dsp-triage-top">
                <span class="dsp-triage-label"><i class="fa-solid fa-circle-radiation"></i> Cấp cứu / Nguy kịch</span>
                <span class="dsp-ping-dot dsp-ping-dot--danger"></span>
              </div>
              <div class="dsp-triage-count-row">
                <div class="dsp-triage-count">${criticalPatients.length}</div>
                <span class="dsp-triage-unit">ca</span>
              </div>
              <div class="dsp-triage-desc">Cần can thiệp khẩn cấp &amp; hồi sức sát</div>
            </a>

            <!-- 2. Severe / Watch -->
            <a href="#/docspace/soap" class="dsp-triage-card dsp-triage-card--severe">
              <div class="dsp-triage-card-shine"></div>
              <div class="dsp-triage-top">
                <span class="dsp-triage-label"><i class="fa-solid fa-triangle-exclamation"></i> Nặng / Theo dõi</span>
                <span class="dsp-ping-dot dsp-ping-dot--warning"></span>
              </div>
              <div class="dsp-triage-count-row">
                <div class="dsp-triage-count">${severePatients.length}</div>
                <span class="dsp-triage-unit">ca</span>
              </div>
              <div class="dsp-triage-desc">Cảnh báo biến chứng &amp; theo dõi sát</div>
            </a>

            <!-- 3. Stable / Recovering -->
            <a href="#/docspace/soap" class="dsp-triage-card dsp-triage-card--stable">
              <div class="dsp-triage-card-shine"></div>
              <div class="dsp-triage-top">
                <span class="dsp-triage-label"><i class="fa-solid fa-circle-check"></i> Ổn định / Xuất viện</span>
                <span class="dsp-ping-dot dsp-ping-dot--success"></span>
              </div>
              <div class="dsp-triage-count-row">
                <div class="dsp-triage-count">${stablePatients.length}</div>
                <span class="dsp-triage-unit">ca</span>
              </div>
              <div class="dsp-triage-desc">Điều trị duy trì hoặc chờ xuất viện</div>
            </a>

            <!-- 4. Pending On-Call Tasks -->
            <a href="#/docspace/oncall" class="dsp-triage-card dsp-triage-card--tasks">
              <div class="dsp-triage-card-shine"></div>
              <div class="dsp-triage-top">
                <span class="dsp-triage-label"><i class="fa-solid fa-list-check"></i> Nhiệm vụ trực tồn đọng</span>
                <span class="dsp-ping-dot dsp-ping-dot--info"></span>
              </div>
              <div class="dsp-triage-count-row">
                <div class="dsp-triage-count">${pendingTasksList.length}</div>
                <span class="dsp-triage-unit">mục</span>
              </div>
              <div class="dsp-triage-desc">Checklist ca trực chưa hoàn tất</div>
            </a>

          </div>

          <!-- Bento Middle Grid: Active Patient Spotlight & On-Call Tasks -->
          <div class="dsp-bento-split-grid">
            
            <!-- Left: Active Bedside Patient Spotlight -->
            <div class="dsp-bento-card dsp-bento-spotlight">
              <div class="dsp-bento-card-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="dsp-icon-badge dsp-icon-badge--sky"><i class="fa-solid fa-bed-pulse"></i></span>
                  <h2 class="dsp-bento-card-title">Bệnh Nhân Trọng Điểm Tại Giường</h2>
                </div>
                <a href="#/docspace/soap" class="dsp-bento-card-action">Mở Sổ SOAP <i class="fa-solid fa-arrow-right"></i></a>
              </div>

              ${activePat ? `
                <div class="dsp-spotlight-body">
                  <div class="dsp-spotlight-main">
                    <div class="dsp-avatar dsp-avatar--patient">
                      ${getInitials(activePat.fullName)}
                    </div>
                    <div class="dsp-spotlight-meta">
                      <div class="dsp-spotlight-name-row">
                        <span class="dsp-spotlight-name">${escapeHtml(activePat.fullName)}</span>
                        <span class="dsp-spotlight-badge">${activePat.gender === 'nam' ? 'Nam' : 'Nữ'}, ${activePat.age} tuổi</span>
                        <span class="dsp-spotlight-badge dsp-spotlight-badge--bed"><i class="fa-solid fa-bed"></i> G.${escapeHtml(activePat.bedNumber || 'N/A')}</span>
                      </div>
                      <div class="dsp-spotlight-diag">
                        <i class="fa-solid fa-stethoscope" style="color:var(--dsp-sky);"></i> 
                        <strong>${escapeHtml(activePat.currentDiagnosis || activePat.admissionDiagnosis || 'Chưa ghi nhận')}</strong>
                        ${activePat.dayOfIllness ? `<span class="dsp-day-tag">Ngày ${activePat.dayOfIllness}</span>` : ''}
                      </div>
                    </div>
                  </div>

                  <!-- Live Vitals Bar -->
                  <div class="dsp-vitals-strip">
                    <div class="dsp-vital-chip">
                      <span class="dsp-vital-title"><i class="fa-solid fa-gauge-high" style="color:#0284c7;"></i> MAP</span>
                      <span class="dsp-vital-num">78 <small>mmHg</small></span>
                    </div>
                    <div class="dsp-vital-chip">
                      <span class="dsp-vital-title"><i class="fa-solid fa-heart-pulse" style="color:#e11d48;"></i> HR</span>
                      <span class="dsp-vital-num">84 <small>bpm</small></span>
                    </div>
                    <div class="dsp-vital-chip">
                      <span class="dsp-vital-title"><i class="fa-solid fa-lungs" style="color:#0d9488;"></i> SpO2</span>
                      <span class="dsp-vital-num">98 <small>%</small></span>
                    </div>
                    <div class="dsp-vital-chip">
                      <span class="dsp-vital-title"><i class="fa-solid fa-temperature-three-quarters" style="color:#ea580c;"></i> Temp</span>
                      <span class="dsp-vital-num">37.2 <small>°C</small></span>
                    </div>
                    <div class="dsp-vital-chip">
                      <span class="dsp-vital-title"><i class="fa-solid fa-triangle-exclamation" style="color:#7c3aed;"></i> NEWS2</span>
                      <span class="dsp-vital-num" style="color:#10b981;">2 <small>điểm</small></span>
                    </div>
                  </div>

                  <!-- Quick Action Buttons for Active Patient -->
                  <div class="dsp-spotlight-actions">
                    <a href="#/docspace/soap" class="dsp-btn dsp-btn-sm dsp-btn-primary">
                      <i class="fa-solid fa-pen-to-square"></i> Cập Nhật SOAP
                    </a>
                    <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-emerald" id="btnSpotlightCRCE" data-pat-id="${activePat.id}">
                      <i class="fa-solid fa-bolt"></i> CRCE 5 Bước
                    </button>
                    <a href="#/docspace/telemetry" class="dsp-btn dsp-btn-sm dsp-btn-outline">
                      <i class="fa-solid fa-tower-broadcast"></i> Telemetry 24h
                    </a>
                  </div>
                </div>
              ` : `
                <div class="dsp-empty-spotlight">
                  <i class="fa-solid fa-notes-medical" style="font-size:2rem; opacity:0.5; margin-bottom:8px;"></i>
                  <p>Chưa có bệnh nhân nào trong buồng bệnh trực tiếp.</p>
                  <a href="#/docspace/soap" class="dsp-btn dsp-btn-sm dsp-btn-primary"><i class="fa-solid fa-plus"></i> Thêm Bệnh Nhân</a>
                </div>
              `}
            </div>

            <!-- Right: On-Call Task Checklist Mini Widget -->
            <div class="dsp-bento-card dsp-bento-tasks">
              <div class="dsp-bento-card-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="dsp-icon-badge dsp-icon-badge--amber"><i class="fa-solid fa-list-check"></i></span>
                  <h2 class="dsp-bento-card-title">Nhiệm Vụ Ca Trực Nhanh</h2>
                </div>
                <a href="#/docspace/oncall" class="dsp-bento-card-action">Xem Tất Cả (${pendingTasksList.length}) <i class="fa-solid fa-arrow-right"></i></a>
              </div>

              <div class="dsp-task-mini-list">
                ${pendingTasksList.length > 0 ? pendingTasksList.slice(0, 5).map(task => `
                  <div class="dsp-task-mini-item">
                    <span class="dsp-task-mini-bullet dsp-task-mini-bullet--${task.priority}"></span>
                    <div class="dsp-task-mini-content">
                      <span class="dsp-task-mini-title">${escapeHtml(task.title)}</span>
                      <span class="dsp-task-mini-tag">${escapeHtml(task.category)}</span>
                    </div>
                    <a href="${task.link}" class="dsp-task-mini-link" title="Mở xử trí"><i class="fa-solid fa-chevron-right"></i></a>
                  </div>
                `).join('') : `
                  <div class="dsp-empty-tasks-message">
                    <i class="fa-solid fa-circle-check" style="color:#10b981; font-size:1.5rem; margin-bottom:6px;"></i>
                    <p>Mọi nhiệm vụ trong tua trực đều đã hoàn tất!</p>
                  </div>
                `}
              </div>
            </div>

          </div>

          <!-- Fast Clinical HUD Action Dock -->
          <div class="dsp-bento-card" style="margin-top:1.25rem;">
            <div class="dsp-bento-card-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="dsp-icon-badge dsp-icon-badge--indigo"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
                <h2 class="dsp-bento-card-title">Trạm Điều Khiển Lâm Sàng &amp; Phím Tắt Tác Chiến</h2>
              </div>
              <span class="dsp-section-badge">Hệ Thống Trực Tuyến</span>
            </div>

            <div class="dsp-hud-actions-grid">
              <button type="button" class="dsp-hud-action-tile" id="btnTriggerReactionChainTile">
                <div class="dsp-hud-icon dsp-hud-icon--sky"><i class="fa-solid fa-bolt"></i></div>
                <div class="dsp-hud-text">
                  <strong>CRCE Engine 5 Bước</strong>
                  <small>Triệu chứng ➔ CĐ ➔ Phác đồ ➔ Dược</small>
                </div>
              </button>

              <a href="#/docspace/telemetry" class="dsp-hud-action-tile">
                <div class="dsp-hud-icon dsp-hud-icon--teal"><i class="fa-solid fa-tower-broadcast"></i></div>
                <div class="dsp-hud-text">
                  <strong>Telemetry Dự Báo 24h</strong>
                  <small>Quỹ đạo sinh hiệu &amp; 95% CI</small>
                </div>
              </a>

              <a href="#/docspace/sbar" class="dsp-hud-action-tile">
                <div class="dsp-hud-icon dsp-hud-icon--rose"><i class="fa-solid fa-file-waveform"></i></div>
                <div class="dsp-hud-text">
                  <strong>Bàn Giao SBAR</strong>
                  <small>Giao ban ca trực chuẩn hóa</small>
                </div>
              </a>

              <a href="#/docspace/studios" class="dsp-hud-action-tile">
                <div class="dsp-hud-icon dsp-hud-icon--amber"><i class="fa-solid fa-calculator"></i></div>
                <div class="dsp-hud-text">
                  <strong>Clinical Studios Pro</strong>
                  <small>ABG, Cardio, eGFR, Sepsis</small>
                </div>
              </a>

              <button type="button" class="dsp-hud-action-tile" id="btnTriggerDrugIntelTile">
                <div class="dsp-hud-icon dsp-hud-icon--violet"><i class="fa-solid fa-pills"></i></div>
                <div class="dsp-hud-text">
                  <strong>Drug Intelligence</strong>
                  <small>Tương tác thuốc &amp; Chỉnh liều thận</small>
                </div>
              </button>

              <button type="button" class="dsp-hud-action-tile" id="btnTriggerVaultTile">
                <div class="dsp-hud-icon dsp-hud-icon--emerald"><i class="fa-solid fa-book-medical"></i></div>
                <div class="dsp-hud-text">
                  <strong>Knowledge Vault</strong>
                  <small>2.362+ Bài viết EBM &amp; Guidelines</small>
                </div>
              </button>
            </div>
          </div>

          <!-- AI Practice Insights & Practice Pulse Banner Widget -->
          <div class="dsp-bento-card dsp-bento-insights" style="margin-top:1.25rem;">
            <div class="dsp-bento-card-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="dsp-icon-badge dsp-icon-badge--violet"><i class="fa-solid fa-brain"></i></span>
                <h2 class="dsp-bento-card-title">AI Practice Insights &amp; Sức Khỏe Nghề Nghiệp</h2>
              </div>
              <a href="#/docspace/insights" class="dsp-bento-card-action">Mở Toàn Diện Insights <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div class="dsp-insights-chips-grid">
              <div class="dsp-insight-stat-chip">
                <div class="dsp-insight-chip-label"><i class="fa-solid fa-chart-pie" style="color:var(--dsp-sky);"></i> Top Bệnh Lý</div>
                <div class="dsp-insight-chip-value">Top 10 Phân Tích</div>
                <div class="dsp-insight-chip-sub">Biểu đồ SVG Donut</div>
              </div>
              <div class="dsp-insight-stat-chip">
                <div class="dsp-insight-chip-label"><i class="fa-solid fa-heart-pulse" style="color:#10b981;"></i> Wellness Guardian</div>
                <div class="dsp-insight-chip-value">Đo tải trọng &amp; Kiệt sức</div>
                <div class="dsp-insight-chip-sub">Burnout Signal Alert</div>
              </div>
              <div class="dsp-insight-stat-chip">
                <div class="dsp-insight-chip-label"><i class="fa-solid fa-sparkles" style="color:#8b5cf6;"></i> Gemini Clinical AI</div>
                <div class="dsp-insight-chip-value">Tóm tắt Tuần Lâm sàng</div>
                <div class="dsp-insight-chip-sub">Gemini 1M Context AI</div>
              </div>
              <div class="dsp-insight-stat-chip">
                <div class="dsp-insight-chip-label"><i class="fa-solid fa-book-medical" style="color:#f59e0b;"></i> EBM Bridge 2.0</div>
                <div class="dsp-insight-chip-value">Gợi ý chứng cứ 2 chiều</div>
                <div class="dsp-insight-chip-sub">Kho Guidelines CliniPortal</div>
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
           data-label="${escapeHtml(item.label)}"
           title="${escapeHtml(item.label)}">
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
        <div class="dsp-sidebar-header-brand-wrap">
          <a href="#/" class="dsp-sidebar-back" title="Trở về Trang chủ CliniPortal">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <div class="dsp-sidebar-brand">
            <i class="fa-solid fa-user-doctor"></i>
            <span>DocSpace</span>
          </div>
        </div>
        <div class="dsp-sidebar-header-actions">
          <button class="dsp-sidebar-toggle" id="dspSidebarToggle" title="Thu gọn / Mở rộng thanh bên" aria-label="Thu gọn danh mục sidebar">
            <i class="fa-solid fa-bars"></i>
          </button>
          <button class="dsp-sidebar-close-mobile" id="dspSidebarCloseMobile" title="Đóng danh mục" aria-label="Đóng thanh bên trên di động">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
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
        <button class="dsp-nav-item dsp-nav-item--footer" id="dspSidebarSettingsBtn" data-label="Cài đặt & Tiện ích" title="Cài đặt & Tiện ích" style="font-weight:700; color:var(--color-primary); cursor:pointer;">
          <i class="fa-solid fa-gear" style="color:var(--color-primary);"></i>
          <span>Cài đặt &amp; Tiện ích</span>
        </button>
        <a href="#/" class="dsp-nav-item dsp-nav-item--footer" data-label="Về Trang chủ" title="Trở về Trang chủ CliniPortal">
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

