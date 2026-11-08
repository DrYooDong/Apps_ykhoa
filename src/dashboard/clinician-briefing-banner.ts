/**
 * CliniPortal 2.0 — Master Clinician Chronobiology & Auspicious Day Workstation Engine
 * Path: src/dashboard/clinician-briefing-banner.ts
 * 
 * Trạm Chỉ Huy Nhịp Sinh Học & Thời Khắc Y Lệnh Lâm Sàng (Thay thế hoàn toàn 2 cột cũ)
 * 100% Tokenized, Pure SVG Living Charts, Biorhythm Wave Dynamics & Precision Engine
 */

import type {
  DoctorSpecialty,
  DoctorProfile,
  DayScoreEvaluation,
  MedicalTaskType,
  BiorhythmResult,
  GioRankResult,
  WeekDaySummary
} from '../tools/good-day-types';

import {
  evaluateDayScore,
  calculateBiorhythms,
  getWeekEvaluation,
  calculateShiftEnergy,
  getDoctorProfile,
  saveDoctorProfile,
  SPECIALTY_METAS
} from '../tools/good-day-engine';

import { openDayScoreModal } from '../tools/good-day-modal';

let activeDate = new Date();

/**
 * Khởi tạo toàn bộ Master Chronobiology Workstation
 */
export function initClinicianBriefingBanner(): void {
  const workstation = document.getElementById('chronoWorkstation');
  if (!workstation) return;

  // 1. Gắn sự kiện Date Navigation (Hôm qua / Hôm nay / Ngày mai / Input)
  const prevBtn = document.getElementById('btnChronoPrevDay');
  const nextBtn = document.getElementById('btnChronoNextDay');
  const todayBtn = document.getElementById('btnChronoToday');
  const dateInput = document.getElementById('chronoDateInput') as HTMLInputElement;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const d = new Date(activeDate);
      d.setDate(d.getDate() - 1);
      updateMasterWorkstation(d);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const d = new Date(activeDate);
      d.setDate(d.getDate() + 1);
      updateMasterWorkstation(d);
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      updateMasterWorkstation(new Date());
    });
  }

  if (dateInput) {
    dateInput.addEventListener('change', () => {
      if (dateInput.value) {
        const parts = dateInput.value.split('-');
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        updateMasterWorkstation(d);
      }
    });
  }

  // 2. Gắn sự kiện Chuyển đổi Chuyên khoa (Specialty Switcher)
  const specBtn = document.getElementById('chronoSpecBtn');
  const specMenu = document.getElementById('chronoSpecMenu');
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

    specMenu.querySelectorAll<HTMLButtonElement>('.chrono-spec-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const specId = btn.getAttribute('data-spec') as DoctorSpecialty;
        if (specId) {
          saveDoctorProfile({ specialty: specId });
          specMenu.querySelectorAll('.chrono-spec-item').forEach(b => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          specMenu.classList.remove('is-open');
          updateMasterWorkstation(activeDate);
        }
      });
    });
  }

  // 3. Gắn sự kiện các nút Hành động (Action Toolbar)
  const doctorBtn = document.getElementById('chronoDoctorBtn');
  if (doctorBtn) {
    doctorBtn.addEventListener('click', () => openDayScoreModal(activeDate, 'profile'));
  }

  const finderBtn = document.getElementById('btnChronoFinder');
  if (finderBtn) {
    finderBtn.addEventListener('click', () => openDayScoreModal(activeDate, 'finder'));
  }

  const reportBtn = document.getElementById('btnChronoFullReport');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => openDayScoreModal(activeDate, 'day'));
  }

  const copyBtn = document.getElementById('btnChronoCopySBAR');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => copySbarBriefing(activeDate, copyBtn));
  }

  // 4. Click Gauge mở Modal chi tiết
  const gaugeSvgWrap = document.getElementById('gaugeSvgWrapper');
  if (gaugeSvgWrap) {
    gaugeSvgWrap.addEventListener('click', () => openDayScoreModal(activeDate, 'day'));
  }

  // 5. Cập nhật dữ liệu lần đầu
  updateMasterWorkstation(new Date());

  // 6. Tự động kiểm tra canh giờ mới mỗi 2 phút
  setInterval(() => {
    const now = new Date();
    if (activeDate.toDateString() === now.toDateString()) {
      const doc = getDoctorProfile();
      const evalData = evaluateDayScore(activeDate, doc);
      renderChrono12Hours(evalData.gioRanks, now.getHours());
      updateEnergyWidget(now);
    }
  }, 120000);
}

