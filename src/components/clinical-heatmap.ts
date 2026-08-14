/**
 * Clinical Heatmap Widget (clinical-heatmap.ts)
 * Path: src/components/clinical-heatmap.ts
 */

export class ClinicalHeatmap {
  private container: HTMLElement | null;
  private storageKey = 'cliniportal_activity_log';
  private activityMap: Record<string, number> = {};

  constructor(containerId = 'clinical-heatmap-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.initData();
    this.render();
  }

  private initData(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        this.activityMap = JSON.parse(raw);
      } catch (e) {
        this.activityMap = {};
      }
    } else {
      this.activityMap = {};
    }
  }

  public render(): void {
    if (!this.container) return;
    this.container.innerHTML = `
      <div style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:8px;">
        🔥 Chuỗi hoạt động lâm sàng & học tập
      </div>
      <div style="display:grid; grid-template-columns:repeat(52, 1fr); gap:3px;">
        ${Array.from({ length: 52 }).map(() => `<div style="width:10px; height:10px; border-radius:2px; background:var(--color-surface-2); border:1px solid var(--color-divider);"></div>`).join('')}
      </div>
    `;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ClinicalHeatmap());
  } else {
    new ClinicalHeatmap();
  }
}
