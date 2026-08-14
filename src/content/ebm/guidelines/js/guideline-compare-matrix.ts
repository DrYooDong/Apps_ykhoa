/**
 * Multi-Compare Matrix & Floating Bar (guideline-compare-matrix.ts)
 * Path: src/content/ebm/guidelines/js/guideline-compare-matrix.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export class GuidelineCompareMatrix {
  private static compareIds = new Set<string>();

  public static add(id: string): void {
    if (!id) return;
    this.compareIds.add(id);
    this.updateBar();
  }

  public static remove(id: string): void {
    this.compareIds.delete(id);
    this.updateBar();
  }

  public static clear(): void {
    this.compareIds.clear();
    this.updateBar();
    this.closeModal();
  }

  public static updateBar(): void {
    const bar = document.getElementById('floating-compare-bar');
    const countEl = document.getElementById('floating-compare-count');
    if (!bar || !countEl) return;

    if (this.compareIds.size > 0) {
      bar.style.display = 'flex';
      bar.classList.add('active');
      countEl.textContent = `${this.compareIds.size} bài đã chọn`;
    } else {
      bar.style.display = 'none';
      bar.classList.remove('active');
    }
  }

  public static openModal(): void {
    const modal = document.getElementById('multi-compare-modal');
    if (!modal) return;
    modal.classList.add('active');
  }

  public static closeModal(): void {
    const modal = document.getElementById('multi-compare-modal');
    if (modal) modal.classList.remove('active');
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineCompareMatrix = GuidelineCompareMatrix;
}
