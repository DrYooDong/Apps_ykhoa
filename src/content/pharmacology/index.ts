/**
 * CliniPortal — Clinical Pharmacology Module Entry Point
 */
import { initPharmacologyHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPharmacologyHub());
  } else {
    initPharmacologyHub();
  }
}
