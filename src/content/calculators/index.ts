/**
 * CliniPortal — Calculators Module Entry Point
 */
import { initCalculatorsHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

// Tự động khởi tạo khi DOM sẵn sàng nếu chạy trực tiếp trên Hub page
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCalculatorsHub());
  } else {
    initCalculatorsHub();
  }
}
