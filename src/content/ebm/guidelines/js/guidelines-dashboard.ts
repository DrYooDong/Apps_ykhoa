/**
 * CliniPortal 2.0 — Guidelines Dashboard Analytics (TypeScript)
 * Path: src/content/ebm/guidelines/js/guidelines-dashboard.ts
 */

import { Study } from '../guidelines-types';

import '../guidelines-types';

const PALETTE = [
  '#7c3aed', '#0284c7', '#10b981', '#f59e0b', '#ef4444',
  '#06b6d4', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316'
];

const IMPACT_COLORS: Record<string, string> = {
  'practice-changing': '#10b981',
  'informative': '#3b82f6',
  'early-signal': '#f59e0b',
  'negative': '#ef4444',
  'regulatory': '#8b5cf6'
};

const IMPACT_LABELS: Record<string, string> = {
  'practice-changing': 'Practice-Changing',
  'informative': 'Informative',
  'early-signal': 'Early Signal',
  'negative': 'Negative',
  'regulatory': 'Regulatory'
};

const SPECIALTY_LABELS: Record<string, string> = {
  'cardio': 'Tim Mạch', 'pulmo': 'Hô Hấp', 'gi': 'Tiêu Hóa',
  'endo': 'Nội Tiết', 'neuro': 'Thần Kinh', 'infect': 'Truyền Nhiễm',
  'renal': 'Thận Học', 'rheum': 'Cơ Xương Khớp', 'hema': 'Huyết Học',
  'onco': 'Ung Thư', 'pedia': 'Nhi Khoa', 'obgyn': 'Sản Phụ Khoa',
  'icu': 'ICU', 'derma': 'Da Liễu', 'ent': 'Tai Mũi Họng',
  'nutri': 'Dinh Dưỡng', 'unknown': 'Khác'
};

export function renderGuidelineDashboard(allStudies: Study[]): void {
  const panel = document.getElementById('panel-analytics');
  if (!panel) return;

  if (!allStudies || allStudies.length === 0) {
    panel.innerHTML = `
      <div style="text-align:center; padding:3rem; color:var(--text-muted);">
        <div style="font-size:3rem; margin-bottom:1rem;">📊</div>
        <p>Chưa có dữ liệu để hiển thị Dashboard. Hãy thêm Guidelines vào thư viện trước.</p>
      </div>`;
    return;
  }

  const stats = computeStats(allStudies);
  panel.innerHTML = buildDashboardHTML(stats, allStudies);

  requestAnimationFrame(() => {
    animateKpiCounters(panel);
    animateHBars(panel);
    animateYearBars(panel);
    attachDonutInteraction(panel);
  });
}

function computeStats(studies: Study[]): {
  bySpec: Record<string, number>;
  bySource: Record<string, number>;
  byImpact: Record<string, number>;
  byYear: Record<string, number>;
  byDesign: Record<string, number>;
  total: number;
} {
  const bySpec: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const byImpact: Record<string, number> = {};
  const byYear: Record<string, number> = {};
  const byDesign: Record<string, number> = {};

  studies.forEach(s => {
    const spec = s.specialty || 'unknown';
    bySpec[spec] = (bySpec[spec] || 0) + 1;

    const src = s.sourceType || 'unknown';
    bySource[src] = (bySource[src] || 0) + 1;

    const imp = s.impact || 'unknown';
    byImpact[imp] = (byImpact[imp] || 0) + 1;

    const yr = String(s.year || 'N/A');
    byYear[yr] = (byYear[yr] || 0) + 1;

    const des = s.design || 'unknown';
    byDesign[des] = (byDesign[des] || 0) + 1;
  });

  return { bySpec, bySource, byImpact, byYear, byDesign, total: studies.length };
}

