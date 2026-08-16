/**
 * CliniPortal — Traditional Chinese Medicine Module Entry Point
 */
import { initTcmHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './tcm-view';

// Subsystems Native SPA Views
export * from './acupressure/meridian-acupoints-view';
export * from './herbs-formulas/herbs-formulas-view';
export * from './diagnostics/tcm-diagnostics-view';
export * from './theory-ngu-hanh/ngu-hanh-studio-view';
export * from './dong-tay-y-bridge/integrative-bridge-view';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initTcmHub());
  } else {
    initTcmHub();
  }
}
