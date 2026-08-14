/**
 * Guideline Modals & Study Form Controller (guideline-modals.ts)
 * Path: src/content/ebm/guidelines/js/guideline-modals.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export class GuidelineModals {
  private static editingStudyId: string | null = null;

  public static openAddModal(): void {
    this.editingStudyId = null;
    const form = (document.getElementById('add-form') || document.getElementById('study-form')) as HTMLFormElement | null;
    if (form) form.reset();

    const titleEl = document.getElementById('modal-form-title') || document.getElementById('study-modal-title');
    if (titleEl) titleEl.textContent = '➕ Thêm Hướng Dẫn / Nghiên Cứu Lâm Sàng Mới';

    const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
    if (modal) modal.classList.add('active');
  }

  public static closeAddModal(): void {
    const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
    if (modal) modal.classList.remove('active');
    this.editingStudyId = null;
  }

  public static init(): void {
    document.querySelectorAll('.btn-open-add-study').forEach(btn => {
      btn.addEventListener('click', () => this.openAddModal());
    });

    document.querySelectorAll('.btn-close-study-modal, .modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.closeAddModal());
    });
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineModals = GuidelineModals;
  (window as any).openAddModal = () => GuidelineModals.openAddModal();
  (window as any).closeAddModal = () => GuidelineModals.closeAddModal();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GuidelineModals.init());
  } else {
    GuidelineModals.init();
  }
}
