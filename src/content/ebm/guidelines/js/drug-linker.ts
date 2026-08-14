/**
 * Drug Interaction Linker & Deep-Linking Engine (drug-linker.ts)
 * Path: src/content/ebm/guidelines/js/drug-linker.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface DrugAlias {
  canonicalId: string;
  name: string;
  keywords: string[];
  group: string | null;
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  group1?: string;
  group2?: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  severityLabel: string;
  summary: string;
  mechanism: string;
  clinicalManagement: string;
}

export const DRUG_ALIASES: Record<string, DrugAlias> = {
  metoprolol_succ: {
    canonicalId: 'metoprolol_succ',
    name: 'Metoprolol Succinate ER',
    keywords: ['metoprolol', 'toprol', 'toprol-xl', 'betaloc', 'betaloc zok'],
    group: 'beta_blockers'
  },
  verapamil: {
    canonicalId: 'verapamil',
    name: 'Verapamil Hydrochloride',
    keywords: ['verapamil', 'isoptin', 'calan'],
    group: 'non_dhp_ccb'
  },
  empagliflozin: {
    canonicalId: 'empagliflozin',
    name: 'Empagliflozin',
    keywords: ['empagliflozin', 'jardiance'],
    group: 'sglt2i'
  },
  dapagliflozin: {
    canonicalId: 'dapagliflozin',
    name: 'Dapagliflozin',
    keywords: ['dapagliflozin', 'farxiga', 'forxiga'],
    group: 'sglt2i'
  },
  sacubitril_valsartan: {
    canonicalId: 'sacubitril_valsartan',
    name: 'Sacubitril / Valsartan',
    keywords: ['sacubitril', 'valsartan', 'entresto', 'arni'],
    group: 'arni'
  }
};

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    id: 'inter_bb_non_dhp_ccb',
    drug1: 'metoprolol_succ',
    drug2: 'verapamil',
    group1: 'beta_blockers',
    group2: 'non_dhp_ccb',
    severity: 'contraindicated',
    severityLabel: 'Chống chỉ định / Nguy hiểm cao',
    summary: 'Tăng đáng kể nguy cơ chậm nhịp tim nặng, block AV độ III và suy tim cấp.',
    mechanism: 'Cả hai thuốc đều có tác dụng ức chế nút xoang và nút nhĩ thất.',
    clinicalManagement: 'Tránh dùng phối hợp đường uống hoặc tiêm tĩnh mạch. Cân nhắc chọn nhóm DHP-CCB (Amlodipine).'
  }
];

export function findDrugInteractions(drugList: string[]): DrugInteraction[] {
  const interactions: DrugInteraction[] = [];
  const normalized = drugList.map(d => d.toLowerCase().trim());

  DRUG_INTERACTIONS.forEach(inter => {
    const hasDrug1 = normalized.some(d => d.includes(inter.drug1) || (inter.group1 && d.includes(inter.group1)));
    const hasDrug2 = normalized.some(d => d.includes(inter.drug2) || (inter.group2 && d.includes(inter.group2)));
    if (hasDrug1 && hasDrug2) {
      interactions.push(inter);
    }
  });

  return interactions;
}

if (typeof window !== 'undefined') {
  (window as any).CliniDrugLinker = {
    findInteractions: findDrugInteractions,
    ALIASES: DRUG_ALIASES,
    INTERACTIONS: DRUG_INTERACTIONS
  };
}
