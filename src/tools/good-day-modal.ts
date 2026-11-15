/**
 * CliniPortal 2.0 — Doctor Profile Bát Tự Slide-Over Drawer & Hero Badges (v3.0)
 * - Không lặp lại nội dung Cockpit (toàn bộ 12 giờ, 7 ngày, 30 ngày & Finder nằm trực tiếp trên trang chủ)
 * - Tự động lập Bát Tự Tứ Trụ & Nạp Âm 60 Hoa Giáp theo thời gian thực khi nhập ngày/giờ sinh
 * - 100% CSS Design Tokens (hỗ trợ Light & Dark Mode)
 * Path: src/tools/good-day-modal.ts
 */

import type { DoctorProfile, FinderPurpose, MedicalTaskType } from './good-day-types';
import {
  evaluateDayScore,
  getWeekEvaluation,
  getMonthEvaluation,
  findBestClinicalDays,
  calculateShiftEnergy,
  getDoctorProfile,
  saveDoctorProfile,
  getBatTuFourPillars,
  convertSolar2Lunar
} from './good-day-engine';

declare global {
  interface Window {
    GoodDayCalculator?: Record<string, unknown>;
    showToast?: (msg: string, type?: string) => void;
  }
}

const PROFILE_DRAWER_ID = 'goodDayProfileDrawerOverlay';
const ENERGY_DRAWER_ID = 'goodDayEnergyDrawerOverlay';

function notifyToast(msg: string, type: 'success' | 'info' | 'warning' = 'success'): void {
  if (typeof window.showToast === 'function') {
    window.showToast(msg, type);
    return;
  }
  const el = document.createElement('div');
  el.className = 'gd-floating-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-visible'));
  setTimeout(() => {
    el.classList.remove('is-visible');
    setTimeout(() => el.remove(), 260);
  }, 2600);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. HERO & HEADER BADGE UPDATERS
// ═══════════════════════════════════════════════════════════════════════════

export function updateDayScoreBadge(): void {
  const ev = evaluateDayScore(new Date());
  const btn = document.getElementById('heroDayScoreBtn');
  if (btn) {
    const scoreEl =
      document.getElementById('heroDayScoreVal') ||
      btn.querySelector('.hero-day-num') ||
      btn.querySelector('.day-score-badge-text');
    const subEl =
      document.getElementById('heroDayScoreText') ||
      btn.querySelector('.hero-day-sub');
    if (scoreEl) scoreEl.textContent = `${ev.total}/100`;
    if (subEl) {
      subEl.textContent = `${ev.canChiDay} • ${ev.humanEnv.score}/60 + ${ev.clinicalID.score}/40`;
    }
    btn.classList.remove('score-high', 'score-good', 'score-avg', 'score-low');
    btn.classList.add(ev.badgeClass);
    btn.setAttribute('title', ev.summaryText);
  }
}

