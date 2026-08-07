/**
 * Treatment Pathway Engine — CliniPortal
 * Pure Vanilla JavaScript (ES6+) SVG Sunburst & Pathway Rendering Engine
 * No External Dependencies
 */

class TreatmentPathwayEngine {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!this.container) return;

    this.options = Object.assign({
      data: null,
      width: 600,
      height: 520,
      innerRadius: 55,
      ringWidth: 65,
      showLegend: true
    }, options);

    this.data = this.options.data;
    this.tooltipEl = null;
    this.detailPanelEl = null;
    this.svgEl = null;

    this.init();
  }

  init() {
    this.createTooltip();
    this.renderLayout();
    if (this.data) {
      this.renderSunburst(this.data);
    }
  }

  createTooltip() {
    let tooltip = document.getElementById('tpTooltipGlobal');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'tpTooltipGlobal';
      tooltip.className = 'tp-tooltip';
      document.body.appendChild(tooltip);
    }
    this.tooltipEl = tooltip;
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="treatment-pathways-card">
        <div class="tp-header">
          <div class="tp-title-group">
            <h2><i class="fa-solid fa-diagram-project"></i> ${this.data ? this.data.title : 'Hành trình Điều trị Lâm sàng'}</h2>
            <p class="tp-subtitle">${this.data && this.data.subtitle ? this.data.subtitle : 'Sơ đồ phân nhánh & lựa chọn thuốc tiếp cận'}</p>
          </div>
          <div class="tp-controls">
            <button class="tp-tab-btn active" data-view="sunburst"><i class="fa-solid fa-chart-pie"></i> Sunburst View</button>
            <button class="tp-tab-btn" data-view="sequence"><i class="fa-solid fa-timeline"></i> Sequence Flow</button>
          </div>
        </div>

        <div class="tp-legend">
          <div class="tp-legend-item"><span class="tp-legend-color" style="background: var(--color-primary, #0284c7);"></span> Khung Chẩn đoán</div>
          <div class="tp-legend-item"><span class="tp-legend-color" style="background: var(--color-danger, #ef4444);"></span> Nguy cơ Cao (ASCVD)</div>
          <div class="tp-legend-item"><span class="tp-legend-color" style="background: var(--color-warning, #f59e0b);"></span> Suy tim / Suy thận</div>
          <div class="tp-legend-item"><span class="tp-legend-color" style="background: var(--color-success, #10b981);"></span> Khởi đầu Thuốc bậc 1</div>
          <div class="tp-legend-item"><span class="tp-legend-color" style="background: var(--color-info, #06b6d4);"></span> Nâng bậc / Chỉnh liều</div>
        </div>

        <div class="tp-chart-container">
          <svg class="tp-svg" viewBox="-260 -260 520 520"></svg>
          
          <!-- Detail Popover Drawer -->
          <div class="tp-detail-panel" id="tpDetailPanel">
            <button class="tp-detail-close" id="tpDetailClose">&times;</button>
            <h3 class="tp-detail-title" id="tpDetailTitle">Chi tiết Phác đồ</h3>
            <div class="tp-detail-body" id="tpDetailBody">
              Chọn một nhánh trên sơ đồ để xem thông tin chi tiết về liều dùng và theo dõi lâm sàng.
            </div>
          </div>
        </div>
      </div>
    `;

    this.svgEl = this.container.querySelector('.tp-svg');
    this.detailPanelEl = this.container.querySelector('#tpDetailPanel');

    // Event close detail panel
    const closeBtn = this.container.querySelector('#tpDetailClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDetailPanel());
    }

    // View switcher tabs
    const tabBtns = this.container.querySelectorAll('.tp-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const viewMode = btn.dataset.view;
        if (viewMode === 'sunburst') {
          this.renderSunburst(this.data);
        } else {
          this.renderSequenceFlow(this.data);
        }
      });
    });
  }

  // Polar to Cartesian Math Helper
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  // Describe SVG Arc Path string
  describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
    // Avoid full 360 degree arc overlap issue by capping slightly
    if (endAngle - startAngle >= 360) endAngle = startAngle + 359.99;

    const startOuter = this.polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = this.polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = this.polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = this.polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", startOuter.x, startOuter.y,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      "L", endInner.x, endInner.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
      "Z"
    ].join(" ");
  }

  renderSunburst(data) {
    if (!this.svgEl || !data) return;
    this.svgEl.innerHTML = '';

    const root = data.root || data;
    const rInnerBase = this.options.innerRadius;
    const rWidth = this.options.ringWidth;

    // Center Node (Root)
    const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerCircle.setAttribute("r", rInnerBase.toString());
    centerCircle.setAttribute("fill", "var(--color-surface, #ffffff)");
    centerCircle.setAttribute("stroke", root.color || "var(--color-primary, #0284c7)");
    centerCircle.setAttribute("stroke-width", "4");
    centerCircle.style.cursor = "pointer";
    this.svgEl.appendChild(centerCircle);

    const centerText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    centerText.setAttribute("class", "tp-center-label");
    centerText.setAttribute("y", "-4");
    centerText.textContent = root.name || "Tâm chẩn đoán";
    this.svgEl.appendChild(centerText);

    const centerSubText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    centerSubText.setAttribute("class", "tp-center-subtext");
    centerSubText.setAttribute("y", "14");
    centerSubText.textContent = "Click để reset";
    this.svgEl.appendChild(centerSubText);

    centerCircle.addEventListener('click', () => this.closeDetailPanel());

    if (!root.children) return;

    // Calculate total value of children
    const totalVal = root.children.reduce((acc, child) => acc + (child.value || 10), 0);

    // Recursively render segments level by level
    const renderLevel = (children, startAngle, totalAngleExtent, level) => {
      const innerR = rInnerBase + (level - 1) * rWidth + (level > 1 ? 5 : 0);
      const outerR = innerR + rWidth;

      let currentStartAngle = startAngle;
      const levelTotalVal = children.reduce((acc, c) => acc + (c.value || 10), 0);

      children.forEach(item => {
        const itemAngleExtent = ((item.value || 10) / levelTotalVal) * totalAngleExtent;
        const itemStartAngle = currentStartAngle;
        const itemEndAngle = currentStartAngle + itemAngleExtent;
        currentStartAngle = itemEndAngle;

        // Create Path Element
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const arcPathStr = this.describeArc(0, 0, innerR, outerR, itemStartAngle, itemEndAngle);
        path.setAttribute("d", arcPathStr);
        path.setAttribute("fill", item.color || "var(--color-primary)");
        path.setAttribute("class", "tp-segment");

        // Attach Data
        path._tpData = item;

        // Hover Tooltip Events
        path.addEventListener('mousemove', (e) => {
          this.showTooltip(e, item);
        });
        path.addEventListener('mouseleave', () => {
          this.hideTooltip();
        });

        // Click Event -> Open Detail Panel
        path.addEventListener('click', () => {
          this.openDetailPanel(item);
        });

        this.svgEl.appendChild(path);

        // Render Children Level recursively if present
        if (item.children && item.children.length > 0) {
          renderLevel(item.children, itemStartAngle, itemAngleExtent, level + 1);
        }
      });
    };

    renderLevel(root.children, 0, 360, 1);
  }

  renderSequenceFlow(data) {
    if (!this.svgEl || !data) return;
    this.svgEl.innerHTML = '';

    const root = data.root || data;
    
    // Draw simple SVG Sequence Diagram nodes
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", "translate(-220, -180)");

    let yOffset = 0;
    const drawNode = (item, level, x, y) => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x.toString());
      rect.setAttribute("y", y.toString());
      rect.setAttribute("width", "440");
      rect.setAttribute("height", "54");
      rect.setAttribute("rx", "10");
      rect.setAttribute("fill", item.color || "var(--color-primary)");
      rect.setAttribute("opacity", "0.9");
      rect.style.cursor = "pointer";

      rect.addEventListener('click', () => this.openDetailPanel(item));

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", (x + 20).toString());
      text.setAttribute("y", (y + 32).toString());
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("font-weight", "600");
      text.setAttribute("font-size", "14px");
      text.textContent = `▶ ${item.name} ${item.dose ? '— ' + item.dose : ''}`;
      text.style.pointerEvents = "none";

      group.appendChild(rect);
      group.appendChild(text);

      if (item.children) {
        item.children.forEach((c, idx) => {
          yOffset += 70;
          drawNode(c, level + 1, x + 20, y + yOffset);
        });
      }
    };

    drawNode(root, 0, 0, 0);
    this.svgEl.appendChild(group);
  }

  showTooltip(e, item) {
    if (!this.tooltipEl) return;
    this.tooltipEl.innerHTML = `
      <div class="tp-tooltip-title">${item.name}</div>
      ${item.category ? `<div style="font-size: 0.75rem; opacity: 0.8;">Phân loại: ${item.category}</div>` : ''}
      ${item.dose ? `<div style="margin-top: 4px; color: #fde047; font-weight: 600;">Liều: ${item.dose}</div>` : ''}
      <div class="tp-tooltip-badge" style="background: ${item.color || '#0284c7'}; color: #fff;">Click xem chi tiết</div>
    `;
    this.tooltipEl.style.left = (e.clientX + 14) + 'px';
    this.tooltipEl.style.top = (e.clientY + 14) + 'px';
    this.tooltipEl.classList.add('visible');
  }

  hideTooltip() {
    if (this.tooltipEl) {
      this.tooltipEl.classList.remove('visible');
    }
  }

  openDetailPanel(item) {
    if (!this.detailPanelEl) return;
    const titleEl = this.container.querySelector('#tpDetailTitle');
    const bodyEl = this.container.querySelector('#tpDetailBody');

    if (titleEl) titleEl.textContent = item.name;
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="padding: 6px 12px; background: rgba(2, 132, 199, 0.1); border-left: 4px solid ${item.color || 'var(--color-primary)'}; border-radius: 4px; margin-bottom: 14px;">
          <strong>Nhánh hành trình:</strong> ${item.category || 'Tiếp cận điều trị'}
        </div>
        ${item.dose ? `
          <div class="tp-detail-section">
            <h4>💊 Hướng dẫn Liều dùng & Cách dùng</h4>
            <p><strong>Khuyến cáo:</strong> ${item.dose}</p>
          </div>
        ` : ''}
        ${item.details ? `
          <div class="tp-detail-section">
            <h4>📋 Tiêu chuẩn & Ghi chú Lâm sàng</h4>
            <p>${item.details}</p>
          </div>
        ` : `
          <div class="tp-detail-section">
            <h4>📌 Dẫn chiếu Khuyến cáo</h4>
            <p>Phác đồ tuân thủ hướng dẫn cập nhật từ các Hiệp hội Y khoa Quốc tế (ADA, ACC/AHA, GINA).</p>
          </div>
        `}
      `;
    }
    this.detailPanelEl.classList.add('open');
  }

  closeDetailPanel() {
    if (this.detailPanelEl) {
      this.detailPanelEl.classList.remove('open');
    }
  }
}

// Auto-initialize on DOM ready for elements with data-treatment-pathway
document.addEventListener('DOMContentLoaded', () => {
  const pathwayContainers = document.querySelectorAll('[data-treatment-pathway]');
  pathwayContainers.forEach(container => {
    const jsonPath = container.getAttribute('data-treatment-pathway');
    if (jsonPath) {
      fetch(jsonPath)
        .then(res => res.json())
        .then(data => new TreatmentPathwayEngine(container, { data }))
        .catch(err => console.error('Error loading pathway JSON:', err));
    }
  });
});
