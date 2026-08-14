/**
 * CliniPortal — Pathophysiology Module Entry Point
 */
import { initPathophysiologyHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPathophysiologyHub());
  } else {
    initPathophysiologyHub();
  }
}
