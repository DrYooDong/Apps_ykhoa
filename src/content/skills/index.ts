/**
 * CliniPortal — Clinical Skills Module Entry Point
 */
import { initSkillsHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initSkillsHub());
  } else {
    initSkillsHub();
  }
}
