/**
 * Guideline Table & Filter Controller (guideline-table.ts)
 * Path: src/content/ebm/guidelines/js/guideline-table.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface GuidelineFilterState {
  search: string;
  sourceType: string | null;
  specialty: string | null;
  condition: string | null;
  design: string | null;
  impact: string | null;
  asianData: boolean;
}

export class GuidelineTable {
  public static filters: GuidelineFilterState = {
    search: '',
    sourceType: null,
    specialty: null,
    condition: null,
    design: null,
    impact: null,
    asianData: false
  };

  public static setFilter(key: keyof GuidelineFilterState, val: any): void {
    (this.filters as any)[key] = val;
    this.render();
  }

  public static render(): void {
    const studies = (window as any).studies || [];
    const container = document.getElementById('studies-table-body') || document.getElementById('guidelines-list-container');
    if (!container) return;

    const filtered = studies.filter((s: any) => {
      if (this.filters.search) {
        const q = this.filters.search.toLowerCase();
        const title = (s.title || '').toLowerCase();
        const drug = (s.drug || '').toLowerCase();
        if (!title.includes(q) && !drug.includes(q)) return false;
      }
      if (this.filters.sourceType && s.sourceType !== this.filters.sourceType) return false;
      if (this.filters.specialty && s.specialty !== this.filters.specialty) return false;
      if (this.filters.impact && s.impact !== this.filters.impact) return false;
      return true;
    });

    const countEl = document.getElementById('filtered-count');
    if (countEl) countEl.textContent = filtered.length.toString();
  }

  public static init(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
    searchInput?.addEventListener('input', (e) => {
      this.setFilter('search', (e.target as HTMLInputElement).value);
    });
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineTable = GuidelineTable;
  (window as any).setFilter = (k: any, v: any) => GuidelineTable.setFilter(k, v);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GuidelineTable.init());
  } else {
    GuidelineTable.init();
  }
}
