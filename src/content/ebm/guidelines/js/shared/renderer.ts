/**
 * CliniPortal — EBM Hub TypeScript Renderer & Helpers (Re-export from Single Source of Truth)
 */
export {
  getJournalMetrics,
  createSpecialtyBadge,
  createImpactBadge,
  filterGuidelines,
  animateValue,
  initEbmHealthScore,
  initEbmFuzzySearch
} from '../../../renderer';

import { initEbmHealthScore, initEbmFuzzySearch } from '../../../renderer';
import { initGuidelinesApp } from '../guideline-controller';

export function initEbmHub(): void {
  initEbmHealthScore();
  initEbmFuzzySearch();
  initGuidelinesApp();
}
