/**
 * CliniPortal — Guidelines Data & Taxonomy Module (TypeScript)
 * Path: src/content/ebm/guidelines/guidelinesdata.ts
 */

import {
  SPECIALTIES,
  SOURCE_TYPES,
  DESIGNS,
  IMPACTS,
  CLINICAL_CONDITIONS,
  JOURNAL_METRICS_DATABASE,
  SAMPLE_STUDIES
} from '../data';
import { getJournalMetrics } from '../renderer';

export {
  SPECIALTIES,
  SOURCE_TYPES,
  DESIGNS,
  IMPACTS,
  CLINICAL_CONDITIONS,
  JOURNAL_METRICS_DATABASE,
  SAMPLE_STUDIES,
  getJournalMetrics
};

// Expose on window for runtime compatibility
if (typeof window !== 'undefined') {
  const win = window as any;
  win.SPECIALTIES = SPECIALTIES;
  win.SOURCE_TYPES = SOURCE_TYPES;
  win.DESIGNS = DESIGNS;
  win.IMPACTS = IMPACTS;
  win.CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  win.DEFAULT_CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  win.JOURNAL_METRICS_DATABASE = JOURNAL_METRICS_DATABASE;
  win.SAMPLE_STUDIES = SAMPLE_STUDIES;
  win.getJournalMetrics = getJournalMetrics;
}
