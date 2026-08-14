/**
 * CliniPortal — EBM & Guidelines Module Entry Point
 */
import { initEbmHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEbmHub());
  } else {
    initEbmHub();
  }
}
