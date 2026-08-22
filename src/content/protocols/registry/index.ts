/**
 * CliniPortal 2.0 — Master Protocols Static Registry Index
 * Path: src/content/protocols/registry/index.ts
 *
 * Tổng hợp toàn bộ các phác đồ từ các chuyên khoa thành Master Array có Type Safety tuyệt đối.
 */

import { ClinicalProtocol } from '../protocol-types';
import { INFECTIOUS_PROTOCOLS } from './infectious-protocols';
import { EMERGENCY_PROTOCOLS } from './emergency-protocols';
import { GI_PROTOCOLS } from './gi-protocols';
import { CARDIO_PROTOCOLS } from './cardio-protocols';
import { PULMO_PROTOCOLS } from './pulmo-protocols';

export const KHO_PROTOCOLS_REGISTRY: ClinicalProtocol[] = [
  ...EMERGENCY_PROTOCOLS,
  ...GI_PROTOCOLS,
  ...INFECTIOUS_PROTOCOLS,
  ...CARDIO_PROTOCOLS,
  ...PULMO_PROTOCOLS,
];

/**
 * Tra cứu phác đồ theo ID
 */
export function getProtocolById(id: string): ClinicalProtocol | undefined {
  return KHO_PROTOCOLS_REGISTRY.find(p => p.id === id);
}

/**
 * Tra cứu phác đồ theo mã ICD-10
 */
export function getProtocolsByIcd10(icdCodes: string[]): ClinicalProtocol[] {
  if (!icdCodes || icdCodes.length === 0) return [];
  const normalizedCodes = icdCodes.map(c => c.trim().toLowerCase());
  return KHO_PROTOCOLS_REGISTRY.filter(p => 
    p.icd10.some(code => normalizedCodes.some(nc => code.toLowerCase().startsWith(nc) || nc.startsWith(code.toLowerCase())))
  );
}

/**
 * Tra cứu phác đồ theo chuyên khoa
 */
export function getProtocolsBySpecialty(specialtyKey: string): ClinicalProtocol[] {
  if (!specialtyKey || specialtyKey === 'all') return KHO_PROTOCOLS_REGISTRY;
  return KHO_PROTOCOLS_REGISTRY.filter(p => p.specialty === specialtyKey);
}
