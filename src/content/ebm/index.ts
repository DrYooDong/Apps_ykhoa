/**
 * CliniPortal — EBM & Guidelines Module Entry Point
 */
import { initEbmHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './ebm-view';

// Subsystems Native SPA Views
export * from './guidelines/guidelines-view';
export * from './guidelines/journal-quality-view';
export * from './guidelines/guidelinesdata';
export * from './guidelines/guideline-controller';
export * from './guidelines/guideline-reader-view';
export * from './guideline-radar/radar-view';
export * from './ebm-lab/ebm-lab-view';
export * from './ebm-lab/chart-views';
export * from './medical-statistics/statistics-hub-view';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEbmHub());
  } else {
    initEbmHub();
  }
}
