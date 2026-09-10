/**
 * CliniPortal MedLens — Knowledge Vault SOAP Service
 * Đọc ca lâm sàng trực tiếp từ Knowledge Vault (vault-catalog.json, khoCode: 'BA')
 * Hoàn toàn không phụ thuộc Supabase hay LocalStorage.
 */

import { SoapClinicalExperience } from '../types.ts';
import { VAULT_CATALOG } from './vaultBridge.ts';
import { VaultArticle } from './vaultConstants.ts';

/**
 * Chuyển đổi một VaultArticle (khoCode === 'BA') thành đối tượng SoapClinicalExperience
 */
export function mapVaultArticleToSoapExperience(art: VaultArticle): SoapClinicalExperience {
  // Nếu có chuỗi JSON lưu trong context
  let parsedContent: Record<string, any> = {};
  if (art.context) {
    try {
      parsedContent = typeof art.context === 'string' 
        ? JSON.parse(art.context) 
        : art.context;
    } catch {
      parsedContent = {};
    }
  }

  const s = parsedContent.s || {
    chiefComplaint: art.snippet || 'Chưa ghi nhận lý do nhập viện',
    historyOfPresentIllness: art.historyOfPresentIllness || art.snippet || '',
    pastMedicalHistory: art.pastMedicalHistory || 'Chưa ghi nhận tiền căn đặc biệt',
    symptomsList: art.keywords || [],
    historyPearls: art.historyPearls || '',
  };

  const o = parsedContent.o || {
    vitals: art.vitals || {},
    physicalExam: art.physicalExam || 'Khám thực thể chưa ghi nhận bất thường',
    labsAndImaging: art.labsAndImaging || 'Chưa có kết quả cận lâm sàng',
    objectivePitfalls: art.objectivePitfalls || '',
  };

  const a = parsedContent.a || {
    primaryDiagnosis: art.title,
    icd10: Array.isArray(art.icd10) ? art.icd10.join(' · ') : (art.icd10 || ''),
    differentials: art.differentials || [],
    riskStratification: art.riskStratification || 'Đang cập nhật',
    diagnosticPearls: art.diagnosticPearls || '',
  };

  const p = parsedContent.p || {
    immediateActions: art.immediateActions || 'Nghỉ ngơi, theo dõi sinh hiệu',
    medications: art.medications || [],
    monitoringAndTargets: art.monitoringAndTargets || 'Theo dõi sinh hiệu định kỳ',
    consultationOrReferral: art.consultationOrReferral || '',
    takeawayLessons: art.takeawayLessons || '',
  };

  return {
    id: art.caseId || art.id,
    title: art.title,
    specialty: art.specialty || 'Tổng quát',
    experienceLevel: (art.experienceLevel as any) || 'essential',
    tags: art.tags || [],
    demographicContext: art.demographicContext || art.snippet || '',
    createdAt: art.updated || art.createdAt || '2026-03-01',
    updatedAt: art.updatedAt || new Date().toISOString(),
    authorDoctor: art.authorDoctor || 'Hội đồng Khoa học Knowledge Vault',
    isFavorite: false,
    viewCount: art.viewCount || 0,
    sourceReference: art.sourceReference || `${art.khoName} · Knowledge Vault`,
    clinicalContext: art.clinicalContext || 'Khoa Lâm sàng',
    difficultyRating: (art.difficultyRating as any) || 3,
    outcomeNotes: art.outcomeNotes || '',
    s,
    o,
    a,
    p,
  };
}

/**
 * Lấy toàn bộ ca lâm sàng từ Knowledge Vault (khoCode: 'BA')
 */
export function getVaultSoapExperiences(): SoapClinicalExperience[] {
  const baArticles = VAULT_CATALOG.filter((a) => a.khoCode === 'BA');
  return baArticles.map(mapVaultArticleToSoapExperience);
}

// Alias tương thích ngược để không làm hỏng các component
export function getLocalSoapExperiences(): SoapClinicalExperience[] {
  return getVaultSoapExperiences();
}

/**
 * Lấy chi tiết một ca lâm sàng theo ID từ Knowledge Vault
 */
export function getSoapCaseById(id: string): SoapClinicalExperience | undefined {
  const all = getVaultSoapExperiences();
  return all.find((c) => c.id === id);
}

/**
 * Thống kê ca lâm sàng trong Vault
 */
export function getSoapSyncStats() {
  const all = getVaultSoapExperiences();
  return {
    total: all.length,
    localOnly: 0,
    synced: all.length,
    unsynced: 0,
  };
}

/**
 * Xuất toàn bộ ca lâm sàng dưới dạng chuỗi JSON
 */
export function soapExportAll(): string {
  return JSON.stringify(getVaultSoapExperiences(), null, 2);
}
