/**
 * Guidelines Bento Dashboard Controller (guidelines-dashboard.ts)
 * Path: src/content/ebm/guidelines/js/guidelines-dashboard.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface DashboardStats {
  bySpec: Record<string, number>;
  bySource: Record<string, number>;
  byImpact: Record<string, number>;
  byYear: Record<string, number>;
  total: number;
}

export function computeStats(studies: any[]): DashboardStats {
  const bySpec: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const byImpact: Record<string, number> = {};
  const byYear: Record<string, number> = {};

  studies.forEach(s => {
    const spec = s.specialty || 'unknown';
    bySpec[spec] = (bySpec[spec] || 0) + 1;

    const src = s.sourceType || 'unknown';
    bySource[src] = (bySource[src] || 0) + 1;

    const imp = s.impact || 'unknown';
    byImpact[imp] = (byImpact[imp] || 0) + 1;

    const yr = String(s.year || 'N/A');
    byYear[yr] = (byYear[yr] || 0) + 1;
  });

  return { bySpec, bySource, byImpact, byYear, total: studies.length };
}

export function renderGuidelineDashboard(allStudies: any[]): void {
  const panel = document.getElementById('panel-analytics');
  if (!panel) return;

  if (!allStudies || allStudies.length === 0) {
    panel.innerHTML = `
      <div style="text-align:center; padding:3rem; color:var(--color-text-muted);">
        <div style="font-size:3rem; margin-bottom:1rem;">📊</div>
        <p>Chưa có dữ liệu để hiển thị Dashboard.</p>
      </div>`;
    return;
  }

  const stats = computeStats(allStudies);
  panel.innerHTML = `
    <div class="guidelines-dashboard-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
      <div style="background:var(--color-surface); padding:1.25rem; border-radius:12px; border:1px solid var(--color-divider);">
        <h4 style="margin:0 0 1rem 0; color:var(--color-primary);">📈 Phân bố theo Chuyên khoa</h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${Object.entries(stats.bySpec).map(([spec, count]) => `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span>${spec}</span>
              <strong>${count}</strong>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="background:var(--color-surface); padding:1.25rem; border-radius:12px; border:1px solid var(--color-divider);">
        <h4 style="margin:0 0 1rem 0; color:var(--color-primary);">🎯 Mức độ Tác động Lâm sàng</h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${Object.entries(stats.byImpact).map(([imp, count]) => `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span>${imp}</span>
              <strong>${count}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  (window as any).renderGuidelineDashboard = renderGuidelineDashboard;
}