function buildDashboardHTML(stats: any, allStudies: Study[]): string {
  const streak = getReadingStreak();
  const gotd = getGuidelineOfTheDay(allStudies);

  return `
<div class="gd-dashboard">

  <div>
    <div class="gd-section-header">
      <span class="gd-section-title">📌 Tổng Quan</span>
    </div>
    <div class="gd-kpi-grid">
      ${buildKpiCard('Tổng Tài Liệu', stats.total, '📚', '#7c3aed')}
      ${buildKpiCard('Practice-Changing', stats.byImpact['practice-changing'] || 0, '🏆', '#10b981')}
      ${buildKpiCard('Quốc Tế', (stats.bySource['intl-study'] || 0) + (stats.bySource['intl-guideline'] || 0), '🌐', '#0284c7')}
      ${buildKpiCard('BYT Việt Nam', (stats.bySource['vn-moh'] || 0) + (stats.bySource['vn-association'] || 0), '🇻🇳', '#ef4444')}
    </div>
  </div>

  <div class="gd-charts-row">
    <div class="gd-chart-card">
      <div class="gd-chart-title">
        🏥 Phân bố theo Chuyên Khoa
        <span class="gd-chart-subtitle">Donut chart</span>
      </div>
      ${buildDonutChart(stats.bySpec, 120)}
    </div>

    <div class="gd-chart-card">
      <div class="gd-chart-title">
        🧬 Thiết Kế Nghiên Cứu
        <span class="gd-chart-subtitle">Horizontal bar</span>
      </div>
      ${buildHBarChart(stats.byDesign, {
        'rct': 'RCT',
        'meta': 'Meta-Analysis',
        'guideline': 'Guideline',
        'cohort': 'Cohort',
        'review': 'Review',
        'case-report': 'Case Report'
      })}
    </div>
  </div>

  <div class="gd-charts-row">
    <div class="gd-chart-card">
      <div class="gd-chart-title">
        📅 Số lượng theo Năm
        <span class="gd-chart-subtitle">Bar chart</span>
      </div>
      ${buildYearBarsChart(stats.byYear)}
    </div>

    <div class="gd-chart-card">
      <div class="gd-chart-title">
        ⚡ Phân bố Mức Ảnh Hưởng
        <span class="gd-chart-subtitle">Summary grid</span>
      </div>
      <div class="gd-impact-grid">
        ${Object.entries(IMPACT_LABELS).map(([key, label]) => `
          <div class="gd-impact-badge">
            <div class="gd-impact-badge-dot" style="background:${IMPACT_COLORS[key] || '#94a3b8'};"></div>
            <div class="gd-impact-badge-info">
              <div class="gd-impact-badge-label">${label}</div>
              <div class="gd-impact-badge-count" data-kpi-target="${stats.byImpact[key] || 0}">0</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <div class="gd-charts-row-3">
    <div class="gd-chart-card">
      <div class="gd-chart-title">
        📦 Phân bố theo Nguồn
        <span class="gd-chart-subtitle">Horizontal bar</span>
      </div>
      ${buildHBarChart(stats.bySource, {
        'intl-study': 'Nghiên cứu QT',
        'intl-guideline': 'Guideline QT',
        'vn-moh': 'Bộ Y Tế VN',
        'vn-association': 'Hội chuyên khoa',
        'vn-doh': 'Sở Y Tế'
      })}
    </div>

    <div>
      ${buildGuidelineOfTheDayCard(gotd)}
    </div>

    <div>
      ${buildStreakWidget(streak)}
    </div>
  </div>

</div>
  `;
}

function buildKpiCard(label: string, value: number, icon: string, color: string): string {
  return `
    <div class="gd-kpi-card" style="--kpi-color: ${hexToRgba(color, 0.1)};">
      <div class="gd-kpi-icon">${icon}</div>
      <div class="gd-kpi-label">${label}</div>
      <div class="gd-kpi-value" data-kpi-target="${value}">0</div>
    </div>
  `;
}

function buildDonutChart(dataObj: Record<string, number>, radius: number): string {
  const total = Object.values(dataObj).reduce((a, b) => a + b, 0);
  if (total === 0) return '<p style="color:var(--text-muted);font-size:0.82rem;">Không có dữ liệu</p>';

  const cx = radius, cy = radius;
  const r = radius * 0.7;
  const innerR = radius * 0.4;
  const size = radius * 2;

  const entries = Object.entries(dataObj).sort((a, b) => b[1] - a[1]).slice(0, 8);
  let paths = '';
  let legendItems = '';
  let currentAngle = -Math.PI / 2;

  entries.forEach(([key, count], i) => {
    const slice = (count / total) * 2 * Math.PI;
    const endAngle = currentAngle + slice;
    const large = slice > Math.PI ? 1 : 0;

    const x1 = cx + r * Math.cos(currentAngle);
    const y1 = cy + r * Math.sin(currentAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle);
    const iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(currentAngle);
    const iy2 = cy + innerR * Math.sin(currentAngle);

    const color = PALETTE[i % PALETTE.length];
    const label = SPECIALTY_LABELS[key] || key;

    paths += `<path class="gd-donut-path" data-label="${label}" data-count="${count}"
      d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z"
      fill="${color}" />`;

    legendItems += `
      <div class="gd-donut-legend-item" data-key="${key}" data-color="${color}">
        <div class="gd-donut-legend-dot" style="background:${color};"></div>
        <span class="gd-donut-legend-label">${label}</span>
        <span class="gd-donut-legend-count">${count}</span>
      </div>
    `;

    currentAngle = endAngle;
  });

  return `
    <div class="gd-donut-wrapper">
      <svg width="${size}" height="${size}" class="gd-donut-svg" viewBox="0 0 ${size} ${size}">
        ${paths}
        <circle cx="${cx}" cy="${cy}" r="${innerR * 0.6}" fill="var(--surface, #fff)" />
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-muted, #64748b)">Tổng</text>
        <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text, #0f172a)" id="donut-center-val">${total}</text>
      </svg>
      <div class="gd-donut-legend">${legendItems}</div>
    </div>
  `;
}

function buildHBarChart(dataObj: Record<string, number>, labelMap: Record<string, string>, _color = '#7c3aed'): string {
  const maxVal = Math.max(...Object.values(dataObj), 1);
  const entries = Object.entries(dataObj).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return `
    <div class="gd-hbar-list">
      ${entries.map(([key, count], i) => {
        const label = labelMap[key] || key;
        const pct = Math.round((count / maxVal) * 100);
        const barColor = PALETTE[i % PALETTE.length];
        return `
          <div class="gd-hbar-item">
            <div class="gd-hbar-label">${label}</div>
            <div class="gd-hbar-track">
              <div class="gd-hbar-fill" style="background:${barColor};" data-hbar-pct="${pct}"></div>
            </div>
            <div class="gd-hbar-count">${count}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function buildYearBarsChart(byYear: Record<string, number>): string {
  const entries = Object.entries(byYear)
    .filter(([yr]) => yr !== 'N/A' && !isNaN(Number(yr)))
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .slice(-8);

  if (entries.length === 0) return '<p style="color:var(--text-muted);font-size:0.82rem;">Không có dữ liệu năm.</p>';

  const maxVal = Math.max(...entries.map(e => e[1]), 1);

  return `
    <div class="gd-year-bars">
      ${entries.map(([yr, count], i) => {
        const heightPct = Math.round((count / maxVal) * 100);
        const barColor = PALETTE[i % PALETTE.length];
        return `
          <div class="gd-year-bar-col">
            <div class="gd-year-bar-fill" data-yearbar-pct="${heightPct}" style="background:${barColor};" title="${yr}: ${count} bài"></div>
            <div class="gd-year-bar-label">${yr}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function buildGuidelineOfTheDayCard(gotd: Study | null): string {
  if (!gotd) {
    return `<div class="gd-gotd-card"><p style="color:var(--text-muted);font-size:0.82rem;">Chưa có dữ liệu.</p></div>`;
  }
  const rawFile = gotd.file || '';
  const fileUrl = rawFile ? ('kho-guidelines/' + rawFile) : 'guidelines.html';
  return `
    <div class="gd-gotd-card">
      <div class="gd-gotd-eyebrow">
        <span class="gd-gotd-pulse"></span>
        Guideline Hôm Nay · ${new Date().toLocaleDateString('vi-VN')}
      </div>
      <div class="gd-gotd-title">${escHtml(gotd.title || 'Không xác định')}</div>
      <div class="gd-gotd-meta">
        <span>🏛 ${escHtml(gotd.organization || 'N/A')}</span>
        <span>📅 ${gotd.year || 'N/A'}</span>
        <span>🏥 ${escHtml(SPECIALTY_LABELS[gotd.specialty] || gotd.specialty || 'N/A')}</span>
      </div>
      <a class="gd-gotd-action" href="${fileUrl}">
        Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;
}

function buildStreakWidget(streak: number): string {
  return `
    <div class="gd-streak-widget">
      <div class="gd-streak-icon">🔥</div>
      <div>
        <div class="gd-streak-count">${streak}</div>
        <div class="gd-streak-label">ngày liên tục đọc Guidelines</div>
      </div>
    </div>
  `;
}

function animateKpiCounters(panel: HTMLElement): void {
  panel.querySelectorAll('[data-kpi-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-kpi-target') || '0', 10) || 0;
    let start: number | null = null;
    const duration = 900;
    function step(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    }
    requestAnimationFrame(step);
  });
}

function animateHBars(panel: HTMLElement): void {
  panel.querySelectorAll('[data-hbar-pct]').forEach(el => {
    const pct = el.getAttribute('data-hbar-pct');
    setTimeout(() => {
      (el as HTMLElement).style.width = pct + '%';
    }, 100);
  });
}

function animateYearBars(panel: HTMLElement): void {
  const MAX_HEIGHT = 100;
  panel.querySelectorAll('[data-yearbar-pct]').forEach(el => {
    const pct = parseInt(el.getAttribute('data-yearbar-pct') || '0', 10);
    const targetH = Math.round((pct / 100) * MAX_HEIGHT);
    setTimeout(() => {
      (el as HTMLElement).style.height = targetH + 'px';
      (el as HTMLElement).style.transition = 'height 1s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 100);
  });
}

function attachDonutInteraction(panel: HTMLElement): void {
  const paths = panel.querySelectorAll('.gd-donut-path');
  const centerVal = panel.querySelector('#donut-center-val') as HTMLElement | null;
  const total = Array.from(paths).reduce((acc, p) => acc + parseInt(p.getAttribute('data-count') || '0', 10), 0);

  paths.forEach(path => {
    path.addEventListener('mouseenter', () => {
      const count = path.getAttribute('data-count');
      if (centerVal) {
        centerVal.textContent = count;
        centerVal.style.fill = path.getAttribute('fill') || '';
      }
      paths.forEach(p => ((p as HTMLElement).style.opacity = p === path ? '1' : '0.4'));
    });
    path.addEventListener('mouseleave', () => {
      if (centerVal) {
        centerVal.textContent = String(total);
        centerVal.style.fill = 'var(--text, #0f172a)';
      }
      paths.forEach(p => ((p as HTMLElement).style.opacity = '1'));
    });
  });
}

function getGuidelineOfTheDay(studies: Study[]): Study | null {
  if (!studies || studies.length === 0) return null;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return studies[dayOfYear % studies.length];
}

function getReadingStreak(): number {
  const today = new Date().toDateString();
  const stored = JSON.parse(localStorage.getItem('clini_reading_streak') || '{"lastDate":null,"count":0}');
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (stored.lastDate === today) return stored.count;
  if (stored.lastDate === yesterday) {
    const updated = { lastDate: today, count: stored.count + 1 };
    localStorage.setItem('clini_reading_streak', JSON.stringify(updated));
    return updated.count;
  }
  const reset = { lastDate: today, count: 1 };
  localStorage.setItem('clini_reading_streak', JSON.stringify(reset));
  return 1;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function escHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
  window.renderGuidelineDashboard = renderGuidelineDashboard;
  window.renderAnalytics = function () {
    const allStudies: Study[] = window.studies || [];
    renderGuidelineDashboard(allStudies);
  };
}
