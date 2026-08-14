/**
 * Reader Controller (reader-controller.ts)
 * Powers reader.html with dynamic Markdown loading, SVG diagrams, and MathJax
 */

import { PhysioMDEngine } from './physio-md-engine.js';
import { PhysioPathwayViewer } from './physio-pathway-viewer.js';

export async function initReader(): Promise<void> {
  const urlParams = new URLSearchParams(window.location.search);
  const articlePath = urlParams.get('article') || 'content/sinhly/phan1/SL_TB_Diensinhly.md';

  // Load Article via MDEngine
  const result = await PhysioMDEngine.loadArticle(articlePath);
  const meta = result.metadata || {};

  // Render Title & Subtitle
  document.title = `${meta.title || 'Bài Học Sinh Lý'} – CliniPortal`;
  const titleEl = document.getElementById('article-title');
  if (titleEl) titleEl.innerText = meta.title || 'Bài Học Sinh Lý';

  const subEl = document.getElementById('article-subtitle');
  if (subEl) subEl.innerText = meta.category || 'Tài liệu Sinh lý học chuyên sâu';

  // Render Metadata badges
  let metaHtml = '';
  if (meta.difficulty) metaHtml += `<span class="quiz-badge">${meta.difficulty}</span>`;
  if (meta.read_time) metaHtml += `<span class="quiz-badge" style="background:rgba(16,185,129,0.1); color:var(--color-success);"><i class="far fa-clock"></i> ${meta.read_time}</span>`;
  if (meta.tags && Array.isArray(meta.tags)) {
    meta.tags.forEach(tag => {
      metaHtml += `<span style="font-size:0.75rem; background:rgba(2,132,199,0.1); color:var(--color-primary); padding:2px 8px; border-radius:12px;">#${tag}</span>`;
    });
  }
  const metaEl = document.getElementById('article-meta');
  if (metaEl) metaEl.innerHTML = metaHtml;

  // Render Body
  const bodyEl = document.getElementById('article-body');
  if (bodyEl) bodyEl.innerHTML = PhysioMDEngine.renderMarkdown(result.body);

  // Render Interactive SVG Diagram if flagged
  if (meta.has_interactive_diagram) {
    const svgContainer = document.getElementById('interactive-diagram-container');
    const svgHost = document.getElementById('svg-host');
    if (svgContainer) svgContainer.style.display = 'block';
    try {
      const svgResp = await fetch('diagrams/action-potential.svg');
      const svgText = await svgResp.text();
      if (svgHost) svgHost.innerHTML = svgText;
    } catch (e) {
      console.error('Error fetching SVG diagram:', e);
    }
  }

  // Render Interactive Pathway if flagged
  if (meta.has_pathway) {
    const pathwayContainer = document.getElementById('interactive-pathway-container');
    if (pathwayContainer) pathwayContainer.style.display = 'block';
    PhysioPathwayViewer.init('interactive-pathway-container', 'acs_pathway');
  }

  // Trigger MathJax typeset
  const win = window as any;
  if (win.MathJax && win.MathJax.typesetPromise) {
    win.MathJax.typesetPromise();
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initReader);
}
