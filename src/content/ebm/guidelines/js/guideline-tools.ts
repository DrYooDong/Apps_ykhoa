/**
 * Guideline Tools Unified Bridge (guideline-tools.ts)
 * Path: src/content/ebm/guidelines/js/guideline-tools.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

import { GuidelineCmdPalette } from './guideline-cmd-palette.js';
import { GuidelineCDSS } from './guideline-cdss.js';
import { GuidelineCompareMatrix } from './guideline-compare-matrix.js';

export const GuidelineTools = {
  toggleCommandPalette: () => GuidelineCmdPalette.toggle(),
  openCommandPalette: () => GuidelineCmdPalette.open(),
  closeCommandPalette: () => GuidelineCmdPalette.close(),

  openCaseModal: () => GuidelineCDSS.openCaseModal(),
  closeCaseModal: () => GuidelineCDSS.closeCaseModal(),

  addToCompare: (id: string) => GuidelineCompareMatrix.add(id),
  removeFromCompare: (id: string) => GuidelineCompareMatrix.remove(id),
  clearCompareList: () => GuidelineCompareMatrix.clear(),
  openMultiCompareModal: () => GuidelineCompareMatrix.openModal(),
  closeMultiCompareModal: () => GuidelineCompareMatrix.closeModal()
};

if (typeof window !== 'undefined') {
  (window as any).GuidelineTools = GuidelineTools;
}
