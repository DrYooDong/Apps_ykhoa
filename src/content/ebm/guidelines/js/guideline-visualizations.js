/**
 * guideline-visualizations.js
 * Quản lý các linh kiện trực quan hóa dữ liệu y khoa cho Guidelines Hub
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════
  // 1. HERO BENTO DASHBOARD CARDS
  // ════════════════════════════════════════════════════════════════

  function renderBentoDashboard(studies, filterCallback) {
    const container = document.getElementById('updates-list');
    if (!container || !Array.isArray(studies)) return;

    const pcStudies = studies.filter(s => s.impact === 'practice-changing');
    const vnStudies = studies.filter(s => (s.sourceType && s.sourceType.startsWith('vn-')) || s.sourceType === 'national-guideline');
    const asianStudies = studies.filter(s => s.asianData);

    const rctCount = studies.filter(s => s.design === 'rct').length;
    const gdlCount = studies.filter(s => s.design === 'guideline').length;
    const metaCount = studies.filter(s => s.design === 'meta').length;
    const otherCount = studies.length - (rctCount + gdlCount + metaCount);

    const total = Math.max(studies.length, 1);
    const rctPct = Math.round((rctCount / total) * 100);
    const gdlPct = Math.round((gdlCount / total) * 100);
    const metaPct = Math.round((metaCount / total) * 100);
    const otherPct = Math.max(0, 100 - (rctPct + gdlPct + metaPct));

    // Top spotlight items (up to 3)
    const spotlightItems = pcStudies.slice(0, 3);

    container.innerHTML = `
      <div class="bento-dashboard-grid">
        
        <!-- CARD 1: SPOTLIGHT PRACTICE-CHANGING (2 COLUMNS) -->
        <div class="bento-card bento-card-spotlight">
          <div class="bento-card-header">
            <div class="bento-badge badge-danger">🔥 Practice-Changing Spotlight</div>
            <span class="bento-card-sublabel">${pcStudies.length} hướng dẫn / nghiên cứu có đột phá lâm sàng</span>
          </div>
          <div class="bento-spotlight-list">
            ${spotlightItems.map(item => `
              <div class="bento-spotlight-item" data-id="${item.id}">
                <div class="spotlight-title-row">
                  <span class="spotlight-title">${escapeHtml(item.title)}</span>
                  <span class="spotlight-year">${item.year || ''}</span>
                </div>
                <div class="spotlight-meta">
                  <span class="spotlight-tag" style="background: var(--surface-2); color: var(--text-muted); border: 1px solid var(--border-light);">
                    💊 ${escapeHtml(item.drug || item.organization || 'Khuyến cáo')}
                  </span>
                  ${item.file ? `<a href="${item.file}" class="btn-spotlight-summary" target="_blank" title="Đọc bài tóm tắt chi tiết">📝 Đọc Tóm Tắt ➔</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CARD 2: KHUYẾN CÁO BỘ Y TẾ VIỆT NAM -->
        <div class="bento-card bento-card-vn" onclick="window.filterBySourceType && window.filterBySourceType('vn-moh')">
          <div class="bento-card-header">
            <div class="bento-badge badge-warning">🇻🇳 Bộ Y Tế & VN</div>
            <div class="bento-stat-num" style="color: #dc2626;">${vnStudies.length}</div>
          </div>
          <div class="bento-card-body">
            <p class="bento-card-text">Hướng dẫn chẩn đoán & điều trị chuẩn hóa cấp quốc gia và các Hội chuyên khoa Việt Nam.</p>
            <div class="bento-card-footer-link">Xem tất cả tài liệu VN ➔</div>
          </div>
        </div>

        <!-- CARD 3: DỮ LIỆU BỆNH NHÂN CHÂU Á -->
        <div class="bento-card bento-card-asia" onclick="window.filterByAsianData && window.filterByAsianData()">
          <div class="bento-card-header">
            <div class="bento-badge badge-success">🌏 Dữ Liệu Châu Á</div>
            <div class="bento-stat-num" style="color: #0d9488;">${asianStudies.length}</div>
          </div>
          <div class="bento-card-body">
            <p class="bento-card-text">Các thử nghiệm lâm sàng có phân tích subgroup trên quần thể bệnh nhân Châu Á.</p>
            <div class="bento-card-footer-link">Lọc nghiên cứu Châu Á ➔</div>
          </div>
        </div>

        <!-- CARD 4: GAUGE PHÂN PHỐI THỬ NGHIỆM -->
        <div class="bento-card bento-card-gauge">
          <div class="bento-card-header">
            <div class="bento-badge badge-info">📊 Cơ Cấu Chứng Cứ</div>
            <span class="bento-card-sublabel">Tỷ lệ thiết kế nghiên cứu</span>
          </div>
          <div class="bento-gauge-body">
            <div class="bento-progress-bar-stacked">
              <div class="bar-segment bar-rct" style="width: ${rctPct}%;" title="RCT: ${rctCount} (${rctPct}%)"></div>
              <div class="bar-segment bar-gdl" style="width: ${gdlPct}%;" title="Guidelines: ${gdlCount} (${gdlPct}%)"></div>
              <div class="bar-segment bar-meta" style="width: ${metaPct}%;" title="Meta-Analysis: ${metaCount} (${metaPct}%)"></div>
              <div class="bar-segment bar-other" style="width: ${otherPct}%;" title="Khác: ${otherCount} (${otherPct}%)"></div>
            </div>
            <div class="bento-gauge-legend">
              <span class="legend-chip"><i class="dot dot-rct"></i> RCT (${rctCount})</span>
              <span class="legend-chip"><i class="dot dot-gdl"></i> Guideline (${gdlCount})</span>
              <span class="legend-chip"><i class="dot dot-meta"></i> Meta (${metaCount})</span>
            </div>
          </div>
        </div>

      </div>
    `;

    // Attach click events on spotlight items
    container.querySelectorAll('.bento-spotlight-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') return; // let summary link open normally
        const studyId = el.getAttribute('data-id');
        if (studyId && typeof filterCallback === 'function') {
          filterCallback(studyId);
        }
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // 2. EVIDENCE MAP BUBBLE CHART (SVG THUẦN)
  // ════════════════════════════════════════════════════════════════

  const IMPACT_COLORS = {
    'practice-changing': { fill: '#ef4444', stroke: '#b91c1c', label: 'Practice-Changing' },
    'informative':         { fill: '#3b82f6', stroke: '#1d4ed8', label: 'Informative' },
    'early-signal':        { fill: '#f59e0b', stroke: '#b45309', label: 'Early Signal' },
    'negative':            { fill: '#64748b', stroke: '#334155', label: 'Negative' },
    'regulatory':          { fill: '#8b5cf6', stroke: '#6d28d9', label: 'Regulatory' },
    'default':             { fill: '#0d9488', stroke: '#0f766e', label: 'Khác' }
  };

  function renderEvidenceBubbleChart(studies, containerId, selectStudyCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!studies || studies.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📡</div><p>Không có dữ liệu để vẽ Evidence Map.</p></div>`;
      return;
    }

    // Determine dimensions & bounds
    const width = 900;
    const height = 450;
    const margin = { top: 40, right: 40, bottom: 50, left: 140 };

    // Get list of active specialties
    const specKeys = Object.keys(window.SPECIALTIES || {
      cardio: 'Tim mạch', pulmo: 'Hô hấp', endo: 'Nội tiết', neuro: 'Thần kinh',
      gi: 'Tiêu hóa', infect: 'Truyền nhiễm', renal: 'Thận học', rheum: 'Cơ xương khớp',
      hema: 'Huyết học', onco: 'Ung thư', pedia: 'Nhi khoa', icu: 'ICU',
      derma: 'Da liễu', ent: 'Tai Mũi Họng'
    });

    // Filter studies that have valid year
    const validStudies = studies.filter(s => s.year && s.year >= 2010 && s.year <= 2030);

    const years = validStudies.map(s => s.year);
    const minYear = Math.min(...years, 2018);
    const maxYear = Math.max(...years, 2026);
    const yearSpan = Math.max(maxYear - minYear, 1);

    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    // Y mapping for specialties
    const activeSpecs = specKeys.filter(key => validStudies.some(s => s.specialty === key));
    if (activeSpecs.length === 0) activeSpecs.push(...specKeys.slice(0, 6));

    const specYStep = chartH / Math.max(activeSpecs.length, 1);

    function getX(year) {
      return margin.left + ((year - minYear) / yearSpan) * chartW;
    }

    function getY(specialty) {
      const idx = activeSpecs.indexOf(specialty);
      if (idx === -1) return margin.top + chartH / 2;
      return margin.top + idx * specYStep + specYStep / 2;
    }

    function getRadius(sampleSize) {
      if (!sampleSize || isNaN(sampleSize)) return 11;
      const r = Math.sqrt(sampleSize) * 0.22;
      return Math.min(Math.max(r, 9), 26);
    }

    // Build SVG Grid lines & Axes
    let yearTicksSvg = '';
    for (let y = minYear; y <= maxYear; y++) {
      const x = getX(y);
      yearTicksSvg += `
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${height - margin.bottom}" stroke="var(--border-light)" stroke-dasharray="3,3" />
        <text x="${x}" y="${height - margin.bottom + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-muted)">${y}</text>
      `;
    }

    let specLabelsSvg = '';
    activeSpecs.forEach((specKey, idx) => {
      const y = margin.top + idx * specYStep + specYStep / 2;
      const specObj = window.SPECIALTIES ? window.SPECIALTIES[specKey] : null;
      const name = specObj ? specObj.name : specKey;

      specLabelsSvg += `
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="var(--border-light)" opacity="0.5" />
        <text x="${margin.left - 12}" y="${y + 4}" text-anchor="end" font-size="11" font-weight="700" fill="var(--text)">${escapeHtml(name)}</text>
      `;
    });

    // Build Nodes (Bubbles)
    let bubblesSvg = '';
    validStudies.forEach((study, idx) => {
      const cx = getX(study.year) + (Math.sin(idx) * 8); // subtle jitter to avoid overlap
      const cy = getY(study.specialty) + (Math.cos(idx) * 6);
      const r = getRadius(study.sampleSize);
      const styleInfo = IMPACT_COLORS[study.impact] || IMPACT_COLORS['default'];

      bubblesSvg += `
        <g class="bubble-group" data-id="${study.id}" style="cursor: pointer;">
          <circle 
            cx="${cx}" 
            cy="${cy}" 
            r="${r}" 
            fill="${styleInfo.fill}" 
            fill-opacity="0.8"
            stroke="${styleInfo.stroke}" 
            stroke-width="2" 
            class="bubble-node"
          >
            <animate attributeName="r" values="${r};${r+2};${r}" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff" pointer-events="none">
            ${study.year ? String(study.year).slice(2) : ''}
          </text>
        </g>
      `;
    });

    container.innerHTML = `
      <div class="evidence-map-wrapper">
        <div class="evidence-map-header">
          <div>
            <h3 class="evidence-map-title">📡 Evidence Map — Bản Đồ Chứng Cứ Lâm Sàng</h3>
            <p class="evidence-map-subtitle">Phân bố nghiên cứu theo Chuyên Khoa × Năm công bố × Cỡ mẫu (Đường kính bong bóng)</p>
          </div>
          <div class="evidence-map-legend">
            ${Object.entries(IMPACT_COLORS).filter(([k]) => k !== 'default').map(([k, v]) => `
              <span class="legend-item-chip">
                <span class="chip-dot" style="background:${v.fill}; border:1px solid ${v.stroke};"></span>
                ${v.label}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="svg-container-responsive">
          <svg viewBox="0 0 ${width} ${height}" class="bubble-chart-svg" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="${width}" height="${height}" fill="var(--surface)" rx="12" />
            
            <!-- Axes Grid -->
            <g class="grid-lines">${yearTicksSvg}${specLabelsSvg}</g>

            <!-- Bubbles Layer -->
            <g class="bubbles-layer">${bubblesSvg}</g>
          </svg>

          <!-- Floating Tooltip Container -->
          <div id="bubble-chart-tooltip" class="bubble-tooltip" style="display:none;"></div>
        </div>
      </div>
    `;

    // Tooltip & Selection Event Listeners
    const svgEl = container.querySelector('.bubble-chart-svg');
    const tooltip = container.querySelector('#bubble-chart-tooltip');

    container.querySelectorAll('.bubble-group').forEach(group => {
      const studyId = group.getAttribute('data-id');
      const study = validStudies.find(s => s.id === studyId);

      group.addEventListener('mouseenter', (e) => {
        if (!study || !tooltip) return;
        const impactObj = IMPACT_COLORS[study.impact] || IMPACT_COLORS['default'];
        const specName = window.SPECIALTIES && window.SPECIALTIES[study.specialty] ? window.SPECIALTIES[study.specialty].name : study.specialty;

        tooltip.innerHTML = `
          <div class="tooltip-header" style="border-left: 4px solid ${impactObj.fill}">
            <div class="tooltip-title">${escapeHtml(study.title)}</div>
            <div class="tooltip-sub">${escapeHtml(specName)} • ${study.year} • ${study.organization || ''}</div>
          </div>
          <div class="tooltip-body">
            <div><strong>💊 Hoạt chất / Can thiệp:</strong> ${escapeHtml(study.drug || study.intervention || 'Chưa ghi nhận')}</div>
            <div><strong>👥 Cỡ mẫu (N):</strong> ${study.sampleSize ? study.sampleSize.toLocaleString() + ' bệnh nhân' : 'Chưa cập nhật'}</div>
            <div><strong>⚡ Ảnh hưởng:</strong> <span style="color:${impactObj.fill}; font-weight:700;">${impactObj.label}</span></div>
            ${study.summary ? `<div class="tooltip-summary">${escapeHtml(study.summary.slice(0, 120))}...</div>` : ''}
          </div>
          <div class="tooltip-footer">👉 Click để xem chi tiết / lọc tài liệu này</div>
        `;

        tooltip.style.display = 'block';
      });

      group.addEventListener('mousemove', (e) => {
        if (!tooltip) return;
        const rect = container.getBoundingClientRect();
        const left = e.clientX - rect.left + 15;
        const top = e.clientY - rect.top - 10;
        tooltip.style.left = `${Math.min(left, rect.width - 280)}px`;
        tooltip.style.top = `${Math.max(top, 10)}px`;
      });

      group.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.style.display = 'none';
      });

      group.addEventListener('click', () => {
        if (typeof selectStudyCallback === 'function') {
          selectStudyCallback(studyId);
        }
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // 3. INTERACTIVE HEATMAP MATRIX (CHUYÊN KHOA × NĂM)
  // ════════════════════════════════════════════════════════════════

  function renderHeatmapMatrix(studies, containerId, cellClickCallback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!studies || studies.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📊</div><p>Chưa có dữ liệu để lập Heatmap.</p></div>`;
      return;
    }

    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const specKeys = Object.keys(window.SPECIALTIES || {});

    // Compute matrix values
    const matrix = {};
    let maxCount = 1;

    specKeys.forEach(s => {
      matrix[s] = {};
      years.forEach(y => {
        const count = studies.filter(item => item.specialty === s && item.year === y).length;
        matrix[s][y] = count;
        if (count > maxCount) maxCount = count;
      });
    });

    let tableRows = '';
    specKeys.forEach(specKey => {
      const specObj = window.SPECIALTIES[specKey];
      const hasAnyData = years.some(y => matrix[specKey][y] > 0);
      if (!hasAnyData) return; // Skip empty specialties

      let cells = `
        <td class="heatmap-spec-label">
          <span class="spec-dot" style="background:${specObj.color};"></span>
          ${escapeHtml(specObj.name)}
        </td>
      `;

      years.forEach(year => {
        const count = matrix[specKey][year];
        const lightness = count > 0 ? Math.max(25, 95 - (count / maxCount) * 65) : 98;
        const textColor = lightness < 60 ? '#ffffff' : 'var(--text)';
        const bgStyle = count > 0 
          ? `background: hsl(217, 88%, ${lightness}%); color: ${textColor}; font-weight: 700;` 
          : `background: var(--surface-2); color: var(--text-faint); opacity: 0.5;`;

        cells += `
          <td 
            class="heatmap-cell ${count > 0 ? 'has-data' : ''}" 
            style="${bgStyle}" 
            data-specialty="${specKey}" 
            data-year="${year}"
            title="${specObj.name} (${year}): ${count} tài liệu"
          >
            ${count > 0 ? count : '-'}
          </td>
        `;
      });

      tableRows += `<tr>${cells}</tr>`;
    });

    container.innerHTML = `
      <div class="heatmap-matrix-wrapper">
        <div class="heatmap-matrix-header">
          <h3>📊 Ma Trận Mật Độ Hướng Dẫn Lâm Sàng (Chuyên Khoa × Năm)</h3>
          <p>Nhấp vào từng ô để lọc các bài thuộc Chuyên khoa và Năm tương ứng</p>
        </div>
        <div class="heatmap-table-scroll">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th class="heatmap-th-spec">Chuyên Khoa</th>
                ${years.map(y => `<th class="heatmap-th-year">${y}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind click events on heatmap cells
    container.querySelectorAll('.heatmap-cell.has-data').forEach(cell => {
      cell.addEventListener('click', () => {
        const specialty = cell.getAttribute('data-specialty');
        const year = parseInt(cell.getAttribute('data-year'), 10);
        if (typeof cellClickCallback === 'function') {
          cellClickCallback(specialty, year);
        }
      });
    });
  }

  // Helper utility function for string escaping
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Export to global scope for guidelines.js to call
  window.GuidelineVisualizations = {
    renderBentoDashboard,
    renderEvidenceBubbleChart,
    renderHeatmapMatrix
  };

})();
