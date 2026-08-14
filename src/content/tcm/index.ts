/**
 * CliniPortal — Traditional Chinese Medicine Module Entry Point
 */
import { initTcmHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTcmHub());
  } else {
    initTcmHub();
  }
}
