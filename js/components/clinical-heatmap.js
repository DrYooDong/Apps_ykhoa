/**
 * Clinical Progress Heatmap Widget
 * Inspired by zerostaticthemes/square-ui (Habit Tracker Contribution Heatmap)
 * Pure Vanilla JS - CliniPortal
 */

(function () {
  'use strict';

  class ClinicalHeatmap {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) return;
      
      this.storageKey = 'cliniportal_activity_log';
      this.initData();
      this.render();
    }

    initData() {
      let raw = localStorage.getItem(this.storageKey);
      if (raw) {
        try {
          this.activityMap = JSON.parse(raw);
        } catch (e) {
          this.activityMap = {};
        }
      } else {
        // Generate realistic sample activity data for demonstration
        this.activityMap = this.generateSampleData();
        localStorage.setItem(this.storageKey, JSON.stringify(this.activityMap));
      }
    }

    generateSampleData() {
      const data = {};
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        // Create realistic random pattern: higher activity on weekdays, zero on some days
        const dayOfWeek = d.getDay();
        const rand = Math.random();
        if (rand > 0.35) {
          let count = Math.floor(Math.random() * 5) + 1;
          if (dayOfWeek === 0 || dayOfWeek === 6) count = Math.floor(Math.random() * 3);
          if (count > 0) data[dateStr] = count;
        }
      }
      return data;
    }

    logActivity(count = 1) {
      const dateStr = new Date().toISOString().split('T')[0];
      this.activityMap[dateStr] = (this.activityMap[dateStr] || 0) + count;
      localStorage.setItem(this.storageKey, JSON.stringify(this.activityMap));
      this.render();
    }

    render() {
      const totalActivities = Object.values(this.activityMap).reduce((a, b) => a + b, 0);
      const activeDays = Object.keys(this.activityMap).length;

      // Calculate streak
      let currentStreak = 0;
      let checkDate = new Date();
      while (true) {
        const dStr = checkDate.toISOString().split('T')[0];
        if (this.activityMap[dStr] && this.activityMap[dStr] > 0) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          // Check if today hasn't been logged yet but yesterday was
          if (currentStreak === 0) {
            checkDate.setDate(checkDate.getDate() - 1);
            const yestStr = checkDate.toISOString().split('T')[0];
            if (this.activityMap[yestStr] && this.activityMap[yestStr] > 0) {
              currentStreak = 1;
              checkDate.setDate(checkDate.getDate() - 1);
              continue;
            }
          }
          break;
        }
      }

      this.container.innerHTML = `
        <div class="heatmap-header">
          <div class="heatmap-title-group">
            <div class="heatmap-icon-badge">
              <i class="fa-solid fa-calendar-check"></i>
            </div>
            <div>
              <h3 class="heatmap-title">Tiến độ Ôn tập & Log Ca Lâm sàng</h3>
              <div class="heatmap-subtitle">Theo dõi thói quen học tập y khoa hàng ngày</div>
            </div>
          </div>
          <div class="heatmap-stats-row">
            <div class="heatmap-stat-item">
              <span class="heatmap-stat-num">${currentStreak} ngày</span>
              <span class="heatmap-stat-label">Chuỗi học tập (Streak)</span>
            </div>
            <div class="heatmap-stat-item">
              <span class="heatmap-stat-num">${totalActivities}</span>
              <span class="heatmap-stat-label">Tổng bài & Ca học</span>
            </div>
          </div>
        </div>

        <div class="heatmap-svg-wrapper" id="heatmap-svg-container">
          ${this.buildSVGGrid()}
        </div>

        <div class="heatmap-footer">
          <span>${activeDays} ngày có hoạt động trong năm qua</span>
          <div class="heatmap-legend">
            <span>Ít</span>
            <span class="heatmap-legend-cell" style="background: var(--color-surface-offset);"></span>
            <span class="heatmap-legend-cell" style="background: rgba(var(--color-primary-rgb), 0.3);"></span>
            <span class="heatmap-legend-cell" style="background: rgba(var(--color-primary-rgb), 0.55);"></span>
            <span class="heatmap-legend-cell" style="background: rgba(var(--color-primary-rgb), 0.8);"></span>
            <span class="heatmap-legend-cell" style="background: var(--color-primary);"></span>
            <span>Nhiều</span>
          </div>
        </div>
      `;

      this.attachTooltip();
    }

    buildSVGGrid() {
      const weeks = 52;
      const cellSize = 11;
      const cellGap = 3;
      const svgWidth = weeks * (cellSize + cellGap) + 30;
      const svgHeight = 7 * (cellSize + cellGap) + 20;

      const today = new Date();
      // Start 52 weeks ago on Sunday
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - (52 * 7) + (7 - startDate.getDay()));

      let rectsSVG = '';
      let currentDate = new Date(startDate);

      for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < 7; d++) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const count = this.activityMap[dateStr] || 0;
          let level = 0;
          if (count > 0 && count <= 1) level = 1;
          else if (count > 1 && count <= 3) level = 2;
          else if (count > 3 && count <= 5) level = 3;
          else if (count > 5) level = 4;

          const x = 25 + w * (cellSize + cellGap);
          const y = 15 + d * (cellSize + cellGap);

          rectsSVG += `<rect class="heatmap-cell" data-level="${level}" data-date="${dateStr}" data-count="${count}" x="${x}" y="${y}" width="${cellSize}" height="${cellSize}"></rect>`;
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }

      return `
        <svg class="heatmap-grid-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%">
          <text x="0" y="24" fill="var(--color-text-faint)" font-size="9">T2</text>
          <text x="0" y="52" fill="var(--color-text-faint)" font-size="9">T4</text>
          <text x="0" y="80" fill="var(--color-text-faint)" font-size="9">T6</text>
          ${rectsSVG}
        </svg>
      `;
    }

    attachTooltip() {
      const container = this.container;
      let tooltip = document.createElement('div');
      tooltip.className = 'heatmap-tooltip';
      document.body.appendChild(tooltip);

      const cells = container.querySelectorAll('.heatmap-cell');
      cells.forEach(cell => {
        cell.addEventListener('mouseenter', (e) => {
          const date = cell.getAttribute('data-date');
          const count = cell.getAttribute('data-count');
          tooltip.textContent = `${count > 0 ? count + ' bài/ca' : 'Không có hoạt động'} vào ${date}`;
          tooltip.style.opacity = '1';
        });

        cell.addEventListener('mousemove', (e) => {
          tooltip.style.left = (e.pageX + 10) + 'px';
          tooltip.style.top = (e.pageY - 28) + 'px';
        });

        cell.addEventListener('mouseleave', () => {
          tooltip.style.opacity = '0';
        });
      });
    }
  }

  window.ClinicalHeatmap = ClinicalHeatmap;

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('clinical-progress-heatmap')) {
      window.clinicalHeatmapInstance = new ClinicalHeatmap('clinical-progress-heatmap');
    }
  });
})();
