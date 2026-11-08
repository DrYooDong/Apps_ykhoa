/**
 * CliniPortal 2.0 — Clinician Briefing Banner View & Engine
 * Path: src/dashboard/clinician-briefing-banner.ts
 * 
 * Bảng Điều Hành Buổi Sáng & Sẵn Sàng Trực Ca
 * 100% Tokenized, Precision Biorhythms, SVG Living Charts & Icon-First UI
 */

import type {
  DoctorSpecialty,
  DoctorProfile,
  DayScoreEvaluation,
  MedicalTaskType,
  BiorhythmResult,
  GioRankResult
} from '../tools/good-day-types';

import {
  evaluateDayScore,
  calculateBiorhythms,
  getDoctorProfile,
  saveDoctorProfile,
  SPECIALTY_METAS
} from '../tools/good-day-engine';

import { openDayScoreModal } from '../tools/good-day-modal';

const COLLAPSE_KEY = 'cp_briefing_collapsed';
let currentSelectedDate = new Date();

/**
 * Render cấu trúc khung HTML của Section 2: Clinician Briefing Banner
 */
export function renderClinicianBriefingBanner(): string {
  const doc = getDoctorProfile();
  const spec = SPECIALTY_METAS[doc.specialty || 'internal_general'] || SPECIALTY_METAS.internal_general;
  const todayStr = new Date().toISOString().split('T')[0];

  return `
    <section class="clinician-briefing-banner" id="clinicianBriefingBanner" aria-label="Bảng Điều Hành Buổi Sáng & Sẵn Sàng Trực Ca">
      <!-- HEADER ROW -->
      <div class="briefing-header-row">
        <div class="briefing-header-left">
          <div class="briefing-label-badge" title="Chỉ số Thần khí, Nhịp sinh học lâm sàng & Thời khắc y lệnh">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Sẵn Sàng Trực Ca</span>
          </div>

          <!-- Specialty Switcher Dropdown Wrapper -->
          <div class="briefing-spec-wrapper">
            <button type="button" class="briefing-spec-btn" id="briefingSpecBtn" aria-haspopup="true" aria-expanded="false" title="Đổi Chuyên khoa Nội khoa để cập nhật trọng số Biorhythm">
              <span id="briefingSpecIcon">${spec.icon}</span>
              <span id="briefingSpecName">${spec.shortName}</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.6rem; opacity: 0.7;"></i>
            </button>
            <div class="briefing-spec-menu" id="briefingSpecMenu" role="menu">
              ${Object.values(SPECIALTY_METAS).map(m => `
                <button type="button" class="spec-menu-item ${m.id === spec.id ? 'is-selected' : ''}" data-spec="${m.id}" role="menuitem">
                  <span>${m.icon}</span>
                  <span>${m.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="briefing-header-controls">
          <!-- Date Picker -->
          <div class="briefing-date-picker" title="Chọn ngày để xem trước chỉ số trực ca">
            <i class="fa-regular fa-calendar" style="color: var(--color-primary); font-size: 0.72rem;"></i>
            <input type="date" class="briefing-date-input" id="briefingDateInput" value="${todayStr}" aria-label="Chọn ngày đánh giá" />
          </div>

          <!-- Nút Mở Modal Chi Tiết -->
          <button type="button" class="briefing-icon-btn" id="briefingOpenModalBtn" title="Xem chi tiết Lịch Vạn Niên & Vụ Việc Y Khoa Toàn Diện" aria-label="Mở chi tiết ngày tốt">
            <i class="fa-solid fa-up-right-from-square"></i>
          </button>

          <!-- Nút Thu Gọn / Mở Rộng -->
          <button type="button" class="briefing-icon-btn" id="briefingCollapseBtn" title="Thu gọn / Mở rộng bảng điều hành" aria-expanded="true" aria-controls="briefingBody">
            <i class="fa-solid fa-chevron-up" id="briefingCollapseIcon"></i>
          </button>
        </div>
      </div>

      <!-- COLLAPSED COMPACT RIBBON (Chỉ hiện khi thu gọn) -->
      <div class="briefing-ribbon" id="briefingRibbon">
        <div class="briefing-ribbon-item">
          <span id="ribbonScoreVal" style="color: var(--color-primary); font-weight: 800;">--/100</span>
          <span id="ribbonRatingText" class="gauge-rating-badge rating-great" style="font-size: 0.65rem;">--</span>
        </div>
        <span class="briefing-ribbon-sep">•</span>
        <div class="briefing-ribbon-item" id="ribbonBioPill">
          <span>🧠 Trí tuệ --%</span>
        </div>
        <span class="briefing-ribbon-sep">•</span>
        <div class="briefing-ribbon-item" id="ribbonHourPill">
          <span>⏰ --</span>
        </div>
        <span class="briefing-ribbon-sep">•</span>
        <div class="briefing-ribbon-item" id="ribbonTaskPill">
          <span>🔍 Khám ca khó: --</span>
        </div>
      </div>

      <!-- BENTO BODY (4-COLUMN GRID) -->
      <div class="briefing-body" id="briefingBody">

        <!-- ── KHỐI 1: GAUGE CHỈ SỐ THẦN KHÍ & CAN CHI NGÀY ── -->
        <div class="briefing-col briefing-col-gauge" id="briefingGaugeCol">
          <div class="col-header-row" style="width: 100%;">
            <span class="col-title"><i class="fa-solid fa-compass"></i> Thần Khí</span>
            <span class="meta-pill pill-primary" id="gaugeCanChiPill">--</span>
          </div>

          <!-- SVG Radial Gauge -->
          <div class="gauge-svg-wrap" id="gaugeSvgWrap" title="Bấm để xem phân tích Thần Khí & Can Chi chi tiết">
            <svg class="gauge-svg" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true">
              <!-- Background Track (3/4 vòng cung) -->
              <circle
                class="gauge-track"
                cx="50"
                cy="50"
                r="40"
                stroke-dasharray="251.3"
                stroke-dashoffset="62.8"
              />
              <!-- Animated Fill Circle -->
              <circle
                class="gauge-fill"
                id="gaugeFillCircle"
                cx="50"
                cy="50"
                r="40"
                stroke-dasharray="251.3"
                stroke-dashoffset="251.3"
              />
            </svg>
            <div class="gauge-center-content">
              <span class="gauge-score-val" id="gaugeScoreVal">--</span>
              <span class="gauge-rating-badge rating-great" id="gaugeRatingBadge">Đại Cát</span>
            </div>
          </div>

          <!-- Meta Pills: Trực, Nạp Âm & Âm Lịch -->
          <div class="gauge-meta-pills" id="gaugeMetaPills">
            <span class="meta-pill" id="gaugeLunarPill">Âm lịch: --/--</span>
            <span class="meta-pill" id="gaugeTrucPill">Trực: --</span>
            <span class="meta-pill" id="gaugeNapAmPill">Nạp âm: --</span>
          </div>
        </div>

        <!-- ── KHỐI 2: BIORHYTHM 4 TRỤC LÂM SÀNG & SPARKLINE ── -->
        <div class="briefing-col briefing-col-bio" id="briefingBioCol">
          <div class="col-header-row">
            <span class="col-title"><i class="fa-solid fa-dna"></i> Biorhythm Nội Khoa</span>
            <span style="font-size: 0.68rem; font-weight: 700; color: var(--color-primary);" id="bioAvgPill">TB: --%</span>
          </div>

          <!-- 4 Tracks List -->
          <div class="bio-tracks-list" id="bioTracksList">
            <!-- Dynamic render from renderBioTracks -->
          </div>

          <!-- Sparkline 7 Days & Clinical Pearl -->
          <div class="bio-sparkline-row">
            <svg class="sparkline-svg" id="bioSparklineSvg" viewBox="0 0 140 28" preserveAspectRatio="none" aria-label="Biểu đồ Biorhythm 7 ngày">
              <!-- Render path dynamially -->
            </svg>
          </div>

          <div class="bio-clinical-tip-row" id="bioTipRow" title="">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b; flex-shrink: 0;"></i>
            <span id="bioTipText">Đang tải khuyến nghị...</span>
          </div>
        </div>

        <!-- ── KHỐI 3: GIỜ VÀNG Y LỆNH 24H & 12 HOUR CHIP RAIL ── -->
        <div class="briefing-col briefing-col-hours" id="briefingHoursCol">
          <div class="col-header-row">
            <span class="col-title"><i class="fa-regular fa-clock"></i> Khung Giờ Y Lệnh</span>
            <span style="font-size: 0.66rem; font-weight: 700; color: var(--color-text-muted);">24h</span>
          </div>

          <!-- Current Hour Banner -->
          <div class="current-hour-banner" id="currentHourBanner">
            <div class="current-hour-info">
              <span class="current-hour-icon" id="currentHourIcon">⏰</span>
              <div>
                <div class="current-hour-name" id="currentHourName">--</div>
                <div class="current-hour-time" id="currentHourTime">--:--</div>
              </div>
            </div>
            <span class="current-hour-badge" id="currentHourBadge">Hạng --</span>
          </div>

          <!-- 12 Giờ Mini Chips Rail -->
          <div class="hour-chips-rail" id="hourChipsRail" role="list">
            <!-- Render 12 chips dynamically -->
          </div>

          <div class="hour-advice-line" id="hourAdviceLine" title="">
            <span id="hourAdviceText">Đang tính toán khung giờ...</span>
          </div>
        </div>

        <!-- ── KHỐI 4: NHIỆM VỤ Y KHOA NỘI KHOA & HÀNH ĐỘNG NHANH ── -->
        <div class="briefing-col briefing-col-tasks" id="briefingTasksCol">
          <div class="col-header-row">
            <span class="col-title"><i class="fa-solid fa-list-check"></i> Nhiệm Vụ Hôm Nay</span>
          </div>

          <!-- 3 Trọng Tâm Y Khoa -->
          <div class="medical-tasks-list" id="medicalTasksList">
            <!-- Render 3 tasks dynamically -->
          </div>

          <!-- Action Icons Row -->
          <div class="task-actions-row">
            <button type="button" class="btn-briefing-action" id="btnActionDetails" title="Xem chi tiết lịch tuần, tháng & tìm ngày tốt hội chẩn">
              <i class="fa-solid fa-calendar-day"></i>
              <span>Lịch</span>
            </button>
            <button type="button" class="btn-briefing-action" id="btnActionCopySummary" title="Sao chép tóm tắt trạng thái trực ca vào clipboard">
              <i class="fa-solid fa-copy"></i>
              <span>Chép</span>
            </button>
            <button type="button" class="btn-briefing-action" id="btnActionProfile" title="Xem & chỉnh sửa hồ sơ Bác sĩ (Can Chi, Bản Mệnh)">
              <i class="fa-solid fa-user-doctor"></i>
              <span>Hồ sơ</span>
            </button>
          </div>
        </div>

      </div><!-- /.briefing-body -->
    </section>
  `;
}

/**
 * Cập nhật hiển thị SVG Arc Gauge cho Khối 1
 */
function updateGaugeDisplay(score: number, rating: string): void {
  const circle = document.getElementById('gaugeFillCircle');
  const scoreVal = document.getElementById('gaugeScoreVal');
  const badge = document.getElementById('gaugeRatingBadge');
  if (!circle || !scoreVal || !badge) return;

  // Chu vi 2*PI*40 = 251.32. Arc 270 độ (3/4 vòng tròn) = 188.49
  const circumference = 251.32;
  const arcLength = circumference * 0.75; // 188.49
  const offset = circumference - (score / 100) * arcLength;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = `${offset}`;

  // Phối màu theo điểm số
  let strokeColor = '#10b981';
  let badgeClass = 'gauge-rating-badge rating-great';
  if (score >= 80) {
    strokeColor = '#10b981'; // Emerald
    badgeClass = 'gauge-rating-badge rating-great';
  } else if (score >= 65) {
    strokeColor = '#0284c7'; // Primary
    badgeClass = 'gauge-rating-badge rating-good';
  } else if (score >= 50) {
    strokeColor = '#f59e0b'; // Amber
    badgeClass = 'gauge-rating-badge rating-neutral';
  } else {
    strokeColor = '#ef4444'; // Red
    badgeClass = 'gauge-rating-badge rating-caution';
  }

  circle.style.stroke = strokeColor;
  scoreVal.textContent = String(score);
  badge.textContent = rating;
  badge.className = badgeClass;
}

/**
 * Cập nhật 4 thanh Biorhythm cho Khối 2
 */
function renderBioTracks(bio: BiorhythmResult): void {
  const container = document.getElementById('bioTracksList');
  if (!container) return;

  const tracks = [
    { icon: '🧠', name: 'Trí tuệ', val: bio.intellectual, color: '#0284c7', tip: 'Tư duy chẩn đoán & ra quyết định phác đồ' },
    { icon: '🎯', name: 'Trực giác', val: bio.intuitive, color: '#8b5cf6', tip: 'Nhận diện ca khó & suy sụp tiềm ẩn' },
    { icon: '❤️', name: 'Cảm xúc', val: bio.emotional, color: '#ec4899', tip: 'Giao tiếp, giải thích tiên lượng & thấu cảm' },
    { icon: '💪', name: 'Thể lực', val: bio.physical, color: '#f59e0b', tip: 'Sức bền ca trực, đi buồng & thủ thuật' }
  ];

  container.innerHTML = tracks.map((t, idx) => {
    // Giá trị -100..+100 chuyển thành % chiều dài từ tâm (50%)
    const isNeg = t.val < 0;
    const absVal = Math.min(100, Math.abs(t.val));
    const widthPct = (absVal / 100) * 50;
    const leftPct = isNeg ? (50 - widthPct) : 50;
    const trackColor = isNeg ? '#ef4444' : t.color;

    return `
      <div class="bio-track-item" title="${t.name}: ${t.val > 0 ? '+' : ''}${t.val}% — ${t.tip}">
        <span class="bio-icon">${t.icon}</span>
        <div class="bio-bar-wrap">
          <div class="bio-center-line"></div>
          <div 
            class="bio-bar-fill" 
            style="left: ${leftPct}%; width: ${widthPct}%; background: ${trackColor}; animation-delay: ${idx * 0.1}s;"
          ></div>
        </div>
        <span class="bio-val-text" style="color: ${trackColor};">
          ${t.val > 0 ? '+' : ''}${t.val}%
        </span>
      </div>
    `;
  }).join('');
}

/**
 * Vẽ Sparkline Biorhythm 7 Ngày cho Khối 2 (SVG)
 */
function renderBioSparkline(birthDate: Date, targetDate: Date, specialty: DoctorSpecialty): void {
  const svg = document.getElementById('bioSparklineSvg');
  if (!svg) return;

  const points: { x: number; y: number; avg: number }[] = [];
  const width = 140;
  const height = 28;

  for (let i = -6; i <= 0; i++) {
    const d = new Date(targetDate);
    d.setDate(d.getDate() + i);
    const bio = calculateBiorhythms(birthDate, d, specialty);
    const x = ((i + 6) / 6) * (width - 10) + 5;
    // Map avgScore (-100..100) sang y (height-4 .. 4)
    const y = height / 2 - (bio.avgScore / 100) * (height / 2 - 4);
    points.push({ x, y, avg: bio.avgScore });
  }

  const polylineStr = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const lastPoint = points[points.length - 1];

  svg.innerHTML = `
    <defs>
      <linearGradient id="sparklineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#0284c7" stop-opacity="1" />
      </linearGradient>
    </defs>
    <!-- Baseline giữa (0%) -->
    <line x1="5" y1="${height / 2}" x2="${width - 5}" y2="${height / 2}" stroke="var(--glass-border, rgba(255,255,255,0.15))" stroke-dasharray="2,2" stroke-width="1" />
    <!-- Sóng 7 ngày -->
    <polyline fill="none" stroke="url(#sparklineGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${polylineStr}" />
    <!-- Điểm mốc Ngày Đang Xem -->
    <circle cx="${lastPoint.x}" cy="${lastPoint.y}" r="3.5" fill="#0284c7" class="sparkline-pulse-dot" />
  `;
}

/**
 * Cập nhật Khung Giờ Y Lệnh & 12 Hour Chips Rail cho Khối 3
 */
function renderHourRail(gioRanks: GioRankResult[], currentHour: number): void {
  const rail = document.getElementById('hourChipsRail');
  const curIcon = document.getElementById('currentHourIcon');
  const curName = document.getElementById('currentHourName');
  const curTime = document.getElementById('currentHourTime');
  const curBadge = document.getElementById('currentHourBadge');
  const adviceEl = document.getElementById('hourAdviceText');
  if (!rail) return;

  const CHI_HOURS: Record<string, { start: number; end: number; range: string }> = {
    'Tý': { start: 23, end: 1, range: '23:00 - 01:00' },
    'Sửu': { start: 1, end: 3, range: '01:00 - 03:00' },
    'Dần': { start: 3, end: 5, range: '03:00 - 05:00' },
    'Mão': { start: 5, end: 7, range: '05:00 - 07:00' },
    'Thìn': { start: 7, end: 9, range: '07:00 - 09:00' },
    'Tỵ': { start: 9, end: 11, range: '09:00 - 11:00' },
    'Ngọ': { start: 11, end: 13, range: '11:00 - 13:00' },
    'Mùi': { start: 13, end: 15, range: '13:00 - 15:00' },
    'Thân': { start: 15, end: 17, range: '15:00 - 17:00' },
    'Dậu': { start: 17, end: 19, range: '17:00 - 19:00' },
    'Tuất': { start: 19, end: 21, range: '19:00 - 21:00' },
    'Hợi': { start: 21, end: 23, range: '21:00 - 23:00' }
  };

  let activeGio = gioRanks[0];

  rail.innerHTML = gioRanks.map(g => {
    const hMeta = CHI_HOURS[g.chi] || { start: 0, end: 2, range: '' };
    let isCurrent = false;
    if (g.chi === 'Tý') {
      isCurrent = currentHour >= 23 || currentHour < 1;
    } else {
      isCurrent = currentHour >= hMeta.start && currentHour < hMeta.end;
    }

    if (isCurrent) activeGio = g;

    let rankClass = 'rank-good';
    let starSymbol = '★';
    if (g.rank <= 2) {
      rankClass = 'rank-great';
      starSymbol = '★';
    } else if (g.rank <= 4) {
      rankClass = 'rank-good';
      starSymbol = '✦';
    } else if (g.rank <= 6) {
      rankClass = 'rank-neutral';
      starSymbol = '·';
    } else {
      rankClass = 'rank-caution';
      starSymbol = '⚠️';
    }

    return `
      <div 
        class="hour-chip ${rankClass} ${isCurrent ? 'is-current' : ''}" 
        data-chi="${g.chi}" 
        title="${g.fullCanChi} (${hMeta.range}) • ${g.rankTitle} • ${g.clinicalNote}"
        tabindex="0"
        role="button"
      >
        <span class="hour-chip-chi">${g.chi}</span>
        <span class="hour-chip-star">${starSymbol}</span>
      </div>
    `;
  }).join('');

  // Cập nhật thẻ giờ hiện tại
  if (curIcon && curName && curTime && curBadge && adviceEl && activeGio) {
    const activeMeta = CHI_HOURS[activeGio.chi] || { range: '' };
    curIcon.textContent = activeGio.isHoangDao ? '🌟' : '⏰';
    curName.textContent = `Giờ ${activeGio.fullCanChi}`;
    curTime.textContent = activeMeta.range;
    curBadge.textContent = activeGio.rankTitle.split(' ')[0];
    curBadge.className = `current-hour-badge ${activeGio.rank <= 2 ? 'rating-great' : activeGio.rank <= 4 ? 'rating-good' : 'rating-neutral'}`;
    adviceEl.textContent = activeGio.clinicalNote;
    adviceEl.parentElement?.setAttribute('title', activeGio.clinicalNote);
  }

  // Gắn sự kiện click vào từng chip giờ để xem note nhanh
  rail.querySelectorAll<HTMLElement>('.hour-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const chi = chip.getAttribute('data-chi');
      const g = gioRanks.find(item => item.chi === chi);
      if (g && adviceEl) {
        adviceEl.textContent = `[${g.fullCanChi} • ${g.rankTitle}]: ${g.clinicalNote}`;
        adviceEl.parentElement?.setAttribute('title', g.clinicalNote);
      }
    });
  });
}

/**
 * Cập nhật 3 Nhiệm Vụ Y Khoa Trọng Tâm cho Khối 4
 */
function renderMedicalTasks(evalData: DayScoreEvaluation): void {
  const container = document.getElementById('medicalTasksList');
  if (!container) return;

  const tasks = [
    { key: 'kham_chandoan' as MedicalTaskType, icon: '🔍', title: 'Khám ca khó' },
    { key: 'khoi_phacdo' as MedicalTaskType, icon: '💊', title: 'Khởi phác đồ' },
    { key: 'chinh_lieu_xuatvien' as MedicalTaskType, icon: '📋', title: 'Rà soát toa viện' }
  ];

  container.innerHTML = tasks.map(t => {
    const taskEval = evalData.medicalTasks[t.key];
    let stars = '⭐⭐⭐';
    let starColor = '#10b981';

    if (taskEval.recommendation === 'rat_tot') {
      stars = '⭐⭐⭐';
      starColor = '#10b981';
    } else if (taskEval.recommendation === 'tot') {
      stars = '⭐⭐';
      starColor = '#0284c7';
    } else if (taskEval.recommendation === 'binh_thuong') {
      stars = '⭐';
      starColor = '#f59e0b';
    } else {
      stars = '⚠️';
      starColor = '#ef4444';
    }

    return `
      <div class="medical-task-row" title="${t.title} (${taskEval.totalScore}đ): ${taskEval.advice}">
        <div class="task-left">
          <span class="task-icon">${t.icon}</span>
          <span class="task-name">${t.title}</span>
        </div>
        <span class="task-stars" style="color: ${starColor};">${stars}</span>
      </div>
    `;
  }).join('');
}

/**
 * Cập nhật Compact Ribbon khi thu gọn banner
 */
function updateCompactRibbon(evalData: DayScoreEvaluation, now: Date): void {
  const rScore = document.getElementById('ribbonScoreVal');
  const rRating = document.getElementById('ribbonRatingText');
  const rBio = document.getElementById('ribbonBioPill');
  const rHour = document.getElementById('ribbonHourPill');
  const rTask = document.getElementById('ribbonTaskPill');

  if (rScore) rScore.textContent = `${evalData.total}/100`;
  if (rRating) {
    rRating.textContent = evalData.rating;
    rRating.className = `gauge-rating-badge ${evalData.total >= 80 ? 'rating-great' : evalData.total >= 65 ? 'rating-good' : 'rating-neutral'}`;
  }
  if (rBio) {
    rBio.innerHTML = `<span>🧠 Trí tuệ ${evalData.bio.intellectual > 0 ? '+' : ''}${evalData.bio.intellectual}%</span>`;
  }
  if (rHour) {
    const curHour = evalData.gioTimeline.find(g => g.isCurrent) || evalData.gioTimeline[0];
    rHour.innerHTML = `<span>⏰ Giờ ${curHour.chi} (${curHour.isHoangDao ? 'Hoàng đạo' : 'Hắc đạo'})</span>`;
  }
  if (rTask) {
    const taskKhó = evalData.medicalTasks.kham_chandoan;
    rTask.innerHTML = `<span>🔍 Khám ca khó: ${taskKhó.recommendation === 'rat_tot' ? '⭐⭐⭐' : taskKhó.recommendation === 'tot' ? '⭐⭐' : '⭐'}</span>`;
  }
}

/**
 * Tính toán và cập nhật toàn bộ Banner theo ngày chỉ định
 */
export function updateBriefingBanner(targetDate: Date = currentSelectedDate): void {
  currentSelectedDate = targetDate;
  const doc = getDoctorProfile();
  const evalData = evaluateDayScore(targetDate, doc);
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const now = new Date();

  // 1. Cập nhật Khối 1: Gauge & Pills
  updateGaugeDisplay(evalData.total, evalData.rating);

  const canChiPill = document.getElementById('gaugeCanChiPill');
  const lunarPill = document.getElementById('gaugeLunarPill');
  const trucPill = document.getElementById('gaugeTrucPill');
  const napAmPill = document.getElementById('gaugeNapAmPill');

  if (canChiPill) canChiPill.textContent = evalData.canChiDay;
  if (lunarPill) lunarPill.textContent = `Âm: ${evalData.lunarDay}/${evalData.lunarMonth}`;
  if (trucPill) trucPill.textContent = `Trực ${evalData.trucNgay.name} (${evalData.trucNgay.rating})`;
  if (napAmPill) napAmPill.textContent = evalData.napAmDay.name;

  // 2. Cập nhật Khối 2: Biorhythm 4 Trục & Sparkline
  const bioAvgPill = document.getElementById('bioAvgPill');
  if (bioAvgPill) {
    bioAvgPill.textContent = `TB: ${evalData.bio.avgScore > 0 ? '+' : ''}${evalData.bio.avgScore}%`;
  }
  renderBioTracks(evalData.bio);
  renderBioSparkline(birthDate, targetDate, doc.specialty || 'internal_general');

  const tipText = document.getElementById('bioTipText');
  if (tipText && evalData.bio.clinicalTips.length > 0) {
    tipText.textContent = evalData.bio.clinicalTips[0];
    tipText.parentElement?.setAttribute('title', evalData.bio.clinicalTips.join('\n'));
  }

  // 3. Cập nhật Khối 3: Giờ Hoàng Đạo 24h
  renderHourRail(evalData.gioRanks, now.getHours());

  // 4. Cập nhật Khối 4: Nhiệm Vụ & Compact Ribbon
  renderMedicalTasks(evalData);
  updateCompactRibbon(evalData, now);

  // 5. Cập nhật Specialty Header
  const spec = SPECIALTY_METAS[doc.specialty || 'internal_general'] || SPECIALTY_METAS.internal_general;
  const specIcon = document.getElementById('briefingSpecIcon');
  const specName = document.getElementById('briefingSpecName');
  if (specIcon) specIcon.textContent = spec.icon;
  if (specName) specName.textContent = spec.shortName;
}

/**
 * Gắn kết các sự kiện tương tác của Banner
 */
export function initClinicianBriefingBanner(): void {
  const banner = document.getElementById('clinicianBriefingBanner');
  if (!banner) return;

  // 1. Khởi tạo trạng thái thu gọn từ localStorage
  const isCollapsed = localStorage.getItem(COLLAPSE_KEY) === 'true';
  if (isCollapsed) {
    banner.classList.add('briefing-banner-collapsed');
    const icon = document.getElementById('briefingCollapseIcon');
    if (icon) icon.className = 'fa-solid fa-chevron-down';
  }

  // 2. Toggle Collapse Button
  const collapseBtn = document.getElementById('briefingCollapseBtn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const collapsed = banner.classList.toggle('briefing-banner-collapsed');
      const icon = document.getElementById('briefingCollapseIcon');
      if (icon) {
        icon.className = collapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
      }
      localStorage.setItem(COLLAPSE_KEY, String(collapsed));
    });
  }

  // 3. Date Input Change
  const dateInput = document.getElementById('briefingDateInput') as HTMLInputElement;
  if (dateInput) {
    dateInput.addEventListener('change', () => {
      if (dateInput.value) {
        const parts = dateInput.value.split('-');
        const selected = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        updateBriefingBanner(selected);
      }
    });
  }

  // 4. Specialty Dropdown Switcher
  const specBtn = document.getElementById('briefingSpecBtn');
  const specMenu = document.getElementById('briefingSpecMenu');
  if (specBtn && specMenu) {
    specBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      specMenu.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!specMenu.contains(e.target as Node) && e.target !== specBtn) {
        specMenu.classList.remove('is-open');
      }
    });

    specMenu.querySelectorAll<HTMLButtonElement>('.spec-menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const specId = item.getAttribute('data-spec') as DoctorSpecialty;
        if (specId) {
          saveDoctorProfile({ specialty: specId });
          specMenu.querySelectorAll('.spec-menu-item').forEach(i => i.classList.remove('is-selected'));
          item.classList.add('is-selected');
          specMenu.classList.remove('is-open');
          updateBriefingBanner(currentSelectedDate);
        }
      });
    });
  }

  // 5. Nút Mở Modal Chi Tiết Toàn Diện
  const openModalBtn = document.getElementById('briefingOpenModalBtn');
  const gaugeWrap = document.getElementById('gaugeSvgWrap');
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => openDayScoreModal(currentSelectedDate, 'day'));
  }
  if (gaugeWrap) {
    gaugeWrap.addEventListener('click', () => openDayScoreModal(currentSelectedDate, 'day'));
  }

  // 6. Action Buttons Khối 4
  const btnActionDetails = document.getElementById('btnActionDetails');
  if (btnActionDetails) {
    btnActionDetails.addEventListener('click', () => openDayScoreModal(currentSelectedDate, 'week'));
  }

  const btnActionProfile = document.getElementById('btnActionProfile');
  if (btnActionProfile) {
    btnActionProfile.addEventListener('click', () => openDayScoreModal(currentSelectedDate, 'profile'));
  }

  const btnActionCopy = document.getElementById('btnActionCopySummary');
  if (btnActionCopy) {
    btnActionCopy.addEventListener('click', () => {
      const evalData = evaluateDayScore(currentSelectedDate);
      const text = `🩺 [SẴN SÀNG TRỰC CA • ${evalData.formattedDate}]\n• Điểm ngày: ${evalData.total}/100 (${evalData.rating})\n• Biorhythm: Trí tuệ ${evalData.bio.intellectual > 0 ? '+' : ''}${evalData.bio.intellectual}%, Trực giác ${evalData.bio.intuitive > 0 ? '+' : ''}${evalData.bio.intuitive}%\n• Can Chi: ${evalData.canChiDay} (Âm: ${evalData.lunarDay}/${evalData.lunarMonth})\n• Lời khuyên: ${evalData.bio.clinicalTips[0] || 'Xử trí y lệnh thường quy an toàn.'}`;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btnActionCopy.innerHTML;
        btnActionCopy.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i> <span>Đã chép</span>';
        setTimeout(() => {
          btnActionCopy.innerHTML = originalText;
        }, 1800);
      });
    });
  }

  // 7. Chạy cập nhật dữ liệu ban đầu
  updateBriefingBanner(new Date());

  // 8. Tự động kiểm tra và chuyển giờ sau mỗi 2 phút nếu bước sang canh giờ mới
  setInterval(() => {
    const now = new Date();
    // Chỉ cập nhật nếu đang xem ngày hôm nay
    if (currentSelectedDate.toDateString() === now.toDateString()) {
      const evalData = evaluateDayScore(currentSelectedDate);
      renderHourRail(evalData.gioRanks, now.getHours());
      updateCompactRibbon(evalData, now);
    }
  }, 120000);
}

