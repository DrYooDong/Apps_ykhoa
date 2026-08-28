/**
 * CliniPortal — EBM & Guidelines Module Entry Point
 */
import { initEbmHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './ebm-view';
export * from './provenance';

// Subsystems Native SPA Views
export * from './guidelines/js/guidelines-view';
export * from './guidelines/js/journal-quality-view';
export * from './guidelines/js/study-analyzer-view';
export * from './guidelines/js/study-analyzer-suite';
export * from './guidelines/js/guideline-controller';
export * from './guidelines/js/guideline-reader-view';
export * from './guideline-radar/radar-view';
export * from './guideline-radar/radar';
export * from './ebm-lab/ebm-lab-view';
export * from './ebm-lab/ebm-lab-engine';
export * from './ebm-lab/chart-views';
export * from './guidelines/js/kho-guidelines-hub-view';
export * from './guidelines/js/kho-guidelines-registry';
export * from './medical-statistics/statistics-hub-view';
export * from './medical-statistics/statistics-reader-view';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEbmHub());
  } else {
    initEbmHub();
  }
}
