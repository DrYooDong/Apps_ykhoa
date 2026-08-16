/**
 * CliniPortal — Clinical Skills Module Entry Point
 */
import { initSkillsHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './skills-view';

// Subsystems Native SPA Views
export * from './simulators/osce-randomizer-view';
export * from './simulators/virtual-patient-view';
export * from './can-lam-sang/ecg-studio-view';
export * from './clinical/auscultation-view';
export * from './skills-navigator-view';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initSkillsHub());
  } else {
    initSkillsHub();
  }
}
