/**
 * CliniPortal — Clinical Approaches Unified TypeScript Module Registry & Entry Point
 * Exports all approach engines, CDSS algorithms, clinical calculators, and interactive tools.
 */

export * from './types';
export * from './data';
export * from './renderer';
export * from './approaches-shared';
export * from './approaches-view';

// Interactive Tools & Path Modules
export * from './interactive-tools/interactive-tools';
export * from './interactive-tools/treatment-pathways-data';

// Paraclinical Modules
export * from './paraclinical/tc-sinhhoagan';
export * from './paraclinical/tc-paraclinical-engine';
export * from './paraclinical/paraclinical-view';

// Pathology & Clinical Poster Modules
export * from './pathology/pathology-engine';
export * from './pathology/infographic-poster-board';
export * from './pathology/benh-ly-view';

// Pharmacology Approaches Modules
export * from './pharmacology/pharmacology-approaches-view';

// Emergency & Critical Care (HS-CC) Modules
export * from './1. hs-cc/emergency-quick-protocol';
export * from './1. hs-cc/phan-loai-triage-cap-cuu';
export * from './1. hs-cc/cap-cuu-view';

// Symptom Modules
export * from './symptoms/systemic-symptoms/fever/tc-sot';
export * from './symptoms/symptoms-engine';
export * from './symptoms/symptoms-view';

// Pediatrics (Nhi khoa) Specialization Modules
export * from './specialties/pediatrics/nhi-khoa-view';
export * from './specialties/pediatrics/tc-nuoi-duong-tre-em';
export * from './specialties/pediatrics/tc-tim-bam-sinh';
export * from './specialties/pediatrics/tc-tre-dau-bung';
export * from './specialties/pediatrics/tc-tre-ho';
export * from './specialties/pediatrics/tc-tre-kho-khe';
export * from './specialties/pediatrics/tc-tre-roi-loan-tri-giac';
export * from './specialties/pediatrics/tc-tre-sot';
export * from './specialties/pediatrics/tc-tre-thieu-mau';
export * from './specialties/pediatrics/tc-tre-tim';

import { initApproachesHub } from './renderer';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initApproachesHub());
  } else {
    initApproachesHub();
  }
}
