/**
 * CliniPortal MedLens — Core Disease Knowledge Base
 * Tự động đồng bộ bởi bundle-clinical-rules.mjs
 */
import { Benh } from '../types.ts';
import ALL_CLINICAL_RULES_DISEASES from '../../data/diseases/index.ts';

export const CORE_DISEASES: Benh[] = ALL_CLINICAL_RULES_DISEASES as unknown as Benh[];
