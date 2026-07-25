/**
 * CliniPortal Pure Charting Library
 * Lightweight SVG Chart Renderer
 */
const PureCharts = {
  // Helper to create SVG elements
  createSVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  },

  // 1. Line Chart Renderer
  renderLine(containerId, data, labels, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 300;
    const padding = 40;

    const svg = this.createSVG('svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const maxVal = Math.max(...data) * 1.2 || 10;
    const minVal = 0;

    // Draw grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * (height - 2 * padding) / 4);
      const line = this.createSVG('line');
      line.setAttribute('x1', padding);
      line.setAttribute('y1', y);
      line.setAttribute('x2', width - padding);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#e2e8f0');
      line.setAttribute('stroke-dasharray', '4');
      svg.appendChild(line);
    }

    // Plot line path
    const points = data.map((val, idx) => {
      const x = padding + (idx * (width - 2 * padding) / (data.length - 1));
      const y = height - padding - ((val / maxVal) * (height - 2 * padding));
      return { x, y };
    });

    const pathD = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');

    const path = this.createSVG('path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', options.color || '#0ea5e9');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);

    // Draw dots and labels
    points.forEach((pt, idx) => {
      const circle = this.createSVG('circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', options.color || '#0ea5e9');
      svg.appendChild(circle);

      // Labels x
      const txt = this.createSVG('text');
      txt.setAttribute('x', pt.x);
      txt.setAttribute('y', height - 10);
      txt.setAttribute('font-size', '12');
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('fill', '#64748b');
      txt.textContent = labels[idx] || '';
      svg.appendChild(txt);
    });

    container.appendChild(svg);
  },

  // 2. Bar Chart Renderer
  renderBar(containerId, data, labels, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 300;
    const padding = 40;

    const svg = this.createSVG('svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const maxVal = Math.max(...data) * 1.2 || 10;
    const barWidth = (width - 2 * padding) / data.length - 15;

    data.forEach((val, idx) => {
      const x = padding + (idx * (width - 2 * padding) / data.length) + 7.5;
      const barHeight = (val / maxVal) * (height - 2 * padding);
      const y = height - padding - barHeight;

      const rect = this.createSVG('rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', options.color || '#10b981');
      svg.appendChild(rect);

      // X Label
      const txt = this.createSVG('text');
      txt.setAttribute('x', x + barWidth / 2);
      txt.setAttribute('y', height - 10);
      txt.setAttribute('font-size', '12');
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('fill', '#64748b');
      txt.textContent = labels[idx] || '';
      svg.appendChild(txt);
    });

    container.appendChild(svg);
  },

  // 3. Gauge Chart Renderer
  renderGauge(containerId, val, min = 0, max = 100, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;
    const cx = width / 2;
    const cy = height - 20;
    const r = Math.min(width, height) - 40;

    const svg = this.createSVG('svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // Gray Background Arc
    const bgArc = this.createSVG('path');
    const dBg = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
    bgArc.setAttribute('d', dBg);
    bgArc.setAttribute('fill', 'none');
    bgArc.setAttribute('stroke', '#e2e8f0');
    bgArc.setAttribute('stroke-width', '20');
    bgArc.setAttribute('stroke-linecap', 'round');
    svg.appendChild(bgArc);

    // Active Colored Arc based on value percentage
    const pct = Math.min(Math.max((val - min) / (max - min), 0), 1);
    const angle = Math.PI * pct;
    const targetX = cx - r * Math.cos(angle);
    const targetY = cy - r * Math.sin(angle);

    const activeArc = this.createSVG('path');
    const dActive = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${targetX} ${targetY}`;
    activeArc.setAttribute('d', dActive);
    activeArc.setAttribute('fill', 'none');
    activeArc.setAttribute('stroke', options.color || '#ef4444');
    activeArc.setAttribute('stroke-width', '20');
    activeArc.setAttribute('stroke-linecap', 'round');
    svg.appendChild(activeArc);

    // Text Label inside
    const textVal = this.createSVG('text');
    textVal.setAttribute('x', cx);
    textVal.setAttribute('y', cy - 10);
    textVal.setAttribute('font-size', '28');
    textVal.setAttribute('font-weight', 'bold');
    textVal.setAttribute('text-anchor', 'middle');
    textVal.setAttribute('fill', '#1e293b');
    textVal.textContent = val;
    svg.appendChild(textVal);

    container.appendChild(svg);
  }
};
