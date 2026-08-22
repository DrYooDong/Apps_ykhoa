/**
 * CliniPortal 2.0 — Multi-Condition Protocol Matching & Cross-Contraindication Engine
 * Path: src/content/protocols/protocol-conflict-engine.ts
 *
 * Nhận đầu vào là danh sách các vấn đề lâm sàng (A, B, C...) hoặc mã ICD-10 từ SOAP Note
 * -> Tự động khớp các phác đồ tương ứng, rà quét chống chỉ định chéo và sinh kế hoạch điều trị tích hợp.
 */

import { ClinicalProtocol, CrossContraindication, DrugDosage, SharedDecisionOption } from './protocol-types';
import { KHO_PROTOCOLS_REGISTRY, getProtocolsByIcd10 } from './registry';

export interface ClinicalProblemInput {
  name: string;        // Tên vấn đề (VD: "Sốt xuất huyết Dengue ngày 4")
  icdCode?: string;    // Mã ICD-10 (VD: "A91")
  isPrimary?: boolean; // Vấn đề chính hay bệnh kèm
}

export interface ConflictMatchResult {
  conflict: CrossContraindication;
  sourceProtocolId: string;
  sourceProtocolTitle: string;
  triggeredByProblem: string;
}

export interface IntegratedDecisionResult {
  matchedProtocols: ClinicalProtocol[];
  activeConflicts: ConflictMatchResult[];
  consolidatedDrugs: DrugDosage[];
  consolidatedRedFlags: string[];
  sharedDecisionMatrix: SharedDecisionOption[];
}

/**
 * Động cơ đối chiếu lâm sàng đa bệnh lý
 */
export function analyzeClinicalProblems(problems: ClinicalProblemInput[]): IntegratedDecisionResult {
  if (!problems || problems.length === 0) {
    return {
      matchedProtocols: [],
      activeConflicts: [],
      consolidatedDrugs: [],
      consolidatedRedFlags: [],
      sharedDecisionMatrix: [],
    };
  }

  // 1. Khớp phác đồ theo ICD-10 hoặc từ khóa tên bệnh
  const matchedProtocolsMap = new Map<string, ClinicalProtocol>();

  problems.forEach(prob => {
    // Thử khớp theo mã ICD-10
    if (prob.icdCode) {
      const byIcd = getProtocolsByIcd10([prob.icdCode]);
      byIcd.forEach(p => matchedProtocolsMap.set(p.id, p));
    }

    // Thử khớp theo từ khóa tên bệnh
    const probLower = prob.name.toLowerCase();
    KHO_PROTOCOLS_REGISTRY.forEach(p => {
      const matchTitle = p.title.toLowerCase().includes(probLower) || probLower.includes(p.title.toLowerCase());
      const matchAliases = p.aliases && p.aliases.some(a => probLower.includes(a.toLowerCase()) || a.toLowerCase().includes(probLower));
      if (matchTitle || matchAliases) {
        matchedProtocolsMap.set(p.id, p);
      }
    });
  });

  const matchedProtocols = Array.from(matchedProtocolsMap.values());

  // 2. Rà quét Chống chỉ định chéo (Cross-Contraindications)
  const activeConflicts: ConflictMatchResult[] = [];
  const problemNamesCombined = problems.map(p => `${p.name} ${p.icdCode || ''}`).join(' ').toLowerCase();

  matchedProtocols.forEach(proto => {
    (proto.contraindications || []).forEach(contra => {
      const condKey = contra.conflictWithCondition.toLowerCase();
      // Nếu vấn đề bệnh nhân có chứa từ khóa của chống chỉ định
      const isTriggered = problems.some(prob => {
        const pName = prob.name.toLowerCase();
        const pIcd = (prob.icdCode || '').toLowerCase();
        return condKey.includes(pName) || pName.includes(condKey) || (pIcd && condKey.includes(pIcd));
      }) || condKey.split(/[\s,()\/]+/).some(kw => kw.length > 3 && problemNamesCombined.includes(kw));

      if (isTriggered) {
        activeConflicts.push({
          conflict: contra,
          sourceProtocolId: proto.id,
          sourceProtocolTitle: proto.title,
          triggeredByProblem: contra.conflictWithCondition,
        });
      }
    });
  });

  // 3. Tổng hợp danh mục thuốc khuyến nghị
  const drugMap = new Map<string, DrugDosage>();
  matchedProtocols.forEach(proto => {
    (proto.steps || []).forEach(step => {
      (step.drugs || []).forEach(drug => {
        if (!drugMap.has(drug.genericName)) {
          drugMap.set(drug.genericName, drug);
        }
      });
    });
  });

  // 4. Tổng hợp dấu hiệu cờ đỏ
  const consolidatedRedFlags: string[] = [];
  matchedProtocols.forEach(p => {
    (p.redFlags || []).forEach(rf => {
      if (!consolidatedRedFlags.includes(rf)) {
        consolidatedRedFlags.push(`[${p.title}] ${rf}`);
      }
    });
  });

  // 5. Tổng hợp Ma trận Shared Decision Making
  const sharedDecisionMatrix: SharedDecisionOption[] = [];
  matchedProtocols.forEach(p => {
    (p.sharedDecisionOptions || []).forEach(opt => {
      sharedDecisionMatrix.push(opt);
    });
  });

  return {
    matchedProtocols,
    activeConflicts,
    consolidatedDrugs: Array.from(drugMap.values()),
    consolidatedRedFlags,
    sharedDecisionMatrix,
  };
}
