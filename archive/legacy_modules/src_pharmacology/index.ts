/**
 * CliniPortal — Clinical Pharmacology Module Entry Point
 */
import { initPharmacologyHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './pharmacology-view';

// Subsystems Native SPA Views
export * from './tools/drug-search-view';
export * from './tools/interaction-matrix-view';
export * from './tools/dose-optimizer-view';
export * from './tools/pk-simulator-view';
export * from './symptoms/symptom-pharma-views';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPharmacologyHub());
  } else {
    initPharmacologyHub();
  }
}