/**
 * Cập nhật toàn bộ các Widget trên Master Workstation
 */
export function updateMasterWorkstation(targetDate: Date = new Date()): void {
  activeDate = targetDate;
  const doc = getDoctorProfile();
  const evalData = evaluateDayScore(targetDate, doc);
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const now = new Date();

  // A. Đồng bộ Date Input & Toolbar
  const dateInput = document.getElementById('chronoDateInput') as HTMLInputElement;
  if (dateInput) {
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Cập nhật Profile Pill
  const docName = document.getElementById('chronoDoctorName');
  if (docName) {
    docName.textContent = `BS. ${doc.name} (${doc.canNam} ${doc.chiNam} • Mệnh ${doc.hanhMenh})`;
  }

  // Cập nhật Specialty Header Button
  const spec = SPECIALTY_METAS[doc.specialty || 'internal_general'] || SPECIALTY_METAS.internal_general;
  const specIcon = document.getElementById('chronoSpecIcon');
  const specName = document.getElementById('chronoSpecName');
  if (specIcon) specIcon.textContent = spec.icon;
  if (specName) specName.textContent = spec.shortName;

  // B. Khối Hero 1: Gauge Thần Khí & Can Chi
  updateGauge(evalData.total, evalData.rating);
  updateGaugeMetaDetails(evalData);
  updateEnergyWidget(targetDate);

  // C. Khối Hero 2: Biorhythm 4 Trục & Đồ Thị Sóng 7 Ngày
  renderBiorhythmTracks(evalData.bio);
  renderBiorhythmMultiWave(birthDate, targetDate, doc.specialty || 'internal_general');
  const bioTip = document.getElementById('bioClinicalTipText');
  if (bioTip && evalData.bio.clinicalTips.length > 0) {
    bioTip.textContent = evalData.bio.clinicalTips[0];
  }

  // D. Khối Row 2 (Trái): 24H Chrono-Timeline 12 Canh Giờ
  renderChrono12Hours(evalData.gioRanks, now.getHours());

  // E. Khối Row 2 (Phải): Ma Trận 5 Tác Vụ Nội Khoa
  renderMedicalTasksMatrix(evalData);

  // F. Khối Row 3 (Trái): Lịch Dự Báo 7 Ngày Ca Trực
  renderWeekForecastRail(targetDate, doc);

  // G. Khối Row 3 (Phải): 4 Trụ Cột Hành Động Lâm Sàng
  renderClinicalActionPillars(evalData);
}

/**
 * 1. Cập nhật Radial Arc Gauge
 */
function updateGauge(score: number, rating: string): void {
  const ring = document.getElementById('gaugeFillRing');
  const num = document.getElementById('gaugeBigNum');
  const ratingPill = document.getElementById('gaugeRatingPill');
  if (!ring || !num || !ratingPill) return;

  const circumference = 251.32; // 2 * PI * 40
  const arcLength = circumference * 0.75; // 270 độ = 188.49
  const offset = circumference - (score / 100) * arcLength;

  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${offset}`;

  let color = '#10b981';
  let badgeStyle = 'background: rgba(16, 185, 129, 0.15); color: #10b981;';
  if (score >= 80) {
    color = '#10b981';
    badgeStyle = 'background: rgba(16, 185, 129, 0.15); color: #10b981;';
  } else if (score >= 65) {
    color = '#0284c7';
    badgeStyle = 'background: rgba(2, 132, 199, 0.15); color: #0284c7;';
  } else if (score >= 50) {
    color = '#f59e0b';
    badgeStyle = 'background: rgba(245, 158, 11, 0.15); color: #f59e0b;';
  } else {
    color = '#ef4444';
    badgeStyle = 'background: rgba(239, 68, 68, 0.15); color: #ef4444;';
  }

  ring.style.stroke = color;
  num.textContent = String(score);
  ratingPill.textContent = rating;
  ratingPill.setAttribute('style', badgeStyle);
}

/**
 * Cập nhật thông tin chi tiết Can Chi, Nạp âm, Trực, Thần sát
 */
function updateGaugeMetaDetails(evalData: DayScoreEvaluation): void {
  const canChiEl = document.getElementById('analysisCanChiText');
  const napAmEl = document.getElementById('analysisNapAmText');
  const trucSaoEl = document.getElementById('analysisTrucSaoText');
  const tagsWrap = document.getElementById('analysisTagsWrap');

  if (canChiEl) {
    canChiEl.textContent = `Ngày ${evalData.canChiDay} (${evalData.lunarDay}/${evalData.lunarMonth} Âm) • ${evalData.b1.text}`;
  }
  if (napAmEl) {
    napAmEl.textContent = `Nạp âm: ${evalData.napAmDay.name} (${evalData.napAmRelation.text})`;
  }
  if (trucSaoEl) {
    const dangVien = evalData.saoTuDangVien.isDangVien ? ' (Đăng Viên)' : '';
    trucSaoEl.textContent = `Trực ${evalData.trucNgay.name} (${evalData.trucNgay.desc}) • Sao ${evalData.saoTu.name}${dangVien}`;
  }

  if (tagsWrap) {
    const tags: string[] = [];
    if (evalData.quyNhanLoc.thienAt.isMatch) tags.push('Thiên Ất Quý Nhân');
    if (evalData.quyNhanLoc.locThan.isMatch) tags.push('Lộc Thần Cát Lợi');
    if (evalData.diaChiRelations.tamHop.isMatch) tags.push('Địa Chi Tam Hợp');
    if (evalData.diaChiRelations.lucHop.isMatch) tags.push('Địa Chi Lục Hợp');
    if (evalData.tietKhiInfo.tietKhi.name) tags.push(`Tiết ${evalData.tietKhiInfo.tietKhi.name}`);

    tagsWrap.innerHTML = tags.map(t => `<span class="chrono-tag tag-primary">${t}</span>`).join('') ||
      `<span class="chrono-tag">Khí tiết bình hòa</span>`;
  }
}

/**
 * Cập nhật Widget Năng Lượng Circadian
 */
function updateEnergyWidget(date: Date): void {
  const energy = calculateShiftEnergy(date);
  const batteryVal = document.getElementById('chronoEnergyVal');
  const batteryText = document.getElementById('chronoEnergyText');
  if (batteryVal) batteryVal.textContent = `${energy.energyPercent}%`;
  if (batteryText) batteryText.textContent = `${energy.circadianPhase} • ${energy.caffeineTip}`;
}

/**
 * 2. Cập nhật 4 thanh Biorhythm Tracks
 */
function renderBiorhythmTracks(bio: BiorhythmResult): void {
  const tracksWrap = document.getElementById('bioBarsColumn');
  if (!tracksWrap) return;

  const tracks = [
    { icon: '🧠', label: 'Trí Tuệ', val: bio.intellectual, color: '#0284c7', tip: 'Tư duy phân tích, chẩn đoán nhiều tầng & y lệnh' },
    { icon: '🎯', label: 'Trực Giác', val: bio.intuitive, color: '#8b5cf6', tip: 'Nhận diện ca khó & suy sụp tiềm ẩn' },
    { icon: '❤️', label: 'Cảm Xúc', val: bio.emotional, color: '#ec4899', tip: 'Thấu cảm bệnh nhân mạn & giải thích tiên lượng' },
    { icon: '💪', label: 'Thể Lực', val: bio.physical, color: '#f59e0b', tip: 'Sức bền ca trực, đi buồng & hồi sức cấp cứu' }
  ];

  tracksWrap.innerHTML = tracks.map((t, idx) => {
    const isNeg = t.val < 0;
    const absVal = Math.min(100, Math.abs(t.val));
    const widthPct = (absVal / 100) * 50;
    const leftPct = isNeg ? (50 - widthPct) : 50;
    const trackColor = isNeg ? '#ef4444' : t.color;

    return `
      <div class="bio-metric-row" title="${t.label}: ${t.val > 0 ? '+' : ''}${t.val}% — ${t.tip}">
        <span class="bio-metric-icon">${t.icon}</span>
        <span class="bio-metric-label">${t.label}</span>
        <div class="bio-progress-track">
          <div class="bio-axis-center"></div>
          <div 
            class="bio-progress-bar"
            style="left: ${leftPct}%; width: ${widthPct}%; background: ${trackColor}; animation-delay: ${idx * 0.1}s;"
          ></div>
        </div>
        <span class="bio-metric-val" style="color: ${trackColor};">
          ${t.val > 0 ? '+' : ''}${t.val}%
        </span>
      </div>
    `;
  }).join('');
}

/**
 * 3. Vẽ Sơ Đồ Đa Sóng Biorhythm 7 Ngày (Multi-Wave SVG)
 */
function renderBiorhythmMultiWave(birthDate: Date, targetDate: Date, specialty: DoctorSpecialty): void {
  const svg = document.getElementById('bioMultiWaveSvg');
  if (!svg) return;

  const width = 260;
  const height = 55;
  const numDays = 7;

  // Thu thập điểm cho 4 trục
  const intPoints: { x: number; y: number }[] = [];
  const intuitPoints: { x: number; y: number }[] = [];
  const avgPoints: { x: number; y: number }[] = [];

  for (let i = -3; i <= 3; i++) {
    const d = new Date(targetDate);
    d.setDate(d.getDate() + i);
    const bio = calculateBiorhythms(birthDate, d, specialty);
    const x = ((i + 3) / (numDays - 1)) * (width - 20) + 10;
    
    // Map -100..100 sang y
    const yInt = height / 2 - (bio.intellectual / 100) * (height / 2 - 6);
    const yIntuit = height / 2 - (bio.intuitive / 100) * (height / 2 - 6);
    const yAvg = height / 2 - (bio.avgScore / 100) * (height / 2 - 6);

    intPoints.push({ x, y: yInt });
    intuitPoints.push({ x, y: yIntuit });
    avgPoints.push({ x, y: yAvg });
  }

  const makePath = (pts: { x: number; y: number }[]) => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const todayPoint = avgPoints[3]; // i = 0 là vị trí thứ 4

  svg.innerHTML = `
    <!-- Baseline giữa (0%) -->
    <line x1="10" y1="${height / 2}" x2="${width - 10}" y2="${height / 2}" stroke="var(--glass-border, rgba(255,255,255,0.15))" stroke-dasharray="3,3" stroke-width="1" />
    
    <!-- Sóng Trí Tuệ (Xanh dương) -->
    <polyline fill="none" stroke="#0284c7" stroke-width="1.8" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round" points="${makePath(intPoints)}" />
    
    <!-- Sóng Trực Giác (Tím) -->
    <polyline fill="none" stroke="#8b5cf6" stroke-width="1.8" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round" points="${makePath(intuitPoints)}" />
    
    <!-- Sóng Điểm Trung Bình Trọng Số (Vàng cam nổi bật) -->
    <polyline fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${makePath(avgPoints)}" />
    
    <!-- Điểm mốc Ngày Đang Xem (Pulsing Marker) -->
    <circle cx="${todayPoint.x}" cy="${todayPoint.y}" r="4" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
  `;
}

/**
 * 4. Cập nhật Lưới 12 Canh Giờ Khởi Sự (24H Chrono-Timeline)
 */
function renderChrono12Hours(gioRanks: GioRankResult[], currentHour: number): void {
  const grid = document.getElementById('chrono12HoursGrid');
  const curIcon = document.getElementById('tacticalCurHourIcon');
  const curName = document.getElementById('tacticalCurHourName');
  const curRange = document.getElementById('tacticalCurHourRange');
  const curBadge = document.getElementById('tacticalCurHourBadge');
  const terminalText = document.getElementById('hourAdviceTerminalText');
  if (!grid) return;

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

  let activeHour = gioRanks[0];

  grid.innerHTML = gioRanks.map(g => {
    const meta = CHI_HOURS[g.chi] || { start: 0, end: 2, range: '' };
    let isCurrent = false;
    if (g.chi === 'Tý') {
      isCurrent = currentHour >= 23 || currentHour < 1;
    } else {
      isCurrent = currentHour >= meta.start && currentHour < meta.end;
    }

    if (isCurrent) activeHour = g;

    let starSymbol = '★';
    let starColor = '#f59e0b';
    if (g.rank <= 2) {
      starSymbol = '★';
      starColor = '#f59e0b';
    } else if (g.rank <= 4) {
      starSymbol = '✦';
      starColor = '#10b981';
    } else if (g.rank <= 6) {
      starSymbol = '·';
      starColor = '#64748b';
    } else {
      starSymbol = '⚠️';
      starColor = '#ef4444';
    }

    return `
      <div 
        class="hour-tactical-chip ${isCurrent ? 'is-active-hour' : ''}" 
        data-chi="${g.chi}"
        title="Giờ ${g.fullCanChi} (${meta.range}) • ${g.rankTitle} • ${g.clinicalNote}"
        tabindex="0"
        role="button"
      >
        <span class="hour-tactical-chi">${g.chi}</span>
        <span class="hour-tactical-time">${meta.range.split(' - ')[0]}</span>
        <span class="hour-tactical-star" style="color: ${starColor};">${starSymbol}</span>
      </div>
    `;
  }).join('');

  // Cập nhật Banner giờ hiện tại
  if (curIcon && curName && curRange && curBadge && terminalText && activeHour) {
    const activeMeta = CHI_HOURS[activeHour.chi] || { range: '' };
    curIcon.textContent = activeHour.isHoangDao ? '🌟' : '⏰';
    curName.textContent = `Giờ ${activeHour.fullCanChi}`;
    curRange.textContent = `Khung giờ: ${activeMeta.range} • ${activeHour.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}`;
    curBadge.textContent = activeHour.rankTitle;
    curBadge.className = `cur-hour-badge ${activeHour.rank <= 2 ? 'tag-amber' : activeHour.rank <= 4 ? 'tag-emerald' : 'tag-primary'}`;
    terminalText.textContent = activeHour.clinicalNote;
  }

  // Click vào từng chip để tra cứu lời khuyên
  grid.querySelectorAll<HTMLElement>('.hour-tactical-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const chi = chip.getAttribute('data-chi');
      const g = gioRanks.find(item => item.chi === chi);
      if (g && terminalText) {
        terminalText.textContent = `[Giờ ${g.fullCanChi} • ${g.rankTitle}]: ${g.clinicalNote}`;
      }
    });
  });
}

/**
 * 5. Cập nhật Ma Trận 5 Tác Vụ Nội Khoa Trọng Điểm
 */
function renderMedicalTasksMatrix(evalData: DayScoreEvaluation): void {
  const container = document.getElementById('medicalTasksMatrix');
  if (!container) return;

  const tasks = [
    { key: 'kham_chandoan' as MedicalTaskType, icon: '🔍', title: 'Khám & Biện Luận Ca Khó', desc: 'Tư duy chẩn đoán nhiều tầng, liên kết đa triệu chứng' },
    { key: 'khoi_phacdo' as MedicalTaskType, icon: '💊', title: 'Khởi Đầu Phác Đồ Bậc Cao', desc: 'Lựa chọn thuốc bước đầu, liều nạp kháng sinh/chống đông' },
    { key: 'chinh_lieu_xuatvien' as MedicalTaskType, icon: '📋', title: 'Hiệu Chỉnh Liều & Ra Viện', desc: 'Rà soát tương tác thuốc DDI, chức năng gan thận eGFR' },
    { key: 'hoi_chan_ebm' as MedicalTaskType, icon: '👥', title: 'Hội Chẩn Đa Chuyên Khoa', desc: 'Tra cứu chứng cứ lâm sàng EBM & sinh hoạt chuyên đề' },
    { key: 'khai_truong_kthuat' as MedicalTaskType, icon: '🏥', title: 'Kỹ Thuật / Thăm Dò Mới', desc: 'Triển khai kỹ thuật thăm dò chức năng hoặc khai trương' }
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
      <div 
        class="medical-task-card" 
        title="${t.title} (${taskEval.totalScore}/10đ): ${taskEval.advice}"
        onclick="if(window.openDayScoreModal) window.openDayScoreModal(undefined, 'tasks');"
      >
        <div class="task-card-left">
          <div class="task-card-icon">${t.icon}</div>
          <div>
            <div class="task-card-title">${t.title}</div>
            <div class="task-card-desc">${t.desc}</div>
          </div>
        </div>
        <div class="task-card-right">
          <span class="task-card-stars" style="color: ${starColor};">${stars}</span>
          <span class="task-card-score">${taskEval.totalScore}đ</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 6. Cập nhật Lịch Dự Báo Ca Trực 7 Ngày Liên Tiếp
 */
function renderWeekForecastRail(targetDate: Date, doc: DoctorProfile): void {
  const rail = document.getElementById('weekForecastRail');
  if (!rail) return;

  const weekList: WeekDaySummary[] = getWeekEvaluation(targetDate, doc);

  rail.innerHTML = weekList.map(day => {
    const isSelected = day.date.toDateString() === targetDate.toDateString();
    const isToday = day.date.toDateString() === new Date().toDateString();

    return `
      <div 
        class="forecast-day-card ${isSelected ? 'is-selected-day' : ''} ${isToday ? 'is-today-marker' : ''} ${day.isBestDay ? 'is-best-day' : ''}"
        data-date="${day.date.toISOString()}"
        title="${day.dayOfWeek} (${day.dateFormatted}): ${day.score}/100đ • ${day.rating} • ${day.canChi}"
        tabindex="0"
        role="button"
      >
        <span class="forecast-day-name">${day.dayOfWeek}</span>
        <span class="forecast-day-canchi">${day.canChi.split(' ')[1]}</span>
        <span class="forecast-day-icon">${day.icon}</span>
        <span class="forecast-day-score">${day.score}</span>
        <span class="forecast-day-truc">${day.truc}</span>
      </div>
    `;
  }).join('');

  // Click vào ngày nào thì cập nhật toàn bộ Dashboard sang ngày đó!
  rail.querySelectorAll<HTMLElement>('.forecast-day-card').forEach(card => {
    card.addEventListener('click', () => {
      const dateStr = card.getAttribute('data-date');
      if (dateStr) {
        updateMasterWorkstation(new Date(dateStr));
      }
    });
  });
}

/**
 * 7. Cập nhật 4 Trụ Cột Hành Động Lâm Sàng
 */
function renderClinicalActionPillars(evalData: DayScoreEvaluation): void {
  const container = document.getElementById('clinicalPillarsGrid');
  if (!container) return;

  const pillars = [
    { key: 'diagnosis', icon: '🩺', title: 'Chẩn Đoán Ca Khó', data: evalData.advice.diagnosis },
    { key: 'pharmacotherapy', icon: '💊', title: 'Dược Trị Liệu & Y Lệnh', data: evalData.advice.pharmacotherapy },
    { key: 'communication', icon: '🗣️', title: 'Giao Tiếp & Tiên Lượng', data: evalData.advice.communication },
    { key: 'evidence', icon: '📚', title: 'Y Học Chứng Cứ EBM', data: evalData.advice.evidence }
  ];

  container.innerHTML = pillars.map(p => {
    const isGood = p.data.status === 'good';
    const badgeColor = isGood ? 'tag-emerald' : 'tag-primary';
    const badgeText = isGood ? 'Đại Cát' : 'Ổn Định';

    return `
      <div class="clinical-pillar-card" title="${p.title}: ${p.data.text}">
        <div class="pillar-top-row">
          <span class="pillar-title"><span>${p.icon}</span> ${p.title}</span>
          <span class="pillar-badge ${badgeColor}">${badgeText}</span>
        </div>
        <div class="pillar-text">${p.data.text}</div>
      </div>
    `;
  }).join('');
}

/**
 * Sao chép Báo cáo SBAR Ca Trực vào Clipboard
 */
function copySbarBriefing(date: Date, btn: HTMLElement): void {
  const evalData = evaluateDayScore(date);
  const now = new Date();
  const curHour = evalData.gioTimeline.find(g => g.isCurrent) || evalData.gioTimeline[0];

  const text = `🩺 [CLINIPORTAL • BÁO CÁO NHỊP SINH HỌC & SẴN SÀNG TRỰC CA]
• Thời điểm: ${evalData.formattedDate} (${evalData.lunarDay}/${evalData.lunarMonth} Âm lịch)
• Điểm Thần Khí: ${evalData.total}/100 (${evalData.rating})
• Can Chi & Bản Mệnh: Ngày ${evalData.canChiDay} • Trực ${evalData.trucNgay.name} • Sao ${evalData.saoTu.name}
• Sóng Biorhythm 4 Trục:
  - 🧠 Trí tuệ: ${evalData.bio.intellectual > 0 ? '+' : ''}${evalData.bio.intellectual}%
  - 🎯 Trực giác: ${evalData.bio.intuitive > 0 ? '+' : ''}${evalData.bio.intuitive}%
  - ❤️ Cảm xúc: ${evalData.bio.emotional > 0 ? '+' : ''}${evalData.bio.emotional}%
  - 💪 Thể lực: ${evalData.bio.physical > 0 ? '+' : ''}${evalData.bio.physical}%
• Canh Giờ Hiện Tại: Giờ ${curHour.chi} (${curHour.isHoangDao ? '🌟 Hoàng Đạo' : 'Hắc Đạo'})
• Tác Vụ Y Khoa Trọng Tâm:
  - Khám ca khó: ${evalData.medicalTasks.kham_chandoan.recommendation} (${evalData.medicalTasks.kham_chandoan.totalScore}đ)
  - Khởi phác đồ: ${evalData.medicalTasks.khoi_phacdo.recommendation} (${evalData.medicalTasks.khoi_phacdo.totalScore}đ)
  - Ra toa xuất viện: ${evalData.medicalTasks.chinh_lieu_xuatvien.recommendation} (${evalData.medicalTasks.chinh_lieu_xuatvien.totalScore}đ)
• Lời Khuyên Hành Động: ${evalData.bio.clinicalTips[0] || 'Tuân thủ y lệnh thường quy an toàn.'}`;

  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i> <span>Đã Chép SBAR</span>';
    setTimeout(() => {
      btn.innerHTML = originalHtml;
    }, 2000);
  });
}
