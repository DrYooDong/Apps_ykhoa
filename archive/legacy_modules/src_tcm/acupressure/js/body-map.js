/**
 * BodyMapApp — Engine điều khiển Bản đồ Huyệt vị Tương tác
 * Vanilla JS ES6+, No dependencies
 */
(function () {
  'use strict';

  // ── State ─────────────────────────────────────────
  const state = {
    currentView: 'front',         // 'front' | 'back'
    currentRegion: 'all',
    activeLayers: new Set(['anatomy', 'meridians', 'acupoints']),
    selectedAcupoint: null,
    highlightedMeridian: null,
    searchQuery: '',
    defaultViewBox: '0 0 500 1000'
  };

  // ViewBox presets for region zoom
  const REGION_VIEWBOXES = {
    'all':            '0 0 500 1000',
    'head-neck':      '170 -10 160 180',
    'chest-abdomen':  '130 145 240 330',
    'back':           '130 145 240 330',
    'upper-limb':     '60 170 200 320',
    'lower-limb':     '160 430 180 460'
  };

  // ── DOM refs ──────────────────────────────────────
  let svg, layerAnatomy, layerMeridians, layerAcupoints, layerDanger;
  let tooltip, detailPanel, detailScroll, canvasWrapper;

  // ── Init ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    svg = document.getElementById('bodymapSVG');
    layerAnatomy = document.getElementById('layer-anatomy');
    layerMeridians = document.getElementById('layer-meridians');
    layerAcupoints = document.getElementById('layer-acupoints');
    layerDanger = document.getElementById('layer-danger');
    tooltip = document.getElementById('bodymapTooltip');
    detailPanel = document.getElementById('bodymapDetail');
    detailScroll = document.getElementById('detailScroll');
    canvasWrapper = document.getElementById('canvasWrapper');

    renderMeridians();
    renderAcupoints();
    renderDangerZones();
    bindEvents();
  }

  // ═══════════════════════════════════════════════════
  //  CALIBRATION (For Real Images)
  // ═══════════════════════════════════════════════════
  // Tinh chỉnh tọa độ lưới vector cũ khớp với tỷ lệ hình giải phẫu thật
  function calibratePoint(pt) {
    let dx = 0, dy = 0;
    
    // Support both [x, y] (array) and {x, y} (object) formats
    const isArray = Array.isArray(pt);
    const px = isArray ? pt[0] : pt.x;
    const py = isArray ? pt[1] : pt.y;

    // Head & Neck
    if (py < 140) { 
      dy = 25; 
      if (py > 100) dy = 15; // smooth transition at neck
    }
    // Arms
    else if (py >= 140 && py < 500) {
      if (px < 180) dx = -15 - (py-140)*0.05; // Right arm (screen left): angles outward
      if (px > 320) dx = 15 + (py-140)*0.05;  // Left arm (screen right): angles outward
    }
    // Legs
    else if (py >= 500) {
      if (px < 240) dx = 15; // Right leg (screen left): narrower
      if (px > 260) dx = -15; // Left leg (screen right): narrower
    }
    
    // Chest / Abdomen (Midline mostly)
    else if (px >= 180 && px <= 320 && py >= 140 && py < 500) {
       dy = 5; // slight shift down
    }

    const rx = px + dx;
    const ry = py + dy;

    return isArray ? [rx, ry] : { x: rx, y: ry };
  }

  // ═══════════════════════════════════════════════════
  //  RENDERING
  // ═══════════════════════════════════════════════════

  function renderMeridians() {
    layerMeridians.innerHTML = '';
    const view = state.currentView;

    MERIDIANS.forEach(m => {
      let waypoints = view === 'front' ? m.front_waypoints : m.back_waypoints;
      if (!waypoints || waypoints.length < 2) return;

      // Apply calibration to waypoints
      waypoints = waypoints.map(pt => calibratePoint(pt));

      // Left/Original path
      const pathStr = waypointsToSmoothPath(waypoints);
      const path = createSVGElement('path', {
        d: pathStr,
        class: 'meridian-path',
        stroke: m.color,
        'data-meridian': m.id
      });
      path.style.color = m.color;
      layerMeridians.appendChild(path);

      // Mirrored path (right side) for bilateral meridians
      if (m.id !== 'CV' && m.id !== 'GV') {
        const mirroredWP = getMirroredMeridianWaypoints(waypoints);
        // We calibrate before mirroring, but the original logic mirrored the raw points?
        // Let's mirror the calibrated points to ensure symmetry
        const mirPath = createSVGElement('path', {
          d: waypointsToSmoothPath(mirroredWP),
          class: 'meridian-path',
          stroke: m.color,
          'data-meridian': m.id
        });
        mirPath.style.color = m.color;
        layerMeridians.appendChild(mirPath);
      }
    });
  }

  function renderAcupoints() {
    layerAcupoints.innerHTML = '';
    const view = state.currentView;
    const allPoints = [...ACUPOINTS, ...getMirroredAcupoints()];

    allPoints.forEach(pt => {
      const rawCoords = view === 'front' ? pt.coordinates.front : pt.coordinates.back;
      if (!rawCoords) return;
      const coords = calibratePoint(rawCoords);

      const g = createSVGElement('g', {
        class: 'acupoint-group',
        'data-id': pt.id,
        'data-meridian': pt.meridian_id,
        'data-region': pt.region
      });

      const circle = createSVGElement('circle', {
        cx: coords.x,
        cy: coords.y,
        r: 5,
        class: `acupoint-dot danger-${pt.danger_level}`,
        'data-id': pt.id
      });

      // Label
      const label = createSVGElement('text', {
        x: coords.x + 8,
        y: coords.y - 6,
        class: 'acupoint-label'
      });
      label.textContent = pt.id;

      g.appendChild(circle);
      g.appendChild(label);
      layerAcupoints.appendChild(g);
    });
  }

  function renderDangerZones() {
    layerDanger.innerHTML = '';
    const view = state.currentView;

    DANGER_ZONES.filter(dz => dz.view === view).forEach(dz => {
      let el;
      if (dz.shape === 'ellipse') {
        el = createSVGElement('ellipse', {
          cx: dz.cx, cy: dz.cy, rx: dz.rx, ry: dz.ry,
          class: `danger-zone risk-${dz.risk_level}`
        });
      } else if (dz.shape === 'rect') {
        el = createSVGElement('rect', {
          x: dz.x, y: dz.y, width: dz.width, height: dz.height, rx: 4,
          class: `danger-zone risk-${dz.risk_level}`
        });
      }
      if (el) {
        el.setAttribute('data-name', dz.name);
        layerDanger.appendChild(el);
      }
    });
  }

  // ═══════════════════════════════════════════════════
  //  EVENT BINDING
  // ═══════════════════════════════════════════════════

  function bindEvents() {
    // Layer toggles
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.dataset.layer;
        btn.classList.toggle('active');
        if (state.activeLayers.has(layer)) {
          state.activeLayers.delete(layer);
        } else {
          state.activeLayers.add(layer);
        }
        updateLayerVisibility();
      });
    });

    // Region selector
    document.querySelectorAll('.region-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentRegion = btn.dataset.region;

        // Switch to back view if "back" region selected
        if (btn.dataset.region === 'back' && state.currentView !== 'back') {
          switchView('back');
        } else if (btn.dataset.region !== 'back' && btn.dataset.region !== 'all' && state.currentView === 'back') {
          switchView('front');
        }

        zoomToRegion(state.currentRegion);
      });
    });

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView(btn.dataset.view);
      });
    });

    // Search
    const searchInput = document.getElementById('acupointSearch');
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      applySearch();
    });

    // Meridian hover
    layerMeridians.addEventListener('mouseover', (e) => {
      const path = e.target.closest('.meridian-path');
      if (path) highlightMeridian(path.dataset.meridian);
    });
    layerMeridians.addEventListener('mouseout', () => {
      unhighlightMeridian();
    });

    // Acupoint interactions
    layerAcupoints.addEventListener('mouseover', (e) => {
      const dot = e.target.closest('.acupoint-dot');
      if (dot) showTooltip(dot);
    });
    layerAcupoints.addEventListener('mouseout', () => {
      hideTooltip();
    });
    layerAcupoints.addEventListener('click', (e) => {
      const group = e.target.closest('.acupoint-group');
      if (group) selectAcupoint(group.dataset.id);
    });

    // Close detail panel
    detailPanel.addEventListener('click', (e) => {
      if (e.target.closest('.detail-close-btn')) {
        closeDetail();
      }
    });

    // Click on canvas background to deselect
    canvasWrapper.addEventListener('click', (e) => {
      if (e.target === canvasWrapper || e.target === svg) {
        closeDetail();
      }
    });
  }

  // ═══════════════════════════════════════════════════
  //  LAYER VISIBILITY
  // ═══════════════════════════════════════════════════

  function updateLayerVisibility() {
    const layers = {
      'anatomy': layerAnatomy,
      'meridians': layerMeridians,
      'acupoints': layerAcupoints,
      'danger': layerDanger
    };
    Object.keys(layers).forEach(key => {
      if (state.activeLayers.has(key)) {
        layers[key].classList.remove('hidden');
      } else {
        layers[key].classList.add('hidden');
      }
    });
  }

  // ═══════════════════════════════════════════════════
  //  VIEW SWITCHING (Front / Back)
  // ═══════════════════════════════════════════════════

  function switchView(view) {
    state.currentView = view;
    document.querySelectorAll('.view-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });
    
    // Toggle images
    const imgFront = document.getElementById('anatomy-img-front');
    const imgBack = document.getElementById('anatomy-img-back');
    if (imgFront && imgBack) {
      if (view === 'front') {
        imgFront.style.display = 'block';
        imgBack.style.display = 'none';
        setTimeout(() => { imgFront.style.opacity = '1'; imgBack.style.opacity = '0'; }, 10);
      } else {
        imgFront.style.display = 'none';
        imgBack.style.display = 'block';
        setTimeout(() => { imgFront.style.opacity = '0'; imgBack.style.opacity = '1'; }, 10);
      }
    }

    renderMeridians();
    renderAcupoints();
    renderDangerZones();
    updateLayerVisibility();
    if (state.searchQuery) applySearch();
  }

  // ═══════════════════════════════════════════════════
  //  REGION ZOOM
  // ═══════════════════════════════════════════════════

  function zoomToRegion(region) {
    const vb = REGION_VIEWBOXES[region] || state.defaultViewBox;
    svg.setAttribute('viewBox', vb);
  }

  // ═══════════════════════════════════════════════════
  //  MERIDIAN HIGHLIGHT
  // ═══════════════════════════════════════════════════

  function highlightMeridian(meridianId) {
    state.highlightedMeridian = meridianId;
    const mData = MERIDIANS.find(m => m.id === meridianId);

    // Highlight paths
    layerMeridians.querySelectorAll('.meridian-path').forEach(p => {
      if (p.dataset.meridian === meridianId) {
        p.classList.add('highlighted');
        p.classList.remove('dimmed');
      } else {
        p.classList.add('dimmed');
        p.classList.remove('highlighted');
      }
    });

    // Highlight acupoints of same meridian
    layerAcupoints.querySelectorAll('.acupoint-group').forEach(g => {
      const dot = g.querySelector('.acupoint-dot');
      if (g.dataset.meridian === meridianId) {
        dot.classList.add('meridian-highlighted');
        dot.classList.remove('dimmed');
        dot.style.color = mData ? mData.color : '';
      } else {
        dot.classList.add('dimmed');
        dot.classList.remove('meridian-highlighted');
      }
    });
  }

  function unhighlightMeridian() {
    state.highlightedMeridian = null;
    layerMeridians.querySelectorAll('.meridian-path').forEach(p => {
      p.classList.remove('highlighted', 'dimmed');
    });
    layerAcupoints.querySelectorAll('.acupoint-dot').forEach(d => {
      d.classList.remove('meridian-highlighted', 'dimmed');
      d.style.color = '';
    });
  }

  // ═══════════════════════════════════════════════════
  //  TOOLTIP
  // ═══════════════════════════════════════════════════

  function showTooltip(dot) {
    const id = dot.dataset.id;
    const pt = findAcupoint(id);
    if (!pt) return;

    tooltip.querySelector('.tt-id').textContent = pt.id;
    tooltip.querySelector('.tt-name').textContent = pt.name_vi;
    tooltip.classList.add('visible');

    // Position tooltip
    const rect = canvasWrapper.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();

    let left = dotRect.left - rect.left + dotRect.width / 2;
    let top = dotRect.top - rect.top - 35;

    // Clamp
    left = Math.max(10, Math.min(left, rect.width - 150));
    top = Math.max(5, top);

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  // ═══════════════════════════════════════════════════
  //  ACUPOINT SELECTION & DETAIL PANEL
  // ═══════════════════════════════════════════════════

  function selectAcupoint(id) {
    const pt = findAcupoint(id);
    if (!pt) return;

    // Update selected state
    state.selectedAcupoint = id;
    layerAcupoints.querySelectorAll('.acupoint-dot').forEach(d => d.classList.remove('selected'));
    layerAcupoints.querySelectorAll(`.acupoint-dot[data-id="${id}"]`).forEach(d => d.classList.add('selected'));

    // Dim other layers for focus
    canvasWrapper.classList.add('dimmed');
    const selectedGroup = layerAcupoints.querySelector(`.acupoint-group[data-id="${id}"]`);
    if (selectedGroup) selectedGroup.classList.add('active-focus');

    // Get meridian info
    const meridian = MERIDIANS.find(m => m.id === pt.meridian_id);

    // Build detail HTML
    const dangerLabels = {
      safe: '✅ An toàn',
      caution: '⚠️ Cẩn thận',
      danger: '🔴 Nguy hiểm'
    };

    detailScroll.innerHTML = `
      <div class="detail-header">
        <div>
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.25rem">
            <span class="detail-id">${pt.id}</span>
          </div>
          <h2>${pt.name_vi}</h2>
          <div class="detail-pinyin">${pt.name_pinyin}</div>
          ${meridian ? `<div class="detail-meridian-tag" style="background:${hexToRgba(meridian.color, 0.15)};color:${meridian.color}">
            ⚡ ${meridian.name_vi} (${meridian.name_short})
          </div>` : ''}
        </div>
        <button class="detail-close-btn" title="Đóng">✕</button>
      </div>

      <div class="detail-section">
        <h3><span class="section-icon">🎯</span> Vị trí giải phẫu</h3>
        <p>${pt.anatomy_location}</p>
      </div>

      <div class="detail-section">
        <h3><span class="section-icon">🔬</span> Cấu trúc chiều sâu</h3>
        <p>${pt.anatomy_depth}</p>
      </div>

      <div class="detail-section">
        <h3><span class="section-icon">💊</span> Chủ trị (Indications)</h3>
        <ul>
          ${pt.clinical_indications.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>

      <div class="detail-section">
        <h3><span class="section-icon">📏</span> Độ sâu châm</h3>
        <p>${pt.needling_depth}</p>
      </div>

      <div class="detail-section">
        <h3><span class="section-icon">⚠️</span> Mức độ an toàn</h3>
        <span class="danger-badge ${pt.danger_level}">${dangerLabels[pt.danger_level]}</span>
        ${pt.danger_note ? `<p style="margin-top:0.4rem">${pt.danger_note}</p>` : ''}
      </div>

      ${meridian ? `
      <div class="detail-section" style="padding-top:0.75rem;border-top:1px dashed var(--color-divider)">
        <h3><span class="section-icon">🔀</span> Kinh mạch: ${meridian.name_short}</h3>
        <p>${meridian.description}</p>
        <p style="margin-top:0.3rem"><strong>Ngũ hành:</strong> ${meridian.element} &nbsp;|&nbsp; <strong>Tạng phủ:</strong> ${meridian.organ}</p>
        <p style="margin-top:0.3rem; color:var(--color-tcm-green); font-weight:600;"><strong>Cặp Kinh Biểu - Lý:</strong> ${meridian.coupled_meridian || 'Kỳ Kinh'}</p>
        <p><strong>Tổng số huyệt:</strong> ${meridian.totalPoints}</p>
      </div>` : ''}
    `;

    detailPanel.classList.add('open');
  }

  function closeDetail() {
    state.selectedAcupoint = null;
    detailPanel.classList.remove('open');
    canvasWrapper.classList.remove('dimmed');
    layerAcupoints.querySelectorAll('.acupoint-dot').forEach(d => d.classList.remove('selected'));
    layerAcupoints.querySelectorAll('.acupoint-group').forEach(g => g.classList.remove('active-focus'));
  }

  // ═══════════════════════════════════════════════════
  //  SEARCH
  // ═══════════════════════════════════════════════════

  function applySearch() {
    const q = state.searchQuery;
    layerAcupoints.querySelectorAll('.acupoint-group').forEach(g => {
      const dot = g.querySelector('.acupoint-dot');
      dot.classList.remove('search-match', 'dimmed');

      if (!q) return;

      const id = g.dataset.id;
      const pt = findAcupoint(id);
      if (!pt) return;

      const match = pt.id.toLowerCase().includes(q)
        || pt.name_vi.toLowerCase().includes(q)
        || pt.name_pinyin.toLowerCase().includes(q)
        || pt.clinical_indications.some(ci => ci.toLowerCase().includes(q));

      if (match) {
        dot.classList.add('search-match');
      } else {
        dot.classList.add('dimmed');
      }
    });
  }

  // ═══════════════════════════════════════════════════
  //  SVG HELPERS
  // ═══════════════════════════════════════════════════

  function createSVGElement(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    return el;
  }

  /**
   * Convert waypoints [[x,y], ...] to a smooth SVG cubic bezier path
   * Uses Catmull-Rom → Cubic Bezier conversion
   */
  function waypointsToSmoothPath(points) {
    if (points.length < 2) return '';
    if (points.length === 2) {
      return `M ${points[0][0]},${points[0][1]} L ${points[1][0]},${points[1][1]}`;
    }

    let d = `M ${points[0][0]},${points[0][1]}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[Math.min(i + 1, points.length - 1)];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const tension = 0.35;

      const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
      const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
      const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
      const cp2y = p2[1] - (p3[1] - p1[1]) * tension;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1]}`;
    }

    return d;
  }

  function findAcupoint(id) {
    return ACUPOINTS.find(p => p.id === id);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

})();
