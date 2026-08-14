/**
 * Guideline Data Store & Sync Manager (guideline-sync.ts)
 * Path: src/content/ebm/guidelines/js/guideline-sync.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface GuidelineSyncStats {
  total: number;
  practiceChangingCount: number;
  mohCount: number;
  intlCount: number;
  associationCount?: number;
}

export class CliniPortalSync {
  public static getSummaryStats(): GuidelineSyncStats {
    const studies = (window as any).studies || [];
    let practiceChangingCount = 0;
    let mohCount = 0;
    let intlCount = 0;
    let associationCount = 0;

    studies.forEach((s: any) => {
      if (s.impact === 'practice-changing') practiceChangingCount++;
      if (s.sourceType === 'vn-moh') mohCount++;
      if (s.sourceType === 'intl-study' || s.sourceType === 'intl-guideline') intlCount++;
      if (s.sourceType === 'vn-association') associationCount++;
    });

    return {
      total: studies.length,
      practiceChangingCount,
      mohCount,
      intlCount,
      associationCount
    };
  }

  public static init(): void {
    if (typeof window !== 'undefined') {
      (window as any).studies = (window as any).studies || [];
      (window as any).selectedIds = (window as any).selectedIds || new Set();
      (window as any).expandedIds = (window as any).expandedIds || new Set();
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).CliniPortalSync = CliniPortalSync;
  CliniPortalSync.init();
}
