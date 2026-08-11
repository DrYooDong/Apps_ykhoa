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

  function renderBentoDashboard(studies, containerId = 'analytics-bento-container') {
    const container = document.getElementById(containerId) || document.getElementById('analytics-bento-container') || document.getElementById('updates-list');
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

    // ─── JOURNAL QUALITY CALCULATIONS (PHASE 4) ───
    let q1 = 0, q2 = 0, q3 = 0, q4 = 0, qMoh = 0, qNa = 0;
    const bubbleData = [];

    studies.forEach(s => {
      let metrics = {
        if: parseFloat(s.impactFactor || s.if || 0),
        sjr: parseFloat(s.sjr || 0),
        quartile: s.quartile || (s.sourceType === 'vn-moh' ? 'MOH' : 'N/A')
      };
      
      if (window.getJournalQualityProfile && s.journal) {
         const profile = window.getJournalQualityProfile(s.journal, s);
         if (profile && profile.metrics) {
            metrics.if = parseFloat(profile.metrics.if || profile.metrics.impactFactor || 0);
            metrics.sjr = parseFloat(profile.metrics.sjr || 0);
            metrics.quartile = profile.metrics.quartile || 'N/A';
         }
      }

      if (metrics.quartile === 'Q1') q1++;
      else if (metrics.quartile === 'Q2') q2++;
      else if (metrics.quartile === 'Q3') q3++;
      else if (metrics.quartile === 'Q4') q4++;
      else if (metrics.quartile === 'MOH') qMoh++;
      else qNa++;

      if (metrics.if > 0 || metrics.sjr > 0) {
        bubbleData.push({
          title: s.title,
          journal: s.journal || 'Tạp chí',
          if: metrics.if,
          sjr: metrics.sjr,
          q: metrics.quartile,
          sample: parseInt(s.sampleSize) || 100
        });
      }
    });

    const totalQ = q1 + q2 + q3 + q4 + qMoh;
    const q1Pct = totalQ > 0 ? Math.round((q1/totalQ)*100) : 0;
    const q2Pct = totalQ > 0 ? Math.round((q2/totalQ)*100) : 0;
    const q3Pct = totalQ > 0 ? Math.round((q3/totalQ)*100) : 0;
    const q4Pct = totalQ > 0 ? Math.round((q4/totalQ)*100) : 0;
    const mohPct = totalQ > 0 ? Math.max(0, 100 - (q1Pct + q2Pct + q3Pct + q4Pct)) : 0;

    // Generate Bubble SVG for IF vs SJR
    let bubbleSvg = '<div class="empty-state" style="padding:1rem;"><p>Chưa đủ dữ liệu IF/SJR</p></div>';
    if (bubbleData.length > 0) {
      const maxIf = Math.max(10, ...bubbleData.map(d => d.if)) * 1.1;
      const maxSjr = Math.max(3, ...bubbleData.map(d => d.sjr)) * 1.1;
      const svgW = 300, svgH = 150;
      
      const bubbles = bubbleData.map(d => {
        const cx = (d.if / maxIf) * (svgW - 20) + 10;
        const cy = svgH - ((d.sjr / maxSjr) * (svgH - 20) + 10);
        const r = Math.max(3, Math.min(12, Math.sqrt(d.sample) * 0.15));
        let fill = '#94a3b8';
        if (d.q === 'Q1') fill = '#16a34a';
        else if (d.q === 'Q2') fill = '#2563eb';
        else if (d.q === 'Q3') fill = '#ca8a04';
        else if (d.q === 'Q4') fill = '#475569';
        else if (d.q === 'MOH') fill = '#dc2626';
        
        return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="0.8" stroke="#ffffff" stroke-width="0.5"><title>${escapeHtml(d.journal)} | IF: ${d.if} | SJR: ${d.sjr}</title></circle>`;
      }).join('');
      
      bubbleSvg = `
        <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" height="150" class="jq-bubble-svg" style="background:var(--surface-2); border-radius:8px;">
          <!-- Axes -->
          <line x1="10" y1="${svgH - 10}" x2="${svgW}" y2="${svgH - 10}" stroke="var(--border-light)"/>
          <line x1="10" y1="0" x2="10" y2="${svgH - 10}" stroke="var(--border-light)"/>
          <text x="${svgW - 20}" y="${svgH - 2}" font-size="8" fill="var(--text-muted)">IF</text>
          <text x="12" y="10" font-size="8" fill="var(--text-muted)">SJR</text>
          ${bubbles}
        </svg>
      `;
    }

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

        <!-- CARD 5: JOURNAL QUALITY HUB & TRUST ANALYZER -->
        <div class="bento-card" style="background: linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--accent) 5%, var(--surface)) 100%); border-color: color-mix(in srgb, var(--accent) 30%, var(--border-light)); cursor: pointer;" onclick="window.location.href='journal-quality-analyzer.html'">
          <div class="bento-card-header">
            <div class="bento-badge badge-primary">🏆 Journal Quality Hub</div>
            <span class="bento-card-sublabel">OpenAlex & Trust Score</span>
          </div>
          <div class="bento-card-body">
            <p class="bento-card-text">Tra cứu Impact Factor, SJR, Quartile Q1-Q4 và Kiểm tra Tạp chí Biến tướng (Predatory Warning).</p>
            <div class="bento-card-footer-link" style="color: var(--accent); font-weight: 800; margin-top: 0.5rem;">Mở Công cụ Phân tích Tạp chí ➔</div>
          </div>
        </div>

        <!-- CARD 6: STACKED BAR QUARTILE DISTRIBUTION -->
        <div class="bento-card bento-card-quartile">
          <div class="bento-card-header">
            <div class="bento-badge badge-info">📈 Chất lượng (Quartile)</div>
            <span class="bento-card-sublabel">Tạp chí Q1-Q4 & MOH</span>
          </div>
          <div class="bento-gauge-body">
            <div class="bento-progress-bar-stacked" style="height: 12px; margin-bottom: 0.5rem; border-radius: 6px; overflow: hidden; display: flex; background: var(--surface-2);">
              <div class="bar-segment jq-q1" style="width: ${q1Pct}%; background: #16a34a;" title="Q1: ${q1} (${q1Pct}%)"></div>
              <div class="bar-segment jq-q2" style="width: ${q2Pct}%; background: #2563eb;" title="Q2: ${q2} (${q2Pct}%)"></div>
              <div class="bar-segment jq-q3" style="width: ${q3Pct}%; background: #ca8a04;" title="Q3: ${q3} (${q3Pct}%)"></div>
              <div class="bar-segment jq-q4" style="width: ${q4Pct}%; background: #475569;" title="Q4: ${q4} (${q4Pct}%)"></div>
              <div class="bar-segment jq-moh" style="width: ${mohPct}%; background: #dc2626;" title="MOH: ${qMoh} (${mohPct}%)"></div>
            </div>
            <div class="bento-gauge-legend" style="display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.75rem;">
              <span class="legend-chip"><i class="dot" style="background:#16a34a;"></i> Q1 (${q1})</span>
              <span class="legend-chip"><i class="dot" style="background:#2563eb;"></i> Q2 (${q2})</span>
              <span class="legend-chip"><i class="dot" style="background:#ca8a04;"></i> Q3 (${q3})</span>
              <span class="legend-chip"><i class="dot" style="background:#475569;"></i> Q4 (${q4})</span>
              <span class="legend-chip"><i class="dot" style="background:#dc2626;"></i> MOH (${qMoh})</span>
            </div>
          </div>
        </div>

        <!-- CARD 7: BUBBLE CHART IF vs SJR -->
        <div class="bento-card bento-card-bubble">
          <div class="bento-card-header" style="margin-bottom: 0.5rem;">
            <div class="bento-badge" style="background: var(--surface-2); color: var(--text);">🟣 IF vs SJR Scatter</div>
            <span class="bento-card-sublabel">X=IF, Y=SJR, Size=N</span>
          </div>
          <div class="bento-card-body" style="padding:0;">
            ${bubbleSvg}
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

  // ════════════════════════════════════════════════════════════════
  // 4. MAIN ANALYTICS & TIMELINE RENDERERS
  // ════════════════════════════════════════════════════════════════

  function renderAnalytics() {
    const container = document.getElementById('panel-analytics');
    if (!container) return;

    const studies = window.studies || window.SAMPLE_STUDIES || [];

    if (!studies || studies.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📊</div>
          <p>Chưa có dữ liệu để lập biểu đồ phân tích & thống kê.</p>
        </div>
      `;
      return;
    }

    const gapMapHtml = typeof window.renderEvidenceGapMap === 'function' ? window.renderEvidenceGapMap(studies) : '';

    container.innerHTML = `
      <div class="analytics-dashboard-wrapper" style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- SECTION 1: BENTO OVERVIEW GRID -->
        <div id="analytics-bento-container"></div>

        <!-- SECTION 2: BẢN ĐỒ KHOẢNG TRỐNG BẰNG CHỨNG (GAP MAP TREEMAP) -->
        <div id="analytics-gapmap-container">${gapMapHtml}</div>

        <!-- SECTION 3: EVIDENCE BUBBLE CHART (SVG) -->
        <div id="analytics-bubble-container"></div>

        <!-- SECTION 4: HEATMAP MATRIX (CHUYÊN KHOA × NĂM) -->
        <div id="analytics-heatmap-container"></div>
      </div>
    `;

    // Render Bento Dashboard
    renderBentoDashboard(studies);

    // Render Evidence Bubble Chart SVG
    renderEvidenceBubbleChart(studies, 'analytics-bubble-container', (studyId) => {
      if (typeof window.filterByStudyId === 'function') {
        window.filterByStudyId(studyId);
      }
    });

    // Render Heatmap Matrix
    renderHeatmapMatrix(studies, 'analytics-heatmap-container', (specialty, year) => {
      if (window.filters) {
        window.filters.specialty = specialty;
        window.filters.period = String(year);
      }
      if (typeof window.switchTab === 'function') window.switchTab('list');
      if (typeof window.renderFilterPills === 'function') window.renderFilterPills();
      if (typeof window.renderTable === 'function') window.renderTable();
    });
  }

  function renderTimeline() {
    const container = document.getElementById('panel-timeline');
    if (!container) return;

    const studies = window.studies || window.SAMPLE_STUDIES || [];
    if (!studies || studies.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📅</div>
          <p>Chưa có dữ liệu để lập Timeline Hướng dẫn.</p>
        </div>
      `;
      return;
    }

    // Group studies by year (descending)
    const grouped = {};
    studies.forEach(s => {
      const yr = s.year || 2026;
      if (!grouped[yr]) grouped[yr] = [];
      grouped[yr].push(s);
    });

    const sortedYears = Object.keys(grouped).map(Number).sort((a, b) => b - a);

    let html = `
      <div class="tl-wrapper">
        <div class="tl-top-bar">
          <div class="tl-page-title">📅 Timeline Hướng Dẫn & Thử Nghiệm Lâm Sàng</div>
          <div class="tl-page-subtitle">Dòng thời gian công bố các hướng dẫn điều trị và thử nghiệm lâm sàng (${studies.length} tài liệu)</div>
        </div>

        <div class="tl-body">
    `;

    sortedYears.forEach(year => {
      const items = grouped[year];
      html += `
        <div class="tl-year-group">
          <div class="tl-year-pin">
            <span class="tl-year-badge">${year}</span>
            <div class="tl-year-line"></div>
          </div>
          <div class="tl-items">
      `;

      items.forEach(study => {
        const specObj = window.SPECIALTIES && window.SPECIALTIES[study.specialty] ? window.SPECIALTIES[study.specialty] : { name: study.specialty || 'Chuyên khoa', color: '#7c3aed' };
        const impactObj = window.IMPACTS && window.IMPACTS[study.impact] ? window.IMPACTS[study.impact] : { name: study.impact || 'Thông tin', color: '#2563eb' };

        html += `
          <div class="tl-item" style="--tl-color: ${specObj.color};" onclick="window.filterByStudyId && window.filterByStudyId('${study.id}')">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
              <span class="spec-tag" style="background: ${specObj.color}15; color: ${specObj.color}; border: 1px solid ${specObj.color}30;">${escapeHtml(specObj.name)}</span>
              <span class="impact-tag" style="background: ${impactObj.color}15; color: ${impactObj.color};">${escapeHtml(impactObj.name)}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.88rem; color: var(--text); line-height: 1.35;">${escapeHtml(study.title)}</div>
            ${study.drug ? `<div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 4px;">💊 ${escapeHtml(study.drug)}</div>` : ''}
            ${study.summary ? `<div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 6px; line-height: 1.4;">${escapeHtml(study.summary.slice(0, 150))}...</div>` : ''}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // Export to global scope for guidelines.js to call
  window.GuidelineVisualizations = {
    renderBentoDashboard,
    renderEvidenceBubbleChart,
    renderHeatmapMatrix
  };

  window.renderAnalytics = renderAnalytics;
  window.renderTimeline = renderTimeline;

})();

