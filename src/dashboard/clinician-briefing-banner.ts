/**
 * CliniPortal 2.0 — Chronobiology & Infectious Diseases Bento Cockpit Controller (v3.0)
 * - Bố cục Interactive Bento Cockpit (không lặp lại Modal)
 * - 60% Con Người, Môi Trường & Đời Sống • 40% Bác Sĩ Truyền Nhiễm (Cố định)
 * - Idempotent across SPA route mounts
 * Path: src/dashboard/clinician-briefing-banner.ts
 */

import type {
  DayScoreEvaluation,
  FinderPurpose,
  GioRankResult,
  MedicalTaskScoreEvaluation
} from '../tools/good-day-types';

import {
  evaluateDayScore,
  getWeekEvaluation,
  getMonthEvaluation,
  findBestClinicalDays,
  calculateShiftEnergy,
  getDoctorProfile,
  getHourChiIndexFromHour,
  downloadICSFile,
  copyDaySummaryText
} from '../tools/good-day-engine';

import {
  openDoctorProfileDrawer,
  openEnergyModal,
  updateDayScoreBadge,
  updateHeroEnergyBadge
} from '../tools/good-day-modal';

type CockpitMode = 'now' | 'calendar' | 'finder';

interface CockpitState {
  selectedDate: Date;
  selectedHourIdx: number;
  activeMode: CockpitMode;
  calendarYear: number;
  calendarMonth: number; // 1..12
  finderPurpose: FinderPurpose;
  showBreakdown: boolean;
}

const nowInit = new Date();
const state: CockpitState = {
  selectedDate: new Date(nowInit.getFullYear(), nowInit.getMonth(), nowInit.getDate()),
  selectedHourIdx: getHourChiIndexFromHour(nowInit.getHours()),
  activeMode: 'now',
  calendarYear: nowInit.getFullYear(),
  calendarMonth: nowInit.getMonth() + 1,
  finderPurpose: 'life_balance',
  showBreakdown: false
};

let cockpitClockInterval: number | null = null;
let globalEventsBound = false;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toInputDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDayOfWeekShort(d: Date): string {
  const map = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return map[d.getDay()] || 'CN';
}

function getScoreToneClass(score: number): string {
  if (score >= 80) return 'tone-high';
  if (score >= 68) return 'tone-good';
  if (score >= 55) return 'tone-avg';
  return 'tone-low';
}

