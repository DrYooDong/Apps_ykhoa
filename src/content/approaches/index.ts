/**
 * CliniPortal — Clinical Approaches Module Entry Point
 */
import { initApproachesHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initApproachesHub());
  } else {
    initApproachesHub();
  }
}
