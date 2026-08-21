/**
 * CliniPortal — Basic Medical Sciences (Pathophysiology & Basic Sciences) Module Entry Point
 */
import { initPathophysiologyHub } from './views/renderer';

// Core Types & Data
export * from './types/types';
export * from './data/data';

// Subsystems Native SPA Views & Controllers
export * from './views/renderer';
export * from './views/pathophysiology-view';
export * from './views/giai-phau-sinh-ly-view';
export * from './views/co-che-benh-sinh-view';
export * from './views/biochemistry-view';
export * from './views/biochemistry-hub';
export * from './views/epidemiology-view';
export * from './views/epidemiology-tools-view';
export * from './types/epidemiology.types';
export * from './data/epidemiology-data';
export * from './views/formula-vault-view';
export * from './views/physio-reader-view';
export * from './views/physio-html-reader-view';
export * from './views/patho-hub';

// Dynamic Interactive Modules
export * from './simulators/physiology-simulators-view';
export * from './simulators/physiology-simulators-engine';
export * from './biochemistry/metabolic-navigator-view';
export * from './biochemistry/metabolic-data';
export * from './quiz/patho-quiz-view';
export * from './quiz/patho-quiz-data';
export * from './quiz/exam-bank-data';
export * from './quiz/exam-generator-engine';
export * from './js/physio-shared';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPathophysiologyHub());
  } else {
    initPathophysiologyHub();
  }
}
