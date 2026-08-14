/**
 * Guideline Visualizations & Bento Dashboard (guideline-visualizations.ts)
 * Path: src/content/ebm/guidelines/js/guideline-visualizations.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export class GuidelineVisualizations {
  public static renderBentoDashboard(studies: any[], containerId = 'analytics-bento-container'): void {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(studies)) return;

    const rctCount = studies.filter(s => s.design === 'rct').length;
    const gdlCount = studies.filter(s => s.design === 'guideline').length;
    const metaCount = studies.filter(s => s.design === 'meta').length;
    const total = Math.max(studies.length, 1);

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin:1rem 0;">
        <div style="background:var(--color-surface); border:1px solid var(--color-divider); padding:1rem; border-radius:12px;">
          <div style="font-size:0.8rem; color:var(--color-text-muted);">Tổng số Hướng dẫn / Nghiên cứu</div>
          <div style="font-size:1.8rem; font-weight:800; color:var(--color-primary);">${studies.length}</div>
        </div>
        <div style="background:var(--color-surface); border:1px solid var(--color-divider); padding:1rem; border-radius:12px;">
          <div style="font-size:0.8rem; color:var(--color-text-muted);">Thử nghiệm RCT (${Math.round((rctCount/total)*100)}%)</div>
          <div style="font-size:1.8rem; font-weight:800; color:#16a34a;">${rctCount}</div>
        </div>
        <div style="background:var(--color-surface); border:1px solid var(--color-divider); padding:1rem; border-radius:12px;">
          <div style="font-size:0.8rem; color:var(--color-text-muted);">Guidelines lâm sàng (${Math.round((gdlCount/total)*100)}%)</div>
          <div style="font-size:1.8rem; font-weight:800; color:#0284c7;">${gdlCount}</div>
        </div>
        <div style="background:var(--color-surface); border:1px solid var(--color-divider); padding:1rem; border-radius:12px;">
          <div style="font-size:0.8rem; color:var(--color-text-muted);">Meta-Analysis (${Math.round((metaCount/total)*100)}%)</div>
          <div style="font-size:1.8rem; font-weight:800; color:#7c3aed;">${metaCount}</div>
        </div>
      </div>
    `;
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineVisualizations = GuidelineVisualizations;
}
