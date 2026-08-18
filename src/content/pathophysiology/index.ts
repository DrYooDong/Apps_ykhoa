/**
 * CliniPortal — Pathophysiology Module Entry Point
 */
import { initPathophysiologyHub } from './renderer';

export * from './types';
export * from './data';
export * from './renderer';
export * from './pathophysiology-view';

// Subsystems Native SPA Views
export * from './giai-phau-sinh-ly-view';
export * from './co-che-benh-sinh-view';
export * from './biochemistry-view';
export * from './formula-vault-view';
export * from './physio-reader-view';
export * from './physio-html-reader-view';

// Dynamic Interactive Modules
export * from './simulators/physiology-simulators-view';
export * from './simulators/physiology-simulators-engine';
export * from './biochemistry/metabolic-navigator-view';
export * from './biochemistry/metabolic-data';
export * from './quiz/patho-quiz-view';
export * from './quiz/patho-quiz-data';
export * from './quiz/exam-bank-data';
export * from './quiz/exam-generator-engine';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPathophysiologyHub());
  } else {
    initPathophysiologyHub();
  }
}