export function updateHeroEnergyBadge(): void {
  const energy = calculateShiftEnergy(new Date());
  const btn = document.getElementById('heroEnergyScoreBtn');
  if (btn) {
    const valEl =
      document.getElementById('heroEnergyScoreVal') ||
      btn.querySelector('.hero-energy-val') ||
      document.getElementById('heroEnergyVal');
    const subEl =
      document.getElementById('heroEnergyScoreText') ||
      btn.querySelector('.hero-energy-shift') ||
      document.getElementById('heroEnergyShift');
    if (valEl) valEl.textContent = `${energy.energyPercent}%`;
    if (subEl) subEl.textContent = `${energy.statusText}`;
    btn.setAttribute('data-energy-level', energy.statusClass);
    btn.setAttribute('title', `${energy.shiftName} • ${energy.circadianPhase} (${energy.shiftRemainingText})`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. SLIDE-OVER DRAWER: HỒ SƠ BÁC SĨ TRUYỀN NHIỄM & BÁT TỰ TỰ ĐỘNG
// ═══════════════════════════════════════════════════════════════════════════

export function closeDoctorProfileDrawer(): void {
  const overlay = document.getElementById(PROFILE_DRAWER_ID);
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    overlay.remove();
  }, 240);
}

export function openDoctorProfileDrawer(onSaved?: (profile: DoctorProfile) => void): void {
  const existing = document.getElementById(PROFILE_DRAWER_ID);
  if (existing) existing.remove();

  const doc = getDoctorProfile();
  const overlay = document.createElement('div');
  overlay.id = PROFILE_DRAWER_ID;
  overlay.className = 'gd-drawer-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'gdDrawerTitle');

  overlay.innerHTML = `
    <div class="gd-drawer-backdrop" data-close-drawer></div>
    <aside class="gd-drawer-panel">
      <header class="gd-drawer-header">
        <div>
          <span class="gd-drawer-eyebrow">Hồ Sơ Cá Nhân Hóa Chronobiology</span>
          <h2 id="gdDrawerTitle" class="gd-drawer-title">Bác Sĩ & Bát Tự Tứ Trụ</h2>
        </div>
        <button type="button" class="gd-drawer-close" data-close-drawer aria-label="Đóng bảng hồ sơ">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </header>

      <div class="gd-drawer-body">
        <div class="gd-specialty-fixed-banner">
          <span class="gd-spec-badge"><i class="fa-solid fa-virus"></i> Truyền Nhiễm (Infectious Diseases)</span>
          <p class="gd-spec-note">Hệ thống cố định 40% trọng số lâm sàng theo đặc thù Sốt CRNN (FUO), Quản lý Kháng sinh (AMS), Source Control & Kiểm soát nhiễm khuẩn.</p>
        </div>

        <form id="gdDoctorProfileForm" class="gd-profile-form">
          <div class="gd-form-group">
            <label for="gdInputName">Họ tên / Danh xưng</label>
            <input id="gdInputName" type="text" value="${escapeHtml(doc.name)}" maxlength="48" placeholder="VD: BS. Nguyễn Phúc" required />
          </div>

          <div class="gd-form-group">
            <label>Giới tính (Ảnh hưởng quy tắc Trực Kỵ & Sinh học)</label>
            <div class="gd-gender-toggle">
              <label class="gd-radio-pill">
                <input type="radio" name="gdGender" value="Nam" ${doc.gender === 'Nam' ? 'checked' : ''} />
                <span><i class="fa-solid fa-mars"></i> Nam</span>
              </label>
              <label class="gd-radio-pill">
                <input type="radio" name="gdGender" value="Nữ" ${doc.gender === 'Nữ' ? 'checked' : ''} />
                <span><i class="fa-solid fa-venus"></i> Nữ</span>
              </label>
            </div>
          </div>

          <div class="gd-form-row-3">
            <div class="gd-form-group">
              <label for="gdInputDay">Ngày sinh</label>
              <input id="gdInputDay" type="number" min="1" max="31" value="${doc.birthDay}" required />
            </div>
            <div class="gd-form-group">
              <label for="gdInputMonth">Tháng sinh</label>
              <input id="gdInputMonth" type="number" min="1" max="12" value="${doc.birthMonth}" required />
            </div>
            <div class="gd-form-group">
              <label for="gdInputYear">Năm sinh (DL)</label>
              <input id="gdInputYear" type="number" min="1940" max="2025" value="${doc.birthYear}" required />
            </div>
          </div>

          <div class="gd-form-row-2">
            <div class="gd-form-group">
              <label for="gdInputHour">Giờ sinh (0–23h)</label>
              <input id="gdInputHour" type="number" min="0" max="23" value="${doc.birthHour}" required />
            </div>
            <div class="gd-form-group">
              <label for="gdInputMinute">Phút sinh (0–59p)</label>
              <input id="gdInputMinute" type="number" min="0" max="59" value="${doc.birthMinute}" required />
            </div>
          </div>

          <section class="gd-battu-preview-card" aria-live="polite">
            <div class="gd-battu-preview-head">
              <span><i class="fa-solid fa-compass"></i> Tự Động Tính Bát Tự & Nạp Âm</span>
              <span id="gdLunarBirthTag" class="gd-lunar-birth-tag"></span>
            </div>
            <div id="gdBatTuPreviewGrid" class="gd-battu-grid"></div>
            <div id="gdNapAmPreviewNote" class="gd-napam-note"></div>
          </section>

          <div class="gd-drawer-actions">
            <button type="button" class="gd-btn-secondary" data-close-drawer>Hủy</button>
            <button type="submit" class="gd-btn-primary">
              <i class="fa-solid fa-check"></i> Lưu & Tính Lại Toàn Bộ Điểm
            </button>
          </div>
        </form>
      </div>
    </aside>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-open'));

  const updatePreview = () => {
    const d = Math.max(1, Math.min(31, Number((overlay.querySelector('#gdInputDay') as HTMLInputElement).value) || 1));
    const m = Math.max(1, Math.min(12, Number((overlay.querySelector('#gdInputMonth') as HTMLInputElement).value) || 1));
    const y = Math.max(1940, Math.min(2025, Number((overlay.querySelector('#gdInputYear') as HTMLInputElement).value) || 1995));
    const hr = Math.max(0, Math.min(23, Number((overlay.querySelector('#gdInputHour') as HTMLInputElement).value) || 0));
    const mn = Math.max(0, Math.min(59, Number((overlay.querySelector('#gdInputMinute') as HTMLInputElement).value) || 0));

    const safeD = Math.min(d, new Date(y, m, 0).getDate());
    const dateObj = new Date(y, m - 1, safeD, hr, mn);
    const lunar = convertSolar2Lunar(safeD, m, y, 7);
    const batTu = getBatTuFourPillars(dateObj, hr);

    const tag = overlay.querySelector('#gdLunarBirthTag');
    const grid = overlay.querySelector('#gdBatTuPreviewGrid');
    const note = overlay.querySelector('#gdNapAmPreviewNote');

    if (tag) {
      tag.textContent = `Âm lịch: ${lunar.day}/${lunar.month}${lunar.isLeap ? 'N' : ''}/${lunar.year}`;
    }
    if (grid) {
      grid.innerHTML = `
        <div class="gd-pillar-box">
          <span class="gd-pillar-label">Trụ Năm</span>
          <strong>${batTu.yearFull}</strong>
          <small>${batTu.napAmYear.name}</small>
        </div>
        <div class="gd-pillar-box">
          <span class="gd-pillar-label">Trụ Tháng</span>
          <strong>${batTu.monthFull}</strong>
          <small>${lunar.monthLabel}</small>
        </div>
        <div class="gd-pillar-box">
          <span class="gd-pillar-label">Trụ Ngày</span>
          <strong>${batTu.dayFull}</strong>
          <small>${batTu.napAmDay.name}</small>
        </div>
        <div class="gd-pillar-box">
          <span class="gd-pillar-label">Trụ Giờ</span>
          <strong>${batTu.hourFull}</strong>
          <small>${batTu.napAmHour.name}</small>
        </div>
      `;
    }
    if (note) {
      note.innerHTML = `Mệnh Nạp Âm Bản Thân: <strong>${batTu.napAmYear.name} (${batTu.napAmYear.element})</strong> — ${batTu.napAmYear.meaning}`;
    }
  };

  updatePreview();
  ['#gdInputDay', '#gdInputMonth', '#gdInputYear', '#gdInputHour', '#gdInputMinute'].forEach((sel) => {
    overlay.querySelector(sel)?.addEventListener('input', updatePreview);
  });

  overlay.querySelectorAll('[data-close-drawer]').forEach((el) => {
    el.addEventListener('click', closeDoctorProfileDrawer);
  });

  const onEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDoctorProfileDrawer();
      document.removeEventListener('keydown', onEsc);
    }
  };
  document.addEventListener('keydown', onEsc);

  overlay.querySelector('#gdDoctorProfileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (overlay.querySelector('#gdInputName') as HTMLInputElement).value.trim();
    const gender = ((overlay.querySelector('input[name="gdGender"]:checked') as HTMLInputElement)?.value === 'Nữ'
      ? 'Nữ'
      : 'Nam') as 'Nam' | 'Nữ';
    const birthDay = Number((overlay.querySelector('#gdInputDay') as HTMLInputElement).value);
    const birthMonth = Number((overlay.querySelector('#gdInputMonth') as HTMLInputElement).value);
    const birthYear = Number((overlay.querySelector('#gdInputYear') as HTMLInputElement).value);
    const birthHour = Number((overlay.querySelector('#gdInputHour') as HTMLInputElement).value);
    const birthMinute = Number((overlay.querySelector('#gdInputMinute') as HTMLInputElement).value);

    const saved = saveDoctorProfile({
      name,
      gender,
      birthDay,
      birthMonth,
      birthYear,
      birthHour,
      birthMinute
    });

    updateDayScoreBadge();
    updateHeroEnergyBadge();
    window.dispatchEvent(new CustomEvent('cliniportal:doctor-profile-updated', { detail: saved }));
    if (typeof onSaved === 'function') onSaved(saved);
    closeDoctorProfileDrawer();
    notifyToast(`Đã cập nhật hồ sơ ${saved.name} (${saved.canNam} ${saved.chiNam} — ${saved.napAmName})`, 'success');
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. COMPACT CIRCADIAN SAFETY & ENERGY DRAWER
// ═══════════════════════════════════════════════════════════════════════════

export function closeEnergyDrawer(): void {
  const el = document.getElementById(ENERGY_DRAWER_ID);
  if (!el) return;
  el.classList.remove('is-open');
  setTimeout(() => el.remove(), 220);
}

export function openEnergyModal(): void {
  const existing = document.getElementById(ENERGY_DRAWER_ID);
  if (existing) existing.remove();

  const energy = calculateShiftEnergy(new Date());
  const ev = evaluateDayScore(new Date());

  const overlay = document.createElement('div');
  overlay.id = ENERGY_DRAWER_ID;
  overlay.className = 'gd-drawer-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'gdEnergyDrawerTitle');

  overlay.innerHTML = `
    <div class="gd-drawer-backdrop" data-close-energy></div>
    <aside class="gd-drawer-panel gd-drawer-panel--compact">
      <header class="gd-drawer-header">
        <div>
          <span class="gd-drawer-eyebrow">Nhịp Sinh Học Ca Trực • Truyền Nhiễm</span>
          <h2 id="gdEnergyDrawerTitle" class="gd-drawer-title">${energy.icon} ${energy.shiftName}</h2>
        </div>
        <button type="button" class="gd-drawer-close" data-close-energy aria-label="Đóng">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </header>

      <div class="gd-drawer-body">
        <div class="gd-energy-summary-box" data-level="${energy.statusClass}">
          <div class="gd-energy-pct">${energy.energyPercent}%</div>
          <div class="gd-energy-meta">
            <strong>${energy.statusText} • ${energy.shiftRemainingText}</strong>
            <span>${energy.circadianPhase}</span>
            <small>Khung giờ đỉnh hiệu suất: ${energy.peakHours}</small>
          </div>
        </div>

        ${
          energy.fatigueWarning
            ? `<div class="gd-alert-box is-warning"><i class="fa-solid fa-triangle-exclamation"></i><span>${energy.fatigueWarning}</span></div>`
            : ''
        }

        <div class="gd-info-block">
          <h4><i class="fa-solid fa-mug-hot"></i> Điều Tiết Caffeine & Nghỉ Ngơi</h4>
          <p>${energy.caffeineTip}</p>
        </div>

        <div class="gd-info-block">
          <h4><i class="fa-solid fa-shield-virus"></i> Checklist An Toàn Ca Trực Truyền Nhiễm</h4>
          <ul class="gd-checklist">
            ${energy.safetyChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>

        <div class="gd-info-block">
          <h4><i class="fa-solid fa-heart-pulse"></i> Nhịp Sinh Học Hôm Nay</h4>
          <p>Thể chất <strong>${ev.bio.physical}%</strong> • Cảm xúc <strong>${ev.bio.emotional}%</strong> • Trí tuệ <strong>${ev.bio.intellectual}%</strong> • Trực giác <strong>${ev.bio.intuitive}%</strong></p>
        </div>
      </div>
    </aside>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  overlay.querySelectorAll('[data-close-energy]').forEach((el) => el.addEventListener('click', closeEnergyDrawer));
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. COMPATIBILITY LAYER & ENTRYPOINT
// ═══════════════════════════════════════════════════════════════════════════

export function openDayScoreModal(
  _dateObj: Date = new Date(),
  defaultTab: 'day' | 'hours' | 'tasks' | 'week' | 'finder' | 'profile' = 'day'
): void {
  if (defaultTab === 'profile') {
    openDoctorProfileDrawer();
    return;
  }

  const targetMode =
    defaultTab === 'week' ? 'calendar' : defaultTab === 'finder' ? 'finder' : 'now';

  window.dispatchEvent(
    new CustomEvent('cliniportal:cockpit-switch-mode', {
      detail: { mode: targetMode, dateObj: _dateObj }
    })
  );

  const cockpit = document.getElementById('chronoWorkstation');
  if (cockpit) {
    cockpit.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function initGoodDayCalculator(): void {
  updateDayScoreBadge();
  updateHeroEnergyBadge();
}

if (typeof window !== 'undefined') {
  window.GoodDayCalculator = {
    evaluateDayScore,
    getWeekEvaluation,
    getMonthEvaluation,
    findBestClinicalDays: (p?: FinderPurpose, days?: number) => findBestClinicalDays(p, days),
    calculateShiftEnergy,
    getDoctorProfile,
    saveDoctorProfile,
    openModal: openDayScoreModal,
    openProfileDrawer: openDoctorProfileDrawer,
    openEnergyModal,
    updateDayScoreBadge,
    updateHeroEnergyBadge,
    evaluateSingleTask: (id: MedicalTaskType) => evaluateDayScore().clinicalID.tasks[id]
  };
}