function getRecLabel(rec: MedicalTaskScoreEvaluation['recommendation']): { text: string; cls: string } {
  switch (rec) {
    case 'rat_tot':
      return { text: 'Rất Thuận Lợi', cls: 'rec-rat-tot' };
    case 'tot':
      return { text: 'Khả Quan', cls: 'rec-tot' };
    case 'binh_thuong':
      return { text: 'Bình Hòa', cls: 'rec-binh-thuong' };
    default:
      return { text: 'Cần Thận Trọng', cls: 'rec-khong-nen' };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. LIVE CLOCK & SHIFT BAR UPDATER
// ═══════════════════════════════════════════════════════════════════════════

function updateLiveBar(): void {
  const now = new Date();
  const energy = calculateShiftEnergy(now);

  const timeEl = document.getElementById('ckLiveTime');
  const shiftEl = document.getElementById('ckLiveShift');
  const energyChip = document.getElementById('ckShiftEnergyChip');

  if (timeEl) {
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;
  }
  if (shiftEl) {
    shiftEl.textContent = `${energy.shiftName} • ${energy.shiftRemainingText}`;
  }
  if (energyChip) {
    energyChip.setAttribute('data-level', energy.statusClass);
    energyChip.innerHTML = `<span class="ck-energy-dot"></span><span>${energy.energyPercent}% Tỉnh Táo</span>`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. RENDER LEFT COLUMN (HERO DIAL + 60% CON NGƯỜI, MÔI TRƯỜNG & ĐỜI SỐNG)
// ═══════════════════════════════════════════════════════════════════════════

function renderHeroScoreAndSplit(ev: DayScoreEvaluation): void {
  const arc = document.getElementById('ckScoreGaugeArc') as SVGPathElement | null;
  const numEl = document.getElementById('ckTotalScoreNum');
  const ratingEl = document.getElementById('ckTotalRatingBadge');
  const summaryEl = document.getElementById('ckScoreSummaryLine');

  if (numEl) numEl.textContent = String(ev.total);
  if (ratingEl) {
    ratingEl.textContent = `${ev.icon} ${ev.rating}`;
    ratingEl.className = `ck-rating-pill ${getScoreToneClass(ev.total)}`;
  }
  if (summaryEl) {
    summaryEl.textContent = `${ev.canChiDay} • Hành ${ev.hanhNgay} • Sao ${ev.saoTu.name} • Trực ${ev.trucNgay.name}`;
  }

  // 270 deg SVG arc radius = 52 -> arc length ~ 245.04
  if (arc) {
    const maxLen = 245.04;
    const filled = (Math.max(0, Math.min(100, ev.total)) / 100) * maxLen;
    arc.style.strokeDasharray = `${filled.toFixed(1)} ${maxLen}`;
    arc.setAttribute('data-tone', getScoreToneClass(ev.total));
  }

  // Dual 60/40 Bars
  const hNum = document.getElementById('ckHumanScoreNum');
  const hBar = document.getElementById('ckHumanScoreBar');
  const hRate = document.getElementById('ckHumanRating');
  if (hNum) hNum.textContent = `${ev.humanEnv.score}/60đ`;
  if (hBar) hBar.style.width = `${ev.humanEnv.percent}%`;
  if (hRate) hRate.textContent = `${ev.humanEnv.percent}% • ${ev.humanEnv.rating}`;

  const cNum = document.getElementById('ckClinicalScoreNum');
  const cBar = document.getElementById('ckClinicalScoreBar');
  const cRate = document.getElementById('ckClinicalRating');
  if (cNum) cNum.textContent = `${ev.clinicalID.score}/40đ`;
  if (cBar) cBar.style.width = `${ev.clinicalID.percent}%`;
  if (cRate) cRate.textContent = `${ev.clinicalID.percent}% • ${ev.clinicalID.rating}`;

  // Can Chi & Nạp Âm Harmony Chips
  const pillRow = document.getElementById('ckCanChiPillRow');
  if (pillRow) {
    const napTone =
      ev.napAmRelation.score >= 6 ? 'is-pos' : ev.napAmRelation.score < 0 ? 'is-neg' : 'is-neutral';
    pillRow.innerHTML = `
      <span class="ck-meta-chip ${napTone}" title="${escapeHtml(ev.napAmRelation.text)}">
        <i class="fa-solid fa-yin-yang"></i> Nạp Âm: ${ev.napAmDay.name} (${ev.napAmDay.element})
      </span>
      <span class="ck-meta-chip ${ev.saoTu.type === 'cat' ? 'is-pos' : 'is-neg'}" title="${escapeHtml(ev.saoTu.desc)}">
        <i class="fa-regular fa-star"></i> Tú ${ev.saoTu.name} (${ev.saoTu.type === 'cat' ? 'Cát' : 'Hung'})
      </span>
      <span class="ck-meta-chip ${ev.trucNgay.type === 'cat' ? 'is-pos' : ev.trucNgay.type === 'hung' ? 'is-neg' : 'is-neutral'}" title="${escapeHtml(ev.trucNgay.desc)}">
        <i class="fa-solid fa-layer-group"></i> Trực ${ev.trucNgay.name}
      </span>
    `;
  }

  // Breakdown Factors
  const bdBox = document.getElementById('ckBreakdownChips');
  if (bdBox) {
    bdBox.classList.toggle('is-open', state.showBreakdown);
    bdBox.innerHTML = ev.breakdown
      .map(
        (b) => `
      <div class="ck-bd-item is-${b.tone}" title="${escapeHtml(b.detail)}">
        <span class="ck-bd-pillar">${b.pillar === 'human_env' ? '🌿 60%' : '🦠 40%'}</span>
        <span class="ck-bd-label">${escapeHtml(b.label)}</span>
        <strong class="ck-bd-delta">${b.delta >= 0 ? `+${b.delta}` : b.delta}đ</strong>
      </div>
    `
      )
      .join('');
  }
}

function renderEnvironmentAndCompass(ev: DayScoreEvaluation): void {
  const tk = ev.tietKhiInfo.tietKhi;
  const tltt = ev.tietKhiInfo.tuLyTuTuyet;

  const iconEl = document.getElementById('ckTietKhiIcon');
  const nameEl = document.getElementById('ckTietKhiName');
  const specialEl = document.getElementById('ckTietKhiSpecialBadge');
  const descEl = document.getElementById('ckTietKhiDesc');
  const ecoEl = document.getElementById('ckEcoHealthNote');

  if (iconEl) iconEl.textContent = tk.icon;
  if (nameEl) nameEl.textContent = `Tiết ${tk.name}`;
  if (specialEl) {
    if (tltt) {
      specialEl.hidden = false;
      specialEl.textContent = `${tltt.type}: ${tltt.name}`;
    } else {
      specialEl.hidden = true;
    }
  }
  if (descEl) descEl.textContent = tltt ? `${tk.climateDesc} ${tltt.desc}` : tk.climateDesc;
  if (ecoEl) ecoEl.textContent = ev.humanEnv.climate.ecoNote;

  const dirHy = document.getElementById('ckDirHyThan');
  const dirTai = document.getElementById('ckDirTaiThan');
  const dirHac = document.getElementById('ckDirHacThan');
  const dirTip = document.getElementById('ckDirTip');

  if (dirHy) dirHy.textContent = ev.humanEnv.directions.hyThan;
  if (dirTai) dirTai.textContent = ev.humanEnv.directions.taiThan;
  if (dirHac) dirHac.textContent = ev.humanEnv.directions.hacThan;
  if (dirTip) dirTip.textContent = ev.humanEnv.directions.travelTip;
}

function renderBiorhythmAndWave(ev: DayScoreEvaluation, weekData: ReturnType<typeof getWeekEvaluation>): void {
  const setTrack = (valId: string, barId: string, pct: number) => {
    const valEl = document.getElementById(valId);
    const barEl = document.getElementById(barId);
    if (valEl) valEl.textContent = `${pct >= 0 ? '+' : ''}${pct}%`;
    if (barEl) {
      // Map -100..+100 -> width 10%..100%
      const w = Math.max(8, Math.round((pct + 100) / 2));
      barEl.style.width = `${w}%`;
      barEl.setAttribute('data-sign', pct >= 25 ? 'high' : pct <= -25 ? 'low' : 'mid');
    }
  };

  setTrack('ckBioPhysVal', 'ckBioPhysBar', ev.bio.physical);
  setTrack('ckBioEmotVal', 'ckBioEmotBar', ev.bio.emotional);
  setTrack('ckBioIntelVal', 'ckBioIntelBar', ev.bio.intellectual);
  setTrack('ckBioIntuitVal', 'ckBioIntuitBar', ev.bio.intuitive);

  const alertEl = document.getElementById('ckBioAlertTag');
  if (alertEl) {
    const alerts: string[] = [];
    if (ev.bio.isCriticalPhysical) alerts.push('Giao pha Thể chất');
    if (ev.bio.isCriticalEmotional) alerts.push('Giao pha Cảm xúc');
    if (ev.bio.isCriticalIntellectual) alerts.push('Giao pha Trí tuệ');
    if (alerts.length > 0) {
      alertEl.hidden = false;
      alertEl.textContent = `⚠ ${alerts.join(' • ')}`;
    } else {
      alertEl.hidden = true;
    }
  }

  // SVG 7-Day Multi-Wave (Physical, Emotional, Intellectual)
  const svg = document.getElementById('ckBioWaveSvg');
  const caption = document.getElementById('ckBioWaveCaption');
  if (!svg || weekData.length < 2) return;

  const W = 320;
  const H = 92;
  const padX = 16;
  const padY = 12;
  const usableW = W - padX * 2;
  const midY = H / 2;
  const amp = (H - padY * 2) / 2;

  const xAt = (i: number) => padX + (i / (weekData.length - 1)) * usableW;
  const yAt = (pct: number) => midY - (pct / 100) * amp;

  const buildPath = (getter: (d: (typeof weekData)[number]) => number) =>
    weekData
      .map((d, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(getter(d)).toFixed(1)}`)
      .join(' ');

  const physPath = buildPath((d) => d.evalData.bio.physical);
  const emotPath = buildPath((d) => d.evalData.bio.emotional);
  const intelPath = buildPath((d) => d.evalData.bio.intellectual);

  const hitDots = weekData
    .map(
      (d, i) => `
    <g class="ck-wave-point" data-wave-idx="${i}">
      <line x1="${xAt(i).toFixed(1)}" y1="8" x2="${xAt(i).toFixed(1)}" y2="${H - 12}" class="ck-wave-guide" />
      <circle cx="${xAt(i).toFixed(1)}" cy="${yAt(d.evalData.bio.physical).toFixed(1)}" r="3.2" class="ck-dot-phys" />
      <circle cx="${xAt(i).toFixed(1)}" cy="${yAt(d.evalData.bio.intellectual).toFixed(1)}" r="3.2" class="ck-dot-intel" />
      <circle cx="${xAt(i).toFixed(1)}" cy="${yAt(d.evalData.bio.emotional).toFixed(1)}" r="3.2" class="ck-dot-emot" />
      <text x="${xAt(i).toFixed(1)}" y="${H - 1}" text-anchor="middle" class="ck-wave-xlabel">${formatDayOfWeekShort(d.date)}</text>
    </g>
  `
    )
    .join('');

  svg.innerHTML = `
    <line x1="${padX}" y1="${midY}" x2="${W - padX}" y2="${midY}" class="ck-wave-zero" />
    <path d="${emotPath}" class="ck-wave-line is-emot" fill="none" />
    <path d="${intelPath}" class="ck-wave-line is-intel" fill="none" />
    <path d="${physPath}" class="ck-wave-line is-phys" fill="none" />
    ${hitDots}
  `;

  if (caption) {
    caption.textContent = `Điểm sinh học hôm nay: TB ${ev.bio.avgScore >= 0 ? '+' : ''}${ev.bio.avgScore}% • Di chuột lên từng ngày để xem nhanh.`;
  }

  svg.querySelectorAll('.ck-wave-point').forEach((pt) => {
    pt.addEventListener('mouseenter', () => {
      const idx = Number(pt.getAttribute('data-wave-idx'));
      const item = weekData[idx];
      if (item && caption) {
        const b = item.evalData.bio;
        caption.textContent = `${item.dayOfWeek} (${item.dateFormatted}): Thể chất ${b.physical}% • Cảm xúc ${b.emotional}% • Trí tuệ ${b.intellectual}%`;
      }
    });
  });
}

function renderLifeGuidance(ev: DayScoreEvaluation): void {
  const doEl = document.getElementById('ckDoList');
  const avoidEl = document.getElementById('ckAvoidList');
  const pillarsEl = document.getElementById('ckLifePillarsGrid');

  if (doEl) {
    doEl.innerHTML = ev.humanEnv.doList
      .slice(0, 3)
      .map((item) => `<li><i class="fa-solid fa-circle-check"></i><span>${escapeHtml(item)}</span></li>`)
      .join('');
  }
  if (avoidEl) {
    avoidEl.innerHTML = ev.humanEnv.avoidList
      .slice(0, 3)
      .map((item) => `<li><i class="fa-solid fa-circle-exclamation"></i><span>${escapeHtml(item)}</span></li>`)
      .join('');
  }
  if (pillarsEl) {
    const items = [
      ev.humanEnv.pillars.bodyAndSpace,
      ev.humanEnv.pillars.relationships,
      ev.humanEnv.pillars.lifeAndFinance
    ];
    pillarsEl.innerHTML = items
      .map(
        (p) => `
      <div class="ck-life-pillar-row is-${p.status}">
        <div class="ck-pillar-head">
          <strong>${escapeHtml(p.title)}</strong>
          <span class="ck-status-dot is-${p.status}"></span>
        </div>
        <p>${escapeHtml(p.text)}</p>
      </div>
    `
      )
      .join('');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. RENDER RIGHT COLUMN — MODE 1: 12 CANH GIỜ & CHUYÊN MÔN TRUYỀN NHIỄM (40%)
// ═══════════════════════════════════════════════════════════════════════════

function renderHourInspector(gio: GioRankResult): void {
  const box = document.getElementById('ckGioInspector');
  if (!box) return;

  box.innerHTML = `
    <div class="ck-hour-inspect-head">
      <div>
        <span class="ck-hour-tag ${gio.isHoangDao ? 'is-hd' : 'is-hac'}">
          ${gio.isHoangDao ? '✨ Hoàng Đạo' : '🌑 Hắc Đạo'} • ${gio.starName}
        </span>
        <h4>Giờ ${gio.chi} (${gio.timeRange}) — ${gio.fullCanChi}</h4>
        <small>Nạp Âm Giờ: ${gio.napAm} (${gio.napAmElement})</small>
      </div>
      <span class="ck-rank-pill ${gio.badgeClass}">${gio.rankTitle}</span>
    </div>

    <div class="ck-hour-dual-notes">
      <div class="ck-hour-note is-life">
        <span><i class="fa-solid fa-sun"></i> 60% Đời Sống & Giao Tiếp</span>
        <p>${escapeHtml(gio.lifeNote)}</p>
      </div>
      <div class="ck-hour-note is-id">
        <span><i class="fa-solid fa-virus"></i> 40% Lâm Sàng Truyền Nhiễm</span>
        <p>${escapeHtml(gio.clinicalNote)}</p>
      </div>
    </div>

    <div class="ck-hour-factors">
      ${gio.goodFactors.map((f) => `<span class="ck-factor-tag is-pos">+ ${escapeHtml(f)}</span>`).join('')}
      ${gio.badFactors.map((f) => `<span class="ck-factor-tag is-neg">- ${escapeHtml(f)}</span>`).join('')}
    </div>
  `;
}

function renderModeNow(ev: DayScoreEvaluation): void {
  const ribbon = document.getElementById('ckGioRibbon');
  if (ribbon) {
    ribbon.innerHTML = ev.gioRanks
      .map((g, idx) => {
        const isCurr = ev.gioTimeline[idx]?.isCurrent;
        const isSelected = idx === state.selectedHourIdx;
        return `
        <button
          type="button"
          class="ck-gio-chip ${g.isHoangDao ? 'is-hd' : 'is-hac'} ${isSelected ? 'is-selected' : ''} ${isCurr ? 'is-current' : ''}"
          data-gio-idx="${idx}"
          aria-pressed="${isSelected ? 'true' : 'false'}"
        >
          <span class="ck-gio-name">${g.chi}${isCurr ? ' •' : ''}</span>
          <span class="ck-gio-time">${g.timeRange}</span>
          <span class="ck-gio-rank ${g.badgeClass}">B${g.rank}</span>
        </button>
      `;
      })
      .join('');
  }

  const chosenGio = ev.gioRanks[state.selectedHourIdx] || ev.gioRanks[0]!;
  renderHourInspector(chosenGio);

  // Infectious Diseases Focus & 4 Pillars
  const focusBox = document.getElementById('ckIdShiftFocusBox');
  if (focusBox) {
    focusBox.innerHTML = `
      <div class="ck-id-focus-head">
        <span><i class="fa-solid fa-microscope"></i> Định Hướng Chuyên Khoa Truyền Nhiễm (40%)</span>
        <strong>${ev.clinicalID.score}/40đ</strong>
      </div>
      <p>${escapeHtml(ev.clinicalID.idShiftFocus)}</p>
    `;
  }

  const idPillarsGrid = document.getElementById('ckIdPillarsGrid');
  if (idPillarsGrid) {
    const pArr = [
      ev.clinicalID.pillars.fuoAndSepsis,
      ev.clinicalID.pillars.amsStewardship,
      ev.clinicalID.pillars.sourceControl,
      ev.clinicalID.pillars.ipcAndEbm
    ];
    idPillarsGrid.innerHTML = pArr
      .map(
        (p) => `
      <div class="ck-id-pillar-card is-${p.status}">
        <div class="ck-pillar-head">
          <strong>${escapeHtml(p.title)}</strong>
          <span class="ck-status-dot is-${p.status}"></span>
        </div>
        <p>${escapeHtml(p.text)}</p>
      </div>
    `
      )
      .join('');
  }

  // 5 Infectious Diseases Tasks
  const tasksGrid = document.getElementById('ckIdTasksGrid');
  if (tasksGrid) {
    const taskArr = Object.values(ev.clinicalID.tasks);
    tasksGrid.innerHTML = taskArr
      .map((t) => {
        const rec = getRecLabel(t.recommendation);
        return `
        <article class="ck-task-card ${rec.cls}">
          <div class="ck-task-head">
            <span class="ck-task-icon">${t.task.icon}</span>
            <div class="ck-task-title-wrap">
              <h4>${escapeHtml(t.task.shortTitle)}</h4>
              <small>${escapeHtml(t.trucNote)} • ${escapeHtml(t.thanSatNote)}</small>
            </div>
            <div class="ck-task-score-box">
              <strong>${t.totalScore}đ</strong>
              <span class="ck-rec-badge ${rec.cls}">${rec.text}</span>
            </div>
          </div>
          <p class="ck-task-advice">${escapeHtml(t.advice)}</p>
        </article>
      `;
      })
      .join('');
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. MODE 2: LỊCH 7 NGÀY & HEATMAP 30 NGÀY
// ═══════════════════════════════════════════════════════════════════════════

function renderModeCalendar(ev: DayScoreEvaluation, weekData: ReturnType<typeof getWeekEvaluation>): void {
  const weekGrid = document.getElementById('ckWeekStripGrid');
  if (weekGrid) {
    weekGrid.innerHTML = weekData
      .map((w) => {
        const isSelected = w.dateKey === ev.dateKey;
        return `
        <button
          type="button"
          class="ck-week-card ${getScoreToneClass(w.score)} ${isSelected ? 'is-selected' : ''} ${w.isBestDay ? 'is-best' : ''}"
          data-jump-date="${w.dateKey}"
        >
          <div class="ck-week-top">
            <span>${w.dayOfWeek}</span>
            ${w.isBestDay ? '<span class="ck-best-tag">Đẹp nhất</span>' : ''}
          </div>
          <strong class="ck-week-solar">${w.dateFormatted}</strong>
          <small class="ck-week-lunar">Âm ${w.lunarFormatted} • ${w.canChi}</small>
          <div class="ck-week-score-row">
            <span class="ck-week-total">${w.score}đ</span>
            <span class="ck-week-split">${w.humanScore}/60 • ${w.clinicalScore}/40</span>
          </div>
        </button>
      `;
      })
      .join('');
  }

  // Monthly 30-Day Heatmap
  const titleEl = document.getElementById('ckMonthCalTitle');
  const monthGrid = document.getElementById('ckMonthGrid');
  if (!monthGrid) return;

  if (titleEl) {
    titleEl.textContent = `Tháng ${String(state.calendarMonth).padStart(2, '0')} / ${state.calendarYear}`;
  }

  const monthDays = getMonthEvaluation(state.calendarYear, state.calendarMonth);
  const firstWeekday = new Date(state.calendarYear, state.calendarMonth - 1, 1).getDay(); // 0 = Sun
  const mondayFirstOffset = (firstWeekday + 6) % 7;
  const todayKey = toInputDateStr(new Date());

  const blanks = Array.from({ length: mondayFirstOffset })
    .map(() => '<div class="ck-cal-cell is-empty" aria-hidden="true"></div>')
    .join('');

  const cells = monthDays
    .map((d) => {
      const isSelected = d.dateKey === ev.dateKey;
      const isToday = d.dateKey === todayKey;
      return `
      <button
        type="button"
        class="ck-cal-cell ${getScoreToneClass(d.total)} ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}"
        data-jump-date="${d.dateKey}"
        title="${d.formattedDate} (${d.canChiDay}) — ${d.total}/100đ"
      >
        <div class="ck-cal-cell-top">
          <span class="ck-cal-solar">${d.dateObj.getDate()}</span>
          <span class="ck-cal-score">${d.total}</span>
        </div>
        <span class="ck-cal-lunar">${d.lunarDay}/${d.lunarMonth}${d.lunar.isLeap ? 'N' : ''}</span>
        <span class="ck-cal-canchi">${d.canChiDay}</span>
      </button>
    `;
    })
    .join('');

  monthGrid.innerHTML = blanks + cells;
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. MODE 3: BỘ TÌM NGÀY ĐẸP 6 MỤC ĐÍCH
// ═══════════════════════════════════════════════════════════════════════════

function renderModeFinder(): void {
  const pillsBox = document.getElementById('ckFinderPills');
  const resultsBox = document.getElementById('ckFinderResults');
  if (!pillsBox || !resultsBox) return;

  const purposes: { id: FinderPurpose; label: string; group: string }[] = [
    { id: 'life_balance', label: '🌿 Đời Sống & Gia Đạo', group: '60%' },
    { id: 'travel_meeting', label: '🧭 Xuất Hành & Ký Kết', group: '60%' },
    { id: 'fuo_diagnosis', label: '🌡️ Biện Luận Sốt CRNN', group: '40%' },
    { id: 'ams_therapy', label: '💊 Tối Ưu Kháng Sinh', group: '40%' },
    { id: 'source_control', label: '🩺 Thủ Thuật & LP', group: '40%' },
    { id: 'ebm_rounds', label: '🦠 Hội Chẩn & EBM', group: '40%' }
  ];

  pillsBox.innerHTML = purposes
    .map(
      (p) => `
    <button
      type="button"
      class="ck-finder-pill ${state.finderPurpose === p.id ? 'is-active' : ''}"
      data-finder-purpose="${p.id}"
    >
      <span class="ck-pill-weight">${p.group}</span>
      <span>${p.label}</span>
    </button>
  `
    )
    .join('');

  const topDays = findBestClinicalDays(state.finderPurpose, 30);
  resultsBox.innerHTML = topDays
    .map((item) => {
      const e = item.evalData;
      return `
      <div class="ck-finder-card ${getScoreToneClass(item.score)}">
        <div class="ck-finder-rank">#${item.rank}</div>
        <div class="ck-finder-info">
          <div class="ck-finder-date-line">
            <strong>${formatDayOfWeekShort(e.dateObj)}, ${e.formattedDate}</strong>
            <span>• Âm ${e.lunarDay}/${e.lunarMonth}${e.lunar.isLeap ? 'N' : ''} (${e.canChiDay})</span>
          </div>
          <div class="ck-finder-reasons">
            ${item.matchReasons.map((r) => `<span class="ck-reason-tag">${escapeHtml(r)}</span>`).join('')}
          </div>
        </div>
        <div class="ck-finder-actions">
          <div class="ck-finder-score-num">
            <strong>${item.score}đ</strong>
            <small>${e.humanEnv.score}/60 • ${e.clinicalID.score}/40</small>
          </div>
          <button type="button" class="ck-jump-btn" data-jump-date="${e.dateKey}">
            Xem chi tiết
          </button>
        </div>
      </div>
    `;
    })
    .join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. FULL ORCHESTRATED RENDER & EVENT BINDING
// ═══════════════════════════════════════════════════════════════════════════

function syncModeTabs(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-cockpit-mode]').forEach((btn) => {
    const mode = btn.getAttribute('data-cockpit-mode') as CockpitMode;
    const isActive = mode === state.activeMode;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const nowPanel = document.getElementById('ckModeNow');
  const calPanel = document.getElementById('ckModeCalendar');
  const finderPanel = document.getElementById('ckModeFinder');

  if (nowPanel) nowPanel.hidden = state.activeMode !== 'now';
  if (calPanel) calPanel.hidden = state.activeMode !== 'calendar';
  if (finderPanel) finderPanel.hidden = state.activeMode !== 'finder';
}

function renderAll(): void {
  const root = document.getElementById('chronoWorkstation');
  if (!root) return;

  const doc = getDoctorProfile();
  const ev = evaluateDayScore(state.selectedDate, doc);
  const weekData = getWeekEvaluation(state.selectedDate, doc);

  // Command Bar
  const dateInput = document.getElementById('ckDatePicker') as HTMLInputElement | null;
  if (dateInput) dateInput.value = ev.dateKey;

  const solarDisp = document.getElementById('ckSolarDisplay');
  const lunarDisp = document.getElementById('ckLunarDisplay');
  if (solarDisp) solarDisp.textContent = `${formatDayOfWeekShort(ev.dateObj)}, ${ev.formattedDate}`;
  if (lunarDisp) {
    lunarDisp.textContent = `Âm ${ev.lunarDay}/${ev.lunarMonth}${ev.lunar.isLeap ? 'N' : ''} • ${ev.canChiDay}`;
  }

  const profName = document.getElementById('ckProfileName');
  const profMeta = document.getElementById('ckProfileMeta');
  if (profName) profName.textContent = doc.name;
  if (profMeta) profMeta.textContent = `Truyền Nhiễm • ${doc.canNam} ${doc.chiNam} (${doc.napAmName})`;

  // Left Column
  renderHeroScoreAndSplit(ev);
  renderEnvironmentAndCompass(ev);
  renderBiorhythmAndWave(ev, weekData);
  renderLifeGuidance(ev);

  // Right Column
  syncModeTabs();
  if (state.activeMode === 'now') {
    renderModeNow(ev);
  } else if (state.activeMode === 'calendar') {
    renderModeCalendar(ev, weekData);
  } else {
    renderModeFinder();
  }

  updateLiveBar();
  updateDayScoreBadge();
  updateHeroEnergyBadge();
}

function jumpToDateKey(dateKey: string): void {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return;
  state.selectedDate = new Date(y, m - 1, d);
  state.calendarYear = y;
  state.calendarMonth = m;
  renderAll();
}

function bindWorkstationEvents(): void {
  const root = document.getElementById('chronoWorkstation');
  if (!root || root.getAttribute('data-cockpit-bound') === '1') return;
  root.setAttribute('data-cockpit-bound', '1');

  root.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const modeBtn = target.closest('[data-cockpit-mode]') as HTMLElement | null;
    if (modeBtn) {
      const mode = modeBtn.getAttribute('data-cockpit-mode') as CockpitMode;
      if (mode) {
        state.activeMode = mode;
        renderAll();
      }
      return;
    }

    const gioBtn = target.closest('[data-gio-idx]') as HTMLElement | null;
    if (gioBtn) {
      const idx = Number(gioBtn.getAttribute('data-gio-idx'));
      if (!Number.isNaN(idx)) {
        state.selectedHourIdx = idx;
        renderAll();
      }
      return;
    }

    const jumpBtn = target.closest('[data-jump-date]') as HTMLElement | null;
    if (jumpBtn) {
      const dk = jumpBtn.getAttribute('data-jump-date');
      if (dk) {
        jumpToDateKey(dk);
        if (state.activeMode === 'finder') {
          state.activeMode = 'now';
          renderAll();
        }
      }
      return;
    }

    const finderBtn = target.closest('[data-finder-purpose]') as HTMLElement | null;
    if (finderBtn) {
      const purpose = finderBtn.getAttribute('data-finder-purpose') as FinderPurpose;
      if (purpose) {
        state.finderPurpose = purpose;
        renderModeFinder();
      }
      return;
    }

    if (target.closest('#ckPrevDayBtn')) {
      state.selectedDate = new Date(
        state.selectedDate.getFullYear(),
        state.selectedDate.getMonth(),
        state.selectedDate.getDate() - 1
      );
      state.calendarYear = state.selectedDate.getFullYear();
      state.calendarMonth = state.selectedDate.getMonth() + 1;
      renderAll();
      return;
    }

    if (target.closest('#ckNextDayBtn')) {
      state.selectedDate = new Date(
        state.selectedDate.getFullYear(),
        state.selectedDate.getMonth(),
        state.selectedDate.getDate() + 1
      );
      state.calendarYear = state.selectedDate.getFullYear();
      state.calendarMonth = state.selectedDate.getMonth() + 1;
      renderAll();
      return;
    }

    if (target.closest('#ckTodayBtn')) {
      const today = new Date();
      state.selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      state.selectedHourIdx = getHourChiIndexFromHour(today.getHours());
      state.calendarYear = today.getFullYear();
      state.calendarMonth = today.getMonth() + 1;
      renderAll();
      return;
    }

    if (target.closest('#ckMonthPrevBtn')) {
      if (state.calendarMonth === 1) {
        state.calendarMonth = 12;
        state.calendarYear -= 1;
      } else {
        state.calendarMonth -= 1;
      }
      renderModeCalendar(evaluateDayScore(state.selectedDate), getWeekEvaluation(state.selectedDate));
      return;
    }

    if (target.closest('#ckMonthNextBtn')) {
      if (state.calendarMonth === 12) {
        state.calendarMonth = 1;
        state.calendarYear += 1;
      } else {
        state.calendarMonth += 1;
      }
      renderModeCalendar(evaluateDayScore(state.selectedDate), getWeekEvaluation(state.selectedDate));
      return;
    }

    if (target.closest('#ckProfileBtn')) {
      openDoctorProfileDrawer(() => renderAll());
      return;
    }

    if (target.closest('#ckShiftEnergyChip') || target.closest('#ckToggleEnergyBtn')) {
      openEnergyModal();
      return;
    }

    if (target.closest('#ckToggleBreakdownBtn')) {
      state.showBreakdown = !state.showBreakdown;
      const btn = document.getElementById('ckToggleBreakdownBtn');
      const box = document.getElementById('ckBreakdownChips');
      if (btn) btn.setAttribute('aria-expanded', state.showBreakdown ? 'true' : 'false');
      if (box) box.classList.toggle('is-open', state.showBreakdown);
      return;
    }

    if (target.closest('#ckCopySbarBtn')) {
      const ev = evaluateDayScore(state.selectedDate);
      const txt = copyDaySummaryText(ev);
      navigator.clipboard?.writeText(txt).then(() => {
        const btn = document.getElementById('ckCopySbarBtn');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép';
          setTimeout(() => {
            btn.innerHTML = orig;
          }, 1800);
        }
      });
      return;
    }

    if (target.closest('#ckDownloadIcsBtn')) {
      downloadICSFile(evaluateDayScore(state.selectedDate));
      return;
    }
  });

  const datePicker = document.getElementById('ckDatePicker') as HTMLInputElement | null;
  if (datePicker) {
    datePicker.addEventListener('change', () => {
      if (datePicker.value) jumpToDateKey(datePicker.value);
    });
  }
}

export function initClinicianBriefingBanner(): void {
  const root = document.getElementById('chronoWorkstation');
  if (!root) return;

  bindWorkstationEvents();
  renderAll();

  if (cockpitClockInterval !== null) {
    window.clearInterval(cockpitClockInterval);
  }
  cockpitClockInterval = window.setInterval(updateLiveBar, 1000);

  if (!globalEventsBound) {
    globalEventsBound = true;
    window.addEventListener('cliniportal:doctor-profile-updated', () => {
      renderAll();
    });
    window.addEventListener('cliniportal:cockpit-switch-mode', (evt: Event) => {
      const custom = evt as CustomEvent<{ mode?: CockpitMode; dateObj?: Date }>;
      if (custom.detail?.mode) state.activeMode = custom.detail.mode;
      if (custom.detail?.dateObj instanceof Date) {
        const d = custom.detail.dateObj;
        state.selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        state.calendarYear = d.getFullYear();
        state.calendarMonth = d.getMonth() + 1;
      }
      renderAll();
    });
  }
}
