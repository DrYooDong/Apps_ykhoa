/**
 * CliniPortal — Calculators Module Entry Point
 */
import { initCalculatorsHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './calculators-view';

// Subspecialty Native SPA Views
export * from './general/general-views';
export * from './cardiology/cardiology-views';
export * from './emergency/emergency-views';
export * from './gastroenterology/gastro-views';
export * from './renal/renal-views';
export * from './respiratory/respiratory-views';
export * from './infectious/infectious-views';
export * from './endocrinology/endocrinology-views';
export * from './hematology/hematology-views';
export * from './neurology/neurology-views';

// Tự động khởi tạo khi DOM sẵn sàng nếu chạy trực tiếp trên Hub page
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCalculatorsHub());
  } else {
    initCalculatorsHub();
  }
}
